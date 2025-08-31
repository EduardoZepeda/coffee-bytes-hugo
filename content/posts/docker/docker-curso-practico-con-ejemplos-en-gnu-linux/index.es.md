---
aliases:
- /docker-curso-practico-con-ejemplos-en-gnu-linux
- /los-comandos-basicos-de-docker-y-su-uso
- /tutorial-de-comandos-basicos-de-docker
- /docker-tutorial-con-ejemplos-en-gnu-linux/
- /tutorial-de-comandos-basicos-de-docker//1000
- /es/comandos-de-docker-mas-utiles-para-manejar-contenedores/
- /es/tutorial-de-comandos-basicos-de-docker/
authors:
- Eduardo Zepeda
categories:
- docker
- linux
coverImage: images/DockerCursoPractico.jpg
coverImageCredits: Créditos a https://www.pexels.com/es-es/@huy-phan-316220/
date: '2020-10-07'
description: Aprende a usar los comandos de Docker más comunes, aprende a diferenciar imágenes
  y contenedores, gestionar volúmenes, crear Dockerfiles y usar docker build.
keyword: comandos de docker
keywords:
- docker
slug: /docker/tutorial-basicos-de-comandos-de-docker/
title: Comandos de Docker más útiles para manejar contenedores
---

Si te leíste la entrada anterior donde explico [para que sirve Docker]({{< ref path="/posts/docker/que-es-y-para-que-me-sirve-docker/index.md" lang="es" >}}) ya debes tener una idea bastante simple de Docker, pero no he publicado nada acerca de los comandos. Aquí te explico los comandos de Docker más comunes, el uso de volúmenes y la creación de un Dockerfile de ejemplo.

## Las imágenes y los contenedores son diferentes

Antes de empezar hay que aclarar que en Docker trabajamos con contenedores que son creados a partir de imágenes. Una imagen es como una plantilla de solo lectura, mientras que el contenedor es la materialización de esa plantilla, se podría decir que es una imagen instanciada o en ejecución.

Puedes pensar en las imágenes y contenedores **como clases y sus instancias, respectivamente.**

Si te interesa conocer como funciona, a nivel código, un contenedor, tengo una entrada donde explico [como crear un contenedor desde cero con go]({{< ref path="/posts/docker/como-funciona-un-container-de-docker-internamente/index.md" lang="es" >}}).

{{<ad>}}

## Correr un contenedor

Para correr un contenedor usaremos el comando run y el nombre de la imagen de la que derivará. Puedes especificar como quieres que se llame tu contenedor con la opción _\--name_.

```bash
docker run hello-world
docker run --name mi_nombre hello-world
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

Tras ejecutar el comando anterior, Docker descargará la imagen de hello-world y creará un contenedor, este contenedor se ejecutará, realizará su función y terminará de ejecutarse.

## Descargar una imagen

Si solo quieres traer una imagen para que esté disponible, sin ejecutarla puedes usar el comando docker pull, seguido del nombre de la imagen. 

Este comando traera una imagen de los repositorios y la descargará en tu sistema.

```bash
docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
Digest: sha256:4cf9c47f86df71d48364001ede3a4fcd85ae80ce02ebad74156906caff5378bc
...
```

## Buscar una imagen

La imagen de hello-world es probablemente la más aburrida que hay y de seguro querrás buscar una imagen que haga algo más que imprimir texto en pantalla.

Para buscar una imagen podemos usar el comando docker search. Lo que hace este comando es conectarse a docker hub y buscar la imagen que le indiquemos.

En Dockerhub existen imágenes de mysql, de nginx, de alpine linux, de python, de django, wordpress, ghost y casi cualquier otra tecnología, y sus combinaciones, que puedas nombrar.

```bash
docker search nginx
NAME                               DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
nginx                              Official build of Nginx.                        13802               [OK]                
jwilder/nginx-proxy                Automated Nginx reverse proxy for docker con…   1885                                    [OK]
richarvey/nginx-php-fpm            Container running Nginx + PHP-FPM capable of…   787                                     [OK]
```

Por otro lado, si prefieres hacerlo de una manera más visual puedes visitar [Docker hub](https://hub.docker.com/). Ahí se puede conseguir cualquier tipo de
imagen que te imagines, incluso subir las tuyas. Date una vuelta y mira todas las opciones que están disponibles para descargar. Por ahora no descargaremos ninguna otra.

{{< figure src="images/Docker-hub.png" class="md-local-image" alt="Captura de pantalla de Dockerhub, el repositorio oficial de imágenes de Docker." >}}

## Ver las imágenes

Si ahora ejecutamos docker images va a aparecer nuestra imagen descargada. Mira el bajo tamaño de la imagen, ¡pesa sólo 13.3kB! Asimismo mira la columna IMAGE ID**. Cada imagen, incluida las personalizadas, tiene un id único que la representa y un tag.**

```bash
docker images
REPOSITORY        TAG            IMAGE ID            CREATED             SIZE
hello-world       latest         bf756fb1ae65        8 months ago        13.3kB
```

## Inspeccionar una imagen

Para inspeccionar una imagen basta con usar docker inspect, seguido del nombre o id de la imagen. Docker imprimirá información relacionada con la imagen en formato JSON.

Con docker inspect podremos ver sus variables de entorno, sus comandos de arranque, volúmenes asociados, arquitectura y muchas otras características más.

```bash
docker inspect hello-world
[
    {
        "Id": "sha256:bf756fb1ae65adf866bd8c456593cd24beb6a0a061dedf42b26a993176745f6b",
        "RepoTags": [
            "hello-world:latest"
        ],
 ...}] 
