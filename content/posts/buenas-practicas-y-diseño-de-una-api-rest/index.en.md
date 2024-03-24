---
title: "REST API: Best practices and design"
date: "2022-04-28"
categories:
- "software architecture"
- "opinions"

coverImage: "images/buenDisenoAPIREST.jpg"
description: "Good practices for designing a REST API, how to version it, update it and nest resources in URIs."
keywords:
- software architecture
- opinion
- REST
- api

authors:
- Eduardo Zepeda
---

How do I design a REST API? How many levels should I nest my related resources? Relative or full URLs? This post is a compilation of some recommendations about some good REST API design practices that I have found in books and articles on the internet. I leave the sources at the end of the article in case you are interested in going deeper or see where this information comes from.

Before we get started, there are a number of [basic features of a REST API](/en/rest-api-basic-characteristics-and-recommendations/), which I laid out in a previous post, check them out if you have questions. In this post I'm going to talk a bit about some more subjective aspects related to REST API design.

Remember that a REST API can return other formats, not just JSON, but I'm going to focus on this one for the examples because it's quite popular.

I'm going to start with a fairly common question: how do I structure my JSON response?

## Structure for JSON responses

There are different ways to structure the response of a REST API. There is no valid or invalid one, it depends on the taste of each team and the needs of the application. **The important thing here is to maintain consistency and homogeneity in all your responses.

### According to json:api

