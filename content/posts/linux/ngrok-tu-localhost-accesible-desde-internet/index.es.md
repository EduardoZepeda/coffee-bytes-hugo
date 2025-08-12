---
aliases:
- /ngrok-tu-localhost-accesible-desde-internet
- /es/ngrok-tu-localhost-accesible-desde-internet/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/ngrok-coffee-bytes.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@pepecaspers/
date: '2021-04-29'
description: Ngrok vuelve público tu localhost, ya sea para hacer testeo de respuestas
  a tus endpoints o mostrarle avances a tus clientes.
keywords:
- linux
slug: /linux/ngrok-tu-localhost-accesible-desde-internet/
title: Ngrok, tu localhost accesible desde internet
noindex: true
---

Me topé con Ngrok (frecuentemente mal escrito como ngrock o negrok) intentando redirigir la notificación de un pago de Mercado Pago a mi localhost, para hacer pruebas. Funcionaba más o menos así: Mercado pago te otorgaba una dirección url a donde redigir al comprador para efectuara el pago. Una vez terminado el pago, Mercado Pago hacía una petición HTTP a cualquier dirección url que tú le indicaras y mandaba por POST los resultados del intento de pago. El problema es que mercado libre no manda notificaciones a localhost.

## ¿Qué es ngrok?

Ngrok es una aplicación que te permite conectar tu localhost con internet.

Lo que hace Ngrok (Recuerda que ngrock y negrok están mal escritos) es servir como un túnel que redirige cualquier petición web, a través de sus propias urls, a tu localhost. Esto puede usarse para probar un webhook o recibir notificaciones, una tarea bastante común en pasarelas de pago, compartir tu localhost con colaboradores sin necesidad de un dominio propio, etc.

{{< figure src="images/EsquemaNgrok.png" class="md-local-image" alt="Esquema del funcionamiento de ngrok" >}}

{{<ad>}}

## Instalación de Ngrok

Para instalar Ngrok entra directamente en [su sitio web](https://ngrok.com/#?) y creemos una cuenta o iniciemos sesión. Puedes usar Github o Gmail si no quieres registrarte.

## Uso básico de ngrok

Para ejecutar ngrok en GNU/Linux basta con correr el ejecutable, seguido de la opción http y un número de puerto. Yo usé 8080 pero puedes usar el que prefieras.

```bash
./ngrok http 8080
```

Si todo funcionó correctamente verás algo parecido a est en tu terminal

{{< figure src="images/NgrokTerminal.png" class="md-local-image" alt="Información de Ngrok en la terminal" >}}

¿Qué significa la pantalla de arriba? Significa que todas las peticiones que se hagan a http://ngrok.io; es decir, al subdominio fc2ca35fd170 del dominio de ngrok, se redirigirán a tu localhost, específicamente al puerto 8080. Y es todo, así de simple y fácil de usar.

## ¿Cómo usar ngrok con Django?

Para este ejemplo redigirí una aplicación de Django en el puesto 8000, en lugar del puerto 8080.

Si no tienes idea de como usar Django tengo algunas recomendaciones de libros: [Django la guia definitiva]({{< ref path="/posts/django/el-libro-definitivo-de-django/index.md" lang="es" >}}) y [Django by example]({{< ref path="/posts/django/aprender-django-resena-django-by-example/index.md" lang="es" >}}).

Recuerda agregar el dominio, con su subdominio a la variable ALLOWED\_HOSTS del archivo de configuración.

```python
# app/settings.py
ALLOWED_HOSTS = ['8da947737113.ngrok.io']
```

Corramos el servidor de Django, por default correrá en el puerto 8000

```bash
python manage.py runserver
```

Si ahora ejecutamos ngrok, especificamos el puerto 8000 y accedemos a la dirección que nos indica, visualizaremos nuestra aplicación.

```bash
ngrok http 8000
```

{{< figure src="images/NgrokEjemploDjango.png" class="md-local-image" alt="Información de la información de Ngrok para el ejemplo de Django" >}}

Observa el dominio en el que se ejecuta nuestra aplicación de Django.

{{< figure src="images/NgrokTunnel-1.png" class="md-local-image" alt="Aplicación de Django corriendo en el dominio de Ngrok" >}}

¡Logramos poner nuestra aplicación al acceso de cualquier persona que tenga la url que ngrok nos provee!


## Ngrok con Wordpress o React no funciona

Si la conexión se queda colgada con Wordpress cuando intentas usar Ngrok, añade el siguiente flag a tu comando de ngrok. Este reescribirá el header host en la petición HTTP y solucionará tu problema.

``` bash
ngrok http <puerto> --host-header=rewrite
```

## Ngrok alternativas

- [Zrok](https://zrok.io/#?)
- [TunnelMole](https://tunnelmole.com/docs/#installation#?)
- [Rathole](https://github.com/rathole-org/rathole#?)
- [List of alternatives](https://github.com/anderspitman/awesome-tunneling#?)