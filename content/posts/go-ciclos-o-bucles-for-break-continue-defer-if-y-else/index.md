---
title: "Go: ciclos o bucles for, break, continue, defer, if y else"
date: "2021-12-07"
categories: 
  - go
coverImage: "images/go-funciones-defer-break-continue-if-else.jpg"
description: "Sintaxis y usos básicos de las estructuras if y else, los bucles, sus tipos, break, continue y defer en el lenguaje de programación go"
keywords:
  - go
---

Esta entrada tratará sobre los bucles en el lenguaje de programación go.

Go maneja los bucles un poco diferente a lo que estás acostumbrado. Si ya dominas algún otro lenguaje de programación, probablemente recuerdes que hay bucles _while_, _do while_ y for. Y si vienes de Python o Javascript, recordarás lo útil que son los bucles _for x in_ o _for x of_

Bien, pues go no existen más que los bucles for. Sí, no hay _while_ ni do _while_. ¿Pero entonces como hago para usar el resto de los bucles? Sigue leyendo y te explico.

Si no sabes nada sobre Go y quieres empezar por lo básico visita mi entrada [Golang: introducción, variables y tipos de datos](/golang-compilacion-estructura-variables-y-tipos-de-datos/).

Si actualmente usas Python y quieres ver como es diferente de Go, visita mi entrada de [python vs go](/python-vs-go-2022-cual-es-el-mejor/).

## If y else

_If_ y _else_ te permiten ejecutar bloques de código de manera condicional y guardan la misma sintaxis que en casi todos los lenguajes.

```go
if true {
	fmt.Println("Verdadero")
} else {
	fmt.Println("Falso")
}
```

### else if

Y por supuesto que go también cuenta con un _else if_.

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

## Bucles for en go

En go **existen varios tipos de bucles for**: con contador, con condicional, range y el infinito.

### Bucles con contador

Este es el clásico bucle que ya conoces de Javascript, C++, etc. En el que se declara una variable, se especifica una condición y se realizan cambios a la variables.

Declaramos "i" igual a 0, mientras "i" sea menor que 10, ejecuta el siguiente bloque y, posteriormente, incrementa "i" en uno, cada instrucción separada por un punto y coma.

```go
for i:= 0; i < 10; i++ {
    // ...
}
```

### Bucle con condicional

En este tipo de bucle se evalúa una condición, si el resultado es _true_, se ejecuta el bloque, si no, se brinca ese bloque de código. Este tipo de bucle for sería el equivalente del bucle _while_.

```go
counter := 0
for counter < 10 {
    counter ++
}
```

### Bucle con range

Range nos permite recorrer una estructura iterable de principio a fin y nos permite acceder al respectivo índice y elemento. Es ideal para recorrer _arrays_, _strings_, _slices_, _maps_, _channels_ y cualquier estructura que pueda recorrerse.

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

### Bucle infinito

Un bucle _for_ sin condición va a ejecutarse por siempre.

La única manera de salir de un bucle for infinito es con un _break_.

```go
counterForever := 0
for {
    counterForever++
}
```

## break

Como acabo de mencionar, _break_ rompe un bucle y continua la ejecución del código.

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

### Break en bucles con nombre en go

En otros lenguajes de programación, como en Python, _break_ rompería el bucle inmediato, es decir, el bucle inmediato en el que se encuentra. ¿No sería genial poder parar al bucle exterior desde el interior? En go es posible de manera sencilla

```python
while True:
    while True:
        break
    print("El bucle principal continua ejecutándose")
# El bucle principal continua ejecutándose
# El bucle principal continua ejecutándose
# El bucle principal continua ejecutándose
```

Go nos permite asignarle nombres a los bucles, ¿para qué? Para hacer referencia a bucles específicos y ser capaz de romperlos usando break. Mira este ejemplo:

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

Nombramos a nuestro bucle como loop y ahora ejecutamos un bucle infinito que tendrá un bucle infinito en su interior. Este último bucle va a romper el bucle externo, de nombre _loop_, por lo que la segunda sentencia nunca va a imprimirse en pantalla.

## continue

Continue detiene la iteración actual del bucle y continua su ejecución en la siguiente iteración.

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

Defer retrasa la ejecución de una linea de código hasta el final. del código. Es bastante similar a lo que hace el atributo _defer_ con etiqueta script de HTML.

```go
	defer fmt.Println("Esto se va a ejecutar hasta el final")
	fmt.Println("Esto se va a ejecutar primero")
	fmt.Println("Esto se va a ejecutar después")
// Esto se va a ejecutar primero
// Esto se va a ejecutar después
// Y esto se va a ejecutar hasta el final
```

¿Y eso para qué? Pues es ideal para cerrar conexiones a base de datos, archivos o realizar algún tipo de limpieza a los objetos de nuestro código.

```go
const conexionBaseDeDatos := abreBaseDeDatos()
defer cierraBaseDeDatos()
queryBaseDeDatos()
otraQuery()
```

Para la siguiente entrada de Go voy a hablar lo básico sobre _slices_, _arrays_ y _maps_.

Recuerda que puedes visitar la [documentación oficial de go](https://go.dev/doc/) si hay algo que desees profundizar.
