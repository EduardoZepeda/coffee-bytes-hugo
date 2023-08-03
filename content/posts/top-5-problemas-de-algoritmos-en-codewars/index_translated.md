---
title: "Top 5 Favorite Algorithm Problems at Codewars"
date: 2022-04-30T17:29:06-05:00
categories:
* "opinions"
* "algorithms"

coverImage: "images/top-5-katas-codewars.jpg"
description: "Learn how to use celery in django to schedule periodic or maintenance tasks to run every certain time or on a given date."
keywords:
* "internet"
* "performance"
* "algorithms" * "algorithms

authors:
- Eduardo Zepeda
---

## What is codewars?

Codewars is a social network of programmers who get together to challenge each other to solve code challenges. Codewars is one of **the best websites for practicing algorithms and solving Katas**. Katas? Yes, as in Karate.

### What are katas?

In the spirit of martial arts, more specifically Karate, these code problems are called _katas_. The _katas_ are divided, ascendingly, according to their difficulty. There are katas from 8th kyu to 1st kyu, with 1st kyu being the most difficult type of _kata_ of all.

There are _katas_ on many, many topics: algorithm development, efficiency, regex, mathematics, cryptography, etc.

Collectively, the _katas_ encompass a variety of languages: C, C++, Go, Python, Javascript, Elixir, Haskell, Rust, even languages as esoteric as Brainfuck. While, individually, each Kata has one or more languages.

Without further ado, here are my top 5 _katas_. These _katas_ **are not necessarily the most difficult ones**, but the ones that I consider to have the ideal balance between creativity and difficulty. I choose those that give that feeling of a good puzzle, one of those that you can't stop until you solve it.

By the way, **no, I'm not going to post the answers**, those are up to you.

## Multi Line Task++: Hello World

You need to write a function that returns the string "Hello, world!" in Javascript.

Requirement: Each line must have at most 2 characters, and the total number of lines must be less than 40.

Hint: It is possible to complete it in only 28 lines of code.

Original Kata: [Multi Line Task++: Hello World](https://www.codewars.com/kata/59a421985eb5d4bb41000031)

### Note on Kata

The difficult part is the two characters per line maximum. Give it a try.

```javascript
12
34
56
78
//
```

There is a more complicated version where the limit is one character per line, in case you find this one too easy.

## Make a spiral

Your task is to create a spiral of NxN with the given size.

For example, a spiral with 5 sides should look like this:

```javascript
00000
....0
000.0
0...0
00000
```

And size 10

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

The return value should contain an array of arrays, 0's and 1's, with the first row consisting of 1's. For example, for the given size of 5, it should be:

```bash
[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
```

For extreme cases of small spirals, the size will be at least 5.

As a general rule, the snake made of 1s cannot touch itself.

Original Kata: [Make a spiral](https://www.codewars.com/kata/534e01fbbb17187c7e0000c6)

### Note on Kata

It looks easy, but I assure you it won't be so easy on your first try.

## El alma del ingenio: invertir una matriz

No time for stories, invert an array (in Javascript), return the result. Do whatever you want with the original array. Don't use Array.prototype.reverse.

You have 30 bytes to spend.

Example: [1, 2, 3] → [3, 2, 1].

This time you won't be able to do the other Kata thing.

Nor can you use require.

Kata original: [El alma del ingenio: invertir una matriz](https://www.codewars.com/kata/59b81886460387d8fc000043)

### Note on Kata

By 30 bytes it means that you have the equivalent in characters to use in your code. For example: the solution below has 33 characters, it exceeds the limit and also cannot be used reverse.

```javascript
const reverse = a => a.reverse();
```

## Último dígito de un número enorme

Given a list [x1, x2, x3, ..., xn] compute the last digit (decimal) of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

Example:

lastDigit([3, 4, 2]) === 1

because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 million digits. Your lastDigit function has to deal with those numbers efficiently.

Unusual cases: we assume that 0 ^ 0 = 1 and that the last digit of an empty list is equal to 1.

Kata original: [Last digit of a huge number](https://www.codewars.com/kata/5518a860a73e708c0a000027)

### Note on Kata

If you are thinking of writing something like:

```python
def lastDigit(arr):
    # Esta función NO es la correcta
    total = 1
    for element in arr[::-1]:
        total = element ** total

    return str(total)[-1]

last_digit([528374,27415,789392,462589,166837,699678,866982])
```

Solutions like this will get you nowhere, the Kata has to run incredibly fast.

See how long it takes to run in Python with the correct lastDigit function.

```bash
time python script.py 

real 0m0.122s
user 0m0.073s
sys	 0m0.044s
```

If you try to run the above code you can probably go make a cup of coffee before it finishes executing.

## Escape the maze

You are provided with a complete labyrinth, like a 2-dimensional grid, more specifically in your language: an array of strings.

maze[0][0] is the upper left corner
maze[maze[maze.length - 1][maze[0].length - 1] is the lower right corner

Within this 2D grid:

```
' ' Espacio que puedes recorrer
'#' Es un arbusto de espinas (No puedes cruzarlo)
'^', '<', 'v' or '>' Tu cuerpo mirando hacía la parte superior, izquierda, inferior, o derecha, respectivamente, del mapa.
```

Original Kata: [Escape the maze](https://www.codewars.com/kata/5877027d885d4f6144000404)

### Note on Kata

You are given a series of mazes, your position and you must provide an array of moves to get out. It's incredibly entertaining!

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

## Katas with honorable mention

There are other Katas that I like very much but they were left out of this top. Check them out.

* [The Millionth Fibonacci Kata](https://www.codewars.com/kata/53d40c1e2f13e331fc000c26)
* [Prime Streaming [NC-17]](https://www.codewars.com/kata/59122604e5bc240817000016)
* [Breaking the Vigenère Cipher](https://www.codewars.com/kata/544e5d75908f2d5eb700052b)
* [Escape the Maze](https://www.codewars.com/kata/5877027d885d4f6144000404)
* [Simple Maze](https://www.codewars.com/kata/56bb9b7838dd34d7d8001b3c)
* [Sum strings as numbers](https://www.codewars.com/kata/5324945e2ece5e1f32000370)
* [Elemental words](https://www.codewars.com/kata/56fa9cd6da8ca623f9001233)