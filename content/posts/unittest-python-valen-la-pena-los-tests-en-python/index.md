---
title: "Unittest python ¿valen la pena los tests en python?"
date: "2019-06-11"
categories: 
  - "python"
coverImage: "images/porque_deberias_incorporar_test_a_tu_codigo.jpg"
description: "Los tests son un desperdicio, ¿verdad? Entra aquí y conoce unittest, coverage, mock y otras herramientas populares de python para testing."
keywords:
  - "testing"
  - "python"
---

Hace mucho, cuando empecé a programar pensaba que probar el código era una pérdida de tiempo. ¿Para qué necesitaba escribir más código? ¿unittest python? ¿mock? podía solo leer el código, ver los lugares donde el código podía fallar y manejar el problema con un try y un except (o el equivalente en otro lenguaje). También pensaba que, a parte de los errores de sintaxis, no se generarían errores en el flujo del código si uno escribía con suficiente cuidado. El primer libro de programación que leí tenia una sección dedicada por completo al testeo y yo no entendía por que tanto revuelo. ¿por qué debería incorporar tests a mi código python? No pasó mucho tiempo hasta que me diera cuenta de lo equivocado que estaba. unittest python

## El testeo ahorra tiempo, mucho tiempo

El código que escribimos aumenta de tamaño cada día, a veces también disminuye en pos de un mejor rendimiento o abstracción, quitamos métodos que ya no son necesarias , acortamos métodos muy largos, eliminamos comentarios innecesarios. El código cambia y con cada uno de estos cambios existe la posibilidad de que el código falle al ejecutarse; cuando el código completo son unas cuantas lineas no hay problema, pero cuando el código es extenso sí que tenemos un problema, hay que buscar el error y corregirlo y, en ocasiones, el error no se manifiesta hasta que el código ha aumentado de tamaño.

A veces probar el código manualmente toma mucho tiempo y, en muchos casos, incluso requiere del input de un usuario o de la respuesta de una página web externa a una petición web previa hecha por nosotros, esto complica el testeo. Con los tests podemos emular el resultado de las respuestas, el input de los usuarios, el resultado de las funciones o métodos y, todo esto, en fracciones de segundo, sin necesidad de llevar a cabo un proceso manual de testeo que tomaría mucho más tiempo.

## El testeo es un seguro contra los fallos

Cuando no se tienen tests y el código esta siendo escrito por un equipo, cada contribución hecha por un colaborador es un fallo potencial . Si un cambio se implementa y aparece un error al ejecutar el código habrá que averiguar que falló y revertir el cambio. Si el error se manifiesta después de varias colaboraciones hechas por el equipo la perdida de tiempo se magnifica, pues hay que deshacer las colaboraciones para corregir el error y luego implementarlas nuevamente. El testeo adecuado asegura que **tras cada cambio en el código este seguirá cumpliendo sus tareas correctamente.**

## unittest python y otras herramientas populares de testeo

Hay muchas herramientas de testeo y son diferentes para cada lenguaje. Aquí enunciaré algunas de las más populares para Python.

### Unittest

Unittest es la herramienta más común de testeo, poderosa y flexible. El siguiente es un ejemplo de su uso:

```python
# testing.py
import unittest
from urllib.request import urlopen

class ExampleResponseGetter():
    
    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass


class TestWebPaymentRequest(unittest.TestCase):

    def testHttpResponse(self):
        requestObject = ExampleResponseGetter()
        responseStatus = requestObject.retrieveStatusCode()
        self.assertEqual(200, responseStatus)


if __name__ == '__main__':
    unittest.main()
```

El método retrieveStatusCode se conecta a internet y hace una solicitud al sitio web de example.org y devuelve el código de la respuesta (sí todo salió bien será de 200). Para probar si funciona instanciamos una clase que herede de unittest.TestCase, la clase probará cada método que empiece con la palabra 'test'.

El método assertEqual, se asegurará de que los dos argumentos sean iguales, en este caso 200 y responseStatus, si no lo son se considerará como un fallo y nos mostrará el resultado al final.

```bash
.
--------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

Hasta ahora bien, pero ¿qué tal si tenemos una conexión de internet lenta, o de plano no tenemos acceso a internet para probar? ¿qué tal si el status de 200 es la respuesta a un pago exitoso en un comercio electrónico externo? No podemos estar pagando y regresando el dinero hacer pruebas.

Tenemos que encontrar una manera de que el método regrese aquellas respuestas que necesitamos probar, un status de 200, 404, 500, etc. La siguiente libreria viene para resolver estos problemas.

### Mock

Esta libreria tiene la capacidad de permitir 'parchar' funciones o métodos para que retornen el valor que nosotros queremos, de esa manera podemos emular el resultado de acceso a APIs externas y centrarnos en la lógica del código en lugar de la integración de las pruebas con un sistema exterior del que muchas veces no tendremos control. Si quieres realizar esta prueba por favor recuerda instalar mock desde pip, de preferencia desde un entorno virtual.

```bash
pip install mock
```

Una vez que esté instalado procederemos a utilizarlo.

```python
# testing.py
import unittest
from urllib.request import urlopen

