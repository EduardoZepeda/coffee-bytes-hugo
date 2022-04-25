---
title: "Estructura y diseño de una API REST"
date: "2022-04-20"
categories: 
  - "opiniones"
  - "arquitectura-de-software"
coverImage: "django-select-related-prefetch-related.jpg"
draft: true
keywords:
  - arquitectura de software
  - opinion
  - REST
  - api
---

¿Qué requisitos debería cumplir para el buen diseño de una buena API REST? ¿Cuántos niveles debo anidar mis recursos relacionados? ¿URLs relativas o completas? Sí, yo también me hice esas preguntas y recopilo aquí lo que encontré al respecto en forma de pautas a seguir.

Ya te hablé previamente de las [características que tiene que tener una API REST](https://coffeebytes.dev/caracteristicas-basicas-de-una-api-rest-y-recomendaciones/). En esta entrada te voy a hablar un poco de algunos aspectos más subjetivos relacionados con el diseño de APIs.

Voy a comenzar con una pregunta bastante común. ¿Cómo estructuro mi JSON?

## Estructura para respuestas JSON

Hay diferentes maneras de estructurar la respuesta de una API REST. No hay ninguna válida ni inválida, depende del gusto de cada equipo y las necesidades del negocio. **Lo importante aquí es mantener la consistencia y la homogeneidad**.

### Según json:api

Existe un [grupo de personas que se proponen estandarizar las respuestas JSON](https://jsonapi.org/) en un único estilo de respuesta, tanto para devolver recursos únicos o múltiples. Es una referencia a considerar cuando diseñes su API.

```json
{
    "products": [{
        "id": 1,
        "title": "titulo"
    }]
}
```

Tener una referencia como ellos ya nos arroja algo de luz, sin embargo existen jugadores muy grandes en las empresas de tecnología que tienen sus propios estilos.

### API estilo Twitter

En Twitter, la respuesta de un recurso individual se ve así :

```json
{
  "id":1,
  "title":"titulo"
}
```

Para recursos múltiples, Twitter decidió incluirlos dentro de un array.

```json
[
  {
    "id":1,
    "title":"titulo"
  },
  {
    "id":2,
    "title":"titulo"
  }
]
```

### API estilo Facebook

Por otro lado, en Facebook, la sintaxis para recursos individuales luce así, igual a la de Twitter:

```json
{
    "id": 1,
    "title": "titulo"
}
```

Mientras que una respuesta para recursos múltiples es así:

```json
{
  "data":[
    {
      "id": 1,
      "title": "titulo"
    },
    {
      "id": 2,
      "title": "titulo"
    }
  ]
}
```

Como puedes ver diferencias entre compañias y no se si me atrevería a decirte que una u otra es correcta.

## ¿URLs relativas o completas en HATEOAS?

Según lo que he investigado, no hay un consenso claro ni una postura oficial sobre si es mejor incluir URLs relativas o completas. Hay mucho debate al respecto en stackoverflow, pero microsoft usa URLs completas en sus respuestas, una referencia a tomar en cuenta para lo que sea que elijas.

```bash
{"rel":"self",
    "href":"https://adventure-works.com/customers/2"}
```

## Objetos anidados en la respuesta

Generalmente una API no retorna recursos individuales, sino recursos que están relacionados con otros recursos a nivel base de datos por relaciones uno a uno, muchos a muchos o uno a muchos. La pregunta aquí es: ¿los incluimos en la respuesta aunque esto aumente su tamaño? ¿ponemos solo los identificadores y los descargamos después? Depende.

### Identificadores en la respuesta

Esta aproximación al problema necesitará que si el usuario requiere acceder a la información, se descargue posteriormente. Es ideal para datos que casi no se consultan o muy numerosos.

```json
{
    "posts": [{
        "id": 1,
        "title": "titulo",
        "comments": [2,3,4]
    }]
}
```

Tras obtener la lista de identificadores podemos recuperarlos con una petición HTTP posterior.

```json
GET /comments/2,3
```

### Recursos en la respuesta

También es posible añadir directamente los objetos relacionados en una única respuesta, para evitar tener que nuestro usuario deba descargarlos posteriormente. Esto hará que cada respuesta demore un poco más, pues el servidor procesará más información, pero puede ahorrar peticiones posteriores a la API.

```json
{
    "posts":[
      {
        "id":1,
        "title":"titulo",
        "comments":[
          {
            "id":2,
            "text":"..."
          },
          {
            "id":3,
            "text":"..."
          },
          {
            "id":4,
            "text":"..."
          }
        ]
      }
    ]
  }
```

Si quieres flexibilidad considera crear un endpoint donde puedas indicarle a tu API que recursos quieres anidar de manera explícita en la url, para que solo se integren en la respuesta si son solicitados.

```bash
GET /posts/1?embed=comments
```

## Paginación en las API

Como ya te he mencionado en entradas anteriores, [por motivos de rendimiento, no siempre querrás devolverle toda la base de datos a tus usuarios en cada petición](https://coffeebytes.dev/como-mejorar-el-rendimiento-de-una-aplicacion-hecha-en-django/). Para base de datos grandes es mejor fraccionar la respuesta en páginas, con un número limitado de elementos por cada página.

Para facilitar el uso de tu API, considera añadir la información relacionada a la paginación en tu respuesta:

- El total de elementos
- La cantidad de elementos por página
- El total de páginas
- La página actual
- Una url a la página previa (en caso de que exista)
- Una url a la página siguiente (en caso de que exista)

Así como cualquier otro dato que consideres pertinente.

```json
{
    "data": [
         {}
    ],
    "pagination": {
        "total": 60,
        "items_per_page": 12,
        "current_page": 1,
        "total_pages": 5,
        "next_url": "https://api.example.com/items?page=2",
    }
}
```

## Versionado de APIs

Las APIs no son estáticas, cambian con las necesidades del negocio, por lo que pueden cambiar con el tiempo. Es importante que los consumidores de tu API estén al tanto de esos cambios, por lo que versionar tu API es una buena idea.

### ¿Debería mantener versionar mi API?

Generalmente querras versionar tu API. Sin embargo, si tu API es sumamente simple y su estructura es extremadamente estable, o funciona de manera que los cambios se agregan como nuevos endpoints, sin modificar los anteriores, podrías dejarla sin versionar. Si tienes dudas respecto a lo anterior, probablemente deberías versionarla.

### ¿Dónde versionar el API?

Para que una API se apegue a los [requisitos de la arquitectura REST](https://coffeebytes.dev/caracteristicas-basicas-de-una-api-rest-y-recomendaciones/) debe cumplir con ciertas características, pero algunas compañias deciden incumplirlas y denominar a sus API como REST. Aquí te dejo algunas opciones para versionar tu API usadas por grandes compañias, sin importar si cumplen con REST o no.

### A nivel url

Probablemente la opción más popular de todas.

Increíblemente simple de entender e implementar pero le ocasionará problemas con clientes que guardan las URLs en base de datos. Cuesta trabajo separarlos en diferentes servidores. Técnicamente, esta opción no es REST.

Ejemplos de compañias: Twitter, dropbox, youtube, etsy.

```bash
http://dominio.com/api/v1/
```

### A nivel dominio

Bastante simple de entender e implementar pero traerá problemas a aquellos clientes que guardan las urls en base de datos. Nuevamente, técnicamente, no es REST.

Ejemplos de compañias: Twitter, dropbox, youtube, etsy.

```bash
http://apiv1.dominio.com
```

### Por medio de parámetros en la url o en el body

Mantiene la misma url, solo cambian los parámetros. Trae problemas con clientes que guardan las urls y sus parámetros en la base de datos. Técnicamente no es REST.

Ejemplos de compañias: Google data, Paypal.

```bash
http://apiv1.dominio.com/recurso?version=1
```

En el body de la petición HTTP luciría así:

```bash
POST /places HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
    "version" : "1.0"
}
```

### Por medio de cabeceras HTTP

Conserva las mismas urls pero puede confundir a los sistemas de caché.

Ejemplo de compañias: Azure.

```bash
GET /recursos HTTP/1.1
Host: api.example.com
ApiVersion: 1.0
Vary: ApiVersion
```

Considera que necesitas [añadir una cabecera vary para que los sistemas de caché no guardan diferentes versiones de la API en una misma url.](https://coffeebytes.dev/cache-en-django-rest-framework-con-memcached/)

### En el content negotiation

¿Recuerdas ese mecanismo definido en el protocolo HTTP que te permite obtener diferentes versiones de un recurso? Pues además de aplicar para formatos puede ser usado para especificar versiones.

Mantiene las msimas urls, puede confundir a los desarrolladores que no entienden de headers.

Ejemplos de compañias: Github, Adidas.

```bash
application/vnd.github[.version].param[+json]
```

## ¿Qué tanto anidar los recursos de una API?

Cuando tenemos relaciones entre nuestros recursos, es bastante tentador colocar URL's jerárquicas, complicando el uso de la API.

```bash
# /recurso/<id>/subrecurso/<id>/subsubrecurso/<id>/subsubsubrecurso ❌
/clientes/99/pedidos/88/productos/77/variantes ❌
```

La documentación de [DRF sugiere una estructura plana](https://www.django-rest-framework.org/api-guide/relations/#example_2) a la hora de diseñar APIs

[Microsoft también recomienda mantener las URIs lo más simples posibles.](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) ¿Pero como me refiero a los recursos más profundas de la URL? Pues puedes crear una endpoint con uno o dos niveles de anidación y acceder directamente a ellos.

```bash
# /subrecurso/<id>
```

Las URLs del tipo anterior pueden acortarse accediendo directamente usando la referencia directa al recurso.

```bash
# /subrecurso/<id>/subsubrecurso/<id>
/pedidos/88/productos/77
```

Aprecia como incluso en la ausencia de la parte inicial de la URI anterior, podemos acceder al recurso.

## Notificar sobre actualizaciones de las API

En el libro Two Scoops of Django, los autores recomiendan los siguientes pasos para notificar un cambio de versión de API.

- Notificar a los usuarios con tanta anticipación como se pueda por medio de email, blogs o cualquier medio, casi hasta el punto del hartazgo.
- Reemplazar la API con una error HTTP 410 que devuelva un mensaje que contenga enlaces hacia: el nuevo endpoint, a la nueva documentación y, sí existe, al texto que explique el porque de los cambios.


## Limitar tu API

Deberías limitar tu API. Los usuarios no deberían tener acceso sin restricciones y peticiones ilimitadas a tu API. Hay usuarios que pueden abusar de tu API, mantener tu servidor ocupado, sin que el resto de usuarios puedan usarlo e incrementar tus costos.

Una manera de solucionarlo es establecer una [política de throttling en tu servidor](https://coffeebytes.dev/throttling-en-nginx/) para cualquier usuario.

También puedes volverlo el centro de tu negocio y ofrecer planes de pago de acuerdo al número de peticiones por minuto a tu API.


## Fuentes de referencia

- [Documentación de JSON:API](https://jsonapi.org/)
- [Mejores prácticas de diseño de APIs en Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
- [Sturgeon, P. (2015). _Build Api’s_. Philip J. Sturgeon.](https://www.amazon.com.mx/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2W0ZTSCO349YL&keywords=build+apis&qid=1648756000&sprefix=build+apis%2Caps%2C187&sr=8-1)
- [Massé, M. (2012). REST API design rulebook. Sebastopol, CA: O'Reilly.](https://www.amazon.com.mx/Rest-API-Design-Rulebook-Consistent/dp/1449310508)
- Two scoops of Django