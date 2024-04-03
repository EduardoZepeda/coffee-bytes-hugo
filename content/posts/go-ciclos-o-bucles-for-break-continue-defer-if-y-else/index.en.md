---
title: "Go: loops for, break, continue, defer, if and else"
date: "2021-12-07"
categories:
- go

coverImage: "images/go-funciones-defer-break-continue-if-else.jpg"
description: "Syntax and basic uses of if and else structures, loops, their types, break, continue and defer in the go programming language."
keywords:
- go

authors:
- Eduardo Zepeda
url: /en/go-cycles-or-loops-for-break-continue-defer-if-and-else
---

This entry will deal with loops in the go programming language.

Go handles loops a little differently than what you are used to. If you're already fluent in any other programming language, you probably remember _while_, _do while_ and for loops. And if you come from Python or Javascript, you'll remember how useful _for x in_ or _for x of_ loops are.

Well, as there are more than enough loops for. Yes, there is no _while_ or do _while_. But then how do I use the rest of the loops? Read on and I'll explain.

If you don't know anything about Go and want to start with the basics visit my entry [Golang: introduction, variables and data types](/en/go-programming-language-introduction-to-variables-and-data-types/).

If you currently use Python and want to see how it is different from Go, visit my [python vs go](/en/python-vs-go-go-which-is-the-best-programming-language/) post.

## If and else

If_ and _else_ allow you to execute blocks of code conditionally and keep the same syntax as in almost all languages.

```go
if true {
    fmt.Println("Verdadero")
} else {
    fmt.Println("Falso")
}
```

### else if

And of course go also has an _else if_.

```go
edad := 18
if edad < 18 {
    fmt.Println("Menor de edad")
} else if edad > 18 {
    fmt.Println("Mayor de edad")
} else {
    fmt.Println("Tiene 18 exactamente")
}
```

## Loops for in go

In go **there are several types of for** loops: counter, conditional, range and infinite.

### Loops with counter

This is the classic loop that you already know from Javascript, C++, etc. In which you declare a variable, specify a condition, and make changes to the variable.

We declare "i" equal to 0, as long as "i" is less than 10, it executes the next block and subsequently increments "i" by one, each instruction separated by a semicolon.

```go
for i:= 0; i < 10; i++ {
    // ...
}
```

### Loop with conditional

In this type of loop a condition is evaluated, if the result is _true_, the block is executed, if not, that block of code is skipped. This type of for loop would be the equivalent of the _while_ loop.

```go
counter := 0
for counter < 10 {
    counter ++
}
```

### Loop with range

Range allows us to traverse an iterable structure from beginning to end and allows us to access the respective index and element. It is ideal for traversing _arrays_, _strings_, _slices_, _maps_, _channels_ and any structure that can be traversed.

```go
HolaMundo := "Hola mundo"
    for index, letra := range HolaMundo {
    	fmt.Printf("%d %c \n", index, letra)
    }
/*
0 H 
1 o 
2 l 
3 a 
4   
5 m 
6 u 
7 n 
8 d 
9 o*/
```

### Infinite loop

A _for_ loop without condition will run forever.

The only way to get out of an infinite for loop is with a _break_.

```go
counterForever := 0
for {
    counterForever++
}
```

## break

As I just mentioned, _break_ breaks a loop and continues code execution.

```go
counterForever := 0
for {
    counterForever++
    fmt.Println(counterForever)
    if counterForever > 5 {
        fmt.Println("Aquí se rompe el bucle")
        break
}
}
// 1
// 2
// 3
// 4
// 5
// 6
// Aquí se rompe el bucle
```

### Break in loops with name in go

In other programming languages, such as Python, _break_ would break the immediate loop, i.e. the immediate loop it is in. Wouldn't it be great to be able to stop the outer loop from the inner loop? In go it is possible in a simple way

```python
while True:
    while True:
        break
    print("El bucle principal continua ejecutándose")
# El bucle principal continua ejecutándose
# El bucle principal continua ejecutándose
# El bucle principal continua ejecutándose
```

Go allows us to assign names to the loops, what for? To reference specific loops and be able to break them using break. Take a look at this example:

```go
loop:
    for {
    	for {
    		fmt.Println("Rompiendo el bucle externo")
    		break loop
    	}
    	fmt.Println("Esto nunca se imprimirá en pantalla")
    }
```

We name our loop as loop and now we execute an infinite loop that will have an infinite loop inside it. This last loop will break the outer loop, named _loop_, so the second statement will never be printed on the screen.

## continue

Continue stops the current iteration of the loop and continues its execution in the next iteration.

```go
counter := 0
for counter < 10 {
    counter ++
    if counter == 3 {
        fmt.Println("Nos brincamos el 3")
        continue
    }
    fmt.Println(counter)
}
//1
//2
//Nos brincamos el 3
//4
```

## defer

Defer delays the execution of a line of code until the end of the code. It is quite similar to what the _defer_ attribute with HTML script tag does.

```go
defer fmt.Println("Esto se va a ejecutar hasta el final")
    fmt.Println("Esto se va a ejecutar primero")
    fmt.Println("Esto se va a ejecutar después")
// Esto se va a ejecutar primero
// Esto se va a ejecutar después
// Y esto se va a ejecutar hasta el final
```

What's the point? Well, it is ideal to close connections to databases, files or to make some type of cleaning to the objects of our code.

```go
const conexionBaseDeDatos := abreBaseDeDatos()
defer cierraBaseDeDatos()
queryBaseDeDatos()
otraQuery()
```

For the next Go entry I'm going to talk about the basics of _slices_, _arrays_ and _maps_.

Remember that you can visit the [official go documentation](https://go.dev/doc/) if there is anything you want to learn more about.