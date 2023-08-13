---
title: "Django Annotate and aggregate explained"
date: "2020-11-17"
categories:
- "django"
- "databases"

coverImage: "images/Django_aggregate_y_annotate.jpg"
coverImageCredits: "Credits to https://www.pexels.com/@cottonbro/"
description: "Learn the differences, features and usage of annotate and aggregate in Django in this tutorial, reading SQL with examples and code."
keywords:
- django
- python
- performance
- orm

authors:
- Eduardo Zepeda
---

The computer screen illuminated my face full of despair, I rubbed my head in despair, while I googled: "Django annotate"; one of the ORM functions that I could not understand. Did it happen to you too, I bet it did. I had already read the documentation but it didn't seem clear enough and, to top it off, I often confused it with its evil twin: aggregate. After visiting several stackoverflow questions and multiple English blogs I was able to understand them both. These notes are the result of that search, it is the explanation about annotate and aggregate in Django that I would have liked to read years ago.

This tutorial assumes you know the basics about the Django ORM, in case you don't, I have a link to a free book in my post about the [definitive Django guide](/the-definitive-guide-to-django/).

Annotate and aggregate are useful for [improving performance of slow applications in Django](/is-your-django-application-slow-maximize-its-performance-with-these-tips/)

Comparative image of the differences between Django annotate and Django aggregate] (images/DjangoAggregateAnnotate-1.png)

## Preparation

For this example we are going to create a couple of fictitious models that we will use for the examples:

Django 3.0 and Python 3.8.6 were used for this example.

```python
# app/models.py
from django.db import models

class Seller(models.Model):
    name = models.CharField(max_length=150)

class Order(models.Model):
    seller = models.ForeignKey(Seller, related_name="orders", on_delete=models.PROTECT)
    total = models.DecimalField(max_digits=18, decimal_places=9)
```

After applying the migrations, the above code will create two models: Seller and Order. A seller can have many orders. An order corresponds to a single seller and has a total, expressed in decimal numbers.

Next I will create a few data as an example. You can do it in the Django admin or directly in the database.

### Table for salesperson

|     |
| --- | --------- |
| 1   | Poe       |
| 2   | Lovecraft |
| 3   | Barker    |

### Ordering table

| Id  | Total | Seller id |
| --- | ----- | --------- |
| 1   | 100   | 1         |
| 2   | 200   | 1         |
| 3   | 300   | 2         |
| 4   | 400   | 2         |
| 6   | 600   | 3         |

Before we talk about annotate and aggregate, let's make sure we know how to get the SQL query that Django will make.

## How to convert a queryset to SQL?

You probably already know the django ORM and have used it to do database lookups. But there is something that many people ignore: **it is possible to get the query, before Django processes and executes it, by printing the query property of our querysets.

That query must have an associated query, in SQL language, which we can access by printing the query property.

```python
print(Seller.objects.all().query)
SELECT "app_seller"."id", "app_seller"."name" FROM "app_seller"
```

Knowing the query that Django will perform helps us understand what is going on behind the ORM. This will be useful to go deeper into _annotate_.

## Annotate

### Why use annotate?

We use _annotate_ **when we want to annotate each object returned from a queryset**, as if we want to add an extra property to each object in your queryset, but directly from the database.

Annotate is very useful for performing [advanced text searches using Postgres](/trigrams-and-advanced-searches-with-django-and-postgres/).

Imagine that we want to display in a Django template each seller, followed by the sum of the total of all his orders.

The crude approximation would look something like this

```python
# app/models.py
# NO HAGAS ESTO, ES INEFICIENTE

class Seller(models.Model):
    name = models.CharField(max_length=150)

    def get_order_sum(self):
        total_sum = 0
        for order in self.orders.all():
            print(self.orders.all().query)
            # Puedes verlo en la terminal
            total_sum += order.total
        return total_sum
```

To display it in HTML code, using the template system, we would call the method once for each item in our list of vendors.

