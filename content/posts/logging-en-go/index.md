---
title: "Logging con la librería estándar en Go"
date: "2022-07-06"
coverImage: "images/logging-en-go.jpg"
categories:
- go
---

Ya sabes que no deberías usar los prints para debuggear, la librería de loggeo añade fechas, nombres de archivo y otra información que puede hacer tu debuggeo y [tu testing en go](https://coffeebytes.dev/go-testing-basico-y-coverage/) más sencillo.

Por defecto al loggear algo con go nos devolverá la fecha y hora, seguido del mensaje que le pasamos como argumento.

```go
log.Println("Mensaje")
// 2022/06/28 13:38:25 Mensaje
```

El método Println de log se comporta exactamente igual que el de la [librería fmt](https://coffeebytes.dev/go-funciones-argumentos-y-el-paquete-fmt/), por lo que puedes pasarle múltiples parámetros y los imprimirá uno a uno.

## Flags en el loggeo

Podemos cambiar el formato por defecto en el que se muestran los mensajes llamando al método SetFlags y pasándole como argumentos cualquiera que aparezca en una serie de flags que nos provee go.

```go
log.SetFlags(log.Ldate | log.Lshortfile)
log.Println("Mensaje")
// 2022/06/28 main.go:10: Mensaje
```

Existen más flags disponibles, además de los dos anteriores.

Hay flags disponibles para mostrar la ruta completa de nuestro archivo, el número de linea o para mover el prefijo y colocarlo antes del mensaje. Te los dejo a continuación.

```go
const (
	Ldate         = 1 << iota     
    // Fecha en el tiempo local: 2009/01/23
	Ltime                         
    // Hora en el tiempo local: 01:23:23
	Lmicroseconds                 
    // Resolución en microsegundos: 01:23:23.123123.  Asume Ltime.
	Llongfile                     
    // Ruta completa del archivo y número de linea: /a/b/c/d.go:23
	Lshortfile                    
    // Archivo y número de linea: d.go:23. Sobreescribe a  Llongfile
	LUTC                          
    // Si ya están Ldate o Ltime usa UTC en lugar del tiempo local
	Lmsgprefix                    
    // Mueve el prefijo del principio de la linea y lo coloca antes del mensaje. 
	LstdFlags     = Ldate | Ltime 
    // Los valores iniciales son Ldate y Ltime
)
```

## Manejando errores con logging

Además de mostrar información, es posible usar métodos, como Panic y Fatal, para manejar los errores de nuestro código.

### Logging Panic

El método log cuenta con un método Panic que se encarga de imprimir un mensaje y llamar a la función panic.

```go
log.Panic("El sistema se paniquea")
```

Panic tiene dos variantes: 

- Panicf: El equivalente a Printf, para dar formato con operadores de posición
- Panicln: El equivalente a Println

### Logging Fatal

Si queremos terminar la ejecución de nuestro programa al momento, sin permitirle al sistema recuperarse, tenemos disponible el método Fatal.

```go
log.Fatal("Error fatal ha ocurrido")
```

Al igual que Panic, Fatal tiene dos variantes: 

- Fatalf: El equivalente a Printf, para dar formato con operadores de posición
- Fatalln: El equivalente a Println

## Redirigiendo la salida del logging

El método SetOutput nos redigirir la salida de nuestro logging hacia un destino, ya sea el Stdout, el Stderr, el Stdin o incluso un archivo. 

```go
log.SetOutput(os.Stdout)
```

En el ejemplo de arriba estamos redirigiendolo a la salida estándar.

### Redirigiendo hacia un archivo

Si creamos un archivo y se lo pasamos argumento al métoodo SetOutput, podremos redirigir la salida de nuestro logging hacia un archivo.

```go
file, _ := os.Create(name: "programa.log")
log.SetOutput(file)
log.Println("Mensaje a archivo")
file.Close()
```

## Loggers personalizados

El paquete log nos permite crear diferentes tipos de loggers, usando el método New, este método recibe los siguientes argumentos; primero, el destino de nuestros logs, como ya viste, este puede ser hacia el Stdout, el Stderr, el Stdin o un archivo; segundo, el prefijo a mostrar en cada mensaje; tercero, los flags con los que queremos dar formato a nuestros logs.

```go
infoLogger := log.New(os.Stdout, prefix: "INFO: ", flags)
```

Tras haber creado nuestro log, podemos llamar a su método Println para que se encargue de mostrarlo en la salida estándar.

```go
infoLogger.Println("Este es un mensaje de info")
```

