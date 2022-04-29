---
title: "¿Cómo crear un comando en django?"
date: "2021-01-21"
categories: 
  - "django"
coverImage: "images/Como-crear-comando-django.jpg"
keywords:
  - django
  - python
---

Has usado Django antes ¿no? Entonces, ya usaste algún comando de Django, pudo haber sido makemigrations, migrate, startproject, startapp algún otro. Pero, ¿alguna vez has creado alguno? Quizás no. Sigue leyendo para aprender como.

Si nunca has usado django visita [mi lista de reseñas de libros](https://coffeebytes.dev/libros-que-he-leido-y-resenas/), donde opino sobre varios libros de django.

## Crear un comando en django

Para crear un comando de django basta con crear una carpeta llamada _management_ en el mismo nivel que tu archivo _manage.py_

```bash
mkdir management
```

Posteriormente, hay que crear una carpeta llamada commands dentro de esa carpeta

```bash
cd management/
mkdir commands
```

Ahora nos posicionamos dentro de esa carpeta y creamos un archivo con el nombre de nuestro comando

```bash
cd commands/
touch tucomando.py
```

Dentro de esta archivo crearemos una clase llamada _Command_ que herede de _BaseCommand_, con un método llamado _handle_.

```python
# management/command/tucomando.py
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def handle(self, *args, **options):
         pass
```

Dentro del método _handle_ colocaremos el código que se ejecutará cuando usemos nuestro comando.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def handle(self, *args, **options):
         self.stdout.write(self.style.ERROR("Texto de error"))
         self.stdout.write(self.style.WARNING("Texto de advertencia"))
```

Para mostrar texto en la terminal usaremos _self.stdout.write_ para imprimir texto en la salida estándar. Podemos seleccionar entre varios estilos de acuerdo a lo que queramos mostrar.

## Añadir argumentos al comando

Django usa la famosa librería [argparse](https://docs.python.org/3/library/argparse.html) de Python para manejar los argumentos en sus comandos

### Argumentos posicionales

Podemos añadir **argumentos posicionales** al comando usando el método _add\_argument_ de _parser_.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def add_arguments(self, parser):
        parser.add_argument('email', nargs='+', type=str)
```

Especificamos el nombre del argumento posicional como primer argumento, luego la cantidad de argumentos que recibirá. El símbolo '+' establece que esos argumentos serán colocados en una lista, mientras que _type_ es el tipo de valores que recibirá el argumento.

Seguramente ya habrás notado que la función handle recibe _\*args_ y _\*\*options_ como argumento. Bien, pues podemos acceder a los valores a través del diccionario _options_.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def add_arguments(self, parser):
        parser.add_argument('email', nargs='+', type=str)

    def handle(self, *args, **options):
        # options['email'] es una lista
        send_emails(options['email'])
```

### Argumentos opcionales

¿Y si yo quiero argumentos opcionales? Pues sí, también es posible.

La clase _Command_, a través de su parser, también nos permite usar argumentos opcionales.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def add_arguments(self, parser):

        # Named (optional) arguments
        parser.add_argument(
            '--file',
            nargs='?',
            const='logo.svg',
            type=str,
            help='texto de ayuda',
        )

    def handle(self, *args, **options):
        if options['file'].endswith('.svg'):
            process_svg()
```

Ahora seguramente te estarás preguntando que significan todos esos argumentos que le pasamos a _add\_argument_.

Ahora mismo te lo digo:

- **Prefijo '--'**: le dice a Argparse que es un argumento opcional
- **nargs**: indica la cantidad de valores que puede recibir nuestro argumento, el simbolo '+' en este caso es para uno o ninguno.
- **const:** es el valor a usar si no especificamos ningún valor para el argumento.
- **type:** nos dice el tipo de dato que espera nuestro argumento.
- **help:** es el texto de ayuda a mostrar.

## Ejecutar el comando

¿Y para ejecutarlo? Fácil; justo como lo harías con cualquier otro comando de django.

```bash
python manage.py tucomando
# con un argumento posicional
python managa.py tucomando email admin@example.org
# o con un argumento opcional
python manage.py tuotrocomando --file=tuarchivo.svg
```

Listo, si te leiste esto completo, ahora conoces lo básico de la creación de comandos de django. Pero no te quedes solo con esto, visita [la documentación oficial de django](https://docs.djangoproject.com/en/3.1/howto/custom-management-commands/) para profundizar más.
