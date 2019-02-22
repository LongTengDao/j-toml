import { WeakSet, Error, TypeError, Infinity, NaN, isArray, Symbol_for, isBuffer, Symbol } from './global.js';
import { from, next, rest, done, mark, must, throwSyntaxError, throwError, where } from './iterator.js';
import { Integer, Float, Datetime, isTable } from './types.js';
import * as options from './options.js';
import { SingleLine, MultiLine } from './types-options.js';
import * as RE from './RE.js?<RegExp>';
import * as RE_good from './RE-never-slow-nor-overflow.js';

import { assignInterpolationString, ensureConstructor, construct } from './parser-extension.js';

const closeTables = new WeakSet;
const openTables = new WeakSet;

const ArrayOfNulls = -1;
const ArrayOfStrings = 1;
const ArrayOfInlineTables = 2;
const ArrayOfInlineArrays = 3;
const ArrayOfBooleans = 4;
const ArrayOfFloats = 5;
const ArrayOfDatetimes = 6;
const ArrayOfIntegers = 7;

export default function parse (toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions = null) {
	if ( isBuffer(toml_source) ) { toml_source = toml_source.toString(); }
	if ( typeof toml_source!=='string' ) { throw new TypeError('TOML.parse(source)'); }
	if ( toml_version!==0.5 ) { throw new Error('TOML.parse(,version)'); }
	options.use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
	const rootTable = new options.TableDepends;
	try {
		from(toml_source.replace(RE.BOM, '').split(RE.EOL));
		let lastSectionTable = rootTable;
		while ( rest() ) {
			const line = next().replace(RE.PRE_WHITESPACE, '');
			if ( line==='' ) { }
			else if ( line.startsWith('#') ) {
				if ( options.keepComment ) { lastSectionTable[Symbol('#')] = line; }
			}
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash } = RE_good.TABLE_DEFINITION_exec(line);
				$_asArrayItem$$===$$asArrayItem$_ || throwSyntaxError('Square brackets of table define statement not match at '+where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, hash);
			}
			else {
				const rest = assignInline(lastSectionTable, line);
				if ( rest==='' ) { }
				else if ( rest.startsWith('#') ) {
					if ( options.keepComment ) { lastSectionTable[Symbol('#')] = rest; }
				}
				else { throwSyntaxError(where()); }
			}
		}
	}
	finally {
		done();
		options.clear();
	}
	return rootTable;
};

function appendTable (table, key_key, asArrayItem, hash) {
	const leadingKeys = parseKeys(key_key);
	const finalKey = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable;
	if ( asArrayItem ) {
		let arrayOfTables;
		if ( finalKey in table ) { closeTables.has(arrayOfTables = table[finalKey]) && throwError('Trying to push Table to non-ArrayOfTables value at '+where()); }
		else { arrayOfTables = table[finalKey] = []; }
		arrayOfTables.push(lastTable = new options.TableDepends);
	}
	else {
		if ( finalKey in table ) {
			options.open && openTables.has(lastTable = table[finalKey]) || throwError('Duplicate Table definition at '+where());
			openTables.delete(lastTable);
		}
		else { table[finalKey] = lastTable = new options.TableDepends; }
	}
	if ( options.keepComment && hash ) { table[Symbol_for(finalKey)] = hash; }
	return lastTable;
}

function parseKeys (key_key) {
	const keys = key_key.match(RE.KEYS);
	for ( let index = keys.length; index--; ) {
		const key = keys[index];
		if ( key.startsWith("'") ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) {
			keys[index] = SingleLine(key.slice(1, -1));
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
				closeTables.has(table) && throwError('Trying to define table through static Inline Object at '+where());
			}
			else if ( isArray(table) ) {
				closeTables.has(table) && throwError('Trying to append value to static Inline Array at '+where());
				table = table[table.length-1];
			}
			else { throwError('Trying to define table through non-Table value at '+where()); }
		}
		else {
			openTables.add(table = table[key] = new options.TableDepends);
			while ( index<length ) { openTables.add(table = table[keys[index++]] = new options.TableDepends); }
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
			closeTables.has(table) && throwError('Trying to assign property through static Inline Object at '+where());
		}
		else {
			table = table[key] = new options.TableDepends;
			while ( index<length ) { table = table[keys[index++]] = new options.TableDepends; }
			return table;
		}
	}
	return table;
}

function assignInline (lastInlineTable, lineRest) {
	const { 1: left, 2: custom, 3: type, 4: right } = RE_good.KEY_VALUE_PAIR_exec(lineRest);
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
			( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(right) || throwSyntaxError(where()) );
			table[finalKey] =
				literal==='true' ? true : literal==='false' ? false :
					literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
						literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
							literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
								literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
									options.enableNull && literal==='null' || options.enableNil && literal==='nil' ? null :
										Integer(literal, options.useBigInt, options.allowLonger);
			break;
	}
	if ( custom ) { table[finalKey] = construct(type, table[finalKey]); }
	if ( options.keepComment && lineRest.startsWith('#') ) {
		table[Symbol_for(finalKey)] = lineRest;
		return '';
	}
	return lineRest;
}

