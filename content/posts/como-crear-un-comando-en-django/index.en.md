---
title: "How to create a command in django?"
date: "2021-01-21"
categories:
- "django"

coverImage: "images/Como-crear-comando-django.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@pixabay/"
description: "I explain how to create a command from django, the Python web development framework, using positional and optional arguments from scratch."
keywords:
- django
- python

authors:
- Eduardo Zepeda
---

You have used Django before, haven't you? So, you already used some Django command, it could have been makemigrations, migrate, startproject, startapp or some other. But have you ever created any? Maybe you haven't. Read on to learn how.

## Create a command in django

To create a django command just create a folder called _management_ at the same level as your _manage.py_ file.

```bash
mkdir management
```

Subsequently, create a folder called commands inside this folder

```bash
cd management/
mkdir commands
```

Now we position ourselves inside that folder and create a file with the name of our command

```bash
cd commands/
touch tucomando.py
```

Inside this file we will create a class called _Command_ that inherits from _BaseCommand_, with a method called _handle_.

```python
# management/command/tucomando.py
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def handle(self, *args, **options):
         pass
```

Inside the _handle_ method we will place the code that will be executed when we use our command.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def handle(self, *args, **options):
         self.stdout.write(self.style.ERROR("Texto de error"))
         self.stdout.write(self.style.WARNING("Texto de advertencia"))
```

To display text on the terminal we will use _self.stdout.write_ to print text to standard output. We can select from several styles according to what we want to display.

## Add arguments to the command

Django uses Python's famous [argparse](https://docs.python.org/3/library/argparse.html) library to handle the arguments in its commands

### Positional arguments

We can add **positional arguments** to the command using the _add_argument_ method of _parser_.

```python
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'help text'

    def add_arguments(self, parser):
        parser.add_argument('email', nargs='+', type=str)
```

We specify the name of the positional argument as the first argument, then the number of arguments it will receive. The '+' symbol states that those arguments will be placed in a list, while _type_ is the type of values the argument will receive.

You have probably already noticed that the handle function takes _*args_ and _**options_ as arguments. Well, we can access the values through the _options_ dictionary.

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

### Optional arguments

What if I want optional arguments? Yes, that is also possible.

The _Command_ class, through its parser, also allows us to use optional arguments.

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

Now you are probably wondering what all those arguments we pass to _add_argument_ mean.

I'll tell you right now:

** **Prefix '--'**: tells Argparse that it is an optional argument.
** **nargs**: indicates the number of values our argument can receive, the '+' symbol in this case is for one or none.
** **const:** is the value to use if we do not specify any value for the argument.
* type:** tells us the type of data our argument expects.
* **help:** is the help text to display.

## Execute the command

And to execute it? Easy; just like you would any other django command.

```bash
python manage.py tucomando
# con un argumento posicional
python managa.py tucomando email admin@example.org
# o con un argumento opcional
python manage.py tuotrocomando --file=tuarchivo.svg
```

There, if you've read the whole thing, you now know the basics of creating django commands. But don't stop there, visit [the official django documentation](https://docs.djangoproject.com/en/3.1/howto/custom-management-commands/) to learn more.