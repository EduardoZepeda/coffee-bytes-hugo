---
title: "Graphql and django with graphene"
date: "2021-10-26"
categories:
- "django"

coverImage: "images/GraphqlGrapheneDjango.jpg"
coverImageCredits: "Credits to https://www.pexels.com/@frank-cone-140140/"
description: "How to implement graphql queries and mutations in a django project, using the models and its ORM using graphene? I explain you here."
keywords:
- django
- python
- graphene
- graphql
- api

authors:
- Eduardo Zepeda
---

Normally graphql is used in conjunction with Nodejs and express, or other javascript frameworks, to create a graphql API in which to make queries, but graphql can also be implemented with Python frameworks such as Django. We are going to create a django application that serves content with graphql using a cool library called graphene that abstracts almost all the boilerplate of integrating graphql with Django models.

## Why graphql?

Graphql allows you to integrate requests from multiple sources into a single API call. Unlike REST, it consists of a single endpoint to which we can make certain queries (defined by ourselves in a schema, yes, as a schema) and get a response.

![Differences between REST and Graphql](images/RestVsGraphQL.png)

The schema tells graphql what kind of objects we will return and what fields of these objects, graphql will use a resolver to get that information from a database or any other reference.

![graphql schematic in Javascript](images/EsquemaGraphqlSimplificado.png)

Simplified graphql schematic in Javascript

Each query will be validated by graphql to return only what is allowed in the schema.

### Should you use graphql?

I'm more a fan of keeping things as simple as possible and complicating them until necessary. Facebook created graphql for the purpose of making it easier to search for information in their application. Facebook requires a lot of information from different sources in order to work the way it does. Your application is probably not as complex and chaotic as facebook and does not face the same problems.

Each team or person should consider whether it is worth implementing graphql according to the short, medium and long term needs of the app to be built. Maybe REST is enough, or maybe not.

## Installation of graphene-django

Let's install graphene-django first. I will use the pipenv virtual environment manager, but you can use pip or any other you prefer.

I am going to create a project with a fairly simple application for this tutorial. which features a single model.

```python
pipenv shell
pipenv install graphene-django==2.15.0 django
django-admin startproject criticaAnimes .
django-admin startapp anime
```

I will now create a single model in the app and add three instances using the admin. I have a post about the django admin in case you don't know how to configure it.

```python
# anime/models.py
from django.db import models

class Anime(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    rating = models.PositiveSmallIntegerField()
```

Remember to run the migrations in case you have not done so, so that the changes in our app are reflected in the database.

```python
python manage.py migrate
```

Now let's install graphene in our Django application.

Graphene-django requires staticfiles to be installed in your application, so make sure you have it installed.

```python
# criticaAnimes/settings.py
INSTALLED_APPS = [
    "django.contrib.staticfiles",
    "graphene_django"
]
```

As you know, unlike a REST API, **Graphql has a single endpoint that receives the queries**, so we only need to add a url to our application.

```python
# criticaAnimes/urls.py
from graphene_django.views import GraphQLView
urlpatterns = [
    # ...
    path("graphql", GraphQLView.as_view(graphiql=True)),
]
```

The _graphiql_ parameter tells django whether or not to serve the graphiql interface.

![Difference in the interface when setting graphql to True or False](images/graphiqlTrueOrFalse.png)

If we now try to access the url we just created, django will return an error warning us that **we need a graphql _schema_**.

![Error due to not defining a schema in graphene](images/aSchemaIsRequired.png)

Error due to missing schema in graphene

Let's tell django where the location of our schema will be.

```python
# criticaAnimes/settings.py
GRAPHENE = {
    "SCHEMA": "criticaAnime.schema.schema"
}
```

Our schema will be an object called _schema_ that will be located inside a file called _schema_.py in our project folder.

![schema object location](images/ubicacionDeSchema.png)

I have put it here, but you can put it wherever you consider best and adjust the route to your location.

## Create a schema with graphene

Now that we have a schema and django knows where to find it, we need to tell graphql how to handle our queries.

Here we are going to create an object that represents a graphql type. For this we create a class that inherits from _DjangoObjectType_ and we specify the model and the fields in its Meta class.

This _DjangoObjectType_ is the model that will be used as a base to handle graphql validations and tell Django which fields of our object to return.

```python
# criticaAnimes/schema.py
import graphene
from graphene_django import DjangoObjectType

from anime.models import Anime

class AnimeType(DjangoObjectType):
    class Meta:
        model = Anime
        fields = ("id", "title", "description", "rating")
```

Now we are going to create a _Query_ class that will contain each and every one of our queries, in the form of methods.

## Returning lists with graphene

Next we look for our query to be a list of _AnimeType_ objects (the one we just created in the previous step).

You could consider this property as the **equivalent of a type or schema part** in Javascript.

```python
# criticaAnimes/schema.py
import graphene
from graphene_django import DjangoObjectType

# ...

class Query(graphene.ObjectType):
    all_animes = graphene.List(AnimeType)
```

Now we are going to tell it what should contain the query that solves _all_animes_, for that we are going to create a function with the following format <_resolve_ + property_of_graphene>_ = resolve_property_graphene (_resolve_all_animes_).

You can consider this method as the **equivalent of a resolver** in Javascript.

Graphene will automatically take care of two things:

* Associate the queryset that we return with the property
* Transform the query to camel case (In this case allAnimes).

