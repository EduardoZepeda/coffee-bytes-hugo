---
aliases:
- /en/nginx-keepalive-gzip-http2-best-performance-on-your-web-site/
- /en/nginx-keepalive-gzip-http2-better-performance-on-your-website/
authors:
- Eduardo Zepeda
categories:
- linux
coverImage: images/tutorialNginx-1.jpg
date: '2020-11-07'
description: Optimize your website and make it faster by enabling http2, gzip compression,
  cache and modifying the keepalive value in nginx.
keywords:
- nginx
- performance
- linux
title: 'Nginx keepalive, gzip, http2: better performance on your website'
---

Some months ago I was reviewing the Lighthouse settings for a website when I realized that it did not comply with certain recommendations, it was using http/1.1, no gzip compression, no cache. Later I fixed the problems, I'll tell you how below. In this post I talk about the following nginx features: keepalive, gzip, cache and http2 and how you can modify them to improve your [Lighthouse](https://web.dev/#?) values.

## Activate http2 in nginx

As surprising as it may sound, many servers do not enable HTTP/2 by default, so if this is your case, you can enable it for better performance. The HTTP/2 protocol is more efficient than HTTP/1, so you get better indicators using it.

First we go to the file where we have enabled our website in nginx:

```bash
sudo vim /etc/nginx/sites-enabled/mi-sitio
```

Once in the file we are going to add http2 to the end of our _listen_ directive, in this case on port 443, for HTTPS. If you serve your content without using HTTPS you can add it to port 80.

```bash
# /etc/nginx/sites-enabled/mi-sitio
server { 
    listen 443 ssl http2; 
    listen [::]:443 ssl http2;
    # ...
}
```

Remember that **after each change we make it will be necessary to reload nginx** to adopt the new values.

```bash
sudo systemctl reload nginx
```

If we now make a request to our website we can check if our content is being served with the HTTP/2 protocol.

```bash
curl https://tu-sitio-web.com -i
# ...
HTTP/2 200 
server: nginx
# ...
```

{{<ad>}}

## Enable gzip compression in nginx

The gzip compression allows us to reduce the size of the resources we send, it is not usually enabled by default.

To enable it we are going to modify the nginx configuration file. Remember that you can also enable them individually within the http directive on each website, but for this case we will place the cache universally.

```bash
vim /etc/nginx/nginx.conf
```

If we go to the Gzip section we will see several commented values.

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

Among the values discussed are the minimum length to compress, the compression level, whether we want to apply compression for proxy requests, the MIME types that will receive compression and other options.

Let's break them all down. We will also add a few MIME types to the _gzip_types_ option.

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

Remember that you can query all available MIME types in a friendly way by doing a [bat](/en/linux/get-to-know-bat-in-linux-the-syntax-highlighting-cat/) or a cat to the following file:

```bash
sudo bat /etc/nginx/mime.types
```

Now you only need to place the ones you consider suitable for your application. Remember also that **using compression makes the transfer to the user lighter but increases the server load when compressing**, so you have to evaluate what is convenient to compress and what is not.

If you do a _curl_ to any of the resources for which you enabled compression with the "Accept-Encoding: gzip" header you will see that the response will be compressed. Remember to reload the server for the changes to take effect.

```bash
curl -H "Accept-Encoding: gzip" https://tu-sitio-web.com
# ...
x-frame-options: DENY
x-content-type-options: nosniff
content-encoding: gzip
```

## Nginx keepalive

The nginx configuration value, keepalive_timeout, tells the server **how long to keep the TCP connection active for multiple HTTP responses**.

Over simplifying this concept, we can find a similarity between a TCP connection and a telephone call. Let's imagine two scenarios:

The first scenario is as follows: you are asked to take care of your nieces and nephews and your worried siblings need you to confirm in a loud voice, every two hours, that everything is fine. It wouldn't make sense to make a phone call and keep calling all night just to tell them "everything is fine" every two hours, it's better to hang up and repeat the call after that time. This way we do not keep the line busy. In other words, the best thing to do is to call, confirm that everything is fine and hang up.

The second scenario goes like this: you are talking to your best friend, you have a lot of things to tell her, so you call her, the call lasts a long time and, the whole time you are exchanging messages, one after the other. It wouldn't make sense to hang up and call between each exchange of messages, it's better to keep her until you've told her (and she you) everything you have to tell her.

The value of nginx keepalive will be the duration of this call, in the first scenario it is short, in the second scenario long, which is better? that value is up to you to decide, based on the behavior of your users, the default value is 75, I will use a 65.

```bash
# /etc/nginx/nginx.conf
keepalive_timeout 65;
```

## Cache in Nginx

Using cache can greatly improve the performance of your server. To enable cache just **add the word _expires_**, followed by the duration to the resources you want to cache.

```bash
location /static/ {
    root /app/static/;
    expires 30d; # También hubiera funcionado 1M
```

I have placed 30 days, but you can use any other value you prefer.

| Abbr | Meaning         |
| ---- | --------------- |
| ms   | miliseconds     |
| s    | seconds         |
| m    | minutes         |
| h    | hours           |
| d    | days            |
| w    | weeks           |
| M    | months, 30 days |
| y    | years, 365 days |


Information taken from official documentation http://nginx.org/en/docs/syntax.html

If you make a web request to the path being cached you should receive a cache-control header with the time in seconds you specified (In my case 2592000 seconds, which is 30 days). Make sure you reload the server.

```bash
curl -I https://tu-sitio-web.com/static/imagen.jpg
cache-control: max-age=2592000
```

## Creating an upstream cache

First let's create the path where the cache will be stored, in this case we go directly to the path */var/cache/*, but it could be anywhere else.

``` bash
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=cache:10m inactive=60m;
```

The *inactive* argument of proxy_cache_path sets the time the response will be stored in the cache after its last use.  

And now let's add the necessary headers so that the browser understands that it has to store the response.

Using the *proxy_cache_valid* directive we give a validity to the response, before that time elapses, the response will still be considered valid and will be returned without querying the backend.

It is important to note that *proxy_cache_path* must have an idle time greater than the expiration time of the requests (proxy_cache_valid).


``` bash
location /url {
    # ...
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_cache cache;
    proxy_cache_valid any 2h; # 200 instead of any is also valid
    add_header X-Proxy-Cache $upstream_cache_status;
}
```

## Implement Throttling in Nginx

If there are some clients that make a lot of requests, keeping your server busy and affecting the rest of the users, you can implement Throttling to limit their impact. If you want to know more about it, I have a post where I talk about [Throttling in Nginx](/en/software architecture/throttling-on-nginx/).

```bash
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=5r/s;

server {
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;

        proxy_pass http://my_upstream;
    }
}
```

## Use nginx load balancer

Nginx has a load balancer that allows you to distribute the load of your server among different endpoints. The simplest mechanism will use the round robin method, which will allow you to handle more requests.

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

In the above example, the first request will be passed to port 3000, the second to port 3001 and the third to port 3002, the fourth will return to port 3000 and so on.