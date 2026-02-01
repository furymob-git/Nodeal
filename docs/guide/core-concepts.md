# Core Concepts

Nodeal sits between your code and the engine. It's not just a wrapper, it **virtualizes** the environment your scripts run in. This architecture enables features that are fundamentally impossible in standard Roblox development.

## Virtualization

Nodeal wraps every script in a custom sandbox. This creates a regulated environment for each module, distinct from the global Luau environment.

**What is possible:**

*   **Runtime Interception**: The framework can switch standard engine behaviors with custom logic transparently.
*   **Dynamic Global Injection**: New keywords (like `newproxy`) can be introduced directly into the global scope, functioning as first-class citizens of the language.
*   **Context Isolation**: Scripts run in strictly defined contexts (Client/Server/Shared), creating a security layer that physically prevents access to invalid resources (e.g., Client scripts reading ServerStorage).
*   **Smart Resolution**: The environment understands the project structure, allowing it to dynamically resolve dependencies.

::: info API Reference
Check the [Global Extensions](../api/globals.md) and [Game API](../api/game.md) to see exactly which globals are intercepted and extended.
:::

## Dependency Injection

Nodeal eliminates the need for hardcoded paths. Since the environment is virtualized, the framework acts as a central dependency resolver.

Instead of requiring modules by their physical path in the hierarchy, you request them by **name**. The framework automatically locates and provides the resource, whether it is:
*   A standard Roblox Service.
*   A custom Nodeal Service.
*   A user-defined Module.
*   An injected library.

This decoupling means you can move files around your project without breaking any code.

---

::: warning Heads Up
This is powerful, but **don't fight the framework**. Since strict virtualization changes how Lua executes, trying to manually bypass the sandbox will usually break your dependency resolution. Trust the environment.
:::
