---
title: "¿Comentar el codigo esta mal? Reseña de Clean Code"
date: "2020-05-16"
categories: 
  - "linux y devops"
coverImage: "images/clean_code.jpg"
description: "En esta reseña hablaré un poco sobre Clean Code, el libro de Robert C. Martin que nos explica como escribir código de manera limpia."
keywords:
  - libros
  - reseñas
  - opinion
  - buenas practicas
---

Hay dos tipos de programadores, los que odian Clean Code y los que lo aman. Este libro desata discusiones acaloradas en internet; unos lo consideran una biblia, otros lo consideran un manual desactualizado escrito por un autoproclamado dictador pedante sobre como escribir código? ¿Y yo? Pues para ser sincero un poco de ambos. Esta entrada es mi humilde reseña del libro Clean Code de Robert C. Martín, el **creador del acrónimo SOLID.**

¿A quién no le ha pasado que miramos a nuestro código escrito hace años y nos preguntamos que carajos era lo que queríamos hacer ahí? O intentamos extender el código de otra persona y nos topamos con que primero tendremos que descifrar un acertijo de código para poder entender lo que hace una porción de código.

```python
@shared_task
def email(opk):
    ed = cdfe(opk, tp)
    ste(**ed)
# ¿Qué hace el código? ¿Manda un email? ¿Lo almacena? ¿Lo filtra? ¿A qué se refiere cada variable?
```

La mayoría de los libros sobre programación que hay disponibles en el mercado se centran en enseñarte la sintaxis de un lenguaje de programación y algunas convenciones populares. Sin embargo la mayoría no profundizan demasiado en como organizar el código, como nombrar las variables o que partes del código deberían tener comentarios y cuales no, en determinar la cantidad correcta de argumentos que debe recibir una función, o el momento en el que se debe dividir un archivo en dos, etc. Existe un libro que responde a todos esos cuestionamientos.

## Pasamos más tiempo leyendo código que escribiéndolo

El autor del libro del que hablo, **Robert C. Martin**, afirma que los programadores pasan más tiempo leyendo código que escribiendo. Esto le debería darle una visión completamente nueva a la manera en la que decidimos escribir nuestro código, dado que tenemos la seguridad de que alguien lo leerá (incluso nosotros mismos en el futuro), y es ahora cuando nos preguntamos: ¿el objetivo que persiguen mis funciones es claro? ¿se entiende porque elegí cierto flujo de código en lugar de otro? ¿se entiende a que se refiere cada variable?

A través de sus páginas pretende enseñarnos a escribir código más limpio y sencillo de entender, con el respaldo de las experiencias del autor a lo largo de los años.

El libro nos adentra en la temática con historias de algunas **empresas que han tenido que cerrar sus puertas por culpa de código mal escrito**, sí, así de graves pueden llegar a ser las consecuencias de código ilegible. El resto de capítulos declarará una serie de recomendaciones para lograr que nuestro código sea más legible y fácil de mantener. El autor usa Java para desarrollar sus ejemplos.

## Un par de conceptos que cambiaron mi manera de ver el código

El libro contiene varios consejos que, en su momento, me parecieron bastante controversiales (otros aún lo hacen). Dado que el libro es algo extenso para resumirlo en una entrada te compartiré algunos de estos.

### Que tus nombres de clases, variables y funciones sean explicativos

Este concepto es bastante simple pero aún así es muy común ver código críptico y difícil de entender.

```python
# Codigo criptico en Python
import random

i=0
list = [x for x in range(1,57)]

while i<=52:
    a = random.sample(list, 6)
    print(a)
    i+=1
```

¿Sabes que hace el código de arriba? No a nivel matemático, sino que representa. ¿Qué tanto tiempo te tomo darte cuenta de que representaba un ejemplo burdo de un sorteo tipo lotería? ¿Podrías haber predicho que otro tipo de funciones necesitarías más adelante o que habría que corregir solo al mirar el código?

```python
# Codigo más declarativo en Python
import random

lottoDrawCounter = 0
lottoDrawsPerYear = 52
lottoNumbersToSelect = 6
lottoNumbers = [x for x in range(1,57)]

while lottoDrawCounter <= lottoDrawsPerYear:
    winningNumbers = random.sample(lottoNumbers, lottoNumbersToSelect)
    print(winningNumbers)
    lottoCounter+=1
```

Este ejemplo de código aporta mucha más información. Si leyeras el código de arriba probablemente te vendrían a la cabeza varias ideas sobre que podría salir mal o bien al ejecutar el código, así como ideas para modificarlo y mejorarlo. Si pensaste algo como "oye, pero puedo colocar esa información como comentarios en el código ¿no?" Bueno, eso me lleva al siguiente punto: según el autor, es mejor evitar los comentarios en el código tanto como se pueda.

### Los comentarios son un mal necesario

> El uso adecuado de los comentarios es para compensar nuestro fracaso al expresarnos en el código.
> 
> Robert C. Martin

El autor considera a los comentarios como algo que debe evitarse si es posible. Sí, yo sé que **en todos lados nos han metido por la cabeza que debemos comentar nuestro código** y quizás te parezca controversial que este autor considere que debes evitar escribir comentarios, como me lo pareció a mi al principio, sin embargo el autor sustenta bastante bien su punto.

Según Robert C. Martin, la razón es que el código debe ser explicativo por si mismo, sí necesitas comentarios es que **fallaste al escribir un código que hable por si mismo**.  
Mira el siguiente fragmento de código:

