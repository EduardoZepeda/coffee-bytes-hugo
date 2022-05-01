---
title: "Top 5 Problemas de Algoritmos en Codewars"
date: 2022-04-30T17:29:06-05:00
draft: true
categories: 
  - "opiniones"
  - "algoritmos"
coverImage: "images/top-5-katas-codewars.jpg"
description: "Aprende a usar celery en django para programar tareas periódicas o de mantenimiento que se ejecuten cada cierto tiempo o en una fecha dada."
keywords:
  - "internet"
  - "rendimiento"
  - "algoritmos"
---

## ¿Qué es codewars?

Codewars es una red social de programadores que se reunen para retar a otros a resolver retos de código. Codewars es uno de **los mejores sitios web para practicar algoritmos y resolución de problemas**

### ¿Qué son las katas?

En el espíritu de las artes marciales, más específicamente Karate, estos problemas de código se llaman *katas*. Las *katas* se dividen, ascendemente, de acuerdo a su dificultad, desde el 8 kyu hasta la 1 kyu, siendo la 1 kyu la *kata* más dificil de todas.

Hay *katas* de muchísimos temas: desarrollo de algoritmos, eficiencia, regex, matemáticas, criptografía, etc. 

En conjunto, las *katas*  abarcan una variedad de lenguajes: C, C++, Go, Python, Javascript, Elixir, Haskell, Rust, incluso lenguajes tan esotéricos como Brainfuck. Mientras que, individualmente, cada Kata cuenta con uno o más lenguajes.

Sin más dilación, qquí te dejo mi top 5 de *katas*. Estas *katas* **No son necesariamente las más dificiles**, sino las que considero que tienen el balance ideal entre creatividad y dificultad. Elijo aquellas que dan esa sensación de un buen acertijo, de esos que no puedes parar hasta resolverlo.  

Por cierto, **no, no voy a poner las respuestas**, esas te tocan a ti.

## Multi Line Task++: Hello World

Necesitas escribir una función que retorne el string "Hello, world!" en Javascript.

Requisito: Cada linea debe tener a lo mucho 2 caracteres, y el número total de lineas debe ser menor a 40.

Pista: Es posible completarla en solo 28 lineas de código.

