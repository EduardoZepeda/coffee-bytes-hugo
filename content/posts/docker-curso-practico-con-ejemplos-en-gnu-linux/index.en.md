---
aliases:
- basic-commands-basic-docker-tutorial
- /en/basic-commands-basic-docker-tutorial
title: "The Most Useful and Basic Docker commands"
date: "2020-10-07"
categories:
- "docker"
- "linux and devops"
coverImage: "images/DockerCursoPractico.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@huy-phan-316220/"
description: "A compilation and listing most useful and basic docker commands: how to create, destroy, manage containers and volumes and how to use Dockerfiles and understand its build process."
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

If you read the previous post where I explain [what Docker is for](/en/what-is-docker-and-what-is-it-for/) you should already have a pretty simple idea of Docker, but I haven't posted anything about the most basic docker commands. Here I explain them in detail, and also how to use volumes along with Dockerfiles to automate your container's creation process.

## Images and containers are different

Before we start, it is necessary to clarify that in Docker we work with containers that are created from images. An image is like a read-only template, while the container is the materialization of that template, you could say that it is an instantiated or running image.

You can think of images and containers **as classes and their instances in OOP**, respectively.

If you are interested in knowing how a container works at the code level, I have a post where I explain [how to create a container from scratch using Go](/en/how-does-a-docker-container-work-internally/).

{{<ad>}}

## Basic Docker commands for containers

### Running a docker container

To run a container we will use the run command and the name of the image from which it will be derived. You can specify what you want your container to be called with the _--name_ option.

```bash
docker run hello-world
docker run --name <container_name> hello-world
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

After executing the above command, Docker will download the hello-world image and create a container, this container will run, perform its function and finish executing.

### Download an image

If you just want to pull an image to make it available, without running it, you can use the command docker pull, followed by the image name.

This command will fetch an image from the repositories and download it to your system.

```bash
docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
Digest: sha256:4cf9c47f86df71d48364001ede3a4fcd85ae80ce02ebad74156906caff5378bc
...
```

### Search for an image

The hello-world image is probably the most boring image out there and you'll definitely want to look for an image that does more than just print text on the screen.

To search for an image we can use the docker search command. What this command does is to connect to docker hub and search for the image that we indicate.

On Dockerhub there are mysql images, nginx images, alpine linux images, python images, django images, wordpress images, ghost images and just about any other technology, and combinations thereof, you can name.

```bash
docker search nginx
NAME DESCRIPTION STARS OFFICIAL AUTOMATED
nginx Official build of Nginx. 13802               [OK]                
jwilder/nginx-proxy Automated Nginx reverse proxy for docker con…   1885                                    [OK]
richarvey/nginx-php-fpm Container running Nginx + PHP-FPM capable of…   787                                     [OK]
```

On the other hand, if you prefer to do it in a more visual way you can visit [Docker hub](https://hub.docker.com/). There you can get any kind of
image you can imagine, even upload your own. Take a look around and see all the options that are available for download. We won't be downloading any others for now.

![Screenshot from Dockerhub, the official repository for Docker images](images/Docker-hub.png)

### See images

If we now run docker images our downloaded image will appear. Look at the low size of the image, it weighs only 13.3kB! Also look at the IMAGE ID** column. Each image, including custom images, has a unique id that represents it and a tag**.

```bash
docker images
REPOSITORY TAG IMAGE ID CREATED SIZE
hello-world latest bf756fb1ae65 8 months ago 13.3kB
```

### Inspect a docker image

To inspect an image just use docker inspect, followed by the image name or id. Docker will print information related to the image in JSON format.

With docker inspect we will be able to see its environment variables, startup commands, associated volumes, architecture and many other features.

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

### History of an image

Docker history shows us the history of an image; the commands that have been executed and their respective triggers.

```bash
docker history hello-world
IMAGE CREATED CREATED BY SIZE COMMENT
bf756fb1ae65 9 months ago        /bin/sh -c #(nop)  CMD ["/hello"]               0B
```

### Delete a docker image

To delete an image there is the _rmi_ command, yes like _rm_, but with the i in "image" below, we will need either its id or its repository and its tag separated by a colon ":"

```bash
docker rmi repository:tag
docker rmi <image_id>
```

If you wanted to delete the hello-world image it would be as follows. Typing docker rmi, followed by the name of the image followed by a colon from its tag.

```bash
docker rmi hello-world:latest
```

### View Docker processes

If we want to see the executed processes we use docker ps with the _-a_ option. **Please note that our container has an id and also a name**, which is generated by Docker automatically if we don't specify it, in this case "lucid_morse".

```bash
docker ps -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
0f100ae4a21e hello-world        "/hello"       10 minutes ago Exited (0) 10 minutes ago lucid_morse
```

If we remove the _-a_ option, it will show only the active processes. As the container we created from the hello-world image finished running it will not appear in this list.

```bash
docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

