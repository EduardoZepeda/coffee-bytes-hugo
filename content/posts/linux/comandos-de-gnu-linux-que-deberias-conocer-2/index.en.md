---
aliases:
- /en/linux-commands-you-should-know-part-two/
- /en/basic-commands-of-linux-passwd-du-useradd-usermod-fdisk-apt/
- /en/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/comandos_GNU_Linux_2.jpg
date: '2019-05-13'
description: Learn about the basic GNU/Linux commands offered by the terminal, for
  this entry I explain uname, who, du, df, among many others.
keywords:
- linux
- commands
title: 'Linux Basic Commands: passwd du useradd usermod fdisk lscpu apt which'
---

This is the second part of the list of basic GNU/Linux terminal commands. If you want to see the commands from the previous post please [enter the first part here]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="en" >}}). I also have a [third part of GNU/Linux commands available]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer-tercera-parte/index.md" lang="en" >}}). 

For this entry I'm assuming you're using a Debian-based distribution, since I'm using apt instead of rpm.

Let's start with the uname command, to put ourselves in the context of the operating system we are working with.

## uname

This command displays information about the system, it is often used to display all the information by adding the option '_-a_' at the end of the command.

```bash
uname 
 Linux
uname -a
 Linux kino 4.9.0-8-amd64 #1 SMP Debian 4.9.144-3.1 (2019-02-19) x86_64 GNU/Linux
```

{{<ad>}}

## who

The who command, yes, like "the who", shows us the people who are connected at the moment of executing it.

```bash
who 
 usuario tty2 2019-04-29 08:07 (:0)
```

## whoami

The whoami command tells us who is the current user of the session.

```bash
whoami 
 usuario
```

## id

The id command shows us information about our user, his user identifier (uid), his group identifier (gid) and the groups to which he belongs.

```bash
id 
uid=1000(eduardo) gid=1000(eduardo) grupos=1000(eduardo),7(lp),24(cdrom),25(floppy),27(sudo),29(audio),30(dip),44(video),46(plugdev),108(netdev),113(bluetooth),117(scanner),999(docker)
```

## passwd

With this command, which seems to have forgotten the letter "o" and "r", we can change our password to access the system. Once the command is executed, it will ask us to enter the current password in order to change to a new one.

```bash
passwd 
Cambiando la contraseña de usuario.
(actual) contraseña de UNIX:
```

## du

Which stands for "_Disk Usage_", it shows us the space occupied by the directories and subdirectories from where we are executing the command in kilobytes. It can also be used to know the size of the files using the '-_a_' option at the end of the file, as well as using kilobytes, megabytes. The '_-h_' option decides whether to show kb, mb or gb depending on the size, so you get a more human-friendly measurement.

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

It shows us the size, occupied space and available space of the file system in 1kb blocks and, like the previous command, it also has the '-h' option available, to display the information in a more human-friendly way.

```bash
df -h
S.ficheros Tamaño Usados Disp Uso% Montado en
udev 3.9G 0 3.9G 0% /dev
tmpfs 793M 9.5M 783M 2% /run
/dev/sda4 235G 65G 158G 29% /
tmpfs 3.9G 55M 3.9G 2% /dev/shm
tmpfs 5.0M 4.0K 5.0M 1% /run/lock
tmpfs 3.9G 0 3.9G 0% /sys/fs/cgroup
tmpfs 793M 16K 793M 1% /run/user/115
tmpfs 793M 48K 793M 1% /run/user/1000
```

It is also useful to see the amount of free i-nodes in our file system.

```bash
df -h
S.ficheros Nodos-i NUsados NLibres NUso% Montado en
udev 1000495 502 999993 1% /dev
tmpfs 1009954 948 1009006 1% /run
/dev/sdb1 7331840 853743 6478097 12% /
tmpfs 1009954 281 1009673 1% /dev/shm
tmpfs 1009954 4 1009950 1% /run/lock
/dev/sda4 15654912 5525610 10129302 36% /home/hdd
tmpfs 201990 137 201853 1% /run/user/1000
/dev/sdc 0 0 0     - /media/eduardo/NOOK
/dev/sdd 0 0 0     - /media/eduardo/11D8-1E0C
```

## free

It shows the amount, in kilobytes, of free and occupied memory in the system and swap memory. If we want a friendlier reading we can use the option '-h'.

