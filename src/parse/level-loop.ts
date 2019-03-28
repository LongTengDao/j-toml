import SyntaxError from '.SyntaxError';
import Error from '.Error';
import Infinity from '.Infinity';
import NaN from '.NaN';
import * as iterator$0 from '../iterator$0';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, OFFSET } from '../types/Datetime';
import { Float } from '../types/Float';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';
import { sealedInline, appendTable, parseKeys, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';
import { assignInterpolationString } from './x-feature';

export default function Root () {
	const rootTable :object = new options$0.TableDepends;
	let lastSectionTable :object = rootTable;
	while ( iterator$0.rest() ) {
		const line :string = iterator$0.next().replace(regexps$0.PRE_WHITESPACE, '');
		if ( line==='' ) { }
		else if ( line.startsWith('#') ) { }
		else if ( line.startsWith('[') ) {
			const { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter } = regexps$0.TABLE_DEFINITION_exec_groups(line);
			$_asArrayItem$$===$$asArrayItem$_ || iterator$0.throws(SyntaxError('Square brackets of table define statement not match at '+iterator$0.where()));
			tagInner && tagOuter && iterator$0.throws(SyntaxError('Tag for table define statement can not both in and out, which at '+iterator$0.where()));
			lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tagOuter || tagInner);
		}
		else {
			let rest :string = assign(lastSectionTable, line);
			while ( iterator$0.stacks_length ) { rest = iterator$0.stacks_pop()(rest); }
			rest==='' || rest.startsWith('#') || iterator$0.throws(SyntaxError(iterator$0.where()));
		}
	}
	return rootTable;
};

