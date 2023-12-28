---
title: "Inteligencia Artificial Y Diseno De Farmacos Y Medicamentos para desarrolladores"
date: 2023-12-27T10:44:08-06:00
draft: true
categories: 
  - "inteligencia artificial"
coverImage: "images/django-select-related-prefetch-related.jpg"
description: "¿Como funciona un fármaco en el cuerpo y como puede la inteligencia artificial y las redes neuronales a encontrar mejores fármacos para las enfermedades de los seres humanos?"
keywords:
  - inteligencia artificial
  - bioquímica
  - redes neuronales
authors:
  - Eduardo Zepeda
---


Una de las aplicaciones más interesantes para la inteligencia artificial es el desarrollo de nuevos fármacos. Llevar un nuevo fármaco al mercado es un proceso arduo, costoso y que, en la mayoría de los casos, es infructuoso. La inteligencia artificial puede acelerar el proceso enormemente y reducir los candidatos a nuevos fármacos a unos cuantos, en lugar de a decenas de ellos.

Para este post voy a tomarme algunas libertades y voy a simplificar conceptos y a sacrificar algo (o mucho) de precisión en aras de un mejor entendimiento. Si tienes dudas sobre quien soy yo para hablar de estos temas, y sobre mis credenciales, siéntete libre de pedírmelas en redes sociales.

## ¿Cómo funciona un fármaco explicado para desarrolladores?

Cuando tú ingieres un fármaco por vía oral, este ingresa a tu sistema digestivo, es absorbido por este y transportado a tu sangre. Una vez en sangre, el sistema circulatorio se encarga de distribuirlo a todo el cuerpo. La sangre tiene contacto con todas tus células. Cuando el fármaco alcanza a las células correctas, activa unos receptores celulares, los cuales disparan una función normal del cuerpo; ya sea liberar insulina al cuerpo, bloquear la secreción de alguna hormona.

Puedes pensar en un fármaco como una función que llama a otra función que ya existe en el cuerpo humano:

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
// ...
releaseInsulin(){}
}
```

### ¿Cómo sabe el fármaco sobre que células debe actuar?

La relación entre un fármaco y un receptor celular sigue un mecanismo similar al de llave-cerradura, donde el fármaco (la llave) únicamente va a activar las funciones de aquellas celúlas que tengan un receptor (la cerradura) que "encaje" con el fármaco. 

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
if(isReceptorCompatible(cell, drug)){
releaseInsulin(){}
}
}
```

### Los fármacos tienen efectos secundarios indeseables

Bueno, pues resulta que no es tan simple como lo estoy planteando aquí. Un fármaco no suele tener un solo efecto, sino múltiples. Existen incluso fármacos que tienen como efecto secundario la posibilidad de muerte súbita, sí, así como lo estás leyendo, lo tomas y existe una posibilidad (pequeña, eso sí) de que caigas muerto. 

Un fármaco óptimo va a provocar el efecto deseado con un mínimo de efectos secundarios.

``` javascript
function releaseInsulin(){}

function applyDrug(drug){
if(isReceptorCompatible(cell, drug)){
// desired effects
releaseInsulin(){}
// undesired effects
increaseDizzyness(){}
createRash()
}
}
```

### ¿De qué depende que un fármaco funcione y sus efectos secundarios?

Como te mencioné anteriormente, el que un fármaco active o no el receptor de una célula depende de si encaja con su "cerradura". Lo anterior lo define su estructura tridimensional. Por esta razón, si dos fármacos se parecen, probablemente provoquen efectos similares, pero al ser diferentes uno de ellos provocará menores efectos secundarios.

Generalmente un fármaco mantiene una estructura base, sin la cual no posee efecto, y pequeñas variaciones en esa estructura base son las que determinan la intensidad del efecto terapéutico y los secundarios. La parte difícil es intentar deducir cual combinación será la mejor.

Observa las moléculas de arriba, un solo cambio desemboca un comportamiento diferente en el cuerpo, ¿te imaginas la cantidad de variantes que podemos tener para un solo fármaco? Cada una con diferentes intensidades respecto a su efecto terapéutico y con una combinación única de efectos secundarios.

## Inteligencia artificial y desarrollo de fármacos

La inteligencia artificial es capaz de reconocer patrones que los seres humanos no podemos, puede analizar la información relacionada con una gran cantidad de moléculas y sus variantes, sus efectos secundarios, su estructura tridimensional y encontrar aquellos que sean favorables para los efectos buscados.

Estos efectos secundarios pueden ser medidos y ser usados para entrenar una red neuronal que arroje

Me atrevo a decir que aunque el proceso no será perfecto, dado que el cuerpo humano es un sistema sumamente complejo, será mucho mejor que buscar a ciegas entre un sin fin de opciones.
