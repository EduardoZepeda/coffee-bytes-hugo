---
aliases:
- /en/how-to-make-a-switch-in-python/
authors:
- Eduardo Zepeda
categories:
- python
coverImage: images/PythonYatiene.jpg
coverImageCredits: Credits to https://www.pexels.com/@cottonbro/
date: '2021-03-06'
description: Learn how to use the Python switch statement, also known as match, its
  basic syntax and guard, to control the flow of your application.
keywords:
- python
title: How to make a switch in Python?
---

Python 3.10 was announced and it comes with something that many developers were missing from other languages: the switch statement. Yes, that piece of code that evaluates an expression and compares it with multiple cases to decide what to execute. Python did not have it implemented and many developers resorted to certain tricks to imitate it.

I remind you that if you don't know anything about Python I have a post where I talk about the [book "Inmersion en Python"]({{< ref path="/posts/python/ya-conoces-este-libro-gratuito-de-python-3-en-espanol/index.md" lang="en" >}}); one of the best free books to learn Python from scratch.

## Switch in Python 3.10

As of Python 3.10, **provided the developers do not retract**, the switch statement, which we will call by its name, **match**, from now on, will be written as follows:

```python
match subject:
    case <pattern_1>:
        <action_1>
    case <pattern_2>:
        <action_2>
    case <pattern_3>:
        <action_3>
    case _:
        <action_wildcard
```

{{<ad0>}}

The case followed by the underscore will function as the default case in case the pattern does not match any other. That is, the equivalent of _default_ in languages like Javascript.

Let's look at an example:

```python
def genera_monstruo(tipo):
    match tipo:
        case "Dementor":
            return "Genera Dementor"
        case "Aswang":
            return "Genera Aswang"
        case "Kapre":
            return "Genera Kapre"
        case _:
            return "Genera Goblin"
```

### Guard

The new match also includes an extra function called _Guard_, in which a condition is evaluated after the case. **If the case matches, but the condition is not met, it will jump to the next case block.

```python
match subject:
    case <pattern_1> if condition: # Si condition evalua a False se procederá al siguiente case
        <action_1>
    case <pattern_2>:
        <action_2>
    case <pattern_3>:
        <action_3>
    case _:
        <action_wildcard
```

And note that the _subject_ can be a string, an object, a tuple or an instance of a class.

{{<ad1>}}

## Switch in Python before version 3.10

If you don't already have Python 3.10 you can mimic the operation of a switch with an endless string of _ifs_ or _elifs_ like this:

```python
valor = "caso_n"
if valor == "caso_1":
    pass
if valor == "caso_2":
    pass
if valor == "caso_3":
    pass
```

Or by resorting to slightly more sophisticated techniques:

{{<ad2>}}

```python
def evalua_caso(caso, *args):
    switch = {"caso 1": "procesando caso 1", "caso 2": "procesando caso 2", "caso 3": "procesando caso 3"}
    return switch.get(caso, "Procesando caso por defecto")

valor = "caso 1"
evalua_caso(valor)
```

The values of each key in the dictionary can be replaced by functions to have even more control over the flow of the program.

## Other changes included in Python 3.10

Besides the new match, Python 3.10 brings other changes and additions to the language, which are quite a few but I will summarize the ones I consider the most important:

### Parentheses in context handlers

{{<ad3>}}

You can now use parentheses along multiple lines in context handlers (statements starting with ... as).

```python
with (
    CtxManager1(),
    CtxManager2()
):
    ...
```

### Clearer error messages on key matching

When you make a mistake closing a brace or parenthesis the interpreter will warn you explicitly that you forgot to close your brace or parenthesis, instead of just flagging a syntax error.

```python
File "example.py", line 1
    expected = {9: 1, 18: 2, 19: 2, 27: 3, 28: 3, 29: 3, 36: 4, 37: 4,
               ^
SyntaxError: '{' was never closed
```

### You can now use the pipe character in typing

The pipe operator "|" is added to the Python typing module so that you can use it interchangeably with _Union_.

```python
def square(number: int | float) -> int | float: # Antes Union[int, float]
    return number ** 2
```

### Distutils is obsolete

The distutils package, used to distribute packages, is marked as deprecated and will be discontinued in Python 3.12.

These are just some of the changes, if you want to check the complete list of changes please visit [the official documentation](https://docs.python.org/3.10/whatsnew/3.10.html)