# Getting Started

Welcome to **Nodeal**. This guide will help you install and configure the framework for your Roblox project.

## Installation

Nodeal can be installed via [Wally](https://wally.run/), the package manager for Roblox.

### 1. Initialize Wally

If you haven't already, run:

```bash
wally init
```

### 2. Add Dependency

Add `Nodeal` to your `wally.toml`:

```toml
[dependencies]
Nodeal = "furymob-git/nodeal@0.1.0"
```

### 3. Install

Run the install command:

```bash
wally install
```

## Quick Start

Create a new script in `ServerScriptService` and initialize Nodeal:

```lua
local Nodeal = require(game.ReplicatedStorage.Packages.Nodeal)

Nodeal.start({
    debug = true
}):catch(warn)
```

You are now ready to build!
