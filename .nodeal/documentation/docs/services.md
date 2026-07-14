---
title: "Services"
description: "Learn how to register custom singleton services, discover them dynamically, and wrap native Roblox services."
category: "Module System"
order: 6
---

Services are singleton objects that manage specific domains of logic or state in your game (e.g. `DataService`, `InventoryService`, `MatchmakingService`). Nodeal provides a unified API that merges Roblox's native engine services with your custom services, making dependency discovery seamless.

---

## 1. Defining a Service

To define a custom service, you create a module that registers itself with the framework using `game:RegisterService()`. Once registered, the service is cached as a singleton and can be discovered from any other script in the project.

```lua
local __=_G()
local InventoryService = {}

function InventoryService:AddItem(player: Player, itemId: string)
    print("Added item " .. itemId .. " to player " .. player.Name)
end

-- Register the service under the name "InventoryService"
game:RegisterService("InventoryService", InventoryService)

return __(InventoryService)
```

> [!NOTE]
> Custom services are instantiated during the module loading phase. Any service methods decorated with `@build` or named `Build` will execute immediately upon registration.

---

## 2. Service Discovery

To retrieve services in your modules, you use the standard Roblox `game:GetService()` API. Under the hood, Nodeal intercepts this call and checks:
1. **The Custom Registry**: If a custom service has been registered under that name, it is returned.
2. **The Roblox Engine**: If no custom service matches, it falls back to the native Roblox engine (returning standard services like `TweenService`, `RunService`, etc.).

```lua
-- Resolves to the native Roblox engine service
local TweenService = game:GetService("TweenService")

-- Resolves to your custom Nodeal service
local InventoryService = game:GetService("InventoryService")
```

> [!IMPORTANT]
> **Performance**: Nodeal caches custom services in an internal lookup table. After the first resolution, subsequent calls to `GetService` run instantly at O(1) complexity, matching the speed of native Roblox service resolution.

---

## 3. Context & Security Limits

To enforce clean client-server architecture and prevent security exploits, Nodeal enforces strict context boundaries on services:

* **Server-Only Services**: Services registered on the server (e.g. `DataStoreService`, `AntiCheatService`) are completely invisible to the client.
* **Client-Only Services**: Services registered on the client (e.g. `UIManager`, `ControllerService`) are completely invisible to the server.
* **Shared Services**: Services registered in a shared location (e.g. `MathService`) are loaded and accessible in both contexts.

> [!CAUTION]
> If a client script attempts to retrieve a server-only service via `game:GetService()`, Nodeal will intercept the call, return `nil`, and output a security warning in the Roblox Studio dev console.

---

## 4. Advanced: Service Wrapping

You can wrap and override standard Roblox engine services to extend their functionality with custom utilities. This is achieved using the enhanced `newproxy()` global.

### Example: Customizing `TweenService`
Here, we create a proxy that forwards standard methods to Roblox's native `TweenService`, but adds a custom `:Pulse()` helper method:

```lua
local __=_G()
local NativeTween = game:GetService("TweenService")

-- Wrap the native service in a virtual proxy object
local BetterTween = newproxy(NativeTween)

-- Add a custom helper method to the proxy wrapper
function BetterTween:Pulse(instance: Instance, duration: number)
    local tween = NativeTween:Create(instance, TweenInfo.new(duration), { Size = UDim2.new(1.2, 0, 1.2, 0) })
    tween:Play()
end

-- Register the proxy as "TweenService" to override the native engine service
game:RegisterService("TweenService", BetterTween)

return __(BetterTween)
```

In any other module script, calling `game:GetService("TweenService")` will now resolve to your custom `BetterTween` proxy wrapper. This allows you to improve engine utilities without breaking existing code.