```python
# Revisa si el usuario es candidato para un descuento
if employee.status_confirmation and employee.days_since_registration()>365 and employee.owns_a_credit_card:
    process_order()
```

Ahora mira este:

```python
if employee.is_eligible_for_discount():
    process_order()
```

El comentario en el primer fragmento de código es totalmente innecesario, el nombre de la función puede reemplazarlo y se entiende perfectamente cual es el objetivo.

En ese mismo capítulo también nos habla del código redundante; ese código cuya única razón de existencia es satisfacer nuestra necesidad de comentar, por considerarlo correcto.

```python
# Esta función retorna True si el usuario es mayor de edad o False si es menor de edad
def is_user_older_than_eighteen():
    if self.age >= 18:
        return True
    else:
        return False
```

El código es bastante explicativo por si mismo, el comentario es totalmente innecesario. Si nos aseguramos de nombrar a nuestras variables, funciones, métodos y clases de la manera correcta los comentarios pasan a ser innecesarios en la mayoría de los casos.

¿Eso significa que nunca debo escribir comentarios? No, según el autor de Clean Code, hay casos **muy puntuales** en que es mejor tener un comentario que ninguno (como para advertir consecuencias, TODO, declarar intenciones) pero, desde el punto de vista del autor, son más bien excepciones a la regla.

### Mientras menos argumentos tenga una función, mejor

> El número ideal de argumentos para una función es cero. Después uno, seguido de cerca por dos. Tres argumentos deberían evitarse siempre que sea posible. Más de tres requiere una justificación muy especial...
> 
> Robert C. Martin

En el capítulo que habla de las funciones el autor enfatiza la necesidad de mantener los argumentos que una función recibe al mínimo, además considera que cualquier función que reciba más de tres argumentos **no debería ser usada**.

Desde el punto de vista del autor los argumentos te forzan a requerir más información de una función que su nombre, pues ahora debes entender como interaccionan las variables dentro de la lógica de la función, además son difíciles de incluir en las pruebas puesto que hay que probar diferentes combinaciones de estos para asegurarnos de cubrir cada caso de la función. Suena lógico ¿no? ¿entonces porque me pareció controversial este punto? Pues porque en libros, vídeos, repositorios e incluso en la documentación oficial de ciertas tecnologías uno puede ver numerosas funciones con dos, tres y hasta cuatro argumentos.

```python
# MAL Esta función no debería ser usada, el número de argumentos es demasiado alto
def is_planet_habitable(distance_to_the_sun, temperature, contains_water, presence_of_organic_compounds):
...
```

Ahora dime si te suena esta pieza de código que implementa un middleware simple de autenticación para el servidor de nodejs llamado express. Tres argumentos así sin más y uno de ellos es una función que a su vez recibe dos argumentos. Una violación total a las buenas prácticas según Robert C. Martin. A mi, sin embargo, no me parece tan grave ni tan difícil de leer este pequeño fragmento de código.

Siento que el autor de Clean Code peca de purista en este punto, pero esa es solo mi opinión.

```javascript
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
```

## Mi opinión y crítica de Clean Code

Si no has tenido ninguna aproximación con buenas prácticas de escritura de código te recomiendo darle una leída a este libro, puedes adquirir algunos consejos útiles que quizás no habrías considerado, incluso aunque no estés de acuerdo con todo su contenido (yo tampoco lo estoy).

Hay que aclarar que **este libro no es un manual que deba ser tomado como un reglamento inquebrantable**, sino que debes tomar los consejos que mejoren tu código y dejar de lado aquellos que consideres que traen más problemas que ventajas.

Existen varios aspectos que no me gustaron del libro; el primero, Java; el segundo, los códigos que se usan como ejemplo; el tercero, la fuerte influencia de la POO, ignorando por completo otros paradigmas de programación; cuarto, no estoy de acuerdo con la postura tan rígida que toma el autor.

Los principios SOLID, que propone el autor de Clean Code, no son un manual que debas seguir a rajatabla, hay muchos desarrolladores que no están de acuerdo con ellos y que proponen alternativas que lucen mucho más sensatas, como por ejemplo [CUPID](https://speakerdeck.com/tastapod/cupid-for-joyful-coding?slide=9) o los consejos que aparecen en A Philosophy of Software Design.

A pesar de lo anterior, si tienes la oportunidad de leerlo, hazlo y contrástalo con las opiniones de otros autores para que tengas un panorama más completo. El libro tiene una versión en español que puedes adquirir [aquí](https://www.amazon.com.mx/C%C3%B3digo-limpio-Clean-code-Craftsmanship/dp/8441532109/ref=pd_lpo_14_t_2/141-5823532-7483464?_encoding=UTF8&pd_rd_i=8441532109&pd_rd_r=b0bbd3b0-c868-4def-a158-0e58d9fe082c&pd_rd_w=D6y5i&pd_rd_wg=b5gZw&pf_rd_p=d1973811-db3d-413c-af1a-6a5a8b0eb47e&pf_rd_r=FNBZ7XXW8MSF0VFMAS1V&psc=1&refRID=FNBZ7XXW8MSF0VFMAS1V).

El otro día me compartieron en Twitter un [resumen de los conceptos de Clean Code con ejemplos en Javascript.](https://github.com/ryanmcdermott/clean-code-javascript)

**Conocimientos previos recomendados:** Cualquier lenguaje de programación**Recomendado para leerlo:** 7/10  
**Idiomas:** Español, Inglés
