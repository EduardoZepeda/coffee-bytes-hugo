---
title: "¿Qué hace la aplicación ContentType en Django?"
date: "2021-02-16"
categories: 
  - "django"
coverImage: "images/ContentTypeDjango2.jpg"
coverImageCredits: "Créditos https://www.pexels.com/es-es/@iamikeee/"
description: "Aprende para que sirve ContentType en Django y como acceder a la información que guarda este modelo en nuestra aplicación de Django."
keywords:
  - "django"
  - "python"
  - "orm"
authors:
  - Eduardo Zepeda
---

¿Sabías que Django lleva un registro de cada uno de los modelos que creas para tu proyecto en un modelo llamado _ContentType_? Sigue leyendo para aprender al respecto.

¡Perdón por tardar tanto en escribir! He estado ocupado mudando el frontend de mi blog a Frontity, un framework de React para Wordpress, y también mudándome a un nuevo departamento. Quizás hable un poco al respecto de Frontity en alguna entrada futura. Por ahora continuemos con el tema.

Antes de empezar, si no tienes ninguna idea de para que sirve Django visita mi entrada donde hablo sobre [la guia definitiva de Django](/la-guia-definitiva-de-django/) Si ya has usado Django anteriormente, sigamos adelante.

## ContentType y los modelos

ContentTypes es un **modelo especial de Django que registra cada uno de los modelos que existen** dentro de nuestra aplicación, tanto los que nosotros creamos, como los que vienen instalados por defecto.

## ¿Para que sirve ContentType?

ContentType **sirve para relacionar modelos con otros modelos**, como si fuera una foreign key (llave foránea), pero con la ventaja de que el tipo de modelo con el cual lo relacionemos puede ser diferente para cada entrada de la tabla.

Imagínate una sencilla red social, donde tenemos diferentes tipos de contenido; un modelo para videos, un modelo para imágenes y un modelo para textos. ContentType nos permite crear un modelo que haga referenciar a cualquiera de nuestros tres modelos de una manera sencilla.

## ¿Cómo usar ContentType?

Para ejemplificar como funciona ContentType vamos a crear un projecto de django, con un modelo:

Primero creemos un entorno virtual con [Pipenv, el gestor de entornos virtuales](/pipenv-el-administrador-de-entornos-virtuales-que-no-conoces/).

```bash
pipenv shell
```

Una vez en nuestro entorno virtual, instalemos Django

```bash
pipenv install django
```

Creemos un proyecto:

```bash
django-admin startproject videogameStore
cd videogameStore
```

Ahora crearemos una app para nuestra aplicación.

```bash
django-admin startapp videogame
cd videogame
```

Ya que tenemos nuestra aplicación, habrá que crear un modelo, y, como ya te mencioné, Django automáticamente registrará ese modelo en su aplicación _ContentType_.

Lo primer que haremos será abrir nuestro archivo _models.py_ y editar el contenido

```python
from django.db import models

# Create your models here.

class Videogame(models.Model):
    name = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)
    modified    = models.DateTimeField(auto_now=True)
```

Hay que recordar agregar nuestra app recién creada a nuestro archivo _settings.py_

```python
INSTALLED_APPS = [
    ...,
    'videogame'
]
```

Creamos las migraciones y las ejecutamos. Presta atención a como se crean migraciones para la aplicación ContentTypes en Django.

```bash
python3 manage.py makemigrations
Migrations for 'videogame':
  videogame/migrations/0001_initial.py
    - Create model Videogame
python3 manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, videogame
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
...
```

Ahora tendremos un modelo registrado en _ContentType_. Vamos a corroborarlo directo desde la _shell_ de Django.

```python
python manage.py shell
```

Una vez en la terminal, importemos el modelo _ContentType_.

Justo como cualquier otro modelo, podemos usar su ORM para obtener los datos de los modelos.

Cada objecto del modelo _ContentType_ tendrá una propiedad llamada _app\_label_, y otra _model_, las cuales son el nombre de la aplicación y el nombre del modelo, respectivamente.

```python
from django.contrib.contenttypes.models import ContentType
ContentType.objects.get(app_label='videogame', model="videogame")
<ContentType: videogame | videogame>
```

Si prefieres, también puedes acceder a la instancia de _ContentType_ directamente desde el modelo usando el método _get\_for\_model_.

```python
from videogame.models import Videogame
ContentType.objects.get_for_model(Videogame)
<ContentType: videogame | videogame>
```

## Otros modelos guardados en ContentType de Django

Como ya sabes, cada entrada de una tabla tiene un identificador único, la id, mira lo que pasa si accedemos al id de la instancia que acabamos de crear.

```python
ContentType.objects.get(app_label='videogame', model="videogame").id
7
```

Sí, como ya habrás deducido, hay más modelos registrados en la app de ContentType. Averigüemos cuales son.

```python
>>> ContentType.objects.get(id=1)
<ContentType: admin | log entry>
ContentType.objects.get(id=2)
<ContentType: auth | permission>
ContentType.objects.get(id=3)
<ContentType: auth | group>
ContentType.objects.get(id=4)
<ContentType: auth | user>
```

Como ya mencioné, cada una de las apps instaladas de manera predeterminada cuentan con sus modelos respectivos.

Si quieres ahondar más en el tema por favor revisa [la documentación oficial de Django.](https://docs.djangoproject.com/en/3.1/ref/contrib/contenttypes/)
