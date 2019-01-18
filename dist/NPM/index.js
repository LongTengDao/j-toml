'use strict';

const version = '0.5.34';

const { WeakSet, WeakMap: WeakMap$1, SyntaxError, RangeError, TypeError, Error, BigInt, Date, parseInt, Infinity, NaN, Array, Map, RegExp,
	String: { fromCodePoint },
	Number: { isFinite, isSafeInteger },
	Object: { create, getOwnPropertyNames, defineProperty },
	Reflect: { getPrototypeOf },
	Symbol: { for: Symbol_for },
	JSON: { stringify },
} = global;

const { isArray } = Array;

/*!
 * 模块名称：@ltd/j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string.
 * 模块版本：1.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const { defineProperty: defineProperty$1, deleteProperty, ownKeys } = Reflect;

const ownKeysKeepers = new WeakMap;

const handlers = Object.create(null, {
	defineProperty: {
		value (target, key, descriptor) {
			if ( defineProperty$1(target, key, descriptor) ) {
				ownKeysKeepers.get(target).add(key);
				return true;
			}
			return false;
		}
	},
	deleteProperty: {
		value (target, key) {
			if ( deleteProperty(target, key) ) {
				ownKeysKeepers.get(target).delete(key);
				return true;
			}
			return false;
		}
	},
	ownKeys: {
		value (target) {
			return [...ownKeysKeepers.get(target)];
		}
	},
});

const orderify = object => {
	ownKeysKeepers.set(object, new Set(ownKeys(object)));
	return new Proxy(object, handlers);
};

/*¡ @ltd/j-orderify */

const NONE = [];
let sourceLines = NONE;
let lastLineIndex = -1;
let lineIndex = -1;

const none = () => sourceLines===NONE;
const done = () => { sourceLines = NONE; };
const next = () => sourceLines[++lineIndex];
const rest = () => lineIndex!==lastLineIndex;
const mark = () => lineIndex;
const must = (message, startIndex) => {
	if ( lineIndex===lastLineIndex ) {
		const error = new SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]);
		error.lineIndex = lineIndex;
		done();
		throw error;
	}
	return sourceLines[++lineIndex];
};
const from = array => {
	sourceLines = array;
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
};
const throwSyntaxError = message => throws(new SyntaxError(message));
const throwRangeError = message => throws(new RangeError(message));
const throwTypeError = message => throws(new TypeError(message));
const throwError = message => throws(new Error(message));
const where = () => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

function throws (error) {
	if ( sourceLines===NONE ) { throw error; }
	error.lineIndex = lineIndex;
	done();
	throw error;
}

/* types */

const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;

const UNDERSCORES = /_/g;

const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;

const OFFSET_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
const LOCAL_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const LOCAL_DATE = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])$/;
const LOCAL_TIME = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const TIMEZONE_OFFSET = /^([+-])([01]\d|2[0-3]):([0-5]\d)$/;

const BOM = /^\uFEFF/;
const EOL = /\r?\n/;

