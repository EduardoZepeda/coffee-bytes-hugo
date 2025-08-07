---
aliases:
- /como-crear-un-historial-de-productos-visitados-con-django-y-redis
- /como-crear-un-historial-de-productos-visitados-con-django-y-redis/feed/
- /es/como-crear-un-historial-de-productos-con-django-y-redis/
- /es/como-crear-un-historial-de-productos-visitados-con-django-y-redis/
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/django_y_redis_con_mejor_diseno.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@axel-vandenhirtz-332204/
date: '2020-11-28'
description: Tutorial para la creación de un un historial de productos visitados sencillo
  y minimalista usando django, sus queries y el motor de base de datos redis
keywords:
- django
- redis
slug: /django/como-crear-un-historial-de-productos-visitados-con-django-y-redis/
title: ¿Cómo crear un historial de productos con django y redis?
---

Estás navegando en un ecommerce, un producto llama tu atención y haces click para verlo, no te convence. Decides ver otras opciones, haces click en un nuevo producto y, cuando haces scroll al fondo de la página, la página te muestra el primer producto que viste bajo la leyenda "Vistos recientemente". Tú puedes hacer lo mismo con django y redis.

## django y redis

Agregar una sección de productos visitados aumenta las ventas en un ecommerce y mantiene al usuario más tiempo en la página. Es normal añadir este historial a un usuario que ya está en la base de datos. Los encargados de la página web tienen un historial de los productos que vemos, los que compramos, cuanto tiempo pasamos viéndolos y muchos otros datos pero... ¿y los usuarios anónimos que no tienen una cuenta?

{{< figure src="images/Historial-de-Amazon.png" class="md-local-image" alt="Historial de productos visitados de amazon, incluye Cracking the code interview, Design Patterns, Clean Code y the Pragmatic Programmer." >}}

Historial de cierta página de ecommerce que ya no necesita más publicidad.

A lo mejor no te interesa (o a tu empresa) tener guardados en una base de datos el historial de millones de productos visitados por cada usuario anónimo que visita el sitio, pero aún así te gustaría mostrarle a cada usuario, registrado o no, los productos que ha visto.

Redis es un motor de base de datos muy eficiente, trabaja con datos volátiles, pues almacena su información en memoria, por lo que su acceso es casi instantáneo, aunque volátil. Sin embargo **es posible volcar su información a un medio permanente, como mysql, postgres u otra base de datos, posteriormente**. Seguramente podemos usar redis pero... ¿cómo vamos a diferenciar un usuario anónimo de otro?

Hay muchas maneras de abordar ese problema, puedes asociar un usuario (y su historial) con una cookie, ip o hasta un enlace de afiliado, etc. El tipo de dato que desees vincular depende de las intenciones del negocio. Para este ejemplo usaremos una session key del sistema de sesiones que ya viene incluido en django de manera predeterminada.

{{<ad>}}

## Instalar redis en GNU/Linux

Antes de empezar a usar django y redis hay que instalar este último en nuestro sistema operativo GNU/Linux. Si no tienes ni idea de los comandos básicos en un entorno linux te sugiero visitar mi entrada que habla de los [comandos más comunes de GNU Linux]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="es" >}})

```bash
sudo apt install redis-server
redis-server
```

## Instalar redis para Python

A continuación vamos a instalar el paquete que vincula redis con Python.

```bash
pip install redis
```

En el archivo _settings.py_ de nuestra aplicación, agregamos los valores por defecto que vamos a usar. Estos pueden ser diferentes si tu servidor de redis está en otra ubicación o si elegiste otro puerto en lugar del predeterminado.

```python
# settings.py
# ...
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0
```

Además le pediremos a django que guarde la sesión con cada petición y nos aseguraremos que esté activo el middleware para sesiones.

```python
# settings.py
MIDDLEWARES = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ...
]
# ...
SESSION_SAVE_EVERY_REQUEST = True
```

