---
aliases:
- /por-que-usar-tox
- /testeo-con-tox-en-python-tutorial-desde-cero
- /testeo-con-tox-en-python-tutorial-desde-cero//1000
- /es/testeo-con-tox-en-python-tutorial-desde-cero/
authors:
- Eduardo Zepeda
categories:
- python
- testing
coverImage: images/porque_deberias_usar_tox.jpg
date: '2019-06-18'
description: Aprende que es tox, como se instala, como se usan los archivos tox.ini
  y como configurarlo para crear tests más seguros en Python.
keywords:
- tox
- python
- testing
slug: /python/testeo-con-tox-en-python-tutorial-desde-cero/
title: Testeo con tox en Python, tutorial desde cero
---

Anteriormente hablé brevemente sobre las [pruebas de unittest, coverage, mock, nose, pytest y otras herramientas de testeo en Python](/es/python/unittest-python-valen-la-pena-los-tests-en-python/). Seguramente te estarás preguntando entonces ¿para qué necesitamos más librerías? En esta entrada vamos a hablar un poco de tox, una herramienta de testeo para probar el código en diferentes versiones de python.

## ¿Para que sirve Tox?

Imagina que estás escribiendo una aplicación pequeña para el público en general. Todas las pruebas de tu código pasan, la aplicación funciona perfectamente.

Al pasar unos días las personas te contactan y te hacen saber que tu aplicación falla. ¿Pero cómo?, todos los test pasan y tu mismo la has probado personalmente. Tras averiguar un poco sobre el problema te das cuenta de que las personas que la usan tienen la versión más nueva de Python. Al parecer el código de la nueva versión cambió y volvió tu aplicación inservible en las nuevas versiones. Pero tus problemas no terminan ahí, hay otros usuarios con versiones de Python muy antiguas que también tienen problemas.

