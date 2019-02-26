import { Error, TypeError, Infinity, NaN, isArray, Symbol_for, isBuffer, Symbol } from './global';
import * as iterator from './share/iterator';
import { isTable, closeTables, openTables } from './types/Table';
import { Datetime } from './types/Datetime';
import { Float } from './types/Float';
import { BasicString, MultiLineBasicString } from './types/String';
import * as options from './share/options';
import * as RE from './share/RE';
import { assignInterpolationString, ensureConstructor, construct } from './parser-extension';

export default function parse (toml_source :string | Uint8Array, toml_version :0.5, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string, useBigInt_forInteger :boolean | number = true, extensionOptions = null) :object {
	if ( isBuffer(toml_source) ) { toml_source = toml_source.toString(); }
	if ( typeof toml_source!=='string' ) { throw new TypeError('TOML.parse(source)'); }
	if ( toml_version!==0.5 ) { throw new Error('TOML.parse(,version)'); }
	options.use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
	const rootTable :object = new options.TableDepends;
	try {
		iterator.from(toml_source.replace(RE.BOM, '').split(RE.EOL));
		let lastSectionTable :object = rootTable;
		while ( iterator.rest() ) {
			const line :string = iterator.next().replace(RE.PRE_WHITESPACE, '');
			if ( line==='' ) { }
			else if ( line.startsWith('#') ) {
				if ( options.keepComment ) { lastSectionTable[Symbol('#')] = line.slice(1); }
			}
			else if ( line.startsWith('[') ) {
				const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash } = RE.TABLE_DEFINITION_exec(line);
				$_asArrayItem$$===$$asArrayItem$_ || iterator.throwSyntaxError('Square brackets of table define statement not match at '+iterator.where());
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, hash);
			}
			else {
				const rest :string = assignInline(lastSectionTable, line);
				if ( rest==='' ) { }
				else if ( rest.startsWith('#') ) {
					if ( options.keepComment ) { lastSectionTable[Symbol('#')] = rest.slice(1); }
				}
				else { iterator.throwSyntaxError(iterator.where()); }
			}
		}
	}
	finally {
		iterator.done();
		options.clear();
	}
	return rootTable;
};

function appendTable (table :object, key_key :string, asArrayItem :boolean, hash :string) :object {
	const leadingKeys :string[] = parseKeys(key_key);
	const finalKey :string = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable :object;
	if ( asArrayItem ) {
		let arrayOfTables :object[];
		if ( finalKey in table ) { closeTables.has(arrayOfTables = table[finalKey]) && iterator.throwError('Trying to push Table to non-ArrayOfTables value at '+iterator.where()); }
		else { arrayOfTables = table[finalKey] = []; }
		arrayOfTables.push(lastTable = new options.TableDepends);
	}
	else {
		if ( finalKey in table ) {
			options.open && openTables.has(lastTable = table[finalKey]) || iterator.throwError('Duplicate Table definition at '+iterator.where());
			openTables.delete(lastTable);
		}
		else { table[finalKey] = lastTable = new options.TableDepends; }
	}
	if ( options.keepComment && hash ) { table[Symbol_for(finalKey)] = hash.slice(1); }
	return lastTable;
}

function parseKeys (key_key :string) :string[] {
	const keys :RegExpMatchArray = key_key.match(RE.KEYS);
	for ( let index :number = keys.length; index--; ) {
		const key :string = keys[index];
		if ( key.startsWith("'") ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) { keys[index] = BasicString(key.slice(1, -1)); }
	}
	return keys;
}

function prepareTable (table :object, keys :string[]) :object {
	const { length } :string[] = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++];
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				closeTables.has(table) && iterator.throwError('Trying to define table through static Inline Object at '+iterator.where());
			}
			else if ( isArray(table) ) {
				closeTables.has(table) && iterator.throwError('Trying to append value to static Inline Array at '+iterator.where());
				// @ts-ignore
				table = table[table.length-1];
			}
			else { iterator.throwError('Trying to define table through non-Table value at '+iterator.where()); }
		}
		else {
			openTables.add(table = table[key] = new options.TableDepends);
			while ( index<length ) { openTables.add(table = table[keys[index++]] = new options.TableDepends); }
			return table;
		}
	}
	return table;
}

