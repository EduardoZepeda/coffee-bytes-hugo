---
title: "¿Cómo personalizar el modelo User en Django?"
date: "2022-03-16"
categories: 
  - "django"
coverImage: "images/pin-961667.jpg"
description: "Tutorial para personalizar el modelo User en Django, de donde viene, sus métodos predeterminados y como agregar campos extras o modificar el comportamiento por defecto de los Usuarios"
coverImageCredits: "Créditos de la imagen a pin: https://www.pixiv.net/en/users/961667"
keywords:
  - "django"
  - "python"
authors:
  - Eduardo Zepeda
---

En esta entrada te explico tres métodos para extender o personalizar el modelo _User_ de Django, sin tener que reescribirlo desde cero, y manteniendo todas [las funcionalidades para el manejo de de usuarios de Django.](/es/por-que-deberias-usar-django-framework/)

Pero, antes de empezar, veamos de donde viene el modelo User de Django.

## ¿De donde viene el modelo User de Django?

El modelo _User_ de Django hereda de _AbstractUser_ que, a su vez, hereda de la clase _AbstractBaseUser_.

![Esquema de las clases padre del modelo User de Django. AbstractBaseUser, AbstractUser y User](images/DeDondeVieneAbstractUser.png)

Si miras el código fuente de Django, verás que el **modelo _User_ que usas normalmente no tiene prácticamente ninguna funcionalidad propia**, sino que hereda toda su funcionalidad de _AbstractUser_.

![Captura de pantalla del código del modelo User de Django](images/UserDjango.png "Captura de pantalla del código de Django version 4.0")


Ya que sabemos lo anterior, **podemos usar las clases AbstractUser y AbstractBaseUser para crear nuestros modelos de Usuario personalizados.**

## Heredar de la subclase AbstractUser

Este método es probablemente el más popular para extender el modelo _User_ de Django. Lo anterior debido a que se conserva prácticamente toda la funcionalidad del modelo _User_ original.

```python
# usuarios/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class UsuarioPersonalizado(AbstractUser):
    # Tus propiedades personalizadas
    creditos = models.PositiveIntegerField(verbose_name='creditos',
        default=0, 
        blank=True)
```

Tras crear una clase nueva que herede de _AbstractUser_, necesitamos decirle a Django que queremos usar este nuevo modelo en lugar del modelo de usuario por defecto.

Establecemos este comportamiento en nuestro archivo de configuraciones.

```python
# settings.py
AUTH_USER_MODEL = 'usuarios.UsuarioPersonalizado'
```

### Usar el modelo personalizado en las vistas de cuentas de Django

Si deseamos usar el sistema de plantillas de Django para generar automáticamente un formulario de registro, necesitaremos decirle a Django que use el nuevo modelo de usuario, para esto heredamos un nuevo formulario de la clase *UserCreationForm*, y le pasamos nuestro modelo personalizado, el cual podemos con el método *get_user_model*.

```python
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

User = get_user_model()

class FormularioRegistroUsuarioPersonalizado(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email']
```

Y es todo, podemos usarlo exactamente igual que si usaramos el modelo _User_ que incluye Django.

### El django admin no hashea los passwords

Cuando usamos un modelo de usuario personalizado, necesitamos decirle a Django que maneje los passwords con la funcionalidad del usuario por defecto

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

user = get_user_model()

class CustomUserAdmin(UserAdmin):
    pass

admin.site.register(user, CustomUserAdmin)
```

Ahora el panel de administración se comportará exactamente igual que lo haría con el usuario predeterminado de Django.

### ¿Cómo luce internamente AbstractUser?

Observa como la clase _AbstractUser_ hereda de _AbstractBaseUse_r y tiene múltiples campos disponibles para perfilar un usuario. Además, no puede instanciarse directamente, por ser una clase abstracta.

![Código fuente de la clase AbstractUser  de Django](images/AbstractUserDjango-1.png "Captura de pantalla del código de AbstractUser de Django version 4.0")


Pasemos al segundo método.

### ¿Cómo cambiar el campo de usuario para autenticarse?

Si observas el código anterior, hay una propiedad en mayúsculas llamada _USERNAME_FIELD_, ahí puedes especificar otro campo para que funcione como el usuario.
Como no quieres que haya dos usuarios que se identifiquen de la misma manera ese campo tiene que ser marcado como único. Además de eso tienes que modificar el object manager, el código es algo extenso por lo que no lo colocaré aquí

```python
class UsuarioPersonalizado(AbstractUser):
    identificador = models.CharField(max_length=40, unique=True)
    # ...
    USERNAME_FIELD = 'identificador'
```

## Heredar de la subclase AbstractBaseUser

Esta clase, como puedes apreciar en la imagen anterior, es la clase que se usa de base para crear el _AbstractUser_. Su funcionamiento es el mínimo y solo posee 3 campos:

- password
- last\_login
- is\_active

Solo cuenta con la función de autenticación. Y tienes que indicarle que campo se usará como _username_, para autenticar al usuario.

Este método se suele usar para personalizar completamente el modelo _Use_r o cuando no necesitamos prácticamente ningún campo extra.

```python
# usuarios/models.py
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

class UsuarioPersonalizado(AbstractBaseUser):
    email = models.EmailField(verbose_name='emails', unique=True, max_length=255)
    creditos = models.PositiveIntegerField(verbose_name='creditos',
        default=0, 
        blank=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = []
```

Recuerda indicarle a Django que use tu modelo personalizado en lugar del predeterminado.

```python
# settings.py
AUTH_USER_MODEL = 'usuarios.UsuarioPersonalizado'
```

### ¿Cómo luce internamente AbstractBaseUser?

La siguiente imagen es una captura de pantalla directo del código de Django en su versión 4.0

Como puedes ver, solo cuenta con los 3 campos mencionados, hereda directamente de _models.Model_ y su clase Meta le indica a Python que es un modelo abstracto; no puedes crear instancias directamente de este.

![Código fuente de la clase AbstractBaseUser de Django](images/AbstractBaseUserDjango-1.png "Captura de pantalla del código de AbstractBaseUser de Django version 4.0")

Ahora veamos la tercera manera de extender el model _User_ de Django.

## Crear un perfil para extender el modelo User

Otra manera de extender el modelo user es **crear otro modelo que sirva como un contenedor de los campos extras y luego relacionarlo por un campo _OneToOneField_** con el modelo que recibe por defecto la configuración de Django.

Esta aproximación es ideal si somos el creador de un paquete que necesite personalizar el modelo _User_ del proyecto para funcionar, pero sin modificarlo directamente.

También es útil cuando necesitamos varios tipos de usuarios o perfiles diferentes, con campos distintos entre ellos.

Para crear un perfil de esta manera basta con declarar un campo que relacione nuestro nuevo modelo con el modelo _User_, por medio de un _OneToOneField_.

```python
from django.conf import settings
class Perfil(models.Model):
    # otros campos
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
```

Y para acceder a nuestro usuario, accedemos al campo que lo relaciona con el modelo que creamos.

```python
usuario = User.objects.get(username='usuario')
usuario.perfil
```

## Otros recursos

- [Código fuente original del modelo User de Django](https://github.com/django/django/tree/main/django/contrib/auth)
- [Documentación del modelo User de Django](https://docs.djangoproject.com/en/4.0/topics/auth/customizing/)
