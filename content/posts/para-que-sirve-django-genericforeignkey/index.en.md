---
title: "What is Django genericForeignkey for?"
date: "2021-02-22"
categories:
- "django"

coverImage: "images/DjangoGenericForeignKey.jpg"
coverImageCredits: "credits https://www.pexels.com/es-es/@weekendplayer/"
description: "Learn how to use ContentType and the genericForeignKey field type in Django to relate an object to different model types."
keywords:
- python
- django
- orm

authors:
- Eduardo Zepeda
---

You want to use Django to relate one model to another using a foreign key, but the model you want to relate is a different one for each database entry. Django offers a solution to your problem, a generic foreign key called genericForeignKey and the ContentType model, which I talked about earlier.

The genericForeignkey field type is able to link to different types of models, allowing us to relate any other model to ours. Remember in the previous post I talked about ContentType? Well, now we will give it a practical application. If you want to review the previous post, visit my post where I talk about [ContentType in Django](/what-does-the-contenttype-application-in-django/)

## The genericForeignKey field

Imagine an activity feed that keeps track of what each user does: uploading a video, deleting a song, liking a post, and so on. The target of each user's action will be a different model each time, so we can use genericForeignKey to create our feed.

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

Below I explain each field of our model:

**user**: it is a normal foreign key. It is only to know to which user the activity belongs. Also, being a foreign key, it is mandatory to indicate what will happen if the User model is deleted with _on_delete_.
**action**: will be the action of the user, it is only a text string with the name of the activity, we can limit it to options, but here I will leave it open.
** **content_type**: it is the model to which we make reference, the same that is storing in the _ContentType_ table that Django creates automatically. Also, being a foreign key, it is mandatory to indicate what will happen if the _ContentType_type is deleted with _on_delete_.
* object_id**: the primary key or identifier of the object to which we will refer to.
** **item**: is an abstraction that allows you to directly access the object we make reference to with _content_type_ and object_id; **this field does not exist in the database**.

## Creation of an object

Now, to create an object, **just pass the instance of an object to the item field**, the _content_type_ and _object_id_ fields will be filled automatically. The rest is exactly the same as when you store any instance of an object in the database.

```python
from django.contrib.auth.models import User
from tuApp.models import tuModelo # Aquí va el modelo de tu app

usuario = User.objects.get(id=1) # Reemplazalo por lo que quieras
modelo = tuModelo.objects.get(id=1) # Reemplazalo por lo que quieras
activity = ActivityStream(user=user, action="accion", item=modelo)
activity.save()
```

Ready, if we now review the template we just created, you will notice that the _content_type_ and _object_id_ fields have been filled automatically.

```bash
activity.object_id
1
activity.content_type
<ContentType: tuModelo | tuModelo>
```

Now you can use this object to carry out a stream of activities, a history or whatever you prefer.

Remember that if you want to go deeper into the subject you can visit [the official Django documentation](https://docs.djangoproject.com/en/3.1/ref/contrib/contenttypes/).