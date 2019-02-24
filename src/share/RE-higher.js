
/* types */

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;
const YMD = /\d\d\d\d-(?:(?:0[13578]|1[02])-<_31_>|(?:0[469]|11)-<_30_>|02-<_29_>)/;
const T = /[T ]/;
const HMS = /<_23_>:<_59_>:<_59_>(?:\.\d+)?/;
const Z = /Z|[+-]<_23_>:<_59_>/;
export const DATETIME = /^(?:<HMS>|(<YMD>)(?:(<T>)(<HMS>)(<Z>)?)?)$/;

/* parser */

const Whitespace = /[ \t]/;

export const PRE_WHITESPACE = /^<Whitespace>+/;
export const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
export const VALUE_REST = /^((?:\d\d\d\d-\d\d-\d\d \d)?[\w\-+.:]+)<Whitespace>*([^]*)$/;
export const LITERAL_STRING = /^'([^'\x00-\x08\x0B-\x1F\x7F]*)'<Whitespace>*([^]*)/;
export const MULTI_LINE_LITERAL_STRING = /^([^]*?)'''(?!')<Whitespace>*([^]*)/;
export const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
export const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u([^]{4})|U([^]{8}))/g;
export const SYM_WHITESPACE = /^[^]<Whitespace>*/;

export const _VALUE_PAIR = /^!!([\w-]*)<Whitespace>+([^ \t#][^]*)$/;

/* parser-extension */

const String_ = /'[^']*'|"(?:[^\\"]+|\\[^])*"/;
const KeyValuePairs = /(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*)*/;
const NonEmptyObject = /{<Whitespace>*<KeyValuePairs>}/;
const Object = /{<Whitespace>*}|<NonEmptyObject>/;
const StringOrArray = /<String_>|<NonEmptyObject>|\[<Whitespace>+(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<Object>)<Whitespace>*)+]/;
const RegExpContent = /(?:[^\\[/]+|\[(?:[^\\\]]+|\\[^])*]|\\[^])+/;
const Rule = /\(<Whitespace>*(?:\/<RegExpContent>\/[a-z]*<Whitespace>*=<Whitespace>*(?:<StringOrArray>)<Whitespace>*|<KeyValuePairs>)\)/;

export const SUB = /<Object>/g;
export const DELIMITER_CHECK = /[^`]/;
export const INTERPOLATION = /<Rule>/g;
export const INTERPOLATIONS = /^(?:<Rule><Whitespace>*)*<Whitespace>*([^]*)$/;
export const INTERPOLATION_TOKEN = /<String_>/g;
export const REGEXP_MODE = /^\(<Whitespace>*\//;
export const PATTERN_FLAGS_REPLACER = /\/(<RegExpContent>)\/([a-z]*)<Whitespace>*=<Whitespace>*(<StringOrArray>)/;
export const WHOLE_AND_SUBS = /(<String_>)<Whitespace>*([^]*)/;
export const DOLLAR = /\$(?:[1-9]\d?|\$)/g;
