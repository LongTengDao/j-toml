export * from './RE-higher.js?<RegExp>';
export * from './RE-never-slow-nor-overflow.js';

/* types */

export const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{8}))/g;

export const UNDERSCORES = /_/g;

export const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
export const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;

export const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
export const FLOAT_NOT_INTEGER = /[.eE]/;

export const INDEX = /^(?:[1-9]\d*|0)$/;

/* parser */

export const BOM = /^\uFEFF/;
export const EOL = /\r?\n/;
