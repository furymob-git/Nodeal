---
title: "Studio Integration"
description: "Configure the Roblox Studio Custom Explorer, real-time Intellisense autocomplete, and Pre-Parser validations."
category: "Getting Started"
order: 4
---

Nodeal is designed as a complete, integrated development ecosystem. The **Nodeal Studio Plugin** acts as the core compiler and manager, bridging Roblox Studio's editor with the framework's runtime environment.

---

## 1. The Custom Explorer

The **Custom Explorer** widget replaces the generic Roblox explorer layout with a workspace organized by architectural roles. 

* **Context Filtering**: Module scripts are colored and categorized depending on whether they run on the `Server`, `Client`, or `Shared` context.
* **Singleton Explorer**: View all custom services registered with the dependency injection registry.
* **Asset Creation**: Right-click to create new Services, Modules, or Built-ins. The plugin automatically generates the script file and populates it with the correct boilerplate and context header templates.

---

## 2. Advanced Intellisense

Since Nodeal virtualizes global environments, standard Roblox autocomplete cannot natively resolve your custom services and injected libraries. The Studio Plugin solves this by dynamically injecting context-aware type definitions and metadata into Studio's editor engine at design-time.

### Interactive Tooltips & Metadata
The plugin parses decorators and block comments in your scripts, generating rich, visual tooltips that display when you write code.

```lua
--[=[
    Fires a magic projectile towards a target.

    @author FURYMOB
    @see https://www.nodeal.dev/
    @example
        Combat:ShootProjectile(targetPosition, 50)
]=]
function Combat:ShootProjectile(position: Vector3, velocity: number)
    -- ...
end
```

Autocomplete suggestions for a method (e.g. `Combat:ShootProjectile`) in another script displays:
* **The Description**: A detailed explanation of the method's purpose.
* **Decorator Badges**: Indicators like `@async`, or `@deprecated` to warn you of API usage or apply specific behaviours.
* **Code Samples**: Formatted and syntax-highlighted code blocks from `@example` tags.

---

## 3. The Plugin Pre-Parser

The **Pre-Parser** is a background task that runs inside the Studio Plugin. It validates your codebase as you write code, catching errors before you playtest:

* **Decorator Serialization**: Compiles Luau block comment decorators into Roblox attributes (`ContentHeader` and `ContentPayload`).
* **Boilerplate Enforcement**: Checks that all modules contain the `local __=_G()` and `return __(module)` accessor statements, prompting you to insert them if they are missing.
* **Circular Reference Detection**: Traces module loading hierarchies to detect and warn you about circular references that could cause infinite loops at startup.

> [!WARNING]
> If the Pre-Parser detects a critical issue (e.g., a circular dependency or context boundary violation), it will error on runtime.
