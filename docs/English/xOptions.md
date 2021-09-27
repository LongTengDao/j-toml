
`xOptions`
==========

Only provide TSD support when `specificationVersion` is `0.4` or higher.

All following options are not turned on by default.

For simplicity, passing the `true` value directly opens all features except `xOptions.tag`; if the input is a function, it is treated as `xOptions.tag`, and all other features are turned on at the same time.

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

`xOptions.comment`
------------------

Whether to preserve comment information as much as possible (only comments written directly after key/value pairs or table headers), which will be set via the `symbol` returned by `TOML.commentFor(key)` in the table where `key` in.

```toml
key = 'value' # this is a key/value pair
dotted.key = 'value' # this is a dotted key/value pair
[table.header] # this is a table header (but it cannot be a table in an array of tables)
```

This will result in:

```javascript
( {
    [commentFor('key')]: ' this is a key/value pair',
    key: 'value',
    dotted: {
        [commentFor('key')]: ' this is a dotted key/value pair',
    	key: 'value',
    },
    table: {
    	[commentFor('header')]: ' this is a table header (but it cannot be a table in an array of tables)',
    	header: {},
    },
} )
```

`xOptions.tag`
--------------

*   type:
    ```typescript
    function processorForEach (eachTaggedPosition :
        { table :Table, key :string,                                tag :string } |
        {                            array :any[],   index :number, tag :string } |
        { table :Table, key :string, array :Table[], index :number, tag :string }
    ) :void;
    ```
*   default: `null`

```
KV_Pair = <tag> 'value'  # processorForEach({ table: root, key: 'KV_Pair',                                tag: 'tag' })

ArrayOf = <tag> [        # processorForEach({ table: root, key: 'ArrayOf',                                tag: 'tag' })
          <tag> 'value', # processorForEach({                              array: root.ArrayOf, index: 0, tag: 'tag' })
]

[Section] <tag>          # processorForEach({ table: root, key: 'Section',                                tag: 'tag' })

[[Items]] <tag>          # processorForEach({ table: root, key: 'Items',   array: root.Items,   index: 0, tag: 'tag' })
```

Tag content could include any non-control character rather than `<` `>` `(` `)` `[` `]` `{` `}` <code>&#92;</code> `"` `'` <code>&#96;</code> `#`, but it must not be empty.

Tags are processed from after to before.

Because TOML has the limitation that root value can only be table for the time being, there is no tag representation designed to replace root table.  
Anyway, it is not difficult to deal with it after whole table returned.  
In the future, it is possible to add an extension method to remove both restrictions at the same time.

Tag and its target must be in same line; while the target value after tag could be omitted (and `undefined` would be passed in as the value).

The `specificationVersion` must be `1.0` or higher, to support feasible mixed type array.
