# System Built-ins

Built-ins are global libraries injected directly into the execution environment. They allow you to extend the Lua language itself or modify standard libraries (polyfilling).

::: info Power & Responsibility
Unlike Services, Built-ins are available **globally** without requiring `GetService`. They become part of the language for your project.
:::

## creating a Built-in

To register a Built-in, use `game:RegisterBuiltIn`. This injects the table into the global scope with the specified name.

```lua
local __=_G() local MathEx = {}

function MathEx.lerp(a: number, b: number, t: number): number
    return a + (b - a) * t
end

function MathEx.map(n: number, start1: number, stop1: number, start2: number, stop2: number): number
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
end

-- Register to Global Scope

--[=[
    Provides advanced mathematical functions.
]=]
game:RegisterBuiltIn("MathEx", MathEx)

return __(MathEx)
```

Once registered, you can use `MathEx` anywhere:

```lua
print(MathEx.lerp(0, 10, 0.5)) -- Output: 5
```

## Advanced: Standard Library Extension

You can use this system to safely "monkey-patch" standard Roblox libraries like `os`, `math`, or `table`. Because Nodeal environments are virtualized, this does **not** affect other non-Nodeal scripts.

### Wrapping with Proxies

The most robust way to extend a standard library is to wrap it using [`newproxy`](../../api/globals#newproxy).

```lua
local __=_G() local BetterOS = newproxy(os)

-- Extend functionality
function BetterOS.isLeapYear(year: number)
    return (year % 4 == 0 and year % 100 ~= 0) or (year % 400 == 0)
end

-- Override existing functions
function BetterOS.time()
    return workspace:GetServerTimeNow() -- Use precise server time everywhere
end

-- Register as "os", replacing the standard library in Nodeal
game:RegisterBuiltIn("os", BetterOS)

return __(BetterOS)
```

::: warning Scope Impact
Registering a Built-in with the name of a standard library (e.g., "os") replaces it for **all** Nodeal scripts in that context. Ensure your implementation remains backward compatible to avoid breaking dependencies.
:::