from mock import patch


class ExampleResponseGetter(object):
    
    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass


class TestWebPaymentRequest(unittest.TestCase):

    @patch('urllib.request.urlopen')
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.code = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)


if __name__ == '__main__':
    unittest.main()
```

Aquí el decorador 'parcha' la función de la libreria urllib, y la versión parchada se pasa como un argumento del método, podemos modificar el valor de retorno de este método parchado, inclusive si el valor de retorno es un objeto con otros atributos, como en este caso.

Cambiando el valor que le asignemos podremos manejar diferentes escenarios. Por ejemplo, si en lugar de asignarle un valor de 200, le colocamos un 404, la prueba fallará, incluso aunque example.org esté en linea y funcionando perfectamente.

```bash
F
======================================================================
FAIL: testHttpResponse (__main__.TestWebPaymentRequest)
--------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/eduardo/venv/lib/python3.8/site-packages/mock/mock.py", line 1305, in patched
    return func(*args, **keywargs)
  File "testing.py", line 24, in testHttpResponse
    self.assertEqual(200, responseStatus)
AssertionError: 200 != 404

--------------------------------------------------------------------
Ran 1 test in 0.001s

FAILED (failures=1)
```

### Coverage

Coverage monitorea tu código y examina las partes que fueron ejecutadas así como las partes que no, si lo combinamos con métodos de testeo, nos dice que partes del código no están siendo ejecutadas, de esta manera podemos darnos cuenta de las partes del código que no están siendo probadas y escribir el código apropiado para ello. Recuerda instalar coverage si quieres probarlo.

```bash
coverage report testing.py
Name        Stmts   Miss  Cover
-----------------------------
testing.py      17      1    94%
```

Al ejecutar el reporte nos muestra que hay 17 declaraciones, de las cuales solo una, no se está ejecutando, tenemos una cobertura del 94%. El método que falta debe ser handleError, al que solo le asignamos un pass, no se ejecuta en ningún momento y tampoco lo tenemos cubierto en las pruebas. Veamos si concuerda con nuestra hipótesis. Coverage también te permite generar un archivo donde te muestra que porciones del código se están ejecutando y cuales no.

Ejecutamos coverage run y el nombre de nuestro archivo, en este caso _testing.py_, seguido de coverage annotate.

```bash
coverage run testing.py

coverage annotate
```

Se generará un archivo en la carpeta donde estamos trabajando con el nombre de tu archivo y terminación '_,cover_'. Este reporte nos mostrará las lineas nuestro código y su situación. La convención para el reporte generado es la siguiente:  
\> Ejecutadas  
! No ejecutadas  
\- Excluidas

```python
# testing.py,cover
> import unittest
> from urllib.request import urlopen
  
> from mock import patch
  
  
> class ExampleResponseGetter(object):
      
>     def retrieveStatusCode(self):
>         statusCode = urlopen('http://example.org').code
>         return statusCode
  
>     def handleError(self):
!         pass
  
  
> class TestWebPaymentRequest(unittest.TestCase):
  
>     @patch('urllib.request.urlopen')
>     def testHttpResponse(self, mockedStatus):
>         mockedStatus.return_value.code = 200
>         StatusRetriever = ExampleResponseGetter()
>         responseStatus = StatusRetriever.retrieveStatusCode()
>         self.assertEqual(200, responseStatus)
  
  
> if __name__ == '__main__':
>     unittest.main()
```

Nuestra suposición es correcta, la única linea que resalta es la del pass del método handleError. Este método no se ejecuta ni en los tests ni en la clase principal, es código no cubierto, que debería incluirse posteriormente en las pruebas. El objetivo de usar coverage es verificar que tus pruebas estén cubriendo el mayor porcentaje posible de tu código. Hay programadores que incluso van más allá y no permiten un cambio en el código si este disminuye el porcentaje generado por coverage, de esa manera se aseguran de que cada nuevo commit **aumenta la cantidad de código cubierto por las pruebas.**

### Otras librerias de Testeo

Arriba he colocado algunas de las más populares, pero hay bastantes librerias como para elegir alguna con la que nos sintamos más cómodos. Aquí dejo otras dos:

Pylint te avisa avisa de errores en tu código, te sugiere como refactorizar bloques de código, corrobora que los nombres de tus variables esten bien formados y además cuida que se sigan convenciones específicas respecto al formato del código.

Nose extiende a unittest, te muestras más información de cada fallo y te permite integrar su funcionamiento con otras librerias, entre ellas coverage, por medio de plugins de terceros.

### Pero... no mencionaste Tox

Así es, no la mencioné porque quiero tratar el tema con un poco más de profundidad que aquí. En la siguiente entrada hablaré sobre una herramienta llamada Tox, que facilita la ejecución de pruebas en diferentes entornos y versiones de Python, [entra aquí para leerla.](https://coffeebytes.dev/testeo-con-tox-en-python-tutorial-desde-cero/)
