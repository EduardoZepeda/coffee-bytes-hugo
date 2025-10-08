---
aliases:
- /por-que-deberias-usar-django-framework
- /por-que-deberias-usardjangoframework/
- /es/por-que-deberias-usar-django-framework/
authors:
- Eduardo Zepeda
categories:
- django
- opinion
coverImage: images/Django-usar.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@weekendplayer/
date: '2021-03-24'
description: ¿Vale la pena usar Django en un mundo donde todo es Javascript? Entra
  para conocer las ventajas y desventajas de este framework de Python.
keywords:
- drf
- django
- python
- opinion
slug: /django/por-que-deberias-usar-django-framework/
title: ¿Por qué deberías usar Django Framework?
---

¿Por qué usar Django en un mundo donde todo es Javascript? ¿De verdad vale la pena aprender un Framework de Python en un ecosistema que se empecina en Frameworks escritos en Javascript? Pues yo creo que sí y a continuación te expongo algunas de las razones por las que deberías usar Django. Y, para no perder objetividad, te hablaré tanto de las ventajas, como de las desventajas; ya sabes que ninguna solución es perfecta.

## ¿Es django un framework de backend o de frontend?

Django es un framework full-stack que puede ser utilizado únicamente para backend. Lo que lo hace un framework full-stack es que tiene un motor de plantillas con su propia sintaxis, capaz de generar HTML sobre la marcha, pero es completamente opcional, puedes configurarlo para servir sólo JSON o cualquier otro tipo de respuesta API que desees y utilizar React, Vue, Jquery, o lo que quieras en el frontend.

## Ventajas y desventajas de Django TLDR

- Desventajas de Django
  - Django es un monolito
  - Django es lento
  - La curva de aprendizaje de Django es alta
  - El ORM de Django no es asíncrono
  - Django requiere que sepas Python además de Javascript
- Ventajas de Django
  - El ORM de Django está muy completo
  - La mayoría de cuestiones de seguridad están resueltas
  - Autenticación, mensajes, caché, permisos, panel de administración, manejo de formularios, i18n incluídos
  - Framework estable, maduro y con mucha trayectoría
  - Permite iterar y crear MVP muy rápido en startups
  - Perfecto para combinar con Machine Learning

Si quieres ahondar en alguna en particular sigue leyendo.

{{<ad1>}}

## Las ventajas de Django

Django es un framework con baterias incluídas, que cubre prácticamente todas las necesidades de un sitio web interactivo, desde protección contra los ataques más comunes como SQL injection, CSRF, COOP y XSS. Además un ORM, validación de formularios en el backend, caché, i18n, messages y nos ofrece una solución para prácticamente todos los problemas que surgen al desarrollar un sitio web de tamaño mediano o grande.

Si eres uno de esos desarrolladores que se consideran **perfeccionistas con deadlines**, y que no quieren tener que reinventar la rueda una y otra vez con cada nuevo proyecto, vas a amar Django.

### El ORM de Django es sencillo y fácil de usar

El ORM de Django abstrae la necesidad de escribir consultas SQL para crear tablas y consultar datos. Es bastante intuitivo de usar y tiene incluidas casi todos las consultas más comunes en su código. Desde filtrados, particionados, uniones e incluso hasta funciones para [búsquedas avanzadas de Postgres]({{< ref path="/posts/django/trigramas-y-busquedas-avanzadas-con-django-y-postgres/index.md" lang="es" >}}) y manejo de migraciones automático.

Para crear una tabla en la base de datos basta con crear una clase que herede de _models.Model_ y Django se encargará de todo el trabajo pesado.

{{<ad2>}}

```python
class Review(models.Model):
    title = models.CharField(max_length=25)
    comment = models.TextField()
    name = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        get_user_model(), related_name="reviews", null=True, on_delete=models.SET_NULL)
```

El siguiente modelo es equivalente a la siguiente sentencia SQL:

