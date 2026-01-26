# Proxies & Metamethods

Nodeal introduces a modified `newproxy()` and a suite of custom metamethods to give you unprecedented control over Lua objects, allowing you to create objects that behave almost exactly like Roblox Instances.

## Modified `newproxy()`

In standard Luau, `newproxy(true)` creates a blank userdata with a metatable. Nodeal extends this to allow you to wrap objects or create "smart" proxies that support custom property and method injection.

```lua
local myProxy = newproxy(true)
local meta = getmetatable(myProxy)

meta.__index = function(self, key)
    return "Accessed: " .. key
end

print(myProxy.Something) -- "Accessed: Something"
```

### Reciprocal Unpacking

One of the key features of Nodeal's proxy system is **Reciprocity**. 

If you pass an object to `newproxy()`, calling `unpack()` on that proxy will return the original object.

```lua
local original = { Data = 123 }
local proxy = newproxy(original) -- Imaginary syntax for wrapping, implementation depends on internal API

local recovered = unpack(proxy)
print(recovered == original) -- true
```

## Custom Metamethods

Nodeal recognizes special keys in your metatables to enable engine-like behavior.

### `__type`

Nodeal overrides the global `typeof()` function to respect the `__type` metamethod. This allows your custom objects to report their own type names, just like native Instances.

```lua
local myClass = newproxy(true)
local meta = getmetatable(myClass)

meta.__type = "CustomEntity"

print(typeof(myClass)) -- Prints: "CustomEntity"
```

### `__unpack`

The `__unpack` metamethod allows you to define exactly what happens when `unpack()` is called on your object.

```lua
local list = newproxy(true)
local meta = getmetatable(list)

meta.__unpack = function(self)
    return 1, 2, 3
end

print(unpack(list)) -- Prints: 1, 2, 3
```
