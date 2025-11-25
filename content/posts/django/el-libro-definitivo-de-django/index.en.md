---
aliases:
- /en/the-definitive-guide-to-django/
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/DSC_3822.jpg
date: '2020-04-01'
description: My review of the free Spanish-language definitive guide to Django from
  the book. The definitive guide to Django, by the co-creators of Django
keywords:
- django
- python
- books
- review
title: The definitive guide to Django
---

{{<ad0>}}

Django is **my favorite web development framework**, it is mature, its documentation and community are excellent. When I wrote about the [advantages and disadvantages of Django]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}) I explained you how to go from an idea to a working prototype in a very short time and without writing almost any code. I learned much of what I know about this framework years ago, reading and practicing the contents of a book called **Definitive Guide to Django: Web Development Done Right** by the authors [Adrian Holovaty](http://www.holovaty.com/) , [Jacob Kaplan-Moss](https://jacobian.org/#?) (co-creators of Django) and impeccably translated into Spanish by Saul Garcia under the title La guía definitiva de Django: Desarrolla aplicaciones web de forma rápida y sencilla.

This book is excellent because it covers absolutely everything you need to develop a Django application, frontend, backend, and deployment. The book is a **complete Django user manual**. Its content covers everything about how Django works, from the simplest to the most complicated. It covers the explanation of the MVC design pattern, history of Django development as a Framework, views (normal and generic), templates, models, use of Middleware, security, cache optimization, internationalization and the adaptation of the framework when you already have a pre-existing database. The book is a gem for those who love Python and Django, I include myself among them.

## A good book, but out of date

But not everything is magic with this book. As of this writing, Django is in version 3, but the information in the book is stuck in version 1.8. Unfortunately, it doesn't look like the authors have any intentions to retake the book to give it an update. Both authors have their blogs up and running, so I guess they have left the project forgotten.

Django and the web are changing little by little with each update; the web makes massive use of Javascript in the Frontend, first the SPAs became trendy and many times Django is used with the only function of serving information via REST or GraphQL to a frontend that will be in charge of processing it, completely ignoring some of the template rendering functionality; urls no longer require regular expressions, also it is possible to specify the type of data they will receive.

Currently, the React missionaries, in a rather unexpected twist, decided to focus their efforts on generating HTML directly from the server (as it had always been done), and named it SSR.

If the authors of this book decided to keep its content up to date it could easily be the best Django book available.

{{<ad1>}}

## My opinion about the definitive guide to Django

If you still want to read the book I recommend you to choose carefully the chapters and consider that the code may be quite outdated, I leave you the link to its [Spanish version](http://bibing.us.es/proyectos/abreproy/12051/fichero/libros%252Flibro-django.pdf) (If the link no longer sends you somewhere valid send me a tweet or an email). You can download it without any concern, it is totally legal, because the book is under the terms of the GNU Free Documentation License. **I recommend you to take a look at the chapters of Cache, Middleware, Internationalization and Security**, you will find useful tips that are still valid today.

If you want to learn Django with the new changes in the framework go to my post where I talk about the [Django for Professionals book]({{< ref path="/posts/django/resena-de-django-for-professionals/index.md" lang="en" >}})

****Recommended background:**** Python, HTML and CSS
**Recommended to read:** 6/10
**Languages:** English, Spanish
**Notes:** Outdated