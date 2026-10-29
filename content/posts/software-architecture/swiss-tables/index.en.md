---
aliases:
- /en/software-architecture/swiss-tables-the-superior-performance-hashmap/
date: '2025-09-21'
title: 'Swiss Tables the superior performance hashmap and interactive demo'
categories:
- software architecture
- databases
coverImage: "images/swiss-tables-programming.jpg"
seo_title: "Swiss Tables Visual Demo: The Fastest Hashmap Explained "
description: Deep dive into Swiss Tables, why they're fast, SIMD usage, metadata handling
  and interactive visual simulator.
keyword: 'swiss tables'
keywords:
- 'big 0'
- 'performance'
- 'efficiency'
- 'backend'
authors:
- 'Eduardo Zepeda'
---

## The hash map got a Swiss Army knife upgrade

You've used hash maps before - get, set, maybe iterate. Most developers don't care how they work under the hood, and that's fine for high-level abstractions.

Recently, [Go switched its default hash map implementation from buckets to Swiss tables]({{< ref path="/posts/go/go-maps-o-diccionarios/index.md" lang="en" >}}) for better performance. The change already [saved companies hundreds of gigabytes of memory](https://www.datadoghq.com/blog/engineering/go-swiss-tables/).

Swiss tables were created by a Google engineer. Google also created [Protocol Buffers and gRPC]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="en" >}}) and continues to improve performance in existing tools.

```javascript
hashmap.get("key")
hashmap.set("key", value)
// or
hashmap["key"] = value
```

{{<adsPanels>}}

{{<ad0>}}

## What's the idea behind Swiss tables? Metadata

Traditional open-addressing hash maps store key-value pairs in one array. When inserting, you hash the key to find a home slot. If it's taken, you probe for the next available slot.

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| →      | →      | →      | →      | ↓      |        |        |        |        |        |
| 1      | 1      | 1      | 1      | Free   |        |        |        |        |        |

In worst cases, you might have to traverse half the array to find an element or confirm it's missing - that's slow.

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 1      | 1      | 1      | 1      | 1      | 1      | 1      | 1      | Free   |        |

Swiss tables solve this with a separate metadata array. For each slot in the main data array, there's a corresponding byte in the metadata array. This byte stores useful information, most importantly the **7 lowest bits of the key's hash**.

| Meaning Control bit | Control bit | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Bit 6 | Bit 7 |
| ------------------- | ----------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Empty               | 1           | 0     | 0     | 0     | 0     | 0     | 0     | 0     |
| Full                | 0           | 0x3A  |       |       |       |       |       |       |
| Deleted             | 1           | 1     | 1     | 1     | 1     | 1     | 1     | 0     |

This is a big improvement. To check if a slot might contain a key, you can look at the metadata first without touching the main data array. That saves memory accesses and improves performance.

{{< reactApp id="app-swiss-table" >}}

## How Swiss tables work

When inserting or looking up a key (e.g., `my_map["apple"]`):

1. Hash the key
2. Split the hash into h1 (high bits) and h2 (low 7 bits)
3. Use h1 to find the initial group
4. Use h2 to pick which slot in the block to start probing

{{<ad1>}}

### Hashing the key

The key "apple" goes through a hash function producing a 64-bit hash, split into:
- h1: 57 bits (determines the group/bucket)
- h2: 7 bits (used as a probe index/fingerprint, e.g., 0x3A)

| H1       | ... | H1       | H2   |
| -------- | --- | -------- | ---- |
| 10101110 | ... | 11100010 | 0x3A |

### Finding the block

h1 selects the initial group. h2 tells the map which of the 8 or 16 slots in that block to check first. The calculation is fast.

{{<ad2>}}

### Using SIMD to search

The CPU loads all metadata bytes from the block at once. Using SIMD (Single Instruction, Multiple Data), it compares the 7-bit h2 fingerprint from the key against every slot's metadata simultaneously. It checks: is the slot occupied, and does the fingerprint match?

This produces a bitmask of candidate slots - all in one CPU operation. Only those slots might contain the key; others are ruled out immediately.

{{<ad3>}}

### Resolving collisions

A matching h2 fingerprint doesn't guarantee the keys are equal - it's just a pre-filter. If there are candidates (often 0, 1, or 2), the map goes directly to those slots in the main data array and does a full key comparison.

If a full comparison matches, it returns the value. If not, or if no candidates match, the map can conclude the key isn't present. Negative lookups are where Swiss tables are especially fast compared to traditional maps that must traverse long probe sequences.

## Why are Swiss tables fast?

Swiss tables group slots into blocks (typically 16) so modern CPUs can process them in parallel with SIMD. In one operation, the CPU builds a bitmask marking which slots might match. Only those slots trigger a full key comparison against the main data array, minimizing expensive memory accesses. This is especially effective for negative lookups and impacts [Big O performance]({{< ref path="/posts/linux/la-notacion-big-o/index.md" lang="en" >}}).

## Advantages

1. **Faster lookups**: The metadata filter and SIMD make `find()` and `contains()` operations much faster than traditional maps, often by multiples in benchmarks.
2. **Better memory efficiency**: Swiss tables store keys and values directly in arrays (flat structure) rather than separate allocated nodes, improving CPU cache locality and reducing pointer overhead.
3. **Smarter resizing**: The metadata array helps the map make better decisions about rehashing and distribution, keeping performance more consistent as load increases.

According to [Go's blog](https://go.dev/blog/swisstable), switching to Swiss tables improved performance by about 63% over the bucket-based implementation.

## Drawbacks

- **Extra memory overhead**: The separate metadata array takes about 1/16 to 1/8 of the main array's size - usually worth it for the performance gain.
- **More complex implementation**: The design is more complicated to build, but users don't need to worry about it - they just get faster hash maps.
