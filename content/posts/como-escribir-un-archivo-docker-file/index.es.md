---
title: "Como escribir un archivo de Dockerfile desde cero"
date: "2020-10-09"
categories:
- "docker"
- "linux and devops"
coverImage: "images/how-to-create-docker-file-from-scratch.jpg"
description: "Escribir un dockerfile desde cero, aprender las palabras clave más básicas en un Dockerfile y aprender la importancia de cuidar el orden de esas instrucciones para mejorar la caché y tener un proceso de compilación en docker más veloz."
keyword: basic docker commands
keywords:
- docker
- containers
- python
- django
- nginx
authors:
- Eduardo Zepeda
---

En la [entrada anterior te explique los comandos más comunes de Docker, run, exec, pull, etc](/es/tutorial-de-comandos-basicos-de-docker/). Hasta este momento todo se ha hecho de manera manual, a través de la terminal, pero que tal si queremos una manera de guardar nuestro proceso de transformaciones a una imagen para poder compartirlo fácilmente o para llevar un registro en git. Los Dockerfile permiten justamente eso y facilitan personalizar una imagen como una serie de pasos a seguir para llevar nuestro sistema al punto al que querramos.

## ¿Qué es un Docker file?

Un Dockerfile es un archivo **sin extensión**, usualmente llamado *Dockerfile*, donde especificaremos una serie de transformaciones, ordenadas, que queremos aplicar a una imagen. En un Dockerfile podremos agregar archivos de configuración personalizados, código propio, librerías extras, abrir puertos personalizados o lo que querramos.

Es básicamente una plantilla o receta que índica como tiene que quedar nuestro sistema.

## Preparar un Dockcerfile

Para este ejemplo vamos a crear una carpeta nueva, donde crearemos el Dockerfile. Recuerda, que un **Dockerfile es solo un archivo sin extensión.**

La siguiente parte solo crea los archivos que incluiremos en el Dockerfile, no importa si no entiendes perfectamente el proceso.

```bash
mkdir dockerTest
cd dockerTest
touch Dockerfile
```

Ahora creamos un archivo de requerimientos para pip que incluya a Django y a gunicorn. En caso de que no lo sepas, Django es un framework de desarrollo web y gunicorn un servidor frecuentemente usado en conjunción con Django.

```bash
printf "Django==3.0.1\ngunicorn==19.7.1" > requirements.txt
```

A continuación, vamos a crear un proyecto con django para usarlo como base para nuestro proyecto. **Asegúrate de tener instalado pip en tu sistema o no podrás usar django-admin.** En caso de que no puedas descargar la versión 3.0.1 puedes usar cualquier otra y también debería funcionar.

```bash
sudo pip install Django==3.0.1
django-admin startproject myDjangoDockerApp
```

Si ahora revisamos nuestra carpeta actual veremos la siguiente estructura de archivos y carpetas. Si no conoces Django ignora los archivos, lo importante por ahora será que sepas que **gunicorn únicamente necesita saber donde está el archivo wsgi.py para iniciar el servidor**.

```bash
.
├── Dockerfile
├── myDockerDjangoApp
│   ├── manage.py
│   └── myDockerDjangoApp
│       ├── __init__.py
│       ├── settings.py
│       ├── urls.py
│       └── wsgi.py
└── requirements.txt
```

## Escribir un archivo Dockerfile desde cero

Vamos a crear una imagen personalizada para nuestro Dockerfile. Abre el archivo Dockerfile con tu editor de texto favorito y vamos a escribir el siguiente contenido. Te explico a continuación que hace cada paso.

```dockerfile
FROM python:3.6
ENV PYTHONUNBUFFERED 1

ADD . /app/

WORKDIR /app/myDockerDjangoApp

RUN pip install -r /app/requirements.txt

EXPOSE 8000
ENV PORT 8000

CMD ["gunicorn", "myDockerDjangoApp.wsgi"]
```

### Entender la estructura de un Dockerfile

Como puedes observar, un Dockerfile no es otra cosa que una serie de instrucciones secuenciales, cada instrucción tiene una función específica:

- FROM: Especifica la imagen de la cual partimos, existen una serie de imágenes disponibles para múltiples tecnologías, como Python, Javascript, Alpine Linux, entre otras, revisa Dockerhub.
- ENV: Crea variables de entorno, primero el nombre de la variable y posteriormente su valor.
- ADD: Añade archivos desde el entorno a la imagen de Docker de destino. Un punto indica todos los archivos.
- COPY: Igual que el anterior, pero soporta urls y archivos comprimidos.
- WORKDIR: Establece el directorio de trabajo desde el cual se ejecutarán los comandos.
- RUN: Ejecuta un comando una única vez al compilar la imagen.
- EXPOSE: Expone un puerto.
- CMD: Ejecuta un comando al arrancar el contenedor.

Ahora revisemos la imagen que creamos arriba.

