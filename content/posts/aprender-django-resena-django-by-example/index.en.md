---
title: "Learning Django through the book Django by example, my review"
date: "2020-09-01"
categories:
- "django"

coverImage: "images/Django_by_example.jpg"
description: "Here is my review of the book Django by Example, a book to learn Django from scratch through simple projects. Come in and read it."
keywords:
- books
- opinion
- python
- django
- reviews

authors:
- Eduardo Zepeda
---

This book plans to teach you Django by creating four projects from scratch. Django by Example starts by creating a blog, then a social network, an online store and finally a learning platform. Each project is developed practically from scratch and uses some libraries to complement the functions.

If you don't know the advantages and disadvantages that Django offers, visit my post where I explain some [advantages and disadvantages of the Django web development framework](/why-should-you-use-django-framework/)

## Blog Project

The first project proposed by Django by Example is the classic example of a simple blog, with authors and posts. The author designs a blog and they teach you the basics of Django, models, views, urls and templates, you know, the basics. As an aspect to highlight is pagination of the models and how to integrate it into the template system using Jquery. In a few words we are in front of the basic Django tutorial of the documentation but with books instead of surveys.

## Social network

The next project is a social network similar to Pinterest, where you save images from other websites to share them later using Jquery, this social network has a user tracking system (similar to Facebook, in case you want to compete with it). For this chapter the author delves into forms, model-based forms, handling email sending, creating custom labels, filters for the template system, and using Django's built-in authentication and session system. More advanced topics include creating a sitemap, advanced search using [Solr](https://lucene.apache.org/solr/) and [Haystack](https://haystacksearch.org/), redis and Django signals.

## Programming an online store

The third project consists of an online store that implements a payment system using Paypal, a product catalog, user accounts and a shopping cart. For the online store we will review the content of the previous chapters and also explain the context processors, the use and configuration of [celery](https://docs.celeryproject.org/en/stable/) (using [RabbitMQ](https://www.rabbitmq.com/) as a broker) for asynchronous tasks, the Paypal API, the export of spreadsheet files, the dynamic generation of pdf for orders using [weasyprint](https://weasyprint.org/) and the translation between languages using the integrated Django system. Redis will also be used to create a fairly simple but effective product recommendation engine, don't expect to take the throne away from amazon or google.

## E-learning platform

For the last project, an e-learning platform will be created using a CMS. This chapter touches on slightly more advanced Django topics such as the use of abstract models, proxies and multi-table inheritance and custom fields for models. The author will explain in the later chapters generic views and packages such as [django-braces](https://django-braces.readthedocs.io/en/latest/index.html), which further reduce the amount of code to write. It's great that the author also implements a cache system using [memcached](https://memcached.org/). And to finalize the project, [Django Rest Framework](https://www.django-rest-framework.org/) will be used to make the contents of the website available to the public.

After this last project Django by example ends. But, as a bonus it offers an extra chapter, where you will see the use of middleware and the deployment of the application using nginx and uwsgi.

## My opinion

This book offers a pragmatic approach, you learn as you create projects, step by step, a much more enjoyable approach than reading the documentation. Also this approach will probably be more similar to what a developer faces when he wants to launch a website.

Here comes the bad part: the book uses Jquery for all its examples that require javascript. But don't get me wrong, it's not that I hate Jquery, it's just that **many of its functionalities have already been emulated with native Javascript**. That's why Jquery is losing popularity among developers every day (almost like PHP). And, to top it off, the examples use AJAX to make web requests instead of the more modern fetch.

Leaving aside the shortcomings of the javascript content, Django by example completely covers everything Django has to offer, from the most basic to the most complex.

**Edit:** I am seeing that there is a new version of the book and it includes [Django Channels](https://channels.readthedocs.io/en/latest/) for handling websockets, however it still implements Jquery for its examples.

**Recommended prerequisite knowledge:** HTML, Python and basic Javascript
**Recommended to read:** 7/10
**Languages:** English

Read my other Django book reviews here:

* My review of Two scoops of Django](/the-best-django-book-two-scoops-of-django-review/), focused on best practices, if you have already done projects with Django.
* My review of Django for professionals](/django-for-professionals-review/), starts from scratch but includes Docker as part of the development.