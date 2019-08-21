
`xOptions`
==========

All following options are not turned on by default. For simplicity, passing the `true` value directly opens all features except `xOptions.tag`.

If the input is not an object, but a function, it is treated as `xOptions.tag`, and all other features are turned on at the same time.

`xOptions.order`
----------------

*   type: `boolean`
*   default: `false`

Keep the key/value pairs order of tables.

`xOptions.longer`
-----------------

*   type: `boolean`
*   default: `false`

Allow the integer type value to exceed 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).

`xOptions.exact`
----------------

*   type: `boolean`
*   default: `false`

Disallow the float type value too large being `±Infinity`, too small being `±0`.

`xOptions.mix`
--------------

*   type: `boolean`
*   default: `false`

Mixed-type inline array support.

```
array = [
    ['Name', 'Age'],
    ['Senior Wang', 40],
    ['Junior Wang', 20],
]
```

`xOptions.multi`
----------------

*   type: `boolean`
*   default: `false`

Multi-line inline table support.  
Allow trailing comma, even no comma.

```
# Like inline array:
tableA = {
    x = 1,
    y = 2
}
tableB = {
    x = 1,
    y = 2,
}
# Like key/value pair:
tableC = {
    x = 1
    y = 2
}
[tableD]
x = 1
y = 2
```

`xOptions.null`
---------------

*   type: `boolean`
*   default: `false`

`null` value support (by `null` literal).

```
key = null
```

`xOptions.close`
----------------

*   type: `boolean`
*   default: `false`

Whether to disallow defining a table (like below) which itself has not been defined directly:

```
[a.b]

[a]
```

`xOptions.tag`
--------------

*   type:
    ```typescript
    function processorForEach (eachTaggedPosition :
        { table :Table,     key :string, array :undefined, index :undefined, tag :string } |
        { table :undefined, key :string, array :any[],     index :number,    tag :string } |
        { table :Table,     key :string, array :Table[],   index :number,    tag :string }
    ) :void;
    ```
*   default: `null`

```
KV_Pair = <tag> 'value'  # processorForEach({ table: root,      key: 'KV_Pair', array: undefined,    index: undefined, tag: 'tag' })

ArrayOf = <tag> [        # processorForEach({ table: root,      key: 'ArrayOf', array: undefined,    index: undefined, tag: 'tag' })
          <tag> 'value', # processorForEach({ table: undefined, key: undefined, array: root.ArrayOf, index: 0,         tag: 'tag' })
]

[Section] <tag>          # processorForEach({ table: root,      key: 'Section', array: undefined,    index: undefined, tag: 'tag' })

[[Items]] <tag>          # processorForEach({ table: root,      key: 'Items',   array: root.Items,   index: 0,         tag: 'tag' })
```

Tag content could include any character rather than `<` `>` <code>&#92;</code> `"` `'` <code>&#96;</code> CR LF U+2028 U+2029, but it must not be empty.

Tags are processed from after to before.

Note: This option requires `xOptions.mix` enabled at the same time, because the custom returned value could not be properly classified.

Because TOML has the limitation that root value can only be table for the time being, there is no tag representation designed to replace root table.  
Anyway, it is not difficult to deal with it after whole table returned.  
In the future, it is possible to add an extension method to remove both restrictions at the same time.
