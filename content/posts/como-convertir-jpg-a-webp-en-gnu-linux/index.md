---
title: "¿Cómo convertir jpg a webp en GNU Linux?"
date: "2020-09-10"
categories: 
  - "linux y devops"
coverImage: "images/Convierte-a-webp.jpg"
description: "Hace un par de semanas quería convertir las imágenes mi ecommerce de jpg a webp. Normalmente para modificar imágenes en GNU/Linux uso GIMP..."
keywords:
  - linux
  - frontend
---

Hace un par de semanas quería convertir las imágenes de mi ecommerce de jpg a webp. Normalmente para modificar imágenes en GNU/Linux uso GIMP o imageMagick, pero ninguno de estos dos tienen soporte nativo para webp, o si lo tienen soy tan despistado que no me he dado cuenta.

¿Y por qué no usar conversión en linea? Pues es una buena opción para un par de imágenes, pero cuando conviertes muchas pues... se vuelve algo tedioso, además ¿por qué no hacerlo directo en nuestro SO?

## ¿Por qué debería usar webp?

El formato JPG ha estado algo de tiempo pero han surgido nuevos formatos que prometen **la misma calidad con un menor tamaño de archivo**. Uno de ellos es webp, desarrollado por google.

Menor peso en nuestras imágenes significa mejor rendimiento. Un sitio web que cargue más rápido tendrá mejores indicadores en [Lighthouse](https://web.dev/) y un menor consumo de datos para el usuario.

## Descargando webp

El primer paso para transformar nuestras imágenes a formato webp es descargar las librerías apropiadas. El paquete que necesitamos para transformar nuestras imágenes se llama webp y se encuentra en los repositorios de las distribuciones populares de GNU/Linux. Instalémoslo.

Si el siguiente comando no te suena o quieres repasar los comandos básicos de GNU/Linux por favor visita mis entradas donde hablo de los [comandos más usuales de GNU Linux](/comandos-de-gnu-linux-basicos-que-deberias-conocer/).
 
```bash
sudo apt install webp
```

Para esta entrada utilizaré una imagen gratuita, en resolución 1920 x 1280, que descargué desde [pexels](https://www.pexels.com/photo/tan-coconuts-placed-atop-brown-wooden-table-1120963/), tu puedes usar la que quieras, hasta la foto de tu perro.

El tamaño mi imagen es de 476 Kb.

```bash
$ du -h pexels-artem-beliaikin-1120963.jpg
476K pexels-artem-beliaikin-1120963.jpg
```

## Convertir de jpg a webp

Tras haber instalado webp, el comando _cwebp_ estará disponible, sí, con la letra "c" al principio; yo también me he confundido y he querido usarlo como webp a secas al principio.

El comando cwebp nos servirá para convertir nuestra imagen y además es muy sencillo de usar; solo colocamos la imagen que queremos convertir y especificamos el nombre de nuestro archivo de salida con la opción _-o_.

```bash
cwebp pexels-artem-beliaikin-1120963.jpg -o imagen_procesada.webp
Saving file 'imagen_procesada.webp'
File:      pexels-artem-beliaikin-1120963.jpg
Dimension: 1920 x 1280
Output:    226348 bytes Y-U-V-All-PSNR 38.69 45.41 46.33   40.05 dB
block count:  intra4: 7027
              intra16: 2573  (-> 26.80%)
              skipped block: 454 (4.73%)
bytes used:  header:            276  (0.1%)
             mode-partition:  32578  (14.4%)
 Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
    macroblocks:  |       5%|      15%|      27%|      51%|    9600
      quantizer:  |      36 |      33 |      27 |      21 |
   filter level:  |      11 |       7 |      30 |      33 |
```

Listo, ahora debemos tener un archivo con extensión _webp_ en nuestra misma carpeta.

## ¿Cuál es más ligero webp o jpg?

Si ahora comparamos los tamaños de ambos archivos notaremos que nuestra nueva imagen tiene **cerca de la mitad de tamaño que su versión en _jpg_**.

La calidad del archivo webp resultante te toca juzgarla a ti mismo. A mi me ha parecido prácticamente la misma, con sutiles diferencias; quizás una perdida muy leve de contraste, pero casi imperceptible.

```bash
du -h *
224K	imagen_procesada.webp
476K	pexels-artem-beliaikin-1120963.jpg
```

## ¿Cómo convertir muchas imágenes jpg a webp?

Convertir muchas imágenes a formato _webp_ es más una solución a nivel de terminal que del programa _cwebp_ en si mismo. De cualquiera manera te dejo el código necesario para convertir todas imágenes _jpg_ en la carpeta donde lo ejecutes a su equivalente en formato _webp_.

```bash
for image in *.jpg; do cwebp $image -o `basename ${image%.jpg}`.webp; done
```

## ¿Y qué hago si Safari no tiene soporte para webp?

A la fecha de publicación de este artículo **solo hay dos navegadores web que no tienen soporte para webp**; Safari y KaiOS Browser, según [caniuse](https://caniuse.com/#search=webp). Aunque he leído que los desarrolladores de Safari planean otorgarlo soporte completo para webp para finales del 2020.

Pero, si no puedes esperar, la solución es usar las etiquetas _figure_ y _source_. La etiqueta _picture_ se encargará de envolver fuentes de imágenes que le especifiquemos. El navegador elegirá descargar o ignorar cada una basándose en los formatos que soporte. Es decir, si el navegador tiene soporte para webp descargará la imagen webp, si no lo tiene descargará la imagen en jpg.

No necesito decirte que para que esto funcione debes tener una imagen en formato jpg y otra imagen en formato webp, y ambas deben estar accesibles para el navegador, ¿cierto?

```html
<picture>
   <source srcset="https://turuta.com/imagen.webp" type="image/webp"> 
   <source srcset="https://turuta.com/imagen.jpg" type="image/jpeg"> 
   <img src="https://turuta.com/imagen_.webp" alt=" class="img-class">
</picture>
```
