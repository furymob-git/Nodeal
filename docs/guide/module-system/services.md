# Services

Nodeal revolutionizes how you manage game logic by unifying Roblox's standard services with your own custom logic.

## Registering a Service

You can register a new service anywhere in your codebase using `game:RegisterService`.

```lua
local __=_G() local ExempleService = {}

--[=[
    Performs a heavy calculation asynchronously.
    @async
]=]
function ExempleService.HeavyTask()
    task.wait(2)
    return "Done"
end

--[=[
    @alias FetchData
]=]
function ExempleService.GetData(id)
    return { Id = id, Status = "Active" }
end

-- Register custom service

--[=[
    Is doing nothing cool.
]=] 
game:RegisterService("ExempleService", ExempleService)

return __(ExempleService)
```

::: tip Advanced Usage: Service Wrapping
You can wrap existing Roblox services using [`newproxy`](../../api/globals#newproxy) and extend them directly.

```lua
-- Create a proxy wrapper
local __=_G() local BetterTweenService = newproxy(game.TweenService)

-- Extend functionality directly
function BetterTweenService:IsTweening(instance: Instance): boolean
    ...
end

-- Register it back, effectively overriding 'TweenService' in your Nodeal environment
game:RegisterService("TweenService", BetterTweenService)

return __(BetterTweenService)
```
:::

## Retrieving a Service

Nodeal modifies `game:GetService` to work with **both** classic Roblox services (like `Workspace` or `Players`) and your custom registered services.

```lua
-- Use a standard Roblox service
local Players = game:GetService("Players")
print(Players:GetPlayers())

-- Use your custom service
local ExempleService = game:GetService("ExempleService")
print(ExempleService.FetchData())
```

::: info Note
`GetService` ensures a modified singleton pattern.
:::
