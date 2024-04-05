---
aliases:
- /diferencias-entre-select_related-y-prefetch_related-en-django
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/django-select-related-prefetch-related.jpg
coverImageCredits: 'Créditos de la imagen a ときわた: https://www.pixiv.net/en/users/5300811'
date: '2022-03-09'
description: Diferencia entre los métodos select_related y prefetch_related de django
  y su uso para reducir reducir y mejorar las queries en consultas a la base de datos
keywords:
- django
- python
- rendimiento
- orm
title: Diferencias entre select_related y prefetch_related en Django
---

Los métodos _select\_related_ y _prefetch\_relate_d **se usan para reducir el número de queries que se realizan a la base de datos**. Lo anterior se traduce en tiempo de respuesta para cada vista. Además, usar estos métodos es una de las [acciones a implementar para mejorar el rendimiento de una aplicación de Django.](/es/como-escalar-django-para-manejar-millones-de-vistas/)

{{<digitalocean info="error">}}

## select\_related

El método _select\_related_ se **usa para seguir una relación de tipo ForeignKey o OneToOneField hacia los respectivos objetos a los que apunta y obtenerlos.**

Al usar _select\_related_ tendremos una consulta más larga, sin embargo, la ventaja consiste en que ya no será necesario acceder nuevamente a la base de datos para obtener los objetos del modelo relacionado.

![Esquema del funcionamiento de select_related ](images/select_related.png)

Esquema simplificado del funcionamiento de select\_related

Considera este ejemplo:

```python
from django.db import models

class Principal(models.Model):
    name = models.CharField(max_length=256)


class Derivado(models.Model):
    name = models.CharField(max_length=256)
    principal = models.ForeignKey(
        "Principal", related_name="derivados", on_delete=models.CASCADE
    )
```

Si intentamos acceder al objeto al que apunta la relación Foreign Key, se generará una nueva consulta a la base de datos. _select\_related_ evita esa consulta extra por cada objeto.

```html
{% for object in queryset %}
    <p>{{object.name}}</p>
    <small>{{object.principal.name}}</small>
{% endfor %}
```

Por ejemplo, si tenemos tres objetos Derivados relacionados a un único objeto principal:

- Una consulta principal que obtiene todos los objetos Derivado
- Tres consultas, exactamente iguales, una para cada vez que accedemos al objeto principal a partir del objeto Derivado.

### Uso en una consulta

Para usar _select\_related_ lo llamamos a partir de nuestra consulta, pasándole el nombre del campo que corresponde a nuestra relación con el otro modelo.

```python
Derivado.objects.select_related("principal")
```

### Funcionamiento interno de select\_related

¿Cómo funciona _select\_related_ internamente?, _select\_related_ reemplaza las consultas múltiples que se realizan por un único INNER JOIN a nivel de la base de datos:

```bash
SELECT "my_app_derivado"."id",
       "my_app_derivado"."name",
       "my_app_derivado"."principal_id"
  FROM "my_app_derivado"

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 WHERE "my_app_principal"."id" = '1'

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 WHERE "my_app_principal"."id" = '1'

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 WHERE "my_app_principal"."id" = '1'
```

De esta manera se reducen las múltiples consultas SQL a una sola consulta más larga.

```bash
SELECT "my_app_derivado"."id",
       "my_app_derivado"."name",
       "my_app_derivado"."principal_id",
       "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_derivado"
 INNER JOIN "my_app_principal"
    ON ("my_app_derivado"."principal_id" = "my_app_principal"."id")
```

## prefetch\_related

Si el método _select\_related_ recupera un único objeto a partir de un campo de relación única, **el método _prefetch\_related_ se usa cuando tenemos una relación múltiple con otro modelo**, es decir, una relación de tipo **_ManyToMany_ o un _ForeignKey_ inverso**.

![Esquema del funcionamiento de prefetch_related en django](images/prefetch_related.png)

Esquema simplificado del funcionamiento de prefetch\_related

Considera este ejemplo, nota el campo _ManyToManyField_ hacia el modelo _Principal_.

```python
from django.db import models

class Principal(models.Model):
    name = models.CharField(max_length=256)


class MultiplesPrincipales(models.Model):
    name = models.CharField(max_length=256)
    principales = models.ManyToManyField("Principal", related_name="multiples")
```

Si accedemos al campo que representa a la relación múltiple de nuestro objeto, sin usar _prefetch\_related_, estaremos impactando la base de datos con una nueva consulta.

```html
{% for object in queryset %}
    <p>{{object.name}}</p>
    {% for principal in object.principales.all %}
      <!-- Una nueva consulta cada vez -->
      <p><small>{{principal.name}}</small></p>
    {% endfor %}
{% endfor %}
```

### Uso en una consulta

Para usar el método _prefetch\_related_ llámalo al final de nuestra consulta, eligiendo aquel campo que represente la relación de muchos a muchos en nuestro objeto.

```python
queryset = MultiplesPrincipales.objects.prefetch_related("principales")
```

### Funcionamiento interno de prefetch\_related

¿Cómo funciona internamente _prefecth\_related_? El método **_prefetch\_related_ reemplaza las múltiples consultas SQL por solo 2 consultas SQL: una para la query principal y la otra para los objetos relacionados, posteriormente, unirá los datos usando Python**.

```bash
SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 INNER JOIN "my_app_multiplesprincipales_principales"
    ON ("my_app_principal"."id" = "my_app_multiplesprincipales_principales"."principal_id")
 WHERE "my_app_multiplesprincipales_principales"."multiplesprincipales_id" = '1'

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 INNER JOIN "my_app_multiplesprincipales_principales"
    ON ("my_app_principal"."id" = "my_app_multiplesprincipales_principales"."principal_id")
 WHERE "my_app_multiplesprincipales_principales"."multiplesprincipales_id" = '2'

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 INNER JOIN "my_app_multiplesprincipales_principales"
    ON ("my_app_principal"."id" = "my_app_multiplesprincipales_principales"."principal_id")
 WHERE "my_app_multiplesprincipales_principales"."multiplesprincipales_id" = '3'

SELECT "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 INNER JOIN "my_app_multiplesprincipales_principales"
    ON ("my_app_principal"."id" = "my_app_multiplesprincipales_principales"."principal_id")
 WHERE "my_app_multiplesprincipales_principales"."multiplesprincipales_id" = '4'
```

Las múltiples consultas anteriores quedan reducidas a solo 2 consultas SQL.

```bash
SELECT "my_app_multiplesprincipales"."id",
       "my_app_multiplesprincipales"."name"
  FROM "my_app_multiplesprincipales"

SELECT ("my_app_multiplesprincipales_principales"."multiplesprincipales_id") AS "_prefetch_related_val_multiplesprincipales_id",
       "my_app_principal"."id",
       "my_app_principal"."name"
  FROM "my_app_principal"
 INNER JOIN "my_app_multiplesprincipales_principales"
    ON ("my_app_principal"."id" = "my_app_multiplesprincipales_principales"."principal_id")
 WHERE "my_app_multiplesprincipales_principales"."multiplesprincipales_id" IN ('1', '2', '3', '4')
```

## Otros recursos relacionados

- [What's the difference between select\_related and prefetch\_related in Django ORM?](https://stackoverflow.com/questions/31237042/whats-the-difference-between-select-related-and-prefetch-related-in-django-orm)
- [Select related vs Prefecth related](https://buildatscale.tech/select_related-vs-prefetch_related/)
- [QuerySET API reference](https://docs.djangoproject.com/en/dev/ref/models/querysets/)