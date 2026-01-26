# Built-ins

Nodeal allows you to extend the Roblox Engine itself by injecting custom "Built-in" libraries or overriding existing ones.

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

```lua
-- Example: Extending the 'os' library safely
game:RegisterBuiltIn("os", {
    clock = os.clock, -- Keep original
    time = os.time,   -- Keep original
    
    -- Add custom function
    isSummer = function()
        return os.date("*t").month >= 6 and os.date("*t").month <= 8
    end
})
```

### Advanced: Wrapping Built-ins with Proxy

Just like services, you can use `newproxy` to wrap a standard library.

```lua
local RealOS = os
local MyOS = newproxy(RealOS)
local meta = getmetatable(MyOS)

meta.__index = function(self, key)
    if key == "time" then
        return function() return 0 end -- Freeze time!
    end
    return RealOS[key]
end

game:RegisterBuiltIn("os", MyOS)
```
