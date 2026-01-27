# Built-ins

::: info Extend the Engine
Nodeal allows you to extend the Roblox Engine itself by injecting custom "Built-in" libraries or overriding existing ones.
:::

## Registering a Built-in

Use `game:RegisterBuiltIn` to define a new global library or modify an existing one. This is powerful for adding polyfills, utility libraries, or specialized engine extensions.

```lua
game:RegisterBuiltIn("MathEx", {
    clamp = function(n, min, max)
        return math.min(math.max(n, min), max)
    end,
    
    lerp = function(a, b, t)
        return a + (b - a) * t
    end
})
```

Once registered, `MathEx` can be accessed as if it were a native part of the engine, provided your environment is configured to expose it (managed by the Plugin pre-parser).

### Overriding Standard Libraries

You can also use this to monkey-patch or extend standard Roblox libraries safely within the Nodeal environment.

::: warning Proceed with Caution
Overriding standard libraries like `os` or `math` affects the **entire Nodeal environment**. Ensure your changes are intentional to avoid confusing other developers on your team.
:::

```lua
-- Define the new structure locally
local OSLib = {}

-- Copy existing logic or proxy it
OSLib.clock = os.clock
OSLib.time = os.time

-- Add custom functionality
function OSLib.isSummer()
    local month = os.date("*t").month
    return month >= 6 and month <= 8
end

-- Register it as the new 'os' built-in
game:RegisterBuiltIn("os", OSLib)
```

### Advanced: Wrapping Built-ins with Proxy

Just like services, you can use `newproxy` to wrap a standard library.

```lua
local os = newproxy(os)

-- Override or Add functions directly
function os.time()
    return 0 -- Freeze time!
end

game:RegisterBuiltIn("os", os)
```
