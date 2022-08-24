import Error from '.Error';
import SyntaxError from '.SyntaxError';
import undefined from '.undefined';

import { theRegExp } from '@ltd/j-regexp';

import { x } from '../j-lexer';/// external

import * as iterator from '../iterator';
import { LiteralObject } from '../types/atom';
import { INLINE, DIRECTLY } from '../types/Table';
import { newArray, STATICALLY } from '../types/Array';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, OFFSET$ } from '../types/Datetime';
import { BasicString } from '../types/String';
import { Integer } from '../types/Integer';
import { Float } from '../types/Float';
import * as options from '../options';
import * as regexps from '../regexps';
import { appendTable, prepareTable, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';

import { commentFor, commentForThis } from '../types/comment';
import { beInline } from '../types/non-atom';

const { test: IS_OFFSET$ } = theRegExp(OFFSET$);
const { test: IS_EMPTY } = theRegExp(/^\[[\t ]*]/);

const parseKeys = (rest :string) :{ leadingKeys :string[], finalKey :string, lineRest :string } => {
	let lineRest :string = rest;
	const leadingKeys :string[] = [];
	let lastIndex :number = -1;
	for ( ; ; ) {
		lineRest || iterator.throws(SyntaxError(`Empty bare key` + iterator.where(' at ')));
		if ( lineRest[0]==='"' ) {
			const index :number = regexps.BASIC_STRING_exec_1_endIndex(lineRest);
			options.KEYS.test(leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index))) || iterator.throws(Error(`Key not allowed` + iterator.where(' at ')));
			lineRest = lineRest.slice(index + 1);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key :string = ( ( isQuoted ? regexps.__LITERAL_KEY_exec : regexps.__BARE_KEY_exec )(lineRest) ?? iterator.throws(SyntaxError(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + iterator.where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			options.KEYS.test(leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key) || iterator.throws(Error(`Key not allowed` + iterator.where(' at ')));
		}
		if ( regexps.IS_DOT_KEY(lineRest) ) { lineRest = lineRest.replace(regexps.DOT_KEY, ''); }
		else { break; }
	}
	if ( options.disableDigit ) {
		const keys = rest.slice(0, -lineRest.length);
		( regexps.isAmazing(keys) || options.enableNull && keys==='null' ) && iterator.throws(SyntaxError(`Bad bare key disabled by xOptions.string` + iterator.where(' at ')));
	}
	if ( options.disallowEmptyKey ) {
		let index :number = lastIndex;
		do { leadingKeys[index]! || iterator.throws(SyntaxError(`Empty key is not allowed before TOML v0.5` + iterator.where(', which at '))); }
		while ( index-- );
	}
	const finalKey :string = leadingKeys[lastIndex]!;
	leadingKeys.length = lastIndex;
	return { leadingKeys, finalKey, lineRest };
};

const push = (lastArray :Array, lineRest :string) :string | S => {
	if ( lineRest[0]==='<' ) {
		const { 1: tag } = { 2: lineRest } = regexps._VALUE_PAIR_exec(lineRest) ?? iterator.throws(SyntaxError(`Bad tag ` + iterator.where(' at ')));
		options.collect(tag, lastArray, null);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case ']':
			case '':
			case '#':
				lastArray[lastArray.length] = undefined;
				return lineRest;
		}
	}
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(options.asStrings(lastArray), lastArray.length, lineRest);
		case '"':
			return assignBasicString(options.asStrings(lastArray), lastArray.length, lineRest);
		case '{':
			options.inlineTable || iterator.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + iterator.where(', which at ')));
			return equalInlineTable(options.asTables(lastArray), lastArray.length, lineRest);
		case '[':
			return equalStaticArray(options.asArrays(lastArray), lastArray.length, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = regexps.VALUE_REST_exec(lineRest) ?? iterator.throws(SyntaxError(`Bad atom value` + iterator.where(' at ')));
	if ( literal==='true' ) { options.asBooleans(lastArray)[lastArray.length] = true; }
	else if ( literal==='false' ) { options.asBooleans(lastArray)[lastArray.length] = false; }
	else if ( options.enableNull && literal==='null' ) { options.asNulls(lastArray)[lastArray.length] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				options.asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
			}
			else {
				options.moreDatetime || iterator.throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + iterator.where(', which at ')));
				options.asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			options.moreDatetime || iterator.throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + iterator.where(', which at ')));
			options.asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		options.moreDatetime || iterator.throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + iterator.where(', which at ')));
		options.asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
	}
	else {
		literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? options.asFloats(lastArray)[lastArray.length] = options.preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: options.asIntegers(lastArray)[lastArray.length] = options.preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
	return lineRest;
};

