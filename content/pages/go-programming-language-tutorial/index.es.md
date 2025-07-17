---
date: '2024-06-08T14:10:45-06:00'
title: 'Go Programming Language Tutorial'
description: ''
keyword: ''
keywords:
- go
- tutorial
- compiled
authors:
- 'Eduardo Zepeda'
---

He escrito una serie de entradas que intentan servir de guía e introducción para aprender el lenguaje de programación Go. Este tutorial requiere que conozcas al menos las bases de la programación, por lo que probablemente sea una buena idea leerlo sólo si estás aprendiendo Go como tu segundo o tercer lenguaje de programación. Este contenido va desde la sintaxis básica de Go hasta usos avanzados como la captura de señales o la contenedorización.

## Introducción al lenguaje Go y Sintaxis Básica

Introducción al lenguaje de programación Go, tipos de datos nativos, variables, la polémica en torno a este lenguaje, lo bueno, lo malo, lo feo e incluso un vistazo a su popular, y a veces odiada, mascota.

[{{<title "/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index">}}]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="es" >}})

Cómo crear funciones go y pasarles argumentos, junto con la base del paquete fmt utilizado para imprimir texto por pantalla

[{{<title "/posts/go/go-funciones-argumentos-y-el-paquete-fmt/index">}}]({{< ref path="/posts/go/go-funciones-argumentos-y-el-paquete-fmt/index.md" lang="es" >}})

Domina los diferentes tipos de bucles que existen en go, aprende a utilizar el control de flujo para ejecutar tu código condicionalmente y conoce las cláusulas break, continue y defer.

[{{<title "/posts/go/go-ciclos-o-bucles-for-break-continue-defer-if-y-else/index">}}]({{< ref path="/posts/go/go-ciclos-o-bucles-for-break-continue-defer-if-y-else/index.md" lang="es" >}})

Crear array y slices y conocer sus diferencias y cómo iterar sobre ellos correctamente usando range.

[{{<title "/posts/go/go-arrays-y-slices/index">}}]({{< ref path="/posts/go/go-arrays-y-slices/index.md" lang="es" >}})

Aprende cómo funcionan internamente los map o diccionarios, las diferentes formas de crearlos y cómo iterar sobre ellos usando range.

[{{<title "/posts/go/go-maps-o-diccionarios/index">}}]({{< ref path="/posts/go/go-maps-o-diccionarios/index.md" lang="es" >}})

Lee sobre las principales diferencias que existen entre string, runas y bytes en go, cómo funcionan internamente y sus principales métodos relacionados.

[{{<title "/posts/go/go-strings-runes-y-bytes/index">}}]({{< ref path="/posts/go/go-strings-runes-y-bytes/index.md" lang="es" >}})

## Tutorial de Lenguaje de Programación Go: Programación orientada a objetos

Go no tiene clases, pero puedes emular características de POO (polimorfismo, herencia y encapsulación) usando go structs.

[{{<title "/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index">}}]({{< ref path="/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="es" >}})

Cómo manejar e importar y referenciar paquetes y módulos en go.

[{{<title "/posts/go/go-importacion-de-paquetes-y-manejo-de-modulos/index">}}]({{< ref path="/posts/go/go-importacion-de-paquetes-y-manejo-de-modulos/index.md" lang="es" >}})

## Tutorial de Lenguaje de Programación Go: Concurrencia y Corrutinas

La característica que hace destacar a go: concurrencia y goroutines, aprende a crearlas y manejarlas.

[{{<title "/posts/go/go-introduccion-a-las-goroutines-y-concurrencia/index">}}]({{< ref path="/posts/go/go-introduccion-a-las-goroutines-y-concurrencia/index.md" lang="es" >}})

Aquí te explico cómo comunicar goroutines a través de canales y los principios fundamentales a tener en cuenta cuando se trabaja con código concurrente.

[{{<title "/posts/go/go-uso-de-channels-canales/index">}}]({{< ref path="/posts/go/go-uso-de-channels-canales/index.md" lang="es" >}})

Entender el concepto de deadlocks en el contexto del trabajo con goroutines, cómo evitarlos y qué causa este problema.

[{{<title "/posts/go/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/index">}}]({{< ref path="/posts/go/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/index.md" lang="es" >}})

Los fundamentos de las condiciones de carrera cuando se trabaja con código concurrente y cómo prevenirlas. Crear código resistente a condiciones de carrera usando mutexes en Go

[{{<title "/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index">}}]({{< ref path="/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="es" >}})

## Tutorial de Lenguaje de Programación Go: Pruebas y Registro

La base de las capacidades de prueba y cobertura de go.

[{{<title "/posts/go/go-testing-basico-y-coverage/index">}}]({{< ref path="/posts/go/go-testing-basico-y-coverage/index.md" lang="en" >}})

Cómo perfilar y examinar el rendimiento del código usando go.

[{{<title "/posts/go/go-profiling-de-cpu/index">}}]({{< ref path="/posts/go/go-profiling-de-cpu/index.md" lang="es" >}})

Cómo usar la librería de logging por defecto en el lenguaje de programación go.

[{{<title "/posts/go/logging-en-go/index">}}]({{< ref path="/posts/go/logging-en-go/index.md" lang="es" >}})

## Aplicaciones Go

Cómo capturar señales y procesarlas en go para finalizar la ejecución de tu código de forma elegante y segura.

[{{<title "/posts/go/apagado-elegante-de-aplicaciones-en-go/index">}}]({{< ref path="/posts/go/apagado-elegante-de-aplicaciones-en-go/index.md" lang="es" >}})

Aprende a manejar migraciones SQL usando la librería migrate de go

[{{<title "/posts/go/migraciones-en-go-con-migrate/index">}}]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="es" >}})

La base de la librería reflection de go y cómo crear código flexible que trate con tipos desconocidos

[{{<title "/posts/go/el-paquete-reflections-de-go/index">}}]({{< ref path="/posts/go/el-paquete-reflections-de-go/index.md" lang="es" >}})

¿Sabías que Docker está escrito en Go? ¿Te has preguntado alguna vez cómo funciona internamente un contenedor Docker? Pues aquí te explico todos los conceptos que necesitas saber para crear tu propia tecnología de contenedorización.

[{{<title "/posts/docker/como-funciona-un-container-de-docker-internamente/index">}}]({{< ref path="/posts/docker/como-funciona-un-container-de-docker-internamente/index.md" lang="es" >}})

Explico el patrón de diseño worker pool en go y cómo aprovechar la concurrencia de Go y este patrón de diseño para limitar la cantidad de recursos que utiliza tu aplicación.

[{{<title "/posts/software-architecture/el-patron-de-diseno-worker-pool-aprovechando-la-concurrencia-en-go/index">}}]({{< ref path="/posts/software-architecture/el-patron-de-diseno-worker-pool-aprovechando-la-concurrencia-en-go/index.md" lang="es" >}})


