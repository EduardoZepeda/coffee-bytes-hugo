---
aliases:
- /es/migraciones-con-zero-downtime-la-estrategia-shadow-table/
authors:
- Eduardo Zepeda
categories:
- databases
coverImage: images/shadow-table-strategy.jpg
date: '2025-06-27T16:14:37-06:00'
description: Domina la estrategia de shadow tables para migraciones de bases de datos
  sin tiempo de inactividad. Aprende a modificar tablas y gestionar restricciones
keyword: shadow table
keywords:
- databases
- migrations
- deployment
- orm
slug: /databases/migraciones-con-zero-downtime-la-estrategia-shadow-table/
title: 'Migraciones con zero downtime: la estrategia shadow table'
---

Imagínate esto: son las 2 de la madrugada, estás implementando un «simple» cambio en el tipo de columna en producción y, de repente, toda tu aplicación se cae porque el bloqueo de la tabla está tardando una eternidad. Tu teléfono empieza a vibrar con notificaciones furiosas de Slack y tú intentas explicar frenéticamente a tu equipo por qué la «migración de 5 minutos» lleva 30 minutos en marcha.

## ¿Qué es la estrategia de la shadow table?

La estrategia de la shadow table (en español "tabla sombra") es como tener un doble para una tabla en tu base de datos. En lugar de modificar directamente la tabla original (y arriesgarte a que tu aplicación colapse), creas una ~~clon sombra~~ nueva tabla con la estructura deseada, copias gradualmente los datos y luego realizas un cambio rapidísimo.

Este es el flujo básico:

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751079950/coffee-bytes/shadow-table-explanation_gbdhc0.png" class="md-local-image" alt="Diagrama de la shadow table"  width="996" height="612" >}}

## ¿Qué problema resuelve la estrategia de la shadow table?

Las operaciones tradicionales *ALTER TABLE* pueden ser una auténtica pesadilla en producción si se trata de sitios web con miles de millones de registros. Cuando ejecutas algo como *ALTER TABLE users MODIFY COLUMN id BIGINT*, la mayoría de los motores de bases de datos:

1. **Bloquearán toda la tabla** mientras dure la operación.
2. **Bloquearán todas las lecturas y escrituras** mientras reestructuran la tabla.
3. **Tardarán una eternidad** en tablas grandes (estamos hablando de horas para miles de millones de filas).
4. **Correrán el riesgo de que se agote el tiempo de espera**, lo que dejará tu base de datos en un estado inconsistente.

La estrategia de la shadow table resuelve estos problemas dividiendo la [migración de la base de datos]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="es" >}}) en fragmentos más pequeños y manejables que no requieren bloqueos prolongados. Tu aplicación permanece en línea, los usuarios están contentos y no recibes notificaciones a las 3 de la madrugada.

### ¿Qué pasa con las tablas más pequeñas?

Si tu tabla no tiene millones de filas y no es crítico que la base de datos siga funcionando, siempre puedes enviar un correo electrónico notificando a tus usuarios que tu aplicación estará en mantenimiento durante un breve periodo de tiempo. 

Nadie te odiará si tu sitio web de imágenes peludas está caído durante un par de horas, pon una página de «toca el césped» y realiza la migración, [no te obsesiones innecesariamente con el rendimiento de tu aplicación]({{< ref path="/posts/opinion/la-obsesion-por-el-rendimiento-y-la-velocidad-en-programacion/index.md" lang="es" >}})

Sin embargo, si ese no es el caso y el negocio está perdiendo dinero por cada segundo que la base de datos está bloqueada...

## Pasos para realizar una modificación de tabla utilizando la estrategia de shadow table

Veamos un ejemplo real en el que necesitamos cambiar un ID de usuario de INT a BIGINT porque nos estamos acercando al límite de 2100 millones. 

Stonks. Enhorabuena si eres tú el propietario.

### Paso 1: Crear la shadow table

En primer lugar, crea tu nueva tabla con la estructura deseada:

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751082296/coffee-bytes/shadow-table-copy-data_1_m2qwh7.png" class="md-local-image" alt="Crear la shadow table"  width="1065" height="1639" >}}

```sql
-- Create the shadow table with the new structure
CREATE TABLE users_new (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Copy indexes from the original table
CREATE INDEX idx_users_email ON users_new(email);
CREATE INDEX idx_users_created_at ON users_new(created_at);
```

### Paso 2: Configurar la sincronización de datos

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751080652/coffee-bytes/shadow-table-sync_v7mgtq.png" class="md-local-image" alt="Sincronizar ambas tablas"  width="996" height="971" >}}

