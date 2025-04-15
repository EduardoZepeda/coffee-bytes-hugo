---
date: '2025-04-14T00:02:21-06:00'
title: 'A Technical SEO Basics Checklist Made For Web Developers'
categories:
- seo
- opinions
coverImage: "images/technical-seo-checklist.jpg"
description: 'My Technical SEO Basics Checklist For Web Developers, the minimum you need to do when it comes to the Technical SEO of a website: sitemap, robots, schema markup'
keyword: Technical SEO basics
keywords:
- 'guia'
- 'seo'
- 'desarrollo web'
- 'opiniones'
authors:
- 'Eduardo Zepeda'
---

Previously I told you how [I made many mistakes in SEO]({{< ref path="/posts/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="en" >}}) when I migrated my website from Wordpress to Hugo, after that I started watching a lot of videos about SEO, especially Romuald's videos (He is one of the biggest SEO influencers in Spanish speaking countries), I've also read [The art of SEO](https://amzn.to/42uNZrv#?) and I tried to summarize everything I learned from him and the book in a short post, just for you, before [AI bubble]({{< ref path="/posts/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}) explodes, taking SEO with it.

![Romuald Fons Video thumbnail](https://res.cloudinary.com/dwrscezd2/image/upload/v1744676557/coffee-bytes/romu-seo_d3i3l9.jpg "My totally reliable source: Romuald Fons")

I decided to focus on technical SEO because it's the one that I understand, it's less subjective and I'm more familiar with it.

I have examined many websites and I have noticed that many professional web developers leave SEO out completely from their developments, it is certainly true that it is quite an extensive topic and it is far from what their expertise area, in my opinion, doing an average SEO is better than ignoring the topic entirely.

Simplifying SEO criminally, it can be divided in two:
- **Technical SEO**: all those objective, measurable aspects, like the presence of a sitemap, meta tags, etc.
- **Content SEO**: it's a bit more subjective, it's about what words to use, what sites to connect with

## SEO is a black box and an art rather than science

Nobody knows exactly how the search engine algorithm works, so getting to the number one position in Google, or other engines, for a certain search keyword, is more of an art than a science. 

Even if you manage to vaguely understand how the algorithm works enough to manipulate it, you will have to face the fact that **the algorithm is a shape-shifting entity** and what worked perfectly yesterday may not work today.

![google's algorithm update meme](https://res.cloudinary.com/dwrscezd2/image/upload/v1744675606/coffee-bytes/google-algorithm-update-meme_yd9cb0.jpg)

Despite the changes in the SEO world, the current SEO approach is still heavily tied to keywords; short phrases that you include in your website to tell search engines what your website content is about, so it can show it to the right users. 

However, lately, Google has said that its algorithm is so sophisticated that it manages to evaluate how well a website responds to *user intent* and invites its users [to focus on resolving user intent](https://about.google/company-info/philosophy/) rather than keywords. Although, paradoxically, their advertising services are still strongly keyword oriented.

## Technical SEO in web development

Technical SEO consists of a series of requirements that a website must meet to appear friendly to search engines, so that they index you in high positions and when a user searches in serach engines, you appear in the top positions.

This topic is very broad, but I hope to summarize in a way that you have a general idea and do not get lost in the sea of information that exists.

### Sitemap.xml is the most important one of technical SEO basics

This is probably the most important element of technical SEO basics. A sitemap will tell search engines what pages your application has.

![Sitemap diagram showing available urls](https://res.cloudinary.com/dwrscezd2/image/upload/v1744677728/coffee-bytes/robots-sitemap-relationship_fnzjlr.png "Sitemap diagram showing available urls")

In many cases, a sitemap can be generated dynamically, some frameworks even have tools that allow you to do it in a few lines, such as [Django (using its sitemap class)]({{< ref path="/posts/sitemap-dinamico-con-django/index.md" lang="en" >}}).

Once created, you must tell the search engines where the url of your sitemap is located directly from your administration panel. If you don't explicitly indicate it, they will search in the most common urls or, luckily in the *robots.txt* file.

![Screenshot of Google's search console sitemap section](https://res.cloudinary.com/dwrscezd2/image/upload/v1744673455/coffee-bytes/screenshot-sitemap-google_zx6kdr.png "Screenshot of Google's search console sitemap section")

### Robots.txt

A *robots.txt* file will guide search engines and crawlers on which URLs to ignore and which to inspect. In addition this file should include the location of the sitemap.

The URL for this file is always expected to be */robots.txt*, so stick to this convention.

Here is an example of a *robots.txt* file

``` bash
User-agent: *
Disallow: /*/tags/
Disallow: /*/categories/
Disallow: /*/search/

Sitemap: https://example.org/sitemap.xml
```

#### A robots.txt file is not for blocking crawlers or bots.

There is some confusion about this, and it's pretty obvious but I'll mention it anyway: **crawlers can completely ignore the instructions in your robots.txt file**, so you should not see it as a protection mechanism for your website, if a crawler wants to, it will ignore the instructions contained there.

![Robots.txt meme](https://res.cloudinary.com/dwrscezd2/image/upload/v1744680644/coffee-bytes/robots-txt-meme_qzyqxq.jpg "Robots.txt won't protect you from crawlers")

If any influencer tells you otherwise, they're lying through his teeth. Furthermore, I dare them to stop a crawler just by using a *robots.txt* file.

#### Robots disallow everything

If you want to tell crawlers to ignore absolutely everything on your site, you could use something like:


``` bash
User-agent: *
Disallow: /
```

#### The counterpart of robots.txt: humans.txt

As a curious fact, there is an initiative to popularize the idea of adding the counterpart of the *robots.txt* file, a [*humans.txt* file](https://humanstxt.org) and show the human part behind a web site, the soul in the machine or in the console (the "Ghost in the shell"?), I think it is a very nice idea to know how are the humans behind a web site. Unfortunately this project has little diffusion to date.

### The often ignored Schema markup

Often present as a *ld+json* type *script* tag (although there are other valid formats), which can be found anywhere in your HTML document, it tells search engines what elements your web site has and how they relate to each other.

![Schema Markup diagram](https://res.cloudinary.com/dwrscezd2/image/upload/v1744678359/coffee-bytes/schema-markup-diagram_1_laalzs.png "A Schema will provide information about the contents of a webpage")

The different types of Schema are very complex and it is a whole topic to discuss, since they vary greatly according to the type of website. 

A website that sells electronics will have a completely different set of Schema properties than a restaurant website, or a web application.

If you are completely lost, here is a prompt you can use for guidance, just write it to ChatGPT, DeepSeek or any other competent LLM: 

> You are an SEO expert, create the content of a ld+json tag, based on schema.org features, for a web page whose main topic is "x", the content of the page consists of "y", you can use placeholders for the variables using the following format: "z", please.

Once you get the result corroborate it with the official documentation or with your [schema markup validation tool](https://validator.schema.org/).

### Presence of Meta tags

The metatags that go in the *head* tag of your HTML are metadata about the content that can be used to help search engines understand your site better.

Within the metatags are especially important the Open Graph, as they are the standard for social networks to obtain information from your web pages, these meta tags are the ones that make one of your links look like this when you share it on social networks.

![Social networks use metatags to display relevant information on a page.](https://res.cloudinary.com/dwrscezd2/image/upload/v1744673982/coffee-bytes/og-meta-tags-visualized_vt8xkh.png "Social networks use metatags to display relevant information on a page.")

There are some [meta tag generators](https://www.seoptimer.com/meta-tag-generator#?) that you can use to generate all the boilerplate, or simple ask chatGPT.

### Good performance is generally overrated in technical SEO basics

A website must provide a good user experience and be responsive, it matters, yes, but not as much as you think. 

Content plays a much more important role than the speed of your website, it is common to see websites that are poorly optimized but with a good ranking in search engines, but don't blindly trust me, double-check it, check google's first page results using the following tool.

![Lighthouse score for my portfolio page](https://res.cloudinary.com/dwrscezd2/image/upload/v1744674198/coffee-bytes/Lighthouse-score-for-zeedu_xb0ekq.png "Lighthouse score for my portfolio page")

Tools like [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) are very useful to measure the performance of a website and also tell you how to improve it.

IMO this is one of the most overrated technical SEO basics' aspect.

### The most overlooked aspect of a technical SEO checklist: Well-designed website architecture

Make sure the website has a structure that allows search engines to "understand" it. What do I mean? I mean that the website is organized in a logical and hierarchical way that is understandable. 

For example something similar to this:

![Semantic structure of a website](https://res.cloudinary.com/dwrscezd2/image/upload/v1744674678/coffee-bytes/diagram-website-structure_kfhxde.png "Semantic structure of a website")

#### Does the URL structure matter in SEO?

Yes, and a lot, you can use the urls to give your website the structure you think is correct so that it is coherent with the architecture you plan, this makes it easier for search engines to “understand” your website.

I've talked about this on my post [REST API: Best practices and design]({{< ref path="/posts/buenas-practicas-y-diseño-de-una-api-rest/index.md" lang="en" >}})

In the following URLs, notice how there is no way to know if Nawapol is a movie, or a director or a documentary:

``` bash
/session-9/
/50-first-dates/
/nawapol-thamrongrattanarit/
/salt-of-the-earth/
```

It would be best to provide them with a consistent and more explicit structure:

``` bash
/movies/psychological-horror/session-9/
/movies/comedy/one-hundred-first-dates/
/documentaries/photography/salt-of-the-earth/
/directors/nawapol-thamrongrattanarit/
```

### You're probably not using the correct HTML tags

#### Headings and SEO

Headings are the most important tags of your content, as they tell search engines how it is organized.

Make sure you use only one h1 tag, and hierarchical h2 tags up to h6, using them to give a hierarchical structure to your website.

#### HTML allows you to be very expressive in SEO.

Make sure you use only one h1 tag, and hierarchical h2 tags up to h6, using them to give a hierarchical structure to your website.
There is much more to it than divs, anchors, img tags and video tags. HTML provides tags to help search engines and devices to better understand the content of a web page. Don't just stick with those elements and research the rest of the HTML tags, such as:

- *article*: Self-contained content that could be distributed independently.
- *section*: Thematic grouping of content, typically with a heading.
- *nav*: Navigation links for the document or site.
- *footer*: Footer for a section or page, often containing metadata.
- *datetime*: Machine-readable date/time (used within *<time>*).
- *aside*: Content tangentially related to the surrounding content.
- *header*: Introductory content or navigational aids for a section/page.
- *progress*: Displays the completion progress of a task.
- *meter*: Represents a scalar measurement within a known range.
- *cite*: Citation or reference to a creative work (e.g., book, article).
- *q*: Short inline quotation (browser usually adds quotes).
- *pre*: Preformatted text, preserving whitespace and line breaks.
- *kbd*: Keyboard input, indicating user-entered keys.
- *samp*: Sample output from a program or computing system.
- *dfn*: Defining instance of a term (often italicized).
- *output*: Represents the result of a calculation or user action.
- *abbr*: Abbreviation or acronym, optionally with a title for expansion.

### Presence of internal links

They help search engines understand how your pages are related to each other. Make sure your links are valid and do not return 404 errors, and that the text you link to is related to the content of the linked page.

``` html
✅ <a href="/how-to-code-clean-code">How to code clean code</a>
✅ <a href="/how-to-code-clean-code">Learn how to code clean code</a>
❌ <a href="/how-to-code-clean-code">Click here to read my new entry</a>
```

### Presence of external links 

External links, consider it as a vote in favor towards other websites to indicate to search engines that the content you link to is important, research thoroughly about the attributes *nofollow*, *follow*, *ugc* and *sponsored* in the anchor tags and use them appropriately according to your intentions.

* *follow*, the default value, tells search engines that the site they link to should be positively valued.
* *nofollow*, search engines should not follow this link, ideal for advertising links, affiliate links or websites you want to link to but do not want them to be related to your content.
* *ugc*, acronym for “User generated content”, ideal for social networks.
* *sponsored*, sponsored link, usually advertising or affiliate links.


``` html
<a href="https://example.org/" rel="nofollow">The example website</a>
<a href="https://user-website.com" rel="ugc">Just check my website</a>
```

### The Flesch Kincaid test 

is a test based on the level of education required by a hypothetical reader to understand the content of your website, ~~unlike what your inflated ego thinks~~, the higher the score the easier it will be to understand, which is better because it will be available to more readers.

Having said that, I would dare to say that the exact value does not matter so much, but that your text is easy to read and the reader flows through it.

Keep in mind that there are some plugins, like Yoast SEO if you use Wordpress, that take care of measuring it or you can program it yourself.

I have left some aspects that I do not consider so important, but that maybe I will add later, the important thing here is that you understand that it is not just to set up a website and that's it, but you have to polish it so that users can find it and use it.

### HTTPS instead of HTTP

It is quite rare to find modern websites that do not use HTTPS, especially when it is the hosting platforms that are responsible for configuring the servers automatically. In any case, make sure that your website uses HTTPS instead of just HTTP, as search engines favor secure connections.

And that's all for now, I will be adding more information to the article if I consider it pertinent as the days go by.