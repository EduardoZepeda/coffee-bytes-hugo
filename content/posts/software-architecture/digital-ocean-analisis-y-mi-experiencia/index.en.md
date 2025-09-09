---
aliases:
- /digital-ocean-analysis-and-my-experience-as-a-user/
- /en/digital-ocean-analysis-and-my-experience-as-a-user/
- /en/software-architecture/digital-ocean-analysis-and-my-experience-as-a-user/
authors:
- Eduardo Zepeda
categories:
- software architecture
- opinion
coverImage: images/Mi-experiencia-digital-ocean.jpg
coverImageCredits: credits https://www.pexels.com/es-es/@elaine-bernadine-castro-1263177/
date: '2021-01-14'
description: This is my Digital Ocean review, I'll let you know about my experience of it using it to host all of my personal projects so far.
keywords:
- digital ocean
- opinion
- kubernetes
- deploy
- cloud
- iaas
- paas
- vps
title: My Digital Ocean review, analysis and my experience as a user
---

I've been using Digital Ocean for my personal projects for several years, so Let me tell how it has been so far and what can of services you can find there.

## Droplets or VPS on Digital Ocean

Droplets are my favorite resource in Digital Ocean. Droplets are virtual servers that are rented to you by hour. When you create a Droplet you can choose different operating systems and versions. You can access the terminal of any Droplet through its web page or through the [ssh command]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="en" >}}).

Once you click the button a Droplet is available in less than a minute.

{{< figure src="images/Droplets-de-digital-ocean.png" class="md-local-image" alt="Images available for Digital Ocean droplets" >}}

### Customized images in Droplets

If you don't want to start from a brand new operating system installation you can opt for some more specific **images that include pre-installed software for the most popular software requirements**: web development, data science, blogging, frameworks, media, storage, elearning, ecommerce, etc.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1755547051/Marketplace-digital-ocean_q3h4lb.png" class="md-local-image" alt="Images available for Digital Ocean droplets" >}}

For example, you can choose an Express JS template and it will have Node installed and an Express server running 

#### Installing n8n on Digital Ocean

Or more recently, you can install n8n with just one click and pointing your DNS records to a custom subdomain using n8n's template.

Customized images will save you some time configuring the operative system and sometimes it is just a matter of CTRL + C and CTRL + V to get your app running. I've used Django, Wordpress and MERN stack, can recommend them.

### Droplets according to your needs

Digital Ocean also has specialized Droplets, either in CPU, memory or storage and a general purpose version. But you're not here for that, right? You're probably on a Budget, don't worry, we're all.

Digital Ocean offers some of the most basic, and cheapest VPS out there (except for Hostinger and Akamai, but I'll talk about it later). 

{{< figure src="images/Droplets-purpose.png" class="md-local-image" alt="Types of plans for Digital Ocean" >}}

### The cheap but reliable VPS of Digital Ocean

Ok, but what's the price? Well, the answer is obvious: it depends.

Just to give you an idea, the cheapest Droplet costs ~~$5 usd per month~~ $4 usd per month. That's practically nothing and for a small website it's usually more than enough. By way of comparison, Vercel hosts your application for free with certain limitations, their next plan, at the time of writing this article, costs $20 usd per month.

Let's suppose you can serve 1 RPS with that, that means 60 requests in a minute 3600 in an hour and 86400 in one day. If you can't monetize with that traffic you don't have technical problem, but a marketing problem. Remember, [don't obssess about your web application performance]({{< ref path="/posts/opinion/la-obsesion-por-el-rendimiento-y-la-velocidad-en-programacion/index.md" lang="en" >}}).

#### Do VPS use HDD or SSD?

Notice how all plans handle storage with an SSD, so don't worry about r/w speed.

{{< figure src="images/Precios-digital-ocean.gif" class="md-local-image" alt="Prices of the different plans offered by Digital Ocean" >}}

### Cloud provider with servers around the world

