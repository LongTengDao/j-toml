'use strict';

const version = '0.5.88';

const isBuffer = Buffer.isBuffer;

const from = Buffer.from;

//import * as options\$0 from './options\$0';
const NONE = [];
let sourceLines = NONE;
let lastLineIndex = -1;
let lineIndex = -1;
function noop(lineRest) { return ''; }
noop.previous = noop;
let stacks_length = 0;
let last = noop;
function could() {
    if (sourceLines !== NONE) {
        throw Error('Inner error: parsing in parsing.');
    }
}
const EOL = /\r?\n/;
function todo(source) {
    sourceLines = source.split(EOL);
    lastLineIndex = sourceLines.length - 1;
    lineIndex = -1;
    stacks_length = 0;
    last = noop;
}
const next = () => sourceLines[++lineIndex];
const rest = () => lineIndex !== lastLineIndex;
const mark = () => lineIndex;
function must(message, startIndex) {
    lineIndex === lastLineIndex
        && throws(SyntaxError(message + ' is not close until the end of the file, which started from line ' + (startIndex + 1) + ': ' + sourceLines[startIndex]));
    return sourceLines[++lineIndex];
}
const where = () => 'line ' + (lineIndex + 1) + ': ' + sourceLines[lineIndex];
function done() {
    sourceLines = NONE;
    last = noop;
}
function stacks_pop() {
    const item = last;
    last = last.previous;
    --stacks_length;
    return item;
}
function stacks_push(item) {
    item.previous = last;
    last = item;
    ++stacks_length;
}
function stacks_insertBeforeLast(item) {
    item.previous = last.previous;
    last.previous = item;
    ++stacks_length;
}
function throws(error) {
    if (sourceLines !== NONE) {
        error.lineIndex = lineIndex;
        error.lineNumber = lineIndex + 1;
        //done();
        //options\$0.clear();
    }
    throw error;
}

const isSafeInteger = Number.isSafeInteger;

/*!
 * 模块名称：@ltd/j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string.
 * 模块版本：2.7.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const create = Object.create;

const defineProperty = Reflect.defineProperty;

const deleteProperty = Reflect.deleteProperty;

const ownKeys = Reflect.ownKeys;

const ownKeysKeepers = new WeakMap;
const handlers = 
/*#__PURE__*/
Object.assign(create(null), {
    defineProperty(target, key, descriptor) {
        if (defineProperty(target, key, descriptor)) {
            ownKeysKeepers.get(target).add(key);
            return true;
        }
        return false;
    },
    deleteProperty(target, key) {
        if (deleteProperty(target, key)) {
            ownKeysKeepers.get(target).delete(key);
            return true;
        }
        return false;
    },
    ownKeys(target) {
        return [...ownKeysKeepers.get(target)];
    },
});
const orderify = (object) => {
    ownKeysKeepers.set(object, new Set(ownKeys(object)));
    return new Proxy(object, handlers);
};

/*¡ @ltd/j-orderify */

const Table = function Table() { };
const OrderedTable = function Table() { return orderify(this); };
OrderedTable.prototype = Table.prototype = create(null);
function isTable(value) { return value instanceof Table; }

