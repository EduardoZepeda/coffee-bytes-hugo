---
aliases:
- /comandos-de-gnu-linux-que-deberias-conocer-2
- /comandos-de-linux-que-deberias-conocer-segunda-parte
- /es/comandos-de-linux-que-deberias-conocer-segunda-parte
- /comandos-de-la-terminal-de-gnu-linux-que-deberias-conocer-segunda-parte/
authors:
- Eduardo Zepeda
categories:
- linux y devops
coverImage: images/comandos_GNU_Linux_2.jpg
date: '2019-05-13'
description: "Aprende sobre los comandos básicos de GNU/Linux que ofrece la terminal, para esta entrada explico uname, who, du, df, entre muchos otros."
keywords:
- linux
title: "Comandos Básicos de Linux: passwd du useradd usermod fdisk apt"
---

Esta es la segunda parte de la lista de comandos para la terminal de GNU/Linux basicos. Si quieres ver los comandos de la entrada anterior por favor entra en la primera parte donde hablo de[grep, ls, cd, history, cat, cp, rm, scp.](/es/comandos-basicos-de-linux-grep-ls-cd-history-cat-cp-rm-scp/). También tengo una parte donde hablo de [los comandos passwd, du, useradd, usermod, fdisk, lscpu, apt, which.](/es/comandos-basicos-de-linux-printenv-export-lsof-top-ps-kill-curl-systemctl-chown-chroot/).

Vamos a empezar con el comando uname, para situarnos un poco en el contexto del sistema operativo con el que estamos trabajando.

## uname

Este comando nos muestra información relativa al sistema, es usado frecuentemente para mostrar toda la información agregando la opción '_\-a_' al final de comando.

```bash
uname 
 Linux
uname -a
 Linux kino 4.9.0-8-amd64 #1 SMP Debian 4.9.144-3.1 (2019-02-19) x86_64 GNU/Linux
```

{{<ad>}}

## who

El comando who, sí, como "the who", nos muestra las personas que están conectadas al momento de ejecutarlo.

```bash
who 
 usuario  tty2         2019-04-29 08:07 (:0)
```

## whoami

El comando whoami nos dice quien es el usuario actual de la sesión

```bash
whoami 
 usuario
```

## id

El comando id nos muestra información relativa a nuestro usuario, su identificador de usuario (uid), su identificador de grupo (gid) y los grupos a los que pertenece.

```bash
id 
uid=1000(eduardo) gid=1000(eduardo) grupos=1000(eduardo),7(lp),24(cdrom),25(floppy),27(sudo),29(audio),30(dip),44(video),46(plugdev),108(netdev),113(bluetooth),117(scanner),999(docker)
```

## passwd

Con este comando, al cual parece que se les olvidó la letra "o" y la "r", podemos cambiar nuestra contraseña para acceder al sistema. Una vez ejecutado el comando, este nos pedirá ingresar la contraseña actual para poder cambiar a una nueva.

```bash
passwd 
Cambiando la contraseña de usuario.
(actual) contraseña de UNIX: 
```

## du

Que proviene de las siglas de "_Disk Usage_", nos muestra el espacio que ocupan los directorios y subdirectorios desde donde estamos ejecutando el comando en kilobytes. Puede usarse también para conocer el tamaño de los archivos utilizando la opción '-_a_' al final del archivo, así como usar kilobytes, megabytes. La opción '_\-h_' decide si mostrarnos kb, mb o gb en función del tamaño, de esta manera se obtiene una medida más amigable con los humanos.

```bash
du 
 nuestra todos los directorios y su tamaño en kb
 668	./carpeta1
 3065936	./carpeta1/subarpeta1
 28080	./carpeta2/subcarpeta1/subsubcarpeta1
du -a
 nos muestra tambien los archivos
 4 archivo1
 40 archivo2
 668	./carpeta1
 3065936	./carpeta1/subarpeta1
 28080	./carpeta2/subcarpeta1/subsubcarpeta1
du -m -a 
 lo mismo que el anterior pero en megabytes
 1 archivo1
 1 archivo2
 1	./carpeta1
 2995	./carpeta1/subarpeta1
 28	./carpeta2/subcarpeta1/subsubcarpeta1
du -a -h
# la h es de humano
 4.0K archivo1
 40K archivo2
 668K	./carpeta1
 2.9G	./carpeta1/subarpeta1
 28M	./carpeta2/subcarpeta1/subsubcarpeta1
```

## df

Nos muestra el tamaño, el espacio ocupado y el espacio disponible del sistema de ficheros en bloques de 1kb y, al igual que el comando anterior, también tiene disponible la opción '-h', para que muestre la información de una manera más amigable para los humanos.

