---
aliases:
- /digital-ocean-analisis-y-mi-experiencia
- /digital-ocean-analisis-y-mi-experiencia-como-usuario
- /mi-experiencia-con-digital-ocean-como-hosting/
- /es/digital-ocean-analisis-y-mi-experiencia-como-usuario/
- /software-architecture/digital-ocean-analisis-y-mi-experiencia-como-usuario/
authors:
- Eduardo Zepeda
categories:
- software architecture
- opinion
coverImage: images/Mi-experiencia-digital-ocean.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@elaine-bernadine-castro-1263177/
date: '2021-01-14'
description: En esta entrada de platico mi experiencia usando la plataforma Digital
  Ocean, así como las opciones que tiene para ofrecerte como developer
keywords:
- digital ocean
- opinion
- kubernetes
- deploy
- cloud
- iaas
- paas
- vps
slug: /software-architecture/digital-ocean-review-analisis-y-mi-experiencia-como-usuario/
title: Digital Ocean Review, análisis y mi experiencia como usuario
---

He estado usando Digital Ocean para mis proyectos personales durante varios años, así que déjame contarte cómo me ha ido hasta ahora y qué tipo de servicios puedes encontrar ahí.

## Droplets en Digital Ocean

Los **Droplets** son mi recurso favorito en Digital Ocean. Son servidores virtuales que se rentan por hora. Al crear un Droplet puedes elegir entre diferentes sistemas operativos y versiones. Puedes acceder a la terminal de cualquier Droplet desde su página web o mediante el [comando ssh]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="es" >}}).

En cuanto das clic al botón, en menos de un minuto ya tienes un Droplet disponible y funcionando.

{{< figure src="images/Droplets-de-digital-ocean.png" class="md-local-image" alt="Images available for Digital Ocean droplets" >}}

### Imágenes personalizadas en Droplets

Si no quieres empezar desde cero con una instalación "limpia" del sistema operativo, puedes optar por **imágenes que ya traen software preinstalado para los requerimientos más comunes**: desarrollo web, data science, blogging, frameworks, multimedia, almacenamiento, elearning, ecommerce, etc.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1755547051/Marketplace-digital-ocean_q3h4lb.png" class="md-local-image" alt="Images available for Digital Ocean droplets" >}}

Por ejemplo, puedes elegir una plantilla de Express JS y ya trae Node instalado y un servidor Express corriendo.

Estas imágenes personalizadas te ahorran tiempo configurando el sistema operativo, y a veces basta con un simple CTRL + C y CTRL + V para que tu app quede lista. Yo he usado Django, Wordpress y MERN stack, y los puedo recomendar.

### Droplets según tus necesidades

Digital Ocean también ofrece Droplets especializados, ya sea en CPU, memoria o almacenamiento, además de una versión de propósito general. Pero seguro no viniste aquí por eso, ¿cierto? Probablemente tienes un presupuesto ajustado, no te preocupes, nos pasa a todos.

Digital Ocean ofrece algunos de los VPS más básicos y económicos del mercado (excepto Hostinger y Akamai, pero hablaré de eso más adelante).

{{< figure src="images/Droplets-purpose.png" class="md-local-image" alt="Types of plans for Digital Ocean" >}}

### El VPS barato pero confiable de Digital Ocean

Ok, pero ¿y el precio? Pues la respuesta es la de siempre: depende.

Para que te hagas una idea, el Droplet más barato cuesta ~~$5 USD al mes~~ $4 USD al mes. Es prácticamente nada, y para un sitio pequeño suele ser más que suficiente. A modo de comparación, Vercel hospeda tu aplicación gratis con ciertas limitaciones, pero su siguiente plan —al momento de escribir este artículo— cuesta $20 USD al mes.

