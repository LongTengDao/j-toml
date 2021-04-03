import Error from '.Error';
import SyntaxError from '.SyntaxError';
import Infinity from '.Infinity';
import NaN from '.NaN';
import undefined from '.undefined';

import { theRegExp } from '@ltd/j-regexp';

import * as iterator$0 from '../iterator$0';
import { INLINE, DIRECTLY } from '../types/Table';
import { newArray, STATICALLY } from '../types/Array';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, OFFSET$ } from '../types/Datetime';
import { Integer } from '../types/Integer';
import { Float } from '../types/Float';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';
import { appendTable, parseKeys, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';

const IS_OFFSET$ = theRegExp(OFFSET$).test;

const push = (lastArray :Array, lineRest :string) :string => {
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
			iterator$0.stacks_push(lineRest => equalInlineTable(options$0.asTables(lastArray), lastArray.length, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push(lineRest => equalStaticArray(options$0.asArrays(lastArray), lastArray.length, lineRest));
			return lineRest;
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

const equalStaticArray = ( (table :Table, finalKey :string, lineRest :string) :string => {
	const staticArray :Array = table[finalKey] = newArray(STATICALLY);
	const start = iterator$0.mark('Inline Array');
	lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	while ( !lineRest || lineRest[0]==='#' ) {
		lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
	const length = iterator$0.stacks_length;
	return function callee (lineRest) {
		for ( ; ; ) {
			lineRest = push(staticArray, lineRest);
			if ( iterator$0.stacks_length>length ) {
				iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
					//
					while ( !lineRest || lineRest[0]==='#' ) {//
						lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');//
					}//
					if ( lineRest[0]===',' ) {//
						lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');//
						while ( !lineRest || lineRest[0]==='#' ) {//
							lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');//
						}//
						if ( lineRest[0]===']' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
					}//
					else {//
						if ( lineRest[0]===']' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						iterator$0.throws(SyntaxError(`Unexpect character after static array item value` + iterator$0.where(', which is found at ')));//
					}//
					//
					return callee(lineRest);
				});
				return lineRest;
			}
			while ( !lineRest || lineRest[0]==='#' ) {
				lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===',' ) {
				lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest[0]===']' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest[0]===']' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				iterator$0.throws(SyntaxError(`Unexpect character in static array item value` + iterator$0.where(', which is found at ')));
			}
		}
	}(lineRest);
} ) as {
	(array :Array, finalIndex :number, lineRest :string) :string
	(table :Table, finalName :string, lineRest :string) :string
};

const equalInlineTable = ( (table :Table, finalKey :string, lineRest :string) :string => {
	const inlineTable :Table = table[finalKey] = new options$0.Table(DIRECTLY, INLINE);
	if ( options$0.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start = iterator$0.mark('Inline Table');
		lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
		const length = iterator$0.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest[0]==='}' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				lineRest = assign(inlineTable, lineRest);
				if ( iterator$0.stacks_length>length ) {
					iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						while ( !lineRest || lineRest[0]==='#' ) {//
							lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');//
						}//
						if ( lineRest[0]===',' ) { lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = iterator$0.must(start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest[0]===',' ) { lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
			}
		}(lineRest);
	}
	else {
		lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
		if ( lineRest[0]==='}' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
		lineRest && lineRest[0]!=='#' || iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
		const length = iterator$0.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = assign(inlineTable, lineRest);
				if ( iterator$0.stacks_length>length ) {
					iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						if ( lineRest[0]==='}' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						if ( lineRest[0]===',' ) {//
							lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');//
							lineRest[0]==='}' && iterator$0.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + iterator$0.where(', which was found at ')));//
						}//
						( !lineRest || lineRest[0]==='#' ) && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest[0]==='}' ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
					lineRest[0]==='}' && iterator$0.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + iterator$0.where(', which was found at ')));
				}
				( !lineRest || lineRest[0]==='#' ) && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line` + iterator$0.where(', which broken at ')));
			}
		}(lineRest);
	}
} ) as {
	(array :Array, finalIndex :number, lineRest :string) :string
	(table :Table, finalName :string, lineRest :string) :string
};

const assign = (lastInlineTable :Table, lineRest :string) :string => {
	const { left, tag } = { right: lineRest } = regexps$0.KEY_VALUE_PAIR_exec_groups(lineRest);
	const leadingKeys :string[] = parseKeys(left);
	const finalKey :string = leadingKeys[leadingKeys.length - 1]!;
	--leadingKeys.length;
	const table :Table = prepareInlineTable(lastInlineTable, leadingKeys);
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
			iterator$0.stacks_push((lineRest :string) :string => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push((lineRest :string) :string => equalStaticArray(table, finalKey, lineRest));
			return lineRest;
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

export { Root as default };
const Root = () :Table => {
	const rootTable :Table = new options$0.Table;
	let lastSectionTable :Table = rootTable;
	while ( iterator$0.rest() ) {
		const line :string = iterator$0.next().replace(regexps$0.PRE_WHITESPACE, '');
		if ( line ) {
			if ( line[0]==='[' ) {
				const { $_asArrayItem$$, keys, $$asArrayItem$_, tag } = regexps$0.TABLE_DEFINITION_exec_groups(line);
				$_asArrayItem$$===$$asArrayItem$_ || iterator$0.throws(SyntaxError(`Square brackets of Table definition statement not match` + iterator$0.where(' at ')));
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tag);
			}
			else if ( line[0]==='#' ) {
				regexps$0.__CONTROL_CHARACTER_EXCLUDE_test(line) && iterator$0.throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + iterator$0.where(', which was found at ')));
			}
			else {
				let rest :string = assign(lastSectionTable, line);
				while ( iterator$0.stacks_length ) { rest = iterator$0.stacks_pop()(rest); }
				rest && rest[0]!=='#' && iterator$0.throws(SyntaxError(`Unexpect charachtor after key/value pair` + iterator$0.where(' at ')));
			}
		}
	}
	return rootTable;
};

import type { Array } from '../types/Array';
import type { Table } from '../types/Table';
