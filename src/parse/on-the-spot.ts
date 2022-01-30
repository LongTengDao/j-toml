import Error from '.Error';
import SyntaxError from '.SyntaxError';

import * as iterator from '../iterator';
import * as regexps from '../regexps';
import { LiteralObject } from '../types/atom';
import { newArray, OF_TABLES, isArray, isStatic } from '../types/Array';
import { DIRECTLY, IMPLICITLY, PAIR, isTable, isInline, directlyIfNot, fromPair } from '../types/Table';
import * as options from '../options';
import { BasicString, MultilineBasicString } from '../types/String';

export const prepareTable = (table :Table, keys :Array<string>) :Table => {
	const { length } = keys;
	let index :number = 0;
	while ( index<length ) {
		const key :string = keys[index++]!;
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				isInline(table) && iterator.throws(Error(`Trying to define Table under Inline Table` + iterator.where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && iterator.throws(Error(`Trying to append value to Static Array` + iterator.where(' at ')));
				table = table[( table as Array ).length - 1];
			}
			else { throw iterator.throws(Error(`Trying to define Table under non-Table value` + iterator.where(' at '))); }
		}
		else {
			table = table[key] = new options.Table(IMPLICITLY);
			while ( index<length ) { table = table[keys[index++]!] = new options.Table(IMPLICITLY); }
			return table;
		}
	}
	return table;
};

export const appendTable = (table :Table, finalKey :string, asArrayItem :boolean, tag :string) :Table => {
	let lastTable :Table;
	if ( asArrayItem ) {
		let arrayOfTables :Array<Table>;
		if ( finalKey in table ) { isArray(arrayOfTables = table[finalKey]) && !isStatic(arrayOfTables) || iterator.throws(Error(`Trying to push Table to non-ArrayOfTables value` + iterator.where(' at '))); }
		else { arrayOfTables = table[finalKey] = newArray(OF_TABLES); }
		tag && options.collect(tag, arrayOfTables, table, finalKey);
		arrayOfTables[arrayOfTables.length] = lastTable = new options.Table(DIRECTLY);
	}
	else {
		if ( finalKey in table ) {
			lastTable = table[finalKey];
			directlyIfNot(lastTable) || iterator.throws(Error(`Duplicate Table definition` + iterator.where(' at ')));
			fromPair(lastTable) && iterator.throws(Error(`A table defined implicitly via key/value pair can not be accessed to via []` + iterator.where(', which at ')));
		}
		else { table[finalKey] = lastTable = new options.Table(DIRECTLY); }
		tag && options.collect(tag, null, table, finalKey);
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
			isTable(table) || iterator.throws(Error(`Trying to assign property through non-Table value` + iterator.where(' at ')));
			isInline(table) && iterator.throws(Error(`Trying to assign property through static Inline Table` + iterator.where(' at ')));
			fromPair(table) || iterator.throws(Error(`A table defined implicitly via [] can not be accessed to via key/value pair` + iterator.where(', which at ')));
		}
		else {
			table = table[key] = new options.Table(IMPLICITLY, PAIR);
			while ( index<length ) { table = table[keys[index++]!] = new options.Table(IMPLICITLY, PAIR); }
			return table;
		}
	}
	return table;
};

