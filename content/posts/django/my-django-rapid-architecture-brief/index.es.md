---
date: '2025-12-15T22:16:00-06:00'
title: 'Te explico en que consiste la Django Rapid Architecture'
categories:
- Django
- Software architecture
coverImage: "images/django-rapid-architecture.jpg"
description: 'Descubre cómo aplicar django rapid architecture para estructurar proyectos Django de forma mantenible y sin complicaciones. Resumen de Django Rapid Architecture'
keyword: 'django rapid architecture'
keywords:
keywords:
- 'django'
- 'software architecture'
- 'opinion'
- 'rest'
- 'models'
- 'orm'
authors:
- 'Eduardo Zepeda'
---

El otro día estaba navegando por Reddit y encontré una propuesta de arquitectura para proyectos Django llamada "[Django Rapid Architecture](https://www.reddit.com/r/django/comments/1pko7q6/django_rapid_architecture_a_guide_to_structuring/)". Es un documento corto con algunas pautas o principios. Como me gusta Django, y creo que [Django es una de las mejores herramientas disponibles y que deberías usarlo]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}), lo leí y te hice un resumen.

Django Rapid Architecture es una colección de patrones y modismos cuidadosamente seleccionados. Su objetivo es crear bases de código Django mantenibles. El autor afirma que se basa en más de 15 años de experiencia y más de 100 proyectos en producción.

## ¿Qué tiene de malo la arquitectura por defecto de Django?

Bueno, según el autor: las "apps" de Django están diseñadas para componentes reutilizables, no para lógica de negocio específica del proyecto. Forzar todo el código dentro de apps crea inflexibilidad: las [Migraciones]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="es" >}}) hacen que las decisiones de límites tempranos sean irreversibles, lo que dificulta el refactor necesario en proyectos dinámicos.

Además, las apps prefieren el "encapsulado vertical", que agrupa vistas y modelos por funcionalidades. Para sistemas reales con dominios de negocio e interfaces interconectadas, esto no es ideal.

### ¿Cómo estructurar proyectos según Django Rapid Architecture?

En lugar de usar el paradigma por defecto de Django, estructura por capas:
- mantén separados los datos (modelos/migraciones)
- las interfaces (vistas HTTP/Management commands)
- y la lógica de negocio (readers/actions).

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1765860078/coffee-bytes/django-rapid-architecture_dpxnza.png" class="md-local-image" alt="Django rapid architecture overview"  width="747" height="747" >}}

Este "encapsulado horizontal" se alinea con la estratificación natural de Django, evita decisiones arquitectónicas tempranas que te aten y modela mejor dominios complejos.

#### Recuerda que Django es un monolito

El autor habla de que deberíamos abrazar los monolitos al principio, ya que son menos complejos y más mantenibles que los microservicios, y estoy totalmente de acuerdo: introducir complejidad innecesaria solo por hacerlo no te permite iterar lo suficientemente rápido, lo cual es crucial en un entorno que cambia tan rápido.

### ¿Cómo se ve la estructura de archivos en Django Rapid Architecture?

¿Y cómo se ve esto en la práctica? Pues algo así:

```bash
project/
├── actions
│   ├── some_domain.py
├── data
│   ├── migrations
│   │   ├── 0001_initial.py
│   └── models
│       └── some_model.py
├── interfaces
│   ├── management_commands
│   │   └── management
│   │       └── commands
│   │           └── some_management_command.py
│   └── http
│       ├── api
│       │   ├── urls.py
│       │   └── views.py
│       └── urls.py
├── readers
│   └── some_domain.py
├── settings.py
└── wsgi.py
```

La clave aquí es recordar que el código se divide en actions, datos, interfaces y readers.

## Capas en Django Rapid Architecture

### ¿Cómo manejar los datos?

#### ¿Qué hacer con los modelos?

Pon todos los modelos, sí, todos, dentro de una sola app llamada `data`.

Evita modelos ultra grandes y complejos con muchos métodos; la lógica compleja debería ser independiente de los modelos.

Evita la herencia que no sea la de `Model` de Django, así cualquier desarrollador puede ver el modelo y entender qué hace.

### ¿Y la lógica de negocio?

El código de lógica de negocio debería vivir en funciones simples con interfaces bien definidas, que operen sobre instancias de modelos, querysets o valores simples. Evita herencia compleja, mixins, decoradores, [managers personalizados complejos]({{< ref path="/posts/django/managers-o-manejadores-personalizados-en-django/index.md" lang="es" >}}) a menos que sea absolutamente necesario.

#### ¿Cómo lidiar con los readers?

Servir una respuesta en Django implica tres partes clave:

1. **La consulta**: se construye en la vista usando un queryset. Define qué filas/columnas traer, aplicando filtros, joins y optimizaciones. Algo de lógica puede estar en querysets personalizados.
2. **Los valores**: los datos que se enviarán. Los valores básicos vienen de los campos del modelo. La lógica de negocio compleja suele vivir aquí, en métodos del modelo (por ejemplo, `get_absolute_url`), transformando datos en bruto en valores útiles para la respuesta.
3. **La proyección**: la forma final de los datos para el cliente. Para una API JSON, es la serialización en un dict/list. Para HTML, es el renderizado de plantillas. Ambos usan los valores del paso 2. Aquí decides el formato exacto de salida.

#### Tipos de funciones en readers

Estoy simplificando esto; hay montones de ejemplos en el documento original, que te recomiendo leer a fondo. Pero los principales tipos de funciones para extraer y transformar datos de un modelo son:

- **Funciones de queryset**: encapsulan construcciones de querysets. Usa composición y funciones de orden superior.
- **Funciones productoras**: generan valores a partir de instancias de modelos, funciones que reciben una instancia y devuelven algo.
- **Funciones proyectores**: se basan en productores, devuelven un diccionario que mapea uno o más nombres a uno o más valores.

#### actions

Las [APIs REST]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="es" >}}) son complejas y no uniformes. Por eso deberíamos olvidarnos de todos los verbos HTTP secundarios y quedarnos solo con POST y GET.

Además, deberíamos asegurarnos de que una sola URL se mapee a una sola vista, que responda solo a GET o POST, no a ambas. Esto es algo similar al paradigma de [RPC y gRPC]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="es" >}}), del que ya hablé antes.

### Interfaces

#### SSR con plantillas de Django es lo mejor

Generar HTML en el servidor en lugar de usar una API con React puede aumentar la productividad. Se recomienda usar [HTMX combinado con Django]({{< ref path="/posts/django/django-y-htmx-web-apps-modernas-sin-escribir-js/index.md" lang="es" >}}); el documento también considera este enfoque superior a usar React.

#### Anida interfaces para evitar complejidad

Puedes organizar tu código para que imite la jerarquía de segmentos de tus URLs.

```bash
project/interfaces/http/urls.py
project/interfaces/http/api/urls.py
project/interfaces/http/api/admin/urls.py
project/interfaces/http/api/admin/widgets/urls.py
project/interfaces/http/api/admin/widgets/views.py
```

#### Management commands

Los [Django Management commands]({{< ref path="/posts/django/como-crear-un-comando-en-django/index.md" lang="es" >}}) también son una interfaz y deberían tratarse de forma similar a las vistas.

## ¿Dónde puedo aprender más sobre Django Rapid Architecture?

Recuerda que este texto es solo un resumen con las ideas principales; si quieres profundizar en esta propuesta de arquitectura llamada [Django Rapid Architecture](https://www.django-rapid-architecture.org/), lee el documento original. Te prometo que es corto, solo de unas pocas páginas, con algunos ejemplos más y la justificación de algunas decisiones.

