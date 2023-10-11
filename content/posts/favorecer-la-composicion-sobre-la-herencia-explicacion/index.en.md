---
title: "Composition over inheritance in OOP simple explanation"
date: 2023-10-10
draft: true
coverImage: "images/composition-over-inheritance.jpg"
coverImageCredits: "https://www.reddit.com/user/LegalCan4801/"
categories:
- devops
- "Software architecture"
keywords:
- python
- django
authors:
  - Eduardo Zepeda
---

Composition over inheritance is a recurring theme in object-oriented programming. Usually, it is explained in a very complex way, but today I will try to simplify it to the point where purists will hate me. 

Let's start, imagine you have a giant box of LEGO bricks, yes, those little plastic blocks that cause unimaginable pain when you step on them. But, in this case, we won't use them to cause pain but to build different types of cars.

## Inheritance or composition

To build our tiny cars, there are two ways:

1. Inheritance: you can start with a basic car design, and then make changes to it to create different types of cars. But sometimes this turn into a complete disaster, since you can end up with some strange cars that won't work properly.

2. Composition: Instead of starting with a basic car and changing it, you can use smaller LEGO pieces to build the different parts of a car, such as wheels, doors, and windows. Then put those pieces together to create different types of cars. This way, you have more control and flexibility to create exactly the type of car you want without making a mess.

So, **composition over inheritance means that it's often better to build things by putting smaller parts together rather than changing one big thing to make something new**.

### Compositing over inheritance

And put in an example using Python code we would get something like:

```python

# Inheritance 
class Car:
    def start_engine(self):
        print("Starting engine")

class SportsCar(Car):
    def start_engine(self):
        print("Rrrrrrrr! Starting engine")

# Composition 
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

In the inheritance example, we started with a basic "Car" and modified it to make a "SportsCar". In the compositing example, we build an "Automobile" and a "SportsCar" by combining smaller parts, such as the engine. It's like using LEGO pieces to build cars, and it gives us more control and flexibility when writing our programs.