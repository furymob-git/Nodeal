# Getting Started

Welcome to **Nodeal**. This framework is designed to provide a robust, modular, and virtualized environment for Roblox development, extending the engine's capabilities while maintaining a seamless Studio experience.

::: tip Studio Integration
Nodeal is built for a **100% Studio Workflow**, allowing you to utilize advanced framework features without external tools or context switching.
:::

## Core Philosophy

Nodeal fundamentally alters script execution to provide features typically unavailable in standard Roblox development.

*   **Virtualization**: Scripts run in a secure, custom environment, isolating contexts and ensuring safety.
*   **Extended API**: Access custom Services and override standard behaviors through dependency injection.
*   **Modularity**: A structured module system that promotes clean architecture and reusability.

## Installation

The framework is installed and managed entirely through the Nodeal Studio Plugin.

### 1. Install the Plugin

The plugin serves as the bridge between Roblox Studio and the Nodeal runtime. It handles script pre-parsing, autocompletion, and environment management.

<div style="margin: 10px 0;">
  <a href="#" style="display: inline-block; background: #333; color: #888; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; border: 1px solid #555; cursor: not-allowed;">
    Download Nodeal Plugin (Coming Soon)
  </a>
  <div style="font-size: 0.75rem; color: #888; margin-top: 4px; font-style: italic;">
    The plugin is currently in private beta and not yet available on the Creator Store.
  </div>
</div>

### 2. Initialize Project

Once installed, setting up a new project is straightforward:

1.  Open **Roblox Studio**.
2.  Navigate to the **Nodeal** tab in the ribbon.
3.  Click **Install / Upgrade**.

The plugin will automatically configure the necessary server and client entry points.

## Next Steps

Explore the documentation to understand the framework's capabilities.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px;">

<a href="./studio-integration" style="display: block; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; text-decoration: none; color: inherit; background: rgba(255,255,255,0.05);">
  <h3 style="margin: 0; margin-bottom: 5px;">Studio Integration</h3>
  <p style="font-size: 0.9em; opacity: 0.8; margin: 0;">Learn about the Custom Explorer and Autocompletion features.</p>
</a>

<a href="./module-system/modules" style="display: block; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; text-decoration: none; color: inherit; background: rgba(255,255,255,0.05);">
  <h3 style="margin: 0; margin-bottom: 5px;">Creating Modules</h3>
  <p style="font-size: 0.9em; opacity: 0.8; margin: 0;">Guide to creating Services, Built-ins, and Standard Modules.</p>
</a>

</div>

## Community

<div style="display: flex; gap: 10px; margin-top: 20px;">
  <a href="https://discord.gg/hTqXPRduHp" target="_blank" style="display: flex; align-items: center; gap: 8px; background: #5865F2; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 0.9em;">
    <img src="https://api.iconify.design/simple-icons/discord.svg?color=white" width="20" height="20" alt="Discord" />
    Join Server
  </a>

  <a href="https://github.com/furymob-git/Nodeal" target="_blank" style="display: flex; align-items: center; gap: 8px; background: #333; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 0.9em; border: 1px solid #555;">
    <img src="https://api.iconify.design/simple-icons/github.svg?color=white" width="20" height="20" alt="GitHub" />
    GitHub
  </a>
</div>
