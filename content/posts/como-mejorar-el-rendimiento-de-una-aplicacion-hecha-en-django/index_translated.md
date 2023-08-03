---
title: "Is your Django application slow? Maximize its performance with these tips"
date: "2020-12-30"
categories:
* "software architecture" * "django" * "django
* "django

coverImage: "images/Improve-your-app-performance-django.jpg"
coverImageCredits: "credits https://www.pexels.com/es-es/@tranmautritam/"
description: "Maximize the performance of your app made in Django with this compilation of tips ranging from your queries, to caching, to alternative frameworks."
keywords:
* performance
* django
* python
* opinion

authors:
- Eduardo Zepeda
---

Is your Django application or your company's application running slow? This can have multiple
have multiple causes: a server with insufficient hardware, a hosting package that needs an upgrade to
hosting package that needs an upgrade to process more traffic, a badly configured server (in case it's nginx, see my
configured server (in case it's nginx, visit my post where I explain [how to configure
how to configure nginx for better performance)](/nginx
performance)](/nginx-keepalive-gzip-http2-better-performance-on-your-web-site/), or
simply an application that is not optimized for maximum performance in
django.

In this post I explain some changes that you can implement, in one
Django application to improve its performance.

## Reduce slow queries in Django

As you know, access to the database is often the bottleneck for the
most applications. **The most important action to take is to reduce the number of queries and the impact of each of them.
number of queries and the impact of each one of them**. You can reduce the impact
of your queries by 90%, and I am not exaggerating.

It is quite common to write code that occasions multiple queries to the database.
and quite expensive searches.