Para este ejemplo uso un modelo llamado _Product,_ pero tu puedes sustituirlo por el equivalente en tu aplicación.

```python
 # app/models.py
from django.db import models

class Product(models.Model):
    # ...
```

Si has llegado hasta aquí, pero no tienes idea de como funciona Django tengo unas entradas donde reseño un par de libros que pueden servirte: [El libro definitivo de Django (Gratuito)](/es/django/la-guia-definitiva-de-django/) o [Django by example](/es/django/aprender-django-con-django-by-example-mi-resena/)

## Eligiendo el valor que usaremos como llave en django y redis

Primero hay que elegir el momento en que redis guardará nuestro acceso al producto. La vista que devuelve los detalles de un producto sería lo ideal. De esta manera, cada que un usuario del sitio web acceda a los detalles del producto agregaremos la información del producto a su identificador de usuario.

```python
# app/views.py
from .models import Product
from django.shortcuts import get_object_or_404

def product_details(request, product_id):
    products = Product.objects.all() # O el queryset que prefieras
    product = get_object_or_404(products, product_id)
    # ... más código 
```

Primeramente, vamos a obtener el objeto cuyos detalles estamos consultado, para eso usamos _get\_object\_or\_404_, al que le pasamos un queryset o un modelo y el _id_ que buscará.

Ahora vamos a crear una serie de funciones para facilitar nuestro trabajo, puedes crearlas en un archivo separado, yo le llamaré _utils.py_

## Conectar redis y python

En el archivo de utils.py vamos a establecer una conexión entre Python y Redis. El método StrictRedis recibirá los valores, estos son los mismos que especificamos en nuestro archivo de configuración, por lo que podemos importarlos directamente de ahí.

```python
# app/utils.py
import redis
from django.conf import settings

r = redis.StrictRedis(host=settings.REDIS_HOST,
port=settings.REDIS_PORT,
db=settings.REDIS_DB)
```

## Crear un identificador de usuario para usar como llave en redis

Queremos asociar cada llave de redis a un usuario, por lo que, necesitamos una función que nos devuelva una manera de identificar a cada usuario de nuestra página. Para usuarios anónimos lo ideal sería usar una session key, si queremos incluir a usuarios con cuento podemos asociarlos directamente con su usuario.

Nuestra función guarda la sesión si no existe una _session\_key_, de esta manera nos aseguraremos de siempre contar con una. La función nos devolverá la _session\_key_ si el usuario es anónimo o el usuario si este ya esta loggeado.

Para esto es necesario que reciba el objeto request como argumento.

```python
# app/utils.py

def get_user_id_for_redis(request):
    if not request.session.session_key:
        request.session.save()
    return request.session.session_key if request.user.is_anonymous else request.user
```

## Guardar valores en redis con lpush o rpush

La manera en la que guarda redis los datos es vinculándolos con una llave, esa llave tiene una lista asociada que será la que contendrá la información.

Es bastante similar a un diccionario que tiene una lista como valor. El equivalente en código Python se vería más o menos así:

```python
{"id_de_usuario_unico_1": [34, 22, 100, 5, 6], "id_de_usuario_unico_2": [112, 444, 3]}
```

Los números que guardaremos serán los id o llaves primarias de los productos.

Para decirle a redis que extienda esa lista por el principio usaremos _lpush_.

**El método _lpush_ recibe; el nombre de la llave que guardaremos, como primer argumento; un valor que agregará a al inicio lista de valores asociada, como segundo argumento.** En caso de que la llave no exista, la creará. Además _lpush_ **retorna el tamaño de la lista asociada a la llave que le pasamos como primer argumento.** El método rpush hace lo mismo pero por el final.

Sabiendo esto crearemos una función que tome un usuario y un id de producto y se los pase a redis para que los guarde, nuestra función retornará el valor que devuelve _lpush_.

