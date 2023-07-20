---
title: "La guia definitiva de Django"
date: "2020-04-01"
categories: 
  - "django"
coverImage: "images/DSC_3822.jpg"
description: "Mi reseña de la guia definitiva de Django en español gratuita del libro. The definitive guide to Django, por los co-creadores de Django"
keywords:
  - django
  - python
  - libros
  - opinion
  - reseña
authors:
  - Eduardo Zepeda
---

Django es **mi framework de desarrollo web favorito**, es maduro, su documentación y su comunidad son excelentes. Cuando escribí sobre las [ventajas y desventajas de Django](/por-que-deberias-usar-django-framework/) te expliqué que pasar de una idea a un prototipo funcional en muy poco tiempo y sin escribir casi código. Aprendí gran parte de lo que sé respecto a este framework hace años, leyendo y practicando el contenido de un libro llamado **Definitive Guide to Django: Web Development Done Right** de los autores [Adrian Holovaty](http://www.holovaty.com/) , [Jacob Kaplan-Moss](https://jacobian.org/) (co-creadores de Django) y traducido impecablemente al español por Saul García bajo el título de La guía definitiva de Django: Desarrolla aplicaciones web de forma rápida y sencilla.

Este libro es excelente porque cubre absolutamente todo lo que se necesita para desarrollar una aplicación de Django, frontend, backend, y el deployment. El libro es un **manual completo de uso de Django**. Su contenido abarca todo el funcionamiento de Django, desde lo más simple hasta lo más complicado. Cubre la explicación del patrón de diseño MVC, historia del desarrollo de Django como Framework, vistas (normales y genéricas), plantillas, modelos, uso de Middleware, seguridad, optimización con cache, internacionalización y la adaptación del framework cuando ya tienes base de datos preexistentes. El libro es toda una joya para los que amamos Python y Django, me incluyo entre estos.

## Un buen libro, pero desactualizado

Pero no todo es mágico con este libro. Al día de hoy que escribo esta entrada Django va en su versión 3, pero la información del libro se quedó estancada en su versión 1.8. Desafortunadamente, no se ve que los autores tengan intenciones de retomar el libro para darle una actualizada a su contenido. Ambos autores tienen sus blogs activos y funcionando, por lo que supongo que han dejado el proyecto olvidado.

Django y la web están cambiando poco a poco con cada actualización; la web hace uso masivo de Javascript en el Frontend, primero las SPA se volvieron tendencía y muchas veces Django es utilizado con la única función de servir información por medio de REST o GraphQL a un frontend que se encargará de procesarla, ignorando por completo algo de la funcionalidad de renderizado de plantillas; las url ya no requieren expresiones regulares, además es posible especificar el tipo de dato que recibirán. 

Actualmente, los misioneros de React, en un giro bastante inesperado, decidieron orientar sus esfuerzos a la generación de HTML directo desde el servidor (como siempre se había hecho), y le nombraron SSR.

Si los autores de este libro se decidieran a mantener actualizado su contenido podría fácilmente ser el mejor libro de Django disponible.

## Mi opinión sobre la guia definitiva de Django

Si aún así quieres leer el libro te recomiendo escoger con cuidado los capítulos y considerar que el código puede estar bastante desactualizado, te dejo el enlace a su [versión en español](http://bibing.us.es/proyectos/abreproy/12051/fichero/libros%252Flibro-django.pdf) (Si el enlace ya no te manda a algún lugar válido mándame un tweet o un correo). Puedes descargarlo sin preocupación alguna, es totalmente legal, pues el libro se encuentra bajo los términos de la licencia GNU Free Documentation License. **Te recomiendo darle un vistazo a los capítulos de Cache, Middleware, Internacionalización y Seguridad**, encontrarás consejos útiles y que se encuentran vigentes aún hoy en día.

Si quieres aprender Django con los nuevos cambios que ha tenido el framework entra en mi entrada donde hablo del [libro Django for Professionals](/resena-de-django-for-professionals/)

****Conocimientos previos recomendados:**** Python, HTML y CSS  
**Recomendado para leerlo:** 6/10  
**Idiomas:** Inglés, español  
**Notas:** Desactualizado
