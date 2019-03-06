'use strict';

const version = '0.5.57';

const isArray = Array.isArray;

const Symbol_for = Symbol.for;

const isBuffer = Buffer.isBuffer;

const NONE = [];
let sourceLines = NONE;
let lastLineIndex = -1;
let lineIndex = -1;
const from = (array) => {
    sourceLines = array;
    lastLineIndex = sourceLines.length - 1;
    lineIndex = -1;
};
const done = () => { sourceLines = NONE; };
const next = () => sourceLines[++lineIndex];
const rest = () => lineIndex !== lastLineIndex;
const mark = () => lineIndex;
const must = (message, startIndex) => {
    lineIndex === lastLineIndex
        && throws(new SyntaxError(message + ' is not close until the end of the file, which started from line ' + (startIndex + 1) + ': ' + sourceLines[startIndex]));
    return sourceLines[++lineIndex];
};
const where = () => 'line ' + (lineIndex + 1) + ': ' + sourceLines[lineIndex];
const throwSyntaxError = (message) => throws(new SyntaxError(message));
const throwRangeError = (message) => throws(new RangeError(message));
const throwTypeError = (message) => throws(new TypeError(message));
const throwError = (message) => throws(new Error(message));
function throws(error) {
    if (sourceLines !== NONE) {
        error.lineIndex = lineIndex;
        error.lineNumber = lineIndex + 1;
        //done();
    }
    throw error;
}

/*!
 * 模块名称：@ltd/j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string.
 * 模块版本：2.4.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const defineProperty = Reflect.defineProperty;

const deleteProperty = Reflect.deleteProperty;

const ownKeys = Reflect.ownKeys;

const ownKeysKeepers = new WeakMap;
const handlers = Object.create(null, {
    defineProperty: {
        value(target, key, descriptor) {
            if (defineProperty(target, key, descriptor)) {
                ownKeysKeepers.get(target).add(key);
                return true;
            }
            return false;
        }
    },
    deleteProperty: {
        value(target, key) {
            if (deleteProperty(target, key)) {
                ownKeysKeepers.get(target).delete(key);
                return true;
            }
            return false;
        }
    },
    ownKeys: {
        value(target) {
            return [...ownKeysKeepers.get(target)];
        }
    },
});
const orderify = (object) => {
    ownKeysKeepers.set(object, new Set(ownKeys(object)));
    return new Proxy(object, handlers);
};

/*¡ @ltd/j-orderify */

const create = Object.create;

function Table() { }
const OrderedTable = function Table() { return orderify(this); };
OrderedTable.prototype = Table.prototype = create(null);
const isTable = (value) => value instanceof Table;
const closeTables = new WeakSet;
const openTables = new WeakSet;

/* types */
const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{8}))/g;
const UNDERSCORES = /_/g;
const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;
const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
/* parser */
const BOM = /^\uFEFF/;
const EOL = /\r?\n/;

