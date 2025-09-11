---
aliases:
- /como-crear-una-contrasena-segura
- /como-crear-una-contrasena-segura/como_escribir_una_buena_contrasena/
- /como-crear-una-contrasena-segura/feed/
- /es/como-crear-una-contrasena-segura/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/como_escribir_una_buena_contraseña.jpg
date: '2020-07-02'
description: Aprende a crear una contraseña segura que proteja tus cuentas personales,
  y las de tus clientes, de los criminales informáticos.
keywords:
- linux
- opinion
slug: /linux/como-crear-una-contrasena-segura/
title: ¿Cómo crear una contraseña segura?
---

Uno de mis amigos trabajaba como auditor de seguridad informática en una empresa cuyo nombre no mencionaré por razones obvias. Eventualmente nuestra conversión llegó al tema de su día a día en el trabajo, le pregunté acerca de sus funciones en la empresa y me respondió que su trabajo consistía principalmente en regañar y educar a los empleados sobre lo débiles que eran sus contraseñas. Lo crítico de esto es que muchas de esos empleados eran los encargados de crear los sistemas informáticos de los clientes para los que trabajaban. Sí, profesionales en TI que son descuidados con sus contraseñas, uno pensaría que es imposible, pero es mucho más común de lo que se cree. Muy pocas personas saben crear una contraseña segura.

Por la razón anterior he decidido compartir un poco sobre lo que he leído al respecto en blogs, libros y videos.

## Las contraseñas débiles son riesgosas

Dicen que una cadena es tan fuerte como su eslabón más débil. Las contraseñas son en muchos casos el eslabón más débil. Un sistema informático puede carecer de vulnerabilidades y tener los últimos parches de seguridad, pero de nada sirve si todo eso está resguardado por una débil contraseña. Y no, no estoy hablando de abandonar contraseñas del tipo "admin123" o "firulais" en favor de sus versiones modificadas: "4dm1n123" o "f1rul415". Hablo de que las contraseñas deben de ser más un muro para los atacantes que una segunda entrada a tus sistemas.

{{<ad1>}}

## ¿Cómo es una contraseña segura?

¿Qué características debe de tener una contraseña para que sea segura? Pues una contraseña segura tiene que reunir varias características para hacerle la vida difícil a los cyber criminales. Te dejo aquí mis consejos para crear una buena contraseña que sea segura.

## Crea una contraseña larga

**Mientras más corta sea una contraseña más fácil es obtenerla por fuerza bruta.** Considerando la capacidad actual de procesamiento de las computadoras, las contraseñas con menos de 8 caracteres son prácticamente una invitación a que alguien ingrese en nuestras cuentas.

```bash
**** # Pésimo
******** # Mal
******************** # Bien 
```

## Mantén tus contraseñas ajenas a tu información personal

{{<ad2>}}

Es bastante tentador crear una contraseña fácil de recordar utilizando el nombre de tu pareja, tu cumpleaños o el de tus seres queridos, tu dirección, tu número de celular o el nombre de tu mascota, pero es muy inseguro; cualquier persona puede tener acceso a esa información. Basta con un vistazo rápido a tus redes sociales o una plática con alguno de tus conocidos para conseguir toda esa información.