Aquí es donde las cosas se ponen interesantes. Debes mantener la shadow table sincronizada con la original mientras tu aplicación sigue funcionando como si nada hubiera pasado. 

Sí, estás duplicando las escrituras y ejecutando dos tablas en lugar de una. Para ello hay dos enfoques:

#### Utilizar triggers de base de datos

```sql
-- Create triggers to keep shadow table in sync
DELIMITER $$

CREATE TRIGGER users_insert_sync
    AFTER INSERT ON users
    FOR EACH ROW
BEGIN
    INSERT INTO users_new (id, name, email, created_at, updated_at)
    VALUES (NEW.id, NEW.name, NEW.email, NEW.created_at, NEW.updated_at);
END$$

CREATE TRIGGER users_update_sync
    AFTER UPDATE ON users
    FOR EACH ROW
BEGIN
    UPDATE users_new 
    SET name = NEW.name, 
        email = NEW.email, 
        updated_at = NEW.updated_at
    WHERE id = NEW.id;
END$$

CREATE TRIGGER users_delete_sync
    AFTER DELETE ON users
    FOR EACH ROW
BEGIN
    DELETE FROM users_new WHERE id = OLD.id;
END$$

DELIMITER ;
```

#### Sincronizar datos a nivel de aplicación

Si lo prefieres, puedes sincronizar los datos a través de la lógica de tu aplicación.

``` python
def update_user(user_id, changes):
    # Original write to main table or database
    original_db.execute("UPDATE users SET ...")
    
    # Shadow write (with transformation)
    shadow_db.execute(
        "UPDATE users_new SET name=? ...",
        data['email']
    )
```

### Paso 3: Copiar los datos existentes por lotes

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751082296/coffee-bytes/shadow-table-copy-data_1_m2qwh7.png" class="md-local-image" alt="Copiar datos por lotes"  width="1065" height="1639" >}}

Ahora viene la migración masiva de datos. **Nunca intentes copiar todo de una vez**, eso es una receta para una catástrofe digital. Recuerda la razón de ser del [patrón worker pool]({{< ref path="/posts/software-architecture/el-patron-de-diseno-worker-pool-aprovechando-la-concurrencia-en-go/index.md" lang="es" >}}).

Asegúrate de tener suficientes recursos y considera hacerlo durante períodos de poco tráfico:

```sql
-- Copy data in manageable batches to avoid long locks
SET @batch_size = 10000;
SET @min_id = 0;
SET @max_id = (SELECT MAX(id) FROM users);

-- Loop through batches (you'd typically script this)
WHILE @min_id < @max_id DO
    INSERT INTO users_new (id, name, email, created_at, updated_at)
    SELECT id, name, email, created_at, updated_at
    FROM users
    WHERE id > @min_id AND id <= @min_id + @batch_size
    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        email = VALUES(email),
        updated_at = VALUES(updated_at);
    
    SET @min_id = @min_id + @batch_size;
    
    -- Give the database a breather
    SELECT SLEEP(0.1);
END WHILE;
```

### Paso 4: Verificar la coherencia de los datos

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751081576/coffee-bytes/shadow-table-copy-compare_2_lzbmok.png" class="md-local-image" alt="Comparar que los datos sean los mismos en la shadow table"  width="1065" height="591" >}}

Antes de realizar el cambio, es mejor que te asegures de que todo se ha copiado correctamente:

```sql
-- Check row counts match
SELECT 
    (SELECT COUNT(*) FROM users) as original_count,
    (SELECT COUNT(*) FROM users_new) as shadow_count;

-- Check data integrity with checksums
SELECT 
    (SELECT SUM(CRC32(CONCAT(id, name, email))) FROM users) as original_checksum,
    (SELECT SUM(CRC32(CONCAT(id, name, email))) FROM users_new) as shadow_checksum;

-- Spot check some random records
SELECT * FROM users WHERE id IN (1, 1000, 50000) ORDER BY id;
SELECT * FROM users_new WHERE id IN (1, 1000, 50000) ORDER BY id;
```

### Paso 5: El gran cambio

Aquí es donde tu ritmo cardíaco se dispara. El intercambio real de tablas debe ser rapidísimo, como una nueva y brillante biblioteca Rust ~~innecesaria~~:

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751081923/coffee-bytes/shadow-table-copy-switch_fck15s.png" class="md-local-image" alt="Cambio de la tabla antigua a la shadow table"  width="1065" height="1100" >}}

