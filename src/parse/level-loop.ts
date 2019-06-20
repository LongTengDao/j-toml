import SyntaxError from '.SyntaxError';
import Error from '.Error';
import Infinity from '.Infinity';
import NaN from '.NaN';
import * as iterator$0 from '../iterator$0';
import { Table } from '../types/Table';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, OFFSET } from '../types/Datetime';
import { Integer } from '../types/Integer';
import { Float } from '../types/Float';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';
import { sealedInline, appendTable, parseKeys, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';

export default function Root () {
	const rootTable :Table = new Table;
	let lastSectionTable :Table = rootTable;
	while ( iterator$0.rest() ) {
		const line :string = iterator$0.next().replace(regexps$0.PRE_WHITESPACE, '');
		if ( line==='' ) { }
		else if ( line.startsWith('#') ) { }
		else if ( line.startsWith('[') ) {
			const { $_asArrayItem$$, keys, $$asArrayItem$_, tag } = regexps$0.TABLE_DEFINITION_exec_groups(line);
			$_asArrayItem$$===$$asArrayItem$_ || iterator$0.throws(SyntaxError(`Square brackets of Table definition statement not match at ${iterator$0.where()}`));
			lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tag);
		}
		else {
			let rest :string = assign(lastSectionTable, line);
			while ( iterator$0.stacks_length ) { rest = iterator$0.stacks_pop()(rest); }
			rest==='' || rest.startsWith('#') || iterator$0.throws(SyntaxError(iterator$0.where()));
		}
	}
	return rootTable;
};

function assign (lastInlineTable :Table, lineRest :string) :string {
	const { left, tag } = { right: lineRest } = regexps$0.KEY_VALUE_PAIR_exec_groups(lineRest);
	const leadingKeys :[string, ...string[]] = parseKeys(left);
	const finalKey :string = <string>leadingKeys.pop();
	const table :Table = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && iterator$0.throws(Error(`Duplicate property definition at ${iterator$0.where()}`));
	tag && options$0.collect({ table, key: finalKey, array: null, tag });
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '{':
			options$0.inlineTable || iterator$0.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4, which at ${iterator$0.where()}`));
			iterator$0.stacks_push((lineRest :string) :string => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push((lineRest :string) :string => equalInlineArray(table, finalKey, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = regexps$0.VALUE_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where()));
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
			if ( OFFSET.test(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
			table[finalKey] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
		table[finalKey] = new LocalDate(literal);
		return lineRest;
	}
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
				literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
					options$0.enableNull && literal==='null' ? null :
						Integer(literal);
	return lineRest;
}

function push (lastArray :any[], lineRest :string) :string {
	if ( lineRest.startsWith('<') ) {
		const { 1: tag } = { 2: lineRest } = regexps$0._VALUE_PAIR.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where()));
		options$0.collect({ table: null, array: lastArray, index: lastArray.length, tag });
	}
	const lastIndex :string = ''+lastArray.length;
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(options$0.asStrings(lastArray), lastIndex, lineRest);
		case '"':
			return assignBasicString(options$0.asStrings(lastArray), lastIndex, lineRest);
		case '{':
			options$0.inlineTable || iterator$0.throws(SyntaxError(`Inline Table is not allowed before TOML v0.4, which at ${iterator$0.where()}`));
			iterator$0.stacks_push(lineRest => equalInlineTable(options$0.asTables(lastArray), lastIndex, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push(lineRest => equalInlineArray(options$0.asArrays(lastArray), lastIndex, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = regexps$0.VALUE_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where()));
	if ( options$0.sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			options$0.asFloats(lastArray).push(Infinity);
			return lineRest;
		}
		if ( literal==='-inf' ) {
			options$0.asFloats(lastArray).push(-Infinity);
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			options$0.asFloats(lastArray).push(NaN);
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( OFFSET.test(literal) ) {
				options$0.asOffsetDateTimes(lastArray).push(new OffsetDateTime(literal));
			}
			else {
				options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
				options$0.asLocalDateTimes(lastArray).push(new LocalDateTime(literal));
			}
		}
		else {
			options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
			options$0.asLocalTimes(lastArray).push(new LocalTime(literal));
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
		options$0.asLocalDates(lastArray).push(new LocalDate(literal));
		return lineRest;
	}
	if ( literal==='true' ) { options$0.asBooleans(lastArray).push(true); }
	else if ( literal==='false' ) { options$0.asBooleans(lastArray).push(false); }
	else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
		options$0.asFloats(lastArray).push(Float(literal));
	}
	else if ( options$0.enableNull && literal==='null' ) { options$0.asNulls(lastArray).push(null); }
	else { options$0.asIntegers(lastArray).push(Integer(literal)); }
	return lineRest;
}

function equalInlineTable (table :Table, finalKey :string, lineRest :string) :string {
	const inlineTable :Table = table[finalKey] = new Table;
	sealedInline.add(inlineTable);
	lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	if ( options$0.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start :number = iterator$0.mark();
		const length = iterator$0.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator$0.must('Inline Table', start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				lineRest = assign(inlineTable, lineRest);
				if ( iterator$0.stacks_length>length ) {
					iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = iterator$0.must('Inline Table', start).replace(regexps$0.PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator$0.must('Inline Table', start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
			}
		}(lineRest);
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${iterator$0.where()}`));
		const length = iterator$0.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = assign(inlineTable, lineRest);
				if ( iterator$0.stacks_length>length ) {
					iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						if ( lineRest.startsWith('}') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						if ( lineRest.startsWith(',') ) {//
							lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');//
							lineRest.startsWith('}') && iterator$0.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma, which was found at ${iterator$0.where()}`));//
						}//
						( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${iterator$0.where()}`));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				if ( lineRest.startsWith(',') ) {
					lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
					lineRest.startsWith('}') && iterator$0.throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma, which was found at ${iterator$0.where()}`));
				}
				( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${iterator$0.where()}`));
			}
		}(lineRest);
	}
}

function equalInlineArray (table :Table, finalKey :string, lineRest :string) :string {
	const inlineArray :any[] = table[finalKey] = [];
	sealedInline.add(inlineArray);
	const start :number = iterator$0.mark();
	lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
	while ( lineRest==='' || lineRest.startsWith('#') ) {
		lineRest = iterator$0.must('Inline Array', start).replace(regexps$0.PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
	const length = iterator$0.stacks_length;
	return function callee (lineRest) {
		for ( ; ; ) {
			lineRest = push(inlineArray, lineRest);
			if ( iterator$0.stacks_length>length ) {
				iterator$0.stacks_insertBeforeLast(function inserted (lineRest) {
					//
					while ( lineRest==='' || lineRest.startsWith('#') ) {//
						lineRest = iterator$0.must('Inline Array', start).replace(regexps$0.PRE_WHITESPACE, '');//
					}//
					if ( lineRest.startsWith(',') ) {//
						lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = iterator$0.must('Inline Array', start).replace(regexps$0.PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
					}//
					else {//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }//
						iterator$0.throws(SyntaxError(iterator$0.where()));//
					}//
					//
					return callee(lineRest);
				});
				return lineRest;
			}
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = iterator$0.must('Inline Array', start).replace(regexps$0.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator$0.must('Inline Array', start).replace(regexps$0.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(']') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest.startsWith(']') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				iterator$0.throws(SyntaxError(iterator$0.where()));
			}
		}
	}(lineRest);
}
