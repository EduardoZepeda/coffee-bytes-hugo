---
date: '2025-06-03T16:01:02-06:00'
title: 'Bolt vs Lovable vs V0 Vercel Comparando Resultados y Mi Opinion'
categories:
- opinion
- inteligencia artificial
coverImage: "images/bolt-vs-lovable-v0-vercel.jpg"
description: 'Una comparación entre Bolt vs Lovable vs V0 Vercel para la creación de landing pages, ventajas, desventajas, carencias y mi opinión del ganador'
keyword: 'bolt vs lovable vs v0'
keywords:
- bolt
- lovable
- v0
- inteligencia artificial
- opiniones
- review
authors:
- 'Eduardo Zepeda'
---

Todos los influencers de tecnología están esparciendo el FOMO y hablando de herramientas como Bolt, V0 de Vercel, y Lovable. Pero lo entiendo, [aún estamos en una burbuja de AI]({{< ref path="/posts/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="es" >}}). 

Sin embargo, a pesar de su valoración poco realista, estoy asombrado de lo que estas herramientas pueden hacer sin necesidad de API REST ni integraciones del [Protocolo de contexto del modelo]({{< ref path="/posts/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="es" >}}) por parte del usuario. 

Para el prompt utilicé algo bastante sencillo. Decidí no ser tan específico, porque es el tipo de prompt que utilizaría una persona que no está tan familiarizada con el contexto en los Large Language Models. Y por eso lo mantuve corto, ambiguo y no tan específico.

> Create a fancy and highly interactive landing page with cyberpunk vibes and neon colors

## Landing Page en v0-vercel

El resultado de Vercel es bastante decente. 

La paleta de colores es muy Cyberpunk. Me encantó el fondo cuadriculado, la landing page me pareció un poco simple, pero cumple perfectamente con lo prometido.

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1748988712/coffee-bytes/v0_vforml.mp4">}}

### Tuve problemas al usar v0-vercel

Desafortunadamente, enfrenté problemas con la ejecución en local, específicamente un par de dependencias que no eran compatibles entre sí, nada muy complicado de resolver. 

Lo comento porque me pareció bastante extraño dado que en su plataforma todo parecía ir perfecto, pero al momento de querer replicar el proyecto en mi computadora, no funcionó "out of the box".

Pero dejando de lado eso, yo creo que está bien logrado y el resultado es sólido. 

## Landing Page en Bolt

La propuesta de Bolt fue mi favorita de las tres. Usar el efecto de luces de neón en las letras me parece un acierto, ya que refleja perfectamente la estética cyberpunk de novelas como neuromante o videojuegos como Cyberpunk 2077. 

La AI de Bolt añadió imágenes que van con la paleta de colores, el marco en la imagen me parece también un toque bastante acertado, y la cereza del pastel es el efecto tipo glitch en el hero, usado frecuentemente en material audiovisual de estilo Cyberpunk. 

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1748988709/coffee-bytes/bolt_d6pbio.mp4">}}

Sencillamente perfecto, no tuve problema alguno con la instalación. Lo que sí noté es que el código utiliza bastantes recursos incluso en ausencia de interacción. No he revisado el código con detalle pero pienso hacerlo y actualizar esta entrada.

## Landing Page en Lovable

Lovable también cumple al entregar una landing page funcional. Sin embargo, siento que esta vez fue un poquito demasiado para mí. 

El fondo de Matrix, si bien supongo que está relacionado con la temática cyberpunk, por la naturaleza de la película, no siento que sea un elemento que deba integrarse en una landing page (A menos de que se trate de la película "Matrix").

Además, considero que la AI exageró un poquito con todos los efectos. En la página todo es interactivo, todo vibra y todo se mueve, tanto que se siente sobresaturado.

{{<video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1749143657/coffee-bytes/lovable_no_sound_aokgmp.mp4">}}

Si bien estoy consciente que estos resultados pueden refinarse tras múltiples iteraciones, al ver esto no puedo evitar pensar en un programador novato que busca plasmar absolutamente todos los efectos que acaba de aprender en una sola página web.

Además el footer solo cuenta con el logo y la leyenda de copyright, sin enlaces ni secciones.

### ¿Cómo descargar el código de lovable?

Otro aspecto a destacar es que, Lovable no te deja descargar el código directamente (o para mi fue imposible encontrar donde sin un plan premium). Por lo que en este punto la considero inferior a sus contrincantes, que sí ofrecen el código disponible para descarga sin muchas complicaciones.

Quizás un poco de [fine tuning]({{< ref path="/posts/fine-tuning-de-un-modelo-de-inteligencia-artificial/index.md" lang="es" >}}) pudiera solucionar el problema.

## Bolt vs Lovable vs v0 Vercel

Si consideramos únicamente el resultado obtenido, **sostengo que Bolt sería el ganador**. 

En cuanto a la experiencia al usar la herramienta, yo considero que es bastante similar en los tres casos. Los tres utilizan interfaces que parecen estarse convirtiendo en un estándar, y la verdad es que ni siquiera puedo recordar si existe alguna diferencia significativa entre las tres opciones.

### La creación de sitios con LLM es imperfecta

Algo que me pareció bastante curioso, es que si bien existen diferencias sutiles en cuanto a los fondos, el tamaño de los botones, las interacciones, y demás elementos visuales, las tres páginas utilizan exactamente el mismo layout de landing page; una navbar con un menú orientado al lado derecho, el logo del lado izquierdo, todas más o menos a la misma distancia y con 3-4 secciones. 

Una cosa extra que pude notar es la ausencia total de incluso el más básico [SEO técnico en la landing page]({{< ref path="/posts/guia-de-seo-tecnico-para-desarrolladores-web/index.md" lang="en" >}}), así que no cuentes con llevar tu sitio web a las primeras posiciones de Google sin invertirle algo de tiempo. Pero hey, los sitios web solo requirieron un prompt.

Sorprendentemente, [a diferencia del arte generado por IA, estas herramientas de código generado por IA]({{< ref path="/posts/la-ai-se-percibe-de-manera-diferente-entre-artistas-y-devs/index.md" lang="es" >}}) pasaron inadvertidas para las personas que no son expertas en tecnología.