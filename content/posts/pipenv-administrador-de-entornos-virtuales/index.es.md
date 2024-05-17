---
aliases:
- /pipenv-administrador-de-entornos-virtuales
- /pipenv-el-administrador-de-entornos-virtuales-que-no-conoces
- /administrador-de-entornos-virtuales-pipenv
- /tutorial-de-pipenv/
authors:
- Eduardo Zepeda
categories:
- python
coverImage: images/Tutorial-de-pipenv.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@rodnae-prod/
date: '2020-08-15'
description: Te enseño a instalar Pipenv, crear un Pipfile, establecer variables de
  entorno y lo que necesitas saber de este gestor de entornos virtuales.
keywords:
- python
- pipenv
title: 'Pipenv: El administrador de entornos virtuales que NO conoces'
---

Desde que empecé a usar Python uso virtualenv y pip para manejar los entornos virtuales. Pero al leer [Django for Professionals](/es/resena-de-django-for-professionals/) me enteré de que existía una herramienta mejor que pip y virtualenv, llamada Pipenv (no se complicaron mucho con el nombre). Pipenv tiene características que la hacen mucho más robusta y sencilla de utilizar que virtualenv. En este tutorial de Pipenv paso a paso, te voy a explicar la instalación, uso, manejo de archivos y comandos básicos de esta herramienta.

Primero, si ya has oído hablar de los entornos virtuales pero no sabes para que sirven tengo una entrada donde hablo sobre [entornos virtuales en Python](/es/por-que-deberias-usar-un-entorno-virtual-en-python/). Por otro lado, si el nombre de _virtualenv_ te suena medio esotérico quizás quieras leer sobre [virtualenv, el gestor de entornos virtuales de Python](/es/python-virtualenv-tutorial-basico-en-linux/)

## Pipenv vs virtualenv

Seguramente ya sabes que _pip_ es usado para manejar paquetes, pero generalmente deseamos tener los paquetes de cada una de nuestras aplicaciones aislados del resto del sistema, por lo que normalmente lo combinamos con _virtualenv_.

_Pip_ y _virtualenv_ se usan en conjunto para mantener las dependencias de un entorno virtual, pero pip puede llegar a producir entornos diferentes, incluso con un mismo archivo _requirements.txt_, esto es algo que queremos evitar. El creador de _pipenv_ diseño su herramienta intentando resolver esa problemática.

Pipenv se encarga de unir a _pip_ y a _virtualenv_ en **una sola herramienta**, además de asegurarse de que el archivo donde se listan las dependencias que se generan produzca **exactamente la misma configuración de paquetes**, pipenv también permite cargar archivos variables de entorno directamente a partir de archivos _.env_ que se encuentren en la carpeta de trabajo donde nos encontremos.

## Instalación y uso de pipenv

Si estás en Debian o alguna distribución derivada (como Ubuntu) puedes probar suerte intentando instalarlo directamente de los repositorios.

```bash
sudo apt install pipenv
```

Si no se encuentra en los repositorios también podemos hacer uso de _pip_, que ya viene instalado en la mayoría de las distribuciones.

```bash
sudo pip install pipenv
```

Una vez instalado podemos empezar a instalar paquetes usando la opción _install_, para este ejemplo probemos con una versión específica de Django.

```bash
pip install django===3.0.1
```

Si hacemos un _ls_ podremos notar que se nos crearon dos archivos _Pipfile_ y _Pipfile.lock_.

```bash
ls
Pipfile  Pipfile.lock
```

¿Qué tienen estos archivos? Te lo explico a continuación. Primero vamos con el archivo Pipfile.

## Pipfile

Empecemos viendo el contenido del archivo _Pipfile_. Si tienes alguna dificultado con el uso de la linea de comandos te sugiero revisar las entradas donde hablo de los [comandos básicos de GNU/Linux.](/es/comandos-de-linux-basicos-que-deberias-conocer/)

```bash
cat Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
django = "===3.0.1"

[requires]
python_version = "3.7"
```

Analizando el contenido apreciamos este archivo nos muestra varias categorias

- source: la fuente de nuestros paquetes, con su nombre, url y si se usó encripción
- dev-packages: los paquetes de desarrollo, en este momento se encuentra vacio
- packages: los paquetes que hemos instalado y que se usarán en el proyecto
- requires: la versión de Python requerida para el proyecto, se especifica automáticamente o puedes hacerlo tu mismo

```bash
pip install --dev pytest
```

Si hacemos un cat nuevamente veremos que debajo de la sección _\[dev-packages\]_ ya nos aparece _pytest_ como una dependencia.

```bash
cat Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]
pytest = "*"

[packages]
django = "===3.0.1"

[requires]
python_version = "3.7"
```

## Pipfile.lock

