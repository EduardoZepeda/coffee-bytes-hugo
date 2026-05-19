---
date: '2026-02-27T15:50:49-06:00'
title: 'Mi experiencia usando n8n y mi opinión'
categories:
- n8n
coverImage: "images/n8n-mi-impresion-y-opinion.jpg"
description: 'Resumen minimalista sobre n8n, sus elementos, para que sirve, como se usa, que necesitas saber para usarlo y mi opinión sobre los aspectos buenos y malos de esta herramienta'
keyword: 'n8n'
keywords:
- 'n8n'
authors:
- 'Eduardo Zepeda'
---

Llevo ya un tiempo utilizando **n8n** para automatizar procesos en páginas de Facebook, sitios webs, whatsApp y, combinándolo con otras herramientas. Después de este tiempo de uso, creo que ya puedo compartir una visión un poco más clara de lo que ofrece esta herramienta y si realmente vale la pena.

Si has vivido debajo de una roca o eres nuevo en el mundo de la tecnología, n8n es una herramienta de automatización bastante popular. Su principal atractivo es que te permite crear flujos de trabajo complejos de una manera muy visual: adios líneas de código, hola nodos; aquí solo tienes que arrastrar y soltar recuadros sobre un lienzo y conectarlos entre ellos.

{{< video src="https://res.cloudinary.com/dwrscezd2/video/upload/v1772238652/coffee-bytes/n8n-nodes_ts1qya.webm" class="md-local-image" >}}

## ¿Qué se puede hacer exactamente con n8n?

En términos prácticos, **casi cualquier cosa**. La herramienta es increíblemente versátil. Puedes hacer que un proceso se active por un evento específico, como la llegada de un mensaje a WhatsApp o Telegram, una nueva entrada en un blog vía RSS, o incluso programarlo para que se ejecute de forma periódica (como un [clásico cron en Linux]({{< ref path="/posts/linux/cron-y-crontab-programa-tareas-periodicas/index.md" lang="es" >}}) del que ya te hablé en otra entrada).

### Nodos en n8n

Todo en n8n gira en torno a los **nodos**. Estos son los bloques con una función única y específica que vas conectando visualmente para construir tu automatización. 

Hay una enorme biblioteca de nodos "out of the box" para casi todos los servicios populares, todo muy normie: WordPress, Google Calendar, Telegram, y por supuesto, la mayoría de redes sociales. Los nodos hacen cosas concretas como: mandar un email, ejecutarse cada "x" minutos, monitorear un RSS cada "x" segundos. 


{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238513/coffee-bytes/nodes-menu-n8n_meeonp.png" alt="Menu de nodos en n8n" class="md-local-image"  width="383" height="529" >}}

También hay nodos más técnicos para crear condicionales (sentencias `if`), bucles, peticiones HTTP directas, o incluso ejecutar código propio en **JavaScript y Python**. Sí, leíste bien, nada de Rust, Go ni demás lenguajes esotéricos, puro lenguaje de script kiddies para hacer enojar a los devs de antaño.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238511/coffee-bytes/http-request-n8n_zrlgyh.png" alt="Nodo de petición HTTP en n8n" class="md-local-image"  width="415" height="579" >}}

Estos nodos se unen de manera que el output de uno(s) se vuelve el input del otro(s) y a la estructura que resulta de varios nodos conectados se le puede simplificar llamándolo flujo o flow, el cual se almacena en formato JSON y puedes verlos recien al abrir la app.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772239025/coffee-bytes/flows-n8n_cb9psf.png" alt="Listado de flujos en n8n" class="md-local-image"  width="1196" height="345" >}}

### Soporte de n8n para la AI

Además, n8n ofrece soporte para la inteligencia artificial. Cuenta con nodos de **agentes de IA** donde puedes conectar [tu modelo LLM favorito]({{< ref path="/posts/artificial-intelligence/fine-tuning-de-un-modelo-de-inteligencia-artificial/index.md" lang="es" >}}) (OpenAI, Cohere, etc.) para que sea el cerebro de alguna tarea. Y permita que el LLM se conecte a herramientas ya predefinidas, como para agendar un evento, devolver un mensaje de texto, como en el [Model Context Protocol]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="es" >}}), modificar un archivo de excel en linea, etc. 

