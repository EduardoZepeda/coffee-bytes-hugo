---
aliases:
- /es/mis-errores-de-optimizacion-en-el-seo-tecnico-de-mi-sitio-web/
- /es/seo/mis-errores-de-optimizacion-en-el-seo-tecnico-de-mi-sitio-web/
authors:
- Eduardo Zepeda
categories:
- SEO
- opinion
coverImage: images/automation-and-intellectual-property-developers.jpg
date: 2024-04-27 19:49:56
description: Te cuento todo sobre mis errores en SEO técnico al migrar mi sitio desde Wordpress, lo que hice mal, que hice bien y lo que aprendí al optimizar el SEO técnico de mi sitio web 
keywords:
- opinion
- seo
- web development
- sitemap
- wordpress
- hugo
slug: /seo/mis-errores-de-optimizacion-en-el-seo-tecnico-al-migrar-de-wordpress/
title: Mis errores de optimización en el SEO técnico al migrar de Wordpress
---

Hace unos años, migré mi sitio web un par de veces, primero de Wordpress a Frontity (Un framework de wordpress en React) y luego de Frontity a una [app de Hugo en Digital Ocean]({{< ref path="/posts/software-architecture/digital-ocean-analisis-y-mi-experiencia/index.md" lang="es" >}}). No me arrepiento para nada de mi decisión, pero cometí unos cuantos errores respecto al SEO que probablemente puedas evitar si tomas en cuenta lo que estoy a punto de contarte.

Tras el error incluso escribí una [{{<title "/posts/seo/guia-de-seo-tecnico-para-desarrolladores-web/index">}}]({{< ref path="/posts/seo/guia-de-seo-tecnico-para-desarrolladores-web/index.md" lang="es" >}})

## ¿Por qué debería importarte el SEO en el desarrollo web?

El SEO es el factor que determina si un sitio web aparece primero en los resultados de búsqueda de un motor de búsqueda (casi siempre Google pero puede ser Duck Duck Go, Bing, Yandex, entre otros) o si es sepultado en las últimas posiciones, recibiendo poco o nulo tráfico y condenando al negocio que representa a la quiebra, o si es un proyecto personal, al olvido total junto con tus sueños de grandeza.

{{<ad0>}}

Y no estoy hablando de diferencias sútiles, estoy hablando de diferencias abismales.

A riesgo de sonar redundante, lo repetiré nuevamente: el tráfico de un sitio web es mucho más importante que la eficiencia, el aspecto o el lenguaje o framework con el que esté hecho, sí, aunque lo escribas en C++, Rust o directo en ensamblador.

{{< figure src="images/aves-exoticas-org-bad-ui-good-seo.jpg" class="md-local-image" alt="Aves exoticas is a perfect example of a web site with good seo but awful UI" caption="Aves exoticas es el ejemplo perfecto de un sitio web visualmente no tan atractivo, pero con un SEO impecable que lo posiciona en la primera posición en google."  width="500" height="322" >}}

### ¿El SEO sirve? Los desarrolladores web suelen ignorarlo

La mayoría de los desarrolladores poseen un background ingenieril, donde se valora la eficiencia, las buenas prácticas y se pasa por alto el aspecto comercial de un sitio web. 

De ahí que cuando un desarrollador web lanza sus proyectos personales, suele ignorar por completo el SEO y se centra, [erróneamente, en optimizar su sitio web al máximo](/es/opinion/no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web/), generalmente consiguiendo un sitio web extremadamente rápido, eficiente, e incluso visualmente atractivo, pero sin tráfico.

{{< figure src="images/web-development-assembly.webp" class="md-local-image" alt="Web development in assembly meme" caption="Dicen por ahí que solo los verdaderos programadores programan en lenguajes de bajo nivel"  width="500" height="654" >}}

{{<ad1>}}

## Mis errores al migrar un sitio web de Wordpress sin considerar el SEO

Cuando migré el blog lo primero que ignoré fueron las múltiples consecuencias de hacerlo abruptamente. Para empezar el sitemap, posteriormente la estructura de las URL y por último, como cereza del pastel, la ausencia de un schema.

### La presencia de un sitemap es crucial en el SEO

[Un sitemap es un archivo xml que funciona como un mapa de tu sitio web](/es/django/sitemap-dinamico-con-django/). 

{{<ad2>}}

El sitemap que tenía mi sitio web anterior se encontraba en una dirección específica, cuando migré el sitio web esa dirección cambió, por lo que Google fue incapaz de encontrar el nuevo sitemap, ¿qué sucedió? Google indexó las páginas como pudo y quiso y, como seguramente ya sabrás, no fue la mejor manera y sufrí las consecuencias. 