```sql
BEGIN;
--
-- Create model Review
--
CREATE TABLE reviews_review (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, title varchar(25) NOT NULL, comment text NOT NULL, name varchar(20) NOT NULL, created datetime NOT NULL, modified datetime NOT NULL, user_id integer NULL REFERENCES auth_user (id) DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX reviews_review_user_id_875caff2 ON reviews_review (user_id);
COMMIT;
```

Además de lo anterior, su ORM soporta múltiples bases de datos, por lo que migrar de motor de base de datos es bastante sencillo y tras unos pocos cambios puedes migrar perfectamente de Postgres a MySQL o viceversa, únicamente cambiando un par de lineas en la configuración. Ahorrándote el tener que escribir SQL a mano, como lo harías en las [migraciones de otro lenguaje, como go]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="es" >}}).

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

La única desventaja del ORM de django es su velocidad, pues se queda corto frente a otras alternativas como sqlAlchemy, o [tortoise-orm (el cual puedes integrar fácilmente fon FastAPI)]({{< ref path="/posts/fastapi/integracion-del-orm-de-python-tortoise-con-fastapi/index.md" lang="es" >}}).

{{<ad3>}}

### Panel de administrador incluido

Django cuenta con el [django admin panel, el cual es personalizable]({{< ref path="/posts/django/el-django-admin-panel-y-su-personalizacion/index.md" lang="en" >}}), un panel de administración que viene instalado por defecto. Este administrador implementa un CRUD a la base de datos de una manera sencilla. Y, además, cuenta con un sólido sistema de permisos para restringir el acceso a los datos como tu quieras.

{{< figure src="images/Django-panel-admin.png" class="md-local-image" alt="Panel de administración de Django" >}}

### Ofrece seguridad ante los ataques más comunes

Django incluye ciertas utilidades, que se encargan de mitigar la mayoría de los ataques tales como XSS, XSRF, injecciones SQL, Clickjacking y otros. La mayoría ya están disponibles y basta con solo agregar el middleware o etiqueta de plantilla correspondiente.

```python
<form method="post">{% csrf_token %}
```

### Manejo de usuarios incluído

La mayoría de las aplicaciones requieren un sistema de manejo de usuarios, ya sabes, registrarlos, activarlos, loggearlos, recuperación de contraseña, bien, pues Django ya incluye todo lo anterior por defecto, incluso decoradores para restringir las vistas para usuarios autenticados.

#### Autenticación probada, incluso con JWT.

Este framework cuenta con un sistema de autenticación probado, basado en sesiones que se identifican por medio de una cookie. El sistema de autenticación ya ha sido puesto a prueba en numerosas ocasiones por algunos de los sitios web con más tráfico que hay, como Instagram o el sitio web de la NASA. Pinterest empezó con Django pero se movió hacia node.

Puedes usar la autenticación con cookie, por sesiones o existen paquetes que te permiten usarla con JWT. Por cierto, tengo una entrada donde explico como [autenticar un usuario usando JSON Web token JWT en Django Rest Framework](/es/django/django-rest-framework-y-jwt-para-autenticar-usuarios/). Además escribí otra explicando porque [algunos consideran que esto no es una buena idea.](/es/software-architecture/no-uses-jwt-para-gestionar-sesiones-traduccion/)

#### Sistema de permisos

Django cuenta con un sólido [sistema de permisos y grupos]({{< ref path="/posts/linux/permisos-en-gnu-linux-y-el-comando-chmod/index.md" lang="es" >}}) que vincula a sus usuarios con modelos en la base de datos que puedes empezar a usar solo con unas cuantas lineas de código.

### Sistema de caché out of the box

Django cuenta con [un sistema de caché muy robusto](/es/django/cache-en-django-rest-framework-con-memcached/) que abarca desde cacheo de sitio completo hasta incluso un nivel más granular pudiendo cachear resultados de consultas SQL.

### Sistema de messages out of the box

Django cuenta con un sistema de mensajes basado en sesiones que te permite mostrarle al usuario mensajes que caducarán tras ser vistos, todo esto solo con agregar el middleware correspondiente

