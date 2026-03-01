---
date: '2026-02-27T15:50:49-06:00'
title: 'My n8n review after using it for half a year'
categories:
- n8n
- opinion
coverImage: "images/n8n-mi-impresion-y-opinion.jpg"
description: 'A minimalist summary of n8n, its elements, what it is used for, how it is used, what you need to know to use it, and my opinion on the good and bad aspects of this tool.'
keyword: 'n8n'
keywords:
- 'n8n'
- opinion
- automation
authors:
- 'Eduardo Zepeda'
---


I've been using **n8n** for a while now to automate processes on Facebook pages, websites, WhatsApp, and combining it with other tools. After this period of use, I think I can now share a somewhat clearer view of what this tool offers and whether it's really worth it.

If you've been living under a rock or you're new to the tech world, n8n is a pretty popular automation tool. Its main appeal is that it lets you create complex workflows in a very visual way: goodbye lines of code, hello nodes; it turns automation into a drag and drop game, here you just drag and drop boxes onto a canvas and connect them together.

{{< video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1772238652/coffee-bytes/n8n-nodes_ts1qya.webm" class="md-local-image" >}}

## What exactly can you do with n8n?

In practical terms, **almost anything**. The tool is incredibly versatile. You can have a process triggered by a specific event, like a message arriving on WhatsApp or Telegram, a new blog post via RSS, or even schedule it to run periodically (like a [classic Linux cron job]({{< ref path="/posts/linux/cron-y-crontab-programa-tareas-periodicas/index.md" lang="en" >}}) I mentioned in another post).

### Nodes in n8n

Everything in n8n revolves around **nodes**. These are blocks with a single, specific function that you visually connect to build your automation.

There's a huge library of "out of the box" nodes for almost all popular services, very mainstream: WordPress, Google Calendar, Telegram, and of course, most social networks. Nodes do specific things like: send an email, run every "x" minutes, monitor an RSS feed every "x" seconds. 

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238513/coffee-bytes/nodes-menu-n8n_meeonp.png" alt="Node menu in n8n" class="md-local-image"  width="383" height="529" >}}

There are also more low-level technical nodes for creating conditionals (`if` statements), loops, direct HTTP requests, or even running your own code in **JavaScript and Python**. Yep, you read that right, no Rust, Go, or other esoteric languages, just pure scripting languages to annoy the old-school devs.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238511/coffee-bytes/http-request-n8n_zrlgyh.png" alt="HTTP Request node in n8n" class="md-local-image"  width="415" height="579" >}}

These nodes are joined so that the output of one (or more) becomes the input of the other(s), and the structure resulting from several connected nodes can simply be called a flow, which is stored in JSON format.

You can watch a list flow as soon as you open the app.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772239025/coffee-bytes/flows-n8n_cb9psf.png" alt="List of flows in n8n" class="md-local-image"  width="1196" height="345" >}}

### n8n's Support for AI

Additionally, n8n offers support for artificial intelligence. It has **AI agent** nodes where you can connect [your favorite LLM model]({{< ref path="/posts/artificial-intelligence/fine-tuning-de-un-modelo-de-inteligencia-artificial/index.md" lang="en" >}}) (OpenAI, Cohere, etc.) to act as the brain for a task. It allows the LLM to connect to predefined tools, such as scheduling an event, returning a text message, like in the [Model Context Protocol]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="en" >}}), modifying an online Excel file, etc.

As you may know, these tools are just [MCP servers]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="en" >}}) under the hood.

### Database support in n8n

It also includes connectors to databases like Redis and tools that function as small servers to interact with external services.

### n8n manages your credentials

And not only that: it securely manages your **credentials** (encrypted, no exposed environment files), so you don't make the blunder of hardcoding them or leaving them in a file exposed to the outside.

### Flows in n8n can be exported

N8n allows you to save your flows as **templates** to reuse them or share them with colleagues or upload them to git.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238511/coffee-bytes/import-template-menu-n8n_ryscyv.png" alt="Menu to import and export flows in n8n" class="md-local-image"  width="158" height="295" >}}

It also has a dashboard to **monitor** all running flows, seeing which ones are working correctly and where errors occur so you can fix them instantly.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772239025/coffee-bytes/executions-logs-n8n_m4o0ex.png" alt="Summary of flows in n8n" class="md-local-image"  width="1196" height="441" >}}

## Can I use n8n without knowing how to code?

