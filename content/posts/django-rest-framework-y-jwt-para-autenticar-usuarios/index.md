---
title: "Django Rest Framework y JWT para autenticar usuarios"
date: "2021-06-14"
categories: 
  - "django"
coverImage: "images/JWT.jpg"
coverImageCredits: "Créditos a https://www.pexels.com/es-es/@iamikeee/"
description: "Aprende a implementar la autenticación básica en Django usando JWT y Django Rest Framework por medio de tokens de acceso y de refresco."
keywords:
  - django
  - jwt
  - REST
  - api
  - drf
---

Los JWT (JSON Web Tokens) se han popularizado enormemente, incluso algunos las consideran un reemplazo de los clásicos Tokens que usan otros frameworks, tales como Django Rest Framework. Usar JWT o Tokens normales (SWT) permite guardar toda la información de nuestra sesión directo en el token y además están firmados criptográficamente, suena bien ¿no? Sigue leyendo hasta el final para profundizar al respecto.

## ¿Qué es JWT?

JWT es un estándar para la creación de tokens de acceso basado en JSON, para el intercambio de información entre dos partes. Estos tokens, y su contenido, pueden ser verificados porque están firmados digitalmente. Esta firma criptográfica garantiza **que el contenido no ha sido alterado y que el emisor es quien dice ser**. Lo anterior los vuelve perfectos para:

- Autorización
- Intercambio de información

### ¿Qué ventaja tienen los JWT respecto a los tokens

Como te mencioné, el JWT puede guardar toda la información de la sesión, en lugar de guardarla en el servidor. Lo que te permite ahorrar muchísimo espacio en el servidor, sobre todo si tu sitio maneja una cantidad gigantesca de usuarios.

## Estructura de un Token JWT

Un JWT (JSON Web Token) está dividido por puntos en tres partes: 
1. El algoritmo que se usó.
2. La información que contiene el token.
3. La firma criptográfica.

![Partes de un JWT: encabezado, contenido y firma.](images/JWTDjango.png "Estructura de un JWT: algoritmo, contenido y firma")

Aprecia como podemos usar la parte central para guardar contenido arbitrario, que nosotros querramos, tal como los datos de la sesión de un usuario u otra información que consideremos pertinente.

## Instalación de JWT en Django

Primero vamos a instalar las librerías necesarias: djangorestframework y djangorestframework\_simplejwt, el primero para para crear y gestionar nuestra [API REST](https://coffeebytes.dev/caracteristicas-basicas-de-una-api-rest/) en Django y el segundo para manejar los JWT. 

Para instalarlas usaré [el administrador de entornos virtuales llamado Pipenv](https://coffeebytes.dev/pipenv-el-administrador-de-entornos-virtuales-que-no-conoces/). También puedes usar pip si quieres.

```python
pipenv install djangorestframework_simplejwt djangorestframework
```

Asegurate de agregar las aplicaciones que instalamos a la variable INSTALLED\_APPS.

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework_simplejwt'
]
```

Agregamos la clase de autenticación a nuestro archivo de configuraciones.

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

Recuerda correr las migraciones y crear un súper usuario, si puedes crear un par de cuentas a través del admin también te serían útiles.

```python
python manage.py migrate
python manage.py createsuperuser
```

Vamos a agregar las url que necesitamos para generar nuestros JWT en Django

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

La primera vista **nos devolverá un par de tokens**; uno de acceso y otro para refrescar el primero. La segunda vista nos servirá para refrescar o actualizar el token de acceso.

Creemos también una vista protegida que sea accesible únicamente a los usuarios autenticados. Por simplicidad he puesto la función protegida dentro del mismo archivo _urls.py_

```python
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class Protegida(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"content": "Esta vista está protegida"})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('protegida/', Protegida.as_view(), name='protegida')
]
```

Si probamos hacer una petición a la url _/protegida/_ nos advertirá de que no estamos mandando las credenciales adecuadas de autenticación.

```bash
curl http://127.0.0.1:8000/protegida/ {"detail":"Authentication credentials were not provided."}
```

Si no sabes usar curl revisa mi entrada de [comandos básicos de GNU/Linux](https://coffeebytes.dev/comandos-de-linux-que-deberias-conocer-tercera-parte/) donde explico lo básico. También puedes usar Postman, http o cualquier otra opción.

## Obtener tokens JWT en Django

Si ahora hacemos una petición POST a la url _/api/token/_, enviando un nombre de usuario y contraseñas válidas tendremos de respuesta un par de tokens. Yo usé un usuario que cree, pero tú puedes usar tu superusuario o crear uno.

```bash
curl -d "username=kyoko&password=contrasenasegura" -X POST http://localhost:8000/api/token/

