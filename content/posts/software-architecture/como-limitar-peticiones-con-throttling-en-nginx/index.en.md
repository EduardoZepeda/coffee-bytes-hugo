---
aliases:
- /en/throttling-on-nginx/
authors:
- Eduardo Zepeda
categories:
- software architecture
- linux
coverImage: images/throttling_ngnix.jpg
coverImagecredits: Credits to https://www.pexels.com/@amateur-photo-1700447
date: '2021-03-13'
description: Learn how to use Throttling in Nginx to limit the number of requests
  in your application, mitigating DDOS or brute force attacks.
keywords:
- nginx
- performance
- linux
title: Throttling on Nginx
---

{{<ad0>}}

Ngnix throttling allows us to limit the number of requests to a certain user. This is useful to prevent excessive requests from a user from keeping the system busy. On the other hand, it is also a way to deter brute force password attempts or even DDOS attacks.

If you are looking to optimize the performance of an application using Nginx I have a post where I give you some [recommendations to improve nginx performance](/en/linux/nginx-keepalive-gzip-http2-better-performance-on-your-website/)

## The bucket algorithm

Nginx will handle throttling as if it were a bucket with holes in it: the water that goes into the bucket comes out the bottom. If we increase the flow and the bucket fills faster than it flows out of the holes the bucket will overflow.

{{< figure src="images/cubeta_-1.jpg" class="md-local-image" alt="A bucket dripping illustration" >}}

The water that enters first through the bucket exits first (FIFO). If the flow is sufficient, the bucket overflows.

In the above example, the requests represent the water; any excessive increase in requests will overflow and be lost. Requests that were already in the bucket will leave the bucket first, i.e., they will be processed as they arrive (a FIFO queue).

{{<ad1>}}

## limit_req_zone sets throttling values

Let's open our configuration file for our website. If you use the default configuration it is in _/etc/nginx/sites-enabled/default_ and we will place the following:

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
```

limit_req_zone will set the parameters that the throttling will have:

{{<ad2>}}

* $binary_remote_addr stores the IP address in binary. We can replace it by $remote_addr at a cost of more memory space per IP.
* zone sets the name of the space where our IPs will be stored and its capacity, in 1MB we can fit approximately 16 000 IPs.
* Rate tells us how many requests, "r", we will allow, in this case per second.

### limit_req is placed in the block to be protected

Just because we have set these values does not mean that they will be applied, we must tell Nginx in which block they will be applied.

limit_req tells nginx the block on which throttling values will be applied, in this case _/login/_, to prevent brute force password guessing attempts.

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    location /login/ {
        limit_req zone=mylimit;

        proxy_pass http://my_upstream;
    }
}
```

{{<ad3>}}

And that's it, now Nginx will have a limit of 10 requests per second for the /login/ address.

That's all well and good, but if we make a request and in less than 100 ms we make a second request we would notice that Nginx returns a 503 error, but why, aren't we within the limit of 10 requests per second? The second request has not yet elapsed and there are only 2 requests. Well, yes, but Nginx measures its rates in milliseconds, so our real rate is not 10 r/s.

### Rate measured in milliseconds

In our example we set the maximum limit to be 10 requests per second, but Nginx measures using milliseconds (ms), so our actual rate is 1r/100ms, i.e. one request every 100 ms.

### Burst

But what if two requests are placed effectively in less than 100 ms? That's right, the second would be lost and this may not be what we want, sometimes applications make requests within a few milliseconds of each other. The Burst option takes care of mitigating our strict Throttling policy a bit:

```nginx
location /login/ {
    limit_req zone=mylimit burst=20;

    proxy_pass http://my_upstream;
}
```

What exactly does burst do? **Burst sets the size of a queue. Any request made within 100 ms will be placed in this queue, in this case with a size of 20 requests. Our queue will dispatch a request every 100 ms. Any request that arrives when the queue is full (greater than 20) will be discarded.

But, now we are in another predicament, imagine a queue at the limit of its capacity, with 20 requests. The penultimate value will have to wait 1.8 seconds before being dispatched, while the last one will take 2.0 seconds. That's a lot!

### Nodelay

With the nodelay parameter, Nginx marks as "busy" the queue slots we defined in burst, but does not wait 100 ms to dispatch each one, but dispatches them as fast as it can and then releases the queue slots at a rate of 100 ms. So now the last items in the queue will not wait for seconds to elapse before being processed, but will be processed immediately, still preserving the request limit.

```nginx
location /login/ {
    limit_req zone=mylimit burst=20 nodelay;

    proxy_pass http://my_upstream;
}
```

This post is based on [the official Nginx Throttling documentation](https://www.nginx.com/blog/rate-limiting-nginx/). If you want to learn more about this topic visit the official documentation.