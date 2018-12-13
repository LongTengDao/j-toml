

[@ltd/toml v0.5]
================


[@ltd/toml v0.5] is an implementation of [TOML v0.5] ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

[@ltd/toml v0.5] 是龙腾道为 [汤小明语 v0.5]（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。


`Node.js`
---------

### npm install

```sh
npm install @ltd/toml
```

### sample.toml

```toml
[Table]

# A normal key name that supported by any other JavaScript implementation:
# 为所有其它 JavaScript 实现所支持的一个普通键名：

I_am_normal    = "none"

# Some valid (in fact normal) key names but currently only supported by this JavaScript implementation:
# 一些正确（而且其实普通）但是目前仅被本 JavaScript 实现支持的键名：

hasOwnProperty = "none"
constructor    = "none"
__proto__      = "none"
```

### sample.js

```js
const source = require('fs').readFileSync(__dirname+'/sample.toml', 'utf8');

const table = require('@ltd/toml').parse(source, 0.5, '\n');

table.I_am_normal    === "none" // true

table.hasOwnProperty === "none" // true
table.constructor    === "none" // true
table.__proto__      === "none" // true
```


`TOML.parse`
------------

```
TOML.parse(source, version, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

0.  `source` required
    *   type: `string`
    *   desc:
        *   Auto trim start BOM (if exists) of the UTF text.
        *   会自动剔除 UTF 文本开头的 BOM 标签（如果有的话）。

1.  `version` required
    *   type: `0.5`
    *   desc:
        *   You must specify it explicitly (though it can't be other value for the time being).
        *   你必须显式地进行指定（尽管目前还不能使用别的值）。

2.  `multiLineJoiner` required
    *   type: `string`
    *   desc:
        *   For the multi-line strings, use what to join the lines for result.  
            Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML spec.
        *   对于多行字符串，用什么来拼接各行。  
            注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `"\n"` 或 `"\r\n"`。

3.  `useBigInt`
    *   type: `boolean`
    *   default: `true`
    *   desc:
        *   Specify whether you want or not to use `BigInt` for integer type value.
        *   指定你是否要用 `BigInt` 来实现整数类型的值。

4.  `xOptions`
    *   type: `object`
    *   desc:
        *   The extensional features not in the spec.  
            Include comment information, `null` value, mixed-type array, multi-line inline table with trailing comma even no comma, interpolation string, custom constructor, etc.  
            They are private experimental discouraged features.  
            See <https://GitHub.com/LongTengDao/TOML/blob/master/docs/English.md>.
        *   标准中所没有的扩展功能。  
            包括保留注释信息、`null` 值、跨行行内表及尾逗号甚至省略逗号、混合类型的数组、插值字符串、自定义构造器等。  
            私有实验期功能，不建议随意使用。  
            详见 <https://GitHub.com/LongTengDao/TOML/blob/master/docs/简体中文.md>。

*   `return`
    *   type: `object`
    *   desc:
        *   Return the root table (tables parsed by this implementation are objects without any extended properties).
        *   返回根表（本实现解析出的表，是没有任何继承属性的对象）。

*   `throw`
    *   desc:
        *   If the arguments not meet the requirement, there will be an error; if there is any error with the source, the error object will has a number type property named `lineIndex` to help locating that.
        *   如果参数不符合要求，会抛出错误；如果源文本有错误，错误对象会有一个名为 `lineIndex` 的数值类型的属性来帮助定位。


[@ltd/toml v0.5]: https://www.npmjs.com/package/@ltd/toml

[TOML v0.5]: https://GitHub.com/toml-lang/toml/blob/master/versions/en/toml-v0.5.0.md

[汤小明语 v0.5]: https://GitHub.com/LongTengDao/toml-lang/blob/龙腾道-译/versions/cn/toml-v0.5.0.md
