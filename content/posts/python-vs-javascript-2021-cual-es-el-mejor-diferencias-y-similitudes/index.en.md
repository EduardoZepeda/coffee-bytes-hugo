---
title: "Python vs Javascript which one is better?"
date: "2020-12-10"
url: "python-vs-javascript-which-is-the-best-programming-language"
categories:
- "javascript"
- "python"

coverImage: "images/PythonVSJavascript.jpg"
description: "Learn the differences between Python and Javascript, two of the most popular languages. Syntax, speed, packages, frameworks available."
keywords:
- "python"
- "javascript"
- "opinion"

authors:
- Eduardo Zepeda

---

If you've used only Python or only Javascript, you're probably a little curious to know what the other one looks like. I've used both and I can tell you a bit about the differences and some things in common that both languages have, so you can find the best one for you in 2023.

I also have a comparison of [Python vs go](/python-vs-go-which-is-the-best-programming-language/) that you can check out.

## A little about them

To begin with, **Python is an interpreted language**. If you are not familiar with the term, it means that it has an interpreter that translates the instructions, one by one, to machine language, so that they are executed on the fly. So you don't have to compile all your code every time you want to run it, as you would with C++, Java, Rust, etc.

Javascript was born as an interpreted language, however modern engines have managed to turn it into a **JIT (Just in Time) compiled language**. Virtually all browsers do [JIT compiled](https://www.youtube.com/watch?v=d7KHAVaX_Rs) JavaScript, except, as always, IE8.

If you want to learn how the Javascript engine works at a deeper level, I leave you a link to [a series of videos](https://www.youtube.com/watch?v=No-Pfboplxo&amp;list=PLfeFnTZNTVDNnF4a8eVooiubYAPUSP01C&amp;index=1) on youtube where the topic is discussed in more detail.

Look at this super-simplified schematic comparing compiled and interpreted languages.

Super simplified diagram of the differences between compiled and interpreted code](images/codigo-compilado-vs-interpretado.png "Differences between an interpreted and a compiled language").

In this scheme I am referring to Javascript at the time of its creation, as an interpreted language, not to the **JIT compilation** I was telling you about.

## Seniority

Python appeared in the late 1980s, while Javascript appeared in the early 1990s, so **Python is older** than Javascript.

## Typed

Regarding typing, it is a very complex issue where I have not found a **clear and uniform consensus** on what is considered strong typing and what weak typing. However experts tend to say that strongly typed languages do not allow changes to data types once declared, while weakly typed ones do.

Here are a couple of examples for your consideration

### Javascript Typing

First let's see what happens if we try to change a type in Javascript.

```javascript
//javascript
let numeroEnTexto = "1"
numeroEnTexto = 1 // no pasa nada
const numero = 1 
numero = "2"
Uncaught TypeError: Assignment to constant variable.
```

In addition to const, Javascript allows to declare a variable, let or var. If instead of using const we would have used var or let the error would not occur.

But now look what happens if we add an integer and a string.

```javascript
//javascript
console.log(1 + "1")
"11"
```

No problem! The Javascript interpreter adds them together without any problem, even if one is a string and the other an integer. If you are one of those who prefer to use strong typing with javascript, either because you bring a background of C++, Java or another strongly typed language or simply prefer the advantages of strong typing, take a look at what [Typescript](https://www.typescriptlang.org/) and its compiler have to offer.

```javascript
// Este es código Typescript
// Observa como cada tipo de variable requiere su correspondiente tipo de dato
let idUser: number | string;
const months: Array<string> = ["Enero", "Febrero"]
```

### Typing in Python

Python does not necessarily require you to specify the type of variable. See what happens if we try to change the type of a variable in Python.

```python
# Python
numero = "1"
numero = 1
numero = [1]
numero = {1:1} # no hubo error en ningún caso
```

And what happens if we now try to add two variables of different types as we did in Javascript?

```python
# Python
print(1 + "1")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

As you can see, Python does not allow you to perform implicit transformations of
one type of variable to another.

```python
def titleToNumber(columnTitle: str) -> int:
    # ...
```

#### Python Typing

What about Typescript for Python? Well, it is already included, Python incorporates optional typing, starting with version 3.5, typing can be used by some linters to show you errors in the code, however the interpreter does not force its use. Check the [official documentation](https://docs.python.org/3/library/typing.html) to learn how to use them.

## Syntax

### Javascript syntax

The syntax of **Javascript is quite similar to that of C++ and other classical programming languages. Separation between parts of the code is done by braces and semicolons**. Javascript uses _this_ as a reference to the object itself and they are not required when declaring methods on objects.

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

### Python syntax

On the other hand, **Python favors readability, the use of special characters is reduced to a minimum and separation for parts of the code is done by indentation and line breaks**. Python uses _self_ to refer to the object itself and requires that it be passed as the first argument to each method of the object.

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

The syntax differences are much more extensive than the ones I expose here, each one has its own functions, its own integrated libraries and a different syntax, but I hope you have at least appreciated the small differences between the two.

## Support

### Javascript support

Javascript is found in all browsers natively, just open the terminal of your favorite browser to start using it. It is the preferred language for manipulating the DOM.

Below you can see the javascript terminal of the Firefox web browser

![web browser terminal running javascript](images/ConsoleJavascript.gif)

You can also use node to run it on your computer.

![Nodejs terminal on GNU/Linux running javascript](images/ConsoleDeNodeJs.gif)

### Python support

Python is not found in browsers, however it is installed in most GNU/Linux systems by default, if you use a GNU/Linux distribution and open the terminal of your operating system and run the Python command it is most likely already installed.

![Python terminal on GNU/Linux](images/PythonConsole.gif)

## Uses

### Uses of Javascript

Javascript is used, as I mentioned earlier, to manipulate the DOM and run primarily in the browser. However Node allows it to be used on your computer as well, to be used as a server-side language, although it was not originally conceived that way. Node js has allowed javascript to be used outside the browser, so its use has been extended, even to machine learning.

In recent years there are rumors that [deno](https://deno.land/), made by the creator of Node js, will replace node, its predecessor, but they are just that, rumors.

### Python Uses

Python is a multipurpose language, it allows you to create native UI applications, program networks or web servers, artificial intelligence, web application development, pretty much anything.

## Popularity

Javascript started out much more popular than Python, probably due to the rise of web browsers. However, somewhere around 2017, Python gained relevance compared to JavaScript and the trend continues until the end of 2022.

![Google trends graph comparing Python vs Javascript](images/Python-vs-Javascript-since-2004.png "Python gains relevance vs Javascript in Google trends")

### Popularity among developers in 2022

Stackoverflow shows in its surveys that, among developers, Python is much more popular than Javascript. However, Typescript (the strongly typed JavaScript super set I mentioned earlier) is slightly more popular than Python.

StackOverflow survey results for languages most liked by developers. Python ranks above Javascript](images/love-vs-dreaded-python-javascript.png "Python surpasses Javascript in popularity in 2023").

## Python and Javascript salaries in 2022

According to Stackoverflow's latest survey (2022), professionals using Python are slightly better paid than those using JavaScript. However, the difference is not that significant. Typescript also ranks above Javascript.

![Developer salaries according to programming language used](images/salaries-python-vs-javascript.png "Python overtakes Javascript in salaries in 2023")

## Batteries included

Python is characterized for being a language with batteries included, that is to say, it already includes by default many functionalities that you only have to import to start using them, do you want to work with networks? import the socket module, do you want to create a GUI? use tkinter, manipulate audio? use audioop. Python includes libraries for most common needs. It even includes numpy, a powerful library for numerical analysis.

On the other hand, Javascript includes only what is necessary, although it has a gigantic community of users creating packages and making them available to anyone who wants to take them.

## Speed

As interpreted languages they are much slower than compiled languages, so they will be quite bad if you compare them with C, C++, Java, Rust, etc. However, the difference between them is evident: it can be stated that **Javascript executed in Node is much faster than Python with its original interpreter.

The graph below compares the average execution time of ten iterations of the N-Rheinas problem (the lower the better), I used the [respective javascript and python codes of Sean P. Gallivan](https://dev.to/seanpgallivan/solution-n-queens-5hdb#javascript-code) (all credits to the author) and the [multitime program](https://tratt.net/laurie/src/multitime/) for the calculation of the average time.

Graph of the execution time of the N-Reigns problem between Javascript and Python. Javascript has better performance](images/problem-of-the-n-queens.jpg "Performance of the n-queens problem. Execution time on Y-axis and number of queens on X-axis.(Less is better, javascript is better).")

Node.js v15.10.0 and Python 3.8.6 were used. The code was executed directly from the terminal, without any other program running. If you want to know the specs of the computer you can write me to my social networks and I'll be glad to let you know.

Although it is quite obvious that this is not a methodology with adequate scientific rigor, it is nevertheless useful as a rough comparison.

## Asynchronism capability

### Asynchronism in Javascript

Asynchronous javascript functions are executed in a separate thread and return to the main thread when completed.

```javascript
async function(){
    await downloadData()}
```

### Asynchronism in Python

In Python asynchronous functions run in a single thread and only switch to another corrutine when an asynchronous operation is encountered.

From Python 3.5 onwards, asynchronism is incorporated using the same syntax as async and await

```python
from tortoise import Tortoise, run_async
from database.connectToDatabase import connectToDatabase

async def main():
    await connectToDatabase()
    await Tortoise.generate_schemas()

if __name__ == '__main__':
    run_async(main())
```

## Web Frameworks for web development

Javascript and Python have plenty of frameworks to choose from when it comes to web development.

### Frameworks for Javascript

There are many **Javascript frameworks for web development for both backend and frontend**; for the backend, express, nustjs, meteor, sails; for the frontend, vue, react, svelte, angular.

![Web development frameworks for Javascript](images/javascript-frameworks.jpg)

Even despite the abundance of options, new JavaScript frameworks are released more frequently than for Python.

### Frameworks for Python

Because Python is not installed in browsers, **current web development using Python is mainly focused on the Backend part**, where we have quite mature solutions like [Django, with its advantages and disadvantages](/why-should-you-use-django-framework/), or Flask and some more modern ones like the very fast [FastAPI web development framework](/python-fastapi-the-best-framework-for-python/), about which I wrote a post before.

![Python web development frameworks](images/python-frameworks.jpg)

You can write HTML and CSS code using Python for the frontend, but you will never have the same versatility as running javascript code directly in the user's browser.

Update: I learned about a library that is gaining popularity, called htmx, that allows you to generate modern apps by returning html instead of JSON responses. Go to my post on [django and htmx](/django-and-htmx-web-apps-modern-apps-without-writing-js/) to learn more.

## Packages

Both the Python and Javascript communities have libraries available that solve most of the common programming problems.

### Javascript Packages

Javascript uses npm for package management and there are quite a few to choose from. In June 2019 npm [surpassed 1 million packages released](https://snyk.io/blog/npm-passes-the-1-millionth-package-milestone-what-can-we-learn/). Lots and lots of variety to choose from! Although you also run into things like this:

![NPM is-odd package](images/IsOddPackageNpm-1.png "The package to find out if a number is odd has almost half a million downloads")

![Meme of the rapper using the is-odd package instead of the module operator](images/meme-is-odd-js.jpg "Meme of the rapper making fun of the number of downloads")

### Python packages

Pypi is the main platform in charge of Python package management. At the time this article was updated [Pypi has 348,000 packages published](https://pypi.org/), only a fifth of the amount that Javascript has! And since there are fewer packages we can expect more relevant packages, can't we? Let's see...

![pip is-odd package](images/IsOddPythonPackage.png "Python also has a package that checks if a number is odd.")

## To conclude

I hope this small comparison has shown you a little bit of the differences between both languages and if you are thinking of focusing on one of them you will have more information on the table to make the right decision.

If you need to start developing websites now, without complications, I would go for Javascript.

If you want to get into machine learning and data analysis, or you want a more comprehensive solution on websites and more flexibility, I would go for Python.

Either way you don't have to reduce everything to a dichotomy, if you have time to dedicate to both you can do it, many web developers master multiple languages and use them interchangeably according to their needs.