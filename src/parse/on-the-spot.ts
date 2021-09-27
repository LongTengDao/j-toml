import Error from '.Error';
import SyntaxError from '.SyntaxError';

import * as iterator$0 from '../iterator$0';
import { newArray, OF_TABLES, isArray, isStatic } from '../types/Array';
import { DIRECTLY, IMPLICITLY, PAIR, isTable, isInline, directlyIfNot, fromPair } from '../types/Table';
import { BasicString, MultilineBasicString } from '../types/String';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';

export const prepareTable = (table :Table, keys :Array<string>) :Table => {
	const { length } = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++]!;
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				isInline(table) && iterator$0.throws(Error(`Trying to define Table under Inline Table` + iterator$0.where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && iterator$0.throws(Error(`Trying to append value to Static Array` + iterator$0.where(' at ')));
				table = table[( table as Array ).length - 1];
			}
			else { iterator$0.throws(Error(`Trying to define Table under non-Table value` + iterator$0.where(' at '))); }
		}
		else {
			table = table[key] = new options$0.Table(IMPLICITLY);
			while ( index<length ) { table = table[keys[index++]!] = new options$0.Table(IMPLICITLY); }
			return table;
		}
	}
	return table;
};

export const appendTable = (table :Table, finalKey :string, asArrayItem :boolean, tag :string) :Table => {
	let lastTable :Table;
	if ( asArrayItem ) {
		let arrayOfTables :Array<Table>;
		if ( finalKey in table ) { isArray(arrayOfTables = table[finalKey]) && !isStatic(arrayOfTables) || iterator$0.throws(Error(`Trying to push Table to non-ArrayOfTables value` + iterator$0.where(' at '))); }
		else { arrayOfTables = table[finalKey] = newArray(OF_TABLES); }
		tag && options$0.collect(tag, arrayOfTables, table, finalKey);
		arrayOfTables[arrayOfTables.length] = lastTable = new options$0.Table(DIRECTLY);
	}
	else {
		if ( finalKey in table ) {
			lastTable = table[finalKey];
			directlyIfNot(lastTable) || iterator$0.throws(Error(`Duplicate Table definition` + iterator$0.where(' at ')));
			fromPair(lastTable) && iterator$0.throws(Error(`A table defined implicitly via key/value pair can not be accessed to via []` + iterator$0.where(', which at ')));
		}
		else { table[finalKey] = lastTable = new options$0.Table(DIRECTLY); }
		tag && options$0.collect(tag, null, table, finalKey);
	}
	return lastTable;
};

export const prepareInlineTable = (table :Table, keys :string[]) :Table => {
	const { length } = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++]!;
		if ( key in table ) {
			table = table[key];
			isTable(table) || iterator$0.throws(Error(`Trying to assign property through non-Table value` + iterator$0.where(' at ')));
			isInline(table) && iterator$0.throws(Error(`Trying to assign property through static Inline Table` + iterator$0.where(' at ')));
			fromPair(table) || iterator$0.throws(Error(`A table defined implicitly via [] can not be accessed to via key/value pair` + iterator$0.where(', which at ')));
		}
		else {
			table = table[key] = new options$0.Table(IMPLICITLY, PAIR);
			while ( index<length ) { table = table[keys[index++]!] = new options$0.Table(IMPLICITLY, PAIR); }
			return table;
		}
	}
	return table;
};

