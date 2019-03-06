
[English](#user-content-english) | [简体中文](#user-content-简体中文)

_________________________________________________________
[@ltd/j-toml v0.5]<a id="user-content-english">&nbsp;</a>
==================

[@ltd/j-toml v0.5] is an implementation of [TOML v0.5] ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

`Node.js`
---------

```
npm install @ltd/j-toml
```

```
const TOML = require('@ltd/j-toml');

const sourceContent  = `
      I_am_normal    = "..."
      hasOwnProperty = "..."
      constructor    = "..."
      __proto__      = "..."
`;

const rootTable = TOML.parse(sourceContent, 0.5, '\n');

rootTable.I_am_normal    // "..."
rootTable.hasOwnProperty // "..."
rootTable.constructor    // "..."
rootTable.__proto__      // "..."
```

`TOML.parse`
------------

```
TOML.parse(sourceContent, version, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

```
function parse (
         sourceContent   :string | Buffer,
         version         :0.5,
         multiLineJoiner :string,
         useBigInt?      :boolean | number = true,
         xOptions?       :object
) :Table;
```

### `arguments`

0.  **`sourceContent`**
    
    *   required
    *   type: `string` / `Buffer(utf8)`
    
    If the `string` starts with UTF BOM, that's ok.  
    You can also pass in a `Buffer`. But it must be UTF 8 encoding, that's not a technology problem, but a requirement in the specification.
    
1.  **`version`**
    
    *   required
    *   type: `0.5`
    
    You must specify it explicitly (though it can't be other value for the time being).
    
2.  **`multiLineJoiner`**
    
    *   required
    *   type: `string`
    
    For the multi-line strings, use what to join the lines for result.  
    Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML spec.
    
3.  **`useBigInt`**
    
    *   default: `true`
    *   type: `boolean` / `number`
    
    Specify whether you want or not to use `BigInt` for integer type value. A `number` type argument allows you to control it by a max limit, like `Number.MAX_SAFE_INTEGER` (and the min limit from `-useBigInt`, if `useBigInt>=0`; otherwise as the min limit, and the max limit is `-useBigInt-1`).
    
4.  **`xOptions`**
    
    *   type: `object`
    
    The extensional features not in the spec.  
    Include keeping the key/value pairs order of tables, integers larger than `long`, comment information, `null` value, mixed-type array, multi-line inline table with trailing comma even no comma, interpolation string, custom constructor, etc.  
    They are private experimental discouraged features.  
    See [xOptions].

### `return`

*   type: `Table`

Return the root table (tables parsed by this implementation are objects without any extended properties).

### `throw`

*   type: `Error`

If the arguments not meet the requirement, there will be an error; if there is any error with the source, the error object will has two number properties `lineIndex` and `lineNumber` to help locating that.  
Only one kind of case will cause the recursion parser stack overflow: `k=[{ k=[{ k=[{ ...thousands of layers... }] }] }]`. If there is an issue manifesting the necessity, I will rewrite using loop.

__________________________________________________________
[@ltd/j-toml v0.5]<a id="user-content-简体中文">&nbsp;</a>
==================

[@ltd/j-toml v0.5] 是龙腾道为 [汤小明语 v0.5]（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。

`Node.js`
---------

```
npm install @ltd/j-toml
```

```
const TOML = require('@ltd/j-toml');

const 源内容           = `
      "一个普通的键名" = "..."
      hasOwnProperty   = "..."
      constructor      = "..."
      __proto__        = "..."
`;

const 根表 = TOML.parse(源内容, 0.5, '\n');

根表.一个普通的键名 // "..."
根表.hasOwnProperty // "..."
根表.constructor    // "..."
根表.__proto__      // "..."
```

`TOML.parse`
------------

```
TOML.parse(源内容, 遵循规范版本, 多行拼接字符[, 使用BigInt=true[, 超级选项]]);
```

```
function parse (
         源内容       :string | Buffer,
         遵循规范版本 :0.5,
         多行拼接字符 :string,
         使用BigInt?  :boolean | number = true,
         超级选项?    :object
) :Table;
```

### `arguments`

0.  **`源内容`**
    
    *   required
    *   type: `string` / `Buffer(utf8)`
    
    传入的 `string` 如果以 UTF BOM 开头，不会造成错误。  
    你也可以传入 `Buffer`。但它必须是 UTF 8 编码的，这不是技术问题，而是规范的要求。
    
1.  **`遵循规范版本`**
    
    *   required
    *   type: `0.5`
    
    你必须显式地进行指定（尽管目前还不能使用别的值）。
    
2.  **`多行拼接字符`**
    
    *   required
    *   type: `string`
    
    对于多行字符串，用什么来拼接各行。  
    注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `"\n"` 或 `"\r\n"`。
    
3.  **`使用BigInt`**
    
    *   default: `true`
    *   type: `boolean` / `number`
    
    指定你是否要用 `BigInt` 来实现整数类型的值。`number` 类型的参数允许你精确控制超过多少才使用 `BigInt`，例如 `Number.MAX_SAFE_INTEGER`（自动通过 `-useBigInt` 获取负向界限，如果 `useBigInt>=0`；否则通过 `-useBigInt-1` 获取正向界限）。
    
4.  **`超级选项`**
    
    *   type: `object`
    
    标准中所没有的扩展功能。  
    包括保持表中键值对的顺序、超出长整型的整数、保留注释信息、`null` 值、跨行行内表及尾逗号甚至省略逗号、混合类型的数组、插值字符串、自定义构造器等。  
    私有实验期功能，不建议随意使用。  
    详见 [超级选项]。

### `return`

*   type: `Table`

返回根表（本实现解析出的表，是没有任何继承属性的对象）。

### `throw`

*   type: `Error`

如果参数不符合要求，会抛出错误；如果源文本有错误，错误对象会有 `lineIndex` 和 `lineNumber` 两个数值属性来帮助定位。  
只有一类情况会导致递归解析器栈溢出：`k=[{ k=[{ k=[{ ……成千上万层…… }] }] }]`。如果有 issue 表明实际使用中的必要性，我会改写成循环实现。

____________________
[@ltd/j-toml v0.5]: https://www.npmjs.com/package/@ltd/j-toml
[TOML v0.5]:        https://GitHub.com/toml-lang/toml/blob/master/versions/en/toml-v0.5.0.md
[汤小明语 v0.5]:    https://GitHub.com/LongTengDao/TOML/blob/龙腾道-译/versions/cn/toml-v0.5.0.md
[xOptions]:         https://GitHub.com/LongTengDao/j-toml/blob/master/docs/xOptions.md#user-content-english
[超级选项]:         https://GitHub.com/LongTengDao/j-toml/blob/master/docs/xOptions.md#user-content-简体中文
