
1.  0.  0.  +   new feature: support TOML v1.0.0
            -   remove feature (experimental): `TOML.parse(,,,,xOptions?:{mix?,close?})`
    1.  0.  +   new feature (subsidiary): `TOML.parse(,,,,,sourcePath?:string)`
            -   remove feature (subsidiary): `{lineNumber,lineIndex}` on error thrown (since 0.5.*)
    2.  0.  *   change syntax (experimental): `TOML.parse(,,,,xOptions?:{tag?})`
    3.  0.  *   optimizing
    4.  0.  *   change feature (subsidiary): from `TOML.parse(,,,,,sourcePath?:string)` (since 1.1.0) to `TOML.parse(source:{path,data?})`
    5.  0.  *   optimizing
        1.  *   bug fix: `source.path` (since 1.4.0)
        2.  *   bug fix: check and forbid `02-29` for non-leap years (since 0.5.*)
            +   improve typing: detailing `.d.ts` for 4 types of date-time
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
        2.  *   bug fix: fix ESM support of `package.json`
    13. 0.  *   reuse stage 4 class field syntax
            +   new feature: allow to skip the parameter `specificationVersion` (default to `1.0`)
            +   new feature: add `1.0`, `0.5`, `0.4`, `0.3`, `0.2`, `0.1` sub functions in `TOML.parse`
    14. 0.  *   fix indent in Markdown docs
    15. 0.  +   new feature: allow to omit the `multilineStringJoiner` parameter, as long as the final parsing does not actually encounter a multi-line string containing a newline to be preserved (not recommended)
    16. 0.  +   new feature: `stringify` method, and helpers `Section`, `inline`, `multiline`, `multiline.basic`, `literal`, `commentFor`
            +   new feature: export `OffsetDateTime`, `LocalDateTime`, `LocalDate`, `LocalTime` classes
            +   new feature (experimental): add `xOptions.comment`, to retain some comment information in the parsing result
            *   bug fix: fix no error thrown when parsing some kind of incorrect Offset Date-Time literal
            *   bug fix: fix parsing stack overflow caused by too much escaping in base string again (also preventive out of memory)
            *   bug fix: ensure that in 1.0 parsing mode, Tab after "line ending backslash" is handled correctly, while in 0.4 or previous modes, even space after "line ending backslash" should not work anymore
            *   bug fix: fix incorrect line number information in parsing error once met "line ending backslash"
            *   bug fix: fix parsing stack overflow caused by too many underscores in integer or float
            *   bug fix: fix the problem that `globalThis.require` doesn't exist actually
        1.  *   bug fix: make error position more exact
            *   bug fix: make `parse` more robust to eradicate broken by overlapped calling
    17. 0.  +   new feature: add parameter `source.require`, avoid statically loading `fs` module, etc. (to read TOML file data for specified `source.path`)
            +   new feature: add support to `Uint8Array` and `ArrayBuffer`
            +   new feature (experimental): add `xOptions.string`, to disable keys shaped like numbers, etc.
            +   new feature: quote keys shaped like number, etc., during `TOML.stringify`
    18. 0.  +   new feature: allow passing rest arguments of `TOML.parse` via an options object