There is a [group of people who set out to standardize JSON responses](https://jsonapi.org/) into a single response style, either for returning single or multiple resources. You can take their style as a reference when designing their API to ensure uniformity of responses.

```json
{
    "products": [{
        "id": 1,
        "title": "titulo"
    }]
}
```

### Twitter style API

Twitter has its own way of doing things, the response from an individual resource looks like this:

```json
{
  "id":1,
  "title":"titulo"
}
```

For multiple resources, Twitter decided to include them within an array.

```json
[
  {
    "id":1,
    "title":"titulo"
  },
  {
    "id":2,
    "title":"titulo"
  }
]
```

### Facebook style API

On the other hand, on Facebook, the syntax for individual resources looks like this, just like Twitter:

```json
{
    "id": 1,
    "title": "titulo"
}
```

While an answer for multiple resources is like this:

```json
{
  "data":[
    {
      "id": 1,
      "title": "titulo"
    },
    {
      "id": 2,
      "title": "titulo"
    }
  ]
}
```

Who to listen to? As you can see there are differences between companies and I don't know if I would dare to tell you that one or the other is correct, but I consider that if you keep constant in each of your endpoints and document it well, you shouldn't have any problems.

## Relative or full URLs in HATEOAS?

Remember that HATEOAS is a [feature of REST APIs](/en/rest-api-basic-characteristics-and-recommendations/)? Well, from what I've researched, there's no clear consensus or official stance on whether it's better to include relative or full URLs. There is a lot of debate about it on stackoverflow, but microsoft uses full URLs in their responses, take it into account when designing your REST API.

```bash
{"rel":"self",
    "href":"https://adventure-works.com/customers/2"}
```

## Objects nested in the response

Generally an API does not return individual resources, but resources that are related to other resources at the database level by one-to-one, many-to-many or one-to-many relationships. The question here is: do we include them in the response even if this increases its size? do we put only the identifiers and download them afterwards? It depends.

### Identifiers in the response

This approach to the problem will require that if the user requires access to the information, it is downloaded at a later time. It is ideal for data that is rarely consulted or plentiful.

```json
{
    "posts": [{
        "id": 1,
        "title": "titulo",
        "comments": [2,3,4]
    }]
}
```

This can bring you the problem of n+1 queries if you don't handle it well; consider the example above, each request to a post implies a new request to the database to get each comment.

Of course that can be fixed by optimizing your searches so that, instead of getting them individually, you get them in a single query.

```json
GET /comments/2,3
```

### Resources in the response

It is also possible to directly add the related objects in a single response, to avoid having to download them later. This will make each response take a little longer, as the server will process more information, but it can save subsequent requests to the API.

```json
{
    "posts":[
      {
        "id":1,
        "title":"titulo",
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

If you want flexibility consider creating an endpoint where you can tell your API which resources you want to explicitly nest in the url, so that they are only integrated into the response if they are requested.

```bash
GET /posts/1?embed=comments
```

## Pagination in APIs

As I've already mentioned in previous posts when I talked about Django, for [application performance](/en/is-your-django-application-slow-maximize-its-performance-with-these-tips/) reasons, you don't always want to return the whole database to your users in each request. For large databases it is best to break the response into pages, with a limited number of items per page.

To facilitate the use of your API, consider adding pagination-related information in your response:

* The total number of items
* The number of elements per page
* The total number of pages
* The current page
A url to the previous page (if any) * A url to the next page (if any)
A url to the next page (if any) * A url to the next page (if any)

As well as any other information you consider relevant.

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

APIs are not static, they change with business needs, so they can change over time. It is important that the consumers of your API are aware of these changes, so versioning your API is an excellent idea.

### Should I version my API?

Generally you will want to version your API. However, if your API is extremely simple and its structure is extremely stable, or it works in such a way that changes are added as new endpoints, without modifying the old ones, you could leave it unversioned. If you have doubts about whether your API fits into the above, you should probably version it.

### Where to version the API?

For an API to adhere to the [REST architecture requirements](/en/rest-api-basic-characteristics-and-recommendations/) it must meet certain characteristics, but some companies choose to bypass these requirements for their APIs and still call them REST.

Here are some options for versioning your APIs used by large companies, regardless of whether they are REST compliant or not.

### At url level

Probably the most popular option of all.

Incredibly simple to understand and implement but will cause you problems with clients who store URLs in a database, because with every change you will have to update them. Also, it's hard to separate them on different servers. Technically, **putting the version in the url is not REST**.

Examples of companies: Twitter, dropbox, youtube, etsy.

```bash
http://dominio.com/api/v1/
```

### Domain level

Quite simple to understand and implement but will bring problems to those customers who store urls in database. Again, technically, **placing the version in the domain is not REST**.

Examples of companies: Twitter, dropbox, youtube, etsy.

```bash
http://apiv1.dominio.com
```

### By means of parameters in the url or in the body

It keeps the same url, only the parameters change. It brings problems with clients that save the urls and their parameters in the database. Technically **using parameters for API versioning is not REST**.

Examples of companies: Google data, Paypal.

```bash
http://apiv1.dominio.com/recurso?version=1
```

In the HTTP request body it would look like this:

```bash
POST /places HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
    "version" : "1.0"
}
```

### Through HTTP headers

Retains the same urls but may confuse caching systems.

Example companies: Azure.

```bash
GET /recursos HTTP/1.1
Host: example.com
ApiVersion: 1.0
Vary: ApiVersion
```

Consider that you need to add a vary header so that the [caching systems](/en/caching-in-django-rest-framework-with-memcached/) do not store different versions of the API in the same url.

### In the content negotiation

Remember that mechanism defined in the HTTP protocol that allows you to obtain different versions of a resource? Well, in addition to applying to formats, it can be used to specify versions.

Keep the same urls, it can confuse developers who do not understand headers.

Examples of companies: Github, Adidas.

```bash
application/vnd.github[.version].param[+json]
```

In REST one thing are the resources and another their representation, the resources, in addition to the format, have another form of representation, which is the API version, so this way does comply with REST. Although its use can be a little more confusing for people unfamiliar with the HTTP protocol.

## How much nesting of API resources?

When we have relationships between our resources, it is quite tempting to place hierarchical URL's, complicating the use of the API.

```bash
# /recurso/<id>/subrecurso/<id>/subsubrecurso/<id>/subsubsubrecurso ❌
/clientes/99/pedidos/88/productos/77/variantes ❌
```

The [DRF documentation suggests a flat structure](https://www.django-rest-framework.org/api-guide/relations/#example_2) when designing APIs.

The white house API standards guide also advocates for succinct nesting, setting as a limit

```bash
recurso/<id>/recurso
```

[Microsoft also recommends keeping URIs as simple as possible.](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) But how do I refer to resources deeper in the URL? Well you can create an endpoint with one or two levels of nesting and access them directly.

```bash
# /subrecurso/<id>
```

### And how to deal with related resources?

Very long URLs, with multiple hierarchies above, can be shortened by accessing them directly using the direct reference to the resource.

Instead of having an endpoint that requires the entire hierarchy in the URI. As in this example:

```bash
tienda/99/clientes/99/pedidos/88/productos/77
```

Reduce the length of the endpoint to a minimum, the identifier should be enough to access the resource.

```bash
# /subrecurso/<id>/subsubrecurso/<id>
/pedidos/88/productos/77
```

Notice how even in the absence of the initial part of the URI above, we can still access the resource and it is perfectly readable.

## Notify about API updates

Sometimes it is necessary to introduce structural changes in the APIs, to prevent all those who consume it from presenting problems, we need to notify them. But... how?

In the [book Two Scoops of Django](/en/the-best-django-book-two-scoops-of-django-review/), the authors recommend the following steps for notifying an API version change.

* Notify users as far in advance as possible via email, blogs or any other means, almost to the point of boredom.
* Replace the deprecated API response with an HTTP 410 error that returns a message containing links to: the new endpoint, the new API documentation and, if it exists, the text explaining why the changes were made.

## Limit your API

You should limit your API. Users should not have unrestricted access and unlimited requests to your API. There are users that can abuse your API, keep your server busy, preventing the rest of the users from using it and increasing your costs.

One way around this is to set a [throttling policy](/en/throttling-on-nginx/) on your server for any user.

You can also make it the center of your business and offer payment plans according to the number of requests per minute to your API.

## Special characters in the URI

Use only valid characters in your URI.

According to the specification [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3), the only valid characters, i.e., that do not need to be encoded, in a URI are the basic Latin alphabet letters, digits and some special characters (as long as they are used for their intended purpose).

* Secure characters [0-9a-zA-Z]: do not need to be encoded
* Non-reserved characters [- . _ ~]: do not need to be encoded
* Reserved characters [: / ? # [] @ ! $ & ' ( ) * + , ;] only need to be encoded if they are not used for their original purpose (e.g. a diagonal not used to separate paths)
* Unsafe characters [< > % { } | \ ^ `]: need to be encoded.
* All other characters need to be encoded.