```html
{% for seller in sellers_list %}
  {{ seller.get_order_sum }}
{% endfor %}
```

Without using _annotate_ in Django we would need a query for the list of sellers and an extra one for each seller, when there are 3 sellers, as here, no problem, but what if there were 100 or 200 or more? Each request is going to be very expensive in time and resources.

If you examine the queries you will see a different query for each vendor.

```bash
SELECT ••• FROM "app_seller"
# La consulta anterior es para obtener todos los vendedores
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '1'
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '2'
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '3'
```

Annotate can reduce the number of database queries and thus improve the time it takes for our server to return a response.

### How to use annotate in django?

In Django, annotate **creates an annotation for each of the elements of our queryset and returns the result as a queryset.

```python
from app.models import Seller
from django.db.models import Sum

sellers_with_orders_total = Seller.objects.annotate(orders_total = Sum('orders__total'))
print(sellers_with_orders_total.query)
SELECT "app_seller"."id", "app_seller"."name", CAST(SUM("app_order"."total") AS NUMERIC) AS "orders_total" FROM "app_seller" LEFT OUTER JOIN "app_order" ON ("app_seller"."id" = "app_order"."seller_id") GROUP BY "app_seller"."id", "app_seller"."name"
```

Look at the query, it will return each line of the database (seller) with an extra annotation called _orders_total_, or the name we have assigned to it, which corresponds to the sum of the totals of their respective orders.

The same result as before... but in a single query!

```python
sellers_with_orders_total[0].orders_total
Decimal('300')
# Los pedidos asociados a Poe suman 300
```

We could also count them, instead of adding them up.

```python
from app.models import Seller
from django.db.models import Sum, Count

sellers_with_orders_count = Seller.objects.annotate(orders_count = Count('orders'))
print(sellers_with_orders_count.query)
SELECT "app_seller"."id", "app_seller"."name", COUNT("app_order"."id") AS "orders_count" FROM "app_seller" LEFT OUTER JOIN "app_order" ON ("app_seller"."id" = "app_order"."seller_id") GROUP BY "app_seller"."id", "app_seller"."name"
```

Now, each element of the queryset will have a property called _orders_count_, which will be equal to the count of the orders it has, in this case each of the sellers has two orders.

```python
sellers_with_orders_count[0].orders_count
2
```

### Concatenate with annotate

As I mentioned at the beginning; _annotate_ returns a _queryset_, **so we can concatenate multiple annotate for a single database query.**.

```python
from app.models import Seller
from django.db.models import Sum, Count

combined_querysets = Seller.objects.annotate(orders_count = Count('orders')).annotate(orders_total = Sum('orders__total'))
print(combined_querysets.query)
SELECT "app_seller"."id", "app_seller"."name", COUNT("app_order"."id") AS "orders_count", CAST(SUM("app_order"."total") AS NUMERIC) AS "orders_total" FROM "app_seller" LEFT OUTER JOIN "app_order" ON ("app_seller"."id" = "app_order"."seller_id") GROUP BY "app_seller"."id", "app_seller"."name"
```

Notice how we use the double underscore to access the "total" property of the Order object from Sellers, as you would do in any Django queryset.

Now each item contains both its order count and order total, all in **a single database query**.

```python
combined_querysets[0].orders_total 
Decimal('300')
# El total de los pedidos de Poe suman 300
combined_querysets[0].orders_count 
2
# Poe tiene dos pedidos
```

### El error Cannot resolve keyword al usar annotate

If you combine two querysets and in one of them you have used annotate, you may not get the results you expect. This happens because you are trying to join two querysets with unequal fields.

```python
queryset_1 = Seller.objects.annotate(orders_count = Count('orders')).filter(name__startswith="Poe")
queryset_2 = Seller.objects.filter(name__startswith="Lovecraft")
# ERROR
results = queryset_2 & queryset_1
# django.core.exceptions.FieldError: Cannot resolve keyword 'orders_count' into field
```

