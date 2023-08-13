---
title: "Go: use of channels to communicate goroutines"
date: "2022-01-22"
coverImage: "images/go-channels-o-canales.jpg"
categories:
- go

keywords:
- go
- concurrence
- channels

authors:
- Eduardo Zepeda
---

So far I have explained how to run a goroutine, execute code concurrently with the goroutines and wait for them to finish executing but our goroutines can't do anything else, they can't cooperate with each other to speed up the processes.

Imagine you have a web scrapper that gets data from the internet concurrently; we get the data with goroutines and process it with goroutines. do we have to wait for all the goroutines to finish to use it? Ideally, the goroutines should communicate with each other the data and continue processing.

## Communicating goroutines with channels

Channels are "conduits" that accept a single type of data. Through these channels we "introduce" information that we can later "take out".

The goroutines can send data to the channels and also read data from them, thus communicating with each other.

![Schematic diagram of how a channel works in go](images/channels-en-go.jpg "Basic diagram of how channels work in Go")

A channel in go is declared with _make_ and the word _chan_, which refers to the word channel.

```go
c := make(chan string)
```

Channels are used to communicate goroutines, as in the [worker-pool design pattern](explanation-of-worker-pool-design-pattern/)

### Channels or buffered channels

The _make_ function allows you to pass as an extra argument the limit amount of simultaneous data to be handled by that channel. **This is known as a buffered channel.

```go
c := make(chan string, 1)
```

### Channels or unbuffered channels

If we do not specify a buffer size the channel:

* It will block the sender until the recipient is ready to receive the information.
* Block the recipient until the sender is ready to send the information

Or to put it another way, if you try to send data to an unbuffered channel, the operation will block until the data is received. If you try to receive data it will block until the data is sent.

These channels are useful when you want to ensure that the sender and recipient are in sync and that the information is transmitted immediately, but they can lead to deadlocks if the sender and recipient are not in sync.

### Accessing a channel in a function

When we want to refer to the channel as an argument of a function, it is necessary to indicate the data type of the channel.

```go
func say(text string, c chan string) {}
```

The data type of a channel can also be one defined using a _struct_.

```go
func say(text string, c chan MiStruct) {}
```

### Putting data into a channel

To indicate data input through the channel, we use the character pair <-

```go
func say(text string, c chan string) {
    c <- text
}
```

### Pulling data from a channel

To obtain the channel response we reverse the order between the channel and the <- symbol.

```go
fmt.Println(<-c)
```

### Entering and retrieving data from a channel in go

The complete process of entering and extracting data from a channel in go would look something like this:

Create a channel of a data type using make.
2. We introduce a data (in this case _string_) to the channel using a
goroutine
3. Extract the text from the channel and use it (in this case just print it).

```go
package main

import "fmt"

func escribirEnCanal(texto string, c chan string) {
    c <- texto
}

func main() {
    c := make(chan string)
    go escribirEnCanal("Dato de un canal", c)
    fmt.Println(<-c)
}
```

### Input and output channels

There are channels that receive information and channels that output information, **by default a channel is bidirectional, but we can declare input and output channels**.

To identify them, observe the flow of the arrow around the word chan; one enters (or goes to) chan and the other leaves chan.

This is an input channel.

```go
func say(text string, c chan<- string) {}
```

While this is an output channel.

```go
func say(text string, c <-chan string) {}
```

It is important to define the type of channel because, with bidirectional channels, we run the risk of causing a [deadlock in our go program](/go-channels-understanding-the-deadlocks/).

## Channel capacity

Remember I told you that the make function could set the maximum number of data a channel can work with? Well, it is possible to retrieve that information using the len function.

The len function tells us how much data there is in a channel, while cap returns the maximum capacity, respectively.

```go
c := make(chan string, 3)
c <- "dato1"
c <- "dato2"
fmt.Println(len(c), cap(c))
// 2 3
```

In the above example, the channel has two slots occupied, but has a total capacity of 3, even though not all of its slots are occupied.

## Close a channel in go

If we want to disable a channel, even if it has available capacity to store more data, the close function allows us to do so.

```go
c :=make(chan string, 3) 
c <- "dato1" 
c <- "dato2" 
close(c)
c <- "dato3"
//panic: send on closed channel
```

## Iterate on a channel

Range is ideal for iterating over channel data. However, it is important to note that, **there is no certainty about what data we will receive** since the channel content can come from multiple goroutines.

```go
c := make(chan string, 3)
c <- "dato1"
c <- "dato2"
close(c)
for message := range c {
    fmt.Println(message)
}
```

With that you know the basic information about the channels and how you can use them to communicate goroutines.