```

## Historial de una imagen

Docker history nos muestra la historia de una imagen; los comandos que se han ejecutado y sus respectivos disparadores.

```bash
docker history hello-world
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
bf756fb1ae65        9 months ago        /bin/sh -c #(nop)  CMD ["/hello"]               0B                  
```

## Borrar una imagen

Para borrar una imagen existe el comando _rmi_, sí como _rm_, pero con la i de "image" a continuación, necesitaremos ya sea su id o su repository y su tag separados por dos puntos ":"

```bash
docker rmi repository:tag
docker rmi id_de_la_imagen
```

Si quisieras borrar la imagen de hello-world sería de la siguiente manera. Escribiendo docker rmi, seguido del nombre de la imagen seáradp por dos puntos de su tag.

```bash
docker rmi hello-world:latest
```

## Ver los procesos de Docker

Si queremos ver los procesos ejecutados usamos docker ps con la opción _\-a_. **Por favor nota que nuestro contenedor tiene un id y, además un nombre**, el cual es generado por Docker automáticamente si no lo especificamos, en este caso "lucid\_morse".

```bash
docker ps -a
CONTAINER ID   IMAGE              COMMAND        CREATED          STATUS                     PORTS     NAMES
0f100ae4a21e   hello-world        "/hello"       10 minutes ago   Exited (0) 10 minutes ago            lucid_morse
```

Si le quitamos la opción _\-a_ mostrará únicamente los procesos activos. Como el contenedor que creamos a partir de la imagen hello-world terminó de ejecutarse no aparecerá en esta lista.

```bash
docker ps
CONTAINER ID   IMAGE              COMMAND        CREATED        STATUS                  PORTS     NAMES
```

## Borrar un contenedor al terminar de ejecutarlo

Cada vez que ejecutamos docker run se crea un nuevo contenedor. Para evitar llenarnos de contenedores podemos borrarlos automáticamente cuando estos terminan su ejecución usando la opción _\--rm_ después de docker run. Intenta corriendo la imagen hello-world nuevamente.

```bash
docker run --rm hello-world
```

Si ahora vuelves a ejecutar docker ps -a, verás que **no se ha creado un contenedor adicional** al que ya teníamos.

```bash
docker ps -a
CONTAINER ID   IMAGE              COMMAND        CREATED          STATUS                     PORTS     NAMES
0f100ae4a21e   hello-world        "/hello"       10 minutes ago    Exited (0) 10 minutes ago            lucid_morse
```

## Borrar un contenedor

Para borrar los contenedores, puedes usar el comando _docker rm_, con el nombre o id del contenedor.

```bash
docker rm nombre_o_id_del_contenedor
```

## Borrar todos los contenedores en Docker

Es bastante común querer borrar todos los contenedores en Docker. **Para hacerlo necesitamos conseguir todos los id de los contenedores.** 

Si ejecutas el siguiente comando verás como se imprime una lista con todos los id de los contenedores. Así es, es el mismo comando que ejecutamos anteriormente para ver todos los procesos de Docker, la opción _\-q_ hace que solo nos muestre los id de esos procesos.

```bash
docker ps -aq
8344e4d39fbf
42174ad3810d
...
```

Ahora que tenemos todos los id, podemos usar esta lista con el comando docker rm para eliminar todos los contenedores.

```bash
docker rm $(docker ps -aq)
```

## Acceder a la terminal de un contenedor

El siguiente comando nos introducirá en un contenedor creado a partir de una imagen. Técnicamente lo que hace docker run -it es vincular la entrada estándar (STDIN) de nuestro sistema operativo con la entrada estándar (STDIN) de nuestro contenedor. Esto nos permite correr un contenedor con el que podemos interactuar.

```bash
docker run -it ubuntu
```

**Nota como el prompt de la terminal cambiará** y nos encontraremos en una terminal desde la cual podremos interactuar.

Intenta ejecutar un _ls_ o un _pwd_. Podrás notar que estás dentro de un sistema operativo GNU/Linux. Puedes crear archivos, modificarlos, crear carpetas, etc.

Si no sabes nada sobre comandos de GNU/Linux puedes revisar mi entrada sobre los [comandos básicos de GNU Linux: cd, ls, rm, etc.]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="es" >}}) para refrescar tu memoria.

```bash
ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
pwd
/
```

## ¿Cómo saber cuanta memoria o procesador usa un contenedor?

Usa el comando *docker stats* y te mostrará cuanta memoria o CPU está usando cada contenedor en tiempo real.

``` bash
docker stats

