---
aliases:
- /en/to-program-a-blog-or-to-use-wordpress/
authors:
- Eduardo Zepeda
categories:
- opinion
coverImage: images/porque_decidi_usar_wordpress.jpg
date: '2019-06-26'
description: Many times we face the doubt of programming a blog from scratch or using
  a more popular solution like wordpress. In this post I explain my opinion.
keywords:
- wordpress
- opinion
- hugo
- react
- frontity
title: To program a blog or to use wordpress?
---

The other day a person asked me why I use Wordpress for my blog if I could develop a website by myself. In the post where I explain [how I learned to program](/en/opinion/hello-world-how-did-i-learn-to-code/) I even talked briefly about my lousy experience with PHP. So why did I choose Wordpress instead of developing my own blog from scratch? The answer to that is simply that, **for this blog, I want to write text, not code**. I don't want this blog to become a project to develop along with creating posts. I want something that works with a couple of clicks and forget about it completely. Let's not lose sight of the fact that the purpose of a personal blog is to write on it constantly, not to program it constantly. It's sad to see so many developer blogs using the newest technologies and super up-to-date, but with very few entries.

## What I miss when using wordpress

Certainly when using Wordpress you lose a lot of customization power, both at code and design level. I can only access what is already available, modifying the wordpress core would be a task that would not pay the right dividends. In the same way, by using Wordpress I am giving up new features in the programming world, such as SPA (out of the box, of course), SSR and other wonders that are probably not available for Wordpress. I also miss the pleasure of writing modifications using languages like javascript or Python, instead of PHP.

{{<ad>}}

## What I earn by using wordpress

Wordpress is a very popular system on the Internet and already has thousands of solutions to the most common problems. There are plugins to check my SEO, to correct my writing, to prevent comment spam, to integrate Wordpress automatically with MailChimp, to link post scheduling with social networks using hootsuite, to optimize images and thousands of templates made by designers much more talented than me. Yes, I know you could schedule all that too, but it's time consuming and that time could be used to write more posts or schedule other websites.

## My experience so far with wordpress

To tell the truth this is the first time I create something with wordpress. Installing it in [Digital Ocean]({{< ref path="/posts/software-architecture/digital-ocean-analisis-y-mi-experiencia/index.md" lang="en" >}}) was quite easy and in less than 5 minutes I had a perfectly functional blog online, ready to start publishing in it and with an arsenal of tools to facilitate my work. My only two problems (if you can call them that) were two; the first one, the high spam content; the second one, apache2 does not serve content using http2 by default, so I needed to go to the terminal to modify the Apache2 configuration. Other than that, I have not had any problems with Wordpress, no data loss, no bugs in the code; my website runs relatively well, with very good metrics in [lighthouse](https://web.dev#?).

{{< figure src="images/web_core_vitals_de_mi_blog.png" class="md-local-image" alt="Web core vitals de coffee bytes" >}}

## Developers' hatred of wordpress

I've heard that hating Wordpress among developers is all the rage and I understand their sentiment but only to a certain extent. I think Wordpress is an excellent system for blogging because it is super friendly to the end user. I have been in charge of a company and I know that the end customer does not want to understand technical terms, he is not interested in what is node, nextjs, vercel or what is an XSS attack, what the customer wants is to be able to modify a site at will without having to call a web developer every week. Is it the right thing to do? Well I think it depends on the project, for personal blogs or smaller projects yes, for something much more sophisticated you would have to educate the client and explain the pros and cons of using a CMS like wordpress in the short, medium and long term.

On the other hand, I totally agree with the developers when they say that using Wordpress for ecommerce, photo galleries or any other application is a lousy idea, I totally share their feeling. As I wrote before, I think that in those situations where you need a much more customized solution you have to move on from Wordpress completely. However, it is the developer's job to explain to the client the added value that a customized website, programmed from scratch, can bring to their brand.

{{< figure src="images/wordpress-meme.jpg" class="md-local-image" alt="Rapper wordpress meme" >}}

## TLDR;

In short, I would use wordpress only for personal blogs. However I would avoid using wordpress for photo galleries, ecommerce or any other type of website that requires a bit more customization.

## Update, why I don't use wordpress anymore for this blog?

Update 18-Feb-2021: I decided to combine the best of both worlds; a frontend written using the new Javascript technologies and a robust wordpress backend. To do this I used [Frontity, a React framework for wordpress](https://frontity.org/#?). The navigation is much smoother and I can customize the UI it to my liking. And, since the backend of my blog is still wordpress, I can still use Yoast SEO and the wordpress post editor, from which I am writing this post.

Apr-2022 update: I switched to Hugo, an SSG written almost entirely in Go, generates static sites in about 1ms per page, uses Markdown to generate the pages and has a lot of built-in features.

I really love Hugo, it allows me to forget about multiple security issues, and keep updated package versions in npm and so on. I have been using it for a short time but I love it, the only bad thing is the learning curve. 

But make no mistake, I still consider Wordpress to be the best option for most people who want to start a blog, Hugo requires too much technical knowledge to be useful for everyone, its community is much smaller and most of the "out of the box" solutions are outdated and not as numerous as in Wordpress. I also miss certain plugins like Yoast, which took care of SEO while creating a post and with which I didn't [have to worry about making beginner mistakes in the SEO of the page]({{< ref path="/posts/seo/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="en" >}}).

I even developed my own minimalist theme, with just the basics according to my needs, [the code is on my github](https://github.com/EduardoZepeda/hugo-theme-latte#?), so if you're curious you can check it out anytime.