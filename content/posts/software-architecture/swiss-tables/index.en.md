---
date: '2025-09-16T12:25:59-06:00'
draft: true
title: 'Swiss Tables the superior performance hashmap'
categories:
- software architecture
- databases
coverImage: "images/swiss-tables-programming.jpg"
description: 'I explain you deeply how Swiss tables work internally, why are they so fast compared to buckets, SIMD, hashes, metadata and even a visual interactive simulator'
keyword: 'swiss tables'
keywords:
- ''
authors:
- 'Eduardo Zepeda'
---

## The Hash Map Got a Swiss Army Knife Upgrade

You've probably used hashmaps in the past, but the thing here is, you use it and you forget about the internals you limit your knowledge of hashmaps to getting and setting keys, you iterate over them probably, but that's all. 

``` javascript
hashmap.get("key")
hashmap.set("key", value)
// or
hashmap["key"] = value
```

Every worth-learning language has its own implementation, you know, the way it works under the hood, and most devs just don't give a damn about it, which is fine, I support high level abstractions.

The thing here is that, recently,[ Go decided to change its default hashmap implementation from Buckets to Swiss tables]({{< ref path="/posts/go/go-maps-o-diccionarios/index.md" lang="en" >}}) looking for better performance, ~~trying to mimick Rust's performance~~. Which already [paid off for some companies saving them hundreds of gigabytes](https://www.datadoghq.com/blog/engineering/go-swiss-tables/#?).

By the way it was Google who created Swiss tables (well one of its engineers), and also [protobuffers and GRPC]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="en" >}}), they're always improving the performance of what already exists.

## So, What's the Big Idea behind Swiss Tables? It's All About Metadata.

Traditional open-addressing hash maps store your key-value pairs in a big array. When you insert an element, you hash the key to find a "home" slot. If that seat is already taken, you probe for the next available spot and so on. 

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| →      | →      | →      | →      | ↓      |        |        |        |        |        |
| 1      | 1      | 1      | 1      | Free   |        |        |        |        |        |

So... what's wrong with this? Well, nothing really, just that in certain scenarios it can become messy. To find an element, or to confirm it's *not* there, you might have to traverse half the array. That's slow.

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 1      | 1      | 1      | 1      | 1      | 1      | 1      | 1      | Free   |        |

Swiss Tables attack this cumbersome problem with a brilliant idea: a separate metadata array. For every slot in the main data array, there's a corresponding byte in the metadata array. 

This byte isn't just a tombstone or an empty flag; it's a packed suite of useful information. The most crucial part is the **7 bits from the hash of the key** stored in that slot.

| Meaning Control bit | Control bit | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Bit 6 | Bit 7 |
| ------------------- | ----------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Empty               | 1           | 0     | 0     | 0     | 0     | 0     | 0     | 0     |
| Full                | 0           | 0x3A  |       |       |       |       |       |       |
| Deleted             | 1           | 1     | 1     | 1     | 1     | 1     | 1     | 0     |

This is a game changer. Why? Because to check if a slot might contain our key, you don't need to touch the main data array at all. You can first check the metadata. This is a huge win for performance.

## A Step-by-Step Walk Through the Swiss table data structure

Alright, so we've talked about the metadata esoteric magic. But how does it actually works, step-by-step, when you insert *my_app["value"]* = value and when you ask for *my_map["apple"]*?

### Inserting a key and its value in a Swiss table

When you look up a key the overall goes this way:
1.  The key is hashed.
2.  The group or bucket is decided using h1.
3.  The target slot or block is located using h2.
4.  If the slot contains our key already you just update it
5.  If no slot contains our key, you look for an empty slot.
6.  If all slots are taken you jump to the next group

#### Hash the key

First, the key "apple" is run through a robust hash function. This produces a full 64-bit hash value. Let's say it's something like 0x5A3F9C42B1D08E3A (a beautiful, random-looking number). Now, Swiss Tables perform a neat trick: they split this hash into two parts:
- 57 bits (Called h1)
- 7 bits (Called h2)

| H1       | ... | H1       | H2   |
| -------- | --- | -------- | ---- |
| 10101110 | ... | 11100010 | 0x3A |

#### Decide the initial group using h1

The first 57 bits (0x5A3F9C42B1D08E...): This part of the hash determines which initial group or "bucket" the key belongs to.

``` bash
0x5A3F9C42B1D08E % 2
```

#### Locate target block

The last 7 low bits (0x3A): This is the "probe index." It tells the map which of the 8 or 16-slots (or "blocks") to start looking in. 