```sql
-- This should take milliseconds, not minutes
START TRANSACTION;

-- Drop the triggers first (no more syncing needed)
DROP TRIGGER users_insert_sync;
DROP TRIGGER users_update_sync;
DROP TRIGGER users_delete_sync;

-- Rename tables atomically
RENAME TABLE users TO users_old, users_new TO users;

COMMIT;
```

### Paso 6: Limpieza y verificación

Limpieza y ~~darse cuenta de que todo salió mal~~ celebrar.


## Manejo de tablas con millones de QPS

Para tablas con millones de QPS o [millones de usuarios simultáneos]({{< ref path="/posts/software-architecture/como-mejorar-el-rendimiento-de-una-aplicacion-hecha-en-django/index.md" lang="es" >}}), puedes optar por utilizar una queue (cola) en lugar de escribir directamente.

- **Utilizar un búfer de escritura**: Pon en queue cualquier write en Redis/Kafka si la base de datos no puede gestionar las escrituras duales.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1751083242/coffee-bytes/shadow-table-queue_fln9xj.png" class="md-local-image" alt="Búfer de escritura para shadow table"  width="1741" height="584" >}}

- **El infierno del mapeo de columnas** Utiliza vistas para abstraer los cambios de nombre:  

```sql
  CREATE VIEW users_combined AS
  SELECT id, COALESCE(new_id, id) AS unified_id FROM users_new
  UNION ALL SELECT id, name FROM users WHERE NOT EXISTS (...);
```

## Errores comunes al implementar shadow tables

Permíteme ahorrarte algunos dolores de cabeza compartiendo algunos errores comunes que he visto, leído y cometido:

**Olvidar gestionar las restricciones de claves externas**: si otras tablas hacen referencia a tu tabla, deberás desactivar temporalmente las comprobaciones de claves externas o gestionar las referencias con cuidado. No lo ignores, la integridad de tus datos depende de ello.

**No probar los triggers (o disparadores) a fondo**: los triggers pueden fallar silenciosamente o comportarse de forma extraña bajo carga. Pruébalos con volúmenes de datos realistas y operaciones simultáneas antes de pasar a producción.

**Subestimar el retraso de sincronización**: durante los periodos de escritura intensa, tus triggers pueden fallarte. Supervisa el estado de sincronización y prepárate para limitar las escrituras si es necesario.

**Supervisión inadecuada**: Debes estar atento durante el proceso de migración, el retraso de sincronización y cualquier error, no después de que las cosas salgan mal. Implementa la supervisión antes de empezar, no cuando todo se esté desmoronando.

**Mala planificación de la rollback**: Ten siempre un plan B. Si algo sale mal durante el cambio, debes poder revertirlo rápidamente.

## Manejo de shadow tables en sistemas distribuidos

Ten en cuenta el descubrimiento de servicios, el agrupamiento de conexiones y la invalidación de caché. Cuando renombres tus tablas, recuerda que todas las instancias de servicio deben conocer el cambio simultáneamente. 

Esto a menudo significa implementar una estrategia de implementación coordinada en la que se detiene temporalmente el tráfico, se realiza el cambio y, posteriormente, se reinician los servicios.

Considera la posibilidad de utilizar indicadores de características, como el que te comenté en mi [publicación sobre patrones de implementación]({{< ref path="/posts/software-architecture/patrones-de-deploy-comunes/index.md" lang="es" >}}), para controlar desde qué tabla lee tu aplicación. Esto te permite un control preciso de la migración y permite implementaciones graduales.

## Bases de datos con réplicas de lectura

Asegúrate de que tu shadow table se haya replicado completamente antes de realizar el cambio. Supervisa cuidadosamente el retraso en la replicación, ya que el cambio debe realizarse de manera consistente en todas las réplicas.

## Supervisión del rendimiento durante la transición

Al ejecutar la migración, básicamente estás ejecutando dos tablas en paralelo, con su correspondiente uso de E/S, comprueba el uso del disco y supervísalo.

Los triggers añaden una sobrecarga a cada operación INSERT, UPDATE y DELETE. Configura alertas para tiempos de ejecución de triggers inusualmente largos.

Compara el número de filas entre las tablas originales y las shadow tables durante el proceso. Si la diferencia entre ambas aumenta, es que algo raro está pasando.

## Manejo de constraints (o restricciones) únicas y claves externas

En el caso de las constraints únicas, debes asegurarte de que la shadow table mantenga exactamente las mismas garantías de unicidad que la tabla original.

