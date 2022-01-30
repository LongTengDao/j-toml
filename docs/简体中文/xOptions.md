
`超级选项`
==========

以下选项默认均不开启。

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

`超级选项.exact`
----------------

*   类型：`boolean`
*   默认值：`false`

是否禁止太大的浮点数自动变成 `±Infinity`、太小的浮点数自动变成 `±0` 或其它失去精度的情况发生。

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

`超级选项.literal`
------------------

*   类型：`boolean`
*   默认值：`false`

是否保留字符串、整数和浮点数的原始书写形态信息。

注意，这会导致原本解析结果中 `string | bigint | number` 类型的值变成 `object & String | object & BigInt | object & Number`。

`超级选项.comment`
------------------

*   类型：`boolean`
*   默认值：`false`

是否尽可能保留注释信息（仅限直接书写于键值、表头后面的注释），通过 `TOML.commentFor(key)` 得到的 `symbol` 安插在 `key` 所在的表中。

```toml
key = 'value' # 这是一个键值对
dotted.key = 'value' # 这是一个点分隔键值对
[table] # 这是一个表头
[[tables]] # 这是一个表数组中的头
```

这将得到：

```javascript
( {
    key: 'value', [commentFor('key')]: ' 这是一个键值对',
    dotted: {
        key: 'value', [commentFor('key')]: ' 这是一个点分隔键值对',
    },
    table: { [commentForThis]: ' 这是一个表头' }, [commentFor('table')]: ' 这是一个表头',
    tables: [
        { [commentForThis]: ' 这是一个表数组中的头' },
    ],
} )
```

`超级选项.string`
------------------

*   类型：`boolean`
*   默认值：`false`

禁用形似数字等的键：

```toml
3.14 = 0
-1 = 1
0.2-0.1 = 3
true = false
```

`超级选项.tag`
--------------

*   类型：
    ```typescript
    function 逐个处理器 (每个被标记处 :
        { table :Table, key :string,                                tag :string } |
        {                            array :any[],   index :number, tag :string } |
        { table :Table, key :string, array :Table[], index :number, tag :string }
    ) :void;
    ```
*   默认值：`null`

```
'键值对'   = <自定义标记> '值'  # 逐个处理器({ table: 根表, key: '键值对',                               tag: '自定义标记' })

'数组'     = <自定义标记> [     # 逐个处理器({ table: 根表, key: '数组',                                 tag: '自定义标记' })
             <自定义标记> '值', # 逐个处理器({                             array: 根表.数组,   index: 0, tag: '自定义标记' })
]

['小节']     <自定义标记>       # 逐个处理器({ table: 根表, key: '小节',                                 tag: '自定义标记' })

[['表数组']] <自定义标记>       # 逐个处理器({ table: 根表, key: '表数组', array: 根表.表数组, index: 0, tag: '自定义标记' })
```

标签内容可以是除 `<` `>` `(` `)` `[` `]` `{` `}` <code>&#92;</code> `"` `'` <code>&#96;</code> `#` 外的任何非控制字符，只是不得为空。

标签是从后往前处理的。

由于 TOML 本就存在根值只能是表的限制，所以暂时也没有设计能够替换根表的标记写法。  
反正在整体返回后再行处理，也不是难事。  
日后可能增加同时取消这两个限制的扩展方法。

标签必须与其作用目标在同一行；但其后的目标值可以缺省（此时传入值 `undefined`）。

需要 `规范版本` 为 `1.0` 以上，以支持可能的混合类型数组。
