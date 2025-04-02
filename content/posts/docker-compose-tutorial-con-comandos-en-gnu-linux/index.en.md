---
title: "Get to know the basic Docker Compose commands"
date: "2020-10-14"
categories:
- "docker" 
- "linux and devops"

coverImage: "images/DockerCompose.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@felixmittermeier/"
description: "In this Docker compose tutorial I explain the most common commands, as well as the structure and creation of a docker-compose.yml file."
keyword: docker compose
keywords:
- docker
- docker compose
- go
- containers
- tutorial
- yml
- devops

url: "get-to-know-the-basic-docker-compose-commands"
authors:
- Eduardo Zepeda
---

Docker compose allows us to create applications with multiple containers, these containers will interact and will be able to see each other. To configure each of these services we will use a file in YAML format (also called YML). In this docker compose tutorial I show you some of the most used commands and what each one does. If you want to review the basic Docker commands visit my [basic Docker commands and usage](/en/the-most-useful-and-basic-docker-commands//) post.

## What is docker compose?

Docker compose is a tool that allows you to manage applications consisting of multiple Docker containers. Instead of having multiple Dockerfiles and be running and linking one by one with Docker, we define a docker-compose.yml file with the configuration we want and run it, this will create all the necessary services of our application. It also works in development, production, staging or testing environments, as well as with continuous integration services.

Docker-compose is programming using the [go or golang programming language](/en/go-programming-language-introduction-to-variables-and-data-types/); the same language that [go containers run internally](/en/how-does-a-docker-container-work-internally/).

Docker compose allows you to automate processes, and is used in such popular projects as [cookiecutter-django, with which you can get a django application production-ready in minutes](/en/cookiecutter-django-for-configuring-and-deploying-in-django/).

{{<ad>}}

## Structure of a docker-compose.yml file

Just as Dockerfile existed in Docker, where you configured the state of a container in a declarative way, in Docker compose there is an equivalent: yml files.

Before we start with the commands let's explain the structure of a docker-compose configuration file and some common guidelines.

A docker-compose file is simply a file with yml extension and format. To use it just create it and start adding content.

```bash
touch docker-compose.yml
```

These yml files are incredibly simple to understand.

```docker
version: '3.8'
services:
  <service_name>:
    <configuration_variable>:
      <values>
    <configuration_variable>:
      <values>
  nombre_de_otro_<service>:
    <configuration_variable>:
      <values>
```

A docker-compose file starts by **specifying the version of docker compose** to be used. For this example we will use version 3.8.

The services section is nested after the version. There can be as many services as we want; web framework, web server, database, documentation, cache, etc. Each service will have its own configuration variables and their respective values. That's all, as simple as that.

### Service names

The name we use for each service in our yml file will serve as a reference for its use in other services.

For example, if a service is called "_db_", this is the name we should use in other applications to refer to a host or location.

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

The customization of a docker-compose.yml file depends on its configuration options, these will tell each of the services how to behave.

There are many configuration variables, which you can consult in the [official Docker documentation](https://docs.docker.com/compose/compose-file/) So that you don't have to read them all, here are some of the most important ones.

### image

The image configuration sets the image from which the service will be generated, ideal if our service does not need very complicated customization.

```bash
version: "3.8"
services:
  db:
    image: postgres
```

### build

In case we need a custom image it will probably be better to use a Dockerfile. The build option allows us to indicate the directory where it is located.

If you don't know what a Dockerfile is, here I explain [how it works and what Docker is for](/en/what-is-docker-and-what-is-it-for/)

```docker
version: "3.8"
services:
  webapp:
    build: ./ubicacion_del_Dockerfile
```

### context and dockerfile

We can also write a custom Dockerfile, instead of the default one, specifying in context the place where it is located and in dockerfile its name. This is quite useful because it allows us to specify different files for production or development.

```docker
version: "3.8"
services:
  webapp:
    build:
      context: ./ubicacion_del_Dockerfile
      dockerfile: Dockerfile-personalizado
```

### command

Command overwrites the container's default command. This option is ideal for executing a command when starting a service, for example a web server.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
```

### ports

Ports tells us the ports that we will expose to the outside and to which port of our machine they will be linked, always in the format of HOST:CONTAINER.

```docker
version: "3.8"
web:
  build: .
  command: python manage.py runserver 0.0.0.0:8000
  ports:
    - "80:8000"
```

In the code above, port 80 of our machine will correspond to port 8000 of the container. Remember, HOST:CONTAINER.

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

Expose also exposes ports, **the difference with ports is that the ports will only be available for the linked services,** not for the machine from where we are running docker-compose.

```docker
version: "3.8"
services:
  redis:
    image: redis
    expose:
      - '6379'
```

### depends_on

Sometimes we want one of our services to run only after another. For example, for a web server to work properly, it is necessary to have a database that is already running.

depends_on allows us to make the start of the execution of a service depend on others. In simpler words, it tells docker-compose that we want to start the web service **only if all other services have already been loaded.

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

In the above example docker-compose will run the web service only if the db and redis services are already available.

### environment

The environment configuration allows us to set a list of [environment variables](/en/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/) that will be available in our service.

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

If we do not specify a value for an environment variable and leave its value blank, docker-compose will take it from the machine where docker-compose is running.

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

This way we don't have to expose sensitive information if we decide to share our Docker compose files or store them in a version control system.

### env_file

If we want to load multiple environment variables, instead of specifying the variables one by one, we will use env_file in our file.

```docker
version: '3.8'
services:  
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    env_file: common.env
```

Consider that the _env_file_ directive loads values into containers. So these variables will not be available at the time of creating the container. For example: you cannot put the PORT variable in an env_file and then condition the port that exposes your service.

```docker
# NO ES POSIBLE ESTO
expose:
  - ${PORT}
```

### Environment variables with .env

Docker compose automatically loads a file named _.env_ from the root of the project and uses its environment variables in the configuration of its services.

```docker
# Posible con un archivo.env que contenga PORT=8009
expose:
  - ${PORT}
```

### healthcheck

This command is to periodically check the status of a service. That is to say, we can create a command that allows us to know if our container is running correctly.

With the configuration below, Healtcheck will run a curl to localhost, every minute and a half, once 40 seconds have passed, if the command takes more than 10 seconds to return a result it will consider it as a failure and if a failure occurs more than 3 times the service will be considered "unhealthy".

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

We can send parts of our operating system to a service using one or several volumes. For this we use the syntax HOST:CONTAINER. Host can be a location on your system or also the name of a volume you have created with docker.

```docker
version: '3.8'
services:  
  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"
```

Optionally we can specify whether the use of volumes will be read-only or read-write, with "ro" and "rw", respectively.

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

Now that we have seen how a docker-compose file is conformed and some of its most common configurations, let's start with the basic commands.

### Compiling a service file

To build a docker-compose file just run build. This command will look for a file named docker-compose.yml in the current folder.

```bash
docker-compose build
#Building postgres
#Step 1/4 : FROM postgres:12.3
# ---> b03968f50f0e
#Step 2/4 : COPY ./compose/production/postgres/maintenance /usr/local/bin/maintenance
# ---> Using cache
#...
```

If we want to specify a specific docker-compose file we use the _-f_ option, followed by the file name.

```bash
docker-compose -f production.yml build
```

### Running docker-compose and its services

Once the image with our services has been created we can start and create the services with the up command. With docker-compose up will start or restart all the services in the docker-compose.yml file or the one we specify with _-f_.

```bash
docker-compose up
#Creating network "my_project" with the default driver
#Creating postgres ... done
#Creating docs     ... done
#Creating django   ... done
```

We will probably want to run our stack of services in the background, for that just add the _-d_ option at the end.

```bash
docker-compose up -d
```

### Run a command inside a running container

To execute a command inside a running service we use the command docker-compose exec, followed by the name of the service and the command. In this case when running bash we enter the terminal of our service named app.

```bash
docker-compose exec app bash
```

### Stop and remove services

Stops and removes containers, networks, volumes and images that are created with the docker-compose down command.

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

If we want to restart one or all services we use the command docker-compose restart.

```bash
docker-compose restart
#Restarting django   ... done
#Restarting docs     ... done
#Restarting postgres ... done
```

To execute docker-compose restart on a single service, just put the name of the service at the end.

```bash
docker-compose restart <service>
```

### Stop the services without removing them

To stop one or all services we have to use docker-compose stop.

```bash
docker-compose stop
#Stopping django   ... done
#Stopping docs     ... done
#Stopping postgres ... done
```

To execute docker-compose stop a only to a service just put the name of the service at the end.

```bash
docker-compose stop <service>
```

### Starting docker-compose services without creating them

We can start one or all services with docker-compose start. This command is useful only to restart containers previously created but stopped at some point, and it does not create any new containers.

```bash
docker-compose start
#Starting postgres ... done
#Starting django   ... done
#Starting docs     ... done
```

By adding the name of a service at the end the docker-compose start command will be executed on that service only.

```bash
docker-compose start <service>
```

### Running a command within a service

To execute a command inside one of our services we use the run command, the --rm option will delete the container that will be created when finished executing, then we place the command. Unlike docker-compose start, **this command is used to perform one-time tasks**.

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
docker-compose ps <service>
```

### Access to processes

In the same way as the top command in GNU/Linux, docker-compose top shows us the processes of each of our services.

```bash
docker-compose -f local.yml top
#django
#UID PID PPID C STIME TTY TIME CMD                               
#---------------------------------------------------------------------------------------------------------------------
#root 29957 29939 0 20:09   ?     00:00:00   /bin/bash /start
#...
```

To see the processes of a single service just type its name at the end of the command docker-compose top

```bash
docker-compose top <service>
```

### View logs

If something went wrong we can view the logs using docker-compose logs. If we want to see the logs of a specific stack just set our yml file with the _-f._ option.

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

As with the other commands, if we want to read the logs of a service, it is enough to add its name at the end.

```bash
docker-compose -f production.yml logs <service>
```

## Scaling containers

Previously, the docker-compose scale command was used to scale services. In the new versions of docker-compose scaling containers is done with the command docker-compose up. After the command we add the --scale option followed by the service we want to scale and the number of copies using the format service=number.

```bash
docker-compose -f production.yml up -d --scale <service>=3
```

We must take into account that when we scale a container, it will try to create another container with a port that will already be in use, which will cause a conflict, for this reason we need to specify port ranges in our docker compose file. We also cannot use container names in our services, so we will have to remove them.

```docker
services:
  django:
    build:
      context: .
      dockerfile: Dockerfile
    image: customImage
    container_name: django # Please keep this line
    depends_on:
      - postgres
    volumes:
      - .:/app:z
    env_file:
      - ./django.env
      - ./posgres.env
    ports:
      - "8000-8005:8000" # Apply ranges to ports
    command: /start
```

How about a practical application of Docker Compose? In my next post I'll explain how to deploy using cookiecutter-django and docker-compose; thanks to cookie-cutter a couple of docker-compose commands are enough, a production-ready application with SSL and many more features.