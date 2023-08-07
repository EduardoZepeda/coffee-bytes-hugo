---
title: "Why should you use Django Framework?"
date: "2021-03-24"
categories:
- "django"
- "opinions"

coverImage: "images/Django-usar.jpg"
coverImageCredits: "credits https://www.pexels.com/es-es/@weekendplayer/"
description: "Is Django worth using in a world where everything is JavaScript? Enter to learn about the advantages and disadvantages of this Python framework."
keywords:
- "drf"
- "django"
- "python"
- "opinion"

authors:
- Eduardo Zepeda
---

Why use Django in a world where everything is Javascript? Is it really worth it to learn a Python Framework in an ecosystem that stubbornly
is it really worth learning a Python Framework in an ecosystem that insists on
Frameworks written in Javascript? Well, I think it is, and here are some of the reasons why
some of the reasons why you should use Django. And, in order not to
objectivity, I will talk about the advantages as well as the disadvantages;
you know that no solution is perfect.

## The advantages of Django

### Your ORM is simple and wonderful

Django's ORM abstracts away the need to write SQL queries to create
tables and query data. It is quite intuitive to use and has almost all the most common queries included in its code.
most common queries included in its code. From filtering, partitioning,
joins and even [Postgres advanced lookups](/trigrams) functions.
Postgres](/trigrams-and-advanced-searches-with-django-and-postgres/) and migration management.
migrations.

