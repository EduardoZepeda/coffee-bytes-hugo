---
aliases:
- /en/go-handling-signals-for-closing-applications/
authors:
- Eduardo Zepeda
categories:
- go
- linux
coverImage: images/go-manejo-signals-para-cerrar-aplicaciones.jpg
date: '2022-10-06'
title: 'Go: Handling Signals for Closing Applications'
---

Today I'm going to talk about a topic that is often overlooked in most tutorials: handling application closing. What do I mean? To those times when you have to close an application, but there may be pending tasks running, open connections or you simply want to leave a record, in the form of a log, that the application was closed.

{{<box link="/en/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, click here to read it it">}}

## Signals in Linux

As you probably already know, the Linux kernel is in charge of "lending" resources to go applications (or any other application) to run.

Because linux is the kernel of the system, it is able to call back those resources at any time and close the application.

Linux can "nicely" ask applications for the resources it lent them or "take them away" by force. To do this, Linux sends a series of signals to the application, some of which can be captured and handled by the application itself, with code in Go.

!["Linux will kindly shutdown an app via SIGKILL signal"](https://res.cloudinary.com/dwrscezd2/image/upload/v1743294302/coffee-bytes/linux-kill-9-shutdown-meme_rb0mqw.jpg "Linux will kindly shutdown an app via SIGKILL signal")

### Main Linux signals

There are quite a few Linux signals, but here are the most important ones for this example:

| Signal  | Value | Action | Comment                                                      | Command      | Keyboard Shortcut |
| ------- | ----- | ------ | ------------------------------------------------------------ | ------------ | ----------------- |
| SIGINT  | 2     | Term   | Interrupt from keyboard                                      | kill -2 pid  | CTRL+C            | CTRL+C |
| SIGTERM | 15    | Term   | Terminate a process in a controlled manner                   | kill -15 pid | CTRL+C            | CTRL+C | CTRL+C             | CTRL+C        | SIGTERM       | 15        | Term | Terminate a process in a controlled manner | kill -15 pid | CTRL+C | CTRL+C | CTRL+C |
| SIGKILL | 9     | Term   | Terminate a process in a forced manner, cannot be handled by | kill -9 pid  |                   |        | CTRL+CTRL+CONTROLL | CTRL+CONTROLL | CTRL+CONTROLL | CTRL+CTRL |

In Linux, these signals can be sent to an application via the [kill command](/en/linux/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/), specifying the value of the signal and the pid of the application.

```go
kill -<value> <pid>
// kill -2 1234
```

{{<ad>}}

## Signal handling in Go

In go, when we want to listen to the signals sent by the Linux kernel, we use the Notify method of the signal package. The Notify method will send our signal on a channel, which it will receive as the first argument. The second and third arguments are the signals that our method will listen for.

```go
func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    // ...
}
```

### Managing signals with channels

Now we have a channel that receives our signal, but... what do we do with it?

Remember that, in go, [operations that send or receive channel values are blocking inside their own goroutine](/en/go/go-channels-understanding-the-goroutines-deadlocks/), i.e., they keep code execution on hold?

In this case we are going to leave a variable expected by the value of the channel that we have just created, blocking the code at that point.

```go
func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    s := <-quit
    fmt.Println("Closing server", s)
    // ...
}
```

This way the application will wait until it receives any signal (SIGINT or SIGTERM) from Linux and, once it receives it, it will execute the rest of the function code.

```go
func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    s := <-quit
    fmt.Println("Closing server", s)
    // ... 
}
```

Finally, for this function to run correctly, we need it to run inside its [own goroutine](/en/go/go-introduction-to-goroutines-and-concurrency/). To do this, simply prefix the function call with the keyword go.

```go
func main() {
    // ...
    go gracefulShutdown()
    // ...
}
```

### Capturing a SIGNIT signal

If we run a web server or any other permanent process and then issue a SIGNIT signal by pressing CTRL + C in the terminal or with the kill command, linux will receive the signal and notify our application to shut down.

```bash
go run main.go
Starting server Pid: 8830

kill -2 8830
Closing server interrupt
```

Consider that the Pid may be different for you.

### Capturing a SIGTERM signal

To emit a SIGTERM signal, we execute the GNU/Linux kill command, which will terminate the application. Our application will receive the signal through the channel and execute the rest of the code.

```bash
go run main.go
Starting server Pid: 9619

kill -15 9616
Closing server terminated
```

Of course, ideally, you should go beyond printing a message and take care of all those tasks you want that require a more orderly completion process.

## Example of graceful shutdown with a web server

I leave you the complete example with a web server written entirely in go.

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
    //io.WriteString(w, "This is my website!\n")
    w.Write([]byte("This is my website\n"))
}

func gracefulShutdown() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    s := <-quit
    fmt.Println("Closing server", s)
    os.Exit(0)
}

func main() {
    pid := os.Getpid() 
    fmt.Println("Starting server Pid:", pid)
    go gracefulShutdown()
    http.HandleFunc("/", getRoot)
    if err := http.ListenAndServe(":8000", nil); err != nil {
    	log.Fatalf("Server init process failed Error: %v", err.Error())
    }
}
```

After running it, try to cancel the application with CTRL + C or with the terminal with the kill command, and see how the message is printed and the application is terminated in a more orderly and controlled manner.

```bash
go run main.go

CTRL + C
Starting server Pid: 8830
Closing server interrupt
```