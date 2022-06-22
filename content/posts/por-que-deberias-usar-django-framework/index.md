---
title: "¿Por qué deberías usar Django Framework?"
date: "2021-03-24"
categories: 
  - "django"
  - "opiniones"
coverImage: "images/Django-usar.jpg"
coverImageCredits: "Créditos https://www.pexels.com/es-es/@weekendplayer/"
description: "¿Vale la pena usar Django en un mundo donde todo es Javascript? Entra para conocer las ventajas y desventajas de este framework de Python."
keywords:
  - "drf"
  - "django"
  - "python"
  - "opinion"
---

¿Por qué usar Django en un mundo donde todo es Javascript? ¿De verdad vale la pena aprender un Framework de Python en un ecosistema que se empecina en Frameworks escritos en Javascript? Pues yo creo que sí y a continuación te expongo algunas de las razones por las que deberías usar Django. Y, para no perder objetividad, te hablaré tanto de las ventajas, como de las desventajas; ya sabes que ninguna solución es perfecta.

## Las ventajas de Django

### Su ORM es sencillo y maravilloso

El ORM de Django abstrae la necesidad de escribir consultas SQL para crear tablas y consultar datos. Es bastante intuitivo de usar y tiene incluidas casi todos las consultas más comunes en su código. Desde filtrados, particionados, uniones e incluso hasta funciones [búsquedas avanzadas de Postgres](https://coffeebytes.dev/trigramas-y-busquedas-avanzadas-con-django-y-postgres/).

Para crear una tabla en la base de datos basta con crear una clase que herede de _models.Model_ y Django se encargará de todo el trabajo pesado.

```python
class Review(models.Model):
    title = models.CharField(max_length=25)
    comment = models.TextField()
    name = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(
        Product, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(
        get_user_model(), related_name="reviews", null=True, on_delete=models.SET_NULL)
```

Además de lo anterior, su ORM soporta múltiples bases de datos, por lo que cambiar de motor de base de datos es bastante sencillo y tras unos pocos cambios puedes migrar perfectamente de Postgres a MySQL o viceversa, únicamente cambiando un par de lineas en la configuración.

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': '/path/to/my.cnf',
        },
    }
}
```

Su única desventaja es su velocidad, pues se queda corto frente a otras alternativas como sqlAlchemy, o [tortoise-orm](https://coffeebytes.dev/integracion-del-orm-de-python-tortoise-con-fastapi/).

### Panel de administrador incluido

Django cuenta con el [django admin panel](https://coffeebytes.dev/el-django-admin-panel-y-su-personalizacion/), un panel de administración que viene instalado por defecto. Este administrador implementa un CRUD a la base de datos de una manera sencilla. Y, además, cuenta con un sólido sistema de permisos para restringir el acceso a los datos como tu quieras.

![Panel de administración de Django](images/Django-panel-admin.png)

### Ofrece seguridad ante los ataques más comunes

Django incluye ciertas utilidades, que se encargan de mitigar la mayoría de los ataques tales como XSS, XSRF, injecciones SQL, Clickjacking y otros. La mayoría ya están disponibles y basta con solo agregar el middleware o etiqueta de plantilla correspondiente.

```python
<form method="post">{% csrf_token %}
```

### Autenticación probada

Este framework cuenta con un sistema de autenticación probado, basado en sesiones que se identifican por medio de una cookie. El sistema de autenticación ya ha sido puesto a prueba en numerosas ocasiones por algunos de los sitios web con más tráfico que hay, como Instagram o el sitio web de la NASA. Pinterest empezó con Django pero se movió hacia node.

Puedes usar la autenticación con cookie, por sesiones o existen paquetes que te permiten usarla con JWT. Por cierto, tengo una entrada donde explico como [autenticar un usuario usando JSON Web token JWT en Django Rest Framework](https://coffeebytes.dev/django-rest-framework-y-jwt-para-autenticar-usuarios/). Además escribí otra explicando porque [algunos consideran que esto no es una buena idea.](https://coffeebytes.dev/no-uses-jwt-para-gestionar-sesiones-traduccion/)

### Sistema de permisos

Django cuenta con un sólido [sistema de permisos y grupos](https://coffeebytes.dev/como-funcionan-los-permisos-y-grupos-en-django/) que vincula a sus usuarios con modelos en la base de datos que puedes empezar a usar solo con unas cuantas lineas de código.

### Múltiples paquetes

Django cuenta con muchísimos paquetes para resolver la mayoría de los problemas comunes, además son paquetes supervisados y mejorados por la comunidad logrando una calidad impresionante.

Solo por nombrar algunos:

- [Django-haystack](https://coffeebytes.dev/busquedas-con-solr-con-django-haystack)(Para búsquedas complejas)
- Django-watson (Búsquedas)
- DRF (REST)
- Graphene (Graphql)
- Django-rest-auth (Autenticación)
- Django-allauth (Autenticación)
- Django-filter (Búsquedas)
- Django-storage (AWS storage)
- Django-braces (Funciones comunes)

Entre todos ellos me gustaría resaltar **DRF (Django Rest Framework) que vuelve la [creación de una API](https://coffeebytes.dev/caracteristicas-basicas-de-una-api-rest/), el manejo de permisos y [throttling](https://coffeebytes.dev/throttling-en-nginx/), una tarea simple**, comparada en otros lenguajes. La autenticación con DRF también es bastante sencilla usando los paquetes anteriores. La librería Graphene también es destacable, permite implementar graphql en Django con pocas lineas de código.

Otro paquete bastante útil y que te permite trabajar con websockets, para crear una [aplicación que se comunique con el servidor en tiempo real, a través de eventos, es django-channels.](https://coffeebytes.dev/django-channels-consumers-scope-y-eventos/)

### Te lleva de una idea a un prototipo funcional rápido

Yo considero esta la razón principal para usar Django. **Django te lleva de una idea a un MVP rápido y sin necesidad de reinventar la rueda**. Lo cual es una ventaja competitiva gigantesca frente a otros frameworks, especialmente cuando hay dinero y clientes involucrados.

Con Django tendrías un prototipo funcionando más rápido que con cualquier otro framework "menos opinado".

### Es una solución probada

Hay muchísimos frameworks nuevos cada día. La mayoría de ellos son solo una moda y caen en desuso con el pasar de los años, dejando proyectos sin soporte. Django es un framework que lleva muchísimo tiempo funcionando, que ha pasado por numerosas pruebas que lo han vuelto muy robusto y confiable, y que no va a desaparecer de la noche a la mañana dejandote con un proyecto sin soporte.

Considera que Django fue la opción que alguna vez eligieron sitios tan grandes como Instagram o Pinterest.

## Las desventajas de Django

No todo es mágico con Django, hay algunas cosas que pueden considerarse una desventaja y que yo cambiaría sin dudarlo.

### Es un monólito

Django es un Framework antiguo, con todo lo que se necesita para desarrollar una aplicación web, un ORM, un sistema de plantillas, middleware y muchas otras piezas que, están ahí y son requeridas para que el framework funcione, las necesites o no. Lo anterior puede ser bueno o malo dependiendo de si estás a favor o en contra de los microservicios, pero a la fecha de escritura de este artículo, es visto como una desventaja.

La misma estabilidad de Django lo ha hecho verse algo lento en un mundo de frameworks de Javascript que evoluciona muy rápido.

**Actualización**: Respecto al sistema de plantillas, si lo combinas con librerías como htmx o turbolinks tendrás lo mejor de ambos mundos: interactividad en el frontend con un generación de HTML en el backend.

### Es lento y maneja peticiones de una en una

Python es un lenguaje interpretado que se hizo para ser bello y simple, no necesariamente rápido. En mi comparación de [python vs go](https://coffeebytes.dev/python-vs-go-2022-cual-es-el-mejor/) comparo el rendimiento de ambos, solo para que te des una idea.

Sumado a lo anterior, Django tampoco brilla por su velocidad a la hora de ejecutarse. En la carrera por ser un framework veloz, está por debajo de tecnologías más modernas como Flask o FastAPI. Entra en [mi tutorial sobre FastAPI](https://coffeebytes.dev/python-fastapi-el-mejor-framework-de-python/) si quieres ver que tan lento es Django comparado con otros frameworks.

### Su ORM no es asíncrono ni tampoco el más veloz

Django está trabajando porque su ORM sea asíncrono, pero aún no lo consigue. Otras alternativas como tortoise-orm, sql-alchemy, pony-orm le llevan ventaja en este aspecto.

### Curva de aprendizaje moderada

Django sigue la filosofía de baterías incluidas. Lo cual es bueno, porque es código que te ahorras al escribir, pero también malo, pues es código que necesitas aprender a usar: el ORM con modelos y consultas, el middleware, las vistas, DRF (para las APIs) o el sistema de plantillas, el manejador de urls, traducción de cadenas de texto, el paquete de i18n, etc. Aprender todo lo anterior implica más tiempo del que te tomaría aprender otros Frameworks más minimalistas; como Flask o Express.

## TLDR ventajas y desventajas de Django

Desde mi punto de vista las ventajas superan a las desventajas, por lo que yo lo considero una opción muy atractiva para desarrollar un sitio web complejo cuando se tiene poco tiempo o necesitas encontrar desarrolladores rápido.

¿Aún no te convenzo? Recuerda que Instagram es el sitio web con Django como backend más grande que existe.

Al final, como siempre, este es mi punto de vista y cada persona tiene el suyo. Espero que este post te haya mostrado algo que no habrías considerado sobre Django antes de leerlo.
