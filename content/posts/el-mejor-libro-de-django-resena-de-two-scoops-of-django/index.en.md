---
title: "The best Django book, Two Scoops of Django review"
date: "2020-05-02"
categories:
- "django"

coverImage: "images/Two_scoops_of_django.jpg"
description: "This is a review of Two scoops of Django. A book focused on good development practices for the open source web development framework Django."
keywords:
- django
- python
- books
- review
- review

authors:
- Eduardo Zepeda
---

This post is a review of Two scoops of Django, what I consider **the best Django book**. It's a total must-have book if you're into application development using Django. You've probably already heard of it, as it's a pretty popular book among English-speaking developers.

This is one of those books that have personality, from the moment you pick it up and see the ice cream illustrations on the cover you know that the authors have put all the effort possible to make it worth every penny you paid for it. In addition, each chapter of the book is accompanied by nice ice cream illustrations, which will make reading more enjoyable and will help you remember the content.

## This is a book for intermediate/advanced users.

Two Scoops of Django does not attempt to teach you the general workings of Django, nor does it pretend to be a step-by-step tutorial for creating a project. Two Scoops of Django is a manual of Django best practices that goes from the homogenization of folder arrangement to the deployment of applications using automated systems, including tips and best practices in the use of models, functions, urls, templates, etc.

However, this is not a book for those who are looking for a first contact with Django. The book assumes that this is not your first time using Django or Python and that you understand the whole process that happens from the time you start writing Django code until you get it to a server. The authors will show you the best practices that they have acquired over the years, and show you the anti-patterns that, they believe, you should avoid.

## Contents of Two Scoops of Django

The agenda of the book is quite complete and you can be sure that you touch all the important issues. Here is a list of some of the topics covered in the book:

* When to use denormalization in your database
* Ways to structure the folders of your project
* How to handle version changes in an API
* How to optimize database queries
* Organizing your Pip dependencies
What to do when you can't handle environment variables in your development system * Proper use of logging to monitor your development system
Correct use of logging to monitor events * How to use logging correctly to monitor events

To end the book, the authors will share with you the libraries they use in each of their developments as part of their workflow and sorted by topic, some of them are: python-magic, circus, django-kevin, Twine, django-watson, etc. Their recommendations also extend to books; another section of the appendix lists the Django and Python books recommended by the authors, organized by level; basic or intermediate/advanced.

## The central focus of the book is best practices.

As I mentioned, the book focuses on Django best practices. To give you a little taste of what you will find in the book, here are some examples based on the recommendations you can find inside the book.

```python
# NO HAGAS ESTO 
from models.gamer import Gamer

gamers_to_email = []
for gamer in Gamer.objects.iterate():
    if gamer.games_bought > gamer.finished_games:
        gamers_to_email.append(gamer)
```

Is it obvious why this is not good practice? Now take a look at this one:

```python
# NO HAGAS ESTO 
from django.forms import *
from django.db.models import *
```

This one here is quite similar to an example that appears in the Django documentation

```python
# NO HAGAS ESTO 
def videogame_display(request, videogame_id):
    videogame = get_object_or_404(Videogame, id=videogame_id)
    date = timezone.now()
    return render(request, 'videogame_display.html', locals())
```

The above examples represent pieces of **fully functional** code, but which, due to their structure, may cause bugs, poor performance, more serious problems in the future or simply represent friction in the code development process.

## A book that is constantly updated

Many authors of Django books abandon their works and, over the years, they become outdated (as happened to The Definitive Guide to Django). The authors of this book do not fall into this category, they constantly update the content of their work and make updated versions available from time to time. Right now ~~they are working on~~ the [alpha version for Django 3.0](https://www.feldroy.com/products/two-scoops-of-django-3-x) of this same book is already available and will be around for a long time.

**** Recommended prerequisite knowledge:**** HTML, CSS, Python, Django, REST, Database
**Recommended to read:** 10/10
**Languages:** English, Spanish (Will be available for the latest version)

If you want to read about more books to learn Django go to my [review of Django for Professionals](/django-for-professionals-review/).