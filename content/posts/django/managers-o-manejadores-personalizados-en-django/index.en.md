---
aliases:
- /en/managers-or-custom-handlers-in-django/
authors:
- Eduardo Zepeda
categories:
- django
- databases
coverImage: images/Managers_para_django.jpg
coverImageCredits: Credits to https://www.pexels.com/es-es/@suju/
date: '2021-05-28'
description: I explain what a manager is, what it's for and how you can create and
  customize them to get the most out of them when using Django's ORM.
keywords:
- django
- python
- orm
title: Managers or custom handlers in Django
---

A Manager (or handler) is the interface through which query operations or queries from the database are provided to Django models. Yes, I mean that _objects_ that goes after the name of your model; _YourModel.objects.all()_ and _Tumodel.objects.filter()_. All Django models have at least one manager. Whenever you use the object manager (I will refer to it as manager from here on) in a database query using the Django ORM you are making use of its default _object manager_. These managers in Django can be customized to modify the objects returned by a query and we can customize them to our liking.

Before you start, if you don't know the basics of Django you can start with [the definitive guide to Django](/en/django/the-definitive-guide-to-django/)

On the other hand, if you are looking to optimize your Django app, probably my post where I talk about how to [improve performance of slow Django apps](/en/software architecture/how-to-scale-a-django-app-to-serve-one-million-users/) will serve you better.

## The Django object manager

If you have used the Django ORM, you have probably already used the default manager. Objects is the name of the default manager and **is responsible for returning all objects** in a Django model.

```python
Videogame.objects.all()
```

{{<ad>}}

## Modifying the default manager

Perhaps we want to have two managers, one that returns all objects and another that returns the most recent objects, or objects created by a particular user, or objects filtered by a term.

Let's start by modifying the name of the default manager, to do so we just have to assign it to the Manager object of models.

```python
from django.db import models

  class Videogame(models.Model):
  ...#
      stem = models.Manager() #Esto te permitira llamar Videogame.stem.all() en lugar de Videogame.objects.all()
```

What is this for? Well, we can now call the _object manager_ in a different way, which may improve the readability of our code, but it is not the most important reason.

```python
Videogame.stem.all()# En lugar de Videogame.objects.all()
```

## Adding methods to a Django manager

A custom manager allows us to add new methods, which will give it unique behaviors. How? You can filter the results of a search, limit the results according to the user, a range of dates, a number of results, whatever you prefer.

Look at this example below, we instantiate a new manager called _VideogameManager_, which inherits from _models.Manager_. We add a method called _count_titles_ that will be in charge of counting the results for a given search, nothing too complicated, we simply concatenate a _filter_ with a query, as if it were any search.

Since we have this new manager with the _count_titles_ method, we replace the _objects_ property of our _Videogame_ model with an instance of the manager we just created.

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

Now our default manager, _objects_, has a method called _count_titles_ that we can use as if it were part of the original Django ORM.

```python
Videogame.objects.contar_titulos('fantasy')
```

## Modifying the initial Manager QuerySets

A Manager's base QuerySet returns all objects in the system. But what if we are only interested in certain data? Imagine that the online store has a database of all video games, but, since we are basic geeks, we gave the squarenix company a special section.

If we write individual custom queries for each queryset in that section it would look something like this:

```python
Videogames.objects.filter(company="squarenix").filter(titulo__icontains="Fantasy")
# ...
Videogames.objects.filter(company="squarenix").filter(descripcion__icontains="Aventura")
# ...
Videogames.objects.filter(company="squarenix").filter(genero="RPG")
```

As you know, the above repeats too much code, violating the DRY maxim.

We can replace the base QuerySet by overwriting the _Manager.get_query_set()_ method so that the default queryset we get does the filtering by company name.

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

Note how we now have two managers. A Model can define several managers, **the first manager that appears is the default manager** (in the example above it is _objects_), which will be used by Django internally for other special features.

When running the manager it will return only the books that have Squarenix as company and, in addition, you can use all QuerySet methods on it.

```python
Videogame.objects.all() # Devuelve todos los videojuegos
Videogame.squarenix_videogames.all() # Devuelve solo los videojuegos de squarenix
Videogame.squarenix_videogames.filter(titulo__icontains='Kingdom Hearts') #Devuelve los videojuegos de squarenix cuyo título contenga Kingdom Hearts
```

And that's all. Now that you know that you can create as many managers as you want that will give you as many filtered searches as you need.

If you want to know more about managers, please check [the official Django documentation](https://docs.djangoproject.com/en/3.2/topics/db/managers/#?)