/* types */
const DATETIME = /^(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?|(\d\d\d\d-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-9])))(?:([T ])((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?)(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?)$/;
const PRE_WHITESPACE = /^[ \t]+/;
const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const VALUE_REST = /^((?:\d\d\d\d-\d\d-\d\d \d)?[\w\-+.:]+)[ \t]*([^]*)$/;
const LITERAL_STRING = /^'([^'\x00-\x08\x0B-\x1F\x7F]*)'[ \t]*([^]*)/;
const MULTI_LINE_LITERAL_STRING = /^([^]*?)'''(?!')[ \t]*([^]*)/;
const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u([^]{4})|U([^]{8}))/g;
const SYM_WHITESPACE = /^[^][ \t]*/;
const _VALUE_PAIR = /^!!([\w-]*)[ \t]+([^ \t#][^]*)$/;
const SUB = /{[ \t]*}|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*}/g;
const DELIMITER_CHECK = /[^`]/;
const INTERPOLATION = /\([ \t]*(?:\/(?:[^\\[/]+|\[(?:[^\\\]]+|\\[^])*]|\\[^])+\/[a-z]*[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*"|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*}|\[[ \t]+(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:{[ \t]*}|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*})[ \t]*)+])[ \t]*|(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*)\)/g;
const INTERPOLATIONS = /^(?:\([ \t]*(?:\/(?:[^\\[/]+|\[(?:[^\\\]]+|\\[^])*]|\\[^])+\/[a-z]*[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*"|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*}|\[[ \t]+(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:{[ \t]*}|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*})[ \t]*)+])[ \t]*|(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*)\)[ \t]*)*[ \t]*([^]*)$/;
const INTERPOLATION_TOKEN = /'[^']*'|"(?:[^\\"]+|\\[^])*"/g;
const REGEXP_MODE = /^\([ \t]*\//;
const PATTERN_FLAGS_REPLACER = /\/((?:[^\\[/]+|\[(?:[^\\\]]+|\\[^])*]|\\[^])+)\/([a-z]*)[ \t]*=[ \t]*('[^']*'|"(?:[^\\"]+|\\[^])*"|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*}|\[[ \t]+(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:{[ \t]*}|{[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*(?:,[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*=[ \t]*(?:'[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*)*})[ \t]*)+])/;
const WHOLE_AND_SUBS = /('[^']*'|"(?:[^\\"]+|\\[^])*")[ \t]*([^]*)/;
const DOLLAR = /\$(?:[1-9]\d?|\$)/g;

/* parser */
const MULTI_LINE_BASIC_STRING = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
function MULTI_LINE_BASIC_STRING_exec_0(_) {
    for (let _0 = '';;) {
        if (_ === '') {
            return _0;
        }
        const $ = MULTI_LINE_BASIC_STRING.exec(_);
        if ($ === null) {
            return _0;
        }
        _0 += $[0];
        _ = _.slice($[0].length);
    }
}
const ESCAPED_EXCLUDE_CONTROL_CHARACTER = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\ \n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(_) {
    return _.replace(ESCAPED_EXCLUDE_CONTROL_CHARACTER, '') === '';
}
const BASIC_STRING = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
function BASIC_STRING_exec(_2) {
    _2 = _2.slice(1);
    for (let _1 = '';;) {
        const $ = BASIC_STRING.exec(_2);
        if ($ === null) {
            _2.startsWith('"')
                || throwSyntaxError(where());
            return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
        }
        _1 += $[0];
        _2 = _2.slice($[0].length);
    }
}
const BARE_KEY = /^[\w-]+/;
const LITERAL_KEY = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const DOT_KEY = /^[ \t]*\.[ \t]*/;
function TABLE_DEFINITION_exec(_) {
    const _1 = _.charAt(1) === '[';
    _ = _.slice(_1 ? 2 : 1).replace(PRE_WHITESPACE, '');
    const _2 = getKeys(_);
    _ = _.slice(_2.length).replace(PRE_WHITESPACE, '');
    _.startsWith(']')
        || throwSyntaxError(where());
    const _3 = _.charAt(1) === ']';
    _ = _.slice(_3 ? 2 : 1).replace(PRE_WHITESPACE, '');
    _ === ''
        || _.startsWith('#')
        || throwSyntaxError(where());
    return { 1: _1, 2: _2, 3: _3, 4: _ };
}
const KEY_VALUE_PAIR = /^[ \t]*=[ \t]*(!!([\w-]*)[ \t]+)?([^ \t#][^]*)$/;
function KEY_VALUE_PAIR_exec(_) {
    const _1 = getKeys(_);
    const $ = KEY_VALUE_PAIR.exec(_.slice(_1.length));
    $
        || throwSyntaxError(where());
    return { 1: _1, 2: $[1], 3: $[2], 4: $[3] };
}
function getKeys(_) {
    for (let keys = '';;) {
        if (_.startsWith('"')) {
            _ = _.slice(1);
            for (let key = '"';;) {
                const $ = BASIC_STRING.exec(_);
                if ($ === null) {
                    _.startsWith('"')
                        || throwSyntaxError(where());
                    _ = _.slice(1);
                    keys += key + '"';
                    break;
                }
                _ = _.slice($[0].length);
                key += $[0];
            }
        }
        else {
            const key = ((_.startsWith('\'') ? LITERAL_KEY : BARE_KEY).exec(_) || throwSyntaxError(where()))[0];
            _ = _.slice(key.length);
            keys += key;
        }
        const $ = DOT_KEY.exec(_);
        if ($ === null) {
            return keys;
        }
        _ = _.slice($[0].length);
        keys += $[0];
    }
}

const literal_cache = Symbol('literal_cache');
const value_cache = Symbol('value_cache');
class Datetime extends Date {
    constructor(literal) {
        // @ts-ignore
        const { 0: hms_ms = '', 1: YMD = '', 2: T = '', 3: HMS_MS = hms_ms, 4: Z = '' } = DATETIME.exec(literal) || throwSyntaxError('Invalid Datetime ' + literal + ' at ' + where());
        super(Z ? YMD + 'T' + HMS_MS + Z :
            T ? YMD + 'T' + HMS_MS :
                YMD ? YMD + 'T00:00:00.000'
                    : '1970-01-01T' + HMS_MS);
        this.type =
            Z ? 'Offset Date-Time' :
                T ? 'Local Date-Time' :
                    YMD ? 'Local Date'
                        : 'Local Time';
        this[literal_cache] = literal;
        this[value_cache] = this.getTime();
    }
    //static isDatetime (value :any) :boolean { return value instanceof Datetime; }
    //toJSON (this :Datetime) :string { return this.toISOString(); }
    toISOString() {
        if (this.getTime() === this[value_cache]) {
            return this[literal_cache];
        }
        throw new Error('Datetime value has been modified.');
    }
}

// @ts-ignore
const Float = (literal) => {
    if (FLOAT.test(literal) && FLOAT_NOT_INTEGER.test(literal)) {
        return +literal.replace(UNDERSCORES, '');
        //const number = +literal.replace(RE.UNDERSCORES, '');
        //isFinite(number) || iterator.throwRangeError('Float can not be as big as Infinity, like '+literal+' at '+where());
        //return number;
    }
    //if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
    //if ( literal==='-inf' ) { return -Infinity; }
    //if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
    throwSyntaxError('Invalid Float ' + literal + ' at ' + where());
};

const fromCodePoint = String.fromCodePoint;

const getOwnPropertyNames = Object.getOwnPropertyNames;

const getPrototypeOf = Reflect.getPrototypeOf;

const stringify = JSON.stringify;

const isSafeInteger = Number.isSafeInteger;

const NumberInteger = (literal) => {
    if (literal === '0' || literal === '+0' || literal === '-0') {
        return 0;
    }
    (literal.charAt(0) === '0' ? XOB_INTEGER : INTEGER).test(literal)
        || throwSyntaxError('Invalid Integer ' + literal + ' at ' + where());
    const number = +literal.replace(UNDERSCORES, '');
    allowLonger
        || isSafeInteger(number)
        || throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes ' + literal + ' meet at ' + where());
    return number;
};
const BigIntInteger = (literal) => {
    if (literal === '0' || literal === '+0' || literal === '-0') {
        return 0n;
    }
    (literal.charAt(0) === '0' ? XOB_INTEGER : INTEGER).test(literal) || throwSyntaxError('Invalid Integer ' + literal + ' at ' + where());
    const bigInt = BigInt(literal.replace(UNDERSCORES, ''));
    allowLonger
        || -9223372036854775808n <= bigInt && bigInt <= 9223372036854775807n // ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
        || throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ' + literal + ' meet at ' + where());
    return bigInt;
};
const DependInteger = (literal) => {
    const bigInt = BigIntInteger(literal);
    return IntegerMin <= bigInt && bigInt <= IntegerMax ? +(bigInt + '') : bigInt;
};

const FUNCTION = new WeakSet;
const unType = (array) => array;
const { asInlineArrayOfNulls, asInlineArrayOfStrings, asInlineArrayOfTables, asInlineArrayOfArrays, asInlineArrayOfBooleans, asInlineArrayOfFloats, asInlineArrayOfDatetimes, asInlineArrayOfIntegers } = new Proxy(new WeakMap, {
    get: (arrayTypes) => function typify(array) {
        if (arrayTypes.has(array)) {
            arrayTypes.get(array) === typify
                || throwTypeError('Types in array must be same. Check ' + where());
        }
        else {
            arrayTypes.set(array, typify);
        }
        return array;
    }
});
let useWhatToJoinMultiLineString;
let IntegerDepends, IntegerMin, IntegerMax;
let TableDepends;
let open;
let allowLonger;
let keepComment;
let enableNull;
let enableNil;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma;
let enableInterpolationString;
let asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asDatetimes, asIntegers;
let customConstructors;
function use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions) {
    if (typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines !== 'string') {
        throw new TypeError('TOML.parse(,,multiLineJoiner)');
    }
    if (useBigInt_forInteger === true) {
        IntegerDepends = BigIntInteger;
    }
    else if (useBigInt_forInteger === false) {
        IntegerDepends = NumberInteger;
    }
    else {
        if (typeof useBigInt_forInteger !== 'number') {
            throw new TypeError('TOML.parse(,,,useBigInt)');
        }
        if (!isSafeInteger(useBigInt_forInteger)) {
            throw new RangeError('TOML.parse(...useBigInt)');
        }
        IntegerDepends = DependInteger;
        if (useBigInt_forInteger >= 0) {
            IntegerMax = useBigInt_forInteger;
            IntegerMin = -useBigInt_forInteger;
        }
        else {
            IntegerMin = useBigInt_forInteger;
            IntegerMax = -useBigInt_forInteger - 1;
        }
    }
    useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
    let typify;
    if (extensionOptions === null) {
        TableDepends = Table;
        open = allowLonger = keepComment = enableNull = enableNil = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
        customConstructors = null;
        typify = true;
    }
    else {
        TableDepends = extensionOptions.order ? OrderedTable : Table;
        open = !!extensionOptions.open;
        allowLonger = !!extensionOptions.longer;
        keepComment = !!extensionOptions.hash;
        enableNull = !!extensionOptions.null;
        enableNil = !!extensionOptions.nil;
        allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
        enableInterpolationString = !!extensionOptions.ins;
        typify = !extensionOptions.mix;
        customConstructors = extensionOptions.new || null;
        if (customConstructors !== null) {
            if (typeof customConstructors === 'function') {
                if (typify) {
                    customConstructors = null;
                    throw new Error('TOML.parse(,,,,{ mix:false, new(){} })');
                }
                if (customConstructors.length !== 2) {
                    throw new Error('TOML.parse(,,,,xOptions.new.length)');
                }
                FUNCTION.add(customConstructors);
            }
            else if (typeof customConstructors === 'object') {
                if (typify) {
                    customConstructors = null;
                    throw new Error('TOML.parse(,,,,{ mix:false, new:{} })');
                }
                if (getPrototypeOf(customConstructors) === null) {
                    for (const type of getOwnPropertyNames(customConstructors)) {
                        if (typeof customConstructors[type] !== 'function') {
                            customConstructors = null;
                            throw new TypeError('TOML.parse(,,,,xOptions.new[' + stringify(type) + '])');
                        }
                        if (customConstructors[type].length) {
                            customConstructors = null;
                            throw new Error('TOML.parse(,,,,xOptions.new[' + stringify(type) + '].length)');
                        }
                    }
                }
                else {
                    const origin = customConstructors;
                    customConstructors = create(null);
                    for (const type of getOwnPropertyNames(origin)) {
                        const customConstructor = origin[type];
                        if (typeof customConstructor !== 'function') {
                            customConstructors = null;
                            throw new TypeError('TOML.parse(,,,,xOptions.new[' + stringify(type) + '])');
                        }
                        if (customConstructors[type].length) {
                            customConstructors = null;
                            throw new Error('TOML.parse(,,,,xOptions.new[' + stringify(type) + '].length)');
                        }
                        customConstructors[type] = customConstructor;
                    }
                }
            }
            else {
                throw new TypeError('TOML.parse(,,,,xOptions.new)');
            }
        }
    }
    if (typify) {
        asNulls = asInlineArrayOfNulls;
        asStrings = asInlineArrayOfStrings;
        asTables = asInlineArrayOfTables;
        asArrays = asInlineArrayOfArrays;
        asBooleans = asInlineArrayOfBooleans;
        asFloats = asInlineArrayOfFloats;
        asDatetimes = asInlineArrayOfDatetimes;
        asIntegers = asInlineArrayOfIntegers;
    }
    else {
        asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asDatetimes = asIntegers = unType;
    }
}
function clear() {
    customConstructors = null;
}

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };
const unEscapeSingleLine = (match, p1, p2, p3, p4) => {
    if (p1) {
        return p1;
    }
    if (p2) {
        return ESCAPE_ALIAS[p2];
    }
    const codePoint = parseInt(p3 || p4, 16);
    (0xD7FF < codePoint && codePoint < 0xE000 || 0x10FFFF < codePoint)
        && throwRangeError('Invalid Unicode Scalar ' + (p3 ? '\\u' + p3 : '\\U' + p4) + ' at ' + where());
    return fromCodePoint(codePoint);
};
const unEscapeMultiLine = (match, p1, p2, p3, p4, p5) => {
    if (match === '\n') {
        return useWhatToJoinMultiLineString;
    }
    if (p1) {
        p1.includes('\n')
            || throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see ' + where());
        return '';
    }
    if (p2) {
        return p2;
    }
    if (p3) {
        return ESCAPE_ALIAS[p3];
    }
    const codePoint = parseInt(p4 || p5, 16);
    (0xD7FF < codePoint && codePoint < 0xE000 || 0x10FFFF < codePoint)
        && throwRangeError('Invalid Unicode Scalar ' + (p4 ? '\\u' + p4 : '\\U' + p5) + ' at ' + where());
    return fromCodePoint(codePoint);
};
const BasicString = (literal) => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
const MultiLineBasicString = (literal) => literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);

function assignInterpolationString(table, finalKey, delimiter) {
    enableInterpolationString || throwSyntaxError(where());
    DELIMITER_CHECK.test(delimiter) && throwSyntaxError('Interpolation String opening tag incorrect at ' + where());
    let string;
    let lineRest;
    {
        const literals = [];
        for (const start = mark();;) {
            const literal = must('Interpolation String', start);
            if (literal.startsWith(delimiter)) {
                lineRest = literal.slice(delimiter.length).replace(PRE_WHITESPACE, '');
                break;
            }
            literals.push(literal);
        }
        string = literals.join('\n');
    }
    if (lineRest.startsWith('(')) {
        const interpolations_rest = INTERPOLATIONS.exec(lineRest) || throwSyntaxError(where());
        lineRest = interpolations_rest[2];
        for (const interpolation of interpolations_rest[1].match(INTERPOLATION)) {
            if (REGEXP_MODE.test(interpolation)) {
                const { 1: pattern, 2: flags, 3: Replacer } = PATTERN_FLAGS_REPLACER.exec(interpolation);
                let search;
                try {
                    search = new RegExp(pattern, flags);
                }
                catch (error) {
                    throw throwSyntaxError('Invalid regExp at ' + where());
                }
                let replacer;
                switch (Replacer[0]) {
                    case '\'':
                        replacer = Replacer.slice(1, -1);
                        break;
                    case '"':
                        replacer = BasicString(Replacer.slice(1, -1));
                        break;
                    case '{':
                        const map = newMap(Replacer, true);
                        replacer = (match) => map.has(match) ? map.get(match) : match;
                        break;
                    case '[':
                        const { 1: whole, 2: subs } = WHOLE_AND_SUBS.exec(Replacer);
                        const maps = [null];
                        for (const sub of subs.match(SUB)) {
                            maps.push(newMap(sub, true));
                        }
                        replacer = (...args) => whole.replace(DOLLAR, ($n) => {
                            if ($n === '$$') {
                                return '$';
                            }
                            const n = $n.slice(1);
                            const arg = args[n] || '';
                            const map = maps[n];
                            return map && map.has(arg) ? map.get(arg) : arg;
                        });
                        break;
                }
                string = string.replace(search, replacer);
            }
            else {
                const map = newMap(interpolation, false);
                let round = '';
                outer: for (let length = string.length, index = 0; index < length;) {
                    for (const { 0: search, 1: replacer } of map) {
                        if (string.startsWith(search, index)) {
                            round += replacer;
                            index += search.length;
                            continue outer;
                        }
                    }
                    round += string[index];
                    ++index;
                }
                string = round;
            }
        }
    }
    table[finalKey] = string;
    return lineRest;
}
function newMap(interpolation, usedForRegExp) {
    const map = new Map;
    const tokens = interpolation.match(INTERPOLATION_TOKEN);
    for (let length = tokens.length, index = 0; index < length;) {
        let search = tokens[index++];
        search = search[0] === '\'' ? search.slice(1, -1) : BasicString(search.slice(1, -1));
        usedForRegExp
            || search
            || throwSyntaxError('Characters to replace can not be empty, which was found at ' + where());
        map.has(search)
            && throwSyntaxError('Duplicate ' + (usedForRegExp ? 'replacer' : 'characters to replace') + ' at ' + where());
        let replacer = tokens[index++];
        replacer = replacer[0] === '\'' ? replacer.slice(1, -1) : BasicString(replacer.slice(1, -1));
        map.set(search, replacer);
    }
    return map;
}
function ensureConstructor(type) {
    customConstructors
        || throwSyntaxError(where());
    FUNCTION.has(customConstructors)
        || type in customConstructors
        || throwError(where());
}
function construct(type, value) {
    return FUNCTION.has(customConstructors)
        ? customConstructors(type, value)
        : customConstructors[type](value);
}

function parse(toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions = null) {
    if (isBuffer(toml_source)) {
        toml_source = toml_source.toString();
    }
    if (typeof toml_source !== 'string') {
        throw new TypeError('TOML.parse(source)');
    }
    if (toml_version !== 0.5) {
        throw new Error('TOML.parse(,version)');
    }
    use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
    const rootTable = new TableDepends;
    try {
        from(toml_source.replace(BOM, '').split(EOL));
        let lastSectionTable = rootTable;
        while (rest()) {
            const line = next().replace(PRE_WHITESPACE, '');
            if (line === '') ;
            else if (line.startsWith('#')) {
                if (keepComment) {
                    lastSectionTable[Symbol('#')] = line.slice(1);
                }
            }
            else if (line.startsWith('[')) {
                const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash } = TABLE_DEFINITION_exec(line);
                $_asArrayItem$$ === $$asArrayItem$_ || throwSyntaxError('Square brackets of table define statement not match at ' + where());
                lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, hash);
            }
            else {
                const rest = assignInline(lastSectionTable, line);
                if (rest === '') ;
                else if (rest.startsWith('#')) {
                    if (keepComment) {
                        lastSectionTable[Symbol('#')] = rest.slice(1);
                    }
                }
                else {
                    throwSyntaxError(where());
                }
            }
        }
    }
    finally {
        done();
        clear();
    }
    return rootTable;
}
function appendTable(table, key_key, asArrayItem, hash) {
    const leadingKeys = parseKeys(key_key);
    const finalKey = leadingKeys.pop();
    table = prepareTable(table, leadingKeys);
    let lastTable;
    if (asArrayItem) {
        let arrayOfTables;
        if (finalKey in table) {
            closeTables.has(arrayOfTables = table[finalKey]) && throwError('Trying to push Table to non-ArrayOfTables value at ' + where());
        }
        else {
            arrayOfTables = table[finalKey] = [];
        }
        arrayOfTables.push(lastTable = new TableDepends);
    }
    else {
        if (finalKey in table) {
            open && openTables.has(lastTable = table[finalKey]) || throwError('Duplicate Table definition at ' + where());
            openTables.delete(lastTable);
        }
        else {
            table[finalKey] = lastTable = new TableDepends;
        }
    }
    if (keepComment && hash) {
        table[Symbol_for(finalKey)] = hash.slice(1);
    }
    return lastTable;
}
function parseKeys(key_key) {
    const keys = key_key.match(KEYS);
    for (let index = keys.length; index--;) {
        const key = keys[index];
        if (key.startsWith('\'')) {
            keys[index] = key.slice(1, -1);
        }
        else if (key.startsWith('"')) {
            keys[index] = BasicString(key.slice(1, -1));
        }
    }
    return keys;
}
function prepareTable(table, keys) {
    const { length } = keys;
    let index = 0;
    while (index < length) {
        const key = keys[index++];
        if (key in table) {
            table = table[key];
            if (isTable(table)) {
                closeTables.has(table) && throwError('Trying to define table through static Inline Object at ' + where());
            }
            else if (isArray(table)) {
                closeTables.has(table) && throwError('Trying to append value to static Inline Array at ' + where());
                // @ts-ignore
                table = table[table.length - 1];
            }
            else {
                throwError('Trying to define table through non-Table value at ' + where());
            }
        }
        else {
            openTables.add(table = table[key] = new TableDepends);
            while (index < length) {
                openTables.add(table = table[keys[index++]] = new TableDepends);
            }
            return table;
        }
    }
    return table;
}
function prepareInlineTable(table, keys) {
    const { length } = keys;
    let index = 0;
    while (index < length) {
        const key = keys[index++];
        if (key in table) {
            table = table[key];
            isTable(table) || throwError('Trying to assign property through non-Table value at ' + where());
            closeTables.has(table) && throwError('Trying to assign property through static Inline Object at ' + where());
        }
        else {
            table = table[key] = new TableDepends;
            while (index < length) {
                table = table[keys[index++]] = new TableDepends;
            }
            return table;
        }
    }
    return table;
}
function assignInline(lastInlineTable, lineRest) {
    const { 1: left, 2: custom, 3: type, 4: right } = KEY_VALUE_PAIR_exec(lineRest);
    custom && ensureConstructor(type);
    const leadingKeys = parseKeys(left);
    const finalKey = leadingKeys.pop();
    const table = prepareInlineTable(lastInlineTable, leadingKeys);
    finalKey in table && throwError('Duplicate property definition at ' + where());
    switch (right[0]) {
        case '\'':
            lineRest = assignLiteralString(table, finalKey, right);
            break;
        case '"':
            lineRest = assignBasicString(table, finalKey, right);
            break;
        case '{':
            lineRest = assignInlineTable(table, finalKey, right);
            break;
        case '[':
            lineRest = assignInlineArray(table, finalKey, right);
            break;
        case '`':
            lineRest = assignInterpolationString(table, finalKey, right);
            break;
        default:
            let literal;
            ({ 1: literal, 2: lineRest } = VALUE_REST.exec(right) || throwSyntaxError(where()));
            table[finalKey] =
                literal === 'true' ? true : literal === 'false' ? false :
                    literal === 'inf' || literal === '+inf' ? Infinity : literal === '-inf' ? -Infinity :
                        literal === 'nan' || literal === '+nan' || literal === '-nan' ? NaN :
                            literal.includes(':') || literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
                                literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x') ? Float(literal) :
                                    enableNull && literal === 'null' || enableNil && literal === 'nil' ? null :
                                        IntegerDepends(literal);
            break;
    }
    if (custom) {
        table[finalKey] = construct(type, table[finalKey]);
    }
    if (keepComment && lineRest.startsWith('#')) {
        table[Symbol_for(finalKey)] = lineRest.slice(1);
        return '';
    }
    return lineRest;
}
function assignLiteralString(table, finalKey, literal) {
    let $;
    if (literal.charAt(1) !== '\'' || literal.charAt(2) !== '\'') {
        $ = LITERAL_STRING.exec(literal) || throwSyntaxError(where());
        table[finalKey] = $[1];
        return $[2];
    }
    literal = literal.slice(3);
    $ = MULTI_LINE_LITERAL_STRING.exec(literal);
    if ($) {
        CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at ' + where());
        table[finalKey] = $[1];
        return $[2];
    }
    if (literal) {
        CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at ' + where());
        literal += useWhatToJoinMultiLineString;
    }
    const start = mark();
    for (;;) {
        const line = must('Literal String', start);
        $ = MULTI_LINE_LITERAL_STRING.exec(line);
        if ($) {
            CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at ' + where());
            table[finalKey] = literal + $[1];
            return $[2];
        }
        literal += line + useWhatToJoinMultiLineString;
    }
}
function assignBasicString(table, finalKey, literal) {
    if (literal.charAt(1) !== '"' || literal.charAt(2) !== '"') {
        const $ = BASIC_STRING_exec(literal);
        table[finalKey] = BasicString($[1]);
        return $[2];
    }
    literal = literal.slice(3);
    const $ = MULTI_LINE_BASIC_STRING_exec_0(literal);
    if (literal.startsWith('"""', $.length)) {
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throwSyntaxError(where());
        table[finalKey] = BasicString($);
        return literal.slice($.length + 3).replace(PRE_WHITESPACE, '');
    }
    if (literal) {
        literal += '\n';
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throwSyntaxError(where());
    }
    const start = mark();
    for (;;) {
        let line = must('Basic String', start);
        const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
        if (line.startsWith('"""', $.length)) {
            ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throwSyntaxError(where());
            table[finalKey] = MultiLineBasicString(literal + $);
            return line.slice($.length + 3).replace(PRE_WHITESPACE, '');
        }
        line += '\n';
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throwSyntaxError(where());
        literal += line;
    }
}
function assignInlineTable(table, finalKey, lineRest) {
    const inlineTable = table[finalKey] = new TableDepends;
    closeTables.add(inlineTable);
    lineRest = lineRest.replace(SYM_WHITESPACE, '');
    if (allowInlineTableMultiLineAndTrailingCommaEvenNoComma) {
        const start = mark();
        for (;;) {
            for (;;) {
                if (lineRest === '') ;
                else if (lineRest.startsWith('#')) {
                    if (keepComment) {
                        table[Symbol('#')] = lineRest.slice(1);
                    }
                }
                else {
                    break;
                }
                lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
            }
            if (lineRest.startsWith('}')) {
                return lineRest.replace(SYM_WHITESPACE, '');
            }
            lineRest = assignInline(inlineTable, lineRest);
            for (;;) {
                if (lineRest === '') ;
                else if (lineRest.startsWith('#')) {
                    if (keepComment) {
                        table[Symbol('#')] = lineRest.slice(1);
                    }
                }
                else {
                    break;
                }
                lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
            }
            if (lineRest.startsWith(',')) {
                lineRest = lineRest.replace(SYM_WHITESPACE, '');
            }
        }
    }
    else {
        if (lineRest.startsWith('}')) {
            return lineRest.replace(SYM_WHITESPACE, '');
        }
        (lineRest === '' || lineRest.startsWith('#')) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at ' + where());
        for (;;) {
            lineRest = assignInline(inlineTable, lineRest);
            if (lineRest.startsWith('}')) {
                return lineRest.replace(SYM_WHITESPACE, '');
            }
            if (lineRest.startsWith(',')) {
                lineRest = lineRest.replace(SYM_WHITESPACE, '');
                lineRest.startsWith('}') && throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at ' + where());
            }
            (lineRest === '' || lineRest.startsWith('#')) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at ' + where());
        }
    }
}
function assignInlineArray(table, finalKey, lineRest) {
    const inlineArray = table[finalKey] = [];
    closeTables.add(inlineArray);
    const start = mark();
    lineRest = lineRest.replace(SYM_WHITESPACE, '');
    for (;;) {
        if (lineRest === '') ;
        else if (lineRest.startsWith('#')) {
            if (keepComment) {
                table[Symbol('#')] = lineRest.slice(1);
            }
        }
        else {
            break;
        }
        lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
    }
    if (lineRest.startsWith(']')) {
        return lineRest.replace(SYM_WHITESPACE, '');
    }
    for (;;) {
        lineRest = pushInline(inlineArray, lineRest);
        for (;;) {
            if (lineRest === '') ;
            else if (lineRest.startsWith('#')) {
                if (keepComment) {
                    table[Symbol('#')] = lineRest.slice(1);
                }
            }
            else {
                break;
            }
            lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
        }
        if (lineRest.startsWith(',')) {
            lineRest = lineRest.replace(SYM_WHITESPACE, '');
            if (keepComment && lineRest.startsWith('#')) {
                inlineArray[Symbol_for(inlineArray.length - 1 + '')] = lineRest.slice(1);
                lineRest = '';
            }
            for (;;) {
                if (lineRest === '') ;
                else if (lineRest.startsWith('#')) {
                    if (keepComment) {
                        table[Symbol('#')] = lineRest.slice(1);
                    }
                }
                else {
                    break;
                }
                lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
            }
            if (lineRest.startsWith(']')) {
                return lineRest.replace(SYM_WHITESPACE, '');
            }
        }
        else {
            if (lineRest.startsWith(']')) {
                return lineRest.replace(SYM_WHITESPACE, '');
            }
            throwSyntaxError(where());
        }
    }
}
function pushInline(array, lineRest) {
    const custom = lineRest.startsWith('!!');
    let type;
    if (custom) {
        //options.typify && iterator.throwSyntaxError('Only mixable arrays could contain custom type. Check '+iterator.where());
        ({ 1: type, 2: lineRest } = _VALUE_PAIR.exec(lineRest) || throwSyntaxError(where()));
        ensureConstructor(type);
    }
    const lastIndex = '' + array.length;
    switch (lineRest[0]) {
        case '\'':
            lineRest = assignLiteralString(asStrings(array), lastIndex, lineRest);
            break;
        case '"':
            lineRest = assignBasicString(asStrings(array), lastIndex, lineRest);
            break;
        case '{':
            lineRest = assignInlineTable(asTables(array), lastIndex, lineRest);
            break;
        case '[':
            lineRest = assignInlineArray(asArrays(array), lastIndex, lineRest);
            break;
        case '`':
            lineRest = assignInterpolationString(asStrings(array), lastIndex, lineRest);
            break;
        default:
            let literal;
            ({ 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throwSyntaxError(where()));
            if (literal === 'true') {
                asBooleans(array).push(true);
            }
            else if (literal === 'false') {
                asBooleans(array).push(false);
            }
            else if (literal === 'inf' || literal === '+inf') {
                asFloats(array).push(Infinity);
            }
            else if (literal === '-inf') {
                asFloats(array).push(-Infinity);
            }
            else if (literal === 'nan' || literal === '+nan' || literal === '-nan') {
                asFloats(array).push(NaN);
            }
            else if (literal.includes(':') || literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-')) {
                asDatetimes(array).push(new Datetime(literal));
            }
            else if (literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x')) {
                asFloats(array).push(Float(literal));
            }
            else if (enableNull && literal === 'null' || enableNil && literal === 'nil') {
                asNulls(array).push(null);
            }
            else {
                asIntegers(array).push(IntegerDepends(literal));
            }
            break;
    }
    if (custom) {
        array[lastIndex] = construct(type, array[lastIndex]);
    }
    if (keepComment && lineRest.startsWith('#')) {
        array[Symbol_for(lastIndex)] = lineRest.slice(1);
        return '';
    }
    return lineRest;
}

const TOML = {
    parse,
    version,
    get default() { return this; }
};

module.exports = TOML;

//# sourceMappingURL=index.js.map