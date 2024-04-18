---
aliases:
- /favorecer-la-composicion-sobre-la-herencia-explicacion
- /composicion-sobre-herencia-en-poo-explicacion
authors:
- Eduardo Zepeda
categories:
- devops
- Arquitectura de software
coverImage: images/composition-over-inheritance.jpg
coverImageCredits: https://www.reddit.com/user/LegalCan4801/
date: '2023-10-11'
keywords:
- python
- django
title: Composicion Sobre Herencia en POO explicacion
---

Composition over inheritance, o composición sobre herencia es un tema recurrente en la programación orientada a objectos. Generalmente, se explica de una manera muy compleja, pero hoy voy a tratar de simplificarlo al punto en que los puristas me detesten. 

Empezamos, imagina que tienes una gigantesca caja de ladrillos LEGO, sí, esos pequeños bloques de plástico que causan un dolor inimaginable cuando los pisas. Pero, en este caso, no los usaremos para causar dolor sino para construir diferentes tipos de automóviles.

## Herencia o composición

Para construir nuestros diminutos automóviles, existen dos maneras:

1. Herencia: Puedes empezar con un diseño de automóvil básico, y luego hacerle cambios para crear diferentes tipos de automóviles. Pero, a veces, esto puede ser un completo desastre, puesto que puedes terminar con algunos automóviles extraños que no funcionarán correctamente.

2. Composición: En lugar de empezar con un automóvil básico y cambiarlo, puedes utilizar piezas LEGO más pequeñas para construir las diferentes partes de un automóvil, como ruedas, puertas y ventanas. Luego, junta esas piezas para crear distintos tipos de automóviles. De esta forma, tienes más control y flexibilidad para crear exactamente el tipo de coche que quieres sin hacer un desastre.

Por lo tanto, **la composición sobre la herencia significa que a menudo es mejor construir cosas poniendo partes más pequeñas juntas en lugar de cambiar una cosa grande para hacer algo nuevo**.

### Composición sobre herencia, ejemplo

Y puesto en un ejemplo usando código en Python obtendriamos algo como:

```python

# Inheritance o herencia
class Car:
    def start_engine(self):
        print("Starting engine")

class SportsCar(Car):
    def start_engine(self):
        print("Rrrrrrrr! Starting engine")

# Composition o composición
class Engine:
    def start(self):
        print("Starting engine")

class Car:
    def __init__(self):
        self.engine = Engine()

    def start_engine(self):
        self.engine.start()

class SportsCar:
    def __init__(self):
        self.engine = Engine()

    def start_engine(self):
        print("Vroooooom! Starting engine")

# Using Composition
regular_car = Car()
regular_car.start_engine()

fast_car = SportsCar()
fast_car.start_engine()
```

En el ejemplo de herencia, empezamos con un "Automóvil" básico y lo modificamos para hacer un "SportsCar". En el ejemplo de composición, construimos un "Automóvil" y un "SportsCar" combinando piezas más pequeñas, como el motor. Es como utilizar piezas de LEGO para construir coches, y nos da más control y flexibilidad a la hora de escribir nuestros programas.