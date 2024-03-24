---
title: "Buenas prácticas y diseño de una API REST"
date: "2022-04-28"
categories: 
  - "arquitectura de software"
  - "opiniones"
coverImage: "images/buenDisenoAPIREST.jpg"
description: "Buenas prácticas de diseño de una API REST, como versionarla, actualizarla y anidar los recursos en las URI."
keywords:
  - arquitectura de software
  - opinion
  - REST
  - api
authors:
  - Eduardo Zepeda
---

¿Cómo diseño una API REST? ¿Cuántos niveles debo anidar mis recursos relacionados? ¿URLs relativas o completas? Este post es una recopilación de ciertas recomendaciones sobre algunas buenas praćticas de diseño de APIs REST que he encontrado en libros y artículos de internet. Dejo las fuentes al final del artículo por si te interesa profundizar o ver de donde viene esta información.

Antes de empezar, hay una serie de [características básicas de una API REST](/es/caracteristicas-basicas-de-una-api-rest/), las cuales expuse en una entrada pasada, revísalas si tienes dudas. En esta entrada te voy a hablar un poco de algunos aspectos más subjetivos relacionados con el diseño de APIs REST.

Recuerda que una API REST puede devolver otros formatos, no solo JSON, pero voy a centrarme en este para los ejemplos porque es bastante popular. 

Voy a comenzar con una pregunta bastante común: ¿cómo estructuro mi respuesta JSON?

## Estructura para respuestas JSON

Hay diferentes maneras de estructurar la respuesta de una API REST. No hay ninguna válida ni inválida, depende del gusto de cada equipo y las necesidades de la aplicación. **Lo importante aquí es mantener la consistencia y la homogeneidad en todas tus respuestas**.

### Según json:api