Te decides a hacer el testeo de tu aplicación con las nuevas versiones, pero te das cuenta de que es un fastidio, hay demasiadas versiones de Python, tendrías que realizar las pruebas en cada una de ellas. [Tox](https://tox.readthedocs.io/en/latest/#) hace eso justamente eso por ti.

Tox te permite probar tu código en diferentes entornos, con Python 2.7, Python 3.5, Python 3.6, Python 3.7, con las versiones que tu prefieras. De esa manera podrás probar con que versiones de Python funciona tu código automáticamente y escribirlo en la documentación de tu aplicación.

{{<ad>}}

## Como instalar y usar tox

Vamos a probar brevemente la funcionalidad de Tox. Para empezar instala Tox, si puedes hacerlo en un entorno virtual mucho mejor.

```bash
pip install tox
```

## Requisitos para utilizar tox

Para poder ejecutar tox necesitaremos un archivo tox.ini, un archivo setup.py y un archivo de python que empiece con 'test\_' .

## Crear un archivo tox.ini con tox-quickstart

Una manera de crear el archivo necesario para usar tox es por medio del comando tox-quickstart. Al ejecutarlo Tox nos hará varias preguntas y generará automáticamente el archivo tox.ini que necesitamos para las pruebas.

```bash
tox-quickstart
```

Seleccionaremos el número 4 para elegir las versiones de Python nosotros mismos y responderemos con 'Y' a la versión de Python 2.7 y a la de Python 3.5.

```bash
What Python versions do you want to test against?
            [1] py36
            [2] py27, py36
            [3] (All versions) py27, py34, py35, py36, pypy, jython
            [4] Choose each one-by-one
> Enter the number of your choice [3]: 
```

Cuando nos pregunte los comandos para correr las pruebas dejaremos el comando predeterminado, que es pytest, por lo que solo presionamos ENTER.

```bash

What command should be used to test your project? Examples:            - pytest
"
            - python -m unittest discover
            - python setup.py test
            - trial package.module
> Type the command to run your tests [pytest]: 
```

Cuando nos pregunte la lista de dependencias que tenemos para nuestro proyecto, separadas por una coma, escribiremos únicamente 'mock', sin las comillas.

```bash

What extra dependencies do your tests have?
default dependencies are: ['pytest']
> Comma-separated list of dependencies: 
```

Listo, tenemos nuestro archivo tox.ini listo para usarse que puedes ver más abajo.

En el archivo se especifica lo siguiente; las versiones a usarse en la prueba, en este caso Python 2.7 (py27) y Python 3.5 (py35); las dependencias, mock y pytest; y el comando con el que se llevaran a cabo las pruebas, usará la libreria pytest. Todas las secciones son personalizables y pueden usarse otros comandos como 'coverage' o el que se te ocurra.

```ini

# tox (https://tox.readthedocs.io/) is a tool for running tests
# in multiple virtualenvs. This configuration file will run the
# test suite on all supported python versions. To use it, "pip install tox"
# and then run "tox" from this directory.

[tox]
envlist = py27, py35

[testenv]
deps =
    mock
    pytest
commands =
    pytest

```

## Crear un archivo setup.py

Ahora crearemos un archivo setup.py sencillo, nada muy sofisticado, solo lo básico para poder llevar a cabo las pruebas.

```python
# setup.py
from distutils.core import setup

setup(name='testing',
      version='1.0',
      description='Tox testing',
      author='Eduardo zepeda',
      author_email='your-email@domain.com',
      url='https://coffeebytes.dev',
     )

```

## El archivo de pruebas que empieza con 'test\_'

Useremos código de la entrada anterior. Es un código bastante sencillo que se conecta a example.org y regresa el código de respuesta del servidor. La prueba solo verifica que el código de respuesta sea igual a 200. Estamos utilizando la libreria mock para parchar la función para que el código de respuesta sea siempre de 200 y no necesitemos de una conexión a internet para realizar las pruebas.

```python
# test_example.py
import unittest
import urllib.request

from mock import patch


class ExampleResponseGetter(object):
    
    def retrieveStatusCode(self):
        statusCode = urllib.request.urlopen('http://example.org').status
        return statusCode

    def handleError(self):
        pass


class TestWebPaymentRequest(unittest.TestCase):

    @patch('urllib.request.urlopen')
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.status = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)


if __name__ == '__main__':
    unittest.main()

```

## ¿Cómo ejecutar tox?

Una vez que tengamos los archivos setup.py, tox.ini y test\_example.py, correremos Tox y este se encargará de probar nuestro código en Python 2.7 y en Python 3.5

```bash
tox
```

¡Nuestro código falló las pruebas para Python 2.7! Este error sucede porque el modulo urllib se separó en varios modulos en Python 3, por lo que la libreria urllib.request no existe en Python 2.7. Esto vuelve nuestro código incompatible con Python 2.7. Por otra parte, nuestra prueba fue exitosa con Python 3.5.

```bash
test_example.py:2: in <module>
    import urllib.request
E   ImportError: No module named request

...
==========1 passed in 0.26 seconds==========
_____________ summary _____________
ERROR:   py27: commands failed
  py35: commands succeeded
```

Ahora corregiremos el código para que pase las pruebas

Para hacer el código compatible con Python 2.7 hay varias cosas que podemos hacer, nosotros haremos un pequeño truco chapucero con las importaciones. El modulo urllib en python 2.7 tiene el método urlopen, que es el que necesitamos para que la prueba se lleve a cabo.

```python
# test_example.py
import unittest
try:
    from urllib.request import urlopen
    route = 'urllib.request.urlopen'
except:
    from urllib import urlopen
    route = 'urllib.urlopen'

from mock import patch


class ExampleResponseGetter(object):

    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass


class TestWebPaymentRequest(unittest.TestCase):

    @patch(route)
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.status = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)


if __name__ == '__main__':
    unittest.main()

```

Antes que nada importemos la libreria urllib.request encapsulandola en un try, si estamos en otra versión que no sea Python 3 la importación fallará. Capturamos la excepción e importemos el equivalente del método de Python 2.7 y, en cada caso, definimos la ruta que necesita mock para parchar el método. De esta manera las pruebas deberían pasar sin problema. Ejecutamos nuevamente Tox y veamos si funciona.

```bash
...
============ 1 passed in 0.28 seconds ============
____________________ summary ____________________
  py27: commands succeeded
  py35: commands succeeded
  congratulations :)
```

Las pruebas con tox fueron exitosas esta vez, ahora sabemos que nuestro código funciona perfectamente tanto en Python 2.7 como en Python 3.5.