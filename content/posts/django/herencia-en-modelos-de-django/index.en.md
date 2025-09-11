---
aliases:
- /en/understand-inheritance-types-in-django-models/
authors:
- Eduardo Zepeda
categories:
- django
- databases
coverImage: images/HerenciaModelosDjango.jpg
coverImageCredits: credits https://www.pexels.com/es-es/@elifskies-53441403/
date: '2020-09-21'
description: 'I explain three types of inheritance in Django models: abstract, multi-table
  and proxy, as well as their characteristics and syntax.'
keywords:
- django
- python
- oop
- orm
title: Understand inheritance types in Django models
---

Sometimes, when we create Models in Django we want to give certain characteristics in common to several of our models. Probably, the first approach that would come to our mind would be to repeat the fields over and over again. This would bring us two problems; first, we are repeating information; second, if we want to add another field in common we will have to modify each of the models. This problem is solved by Django's model inheritance.

```python
# Notice how multiple fields repeat in both models
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

# 
```

## Inheritance types in Django

There are three types of inheritance available and each behaves differently at the table level:

* Abstract
* Multi table
* Proxy

For this example I will be using Django version 3.1 and Python 3.7.

{{<ad1>}}

## Abstract Inheritance

This type of inheritance allows us to put a variety of fields in common that we want the models that inherit from it to include. To define a model as Abstract just add the _Meta_ class containing an attribute called _abstract_ equal to _True_. **Django will not create any table** for a model with _Meta.abstract = True_.

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

In the example above both models will include the _modified_ and _created_ fields, however **Django will not create any tables** for the _BasicData_ model.

## Multi Table Inheritance

In this type of inheritance Django **will create a table for each model** (that's why it's called multi-table). It will also join both models automatically by means of an _OneToOneField_ field in the child model.

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

In the example above we may be interested in having both models, we can filter by Place and then we can access the child by its one to one relationship **using its lower case model name**.

```python
myFavoriteCafe = Place.objects.get(name="Matraz cafe")
print("Matraz Cafe has {} employees".format(myFavoriteCafe.cafe.number_of_employees))
```

## Proxy inheritance

This type of inheritance is used to change or extend the behavior of a model. To create it just add the _Meta_ class with the _proxy_ attribute equal to _True_. In this case both models are in the same table and we can create, access, update or delete data using any of its models.

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

In the example above we have a new model that defines a default ordering by means of the ordering attribute. That is, assuming we had a table with data we could access the same data from the Django ORM.

```python
from app.models import BaseProduct, OrderedContent

# Same data, default order
BaseProduct.objects.all()
<QuerySet [<BaseProduct: Eternal sunshine of a spotless mind created at 21:59>, <BaseProduct: Arrival created at 22:00>, <BaseProduct: The imitation game created at 22:01>]>

# same data, reversed orded
OrderedContent.objects.all()
<QuerySet [<OrderedContent: The imitation game created at 22:01>, <OrderedContent: Arrival created at 22:00>, <OrderedContent: Eternal sunshine of a spotless mind created at 21:59>]>
```

As you can see we were able to access the same three database objects **from both models**, with the difference that in the _OrderedContent_ model our objects appear sorted in descending order with respect to the _created_ field.

If you want to know more about Django, I can recommend some books. Read my [review of two scoops of django](/en/django/the-best-django-book-two-scoops-of-django-review/), a great book that teaches you good Django Framework practices.