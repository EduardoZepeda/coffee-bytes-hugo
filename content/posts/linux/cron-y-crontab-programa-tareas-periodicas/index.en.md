---
aliases:
- /en/cron-and-crontab-schedules-recurring-tasks/
- /en/program-periodic-tasks-easily-in-linux-with-cron-and-crontab/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/programa_tareas_periodicas_con_cron.jpg
date: '2020-02-01'
description: Learn how to use crontab to schedule repetitive tasks such as database
  backups, sending emails, periodically on GNU/Linux using Cron and Crontab.
keywords:
- linux
- crontab
title: Program periodic tasks easily in Linux with Cron and Crontab
---

In this post I'll teach you how to program tasks to be executed every certain amount of time, it could be as complex as you want, just by modifying a simple file, the crontab file, which is available in every popular Linux distribution, if not all of them.

Many times we want to run a script or a command every so often, for example when we want to perform periodic backups of a database, send your subscribers a reminder email, or perhaps delete cache files every so often. Cron, in conjunction with Crontab allows you to run a task every so often.

A rather naive way would be to create a script and use Python's _time.sleep()_ method, or its equivalent in another language, to delay its execution for the desired time. However, we don't need to reinvent the wheel; someone already took care of this task in GNU/Linux.

## The cron daemon and basic commands

Cron is a daemon, available in many GNU/Linux distributions, that reads a file located in the path _/var/spool/cron/cron/crontabs/tu_user_ and executes the tasks specified there, as long as its specified execution schedule is appropriate.

To check the content of the file to be checked by the Cron daemon we will use the _crontab_ command with the _-l_ option below

```bash
crontab -l
```

This file **should not be edited directly**, the correct way to modify it is by running the _crontab_ command, followed by the -e option

```bash
crontab -e
```

This will open our default terminal text editor. When reviewing the contents we will see that most of the text is commented. Right at the end of the file we can find these lines, which specify the format we will use to schedule our tasks.

```bash
# m h dom mon dow command
```

The meaning of each element of this line is as follows:

* \# Serves to keep this line commented, do not remove it.
* m stands for minutes
* h stands for hours
* dom means day of month (day of month)
* mon means month (month)
* dow means day of week (day of week)
* command means command

To tell cron how to execute a task we will fill lines in the crontab file following the above pattern. For example:

```bash
# m h dom mon dow command
* * * * * script.py
```

This configuration would execute the _script.py_ file every minute, every hour, every day of the month, every month, every day of the week.

```bash
# m h dom mon dow command
0 6 * * * script.py
```

On the other hand, the above configuration would run _script.py_ every day at 6:00 am.

{{<ad0>}}

```bash
# m h dom mon dow command
0 6 * * 1 script.py
```

This one here will run _script.py_ every Monday at 6:00 a.m. Note that crontab counts Sunday as day 0 and it is also day 7, so you can use the first three English letters of each day, i.e., we can replace the 1 with 'mon', without the quotes.

```bash
# m h dom mon dow command
0 6 30 * * script.py
```

This configuration will run our script on the 30th of each month at 6:00 am.

```bash
# m h dom mon dow command
0 6 30 12 * script.py
```

And finally, this configuration would execute the command on December 30 at 6:00 a.m.

Confused? It's normal, I think it takes a little time. Anyway at the end of this post I share with you a great tool to make it easier for you to create and understand these configurations.

{{<ad1>}}

## Some more complex examples

Maybe we want something more complex than the previous examples, what if we have a script that is in charge of paying employees and we want it to run every 1st and 15th of each month? **In crontab we can separate as many values as we want using commas**.

```bash
# m h dom mon dow command
0 9 1,15 * *  script.py
```

And if we want a script to run every hour, but only during the early morning hours of Saturdays and Sundays, from 12:00 a.m. to 6:00 a.m. **Crontab allows you to specify ranges of values using hyphens** **Crontab allows you to specify ranges of values using hyphens**.

{{<ad2>}}

```bash
# m h dom mon dow command
0 0-6 * * 6,7 script.py
```

What if we would like to change our wallpaper every 6 hours? No problem, **we can use a slash in crontab to set time periods**.

```bash
# m h dom mon dow command
0 */6 * * *  script.py
```

## Crontab and environment variables

**There is something very important to remember every time we use Crontab; the environment variables ** Normally in a GNU/Linux system we have a number of environment variables, which we can view using the _printenv_ command in terminal. Try running the command in your terminal to see how many environment variables your system has. The environment variables can vary greatly according to the user, but the important thing to appreciate is that there are quite a few.

```bash
printenv
...
USER=usuario
DESKTOP_SESSION=default
QT_QPA_PLATFORMTHEME=qgnomeplatform
...
```

{{<ad3>}}

On the other hand if you get the environment variables that are active when you use Crontab you will notice that they are much less. **The processes that Cron runs from Crontab do not have access to all the environment variables**.

```bash
PATH=/usr/bin:/bin
LANG=es_MX.UTF-8
HOME=/home/usuario
LANGUAGE=es_MX:es
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
SHELL=/bin/sh
LOGNAME=usuario
PWD=/home/usuario
```

Notice how the default shell is */bin/sh* instead of */bin/bash*.

Why is this important? Because sometimes we schedule tasks that require environment variables in order to run correctly, and if crontab can't access them, it will fail to run them. Again, **remember that crontab does not have access to all environment variables by default**.

## The Crontab runtime environment

The crontab runtime environment is a minimal environment, where most of the programs, settings and other customizations we have configured will be absent, so it is important that you don't take for granted that certain commands will be there. 

For example, simply changing the terminal from */bin/sh* to */bin/bash* already deprives us of using tools like *source*. Probably if you are using Python virtual environments or other customization you will have to specify it directly.

### How to set environment variables in crontab

To use environment variables it is necessary to load them manually, concatenating the command that loads them with the command we want to run.

``` bash
* * * * * . ./app/.env; script.py
```

Two important things to remember here:
- Cron runs processes from root, so make sure to use the absolute path.
- Because cron uses */bin/sh*, you don't have commands available in bash, like *source*, so to load environmental variables use a dot ".".

You can also load them from your *.profile* in your home directory.

## How to emulate cron's environment

Sometimes we want to debug why certain script is not executing the way we want. To do so, I found the [following solution on stackoverflow](https://stackoverflow.com/questions/2135478/how-to-simulate-the-environment-cron-executes-a-script-with#?)

``` bash
* * * * * env > ~/cronenv
```

Wait just one second for it to execute, and then start experimenting in this new shell.

``` bash
env - `cat ~/cronenv` /bin/sh
```

## Crontab Guru, a very useful tool

As you have already noticed, sometimes the configuration can get too complicated and if we don't do it right there can be consequences; simple, such as our script changing wallpaper every minute instead of every hour; or serious, such as our backup not being performed as often as desired. Imagine that, without wanting to, you scheduled the database backup once a year instead of once every twenty-four hours, you are going to have a hard time if the database fails.

To avoid annoyances there is a useful tool called [crontab.guru](https://crontab.guru#?). This tool will take care of translating your configuration into simple, easy to understand English. If you have doubts about whether the configuration you just typed is really the right one, you can type it into the web page and it will show you the result in English.

{{< figure src="images/crontab_guru.gif" class="md-local-image" alt="Screenshot of crontab guru"  width="1089" height="909" >}}

If you want to apply cron and crontab, I have a post where I use them to [change wallpaper automatically using Python.](/en/python/how-to-program-an-automatic-wallpaper-changer-in-python/)