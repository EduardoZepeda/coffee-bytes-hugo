---
aliases:
- /docker-compose-tutorial-con-comandos-en-gnu-linux
- /conoce-los-comandos-basicos-de-docker-compose
- /docker-compose-
- /docker-compose-tutorial-con-comandos-en-gnu-linux//1000
- /docker-curso-practico-con-ejemplos-en-gnu-linux/
- /tutorial-de-comandos-basicos-de-docker//1000
authors:
- Eduardo Zepeda
categories:
- docker
- linux y devops
coverImage: images/DockerCompose.jpg
coverImageCredits: Créditos a https://www.pexels.com/es-es/@felixmittermeier/
date: '2020-10-14'
description: En este tutorial de Docker compose te explico los comandos más comunes,
  así como la estructura y creación de un archivo docker-compose.yml
keywords:
- docker
- docker compose
- go
- containers
- tutorial
- yml
- devops
title: Conoce los comandos básicos de Docker Compose
url: docker-compose-tutorial-con-comandos-en-gnu-linux
---

Docker compose nos permite crear aplicaciones con múltiples contenedores, estos contenedores interaccionarán y podrán verse entre sí. Para configurar cada uno de estos servicios usaremos un archivo en formato YAML (también le dicen YML). En este tutorial de docker compose te muestro algunos de los comandos más usados y lo que hace cada uno. 

Si quieres refrescar tu memoria visita mi [tutorial de comandos básicos de Docker.](/es/tutorial-de-comandos-basicos-de-docker/)

{{< box link="https://m.do.co/c/a22240ebb8e7" type="info" message="Si quieres hostear una aplicación usando Docker o Kubernetes de manera económica checa Digital Ocean, puedes tener un VPS desde $4 usd el mes.">}}

## ¿Qué es docker compose?

Docker compose es una herramienta que te permite manejar aplicaciones que consisten en multiples contenedores de Docker. En lugar de tener múltiples Dockerfiles y estar ejecutando y vinculando uno por uno con Docker, definimos un archivo docker-compose.yml con la configuración que deseemos y lo ejecutamos, esto creará todos los servicios necesarios de nuestra aplicación. Además funciona en ambientes de desarrollo, producción, staging o testing, así como con servicios de integración continua.

Docker-compose está programando usando el [lenguaje de programación go o golang](/es/go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos/); el mismo con lenguaje con el que [funcionan internamente los containers de go](/es/container-de-docker-con-namespaces-y-cgroups/).

## Estructura de un archivo docker-compose.yml

Así como existían los Dockerfile en Docker, donde configurabas el estado de un contenedor de manera declarativa, en Docker compose existe un equivalente: los archivos yml.

Antes de empezar con los comandos vamos a explicar la estructura de un archivo de configuración de docker-compose y algunas directrices comunes.

Un archivo de docker-compose es simplemente un archivo con extensión y formato yml. Para usarlo basta con crearlo y empezar a agregar el contenido.

```bash
touch docker-compose.yml
```

Estos archivos yml son increíblemente sencillos de entender.

```docker
version: '3.8'
services:
  nombre_del_servicio:
    variable_de_configuracion:
      valores
    variable_de_configuracion:
      valores
  nombre_de_otro_servicio:
    variable_de_configuracion:
      valores
```

Un archivo de docker-compose empieza **especificando la versión de docker compose** que se utilizará. Para este ejemplo usaremos la versión 3.8. 

Después de la versión vienen anidada la sección de services. Puede haber tantos servicios como querramos; framework web, servidor web, base de datos, documentación, cache, etc. Cada servicio contará con sus propias variables de configuración y sus respectivos valores. Es todo, así de sencillo.

### Nombres de servicios

El nombre que usemos para cada servicio en nuestro archivo yml nos servirá como una referencia para su uso en otros servicios.

Por ejemplo, si un servicio se llama "_db_", es este el nombre que deberemos usar en otras aplicaciones para referirnos a un host o ubicación.

```python
# settings.py en Django
DATABASES = {
    'default': {
        # ...
        'HOST': 'db',
        # ...
    }
}
```

## Opciones de configuración en docker compose

La personalización de un archivo docker-compose.yml depende de sus opciones de configuración, estas le dirán a cada uno de los servicios como comportarse.