To create a table in the database, you only need to create a class that inherits from
_models.Model_ and Django will do all the heavy lifting.

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
CREATE TABLE "reviews_review" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(25) NOT NULL, "comment" text NOT NULL, "name" varchar(20) NOT NULL, "created" datetime NOT NULL, "modified" datetime NOT NULL, "user_id" integer NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "reviews_review_user_id_875caff2" ON "reviews_review" ("user_id");
COMMIT;
```

In addition to the above, your ORM supports multiple databases, so that
database engine is quite simple and after a few changes you can migrate from Postgres to MySQL or vice versa
you can migrate perfectly from Postgres to MySQL or vice versa, just by changing a couple of lines in the configuration.
just by changing a couple of lines in the configuration. Saving you from having to
writing SQL by hand, as you would do in [migrations from another language, like
go](/tutorial-of-migrations-in-go-with-migrate/).

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

Its only disadvantage is its speed, as it falls short compared to other
alternatives such as sqlAlchemy, or
[tortoise-orm](/integration-of-orm-of-python-tortoise-with-fastapi/).

### Administrator panel included

Django has the [django admin
panel](/the-django-admin-panel-and-its-customization/), an admin panel that comes
that is installed by default. This admin implements a CRUD to the database in a simple way.
database in a simple way. And, in addition, it has a strong permissions system to restrict the access to the
permissions to restrict access to the data as you wish.

![Django admin panel](images/Django-panel-admin.png)

### Offers security against the most common attacks

Django includes certain utilities, which are responsible for mitigating most of the
attacks such as XSS, XSRF, SQL injections, Clickjacking and others. Most of them
are already available and you just need to add the corresponding middleware or template tag.
template tag.

```python
<form method="post">{% csrf_token %}
```

### User management included

Most applications require a user management system, since they are already
you know, register them, activate them, log them in, password recovery, right,
well, Django already includes all of the above by default, including decorators to
restrict views for authenticated users.

#### Authentication tested, including with JWT.

This framework has a proven authentication system, based on
sessions that are identified by means of a cookie. The authentication system
system has already been tested on numerous occasions by some of the most trafficked websites
such as Instagram or the NASA website. Pinterest
started with Django but moved to node.

You can use cookie authentication, session authentication, or there are packages that can be used to authenticate you.
allow you to use it with JWT. By the way, I have a post where I explain how to
[authenticating a user using JSON Web token JWT in Django Rest
Framework](/django-rest-framework-and-jwt-to-authenticate-users/). Also
I also wrote another one explaining why [some people think this is not a good idea](/django-rest-framework-and-jwt-for-authenticating-users/).
idea](/no-uses-jwt-for-managing-translation-sessions/).

#### Permit system

Django has a solid [permissions system and
groups](/how-permissions-and-groups-work-in-django/) that binds your users to models in the
users to models in the database that you can start using with just a few lines of code.
a few lines of code.

### Multiple packages

Django has many, many packages to solve most problems
and they are community-monitored and community-improved packages, which guarantees an impressive
which guarantees an impressive quality.

Just to name a few:

* [Django-haystack](/search-with-solr-with-django-haystack)(For searches
complex)
* Django-watson (Searches)
* DRF (REST)
* Graphene (Graphql)
* Django-rest-auth (Authentication)
* Django-allauth (Authentication)
* Django-filter (Search)
* Django-storage (AWS storage)
* Django-braces (Common functions)

Among all of them, I would like to highlight **DRF (Django Rest Framework) that returns
creating a REST API](/basic-features-of-an-api-rest/), handling permissions and [throttling](/throttling-in-nginx/), a simple task**.
handling of permissions and [throttling](/throttling-en-nginx/), a simple task**,
compared to creating everything from scratch.

Another package to note is that it allows you to work with websockets, to create a
[application that communicates with the server in real time, through events, is django-channels](/django-channels-consumers-scope-and-events/).
events, is django-channels](/django-channels-consumers-scope-and-events/).

### Takes you from an idea to a working prototype quickly.

I consider this the main reason to use Django. **Django takes you from an
idea to an MVP fast and without reinventing the wheel**. Which is a huge
competitive advantage over other frameworks, especially when money and clients are involved.
money and customers are involved.

With Django you'd have a working prototype faster than with any other
framework that requires you to program everything from scratch.

![Why to use Django](images/meme-django.jpeg)

### It is a proven solution

There are many new frameworks every day. Most of them are just a fad
and fall into disuse over the years, leaving projects without support. Django
is a framework that has been around for a very long time, that has been through numerous
numerous tests that have made it very robust and reliable, and that is not going to disappear overnight.
disappear overnight leaving you with an unsupported project.

He believes that Django was once the choice of such large sites.
as Instagram or Pinterest.

### Django support for Machine Learning libraries

Python is great when it comes to Machine Learning, cool libraries like
Pytorch, ScikitLearn, Numpy and Keras are widely used worldwide. Given
Django is written in Python, you can integrate these libraries natively into your Django
natively into your Django projects, without the need to create a new service.

![Machine learning with Python](images/iceberg-meme.jpg)

## The disadvantages of Django

Not everything is magical with Django, there are a few things that can be considered a
disadvantage and that I would change without hesitation.

### It is a monolith

Django is an old Framework, with everything you need to develop a
application, an ORM, a template system, middleware and many other pieces that are there and are
pieces that are there and are required for the framework to work, whether you need them or not.
whether you need them or not. However, Django can be modularized to generate responses to
API in JSON (or some other format) instead of HTML, ignoring the rest of the framework's
framework machinery.

Django's very stability has made it look somewhat sluggish in a world of
JavaScript frameworks that evolve very fast.

**Update**: Regarding the template system, if you combine it with libraries such as htmx or
libraries like htmx or turbolinks you will have the best of both worlds:
interactivity on the frontend with HTML generation on the backend.

### It is slow and handles requests one at a time.

Python is an interpreted language that was made to be beautiful and simple, not
necessarily fast. In my comparison of [python vs.
go](/python-vs-go-2022-which-is-better/) I compare the performance of both, just to give you an idea.
to give you an idea.

In addition to the above, Django does not shine for its speed when it comes to
running. In the race to be a fast framework, it is below more modern technologies such as Flask or FastAPI.
more modern technologies like Flask or FastAPI. Go to [my tutorial on
FastAPI](/python-fastapi-the-best-framework-for-python/) if you want to see how slow Django is compared to other frameworks.
Django is slow compared to other frameworks.

### Your ORM is not asynchronous nor is it the fastest.

Django is working on making its ORM asynchronous, but is not quite there yet.
Other alternatives such as tortoise-orm, sql-alchemy, pony-orm are ahead in this aspect.
this aspect.

### Moderate learning curve

Django follows the philosophy of batteries included. Which is good, because it's
code that you save writing, but also bad, because it's code that you need to learn how to
you need to learn to use: the ORM with models and queries, the middleware, the views, DRF (for the
views, DRF (for the APIs) or the template system, the urls handler,
string translation, the i18n package, etc. Learning all of the above
above involves more time than it would take you to learn other more minimalist Frameworks; like Flask or
minimalist frameworks; like Flask or Express.

## TLDR advantages and disadvantages of Django

From my point of view, the advantages outweigh the disadvantages, which is why I would
consider it a very attractive option to develop a complex web site when you are short on time or need to find
you have little time or you need to find developers fast.

Still not convinced? Remember that Instagram is the largest Django backend website in existence.
backend that exists.

In the end, as always, this is my point of view and each person has his own.
I hope this post has shown you something that you would not have considered about
Django before reading it.