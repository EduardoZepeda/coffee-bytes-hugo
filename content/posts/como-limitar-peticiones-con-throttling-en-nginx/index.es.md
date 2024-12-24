---
aliases:
- /como-limitar-peticiones-con-throttling-en-nginx
- /throttling-en-nginx
authors:
- Eduardo Zepeda
categories:
- arquitectura de software
- linux y devops
coverImage: images/throttling_ngnix.jpg
coverImagecredits: Créditos a https://www.pexels.com/@amateur-photo-1700447
date: '2021-03-13'
description: Aprende a usar Throttling en Nginx para limitar el número de peticiones
  en tu aplicación, mitigando ataques DDOS o de fuerza bruta.
keywords:
- nginx
- rendimiento
- linux
title: Throttling en Nginx
---

El throttling en Ngnix nos permite limitar el número de peticiones a un cierto usuario. Lo anterior es útil para prevenir peticiones excesivas por parte de un usuario que mantengan el sistema ocupado. Por otro lado, también es una manera de disuadir intentos de averiguar una contraseña por fuerza bruta o incluso ataques DDOS.

Si lo que buscas es optimizar el rendimiento de una aplicación que usa Nginx tengo una entrada donde te doy algunas [recomendaciones para mejorar el rendimiento de nginx.](/es/nginx-keepalive-gzip-http2-mejor-rendimiento-en-tu-sitio-web/)

## El algoritmo de la cubeta

Nginx manejará el throttling como si se tratara de una cubeta con agujeros: el agua que entra en la cubeta sale por la parte de abajo. Si aumentamos el flujo y la cubeta se llena más rápido de lo que sale por los agujeros la cubeta se desbordará.

![Cubeta con agujeros.](images/cubeta_-1.jpg)

El agua que entra primero por la cubeta sale primero (FIFO). Si el flujo es suficiente, la cubeta se desborda.

En el ejemplo anterior, las peticiones o requests, representan el agua; cualquier incremento excesivo de peticiones se desbordará y se perderán. Las peticiones que ya se encontraban en la cubeta abandonarán la cubeta primero, es decir, serán procesadas como van llegando (una cola FIFO).

{{<ad>}}

## limit\_req\_zone establece los valores del throttling

Vamos a abrir nuestro archivo de configuración para nuestro sitio web. Si usas la configuración por defecto está en _/etc/nginx/sites-enabled/default_ y colocaremos lo siguiente:

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
```

limit\_req\_zone establecerá los parámetros que tendrá el throttling:

- $binary\_remote\_addr guarda la dirección IP en binario. Podemos reemplazarlo por $remote\_addr a un costo de mayor espacio de memoria por IP
- zone establece el nombre del espacio donde se guardarán nuestras ip y su capacidad, en 1MB caben aproximadamente 16 000 IPs.
- Rate nos dice cuantas requests, "r", permitiremos, en este caso por segundo.

### limit\_req se coloca en el bloque que queremos proteger

Solo por haber establecido esos valores no significa que se aplicarán, debemos decirle a Nginx en que bloque lo harán.

limit\_req le dice a nginx el bloque en el que se aplicarán los valores de throttling, en este caso _/login/_, para prevenir intentos de averiguación de contraseña por fuerza bruta.

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
 
server {
    location /login/ {
        limit_req zone=mylimit;
        
        proxy_pass http://my_upstream;
    }
}
```

Y listo, ahora Nginx tendrá un límite de 10 requests por segundo para la dirección /login/.

Eso está bastante bien, pero si nosotros hicieramos un request y en menos de 100 ms hicieramos un segundo request notariamos que Nginx nos devuelve un error 503, pero, ¿por qué? ¿No estamos dentro de límite de los 10 requests por segundo? Aún no ha transcurrido el segundo y apenas van 2 requests. Pues sí, pero Nginx mide sus rates en milisegundos, por lo que nuestro rate real no es de 10 r/s.

### Rate mide en milisegundos

En nuestro ejemplo colocamos que el límite máximo serán 10 requests por segundo, pero Nginx mide usando milisegundos (ms), por lo que, realmente, nuestro rate es 1r/100ms, es decir, un request cada 100 ms.

### Burst

Pero ¿y si dos requests se efecutan, de manera normal, en menos de 100 ms? Así es, se perdería el segundo y esto puede no ser lo que queremos, a veces las aplicaciones hacen requests con pocos milisegundos de diferencia. La opción Burst se encarga de atenuar un poco nuestra estricta política de Throttling:

```nginx
location /login/ {
    limit_req zone=mylimit burst=20;
 
    proxy_pass http://my_upstream;
}
```

¿Qué hace burst exactamente? **Burst establece el tamaño de una cola**. Cualquier request que se efectué antes de que transcurran 100 ms se pondrá en esta cola, en este caso con un tamaño de 20 requests. Nuestra cola despachará una request cada 100 ms. Cualquier request que llegue cuando la cola está llena (mayor a 20) será descartada.

Pero, ahora estamos en otro aprieto, imagínate una cola al límite de su capacidad, con 20 peticiones. El penúltimo valor tendrá que esperar 1.8 segundos antes de ser despachado, mientras que el último tardará 2.0 segundos. ¡Es muchísimo!

### Nodelay

Con el parámetro nodelay, Nginx marca como "ocupados" los espacios de la cola que definimos en burst, pero no se espera 100 ms para despachar cada uno, sino que los despacha tan rápido como puede y luego va liberando los espacios de la cola a un ritmo de 100 ms. Por lo que ahora los últimos elementos de la cola no esperarán a que transcurran segundos antes de ser procesados, sino que serán procesados inmediatamente, preservando aún el límite de requests.

```nginx
location /login/ {
    limit_req zone=mylimit burst=20 nodelay;
 
    proxy_pass http://my_upstream;
}
```

Esta entrada está basada en [la documentación oficial sobre Throttling de Nginx.](https://www.nginx.com/blog/rate-limiting-nginx/) Si quieres profundizar más sobre el tema visita la documentación oficial.