function assignLiteralString (table, finalKey, literal) {
	let $;
	if ( literal.charAt(1)!=="'" || literal.charAt(2)!=="'" ) {
		$ = RE.LITERAL_STRING.exec(literal) || throwSyntaxError(where());
		table[finalKey] = $[1];
		return $[2];
	}
	literal = literal.slice(3);
	$ = RE.MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		RE.CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
		table[finalKey] = $[1];
		return $[2];
	}
	if ( literal ) {
		RE.CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
		literal += options.useWhatToJoinMultiLineString;
	}
	const start = mark();
	for ( ; ; ) {
		const line = must('Literal String', start);
		$ = RE.MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			RE.CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+where());
			table[finalKey] = literal+$[1];
			return $[2];
		}
		literal += line+options.useWhatToJoinMultiLineString;
	}
}

function assignBasicString (table, finalKey, literal) {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = RE_good.BASIC_STRING_exec(literal);
		table[finalKey] = SingleLine($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = RE_good.MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		RE_good.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throwSyntaxError(where());
		table[finalKey] = SingleLine($);
		return literal.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		RE_good.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throwSyntaxError(where());
	}
	const start = mark();
	for ( ; ; ) {
		let line = must('Basic String', start);
		const $ = RE_good.MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			RE_good.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throwSyntaxError(where());
			table[finalKey] = MultiLine(literal+$);
			return line.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
		}
		line += '\n';
		RE_good.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throwSyntaxError(where());
		literal += line;
	}
}

function assignInlineTable (table, finalKey, lineRest) {
	const inlineTable = table[finalKey] = new options.TableDepends;
	closeTables.add(inlineTable);
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	if ( options.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start = mark();
		for ( ; ; ) {
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest; }
				}
				else { break; }
				lineRest = must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			lineRest = assignInline(inlineTable, lineRest);
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest; }
				}
				else { break; }
				lineRest = must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }
		}
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+where());
		for ( ; ; ) {
			lineRest = assignInline(inlineTable, lineRest);
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
				lineRest.startsWith('}') && throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+where());
			}
			( lineRest==='' || lineRest.startsWith('#') ) && throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+where());
		}
	}
}

function assignInlineArray (table, finalKey, lineRest) {
	const inlineArray = table[finalKey] = [];
	closeTables.add(inlineArray);
	const start = mark();
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	for ( ; ; ) {
		if ( lineRest==='' ) { }
		else if ( lineRest.startsWith('#') ) {
			if ( options.keepComment ) { table[Symbol('#')] = lineRest; }
		}
		else { break; }
		lineRest = must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
	for ( ; ; ) {
		lineRest = pushInline(inlineArray, lineRest);
		for ( ; ; ) {
			if ( lineRest==='' ) { }
			else if ( lineRest.startsWith('#') ) {
				if ( options.keepComment ) { table[Symbol('#')] = lineRest; }
			}
			else { break; }
			lineRest = must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith(',') ) {
			lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
			if ( options.keepComment && lineRest.startsWith('#') ) {
				inlineArray[Symbol_for(inlineArray.length-1+'')] = lineRest;
				lineRest = '';
			}
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest; }
				}
				else { break; }
				lineRest = must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		}
		else {
			if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			throwSyntaxError(where());
		}
	}
}

function pushInline (array, lineRest) {
	const custom = lineRest.startsWith('!!');
	let type;
	if ( custom ) {
		options.typify===options.unlimitedType || throwSyntaxError('Only mixable arrays could contain custom type. Check '+where());
		( { 1: type, 2: lineRest } = RE._VALUE_PAIR.exec(lineRest) || throwSyntaxError(where()) );
		ensureConstructor(type);
	}
	const lastIndex = ''+array.length;
	switch ( lineRest[0] ) {
		case "'":
			lineRest = assignLiteralString(options.typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		case '"':
			lineRest = assignBasicString(options.typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		case '{':
			lineRest = assignInlineTable(options.typify(array, ArrayOfInlineTables), lastIndex, lineRest);
			break;
		case '[':
			lineRest = assignInlineArray(options.typify(array, ArrayOfInlineArrays), lastIndex, lineRest);
			break;
		case '`':
			lineRest = assignInterpolationString(options.typify(array, ArrayOfStrings), lastIndex, lineRest);
			break;
		default:
			let literal;
			( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || throwSyntaxError(where()) );
			if ( literal==='true' ) { options.typify(array, ArrayOfBooleans).push(true); }
			else if ( literal==='false' ) { options.typify(array, ArrayOfBooleans).push(false); }
			else if ( literal==='inf' || literal==='+inf' ) { options.typify(array, ArrayOfFloats).push(Infinity); }
			else if ( literal==='-inf' ) { options.typify(array, ArrayOfFloats).push(-Infinity); }
			else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
				options.typify(array, ArrayOfFloats).push(NaN);
			}
			else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
				options.typify(array, ArrayOfDatetimes).push(new Datetime(literal));
			}
			else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
				options.typify(array, ArrayOfFloats).push(Float(literal));
			}
			else if ( options.enableNull && literal==='null' || options.enableNil && literal==='nil' ) {
				options.typify(array, ArrayOfNulls).push(null);
			}
			else {
				options.typify(array, ArrayOfIntegers).
						push(Integer(literal, options.useBigInt, options.allowLonger));
			}
			break;
	}
	if ( custom ) { array[lastIndex] = construct(type, array[lastIndex]); }
	if ( options.keepComment && lineRest.startsWith('#') ) {
		array[Symbol_for(lastIndex)] = lineRest;
		return '';
	}
	return lineRest;
}
