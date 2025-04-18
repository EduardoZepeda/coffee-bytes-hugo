---
title: Differences between select_related and prefetch_related in Django
date: "2022-03-09"
categories:
- django
- databases
coverImage: "images/django-select-related-prefetch-related.jpg"
description: Speed up your database queries by understanding the differences, use cases and SQL between select_related and prefetch_related in django
coverImageCredits: "Image credits to ときわた: https://www.pixiv.net/en/users/5300811"
keyword: differences between select_related and prefetch_related
keywords:
- django
- python
- performance
- orm
- select_related
- prefetch_related

authors:
- Eduardo Zepeda
---

The *select_related* and *prefetch_related* methods **are used to reduce the number of queries made to the database**. This translates into response time for each view. In addition, using these methods is one of the [actions to implement to improve the performance of a Django application](/en/how-to-scale-a-django-app-to-serve-one-million-users/)

Just consider that there are more [important things to optimize other than your app's performance](/en/dont-obsess-about-your-web-application-performance/), but if you insist, dive into annotate and aggregate, and be careful with the nested subqueries of annotate because [they can make your django queries go really slow](/en/fix-slow-queries-in-django-when-using-annotate-and-subqueries/)

## Differences between select_related and prefetch_related summarized

|                   | select_related            | prefetch_related |
| ----------------- | ------------------------- | ---------------- |
| Relationship      | Foreign key or One to One | Many to Many     |
| Number of queries | 1                         | 2                |
| Union of objects  | Directly by SQL           | Using Python     |

{{<ad>}}

## select_related

The *select_related* method is **used to follow a relationship of type ForeignKey or OneToOneField to the respective objects it points to and obtain them.**.

When using *select_related* we will have a longer query, however, the advantage is that it will no longer be necessary to access the database again to obtain the objects of the related model.

![Simplified diagram of how Django select_related works](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o3xcx7ifog76559fy4lo.png)

Simplified diagram of how select_related works

Consider this example:

```python
from django.db import models

class Main(models.Model):
    name = models.CharField(max_length=256)

class Derivative(models.Model):
    name = models.CharField(max_length=256)
    main = models.ForeignKey(
        "Main", related_name="derivatives", on_delete=models.CASCADE
    )
```

If we try to access the object pointed to by the Foreign Key relationship, a new database query will be generated. *select_related* avoids that extra query for each object.

```html
{% for object in queryset %}
    <p>{{object.name}}</p>
    <small>{{object.main.name}}</small>
{% endfor %}
```

For example, if we have three Derived objects related to a single main object:

* A main query that retrieves all objects Derivative
* Three queries, exactly the same, one for each time we access the main object from the Derived object.

### Use in a query

To use *select_related* we call it from our query, passing it the name of the field that corresponds to our relationship with the other model.

```python
Derivative.objects.select_related("main")
```

### Internal operation of select_related

How *select_related* works internally, *select_related* replaces multiple queries being performed by a single INNER JOIN at the database level:

```sql
SELECT my_app_derivative.id,
       my_app_derivative.name,
       my_app_derivative.main_id
  FROM my_app_derivative

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 WHERE my_app_main.id = '1'

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 WHERE my_app_main.id = '1'

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 WHERE my_app_main.id = '1'
```

This reduces multiple SQL queries to a single, longer query.

```sql
SELECT my_app_derivative.id,
       my_app_derivative.name,
       my_app_derivative.main_id,
       my_app_main.id,
       my_app_main.name
  FROM my_app_derivative
 INNER JOIN my_app_main
    ON (my_app_derivative.main_id = my_app_main.id)
```

## prefetch_related

If the *select_related* method retrieves a single object from a single relationship field, **the *prefetch_related* method is used when we have a multiple relationship with another model**, i.e. a relationship of type _ManyToMany_ or a reverse _ForeignKey_.

![Simplified diagram of how Django prefetch_related works](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgyuop69qpmie1b0cgzj.png#?)

Simplified diagram of how prefetch_related works

Consider this example, note the _ManyToManyField_ field towards the _Main_ model.

```python
from django.db import models

class Main(models.Model):
    name = models.CharField(max_length=256)

class ManyToManyModel(models.Model):
    name = models.CharField(max_length=256)
    ManyToManyRel = models.ManyToManyField("Main", related_name="multiples")
```

If we access the field that represents the multiple relation of our object, without using *prefetch_related*, we will be impacting the database with a new query.

```html
{% for object in queryset %}
    <p>{{object.name}}</p>
    {% for main in object.ManyToManyRel.all %}
      <!-- New query each iteration -->
      <p><small>{{main.name}}</small></p>
    {% endfor %}
{% endfor %}
```

### Use in a query

To use the *prefetch_related* method call it at the end of our query, choosing the field that represents the many-to-many relationship in our object.

```python
queryset = ManyToManyModel.objects.prefetch_related("ManyToManyRel")
```

### Inner workings of prefetch_related

How does _prefecth_related_ work internally? The ***prefetch_related* method replaces the multiple SQL queries by only 2 SQL queries: one for the main query and the other for the related objects, then it will join the data using Python**.

```sql
SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 INNER JOIN my_app_manytomanyrel_main
    ON (my_app_main.id = my_app_manytomanyrel_main.main_id)
 WHERE my_app_manytomanyrel_main.manytomanyrel_id = '1'

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 INNER JOIN my_app_manytomanyrel_main
    ON (my_app_main.id = my_app_manytomanyrel_main.main_id)
 WHERE my_app_manytomanyrel_main.manytomanyrel_id = '2'

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 INNER JOIN my_app_manytomanyrel_main
    ON (my_app_main.id = my_app_manytomanyrel_main.main_id)
 WHERE my_app_manytomanyrel_main.manytomanyrel_id = '3'

SELECT my_app_main.id,
       my_app_main.name
  FROM my_app_main
 INNER JOIN my_app_manytomanyrel_main
    ON (my_app_main.id = my_app_manytomanyrel_main.main_id)
 WHERE my_app_manytomanyrel_main.manytomanyrel_id = '4'
```

The multiple queries above are reduced to only 2 SQL queries.

```sql
SELECT my_app_manytomanyrel.id,
       my_app_manytomanyrel.name
  FROM my_app_manytomanyrel

SELECT (my_app_manytomanyrel_main.manytomanyrel_id) AS *prefetch_related*val_manytomanyrel_id,
       my_app_main.id,
       my_app_main.name
  FROM my_app_main
 INNER JOIN my_app_manytomanyrel_main
    ON (my_app_main.id = my_app_manytomanyrel_main.main_id)
 WHERE my_app_manytomanyrel_main.manytomanyrel_id IN ('1', '2', '3', '4')
```

## Other related resources

* [¿What's the difference between select_related and prefetch_related in django IRM?](https://stackoverflow.com/questions/31237042/whats-the-difference-between-select-related-and-prefetch-related-in-django-orm)
* [Select related vs Prefecth related](https://buildatscale.tech/select_related-vs-prefetch_related/)
* [API Queryset reference](https://docs.djangoproject.com/en/dev/ref/models/querysets/)