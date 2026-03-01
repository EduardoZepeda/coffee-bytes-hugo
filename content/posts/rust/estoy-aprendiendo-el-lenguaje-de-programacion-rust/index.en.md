---
aliases:
- /en/what-makes-rust-so-difficult-to-learn/
authors:
- Eduardo Zepeda
categories:
- rust
- opinion
coverImage: images/learning-rust-programming-language.jpg
date: '2024-10-16T19:15:56-06:00'
description: Is Rust difficult to learn? Rust can be difficult to learn due to a number
  of concepts that are not present in other programming languages, let's review them
keyword: rust is difficult
keywords:
- rust
title: What makes Rust so difficult to learn?
---

I started learning Rust, and everything I read on the internet about its learning curve is true. Rust is difficult, not impossible, just difficult. But now I also **understand why the obsession with this programming language**. After finishing Rust's book I had a glimpse of the programming language that I will try to accurately capture in the following paragraphs. 

If you already know what makes Rust so difficult and you're looking to learn it instead, skip to the final part of this post where I recommend some useful resources to learn Rust.

## Rust concepts that are not in other languages

Rust requires you to master a number of concepts that don't exist in other programming languages, which makes the exercise of learning Rust a bit more complex than extrapolating the syntax of other languages to it, just as you would do if you wanted to learn [the Go programming language]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}), for example, for that same reason I don't recommend that you learn Rust as your first language.

The reason behind Rust's complexity lies on an exotic scenario. [Rust was created by Graydon Hoare after an incident with an out of order elevator](https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/), the reason? poor memory management in its code, probably from C or C++.

{{< figure src="https://i.imgflip.com/972mo7.jpg" class="md-local-image" alt="Rust was created by Graydon Hoare after a problem with an elevator" caption="Rust was created by Royden Lepp after a problem with an elevator" >}}

### Borrowing in Rust is difficult

The goal of the creator of Rust was to disappear all the heap memory management errors that you probably already know about, for this Rust makes sure that there can only be one variable that *owns* one value, this possession can be transferred from one variable to another by borrowing but at all times there can only be one owner ~~to rule them all~~. This approach makes complicated, but not impossible, to create memory leaks.

Tip: When I was reading about this I found this video helpful to learn borrowing:

{{< youtube id="4RZzjXmXcKg" >}}

### Understanding the Lifetimes in Rust is difficult

I haven't read about this concept elsewhere, Lifetimes are used to manually tell the compiler the duration (lifetime) of a variable, in cases where the compiler cannot infer it automatically. Once you grasp the concept, lifetimes are simple in practice but they can reduce the readability of the code, especially if you have never seen them before. 
 
{{< figure src="https://i.imgflip.com/972opz.jpg" class="md-local-image" alt="How it feels when you first read about lifetimes" caption="How it feels when you first read about lifetimes" >}}

You don't need to understand exactly what the extra annotations do, the important thing here is that you appreciate how their use can make code quite unreadable and complicated to understand at a glance.

``` rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { 
    if x.len() > y.len() {
        x 
    } else {
        y 
    }
}
```

The good news is that, to my relief, it doesn't seem to be a feature that you have to implement frequently.

### Understanding when to use the multiple smart pointers Box, RefCell, Cell, Arc, Mutex, in Rust is difficult.

