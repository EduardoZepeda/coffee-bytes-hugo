---
authors:
- Eduardo Zepeda
categories:
- javascript
- opinions
coverImage: images/javascript-dates-and-html-input.jpg
date: '2024-03-20'
description: Dates management in javascript sucks, also its relation with the HTML datetime-local input is counterintuitive and incoherent and only denotes Javascript's faults as a language
keywords:
- javascript
- opinions
- react
- html
- go
title: Why I abhor HTML's datetime-local input and dates management in Javascript?
---


Working with Javascript is frustrating and, sometimes, combining it with HTML can be desperate due to its lack of internal coherence. On top of that, using it to handle dates, which requires considering the handling of timezones, different ways to represent them and the required sensitivity: seconds, minutes, milliseconds, etc. makes it a torture.

## Javascript handles dates in a strange way

Javascript uses months starting from index 0 and days from index 1, two objects with the same date are unequal when compared with === (yes, I know that what is compared are the objects and not the dates), but it is just the fact that it is not intuitive, the language user is not interested in the objects in memory itself, but what they represent. Languages like [Python has better abstractions than those handled by Javascript](/en/python-vs-javascript-which-is-the-best-programming-language/)

![](images/date-javascript.webp)

## The disconnection between HTML and JS

In the case of scheduling an event with a date and time, it is tempting to use the native datetime-local input already provided by HTML. However, this field by default requires a date in "YYYYY-MM-DDThh:mm" format, while javascript returns the dates in a Date object, which you must transform to ISO 6801 "YYYYY-MM-DDThh:mm.iiiZ", where the "i" is microseconds (or to another format with a function of its own).

![](images/two-dates-javascript.png)

To perform this transformation, the most obvious way is to remove the letter "Z", but if you try to assign that date to the datetime-input input, it will allow the user to select the milliseconds, which really has little application for most users. The correct thing to do would be to slice from the beginning, making a slice from position 0 to the sensitivity we need. 

Well, after this the datetime-local input will work and show the date, the problem now is that after validating your HTML field and probably before saving those dates in some storage media (postgres, redis, etc.), you will want to make modifications, so you will have to convert them back to a Date object in javascript in case you want to manage them, which again implies another conversion.

![](images/formatting-dates-in-javascript.jpg)

But what if we use a library to handle those changes? 

## The js libraries for time handling don't solve anything.

I have nothing against using Moment or react-datetimepicker, Dayjs, etc. In fact I think their developers perform a very worthy task: simplifying Javascript's poor date handling (if any contributor reads this, thanks). 

Those libraries exist, because Javascript did a lousy job in designing its standard library. Libraries are convenient to use but, in an ideal world, they should not exist.

It may seem insignificant to you to add one more library, but it's not the weight that's the problem, it's the fact that a library for something as common as date handling is so necessary, plus it adds unnecessary weight to your bundle and an extra dependency to manage.

The fact that these libraries are popular only highlights the shortcomings of JavaScript as a language. 

And yes, I know what you're thinking. Although I really like [the Go programming language](/en/go-programming-language-introduction-to-variables-and-data-types/), I'm also able to recognize their shortcomings and areas for improvement.

![](images/date_formatting_golang.webp)