CONTAINER ID   NAME                  CPU %     MEM USAGE / LIMIT    MEM %     NET I/O          BLOCK I/O        PIDS
<id>   <container_name>   0.00%     116.2MiB / 11.4GiB   1.00%     337kB / 53.9kB   111MB / 709kB    11
<id>   <container_name>   0.00%     41.12MiB / 11.4GiB   0.35%     52kB / 97kB      29.4MB / 295kB   9
```

## ¿Cómo extraer un archivo de un contenedor de Docker?

Para extraer un archivo de un contenedor usamos el comando *docker cp*, que básicamente es un análogo del [comando cp de Linux](/en/linux/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp/), con la siguiente sintaxis

``` bash
docker cp <container_name>:<path_to_file> <path_to_extract_on_your_computer>
```

## Correr un contenedor de Docker en segundo plano

Cuando queremos que un contenedor permanezca ejecutándose en segundo plano usamos la etiqueta _\-d_, que viene de detach (también puedes recordarlo fácilmente asociándolo con "daemon").

```bash
docker run -d nginx
```

Si ahora ejecutamos _docker ps_, para ver los procesos que están corriendo en Docker, podemos notar que el servidor Nginx que pusimos en marcha con el comando anterior se encuentra activo.

```bash
docker ps
CONTAINER ID    IMAGE           COMMAND                  CREATED             STATUS              PORTS        NAMES
8c7fbece083b    nginx           "/docker-entrypoint.…"   8 seconds ago       Up 6 seconds        80/tcp       boring_hugle
```

## Ver los logs de un contenedor

Si nuestro contenedor no pudo ejecutarse de la manera en la que esperábamos, examinar los logs sería un buen punto de partida.

Para esta tarea Docker nos provee del comando _docker logs_, al cual le especificaremos el contenedor a inspeccionar. Al contenedor del paso anterior se le asignó el nombre de "boring\_hugle", aunque el tuyo puede tener hombre.

Por ahora no te preocupes por los errores y las advertencias.

```bash
docker logs <nombre_del_contenedor>
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
...
```

## Ejecutar un comando en un contenedor corriendo

Para ejecutar un comando en un **contenedor que está corriendo** se usará el comando exec. Es importante hacer notar que aquí se **usa el nombre del contenedor,** no de la imagen. El comando siguiente ejecutará bash en el contenedor. Recuerda que para ver los contenedores corriendo usamos "_docker ps -a_".

```bash
docker exec -it <nombre_del_contenedor> bash
```

El uso de _docker exec_ no se limita a entrar en un terminal. Mira lo que sucede si ejecutamos el comando curl a localhost en el contendor donde se está ejecutando Nginx.

```bash
docker exec -it boring_hugle curl localhost
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

## Detener un contenedor de Docker

Para detener un contenedor que está corriendo basta con ejecutar _docker stop_, seguido del nombre o id del contenedor.

```bash
docker stop <nombre_o_id_del_contenedor>
```

