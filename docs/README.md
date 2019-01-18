

[@ltd/j-toml v0.5]
==================


[@ltd/j-toml v0.5] is an implementation of [TOML v0.5] ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

[@ltd/j-toml v0.5] 是龙腾道为 [汤小明语 v0.5]（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。


`Node.js`
---------

```shell
npm install @ltd/j-toml
```

```toml
[SubTable]

I_am_normal    = "..."
hasOwnProperty = "..."
constructor    = "..."
__proto__      = "..."
```

```js
const TOML = require('@ltd/j-toml');

const rootTable = TOML.parse(src, 0.5, '\n');

rootTable.SubTable.I_am_normal    === "..." // true
rootTable.SubTable.hasOwnProperty === "..." // true
rootTable.SubTable.constructor    === "..." // true
rootTable.SubTable.__proto__      === "..." // true
```


`TOML.parse`
------------

```
TOML.parse(source, version, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

*   `arguments`
    0.  `source`
        *   required
        *   type: `string`
        
        Auto trim start BOM (if exists) of the UTF text.
        
        会自动剔除 UTF 文本开头的 BOM 标签（如果有的话）。
        
    1.  `version`
        *   required
        *   type: `0.5`
        
        You must specify it explicitly (though it can't be other value for the time being).
        
        你必须显式地进行指定（尽管目前还不能使用别的值）。
        
    2.  `multiLineJoiner`
        *   required
        *   type: `string`
        
        For the multi-line strings, use what to join the lines for result.  
        Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML spec.
        
        对于多行字符串，用什么来拼接各行。  
        注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `"\n"` 或 `"\r\n"`。
        
    3.  `useBigInt`
        *   default: `true`
        *   type: `boolean` / `number`
        
        Specify whether you want or not to use `BigInt` for integer type value. `number` type value allows you to control it by a max limit (and the negative limit from `-useBigInt`, if `useBigInt>=0`; otherwise as a min limit, and the positive limit is `~useBigInt`).
        
        指定你是否要用 `BigInt` 来实现整数类型的值。`number` 类型的值允许你精确控制超过多少才使用 `BigInt`（自动通过 `-useBigInt` 获取负向界限，如果 `useBigInt>=0`；否则通过 `~useBigInt` 获取正向界限）。
        
    4.  `xOptions`
        *   type: `Object`
        
        The extensional features not in the spec.  
        Include keeping the key/value pairs order of tables, integers larger than `long`, comment information, `null` value, mixed-type array, multi-line inline table with trailing comma even no comma, interpolation string, custom constructor, etc.  
        They are private experimental discouraged features.  
        See <https://GitHub.com/LongTengDao/j-toml/blob/master/docs/xOptions.md>.
        
        标准中所没有的扩展功能。  
        包括保持表中键值对的顺序、超出长整型的整数、保留注释信息、`null` 值、跨行行内表及尾逗号甚至省略逗号、混合类型的数组、插值字符串、自定义构造器等。  
        私有实验期功能，不建议随意使用。  
        详见 <https://GitHub.com/LongTengDao/j-toml/blob/master/docs/xOptions.md>。
    
*   `return`
    *   type: `Table`
    
    Return the root table (tables parsed by this implementation are objects without any extended properties).
    
    返回根表（本实现解析出的表，是没有任何继承属性的对象）。
    
*   `throw`
    *   type: `Error`
    
    If the arguments not meet the requirement, there will be an error; if there is any error with the source, the error object will has a number type property named `lineIndex` to help locating that.
    
    如果参数不符合要求，会抛出错误；如果源文本有错误，错误对象会有一个名为 `lineIndex` 的数值类型的属性来帮助定位。


[@ltd/j-toml v0.5]: https://www.npmjs.com/package/@ltd/j-toml

[TOML v0.5]: https://GitHub.com/toml-lang/toml/blob/master/versions/en/toml-v0.5.0.md

[汤小明语 v0.5]: https://GitHub.com/LongTengDao/toml-lang/blob/龙腾道-译/versions/cn/toml-v0.5.0.md
