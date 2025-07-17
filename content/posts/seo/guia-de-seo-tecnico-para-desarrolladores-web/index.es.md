---
aliases:
- /es/una-guia-de-seo-tecnico-basico-hecha-para-desarrolladores-web/
authors:
- Eduardo Zepeda
categories:
- seo
- opinion
coverImage: images/technical-seo-checklist.jpg
date: '2025-04-14T00:02:16-06:00'
description: 'Mi checklist de SEO técnico para desarrolladores web, lo mínimo que
  hay que hacer cuando se trata del SEO técnico de un sitio web: mapa del sitio, robots'
keyword: SEO Técnico básico
keywords:
- seo
- opinion
title: Una Guia De SEO Técnico Básico Hecha Para Desarrolladores Web
---

Anteriormente te platiqué como [cometí muchos errores en SEO]({{< ref path="/posts/seo/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="es" >}}) al migrar mi sitio web de Wordpress a Hugo, pues después de eso me puse a ver muchos videos sobre SEO, sobre todo de Romuald Fons, también me leí [The art of SEO](https://amzn.to/4ilv4pc#?) y he tratado de resumir todo lo que aprendí en una pequeña entrada. He decidido centrarme en el SEO técnico porque es el que entiendo, es menos subjetivo y, además, estoy más familiariazado. Por eso escribí esta entrada antes de que [burbuja de AI]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="es" >}}) estalle, llevándose al SEO con ella.

![Romuald Fons Video thumbnail](https://res.cloudinary.com/dwrscezd2/image/upload/v1744676557/coffee-bytes/romu-seo_d3i3l9.jpg "Mi fuente totalmente confiable, Romuald Fons")

He examinado muchos sitios web y he notado que muchos desarrolladores web profesionales omiten completamente el SEO de sus desarrollos, es completamente cierto que es un tema bastante extenso que quizás se aleja de lo que ellos están acostumbrados, en mi opinión, hacer un SEO promedio es mejor que omitirlo completamente.

Simplificando criminalmente, el SEO podría dividirse en dos:
- **SEO técnico**: todos aquellos aspectos objetivos, medibles, como la presencia de un sitemap, de etiquetas meta, etc.
- **SEO de contenido**: es un poco más subjetivo, es sobre que palabras usar, con que sitios conectar

## El SEO es una caja negra y un arte más que una ciencia

Nadie sabe exactamente como funciona el algoritmo de los motores de búsqueda, por lo que llegar a la posición número de Google, u otros motores, para cierta keyword de búsqueda, es más un arte que una ciencia. 

Inclusive si logras entender vagamente como funciona el algoritmo lo suficiente para manipularlo, tendrás que enfrentarte a que el algoritmo es un ente cambiante y puede que lo que servía perfectamente ayer, ya no sirva hoy.

![Meme de los cambios en el algoritmo de google](https://res.cloudinary.com/dwrscezd2/image/upload/v1744675606/coffee-bytes/google-algorithm-update-meme_yd9cb0.jpg)

A pesar de los cambios en el mundo SEO, el enfoque del SEO actual sigue fuertemente ligado a las keywords, pequeñas frases cortas que incluyes en tu sitio web para indicarle a los motores de búsqueda de que trata el contenido de tu sitio web y te muestre a los usuarios correctos. 

Sin embargo, últimamente, Google ha dicho que su algoritmo es tan sofisticado que logra evaluar que tan bien responde un sitio web a la *intención del usuario* e [invita a sus usuarios a enfocarse en resolver la intención de los usuarios](https://about.google/company-info/philosophy/) en lugar de en las keywords. Aunque, de manera paradójica, sus servicios de publicidad siguen fuertemente orientados a las keywords.

## SEO Técnico básico en el desarrollo web

El SEO técnico consiste en una serie de requisitos que debe cumplir un sitio web para ser amigable a los motores de búsqueda, de manera que estos te indexen en posiciones altas y cuando un usuario busque en redes, tú aparezcas en las primeras posiciones.

Este tema es muy amplio, pero espero resumirlo de manera que tengas una idea general y no te pierdas en el mar de información que existe.

### Archivo Sitemap.xml

Probablemente este es el aspecto técnico de SEO más importante. Un sitemap le dirá a los motores de búsqueda las páginas que tiene tu aplicación.

![Diagrama de un sitemap mostrando las urls disponibles](https://res.cloudinary.com/dwrscezd2/image/upload/v1744677728/coffee-bytes/robots-sitemap-relationship_fnzjlr.png "Diagrama de un sitemap mostrando las urls disponibles")

En muchos casos, un sitemap puede generarse de manera dinámica, algunos frameworks incluso cuentan con herramientas que te permiten hacerlo en pocas lineas, como Django.

Una vez creado, debes indicarle a los motores de búsqueda en donde se localiza la url de tu sitemap directo desde su panel de administración. Si no lo indicas explícitamente buscaran en las urls más comunes, o en el archivo *robots.txt*.

![Screenshot of Google's search console sitemap section](https://res.cloudinary.com/dwrscezd2/image/upload/v1744673455/coffee-bytes/screenshot-sitemap-google_zx6kdr.png "Screenshot of Google's search console sitemap section")

### Robots.txt

Un archivo *robots.txt* orientará a los motores de búsqueda y crawlers sobre que URLs debe ignorar y cuales debe inspeccionar. Además este archivo debería incluir la ubicación del sitemap.

Se espera que la URL para este archivo siemprea sea */robots.txt*, por lo que apegate a esta convención.

Mira un ejemplo de un archivo *robots.txt*

``` bash
User-agent: *
Disallow: /*/tags/
Disallow: /*/categories/
Disallow: /*/search/

Sitemap: https://example.org/sitemap.xml
```

#### Un archivo robots.txt no sirve para bloquear crawlers ni bots.

Hay una confusión al respecto, y es bastante obvio pero lo mencionaré de todas formas: **los crawlers pueden ignorar por completo las indicaciones de tu archivo robots.txt**, por lo que no debes verlo como un mecanismo de protección para tu sitio web, si un crawler quiere, ignorará las instrucciones contenidas ahí.

![Robots.txt meme](https://res.cloudinary.com/dwrscezd2/image/upload/v1744680644/coffee-bytes/robots-txt-meme_qzyqxq.jpg "Robots.txt no te protegerá de los crawlers")

Si algún influencer en redes te dice lo contrario te está mintiendo descaradamente. Es más, lo reto a que detenga a un crawler solo usando un archivo *robots.txt*.

#### Robots bloquear todo

Si quieres indicarle a los crawlers que deben ignorar absolutamente todo el contenido de tu web, podrías usar algo como:

``` bash
User-agent: *
Disallow: /
```

#### La contraparte de robots.txt: humans.txt

Como dato curioso, existe una iniciativa para popularizar la idea de agregar la contraparte del archivo *robots.txt*, [un archivo *humans.txt*](https://humanstxt.org) y mostrar la parte humana tras un sitio web, el alma en la máquina o en la consola (¿El "Ghost in the shell"?), a mi me parece una idea muy bella el saber como son los humanos que existen tras un sitio web. Desafortunadamente este proyecto cuenta con poca difusión a la fecha.

### El siempre ignorado: Schema markup

Frecuentemente presente como una etiqueta *script* de tipo *ld+json* (aunque hay otros formatos válidos), que puede encontrarse en cualquier punto de tu documento HTML, le índica a los motores de búsqueda los elementos que tiene tu sitio web y como se relacionan entre ellos.

![Diagrama de Schema Markup ](https://res.cloudinary.com/dwrscezd2/image/upload/v1744678359/coffee-bytes/schema-markup-diagram_1_laalzs.png "Un schema mostrará información sobre el contenido y los elementos de una página web")

Los diferentes tipos de Schema son complejísimos y es todo un tema a tratar, puesto que varían mucho de acuerdo al tipo de sitio web. 

Un sitio web que venda artículos electrónicos tendrá una serie de propiedades en su Schema completamente diferentes a un sitio web de un restaurante, o una aplicación web.

Si estás completamente perdido, te dejo un prompt que puedes usar para orientarte, solo escríbeselo a ChatGPT, DeepSeek o cualquier otro LLM competente: 

> Eres un experto en SEO, crea el contenido de una etiqueta ld+json, basado en las características de schema.org, para una página web cuyo tema principal es "x", el contenido de la página consiste en "y", puedes utilizar placeholders para las variables usando el siguiente formato: "z", por favor.

Una vez obtengas el resultado corrobóralo con la documentación oficial o con su [herramienta de validación de schemas](https://validator.schema.org/).

### Presencia de Meta tags

Las metatags que van en la etiqueta *head* de tu HTML son metadatos sobre el contenido que pueden usarse para que los motores de búsqueda entiendan tu sitio mejor.

Dentro de los metatags son especialmente importantes los Open Graph, pues son el estándar para que las redes sociales puedan obtener información de tus páginas web, estos meta tags son los que logran que uno de tus enlaces se vea así cuando lo compartes en redes sociales.

![Las redes sociales usan las metatags para mostrar la información relevante de una página](https://res.cloudinary.com/dwrscezd2/image/upload/v1744673982/coffee-bytes/og-meta-tags-visualized_vt8xkh.png "Las redes sociales usan las metatags para mostrar la información relevante de una página")

Existen algunos [generadores de meta tags](https://www.seoptimer.com/meta-tag-generator#?) que puedes usar para generar una plantilla a llenar, o simplemente pídele a chatGPT una.

### Un sitio web con buen performance para SEO

El sitio web debe brindar una buena experiencia al usuario y ser responsivo, importa, sí, pero no tanto como crees. El contenido juega un rol mucho más importante que la velocidad de tu sitio web, es común ver sitios web sitios pésimamente optimizados pero con un buen ranking en los buscadores.

Pero no me creas ciegamente, utiliza la siguiente herramienta para corroborar lo que digo usando los primeros resultados en Google.

![Score de Lighthouse para mi página de portafolio](https://res.cloudinary.com/dwrscezd2/image/upload/v1744674198/coffee-bytes/Lighthouse-score-for-zeedu_xb0ekq.png "Score de Lighthouse para mi página de portafolio")

Herramientas como [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) son bastante útiles para medir el performance de un sitio web y también te indican como mejorarlo.

### El aspecto más infravalorado del SEO Técnico básico: Arquitectura de sitio web bien diseñada

Asegúrate que el sitio web cuente con una estructura que permite a los motores de búsqueda "entenderlo". ¿A que me refiero? A que el sitio web esté organizado de una manera lógica y jerárquica que sea entendible. 

Por ejemplo algo similar a esto:

![Estructura semántica de un website](https://res.cloudinary.com/dwrscezd2/image/upload/v1744674678/coffee-bytes/diagram-website-structure_kfhxde.png "Estructura semántica de un website")

#### ¿Importa la estructura de las URL en SEO?

Sí, y mucho, puedes echar de mano las urls para darle a tu sitio web la estructura semántica que creas correcta para que sea coherente con la arquitectura que planeas, esto facilita que los motores de búsqueda "entiendan" tu sitio web.

Te hablé un poco de esto en mi entrada sobre [buenas prácticas y diseño de una api rest]({{< ref path="/posts/software-architecture/buenas-practicas-y-diseño-de-una-api-rest/index.md" lang="es" >}})

En las siguientes URLs, observa como no hay manera de saber si Nawapol es una película, o un director o un documental:

``` bash
/session-9/
/50-first-dates/
/nawapol-thamrongrattanarit/
/salt-of-the-earth/
```

Lo mejor sería dotarles de una estructura consistente y más explícita:

``` bash
/movies/psychological-horror/session-9/
/movies/comedy/one-hundred-first-dates/
/documentaries/photography/salt-of-the-earth/
/directors/nawapol-thamrongrattanarit/
```

### Probablemente no estés usando correctamente las etiquetas HTML

#### Headings y SEO

Los headings son las etiquetas más importantes de tu contenido, pues le dicen a los motores de búsqueda como está organizado.

Asegúrate de usar solo una etiqueta h1, y jerarquizar las etiquetas h2 hasta la h6, usándolas para darle una estructura jerarquica a tu sitio web.

#### HTML te permite ser muy expresivo en el SEO.

Hay mucho más alla de las divs, los anchors, las etiquetas img y las de video. HTML brinda etiquetas para ayudar a los motores de búsqueda y dispositivos a entender mejor el contenido de una página web. No te quedes solo con esos elementos e investiga sobre el resto de etiquetas HTML, tales como:

- *article*: Contenido autónomo que se entiende de forma independiente.
- *section*: Agrupación temática de contenidos, normalmente con un encabezado.
- *nav*: Enlaces de navegación para el documento o el sitio, breadcrumbs, barra de navegación.
- *footer*: Pie de página de una sección o página, a menudo con metadatos.
- *datetime*: Fecha/hora (utilizada en la etiqueta *time*).
- *aside*: Contenido relacionado tangencialmente con el contenido principal.
- *header*: Contenido de introducción o que ayuda a la navegación para una sección/página.
- *progress*: Muestra el progreso de finalización de una tarea.
- *meter*: Representa una medida escalar dentro de un rango conocido.
- *cite*: Cita o referencia a una obra de caracter creativo (por ejemplo, libro, artículo).
- *q*: Cita corta en línea (el navegador suele añadir comillas).
- *pre*: Texto preformateado, que conserva los espacios en blanco y los saltos de línea, ideal para código.
- *kbd*: Entrada de teclado, indicando las teclas introducidas por el usuario.
- *samp*: Ejemplo de salida de un programa o sistema informático.
- *dfn*: Definición de un término (a menudo en cursiva).
- *output*: El resultado de un cálculo o de una acción del usuario.
- *abbr*: Abreviatura o acrónimo, opcionalmente con un título para que se expanda.

{{<ad>}}

### Presencia de enlaces internos

Le ayudan a los motores de búsqueda a entender como se relacionan tus páginas entre sí. Asegúrate que tus enlaces sean válidos y no devuelvan errores 404, además de que el texto que enlace esté relacionado con el contenido de la página enlazada.

``` html
✅ <a href="/how-to-code-clean-code">How to code clean code</a>
✅ <a href="/how-to-code-clean-code">Learn how to code clean code</a>
❌ <a href="/how-to-code-clean-code">Click here to read my new entry</a>
```

### Presencia de enlaces externos 

Enlaces externos, consideralo como un voto a favor hacia otros sitios web para indicarle a los motores de búsqueda que el contenido que enlazas es importante, investiga a fondo sobre los atributos *nofollow*, *follow*, *ugc* y *sponsored* en las etiquetas anchor y úsalos adecuadamente de acuerdo a tus intenciones.

* *follow*, es el valor por defecto, le indica a los motores de búsqueda que el sitio al que enlazan debe ser valorado positivamente.
* *nofollow*, los motores de búsqueda no deberían seguir este enlace, ideal para enlaces publicitarios, de afiliados o sitios web que quieres enlazar pero que no quieres que se relacionen con el tuyo.
* *ugc*, siglas de *User generated content*, ideal para redes sociales.
* *sponsored*, enlace patrocinado, generalmente publicidad o enlaces de afiliados.

``` html
<a href="https://example.org/" rel="nofollow">The example website</a>
<a href="https://user-website.com" rel="ugc">Just check my website</a>
```

### El test de Flesch Kincaid 

Es un test basado que sirve para estimar el nivel de educación requerido por un hipotético lector, para comprender el contenido de tu sitio web, ~~a diferencia de lo que tu inflado ego piensa~~, entre más alto el puntaje sera más sencillo de entender, lo cual es mejor pues estará al alcance de más lectores.

Dicho lo anterior, me atrevería a decir que el valor exacto no importa tanto, sino que tu texto sea de fácil lectura y el lector fluya a través de él.

Ten presente que hay algunos plugins, como Yoast SEO si usas Wordpress, que se encargan de medirlo o puedes programarlo tú mismo.

He dejado algunos aspectos que no considero tan importante, pero que quizás agregue más adelante, lo importante aquí es que entiendas que no solo es montar un sitio web y ya, sino que hay que pulirlo para que los usuarios puedan encontrarlo y usarlo.

### HTTPS en lugar de HTTP

Es bastante extraño encontrar sitios web modernos que no utilicen HTTPS, sobre todo cuando son las plataformas de hosting las que se encargan de configurar los servidores de manera automática. De cualquier forma asegúrate de que tu sitio web utilice HTTPS en lugar de solo HTTP, pues los motores de búsqueda favorecen las conexiones seguras.

Y por ahora es todo, iré agregando más información al artículo si lo considero pertinente con el pasar de los días.