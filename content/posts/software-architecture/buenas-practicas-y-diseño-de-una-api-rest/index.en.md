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

How to design a REST API? How many levels to nest resources? Relative or full URLs?

This post compiles REST API design recommendations from books and articles. Sources are at the end.

Check [basic features of a REST API]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) for context. I'll focus on design choices here.

A REST API can return other formats, but I'll use JSON for examples since it's common.

Start with JSON response structure.

## JSON response structure

No single structure is correct. Pick one and stay consistent across your API.

### JSON:API

[JSON:API](https://jsonapi.org/) standardizes responses for single and multiple resources.

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

Any of these works as long as you're consistent and document the structure.

{{<ad1>}}

## Relative or full URLs in HATEOAS?

[HATEOAS]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}) lets clients navigate via links. There's no consensus on relative vs full URLs. Microsoft uses full URLs, which is worth considering.

```bash
{"rel":"self",
    "href":"https://adventure-works.com/customers/2"}
```

## Nested objects in responses

{{<ad2>}}

When returning related resources (one-to-one, one-to-many, many-to-many), you can either include them or just return IDs.

### Return IDs

Return only IDs and let clients fetch related resources separately. Good for large or rarely used data.

```json
{
    "posts": [{
        "id": 1,
        "title": "title",
        "comments": [2,3,4]
    }]
}
```

Watch out for n+1 queries - fetch related data in batch when possible.

{{<ad3>}}

```json
GET /comments/2,3
```

### Return full objects

Include related objects in the response to avoid extra requests. Larger responses but fewer round trips.

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

For flexibility, allow clients to request embeds:

```bash
GET /posts/1?embed=comments
```

## Pagination

Don't return entire datasets. For large collections, paginate with a fixed page size.

Include in your response:
- Total items
- Items per page
- Total pages
- Current page
- Previous page URL (if any)
- Next page URL (if any)

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

## API versioning

APIs change over time. Versioning helps consumers adapt.

Version unless your API is extremely simple and stable, or changes only by adding new endpoints without modifying existing ones. When in doubt, version it.

Options (not all strictly RESTful):

### URL
Most common. Simple, but hard to update for clients storing URLs and harder to split across servers. Not strictly REST.

```bash
http://example.com/api/v1/
```

### Domain
Use a versioned subdomain. Similar drawbacks. Not strictly REST.

```bash
http://apiv1.example.com
```

### URL or body parameters
Keep the same URL, change a parameter. Not strictly REST.

```bash
http://example.com/resource?version=1
```

```bash
POST /places HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
    "version": "1.0"
}
```

### HTTP headers
Keep URLs the same, but caching can be tricky. Add `Vary: ApiVersion` to avoid cache issues.

```bash
GET /resources HTTP/1.1
Host: example.com
ApiVersion: 1.0
Vary: ApiVersion
```

### Content negotiation
Uses `Accept` header like format negotiation. REST-compliant since resources and representations are separate. Can confuse developers unfamiliar with HTTP.

```bash
Accept: application/vnd.github.v3+json
```

## Resource nesting

Deep nesting gets unwieldy. Avoid it:

```bash
# Avoid
/clients/99/orders/88/products/77/variants
```

Limit to one or two levels. For deeper relationships, reference by ID directly:

```bash
# Better
/orders/88/products/77
```

[DRF](https://www.django-rest-framework.org/api-guide/relations/#example_2), [White House API standards](https://github.com/WhiteHouse/api-standards), and [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) all recommend keeping URIs simple. Hierarchical URLs can help SEO in some cases, but readability matters more for APIs.

## Notifying about API changes

For breaking changes, notify users early and often (email, blog, etc.).

When deprecating an endpoint, return HTTP 410 (Gone) with a message linking to the new endpoint, updated docs, and an explanation if available.

## Throttling

Limit requests to prevent abuse, reduce load, and control costs. Add a [throttling policy]({{< ref path="/posts/software-architecture/como-limitar-peticiones-con-throttling-en-nginx/index.md" lang="en" >}}) for all users. You can also tie limits to paid plans.

## URI characters

Follow [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3):

- Unreserved [0-9a-zA-Z - . _ ~]: no encoding
- Reserved [: / ? # [ ] @ ! $ & ' ( ) * + , ; =]: encode if used for other than intended purpose
- Others: encode
- Unsafe [< > % { } | \ ^ `]: encode

Standards evolve for international characters. See [W3C's IDN and IRI article](https://www.w3.org/International/articles/idn-and-iri/).

## SEO in URLs

If search ranking matters, include descriptive text in URLs:

```bash
/posts/post-title ✅
/posts/99-post-title ✅
/posts/99 ❌
```

I hope this was useful.

## Reference sources

* [JSON:API Documentation](https://jsonapi.org/)
* [IRI y URI](https://www.w3.org/International/articles/idn-and-iri/)
* [Whitehouse's API standard](https://github.com/WhiteHouse/api-standards)
* [Best Practices API design from Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
* [Sturgeon, P. (2015). _Build Api’s_. Philip J. Sturgeon.](https://www.amazon.com.mx/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&amp;crid=2W0ZTSCO349YL&amp;keywords=build+apis&amp;qid=1648756000&amp;sprefix=build+apis%2Caps%2C187&amp;sr=8-1#?)
* [Massé, M. (2012). REST API design rulebook. Sebastopol, CA: O'Reilly.](https://www.amazon.com.mx/Rest-API-Design-Rulebook-Consistent/dp/1449310508#?)
* [Two scoops of django](https://www.feldroy.com/books/two-scoops-of-django-3-x)