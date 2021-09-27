import Error from '.Error';
import SyntaxError from '.SyntaxError';
import Infinity from '.Infinity';
import NaN from '.NaN';
import undefined from '.undefined';

import { theRegExp } from '@ltd/j-regexp';

import { x } from '../j-lexer';///

import * as iterator$0 from '../iterator$0';
import { INLINE, DIRECTLY } from '../types/Table';
import { newArray, STATICALLY } from '../types/Array';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, OFFSET$ } from '../types/Datetime';
import { BasicString } from '../types/String';
import { Integer } from '../types/Integer';
import { Float } from '../types/Float';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';
import { appendTable, prepareTable, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';

import { commentFor } from '../stringify/comment';
import { beInline } from '../stringify/non-atom';

const IS_OFFSET$ = /*#__PURE__*/( () => theRegExp(OFFSET$).test )();

const parseKeys = (lineRest :string) :{ leadingKeys :string[], finalKey :string, lineRest :string } => {
	const leadingKeys :string[] = [];
	let lastIndex :number = -1;
	for ( ; ; ) {
		lineRest || iterator$0.throws(SyntaxError(`Empty bare key` + iterator$0.where(' at ')));
		if ( lineRest[0]==='"' ) {
			const key :string = regexps$0.BASIC_STRING_exec_1(lineRest);
			lineRest = lineRest.slice(2 + key.length);
			leadingKeys[++lastIndex] = BasicString(key);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key :string = ( ( isQuoted ? regexps$0.__LITERAL_KEY_exec : regexps$0.__BARE_KEY_exec )(lineRest) ?? iterator$0.throws(SyntaxError(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + iterator$0.where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key;
		}
		if ( regexps$0.IS_DOT_KEY(lineRest) ) { lineRest = lineRest.replace(regexps$0.DOT_KEY, ''); }
		else { break; }
	}
	if ( options$0.disallowEmptyKey ) {
		let index :number = lastIndex;
		do { leadingKeys[index]! || iterator$0.throws(SyntaxError(`Empty key is not allowed before TOML v0.5` + iterator$0.where(', which at '))); }
		while ( index-- );
	}
	const finalKey :string = leadingKeys[lastIndex]!;
	leadingKeys.length = lastIndex;
	return { leadingKeys, finalKey, lineRest };
};

const push = (lastArray :Array, lineRest :string) :string | S => {
	if ( lineRest[0]==='<' ) {
		const { 1: tag } = { 2: lineRest } = regexps$0._VALUE_PAIR_exec(lineRest) ?? iterator$0.throws(SyntaxError(`Bad tag ` + iterator$0.where(' at ')));
		options$0.collect(tag, lastArray, null);
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
			return assignLiteralString(options$0.asStrings(lastArray), lastArray.length, lineRest);
		case '"':
			return assignBasicString(options$0.asStrings(lastArray), lastArray.length, lineRest);
		case '{':
			options$0.inlineTable || iterator$0.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + iterator$0.where(', which at ')));
			return equalInlineTable(options$0.asTables(lastArray), lastArray.length, lineRest);
		case '[':
			return equalStaticArray(options$0.asArrays(lastArray), lastArray.length, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = regexps$0.VALUE_REST_exec(lineRest) ?? iterator$0.throws(SyntaxError(`Bad atom value` + iterator$0.where(' at ')));
	if ( options$0.sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			options$0.asFloats(lastArray)[lastArray.length] = Infinity;
			return lineRest;
		}
		if ( literal==='-inf' ) {
			options$0.asFloats(lastArray)[lastArray.length] = -Infinity;
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			options$0.asFloats(lastArray)[lastArray.length] = NaN;
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				options$0.asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
			}
			else {
				options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
				options$0.asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
			options$0.asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
		options$0.asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
		return lineRest;
	}
	literal==='true' ? options$0.asBooleans(lastArray)[lastArray.length] = true : literal==='false' ? options$0.asBooleans(lastArray)[lastArray.length] = false :
		literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? options$0.asFloats(lastArray)[lastArray.length] = Float(literal) :
			options$0.enableNull && literal==='null' ? options$0.asNulls(lastArray)[lastArray.length] = null :
				options$0.asIntegers(lastArray)[lastArray.length] = Integer(literal);
	return lineRest;
};

const equalStaticArray = function * (this :void, table :Table, finalKey :string, lineRest :string) :S {
	const staticArray :Array = table[finalKey] = newArray(STATICALLY);
	const start = iterator$0.mark('Inline Array');
	lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	let inline = true;
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = false;
		lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) {
		inline && beInline(staticArray, true);
		return lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	}
	for ( ; ; ) {
		const rest :string | S = push(staticArray, lineRest);
		lineRest = typeof rest==='string' ? rest : yield rest;
		while ( !lineRest || lineRest[0]==='#' ) {
			inline = false;
			lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			iterator$0.throws(SyntaxError(`Unexpect character in static array item value` + iterator$0.where(', which is found at ')));
		}
	}
	inline && beInline(staticArray, true);
	return lineRest.replace(regexps$0.SYM_WHITESPACE, '');
} as {
	(this :void, array :Array, finalIndex :number, lineRest :string) :S
	(this :void, table :Table, finalName :string, lineRest :string) :S
};

const equalInlineTable = function * (this :void, table :Table, finalKey :string, lineRest :string) :S {
	const inlineTable :Table = table[finalKey] = new options$0.Table(DIRECTLY, INLINE);
	lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	if ( options$0.allowInlineTableMultilineAndTrailingCommaEvenNoComma ) {
		const start = iterator$0.mark('Inline Table');
		let inline = true;
		for ( ; ; ) {
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
			}
			if ( lineRest[0]==='}' ) { break; }
			const forComment :ForComment = ForComment(inlineTable, lineRest);
			const rest :string | S = assign(forComment);
			lineRest = typeof rest==='string' ? rest : yield rest;
			if ( lineRest ) {
				if ( lineRest[0]==='#' ) {
					if ( options$0.preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1); }
					inline = false;
					do { lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, ''); }
					while ( !lineRest || lineRest[0]==='#' );
				}
			}
			else {
				inline = false;
				do { lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, ''); }
				while ( !lineRest || lineRest[0]==='#' );
			}
			if ( lineRest[0]===',' ) { lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
		}
		inline || beInline(inlineTable, false);
	}
	else {
		lineRest || iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
		if ( lineRest[0]!=='}' ) {
			for ( ; ; ) {
				lineRest[0]==='#' && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
				const rest :string | S = assign(ForComment(inlineTable, lineRest));
				lineRest = ( typeof rest==='string' ? rest : yield rest ) || iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
				if ( lineRest[0]==='}' ) { break; }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '') || iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
					lineRest[0]==='}' && iterator$0.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + iterator$0.where(', which was found at ')));
				}
			}
		}
	}
	return lineRest.replace(regexps$0.SYM_WHITESPACE, '');
} as {
	(this :void, array :Array, finalIndex :number, lineRest :string) :S
	(this :void, table :Table, finalName :string, lineRest :string) :S
};

