# Global Functions

Nodeal overrides or adds several global functions to support its advanced type and proxy systems.

## Functions

### `newproxy`

Creates a specialized userdata proxy. In Nodeal, this is enhanced to support wrapping objects and reciprocal unpacking.

**Signature:**
```lua
newproxy(addMetatable: boolean | any) -> Userdata
```

- **addMetatable**: If `true`, creates a blank proxy with a metatable. If an object is passed, it may create a proxy wrapping that object.

---

### `unpack`

Unpacks a list or a proxy.

**Signature:**
```lua
unpack(target: table | Userdata, ...) -> ...
```

- **target**: The table to unpack, or a Nodeal proxy.
- **Behavior**:
    - If `target` is a standard table: Behaves like standard `table.unpack`.
    - If `target` is a Nodeal proxy: 
        - If the proxy has an `__unpack` metamethod, calls it.
        - If the proxy was created by wrapping an object, returns the wrapped object.

---

### `typeof`

Returns the type of the object, respecting custom metamethods.

**Signature:**
```lua
typeof(object: any) -> string
```

- **Behavior**: Checks for the `__type` field in the object's metatable. If present, returns that string. Otherwise, performs standard Luau type checking.
