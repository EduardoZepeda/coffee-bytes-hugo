---
aliases:
- /aprender-django-resena-django-by-example
- /aprender-django-con-django-by-example-mi-resena
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/Django_by_example.jpg
date: '2020-09-01'
description: Aqui mi reseña del libro Django by Example, un libro para aprender Django
  desde cero por medio de proyectos sencillos. Entra y leela.
keywords:
- libros
- opinion
- python
- django
- reseñas
title: Aprender Django con Django by Example, mi reseña
---

Este libro planea enseñarte Django mediante la creación desde cero de cuatro proyectos. Django by Example parte creando un blog, luego una red social, una tienda en linea y al final una plataforma de aprendizaje. Cada proyecto es desarrollado prácticamente desde cero y utiliza algunas librerías para complementar las funciones.

Si no conoces las ventajas y desventajas que ofrece Django, visita mi entrada donde te explico algunas [ventajas y desventajas del framework Django de desarrollo web.](/es/por-que-deberias-usar-django-framework/)

## Proyecto del Blog

El primer proyecto que propone Django by Example es el clásico ejemplo de un blog sencillo, con autores y entradas. El autor diseña un blog y te enseñan el funcionamiento básico de Django, modelos, vistas, urls y plantillas, ya sabes, lo básico. Como aspecto a resaltar se ve paginación de los modelos y como integrarla en el sistemas de plantillas usando Jquery. En pocas palabras estamos ante el tutorial básico de Django de la documentación pero con libros en lugar de encuestas.

## Red social

El siguiente proyecto es una red social similar a Pinterest, donde se guardan imágenes de otros sitios web para compartirlas más tarde usando Jquery, esta red social cuenta con un sistema de seguimiento de usuarios (parecido al de Facebook, por si quieres hacerle la competencia). Para este capítulo el autor profundiza en los formularios, los formularios basados en modelos, el manejo de envío de emails, la creación de etiquetas personalizadas, filtros para el sistema de plantillas y el uso del sistema de autenticación y sesiones integrados de Django. Como tópicos más avanzados se profundiza en la creación de un sitemap, la búsqueda avanzada usando [Solr](https://lucene.apache.org/solr/) y [Haystack](https://haystacksearch.org/), redis y señales de Django.

## Programando una tienda en linea

El tercer proyecto consiste en una tienda en linea que implementa un sistema de pagos usando Paypal, un catálogo de productos, cuentas de usuario y un carrito de compras. Para la tienda en linea se repasará el contenido de los capítulos anteriores y además se explicarán los procesadores de contexto, el uso y configuración de [celery](https://docs.celeryproject.org/en/stable/) (usando [RabbitMQ](https://www.rabbitmq.com/) como broker) para las tareas asíncronas, la API de Paypal, la exportación de archivos de hojas de calculo, la generación dinámica de pdf para los pedidos usando [weasyprint](https://weasyprint.org/) y la traducción entre lenguajes usando el sistema integrado de Django. Asi mismo se usará Redis para crear un motor de recomendación de productos bastante simple pero efectivo, no esperes quitarle el trono ni amazon ni a google.

## Plataforma de aprendizaje en linea

Para el último proyecto se creará una plataforma de aprendizaje en linea usando un CMS. Este capítulo toca temas un poco más avanzados de Django tales como uso de modelos abstractos, proxies y herencia multi tabla y campos personalizados para los modelos. El autor explicará en los últimos capítulos las vistas genéricas y paquetes como [django-braces](https://django-braces.readthedocs.io/en/latest/index.html), que se encargan de reducir aún más la cantidad de código a escribir. Es genial que el autor también implemente un sistema de cache usando [memcached](https://memcached.org/). Y para finalizar el proyecto se usará [Django Rest Framework](https://www.django-rest-framework.org/) para poner los contenidos del sitio web a disposición del público.

Tras este último proyecto Django by example termina. Pero, a modo de bonus ofrece un capítulo extra, donde se verá el uso de middleware y el despliegue de la aplicación usando nginx y uwsgi.

## Mi opinión

Este libro ofrece una aproximación pragmática, aprendes mientras creas proyectos, paso a paso, un enfoque mucho más ameno que leer la documentación. Además este enfoque probablemente será más parecido a lo que se enfrenta un desarrollador cuando quiere lanzar un sitio web.  
  
Aquí viene lo malo: el libro usa Jquery para todos sus ejemplos que requieran javascript. Pero no me malentiendas, no es que odie Jquery, lo que pasa es que **muchas de sus funcionalidades ya han sido emuladas con Javascript nativo**. Por lo anterior Jquery pierde popularidad entre los desarrolladores cada día que pasa (casi como PHP). Y, para rematar, los ejemplos usan AJAX para hacer las peticiones web en lugar del más moderno fetch.

Dejando de lado las carencias del contenido en cuanto a javascript, Django by example cubre por completo todo lo que Django tiene para ofrecer, yendo desde lo más básico hasta lo más complejo.

**Edito:** Estoy viendo que hay una versión nueva del libro e incluye [Django Channels](https://channels.readthedocs.io/en/latest/) para el manejo de websockets, sin embargo aún implementa Jquery para sus ejemplos.

**Conocimientos previos recomendados:** HTML, Python y Javascript básico  
**Recomendado para leerlo:** 7/10  
**Idiomas:** Inglés

Lee otras de mis reseñas sobre libros de Django aquí:

- [Mi reseña de Two scoops of Django](/es/el-mejor-libro-de-django-resena-de-two-scoops-of-django/), enfocado en buenas prácticas, por si ya has hecho proyectos con Django.
- [Mi review de Django for professionals](/es/resena-de-django-for-professionals/), parte desde cero pero incluye Docker como parte del desarrollo.