## Iniciamos un contenedor

Si queremos correr un contenedor que se encuentra detenido usamos ahora _docker start_.

```bash
docker start <nombre_o_id_del_contenedor>
```

## Reiniciar un contenedor de Docker

Si en lugar de eso queremos reiniciar un contenedor que se encuentra corriendo podemos usar _docker restart_.

```bash
docker restart <nombre_o_id_del_contenedor>
```

## Comandos de Docker para exponer un puerto en un contenedor de Docker al exterior

Hasta ahora hemos creado contenedores con los cuales no podemos interaccionar desde el exterior. Si intentamos abrir localhost del veremos que nuestro contenedor de Nginx no nos devuelve nada.

{{< figure src="images/ErrorFirefox.png" class="md-local-image" alt="Página de error de conexión en Firefox" caption="Error de Firefox al intentar acceder al contenedor de Nginx" >}}


Esto sucede porque cada contenedor tiene su propia red y sus propios puertos. Si queremos redirigir los puertos del contenedor hacia los puertos de nuestra computadora usamos la opción _\-p_, **colocando primero el numero de puerto nuestra computadora** separado con dos puntos del que corresponde al contenedor.

```bash
docker run -d --name servidorNginx -p 8080:80 nginx
```

El comando anterior creó una instancia del servidor web Nginx, por lo que redireccionaremos, a NUESTRO puerto 8080, lo que sale de SU puerto 80. 

Al terminar de ejecutar este comando puedes abrir tu navegador y comprobar que, ahora sí, está corriendo un servidor en Nginx.

{{< figure src="images/nginx-corriendo-sobre-docker.png" class="md-local-image" alt="Mensaje de bienvenida de un servidor" >}}

## Persistencia de datos con volúmenes en Docker

Los cambios que hacemos dentro de los contenedores de Docker, tales como crear archivos, modificar configuraciones y otros, se quedan ahí, si nosotros borramos el contenedor la información y los cambios se pierden para siempre.

### Persistencia de datos en Docker

Los volúmenes son la herramienta que nos permitirá almacenar información fuera de los contenedores y que, por lo tanto, permanece aunque los borremos. 

Puedes pensar en ellos como partes aisladas en tu sistema, que puedes montar en el sistema de los contenedores.

Docker almacena estos contenedores en la ubicación "_/var/lib/docker/volumes/nombre\_del\_volumen/\_data_". **Estas carpetas son solo accesibles para docker y el usuario root**, por lo que no tenemos los permisos para modificar su contenido directamente, usando nuestro usuario normal. Repasa los [permisos en GNU/Linux]({{< ref path="/posts/linux/permisos-en-gnu-linux-y-el-comando-chmod/index.md" lang="es" >}}) si tienes dudas.

Vamos a tratar de dejarlo más claro con un ejemplo:

### Crear un volúmen al correr una imagen

Para crear un volumen al correr un contenedor lo especificamos con la opción -v, seguido que queremos asignar al volumen, separado por dos puntos de la ubicación a la que queremos asignar el volumen en el contenedor.

```bash
docker run -d -it --name <nombre_contenedor> -v <nombre_del_volumen>:/var/lib/mysql ubuntu
```

Si ahora entramos en la terminal de ese contenedor.

```bash
docker exec -it <nombre_contenedor> bash
```

Una vez en el contenedor entramos en la carpeta _/var/lib/mysql_ y creamos un archivo llamado _db.sql_

```bash
cd /var/lib/mysql
touch db.sql
exit
```

Ahora, si hacemos un ls en la ubicación donde Docker guarda los volúmenes deberíamos ver el archivo que acabamos de crear.

```bash
sudo ls /var/lib/docker/volumes/nombre_del_volumen/_data
db.sql
```

¡Ahí está! Si ahora detenemos y borramos el contenedor apreciaremos que nuestro volumen sigue existiendo.

```bash
docker stop <nombre_del_contenedor>
docker rm <nombre_del_contenedor>
sudo ls /var/lib/docker/volumes/nombre_del_volumen/_data
db.sql
```

¡Sobrevivió al borrado de su contenedor! El archivo _db.sql_ forma parte del volumen llamado nombre\_del\_volumen (o el que tú le hayas puesto) y para tener acceso a él nuevamente basta con montar el volumen en otro contenedor. Más adelante te explico como. 

Antes, veamos otra manera de crear volúmenes.