```python
# app/utils.py

def create_product_history_by_user(user_id, product_id):
    product_history_length = r.lpush(user_id, product_id)
    return product_history_length
```

Continuando con la analogía anterior, _lpush_ haría algo parecido a esto.

```python
{"id_de_usuario_unico_1": [34, 22, 100, 5, 6]}
r.lpush("id_de_usuario_unico_1", 1000) 
{"id_de_usuario_unico_1": [1000, 34, 22, 100, 5, 6]}
```

## Obtener una lista de valores asociada a una llave con lrange

Ahora que ya hemos creado una función para extender una lista asociada a un usuario, creemos una función que nos devuelva esa lista.

Usemos _lrange_

El método **_lrange_ nos permite pasarle una llave (_user\_id_) y nos devolverá la lista que tiene asignada**, desde el valor inicial (0), hasta el final (4), contando desde el principio. Es decir, los elementos con índices del 0 al 4. Como no queremos repetir valores, recurriremos una _set comprehensión_ para transformar los valores en enteros.

```python
# app/utils.py

def get_products_ids_by_user(user_id):
    last_viewed_products_ids = r.lrange(user_id, 0, -1) # Devuelve [b'2', b'4', ...]
    last_viewed_products_ids_list = {int(id) for id in last_viewed_products_ids}
    return last_viewed_products_ids_list
```

Esta función nos devolverá únicamente esos valores de redis, para que podamos saber que productos retornaremos de la base de datos.

## Creando un queryset a partir de valores de redis

La función anterior nos devuelve una lista de valores, correspondientes a id o llaves primarias de productos en nuestra base de datos.

Usaremos esa lista de valores para filtrar productos en nuestra base de datos, un uso bastante común del ORM de django con el que no deberías tener problemas.

Básicamente significa: obtén todos los productos y luego fíltralos de manera que solo queden aquellos productos cuyo id o llave primaria se encuentre en la lista llamada _product\_ids_

```python
# app/utils.py
from .models import Product

def get_product_history_queryset_by_user(product_ids, product_id):
    last_viewed_products_queryset = Product.objects.all().filter(
        id__in=product_ids).exclude(id=product_id)
    return last_viewed_products_queryset
```

Toma en cuenta que puedes sustituir la query _Product.objects.all()_ por la queryset que tú desees. Quizás prefieras no mostrar todos los productos en tu base de datos, sino solo los activos, los que tengan inventario o cualquier otra combinación.

## Evitemos guardar valores repetidos

Como no queremos que en la lista de productos vistos se repitan productos, vamos a asegurarnos de que el id o llave primaria del producto no se encuentre en la lista que estamos obteniendo antes de agregarlo.

Para hacerlo solo revisamos que el id del producto se encuentre fuera de la lista que nos regresa la función _get\_products\_ids\_by\_user_ que escribimos anteriormente.

```python
# app/views.py
from .models import Product
from django.shortcuts import get_object_or_404

def product_details(request, product_id):
    # ...
    user_id = get_user_id_for_redis(request)
    product_ids = get_products_ids_by_user(user_id)
    if int(product_id) not in product_ids:
        create_product_history_by_user(user_id, product_id)
    product_history_queryset = get_product_history_queryset_by_user(product_ids)
    # ... más código 
```

Sin embargo ahora nos topamos con otro problema, que pasa si nuestra tienda tiene decenas de miles de productos y nuestro tráfico diario son decenas de miles de usuarios, ¿de verdad queremos mantener en memoria una lista tan grande de productos visitados? La mayoría de los usuarios no revisarán sus últimos mil productos para ver si se les antoja comprar algo.

Es innecesario mantener una lista tan larga si solo vamos a acceder a unos cuantos productos.

¿Cómo lo solucionamos? Necesitamos crear una función que nos ayude a mantener la lista de productos asociados a una llave en redis en un límite.

## rpop y lpop de redis remueven un elemento de una lista

