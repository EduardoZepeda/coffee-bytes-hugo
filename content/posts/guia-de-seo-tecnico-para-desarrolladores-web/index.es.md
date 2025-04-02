---
date: '2025-03-31T00:02:16-06:00'
draft: true
title: 'Guia De Seo Tecnico Para Desarrolladores Web'
categories:
- category
coverImage: "images/<your-image>"
description: ''
keyword: ''
keywords:
- ''
authors:
- ''
---


Anteriormente te platiqué como ... pues después de eso me puse a ver muchos videos sobre SEO, sobre todo de Romu y he tratado de resumir todo lo que aprendí de él en una pequeña entrada. He decidido centrarme en el SEO técnico porque es el que entiendo y con el que estoy más familiariazado.

## Technical SEO Audit Checklist For Web Development

¿Qué debería tener en cuenta un desarrollador web sobre SEO?

El SEO podría dividirse en dos:
- SEO técnico: los aspectos 
- SEO de contenido

## Checklist de SEO técnico en desarrollo web

En el caso del SEO técnico debes asegurarte de que tu sitio web cuente con:

### Archivo Sitemap.xml

El cual le dirá a los motores de búsqueda las páginas que tiene tu aplicación. En muchos casos este puede generarse de manera dinámica, algunos frameworks incluso cuentan con herramientas que te permiten hacerlo en pocas lineas, como Django.

### Robots.txt

Un archivo robots.txt, el cual orientará a los motores de búsqueda sobre que rutas debe ignorar. Además este archivo incluye la ubicación del sitemap, con la ventaja de que siempre se espera que la URL para este archivo sea */robots.txt*.

Bastante obvio pero lo mencionaré de todas formas, los crawlers pueden ignorar por completo las indicaciones de tu archivo, por lo que no debes verlo como un medio de protección.

#### robots disallow everything

#### Humans.txt

Existe una iniciativa para popularizar la idea de agregar la contraparte del archivo robots.txt, y mostrar la parte humana tras un sitio web, el alma en la máquina (¿El Ghost in the shell?), a mi me parece una idea muy bella, pero con poca difusión a la fecha.

### Schema

Generalmente presente como una etiqueta script de tipo *ld+javascript*, le índica a los motores de búsqueda los elementos que tiene tu sitio web y como se relacionan entre ellos. Los diferentes tipos de Schema son complejísimos y es todo un tema a tratar, puesto que varían mucho de acuerdo a la industría, un sitio web que venda artículos electrónicos tendrá una serie de propiedades en su Schema completamente diferentes a un sitio web de un restaurante, o una aplicación web.

Si estás completamente perdido yo suelo usar un prompt parecido a este con ChatGPT o DeepSeek: 

> dsadasdsadsadsads

### Meta tags

Meta tags, las metatags que van en la etiqueta head de tu HTML son metadatos sobre el contenido que pueden usarse para que los motores de búsqueda entiendan tu sitio mejor.
Dentro de los metatags son especialmente importantes los open graph, pues son el estándar para que las redes sociales puedan obtener información de tus páginas web.

### Performance de tu sitio web

Sitio web rápido, el sitio web debe brindar una buena experiencia al usuario y ser responsivo, importa, pero no tanto como crees.

### Arquitectura del sitio web

- Arquitectura del sitio, asegurarse que el sitio web cuente con una estructura que permite a los motores de búsqueda "entenderlo"

### ¿Importa la estructura de las URL en SEO?

Sí

### Enlaces internos

Enlaces internos, le ayuda a los motores de búsqueda a entender como se relacionan tus páginas entre sí.

### Enlaces externos

Enlaces externos, consideralo como un voto a favor hacia otros sitios web para indicarle a los motores de búsqueda que el contenido que enlazas es importante, investiga sobre los atributos *nofollow*, *follow*, *ugc* y *sponsored* en las etiquetas anchor y úsalos adecuadamente.

## El SEO de contenido en el desarrollo web

El SEO de contenido es más subjetivo y puede variar 





