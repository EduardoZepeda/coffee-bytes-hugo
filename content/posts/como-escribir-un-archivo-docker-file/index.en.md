---
title: "How to write a docker file from scratch"
date: "2020-10-09"
categories:
- "docker"
- "linux and devops"
coverImage: "images/how-to-create-docker-file-from-scratch.jpg"
description: "Write a dockerfile from scratch, learn the most basic keywords in a Dockerfile and learn the importance of the order of those instructions for cache and having a faster docker compilation process."
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

In the previous post [I explained the most common Docker commands, run, exec, pull, etc](/en/the-most-useful-and-basic-docker-commands/). Up to this point everything has been done manually, through the terminal, but what if we want a way to save our process transformations to an image for easy sharing or to keep track in git. Dockerfiles allow just that and make it easy to customize an image as a series of steps to take to get our system to the point we want it to be.

## What is a Docker file?

A Dockerfile is a file **without extension**, usually called *Dockerfile*, where we will specify a series of transformations, ordered, that we want to apply to an image. In a Dockerfile we can add custom configuration files, our own code, extra libraries, open custom ports or whatever we want.

It's basically a template or recipe that indicates how our system has to look like.

## Preparing a Dockerfile with files

For this example we are going to create a new folder, where we will create the Dockerfile. Remember, that a **Dockerfile is just a file without extension.**

The following part only creates the files that we will include in the Dockerfile, it doesn't matter if you don't understand the process perfectly.

```bash
mkdir dockerTest
cd dockerTest
touch Dockerfile
```

Now we create a requirements file for pip that includes Django and gunicorn. In case you don't know, Django is a web development framework and gunicorn is a server often used in conjunction with Django.

```bash
printf “Django==3.0.1 ‘gunicorn==19.7.1’ > requirements.txt
```

Next, let's create a project with django to use as a base for our project. **Make sure you have pip installed on your system or you won't be able to use django-admin**. In case you can't download version 3.0.1 you can use any other version and it should also work.

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

## Write a Dockerfile from scratch

With all these files we are going to create a custom image for our Dockerfile. Open the Dockerfile file with your favorite text editor and let's write the following content.

I'll explain below what each step does.

```dockerfile
FROM python:3.6
ENV PYTHONUNBUFFERED 1

ADD . /app/
WORKDIR /app/myDockerDjangoApp

RUN pip install -r /app/requirements.txt

EXPOSE 8000
ENV PORT 8000

CMD [“gunicorn”, “myDockerDjangoApp.wsgi”]
```

### Understand a Dockerfile structure

As you can see, a Dockerfile is nothing more than a series of sequential instructions, each instruction has a specific function:

- FROM: Specifies the image from which we start, there are a series of images available for multiple technologies, such as Python, Javascript, Alpine Linux, among others, check Dockerhub.
- ENV: Creates environment variables, first the variable name and then its value.
- ADD: Adds files from the environment to the target Docker image. A dot indicates all files.
- COPY: Same as above, but supports urls and compressed files.
- WORKDIR: Sets the working directory from which commands will be executed.
- RUN: Runs a command only once when compiling the image.
- EXPOSE: Exposes a port.
- CMD: Execute a command when starting the container.

Now let's review the image we created above.

- **FROM python:3.6: All Dockerfiles need an image to start from**, in this case that image is python:3.6.
- **ENV PYTHONBUFFERED 1:** This environmental variable allows us to read the Python logs in our terminal.
- **ADD . /app/:** Adds all files in the current folder to the /app/ folder. Also serves COPY, the difference is that ADD accepts compressed files or a url.
- **WORKDIR /app/myDockerDjangoApp:** Sets the /app/myDockerDjangoApp folder as the base folder to use when running commands with CMD, RUN, ADD or COPY.
- **RUN pip install -r /app/requirements.txt:** RUN allows to execute commands, which are executed when the image is compiled and saved as a new layer in the image. We will use RUN to install all the dependencies we specified in the requirments.txt file (Django and Gunicorn in this case).
- **EXPOSE 8000:** Expose port 8000 to the outside.
- **ENV PORT 8000**: Creates an environment variable called PORT with the value of 8000. This will be used to access the port.
- **CMD \[“gunicorn”, “myDockerDjangoApp.wsgi”\]:** CMD executes a command when starting a container from an image, the commands and arguments are separated as if they were a Python list. In this case, as I mentioned above, gunicorn just needs to know where the wsgi file that django automatically generated is.

### Difference between RUN and CMD in Docker

The RUN directive allows you to execute commands inside a Docker image, **these commands are executed only once when the image is compiled** and are saved in your Docker image, as a new layer. RUN is ideal for permanent changes that affect the image, such as installing packages.

```dockerfile
RUN pip install -r requirements.txt
```

CMD allows you to run **one command once the container boots**, however any changes in CMD require you to recompile the image. This makes it ideal for booting web servers, or services.

```dockerfile
CMD [“gunicorn”, “--bind”, “:8000”, “--workers”, “2”, “project.wsgi”]
```

{{<ad>}}

## Order is important in a Dockerfile

Compiling a Dockerfile is a sequential process, each step creates an intermediate image that Docker can cache. 

Docker uses the stored cache to avoid having to repeat unnecessary steps when a change occurs in a Dockerfile, i.e. if you make a change in one of the steps, Docker will try to use its cached data to avoid repeating all the previous steps. 

Therefore, consider the order in which you perform your instructions to avoid costly image compilations in time and resources.

Tip: Place package installations or processes that are unlikely to change first, and place those steps that change frequently, such as your application code, at the end.

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

## Compile a Dockerfile using docker build

To compile a Dockerfile and create a custom image created from the contents of our file, just run the _docker build_ command and set the location of the Dockerfile. _Docker build_ allows us to specify a tagname and a version, separated by a colon “:”, using the _tag_ tag. Note that the colon at the end is not a blob on your screen or a bug, but refers to the folder we are in.

```bash
docker build --tag djangocontainer:0.1 .
```

You can see that our image has been created by running the command *docker images*.

```bash
docker images
REPOSITORY TAG IMAGE ID CREATED SIZE
djangocontainer 0.1 6e3ffe358338 About a minute ago 912MB
```

Now that we have the image we just need to run it. For this example we will bind our port 8000 to port 8000 of our container, run our container in the background and name it *test_container*.

```bash
docker run -p 8000:8000 -d --name test_container djangocontainer:0.1
```

Now comes the best part! The moment where we find out if our code works or we made a complete mess. Let's make a [HTTP request using curl](/en/basic-commands-of-linux-passwd-du-useradd-usermod-fdisk-apt/)

```bash
curl localhost:8000
<!doctype html>
<html>
    <head>
        <meta charset=“utf-8”>
...
```

If we open our browser and enter our localhost on port 8000 we will see the Django rocket indicating that everything worked perfectly. Gunicorn is serving our Django application on port 8000, which we can access through our port of the same number.

The next step here is to link many Dockerfiles to create a more complex application, for that we could use [Docker-compose (best for simple projects)](/en/get-to-know-the-basic-docker-compose-commands/) or Kubernetes (For more complex projects, and probably an overkill for your business idea)

![Django installation success page, shows welcome message and links to documentation](images/djangoRocketNoCursor.gif)