Existe un [grupo de personas que se propusieron estandarizar las respuestas JSON](https://jsonapi.org/) en un único estilo de respuesta, tanto para devolver recursos únicos o múltiples. Puedes tomar su estilo como referencia cuando diseñes su API para garantizar la uniformidad de las respuestas.

```json
{
    "products": [{
        "id": 1,
        "title": "titulo"
    }]
}
```

### API estilo Twitter

Twitter tiene su propia manera de hacer las cosas, la respuesta de un recurso individual se ve así:

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

¿A quien hacerle caso? Como puedes ver diferencias entre compañias y no se si me atrevería a decirte que una u otra es correcta, pero considero que si te mantienes constante en cada uno de tus endpoints y lo documentas bien, no deberías tener problemas.

## ¿URLs relativas o completas en HATEOAS?

¿Recuerdas que HATEOAS es una [característica de las APIs REST](/es/caracteristicas-basicas-de-una-api-rest/)? Pues, según lo que he investigado, no hay un consenso claro ni una postura oficial sobre si es mejor incluir URLs relativas o completas. Hay mucho debate al respecto en stackoverflow, pero microsoft usa URLs completas en sus respuestas, tómalo en cuenta cuando diseñes tu API REST.

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

Esto puede traerte el problema de las n+1 queries si no lo manejas bien; considera el ejemplo anterior, cada solicitud a un post implica una nueva petición a la base de datos para obtener cada comentario.

Por supuesto que eso puede arreglarse optimizando tus búsquedas de manera que, en lugar de obtenerlos individualmente, los obtengas en una sola query.

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

Como ya te he mencionado en entradas anteriores cuando hablé de Django, por motivos de [rendimiento en tus aplicaciones](/es/tu-aplicacion-de-django-va-lenta-maximiza-su-rendimiento-con-estos-tips/), no siempre querrás devolverle toda la base de datos a tus usuarios en cada petición. Para base de datos grandes es mejor fraccionar la respuesta en páginas, con un número limitado de elementos por cada página.

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

Las APIs no son estáticas, cambian con las necesidades del negocio, por lo que pueden cambiar con el tiempo. Es importante que los consumidores de tu API estén al tanto de esos cambios, por lo que versionar tu API es una excelente idea.

### ¿Debería versionar mi API?

Generalmente querras versionar tu API. Sin embargo, si tu API es sumamente simple y su estructura es extremadamente estable, o funciona de manera que los cambios se agregan como nuevos endpoints, sin modificar los anteriores, podrías dejarla sin versionar. Si tienes dudas sobre si tu API encaja en loanterior, probablemente deberías versionarla.

### ¿Dónde versionar el API?

Para que una API se apegue a los [requisitos de la arquitectura REST](/es/caracteristicas-basicas-de-una-api-rest/) debe cumplir con ciertas características, pero algunas compañias deciden obviar estos requisitos para sus APIs y, aún así, denominarlas REST. 

Aquí te dejo algunas opciones para versionar tus APIs usadas por grandes compañias, sin importar si cumplen con REST o no.

### A nivel url

Probablemente la opción más popular de todas.

Increíblemente simple de entender e implementar pero le ocasionará problemas con clientes que guardan las URLs en base de datos, pues con cada cambio habrá que actualizarlas. Además cuesta trabajo separarlos en diferentes servidores. Técnicamente, **colocar la versión en la url no es REST**.

Ejemplos de compañias: Twitter, dropbox, youtube, etsy.

```bash
http://dominio.com/api/v1/
```

### A nivel dominio

Bastante simple de entender e implementar pero traerá problemas a aquellos clientes que guardan las urls en base de datos. Nuevamente, técnicamente, **colocar la versión en el dominio no es REST**.

Ejemplos de compañias: Twitter, dropbox, youtube, etsy.

```bash
http://apiv1.dominio.com
```

### Por medio de parámetros en la url o en el body

Mantiene la misma url, solo cambian los parámetros. Trae problemas con clientes que guardan las urls y sus parámetros en la base de datos. Técnicamente **usar parámetros para el versionado de la API no es REST**.

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
Host: example.com
ApiVersion: 1.0
Vary: ApiVersion
```

Considera que necesitas añadir una cabecera vary para que los [sistemas de caché](/es/cache-en-django-rest-framework-con-memcached/) no guardan diferentes versiones de la API en una misma url.

### En el content negotiation

¿Recuerdas ese mecanismo definido en el protocolo HTTP que te permite obtener diferentes versiones de un recurso? Pues además de aplicar para formatos puede ser usado para especificar versiones.

Mantiene las msimas urls, puede confundir a los desarrolladores que no entienden de headers.

Ejemplos de compañias: Github, Adidas.

```bash
application/vnd.github[.version].param[+json]
```

En REST una cosa son los recursos y otra su representación, los recursos, además del formato, tienen otra forma de representación, la cual es la versión de la API, por lo que esta manera sí cumple con REST. Aunque su uso puede ser un poco más confuso para las personas no familiarizadas con el protocolo HTTP.

## ¿Qué tanto anidar los recursos de una API?

Cuando tenemos relaciones entre nuestros recursos, es bastante tentador colocar URL's jerárquicas, complicando el uso de la API.

```bash
# /recurso/<id>/subrecurso/<id>/subsubrecurso/<id>/subsubsubrecurso ❌
/clientes/99/pedidos/88/productos/77/variantes ❌
```

La documentación de [DRF sugiere una estructura plana](https://www.django-rest-framework.org/api-guide/relations/#example_2) a la hora de diseñar APIs.

La guia de estándares de APIs de la casa blanca también aboga por anidaciones muy cortas, poniendo como límite 

```bash
recurso/<id>/recurso
```

[Microsoft también recomienda mantener las URIs lo más simples posibles.](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) ¿Pero como me refiero a los recursos más profundas de la URL? Pues puedes crear una endpoint con uno o dos niveles de anidación y acceder directamente a ellos.

```bash
# /subrecurso/<id>
```

### ¿Y cómo lidiar con recursos relacionados?

Las URLs muy largas, con múltiples jerarquias anterior pueden acortarse accediendo directamente usando la referencia directa al recurso.

En lugar de tener un endpoint que requiera toda la jerarquia en la URI. Como en este ejemplo:

```bash
tienda/99/clientes/99/pedidos/88/productos/77
```

Reduce la longitud del endpoint al mínimo, el identificador debe de bastar para acceder al recurso.

```bash
# /subrecurso/<id>/subsubrecurso/<id>
/pedidos/88/productos/77
```

Aprecia como incluso en la ausencia de la parte inicial de la URI anterior, podemos acceder al recurso y además es perfectamente legible.

## Notificar sobre actualizaciones de las API

A veces es necesario introducir cambios estructurales en las APIs, para prevenir que todos aquellos que la consuman presenten problemas, necesitamos notificarles. Pero... ¿cómo?

En el [libro Two Scoops of Django](/es/el-mejor-libro-de-django-resena-de-two-scoops-of-django/), los autores recomiendan los siguientes pasos para notificar un cambio de versión de API.

- Notificar a los usuarios con tanta anticipación como se pueda por medio de email, blogs o cualquier medio, casi hasta el punto del hartazgo.
- Reemplazar la respuesta de la API obsoleta con una error HTTP 410 que devuelva un mensaje que contenga enlaces hacia: el nuevo endpoint, a la nueva documentación de la API y, sí existe, al texto que explique el porque de los cambios.


## Limitar tu API

Deberías limitar tu API. Los usuarios no deberían tener acceso sin restricciones y peticiones ilimitadas a tu API. Hay usuarios que pueden abusar de tu API, mantener tu servidor ocupado, impidiéndo que el resto de los usuarios puedan usarla e incrementando tus costos.

Una manera de solucionarlo es establecer una [política de throttling](/es/throttling-en-nginx/) en tu servidor para cualquier usuario.

También puedes volverlo el centro de tu negocio y ofrecer planes de pago de acuerdo al número de peticiones por minuto a tu API.

## Caracteres especiales en la URI

Usa solo caracteres válidos en tu URI. 

De acuerdo a la especificación [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3), los únicos caracteres válidos, es decir, que no necesitan codificarse, en una URI, son las letras del alfabeto básico latinos, dígitos y algunos caracteres especiales (siempre y cuando se usen para su propósito).

* Caracteres seguros [0-9a-zA-Z]: no necesitan codificarse
* Caracteres no reservados [- . _ ~]: no necesitan codificarse
* Caracteres reservados [: / ? # [] @ ! $ & ' ( ) * + , ;] solo necesitan codificarse si no se usan para su propósito original (Por ejemp, una diagonal que no se use para separar rutas)
* Caracteres inseguros [< > % { } | \ ^ `]: necesitan codificarse
* El resto de caracteres necesitan codificarse.

