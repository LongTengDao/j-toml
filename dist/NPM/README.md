
[English](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/English/) | [简体中文](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/简体中文/)
___
`@ltd/j-toml`
=============

`@ltd/j-toml` is an implementation of [TOML](https://GitHub.com/toml-lang/toml/) ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

Node.js
-------

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
      5              = "..."
`;

const rootTable = TOML.parse(sourceContent, 0.5, '\n');

rootTable.I_am_normal    // "..."
rootTable.hasOwnProperty // "..."
rootTable.constructor    // "..."
rootTable.__proto__      // "..."

rootTable.valueOf        // undefined

Object.keys(rootTable)   // [ "I_am_normal", "hasOwnProperty", "constructor", "__proto__", "5" ]
```

`TOML.parse`
------------

```
TOML.parse(sourceContent, specificationVersion, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

```
function parse (
         sourceContent        :string | Buffer,
         specificationVersion :0.5 | 0.4 | 0.3 | 0.2 | 0.1,
         multiLineJoiner      :string,
         useBigInt?           :boolean | number,
         xOptions?            :object
) :Table;
```

### `arguments`

0.  **`sourceContent`**
    
    *   type: `string` / `Buffer(UTF-8)`
    *   required
    
    You can pass in `string` or the original binary `Buffer` of the file.
    
    One difference is that when passing in `string`, parser will only check whether all characters are valid Unicode characters according to the specification (uncoupled UCS-4 character code is invalid);  
    When `Buffer` is passed in, an additional check is made to see whether there is unknown code point (which has been automatically replaced by `U+FFFD` in the `string` state).
    
    Another difference is that `Buffer` can start with UTF BOM, which is used for validation of file encoding (but it must be UTF-8 encoding, which is not a technical limit, but a specification requirement), and skipped before real parsing;  
    But `string` can't, because BOM belongs to UTF, not TOML.
    
1.  **`specificationVersion`**
    
    *   type: `0.5` / `0.4` / `0.3` / `0.2` / `0.1`
    *   required
    
    If there is no special reason (e.g. the downstream program could not deal with `Infinity`、`NaN`、fractional seconds and edge Datetime values, Local Date-Time / Local Date / Local Time types, empty string key name, even array of tables / table under array of arrays structure yet), the latest version is recommended.
    
2.  **`multiLineJoiner`**
    
    *   type: `string`
    *   required
    
    For the multi-line strings, use what to join the lines for result.  
    Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML specification.
    
3.  **`useBigInt`**
    
    *   type: `boolean` / `number`
    *   default: `true`
    
    Specify whether you want or not to use `BigInt` for integer type value. A `number` type argument allows you to control it by a max limit, like `Number.MAX_SAFE_INTEGER` (and the min limit from `-useBigInt`, if `useBigInt>=0`; otherwise as the min limit, and the max limit is `-useBigInt-1`).
    
4.  **`xOptions`**
    
    The extensional features not in the specification.  
    Include keeping the key/value pairs order of tables, integers larger than `signed long`, mixed-type array, multi-line inline table with trailing comma even no comma, `null` value, custom constructor, etc.  
    They are private experimental discouraged features. Only provide TSD support when `specificationVersion` is `0.4` or higher.  
    See [xOptions](https://GitHub.com/LongTengDao/j-toml/blob/master/docs/English/xOptions.md).

### `return`

*   type: `Table`

Return the root table (tables parsed by this implementation are objects without any extended properties).

### `throw`

*   type: `Error` / `Error & { lineIndex :number, lineNumber :number }`

If the arguments not meet the requirement, there will be an error; if there is any error with the source, the error object will has two number properties `lineIndex` and `lineNumber` to help locating that.
