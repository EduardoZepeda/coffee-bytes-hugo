---
title: "The Big O notation"
date: "2019-08-15"
categories:
- linux and devops

coverImage: "images/BigO_notacion.jpg"
description: "I explain what Big O notation is all about so you can improve the efficiency of your algorithms in your applications."
keywords:
- bigo
- performance
- algorithms

authors:
- Eduardo Zepeda
---

I love astrophysics and try to keep up with new discoveries as they happen; whether they are trivial things, like the discovery of a new planet; or significant, like the hypothetical Dyson spheres they swear they find every month. But the discovery this time was fantastic.

Last April 2019, the [first photograph of a black hole](https://www.bbc.com/mundo/noticias-47880446) was published.

The above photograph required 5 petabytes of data, which is 5000 terabytes of data (roughly equivalent to 5000 hard disks of one terabyte capacity). Here the scientists were faced with a major dilemma, what method to use to send so much information?

What would happen if they tried to send that information over the Internet? The time it takes to send information over the Internet increases with the amount of information to be sent, the more information the longer the transmission time.

Doing a simple calculation, with a download speed of 50 MB/s it would take approximately 1157 days. That's too long!

What if they sent the information in physical form? Well, this would take at most the amount of hours of the longest flight which is 19 hours approximately, discounting the time it takes to copy the information to a physical medium (a hard disk), which I dare say would consume less than 1157 days.

What would have happened if instead of 5 petabytes it had been 5 GB of data? The answer would have been obvious; send the information over the Internet. However, it will take the same amount of time for the airplane to transport any amount of data, be it 1 MB, 1 GB or 1 PB; 19 hours.

In this case, time is constant. You know what they decided? That's right, the scientists opted to ship the hard disks by plane.

| Internet (at 50 MB/s) | Airplane                    |
| --------------------- | --------------------------- | ----------- |
| 1 GB                  | 20 seconds                  | 19 hours    |
|                       | 10 GB                       | 200 seconds | 19 hours | 1TB (1000 GB)    | 200 seconds              | 19 hours             | 1TB (1000 GB) |
| 1 TB (1000 GB)        | 20,000 seconds (5 hours)    | 19 hours    | 19 hours | 50 TB (50000 GB) | 20,000 seconds (5 hours) | 19 hours             | 20 hours      | 20 hours |
| 50 TB (50000 GB)      | 1000000 seconds (277 hours) | 19 hours    |          | 19 hours         | 5 PB (5000000 GB)        | 20 seconds (5 hours) | 19 hours      | 19 hours | 19 hours | 19 hours | 19 hours |

With internet speed close to the current limits, using the internet to transmit data is better the smaller the amount of information. Whereas physically transporting hard disks is better for huge amounts of data. This is because **airplane transport time is constant**, while **Internet data transmission time is linear**; it increases with the amount of data.

## What does this have to do with the code?

The same thing happens with code, every process we perform on the data to transform it consumes time and there are different ways of processing data, there are algorithms whose execution time is constant, for others it increases linearly with the amount of data they process, while others exponentially. On the other hand, some offer better performance with little data, while others shine when processing a lot of information.

Sometimes when we have no idea about algorithms we ask ourselves, what does it matter if our code runs in 0.0001 seconds or 0.001 seconds, for practical purposes it is the same thing, isn't it? Spending time choosing the right algorithm can seem trivial for such small values and if we add to that the vertiginous processing speed of modern equipment we fall into the error of not giving the right importance to algorithms.

But now let's ask ourselves, what will happen when the number of users increases to 1000, to 10 000, to 10 000 000, that's when milliseconds can turn into hours or days, and then we get a glimpse of the real importance of choosing an algorithm with adequate performance.

## Notation big O

To evaluate this performance, a notation called Big O is used. It tells us how the execution time of an algorithm will behave as a function of its input.

The longer the length of the input data, the longer it will take to go through and process it, but by how much does this time increase? A constant time is not the same as a time that increases in direct proportion or exponential proportion.

Certainly an algorithm that increases in exponential proportion will not be a nice thing to deal with when we have to go through huge amounts of data. To know how our algorithm behaves we need to analyze it and there are certain rules to consider in the big O notation.

## Steps add up

We will start with a simple function that, as you may have guessed, **will take longer to execute the larger the size of the array** we pass as an argument.

```python
def printArray(array):
    for element in array: # un paso que llamaremos n
        print(element)
```

This function will pass through the array only once. Since it has only **one step**, i.e. 'n', we say that its execution time is O(n).

## Constants are discarded

Now look at this code, it has two steps that process the same array of values.

```python
def printArrayDoubled(Array):
    for element in Array: # primer paso
        print(element)
    for element in Array: # segundo paso
        print(element*2)
```

In the above example we would be tempted to say that our function would have an execution time equal to n + n, i.e. O(2n), however **in Big O notation constants do not count**, the 2 is discarded, leaving O(n) again.

```python
def printArray(array):
    for elementX in array: # un paso
        for elementY in array: # un paso por cada paso anterior
            print(elementX, elementY)
```

In the previous case we still have the same input, but this time the execution time will depend on the length of the algorithm, multiplied by the same length of the algorithm, because for each element of the array the array will be traversed again, that is n x n. This is symbolized by n2, so the time it takes to run the algorithm will be O(n2). That is, the time it takes to run the function will grow exponentially.

## Each unique input is taken as a different variable

```python
def printArrayMultiplication(ArrayOne, ArrayTwo):
    for elementInArrayOne in ArrayOne: # un paso que depende de que tan largo es ArrayOne
        for elementInArrayTwo in ArrayTwo: # un paso que depende de que tan largo ArrayTwo
            print(elementInArrayOne*elementInArrayTwo)
```

Check the previous function, in this function we could also believe that we would have an O(n2), but that would imply that both arrays are equal, i.e. n x n, what if ArrayTwo is extremely small and ArrayOne extremely large?

For n x n to be satisfied means that there must be only one term (n) and in this case we have two different arrays, each with its particular length, so it would be more correct to say that O(a x b).

In this way we express that the execution time of our function depends on two variables: a and b. If 'a' increases our execution time also, if 'b' decreases our execution time decreases and vice versa.

## Non-dominant terms are discarded.

```python
def printArray(array):
    for elementX in array: #un paso que depende de array (n)
        print(elementX)
    for elementX in array: #un paso que depende de array 
        for elementY in array: #un paso por cada paso anterior (n al cuadrado)
            print(elementX, elementY)
```

In the previous case we have a notation O(n + n2). A step at the beginning that depends on the length of the array and then an 'n' squared. But another feature of big O is that when adding terms only the dominant terms (those with the highest exponent) count, so the above expression would become O( n2).

## Some algorithms are better than others

The big O notation shows us that two algorithms for solving the same problem can behave differently. It is important to evaluate which algorithm is the most appropriate for each situation.

{{< youtube ZZuD6iUe3Pc >}}}

About algorithms there is a lot to talk about, this is merely a brushstroke, if you want to delve into this topic I recommend a very interesting book called **_The Algorithm Design Manual_** written by Steven S. Skiena, where the subject of algorithms and also big O notation is discussed in much more depth than in this publication. I highly recommend it, it is a book that should be part of your reference collection. You can buy it at Amazon or other online stores.

If you are looking for something more visual to introduce you to the world of algorithms watch this excellent BBC documentary:

{{< youtube Q9HjeFD62Uk >}}

## Where to practice algorithms?

Here are some options to practice algorithms.

* [one-algorithm-per-day-newsletter](/an-algorithm-problem-a-day/)
* codewars](/top-5-favorite-algorithm-problems-at-codewars/)
* [HackerRank](https://www.hackerrank.com/)