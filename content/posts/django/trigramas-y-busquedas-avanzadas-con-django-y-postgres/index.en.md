---
aliases:
- /en/trigrams-and-advanced-searches-with-django-and-postgres/
authors:
- Eduardo Zepeda
categories:
- django
- databases
coverImage: images/Busquedas-avanzadas-con-trigramas.jpg
coverImageCredits: 'credits: https://www.pexels.com/es-es/@pepecaspers/'
date: '2021-05-17'
description: I show you the basics of advanced text searches using trigrams and similarity
  indices and others, using Django and Postgres.
keywords:
- orm
- django
- python
- postgres
title: Trigrams and advanced searches with Django and Postgres
---

What if a user's finger slips on the keyboard and types "parfume" instead of "perfume". We probably don't want our user to leave the site because he didn't find any "parfume" on our website. Our website should return the results that most closely match what they are looking for. See how an experienced ecommerce handles it:

![Search for the word "parfume" on amazon](images/busquedaLaptopAmazon.gif)

Don't you remember the basic searches in Django? I have a post about [basic searches and full text search using Django and Postgres](/en/django/full-text-search-and-searches-with-django-and-postgres/), if you haven't read it take a look there first.

## Trigrams in Django and Postgres

But how does our application know that when a user types "parfume" they probably mean "perfume"?

The reason why parfume resembles perfume is because both contain similar trigrams.

Trigram? Yes, trigram, of three and gram. **A trigram is three consecutive characters, it's as simple as that.

