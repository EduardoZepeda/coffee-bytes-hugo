---
aliases:
- /logging-en-go
- /logging-con-la-libreria-estandar-en-go
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/logging-en-go.jpg
date: '2022-07-06'
keywords:
- go
- testing
- logging
title: Logging con la librería estándar en Go
---

Como seguramente ya sabes, no deberías usar los prints para debuggear. La librería estándar de loggeo  de go es mucho más versátil, añade fechas, nombres de archivo y otra información, además puedes redirigir los logs a la salida estándar, a un archivo o a donde tú quieras. Lo anterior puede volver más ameno tu proceso de debuggeo y [tu testing en go](/es/go-testing-basico-y-coverage/) más sencillo.

{{<box link="/es/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## El Println de log

El paquete log viene integrado en la librería estándar de loggeo y su función más sencilla es el Println que, para fines prácticos, es como el Println de toda la vida pero con algunos beneficios integrados.

Por defecto al loggear algo con go nos devolverá la fecha y hora, seguido del mensaje que le pasamos como argumento.

```go
log.Println("Mensaje")
// 2022/06/28 13:38:25 Mensaje
```

El método Println de log se comporta exactamente igual que el de la [librería fmt](/es/go-funciones-argumentos-y-el-paquete-fmt/), por lo que puedes pasarle múltiples parámetros y los imprimirá uno a uno.

## Flags en el loggeo

Es posible cambiar el formato por defecto en el que se muestran los mensajes, cambiar el orden de los elementos o agregarle más información, llamando al método SetFlags y pasándole como argumentos cualquiera que aparezca en una serie de flags que nos provee go.

```go
log.SetFlags(log.Ldate | log.Lshortfile)
log.Println("Mensaje")
// 2022/06/28 main.go:10: Mensaje
```

Existen más flags disponibles, además de los dos anteriores.


### Flags disponibles

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

Si queremos terminar la ejecución de nuestro programa al momento, sin permitirle al sistema recuperarse, tenemos a nuestra disposición el método Fatal.

```go
log.Fatal("Error fatal ha ocurrido")
```

Al igual que Panic, Fatal cuenta con dos variantes: 

- Fatalf: El equivalente a Printf, para dar formato con operadores de posición
- Fatalln: El equivalente a Println

## Redirigiendo la salida del logging

Como te mencioné anteriormente, la librería nos permite redirigir, a través de su método SetOutput, la salida de nuestro logging hacia un destino; ya sea el Stdout, el Stderr, el Stdin o incluso un archivo. 

```go
log.SetOutput(os.Stdout)
```

En el ejemplo de arriba estamos redirigiéndolo a la salida estándar.

### Redirigiendo hacia un archivo

Para redirigr nuestros logs hacia un archivo, primero necesitamos crearlo y, posteriormente, pasárselo como argumento al métoodo SetOutput, tras esto, todo nuestros logs escribirán en nuestro archivo y podremos consutarlos más tarde.

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

Una vez creado nuestro log, podemos llamar a su método Println para que se encargue de mostrarlo en la salida estándar.

```go
infoLogger.Println("Este es un mensaje de info")
```