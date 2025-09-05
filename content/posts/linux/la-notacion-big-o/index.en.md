---
aliases:
- /en/the-big-o-notation/
- /en/linux/the-big-o-notation/
authors:
- Eduardo Zepeda
categories:
- linux
- algorithms
coverImage: images/BigO_notacion.jpg
date: '2019-08-15'
description: Understand the significance of Big O Notation in analyzing algorithm
  performance. Learn how Big O Notation impacts the efficiency and scalability of
  your code
keywords:
- bigo
- performance
- algorithms
title: The Big O notation for algorithm analysis
---

I love astrophysics and try to keep up with new discoveries as they happen; whether they are trivial things, like the discovery of a new planet; or significant, like the hypothetical Dyson spheres they swear they find every month. But this time the discovery was simply outstanding.

Last April 2019, the [first photograph of a black hole](https://www.bbc.com/news/science-environment-47873592#?) was published.

{{< figure src="images/BigO_notacion.jpg" class="md-local-image" alt="First picture of a black hole" caption="First picture of a black hole" >}}

The above photograph required 5 petabytes of data, which is 5000 terabytes of data (roughly equivalent to 5000 hard disks of one terabyte capacity). Here the scientists were faced with a major dilemma, what method to use to send so much information?

What would happen if they tried to send that information over the Internet? The time it takes to send information over the Internet increases with the amount of information to be sent, the more information the longer the transmission time.

Doing a simple calculation, with a download speed of 50 MB/s it would take approximately 1157 days. That's a long time!

What if they sent the information in person? Well, this would take at most the amount of hours of the longest flight which is 19 hours approximately, discounting the time it takes to copy the information to a physical medium (a hard disk), which I dare say would consume less than 1157 days.

What would have happened if instead of 5 petabytes it had been 5 GB of data? The answer would have been obvious; send the information over the Internet. However, it will take the same amount of time for the airplane to transport any amount of data, be it 1 MB, 1 GB or 1 PB; 19 hours.

In this case, time is constant. You know what they decided? That's right, the scientists opted to ship the hard disks by plane.

| Information       | Internet (50 MB/s)            | Plane    |
| ----------------- | ----------------------------- | -------- |
| 1 GB              | 20 seconds                    | 19 hours |
| 10 GB             | 200 seconds                   | 19 hours |
| 1 TB (1000 GB)    | 20000 seconds (5 hours)       | 19 hours |
| 50 TB (50000 GB)  | 1000000 seconds (277 hours)   | 19 hours |
| 5 PB (5000000 GB) | 100000000 seconds (1157 days) | 19 hours |

With internet speed close to the current limits, using the internet to transmit data is better the smaller the amount of information. Whereas physically transporting hard disks is better for huge amounts of data. This is because **airplane transport time is constant**, while **Internet data transmission time is linear**; it increases with the amount of data.

## What does Big O have to do with the code?

What does the latter have to do with code? Well, the same thing happens with code, every process we perform on the data to transform it consumes time and there are different ways of processing data, there are algorithms whose execution time is constant, for others it increases linearly with the amount of data they process, while others exponentially. 

On the other hand, some offer better performance with little data, while others shine when processing a lot of information. For example [Bloom Filters]({{< ref path="/posts/databases/bloom-filter/index.md" lang="en" >}}) with outstanding performance when checking membership of an element in a set.

Sometimes when we have no idea about algorithms we ask ourselves, what does it matter if our code runs in 0.0001 seconds or 0.001 seconds, for practical purposes it is the same thing, isn't it? [Obsessing about the performance can seem trivial for such small values](/en/opinion/dont-obsess-about-your-web-application-performance/) and if we add to that the vertiginous processing speed of modern equipment we fall into the error of not giving the right importance to algorithms.

But now let's ask ourselves, what will happen when the number of users increases to 1000, to 10 000, to 10 000 000, that's when milliseconds can turn into hours or days, and then we get a glimpse of the real importance of choosing an algorithm with adequate performance.

{{<ad>}}

## How to evaluate or read Big O performance?

To evaluate this performance, a notation called Big O is used. It tells us how the execution time of an algorithm will behave as a function of its input.

The longer the length of the input data, the longer it will take to go through and process it, but by how much does this time increase? A constant time is not the same as a time that increases in direct proportion or exponential proportion.

Certainly an algorithm that increases in exponential proportion will not be a nice thing to deal with when we have to go through huge amounts of data. To know how our algorithm behaves we need to analyze it and there are certain rules to consider in the big O notation.

### Steps add up

We will start with a simple function that, as you may have guessed, **will take longer to execute the larger the size of the array** we pass as an argument.

```python
def printArray(array):
    for element in array: # a step we will can "n"
        print(element)
```

This function will pass through the array only once. Since it has only **one step**, i.e. 'n', we say that its execution time is O(n).

### Constants are discarded

Now look at this code, it has two steps that process the same array of values.

```python
def printArrayDoubled(Array):
    for element in Array: # first step
        print(element)
    for element in Array: # second step
        print(element*2)
```

In the above example we would be tempted to say that our function would have an execution time equal to n + n, i.e. O(2n), however **in Big O notation constants do not count**, the 2 is discarded, leaving O(n) again.

```python
def printArray(array):
    for elementX in array: # one step
        for elementY in array: # one step for every step
            print(elementX, elementY)
```

In the previous case we still have the same input, but this time the execution time will depend on the length of the algorithm, multiplied by the same length of the algorithm, because for each element of the array the array will be traversed again, that is n x n. This is symbolized by n2, so the time it takes to run the algorithm will be O(n2). That is, the time it takes to run the function will grow exponentially.

### Each unique input is taken as a different variable

```python
def printArrayMultiplication(ArrayOne, ArrayTwo):
    for elementInArrayOne in ArrayOne: # A step depending on ArrayOne's length
        for elementInArrayTwo in ArrayTwo: # A step depending on ArrayTwo's length
            print(elementInArrayOne*elementInArrayTwo)
```

Check the previous function, in this function we could also believe that we would have an O(n2), but that would imply that both arrays are equal, i.e. n x n, what if ArrayTwo is extremely small and ArrayOne extremely large?

For n x n to be satisfied means that there must be only one term (n) and in this case we have two different arrays, each with its particular length, so it would be more correct to say that O(a x b).

In this way we express that the execution time of our function depends on two variables: a and b. If 'a' increases our execution time also, if 'b' decreases our execution time decreases and vice versa.

### Non-dominant terms are discarded.

```python
def printArray(array):
    for elementX in array: # An step that depends on array (n)
        print(elementX)
    for elementX in array: #An step that depends on array (n)
        for elementY in array: #An step that depends on every step of array (n squared)
            print(elementX, elementY)
```

In the previous case we have a notation O(n + n2). A step at the beginning that depends on the length of the array and then an 'n' squared. But another feature of big O is that when adding terms only the dominant terms (those with the highest exponent) count, so the above expression would become O( n2).

## How to use Big 0 to measure performance?

The big O notation shows us that two algorithms for solving the same problem can behave differently. It is important to evaluate which algorithm is the most appropriate for each situation.

{{< youtube ZZuD6iUe3Pc >}}

About algorithms there is a lot to talk about, this is merely a brushstroke, if you want to delve into this topic I recommend a bewitching book called **_The Algorithm Design Manual_** written by Steven S. Skiena, where the subject of algorithms and also big O notation is discussed in much more depth than in this publication. I highly recommend it, it is a book that should be part of your reference collection. You can buy it at Amazon or other online stores.

If you are looking for something more visual to introduce you to the world of algorithms watch this excellent BBC documentary:

{{< youtube Q9HjeFD62Uk >}}

## Alternative Big O notations

When measuring algorithm efficiency, we use **asymptotic notations** to describe the growth rate of an algorithm's time or space complexity. As you can guess, the most commonly used are **Big-O (for worst-case analysis)** and **Theta (for precise average-case analysis)**.

| Notation             | Analogy (Inequality)               | Meaning                     | Example              |
| -------------------- | ---------------------------------- | --------------------------- | -------------------- |
| **Big-O (O)**        | \(f(n) < eq c ⋅ g(n)\)             | Worst-case upper bound      | \(2n = O(n)\)        |
| **Omega (Ω)**        | \(f(n) > eq c ⋅ g(n)\)             | Best-case lower bound       | \(n^2 = Ω(n)\)       |
| **Theta (Θ)**        | \(c1 g(n) < eq f(n) < eq c2 g(n)\) | Tight bound (average case)  | \(3n + 5 = Θ(n)\)    |
| **Little-o (o)**     | \(f(n) < c ⋅ g(n)\)                | Strictly looser upper bound | \(n = o(n log n)\)   |
| **Little-omega (ω)** | \(f(n) > c ⋅ g(n)\)                | Strictly looser lower bound | \(n^2 = ω(n log n)\) |

## Where to practice algorithms?

Here are some options to practice algorithms.

* [codewars](/en/opinion/top-5-favorite-algorithm-problems-at-codewars/)
* [One algorithm a day](/en/linux/an-algorithm-problem-a-day/)
* [HackerRank](https://www.hackerrank.com/#?)