---
aliases:
- /login-con-django-rest-framework-drf
- /tutorial-login-y-registro-con-django-rest-framework-drf-y-jwt
authors:
- Eduardo Zepeda
categories:
- django
coverImage: images/AutenticacionConDRF.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@sean-manning-214956/
date: '2021-08-17'
description: Tutorial para implementar login y registro usuarios en django con las
  librerías dj-rest-auth y django-allauth usando JWT y también tokens normales
keywords:
- REST
- django
- python
- api
- jwt
title: Tutorial Login y Registro con Django Rest Framework DRF y JWT
url: login-con-django-rest-framework-drf
---

Casi todas las aplicaciones complejas en Django necesitan vistas para Login, Logout, reinicio y cambio de contraseñas, así como registro de usuarios. Sin embargo tanto Django como Django REST Framework (DRF) se muestran completamente agnósticos respecto a su implementación, y delegan la responsabilidad de esas funciones en los usuarios de sus frameworks. Afortunadamente hay librerías que vuelven bastante sencilla esa tarea.

Si estás por desarrollar una API, tengo una entrada con [recomendaciones sobre diseño de APIs REST](/es/caracteristicas-basicas-de-una-api-rest/) que puede servirte bastante.

## Autenticación y login de usuarios con DRF

Te presento a dj-rest-auth. Esta librería que se encarga de todo el trabajo pesado de las funciones básicas de manejo de usuarios tales como login, logout, reinicio y cambio de contraseñas.

### Instalación de dj-rest-auth

Para usarlo instalamos el paquete usando el administrador de entornos virtuales pipenv, o tu gestor favorito de paquetes.

```python
pipenv install dj-rest-auth<=2.1.7
```

La instalación de dj-rest-auth también instalará rest\_framework

Posteriormente agregamos nuestras aplicaciones al archivo de configuraciones

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth']
```

Además de los cambios en las aplicaciones, le tenemos que decir a rest\_framework que permita la autenticación por medio de Tokens en nuestra aplicación.

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

Tras los cambios anteriores correremos nuestras migraciones

```python
python manage.py migrate
```

Sí todo salió bien, agregamos las rutas necesarias, yo las he agregado a _api/authentication/_, pero tú puedes usar otra ruta.

```python
# urls.py
INSTALLED_APPS = [
    # ...
    path('api/authentication/', include('dj_rest_auth.urls')),
]
```

Accedamos a la ruta para ver que los nuevos endpoints que tenemos

```bash
admin/
api/authentication/ password/reset/ [name='rest_password_reset']
api/authentication/ password/reset/confirm/ [name='rest_password_reset_confirm']
api/authentication/ login/ [name='rest_login']
api/authentication/ logout/ [name='rest_logout']
api/authentication/ user/ [name='rest_user_details']
api/authentication/ password/change/ [name='rest_password_change']
```

Si lees la lista anterior, te darás cuenta de que se agregaron endpoints para reiniciar contraseñas, login, logout, detalles de usuario y cambiar password. Y si accedemos a esas urls en el navegador ya veremos la interfaz de DRF.

![Pantalla de Loggeo en Django REST framework](images/DjangoRestFrameworkEndpointLogin.png)

El endpoint de login nos devuelve una key que usaremos como token

Pero no hemos terminado. Hasta este momento podemos manejar usuarios pero no crearlos. Para eso usaremos la siguiente librería.

## Registro de usuarios con DRF

Usaremos otra librería, esta vez llamada django-allauth.

### Instalación de django-allauth

Al igual que la librería anterior, vamos a instalarla.

```bash
pipenv install django-allauth~=0.42.0
```

Tras la instalación agregamos nuestra aplicación al proyecto. django-all-auth requiere que la aplicación _django.contrib.sites_ se encuentre en nuestras INSTALLED\_APPS en el archivo de configuración.

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

Como agregamos el paquete _django.contrib.sites_, django necesitará que agreguemos una variable SITE\_ID al archivo de configuraciones. También agregaremos el EMAIL\_BACKEND de terminal que ya nos ofrece django, para que cada correo electrónico se muestre en la terminal.

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' 
SITE_ID = 1
```