function prepareInlineTable (table :object, keys :string[]) :object {
	const { length } :string[] = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++];
		if ( key in table ) {
			table = table[key];
			isTable(table) || iterator.throwError('Trying to assign property through non-Table value at '+iterator.where());
			closeTables.has(table) && iterator.throwError('Trying to assign property through static Inline Object at '+iterator.where());
		}
		else {
			table = table[key] = new options.TableDepends;
			while ( index<length ) { table = table[keys[index++]] = new options.TableDepends; }
			return table;
		}
	}
	return table;
}

function assignInline (lastInlineTable :object, lineRest :string) :string {
	const { 1: left, 2: custom, 3: type, 4: right } = RE.KEY_VALUE_PAIR_exec(lineRest);
	custom && ensureConstructor(type);
	const leadingKeys :string[] = parseKeys(left);
	const finalKey :string = leadingKeys.pop();
	const table :object = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && iterator.throwError('Duplicate property definition at '+iterator.where());
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
			let literal :string;
			( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(right) || iterator.throwSyntaxError(iterator.where()) );
			table[finalKey] =
				literal==='true' ? true : literal==='false' ? false :
					literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
						literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
							literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
								literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
									options.enableNull && literal==='null' || options.enableNil && literal==='nil' ? null :
										options.IntegerDepends(literal);
			break;
	}
	if ( custom ) { table[finalKey] = construct(type, table[finalKey]); }
	if ( options.keepComment && lineRest.startsWith('#') ) {
		table[Symbol_for(finalKey)] = lineRest.slice(1);
		return '';
	}
	return lineRest;
}

function assignLiteralString (table :object, finalKey :string, literal :string) :string {
	let $ :RegExpExecArray;
	if ( literal.charAt(1)!=="'" || literal.charAt(2)!=="'" ) {
		$ = RE.LITERAL_STRING.exec(literal) || iterator.throwSyntaxError(iterator.where());
		table[finalKey] = $[1];
		return $[2];
	}
	literal = literal.slice(3);
	$ = RE.MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		RE.CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && iterator.throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+iterator.where());
		table[finalKey] = $[1];
		return $[2];
	}
	if ( literal ) {
		RE.CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && iterator.throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+iterator.where());
		literal += options.useWhatToJoinMultiLineString;
	}
	const start :number = iterator.mark();
	for ( ; ; ) {
		const line :string = iterator.must('Literal String', start);
		$ = RE.MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			RE.CONTROL_CHARACTER_EXCLUDE_TAB.test($[1]) && iterator.throwSyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+iterator.where());
			table[finalKey] = literal+$[1];
			return $[2];
		}
		literal += line+options.useWhatToJoinMultiLineString;
	}
}

function assignBasicString (table :object, finalKey :string, literal :string) :string {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = RE.BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = RE.MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throwSyntaxError(iterator.where());
		table[finalKey] = BasicString($);
		return literal.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || iterator.throwSyntaxError(iterator.where());
	}
	const start :number = iterator.mark();
	for ( ; ; ) {
		let line :string = iterator.must('Basic String', start);
		const $ = RE.MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throwSyntaxError(iterator.where());
			table[finalKey] = MultiLineBasicString(literal+$);
			return line.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
		}
		line += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || iterator.throwSyntaxError(iterator.where());
		literal += line;
	}
}

