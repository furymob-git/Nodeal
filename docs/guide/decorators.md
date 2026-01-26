# Decorators & Comments

Nodeal includes a powerful **comment-based decorator system**. By using block comments above your functions, you can define metadata, permissions, and behavior that the framework (and the Plugin pre-parser) respects.

## Syntax

Decorators are written inside a block comment `--[=[ ... ]=]` placed directly above the function definition. Tags start with an `@` symbol.

If no value is provided after a tag, it defaults to `true`.

```lua
local module = {}

--[=[
    This function performs a heavy task asynchronously.

    @async
    @server
    @deprecated Use NewFunction instead
    @example
        local result = module.DoWork(10)
        print(result)
]=]
function module.DoWork(value: number)
    task.wait(1)
    return value * 2
end
```

## Available Decorators

### Execution Context
- **`@client`**: Marks the function as Client-side only. 
- **`@server`**: Marks the function as Server-side only.

### Visibility & Documentation
- **`@hidden`**: Hides the function from auto-generated API listings or autocomplete suggestions.
- **`@deprecated [message]`**: Marks the function as deprecated. You can optionally provide a message.
- **`@example`**: Allows you to write code examples that might be surfaced in documentation tools.

### Behavior
- **`@async`**: Indicates that the function returns a Promise or yields, helping with static analysis and usage hints.

## Nested Indentation

You can nest tags for readability, although they are parsed flatly.

```lua
--[=[
    @client
        @hidden
    @server
        @deprecated
]=]
function module.ComplexBehavior()
    -- ...
end
```
