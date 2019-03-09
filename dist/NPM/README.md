
[English](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/English/) | [简体中文](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/简体中文/)
___
[@ltd/j-toml v0.5]
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
TOML.parse(sourceContent, specificationVersion, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

```
function parse (
         sourceContent        :string | Buffer,
         specificationVersion :0.5,
         multiLineJoiner      :string,
         useBigInt?           :boolean | number = true,
         xOptions?            :object
) :Table;
```

### `arguments`

0.  **`sourceContent`**
    
    *   required
    *   type: `string` / `Buffer(utf8)`
    
    If the `string` starts with UTF BOM, that's ok.  
    You can also pass in a `Buffer`. But it must be UTF 8 encoding, that's not a technology problem, but a requirement in the specification.
    
1.  **`specificationVersion`**
    
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

There is only one kind of case which will cause the recursive parser itself stack overflow (if there is an issue manifesting the necessity, I will rewrite using loop):

```
array        = [ [ [ ...thousands of layers... ] ] ]

inline-table = { k = { k = { ...thousands of layers... } } }

xxxxxx       = [{ k = [{ k = [{ ...thousands of layers... }] }] }]
```

[@ltd/j-toml v0.5]: https://www.npmjs.com/package/@ltd/j-toml
[TOML v0.5]:        https://GitHub.com/toml-lang/toml/blob/master/versions/en/toml-v0.5.0.md
[xOptions]:         https://GitHub.com/LongTengDao/j-toml/blob/master/docs/English/xOptions.md
