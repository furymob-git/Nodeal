---
title: "API Reference"
description: "Overview of the Nodeal API surface: globals, Roblox game extensions, and system boilerplates."
category: "API Reference"
order: 0
---

This section provides comprehensive technical documentation for the entire Nodeal API surface. It covers custom global functions, extensions to standard Roblox objects, and the module boilerplate required by the virtualization layer.

> [!TIP]
> Use the sidebar navigation to jump directly to specific global functions or game extensions. Every entry includes detailed signatures, parameter indexes, return types, and code snippets.

---

## 1. Quick Navigation

To help you find what you need, the reference is divided into three distinct areas:

| Reference Section | Description | Documentation Link |
| :--- | :--- | :--- |
| **Global Functions** | Standard Lua/Luau globals extended or overridden by Nodeal. | [Globals](./globals) |
| **Game Extensions** | Methods and properties injected into the Roblox `game` proxy. | [Game Extensions](./game) |
| **System Built-ins** | Libraries and utilities injected into the global namespace. | [Built-ins](../docs/builtins) |

---

## 2. Core Global Methods

Nodeal injects several "Power Globals" to handle dependency resolution and advanced object virtualization.

| Function | Primary Purpose |
| :--- | :--- |
| **`game:GetModule`** | Resolves a module script by its registered name, abstracting away file paths. |
| **`newproxy`** | Enhanced wrapper to construct secure, metatable-driven proxy objects. |
| **`typeof`** | Enhanced type-checking function that respects the custom `__type` metamethod. |
| **`unpack`** | Enhanced unpack function that respects the custom `__unpack` metamethod. |

---

## 3. Module Boilerplate

To integrate with the framework's virtualization layer and security checks, every module script **must** adhere to this boilerplate pattern:

```lua
-- 1. Initialize the security accessor
local __=_G()

-- 2. Define your logic
local module = {}

function module:DoSomething()
    print("Action executed!")
end

-- 3. Return the module via the security accessor
return __(module)
```

### Why do we return the module this way?
The `__(module)` call executes a framework handshake that performs the following actions:
1. **Context Resolution**: Binds the module's functions to the virtualized global namespace.
2. **Decorator Processing**: Scans and applies method-level decorators (like `@typecheck`, `@init`, `@build`).
3. **Memory Protection**: Returns `nil` to Roblox's native `require` compiler. This prevents exploiters or external scripts from resolving the module instance directly via game memory.
