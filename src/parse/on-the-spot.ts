import SyntaxError from '.SyntaxError';
import Error from '.Error';
import isArray from '.Array.isArray';
import WeakSet from '.WeakSet';
import * as iterator from '../share/iterator';
import { isTable } from '../types/Table';
import { BasicString, MultiLineBasicString } from '../types/String';
import * as options from '../share/options';
import * as RE from '../share/RE';

export const sealedInline = new WeakSet;
const openTables = new WeakSet;

export function appendTable (table :object, key_key :string, asArrayItem :boolean, tag :string) :object {
	const leadingKeys :string[] = parseKeys(key_key);
	const finalKey :string = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable :object;
	if ( asArrayItem ) {
		let arrayOfTables :object[];
		if ( finalKey in table ) { sealedInline.has(arrayOfTables = table[finalKey]) && iterator.throws(Error('Trying to push Table to non-ArrayOfTables value at '+iterator.where())); }
		else { arrayOfTables = table[finalKey] = []; }
		tag && options.collect({ table, key: finalKey, array: arrayOfTables, index: arrayOfTables.length, tag });
		arrayOfTables.push(lastTable = new options.TableDepends);
	}
	else {
		if ( finalKey in table ) {
			options.open && openTables.has(lastTable = table[finalKey]) || iterator.throws(Error('Duplicate Table definition at '+iterator.where()));
			openTables.delete(lastTable);
		}
		else { table[finalKey] = lastTable = new options.TableDepends; }
		tag && options.collect({ table, key: finalKey, tag });
	}
	return lastTable;
}

export function parseKeys (key_key :string) :string[] {
	const keys :RegExpMatchArray = key_key.match(RE.KEYS);
	for ( let index :number = keys.length; index--; ) {
		const key :string = keys[index];
		if ( key.startsWith('\'') ) { keys[index] = key.slice(1, -1); }
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
				sealedInline.has(table) && iterator.throws(Error('Trying to define table through static Inline Object at '+iterator.where()));
			}
			else if ( isArray(table) ) {
				sealedInline.has(table) && iterator.throws(Error('Trying to append value to static Inline Array at '+iterator.where()));
				// @ts-ignore
				table = table[table.length-1];
			}
			else { iterator.throws(Error('Trying to define table through non-Table value at '+iterator.where())); }
		}
		else {
			openTables.add(table = table[key] = new options.TableDepends);
			while ( index<length ) { openTables.add(table = table[keys[index++]] = new options.TableDepends); }
			return table;
		}
	}
	return table;
}

export function prepareInlineTable (table :object, keys :string[]) :object {
	const { length } :string[] = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++];
		if ( key in table ) {
			table = table[key];
			isTable(table) || iterator.throws(Error('Trying to assign property through non-Table value at '+iterator.where()));
			sealedInline.has(table) && iterator.throws(Error('Trying to assign property through static Inline Object at '+iterator.where()));
		}
		else {
			table = table[key] = new options.TableDepends;
			while ( index<length ) { table = table[keys[index++]] = new options.TableDepends; }
			return table;
		}
	}
	return table;
}

export function assignLiteralString (table :object, finalKey :string, literal :string) :string {
	let $ :RegExpExecArray;
	if ( literal.charAt(1)!=='\'' || literal.charAt(2)!=='\'' ) {
		$ = RE.LITERAL_STRING.exec(literal) || iterator.throws(SyntaxError(iterator.where()));
		table[finalKey] = $[1];
		return $[2];
	}
	literal = literal.slice(3);
	$ = RE.MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	if ( literal ) {
		checkLiteralString(literal);
		literal += options.useWhatToJoinMultiLineString;
	}
	const start :number = iterator.mark();
	for ( ; ; ) {
		const line :string = iterator.must('Literal String', start);
		$ = RE.MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			table[finalKey] = literal+checkLiteralString($[1]);
			return $[2];
		}
		literal += line+options.useWhatToJoinMultiLineString;
	}
}

function checkLiteralString (literal :string) :string {
	RE.CONTROL_CHARACTER_EXCLUDE_TAB.test(literal) && iterator.throws(SyntaxError('Control characters other than tab are not permitted in a Multi-Line Literal String, which was found at '+iterator.where()));
	return literal;
}

export function assignBasicString (table :object, finalKey :string, literal :string) :string {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = RE.BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = RE.MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throws(SyntaxError(iterator.where()));
		table[finalKey] = BasicString($);
		return literal.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || iterator.throws(SyntaxError(iterator.where()));
	}
	const start :number = iterator.mark();
	for ( ; ; ) {
		let line :string = iterator.must('Basic String', start);
		const $ = RE.MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throws(SyntaxError(iterator.where()));
			table[finalKey] = MultiLineBasicString(literal+$);
			return line.slice($.length+3).replace(RE.PRE_WHITESPACE, '');
		}
		line += '\n';
		RE.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || iterator.throws(SyntaxError(iterator.where()));
		literal += line;
	}
}
