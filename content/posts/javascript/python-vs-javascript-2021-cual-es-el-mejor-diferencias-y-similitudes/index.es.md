---
aliases:
- /python-vs-javascript-2021-cual-es-el-mejor-diferencias-y-similitudes
- /python-vs-javascript-cual-es-el-mejor-en-2024
- /python-vs-javascript-cual-es-el-mejor-lenguaje-de-programacion
- /python-vs-javascript-2021-cual-es-el-mejor-dife
- /es/python-vs-javascript-cual-es-el-mejor-lenguaje-de-programacion
- /es/javascript-vs-python-cual-es-el-mejor-en-2025/
- /es/javascript/javascript-vs-python-cual-es-el-mejor-lenguaje-de-programacion/
- /es/javascript-vs-python-cual-es-el-mejor-lenguaje-de-programacion/
authors:
- Eduardo Zepeda
categories:
- javascript
- python
coverImage: images/PythonVSJavascript.jpg
date: '2020-12-10'
description: Conoce las diferencias entre Javascript y Python, en esta comparación
  exhaustiva analizo su sintaxis, velocidad, paquetes, frameworks disponibles, filosofía.
keyword: javascript vs python
keywords:
- python
- javascript
- opinion
slug: /javascript/python-vs-javascript-cual-es-el-mejor-para-ti/
title: Javascript vs Python ¿cuál es mejor para ti?
---

Python y Javascript son dos de los lenguajes más populares entre las personas que están aprendiendo a programar, ambos son legibles, sencillos y con una curva de aprendizaje bastante plana si los comparamos con lenguajes como C, C++, Java o Rust. Ambos con sus fortalezas, debilidades, sus haters y sus defensores.

También tengo una comparación de [Python vs Go]({{< ref path="/posts/go/python-vs-go-cual-es-el-mejor-diferencias-y-similitudes/index.md" lang="es" >}}).

Por cierto, aquí están [mis recursos y libros favoritos para aprender Python]({{< ref path="/posts/python/best-source-to-learn-python/index.md" lang="es" >}})

## Javascript vs Python comparación TLDR

| Categoría                  | Python                                                          | JavaScript                                                                         |
| -------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Usos principales**       | Machine Learning, AI, scripting, backend web, análisis de datos | Desarrollo web (frontend y backend), aplicaciones interactivas en navegador        |
| **Popularidad**            | Más popular según StackOverflow (2023)                          | Menos popular que Python, pero TypeScript (su superset) es ligeramente más popular |
| **Salarios**               | Ligeramente mejor pagado (según StackOverflow 2023)             | Salarios competitivos, pero algo menores que Python                                |
| **Antigüedad**             | Más maduro (creado en los 80)                                   | Creado en los 90, diseñado con prisas (inconsistencias en el lenguaje)             |
| **Rendimiento**            | Más lento (interpretado)                                        | Más rápido (compilación JIT en motores modernos como Node)                         |
| **Tipado**                 | Fuertemente tipado (no permite cambios implícitos de tipo)      | Débilmente tipado (permite cambios implícitos, ej: `1 + "1" = "11"`)               |
| **Tipado opcional**        | Soporta tipado opcional (desde Python 3.5)                      | TypeScript añade tipado fuerte                                                     |
| **Sintaxis**               | Basada en indentación, menos caracteres especiales              | Similar a C/C++ (llaves, puntos y coma)                                            |
| **Librerías estándar**     | Amplia biblioteca estándar ("baterías incluidas")               | Librerías mínimas, pero gran ecosistema de paquetes (npm)                          |
| **Asincronismo**           | Async/await (desde Python 3.5), corre en un solo hilo           | Async/await nativo, ejecución en hilos separados                                   |
| **Frameworks web**         | Enfocado en backend (Django, Flask, FastAPI)                    | Full-stack (React, Angular, Vue para frontend; Express, NestJS para backend)       |
| **Paquetes**               | ~348k en PyPI (menos cantidad, pero más relevantes)             | +1 millón en npm (más variedad, pero paquetes redundantes)                         |
| **Soporte en navegadores** | No soportado nativamente                                        | Ejecución nativa en navegadores                                                    |
| **Entorno de ejecución**   | Instalado por defecto en Linux                                  | Node.js para ejecución fuera del navegador                                         |

