---
title: "Is Code Commenting Wrong? Clean Code Review"
date: "2020-05-16"
categories:
- linux and devops

coverImage: "images/clean_code.jpg"
description: "In this review I will talk a bit about Clean Code, the book by Robert C. Martin that explains how to write code cleanly."
keywords:
- books
- reviews
- opinion
- best practices

authors:
- Eduardo Zepeda
---

There are two types of programmers, those who hate Clean Code and those who love it. This book sparks heated discussions on the internet; some consider it a bible, others consider it an outdated manual written by a self-proclaimed pedantic dictator on how to write code... And me? Well, to be honest a bit of both. This post is my humble review of the book Clean Code by Robert C. Martin, the **creator of the acronym SOLID.**.

Who hasn't looked at our code written years ago and wondered what the fuck we wanted to do there? Or we try to extend someone else's code and find that we first have to figure out a code puzzle in order to understand what a piece of code does.

```python
@shared_task
def email(opk):
    ed = cdfe(opk, tp)
    ste(**ed)
# ¿Qué hace el código? ¿Manda un email? ¿Lo almacena? ¿Lo filtra? ¿A qué se refiere cada variable?
```

Most programming books available on the market focus on teaching you the syntax of a programming language and some popular conventions. However, most of them do not go too much into how to organize the code, how to name variables or which parts of the code should have comments and which should not, how to determine the right amount of arguments a function should receive, or when to split a file in two, etc. There is a book that answers all these questions.

## We spend more time reading code than writing it.

The author of the book I am talking about, **Robert C. Martin**, states that programmers spend more time reading code than writing it. This should give a completely new vision to the way we decide to write our code, since we have the certainty that someone will read it (even ourselves in the future), and it is now when we ask ourselves: is the goal of my functions clear? is it understood why I chose a certain code flow instead of another? is it understood what each variable refers to?

Through its pages it aims to teach us how to write cleaner and easier to understand code, backed by the author's experiences over the years.

The book takes us into the subject with stories of some **companies that have had to close their doors because of poorly written code**, yes, that's how serious the consequences of unreadable code can be. The remaining chapters will state a series of recommendations to make our code more readable and maintainable. The author uses Java to develop his examples.

## A couple of concepts that changed the way I look at coding

The book contains several pieces of advice that, at the time, I found quite controversial (others still do). Since the book is a bit long to summarize in one post I will share some of these with you.

### Your class, variable and function names should be explanatory.

This concept is quite simple but it is still very common to see cryptic code that is difficult to understand.

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

Do you know what the code above does? Not on a mathematical level, but it represents. How long did it take you to realize that it represented a crude example of a lottery-type draw? Could you have predicted what other types of functions you would need later or what would need to be corrected just by looking at the code?

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

This code example provides much more information. If you read the code above you probably got several ideas in your head about what could go wrong or right when executing the code, as well as ideas for modifying and improving it. If you thought something like "hey, but I can put that information as comments in the code right?" well, that brings me to the next point: according to the author, it is best to avoid comments in the code as much as you can.

### Comments are a necessary evil

> The proper use of comments is to compensate for our failure to express ourselves in the code.
>
> Robert C. Martin

The author considers comments to be something to be avoided if possible. Yes, I know that **everywhere we have it drummed into our heads that we should comment on our code** and you may find it controversial that this author feels that you should avoid writing comments, as I did at first, however the author makes his point quite well.

According to Robert C. Martin, the reason is that the code should be self-explanatory, if you need comments you **failed to write code that speaks for itself**.
Look at the following code snippet:

```python
# Revisa si el usuario es candidato para un descuento
if employee.status_confirmation and employee.days_since_registration()>365 and employee.owns_a_credit_card:
    process_order()
```

Now look at this one:

```python
if employee.is_eligible_for_discount():
    process_order()
```

The comment in the first code fragment is totally unnecessary, the name of the function can replace it and it is perfectly understood what the objective is.

In the same chapter he also talks about the redundant code; that code whose only reason for existence is to satisfy our need to comment, because we consider it to be correct.

```python
# Esta función retorna True si el usuario es mayor de edad o False si es menor de edad
def is_user_older_than_eighteen():
    if self.age >= 18:
        return True
    else:
        return False
```

The code is quite self-explanatory, the commentary is totally unnecessary. If we make sure to name our variables, functions, methods and classes correctly, comments become unnecessary in most cases.

Does that mean I should never write comments? No, according to the author of Clean Code, there are **very specific** cases in which it is better to have a comment than none at all (as to warn consequences, EVERYTHING, state intentions) but, from the author's point of view, they are rather exceptions to the rule.

### The fewer arguments a function has, the better.

> The ideal number of arguments for a function is zero. Then one, followed closely by two. Three arguments should be avoided whenever possible. More than three requires a very special justification....
>
> Robert C. Martin

In the chapter that talks about functions, the author emphasizes the need to keep the arguments that a function receives to a minimum, and also considers that any function that receives more than three arguments **should not be used**.

From the author's point of view the arguments force you to require more information from a function than its name, because now you must understand how the variables interact within the logic of the function, they are also difficult to include in the tests since you have to try different combinations of these to make sure you cover each case of the function. Sounds logical doesn't it? so why did I find this point controversial? Well, because in books, videos, repositories and even in the official documentation of certain technologies one can see numerous functions with two, three and even four arguments.

```python
# MAL Esta función no debería ser usada, el número de argumentos es demasiado alto
def is_planet_habitable(distance_to_the_sun, temperature, contains_water, presence_of_organic_compounds):
...
```

Now tell me if you sound this piece of code that implements a simple middleware authentication for the nodejs server called express. Three arguments just like that and one of them is a function that in turn receives two arguments. A total violation of best practices according to Robert C. Martin. To me, however, it doesn't seem so serious or so difficult to read this little piece of code.

I feel that the author of Clean Code errs on the side of purism on this point, but that's just my opinion.

```javascript
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
```

## My opinion and review of Clean Code

If you haven't had any approach with good code writing practices I recommend you give this book a read, you may acquire some useful tips that you might not have considered, even if you don't agree with all its contents (I don't either).

It should be made clear that **this book is not a manual that should be taken as an unbreakable rulebook**, but that you should take the advice that improves your code and leave aside those that you consider bring more problems than advantages.

There are several aspects of the book that I did not like; first, Java; second, the codes used as examples; third, the strong influence of OOP, completely ignoring other programming paradigms; fourth, I do not agree with the rigid position taken by the author.

The SOLID principles, proposed by the author of Clean Code, are not a manual that you must follow to the letter, there are many developers who do not agree with them and who propose alternatives that look much more sensible, such as [CUPID](https://speakerdeck.com/tastapod/cupid-for-joyful-coding?slide=9) or the advice given in A Philosophy of Software Design.

Notwithstanding the above, if you have the opportunity to read it, do so and contrast it with the opinions of other authors to get a more complete picture. The book has a Spanish version that you can purchase on Amazon.

The other day a [summary of Clean Code concepts with examples in Javascript](https://github.com/ryanmcdermott/clean-code-javascript) was shared with me on Twitter.

**Recommended prior knowledge:** Any programming language**Recommended to read:** 7/10
**Languages:** English, Spanish