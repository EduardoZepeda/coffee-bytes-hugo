---
aliases:
- /ocr-con-tesseract-python-y-pytesseract
- /ocr-reconocimiento-optico-de-caracteres-con-tesseract-y-pytesseract
- /ocr-con-tesseract-python-y-pytesseract//1000
- /ocr-con-tesseract-python-y-pytesseract/feed/
- /ocr-con-tesseract-python-y-pytesseract/ocr/
- /es/pytesseract-ocr-reconocimiento-optico-de-caracteres-en-python/
- /es/ocr-con-tesseract-python-y-pytesseract/
- /es/python/ocr-con-tesseract-python-y-pytesseract/
authors:
- Eduardo Zepeda
categories:
- python
- artificial intelligence
coverImage: images/OCR.jpg
coverImageCredits: Créditos https://www.pexels.com/@cottonbro/
date: '2021-09-28'
description: Aprende a realizar reconocimiento óptico de caracteres (OCR) en este tutorial usando Pytesseract. Python y Tesseract para extraer texto de imágenes.
  strings.
keyword: tutorial de pytesseract
keywords:
- python
- artificial intelligence
- pytesseract
slug: /python/mini-tutorial-de-pytesseract-ocr-en-python/
title: Mini tutorial de Pytesseract, OCR en Python
---

Python es increíblemente versátil, cuenta con una numerosa comunidad que pone a tu disposición librerías que te permiten crear redes neuronales desde cero, [realizar fine-tuning de un LLM]({{< ref path="/posts/artificial-intelligence/fine-tuning-de-un-modelo-de-inteligencia-artificial/index.md" lang="es" >}}) o usar el Reconocimiento Óptico de Caracteres (OCR). Para este último sólo necesitas instalar tesseract y los bindings de python, llamados pytesseract y estarás listo para convertir una imagen en una cadena de texto.

{{< instagram CXeaEYALRdp >}}

## Tutorial de pytesseract

Para llevar a cabo el OCR con Python necesitaremos tesseract, que es la librería que se encarga de todo el trabajo pesado y el procesamiento de imágenes necesario para extraer texto de imágenes.
  
Asegúrate de instalar el tesseract-ocr más nuevo, hay una diferencia abismal entre la versión 3 y las versiones posteriores a la 4, pues se implementaron redes neuronales para mejorar el reconocimiento de caracteres. Yo estoy usando la versión 5 alpha.

```bash
sudo apt install tesseract-ocr
tesseract -v
tesseract 5.3.0
```

{{<ad0>}}

{{< figure src="images/OCRTesseractVersion5vsVersion3-2.png" class="md-local-image" alt="Diferencias de la eficacia del motor de OCR de tesseract 3 y tesseract 5 alpha. La version 5 presenta un mejor rendimiento." caption="Comparación entre el resultado del OCR entre tesseract 3 y tesseract 5" >}}


### ¿Cómo instalar lenguajes en tesseract?

Podemos ver con que lenguajes viene instalado en tesseract con _\--list-langs_

```bash
tesseract --list-langs
```

Es obvio, pero es necesario mencionar que la medida en la que reconozca el texto va a depender de que lo usemos en el lenguaje correcto. Instalemos el lenguaje de español.

```bash
sudo apt install tesseract-ocr-spa
tesseract --list-langs
List of available languages (3):
eng
osd
spa
```

Verás que ahora el español ya se encuentra instalado y podemos usarlo para detectar el texto de nuestras imágenes agregando la opción _\-l spa_ al final de nuestro comando

{{<ad1>}}

## Reconocimiento óptico de caracteres con tesseract

Ahora pongámoslo a prueba para reconocer texto en imágenes, directo de la terminal. Yo voy a usar la siguiente imagen:

{{< figure src="images/imagen_con_texto.jpg" class="md-local-image" alt="Imagen con texto a procesar" caption="Archivo: imagen_con_texto.jpg" >}}


```bash
tesseract imagen_con_texto.jpg -
Warning: Invalid resolution 0 dpi. Using 70 instead.
Estimating resolution as 139
Do you have the time to listen to me whine
...
```

{{<ad2>}}

El "-" al final del comando le indica a tesseract que mande los resultados del análisis a la salida estándar, para que podamos verlos en terminal.