Ahora hagamos un _cat_ a _Pipfile.lock_

```javascript
cat Pipfile.lock
{
    "_meta": {
        "hash": {
            "sha256": "c2bf0d0008c675fc08df79a9cdb6b94773be0defa60d2c5b8aae0142358aa574"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "asgiref": {
            "hashes": [
                "sha256:7e51911ee147dd685c3c8b805c0ad0cb58d360987b56953878f8c06d2d1c6f1a",
                "sha256:9fc6fb5d39b8af147ba40765234fa822b39818b12cc80b35ad9b0cef3a476aed"
            ],
            "markers": "python_version >= '3.5'",
            "version": "==3.2.10"
        },
        "django": {
            "hashes": [
                "sha256:315b11ea265dd15348d47f2cbb044ef71da2018f6e582fed875c889758e6f844",
                "sha256:b61295749be7e1c42467c55bcabdaee9fbe9496fdf9ed2e22cef44d9de2ff953"
            ],
            "index": "pypi",
            "version": "===3.0.1"
        },
...
```

El archivo puede parecer muy apantallante, pero son únicamente los hashes de los paquetes que instalamos, así como sus dependencias, de esta manera nos aseguramos de que las versiones que instalamos sean las correctas y además **nos permitirá obtener exactamente la misma configuración de paquetes** si tomamos estos archivos y los llevamos a otra computadora.

### ¿Cómo visualizar las dependencias de manera gráfica?

Si ahora usamos el comando _pipenv graph_ nos generará una representación detallada y visualmente amigable de las dependencias que tenemos instaladas

```bash
pipenv graph
Django==3.0.1
  - asgiref [required: ~=3.2, installed: 3.2.10]
  - pytz [required: Any, installed: 2020.1]
  - sqlparse [required: >=0.2.2, installed: 0.3.1]
pytest==5.4.3
  - attrs [required: >=17.4.0, installed: 19.3.0]
  - importlib-metadata [required: >=0.12, installed: 1.7.0]
    - zipp [required: >=0.5, installed: 3.1.0]
  - more-itertools [required: >=4.0.0, installed: 8.4.0]
  - packaging [required: Any, installed: 20.4]
    - pyparsing [required: >=2.0.2, installed: 2.4.7]
    - six [required: Any, installed: 1.15.0]
  - pluggy [required: >=0.12,<1.0, installed: 0.13.1]
    - importlib-metadata [required: >=0.12, installed: 1.7.0]
      - zipp [required: >=0.5, installed: 3.1.0]
  - py [required: >=1.5.0, installed: 1.9.0]
  - wcwidth [required: Any, installed: 0.2.5]
```

### Generar un archivo Pipfile.lock

También podemos generar un archivo _Pipfile.lock_ a partir de un archivo _Pipfile_. Borremos el archivo _Pipfile.lock_ y generemos uno nuevo

```bash
rm Pipfile.lock
```

Ahora ejecutemos el comando _pipenv lock_

```bash
pipenv lock
Locking [dev-packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (88888)!
```

Al terminar el proceso tendremos nuevamente nuestro archivo _Pipfile.lock_ en la misma carpeta

## Encontrar un entorno virtual con pipenv

Todo bien hasta este momento, pero aún no estamos dentro de nuestro entorno virtual, es más, solamente tenemos los archivos _Pipfile_ y _Pipfile.lock_ en nuestra carpeta actual. ¿Y el entorno virtual? Bueno, pipenv coloca el entorno virtual en otra ubicación, para averiguarla podemos usar la opción _\--venv_

```bash
pipenv --venv
/home/usuario/.local/share/virtualenvs/proyecto-HHqROqC2
```

Y ahora, en lugar de localizar el archivo activate manualmente en la ruta anterior, como hacíamos con [virtualenv](/es/python-virtualenv-tutorial-basico-en-linux/), podemos activar el entorno virtual usando el comando _pipenv shell_ y esto se hará por nosotros automáticamente

```bash
pipenv shell
```

De igual manera que con [virtualenv](/es/python-virtualenv-tutorial-basico-en-linux/) podemos apreciar que el prompt cambiará, indicándonos que estamos dentro del entorno virtual

## Variables de entorno con Pipenv

Una de las características que hacen diferente a pipenv es que te permite cargar variables de entorno directamente a partir de un archivo _.env_ cuando entramos en un entorno virtual. Salgamos del entorno virtual un momento para crear el archivo y cargar variables de entorno.

```bash
exit
```

Ahora que el prompt regresó a la normalidad, crearemos un archivo _.env_ con variables de entorno. Lo haré en un solo paso usando el comando _echo_ y redirigiendo el resultado al archivo, pero si te sientes más cómodo usando el comando _touch_ y luego abriéndolo para agregar el contenido también puedes hacerlo y es correcto.

