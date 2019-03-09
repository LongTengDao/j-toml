
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

`xOptions.nil`
--------------

*   type: `boolean`
*   default: `false`

`null` value support (by `nil` literal).

```
key = nil
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

keyC = `
NAME open SITE.
Nice.
` ( 'NAME'="Mr. \u0043", 'PLACE'='GitHub' )

keyD = `
Mr. C open GitHub,
saw `x<y`.
` ( '<'='&lt;' ) ( /`(.*?)`/g = '<code>$1</code>' ) ( "\n"=' ' )

keyE = `
Mr. \x43 open GitHub.
` ( /\\x\d{2}/g = { '\x43'='C' } )

keyF = `
{{ NAME | Mr }} open {{ SITE }}.
` ( /{{ *(.*?) *(?:\| *(.*?) *)?}}/g = ['$2$1',{ 'NAME'='Mr. C', 'SITE'='GitHub' }, { 'Mr'='Mr. ' }] )
```

In JSON land, that would give you the following structure:

```json
{
    "keyA": "value `A`",
    "keyB": "`value` A",
    "keyC": "Mr. C open GitHub.\nNice.",
    "keyE": "Mr. C open GitHub, saw <code>x&lt;y</code>.",
    "keyD": "Mr. C open GitHub.",
    "keyF": "Mr. C open GitHub."
}
```

The original parsed result of interpolation string always use `\n` as newline, not the value set by parameter `multiLineJoiner`.

`xOptions.new`
--------------

*   type: `{ [type]: function (value) { } }` / `function (type, value) { }`

```
key = !!type 'value'
```

Note: This option requires `xOptions.mix` enabled at the same time, because the custom types could not be properly classified.

`xOptions.hash`
---------------

*   type: `boolean`
*   default: `false`

Comments information.

```toml
# comment 0
[table] # comment 1
key = 'value' # comment 2
```

In JavaScript land, that would give you the following structure:

```js
({
    [Symbol('#')]: ' comment 0',
    table: {
    	key: 'value',
    	[Symbol.for('key')]: ' comment 2'
    },
    [Symbol.for('table')]: ' comment 1'
})
```

`xOptions.open`
--------------

*   type: `boolean`
*   default: `false`

Allow to define a table which is not directly defined (it's valid in spec version 0.4):

```
[a.b]
[a]
```
