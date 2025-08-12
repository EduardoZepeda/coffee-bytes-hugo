---
aliases:
- /django-y-htmx-web-apps-modernas-sin-escribir-js
- /tutorial-de-django-y-htmx-web-apps-modernas-sin-escribir-js
- /django-y-htmx-web-apps-modernas-sin-escribir-js/djangohtmx/
- /es/tutorial-de-django-y-htmx-web-apps-modernas-sin-escribir-js/
- /es/django-y-htmx-web-apps-modernas-sin-escribir-js/
authors:
- Eduardo Zepeda
categories:
- django
- htmx
coverImage: images/Djangohtmx.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@quionie-gaban-11920925/
date: '2021-07-14'
description: Tutorial de Django y HTMX para crear aplicaciones web, sin necesidad
  de Frameworks como react mantener las mismas funcionalidades y con mucho menos código
  Javascript
keywords:
- django
- htmx
- react
- javascript
- framework
slug: /django/django-y-htmx-web-apps-modernas-sin-escribir-js/
title: Tutorial de Django y HTMX, web apps modernas sin escribir JS
---

El otro día estaba probando una librería llamada htmx, que promete volver mucho más sencilla la creación de una web, sí, otra librería, pero con la diferencia de que esta no necesita que escribas Javascript (JS) y que, además, combina bastante bien con Django. Htmx basa todo su funcionamiento en escribir atributos en tus etiquetas HTML, que se encargan de abstraer todo el JS que corre tras bambalinas. El resultado es código formado únicamente por etiquetas HTML y sus atributos, sin código JS (bueno, quizá solo un poco). No, no tienes que abandonar todo el JS, tranquilo, también puedes combinar htmx con tus librerías favoritas y código vanilla JS.

¿Y cuantos kB le va añadir a mi proyecto? Casi nada, HTMX es bastante ligero, pesa alrededor de 10 kB gzipped o 30 kB minimizado y no tiene dependencias.

{{< figure src="images/TamanoDeHTMX.png" class="md-local-image" alt="Tamaño de la librería HTMX. 105 kB normal, 32 kB minimizado y 10.8 comprimido en gzip." >}}

Htmx te permite manejar peticiones AJAX, transiciones de CSS, websockets y eventos mandados desde el servidor sobre cualquier tag de HTML que acepte atributos . Todas estas funcionalidades pueden ser desencadenadas por una serie triggers tales como que un elemento cargue, que aparezca en el viewport, un click, que el mouse entre (o salga), o incluso eventos que se activan cada cierto tiempo sin interacción del usuario. Además de peticiones GET y POST, HTMX permite hacer peticiones PUT, DELETE, PATCH, todo modificando atributos de etiquetas HTML únicamente.

Htmx no genera HTML, sino que delega esa tarea al servidor, por lo que en lugar de tener una endpoint con respuestas en JSON trabajaremos con endpoints que generarán directamente el código HTML y lo enviarán como respuesta, como si fuera SSR. Eso lo vuelve perfecto para combinarse con el sistema de plantillas que viene integrado en Django.

Pero supongo que quieres ver como luce el código ¿no? Mira este ejemplo tomado de la documentación:

```html
<button hx-post="/clicked"
       hx-trigger="click"
       hx-target="#parent-div"
       hx-swap="outerHTML">
    Click Me!
  </button>
```

> Cuando un usuario haga click en este botón, realiza una petición HTTP POST a la url /clicked y usa el contenido de la respuesta para reemplazar al elemento con el id parent-div en el DOM
> 
> https://htmx.org/docs/#introduction

{{< figure src="images/HtmxEsquema.jpg" class="md-local-image" alt="Esquema del funcionamiento de htmx" >}}

Esquema del funcionamiento de HTMX

## Preparación del proyecto de Django y htmx

Para este tutorial he creado un repositorio en github, por lo que si quieres ahorrarte todo el boilerplate, puedes simplemente clonar todo el proyecto e ir siguiendo el código conforme lo voy escribiendo.

Recuerda que si no estás convencido de porque deberías usar Django revisa mi entrada donde explico las [ventajas y desventajas de Django]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="es" >}}). Si no tienes idea de como se usa Django mejor empieza con la [guia de Django]({{< ref path="/posts/django/el-libro-definitivo-de-django/index.md" lang="es" >}})

```bash
 # Ejecuta esto para no escribir el código
git clone https://github.com/EduardoZepeda/djangohtmxtest.git
cd djangohtmxtest/
pip install
python manage.py migrate
python loaddata videogames
# Datos de inicio de sesión:
user: admin
password: contrasenaNoSegura
```

