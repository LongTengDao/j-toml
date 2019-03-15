'use strict';

const version = '0.5.66';

const isBuffer = Buffer.isBuffer;

const from = Buffer.from;

/* types */
const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{8}))/g;
const UNDERSCORES = /_/g;
const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;
const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
/* parse */
const NON_SCALAR = /[\uD800-\uDFFF]/u; // \u{10FFFF}- > \uFFFD
const BOM = /^\uFEFF/;
const EOL = /\r?\n/;

/*!
 * 模块名称：@ltd/j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：1.0.0
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
        source += (typeof substitution === 'string' ? substitution : substitution.source) + raw[++index];
    }
    return source.replace(NT, '');
}
function newRegExp(template) {
    return RegExp(Source(template.raw, slice.call(arguments, 1)));
}

/*¡ @ltd/j-regexp */

/* types */
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
const T = /[T ]/;
const HMS = newRegExp `
	${_23_}:${_59_}:${_59_}(?:\.\d+)?`;
const Z = newRegExp `
		Z
	|
		[+-]${_23_}:${_59_}`;
const DATETIME = newRegExp `
	^
	(?:
		${HMS}
	|
		(${YMD})
		(?:
			(${T})
			(${HMS})
			(${Z})?
		)?
	)
	$`;
/* parse */
const Whitespace = /[ \t]/;
const PRE_WHITESPACE = newRegExp `
	^${Whitespace}+`;
