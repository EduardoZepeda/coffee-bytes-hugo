---
title: "Don't use JWT to manage sessions (Translation)"
date: "2021-06-22"
draft: true
categories:
- "software architecture"
- "opinions"

coverImage: "images/NoUsesJWT.jpg"
coverImageCredits: "credits https://www.pexels.com/es-es/@gabby-k/"
description: "Translation of the article Stop using JWT for sessions. It lays out the reasons why it's a bad idea to use JWT for session management."
keywords:
- jwt
- javascript
- software architecture
- opinion

authors:
- Eduardo Zepeda
---

In the previous post I published a post about how to perform [authentication using JWT and Django Rest Framework](/django-rest-framework-and-jwt-to-authenticate-users/), because it is a quite popular session management mechanism lately, some even consider it a replacement for session cookies. In my post I mentioned that there is a very intense debate on whether using JWT to manage sessions is a good practice, to complement the above I decided to translate one of the most popular articles advocating against the use of JWT to manage sessions. The author is Sven [Slootweg (joepie91)](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/) and the article was published on his blog. I just translated it into Spanish and share it here. From the next paragraph begins the translation of the article, enjoy.

## Stop using JWT for sessions (in Spanish)

Unfortunately, lately I've seen more and more people recommend using JWT ([JSON Web tokens](https://es.wikipedia.org/wiki/JSON_Web_Token)) to manage user sessions in their web applications. This is a terrible, terrible idea, and in this post, I'm going to explain why.

To prevent any confusion, I will define a few terms first:

* JWT Stateless:** A JWT token that contains the session information, stored directly in the token.
* Stateful JWT:** A JWT token that contains only a reference or session ID. The session information is stored server-side.
* Session token/cookie:** A standard (optionally signed) session ID, such as those that web frameworks have been using for a long time. Session information is stored server-side.

To be clear: this article does not argue that you should never use JWT - only that it is not as suitable as a session mechanism and that it is dangerous to use it that way. Valid use cases exist, in other areas. At the end of this article, I will briefly discuss those other use cases.

## A note in advance

Many people try to compare "cookies vs JWT". This comparison is meaningless, and is comparing apples to oranges - cookies are a storage mechanism, while JWT tokens are cryptographically signed tokens.

They are not opposites - but can be used either together or independently. The correct comparison is "sessions vs JWT" and "cookies vs Local Storage".

In this particular article, I will be comparing sessions to JWT tokens, and occasionally "cookies vs Local Storage" as well, where it makes sense to do so.

## Attributed benefits of JWTs

When people recommend JWTs, they usually attribute one or more of the following benefits to them:

* Simple to scale (horizontally)
* Simple to use
* More flexible
* More secure
* Expiration functionality included
No need to ask the user for consent to use cookies * Prevent CSRF
* Prevent CSRF
* Work better on mobile
Works for users who block cookies * Works for users who block cookies

I will address each of these statements - and why they are wrong or misleading - individually. Some of the explanations you'll find below may be a bit vague; that's mainly because the claims, themselves, are vague. I'll happily update to address more specific claims; you can find my contact information at the bottom of this article.

### Simple to scale (horizontally)

This is the only statement in the list that is somewhat true, but only if you are using stateless JWT tokens. The reality, however, is that almost no one needs this kind of scalability - there are easier ways to scale, and unless you're operating at Reddit size, you won't need "stateless sessions".

Some examples of stateful session scaling:

1. Once you run multiple backend processes on a server: A Redis daemon (on that server) for session storage.
2. When you run multiple servers: A dedicated server running Redis only for session storage.
3. Once you run on multiple servers, on multiple clusters: persistent sessions.

These are scenarios that are covered by existing software. It is unlikely that your application will go beyond the second step.

Perhaps you're thinking that you should "future-proof your application", in case you ever scale beyond that. In practice, however, it's fairly trivial to replace the session mechanism at a later point, with the only cost being the cost of terminating each user's session once, when you transition. It is not worth implementing JWT beforehand, especially considering the disadvantages that I will discuss later.