const checkLiteralString = (literal :string) :string => {
	regexps.__CONTROL_CHARACTER_EXCLUDE_test(literal) && iterator.throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String` + iterator.where(', which was found at ')));
	return literal;
};

export const assignLiteralString = ( (table :Table, finalKey :string, literal :string) :string => {
	if ( !literal.startsWith(`'''`) ) {
		const $ = regexps.LITERAL_STRING_exec(literal) ?? iterator.throws(SyntaxError(`Bad literal string` + iterator.where(' at ')));
		const value = checkLiteralString($[1]);
		table[finalKey] = options.preserveLiteral ? LiteralObject(literal.slice(0, value.length + 2), value) : value;
		return $[2];
	}
	const $ = regexps.__MULTI_LINE_LITERAL_STRING_exec(literal.slice(3));
	if ( $ ) {
		const value = checkLiteralString($[1]) + $[2];
		table[finalKey] = options.preserveLiteral ? LiteralObject(literal.slice(0, value.length + 6), value) : value;
		return $[3];
	}
	const start = new iterator.mark('Multi-line Literal String', literal.length);
	const leadingNewline = !( literal = literal.slice(3) );
	if ( leadingNewline ) {
		literal = start.must();
		const $ = regexps.__MULTI_LINE_LITERAL_STRING_exec(literal);
		if ( $ ) {
			const value = checkLiteralString($[1]) + $[2];
			table[finalKey] = options.preserveLiteral ? LiteralObject([ `'''`, literal.slice(0, value.length + 3) ], value) : value;
			return $[3];
		}
	}
	options.useWhatToJoinMultilineString ?? start.nowrap();
	for ( const lines :[ string, ...string[] ] = [ checkLiteralString(literal) ]; ; ) {
		const line :string = start.must();
		const $ = regexps.__MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			const value = lines.join(options.useWhatToJoinMultilineString!);
			if ( options.preserveLiteral ) {
				lines[lines.length - 1] += `'''`;
				leadingNewline ? lines.unshift(`'''`) : lines[0] = `'''${literal}`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return $[3];
		}
		lines[lines.length] = checkLiteralString(line);
	}
} ) as {
	(this :void, array :Array, finalIndex :number, literal :string) :string
	(this :void, table :Table, finalName :string, literal :string) :string
};

export const assignBasicString = ( (table :Table, finalKey :string, literal :string) :string => {
	if ( !literal.startsWith('"""') ) {
		const index = regexps.BASIC_STRING_exec_1_endIndex(literal);
		const value = BasicString(literal.slice(1, index));
		table[finalKey] = options.preserveLiteral ? LiteralObject(literal.slice(0, index + 1), value) : value;
		return literal.slice(index + 1).replace(regexps.PRE_WHITESPACE, '');
	}
	let length = 3 + regexps.MULTI_LINE_BASIC_STRING_exec_0_length(literal.slice(3));
	if ( literal.length!==length ) {
		const $ = literal.slice(3, length);
		regexps.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throws(SyntaxError(`Bad multi-line basic string` + iterator.where(' at ')));
		const value = BasicString($) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
		table[finalKey] = options.preserveLiteral ? LiteralObject(literal.slice(0, length), value) : value;
		return literal.slice(length).replace(regexps.PRE_WHITESPACE, '');
	}
	const start = new iterator.mark('Multi-line Basic String', length);
	const skipped :0 | 1 = ( literal = literal.slice(3) ) ? 0 : 1;
	if ( skipped ) {
		literal = start.must();
		let length = regexps.MULTI_LINE_BASIC_STRING_exec_0_length(literal);
		if ( literal.length!==length ) {
			const $ = literal.slice(0, length);
			regexps.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throws(SyntaxError(`Bad multi-line basic string` + iterator.where(' at ')));
			const value = MultilineBasicString($, options.useWhatToJoinMultilineString!, skipped) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			table[finalKey] = options.preserveLiteral ? LiteralObject([ '"""', literal.slice(0, length) ], value) : value;
			return literal.slice(length).replace(regexps.PRE_WHITESPACE, '');
		}
	}
	options.useWhatToJoinMultilineString ?? start.nowrap();
	regexps.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal + '\n') || iterator.throws(SyntaxError(`Bad multi-line basic string` + iterator.where(' at ')));
	for ( const lines :[ string, ...string[] ] = [ literal ]; ; ) {
		const line :string = start.must();
		let length = regexps.MULTI_LINE_BASIC_STRING_exec_0_length(line);
		if ( line.length!==length ) {
			const $ = line.slice(0, length);
			regexps.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || iterator.throws(SyntaxError(`Bad multi-line basic string` + iterator.where(' at ')));
			const value = MultilineBasicString(lines.join('\n') + '\n' + $, options.useWhatToJoinMultilineString!, skipped) + ( line.startsWith('"', length += 3) ? line.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			if ( options.preserveLiteral ) {
				skipped ? lines.unshift('"""') : lines[0] = `"""${literal}`;
				lines[lines.length] = `${$}"""`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return line.slice(length).replace(regexps.PRE_WHITESPACE, '');
		}
		regexps.ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line + '\n') || iterator.throws(SyntaxError(`Bad multi-line basic string` + iterator.where(' at ')));
		lines[lines.length] = line;
	}
} ) as {
	(this :void, array :Array, finalIndex :number, literal :string) :string
	(this :void, table :Table, finalName :string, literal :string) :string
};

import type { Array } from '../types/Array';
import type { Table } from '../types/Table';
