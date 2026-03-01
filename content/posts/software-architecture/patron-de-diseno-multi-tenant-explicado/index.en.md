---
aliases:
- /en/multi-tenant-architecture-in-software-what-is-it-and-its-databases-patterns/
authors:
- Eduardo Zepeda
categories:
- software architecture
- databases
coverImage: images/multi-tenant-pattern-and-its-database-paradigms.jpg
date: '2025-01-28T17:44:50-06:00'
description: The multi-tenant pattern is a software architecture approach where a
  single instance of an application serves multiple tenants and there are multiple
  ways of design a database for this pattern
keyword: multi-tenant
keywords:
- software architecture
- patrones de diseño
title: 'Multi Tenant Architecture in Software: What Is It and Its Databases Patterns'
---

The **multi tenant architecture** is a software architecture (Don't confuse it with a [design pattern]({{< ref path="/posts/python/patrones-de-diseno-en-python-resena-de-practical-python-design-patterns/index.md" lang="en" >}}) or [deployment pattern](/en/software-architecture/common-and-useful-deployment-patterns/)) approach where **a single instance of an application serves multiple tenants**. You've probably come in contact with this architecture when using dropbox, Slack or any project management SAAS.

In multi-tenant architecture, each tenant can be a company, a group or an individual user, and although they share the same infrastructure and code base, their respective data is **isolated and customized**.

## Simple example of a multi-tenant application: A modern coworking

Multi-tenant architecture is like a modern office building where different companies (tenants) (like wework but less corrupt) share the same physical infrastructure - elevators, security systems, utilities, and building management - but each company has completely isolated office spaces with their own data, configurations, and customizations that other companies cannot access. 

{{<ad0>}}

Just as the building owner maintains one set of systems while serving multiple businesses, a multi-tenant application serves multiple organizations using a single instance of the software and database infrastructure, **with strict data isolation between tenants**. 

This differs from a simple multi-user application, which is more like a single company's office where all employees share the same workspace, company data, and settings - everyone sees the same information and operates under the same organizational rules, whereas in multi-tenant systems, each tenant operates as if they have their own completely separate application with their own user base, data, and often customized features.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1738123971/meme-millenial-cloud-provider_vzisiz.jpg" class="md-local-image" alt="Oh god no more AI API calls"  width="460" height="466" >}}

Taking it to a more real scenery, imagine you want to implement a service for managing small supermarket stores. Each separate store would represent a tenant, and each tenant is going to operate differently from the rest, have its own configuration, its own customers, suppliers and any other custom settings, plus the information of each supermarket store will be private.

## How is the multi-tenant architecture different from user accounts?

When I first read about this architecture I could not find the differences between, say a highly configurable application, like MySpace, for example, and a multi-tenant one. Probably for you the difference was very clear but for me it took me by surprise and I had to research about it, although I was certainly not the only one to ask [the difference between users and multi-tenant](https://stackoverflow.com/questions/48378789/what-is-the-difference-between-tenant-and-user#?):

| **Aspect**          | **User Accounts**                                                                  | **Multi-Tenant Application**                                                                              |
| ------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Definition**      | Individual profiles within a shared application.                                   | A single instance of an application serving multiple clients (tenants), each with its own isolated space. |
| **Isolation Level** | All users share the same data and general configurations.                          | Each tenant's data and configurations are isolated from others.                                           |
| **Customization**   | Limited to the user level (such as themes or personal settings).                   | Each tenant can have different configurations, branding, or even functionalities.                         |
| **Simple Example**  | An online forum where users have accounts but share the same categories and posts. | Google Workspace (formerly G Suite), where each company (tenant) has its own email, Drive, and users.     |
| **Main Purpose**    | Managing multiple users within a single shared system.                             | Managing multiple separate clients, each with several users and unique needs.                             |
| **Shared Data**     | Data is typically stored in a single space, shared by all users.                   | Each tenant's data is segregated, even if using the same database.                                        |

{{<ad1>}}

## How to manage databases in a multi-tenant application?

A multi-tenant application will have to record and store information from each tenant and therefore there will be a database, but when handling multiple tenants, it will be inevitable to ask ourselves: How do we design our database(s)? Do we divide the tenants by database or by table? Is it a good idea to have one database for all of them instead?

Well, there are different paradigms in this regard, each with its advantages and disadvantages.

### One database and one schema for all tenants.

{{<ad2>}}

A single database and a single schema, with different tables for each tenant. The simplest and easiest architecture to implement, but comes with poor isolation and customization. You can identify each tenant by an unique id.

``` mermaid
architecture-beta
    group api(database)[Database]

    service schema(logos:datasette-icon)[Schema] in api
```

A SQL query would look like this

``` bash
SELECT * FROM <table> WHERE <tenant_id_column> = '<id>';
```

### A database for each tenant

{{<ad3>}}

A database for each tenant. The most expensive when it comes to resources but provides the best isolation and full customization level. You can identify a tenant by its schema.

``` mermaid
architecture-beta
    group app[App]

    service db1(database)[Database] in app
    service db2(database)[Database] in app
    service db3(database)[Database] in app
```

A SQL query would look like this

``` bash
# Connect to database first
\c <tenant_database>
SELECT * FROM <tenant>.<table>;
```



### One database but different schemas for each tenant.

A single database for all tenants but a different schema for each tenant. Customizable and separation of schemas maintains some level of isolation, but complexity increases. You can identify a tenant by its schema.

``` mermaid
architecture-beta
    group api(database)[Database]

    service schema1(logos:datasette-icon)[Schema] in api
    service schema2(logos:datasette-icon)[Schema] in api
    service schema3(logos:datasette-icon)[Schema] in api
```

A SQL query would look like this


``` bash
SELECT * FROM <tenant>.<table>;
```

Now you got an overall idea of the multi tenant pattern and hopefully can use it in your SAAS adventures.