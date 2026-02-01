# Studio Integration

Nodeal is not just a framework; it's a complete development ecosystem designed to integrate seamlessly into Roblox Studio. To achieve the best experience, Nodeal relies on a dedicated Plugin that bridges the gap between the Studio environment and the Nodeal runtime.

::: tip Strongly Recommended
While Nodeal *can* run without its plugin, using the **Nodeal Studio Plugin** is heavily recommended to unlock the framework's full potential, including custom UI tools and advanced autocompletion.
:::

## Custom Explorer

Nodeal introduces a **Custom Explorer** dedicated to your modular architecture. Unlike the standard Roblox Explorer which shows the physical hierarchy, the Nodeal Explorer displays your project's **Contexts** and **Modules** in a clean, organized interface.

- **Module Management**: specialized view for Nodeal modules, separating them from standard Instance clutter.
- **Context Display**: visualizes module launch contexts (Server, Client, Shared), making it instantly clear where your code runs.
- **Seamless UI**: built to look and feel like a native Roblox Studio widget, providing a frictionless "Studio-native" experience.

## Autocompletion & Intellisense

Nodeal's architecture alters the environment significantly (using `setfenv`), which standard Roblox Studio Intellisense cannot fully understand on its own. The Nodeal Plugin augments this:

- **Environment Awareness**: The plugin understands your custom runtime environment, providing completions for globals and services that aren't natively present in Roblox.
- **Dynamic Typing**: offers better type inference for modules that dynamically inject dependencies or methods at runtime.

### Documentation Comments

The autocompletion system parses block comments to generate on-the-fly documentation.

```lua
--[=[
    Calculates the trajectory.

    @author FURYMOB
    @alias GetPos GetProjectilePosition
    @see https://discord.com/invite/hTqXPRduHp

    @deprecated
]=]
function Projectile.GetPosition(startPos, velocity) ... end
```

## Plugin Pre-Parser

One of Nodeal's most powerful features is its **Pre-Parsing** engine. Before your code even runs, the plugin processes your scripts to enable features that would be impossible with standard Lua execution.

- **Runtime Alteration**: The framework can change how functions execute based on decorators.
- **Safety Checks**: Pre-analyzes scripts to warn about invalid usages of server-only modules on the client, and vice versa.