function assign (lastInlineTable_array :object | any[], lineRest :string) :string {
	let left :string;
	let tagLeft :string;
	let tagRight :string;
	( { left, tagLeft, tagRight, right: lineRest } = regexps$0.KEY_VALUE_PAIR_exec_groups(lineRest) );
	const leadingKeys :string[] = parseKeys(left);
	const finalKey :string = leadingKeys.pop();
	const table :object = prepareInlineTable(lastInlineTable_array, leadingKeys);
	finalKey in table && iterator$0.throws(Error('Duplicate property definition at '+iterator$0.where()));
	tagLeft && options$0.collect({ table, key: finalKey, tag: tagLeft });
	tagRight && options$0.collect({ table, key: finalKey, tag: tagRight });
	switch ( lineRest[0] ) {
		case '\'':
			lineRest = assignLiteralString(table, finalKey, lineRest);
			if ( lineRest.startsWith('(') ) {
				tagRight && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tagRight, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ table, key: finalKey, tag: tagRight });
			}
			return lineRest;
		case '"':
			lineRest = assignBasicString(table, finalKey, lineRest);
			if ( lineRest.startsWith('(') ) {
				tagRight && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tagRight, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ table, key: finalKey, tag: tagRight });
			}
			return lineRest;
		case '`':
			lineRest = assignInterpolationString(table, finalKey, lineRest);
			if ( lineRest.startsWith('(') ) {
				tagRight && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tagRight, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ table, key: finalKey, tag: tagRight });
			}
			return lineRest;
		case '{':
			iterator$0.stacks_push(lineRest => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push(lineRest => equalInlineArray(table, finalKey, lineRest));
			return lineRest;
	}
	let literal :string;
	( { 1: literal, 2: lineRest } = regexps$0.VALUE_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
	if ( lineRest.startsWith('(') ) {
		tagRight && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
		( { 1: tagRight, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
		options$0.collect({ table, key: finalKey, tag: tagRight });
	}
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
						options$0.IntegerDepends(literal);
	return lineRest;
}

function push (lastInlineTable_array :object | any[], lineRest :string) :string {
	let alreadyBefore = lineRest.startsWith('(');
	let tag :string;
	if ( alreadyBefore ) {
		( { 1: tag, 2: lineRest } = regexps$0._VALUE_PAIR.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
		options$0.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length, tag });
	}
	const lastIndex :string = ''+lastInlineTable_array.length;
	switch ( lineRest[0] ) {
		case '\'':
			lineRest = assignLiteralString(options$0.asStrings(lastInlineTable_array), lastIndex, lineRest);
			if ( lineRest.startsWith('(') ) {
				alreadyBefore && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tag, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length-1, tag });
			}
			return lineRest;
		case '"':
			lineRest = assignBasicString(options$0.asStrings(lastInlineTable_array), lastIndex, lineRest);
			if ( lineRest.startsWith('(') ) {
				alreadyBefore && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tag, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length-1, tag });
			}
			return lineRest;
		case '`':
			lineRest = assignInterpolationString(options$0.asStrings(lastInlineTable_array), lastIndex, lineRest);
			if ( lineRest.startsWith('(') ) {
				alreadyBefore && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
				( { 1: tag, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
				options$0.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length-1, tag });
			}
			return lineRest;
		case '{':
			iterator$0.stacks_push(lineRest => equalInlineTable(options$0.asTables(lastInlineTable_array), lastIndex, lineRest));
			return lineRest;
		case '[':
			iterator$0.stacks_push(lineRest => equalInlineArray(options$0.asArrays(lastInlineTable_array), lastIndex, lineRest));
			return lineRest;
	}
	let literal :string;
	( { 1: literal, 2: lineRest } = regexps$0.VALUE_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
	if ( lineRest.startsWith('(') ) {
		alreadyBefore && iterator$0.throws(SyntaxError('Tag can not be placed at both side of a value, which at '+iterator$0.where()));
		( { 1: tag, 2: lineRest } = regexps$0.TAG_REST.exec(lineRest) || iterator$0.throws(SyntaxError(iterator$0.where())) );
		options$0.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length, tag });
	}
	if ( options$0.sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			options$0.asFloats(lastInlineTable_array).push(Infinity);
			return lineRest;
		}
		if ( literal==='-inf' ) {
			options$0.asFloats(lastInlineTable_array).push(-Infinity);
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			options$0.asFloats(lastInlineTable_array).push(NaN);
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( OFFSET.test(literal) ) {
				options$0.asOffsetDateTimes(lastInlineTable_array).push(new OffsetDateTime(literal));
			}
			else {
				options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
				options$0.asLocalDateTimes(lastInlineTable_array).push(new LocalDateTime(literal));
			}
		}
		else {
			options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
			options$0.asLocalTimes(lastInlineTable_array).push(new LocalTime(literal));
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		options$0.moreDatetime || iterator$0.throws(SyntaxError(iterator$0.where()));
		options$0.asLocalDates(lastInlineTable_array).push(new LocalDate(literal));
		return lineRest;
	}
	if ( literal==='true' ) { options$0.asBooleans(lastInlineTable_array).push(true); }
	else if ( literal==='false' ) { options$0.asBooleans(lastInlineTable_array).push(false); }
	else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
		options$0.asFloats(lastInlineTable_array).push(Float(literal));
	}
	else if ( options$0.enableNull && literal==='null' ) { options$0.asNulls(lastInlineTable_array).push(null); }
	else { options$0.asIntegers(lastInlineTable_array).push(options$0.IntegerDepends(literal)); }
	return lineRest;
}

function equalInlineTable (table :object, finalKey :string, lineRest :string) :string {
	const inlineTable :object = table[finalKey] = new options$0.TableDepends;
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
		( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator$0.where()));
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
							lineRest.startsWith('}') && iterator$0.throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator$0.where()));//
						}//
						( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator$0.where()));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(regexps$0.SYM_WHITESPACE, ''); }
				if ( lineRest.startsWith(',') ) {
					lineRest = lineRest.replace(regexps$0.SYM_WHITESPACE, '');
					lineRest.startsWith('}') && iterator$0.throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator$0.where()));
				}
				( lineRest==='' || lineRest.startsWith('#') ) && iterator$0.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator$0.where()));
			}
		}(lineRest);
	}
}

function equalInlineArray (table :object, finalKey :string, lineRest :string) :string {
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
