
/* types */

export const ESCAPED_IN_SINGLE_LINE :RegExp = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{8}))/g;

export const UNDERSCORES :RegExp = /_/g;

export const XOB_INTEGER :RegExp = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
export const INTEGER :RegExp = /^[-+]?[1-9]\d*(?:_\d+)*$/;

export const FLOAT :RegExp = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
export const FLOAT_NOT_INTEGER :RegExp = /[.eE]/;

/* parser */

export const BOM :RegExp = /^\uFEFF/;
export const EOL :RegExp = /\r?\n/;
