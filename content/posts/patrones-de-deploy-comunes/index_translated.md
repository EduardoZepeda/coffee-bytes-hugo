---
title: "Common Deploy or Deployment Patterns"
date: "2023-07-28"
draft: true
categories:
* "devops"
* "software architecture

coverImage: "images/practical_python_design_patterns.jpg"
description: "I explain some common deploy patterns"
keywords:
* devops
* design patterns
* software architecture

authors:
- Eduardo Zepeda
---

## What is a deployment pattern?

A deployment pattern is an automatic method of deploying new features of an application to your users. What's the point? Imagine that you want to test a feature of your web application, but you are afraid that your users will not like it. What can you do in these cases? The best thing to do would be to test it on a representative sample of your audience and, depending on how it responds, discard it or implement it to the rest of the users.

## Common deployment patterns

There are a number of widely used patterns, you have probably already heard of several of these.

### Canary

This pattern consists of showing new features to a small group of users. After analyzing and correcting the performance of the new features and, if appropriate, the deploy is extended to all users.

### Features toggles

Instead of releasing all changes at the same time, this pattern hides new features behind a switch, which can be turned on or off without modifying the code. This allows changes to be released gradually or only to certain users, making it easy to test and manage. This method has the advantage that if a problem occurs, you can turn the switch off without the need to return the code to a previous state.

### Despliegues azul/verde

In the blue/green deployment we have two similar environments simultaneously. These environments will be known as blue and green. At any time only one of the two environments will be active, while load balancing from one environment to the other. If we find any errors we simply adjust the load balancing to the opposite side.

### A/B testing

A/B testing is the classic A/B testing; a random set of our users will receive version A of the application, while the rest will receive version B. We will then use statistics, specifically the two-sample t-test, to determine which version (A or B) is more effective.

The distribution percentage does not necessarily have to be 50-50.

### Dark launches

This type of deployment pattern is quite similar to the Canary deployment, however in this case users must be aware that they are receiving a test version and must be aware of the new functionality being tested. With this knowledge the users will be able to provide feedback on the new functionality.