---
title: "Destructuring of nested objects in Javascript"
date: "2019-11-16"
categories:
- "javascript"

coverImage: "images/desestructuracion_de_objetos_anidadis.jpg"
description: "Destructuring nested objects in javascript? In this post I discuss the topic of destructuring nested objects with examples."
keywords:
- javascript

authors:
- Eduardo Zepeda
url: "/en/destructuring-of-nested-objects/"
---

In the previous posts I briefly explained how to perform a [destructuring of objects in Javascript](/en/destructuring-lists-in-javascript/), but in most cases we will not be lucky enough to work with flat objects, but we will find nested objects with several levels of depth. Will we have to settle for forgetting about this feature and do the job explicitly assigning a constant to each object? Luckily Javascript allows us to work with the destructuring of nested objects.

Let's create an example object to test.

```javascript
const user = {
  userIsLoggedIn: true, 
  data: {
    email: "email@example.org", 
    name:"Isabel", 
    lastName:"Allende", 
    location:{
      state: "Lima", 
      country: "Peru", 
      postalCode: "15048"
    }
  }
}
```

Let's first get the _userIsLoggedIn_ property

```javascript
const { userIsLoggedIn } = user
userIsLoggedIn
true
```

But what if we now want to assign the state property? To achieve this, let's first think about the structure of the object. Our object has three levels; in the first one, there are userIsLoggedIn and data; in the second one, email, name, lastName and location; in the third level, the properties state, country and postalCode. It is in this last level where is the property that we are trying to destructure.

```javascript
const user = {
  userIsLoggedIn: true, 
  data: {
    email: "email@example.org", 
    name:"Isabel", 
    lastName:"Allende", 
    location:{
      state: "Lima", 
      country: "Peru", 
      postalCode: "15048"
    }
  }
}
```

The first level is _data_, so we will place a colon ":" there and continue descending to the desired level. Let's leave the rest pending by assigning a "_{...}"_. **If you are following this example, do not press ENTER until the end.

```javascript
const {data:{...}}
```

The second level leading to our _state_ property is _location_. So we extend our previous assignment:

```javascript
const {data:{location:{...}}}
```

Our property _state_ is at the third level, so we do not have to go down any further, we simply place the constant below.

```javascript
const {data: {location:{state}}}=user
state
"Lima"
```

Now you can hit ENTER, when you access the _state_ constant, you will see that it refers to the _state_ property, nested in the object.

## Accessing more than one property

The previous example was not so complicated, but what if instead of a single property we want to destructure the value of _userIsLoggedIn_, _email_ and _state_.

To do the above it would be enough to locate in which level are the properties that we want to destructure and include them in the appropriate level in our passed code statement:

```javascript
const {userIsLoggedIn, data: {email, location:{state}}}=user
userIsLoggedIn
true
email
"email@example.org"
state
"Lima"
```

In the next post I will talk about how to [assign default values when destructuring objects](/en/destructuring-with-default-values-in-javascript/).