### ¿Cuál elegir Python o Javascript?
- **Te recomiendo JavaScript** si:  
  ✔ Te interesa el desarrollo web, ya sea frontend o backend, no importa ya.  
  ✔ Mayor velocidad de ejecución (aunque no tanto como lenguajes compilados).  
  ✔ Buscas un ecosistema masivo de librerías para no reinventar la rueda e iterar más rápido (npm).  

- **Te recomiendo Python** si:  
  ✔ Te interesa Machine Learning, AI o análisis de datos.  
  ✔ Prefieres sintaxis legible y más mantenible.  
  ✔ Quieres un lenguaje más maduro y mejor diseñado, con una biblioteca estándar más completa.  

Si quieres ahondar en lo que menciono arriba, sigue leyendo.

{{<ad0>}}

## Javascript vs Python, usos de ambos lenguajes

### Usos de Javascript en el navegador

Javascript se usa, principalmente, para desarrollar aplicaciones web. Es el lenguaje por defecto de los navegadores web, pero su versatilidad no se detiene ahí; Node permite utilizarlo también en tu ordenador, para ser usado como un lenguaje del lado del servidor, crear APIs, servidores, incluso al machine learning, aunque no es tan popular como Python en este rubro.

~~En los últimos años hay rumores de que [deno](https://deno.land/#?), hecho por el creador de Node js, reemplazará a node, su predecesor, pero son solo eso, rumores.~~ Además de Node, Javascript cuenta con muchísimos motores, tales como [Bun](https://bun.sh/#?) [winterJS](https://github.com/wasmerio/winterjs#?) que ofrecen un rendimiento superior y más amenidades que Node.

### Python para AI y machine learning

Python es un lenguaje multipropósito, te permite crear aplicaciones nativas con interfaz de usuario, programar redes o servidores web, inteligencia artificial, desarrollo de aplicaciones web, prácticamente lo que sea.

Aunque su fuerte en este momento es machine learning, creación de scripting y podriamos decir que un poco de desarrollo web, estando muy por debajo de Javascript en este campo.

{{<ad1>}}

## Popularidad entre ambos lenguajes

Javascript empezó siendo mucho más popular que Python, probablemente debido al auge de los navegadores web. Sin embargo, en algún punto cercano al 2017, Python ganó relevancia en comparación con Javascript y la tendencia se mantiene hasta finales del 2022.

{{< figure src="images/Python-vs-Javascript-desde-2004.png" class="md-local-image" alt="Gráfico de google trends comparando Javascript vs Python" caption="Python gana relevancia frente Javascript en Google trends" >}}

### Python se mantiene más popular que Javascript

{{<ad2>}}

Stackoverflow muestra en sus encuestas que, entre los desarrolladores, Python es mucho más popular que Javascript. Sin embargo, Typescript (el super set de Javascript con tipado fuerte que mencioné anteriormente) es ligeramente más popular que Python.

{{< figure src="images/love-vs-dreaded-python-javascript.png" class="md-local-image" alt="Resultados de la encuesta de StackOverflow para los lenguajes más apreciados por desarrolladores. Python se encuentra por arriba de Javascript" caption="Python supera a Javascript en popularidad en 2023" >}}

## Python y Javascript salarios 

Según la última encuesta de Stackoverflow (2023), los profesionales que usan Python son ligeramente mejor pagados que aquellos que usan Javascript. Sin embargo la diferencia no es tan significativa. Typescript también se encuentra por encima de Javascript.

{{< figure src="images/salarios-python-vs-javascript.png" class="md-local-image" alt="Salarios de los desarrolladores de acuerdo al lenguaje de programación usado." caption="Python supera a Javascript en salarios en 2023" >}}

## Antigüedad, Python es más maduro

{{<ad3>}}

Python apareció a finales de los 80, mientras que Javascript apareció a principios de los 90, por lo que **Python es más maduro** que Javascript. 

### Javascript es un lenguaje mal diseñado

Si revisas la historia de Javascript verás que este se desarrolló en tiempo record, con prisas, lo cual se nota en las bases del lenguaje, donde encontramos inconsistencias lógicas y una que otra cosa poco intuitiva. Desafortunadamente Javascript no puede repararse porque cualquier cambio en la base del lenguaje rompería la web por completo.

Esto no necesariamente puede afectarte a los desarrolladores o al usuario final, pero se nota en algunas ocasiones y sirve como fuente de inspiracion para múltiples memes.

## ¿Cuál es más rápido Javascript o Python?

Al ser lenguajes interpretados son mucho más lentos que lenguajes compilados, por lo que quedarán bastante mal parados si los comparas con C, C++, Java, Rust, etc. 

### ¿Es Python más rápido que Javascript?

Sin embargo entre ellos la diferencia es evidente: se puede afirmar que **Javascript ejecutado en Node es mucho más rápido que Python con su intérprete original.**

El gráfico de abajo compara el tiempo de ejecución promedio de diez repeticiones del problema de las N-Reinas (mientras más bajo mejor), usé los [respectivos códigos de javascript y python de Sean P. Gallivan](https://dev.to/seanpgallivan/solution-n-queens-5hdb#javascript-code) (todos los créditos al autor) y el [programa multitime](https://tratt.net/laurie/src/multitime/) para el cálculo del tiempo promedio.

{{< figure src="images/problema-de-las-n-reinas.jpg" class="md-local-image" alt="Gráfico del tiempo de ejecución del problema de las N-Reinas entre Javascript y Python. Javascript tiene mejor rendimiento." caption="Rendimiento del problema de las n-Reinas. Tiempo de ejecución en eje de las Y y número de reinas en el eje de las X. (Menor es mejor, javascript es mejor)" >}}

Se usó Node.js v15.10.0 y Python 3.8.6. El código se ejecutó directamente desde la terminal, sin ningún otro programa ejecutándose. Si quieres saber las especificaciones de la computadora puedes escribirme a mis redes sociales y con gusto te las hago saber.

Aclaro, a pesar de ser bastante obvio, que no es una metodología con el rigor científico adecuado, sin embargo es útil a manera de comparación grosso modo.

## Python y Javascript ¿Lenguajes compilados o interpretados?

Para empezar diremos que **Python es un lenguaje interpretado**. Si no te suena el término, significa que tiene un intérprete que traduce las instrucciones, una por una, a lenguaje máquina, para que se ejecuten al momento. Por lo que no tienes que compilar todo tu código cada vez que quieras ejecutarlo, como sí lo harías con C++, Java, Rust, etc.

Javascript nació como un lenguaje interpretado, sin embargo los motores modernos han logrado que se convierta en un **lenguaje compilado JIT** ("Just in Time"). Prácticamente todos los navegadores hacen [compilado JIT](https://www.youtube.com/watch?v=d7KHAVaX_Rs) de Javascript, exceptuando, como siempre, IE8. En mi opinión su diseño no es más elegante que el de Python, esto se nota por ejemplo en el [manejo de fechas de Javascript, que por cierto detesto.]({{< ref path="/posts/javascript/porque-detesto-el-input-datetime-local-y-las-fechas-en-javascript/index.md" lang="es" >}})

Si quieres aprender como funciona el motor de Javascript a un nivel más profundo, te dejo un enlace a [una serie de videos](https://www.youtube.com/watch?v=No-Pfboplxo&list=PLfeFnTZNTVDNnF4a8eVooiubYAPUSP01C&index=1) en youtube donde se trata el tema más detalladamente.

Observa este esquema súper simplificado que compara los lenguajes compilados e interpretados.

{{< figure src="images/codigo-compilado-vs-interpretado.png" class="md-local-image" alt="Esquema súper simplificado de las diferencias entre código compilado e interpretado" caption="Diferencias entre un lenguaje interpretado y uno compilado." >}}

En este esquema me refiero a Javascript al momento de su creación, como lenguaje interpretado, no a la **compilación JIT** de la que te hablaba. 

Si bien no son los lenguajes [con mayor rendimiento, su flexibilidad es ideal para iterar una y otra vez en una startup o proyecto nuevo](/es/opinion/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/)

##  Soporte, Javascript y Python

### Soporte para Javascript

Javascript se encuentra en todos los navegadores de manera nativa, basta con que abras la terminal de tu navegador preferido para que empieces a utilizarlo. Es el lenguaje preferido para manipular el DOM .

Abajo puedes ver la terminal de javascript del navegador web Firefox

{{< figure src="images/ConsolaJavascript.gif" class="md-local-image" alt="terminal del navegador web ejecutando javascript" >}}

Además puedes usar node para ejecutarlo en tu computadora.

{{< figure src="images/ConsolaDeNodeJs.gif" class="md-local-image" alt="terminal de Nodejs en GNU/Linux ejecutando javascript" >}}

### Soporte para Python

Python no se encuentra en los navegadores, sin embargo está instalado en la mayoría de los sistemas GNU/Linux de manera predeterminada, si usas una distribución de GNU/Linux y abres la terminal de tu sistema operativo y ejecutas el comando Python lo más probable es que ya se encuent` instalado.

{{< figure src="images/PythonConsola.gif" class="md-local-image" alt="terminal de Python en GNU/Linux" >}}

## Comparación de tipado entre Python y Javascript

Respecto al tipado, es un tema muy complejo en el que no he encontrado un **consenso claro y uniforme** sobre que se considera tipado fuerte y que tipado débil. Sin embargo los expertos suelen decir que los lenguajes fuertemente tipados no permiten cambios en los tipos de datos una vez declarados, mientras que los débilmente tipados sí.

Te dejo un par de ejemplos para que los consideres

### Tipado en Javascript

Primero veamos que sucede si intentamos cambiar un tipo en Javascript.

```javascript
//javascript
let numeroEnTexto = "1"
numeroEnTexto = 1 // no pasa nada
const numero = 1 
numero = "2"
Uncaught TypeError: Assignment to constant variable.
```

Además de const, Javascript permite declarar una variable, let o var. Si en lugar de usar const hubieramos usado var o let el error no se presentaría.

Pero ahora mira lo que sucede si sumamos un entero y una cadena de texto.

```javascript
//javascript
console.log(1 + "1")
"11"
```

¡No pasa nada! El intérprete de Javascript los suma sin problema alguno, incluso aunque uno es de tipo string y el otro un entero. Si eres de los que prefieren usar tipado fuerte con javascript, ya sea porque traes un background de C++, Java u otro lenguaje furtemente tipado o simplemente prefieres las ventajas de un tipado fuerte, dale una mirada a lo que [Typescript](https://www.typescriptlang.org/#?) y su compilador tienen para ofrecer.

```javascript
// Este es código Typescript
// Observa como cada tipo de variable requiere su correspondiente tipo de dato
let idUser: number | string;
const months: Array<string> = ["Enero", "Febrero"]
```

### Tipado en Python

Python no requiere, de manera forzosa, que especifiques el tipo de variable. Mira lo que sucede si intentamos cambiar el tipo de una variable en Python.

```python
# Python
numero = "1"
numero = 1
numero = [1]
numero = {1:1} # no hubo error en ningún caso
```

Y ¿qué pasa si ahora intentamos sumar dos variables de tipo distintas como hicimos en Javascript?

```python
# Python
print(1 + "1")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

Como puedes apreciar, Python no permite realizar transformaciones implícitas de
un tipo de variable a otro.

```python
 def titleToNumber(columnTitle: str) -> int:
    # ...
```

#### Tipado opcional en Python

¿Y el Typescript para Python? Pues ya va incluido, Python incorpora tipado opcional, a partir de su versión 3.5, el tipado puede ser usado por algunos linters para mostrarte errores en el código, sin embargo el intérprete no obliga a su uso. Revisa la [documentación oficial](https://docs.python.org/3/library/typing.html) para aprender a usarlos.

## Diferencias de sintaxis entre Python y Javascript

### Sintaxis de Javascript

La sintaxis de **Javascript es bastante parecida a la de C++ y otros lenguajes de programación clásicos. La separación entre partes del código se hace por medio de llaves y puntos y comas**. Javascript usa _this_ como referencia al propio objeto y no se requieren al declarar métodos en los objetos.

```javascript
// true con minúsculas
if(true){"resultado"}
console.log("El punto y coma al final es opcional");
class MiClase {
  constructor(propiedad) {
    this.propiedad = propiedad;
  }
}

function(argumento, argumento_por_defecto="predeterminado"){
    let myFirstArgument = arguments[0]
    return myFirstArgument
}

try {
  functionThatCausesError();
} catch(error){
  console.error(error);
}
```

### Sintaxis de Python

Por otro lado, **Python favorece la legibilidad, el uso de caracteres especiales se encuentra reducido al mínimo y la separación para las partes del código se hace por medio de indentaciones y saltos de linea**. Python usa _self_ para referirse al propio objecto y requiere que se pase como primer argumento a cada método del objeto.

```python
# True con mayusculas
if True: 
    return "resultado"

print("También puedes incluir punto y coma al final, pero la convención es no hacerlo")

class MiClase:
    def __init__(self, propiedad):
        self.propiedad = propiedad

def funcion(argumento_por_defecto = "predeterminado", *args, **kwargs):
    mi_lista_de_argumentos = args
    mi_diccionario_de_argumentos = kwargs
    return mi_list_de_argumentos

try:
  do_something()
except:
  print("An exception occurred")
```

Las diferencias de sintaxis son mucho más extensas que las que aquí expongo, cada uno tiene sus propias funciones, sus propias librerías integradas y una sintaxis diferente, pero espero que al menos hayas apreciado las pequeñas diferencias entre ambos.


## Librerías estándar, comparación entre Python y Javascript

Python se caracteriza por ser un lenguaje con baterías incluidas, es decir, ya incluye por defecto muchísimas funcionalidades que solo tienes que importar para empezar a usarlas, ¿quieres trabajar con redes? importa el modulo socket, ¿quieres crear un GUI?, usa tkinter, ¿manipular audio?, usa audioop. Python incluye librerías para la mayoría de las necesidades comunes. Incluso incluye numpy, una poderosa librería para el análisis númerico.

Por otro lado, Javascript incluye solo lo necesario, aunque tiene una gigantesca comunidad de usuarios creando paquetes y poniéndolos a disposición de cualquiera que quiera tomarlos.

## Capacidad de asincronismo Javascript vs Python

### Asincronismo en Javascript

Las funciones asíncronas de javascript se ejecutan en un hilo separado y regresan al principal cuando se completan.

```javascript
async function(){
    await downloadData()}
```

### Asincronismo en Python

En Python las funciones asíncronas corren en un hilo sencillo y únicamente cambian a otra corrutina cuando una operación asíncrona es encontrada.

A partir de Python 3.5 se incorpora asincronismo mediante la misma sintaxis de async y await

```python
from tortoise import Tortoise, run_async
from database.connectToDatabase import connectToDatabase

async def main():
    await connectToDatabase()
    await Tortoise.generate_schemas()

if __name__ == '__main__':
    run_async(main())
```

## Frameworks para desarrollo web de Python y Javascript

Javascript y Python tienen bastantes frameworks para elegir cuando se trata de desarrollo web.

### Frameworks web para Javascript

Existen muchísimos frameworks de **Javascript para desarrollo web tanto para el backend como para el frontend**; para el backend

- express 
- nustjs 
- meteor 
- sails
- vue 
- react 
- svelte 
- angular
- adonisjs

{{< figure src="images/javascript-frameworks.jpg" class="md-local-image" alt="Frameworks de desarrollo web para Javascript" >}}

Incluso aún a pesar de la abundancia de opciones que hay salen nuevos frameworks de Javascript más frecuentemente que para Python.

### Frameworks web para Python

Debido a que Python no se encuentra instalado en los navegadores, **el desarrollo web actual usando Python se centra principalmente en la parte del Backend**, donde tenemos soluciones bastante maduras como [Django, con sus ventajas y desventajas]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="es" >}}), o Flask y algunas más modernas como el rapidísimo [framework de desarrollo web FastAPI]({{< ref path="/posts/fastapi/python-fastapi-el-mejor-framework-de-python/index.md" lang="es" >}}), del que ya escribí una entrada anteriormente.

- Django
- Fastapi
- Flask
- Pyramid

{{< figure src="images/python-frameworks.jpg" class="md-local-image" alt="Frameworks de desarrollo web de Python" >}}

Puedes escribir código HTML y CSS usando Python para el frontend, pero nunca tendrás la misma versatilidad que ejecutar código javascript directamente en el navegador del usuario.

Actualización: Me enteré de una librería que está ganando popularidad, llamada htmx, que te permite generar aplicaciones modernas devolviendo html en lugar de respuestas JSON. Entra en mi entrada sobre [django y htmx](/es/django/django-y-htmx-web-apps-modernas-sin-escribir-js/) para conocer más.

## Paquetes con pypi y NPM

Tanto la comunidad de Python, como la de Javascript, tienen librerías disponibles que solucionan la mayoría de los problemas más comunes a la hora de programar.

### Paquetes en Javascript

Javascript usa npm para el manejo de paquetes y hay bastantes de donde elegir. En junio del 2019 npm [superó el millón de paquetes publicados](https://snyk.io/blog/npm-passes-the-1-millionth-package-milestone-what-can-we-learn/). ¡Muchísima variedad para elegir! Aunque también te encuentras cosas como esta:

{{< figure src="images/IsOddPackageNpm-1.png" class="md-local-image" alt="Paquete is-odd de NPM" caption="El paquete para saber si un número es impar tiene casi medio millón de descargas" >}}

{{< figure src="images/meme-is-odd-js.jpg" class="md-local-image" alt="Meme del rapero usando el paquete is-odd en lugar de el operador modulo." caption="Meme del rapero burlándose de la cantidad de descargas" >}}

### Paquetes en Python

Pypi es la plataforma principal encargada del manejo de paquetes en Python. En la fecha en la que se actualizó este artículo [Pypi tiene 348,000 paquetes publicados](https://pypi.org/#?), ¡solo una quinta parte de la cantidad que tiene Javascript! Y como son menos paquetes podemos esperar paquetes más relevantes ¿no? A ver...

{{< figure src="images/IsOddPythonPackage.png" class="md-local-image" alt="Paquete is-odd de pip" caption="Python también tiene un paquete que revisa si un número es impar" >}}

## ¿Cuál es mejor Python o Javascript?

Espero que esta pequeña comparación te haya mostrado un poco las diferencias que existen entre ambos lenguajes y si estás pensando en centrarte en alguno de ellos tengas más información sobre la mesa para tomar la decisión correcta.

Si te urge empezar a desarrollar sitios web ya, sin complicarte, yo me iría por Javascript.

Si quieres dedicarte al machine learning y análisis de datos, o quieres una solución más integral en los sitios web y más flexibilidad, yo me iría por Python.

De cualquiera manera no tienes porque reducirlo todo a una dicotomía, si tienes tiempo para dedicarle a ambos puedes hacerlo, muchos desarrolladores web dominan múltiples lenguajes y los usan indistintamente de acuerdo a sus necesidades.