Seguro te suena familiar ¿no? son [servidores MCP]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="es" >}}) para n8n.


### Soporte de base de datos en n8n

También incluye conectores a bases de datos como Redis, Supabase, PrismJS y herramientas que funcionan como pequeños servidores para interactuar con servicios externos.

### n8n gestiona tus credenciales

Y no solo eso: gestiona tus **credenciales** de forma segura (cifradas, nada de archivos de entorno expuestos), para que no cometas la burrada de hardcodearlas en el código o dejarlas en un archivo que está expuesto al exterior.  

### Los flujos en n8n se pueden exportar

N8n te permite guardar tus flujos como **plantillas** para reutilizarlas o compartirlas con colegas o subirlas a git.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772238511/coffee-bytes/import-template-menu-n8n_ryscyv.png" alt="Menú para importar y exportar flujos en n8n" class="md-local-image"  width="158" height="295" >}}

 Además tiene un panel de control para **monitorear** todos los flujos en ejecución, viendo cuáles funcionan correctamente y dónde se producen errores para poder corregirlos al instante.

 {{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1772239025/coffee-bytes/executions-logs-n8n_m4o0ex.png" alt="Resumen de los flujos en n8n" class="md-local-image"  width="1196" height="441" >}}

## ¿Puedo usar n8n sin saber programar?

Sí y no. No planeo mentirte con un falso discurso aspiracionista del estilo "aprende n8n en 24 horas y empieza a cobrar miles de dólares", pero tampoco estoy para tirar tus ánimos al suelo diciéndote que si no eres un Tech-savvy no vas a poder. 

¿Entonces? Mira, mi opinión es que si entiendes el concepto de un bucle, de una condición if/else y entiendes el formato JSON ya puedes hacer automatizaciones sumamente simples. Para crear algo más complejo tendrás que completar tus conocimientos, tienes que entender lo siguiente: 

- [Qué es una REST API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="es" >}})
- Cuales son las diferencias entre una petición GET, POST, PUT, PATCH, OPTIONS, HEAD, DELETE, para que y cuando se usa cada una 
- Qué son headers en el contexto de una petición HTTP
- Qué son parámetros en el contexto de una petición HTTP
- Cómo funciona la autenticación en servicios de terceros por medio de tokens
- Qué es un webhook
- Conocimientos de las funciones más básicas de [Javascript y/o Python]({{< ref path="/posts/javascript/python-vs-javascript-2021-cual-es-el-mejor-diferencias-y-similitudes/index.md" lang="es" >}})

Probablemente con eso tengas cubierto lo mínimo para empezar a complicarlo. Además te advierto, n8n es una herramienta de automatización. No vas a crear el siguiente unicornio con ella, y ni siquiera he hablado de lo restrictivo de su licencia.

## Lo que más me gustó de n8n

### Gran cantidad de funcionalidades listas para usar

Sin duda, lo mejor es la **facilidad para crear automatizaciones sencillas**. La parte visual es genial, pero el verdadero valor está en que muchos servicios ya vienen "pre-configurados". Te olvidas de tener que lidiar con llamadas a APIs complejas o instalar SDKs específicos de cada plataforma, la mayoría de los casos ya están cubiertos. Simplemente te concentras en la lógica de tu flujo y en pegar las claves API necesarias. La curva de aprendizaje es muy amigable.

### N8n es perfecto para probar ideas

N8n es la herramienta de prueba definitiva, ya que permite probar ideas de automatización en un tiempo récord, de forma fácil y más visual, incluso sin tener experiencia previa en programación.

### Fácil de respaldar y replicar

