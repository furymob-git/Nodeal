---
title: "Built-ins"
description: "Extend Luau standard libraries and inject framework-wide global utilities using Nodeal Built-ins."
category: "Module System"
order: 7
---

Built-ins are stateless utility libraries or extensions that are injected directly into Nodeal's virtualized global environment. They allow you to extend the Luau language itself or override standard Lua libraries (like `math`, `os`, or `table`) safely and cleanly.

---

## 1. Global Injection

Unlike Services (which must be retrieved using `game:GetService()`), Built-ins are injected as **first-class globals** available directly to all virtualized modules without requiring any imports or lookups.

```lua
local __=_G()
local MathEx = {}

function MathEx.lerp(a: number, b: number, t: number): number
    return a + (b - a) * t
end

-- Register MathEx as a global Built-in library
game:RegisterBuiltIn("MathEx", MathEx)

return __(MathEx)
```

Once registered, `MathEx` becomes globally accessible across all Nodeal module scripts:

```lua
local __=_G()
local module = {}

function module:MoveObject(obj: Instance, target: Vector3)
    -- MathEx is available globally!
    local currentPos = obj.Position
    obj.Position = MathEx.lerp(currentPos, target, 0.1)
end

return __(module)
```

> [!IMPORTANT]
> **Virtualized Scope**: Built-ins are only injected into scripts running inside the Nodeal virtualization layer. Standard Roblox scripts (like generic LocalScripts in StarterPlayer) will not have access to these custom globals.

---

## 2. Standard Library Extension

Nodeal's most powerful feature is the ability to safely extend or override standard Luau libraries (like `math`, `os`, or `table`) without polluting the native Roblox engine environment. This allows you to add modern helper functions or standard library enhancements project-wide.

### Example: Customizing the `os` Library
We can wrap the standard `os` library and override `os.time()` to return high-precision server time, while leaving the rest of the native functions intact:

```lua
local __=_G()

-- Wrap the native os library in a proxy
local BetterOS = newproxy(os)

-- Override the time method to return the precise server time
function BetterOS.time()
    return workspace:GetServerTimeNow()
end

-- Register the proxy as "os" to override the native Luau global
game:RegisterBuiltIn("os", BetterOS)

return __(BetterOS)
```

> [!WARNING]
> **Backward Compatibility**: When overriding a standard library, ensure your wrapper maintains full compatibility with the native library's existing methods. If you modify or remove native methods (e.g. `os.date` or `math.sin`), other modules or third-party libraries may crash.