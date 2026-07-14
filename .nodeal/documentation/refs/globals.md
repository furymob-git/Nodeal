---
title: "Global Functions"
description: "Detailed documentation for all global functions injected or extended by the Nodeal runtime."
category: "API Reference"
order: 1
---

The Nodeal virtualization layer overrides and extends standard Luau globals. These functions are injected directly into the sandboxed global environment of each module to provide secure proxying, advanced type resolution, and custom logging.

---

## 1. Dependency Resolution

<Method name="require" parameters="module: ModuleScript | Node" returns="any" scope="Shared">
  An overridden version of the native Roblox <code class="language-lua">require()</code>. It adds support for resolving Nodeal <strong>Node</strong> objects directly, in addition to standard Roblox ModuleScripts.

  ### Example
  ```lua
  local MyNode = game:GetModule("MyModule") -- Resolves a Node object
  local Content = require(MyNode)            -- Loads the Node's virtual content
  ```
</Method>

---

## 2. Object Virtualization & Metatables

<Method name="newproxy" parameters="target: boolean | any" returns="Userdata" scope="Shared">
  An enhanced version of Luau's native <code class="language-lua">newproxy()</code>. If passed a table or userdata, it wraps the target in a secure metatable-driven proxy wrapper. If passed a boolean, it behaves like native Luau.
  
  ### Intercepting Instances
  You can wrap native Roblox Instances to intercept property indexing (<code class="language-lua">__index</code>) and assignments (<code class="language-lua">__newindex</code>) before they hit the underlying Roblox C++ engine object.

  ### Example
  ```lua
  local RealPart = Instance.new("Part")
  local ProxyPart = newproxy(RealPart)

  local meta = getmetatable(ProxyPart)
  meta.__index = function(self, key)
      print("Intercepted property access:", key)
      return RealPart[key]
  end
  ```
</Method>

<Method name="setmetatable" parameters="tbl: table, mt: table" returns="table" scope="Shared">
  Overridden version of the native <code class="language-lua">setmetatable()</code>. If the target table implements the custom <code class="language-lua">__setmetatable</code> metamethod, Nodeal routes the execution through it. Otherwise, it falls back to native behavior.
</Method>

<Method name="getmetatable" parameters="tbl: table" returns="table" scope="Shared">
  Overridden version of the native <code class="language-lua">getmetatable()</code>. Respects the custom <code class="language-lua">__getmetatable</code> metamethod on virtualized proxy objects, allowing you to secure metatables from extraction.
</Method>

<Method name="typeof" parameters="value: any" returns="string" scope="Shared">
  An enhanced version of Roblox's <code class="language-lua">typeof()</code>. If the value has a metatable that defines a custom <code class="language-lua">__type</code> string or function, it returns that custom type. Otherwise, it falls back to standard Roblox types.

  ### Example
  ```lua
  local CustomClass = {}
  local instance = newproxy(true)
  getmetatable(instance).__type = "CustomClass"

  print(typeof(instance)) -- "CustomClass"
  ```
</Method>

<Method name="unpack" parameters="target: table | Userdata, start: number?, finish: number?" returns="...any" scope="Shared">
  An enhanced version of Luau's <code class="language-lua">unpack()</code>. It adds support for unpacking custom proxies and objects that implement the custom <code class="language-lua">__unpack</code> metamethod.
</Method>

---

## 3. Output & Logging Controls

<Method name="print" parameters="...any" returns="void" scope="Shared">
  A wrapped version of Roblox's global <code class="language-lua">print()</code>. If the game is running in production and the manifest attribute <code class="language-lua">PrivatePrint</code> is set to <code class="language-lua">true</code>, this print call will yield silently, preventing client log pollution.
</Method>

<Method name="warn" parameters="...any" returns="void" scope="Shared">
  A wrapped version of Roblox's global <code class="language-lua">warn()</code>. If the game is running in production and the manifest attribute <code class="language-lua">PrivateWarn</code> is set to <code class="language-lua">true</code>, warning messages are suppressed.
</Method>

<Method name="error" parameters="message: string?, level: number?" returns="void" scope="Shared">
  A wrapped version of Roblox's global <code class="language-lua">error()</code>. If the manifest attribute <code class="language-lua">PrivateError</code> is active in production, this call cancels the running coroutine to protect state, instead of throwing a generic error stack trace.
</Method>

<Method name="assert" parameters="value: T?, message: string?, level: number?" returns="T" scope="Shared">
  A wrapped version of Roblox's global <code class="language-lua">assert()</code>. If the assertion fails, it throws a formatted Nodeal runtime error using the custom <code class="language-lua">error()</code> global, ensuring stack traces point to the correct framework layer.
</Method>
