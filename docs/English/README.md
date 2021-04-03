
`@ltd/j-toml`
=============

`@ltd/j-toml` is an implementation of [TOML](https://TOML.io/) ("Tom's Obvious, Minimal Language") written by LongTengDao,  
which is the best config format he had ever seen.  
(Obviously for exhausted people who tried to design that.)

Node.js
-------

```shell
npm install @ltd/j-toml
```

```javascript
const TOML = require('@ltd/j-toml');

const source  = `
      I_am_normal    = "..."
      hasOwnProperty = "..."
      constructor    = "..."
      __proto__      = "..."
`;

const rootTable = TOML.parse(source, 1.0, '\n');

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
TOML.parse(source, specificationVersion, multiLineJoiner[, useBigInt=true[, xOptions]]);
```

```typescript
function parse (
         source               :string | Buffer | { readonly path :string, readonly data? :string | Buffer },
         specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1,
         multiLineJoiner      :string,
         useBigInt?           :boolean | number,
         xOptions?            :object,
) :Table;
```

### `arguments`

0.  #### `source`
    
    *   type: `string | Buffer | { readonly path :string, readonly data? :string | Buffer }`
    *   required
    
    You can pass in `string` or the original binary `Buffer` (UTF-8) of the file as the source content.
    
    One difference is that when passing in `string`, parser will only check whether all characters are valid Unicode characters according to the specification (uncoupled UCS-4 character code is invalid);  
    When `Buffer` is passed in, an additional check is made to see whether there is unknown code point (which has been automatically replaced by `U+FFFD` in the `string` state).
    
    Another difference is that `Buffer` can start with UTF BOM, which is used for validation of file encoding (but it must be UTF-8 encoding, which is not a technical limit, but a specification requirement), and skipped before real parsing;  
    But `string` can't, because BOM belongs to UTF, not TOML.
    
    If you want to be more console friendly when something of source content goes wrong, pass an object where the `path` key is the absolute path of that `.tmol` file, and the key `data` is the source content (`string` or `Buffer`).  
    You can also omit the `data` key and `fs.readFileSync(source.path)` will be called automatically.
    
1.  #### `specificationVersion`
    
    *   type: `1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1`
    *   required
    
    If there is no special reason (e.g. the downstream program could not deal with `Infinity`、`NaN`、fractional seconds and edge Datetime values, Local Date-Time / Local Date / Local Time types, empty string key name, mixed type array even array of tables / table under array of arrays structure yet), the latest version is recommended.
    
2.  #### `multiLineJoiner`
    
    *   type: `string`
    *   required
    
    For the multi-line strings, use what to join the lines for result.  
    Note that TOML always use `"\n"` or `"\r\n"` split the source lines while parsing, which defined in TOML specification.
    
3.  #### `useBigInt`
    
    *   type: `boolean | number`
    *   default: `true`
    
    Specify whether you want or not to use `BigInt` for integer type value. A `number` type argument allows you to control it by a max limit, like `Number.MAX_SAFE_INTEGER` (and the min limit from `-useBigInt`, if `useBigInt>=0`; otherwise as the min limit, and the max limit is `-useBigInt-1`).
    
4.  #### `xOptions`
    
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
