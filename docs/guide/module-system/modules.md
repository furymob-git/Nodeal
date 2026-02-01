# System Modules

Modules are the fundamental architectural unit in Nodeal. Unlike standard Roblox ModuleScripts, Nodeal Modules are actively managed components that support **dependency injection**, **lifecycle management**, and **strict context isolation**.

## Structure & Boilerplate

Nodeal leverages a specific boilerplate pattern to integrate with the virtualization engine. This structure ensures that the module interacts correctly with the custom global environment.

```lua
local __=_G() local MyModule = {}

--[=[
    Description of the Init responsibility.
]=]
function MyModule.Init()
    print("Module Initialized")
end

return setfenv(function() return __(MyModule) end, {script = script()})
```

::: warning Security Boilerplate
The `local __=_G()` header loads the internal security accessor.
The `return setfenv(...)` statement wraps the return value, using `__` to verify that the requester has permission to access this module's content. This prevents unauthorized scripts from "sneaking" into the virtualized scope.
**The Nodeal Plugin generates this automatically.**
:::

## Component Architecture

Nodeal separates logic into distinct proprietary types:

*   **[Services](./services)**: Singletons that manage state and logic for a specific domain (Server/Client).
*   **[Built-ins](./builtins)**: Extensions that inject themselves directly into the global environment or modify engine libraries.
*   **Standard Modules**: Reusable libraries, classes, or utility definitions imported on demand.

## Workflow

The framework enforces a distinct creation workflow to maintain project integrity.

1.  **Creation**: Always use the **Nodeal Custom Explorer**. Right-click a Instance → `New Module`.
2.  **Definition**: Define your public API within the module table.
3.  **Decoration**: Use comment decorators to define metadata, behavior, and generate rich autocompletion documentation.

### Extending the Framework

::: warning Experimental Feature
This API is currently a **Proof of Concept**. The interface for custom decorator handlers is subject to change.
:::

Nodeal is self-hosting, you can write modules that extend the framework itself.

```lua
local DecoratorHandler = {}

-- Intercepts functions tagged with specific decorators
function DecoratorHandler.OnDecorated(func, params)
    -- Logic to alter function behavior at runtime
end

return DecoratorHandler
```
