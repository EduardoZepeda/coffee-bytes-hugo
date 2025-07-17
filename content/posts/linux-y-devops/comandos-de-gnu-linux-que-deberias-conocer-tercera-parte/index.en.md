---
aliases:
- /en/linux-commands-you-should-know-part-three/
- /en/basic-commands-linux-printenv-export-lsof-top-ps-kill-curl-systemctl-chown-chroot/
- /en/linux-basic-commands-lsof-top-ps-kill-systemctl-chown-chroot/
authors:
- Eduardo Zepeda
categories:
- linux and devops
coverImage: images/comandos_GNU_Linux_3.jpg
date: '2019-05-21'
description: 'Usage and common options of the linux terminal commands: printenv, systemctl,
  top, ps, chown, kill, wget, curl, chroot, export and others'
keywords:
- linux
- commands
title: 'Linux Basic Commands: lsof top ps kill systemctl chown chroot'
---

This is the continuation of the following parts:

* [GNU Linux Basic Commands, part one](/en/linux and devops/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp//)
* [GNU Linux basic commands, part two](/en/linux and devops/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/).

## printenv

Printenv is in charge of printing the environment variables of our system.

### What is an environment variable?

Environment variables are a **series of equalities known as environment variables**, and their corresponding values. Environment variables describe the environment in which a program runs and influence how our operating system behaves. These variables are available to be read by any application on our system, so we can use them to store information such as user names, configuration values, paths to files, etc.

```bash
printenv
...
XDG_MENU_PREFIX=gnome-
LANG=en_US.UTF-8
GDM_LANG=en_US.UTF-8
DISPLAY=:0
...
```

The printenv command also allows us to access the value of a particular variable, passing it as argument

```bash
printenv LANG
en_US.UTF-8
```

{{<ad>}}

## export

Export allows us to create an environment variable. This environment variable will be available during our session in the terminal. When you close the terminal the variable disappears.

```bash
export MY_VARIABLE=my_value
printenv MY_VARIABLE
my_value
```

## lsof

This command returns a list of files and the processes that are using them.

The results are returned in the following format.

```bash
lsof
COMMAND PID TID USER FD TYPE DEVICE SIZE/OFF NODE NAME
```

You can filter the results by user:

```bash
sudo lsof -u <username>
```

Or by process:

```bash
sudo lsof -c <process_name>
```

Or by port

```bash
sudo lsof -i :<port_number>
```

## top

The top command shows the list of processes or threads that are running in real time and information related to each of them. See below how the processes are ordered, first are the processes of the current user and then follows a list of processes ordered by their process identifier (PID), if you press the key _down_ ↓ it will show you more processes. You can press the '_q_' key at any time to leave the interactive screen and return to the terminal.

```bash
top 
  top - 11:22:06 up 2:29, 1 user, load average: 0.57, 0.86, 1.00
  Tasks: 214 total, 1 running, 213 sleeping, 0 stopped, 0 zombie
  %Cpu(s): 14.7 us, 2.8 sy, 0.1 ni, 81.1 id, 1.1 wa, 0.0 hi, 0.2 si, 0.0 st
  KiB Mem :  8111064 total, 3577672 free, 2705236 used, 1828156 buff/cache
  KiB Swap: 11717628 total, 11717628 free, 0 used. 4961212 avail Mem 

  PID USER PR NI VIRT RES SHR S  %CPU %MEM TIME+ COMMAND                                                                                                                   
 10306 user 20 0 45064 3644 2984 R 12.5 0.0 0:00.02 top                                                                                                                       
  1657 user 20 0 2433020 186960 84944 S 6.2 2.3 6:45.07 gnome-shell                                                                                                               
  1689 user 9 -11 1764808 15476 11528 S 6.2 0.2 2:52.65 pulseaudio                                                                                                                
  5185 user 20 0 602440 34612 25572 S 6.2 0.4 0:01.35 gnome-terminal- 
  9699 user 20 0 1782564 282448 133804 S 6.2 3.5 0:16.06 chromium                                                                                                                  
     1 root 20 0 139128 6988 5300 S 0.0 0.1 0:01.12 systemd                                                                                                                   
     2 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kthreadd                                                                                                                  
     3 root 20 0 0 0 0 S 0.0 0.0 0:00.08 ksoftirqd/0
```

## ps

The ps command will show us the list of running processes, but not in real time and interactively, but it prints them on the screen; ideal to dump it in a file or process the information that the command gives us.

```bash
ps
  PID TTY TIME CMD
 9782 pts/1 00:00:00 bash
13249 pts/1 00:00:00 ps
```

As you can see, the command '_ps_' is not showing us the same processes as the previous command. This is because it only showed us the processes that were running at that moment; bash, because we are running the command in the terminal and '_ps_', because it is the command we ran. Let's run the command now with the '_aux_' option.

```bash
ps aux
 USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
 root 1 0.0 0.0 139128 6988 ?        Ss 08:52 0:01 /sbin/init
 root 2 0.0 0.0 0 0 ?        S 08:52 0:00 [kthreadd]
 root 3 0.0 0.0 0 0 ?        S 08:52 0:00 [ksoftirqd/0]
```

Now it shows more information, the CPU percentage and the memory percentage. Note that the _%CPU_ shown by both commands will not be the same because it is calculated differently in each of them. You can see more details in the code or in the manuals of both commands.

### /proc and the ps command

The ps command gets its content information from the _/proc_ folder, which is where the linux running processes are stored.

## pstree

The pstree command will show us the list of running processes but in graphical format and broken down.

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

The kill command, to kill a process just type the command in the terminal followed by its process identifier (PID), the number that appears in the two previous commands. It is the perfect command to use if chrome ate all the RAM and your system is no longer responsive, or if you want to terminate a process that is causing problems. When executing this command the program exits normally, performing its exit actions.

```bash
kill 9699
 exit actions will be executed
```

If after this command the process still does not respond, just add the option '-9' to the command, this command will cut the process without giving it time to perform its output actions.

```bash
kill -9 9699
 no exit actions will be executed
```

### Internal operation of the kill command

Internally the kill command sends signals of different types to the processes, these signals can be received by the application, to handle the closing of these. Here are some signals:

| Signal  | Value | Action | Comment                                                         | Command     | Keyboard Shortcut |
| ------- | ----- | ------ | --------------------------------------------------------------- | ----------- | ----------------- |
| SIGINT  | 2     | Term   | Interrupt from Keyboard                                         | kill -2 pid | CTRL+C            | CTRL+C |
| SIGKILL | 9     | Term   | Terminate a process in a forced manner, cannot be handled by Go | kill -9 pid |                   |        | kill -9 pid |  |  | CTRL+C | CTRL+C | CTRL+C | CTRL+C | SIGTERM | 15 | Term | Terminate a process in a controlled manner |

## wget

With wget we can download files from the Internet. To use it we put in front the address of the resource we want to download, from files to web pages.

```bash
wget https://google.com
--2019-05-20 22:38:34-- https://google.com/
Resolviendo google.com (google.com)... 216.58.217.14, 2607:f8b0:4012:80b::200e
Conectando con google.com (google.com)[216.58.217.14]:443... connected.
Petición HTTP SENT Waiting for response... 301 Moved Permanently
Localización: https://www.google.com/ [siguiendo]
--2019-05-20 22:38:35-- https://www.google.com/
Resolviendo www.google.com (www.google.com)... 216.58.193.36, 2607:f8b0:4012:805::2004
Conectando con www.google.com (www.google.com)[216.58.193.36]:443... connected.
Petición HTTP SENT Waiting for response... 200 OK
Longitud: no especificado [text/html]
Grabando a: “index.html”

index.html                                          [ <=>                                                                                                  ]  ------11.11K  --.-KB/s in 0.003s  

2019-05-20 22:38:35 (3.73 MB/s) - “index.html” guardado [11380]
```

## ping

The ping command uses the ICMP protocol to request a response. This, put in simpler words, means that it will send a request to the Internet to see if it receives a response. It is generally used to determine if one computer can access another. In this example we receive a response from the address listed after the command.

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

This command is used to transfer information to or from a server. It supports multiple protocols, however it is often used in web development for testing.

```bash
curl example.org
```

Adding the _-i_ option includes the http headers in the response.

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

We can send cookies through curl using the _--cookie_ option.

```bash
curl --cookie "this_cookie=does_nothing" example.org
```

We can also make POST web requests, useful to emulate form submission.

```bash
curl -X POST -F 'email=email@example.org' example.org
```

In curl we send HTTP headers using the _-H_ option.

```bash
curl -H "Accept-Charset: utf-8" example.org
curl -H "Authorization: Token 12345" http://example.org
```

We can send information for a POST request using the option -d

```bash
curl -d "data=value" -X POST http://example.org
```

If we want to omit the response, and show only the response headers, we use the -I option.

```bash
curl -I example.org
# HTTP/1.1 200 OK
# Content-Encoding: gzip
```

The curl command is a command with many options, to cover practically any need, I recommend that you give a read to its manual if you want to deepen in its functions.

## systemctl

systemctl is a _systemd_ utility, used to administer the system and its services, it is part of the default installation in some Linux-based operating systems.

This software has raised a strong controversy among GNU/Linux enthusiasts, because it is [accused of going against the principles of Linux](https://suckless.org/sucks/systemd/#?) and wanting to be included as the default option for GNU/Linux systems. The contempt is such that there are even distributions whose only reason to exist is to offer an alternative of another popular distribution but without systemd. For example Debian and [Devuan](https://devuan.org/), the latter is a fork of the popular [Debian](https://www.debian.org/), but without _systemd_.

Systemctl allows us to run or stop services; add or remove them to the startup process of our operating system; see their current status. Systemctl has many options, so I will only list the most common ones. If you want to delve deeper into the capabilities of this command run the command '_man systemctl_' to see its manual. This command must be run with super user powers.

Here are some of the capabilities of systemctl:

### Start a service

```bash
systemctl start postgresql
```

### Restart a service

```bash
systemctl restart postgresql
```

### Display the status of a service

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

### Stop a service

```bash
systemctl stop postgresql
```

### Add a service at startup

```bash
systemctl enable postgresql
 # add postgresql to startup
Synchronizing state of postgresql.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable postgresql
```

### Remove a service from startup

```bash
systemctl disable postgresql
 # Remove postgresql from startup
Synchronizing state of postgresql.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install disable postgresql
```

### Show services in memory

```bash
systemctl list-units 
```

### Start OS shutdown process

```bash
systemctl poweroff
 # Beware, this command will turn off your system
```

### Restart the OS

```bash
systemctl reboot
 # Beware, this command will restart your OS
```

### Review the logs of a service

To check the logs and see what went wrong (or right) we will use the journalctl tool, instead of systemctl, followed by the -u option and the name of the service.

```bash
journalctl -u celery
Feb 25 22:52:09 yourapp-debian-django sh[12677]: celery multi v4.1.0 (latentcall)
Feb 25 22:52:09 yourapp-debian-django sh[12677]: > Starting nodes...
...
```

### Check for faults on the service sheets

When a service fails due to a misconfigured service sheet, we will want to know the details, to know them we use this command.

```bash
sudo systemd-analyze verify <nombre>.service
```

Service sheets can be found at

* /usr/lib/systemd/system/
* /lib/systemd/system/
* /etc/systemd/system/

## mkfs

The mkfs command allows us to assign a file system type to a device. This command is not used alone, but each file system has its own command; one for ext3, one for ext4, one for xfs, etc.

A file type system will determine whether we can have a fixed or dynamic number of i-nodes in your system.

```bash
mkfs.ext4 /dev/sdb2
mkfs.xfs /dev/hda1
```

If you want to go deeper into this topic, there is a video explaining the [differences between ext4 and xfs file types.](https://www.youtube.com/watch?v=f0gz-PV3X4Y#?)

## stat

With stat we will obtain more detailed and low-level information about a file.

Look at the access options, I will explain later what these digits mean.

```bash
stat file.txt
  Fichero: s.rst
  Tamaño: 798       	Bloques: 8 Bloque E/S: 4096 fichero regular
Dispositivo: 804h/2052d	Nodo-i: 6310391 Enlaces: 1
Acceso: (0644/-rw-r--r--)  Uid: ( 1000/ eduardo)   Gid: ( 1000/ eduardo)
      Acceso: 2021-09-11 15:03:41.464552922 -0500
Modificación: 2021-09-11 15:03:41.476553169 -0500
      Cambio: 2021-09-11 15:03:41.496553579 -0500
    Creación: 2021-09-11 15:03:41.464552922 -0500
```

## chroot

There are situations where we need to change the default root folder address for some more advanced uses, such as creating overlays or containers, such as those in [docker](/en/docker/what-is-docker-and-what-is-it-for/). It's because of chroot that [docker containers are able to have their own file system](/en/docker/how-does-a-docker-container-work-internally/).

```bash
chroot /my_new_root_directory
```

## chown

Changes the owner of a file to the one we specify. Remember that **in Linux everything is a file**, so chown can also be used on directories. Another factor to take into account when changing a file owner and/or group, is to make sure that we have the necessary permissions. If you have a problem with [permissions in GNU Linux](/en/linux and devops/understand-permissions-in-gnu-linux-and-the-chmod-command/) **enter as super user**.

```bash
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 12:22 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 user user 0 may 13 12:13 text.txt
 # user: user
 # group: user
chown root text.txt
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 12:22 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 root user 0 may 13 12:13 text.txt
 New owner is root
```

In the above example, we only specify one user. In order to specify a group we must use the syntax of '**_user:group'_**. Since we only need to change the group we will omit the first part of the above syntax, it will look like '**:group**'.

```bash
chown :root text.txt
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 12:22 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 root root 0 may 13 12:13 text.txt
 Ahora el file también pertenece al grupo 'root'
```

Now let's get everything back to normal using the full syntax: '**_user:group'_****

```bash
chown user:user text.txt
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 12:22 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 user user 0 may 13 12:13 text.txt
 Nuevamente el file text.txt pertenece al user de nombre 'user' y al grupo llamado 'user'.
```

Now let's try changing the user and group of all files and the directory using the '_-R_' option that will allow us to do the same as we did in the previous step with a file, but this time recursively with the contents of a directory.

```bash
ls -la
total 8
drwxr-xr-x 2 root root 4096 may 13 13:04 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 root root 0 may 13 12:50 .file_oculto.txt
-rw-r--r-- 1 root root 0 may 13 13:04 text1.txt
-rw-r--r-- 1 root root 0 may 13 13:04 text2.txt
chown -R user:user . 
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 13:04 .
drwxr-xr-x 6 user user 4096 may 13 12:22 ..
-rw-r--r-- 1 user user 0 may 13 12:50 .file_oculto.txt
-rw-r--r-- 1 user user 0 may 13 13:04 text1.txt
-rw-r--r-- 1 user user 0 may 13 13:04 text2.txt
 Todos los files del directorio, inclusive los ocultos cambiaron de propietario y grupo
```

## chmod

The previous command allowed us to change the owner and group of a file. This command allows us to modify the permissions of a file.

```bash
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 14:11 .
drwxr-xr-x 6 user user 4096 may 13 14:11 ..
-rw-r--r-- 1 user user 0 may 13 14:11 file.py
-rw-r--r-- 1 user user 0 may 13 14:11 file2.py
```

As you can see, the above command shows on the screen that the owner of both files has read and write permissions, the group and others can only read both files. We will modify the permissions in GNU/Linux with the _chmod_ command to add some extras.

```bash
chmod 755 file.txt
ls -la
total 8
drwxr-xr-x 2 user user 4096 may 13 14:11 .
drwxr-xr-x 6 user user 4096 may 13 14:11 ..
-rwxr-xr-x 1 user user 0 may 13 14:11 file.py
-rw-r--r-- 1 user user 0 may 13 14:11 file2.py
```

Now the owner, named user, can read, write and execute _file.py_, the group named user and others can read and execute it. The file named _file2.py_ did not have its permissions changed. This time we will try to use the '_-R_' option to recursively specify the permissions of the entire directory and its contents.

```bash
chmod 755 -R .
ls -la
drwxr-xr-x 2 user user 4096 may 13 14:24 .
drwxr-xr-x 6 user user 4096 may 13 14:23 ..
-rwxr-xr-x 1 user user 0 may 13 14:24 file.py
-rwxr-xr-x 1 user user 0 may 13 14:24 file2.py
```

Now the owner, named _user_, can write, read and execute both files with extension '_.py_', while the group named _user_ and others can read and execute, but not write.

## More about the chmod command

The GNU/Linux permissions system is a rather complex topic, so I will discuss it in more detail in the next post.