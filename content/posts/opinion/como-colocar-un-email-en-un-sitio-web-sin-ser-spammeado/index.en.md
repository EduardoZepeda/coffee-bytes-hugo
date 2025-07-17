---
aliases:
- /en/how-to-avoid-spam-when-putting-an-email-on-a-website/
authors:
- Eduardo Zepeda
categories:
- opinion
- seo
coverImage: images/how-to-avoid-spam-when-putting-an-email-on-a-website.jpg
date: '2024-05-29T14:46:07-06:00'
description: There are ways to prevent spam when puttint an email address on a website,
  like turning it into an image, encoding it and using a different notation to hide
  it
keyword: avoid spam
keywords:
- seo
- opinion
title: How to avoid spam when putting an email on a website?
---

Sometimes we want to put an email on a website but without exposing it to be read by some random bot that includes us in an advertising list, reminding us of our problems to start a physical relationship with the two mature women who live less than two kilometers away. And since we don't want that, there are several things we can do to solve this and here I present some solutions, the last one is the one I usually use and also my favorite.

{{< figure src="images/prince-from-nigeria-scam.jpg" class="md-local-image" alt="Classic scam email from a Prince from Nigeria" >}}

## Convert your email to an image and avoid spam

This way to protect your email address requires no detailed explanation, just turn your email into an image and place it, your address will be safe from any text scraping bot, but it will be vulnerable to any bot with [OCR (Optical Character Recognition) capabilities, bots with pytesseract for example](/en/python/ocr-with-tesseract-python-and-pytesseract/), which I predict will be few if any.

{{< figure src="images/email-image.jpg" class="md-local-image" alt="email address in an image" >}}

The disadvantage of this approach is that the person who wants to send you an email will have to type it in manually, as they can't copy-paste, and you know that every extra step adds friction to the conversion process.

{{<ad>}}

## Use a different email notation

Instead of using the classic format like *my@email.com*, change it to something less obvious to bots, like *my [at] email [dot] com*, this way your address won't be detected as an email by less sophisticated bots and if someone wants to send you an email just replace the *at* and *dot* with their corresponding symbols.

A pretty balanced option in my opinion, although if it becomes popular I'm sure my blue pill factory ambassadors will find a way to get the valuable information they need.

## Ask the user to generate the email with extra information

Another way is not to put the email directly, but a hint as to how it can be deduced, for example if the site is called *lain.com* you can write a text as a hint that says something like: 

> *"My email is the name that appears in the url and is a google email address"*. 

With that we will understand that the address is *lain@gmail.com*.

Just try not to complicate things too much here, don't overestimate the deductive capabilities of the average web surfer.

## Use a form instead of an email address

Another option is to completely forget about placing your email and use a form instead, this way your email will be safe from spam and you can direct the emails to a unique account that you use for that single purpose.

### Protect your form from spam with a captcha

Of course some bots will try to fill out the form to send you advertisements but you can always use [a strong captcha to protect yourself from spam](/en/opinion/my-analysis-of-anti-bot-captchas-and-their-advantages-and-disadvantages/)

{{< figure src="images/captcha-frieren-fern.webp" class="md-local-image" alt="Anime captcha image from Freiren" >}}

### Use custom email spam filters

If you don't want to use captchas you can leave the responsibility of recognizing spam to your email provider's filters, or use a customized filter created by you and combine it with some instruction like: 

> *"To know that you are not a bot, please include the word *jelly bean* in your email. ”* *.

Now just set up your filter and automatically delete all emails that do not meet this condition.

## Avoid spam generating your email dynamically

This is my favorite, to achieve this we can use some kind of simple encryption, or even base64, **encode our email address in base64 and then decode it in the frontend dynamically using Javascript**, this way the bots will only see a bunch of numbers and letters in the source code, to read the email they will need to render the page with javascript enabled, which eliminates those bots that only read the source code of the response.

``` javascript
// this comes from the server
const encodedEmail = "eW91YXJlY3VyaW91c0BpbGlrZWl0LmNvbQ=="
// atob decodes from base64
const decodedEmail = atob(encodedEmail)
```

For an ordinary user, the email will be displayed as if it were included in the source code of the page.

### Generate an email dynamically with user interaction.

To make this protection method more secure we can delay the decoding until the user presses a button, scrolls, makes a mouse movement or even use the intersection observer to decode it only if the email is on screen; the limit is your imagination.