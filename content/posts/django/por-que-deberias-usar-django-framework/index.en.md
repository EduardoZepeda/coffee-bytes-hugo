---
aliases:
- /en/why-should-you-use-django-framework/
authors:
- Eduardo Zepeda
categories:
- django
- opinion
coverImage: images/Django-usar.jpg
coverImageCredits: credits https://www.pexels.com/es-es/@weekendplayer/
date: '2021-03-24'
description: Is Django worth using in a world where everything is JavaScript? Enter
  to learn about the advantages and disadvantages of this Python framework.
keywords:
- drf
- django
- python
- opinion
title: Why should you use Django Framework?
---

Why to use Python Framework like Django in a world where everything is Javascript? Is it really worth learning such framework in an ecosystem that insists on Frameworks written in Javascript? Well, I think so, and here are some of the reasons why you should use Django. And, in order not to lose objectivity, I will talk about the advantages as well as the disadvantages; you know that no solution is perfect.

## Is django a backend framework or a frontend framework?

Django is a full-stack framework that can be used solely for backend. What makes it a full-stack framework is that it has a template engine with its own syntax, able to generate HTML on the fly, but it's completely optional, you can configure it to serve only JSON or any other type of API response you want and use React, Vue, Jquery, or whatever you want, on the frontend instead.

## Advantages and disadvantages of Django TLDR
- Disadvantages of Django
  - Django is a monolith
  - Django is slow
  - Django's learning curve is high
  - Django's ORM is not asynchronous
  - Django requires you to know Python in addition to Javascript
- Advantages of Django
  - Django's ORM is very complete
  - Most security issues are solved
  - Authentication, messaging, caching, permissions, admin panel, form handling, i18n included
  - Stable, mature framework with a long track record
  - Allows to iterate and create MVPs very fast in startups
  - Perfect to combine with Machine Learning
  - 
If you want to delve into one in particular read on.

{{<ad>}}

## The advantages of Django

Django is a *batteries included* framework, that covers practically all the needs of an interactive website, from protection against the most common attacks such as SQL injection, CSRF, XSS, COOP. Furthermore, it offers form validation in the backend, caching, i18n, messages, flatpages and practically a solution to all common problems that arise when developing a medium or large website.

If you're one of those developers who love **getting shit done without having to reinvent the wheel** over and over again, you're going to love Django. 

### Its ORM is simple and wonderful

Django's ORM abstracts away the need to write SQL queries to create tables and query data. It is quite intuitive to use and has almost all the most common queries included in its code. From filtering, partitioning, joins and even [advanced Postgres lookups]({{< ref path="/posts/django/trigramas-y-busquedas-avanzadas-con-django-y-postgres/index.md" lang="en" >}}) functions and migration handling.

To create a table in the database just create a class that inherits from _models.Model_ and Django will do all the heavy lifting.

```python
class Review(models.Model):
    title = models.CharField(max_length=25)
    comment = models.TextField()
    name = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        get_user_model(), related_name="reviews", null=True, on_delete=models.SET_NULL)
```

The following model is equivalent to the following SQL statement:

```sql
BEGIN;
--
-- Create model Review
--
CREATE TABLE reviews_review (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, title varchar(25) NOT NULL, comment text NOT NULL, name varchar(20) NOT NULL, created datetime NOT NULL, modified datetime NOT NULL, user_id integer NULL REFERENCES auth_user (id) DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX reviews_review_user_id_875caff2 ON reviews_review (user_id);
COMMIT;
```

