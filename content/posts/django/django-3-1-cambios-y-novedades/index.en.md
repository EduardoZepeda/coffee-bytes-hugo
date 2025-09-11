---
aliases:
- /en/django-31-changes-and-new-features-complete-overview/
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/tres.jpg
date: '2020-08-04'
description: In this post I talk about the changes and new features in Django 3.1.
  Django 3.1 includes asynchronous support for middleware, views and a JSON field.
keywords:
- django
- python
title: 'Django 3.1 changes and new features: complete overview'
---

A few hours ago I was browsing [my twitter](https://twitter.com/hello_wired#?) and I found out that they just released Django 3.1, changes and new features of ; my favorite web framework. This new version has some interesting changes that I'll talk about next.

## Views, Middleware and asynchronous testing

Guess who else is betting on asynchrony? With this new update Django incorporates asynchronism in views, middleware and tests. However Django's ORM, cache and other pieces of code that connect to the internet do not have asynchronous support for this update, although the documentation states that support will be added for later versions.

### views

Django will recognize the views we specify with _async def_ and will take care of executing them in an asynchronous context. To get the benefits you must use an ASGI server. On the other hand, it is also possible to use a WSGI server but there will be performance penalties.

```python
import datetime
from django.http import HttpResponse

async def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s.</body></html>' % now
    return HttpResponse(html)
```

### middleware

Django now allows combining both asynchronous and synchronous middleware. By default Django will assume that your middleware is synchronous. To modify this behavior you need to change the boolean attributes of your middleware factory:

* sync_capable (default to True)
* async_capable (default to False)

Django now incorporates three decorators for your middleware factories. Also, if your middleware factory returns an asynchronous _get_response()_ the appropriate syntax must be used; async def.

* sync_only_middleware()
* async_only_middleware()
* y sync_and_async_middleware()

{{<ad0>}}

```python
import asyncio
from django.utils.decorators import sync_and_async_middleware

@sync_and_async_middleware
def simple_middleware(get_response):
    # One-time configuration and initialization goes here.
    if asyncio.iscoroutinefunction(get_response):
        async def middleware(request):
            # Do something here!
            response = await get_response(request)
            return response

    else:
        def middleware(request):
            # Do something here!
            response = get_response(request)
            return response

    return middleware
```

### tests

If you are testing from an asynchronous function you must use the asynchronous test client which is available as _django.test.AsyncClient_, or as _self.async_client._ This new _AsyncClient_ client has the same methods as the normal test client.

```python
async def test_my_thing(self):
    response = await self.async_client.get('/some-url/')
    self.assertEqual(response.status_code, 200)
```

{{<ad1>}}

## JSON compatible fields

It's about time for a JSON field! Django now includes a field for your models called _models.JSONField_ and a _forms.JSONfield_ field, which can be used in any compatible database backend. Both fields support custom JSON encoders and decoders.

```python
from django.db import models

class ContactInfo(models.Model):
    data = models.JSONField()

ContactInfo.objects.create(data={
    'name': 'John',
    'cities': ['London', 'Cambridge'],
    'pets': {'dogs': ['Rufus', 'Meg']},
})
```

### Search in JSON fields

We can filter by this new field by searching for the contents of the JSON properties using double underscore notation.

```python
ContactInfo.objects.filter(
    data__name='John',
)
```

Django gives us the ability to search for objects by the presence of specific keys at the top level of their JSON field content.

```python
ContactInfo.objects.filter(
    data__pets__has_key='dogs',
)
```

Likewise, we can search for the presence or absence of certain elements in a property with a list value

```python
ContactInfo.objects.filter(
    data__cities__contains='London',
)
```

## DEFAULT_HASHING_ALGORITHM Configuration

With this new update we can specify the default hashing algorithm in the _settings.py_ file. This value will be used to encrypt cookies, password reset tokens in the admin panel, user sessions and in signatures created by django.core.signing.Signer and django.core.signing.dumps(). SHA-256 support is also added.

## Other new features of Django 3.1

PASSWORD_RESET_TIMEOUT_DAYS is deprecated in favor of PASSWORD_RESET_TIMEOUT, this new configuration variable allows to define the number of seconds that a password reset link will be valid.

You can now iterate through the _Paginator_ to get the pages.

A link to clear all filters is added to the right side panel of the admin.

The configuration variable CSRF_COOKIE_SAMESITE now allows 'None' as a value. While HttpResponse.set_cookie() and HttpResponse.set_signed_cookie() allow using samesite='None'.

Remember that if you want to see the changes to the complete documentation you can go to [this link](https://docs.djangoproject.com/en/3.1/releases/3.1/#whats-new-3-1#?) to see the complete changes in Django 3.1 version

If you want to improve your skills in Django let you here recommendations of two excellent books. Come in and check my reviews of [Django for Professionals]({{< ref path="/posts/django/resena-de-django-for-professionals/index.md" lang="en" >}}) and [Two scoops of Django](/en/django/the-best-django-book-two-scoops-of-django-review/).