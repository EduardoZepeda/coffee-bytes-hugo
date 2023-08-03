---
title: "Get to know the basic Docker Compose commands"
date: "2020-10-14"
categories:
* "docker" * "linux and devops
* "linux and devops" * "linux and devops" * "linux and devops" * "linux and devops

coverImage: "images/DockerCompose.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@felixmittermeier/"
description: "In this Docker compose tutorial I explain the most common commands, as well as the structure and creation of a docker-compose.yml file."
keywords:
* docker
* "docker compose" * "docker compose" * "docker compose"

url: "docker-compose-tutorial-con-comandos-en-gnu-linux"
autores:

* Eduardo Zepeda
---

Docker compose allows us to create applications with multiple containers.
containers will interact and will be able to see each other. To configure each one
of these services we will use a file in YAML format (also called YML).
In this docker compose tutorial I'll show you some of the most used commands
and what each one does. If you want to review the basic Docker commands visit
my entry on [basic Docker commands and usage](/tutorial).
Docker](/tutorial-of-basic-commands-of-docker/)

## What is docker compose?

Docker compose is a tool that allows you to handle applications that
consist of multiple Docker containers. Instead of having multiple
Dockerfiles and be running and linking one by one with Docker, we define a docker-compose.yml file with the
docker-compose.yml file with the configuration we want and run it,
this will create all the necessary services of our application. In addition
works in development, production, staging or testing environments, as well as with continuous
continuous integration services.

Docker-compose is programming using the [go programming language o
golang](/golang-introduction-to-the-variables-and-data-types-language/); the same
with the language that [internally run the containers of
go](/container-de-docker-with-namespaces-and-cgroups/).

Docker compose allows you to automate processes, and is used in projects such as
popular projects such as [cookiecutter-django, with which you can get a django application production-ready in
django application ready for production in
minutes](/cookiecutter-django-to-configure-and-make-deploy-in-django/).

## Docker-compose.yml file structure

Just as there were Dockerfiles in Docker, where you configured the state of a
container in a declarative way, in Docker compose there is an equivalent: the yml files.
yml files.

Before we start with the commands, let's explain the structure of a file
docker-compose configuration file and some common guidelines.

A docker-compose file is simply a file with extension and format
yml. To use it just create it and start adding content.

```bash
touch docker-compose.yml
```

These yml files are incredibly simple to understand.

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

A docker-compose file starts by **specifying the docker version
compose** to be used. For this example we will use version 3.8.

The services section is nested after the version. There can be as many
as many services as we want; web framework, web server, database,
documentation, cache, etc. Each service will have its own configuration variables and
configuration variables and their respective values. That's it, it's that simple.

### Service names

The name we use for each service in our yml file will serve as a
a reference for use in other services.

For example, if a service is called "_db_", this is the name we should use in other applications to refer to a host or location.
other applications to refer to a host or location.

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

## Configuration options in docker compose

The customization of a docker-compose.yml file depends on its configuration options.
configuration options, these will tell each of the services how to behave.

There are a lot of configuration variables, which you can check in the
[official Docker documentation]().
Docker documentation](https://docs.docker.com/compose/compose-file/) So that you don't have to read them all
read them all will leave some of the most important ones.

### image

The image configuration sets the image from which the image will be generated.
service will be generated, ideal if our service does not need very complicated customization.

```bash
version: "3.8"
services:
  db:
    image: postgres
```

### build

In the case that we need a customized image it will probably be better to
use a Dockerfile. The build option allows us to indicate the directory where it is located.
is located.

If you don't know what a Dockerfile is, here I explain [how it works and what it is used for
Docker](/what-docker-is-and-what-it-does/)

```docker
version: "3.8"
services:
  webapp:
    build: ./ubicacion_del_Dockerfile
```

### context and dockerfile

We can also write a custom Dockerfile, in place of the
default one, specifying in context the location where it is located and in
dockerfile its name. This is quite useful because it allows us to specify
different files for production or development.

```docker
version: "3.8"
services:
  webapp:
    build:
      context: ./ubicacion_del_Dockerfile
      dockerfile: Dockerfile-personalizado
```

### command

Commandescribe the default command of the container. This option is
ideal for executing a command when starting a service, for example a web server.
web server.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
```

### ports

Ports tells us which ports we will expose to the outside world and to which port of
machine they will be bound to, always in the format of HOST:CONTAINER.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
  ports:
    - "80:8000"
```

