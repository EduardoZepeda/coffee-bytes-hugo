---
aliases:
- /en/bolt-vs-lovable-vs-v0-vercel-for-landing-pages-comparison/
authors:
- Eduardo Zepeda
categories:
- opinions
- artificial intelligence
coverImage: images/bolt-vs-lovable-v0-vercel.jpg
date: '2025-06-03T16:01:02-06:00'
description: A comparison between Bolt, Lovable, and V0 Vercel for creating landing
  pages, advantages, disadvantages, shortcomings, and my opinion on the winner.
keyword: bolt vs lovable vs v0
keywords:
- bolt
- lovable
- v0
- artificial intelligence
- opiniones
- review
title: Bolt vs Lovable vs V0 Vercel For Landing Pages Comparison
---

All the tech influencers are spreading FOMO and talking about tools like Bolt, Vercel's V0, and Lovable. But I get it, [we're still in an AI bubble]({{< ref path="/posts/inteligencia-artificial/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}). 

Despite their non-realistic valuation, I'm astonished about what these tools can do without needing REST APIs, nor [Model Context Protocol]({{< ref path="/posts/inteligencia-artificial/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="en" >}}) integrations from the user. 

So, given the latter, I decided to try all three to create something simple, a fairly straightforward project: a landing page. 

For the prompt, I used something quite simple. I decided not to be too specific, because it's the kind of prompt that someone who isn't very familiar with the context of Large Language Models would use. That's why I kept it short, ambiguous, and not too specific.

> Create a fancy and highly interactive landing page with cyberpunk vibes and neon colors

## Trying to create a landing page in v0-vercel

The result from [Vercel's V0](https://v0.dev/#?) is pretty decent. 

The color palette is Cyberpunkish. I adored the background they used in the back, the landing page seemed a little simple to me, but it perfectly delivers on its promise.

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1752634111/coffee-bytes/v0_0_5mb_gkrgvn.mp4">}}

### I had troubles using V0-vercel

However, I encountered problems with local execution, specifically a couple of dependencies that were not compatible with each other, nothing too complicated to solve. 

I mention this because I found it quite strange given that everything seemed to be working perfectly on their platform, but when I wanted to replicate the project on my computer, it didn't work “out of the box.”

But putting that aside, I think the result is solid. 

## Trying to create a Landing Page in Bolt

[Bolt's](https://bolt.new/#?) proposal was my favorite of the three. Using the neon light effect on the letters seems like a good choice to me, as it perfectly reflects the cyberpunk aesthetic of novels like Neuromancer or video games like Cyberpunk 2077. 

Bolt's AI added images that match the color palette, and I also think the frame around the image is a nice touch. The icing on the cake is the glitch effect on the hero, which is often used in cyberpunk-style audiovisual material. 

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1752633837/coffee-bytes/bolt_d6pbio_05mb_bsyje5.mp4">}}

Simply perfect, I had no problems with the installation. What I did notice is that the code uses quite a lot of resources even when there is no interaction. I haven't reviewed the code in detail, but I plan to do so and update this post.

## Testing creating a landing page in Lovable

[Lovable](https://lovable.dev/#?) also delivers a functional landing page. However, I feel that this time it was a little too much for me.

The Matrix background, while I suppose it is related to the cyberpunk theme, given the nature of the film, I don't feel it is an element that should be integrated into a serious landing page (unless it is "Matrix: The movie" related).

In addition, I think it went a little overboard with all the effects. Everything on the page is interactive, everything vibrates and everything moves, so much so that it feels saturated.

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1752633780/coffee-bytes/lovable_no_sound_aokgmp_0_5mb_k12z7k.mp4">}}

While I am aware that these results can be refined after multiple iterations, when I see this, I can't help but think of a novice programmer who wants to incorporate absolutely all the effects they have just learned into a single web page.

In addition, the footer only has the logo and copyright notice, missing the other informational links.

### How to download lovable code?

Another aspect to note is that Lovable **does not allow you to download the code** (or at least I couldn't do so without a premium plan). So at this point, I consider it inferior to its competitors, which do offer the code for download without much hassle.

Maybe lovable devs could benefit from [fine tuning their models]({{< ref path="/posts/inteligencia-artificial/fine-tuning-de-un-modelo-de-inteligencia-artificial/index.md" lang="en" >}})

## Bolt vs Lovable vs v0 Vercel Results

If we consider only the result obtained, **I would say that Bolt is the winner**. 

In terms of the experience of using the tool, I consider it to be quite similar in all three cases. All three use interfaces that seem to be becoming standard, and the truth is that I can't even remember if there is any significant difference between the three options.

## Website creation using LLM is far from perfect

Something I found quite curious is that while there are subtle differences in terms of backgrounds, button sizes, interactions, and other visual elements, all three pages use exactly the same landing page layout: a navbar with a menu on the right side, the logo on the left side, all more or less at the same distance and with 3-4 sections.

### All LLM sites looks the same

It's not necessarily a bad thing, but it does take away from the website's personality. If you have a business, you don't want to look like your competition; you want to stand out, and for that you need a design that's different from the rest. One of the problems with LLMs is that they always return the most likely token, so the code they produce will be similar for all users who use it, probably with the same layout, color palette, and similar texts. 

This is bad news if you want a website that stands out from the crowd, as the only solution is customization, either by a professional or by spending hours on the model to get something different.

![All AI landing page looks the same](https://res.cloudinary.com/dwrscezd2/image/upload/v1752184598/coffee-bytes/ai-layout-landing_nsyj1p.png)

### LLM generators usually forget about SEO

One more thing that I noticed is the [lack of even the basics of technical SEO]({{< ref path="/posts/seo/guia-de-seo-tecnico-para-desarrolladores-web/index.md" lang="en" >}}), so don't count on taking your site to Google's first position without investing some time in it. But hey, the results were surprising and only one prompt was required.

Surprisingly, [unlike AI-generated art, this AI-generated code tools]({{< ref path="/posts/inteligencia-artificial/la-ai-se-percibe-de-manera-diferente-entre-artistas-y-devs/index.md" lang="en" >}}) went unnoticed by non-tech people.