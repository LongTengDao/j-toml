
`xOptions`
==========

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
    function processorForEach (each :
        { table :Table, key :string, array :null,                   tag :string } |
        { table :null,               array :any[],   index :number, tag :string } |
        { table :Table, key :string, array :Table[], index :number, tag :string }
    ) :void
    ```
*   default: `null`

```
KV_Pair = <tag> 'value'  # process({ table: root, key: 'KV_Pair', array: null,                   tag: 'tag' })

ArrayOf = <tag> [        # process({ table: root, key: 'arrayOf', array: null,                   tag: 'tag' })
          <tag> 'value', # process({ table: null,                 array: root.arrayOf, index: 0, tag: 'tag' })
]

[Section] <tag>          # process({ table: root, key: 'section', array: null,                   tag: 'tag' })

[[Items]] <tag>          # process({ table: root, key: 'items',   array: root.items,   index: 0, tag: 'tag' })
```

Tag content could include any character rather than `<` `>` <code>&#92;</code> `"` `'` <code>&#96;</code> CR LF U+2028 U+2029.

Tags are processed from after to before.

Note: This option requires `xOptions.mix` enabled at the same time, because the custom returned value could not be properly classified.

`xOptions.ins`
--------------

*   type: `boolean`
*   default: `false`

Interpolation string support.

```
keyA = `
value `A`
`

keyB = ``
`value` A
``
```

In JSON land, that would give you the following structure:

```json
{
    "keyA": "value `A`",
    "keyB": "`value` A"
}
```

The original parsed result of interpolation string always use `\n` as newline, not the value set by parameter `multiLineJoiner`.
