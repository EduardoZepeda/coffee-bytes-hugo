---
title: "OCR with tesseract, python and pytesseract"
date: "2021-09-28"
categories:
- "python"

coverImage: "images/OCR.jpg"
coverImageCredits: "credits https://www.pexels.com/@cottonbro/"
description: "Learn how to perform optical character recognition (OCR) on images using python, tesseract-ocr and pytesseract."
keywords:
- python
- artificial intelligence
- pytesseract

authors:
- Eduardo Zepeda
---

Python is super versatile, it has a giant community that has libraries that allow to achieve great things with few lines of code, Optical Character Recognition (OCR) is one of them, for that you just need to install tesseract and the python bindings, called pytesseract.

## Some OCR applications

OCR is quite useful for social networks, where you can scan the text that appears in the images to read its content and then process it or give it statistical treatment.

Here's another case, imagine a program that scans image boards or social networks, extracts a couple of images from the posted videos and links them to a tik tok account using the watermark that appears on each video.

Or maybe a page that uploads images of your products with your prices written on each of them. With OCR it is possible to get all their prices, and upload them to your database, downloading and processing their images.

Facebook must use some kind of similar technology to censor images that include offensive text, according to its policies, that are uploaded to its social network.

Another of the most common applications is the transformation of a pdf book into images to text, ideal for transforming old book scans to epub or text files.

## Installation of tesseract-ocr

To perform OCR with Python we will need tesseract, which is the library that handles all the heavy lifting and image processing.

Make sure you install the newest tesseract-ocr, there is a huge difference between version 3 and versions after 4, as neural networks were implemented to improve character recognition. I am using version 5 alpha.

```bash
sudo apt install tesseract-ocr
tesseract -v
tesseract 5.0.0-alpha-20201224-3-ge1a3
```

Differences in OCR engine efficiency between tesseract 3 and tesseract 5 alpha. Version 5 shows better performance](images/OCRTesseractVersion5vsVersion3-2.png "Comparison between OCR performance of tesseract 3 and tesseract 5")

### Installing languages in tesseract

We can see which languages are installed with _--list-langs_.

```bash
tesseract --list-langs
```

It is obvious, but it is necessary to mention that the extent to which it recognizes the text will depend on whether we use it in the correct language. Let's install the Spanish language.

```bash
sudo apt install tesseract-ocr-spa
tesseract --list-langs
List of available languages (3):
eng
osd
spa
```

You will see that Spanish is now installed and we can use it to detect the text in our images by adding the _-l spa_ option to the end of our command

## OCR with tesseract

Now let's put it to the test to recognize text in images, straight from the terminal. I am going to use the following image:

Image with text to be processed](images/imagen_with_text.jpg "File: image_with_text.jpg")

```bash
tesseract imagen_con_texto.jpg -
Warning: Invalid resolution 0 dpi. Using 70 instead.
Estimating resolution as 139
Do you have the time to listen to me whine
...
```

The "-" at the end of the command tells tesseract to send the results of the analysis to the standard output, so that we can view them in the terminal.

It is possible to tell tesseract which OCR engine to use:

* 0: for the original tesseract
* 1: for neural networks
* 2: tesseract and neural networks
* 3: Default, whichever is available

```bash
tesseract imagen_con_texto.jpg - --oem 1
```

Consider that **not all language files work with the original tesseract** (0 and 3). Although generally the neural networks one is the one that gives the best result. You can find the models compatible with the original tesseract and neural networks in the [tesseract repository](https://github.com/tesseract-ocr/tessdata).

You can install them manually by downloading them and moving them to the appropriate folder, in my case it is _/usr/local/share/tessdata/_, but it may be different on your system.

```bash
wget https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata
sudo mv eng.traineddata /usr/local/share/tessdata/
```

## Installing pytesseract

After installation we add pytesseract (the python bindings) and pillow (for image management) to our virtual environment.

```bash
pipenv install pytesseract pillow
```

## Read text from images with python

First let's check the languages we have installed.

```python
import pytesseract
from PIL import Image
import pytesseract

print(pytesseract.get_languages())
# ['eng', 'osd', 'spa']
```

Now that we have the languages, we can read the text of our images.

The code is quite short and self-explanatory. Basically we pass the image as an argument to pytesseract's _image_to_string()_ method.

```python
import pytesseract

from PIL import Image
import pytesseract

img = Image.open("nuestra_imagen.jpg") # Abre la imagen con pillow
img.load()
text = pytesseract.image_to_string(img, lang='eng') # Extrae el texto de la imagen
print(text)

# Do you have the time to listen to me whine...
```

_image_to_string()_ can receive as argument the language in which we want it to detect the text.

Tesseract when with a method with which we can obtain much more information from the image, _image_to_data()_, available for versions higher than 3.05.

```python
data = pytesseract.image_to_data(img)
print(data)
```

![Return from image_to_data method in tesseract](images/dataTesseract.png)

If you want to learn more visit the [complete tesseract documentation](https://github.com/tesseract-ocr/tesseract).