### Retrieving the value of a key

When you look up a key the overall goes this way:
1.  The key is hashed.
2.  The group or bucket is decided using h1.
3.  The target slot or block is located using h2.
4.  The CPU takes the 7-bit (h2) hash snippet from our key and loads it into a special register.
5.  It then compares this *single* value against *all 8 or 16* metadata bytes in the target block—**simultaneously**. This is done using SIMD (Single Instruction, Multiple Data) instructions, basically parallelism.

Now let me explain you the steps.

#### Finding the block using the 7-bit hash

The map takes the 7-bit (h2) probe index (0x3A) and uses it to locate the specific 16-slot block where "apple" should be. This calculation is incredibly fast.

#### Use SIMD to compare the slots

This is the SIMD (Single Instruction, Multiple Data) step we love. The CPU loads the 16 metadata bytes from that block. For each byte, it checks two things:

Is the slot occupied? (A special bit in the metadata byte indicates this).

Does the 7-bit (h2) fingerprint in the metadata match our fingerprint (0x3A)?

It does this for all 16 slots AT ONCE. And this is where the magic happens, I'll elaborate in a moment. The result is a bitmask of potential candidates.

#### Handle collisions if they exist

**A matching 7-bit fingerprint doesn't mean the keys are equal**; it just means they might be equal. It's a pre-filter. It's designed to be fast, not perfect. The full 57-bit hash (h1) (and eventually the actual key comparison) is the final arbiter.

If there are any matches (say, slots 2 and 9 had the same 7-bit (h2) fingerprint and are occupied, a collision occurred), the map finally goes to the main data array. But it's not guessing anymore. It goes directly to slots 2 and 9 and performs a full key comparison: stored_key == "apple"? This is the only expensive operation, and you've minimized it to just one or two checks, lukcily you won't have more than two collisions.

#### Retrieve the key's value

Finally, if a full key matches, it returns the value. If not, or if the SIMD step found no candidates, **it can confidently say the key isn't in the map**. This last part—the negative lookup—is where Swiss Tables absolutely dominate traditional maps that have to trudge through long probe sequences.

## Why are Swiss tables so fast? SIMD and the 16-Slot Block

Here's where the real genius kicks in. Modern CPUs don't need to check things one byte at a time. They are surprisingly good doing operations in parallel. Swiss Tables are designed to exploit this by grouping slots into blocks (typically of 16).

In just one ~~blazingly fast~~ operation, the CPU creates a bitmask. A *1* means “the hash snippet matches,” a *0* means it doesn't. Only *then*, for the slots that might be a match, does the code actually dereference the pointer to the main data array to do a full key comparison. 

This is the killer feature of Swiss Tables. It minimizes expensive memory accesses and leverages the CPU's parallel processing capabilities. 

It makes lookups, especially for missing keys, super fast. You're not traversing a chain or a long probe sequence. Which, as you may know, impacts [Big O performance]({{< ref path="/posts/linux/la-notacion-big-o/index.md" lang="en" >}})

## Why Should You Care? The Swiss tables Advantages

This architecture isn't just a neat bloring and hypothetical academic exercise. It translates into real tangible benefits that nerdy devs will see reflected in their applications, ~~transforming a 0.0004s into a 0.00002s execution~~. According to Go's official page, [performance went up by about 63% compared](https://go.dev/blog/swisstable#?) to Buckets implementation.

**1. Blazing Fast Lookups:** The combination of the metadata filter and SIMD makes *find()* and *contains()* operations significantly faster than in most traditional maps. It's not a small margin; we're talking multiples in many benchmarks.

**2. Super Efficient Memory Use:** Swiss Tables are typically implemented as "flat" structures. This means they store keys and values directly in the array, not as separate allocated nodes. This greatly improves cache locality—the data you need is probably already in the CPU's fast cache(You should know the drill: L1, L2, L3 caches)—and it avoids the memory overhead of pointers used in chained implementations. This makes them superior to other hashmaps implementations in terms of memory usage.

**3. Smarter Resizing:** The metadata array makes the internal control logic much smarter. The map can make better decisions about when to rehash and how to distribute elements, keeping performance more consistent as the load factor increases.

## Ok but, what about Swiss tables disadvantages

However, it's not all sunshine and rainbows, of course, everyhing in tech is trade-off. The separate metadata array does consume extra memory (about 1/16th to 1/8th of the main array), which is usually a great trade-off because memory is one of the cheapest resources. 

Also the implementation is complex—thankfully, but that doesn't involve you, because you're going to use it the same way you have always used it.