```python
# criticaAnimes/schema.py
import graphene
from graphene_django import DjangoObjectType

# ...

class Query(graphene.ObjectType):
    all_animes = graphene.List(AnimeType)

    def resolve_all_animes(root, info):
        return Anime.objects.all()

schema = graphene.Schema(query=Query)
```

If for some reason you want to **disable the transformation of the text to camel** case indicate it in the schema object. I will leave it with the camel case activated.

```python
# criticaAnimes/schema.py
# SOLO si quieres desactivar el camelcase
schema = graphene.Schema(query=Query, auto_camelcase=False)
```

With the camel case activated, the query called _allAnimes_ will return the result of the _Anime.objects.all()_ queryset.

![Result of query allAnimes in graphql](images/QuerysetGraphene.png)

## Returning queries with parameters

To create a new query with parameters we will add a new method to our Query object and follow the same formula: we will create a property and then join the name with the prefix _resolve__.

However in this case we will use an argument, so we have to tell the name of the argument and the data type in graphql, in this case the argument will be called _title_ and the data type will be _String_. Notice how we pass _required_ to make it mandatory and its presence as an argument in the new method.

Remember that the result of the query is decided by us, I have used a simple _icontains_ for a case insensitive search, but you can use whatever you want, even a [full text search](/blog/full-text-search-and-searches-with-django-and-postgres/), [advanced searches with trigrams with postgres](/blog/trigrams-and-advanced-searches-with-django-and-postgres/) or whatever you prefer.

```python
# criticaAnimes/schema.py
import graphene
from graphene_django import DjangoObjectType

# ...

class Query(graphene.ObjectType):
    # ... 
    anime_by_title = graphene.List(AnimeType, title=graphene.String(required=True))

    # ...

    def resolve_anime_by_title(root, info, title):
        return Anime.objects.filter(title__icontains=title)

schema = graphene.Schema(query=Query)
```

![Result of the query animeByTitle in graphql ](images/busquedaGraphqlParametros-1.png)

## Pagination in graphql using relays

To use pagination in our search we need to use the relay object we get from graphene and create a property in the Meta class of our graphql Type.

And an object that Connection with a node equal to our graphql type.

```python
# criticaAnimes/schema.py
import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from anime.models import Anime

class AnimeType(DjangoObjectType):
    class Meta:
        model = Anime
        interfaces = (relay.Node,)
        fields = ("id", "title", "description", "rating")

class AnimeConnection(relay.Connection):
    class Meta:
        node = AnimeType

class Query(graphene.ObjectType):
    # ...
    paginated_animes = relay.ConnectionField(AnimeConnection)
    # ...
    def resolve_paginated_animes(root, info, **kwargs):
        return Anime.objects.all()

schema = graphene.Schema(query=Query)
```

With this we will be able to make queries where we indicate the quantity of results that we want. And it will return us information regarding if we have a next page, the cursor of beginning, the cursor of end.

If you are confused, think of cursors as identifiers. In the query we are telling it to bring us the first two results, each one has a cursor, which is like its identifier, and a node, which contains the information we are interested in.

In addition to the objects we can obtain pagination information, such as the start cursor, the end cursor and whether there are pages before or after our query.

![Paging in graphql using django graphene](images/GrapheneQueryRelay-1.png)

## Graphene mutations

With this we can now handle most of the queries to read information that we can think of. But, what about the rest of the operations: creating, updating or deleting data? As you know, in graphql, these operations are handled by mutations.

We can customize the behavior of our mutations by creating a new object that inherits from _Mutation_.

### Arguments and return of our mutation

Inside the object that inherits from Mutation we will place an _Arguments_ class, which indicates the arguments that our mutation requires. In this case I have put all the fields with their respective types

The other two fields in the object refer to what the mutation will return when we execute it; in this case it is an Anime object, which corresponds to our model; and an ok field, to indicate that everything went well.

```python
# criticaAnimes/schema.py
# ...
class CreateAnime(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        rating = graphene.Int()

    ok = graphene.Boolean()
    anime = graphene.Field(AnimeType)
```

### The mutate method

Now we create a method called _mutate_ inside this same class. This object receives root, info and the arguments that we specify in class _Arguments_, inside the method we decide what happens.

I created an anime object, saved it to the database and returned the class with the _anime_ object created and the word _ok_ equal to True.

```python
# criticaAnimes/schema.py
class CreateAnime(graphene.Mutation):
    # ...
    def mutate(root, info, title, description, rating):
        anime = Anime(title=title, description=description, rating=rating)
        anime.save()
        ok = True
        return CreateAnime(anime=anime, ok=ok)
```

Now that we have our behavior defined let's create our _mutation_ object, which will be received by the _schema_. Notice how all the behavior comes from the class we just created and the _Mutation_ object only sets the name of the mutation we will use in our query.

```python
# criticaAnimes/schema.py
# ...
class Mutation(graphene.ObjectType):
    create_anime = CreateAnime.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
```

That's it, the _createAnime_ mutation receives the three parameters we indicate and returns an anime object and the word ok as a response.

![Equivalence between the graphene code and the Graphql query](images/mutationDeGraphqlEnGraphene.png)

The [graphene documentation](https://docs.graphene-python.org/en/latest/) is quite extensive and there are many more topics, I have only given you the basics and probably what you will use the most, but take a look and read everything graphene has to offer.