Identify what queries are being made in your application using
[django-debug-toolbar](https://github.com/jazzband/django-debug-toolbar) and
reduce them, or make them more efficient:

**select_related()** to [avoid multiple searches on relations type
foreign key or one-to-one](/differences-between-select_related
one](/differences-between-select_related-and-prefetch_related-in-django/)
** **prefetch_related()** to prevent excessive searches on many-to-many or many-to-one relations
to many or many to one
** ** **django_annotate()** to add information to each object in a query.
query. I have a post where I explain [the difference between annotate and
aggregate](/django-annotate-and-aggregate-explained/)
* **django_aggregate()** to process all the information of a single query
into a single data (summation, averages).
** **Object Q** to join queries by OR or AND directly from the database.
database
* F-Expressions** to perform operations at the database level rather than in Python code.
in Python code

Django debug tool bar showing SQL queries from a request in
Django](images/django-debug-tool-bar-numero-queries.png "Django debug tool bar
showing the SQL queries of a request in Django ")

Example of use with _select_related_.

```python
# review/views.py
from .models import Review

def list_reviews(request):
    queryset = Review.objects.filter(product__id=product_id).select_related('user') 
    # Ahora no se tocará la base de datos cada que se use review.user
    # ...
```

## Configure gunicorn correctly

Gunicorn is the most widely used Python WSGI HTTP server for Django applications.
But it is not asynchronous, consider combining it with one of its counterparts
asynchronous counterparts: hypercorn or uvicorn. The latter implements gunicorn workers.

### Configure gunicorn correctly

Make sure you are using the correct gunicorn workers, according to the
number of cores of your processor. They recommend setting the workers to
(2 x number of cores) + 1. According to the documentation, **with 4-12 workers you can serve from hundreds to
serve from hundreds to thousands of requests per second**, so it should be enough for a web site of scale.
be enough for a medium to large scale web site.

## Improve the performance of your serializers

If you use DRF and use its generic classes to create serializers, you might not be able to
you may not be getting exactly the best performance. The generic classes for
serializers perform data validation, which can be quite time-consuming if you're only reading data.
time if you are only going to read data.

Even if you remembered to mark your fields as read_only, the DRF serializers will not be able to read them.
serializers aren't the fastest, you may want to check out
[Serpy](https://serpy.readthedocs.io/en/latest/),
[Marshmallow](https://marshmallow.readthedocs.io/en/stable/) The topic is quite broad, but stay with the
but stay with the idea that there is an important area of improvement in Django serializers.
serializers.

I leave you with this article that explains [how some developers managed to reduce the
the time cost of serialization by 99%]().
99%](https://hakibenita.com/django-rest-framework-slow)

## Use pagination in your views

It probably sounds pretty obvious, but I still feel I should mention it: you don't need to return a whole table from a database if your user only
you don't need to return an entire database table if your user only finds the first few records useful.
only the first few records are useful to your user.

Uses the _paginator_ object provided by Django, or limits the results of a
search to a few.

DRF also has an option for [paginating your
results](https://www.django-rest-framework.org/api-guide/pagination/),
check it out.

```python
# review/views.py
from django.views.generic import ListView
from .models import Review

class ReviewList(ListView): 
    model = Review 
    paginate_by = 25
    context_object_name = 'review_list'
```

## Use indexes in your models

Understand your more complex queries and try to create indexes for them. The index will
will make your Django searches faster, but it will also slow down, slightly,
and updates of new information, as well as taking up a bit more space in your database.
more space in your database. Try to strike a healthy balance between
speed and storage space used.

```python
from django.db import models

class Review(models.Model):
    created = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )
```

## Use indexes for your searches

If your application makes intensive use of information searches,
consider using an [efficient search engine, such as
Solr](/search-with-solr-with-django-haystack/), rather than implementing the code yourself.
code yourself.

There are many options available:

* ElasticSearch
* Solr
* Whoosh
* Xapian

## Remove unused middleware

Each middleware involves an extra step in every web request, so removing
those middlewares that you do not use will mean a slight improvement in the speed of your
response speed of your application.

Here are some common middleware that are not always used, the one from
messages, flat pages and localization, no, I don't mean geographic location, but to translate the
geographic, but the one to translate the content according to the local context.

```python
MIDDLEWARE = [
    # ...
    'django.contrib.messages.middleware.MessageMiddleware', 
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
    'django.middleware.locale.LocaleMiddleware'
]
```

## Caching in Django

When the response time of your application becomes a problem, you should
start caching all the time- and resource-consuming results.

Would you like to dig deeper into the cache system, I have a post about [caching
in django](/cache-en-django-rest-framework-with-memcached/) which you can check out
to go deeper.

If your site has too many models, and they rarely change, it makes no sense
to access the database each time to request them with each new HTTP request.
HTTP REQUEST. Just put the response of that request in cache and your response time will improve.
response time will improve, this way every time the same content is requested, it won't be necessary to make a new request or
will not be necessary to make a new request or calculations to the database, but the value will be returned directly from memory.
value will be returned directly from memory.

Among the options available are:

* Memcached
* Redis
* Database cache
* File system cache

```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}
```

The django cache is configurable on many, many levels, from the entire site
to views or even small pieces of information.

```python
# myapp/views.py
from django.shortcuts import render
from django.views.decorators.cache import cache_page

@cache_page(60*15)
def my_view(request):
    return render(request, 'myapp/template.html', {
        'time_consuming_data': get_time_consuming_data()
    })
```

Please note that **memory-based caching (memcached, redis) is a method
all cache will disappear if the system is restarted or shut down.
reboot or shutdown.

## Uses Celery for asynchronous tasks

Sometimes the bottleneck is the responsibility of third parties. When you send an
email or request information from a third party, you have no way of knowing how long your request will take, a slow connection or an
slow connection or an overloaded server can keep you waiting for a response.
can keep you waiting for a response. There is no point in keeping the user
waiting dozens of seconds for an email to be sent, send them back a reply and transfer the
a response and transfer the email to a queue to be processed later.
to be processed later. [Celery](https://docs.celeryproject.org/en/stable/) is the most popular option to do this.
most popular option for doing this.

No idea where to start, I've got a couple of posts where I explain [how to
how to run asynchronous tasks with celery and django.
django](/celery-and-django-for-running-asynchronous-tasks/)

```python
# myapp/views.py
from celery import shared_task

@shared_task
def send_order_confirmation(order_pk):
    email_data = generate_data_for_email(order_pk)
    send_customized_mail(**email_data)
```

## Partition the tables in your database

When your tables exceed millions of records, every lookup will traverse the
database, taking a lot of time in the process. How could we solve this?
How could we solve this? by splitting the tables into parts so that each search is done on one of the
for example, a table for data from a year ago (or whatever period you prefer).
one table for data from one year ago (or whatever period you prefer), another one for data from two years ago, and so on until the first
and so on up to the first data.

The instructions for implementing partitioning depend on the database
you are using. If you are using postgres this feature is only available for Postgres versions higher than 10.
for Postgres versions higher than 10. You can use
[django-postgres-extra](https://django-postgres-extra.readthedocs.io/en/master/table_partitioning.html)
to implement those extra features that are not found in the
django ORM.

The implementation is too extensive and would require a full entry. There is an excellent
excellent article that explains how to implement [partitioning
Postgresql partitioning in
Django](https://pganalyze.com/blog/postgresql-partitioning-django)

Consider also looking into database replicas for reading files, depending on the architecture of your application, you can implement multiple replicas for reading and a master for writing. This approach is a whole topic and is beyond the scope of a short post, but now you know what to look for.

## Use a CDN (Content Delivery Network)

Serving images and static files can hamper the important part of your
application; generating dynamic content. You can delegate the task of serving
static content to a content delivery network (CDN).
to a content delivery network (CDN).

In addition to benefiting from the geographic locations of the CDNs; a server
in the same country (or continent) as your user will result in a faster response.
faster.

There are many CDN options available, among the most popular choices are
are AWS, [Azure](/exam-of-certification-azure-azure-az-900-my-experience/),
Digital Ocean, Cloud Flare, among others.

## Denormalization

Sometimes there are quite costly runtime queries that could be used in the future.
be solved by adding redundancy, repeated information. For example, imagine that
you want to return the number of products that have the phrase "for children" on your home page, run a query
query that searches for the word and then executes a count is fairly straightforward.
count is pretty straightforward. But what if you have 10,000 or 100,000 or 1,000,000 products?
products, every time you want to access the count value, your database will go through the whole table and
will go through the entire table and count the data.

Instead of performing a count, you could save that number in the database or
in memory and return it directly, to keep it up to date you could use a periodic count or increment it with each
a periodic count or increment it with each addition.

Of course this brings the problem that you now have more data to maintain,
not coupled together, so **you should only use this option to solve your Django performance problems if you've exhausted the other options**.
your performance problems in Django if you've already exhausted the other options.** **you should only use this option to solve your performance problems in Django if you've already exhausted the other options.

```python
count = my_model.objects.filter(description__icontains="para niños").count() 
# ... denormalizando
count = my_count.objects.get(description="para niños") # Cada fila del modelo my_count contiene una descripción y el total de resultados
total_count = count.total
```

## Review the impact of third-party plugins

Sometimes our website works almost flawlessly, but plugins and
third-party plugins, such as the case of facebook analytics tools, google,
social media chat integrations plugins affect the performance of our application.
our application. Learn how to delay their loading or modify them to reduce their impact, using async
their impact, using async, defer or other HTML attributes, in combination with
Javascript.

If the above is impossible, evaluate alternatives or consider eliminating them.

## Consider using another interpreter to improve django performance

It's not all about the database, sometimes the problem is in the Python code itself.
itself.

In addition to the normal Python interpreter, the default Python interpreter offered in the
Python official website, there are other interpreters that are sure to give you better performance.
performance.

[Pypy](https://www.pypy.org/) is one of them, it is in charge of optimizing Python code by analyzing the type of
type of objects that are created with each run. This option is ideal for
applications where Django is commissioned to return an outcome that was processed
primarily using Python code.

But it's not all wonderful; third-party interpreters, including
pypy, are usually not 100% compatible with all Python code, but with most of it.
Python code, but they do support most of it, so, just like the previous option.
**Using a third-party interpreter should also be one of the last options you consider to solve your problem.
you consider to solve your Django performance problem.

## Write bottlenecks in a low-level language with Swig

If you have tried all of the above and you still have an application with
you are probably squeezing too much out of Python and need the speed of another language.
speed of another language. But don't worry, you don't have to redo your entire application in C or C++.
application in C or C++. [Swig](http://www.swig.org/) lets you create modules in
C, C++, Java, Go or other lower level languages to import them directly from Python.
directly from Python.

Do you want to know how much difference there is between Python and a compiled language?
in my post [Python vs Go I compare the speed of both languages](/python-vs-go-2022-which-is-the-best/).
languages](/python-vs-go-2022-which-is-the-best/)

If you have a bottleneck caused by some very expensive mathematical calculation,
that highlights Python's lack of speed as an interpreted language, you may want to rewrite the bottleneck in some
interpreted language, you may want to rewrite the bottleneck in some low-level language and then
low-level language and then call it using Python. This way you will have
the ease of use of Python with the speed of a low-level language.

## ORMs and alternative frameworks

Depending on the progress of your application, you may want to migrate to a different
framework faster than Django. Django's ORM is not exactly the fastest one
and, at the time of writing, it is not asynchronous. You might want to
you might want to consider giving a try to
[sqlalchemy](https://www.sqlalchemy.org/), [ponyorm](https://ponyorm.org/).

Or, if your application is not very complex at the database level, you might want to
write your own sql queries and combine them with some other framework.

The current trend is to separate frontend from backend, therefore Django is
being used in conjunction with the Django Rest Framework to create APIs, so if you plan to create an API
your plans include the creation of an API, you might want to consider FastAPI.
FastAPI, if you don't know it, take a look at my post where I explain [the basics of FastAPI.
FastAPI basics](/python-fastapi-the-best-fast-framework-of-python/)

## Bonus: applications with more than 63 000 models

There is a talk given at the djangocon2019 where the speaker explains how to
managed to deal with an application with 63000 endpoints, each with different permissions.
permissions.

<iframe src="https://www.youtube.com/embed/O6-PbTPAFXw" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen width="560" height="315" frameborder="0"></iframe>

## Bonus: Technical blogs

Pinterest and Instagram are two gigantic sites that started out by choosing Django
as their backend. You can find information about optimization and very specific
specific problems in their technical blogs.

The instagram blog has a post called [Web Service efficiency at.
Instagram with
Python](https://instagram-engineering.com/web-service-efficiency-at-instagram-with-python-4976d078e366),
where they explain some of the problems they encounter when handling 500 million
users and how to solve them.

Here are the links to the blogs below:

* [Pinterest engineering](https://medium.com/pinterest-engineering)
* Ingeniería de Instagram](https://instagram-engineering.com/)