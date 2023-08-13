---
title: "Why should you use a virtual environment in python?"
date: "2019-07-10"
categories:
- "python"

coverImage: "images/porque_deberias_usar_un_entorno_virtual.jpg"
description: "Don't know what a virtual environment in Python is? Here I explain what it is, what it's for and its differences with virtual machines."
keywords:
- "python"
- "opinion"

authors:
- Eduardo Zepeda
---

Python virtual environments are a tool that is used in every project. They are so important that they are part of the Python standard library, but what do they do? Let me tell you what a Python virtual environment is for with a fairly simple example.

Imagine you are developing two projects, each for a different company. In the first project, you're developing new functionality for a corporate website using Django 2.2. A couple of the libraries used in the previous project are updated infrequently, so to avoid compatibility issues, you decide to keep that version of Django. You decide to name this project "Pro 2.2".

In the second project, your millennial startup clients ask you to develop a web application from scratch. To take advantage of the new features of the framework you use the newest version of Django in this project. You name this second project "Pro-newest".

## Problems begin

That same afternoon you decide to start working on the first project, Pro 2.2. Later, in order not to leave the second project, Pro-newest, behind, you are motivated to write some code. Suddenly, when you need to go back to work on Pro 2.2 again, the problem becomes clear in front of you. Every time you work in Pro 2.2 it will be necessary to uninstall the newer version of Django and, when you write code for the second project, you will have to install the newer version. And worse, this situation is repeated for each dependency of the project.

You decide it's okay, that's fine, so you decide to work like this. When you finish your Pro-newest Project you are so excited that you decide to show your colleague. He receives your files but swears to you that the code doesn't run, what went wrong? After a brief chat your friend explains that he has had Django 1.6 installed on his PC for years and hasn't updated it since then. Your project with the latest version of Django won't work on your friend's computer due to version incompatibilities. Wouldn't it be simpler if your friend could use the same version of Django as the project you want to show him? Without having to uninstall the version he already has.

## What if we use virtual machines?

We could solve the above problem by installing a virtual machine, such as [virtualbox](https://www.virtualbox.org/). Inside each virtual machine we would be able to install the dependencies of our custom project. And we would have as many as projects. And it would work, wouldn't it? Well yes, but with a big disadvantage: you have to load a complete operating system to have some dependencies. It is too much load to our system to be practical.

Virtual machines consume too much hard disk space and the boot time for each virtual machine is daunting. The interaction between our system and a virtual machine can become complicated. After all, we don't need to load an entire operating system, but only Python code.

## The solution, a python virtual environment

A virtual environment, simplifying the explanation as much as possible (forgive me purists), is a space isolated from the rest of our operating system, where we will have a series of dependencies installed locally. It is as if you specify a place from where Python will take its libraries, instead of the default one used by your operating system. These dependencies are independent of the ones we have previously installed in our operating system. And, best of all, we can have as many of these isolated spaces as we want.

Imagine a folder where we have Django 2.2 installed and another one for the newer version of Django. Since they are isolated environments, it doesn't matter if our operating system doesn't even have django installed. We will be able to switch between one virtual environment and another, without excessive loading times, and the behavior will be the same as if we had them installed on our operating system.

Needless to say, virtual environments solve quite a few problems. And it is a highly recommended, if not almost mandatory, practice when working with Python code.

## Virtual environment manager options

There are many options of virtual environments available here are some of the most popular ones:

* virtualenv
* [pipenv](/pipenv-the-virtual-environment-manager-you-don-t-know/)
* conda
* poetry