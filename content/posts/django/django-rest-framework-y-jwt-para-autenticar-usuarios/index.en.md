---
aliases:
- /django-rest-framework-and-jwt-to-authenticate-users/
- /django-rest-framework-y-jwt-para-autenticar-usuarios//1000
- /django-rest-framework-y-jwt-para-autenticar-usuarios/feed/
- /django-rest-framework-y-jwt-para-autenticar-usuarios/jwt/
- /en/django-rest-framework-and-jwt-to-authenticate-users/
authors:
- Eduardo Zepeda
categories:
- django
- javascript
coverImage: images/JWT.jpg
coverImageCredits: Credits to https://www.pexels.com/es-es/@iamikeee/
date: '2021-06-14'
description: Learn how to implement basic authentication in Django using JWT and Django
  Rest Framework via access and refresh tokens.
keywords:
- django
- jwt
- REST
- api
- drf
- authentication
- tokens
title: Django Rest Framework and JWT to authenticate users
---

JWTs (JSON Web Tokens) have become extremely popular, some even consider them a replacement for the classic tokens used by other frameworks, such as the Django Rest Framework. Using JWT or regular tokens (SWT) allows you to store all your session information directly on the token and they are also cryptographically signed, sounds good doesn't it? 

## What is JWT?

JWT is a standard for the creation of JSON-based access tokens for the exchange of information between two parties. These tokens, and their content, can be verified because they are digitally signed. This cryptographic signature guarantees **that the content has not been altered and that the issuer is who they say they are**. This makes them perfect for:

* Authorization
* Exchange of information

### What advantage do JWTs have over tokens?

As I mentioned to you, the JWT can store all session information, instead of storing it on the server. This allows you to save a lot of space on the server, especially if your site handles a huge amount of users.

{{<ad>}}

## Structure of a JWT Token

A JWT (JSON Web Token) is divided by points into three parts:

1. The algorithm that was used.
2. The information contained in the token.
3. The cryptographic signature.

{{< figure src="images/JWTDjango.png" class="md-local-image" alt="Parts of a JWT: header, content and signature" caption="Structure of a JWT: Algorithm, content and signature" >}}

Note how we can use the central part to store arbitrary content that we want, such as a user's session data or other information that we consider pertinent.

## Installation of JWT in Django

First we are going to install the necessary libraries: djangorestframework and djangorestframework_simplejwt, the first one to create and manage our [API REST](/en/software-architecture/basic-characteristics-of-an-api-rest-api/) in Django and the second one to manage the JWTs.

To install them we can use [the virtual environment manager called Pipenv](/en/python/pipenv-the-virtual-environment-manager-you-dont-know/), Poetry or whatever you want. You can also use pip.

```python
pip install djangorestframework_simplejwt djangorestframework
```

Be sure to add the applications you install to the INSTALLED_APPS variable.

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework_simplejwt'
]
```

We add the authentication class to our configuration file.

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

Remember to run the migrations and create a super user, if you can create a couple of accounts through the admin they would also be useful.

```python
python manage.py migrate
python manage.py createsuperuser
```

Let's add the urls we need to generate our JWTs in Django

```python
# urls.py
# ...
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
```

The first view **will return a pair of tokens**; an access token and a refresh token. The second view will be used to refresh or update the access token.

Let's also create a protected view that is accessible only to authenticated users. For simplicity I have put the protected function inside the same _urls.py_ file.

```python
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class Protected(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"content": "This view is protected"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', Protected.as_view(), name='protected')
]
```

If we try to make a request to the url _/protected/_ it will warn us that we are not sending the proper authentication credentials.

```bash
curl http://127.0.0.1:8000/protected/ {"detail":"Authentication credentials were not provided."}
```

If you don't know how to use curl check my [basic GNU/Linux commands](/en/linux/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/) entry where I explain the basics. You can also use Postman, http or any other option.

## Get JWT tokens in Django

If we now make a POST request to the url _/api/token/_, sending a valid username and password we will get a pair of tokens in response. I used a user that I created, but you can use your superuser or create one.

```bash
curl -d "username=kyoko&password=contrasenasegura" -X POST http://localhost:8000/api/token/

