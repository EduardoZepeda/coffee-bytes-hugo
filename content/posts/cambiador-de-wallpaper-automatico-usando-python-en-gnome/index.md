---
title: "¿Cómo crear un cambiador de wallpaper automático usando Python en Gnome?"
date: "2020-02-15"
categories: 
  - "python"
coverImage: "images/cambiador_de_wallpaper_automatico_gnome.jpg"
description: "Programa un cambiador de wallpaper ligero, minimalista y bastante simple para Gnome en GNU/Linux usando Python desde cero."
keywords:
  - python
  - gnome
  - linux
authors:
  - Eduardo Zepeda
---

En esta entrada vamos a crear un cambiador de wallpaper automático, aleatorio y minimalista para GNU/Linux usando Python. Sin funciones extras, súper ligero y totalmente casero, su única función será seleccionar una imagen aleatoriamente y fijarla como wallpaper. Explicaré la función de cada linea en el código.

**Nota:** Este código lo estoy ejecutando en GNOME 3.22.3 y en Python 3.5.3

Si no estas familiarizado con la sintaxis de Python, lee sobre uno de los mejores libros para adentrarte en Python en mi entrada sobre [el libro Inmersion en Python](/aprende-python-desde-cero-con-este-libro-gratuito/).

Para empezar primero cambiemos de directorio a _home_/

```bash
cd ~
```

Una vez aquí vamos a crear un archivo Python con el nombre _.change\_wallpaper\_randomly.py_ pero puedes ponerle cualquier otro nombre, solo asegúrate de que el nombre empiece con un punto "." En GNU/Linux **todos los archivos que empiezan con un punto son archivos ocultos**, volver nuestro script un archivo oculto nos servirá más adelante.

```bash
touch .change_wallpaper_randomly.py
```

Si en este punto sientes que no estás familiarizado con estos comandos GNU/Linux puedes leer mi entrada sobre los [comandos básicos de GNU/Linux](/comandos-de-gnu-linux-basicos-que-deberias-conocer/) para refrescar tu memoria.

## Cambiar wallpaper automáticamente con Python

Ahora dentro del archivo que acabamos de crear vamos a colocar el siguiente código

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

Primero importamos las librerias _os_ y _random_, para tener acceso a herramientas para interactuar con el sistema operativo y métodos para números aleatorios, respectivamente.

A continuación asignamos la ruta donde se encuentran las imágenes a la variable _wallpaper\_folder_, **esta ruta tú la defines, es la ubicación de tu carpeta con las imágenes que quieres usar de wallpaper.** Para este ejemplo asegúrate de usar una ruta absoluta.

El método os._chdir()_ nos permitirá cambiarnos al directorio donde tenemos las imágenes que usaremos como wallpapers.

La variable _allowed\_image\_formats_ establecerá que formatos de imágenes aceptaremos como wallpapers.

La siguiente linea es un poco más compleja y, por la sintaxis, podrás apreciar que se trata de una _list comprehension_:

```python
list_of_images = [image for image in os.listdir() if image.endswith(tuple(allowed_image_formats))]
```

_os.listdir()_ nos devolverá una lista con todos los archivos en nuestra carpeta actual, es decir todos aquellos wallpapers contenidos en la carpeta a la que nos cambiamos con _os.chdir()_.

Con _tuple(allowed\_image\_formats)_ simplemente estamos transformando nuestra lista de formatos aceptados en una tupla.

El método _image.endswith()_ recibe un argumento, que puede ser una cadena de texto o una tupla de cadenas de texto, y nos devolverá _True_ or _False_ dependiendo de si el objeto _image_ termina la cadena de texto con alguno de los elementos de la tupla.

La linea completa es una _list comprehension_ que nos dice: "crea una lista con cada imagen en _os.listdir()_ siempre y cuando el archivo termine con cualquiera de los siguientes formatos en esta tupla". Este paso es importante pues excluirá todos aquellos archivos que no sean imágenes de nuestra lista.

Ahora, la siguiente linea también puede parecer algo compleja

```python
random_wallpaper = os.path.join(os.getcwd(), random.choice(list_of_images))
```

El método _os.path.join()_ se encarga de unir rutas en nuestro sistema operativo y es totalmente agnóstico del sistema operativo en el cual nos encontremos. Uniremos la ruta del directorio actual con el nombre de una imagen, para generar la ruta completa de una imagen.

_os.getcwd()_ nos devuelve el directorio actual.

## Seleccionar una imagen al azar con random.choice()

Obtendremos aleatoriamente la imagen por medio del método _random.choice()_, que selecciona una imagen al azar de todas las que obtuvimos con el list comprehension

Mira este ejemplo:

```python
lista_de_imagenes_de_prueba = ["imagen_1.jpg", "imagen_2.jpg", "imagen_3.png", "imagen_4.png", "imagen_5.jpeg"]
random.choice(lista_de_imagenes_de_prueba)
"imagen_4.png"
random.choice(lista_de_imagenes_de_prueba)
"imagen_1.jpg"
random.choice(lista_de_imagenes_de_prueba)
"imagen_1.jpg"
```

Y por último

```python
os.system("gsettings set org.gnome.desktop.background picture-uri 'file://{}'".format(random_wallpaper))
```

El método _os.system()_ nos permite ejecutar un comando en nuestra terminal.

Ejecutaremos [un comando que le dirá a _gnome_](https://people.gnome.org/~pmkovar/system-admin-guide/background.html) que fije un imagen como wallpaper, le pasaremos la ruta a esa imagen después de _picture-uri_.

Ojo aquí, cada entorno de escritorio va a tener una manera de fijar un wallpaper, si quisiéramos usar otro entorno de escritorio bastará con leer la documentación y reemplazar el comando dentro del método _os.system()_

Una vez que terminamos, podemos ejecutar nuestro script de la siguiente manera. Asegúrate de estar en _home_.

```python
python3 .change_wallpaper_randomly.py
```

Si todo salió correctamente tu wallpaper habrá cambiado por una imagen al azar dentro de la carpeta que especificaste. Puedes correr el script las veces que quieras y verás como tu wallpaper cambiará una y otra vez con cada ejecución.

Pero tener que correr este comando cada vez que queremos cambiar de wallpaper es bastante engorroso, ¿no sería genial poder programarlo para que se ejecutara cada cierto tiempo?

Si ya leiste mi entrada sobre [crontab y cron](/cron-y-crontab-programa-tareas-periodicas/) ya tienes una idea de como conseguirlo, pasa directo a para [programar la ejecución periódica de este script usando _crontab_](/como-programar-un-cambiador-de-wallpaper-automatico-en-python/).
