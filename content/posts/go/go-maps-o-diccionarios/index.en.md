---
aliases:
- /en/go-maps-o-dictionaries/
- /en/golang-maps-or-dictionaries/
authors:
- Eduardo Zepeda
categories:
- go
coverImage: images/go-maps-o-diccionarios.jpg
date: '2021-12-21'
description: I explain how a map works in go or golang and learn how to declare them,
  create them explicitly with make and traverse them with range.
keyword: golang maps
keywords:
- go
title: Golang maps or dictionaries
---

In the go programming language, a map or hash table is the equivalent of a dictionary; they have a key that is related to a value. The key and value can be of different data types, but all keys must be of a single type and all values must be of the same type.

{{<box link="/en/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, click here to read it it">}}

Together with the [array and the go slice](/en/go/go-slices-and-arrays-basic-characteristics-and-most-common-uses/), golang maps are structures that serve as a collection of values.

## Inner workings of golang maps

### Go's current implementation: Swiss-tables

Go 1.24 replaced its map implementation, it now uses Swiss-tables, which are currently used in Rust. Swiss-tables provide a boost in speed compared to its former implementation, and it also improves:

- Slow lookups due to overflown buckets when extra entries were added.
- Larger Memory Usage due to overflown buckets that require extra space.
- Overhead due to rehashing when resizing the maps.

{{<swissTables>}}

### Go's former implementation: Buckets

In Go a map works quite similar to any other language. In go there are buckets, a type of section consisting of 8 key-value pairs. The hash function receives the key and redirects us to the appropriate bucket, that is, the space of 9 key-value pairs where our key is located and, once there, it looks for the correct key.

{{< figure src="images/mapsGolang-1.png" class="md-local-image" alt="Inner workings of golang maps in the programming language go." >}}

Internal operation of golang maps. The information is taken from the [official documentation of a map](https://go.dev/src/runtime/map.go).

## Create a map in go

To declare a map, we use the word map and enclose the data type of the key in square brackets, followed by the data type of the value.

```go
var dictionary map[string]int
//A map with key of string type and values of int type 
dictionary["hello"] = 0
dictionary["panic"] = 1
fmt.Println(dictionary)

//❌❌❌ panic: assignment to entry in nil map
```

However, if we execute the previous thing it will give us an error. Why? It is important that you know that **golang maps are references, they point to a memory location**, as we create an empty _map_ it points to nothing, to _nil_, so if we try to modify it, it will give us an error.

As with the slice, we have two ways to create a map or dictionary.

* Passing values after the data type of the value
* Using the make function.

### Create a map in go with values

We can create a map or dictionary using map, the data type of the braces in square brackets, followed by the data type of the values and then the data key value in square brackets, separating each one with a colon.

The map keys can be modified and even new ones can be added.

```go
var account = map[string]int{
        "Anna": 100,
        "Renee": 200,
        "Kakuro": 300,
        "Joy": 400,
}
account["Anna"] = 500
account["Colombe"] = 900
```

We can also let go infer that it is a map, but only within a function, using the walrus operator ":=".

```go
account := map[string]int{
        "Anna": 100,
        "Renee": 200,
        "Kakuro": 300,
        "Joy": 400,
}
account["Anna"] = 500
account["Colombe"] = 900
```

### Create a map in go with make

To create a map by allocating memory we need to use the make function and specify the type of data that the keys and values will have after the word map.

In this case we do not have to pass the map length argument to make. If we omit the map size, internally, go will assign a small value to it.

```go
var dictionary = make(map[string]int)
dictionary["hello"] = 2
dictionary["world"] = 1
fmt.Println(dictionary)
// map[hello:2 world:1]
```

Now watch this! We have a map or dictionary with only two keys, see what happens if we access a third one.

```go
fmt.Println(balance["user"])
// 0
// How can we distinguish between a zero balance or a user that doesn't exist
```

**If we try to access a key that does not exist, go will return its respective zero value**, but this leads us to a problem: how do we distinguish whether we have a zero because the key does not exist or because the value of our key is zero?

### Distinguish between non-existent and zero values

To distinguish between a zero value, go provides a second return value, which indicates whether a key exists. This second value is a boolean: _true_ or _false_.

```go
value, exist := dictionary["NonExistent"]
```

### Optional capacity in golang maps

To set a maximum key capacity in a _map_, we pass the length of the map as the second argument.

```go
m := make(map[string]int,99)
```

However, unlike slices, this length only tells the compiler to allocate a minimum amount of memory; if we add more keys than the maximum value, they will still be added, although not as efficiently.

### Delete keys with delete

If we want to get rid of a key from our _map_, we use the _delete,_ function, which deletes a key from a map or dictionary.

```go
delete(dictionary, "hello")
```

{{<ad>}}

## Traverse golang maps with range

Just as with an _array_ or a _slice_, we can tour a _map_ using _range_. Each iteration will return the key and value.

Remember that, being a map, **the elements will be returned in no particular order**.

```go
for key, value := range dictionary {
        fmt.Println(key,value)
    }
```

This is the minimum you should know about golang maps or dictionaries.