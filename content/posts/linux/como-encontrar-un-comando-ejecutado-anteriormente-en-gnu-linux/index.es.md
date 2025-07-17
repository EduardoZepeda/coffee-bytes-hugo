---
aliases:
- /como-encontrar-un-comando-ejecutado-anteriormente-en-gnu-linux
- /es/como-encontrar-un-comando-ejecutado-en-gnu-linux/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/como_recuperar_comando_gnu_linux.jpg
date: '2019-09-01'
description: Alguna vez te ha pasado que quieres encontrar un comando ejecutado anteriormente
  en GNU/Linux. Hay varias maneras de hacerlo, aquí te explico dos de ellas.
keywords:
- linux
title: ¿Cómo encontrar un comando ejecutado en GNU Linux?
url: como-encontrar-un-comando-ejecutado-anteriormente-en-gnu-linux/
---

A veces ejecutamos comandos que resuelven una tarea muy específica en nuestro sistema. Puede ser que hayamos hecho una búsqueda de un archivo usando expresiones regulares o quizás accedimos a un servidor por medio de ssh y ya no recordamos la dirección IP. Volver a crear la expresión regular desde cero puede consumir mucho tiempo y quizás volver a encontrar la IP también puede consumir más tiempo que si simplemente pudiéramos recuperar el comando. Podemos encontrar un comando ejecutado anteriormente en GNU/Linux de manera sencilla, aquí te expongo como.

## Encontrar un comando ejecutado con history y grep

Una manera de hacerlo sería efectuar una búsqueda de la parte del comando que recordamos en el historial del comando. Esto puede hacerse de la siguiente manera:

```bash
history | grep "comando que buscamos"
```

El comando history nos mostrará la lista de comandos usados, el carácter pipe "|" redirigirá el resultado al comando grep, el cual buscará la cadena de texto que le específiquemos.


## Encontrar un Comando CTRL + R

Hay otra manera aún más sencilla de efectuar esta búsqueda. Este método es una combinación de teclas que, a pesar de su sencillez y facilidad de uso, no son muy populares, incluso entre los usuarios regulares de entornos GNU/Linux.

Primero abriremos una terminal, acto seguido presionaremos **_CTRL + R_**, esto modificará el cursor de la siguiente manera:

```bash
(reverse-i-search)`': history
```

Conforme presionemos las teclas irán apareciendo los comandos que coincidan con esa búsqueda. Si el comando que buscamos está en el archivo ~.history se mostrará al instante.

{{<ad>}}