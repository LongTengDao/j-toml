'use strict';

const { WeakSet, WeakMap, SyntaxError, RangeError, TypeError, Error, BigInt, Date, parseInt, Infinity, NaN, String: { fromCodePoint }, Number: { isFinite, isSafeInteger }, Object: { create, prototype: { toString } }, Array } = global;

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
		const error = new SyntaxError(message+' is not close until the end of the file, which started from lines['+startIndex+']: '+sourceLines[startIndex]);
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
const where = () => 'lines['+lineIndex+']: '+sourceLines[lineIndex];

function throws (error) {
	if ( sourceLines===NONE ) { throw error; }
	error.lineIndex = lineIndex;
	done();
	throw error;
}

const String = {
	isString: value => typeof value==='string',
};

const UNDERSCORES = /_/g;

const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;
const MAX64 = BigInt(2**63-1);
const MIN64 = ~MAX64;
const ZERO = BigInt(0);
const Integer = (literal, useBigInt = true) => {
	if ( useBigInt ) {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return ZERO; }
		( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const bitInt = BigInt(literal.replace(UNDERSCORES, ''));
		bitInt<=MAX64 && bitInt>=MIN64 || throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return bitInt;
	}
	else {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0; }
		( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const number = +literal.replace(UNDERSCORES, '');
		isSafeInteger(number) || throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return number;
	}
};
Integer.isInteger = value => typeof value==='bigint';

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
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

const OFFSET_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
const LOCAL_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const LOCAL_DATE = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])$/;
const LOCAL_TIME = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const TIMEZONE_OFFSET = /^([+-])([01]\d|2[0-3]):([0-5]\d)$/;
const DATE = new Date;
const year = (date, utc) => {
	const year = utc ? date.getUTCFullYear() : date.getFullYear();
	if ( year>=1000 && year<=9999 ) { return ''+year; }
	if ( year>=100 && year<=999 ) { return '0'+year; }
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
	
	static isDatetime (value) {
		return value instanceof Datetime;
	}
	
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

const Null = function () { };
Null.prototype = create(null);

class Table extends Null {
	
	static isTable (value) {
		return value instanceof Table || toString.call(value)==='[object Object]';
	}
	
}

const BOM = /^\uFEFF/;
const EOL = /\r?\n/;
const PRE_WHITESPACE = /^[ \t]*/;
const TABLE_DEFINITION = /^\[(\[?)[ \t]*((?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*')(?:[ \t]*\.[ \t]*(?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*'))*)[ \t]*](]?)[ \t]*(?:$|#)/;
const KEY_VALUE_PAIR = /^((?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*')(?:[ \t]*\.[ \t]*(?:[\w-]+|"(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))*"|'[^'\x00-\x08\x0B-\x1F\x7F]*'))*)[ \t]*=[ \t]*([^ \t#][^]*)$/;
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
const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };
const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u(.{4})|U(.{4})(.{4}))/g;
const unEscapeSingleLine = ($0, $1, $2, $3, $4, $5) => $1 ? $1 : $2 ? ESCAPE_ALIAS[$2] : fromCodePoint(parseInt($3 || $4+$5, 16));
const SYM_WHITESPACE = /^[^][ \t]*/;
const InlineArray = 0;
const ArrayOfStrings = 1;
const ArrayOfInlineTables = 2;
const ArrayOfInlineArrays = 3;
const ArrayOfBooleans = 4;
const ArrayOfFloats = 5;
const ArrayOfDatetimes = 6;
const ArrayOfIntegers = 7;
const ArraysOfTables = new WeakSet;
const newArrayOfTables = () => {
	const array = [];
	ArraysOfTables.add(array);
	return array;
};
const InlineArrays = new WeakMap;
const newInlineArray = () => {
	const array = [];
	InlineArrays.set(array, InlineArray);
	return array;
};
const typify = (array, type) => {
	if ( InlineArrays.get(array)===type ) { return array; }
	InlineArrays.get(array)===InlineArray || throwTypeError('Types in array must be same.');
	InlineArrays.set(array, type);
	return array;
};
const Tables = new WeakSet;
const InlineTables = new WeakSet;
const newTable = () => {
	const table = new Table;
	Tables.add(table);
	return table;
};
const newInlineTable = () => {
	const table = new Table;
	InlineTables.add(table);
	return table;
};
let useWhatToJoinMultiLineString;
let useBigInt;

function parse (toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true) {
	if ( typeof toml_source!=='string' ) { throw new TypeError('TOML.parse(source)'); }
	if ( toml_version!==0.5 ) { throw new Error('TOML.parse(,version)'); }
	if ( typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( typeof useBigInt_forInteger!=='boolean' ) { throw new TypeError('TOML.parse(,,,useBigInt)'); }
	useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
	useBigInt = useBigInt_forInteger;
	const rootTable = newTable();
	try {
		from(toml_source.replace(BOM, '').split(EOL));
		let lastSectionTable = rootTable;
		while ( rest() ) {
			const line = next().replace(PRE_WHITESPACE, '');
			if ( line==='' || line.startsWith('#') ) ;
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_ } = TABLE_DEFINITION.exec(line) || throwSyntaxError(where());
				( $_asArrayItem$$==='[' )===( $$asArrayItem$_===']' ) || throwSyntaxError('Square brackets of table define statement not match at '+where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$==='[');
			}
			else {
				const rest$$1 = assignInline(lastSectionTable, line);
				rest$$1==='' || rest$$1.startsWith('#') || throwSyntaxError(where());
			}
		}
	}
	finally { done(); }
	return rootTable;
}
function appendTable (table, key_key, asArrayItem) {
	const leadingKeys = parseKeys(key_key);
	const finalKey = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	const lastTable = newTable();
	if ( asArrayItem ) {
		let arrayOfTables;
		if ( finalKey in table ) { ArraysOfTables.has(arrayOfTables = table[finalKey]) || throwError('Trying to push Table to non-ArrayOfTables value at '+where()); }
		else { arrayOfTables = table[finalKey] = newArrayOfTables(); }
		arrayOfTables.push(lastTable);
	}
	else {
		finalKey in table && throwError('Duplicate Table definition at '+where());
		table[finalKey] = lastTable;
	}
	return lastTable;
}