Ahora, como nuestra aplicación tiene modelos, es buena idea correr nuevamente las migraciones.

```bash
python manage.py migrate
```

Sí todo salió bien agreguemos la nueva url de registro, yo le he puesto _api/registration/_, pero tú puedes establecer la que gustes.

```python
# urls.py
INSTALLED_APPS = [
    # ...
    path('api/registration/', 
          include('dj_rest_auth.registration.urls')),
]
```

### Registro de usuarios

Ahora tendremos un endpoint extra que permite el registro de usuarios.

![Pantalla de registro en Django REST Framework](images/DjangoRestFrameworkEndpointRegistro.png)

Pantalla de registro de un usuario en la interfaz de DRF

Si nos registramos mediante el navegador, llenando el formulario, recibiremos un token como respuesta:

![Token de sesión de DRF Obtenidas tras el logueo de un usuario.](images/DjangoRestFrameworkEndpointToken.png)

Token de sesión obtenida tras el logueo de un usuario

Este token es el que nos permitirá autenticarnos, intentemos usar ese token con el comando curl para acceder al perfil del usuario.

```bash
curl -H "Authorization: Token c66ff3d7d3b4c434ce4d9a1ae0d640fc64d0a8bd" http://127.0.0.1:8000/api/authentication/user/
{"pk":1,"username":"Karenina","email":"Karenina@karenina.com","first_name":","last_name":"}
```

Como viste, ya podemos usar el token que tenemos para obtener una respuesta de las vistas protegidas.

## Autenticación y login usando JWT en Django

dj-rest-auth también cuenta con soporte para JWT. Para usar los JWT vamos a instalar la librería djangorestframework-simplejwt

Si no sabes que es JWT o quieres profundizar más en el tema, tengo una entrada donde explico los detalles de la [autenticación en django usando JWT.](/es/django-rest-framework-y-jwt-para-autenticar-usuarios/) Y como contraparte, también tengo una traducción de stop using JWT for sessions, donde se explica porque pudiera no ser tan buena idea usar JWT para sesiones.

```bash
pipenv install djangorestframework-simplejwt
```

Agregamos el backend de autenticación en las configuraciones de DRF y le indicamos que use JWT en nuestro archivo _settings.py_.

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

En este mismo archivo indicamos como se llamaran las cookies de refresco y de autenticación.

```python
# settings.py
JWT_AUTH_COOKIE = 'jwt-auth-token'
JWT_AUTH_REFRESH_COOKIE = 'jwt-refresh-token'
```

Tras obtener las tokens de refresco y autenticación, haciendo login en nuestro endpoint, podemos usarlas para autenticarnos con el header "Authorization: Bearer <Access token>".

![Tras el logueo de un usuario obtenemos el  JWT de refresco y de autenticación o acceso.](images/DjangoRestFrameworkJWT.png)

Tras el logueo de un usuario obtenemos el JWT de refresco y de autenticación o acceso.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4MjE5NDU1LCJqdGkiOiJhMTI3MGZjMDc5Nzc0MDkzYjM1NThkMjQzYThmYjFiMyIsInVzZXJfaWQiOjN9.vfVSYubOvNTw0iJxnPZ3BTOiFhw17aHX7OWFvscpOQU" http://127.0.0.1:8000/api/authentication/user/
{"pk":1,"username":"Karenina","email":"Karenina@karenina.com","first_name":","last_name":"}
```

Nota, además, que ya tenemos dos nuevas rutas agregadas en nuestra api.

```bash
api/authentication/ token/verify/ [name='token_verify']
api/authentication/ token/refresh/ [name='token_refresh'] 
```

Como siempre, recuerda revisar la documentación de [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/) y [dj-allauth](https://django-allauth.readthedocs.io/en/latest/) para más detalles.

## Otras librerías de autenticación en Django

Además de dj-rest-auth y dj-allauth, existen otras librerías para autenticar usuarios, tales como djoser y knox. Te dejo un enlace donde puedes ver un [tutorial completo en youtube](https://www.youtube.com/watch?v=0gRea2RtheM) que te explica como usar estas dos librerías.