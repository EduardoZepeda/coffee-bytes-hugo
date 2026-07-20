---
aliases:
- /python-virtualenv-tutorial-basico
- /python-virtualenv-tutorial-basico-en-linux
- /para-que-sirve-virtualenv/
- /es/python-virtualenv-tutorial-basico-en-linux/
authors:
- Eduardo Zepeda
categories:
- python
coverImage: images/tutorial_basico_virtualenv.jpg
date: '2019-07-15'
seo_title: "Tutorial Virtualenv en Linux: Entornos Virtuales"
description: Tutorial paso a paso de virtualenv en Linux, instala, crea y gestiona
  entornos virtuales de Python para tus proyectos.
keywords:
- python
- linux
slug: /python/python-virtualenv-tutorial-basico-en-linux/
title: Python virtualenv tutorial básico en linux
---

Si no tienes ni idea de para que sirve un entorno virtual tengo una entrada donde explico para que sirven los [entornos virtuales en Python]({{< ref path="/posts/python/por-que-usar-un-entorno-virtual-en-python/index.md" lang="es" >}}). Hoy vengo a traerte un pequeño tutorial de Python virtualenv donde instalaremos un par de paquetes en un entorno virtual y veremos como se comportan. Asegúrate de tener instalado [Python](https://www.python.org/) y [Pip](https://pip.pypa.io/en/stable/installing/) porque los necesitaremos.

## Preparativos para usar virtualenv

Empecemos primero creando un directorio nuevo, puedes ponerlo donde tu prefieras.

```bash
mkdir entornoVirtual; cd entornoVirtual
```

Una vez que estemos adentro de este nuevo directorio verificaremos nuestra instalación de Python:

{{<adsPanels>}}

{{<ad0>}}

```bash
Python3
```

Dentro del interprete de Python intentaremos importar la libreria _requests_, usada para hacer peticiones web:

```bash
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named 'requests'
```

Como no la tenemos instalada en nuestro sistema operativo nos salta un error, por supuesto, que listos que somos. Salgamos del intérprete de Python:

```bash
>>>exit()
```

Podríamos instalar _requests_ en nuestro sistema operativo, pero eso nos obligaría a utilizar siempre la misma versión, por lo que en su lugar instalaremos virtualenv, para poder usar entornos virtuales. Para hacerlo utilizaremos _pip_.

```bash
sudo pip install virtualenv
pip3 install virtualenv
Collecting virtualenv
  Downloading https://files.pythonhosted.org/packages/db/9e/df208b2baad146fe3fbe750eacadd6e49bcf2f2c3c1117b7192a7b28aec4/virtualenv-16.7.2-py2.py3-none-any.whl --(3.3MB)
    100% |████████████████████████████████| 3.3MB 3.6MB/s 
Installing collected packages: virtualenv
Successfully installed virtualenv-16.7.2
```

{{<ad1>}}

## Crear un entorno virtual en python

Para crear un entorno virtual utilizaremos el comando _virtualenv_, especificaremos una version de _Python_ con la opción _\-p_ y le daremos un nombre a nuestro entorno virtual, por razones de simplicidad lo llamaré _'virtual'_, pero puedes llamarlo como quieras.

```bash
virtualenv -p python3 virtual
Running virtualenv with interpreter
Already using interpreter /usr/bin/python3
Using base prefix '/usr'
New python executable in /tu/python/ruta/virtual/bin/python3
Also creating executable in /tu/python/ruta/virtual/bin/python
Installing setuptools, pip, wheel...
done.
```

Una vez que termine de ejecutarse el comando se habrá creado una carpeta en nuestro directorio actual. Esta carpeta contiene todos los archivos necesarios para poder usar el entorno virtual. Los paquetes que instalemos mientras estemos utilizando el entorno virtual se irán al interior de esa carpeta. He abreviado el contenido por razones de simplicidad, pero puedes revisar el interior de la carpeta tu mismo para conocerla completamente.

{{<ad2>}}

```bash

└── virtual
    ├── bin
    │   ├── activate
    │   ├── activate.csh
    │   ├── activate.fish
    │   ├── activate.ps1
    │   ├── activate_this.py
    │   ├── activate.xsh
    │   ├── easy_install
    │   ├── easy_install-3.5
    │   ├── pip
    │   ├── pip3
    │   ├── pip3.5
    │   ├── python -> python3
    │   ├── python3
    │   ├── python3.5 -> python3
    │   ├── python-config
    │   └── wheel
    ├── include
    │   └── python3.5m -> /usr/include/python3.5m
    └── lib
        └── python3.5
            ├── abc.py -> /usr/lib/python3.5/abc.py
            ├── ...
```

## Activar un entorno virtual

En el esquema anterior la parte importante es el archivo llamado _activate_, el cual usaremos para activar nuestro entorno virtual de la siguiente manera. **Recuerda reemplazar la palabra virtual si le pusiste otro nombre a tu entorno virtual:**

```bash
source virtual/bin/activate
```

Si el comando anterior se ejecutó sin problemas podremos ver como el intérprete de nuestra terminal cambió:

{{<ad3>}}

Pero no solo cambio el aspecto de la terminal. Además podremos ver que ahora estamos ejecutando nuestro comando python3 desde otra ubicación:

```bash
which python3
 /tu/python/ruta/virtual/bin/python3
```

## Instalar un paquete en un entorno virtual

Mientras el interprete se vea así, todos los paquetes que instalemos usando pip se instalarán en nuestro entorno virtual y los permisos de administrador ya no serán necesarios, nota la ausencia del comando _sudo_:

```bash
pip install requests
Collecting requests
  Downloading https://files.pythonhosted.org/packages/51/bd/23c926cd341ea6b7dd0b2a00aba99ae0f828be89d72b2190f27c11d4b7fb/requests-2.22.0-py2.py3-none-any.whl (57kB)
     |████████████████████████████████| 61kB 690kB/s 
Collecting certifi>=2017.4.17 (from requests)
  Downloading https://files.pythonhosted.org/packages/69/1b/b853c7a9d4f6a6d00749e94eb6f3a041e342a885b87340b79c1ef73e3a78/certifi-2019.6.16-py2.py3-none-any.whl --(157kB)
     |████████████████████████████████| 163kB 1.2MB/s 
Collecting chardet<3.1.0,>=3.0.2 (from requests)
  Using cached https://files.pythonhosted.org/packages/bc/a9/01ffebfb562e4274b6487b4bb1ddec7ca55ec7510b22e4c51f14098443b8/chardet-3.0.4-py2.py3-none-any.whl
Collecting urllib3!=1.25.0,!=1.25.1,<1.26,>=1.21.1 (from requests)
  Downloading https://files.pythonhosted.org/packages/e6/60/247f23a7121ae632d62811ba7f273d0e58972d75e58a94d329d51550a47d/urllib3-1.25.3-py2.py3-none-any.whl (150kB)
     |████████████████████████████████| 153kB 1.7MB/s 
Collecting idna<2.9,>=2.5 (from requests)
  Using cached https://files.pythonhosted.org/packages/14/2c/cd551d81dbe15200be1cf41cd03869a46fe7226e7450af7a6545bfc474c9/idna-2.8-py2.py3-none-any.whl
Installing collected packages: certifi, chardet, urllib3, idna, requests
Successfully installed certifi-2019.6.16 chardet-3.0.4 idna-2.8 requests-2.22.0 urllib3-1.25.3
```

El paquete que se instaló se fué a la carpeta que se creó al ejecutar el comando _virtualenv:_

```bash
...
            │   ├── requests
            │   │   ├── adapters.py
            │   │   ├── api.py
            │   │   ├── auth.py
            │   │   ├── certs.py
            │   │   ├── compat.py
...
```

Ahora ingresemos al intérprete de Python:

```bash
Python3
```

Si todo sale bien deberíamos poder importar el paquete _requests_:

```bash
>>> import requests
>>>
```

¡Ya no nos salta el error al importarlo! Ahora ya podemos usarla libremente y lo mejor es que el paquete está en la carpeta donde estamos trabajando, no en el sistema operativo. Por lo que, en caso de ser necesario, podremos trabajar con diferentes versiones de requests fácilmente, cada una en su entorno virtual.

## Respaldar paquetes de un entorno virtual

Ahora que estamos en nuestro entorno virtual y hemos instalado un paquete, puede que deseemos respaldar nuestra lista de paquetes, por si en algún momento queremos reinstalar los paquetes de nuestro actual entorno virtual. Para esto _pip_ viene perfecto. Ejecutando _pip_, seguido de la palabra _freeze_ y mandando esa información a un archivo tendremos una archivo con una lista de los paquetes instalados:

```bash
pip freeze > requirements.txt
```

Con el archivo anterior creado podemos instalar nuestros paquetes en cualquier otro entorno virtual que tengamos utilizando _pip_. Nota la ausencia del comando _sudo_.

```bash
pip install -r requirements.txt
```

## Desactivar un entorno virtual

Vamos ahora a abandonar el entorno virtual que hemos creado. ¿Recuerdas que usamos **activate** para entrar en el entorno virtual? Pues bastará que utilicemos el comando _deactivate_ en nuestra terminal.

```bash
deactivate
```

Nota como nuestra terminal ha regresado a su estado anterior. Ahora, solo para corroborar que todo salió bien, ingresemos nuevamente a nuestro intérprete Python,

```bash
Python3
```

Notaremos que el paquete _requests_ **NO está instalado**; todos los cambios que hicimos fueron hechos únicamente en nuestro entorno virtual, no en el sistema operativo.

```bash
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named 'requests'
```

## Borrar un entorno virtual

Si quieres borrar por completo el entorno virtual basta con que elimines el directorio donde se ha creado el entorno virtual. Esto dejará la carpeta como estaba y todos los paquetes que estaban instalados dentro del entorno virtual se perderán. **Por favor usa este comando con precaución, evita borrar el directorio root.**

```bash
rm -rf EntornoVirtual/
```

## Pipenv

Existe otro paquete que une pip y virtualenv, te permite manejar los entornos virtuales de manera bastante sencilla y cuenta con bastantes mejoras respecto a virtualenv. Si quieres saber más al respecto visita mi [tutorial donde te explico que es y como usar Pipenv.](/es/python/pipenv-el-administrador-de-entornos-virtuales-que-no-conoces/)