---
aliases:
- /en/how-to-program-an-automatic-wallpaper-changer-in-python/
authors:
- Eduardo Zepeda
categories:
- python
coverImage: images/como_programar_un_cambiador_wallpaper_python.jpg
date: '2020-03-01'
description: How to schedule an automatic wallpaper changer in GNU/Linux using Python?
  In this entry we will use Cron to change the wallpaper every so often.
keywords:
- linux
- python
title: How to program an automatic wallpaper changer in Python?
---

In the previous post we made an [automatic wallpaper changer in Python](/en/python/how-to-create-an-automatic-wallpaper-changer-using-python-in-gnome/)

In this entry we are going to use Cron to program the periodic execution of this script and that it is in charge of changing the wallpaper every certain time, automatically, every hour, two hours, every day, every minute or the frequency that we want. 

If you don't know how Cron daemon works and how to schedule tasks using this tool, please check my post about [Cron and Crontab](/en/linux/program-periodic-tasks-easily-in-linux-with-cron-and-crontab/).

Also if you're interested in diving into this programming language [here's my list of favorite resources to learn Python]({{< ref path="/posts/python/best-source-to-learn-python/index.md" lang="en" >}})

```python
#!/usr/bin/python3
import os
import random

wallpaper_folder = "/home/user/imgs/wallpaper/" # Place your own directory here
os.chdir(wallpaper_folder)
allowed_image_formats = ["jpg", "png", "jpeg"]
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
os.system("gsettings set org.gnome.desktop.background picture-uri-dark 'file://{}'".format(random_wallpaper))
```

Now, we are going to schedule its execution by means of Crontab.

If we place a Python script containing the above code block in Crontab and wait for the runtime to arrive, **it will not work**.

## Adding environment variables to Crontab

Remember that **when we schedule a task in Crontab, we do not have access to all environment variables**. 

For the wallpaper changer to work we will need to pass the environment variable called DBUS_SESSION_BUS_ADDRESS to the script we place in Crontab. To find the value of the environment variable we can do it from terminal, using the printenv command.

{{<ad0>}}

```bash
printenv | grep DBUS
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
```

We could also use Python to get this value.

``` python
import os
os.environ.get("DBUS_SESSION_BUS_ADDRESS")
```

Now that we have the value of the environment variable, we can add it to the environment variables via _os.environ_. Now this value will be available to Crontab when the script is run.

```python
#!/usr/bin/python3
import os
import random

os.environ["DBUS_SESSION_BUS_ADDRESS"]="unix:path=/run/user/1000/bus" # LINEA NUEVA

wallpaper_folder = "/home/user/imgs/wallpaper/" # Place your own directory here
os.chdir(wallpaper_folder)
allowed_image_formats = ["jpg", "png", "jpeg"]
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
os.system("gsettings set org.gnome.desktop.background picture-uri-dark 'file://{}'".format(random_wallpaper))
```

{{<ad1>}}

## Schedule wallpaper change with Cron and Crontab

Once this is done, we are ready to add our script to Crontab.

```bash
crontab -e
```

For this example we will change the wallpaper every 6 hours. But you can set the frequency to any value you want.

{{<ad2>}}

```bash
0 */6 * * * $PWD/.change_wallpaper_random.py
```

You should also make sure that your file has the proper execution permissions, I have a post explaining the topic of [chmod and permissions in GNU/Linux]({{< ref path="/posts/linux/permisos-en-gnu-linux-y-el-comando-chmod/index.md" lang="en" >}}) that you can check out.

Save the file and it should start running automatically every 6 hours, or whatever frequency you set, changing the wallpaper to a random one in the folder you specified in the Python script whether you're using a Dark theme or a Light theme in newer versions of Gnome.