---
title: "Getting Started"
description: "Install the Nodeal Plugin, initialize your project, and write your first virtualized module."
category: "Getting Started"
order: 2
---

This guide will walk you through installing the **Nodeal Studio Plugin**, initializing your Roblox project, and creating your very first virtualized module script.

> [!CAUTION]
> **Private Beta** — Nodeal is currently in a private beta. You must obtain the Roblox Studio Plugin file (`.rbxm`) to use the framework. [Join the Discord Community](https://discord.gg/hTqXPRduHp) to request access and obtain your copy.

---

<Steps>
  <Step title="Installation">
    The entire Nodeal ecosystem is powered by a specialized **Studio Plugin**. This plugin handles background transpilation, decorator parsing, and autocomplete type injection.

    1. Download the latest `Nodeal.rbxm` plugin file from the official channel on our **[Discord Server](https://discord.gg/hTqXPRduHp)**.
    2. Open **Roblox Studio**.
    3. Drag and drop the downloaded `.rbxm` file directly into the Studio viewport, or save it to your local Roblox plugins directory.
  </Step>

  <Step title="Initializing Your Project">
    With the plugin active, you need to configure your Roblox place for the Nodeal runtime. This will set up the core directories and the bootstrapper.

    1. Locate the **Nodeal** tab in your Roblox Studio top ribbon.
    2. Click the **Setup** button.
    3. The plugin will automatically construct the required framework folders inside `ReplicatedStorage` and `ServerStorage`, along with the core client/server runtime entry scripts.
  </Step>

  <Step title="Creating Your First Module">
    All script logic in Nodeal is written inside virtualized modules. These modules are physically stored as standard `ModuleScript` instances but execute in a sandboxed shell.

    1. Open the **Nodeal Explorer** widget (enabled via the Nodeal ribbon tab).
    2. Right-click on the `Modules` folder.
    3. Select **New Module** from the context menu and name it `HelloService`.
    4. The plugin will create the module script and automatically fill in the required security boilerplate.
  </Step>
</Steps>

---

## Understanding the Boilerplate

Every Nodeal module starts and ends with a specific pattern of code. This is the **virtualization boilerplate**:

```lua
local __=_G() local module = {}

function module:Greet(name: string)
    print(`Hello, {name}! Nodeal is running successfully.`)
end

return __(module)
```

### Why is this code required?

To keep execution fast and secure, the framework uses a design-time Pre-Parser:
1. **`local __=_G()`** captures the global registry hook. When the module loads, this accessor functions as the security handshake.
2. **`local module = {}`** is your standard module container.
3. **`return __(module)`** executes the handshake closure. This wraps all functions of your module with any defined decorators, injects the Nodeal global API (like custom `typeof`, `unpack`, and service registries), and returns `nil` to the native engine to protect the module's contents from external memory injection.

> [!WARNING]
> Do not remove or alter the boilerplate format. If the Studio Pre-Parser detects a module script that lacks this signature, it will flag it with a compilation warning and block it from running to guarantee the sandbox's integrity.

---

## Next Steps

Now that your project is set up, you are ready to learn about the architecture of Nodeal:

* **[Core Concepts](./core-concepts)** — Learn how the virtualization layer sandboxes scripts and resolves modules dynamically.
* **[System Modules](./modules)** — Discover the differences between Services, Built-ins, and Components.
* **[Decorators](./decorators)** — Annotate your code to implement networking, context rules, and automatic type checking.
