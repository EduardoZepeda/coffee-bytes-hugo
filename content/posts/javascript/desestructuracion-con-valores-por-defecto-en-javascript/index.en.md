---
aliases:
- /en/destructuring-with-default-values-in-javascript/
authors:
- Eduardo Zepeda
categories:
- javascript
coverImage: images/desestructuracion_con_valores_por_defecto.jpg
date: '2019-12-01'
description: Do you want to know how to understand how to perform destructuring an
  object with default values in javascript from scratch? In this post I explain how.
keywords:
- javascript
title: Destructuring with default values in Javascript
---

In the previous post I briefly discussed the topic of [destructuring with nested objects in javascript](/en/javascript/destructuring-nested-objects-in-javascript/) . In this post I am going to talk a bit about how we can specify default values when destructuring an object in javascript.

To do this we will create a fairly simple object:

```javascript
const user = {
  userIsLoggedIn: true, 
  email: "email@example.org",
  accountType: "premium" 
}
```

This object could be the response to an API request. From the previous object we could destructure three properties, _userIsLoggedIn_, _email_ and _accountType_.

```javascript
const { userIsLoggedIn, email, accountType } = user
```

But, what would happen if there is a change in the API and now it no longer returns the _accountType_ property, this would be enough for all the part of the frontend that depends on the presence of that variable to have errors.

```javascript
if(accountType==='Admin'){
  showAdvancedMenu()
}
if(accountType==='basic'){
  showBasicMenu()
}
```

Well, to avoid this we can assign a default value when the destructuring does not find the property that we want to destructure. If you are following this example remember to clean the javascript terminal and re-declare the main object or you will get an error.

{{<ad>}}

## Assigning a default value when destructuring an object in Javascript

This time let's declare the user object without the _accountType_ property:

```javascript
const user = {
  userIsLoggedIn: true, 
  email: "email@example.org"
}
```

Well, if we try to destructure the object and assign a default value if the appropriate property is not found we will do it in the following way:

```javascript
const { userIsLoggedIn, email, accountType="basic" } = user
accountType
"basic"
```

The _accountType_ constant returns 'basic', a property that the original object lacked, but will now have a default value if omitted. This allows us to keep the frontend without major changes to a modified HTTP response and to handle the absence of some property in an object.

I know that sometimes this topic can be quite difficult, I also had a hard time understanding it the first time, the destructuring makes the already confusing Javascript code much more readable. If you still find Javascript confusing I leave you a post where I talk about what I consider the [best book to learn Javascript](/en/javascript/the-best-book-for-learning-modern-javascript/) at intermediate level.