### Simple to use

They really are not. You'll have to deal with session handling yourself, on both the client and server side, while standard session cookies work, by default. JWT is not easier in any way.

### More flexible

I'm still waiting for someone to explain how JWT is more flexible. Almost all session implementations allow you to store arbitrary information for the session, and it's no different than how JWT works. As far as I'm aware, this is just a catchy word. If you disagree, feel free to contact me with examples.

### Safer

Many people think that JWT tokens are "more secure" because they use cryptography. While signed cookies are more secure than unsigned cookies, this is by no means unique to JWT, plus good session management implementations use signed cookies as well.

"Using cryptography" doesn't magically make something more secure either; it must serve a specific purpose, and it can be an effective solution for that specific purpose. Cryptography used incorrectly can, in fact, make something less secure.

Another explanation for the "more secure" argument that I hear a lot, is that (JWTs) "are not sent as a cookie". This makes absolutely no sense - a cookie is just an HTTP header, and there is nothing insecure about using cookies. In fact, cookies are especially well protected against malicious server-side code, something I'll cover later.

If you are worried about someone intercepting your session cookie, you should be using [TLS](https://es.wikipedia.org/wiki/Seguridad_de_la_capa_de_transporte) instead - any kind of session implementation will be interceptable if you don't use TLS, including JWT.

### Expiration functionality included

This is nonsense, and not a useful feature. Expiration can be implemented server-side as well, and many implementations do so. Server-side expiration is preferable, in fact, it allows your application to clean up session information that is no longer needed, something you cannot do if you use stateful JWT tokens and rely on their expiration mechanism.

### Does not require asking the user for consent to use cookies.

Completely wrong. There is no such thing as a "cookie law" - The various laws involving cookies cover any kind of persistent identifier that is not strictly necessary for the operation of the service. Any session mechanism you can think of will be covered by this.

In summary:

* If you are using a session or token for functional purposes (e.g. keeping a user logged in), then you do not need to ask for the user's consent, regardless of how you store the session.
* If you are using a session or token for other purposes (e.g. analytics or tracking), then you need to ask for consent, regardless of how you store the session.

### Prevent CSRF

It doesn't really. There are two ways to store a JWT:

* In a cookie:** You are now vulnerable to CSRF attacks, and need protection against them.
* Anywhere else, e.g. Local Storage:** Now you are not vulnerable to CSRF attacks, but your application or site now requires Javascript to function, and you have become vulnerable to other, potentially worse and completely different, types of vulnerabilities. More on this below.

The only correct mitigation of CSRF attacks is a CSRF token. The session mechanism is not relevant here

### Work better on cell phones

Nonsense. Every mobile browser in use supports cookies, and therefore sessions. The same goes for every development framework, and any serious HTTP library. This is not a problem.

### Works for users who block cookies.

Unlikely. Users don't just block cookies, they typically block all means of persistence. Which includes Local Storage, and any other storage mechanism that would allow persistence of a session (with or without using JWT). Whether you use JWT simply doesn't matter here, it's a completely unrelated problem - and trying to get authentication to work without cookies is a lost cause.

In addition to the above, users who block all cookies typically understand that this will break authentication functionality for them, and individually unblock cookies for sites they care about. It's simply not a problem that you, as a web developer, need to solve; a better solution is to explain to your users why your site requires cookies to function.

## Disadvantages

Now that I've covered all the false claims and why they are wrong, you may think "oh, that's not a problem, it still doesn't matter that I use JWT even if it doesn't help me", and you would be wrong. There are some disadvantages to using JWT as a session mechanism, many of them are serious security issues.

### Use more space

JWT tokens are not exactly small. Especially when you use stateless JWT tokens, where all the information is encoded directly in the token, you will quickly exceed the size limit of a cookie or URL. You can decide to store them in the Local Storage instead - however...

### They are less secure

When you store your JWT in a cookie, it is no different than any other session identifier. But when you are storing your JWTs elsewhere, you are now vulnerable to a new class of attacks, described in [this article](http://blog.prevoty.com/does-jwt-put-your-web-app-at-risk) (specifically, in the section on "storing sessions"):

> We start where we left off: [...]  [...]  [...]  [...]  [...]
[...]
[...]  [...]  [...]  [...]
[...]
[...]  [...]
[...]
[...]

To put it simply, **using cookies is not optional**, regardless of whether you use JWT or not.

### You cannot override individual JWT tokens.

And there are more security issues. Unlike sessions - which can be invalidated by the server when required - individual stateless JWT tokens cannot be invalidated. By design, they will be valid until they expire, no matter what. Which means that you cannot, for example, invalidate an attacker's session after detecting a security flaw. Nor can you invalidate old sessions when the user changes their password.

You have no power, and you cannot "kill" a session without building an infrastructure (which must be stateful) to explicitly detect and reject it, completely defeating the entire purpose of using stateless JWT tokens.

### Information becomes obsolete

Related to the previous problem, and considered another potential security problem. Just as in the cache, the information in a stateless token will eventually "become obsolete", and will not reflect the latest information in your database.

This can mean that a token contains some outdated information such as an old URL that someone changed in their profile - but on a more serious note, it can also mean that someone has a token with the administrator role, even though you revoked their role as administrator. Because you can't override tokens either, there is no way for you to remove their administrator access, unless you shut down the entire system.

### Implementations are less tested or non-existent

You may think that all these problems occur only with stateless JWT tokens, and you would be right. However, using a stateful token is basically equivalent to a regular session cookie, but without the proven implementations.

Existing session implementations (e.g., [express-session](https://github.com/expressjs/session) in Express) have been running in production for many, many years, and their security has been improved because of that. You don't get those benefits by using JWT tokens as makeshift session cookies - you'll either have to run your own implementation (and most likely introduce vulnerabilities in the process), or use a third-party implementation that hasn't seen much use in the real world.

## Conclusion

Stateless JWT tokens cannot be overridden or updated, and will introduce size or security issues depending on where you store them. Stateful JWT tokens are functionally the same as session cookies, but without testing and well-reviewed implementations or customer support.

Unless you work on an application at the scale of Reddit, there is no reason to use JWT tokens as a session mechanism. Use sessions only.

### So... what are JWTs good for?

At the beginning of this article, I told you that there were good use cases for JWTs, but they were not suitable as a session mechanism. This is true; the use cases where JWTs are particularly effective are typically the use cases where they are used as a single-use authorization token.

From the [JSON Web Token] specification(https://tools.ietf.org/html/rfc7519):

> JSON Web Token (JWT) is a compact, url-proof way of representing a request that is exchanged between two parties [...] allowing requests to be digitally signed or their integrity protected with a Message Authentication Code (MAC) and/or encrypted.
>
> https://tools.ietf.org/html/rfc7519

In this context, "request" can be something like an "application", or a one-time authorization, or basically any other scenario you can name it as:

> Hello server B, server A told me that I can <request goes here>, and here is the (cryptographic) signature as proof.

For example, you may be running a file hosting service where the user has to authenticate to download their files, but the files are being served by an external stateless download server. In this case, you may want your application server (Server A) to issue a single-use "download token", which the client can use to download the file from the download server (Server B).

When you use JWT in this way, there are a few specific properties

* Tokens are short-lived**. They only need to be valid for a few minutes, to allow the client to initiate your download.
* The token is expected to be used only once**. The application server would issue a new token for each download, so that each individual token is used to request one file at a time, and then discarded. There is no persistent state.
* It is only the download server that uses tokens to authorize individual downloads, because it does not need persistent state.

As you can see here, it is entirely reasonable to combine sessions and JWT tokens - each has its own purpose, and sometimes you need both. Just don't use JWT for long-lived persistent data.

The original article is licensed using the license [WTFPL](http://cryto.net/~joepie91/blog/LICENSE.txt) you can distribute, use, modify, translate and license it in any way.