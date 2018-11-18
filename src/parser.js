import { JSON, WeakSet, WeakMap, Error, TypeError, parseInt, Infinity, NaN, fromCodePoint, isArray } from './global.js';
import { from, next, rest, done, mark, must, throwSyntaxError, throwTypeError, throwError, where } from './iterator.js';
import { Integer, Float, Datetime, Table } from './types.js';

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
const TAG_OPENING = /^<([\w-]+)((?:[ \t]+"(?:[^\\"]+|\\[^])+"[ \t]*=[ \t]*"(?:[^\\"]+|\\[^])*")*)[ \t]*/;
const TAG_ATTRIBUTES = /^((?:[ \t]+"(?:[^\\"]+|\\[^])+"[ \t]*=[ \t]*"(?:[^\\"]+|\\[^])*")*)[ \t]*/;
const TAB_ATTRIBUTE = /"(?:[^\\"]+|\\[^])*"/g;

let useWhatToJoinMultiLineString;
let useBigInt;
let enableNull;
let enableNil;
let allowInlineTableMultiLineAndTrailingComma;
let typify;
let enableInterpolationString;

const isTable = value => value instanceof Table;
const StaticObjects = new WeakSet;
const TypedArrays = new WeakMap;
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
		throwTypeError('Types in array must be same.');
	}
	TypedArrays.set(array, type);
	return array;
};
const unlimitedType = array => array;

export default function parse (toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions) {
	if ( typeof toml_source!=='string' ) { throw new TypeError('TOML.parse(source)'); }
	if ( toml_version!==0.5 ) { throw new Error('TOML.parse(,version)'); }
	if ( typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( typeof useBigInt_forInteger!=='boolean' ) { throw new TypeError('TOML.parse(,,,useBigInt)'); }
	useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
	useBigInt = useBigInt_forInteger;
	enableNull = !!( extensionOptions && extensionOptions.null );
	enableNil = !!( extensionOptions && extensionOptions.nil );
	allowInlineTableMultiLineAndTrailingComma = !!( extensionOptions && extensionOptions.multi );
	typify = extensionOptions && extensionOptions.mix ? unlimitedType : reallyTypify;
	enableInterpolationString = !!( extensionOptions && extensionOptions.ins );
	const rootTable = new Table;
	try {
		from(toml_source.replace(BOM, '').split(EOL));
		let lastSectionTable = rootTable;
		while ( rest() ) {
			const line = next().replace(PRE_WHITESPACE, '');
			if ( line==='' || line.startsWith('#') ) { }
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_ } = TABLE_DEFINITION.exec(line) || throwSyntaxError(where());
				( $_asArrayItem$$==='[' )===( $$asArrayItem$_===']' ) || throwSyntaxError('Square brackets of table define statement not match at '+where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$==='[');
			}
			else {
				const rest = assignInline(lastSectionTable, line);
				rest==='' || rest.startsWith('#') || throwSyntaxError(where());
			}
		}
	}
	finally { done(); }
	return rootTable;
};

function appendTable (table, key_key, asArrayItem) {
	const leadingKeys = parseKeys(key_key);
	const finalKey = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	const lastTable = new Table;
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
	return lastTable;
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
			table = table[key] = new Table;
			while ( index<length ) { table = table[keys[index++]] = new Table; }
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
			table = table[key] = new Table;
			while ( index<length ) { table = table[keys[index++]] = new Table; }
			return table;
		}
	}
	return table;
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
		case '<':
			return assignInterpolationString(table, finalKey, right);
	}
	let literal;
	( { 1: literal, 2: lineRest } = VALUE_REST.exec(right) || throwSyntaxError(where()) );
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
			literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
				literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
					literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') ? new Datetime(literal) :
						literal.includes('.') || literal.includes('e') || literal.includes('E') ? Float(literal) :
							enableNull && literal==='null' || enableNil && literal==='nil' ? null :
								Integer(literal, useBigInt);
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
	const inlineTable = table[finalKey] = new Table;
	StaticObjects.add(inlineTable);
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	if ( allowInlineTableMultiLineAndTrailingComma ) {
		const start = mark();
		while ( lineRest==='' || lineRest.startsWith('#') ) {
			lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
		for ( ; ; ) {
			lineRest = assignInline(inlineTable, lineRest);
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(SYM_WHITESPACE, '');
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				throwSyntaxError(where());
			}
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
		case '<':
			return assignInterpolationString(typify(array, ArrayOfStrings), ''+array.length, right);
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
	else if ( enableNull && literal==='null' || enableNil && literal==='nil' ) {
		typify(array, ArrayOfNulls).push(null);
	}
	else { typify(array, ArrayOfIntegers).push(Integer(literal, useBigInt)); }
	return lineRest;
}

function assignInterpolationString (table, finalKey, lineRest) {
	enableInterpolationString || throwSyntaxError(where());
	const start = mark();
	let $ = TAG_OPENING.exec(lineRest) || throwSyntaxError('Interpolation String opening tag incorrect at '+where());
	let attributes = $[2];
	const closeTag = '</'+$[1]+'>';
	lineRest = lineRest.slice($[0].length);
	while ( lineRest==='' || lineRest[0]==='#' ) {
		lineRest = must('The open tag of Interpolation String', start);
		$ = TAG_ATTRIBUTES.exec(lineRest) || throwSyntaxError('Interpolation String attributes incorrect at '+where());
		attributes += $[1];
		lineRest = lineRest.slice($[0].length);
	}
	lineRest[0]==='>' || throwSyntaxError('Interpolation String opening tag did not close incorrectly at '+where());
	lineRest = lineRest.slice(1);
	const mapper = new Map;
	$ = attributes.match(TAB_ATTRIBUTE);
	for ( let length = $.length, index = 0; index<length; ) {
		const search = JSON.parse($[index++]);
		mapper.has(search) && throwError('Duplicate attribute definition at '+where());
		mapper.set(search, JSON.parse($[index++]));
	}
	let inner = '';
	let index = lineRest.indexOf(closeTag);
	while ( index=== -1 ) {
		inner += lineRest+'\n';
		lineRest = must('Interpolation String', start);
		index = lineRest.indexOf(closeTag);
	}
	inner += lineRest.slice(0, index);
	lineRest = lineRest.slice(index+closeTag.length).replace(PRE_WHITESPACE, '');
	if ( inner.charAt(0)==='\n' ) { inner = inner.slice(1); }
	let value = '';
	outer: for ( let length = inner.length, index = 0; index<length; ) {
		for ( const { 0: search, 1: replacement } of mapper ) {
			if ( inner.startsWith(search, index) ) {
				value += replacement;
				index += search.length;
				continue outer;
			}
		}
		value += inner[index];
		++index;
	}
	table[finalKey] = value;
	return lineRest;
}
