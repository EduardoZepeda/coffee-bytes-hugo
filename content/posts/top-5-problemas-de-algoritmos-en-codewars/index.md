---
aliases:
- /top-5-problemas-de-algoritmos-en-codewars
- /top-5-problemas-de-algoritmos-favoritos-en-codewars
authors:
- Eduardo Zepeda
categories:
- opiniones
- algoritmos
coverImage: images/top-5-katas-codewars.jpg
date: 2022-04-30 22:29:06
description: 'Mis 5 desafios favoritos, o katas, en codewars: multi line task hello
  world,, espiral, escape the maze, The soul of wit: reverse an array.'
keywords:
- internet
- rendimiento
- algoritmos
title: Top 5 Problemas de Algoritmos Favoritos en Codewars
---

## ¿Qué es codewars?

Codewars es una red social de programadores que se reunen para retar a otros a resolver retos de código. Codewars es uno de **los mejores sitios web para practicar algoritmos y resolución de Katas**. ¿Katas? Sí, como en Karate.

### ¿Qué son las katas?

En el espíritu de las artes marciales, más específicamente Karate, estos problemas de código se llaman *katas*. Las *katas* se dividen, ascendemente, de acuerdo a su dificultad. Hay katas desde el 8vo kyu hasta la 1er kyu, siendo las de 1er kyu el tipo de *kata* más dificil de todas.

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

Esta vez no podrás capaz de hacer la cosa de la otra Kata.

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

## Escape the maze

Se te proporciona un laberinto completo, como una grilla de 2 dimensiones, más especificamente en tu lenguaje: un array de strings

maze[0][0] es la esquina superior izquierda
maze[maze.length - 1][maze[0].length - 1] es la esquina inferior derecha

Dentro de esta grilla en 2D:

    ' ' Espacio que puedes recorrer
    '#' Es un arbusto de espinas (No puedes cruzarlo)
    '^', '<', 'v' or '>' Tu cuerpo mirando hacía la parte superior, izquierda, inferior, o derecha, respectivamente, del mapa.

Kata original: [Escape the maze](https://www.codewars.com/kata/5877027d885d4f6144000404)

### Nota sobre la Kata

Se te proporciona una serie de laberintos, tu posición y debes proporcionarle un array de movimientos para salir. ¡Está increíblemente entretenido!

```python
[ '##########',
  '#        #',
  '#  ##### #',
  '#  #   # #',
  '#  #^# # #',
  '#  ### # #',
  '#      # #',
  '######## #' ]
```

## Katas con mención honorífica

Existen otras Katas que me gustan muchísimo pero quedaron fuera de este top. Dales una revisada.

* [The Millionth Fibonacci Kata](https://www.codewars.com/kata/53d40c1e2f13e331fc000c26)
* [Prime Streaming [NC-17]](https://www.codewars.com/kata/59122604e5bc240817000016)
* [Breaking the Vigenère Cipher](https://www.codewars.com/kata/544e5d75908f2d5eb700052b)
* [Escape the maze](https://www.codewars.com/kata/5877027d885d4f6144000404)
* [Simple Maze](https://www.codewars.com/kata/56bb9b7838dd34d7d8001b3c)
* [Sum strings as numbers](https://www.codewars.com/kata/5324945e2ece5e1f32000370)
* [Elemental words](https://www.codewars.com/kata/56fa9cd6da8ca623f9001233)