### Instalación de modelos y dependencias de Django

Para empezar, vamos a crear un entorno virtual con [el gestor de entornos virtuales pipenv](/es/python/pipenv-el-administrador-de-entornos-virtuales-que-no-conoces/). Tú puedes usar [pip](/es/python/python-virtualenv-tutorial-basico-en-linux/), poetry, conda o el que prefieras.

```bash
pip install django
```

Creemos un proyecto y una app con _django-admin_

```bash
django-admin startproject djangoHtmx
django-admin startapp videogameStore
```

Entra en la carpeta _videogameStore_ y creemos los modelos que usaremos

```python
from django.db import models

# Create your models here.
GENRES = (
    ("HOR","Horror"),
    ("RPG", "RPG"),
    ("ADV", "Adventure")
    )

class Videogame(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    genre = models.CharField(choices=GENRES, max_length=3)
    price = models.DecimalField(max_digits=20, decimal_places=2)
```

Ahora corramos las migraciones y creemos un súper usuario.

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

Dentro de la carpeta _djangoHtmx_ modificaremos el archivo _urls.py._

Vamos a crear las urls para la ruta _home/_ y posteriormente crearemos urls para nuestra app bajo la ruta _videogame/_

```python
from django.contrib import admin
from django.urls import path, include
from .views import home
from videogameStore.urls import urlpatterns as videogameUrls

urlpatterns = [
    path('', home, name="home"),
    path('admin/', admin.site.urls),
    path('videogame/', include(videogameUrls)),
]
```

Ahora creamos una carpeta _templates_ en la raíz del proyecto y vamos a crear una plantilla base que llamaremos _base.html_ y otra plantilla, que heredará de esta última, llamada _home.html_, la cual usaremos en la vista home.

```bash
mkdir templates
cd templates
touch base.html
touch home.html
```

{{<ad>}}

## Instalando htmx

Abrimos el archivo _base.html_ y colocamos el siguiente código. Observa como **para usar htmx basta con cargarlo desde unpkg** usando una etiqueta script. En este tutorial estamos usando la versión 1.4.1 de htmx

Mantendremos una estructura muy simple para la plantilla base, con solo las etiquetas header, body y footer

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ site.name }}{% endblock %}</title>
    {% block meta %}
      <meta name="theme-color" content="#333333">
      <meta name="msapplication-TileColor" content="#2b5797">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="apple-mobile-web-app-title" content="{{ site.name }}">
      <meta property="og:type" content="website">
      {% endblock meta %}
    <script src="https://unpkg.com/htmx.org@1.4.1"></script>
</head>
<body>
    {% block header %}{% endblock header %}
    {% block body %}{% endblock body %}
    {% block footer %}{% endblock footer %}
</body>
</html>
```

## Atributos más útiles de HTMX para Django

Abramos el archivo _home.html_. Extendemos de la plantilla _base.html_ y reemplazamos la etiqueta body con una presentación simple y nuestro primer botón con Htmx.

```python
{% extends "base.html" %}

    {% block body %}
        <div id="videogame-list">
            <h1>Welcome senpai!</h1>
            <p>Check out our summer discounts (✿◠‿◠)</p>
             <button hx-get={% url "videogameList" %}
               hx-trigger="click"
               hx-target="#videogame-list"
               hx-push-url="true"
               hx-swap="outerHTML">
                Go to discounts
            </button>           
        </div>

    {% endblock body %}
