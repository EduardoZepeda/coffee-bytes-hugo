---
aliases:
- /en/basic-linux-commands-you-should-know
- /en/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/comandos_GNU_Linux_1.jpg
date: '2019-05-08'
description: 'Usage and common options of the linux terminal commands: grep, ls, cd,
  clear, history, cat, tail, head, cp, rm, scp, ssh, fail, man and some tips'
keywords:
- linux
- commands
title: 'Linux Basic Commands: grep ls cd cat cp rm scp'
---

There are many basic linux commands, from those that tell you which is your user, to others that allow you to run and schedule services periodically. Below I will list the commands that I use frequently, as well as any combination or peculiar feature of any of these that is worth mentioning. I will try to do it in the simplest possible way and without trying to complicate too much the use of the commands.

For these examples I use [Debian 9](https://www.debian.org/index.es.html), so if some command does not appear, please note that it may be due to differences with your GNU/Linux distribution.

Another thing, what most people know as Linux, plain Linux, is actually GNU/Linux, however for SEO and simplicity reasons many people use GNU/Linux or Linux interchangeably, which I intend to do as well. But keep this in mind when you read this or other entries.

Click here for [the second part of this series of commands](/en/linux/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/) and here for [the third part of this series]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer-tercera-parte/index.md" lang="en" >}}).

## Little tips from the Linux Terminal

### Use tab to complete commands

Before starting with the commands I want to mention a couple of small tips or functionalities. The GNU/Linux terminal is user friendly, just type the first letters of a command, file or folder found in the current folder and then press the TAB key and the system will automatically complete the command, file or folder name.

If there is a conflict, just press the TAB key twice and it will show the available options. A perfect function for lazy people who don't like to type unnecessarily.

{{< figure src="images/tabular.gif" class="md-local-image" alt="autocomplete function of the tabular command in a GNU/Linux terminal"  width="802" height="97" >}}

{{<ad0>}}

### Press up to access previously executed commands.

While we are in the terminal, if we press the up key of our GNU/Linux pad it will show us the last command we executed. An ideal function for those moments when we repeat the same command over and over again, hoping that, magically, the result will change.

{{< figure src="images/up.gif" class="md-local-image" alt="Function of accessing previous commands of a GNU/Linux terminal using the up key"  width="802" height="97" >}}

### Use CTRL + C to cancel interrupting terminal processes.

If we did something stupid like executing an infinite loop, or we simply want to stop something we are executing, we will use CTRL + C, yes, as if you were going to do a copy paste, but with the terminal open. This will cancel the execution of the command.

{{< figure src="images/ctrl_c.gif" class="md-local-image" alt="Canceling code execution with CTRL + C"  width="802" height="455" >}}

Having explained this, let's start with the commands.

{{<ad1>}}

## man

The man command (MANual) is what I consider **the most important of all the common commands**, that's why I put it here first. The reason? because this command shows the user manual of the command you put in front of it. With this command you have access to all the documentation of the command you choose. And, consequently, you can learn the basic use of practically any command that has a manual.

Remember that most of the commands listed in this publication have a manual, so you can see all the options they offer using this command.

For now try using it on itself. Yes, we will inception the man command:

{{<ad2>}}

```bash
man man
 it show us the manual of man command
man grep
 it show us the manual of grep command
```

## whatis

It shows us a small description of the command that we put next. It is the **super summarized** version of man.

```bash
whatis man
man (7)              - macros to format some manual pages
man (1)              - an interface for electronic reference manuals
```

## grep

The grep command (_Global Regular Expression Print_) searches for matching regular expressions in the files. If you don't know what regular expressions are you can use it with ordinary text in quotes, even then it is quite useful. This command becomes especially useful when we want to find text in a large number of files, especially using it in combination with the result of other commands.

{{<ad3>}}

```bash
grep "text to search" <file>
 Search for a string in the given file
grep -r "text to search" .
 search for a string recursively in the files of the working directory and subdirectories
man man | grep "text to search"
 We use the pipe character "|", followed of grep to search a string in the results of man's output
```

## history

History shows us the commands we have used, numbered, with the most recent to the bottom and the oldest to the top. There is an easier way to search for commands on [which you can read here](/en/linux/how-to-find-a-previously-executed-command-in-gnu-linux/).

```bash
history
1920 cat file.txt
1921 ls -la
```

## clear

What if we want to give our terminal a little cleanup to have more clarity when writing code? Clear deletes the contents of the terminal and leaves us with a completely clean terminal.

```bash
clear

 clean the content of the terminal
```

## pwd

From the acronym "_Print Working Directory_", which means "print the working directory", this command prints the directory from where we are executing it.

```bash
pwd
/home/your_name
```

## ls

When we need to display the files and directories in the current directory this command is the solution. We can use it to see the permissions, users and groups to which a file belongs.

```bash
ls
 List files and directories in the working directory

ls -l
 List permissions, size, group and user for the files in the working directory

ls -la
 same as above but include hidden files
```

## file

File gives us information about the type of file that we pass as an argument. It even works for files with the wrong file extension.

```bash
file <file.txt >
file.txt: ASCII text
```

## cd

This command is one of the most commonly used. It is used to change directory, it can be read as "_change directory_", which means "change directory" in English.

```bash
cd <directory_name>
 # move to the existent directory

cd ..
 # go to the parent directory
```

## cat

This command is used to concatenate the contents of a file and display it on the screen.

There is a tool that offers more functions than cat, check my post where I talk about [bat](/en/linux/get-to-know-bat-in-linux-the-syntax-highlighting-cat/)

```bash
cat file
 # It would print the content of the file to the STD output (the screen in this case)
```

## tail

The tail command, which comes from "_cola_" in English, prints the last ten lines of a file. Ideal for reading the contents of logs.

```bash
tail file
last ten lines
```

## head

Similar to the previous one, the head command, which comes from "_head_" in English, prints the first ten lines of a file.

```bash
head <file>
first ten lines
```

## touch

This command creates a file in the directory where we are executing it.

```bash
touch <file.py>
 # create a file called file.py
```

## rm

Derived from the word "_ReMove"_, this command deletes one or more files. It is often used with its '-r' option, which recursively deletes files.

```bash
rm <file_to_delete>
 delete a file called <file_to_delete>
rm -rf *
 delete all files in the working directory
```

Sometimes we want to be sure not to delete a file unintentionally, we can add the -i option to ask us before deleting a file.

```bash
rm -i <file_to_delete>.txt
 rm: ¿delete the file? '<file_to_delete>.txt'? (s/n)
```

### Be careful with the rm command

Another important thing, remember when web surfers were tricking people into deleting their system32 folders in windows, rendering their systems unusable? Well there is an equivalent in GNU/Linux, it is the rm command, followed by the -rf option, used to delete recursively and without asking for confirmation and then the slash representing the root folder "/". If you run it with sufficient permissions **it will erase your operating system, leaving it unusable**.

I warn you again: **PLEASE DO NOT EXECUTE IT**:

```bash
# Don't do this
rm -rf /
# Don't do this
```

## mkdir

This command is used to create directories. It comes from "_MaKe DIRectory_".

```bash
mkdir <dir> 
 # creates a directory with the given name, without the angle brackets
```

## rmdir

"_ReMove DIRectory_", removes a directory, in order to use this command the directory to be removed must be empty.

```bash
rmdir <dir_to_remove> 
 # delete the specified directory without the angle brackets
```

## cp

The _cp_ command is responsible for copying a file to the location you specify.

```bash
cp our_file.html destination_folder/
```

We can also copy directories with all the content. If the second directory does not exist it will create it.

```bash
cp -r origin_folder/ destination_folder/
```

## ssh

The _ssh_ command allows us to connect to a remote server. To do this we must specify the user with which we will connect and the ip address, both in that order and joined by an at.

```bash
ssh remote_user@10.10.0.1
```

It is common practice for servers to change the default port for security reasons. We can specify a port using the _-p_ option.

```bash
ssh -p 1234 remote_user@10.10.0.1
```

After executing the command, if the user name and address are correct, it will ask for the user's password to give us access.

## scp

This command is also used for copying, but it will copy from our computer to another one by means of _ssh_. After typing the command it will ask for a password to be able to copy it. For this command to work the target machine must have ssh installed and its port 22 open.

```bash
scp file_to_copy.txt remote_user@10.10.0.0:/remote_directory/subdirectory
```

If you want to pass multiple files, place them next to each other.

```bash
scp file1.txt file2.xml file3.html remote_user@10.10.0.0:/remote_directory/subdirectory
```

## ip addr

This command will show us the connections of our computer, with their network interfaces and IP addresses.

```bash
ip
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s31f6: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN group default qlen 1000
    link/ether 1c:1b:0d:64:6b:aa brd ff:ff:ff:ff:ff:ff
```

The ip command has many options that I suggest you review calmly, use the man command if you want to delve deeper into the functionalities.

## netstat

This command shows multiple information regarding the system networks, a very useful application is to find out which processes (PID) are using a certain port, to do this just run the following:

``` bash
netstat -tulpn
```

As I'm sure you already know, many important commands have been missing, I haven't placed them here so as not to make the reading so tedious, get up, stretch a bit, get something to drink and [skip to my second part of the basic GNU Linux commands](/en/linux/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/) for the second part.