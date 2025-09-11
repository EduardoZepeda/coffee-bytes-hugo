---
aliases:
- /en/be-careful-of-shiny-object-syndrome-and-fomo-in-web-development/
authors:
- Eduardo Zepeda
categories:
- opinion
- javascript
coverImage: images/shiny-object-syndrome-and-fomo-in-web-dev.jpg
date: 2024-09-08
description: Let's talk about Shiny Object Syndrome (SOS) and Fear of Missing Out
  (FOMO) in web development, what they are about, their differences, examples and
  their consequences.
keyword: fomo in web development
keywords:
- opinion
title: Be careful of Shiny Object Syndrome and FOMO in web development
---

{{<ad0>}}

With all the rapid changes happening in web development: frameworks, languages, tools, libraries, etc. It is inevitable to suffer a bit of Shiny Object Syndrome and some FOMO. But it is convenient to identify these impulses and their nature to avoid suffering the consequences of ignoring them.

## Shiny Object Syndrome in web development

Shiny Object Syndrome (SOS from now on) is the tendency to be distracted by a new idea or trend. In web development this idea or trend could be anything: a new framework, a new language, a new editor, etc. Let me explain it with an example.

{{< figure src="images/shiny-object-syndrome.webp" class="md-local-image" alt="Shiny object syndrome in Javascript" caption="Oops, a new Javascript framework, I have to try it out" >}}

Imagine that you want to create a new application, but you heard that a [brand new Javascript framework with an outstanding performance](/en/opinion/dont-obsess-about-your-web-application-performance/) came out that promises to make things easier, so you decide to learn this new ~~blazingly fast~~ framework to implement your new idea, later you discover that another even better framework came out, so, even though you were already half way through the project, you decide to refactor your application using this new framework and you delay again the development of your app. 

You could have implemented your new idea using the framework you already knew, and finished sooner, but you decided to waste your time, attention and resources with every new “shiny object” that appears.

Has this happened to you or just to me?

{{<ad1>}}

## FOMO or Fear of Missing Out in web development

FOMO is a generalized self-absorption that others might experience pleasant experiences from which we would be absent. In web development this pleasant experience could also be the popularization of a new programming language, or a new type of API that seems to make things easier, or a new Javascript framework (a new one comes out every week).

{{< figure src="images/rewrite-everything-in-rust-meme.webp" class="md-local-image" alt="Rust is the most loved language" caption="Everyone is learning Rust, I should learn it too." >}}

For example, imagine a nerd creates a new programming language, which promises to be faster, more secure and is quickly adopted by the community. Feelings of anxiety start to invade you, “what if everyone starts using that new language?”, “what if I'm wasting my time using the languages I've already mastered and everyone realized that the new language is the future?”

{{<ad2>}}

Does any particular language or technology come to mind?

## Differences between Fear Of Missing Out and Shiny Object Syndrome

Although both phenomena look similar, there are several differences, mainly in the effect they have on us.

| FOMO                                                                             | SOS                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Fear or anxiety of being left behind or left out                                 | Novelty is distracting                                       |
| Impacts on your well-being and social behavior                                   | Impacts on your productivity and concentration               |
| Can lead to over-committing to activities or experiences for fear of missing out | Leads to impulsive decisions to change projects or direction |

## Why is it important to consider FOMO and SOS in web development?

My examples above don't talk about any specific technology, but I'm sure several languages, frameworks and technologies came to your mind while reading the above paragraphs.

{{<ad3>}}

### Example of SOS and FOMO in web development

I will dare to name you some examples that crossed my mind while writing this post:
- [Graphql](/en/django/how-to-create-a-graphql-api-in-django-rapidly-using-graphene/): Adopted by many, many people even though they probably only needed a [REST API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}).
- [JWT](http://cryto.net/%7Ejoepie91/blog/2016/06/13/stop-using-jwt-for-sessions/#?): Used as an “enhancement” to sessions and authentication, even though [several computer security experts recommended not using them](https://redis.io/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/) that way.
- CSR, SSR and SSG: Developers quickly realized that it was always better to generate the HTML directly from the server or use static files, as had always been done, for many reasons including [SEO optimizing]({{< ref path="/posts/seo/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="en" >}}).
- AI: Not sure about this one, is this just more [AI overhype]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}), like crypto was, or we really are in front of a human revolution?
- WASM: It's not that WASM is not useful, quite the contrary, the thing here is that some folks thought that every site was going to be coded in Rust or some low level language, which of course didn't happen.

### Consequences of SOS and FOMO in web development

The FOMO and SOS can impact design decisions, architectures, stacks and we must be very careful not to rush when choosing something based on our emotions or hunches, our decisions must be based on rational arguments and must consider aspects such as the maturity of a technology (Such as [Django Framework]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}) or React), its stability over time, its future projection, how easy it is to find new developers who master it or, failing that, train the existing person and even aspects such as whether the respective project receives funding from third parties that allows it to continue operating.