```

El botón va a tener cuatro atributos, cada botón le va a especificar una serie de comportamientos: hx-get, hx-trigger, hx-target, hx-push-url

### hx-get

Aquí colocaremos la url a la que haremos la petición. Observa como incluso podemos generarla de manera dinámica usando la etiqueta _{% url %}_ que provee django.

hx-get es uno de los atributos que se encargan de realizar peticiones AJAX, los otros son hx-post, hx-put, hx-patch y hx-delete, que realizan peticiones POST, PUT, PATCH y DELETE, respectivamente.

### hx-trigger

Será la clase de evento que desencadenará la petición, un click en este caso. Sin embargo podemos usar [otros eventos](https://developer.mozilla.org/es/docs/Web/Events) tales como mouseenter, mouseleave, keyup, etc.

Hay una serie de eventos especiales disponibles también:

- load: se activa cuando carga un elemento
- revealed: cuando un elemento se muestra en el viewport
- intersect: se desencadena cuando un elemento intersecta con el viewport
- every ns: cada cierto tiempo (ej. every 2s, every 10s)

Si no especificamos un evento la librería tomará ciertos eventos de manera predeterminada para realizar la petición AJAX.

- Los campos de formulario desencadenarán la petición con el evento change
- Los formularios con el evento submit
- El resto de elementos con un click

Estos eventos cuentan con modificadores que retardan un evento o impiden que se ejecute más de una vez.

- changed: realiza la petición solo si el elemento cambió
- delay: retrasa la ejecución de la petición
- throttle: igual que delay, pero rechaza nuevos eventos si no ha pasado el tiempo especificado
- from: permite escuchar el evento desde otro elemento. Recibe un selector CSS (Ej. #id)

### hx-target

Indica el elemento en donde queremos cargar la respuesta que obtendremos a la dirección que escribimos en hx-get, si no especificamos ninguno se usará el que hizo la petición. En el ejemplo se ha especificado la id del elemento padre. Si se omite este valor se reemplazará el elemento que hizo la petición, es decir, el que posee el atributo hx-get.

### hx-swap

Indica el elemento donde se colocará el resultado de la petición. Tenemos varias opciones:

- outerHTML: sustituyendo a la etiqueta
- innerHTML: en el interior de la etiqueta
- afterbegin: antes del primer hijo de la etiqueta
- beforebegin: antes de la etiqueta especificada
- beforeend: después del último hijo de la etiqueta
- afterend: después de la etiqueta
- none: en ningún lugar

De manera predeterminada es innerHTML

### hx-push-url

Le indica a htmx que debe reemplazar la url del navegador por la url que especificamos en hx-get.

### hx-boost

Si agregamos este atributo a la etiqueta body, todos los enlaces (anchors) que se encuentren en el interior van a tratarse como si se tratara de una SPA, se hará la petición y se reemplazará el body actual por el de la respuesta. Otorgando esa sensación de transición suave, como si estuvieras usando la API de Javascript para cambiar las urls. 

¿Pero y la etiqueta header? Pues ciertamente alguien tuvo el mismo problema y se desarrolló una extensión para el header también, puedes verla el enlace en el [repositorio de github de las extensiones de HTMX](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/head-support/README.md#?)

## Generación de HTML para htmx

El HTML que usaremos será exactamente el mismo que generaría Django en una petición normal usando su sistema de plantillas, ya sea usando el método render o con vistas genéricas.

Definamos primero nuestras vistas en la app videogameStore. Creemos el archivo _urls.py_ y, dado que usaremos vistas genéricas, colocamos las nombres y llamamos a su método _as\_view()_

```python
from django.urls import path
from .views import ListVideogames, VideogameDetail

urlpatterns = [
    path('list/', ListVideogames.as_view(), name="videogameList"),
    path('<int:pk>/', VideogameDetail.as_view(), name="videogameDetail"),
]
```

Hecho esto, vamos a crear las vistas. La vista de _ListView_ se encargará de devolver los objetos del modelo _Videogame_. _context\_object\_name_ se encargará de asignarle el nombre que usaremos para acceder a este modelo en las plantilla _listVideogames.html_, o sea "videogames".

_DetailView_ nos permite mostrar un solo objeto y usaremos la variable "videogame" para acceder al objeto en la plantilla _videogameDetail.html_.

```python
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Videogame

class ListVideogames(ListView):
    model = Videogame
    template_name = "listVideogames.html"
    context_object_name = "videogames"

class VideogameDetail(DetailView):
    model = Videogame
    template_name = "videogameDetail.html"
    context_object_name = "videogame"
```

Ahora crearemos las plantillas que necesitamos para que nuestras vistas funcionen

Primero _videogameDetail.html_

```html
<div id="videogame-detail">
    <h2>{{videogame.title}}</h2>
    <p>{{videogame.description}}</p>
    <small>{{videogame.price}}</small>
     <button hx-get={% url "videogameList" %}
       hx-trigger="click"
       hx-target="#videogame-detail"
       hx-swap="outerHTML"
       hx-push-url="true">
        Return to list
    </button>           
