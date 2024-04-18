---
aliases:
- /la-notacion-big-o
authors:
- Eduardo Zepeda
categories:
- linux y devops
- algoritmos
coverImage: images/BigO_notacion.jpg
date: '2019-08-15'
description: Te explico en que consiste la notación Big O para que puedas mejorar
  la eficiencia de tus algoritmos en tus aplicaciones.
keywords:
- bigo
- rendimiento
- algoritmos
title: La notación Big O
---

Amo la astrofísica y trato de estar al tanto de los nuevos descubrimientos que suceden; ya sean cosas triviales, como el descubrimiento de un nuevo planeta; o significativas, como las hipotéticas esferas de Dyson que juran encontrar cada mes. Pero el descubrimiento de esta ocasión fue fantástico. 

El pasado abril del 2019 se publicó la [primera fotografía de un agujero negro](https://www.bbc.com/mundo/noticias-47880446). 

![Primera imagen de un agujero negro](images/BigO_notacion.jpg "Primera imagen de un agujero negro")

La fotografía anterior requirió 5 petabytes de datos, lo que son 5000 terabytes de datos (aproximadamente el equivalente a 5000 discos duros de un terabyte de capacidad). Aquí los científicos se enfrentaron con un gran dilema, ¿qué método usar para enviar tanta información?

¿Qué pasaría si intentaban enviar esa información por internet? El tiempo que toma enviar información por internet aumenta con la cantidad de información a enviar, a mayor cantidad de información mayor tiempo de transmisión. 

Haciendo un cálculo sencillo, con una velocidad de descarga de 50 MB/s tomaría aproximadamente 1157 días. ¡Demasiado tiempo!

¿Y si enviaban la información en físico? Bien, esto tomaría a lo mucho la cantidad de horas del vuelo más largo que son 19 horas aproximadamente, descontando el tiempo que toma copiar la información a un medio físico (un disco duro), lo cual me atrevo a decir que consumiría menos de 1157 días.

¿Qué hubiera pasado si en lugar de ser 5 petabytes hubieran sido 5 GB de datos? la respuesta hubiera sido obvia; enviar la información por internet. Sin embargo, al avión le tomará el mismo tiempo transportar cualquier cantidad de información, ya sea 1 MB, 1 GB o 1 PB; 19 horas. 

En este caso el tiempo es constante. ¿Ya sabes que decidieron? Así es, los científicos optaron por enviar los discos duros en avión.

| Cantidad de información | Internet (a 50 MB/s)           | Avión    |
| ----------------------- | ------------------------------ | -------- |
| 1 GB                    | 20 segundos                    | 19 horas |
| 10 GB                   | 200 segundos                   | 19 horas |
| 1 TB (1000 GB)          | 20000 segundos (5 horas)       | 19 horas |
| 50 TB (50000 GB)        | 1000000 segundos (277 horas)   | 19 horas |
| 5 PB (5000000 GB)       | 100000000 segundos (1157 días) | 19 horas |

Con una velocidad de internet cercana a los límites actuales, usar internet para transmitir datos es mejor mientras más pequeña sea la cantidad de información. Mientras que transportar discos duros físicamente es mejor para cantidades inmensas de información. Lo anterior debido a que **el tiempo de transporte del avión es constante**, mientras que **el tiempo de transmisión de información del internet es lineal**; aumenta con la cantidad de datos.

## ¿Y esto que tiene que ver con el código?

Con el código sucede lo mismo, cada proceso que nosotros efectuemos sobre los datos para transformarlos consume tiempo y hay diferentes maneras de procesar los datos, hay algoritmos cuyo tiempo de ejecución es constante, para otros aumenta de manera lineal con la cantidad de datos que procesan, mientras que otros exponencialmente. 

Por otro lado, algunos ofrecen un mejor rendimiento con pocos datos, mientras que otros brillan a la hora de procesar mucha información.

A veces cuando no tenemos ni idea de algoritmos nos preguntamos, ¿qué más da si nuestro código se ejecuta en 0.0001 segundos o en 0.001 segundos?, para fines prácticos es lo mismo ¿no? [Obsesionarse con el rendimiento](/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/) del algoritmo correcto puede parecernos trivial para valores tan pequeños y si a eso le agregamos la vertiginosa velocidad de procesamiento del equipo moderno caeremos en el error de no darle la importancia correcta a los algoritmos. 

Pero ahora preguntémonos, ¿qué pasará cuando el número de usuarios se incremente a 1000, a 10 000, a 10 000 000?, es entonces cuando las milésimas de segundos se pueden volverse horas o días y, entonces, vislumbramos la verdadera importancia de elegir un algoritmo con un rendimiento adecuado.

## ¿Cómo calcular el rendimiento Big O?

Para evaluar este rendimiento se utiliza una notación llamada Big O. Esta nos dice como se va a comportar el tiempo de ejecución de un algoritmo en función de su input (entrada).

A mayor longitud de los datos de entrada mayor será el tiempo en recorrerlos y procesarlos, pero ¿en que proporción aumenta este tiempo? No es lo mismo un tiempo constante que un tiempo que aumente en proporción directa o proporción exponencial. 

Ciertamente un algoritmo que aumente en proporción exponencial no será algo lindo con lo que lidiar cuando tengamos que recorrer cantidades descomunales de datos. Para saber como se comporta nuestro algoritmo necesitamos analizarlo y hay ciertas reglas que hay que considerar en la notación big O.

### Los pasos se suman

Empezaremos con una función sencilla que, como ya habrás adivinado, **tardará más tiempo en ejecutarse conforme más grande sea el tamaño del array** que le pasamos como argumento.

```python
def printArray(array):
    for element in array: # un paso que llamaremos n
        print(element)
```

Esta función pasará por el array una sola vez. Como solo tiene **un paso**, es decir 'n', decimos que su tiempo de ejecución es O(n).

### Las constantes se descartan

Ahora mira este código, tiene dos pasos que procesan el mismo array de valores.

```python
def printArrayDoubled(Array):
    for element in Array: # primer paso
        print(element)
    for element in Array: # segundo paso
        print(element*2)
```

En el ejemplo de arriba estaríamos tentados a decir que nuestra función tendría un tiempo de ejecución igual a n + n, es decir O(2n), sin embargo **en notación Big O las constantes no cuentan**, el 2 se descarta, quedando O(n) nuevamente.

```python
def printArray(array):
    for elementX in array: # un paso
        for elementY in array: # un paso por cada paso anterior
            print(elementX, elementY)
```

En el caso anterior seguimos teniendo un mismo input, pero esta vez el tiempo de ejecución dependerá de la longitud del algoritmo, multiplicado por la misma longitud del algoritmo, pues por cada elemento del array se recorrera nuevamente el array, es decir n x n. Esto se simboliza con un n2, por lo que el tiempo que tarda en correr el algoritmo será de O(n2). Es decir el tiempo que tarda en ejecutarse la función crecerá de forma exponencial.

### Cada input único se toma como una variable diferente

```python
def printArrayMultiplication(ArrayOne, ArrayTwo):
    for elementInArrayOne in ArrayOne: # un paso que depende de que tan largo es ArrayOne
        for elementInArrayTwo in ArrayTwo: # un paso que depende de que tan largo ArrayTwo
            print(elementInArrayOne*elementInArrayTwo)
```

Checa la función anterior, en esta función también podriamos creer que tendriamos un O(n2), pero eso implicaría que ambos arrays son iguales, es decir n x n, ¿qué pasa si ArrayTwo es sumamente pequeño y ArrayOne sumamente grande? 

Para que n x n se cumpla significa que solo debe haber un término (n) y en este caso tenemos dos arrays diferentes, cada uno con su longitud particular, por lo que sería más correcto decir que O(a x b).

De esta manera expresamos que el tiempo de ejecución de nuestra función depende de dos variables: a y b. Si 'a' aumenta nuestro tiempo de ejecución también, si 'b' disminuye nuestro tiempo de ejecución decrece y viceversa.

### Los términos no dominantes se descartan

```python
def printArray(array):
    for elementX in array: #un paso que depende de array (n)
        print(elementX)
    for elementX in array: #un paso que depende de array 
        for elementY in array: #un paso por cada paso anterior (n al cuadrado)
            print(elementX, elementY)
```

En el caso anterior nosotros tenemos una notación O(n + n2). Un paso al principio que depende de la longitud del array y luego un 'n' al cuadrado. Pero otra característica de big O es que al sumar términos solo los términos dominantes (aquellos con el exponente más alto) cuentan, por lo que la expresión anterior se transformaría en O( n2).

## La notación big O para medir el rendimiento

La notación big O nos muestra que dos algoritmos para resolver un mismo problema se pueden comportar de manera diferente. Es importante evaluar cual es el algoritmo más adecuado para cada situación.

{{< youtube ZZuD6iUe3Pc >}}

Sobre algoritmos hay muchísimo de que hablar, esto es meramente una pincelada, si quieres ahondar en este tema te recomiendo un libro muy interesante llamado **_The Algorithm Design Manual_** escrito por Steven S. Skiena, donde se trata el tema de algoritmos y también notación big O con mucha más profundidad que en esta publicación. Te lo recomiendo muchísimo, es un libro que debería formar parte de tu acervo de consulta sí o sí. Puedes adquirirlo en Amazon u otras tiendas en linea.

Si buscas algo más visual para introducirte en el mundo de los algoritmos mira este excelente documental de la BBC:

{{< youtube Q9HjeFD62Uk >}}

## ¿Dónde practicar algoritmos?

Te dejo algunas opciones para practicar algorítmos.

* [newsletter de un algorítmo al día](/es/un-problema-de-algoritmos-al-dia/) 
* [codewars](/es/top-5-problemas-de-algoritmos-favoritos-en-codewars/)
* [HackerRank](https://www.hackerrank.com/)