---
title: "How to find a previously executed command in GNU Linux?"
date: "2019-09-01"
categories:
* linux and devops

coverImage: "images/como_recover_gnu_linux_command.jpg"
description: "Has it ever happened to you that you want to find a previously executed command in GNU/Linux. There are several ways to do it, here I explain two of them."
keywords:
* linux

authors:
- Eduardo Zepeda
---

Sometimes we execute commands that solve a very specific task on our system. We may have done a file lookup using regular expressions or perhaps we accessed a server via ssh and no longer remember the IP address. Re-creating the regular expression from scratch can be very time consuming and perhaps finding the IP again can also be more time consuming than if we could simply retrieve the command. We can find a previously executed command in GNU/Linux in a simple way, here is how.

One way to do this would be to perform a search for the part of the command that we remember in the command history. This can be done as follows:

```bash
history | grep "comando que buscamos"
```

The history command will show the list of commands used, the pipe character "|" will redirect the result to the grep command, which will search for the string you specify.

## Command CTRL + R

There is an even simpler way to perform this search. This method is a keystroke combination that, despite its simplicity and ease of use, is not very popular, even among regular users of GNU/Linux environments.

First we will open a terminal, then we will press **_CTRL + R_**, this will modify the cursor as follows:

```bash
(reverse-i-search)`': history
```

As we press the keys, the commands that match that search will appear. If the command we are looking for is in the ~.history file, it will be displayed instantly.