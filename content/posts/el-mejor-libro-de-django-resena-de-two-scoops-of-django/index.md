---
title: "El mejor libro de Django, reseñaaá de Two Scoops of Django"
date: "2020-05-02"
categories: 
  - "django"
coverImage: "Two_scoops_of_django.jpg"
keywords:
  - django
  - python
  - libros
  - opinion
  - reseña
---

Esta entrada es una reseña de Two scoops of Django, el que yo considero **el mejor libro de Django**. Es un libro totalmente imprescindible si te dedicas al desarrollo de aplicaciones usando Django. Probablemente ya lo has escuchado nombrar, ya que es un libro bastante popular entre los desarrolladores angloparlantes.

Este es uno de esos libros que tienen personalidad, desde el momento en que lo tomas y ves las ilustraciones de helados en la portada sabes que los autores le han puesto todo el esfuerzo posible para que valga cada centavo que pagaste por él. Además cada capítulo del libro está acompañado de agradables ilustraciones de helados, que te harán más amena la lectura y te ayudarán a recordar el contenido.

## Este es un libro para usuarios intermedios/avanzados

Two Scoops of Django no intenta enseñarte el funcionamiento general de Django, tampoco pretender ser un tutorial paso por paso para la creación de un proyecto. Two Scoops of Django es un manual de buenas prácticas de Django que va desde la homogenización del acomodo de carpetas hasta el despliegue de las aplicaciones usando sistemas automatizados, pasando por consejos y buenas prácticas en el uso de modelos, funciones, urls, plantillas, etc.

Sin embargo este no es un libro para quienes buscan un primer contacto con Django. El libro da por hecho que no es la primera vez que usas Django o Python y que entiendes todo el proceso que ocurre desde que empiezas a escribir código de Django hasta que lo llevas a un servidor. Los autores te mostrarán las buenas prácticas que ellos han adquirido a lo largo de los años, y te mostrarán los antipatrones que, ellos consideran, debes evitar.

## Contenido de Two Scoops of Django

El temario del libro está bastante completo y puedes estar seguro de que tocan todos los temas importantes. Aquí te dejo una lista de algunos temas que se tratan en el libro:

- Cuando usar desnormalización en tu base de datos
- Maneras de estructurar las carpetas de tu proyecto
- Como manejar cambios de versión en una API
- Como optimizar queries de base de datos
- Organizar tus dependencias de Pip
- Que hacer cuando no puedes manejar variables de entorno en tu sistema de desarrollo
- Uso correcto de logging para monitorear eventos

Para finalizar el libro, los autores compartirán contigo las librerías que ellos utilizan en cada uno de sus desarrollos como parte de su flujo de trabajo y ordenadas por tema, algunas de ellas son: python-magic, circus, django-kevin, Twine, django-watson, etc. Sus recomendaciones también se extienden a los libros; en otra sección del apéndice aparece una lista de los libros de Django y Python que recomiendan los autores, organizados por niveles; básico o intermedio/avanzado.

## El eje central del libro son las buenas prácticas

Como ya mencioné, el libro se centra en las buenas prácticas de Django. Para que le des una pequeña probadita a lo que encontrarás en el libro te dejo algunos ejemplos basados en las recomendaciones que puedes encontrar en el interior del libro.

```python
# NO HAGAS ESTO 
from models.gamer import Gamer

gamers_to_email = []
for gamer in Gamer.objects.iterate():
    if gamer.games_bought > gamer.finished_games:
        gamers_to_email.append(gamer)
```

¿Es obvio porqué no es buena práctica? Ahora echa un vistazo a este:

```python
# NO HAGAS ESTO 
from django.forms import *
from django.db.models import *
```

Este de aquí es bastante similar a un ejemplo que aparece en la documentación de Django

```python
# NO HAGAS ESTO 
def videogame_display(request, videogame_id):
    videogame = get_object_or_404(Videogame, id=videogame_id)
    date = timezone.now()
    return render(request, 'videogame_display.html', locals())
```

Los ejemplos anteriores representan pedazos de código **totalmente funcionales**, pero que, por su estructura, puede llegar ocasionar bugs, bajo rendimiento, problemas más serios en un futuro o simplemente representar fricción en el proceso de desarrollo del código.

## Un libro que se actualiza constantemente

Muchos autores de libros de Django abandonan sus obras y, con el pasar de los años estas se desactualizan (como le paso a The Definitive Guide to Django). Los autores de este libro no entran en esta categoría, actualizan constantemente el contenido de su obra y ponen a disposición versiones actualizadas cada cierto tiempo. Ahora mismo están trabajando en la [versión para Django 3.0](https://www.feldroy.com/products/two-scoops-of-django-3-x) de este mismo libro (pretendo adquirirlo próximamente), el cual ya está a la venta en su versión alpha, aunque, por ahora, únicamente en formatos digitales.

****Conocimientos previos recomendados:**** HTML, CSS, Python, Django, REST, Base de datos  
**Recomendado para leerlo:** 10/10  
**Idiomas:** Inglés, español (Estará disponible para la última versión)

Si quieres leer sobre más libros para aprender Django [entra en mi reseña de Django for Professionals](https://coffeebytes.dev/resena-de-django-for-professionals/).
