---
title: "Go: functions, arguments and the fmt package"
date: "2021-11-30"
categories:
- go

coverImage: "images/GoFunciones.jpg"
description: "Learn the basic syntax, returns, return types, multiple arguments and use of the fmt package of the go programming language."
keywords:
- go

authors:
- Eduardo Zepeda
---

This entry will discuss the basic syntax of Go functions. If you know absolutely nothing about go visit my entry [go: introduction to programming language, variables and data types](/en/go-programming-language-introduction-to-variables-and-data-types/) to start from the beginning of this tutorial series.

{{<box link="/en/pages/go-programming-language-tutorial/" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, you can find it directly in the top menu bar or clicking this box.">}}

Now, let's move on to the functions.

## Functions in go

In go functions are declared by prefixing the word _func_ to the function name. As follows:

```go
func borrarRoot() { }
```

Remember that being a compiled language, go requires you to specify the data type in the arguments.

```go
func borrarRoot(argumento int, otroArgumento int) { }
```

If the two arguments are of the same type, we can save a word by omitting the first type, in this case _int_.

```go
func borrarRoot(argumento, otroArgumento int) {}
```

### Return in go

As in almost all languages we use the word _return_ in a function to return a value.

A function **does not require you to return anything necessarily**, and you do not need to specify a return, as you would in C++ and other similar languages.

On the other hand, **if your function does have a return, you need to specify the type of data to return,** placing it after the arguments.

```go
func RetornaUno(argumento, otroArgumento int) int{
    return 1
}
```

Likewise, we can return two values, as if it were a tuple.

```go
func retornaUnoYDos(argumento, otroArgumento int) (int, int) {
    return 1, 2
}
```

And, just like in Python, it is possible to assign those two values to two different variables, separating them by a comma.

```go
a, b = retornaUnoYDos()
```

### Return a function in go

In go, functions "are first class citizens" so, in go, **functions can return functions.** **functions are first class citizens so, in go, **functions can return functions.

```go
func retornaFuncion(argumento, otroArgumento int) func() {
    return func() {
        return 1
}
```

And, as the function returns a function we can call the latter within any other block as follows:

```go
// El equivalente a a llamar a la función retornada
retornaFuncion()()
```

### Return no name

Go has a special way to return a value implicitly, without having to place it after _return_.

```go
func split(sum int) (x, y int) {
        // retornará x y x de manera implícita
        x = sum * 4 / 9
        y = sum - x
        return
    }
```

This syntax may seem a bit tricky, but it is really very simple. Remember I told you that the type of data that a function returns goes after the arguments? (x, y int)_ Well here, in addition to the type, we specify which variables will be returned and of what type, **in case we don't put anything after return**.

Basically we are telling go: "hey, if I don't put anything after the return, return the variables "x" and "y", which are of type _int_.

### Variadic functions

In go, functions that receive a variable number of arguments require you to pass the name of the argument that will contain it, followed by ellipses and the data type.

```go
func multiples(nums ...int) {
    fmt.Println(nums)
}
```

If you were to execute the function you would see that it returns an array.

```go
multiples(1, 2, 3, 4, 5)
// [1 2 3 4 5]
```

There, that concludes my summary of the functions. Now let's move on to one of go's essential packages, the fmt package.

## fmt package

This package is the one you will normally use to print statements on the screen and, I can see it in the future, the one you will use incorrectly for debugging.

First of all, **fmt stands for format package and it is the package that will be in charge of formatting any type of input or output data**. By data input and output, I mean what your older colleagues would call [stdin and stdout in GNU/Linux](https://es.wikipedia.org/wiki/Entrada_est%C3%A1ndar).

By the way, fmt has support for special characters, so you can print subtitles in the original language of your favorite anime.

### Println

If you have already worked with other programming languages, it is your classic print, echo, console.log or equivalent function, with its _newline_ added at the end.

Println is able to print several arguments in a row, even if they are of different types.

```go
import "fmt"
// ...
fmt.Println(1, "彼氏彼女の事情", nil)
```

### Printf

Printf is like Println but with position operators that tell go the type of data we are passing to it. Yes, just like the C++ function

```go
texto := "World!"
numero := 42
// %s es de string y %d de digit
fmt.Printf("Hello %s %d", texto, numero)
```

### Types of operators

Did you see that I used the operator types %s and %d, for strings and digits, respectively? Well, in go there are multiple types of operators for many, many types of data.

There are some position traders that I consider noteworthy.

* T, data type (string, int, boolean, etc).
* %v, value in the default go format.
* %t, For boolean, returns the word false or true.
* %x, base number 16
* %o, base 8 number
* %e, scientific notation number
* %9.2f, float with width of 9 and precision of 2
* %.2f, float with default width and precision of 2
* %q a string or text string, enclosed in quotes, previously escaped

You can see the rest of the operators in the [official go documentation](https://pkg.go.dev/fmt).

### Sprintf

Sprintf has the same syntax as printf, but **with the difference that it does not print to the screen, but generates a string**.

```go
var message string = fmt.Sprintf("Hello %s %d", texto, numero)
```

But what if we want to get input from a user? Well, just like in C, we have the scan function.

### Scan

Scan will read the standard input text (stdin) until it finds the first space or line break and return the number of arguments received.

If you don't know what the ampersand "&" means, you can think of it as the address in memory to which the message variable corresponds.

If you still have no idea what I'm talking about, you're going to have to do some research on pointers. There is too much information available on the internet to create a new entry.

```go
var mensaje string
fmt.Scan(&mensaje)
fmt.Println(mensaje)
```

The above code does only two things: it saves the text we type in the console in the message variable and then prints it on the screen.

![Scan in golang or go](images/scanfEnGolang.gif)

### Scanf

Scanf is like Scan, but to store multiple arguments, separated by spaces.

See how we first create the three variables, and then, as the first argument to Scanf, we pass the order in which it will receive the arguments as a data type, separated by space, and at the end the address of the variables to which it has to assign them.

```go
var (
    	nombre string
    	apellido string
    	telefono int
    )
        // nombre apellido telefono
    fmt.Scanf("%s %s %d", &nombre, &apellido, &telefono)
    fmt.Printf("Nombre: %s, Apellido: %s, telefono: %d", nombre, apellido, telefono)
```

Notice how we indicate the separation of each argument by a space.

![Scanf in golang or go](images/ScanfMultiplesArgumentosGolang.gif)

### Handling errors on Scanf and Scan

Scanf and Scan, in addition to saving text in variables, also return the number of assigned arguments and, only in case of occurrence, an error message.

```go
var (
    	nombre string
    	apellido string
    	telefono int
    	argumentos int
    	err error
    )
    argumentos, err = fmt.Scanf("%s %s %d", &nombre, &apellido, &telefono)
    if err != nil {
    	fmt.Printf("Error: %s", err)
    } else {
    	fmt.Printf("Todo bien, recibimos %d argumentos: %s, %s, %d", argumentos, nombre, apellido, telefono)
    }
```

See what happens if we try to pass it an argument of the wrong type.

![Error of scanf arguments in go](images/ErrorScanfArgumentos.gif)

The first time the function is executed everything goes well and happens normally, but the second time it returns an error because we are trying to pass Scanf an argument of type string, and it is waiting for one of type int.

If you want to see the rest of the features that this go package has to offer, check the [official documentation of the fmt. package](https://pkg.go.dev/fmt)