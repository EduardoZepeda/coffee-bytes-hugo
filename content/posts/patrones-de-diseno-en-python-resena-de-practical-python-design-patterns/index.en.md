---
title: "Review of Practical Python Design Patterns"
date: "2020-05-31"
categories:
- "python"

coverImage: "images/practical_python_design_patterns.jpg"
description: "Learn Python design patterns with the book Practical Python Design Patterns, even if you've never read about the subject before."
keywords:
- python
- design patterns
- software architecture

authors:
- Eduardo Zepeda
url: /en/python-design-patterns-review-of-practical-python-design-patterns
---

Hi, today I bring you a review of the _Practical Python Design Patterns_ book by Wessel Badenhorst. This is a book of design patterns for Python, quite simple to understand and with examples done in simple and readable Python code. To talk a little bit about the content of the book I am going to explain slightly what a design pattern is.

## What are design patterns?

When we want to move from one place to another for short distances we use a land vehicle, these generally have 3 elements: wheels, a surface where we will place the object or person to be transported and a means that generates or transfers the energy necessary for the movement. The wheels are generally in contact with the ground and the propulsion method is attached to the wheels to make them rotate and allow movement.

When a person wants to create a vehicle that fulfills the function of transporting an object over land they will generally think of these elements and work on those elements to modify them to create something different or more sophisticated. This union of objects is a **design pattern**.

## Software design patterns list

In software, design patterns are the same, they are the specific arrangement and relationships of objects, methods and attributes that allow us to solve a problem. What kind of problem? Practically any problem that arises too frequently to come up with a standardized solution.

Some common problems are: [processing tasks using a fixed number of workers](/en/worker-pool-design-pattern-explanation/), making sure that there is only one instance of a class running, adapting a complicated and impossible to modify API to a simpler and easier to understand one, or separating the part that handles the database, the part that decides the logic and the part that displays the HTML content of a web page.

Does this last one ring a bell? **Yes, the MVC pattern used by many [frameworks, such as django](/en/why-should-you-use-django-framework/), is a design pattern, or the [debounce-and-throttle](/en/debounce-and-throttle-in-javascript/) pattern used mainly in JavaScript.

Design patterns make it easier to decouple the code, which makes it simpler to add or remove functions and also gives us the assurance that they are solutions that have already been tested over and over again over the years.

There are numerous patterns in existence as problems to be solved, as well as patterns can be combined with each other in complex systems. However, there are certain popular patterns that are the ones that have been compiled to be put in most of the books that deal with this subject.

Just as these patterns emerged in response to existing problems, new patterns are created in response to new problems, so there is no list of static patterns that are absolute and solve all problems.

I will explain three examples of design patterns below.

### singleton

It is used when you want to prevent the creation of multiple instances of the same object. For example, you don't want two objects that control the mouse or the printer running at the same time. Its indiscriminate use is [considered by many an anti-pattern.](http://97cosas.com/programador/resiste-tentacion-singleton.html)

The trick to its operation occurs in the __**new__** method. This method is called when a class is created and receives the same class as a parameter.
When a new object is created it will check if the attribute _**instance**_ exists in our class. If it does not detect the attribute **_instance_** it will create an instance of the class **_SingletonObject_** and assign it to **_instance_**. It will then return it. On the other hand, if it detects it, it will simply return it.

The **getattr** and **setattr** methods are modified to obtain and assign the attributes of the class that is defined in the **_instance_** attribute.

```python
#singleton_object.py
       class SingletonObject(object):
            class __SingletonObject():
                def __init__(self):
                    self.val = None
    
                def __str__(self):
                    return "{0!r} {1}".format(self, self.val)
            instance = None
    
            def __new__(cls):
                if not SingletonObject.instance:
                    SingletonObject.instance = SingletonObject.__SingletonObject()
                return SingletonObject.instance
    
            def __getattr__(self, name):
                return getattr(self.instance, name)
    
            def __setattr__(self, name):
                return setattr(self.instance, name)
```

### Observer pattern

The observer pattern allows an object to keep track of the state changes of another object. For example if we want to notify every user with an email every time the terms of use of a service are updated or to let all users know every time a digital newspaper publishes new material.