### Delete a container when finished running it

Each time we run docker run a new container is created. To avoid getting full of containers we can delete them automatically when they finish their execution using the _--rm_ option after docker run. Try running the hello-world image again.

```bash
docker run --rm hello-world
```

If you now run docker ps -a again, you will see that **no additional container** has been created to the one we already had.

```bash
docker ps -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
0f100ae4a21e hello-world        "/hello"       10 minutes ago Exited (0) 10 minutes ago lucid_morse
```

### Delete a container

To delete containers, you can use the _docker rm_ command, with the container name or id.

```bash
docker rm <container_name_or_id>
```

### How to delete all docker containers

It is quite common to want to delete all containers in Docker. **To do this we need to get all the container ids.

If you run the following command you will see a list of all the container ids printed. That's right, it is the same command that we executed previously to see all the Docker processes, the _-q_ option makes it only show us the ids of those processes.

```bash
docker ps -aq
8344e4d39fbf
42174ad3810d
...
```

Now that we have all the ids, we can use this list with the docker rm command to delete all the containers.

```bash
docker rm $(docker ps -aq)
```

### Accessing the terminal in a container

The following command will introduce us into a container created from an image. Technically what docker run -it does is to link the standard input (STDIN) of our operating system with the standard input (STDIN) of our container. This allows us to run a container that we can interact with.

```bash
docker run -it <container>
```

**Notice how the terminal prompt will change** and we will find ourselves in a terminal from which we will be able to interact.

Try running an _ls_ or _pwd_. You will notice that you are inside a GNU/Linux operating system. You can create files, modify them, create folders, etc.

If you don't know anything about GNU/Linux commands you can check my post about the [basic GNU Linux commands: cd, ls, rm, etc.](/en/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp//) to refresh your memory.

```bash
ls
bin boot dev etc home lib lib32 lib64 libx32 media mnt opt proc root run sbin srv sys tmp usr var
pwd
/
```

### How to extract a file from a docker container?

To extract a file from a container we use the *docker cp* command, which is basically an analogue of the [Linux cp-command](/es/comandos-basicos-de-linux-grep-ls-cd-history-cat-cp-rm-scp/), with the following syntax.

``` bash
docker cp <container_name>:<path_to_file> <path_to_extract_on_your_computer>
```

### Running a docker container in the background

When we want a container to remain running in the background we use the _-d_ tag, which comes from detach (you can also easily remember it by associating it with "daemon").

```bash
docker run -d nginx
```

If we now run _docker ps_, to see the processes that are running in Docker, we can notice that the Nginx server that we started with the previous command is active.

```bash
docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
8c7fbece083b nginx           "/docker-entrypoint.…"   8 seconds ago Up 6 seconds 80/tcp boring_hugle
```

### How to view a container's logs

If our container failed to run the way we expected, examining the logs would be a good place to start.

