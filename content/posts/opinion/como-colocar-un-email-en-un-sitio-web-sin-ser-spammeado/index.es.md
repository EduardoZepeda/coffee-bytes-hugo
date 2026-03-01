---
aliases:
- /es/como-evitar-el-spam-al-colocar-un-email-en-un-sitio-web/
authors:
- Eduardo Zepeda
categories:
- opinion
- seo
coverImage: images/how-to-avoid-spam-when-putting-an-email-on-a-website.jpg
date: '2024-05-29T14:46:07-06:00'
description: Hay formas de evitar el spam cuando se introduce una dirección de correo
  electrónico en un sitio web, como convertirla en una imagen, codificarla y utilizar
  una notación diferente para ocultarla
keywords:
- seo
- opinion
- seguridad informatica
slug: /opinion/como-evitar-el-spam-al-colocar-un-email-en-un-sitio-web/
title: ¿Cómo evitar el spam al colocar un email en un sitio web?
---

A veces queremos colocar un email en un sitio web pero sin arriesgarnos a que algún bot la lea y nos incluya en una lista de publicidad, recordándonos nuestros problemas para iniciar una relación carnal con las dos mujeres maduras que viven a menos de dos kilómetros de distancia. Y como no queremos eso, hay varias cosas que podemos hacer para solucionar esto y aquí te presento algunas, la última es la que yo suelo utilizar y también mi favorita.

{{< figure src="images/prince-from-nigeria-scam.jpg" class="md-local-image" alt="Clásica estafa del príncipe nigeriano"  width="750" height="750" >}}

## Convertir tu email en una imagen

Esta manera de proteger tu dirección de email no requiere una explicación detallada, simplemente transforma tu email en una imagen y colócala, tu dirección estará segura ante cualquier bot que scrapee texto, pero será vulnerable a cualquier bot con [capacidades de OCR (Reconocimiento óptico de carácteres), bots con pytesseract por ejemplo](/es/python/ocr-con-tesseract-python-y-pytesseract/), los cuales pronostico que serán pocos, sino es que ninguno.

{{< figure src="images/email-image.jpg" class="md-local-image" alt="Direccion de email en una imagen"  width="200" height="55" >}}

La desventaja de esta aproximación es que la persona que desee mandarte un email tendrá que teclearlo manualmente, pues no puede hacer copy-paste, y ya sabes que cada paso extra añade fricción al proceso de conversión.

{{<ad1>}}

## Utiliza una notación diferente para el email

En lugar de utilizar el clásico formato como *my@email.com*, cámbialo por algo menos obvio para los bots, como *my [at] email [dot] com*, de esta manera tu dirección no será detectada como un email por los bots menos sofisticados y si alguien quiere enviarte un email basta con reemplazar el *at* y el *dot* por sus símbolos correspondientes.

Una opción bastante balanceada en mi opinión, aunque si se populariza estoy seguro de que mis embajadores de la fábrica de pastillas azules encontrarán la forma de obtener la valiosa información que necesitan.

## Pídele al usuario que genera el email con información extra

Otra manera es no colocar directamente el email, pero sí una pista de como puede deducirse, por ejemplo si el sitio se llama *lain.com* puedes colocar un texto a manera de pista que diga algo como: 

> *"Mi email es el nombre que aparece en la url y es una dirección de correo electrónico de google"*. 

{{<ad2>}}

Con eso entenderá que la dirección es *lain@gmail.com*.

Solo trata de no complicar las cosass bastante aquí, no sobrestimes las capacidades deductivas del internauta promedio.

## Usa un formulario en lugar de un email

Otra opción es olvidarte completamente de colocar tu correo y usar un formulario en su lugar, de esta manera tu correo estará seguro y puedes dirigir los emails a una cuenta única que destines a ese solo propósito

### Protege tu formulario del spam con un captcha

Algunos bots intentarán llenar el formulario para enviarte publicidad pero siempre puedes utilizar [un captcha para protegerte del spam.](/es/opinion/mi-analisis-de-captchas-anti-bots-ventajas-y-desventajas/)

{{<ad3>}}

{{< figure src="images/captcha-frieren-fern.webp" class="md-local-image" alt="Captcha image"  width="500" height="736" >}}

### Usa los filtros de  personalizados de email

Si no quieres usar captchas puedes dejar la responsabilidad de reconocer el spam a los filtros de tu proveedor de email, o utilizar un filtro creado por ti y combinarlo con alguna instrucción como: 

> *"Para saber que no eres un bot, por favor incluye la palabra *gominola* en tu email."*

Ahora solo configura tu filtro y elimina automáticamente todos los emails que no cumplan esa condición.

## Genera tu email de manera dinámica para evitar el spam

Esta es mi favorita, para lograr esto podemos usar algún tipo de cifrado sencillo, o incluso base64, **codificamos nuestra dirección de email en base64 y posteriormente la decodificamos en el frontend de manera dinámica usando Javascript**, de esta manera los bots solo verán un montón de números y letras en el código fuente, para leer el email necesitarán renderizar la página con javascript activado, lo que elimina a aquellos bots que solo lean el código fuente de la respuesta.

``` javascript
// this comes from the server
const encodedEmail = "eW91YXJlY3VyaW91c0BpbGlrZWl0LmNvbQ=="
// atob decodes from base64
const decodedEmail = atob(encodedEmail)
```

Para un usuario común, el email se mostrará tal cual si viniera incluído en el código fuente de la página.

### Genera un email de manera dinámica con interacción del usuario

Para hacer más seguro este método de protección podemos retrasar la decodificación hasta que el usuario presione un botón, haga scroll, realice algún movimiento con el mouse o incluso usar el intersection observer para decodificarlo solo si el email está en pantalla; el límite es tu imaginación.