```bash
df -h
S.ficheros     Tamaño Usados  Disp Uso% Montado en
udev             3.9G      0  3.9G   0% /dev
tmpfs            793M   9.5M  783M   2% /run
/dev/sda4        235G    65G  158G  29% /
tmpfs            3.9G    55M  3.9G   2% /dev/shm
tmpfs            5.0M   4.0K  5.0M   1% /run/lock
tmpfs            3.9G      0  3.9G   0% /sys/fs/cgroup
tmpfs            793M    16K  793M   1% /run/user/115
tmpfs            793M    48K  793M   1% /run/user/1000
```

También nos sirve para ver la cantidad de i-nodos libres en nuestro sistema de archivos.

```bash
df -h
S.ficheros      Nodos-i NUsados  NLibres NUso% Montado en
udev            1000495     502   999993    1% /dev
tmpfs           1009954     948  1009006    1% /run
/dev/sdb1       7331840  853743  6478097   12% /
tmpfs           1009954     281  1009673    1% /dev/shm
tmpfs           1009954       4  1009950    1% /run/lock
/dev/sda4      15654912 5525610 10129302   36% /home/hdd
tmpfs            201990     137   201853    1% /run/user/1000
/dev/sdc              0       0        0     - /media/eduardo/NOOK
/dev/sdd              0       0        0     - /media/eduardo/11D8-1E0C
```

## free

Nos muestra la cantidad, en kilobytes, de memoria libre y ocupada en el sistema y en la memoria swap. Si queremos una lectura más amigable podemos usar la opción '-h'

```bash
free 
               total        used        free      shared  buff/cache   available
Mem:        8111072     4937452      736592      263560     2437028     2605744
Swap:      11717628           0    11717628
free -h
              total        used        free      shared  buff/cache   available
Mem:           7.7G        4.7G        762M        246M        2.3G        2.5G
Swap:           11G          0B         11G
```

## su

Hay comandos que no podemos usar si no tenemos los permisos adecuados. El super usuario es aquel usuario que tiene acceso sin restricciones al sistema. Este comando, tras una verificación por contraseña, te permite acceder como super usuario al sistema.

```bash
su 
 Contraseña:
```

Si pasamos la verificación nuestro prompt cambiará y nos mostrará una almohadilla al final '#'. **No cierres tu terminal aún, necesitamos quedarnos en modo super usuario para ejecutar los siguientes comandos.**

```bash
...~#
```

## useradd

Nos permite agregar un usuario. **Solo disponible para super usuario.**

```bash
useradd nombre_de_usuario
```

Si usamos la opción _\-m_ creará un directorio en _/home_ con el nombre del usuario y los permisos necesarios

```bash
useradd -m nombre_de_usuario
```

## usermod

El comando usermod nos permite modificar la cuenta de un usuario y tiene muchas funciones, entre las que se incluyen:

- Agregar un usuario a un grupo
- Deshabilitar cuentas tras un periodo de tiempo de inactividad
- Modificar el directorio de inicio de sesión de un usuario
- Cambiar el nombre de un usuario
- Mover el directorio home de un usuario a otra localización

Con el comando de abajo usaremos la opción _\-a_ para agregar a uno o varios grupos al usuario llamado usuario. Podemos agregar más grupos separándolos por una coma.

```bash
usermod -a -G grupo usuario
```

Con la opción _\-e_ podemos establecer una fecha de caducidad a una cuenta de usuario. El formato de la feche debe ser YYYY-MM-DD.

```bash
usermod -e 2099-11-11 usuario
```

## userdel

Este comando nos permite eliminar un usuario. **Solo disponible para super usuario.**

```bash
userdel nombre_de_usuario
```

## fdisk

El comando fdisk sirve para mostrar las tablas o particiones del sistema, solo podrá ejecutarse como super usuario. Si lo ejecutas sin argumentos mostrará la página de ayuda del comando. Es usado generalmente con la opción '_\-l_' para listar y ver detalles de las particiones y tablas del sistema. **Solo disponible para super usuario.**

```bash
fdisk
 Modo de empleo:
 fdisk [opciones] <disco>     cambia tabla de particiones
 fdisk [opciones] -l [<disco>] muestra tabla(s) de particiones

Muestra o manipula una tabla de particiones de disco.
fdisk -l
Disco /dev/sda: 931.5 GiB, 1000204886016 bytes, 1953525168 sectores
Unidades: sectores de 1 * 512 = 512 bytes
Tamaño de sector (lógico/físico): 512 bytes / 4096 bytes
Tamaño de E/S (mínimo/óptimo): 4096 bytes / 4096 bytes
Tipo de etiqueta de disco: dos
Identificador del disco: 0x325cbe04

Disposit.  Inicio   Comienzo      Final   Sectores Tamaño Id Tipo
/dev/sda1  *            2048    1026047    1024000   500M  7 HPFS/NTFS/exFAT
/dev/sda2            1026048 1429233663 1428207616   681G  7 HPFS/NTFS/exFAT
/dev/sda3         1429235710 1452670975   23435266  11.2G  5 Extendida
/dev/sda4         1452670976 1953523711  500852736 238.8G 83 Linux
/dev/sda5         1429235712 1452670975   23435264  11.2G 82 Linux swap / Solaris</disco></disco>
```

