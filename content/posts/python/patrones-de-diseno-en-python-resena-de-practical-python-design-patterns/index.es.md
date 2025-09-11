---
aliases:
- /patrones-de-diseno-en-python-resena-de-practical-python-design-patterns
- /es/patrones-de-diseno-en-python-resena-de-practical-python-design-patterns
- /es/patrones-de-diseno-o-software-design-patterns/
authors:
- Eduardo Zepeda
categories:
- python
- algoritmos
coverImage: images/practical_python_design_patterns.jpg
date: '2020-05-31'
description: Los patrones de diseño son soluciones comunes a problemas comunes, representados
  por entidades y las relaciones entre ellas en programación.
keywords:
- python
- patrones de diseño
- software architecture
slug: /python/patrones-de-diseno-o-software-design-patterns/
title: Patrones de Diseño o Software Design Patterns
---

Los patrones de diseño son soluciones comunes a problemas comunes, representados por entidades y las relaciones entre ellas en programación, entre ellos probablemente ya has escuchado hablar de algunos tales como: singleton, MVC o MTV, observer, entre otros. Pero esa explicación de los patrones de diseño es muy técnica para un primer acercamiento, déjame lo simplifico a continuación.

## ¿Qué son los patrones de diseño?

Cuando queremos desplazarnos de un lugar a otro por cortas distancias utilizamos un vehículo terrestre, estos generalmente tienen 3 elementos: ruedas, una superficie donde colocaremos el objeto o persona a transportar y un medio que genere o transfiera la energía necesaria para el movimiento. Las ruedas generalmente van en contacto con el piso y el método de propulsión está unido a las ruedas para hacerlas girar y permitir el movimiento.

Cuando una persona quiere crear un vehículo que cumpla la función de transportar un objeto por tierra generalmente pensará en estos elementos y trabajará sobre esos elementos para modificarlos y crear algo diferente o más sofisticado. Esta unión de objetos es un **patrón de diseño**.

{{<ad1>}}

## Patrones de diseño en Software

Ahora imagina que quieres que se ejecute solo una instancia de una clase ejecutándose a la vez, entonces decides que el proceso para hacerlo es el siguiente: 
1. Revisa si hay una instancia ejecutándose.
2. Si no existe creala y retórnala
3. Si ya existe retorna esa.

 Así de simple. Esta solución sería un patrón de diseño al problema común de ejecutar una sola instancia.

En el software los patrones de diseño son iguales, son el acomodo y las relaciones específicas de objetos, métodos y atributos que nos permiten solucionar un problema. ¿Cómo que problemas? Prácticamente cualquier problema que se presente con demasiada frecuencia para que se llegue a una solución estandarizada.

Algunos problemas muy comunes son: [el procesamiento de tareas usando un número fijo de workers](/es/software-architecture/explicacion-del-patron-de-diseno-worker-pool/), asegurarse de que solo haya una instancia de una clase ejecutándose, adaptar una API complicada e imposible de modificar a una más sencilla y fácil de entender o separar la parte que maneja la base de datos, la que decide la lógica y la que muestra el contenido HTML de una página web. 

¿Te suena este último a algo? **Sí, el patrón MVC que usan muchos [frameworks, como django]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="es" >}}), es un patrón de diseño.** O el patrón [debounce y Throttle]({{< ref path="/posts/javascript/debounce-y-throttle-en-javascript/index.md" lang="es" >}}) usados frecuentemente en Javascript.

{{<ad2>}}

Otro ejemplo es el famosísimo ["composición sobre herencia"]({{< ref path="/posts/software-architecture/favorecer-la-composicion-sobre-la-herencia-explicacion/index.md" lang="es" >}})

Los patrones de diseño facilitan que el desacoplamiento del código, lo que vuelve más sencillo agregar o remover funciones y también nos dan la seguridad de que son soluciones que ya han sido probadas una y otra vez a lo largo de los años.

## Patrones de diseño comunes en software

Hay numerosos patrones en existencia como problemas a resolver, así mismo los patrones pueden combinarse entre sí en sistemas complejos. Sin embargo hay ciertos patrones bastante populares que son los que han sido recopilados para ponerse en la mayoría de los libros que tratan este tema. Generalmente encontrarás estos: 

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

