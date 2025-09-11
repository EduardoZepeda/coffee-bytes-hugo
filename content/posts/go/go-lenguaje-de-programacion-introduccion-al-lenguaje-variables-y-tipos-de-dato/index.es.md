---
aliases:
- /go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato
- /go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos
- /golang-introduccion-al-lenguaje-variables-y-tipos-de-datos/
- /es/go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos/
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/golanga.jpg
date: '2021-11-23'
description: 'Conoce las bases del lenguaje de programación go o golang: compilación,
  estructura de un archivo, variables y tipos de datos.'
keyword: lenguaje go
keywords:
- go
slug: /go/go-lenguaje-de-programacion-introduccion-a-variables-y-tipos-de-datos/
title: Go lenguaje de programación introducción a variables y tipos de datos
---

Go, también conocido como Golang, es un lenguaje de programación compilado desarrollado por Google con el propósito de ser simple, sencillo de aprender, suficientemente rápido y centrado fuertemente en la concurrencia.

Go es [usado en proyectos tan colosales como el compilador de Typescript](https://github.com/microsoft/typescript-go/discussions/411#?)

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1741885083/rust-meme-typescript_xa6ajl.webp" class="md-local-image" alt="Typescript decidió utilizar Go para su compilador en lugar de Rust, lo que enfureció a algunos desarrolladores de Rust." caption="Typescript decidió utilizar Go para su compilador en lugar de Rust, lo que enfureció a algunos desarrolladores de Rust." >}}

{{<ad0>}}

{{<box link="/es/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## ¿Qué es Go? Un poco sobre el lenguaje de programación

Go, también llamado Golang, es un lenguaje de programación con una sintaxis muy parecida a la de C y con ciertas abstracciones en su sintaxis que lo vuelven un lenguaje en el que escribir código es muy sencillo, la verdad es que la sensación es de una mezcla entre C y Python.

El diseño de Go como lenguaje de programación está basado en un documento llamado: [Everything you've wanted to know about programming languages but have been afraid to ask](https://www.cs.ox.ac.uk/files/6156/H78%20-%20Everything.pdf) escrito por Tony Hoare (El creador del argumento quicksort). En el que se enfatiza la importancia de aspectos tales como:
- Elegancia y simplicidad
- Buenas abstracciones que oculten los detalles de implementación
- Código predecible
- Manejo de errores simple
- Compilación extremadamente rápida

Estamos ante un lenguaje compilado, imperativo, **fuertemente centrado en la concurrencia** y con tipado estático.

Si de verdad te interesa el tema, encontré este video que resume bastante bien la historia y la filosofía que existe detrás de Go y te lo comparto:

{{< youtube xSwJGMl--lA >}}

{{<ad1>}}

## Aspectos geniales o ventajas del lenguaje Go

* **El lenguaje es bastante simple** Es un lenguaje con muy pocas palabras clave y pocas funcionalidades. Puedes aprenderlo en muy poco tiempo.
* **El compilador de Go es super rápido** Dado que tiene pocas palabras claves y el lenguaje es bastante simple, go compila rapidísimo comparado con otros lenguajes de programación.
* **El manejo de concurrencia es sencillo** Go fue diseñado como un lenguaje concurrente, crear [concurrencia con las goroutines]({{< ref path="/posts/go/go-uso-de-channels-canales/index.md" lang="es" >}}) es bastante sencillo
* **Crear aplicaciones web es bastante sencillo** Go incorpora en su librería estandar muchísimas utilidades para crear servidores web, por lo que incluso puedes usarlo sin usar ningún framework, para aplicaciones sencillas, y no tendrás ningún problema. Definitivamente un lenguaje [*to get shit done*](/es/opinion/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/#herramientas-to-get-shit-done)

## Mal diseño y desventajas del lenguaje Go

Para hacer este análisis lo más objetivo posible, a continuación, te explico algunos aspectos controversiales de go que no son vistos con buenos ojos por algunos desarrolladores.

{{<ad2>}}

{{< figure src="images/ManejoErroresGo.png" class="md-local-image" alt="Manejo de errores con Go con if" caption="Este patrón es bastante recurrente en las aplicaciones y llega a ser tedioso" >}}

* **Go carece de soporte para clases** de manera directa. Pero no todo está perdido, porque sí cuenta con ciertas características que lo dotan de funcionalidades de la POO, tales como polimorfismo y clases, por medio de [interfaces, structs y embedded values]({{< ref path="/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="es" >}}).
* **Go no cuenta con manejo de excepciones con bloques try y catch o equivalentes.** Sino que los errores deben devolverse como valor de retorno en una función y se manejan comprobando que esta no sea nula (nil), por medio de bloques if. Lo anterior puede volverse bastante verboso y repetitivo.

{{< figure src="images/if-err-not-equal-nil.jpg" class="md-local-image" alt="Manejo de errores recurrente y repetitivo en Go" caption="If err!= nil en todos lados, el manejo de errores en Go debería ser mejor" >}}

* **No existen argumentos por defecto en go**, lo que aumenta la cantidad de código a escribir para lidiar con valores predeterminados.
* **No cuenta con manejo manual de memoria**, go usa un garbage collector, lo cual simplifica el manejo de memoria enormemente, pero limita la administración más granular de memoria, esta fue una de las razones por las cuales [discord migró de Go a Rust.](https://discord.com/blog/why-discord-is-switching-from-go-to-rust)
* **~~Go no cuenta con generics~~** Go ya cuenta con soporte para generics desde su version 1.18.

## Buenas prácticas de código en el lenguaje Go

Go está fuertemente orientado a las buenas prácticas de código. ¿Cómo lo hace? El compilador fuerza buenas prácticas en el código, impidiendo que el código compile si hay variables o importaciones que no se usan, o si no se respetan las reglas de la privacidad de nuestras propiedades y funciones, entre otras.

{{<ad3>}}

{{< figure src="images/ErrorCompilacionGo.png" class="md-local-image" alt="Error de compilación en go por variables sin usar" caption="La compilación no se permite si hay variables sin usar." >}}

Sin embargo no te obliga a revisar punteros hacia nil, volviéndo estos los errores más difíciles de debuggear, por lo cual yo lo considero una parte débil del lenguaje.

## Go tiene la mejor mascota: Gopher

La mascota oficial es una ardilla de tierra y es muy común entre la comunidad usarla para ilustrar el contenido relacionado con go. Este Sartre en versión roedor azul es tan popular entre los desarrolladores que existen herramientas, como [Gopherizme](https://gopherize.me#?), para crear avatares personalizados. El impacto de la mascota es tal, que muchos desarrolladores la usan a manera de logo, aunque el [logo oficial de go](https://blog.golang.org/go-brand) ya ha sido definido.

{{< figure src="images/GoMascotAndLogo.png" class="md-local-image" alt="Mascota y logo de go" caption="A la izquierda la mascota de Go. A la derecha el logo oficial" >}}


## Instalación de Go

Go se encuentra en la mayoría de los repositorios de las distribuciones de GNU/Linux. En debian y ubuntu se instala usando el [comando apt install](/es/linux/comandos-basicos-de-linux-passwd-du-useradd-usermod-fdisk-apt//) como cualquier otro paquete.

```bash
sudo apt install golang
```

Las instrucciones de instalación para Freebsd, windows y macosx serán diferentes.

## Estructura de un archivo de go

Los archivos de go se estructuran de la siguiente manera y en este orden:

### Nombre del paquete

Una sección donde se declara el nombre del paquete después de la palabra _package_. El nombre del paquete nos servirá para hacer importaciones de nuestros modulos.

```python
package main
```

### Importaciones

Una sección donde se importan todos los [paquetes de go](/es/go/go-importacion-de-paquetes-y-manejo-de-modulos/) que se usarán. Para ello usamos la palabra _import_.

import "fmt"

Múltiples importaciones pueden colocarse dentro de paréntesis, sin comas.

```go
import (
    "strconv"
    "fmt"
)
```

### Contenido

El contenido del archivo, es decir declaraciones de variables, types, [funciones]({{< ref path="/posts/go/go-funciones-argumentos-y-el-paquete-fmt/index.md" lang="en" >}}), constantes, etc.

```go
func main() {
    fmt.Println("Hello world!")
}
```

## El paquete main

Go requiere de un paquete principal llamado _main_, que se especificará colocando _package main_ al principio de nuestro código fuente.

```go
package main
```

### La función main

La función _main_ es el punto de partida de un archivo de go, como lo sería en C, y no retorna nada.

```go
package main

import "fmt"

func main() {
    fmt.Println("Ejecutando el programa")
}
```

### Función init en Go

Antes del punto de entrada del programa (la función _main_) se ejecuta una función init, esta puede contener todas las inicializaciones necesarias para la ejecución del programa.

```go
package main

import "fmt"

func init() {
    fmt.Println("Inicializando el programa principal")
}

func main() {
    fmt.Println("Ejecutando el programa")
}
```

## Como compilar y ejecutar un archivo de go

Dado que go es un lenguaje compilado, requiere la compilación del código antes de poder ejecutar el código. El compilado se realiza con el comando build.

```go
go build src/main.go
```

Tras el compilado tendremos un archivo que podremos ejecutar.

```go
./main
```

También **es posible compilar y correr el código en un solo paso** usando run en lugar de go.

```go
go run src/main.go
```

### Diferencias entre run y build en el lenguaje Go

La diferencia entre build y run radica en que **run compila el código y lo ejecuta desde un directorio temporal**, y posteriormente limpia los archivos generados. Si agregamos el flag --work, podremos ver la ubicación de este directorio.

```go
go run --work src/main.go
# WORK=/tmp/go-build983014220
```

## Tipos primitivos de datos en Go

Dado que estamos tratando con un lenguaje compilado, necesitamos decirle al compilador el tipo de dato que usaremos para cada variable o constante.

Los valores primitivos de Go son los siguientes.

### Entero

Para valores enteros con o sin signo.

- int, se asigna de acuerdo al SO (32 o 64 bits)
- int8,
- int16
- int32
- int64

### Entero sin signo

Para valores sin signo, es decir, positivos.

- uint, se asigna de acuerdo al SO (32 o 64 bits)
- uint8
- uint16
- uint32
- uint64

### Decimal

Para números decimales

- float32
- float64

### Textos

Para textos existe únicamente _string_

### Boolean

Para valores _true_ or _false_

### Números complejos

Permite manejar números reales e imaginarios:

- Complex64
- Complex128

Por ejemplo: c:=100+2i

## Variables, constantes y zero values en el lenguaje Go

### Variables

Go permite definir variables especificando el tipo de dato y la keyword var. Es como si a una declaración de variable de Javascript le agregaras el tipo de dato.

```go
var gravedad int8
```

La asignación de variables puede realizarse en un solo paso de la siguiente manera:

```go
var gravedad int = 123
```

También es posible dejar que el compilador intuya el tipo de dato con el operador walrus (marmota). Este tipo de asignación **solo es posible dentro del scope de una función**.

```go
gravedad := 123
```

En go no puedes asignar una variable al valor nulo; _nil_.

```go
var gravedad = nil // error
```

### Constantes

Con las constantes funciona de manera similar, pero se caracterizan porque no pueden modificarse. Se usa la keyword _const_.

**Es necesario asignar un valor a una constante al momento de declararla**.

```go
const gravedad int8 = 123
```

Si no especificamos un tipo de constante el compilador intentará intuirlo.

```go
const pi = 3.14159
```

### Zero values

En go, **si no asignamos un valor el compilador usará valores predeterminados** para cada tipo de dato.

- int: 0
- float: 0
- string: "
- bool: false

## Valor nulo

Go usa la palabra reservada _nil_ para referirse a un valor nulo.

## Comentarios

Los comentarios se marcan usando dos diagonales seguidas

```go
// Este es un comentario en go
```

Los comentarios multilinea se realizan con una diagonal seguida de asterisco

```go
/*
Este es un comentario multilinea
*/
```

## Operadores en go

Los operadores de go son similares al resto de los lenguajes.

- +, suma
- \-, resta
- \*, multiplicación
- /, división
- <, menor que
- <=, menor o igual que
- \>, mayor que
- \>=, mayor o igual que
- %, el módulo o residuo
- !=, inequivalencia
- \==, igualdad
- !, negación
- &&, operador AND
- ||, operador OR
- ++, incremental
- \--, decremental

Con esto termino la parte más básica del lenguaje Go. Espero que tengas una visión más completa del lenguaje, tanto de las partes buenas como de las partes malas. Y si quieres aprender lo básico puedes leer las siguientes entradas, tengo tutoriales básicamente de todas las partes básicas de Go.