Digital Ocean has servers in different locations around the world. So you always have an option close to your customers. Remember that a long TTFB is a [technical SEO mistake]({{< ref path="/posts/seo/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="en" >}})

I have ONLY used the servers in the United States and Canada, due to the proximity to Mexico, and I have not had any problem so far. Also I'm aware that they have servers in Europe and Asia, so feel free to try them.

{{< figure src="images/diferentes-ubicaciones-droplets-digital-ocean.png" class="md-local-image" alt="Digital Ocean Server Locations" >}}

## Digital Ocean vs Hostinger

I found that Hostinger VPS are way cheaper then Digital Ocean, they practically double the resources being offered by Digital Ocean. However, I've listened to a few complaint from devs on facebook, I haven't tested Hostinger though, but just look at this [Reddit Thread about digital Ocean vs Hostinger](https://www.reddit.com/r/webhosting/comments/1h0x6fh/is_there_a_catch_here_why_choose_digitalocean/#?), notice how it seems to be of common knowledge that you shouldn't trust Hostinger, nothing against hostinger but the comments scared me away. 

I really don't want to deal with problems for such small difference in price. If you have any experience using Hostinger that can be double-checked, I'd be happy to update this post and include your opinion.

## Renting LLMs on Digital Ocean

The other day I was checking my invoices and realized that they're now offering LLM on demand, and not only ChatGPT, but a lot more, each one of them with its own price you can connect them to your Droplets, Apps or services and use them, they will take care of the rest. The prices can change, so don't rely on this image, use it only as a reference.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1755547643/Digital-Ocean-AI-models-available_t15vfg.jpg" class="md-local-image" alt="Digital Ocean Server Locations" >}}

Check, you can get 1M tokens for just $1 USD for Deep Seek model.

This is just awesome, no need to install Ollama, forget about renting a GPU or paying for a monthly plan on OpenAI, just pay for what you use. Perfection.

## Other services available on Digital Ocean

Do you remember that IAAS and PAAS companies exist? Well, many IAAS companies, Digital Ocean included, have grown a lot and have started to provide PAAS type services. And, as you might expect.

It has little time offering the integration and deployment of your applications using your Github or Gitlab repositories. You put the code on the table and they take care of compiling and running your project.

{{< figure src="images/Digital-Ocean-Apps.png" class="md-local-image" alt="Apps Service" >}}

### S3 equivalent in Digital Ocean

Digital Ocean also offers CDN services, called spaces, compatible with Amazon's S3 starting from $5 usd per month.

### Kubernetes clusters in DO

Digital Ocean provides Kubernetes clusters with storage and load balancers with a few clicks.

### What are Apps for?

Apps are probably the most underrated service that DO offers, I have two of them running for free.

The apps are similar to a serverless solution, you connect your github, gitlab or bitbucket account with digital Ocean and you can upload Node apps or static files for them to serve, you can even specify them to run the compilation or any command you want. This is, so far, **the cheapest solution offered by Digital Ocean** and it is excellent for handling Frontend applications, they take care of CI/CD and it's super cheap.

Static sites get no extra cost and they run pretty well. In fact, this blog is running on one.

### Volumes

They are extra space that you add to the droplets to increase their capacity, as if you were connecting an extra hard disk to them.

### Databases

Self-managed databases with automatic backups and optional encryption. Handles Postgres, MongoDB, MySQL and Redis.

## Digital Ocean vs AWS vs Azure which one is better?

Ah, the eternal question, but there is no correct answer, only trade-offs.

Digital Ocean is a service focused more on small and medium projects, it does not have as many solutions as AWS or Azure. 

On the other hand, cccording to the content I studied for the [Azure AZ-900 Certification]({{< ref path="/posts/software-architecture/examen-certificacion-azure-az-900-mi-experiencia/index.md" lang="en" >}}), Microsoft's platform has a myriad of services, you name it.

What other services? well, it does not have solutions in artificial intelligence for IT security analysis, big data analysis or other SaaS options. But, in exchange for these shortcomings that leave it up to developers, it offers much more competitive prices than the big players.

## My experience using Digital Ocean so far

I have used Digital Ocean to host personal projects and also to manage my domains. I haven't had any problems with down servers so far, or at least not that I've noticed or any user has brought it to my attention. In fact, right now you are reading this ~~from a Droplet using a headless Wordpress and frontend frontity (A React framework) served with Nginx~~ Hugo and hosted at Digital Ocean. This blog uses ~~the cheapest service, the $5 usd~~ the App service, which is completely free for static sites, and the truth is that for the ~~mediocre~~ amount of traffic I have it doesn't feel slow at all and has decent Lighthouse metrics, no caching of any kind or any sophistication.

{{< figure src="images/Coffeebytes-lighthose-indicadores.png" class="md-local-image" alt="Indicadores de Lighthose para coffeebytes.dev" >}}

~~It should be clarified that I did modify some things from the default settings to have a better performance. For example, enabling HTTP2, instead of the default HTTP, as well as installing the HTTP certificate using cerbot in the terminal, as the default installation did not include it. Extra tasks that other hosting services would have solved for me, such as [easywp](/en/linux/my-experience-using-easywp-and-namecheap/).~~

## Summarizing my experience using DO

My experience has been quite good, I have no no complaints in terms of the performance they promise.

If you don't want to mess with Apache, Nginx or any other server configurations, maybe a Droplet from Digital Ocean is not your best option.

From my perspective, Digital Ocean offers one of the best costs to start a project; $3 usd for the most basic package (Apps) is an **incredibly low price** for static or Frontend based pages only.

{{< box link="https://m.do.co/c/a22240ebb8e7" type="info" message="If you decide to try it, I'll give you $200 USD to try and see for yourself what Digital Ocean has to offer, just click on this banner.">}}