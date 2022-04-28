---
title: "Desestructuracion de listas en Javascript"
date: "2019-11-03"
categories: 
  - "javascript"
coverImage: "desestructuracion_de_listas.jpg"
keywords:
  - javascript
---

En la entrada anterior expliqué un poco sobre el tema de la [desestructuración de objetos en javascript](https://coffeebytes.dev/desestructuracion-de-variables-en-javascript/). Además de la desestructuración de objetos, Javascript también permite desestructurar listas. En esta entrada hablaré sobre la destructuración de listas en Javascript.

Imaginemos que tenemos una lista con valores numéricos.

```javascript
const scientificData = [15.222, 1.723, 1.313, 4.555, 2.333, 1.990]
```

El contenido de la lista son solo números, no nos dicen absolutamente nada. Estos valores podrían ser coeficientes, mediciones de temperatura, longitudes de alguna pieza o algún gradiente de concentraciones de una solución; no tenemos manera de saberlo. Podríamos vernos tentados a procesar la información accediendo a los índices de cada valor de la lista, pero esto le restaría legibilidad al código.

```javascript

if(scientificData[0] > limitValueMouse){
   repeatSample()
}
if(scientificData[1] > limitValueFly){
   repeatSample()
}
```

En el fragmento de código anterior, si alguna de las condiciones excede cierta medida, repetimos el muestreo. Pero no sabemos de que muestreo habla por que no tenemos contexto, tan solo tenemos el índice de la lista.

Si nosotros fuimos quienes obtuvimos la información podríamos ser más descriptivos con el código para quienes lo lean en el futuro. Por esta razón decidimos asignarle una variable a cada índice de nuestra lista.

```javascript

const lengthMouse = scientificData[0]
const lengthFly = scientificData[1]
```

Sin embargo, si nuestra lista aumenta de tamaño estaremos repitiendo la misma estructura una y otra vez. Podemos ahorrarnos algo de código de la siguiente manera:

```javascript

const [mouseLength, flyLength] = scientificData
```

Usando este método asignamos el primer y el segundo valor de la lista a la variable _mouseLength_ y _flyLength_ , respectivamente.

```javascript

if(mouseLength > limitValueMouse){
   repeatMouseSample()
}
if(flyLength > limitValueFly){
   repeatFlySample()
}
```

Ahora el código es mucho más descriptivo y tus colegas, no tan iluminados como tú, podrán entenderlo

Pero oye, muy bonito y todo, pero que tal si mis objetos tienen otros objetos anidados y quiero obtener un valor de ellos. Bueno también podemos [desestructurar objetos anidados](https://coffeebytes.dev/desestructuracion-de-objetos-anidados/), en la  explicaré brevemente como hacerlo.