In the above code the port 80 of our machine will correspond to the port 80 of our machine.
port 8000 of the container. Remember, HOST:CONTAINER.

We can also specify the udp or tcp protocol.

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

Expose also exposes ports, **the difference with ports is that ports only expose ports, **the difference with ports is that ports only expose ports.
will only be available to the linked services,** not to the machine we are running docker-compose from.
where we are running docker-compose.

```docker
version: "3.8"
services:
  redis:
    image: redis
    expose:
      - '6379'
```

### depends_on

Sometimes we want one of our services to be run only after
another. For example, for a web server to work properly it is necessary to have a database already running.
to have a database that is already running.

depends_on allows us to make the start of the execution of a service dependent on
others. In simpler words, it tells docker-compose that we want to start the web service **only if all other services have already been loaded.**.
the web service **only if all other services have already been loaded.

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

In the above example docker-compose will run the web service only if you already have
db and redis services are already available.

### environment

The environment configuration allows us to set up a list of [variables of
environment variables](/linux-commands-that-you-should-know-third-part/) which will be
available in our service.

```docker
version: '3.8'
services:
  db:
    image: postgres
    environment:
      - POSTGRES_USER=usuario
      - POSTGRES_PASSWORD=contrasena
```

We can also use a dictionary syntax instead of the above.

```docker
version: '3.8'
services:
  db:
    image: postgres
    environment:
      MODE: development
      DEBUG: 'true'
```

#### secret environment variables

If we do not specify a value for an environment variable and leave its value at
blank, docker-compose will take it from the machine where docker-compose is running.
docker-compose is running.

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

In this way we do not have to expose sensitive information if we decide to
share our Docker compose files or store them in a version control system.
version control system.

### env_file

If we want to load multiple environment variables, instead of specifying the
variables one by one, in our file we will use env_file.

```docker
version: '3.8'
services:  
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    env_file: common.env
```

Consider that the _env_file_ directive loads values into containers.
So these variables will not be available when creating the container.
container. For example: you can't put the PORT variable in an env_file and then
then condition the port that exposes your service.

```docker
# NO ES POSIBLE ESTO
expose:
  - ${PORT}
```

### Environment variables with .env

Docker compose automatically loads a file named _.env_ from the root of the project and uses its environment variables in the configuration.
in the root of the project and uses its environment variables in the configuration of its services.
configuration of its services.

```docker
# Posible con un archivo.env que contenga PORT=8009
expose:
  - ${PORT}
```

### healthcheck

This command is to periodically check the status of a service. It is
We can create a command that allows us to know if our container is running correctly.
running correctly.

With the configuration below, Healtcheck will run a
curl to localhost, every minute and a half, once 40 seconds have elapsed, if the command takes more than 10 seconds to return a result, it will
command takes more than 10 seconds to return a result it will consider it as a failure.
failure and if a failure occurs more than 3 times the service will be considered "unhealthy".
healthy".

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

We can send parts of our operating system to a service using one or more of these services.
several volumes. For this we use the syntax HOST:CONTAINER. Host can be
a location on your system or also the name of a volume you have created with docker.
with docker.

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"
```

Optionally we can specify whether the use of volumes will be read-only or read-only.
read-write volumes, with "ro" and "rw", respectively.

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

With restart we can apply restart policies to our services.

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    restart: "on-failure"
```

The restart option can take several values

* no: never restarts the container
* always: always restarts it
* on-failure: restarts it if the container returns an error status
* unless-stopped: restarts it in all cases except when stopped

## Basic docker compose commands

Now that we've seen how a docker-compose file is made up and some
of its most common configurations, let's start with the basic commands.

### Compiling a service file

To build a docker-compose file just run build.
This command will look for a file named docker-compose.yml in the current folder.

```bash
docker-compose build
#Building postgres
#Step 1/4 : FROM postgres:12.3
# ---> b03968f50f0e
#Step 2/4 : COPY ./compose/production/postgres/maintenance /usr/local/bin/maintenance
# ---> Using cache
#...
```

If we want to specify a specific docker-compose file, we use the option
_-f_, followed by the file name.

```bash
docker-compose -f production.yml build
```

