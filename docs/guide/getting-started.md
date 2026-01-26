# Getting Started

Welcome to **Nodeal**. This framework is designed for a **100% Studio** workflow, meaning you don't need external tools like Rojo or Wally if you prefer staying in Roblox Studio.

## Installation

### 1. Install the Plugin

The Nodeal Plugin is essential. It handles pre-parsing, dependency injection, and optimizations.

[**Download Nodeal Plugin**](https://create.roblox.com/store/asset/0000000000) *(Template Link)*

### 2. Get the Framework Model

The core framework is distributed as a Roblox Model.

[**Get Nodeal Model**](https://create.roblox.com/store/asset/0000000000) *(Template Link)*

## Setup

1.  **Open Roblox Studio** and load your place.
2.  Open the **Toolbox** -> **My Models** and insert the **Nodeal Framework** model.
3.  Move the `Nodeal` folder into **ReplicatedStorage**.
4.  Create a `Script` in **ServerScriptService** to initialize the framework:

```lua
local Nodeal = require(game.ReplicatedStorage:WaitForChild("Nodeal"))

Nodeal.start({
    debug = true
}):catch(warn)
```

5.  **Run the Game**. You should see Nodeal initialization logs in the output.

## Next Steps

Check out the [Studio Workflow](./studio-workflow.md) guide to understand how to use the plugin effectively.

