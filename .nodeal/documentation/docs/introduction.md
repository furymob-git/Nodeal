---
title: "Introduction"
description: "What is Nodeal and why does it exist?"
category: "Getting Started"
order: 1
---

**Nodeal** is a high-performance, modular, and virtualized runtime framework designed for professional Roblox development. It establishes a secure abstraction layer between your game logic and the Roblox engine, unlocking advanced architectural patterns—such as custom global environments, location-agnostic dependency resolution, and comment-based decorators—that are fundamentally impossible in vanilla Luau.

> [!IMPORTANT]
> Nodeal is built around a **100% Studio-First Workflow**. You do not need external code editors, file-system sync tools (like Rojo), or constant context switching to build professional-grade, enterprise-scale software in Roblox.

---

## The Nodeal Advantage

Building large-scale experiences in Roblox often leads to tightly-coupled code and "script spaghetti." Nodeal solves this by enforcing clean separation of concerns and a modern, modular architecture:

* **Environment Virtualization** — Every module executes inside a sandboxed virtual global environment (`_G`), preventing global state leakage, providing secure context boundaries, and offering seamless execution control.
* **Intelligent Module Resolution** — Replaces hardcoded, fragile file paths (e.g., `require(path.to.module)`) with location-agnostic dynamic imports. If you move a script, the framework automatically updates the resolution path.
* **Unified Service Discovery** — Seamlessly integrates custom singleton services and native Roblox engine services under a single, unified `game:GetService()` API.
* **Meta-Decorators** — Leverage comment-based annotations directly in Luau block comments to configure networking, sandboxing, type-checking, and lifecycle hooks with zero boilerplate code.

---

## Feature Roadmap

Nodeal is actively maintained and designed for production environments. Below is the current status of the core framework features:

* [x] **Virtual Execution Environment** — Production ready. Zero global leakage and secure sandbox boundaries.
* [x] **Unified Service & Built-in Registry** — Production ready. Seamless engine service overriding.
* [x] **Dynamic Module Discovery** — Production ready. Automatic resolution of dependency graphs.
* [x] **Pre-Parser Decorator Engine** — Production ready. Automatic parsing of comment-based annotations.
* [x] **Two-Phase Lifecycle Hooks** — Production ready. Unified `Build` and `Init` execution targets.

---

## How It Works

Nodeal operates through a synergy between a design-time **Studio Plugin** and a high-performance **Runtime** engine:

1. **Pre-Parsing**: As you write code, the background Pre-Parser in the Studio Plugin monitors your scripts for decorators and configuration metadata. It serializes this data into Instance attributes (like `ContentHeader` and `ContentPayload`).
2. **Bootstrapping**: When the game starts, Nodeal compiles a complete dependency graph based on the registered roots, ensuring order-aware loading and resolving any circular references.
3. **Virtualization**: The Runtime wraps each module in a virtual environment proxy. Standard global libraries are extended, and custom utilities are injected directly.
4. **Execution**: Modules enter the execution pipeline. The runtime applies decorator wrappers, triggers immediate constructor hooks (`Build`), and schedules initialization routines (`Init`) once all modules are loaded.

> [!TIP]
> This virtualization is completely transparent. You can still use standard Roblox APIs (like `game:GetService`)—Nodeal simply intercept them and makes them smarter behind the scenes.

---

### Ready to begin?
Proceed to the **[Getting Started](./getting-started)** guide to set up your first Nodeal project in Roblox Studio.
