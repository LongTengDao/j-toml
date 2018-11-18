
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

```
npm install @ltd/toml
```

```js
const TOML = require('@ltd/toml');

TOML.parse(`

    [Table]
    property    = "Normal key supported by any other JavaScript implementation."
    constructor = "Valid key but only supported by this JavaScript implementation."
    __proto__   = "Valid key but only supported by this JavaScript implementation."

`, 0.5, '\n');
```

`TOML.parse`
------------

### `arguments`

0.  `source` required
    *   type: `string`
    +   desc:
        *    Auto trim start BOM

1.  `version` required
    *   type: `0.5`
    +   desc:
        *   You must specify it explicitly (though it can't be other value for the time being).

2.  `multiLineJoiner` required
    *   type: `string`
    +   desc:
        *   When eval multi-line string, use what to join the lines for result.
        *   Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML spec.

3.  `useBigInt`
    *   type: `boolean`
    *   default: `true`
    +   desc:
        *   When eval `integer`, you can custom whether you want or not to use `BigInt`.

### `return`

`Object` that extends `null`.