```bash
free 
               total used free shared buff/cache available
Mem:        8111072 4937452 736592 263560 2437028 2605744
Swap:      11717628 0 11717628
free -h
              total used free shared buff/cache available
Mem:           7.7G 4.7G 762M 246M 2.3G 2.5G
Swap:           11G 0B 11G
```

## su

There are commands that we cannot use if we do not have the proper permissions. The super user is a user who has unrestricted access to the system. This command, after a password verification, allows you to access the system as a super user.

```bash
su 
 Contraseña:
```

If we pass the verification our prompt will change and will show us a hash at the end '#'. **Don't close your terminal yet, we need to stay in super user mode to execute the following commands **.

```bash
...~#
```

## useradd

It allows us to add a user. **Only available for super user.**

```bash
useradd nombre_de_usuario
```

If we use the _-m_ option, it will create a directory in _/home_ with the user's name and the necessary permissions.

```bash
useradd -m nombre_de_usuario
```

## usermod

The usermod command allows us to modify a user's account and has many functions, including:

* Add a user to a group
* Disable accounts after a period of inactivity
Modify a user's login directory * Modify a user's login directory
* Change a user's name
Move a user's home directory to another location * Move a user's home directory to another location

With the command below we will use the _-a_ option to add the user named user to one or more groups. We can add more groups by separating them by a comma.

```bash
usermod -a -G grupo usuario
```

With the _-e_ option we can set an expiration date for a user account. The date format must be YYYYY-MM-DD.

```bash
usermod -e 2099-11-11 usuario
```

## userdel

This command allows us to delete a user. **Only available for super user.**

```bash
userdel nombre_de_usuario
```

## fdisk

The fdisk command is used to display the system tables or partitions, it can only be run as super user. If you run it without arguments it will display the command's help page. It is generally used with the '_-l_' option to list and view details of system partitions and tables. **Only available for super user.**

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

Disposit. Inicio Comienzo Final Sectores Tamaño Id Tipo
/dev/sda1  *            2048 1026047 1024000 500M 7 HPFS/NTFS/exFAT
/dev/sda2 1026048 1429233663 1428207616 681G 7 HPFS/NTFS/exFAT
/dev/sda3 1429235710 1452670975 23435266 11.2G 5 Extendida
/dev/sda4 1452670976 1953523711 500852736 238.8G 83 Linux
/dev/sda5 1429235712 1452670975 23435264 11.2G 82 Linux swap / Solaris</disco></disco>
```

## lscpu

Prints information related to the CPU architecture.

```bash
Architecture:          i686
# CPU op-mode(s):        32-bit, 64-bit
# Byte Order:            Little Endian
# CPU(s):                1
# On-line CPU(s) list:   0
# Thread(s) per core:    1
#...
```

## apt commands

The following series of commands serve as a high-level interface to manage system packages.

Older GNU/Linux distributions used an older version of apt, which added "-get" to each command.

```bash
apt-cache search
apt-get install
apt-get remove
apt-get update
```

The new versions include enhanced versions of each command removing "-get" to differentiate.

## apt search

This command searches the repositories and shows us the packages that are relevant to our search. **Only available for super user.**

```bash
apt search chromium
Ordering... Done
Search in all the text... Done
browser-plugin-freshplayer-pepperflash/oldstable,oldstable 0.3.5-1+b1 amd64
  PPAPI-host NPAPI-plugin adapter for pepperflash

cgpt/oldstable,oldstable 0~R52-8350.B-2 amd64
  GPT manipulation tool with support for Chromium OS extensions
```

## apt policy

With _apt policy_ we will be able to see the version of a package we have installed and the versions that are available to install. **Only available for super user.**

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

With _apt show_ we will be able to see information about the packages we have installed, their version, size, the libraries they depend on, their tags and more. **Only available for super user.**

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

Now it is time to install other packages that will provide our system with different functionalities, from databases, programming languages, to complete graphical interfaces or browsers. We can use this command to install the package we want as long as it is available in our repository list. **Only available for super user.**

```bash
apt install recordmydesktop
 # Instalará el paquete recordmydesktop
```

In older GNU/Linux distributions a "-get" was placed after apt.

```bash
apt install recordmydesktop
 # Instalará el paquete recordmydesktop
```

## apt remove

Just as we can add packages, we can also remove them from our system. This command takes care of that. **Only available for super user.**

```bash
apt remove recordmydesktop
 # Este comando se encarga de remover el paquete de recordmydesktop del sistema
