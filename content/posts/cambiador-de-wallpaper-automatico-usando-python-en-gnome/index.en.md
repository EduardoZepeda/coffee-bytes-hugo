---
title: "How to create an automatic wallpaper changer using Python in Gnome?"
date: "2020-02-15"
categories:
- "python"

coverImage: "images/cambiador_de_wallpaper_automatico_gnome.jpg"
description: "Program a lightweight, minimalistic and fairly simple wallpaper changer for Gnome on GNU/Linux using Python from scratch."
keywords:
- python
- gnome
- linux

authors:
- Eduardo Zepeda
---

In this post we are going to create an automatic, random and minimalistic wallpaper changer for GNU/Linux using Python. With no extra functions, super lightweight and totally homemade, its only function will be to randomly select an image and set it as wallpaper. I will explain the function of each line in the code.

**Note:** I am running this code in GNOME 3.22.3 and Python 3.5.3.

If you are not familiar with Python syntax, read about one of the best books for getting into Python in my post about [the book Python Immersion](/en/learn-python-from-scratch-with-this-free-book/).

To begin with let's first change the directory to _home_/

```bash
cd ~
```

Once here we are going to create a Python file with the name _.change_wallpaper_randomly.py_ but you can give it any other name, just make sure that the name starts with a dot "." In GNU/Linux **all files that start with a dot are hidden files**, returning our script a hidden file will serve us later.

```bash
touch .change_wallpaper_randomly.py
```

If at this point you feel you are not familiar with these GNU/Linux commands you can read my post on [basic GNU/Linux commands](/en/basic-linux-commands-you-should-know/) to refresh your memory.

## Change wallpaper automatically with Python

Now inside the file we have just created we are going to place the following code

```python
#!/usr/bin/python3
import os
import random

wallpaper_folder = "/home/usuario/Imágenes/wallpaper/" # Coloca aquí tu propia ruta
os.chdir(wallpaper_folder)
allowed_image_formats = ["jpg", "png", "jpeg"]
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
```

First we import the _os_ and _random_ libraries, to have access to tools to interact with the operating system and methods for random numbers, respectively.

Next we assign the path where the images are located to the variable _wallpaper_folder_, **this path is defined by you, it is the location of your folder with the images you want to use as wallpaper.** For this example make sure you use an absolute path.

The os._chdir()_ method will allow us to change to the directory where we have the images that we will use as wallpapers.

The _allowed_image_formats_ variable will set which image formats we will accept as wallpapers.

The next line is a little more complex and, from the syntax, you can see that it is a _list comprehension_:

```python
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
```

_os.listdir()_ will return a list of all the files in our current folder, i.e. all those wallpapers contained in the folder we switched to with _os.chdir()_.

With _tuple(allowed_image_formats)_ we are simply transforming our list of allowed formats into a tuple.

The _image.endswith()_ method takes an argument, which can be a text string or a tuple of text strings, and will return _True_ or _False_ depending on whether the _image_ object ends the text string with any of the elements of the tuple.

The complete line is a _list comprehension_ that says: "create a list with each image in _os.listdir()_ as long as the file ends with any of the following formats in this tuple". This step is important because it will exclude all non-image files from our list.

Now, the following line may also appear to be somewhat complex

```python
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
```

The _os.path.join()_ method is in charge of joining paths in our operating system and is totally agnostic of the operating system in which we are. We will join the path of the current directory with the name of an image, to generate the complete path of an image.

_os.getcwd()_ returns the current directory.

## Select an image at random with random.choice()

We will randomly obtain the image by means of the _random.choice()_ method, which selects a random image from all those obtained with the list comprehension.

Look at this example:

```python
lista_de_imagenes_de_prueba = ["imagen_1.jpg", "imagen_2.jpg", "imagen_3.png", "imagen_4.png", "imagen_5.jpeg"]
random.choice(lista_de_imagenes_de_prueba)
"imagen_4.png"
random.choice(lista_de_imagenes_de_prueba)
"imagen_1.jpg"
random.choice(lista_de_imagenes_de_prueba)
"imagen_1.jpg"
```

And finally

```python
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
```

The _os.system()_ method allows us to execute a command in our terminal.

We will run [a command that will tell _gnome_](https://people.gnome.org/~pmkovar/system-admin-guide/background.html) to set an image as wallpaper, we will pass the path to that image after _picture-uri_.

Note here, each desktop environment will have a way to set a wallpaper, if you want to use another desktop environment just read the documentation and replace the command inside the _os.system()_ method.

Once we are done, we can run our script as follows. Make sure you are in _home_.

```python
python3 .change_wallpaper_randomly.py
```

If everything went correctly your wallpaper will have changed to a random image in the folder you specified. You can run the script as many times as you want and you will see how your wallpaper will change over and over again with each run.

But having to run this command every time we want to change wallpaper is quite cumbersome, wouldn't it be great to schedule it to run every so often?

If you already read my post about [crontab and cron](/en/cron-and-crontab-schedules-recurring-tasks/) you already have an idea of how to achieve this, skip to [schedule the periodic execution of this script using _crontab_](/en/how-to-program-an-automatic-wallpaper-changer-in-python/).