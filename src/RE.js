
/* types */

export const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;

export const UNDERSCORES = /_/g;

export const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
export const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;

export const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
export const FLOAT_NOT_INTEGER = /[.eE]/;

const Date = /(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])/;
const Hour = /[01]\d|2[0-3]/;
const MinuteOrSecond = /[0-5]\d/;
const Time = /(?:<Hour>):<MinuteOrSecond>:<MinuteOrSecond>(?:\.\d+)?/;

export const OFFSET_DATE_TIME = /^<Date>([T ])<Time>(Z|[+-](?:<Hour>):<MinuteOrSecond>)$/;
export const LOCAL_DATE_TIME = /^<Date>([T ])<Time>$/;
export const LOCAL_DATE = /^<Date>$/;
export const LOCAL_TIME = /^<Time>$/;
export const TIMEZONE_OFFSET = /^([+-])(<Hour>):(<MinuteOrSecond>)$/;

/* parser */

const Whitespace = /[ \t]/;

export const BOM = /^\uFEFF/;
export const EOL = /\r?\n/;

const BasicStringContent = /(?:[^\\"\x00-\x09\x0B-\x1F\x7F]|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*/;
const LiteralStringContent = /[^'\x00-\x08\x0B-\x1F\x7F]*/;

export const PRE_WHITESPACE = /^<Whitespace>*/;
export const TABLE_DEFINITION = /^\[(\[?)<Whitespace>*((?:[\w-]+|"<BasicStringContent>"|'<LiteralStringContent>')(?:<Whitespace>*\.<Whitespace>*(?:[\w-]+|"<BasicStringContent>"|'<LiteralStringContent>'))*)<Whitespace>*](]?)<Whitespace>*(?:#[^]*)?$/;
export const KEY_VALUE_PAIR = /^((?:[\w-]+|"<BasicStringContent>"|'<LiteralStringContent>')(?:<Whitespace>*\.<Whitespace>*(?:[\w-]+|"<BasicStringContent>"|'<LiteralStringContent>'))*)<Whitespace>*=<Whitespace>*(!!([\w-]*)<Whitespace>+)?([^ \t#][^]*)$/;
export const KEYS = /[\w-]+|"(?:[^\\"]|\\[^])*"|'[^']*'/g;
export const VALUE_REST = /^((?:\d\d\d\d-\d\d-\d\d \d)?[\w\-+.:]+)<Whitespace>*([^]*)$/;
export const LITERAL_STRING = /^'(<LiteralStringContent>)'<Whitespace>*([^]*)/;
export const MULTI_LINE_LITERAL_STRING_LONE = /^'''([^]*?)'''<Whitespace>*([^]*)/;
export const MULTI_LINE_LITERAL_STRING_REST = /^([^]*?)'''<Whitespace>*([^]*)/;
export const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
export const BASIC_STRING = /^"(<BasicStringContent>)"<Whitespace>*([^]*)/;
export const MULTI_LINE_BASIC_STRING_LONE = /^"""((?:[^\\]|\\[^])*?)"""<Whitespace>*([^]*)/;
export const MULTI_LINE_BASIC_STRING_REST = /^((?:[^\\]|\\[^])*?)"""<Whitespace>*([^]*)/;
export const ESCAPED_EXCLUDE_CONTROL_CHARACTER = /^(?:[^\\\x00-\x09\x0B-\x1F\x7F]|\\(?:[btnfr"\\ \n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*$/;
export const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;
export const SYM_WHITESPACE = /^[^]<Whitespace>*/;

export const _VALUE_PAIR = /^!!([\w-]*)<Whitespace>+([^ \t#][^]*)$/;

const String_ = /'[^']*'|"(?:[^\\"]|\\[^])*"/;
const KeyValuePairs = /(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<String_>)<Whitespace>*=<Whitespace>*(?:<String_>)<Whitespace>*)*/;
const NonEmptyObject = /{<Whitespace>*<KeyValuePairs>}/;
const Object = /{<Whitespace>*}|<NonEmptyObject>/;
const StringOrArray = /<String_>|<NonEmptyObject>|\[<Whitespace>+(?:<String_>)<Whitespace>*(?:,<Whitespace>*(?:<Object>)<Whitespace>*)+]/;
const RegExpContent = /(?:[^\\[/]|\[(?:[^\\\]]|\\[^])*]|\\[^])+/;
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