{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzQ0NjEzNiwianRpIjoiMjcyOTI0OTkwOGVhNGQ2ZjkxMDFiMGI4ZjhlZDZkY2QiLCJ1c2VyX2lkIjoyfQ.zkCWbKBnkDCukZVB8cHiCnrUOHRl1vWF6Oqg29IFT7A",
"access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMzYwMDM2LCJqdGkiOiIzYzY2MDI3YzhiMjE0NmM4OGQ5NTY0MGUxYzc1ODAxYSIsInVzZXJfaWQiOjJ9.juG7sbemKUOTEnzNv4XiXCfChrG3q9wBw4Sj0g1L9EM"}
```

{{< figure src="images/JWTApiEndPoint.png" class="md-local-image" alt="Django REST Framework screen, username and password requested" caption="Django REST Framework screen, username and password requested" >}}

### Access token in JWT

The access token would be the equivalent of the DRF access token; we will use this JWT to authenticate ourselves to Django; that is, to tell Django who we are.

### Update token in JWT

The access token **has an expiration date, once this date arrives it will no longer be valid**, we can create another one without the need to send our username and password using **only the update token**.

## JWT Token Content

If you decode the token, you will be able to obtain its contents. I have already done it here for you.

{{< figure src="images/JWTDjangoContenido.png" class="md-local-image" alt="Parts of a JWT: header, content and signature" >}}

Notice how in the content part (data) you can see that the _user_id_ is equal to 2, which is the id or primary key of the user who obtained the token. The first user in my case is the superuser.

## Authentication with Django and JWT

Now let's try to use the access token we obtained to access the protected view. Make sure you are using the _"access"_ token, not the _"refresh"_ token.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzxOTA5MmY4ZTJhNzNkZDM3YyIsInVzZXJfaWQiOjJ9.ibQPgQuEgnuTY6PGja-GLZv4TrAQtKKCgue_muJKlE4" http://127.0.0.1:8000/protected/ {"content":"Esta vista está protected"}
```

## Expiration of a JWT

If you followed the example and let a few minutes pass you will notice that the access token expires and will no longer be valid. **The access token has a default duration of 5 minutes**, this is to avoid problems if someone manages to intercept it.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzxOTA5MmY4ZTJhNzNkZDM3YyIsInVzZXJfaWQiOjJ9.ibQPgQuEgnuTY6PGja-GLZv4TrAQtKKCgue_muJKlE4" http://127.0.0.1:8000/protected/ {"detail":"Given token not valid for any token type","code":"token_not_valid","messages":[{"token_class":"AccessToken","token_type":"access","message":"Token is invalid or expired"}]}
```

## Update access token

To obtain another valid token, we simply send our update token to the endpoint we created in _/api/token/refresh/_. **The update token has a default duration of 24 hours ** After 24 hours we will no longer be able to refresh the access token and we will have to send a username and password again.

```bash
curl -d "refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzQ0NjEzNiwianRpIjoiMjcyOTI0OTkwOGVhNGQ2ZjkxMDFiMGI4ZjhlZDZkY2QiLCJ1c2VyX2lkIjoyfQ.zkCWbKBnkDCukZVB8cHiCnrUOHRl1vWF6Oqg29IFT7A" -X POST http://127.0.0.1:8000/api/token/refresh/ {"access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMzY1NDU3LCJqdGkiOiJlZjljNWFiYjI1MzU0YWJjYjc4YWRmNTI2MDA2OTEwNCIsInVzZXJfaWQiOjJ9.RPrfobpIF52W0wdNJk4zLYcgWpymZdgAPFxOIH0KEsk"}
```

Our application will return a new access token that we can use again to authenticate ourselves.

## Modify the default values of the JWTs

To do this we go to the Django configuration file and create a variable called SIMPLE_JWT, in which we can overwrite the data we want and place the duration that suits you best.

```javascript
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # ...}
```

Please check [the official django-rest-framework-simplejwt documentation](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html#refresh-token-lifetime) for all the configuration variables for your JWTs in Django.

## Problems with JWTs

Not everything is a bed of roses when dealing with JSON Web Tokens. You probably don't want your users to be entering username and password every time they use your application, you probably want to keep the values of these two tokens for later use and you are wondering which is the right choice, Local Storage or in the cookies?

Well, the question brings a series of very difficult questions to answer that divide the opinions of the developers and leave us without a clear answer:

How do I deal with a JWT with outdated information or permissions? What is the best way to invalidate a JWT on an external server or change the cryptographic key? What if the information I store in the JWT exceeds the size allowed per cookie? If instead of saving content in the JWT I only save the user ID, isn't that the same as a cookie?