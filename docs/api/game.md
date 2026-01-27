# Game Extension API

Nodeal extends the global `game` DataModel with powerful registration methods.

## Methods

### `game:RegisterService`

Registers a singleton service into the Nodeal framework.

**Signature:**
```lua
game:RegisterService(className: string, instance: any): ()
```

- **className**: The unique name of the service.
- **instance**: What will be returned on `game:GetService`.

---

### `game:GetService`

Retrieves a registered service or a standard Roblox service.

**Signature:**
```lua
game:GetService(className: string): any
```

- **className**: The name of the service to retrieve.
- **Returns**: The service singleton. If the service is a Nodeal service, it returns the table registered via `RegisterService`. If it is a Roblox service, it returns the Instance.

---

### `game:RegisterBuiltIn`

Injects or overrides a built-in library in the global environment.

**Signature:**
```lua
game:RegisterBuiltIn(builtInName: string, instance: any): ()
```

- **builtInName**: The name of the global to register (e.g., "MathEx", "os").
- **content**: The table of functions and values to expose.
