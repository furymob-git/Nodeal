# Services

Nodeal revolutionizes how you manage game logic by unifying Roblox's standard services with your own custom logic.

## Registering a Service

You can register a new service anywhere in your codebase using `game:RegisterService`.

```lua
game:RegisterService("PlayerData", {
    -- Service State
    Players = {},

    -- Service Methods
    Init = function(self)
        print("PlayerData Service Initialized")
    end,

    GetMoney = function(self, player)
        return self.Players[player] or 0
    end
})
```

## Retrieving a Service

Nodeal modifies `game:GetService` to work with **both** classic Roblox services (like `Workspace` or `Players`) and your custom registered services.

```lua
-- Gets a standard Roblox service
local Players = game:GetService("Players")

-- Gets your custom service
local PlayerData = game:GetService("PlayerData")
```

::: info Note
`GetService` ensures a modified singleton pattern. Your custom services are initialized once and shared across the environment.
:::
