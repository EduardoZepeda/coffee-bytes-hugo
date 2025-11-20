---
aliases:
- /debounce-y-throttle-en-javascript
- /es/debounce-y-throttle-en-javascript/
- /es/limita-la-ejecucion-de-funciones-en-js-con-debounce-y-throttle/
- /es/javascript/limita-la-ejecucion-de-funciones-en-js-con-debounce-y-throttle/
authors:
- Eduardo Zepeda
categories:
- javascript
- algorithms
coverImage: images/BounceYThrottleJavascript.jpg
coverImageCredits: 'Créditos de la imagen a i7 de Pixiv: https://www.pixiv.net/en/users/54726558'
date: '2022-03-23'
description: Explicación interactiva y visual de los patrones debounce y throttle, usados para limitar
  la ejecución desmedida, especialmente como respuesta a eventos 
keywords:
- javascript
- patrones de diseño
- throttling
- debounce
slug: /javascript/explicacion-interactiva-de-debounce-y-throttle/
title: Explicación Interactiva de Debounce y Throttle
---

Hagamos una explicación interactiva de debounce vs throttle, donde puedas ver las diferencias entre estos [patrones de diseño]({{< ref path="/posts/python/patrones-de-diseno-en-python-resena-de-practical-python-design-patterns/index.md" lang="es" >}}) de una manera más visual. 

Debounce y Throttle son usados para limitar la ejecución de funciones, generalmente son utilizados para restringir la cantidad de veces que un evento se dispara: eventos click, scroll, resize u otros. Los patrones no son exclusivos de Javascript; en una entrada anterior te explique como usar throttle para [limitar la cantidad de requests que recibe el servidor nginx.]({{< ref path="/posts/software-architecture/como-limitar-peticiones-con-throttling-en-nginx/index.md" lang="es" >}})

Ambos patrones generan una función que recibe un callback y un tiempo de espera o delay.

## Debounce vs Throttle explicación interactiva

Vamos a usar un ejemplo interactivo para ver las diferencias entre Debounce vs Throttle, piensa en una granja virtual, en la que por cada vez que presionemos una tecla se añade un animal al corral, ahora, tenemos dos corrales, uno que funciona con debounce y otro con Throttle. 

Si escribes en la caja de texto verás como se comporta cada corral.

{{<debounceVsThrottle>}}

## Debounce vs Throttle diferencias principales

Si tienes prisa, estas son las principales diferencias y aplicaciones de ambos patrones. Sin embargo, si quieres entenderlos en profundidad sigue leyendo.

| **Aspect**                 | **Debounce**                                                                                                                   | **Throttle**                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Definición**             | Ejecuta la función después de un retardo especificado desde la última vez que se disparó el evento.                            | Ejecuta la función a intervalos regulares, asegurando que no sea llamada más de una vez por período.                  |
| **Tiempo de ejecución**    | Se retrasa hasta que el evento deja de dispararse durante un periodo determinado.                                              | Se ejecuta inmediatamente o a intervalos fijos, independientemente de la frecuencia con la que se produzca el evento. |
| **Ejemplo de Caso de Uso** | Inputs donde se introducen datos: actualización de sugerencias sólo después de que el usuario deje de escribir por un momento. | Eventos de scroll: limitar la velocidad a la que se calcula la posición del scroll.                                   |

## Qué es el Patrón Debounce?

El patrón de rebote o debounce pospone la ejecución de una función hasta que transcurra un determinado tiempo de espera.

Nuevos intentos de ejecutar la función cancelarán la ejecución pendiente y reiniciarán el tiempo de espera.

{{<ad0>}}

{{< figure src="images/DebounceORebote.png" class="md-local-image" alt="Esquema simplificado del patrón debounce" >}}

### Explicación del patrón debounce

El código para debounce en javascript se ve así:

```javascript
const debounce = (callback, tiempoDeEspera) => {
  let timeout 
  return (...args) => {
	clearTimeout(timeout)
	timeout = setTimeout(()=> callback(...args), tiempoDeEspera)
  }
}
```

Nuestra función debounce retorna a su vez una función, la cual recibirá cualquier número de argumentos (...args).

Esta función usa un closure para acceder a la variable timeout. ¿Qué es timeout? timeout es una función _setTimeout_, que programa la ejecución de nuestro callback para su posterior ejecución.

Pero ahora presta atención al clearTimeout. Cada vez que llamemos a la función debounce se eliminará cualquier función programada, por lo que la única manera de que se ejecute nuestro callback es esperar el tiempo que le pasamos como argumento.

{{<ad1>}}

## ¿Cómo funciona el patrón throttling?

El patrón throttling (o aceleración) establece un tiempo de espera durante el cual no se pueden llamar nuevamente más funciones. A diferencia del patrón bounce, el tiempo de espera no se reinicia si intentamos llamar nuevamente a la función.

{{< figure src="images/throttling.jpg" class="md-local-image" alt="Esquema simplificado del patrón throttling" >}}

### Explicación del patrón throttling

{{<ad2>}}

El código para el patrón throttling en javascript se ve así.

```javascript
const throttling = (callback, delay) => {
  let timeout
  return (...args) => {
    if (timeout !== undefined) {
      return
    }

    timeout = setTimeout(() => {
      timeout = undefined
    }, delay)

    return callback(...args)
  }
}
```

La función throttling retorna una función que tendrá dos vertientes que dependen del estado de timeout:

- timeout está definido: esto significa que ya hay programada una función para su ejecución, en este caso la función no hace nada, es decir, bloquea la ejecución de nuevas funciones por medio de un return vacio.
- timeout no está definido: si timeout no está definido, creamos un _setTimeout_ y la asignamos a la variable _timeout_. Esta función, una vez transcurrido su tiempo de ejecución, se eliminará a si misma de la variable _timeout_. Posteriormente, y para finalizar, ejecutamos la función callback.

{{<ad3>}}

## Otros recursos sobre debounce y throttling

- [Debounce y throttling en Typescript](https://charliesbot.dev/blog/debounce-and-throttle#?)
- [Debounce y throttling aplicados al DOM](https://webdesign.tutsplus.com/es/tutorials/javascript-debounce-and-throttle--cms-36783#?)