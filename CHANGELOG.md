1.  0.  0.  +   add feature: support TOML v1.0.0
            *   remove feature (experimental): `TOML.parse(,,,,xOptions?:{mix?,close?})`
    1.  0.  +   add feature (subsidiary): `TOML.parse(,,,,,sourcePath?:string)`
            -   remove feature (subsidiary): `{lineNumber,lineIndex}` on error thrown (since 0.5.*)
    2.  0.  *   change syntax (experimental): `TOML.parse(,,,,xOptions?:{tag?})`
    3.  0.  *   optimizing
    4.  0.  *   change feature (subsidiary): from `TOML.parse(,,,,,sourcePath?:string)` (since 1.1.0) to `TOML.parse(source:{path,data?})`
    5.  0.  *   optimizing
        1.  *   fix bug: `source.path` (since 1.4.0)
        2.  *   fix bug: check and forbid `02-29` for non-leap years (since 0.5.*)
            +   improve typing: detailing `.d.ts` for 4 types of datetime
    6.  0.  *   optimizing
    7.  0.  *   optimizing
    8.  0.  *   optimizing
    9.  0.  *   only run `require('fs')` when it's really used
            *   no more do `require('path').isAbsolute(source.path)` check
    10. 0.  *   update dependency `@ltd/j-orderify` (use `copyWithin` to optimize `ownKeys` `splice` instead of modifying `constructor[Symbol.species]`)
    11. 0.  *   change date-time internal implementation from private to symbol, to support `Proxy` use case
    12. 0.  *   remove stage 3 class field syntax for compatibility
            +   add ESM edition (with full tree shaking support)
        1.  *   fix typing file path
        2.  *   fix ESM support of `package.json`
