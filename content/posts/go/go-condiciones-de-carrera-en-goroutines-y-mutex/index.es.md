---
aliases:
- /go-condiciones-de-carrera-en-goroutines-y-mutex
- /es/go-condiciones-de-carrera-en-goroutines-y-mutex/
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/go-mutex-race-conditions.jpg
date: '2022-02-02'
description: En esta entrada hablo sobre las condiciones de carrera o race conditions
  que ocurren cuando usamos goroutines y como prevenirlas usando mutex.
keywords:
- go
slug: /go/go-condiciones-de-carrera-en-goroutines-y-mutex/
title: 'Go: condiciones de carrera en goroutines y mutex'
---

En las entradas pasadas te hable un poco sobre las [goroutines, los bloqueos o deadlocks y los channels](/es/go/go-channels-entendiendo-los-deadlocks-o-puntos-muertos/). Pero hay otro tema bastante interesante sobre los goroutines que resalta cuando usamos asincronía y hay muchas funciones accediendo a los datos al mismo tiempo y. Múltiples funciones leyendo y escribiendo la misma información puede llevar a situaciones caóticas donde cosas muy extrañas pueden suceder.

{{<box link="/es/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="¡Hola! ¿Ya sabes que tengo un tutorial completo del lenguaje de programación Go completamente gratis?, puedes encontrarlo directamente en la barra del menú superior o haciendo clic en este panel">}}

## ¿Qué es una race condition o condición de carrera?

Si ya sabes que es una race condition o condición de carrera, puedes saltarte a la siguiente sección. Si no, sigue leyendo.

Una condición de carrera ocurre cuando dos subprocesos tienen acceso a una variable compartida al mismo tiempo. Voy a ponerte un ejemplo más detallado.

Imagínate que es un día especial en tu página web de dudoso contenido y vas a regalarles 20 tokens a tus usuarios por cada usuario nuevo que refieran. Entonces decides usar goroutines para implementar la funcionalidad. Todo va viento en popa, hasta que uno de tus clientes te contacta por un supuesto error.

DarkLord69 afirma haber referido a dos personas, sin embargo se queja de que sus tokens no se han incrementado en 40, sino en 20.

Probablemente crees que ya la regaste en el código, pero todo luce bien, ¿qué pudo haber salido mal? Tras revisar tu código te das cuenta de que el problema está en las goroutines.

Sucede que una goroutine leyó la cantidad de créditos de DarkLord69: 120, y, casi al mismo tiempo, otra goroutine leyó esos mismos créditos.

La primera goroutine dijo: "Tengo 120 créditos, si le sumo 20, el total de nuevos créditos es 140".

Mientras que la segunda goroutine, casi al mismo tiempo que la primera, dijo: "Yo leí que había 120 créditos, si le sumo 20, el total de nuevos créditos será de 140".

Ambas goroutines están estableciendo el total de créditos en 140, porque leyeron, casi al mismo tiempo, que había 120.

{{< figure src="images/race-conditions-go.png" class="md-local-image" alt="Ejemplo de una race condition o condición de carrera en go" caption="Ejemplo de una race condition o condición de carrera en go."  width="1080" height="1080" >}}

Como ya sabrás, DarkLord69 no estará muy contento, pero si le das unos tokens extras como compensación no debería haber problema. Pero, ¿y si en lugar de haber sido tokens hubiera sido dinero? ¿o quizás algún otro bien más preciado?

Ahora vamos a un ejemplo hecho en código.

Si no entiendes que hace el waitgroup, escribí una entrada donde te explico [las goroutines, channels y los waitgroups]({{< ref path="/posts/go/go-uso-de-channels-canales/index.md" lang="es" >}}) que puedes consultar. Por ahora quédate con la idea de que esperan a que todas las goroutines finalicen antes de proseguir la ejecución del código.

```go
package main

import (
	"fmt"
	"sync"
)

var tokens int = 120

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			tokens_leidos := tokens
			tokens_leidos += 20
			tokens = tokens_leidos
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(tokens)
}
```

La parte importante radica en que, dentro de una goroutine, leemos el contenido variable tokens, posteriormente la incrementamos en 20 y luego ese resultado lo asignamos a tokens otra vez. Pero no hay problema alguno, si ejecutamos el código obtendremos el resultado correcto: 320 (120 tokens + Un incrementos de 20 tokens para cada una de las 10 goroutines).

{{<ad0>}}

Todo perfecto ¿o no? No, el código es tan pequeño y el proceso ocurre tan rápido que no se nota el problema.

Si añadimos un pequeño momento de espera en las goroutines (que puede ser causado por un acceso a la base de datos o cualquier otro proceso), enfrentaremos el problema cara a cara.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var tokens int = 120

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			tokens_leidos := tokens
			time.Sleep(1 * time.Millisecond) // Tiempo de espera
			tokens_leidos += 20
			tokens = tokens_leidos
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(tokens)
}
```

Tras la ejecución del código, en lugar del resultado correcto, yo obtengo 140 con 1 milisegundo y 200 con un microsegundo.

{{<ad1>}}

## Detectar condiciones de carrera con --race

Para ayudarnos a identificar estos problemas, Go cuenta con un flag para detectar condiciones de carrera, si ejecutamos la compilación con el flag _\--race_ veremos que go nos advierte de que nuestro código posee condiciones de carrera.

```go
go build --race main.go
./main.go
==================
WARNING: DATA RACE
Read at 0x0000005fe430 by goroutine 8:
# ...
```

## Prevenir condiciones de carrera con Mutex

{{<ad2>}}

Existe un objeto llamado Mutex (**mut**ual **ex**clusion) que garantizará que nuestro código no acceda a una variable hasta que nosotros le indiquemos, evitando que se den las condiciones de carrera o race conditions.

Piensa en un mutex como una cerradura, que bloqueará el acceso a nuestro código por parte de otras goroutines, hasta que lo liberemos.

```go
var lock sync.Mutex
lock.Lock()
// Todo lo que está aquí está bloqueado para el resto de las goroutines
lock.Unlock()
```

{{< figure src="images/mutex-lock-en-go.png" class="md-local-image" alt="El método Lock de Mutex bloquea el acceso del código, mientras que el método Unlock lo libera." caption="Funcionamiento del Mutex en go"  width="1600" height="1080" >}}

Si protegemos la lectura y la escritura de la variable tokens, nuestro código debe funcionar perfectamente. Incluso si compilamos con el flag _\--race_ y lo ejecutamos, Go ya no nos devolverá una advertencia.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var tokens int = 120

func main() {
	var wg sync.WaitGroup
	var lock sync.Mutex
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			lock.Lock()
			// Todo lo que está aquí está bloqueado para el resto de las goroutines
			tokens_leidos := tokens
			time.Sleep(1 * time.Millisecond)
			tokens_leidos += 20
			tokens = tokens_leidos
			lock.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(tokens)
}
```

{{<ad3>}}

## Mutex de lectura y escritura

Además del mutex anterior, Go cuenta con un lock llamado RWMutex, que permite que, en un momento dado, solo una sola goroutine escriba o que múltiples lectores lean.

RWmutex funciona activando el candado o bloqueo cuando hay un proceso escribiendo en el lock, durante ese momento, no se puede leer ni escribir dentro del contenido del candado. Pero cuando un proceso está leyendo, otros procesos pueden leer también.

```go
var lock sync.RWMutex
lock.RLock()
// Todo lo que está aquí está bloqueado para el resto de las goroutines
lock.RUnlock()
```

## Recursos útiles sobre mutex


- [Race conditions](https://cloudxlab.com/blog/race-condition-and-deadlock/) (en inglés)