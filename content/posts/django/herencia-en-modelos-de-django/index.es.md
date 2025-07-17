---
aliases:
- /herencia-en-modelos-de-django
- /comprende-los-tipos-de-herencia-en-modelos-de-django
- /es/comprende-los-tipos-de-herencia-en-modelos-de-django/
authors:
- Eduardo Zepeda
categories:
- django
- bases de datos
coverImage: images/HerenciaModelosDjango.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@elifskies-53441403/
date: '2020-09-21'
description: 'Te explico tres tipos de herencia en modelos Django: la abstracta, multi
  tabla y proxy, así como sus características y sintaxis.'
keywords:
- django
- python
- oop
- orm
title: Comprende los tipos de herencia en modelos de Django
---

A veces, cuando creamos Modelos en Django queremos darle ciertas características en común a varios de nuestros modelos. Probablemente, la aproximación que se nos vendría primero a la mente sería repetir los campos una y otra vez. Lo anterior nos traería dos problemas; el primero, estamos repitiendo información; el segundo, si queremos agregar otro campo en común tendremos que modificar cada uno de los modelos. Esta problemática es la que resuelve la herencia de modelos de Django.

```python
# Nota como se repiten múltiples campos en los dos modelos
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    manufacter = models.ForeignKey(Manufacter, on_delete=models.CASCADE)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

class Manufacturer(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

# ... otros diez modelos con los mismos campos abajo
```

## Tipos de herencia en Django

Hay tres tipos de herencia disponible y cada uno se comporta de manera diferente a nivel tabla:

- Abstracta
- Multi tabla
- Proxy

Para este ejemplo estaré usando la versión de Django 3.1 y Python 3.7

{{<ad>}}

## Herencia Abstracta

Este tipo de herencia nos permite poner una variedad de campos en común que deseamos que incluyan los modelos que hereden de este. Para definir un modelo como Abstracto basta con agregar la clase _Meta_ que contenga un atributo llamado _abstract_ igual a _True_. **Django no va a crear ninguna tabla** para un modelo con _Meta.abstract = True_.

```python
from django.db import models

class BasicData(models.Model):
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Product(BasicData):
    name = models.CharField(max_length=150)
    description = models.TextField()

class ShippingMethod(BasicData):
    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.PositiveIntegerField()
```

En el ejemplo de arriba ambos modelos incluirán los campos de _modified_ y _created_, sin embargo **Django no creará ninguna tabla** para el modelo _BasicData_.

## Herencia Multi Tabla

En este tipo de herencia Django **sí creará una tabla por cada modelo** (por eso se llama multi tabla). Además unirá ambos modelos automáticamente por medio de un campo _OneToOneField_ en el modelo hijo.

```python
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

class Cafe(Place):
    number_of_employees = models.IntegerField()
    speciality_coffee_available = models.BooleanField(default=False)
```

En el ejemplo de arriba puede que nos interese tener ambos modelos, podemos filtrar por Place y luego podemos acceder al hijo por medio de su relación uno a uno **usando su nombre de modelo en minúsculas.**

```python
myFavoriteCafe = Place.objects.get(name="Matraz cafe")
print("Matraz Cafe has {} employees".format(myFavoriteCafe.cafe.number_of_employees))
```

## Herencia proxy

Este tipo de herencia se usa para cambiar o extender el comportamiento de un modelo. Para crearlo basta con añadir la clase _Meta_ con el atributo _proxy_ igual a _True_. En este caso ambos modelos se encuentran en la misma tabla y podemos crear, acceder, actualizar o borrar los datos usando cualquiera de sus modelos.

```python
from django.db import models

class BaseProduct(models.Model):
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return "{} created at {}".format(self.name, self.created.strftime("%H:%M")) 

class OrderedContent(BaseProduct):
    class Meta:
        proxy = True
        ordering = ['-created']

```

En el ejemplo de arriba tenemos un nuevo modelo que define un ordenado predeterminado por medio del atributo ordering. Es decir, suponiendo que tuviéramos una tabla con datos podríamos acceder a los mismos datos a partir del ORM de Django.

```python
from app.models import BaseProduct, OrderedContent

# Mismos datos, orden predeterminado
BaseProduct.objects.all()
<QuerySet [<BaseProduct: Eterno resplandor de una mente sin recuerdos created at 21:59>, <BaseProduct: Arrival created at 22:00>, <BaseProduct: The imitation game created at 22:01>]>

# Mismos datos, orden inverso
OrderedContent.objects.all()
<QuerySet [<OrderedContent: The imitation game created at 22:01>, <OrderedContent: Arrival created at 22:00>, <OrderedContent: Eterno resplandor de una mente sin recuerdos created at 21:59>]>
```

Como puedes ver pudimos acceder a los mismos tres objetos de la base de datos **desde ambos modelos**, con la diferencia de que en el modelo _OrderedContent_ nuestros objetos aparecen ordenados descendentemente con respecto al campo _created_.

Sí quieres saber más sobre Django, puedo recomendarte algunos libros. Lee mi [reseña sobre two scoops of django](/es/django/el-mejor-libro-de-django-resena-de-two-scoops-of-django/), un libro genial que te enseña buenas prácticas Django Framework.