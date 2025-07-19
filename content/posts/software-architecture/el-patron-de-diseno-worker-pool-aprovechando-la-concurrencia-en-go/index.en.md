---
aliases:
- /en/go-introduction-to-goroutines-and-concurrency/explanation-of-worker-pool-design-pattern/
- /go-use-of-channels-to-communicate-goroutines/explanation-of-worker-pool-design-pattern/
- /en/worker-pool-design-pattern-explanation/
authors:
- Eduardo Zepeda
categories:
- software architecture
- go
coverImage: images/worker-pool-patron.jpg
date: '2023-06-28'
description: I explain how the worker pool design pattern works, the ideal job queue
  to handle with programming languages that support concurrency.
keyword: worker pool
keywords:
- Go
- Design patterns
- Worker pool
- Concurrency
- Parallelism
- Workers
- algorithms
title: Worker Pool Design Pattern Explanation
---

This entry is about a the Worker Pool design pattern. Imagine that you have a number of concurrent tasks that you want to perform, either crawling many websites, or perhaps processing information from each of the pixels of an image or anything else you can think of.

The simplistic option is to create a series of workers and use them concurrently, something like this pseudocode:

``` python
for job in jobs:
    async process_concurrent_job()
```

This may look pretty good so far, at first, but it has multiple disadvantages; first, you will be creating workers without control, which can increase your program's memory usage incredibly fast; second, you are constantly creating and destroying workers, which can be costly for your program.

{{< figure src="images/workers-vs-memoria.jpg" class="md-local-image" alt="If there is no worker limit, workers will continue to be created to match the tasks" caption="If there is no worker limit, workers will continue to be created to match the tasks" >}}

It would be best to keep memory usage constant and avoid creating and destroying workers frequently. For this, the worker pool pattern works perfect.

Worker pool is a classical [design pattern]({{< ref path="/posts/python/patrones-de-diseno-en-python-resena-de-practical-python-design-patterns/index.md" lang="en" >}}) that comes to make up for these shortcomings.

There are developers who have used this pattern to [handle a million requests per minute on go.](http://marcio.io/2015/07/handling-1-million-requests-per-minute-with-golang#?)

{{<ad>}}

## How does the worker pool design pattern work?

Let's take a tail of a task by running, these can be fixed or dynamically created. Then, instead of creating and destroying multiple workers ([goroutines in the case of go](/en/go/go-introduction-to-goroutines-and-concurrency/)) constantly, we create a **fixed number of workers** and put them in a cycle, in which they will be constantly listening for information from the queue (through a [channel in the case of languages like Go](/en/go/go-use-of-channels-to-communicate-goroutines/)). This way we will keep our memory management much more stable and predictable, in addition to limiting the impact of constant creation and destruction of workers.

Finally, we can optionally save the results of these tasks in a queue from which they can be read later.

``` mermaid
flowchart TD
    Job_1-->JobQueue
    Job_2-->JobQueue
    Job_3-->JobQueue
    subgraph WorkerPool
    JobQueue-->|job|Worker_1
    JobQueue-->|job|Worker_2
    JobQueue-->|job|Worker_n
    end
```

### Job queue

The tasks or jobs that we want to be executed by the workers will go to a task queue or job queue. A normal queue, like any other. This can be fixed, or created on the fly by means of user interactions or other systems.

``` mermaid
classDiagram
class JobQueue{
    job 1
    job 2
    job 3
    ...
    job n
}
```

### The pool

The pool initializes and hosts the number of workers we set up, generally you will want to use a configuration file, environment variables or other means. Each of these workers will take a task, run it, and when it becomes available again, it will again look for a task from the job queue to run and repeat the cycle.

``` mermaid
flowchart TD
    subgraph Pool
    JobQueue-->|job|Worker_1
    JobQueue-->|job|Worker_2
    JobQueue-->|job|Worker_3
    JobQueue-->|job|Worker_4
    JobQueue-->|job|Worker_n
    end
```

### The worker

The worker is in charge of executing the tasks and, as I mentioned, it will be listening for new tasks or jobs permanently or until a certain limit that we indicate, such as the job queue runs out, a given number of tasks are executed or any other condition that we declare.

``` mermaid
flowchart TD
    A[The worker is initiliazed] --> B{Are pending jobs in the queue?}
    B -->|yes| C[Get a new job]
    C --> B
    B ---->|No| E[End the worker]
```

The fixed number of workers will ensure that, during the entire program execution, there will be a maximum number of tasks running, which will limit the memory impact of our concurrent tasks.

### The worker pool's results queue (optional) 

Optionally, we can send the result of each task executed by a worker to a second queue; the result queue, which we can process later.

``` mermaid
classDiagram
class ResultsQueue{
    result 1
    result 2
    result 3
    ...
    result n
}
```

This design pattern is very useful when huge amounts of tasks have to be processed and when we do not want to overload the system. And, as you can guess it is quite popular and useful in programming languages that heavily use concurrency, such as [the Go programming language]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}).