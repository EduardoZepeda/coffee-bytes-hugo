---
aliases:
- /understand-permissions-in-gnu-linux-and-the-chmod-command/
title: "Mastering Chmod Command: Linux Permissions Simplified"
date: "2019-05-29"
categories:
- linux and devops

coverImage: "images/permisos_gnu_linux.jpg"
description: "Understand at once how the chmod command works, in charge of assigning permissions in GNU/Linux to folders and files."
keywords:
- linux

authors:
- Eduardo Zepeda
url: "/en/understand-permissions-in-gnu-linux-and-the-chmod-command/"
---

The previous entry was the third part of the series on the most common GNU/Linux commands. To end the entry I wrote about the [chmod command, which manages permissions](/en/linux-basic-commands-passwd-du-useradd-usermod-fdisk-lscpu-apt-which/). This chmod command is one of the most complex commands in GNU/Linux, not because of its variety of options, but because of the previous knowledge required to be able to use it correctly.

In this post I will expand a bit on the topic of permissions and show the two different ways of the chmod command to assign permissions to a file. For this entry we are going to use several basic GNU/Linux commands, if you are not very familiar with the basic commands check my tutorial on [the basic Linux commands](/en/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp//)

## Types of permissions in GNU/Linux

In GNU/Linux there are 3 types of permissions for files; permission to read, specified by the letter '_r_'; to write, represented by the letter '_w_'; and to execute, assigned to the letter '_x_'. 

**In Linux everything is a file**, so the above applies equally to directories. Permissions for files are shown by the '_ls' command.

```bash
ls -l
-rw-r--r-- 1 user user 9288 may 14 00:40 helloWorld.out
-rw-r--r-- 1 user user 106 may 14 00:40 source_code.cpp
```

There are 3 sets of 3 letters, each set contains spaces for the letters '_r_' '_w_' and '_x_', in that order. 

The presence of a hyphen indicates the absence of permissions. The first set represents the permissions of the file owner, the second set represents the permissions of the group to which the file belongs, and the third set represents the permissions of others. Before the first set is a space for the file type; '_D_' for directory, or a hyphen for a file.

![Meaning of permissions on a GNU/Linux system](images/PermisosGNULinux-1.png "Meaning of permissions on a GNU/Linux system")

None of the sets have permissions to execute the _helloWorld.out_ file so, when trying to do so, it will show us the sentence '_permission denied_' in the terminal.

```bash
./helloWorld.out
bash: ./helloWorld.out: Permission denied
```

If we remove the '_r_' and '_w_' permissions from a file, using the chmod command, we will not be able to read or modify its contents either, as shown in the last lines of code below.

```bash
chmod 000 source_code.cpp
 # Removemos todos los permisos del archivo source_code.cpp
ls -l
total 16
---------- 1 user user 106 may 14 00:40 source_code.cpp
-rwxr-xr-x 1 user user 9288 may 14 00:40 helloWorld.out
cat source_code.cpp
cat: source_code.cpp: Permiso denegado
echo "some text" >> source_code.cpp
bash: source_code.cpp: Permiso denegado
```

We added the permission to execute, '_x_', to all permission sets and now the executable can be run and print to the terminal the phrase '_Hello world_'. **Don't worry about the meaning of the numbers in the chmod command, we will explain it later.

```bash
chmod 755 ejecutable.out
# We grant all permissions to the owner
# And read and execute permissions to the rest
ls -l
total 16
-rw-r--r-- 1 user user 106 may 14 00:40 source_code.cpp
-rwxr-xr-x 1 user user 9288 may 14 00:40 helloWorld.out
./helloWorld.out
 Hello world
```

## What do the numbers in the chmod command mean?

There are 3 figures in the numbers that follow the chmod command, each figure represents the permissions of their respective set. The number of each digit can range from 0 to 7. This number is determined by the sum of the values of each permission; 4, 2 and 1.

The '_r_' permission will have a value of 4, the '_w_' permission will have a value of 2 and the '_x_' permission will have a value of 1.

| Permit  | Value |
| ------- | ----- |
| Read    | 4     |
| Write   | 2     |
| Execute | 1     |

![Meaning of numbers in GNU/Linux permissions](images/PermisosNumerosGNULinux.png "Meaning of numbers in GNU/Linux permissions")

Considering the above, a value of 7 (4+2+1) means that it has full permissions, a value of 5 (4+1) means that it has read (r) and execute (x) permissions, a value of 3 (2+1) means write (w) and execute (x) permissions for a file.

The first digit represents the permissions of the file owner, the second digit the permissions of the group and the third digit the permissions of others.

| Permit Value | Permits for...                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 755          | owner: 4 + 2 +1 = 7 (Read + Write + Execute) group: 4 + 1 = 5 (Read and Execute) others: 4 + 1 = 5 (Read and Execute)                  |
| 777          | owner: 4 + 2 +1 = 7 (Read + Write + Execute) group: 4 + 2 +1 = 7 (Read + Write + Execute) other: 4 + 2 +1 = 7 (Read + Write + Execute) |
| 111          | owner: 1 (Execute) group: 1 (Execute) other: 1 (Execute)                                                                               |

Let's look at some examples of the permit equivalent of the numbers.

```bash
_rwxrwxrwx
 Same as 777
_rwxr_xr_x
 Same as 755
___x__x__x
 Same as 111
```

## Another method to assign permissions with chmod

There is an alternative way to assign permissions using the chmod command that looks more intuitive. The notation that will replace the 3 digits, in the chmod command, consists of one or more letters to specify the sets to which we want to apply permissions; _'a'_, for all; _'u'_, for the owner user; _'g'_, for group; and _'o'_, for others.

| Permission | Meaning |
| ---------- | ------- |
| a          | All     |
| u          | User    |
| g          | Group   |
| o          | Others  |

One or more letters may be used. Then, the '+' or '-' symbol, depending on whether we want to add or remove permissions, respectively. And, finally, the permissions we want to add or remove, with the letters '_r_', '_w_' and '_x_', to read, write and execute, respectively. Let's see some examples to clarify it.

```bash
chmod a+rwx source_code.cpp
-rwxrwxrwx 1 user user 106 may 14 00:40 source_code.cpp
```

In the first example we select all the sets using the letter '_a_', choose to add permissions using the '_+_' symbol and specify that the permissions to add are '_r_', '_w_' and '_x_'; read, write and execute, respectively.

```bash
chmod o-w helloWorld.out
-rwxrwxr-x 1 user user 106 may 14 00:40 source_code.cpp
```

For the second example we choose that the changes will be made to the set _other_, select the sign _'-'_, to remove permissions, and declare that the permission to remove is the write permission, 'w'.

```bash
chmod ug-wx source_code.cpp
-r--r--r-x 1 user user 106 may 14 00:40 source_code.cpp
```

And finally, in the third example the sets for owner and group, 'g' and 'u', respectively, will lose write and execute rights, 'w' and 'x'.

This syntax may be more intuitive than the previous one, which one to use? whichever is easier for you to understand, you can achieve the same results using either one.