Al copiar datos por lotes, utiliza INSERT ... ON DUPLICATE KEY UPDATE o una lógica upsert equivalente para gestionar posibles duplicados, especialmente si tu aplicación sigue escribiendo datos durante la migración.

Para las constraints de foreign key, puedes desactivar las comprobaciones durante la migración, pero corres el riesgo de comprometer la integridad de los datos, por lo que siempre hay que sopesar las ventajas y los inconvenientes. Utiliza comprobaciones diferidas (si usas PostgreSQL) o desactiva las comprobaciones de foreign key (MySQL SET FOREIGN_KEY_CHECKS=0).

Como alternativa, puedes crear las constraints de foreign key en la shadow table y actualizar las tablas de referencia una vez finalizada la migración principal.

## Manejo de triggers (disparadores) y procedimientos almacenados

Los triggers y procedimientos almacenados existentes pueden ser un dolor de cabeza... 

En primer lugar, enumera todos los triggers existentes en tu tabla. Deberás recrear estos triggers en la shadow table, pero recuerda que el orden de ejecución es fundamental. 

Por lo general, **los triggers de sincronización deben ejecutarse en último lugar**, después de que se hayan ejecutado todos los triggers de lógica empresarial.

Los procedimientos almacenados que apuntan a tu tabla deben renombrarse después de la migración. Utiliza sinónimos o vistas para minimizar el número de procedimientos que requieren actualizaciones.

Prueba a fondo las interacciones de los desencadenantes en un entorno de prueba para evitar sorpresas indeseadas. 

## Verificación de la coherencia de los datos antes del cambio

No te saltes nunca este paso, pase lo que pase.

Compara valores agregados como sumas, promedios y recuentos. Utiliza **checksums o hash de tus datos para verificar que los datos coincidan exactamente entre las tablas**. Las estadísticas son tus aliadas, obtén el número correcto de registros para muestrear y alcanzar un nivel de confianza del 95 %.

Crea scripts de comprobación de coherencia automatizados que puedas ejecutar repetidamente durante la migración y que te permitan saber si todo va bien.

Las herramientas de suma de comprobación (como *pg_checksums* o consultas personalizadas *COUNT(*)* + *hash_agg()*) son tus aliadas.

## El plan de rollback (cuando todo se va al carajo)

¿Conoces la ley de Murphy? Entonces ya sabes lo que hay que hacer.

La rollback más sencilla es revertir la operación de renombramiento. Mantén tu tabla original como *<table_name>_old*, o como quieras, durante el periodo de transición, para poder renombrarla rápidamente si Murphy aparece. Esto debería ser muy rápido.

Para reversiones más complejas, es posible que tengas que sincronizar los datos de la shadow table con la original. Considera la posibilidad de mantener los desencadenantes inversos durante el periodo de transición, lo que añade complejidad, pero te dará más opciones disponibles.

Cuando la producción está en pleno apogeo, no querrás estar averiguando los comandos de rollback sobre la marcha. Documenta siempre claramente tus procedimientos de rollback y practica en entornos de prueba. 

Considera la posibilidad de implementar mecanismos de rollback a nivel de aplicación utilizando indicadores de funciones o cambios de configuración. Hablé un poco sobre ellos en mi publicación sobre patrones de implementación. A veces es más rápido volver a dirigir tu aplicación a la tabla antigua que realizar cambios a nivel de la base de datos.

## Herramientas que te pueden ayudar

Hay algunas herramientas que pueden ayudarte a facilitar el proceso de migración de una tabla:

| Herramienta | Ideal para      | Característica destacada          |
| ----------- | --------------- | --------------------------------- |
| gh-ost      | MySQL           | Replicación sin triggers          |
| pg_repack   | PostgreSQL      | Reorganización de tablas en línea |
| Liquibase   | Cross-DB        | Seguimiento de cambios            |
| Debezium    | Transmisión CDC | Integración con Kafka             |

## Conclusión 

La estrategia de las shadow tables dista mucho de ser perfecta y pueden ocurrir muchas cosas.

Recuerda que cada base de datos y cada aplicación son diferentes. Lo que funciona para tablas con un uso intensivo de lectura puede no funcionar para tablas con un uso intensivo de escritura. Prueba siempre en un entorno que imite lo más fielmente posible el entorno de producción.

No temas abortar la migración en el último momento si las cosas no salen según lo previsto, lo importante es que todo siga funcionando, no hacer de héroe.