### Sistema de i18n incluído

Django cuenta con un sistema para sitios multilingues out of the box, basado en archivos po y mo, junto con gettext, totalmente listo para ser usado y sin tener que instalar librerías adicionales.

### Manejo y validación de formularios

Django cuenta con un sistema que permite crear formularios con código Python de manera muy sencilla, incluso tomando como base modelos en la base de datos, estos pueden usarse para crear filas en tu base de datos e inclusive para usarlos para validar los datos que ingresa tu usuario en el backend.

### Múltiples paquetes disponibles para la mayoría de las necesidades web

Django cuenta con muchísimos paquetes para resolver la mayoría de los problemas comunes, además son paquetes supervisados y mejorados por la comunidad, lo que garantiza una calidad, robustez y estabilidad impresionante.

Solo por nombrar algunos:

- [Django-haystack]({{< ref path="/posts/django/solr-en-django-con-haystack/index.md" lang="es" >}})(Para búsquedas
  complejas)
- Django-watson (Búsquedas)
- DRF (REST)
- Graphene (Graphql)
- Django-rest-auth (Autenticación)
- Django-allauth (Autenticación)
- Django-filter (Búsquedas)
- Django-storage (AWS storage)
- Django-braces (Funciones comunes)

Entre todos ellos me gustaría resaltar **DRF (Django Rest Framework) que vuelve la [creación de una API REST]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="es" >}}), el manejo de permisos y [throttling]({{< ref path="/posts/software-architecture/como-limitar-peticiones-con-throttling-en-nginx/index.md" lang="es" >}}), una tarea simple**, comparada con crear todo desde cero. 

Otro paquete a destacar que te permite trabajar con websockets, para crear una [aplicación que se comunique con el servidor en tiempo real, a través de eventos, es django-channels.](/es/django/django-channels-consumers-scope-y-eventos/)

### Django te lleva de una idea a un prototipo funcional rápido

Yo considero esta **la ventaja principal de Django**. A pesar de [no ser el framework con mejor rendimiento](/es/opinion/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/), **Django te lleva de una idea a un MVP rápido, con pocas lineas de código**. Lo cual es una ventaja competitiva gigantesca frente a otros frameworks, especialmente en entornos iterativos.

Con Django tendrías un prototipo funcionando más rápido que con cualquier otro framework "menos opinado" o que requiera que programes todo desde cero.

{{< figure src="images/meme-django.jpeg" class="md-local-image" alt="Porque usar Django" >}}

### Django es una solución probada y madura

Hay muchísimos frameworks nuevos cada día. La mayoría de ellos son solo una moda y caen en desuso con el pasar de los años, dejando proyectos sin soporte. Django es un framework que lleva muchísimo tiempo funcionando, que ha pasado por numerosas pruebas que lo han vuelto muy robusto y confiable, y que no va a desaparecer de la noche a la mañana dejándote con un proyecto sin soporte.

Considera que Django fue la opción que alguna vez eligieron sitios tan grandes como Instagram o Pinterest.

### Compatibilidad de Django con librerías de Machine Learning

Python es genial cuando se trata de Machine Learning, librerías geniales como Pytorch, ScikitLearn, Numpy y Keras son bastante usadas a nivel mundial. Dado que Django está escrito en Python, podras integrar estas librerías de manera nativa a tus proyectos de Django, sin necesidad de crear un servicio nuevo, manteniendo la complejidad de tu código al mínimo.

{{< figure src="images/iceberg-meme.jpg" class="md-local-image" alt="Machine learning con Python" >}}

## Las desventajas de Django

No todo es mágico con Django, hay algunas cosas que pueden considerarse una desventaja y que yo cambiaría sin dudarlo. Ciertamente [Django puede ser mejorado en muchos aspectos](/es/opinion/como-mejorar-django-framework/).

### Es un monólito

