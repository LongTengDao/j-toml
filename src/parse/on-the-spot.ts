import SyntaxError from '.SyntaxError';
import Error from '.Error';
import isArray from '.Array.isArray';
import WeakSet from '.WeakSet';
import * as iterator$0 from '../iterator$0';
import { Table, isTable } from '../types/Table';
import { BasicString, MultiLineBasicString } from '../types/String';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';

export const sealedInline :WeakSet<Table> = new WeakSet;
const openTables :WeakSet<Table> = new WeakSet;
const reopenedTables :WeakSet<Table> = new WeakSet;

const KEYS_STRICT :RegExp = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const KEYS_FREE :RegExp = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;

export function appendTable (table :Table, key_key :string, asArrayItem :boolean, tag :string) :Table {
	const leadingKeys :[string, ...string[]] = parseKeys(key_key);
	const finalKey :string = <string>leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable :Table;
	if ( asArrayItem ) {
		let arrayOfTables :Table[];
		if ( finalKey in table ) { sealedInline.has(arrayOfTables = table[finalKey]) && iterator$0.throws(Error(`Trying to push Table to non-ArrayOfTables value at ${iterator$0.where()}`)); }
		else { arrayOfTables = table[finalKey] = []; }
		tag && options$0.collect({ table, key: finalKey, array: arrayOfTables, index: arrayOfTables.length, tag });
		arrayOfTables.push(lastTable = options$0.Table());
	}
	else {
		if ( finalKey in table ) {
			if ( options$0.unreopenable || !openTables.has(lastTable = table[finalKey]) || reopenedTables.has(lastTable) ) { throw iterator$0.throws(Error(`Duplicate Table definition at ${iterator$0.where()}`)); }
			openTables.delete(lastTable);
		}
		else {
			table[finalKey] = lastTable = options$0.Table();
			options$0.unreopenable || reopenedTables.add(lastTable);
		}
		tag && options$0.collect({ table, key: finalKey, array: null, tag });
	}
	return lastTable;
}

export function parseKeys (key_key :string) {
	const keys = <[string, ...string[]]>key_key.match(options$0.strictBareKey ? KEYS_STRICT : KEYS_FREE);
	for ( let index :number = keys.length; index--; ) {
		const key :string = keys[index];
		if ( key.startsWith('\'') ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) { keys[index] = BasicString(key.slice(1, -1)); }
	}
	if ( options$0.disallowEmptyKey ) {
		for ( let index :number = keys.length; index--; ) {
			keys[index] || iterator$0.throws(SyntaxError(`Empty key is not allowed before TOML v0.5, which at ${iterator$0.where()}`));
		}
	}
	return keys;
}

function prepareTable (table :Table, keys :string[]) :Table {
	const { length } = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++];
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				sealedInline.has(table) && iterator$0.throws(Error(`Trying to define Table under static Inline Table at ${iterator$0.where()}`));
			}
			else if ( isArray(table) ) {
				sealedInline.has(table) && iterator$0.throws(Error(`Trying to append value to static Inline Array at ${iterator$0.where()}`));
				// @ts-ignore
				table = table[table.length-1];
			}
			else { iterator$0.throws(Error(`Trying to define Table under non-Table value at ${iterator$0.where()}`)); }
		}
		else {
			openTables.add(table = table[key] = options$0.Table());
			while ( index<length ) { openTables.add(table = table[keys[index++]] = options$0.Table()); }
			return table;
		}
	}
	return table;
}

export function prepareInlineTable (table :Table, keys :string[]) :Table {
	const { length } = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++];
		if ( key in table ) {
			table = table[key];
			isTable(table) || iterator$0.throws(Error(`Trying to assign property through non-Table value at ${iterator$0.where()}`));
			sealedInline.has(table) && iterator$0.throws(Error(`Trying to assign property through static Inline Table at ${iterator$0.where()}`));
		}
		else {
			table = table[key] = options$0.Table();
			while ( index<length ) { table = table[keys[index++]] = options$0.Table(); }
			return table;
		}
	}
	return table;
}

export function assignLiteralString (table :Table, finalKey :string, literal :string) :string {
	let $ :RegExpExecArray | null;
	if ( literal.charAt(1)!=='\'' || literal.charAt(2)!=='\'' ) {
		$ = regexps$0.LITERAL_STRING.exec(literal) || iterator$0.throws(SyntaxError(iterator$0.where()));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	$ = regexps$0.MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	if ( literal ) {
		checkLiteralString(literal);
		literal += options$0.useWhatToJoinMultiLineString;
	}
	const start :number = iterator$0.mark();
	for ( ; ; ) {
		const line :string = iterator$0.must('Literal String', start);
		$ = regexps$0.MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			table[finalKey] = literal+checkLiteralString($[1]);
			return $[2];
		}
		literal += line+options$0.useWhatToJoinMultiLineString;
	}
}

const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_LESSER = /[\x00-\x08\x0B-\x1F]/;
function checkLiteralString (literal :string) :string {
	( options$0.ctrl7F ? CONTROL_CHARACTER_EXCLUDE_TAB : CONTROL_CHARACTER_EXCLUDE_TAB_LESSER ).test(literal) && iterator$0.throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String, which was found at ${iterator$0.where()}`));
	return literal;
}

export function assignBasicString (table :Table, finalKey :string, literal :string) :string {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = regexps$0.BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = regexps$0.MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator$0.throws(SyntaxError(iterator$0.where()));
		table[finalKey] = MultiLineBasicString($);
		return literal.slice($.length+3).replace(regexps$0.PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || iterator$0.throws(SyntaxError(iterator$0.where()));
	}
	const start :number = iterator$0.mark();
	for ( ; ; ) {
		let line :string = iterator$0.must('Basic String', start);
		const $ = regexps$0.MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator$0.throws(SyntaxError(iterator$0.where()));
			table[finalKey] = MultiLineBasicString(literal+$);
			return line.slice($.length+3).replace(regexps$0.PRE_WHITESPACE, '');
		}
		line += '\n';
		regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || iterator$0.throws(SyntaxError(iterator$0.where()));
		literal += line;
	}
}
