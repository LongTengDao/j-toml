
`@ltd/j-toml`
=============

`@ltd/j-toml` 是龙腾道为[汤小明语](https://GitHub.com/LongTengDao/TOML/)（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对被配置文件折腾到爆炸的人而言。  

Node.js 14+
-----------

```shell
npm install @ltd/j-toml
```

```javascript
const TOML = require('@ltd/j-toml');// 或：import * as TOML from '@ltd/j-toml';

const 源               = `
      '一个普通的键名' = '...'
      hasOwnProperty   = '...'
      constructor      = '...'
      __proto__        = '...'
`;

const 根表 = TOML.parse(源);

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
TOML.parse(源[, 选项]);
```

```typescript
declare function parse (源 :源, 选项? :{
    joiner? :string,
    bigint? :boolean | number,
    x? :超级选项,
}) :表;

type 源 = string | ArrayBufferLike | Readonly<
    | { path :string, data :string | ArrayBufferLike, require? :NodeRequire }
    | { path :string,                                 require  :NodeRequire }
>;
type 超级选项 = object;
type 表 = object;
```

### `arguments`（对象模式）

0.  #### `源`
    
    *   类型：`string` / `ArrayBufferLike` / `Readonly<{ path :string, data :string | ArrayBufferLike, require? :NodeRequire }>` / `Readonly<{ path :string, require :NodeRequire }>`
    *   必需
    
    你可以传入 `string`，也可以传入 UTF-8 编码的文件原始二进制数据 `ArrayBufferLike`（`Buffer` / `Uint8Array` / `ArrayBuffer`）作为源内容。  
    
    一个区别是，当传入 `string` 时，只会根据规范检查所有字符是否均为有效的 Unicode 字符（未配对的 UCS-4 字符码是无效的）；  
    而传入 `ArrayBufferLike` 时，还会额外检查是否存在未知码点（而这在 `string` 状态下已经被自动替换为 `U+FFFD`）。  
    
    另一个区别是，`ArrayBufferLike` 允许以 UTF BOM（`U+FEFF`）开头，这会用于文件编码的确认（但它必须是 UTF-8 编码的，这不是技术问题，而是规范的要求），并在正式解析前跳过；  
    而 `string` 不允许，因为 BOM 属于 UTF 而非 TOML。  
    
    如果你希望内容抛错时控制台信息更加友好，请传递一个 `{ path, data }` 对象，`path` 属性是 `.toml` 文件的路径，`data` 属性是文件的内容（`string` 或 `ArrayBufferLike`）。  
    你也可以省略 `data` 属性，此时必须传入 `require` 属性，因为需要使用 `require('fs').readFileSync` 接口来读取。  
    不论是否传入 `data`，只要能够获取到 `$ = require?.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '')`，都会通过 `require('path').resolve($, 源.path)` 来获取绝对路径。  
    
1.  #### `选项`
    
    一个可选的只读对象，其所包含的选项如下：  
    
    -   ##### `选项.joiner`
        
        *   类型：`string`
        *   可选
        
        对于多行基础字符串和多行字面量字符串，用什么来拼接各行、生成解析结果。  
        注意，在解析 TOML 源时，按照规范的要求，文档的行分隔符总是 `'\n'` 或 `'\r\n'`，**与此参数无关**，不要混淆。  
        
        **如果没有传入该参数**，那么解析过程将在遇到需要该参数的位置（包含不被忽略的换行的多行字符串）抛出错误：  
        
        ```toml
        error = """
        此例中前两个换行没事，\
        第三个换行会触发报错。
        """
        ```
        
    -   ##### `选项.bigint`
        
        *   类型：`boolean` / `number`
        *   缺省值：`true`
        
        指定你是否要用 `BigInt` 来实现整数类型的值。`number` 类型的参数允许你精确控制超过多少才使用 `BigInt`，例如 `Number.MAX_SAFE_INTEGER`（自动通过 `-选项.bigint` 获取负向界限，如果 `选项.bigint>=0`；否则通过 `-选项.bigint-1` 获取正向界限）。  
        
    -   ##### `选项.keys`
        
        *   类型：`TOML.Keys` / `null`
        *   缺省值：`null`
        
        为解析出的键名限制一个安全清单，用于避免哈希攻击。通过传递给 `TOML.Keys` 一个字符串数组来构造。  
        
    -   ##### `选项.x`
        
        标准中所没有的扩展功能。  
        包括保持表中键值对的顺序、超出有符号长整型的整数、跨行行内表及尾逗号甚至省略逗号、`null` 值、自定义构造器等。  
        私有实验期功能，不建议随意使用。  
        详见[超级选项](https://GitHub.com/LongTengDao/j-toml/blob/master/docs/简体中文/xOptions.md)。  

### `arguments`（传统模式）

0.  #### `源`
    
    见前文“对象模式”的 `源`。  
    
1.  #### `规范版本`
    
    *   类型：`1.0` / `0.5` / `0.4` / `0.3` / `0.2` / `0.1`
    *   缺省值：`1.0`
    *   不推荐：请改用 `TOML.parse[规范版本]`
    
    注意：当不指定此参数时，后续参数均需往前移动一位。  
    
2.  #### `多行字符串拼接字符`
    
    见前文“对象模式”的 `选项.joiner`。  
    
3.  #### `使用BigInt`
    
    见前文“对象模式”的 `选项.bigint`。  
    
4.  #### `超级选项`
    
    见前文“对象模式”的 `选项.x`。  

### `return`

*   类型：`表`

返回根表（本实现解析出的表，是没有任何继承属性的对象）。  

注意：TOML 四类日期时刻的需求并不能完全对应原生的 `Date` 类型，它们是本库在 `Date` 的基础上实现的，详见 `.d.ts` 文件（`OffsetDateTime`、`LocalDateTime`、`LocalDate`、`LocalTime`，其中 `OffsetDateTime` 提供了不限精度的小数秒支持）。  

### `throw`

*   类型：`Error`

参数不符合要求或源文本内有错误，均会抛出错误。魔改传入参数引发的解析期内嵌套解析的行为亦会被阻断。  

本库不会因为表或数组嵌套层数过深，或基础字符串中转义过多，或整数、浮点数中下划线过多，而意外地造成爆栈错误。  

`TOML.parse[1.0]` `TOML.parse[0.5]` `TOML.parse[0.4]` `TOML.parse[0.3]` `TOML.parse[0.2]` `TOML.parse[0.1]`
-----------------------------------------------------------------------------------------------------------

本库对于低版本 TOML 规范的支持策略，是以不造成不必要的解析错误为准则的。  
比如，`""""Hi!""""` 虽然是 1.0 才表示支持的，但在 0.5 中 `'"Hi!"'` 也完全可以得到同样的值，因此解释器并不会报错；  
而 `inf` 直到 0.5 才可能被表达，因此为避免 0.4 兼容的下游程序没有考虑过这种情况而造成预期外的行为，解释器才会表现出视版本而不同的报错行为。  

因此，如果没有特定的理由（例如下游程序尚不能妥善处置 `Infinity`、`NaN`、小数秒和极端时间值，各地日期时刻、各地日期、各地时刻类型，空字符串键名，混合类型的数组甚至表数组、数组数组下的表结构），建议使用最新的版本。  

### `arguments`（对象模式）

0.  #### `源`
    
    参见前文 `TOML.parse`。  
    
1.  #### `选项`
    
    参见前文 `TOML.parse`。  

### `arguments`（传统模式）

0.  #### `源`
    
    参见前文 `TOML.parse`。  
    
1.  #### `多行字符串拼接字符`
    
    参见前文 `TOML.parse`。  
    
2.  #### `使用BigInt`
    
    参见前文 `TOML.parse`。  
    
3.  #### `超级选项`
    
    参见前文 `TOML.parse`。  

### `return`

参见前文 `TOML.parse`。  

### `throw`

参见前文 `TOML.parse`。  

`TOML.stringify`
----------------

```
TOML.stringify(根表[, 选项]);
```

```typescript
declare function stringify (根表 :只读表, 选项? :Readonly<{
    integer? :number,
    newline? :'\n' | '\r\n',
    newlineAround? :'document' | 'section' | 'header' | 'pairs' | 'pair',
    indent? :string | number,
    T? :'T' | 't' | ' ',
    Z? :'Z' | 'z',
    xNull? :boolean,
    xBeforeNewlineInMultilineTable? :',' | '',
    forceInlineArraySpacing? :0 | 1 | 2 | 3,
}>) :string | string[];
```

### `arguments`

0.  #### `根表`
    
    *   类型：`只读表`
    *   必需
    
    一个只读对象，其自身的字符串键的值，仅限 TOML 所允许的类型。  
    
1.  #### `选项`
    
    一个可选的只读对象，其所包含的选项的约定如下：  
    
    -   ##### `选项.integer`
        
        *   类型：`number`
        *   可选
        
        指定是否要将某个范围内的 `number` 类型的整数值序列化为 TOML 整数。该参数允许你精确控制这个范围，例如 `Number.MAX_SAFE_INTEGER`（自动通过 `-选项.integer` 获取负向界限，如果 `选项.integer>=0`；否则通过 `-选项.integer-1` 获取正向界限）。  
        
    -   ##### `选项.newline`
        
        *   类型：`'\n'` / `'\r\n'`
        *   可选
        
        用什么作为序列化时的换行符。**如果不指定该参数**，函数的返回结果会是一个字符串数组（代表每一行），而不是一个字符串。  
        
    -   ##### `选项.newlineAround`
        
        *   类型：`'document'` / `'section'` / `'header'` / `'pairs'` / `'pair'`
        *   缺省值：`'header'`
        
        序列化时，于何处增加空行，以增进可读性。  
        
        1.  `'document'`：仅确保文档以空行开始和结尾，以利于 git diff（当文档为空时，仅保留一个空行）；
        2.  `'section'`：进一步确保每一个小节（块级表）之间以空行分隔；
        3.  `'header'`：进一步确保每个块级表的表头与键值对之间以空行分隔；
        4.  `'pairs'`：进一步确保每个块级表的直属键值对之间以空行分隔（但点分隔键会被聚拢在一起）；
        5.  `'pair'`：进一步确保每个块级表（包括点分隔键在内）的所有键值对之间以空行分隔。
        
        其中，`'section'` 和 `'header'` 是实践中通常的最佳模式，前者更适合小节之间是并列的简单情况，后者则对并列或包含关系都较为友好（因此是默认模式）。  
        
    -   ##### `选项.indent`
        
        *   类型：`string` / `number`
        *   缺省值：`'\t'`
        
        对于多行模式下的静态数组，如何对数组项进行缩进。  
        
        字符串值表示序列化时每级缩进所使用的字符（不允许包含 Tab 或空格之外的字符），数字值表示所使用的空格数量。  
        
        注意，本库不会对块级表的键值对进行缩进，因为摆脱缩进是 TOML 存在的最本质性的价值。  
        
    -   ##### `选项.T`
        
        *   类型：`'T'` / `'t'` / `' '`
        *   缺省值：`'T'`
        
        序列化时，用什么来分隔日期与时刻。  
        
    -   ##### `选项.Z`
        
        *   类型：`'Z'` / `'z'`
        *   缺省值：`'Z'`
        
        如何表示时区偏移量 `Z`。  
        
    -   ##### `选项.preferCommentFor`
        
        *   类型：`'key'` / `'this'`
        *   缺省值：`'key'`
        
        详见后文**注释**部分。  
        
    -   ##### `选项.xNull`
        
        *   类型：`boolean`
        *   缺省值：`false`
        
        是否允许将 `null` 值序列化（为 `null`）。  
        
        如果不开启此选项，则遇到 `null` 值时，会像对待其它无法序列化的值一样抛出错误，因为这不是目前标准所允许的语法。  
        
    -   ##### `选项.xBeforeNewlineInMultilineTable`
        
        *   类型：`','` / `''`
        *   可选
        
        对于被标记为多行模式的内联表，是否在换行符前使用逗号。  
        
        注意，这不是目前标准所允许的语法，因此如果不明确指定该选项，则即便所传入的内联表被标记为多行模式，依然会按照单行模式序列化。  
        
    -   ##### `选项.forceInlineArraySpacing`
        
        *   类型：`0` / `1` / `2` / `3`
        *   可选
        
        无视每个单行静态数组的原始书写偏好，统一按照指定模式序列化。  
        
        |     | 空数组 | 非空数组     |
        |:---:|:------:|:-------------:|
        | `0` | `[]`   | `[0, 1, 2]`   |
        | `1` | `[ ]`  | `[0, 1, 2]`   |
        | `2` | `[]`   | `[ 0, 1, 2 ]` |
        | `3` | `[ ]`  | `[ 0, 1, 2 ]` |

### `return`

*   类型：`string` / `string[]`

返回 TOML 文档的字符串，或逐行字符串所构成的数组。具体取决于上文 `选项.newline` 是否被指定。  

### `throw`

*   类型：`Error`

选项不符合要求，或所序列化的数据中存在不支持的值类型，或最终运算出的结果体积超出了上限，均会抛出错误。  

本库不会因为表或数组嵌套层数过深，而意外地造成爆栈错误。  

`TOML.Section` `TOML.inline` `TOML.multiline` `TOML.multiline.array` `TOML.multiline.basic` `TOML.basic` `TOML.literal` `TOML.commentFor` `TOML.commentForThis` `TOML.isSection` `TOML.isInline`
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

由于 TOML 语法的灵活性，在极大地满足了人直接阅读和书写的需求的同时，一度给序列化方案造成了巨大的困难。  

本库提供了几个辅助函数，以尝试终结这个难题。  

---

首先是**表**和**数组**。  

考虑到 JS 代码阅读和书写形态，**本库对待未作标记的表的默认形式**，是点分隔键值对（除非该表是一个空表或位于不可能如此操作的层级，这些情况下会自动序列化为内联表）。  
你可以用 `Section` 函数将表标记为独立的小节（并返回所传入的表），或用 `inline` 函数将表标记为内联表（返回值同样是所传入的表）。  
你也可以用 `multiline` 函数将表标记为多行模式的内联表（返回传入表），不过注意这并不是目前标准所允许的语法（记得在序列化时指定 `选项.xBeforeNewlineInMultilineTable` 以使此类标记不被忽略）。  

```javascript
stringify({
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

一个不为空，且值为 `Section` 标记的表的数组，会被作为“表数组”序列化。注意，一个数组的子项必须全是或全不是 `Section` 标记的表。  
否则，**数组默认被作为多行模式的静态数组看待**。如果你希望单行表示，可以用 `inline` 函数进行标记（`multiline.array` 可以进行逆操作）。  
`inline` 的第二个参数可以让你对数组序列化时的空格有更精细的控制。`2` 表示在两侧方括号与值之间加入空格，`1` 表示空数组中包含空格，`3` 为同时开启，`0` 为同时关闭。缺省值为 `3`。当开启 `选项.forceInlineArraySpacing` 时，该设置会被忽略。  

这种默认行为与多数实现库不同，而且略麻烦一点（多数情况下人们预期一个由对象构成的数组，默认被序列化为“表数组”）。  
这样设计的根本的理由是，考虑到 JS 代码阅读和书写形态，“表数组”应当在代码中看起来比静态数组醒目，且与小节表的样貌保持一致。  

```javascript
stringify({
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

本库中 `parse` 出来的数据，会保留对以上书写形式的记忆，不必在修改后的重新序列化时再次全部手动标记。  
你可以透明地通过 `isSection` 和 `isInline`，得知所 `parse` 出的表是以何种形式书写的。  

---

另一个痛点是**注释**。我们显然不希望一份包含注释的配置文档，在经过了程序的修改后，丢失了全部的注释信息。  
不过注释性质上终究是注释，`parse` 时这一功能默认是关闭的，你需要通过 `超级选项.comment` 来明确地要求这样做。  

如果是全新的数据，你可以在表中显式地书写 `[commentFor(key)]` 键（这会得到一个 `symbol` 键，其键值应为注释内容字符串，`parse` 时保留注释的功能也是基于同样的机制），这样，在最终的序列化结果中，`key` 键对应的键值后面就会跟上这个注释了！（注意注释中不能包含换行，否则会报错。）  

```javascript
stringify({
    
    key: 'value', [commentFor('key')]: ' 这是一个键值对',
    dotted: {
        key: 'value', [commentFor('key')]: ' 这是一个点分隔键值对',
    },
    
    [commentFor('table')]: ' 这是一个表头',
    table: Section({ [commentForThis]: '也可以把表头注释写在里面',
    }),
    // 但两种写法同时存在且值不同时，以 `选项.preferCommentFor` 指定的写法的值为准
    
    tables: [
        Section({ [commentForThis]: ' 这是一个表数组中的表头',
        }),
    ],
    
});
```

```toml

key = 'value' # 这是一个键值对
dotted.key = 'value' # 这是一个点分隔键值对

[table] # 这是一个表头

[[tables]] # 这是一个表数组中的表头

```

---

最后剩下了**字符串**、**整数**和**浮点数**。它们的书写可能性细碎得如同体操，目前没有比较完美的针对性（而不使得事情更加麻烦）的方案来标记；同时它们属于原子值，也没有较好的方式在 `parse` 出的数据中保留这些偏好。  
本库为此提供了 `literal`、`multiline`（字符串场景）、`multiline.basic` 和 `basic`（强制使用（多行）基础字符串，而不是优先尝试的（多行）字面量字符串）几个辅助函数。  

当你需要直接序列化一个全新的临时数据时，直接使用 `literal` 来规定具体的书写形式：  

```javascript
stringify({
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
const 表 = TOML.parse(源, { joiner: '\n' });

表.base = TOML.literal('0o' + 表.base.toString(8).padStart(3, '0'));
表.multilineString = TOML.multiline(表.multilineString + '\b4');

TOML.stringify(表);
```

```toml

base = 0o777
multilineString = """
1\b2
3\b4"""

```

`multiline`（字符串场景）默认会将传入的字符串以 `'\n'` 做行切割，比如 `'1\b2\n3\b4'` 会被理解为 `[ '1\b2', '3\b4' ]`。  
但是如果你的需求非常刁钻，比如你的数据是以 `TOML.parse(源, { joiner: '\b' })` 的方式解析的，那么你可以直接传入已经分隔好行的字符串数组 `'1\b2\n3\b4'.split('\b')`（即 `[ '1', '2\n3', '4' ]`），最终的序列化结果将是：  

```toml
multilineString = """
1
2\n3
4"""
```

`multiline.basic` 可以强制生成多行基础字符串，即便实际值只需要默认首选的多行字面量字符串就能够表示。  
类似地，`basic` 可以强制生成（单行）基础字符串，即便实际值只需要默认首选的（单行）字面量字符串就能够表示。  

需要注意的是，`literal` 或 `multiline`（字符串场景）、`multiline.basic`、`basic` 返回的并不是一个原子值（`string`、`number`、`bigint`），而是一个记录着序列化信息的占位对象（`object`）。  
在满足一些条件的情况下（详见 `.d.ts` 文件；简单来说就是当值是明确的时），它是该原子类型对应的对象类型（`String`、`Number`、`BigInt`），这样除可供 `stringify` 外，还可以满足常见的运算需求。
`parse` 时，需要开启 `超级选项.literal`，才会基于相同的原理保留原子值的书写方式信息，以供重新 `stringify` 时，尽可能地保留书写偏好。  
