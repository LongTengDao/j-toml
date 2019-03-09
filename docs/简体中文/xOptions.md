
`超级选项`
==========

`超级选项.order`
----------------

*   type: `boolean`
*   default: `false`

是否保持表中键值对的顺序。

`超级选项.longer`
-----------------

*   type: `boolean`
*   default: `false`

是否允许整数类型值超出 64 位范围（-9,223,372,036,854,775,808 至 9,223,372,036,854,775,807）限制。

`超级选项.mix`
--------------

*   type: `boolean`
*   default: `false`

是否允许混合类型的行内数组。

```
array = [
    ['Name', 'Age'],
    ['Senior Wang', 40],
    ['Junior Wang', 20],
]
```

`超级选项.multi`
----------------

*   type: `boolean`
*   default: `false`

是否允许多行写法的行内表。  
附带尾逗号支持和省略逗号支持。

```
# 类似行内数组：
tableA = {
    x = 1,
    y = 2
}
tableB = {
    x = 1,
    y = 2,
}
# 类似普通键值对：
tableC = {
    x = 1
    y = 2
}
[tableD]
x = 1
y = 2
```

`超级选项.null`
---------------

*   type: `boolean`
*   default: `false`

是否允许 `null` 值类型（`null` 字面量）。

```
key = null
```

`超级选项.nil`
--------------

*   type: `boolean`
*   default: `false`

是否允许 `null` 值类型（`nil` 字面量）。

```
key = nil
```

`超级选项.ins`
--------------

*   type: `boolean`
*   default: `false`

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

插值字符串原始解析结果总是以 `\n` 换行，而不会理睬 `multiLineJoiner` 参数。

`超级选项.new`
--------------

*   type: `{ [type]: function (value) { } }` / `function (type, value) { }`

```
key = !!type 'value'
```

注意：如果开启此选项，要求同时开启 `超级选项.mix`，因为无法妥善归类自定义类型。

`超级选项.hash`
---------------

*   type: `boolean`
*   default: `false`

是否保留注释内容。

```toml
# comment 0
[table] # comment 1
key = 'value' # comment 2
```

最终得到的表大抵相当于：

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

`超级选项.open`
--------------

*   type: `boolean`
*   default: `false`

允许定义一个没有被直接定义过的表（这未被 0.4 版本的规范禁止）：

```
[a.b]
[a]
```
