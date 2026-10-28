---
aliases:
- /best-practices-and-design-of-a-rest-api
- /en/rest-api-best-practices-and-design/
- /en/software-architecture/rest-api-best-practices-and-design/
authors:
- Eduardo Zepeda
categories:
- software architecture
- opinion
coverImage: images/buenDisenoAPIREST.jpg
date: '2022-04-28'
seo_title: "Stop Writing Flaky APIs: REST Best Practices for Robust Design"
description: Complete guide to REST API design, endpoints, versioning, throttling,
  resource nesting and best practices for scalable APIs.
keywords:
- software architecture
- opinion
- REST
- api
title: 'REST API Best Practices: A Guide Based On Many Books'
---

How do I design a REST API? How many levels should I nest related resources? Relative or full URLs? 

This post compiles recommendations for REST API design from books and articles I've read. Sources are at the end if you want to go deeper.

Before starting, check out [basic features of a REST API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) from a previous post if you need context. Here, I'll focus on more subjective aspects of REST API design.

A REST API can return other formats, not just JSON, but I'll use JSON for examples since it's common. 

First question: how to structure JSON responses?

## Structure for JSON responses

There are different ways to structure a REST API response. No single approach is correct - it depends on your team's preferences and your application's needs. The key is consistency across all responses.

### JSON:API

[JSON:API](https://jsonapi.org/) standardizes JSON responses for single and multiple resources. You can use it as a reference for uniform responses.

```json
{
    "products": [{
        "id": 1,
        "title": "title"
    }]
}
```

### Twitter style API

An individual resource response looks like this:

```json
{
  "id":1,
  "title":"title"
}
```

For multiple resources, Twitter returns an array:

{{<adsPanels>}}

{{<ad0>}}

```json
[
  {
    "id":1,
    "title":"title"
  },
  {
    "id":2,
    "title":"title"
  }
]
```

### Facebook style API

Individual resources look the same as Twitter:

```json
{
    "id": 1,
    "title": "title"
}
```

Multiple resources go in a `data` array:

```json
{
  "data":[
    {
      "id": 1,
      "title": "title"
    },
    {
      "id": 2,
      "title": "title"
    }
  ]
}
```

There's no single "correct" approach among these options. As long as you stay consistent across endpoints and document your structure well, any of them works.

{{<ad1>}}

## Relative or full URLs in HATEOAS?

[HATEOAS]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) allows clients to navigate APIs through links. There's no official consensus on whether to use relative or full URLs - debates persist on Stack Overflow. Microsoft uses full URLs in its responses, so that's worth considering when designing your API.

```bash
{"rel":"self",
    "href":"https://adventure-works.com/customers/2"}
```

## Objects nested in the response

{{<ad2>}}

APIs often return resources related by one-to-one, one-to-many, or many-to-many relationships. The question is whether to include related objects in the response (increasing size) or just their identifiers (requiring additional requests).

### Identifiers in the response

Return only IDs for related resources and fetch them separately. This works well for large or rarely accessed data.

```json
{
    "posts": [{
        "id": 1,
        "title": "title",
        "comments": [2,3,4]
    }]
}
```

This can lead to n+1 queries if not handled well - each post might trigger separate queries for comments. Optimize by fetching related data in a single query.

{{<ad3>}}

```json
GET /comments/2,3
```

### Resources in the response

Include related objects directly in the response to avoid extra requests. This makes responses larger and takes more processing time, but can reduce total requests.

```json
{
    "posts":[
      {
        "id":1,
        "title":"title",
        "comments":[
          {
            "id":2,
            "text":"..."
          },
          {
            "id":3,
            "text":"..."
          },
          {
            "id":4,
            "text":"..."
          }
        ]
      }
    ]
  }
```

For flexibility, add an option like `embed` to include related resources only when requested:

```bash
GET /posts/1?embed=comments
```

## Pagination in APIs

As noted in [how to scale a Django app]({{< ref path="/posts/software-architecture/como-mejorar-el-rendimiento-de-una-aplicacion-hecha-en-django/index.md" lang="en" >}}), don't return entire datasets in one request. For large databases, paginate results with a fixed number of items per page.

Include pagination details in your response:

* Total number of items
* Items per page
* Total number of pages
* Current page
* URL to previous page (if any)
* URL to next page (if any)

```json
{
    "data": [
         {}
    ],
    "pagination": {
        "total": 60,
        "items_per_page": 12,
        "current_page": 1,
        "total_pages": 5,
        "next_url": "https://api.example.com/items?page=2",
    }
}
```

## API Versioning

APIs change over time as business needs evolve. Versioning helps consumers adapt to those changes.

### Should I version my API?

Usually yes. If your API is simple, extremely stable, or changes only by adding new endpoints without modifying existing ones, you might skip versioning. When in doubt, version it.

### Where to version the API?

