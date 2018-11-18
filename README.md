[node]: https://www.npmjs.com/package/@ltd/toml
[spec-en]: https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.5.0.md "Tom's Obvious, Minimal Language"
[spec-cn]: https://github.com/toml-lang/toml/blob/master/versions/cn/toml-v0.5.0.md "汤姆的简明语言"

[@ltd/toml v0.5][node]
======================

[@ltd/toml v0.5][node] is LongTengDao's obvious, minimal implementation of [TOML v0.5][spec-en],
which is the best config format he had ever seen.
(Obviously for exhausted people who tried to design that.)

[@ltd/toml v0.5][node] 是龙腾道为 [TOML v0.5][spec-cn] 写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。

`Node.js`
---------

```sh
npm install @ltd/toml
```

```js
const TOML = require('@ltd/toml');

TOML.parse(`

    [Table]

    # A normal key name that supported by any other JavaScript implementation:
    # 为所有其它 JavaScript 实现所支持的一个普通键名：

    I_am_normal    = "none"

    # Some valid (in fact normal) key names but currently only supported by this JavaScript implementation:
    # 一些正确（而且其实普通）但是目前仅被本 JavaScript 实现支持的键名：

    hasOwnProperty = "none"

    constructor    = "none"

    __proto__      = "none"

`, 0.5, '\n');
```

`TOML.parse(source, version, multiLineJoiner[, useBigInt=true[, xOptions]])`
----------------------------------------------------------------------------

### `arguments`

0.  `source` required
    *   type: `string`
    +   desc:
        *   Auto trim start BOM (if exists) of the UTF text.
        *   会自动剔除 UTF 文本开头的 BOM 标签（如果有的话）。

1.  `version` required
    *   type: `0.5`
    +   desc:
        *   You must specify it explicitly (though it can't be other value for the time being).
        *   你必须显式地进行指定（尽管目前还不能使用别的值）。

2.  `multiLineJoiner` required
    *   type: `string`
    +   desc:
        *   For the multi-line strings, use what to join the lines for result.
        *   Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML spec.
        *   对于多行字符串，用什么来拼接各行。
        *   注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `"\n"` 或 `"\r\n"`。

3.  `useBigInt`
    *   type: `boolean`
    *   default: `true`
    +   desc:
        *   Specify whether you want or not to use `BigInt` for integer type value.
        *   指定你是否要用 `BigInt` 来实现整数类型的值。

4.  `xOptions`
    *   type: `[object Object]`
    +   desc:
        *   The extensional features not in the spec. Include `null` supporting, mixed array, and interpolation strings (see <https://github.com/toml-lang/toml/issues/577>), etc. They are private experimental discouraged features.
        *   标准中所没有的扩展功能。包括对 `null` 值，跨行行内表及尾逗号，混合类型的数组，以及插值字符串（参见 <https://github.com/toml-lang/toml/issues/577>）等。私有实验期功能，不建议随意使用。

### `return`

Return the root Table, which is an `Object` without any extended properties.

返回根表，它是一个没有任何继承属性的对象。