To solve the problem you must match the querysets, so that both have the field you added with annotate.

```python
queryset_1 = Seller.objects.annotate(orders_count = Count('orders')).filter(name__startswith="Poe")
queryset_2 = Seller.objects.annotate(orders_count = Count('orders')).filter(name__startswith="Lovecraft")
# CORRECTO
results = queryset_1 & queryset_2
```

Another way to solve it would be to perform the binding to the queryset with annotate first

```python
queryset_1 = Seller.objects.annotate(orders_count = Count('orders')).filter(name__startswith="Poe")
queryset_2 = Seller.objects.filter(name__startswith="Lovecraft")
# CORRECTO
results = queryset_1 & queryset_2
```

## Aggregate

### Why use aggregate?

We use aggregate **when we want to reduce the total of a query to a single piece of data**, this data can be an average, a summation, a minimum, maximum value, etc. Aggregate allows us to process it directly from the database, without having to process the data with Python ourselves.

Imagine that we want to know the total of absolutely all the orders, to process or render it in a template later.

A rather naive approach would be to include the following code inside a function or method.

```python
from app.models import Seller

# NO HAGAS ESTO, ES INEFICIENTE
all_orders_total = 0
for seller in Seller.objects.all()
    for order in seller.orders.all()
        all_orders_total += order.total
        # ...
print(all_orders_total)
Decimal('2100.000000000')
```

The above piece of code is inefficient, again we are querying the database multiple times and processing information with Python, which is not bad, but generally a database is much more efficient.

```bash
SELECT ••• FROM "app_seller"
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '1'
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '2'
SELECT ••• FROM "app_order" WHERE "app_order"."seller_id" = '3'
```

Instead of using Python to calculate the total orders, we could instruct the database to calculate it using _aggregate_.

### How to use aggregate?

According to the above, it would be convenient to replace the above code with the following queryset. We can specify the name to be used as a key in our dictionary or let django generate it automatically. However, for this example we will name it _sum_of_all_orders_.

```python
Seller.objects.aggregate(sum_of_all_orders = Sum('orders__total'))
{'sum_of_all_orders': Decimal('2100')}
# El total sumado de todos los pedidos es 2100
```

Likewise, instead of asking it to sum up, we could ask it for an average, or a count as well, or include a _filter_ prior to the _aggregate_.

```python
total_orders = Seller.objects.aggregate(total_orders = Count('orders'))
total_orders 
{'total_orders': 6}
# Entre todos los vendedores tienen 6 pedidos
```

If we try to get the query from _aggregate_ the Python interpreter will return an error because, **unlike _annotate_, _aggregate_ returns a dictionary**, not a queryset.

```python
total_orders.query
Traceback (most recent call last):
  File "<console>", line 1, in <module>
AttributeError: 'dict' object has no attribute 'query'
```

### Concatenate aggregate at the end of the queryset

In the same way we can concatenate an _annotate_ with an _aggregate_, **as long as the aggregate is at the end of the concatenation**, because **aggregate does not return a query**.

In addition, _aggregate_ has access to the annotations we add to each element using _annotate_.

```python
from django.db.models import Avg

Seller.objects.annotate(orders_total = Sum('orders__total')).aggregate(Avg('orders_total'))
{'orders_total__avg': Decimal('700')}
# Poe 100+200=300
# Lovecraft 300+400=700
# Barker 500+600=1100
# (300+700+1100)/3 = 700
```

Notice how _annotate_ adds _orders_total_ to each element of the queryset, and then _aggregate_ uses that annotation to calculate the average using _Avg_.

If you know how to use _aggregate_ and _annotate_ correctly you can greatly reduce the number of queries to the database and thus greatly reduce the response time between each request.

Remember that if you want to go even deeper into the subject you should read [the official Django documentation](https://docs.djangoproject.com/en/3.1/topics/db/aggregation/)