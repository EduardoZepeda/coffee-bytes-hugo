---
title: "Patrones De Deploy o Despligue Comunes"
date: "2023-07-28"
draft: true
categories: 
  - "devops"
  - "arquitectura de software"
coverImage: "images/practical_python_design_patterns.jpg"
description: "Te explico algunos patrones de deploy comunes"
keywords:
  - devops
  - patrones de diseño
  - arquitectura de software
authors:
  - Eduardo Zepeda
---

## ¿Qué es un patrón de deployment o despliegue?

Un patrón de deployment es un método automático de implementar nuevas características de una aplicación a tus usuarios. Y esto, ¿para qué? Imagínate que quieres probar una característica de tu aplicación web, pero temes que no vaya a ser del agrado de tus usuarios. ¿Qué se puede hacer en estos casos? Lo mejor sería probarlo en una muestra representativa de tu público y, dependiendo de como responda, desecharla o implementarla al resto de los usuarios.

## Patrones de despligue comunes

Existen una serie de patrones bastante usados, probablemente ya hayas escuchado sobre varios de estos.

### Canary

Este patrón consiste en mostrar las nuevas características a un pequeño grupo de usuarios. Tras analizar y corregir el desempeño de las nuevas características y, si es conveniente, el deploy se extiende a la totalidad de usuarios.

### Features toggles

En lugar de liberar todos los cambios al mismo tiempo, este patrón esconde las características nuevas tras un switch, que se puede encender o apagar  sin modificar el código. Esto permite liberar los cambios de manera gradual o solo a ciertos usuarios, lo que lo vuelve fácil de testear y administrar. Este método tiene la ventaja de que si un problema ocurre, puedes poner el switch en apagado sin necesidad de retornar el código a un estado anterior.

### Blue/green deployments

En el deployment blue/green tenemos dos entornos similares de manera simultanea. Estos entornos se conocerán con el nombre de blue y green. En cualquier momento solo de los dos entornos se encontrará activo, mientras que balanceamos la carga de un entorno a otro. Si encontramos algun error simplemente ajustamos el balance de carga al lado contrario.

### A/B testing

El testeo A/B es el clásico de toda la vida; un conjunto aleatorio de nuestros usuarios recibirá la version A de la aplicación, mientras que el resto recibirá la versión B. Posteriormente se usará estadísticas, específicamente la prueba T para dos muestras, para determinar cual versión (La A o la B) es más efectiva. 

El porcentaje de distribución no necesariamente tiene que ser 50-50.

### Dark launches

Este tipo de patrón de deployment es bastante similar al Canary deployment, sin embargo en este caso los usuarios deben estar concientes de que están recibiendo una versión de prueba y deben conocer la nueva funcionalidad que está siendo puesta a prueba. Con este conocimiento los usuarios serán capaces de brindar feedback de la nueva funcionalidad.

