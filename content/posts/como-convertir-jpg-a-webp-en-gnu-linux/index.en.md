---
title: "How to convert jpg to webp on GNU Linux?"
date: "2020-09-10"
categories:
- linux and devops

coverImage: "images/Convierte-a-webp.jpg"
description: "A couple of weeks ago I wanted to convert my ecommerce images from jpg to webp. Normally to modify images in GNU/Linux I use GIMP..."
keywords:
- linux
- frontend

authors:
- Eduardo Zepeda
---

A couple of weeks ago I wanted to convert my ecommerce images from jpg to webp. Normally to modify images in GNU/Linux I use GIMP or imageMagick, but neither of these two have native support for webp, or if they do I'm so clueless that I didn't notice.

And why not use online conversion? Well, it's a good option for a couple of images, but when you convert a lot of images... it becomes tedious, and why not do it directly in our OS?

## Why should I use webp?

The JPG format has been around for some time but new formats have emerged that promise **the same quality with a smaller file size**. One of them is webp, developed by google.

Less weight in our images means better performance. A website that loads faster will have better [Lighthouse](https://web.dev/) metrics and lower data consumption for the user.

## Downloading webp

The first step to transform our images to webp format is to download the appropriate libraries. The package we need to transform our images is called webp and is found in the repositories of popular GNU/Linux distributions. Let's install it.

If the following command does not ring a bell or you want to brush up on the basic GNU/Linux commands please visit my entries where I talk about the [most common GNU Linux commands](/blog/basic-linux-commands-you-should-know/).

```bash
sudo apt install webp
```

For this entry I will use a free image, in 1920 x 1280 resolution, that I downloaded from [pexels](https://www.pexels.com/photo/tan-coconuts-placed-atop-brown-wooden-table-1120963/), you can use any image you want, even the picture of your dog.

The size of my image is 476 Kb.

```bash
$ du -h pexels-artem-beliaikin-1120963.jpg
476K pexels-artem-beliaikin-1120963.jpg
```

## Convert from jpg to webp

After installing webp, the _cwebp_ command will be available, yes, with the letter "c" at the beginning; I also got confused and wanted to use it as plain webp at the beginning.

The cwebp command will help us to convert our image and it is self-explanatory; we just place the image we want to convert and specify the name of our output file with the _-o_ option.

```bash
cwebp pexels-artem-beliaikin-1120963.jpg -o imagen_procesada.webp
Saving file 'imagen_procesada.webp'
File:      pexels-artem-beliaikin-1120963.jpg
Dimension: 1920 x 1280
Output:    226348 bytes Y-U-V-All-PSNR 38.69 45.41 46.33 40.05 dB
block count:  intra4: 7027
              intra16: 2573  (-> 26.80%)
              skipped block: 454 (4.73%)
bytes used:  header:            276  (0.1%)
             mode-partition:  32578  (14.4%)
 Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
    macroblocks:  |       5%|      15%|      27%|      51%|    9600
      quantizer:  |      36 |      33 |      27 |      21 |
   filter level:  |      11 |       7 |      30 |      33 |
```

Ready, now we must have a file with extension _webp_ in our same folder.

## Convert webp to jpg

If we want to do the opposite, i.e. convert from webp to classic, we need to do it in two steps:

1. convert webp to png
2. convert png to jpg

``` bash
dwebp <input.webp> -o <output.png>
```

Now we can use convert or any other tool to convert from png to jpg.

``` bash
convert <output.png> <output_converted.jpg>
```

## Which is lighter webp or jpg?

If we now compare the sizes of both files we will notice that our new image is **about half the size of its _jpg_** version.

The quality of the resulting webp file is for you to judge for yourself. I found it to be practically the same, with subtle differences; perhaps a slight loss of contrast, but almost imperceptible.

```bash
du -h *
224K	imagen_procesada.webp
476K	pexels-artem-beliaikin-1120963.jpg
```

## How to convert many jpg images to webp?

Converting many images to _webp_ format is more of a terminal-level solution than the _cwebp_ program itself. Anyway I leave you the necessary code to convert all _jpg_ images in the folder where you run it to its equivalent in _webp_ format.

```bash
for image in *.jpg; do cwebp $image -o `basename ${image%.jpg}`.webp; done
```

## What if Safari does not support webp?

As of the publication date of this article **there are only two web browsers that do not have webp support**; Safari and KaiOS Browser, according to [caniuse](https://caniuse.com/#search=webp). Although I have read that the developers of Safari plan to grant it full webp support by the end of 2020.

But, if you can't wait, the solution is to use the _figure_ and _source_ tags. The _picture_ tag will wrap image sources that you specify. The browser will choose to download or ignore each one based on the formats it supports. That is, if the browser supports webp it will download the webp image, if it does not it will download the jpg image.

I don't need to tell you that for this to work you must have an image in jpg format and another image in webp format, and both must be accessible to the browser, right?

```html
<picture>
   <source srcset="https://turuta.com/imagen.webp" type="image/webp"> 
   <source srcset="https://turuta.com/imagen.jpg" type="image/jpeg"> 
   <img src="https://turuta.com/imagen_.webp" alt=" class="img-class">
</picture>
```