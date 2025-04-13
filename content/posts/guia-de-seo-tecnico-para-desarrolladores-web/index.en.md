---
date: '2025-04-09T00:02:21-06:00'
draft: true
title: 'Tiny Technical SEO Audit Checklist For Web Developers'
categories:
- seo
- opiniones
coverImage: "images/technical-seo-checklist.jpg"
description: ''
keyword: Technical SEO Audit Checklist
keywords:
- 'guia'
- 'seo'
- 'desarrollo web'
- 'opiniones'
authors:
- 'Eduardo Zepeda'
---

Anteriormente te platiqué como cometí muchos errores en SEO al migrar mi sitio web de Wordpress a Hugo, pues después de eso me puse a ver muchos videos sobre SEO, sobre todo de Romu y he tratado de resumir todo lo que aprendí de él en una pequeña entrada. He decidido centrarme en el SEO técnico porque es el que entiendo, es menos subjetivo y, además, estoy más familiariazado.

He examinado muchos sitios web y he notado que muchos desarrolladores web profesionales omiten completamente el SEO de sus desarrollos, es completamente cierto que es un tema bastante extenso que quizás se aleja de lo que ellos están acostumbrados, en mi opinión, hacer un SEO promedio es mejor que omitirlo completamente.

Simplificando criminalmente, el SEO podría dividirse en dos:
- SEO técnico: todos aquellos aspectos objetivos, medibles, como la presencia de un sitemap, de etiquetas meta, etc.
- SEO de contenido: es un poco más subjetivo, es sobre que palabras usar, con que sitios conectar

## El SEO es una caja negra y un arte más que una ciencia

Nadie sabe exactamente como funciona el algoritmo de los motores de búsqueda, por lo que llegar a la posición número de Google, u otros motores, para cierta keyword de búsqueda, es más un arte que una ciencia. 

Inclusive si logras entender vagamente como funciona el algoritmo lo suficiente para manipularlo, tendrás que enfrentarte a que el algoritmo es un ente cambiante y puede que lo que servía perfectamente ayer, ya no sirva hoy.

A pesar de los cambios en el mundo SEO, el enfoque del SEO actual sigue fuertemente ligado a las keywords, pequeñas frases cortas que incluyes en tu sitio web para indicarle a los motores de búsqueda de que trata el contenido de tu sitio web y te muestre a los usuarios correctos. 

Sin embargo, últimamente, Google ha dicho que su algoritmo es tan sofisticado que logra evaluar que tan bien responde un sitio web a la *intención del usuario* e invita a sus usuarios a enfocarse en los usuarios en lugar de en las keywords. Aunque, de manera paradójica, sus servicios de publicidad están fuertemente orientados a las keywords.

## Checklist de SEO técnico en desarrollo web

Pero tú estás aquí por el checklist de SEO técnico que tu sitio web debería aprobar ¿no?:

### Archivo Sitemap.xml

Probablemente el aspecto técnico más importante, un sitemap le dirá a los motores de búsqueda las páginas que tiene tu aplicación. En muchos casos, un sitemap puede generarse de manera dinámica, algunos frameworks incluso cuentan con herramientas que te permiten hacerlo en pocas lineas, como Django.

Una vez creado, debes indicarle a los motores de búsqueda en donde se localiza la url de tu sitemap directo desde su panel de administración o dejar que intenten adivinarlo, lo cual no recomendaría.

### Robots.txt

Un archivo *robots.txt*, el cual orientará a los motores de búsqueda y crawlers sobre que rutas debe ignorar y cuales debe inspeccionar. Además este archivo debería incluir la ubicación del sitemap.

``` bash
User-agent: *
Disallow: /*/tags/
Disallow: /*/categories/
Disallow: /*/search/

Sitemap: https://example.org/sitemap.xml
```

Se espera que la URL para este archivo siemprea sea */robots.txt*, por lo que apegate a esta convención.

#### Un archivo robots.txt no sirve para bloquear crawlers ni bots.

Hay una confusión al respecto, y es bastante obvio pero lo mencionaré de todas formas: **los crawlers pueden ignorar por completo las indicaciones de tu archivo robots.txt**, por lo que no debes verlo como un mecanismo de protección para tu sitio web, si un crawler quiere, ignorará las instrucciones contenidas ahí.

Si alguien te dice lo contrario te está mintiendo descaradamente.

#### Robots disallow everything

Si quieres indicarle a los crawlers que deben ignorar absolutamente todo el contenido de tu web, podrías usar algo como:

``` bash
User-agent: *
Disallow: /
```

#### La contraparte de robots.txt: humans.txt

Como dato curioso, existe una iniciativa para popularizar la idea de agregar la contraparte del archivo robots.txt, y mostrar la parte humana tras un sitio web, el alma en la máquina o en la consola (¿El "Ghost in the shell"?), a mi me parece una idea muy bella, pero con poca difusión a la fecha.

### Schemas

Generalmente presente como una etiqueta *script* de tipo *ld+json* (aunque hay otros formatos válidos), que puede encontrarse en cualquier punto de tu documento HTML, le índica a los motores de búsqueda los elementos que tiene tu sitio web y como se relacionan entre ellos.

``` html
<script type="ld+json">
    {}
</script>
```

Los diferentes tipos de Schema son complejísimos y es todo un tema a tratar, puesto que varían mucho de acuerdo al tipo de sitio web. 

Un sitio web que venda artículos electrónicos tendrá una serie de propiedades en su Schema completamente diferentes a un sitio web de un restaurante, o una aplicación web.

Si estás completamente perdido, te dejo un prompt que puedes usar para orientarte, solo escríbeselo a ChatGPT, DeepSeek o cualquier otro LLM competente: 

> Eres un experto en SEO, crea el contenido de una etiqueta ld+json, basado en las características de schema.org, para una página web cuyo tema principal es "x", el contenido de la página consiste en "y", puedes utilizar placeholders para las variables usando el siguiente formato: "z", por favor.

Una vez obtengas el resultado corrobóralo con la documentación oficial o con su herramienta de validación de schemas.

### Presencia de Meta tags

Las metatags que van en la etiqueta *head* de tu HTML son metadatos sobre el contenido que pueden usarse para que los motores de búsqueda entiendan tu sitio mejor.

Dentro de los metatags son especialmente importantes los Open Graph, pues son el estándar para que las redes sociales puedan obtener información de tus páginas web, estos meta tags son los que logran que uno de tus enlaces se vea así cuando lo compartes en redes sociales.

### Un sitio web con buen performance para SEO

Sitio web rápido, el sitio web debe brindar una buena experiencia al usuario y ser responsivo, importa, sí, pero no tanto como crees. El contenido juega un rol mucho más importante que la velocidad de tu sitio web, es común ver sitios web sitios pésimamente optimizados pero con un buen ranking en los buscadores.

Herramientas como Lighthose son bastante útiles para medir el performance de un sitio web y también te indican como mejorarlo.

### El aspecto más obviado de un checklist de SEO técnico: Arquitectura de sitio web bien diseñada

Asegúrate que el sitio web cuente con una estructura que permite a los motores de búsqueda "entenderlo". ¿A que me refiero? A que el sitio web esté organizado de una manera lógica y jerárquica que sea entendible. 

Por ejemplo algo similar a esto:

#### ¿Importa la estructura de las URL en SEO?

Sí, y mucho, puedes echar de mano las urls para darle a tu sitio web la estructura que creas correcta para que sea coherente con la arquitectura que planeas, esto facilita que los motores de búsqueda "entiendan" tu sitio web.

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
* *ugc*, siglas de "User generated content*, ideal para redes sociales.
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