For this task Docker provides us with the _docker logs_ command, to which we will specify the container to inspect. The container from the previous step was assigned the name "boring_hugle", although yours can have man.

For now don't worry about errors and warnings.

```bash
docker logs <container_name>
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
...
```

### Executing a command in a running container

To execute a command on a **container that is running** the exec command will be used. It is important to note that the **container name is **used here,** not the image. The following command will run bash on the container. Remember that to see the containers running we use "_docker ps -a_".

```bash
docker exec -it <container_name> bash
```

The use of _docker exec_ is not limited to entering a terminal. Look what happens if we run the curl command to localhost on the container where Nginx is running.

```bash
docker exec -it boring_hugle curl localhost
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

### Stop a Docker container

To stop a running container just run _docker stop_, followed by the container name or id.

```bash
docker stop <container_name_or_id>
```

### Start a container

If we want to run a container that is stopped we now use _docker start_.

```bash
docker start <container_name_or_id>
```

### Restart a Docker container

If instead we want to restart a running container we can use _docker restart_.

```bash
docker restart <container_name_or_id>
```

### How to expose a container's port to the outside

So far we have created containers with which we cannot interact from the outside. If we try to open localhost we will see that our Nginx container does not return anything.

![Firefox connection error page](images/ErrorFirefox.png "Firefox error when trying to access Nginx container")

This is because each container has its own network and its own ports. If we want to redirect the ports of the container to the ports of our computer we use the option _-p_, **placing first the port number of our computer** separated with a colon of the one that corresponds to the container.

```bash
docker run -d --name ngnixServer -p 8080:80 nginx
```

The above command created an instance of the Nginx web server, so we will redirect, to OUR port 8080, what comes out of YOUR port 80.

When you finish executing this command you can open your browser and check that you are running an Nginx server.

![Welcome message from a server](images/nginx-corriendo-sobre-docker.png)

## Data persistence with volumes in Docker

The changes we make inside Docker containers, such as creating files, modifying configurations and others, stay there, if we delete the container the information and changes are lost forever.

### Data persistence in Docker

Volumes are the tool that will allow us to store information outside the containers and, therefore, remains even if we delete them.

You can think of them as isolated parts in your system, which you can assemble into the container system.

Docker stores these containers in the location "_/var/lib/docker/volumes/volume_name/_data_". **These folders are only accessible to docker and the root user**, so we do not have the permissions to modify their content directly, using our normal user. Review the [permissions in GNU/Linux](/en/understand-permissions-in-gnu-linux-and-the-chmod-command/) if you have doubts.

Let's try to make it clearer with an example:

### Create a volume when running an image

To create a volume when running a container we specify it with the -v option, followed by the volume we want to assign to the volume, separated by a colon from the location to which we want to assign the volume in the container.

```bash
docker run -d -it --name <container_name> -v <volume_name>:/var/lib/mysql ubuntu
```

If we now enter the terminal of that container.

```bash
docker exec -it <container_name> bash
```

Once in the container we enter the folder _/var/lib/mysql_ and create a file named _db.sql_

```bash
cd /var/lib/mysql
touch db.sql
exit
```

Now, if we do an ls on the location where Docker stores the volumes we should see the file we just created.

```bash
sudo ls /var/lib/docker/volumes/volume_name/_data
db.sql
```

There it is! If we now stop and delete the container we will see that our volume still exists.

```bash
docker stop <container_name>
docker rm <container_name>
sudo ls /var/lib/docker/volumes/volume_name/_data
db.sql
```

He survived the deletion of his container! The _db.sql_ file is part of the volume named volume_name (or whatever you have named it) and to access it again you just have to mount the volume in another container. I will explain how later.

First, let's look at another way to create volumes.

### Create volumes in Docker

Docker also allows you to create a volume without running a container by using the _docker volume create_ command, followed by the name you want for your volume. As mentioned above, Docker will create each of these volumes in the location "/var/lib/docker/volumes/volume_name/".

```bash
docker volume create <volume_name>
```

### Inspect volume

If we inspect a volume we will see information related to the volume we created, where it is located in our system, its name and the creation date.

```bash
docker volume inspect <volume_name>
[
    {
        "CreatedAt": "2020-10-05T21:16:44-05:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/volume_name/_data",
        "Name": "volume_name",
        "Options": {},
        "Scope": "local"
    }
]
```

### List volumes

To list all available volumes we will use the _docker volume ls._ command.

```bash
docker volume ls
DRIVER VOLUME NAME
local               <volume_name>
```

### Mount volumes in Docker

**To mount a volume, which we have previously created**, in a container we use the _--mount_ option, followed by the name of the volume (src) and its destination in the container (dst), separated by a comma

```bash
docker run -d --name db --mount src=<volume_name>,dst=/data/db mongo
```

### Delete volumes

To delete a volume we use the _docker volume rm_ command. However, **we cannot delete a volume that is in use by a container,** so it is necessary to stop and delete its container first.

```bash
docker volume rm <volume_name>
```

### Clean volumes

If we have volumes that are not associated to any container we can get rid of all of them with a single command: _docker volume prune._

```bash
docker volume prune
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
```

### Volumes connected

If we want a folder in our system to synchronize with a folder in our container we can also do it using volumes. Instead of specifying the name of the volume we use the address of the folder to synchronize. Unlike the volumes that Docker managed, which required root permissions here we decide the folder that Docker will use as a volume, so if we have the appropriate permissions, we will be able to modify, create or read files with our current user.

**Any change that we make in our container or in our machine is going to be reflected in both of them, that is to say that if we create or modify a file, it is going to appear in our system as well as inside the container.

The following example creates a container named mongoDB (_--name mongoDB_), in detach (_-d_) mode. The _-v_ option will link the folder specified before the colon, with the directory of the container we specify after the colon. At the end is the name of our image, in this case our No-sql database called mongo.

```bash
docker run --name mongoDB -d -v /home/user/database/myMongoDb:/data/db mongo
```

If we want the volume to be read-only, just add "_:ro_" to the end of our syntax.

```bash
docker run --name mongoDB -d -v /Users/user/Dev/database:/data/db:ro mongo
```

There, this is enough to have a basic idea of the volumes. Finally, the Dockerfile files follow.

## Create an image with a Dockerfile

Up to this point everything has been done manually, through the terminal, but what if we want a way to save our transformation process to an image so we can easily share it or put it in git. Dockerfile allows just that and makes it easy to design an image according to our whimsical requirements.

A Dockerfile is a file **without extension** where we will specify a series of transformations, ordered, that we want to apply to an image. In a Dockerfile we can add custom configuration files, our own code, extra libraries, open custom ports or whatever we want.

It is basically a template or recipe that indicates how our system should look like.

### Preparation of a Dockerfile

For this example we are going to create a new folder, where we will create the Dockerfile. Remember, that a **Dockerfile is just a file without extension **.

```bash
mkdir dockerTest
cd dockerTest
touch Dockerfile
```

Now we create a requirements file for pip that includes Django and gunicorn. In case you don't know, Django is a web development framework and gunicorn is a server often used in conjunction with Django.

```bash
printf "Django==3.0.1\ngunicorn==19.7.1" > requirements.txt
```

Next, we are going to create a project with django to use it as a base for our project. **Make sure you have pip installed on your system or you won't be able to use django-admin ** In case you can't download version 3.0.1 you can use any other version and it should also work.

```bash
sudo pip install Django==3.0.1
django-admin startproject myDjangoDockerApp
```

If we now review our current folder we will see the following file and folder structure. If you don't know Django ignore the files, the important thing for now is that you know that **gunicorn only needs to know where the wsgi.py file is to start the server**.

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

### Example, creation and analysis of a Dockerfile

With all these files we are going to create a custom image for our Dockerfile. Open the Dockerfile file with your favorite text editor and let's write the following content.

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

* **FROM python:3.6: All Dockerfiles need an image to start from**, in this case that image is python:3.6.
* **ENV PYTHONBUFFERED 1:** Allows us to read the Python logs in our terminal.
* **ADD . /app/:** Adds all files in the current folder to the /app/ folder. Also serves COPY, the difference is that ADD accepts compressed files or a url.
* **WORKDIR /app/myDockerDjangoApp:** Sets the /app/myDockerDjangoApp folder as the base folder to use when running commands with CMD, RUN, ADD or COPY.
* **RUN pip install -r /app/requirements.txt:** RUN allows to execute commands, which are executed when the image is compiled and saved as a new layer in the image. We will use RUN to install all the dependencies we specified in the requirments.txt file (Django and Gunicorn only).
* **EXPOSE 8000:** Expose port 8000 to the outside.
* **ENV PORT 8000**: Creates an environment variable called PORT with the value of 8000. This will be used to access the port.
* **CMD ["gunicorn", "myDockerDjangoApp.wsgi"]:** CMD executes a command when starting a container from an image, the commands and arguments are separated as if they were a Python list. In this case, as I mentioned above, gunicorn just needs to know where the wsgi file that django generated automatically is.

### Difference between RUN and CMD in Docker

The RUN directive allows you to execute commands inside a Docker image, **these commands are executed only once when the image is compiled** and are saved in your Docker image, as a new layer. RUN is ideal for permanent changes that affect the image, such as installing packages.

```dockerfile
RUN pip install -r requirements.txt
```

CMD allows you to run **a command once the container boots**, however any changes in CMD require you to recompile the image. This makes it ideal for booting web servers, or services.

```dockerfile
CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "project.wsgi"]
```

### The order is important in a Dockerfile

Compiling a Dockerfile is a sequential process, each step creating an intermediate image that Docker can cache.

Docker uses the stored cache to avoid having to repeat unnecessary steps when a change occurs in a Dockerfile, i.e. if you make a change in one of the steps, Docker will try to use its cached data to avoid repeating all the previous steps.

Therefore, consider the order in which you carry out your instructions to avoid time-consuming and resource-intensive image compilations.

Tip: Place package installations or processes that are unlikely to change first, and place those steps that change frequently, such as your application code, at the end.

```bash
Sending build context to Docker daemon 12.8kB
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

