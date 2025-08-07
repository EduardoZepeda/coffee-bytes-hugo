---
aliases:
- /en/debounce-and-throttle-in-javascript/
- /en/limit-the-execution-of-functions-in-js-with-debounce-and-throttle/
- /en/javascript/limit-the-execution-of-functions-in-js-with-debounce-and-throttle/
authors:
- Eduardo Zepeda
categories:
- javascript
coverImage: images/BounceYThrottleJavascript.jpg
coverImageCredits: 'Image credits to i7 from Pixiv: https://www.pixiv.net/en/users/54726558'
date: '2022-03-23'
description: Interactive And Visual Explanation of the debounce and throttle design patterns, used to limit the
 execution of functions, javascript example.
keyword: debounce vs throttle
keywords:
- javascript
- design patterns
- throttling
- debounce
title: Debounce and Throttle Interactive Explanation
---

Let's do a Debounce vs Throttle. Debounce and throttle are [design patterns]({{< ref path="/posts/python/patrones-de-diseno-en-python-resena-de-practical-python-design-patterns/index.md" lang="en" >}}) used to limit the execution of functions, generally they are used to restrict the amount of times an event is fired: click, scroll, resize or other events. This patterns are not exclusive to Javascript and can be used in any language or can be used as high level abstractions; in a previous post I explained how to use throttle to [limit the number of requests received by the nginx server](/en/software-architecture/throttling-on-nginx/).

Both patterns generate a function that receives a callback and a timeout or delay.

## Debounce vs Throttle interactive explanation

Let's use an interactive example to see the differences between Debounce and Throttle. Think of a virtual farm, where each time you press a key, an animal is added to the pen. We have two pens, one that works with Debounce and the other with Throttle.

If you type in the text box, you'll see how each pen behaves.

{{<debounceVsThrottle>}}

## Debounce vs Throttle differences

If you're in a rush  ~~or just lazy~~, these are the main differences and applications for both patterns. However, if you want a deeper understanding of both keep reading.

| **Aspect**              | **Debounce**                                                                              | **Throttle**                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Definition**          | Executes the function after a specified delay from the last time the event was triggered. | Executes the function at regular intervals, ensuring it is called no more than once per period. |
| **Timing of Execution** | Delayed until the event stops firing for a certain period.                                | Executes immediately or at fixed intervals, regardless of how frequently the event occurs.      |
| **Use Case Example**    | Search input field: updating suggestions only after the user stops typing for a moment.   | Scroll events: limiting the rate at which a scroll position is calculated.                      |


## Debounce Pattern 

The debounce pattern postpones the execution of a function until a certain waiting time has elapsed.

Further attempts to execute the function will cancel the pending execution and restart the timeout.

{{< figure src="images/Bounce-design-pattern-programming.png" class="md-local-image" alt="Simplified debounce pattern schematic" >}}

### Debounce pattern explanation

The code for debounce in javascript looks like this:

```javascript
const debounce = (callback, waitTimeInMs) => {
  let timeout 
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(()=> callback(...args), waitTimeInMs)
  }
}
```

Our debounce function returns a function, which will receive any number of arguments (...args).

This function uses a closure to access the variable timeout. What is timeout? timeout is a _setTimeout_ function, which schedules the execution of our callback for later execution.

But now pay attention to the clearTimeout. Every time we call the debounce function it will clear any scheduled function, so the only way for our callback to run is to wait for the time we passed as an argument.

{{<ad>}}

## Throttling pattern

The throttling pattern sets a waiting time during which no more functions can be called again. Unlike the bounce pattern, the timeout is not reset if we try to call the function again.

{{< figure src="images/throttling-eng.jpg" class="md-local-image" alt="Simplified diagram of the throttling pattern" >}}

### Explanation of throttling pattern

The code for throttling in javascript looks like this.

```javascript
const throttling = (callback, delay) => {
  let timeout
  return (...args) => {
    if (timeout !== undefined) {
      return
    }

    timeout = setTimeout(() => {
      timeout = undefined
    }, delay)

    return callback(...args)
  }
}
```

The throttling function returns a function that will have two sides depending on the timeout status:

* timeout is defined: this means that a function is already scheduled for execution, in this case the function does nothing, i.e. it blocks the execution of new functions by means of an empty return.
* timeout is not defined: if timeout is not defined, we create a _setTimeout_ and assign it to the _timeout_ variable. This function, once its execution time has elapsed, will remove itself from the _timeout_ variable. Subsequently, and to finish, we execute the callback function.

## Other resources on debounce and throttling

* [Debounce and throttling in Typescript](https://charliesbot.dev/blog/debounce-and-throttle)
* [Debounce y throttling applied to the DOM](https://webdesign.tutsplus.com/es/tutorials/javascript-debounce-and-throttle--cms-36783)