---
aliases:
- /en/design-patterns-in-software/
title: "Design Patterns In Software"
date: "2020-05-31"
categories:
- "python"
- "algorithms"

coverImage: "images/practical_python_design_patterns.jpg"
description: "Design patterns are common solutions to common problems, represented by entities and the relationships between them in programming."
keywords:
- python
- design patterns
- software architecture

authors:
- Eduardo Zepeda
---

Design patterns are common solutions to common problems, represented by entities and the relationships between them in programming, among them you have probably already heard of some such as: singleton, MVC or MTV, observer, among others. But that explanation of design patterns is too technical for a first approach, let me simplify it below.

## What are design patterns?

When we want to move from one place to another for short distances we use a land vehicle, these generally have 3 elements: wheels, a surface where we will place the object or person to transport and a medium that generates or transfers the energy necessary for the movement. The wheels generally go in contact with the ground and the propulsion method is attached to the wheels to make them rotate and allow the movement.

When a person wants to create a vehicle that performs the function of transporting an object over land they will generally think of these elements and work on those elements to modify them to create something different or more sophisticated. This union of objects is a **design pattern**.

{{<ad>}}

## Design Patterns in Software

Now imagine that you want to have only one instance of a class running at a time, so you decide that the process for doing this is as follows: 
1. Check to see if there is an instance running.
2. If it does not exist, create it and return it.
3. If it already exists return that one.

It is as simple as that. This solution would be a design pattern to the common problem of running a single instance.
In software, design patterns are the same, they are the arrangement and specific relationships of objects, methods and attributes that allow us to solve a problem. What kind of problems? Practically any problem that arises too frequently to come up with a standardized solution.

Some common problems are: [processing tasks using a fixed number of workers](/en/worker-pool-design-pattern-explanation/), making sure that there is only one instance of a class running, adapting a complicated and impossible to modify API to a simpler and easier to understand one, or separating the part that handles the database, the part that decides the logic and the part that displays the HTML content of a web page.

Does this last one ring a bell? Yes, the MVC pattern used by many [frameworks, such as django](/en/why-should-you-use-django-framework/), is a design pattern, or the [debounce-and-throttle](/en/limit-the-execution-of-functions-in-js-with-debounce-and-throttle/) pattern used mainly in JavaScript.

Another example is the well-known ["composition over inheritance]({{< ref path="/posts/favorecer-la-composicion-sobre-la-herencia-explicacion/index.md" lang="en" >}})

Design patterns make it easier to decouple the code, which makes it simpler to add or remove functions and also gives us the assurance that they are solutions that have already been tested over and over again over the years.

## Most common design patterns in software

There are numerous patterns in existence as problems to be solved, and patterns can be combined with each other in complex systems. However there are certain quite popular patterns that are the ones that have been compiled to be put in most books dealing with this subject. Generally you will find these:

- Singleton
- Prototype
- Factory
- Builder
- Adapter
- Decorator
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
- Publish-subscribe

Just as these patterns emerged in response to existing problems, new patterns are created in response to new problems, so **there is no list of static patterns that are absolute and solve all problems**.

## Examples of patterns: singleton, observer, template, decorator

I'm going to walk you through four examples of design patterns in Python below. Why Python? Because it's pretty simple to understand, even if you've never written Python code, and if you're coming from a low-level language, it'll probably be a piece of cake for you.

Design patterns make it easier to decouple the code, which makes it simpler to add or remove functions and also gives us the assurance that they are solutions that have already been tested over and over again over the years.

There are numerous patterns in existence as problems to be solved, as well as patterns can be combined with each other in complex systems. However, there are certain popular patterns that are the ones that have been compiled to be put in most of the books that deal with this subject.

Just as these patterns emerged in response to existing problems, new patterns are created in response to new problems, so there is no list of static patterns that are absolute and solve all problems.

I will explain three examples of design patterns below.

### Pattern singleton

It is used when you want to prevent the creation of multiple instances of the same object. For example, you don't want two objects that control the mouse or the printer running at the same time. Its indiscriminate use is [considered by many an anti-pattern.](http://97cosas.com/programador/resiste-tentacion-singleton.html#?)

The trick of its operation occurs in the *new* method. This method is called when a class is created and receives the same class as parameter.  

When a new object is created it will check if the *instance* attribute exists in our class. If it does not detect the *instance* attribute it will create an instance of the *SingletonObject* class and assign it to *instance*. Subsequently it will return it. On the other hand, if it detects it, it will simply return it.

The *getattr* and *setattr* methods are modified to get and assign the attributes of the class that is defined in the *instance* attribute.

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

### Pattern observer

The observer pattern allows an object to keep track of the state changes of another object. For example if we want to notify every user with an email every time the terms of use of a service are updated or to let all users know every time a digital newspaper publishes new material.

To achieve this we will make sure that each observer has an *update* method (or whatever you want to call it), this method will be called by the Observable, in this class, by means of a *callback* which is an anonymous function. This way we will have a decoupling of the classes that observe, because these do not need to know any method of the object, they only need to have an *update* method.

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

### Pattern template

In this pattern we seek to use the decorator _@abstractmethod_ to guarantee the implementation of the methods in a derived class.
In the following example we are forcing, under threat of an error occurring, that the child class implements the methods *step1*, *step2* and *step3*. The *template_method* method is inherited as is, so it does not need to be defined.

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

### Pattern decorator

The decorator pattern allows us to add extra functionality to a function without modifying it directly. It is widely used in Django and other frameworks to restrict views according to permissions or to verify that a user is logged in. They work by creating a function that receives our function as an argument, inside this function we will create a wrapper, which gives the extra functionality to our function, our decorator will return that wrapper.

```python
def requires_login(function):
    def wrapper():
        if user.is_logged_in():
            return function()
        return {"permission_denied": "Authenticated user required"}
    return wrapper

@requires_login
def access_dashboard(request):
    # ...
```

Now any access to the access_dashboard function will check if the user is logged in, if he is the function will run normally, if he is not we will return an error message.

You can see how the original django [login_required](https://docs.djangoproject.com/es/2.2/_modules/django/contrib/auth/decorators/) decorator was implemented in its documentation.

## Where to learn design patterns?

My recommendations for learning design patterns are as follows:
- Head First Design Patterns by Eric Freeman and Kathy Sierra (The most popular)
- Practical Python Design Patterns by Wessel Badenhorst (I learned my stuff with this one because it is complete and simple).

But I think there is enough information on this topic on the internet for you to read a whole book about it, besides, just giving you an idea of the most common patterns and their uses should be enough, you can go deeper into them as you need them.

## Source code for design patterns

The code for these examples is taken from the book *Practical Python Design Patterns* by Wessel Badenhorst.