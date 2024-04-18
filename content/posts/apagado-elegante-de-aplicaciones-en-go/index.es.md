---
aliases:
- /apagado-elegante-de-aplicaciones-en-go
- /go-manejo-de-signals-para-cerrar-aplicaciones
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/go-manejo-signals-para-cerrar-aplicaciones.jpg
date: 2022-10-06
title: 'Go: Manejo de Signals para Cerrar Aplicaciones'
description: 'Manejo de las señales o signlas SIGINT y SIGTERM en Linux usando channels en Go para conseguir el apagado elegante de aplicaciones web en Go'
---

Hoy voy a hablar de un tema que suele pasarse por alto en la mayoría de los tutoriales: el manejo del cierre de aplicaciones. ¿A qué me refiero? A esas veces en las que tienes que cerrar una aplicación, pero pueden existir tareas pendientes en ejecución, conexiones abiertas o simplemente quieres dejar un registro, en forma de un log, de que la aplicación fue cerrada.

## Señales o Signals en Linux

Como seguramente ya sabes, el kernel de Linux es el que se encarga de "prestarle" los recursos a las aplicaciones de go (o cualquier otra aplicación) para que se ejecuten. 

Debido a que linux es el núcleo del sistema, es capaz de pedir de vuelta esos recursos en cualquier momento y cerrar la aplicación. 

Linux puede pedirle "amablemente" a las aplicaciones los recursos que les prestó o "arrebatárselos" por la fuerza. Para lo anterior, Linux envía una serie de señales (signals) a la aplicación, algunas de las cuales pueden ser capturadas y manejadas por la misma aplicación, con código en Go.

### Señales de Linux principales

Las señales de Linux son bastantes, pero te dejo aquí las más importantes para este ejemplo: 

| Señal   | Valor | Accion | Comentario                                                    | Comando      | Atajo de Teclado |
| ------- | ----- | ------ | ------------------------------------------------------------- | ------------ | ---------------- |
| SIGINT  | 2     | Term   | Interrupción procedente del teclado                           | kill -2 pid  | CTRL+C           |
| SIGQUIT | 3     | Core   | Terminarción procedente del teclado                           | kill -3 pid  | CTRL+\           |
| SIGTERM | 15    | Term   | Terminar un proceso de una manera controlada                  | kill -15 pid |                  |
| SIGKILL | 9     | Term   | Terminar un proceso de manera forzosa, no puede manejarse por | kill -9 pid  |                  |

En Linux, estas señales pueden mandarse a una aplicación por medio del [comando kill](/es/comandos-de-linux-que-deberias-conocer-tercera-parte/#kill), especificando el valor de la señal y el pid de la aplicación.

```go
kill -<valor> <pid>
// kill -2 1234
```

## Manejo de señales o signals en Go

En go, cuando queremos escuchar las señales que envía el kernel de Linux, usamos el método Notify del paquete signal. El método Notify mandará nuestro signal por un canal, el cual recibirá como primer argumento. El segundo y el tercer argumento son las señales que escuchará nuestro método.

```go
func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    // ...
}
```

### Manejando los signals con canales o channels

Ahora tenemos un canal que recibe nuestra señal, pero... ¿qué hacemos con ella?

¿Recuerdas que, en go, [las operaciones que mandan o reciben valores de canales son bloqueantes dentro de su propia goroutine](/es/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/), es decir, mantienen la ejecución del código en espera?

Pues en este caso vamos a dejar una variable esperado por el valos del canal que acabamos de crear, bloqueando el código en ese punto.

```go
func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    s := <-quit
	fmt.Println("Cerrando aplicación", s)
    // ...
}
```

De esta manera la aplicación se quedará esperando hasta recibir cualquier señal (SIGINT o SIGTERM) por parte de Linux y, una vez que la reciba, ejecutará el resto del código de la función.

```go
func gracefulShutdown() {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	s := <-quit
	fmt.Println("Cerrando aplicación", s)
	// ... resto del código
}
```

Por último, para que esta función se ejecute correctamente, necesitamos que se ejecute dentro de su [propia goroutine](/es/go-introduccion-a-las-goroutines-y-concurrencia/). Para lo cual basta con anteponer la palabra clave go a la llamada de la función.

```go
func main() {
    // ...
    go gracefulShutdown()
    // ...
}
```

### Capturando una señal SIGNIT

Si ejecutamos un servidor web o cualquier otro proceso permanente y luego emitimos una señal SIGNIT, presionando CTRL + C en la terminal o con el comando kill, linux recibirá la señal y le notificará a nuestra aplicación que debe cerrarse.

```bash
go run main.go
Empezando el servidor. Pid: 8830

kill -2 8830
Cerrando el servidor: interrupt
```

Considera que el Pid puede ser diferente para ti.

### Capturando una señal SIGTERM

Para emitir una señal SIGTERM, ejecutamos el comando kill de GNU/Linux, este se encargará de terminar la aplicación. Nuestra aplicación recibirá la señal a través del canal y ejecutará el resto del código.

```bash
go run main.go
Empezando el servidor. Pid: 9619

kill -15 9616
Cerrando el servidor: terminated
```

Por supuesto que lo ideal es que vayas más allá de imprimir un mensaje y te encargues de todas aquellas tareas que quieres pendientes que requieren una proceso de finalización más ordenado.

## Ejemplo de apagado elegante con un servidor web

Te dejo el ejemplo completo con un servidor web escrito totalmente en go. 

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	//io.WriteString(w, "This is my website!\n")
	w.Write([]byte("Este es mi sitio web!\n"))
}

func gracefulShutdown() {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	s := <-quit
	fmt.Println("Cerrando el servidor:", s)
	os.Exit(0)
}

func main() {
	pid := os.Getpid() 
	fmt.Println("Empezando el servidor. Pid:", pid)
	go gracefulShutdown()
	http.HandleFunc("/", getRoot)
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatalf("El servidor fallo al iniciar. Error: %v", err.Error())
	}
}
```

Tras ejecutarlo, intenta cancelar la aplicación con CTRL + C o con la terminal con el comando kill, y observa como se imprime el mensaje y se finaliza la aplicación de una manera más ordenada y controlada.

```bash
go run main.go

CTRL + C
Empezando el servidor. Pid: 8830
Cerrando el servidor: interrupt
```