Hay muchísimas variables de configuración, que puedes consultar en la [documentación oficial de Docker.](https://docs.docker.com/compose/compose-file/) Para que no tengas que leerlas todas dejará algunas de las más importantes.

### image

La configuración image establece la imagen a partir de la cual se generará el servicio, ideal si nuestro servicio no necesita personalización muy complicada.

```bash
version: "3.8"
services:
  db:
    image: postgres
```

### build

En el caso de que necesitamos una imagen personalizada probablemente será mejor usar un Dockerfile. La opción build nos permite indicar el directorio donde este se encuentra. 

Si no sabes que es un Dockerfile acá te explico [como funciona y para que sirve Docker.](/es/que-es-docker-y-para-que-sirve/)

```docker
version: "3.8"
services:
  webapp:
    build: ./ubicacion_del_Dockerfile
```

### context y dockerfile

También podemos escribir un Dockerfile personalizado, en lugar del predeterminado, especificando en context el lugar donde se encuentra y en dockerfile su nombre. Esto es bastante útil pues nos permite especificar diferentes archivos para producción o para desarrollo.

```docker
version: "3.8"
services:
  webapp:
    build:
      context: ./ubicacion_del_Dockerfile
      dockerfile: Dockerfile-personalizado
```

### command

Command sobreescribe el comando predeterminado del contenedor. Esta opción es ideal para ejecutar un comando cuando inicia un servicio, por ejemplo un servidor web.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
```

### ports

Ports nos dice los puertos que expondremos al exterior y a cual puerto de nuestra máquina se vincularán, siempre en el formato de HOST:CONTENEDOR.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
  ports:
    - "80:8000"
```

En el código de arriba el puerto 80 de nuestra máquina se corresponderá con el puerto 8000 del contenedor. Recuerda, HOST:CONTENEDOR.

También podemos especificar el protocolo udp o tcp.

```docker
version: "3.8"
services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    ports:
      - "80:8000/udp"
```

### expose

Expose también expone puertos, **la diferencia con ports es que los puertos solo estarán disponibles para los servicios vinculados,** no para la máquina desde donde estamos ejecutando docker-compose.

```docker
version: "3.8"
services:
  redis:
    image: redis
    expose:
      - '6379'
```

### depends\_on

A veces queremos que uno de nuestros servicios se ejecute únicamente después de otro. Por ejemplo, para que un servidor web funcione correctamente es necesario tener una base de datos que ya se encuentre en funcionamiento.

depends\_on nos permite que el inicio de la ejecución de un servicio dependa de otras. En palabras más sencillas, le dice a docker-compose que deseamos arrancar el servicio web **solo si ya se han cargado todos los demás servicios.**

```docker
version: "3.8"
services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    depends_on:
      - db
      - redis
```

En el ejemplo anterior docker-compose ejecutará el servicio web solo si ya están disponibles los servicios db y redis.

### environment

La configuración environment nos permite establecer una lista de [variables de entorno](/es/comandos-de-linux-que-deberias-conocer-tercera-parte/) que estarán disponibles en nuestro servicio.

```docker
version: '3.8'
services:
  db:
    image: postgres
    environment:
      - POSTGRES_USER=usuario
      - POSTGRES_PASSWORD=contrasena
```

También podemos usar una sintaxis tipo diccionario en lugar de la de arriba.

```docker
version: '3.8'
services:
  db:
    image: postgres
    environment:
      MODE: development
      DEBUG: 'true'
```

#### variables de entorno secretas

Si no especificamos un valor para una variable de entorno y dejamos su valor en blanco, docker-compose la tomará de la máquina donde se esté ejecutando docker-compose.

```docker
version: '3.8'
services:
  db:
    image: postgres
    environment:
      MODE: development
      DEBUG: 'true'
      SECRET_KEY:
```

De esta manera no tenemos que exponer información sensible si decidimos compartir nuestros archivos de Docker compose o guardarlos en un sistema de versión de controles.

### env\_file

Si queremos cargar múltiples variables de entorno, en lugar de especificar las variables una por una, en nuestro archivo usaremos env\_file.

```docker
version: '3.8'
services:  
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    env_file: common.env
```

Considera que la directriz _env\_file_ carga valores dentro de los contenedores. Por lo que estas variables no estarán disponibles al momento de crear el contenedor. Por ejemplo: no puedes poner la variable PORT en un env\_file y luego condicionar el puerto que expone tu servicio.

```docker
# NO ES POSIBLE ESTO
expose:
  - ${PORT}
```

### Variables de entorno con .env

Docker compose carga automáticamente un archivo llamado _.env_ que se encuentre en la raiz del proyecto y utiliza sus variables de entorno en la configuración de sus servicios.

```docker
# Posible con un archivo.env que contenga PORT=8009
expose:
  - ${PORT}
```

### healthcheck

Este comando es para corroborar el estado de un servicio de manera periódica. Es decir podemos crear un comando que nos permita saber si nuestro contenedor está corriendo de manera correcta.

Con la configuración que se encuentra más abajo, Healtcheck va a ejecutar un curl a localhost, cada minuto y medio, una vez hayan pasado 40 segundos, si el comando tarda más de 10 segundos en devolver un resultado lo considerará como un fallo y si un fallo ocurre más de 3 veces el servicio se considerará "no saludable".

```docker
version: '3.8'
services:  
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    env_file: common.env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### volumes

Podemos mandar partes de nuestro sistema operativo a un servicio usando uno o varios volúmenes. Para esto usamos la sintaxis HOST:CONTENEDOR. Host puede ser una ubicación en tu sistema o también el nombre de un volumen que hayas creado con docker.

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"
```

Opcionalmente podemos especificar si el uso de volúmenes será de solo lectura o de lectura y escritura, con "ro" y "rw", respectivamente.

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data:ro"
```

### restart

Con restart podemos aplicar políticas de reinicio a nuestros servicios

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    restart: "on-failure"
```

La opción restart puede tomar varios valores

- no: nunca reinicia el contenedor
- always: siempre lo reinicia
- on-failure: lo reinicia si el contenedor devuelve un estado de error
- unless-stopped: lo reinicia en todos los casos excepto cuando se detiene

## Comandos básicos de docker compose

Ahora que ya vimos como está conformado un archivo de docker-compose y algunas de sus configuraciones más comunes, empecemos con los comandos básicos.

### Compilar un archivo de servicios

Para realizar un build a un archivo docker-compose basta con ejecutar build. Este comando buscará un archivo llamado docker-compose.yml en la carpeta actual.

```bash
docker-compose build
#Building postgres
#Step 1/4 : FROM postgres:12.3
# ---> b03968f50f0e
#Step 2/4 : COPY ./compose/production/postgres/maintenance /usr/local/bin/maintenance
# ---> Using cache
#...
```

Si queremos especificar un archivo docker-compose en específico usamos la opción _\-f_, seguida del nombre del archivo.

```bash
docker-compose -f production.yml build
```

### Ejecutar docker-compose y sus servicios

Una vez que la imagen con nuestros servicios se ha creado podemos iniciar y crear los servicios con el comando up. Con docker-compose up se empezarán o reiniciarán todos los servicios en el archivo docker-compose.yml o el que especifiquemos con _\-f_.

```bash
docker-compose up
#Creating network "my_project" with the default driver
#Creating postgres ... done
#Creating docs     ... done
#Creating django   ... done
```

Probablemente querramos ejecutar nuestro stack de servicios en segundo plano, para eso basta con agregar la opción _\-d_ al final.

```bash
docker-compose up -d
```

### Correr un comando dentro de un contenedor en ejecución

Para ejecutar un comando dentro un servicio que está corriendo usamos el comando docker-compose exec, seguido nombre del servicio y el comando. En este caso al ejecutar bash entramos en la terminal de nuestro servicio llamado app.

```bash
docker-compose exec app bash
```

### Detener y remover los servicios

Detiene y remueve los contenedores, redes, volúmenes e imágenes que se crean con el comando docker-compose down.

```bash
docker-compose down
#Stopping django   ... done
#Stopping docs     ... done
#Stopping postgres ... done
#Removing django   ... done
#Removing docs     ... done
#Removing postgres ... done
#Removing network my_project
```

### Reiniciar los servicios

Si queremos reiniciar uno o todos los servicios usamos el comando docker-compose restart.

```bash
docker-compose restart
#Restarting django   ... done
#Restarting docs     ... done
#Restarting postgres ... done
```

Para ejecutar docker-compose restart en solo a un servicio basta con colocar el nombre del servicio al final.

```bash
docker-compose restart servicio
```

### Detener los servicios sin removerlos

Para detener uno o todos los servicios tenemos que usar docker-compose stop.

```bash
docker-compose stop
#Stopping django   ... done
#Stopping docs     ... done
#Stopping postgres ... done
```

Para ejecutar docker-compose stop a solo a un servicio basta con colocar el nombre del servicio al final.

```bash
docker-compose stop servicio
```

### Iniciar los servicios de docker-compose sin crearlos

Podemos iniciar uno o todos los servicios con docker-compose start. Este comando es útil solo para reiniciar contenedores previamente creados pero detenidos en algún momento, además no crea ningún contenedor nuevo.

```bash
docker-compose start
#Starting postgres ... done
#Starting django   ... done
#Starting docs     ... done
```

Al añadir el nombre de un servicio al final el comando docker-compose start se ejecutará en solo ese servicio.

```bash
docker-compose start servicio
```

### Correr un comando dentro de un servicio

Para ejecutar un comando dentro de uno de nuestros servicios usamos el comando run, la opción --rm eliminará el contenedor que se creará al terminar de ejecutarse, a continuación colocamos el comando. A diferencia de docker-compose start, **este comando se usa para efectuar tareas que se llevan a cabo solo una vez.**

```bash
docker-compose run --rm django python manage.py migrate
```

### Ver los procesos

Para listar los containers que se están ejecutando

```bash
docker-compose ps
#  Name                Command              State           Ports         
#-------------------------------------------------------------------------
#django     /entrypoint /start              Up      0.0.0.0:8000->8000/tcp
#docs       /bin/sh -c make livehtml        Up      0.0.0.0:7000->7000/tcp
#postgres   docker-entrypoint.sh postgres   Up      5432/tcp
```

Para listar un solo container lo colocamos al final de nuestro comando.

```bash
docker-compose ps servicio
```

### Acceder a los procesos

De la misma manera que el comando top en GNU/Linux, docker-compose top nos muestra los procesos de cada uno de nuestros servicios.

```bash
docker-compose -f local.yml top
#django
#UID     PID    PPID    C    STIME   TTY     TIME                                   CMD                               
#---------------------------------------------------------------------------------------------------------------------
#root   29957   29939   0    20:09   ?     00:00:00   /bin/bash /start
#...
```

Para ver los procesos de un único servicio basta con escribir su nombre al final del comando docker-compose top

```bash
docker-compose top servicio
```

### Ver los logs

Si algo salió mal podemos ver los logs usando docker-compose logs. Si queremos ver los logs de un stack en específico basta con establecer nuestro archivo yml con la opción _\-f._

```bash
docker-compose -f production.yml logs
#Attaching to django, docs, postgres
#django      | PostgreSQL is available
#django      | Operations to perform:
#...
#postgres    | PostgreSQL Database directory appears to contain a database; Skipping initialization
#...
#docs        | sphinx-autobuild -b html --host 0.0.0.0 --port 7000 --watch /app -c . ./_source ./_build/html
```

De igual manera que con los demás comandos, si queremos leer los logs de un servicio es suficiente con agregar su nombre al final.

```bash
docker-compose -f production.yml logs servicio
```

## Escalar contenedores

Antes se usaba el comando docker-compose scale para escalar los servicios. En las nuevas versiones de docker-compose escalar contenedores se realiza con el comando docker-compose up. Tras el comando agregamos la opción --scale seguida del servicio que queremos escalar y el número de copias usando el formato servicio=numero.

```bash
docker-compose -f production.yml up -d --scale servicio=3
```

Hay que tomar en cuenta que cuando escalamos un contenedor, se intentará crear otro contenedor con un puerto que ya estará en uso, lo que provocará un conflicto, por esta razón necesitamos especificar rangos de puertos en nuestro archivo de docker compose. Tampoco podemos usar nombres de contenenedores en nuestros servicios, por los que habrá que removerlos.

```docker
services:
  django:
    build:
      context: .
      dockerfile: Dockerfile
    image: customImage
    container_name: django # ES NECESARIO REMOVER ESTA LINEA
    depends_on:
      - postgres
    volumes:
      - .:/app:z
    env_file:
      - ./django.env
      - ./posgres.env
    ports:
      - "8000-8005:8000" # APLICA RANGOS A LOS PUERTOS
    command: /start
```

¿Que tal una aplicación práctica de Docker Compose? En mi siguiente entrada te explico como hacer un [deploy usando cookiecutter-django y docker-compose](/es/cookiecutter-django-para-configurar-y-hacer-deploy-en-django/); gracias a cookie-cutter bastan un par de comandos de docker-compose y listo, una aplicación lista para producción, con SSL y muchas más funciones.