---
date: '2025-12-15T22:15:52-06:00'
title: 'My Django Rapid Architecture short overview'
categories:
- Django
- Software architecture
coverImage: "images/django-rapid-architecture.jpg"
description: 'Discover how to apply Django Rapid Architecture to structure Django projects in a maintainable and hassle-free way. Summary of Django Rapid Architecture'
keyword: 'django rapid architecture'
keywords:
- 'django'
- 'software architecture'
- 'opinion'
- 'rest'
- 'models'
- 'orm'
authors:
- 'Eduardo Zepeda'
---

The other day, I was browsing Reddit, and found an Architecture proposal for Django projects called "[Django Rapid Architecture](https://www.reddit.com/r/django/comments/1pko7q6/django_rapid_architecture_a_guide_to_structuring/)". It’s a small document with a few guidelines or principles. I’m fond of Django, and I think [Django is of the best tools out there that you should use]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}), so I read it and summarized it for you.

Django Rapid Architecture is a collection of curated patterns and idioms. It aims to create maintainable Django codebases. The author claims it derives from 15+ years of experience and 100+ production projects.

## What’s wrong with Django’s default architecture?

Well, according to the author, Django’s “apps” are designed for reusable components, not project-specific business logic. Forcing all code into apps creates inflexibility: [Migrations]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="en" >}}) make early boundary decisions irrevocable, which inhibits the flexible refactoring necessary for dynamic projects.

Additionally, apps prefer “vertical encapsulation,” which groups views and models according to features. For real-world systems with interconnected business domains and interfaces, this is not ideal.

### How to structure projects according to Django Rapid Architecture?

Instead of using Django’s default paradigm, structure by layers:
- keep data (models/migrations)
- interfaces (HTTP views/management commands)
- Business logic (readers/actions) is separate.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1765860078/coffee-bytes/django-rapid-architecture_dpxnza.png" class="md-local-image" alt="Django rapid architecture overview"  width="747" height="747" >}}

This “horizontal encapsulation” aligns with Django’s natural layering, avoids early architectural lock-in, and better models complex domains.

#### Remember that Django is a monolith.
### How does Django Rapid Architecture file structure looks?

And how does that look in practice? Well, something like this.
The author talks about how we should embrace monoliths at first, since they’re less complex and more maintainable than microservices, and I agree totally. 

Introducing unnecessary complexity just for the sake of it won’t allow you to iterate fast enough, which is crucial in this rapidly changing environment.

### How does Django Rapid Architecture file structure looks?

And how does that look in practice? Well, something like this.

``` bash
project/
├── actions
│   ├── some_domain.py
├── data
│   ├── migrations
│   │   ├── 0001_initial.py
│   └── models
│       └── some_model.py
├── interfaces
│   ├── management_commands
│   │   └── management
│   │       └── commands
│   │           └── some_management_command.py
│   └── http
│       ├── api
│       │   ├── urls.py
│       │   └── views.py
│       └── urls.py
├── readers
│   └── some_domain.py
├── settings.py
└── wsgi.py
```

The thing here is just to remember that code is divided into actions, data, interfaces, and readers.

## Layers in Django Rapid Architecture

### How to handle Data?

#### What to do with Models?

Put all Models, yes, all models, inside a single app called data.

Avoid ultra-large complex models with many methods; complex logic should be independent of models.

Avoid inheritance other than Django’s Model, so every developer can just look at the model and understand what it does.

### What about Business logic?

Business logic code should live in plain functions with well-understood interfaces that operate on model instances, querysets, or plain values. Avoid complex inheritance, mixins, decorators, [complex custom managers]({{< ref path="/posts/django/managers-o-manejadores-personalizados-en-django/index.md" lang="en" >}}) unless it's absolutely necessary.

#### How to deal with Readers?

Serving a Django response involves three key parts:
- The Query: Built in the view using a queryset. It defines which DB rows/columns to fetch, applying filters, joins, and optimizations. Some logic may be in custom querysets.
- The Values: The data to be sent. Basic values come from model fields. Complex business logic often lives here, in model methods (e.g., get_absolute_url), transforming raw data into usable values for the response.
- The Projection: The final shaping of data for the client. For a JSON API, this is serialization into a dict/list. For HTML, it’s template rendering. Both use the values from step 2. This is where you decide the exact output format.

#### Types of functions in readers

I’m oversimplifying this; there are tons of examples in the original source, which I encourage you to read thoroughly. But the main types of functions to extract and transform data from a model are:
- Queryset functions encapsulate queryset constructions. Use composition and Higher Order Functions.
- Producer functions produce values from model instances, functions that receive an instance and return something.
- Projector functions, built on top of producers, return a dictionary that maps one or more names onto one or more values.


#### Actions

[REST APIs]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) are complex and non-uniform. Therefore, we should forget about all secondary HTTP verbs and stick with POST and GET.

Furthermore, we should make sure that a single URL maps to a single view, which responds only to GET or POST, not both. This is something similar to th [RPC and gRPC paradigm]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="en" >}}), which I already wrote about.

### Interfaces

#### SSR using Django templates is top-notch

Generating HTML on the server instead of using an API with react can increase productivity. [HTMX combined with Django]({{< ref path="/posts/django/django-y-htmx-web-apps-modernas-sin-escribir-js/index.md" lang="en" >}}) is recommended, the document also considers this approach superior to using React.

#### Nest interfaces to avoid complexity

You can organize your code to mimick your hierarchy of url segments.

``` bash
project/interfaces/http/urls.py
project/interfaces/http/api/urls.py
project/interfaces/http/api/admin/urls.py
project/interfaces/http/api/admin/widgets/urls.py
project/interfaces/http/api/admin/widgets/views.py
```

#### Management commands

[Django Management commands]({{< ref path="/posts/django/como-crear-un-comando-en-django/index.md" lang="en" >}}) are also an interface and should be treated similar to views.

## Where can I learn more about Django Rapid Architecture?

Where can I learn more about Django Rapid Architecture?
Remember that this text is only an overview of the main ideas. If you want to dive into this architecture proposal called [Django Rapid Architecture](https://www.django-rapid-architecture.org/), read the original source. I promise it’s short, only a few pages long, with a few more examples and the justification of some decisions.


