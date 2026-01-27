# Services

Nodeal revolutionizes how you manage game logic by unifying Roblox's standard services with your own custom logic.

## Registering a Service

You can register a new service anywhere in your codebase using `game:RegisterService`.

::: code-group

```lua [Nodeal Service]
-- Clean & Direct
local NetworkService = {}

function NetworkService:GetNetwork(network: string)
    -- Your logic here
end

-- Simply register it to the game
game:RegisterService("NetworkService", NetworkService)
```

```lua [Classic ModuleScript]
-- The old, verbose way
local NetworkService = {}
NetworkService.__index = NetworkService

function NetworkService.new()
    local self = setmetatable({}, NetworkService)
    return self
end

function NetworkService:GetNetwork(network: string)
    -- Your logic here
end

return NetworkService
```

:::

::: tip Advanced Usage: Service Wrapping
You can wrap existing Roblox services using `newproxy` and extend them directly.

```lua
-- Get the original service
local TweenService = game:GetService("TweenService")

-- Create a proxy wrapper
local TweenServiceProxy = newproxy(TweenService)

-- Extend functionality directly
function TweenServiceProxy:IsTweening(instance: Instance): boolean
    ...
end

-- Register it back, effectively overriding 'TweenService' in your Nodeal environment
game:RegisterService("TweenService", TweenServiceProxy)
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