const PRE_WHITESPACE = /^[ \t]*/;
const TABLE_DEFINITION = /^\[(\[?)[ \t]*((?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*')(?:[ \t]*\.[ \t]*(?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*'))*)[ \t]*](]?)[ \t]*(?:#[^]*)?$/;
const KEY_VALUE_PAIR = /^((?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*')(?:[ \t]*\.[ \t]*(?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*'))*)[ \t]*=[ \t]*(!!([\w-]*)[ \t]+)?([^ \t#][^]*)$/;
const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const VALUE_REST = /^((?:\d\d\d\d-\d\d-\d\d \d)?[\w\-+.:]+)[ \t]*([^]*)$/;
const LITERAL_STRING = /^'([^'\x00-\x08\x0B-\x1F\x7F]*)'[ \t]*([^]*)/;
const MULTI_LINE_LITERAL_STRING_LONE = /^'''([^]*?)'''[ \t]*([^]*)/;
const MULTI_LINE_LITERAL_STRING_REST = /^([^]*?)'''[ \t]*([^]*)/;
const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const BASIC_STRING = /^"((?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*)"[ \t]*([^]*)/;
const MULTI_LINE_BASIC_STRING_LONE = /^"""((?:[^\\]+|\\[^])*?)"""[ \t]*([^]*)/;
const MULTI_LINE_BASIC_STRING_REST = /^((?:[^\\]+|\\[^])*?)"""[ \t]*([^]*)/;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER = /^(?:[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\ \n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*$/;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;
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

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };
const unEscapeSingleLine = ($0, $1, $2, $3, $4, $5) => $1 ? $1 : $2 ? ESCAPE_ALIAS[$2] : fromCodePoint(parseInt($3 || $4+$5, 16));
const String = literal => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
String.isString = value => typeof value==='string';

const Integer = (literal, useBigInt = true, allowLonger = false) => {
	if ( useBigInt===false ) {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0; }
		( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const number = +literal.replace(UNDERSCORES, '');
		allowLonger || isSafeInteger(number) || throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return number;
	}
	else {
		let bigInt;
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { bigInt = 0n; }
		else {
			( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
			bigInt = BigInt(literal.replace(UNDERSCORES, ''));
			allowLonger ||
			-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n ||// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
			throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+( none() ? '' : ' meet at '+where() ));
		}
		if ( useBigInt===true ) { return bigInt; }
		isSafeInteger(useBigInt) || throwRangeError('TOML.Integer(,useBigInt) argument muse be safe integer.');
		if ( useBigInt<0 ? useBigInt<=bigInt && bigInt<= ~useBigInt : -useBigInt<=bigInt && bigInt<=useBigInt ) { return +( bigInt+'' ); }
		return bigInt;
	}
};
Integer.isInteger = value => typeof value==='bigint';

const Float = literal => {
	if ( FLOAT.test(literal) && FLOAT_NOT_INTEGER.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		isFinite(number) || throwRangeError('Float can not be as big as Infinity, like '+literal+( none() ? '' : ' at '+where() ));
		return number;
	}
	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	if ( literal==='-inf' ) { return -Infinity; }
	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	throwSyntaxError('Invalid Float '+literal+( none() ? '' : ' at '+where() ));
};
Float.isFloat = value => typeof value==='number';

const Boolean = {
	isBoolean: value => value===true || value===false,
};

const DATE = new Date;
const year = (date, utc) => {
	const year = utc ? date.getUTCFullYear() : date.getFullYear();
	if ( 1000<=year && year<=9999 ) { return ''+year; }
	if ( 100<=year && year<=999 ) { return '0'+year; }
	throw new RangeError('Datetime which year was set out of range 100 to 9999 can not be serialized toTOML.');
};
const month = (datetime, utc) => ( ( utc ? datetime.getUTCMonth() : datetime.getMonth() )+1+'' ).padStart(2, '0');
const date = (datetime, utc) => ( ( utc ? datetime.getUTCDate() : datetime.getDate() )+'' ).padStart(2, '0');
const hours = (datetime, utc) => ( ( utc ? datetime.getUTCHours() : datetime.getHours() )+'' ).padStart(2, '0');
const minutes = (datetime, utc) => ( ( utc ? datetime.getUTCMinutes() : datetime.getMinutes() )+'' ).padStart(2, '0');
const seconds = datetime => ( datetime.getSeconds()+'' ).padStart(2, '0');
const milliseconds = datetime => {
	const milliseconds = datetime.getMilliseconds();
	return milliseconds===0 ? '' : '.'+( milliseconds+'' ).padStart(3, '0');
};

class Datetime extends Date {
	
	constructor (literal) {
		if ( literal.includes('-') ) {
			if ( literal.includes('T') || literal.includes(' ') ) {
				if ( literal.includes('Z') || literal.includes('+') || literal.split('-').length===4 ) {
					const $ = OFFSET_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Offset Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Offset Date-Time';
					this.T = $[1];
					this.Z = $[2];
				}
				else {
					const $ = LOCAL_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Local Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Local Date-Time';
					this.T = $[1];
				}
			}
			else {
				LOCAL_DATE.test(literal) || throwSyntaxError('Invalid Local Date '+literal+( none() ? '' : ' at '+where() ));
				super(literal);
				this.type = 'Local Date';
			}
		}
		else {
			LOCAL_TIME.test(literal) || throwSyntaxError('Invalid Local Time '+literal+( none() ? '' : ' at '+where() ));
			super('1970-01-01 '+literal);
			this.type = 'Local Time';
		}
	}
	
	static isDatetime (value) { return value instanceof Datetime; }
	
	toTOML () {
		if ( !isSafeInteger(this.getTime()) ) { throw new RangeError('Datetime which time was set unsafe integer can not be serialized toTOML.'); }
		switch ( this.type ) {
			case 'Offset Date-Time':
				let datetime;
				const { Z } = this;
				if ( Z==='Z' || Z==='+00:00' || Z==='-00:00' ) { datetime = this; }
				else {
					const $ = TIMEZONE_OFFSET.exec(Z);
					datetime = DATE;
					datetime.setTime(this.getTime()+( $[1]+'60000' )*( +$[3]+60*$[2] ));
				}
				return year(datetime, true)+'-'+month(datetime, true)+'-'+date(datetime, true)+this.T+hours(datetime, true)+':'+minutes(datetime, true)+':'+seconds(datetime)+milliseconds(this)+Z;
			case 'Local Date-Time':
				return year(this)+'-'+month(this)+'-'+date(this)+this.T+hours(this)+':'+minutes(this)+':'+seconds(this)+milliseconds(this);
			case 'Local Date':
				return year(this)+'-'+month(this)+'-'+date(this);
			case 'Local Time':
				return hours(this)+':'+minutes(this)+':'+seconds(this)+milliseconds(this);
		}
		throw new TypeError('Unknown type Datetime.');
	}
	
}

const Table = function (keepOrder) {
	let undefined;
	if ( new.target===undefined ) { throw new TypeError("Class constructor Table cannot be invoked without 'new'"); }
	if ( keepOrder ) { return orderify(this); }
};
Table.prototype = create(null);
Table.isTable = value => value instanceof Table;

const { isTable } = Table;
const StaticObjects = new WeakSet;
const TypedArrays = new WeakMap$1;
const ArrayOfNulls = -1;
const ArrayOfStrings = 1;
const ArrayOfInlineTables = 2;
const ArrayOfInlineArrays = 3;
const ArrayOfBooleans = 4;
const ArrayOfFloats = 5;
const ArrayOfDatetimes = 6;
const ArrayOfIntegers = 7;
const reallyTypify = (array, type) => {
	if ( TypedArrays.has(array) ) {
		if ( TypedArrays.get(array)===type ) { return array; }
		throwTypeError('Types in array must be same. Check '+where());
	}
	TypedArrays.set(array, type);
	return array;
};
const unlimitedType = array => array;

let useWhatToJoinMultiLineString = '';
let useBigInt = true;
let keepOrder = false;
let allowLonger = false;
let keepComment = false;
let enableNull = false;
let enableNil = false;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma = false;
let enableInterpolationString = false;
let typify = reallyTypify;
let customConstructors = null;
const FUNCTION = new WeakSet;

function parse (toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions) {
	if ( typeof toml_source!=='string' ) { throw new TypeError('TOML.parse(source)'); }
	if ( toml_version!==0.5 ) { throw new Error('TOML.parse(,version)'); }
	if ( typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( typeof useBigInt_forInteger!=='boolean' ) {
		if ( typeof useBigInt_forInteger!=='number' ) { throw new TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt_forInteger) ) { throw new RangeError('TOML.parse(...useBigInt)'); }
	}
	useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
	useBigInt = useBigInt_forInteger;
	if ( extensionOptions ) {
		keepOrder = !!extensionOptions.order;
		allowLonger = !!extensionOptions.longer;
		keepComment = !!extensionOptions.hash;
		enableNull = !!extensionOptions.null;
		enableNil = !!extensionOptions.nil;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
		enableInterpolationString = !!extensionOptions.ins;
		typify = extensionOptions.mix ? unlimitedType : reallyTypify;
		customConstructors = extensionOptions.new || null;
		customConstructors===null || prepareConstructors();
	}
	else {
		keepOrder = allowLonger = keepComment = enableNull = enableNil = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
		typify = reallyTypify;
		customConstructors = null;
	}
	const rootTable = new Table(keepOrder);
	try {
		from(toml_source.replace(BOM, '').split(EOL));
		let lastSectionTable = rootTable;
		while ( rest() ) {
			const line = next().replace(PRE_WHITESPACE, '');
			if ( line==='' || line.startsWith('#') ) ;
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash = '' } = TABLE_DEFINITION.exec(line) || throwSyntaxError(where());
				( $_asArrayItem$$==='[' )===( $$asArrayItem$_===']' ) || throwSyntaxError('Square brackets of table define statement not match at '+where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$==='[', hash);
			}
			else {
				const rest$$1 = assignInline(lastSectionTable, line);
				rest$$1==='' || rest$$1.startsWith('#') || throwSyntaxError(where());
			}
		}
	}
	finally {
		customConstructors = null;
		done();
	}
	return rootTable;
}
function appendTable (table, key_key, asArrayItem, hash) {
	const leadingKeys = parseKeys(key_key);
	const finalKey = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	const lastTable = new Table(keepOrder);
	if ( asArrayItem ) {
		let arrayOfTables;
		if ( finalKey in table ) { StaticObjects.has(arrayOfTables = table[finalKey]) && throwError('Trying to push Table to non-ArrayOfTables value at '+where()); }
		else { arrayOfTables = table[finalKey] = []; }
		arrayOfTables.push(lastTable);
	}
	else {
		finalKey in table && throwError('Duplicate Table definition at '+where());
		table[finalKey] = lastTable;
	}
	if ( keepComment && hash ) {
		defineProperty(table, Symbol_for(finalKey), {
			configurable: true,
			enumerable: false,
			writable: true,
			value: hash,
		});
	}
	return lastTable;
}

function parseKeys (key_key) {
	const keys = key_key.match(KEYS);
	for ( let index = keys.length; index--; ) {
		const key = keys[index];
		if ( key.startsWith("'") ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) {
			keys[index] = String(key.slice(1, -1));
		}
	}
	return keys;
}

function prepareTable (table, keys) {
	const { length } = keys;
	let index = 0;
	while ( index<length ) {
		const key = keys[index++];
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				StaticObjects.has(table) && throwError('Trying to define table through static Inline Object at '+where());
			}
			else if ( isArray(table) ) {
				StaticObjects.has(table) && throwError('Trying to append value to static Inline Array at '+where());
				table = table[table.length-1];
			}
			else { throwError('Trying to define table through non-Table value at '+where()); }
		}
		else {
			table = table[key] = new Table(keepOrder);
			while ( index<length ) { table = table[keys[index++]] = new Table(keepOrder); }
			return table;
		}
	}
	return table;
}

function prepareInlineTable (table, keys) {
	const { length } = keys;
	let index = 0;
	while ( index<length ) {
		const key = keys[index++];
		if ( key in table ) {
			table = table[key];
			isTable(table) || throwError('Trying to assign property through non-Table value at '+where());
			StaticObjects.has(table) && throwError('Trying to assign property through static Inline Object at '+where());
		}
		else {
			table = table[key] = new Table(keepOrder);
			while ( index<length ) { table = table[keys[index++]] = new Table(keepOrder); }
			return table;
		}
	}
	return table;
}

function assignInline (lastInlineTable, lineRest) {
	const { 1: left, 2: custom, 3: type, 4: right } = KEY_VALUE_PAIR.exec(lineRest) || throwSyntaxError(where());
	custom && ensureConstructor(type);
	const leadingKeys = parseKeys(left);
	const finalKey = leadingKeys.pop();
	const table = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && throwError('Duplicate property definition at '+where());
	switch ( right[0] ) {
		case "'":
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
			( { 1: literal, 2: lineRest } = VALUE_REST.exec(right) || throwSyntaxError(where()) );
			table[finalKey] =
				literal==='true' ? true : literal==='false' ? false :
					literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
						literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
							literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ? new Datetime(literal) :
								literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && ( literal[0]!=='0' || literal[1]!=='x' && literal[1]!=='o' && literal[1]!=='b' ) ? Float(literal) :
									enableNull && literal==='null' || enableNil && literal==='nil' ? null :
										Integer(literal, useBigInt, allowLonger);
			break;
	}
	if ( custom ) { table[finalKey] = construct(type, table[finalKey]); }
	if ( keepComment && lineRest.startsWith('#') ) {
		defineProperty(table, Symbol_for(finalKey), {
			configurable: true,
			enumerable: false,
			writable: true,
			value: lineRest,
		});
		return '';
	}
	return lineRest;
}

function assignLiteralString (table, finalKey, literal) {
	let $;
	if ( literal.charAt(1)!=="'" || literal.charAt(2)!=="'" ) {
		$ = LITERAL_STRING.exec(literal) || throwSyntaxError(where());
		table[finalKey] = $[1];
		return $[2];
	}
	$ = MULTI_LINE_LITERAL_STRING_LONE.exec(literal);
	if ( $ ) {
		CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
		table[finalKey] = $[1];
		return $[2];
	}
	literal = literal.slice(3);
	if ( literal ) {
		CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
		literal += useWhatToJoinMultiLineString;
	}
	const start = mark();
	for ( ; ; ) {
		const line = must('Literal String', start);
		$ = MULTI_LINE_LITERAL_STRING_REST.exec(line);
		if ( $ ) {
			CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
			table[finalKey] = literal+$[1];
			return $[2];
		}
		literal += line+useWhatToJoinMultiLineString;
	}
}

function assignBasicString (table, finalKey, literal) {
	let $;
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		$ = BASIC_STRING.exec(literal) || throwSyntaxError(where());
		table[finalKey] = String($[1]);
		return $[2];
	}
	$ = MULTI_LINE_BASIC_STRING_LONE.exec(literal);
	if ( $ ) {
		ESCAPED_EXCLUDE_CONTROL_CHARACTER.test($[1]) || throwSyntaxError(where());
		table[finalKey] = String($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	if ( literal ) {
		literal += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER.test(literal) || throwSyntaxError(where());
	}
	const start = mark();
	for ( ; ; ) {
		let line = must('Basic String', start);
		$ = MULTI_LINE_BASIC_STRING_REST.exec(line);
		if ( $ ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER.test($[1]) || throwSyntaxError(where());
			table[finalKey] = ( literal+$[1] ).replace(ESCAPED_IN_MULTI_LINE, ($0, $1, $2, $3, $4, $5, $6) => {
				if ( $0==='\n' ) { return useWhatToJoinMultiLineString; }
				if ( $1 ) {
					$1.includes('\n') || throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see '+where());
					return '';
				}
				return unEscapeSingleLine('', $2, $3, $4, $5, $6);
			});
			return $[2];
		}
		line += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER.test(line) || throwSyntaxError(where());
		literal += line;
	}
}

function assignInlineTable (table, finalKey, lineRest) {
	const inlineTable = table[finalKey] = new Table(keepOrder);
	StaticObjects.add(inlineTable);
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	if ( allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start = mark();
		for ( ; ; ) {
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			lineRest = assignInline(inlineTable, lineRest);
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
		}
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+where());
		for ( ; ; ) {
			lineRest = assignInline(inlineTable, lineRest);
			if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(SYM_WHITESPACE, '');
				lineRest.startsWith('}') && throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+where());
			}
			( lineRest==='' || lineRest.startsWith('#') ) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+where());
		}
	}
}

function assignInlineArray (table, finalKey, lineRest) {
	const inlineArray = table[finalKey] = [];
	StaticObjects.add(inlineArray);
	const start = mark();
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	while ( lineRest==='' || lineRest.startsWith('#') ) {
		lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
	for ( ; ; ) {
		lineRest = pushInline(inlineArray, lineRest);
		while ( lineRest==='' || lineRest.startsWith('#') ) {
			lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith(',') ) {
			lineRest = lineRest.replace(SYM_WHITESPACE, '');
			if ( keepComment && lineRest.startsWith('#') ) {
				defineProperty(inlineArray, Symbol_for(inlineArray.length-1+''), {
					configurable: true,
					enumerable: false,
					writable: true,
					value: lineRest,
				});
				lineRest = '';
			}
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
		}
		else {
			if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			throwSyntaxError(where());
		}
	}
}

function pushInline (array, lineRest) {
	const custom = lineRest.startsWith('!!');
	let type;
	if ( custom ) {
		typify===unlimitedType || throwSyntaxError('Only mixable arrays could contain custom type. Check '+where());
		( { 1: type, 2: lineRest } = _VALUE_PAIR.exec(lineRest) || throwSyntaxError(where()) );
		ensureConstructor(type);
	}
	const lastIndex = ''+array.length;
	switch ( lineRest[0] ) {
		case "'":
			lineRest = assignLiteralString(typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		case '"':
			lineRest = assignBasicString(typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		case '{':
			lineRest = assignInlineTable(typify(array, ArrayOfInlineTables), lastIndex, lineRest);
			break;
		case '[':
			lineRest = assignInlineArray(typify(array, ArrayOfInlineArrays), lastIndex, lineRest);
			break;
		case '`':
			lineRest = assignInterpolationString(typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		default:
			let literal;
			( { 1: literal, 2: lineRest } = VALUE_REST.exec(lineRest) || throwSyntaxError(where()) );
			if ( literal==='true' ) { typify(array, ArrayOfBooleans).push(true); }
			else if ( literal==='false' ) { typify(array, ArrayOfBooleans).push(false); }
			else if ( literal==='inf' || literal==='+inf' ) { typify(array, ArrayOfFloats).push(Infinity); }
			else if ( literal==='-inf' ) { typify(array, ArrayOfFloats).push(-Infinity); }
			else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
				typify(array, ArrayOfFloats).push(NaN);
			}
			else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
				typify(array, ArrayOfDatetimes).push(new Datetime(literal));
			}
			else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && ( literal[0]!=='0' || literal[1]!=='x' && literal[1]!=='o' && literal[1]!=='b' ) ) {
				typify(array, ArrayOfFloats).push(Float(literal));
			}
			else if ( enableNull && literal==='null' || enableNil && literal==='nil' ) {
				typify(array, ArrayOfNulls).push(null);
			}
			else { typify(array, ArrayOfIntegers).push(Integer(literal, useBigInt, allowLonger)); }
			break;
	}
	if ( custom ) { array[lastIndex] = construct(type, array[lastIndex]); }
	if ( keepComment && lineRest.startsWith('#') ) {
		defineProperty(array, Symbol_for(lastIndex), {
			configurable: true,
			enumerable: false,
			writable: true,
			value: lineRest,
		});
		return '';
	}
	return lineRest;
}

function assignInterpolationString (table, finalKey, lineRest) {
	enableInterpolationString || throwSyntaxError(where());
	DELIMITER_CHECK.test(lineRest) && throwSyntaxError('Interpolation String opening tag incorrect at '+where());
	const literals = [];
	for ( const start = mark(); ; ) {
		const literal = must('Interpolation String', start);
		if ( literal.startsWith(lineRest) ) {
			lineRest = lineRest.slice(lineRest.length).replace(PRE_WHITESPACE, '');
			break;
		}
		literals.push(literal);
	}
	let string = literals.join('\n');
	if ( lineRest.startsWith('(') ) {
		const interpolations_rest = INTERPOLATIONS.exec(lineRest) || throwSyntaxError(where());
		lineRest = interpolations_rest[2];
		for ( const interpolation of interpolations_rest[1].match(INTERPOLATION) ) {
			if ( REGEXP_MODE.test(interpolation) ) {
				const { 1: pattern, 2: flags, 3: Replacer } = PATTERN_FLAGS_REPLACER.exec(interpolation);
				const search = newRegExp(pattern, flags) || throwSyntaxError('Invalid regExp at '+where());
				let replacer;
				switch ( Replacer[0] ) {
					case "'":
						replacer = Replacer.slice(1, -1);
						break;
					case '"':
						replacer = String(Replacer.slice(1, -1));
						break;
					case '{':
						const map = newMap(Replacer, true);
						replacer = $0 => map.has($0) ? map.get($0) : $0;
						break;
					case '[':
						const { 1: whole, 2: subs } = WHOLE_AND_SUBS.exec(Replacer);
						const maps = [null];
						for ( const sub of subs.match(SUB) ) { maps.push(newMap(sub, true)); }
						replacer = (...args) => whole.replace(DOLLAR, $n => {
							if ( $n==='$$' ) { return '$'; }
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
				outer: for ( let length = string.length, index = 0; index<length; ) {
					for ( const { 0: search, 1: replacer } of map ) {
						if ( string.startsWith(search, index) ) {
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

function newMap (interpolation, usedForRegExp) {
	const map = new Map;
	const tokens = interpolation.match(INTERPOLATION_TOKEN);
	for ( let length = tokens.length, index = 0; index<length; ) {
		let search = tokens[index++];
		search = search[0]==="'" ? search.slice(1, -1) : String(search.slice(1, -1));
		usedForRegExp || search || throwSyntaxError('Characters to replace can not be empty, which was found at '+where());
		map.has(search) && throwSyntaxError('Duplicate '+( usedForRegExp ? 'replacer' : 'characters to replace' )+' at '+where());
		let replacer = tokens[index++];
		replacer = replacer[0]==="'" ? replacer.slice(1, -1) : String(replacer.slice(1, -1));
		map.set(search, replacer);
	}
	return map;
}

function newRegExp (pattern, flags) {
	try { return new RegExp(pattern, flags); }
	catch (error) { return null; }
}

function prepareConstructors () {
	if ( typeof customConstructors==='function' ) {
		if ( customConstructors.length!==2 ) { throw new Error('TOML.parse(,,,xOptions.new.length)'); }
		FUNCTION.add(customConstructors);
	}
	else if ( typeof customConstructors==='object' ) {
		if ( getPrototypeOf(customConstructors)===null ) {
			for ( const type of getOwnPropertyNames(customConstructors) ) {
				if ( typeof customConstructors[type]!=='function' ) {
					customConstructors = null;
					throw new TypeError('TOML.parse(,,,xOptions.new['+stringify(type)+'])');
				}
				if ( customConstructors[type].length ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,xOptions.new['+stringify(type)+'].length)');
				}
			}
		}
		else {
			const origin = customConstructors;
			customConstructors = create(null);
			for ( const type of getOwnPropertyNames(origin) ) {
				const customConstructor = origin[type];
				if ( typeof customConstructor!=='function' ) {
					customConstructors = null;
					throw new TypeError('TOML.parse(,,,xOptions.new['+stringify(type)+'])');
				}
				if ( customConstructors[type].length ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,xOptions.new['+stringify(type)+'].length)');
				}
				customConstructors[type] = customConstructor;
			}
		}
	}
	else { throw new TypeError('TOML.parse(,,,xOptions.new)'); }
}

function ensureConstructor (type) {
	customConstructors || throwSyntaxError(where());
	FUNCTION.has(customConstructors) || type in customConstructors || throwError(where());
}

function construct (type, value) {
	return FUNCTION.has(customConstructors) ? customConstructors(type, value) : customConstructors[type](value);
}

const TOML = {
	parse,
	String,
	Integer,
	Float,
	Boolean,
	Datetime,
	Array,
	Table,
	version
};

module.exports = TOML;

//# sourceMappingURL=index.js.map