---
title: "System Modules"
description: "Understand the core execution unit of Nodeal, boilerplate patterns, and architectural roles."
category: "Module System"
order: 5
---

Modules are the atomic building blocks of the Nodeal architecture. While they are physically represented as standard Roblox `ModuleScript` instances, the Nodeal runtime virtualizes them into active, isolated objects featuring **Dependency Injection**, **Lifecycle Hooks**, and **Context Isolation**.

---

## 1. The Virtualization Boilerplate

To integrate with Nodeal's security and environment isolation sandbox, all module scripts follow a strict, standardized boilerplate structure. This structure allows the Pre-Parser and runtime loader to hook into the script's execution thread.

```lua
-- 1. Initialize the security accessor
local __=_G()

-- 2. Define the module object
local MyService = {}

-- 3. Implement module methods
function MyService:AddPoints(player: Player, points: number)
    -- ...
end

-- 4. Return the module via the security accessor
return __(MyService)
```

### Breakdown of the Handshake
* **`local __=_G()`**: Captures the framework's global setup closure. During the `require` phase, this function acts as the security accessor.
* **`return __(MyService)`**: Executes the security handshake. This wrapper:
  1. Validates the calling module script's permissions.
  2. Binds the module's functions to the virtualized global scope.
  3. Formats and applies any declared decorators to the module's methods.
  4. Returns `nil` to Roblox's native `require` system to prevent other client scripts from direct memory access to the module's inner table.

> [!WARNING]
> Returning the table directly (e.g. `return MyService`) rather than wrapping it in the accessor (e.g. `return __(MyService)`) will result in a runtime error and a compilation alert from the Pre-Parser. This safety check ensures no un-sandboxed modules can execute.

---

## 2. Architectural Roles

Nodeal organizes your code into three primary architectural roles to maintain a strict separation of concerns:

| Role | Access Scope | Intended Use Case | Resolution Method |
| :--- | :--- | :--- | :--- |
| **Services** | Global Singleton | Domain-specific, stateful singletons (e.g., `DataService`, `CombatService`). | `game:GetService("Name")` |
| **Built-ins** | Framework Global | Pure, stateless utility libraries (e.g., custom `Math` or `Signal` wrappers). | Injected directly into the global environment |
| **Modules** | Local Instance | Reusable libraries, classes, components, and generic logic. | `game:GetModule("Name")` |

---

## 3. Creating Modules

To ensure the Pre-Parser maps your dependencies correctly, you should always create framework scripts using the **Nodeal Custom Explorer** in Roblox Studio:

1. Right-click any folder inside the **Nodeal Explorer** widget.
2. Select **New Service**, **New Built-in**, or **New Module**.
3. The plugin will create the physical `ModuleScript` and automatically populate the corresponding boilerplate and header tags for you.

> [!TIP]
> You can use the hotkey combo <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> inside the Custom Explorer to instantly insert a standard Module.

---

## 4. Extending the Framework

Nodeal is designed to be fully extensible. You can register custom decorators that modify function behavior project-wide.

### Example: Registering a Logger Decorator
You can register a custom decorator using `game:RegisterDecorator` within any initialization module:

```lua
local __=_G() local LogDecorator = {}

-- Register the decorator "log"
game:RegisterDecorator("log", function(_, func, prefix: string)
    return function(...)
        print(`[{prefix}]: Executing function with args:`, ...)
        return func(...)
    end
end)

return __(LogDecorator)
```

Once registered, you can annotate any method in any module using the block comment syntax, and the decorator will automatically wrap the method at runtime:

```lua
--[=[
    @log Inventory
]=]
function Inventory:AddItem(player, itemId)
    -- ...
end
```
