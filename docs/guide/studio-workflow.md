# Studio Workflow

Nodeal is designed to be **100% Studio-compatible**, enforcing a development flow that stays within the Roblox environment while empowering it with external-like capabilities.

## The Nodeal Plugin

To use Nodeal effectively, you must have the **Nodeal Studio Plugin** installed. 

### Why is it required?
The plugin performs critical **pre-parsing of data** before your game runs. This ensures that:
- Dependency injection is resolved statically where possible.
- Custom built-ins and services are indexed correctly.
- Performance overhead during runtime is minimized.

::: tip
The plugin runs automatically in the background when you play-test or build your place.
:::

## Variable & Function Injection

Nodeal relies heavily on **Injection** rather than traditional `require` chains. This allows for a cleaner codebase where dependencies are provided to your scripts automatically.
