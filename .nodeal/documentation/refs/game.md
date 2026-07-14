---
title: "Game Extensions"
description: "Detailed documentation for all extensions injected into the Roblox DataModel (game) by Nodeal."
category: "API Reference"
order: 2
---

The Nodeal virtualization layer wraps Roblox's native `DataModel` (the `game` global) inside a proxy object. This proxy intercepts standard engine methods and injects custom framework APIs to drive dependency injection, service registration, and module discovery.

---

## methods

<Method name="GetModule" parameters="moduleName: string" returns="Node | any" scope="Shared">
  Resolves a module script by its registered name. This method abstracts away the physical folder structures, allowing modules to be resolved location-agnostically.
  
  Once required, the module's return value is cached, meaning subsequent lookups resolve instantly.

  ### Example
  ```lua
  local PlayerData = game:GetModule("PlayerData")
  local data = PlayerData:Get(game.Players.LocalPlayer)
  ```
</Method>

<Method name="RegisterService" parameters="className: string, instance: table | Userdata" returns="void" scope="Shared">
  Registers a singleton object as a "Service". Once registered, this service becomes discoverable context-wide using the virtualized <code class="language-lua">game:GetService()</code> API.
  
  If a custom service's name matches a native Roblox engine service (e.g. "TweenService"), Nodeal's service registry takes precedence, allowing you to completely wrap or override native behavior.

  ### Example
  ```lua
  local InventoryService = {}
  function InventoryService:AddCoins(player, amt) -- ... end

  game:RegisterService("InventoryService", InventoryService)
  ```
</Method>

<Method name="GetService" parameters="className: string" returns="any" scope="Shared">
  Resolves and retrieves a service. This is a drop-in, virtualized override for Roblox's native <code class="language-lua">game:GetService()</code>.
  
  It checks the custom Service Registry first. If no custom service matches, it falls back to the native Roblox engine to resolve native services (like <code class="language-lua">TweenService</code> or <code class="language-lua">RunService</code>).

  ### Example
  ```lua
  local Inventory = game:GetService("InventoryService") -- Resolves custom service
  local HttpService = game:GetService("HttpService")     -- Falls back to native engine
  ```
</Method>

<Method name="RegisterBuiltIn" parameters="builtInName: string, library: table | Userdata" returns="void" scope="Shared">
  Injects a stateless library or standard Lua extension directly into the virtualized global namespace of every module script in your project.
  
  You can use this method to register global utilities (like <code class="language-lua">Promise</code> or <code class="language-lua">Signal</code>) or safely monkey-patch standard Lua libraries (like <code class="language-lua">math</code> or <code class="language-lua">os</code>) project-wide.

  ### Example
  ```lua
  local LogUtility = { log = print }
  game:RegisterBuiltIn("Logger", LogUtility)

  -- In another module:
  Logger.log("Hello from a custom builtin global!")
  ```
</Method>

<Method name="RegisterDecorator" parameters="tag: string, wrapper: function" returns="void" scope="Shared">
  Defines a custom decorator wrapper. This allows you to extend the framework and apply custom runtime logic (like permissions, yielding, or error logging) to functions via comment-based annotations.

  ### Wrapper Signature
  The wrapper function receives the following arguments:
  ```lua
  function(decoratorList, targetFunction, ...decoratorArgs)
  ```
  It must return a new function (closure) that wraps the `targetFunction`.

  ### Example
  ```lua
  game:RegisterDecorator("adminOnly", function(_, func, fallbackMessage)
      return function(self, player, ...)
          if player:GetAttribute("IsAdmin") then
              return func(self, player, ...)
          else
              warn(fallbackMessage or "Access Denied")
          end
      end
  end)
  ```
</Method>