function assignInlineTable (table :object, finalKey :string, lineRest :string) :string {
	const inlineTable :object = table[finalKey] = new options.TableDepends;
	closeTables.add(inlineTable);
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	if ( options.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start :number = iterator.mark();
		for ( ; ; ) {
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
				}
				else { break; }
				lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			lineRest = assignInline(inlineTable, lineRest);
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
				}
				else { break; }
				lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }
		}
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && iterator.throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where());
		for ( ; ; ) {
			lineRest = assignInline(inlineTable, lineRest);
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
				lineRest.startsWith('}') && iterator.throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator.where());
			}
			( lineRest==='' || lineRest.startsWith('#') ) && iterator.throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where());
		}
	}
}

function assignInlineArray (table :object, finalKey :string, lineRest :string) :string {
	const inlineArray :any[] = table[finalKey] = [];
	closeTables.add(inlineArray);
	const start :number = iterator.mark();
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	for ( ; ; ) {
		if ( lineRest==='' ) { }
		else if ( lineRest.startsWith('#') ) {
			if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
		}
		else { break; }
		lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
	for ( ; ; ) {
		lineRest = pushInline(inlineArray, lineRest);
		for ( ; ; ) {
			if ( lineRest==='' ) { }
			else if ( lineRest.startsWith('#') ) {
				if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
			}
			else { break; }
			lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith(',') ) {
			lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
			if ( options.keepComment && lineRest.startsWith('#') ) {
				inlineArray[Symbol_for(inlineArray.length-1+'')] = lineRest.slice(1);
				lineRest = '';
			}
			for ( ; ; ) {
				if ( lineRest==='' ) { }
				else if ( lineRest.startsWith('#') ) {
					if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
				}
				else { break; }
				lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		}
		else {
			if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			iterator.throwSyntaxError(iterator.where());
		}
	}
}

function pushInline (array :any[], lineRest :string) :string {
	const custom = lineRest.startsWith('!!');
	let type :string;
	if ( custom ) {
		//options.typify && iterator.throwSyntaxError('Only mixable arrays could contain custom type. Check '+iterator.where());
		( { 1: type, 2: lineRest } = RE._VALUE_PAIR.exec(lineRest) || iterator.throwSyntaxError(iterator.where()) );
		ensureConstructor(type);
	}
	const lastIndex :string = ''+array.length;
	switch ( lineRest[0] ) {
		case "'":
			lineRest = assignLiteralString(options.asStrings(array), lastIndex, lineRest);
			break;
		case '"':
			lineRest = assignBasicString(options.asStrings(array), lastIndex, lineRest);
			break;
		case '{':
			lineRest = assignInlineTable(options.asTables(array), lastIndex, lineRest);
			break;
		case '[':
			lineRest = assignInlineArray(options.asArrays(array), lastIndex, lineRest);
			break;
		case '`':
			lineRest = assignInterpolationString(options.asStrings(array), lastIndex, lineRest);
			break;
		default:
			let literal :string;
			( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || iterator.throwSyntaxError(iterator.where()) );
			if ( literal==='true' ) { options.asBooleans(array).push(true); }
			else if ( literal==='false' ) { options.asBooleans(array).push(false); }
			else if ( literal==='inf' || literal==='+inf' ) { options.asFloats(array).push(Infinity); }
			else if ( literal==='-inf' ) { options.asFloats(array).push(-Infinity); }
			else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { options.asFloats(array).push(NaN); }
			else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
				options.asDatetimes(array).push(new Datetime(literal));
			}
			else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
				options.asFloats(array).push(Float(literal));
			}
			else if ( options.enableNull && literal==='null' || options.enableNil && literal==='nil' ) { options.asNulls(array).push(null); }
			else { options.asIntegers(array).push(options.IntegerDepends(literal)); }
			break;
	}
	if ( custom ) { array[lastIndex] = construct(type, array[lastIndex]); }
	if ( options.keepComment && lineRest.startsWith('#') ) {
		array[Symbol_for(lastIndex)] = lineRest.slice(1);
		return '';
	}
	return lineRest;
}