const checkLiteralString = (literal :string) :string => {
	regexps$0.__CONTROL_CHARACTER_EXCLUDE_test(literal) && iterator$0.throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String` + iterator$0.where(', which was found at ')));
	return literal;
};

export const assignLiteralString = ( (table :Table, finalKey :string, literal :string) :string => {
	if ( literal[1]!=='\'' || literal[2]!=='\'' ) {
		const $ = regexps$0.LITERAL_STRING_exec(literal) ?? iterator$0.throws(SyntaxError(`Bad literal string` + iterator$0.where(' at ')));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = regexps$0.__MULTI_LINE_LITERAL_STRING_exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]) + $[2];
		return $[3];
	}
	const start = new iterator$0.mark('Multi-line Literal String', literal.length + 3);
	if ( !literal ) {
		literal = start.must();
		const $ = regexps$0.__MULTI_LINE_LITERAL_STRING_exec(literal);
		if ( $ ) {
			table[finalKey] = checkLiteralString($[1]) + $[2];
			return $[3];
		}
	}
	options$0.useWhatToJoinMultilineString ?? start.nowrap();
	for ( const lines :[ string, ...string[] ] = [ checkLiteralString(literal) ]; ; ) {
		const line :string = start.must();
		const $ = regexps$0.__MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			table[finalKey] = lines.join(options$0.useWhatToJoinMultilineString!);
			return $[3];
		}
		lines[lines.length] = checkLiteralString(line);
	}
} ) as {
	(this :void, array :Array, finalIndex :number, literal :string) :string
	(this :void, table :Table, finalName :string, literal :string) :string
};

export const assignBasicString = ( (table :Table, finalKey :string, literal :string) :string => {
	if ( literal[1]!=='"' || literal[2]!=='"' ) {
		const string = regexps$0.BASIC_STRING_exec_1(literal);
		table[finalKey] = BasicString(string);
		return literal.slice(2 + string.length).replace(regexps$0.PRE_WHITESPACE, '');
	}
	literal = literal.slice(3);
	const $ = regexps$0.MULTI_LINE_BASIC_STRING_exec_0(literal);
	let { length } = $;
	if ( literal.startsWith('"""', length) ) {
		regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator$0.throws(SyntaxError(`Bad multi-line basic string` + iterator$0.where(' at ')));
		length += 3;
		table[finalKey] = BasicString($) + ( options$0.endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
		return literal.slice(length).replace(regexps$0.PRE_WHITESPACE, '');
	}
	const start = new iterator$0.mark('Multi-line Basic String', literal.length + 3);
	const skipped :0 | 1 = literal ? 0 : 1;
	if ( skipped ) {
		literal = start.must();
		const $ = regexps$0.MULTI_LINE_BASIC_STRING_exec_0(literal);
		let { length } = $;
		if ( literal.startsWith('"""', length) ) {
			regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator$0.throws(SyntaxError(`Bad multi-line basic string` + iterator$0.where(' at ')));
			length += 3;
			table[finalKey] = MultilineBasicString($, options$0.useWhatToJoinMultilineString!, skipped) + ( options$0.endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return literal.slice(length).replace(regexps$0.PRE_WHITESPACE, '');
		}
	}
	options$0.useWhatToJoinMultilineString ?? start.nowrap();
	regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal += '\n') || iterator$0.throws(SyntaxError(`Bad multi-line basic string` + iterator$0.where(' at ')));
	for ( const lines :[ string, ...string[] ] = [ literal ]; ; ) {
		let line :string = start.must();
		const $ = regexps$0.MULTI_LINE_BASIC_STRING_exec_0(line);
		let { length } = $;
		if ( line.startsWith('"""', length) ) {
			regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator$0.throws(SyntaxError(`Bad multi-line basic string` + iterator$0.where(' at ')));
			length += 3;
			table[finalKey] = MultilineBasicString(lines.join('') + $, options$0.useWhatToJoinMultilineString!, skipped) + ( options$0.endsWithQuote ? line[length]==='"' ? line[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return line.slice(length).replace(regexps$0.PRE_WHITESPACE, '');
		}
		regexps$0.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line += '\n') || iterator$0.throws(SyntaxError(`Bad multi-line basic string` + iterator$0.where(' at ')));
		lines[lines.length] = line;
	}
} ) as {
	(this :void, array :Array, finalIndex :number, literal :string) :string
	(this :void, table :Table, finalName :string, literal :string) :string
};

import type { Array } from '../types/Array';
import type { Table } from '../types/Table';