### Running docker-compose and its services

Once the image with our services has been created we can start up and
create the services with the up command. With docker-compose up it will start or restart all the services in the docker-compose.yml or
restart all the services in the docker-compose.yml file or the one we specify with _-f_.
we specify with _-f_.

```bash
docker-compose up
#Creating network "my_project" with the default driver
#Creating postgres ... done
#Creating docs     ... done
#Creating django   ... done
```

We will probably want to run our stack of services in the background,
for that just add the _-d_ option at the end.

```bash
docker-compose up -d
```

### Run a command inside a running container

To execute a command within a running service we use the command
docker-compose exec, followed by the name of the service and the command. In this case by
run bash we enter the terminal of our service named app.

```bash
docker-compose exec app bash
```

### Stop and remove services

Stops and removes containers, networks, volumes, and images that are created with
the docker-compose down command.

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

### Restart services

If we want to restart one or all of the services we use the command docker-compose
restart.

```bash
docker-compose restart
#Restarting django   ... done
#Restarting docs     ... done
#Restarting postgres ... done
```

To run docker-compose restart on a single service, simply place the
service name at the end.

```bash
docker-compose restart servicio
```

### Stop services without removing them

To stop one or all services we have to use docker-compose stop.

```bash
docker-compose stop
#Stopping django   ... done
#Stopping docs     ... done
#Stopping postgres ... done
```

To run docker-compose stop a single service, simply place the
service name at the end.

```bash
docker-compose stop servicio
```

### Starting docker-compose services without creating them

We can start one or all services with docker-compose start. This command
is useful only to restart containers previously created but stopped at some point, and does not create any new containers.
some point, and it does not create any new containers.

```bash
docker-compose start
#Starting postgres ... done
#Starting django   ... done
#Starting docs     ... done
```

Adding the name of a service at the end of the docker-compose start command will
command will be executed on that service only.

```bash
docker-compose start servicio
```

### Running a command within a service

To execute a command within one of our services we use the command
run, the --rm option will delete the container that will be created when it is finished executing.
run, then we place the command. Unlike docker-compose
start, **this command is used to perform tasks that are performed only once.**.
once**.

```bash
docker-compose run --rm django python manage.py migrate
```

### See the processes

To list the running containers

```bash
docker-compose ps
#  Name Command State Ports         
#-------------------------------------------------------------------------
#django     /entrypoint /start Up 0.0.0.0:8000->8000/tcp
#docs       /bin/sh -c make livehtml Up 0.0.0.0:7000->7000/tcp
#postgres docker-entrypoint.sh postgres Up 5432/tcp
```

To list a single container we place it at the end of our command.

```bash
docker-compose ps servicio
```

### Access to processes

In the same way as the top command in GNU/Linux, docker-compose top gives us
shows us the processes of each of our services.

```bash
docker-compose -f local.yml top
#django
#UID PID PPID C STIME TTY TIME CMD                               
#---------------------------------------------------------------------------------------------------------------------
#root 29957 29939 0 20:09   ?     00:00:00   /bin/bash /start
#...
```

To see the processes of a single service, just type its name at the end of the list
of the command docker-compose top

```bash
docker-compose top servicio
```

### View logs

If something went wrong we can view the logs using docker-compose logs. If we want to
see the logs of a specific stack just set our yml file with the option _-f._._.
with the _-f._ option

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

As with the other commands, if we want to read the logs of a
service, it is enough to add its name at the end.

```bash
docker-compose -f production.yml logs servicio
```

## Scaling containers

Previously, the docker-compose scale command was used to scale services. In
new versions of docker-compose scaling containers is done with the docker-compose up command.
docker-compose up command. After the command we add the option --scale followed by
the service we want to scale and the number of copies using the format
service=number.

```bash
docker-compose -f production.yml up -d --scale servicio=3
```

It should be noted that when we scale a container, it will try to create
another container with a port that will already be in use, which will cause a conflict.
conflict, for this reason we need to specify port ranges in our docker compose file.
docker compose file. We also cannot use container names in our services
our services, so we will have to remove them.

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

How about a practical application of Docker Compose? In my next post I will
I explain how to deploy using cookiecutter-django and docker-compose;
thanks to cookie-cutter just a couple of docker-compose commands and that's it, a production-ready
production ready application, with SSL and many more features.