const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
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
	'([^'\x00-\x08\x0B-\x1F\x7F]*)'
	${Whitespace}*
	([^]*)`;
const MULTI_LINE_LITERAL_STRING = newRegExp `
	^
	([^]*?)
	'''
	${Whitespace}*
	([^]*)`;
const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u([^]{4})|U([^]{8}))/g;
const SYM_WHITESPACE = newRegExp `
	^
	[^]
	${Whitespace}*`;
const KEY_VALUE_PAIR = newRegExp `
	^
	[ \t]*
	=
	[ \t]*
	(
		\(([\w-:., ]+)\)
		[ \t]+
	)?
	(
		[^ \t#]
		[^]*
	)
	$`;
const _VALUE_PAIR = newRegExp `
	^
	\(([\w-:., ]+)\)
	${Whitespace}+
	([^ \t#][^]*)
	$`;

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
                || throws(SyntaxError(where()));
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
        || throws(SyntaxError(where()));
    const _3 = _.charAt(1) === ']';
    _ = _.slice(_3 ? 2 : 1).replace(PRE_WHITESPACE, '');
    _ === ''
        || _.startsWith('#')
        || throws(SyntaxError(where()));
    return { 1: _1, 2: _2, 3: _3 };
}
function KEY_VALUE_PAIR_exec(_) {
    const _1 = getKeys(_);
    const $ = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || throws(SyntaxError(where()));
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
                        || throws(SyntaxError(where()));
                    _ = _.slice(1);
                    keys += key + '"';
                    break;
                }
                _ = _.slice($[0].length);
                key += $[0];
            }
        }
        else {
            const key = ((_.startsWith('\'') ? LITERAL_KEY : BARE_KEY).exec(_) || throws(SyntaxError(where())))[0];
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
function todo(source) {
    sourceLines = source.replace(BOM, '').split(EOL);
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
        && throws(new SyntaxError(message + ' is not close until the end of the file, which started from line ' + (startIndex + 1) + ': ' + sourceLines[startIndex]));
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
        //options.clear();
    }
    throw error;
}

const create = Object.create;

const getOwnPropertyNames = Object.getOwnPropertyNames;

const getPrototypeOf = Reflect.getPrototypeOf;

const stringify = JSON.stringify;

const isSafeInteger = Number.isSafeInteger;

/*!
 * 模块名称：@ltd/j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string.
 * 模块版本：2.5.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const defineProperty = Reflect.defineProperty;

const deleteProperty = Reflect.deleteProperty;

const ownKeys = Reflect.ownKeys;

const ownKeysKeepers = new WeakMap;
const handlers = create(null, {
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

function Table() { }
const OrderedTable = function Table() { return orderify(this); };
OrderedTable.prototype = Table.prototype = create(null);
const isTable = (value) => value instanceof Table;

const NumberInteger = (literal) => {
    if (literal === '0' || literal === '+0' || literal === '-0') {
        return 0;
    }
    (literal.charAt(0) === '0' ? XOB_INTEGER : INTEGER).test(literal)
        || throws(SyntaxError('Invalid Integer ' + literal + ' at ' + where()));
    const number = +literal.replace(UNDERSCORES, '');
    allowLonger
        || isSafeInteger(number)
        || throws(RangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes ' + literal + ' meet at ' + where()));
    return number;
};
const BigIntInteger = (literal) => {
    if (literal === '0' || literal === '+0' || literal === '-0') {
        return 0n;
    }
    (literal.charAt(0) === '0' ? XOB_INTEGER : INTEGER).test(literal) || throws(SyntaxError('Invalid Integer ' + literal + ' at ' + where()));
    const bigInt = BigInt(literal.replace(UNDERSCORES, ''));
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
let IntegerDepends, IntegerMin, IntegerMax;
/* xOptions */
let TableDepends;
let open;
let allowLonger;
let enableNull;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma;
let enableInterpolationString;
let asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asDatetimes, asIntegers;
let customConstructors;
/* xOptions.mix */
const unType = (array) => array;
const { asInlineArrayOfNulls, asInlineArrayOfStrings, asInlineArrayOfTables, asInlineArrayOfArrays, asInlineArrayOfBooleans, asInlineArrayOfFloats, asInlineArrayOfDatetimes, asInlineArrayOfIntegers, } = new Proxy(new WeakMap, {
    get: (arrayTypes) => function typify(array) {
        if (arrayTypes.has(array)) {
            arrayTypes.get(array) === typify
                || throws(TypeError('Types in array must be same. Check ' + where()));
        }
        else {
            arrayTypes.set(array, typify);
        }
        return array;
    }
});
let WC = [];
function wc_on(each) { WC.push(each); }
function wc_off(each) { throw throws(SyntaxError(where())); }
let wc = wc_off;
function Wc() {
    let index = WC.length;
    if (index) {
        done();
        const c = customConstructors;
        const s = WC;
        customConstructors = null;
        WC = [];
        if (typeof c === 'function') {
            while (index--) {
                const { parent, key, type } = s.pop();
                parent[key] = c(type, parent[key]);
            }
        }
        else {
            while (index--) {
                const { parent, key, type } = s.pop();
                parent[key] = c[type](parent[key]);
            }
        }
    }
}
/* use & clear */
function clear() {
    customConstructors = null;
    WC.length = 0;
}
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
        open = allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
        customConstructors = null;
        typify = true;
    }
    else {
        TableDepends = extensionOptions.order ? OrderedTable : Table;
        open = !!extensionOptions.open;
        allowLonger = !!extensionOptions.longer;
        enableNull = !!extensionOptions.null;
        allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
        enableInterpolationString = !!extensionOptions.ins;
        typify = !extensionOptions.mix;
        customConstructors = extensionOptions.new || null;
        if (customConstructors === null) {
            wc = wc_off;
        }
        else {
            if (typeof customConstructors === 'function') {
                if (typify) {
                    throw new Error('TOML.parse(,,,,{ mix:false, new(){} })');
                }
                if (customConstructors.length !== 2) {
                    throw new Error('TOML.parse(,,,,xOptions.new.length)');
                }
            }
            else if (typeof customConstructors === 'object') {
                if (typify) {
                    throw new Error('TOML.parse(,,,,{ mix:false, new:{} })');
                }
                if (getPrototypeOf(customConstructors) === null) {
                    for (const type of getOwnPropertyNames(customConstructors)) {
                        if (typeof customConstructors[type] !== 'function') {
                            throw new TypeError('TOML.parse(,,,,xOptions.new[' + stringify(type) + '])');
                        }
                        if (customConstructors[type].length) {
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
                            throw new TypeError('TOML.parse(,,,,xOptions.new[' + stringify(type) + '])');
                        }
                        if (customConstructors[type].length) {
                            throw new Error('TOML.parse(,,,,xOptions.new[' + stringify(type) + '].length)');
                        }
                        customConstructors[type] = customConstructor;
                    }
                }
            }
            else {
                throw new TypeError('TOML.parse(,,,,xOptions.new)');
            }
            wc = wc_on;
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

const literal_cache = Symbol('literal_cache');
const value_cache = Symbol('value_cache');
class Datetime extends Date {
    constructor(literal) {
        // @ts-ignore
        const { 0: hms_ms = '', 1: YMD = '', 2: T = '', 3: HMS_MS = hms_ms, 4: Z = '' } = DATETIME.exec(literal) || throws(SyntaxError('Invalid Datetime ' + literal + ' at ' + where()));
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
        //isFinite(number) || iterator.throws(RangeError('Float can not be as big as Infinity, like '+literal+' at '+where()));
        //return number;
    }
    //if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
    //if ( literal==='-inf' ) { return -Infinity; }
    //if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
    throws(SyntaxError('Invalid Float ' + literal + ' at ' + where()));
};

const isArray = Array.isArray;

const fromCodePoint = String.fromCodePoint;

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
        && throws(RangeError('Invalid Unicode Scalar ' + (p3 ? '\\u' + p3 : '\\U' + p4) + ' at ' + where()));
    return fromCodePoint(codePoint);
};
const unEscapeMultiLine = (match, p1, p2, p3, p4, p5) => {
    if (match === '\n') {
        return useWhatToJoinMultiLineString;
    }
    if (p1) {
        p1.includes('\n')
            || throws(SyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see ' + where()));
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
        && throws(RangeError('Invalid Unicode Scalar ' + (p4 ? '\\u' + p4 : '\\U' + p5) + ' at ' + where()));
    return fromCodePoint(codePoint);
};
const BasicString = (literal) => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
const MultiLineBasicString = (literal) => literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);

const sealedInline = new WeakSet;
const openTables = new WeakSet;
function appendTable(table, key_key, asArrayItem) {
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
        arrayOfTables.push(lastTable = new TableDepends);
    }
    else {
        if (finalKey in table) {
            open && openTables.has(lastTable = table[finalKey]) || throws(Error('Duplicate Table definition at ' + where()));
            openTables.delete(lastTable);
        }
        else {
            table[finalKey] = lastTable = new TableDepends;
        }
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
        table[finalKey] = $[1];
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
function checkLiteralString(literal) {
    CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && throws(SyntaxError('Control characters other than tab are not permitted in a Multi-Line Literal String, which was found at ' + where()));
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
        table[finalKey] = BasicString($);
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
            const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_ } = TABLE_DEFINITION_exec(line);
            $_asArrayItem$$ === $$asArrayItem$_ || throws(SyntaxError('Square brackets of table define statement not match at ' + where()));
            lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$);
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
function assign(lastInlineTable_array, lineRest) {
    let left;
    let _type_;
    let type;
    ({ 1: left, 2: _type_, 3: type, 4: lineRest } = KEY_VALUE_PAIR_exec(lineRest));
    const leadingKeys = parseKeys(left);
    const finalKey = leadingKeys.pop();
    const table = prepareInlineTable(lastInlineTable_array, leadingKeys);
    finalKey in table && throws(Error('Duplicate property definition at ' + where()));
    _type_ && wc({ parent: table, key: finalKey, type });
    switch (lineRest[0]) {
        case '\'':
            return assignLiteralString(table, finalKey, lineRest);
        case '"':
            return assignBasicString(table, finalKey, lineRest);
        case '`':
            return assignInterpolationString(table, finalKey, lineRest);
        case '{':
            stacks_push(lineRest => equalInlineTable(table, finalKey, lineRest));
            return lineRest;
        case '[':
            stacks_push(lineRest => equalInlineArray(table, finalKey, lineRest));
            return lineRest;
    }
    let literal;
    ({ 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where())));
    table[finalKey] =
        literal === 'true' ? true : literal === 'false' ? false :
            literal === 'inf' || literal === '+inf' ? Infinity : literal === '-inf' ? -Infinity :
                literal === 'nan' || literal === '+nan' || literal === '-nan' ? NaN :
                    literal.includes(':') || literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
                        literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x') ? Float(literal) :
                            enableNull && literal === 'null' ? null :
                                IntegerDepends(literal);
    return lineRest;
}
function push(lastInlineTable_array, lineRest) {
    if (lineRest.startsWith('(')) {
        let type;
        ({ 1: type, 2: lineRest } = _VALUE_PAIR.exec(lineRest) || throws(SyntaxError(where())));
        wc({ parent: lastInlineTable_array, key: lastInlineTable_array.length, type });
    }
    const lastIndex = '' + lastInlineTable_array.length;
    switch (lineRest[0]) {
        case '\'':
            return assignLiteralString(asStrings(lastInlineTable_array), lastIndex, lineRest);
        case '"':
            return assignBasicString(asStrings(lastInlineTable_array), lastIndex, lineRest);
        case '`':
            return assignInterpolationString(asStrings(lastInlineTable_array), lastIndex, lineRest);
        case '{':
            stacks_push(lineRest => equalInlineTable(asTables(lastInlineTable_array), lastIndex, lineRest));
            return lineRest;
        case '[':
            stacks_push(lineRest => equalInlineArray(asArrays(lastInlineTable_array), lastIndex, lineRest));
            return lineRest;
    }
    let literal;
    ({ 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where())));
    if (literal === 'true') {
        asBooleans(lastInlineTable_array).push(true);
    }
    else if (literal === 'false') {
        asBooleans(lastInlineTable_array).push(false);
    }
    else if (literal === 'inf' || literal === '+inf') {
        asFloats(lastInlineTable_array).push(Infinity);
    }
    else if (literal === '-inf') {
        asFloats(lastInlineTable_array).push(-Infinity);
    }
    else if (literal === 'nan' || literal === '+nan' || literal === '-nan') {
        asFloats(lastInlineTable_array).push(NaN);
    }
    else if (literal.includes(':') || literal.indexOf('-') !== literal.lastIndexOf('-') && !literal.startsWith('-')) {
        asDatetimes(lastInlineTable_array).push(new Datetime(literal));
    }
    else if (literal.includes('.') || (literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x')) {
        asFloats(lastInlineTable_array).push(Float(literal));
    }
    else if (enableNull && literal === 'null') {
        asNulls(lastInlineTable_array).push(null);
    }
    else {
        asIntegers(lastInlineTable_array).push(IntegerDepends(literal));
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

function parse(sourceContent, specificationVersion, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions = null) {
    could();
    if (typeof sourceContent !== 'string') {
        if (!isBuffer(sourceContent)) {
            throw new TypeError('TOML.parse(sourceContent)');
        }
        const buffer = sourceContent;
        sourceContent = buffer.toString();
        if (!from(buffer).equals(buffer)) {
            throw Error('A TOML doc must be a (ful-scalar) valid utf8 file.');
        }
    }
    if (NON_SCALAR.test(sourceContent)) {
        throw Error('A TOML doc must be a (ful-scalar) valid utf8 file.');
    }
    if (specificationVersion !== 0.5) {
        throw new Error('TOML.parse(,specificationVersion)');
    }
    try {
        use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
        todo(sourceContent);
        try {
            const rootTable = Root();
            Wc();
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

const TOML = {
    parse,
    version,
    get default() { return this; }
};

module.exports = TOML;

//# sourceMappingURL=index.js.map