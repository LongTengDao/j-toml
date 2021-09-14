[English](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/English/) | [简体中文](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/简体中文/)
___

`@ltd/j-toml`
=============

`@ltd/j-toml` is an implementation of [TOML](https://TOML.io/) ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

Node.js
-------

```
npm install @ltd/j-toml
```

```
const TOML = require('@ltd/j-toml');

const source  = `
      I_am_normal    = "..."
      hasOwnProperty = "..."
      constructor    = "..."
      __proto__      = "..."
`;

const rootTable = TOML.parse(source, '\n');

rootTable.I_am_normal    // "..."
rootTable.hasOwnProperty // "..."
rootTable.constructor    // "..."
rootTable.__proto__      // "..."
rootTable.valueOf        // undefined

Object.keys(rootTable)   // [ "I_am_normal", "hasOwnProperty", "constructor", "__proto__" ]
```

`TOML.parse`
------------

```
TOML.parse(source, specificationVersion, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse(source,                       multiLineJoiner, useBigInt = true, xOptions = null);
```

```
declare const parse :{
    (this :void, source :Source, specificationVersion :SpecificationVersion, multiLineJoiner :string, useBigInt? :boolean | number, xOptions? :object) :Table;
    (this :void, source :Source,                                             multiLineJoiner :string, useBigInt? :boolean | number, xOptions? :object) :Table;
};
type Source = string | Buffer | {
    readonly path  :string,
    readonly data? :string | Buffer,
};
type SpecificationVersion = 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
type Table = object;
```

### `arguments`

0.  **`source`**
    
    *   type: `string | Buffer | { readonly path :string, readonly data? :string | Buffer }`
    *   required
    
    You can pass in `string` or the original binary `Buffer` (UTF-8) of the file as the source content.
    
    One difference is that when passing in `string`, parser will only check whether all characters are valid Unicode characters according to the specification (uncoupled UCS-4 character code is invalid);  
    When `Buffer` is passed in, an additional check is made to see whether there is unknown code point (which has been automatically replaced by `U+FFFD` in the `string` state).
    
    Another difference is that `Buffer` can start with UTF BOM (`U+FEFF`), which is used for validation of file encoding (but it must be UTF-8 encoding, which is not a technical limit, but a specification requirement), and skipped before real parsing;  
    But `string` can't, because BOM belongs to UTF, not TOML.
    
    If you want to be more console friendly when something of source content goes wrong, pass an object where the `path` key is the path of that `.toml` file, and the key `data` is the source content (`string` or `Buffer`).  
    You can also omit the `data` key and `globalThis.require('fs').readFileSync(source.path)` will be called automatically.
    
1.  **`specificationVersion`**
    
    *   type: `1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1`
    *   default: `1.0`
    
    If there is no special reason (e.g. the downstream program could not deal with `Infinity`、`NaN`、fractional seconds and edge Datetime values, Local Date-Time / Local Date / Local Time types, empty string key name, mixed type array even array of tables / table under array of arrays structure yet), the latest version is recommended.
    
    If you skip this argument, the rest arguments must be moved one position to the left.
    
2.  **`multiLineJoiner`**
    
    *   type: `string`
    *   required
    
    For the multi-line strings, use what to join the lines for result.  
    Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML specification.
    
3.  **`useBigInt`**
    
    *   type: `boolean | number`
    *   default: `true`
    
    Specify whether you want or not to use `BigInt` for integer type value. A `number` type argument allows you to control it by a max limit, like `Number.MAX_SAFE_INTEGER` (and the min limit from `-useBigInt`, if `useBigInt>=0`; otherwise as the min limit, and the max limit is `-useBigInt-1`).
    
4.  **`xOptions`**
    
    The extensional features not in the specification.  
    Include keeping the key/value pairs order of tables, integers larger than `signed long`, multi-line inline table with trailing comma even no comma, `null` value, custom constructor, etc.  
    They are private experimental discouraged features.  
    See [xOptions](https://GitHub.com/LongTengDao/j-toml/blob/master/docs/English/xOptions.md).

### `return`

*   type: `Table`

Return the root table (tables parsed by this implementation are objects without any extended properties).

### `throw`

*   type: `Error`

There will be an error thrown, when the arguments not meet the requirement or there is any error within the source.

`TOML.parse[1.0]` `TOML.parse[0.5]` `TOML.parse[0.4]` `TOML.parse[0.3]` `TOML.parse[0.2]` `TOML.parse[0.1]`
-----------------------------------------------------------------------------------------------------------

```
TOML.parse[1.0](source, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse[0.5](source, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse[0.4](source, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse[0.3](source, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse[0.2](source, multiLineJoiner, useBigInt = true, xOptions = null);
TOML.parse[0.1](source, multiLineJoiner, useBigInt = true, xOptions = null);
```

```
declare const parse :{
    readonly [SpecificationVersion in 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1] :(
        this :void,
        source :Source,
        multiLineJoiner :string,
        useBigInt? :boolean | number,
        xOptions? :object,
    ) => Table
};
```
