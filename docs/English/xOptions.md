
`xOptions`
==========

All following options are not turned on by default.  

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

Disallow the float type value too large being `±Infinity`, too small being `±0`, or other loss of precision occurs.  

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

`xOptions.literal`
------------------

*   type: `boolean`
*   default: `false`

Whether to preserve original writing style information of string, integer and float.  

Note that this will cause `string | bigint | number` types in parsed result becoming `object & String | object & BigInt | object & Number`.  

`xOptions.comment`
------------------

*   type: `boolean`
*   default: `false`

Whether to preserve comment information as much as possible (only comments written directly after key/value pairs or table headers), which will be set via the `symbol` returned by `TOML.commentFor(key)` in the table where `key` in.  

```toml
key = 'value' # this is a key/value pair
dotted.key = 'value' # this is a dotted key/value pair
[table] # this is a table header
[[tables]] # this is a table header in array of tables
```

This will result in:  

```javascript
( {
    key: 'value', [commentFor('key')]: ' this is a key/value pair',
    dotted: {
        key: 'value', [commentFor('key')]: ' this is a dotted key/value pair',
    },
    table: { [commentForThis]: ' this is a table header' }, [commentFor('table')]: ' this is a table header',
    tables: [
        { [commentForThis]: ' this is a table header in array of tables' },
    ],
} )
```

`xOptions.string`
------------------

*   type: `boolean`
*   default: `false`

Disable keys shaped like number, etc.:  

```toml
3.14 = 0
-1 = 1
0.2-0.1 = 3
true = false
```

`xOptions.tag`
--------------

*   type:
    ```typescript
    function processorForEach (eachTaggedPosition :
        | { table :Table, key :string,                                tag :string }
        | {                            array :  any[], index :number, tag :string }
        | { table :Table, key :string, array :Table[], index :number, tag :string }
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

The `specificationVersion` must be `1.0` or higher (because of mixed type array support).  
