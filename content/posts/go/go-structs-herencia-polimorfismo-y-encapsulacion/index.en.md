---
aliases:
- /go-structs-herencia-polimorfismo-y-encapsulacion//1000
- /en/go-structs-inheritance-polymorphism-and-encapsulation/
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/Go-structs.jpg
date: '2022-01-04'
description: Declares structs in go and emulates the inheritance, polymorphism and
  encapsulation that are present in object-oriented programming.
keywords:
- go
- oop
title: 'Go: Structs, inheritance, polymorphism and encapsulation'
---

As I already mentioned to you in the [introduction to Golang or Go programming language]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}), this language does not have a reserved word for dealing with classes, but uses structs to emulate features such as inheritance, polymorphism, encapsulation and other properties of classes that you have probably used in other programming languages.

{{<box link="/en/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, click here to read it it">}}

## What are Structs in Go?

A [struct in go](https://go.dev/tour/moretypes/2) is a collection of fields. They are defined with the keyword _type_ followed by the name to assign and the word _struct_.

```go
type Videogame struct {
    Title string
    Year int
}
```

### Creating instances of a struct in go

Once the structure of our struct is defined, we can create instances of it.

```go
var myVideogame = Videogame{Title: "Nier", Year: 2017}
// The code below is valid only inside a function
myVideogame := Videogame{Title: "Nier", Year: 2017}
```

It is also possible to create an instance by declaring the data type and then assigning a value to the fields.

```go
var myVideogame Videogame
myVideogame.Title = "Nier"
```

If we do not specify a value, the respective zero value will be assigned to the [go variable type]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}).

```go
fmt.Println(myVideogame)
// {Nier 0}
```

{{<ad>}}

## Anonymous fields in Go structs

In go, **it is possible not to declare the name of the field of our struct and to place only the data type**. Done this way, the fields will adopt the name of the data type and we can access them using them.

```go
type Videogame struct { 
    string 
    int 
}

myVideogame := Videogame{string: "Title", int: 2017}
fmt.Println(myVideogame)
// Print {Title 2017}
```

What if we want a struct with many fields of the same type? Well, obviously **this feature will not work if we have multiple fields of the same type in our struct**.

## Privacy and encapsulation of structs

To mark a struct, function or variable as private or public, as well as their respective fields for the struct, **it is sufficient to declare the first letter of the field with upper or lower case**, for public and private, respectively.

