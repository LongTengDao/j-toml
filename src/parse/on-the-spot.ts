import SyntaxError from '.SyntaxError';
import Error from '.Error';
import isArray from '.Array.isArray';
import WeakSet from '.WeakSet';
import * as $iterator$ from '../$iterator$';
import { isTable } from '../types/Table';
import { BasicString, MultiLineBasicString } from '../types/String';
import * as $options$ from '../$options$';
import * as $regexps$ from '../$regexps$';

export const sealedInline = new WeakSet;
const openTables = new WeakSet;
const openedTables = new WeakSet;

const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;

export function appendTable (table :object, key_key :string, asArrayItem :boolean, tag :string) :object {
	const leadingKeys :string[] = parseKeys(key_key);
	const finalKey :string = leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable :object;
	if ( asArrayItem ) {
		let arrayOfTables :object[];
		if ( finalKey in table ) { sealedInline.has(arrayOfTables = table[finalKey]) && $iterator$.throws(Error('Trying to push Table to non-ArrayOfTables value at '+$iterator$.where())); }
		else { arrayOfTables = table[finalKey] = []; }
		tag && $options$.collect({ table, key: finalKey, array: arrayOfTables, index: arrayOfTables.length, tag });
		arrayOfTables.push(lastTable = new $options$.TableDepends);
	}
	else {
		if ( finalKey in table ) {
			$options$.openable && openTables.has(lastTable = table[finalKey]) && !openedTables.has(lastTable) || $iterator$.throws(Error('Duplicate Table definition at '+$iterator$.where()));
			openTables.delete(lastTable);
		}
		else {
			table[finalKey] = lastTable = new $options$.TableDepends;
			$options$.openable && openedTables.add(lastTable);
		}
		tag && $options$.collect({ table, key: finalKey, tag });
	}
	return lastTable;
}

export function parseKeys (key_key :string) :string[] {
	const keys :RegExpMatchArray = key_key.match(KEYS);
	for ( let index :number = keys.length; index--; ) {
		const key :string = keys[index];
		if ( key.startsWith('\'') ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) { keys[index] = BasicString(key.slice(1, -1)); }
	}
	if ( $options$.nonEmptyKey ) {
		for ( let index :number = keys.length; index--; ) {
			keys[index] || $iterator$.throws(SyntaxError('Empty key is not allowed before TOML v0.4, which at '+$iterator$.where()));
		}
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
				sealedInline.has(table) && $iterator$.throws(Error('Trying to define table through static Inline Object at '+$iterator$.where()));
			}
			else if ( isArray(table) ) {
				sealedInline.has(table) && $iterator$.throws(Error('Trying to append value to static Inline Array at '+$iterator$.where()));
				// @ts-ignore
				table = table[table.length-1];
			}
			else { $iterator$.throws(Error('Trying to define table through non-Table value at '+$iterator$.where())); }
		}
		else {
			openTables.add(table = table[key] = new $options$.TableDepends);
			while ( index<length ) { openTables.add(table = table[keys[index++]] = new $options$.TableDepends); }
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
			isTable(table) || $iterator$.throws(Error('Trying to assign property through non-Table value at '+$iterator$.where()));
			sealedInline.has(table) && $iterator$.throws(Error('Trying to assign property through static Inline Object at '+$iterator$.where()));
		}
		else {
			table = table[key] = new $options$.TableDepends;
			while ( index<length ) { table = table[keys[index++]] = new $options$.TableDepends; }
			return table;
		}
	}
	return table;
}

export function assignLiteralString (table :object, finalKey :string, literal :string) :string {
	let $ :RegExpExecArray;
	if ( literal.charAt(1)!=='\'' || literal.charAt(2)!=='\'' ) {
		$ = $regexps$.LITERAL_STRING.exec(literal) || $iterator$.throws(SyntaxError($iterator$.where()));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	$ = $regexps$.MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	if ( literal ) {
		checkLiteralString(literal);
		literal += $options$.useWhatToJoinMultiLineString;
	}
	const start :number = $iterator$.mark();
	for ( ; ; ) {
		const line :string = $iterator$.must('Literal String', start);
		$ = $regexps$.MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			table[finalKey] = literal+checkLiteralString($[1]);
			return $[2];
		}
		literal += line+$options$.useWhatToJoinMultiLineString;
	}
}

const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_LESSER = /[\x00-\x08\x0B-\x1F]/;
function checkLiteralString (literal :string) :string {
	( $options$.ctrl7F ? CONTROL_CHARACTER_EXCLUDE_TAB : CONTROL_CHARACTER_EXCLUDE_TAB_LESSER ).test(literal) && $iterator$.throws(SyntaxError('Control characters other than tab are not permitted in a Literal String, which was found at '+$iterator$.where()));
	return literal;
}

export function assignBasicString (table :object, finalKey :string, literal :string) :string {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = $regexps$.BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = $regexps$.MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		$regexps$.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || $iterator$.throws(SyntaxError($iterator$.where()));
		table[finalKey] = MultiLineBasicString($);
		return literal.slice($.length+3).replace($regexps$.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		$regexps$.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || $iterator$.throws(SyntaxError($iterator$.where()));
	}
	const start :number = $iterator$.mark();
	for ( ; ; ) {
		let line :string = $iterator$.must('Basic String', start);
		const $ = $regexps$.MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			$regexps$.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || $iterator$.throws(SyntaxError($iterator$.where()));
			table[finalKey] = MultiLineBasicString(literal+$);
			return line.slice($.length+3).replace($regexps$.PRE_WHITESPACE, '');
		}
		line += '\n';
		$regexps$.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || $iterator$.throws(SyntaxError($iterator$.where()));
		literal += line;
	}
}