To achieve this we will make sure that each observer has an **_update()_** method (or whatever you want to call it), this method will be called by the Observable, in this class, by means of a **_callback_** which is an anonymous function. This way we will have a decoupling of the classes that observe, because these do not need to know any method of the object, they only need to have an **_update()_** method.

```python
class Task(object):

        def __init__(self, user, _type):
            self.user = user
            self._type = _type
    
        def complete(self):
            self.user.add_experience(1)
            self.user.wallet.increase_balance(5)
            for badge in self.user.badges:
                if self._type == badge._type:
                    badge.add_points(2)
    
    
    class ConcreteObserver(object):

        def update(self, observed):
            print("Observing: {}".format(observed))
    
    class Observable(object):

        def __init__(self):
            self.callbacks = set()
    
        def register(self, callback):
            self.callbacks.add(callback)
    
        def unregister(self, callback):
            self.callbacks.discard(callback)
    
        def unregister_all(self):
            self.callbacks = set()
    
        def update_all(self):
            for callback in self.callbacks:
                callback(self)
    
    def main():
        observed = Observable()
        observer1 = ConcreteObserver()
        observed.register(lambda x: observer1.update(x))
        observed.update_all()
    
    if __name__ == "__main__":
        main()
```

## Pattern template

In this pattern, the _@abstractmethod_ decorator is used to guarantee the implementation of methods in a derived class.

In the following example we are forcing, under threat of an error occurring, the child class to implement the __step_1()_, __step_2()_ and __step_3()_ methods. The t_emplate_method()_ method is inherited as is, so it does not need to be defined.

```python
import abc

class TemplateAbstractBaseClass(metaclass=abc.ABCMeta):

    def template_method(self):
        self._step_1()
    self._step_2()
    self._step_n()
        
    @abc.abstractmethod
    def _step_1(self): pass
    
    @abc.abstractmethod
    def _step_2(self): pass
    
    @abc.abstractmethod
    def _step_3(self): pass
    
class ConcreteImplementationClass(TemplateAbstractBaseClass):

     def _step_1(self): pass
     def _step_2(self): pass
     def _step_3(self): pass
```

## Pattern decorator

The decorator pattern allows us to add extra functionality to a function without modifying it directly. It is widely used in Django and other frameworks to restrict views according to permissions or to verify that a user is logged in. They work by creating a function that receives our function as an argument, inside this function we will create a wrapper, which gives the extra functionality to our function, our decorator will return that wrapper.

```python
def requiere_login(function):
    def wrapper():
        if usuario.esta_loggeado():
            return function()
        return {"permiso_denegado": "Esta vista requiere que el usuario esté loggeado."}
    return wrapper

@requiere_login
def ver_configuracion(request):
    # ...
```

Now any access to the view_configuration function will check if the user is logged in, if he is the function will run normally, if he is not we will return an error message.

You can see how the original django [login_required](https://docs.djangoproject.com/es/2.2/_modules/django/contrib/auth/decorators/) decorator was implemented in its documentation.

## Now, the review

Practical Python Design Patterns_ describes several design patterns in Python code. The book does not have an introduction to the language, the author assumes that you know Python, especially the handling of classes, inheritance and special methods (yes the ones with the two dashes at the beginning and at the end. For example: __getattr__, __init__, __setattr__, etc).

Each chapter presents a problem to be solved and shows us, step by step, the development that leads us to the pattern required to solve it. The examples are simple and practical, applied to fairly everyday situations such as MMORPG video games, smart refrigerators, point-of-sale systems, among others. At the end of each chapter the author proposes a few exercises to put each pattern into practice.

The book covers the following design patterns:

- Singleton
- Prototype
- Factory
- Builder
- Adapter
- Decorador
- Facade
- Proxy
- Chain of responsability
- Command
- Interpreter
- Iterator
- Observer
- State
- Strategy
- Template method
- Visitor
- MVC
- Publish-suscribe

I believe that design patterns are a must-have topic that makes a lot of difference when it comes to programming, however the pattern examples you will find here are exactly the same as you can find in any other book that deals with the topic. On the other hand, the plus that this book offers is that the examples are in Python, making them very easy to understand instead of other design pattern books written for C++ or Java.

**Recommended prior knowledge:** Python
**Recommended to read:** 8/10
**Languages:** English