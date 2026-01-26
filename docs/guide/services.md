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

::: tip Advanced Usage: Service Wrapping
You can wrapping existing Roblox services using `newproxy` and override their behavior.

```lua
-- Get the original service
local RealTweenService = game:GetService("TweenService")

-- Create a proxy wrapper
local MyTweenService = newproxy(RealTweenService)
local meta = getmetatable(MyTweenService)

-- Override or extend functionality via metamethods
meta.__index = function(self, key)
    if key == "Create" then
        return function(self, ...)
             print("Intercepted Tween Creation!")
             return RealTweenService:Create(...)
        end
    end
    return RealTweenService[key]
end

-- Register it back, effectively overriding 'TweenService' in your Nodeal environment
game:RegisterService("TweenService", MyTweenService)
```
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
