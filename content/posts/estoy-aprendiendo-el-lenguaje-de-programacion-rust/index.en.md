---
date: '2024-10-16T19:15:56-06:00'
title: 'What makes Rust so difficult to learn?'
categories:
- rust
- opinions
coverImage: "images/learning-rust-programming-language.jpg"
description: 'Rust can be difficult to learn due to a number of concepts that are not present in other programming languages, let me talk to you about some of them'
keyword: 'rust difficult'
keywords:
- 'rust'
authors:
- 'Eduardo Zepeda'
---

I started learning Rust, and everything I read on networks about its learning curve is true. Rust is difficult, not impossible, just difficult. But now I also **understand also why the obsession with this programming language**. After finishing Rust's book I have an overview of the programming language that I will capture in the following paragraphs. 

If you already know what makes Rust so difficult and you're looking to learn it, skip to the final part of this post where I recommend some resources.

## Rust concepts that are not in other languages

Rust requires you to master a number of concepts that don't exist in other programming languages, which makes the exercise of learning Rust a bit more complex than extrapolating the syntax of other languages to it, just as you would do if you wanted to learn [the Go programming language]({{< ref path="/posts/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}), for example.

This is because [Rust was created by Graydon Hoare after an incident with an elevator](https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/) caused by poor memory management in its code.

![Rust was created by Graydon Hoare after a problem with an elevator](https://i.imgflip.com/972mo7.jpg "Rust was created by Royden Lepp after a problem with an elevator")

### Borrowing in Rust is difficult

The goal of the creator of Rust was to disappear all the heap memory management errors that you probably already know about, for this Rust takes care that there can only be one variable that *owns* one value, this possession can be transferred from one variable to another by borrowing but at all times there is only one owner.

I found this video helpful to learn borrowing:

{{< youtube id="4RZzjXmXcKg" >}}

### Understanding the Lifetimes in Rust is difficult

This concept is used to manually tell the compiler the duration (lifetime) of a variable, in cases where the compiler cannot infer it automatically. Once you understand them, lifetimes are simple in practice but they can reduce the readability of the code, especially if you have never seen them before. 
 
![How it feels when you first read about lifetimes](https://i.imgflip.com/972opz.jpg "How it feels when you first read about lifetimes")

You don't need to understand exactly what they do, the important thing here is that you appreciate how their use can make code quite unreadable and complicated to understand at a glance.

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
Rust has a number of smart pointers to handle memory references in case you need to access a variable from many other places (I have previously written, [about Mutex but in Go]({{< ref path="/posts/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="en" >}})). 


![When you learn Rust for the first time it feels like this](https://i.imgflip.com/972oco.jpg)

Sounds simple but, again, things get complicated when it comes time to express it in code and be able to differentiate the use of each and what problem they solve. 

I didn't understand their differences nor their uses the first time I read them, and I could realize that I wasn't the only one, stackoverflow and Reddit are full of questions about these smart pointers.

``` rust
let value = Rc::new(RefCell::new(5));
```

While researching about the topic I found this video, and I understood them perfectly after watching it.

{{< youtube id="CTTiaOo4cbY" >}}

Also check this simple [summary of Box, Arc, Rc, RefCell and Mutex.](https://whiztal.io/rust-tips-rc-box-arc-cell-refcell-mutex/)

### Frequent use of Macros in Rust can be daunting

A macro, in Rust, is simply a piece of code that generates other Rust code during compilation.

Macros are not a new concept or unique to Rust. However, if you're used to other programming languages, you're probably confused by the idea of having a fancy decorator, with brackets containing a function call, all with a hashtag at the beginning. 

In addition to the above, it is quite common to see macros in other people's code, so it can be difficult to understand if it is your first contact with the language, it happened to me.


``` rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}
```

### Closures' syntax in Rust is difficult.

If you come from languages like Javascript, you are probably familiar with closures (as in the [debounce pattern]({{< ref path="/posts/debounce-y-throttle-en-javascript/index.md" lang="en" >}})), well in Rust they also exist, but the first time I saw one, I was confused by its syntax, using pipes to receive the arguments and with the word move, which transfers the property of all the variables it contains to the closure.

``` rust
std::thread::spawn(move || {
    println!("captured {data:?} by value")
}).join().unwrap();
```

The good thing is that it is only a matter of getting used to the syntax.

### Result and Option types

Rust does not have Try and Catch, but the handling of errors and null values must be done explicitly, for this Rust uses Result and Option.

Its use is quite straight forward, but it may confuse you if it is your first time dealing with it.

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

## Rust is not so hard to learn

So far, it seems that I am complaining about the design traits of the language, but no, I am only exposing the parts with which I had a little more friction, but, taking into account how wide is the language, you will be able to realize that it is really a minimum part.

## Where to learn Rust?

Rust is not exaggeratedly difficult, there are languages that are more complicated or require a complete paradigm shift to program in them, like Haskell, for example. 

But I won't deny that learning Rust is more complicated than learning Go, or learning Python, I even dare to say that it is more complicated to learn it than C, on the other hand it is easier to write bad code in C than in Rust.

Lastly, here are some resources you can use to learn Rust.

### The Rust Book in multiple languages

Rust has its own bible, called ["The Rust book", available in multiple languages](https://doc.rust-lang.org/book/appendix-06-translation.html), [Spanish included](https://github.com/RustLangES/rust-book-es). The book is very well explained and very easy to follow, it is a bit long, although it is understandable given the large amount of concepts to be exposed.

### Youtube channels to learn Rust

I also found that the videos of [Code to the Moon](https://www.youtube.com/@codetothemoon), are quite easy to understand and the author of the channel explains very well the concepts of Rust.

The channel [Let's get Rusty](https://www.youtube.com/@letsgetrusty) also has some tutorials that will help you understand the concepts better.

### Rustlings
Rustlings contains a [series of exercises to learn and practice Rust](https://github.com/rust-lang/rustlings) while reading the Rust book.