const INTEGER = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)$/;
const XOB_INTEGER = /^0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/;
const UNDERSCORES_SIGN = /_|^[-+]/g;
const NumberInteger = (literal) => {
    INTEGER.test(literal)
        || /*options\$0.xob && */ XOB_INTEGER.test(literal)
        || throws(SyntaxError('Invalid Integer ' + literal + ' at ' + where()));
    const number = literal.startsWith('-')
        ? -literal.replace(UNDERSCORES_SIGN, '')
        : +literal.replace(UNDERSCORES_SIGN, '');
    allowLonger
        || isSafeInteger(number)
        || throws(RangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes ' + literal + ' meet at ' + where()));
    return number;
};
const BigIntInteger = (literal) => {
    INTEGER.test(literal)
        || /*options\$0.xob && */ XOB_INTEGER.test(literal)
        || throws(SyntaxError('Invalid Integer ' + literal + ' at ' + where()));
    let bigInt = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
    if (literal.startsWith('-')) {
        bigInt = -bigInt;
    }
    allowLonger
        || -9223372036854775808n <= bigInt && bigInt <= 9223372036854775807n // ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
        || throws(RangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ' + literal + ' meet at ' + where()));
    return bigInt;
};
const DependInteger = (literal) => {
    const bigInt = BigIntInteger(literal);
    return IntegerMin <= bigInt && bigInt <= IntegerMax ? +(bigInt + '') : bigInt;
};

/* options */
let useWhatToJoinMultiLineString;
let IntegerDepends;
let IntegerMin;
let IntegerMax;
let inlineTable;
let slashEscaping;
let strictBareKey;
let moreDatetime;
let ctrl7F;
let disallowEmptyKey;
//export const xob :boolean = true;
let sFloat;
let TableDepends;
let unreopenable;
let allowLonger;
let enableNull;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma;
let enableInterpolationString;
let asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes;
const arrayTypes = new WeakMap;
let As = () => function as(array) {
    if (arrayTypes.has(array)) {
        arrayTypes.get(array) === as
            || throws(TypeError('Types in array must be same. Check ' + where()));
    }
    else {
        arrayTypes.set(array, as);
    }
    return array;
};
const asInlineArrayOfNulls = As(), asInlineArrayOfStrings = As(), asInlineArrayOfTables = As(), asInlineArrayOfArrays = As(), asInlineArrayOfBooleans = As(), asInlineArrayOfFloats = As(), asInlineArrayOfIntegers = As(), asInlineArrayOfOffsetDateTimes = As(), asInlineArrayOfLocalDateTimes = As(), asInlineArrayOfLocalDates = As(), asInlineArrayOfLocalTimes = As();
As = null;
/* xOptions.mix */
const unType = (array) => array;
/* xOptions.tag */
let processor;
let collection = [];
function collect_on(each) { collection.push(each); }
function collect_off(each) { throw throws(SyntaxError(where())); }
let collect = collect_off;
function process() {
    let index = collection.length;
    if (index) {
        done();
        const process = processor;
        const queue = collection;
        processor = null;
        collection = [];
        while (index--) {
            process(queue.pop());
        }
    }
}
/* use & clear */
function clear() {
    processor = null;
    collection.length = 0;
}
function use(specificationVersion, multiLineJoiner, useBigInt, xOptions) {
    if (specificationVersion === 0.5) {
        moreDatetime = ctrl7F = sFloat = strictBareKey = inlineTable = true;
        disallowEmptyKey = slashEscaping = false;
    }
    else if (specificationVersion === 0.4) {
        disallowEmptyKey = strictBareKey = inlineTable = true;
        moreDatetime = ctrl7F = sFloat = slashEscaping = false;
    }
    else if (specificationVersion === 0.3) {
        disallowEmptyKey = slashEscaping = true;
        moreDatetime = ctrl7F = sFloat = strictBareKey = inlineTable = false;
    }
    else {
        throw Error('TOML.parse(,specificationVersion)');
    }
    if (typeof multiLineJoiner === 'string') {
        useWhatToJoinMultiLineString = multiLineJoiner;
    }
    else {
        throw TypeError('TOML.parse(,,multiLineJoiner)');
    }
    if (useBigInt === true) {
        IntegerDepends = BigIntInteger;
    }
    else if (useBigInt === false) {
        IntegerDepends = NumberInteger;
    }
    else {
        if (typeof useBigInt !== 'number') {
            throw TypeError('TOML.parse(,,,useBigInt)');
        }
        if (!isSafeInteger(useBigInt)) {
            throw RangeError('TOML.parse(,,,useBigInt)');
        }
        IntegerDepends = DependInteger;
        if (useBigInt >= 0) {
            IntegerMin = -(IntegerMax = useBigInt);
        }
        else {
            IntegerMax = -(IntegerMin = useBigInt) - 1;
        }
    }
    let typify;
    if (xOptions === null) {
        TableDepends = Table;
        allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = unreopenable = false;
        processor = null;
        typify = true;
    }
    else {
        TableDepends = xOptions.order ? OrderedTable : Table;
        allowLonger = !!xOptions.longer;
        enableNull = !!xOptions.null;
        allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!xOptions.multi;
        enableInterpolationString = !!xOptions.ins;
        unreopenable = !!xOptions.close;
        typify = !xOptions.mix;
        processor = xOptions.tag || null;
        if (processor) {
            if (typeof processor !== 'function') {
                throw TypeError('TOML.parse(,,,,xOptions.tag)');
            }
            if (typify) {
                throw Error('TOML.parse(,,,,xOptions) xOptions.tag needs xOptions.mix to be true');
            }
            collect = collect_on;
        }
        else {
            collect = collect_off;
        }
    }
    if (typify) {
        asNulls = asInlineArrayOfNulls;
        asStrings = asInlineArrayOfStrings;
        asTables = asInlineArrayOfTables;
        asArrays = asInlineArrayOfArrays;
        asBooleans = asInlineArrayOfBooleans;
        asFloats = asInlineArrayOfFloats;
        asIntegers = asInlineArrayOfIntegers;
        asOffsetDateTimes = asInlineArrayOfOffsetDateTimes;
        asLocalDateTimes = asInlineArrayOfLocalDateTimes;
        asLocalDates = asInlineArrayOfLocalDates;
        asLocalTimes = asInlineArrayOfLocalTimes;
    }
    else {
        asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = unType;
    }
}

const Infinity = 1/0;

const NaN = 0/0;

/*!
 * 模块名称：@ltd/j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：1.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

const slice = Array.prototype.slice;

var NT = /[\n\t]/g;
function Source(raw, substitutions) {
    var source = raw[0];
    for (var length = substitutions.length, index = 0; index < length;) {
        var substitution = substitutions[index];
        source += (substitution instanceof RegExp ? substitution.source : substitution) + raw[++index];
    }
    return source.replace(NT, '');
}
function newRegExp(template) {
    return RegExp(Source(template.raw, slice.call(arguments, 1)));
}

/*¡ @ltd/j-regexp */

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;
const YMD = newRegExp `
	\d\d\d\d-
	(?:
		(?:0[13578]|1[02])-${_31_}
	|
		(?:0[469]|11)-${_30_}
	|
		02-${_29_}
	)`;
const HMS_ = newRegExp `
	${_23_}:${_59_}:${_59_}(?:\.\d+)?`;
const OFFSET = /(?:Z|[+-]\d\d:\d\d)$/;
const OFFSET_DATETIME = newRegExp `
	^
	${YMD}
	[T ]
	${HMS_}
	${OFFSET}`;
const LOCAL_DATETIME = newRegExp `
	^
	${YMD}
	[T ]
	${HMS_}
	$`;
const LOCAL_DATE = newRegExp `
	^
	${YMD}
	$`;
const LOCAL_TIME = newRegExp `
	^
	${HMS_}
	$`;
const literal_cache = new WeakMap;
const value_cache = new WeakMap;
class Datetime extends Date {
    constructor(expression, literal) {
        super(expression);
        literal_cache.set(this, literal);
        value_cache.set(this, this.getTime());
    }
    // Date.prototype.toJSON => toISOString
    toISOString() {
        if (this.getTime() === value_cache.get(this)) {
            return literal_cache.get(this);
        }
        throw Error('Datetime value has been modified.');
    }
}
class OffsetDateTime extends Datetime {
    constructor(literal) {
        OFFSET_DATETIME.test(literal)
            || throws(SyntaxError('Invalid Offset Date-Time ' + literal + ' at ' + where()));
        super(literal.replace(' ', 'T'), literal);
    }
    get '.'() {
        const index = literal_cache.get(this).indexOf('.') + 1;
        return index ? literal_cache.get(this).slice(index).replace(OFFSET, '') : '';
    }
}
class LocalDateTime extends Datetime {
    constructor(literal) {
        LOCAL_DATETIME.test(literal)
            || throws(SyntaxError('Invalid Local Date-Time ' + literal + ' at ' + where()));
        super(literal.replace(' ', 'T') + 'Z', literal);
    }
    get '.'() {
        const index = literal_cache.get(this).indexOf('.') + 1;
        return index ? literal_cache.get(this).slice(index) : '';
    }
}
class LocalDate extends Datetime {
    constructor(literal) {
        LOCAL_DATE.test(literal)
            || throws(SyntaxError('Invalid Local Date ' + literal + ' at ' + where()));
        super(literal + 'T00:00:00.000Z', literal);
    }
    get '.'() { return ''; }
}
class LocalTime extends Datetime {
    constructor(literal) {
        LOCAL_TIME.test(literal)
            || throws(SyntaxError('Invalid Local Time ' + literal + ' at ' + where()));
        super('1970-01-01T' + literal + 'Z', literal);
    }
    get '.'() {
        const index = literal_cache.get(this).indexOf('.') + 1;
        return index ? literal_cache.get(this).slice(index) : '';
    }
}

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
const UNDERSCORES = /_/g;
const Float = (literal) => {
    if (FLOAT.test(literal) && FLOAT_NOT_INTEGER.test(literal)) {
        if (sFloat) {
            return +literal.replace(UNDERSCORES, '');
        }
        else {
            const number = +literal.replace(UNDERSCORES, '');
            isFinite(number) || throws(RangeError('Float can not be as big as Infinity before TOML v0.5, like ' + literal + ' at ' + where()));
            return number;
        }
    }
    //if ( options\$0.sFloat ) {
    //	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
    //	if ( literal==='-inf' ) { return -Infinity; }
    //	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
    //}
    throw throws(SyntaxError('Invalid Float ' + literal + ' at ' + where()));
};

/* nested (readable) */
const Whitespace = /[ \t]/;
const PRE_WHITESPACE = newRegExp `
	^${Whitespace}+`;
const VALUE_REST = newRegExp `
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	([^]*)
	$`;
const LITERAL_STRING = newRegExp `
	^
	'([^']*)'
	${Whitespace}*
	([^]*)`;
const MULTI_LINE_LITERAL_STRING = newRegExp `
	^
	([^]*?)
	'''
	${Whitespace}*
	([^]*)`;
const SYM_WHITESPACE = newRegExp `
	^
	[^]
	${Whitespace}*`;
const Tag = /[^<>\\"'`\r\n\u2028\u2029]+/;
const KEY_VALUE_PAIR = newRegExp `
	^
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(
		[^ \t#]
		[^]*
	)
	$`;
const _VALUE_PAIR = newRegExp `
	^
	<(${Tag})>
	${Whitespace}*
	([^ \t#][^]*)
	$`;
const TAG_REST = newRegExp `
	^
	<(${Tag})>
	${Whitespace}*
	([^]*)
	$`;
/* optimized (avoid overflow or lost) */
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
const ESCAPED_EXCLUDE_CONTROL_CHARACTER = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESS = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(_) {
    return _.replace(ctrl7F ? ESCAPED_EXCLUDE_CONTROL_CHARACTER :
        slashEscaping ? ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER :
            ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESS, '') === '';
}
const BASIC_STRING = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_LESS = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_LESSER = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
function BASIC_STRING_exec(_2) {
    const basic_string = ctrl7F ? BASIC_STRING :
        slashEscaping ? BASIC_STRING_LESSER :
            BASIC_STRING_LESS;
    _2 = _2.slice(1);
    for (let _1 = '';;) {
        const $ = basic_string.exec(_2);
        if ($ === null) {
            _2.startsWith('"') || throws(SyntaxError(where()));
            return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
        }
        _1 += $[0];
        _2 = _2.slice($[0].length);
    }
}
const BARE_KEY_STRICT = /^[\w-]+/;
const BARE_KEY_FREE = /^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/;
const LITERAL_KEY = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const LITERAL_KEY_LESSER = /^'[^'\x00-\x08\x0B-\x1F]*'/;
const DOT_KEY = /^[ \t]*\.[ \t]*/;
function TABLE_DEFINITION_exec_groups(_) {
    const $_asArrayItem$$ = _.charAt(1) === '[';
    _ = _.slice($_asArrayItem$$ ? 2 : 1).replace(PRE_WHITESPACE, '');
    const keys = getKeys(_);
    _ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
    let tagInner = '';
    if (_.startsWith('<')) {
        ({ 1: tagInner, 2: _ } = TAG_REST.exec(_) || throws(SyntaxError(where())));
    }
    _.startsWith(']') || throws(SyntaxError(where()));
    const $$asArrayItem$_ = _.charAt(1) === ']';
    _ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
    let tagOuter = '';
    if (_.startsWith('<')) {
        ({ 1: tagOuter, 2: _ } = TAG_REST.exec(_) || throws(SyntaxError(where())));
    }
    _ === '' || _.startsWith('#') || throws(SyntaxError(where()));
    return { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter };
}
function KEY_VALUE_PAIR_exec_groups(_) {
    const _1 = getKeys(_);
    const $ = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || throws(SyntaxError(where()));
    return { left: _1, tagLeft: $[1] || '', tagRight: $[2] || '', right: $[3] };
}
function getKeys(_) {
    const literal_key = ctrl7F ? LITERAL_KEY : LITERAL_KEY_LESSER;
    for (let keys = '';;) {
        if (_.startsWith('"')) {
            _ = _.slice(1);
            for (let key = '"';;) {
                const $ = BASIC_STRING.exec(_);
                if ($ === null) {
                    _.startsWith('"') || throws(SyntaxError(where()));
                    _ = _.slice(1);
                    keys += key + '"';
                    break;
                }
                _ = _.slice($[0].length);
                key += $[0];
            }
        }
        else {
            const key = ((_.startsWith('\'') ? literal_key : strictBareKey ? BARE_KEY_STRICT : BARE_KEY_FREE).exec(_) || throws(SyntaxError(where())))[0];
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

const isArray = Array.isArray;

const fromCodePoint = String.fromCodePoint;

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r', '"': '"', '/': '/', '\\': '\\' };
const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"btnfr/])|u(.{4})|U(.{8}))/g;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?: *(\n)[ \n]*|([\\"btnfr/])|u([^]{4})|U([^]{8}))/g;
const unEscapeSingleLine = (match, p1, p2, p3) => {
    if (p1) {
        return ESCAPE_ALIAS[p1];
    }
    const codePoint = parseInt(p2 || p3, 16);
    (0xD7FF < codePoint && codePoint < 0xE000 || 0x10FFFF < codePoint)
        && throws(RangeError('Invalid Unicode Scalar ' + (p2 ? '\\u' + p2 : '\\U' + p3) + ' at ' + where()));
    return fromCodePoint(codePoint);
};
const unEscapeMultiLine = (match, p1, p2, p3, p4) => {
    if (match === '\n') {
        return useWhatToJoinMultiLineString;
    }
    if (p1) {
        return '';
    }
    if (p2) {
        return ESCAPE_ALIAS[p2];
    }
    const codePoint = parseInt(p3 || p4, 16);
    (0xD7FF < codePoint && codePoint < 0xE000 || 0x10FFFF < codePoint)
        && throws(RangeError('Invalid Unicode Scalar ' + (p3 ? '\\u' + p3 : '\\U' + p4) + ' at ' + where()));
    return fromCodePoint(codePoint);
};
const BasicString = (literal) => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
const MultiLineBasicString = (literal) => literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);

const sealedInline = new WeakSet;
const openTables = new WeakSet;
const reopenedTables = new WeakSet;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
function appendTable(table, key_key, asArrayItem, tag) {
    const leadingKeys = parseKeys(key_key);
    const finalKey = leadingKeys.pop();
    table = prepareTable(table, leadingKeys);
    let lastTable;
    if (asArrayItem) {
        let arrayOfTables;
        if (finalKey in table) {
            sealedInline.has(arrayOfTables = table[finalKey]) && throws(Error('Trying to push Table to non-ArrayOfTables value at ' + where()));
        }
        else {
            arrayOfTables = table[finalKey] = [];
        }
        tag && collect({ table, key: finalKey, array: arrayOfTables, index: arrayOfTables.length, tag });
        arrayOfTables.push(lastTable = new TableDepends);
    }
    else {
        if (finalKey in table) {
            if (unreopenable || !openTables.has(lastTable = table[finalKey]) || reopenedTables.has(lastTable)) {
                throw throws(Error('Duplicate Table definition at ' + where()));
            }
            openTables.delete(lastTable);
        }
        else {
            table[finalKey] = lastTable = new TableDepends;
            unreopenable || reopenedTables.add(lastTable);
        }
        tag && collect({ table, key: finalKey, tag });
    }
    return lastTable;
}
function parseKeys(key_key) {
    const keys = key_key.match(strictBareKey ? KEYS_STRICT : KEYS_FREE);
    for (let index = keys.length; index--;) {
        const key = keys[index];
        if (key.startsWith('\'')) {
            keys[index] = key.slice(1, -1);
        }
        else if (key.startsWith('"')) {
            keys[index] = BasicString(key.slice(1, -1));
        }
    }
    if (disallowEmptyKey) {
        for (let index = keys.length; index--;) {
            keys[index] || throws(SyntaxError('Empty key is not allowed before TOML v0.5, which at ' + where()));
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
                sealedInline.has(table) && throws(Error('Trying to define table through static Inline Object at ' + where()));
            }
            else if (isArray(table)) {
                sealedInline.has(table) && throws(Error('Trying to append value to static Inline Array at ' + where()));
                // @ts-ignore
                table = table[table.length - 1];
            }
            else {
                throws(Error('Trying to define table through non-Table value at ' + where()));
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
            isTable(table) || throws(Error('Trying to assign property through non-Table value at ' + where()));
            sealedInline.has(table) && throws(Error('Trying to assign property through static Inline Object at ' + where()));
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
function assignLiteralString(table, finalKey, literal) {
    let $;
    if (literal.charAt(1) !== '\'' || literal.charAt(2) !== '\'') {
        $ = LITERAL_STRING.exec(literal) || throws(SyntaxError(where()));
        table[finalKey] = checkLiteralString($[1]);
        return $[2];
    }
    literal = literal.slice(3);
    $ = MULTI_LINE_LITERAL_STRING.exec(literal);
    if ($) {
        table[finalKey] = checkLiteralString($[1]);
        return $[2];
    }
    if (literal) {
        checkLiteralString(literal);
        literal += useWhatToJoinMultiLineString;
    }
    const start = mark();
    for (;;) {
        const line = must('Literal String', start);
        $ = MULTI_LINE_LITERAL_STRING.exec(line);
        if ($) {
            table[finalKey] = literal + checkLiteralString($[1]);
            return $[2];
        }
        literal += line + useWhatToJoinMultiLineString;
    }
}
const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_LESSER = /[\x00-\x08\x0B-\x1F]/;
function checkLiteralString(literal) {
    (ctrl7F ? CONTROL_CHARACTER_EXCLUDE_TAB : CONTROL_CHARACTER_EXCLUDE_TAB_LESSER).test(literal) && throws(SyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at ' + where()));
    return literal;
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
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(where()));
        table[finalKey] = MultiLineBasicString($);
        return literal.slice($.length + 3).replace(PRE_WHITESPACE, '');
    }
    if (literal) {
        literal += '\n';
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throws(SyntaxError(where()));
    }
    const start = mark();
    for (;;) {
        let line = must('Basic String', start);
        const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
        if (line.startsWith('"""', $.length)) {
            ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(where()));
            table[finalKey] = MultiLineBasicString(literal + $);
            return line.slice($.length + 3).replace(PRE_WHITESPACE, '');
        }
        line += '\n';
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throws(SyntaxError(where()));
        literal += line;
    }
}

const DELIMITER_CHECK = /[^`]/;
function assignInterpolationString(table, finalKey, delimiter) {
    enableInterpolationString || throws(SyntaxError(where()));
    DELIMITER_CHECK.test(delimiter) && throws(SyntaxError('Interpolation String opening tag incorrect at ' + where()));
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
    table[finalKey] = string;
    return lineRest;
}

function Root() {
    const rootTable = new TableDepends;
    let lastSectionTable = rootTable;
    while (rest()) {
        const line = next().replace(PRE_WHITESPACE, '');
        if (line === '') ;
        else if (line.startsWith('#')) ;
        else if (line.startsWith('[')) {
            const { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter } = TABLE_DEFINITION_exec_groups(line);
            $_asArrayItem$$ === $$asArrayItem$_ || throws(SyntaxError('Square brackets of table define statement not match at ' + where()));
            tagInner && tagOuter && throws(SyntaxError('Tag for table define statement can not both in and out, which at ' + where()));
            lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tagOuter || tagInner);
        }
        else {
            let rest = assign(lastSectionTable, line);
            while (stacks_length) {
                rest = stacks_pop()(rest);
            }
            rest === '' || rest.startsWith('#') || throws(SyntaxError(where()));
        }
    }
    return rootTable;
}
function assign(lastInlineTable, lineRest) {
    let left;
    let tagLeft;
    let tagRight;
    ({ left, tagLeft, tagRight, right: lineRest } = KEY_VALUE_PAIR_exec_groups(lineRest));
    const leadingKeys = parseKeys(left);
    const finalKey = leadingKeys.pop();
    const table = prepareInlineTable(lastInlineTable, leadingKeys);
    finalKey in table && throws(Error('Duplicate property definition at ' + where()));
    tagLeft && collect({ table, key: finalKey, tag: tagLeft });
    tagRight && collect({ table, key: finalKey, tag: tagRight });
    switch (lineRest[0]) {
        case '\'':
            lineRest = assignLiteralString(table, finalKey, lineRest);
            if (lineRest.startsWith('<')) {
                tagRight && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tagRight, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ table, key: finalKey, tag: tagRight });
            }
            return lineRest;
        case '"':
            lineRest = assignBasicString(table, finalKey, lineRest);
            if (lineRest.startsWith('<')) {
                tagRight && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tagRight, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ table, key: finalKey, tag: tagRight });
            }
            return lineRest;
        case '`':
            lineRest = assignInterpolationString(table, finalKey, lineRest);
            if (lineRest.startsWith('<')) {
                tagRight && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tagRight, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ table, key: finalKey, tag: tagRight });
            }
            return lineRest;
        case '{':
            inlineTable || throws(SyntaxError('Inline table is not allowed before TOML v0.4, which at ' + where()));
            stacks_push((lineRest) => equalInlineTable(table, finalKey, lineRest));
            return lineRest;
        case '[':
            stacks_push((lineRest) => equalInlineArray(table, finalKey, lineRest));
            return lineRest;
    }
    let literal;
    ({ 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where())));
    if (lineRest.startsWith('<')) {
        tagRight && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
        ({ 1: tagRight, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
        collect({ table, key: finalKey, tag: tagRight });
    }
    if (sFloat) {
        if (literal === 'inf' || literal === '+inf') {
            table[finalKey] = Infinity;
            return lineRest;
        }
        if (literal === '-inf') {
            table[finalKey] = -Infinity;
            return lineRest;
        }
        if (literal === 'nan' || literal === '+nan' || literal === '-nan') {
            table[finalKey] = NaN;
            return lineRest;
        }
    }
    if (literal.includes(':')) {
        if (literal.includes('-')) {
            if (OFFSET.test(literal)) {
                table[finalKey] = new OffsetDateTime(literal);
            }
            else {
                moreDatetime || throws(SyntaxError(where()));
                table[finalKey] = new LocalDateTime(literal);
            }
        }
        else {
            moreDatetime || throws(SyntaxError(where()));
            table[finalKey] = new LocalTime(literal);
        }
        return lineRest;
    }
    if (literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-')) {
        moreDatetime || throws(SyntaxError(where()));
        table[finalKey] = new LocalDate(literal);
        return lineRest;
    }
    table[finalKey] =
        literal === 'true' ? true : literal === 'false' ? false :
            literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x') ? Float(literal) :
                enableNull && literal === 'null' ? null :
                    IntegerDepends(literal);
    return lineRest;
}
function push(lastArray, lineRest) {
    let alreadyBefore = lineRest.startsWith('<');
    let tag;
    if (alreadyBefore) {
        ({ 1: tag, 2: lineRest } = _VALUE_PAIR.exec(lineRest) || throws(SyntaxError(where())));
        collect({ array: lastArray, index: lastArray.length, tag });
    }
    const lastIndex = '' + lastArray.length;
    switch (lineRest[0]) {
        case '\'':
            lineRest = assignLiteralString(asStrings(lastArray), lastIndex, lineRest);
            if (lineRest.startsWith('<')) {
                alreadyBefore && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tag, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ array: lastArray, index: lastArray.length - 1, tag });
            }
            return lineRest;
        case '"':
            lineRest = assignBasicString(asStrings(lastArray), lastIndex, lineRest);
            if (lineRest.startsWith('<')) {
                alreadyBefore && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tag, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ array: lastArray, index: lastArray.length - 1, tag });
            }
            return lineRest;
        case '`':
            lineRest = assignInterpolationString(asStrings(lastArray), lastIndex, lineRest);
            if (lineRest.startsWith('<')) {
                alreadyBefore && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
                ({ 1: tag, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
                collect({ array: lastArray, index: lastArray.length - 1, tag });
            }
            return lineRest;
        case '{':
            inlineTable || throws(SyntaxError('Inline table is not allowed before TOML v0.4, which at ' + where()));
            stacks_push(lineRest => equalInlineTable(asTables(lastArray), lastIndex, lineRest));
            return lineRest;
        case '[':
            stacks_push(lineRest => equalInlineArray(asArrays(lastArray), lastIndex, lineRest));
            return lineRest;
    }
    let literal;
    ({ 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where())));
    if (lineRest.startsWith('<')) {
        alreadyBefore && throws(SyntaxError('Tag can not be placed at both side of a value, which at ' + where()));
        ({ 1: tag, 2: lineRest } = TAG_REST.exec(lineRest) || throws(SyntaxError(where())));
        collect({ array: lastArray, index: lastArray.length, tag });
    }
    if (sFloat) {
        if (literal === 'inf' || literal === '+inf') {
            asFloats(lastArray).push(Infinity);
            return lineRest;
        }
        if (literal === '-inf') {
            asFloats(lastArray).push(-Infinity);
            return lineRest;
        }
        if (literal === 'nan' || literal === '+nan' || literal === '-nan') {
            asFloats(lastArray).push(NaN);
            return lineRest;
        }
    }
    if (literal.includes(':')) {
        if (literal.includes('-')) {
            if (OFFSET.test(literal)) {
                asOffsetDateTimes(lastArray).push(new OffsetDateTime(literal));
            }
            else {
                moreDatetime || throws(SyntaxError(where()));
                asLocalDateTimes(lastArray).push(new LocalDateTime(literal));
            }
        }
        else {
            moreDatetime || throws(SyntaxError(where()));
            asLocalTimes(lastArray).push(new LocalTime(literal));
        }
        return lineRest;
    }
    if (literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-')) {
        moreDatetime || throws(SyntaxError(where()));
        asLocalDates(lastArray).push(new LocalDate(literal));
        return lineRest;
    }
    if (literal === 'true') {
        asBooleans(lastArray).push(true);
    }
    else if (literal === 'false') {
        asBooleans(lastArray).push(false);
    }
    else if (literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x')) {
        asFloats(lastArray).push(Float(literal));
    }
    else if (enableNull && literal === 'null') {
        asNulls(lastArray).push(null);
    }
    else {
        asIntegers(lastArray).push(IntegerDepends(literal));
    }
    return lineRest;
}
function equalInlineTable(table, finalKey, lineRest) {
    const inlineTable = table[finalKey] = new TableDepends;
    sealedInline.add(inlineTable);
    lineRest = lineRest.replace(SYM_WHITESPACE, '');
    if (allowInlineTableMultiLineAndTrailingCommaEvenNoComma) {
        const start = mark();
        const length = stacks_length;
        return function callee(lineRest) {
            for (;;) {
                while (lineRest === '' || lineRest.startsWith('#')) {
                    lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
                }
                if (lineRest.startsWith('}')) {
                    return lineRest.replace(SYM_WHITESPACE, '');
                }
                lineRest = assign(inlineTable, lineRest);
                if (stacks_length > length) {
                    stacks_insertBeforeLast(function inserted(lineRest) {
                        //
                        while (lineRest === '' || lineRest.startsWith('#')) { //
                            lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, ''); //
                        } //
                        if (lineRest.startsWith(',')) {
                            lineRest = lineRest.replace(SYM_WHITESPACE, '');
                        } //
                        //
                        return callee(lineRest);
                    });
                    return lineRest;
                }
                while (lineRest === '' || lineRest.startsWith('#')) {
                    lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
                }
                if (lineRest.startsWith(',')) {
                    lineRest = lineRest.replace(SYM_WHITESPACE, '');
                }
            }
        }(lineRest);
    }
    else {
        if (lineRest.startsWith('}')) {
            return lineRest.replace(SYM_WHITESPACE, '');
        }
        (lineRest === '' || lineRest.startsWith('#')) && throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at ' + where()));
        const length = stacks_length;
        return function callee(lineRest) {
            for (;;) {
                lineRest = assign(inlineTable, lineRest);
                if (stacks_length > length) {
                    stacks_insertBeforeLast(function inserted(lineRest) {
                        //
                        if (lineRest.startsWith('}')) {
                            return lineRest.replace(SYM_WHITESPACE, '');
                        } //
                        if (lineRest.startsWith(',')) { //
                            lineRest = lineRest.replace(SYM_WHITESPACE, ''); //
                            lineRest.startsWith('}') && throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at ' + where())); //
                        } //
                        (lineRest === '' || lineRest.startsWith('#')) && throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at ' + where())); //
                        //
                        return callee(lineRest);
                    });
                    return lineRest;
                }
                if (lineRest.startsWith('}')) {
                    return lineRest.replace(SYM_WHITESPACE, '');
                }
                if (lineRest.startsWith(',')) {
                    lineRest = lineRest.replace(SYM_WHITESPACE, '');
                    lineRest.startsWith('}') && throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at ' + where()));
                }
                (lineRest === '' || lineRest.startsWith('#')) && throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at ' + where()));
            }
        }(lineRest);
    }
}
function equalInlineArray(table, finalKey, lineRest) {
    const inlineArray = table[finalKey] = [];
    sealedInline.add(inlineArray);
    const start = mark();
    lineRest = lineRest.replace(SYM_WHITESPACE, '');
    while (lineRest === '' || lineRest.startsWith('#')) {
        lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
    }
    if (lineRest.startsWith(']')) {
        return lineRest.replace(SYM_WHITESPACE, '');
    }
    const length = stacks_length;
    return function callee(lineRest) {
        for (;;) {
            lineRest = push(inlineArray, lineRest);
            if (stacks_length > length) {
                stacks_insertBeforeLast(function inserted(lineRest) {
                    //
                    while (lineRest === '' || lineRest.startsWith('#')) { //
                        lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, ''); //
                    } //
                    if (lineRest.startsWith(',')) { //
                        lineRest = lineRest.replace(SYM_WHITESPACE, ''); //
                        while (lineRest === '' || lineRest.startsWith('#')) { //
                            lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, ''); //
                        } //
                        if (lineRest.startsWith(']')) {
                            return lineRest.replace(SYM_WHITESPACE, '');
                        } //
                    } //
                    else { //
                        if (lineRest.startsWith(']')) {
                            return lineRest.replace(SYM_WHITESPACE, '');
                        } //
                        throws(SyntaxError(where())); //
                    } //
                    //
                    return callee(lineRest);
                });
                return lineRest;
            }
            while (lineRest === '' || lineRest.startsWith('#')) {
                lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
            }
            if (lineRest.startsWith(',')) {
                lineRest = lineRest.replace(SYM_WHITESPACE, '');
                while (lineRest === '' || lineRest.startsWith('#')) {
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
                throws(SyntaxError(where()));
            }
        }
    }(lineRest);
}