Kata original: [Multi Line Task++: Hello World](https://www.codewars.com/kata/59a421985eb5d4bb41000031)


### Nota sobre la Kata

Lo dificil es la parte de los dos caracteres por linea máximo. Inténtalo.

```javascript
12
34
56
78
//
```

Existe una versión más complicada donde el límite es un caracter por linea, en caso de que esta te parezca demasiado fácil.

## Make a spiral

Tu tarea es crear una espiral de NxN con el tamaño dado.

Por ejemplo, una espiral con 5 de lado debería lucir así:

```javascript
00000
....0
000.0
0...0
00000
```

Y de tamaño 10

```javascript
0000000000
.........0
00000000.0
0......0.0
0.0000.0.0
0.0..0.0.0
0.0....0.0
0.000000.0
0........0
0000000000
```

El valor de retorno debería contener un array de arrays, de 0 y 1, con la primera fila compuesta de 1's. Por ejemplo, para el tamaño dado de 5, debería ser:

Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:

```bash
[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
```

Por los casos extremos de pequeñas espirales, el tamaño será al menos de 5.

Como regla general, la serpiente hecha de 1s no se puede tocar a si misma.

Kata original: [Make a spiral](https://www.codewars.com/kata/534e01fbbb17187c7e0000c6)

### Nota sobre la Kata

Se ve fácil, pero te aseguro que no será tan sencillo en tu primer intento.

## The soul of wit: reverse an array

No hay tiempo para historias, invierte un array (en Javascript), retorna el resultado. Haz lo que sea que quieras con el array original. No uses Array.prototype.reverse.

Tienes 30 bytes para gastar.

Ejemplo: [1, 2, 3] → [3, 2, 1]

Esta vez no podrás caáz de hacer "la cosa" de la otra Kata.

Tampoco puedes usar require.

Kata original: [The soul of wit: reverse an array](https://www.codewars.com/kata/59b81886460387d8fc000043)

### Nota sobre la Kata

Con 30 bytes se refiere a que tienes el equivalente en caracteres para usar en tu código. Por ejemplo: la solución de abajo tiene 33 caracteres, excede el límite y además no se puede usar reverse.

```javascript
const reverse = a => a.reverse();
```

## Last digit of a huge number

Dada una lista [x1, x2, x3, ..., xn] computa el último digito (decimal) de x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

Ejemplo:

lastDigit([3, 4, 2]) === 1

porque 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

Cuidado: las potencias crecen increíblemente rápido. Por ejemplo, 9 ^ (9 ^ 9) tiene más de 369 millones de dígitos. Tu función lastDigit tiene que lidiar con esos números eficientemente.

Casos inusuales: asumimos que 0 ^ 0 = 1 y que el último dígito de una lista vacia es igual a 1.

Kata original: [Last digit of a huge number](https://www.codewars.com/kata/5518a860a73e708c0a000027)

### Nota sobre la Kata

Si estás pensando en escribir algo como:

```python
def lastDigit(arr):
    # Esta función NO es la correcta
    total = 1
    for element in arr[::-1]:
        total = element ** total

    return str(total)[-1]

last_digit([528374,27415,789392,462589,166837,699678,866982])
```

Soluciones de este tipo no te llevarán a ningún lado, la Kata tiene que correr increíblemente rápido.

Mira lo que tarda en correr en Python con la función lastDigit correcta.

```bash
time python script.py 

real 0m0.122s
user 0m0.073s
sys	 0m0.044s
```

Si intentas ejecutar el código de arriba probablemente puedas irte a preparar un café antes de que termine de ejecutarse.

## The Millionth Fibonacci Kata

El año es 1214. Una noche, el Papa Inocencio III se despierta para entonrar al arcangel Gabriel flotando sobre él. Gabriel le dice al papa:

Junta todos los hombres entendidos en Pisa, especialmente Leonardo Fibonacci. Para que las cruzadas en las tierras sagradas sean exitosas, estos hombres deben calcular el millonésimo número en la secuencia de Fibonacci. Fallen en hacerlo, y sus ejercitos nunca reclamarán la tierra sagrada, es el deseo del Señor.

En ángel se desvanece en una explosión de luz.

El Papa Inocencio III se sienta en su cama en desesperación. ¿Cuanto es un millon? se dice a si mismo. Él nunca fue muy bueno en matemáticas.

Intenta escribir el número, pero debido a que todos en Europa aún usan los numerales romanos en ese momento de la historia, no puede representar este número. Si tan solo supiera de la invención del número zero, harían esta clase de tareas más sencillas.

Él decide volver a la cama. Se consola a si mismo, el Señor nunca me retaría, además; esto debe haber sido algún engaño del diablo. Una pesadilla bastante horrenda, sin duda.

Los ejércitos del Papa Inocencio III continuarían conquistando Constantinopla (ahora Estambul), pero nunca recuperarían la Tierra Santa como él deseaba.

Kata original: [The Millionth Fibonacci Kata](https://www.codewars.com/kata/53d40c1e2f13e331fc000c26)

### Nota sobre la Kata

Ya sé has resuelto múltiples veces (y en bastantes lenguajes) la secuencia de fibonacci. Pero no te confies, estoy seguro de que no has visto nada como esto antes. La secuencia de fibonacci que conoces por correrá muy lento para pasar el reto. Intenta resolverla en el sitio oficial y verás a lo que me refiero.

## Katas honoríficas

Existen otras Katas que me gustan muchísimo pero quedaron fuera de este top. Dales una revisada.

* [Prime Streaming [NC-17]](https://www.codewars.com/kata/59122604e5bc240817000016)
* [Breaking the Vigenère Cipher](https://www.codewars.com/kata/544e5d75908f2d5eb700052b)
* [Escape the maze](https://www.codewars.com/kata/5877027d885d4f6144000404)
* [Simple Maze](https://www.codewars.com/kata/56bb9b7838dd34d7d8001b3c)
* [Sum strings as numbers](https://www.codewars.com/kata/5324945e2ece5e1f32000370)
* [Elemental words](https://www.codewars.com/kata/56fa9cd6da8ca623f9001233)