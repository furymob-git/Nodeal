---
title: "Decorators"
description: "Use comment-based decorators to define metadata, execution permissions, and function wrappers."
category: "Module System"
order: 8
---

Nodeal features a powerful, compile-time metadata system driven by **comment-based decorators**. By using Luau block comments directly above your function or module definitions, you can configure execution scopes, type validation, autocomplete metadata, and lifecycle triggers that the framework parses at design-time and enforces at runtime.

---

## 1. Syntax & Core Rules

Decorators are declared inside standard Luau block comments (`--[=[ ... ]=]`) using the `@` symbol.

```lua
local __=_G()
local CombatService = {}

--[=[
    Initiates a basic attack.
    @server
    @typecheck
]=]
function CombatService:Attack(target: Player, damage: number)
    -- ...
end

return __(CombatService)
```

### Argument Rules & Autocompletion
* **Default Values**: If you call a decorator without passing arguments, it automatically defaults its first parameter to `true`. For example, writing `@typecheck` is equivalent to writing `@typecheck true`.
* **Argument Indicators**: In Roblox Studio's autocomplete popup, parameters are displayed with descriptive names (e.g. `<active: boolean>` or `<priority: number>`) to make it obvious what arguments are expected.

---

## 2. Decorator Quick Reference

Below is a complete index of all decorators supported by the Nodeal ecosystem.

### General Meta-Decorators
| Tag | Target | Description | Autocomplete Display |
| :--- | :--- | :--- | :--- |
| **`@alias`** | Method | Adds one or more alternative names to a function. | `@alias <...name: string>` |
| **`@deprecated`** | Method | Flags a function as deprecated/obsolete in autocomplete. | `@deprecated <deprecated: boolean>` |
| **`@example`** | Method | Embeds a code snippet directly into the Studio hover popup. | `@example <example: string>` |
| **`@hidden`** | Method | Removes the function from autocomplete (it remains callable). | `@hidden <hidden: boolean>` |
| **`@overloads`** | Method | Registers a count of overloaded signatures for autocomplete. | `@overloads <overloads: number>` |
| **`@see`** | Method | Embeds a clickable documentation URL inside the hover tooltip. | `@see <url: string>` |

### Context & Scoping Decorators
| Tag | Target | Description | Autocomplete Display |
| :--- | :--- | :--- | :--- |
| **`@client`** | Both | Restricts execution to the client context, or scopes child decorators. | `@client <active: boolean> \| <...decorator: decorator>` |
| **`@server`** | Both | Restricts execution to the server context, or scopes child decorators. | `@server <active: boolean> \| <...decorator: decorator>` |

### Execution & Lifecycle Decorators
| Tag | Target | Description | Autocomplete Display |
| :--- | :--- | :--- | :--- |
| **`@build`** | Method | Schedules a function to run immediately during the Build phase. | `@build <active: boolean>` |
| **`@init`** | Method | Schedules a function to run during the Initialization phase. | `@init <active: boolean>` |
| **`@priority`** | Module | Header decorator setting module initialization priority order. | `@priority <priority: number>` |
| **`@typecheck`** | Method | Toggles runtime validation on parameters matching Luau types. | `@typecheck <active: boolean>` |

---

## 3. Semantic Indentation

Indentation in Nodeal block comments is **semantic**. Decorators that are indented under other decorators become their "children," inheriting their parent context. This is highly useful for **Context Scoping**.

### Example: Environment Inheritance
In the module below, the `@hidden` and `@deprecated` constraints are scoped exclusively to the **Client**. On the Server, the method remains fully visible and active:

```lua
local __=_G()
local Matchmaking = {}

--[=[
    Initializes match sync.
    
    @client
        @hidden
        @deprecated
    @server
        @priority 10
]=]
function Matchmaking:SyncState()
    -- ...
end

return __(Matchmaking)
```

---

## 4. Module-Level (Header) Decorators

Module-level decorators are declared at the very top of a script, outside of any method block. They are parsed into the `ContentHeader` attribute and control how the module behaves within the bootstrapper:

```lua
--[=[
    @priority 50
    @server true
]=]
local __=_G()
local SystemLoader = {}

-- ... module logic ...

return __(SystemLoader)
```

* **`@priority <priority: number>`**: Dictates where this module sits in the loading queue. Lower priority values are loaded first. Modules with no priority default to `255`.
* **`@server <active: boolean>` / `@client <active: boolean>`**: Tells the framework to completely ignore the module script on specific execution contexts (e.g. `@server true` ensures the module is never replicated to or required by the client).

---

## 5. Method-Level Decorators

Method-level decorators are declared directly above a function. They configure how functions are wrapped or registered at runtime:

### `@typecheck <active: boolean>`
Validates parameters at runtime. If a parameter doesn't match the method's Luau type signature, it throws a verbose error:

```lua
--[=[
    @typecheck
]=]
function PlayerManager:SetCoins(player: Player, amount: number)
    -- Throws an error instantly if 'player' is nil or 'amount' is not a number
end
```

### `@build <active: boolean>` and `@init <active: boolean>`
Control the framework's boot lifecycle. 

By default, any function named `Build` or `Init` runs during their respective phases. If you want to use custom method names or disable default lifecycle methods, you can use these decorators:

```lua
--[=[
    @build
]=]
function Module:SetupData()
    -- Runs immediately when the module is required (Build phase)
end

--[=[
    @init false
]=]
function Module:Init()
    -- Disables the default 'Init' function. This will NOT run during framework ignition.
end
```
