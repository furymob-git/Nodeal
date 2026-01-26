# Services

Nodeal revolutionizes how you manage game logic by unifying Roblox's standard services with your own custom logic.

## Registering a Service

You can register a new service anywhere in your codebase using `game:RegisterService`.

```lua
-- Define the service structure first for cleaner code
local PlayerData = {}
PlayerData.Players = {}

function PlayerData:Init()
    print("PlayerData Service Initialized")
end

function PlayerData:GetMoney(player)
    return self.Players[player] or 0
end

-- Register the service
game:RegisterService("PlayerData", PlayerData)
```

::: tip Advanced Usage
You can also pass a **newproxy** instead of a table as the `serviceDefinition`. This is useful if you want your service to have custom metamethod behavior or be a proxy-wrapped object.
:::

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
