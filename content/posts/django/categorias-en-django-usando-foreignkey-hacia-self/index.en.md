---
aliases:
- /en/categories-in-django-using-foreignkey-to-self/
authors:
- Eduardo Zepeda
categories:
- django
- databases
coverImage: images/DjangoCategoriasYSubcategorias.jpg
coverImageCredits: Image credits for 極道畫師 https://www.pixiv.net/en/users/7140895
date: '2022-03-30'
description: Entry about using ForeignKey or foreign key to 'self' in Django to create
  hierarchical structures or unbounded categories.
keywords:
- django
- python
- orm
title: Categories in Django using ForeignKey to self
---

Grouping by categories is quite common in web applications, from movies, courses or any other resource that presents a hierarchical relationship to another object. In Django there are different ways to model these relationships. Probably, the first that will come to your mind will be to create a _category_ object, and then relate it by means of a _ForeignKey_ with a _subcategory_.

## One subcategory or level per model

What I meant by one category or level per model is something like this:

```python
# app/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=256)
    # other properties

class SubCategory(models.Model):
    name = models.CharField(max_length=256)
    # other properties
    category = models.ForeignKey(Category, related_name="subcategories", blank=True, null=True, on_delete=models.CASCADE)
```

This approach to the hierarchy problem in Django looks good at first glance. The resulting structure will look something like this:

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745886724/coffee-bytes/category-subcategory_mtkzpy.png" class="md-local-image" alt="Subcategory model schema with ForeignKey made Category in Django" >}}

### The problem of using a model by category

This scheme will work in situations where the hierarchies do not nest very deep, but what if those subcategories have subcategories?

Imagine a horror movie category, with a ghost subcategory that, in turn, has a home ghost subcategory and this, in turn, a subcategory of type of ending.

Well, we add a _SubSubCategory_ class, don't we? But... what if those SubSubCategories have in turn subcategories. See what I'm trying to get at?

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745886985/coffee-bytes/category-subcategory-problem_bx9ymd.webp" class="md-local-image" alt="Infinite subcategories problem scheme" >}}

Every time you need to create a new subcategory you will have to create a new model in the _models.py_ file of your application. And not only that, but a new table that probably only has a few records. Is there a better approach to the problem? The [versatile Django Framework's ORM](/en/django/why-should-you-use-django-framework/) offers a pretty clean solution.

{{<ad>}}

## ForeignKey to the same model in Django

To simplify the problem of categories in Django, we create **a single model, with a property of type _ForeignKey_ or foreign key pointing to the same object; that is, to _self_**.

```python
# app/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=256)
    parent = models.ForeignKey(
        "self",
        related_name="subcategories",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
```

In this way we will have a structure similar to a graph, where each node points to another.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745887246/coffee-bytes/foreign-key-to-self-django_uvvogs.webp" class="md-local-image" alt="Schematic diagram of how ForeignKey made self(the same model) works in Django" >}}

This new arrangement allows us to create as many subcategories as we want, without the need to create new models. To do so, we simply assign the _parent_ property to the _Category_ class instance we want it to belong to.

### Accessing the same model in Django

See how the _ForeignKey_ does _self_ in practice:

```python
from my_app.models import Category
parent = Category.objects.create(name="Programming languages")
subcategory = Category.objects.create(name="Python")
subcategory.parent = parent
# save it in the database
subcategory.save()
```

I explain what happens. First we create a main category, and a subcategory. Later, we assign the property _parent,_ of this last one, to the main category. And ready, we save.

Finally, let's create a sub-subcategory for our subcategory

```python
subsubcategory = Category.objects.create(name="Django")
subsubcategory.parent = subcategory
subsubcategory.save()
```

Notice how we have created another sub-subcategory (called Django), which comes from the same model we used in the other two. To assign it to a category, we match its _parent_ property to the subcategory we created (named Python).

As you have already seen, a single model allows us to add as many subcategories as we want.

### Access to subcategories

If we examine the parent category, which we created previously, we will notice that it has a list of subcategories, among which our subcategory (Call Python) is already included.

We can access it as we would any other many-to-one relationship.

```python
parent.subcategories.all()
<QuerySet [<Category: Category object (2)>]>
parent.subcategories.all()[0].name
'Python'
```

### Go from subcategories to categories

On the other hand, if we want to go "in reverse" from the most nested category to the least nested, we simply go through it; we access the parent, and then the parent of the next instance, and so on as many nestings as we need.

```python
subcategory.name
'Django'
subcategory.parent.name
'Python'
subcategory.parent.parent.name
'Programming languages'
```

## Other resources

* [Official documentation on the ForeignKey to self](https://docs.djangoproject.com/en/4.0/ref/models/fields/)