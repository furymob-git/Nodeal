# Global Functions

Nodeal extends the global environment with new functions and enhances existing ones to support advanced features like proxies, custom types, and seamless module resolution.

## `import`

The primary method for loading modules in Nodeal. Unlike `require`, `import` uses the framework's intelligent module resolution system.

**Signature**
```lua
import(moduleName: string): any
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | `string` | The name of the module to load. |

**Returns**

*   `any`: The module's exported value.

**Example**

```lua
local MyModule = import("MyModule")
print(MyModule.DoSomething())
```

## `newproxy`

Extended to support wrapping existing objects with custom metatables. This is essential for creating proxies around Roblox instances.

**Signature**
```lua
newproxy(target: boolean | any): Userdata
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `target` | `boolean \| any` | If `true`, creates a blank proxy with a metatable. If an object, wraps the object in a proxy. |

**Returns**

*   `Userdata`: A new proxy object with optional metatable support.

**Example**

```lua
-- Create blank proxy
local proxy = newproxy(true)
getmetatable(proxy).__index = { customProperty = "value" }

-- Wrap existing object
local Players = game:GetService("Players")
local wrappedPlayers = newproxy(Players)
```

## `typeof`

Modified to respect custom `__type` metamethods, allowing objects to define their own type identifiers.

**Signature**
```lua
typeof(value: any): string
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `value` | `any` | The value to check the type of. |

**Returns**

*   `string`: The type name. Returns `mt.__type` if present, otherwise falls back to Luau's `typeof`.

**Example**

```lua
local proxy = newproxy(true)
getmetatable(proxy).__type = "CustomService"

print(typeof(proxy)) -- Output: "CustomService"
print(typeof("hello")) -- Output: "string"
```

## `unpack`

Enhanced to support unpacking Nodeal proxies and objects with custom `__unpack` metamethods.

**Signature**
```lua
unpack(target: table | Userdata, start: number?, finish: number?): ...any
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `target` | `table \| Userdata` | The table or proxy to unpack. |
| `start` | `number?` | Optional starting index. |
| `finish` | `number?` | Optional ending index. |

**Returns**

*   `...any`: Unpacked values from the target.

**Example**

```lua
local data = {1, 2, 3, 4, 5}
print(unpack(data, 2, 4)) -- Output: 2  3  4

-- Custom proxy unpacking
local proxy = newproxy(true)
getmetatable(proxy).__unpack = function()
    return "a", "b", "c"
end
print(unpack(proxy)) -- Output: a  b  c
```