## lscpu

Imprime información relacionada con la arquitectura del CPU.

```bash
Architecture:          i686
# CPU op-mode(s):        32-bit, 64-bit
# Byte Order:            Little Endian
# CPU(s):                1
# On-line CPU(s) list:   0
# Thread(s) per core:    1
#...
```

## Comandos apt

Esta serie de comandos que viene a continuación se encargan de servir como una interfaz de alto nivel para gestionar los paquetes del sistema.

Las distribuciones antiguas de GNU/Linux usaban una versión antigua de apt, que agregaba "-get" a cada comando.

```bash
apt-cache search
apt-get install
apt-get remove
apt-get update
```

Las nuevas versiones incluyen versiones mejoradas de cada comando que remueve "-get" para diferenciarse.

## apt search

Este comando busca en los repositorios y nos muestra los paquetes que son relevantes para nuestra búsqueda. **Solo disponible para super usuario.**

```bash
apt search chromium
Ordenando... Hecho
Buscar en todo el texto... Hecho
browser-plugin-freshplayer-pepperflash/oldstable,oldstable 0.3.5-1+b1 amd64
  PPAPI-host NPAPI-plugin adapter for pepperflash

cgpt/oldstable,oldstable 0~R52-8350.B-2 amd64
  GPT manipulation tool with support for Chromium OS extensions
```

## apt policy

Con _apt policy_ podremos ver la versión que tenemos instalada de un paquete y las versiones que se encuentran disponibles para instalar. **Solo disponible para super usuario.**

```bash
apt policy chromium
chromium:
  Instalados: 73.0.3683.75-1~deb9u1
  Candidato:  73.0.3683.75-1~deb9u1
  Tabla de versión:
 *** 73.0.3683.75-1~deb9u1 500
        500 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
        100 /var/lib/dpkg/status
     70.0.3538.110-1~deb9u1 500
        500 http://ftp.us.debian.org/debian stretch/main amd64 Packages
        500 http://http.debian.net/debian stretch/main amd64 Packages
```

## apt show

Con _apt show_ podremos ver información sobre los paquetes que tenemos instalados, su versión, tamaño, las librerías de las que depende, sus tags y más. **Solo disponible para super usuario.**

```bash
apt show python3
 Package: python3
 Source: python3-defaults
 Version: 3.5.3-1
 Installed-Size: 67
 Maintainer: Matthias Klose <doko@debian.org>
 Architecture: amd64
 Replaces: python3-minimal (&lt;&lt; 3.1.2-2)
 # más información&lt;/doko@debian.org&gt;</doko@debian.org>
```

## apt install

Ahora toca el turno de instalar otros paquetes que dotarán a nuestro sistema de diversas funcionalidades, desde bases de datos, lenguajes de programación, hasta interfaces gráficas completas o navegadores. Podemos usar este comando para instalar el paquete que deseemos siempre y cuando se encuentre disponible en nuestra lista de repositorios. **Solo disponible para super usuario.**

```bash
apt install recordmydesktop
 # Instalará el paquete recordmydesktop
```

En distribuciones más antiguas de GNU/Linux se colocaba un "-get" después de apt.

```bash
apt install recordmydesktop
 # Instalará el paquete recordmydesktop
```

## apt remove

Así como podemos añadir paquetes, también podemos removerlos de nuestro sistema. Este comando se encarga de eso. **Solo disponible para super usuario.**

```bash
apt remove recordmydesktop
 # Este comando se encarga de remover el paquete de recordmydesktop del sistema
```

## apt update

Este comando actualiza la información disponible de los programas que tenemos desde los repositorios. Con esta información sabremos cuales pueden ser actualizados.

```bash
apt update 
Obj:13 http://ftp.us.debian.org/debian stretch-updates InRelease
Obj:14 http://ftp.us.debian.org/debian stretch Release 
Leyendo lista de paquetes... Hecho                     
Creando árbol de dependencias       
Leyendo la información de estado... Hecho
Se pueden actualizar 33 paquetes. Ejecute «apt list --upgradable» para verlos.
```

## apt list --upgradable

Muestra los paquetes que pueden ser actualizados