</div>
```

Después _listVideogames.html_

```html
<div id="videogame-list">
{% for videogame in videogames %}
    <a 
        hx-get={% url "videogameDetail" videogame.pk %}
        hx-trigger="click"
        hx-target="#videogame-list"
        hx-swap="outerHTML"
        hx-push-url="true">
        <h2>{{videogame.title}}</h2>
        <p>{{videogame.description|truncatewords:15}}</p>
        <button>Read more</button>
    </a>
{% endfor %}
</div>
```

Observa como, en ambos casos, el HTML generado por Django en la url a la que apunta _hx-target_ reemplazará el div con el id _videogame-list_ tras haberse efectuado un click sobre el elemento.

### Proceso de interacción entre django y htmx

Si nuestro código funciona, tras hacer click en el botón de home se realizarán los siguientes pasos:

{{< figure src="images/HtmxResponse-1.gif" class="md-local-image" alt="Htmx renderizando una aplicación web." >}}

1. Htmx realizará una petición GET a la url videogame/list/
2. Django consultará la base de datos, obtendrá la información y la pasará al sistema de renderizado de plantillas
3. El sistema de plantillas de Django renderizará el template _listVideogames.html_ y lo retornará como respuesta
4. Htmx tomará el contenido de la respuesta y reemplazará la etiqueta que tiene el id _#videogame-list_ con esta
5. Htmx modificará la url del navegador para que apunte a _videogame/list_/

## Mandando parámetros con Htmx

Cualquier elemento que provoque una petición va a incluir su valor (inputs). Si este elemento es un formulario, htmx incluirá el contenido de todos los inputs que se encuentren dentro de las dos etiquetas form. Vamos a crear un formulario para probar esto.

Primero agreguemos una vista para crear un videojuego en nuestro archivo _views.py_

```python
from django.views.generic import ListView, DetailView, CreateView

class VideogameCreate(CreateView):
    model = Videogame
    fields = ["title", "description", "genre", "price"]
    template_name = "createVideogameForm.html"
```

Recuerda dotar del método _get\_absolute\_url_ a nuestro modelo Videogame. Ya que si nuestra petición es exitosa, querremos que django nos redirija al nuevo objeto creado.

```python
    
class Videogame(models.Model):
    # ...
    def get_absolute_url(self):
        return reverse('videogameDetail', args=[str(self.id)])
```

Y coloquemos la url en nuestro archivo de _urls.py_

```python
from .views import ListVideogames, VideogameDetail, VideogameCreate
  
url_patterns = [
    # ...
    path('create/', VideogameCreate.as_view(), name="videogameCreate"),
]
```

Entremos a la carpeta _templates_ y creemos la plantilla _createVideogameForm.html_ que especificamos en nuestra vista genérica.

Asi mismo, nota como he eliminado el atributo _method_. Si nuestra petición es correcta, el videojuego se agregará y nos redirigirá a la url que especificamos en el método _get\_absolute\_url_ que creamos más arriba.

```html
<div id="videogame-list">
   <form 
    hx-post={% url "videogameCreate" %}
    hx-target="#videogame-list"
    hx-swap="outerHTML">
    {% csrf_token %}
    {{ form.as_p }}
        <input type="submit" value="Save">
    </form> 
</div>
```

Colocaré un botón en la lista de videojuegos, _listVideogames.html_ para que nos redirija a la vista de creación de páginas.

Esto es importante porque **si accedemos a una url diferente a la de _home_, que es donde se carga el script de htmx, no tendremos acceso a las funcionalidades.**

Solucionaremos este problema más adelante.

{{< figure src="images/LaEtiquetaHeadNoSeCarga.gif" class="md-local-image" alt="La etiqueta head no se carga directamente si accedemos a la ruta" >}}

```html
{% endfor %}
    <a 
        hx-get={% url "videogameCreate" %}
        hx-trigger="click"
        hx-target="#videogame-list"
        hx-swap="outerHTML"
        hx-push-url="true">
        <button>Submit a videogame</button>
    </a>
</div>
```

Mira como queda funcionando

{{< figure src="images/HtmxFormSubmit-1.gif" class="md-local-image" alt="Envío de un formulario usando htmx y django" >}}

Mira la imagen de abajo, htmx envió de manera automática el contenido de todos los campos que englobaba la etiqueta form como parte de la petición POST hecha a /videogame/create/

{{< figure src="images/PeticionHTTPPost.png" class="md-local-image" alt="Parámetros POST que manda de manera automática htmx" >}}

### Excluyendo parámetros con htmx

Es posible excluir parámetros por medio del atributo hx-params. Para usarlo simplemente lo colocamos en la etiqueta form o la que estemos usando.

hx-params recibe las siguientes posibles opciones

- \*: para incluir todos
- none: para no incluir parámetros
- not <lista-separada-por-comas>: para excluir una lista se parámetros separados entre comas
- <lista-separada-por-comas>: para incluir solo los parámetros que aparecen en esta lista separada por comas

```html
{% endfor %}
    <a 
        hx-get={% url "videogameCreate" %}
        hx-trigger="click"
        hx-target="#videogame-list"
        hx-swap="outerHTML"
        hx-push-url="true">
        hx-form="*"
        <button>Submit a videogame</button>
    </a>
