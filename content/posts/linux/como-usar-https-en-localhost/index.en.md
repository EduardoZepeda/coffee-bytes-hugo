---
aliases:
- /en/the-easiest-way-to-use-https-in-localhost/
authors:
- Eduardo Zepeda
categories:
- linux
- go
coverImage: images/how-to-use-https-in-localhost.jpg
date: '2025-02-26'
description: Run a local server using https instead of http in your localhost machine
  using a reverse proxy and caddy in a few steps, useful for Oauth integrations or
  third party apps that require a secure connection
keyword: https on localhost
keywords:
- https
- localhost
- caddy
- nginx
- linux
- golang
- go
title: The Easiest Way To Use Https In Localhost
---

How to use Localhost using https instead of http, fast and without having to issue certificates manually nor dealing with netstat?

## Why to use https on localhost instead of http?

It is quite common to perform Oauth testing while performing integrations or some kind of integration with a third party application, the problem is that some third party providers are quite restrictive in this regard, they do not accept integrations or callbacks to URLs that do not use https. 

This is the case for apps on X (formerly Twitter) or Facebook developer platforms. ~~Zuckerberg!~~

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1739482326/facebook-developer-app-https-callback_hmhesu.png" class="md-local-image" alt="Facebook developer portal callback needs https" caption="Facebook developer portal callback needs https" >}}

There are several ways of dealing with this, one of them is to sign our own certificates manually, but let's skip that and do it the quick and easy way.

{{<ad>}}

## Running https on localhost with Caddy

[Caddy](https://github.com/caddyserver/caddy#?) is a server written in [Go programming language]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}), known to be easy peasy to configure (Unlike [configuring Nginx](/en/linux/nginx-keepalive-gzip-http2-better-performance-on-your-website/)), and it also includes *https* by default.


It is so simple to set up that it only requires a simple file called Caddyfile, with no extension. You can think of the latter as the equivalent of a [Dockerfile in Docker](/en/docker/how-to-write-a-docker-file-from-scratch/).

Install it following the instructions according to your OS and create the *Caddyfile*.

``` bash
your-sub-domain.localhost {
    reverse_proxy http://localhost:5000
}

```

The sub-domain part is just to be able to isolate your app from the rest of the applications serving on localhost. 

The above configuration will create a reverse proxy that will redirect traffic on *your-sub-domain.localhost* to port 5000 of your localhost. Remember to replace the port with the port of your choice.

``` mermaid
graph TD;
    your-sub-domain.localhost-->http:localhost:5000;
```

Finally just run *caddy run*, or *caddy start* if you want a process running in terminal or detached run, respectively, in the directory where the *Caddyfile* is located and caddy will create a *reverse proxy* to your localhost on the port you specified and we'll be running https on localhost as intended.

### Solution 1 to error: Caddy “listen tcp :<port_number>: bind: permission denied”.

If you get a permission denied error while trying to run caddy, it is because Linux prevents non-root processes from listening on major ports such as 443 or 80.

To allow caddy to listen on those ports and allow [linux to assign the required permissions](/en/linux/understand-permissions-in-gnu-linux-and-the-chmod-command/), run the following command.


``` bash
sudo setcap CAP_NET_BIND_SERVICE=+eip $(which caddy)
```

### Solution 2 to error: Caddy “listen tcp :<port_number>: bind: permission denied”.

Another posibility is that caddy was already running, if you install it could run as a service, to which you have to stop it and execute it again.

``` bash
caddy stop
caddy start
```

Afterwards you should be able to access your-sub-domain.localhost or your-sub-domain.localhost:443 via *https* in your browser, [the curl command](/en/linux/linux-basic-commands-lsof-top-ps-kill-systemctl-chown-chroot/) or whatever tool you prefer to use.