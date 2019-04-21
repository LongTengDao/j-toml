
`超级选项`
==========

`超级选项.order`
----------------

*   类型：`boolean`
*   默认值：`false`

是否保持表中键值对的顺序。

`超级选项.longer`
-----------------

*   类型：`boolean`
*   默认值：`false`

是否允许整数类型值超出 64 位范围（-9,223,372,036,854,775,808 至 9,223,372,036,854,775,807）限制。

`超级选项.mix`
--------------

*   类型：`boolean`
*   默认值：`false`

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

*   类型：`boolean`
*   默认值：`false`

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

*   类型：`boolean`
*   默认值：`false`

是否允许 `null` 值类型（`null` 字面量）。

```
key = null
```

`超级选项.close`
----------------

*   类型：`boolean`
*   默认值：`false`

是否禁止（如下所示地）定义一个本身没有被直接定义过的表：

```
[a.b]

[a]
```

`超级选项.tag`
--------------

*   类型：
    ```typescript
    function 逐个调用的处理器 (每个 :
        { table :Table, key :string,                                tag :string } |
        {                            array :any[],   index :number, tag :string } |
        { table :Table, key :string, array :Table[], index :number, tag :string }
    ) :void
    ```
*   默认值：`null`

```
KV_Pair = <tag> '值'  # 处理({ table: root, key: 'KV_Pair',                                tag: 'tag' })

ArrayOf = <tag> [     # 处理({ table: root, key: 'arrayOf',                                tag: 'tag' })
          <tag> '值', # 处理({                              array: root.arrayOf, index: 0, tag: 'tag' })
]

[Section] <tag>       # 处理({ table: root, key: 'section',                                tag: 'tag' })

[[Items]] <tag>       # 处理({ table: root, key: 'items',   array: root.items,   index: 0, tag: 'tag' })
```

不要在值的两侧同时使用标签；对于行内数组、行内表，标签只能在它们的前面，而不能在后面。

标签内容可以是除 `<` `>` <code>&#92;</code> `"` `'` <code>&#96;</code> CR LF U+2028 U+2029 以外的任何字符。

标签是从后往前处理的。

注意：如果开启此选项，要求同时开启 `超级选项.mix`，因为无法妥善归类自定义返回值。

`超级选项.ins`
--------------

*   类型：`boolean`
*   默认值：`false`

是否开启插值字符串支持。

```
keyA = `
value `A`
`

keyB = ``
`value` A
``

```

用 JSON 表示解析出的内容就是：

```json
{
    "keyA": "value `A`",
    "keyB": "`value` A"
}
```

插值字符串原始解析结果总是以 `\n` 换行，而不会理睬 `multiLineJoiner` 参数。