In addition to the above, its ORM supports multiple databases, so switching database engines is quite simple and after a few changes you can migrate seamlessly from Postgres to MySQL or vice versa, just by changing a couple of lines in the configuration. Saving you from having to write SQL by hand, as you would do in [migrations from another language, such as go](/en/go/go-migration-tutorial-with-migrate/).

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': '/path/to/my.cnf',
        },
    }
}
```

Its only disadvantage is its speed, as it falls short of alternatives such as sqlAlchemy, or [tortoise-orm](/en/fastapi/python-tortoise-orm-integration-with-fastapi/).

### Administrator panel included

Django has the [django admin panel](/en/django/the-django-admin-panel-and-its-customization/), an administration panel that is installed by default. This admin implements a CRUD to the database in a simple way. And, in addition, it has a solid permissions system to restrict access to the data as you want.

{{< figure src="images/Django-panel-admin.png" class="md-local-image" alt="Django admin panel" >}}

### Offers security against the most common attacks

Django includes certain utilities, which are responsible for mitigating most attacks such as XSS, XSRF, SQL injections, Clickjacking and others. Most of them are already available and you just need to add the corresponding middleware or template tag.

```python
<form method="post">{% csrf_token %}
```

### User management included

Most applications require a user management system, you know, register them, activate them, log them in, password recovery, well, Django already includes all of the above by default, even decorators to restrict views for authenticated users.

#### Authentication tested, including with JWT.

This framework has a proven authentication system based on sessions that are identified by a cookie. The authentication system has already been tested numerous times by some of the most trafficked websites out there, such as Instagram or the NASA website. Pinterest started with Django but moved to node.

You can use cookie authentication, session authentication or there are packages that allow you to use it with JWT. By the way, I have a post where I explain how to [authenticate a user using JSON Web token JWT in Django Rest Framework](/en/django/django-rest-framework-and-jwt-to-authenticate-users/). I also wrote another one explaining why [some consider this is not a good idea](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/#?).

#### Django's permission system

Django has a robust [permissions and groups system]({{< ref path="/posts/linux/permisos-en-gnu-linux-y-el-comando-chmod/index.md" lang="en" >}}) that binds your users to models in the database that you can start using with just a few lines of code.

### Multiple packages

Django has a lot of packages to solve most common problems, and they are community-monitored and community-improved packages, which guarantees impressive quality.

Just to name a few:

* [Django-haystack]({{< ref path="/posts/django/solr-en-django-con-haystack/index.md" lang="en" >}})(For searches
complex)
* Django-watson (Searches)
* DRF (REST)
* Graphene (Graphql)
* Django-rest-auth (Authentication)
* Django-allauth (Authentication)
* Django-filter (Search)
* Django-storage (AWS storage)
* Django-braces (Common functions)

Among all of them I would like to highlight **DRF (Django Rest Framework) which makes [creating a REST API](/en/software-architecture/basic-characteristics-of-an-api-rest-api/), handling permissions and [throttling](/en/software-architecture/throttling-on-nginx/), a simple task**, compared to creating everything from scratch.

Another package to highlight that allows you to work with websockets, to create an [application that communicates with the server in real time, through events, is django-channels](/en/django/django-channels-consumers-environments-and-events/).

### Out of the box caching system

[Django has a robust cache system](/en/django/caching-in-django-rest-framework-using-memcached/) that ranges from full site caching to even more granular level caching of SQL query results. Compatible with memcached, redis and others.

### One time messages out of the box system

Django has a session-based message system that allows you to show the user messages that will expire after being viewed, all this just by adding the corresponding middleware.

### i18n system included

Django has a system for multilingual out of the box sites, based on po and mo files, along with gettext, totally ready to use and without having to install anything.

### Form handling and validation

Django has a system that allows you to create forms using Python code in a very simple way, even taking as a basis models in the database, these can be used to create rows in your database and even to use them to validate the data that your user enters in the backend of your web application.

### Takes you from an idea to a working prototype quickly.

I consider this the main reason to use Django. **Django gets you from an idea to an MVP fast and without reinventing the wheel**. Which is a huge competitive advantage over other frameworks, especially when money and customers are involved.

With Django you would have a working prototype faster than with any other "less opinionated" framework or one that requires you to program everything from scratch.

{{< figure src="images/meme-django.jpeg" class="md-local-image" alt="Why to use Django" >}}

### It is a proven solution

There are many new frameworks every day. Most of them are just a fad and fall into disuse over the years, leaving projects without support. Django is a framework that has been around for a very long time, that has gone through numerous tests that have made it  robust and reliable, and that is not going to disappear overnight leaving you with an unsupported project.

Consider that Django was once the choice of sites as big as Instagram or Pinterest.

### Django support for Machine Learning libraries

Python is great when it comes to Machine Learning, cool libraries like Pytorch, ScikitLearn, Numpy and Keras are widely used worldwide. Since Django is written in Python, you will be able to integrate these libraries natively into your Django projects, without the need to create a new service.

{{< figure src="images/iceberg-meme.jpg" class="md-local-image" alt="Machine learning with Python" >}}

## The disadvantages of Django

Not everything is magic with Django, there are some things that can be considered a disadvantage and that I would change without hesitation. [Certainly Django can be improved](/en/django/how-to-improve-django-framework/).

### It is a monolith

Django is an old Framework, with everything you need to develop a web application, an ORM, a templating system, middleware and many other pieces that are there and are required for the framework to work, whether you need them or not. However, Django can be modularized to generate API responses in JSON (or other format) instead of HTML, ignoring the rest of the framework machinery.

The very stability of Django has made it look somewhat slow in a world of rapidly evolving JavaScript frameworks.

**Update**: Regarding the template system, if you combine it with libraries like htmx or turbolinks you will have the best of both worlds: interactivity on the frontend with HTML generation on the backend.

### It is slow and handles requests one at a time.

Python is an interpreted language that was made to be beautiful and simple, not necessarily performant. In my comparison of [python vs go]({{< ref path="/posts/go/python-vs-go-cual-es-el-mejor-diferencias-y-similitudes/index.md" lang="en" >}})I compare the performance of both, just to give you an idea.

In addition to the above, Django does not shine for its speed at the time of execution. In the race to be a fast framework, it is below more modern technologies such as Flask or FastAPI. 

Go to [my tutorial on FastAPI]({{< ref path="/posts/fastapi/python-fastapi-el-mejor-framework-de-python/index.md" lang="en" >}}) if you want to see how slow Django is compared to other frameworks.

### Djang's ORM is not asynchronous nor the fastest.

~~Django is working to make its ORM asynchronous but it's not there yet~~. Django's ORM is almost completely asynchronous. Other alternatives such as tortoise-orm, sql-alchemy, pony-orm are ahead in this aspect.

### Moderate learning curve

Django follows the philosophy of batteries included. Which is good, because it's code you save writing, but also bad, because it's code you need to learn to use: the ORM with models and queries, the middleware, the views, DRF (for the APIs) or the template system, the urls handler, string translation, the i18n package, etc. Learning all of the above takes more time than it would take you to learn other more minimalist frameworks; such as Flask or Express.

## Alternatives to Django in other languages

If you love Django, but you consider that you need a more modern solution according to the most current paradigms, try the following options:

### Frameworks like django but in Javascript.

If you use Framework and are looking for a similar framework, I understand that [AdonisJS](https://adonisjs.com/#?) and [NestJS](https://nestjs.com/#?) offer similar development experiences.

### Frameworks like django but in Go

If you are using this wonderful and super simple [programming language called Go]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}), I know that the [Beego](https://github.com/beego/beego#?) framework is quite similar to Django in terms of its battery-inclusive philosophy.

## TLDR advantages and disadvantages of Django

From my point of view the advantages outweigh the disadvantages, so I consider it a very attractive option to develop a complex website when you have little time or need to find developers fast.

Still not convinced? Remember that Instagram is the largest Django backend website out there and despite they've been modifying their system slowly, it was thanks to Django's rapid prototyping that allowed them to became the monster app that they're now.

In the end, as always, this is my point of view and everyone has their own. I hope this post has shown you something you would not have considered about Django before reading it.