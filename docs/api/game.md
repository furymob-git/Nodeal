# Game Extension API

Nodeal extends the standard Roblox `DataModel` (the `game` global) with powerful methods for dependency injection and environment extension.

## `RegisterService`

Registers a singleton service into the Nodeal framework. This method allows you to define new services or **override standard Roblox services** by registering a service with an existing name.

**Signature**
```lua
game:RegisterService(className: string, instance: table | Userdata): void
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `className` | `string` | The unique name of the service. |
| `instance` | `any` | The singleton object to register. Typically a table or proxy. |

**Example**

```lua
local MyService = {}
-- ... implementation ...
game:RegisterService("MyService", MyService)
```

## `GetService`

Retrieves a service from the framework. Thanks to virtualization, this method seamlessly resolves both custom Nodeal services and standard Roblox services.

**Signature**
```lua
game:GetService(className: string): any
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `className` | `string` | The name of the service to retrieve. |

**Returns**

*   `any`: The registered singleton instance (Custom or Standard).

**Example**

```lua
local Players = game:GetService("Players") -- Standard
local MyService = game:GetService("MyService") -- Custom
```

## `RegisterBuiltIn`

Injects or overrides a global library. This handles "Global Injection," allowing you to add new keywords or extend standard libraries like `math` or `os`.

**Signature**
```lua
game:RegisterBuiltIn(builtInName: string, library: table | Userdata): void
```

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| `builtInName` | `string` | The global key to register (e.g. "MathEx", "os"). |
| `library` | `any` | The table or proxy containing the library functions. |

**Example**

```lua
local MathEx = { ... }
game:RegisterBuiltIn("MathEx", MathEx)

-- Now available globally
print(MathEx.someFunction())
```