```

## apt update

This command updates the available information of the programs we have from the repositories. With this information we will know which ones can be updated.

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

Displays the packages that can be upgraded

```bash
sudo apt list --upgradable
Listando... Hecho
apache2/oldstable 2.4.25-3+deb9u10 amd64 [actualizable desde: 2.4.25-3+deb9u9]
apache2-bin/oldstable 2.4.25-3+deb9u10 amd64 [actualizable desde: 2.4.25-3+deb9u9]
apache2-data/oldstable,oldstable 2.4.25-3+deb9u10 all [actualizable desde: 2.4.25-3+deb9u9]
apache2-doc/oldstable,oldstable 2.4.25-3+deb9u10 all [actualizable desde: 2.4.25-3+deb9u9]
```

## apt upgrade

Once we know which packages we can upgrade, we can upgrade them with the apt upgrade command.

```bash
sudo apt upgrade
```

## apt source

Download the source code of a specific binary, for that the source code repositories must be enabled, *deb-src* in debian.

``` bash
sudo apt source <program>
```

## apt build-dep 

Install all the required dev dependencies for a binary

```bash
sudo apt build-dep <program>
```

## exit

exit, executed in super user mode, returns the prompt to normal and terminates our super user privileges.

```bash
exit
```

If we run _exit_ again, this time in our system user, the terminal will close.

## whereis

The command shows us where the binaries, source code and manuals of the command we request are located.

```bash
whereis node
node: /home/usuario/.nvm/versions/node/v11.9.0/bin/node
```

## which

Similar to the previous one, but with a difference: this one shows us where the command would be executed in the **current environment**.

If you don't know what a virtual environment is, I invite you to read my post where I explain [what are virtual environments in Python]({{< ref path="/posts/python/por-que-usar-un-entorno-virtual-en-python/index.md" lang="en" >}}).

On the other hand, if we are not using virtual environments it will show the same result as the previous one.

```bash
which python3
usr/bin/python3
```

Activating a virtual environment will change the location of the command in the virtual environment.

```bash
source virtual/bin/activate
which python3
# let's activate a virtual environment
/home/usuario/proyecto/entorno_virtual/bin/python3
```

## uptime

The uptime command tells us the current time, how long the operating system has been running, how many users are connected and the average load of the system one minute ago, 5 minutes ago and 15 minutes ago.

```bash
uptime 14:15:10 up 6:08, 1 user, load average: 0.87, 0.87, 0.93
```

## last

This command is in charge of showing the last logins in the system.

```bash
last
 usuario tty2         :0 Mon Apr 29 12:24 still logged in
 reboot system boot 4.9.0-12-amd64 Mon Apr 29 07:22 still running
 usuario tty2         :0 Sun Apr 29 11:27 - down   (13:33)
 reboot system boot 4.9.0-12-amd64 Sun Apr 28 06:26 - 01:01  (18:34)
 usuario tty2         :0 Sat Apr 27 22:42 - down   (02:07)
```

## w

This one-letter command shows the users currently logged into the system.

```bash
w
 13:48:46 up 1:25, 1 user, load average: 0.73, 0.83, 1.09
 USER TTY FROM LOGIN@   IDLE JCPU PCPU WHAT
 usuario tty2     :0 12:24 1:25m 1:20m 7.69s /opt/firefox/firefox-bin -contentproc -childID 23 -isForBrowser -prefsLen 9788 -prefMapSize 224870 -parentBuildID 20200708170
```

## last reboot

Last reboot shows us the reboot history of our system.

```bash
last reboot
 reboot system boot 4.9.0-12-amd64 Sat Apr 27 07:22 still running
 reboot system boot 4.9.0-12-amd64 Fri Apr 26 06:26 - 01:01  (18:34)
```

## Bonus command: neofetch

Now that you know how to install packages I am going to show you a package that displays system information but in a very visual way, the name of the package is [neofetch](https://github.com/dylanaraps/neofetch#?).

```bash
sudo apt install neofetch
```

Now run neofetch with super user privileges and see for yourself what is printed in the terminal.

```bash
sudo neofetch
```

## More basic linux terminal commands

Another entry and many more commands reviewed, some commands are missing to cover only a small part, take your time, there is no hurry, get up from your chair and go get some water or coffee. The third part is the last one and I include more commands, some of them a little bit more complicated. [In the third part I will tell you about commands like wget, systemctl, curl, printenv, mkfs, kill, top and others](/en/linux/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/)