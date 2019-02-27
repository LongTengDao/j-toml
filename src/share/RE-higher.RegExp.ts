
/* types */

const _29_ :RegExp = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ :RegExp = /(?:0[1-9]|[12]\d|30)/;
const _31_ :RegExp = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ :RegExp = /(?:[01]\d|2[0-3])/;
const _59_ :RegExp = /[0-5]\d/;
const YMD :RegExp = /\d\d\d\d-(?:(?:0[13578]|1[02])-<_31_>|(?:0[469]|11)-<_30_>|02-<_29_>)/;
const T :RegExp = /[T ]/;
const HMS :RegExp = /<_23_>:<_59_>:<_59_>(?:\.\d+)?/;
const Z :RegExp = /Z|[+-]<_23_>:<_59_>/;
export const DATETIME :RegExp = /^(?:<HMS>|(<YMD>)(?:(<T>)(<HMS>)(<Z>)?)?)$/;

/* parser */

const Whitespace :RegExp = /[ \t]/;

export const PRE_WHITESPACE :RegExp = /^<Whitespace>+/;
export const KEYS :RegExp = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
export const VALUE_REST :RegExp = /^((?:\d\d\d\d-\d\d-\d\d \d)?[\w\-+.:]+)<Whitespace>*([^]*)$/;
export const LITERAL_STRING :RegExp = /^'([^'\x00-\x08\x0B-\x1F\x7F]*)'<Whitespace>*([^]*)/;
export const MULTI_LINE_LITERAL_STRING :RegExp = /^([^]*?)'''(?!')<Whitespace>*([^]*)/;
export const CONTROL_CHARACTER_EXCLUDE_TAB :RegExp = /[\x00-\x08\x0B-\x1F\x7F]/;
export const ESCAPED_IN_MULTI_LINE :RegExp = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u([^]{4})|U([^]{8}))/g;
export const SYM_WHITESPACE :RegExp = /^[^]<Whitespace>*/;

export const _VALUE_PAIR :RegExp = /^!!([\w-]*)<Whitespace>+([^ \t#][^]*)$/;

/* parser-extension */

const String_ :RegExp = /'[^']*'|"(?:[^\\"]+|\\[^])*"/;
const KeyValuePairs :RegExp = /(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*)*/;
const NonEmptyObject :RegExp = /{<Whitespace>*<KeyValuePairs>}/;
const Object :RegExp = /{<Whitespace>*}|<NonEmptyObject>/;
const StringOrArray :RegExp = /<String_>|<NonEmptyObject>|\[<Whitespace>+(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<Object>)<Whitespace>*)+]/;
const RegExpContent :RegExp = /(?:[^\\[/]+|\[(?:[^\\\]]+|\\[^])*]|\\[^])+/;
const Rule :RegExp = /\(<Whitespace>*(?:\/<RegExpContent>\/[a-z]*<Whitespace>*=<Whitespace>*(?:<StringOrArray>)<Whitespace>*|<KeyValuePairs>)\)/;

export const SUB :RegExp = /<Object>/g;
export const DELIMITER_CHECK :RegExp = /[^`]/;
export const INTERPOLATION :RegExp = /<Rule>/g;
export const INTERPOLATIONS :RegExp = /^(?:<Rule><Whitespace>*)*<Whitespace>*([^]*)$/;
export const INTERPOLATION_TOKEN :RegExp = /<String_>/g;
export const REGEXP_MODE :RegExp = /^\(<Whitespace>*\//;
export const PATTERN_FLAGS_REPLACER :RegExp = /\/(<RegExpContent>)\/([a-z]*)<Whitespace>*=<Whitespace>*(<StringOrArray>)/;
export const WHOLE_AND_SUBS :RegExp = /(<String_>)<Whitespace>*([^]*)/;
export const DOLLAR :RegExp = /\$(?:[1-9]\d?|\$)/g;