Django es un Framework antiguo, con todo lo que se necesita para desarrollar una aplicación web, un ORM, un sistema de plantillas, middleware y muchas otras piezas que, están ahí y son requeridas para que el framework funcione, las necesites o no. Sin embargo, Django puede modularizarse para generar respuestas API en JSON (u otro formato) en lugar de HTML, ignorando el resto de la maquinaría del framework.

La misma estabilidad de Django lo ha hecho verse algo lento en un mundo de frameworks de Javascript que evoluciona muy rápido.

**Actualización**: Respecto al sistema de plantillas, si lo combinas con librerías como htmx o turbolinks tendrás lo mejor de ambos mundos: interactividad en el frontend con un generación de HTML en el backend.

### Es lento y maneja peticiones de una en una

Python es un lenguaje interpretado que se hizo para ser bello y simple, no necesariamente rápido. En mi comparación de [python vs go]({{< ref path="/posts/go/python-vs-go-cual-es-el-mejor-diferencias-y-similitudes/index.md" lang="es" >}}) comparo el rendimiento de ambos, solo para que te des una idea.

Sumado a lo anterior, Django tampoco brilla por su velocidad a la hora de ejecutarse. En la carrera por ser un framework veloz, está por debajo de tecnologías más modernas como Flask o FastAPI. Entra en [mi tutorial sobre FastAPI]({{< ref path="/posts/fastapi/python-fastapi-el-mejor-framework-de-python/index.md" lang="es" >}}) si quieres ver que tan lento es Django comparado con otros frameworks.

### Su ORM no es asíncrono ni tampoco el más veloz

Django está trabajando porque su ORM sea asíncrono, pero aún no lo consigue. Otras alternativas como tortoise-orm, sql-alchemy, pony-orm le llevan ventaja en este aspecto.

### Curva de aprendizaje moderada

Django sigue la filosofía de baterías incluidas. Lo cual es bueno, porque es código que te ahorras al escribir, pero también malo, pues es código que necesitas aprender a usar: el ORM con modelos y consultas, el middleware, las vistas, DRF (para las APIs) o el sistema de plantillas, el manejador de urls, traducción de cadenas de texto, el paquete de i18n, el framework de mensajes, etc. 

Aprender todo lo anterior implica más tiempo del que te tomaría aprender otros Frameworks más minimalistas; como Flask o Express.

## Alternativas a Django en otros lenguajes

Si amas Django, pero consideras que necesitas una solución un poco más moderna acorde los paradigmas más actuales prueba con las siguientes opciones:

### Frameworks como django pero en Javascript

Si usas Framework y buscas un framework parecido, tengo entendido que [AdonisJS](https://adonisjs.com/#?) y [NestJS](https://nestjs.com/#?) ofrecen experiencias similares de desarrollo.

### Frameworks como django pero en Go

Si estas usando este maravilloso y super simple [lenguaje de programación llamado Go]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="es" >}}), sé que el framework [Beego](https://github.com/beego/beego#?) es bastante similar a Django en cuanto a su filosofía de baterías incluídas.

### Frameworks como django pero en Rust

Si bien es más parecido a RoR, [Loco, escrito en Rust,](https://loco.rs/#?) ofrece una experiencia bastante similar a un framework de alto nivel como Django, aunque [escribir código Rust es más difícil]({{< ref path="/posts/rust/estoy-aprendiendo-el-lenguaje-de-programacion-rust/index.md" lang="es" >}}) que escribir en Python.

## Mi opinión sobre las ventajas y desventajas de Django

Desde mi punto de vista las ventajas superan a las desventajas, por lo que yo lo considero una opción muy atractiva para desarrollar un sitio web complejo cuando se tiene poco tiempo o necesitas encontrar desarrolladores rápido.

¿Aún no te convenzo? Recuerda que Instagram es el sitio web con Django como backend más grande que existe.

Al final, como siempre, este es mi punto de vista y cada persona tiene el suyo. Espero que este post te haya mostrado algo que no habrías considerado sobre Django antes de leerlo.