De la misma manera que surgieron esos patrones como respuesta a problemas existentes, se crean patrones nuevos frente a nuevos problemas, por lo que **no hay una lista de patrones estáticos que sean absolutos y resuelvan todos los problemas**.

{{<ad3>}}

## Ejemplos de patrones de diseño: singleton, observador, template, decorador

Voy a explicarte cuatro ejemplos de patrones de diseño en Python a continuación. ¿Por que Python? Porque es bastante sencillo de entender, incluso si nunca has escrito código Python, y si vienes de un lenguaje de bajo nivel, seguramente será pan comido para ti.

### Patrón de diseño singleton

Se usa cuando se quiere prevenir la creación de múltiples instancias de un mismo objeto. Por ejemplo, no querremos dos objetos que controlen el mouse o la impresora ejecutándose al mismo tiempo. Su uso indiscriminado es [considerado por muchos un antipatrón.](http://97cosas.com/programador/resiste-tentacion-singleton.html#?)

El truco de su funcionamiento ocurre en el método *new*. Este método se llama cuando se crea una clase y recibe la misma clase como parámetro.  
Al crearse un nuevo objeto revisará si existe el atributo *instancia* en nuestra clase. Si no detecta el atributo *instance* creará una instancia de la clase *SingletonObject* y la asignará a *instance*. Posteriormente la retornará. En cambio, si la detecta, simplemente la retornará.

Los métodos *getattr* y *setattr* están modificados para obtener y asignar los atributos de la clase que se encuentra definida en el atributo *instance*

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

### Patrón de diseño observador

El patrón observador permite a un objeto mantenerse al tanto sobre los cambios de estado de otro objeto. Por ejemplo si queremos que se le notifique a cada usuario con un email cada vez que se actualicen las condiciones de uso de un servicio o dejarle saber a todos los usuarios cada que vez que un periódico digital publique nuevo material.

Para lograr esto nos aseguraremos de que cada observador posea un método *update* (o como quieras llamarlo), este método será llamado por el Observable, en esta clase, por medio de un *callback* que es una función anónima. De esta manera tendremos un desacoplamiento de las clases que observan, pues estas no necesitan conocer ningún método del objeto, únicamente necesitan contar con un método *update*.

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

### Patrón de diseño template

En este patrón se busca utilizar el decorador _@abstractmethod_ para garantizar la implementación de los métodos en una clase derivada.

En el siguiente ejemplo estamos obligando, bajo amenaza de que ocurra un error, a que la clase hija implemente los métodos *step1*, *step2* y *step3*. El método *template_method* se hereda tal cual está, por lo que no necesita definirse.

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

### Patrón de diseño decorador

El patrón decorador nos permite agregarle funcionalidad extra a una función sin modificarla directamente. Se usa bastante en Django y otros frameworks para restringir vistas de acuerdo a permisos o para verificar que un usuario esté loggeado. Funcionan creando una función que recibe a nuestra función como argumento, dentro de esta función crearemos un envoltorio (wrapper), que dota del funcionamiento extra a nuestra función, nuestro decorador retornará ese envoltorio.

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

Ahora cualquier acceso a la función *access_dashboard* revisará si el usuario está loggeado, si lo está la función se ejecutará de manera normal, si no lo está devolveremos un mensaje de error.

Puedes ver el como se implementó el decorador [login\_required](https://docs.djangoproject.com/es/2.2/_modules/django/contrib/auth/decorators/) de django original en su documentación.

## ¿Dónde aprender patrones de diseño?

Mis recomendaciones para aprender patrones de diseño son las siguientes:
- [Head First Design Patterns de Eric Freeman y Kathy Sierra](https://amzn.to/4lolQe3#?) (El más popular)
- [Practical Python Design Patterns de Wessel Badenhorst](https://amzn.to/3IxCcSV#?) (Yo aprendí con este por ser completo y simple)

Pero yo creo que de este tema hay basta información en internet como para que leas un libro completo al respecto, además con darte una idea de los patrones más comunes y sus usos debería ser suficiente, puedes ahondar en ellos conforme los necesites.

## Fuente de código de los patrones de diseño

El código de estos ejemplos está tomado del libro *Practical Python Design Patterns* de Wessel Badenhorst.