Me di cuenta lo mal que estaba cuando una noche mi celular vibró al ritmo de la cascada de advertencias que Google Search Console mandaba en forma de  notificaciones de mi celular.

{{<box type="info" message="Un sitemap es un índice, usualmente en formato XML, que lista las páginas de tu sitio web">}}

¿Cómo pude evitarlo? Entrando en Google search console y reemplazando la vieja dirección del sitemap por la nueva y solicitándole a los sistemas de google una nueva lectura.

### Como me di cuenta de que la estructura de las URLs es importante en el SEO

Pero mi pesadilla no terminó ahí, tras la migración de Wordpress a Hugo Google detectó una gran cantidad de errores 404 al acceder a las viejas URLs y, como resultado de la consecuente penalización, mi tráfico disminuyo cerca de un 70%.

{{<ad3>}}

¿Por qué sucedió esto? Imagínate que los motores de búsqueda ven tu sitio web con una estructura URL como la siguiente.

``` mermaid
graph TD;
    Website-->Year;
    Year-->Month;
    Month-->Day;
    Day-->Entry_1;
```

Y cuando tu realizas la migración, la estructura cambia;

``` mermaid
graph TD;
    Website-->Posts;
    Posts-->Entry_1;
```

Lo importante a recordar aquí es que los motores de búsqueda no tienen una manera de reconocer fácilmente que una entrada es exactamente la misma que otra si ha cambiado de ubicación, sobre todo si esta migración conlleva cambios ligeros en los elementos HTML de la página. Si bien es cierto que Google puede detectar contenido duplicado y es capaz de renderizar una página web, eso no significa que "vea" las entradas de manera visual, como un humano lo haría, en sus entrañas sigue recibiendo y analizando texto en forma de HTML.

### ¿Cómo pude haber evitado esa caida de tráfico?

Por medio de una redirección, en este caso bastaba con indicarle a Google que si accedia a */2020/12/12/entry_1* debía redirigirse a */posts/entry_1*, ¿y cómo? [retornando una respuesta HTTP 302 o 308]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="es" >}}), Found or Permanent redirect, respectivamente.


### La ausencia del marcado de datos estructurados o Schema 

Cuando usaba Wordpress el plugin Yoast se encargaba del marcado de datos estructurados, pero en Hugo esto tiene que realizarse de forma manual, por lo que mi sitio web duró un tiempo sin estos datos estructurados, ¿el resultado? Una penalización de google en forma de una disminución de las impresiones, y por ende el tráfico de mi sitio web.

{{< figure src="images/schema-ld+json.png" class="md-local-image" alt="Captura de pantalla del marcado de datos estructurados en un sitio web" caption="El marcado de datos estructurados para un sitio web luce así"  width="677" height="196" >}}

{{<box type="info" message="El marcado de datos estructurados se presenta generalmente en forma de un script de tipo application/ld+json en un sitio web, no se puede apreciar de forma visual pero es leído por los motores de búsqueda y les sirve para entender el tipo y las relaciones que existen entre cada una de las entidades de tu sitio web.">}}

¿Cómo pude evitar este error? Simplemente añadiendo un esquema de datos estructurados personalizado y leyendo al respecto en [la págia oficinal de schema org](https://schema.org#?)


## No olvides actualizar la Google Search Console

Si vas a cambiar también de dominio al cambiar tu sitio web, Google Search Console tiene una herramienta que te permite indicarle a Google que vas a cambiar el dominio, de esta manera Google "sabe" que vas a migrar tu contenido y puede hacer una equivalencia de las nuevas URLs a las viejas, para que no pierdan posiciones en su sistema de ranking.

## Recuerda guardar la misma estructura semántica

Si vas a migrar de Wordpress, esta plataforma tiene cierta estrutctura de urls, por ejemplo:

``` bash
/category-1/title-54
/category-2/title-12
```

Asegúrate de que cada url en tu nuevo sitio guarde la misma estructura, tendrás que trabajar extra pero con eso te aseguras de que los buscadores entiendan las jerarquias que existen entre los elementos de tu sitio web de la misma manera.

Esa es la trágica historia de como disminuí mi tráfico siendo un lego en el SEO. 

Pero tras este incidente hay un final feliz, pues me puse a leer y ver videos al respecto y aprendí muchísimas cosas que puse en práctica, ahora mismo el sitio web no está al nivel que estaba antes pero se dirige hacía allá y lo mejor es que ahora sí sé lo que estoy haciendo.

No me había dado la oportunidad de tocar este tema en el blog, porque semánticamente está bastante alejado de lo que la mayoría de devs entiende por desarrollo web, aunque realmente no lo sea. 

Pero por fin me decidí a plasmar estos erorres en una entrada y si pueden ahorrarte un par de dolores de cabeza, pues que mejor.