const equalStaticArray = function * (this :void, table :Table, finalKey :string, lineRest :string) :S {
	const staticArray :Array = table[finalKey] = newArray(STATICALLY);
	if ( IS_EMPTY(lineRest) ) {
		beInline(staticArray, lineRest[1]===']' ? 0 : 3);
		return lineRest.slice(lineRest.indexOf(']')).replace(regexps.SYM_WHITESPACE, '');
	}
	const start = new iterator.mark('Static Array', lineRest.length);
	let inline :null | 0 | 3 = lineRest.startsWith('[ ') || lineRest.startsWith('[\t') ? 3 : 0;
	lineRest = lineRest.replace(regexps.SYM_WHITESPACE, '');
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = null;
		lineRest = start.must().replace(regexps.PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) {
		inline===null || beInline(staticArray, inline);
		return lineRest.replace(regexps.SYM_WHITESPACE, '');
	}
	for ( ; ; ) {
		const rest :string | S = push(staticArray, lineRest);
		lineRest = typeof rest==='string' ? rest : yield rest;
		while ( !lineRest || lineRest[0]==='#' ) {
			inline = null;
			lineRest = start.must().replace(regexps.PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(regexps.SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = null;
				lineRest = start.must().replace(regexps.PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			throw iterator.throws(SyntaxError(`Unexpect character in static array item value` + iterator.where(', which is found at ')));
		}
	}
	inline===null || beInline(staticArray, inline);
	return lineRest.replace(regexps.SYM_WHITESPACE, '');
} as {
	(this :void, array :Array, finalIndex :number, lineRest :string) :S
	(this :void, table :Table, finalName :string, lineRest :string) :S
};

const equalInlineTable = function * (this :void, table :Table, finalKey :string, lineRest :string) :S {
	const inlineTable :Table = table[finalKey] = new options.Table(DIRECTLY, INLINE);
	if ( options.allowInlineTableMultilineAndTrailingCommaEvenNoComma ) {
		const start = new iterator.mark('Inline Table', lineRest.length);
		lineRest = lineRest.replace(regexps.SYM_WHITESPACE, '');
		let inline = true;
		for ( ; ; ) {
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = start.must().replace(regexps.PRE_WHITESPACE, '');
			}
			if ( lineRest[0]==='}' ) { break; }
			const forComment :ForComment = ForComment(inlineTable, lineRest);
			const rest :string | S = assign(forComment);
			lineRest = typeof rest==='string' ? rest : yield rest;
			if ( lineRest ) {
				if ( lineRest[0]==='#' ) {
					if ( options.preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1); }
					inline = false;
					do { lineRest = start.must().replace(regexps.PRE_WHITESPACE, ''); }
					while ( !lineRest || lineRest[0]==='#' );
				}
			}
			else {
				inline = false;
				do { lineRest = start.must().replace(regexps.PRE_WHITESPACE, ''); }
				while ( !lineRest || lineRest[0]==='#' );
			}
			if ( lineRest[0]===',' ) { lineRest = lineRest.replace(regexps.SYM_WHITESPACE, ''); }
		}
		inline || beInline(inlineTable, false);
	}
	else {
		lineRest = lineRest.replace(regexps.SYM_WHITESPACE, '') || iterator.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator.where(', which broken at ')));
		if ( lineRest[0]!=='}' ) {
			for ( ; ; ) {
				lineRest[0]==='#' && iterator.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator.where(', which broken at ')));
				const rest :string | S = assign(ForComment(inlineTable, lineRest));
				lineRest = ( typeof rest==='string' ? rest : yield rest ) || iterator.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator.where(', which broken at ')));
				if ( lineRest[0]==='}' ) { break; }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(regexps.SYM_WHITESPACE, '') || iterator.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator.where(', which broken at ')));
					lineRest[0]==='}' && iterator.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + iterator.where(', which was found at ')));
				}
			}
		}
	}
	return lineRest.replace(regexps.SYM_WHITESPACE, '');
} as {
	(this :void, array :Array, finalIndex :number, lineRest :string) :S
	(this :void, table :Table, finalName :string, lineRest :string) :S
};

