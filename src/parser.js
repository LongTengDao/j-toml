import { WeakSet, WeakMap, Error, TypeError, RangeError, Infinity, NaN, isSafeInteger, isArray, Symbol_for, Map, RegExp, getOwnPropertyNames, create, defineProperty, getPrototypeOf, stringify, isBuffer, fromCodePoint, parseInt } from './global.js';
import { from, next, rest, done, mark, must, throwSyntaxError, throwTypeError, throwError, where } from './iterator.js';
import { Integer, Float, Datetime, Table } from './types.js';
import * as RE from './RE.js?<RegExp>';

const { isTable } = Table;
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

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };
const unEscapeSingleLine = ($0, $1, $2, $3, $4) => $1 ? $1 : $2 ? ESCAPE_ALIAS[$2] : fromCodePoint(parseInt($3 || $4, 16));
const unEscapeMultiLine = ($0, $1, $2, $3, $4, $5) => {
	if ( $0==='\n' ) { return useWhatToJoinMultiLineString; }
	if ( $1 ) {
		$1.includes('\n') || throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see '+where());
		return '';
	}
	return unEscapeSingleLine('', $2, $3, $4, $5);
};
const SingleLine = literal => literal.replace(RE.ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
const MultiLine = literal => literal.replace(RE.ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);

export default function parse (toml_source, toml_version, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger = true, extensionOptions) {
	if ( isBuffer(toml_source) ) { toml_source = toml_source.toString(); }
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
		from(toml_source.replace(RE.BOM, '').split(RE.EOL));
		let lastSectionTable = rootTable;
		while ( rest() ) {
			const line = next().replace(RE.PRE_WHITESPACE, '');
			if ( line==='' || line.startsWith('#') ) { }
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash = '' } = RE.TABLE_DEFINITION.exec(line) || throwSyntaxError(where());
				( $_asArrayItem$$==='[' )===( $$asArrayItem$_===']' ) || throwSyntaxError('Square brackets of table define statement not match at '+where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$==='[', hash);
			}
			else {
				const rest = assignInline(lastSectionTable, line);
				rest==='' || rest.startsWith('#') || throwSyntaxError(where());
			}
		}
	}
	finally {
		customConstructors = null;
		done();
	}
	return rootTable;
};

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
	const { 1: left, 2: custom, 3: type, 4: right } = RE.KEY_VALUE_PAIR.exec(lineRest) || throwSyntaxError(where());
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
		literal += useWhatToJoinMultiLineString;
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
		literal += line+useWhatToJoinMultiLineString;
	}
}

function assignBasicString (table, finalKey, literal) {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = RE.BASIC_STRING.exec(literal) || throwSyntaxError(where());
		table[finalKey] = SingleLine($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = RE.MULTI_LINE_BASIC_STRING.exec(literal)[0];
	if ( literal.startsWith('"""', $.length) ) {
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER.test($) || throwSyntaxError(where());
		table[finalKey] = SingleLine($);
		return literal.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER.test(literal) || throwSyntaxError(where());
	}
	const start = mark();
	for ( ; ; ) {
		let line = must('Basic String', start);
		const $ = RE.MULTI_LINE_BASIC_STRING.exec(line)[0];
		if ( line.startsWith('"""', $.length) ) {
			RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER.test($) || throwSyntaxError(where());
			table[finalKey] = MultiLine(literal+$);
			return line.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
		}
		line += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER.test(line) || throwSyntaxError(where());
		literal += line;
	}
}

function assignInlineTable (table, finalKey, lineRest) {
	const inlineTable = table[finalKey] = new Table(keepOrder);
	StaticObjects.add(inlineTable);
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	if ( allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start = mark();
		for ( ; ; ) {
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			lineRest = assignInline(inlineTable, lineRest);
			while ( lineRest==='' || lineRest.startsWith('#') ) {
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
	StaticObjects.add(inlineArray);
	const start = mark();
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	while ( lineRest==='' || lineRest.startsWith('#') ) {
		lineRest = must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
	for ( ; ; ) {
		lineRest = pushInline(inlineArray, lineRest);
		while ( lineRest==='' || lineRest.startsWith('#') ) {
			lineRest = must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith(',') ) {
			lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
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
		typify===unlimitedType || throwSyntaxError('Only mixable arrays could contain custom type. Check '+where());
		( { 1: type, 2: lineRest } = RE._VALUE_PAIR.exec(lineRest) || throwSyntaxError(where()) );
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
			( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || throwSyntaxError(where()) );
			if ( literal==='true' ) { typify(array, ArrayOfBooleans).push(true); }
			else if ( literal==='false' ) { typify(array, ArrayOfBooleans).push(false); }
			else if ( literal==='inf' || literal==='+inf' ) { typify(array, ArrayOfFloats).push(Infinity); }
			else if ( literal==='-inf' ) { typify(array, ArrayOfFloats).push(-Infinity); }
			else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
				typify(array, ArrayOfFloats).push(NaN);
			}
			else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
				typify(array, ArrayOfDatetimes).push(new Datetime(literal));
			}
			else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
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

function assignInterpolationString (table, finalKey, delimiter) {
	enableInterpolationString || throwSyntaxError(where());
	RE.DELIMITER_CHECK.test(delimiter) && throwSyntaxError('Interpolation String opening tag incorrect at '+where());
	let string;
	let lineRest;
	{
		const literals = [];
		for ( const start = mark(); ; ) {
			const literal = must('Interpolation String', start);
			if ( literal.startsWith(delimiter) ) {
				lineRest = literal.slice(delimiter.length).replace(RE.PRE_WHITESPACE, '');
				break;
			}
			literals.push(literal);
		}
		string = literals.join('\n');
	}
	if ( lineRest.startsWith('(') ) {
		const interpolations_rest = RE.INTERPOLATIONS.exec(lineRest) || throwSyntaxError(where());
		lineRest = interpolations_rest[2];
		for ( const interpolation of interpolations_rest[1].match(RE.INTERPOLATION) ) {
			if ( RE.REGEXP_MODE.test(interpolation) ) {
				const { 1: pattern, 2: flags, 3: Replacer } = RE.PATTERN_FLAGS_REPLACER.exec(interpolation);
				const search = newRegExp(pattern, flags) || throwSyntaxError('Invalid regExp at '+where());
				let replacer;
				switch ( Replacer[0] ) {
					case "'":
						replacer = Replacer.slice(1, -1);
						break;
					case '"':
						replacer = SingleLine(Replacer.slice(1, -1));
						break;
					case '{':
						const map = newMap(Replacer, true);
						replacer = $0 => map.has($0) ? map.get($0) : $0;
						break;
					case '[':
						const { 1: whole, 2: subs } = RE.WHOLE_AND_SUBS.exec(Replacer);
						const maps = [null];
						for ( const sub of subs.match(RE.SUB) ) { maps.push(newMap(sub, true)); }
						replacer = (...args) => whole.replace(RE.DOLLAR, $n => {
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
	const tokens = interpolation.match(RE.INTERPOLATION_TOKEN);
	for ( let length = tokens.length, index = 0; index<length; ) {
		let search = tokens[index++];
		search = search[0]==="'" ? search.slice(1, -1) : SingleLine(search.slice(1, -1));
		usedForRegExp || search || throwSyntaxError('Characters to replace can not be empty, which was found at '+where());
		map.has(search) && throwSyntaxError('Duplicate '+( usedForRegExp ? 'replacer' : 'characters to replace' )+' at '+where());
		let replacer = tokens[index++];
		replacer = replacer[0]==="'" ? replacer.slice(1, -1) : SingleLine(replacer.slice(1, -1));
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