```bash
echo "SPAM=eggs" > .env
```

Si hacemos un _ls_ podremos ver que ahora tenemos nuestro archivo _.env_ en la misma carpeta que están _Pipfile_ y _Pipfile.lock_

```bash
ls -a
.  ..  .env  Pipfile  Pipfile.lock
```

Ahora volvamos a cargar nuestro entorno virtual

```bash
pipenv shell
Loading .env environment variables…
Launching subshell in virtual environment…
 . /home/usuario/.local/share/virtualenvs/proyecto-HHqROqC2/bin/activate
```

El prompt cambiará nuevamente, y, si ejecutamos el comando _printenv_ podemos ver que nuestra variable de entorno se agregó perfectamente.

```bash
printenv
...
SPAM=eggs
...
```

## Desinstalar paquetes en pipenv

Para desinstalar paquetes usaremos el comando _pipenv uninstall_ y el nombre del paquete.

```bash
pipenv uninstall pytest
Uninstalling pytest…
Found existing installation: pytest 5.4.3
Uninstalling pytest-5.4.3:
  Successfully uninstalled pytest-5.4.3

Removing pytest from Pipfile…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (3f348b)!
```

Si queremos desinstalar todos los paquetes y dejar nuestro entorno como nuevo podemos usar la opción _\--all_ en lugar de especificar un nombre de paquete. Esto borrará todos los archivos del entorno virtual pero dejará el _Pipfile_ completamente a salvo.

```bash
pipenv uninstall --all
Un-installing all [dev-packages] and [packages]…
Found 13 installed package(s), purging…
...
Environment now purged and fresh!
```

Si usamos la opción _\--all-dev_ eliminará todas las dependencias de desarrollo, tanto como del entorno virtual como de nuestro _Pipfile_

```bash
pipenv uninstall --all-dev
Un-installing [dev-packages]…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (65a03c)!
```

## Ejecutar comandos en entorno virtual con pipenv

También podemos ejecutar comandos directamente en el entorno virtual sin estar dentro. Salte del entorno virtual si estás dentro y asegurate de que el prompt haya regresado a la normalidad antes de ejecutar el siguiente comando.

```bash
pipenv run pip install requests
Loading .env environment variables…
Collecting requests
  Downloading requests-2.24.0-py2.py3-none-any.whl (61 kB)
     |████████████████████████████████| 61 kB 53 kB/s 
Collecting idna<3,>=2.5
  Downloading idna-2.10-py2.py3-none-any.whl (58 kB)
     |████████████████████████████████| 58 kB 641 kB/s 
Collecting chardet<4,>=3.0.2
  Using cached chardet-3.0.4-py2.py3-none-any.whl (133 kB)
Collecting certifi>=2017.4.17
  Downloading certifi-2020.6.20-py2.py3-none-any.whl (156 kB)
     |████████████████████████████████| 156 kB 6.1 MB/s 
Collecting urllib3!=1.25.0,!=1.25.1,<1.26,>=1.21.1
  Using cached urllib3-1.25.9-py2.py3-none-any.whl (126 kB)
Installing collected packages: idna, chardet, certifi, urllib3, requests
Successfully installed certifi-2020.6.20 chardet-3.0.4 idna-2.10 requests-2.24.0 urllib3-1.25.9
```

El comando anterior nos dejó con el paquete requests y sus dependencias instaladas en nuestro entorno virtual, sin embargo el archivo _Pipfile_ y _Pipfile.lock_ **no se actualizaron.** Para borrar todos aquellos paquetes instalados que no se encuentren en los dos archivos anteriores existe _pipenv clean_.

## Limpiar nuestro entorno virtual en pipenv

También podemos limpiar nuestro entorno virtual de todos aquellos paquetes que no estén especificados dentro de nuestro archivo _Pipfile.lock_ usando _clean_.

```bash
pipenv clean
Uninstalling urllib3…
Uninstalling idna…
Uninstalling requests…
Uninstalling chardet…
Uninstalling certifi…
```

Listo, nuestro entorno no contiene ningún paquete instalado, sin embargo aún existe.

## Borrar un entorno virtual en pipenv

Para borrar un entorno virtual usaremos la opción _\--rm_ seguida del comando _pipenv_. Nota que pipenv detectará el entorno virtual a remover extrayendo la información de la carpeta donde nos encontremos, por lo que asegúrate dos veces que estás en la carpeta correcta.

```bash
pipenv --rm
Removing virtualenv (/home/usuario/.local/share/virtualenvs/prueba-HHqROqC2)…
```

¡Listo! El entorno virtual ha quedado eliminado completamente.

Si quieres conocer más funciones de pipenv puedes visitar su [documentación oficial.](https://pipenv-es.readthedocs.io/es/latest/)