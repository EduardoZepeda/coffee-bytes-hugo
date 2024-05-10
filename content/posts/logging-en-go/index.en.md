---
aliases:
- /logging-with-the-standard-library-in-go/
title: "Logging with the standard library in Go"
date: "2022-07-06"
coverImage: "images/logging-en-go.jpg"
categories:
- go

keywords:
- go
- testing
- logging

authors:
- Eduardo Zepeda
---

As you probably already know, you should not use prints for debugging. The standard go logging library is much more versatile, it adds dates, filenames and other information, plus you can redirect the logs to standard output, to a file or wherever you want. This can make your debugging process more enjoyable and [your go testing](/en/go-basic-testing-and-coverage/) easier.

## Log Println

The log package is integrated into the standard logging library and its simplest function is Println which, for practical purposes, is like the standard Println but with some built-in benefits.

By default when logging something with go it will return the date and time, followed by the message we pass as an argument.

```go
log.Println("Mensaje")
// 2022/06/28 13:38:25 Mensaje
```

The Println method of log behaves exactly like the [fmt library](/en/go-functions-arguments-and-the-fmt-package/) method, so you can pass it multiple parameters and it will print them one by one.

## Flags in logging

It is possible to change the default format in which the messages are displayed, change the order of the elements or add more information by calling the SetFlags method and passing it as arguments any of the flags provided by go.

```go
log.SetFlags(log.Ldate | log.Lshortfile)
log.Println("Mensaje")
// 2022/06/28 main.go:10: Mensaje
```

There are more flags available in addition to the above two.

### Flags available

Flags are available to show the full path to our file, the line number or to move the prefix and place it before the message. I leave them below.

```go
const (
    Ldate         = 1 << iota     
    // Fecha en el tiempo local: 2009/01/23
    Ltime                         
    // Hora en el tiempo local: 01:23:23
    Lmicroseconds                 
    // Resolución en microsegundos: 01:23:23.123123. Asume Ltime.
    Llongfile                     
    // Ruta completa del archivo y número de linea: /a/b/c/d.go:23
    Lshortfile                    
    // Archivo y número de linea: d.go:23. Sobreescribe a Llongfile
    LUTC                          
    // Si ya están Ldate o Ltime usa UTC en lugar del tiempo local
    Lmsgprefix                    
    // Mueve el prefijo del principio de la linea y lo coloca antes del mensaje. 
    LstdFlags     = Ldate | Ltime 
    // Los valores iniciales son Ldate y Ltime
)
```

## Handling errors with logging

In addition to displaying information, it is possible to use methods, such as Panic and Fatal, to handle errors in our code.

### Logging Panic

The log method has a Panic method that prints a message and calls the panic function.

```go
log.Panic("El sistema se paniquea")
```

Panic has two variants:

* Panicf: The equivalent of Printf, for formatting with position operators.
* Panicln: The equivalent of Println

### Logging Fatal

If we want to terminate the execution of our program immediately, without allowing the system to recover, we have at our disposal the Fatal method.

```go
log.Fatal("Error fatal ha ocurrido")
```

Like Panic, Fatal has two variants:

* Fatalf: The equivalent of Printf, for formatting with position operators.
* Fatalln: The equivalent of Println

## Redirecting logging output

As I mentioned before, the library allows us to redirect, through its SetOutput method, the output of our logging to a destination; either the Stdout, the Stderr, the Stdin or even a file.

```go
log.SetOutput(os.Stdout)
```

In the example above we are redirecting it to the standard output.

### Redirecting to a file

To redirect our logs to a file, we first need to create it and then pass it as an argument to the SetOutput method, after that, all our logs will be written to our file and we will be able to retrieve them later.

```go
file, _ := os.Create(name: "programa.log")
log.SetOutput(file)
log.Println("Mensaje a archivo")
file.Close()
```

## Customized loggers

The log package allows us to create different types of loggers, using the New method, this method receives the following arguments; first, the destination of our logs, as you saw, this can be to the Stdout, the Stderr, the Stdin or a file; second, the prefix to show in each message; third, the flags with which we want to format our logs.

```go
infoLogger := log.New(os.Stdout, prefix: "INFO: ", flags)
```

Once our log is created, we can call its Println method to display it in the standard output.

```go
infoLogger.Println("Este es un mensaje de info")
```