{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzQ0NjEzNiwianRpIjoiMjcyOTI0OTkwOGVhNGQ2ZjkxMDFiMGI4ZjhlZDZkY2QiLCJ1c2VyX2lkIjoyfQ.zkCWbKBnkDCukZVB8cHiCnrUOHRl1vWF6Oqg29IFT7A",
"access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMzYwMDM2LCJqdGkiOiIzYzY2MDI3YzhiMjE0NmM4OGQ5NTY0MGUxYzc1ODAxYSIsInVzZXJfaWQiOjJ9.juG7sbemKUOTEnzNv4XiXCfChrG3q9wBw4Sj0g1L9EM"}
```

![Pantalla de Django Rest Framework que pide username y Password](images/JWTApiEndPoint.png)

### Token de acceso en JWT

El token de acceso sería el equivalente al token de acceso de DRF; usaremos este JWT para autenticarnos ante Django; es decir, para decirle a Django quienes somos.

### Token de actualización en JWT

El token de acceso **tiene una fecha de caducidad, una vez que esta fecha llegue dejará de ser valido**, podemos crear otro sin necesidad de mandar nuestro usuario y contraseña usando **únicamente el token de actualización.**

## Contenido del Token JWT

Si decodificas el token, podrás obtener su contenido. Ya lo he hecho aquí por ti. 

![Partes de un JWT: encabezado, contenido y firma.](images/JWTDjangoContenido.png)

Observa como en la parte de contenido (data) se aprecia que el _user\_id_ es igual a 2, el cual es el id o primary key del usuario que obtuvo el token. El primer usuario en mi caso es el superusuario.

## Autenticación con Django y JWT

Ahora intentemos usar el token de acceso que obtuvimos para acceder a la vista protegida. Asegurate de estar usando el token _"access"_, no el de _"refresh"_.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzxOTA5MmY4ZTJhNzNkZDM3YyIsInVzZXJfaWQiOjJ9.ibQPgQuEgnuTY6PGja-GLZv4TrAQtKKCgue_muJKlE4" http://127.0.0.1:8000/protegida/ {"content":"Esta vista está protegida"}
```

## Caducidad de un JWT

Si seguiste el ejemplo y dejaste que pasaran unos minutos te darás cuenta de que el token de acceso caduca y ya no será válido. **El token de acceso tiene una duración predeterminada de 5 minutos**, esto para evitar problemas si alguien logra interceptarlo.

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzxOTA5MmY4ZTJhNzNkZDM3YyIsInVzZXJfaWQiOjJ9.ibQPgQuEgnuTY6PGja-GLZv4TrAQtKKCgue_muJKlE4" http://127.0.0.1:8000/protegida/ {"detail":"Given token not valid for any token type","code":"token_not_valid","messages":[{"token_class":"AccessToken","token_type":"access","message":"Token is invalid or expired"}]}
```

## Actualizar el token de acceso

Para obtener otro token válido basta que mandemos nuestro token de actualización al endpoint que creamos en _/api/token/refresh/_. **El token de actualización tiene una duración predeterminada de 24 horas.** Pasadas las 24 horas ya no podremos refrescar el token de acceso y tendremos que enviar nuevamente un nombre de usuario y contraseña.

```bash
curl -d "refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzQ0NjEzNiwianRpIjoiMjcyOTI0OTkwOGVhNGQ2ZjkxMDFiMGI4ZjhlZDZkY2QiLCJ1c2VyX2lkIjoyfQ.zkCWbKBnkDCukZVB8cHiCnrUOHRl1vWF6Oqg29IFT7A" -X POST http://127.0.0.1:8000/api/token/refresh/ {"access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMzY1NDU3LCJqdGkiOiJlZjljNWFiYjI1MzU0YWJjYjc4YWRmNTI2MDA2OTEwNCIsInVzZXJfaWQiOjJ9.RPrfobpIF52W0wdNJk4zLYcgWpymZdgAPFxOIH0KEsk"}
```

Nuestra aplicación nos devolverá un nuevo token de acceso que podemos usar nuevamente para autenticarnos.

## Modificar los valores por defecto de los JWT

Para hacerlo vamos al archivo de configuraciones de Django y creamos una variable llamada SIMPLE\_JWT, en la que podemos sobreescribir los datos que querramos y colocarles la duración que más te convenga.

```javascript
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # ...}
```

Por favor revisa [la documentación oficial de django-rest-framework-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html#refresh-token-lifetime) para ver todas las variables de configuración para tus JWT en Django.

## Problemas con los JWT

Seguramente no quieres que tus usuarios estén colocando nombre de usuario y contraseña cada vez que usen tu aplicación, probablemente quieres conservar los valores de estos dos tokens para usarlos después y te estás preguntando cual es la opción correcta, ¿Local Storage o en las cookies?

Pues bien, la interrogante trae una serie de preguntas muy difíciles de contestar que dividen las opiniones de los desarrolladores y nos dejan sin una respuesta clara:

¿Como lidio con un JWT con información o permisos desactualizados? ¿Cuál es la mejor manera de invalidar un JWT un servidor externo o cambiar la llave critptográfica? ¿Qué pasa si la información que guardo en el JWT excede el tamaño permitido por cookie? Si en lugar de guardar contenido en el JWT solo guardo el identificador de usuario, ¿no es lo mismo que una cookie?

Para la siguiente publicación traduciré una entrada bastante popular llamada "Stop using JWT for sessions" ([No uses JWT para gestionar sesiones](https://coffeebytes.dev/no-uses-jwt-para-gestionar-sesiones-traduccion/)), con una postura muy fuerte, que trata sobre esas preguntas.