While strict [REST architecture requirements]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) don't mandate a specific versioning approach, many companies use one of the following options regardless of strict REST compliance:

### URL level

Most common. Simple to understand and implement, but updating can be difficult for clients storing URLs in databases, and separating across servers is harder. Technically, putting the version in the URL is not REST.

Examples: Twitter, Dropbox, YouTube, Etsy.

```bash
http://dominio.com/api/v1/
```

### Domain level

Simple to understand and implement, but poses similar issues for clients storing URLs. Also not strictly REST.

Examples: some services use subdomains like `apiv1.example.com`.

```bash
http://apiv1.dominio.com
```

### URL or body parameters

Keeps the same URL; only parameters change. This can cause issues for clients storing URLs and parameters. Technically not REST.

Examples: Google Data, PayPal.

```bash
http://example.com/resource?version=1
```

In the request body:

```bash
POST /places HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
    "version" : "1.0"
}
```

### HTTP headers

Keeps URLs the same, but can confuse caching systems. Add a `Vary: ApiVersion` header so [caching systems](/en/django/caching-in-django-rest-framework-using-memcached/) don't store different versions under the same URL.

Example: Azure.

```bash
GET /resources HTTP/1.1
Host: example.com
ApiVersion: 1.0
Vary: ApiVersion
```

### Content negotiation

Uses HTTP's content negotiation mechanism (like for formats) to specify versions. This complies with REST since resources and their representations are separate concepts. It can be confusing for developers unfamiliar with HTTP headers.

Examples: GitHub, Adidas.

```bash
application/vnd.github[.version].param[+json]
```

## How much nesting of API resources?

For SEO, a hierarchical structure can help, but deep nesting gets unwieldy quickly:

```bash
# Avoid deep nesting
/clients/99/orders/88/products/77/variants
```

[DRF](https://www.django-rest-framework.org/api-guide/relations/#example_2), the [White House API standards](https://github.com/WhiteHouse/api-standards), and [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) all recommend keeping URIs simple.

A good rule of thumb: limit nesting to one or two levels. For deeper relationships, access resources directly by ID:

```bash
# Instead of going through the full hierarchy
/orders/88/products/77
```

This keeps URLs shorter and easier to read, even without the parent hierarchy in the path.

## Notify about API updates

When making breaking changes to your API, notify consumers in advance to avoid issues.

According to [Two Scoops of Django](/en/django/the-best-django-book-two-scoops-of-django-review/):

* Notify users as early and repeatedly as possible via email, blog posts, or other channels.
* When deprecating an endpoint, return an HTTP 410 (Gone) error with a message that includes links to the new endpoint, updated documentation, and if available, an explanation of the changes.

## Limit your API through a throttling policy

Limit requests to prevent abuse, reduce server load, and control costs. Set a [throttling policy]({{< ref path="/posts/software-architecture/como-limitar-peticiones-con-throttling-en-nginx/index.md" lang="en" >}}) on your server for all users.

You can also offer payment plans based on the number of requests per minute as part of your API's business model.

## Special characters in the URI

Use only valid characters in your URI. According to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3):

* Unreserved characters [0-9a-zA-Z - . _ ~]: no encoding needed
* Reserved characters [: / ? # [ ] @ ! $ & ' ( ) * + , ; =]: encode only if not used for their intended purpose (e.g., a slash not separating paths)
* Other characters: encode them
* Unsafe characters [< > % { } | \ ^ `]: encode them

Standards are evolving to support more international characters. See [W3C's article on IDN and IRI](https://www.w3.org/International/articles/idn-and-iri/) for more details.

## Consider SEO in your URLs

If search engine ranking matters, include descriptive text in your URLs rather than just IDs.

```bash
/posts/post-title ✅
/posts/99-post-title ✅
/posts/99 ❌
```

SEO and URLs is a broad topic, but this should point you in the right direction.

I hope this post was useful or introduced you to ideas you hadn't considered when designing an API.

## Reference sources

* [JSON:API Documentation](https://jsonapi.org/)
* [IRI y URI](https://www.w3.org/International/articles/idn-and-iri/)
* [Whitehouse's API standard](https://github.com/WhiteHouse/api-standards)
* [Best Practices API design from Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
* [Sturgeon, P. (2015). _Build Api’s_. Philip J. Sturgeon.](https://www.amazon.com.mx/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&amp;crid=2W0ZTSCO349YL&amp;keywords=build+apis&amp;qid=1648756000&amp;sprefix=build+apis%2Caps%2C187&amp;sr=8-1#?)
* [Massé, M. (2012). REST API design rulebook. Sebastopol, CA: O'Reilly.](https://www.amazon.com.mx/Rest-API-Design-Rulebook-Consistent/dp/1449310508#?)
* [Two scoops of django](https://www.feldroy.com/books/two-scoops-of-django-3-x)