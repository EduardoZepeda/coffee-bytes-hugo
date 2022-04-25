---
title: "Django 3.1 cambios y novedades: resumen completo"
date: "2020-08-04"
categories: 
  - "django"
coverImage: "tres.jpg"
keywords:
  - django
  - python
---

Hace unas horas estaba navegando por [mi twitter](https://twitter.com/neon_affogato) y me enteré de que acaban de hacer públicas Django 3.1, cambios y novedades de ; mi framework para web favorito. Esta nueva versión tiene algunos cambios interesantes de los que hablaré a continuación.

## Vistas, Middleware y tests asíncronos

Adivina quién más le está apostando a la asincronía. Con esta nueva actualización Django incorpora asincronismo en vistas, middleware y tests. Sin embargo el ORM de Django, la cache y otras piezas de código que se conectan con internet no tienen soporte asíncrono para esta actualización, aunque en la documentación se afirma que se añadirá soporte para versiones posteriores.

### vistas

Django reconocerá las vistas que especifiquemos con _async def_ y se encargará de ejecutarlas en un contexto asíncrono. Para obtener los beneficios se debe usar un servidor ASGI. Por otro lado, también es posible usar un servidor WSGI pero habrá penalizaciones en el rendimiento.

```python
import datetime
from django.http import HttpResponse

async def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s.</body></html>' % now
    return HttpResponse(html)
```

### middleware

Django ahora permite combinar tanto middlewares asíncronos o sincronos. De manera predeterminada Django asumirá que tus middlewares son sincronos. Para modificar este comportamiento es necesario cambiar los atributos booleanos de tu fábrica de middleware:

- sync\_capable (default en True)
- async\_capable (default en False)

Django incorpora ahora tres decoradores para tus fábricas de middlewares. Además, si tu fábrica de middleware retorna un _get\_response()_ asíncrono debe usarse la sintaxis adecuada; async def.

- sync\_only\_middleware()
- async\_only\_middleware()
- and sync\_and\_async\_middleware()

```python
import asyncio
from django.utils.decorators import sync_and_async_middleware

@sync_and_async_middleware
def simple_middleware(get_response):
    # One-time configuration and initialization goes here.
    if asyncio.iscoroutinefunction(get_response):
        async def middleware(request):
            # Do something here!
            response = await get_response(request)
            return response

    else:
        def middleware(request):
            # Do something here!
            response = get_response(request)
            return response

    return middleware
```

### tests

Si estás haciendo pruebas desde una función asíncrona debes usar el cliente de test asíncrono que está disponible como _django.test.AsyncClient_, o como _self.async\_client._ Este nuevo cliente _AsyncClient_ tiene los mismos métodos que el cliente normal de testeo.

```python
async def test_my_thing(self):
    response = await self.async_client.get('/some-url/')
    self.assertEqual(response.status_code, 200)
```

## Campos compatibles con JSON

¡Ya era tiempo de un campo JSON! Django ahora incluye un campo para sus modelos llamado _models.JSONField_ y un campo _forms.JSONfield_, que puede ser usado en cualquier backend de base de datos compatible. Ambos campos soportan codificadores y decodificadores de JSON personalizados.

```python
from django.db import models

class ContactInfo(models.Model):
    data = models.JSONField()

ContactInfo.objects.create(data={
    'name': 'John',
    'cities': ['London', 'Cambridge'],
    'pets': {'dogs': ['Rufus', 'Meg']},
})
```

### Búsqueda en campos JSON

Podemos filtrar por este nuevo campo buscando el contenido de las propiedades del JSON usando notación de doble guión bajo.

```python

ContactInfo.objects.filter(
    data__name='John',
)
```

Django nos otorga la capacidad buscar objetos por la presencia de llaves específicas en el nivel más alto del contenido de su campo JSON

```python

ContactInfo.objects.filter(
    data__pets__has_key='dogs',
)
```

Así mismo podemos buscar la presencia o ausencia de ciertos elementos en una propiedad que tenga como valor una lista

```python

ContactInfo.objects.filter(
    data__cities__contains='London',
)
```

## Configuración DEFAULT\_HASHING\_ALGORITHM

Con esta nueva actualización podemos especificar el algoritmo por defecto de hashing en el archivo _settings.py_. Este valor se usará para codificar las cookies, tokens de reseteo de contraseña en el panel de administraciones, sesiones de usuario y en las firmas creadas por django.core.signing.Signer y django.core.signing.dumps(). Además se agrega soporte para SHA-256.

## Otras novedades de Django 3.1

PASSWORD\_RESET\_TIMEOUT\_DAYS es obsoleta en favor de PASSWORD\_RESET\_TIMEOUT, esta nueva variable de configuración permite definir el número de segundos que será válido un enlace reinicio de contraseña.

Ya se puede iterar a través del _Paginator_ para obtener las páginas.

Se agrega un enlace para limpiar todos los filtros en el panel lateral derecho del admin.

Ahora la variable de configuración CSRF\_COOKIE\_SAMESITE permite 'None' como valor. Mientras que HttpResponse.set\_cookie() y HttpResponse.set\_signed\_cookie() permiten usar samesite='None'.

Recuerda que si quieres ver los cambios a la documentación completa puedes entrar en [este enlace](https://docs.djangoproject.com/en/3.1/releases/3.1/#whats-new-3-1) para ver los cambios completos que trae la versión de Django 3.1

Si quieres mejorar tus habilidades en Django te dejo aquí recomendaciones de dos excelentes libros. Entra y checa mis reseñas de [Django for Professionals](https://coffeebytes.dev/resena-de-django-for-professionals/) y de [Two scoops of Django](https://coffeebytes.dev/el-mejor-libro-de-django-resena-de-two-scoops-of-django/).
