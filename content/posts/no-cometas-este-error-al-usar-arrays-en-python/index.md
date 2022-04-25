---
title: "No cometas este error al usar arrays en Python"
date: "2021-04-07"
categories: 
  - "python"
coverImage: "NoCometasEsteError.jpg"
keywords:
  - python
  - rendimiento
---

El otro día estaba resolviendo una kata en [codewars](http://www.codewars.com/r/qsX8Ww), uno de los pasos del problema necesitaba de una matriz bidimensional, en palabras más mundanas: un array de arrays. En Python es súper sencillo crear una matriz bidimensional usando el operador de multiplicación, como si se tratara de números.

```python
arr = [0]*5
#[0, 0, 0, 0, 0]
```

Si no tienes idea de lo que estoy hablando te tengo un excelente recurso que puede servirte muchísimo: ["Inmersion en Python", totalmente gratuito y en español.](https://coffeebytes.dev/aprende-python-desde-cero-con-este-libro-gratuito/)

## La manera incorrecta de crear matrices en Python

Conociendo la manera de crear arrays usando el operador de multiplicación, podríamos pensar en crear una matriz bidimensional de la siguiente manera:

```python
matrix = [[0]*4]*4
#[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
     #
```

Hasta aquí todo perfecto, ya tenemos nuestra matriz. Pero, que tal si queremos cambiar el segundo elemento del primer elemento de nuestra matriz (lo he marcado con un hashtag arriba).

```python
matrix[0][1] = 3
#[[0, 3, 0, 0], [0, 3, 0, 0], [0, 3, 0, 0], [0, 3, 0, 0]]
```

¿Qué pasó? Modificamos un único elemento y se han modificado todos. Y no solo eso, sino que los elementos modificados corresponden siempre al segundo elemento. ¿Por qué cuando cambiamos un elemento de un array en Python se cambian todos?

### ¿Por qué se cambian todos los elementos de mi array en Python?

Esto sucede porque cuando Python crea el array, **no está creando 4 diferentes arrays**, sino que crea uno solo y copia 4 veces la referencia a este espacio de memoria, por lo que, cualquier cambio que hagamos está modificando el único array que existe y, **como las 4 referencias apuntan a ese array, vemos el cambio reflejado en todos** los arrays.

## ¿Cómo prevenir este error?

Para prevenir este error al crear una matriz bidimensional.

```python
new_matrix = [[0]*4 for _ in range(4)]
new_matrix[0][1] = 3
# [[0, 3, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

En el código anterior, se crea un array nuevo por cada elemento en nuestro list comprehension, asegurándonos de que existan 4 arrays individuales y de que cada cambio ocurra solo una vez en nuestra matriz bidimensional.

Ahora ya sabes que, si en una matriz bidimensional se están cambiando todos los elementos cuando modificas uno solo, debes cambiar la manera en la que generaste tu matriz.
