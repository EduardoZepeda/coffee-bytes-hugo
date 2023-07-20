---
title: "¿Por qué deberías usar un entorno virtual en python?"
date: "2019-07-10"
categories: 
  - "python"
coverImage: "images/porque_deberias_usar_un_entorno_virtual.jpg"
description: "¿No sabes que es un entorno virtual en Python? Aquí te explico que es, para que sirve y sus diferencias con las máquinas virtuales."
keywords:
  - "python"
  - "opinion"
authors:
  - Eduardo Zepeda
---

Los entornos virtuales en python son una herramienta que se usa sí o sí en cada uno de los proyectos. Son tan importantes que forman parte de la librería estándar de Python, pero, ¿qué hacen? Deja que te cuente para que sirve un entorno virtual en python con un ejemplo bastante simple.

Imagínate que estás desarrollando dos proyectos, cada uno para una empresa diferente. En el primero de los proyectos estás desarrollando una nueva funcionalidad para un sitio web corporativo que utiliza Django 2.2. Un par de las librerías usadas en el anterior proyecto se actualizan con poca frecuencia, por lo que, para evitar problemas de compatibilidad, decides conservar esa versión de Django. Decides nombrar a este proyecto "Pro 2.2".

En el segundo proyecto, tus clientes startuperos millenials, te piden que desarrolles una aplicación web desde cero. Para aprovechar las nuevas características del framework utilizas la versión más nueva de Django en este proyecto. Nombras a este segundo proyecto "Pro-newest".

## Empiezan los problemas

Esa misma tarde decides empezar a trabajar en el primer proyecto, Pro 2.2. Más tarde, para no dejar olvidado el segundo proyecto, Pro-newest, te motivas a escribir algo de código. De repente, cuando necesitas regresar a trabajar nuevamente en Pro 2.2, el problema aparece claro frente a ti. Cada vez que trabajes en Pro 2.2 será necesario desinstalar la versión más nueva de Django y, cuando escribas código para el segundo proyecto, tendrás que instalar la versión más reciente. Y peor aún, esta situación se repite para cada dependencia del proyecto.

Decides que está bien, no pasa nada, así que decides trabajar así. Cuando terminas tu Proyecto Pro-newest estás tan emocionado que decides mostrarle a tu colega. Él recibe tus archivos pero te jura que el código no corre ¿qué estuvo mal? Tras una breve charla tu amigo te explica que tiene instalada la versión de Django 1.6 en su pc desde años atrás y que no la ha actualizado desde entonces. Tu proyecto con la versión más reciente de Django no funcionará en la computadora de tu amigo debido a incompatibilidades en las versiones. ¿No sería más sencillo si tu amigo pudiera usar la misma versión de Django del proyecto que quieres mostrarle? Sin tener que desinstalar la versión que ya tiene.

## ¿Y si usamos máquinas virtuales?

Podríamos solucionar el problema anterior instalando una máquina virtual, como [virtualbox](https://www.virtualbox.org/). Dentro de cada máquina virtual seriamos capaces de instalar las dependencias de nuestro proyecto a medida. Además tendríamos tantas como proyectos. Y funcionaría, ¿no? Bueno sí, pero con un gran inconveniente: hay que cargar todo un sistema operativo completo para tener unas cuentas dependencias. Es demasiada carga a nuestro sistema para resultar práctico.

Las máquinas virtuales consumen demasiado espacio en disco duro y el tiempo de arranque de cada máquina virtual es desalentador. La interacción entre nuestro sistema y una máquina virtual puede llegar a ser complicada. Después de todo, no necesitamos cargar todo un sistema operativo, sino solo código Python.

## La solución, un entorno virtual en python

Un entorno virtual, simplificando al máximo su explicación (perdónenme puristas), es un espacio aislado del resto de nuestro sistema operativo, donde tendremos una serie de dependencias instaladas de manera local. Es como si especificaras un lugar desde donde Python tomará sus librerías, en lugar del predeterminado que usa tu sistema operativo. Estas dependencias son independientes de las que tengamos previamente instaladas en nuestro sistema operativo. Y, lo mejor, podemos tener tantos de estos espacios aislados como deseemos.

Imagínate una carpeta donde tengamos instalado Django 2.2 y otra para la versión más nueva de Django. Al ser entornos aislados, no importa si nuestro sistema operativo ni siquiera tiene instalado django. Podremos cambiar entre un entorno virtual y otro, sin tiempos de carga excesivos, y el comportamiento será el mismo que si los tuvieramos instalados en nuestro sistema operativo.

Sobra decir que los entornos virtuales solucionan bastantes problemas. Y es una práctica altamente recomendada, por no decir casi obligatoria, cuando se trabaja con código Python.

## Opciones de gestores de entornos virtuales

Hay muchas opciones de entornos virtuales disponibles aquí te dejo algunos de los más populares:

- virtualenv
- [pipenv](/pipenv-el-administrador-de-entornos-virtuales-que-no-conoces/)
- conda
- poetry
