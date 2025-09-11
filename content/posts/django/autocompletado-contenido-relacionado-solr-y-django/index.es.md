---
aliases:
- /autocompletado-contenido-relacionado-solr-y-django
- /autocompletado-sugerencias-y-contenido-relacionado-solr-y-django
- /es/autocompletado-sugerencias-y-relacionados-con-solr-y-django/
- /es/autocompletado-sugerencias-y-contenido-relacionado-solr-y-django/
authors:
- Eduardo Zepeda
categories:
- django
- linux
coverImage: images/solr-busquedas-avanzadas.jpg
coverImagecredits: Créditos a 藪 https://www.pixiv.net/en/users/50979768
date: '2022-05-29'
keys:
- django
- linux
- solr
- autocomplete
- index
slug: /django/autocompletado-sugerencias-y-contenido-relacionado-solr-y-django/
title: Autocompletado, Sugerencias y Relacionados con Solr Y Django
---

Solr, en unión con Lucene, conforman un motor de búsqueda muy potente que permite realizar búsquedas con funciones avanzadas. en esta entrada te traigo un resumen con  algunas de las funciones más interesantes de Solr y Django Haystack.

Doy por sentado que ya tienes una [aplicación configurada de django con Solr]({{< ref path="/posts/django/solr-en-django-con-haystack/index.md" lang="es" >}}), en caso de que no, revisa mi entrada anterior.

## Comportamiento de las búsquedas por defecto AND y OR

Haystack nos permite definir un comportamiento por defecto para todas las búsquedas, ya sea unir los términos con operadores AND u OR. El valor por defecto es AND pero puedes modificarlo en el archivo de configuración.

```python
# settings.py
HAYSTACK_DEFAULT_OPERATOR = 'AND'
HAYSTACK_DEFAULT_OPERATOR = 'OR'
```

{{<ad1>}}

## Búsqueda por campo específico con Solr

Si queremos limitar nuestra búsqueda a un campo específico del objeto que definimos como índice simplemente se lo pasamos como parámetro, junto con la cadena de texto a buscar.

```python
def vista(request):
    results = SearchQuerySet().models(<modelo>).filter(title='<query text>')
```

Esto nos permitirá buscar en el campo title nuestro término de búsqueda.

## Importancia en los campos en la búsqueda en Solr

¿Recuerdas que Solr ordena los resultados por relevancia? A veces queremos aumentar la relevancia en ciertos casos, por ejemplo: quizás quieres que el último término buscado por tu usuario influya en la búsqueda. Para esto agregamos el método boost y el valor relativo de importancia que queremos darle.

{{<ad2>}}

### Incremento por término de búsqueda

```python
sqs = SearchQuerySet().boost('<término>', 1.2)
```

### Incremento por campo

Cuando queremos que Solr le de mayor o menor importancia a un campo dado cuando realize una búsqueda, le pasamos el parámetro boost a nuestro campo.

```python
# app/search_indexes.py

from haystack import indexes
from .models import Videogame

class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ... otros dcampos
    name = indexes.CharField(model_attr='name', boost=1.5)
```

{{<ad3>}}

Este incremento solo es válido cuando se filtra por el campo al que le estamos aplicando el *boost*.

```python
SearchQuerySet().filter(SQ(content='<query>') | SQ(name='<query>'))
```

## Sugerencias de búsqueda en Solr

Para activar esta característica necesitamos establecer esta opción en la variable *HAYSTACK_CONNECTIONS* en el archivo de configuración de Django.

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

### Configuración del search_index

Primero necesitamos crear un campo de sugerencias, que tomará su información del campo text que usamos por defecto.

```python
class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ...
    suggestions = indexes.FacetCharField()

    def prepare(self, obj):
        prepared_data = super().prepare(obj)
        prepared_data['suggestions'] = prepared_data['text']
        return prepared_data
```

Además, necesitamos modificiar nuestro archivo de configuración *solrconfig.xml* y agregar la siguiente configuración

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

Y reemplazar el *SearchHandler* en el mismo archivo.

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

Si la configuración quedó de manera correcta, podremos obtener sugerencias para nuestras búsquedas de la siguiente manera.

```python
query = SearchQuerySet().auto_query("<mla ecsrito>")
query.spelling_suggestion() # u'mal escrito'
```

Esto nos permite corregir pequeños errores en la búsqueda, justo como si usaramos [trigramas en Postgres y Django.]({{< ref path="/posts/django/trigramas-y-busquedas-avanzadas-con-django-y-postgres/index.md" lang="es" >}})

Activar esta búsqueda me costó muchísimo trabajo, parece que no se activa por defecto y que tienes que realizar una visita a la url con *&spellcheck.reload=true* para que se genere el índice adecuado, pero quien sabe, quizás en versiones más nuevas no sea necesario.

```bash
http://127.0.0.1:8983/solr/#/<instancia>/query?q=text:<termino>&q.op=OR&spellcheck=true&spellcheck.q=<termino>&spellcheck.reload=true
```

## Búsquedas excluyentes y exactas con Solr

Solr nos permite realizar búsquedas avanzadas usando el método *auto_query*, que nos permitirá una sintaxis de búsqueda similar a la que ofrece google y otros motores populares.

* Usa un guion ("-") para excluir resultados que incluyan esos términos
* Usa comillas dobles ("") para establecer el orden correcto de las palabras
 
```python
query = SearchQuerySet().auto_query('<termino> -<excluye>')
otra_query = SearchQuerySet().auto_query('"<orden exacto>" -<excluye>')

```

## Autocompletado con Solr

También podemos realizar un autocompletado de nuestro término de búsqueda, para que nos arroje algunas sugerencias válidas. 

Para eso necesitamos primero crear un campo nuevo en nuestra clase que sirve como índice de búsqueda. 

Usamos cualquier nombre y generalmente estarás usando un campo de tipo *EdgeNgramField*, de la misma manera, declaramos el campo de nuestro modelo al que hará referencia, en este caso name. La otra opción es un campo *NgramField* pero se suele usar para lenguajes asiáticos.

```python
class VideogameIndex(indexes.SearchIndex, indexes.Indexable):
    # ...
    name_autocomplete = indexes.EdgeNgramField(model_attr='name')
    # ...
```
Ahora en la búsqueda 

```python
SearchquerySet().autocomplete(name_autocomplete='incompl')
# Devolverá resultados para: 'incompleto', 'incompletitud'
```

## Resultados relacionados o similares

A veces queremos obtener más de un mismo objeto, esto es ideal para recomendaciones de productos en tiendas en linea. Para esto existe el método *more_like_this*, al cual le pasamos una instancia de un modelo de Django y nos retornará objetos similares. 

Pero para que funcione, primero agregaremos el handler a nuestro archivo de *solrconfig.xml* en la configuración de nuestro núcleo de solr.

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

No importa que como obtengas la instancia, ni cual sea, lo importante es que obtengas una sola instancia y la pases como parámetro al método *more_like_this*

```python
instance = Videogame.objects.get(name__icontains="<algo>")
# otro ejemplo: 
# instance = Videogame.objects.get(pk=5)
related = SearchQuerySet().more_like_this(instance)
```

Este solo fue un resumen de algunas de las funciones más útiles, para una lista completa revisa la [documentación de django haystack](https://django-haystack.readthedocs.io/en/master/).