The above is changing and they are trying to add many more symbols from different languages, you can read more about it in the [w3 idn and iri] article (https://www.w3.org/International/articles/idn-and-iri/).

## Consider SEO

Search engines consider the URL to rank a web page, if search engine ranking is important to your website, don't just use identifiers, tell the search engine the topic in the URL. SEO and URLs are a topic too broad to summarize in a few lines, but this should give you an idea of how to search for more information.

```bash
/posts/el-titulo-de-mi-post ✅
/posts/99-el-titulo-de-mi-post ✅
/posts/99 ❌
```

I hope you found the post useful, or at least that it introduced you to material you hadn't previously considered when designing an API.

## Reference sources

* [JSON:API Documentation](https://jsonapi.org/)
* [IRI y URI](https://www.w3.org/International/articles/idn-and-iri/)
* [Whitehouse's API standard](https://github.com/WhiteHouse/api-standards)
* [Best Practices API design from Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
* [Sturgeon, P. (2015). _Build Api’s_. Philip J. Sturgeon.](https://www.amazon.com.mx/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&amp;crid=2W0ZTSCO349YL&amp;keywords=build+apis&amp;qid=1648756000&amp;sprefix=build+apis%2Caps%2C187&amp;sr=8-1)
* [Massé, M. (2012). REST API design rulebook. Sebastopol, CA: O'Reilly.](https://www.amazon.com.mx/Rest-API-Design-Rulebook-Consistent/dp/1449310508)
* [Two scoops of django](https://www.feldroy.com/books/two-scoops-of-django-3-x)