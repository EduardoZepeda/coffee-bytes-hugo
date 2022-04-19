---
title: "Patrones de diseño en Python, reseña de Practical Python Design Patterns"
date: "2020-05-31"
categories: 
  - "python"
coverImage: "practical_python_design_patterns.jpg"
---

Hola, hoy te traigo una reseña del libro de _Practical Python Design Patterns_ de Wessel Badenhorst. Este es un libro de patrones de diseño para Python, bastante sencillo de entender y con ejemplos hechos en sencillo y legible código Python. Para hablar un poco del contenido del libro voy a explicar levemente lo que es un patrón de diseño.

## ¿Qué son los patrones de diseño?

Cuando queremos desplazarnos de un lugar a otro por cortas distancias utilizamos un vehículo terrestre, estos generalmente tienen 3 elementos: ruedas, una superficie donde colocaremos el objeto o persona a transportar y un medio que genere o transfiera la energía necesaria para el movimiento. Las ruedas generalmente van en contacto con el piso y el método de propulsión está unido a las ruedas para hacerlas girar y permitir el movimiento.

Cuando una persona quiere crear un vehículo que cumpla la función de transportar un objeto por tierra generalmente pensará en estos elementos y trabajará sobre esos elementos para modificarlos y crear algo diferente o más sofisticado. Esta unión de objetos es un **patrón de diseño**.

## Patrones de diseño en Software

En el software los patrones de diseño son iguales, son el acomodo y las relaciones específicas de objetos, métodos y atributos que nos permiten solucionar un problema. ¿Cómo que problemas? Prácticamente cualquier problema que se presente con demasiada frecuencia para que se llegue a una solución estandarizada.

Algunos problemas muy comunes son: la creación de enemigos con diferentes características en un videojuego MMORPG, asegurarse de que solo haya una instancia de una clase ejecutándose, adaptar una API complicada e imposible de modificar a una más sencilla y fácil de entender o separar la parte que maneja la base de datos, la que decide la lógica y la que muestra el contenido HTML de una página web. ¿Te suena este último a algo? **Sí, el MVC que usan muchos frameworks web es un patrón de diseño.**

Los patrones de diseño facilitan que el desacoplamiento del código, lo que vuelve más sencillo agregar o remover funciones y también nos dan la seguridad de que son soluciones que ya han sido probadas una y otra vez a lo largo de los años.

Hay numerosos patrones en existencia como problemas a resolver, así mismo los patrones pueden combinarse entre sí en sistemas complejos. Sin embargo hay ciertos patrones bastante populares que son los que han sido recopilados para ponerse en la mayoría de los libros que tratan este tema.

De la misma manera que surgieron esos patrones como respuesta a problemas existentes, se crean patrones nuevos frente a nuevos problemas, por lo que no hay una lista de patrones estáticos que sean absolutos y resuelvan todos los problemas.

Voy a explicarte tres ejemplos de patrones de diseño a continuación.

### singleton

Se usa cuando se quiere prevenir la creación de múltiples instancias de un mismo objeto. Por ejemplo, no querremos dos objetos que controlen el mouse o la impresora ejecutándose al mismo tiempo. Su uso indiscriminado es [considerado por muchos un antipatrón.](http://97cosas.com/programador/resiste-tentacion-singleton.html)

El truco de su funcionamiento ocurre en el método \_\_**new\_\_**. Este método se llama cuando se crea una clase y recibe la misma clase como parámetro.  
Al crearse un nuevo objeto revisará si existe el atributo _**instancia**_ en nuestra clase. Si no detecta el atributo **_instance_** creará una instancia de la clase **_\_\_SingletonObject_** y la asignará a **_instance_**. Posteriormente la retornará. En cambio, si la detecta, simplemente la retornará.

Los métodos **getattr** y **setattr** están modificados para obtener y asignar los atributos de la clase que se encuentra definida en el atributo **_instance_**

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

### Patrón observador

El patrón observador permite a un objeto mantenerse al tanto sobre los cambios de estado de otro objeto. Por ejemplo si queremos que se le notifique a cada usuario con un email cada vez que se actualicen las condiciones de uso de un servicio o dejarle saber a todos los usuarios cada que vez que un periódico digital publique nuevo material.

Para lograr esto nos aseguraremos de que cada observador posea un método **_update()_** (o como quieras llamarlo), este método será llamado por el Observable, en esta clase, por medio de un **_callback_** que es una función anónima. De esta manera tendremos un desacoplamiento de las clases que observan, pues estas no necesitan conocer ningún método del objeto, únicamente necesitan contar con un método **_update()_**.

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

## Patrón template

En este patrón se busca utilizar el decorador _@abstractmethod_ para garantizar la implementación de los métodos en una clase derivada.

En el siguiente ejemplo estamos obligando, bajo amenaza de que ocurra un error, a que la clase hija implemente los métodos _\_step\_1()_, _\_step\_2()_ y _\_step\_3()_. El método t_emplate\_method()_ se hereda tal cual está, por lo que no necesita definirse.

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

## Patrón decorador

El patrón decorador nos permite agregarle funcionalidad extra a una función sin modificarla directamente. Se usa bastante en Django y otros frameworks para restringir vistas de acuerdo a permisos o para verificar que un usuario esté loggeado. Funcionan creando una función que recibe a nuestra función como argumento, dentro de esta función crearemos un envoltorio (wrapper), que dota del funcionamiento extra a nuestra función, nuestro decorador retornará ese envoltorio.

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

Ahora cualquier acceso a la función ver\_configuración revisará si el usuario está loggeado, si lo está la función se ejecutará de manera normal, si no lo está devolveremos un mensaje de error.

Puedes ver el como se implementó el decorador [login\_required](https://docs.djangoproject.com/es/2.2/_modules/django/contrib/auth/decorators/) de django original en su documentación.

## Ahora sí, la reseña

_Practical Python Design Patterns_ nos describe varios patrones de diseño en código Python. El libro no lleva una introducción al lenguaje, el autor da por hecho que sabes Python, sobre todo el manejo de clases, herencia y métodos especiales (sí los que tienen los dos guiones al principio y al final. Por ejem: \_\_getattr\_\_, \_\_init\_\_, \_\_setattr\_\_, etc).

Cada capítulo nos presenta un problema a resolver y nos va mostrando, paso por paso, el desarrollo que nos lleva al patrón requerido para solucionarlo. Los ejemplos son simples y prácticos, aplicados a situaciones bastante cotidianas como videojuegos MMORPG, refrigeradores inteligentes, sistemas de puntos de ventas, entre otros. Al final de cada capítulo el autor propone unos cuantos ejercicios para poner en práctica cada patrón.

El libro cubre los siguientes patrones de diseño:

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

Creo que los patrones de diseño son un tema imperdible que marca mucho la diferencia a la hora de programar, sin embargo los ejemplos de patrones que aquí encontrarás, son exactamente los mismos que puedes encontrar en cualquier otro libro que trate el tema. Por otro lado, el plus que ofrece este libro es que los ejemplos están en Python, haciéndolos muy sencillos de comprender en lugar de otros libros de patrones de diseño escritos para C++ o Java.

**Conocimientos previos recomendados:** Python  
**Recomendado para leerlo:** 8/10  
**Idiomas:** Inglés

[Entra en este enlace](https://coffeebytes.dev/libros-que-he-leido-y-resenas/) para ver todas las reseñas de libros que tengo disponibles.
