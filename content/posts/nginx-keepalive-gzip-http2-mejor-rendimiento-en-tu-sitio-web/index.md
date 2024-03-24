---
title: "Nginx keepalive, gzip, http2: mejor rendimiento en tu sitio web"
date: "2020-11-07"
categories: 
  - "linux y devops"
coverImage: "images/tutorialNginx-1.jpg"
description: "Optimiza tu sitio web y hazlo más rápido habilitando http2, compresión gzip, cache y modificando el valor de keepalive en nginx."
keywords:
  - nginx
  - rendimiento
  - linux
authors:
  - Eduardo Zepeda
---

Hace algunos meses estaba revisando los valores de Lighthouse para un sitio web cuando me di cuenta de que no cumplia con ciertas recomendaciones, usaba http/1.1, no contaba con compresión gzip, ni cache. Más tarde arreglé los problemas, te cuento como a continuación. En esta entrada te platico sobre las siguientes características de nginx: keepalive, gzip, cache y http2 y como puedes modificarlas para mejorar tus valores de [Lighthouse](https://web.dev/).

## http2 en nginx

Por más sorprendente que suene, muchos servidores no habilitan HTTP/2 por defecto, por lo que, si es tu caso, puedes habilitarlo para tener un mejor rendimiento. El protocolo HTTP/2 es más eficiente que HTTP/1, por lo que obtendremos mejores indicadores usándolo.

Primero vamos al archivo donde tenemos habilitado nuestro sitio web en nginx:

```bash
sudo vim /etc/nginx/sites-enabled/mi-sitio
```

Una vez en el archivo vamos a agregar http2 al final de nuestra directiva _listen_, en este caso en el puerto 443, por el HTTPS. Si sirves tu contenido sin usar HTTPS puedes agregarlo al puerto 80.

```bash
# /etc/nginx/sites-enabled/mi-sitio
server { 
    listen 443 ssl http2; 
    listen [::]:443 ssl http2;
    # ...
}
```

Recuerda que **tras cada cambio que hagamos será necesario recargar nginx** para que adopte los nuevos valores.

```bash
sudo systemctl reload nginx
```

Si ahora hacemos una petición a nuestro sitio web podremos corroborar si nuestro contenido se está sirviendo con el protocolo HTTP/2

```bash
curl https://tu-sitio-web.com -i
# ...
HTTP/2 200 
server: nginx
# ... 
```

## habilitar compresión gzip en nginx

La compresión gzip nos permite reducir el tamaño de los recursos que mandamos, tampoco suele venir habilitada por defecto.

Para habilitarla vamos a modificar el archivo de configuración de nginx. Recuerda que también puedes habilitarlas individualmente dentro de la directiva http en cada sitio web, pero para este caso colocaremos el cache de manera universal.

```bash
vim /etc/nginx/nginx.conf
```

Si nos dirigimos a la sección de Gzip veremos varios valores comentados.

```bash
# /etc/nginx/nginx.conf
# ...

gzip on;
gzip_disable "msie6";

# gzip_vary on;
# gzip_proxied any;
# gzip_comp_level 6;
# gzip_buffers 16 8k;
# gzip_http_version 1.1;
# gzip min_length 256;
# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;
```

Entre los valores comentados están la longitud mínima para comprimir, el nivel de compresión, si queremos aplicar compresión para solicitudes de un proxy, los tipos MIME que recibirán compresión y otras opciones.

Vamos a descomentarlos todas. Además agregaremos unos cuantos tipos MIME a la opción _gzip\_types_.

```bash
# /etc/nginx/nginx.conf
# ...

gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip min_length 256;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon image/jpg image/png;
```

Recuerda que puedes consultar todos los tipos MIME disponibles de manera amigable haciendo un [bat](/es/conoce-bat-en-linux-el-cat-con-resaltado-de-sintaxis/) o un cat al siguiente archivo:

```bash
sudo bat /etc/nginx/mime.types
```

Ahora ya solo necesitas colocar los que consideres convenientes para tu aplicación. Recuerda también que **usar la compresión hace más ligera la transferencia al usuario pero aumenta la carga del servidor al comprimir**, por lo que tienes que evaluar que te conviene comprimir y que no.

Si haces un _curl_ a alguno de los recursos para los que habilitaste compresión con el header "Accept-Encoding: gzip" podrás apreciar que la respuesta vendrá comprimida. Recuerda recargar el servidor para que los cambios surtan efecto.

```bash
curl -H "Accept-Encoding: gzip" https://tu-sitio-web.com
# ...
x-frame-options: DENY
x-content-type-options: nosniff
content-encoding: gzip
```

## nginx keepalive

El valor de configuración de nginx, keepalive\_timeout, le dice al servidor **cuanto tiempo debe mantener activa la conexión TCP para múltiples respuestas HTTP.**

Sobre simplificando este concepto, podemos encontrar una similitud entre una conexión TCP y una llamada telefónica. Imaginemos dos escenarios:

El primer escenario es el siguiente: te piden que cuides a tus sobrinos y tus preocupados hermanos necesitan que les confirmes en voz viva, cada dos horas, que todo está bien. No tendría sentido llamar por teléfono y mantener la llamada toda la noche solo para estar diciéndoles "todo está bien" cada dos horas, es mejor colgar y repetir la llamada pasado ese tiempo. Así no mantenemos la linea ocupada. Es decir, lo mejor es llamar, confirmar que todo está bien y colgar.

El segundo escenario va así: estás hablando con tu mejor amiga, tienes muchísimas cosas que contarle, por lo que la llamas, la llamada dura mucho tiempo y, todo el tiempo están intercambiando mensajes, uno tras otro. No tendría sentido colgar y llamar entre cada intercambio de mensajes, es mejor mantenerla hasta que le hayas contado (y ella a ti) todo lo que tengas que decirle.

El valor de nginx keepalive será la duración de esta llamada, en el primer escenario es corto, en el segundo largo. ¿Cuál es mejor? ese valor debes decidirlo tú, con base en el comportamiento de tus usuarios, el valor por defecto es 75, yo usaré un 65.

```bash
# /etc/nginx/nginx.conf
keepalive_timeout 65;
```

## Cache

Usar cache puede mejorar enormemente el rendimiento de tu servidor. Para habilitar cache basta con **agregar la palabra _expires_**, seguido de la duración a los recursos que queremos colocar en cache.

```bash
location /static/ {
    root /app/static/;
    expires 30d; # También hubiera funcionado 1M
```

Yo he colocado 30 días, pero puedes usar cualquier otro valor que prefieras.

| Abreviación | Significado    |
| ----------- | -------------- |
| ms          | milisegundos   |
| s           | segundos       |
| m           | minutos        |
| h           | horas          |
| d           | días           |
| w           | semanas        |
| M           | Meses, 30 días |
| y           | Años, 365 días |


Información tomada de la documentación oficial http://nginx.org/en/docs/syntax.html

Si haces una petición web a la ruta que está siendo cacheada deberías recibir una cabecera cache-control con el tiempo en segundos que especificaste (En mi caso 2592000 segundos, que son 30 días). Asegúrate de recargar el servidor.

```bash
curl -I https://tu-sitio-web.com/static/imagen.jpg
cache-control: max-age=2592000
```

## Implementa Throttling

Si existen algunos clientes que realizan muchas peticiones, manteniendo tu servidor ocupado y afectando al resto de los usuarios, puedes implementar Throttling para limitar su impacto. Si quieres saber más al respecto tengo una entrada donde hablo del [Throttling en Nginx.](/es/throttling-en-nginx/)

```bash
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=5r/s;
 
server {
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;
        
        proxy_pass http://my_upstream;
    }
}
```

## Usa el load balancer de nginx

Nginx cuenta con un load balancer que te permite distribuir la carga de tu servidor entre diferentes endpoints. El mecanismo más sencillo usará el método round robin, lo que te permitirá manejar mayor cantidad de peticiones.

```bash
upstream frontend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;

}
// ...

location / {
    proxy_pass http://frontend
} 
```

En el ejemplo anterior, la primera petición se pasará al puerto 3000, la segunda al puerto 3001 y la tercera al puerto 3002, la cuarta volverá al puerto 3000 y así sucesivamente.
