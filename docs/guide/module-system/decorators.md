# Decorators & Comments

Nodeal includes a powerful **comment-based decorator system**. By using block comments above your functions, you can define metadata, permissions, and behavior that the framework (and the Plugin pre-parser) respects.

## Syntax

Decorators are written inside a block comment `--[=[ ... ]=]` placed directly above the function definition. Tags start with an `@` symbol.

If no value is provided after a tag, it defaults to `true`.

```lua
local __=_G() local module = {}

--[=[
    This function performs a heavy task asynchronously.

    @async
    @server
        @deprecated
    @example
        local result = module.DoWork(10)
        print(result)
]=]
function module.DoWork(value: number)
    task.wait(1)
    return value * 2
end

return setfenv(function() return __(module) end, {script = script()})
```

## Available Decorators

### Execution Context
- **`@client`**: Defines client-side behavior. If used as a parent tag (followed by indented tags), the nested tags will **only apply** in the Client context.
- **`@server`**: Defines server-side behavior. If used as a parent tag, the nested tags will **only apply** in the Server context.

> **Note**: These tags are powerful for defining context-specific deprecations or visibility rules (e.g., hiding a function from the client API but keeping it visible on the server).

### Visibility & Documentation
- **`@hidden`**: Hides the function from auto-generated API listings or autocomplete suggestions.
- **`@deprecated`**: Marks the function as deprecated.
- **`@example`**: Allows you to write code examples that will be displayed in documentation tools.

### Behavior
- **`@async`**: Indicates that the function returns a Promise or yields, helping with static analysis and usage hints.

## Nested Indentation

Indentation is **semantic** in Nodeal decorators. Indented tags are treated as children of the tag above them. This is primarily used for **Context Scoping**.

In the example below:
*   The function is hidden **only** on the Client side.
*   The function is deprecated **only** on the Server side.

```lua
--[=[
    @client
        @hidden
    @server
        @deprecated
]=]
function module.ComplexBehavior()
    ...
end
```
