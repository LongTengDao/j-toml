
`xOptions`
==========

`xOptions.longer`
-----------------

*   type: `boolean`
*   default: `false`

Allow the integer type value to exceed 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).  
是否允许整数类型值超出 64 位范围（-9,223,372,036,854,775,808 至 9,223,372,036,854,775,807）限制。

`xOptions.mix`
--------------

*   type: `boolean`
*   default: `false`

Mixed-type inline array support.  
是否允许混合类型的行内数组。

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
是否允许多行写法的行内表。  
附带尾逗号支持和省略逗号支持。

```

# Like inline array:
# 类似行内数组：

tableA = {
    x = 1,
    y = 2
}

tableB = {
    x = 1,
    y = 2,
}

# Like key/value pair:
# 类似普通键值对：

tableC = {
    x = 1
    y = 2
}

x = 1
y = 2

```

`xOptions.null`
---------------

*   type: `boolean`
*   default: `false`

`null` value support (by `null` literal).  
是否允许 `null` 值类型（`null` 字面量）。

```
key = null
```

`xOptions.nil`
--------------

*   type: `boolean`
*   default: `false`

`null` value support (by `nil` literal).  
是否允许 `null` 值类型（`nil` 字面量）。

```
key = nil
```

`xOptions.ins`
--------------

*   type: `boolean`
*   default: `false`

Interpolation string support.  
是否开启插值字符串支持。

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
用 JSON 表示解析出的内容就是：

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
插值字符串原始解析结果总是以 `\n` 换行，而不会理睬 `multiLineJoiner` 参数。

`xOptions.new`
--------------

*   type: `{ [type]: function (value) { } }` / `function (type, value) { }`

```
key = !!type 'value'
```

`xOptions.hash`
---------------

*   type: `boolean`
*   default: `false`

Comments information (as much as possible).  
是否（尽可能）保留注释内容。

```toml
# comment 0
[table] # comment 1
key = 'value' # comment 2
```

In JavaScript land, that would give you the following structure:  
最终得到的表大抵相当于：

```js
({
    table: {
    	key: 'value',
    	[Symbol.for('key')]: ' comment 2'
    },
    [Symbol.for('table')]: ' comment 1'
})
```