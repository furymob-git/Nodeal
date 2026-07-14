---
title: "Core Concepts"
description: "Understand the core architectural pillars of Nodeal: virtualization, dynamic discovery, and compiler integration."
category: "Getting Started"
order: 3
---

Nodeal sits directly between your Luau code and the Roblox engine. It is not just a collection of helper functions; it **virtualizes** the execution environment of your scripts. This section explains the core architectural pillars that make Nodeal so powerful.

---

## 1. Environment Virtualization

At the heart of the framework is the **Virtualization Layer**. In standard Roblox development, scripts share a common global environment. This can lead to security vulnerabilities, naming collisions, and global state leakage (e.g. through `_G` or `shared`).

Nodeal wraps every registered module script in a secure, isolated sandbox:



### Why Virtualize?
* **Isolation**: Each module has its own local global table. Variables declared without the `local` keyword do not pollute other scripts.
* **API Redefinition**: Nodeal injects custom overrides for native globals (like `typeof`, `unpack`, and `require`) directly into your code, keeping the API familiar while adding framework-specific features.
* **Engine Protection**: Access to standard Roblox objects is proxied, allowing you to intercept, wrap, or override standard engine behaviors (such as customizing service retrieval).

---

## 2. Unified Service Discovery

Traditional Roblox development relies on rigid, physical file hierarchies. If you move a module script, you must update every single `require(path.to.module)` in your project or your game crashes.

Nodeal introduces location-agnostic module discovery. Instead of importing via folder locations, you query the system using the name assigned to the module:

<CodeCompare>
  <CodeBlock label="Traditional Roblox">
    ```lua
    -- Fragile: breaks if the folder structure changes
    local DataStore = require(game.ServerStorage.Nodeal.Data.DataStore)
    ```
  </CodeBlock>
  <CodeBlock label="Nodeal Architecture" variant="accent">
    ```lua
    -- Safe: resolves automatically regardless of physical path
    local DataStore = game:GetModule("DataStore")
    ```
  </CodeBlock>
</CodeCompare>

### The Discovery Pipeline
1. **Dynamic Resolution**: At start, the framework catalogs all registered modules into a name lookup registry (`name_registry`).
2. **Circular Dependency Handling**: If Module A imports Module B, and Module B imports Module A, Nodeal automatically resolves the relationship using a dynamic module bootstrapping sequence.
3. **Singleton Caching**: Once a module is loaded, its return value is cached. Subsequent lookups via `game:GetModule()` resolve instantly from memory.

---

## 3. Dependency Injection

Nodeal allows you to bind your custom singletons directly to the `game` object. This makes your custom modules accessible using the exact same syntax you use for native Roblox services:

```lua
-- Accessing a custom service as if it were a native engine service
local InventoryService = game:GetService("InventoryService")
```

When `game:GetService("ServiceName")` is called:
1. Nodeal checks the **Custom Service Registry** first. If a custom service matches the name, it is returned immediately.
2. If no custom service is found, it falls back to the native Roblox engine to resolve native services (like `TweenService` or `Players`).

> [!NOTE]
> This pattern decouples your game systems from their physical location, making it extremely easy to mock services during testing and modularize your codebase.

---

## 4. The Plugin Pre-Parser

All of Nodeal's advanced features—including decorators and boilerplate validation—are driven by the **Pre-Parser**. This is a lightweight, background compiler running within the Roblox Studio Plugin.



The Pre-Parser monitors changes to your scripts and automatically compiles comment-based decorators into serializable data attributes:
* **`ContentHeader`**: Stores module-level configuration (like context exclusion or priority values).
* **`ContentPayload`**: Stores method-level decorators (like `@typecheck`, `@init`, and `@build` targets) to be processed by the loader at runtime.
* **Integrity Validation**: Ensures that every module script contains the `local __=_G()` and `return __(module)` tokens, highlighting any errors before you compile or play the game.
