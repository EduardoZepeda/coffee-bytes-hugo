---
title: "Cuidado Con El Shiny Object Syndrome Y El FOMO En El Desarrollo Web"
date: 2024-09-08
coverImage: "images/shiny-object-syndrome-and-fomo-in-web-dev.jpg"
categories:
- opiniones
- javascript
description: 'Te explico un poquito sobre el Shiny Object Syndrome (SOS) y el Fear of Missing Out (FOMO) en el desarrollo web, de que tratan, sus diferencias y sus consecuencias'
keywords:
- opiniones
keyword: 'fomo en el desarrollo web'
authors:
- 'Eduardo Zepeda'
---

Con todos los rápidos cambios que ocurren en el desarrollo web: frameworks, lenguajes, herramientas, librerías, etc. Es inevitable sufrir un poco de Shiny Object Syndrome y algo de FOMO. Pero es conveniente identificar estos impulsos y su naturaleza para evitar sufrir las consecuencias de ignorarlos.

## Shiny Object Syndrome en el desarrollo web

El Shiny Object Syndrome (síndrome del objeto brillante, SOS de ahora en adelante) es la tendencia de ser distraido por una idea o tendencia nueva. En el marco del desarrollo web esta idea o tendencia puede ser cualquier cosa: un nuevo framework, un nuevo lenguaje, un editor nuevo, etc. Déjame te lo explico con un ejemplo.

![Shiny object syndrome en Javascript](images/shiny-object-syndrome.webp "Uy, un nuevo framework de Javascript, tengo que probarlo")

Imagina que quieres crear una nueva aplicación, pero escuchaste que salió un [nuevo framework de Javascript con un rendimiento excepcional](/es/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/) que promete facilitarte las cosas, por lo que decides aprender este nuevo ~~blazingly fast~~ framework para implementar tu nueva idea, posteriormente descubres que salió otro framework aún mejor, por lo que, a pesar de que ya llevabas la mitad del proyecto, decides refactorizar tu aplicación usando este nuevo framework y retardas nuevamente el desarrollo de tu app. 

Pudiste haber implementando tu nueva idea usando el framework que ya conocías, y terminar antes, pero decidiste perder tu tiempo, atención y recursos con cada nuevo "objeto brillante" que aparece.

¿Te ha pasado o solo a mi?

{{<ad>}}

## FOMO o Fear of Missing Out en el desarrollo web

El FOMO es una ensimismamiento generalizado de que otros podrían experimentar vivencias agradables de las cuales estariamos ausentes. En el marco del desarrollo web esta vivencia agradable también podría ser la popularización de un nuevo lenguaje de programación, o un nuevo tipo de API que parece facilitar las cosas, o un nuevo framework de Javascript (sale uno nuevo cada semana).

![Rust is the most loved language](images/rewrite-everything-in-rust-meme.webp "Todos están aprendiendo Rust, yo también debería aprenderlo")

Por ejemplo, imagínate que un nerd crea un nuevo lenguaje de programación, que promete ser más rápido, más seguro y es adoptado rápidamente por la comunidad. Los sentimientos de ansiedad empiezan a invadirte, "¿y si todos empiezan a usar ese nuevo lenguaje?", "¿y si estoy perdiendo el tiempo usando los lenguajes que ya domino y todos se dieron que cuenta que el nuevo lenguaje es el futuro?"

¿Se te viene a la mente algún lenguaje o tecnología en especial?

## Diferencias entre el Fear Of Missing Out y el Shiny Object Syndrome

Aunque ambos fenómenos se parezcan, hay varias diferencias, principalmente en el efecto que tienen sobre nosotros.

| FOMO                                                                                           | SOS                                                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Miedo o ansiedad de ser dejado atrás o fuera                                                   | La novedad te distrae                                                    |
| Impacta en tu bienestar y comportamiento social                                                | Impacta en tu productividad y concentración                              |
| Puede llevar a comprometerse en exceso con actividades o experiencias por miedo a perdérselas. | Da lugar a decisiones impulsivas para cambiar de proyecto o de dirección |


## ¿Por qué es importante considerar el FOMO y el SOS en el desarrollo web?

Mis ejemplos anteriores no hablan de ninguna tecnología en específico, pero estoy seguro de que se te vinieron a la mente varios lenguajes, frameworks y tecnologías mientras leías los párrafos anteriores.

### Ejemplo del SOS y el FOMO en el desarrollo web

Yo me atreveré a nombrarte algunos ejemplos que pasaron por mi mente al escribir esta entrada:
- [Graphql](/es/como-crear-una-api-graphql-en-django-rapidamente-usando-graphene/): Adoptado por muchísimas personas incluso aunque probablemente solo necesitaran una [API REST](/es/caracteristicas-basicas-de-una-api-rest/).
- [JWT](/es/no-uses-jwt-para-gestionar-sesiones-traduccion/): Usado como una "mejora" a las sesiones y autenticación, incluso aunque [varios expertos en seguridad informáticas recomendaban no usarlas](https://redis.io/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/) de esa manera.
- CSR, SSR y SSG: Los desarrolladores rápidamente se dieron cuenta de que siempre fue mejor generar el HTML directamente desde el servidor o usar archivos estáticos, como se había hecho siempre, por [razones tales como el SEO.](/es/mis-errores-de-optimizacion-en-el-seo-tecnico-de-mi-sitio-web/)
- AI: ¿[Será la AI una burbuja](/es/el-auge-y-la-caida-de-la-burbuja-de-ai/) en la que es mejor entrar o pasará igual que con la revolución cripto?
- WASM: No es que WASM no sea útil, todo lo contrario, lo que ocurre es que algunos pensaban que todos los sitios iban a estar codificados en Rust o en algún lenguaje de bajo nivel, lo que por supuesto no ha ocurrido.

### Consecuencias del SOS y el FOMO en el desarrollo web

El FOMO y el SOS pueden impactar decisiones de diseño, arquitecturas, stacks y debemos ser muy cuidadosos de no precipitarnos al elegir algo basándonos en nuestras emociones o en corazonadas, nuestras decisiones deben estar basadas en argumentos racionales y se deben de considerar aspectos tales como la madurez de una tecnología (Como el [framework Django](/es/por-que-deberias-usar-django-framework/) o React), su estabilidad a lo largo del tiempo, su proyección a futuro, lo fácil que es encontrar nuevos desarrolladores que la dominen o, en su defecto, capacitar al persona existente e incluso aspectos como si el respectivo proyecto recibe financiación de terceros que le permita seguir operando.