El **sistema de plantillas JSON** también me parece una gran característica. Poder compartir un flujo complejo con un compañero sin que este necesite el mismo nivel de conocimientos técnicos agiliza enormemente el trabajo en equipo.

## Lo que no me terminó de convencer de n8n

### Alto consumo de recursos

Pero no todo es perfecto. El principal "pero" que le encuentro es el excesivo **consumo de recursos**. El cual es, desde mi punto de vista, bastante exagerado. Las recomendaciones oficiales piden nada menos que **4 GB de RAM, 2 CPUs y 20 GB de espacio en SSD**. 

Puedo entender que por debajo hay un servidor y una infraestructura corriendo, montón de SDKs instalados, pero para lo que básicamente es un gestor de flujos, me parece una barbaridad. Estoy seguro de que los mismos scripts en Python o JavaScript que ejecutan esas automatizaciones funcionarían con menos de la mitad de estos requisitos.

Considera que probablemente la mayoría de empresas pequeñas estén ejecutando unos 5-10 flujos, un VPS de 4GB de RAM y 2 CPUs para ejecutar 10 scripts... no me convence al cien, sobre todo para startup minimalistas con recursos muy limitados.

Mira la cantidad de recursos que usa n8n comparado con una aplicación sencilla de Nextjs.

![Comparación de memoria usando n8n y nextjs](https://res.cloudinary.com/dwrscezd2/image/upload/v1779208913/coffee-bytes/n8n-memory-consumption-vs-nextjs_rcff0d.png)

### Actualización manual

Otro aspecto que no encuentro atractivo es que n8n requiere actualización manual, es necesario entrar a la terminal, y actualizar el paquete, reiniciar los servicios. Sí, es cierto, puedes programar esta actualización pero corres el riesgo de que si n8n rompe algo, tu aplicación fallará de un día para otro y no sabrías ni porque.

### Se sobreestiman las capacidades de n8n

Quizás debido al excelente marketing, las personas creen que n8n es una navaja suiza que reemplaza el código por completo y entonces se crean expectativas irrealistas. No, n8n no puede servirte la misma cantidad de peticiones que un servidor dedicado en Rust, Go o cualquier otro lenguaje de bajo nivel. No, n8n no es un web scrapper para scrappear concurrentemente todos los productos de los más grandes e-commerces. 

N8n es bueno para automatizar tareas por gente no técnica, es todo.

### La licencia de n8n es más restrictiva de lo que la gente cree

El otro punto que me genera reservas es el tema de la **licencia**. A diferencia de muchos proyectos open source populares, **n8n no usa una licencia MIT**. Esto, en la práctica, limita un poco lo que puedes hacer con él. Por ejemplo, [de acuerdo a usuarios de reddit, no está permitido alojar una instancia de n8n para cobrar a clientes por mantener sus flujos funcionando](https://www.reddit.com/r/n8n/comments/1mo4a5h/what_youre_selling_is_illegal_n8n_license/) (un modelo de "automatización como servicio"). 

Lo que sí puedes hacer es ofrecer servicios de consultoría o implementación, pero no un hosting directo. Entiendo que un proyecto tan ambicioso requiere un modelo de negocio sostenible, pero es una restricción a tener en cuenta si buscas la máxima libertad.

Esto lo tomé de un post de reddit, no es ningún tipo de consejo legal y tómalo con pinzas:

> ✅ What you CAN do
> 
> - Use it internally within your own business for free.
> 
> - Build automations for clients using their own n8n installation.
> 
> - Charge for workflow creation, setup, and maintenance, but NOT for hosting or “selling n8n as a service.”
> 
> 🚫 What you CANNOT do
> 
> - Offer n8n as SaaS (Software as a Service).
> 
> - Do white labeling (remove n8n branding and replace it with your own).
> 
> - Charge customers to use “your” hosted instance of n8n.


Antes de creer a ciegas, asegúrate de  consultar [la licencia oficial de n8n](https://docs.n8n.io/sustainable-use-license/) aquí.