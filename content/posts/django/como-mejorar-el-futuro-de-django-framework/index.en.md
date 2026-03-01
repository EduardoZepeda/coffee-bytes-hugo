---
aliases:
- /en/how-to-improve-django-framework/
authors:
- Eduardo Zepeda
categories:
- django
- opinion
coverImage: images/how-to-improve-django.jpg
date: 2024-06-23
description: A collection of suggestions and recommendations on how to take Django
  Framework to the next level, gathered from the django subreddit community.
keyword: improve django
keywords:
- django
- python
- reddit
- opinion
title: How to improve Django Framework?
---

On June 21, 2024 I started a thread on reddit with the following question: "What would you improve about Django framework?". The response from the community was immediate and the conversation quickly filled up with suggestions on how to improve Django framework, ranging from modest to quite radical. I summarize the results below.

{{< figure src="https://htmx.org/img/memes/20yearold.png" class="md-local-image" alt="HTMX Meme" caption="HTMX meme" >}}

{{<ad0>}}

## Would type hints improve Django Framework?

This was the comment that received the most support from the community. Although Python already has optional Type Hints since version 3.5, it seems that implementing them for the purpose of modernizing Django Framework does not seem to be a priority.

{{< figure src="images/comment-with-more-support-on-how-to-improve-django.png" class="md-local-image" alt="Comment with more support on how to improve Django" caption="Comment with more support on how to improve Django"  width="592" height="140" >}}

The popularity of type hints is such that some users who consider them a significant improvement to the framework have developed [an external library, called django-stubs](https://github.com/typeddjango/django-stubs#?), which aims to revamp the Django Framework with type hints.

### Type hints have already been evaluated and rejected.

However, according to reddit users, there is not much interest from the code maintainers to incorporate these changes as part of the code. There have even been proposals to incorporate [type hints into the official Django repository](https://github.com/django/deps/pull/65#?), but these changes have been dismissed, probably because they consider the typing to be a contradiction to the nature of Python as a dynamic language. 

{{<box type="info" message="In case you don't know what type hints are, type hints allow you to declare the type of a variable, argument, or the return value of a function to make it easier to identify bugs or unwanted behavior. Think of Python type hints as Python's Typescript, or as optional static typing in your favourite compiled language, such as C, C++, or Rust." >}}

{{<ad1>}}

## Use a custom User model instead of the normal User model.

The second comment that received the most support states that customizing Django's User model is quite complicated, especially if done mid-project, more specifically changing Django's default login type from user to email.

{{< figure src="images/custom-user-model-to-improve-django.png" class="md-local-image" alt="Second comment with most support on how to improve Django" caption="Second comment with most support on how to improve Django"  width="793" height="136" >}}

Although there are multiple ways to [customize the User model in Django]({{< ref path="/posts/django/managers-o-manejadores-personalizados-en-django/index.md" lang="en" >}}), such as using a proxy model, or inheriting from *AbstractUser*, some users find that solution a little bit "hackish".

{{<ad2>}}

{{<box type="info" message="In case you don't know, Django uses by default the *username* from its *User* model, in combination with the password, to log in a user. But the current trend in web development is to use email directly." >}}

## REST support in Django without third-party libraries.

Despite the fact that Django has one of the best libraries to create an application that meets the [basic features of a REST API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}); yes, I'm talking about DRF (Django Rest Framework). The reddit users consider that Django should provide support for REST APIs "out of the box", as a native part of the framework.

The above seems to me an interesting proposal but I also understand that, despite the maturity of REST, giving it preference over the rest of APIs, such as [the modern Google gRPC]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="en" >}}), SOAP, or some API that has not yet emerged, can be considered as a rather risky step by the Django committee. Yes, even if there are complete REST-based libraries, such as [FastAPI]({{< ref path="/posts/fastapi/python-fastapi-el-mejor-framework-de-python/index.md" lang="en" >}}).

## Read environment variables in Django without third-party libraries

Django can read environment variables directly using Python's *os* library, but other libraries, such as [django-environ](https://django-environ.readthedocs.io/en/latest/), have been developed to provide a more robust solution, where it reads directly from an *.env* file and where the absence of an environment variable will crash the application, ensuring that a Django application cannot start if even one environment variable is missing, which is what I imagine the developers of this popular forum want.

{{<ad3>}}

``` python
import os

os.environ["VARIABLE"]
```

### Other frameworks that do read environment variables

Contrary to Django, frameworks like Nextjs load environment variables by default and even allow you to make some of them public with the *NEXT_PUBLIC_* prefix, but in the case of Django you need to load the required variables manually or use a third-party library.

## Django native integration with frontend 

It's no secret that the frontend has received a gigantic boost in recent years, libraries like React, Vue, Svelte and others have taken a remarkable prominence in recent years, completely changing the paradigm of client-side development. Django has been agnostic about the separation between Backend and Frontend, probably because [Django is a monolithic framework]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}) (and I mean that in a non-pejorative way).

I guess some users consider that Django should not lag behind and should provide integration options with some frontend libraries to favor the reactivity of the applications, as Nextjs does for some time, since it allows you to select the frontend library to work with and even takes care of the minification and tree-shaking of the code through Webpack or its experimental compiler written in Rust.

### Improving Django with HTMX

It seems to me that Django already does an excellent job with its template system and that it combines perfectly with [libraries like HTMX](/en/django/django-and-htmx-modern-web-apps-without-writing-js/), to take advantage of all the power of hypertext without the need to incorporate Javascript to the project.

{{< figure src="https://htmx.org/img/memes/original.png" class="md-local-image" alt="Javascript delusion according to HTMX" caption="Javascript delusion according to HTMX" >}}

Without more to add I leave the link to the discussion if you want to see the rest of [suggestions on how to improve Django Framework.](https://www.reddit.com/r/django/comments/1dlj5n6/what_would_you_improve_about_django_framework/)


## Other suggestions on how to improve Django framework

Among the other suggestions I would like to highlight the following, as they received minor support or were mentioned multiple times throughout the thread:

- Add [support for CTEs]({{< ref path="/posts/django/django-annotate-y-reevaluacion-de-subqueries-en-postgres/index.md" lang="en" >}})
- Better form handling
- Better static content handling with emphasis on most popular frontend frameworks
- Out of the box support for queues
- Hot reload of the browser
- Basic CRUD boilerplate generator
- Models' auto prefetch of their related models.


### Suggestions that ended up being third party libraries

- [Static types and type inference for Django framework](https://github.com/typeddjango/django-stubs/#?)
- [Form handling for Django with steroids](https://docs.iommi.rocks/en/latest/#?)
- [CRUD capabilities for Django out of the box](https://noumenal.es/neapolitan/#?)