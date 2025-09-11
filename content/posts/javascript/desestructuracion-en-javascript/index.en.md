---
aliases:
- /en/destructuring-variables-in-javascript/
authors:
- Eduardo Zepeda
categories:
- javascript
coverImage: images/Desestructuracion_objetos_javascript.jpg
date: '2019-10-16'
description: In this post I am going to try to explain in a simple way the destructuring
  of objects in javascript. Destructuring is a process that, despite what is believed,
  is actually quite simple and can improve code readability quite a bit.
keywords:
- javascript
title: Destructuring variables in javascript
---

For those like me, whose first language was not fortunate (or unfortunate) enough to be javascript, destructuring can take on esoteric overtones. In this post I will try to explain in a simple way the destructuring of objects in javascript. Destructuring is a process that, contrary to popular belief, is actually quite simple and, moreover, can improve code readability.

If you want to start learning Javascript from scratch I recommend the [book Eloquent Javascript](/en/javascript/the-best-book-for-learning-modern-javascript/), here I recommend what I consider the best book to start.

Destructuring an object would mean converting the properties of a javascript object or list into variables or constants so that they can be more easily accessed. Let's start with a fairly simple object.

No, I'm not going to use the classic example of person, book or dog; let's use the example of account data characteristics.

Suppose we have stored an object that represents the data of a user account:

```javascript
const userData = {isLoggedIn: True, profile: "Admin", email: "email@example.org"}
```

The above object has the isLoggedIn, profile and email properties. If we wanted to access the values, either to show some content conditionally we would have to do the following:

```javascript
if(userData.isLoggedIn && userData.profile==='Admin'){
  redirectToDashboard()
}else{
  redirectToUserAccount()
}
```

In the previous code snippet, every time we access to some property of the object we will have to write the name of the _userData_ object. But what if we assign the object's properties to other constants?

```javascript
const isLoggedIn = userData.isLoggedIn
const profile = userData.profile
const email = userData.email
```

{{<ad0>}}

Now we can access the constants individually without referring to the object. But, aren't we repeating userData in each assignment?

## Destructuring of an object in javascript

To destructure the object of the previous example, we can use the following syntax:

```javascript
const userData = {isLoggedIn: True, profile: "Admin", email: "email@example.org"}
const {isLoggedIn, profile, email} = userData
```

Now instead of getting the values directly from the object we can get them from the constants and the code becomes easier to read.

```javascript
if(isLoggedIn && profile==='Admin'){
  redirectToDashboard()
}else{
  redirectToUserAccount()
}
```

In addition to destructuring objects, JavaScript also allows you to destructure lists. Enter my entry on [destructuring lists in Javascri](/en/javascript/destructuring-lists-in-javascript/) to learn how to destructure lists in Javascript.

{{<ad1>}}