"Pero, lo que sucede es que mi contraseña es una mezcla de esas cosas", no, aún así, no es suficiente. Hay programas como [JohnTheRipper](https://github.com/magnumripper/JohnTheRipper) capaces de generar todas la combinaciones posibles a partir de tus datos personales, por lo que no es seguro de ninguna manera. Tu contraseña no debe tener partes que puedan conseguirse a partir de una plática contigo o tus conocidos. Va de nuevo, **tu contraseña no debe estar basada en ninguna información personal relacionada con tu persona.**

```bash
CalleFalsa123 # Mal, no nombres de donde vives, o de series que te gustan
5555551111 # No uses tu celular de contraseña
19-oct-1990 # Tu fecha de nacimiento no debería estar en una contraseña
```

## Evita las contraseñas que aparecen en diccionarios

Hay un montón de diccionarios en la red con las contraseñas más populares, como [rockyou](https://github.com/praetorian-code/Hob0Rules/blob/master/wordlists/rockyou.txt.gz), algunos incluso enlistan todas aquellas contraseñas que han sido obtenidas a partir de hackeos a sitios web. 

Asegúrate de que tu contraseña no se encuentre en ninguno de esos diccionarios. Un potencial atacante siempre usará las contraseñas de los diccionarios más comunes para intentar comprometer un sistema, si tu contraseña está en uno de esos diccionarios es casi seguro que tu cuenta será un blanco fácil.

{{<ad3>}}

```bash
# Estas contraseñas están en el top de contraseñas más comunes
# NO LAS USES
iloveyou 
Qwerty
password1
adobe123
```

## Usa una contraseña diferente para cada sitio web

Abundan las personas que utilizan una sola contraseña para todos sus sitios web; correo electrónico, redes sociales, hosting, celulares, etc. 

Una sola contraseña es muy fácil de recordar, pero si alguien llega a averiguarla tendrá acceso a todas las cuentas que tengas resguardadas bajo la misma contraseña. Es mucho mejor tener una contraseña diferente para cada sitio web. Así, en el caso de que alguien averigüe esa contraseña, solo se verá comprometida una única cuenta. Además si ocurriera alguna filtración de algún sitio web el resto de tus cuentas seguirán a salvo.

```bash
# EVITA HACER ESTO
Contraseñas para aws, gmail, netifly, banco: password1
# MEJOR HAZ ESTO, UNA CONTRASEÑA DIFERENTE PARA CADA SITIO WEB
aws: Hc4NL5sDr7VvhgL3AkTk
gmail: caJiJiNa9fUWQ6GZRHdB
netifly: 2Sdmsi2CaVZksfEEVf5U
```

## Evita los caracteres secuenciales

Muchas contraseñas contienen caracteres secuenciales tales como "1234", "abcde", "xyz", "789". 

Evita que los caracteres tengan una secuencia predecible. Asegúrate de que los diferentes caracteres de tus contraseñas no estén uno junto al otro en el abecedario o en los números ordinales.

```bash
# MAL, EVITA ESTO
Increible123
potato789
xyz123456
abc2020
```

## La variedad es buena

**Asegúrate de que tu contraseña incluya mayúsculas, minúsculas, caracteres especiales y números, mezclados**. De esta manera aumentamos muchísimo la cantidad de intentos que tiene que realizar un atacante para obtener una contraseña, pues ahora tendrá que incluir caracteres especiales, números, mayúsculas y minúsculas en cada intento.

```bash
# 
aliensaristoteleselectron # Minúsculas
AliensAristotelesElectroN # Minúsculas y mayúsculas
9Aliens1Aristoteles32ElectroN # Mayúsculas, minúsculas y números
9[Aliens]1|Aristoteles|32-ElectroN- #Mayúsculas, minúsculas, números y caracteres especiales
```

## Asegúrate de que el tiempo estimado en romper tu contraseña sea largo

Debes de recordar que **absolutamente todas las contraseñas pueden ser obtenidas por medio de fuerza bruta**, lo que marca la diferencia es el tiempo que toma conseguir esto. Cuando creamos una contraseña fuerte no estamos aspirando a tener una contraseña imposible de romper, **sino una en la que el tiempo que requiera romperla lo haga impráctico para el atacante.** Hay sitios web donde puedes averiguar el tiempo estimado para obtener una determinada contraseña por fuerza bruta.

**Nota importante:** El sitio web que publicaré es para propósitos informativos. **Nunca teclees una contraseña que usas (o usarás) en un sitio web que no conoces** (incluido este), no sabes si pueden almacenarla para usarla después. Yo ya me aseguré de que el sitio web no manda peticiones web al usarse. Pero, incluso así, es una mala práctica teclear tus contraseñas en otros sitios web, no lo hagas.

Bien, una vez advertido puedes visitarlo entrando en [este enlace](https://howsecureismypassword.net/#?). De cualquier forma aquí tienes algunos ejemplos de contraseñas y el tiempo aproximado que tomaría romperlas por fuerza bruta.

<table><tbody><tr><td><strong>Contraseña</strong></td><td><strong>Tiempo</strong></td></tr><tr><td>firulais</td><td>5 segundos</td></tr><tr><td>admin123</td><td>1 minuto</td></tr><tr><td>F1rul415</td><td>1 minuto</td></tr><tr><td>unP3rritoTrist3:(</td><td>3 cuadrillones de años</td></tr><tr><td>jXkeLCfcPfTqtCFEtMFy</td><td>16 cuadrillones de años</td></tr><tr><td>v&lt;eVZ&amp;C=&gt;-h-3H9`%y5*</td><td>6 sextillones de años</td></tr><tr><td>Aristoteles-Tira-Rocas-A-Platon</td><td>300 undecillones de años</td></tr></tbody></table>

Datos obtenidos de https://howsecureismypassword.net

Se puede apreciar que incluso aunque incluir números en una contraseña no la vuelve fuerte automáticamente, por otro lado a mayor longitud y presencia de caracteres especiales. No necesariamente debe ser una contraseña ilegible compuesta de caracteres aleatorios, de hecho muchas veces es mejor una contraseña compuesta de palabras o una frase que tenga sentido **únicamente para ti.**

## Un poco más sobre seguridad

Incluso si cuentas con una contraseña muy fuerte esta será completamente inútil si un atacante la averigua usando otros métodos diferentes a la fuerza bruta. Aquí unos cuantos consejos sobre seguridad informática relacionados con contraseñas.

- Evita ingresar tu contraseña en computadoras públicas, nunca sabes si hay algún keylogger físico o virtual instalado
- Mantente alejado de sitios web que no están cifrados, prefiere siempre aquellos sitios web que usan HTTPS en lugar de HTTP
- No ingreses contraseñas en redes públicas, tales como cafeterías o redes abiertas, nunca sabes si la red está siendo presa de un ataque MITM
- Cuidado con las personas que te miran mientras tecleas, a veces para un atacante es más eficaz echar un vistazo directo a tus contraseñas mientras las tecleas que descubrir una vulnerabilidad en tu sistema.
- No anotes jamás tus contraseñas en notas adhesivas o cuadernos a los que puedan acceder otras personas. Pegar tus contraseñas en el cubículo de tu oficina es una pésima idea.
- Nunca jamás digas tus contraseñas a absolutamente nadie por teléfono u otros medios, esta es una táctica de ingeniería social con un alto índice de éxito y todos podemos convertirnos en víctimas en un descuido

## Hay maneras más sencillas de manejar contraseñas

¿Pero no es mucho lio todo lo anterior? Sí, de hecho es bastante complicado mantener un sistema seguro usando contraseñas fuertes, es por eso que existen programas y sitios web que se encargan de gestionar tus contraseñas para que tu no tengas que preocuparte de muchas de las cosas que acabo de mencionar. Entra en la siguiente entrada para conocer keepassx, la herramienta que yo uso actualmente para gestionar mis contraseñas y aprender a usarla.