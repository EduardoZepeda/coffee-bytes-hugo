---
aliases:
- /en/how-to-upload-multiple-images-in-django/
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/como-usar-django-para-subir-multiples-imagenes.jpg
coverImageCredits: Credits to https://www.pexels.com/@cottonbro/
date: '2021-03-30'
description: Learn how to handle uploading multiple images in Django and returning
  them in JSON format, ideal for consuming an API.
keywords:
- python
- django
title: How to upload multiple images in Django
---

You probably already know how to upload an image using a Django model, but what if we don't want to upload one but multiple images?

## Django installation

First we install Django using pipenv. We will also install Pillow since we will be dealing with images.

```bash
pip install django Pillow
```

Next we will create a new project and enter the newly created folder.

If you don't know GNU/Linux commands I have a series of entries [with the most used GNU Linux commands](/en/linux/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp//)

```bash
django-admin startproject yourproject
cd yourproject/
```

Next, let's create an application, and name it gallery.

```bash
django-admin startapp gallery
```

Remember to install the new application we created in the _settings.py_ file.

```python
# settings.py
INSTALLED_APPS = [
    # ...,
    'gallery'
]
```

{{<ad>}}

## Creation of a model

Inside our application named _gallery_, we are going to create a model with an Image field.

```python
from django.db import models

class gallery(models.Model):
    image = models.ImageField()
```

Let's run the migrations so that the changes in our application are reflected in the database.

```bash
python manage.py migrate
```

## Adding templates

Next, let's create a folder called _templates_ to host our template with the form.

```bash
mkdir templates
cd templates
touch index.html
```

Let's add the _templates_ location to the TEMPLATES configuration of our configuration file; _settings.py_.

```python
# settings.py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

## A form to upload multiple images in Django

To make our input accept multiple images we add the _multiple_ attribute to our _input_ field.

Remember to add the POST method and the **_{% csrf_token %}_** tag so that your form is protected.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  <form method="POST" enctype="multipart/form-data">
    {% csrf_token %}
  <input type="file" name="images" multiple>
  <button type="submit">Send</button>
</form>    
</body>
</html>
```

## Creating a view uploading multiple images in Django

Now in our gallery application, let's modify the views file to create the view that will handle our image upload.

```python
from django.http import JsonResponse
from django.shortcuts import render
from .models import gallery

def handleMultipleImagesUpload(request):
    if request.method == "POST":
        images = request.FILES.getlist('images')

        for image in images:
            gallery.objects.create(image = image)

        uploaded_images = gallery.objects.all()
        return JsonResponse({"images": [{"url": image.image.url} for image in uploaded_images]})
    return render(request, "index.html")
```

If we make a POST request to this view we will get the list of images we uploaded, then we will create a new object for each image we uploaded and return the list of images with their respective url as a JSON response. Otherwise we will render the form and return it.

With the view already created, just add the url to our _urls.py_ file in our project folder.

## Adding the url

To facilitate the process we will import the view directly and assign it to the _upload/_ url

```python
# urls.py
from django.contrib import admin
from django.urls import path
from gallery.views import handleMultipleImagesUpload

urlpatterns = [
    path('upload/', handleMultipleImagesUpload, name="home"),
    path('admin/', admin.site.urls),
]
```

If we now access the _upload/_ address we will see our upload button and we will be able to upload multiple images.

{{< figure src="images/subida-multiple-de-imagenes.gif" class="md-local-image" alt="multiple-image-upload in django" >}}

If the upload was successful we will get as a response a JSON with the addresses of the images we just uploaded.

Here we use Django to render the form. However, as you may know, instead of rendering a form, you can constrain the function to act as an API. And then consume it by making a POST request with javascript.

Finally, if you want to go deeper into the functionality of Django's _ImageField_ fields, check out [the official documentation](https://docs.djangoproject.com/en/3.1/ref/models/fields/)