![Automata trigrams schematic](https://res.cloudinary.com/dwrscezd2/image/upload/v1750289287/coffee-bytes/trigrams_tqmzs7.jpg)

Trigrams are three consecutive characters

{{<ad>}}

## Trigrams and similar words

According to [Postgres](https://www.postgresql.org/docs/12/pgtrgm.html), **we can tell how similar two strings are by comparing the number of trigrams they share,** and Django provides functions to work with trigrams.

```python
Videogame.objects.filter(name__trigram_similar="automatta") # it should say automata
<QuerySet [<Videogame: Nier automata>]>
Videogame.objects.filter(name__trigram_similar="autommattaa") # it should say automata
<QuerySet [<Videogame: Nier automata>]>
#...FROM "videogame_videogame" WHERE UNACCENT("videogame_videogame"."name") % UNACCENT(autommata)
```

View the trigrams for the word "automata" directly from the postgres terminal

```sql
SELECT show_trgm('automata');
                  show_trgm                  
---------------------------------------------
 {"  a"," au",ata,aut,mat,oma,"ta ",tom,uto}
```

Now look at the trigrams for "automatta" (if you didn't notice, this one has a double "t").

```sql
SELECT show_trgm('autommattaa');
                        show_trgm                        
---------------------------------------------------------
 {"  a"," au","aa ",att,aut,mat,mma,omm,taa,tom,tta,uto}
```

Can you notice how they both share some trigrams (a, au, aut, mat, tom, uto)?

![Shared trigrams between two text strings](https://res.cloudinary.com/dwrscezd2/image/upload/v1750289287/coffee-bytes/trigrams-intersection_cnapb1.jpg)

Also note that the quotation marks around certain trigrams are to specify trigrams with spaces.

**The number of trigrams shared by a pair of text strings can be expressed by means of an index**. The more trigrams shared, the higher this index will be.

We can find the similarity index, according to their trigrams, between two words from the postgres terminal.

```sql
SELECT word_similarity('outer worlds', 'wilds');
 word_similarity 
-----------------
          0.1875
```

### Sort by similarity with trigrams

What if we want our Django search to find even those words that match in a smaller number of trigrams?

Using the Django ORM **with the _TrigramSimilarity_ function we can filter those results by setting a similarity threshold** between a search word and our data.

If you don't remember what Django annotate is for, I have a post where I explain [django annotate and aggregate, as well as their differences](/en/django/django-annotate-and-aggregate-explained/)

```python
from django.contrib.postgres.search import TrigramSimilarity

results = Videogame.objects.annotate(similarity=TrigramSimilarity('name', 'wilds'), ).filter(similarity__gt=0.1).order_by('-similarity')
<QuerySet [<Videogame: Outer wilds>, <Videogame: Outer worlds>]> # With a similarity index of 0.1, the words wilds y worlds match
results[0].similarity
# 0.5
# ...SIMILARITY("videogame_videogame"."name", wilds) AS "similarity" FROM "videogame_videogame" WHERE SIMILARITY("videogame_videogame"."name", wilds) > 0.1 ORDER BY "similarity" DESC
```

## Search rank to sort by relevance

If a user searches for a laptop and your application first shows them laptop cases, laptop backpacks, other related items and then laptops, you are providing an inadequate user experience.

![Search for the word "laptop" on amazon](images/busquedaLaptopAmazon.gif)

Search Rank allows you to sort user searches by relevance, so that your user finds exactly what they are looking for first and then everything else.

```python
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector

vector = SearchVector('name')
query = SearchQuery('days')
results = Videogame.objects.annotate(rank=SearchRank(vector, query)).order_by('-rank')
results[0].rank
# 0.0607927
# ... ts_rank(to_tsvector(COALESCE("videogame_videogame"."name", )), plainto_tsquery(days)) AS "rank" FROM "videogame_videogame" ORDER BY "rank" DESC
```

Search Rank, with the help of the to_tsvector and plainto_tsquery function, will sort our search results according to the matches it finds between the vector and the query and **return each of the results of our query with a rank property that shows the value for its respective element.

### Assign importance by field

In a search, not all fields should matter equally

Imagine you have a database of books and a Book model with a “title” field and a “description” field. If a user searches for a book, it would be reasonable to assume that they are searching for the title. Based on the above, the correct thing to do would be to return books that contain their query in the title.

On the other hand, the user may be searching for some words they remember reading on the back cover, or they may be searching for anything that contains their query. We can also search the “description” field but with a lower weighting, showing them matches with the title first and then those that match the description.

![Explanation of relevance according to the field](https://res.cloudinary.com/dwrscezd2/image/upload/v1750290636/coffee-bytes/search-weights-postgres-django_mix86s.jpg)

With Posgres the above is possible.

To do this, we assign a weight, weighting, priority or whatever you want to call it, in the form of a letter, to each search vector, together with the name of the field to which it corresponds, and we join them into one.

We can choose between the letters "A", "B", "C" and "D". Each letter will have a different value of relevance in our search; "A" for the highest value and "D" for the lowest.

```python
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
vector = SearchVector('title', weight='A') + SearchVector('descripcion', weight='B')
query = SearchQuery('Science fiction')
Book.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.3).order_by('rank')
```

Exactly they have the following values:

* D = 0.1
* C = 0.2
* B = 0.4
* A = 1.0

These values can be overwritten to suit your needs, according to the type of business and models you use.

```python
Book.objects.annotate(rank=SearchRank(vector, query), weights=[0.1, 0.2, 0.3, 0.9]).filter(rank__gte=0.3).order_by('rank').filter(rank__gte=0.3).order_by('rank')
```

In the example above, I have rewritten the original values and decreased the values of the letters "D", "C", "B" so that they represent a much smaller percentage compared to the letter "A".

## Django Libraries for advanced searches

Perhaps your search needs are much more advanced than those provided by the Django ORM combined with Postgres. But, unless you are developing something that will revolutionize the search industry, someone has already gone through the same problem. There are generic solutions, such as [Solr and Django-haystack](/en/django/searches-with-solr-with-django-haystack/), that save you from writing many, many lines of code. Some examples are:

* [Xapian](https://xapian.org/#?)
* [Whoosh](https://whoosh.readthedocs.io/en/latest/intro.html#?)
* [Django haystack](https://django-haystack.readthedocs.io/en/master/index.html#?)
* [Django watson](https://github.com/etianen/django-watson#?)