Supongamos que con ese Droplet puedes atender 1 RPS, eso significa 60 peticiones en un minuto, 3600 en una hora y 86,400 en un día. Si con ese tráfico no logras monetizar, el problema no es técnico, sino de marketing. Recuerda, [no te obsesiones con el rendimiento de tu aplicación web]({{< ref path="/posts/opinion/la-obsesion-por-el-rendimiento-y-la-velocidad-en-programacion/index.md" lang="es" >}}).

#### ¿Los VPS usan HDD o SSD?

Ojo: todos los planes manejan almacenamiento con SSD, así que no te preocupes por la velocidad de lectura y escritura.

{{< figure src="images/Precios-digital-ocean.gif" class="md-local-image" alt="Prices of the different plans offered by Digital Ocean" >}}

### Proveedor de nube con servidores en todo el mundo

Digital Ocean tiene servidores en diferentes partes del mundo, por lo que siempre tendrás una opción cercana a tus clientes.

Yo SOLO he usado los de Estados Unidos y Canadá, por la cercanía con México, y hasta ahora no he tenido ningún problema. También sé que tienen en Europa y Asia, así que puedes probarlos sin problema. Recuerda que un TTFB largo es un [error técnico de SEO]({{< ref path="/posts/seo/mis-errores-de-seo-tecnico-y-como-los-optimice/index.md" lang="es" >}}), no cometas el error de una respuesta larga.

{{< figure src="images/diferentes-ubicaciones-droplets-digital-ocean.png" class="md-local-image" alt="Digital Ocean Server Locations" >}}

## Digital Ocean vs Hostinger

