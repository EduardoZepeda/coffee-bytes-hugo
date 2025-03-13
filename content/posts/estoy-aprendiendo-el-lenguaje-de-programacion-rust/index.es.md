---
date: '2024-10-16T19:15:53-06:00'
title: '¿Qué hace al lenguaje Rust tan difícil de aprender?'
categories:
- rust
- opiniones
coverImage: "images/learning-rust-programming-language.jpg"
description: 'Rust suele ser difícil de aprender debido a una serie de conceptos que no están presentes en otros lenguajes de programación, te explico cuales son'
keyword: 'rust es difícil'
keywords:
- 'rust'
authors:
- 'Eduardo Zepeda'
---

Empecé a aprender Rust, y todo lo que leí en redes sobre su curva de aprendizaje es verdad. Rust es difícil, no imposible, solo difícil. Pero ahora **también entiendo también porque la obsesión con este lenguaje de programación**. Tras haber terminado el libro de Rust tengo una visión general del lenguaje de programación que plasmaré en los siguientes párrafos. 

Si ya sabes que hace complicado a Rust tan difícil y lo que estás buscando es aprenderlo, pasa a la parte final de este post donde te recomiendo algunos recursos.

## Conceptos de Rust que no están en otros lenguajes

Rust requiere que domines una serie de conceptos que no existen en otros lenguajes de programación, lo cual vuelve el ejercicio de aprender Rust un poco más complejo que extrapolar la sintaxis de otros lenguajes a este, tal como harías si quisieras aprender [el lenguaje de programación Go]({{< ref path="/posts/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="es" >}}), por ejemplo. Por esta misma razón, no recomiendo que Rust sea tu primer lenguaje de programación.

La razón de la complejidad de Rust radica en un escenario exótico. [Rust fue creado por Graydon Hoare tras un incidente con un ascensor averiado.](https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/) ¿La causa? Un pobre manejo de memoria, probablemente causado por código C o C++.

![Rust fue creado por Graydon Hoare tras un problema con un elevador](https://i.imgflip.com/972mo7.jpg "Rust fue creado por Royden Lepp tras un problema con un elevador")

### El Borrowing en Rust es difícil

El objetivo del creador de Rust era desaparecer todos los errores de manejo de memoria en el heap que seguramente ya conoces, para esto Rust se encarga de que solo pueda haber una variable que *posea* un valor, esta posesión puede transferirse de una variable a otra por medio del borrowing pero en todo momento hay un único dueño.

Yo encontré este video sobre borrowing particularmente útil:

{{< youtube id="4RZzjXmXcKg" >}}

### Entender los Lifetimes en Rust es difícil

Este concepto sirve para indicarle manualmente al compilador la duración (el tiempo de vida) de una variable, en casos donde este no pueda inferirla automáticamente. Una vez que los entiendes, los lifetimes simple en práctica pero pueden reducir la legibilidad del código, sobre todo si nunca los has visto.

![Como se siente cuando lees sobre lifetimes la primera vez en Rust](https://i.imgflip.com/972opz.jpg "Como se siente cuando lees sobre lifetimes la primera vez en Rust")

No es necesario que entiendas exactamente que hace, lo importante aquí es que aprecies como su uso puede volver el código bastante ilegible y complicado de entender a simple vista.

``` rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { 
    if x.len() > y.len() {
        x 
    } else {
        y 
    }
}
```

La buena noticia es que, para mi alivio, no parecer ser una característica que se tenga que poner en práctica frecuentemente.

### Entender cuando usar los Múltiples Punteros inteligentes Box, RefCell, Cell, Arc, Mutex, en Rust es difícil

Rust cuenta con una serie de punteros inteligentes para manejar las referencias a la memoria en el caso de que necesites acceder a una variable desde muchos otros lados (Anteriormente he escrito, [sobre Mutex pero en Go]({{< ref path="/posts/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="es" >}})). 

![Cuando aprendes Rust por primera vez se siente así](https://i.imgflip.com/972oco.jpg)

Suena simple pero, nuevamente, las cosas se complican cuando llega el momento de expresarlo en código y poder diferenciar el uso de cada uno y que problema resuelven. 

Yo no entendía sus diferencias ni sus usos la primera vez que los leí, y pude darme cuenta de que no era el único, stackoverflow y Reddit están llenos de preguntas sobre estos punteros inteligentes.

``` rust
let value = Rc::new(RefCell::new(5));
```

Mientras investigaba sobre el tema encontré este vídeo, y los entendí perfectamente después de verlo.

{{< youtube id="CTTiaOo4cbY" >}}

O checa este [resumen de Box, Arc, Rc, RefCell y Mutex.](https://whiztal.io/rust-tips-rc-box-arc-cell-refcell-mutex/)

### El uso frecuente de los Macros en Rust puede ser intimidante

Una macro, en Rust, es simplemente un fragmento de código que genera otro código de Rust durante la compilación.

Las macros no son concepto nuevo o exclusivo de Rust. Sin embargo, si estás acostumbrado a otros lenguajes de programación, probablemente te confunda la idea de tener un decorador extravagante, con brackets que contienen una llamada a una función y todo esto con un hashtag al principio. 

Aunado a lo anterior, es bastante común ver macros en el código de otras personas, por lo que puede dificultar la comprensión si es tu primer contacto con el lenguaje, a mi me pasó.


``` rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}
```

### La sintaxis de los Closures en Rust es difícil

Si vienes de lenguajes como Javascript, probablemente estés familiarizado con los closures (como en el [patrón debounce]({{< ref path="/posts/debounce-y-throttle-en-javascript/index.md" lang="es" >}})), bien en Rust también existen, pero la primera vez que vi uno, me confundió su sintaxis, usando los pipes para recibir a los argumentos y con la palabra move, que transfiere la propiedad de todas las variables que contiene al closure. 

``` rust
std::thread::spawn(move || {
    println!("captured {data:?} by value")
}).join().unwrap();
```

Lo bueno es que solo es cuestión de acostumbrarse a la sintaxis.

### El manejo de Errores y null values en Rust es complejo

Rust no cuenta con *Try* y *Catch*, sino que el manejo de errores y de valores nulos debe hacerse de manera explícita, parecido a como se hace en Go, para esto Rust echa mano de *Result*, *Option*, *unwrap* y *?*

#### Option

*Option* es un enum, este representa un valor (*Some*) o la ausencia de este (*None*).

```rust
let x: Option<i32> = Some(13);
let y: Option<i32> = None;
```

#### Result

*Result*, otro enum, este representa una operación exitosa (*Ok*) o fracasada (*Err*).

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

#### Expect

*expect* un método que retorna el valor, ya sea *Option* o *Result* entra en pánico ~~(como tú)~~ si hay un error o un *None*.

```rust
let x = Some(5).expect("Value not found");
```

#### ? operator

El operador *?*  propagada el error en un tipo *Result*, retorna el error si existe o *desenvuelve* el valor que contiene *Ok*.

```rust
fn read_file() -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string("file.txt")?;
    Ok(content)
}
```

Encontré este recurso que explica [el manejo de errores en Rust](https://www.sheshbabu.com/posts/rust-error-handling/) de una manera accesible y sencilla, leelo detenidamente.

### Combinar traits, impl y generics en Rust es difícil

Los traits piensa en ellos como [interfaces, (de las cuales ya te hable en mi post sobre el polimorfismo en Go)]({{< ref path="/posts/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="es" >}}), mezclados con generics, pueden llegar ser difíciles de comprender.

En el ejemplo de abajo usamos un generic en un struct, para indicarle que grade puede ser cualquier tipo, y en la implentación nos aseguramos que este genérico satisfaga al trait Display, para que pueda ser impreso.

``` rust
// Taken from rustlings exercises, see the final part of this post
// Display is a trait here
use std::fmt::Display;

// Grade can be anything as long as ...
struct Report<T> {
    grade: T,
    student_name: String,
    student_age: u8,
}

// it satisfies the display Trait
impl<T: Display> Report<T> {
    fn print(&self) -> String {
        format!(
            "student: {} ({}) - achieved a grade of {}",
            &self.student_name, &self.student_age, &self.grade,
        )
    }
}
```

## ¿Dónde aprender Rust?

Para finalizar este post, te comparto algunos recursos que puedes usar para aprender Rust, pero considera que dominar Rust no es una tarea de un fin de semana.

### The Rust Book en múltiples idiomas

Rust cuenta con su propia biblia, llamada ["The Rust book", disponible en múltiples idiomas](https://doc.rust-lang.org/book/appendix-06-translation.html), [español incluido](https://github.com/RustLangES/rust-book-es). El libro está muy bien explicado y es muy fácil de seguir, eso sí, es un poco largo, aunque es entendible dada la gran cantidad de conceptos a exponer.

### Educative

Si leer un libro grueso no es tu estilo y prefieres una educación de primera, educative tiene [the ultimate guide to rust programming](https://www.educative.io/courses/ultimate-guide-to-rust-programming?aff=xkQr#?) por menos del precio de una comida bien servida.

### Canales de youtube para aprender Rust

También encontré que los videos de [Code to the Moon (en inglés)](https://www.youtube.com/@codetothemoon), son bastante sencillos de entender y el autor del canal explica muy bien los conceptos de Rust.

El canal [Let's get Rusty (en inglés)](https://www.youtube.com/@letsgetrusty) también tiene algunos tutoriales que te ayudarán a entender mejor los conceptos.

### Rustlings

Rustlings contiene una [serie de ejercicios para aprender y praticar Rust](https://github.com/rust-lang/rustlings) a la par que se lee la biblia de Rusto.

{{<ad>}}

![La recompensa que te ofrece Rustling al terminar todos los ejercicios, cangrejo en pixel art](https://res.cloudinary.com/dwrscezd2/image/upload/v1729807555/Rustling-success_vgyva3.png "La recompensa que te ofrece Rustling al terminar todos los ejercicios, cangrejo en pixel art")

## Rust no es tan difícil de aprender

Rust no es exageradamente difícil, hay lenguajes más complicados o que requieren un completo cambio de paradigma para programar en ellos, como Haskell, por ejemplo. 

### Rust es elegante pero hay otros lenguajes más simples

Ciertamente Rust es uno de los lenguajes más elegantes que hay, sin embargo a veces se prefiere la productividad y la comodidad a la belleza y la elegancia, incluso grandes [empresas como Typescript prefirieron usar Go en lugar de Rust para su compilador](https://github.com/microsoft/typescript-go/discussions/411#?). Tienes que hacerte la misma pregunta independientemente del resultado, Rust puede ser el lenguaje que necesitas o tal vez no, cualquiera de las dos respuestas está perfectamente bien.

Pero no negaré que aprender Rust es más complicado que aprender Go, o aprender Python, incluso me atrevo a decir que es más complicado aprenderlo que C, por otro lado es más fácil escribir mal código en C que en Rust.

Hasta ahora, pareciera que estoy quejándome de las decisiones tomadas al diseñar este lenguaje, pero no, solo estoy exponiendo las partes con las que tuve un poco más de fricción, pero, tomando en cuenta lo amplio que es el lenguaje, podrás darte cuenta que realmente es una mínima parte.

La mayor parte de la sintaxis de Rust es bastante sencilla, y algunas de las cosas con las que tienes que lidiar, te ahorran los dolores de cabeza de tener que depurar fugas de memoria o punteros nulos, lo cual es un intercambio interesante.