![Go's privacy rules diagram](https://res.cloudinary.com/dwrscezd2/image/upload/v1744692459/coffee-bytes/golang-encapsulation_brfvjo.png)

Personally, I think this sucks, it is one of the most convuluted aspects of this language, why? because when you need to look for a private field, you would probably need to use regex, instead of just searching by the word *private*, yes, I know it sucks, but let's bear with it for now.

``` go
type MyData struct {
    Name string // public
    account string // private
}

```

Having said that, **accessing a private entity from another module, unrelated to where it is declared**, will be impossible. Whereas public entities are accessible from any module, even if the struct is not declared there.

* capitalized, public, accessible inside and outside the package where it is declared.
* lowercase, private, only accessible inside the package where it is declared.

```go
// Videogame struct representing a videogame entity
type Videogame struct {
    Title string
    Year int
}
```

## Composition and structs in go

We can group functionalities that involve our structs by declaring functions that access them. 

Feel free to think of them as methods in a class.

### How to access a struct in a method function in Go?

To access struct instances in functions we need to place a pair of parenthesis between the keyword _func_ and the function name. These parentheses contain the name we will use to access the struct instance, followed by the destructuring character and finally the struct name.

![Composition in go diagram](https://res.cloudinary.com/dwrscezd2/image/upload/v1744691812/coffee-bytes/struct-inheritance-golang_geyh9o.png)

```go
func (myStructVariable *Videogame) PrintYear(){
    fmt.Println(myStructVariable.Year)
}
```

Inside the function, the struct fields will be available using pointers, we pass it inside the parenthesis with the destructuring character.

```go
func (myStructVariable *Videogame) IncreaseYear(){
    myStructVariable.Year = myStructVariable.Year + 1
}
```

And once this "method" is declared, we can call the method we created through an instance of the struct. **Notice how it does not receive any argument but behaves as a method.**

```go
videogame.IncreaseYear()
```

### Customize the printout of a struct in go

If we declare a function to customize the console output called _String_, we will replace what the struct returns when we print it.

Think of it like overriding the __str__ method if you come from Python.

Note the absence of the destructuring operator in the parenthesis in the first set of parentheses and how I use the Sprintf method of the [go fmt-package](/en/go/go-functions-arguments-and-the-fmt-package/) to return a string.

```go
func (myStructVariable Videogame) String() string { 
    return fmt.Sprintf("Title: %s, Year: %d", myStructVariable.Title, myStructVariable.Year) 
}
```

Now every time we print a struct we will get a text string with the syntax we declared.

```go
fmt.Println(myVideogame)
// Title: Nier, Year: 2017
```

## Constructors in go

Go **does not have a mechanism similar to the constructors of other object-oriented languages**. However, it is quite common to create a function that emulates them, returning an object already initialized with the parameters we want to apply.

```go
func NewVideogame(year int, title string) *Videogame {
    return &Videogame{
        Title: title,
        Year: year,     
    }
}
```

This copy of a constructor is able to create instances of our struct _Videogame_.

```go
nier := NewVideogame(2017, "Nier")
fmt.Println(*nier)
// {Nier 2017}
```

## Golang inheritance using structs

Go **does not have a word for declaring inheritance in structs**, however it does have something similar that can function as a golang inheritance version of other languages like C++, Java or Python, but not exactly as you would like. It is composition.

### Extend a struct in Golang

If you want to extend a struct, you can add the structs you want as part of the struct. However, consider that Go does not have inheritance, but composition.

```go
type Person struct {
    Name string
    Lastname string
}

type Professor struct {
    Person
}
```

The code above will pass all the fields present in the first struct to the second struct, without having to explicitly declare them.

### Go doesn't have inheritance but composition

Go follows the [*composition over inheritance*]({{< ref path="/posts/software-architecture/favorecer-la-composicion-sobre-la-herencia-explicacion/index.md" lang="en" >}}) motto.

So when you add the new struct, you are not doing inheritance, you are adding a new struct to the original struct. So to access the fields of this one, first you need to access the struct you added.

``` Go
Professor.Person.Name
```

## Polymorphism using interfaces in go

Before dwelling with polymorphism itself, we must explain what an interface is, if you already mastered those concepts, go to the next section.

### What's an interface in simple words?

You can think of an interface as a kind of “blueprint” that tells an object what functions it must implement to work, each object can implement those functions as it wants, but it MUST implement them, in other words: *"it must satisfy the interface".*

For example: Think of an abstraction that represents each breathing animal, if an animal breathes, we take for granted that it must must implement the “breathe” interface, but each animal will implement it in an unique way, some will breathe using noses, others gills, some will do it very slow, others very fast, but all must implement a method to breathe.

![Interface concept explanation diagram](https://res.cloudinary.com/dwrscezd2/image/upload/v1744691203/coffee-bytes/interface-diagram-explanation_1_kcqiqs.png "As long as the animal can breath it satisfy the interface")

Based on the above, in Go interfaces are a method to differentiate the behavior of different objects. An interface will be in charge of calling the method that we specify corresponding to its struct type.

See how the interface declares that the type *fourSidesFigure* has a method called _area_ that returns a result of type _float64_.

```go
type fourSidesFigure interface{
    area() float64
}
```

Next we declare a different method called _area_ for both struct _square_ and struct _rectangle_, just as we did in the "Composition and structs" section of this entry.

```go
type rectangle struct {
    base float64
    height float64
}

type square struct {
    base float64
    height float64
}

func (c square) area() float64 {
    return c.base * c.base 
}

func (r rectangle) area() float64 {
    return r.base * r.base 
}
```

Now we will create a function that will receive as argument any type *fourSidesFigure*, and will execute its respective _area._ method.

### What's an interface for in Go?

Here it is necessary to put special emphasis, observe how the argument that we pass to the function is the interface that we created, **we are not interested in what type of *struct* we are passing as argument, the only thing that we care about is that this argument satisfies the interface.**

Again in case you miss it. **We don't care how the struct is built, the only requisite for it to work in our function is that it MUST satify the interface.**

In this case the interface is *fourSidesFigure*, hence, whatever we pass it as an argument must have a method called *area* that returns a *float64*.

When we use interfaces we can guarantee that the code works at a higher level, and we can leave the details of the low level functioning to its respective object, we can replace the implementation of the interface as long as it satisfies the interface's signature.

```go
type fourSidesFigure interface{
    area() float64
}

func calculate (f fourSidesFigure) {
    fmt.Println("Area", f.area())
}
```

To call the respective method we just call the function by passing it an instance of the struct as an argument.

```go
mySquare := square{base: 2}
calculate(square)
mirectangle := rectangle{base:2, height: 4}
calculate(mirectangle)
// Area 4
// Area 8
```

Surely if you come from other languages you will find Go syntax quite capricious, but I am sure you will be mastering it in a very short time, besides it's a low cost to pay for such simple and predictable code, any average Joe with the aid of AI can create Go code, I mean even I can.