### How to compile a Dockerfile

To compile a Dockerfile and create a custom image created from the contents of our file, just run the _docker build_ command and set the location of the Dockerfile. _Docker build_ allows us to specify a tagname and a version, separated by a colon ":", using the _--tag_ tag. Note that the colon at the end is not a blob on your screen or a bug, but refers to the folder we are in.

```bash
docker build --tag djangocontainer:0.1 .
```

You can see that our image has been created by executing the command docker images

```bash
docker images
REPOSITORY TAG IMAGE ID CREATED SIZE
djangocontainer 0.1 6e3ffe358338 About a minute ago 912MB
```

Now that we have the image we just need to run it. For this example we will bind our port 8000 to port 8000 of our container, run our container in the background and name it test_container.

```bash
docker run -p 8000:8000 -d --name test_container djangocontainer:0.1
```

Now comes the best part! The moment where we find out if our code works or we made a complete mess.

```bash
curl localhost:8000
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
...
```

If we open our browser and enter our localhost on port 8000 we will see the Django rocket indicating that everything worked perfectly. Gunicorn is serving our Django application on port 8000, which we can access through our port of the same number.

![Django installation success page, shows welcome message and links to documentation](images/djangoRocketNoCursor.gif)

This tutorial covered only the basics of Docker. Next I will talk about [docker compose, the Docker container management tool](/en/how-to-convert-jpg-to-webp-on-gnu-linux/).