Rust has a number of smart pointers to handle memory references in case you need to allocate memory in the heap or access a variable from multiple places (I have previously written, [about Mutex but in Go]({{< ref path="/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="en" >}})). 


{{< figure src="https://i.imgflip.com/972oco.jpg" class="md-local-image" alt="When you learn Rust for the first time it feels like this" >}}

Sounds simple but, again, things get complicated when it comes time to write the code and be able to differentiate the use of each and what problem they solve. 

I didn't understand their differences nor their uses the first time I read them, but after a quick search I realized that I wasn't the only ~~fool~~ one, stackoverflow and Reddit are full of questions about these smart pointers.

``` rust
let value = Rc::new(RefCell::new(5));
```

Tip: While researching about smart pointers I found this video, and I understood them perfectly after watching it.

{{< youtube id="CTTiaOo4cbY" >}}

Also check this simple [summary of Box, Arc, Rc, RefCell and Mutex.](https://whiztal.io/rust-tips-rc-box-arc-cell-refcell-mutex/)

### Frequent use of Macros in Rust can be daunting

A macro, in Rust, is simply a piece of code that generates other Rust code during compilation.

Macros are not a new concept or unique to Rust. However, if you're used to the lack of macros in other programming languages, you're probably confused by the idea of having a fancy decorator, with brackets containing a function call, all with a hashtag at the beginning. 

In addition to the above, it is quite common to see macros in other people's code, which can be daunting the first time you're reading Rust code.


``` rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}
```

### Closures' syntax in Rust is difficult.

If you come from languages like Javascript, you are probably familiar with closures (as in the [debounce pattern]({{< ref path="/posts/javascript/debounce-y-throttle-en-javascript/index.md" lang="en" >}})), well in Rust they also exist, but the first time I saw one, I was confused by its syntax, using pipes to receive the arguments and with the word move, which transfers the property of all the variables it contains to the closure. Why not use the same syntax that functions use?

``` rust
std::thread::spawn(move || {
    println!("captured {data:?} by value")
}).join().unwrap();
```

The good thing is that it is only a matter of getting used to the syntax.

### Error handling in rust is complex

Rust does not have *Try* and *Catch*, but the handling of errors and null values must be done explicitly, and it's not as painless as in Javascript or Python, for this Rust uses *Result*, *Option*, *Unwrap*, *Expect* and *?*

I found this resource that explains [Rust's Error handling](https://www.sheshbabu.com/posts/rust-error-handling/) in an understandable and simple way.

#### Option

*Option* is an enum that represents either a value (*Some*) or the absence of a value (*None*).

```rust
let x: Option<i32> = Some(13);
let y: Option<i32> = None;
```

#### Result

*Result* is an enum that represents either success (*Ok*) or failure (*Err*).

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

*expect* is a method that either returns the value inside *Option* or *Result* or panics with a custom message if there's an error or *None*.


```rust
let x = Some(5).expect("Value not found");
```

#### ? operator

{{<ad0>}}

The *?* operator propagates errors in a *Result* type, returning the error if it exists or unwrapping the *Ok* value.

```rust
fn read_file() -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string("file.txt")?;
    Ok(content)
}
```

### Combining traits, impl and generics in Rust is tricky.

Traits, think of them as [interfaces, (which I already told you about in my post about Go's polymorphism)]({{< ref path="/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="en" >}}), mixed with generics, can add complexity to the code.
In the example below we use a generic on a struct, to tell it that grade can be any type, and in the implementation we make sure that this generic Type satisfies the Display trait, so that it can be printed.

``` rust
// Taken from rustlings exercises, see the final part of this post
// Display is a trait here
use std::fmt::Display;

// Grade can be anything as long as ...
struct HogwartsReportCard<T> {
    grade: T,
    student_name: String,
    student_age: u8,
}

// it satisfies the display Trait
impl<T: Display> HogwartsReportCard<T> {
    fn print(&self) -> String {
        format!(
            "Hogwarts' student: {} ({}) - achieved a grade of {}",
            &self.student_name, &self.student_age, &self.grade,
        )
    }
}
```

{{<ad1>}}

## Where to learn Rust?

Lastly, here are some resources you can use to learn Rust, but please consider that this is not a weekend's task.

### The Rust Book in multiple languages

Rust has its own bible, called ["The Rust book", available in multiple languages](https://doc.rust-lang.org/book/appendix-06-translation.html), [Spanish included](https://github.com/RustLangES/rust-book-es). The book is surprisingly well explained and very Foolproof, although it is a bit long, but it is understandable given the large amount of concepts to be exposed.

{{<ad2>}}

### Educative

If reading a thick book is not your style and you prefer premium education, educative has some [the ultimate guide to rust programming](https://www.educative.io/courses/ultimate-guide-to-rust-programming?aff=xkQr) for less than the price a well served meal.

### Youtube channels to learn Rust

I also found that the videos of [Code to the Moon](https://www.youtube.com/@codetothemoon), are quite easy to understand and the author of the channel explains very well the concepts of Rust.

The channel [Let's get Rusty](https://www.youtube.com/@letsgetrusty) also has some tutorials that will help you understand the concepts better.

### Rustlings

{{<ad3>}}

Rustlings contains a [series of exercises to learn and practice Rust](https://github.com/rust-lang/rustlings#?) while reading the Rust book.


When you finish all Rustling's exercises you receive this amazing prize.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1729807555/Rustling-success_vgyva3.png" class="md-local-image" alt="Rustling's reward after finishing all exercises" caption="Rustling's reward after finishing all exercises"  width="626" height="618" >}}

## Rust is not so hard to learn

Rust is not exaggeratedly difficult, there are languages that are more complicated or require a complete paradigm shift to program in them, like Haskell, for example. 

But I won't deny that learning Rust is more complicated than learning Go, or learning Python, I even dare to say that it is more complicated to learn than C, on the other hand it is easier to write bad code in C than in Rust.

### Rust is elegant but other languages are simpler

Certainly Rust is one of the most elegant languages out there, however sometimes productivity and convenience are preferred over beauty and elegance, even big [companies like Typescript preferred Go over Rust for its compiler](https://github.com/microsoft/typescript-go/discussions/411#?). You have to ask yourself the same question regardless of the result, Rust can be the language you need or maybe not, either answer is perfectly fine.

So far, it seems that I am complaining about the design traits of the language, but no, I am only exposing the parts that challenged me the most, but, taking into account how big is the language, you will be able to realize that was really a minimum part.

Most of Rust's syntax is pretty straightforward, and some of the things you have to deal with, save you the headaches of having to debug memory leaks or null pointers, which is an interesting tradeoff.