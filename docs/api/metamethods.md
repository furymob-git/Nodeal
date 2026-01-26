# Custom Metamethods

These special keys can be added to your metatables to unlock Nodeal-specific behaviors.

## Keys

### `__type`

Defines the custom type string returned by `typeof()`.

**Usage:**
```lua
mt.__type = "MyCustomClassName"
```

- **Value**: `string`
- **Effect**: `typeof(obj)` will return this string instead of "userdata" or "table".

---

### `__unpack`

Defines the behavior of the global `unpack()` function when called on this local object.

**Usage:**
```lua
mt.__unpack = function(self)
    return self._internalValue
end
```

- **Value**: `function(self) -> ...`
- **Effect**: `unpack(obj)` calls this function and returns its results.
