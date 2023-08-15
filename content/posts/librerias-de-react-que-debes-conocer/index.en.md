---
title: "5 cool React libraries you should know about"
date: "2021-03-02"
categories:
- "react"

coverImage: "images/LibreriasDeReact.jpg"
coverImageCredits: "Credits to https://www.pexels.com/es-es/@timmossholder/"
description: "I show you some of my favorite React related libraries, and some videos so you can see them in action working."
keywords:
- javascript
- react

authors:
- Eduardo Zepeda
---

After several weeks posting about Django I wrote a short post about React, about libraries, because man does not live by Python alone. These are some of the libraries that I consider most useful in React. For obvious reasons are excluded React-router, Redux and others too well known. As well as some React Frameworks such as Gatsby, Nextjs, Frontity and others.

If you want to learn React but don't know Javascript read my post, where I talk about [one of the best books to start with Javascript](/blog/the-best-book-for-learning-modern-javascript/).

## Ant Design

Ant design is beautiful, yes, there is not much to go into using text. It has lots of components that are visually pleasing and very elegant: buttons, sliders, progress bars, layouts, you know, the basics. Be sure to visit the [Ant design website](https://ant.design/) to see for yourself all that this library has to offer.

![Screenshot of ant design](images/Ant-design.gif)

## formik

Formik is a great library. This library makes working with forms simple and scalable. It allows you to have controlled fields, create validations, reset the form, set a state, handle errors, all with a few lines of code: define an object containing properties with their respective validations and that's it, formik takes care of almost everything.

Note the validation scheme on the left side consists of an object called _ValidationSchema_ which has the name of the fields and functions that are concatenated to perform the validation. There are functions like _min()_, _max()_, _oneOf()_ and many others for **almost any type of validation you require.** I leave you [the link to the sandbox](https://codesandbox.io/s/zkrk5yldz?file=/index.js) [](https://codesandbox.io/s/zkrk5yldz?file=/index.js) from where I took this example.

![Screenshot of Formik code](images/Formik-1.gif)

## React query

Every time a request is made to an API there is code that repeats; make the request, display an element indicating that content is being loaded, receive the error or success status and save it to the status. Sound familiar?

React query takes care of reducing all the repetitive code that handles the whole process of handling web requests by providing us with a special hook from which we can unstructure variables that will facilitate the handling of the response.

![React query library ](images/reactQuery.png)

## React-icons-kit

Sometimes it is quite annoying to take care of the graphic part of a web page. There are icons on all sides but there are looking for them, sometimes an icon package does not have all the icons we need and we have to combine different. An excellent option to these problems is [React-icons-kit](https://react-icons-kit.now.sh/).

Before using it remember to check the license of the icons you decide to use, because not all licenses are equally permissive.

![Screenshot of the React icons kit page](images/React-icons-kit.gif)

## The minimalist React: Preact

Preact is React, yes, same functions, well, not really all, but the most common ones yes, all in only 3kb. **Preact promises to be much faster and lighter than its counterpart** because it uses the browser's native _addEventListener_ instead of the synthetic event handler that React uses. It also has unique features that you don't find in React. This library is ideal for applications where performance is a critical factor.

You can read more about the differences between React and Preact at [their official web site](https://preactjs.com/guide/v10/differences-to-react/)

![Screenshot of Preact page](images/Preact.jpg)

## React admin

React admin is the equivalent of django admin but in React, an interface to perform CRUD operations to your database models. It requires a very basic configuration, but once you set it up you're all set. Visit the [React admin demo](https://marmelab.com/react-admin-demo/#/) to get to know it.

![React admin interface](images/ReactAdminInterfaz.png)

## Bonus: React Virtualized

React virtualized takes care of a problem that looks quite simple at first. Render lists and tabulable information. Just that? Well, yes, but rendering lists with a few elements wouldn't be a problem, would it? React Virtualized's forte is not rendering small lists, but large lists, larger than 1k elements with most of the problems presented already solved and tested.

Visit [the React Virtualized page](https://bvaughn.github.io/react-virtualized/#/components/List) to read the complete documentation.

![React Virtualized working to render tables](images/ReactVirtualized.gif)