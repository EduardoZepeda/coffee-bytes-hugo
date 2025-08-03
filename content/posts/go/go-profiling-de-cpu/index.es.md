---
aliases:
- /go-profiling-de-cpu
- /go-profiling-o-perfilado-basico-del-uso-del-cpu
- /es/go-profiling-o-perfilado-basico-del-uso-del-cpu/
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/go-profiling.jpg
date: '2022-02-16'
description: Entrada sobre profiling del código en go, análisis del impacto linea
  por linea y exportación de resultados a formato web y pdf.
keywords:
- go
- rendimiento
slug: /go/go-profiling-o-perfilado-basico-del-uso-del-cpu/
title: 'Go: profiling o perfilado básico del uso del CPU'
---

Además del [testing de pruebas unitarias y la medición del coverage en go](/es/go/go-testing-basico-y-coverage/), este lenguaje de programación es capaz de realizar un profiling (o perfilar) la eficiencia del código, analizándolo de manera muy detallada. Esto es bastante útil para encontrar cuellos de botella o partes del código muy costosas, que se llaman numerosas veces o cuyo rendimiento pueden mejorarse.

{{<box link="/es/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## ¿Cómo funciona internamente el profiling de Go en GNU/Linux?

GNU/Linux, más específicamente GNU, tiene una señal de alarma llamada [SIGPROF](https://www.gnu.org/software/libc/manual/html_node/Alarm-Signals.html), esta señal avisa cuando un contador de tiempo termina de medir el uso del CPU e interrumpe la ejecución del código.

En el profiling de Go, la señal SIGPROF se programa para ser llamada cada 10 ms. Cada vez que se invoca esta señal, se examina la instrucción actual del [contador de programa (PC)](https://es.wikipedia.org/wiki/Contador_de_programa) y se rastrea hacia atrás a la secuencia de instrucciones que la llamaron. El resultado del proceso anterior es un informe de los elementos en la pila de ejecución , conocido como [stack trace](https://es.wikipedia.org/wiki/Stack_trace) o seguimiento de pila.

El proceso de profiling va a ralentizar la ejecución del código, pues se interrumpe cada 10ms para ver que se está ejecutando. Como seguramente ya dedujiste, si una función se encuentra múltiples veces en los stack traces que se generan, tras cada señal SIGPROF, significa que ha durado mucho tiempo ejecutándose.

Al finalizar el profiler la herramienta _pprof_ de go organiza los datos para que puedan representarse de una manera más amigable para el usuario.

{{<ad>}}

## Profiling o perfilado de CPU en go

Para esta etrada voy a usar el clásico fibonacci por recursión para demostrar las capacidades de profiling de go. Estoy usando go version go1.15.15 linux/amd64.

```go
func Fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return (Fibonacci(n-1) + Fibonacci(n-2))
}
```

Para el testing en go, justo como te expliqué en la entrada anterior, usaremos un array de structs para manejar los diferentes casos.

```go
func TestFibonacci(t *testing.T) {
	tables := []struct {
		n    int
		fibo int
	}{
		{0, 0},
		{1, 1},
		{2, 1},
		{15, 610},
		{17, 1597},
		{40, 102334155},
	}

	for _, table := range tables {
		result := Fibonacci(table.n)
		if result != table.fibo {
			t.Errorf("Fibonacci incorrecta, esperabamos %d, pero obtubimos %d", table.fibo, result)
		}
	}
}
```

### Obteniendo la información del profiling

Igual que hicimos para ver el [coverage en el testing de go](/es/go/go-testing-basico-y-coverage/), usamos un flag para crear un archivo con la información del profiling en binario, este archivo no lo podemos visualizar directamente.

```go
go test -cpuprofile=cpu.out

PASS
ok      _/home/eduardo/Programacion/goTesting/testing   0.813s
```

Pero podrá ser usado por otras herramientas para visualizarlo de manera más humana.

### Visualizar resultados del profiling

Para ver el resumen del uso de cpu usamos _tool pprof_ pasándole como argumento el archivo que contiene los datos del profiling.

```go
go tool pprof cpu.out

File: testing.test
Type: cpu
Time: Feb 10, 2022 at 1:06pm (CST)
Duration: 802.18ms, Total samples = 690ms (86.02%)
Entering interactive mode (type "help" for commands, "o" for options)
```

Tras ejecutar el comando anterior estaremos dentro de una terminal. Si ejecutamos _top_ veremos el comportamiento de nuestro código.

Mira como Fibonacci ocupa casi la totalidad del tiempo usado.

```go
(pprof) top

File: testing.test
Type: cpu
Time: Feb 10, 2022 at 1:06pm (CST)
Duration: 802.18ms, Total samples = 690ms (86.02%)
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) top
Showing nodes accounting for 690ms, 100% of 690ms total
      flat  flat%   sum%        cum   cum%
     680ms 98.55% 98.55%      680ms 98.55%  _/home/eduardo/Programacion/goTesting/testing.Fibonacci
      10ms  1.45%   100%       10ms  1.45%  runtime.epollwait
         0     0%   100%      680ms 98.55%  _/home/eduardo/Programacion/goTesting/testing.TestFibonacci
         0     0%   100%       10ms  1.45%  runtime.findrunnable
         0     0%   100%       10ms  1.45%  runtime.mcall
         0     0%   100%       10ms  1.45%  runtime.netpoll
         0     0%   100%       10ms  1.45%  runtime.park_m
         0     0%   100%       10ms  1.45%  runtime.schedule
         0     0%   100%      680ms 98.55%  testing.tRunner
```

Dentro de la terminal pprof es posible inspeccionar el tiempo promedio de ejecución de cada línea de una función, usando:

```go
list <nombre_funcion>
```

Tras ejecutar el comando se generará una lista donde podemos ver cada función desglosada linea por linea, junto con su impacto.

De seguro ya observaste que la mayor parte del tiempo la consume la parte recursiva de Fibonacci.

{{< figure src="images/GoListProfile.png" class="md-local-image" alt="Resultados del comando list de profiling en go que muestra el impacto de cada linea de código." >}}

### Exportación de resultados

Además de resultados en consola, también podemos visualizar los resultados, de manera más entendible usando el comando _web_, que crea un pequeño esquema accesible desde el navegador.

Cada caja representa una función individual y las lineas indican el orden en el que unas funciones llaman a las otras.

{{< figure src="images/GoWebProfile.png" class="md-local-image" alt="Resultado del comando web de profiling en go. La función fibonacci se muestra en grande y en rojo." >}}

Como parámetro opcional podemos pasarle el nombre de una función y go filtrará los resultados.

```go
(pprof) web <funcion>
```

{{< figure src="images/GoWebProfileFunction.png" class="md-local-image" alt="El comando web permite aislar los resultados por función" >}}

El esquema generado por el comando _web_ puede exportarse a un pdf con el comando _pdf_.

```go
(pprof) pdf
```

## Otros recursos sobre profiling

- [Documentación oficial de go sobre profiling](https://go.dev/blog/pprof)
- [Go profiler internals](https://www.instana.com/blog/go-profiler-internals/)
- [GopherCon 2019: Dave Cheney - Two Go Programs, Three Different Profiling Techniques](https://www.youtube.com/watch?v=nok0aYiGiYA)