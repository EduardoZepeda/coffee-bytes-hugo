---
aliases:
- /login-con-django-rest-framework-drf//1000
- /en/login-using-django-rest-framework-drf/
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/AutenticacionConDRF.jpg
coverImageCredits: credits https://www.pexels.com/es-es/@sean-manning-214956/
date: '2021-08-17'
description: Implement login and registration of your users in django with the dj-rest-auth
  and django-allauth libraries using tokens and also JWT.
keywords:
- REST
- django
- python
- api
- jwt
title: Login using Django Rest Framework DRF
---

Almost all complex Django applications need views for Login, Logout, reboot and password change, as well as user registration. However, both Django and Django REST Framework (DRF) are completely agnostic about their implementation, and delegate the responsibility for these functions to the users of their frameworks. Fortunately there are libraries that make this task quite simple.

If you are about to develop an API, I have a post with [recommendations on REST API design]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) that can be useful for you.

## User authentication and login with DRF

Meet dj-rest-auth. This library that handles all the heavy lifting of basic user management functions such as login, logout, reset and password change.

### Installation of dj-rest-auth

To use it we install the package using the pipenv virtual environment manager, or your favorite package manager.

```python
pip install dj-rest-auth<=2.1.7
```

Installing dj-rest-auth will also install rest_framework

Then we add our applications to the configuration file

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth']
```

In addition to the changes in the applications, we have to tell rest_framework to allow authentication through Tokens in our application.

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication' 
    ],
}
```

Following the above changes we will run our migrations

```python
python manage.py migrate
```

If everything went well, we add the necessary paths, I have added them to _api/authentication/_, but you can use another path.

{{<ad0>}}

```python
# urls.py
INSTALLED_APPS = [
    # ...
    path('api/authentication/', include('dj_rest_auth.urls')),
]
```

Let's access the path to see that the new endpoints that we have

```bash
admin/
api/authentication/ password/reset/ [name='rest_password_reset']
api/authentication/ password/reset/confirm/ [name='rest_password_reset_confirm']
api/authentication/ login/ [name='rest_login']
api/authentication/ logout/ [name='rest_logout']
api/authentication/ user/ [name='rest_user_details']
api/authentication/ password/change/ [name='rest_password_change']
```

If you read the list above, you will notice that endpoints were added to reset passwords, login, logout, user details and change password. And if we access those urls in the browser we will already see the DRF interface.

{{< figure src="images/DjangoRestFrameworkEndpointLogin.png" class="md-local-image" alt="Pantalla de Loggeo en Django REST framework"  width="1337" height="926" >}}

The login endpoint returns a key to be used as a token.

But we are not finished. Up to this point we can manage users but not create them. For that we will use the following library.

{{<ad1>}}

## User registration with DRF

We will use another library, this time called django-allauth.

### Installing django-allauth

Like the previous library, we are going to install it.

{{<ad2>}}

```bash
pip install django-allauth~=0.42.0
```

After installation we add our application to the project. django-all-auth requires the _django.contrib.sites_ application to be in our INSTALLED_APPS in the configuration file.

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'django.contrib.sites',
    'allauth', 
    'allauth.account', 
    # 'allauth.socialaccount' # si queremos implementar autenticación usando redes sociales
]
```

Since we added the _django.contrib.sites_ package, django will need us to add a SITE_ID variable to the configuration file. We will also add the terminal EMAIL_BACKEND already provided by django, so that each email will be displayed in the terminal.

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' 
SITE_ID = 1
```

Now, as our application has models, it is a good idea to run the migrations again.

{{<ad3>}}

```bash
python manage.py migrate
```

If everything went well let's add the new registration url, I have put _api/registration/_, but you can set the one you like.

```python
# urls.py
INSTALLED_APPS = [
    # ...
    path('api/registration/', 
          include('dj_rest_auth.registration.urls')),
]
```

### User registration

Now we will have an extra endpoint that allows user registration.

{{< figure src="images/DjangoRestFrameworkEndpointRegistro.png" class="md-local-image" alt="Django REST Framework registration screen"  width="1341" height="838" >}}

User registration screen in the DRF interface

If we register through the browser, filling out the form, we will receive a token in response:

{{< figure src="images/DjangoRestFrameworkEndpointToken.png" class="md-local-image" alt="DRF session token obtained after a user's login"  width="1235" height="499" >}}

Session token obtained after logging in a user

This token is the one that will allow us to authenticate ourselves, let's try to use this token with the curl command to access the user's profile.

```bash
curl -H "Authorization: Token c66ff3d7d3b4c434ce4d9a1ae0d640fc64d0a8bd" http://127.0.0.1:8000/api/authentication/user/
{"pk":1,"username":"Karenina","email":"Karenina@karenina.com","first_name":","last_name":"}
```

As you saw, we can already use the token we have to get a response from the protected views.

## Authentication and login using JWT in Django

dj-rest-auth also supports JWT. To use JWTs we will install the djangorestframework-simplejwt library

If you don't know what JWT is or you want to go deeper into the subject, I have a post where I explain the details of [django authentication using JWT](/en/django/django-rest-framework-and-jwt-to-authenticate-users/) And as a counterpart, I also have a translation of stop using JWT for sessions, where I explain why it might not be such a good idea to use JWT for sessions.

```bash
pip install djangorestframework-simplejwt
```

We add the authentication backend in the DRF settings and tell it to use JWT in our _settings.py_ file.

```python
# settings.py
REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    )
    ...
}

REST_USE_JWT = True
```

In this same file we indicate how the refresh and authentication cookies will be called.

```python
# settings.py
JWT_AUTH_COOKIE = 'jwt-auth-token'
JWT_AUTH_REFRESH_COOKIE = 'jwt-refresh-token'
```

After obtaining the refresh and authentication tokens, by logging into our endpoint, we can use them to authenticate with the header "Authorization: Bearer <Access token>".

{{< figure src="images/DjangoRestFrameworkJWT.png" class="md-local-image" alt="After logging in a user we get the refresh and authentication or access JWT"  width="1203" height="988" >}}

After logging in a user we obtain the refresh and authentication or access JWT.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4MjE5NDU1LCJqdGkiOiJhMTI3MGZjMDc5Nzc0MDkzYjM1NThkMjQzYThmYjFiMyIsInVzZXJfaWQiOjN9.vfVSYubOvNTw0iJxnPZ3BTOiFhw17aHX7OWFvscpOQU" http://127.0.0.1:8000/api/authentication/user/
{"pk":1,"username":"Karenina","email":"Karenina@karenina.com","first_name":","last_name":"}
```

Also note that we already have two new routes added in our api.

```bash
api/authentication/ token/verify/ [name='token_verify']
api/authentication/ token/refresh/ [name='token_refresh']
```

As always, remember to check the documentation for [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/) and [dj-allauth](https://django-allauth.readthedocs.io/en/latest/) for more details.

## Other authentication libraries in Django

In addition to dj-rest-auth and dj-allauth, there are other libraries for authenticating users, such as djoser and knox. I leave you a link where you can see a [complete tutorial on youtube](https://www.youtube.com/watch?v=0gRea2RtheM) that explains how to use these two libraries.