Yes and no. I don't plan to lie to you with some fake aspirational spiel like "learn n8n in 24 hours and start making thousands of dollars," but I'm also not here to dash your spirits by saying you can't do it if you're not tech-savvy.

So what's the deal? Look, my opinion is that if you understand the concept of a loop, an if/else condition, and you understand JSON format, you can already make very simple automations. To create something more complex, you'll need to round out your knowledge. You need to understand the following:

- [What a REST API is]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}})
- What the differences are between a GET, POST, PUT, PATCH, OPTIONS, HEAD, DELETE request, what each one is for and when to use them
- What headers are in the context of an HTTP request
- What parameters are in the context of an HTTP request
- How authentication in third-party services works via tokens
- What a webhook is
- Knowledge of the most basic functions of [Javascript and/or Python]({{< ref path="/posts/javascript/python-vs-javascript-2021-cual-es-el-mejor-diferencias-y-similitudes/index.md" lang="en" >}})

You'll probably have the bare minimum covered with that to start making things more complex. Also, I warn you, n8n is an automation tool. You're not going to create the next unicorn with it, and I haven't even mentioned how restrictive its license is.

## What I liked most about n8n

### Lots of functionalities out of the box

Without a doubt, the best part is the **ease of creating simple automations**. The visual part is great, but the real value is that many services come "pre-configured." You forget about having to deal with complex API calls or installing specific SDKs for each platform; most cases are already covered. You simply focus on the logic of your flow and plugging in the necessary API keys. The learning curve is very friendly.

### N8n is perfect to try ideas

N8n is the ultimate test tool, you can test automation ideas in record time, easily and in a more visual way even if you have zero experience with code.

### Easy to backup and replicate

The **JSON template system** also seems like a great feature to me. Being able to share a complex flow with a colleague without them needing the same level of technical knowledge speeds up teamwork immensely.

## What didn't quite convince me about n8n

### High overhead

But not everything is perfect. The main "but" I find is the excessive **resource consumption**. Which is, from my point of view, quite exaggerated. The official recommendations ask for no less than **4 GB of RAM, 2 CPUs, and 20 GB of SSD space**.

I can understand that underneath there's a server and infrastructure running, tons of installed SDKs, but for what is basically a flow manager, it seems excessive to me. I'm sure the same Python or JavaScript scripts that run those automations would run on less than half of these requirements.

Consider that most small companies are probably running about 5-10 flows, a VPS with 4GB of RAM and 2 CPUs to run 10 scripts... doesn't convince me 100%, especially for minimalist startups with limited resources.

### Manual updating

Another aspect that I don't find appealing is that n8n requires manual updating. You have to go into the terminal, update the package, and restart the services. Yes, it's true, you can schedule this update, but you run the risk that if n8n breaks something, your application will fail from one day to the next and you won't even know why.

### People overestimate n8n capabilities

Perhaps due to excellent marketing, people believe that n8n is a Swiss Army knife that completely replaces code, and so unrealistic expectations arise. No, n8n cannot serve the same number of requests as a dedicated server in Rust, Go, or any other low-level language. No, n8n is not a web scraper for concurrently scraping all the products of the largest e-commerce sites.

N8n is good for automating tasks by non-technical people, no more no less, that's all.

### n8n's license is more restrictive than people think

The other point that bothers me the most is the **license** issue. Unlike many popular open-source projects, **n8n does not use an MIT license**. In practice, this limits what you can do with it a bit. For example, [according to Reddit users, you are not allowed to host an n8n instance to charge clients for keeping their flows running](https://www.reddit.com/r/n8n/comments/1mo4a5h/what_youre_selling_is_illegal_n8n_license/) (an "automation as a service" model).

What you *can* do is offer consulting or implementation services, but not direct hosting. I understand that such an ambitious project requires a sustainable business model, but it's a restriction to keep in mind if you're looking for maximum freedom.

I took this from a Reddit post, it's not any kind of legal advice and take it with a grain of salt:

> ✅ What you CAN do
> 
> - Use it internally within your own business for free.
> 
> - Build automations for clients using their own n8n installation.
> 
> - Charge for workflow creation, setup, and maintenance, but NOT for hosting or “selling n8n as a service.”
> 
> 🚫 What you CANNOT do
> 
> - Offer n8n as SaaS (Software as a Service).
> 
> - Do white labeling (remove n8n branding and replace it with your own).
> 
> - Charge customers to use “your” hosted instance of n8n.

Before blindly believing it, make sure to check [n8n's official license](https://docs.n8n.io/sustainable-use-license/) here.