
`@ltd/j-toml`
=============

`@ltd/j-toml` 是龙腾道为[汤小明语](https://GitHub.com/LongTengDao/TOML/)（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。

Node.js
-------

```shell
npm install @ltd/j-toml
```

```javascript
const TOML = require('@ltd/j-toml');

const 源               = `
      '一个普通的键名' = '...'
      hasOwnProperty   = '...'
      constructor      = '...'
      __proto__        = '...'
`;

const 根表 = TOML.parse(源, '\n');

根表.一个普通的键名 // '...'
根表.hasOwnProperty // '...'
根表.constructor    // '...'
根表.__proto__      // '...'
根表.valueOf        // undefined

Object.keys(根表)   // [ '一个普通的键名', 'hasOwnProperty', 'constructor', '__proto__' ]
```

`TOML.parse`
------------

```
TOML.parse(源, 遵循规范版本, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse(源,               多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
```

```typescript
declare function parse (
    源 :源,
    遵循规范版本 :遵循规范版本,
    多行字符串拼接字符 :string,
    使用BigInt? :boolean | number,
    超级选项? :object,
) :表;

declare function parse (
    源 :源,
    多行字符串拼接字符 :string,
    使用BigInt? :boolean | number,
    超级选项? :object,
) :表;

type 源 = string | Buffer | { readonly path :string, readonly data? :string | Buffer };
type 遵循规范版本 = 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
type 表 = object;
```

### `arguments`

0.  #### `源`
    
    *   类型：`string | Buffer | { readonly path :string, readonly data? :string | Buffer }`
    *   必需
    
    你可以传入 `string`，也可以传入文件原始的二进制 `Buffer`（UTF-8）作为源内容。
    
    一个区别是，当传入 `string` 时，只会根据规范检查所有字符是否均为有效的 Unicode 字符（未配对的 UCS-4 字符码是无效的）；  
    而传入 `Buffer` 时，还会额外检查是否存在未知码点（而这在 `string` 状态下已经被自动替换为 `U+FFFD`）。
    
    另一个区别是，`Buffer` 允许以 UTF BOM（`U+FEFF`）开头，这会用于文件编码的确认（但它必须是 UTF-8 编码的，这不是技术问题，而是规范的要求），并在正式解析前跳过；  
    而 `string` 不允许，因为 BOM 属于 UTF 而非 TOML。
    
    如果你希望内容抛错时控制台信息更加友好，请传递一个 `{ path, data }` 对象，`path` 键是 `.toml` 文件的路径，`data` 键是源内容（`string` 或 `Buffer`）。  
    你也可以省略 `data` 键，此时 `fs.readFileSync(源.path)` 将被自动调用。
    
1.  #### `遵循规范版本`
    
    *   类型：`1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1`
    *   默认值：`1.0`
    
    如果没有特殊理由（例如下游程序尚不能妥善处置 `Infinity`、`NaN`、小数秒和极端时间值，各地日期时刻、各地日期、各地时刻类型，空字符串键名，混合类型的数组甚至表数组、数组数组下的表结构），建议使用最新的版本。
    
    当不指定此参数时，后续参数均需往前移动一位。
    
2.  #### `多行字符串拼接字符`
    
    *   类型：`string`
    *   必需
    
    对于多行字符串，用什么来拼接各行。  
    注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `'\n'` 或 `'\r\n'`。
    
3.  #### `使用BigInt`
    
    *   类型：`boolean | number`
    *   默认值：`true`
    
    指定你是否要用 `BigInt` 来实现整数类型的值。`number` 类型的参数允许你精确控制超过多少才使用 `BigInt`，例如 `Number.MAX_SAFE_INTEGER`（自动通过 `-使用BigInt` 获取负向界限，如果 `使用BigInt>=0`；否则通过 `-使用BigInt-1` 获取正向界限）。
    
4.  #### `超级选项`
    
    标准中所没有的扩展功能。  
    包括保持表中键值对的顺序、超出有符号长整型的整数、跨行行内表及尾逗号甚至省略逗号、`null` 值、自定义构造器等。  
    私有实验期功能，不建议随意使用。  
    详见[超级选项](https://GitHub.com/LongTengDao/j-toml/blob/master/docs/简体中文/xOptions.md)。

### `return`

*   类型：`表`

返回根表（本实现解析出的表，是没有任何继承属性的对象）。

### `throw`

*   类型：`Error`

参数不符合要求或源文本内有错误，均会抛出错误。

本库不会因为表或数组嵌套层数过深，或基础字符串中转义过多，或整数、浮点数中下划线过多，而意外地造成爆栈错误。

`TOML.parse[1.0]` `TOML.parse[0.5]` `TOML.parse[0.4]` `TOML.parse[0.3]` `TOML.parse[0.2]` `TOML.parse[0.1]`
-----------------------------------------------------------------------------------------------------------

```
TOML.parse[1.0](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse[0.5](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse[0.4](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse[0.3](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse[0.2](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
TOML.parse[0.1](源, 多行字符串拼接字符[, 使用BigInt = true[, 超级选项]]);
```

```typescript
declare const parse :{
    readonly [遵循规范版本 in 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1] :(
        源 :源,
        多行字符串拼接字符 :string,
        使用BigInt? :boolean | number,
        超级选项? :object,
    ) => 表
};
```

`TOML.stringify`
----------------

```
TOML.stringify(根表[, 选项]);
```

```typescript
declare function stringify (根表 :只读表, 选项? :{
    readonly newline? :'\n' | '\r\n',
    readonly newlineAround? :'document' | 'section' | 'header' | 'pairs' | 'pair',
    readonly indent? :string | number,
    readonly T? :'T' | ' ',
    readonly xNull? :boolean,
    readonly xBeforeNewlineInMultilineTable? :',' | '',
}) :string | string[];
```

### `arguments`

0.  #### `根表`
    
    *   类型：`只读表`
    *   必需
    
    一个只读对象，其自身的字符串键的值，仅限 TOML 所允许的类型。
    
1.  #### `选项`
    
    一个只读对象，其所包含的选项的约定如下。
    
    -   ##### `选项.newline`
        
        *   类型：`'\n' | '\r\n'`
        
        用什么作为序列化时的换行符。如果不指定该参数，函数的返回结果会是一个字符串数组（代表每一行），而不是一个字符串。
        
    -   ##### `选项.newlineAround`
        
        *   类型：`'document' | 'section' | 'header' | 'pairs' | 'pair'`
        *   默认值：`'header'`
        
        序列化时，于何处增加空行，以增进可读性。
        
        1.  `'document'`：仅确保文档以空行开始和结尾，以利于 git diff（当文档为空时，仅保留一个空行）；
        2.  `'section'`：进一步确保每一个小节（块级表）之间以空行分隔；
        3.  `'header'`：进一步确保每个块级表的表头与键值对之间以空行分隔；
        4.  `'pairs'`：进一步确保每个块级表的直属键值对之间以空行分隔（但点分隔键会被聚拢在一起）；
        5.  `'pair'`：进一步确保每个块级表（包括点分隔键在内）的所有键值对之间以空行分隔。
        
        其中，`'section'` 和 `'header'` 是实践中通常的最佳模式，前者更适合小节之间是并列的简单情况，后者则对并列或包含关系都较为友好（因此是默认模式）。
        
    -   ##### `选项.indent`
        
        *   类型：`string | number`
        *   默认值：`'\t'`
        
        对于多行模式下的静态数组，如何对数组项进行缩进。
        
        字符串值表示序列化时每级缩进所使用的字符（不允许包含 Tab 或空格之外的字符），数字值表示所使用的空格数量。
        
        注意，本库不会对块级表的键值对进行缩进，因为摆脱缩进是 TOML 存在的最本质性的价值。
        
    -   ##### `选项.T`
        
        *   类型：`'T' | ' '`
        *   默认值：`'T'`
        
        序列化时，用什么来分隔日期与时刻。
        
    -   ##### `选项.xNull`
        
        *   类型：`boolean`
        *   默认值：`false`
        
        是否允许将 `null` 值序列化（为 `null`）。
        
        如果不开启此选项，则遇到 `null` 值时，会像对待其它无法序列化的值一样抛出错误，因为这不是目前标准所允许的语法。
        
    -   ##### `选项.xBeforeNewlineInMultilineTable`
        
        *   类型：`',' | ''`
        
        对于被标记为多行模式的内联表，是否在换行符前使用逗号。
        
        注意，这不是目前标准所允许的语法，因此如果不明确指定该选项，则即便所传入的内联表被标记为多行模式，依然会按照单行模式序列化。

### `return`

*   类型：`string | string[]`

返回 TOML 文档的字符串，或逐行字符串所构成的数组。具体取决于上文 `选项.newline` 是否被指定。

### `throw`

*   类型：`Error`

选项不符合要求，或所序列化的数据中存在不支持的值类型，或最终运算出的结果体积超出了上限，均会抛出错误。

本库不会因为表或数组嵌套层数过深，而意外地造成爆栈错误。

`TOML.Section` `TOML.inline` `TOML.multiline` `TOML.literal` `TOML.commentFor`
------------------------------------------------------------------------------

由于 TOML 语法的灵活性，在极大地满足了人直接阅读和书写的需求的同时，一度给序列化方案造成了巨大的困难。

本库提供了几个辅助函数，以尝试终结这个难题。

考虑到 JS 代码阅读和书写形态，本库对待未作标记的表对象的默认形式，是点分隔键值对（除非该表位于不可能如此操作的层级，或者表是一个空表，这些情况下会默认序列化为内联表）。  
你可以用 `Section` 函数将表标记为独立的小节（并返回所传入的表），或用 `inline` 函数将表标记为内联表（返回值同样是所传入的表）。  
你也可以用 `multiline` 函数将表标记为多行模式的内联表（返回传入表），不过注意这并不是目前标准所允许的语法（记得在序列化时指定 `选项.xBeforeNewlineInMultilineTable` 以使此类标记不被忽略）。

```javascript
TOML.stringify({
    key: 'value',
    dotted: {
        key: 'value',
    },
    inlineTable: inline({ key: 'value' }),
    mix: {
        key: 'value',
        table: Section({
            key: 'value',
        }),
    },
    table: Section({
        key: 'value',
        table: Section({
            key: 'value',
        }),
    }),
});
```

```toml

key = 'value'
dotted.key = 'value'
inlineTable = { key = 'value' }
mix.key = 'value'

[mix.table]

key = 'value'

[table]

key = 'value'

[table.table]

key = 'value'

```

一个不为空，且值为 `Section` 标记的表的数组，会被作为“表数组”序列化。  
否则，数组默认被作为多行模式的静态数组看待。如果你希望单行表示，可以用 `inline` 函数进行标记。

```javascript
TOML.stringify({
    staticArray: [
        'string',
        { },
    ],
    staticArray_singleline: inline([ 1.0, 2n ]),
    arrayOfTables: [
        Section({
        }),
    ],
});
```

```toml

staticArray = [
    'string',
    { },
]
staticArray_singleline = [ 1.0, 2 ]

[[arrayOfTables]]

```

另一个痛点是注释。我们显然不希望一份包含注释的配置文档，在经过了程序的修改后，丢失了全部的注释信息。  
现在，你可以在表中书写 `[commentFor(key)]` 键（这会得到一个 `symbol` 键，其键值应为注释内容字符串），这样，在最终的序列化结果中，`key` 键对应的键值后面就会跟上这个注释了！

```javascript
TOML.stringify({
    [commentFor('key')]: ' 这是一个键值对',
    key: 'value',
    dotted: {
        [commentFor('key')]: ' 这是一个点分隔键值对',
        key: 'value',
    },
    table: {
        [commentFor('header')]: ' 这是一个表头（不能是表数组中的表）',
        header: Section({
        }),
    },
});
```

```toml

key = 'value' # 这是一个键值对
dotted.key = 'value' # 这是一个点分隔键值对

[table.header] # 这是一个表头（不能是表数组中的表）

```

本库中 `parse` 出来的数据，会保留对以上书写形式的记忆，不必在修改后的重新序列化时再次全部手动标记。

最后剩下了字符串、整数和浮点数。它们的书写选择过于细碎，目前没有比较完美的针对性（而不使得事情更加麻烦）的方案来标记；同时它们属于原子值，也没有较好的方式在 `parse` 出的数据中保留这些偏好。  
本库为此提供了 `literal` 和 `multiline`（字符串场景）、`multiline.basic`（强制使用多行基础字符串，而不是优先尝试的多行字面量字符串） 几个辅助函数。

当你需要直接序列化一个全新的临时数据时，直接使用 `literal` 来规定具体的书写形式：

```javascript
TOML.stringify({
    underscore: literal`1_000`,
    zero: literal`10.00`,
    base: literal`0o777`,
    mark: inline([ '+10e10', '+inf' ].map(literal)),
    multilineString: literal`"""
1\b2
3"""`,
});
```

```toml

underscore = 1_000
zero = 10.00
base = 0o777
mark = [ +10e10, +inf ]
multilineString = """
1\b2
3"""

```

其中，当多行字符串的内容来自一个变量时（比如 `parse` 出的历史结果），`multiline`（字符串场景）会起到作用：

```toml

base = 0o777
multilineString = """
1\b2
3"""

```

```javascript
const table = TOML.parse('/path/to/example.toml', '\n');

table.base = TOML.literal('0o' + table.base.toString(8).padStart(3, '0'));
table.multilineString = TOML.multiline(table.multilineString + '\b4');

TOML.stringify(table);
```

```toml

base = 0o777
multilineString = """
1\b2
3\b4"""

```

`multiline`（字符串场景）默认会将传入的字符串以 `'\n'` 做行切割，比如 `'1\b2\n3\b4'` 会被理解为 `[ '1\b2', '3\b4' ]`。  
但是如果你的需求非常刁钻，比如你的数据是以 `TOML.parse(源, '\b')` 的方式解析的，那么你可以直接传入已经分隔好行的字符串数组 `'1\b2\n3\b4'.split('\b')`（即 `[ '1', '2\n3', '4' ]`），最终的序列化结果将是：

```toml
multilineString = """
1
2\n3
4"""
```

需要注意的是，`literal` 或 `multiline`（字符串场景）、`multiline.basic` 返回的并不是一个原子值，而是一个占位对象，这意味着这份数据将仅能用于 `stringify`，而不能再做其它用途。  
这确实有些麻烦，再加上还需要一并标记其它未经修改的数据，体验确实非常糟糕。  
在频繁出现此场景的程序中，可以考虑将 `parse` 出的表转化为一个包含 `toTOML` 之类方法的类实例，在其中规定各属性的序列化方案，并在 `stringify` 时使用这个副本，这样可以大大改善体验：

```javascript
const model = new class {
    base;
    multilineString;
    constructor (table) {
        this.base = table.base;
        this.multilineString = table.multilineString;
        return this;
    }
    toTOML () {
        return {
            base: TOML.literal('0o' + this.base.toString(8).padStart(3, '0')),
            multilineString: TOML.multiline(this.multilineString),
        };
    }
}(TOML.parse('/path/to/example.toml', '\n'));

model.multilineString += '\b4';

TOML.stringify(model.toTOML());
```
