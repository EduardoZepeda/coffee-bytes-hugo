---
title: "¿Cómo escribir un switch en Python?"
date: "2021-03-06"
categories: 
  - "python"
coverImage: "images/PythonYatiene.jpg"
coverImageCredits: "Créditos a https://www.pexels.com/@cottonbro/"
description: "Aprende a escribir un statement switch en Python, también llamado match, su sintaxis básica y su guard, para controlar el flujo de tu aplicacion."
keywords:
  - python
authors:
  - Eduardo Zepeda
---

Se anunció Python 3.10 y viene con algo que muchos desarrolladores echaban de menos de otros lenguajes: el switch statement. Sí, ese trozo de código que evalúa una expresión y la compara con múltiples casos para decidir que ejecutar. Python no lo tenía implementado y muchos desarrolladores recurrían a ciertos trucos para imitarlo.

Te recuerdo que si no sabes nada de Python tengo una entrada donde hablo del [libro "Inmersion en Python"](/es/aprende-python-desde-cero-con-este-libro-gratuito/); uno de los mejores libros gratuitos para aprender Python desde cero.

## Switch en Python 3.10

A partir de Python 3.10, **siempre y cuando los desarrolladores no se retracten**, el switch statement, que llamaremos por su nombre, **match**, de ahora en adelante, se escribirá de la siguiente manera:

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

El case seguido del guión bajo funcionará como el caso por defecto en caso del que patrón no coincida con ningún otro. Es decir, el equivalente de _default_ en lenguajes como Javascript.

Veamos un ejemplo:

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

El nuevo match también incluye una función extra llamada _Guard_, en la que se evalúa una condición después del case. **Si el case coincide, pero la condición no se cumple brincará al siguiente bloque case.**

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

Y hay que notar que el _subject_ puede ser una cadena de texto, un objeto, una tupla o una instancia de una clase.

## Switch en Python antes de su versión 3.10

Si aún no tienes Python 3.10 puedes imitar el funcionamiento de un switch con una cadena interminable de _ifs_ o _elifs_ así:

```python
valor = "caso_n"
if valor == "caso_1":
    pass
if valor == "caso_2":
    pass
if valor == "caso_3":
    pass
```

O recurriendo a técnicas un poquito más sofisticadas:

```python
def evalua_caso(caso, *args):
    switch = {"caso 1": "procesando caso 1", "caso 2": "procesando caso 2", "caso 3": "procesando caso 3"}
    return switch.get(caso, "Procesando caso por defecto")

valor = "caso 1"
evalua_caso(valor)
```

Los valores de cada llave en el diccionario pueden reemplazarse por funciones para tener aún mayor control sobre el flujo del programa.


## Otros cambios que incluye Python 3.10

Además del nuevo match, Python 3.10 trae otros cambios y adiciones al lenguajes, los cuales son bastantes pero te resumo los que yo considero los más importantes:

### Paréntesis en manejadores de contexto

Ya puedes usar paréntesis a lo largo de múltiples lineas en los manejadores de contexto (las sentencias que empiezan con with ... as)

```python
with (
    CtxManager1(),
    CtxManager2()
):
    ...
```

### Mensajes de error más claros en coincidencia de llaves

Cuando te equivoques al cerrar una llave o paréntesis el interprete te avisará del error explícitamente que olvidaste cerrar tu llave o paréntesis, en lugar de solo marcarte un error de sintaxis.

```python
File "example.py", line 1
    expected = {9: 1, 18: 2, 19: 2, 27: 3, 28: 3, 29: 3, 36: 4, 37: 4,
               ^
SyntaxError: '{' was never closed
```

### Ya puedes usar el carácter pipe en el tipado

Se añade el operador pipe "|" al modulo de tipado de Python para que puedas usarlo intercambiablemente con _Union_.

```python
def square(number: int | float) -> int | float: # Antes Union[int, float]
    return number ** 2
```

### Distutils queda obsoleto

El paquete distutils, usado para distribuir paquetes, se marca como obsoleto y se descontinuará en Python 3.12

Estos son solo algunos de los cambios, si quieres revisar la lista de cambios completa por favor visita [la documentación oficial.](https://docs.python.org/3.10/whatsnew/3.10.html)
