---
title: "¿Cómo programar un cambiador de wallpaper automático en Python?"
date: "2020-03-01"
categories: 
  - "python"
coverImage: "images/como_programar_un_cambiador_wallpaper_python.jpg"
description: "¿Cómo programar un cambiador de wallpaper automático en GNU/Linux usando Python? En esta entrada usaremos Cron para cambiar el wallpaper cada cierto tiempo."
keywords:
  - linux
  - python
---

En la entrada anterio hicimos un [cambiador de wallpaper automático en Python](/como-crear-un-cambiador-de-wallpaper-automatico-usando-python-en-gnome/). En esta entrada vamos a usar Cron para programar la ejecución periódica de este script y que se encargue de cambiar el wallpaper cada cierto tiempo, automáticamente, ya se cada hora, dos horas, cada día, cada minuto o la frecuencia que nosotros querramos. Si no sabes como funciona el daemon Cron y como programar las tareas usando esta herramienta, por favor revisa mi entrada sobre [Cron y Crontab.](/cron-y-crontab-programa-tareas-periodicas/)

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

Ahora, vamos a programar su ejecución por medio de Crontab.

Si colocamos un script de Python que contenga el bloque de código anterior en Crontab y esperamos a que llegue el tiempo de ejecución, **no funcionará**.

## Agregar variables de entorno a Crontab

Recuerda que cuando programamos una tarea en Crontab, no tenemos acceso a todas las variables de entorno. Para que el cambiador de wallpaper funcione necesitaremos pasarle la variable de entorno llamada DBUS\_SESSION\_BUS\_ADDRESS al script que coloquemos en Crontab. Para encontrar el valor de la variable de entorno podemos hacerlo desde terminal, usando el comando printenv.

```bash
printenv | grep DBUS
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
```

Ahora que tenemos el valor de la variable de entorno, podemos agregarlo a las variables de entorno por medio _os.environ_. Ahora este valor estará disponible para Crontab cuando se ejecute el script.

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

## Programar el cambio de wallpaper con Cron y Crontab

Una vez hecho esto estamos listo para agregar nuestro script a Crontab

```bash
crontab -e
```

Para este ejemplo cambiaremos de wallpaper cada 6 horas. Pero tu puedes colocar la frecuencia en el valor que tu quieras.

```bash
 0 */6 * * * $PWD/.change_wallpaper_random.py
```

También debes de asegurarte de que tu archivo tenga los permisos de ejecución adecuados, tengo una entrada explicando el tema de [chmod y los permisos en GNU/Linux](/entiende-los-permisos-en-gnu-linux-y-el-comando-chmod/) que puedes revisar.

Guardamos el archivo y este debería empezar a ejecutarse automáticamente una vez pasadas 6 horas, o la frecuencia que tú le hayas colocado, cambiando el wallpaper por uno aleatorio en la carpeta que especificaste en el script de Python.
