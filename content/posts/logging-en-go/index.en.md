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

{{<box link="/en/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, click here to read it it">}}

## Log Println

The log package is integrated into the standard logging library and its simplest function is Println which, for practical purposes, is like the standard Println but with some built-in benefits.

By default when logging something with go it will return the date and time, followed by the message we pass as an argument.

```go
log.Println("Message")
// 2022/06/28 13:38:25 Message
```

The Println method of log behaves exactly like the [fmt library](/en/go-functions-arguments-and-the-fmt-package/) method, so you can pass it multiple parameters and it will print them one by one.

{{<ad>}}

## Flags in logging

It is possible to change the default format in which the messages are displayed, change the order of the elements or add more information by calling the SetFlags method and passing it as arguments any of the flags provided by go.

```go
log.SetFlags(log.Ldate | log.Lshortfile)
log.Println("Message")
// 2022/06/28 main.go:10: Message
```

There are more flags available in addition to the above two.

### Flags available

Flags are available to show the full path to our file, the line number or to move the prefix and place it before the message. I leave them below.

```go
const (
    Ldate         = 1 << iota     
    // Local date: 2009/01/23
    Ltime                         
    // Local datetime: 01:23:23
    Lmicroseconds                 
    // Miscroseconds resolution: 01:23:23.123123. Asume Ltime.
    Llongfile                     
    // Full route and line number: /a/b/c/d.go:23
    Lshortfile                    
    // File and line number: d.go:23. Overwrites Llongfile
    LUTC                          
    // If Ldate or Ltime are active uses UTC instead of local time
    Lmsgprefix                    
    // Move the prefix and places it before the message 
    LstdFlags     = Ldate | Ltime 
    // Initial values: Ldate y Ltime
)
```

## Handling errors with logging

In addition to displaying information, it is possible to use methods, such as Panic and Fatal, to handle errors in our code.

### Logging Panic

The log method has a Panic method that prints a message and calls the panic function.

```go
log.Panic("System panicking")
```

Panic has two variants:

* Panicf: The equivalent of Printf, for formatting with position operators.
* Panicln: The equivalent of Println

### Logging Fatal

If we want to terminate the execution of our program immediately, without allowing the system to recover, we have at our disposal the Fatal method.

```go
log.Fatal("A fatal error has occurred")
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
file, _ := os.Create(name: "program.log")
log.SetOutput(file)
log.Println("Message to file")
file.Close()
```

## Customized loggers

The log package allows us to create different types of loggers, using the New method, this method receives the following arguments; first, the destination of our logs, as you saw, this can be to the Stdout, the Stderr, the Stdin or a file; second, the prefix to show in each message; third, the flags with which we want to format our logs.

```go
infoLogger := log.New(os.Stdout, prefix: "INFO: ", flags)
```

Once our log is created, we can call its Println method to display it in the standard output.

```go
infoLogger.Println("This is an Info message")
```