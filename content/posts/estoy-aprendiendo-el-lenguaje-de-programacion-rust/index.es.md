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

Rust requiere que domines una serie de conceptos que no existen en otros lenguajes de programación, lo cual vuelve el ejercicio de aprender Rust un poco más complejo que extrapolar la sintaxis de otros lenguajes a este, tal como harías si quisieras aprender [el lenguaje de programación Go]({{< ref path="/posts/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="es" >}}), por ejemplo.

Lo anterior es debido a que [Rust fue creado por Graydon Hoare con el propósito de lidiar con los problemas de manejo de memoria](https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/) tras un incidente con un elevador descompuesto.

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

### Los tipos Result y Option

Rust no cuenta con Try y Catch, sino que el manejo de errores y de valores nulos debe hacerse de manera explícita, parecido a como se hace en Go, para esto Rust echa mano de Result y Option.

Su uso es bastante transparente, pero puede confundirte si es tu primera vez.

``` rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

let result = divide(2.0, 3.0);

match result {
    Some(x) => println!("Result: {x}"),
    None    => println!("Cannot divide by 0"),
}
```

## Rust no es tan difícil de aprender

Hasta ahora, pareciera que estoy quejándome de las decisiones tomadas al diseñar este lenguaje, pero no, solo estoy exponiendo las partes con las que tuve un poco más de fricción, pero, tomando en cuenta lo amplio que es el lenguaje, podrás darte cuenta que realmente es una mínima parte.

## ¿Dónde aprender Rust?

Rust no es exageradamente difícil, hay lenguajes más complicados o que requieren un completo cambio de paradigma para programar en ellos, como Haskell, por ejemplo. 

Pero no negaré que aprender Rust es más complicado que aprender Go, o aprender Python, incluso me atrevo a decir que es más complicado aprenderlo que C, por otro lado es más fácil escribir mal código en C que en Rust.

Para finalizar este post, te comparto algunos recursos que puedes usar para aprender Rust.

### The Rust Book en múltiples idiomas

Rust cuenta con su propia biblia, llamada ["The Rust book", disponible en múltiples idiomas](https://doc.rust-lang.org/book/appendix-06-translation.html), [español incluido](https://github.com/RustLangES/rust-book-es). El libro está muy bien explicado y es muy fácil de seguir, eso sí, es un poco largo, aunque es entendible dada la gran cantidad de conceptos a exponer.

### Canales de youtube para aprender Rust

También encontré que los videos de [Code to the Moon (en inglés)](https://www.youtube.com/@codetothemoon), son bastante sencillos de entender y el autor del canal explica muy bien los conceptos de Rust.

El canal [Let's get Rusty (en inglés)](https://www.youtube.com/@letsgetrusty) también tiene algunos tutoriales que te ayudarán a entender mejor los conceptos.

### Rustlings

Rustlings contiene una [serie de ejercicios para aprender y praticar Rust](https://github.com/rust-lang/rustlings) a la par que se lee la biblia de Rusto.