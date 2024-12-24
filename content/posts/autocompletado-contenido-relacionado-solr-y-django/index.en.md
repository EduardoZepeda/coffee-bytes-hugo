---
title: "Autocomplete, Suggestions and Related Content: Solr and Django"
date: "2022-05-29"
coverImage: "images/solr-busquedas-avanzadas.jpg"
coverImagecredits: "Credits to 藪 https://www.pixiv.net/en/users/50979768"
categories:
- django
- linux and devops
keys:
- django
- linux and devops
- solr
- autocomplete
- index
authors:
- Eduardo Zepeda
---

Solr, together with Lucene, is an outstanding search engine that allows you to perform searches with advanced features. In this post I bring you a summary of some of the most interesting features of Solr and Django Haystack.

I assume you already have a [configured django app with Solr](/en/searches-with-solr-with-django-haystack/), in case you don't, check my previous post.

## Behavior of default AND and OR searches

Haystack allows us to define a default behavior for all searches, either by joining terms with AND or OR operators. The default value is AND but you can modify it in the configuration file.

```python
# settings.py
HAYSTACK_DEFAULT_OPERATOR = 'AND'
HAYSTACK_DEFAULT_OPERATOR = 'OR'
```

{{<ad>}}

## Search by specific field with Solr

If we want to limit our search to a specific field of the object we define as index we simply pass it as a parameter, together with the text string to search.

```python
def vista(request):
    results = SearchQuerySet().models(<modelo>).filter(title='<query text>')
```

This will allow us to search in the title field for our search term.

## Importance of the fields in Solr search

Remember that Solr sorts results by relevance? Sometimes we want to increase the relevance in certain cases, for example: maybe you want the last term searched by your user to influence the search. For this we add the boost method and the relative importance value we want to give it.

### Increment per search term

```python
sqs = SearchQuerySet().boost('<término>', 1.2)
```

### Increment per field

When we want Solr to give more or less importance to a given field when performing a search, we pass the parameter boost to our field.

```python
# app/search_indexes.py

from haystack import indexes
from .models import Videogame

class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ... otros dcampos
    name = indexes.CharField(model_attr='name', boost=1.5)
```

This increment is only valid when filtering by the field to which the _boost_ is applied.

```python
SearchQuerySet().filter(SQ(content='<query>') | SQ(name='<query>'))
```

## Solr search suggestions

To enable this feature we need to set this option in the _HAYSTACK_CONNECTIONS_ variable in the Django configuration file.

```python
# settings.py

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://127.0.0.1:8983/solr/<nombre_del_núcleo>',
        'INCLUDE_SPELLING': True
    },
}
```

### Search_index configuration

First we need to create a suggestion field, which will take its information from the default text field.

```python
class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ...
    suggestions = indexes.FacetCharField()

    def prepare(self, obj):
        prepared_data = super().prepare(obj)
        prepared_data['suggestions'] = prepared_data['text']
        return prepared_data
```

In addition, we need to modify our configuration file _solrconfig.xml_ and add the following settings

```xml
<searchComponent name="spellcheck" class="solr.SpellCheckComponent">
  <str name="queryAnalyzerFieldType">text_general</str>
  <lst name="spellchecker">
    <str name="name">default</str>
    <str name="field">text</str>
    <str name="classname">solr.DirectSolrSpellChecker</str>
    <str name="distanceMeasure">internal</str>
    <float name="accuracy">0.5</float>
    <int name="maxEdits">2</int>
    <int name="minPrefix">1</int>
    <int name="maxInspections">5</int>
    <int name="minQueryLength">4</int>
    <float name="maxQueryFrequency">0.01</float>
  </lst>
</searchComponent>
```

And replace the _SearchHandler_ in the same file.

```xml
<requestHandler name="/select" class="solr.SearchHandler">
  <lst name="defaults">
    <str name="echoParams">explicit</str>
    <int name="rows">10</int>
    <str name="spellcheck.dictionary">default</str>
    <str name="spellcheck">on</str>
    <str name="spellcheck.extendedResults">true</str>
    <str name="spellcheck.count">10</str>
    <str name="spellcheck.alternativeTermCount">5</str>
    <str name="spellcheck.maxResultsForSuggest">5</str>
    <str name="spellcheck.collate">true</str>
    <str name="spellcheck.collateExtendedResults">true</str>
    <str name="spellcheck.maxCollationTries">10</str>
    <str name="spellcheck.maxCollations">5</str>
  </lst>
  <arr name="last-components">
    <str>spellcheck</str>
  </arr>
</requestHandler>
```

If the configuration is correct, we will be able to obtain suggestions for our searches as follows.

```python
query = SearchQuerySet().auto_query("<mla ecsrito>")
query.spelling_suggestion() # u'mal escrito'
```

This allows us to correct small errors in the search, just as if we were using [trigrams in Postgres and Django](/en/trigrams-and-advanced-searches-with-django-and-postgres/).

Activating this search took me a lot of work, it seems that it is not activated by default and that you have to visit the url with _&spellcheck.reload=true_ to generate the proper index, but who knows, maybe in newer versions it won't be necessary.

```bash
http://127.0.0.1:8983/solr/#/<instancia>/query?q=text:<termino>&q.op=OR&spellcheck=true&spellcheck.q=<termino>&spellcheck.reload=true
```

## Exclusive and exact searches with Solr

Solr allows us to perform advanced searches using the _auto_query_ method, which will allow a search syntax similar to that offered by google and other popular search engines.

* Use a hyphen ("-") to exclude results that include those terms.
* Use double quotation marks ("") to establish the correct order of words

```python
query = SearchQuerySet().auto_query('<termino> -<excluye>')
otra_query = SearchQuerySet().auto_query('"<orden exacto>" -<excluye>')
```

## Autocomplete with Solr

We can also perform an auto-completion of our search term, so that it will give us some valid suggestions.

For that we first need to create a new field in our class that serves as a search index.

We use any name and generally you will be using a field of type _EdgeNgramField_, in the same way, we declare the field of our model to which it will make reference, in this case name. The other option is an _NgramField_ field but this is usually used for Asian languages.

```python
class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ...
    name_autocomplete = indexes.EdgeNgramField(model_attr='name')
    # ...
```

Now in search

```python
SearchquerySet().autocomplete(name_autocomplete='incompl')
# Devolverá resultados para: 'incompleto', 'incompletitud'
```

## Related or similar results

Sometimes we want to get more of the same item, this is ideal for product recommendations in online stores. For this there is the _more_like_this_ method, to which we pass an instance of a Django model and it will return similar objects.

But to make it work, we will first add the handler to our _solrconfig.xml_ file in our solr core configuration.

```xml
<requestHandler name="/mlt" class="solr.MoreLikeThisHandler">
  <lst name="defaults">
    <str name="mlt.mintf">1</str>
    <str name="mlt.mindf">1</str>
    <str name="mlt.minwl">3</str>
    <str name="mlt.maxwl">15</str>
    <str name="mlt.maxqt">20</str>
    <str name="mlt.match.include">false</str>
  </lst>
  </requestHandler>
```

It doesn't matter how you get the instance, or what it is, the important thing is that you get a single instance and pass it as a parameter to the _more_like_this_ method.

```python
instance = Videogame.objects.get(name__icontains="<algo>")
# otro ejemplo: 
# instance = Videogame.objects.get(pk=5)
related = SearchQuerySet().more_like_this(instance)
```

This was just a summary of some of the most useful functions, for a complete list check the [django haystack documentation](https://django-haystack.readthedocs.io/en/master/).