const BOM = '\uFEFF';
const NON_SCALAR = /[\uD800-\uDFFF]/u; // \u{10FFFF}- > \uFFFD
const REGEXP = /^/;
function parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt = true, xOptions = null) {
    could();
    if (isBuffer(sourceContent)) {
        const buffer = sourceContent;
        sourceContent = buffer.toString();
        if (!from(buffer).equals(buffer)) {
            throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.');
        }
        if (sourceContent.startsWith(BOM)) {
            sourceContent = sourceContent.slice(1);
        }
    }
    if (typeof sourceContent !== 'string') {
        throw TypeError('TOML.parse(sourceContent)');
    }
    try {
        if (NON_SCALAR.test(sourceContent)) {
            throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.');
        }
        try {
            use(specificationVersion, multiLineJoiner, useBigInt, xOptions);
            todo(sourceContent);
            try {
                const rootTable = Root();
                process();
                return rootTable;
            }
            finally {
                done();
            }
        }
        finally {
            clear();
        }
    }
    finally {
        REGEXP.test('');
    }
}

function install(readFile, specificationVersion, multiLineJoiner, useBigInt = true, xOptions = null) {
    if (typeof readFile !== 'function') {
        throw TypeError('TOML.install(readFile)');
    }
    parse('', specificationVersion, multiLineJoiner, useBigInt, xOptions);
    require.extensions['.toml'] = function require_toml(module, filename) {
        const sourceContent = readFile(filename);
        module.exports = sourceContent instanceof Promise
            ? sourceContent.then(onFulfilled)
            : parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt, xOptions);
    };
    function onFulfilled(sourceContent) {
        return parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt, xOptions);
    }
}

const TOML = {
    parse,
    install,
    version,
    get default() { return this; }
};

module.exports = TOML;

//# sourceMappingURL=index.js.map