function assignInline (lastInlineTable, lineRest) {
	const { 1: left, 2: right } = KEY_VALUE_PAIR.exec(lineRest) || throwSyntaxError(where());
	const leadingKeys = parseKeys(left);
	const finalKey = leadingKeys.pop();
	const table = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && throwError('Duplicate property definition at '+where());
	switch ( right[0] ) {
		case "'":
			return assignLiteralString(table, finalKey, right);
		case '"':
			return assignBasicString(table, finalKey, right);
		case '{':
			return assignInlineTable(table, finalKey, right);
		case '[':
			return assignInlineArray(table, finalKey, right);
	}
	let literal;
	( { 1: literal, 2: lineRest } = VALUE_REST.exec(right) || throwSyntaxError(where()) );
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
			literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
				literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
					literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') ? new Datetime(literal) :
						literal.includes('.') || literal.includes('e') || literal.includes('E') ? Float(literal) : Integer(literal, useBigInt);
	return lineRest;
}

function parseKeys (key_key) {
	const keys = key_key.match(KEYS);
	for ( let index = keys.length; index--; ) {
		const key = keys[index];
		if ( key.startsWith("'") ) { keys[index] = keys.slice(1, -1); }
		else if ( key.startsWith('"') ) {
			keys[index] = keys.slice(1, -1).replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
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
			if ( !Tables.has(table) ) {
				ArraysOfTables.has(table) || throwError('Trying to define table through non-Table value at '+where());
				table = table[table.length-1];
			}
		}
		else {
			table = table[key] = newTable();
			while ( index<length ) { table = table[keys[index++]] = newTable(); }
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
		if ( key in table ) { InlineTables.has(table = table[key]) || throwError('Trying to assign property through non-InlineTable value at '+where()); }
		else {
			table = table[key] = newInlineTable();
			while ( index<length ) { table = table[keys[index++]] = newInlineTable(); }
			return table;
		}
	}
	return table;
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
		table[finalKey] = $[1].replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
		return $[2];
	}
	$ = MULTI_LINE_BASIC_STRING_LONE.exec(literal);
	if ( $ ) {
		ESCAPED_EXCLUDE_CONTROL_CHARACTER.test($[1]) || throwSyntaxError(where());
		table[finalKey] = $[1].replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
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
	const inlineTable = table[finalKey] = newInlineTable();
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
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

function assignInlineArray (table, finalKey, lineRest) {
	const inlineArray = table[finalKey] = newInlineArray();
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

function pushInline (array, right) {
	switch ( right[0] ) {
		case "'":
			return assignLiteralString(typify(array, ArrayOfStrings), ''+array.length, right);
		case '"':
			return assignBasicString(typify(array, ArrayOfStrings), ''+array.length, right);
		case '{':
			return assignInlineTable(typify(array, ArrayOfInlineTables), ''+array.length, right);
		case '[':
			return assignInlineArray(typify(array, ArrayOfInlineArrays), ''+array.length, right);
	}
	const { 1: literal, 2: lineRest } = VALUE_REST.exec(right) || throwSyntaxError(where());
	if ( literal==='true' ) { typify(array, ArrayOfBooleans).push(true); }
	else if ( literal==='false' ) { typify(array, ArrayOfBooleans).push(false); }
	else if ( literal==='inf' || literal==='+inf' ) { typify(array, ArrayOfFloats).push(Infinity); }
	else if ( literal==='-inf' ) { typify(array, ArrayOfFloats).push(-Infinity); }
	else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
		typify(array, ArrayOfFloats).push(NaN);
	}
	else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') ) {
		typify(array, ArrayOfDatetimes).push(new Datetime(literal));
	}
	else if ( literal.includes('.') || literal.includes('e') || literal.includes('E') ) {
		typify(array, ArrayOfFloats).push(Float(literal));
	}
	else { typify(array, ArrayOfIntegers).push(Integer(literal, useBigInt)); }
	return lineRest;
}

var semver = [0, 5, 10];

const TOML = {
	parse,
	semver,
	String,
	Integer,
	Float,
	Boolean,
	Datetime,
	Array,
	Table,
};

module.exports = TOML;

//# sourceMappingURL=index.js.map