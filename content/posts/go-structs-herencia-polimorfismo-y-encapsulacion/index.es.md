---
aliases:
- /go-structs-herencia-polimorfismo-y-encapsulacion
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/Go-structs.jpg
date: '2022-01-04'
description: Declara structs en go y emula la herencia, polimorfismo y encapsulación
  que están presentes en la programación orientados a objetos.
keywords:
- go
- oop
title: 'Go: Structs, herencia, polimorfismo y encapsulación'
---

Como ya te mencioné en la [introducción al lenguaje de programación Golang o Go](/es/go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos/), este lenguaje no tiene una palabra reservada para tratar con clases, sino que usa structs para emular características como herencia, polimorfismo, encapsulación y otras propiedades de las clases que probablemente hayas usado en otros lenguajes de programación.

{{<box link="/es/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## Structs en go

Un [struct en go](https://go.dev/tour/moretypes/2) es una colección de campos. Se definen con el keyword _type_ seguido del nombre a asignar y la palabra _struct_.

```go
type Videogame struct {
    Title string
    Year int
}
```

### Crear instancias de un struct en go

Una vez definida la estructura de nuestro struct se pueden crear instancias del mismo.

```go
var myVideogame = Videogame{Title: "Nier", Year: 2017}
// Esto de abajo solo dentro de una función
myVideogame := Videogame{Title: "Nier", Year: 2017}
```

También es posible crear una instancia declarando el tipo de dato y después asignando un valor a los campos.

```go
var myVideogame Videogame
myVideogame.Title = "Nier"
```

Si no especificamos un valor, se asignará el respectivo zero value al [tipo de variable de go.](/es/go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos/)

```go
fmt.Println(myVideogame)
// {Nier 0}
```

{{<ad>}}

## Campos anónimos en structs

En go, es posible no declarar el nombre del campo de nuestro struct y colocar únicamente el tipo de dato. Hecho así, los campos adoptarán el nombre del tipo de dato y podemos acceder a ellos usándolos.

```go
type Videogame struct { 
    string 
    int 
}

myVideogame := Videogame{string: "Titulo", int: 2017}
fmt.Println(myVideogame)
// imprime {Titulo 2017}
```

¿Y que pasa si queremos un struct con muchos campos de un mismo tipo? Esta característica **no funcionará si tenemos múltiples campos del mismo tipo en nuestro struct**.

## Privacidad y encapsulación en los structs

Para marcar un struct, función o variable como privada o pública, igual que sus respectivos campos para el struct, **basta con declarar la primera letra del campo con mayúsculas o minúsculas**, para público y privado, respectivamente.

![Diagrama de reglas de privacidad de Golang](https://res.cloudinary.com/dwrscezd2/image/upload/v1744692459/coffee-bytes/golang-encapsulation_brfvjo.png)

Personalmente, creo que este es uno de los aspectos más complicados de este lenguaje, ¿por qué? porque cuando necesites buscar un campo privado, probablemente necesites usar regex, en lugar de simplemente buscar por la palabra *private*.

Acceder a una entidad privada desde otro módulo, ajeno a donde se declara**,** será imposible. Mientras que las entidades públicas son accesibles desde cualquier modulo, incluso si el struct no se declaró ahí

- mayúsculas, público, accesible dentro y fuera del paquete donde se declara.
- minúsculas, privado, solo accesible dentro del paquete donde se declara.

```go
// Videogame struct que representa a videogame
type Videogame struct {
    Title string
    Year int
}
```

## Composición y structs en go

Podemos agrupar funcionalidades que involucren a nuestros structs declarando funciones que accedan a estos.

Para acceder a instancias de structs en las funciones necesitamos colocar un par de parentesis entre la keyword _func_ y el nombre de la función. Estos paréntesis contienen el nombre que usaremos para acceder a la instancia del struct, seguido del caracter de desestructuración y, por último, el nombre del struct.

![Composición en Go, diagrama](https://res.cloudinary.com/dwrscezd2/image/upload/v1744691812/coffee-bytes/struct-inheritance-golang_geyh9o.png)

```go
func (myStructVariable *Videogame) PrintYear(){
    fmt.Println(myStructVariable.Year)
}
```

En el interior de la función, los campos del struct estarán disponibles usando punteros, lo pasamos dentro del parentesis con el caracter de desestructuración.

```go
func (myStructVariable *Videogame) IncreaseYear(){
    myStructVariable.Year = myStructVariable.Year + 1
}
```

Y una vez declarado este "método", podemos llamar al método que creamos a través de una instancia del struct. **Nota como no recibe ningún argumento sino que se comporta como un método.**

```go
videogame.IncreaseYear()
```

### Personalizar la impresión de un struct en go

Si declaramos una función para personalizar el output en consola llamada _String_, reemplazaremos lo que devuelve el struct cuando lo imprimimos.

Nota la ausencia del operador de desestructuración en el parentesis en el primer set de paréntesis y como uso el método Sprintf del [paquete fmt de go](/es/go-funciones-argumentos-y-el-paquete-fmt/) para devolver un string.

```go
func (myStructVariable Videogame) String() string { 
    return fmt.Sprintf("Titulo: %s, Año: %d", myStructVariable.Title, myStructVariable.Year) 
}
```

Ahora cada vez que se imprimamos un struct obtendremos una cadena de texto con la sintaxis que declaramos.

```go
fmt.Println(myVideogame)
// Titulo: Nier, Año: 2017
```

## Constructores en go

Go **no tiene un mecanismo similar a los constructores de otros lenguajes orientados a objetos**. Empero, es bastante común crear una función que los emule, devuelviendo un objeto ya inicializado con los parámetros que querramos aplicar.

```go
func NewVideogame(year int, title string) *Videogame {
    return &Videogame{
        Title: title,
        Year: year,     
    }
}
```

Esta copia de un constructor es capaz de crear instancias de nuestro struct _Videogame_.

```go
nier := NewVideogame(2017, "Nier")
fmt.Println(*nier)
// {Nier 2017}
```

## Herencia en structs en Golang

Go **no cuenta con una palabra para declarar herencia en los structs**, sin embargo sí tiene algo parecido. Para que un struct en go posea todos los campos que declara otro struct, le pasamos este último como un campo anónimo.

### Extender un struct en Golang

Para que un struct en go tenga todos los campos declarados por otro struct, pasamos este último como campo anónimo a otro struct.

```go
type Person struct {
    Name string
    Lastname string
}

type Professor struct {
    Person
}
```


## Polimorfismo usando interfaces en go

Puedes pensar en una interfaz como una especie de "plano" o "blueprint" que le dice a un objeto que funciones debe implementar para funcionar, cada objeto puede implementar esas funciones como quiera, pero debe implementarlas forzosamente. 

Por ejemplo: Piensa en una abstracción que representa a cada animal que respira, si un animal respira, damos por hecho que debe implementar la interfaz de "respirar", pero cada animal la implementará a su gusto, algunos respirarán usando narices, otros branquias, algunos lo harán muy lento, otros muy rápido, pero todos deben implementar un método para respirar.

![Explicación del concepto de interfaz en programación](https://res.cloudinary.com/dwrscezd2/image/upload/v1744691203/coffee-bytes/interface-diagram-explanation_1_kcqiqs.png "Mientras el ente pueda respirar, satisface la interfaz.")

Basándonos en lo anterior, en Go las interfaces son un método para diferenciar el comportamiento de diferentes objetos. Una interfaz se encargará de llamar al método que le especificamos correspondiente a su tipo de struct.

Mira como la interfaz declara que el type _figuras4Lados_ tiene un método llamada _area_ que devuelve un resultado de tipo _float64_.

```go
type figuras4Lados interface{
    area() float64
}
```

A continuación declaramos un método llamado _area_ diferente tanto para el struct _cuadrado_ como para el struct _rectangulo_, igual que hicimos en la sección "Composición y structs" de esta misma entrada.

```go
type rectangulo struct {
    base float64
    altura float64
}

type cuadrado struct {
    base float64
    altura float64
}

func (c cuadrado) area() float64 {
    return c.base * c.base 
}

func (r rectangulo) area() float64 {
    return r.base * r.base 
}
```

Ahora crearemos una función que recibirá como argumento cualquier type _figura4Lados_, y ejecutará su respectivo método _area._

### ¿Para que sirve una interfaz en Go?

Aquí hay que poner enfasis especial, observa como el argumento que le pasemos a la función es la interfaz que creamos, no nos interesa que tipo de *struct* estamos pasándole como argumento, lo único que nos interesa es que este argumento satisfaga a la interfaz. 

En este caso la interfaz es *figura4Lados*, y por ende debemos asegurarnos que lo que sea que le pasemos tenga un método llamado *area* que retorne un *float64*.

Cuando utilizamos interfaces podemos garantizar que el código funciona a un nivel superior, y podemos dejar los detalles del funcionamiento a bajo nivel a su respectivo objeto, podemos sustituir la implementación de la interfaz siempre que satisfaga las características que define la interfaz.

```go
type figuras4Lados interface{
    area() float64
}

// ...

func calcular (f figuras4Lados) {
    fmt.Println("Area", f.area())
}
```

Para llamar al método respectivo solo llamamos la función pasándole una instancia del struct como argumento.

```go
miCuadrado := cuadrado{base: 2}
calcular(cuadrado)
miRectangulo := rectangulo{base:2, altura: 4}
calcular(miRectangulo)
// Area 4
// Area 8
```

Seguramente si vienes de otros lenguajes te parecerá bastante caprichosa la sintaxis de Go, pero estoy seguro de que la estarás dominando en muy poco tiempo, si yo lo hice para ti será pan comido.