---
title: "Destructuring lists in JavaScript"
date: "2019-11-03"
categories:
- "javascript"

coverImage: "images/desestructuracion_de_listas.jpg"
description: "Learn and understand perfectly the destructuring of lists in javascript. In this post I explain the topic with examples."
keywords:
- javascript

authors:
- Eduardo Zepeda
---

In the previous post I explained a bit about the topic of [object destructuring in javascript](/en/destructuring-variables-in-javascript/). In addition to object destructuring, JavaScript also allows you to destructure lists. In this post I will talk about list destructuring in JavaScript.

Let's imagine that we have a list with numerical values.

```javascript
const scientificData = [15.222, 1.723, 1.313, 4.555, 2.333, 1.990]
```

The contents of the list are just numbers, they tell us absolutely nothing. These values could be coefficients, temperature measurements, lengths of some part or some gradient of concentrations of a solution; we have no way of knowing. We might be tempted to process the information by accessing the indices of each value in the list, but this would detract from the readability of the code.

```javascript
if(scientificData[0] > limitValueMouse){
   repeatSample()
}
if(scientificData[1] > limitValueFly){
   repeatSample()
}
```

In the above code fragment, if any of the conditions exceeds a certain size, we repeat the sampling. But we don't know what sampling you are talking about because we have no context, we only have the index of the list.

If we were the ones who obtained the information we could be more descriptive with the code for those who read it in the future. For this reason we decided to assign a variable to each index in our list.

```javascript
const lengthMouse = scientificData[0]
const lengthFly = scientificData[1]
```

However, if our list increases in size we will be repeating the same structure over and over again. We can save some code in the following way:

```javascript
const [mouseLength, flyLength] = scientificData
```

Using this method we assign the first and the second value of the list to the _mouseLength_ and _flyLength_ variables, respectively.

```javascript
if(mouseLength > limitValueMouse){
   repeatMouseSample()
}
if(flyLength > limitValueFly){
   repeatFlySample()
}
```

Now the code is much more descriptive and your colleagues, not as enlightened as you, will be able to understand it.

But hey, nice and all, but what if my objects have other nested objects and I want to get a value from them. Well we can also [destructure nested objects](/en/destructuring-nested-objects-in-javascript/), in the I will briefly explain how to do it.