---
date: '2024-06-08T14:10:45-06:00'
title: 'Go Programming Language Tutorial'
description: ''
keyword: Go Programming Language Tutorial
keywords:
- go
- tutorial
- compiled
authors:
- 'Eduardo Zepeda'
---

I wrote a series of entries trying to serve as a guide an introduction to learn the Go programming language. This tutorial requires you to know at least the basis of programming, so it's probably a good idea to read this only if you're learning Go as your second or third programming language. This content goes from Go's basic syntax to advances uses as signal catching or containerization.

## Go language introduction and Basic Syntax

Introduction to the Go programming language, native data types, variables, the controversy around this language, the good, the bad, the ugly and even a glimpse to its popular, and sometimes hated, mascot.

[{{<title "/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index">}}]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}})

How to create go functions and pass arguments to them, along with the basis of the fmt package used to print text on the screen

[{{<title "/posts/go/go-funciones-argumentos-y-el-paquete-fmt/index">}}]({{< ref path="/posts/go/go-funciones-argumentos-y-el-paquete-fmt/index.md" lang="en" >}})

Master the different type of loops that exist in go, learn how to use flow control to execute your code conditionally and learn about they break, continue and defer clauses.

[{{<title "/posts/go/go-ciclos-o-bucles-for-break-continue-defer-if-y-else/index">}}]({{< ref path="/posts/go/go-ciclos-o-bucles-for-break-continue-defer-if-y-else/index.md" lang="en" >}})

Create array and slices and know their differences and how to iterate over them correctly using range.

[{{<title "/posts/go/go-arrays-y-slices/index">}}]({{< ref path="/posts/go/go-arrays-y-slices/index.md" lang="en" >}})

Learn how do map or dictionaries work internally, the different ways to create them and how to iterate over them using range.

[{{<title "/posts/go/go-maps-o-diccionarios/index">}}]({{< ref path="/posts/go/go-maps-o-diccionarios/index.md" lang="en" >}})

Read about the main differences that exist between string, runes and bytes in go, how they work internally and their main related methods.

[{{<title "/posts/go/go-strings-runes-y-bytes/index">}}]({{< ref path="/posts/go/go-strings-runes-y-bytes/index.md" lang="en" >}})

## Go Programming Language Tutorial: Object oriented programming

Go doesn't have classes, but you can emulate OOP features (polimorfism, inheritance and encapsulation) using go structs.

[{{<title "/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index">}}]({{< ref path="/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="en" >}})

How to handle and import and reference packages and modules in go.

[{{<title "/posts/go/go-importacion-de-paquetes-y-manejo-de-modulos/index">}}]({{< ref path="/posts/go/go-importacion-de-paquetes-y-manejo-de-modulos/index.md" lang="en" >}})

## Go Programming Language Tutorial: Concurrency and Corroutines

The feature that makes go stand out: concurrency and goroutines, learn how to create and handle them.

[{{<title "/posts/go/go-introduccion-a-las-goroutines-y-concurrencia/index">}}]({{< ref path="/posts/go/go-introduccion-a-las-goroutines-y-concurrencia/index.md" lang="en" >}})

Here I explain you how to communicate goroutines through channels and the main principles to take care of when working with concurrent code.

[{{<title "/posts/go/go-uso-de-channels-canales/index">}}]({{< ref path="/posts/go/go-uso-de-channels-canales/index.md" lang="en" >}})

Understand the concept of deadlocks in the context of working with goroutines, how to avoid them and what causes this problem.

[{{<title "/posts/go/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/index">}}]({{< ref path="/posts/go/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/index.md" lang="en" >}})

The basics of race conditions when working with concurrent code and how to prevent them. Create race condition resistant code using mutexes in Go

[{{<title "/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index">}}]({{< ref path="/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="en" >}})

## Go Programming Language Tutorial: Testing and Logging

The basis of go testing and coverage capabilities.

[{{<title "/posts/go/go-testing-basico-y-coverage/index">}}]({{< ref path="/posts/go/go-testing-basico-y-coverage/index.md" lang="en" >}})

How to profile and examine code performance using go.

[{{<title "/posts/go/go-profiling-de-cpu/index">}}]({{< ref path="/posts/go/go-profiling-de-cpu/index.md" lang="en" >}})

How to use the default logging library in go programming language.

[{{<title "/posts/go/logging-en-go/index">}}]({{< ref path="/posts/go/logging-en-go/index.md" lang="en" >}})

## Go Applications

How to catch signals and process them in go to end your code execution in an elegant and safe way.

[{{<title "/posts/go/apagado-elegante-de-aplicaciones-en-go/index">}}]({{< ref path="/posts/go/apagado-elegante-de-aplicaciones-en-go/index.md" lang="en" >}})

Learn how to handle SQL migrations using go's migrate library

[{{<title "/posts/go/migraciones-en-go-con-migrate/index">}}]({{< ref path="/posts/go/migraciones-en-go-con-migrate/index.md" lang="en" >}})

The basis of go's reflection library and how to create flexible code that deals with unknown types

[{{<title "/posts/go/el-paquete-reflections-de-go/index">}}]({{< ref path="/posts/go/el-paquete-reflections-de-go/index.md" lang="en" >}})

Did you know that Docker is written in Go? Have you ever wondered how does a docker container works internally? Well I explain all the concepts that you need to know here in order to create your own containerization technology.

[{{<title "/posts/docker/como-funciona-un-container-de-docker-internamente/index">}}]({{< ref path="/posts/docker/como-funciona-un-container-de-docker-internamente/index.md" lang="en" >}})

I explain the worker pool design pattern in go and how to take advantage of Go's concurrency and this design pattern to limit the amount of resources that your application uses.

[{{<title "/posts/arquitectura-de-software/el-patron-de-diseno-worker-pool-aprovechando-la-concurrencia-en-go/index">}}]({{< ref path="/posts/arquitectura-de-software/el-patron-de-diseno-worker-pool-aprovechando-la-concurrencia-en-go/index.md" lang="en" >}})