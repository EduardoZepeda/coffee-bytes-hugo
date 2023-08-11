---
title: "Go: uso de channels o canales para comunicar goroutinas"
date: "2022-01-22"
coverImage: "images/go-channels-o-canales.jpg"
categories:
  - go
keywords:
  - go
  - concurrencia
  - channels
authors:
  - Eduardo Zepeda
---

Hasta ahora te he explicado como ejecutar una goroutine, ejecutar código de manera concurrente con las goroutines y a esperar a que terminen de ejecutarse pero nuestras goroutines no pueden hacer nada más, no pueden cooperar entre ellas para acelerar los procesos.

Imagínate que tienes un web scrapper que obtiene datos de internet de manera concurrente; obtenemos los datos con goroutines y los procesamos con goroutines. ¿tenemos que esperar a que terminen todas las goroutines para usarlos? Lo ideal sería que las goroutines se comunicaran entre ellas los datos y continuaran con el proceso.

## Comunicando goroutines con channels

Los channels o canales son "conductos", que aceptan un único tipo de dato. A través de estos canales "introducimos" información que, posteriormente, podremos "sacar".

Las goroutines pueden enviar datos a los canales y también leer datos de ellos, logrando comunicarse entre si.

![Esquema del funcionamiento de un channel en go](images/channels-en-go.jpg "Esquema básico del funcionamiento de los channels o canales en Go")


Un channel o canal en go se declara con *make* y la palabra *chan*, que hace referencia a la palabra channel.

```go
c := make(chan string)
```

Los channels son usados para comunicar goroutines, como en el [patrón de diseño worker pool]( explicacion-del-patron-de-diseno-worker-pool/)

### Channels o canales con buffer

La función *make* permite pasarle como un argumento extra la cantidad límite de datos simultaneos que manejará ese canal. **A esto se le conoce como un canal con buffer o buffered channel.**

```go
c := make(chan string, 1)
```

### Channels o canales unbuffered

Si no especificamos un tamaño de buffer el canal:

- Bloqueará al remitente hasta que el destinatario esté listo para recibir la información
- Bloqueará al destinatario hasta que el remitente esté listo para enviar la información

O visto de otra forma, si intentas enviar información a un canal sin buffer, la operación se bloqueará  hasta que la información sea recibida. Si intentas recibir información esta se bloqueará hasta que la información sea mandada.

Estos canales son útiles cuando quieres garantizar que el remitente y el destinatario estén sincronizados y que la información se transmite inmediatamente, pero pueden ocasionar bloqueos si el remitente y el destinatario no están sincronizados.

### Acceder a un channel en una función

Cuando querramos hacer referencia al canal como argumento de una función, es necesario indicar el tipo de dato del canal.

```go
func say(text string, c chan string) {}
```

El tipo de dato de un canal también puede ser uno definido usando un _struct_.

```go
func say(text string, c chan MiStruct) {}
```

### Meter datos en un channel

Para indicar la entrada de datos a través del channel usamos el binomio de caracteres <-

```go
func say(text string, c chan string) {
    c <- text
}
```

### Sacar datos de un channel

Para obtener la respuesta del canal invertimos el orden entre el canal y el símbolo <-

```go
fmt.Println(<-c)
```

### Meter y sacar datos de un channel en go

El proceso completo de introducir y extraer datos de un channel en go se vería algo así:

1. Creamos un canal de un tipo de dato usando make
2. Introducimos un dato (en este caso _string_) al canal usando una
   goroutine
3. Extraemos el texto del canal y le damos uso (en este caso solo lo imprimimos)

```go
package main

import "fmt"

func escribirEnCanal(texto string, c chan string) {
	c <- texto
}

func main() {
	c := make(chan string)
	go escribirEnCanal("Dato de un canal", c)
	fmt.Println(<-c)
}
```

### Canales de entrada y salida

Hay canales que reciben información y canales que sacan información, **de manera predeterminada un canal es bidireccional, pero podemos declarar canales de entrada y de salida.**

Para identificarlos, observa el flujo de la flecha alrededor de la palabra chan; una entra (o se dirige) a chan y la otra sale de chan.

Este es un canal de entrada.

```go
func say(text string, c chan<- string) {}
```

Mientras que este es un canal de salida.

```go
func say(text string, c <-chan string) {}
```

Es importante definir el tipo de canal pues, con los canales bidireccionales corremos el riesgo de ocasionar un [bloqueo o deadlock en nuestro programa de go](/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/). 
## Capacidad de un canal

¿Recuerdas que te dije que la función make podía establecer el número máximo de datos que puede trabajar un canal? Pues es posible recuperar esa información usando la función len

La función len nos dice cuantos datos hay en un channel, mientras que cap nos devuelve la capacidad máxima, respectivamente.

```go
c := make(chan string, 3)
c <- "dato1"
c <- "dato2"
fmt.Println(len(c), cap(c))
// 2 3
```

En el ejemplo anterior, el canal tiene ocupados dos espacios, pero tiene una capacidad total de 3, incluso aunque no todos sus espacios estén ocupados.

## Cerrar un canal o channel en go

Si queremos inhabilitar un canal, incluso aunque tenga capacidad disponible para almacenar más datos, la función close nos permite hacerlo.

```go
c :=make(chan string, 3) 
c <- "dato1" 
c <- "dato2" 
close(c)
c <- "dato3"
//panic: send on closed channel
```

## Iterar sobre un canal

Range es ideal para iterar sobre los datos de los canales. Sin embargo, es importante resaltar que, **no existe certeza sobre que dato recibiremos** puesto que el contenido del canal puede venir de múltiples goroutines.

```go
c := make(chan string, 3)
c <- "dato1"
c <- "dato2"
close(c)
for message := range c {
	fmt.Println(message)
}
```

Con eso conoces la información básica de los canales y como puedes utilizarlos para comunicar gorutinas.
