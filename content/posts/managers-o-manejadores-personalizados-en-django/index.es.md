---
aliases:
- /managers-o-manejadores-personalizados-en-django
- /managers-o-manejadores-personalizados-en-django/feed/
authors:
- Eduardo Zepeda
categories:
- django
- bases de datos
coverImage: images/Managers_para_django.jpg
coverImageCredits: Créditos a https://www.pexels.com/es-es/@suju/
date: '2021-05-28'
description: Te explico que es un manager, para que sirve y como puedes crear y personalizarlos
  para sacarle el mayor provecho al usar el ORM de Django.
keywords:
- django
- python
- orm
title: Managers o manejadores personalizados en Django
---

Un Manager (o manejador) es la interfaz a través de la cual se proveen las operaciones de consulta o queries de la base de datos a los modelos de Django. Sí, me refiero a ese _objects_ que va después del nombre de tu modelo; _TuModelo.objects.all()_ y _Tumodelo.objects.filter()_. Todos los modelos de Django tienen al menos un manager. Cada vez que usas el manejador de objetos (me referiré a él como manager de aquí en adelante) en una consulta a la base de datos usando el ORM de Django estás haciendo uso de su _object manager_ predeterminado. Estos managers en Django pueden personalizarse para modificar los objetos que devuelve una consulta y podemos personalizarlos a nuestro gusto.

Antes de empezar, si no sabes lo básico de Django puedes empezar con [la guia definitiva de Django](/es/la-guia-definitiva-de-django/)

Por otro lado, si estás buscando optimizar tu aplicación de Django, probablemente mi entrada donde hablo sobre como [mejorar el rendimiento de apps lentas de Django](/es/como-escalar-django-para-manejar-millones-de-vistas/) te sirva más.

## El object manager de Django

Si has usado el ORM de Django, seguramente ya habrás usado el manager por defecto. Objects es el nombre del manejador por defecto y **se encarga de devolver todos los objetos** de un modelo de Django.

```python
Videogame.objects.all()
```

{{<ad>}}

## Modificando el manager por defecto

Quizás queremos tener dos managers, uno que devuelva todos los objetos y otro que devuelva los objetos más recientes, o los objetos creados por un usuario en particular, o los objetos filtrados por un termino.

Empecemos por modificar el nombre del manager que viene por defecto, para hacerlo basta con que lo asignemos al objeto Manager de models.

```python
from django.db import models

  class Videogame(models.Model):
  ...#
      stem = models.Manager() #Esto te permitira llamar Videogame.stem.all() en lugar de Videogame.objects.all()
```

¿Y esto para que? Pues que ahora podemos llamar al _object manager_ de una manera diferente, lo cual puede mejorar la legibilidad de nuestro código, pero no es la razón más importante.

```python
Videogame.stem.all()# En lugar de Videogame.objects.all()
```

## Agregando métodos a un manager de Django

Un manager personalizado nos permite agregarle nuevos métodos, que le otorgarán comportamientos únicos . ¿Cómo cuales? puedes filtrar los resultados de alguna búsqueda, limitar los resultados de acuerdo al usuario, un rango de fechas, un número de resultados, lo que tú prefieras.

Mira este ejemplo a continuación, instanciamos un nuevo manager llamado _VideogameManager_, el cual hereda de _models.Manager_. Le agregamos un método llamado _contar\_títulos_ que se encargará de contar los resultados para una determinada búsqueda, nada muy complicado, simplemente concatenamos un _filter_ con una consulta, como si se tratara de cualquier búsqueda.

Ya que tenemos este nuevo manager con el método _contar\_titulos_, reemplazamos la propiedad _objects_ de nuestro modelo _Videogame_ por una instancia del manager que acabamos de crear.

```python
from django.db import models

  class VideogameManager(models.Manager):
      def contar_titulos(self, keyword):
          return self.filter(titulo__icontains=keyword).count()
   #self se refiere al manager en sí mismo
  class Videogame(models.Model):
    …
      objects = VideogameManager() #Renombra al manager por defecto aquí se usa objects para ser consistente
```

Ahora nuestro manager predeterminado, _objects_, cuenta con un método llamado _contar\_titulos_ que podemos usar como si formara parte del ORM original de Django.

```python
Videogame.objects.contar_titulos('fantasy')
```

## Modificando los QuerySets iniciales del Manager

Un QuerySet base de un Manager devuelve todos los objetos en el sistema. Pero, ¿y si solo nos interesan ciertos datos? Imagínate que la tienda en linea tiene una base de datos de todos los videojuegos, pero, como somos unos geeks básicos, le dimos a la compañia squarenix una sección especial.

Si escribimos consultas individuales personalizadas para cada queryset de esa sección quedarían algo así:

```python
Videogames.objects.filter(company="squarenix").filter(titulo__icontains="Fantasy")
# ...
Videogames.objects.filter(company="squarenix").filter(descripcion__icontains="Aventura")
# ...
Videogames.objects.filter(company="squarenix").filter(genero="RPG")
```

Como ya sabes, lo anterior repite demasiado código, violando la máxima de DRY.

Podemos reemplazar el QuerySet base, sobreescribiendo el método _Manager.get\_query\_set()_ para que la queryset que obtengamos por defecto haga el filtrado por el nombre de la compañia.

```python
  from django.db import models

  # Primero, definimos una subclase para el Manager.
  class SquarenixManager(models.Manager):
      def get_query_set(self):
          return super(SquarenixManager, self).get_query_set().filter(company='squarenix')

  # Despues lo anclamos al modelo Videogame explícitamente.
  class Videogame(models.Model):
      # ...
      objects = models.Manager() # El manager predeterminado.
      squarenix_videogames = SquarenixManager() # Nuestro manager
```

Nota como ahora tenemos dos managers. Un Modelo puede definir varios manager, **el primer manager que aparezca es el manager por omisión** (en el ejemplo de arriba es _objects_), el cual será usado por Django internamente para otras características especiales.

Al ejecutar el manager devolverá solo los libros que tengan como compañia Squarenix y, además, puede usar todos los métodos de QuerySet sobre él.

```python
Videogame.objects.all() # Devuelve todos los videojuegos
Videogame.squarenix_videogames.all() # Devuelve solo los videojuegos de squarenix
Videogame.squarenix_videogames.filter(titulo__icontains='Kingdom Hearts') #Devuelve los videojuegos de squarenix cuyo título contenga Kingdom Hearts
```

Y es todo. Ahora que sabes eso puedes crear tantos managers como quieras que te den tantas búsquedas filtradas como necesites.

Si quieres profundizar más en el tema de los managers revisa [la documentación oficial de Django.](https://docs.djangoproject.com/en/3.2/topics/db/managers/#?)