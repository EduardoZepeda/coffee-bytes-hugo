---
title: "How to program an automatic wallpaper changer in Python?"
date: "2020-03-01"
categories:
- "python"

coverImage: "images/como_programar_un_cambiador_wallpaper_python.jpg"
description: "How to schedule an automatic wallpaper changer in GNU/Linux using Python? In this entry we will use Cron to change the wallpaper every so often."
keywords:
- linux
- python

authors:
- Eduardo Zepeda
---

In the previous post we made an [automatic wallpaper changer in Python](/how-to-create-automatic-wallpaper-changer-using-python-in-gnome/)

In this entry we are going to use Cron to program the periodic execution of this script and that it is in charge of changing the wallpaper every certain time, automatically, every hour, two hours, every day, every minute or the frequency that we want. If you don't know how Cron daemon works and how to schedule tasks using this tool, please check my post about [Cron and Crontab](/cron-y-crontab-schedule-periodic-tasks/).

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

Now, we are going to schedule its execution by means of Crontab.

If we place a Python script containing the above code block in Crontab and wait for the runtime to arrive, **it will not work**.

## Adding environment variables to Crontab

Remember that when we schedule a task in Crontab, we do not have access to all environment variables. For the wallpaper changer to work we will need to pass the environment variable called DBUS_SESSION_BUS_ADDRESS to the script we place in Crontab. To find the value of the environment variable we can do it from terminal, using the printenv command.

```bash
printenv | grep DBUS
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
```

Now that we have the value of the environment variable, we can add it to the environment variables via _os.environ_. Now this value will be available to Crontab when the script is run.

```python
#!/usr/bin/python3
import os
import random

os.environ["DBUS_SESSION_BUS_ADDRESS"]="unix:path=/run/user/1000/bus" # LINEA NUEVA
wallpaper_folder = "/home/usuario/Imágenes/wallpaper/" # Coloca aquí tu propia ruta absoluta
os.chdir(wallpaper_folder)
allowed_image_formats = ["jpg", "png", "jpeg"]
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
```

## Schedule wallpaper change with Cron and Crontab

Once this is done, we are ready to add our script to Crontab.

```bash
crontab -e
```

For this example we will change the wallpaper every 6 hours. But you can set the frequency to any value you want.

```bash
0 */6 * * * $PWD/.change_wallpaper_random.py
```

You should also make sure that your file has the proper execution permissions, I have a post explaining the topic of [chmod and permissions in GNU/Linux](/understand-permissions-in-gnu-linux-and-command-chmod/) that you can check out.

Save the file and it should start running automatically after 6 hours, or whatever frequency you set, changing the wallpaper to a random one in the folder you specified in the Python script.