---
title: "¿Para qué sirve Django genericForeignkey?"
date: "2021-02-22"
categories: 
  - "django"
coverImage: "images/DjangoGenericForeignKey.jpg"
coverImageCredits: "Créditos https://www.pexels.com/es-es/@weekendplayer/"
description: "Aprende a usar ContentType y el tipo de campo genericForeignKey en Django para relacionar un objeto con diferentes tipos de modelo."
keywords:
  - python
  - django
  - orm
authors:
  - Eduardo Zepeda
---

Quieres usar Django para relacionar un modelo con otro usando una llave foránea, pero el modelo que quieres relacionar es uno diferente para cada entrada de la base de datos. Django ofrece una solución a tu problema, una llave foránea genérica llamada genericForeignKey y el modelo ContentType, del que ya hable anteriormente.

El tipo de campo genericForeignkey es capaz de enlazar a diferentes tipos de modelos, lo que nos permite relacionar cualquier otro modelo con el nuestro. ¿Recuerdas que en la entrada anterior hablé de ContentType? Pues ahora sí le daremos una aplicación práctica. Si quieres repasar un poco lo anterior, visita mi entrada donde hablo de [ContentType en Django](/es/que-hace-la-aplicacion-contenttype-en-django/)

## El campo genericForeignKey

Imagina un historial de actividades que lleve registro de lo que hace cada usuario: subir un video, borrar una canción, darle like a una publicación, etc. El objetivo de la acción de cada usuario será un modelo distinto cada vez, por lo que podemos usar genericForeignKey para crear nuestro historial.

```python
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth.models import User

class ActivityStream(models.Model)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=128)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
```

A continuación te explico cada campo de nuestro modelo:

- **user**: es una llave foranea normal. Es únicamente para saber a que usuario pertenece la actividad. Además, al ser una llave foránea, es obligatorio indicar que sucederá si se borra el modelo User con _on\_delete_.
- **action**: será la acción del usuario, es solo una cadena de texto con el nombre de la actividad, podemos limitarlo a opciones, pero aquí lo dejaré abierto.
- **content\_type**: es el modelo al que hacemos referencia, el mismo que está guardando en la tabla _ContentType_ que crea Django automáticamente. Además, al ser una llave foránea, es obligatorio indicar que sucederá si se borra el modelo _ContentType_ con _on\_delete_.
- **object\_id**: la llave primaria o identificador del objeto al que haremos referencia.
- **item**: es una abstracción que te permite acceder directamente al objeto que hacemos referencia con _content\_type_ y object\_id; **este campo no existe en la base de datos.**

## Creación de un objeto

Ahora, para crear un objeto, **basta con que le pasemos la instancia de un objeto al campo item**, los campos _content\_type_ y _object\_id_ se llenarán automáticamente. El resto es exactamente igual que cuando guardas cualquier instancia de un objeto en la base de datos.

```python
from django.contrib.auth.models import User
from tuApp.models import tuModelo # Aquí va el modelo de tu app

usuario = User.objects.get(id=1) # Reemplazalo por lo que quieras
modelo = tuModelo.objects.get(id=1) # Reemplazalo por lo que quieras
activity = ActivityStream(user=user, action="accion", item=modelo)
activity.save()
```

Listo, si ahora revisamos el modelo que acabamos de crear, notarás que los campos _content\_type_ y _object\_id_ se han llenado automáticamente.

```bash
activity.object_id
1
activity.content_type
<ContentType: tuModelo | tuModelo>
```

Ahora puedes usar ese objeto para llevar a cabo un stream de actividades, un historial o lo que tú prefieras.

Recuerda que si quieres ahondar más en el tema puedes visitar [la documentación oficial de Django](https://docs.djangoproject.com/en/3.1/ref/contrib/contenttypes/).
