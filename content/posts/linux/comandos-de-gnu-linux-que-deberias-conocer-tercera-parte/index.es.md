---
aliases:
- /comandos-de-gnu-linux-que-deberias-conocer-tercera-parte
- /comandos-de-linux-que-deberias-conocer-tercera-parte
- /es/comandos-de-linux-que-deberias-conocer-tercera-parte/
- /es/comandos-basicos-de-linux-printenv-export-lsof-top-ps-kill-curl-systemctl-chown-chroot/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/comandos_GNU_Linux_3.jpg
date: '2019-05-21'
description: 'Uso y opciones comunes de los comandos de terminal de linux: printenv,
  systemctl, top, ps, chown, kill, wget, curl, chroot, export y otros.'
keywords:
- linux
slug: /linux/comandos-basicos-de-linux-printenv-export-lsof-top-ps-kill-curl-systemctl-chown-chroot/
title: 'Comandos Básicos de Linux: printenv export lsof top ps kill curl systemctl
  chown chroot'
---

Esta es la continuación de las siguientes partes: 

* [Comandos esenciales de Linux: grep, ls, cd, history, cat, cp, rm, scp y otros.]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="es" >}}) 
* [Comandos esenciales de Linux: passwd, du, useradd, usermod, fdisk, lscpu, apt, which y otros.](/es/linux/comandos-basicos-de-linux-passwd-du-useradd-usermod-fdisk-apt//).

{{<ad0>}}

{{< instagram CUX56csLUXL >}}

## printenv

Printenv se encarga de imprimir las variables de entorno de nuestro sistema.

### ¿Qué es una variable de entorno?

Las variables de entorno son una **serie de igualdades conocidas como variables de entorno**, y sus valores correspondientes. Las variables de entorno describen el entorno en que corre un programa e influyen en como se comporta nuestro sistema operativo. Estas variables están disponibles para ser leídas por cualquier aplicación de nuestro sistema, por lo que podemos usarlas para guardar información tal como nombres de usuario, valores de configuración, rutas a archivos, etc.

```bash
printenv
...
XDG_MENU_PREFIX=gnome-
LANG=es_MX.UTF-8
GDM_LANG=es_MX.UTF-8
DISPLAY=:0
...
```

El comando printenv también nos permite acceder al valor de una variable en particular, pasándosela como argumento

```bash
printenv LANG
es_MX.UTF-8
```

{{<ad1>}}

## export

Export nos permite crear una variable de entorno. Esta variable de entorno va a estar disponible durante nuestra sesión en la terminal. Al cerrar la terminal la variable desaparece.

```bash
export MI_VARIABLE=mi_valor
printenv MI_VARIABLE
mi_valor
```

## lsof

{{<ad2>}}

Este comando nos devuelve una lista de archivos y los procesos que los están usando. 

Los resultados se devuelven bajo el siguiente formato.

```bash
lsof
COMMAND    PID  TID         USER   FD      TYPE DEVICE  SIZE/OFF     NODE NAME
```

Puedes fltrar los resultados por usuario:

```bash
sudo lsof -u <username>
```

O por proceso:

{{<ad3>}}

```bash
sudo lsof -c <nombre del proceso>
```

O por puerto

```bash
sudo lsof -i :<número de puerto>
```

## top

El comando top nos muestra la lista de procesos o hilos que están ejecutándose en tiempo real e información relativa a cada uno de estos. Mira abajo como están ordenados lor procesos, primero están los procesos del usuario actual y luego sigue una lista de los procesos ordenados por su identificador de proceso (PID), si presionas la tecla _abajo_ ↓ te mostrará más procesos. Puedes presionar en cualquier momento la tecla '_q_' para abandonar la pantalla interactiva y regresar a la terminal.

```bash
top 
  top - 11:22:06 up  2:29,  1 user,  load average: 0.57, 0.86, 1.00
  Tasks: 214 total,   1 running, 213 sleeping,   0 stopped,   0 zombie
  %Cpu(s): 14.7 us,  2.8 sy,  0.1 ni, 81.1 id,  1.1 wa,  0.0 hi,  0.2 si,  0.0 st
  KiB Mem :  8111064 total,  3577672 free,  2705236 used,  1828156 buff/cache
  KiB Swap: 11717628 total, 11717628 free,        0 used.  4961212 avail Mem 
 
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                                   
 10306 usuario   20   0   45064   3644   2984 R  12.5  0.0   0:00.02 top                                                                                                                       
  1657 usuario   20   0 2433020 186960  84944 S   6.2  2.3   6:45.07 gnome-shell                                                                                                               
  1689 usuario    9 -11 1764808  15476  11528 S   6.2  0.2   2:52.65 pulseaudio                                                                                                                
  5185 usuario   20   0  602440  34612  25572 S   6.2  0.4   0:01.35 gnome-terminal- 
  9699 usuario   20   0 1782564 282448 133804 S   6.2  3.5   0:16.06 chromium                                                                                                                  
     1 root      20   0  139128   6988   5300 S   0.0  0.1   0:01.12 systemd                                                                                                                   
     2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd                                                                                                                  
     3 root      20   0       0      0      0 S   0.0  0.0   0:00.08 ksoftirqd/0  
```

## ps

El comando ps nos mostrará la lista de procesos que corren, pero no en tiempo real y de manera interactiva, sino que los imprime en pantalla; ideal para volcarlo en un archivo o procesar la información que el comando nos arroje.

```bash
ps
  PID TTY          TIME CMD
 9782 pts/1    00:00:00 bash
13249 pts/1    00:00:00 ps
```

Como puedes ver, el comando '_ps_' no nos está mostrando los mismos procesos del comando anterior. Lo anterior es debido a que solo nos mostró los procesos que estaban ejecutándose en ese momento; bash, porque estamos ejecutando el comando en la terminal y '_ps_', debido a que es el comando que corrimos. Ejecutemos el comando ahora con las opción '_aux_'.

```bash
ps aux
 USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
 root         1  0.0  0.0 139128  6988 ?        Ss   08:52   0:01 /sbin/init
 root         2  0.0  0.0      0     0 ?        S    08:52   0:00 [kthreadd]
 root         3  0.0  0.0      0     0 ?        S    08:52   0:00 [ksoftirqd/0]
```

Ahora nos muestra más información, el porcentaje de CPU y el porcentaje de memoria. Toma en cuenta que el _%CPU_ que nos muestran ambos comandos no será igual debido a que se calcula de manera diferente en cada uno de ellos. Puedes ver más detalles al respecto en el código o en los manuales de ambos comandos.

### /proc y el comando ps

El comando ps obtiene su información del contenido de la carpeta */proc*, que es donde se almacenan los procesos que ejecuta linux.

## pstree

El comando pstree nos mostrará la lista de procesos que corren pero en formato gráfico y desglosado.

```bash
pstree
systemd─┬─ModemManager─┬─{gdbus}
        │              └─{gmain}
        ├─NetworkManager─┬─dhclient
        │                ├─{gdbus}
        │                └─{gmain}
        ├─accounts-daemon─┬─{gdbus}
        │                 └─{gmain}
        ├─avahi-daemon───avahi-daemon
        ├─colord─┬─{gdbus}
        │        └─{gmain}
        ├─containerd───13*[{containerd}]
        ├─cron
        ├─dbus-daemon
        ├─dockerd───14*[{dockerd}]
        ├─firefox-bin─┬─Privileged Cont─┬─{Chrome_~dThread}
...
```

## kill

El comando asesino, para matar un proceso basta con escribir el comando en la terminal seguido de su identificador de proceso (PID), el número que aparece en los dos comandos anteriores. Es el comando perfecto para usar si chrome se comió toda la RAM y tu sistema ya no responde, o si quieres terminar algún proceso que está dando problemas. Al ejecutar este comando el programa sale normalmente, efectuando sus acciones de salida.

```bash
kill 9699
 Finalizará el proceso con PID 9699, permitiéndo al proceso ejecutar acciones de salida
```

Si tras ese comando el proceso sigue sin responder, bastará con agregar la opción '-9' al comando, este comando cortará el proceso sin darle tiempo a realizar sus acciones de salida.

```bash
kill -9 9699
 Finalizará el proceso con PID 9699, sin permitirle al proceso ejecutar acciones de salida
```

### Funcionamiento interno del comando kill

Internamente el comando kill envía señales de diferentes tipos a los procesos, estas señales pueden ser recibidas por la aplicación, para manejar el cierre de estas. Te dejo algunas señales:

| Señal   | Valor | Accion | Comentario                                                       | Comando      | Atajo de Teclado |
| ------- | ----- | ------ | ---------------------------------------------------------------- | ------------ | ---------------- |
| SIGINT  | 2     | Term   | Interrupción procedente del teclado                              | kill -2 pid  | CTRL+C           |
| SIGTERM | 15    | Term   | Terminar un proceso de una manera controlada                     | kill -15 pid |                  |
| SIGKILL | 9     | Term   | Terminar un proceso de manera forzosa, no puede manejarse por Go | kill -9 pid  |                  |

## wget

Con wget nosotros podremos descargar archivos de internet. Para usarlo le ponemos enfrente la dirección del recurso que queremos descargar, desde archivos hasta páginas web.

```bash
wget https://google.com
--2019-05-20 22:38:34-- https://google.com/
Resolviendo google.com (google.com)... 216.58.217.14, 2607:f8b0:4012:80b::200e
Conectando con google.com (google.com)[216.58.217.14]:443... conectado.
Petición HTTP enviada, esperando respuesta... 301 Moved Permanently
Localización: https://www.google.com/ [siguiendo]
--2019-05-20 22:38:35-- https://www.google.com/
Resolviendo www.google.com (www.google.com)... 216.58.193.36, 2607:f8b0:4012:805::2004
Conectando con www.google.com (www.google.com)[216.58.193.36]:443... conectado.
Petición HTTP enviada, esperando respuesta... 200 OK
Longitud: no especificado [text/html]
Grabando a: “index.html”

index.html                                          [ <=>                                                                                                  ]  ------11.11K  --.-KB/s    in 0.003s  

2019-05-20 22:38:35 (3.73 MB/s) - “index.html” guardado [11380]
```

## ping

El comando ping usa el protocolo ICMP para solicitar una respuesta. Esto, puesto en palabras más sencillas, significa que enviará una solicitud a internet para ver si recibe una respuesta. Generalmente se usa para determinar si una computadora puede acceder a otra. En este ejemplo recibimos una respuesta de la dirección que aparece después del comando.

```bash
ping www.lainchan.org
PING www.lainchan.org (107.161.19.243) 56(84) bytes of data.
64 bytes from lainchan.org (107.161.19.243): icmp_seq=1 ttl=54 time=95.3 ms
64 bytes from lainchan.org (107.161.19.243): icmp_seq=2 ttl=54 time=96.4 ms
64 bytes from lainchan.org (107.161.19.243): icmp_seq=3 ttl=54 time=95.3 ms
^C
--- www.lainchan.org ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 95.309/95.688/96.432/0.526 ms
```

## curl

Este comando sirve para transferir información desde o hacia un servidor. Soporta múltiples protocolos, sin embargo frecuentemente es usado en desarrollo web para hacer pruebas.

```bash
curl example.org
```

Si le agregamos la opción _\-i_ incluye las cabeceras http o headers en la respuesta.

```bash
curl example.org -i
HTTP/1.1 200 OK
Age: 198550
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Sun, 25 Oct 2020 15:41:15 GMT
Etag: "3147526947+ident"
Expires: Sun, 01 Nov 2020 15:41:15 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Server: ECS (qro/9315)
Vary: Accept-Encoding
X-Cache: HIT
Content-Length: 1256
```

Podemos enviar cookies a través de curl usando la opción _\--cookie_

```bash
curl --cookie "this_cookie=does_nothing" example.org
```

También podemos hacer peticiones web POST, útil para emular el envío de formularios.

```bash
curl -X POST -F 'email=email@example.org' example.org
```

En curl enviamos cabeceras HTTP o headers usando la opción _\-H_.

```bash
curl -H "Accept-Charset: utf-8" example.org
curl -H "Authorization: Token 12345" http://example.org
```

Podemos enviar información para una petición POST usando la opción -d

```bash
curl -d "data=value" -X POST http://example.org
```

Si queremos omitir la respuesta, y mostrar únicamente las cabeceras de la respuesta, usamos la opción -I.

```bash
curl -I example.org
# HTTP/1.1 200 OK
# Content-Encoding: gzip
```

El comando curl es un comando con muchas opciones, para cubrir prácticamente cualquier necesidad, te recomiendo que le des una leída a su manual si quieres profundizar en sus funciones.

## systemctl

systemctl es una utilidad de _systemd_, sirve para administrar el sistema y sus servicios, forma parte de la instalación predeterminada en algunos sistemas operativos con base Linux.

Este software ha suscitado una fuerte polémica entre entusiastas de GNU/Linux, debido a que se le [acusa de ir en contra de los principios de Linux](https://suckless.org/sucks/systemd/#?) y querer incluirse como la opción por defecto de los sistemas GNU/Linux. El desprecio es tal que incluso existen distribuciones cuya única razón de existir es ofrecer una alternativa de otra distribución popular pero sin systemd. Por ejemplo Debian y [Devuan](https://devuan.org/), este último es un fork del popular [Debian](https://www.debian.org/), pero sin _systemd_.

Systemctl nos permite ejecutar o detener servicios; agregarlos o removerlos al proceso de inicio de nuestro sistema operativo; ver su estado actual. Systemctl tiene muchas opciones, así que solo pondré las más comunes. Si quieres ahondar más en las capacidades de este comando ejecuta el comando '_man systemctl_' para ver su manual. Este comando debe ejecutarse con poderes de super usuario.

Aquí algunas de las capacidades de systemctl:

### Iniciar un servicio

```bash
systemctl start postgresql
 # Inicia el servicio de la base de datos postgresql
```

### Reiniciar un servicio

```bash
systemctl restart postgresql
 # Reinicia el servicio 
```

### Mostrar el estatus de un servicio

```bash
systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Mon 2019-05-20 22:53:41 CDT; 49s ago
  Process: 5587 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 5587 (code=exited, status=0/SUCCESS)
      CPU: 538us

may 20 22:53:41 horo systemd[1]: Starting PostgreSQL RDBMS...
may 20 22:53:41 horo systemd[1]: Started PostgreSQL RDBMS.
```

### Detener un servicio

```bash
systemctl stop postgresql
 # Detiene el servicio postgresql
```

### Agregar un servicio al inicio

```bash
systemctl enable postgresql
 # Permite que postgresql se inicie al arrancar el sistema
Synchronizing state of postgresql.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable postgresql
```

### Remover un servicio del inicio

```bash
systemctl disable postgresql
 # Remueve postgresql de la lista de programas que se inician al arrancar el sistema
Synchronizing state of postgresql.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install disable postgresql
```

### Mostrar los servicios en memoria

```bash
systemctl list-units 
 # Lista las unidades que estan en memoria
```

### Iniciar el proceso de apagado del SO

```bash
systemctl poweroff
 # Apaga el sistema operativo. Si ejecutas este comando tu computadora se apagará
```

### Reiniciar el SO

```bash
systemctl reboot
 # Reinicia el sistema operativo. Si ejecutas este comando tu computadora se reiniciará
```

### Revisar los logs de un servicio

Para revisar los logs y ver que salió mal (o bien) usaremos la herramienta journalctl, en lugar de systemctl, seguido de la opción -u y el nombre del servicio.

```bash
journalctl -u celery
Feb 25 22:52:09 yourapp-debian-django sh[12677]: celery multi v4.1.0 (latentcall)
Feb 25 22:52:09 yourapp-debian-django sh[12677]: > Starting nodes...
...
```

### Revisar fallos en las hojas de servicio

Cuando un servicio falla por una hoja de servicio mal configurada, querremos saber los detalles, para conocerlos usamos este comando.

```bash
sudo systemd-analyze verify <nombre>.service
```

Las hojas de servicio pueden encontrarse en

- /usr/lib/systemd/system/
- /lib/systemd/system/
- /etc/systemd/system/

## mkfs

El comando mkfs nos permite asignar un tipo de sistema de archivos a un dispositivo. Este comando no se usa solo, sino que cada sistema de archivo tiene su propio comando; uno para ext3, otro para ext4, otro para xfs, etc.

Un sistema de tipo de archivo determinará si podemos tener una cantidad fija o dinámica de i-nodos en tu sistema.

```bash
mkfs.ext4 /dev/sdb2
mkfs.xfs /dev/hda1
```

Si quieres profundizar más en este tema, hay un video donde se explican las [diferencias entre los tipos de archivo ext4 y xfs.](https://www.youtube.com/watch?v=f0gz-PV3X4Y) 

## stat

Con stat obtendremos información más detallada y de bajo nivel de un archivo.

Observa las opciones de acceso, más adelante explicaré que significan esos dígitos.

```bash
stat file.txt
  Fichero: s.rst
  Tamaño: 798       	Bloques: 8          Bloque E/S: 4096   fichero regular
Dispositivo: 804h/2052d	Nodo-i: 6310391     Enlaces: 1
Acceso: (0644/-rw-r--r--)  Uid: ( 1000/ eduardo)   Gid: ( 1000/ eduardo)
      Acceso: 2021-09-11 15:03:41.464552922 -0500
Modificación: 2021-09-11 15:03:41.476553169 -0500
      Cambio: 2021-09-11 15:03:41.496553579 -0500
    Creación: 2021-09-11 15:03:41.464552922 -0500
```

## chroot

Hay situaciones en las que necesitamos cambiar la dirección de la carpeta root por defecto para algunos usos más avanzados, como la creación de overlays o de contenedores, tales como los de [docker]({{< ref path="/posts/docker/que-es-y-para-que-me-sirve-docker/index.md" lang="es" >}}).

```bash
chroot /mi_nuevo_directorio_root
```

## chown

Cambia el propietario de un archivo al que le especifiquemos. Hay que recordar que **en Linux todo es un archivo**, por lo que chown también puede usarse sobre directorios. Otro factor a tomar en cuenta para cambiar un archivo de propietario y/o grupo, es asegurarnos de que tenemos los permisos necesarios. Si tienes algún problema con los [permisos en GNU Linux]({{< ref path="/posts/linux/permisos-en-gnu-linux-y-el-comando-chmod/index.md" lang="es" >}}) **ingresa como super usuario**.

```bash
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 12:22 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 usuario usuario    0 may 13 12:13 texto.txt
 El comando nos muestra que el archivo texto.txt pertenece al usuario de nombre 'usuario' y al grupo llamado 'usuario'.
chown root texto.txt
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 12:22 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 root usuario    0 may 13 12:13 texto.txt
 El comando cambió su propietario a root
```

En el ejemplo anterior, únicamente especificamos un usuario. Para poder especificar un grupo deberemos usar la sintaxis de '**_usuario:grupo'_**. Debido a que solo nos falta cambiar el grupo omitiremos la primera parte de la sintaxis anterior, quedará como '**:grupo**'

```bash
chown :root texto.txt
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 12:22 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 root    root       0 may 13 12:13 texto.txt
 Ahora el archivo también pertenece al grupo 'root'
```

Ahora regresemos todo a la normalidad usando la sintaxis completa: '**_usuario:grupo'_**

```bash
chown usuario:usuario texto.txt
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 12:22 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 usuario usuario    0 may 13 12:13 texto.txt
 Nuevamente el archivo texto.txt pertenece al usuario de nombre 'usuario' y al grupo llamado 'usuario'.
```

Ahora probemos cambiando el usuario y grupo de todos los archivos y del directorio usando la opción '_\-R_' que nos permitirá hacer lo mismo que hicimos en el paso anterior con un archivo, pero esta vez de manera recursiva con los contenidos de un directorio.

```bash
ls -la
total 8
drwxr-xr-x 2 root    root    4096 may 13 13:04 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 root    root       0 may 13 12:50 .archivo_oculto.txt
-rw-r--r-- 1 root    root       0 may 13 13:04 texto1.txt
-rw-r--r-- 1 root    root       0 may 13 13:04 texto2.txt
chown -R usuario:usuario . 
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 13:04 .
drwxr-xr-x 6 usuario usuario 4096 may 13 12:22 ..
-rw-r--r-- 1 usuario usuario    0 may 13 12:50 .archivo_oculto.txt
-rw-r--r-- 1 usuario usuario    0 may 13 13:04 texto1.txt
-rw-r--r-- 1 usuario usuario    0 may 13 13:04 texto2.txt
 Todos los archivos del directorio, inclusive los ocultos cambiaron de propietario y grupo
```

## chmod

El comando anterior nos permitió cambiar el propietario y el grupo de un archivo. Este comando nos permite modificar los permisos de un archivo.

```bash
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 14:11 .
drwxr-xr-x 6 usuario usuario 4096 may 13 14:11 ..
-rw-r--r-- 1 usuario usuario    0 may 13 14:11 archivo.py
-rw-r--r-- 1 usuario usuario    0 may 13 14:11 archivo2.py
```

Como puedes ver, el comando anterior nos muestra en pantalla que el propietario de ambos archivos tiene permisos para leer y escribir, el grupo y otros únicamente pueden leer ambos archivos. Modificaremos los permisos en GNU/Linux con el comando _chmod_ para añadir algunos extras.

```bash
chmod 755 archivo.txt
ls -la
total 8
drwxr-xr-x 2 usuario usuario 4096 may 13 14:11 .
drwxr-xr-x 6 usuario usuario 4096 may 13 14:11 ..
-rwxr-xr-x 1 usuario usuario    0 may 13 14:11 archivo.py
-rw-r--r-- 1 usuario usuario    0 may 13 14:11 archivo2.py
```

Ahora el propietario, llamado usuario, puede leer, escribir y ejecutar _archivo.py_, el grupo llamado usuario y otros pueden leerlo y ejecutarlo. El archivo de nombre _archivo2.py_ no sufrió modificaciones en sus permisos. Esta vez intentaremos usar la opción '_\-R_' para especificar recursivamente los permisos del directorio completo y su contenido.

```bash
chmod 755 -R .
ls -la
drwxr-xr-x 2 usuario usuario 4096 may 13 14:24 .
drwxr-xr-x 6 usuario usuario 4096 may 13 14:23 ..
-rwxr-xr-x 1 usuario usuario    0 may 13 14:24 archivo.py
-rwxr-xr-x 1 usuario usuario    0 may 13 14:24 archivo2.py
```

Ahora el propietario, llamado _usuario_, puede escribir, leer y ejecutar ambos archivos de extensión '_.py_', mientras que el grupo llamado _usuario_ y otros pueden leer y ejecutar, pero no escribir.

## Aún más sobre el comando chmod

El sistema de permisos de GNU/Linux es un tema bastante complejo, por lo que hablaré de él con más detalle en la siguiente entrada.