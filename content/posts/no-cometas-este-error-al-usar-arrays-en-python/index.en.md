---
title: "Don't make this mistake using arrays in Python"
date: "2021-04-07"
categories:
- "python"

coverImage: "images/NoCometasEsteError.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@nishizuka-25426/"
description: "Why is it that when I change one element of an array in a Python array all the others are changed? I explain why it happens and how to prevent it."
keywords:
- python
- performance

authors:
- Eduardo Zepeda
---

The other day I was solving a kata in [codewars](http://www.codewars.com/r/qsX8Ww), one of the steps of the problem needed a two-dimensional array, in more mundane words: an array of arrays. In Python it is super simple to create a two-dimensional array using the multiplication operator, as if it were numbers.

```python
arr = [0]*5
#[0, 0, 0, 0, 0]
```

If you have no idea what I'm talking about, I have an excellent resource that can help you a lot: ["Inmersion en Python", totally free and in Spanish](/blog/learn-python-from-scratch-with-this-free-book/)

## The wrong way to create arrays in Python

Knowing how to create arrays using the multiplication operator, we could think of creating a two-dimensional array as follows:

```python
matrix = [[0]*4]*4
#[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
     #
```

So far so good, we already have our matrix. But, what if we want to change the second element of the first element of our matrix (I have marked it with a hashtag above).

```python
matrix[0][1] = 3
#[[0, 3, 0, 0], [0, 3, 0, 0], [0, 3, 0, 0], [0, 3, 0, 0]]
```

What happened? We modified a single element and all of them have been modified. And not only that, but the modified elements always correspond to the second element. Why is it that when we change one element of an array in Python they are all changed?

### Why are all the elements of my array changed in Python?

This happens because when Python creates the array, **it is not creating 4 different arrays**, but it creates only one and copies 4 times the reference to this memory space, so, any change we make is modifying the only array that exists and, **as the 4 references point to that array, we see the change reflected in all** the arrays.

## How to prevent this error?

To prevent this error when creating a two-dimensional matrix.

```python
new_matrix = [[0]*4 for _ in range(4)]
new_matrix[0][1] = 3
# [[0, 3, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

In the above code, a new array is created for each element in our list comprehension, ensuring that there are 4 individual arrays and that each change occurs only once in our two-dimensional array.

Now you know that, if in a two-dimensional matrix you are changing all the elements when you modify a single one, you must change the way you generated your matrix.