Lo anterior está cambiando y se intenta agregar muchos más simbolos de diferentes lenguajes, puedes leer más al respecto en el artículo de [idn e iri de la w3](https://www.w3.org/International/articles/idn-and-iri/)

## Considera el SEO

Los motores de búsqueda consideran la URL para posicionar una página web, si para tu sitio web es importante el posicionamiento en buscadores, no te conformes con usar identificadores, comunica al motor de búsqueda el tema en la URL. El SEO y las URLs son un tema bastante amplio para resumirse en unas lineas, pero esto debería darte una idea de como buscar más información.

```bash
/posts/el-titulo-de-mi-post ✅
/posts/99-el-titulo-de-mi-post ✅
/posts/99 ❌
```

Espero que te haya servido la entrada, o que al menos te haya presentado material que no habías tomado en cuenta anteriormente al diseñar una API.

## Fuentes de referencia

- [Documentación de JSON:API](https://jsonapi.org/)
- [IRI and URI](https://www.w3.org/International/articles/idn-and-iri/)
- [Estándares API de la casa blanca](https://github.com/WhiteHouse/api-standards)
- [Mejores prácticas de diseño de APIs en Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
- [Sturgeon, P. (2015). _Build Api’s_. Philip J. Sturgeon.](https://www.amazon.com.mx/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2W0ZTSCO349YL&keywords=build+apis&qid=1648756000&sprefix=build+apis%2Caps%2C187&sr=8-1)
- [Massé, M. (2012). REST API design rulebook. Sebastopol, CA: O'Reilly.](https://www.amazon.com.mx/Rest-API-Design-Rulebook-Consistent/dp/1449310508)
- [Two scoops of Django](https://www.feldroy.com/books/two-scoops-of-django-3-x)