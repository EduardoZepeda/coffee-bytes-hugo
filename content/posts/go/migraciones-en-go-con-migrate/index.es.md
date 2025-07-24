---
aliases:
- /migraciones-en-go-con-migrate
- /tutorial-de-migraciones-en-go-con-migrate
- /tutorial-de-migraciones-en-go-con-migrate//1000
- /es/tutorial-de-migraciones-en-go-con-migrate/
authors:
- Eduardo Zepeda
categories:
- go
- databases
coverImage: images/migrations-go.jpg
date: '2022-11-25'
description: En este tutorial te explico que son las migraciones up, down de una base
  de datos, así como a crearlas y manejarlas usando la librería migrate de go.
keywords:
- go
- postgres
- databases
- migrations
slug: /go/tutorial-de-migraciones-en-go-con-migrate/
title: Tutorial de migraciones en Go con migrate
---

En frameworks como [Django, las migraciones se crean automáticamente](/es/django/por-que-deberias-usar-django-framework/#su-orm-es-sencillo-y-maravilloso), a partir de los modelos. Sin embargo en lenguajes como go, siempre y cuando no estemos usando un ORM, las migraciones se realizarán de manera manual.

{{<box link="/es/go/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## ¿Qué es una migración de una base de datos?

Una migración es una abstracción para manejar el estado y los cambios que ocurren en una base de datos. En lugar de ejecutar las sentencias SQL una por una de manera manual, automatizamos el proceso escribiendo todo el SQL necesario y corriéndolo de manera automática.

Una migración consiste en dos archivos con instrucciones SQL:

- archivo up: Para realizar cambios en la base de datos
- archivo down: Para revertir cambios en la base de datos

Para este caso se llaman up y down, pero podrías ponerle cualquier otros nombres; como forward y backward, o adelante y atrás.

Por ejemplo:

{{< figure src="images/migrations.jpg" class="md-local-image" alt="Archivos de migración generados de manera manual" caption="Archivos de migración generados de manera manual" >}}

### Las migraciones son complementarias

Observa como las migraciones son reversibles y complementarias; una realiza una acción y la otra la elimina. 

Siguiendo esta lógica podemos realizar cambios en la base de datos y luego revertirlos.

Estos dos archivos pueden ser generados automáticamente (como en el caso de Django, a partir de los modelos) o podemos escribirlos nosotros directamente en SQL, como en el caso de go.

{{<ad>}}

## Instalación de migrate

Para manejar las migraciones vamos a usar la herramienta una herramienta llamada *migrate*, escrita en go. 

Migrate se descarga directo desde su [sección releases en github](https://github.com/golang-migrate/migrate/releases).

```bash
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.15.2/migrate.linux-amd64.tar.gz | tar xvz
mv migrate.linux-amd64 $GOPATH/bin/migrate
```

Para versiones más nuevas de Go, utiliza *go install*

``` bash
go install -tags 'sqlite3' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

Tras esto deberás poder ver la versión que tienes instalada.

```bash
migrate -version
4.15.2
```

## Creación de archivos de migración con migrate en Go

Para crear el par de archivos de migración, de los que te hable anteriormente, corremos el siguiente comando:

```bash
migrate create -seq -ext=.sql -dir=./migrations <nombre_de_la_migración>
```

Te explico que hace cada flag:

* seq: indica que será secuencial, para que empiece por 000001 y continue hasta 00000n; el total de migraciones que tengamos.
* dir: indicará el directorio
* ext: la extensión del archivo, en este caso sql
* Al final el nombre que queremos que tenga la migración. Yo usaré create_first_table para este ejemplo.

Tras la ejecución del comando, tendrás dos archivos de migración, uno con extensión *.up.sql* y el otro con extensión *.down.sql* dentro de la carpeta migrations.

```bash
ls
000001_create_first_table.up.sql 000001_create_first_table.down.sql
```

Estos archivos hay que editarlos de manera manual, y colocar en su interior las sentencias SQL que querramos. 

### Ejemplo de migraciones en go con postgres

Por ejemplo, para crear una hipotética tabla *users* en una base de datos en postgres:

Para el archivo up:

```sql
CREATE TABLE "users" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(50) NOT NULL);
```

Y, para revertir lo anterior, está el archivo down:

```sql
DROP TABLE "users";
```

Nuevamente, aprecia como ambas instrucciones SQL son complementarias; una crea una tabla y la otra la elimina. Pero puedes poner más de una instrucción y estas pueden ser lo que quieras, un index, un constraint, una rutina, etc.

## Ejecutar migraciones con migrate en Go

Hasta ahora solo hemos creado los archivos de migraciones, pero no le hemos hecho saber al programa donde está la base de datos.

Antes de realizar cualquier cambio en la base de datos necesitaremos indicarle la dirección de acceso, a esta última, en el siguiente formato [motor]://[usuario]:[contraseña]@[dominio]/[base de datos]

Y, obviamente, lo más cómodo y seguro será guardar esta dirección en [una variable de entorno]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer-tercera-parte/index.md" lang="es" >}}).

```bash
BASE_DE_DATOS=[motor]://[usuario]:[contraseña]@[dominio]/[base de datos]
```

Ahora ya tenemos una base de datos a la cual conectarnos.

### Aplicar migraciones

Para aplicar todas las migraciones usaremos el comando up. Migrate detectará automáticamente la numeración y ejecutará *todas las migraciones up* en orden ascendente.

```bash
migrate -path=./migrations -database=$BASE_DE_DATOS up
```

### Revetir migraciones

Por otro lado, para revertir todas las migraciones usaremos el comando down. Migrate detectará automáticamente la numeración y ejecutará *todas las migraciones down* en orden descendente.

```bash
migrate -path=./migrations -database=$BASE_DE_DATOS down
```

### Ir a una migración específica

Mientras que, si queremos ir a una migración en específico, usaremos el comando goto seguido del número de migración al que queremos llevar la base de datos.

```bash
migrate -path=./migrations -database=$BASE_DE_DATOS goto <numero de migración>
```

Migrate detectará la migración activa y ejecutará *las migraciones up or down correspondientes* para llevar la base de datos a ese estado.

## La tabla de migraciones

¿Y cómo sabe la herramienta en que migración se encuentra? Tras cada cambio que efectuemos a la base de datos, la herramienta migrate guardará el estado de nuestra base de datos en una tabla llamada *schema_migrations* que luce de la siguiente manera:

{{< figure src="images/schema_migrations.png" class="md-local-image" alt="Tabla schema_migrations en postgres" caption="Tabla de migraciones donde el estado actual es 1, seleccionado en azul" >}}

### Columna version

Observa como la columna versión guarda el estado de la migración actual. De esta manera migrate registra en que versión de las migraciones se encuentra.

### Columna dirty

Además, esta tabla también contiene una columna llamada *dirty* que índica si hubo algún conflicto en la migración. En este último caso será necesario repararlo manualmente y forzar un nuevo estado en la tabla.

```bash
migrate -path=./migrations -database=$BASE_DE_DATOS force 1
```

## Migraciones a bases de datos remotas

La herramienta Migrate también soporta migraciones remotas tales como:

* Filesystem
* io/fs
* Go-Bindata
* pkger
* GitHub
* GitHub Enterprise
* Bitbucket
* Gitlab
* AWS S3
* Google Cloud Storage

Cada uno de estos endpoints requiere una sintaxis específica. Por ejemplo, el de Amazon S3 luce así:

```bash
migrate -source="s3://<bucket>/<path>" -database=$BASE_DE_DATOS up
```

Con esto ya sabes lo básico sobre migraciones y probablemente también valores mucho más herramientas y[ ORMs que se encargan de esto de manera automática, como Django]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="es" >}}), Ruby on Rails, South, etc.