type ForComment = Readonly<{ table :Table, finalKey :string, tag :string, lineRest :string }>;
const ForComment = (lastInlineTable :Table, lineRest :string) :ForComment => {
	const { leadingKeys, finalKey, tag } = { lineRest } = regexps$0.KEY_VALUE_PAIR_exec_groups(parseKeys(lineRest));
	return { table: prepareInlineTable(lastInlineTable, leadingKeys), finalKey, tag, lineRest };
};
const assign = ({ finalKey, tag, lineRest, table } :ForComment) :string | S => {
	finalKey in table && iterator$0.throws(Error(`Duplicate property definition` + iterator$0.where(' at ')));
	if ( tag ) {
		options$0.collect(tag, null, table, finalKey);
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
			options$0.inlineTable || iterator$0.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + iterator$0.where(', which at ')));
			return equalInlineTable(table, finalKey, lineRest);
		case '[':
			return equalStaticArray(table, finalKey, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = regexps$0.VALUE_REST_exec(lineRest) ?? iterator$0.throws(SyntaxError(`Bad atom value` + iterator$0.where(' at ')));
	if ( options$0.sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			table[finalKey] = Infinity;
			return lineRest;
		}
		if ( literal==='-inf' ) {
			table[finalKey] = -Infinity;
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			table[finalKey] = NaN;
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		options$0.moreDatetime || iterator$0.throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + iterator$0.where(', which at ')));
		table[finalKey] = new LocalDate(literal);
		return lineRest;
	}
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
			literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
				options$0.enableNull && literal==='null' ? null :
					Integer(literal);
	return lineRest;
};

export default () :Table => {
	const rootTable :Table = new options$0.Table;
	let lastSectionTable :Table = rootTable;
	while ( iterator$0.rest() ) {
		const line :string = iterator$0.next().replace(regexps$0.PRE_WHITESPACE, '');
		if ( line ) {
			if ( line[0]==='[' ) {
				const { leadingKeys, finalKey, asArrayItem, tag, lineRest } = regexps$0.TABLE_DEFINITION_exec_groups(line, parseKeys);
				const table :Table = prepareTable(rootTable, leadingKeys);
				if ( lineRest ) {
					if ( lineRest[0]==='#' ) { if ( options$0.preserveComment && !asArrayItem ) { table[commentFor(finalKey)] = lineRest.slice(1); } }
					else { iterator$0.throws(SyntaxError(`Unexpect charachtor after table header` + iterator$0.where(' at '))); }
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
			}
			else if ( line[0]==='#' ) {
				regexps$0.__CONTROL_CHARACTER_EXCLUDE_test(line) && iterator$0.throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + iterator$0.where(', which was found at ')));
			}
			else {
				const forComment :ForComment = ForComment(lastSectionTable, line);
				let rest :string | S = assign(forComment);
				typeof rest==='string' || ( rest = x<string>(rest) );
				if ( rest ) {
					if ( rest[0]==='#' ) { if ( options$0.preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); } }
					else { iterator$0.throws(SyntaxError(`Unexpect charachtor after key/value pair` + iterator$0.where(' at '))); }
				}
			}
		}
	}
	return rootTable;
};

type S = import('../j-lexer').default<string>;

import type { Array } from '../types/Array';
import type { Table } from '../types/Table';