```bash
sudo apt list --upgradable
Listando... Hecho
apache2/oldstable 2.4.25-3+deb9u10 amd64 [actualizable desde: 2.4.25-3+deb9u9]
apache2-bin/oldstable 2.4.25-3+deb9u10 amd64 [actualizable desde: 2.4.25-3+deb9u9]
apache2-data/oldstable,oldstable 2.4.25-3+deb9u10 all [actualizable desde: 2.4.25-3+deb9u9]
apache2-doc/oldstable,oldstable 2.4.25-3+deb9u10 all [actualizable desde: 2.4.25-3+deb9u9]
```

## apt upgrade

Una vez que ya sabemos que paquetes podemos actualizar, podemos actualizarlos con el comando apt upgrade.

```bash
sudo apt upgrade
```

## exit

exit, ejecutado en modo super usuario, nos devuelve el prompt a la normalidad y termina nuestros privilegios como super usuario.

```bash
exit 
```

Si ejecutamos _exit_ nuevamente, esta vez en nuestro usuario de sistema, se cerrará la terminal.

## whereis

El comando nos muestra donde se encuentran los binarios, código fuente y manuales del comando que le solicitemos.

```bash
whereis node
node: /home/usuario/.nvm/versions/node/v11.9.0/bin/node
```

## which

Parecido al anterior, pero con una diferencia: este nos muestra donde se ejecutaría el comando en el **entorno actual.**

Si desconoces que es un entorno virtual te invito a leer mi entrada donde explico [que son los entornos virtuales en Python](/es/por-que-deberias-usar-un-entorno-virtual-en-python/)

En cambio, si no estamos usando entornos virtuales mostrará el mismo resultado que el anterior.

```bash
which python3
usr/bin/python3
```

Si activamos un entorno virtual nos cambiará la localización del comando en el entorno virtual.

```bash
source virtual/bin/activate
which python3
# activemos un entorno virtual para ver que sucede
/home/usuario/proyecto/entorno_virtual/bin/python3
```

## uptime

El comando uptime nos dice la hora actual, el tiempo que el sistema operativo lleva corriendo, la cantidad de usuarios están conectados y la carga promedio del sistema hace un minuto, 5 minutos y 15 minutos.

```bash
uptime 14:15:10 up  6:08,  1 user,  load average: 0.87, 0.87, 0.93
```

## last

Este comando se encarga de mostrarnos los últimos logins en el sistema.

```bash
last
 usuario  tty2         :0               Mon Apr 29 12:24   still logged in
 reboot   system boot  4.9.0-12-amd64   Mon Apr 29 07:22   still running
 usuario  tty2         :0               Sun Apr 29 11:27 - down   (13:33)
 reboot   system boot  4.9.0-12-amd64   Sun Apr 28 06:26 - 01:01  (18:34)
 usuario  tty2         :0               Sat Apr 27 22:42 - down   (02:07)
```

## w

Este comando de una letra nos muestra los usuarios que están loggeados actualmente en el sistema

```bash
w
 13:48:46 up  1:25,  1 user,  load average: 0.73, 0.83, 1.09
 USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
 usuario  tty2     :0               12:24    1:25m  1:20m  7.69s /opt/firefox/firefox-bin -contentproc -childID 23 -isForBrowser -prefsLen 9788 -prefMapSize 224870 -parentBuildID 20200708170
```

## last reboot

Last reboot nos muestra el historial de reinicios de nuestro sistema.

```bash
last reboot
 reboot   system boot  4.9.0-12-amd64   Sat Apr 27 07:22   still running
 reboot   system boot  4.9.0-12-amd64   Fri Apr 26 06:26 - 01:01  (18:34)
```

## Comando bonus: neofetch

Ahora que sabes como instalar paquetes voy a mostrarte un paquete que muestra información del sistema pero de una manera bastante visual, el nombre del paquete es [neofetch](https://github.com/dylanaraps/neofetch).

```bash
sudo apt install neofetch
```

Ahora ejecuta neofetch con privilegios de super usuario y mira por ti mismo lo que se imprime en la terminal.

```bash
sudo neofetch
```

## Más comandos básicos para la terminal de linux

Otra entrada y muchos más comandos revisados, faltan algunos comandos para cubrir solo una pequeña parte, toma tu tiempo, no hay prisa, levántate de la silla y ve a tomar agua o café. La tercera parte es la última e incluyo más comandos, algunos de ellos un poquito más complicados. [En la tercera parte te hablaré de comandos como wget, systemctl, curl, printenv, mkfs, kill, top y otros](/es/comandos-basicos-de-linux-printenv-export-lsof-top-ps-kill-curl-systemctl-chown-chroot/)