---
title: Differ/HashMapPatch.ts
nav_order: 6
parent: Modules
---

## HashMapPatch overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [diff](#diff)
  - [empty](#empty)
- [destructors](#destructors)
  - [patch](#patch)
- [model](#model)
  - [HashMapPatch (interface)](#hashmappatch-interface)
- [mutations](#mutations)
  - [combine](#combine)
- [symbol](#symbol)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## diff

Constructs a map patch from a new and old map of keys and values and a
differ for the values.

**Signature**

```ts
export declare const diff: <Key, Value, Patch>(
  oldValue: HashMap<Key, Value>,
  newValue: HashMap<Key, Value>,
  differ: Differ<Value, Patch>
) => any
```

Added in v1.0.0

## empty

Constructs an empty map patch.

**Signature**

```ts
export declare const empty: <Key, Value, Patch>() => any
```

Added in v1.0.0

# destructors

## patch

Applies a map patch to a map of keys and values to produce a new map of
keys and values values which represents the original map of keys and
values updated with the changes described by this patch.

**Signature**

```ts
export declare const patch: <Key, Value, Patch>(
  oldValue: HashMap<Key, Value>,
  differ: Differ<Value, Patch>
) => (self: any) => HashMap<Key, Value>
```

Added in v1.0.0

# model

## HashMapPatch (interface)

A patch which describes updates to a map of keys and values.

**Signature**

```ts
export interface HashMapPatch<
```

Added in v1.0.0

# mutations

## combine

Combines two map patches to produce a new map patch that describes
applying their changes sequentially.

**Signature**

```ts
export declare const combine: <Key, Value, Patch>(that: any) => (self: any) => any
```

Added in v1.0.0

# symbol

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0