</div>
```

## Encabezados especiales que manda htmx con cada petición

Hay otra cosa que sucedió y no te dije, cuando enviamos el formulario; htmx agregó algunos encabezados a nuestra petición.

Cada que se realiza una petición con Htmx, se envían encabezados extras al servidor. Basta con que te metas a las herramientas de desarrollador para que veas lo que enviamos en la última petición.

Se envió la url por medio del encabezado HX-Current-URL, el elemento objeto que se intercambiará por medio HX-Target, y un parámetro llamado HX-Request, que es siempre igual "true", que le indica al servidor que hicimos la petición con htmx. HX-Trigger, se envía si especificamos una id en la etiqueta que desencadena la petición. ¿Y para que me sirven estos encabezados? Pues puedes recuperarlos con django y usarlos como mejor te convenga en tus vistas.

{{< figure src="images/EncabezadosHtmx.png" class="md-local-image" alt="Lista de encabezados extra son agregados en cada petición" >}}

## Renderizando head, body y html de manera condicional con HTMX

¿Recuerdas que teníamos el problema de que si accedíamos directamente a las url, sin pasar por home, no se cargaba htmx? Pues ahora que sabemos que tenemos estos encabezados, podemos usarlos para que el sistema de plantillas incluya la etiqueta head, html y body solamente cuando accedamos directamente a la ruta.

```html
{% if not request.META.HTTP_HX_REQUEST %}
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{% block title %}{{ site.name }}{% endblock %}</title>
        {% block meta %}
          <meta name="generator" content="Htmx">
          <meta name="theme-color" content="#333333">
          <meta name="msapplication-TileColor" content="#BBBBBB">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black">
          <meta name="apple-mobile-web-app-title" content="{{ site.name }}">
          <meta property="og:type" content="website">
          {% endblock meta %}
        <script src="https://unpkg.com/htmx.org@1.4.1"></script>
    </head>
    <body>
{% endif %}
    {% block header %}{% endblock header %}
    {% block body %}{% endblock body %}
    {% block footer %}{% endblock footer %}
{% if not request.META.HTTP_HX_REQUEST %}
    </body>
    </html>    
{% endif %}
```

Y ahora en todas nuestras plantillas que solo retornan HTML, podemos hacer que extiendan de base.html y colocar el contenido dentro de la etiqueta _{% body %}_

```html
{% extends "base.html" %}
{% block body %}

    <div id="videogame-list">
    {% for videogame in videogames %}
        <a 
            hx-get={% url "videogameDetail" videogame.pk %}
            hx-trigger="click"
            hx-target="#videogame-list"
            hx-swap="outerHTML"
            hx-push-url="true">
            <h2>{{videogame.title}}</h2>
            <p>{{videogame.description|truncatewords:15}}</p>
            <button>Read more</button>
        </a>
    {% endfor %}
        <a 
            hx-get={% url "videogameCreate" %}
            hx-trigger="click"
            hx-target="#videogame-list"
            hx-swap="outerHTML"
            hx-push-url="true">
            <button>Submit a videogame</button>
        </a>
    </div>
{% endblock body %}
```

Ahora puedes acceder directo a las url y conservar la funcionalidad de htmx.

{{< figure src="images/HtmxConHeadDespuesDePeticion.gif" class="md-local-image" alt="Accediendo a las rutas directamente" >}}

### Renderizando condicional con HTMX en las vistas de Django

Lo anterior puede ser bastante complicado si tus plantillas son complejas, pero hay otras opciones. Por ejemplo puedes generar tu nombre de plantilla dinámicamente si has recibido una petición originada con HTMX, ¿te acuerdas que te dije de los headers o cabeceras especiales?

``` python
class YourGenericView(ListView):
    def get_template_names(self):
        if self.request.META.get("HTTP_HX_REQUEST"):
            return ["partials/_template.html"]
        return [self.template_name]
```

Te he mostrado solo lo básico de htmx combinado con django recuerda visitar la [documentación oficial](https://htmx.org/docs/) para ver el resto de cosas que tiene para ofrecer, como CSS transitions, websockets y SSE.