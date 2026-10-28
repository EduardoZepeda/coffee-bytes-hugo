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
seo_title: Why Rust is so difficult to learn? My Opinion
description: Rust's difficulty comes from unique concepts like ownership and borrow checker.
  Let's explore what makes it different and how to master it.
keyword: rust is difficult
keywords:
- rust
title: What makes Rust so difficult to learn?
---

Rust is difficult, but not impossible. After working through [The Rust Book](https://doc.rust-lang.org/book/), I understand why so many developers are drawn to it.

If you already know why it's hard and want learning resources, skip to the end. I wouldn't recommend Rust as a first language - it's easier to learn if you already know another language, especially [Go]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}).

[Rust was created by Graydon Hoare](https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/) after an elevator incident caused by poor memory management, likely in C or C++.

{{< figure src="https://i.imgflip.com/972mo7.jpg" class="md-local-image" alt="Rust was created by Graydon Hoare after a problem with an elevator" caption="Rust was created by Graydon Hoare after a problem with an elevator" >}}

## Concepts that make Rust hard

### Ownership and borrowing

Rust's main goal is to eliminate common memory errors. It enforces a strict ownership model: each value has one owner. Ownership can be transferred (moved) or borrowed, but only one owner exists at a time. This makes memory leaks much harder to create.

{{< youtube id="4RZzjXmXcKg" >}}

### Lifetimes

Lifetimes tell the compiler how long references are valid when it can't infer them. Once understood, they're manageable, but they can make code harder to read at first.

{{< figure src="https://i.imgflip.com/972opz.jpg" class="md-local-image" alt="How it feels when you first read about lifetimes" caption="How it feels when you first read about lifetimes" >}}

You don't need to write them often, but you'll see them in function signatures:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { 
    if x.len() > y.len() {
        x 
    } else {
        y 
    }
}
```

### Smart pointers (Box, RefCell, Cell, Arc, Mutex, Rc)

Rust has multiple smart pointers for heap allocation and shared access. Knowing when to use each - and how they differ - takes time. [Mutexes]({{< ref path="/posts/go/go-condiciones-de-carrera-en-goroutines-y-mutex/index.md" lang="en" >}}) in particular are common in this space.

{{< figure src="https://i.imgflip.com/972oco.jpg" class="md-local-image" alt="When you learn Rust for the first time it feels like this" >}}

```rust
let value = Rc::new(RefCell::new(5));
```

Resources that helped:
- [Understanding smart pointers in Rust](https://whiztal.io/rust-tips-rc-box-arc-cell-refcell-mutex/)
- {{< youtube id="CTTiaOo4cbY" >}}

``` rust
let value = Rc::new(RefCell::new(5));
```

Tip: While researching about smart pointers I found this video, and I understood them perfectly after watching it.

{{< youtube id="CTTiaOo4cbY" >}}

Also check this simple [summary of Box, Arc, Rc, RefCell and Mutex.](https://whiztal.io/rust-tips-rc-box-arc-cell-refcell-mutex/)

### Macros

Macros generate Rust code at compile time. They're common in Rust, but can be hard to read if you're not used to `#[derive(...)]` or macro invocations with `!`.

```rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}
```

### Closures

Rust closures look different from JavaScript. They use `|...|` for parameters and often need `move` to transfer ownership.

```rust
std::thread::spawn(move || {
    println!("captured {data:?} by value")
}).join().unwrap();
```

It takes a bit of getting used to, but the syntax becomes familiar quickly.

### Error handling

Rust doesn't use `try/catch`. Errors and missing values are handled explicitly with `Option` and `Result`.

[This guide](https://www.sheshbabu.com/posts/rust-error-handling/) explains it well.

#### Option
Represents a value (`Some`) or absence (`None`):

```rust
let x: Option<i32> = Some(13);
let y: Option<i32> = None;
```

#### Result
Represents success (`Ok`) or failure (`Err`):

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

#### expect
Returns the value or panics with a message:

```rust
let x = Some(5).expect("Value not found");
```

#### The `?` operator
Propagates errors automatically:

{{<adsPanels>}}

{{<ad0>}}

```rust
fn read_file() -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string("file.txt")?;
    Ok(content)
}
```

### Traits, impl, and generics

Combining [traits]({{< ref path="/posts/go/go-structs-herencia-polimorfismo-y-encapsulacion/index.md" lang="en" >}}) (similar to interfaces) with generics can get complex. Here's an example from Rustlings:

```rust
use std::fmt::Display;

struct HogwartsReportCard<T> {
    grade: T,
    student_name: String,
    student_age: u8,
}

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

{{<ad1>}}

## Where to learn Rust

This isn't a weekend task. Here are solid resources:

### Books and guides

- [The Rust Book](https://doc.rust-lang.org/book/) - The official guide, available in [many languages](https://doc.rust-lang.org/book/appendix-06-translation.html) including [Spanish](https://github.com/RustLangES/rust-book-es)
- [Easy Rust](https://dhghomon.github.io/easy_rust/) - Great if you already know a low-level language
- [Comprehensive Rust](https://google.github.io/comprehensive-rust/) - From Google, covers Rust in depth
- [Educative: Ultimate Guide to Rust Programming](https://www.educative.io/courses/ultimate-guide-to-rust-programming?aff=xkQr) - Paid but concise

### Videos

- [Code to the Moon](https://www.youtube.com/@codetothemoon) - Clear explanations of Rust concepts
- [Let's Get Rusty](https://www.youtube.com/@letsgetrusty) - Good tutorials and walkthroughs

### Practice

- [Rustlings](https://github.com/rust-lang/rustlings) - Small exercises to practice while reading the book

{{<ad2>}}

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1729807555/Rustling-success_vgyva3.png" class="md-local-image" alt="Rustling's reward after finishing all exercises" caption="Rustling's reward after finishing all exercises"  width="626" height="618" >}}

{{<ad3>}}

## Recommended learning path

- **New to programming**: Start with [The Rust Book](https://doc.rust-lang.org/book/)
- **Know a low-level language (C/C++)**: Try [Easy Rust](https://dhghomon.github.io/easy_rust/) or [Comprehensive Rust](https://google.github.io/comprehensive-rust/)
- **Coming from JavaScript/Python**: Use Comprehensive Rust or Easy Rust, and supplement with the YouTube channels above

## Final thoughts

Rust isn't the hardest language out there - Haskell is a bigger paradigm shift. It's harder than Go or Python, and arguably harder than C to learn, but much easier to write safe code in than C.

Rust is elegant, but productivity sometimes matters more. [The TypeScript team chose Go over Rust for the TypeScript compiler](https://github.com/microsoft/typescript-go/discussions/411#?), which says a lot about tradeoffs. 

The hard parts (ownership, borrowing, lifetimes) are a small fraction of the language. Once past them, most Rust syntax is straightforward. In exchange, you avoid many memory leaks and null pointer issues. For the right projects, that tradeoff is worth it.