**El método rpop se encarga de remover el último elemento de una lista asociada a una llave y lo devuelve.** El método lpop hace lo mismo, pero con el primer elemento

Podemos usar rpop para para remover el elemento más antiguo e ir depurando los elementos más viejos. Si con la última inserción la lista crece más allá de nuestro limite (en este caso 5) quitaremos el elemento más antiguo.

```python
# app/utils.py
from .models import Product

def limit_product_history_length(user_id, product_history_length):
    if product_history_length > 5:
        r.pop(user_id)
```

### ltrim es una alternative a lpop y rpop

La función **_ltrim_ de redis se encarga de cortar los valores iniciales de lista asociada a una llave**, le indicamos el índice inicial y su índice final como argumentos.

La diferencia que tiene con ltrim es que su tiempo de ejecución es O(n), puesto que depende de la cantidad de elementos a remover, mientras que para rpop es de O(1). Si no tienes idea de que te estoy hablando visita mi entrada donde hablo un poco sobre la [notación Big O]({{< ref path="/posts/linux/la-notacion-big-o/index.md" lang="es" >}}) o quédate con la idea de que si solo vamos a eliminar un elemento rpop es mejor. Sin embargo puede que quieras un comportamiento diferente y te sirva más usar _ltrim_.

Redis tiene información del tiempo de ejecución de cada función en su documentación y puede ser muy útil si el rendimiento de tu aplicación de django es importante.

```python
# app/utils.py
from .models import Product

def limit_product_history_length(user_id, product_history_length):
    if product_history_length > 5:
        r.ltrim(user_id, 0, 5)
```

Ahora agregamos la función para que se ejecute **solo si ha habido una inserción** de un elemento en redis, es decir, si el producto actual no se encuentra en nuestra lista.

```python
# app/views.py
from .models import Product
from django.shortcuts import get_object_or_404

def product_details(request, product_id):
    # ...
    user_id = get_user_id_for_redis(request)
    product_ids = get_products_ids_by_user(user_id)
    if product_id not in product_ids:
        product_history_length = create_product_history_by_user(user_id, product_id)
        limit_product_history_length(user_id, product_history_length)
    product_history_queryset = get_product_history_queryset_by_user(request.user, product_ids)
    # ... más código 
```

Ahora que tenemos el queryset con los datos de redis, podemos retornarlo y renderizarlo en una plantilla de django, procesarlo para devolver una respuesta JSON o lo que tu aplicación requiera.

```python
# app/views.py
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse


def product_details(request, product_id):
    # ...
    context = {"visited_products": visited_products} 
    return TemplateResponse(
        request, 'product/details.html', context) 
```

## Asignar una fecha de expiración a los datos en redis

Pero, que tal si no nos interesa que tantos productos vea un cliente anónimo, sino el tiempo que los guardamos.

Quizás hoy el cliente quiera comprar un producto en especial, pero a lo mejor consideramos inútil mostrarle ese mismo producto tres meses después. ¿Por qué no ponerle una fecha de expiración a la lista que estamos guardando? Si el usuario no vuelve a visitar un nuevo producto tras transcurrir cierta cantidad de tiempo se borrará la información.

_r.expire_ recibe la llave que queremos que caduque y el tiempo para su eliminación, en ese orden, como sus argumentos. Para este ejemplo le he asignado tres meses. Y así se irán borrando los historiales de las sesiones inactivas que han estado inactivas por largo tiempo.

```python
# app/utils.py
from .models import Product

def create_product_history_by_user(user_id, product_id):
    product_history_length = r.lpush(user_id, product_id)
    r.expire(user_id, 60*60*24*90)
    return product_history_length
```

Redis tiene mucho para ofrecer, y vincularlo con django te permiterá hacer mucho. Te dejo la [documentación de redis](https://redis.io/) por si quieres profundizar en ella y sus [bindings en python.](https://github.com/redis/redis-py)