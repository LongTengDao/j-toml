
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

`xOptions.tag`
--------------

*   type:
    ```typescript
    function processorForEach (each :
        { table :Table, key :string,                                tag :string }
        |
        {                            array :any[],   index :number, tag :string }
        |
        { table :Table, key :string, array :Table[], index :number, tag :string }
    ) :void
    ```
*   default: `null`

```
[sec.a (tag)]             # process({ table: root.sec, key: 'a',                                tag: 'tag' })

[sec.b] (tag)             # process({ table: root.sec, key: 'b',                                tag: 'tag' })

key.a (tag) = 'val' (tag) # process({ table: root.key, key: 'a',                                tag: 'tag' }) x2
key.b (tag) = (tag) 'val' # process({ table: root.key, key: 'b',                                tag: 'tag' }) x2

arr (tag) = (tag) [       # process({ table: root,     key: 'arr',                              tag: 'tag' }) x2
    'item' (tag),         # process({                               array: root.arr,  index: 0, tag: 'tag' })
    (tag) 'item',         # process({                               array: root.arr,  index: 1, tag: 'tag' })
]

[[list (tag)]] (tag)      # process({ table: root,     key: 'list', array: root.list, index: 0, tag: 'tag' }) x2
```

Do not write tags on both side of a value; for inline arrays and inline tables, tags may only be placed before them, not after them.

Tag content could include any character rather than `(` `)` <code>&#92;</code> `"` `'` <code>&#96;</code> CR LF U+2028 U+2029.

Tags are processed from after to before.

Note: This option requires `xOptions.mix` enabled at the same time, because the custom returned value could not be properly classified.