Es posible indicarle a tesseract el motor de OCR que queremos usar:

- 0: para el tesseract original
- 1: para redes neuronales
- 2: tesseract y redes neuronales
- 3: Predeterminado, lo que esté disponible

```bash
tesseract imagen_con_texto.jpg - --oem 1
```

Considera que **no todos los archivos de idiomas funcionan con el tesseract original** (0 y 3). Aunque generalmente el de redes neuronales es el que da el mejor resultado. Puedes encontrar los modelos compatibles con el tesseract original y redes neuronales en el [repositorio de tesseract](https://github.com/tesseract-ocr/tessdata#?).

Puedes instalarlos de manera manual descargándolos y moviéndolos a la carpeta adecuada, en mi caso es _/usr/local/share/tessdata/_, pero puede ser diferente en tu sistema.

{{<ad3>}}

```bash
wget https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata
sudo mv eng.traineddata /usr/local/share/tessdata/
```

## Reconocimiento óptico de caracteres con pytesseract

### Instalación de pytesseract

Tras la instalación agregamos pytesseract (los bindings de python) y pillow (para el manejo de imágenes) a nuestro entorno virtual.

```bash
pip install pytesseract pillow
```

### Leer cadenas de texto o strings de imágenes con pytesseract

Lo primero es revisar los lenguajes que tenemos instalados.

```python
import pytesseract
from PIL import Image
import pytesseract

print(pytesseract.get_languages())
# ['eng', 'osd', 'spa']
```

Ahora que ya tenemos los lenguajes, podemos leer el texto de nuestras imágenes.

El código necesario es bastante corto y explicativo, por si mismo. Básicamente le pasamos la imagen como argumento al método *image_to_string* de pytesseract.

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

*image_to_string* puede recibir como argumento el lenguaje en el que queremos que detecte el texto.

Tesseract incluye un método con el cual podemos obtener mucha más información de la imagen: *image_to_data*, este está disponible para versiones superiores a la 3.05.

```python
data = pytesseract.image_to_data(img)
print(data)
```

{{< figure src="images/dataTesseract.png" class="md-local-image" alt="Retorno del método image_to_data en tesseract" >}}

Si quieres profundizar más visita la [documentación completa de tesseract](https://github.com/tesseract-ocr/tesseract).

## ¿Qué se puede hacer con el Reconocimiento óptico de caracteres?

El OCR es bastante útil para las redes sociales, donde puedes escanear el texto que aparece en las imágenes para leer su contenido y luego procesarlo o darle tratamiento estadístico.

Aquí va otro caso, imagina un programa que escanee image boards o redes sociales, extraiga un par de imágenes de los vídeos publicados y los relacione con una cuenta de tik tok usando la marca de agua que aparece en cada vídeo.

O quizá una página que sube imágenes de sus productos con sus precios escritos en cada una de ellas. Con el OCR es posible obtener todos sus precios, y subirlos a tu base de datos, descargando y procesando sus imágenes.

La [resolución de captchas anti-bot]({{< ref path="/posts/opinion/analisis-de-tipos-de-captchas-ventajas-y-desventajas/index.md" lang="es" >}}) también es uno de los usos más interesantes del OCR, con esto puedes brincar captchas y utilizar bots para scrappear sitios web.

Facebook debe usar algún tipo de tecnología similar para censurar las imágenes que incluyen texto ofensivo, de acuerdo a sus políticas, que se suben a su red social.

Puedes crear un [servidor MCP]({{< ref path="/posts/artificial-intelligence/como-crear-un-servidor-mcp-desde-cero/index.md" lang="es" >}}) que procese documentos, los lea y te devuelva el contenido.

{{< figure src="images/facebook-screenshot-ocr.jpg" class="md-local-image" alt="Facebook usa OCR para leer el texto de sus imágenes" caption="Facebook es capaz de leer el texto que aparece en una imagen" >}}

Otra de las aplicaciones más comunes la transformación de un libro en pdf en imágenes a texto, ideal para transformar digitalizaciones de libros antiguos a epub o archivos de texto.

Como puedes ver es bastante útil, yo pienso que es una de las aplicaciones de la AI que no desaparecerá [cuando la burbuja de AI truene]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="es" >}}).