Descubrí que los VPS de Hostinger son mucho más baratos que los de Digital Ocean, prácticamente ofrecen el doble de recursos por el mismo precio. Sin embargo, he leído varias quejas de devs en Facebook. No he probado Hostinger personalmente, pero basta ver este [hilo en Reddit sobre Digital Ocean vs Hostinger](https://www.reddit.com/r/webhosting/comments/1h0x6fh/is_there_a_catch_here_why_choose_digitalocean/#?) para notar que parece ser conocimiento común que no es del todo confiable. Nada contra Hostinger, pero los comentarios me desanimaron.

La verdad no quiero lidiar con problemas por una diferencia de precio tan pequeña. Si tienes alguna experiencia con Hostinger que se pueda comprobar, con gusto actualizo este post incluyendo tu opinión.

## Rentar LLM en Digital Ocean

Me acabo de dar cuenta de que ahora ofrecen LLM bajo demanda, y no solo ChatGPT, sino varios más, cada uno con su precio. Los puedes conectar a tus Droplets, Apps o servicios y usarlos; ellos se encargan del resto. Los precios cambian, así que no te fíes de la imagen, tómala solo como referencia.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1755547643/Digital-Ocean-AI-models-available_t15vfg.jpg" class="md-local-image" alt="Digital Ocean Server Locations" >}}

Mira: puedes conseguir 1M tokens por solo $1 USD en el modelo Deep Seek.

Esto está simplemente brutal: no necesitas instalar Ollama, ni rentar una GPU, ni pagar un plan mensual en OpenAI, solo pagas lo que usas. Perfecto.

## Otros servicios disponibles en Digital Ocean

¿Recuerdas las empresas IAAS y PAAS? Bueno, muchas de las IAAS, incluida Digital Ocean, han crecido tanto que ahora ofrecen también servicios tipo PAAS.

Desde hace poco ofrecen integración y despliegue de tus aplicaciones usando tus repositorios de Github o Gitlab. Subes tu código y ellos lo compilan y ejecutan, con CI/CD incluidos.

{{< figure src="images/Digital-Ocean-Apps.png" class="md-local-image" alt="Apps Service" >}}

Digital Ocean también ofrece servicio de CDN, llamados *Spaces*, compatibles con Amazon S3, desde $5 USD al mes.

### Kubernetes clusters en DO

Digital Ocean te permite crear Kubernetes clusters con almacenamiento y balanceadores de carga en unos pocos clics.

### Apps

Las Apps son parecidas a una solución *serverless*: conectas tu cuenta de Github, Gitlab o Bitbucket con Digital Ocean y puedes subir aplicaciones Node o archivos estáticos para que ellos los sirvan. Incluso puedes especificarles que ejecuten compilaciones o cualquier comando que necesites. Hasta ahora, **es la solución más barata que ofrece Digital Ocean**, y es excelente para manejar aplicaciones Frontend.

Los sitios estáticos no tienen costo extra y funcionan bastante bien, este blog corre sobre uno de ellos.

### Volúmenes

Es espacio adicional que agregas a tus Droplets para aumentar su capacidad, como si conectaras un disco duro extra.

### Bases de datos

Bases de datos autogestionadas con respaldos automáticos y cifrado opcional. Manejan Postgres, MongoDB, MySQL y Redis.

## Digital Ocean vs AWS vs Azure

Digital Ocean está más enfocado en proyectos pequeños y medianos, no tiene tantas soluciones como AWS o Azure.

Según el contenido que estudié para la [Certificación Azure AZ-900]({{< ref path="/posts/software-architecture/examen-certificacion-azure-az-900-mi-experiencia/index.md" lang="es" >}}), la plataforma de Microsoft tiene un sinfín de servicios, lo que se te ocurra.

Por ejemplo, Digital Ocean no tiene soluciones de inteligencia artificial para análisis de seguridad IT, análisis de big data u otras opciones de SaaS. Pero, a cambio de esas carencias, que dejan más trabajo a los devs, ofrece precios mucho más competitivos que los gigantes del sector.

## Mi experiencia usando Digital Ocean hasta ahora

He usado Digital Ocean para hospedar proyectos personales y también para administrar mis dominios. Hasta el momento no he tenido problemas de caídas en los servidores, o al menos no que yo haya notado ni que algún usuario me haya reportado.

De hecho, ahora mismo estás leyendo esto ~~desde un Droplet con Wordpress sin interfaz y frontend frontity (un framework de React) servido con Nginx~~ con Hugo y alojado en Digital Ocean. Este blog usa ~~el servicio más barato, el de $5 USD~~ el servicio de Apps, que es completamente gratis para sitios estáticos. Y la verdad, para el tráfico que tengo no se siente lento, mantiene métricas decentes en Lighthouse, sin ningún tipo de caché ni optimización avanzada.

{{< figure src="images/Coffeebytes-lighthose-indicadores.png" class="md-local-image" alt="Indicadores de Lighthose para coffeebytes.dev" >}}

~~Cabe aclarar que sí modifiqué algunas configuraciones por defecto para mejorar el rendimiento. Por ejemplo, habilité HTTP2 en lugar de HTTP, además de instalar el certificado SSL con cerbot en la terminal, ya que la instalación por defecto no lo incluía. Cosas extras que otros servicios de hosting me habrían resuelto, como [easywp](/en/linux/my-experience-using-easywp-and-namecheap/).~~

## Resumiendo mi experiencia con DO

Mi experiencia hasta ahora ha sido bastante buena, no tengo quejas en cuanto al rendimiento que prometen, por supuesto me reservo el derecho de cambiar de opinión.

{{< box link="[https://m.do.co/c/a22240ebb8e7](https://m.do.co/c/a22240ebb8e7)" type="info" message="Si decides probarlo, te regalo $200 USD para que experimentes por ti mismo lo que Digital Ocean tiene para ofrecer, solo haz clic en este banner.">}}

Si no quieres meterte con Apache, Nginx o configuraciones de servidores, quizá un Droplet de Digital Ocean no sea la mejor opción para ti.

Por otro lado, Digital Ocean ofrece uno de los mejores precios para arrancar un proyecto: $3 USD (o gratis para sitios estáticos) por el paquete más básico (Apps) es un **precio increíblemente bajo** para páginas estáticas o solo con Frontend.