- **FROM python:3.6: Todos los Dockerfile necesitan una imagen de la cual partir**, en este caso esa imagen es python:3.6.
- **ENV PYTHONBUFFERED 1:** Esta variable de entorno nos permite leer los logs de Python en nuestra terminal
- **ADD . /app/:** Agrega todos los archivos en la carpeta actual a la carpeta /app/. 
- **WORKDIR /app/myDockerDjangoApp:** Establece la carpeta /app/myDockerDjangoApp como la carpeta base a usar al correr comandos con CMD, RUN, ADD o COPY
- **RUN pip install -r /app/requirements.txt:** RUN permite ejecutar comandos, los cuales se ejecutan al momento de compilar la imagen y quedan grabados como una capa nueva en la imagen. Usaremos RUN para instalar todas las dependencias que especificamos en el archivo requirments.txt (solo Django y Gunicorn).
- **EXPOSE 8000:** Expone el puerto 8000 al exterior.
- **ENV PORT 8000**: Crea una variable de entorno llamada PORT con el valor de 8000. Esto nos servirá para poder acceder al puerto.
- **CMD \["gunicorn", "myDockerDjangoApp.wsgi"\]:** CMD ejecuta un comando al momento de poner en marcha un contenedor a partir de una imagen, los comandos y los argumentos se separan como si fueran una lista de Python. En este caso, como mencioné arriba, gunicorn solo necesita saber donde está el archivo wsgi que generó django automáticamente.

### Diferencia entre RUN y CMD en Docker

La directiva RUN te permite ejecutar comandos dentro de una imagen de Docker, **estos comandos se ejecutan una sola vez cuando se compila la imagen** y quedan grabados en tu imagen de Docker, como una nueva capa. RUN es ideal para cambios permanentes que afecten la imagen, como la instalación de paquetes.

```dockerfile
RUN pip install -r requirements.txt
```

CMD te permite ejecutar **un comando una vez que el contenedor arranca**, sin embargo cualquier cambio en CMD requiere que recompiles la imagen. Lo anterior lo vuelve ideal para arrancar servidores web, o servicios.

```dockerfile
CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "project.wsgi"]
```

## El orden es importante en un Dockerfile

La compilación de un Dockerfile es un proceso secuencial, cada paso crea una imagen intermediaria que Docker puede guardar en cache. 

Docker usa la cache almacenada para evitar tener que repetir pasos innecesarios cuando ocurre un cambio en un Dockerfile, es decir que si tú realizas un cambio en uno de los pasos, Docker tratará de usar sus datos en cache para no repetir todos los pasos anteriores. 

Por lo anterior, considera el orden en el que realizas tus instrucciones para evitarte compilaciones de imágenes costosas en tiempo y recursos.

Tip: Coloca primero las instalaciones de paquetes o procesos que son poco propensos a cambiar y coloca al final aquellos pasos que cambian frecuentamente, como el código de tu aplicación.

```bash
Sending build context to Docker daemon   12.8kB
Step 1/8 : FROM python:3.6
 ---> 46ff56815c7c
Step 2/8 : ENV PYTHONUNBUFFERED 1
 ---> Using cache
 ---> c55438b3c6a0
Step 3/8 : ADD . /app/
 ---> Using cache
 ---> ecedebf26f36
Step 4/8 : WORKDIR /app/myDockerDjangoApp
 ---> Using cache
 ---> 83b5ccaa1cc6
Step 5/8 : RUN pip install -r /app/requirements.txt
 ---> Using cache
 ---> 6cb2683c8fa8
Step 6/8 : EXPOSE 8000
 ---> Using cache
 ---> 744b46577c43
Step 7/8 : ENV PORT 8000
 ---> Using cache
 ---> 03111761fb54
Step 8/8 : CMD ["gunicorn", "myDockerDjangoApp.wsgi"]
 ---> Using cache
 ---> 6e3ffe358338
Successfully built 6e3ffe358338
Successfully tagged djangocontainer:0.1
```

## Compilar un Dockerfile usando docker build

Para compilar un Dockerfile y crear una imagen personalizada creada a partir del contenido de nuestro archivo, basta con ejecutar el comando _docker build_ y establecer la localización del Dockerfile. _Docker build_ nos permite especificar un tagname y una versión, separados por dos puntos ":", usando la etiqueta _\--tag_. Nota que el punto de al final no es una mancha en tu pantalla o un error, sino que hace referencia a la carpeta en la que nos encontramos.

```bash
docker build --tag djangocontainer:0.1 .
```

Puedes ver que nuestra imagen ha sido creada ejecutando el comando *docker images*

```bash
docker images
REPOSITORY                                      TAG                 IMAGE ID            CREATED              SIZE
djangocontainer                                 0.1                 6e3ffe358338        About a minute ago   912MB
```

Ahora que ya contamos con la imagen basta con ejecutarla. Para este ejemplo vincularemos nuestro puerto 8000 con el puerto 8000 de nuestro contenedor, ejecutaremos nuestro contenedor en segundo plano y lo nombraremos *test_container*.

```bash
docker run -p 8000:8000 -d --name test_container djangocontainer:0.1
```

¡Ahora viene la mejor parte! El momento donde averiguamos si nuestro código funciona o hicimos un desastre completo. Vamos a hacer una [petición HTTP usando curl](/es/comandos-basicos-de-linux-passwd-du-useradd-usermod-fdisk-apt/)

```bash
curl localhost:8000
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
...
```

Si abrimos nuestro navegador y entramos a nuestro localhost en el puerto 8000 veremos el cohete de Django indicando que todo funcionó perfectamente. Gunicorn está sirviendo nuestra aplicación de Django en el puerto 8000, al que podemos acceder a través de nuestro puerto del mismo número.

El siguiente paso que podrías tomar es vincular muchas imágenes de Docker para tener una aplicación de tamaño pequeña o mediana con múltiples componentes, para eso [Docker-compose es la herramienta perfecta](/es/docker-compose-tutorial-con-comandos-en-gnu-linux/). Mientras que para aplicaciones mucho más complejas existe Kubernetes, aunque probablemente sea un overkill para la mayoría de ideas de negocio.

![Página de instalación exitosa de Django, muestra un mensaje bienvenida y enlaces a la documentación.](images/djangoRocketNoCursor.gif)