---
aliases:
- /es/arregla-querys-lentas-en-django-al-usar-annotate-y-subqueries/
authors:
- Eduardo Zepeda
categories:
- django
- bases de datos
coverImage: images/fix-slow-queries-in-Django-when-using-annotate-and-subqueries.jpg
date: '2024-07-12T23:51:01-06:00'
description: Evita la repeteción de subqueries y el subsecuente rendimiento pobre
  al usar Django annotate usando raw queries y Common Table Expressions (CTEs) en
  bases de datos SQL
keyword: annotate y subqueries
keywords:
- Django
- Python
- Rendimiento
- Algoritmos
- SQL
- Databases
title: Arregla querys lentas en Django al usar annotate y subqueries
---

El ORM de Django es bastante útil y versátil, puede realizar la mayoría de las operaciones frecuentes de SQL, tales como filtrar, particionar, realizar joins u ordenar información, crear alias, y es [una de las mejores características que Django ofrece]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="es" >}}), pero también tiene sus limitaciones, sobre todo cuando se combina con subqueries, hoy te platico de una de sus limitaciones y como resolverla. 

## Django annotate y subqueries, un problema de rendimiento

La función Django annotate, de la que ya te hablé en una [entrada donde explico las diferencias que existen entre annotate y aggregate]({{< ref path="/posts/django/cuando-usar-annotate-y-aggregate-en-django/index.md" lang="es" >}}) en Django, sirve para agregar información a una consulta SQL, esta información puede ser un promedio, una sumatoria o cualquier otra cosa que quieres, el problema ocurre cuando esa información proviene de una subquery.

Permíteme darte un ejemplo:

``` python
from django.db.models import F
from django.db.models.expressions import Subquery

first_subquery = Subquery(...)
second_subquery = Subquery(...)

queryset = YourModel.objects.annotate(first_annotation=first_subquery)
    .annotate(second_annotation=second_subquery)
    .annotate(
        third_annotation=F("first_subquery") - F("second_subquery"))
    .annotate(
        fourth_annotation=((F("first_subquery") - F("second_subquery")) / F("second_subquery"))
    )
```

El problema aquí surge cuando mezclamos subqueries con annotate, y luego procedemos a utilizar esas anotaciones en otras anotaciones. 

Django no tiene la capacidad de reconocer que ya está repitiendo las subqueries una y otra vez, por lo anterior, el SQL que genera repite las mismas subqueries una y otra vez, lo que resulta en una consulta con un rendimiento pobre; caemos en el famoso problema de las *n+1 queries*. 

### El SQL generado por Django usando annotate y subqueries es ineficiente

Peor, ¿dónde está el problema exactamente? El ORM de django traduce la queryset anterior en la siguiente consulta SQL:

``` sql
SELECT columns
        (SELECT ...first_subquery - SELECT ...second_subquery) AS "third_annotation",
        (SELECT ...first_subquery - SELECT ...second_subquery)/(SELECT ...first_subquery) as "fourth_annotation",
        (SELECT ...first_subquery) as "first_annotation",
        (SELECT ...second_subquery) as "second_annotation"
    FROM table_a LEFT OUTER JOIN table_b
    ON table_a.id = table_b.id
    GROUP BY table_a.id ...
```

Observa como Django está reutilizando el SQL de cada subquery múltiples veces durante la consulta, en lugar de realizar la consulta una única vez y luego reutilizar ese valor.

Si no sabes como se obtiene la consulta SQL que genera el ORM de Django, te lo recuerdo, *qs* representa tu queryset:

``` python
print(qs.query)
```

¿Cómo se soluciona esto? Pues una de las maneras de arreglar esta consulta SQL es utilizar las Common Table Expressions (CTEs), sin embargo, a la fecha en la que escribo esto, **Django no tiene soporte para las Common Table Expressions (CTEs)**, por lo que tendremos que utilizar una raw query en lugar de los métodos que ya provee el ORM de Django.

{{<ad>}}

## Usar Common Table Expressions (CTEs) para mejorar el rendimiento de annotate y subqueries 

La solución es crear una raw query, recuerda que las versiones modernas de django puedes usar el método raw de tu [model manager]({{< ref path="/posts/django/managers-o-manejadores-personalizados-en-django/index.md" lang="es" >}}) para que Django automáticamente lo asigne a un objeto queryset de tu respectivo modelo

``` python
qs = YourModel.objects.raw("YOUR_SQL_RAW_QUERY_GOES_HERE")
```

La consulta SQL con las Common Table Expressions (CTEs) que usaremos tendría la siguiente forma:

``` sql
WITH my_cte AS (
    SELECT 
        a.column
        (SELECT ...subquery_one) AS first_annotation, 
        (SELECT ...subquery_two) AS second_annotation
    FROM table_a 
    LEFT OUTER JOIN table_b 
    ON table_a.id = table_b.id 
    GROUP BY table_a.id ...
)
SELECT 
    columns,
    first_annotation, 
    second_annotation, 
    first_annotation - second_annotation AS third_annotation,
    (first_annotation - second_annotation)/first_annotation AS fourth_annotation
FROM my_cte;
```

Ahora, ¡mira! Como puedes ver las subconsultas están entre paréntesis y cada una de ellas aparece una sola vez. 
El uso de Common Table Expressions (CTEs) nos permite utilizar una consulta eficiente, evitando múltiples consultas repetitivas a la base de datos y nos dará un rendimiento que supera a la consulta del ORM de Django en varios órdenes de magnitud (he conseguido reducir el tiempo de ejecución de algunas consultas de 13 segundos a tan sólo 0,7 segundos). 

Usar las Common Table Expressions (CTEs) nos permitirá una consulta eficiente, evitando múltiples consultas repetitivas a la base de datos y nos ofrecerá un rendimiento que supera enórmemente al ORM de Django por varios órdenes de magnitud. Quizás implementar CTEs sea una de las [acciones que se pueden tomar para mejorar el Django framework.]({{< ref path="/posts/django/como-mejorar-el-futuro-de-django-framework/index.md" lang="es" >}})