### Crear volúmenes en Docker

Docker también permite crear un volumen sin correr un contenedor usando el comando _docker volume create_, seguido del nombre que deseemos para nuestro volumen. Como ya mencionamos, Docker creará cada uno de estos volúmenes en la ubicación "/var/lib/docker/volumes/nombre\_del\_volumen/".

```bash
docker volume create <nombre_del_volumen>
```

### Inspeccionar volumen

Si inspeccionamos un volumen veremos información relacionada con el volumen que creamos, donde está localizado en nuestro sistema, su nombre y la fecha de creación.

```bash
docker volume inspect <nombre_del_volumen>
[
    {
        "CreatedAt": "2020-10-05T21:16:44-05:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/nombre_del_volumen/_data",
        "Name": "nombre_del_volumen",
        "Options": {},
        "Scope": "local"
    }
]
```

### Listar volúmenes

Para listar todos los volúmenes disponibles usaremos el comando _docker volume ls._

```bash
docker volume ls
DRIVER              VOLUME NAME
local               <nombre_del_volumen>
```

### Montar volúmenes en Docker

**Para montar un volumen, que hemos creado previamente**, en un contenedor usamos la opción _\--mount_, seguido del nombre del volumen (src) y de su destino en el contenedor (dst), separados por una coma

```bash
docker run -d --name db --mount src=<nombre_del_volumen>,dst=/data/db mongo
```

### Borrar volúmenes

Para borrar un volumen usamos el comando _docker volume rm_. Sin embargo, **no podemos borrar un volumen que esté en uso por un contenedor,** por lo que es necesario detener y borrar primero su contenedor.

```bash
docker volume rm <nombre_del_volumen>
```

### Limpiar volúmenes

Si tenemos volúmenes que no están asociados a ningún contenedor podemos deshacernos de todos ellos con un único comando: _docker volume prune._

```bash
docker volume prune
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
```

### Volúmenes conectados

Si queremos que una carpeta de nuestro sistema se sincronice con una carpeta de nuestro contenedor podemos hacerlo también usando volúmenes. En lugar de especificar el nombre del volumen usamos la dirección de la carpeta a sincronizar. A diferencia de los volúmenes que gestionaba Docker, que requerían permisos root aquí nosotros decidimos la carpeta que usará Docker como volumen, por lo que, si tenemos los permisos adecuados, seremos capaces de modificar, crear o leer archivos con nuestro usuario actual.

**Cualquier cambio que hagamos en nuestro contenedor o en nuestra máquina va a verse reflejado en ambos.** Es decir que si creamos o modificamos un archivo, este va a aparecer tanto en nuestro sistema, como dentro del contenedor.

El siguiente ejemplo crea un contenedor llamado mongoDB (_\--name mongoDB_), en modo detach (_\-d_). La opción _\-v_ va a vincular la carpeta especificada antes de los dos puntos, con el directorio del contenedor que especifiquemos después de los dos puntos. Al final va el nombre de nuestra imagen, en este caso nuestra base de datos No-sql llamada mongo.

```bash
docker run --name mongoDB -d -v /home/usuario/basesDeDatos/miBaseDeDatosEnMongo:/data/db mongo
```

Si queremos que el volumen sea de solo lectura bastará con agregar "_:ro_" al final de nuestra sintaxis.

```bash
docker run --name mongoDB -d -v /Users/usuario/Dev/database:/data/db:ro mongo
```

Listo, con esto basta para tener una idea básica de los volúmenes. 

Pero teclear los comandos uno a uno es engorroso, y no puedes (ni debes) guardar esos comandos en un sistema de control de versiones, por qué no escribir algo más portable y cómodo, bueno, para eso puedes [aprender a escribir un Dockerfiles.]({{< ref path="/posts/docker/como-escribir-un-archivo-docker-file/index.md" lang="es" >}})

## Comandos de docker útiles

Encontrar el archivo *docker-compose.yml* que ejecuta un contenedor

``` bash
docker inspect <container_id> | grep com.docker.compose
```

Detener todos los contenedores

``` bash
docker stop $(docker ps -a -q) 
```

Este tutorial cubrió solo lo básico sobre Docker. A continuación hablaré sobre [docker compose, la herramienta de gestión de contenedores de Docker]({{< ref path="/posts/docker/docker-compose-tutorial-con-comandos-en-gnu-linux/index.md" lang="es" >}})