type ForComment = Readonly<{ table :Table, finalKey :string, tag :string, lineRest :string }>;
const ForComment = (lastInlineTable :Table, lineRest :string) :ForComment => {
	const { leadingKeys, finalKey, tag } = { lineRest } = regexps.KEY_VALUE_PAIR_exec_groups(parseKeys(lineRest));
	return { table: prepareInlineTable(lastInlineTable, leadingKeys), finalKey, tag, lineRest };
};
const assign = ({ finalKey, tag, lineRest, table } :ForComment) :string | S => {
	finalKey in table && iterator.throws(Error(`Duplicate property definition` + iterator.where(' at ')));
	if ( tag ) {
		options.collect(tag, null, table, finalKey);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case '}':
			case '':
			case '#':
				table[finalKey] = undefined;
				return lineRest;
		}
	}
	switch ( lineRest && lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '{':
			options.inlineTable || iterator.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + iterator.where(', which at ')));
			return equalInlineTable(table, finalKey, lineRest);
		case '[':
			return equalStaticArray(table, finalKey, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = regexps.VALUE_REST_exec(lineRest) ?? iterator.throws(SyntaxError(`Bad atom value` + iterator.where(' at ')));
	if ( literal==='true' ) { table[finalKey] = true; }
	else if ( literal==='false' ) { table[finalKey] = false; }
	else if ( options.enableNull && literal==='null' ) { table[finalKey] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				options.moreDatetime || iterator.throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + iterator.where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			options.moreDatetime || iterator.throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + iterator.where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		options.moreDatetime || iterator.throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + iterator.where(', which at ')));
		table[finalKey] = new LocalDate(literal);
	}
	else {
		table[finalKey] = literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? options.preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: options.preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
	return lineRest;
};

export default () :Table => {
	const rootTable :Table = new options.Table;
	let lastSectionTable :Table = rootTable;
	while ( iterator.rest() ) {
		const line :string = iterator.next().replace(regexps.PRE_WHITESPACE, '');
		if ( line ) {
			if ( line[0]==='[' ) {
				const { leadingKeys, finalKey, asArrayItem, tag, lineRest } = regexps.TABLE_DEFINITION_exec_groups(line, parseKeys);
				const table :Table = prepareTable(rootTable, leadingKeys);
				if ( lineRest ) {
					lineRest[0]==='#' || iterator.throws(SyntaxError(`Unexpect charachtor after table header` + iterator.where(' at ')));
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
				options.preserveComment && lineRest && ( lastSectionTable[commentForThis] = asArrayItem ? lineRest.slice(1) : table[commentFor(finalKey)] = lineRest.slice(1) );
			}
			else if ( line[0]==='#' ) {
				regexps.__CONTROL_CHARACTER_EXCLUDE_test(line) && iterator.throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + iterator.where(', which was found at ')));
			}
			else {
				const forComment :ForComment = ForComment(lastSectionTable, line);
				let rest :string | S = assign(forComment);
				typeof rest==='string' || ( rest = x<string>(rest) );
				if ( rest ) {
					rest[0]==='#' || iterator.throws(SyntaxError(`Unexpect charachtor after key/value pair` + iterator.where(' at ')));
					if ( options.preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); }
				}
			}
		}
	}
	return rootTable;
};

type S = import('../j-lexer').default<string>;

import type { Array } from '../types/Array';
import type { Table } from '../types/Table';