import SyntaxError from '.SyntaxError';
import Error from '.Error';
import Infinity from '.Infinity';
import NaN from '.NaN';
import * as iterator from '../share/iterator';
import { Datetime } from '../types/Datetime';
import { Float } from '../types/Float';
import * as options from '../share/options';
import * as RE from '../share/RE';
import { sealedInline, appendTable, parseKeys, prepareInlineTable, assignLiteralString, assignBasicString } from './on-the-spot';
import { assignInterpolationString } from './x-feature';

export default function Root () {
	const rootTable :object = new options.TableDepends;
	let lastSectionTable :object = rootTable;
	while ( iterator.rest() ) {
		const line :string = iterator.next().replace(RE.PRE_WHITESPACE, '');
		if ( line==='' ) { }
		else if ( line.startsWith('#') ) { }
		else if ( line.startsWith('[') ) {
			const { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter } = RE.TABLE_DEFINITION_exec_groups(line);
			$_asArrayItem$$===$$asArrayItem$_ || iterator.throws(SyntaxError('Square brackets of table define statement not match at '+iterator.where()));
			tagInner && tagOuter && iterator.throws(SyntaxError('Tag for table define statement can not both in and out, which at '+iterator.where()));
			lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tagOuter || tagInner);
		}
		else {
			let rest :string = assign(lastSectionTable, line);
			while ( iterator.stacks_length ) { rest = iterator.stacks_pop()(rest); }
			rest==='' || rest.startsWith('#') || iterator.throws(SyntaxError(iterator.where()));
		}
	}
	return rootTable;
};

function assign (lastInlineTable_array :object | any[], lineRest :string) :string {
	let left;
	let tagLeft;
	let tagRight;
	( { left, tagLeft, tagRight, right: lineRest } = RE.KEY_VALUE_PAIR_exec_groups(lineRest) );
	const leadingKeys :string[] = parseKeys(left);
	const finalKey :string = leadingKeys.pop();
	const table :object = prepareInlineTable(lastInlineTable_array, leadingKeys);
	finalKey in table && iterator.throws(Error('Duplicate property definition at '+iterator.where()));
	tagLeft && tagRight && iterator.throws(SyntaxError('Tag for key/value pair can not both left and right, which at '+iterator.where()));
	( tagLeft || tagRight ) && options.collect({ parent: table, key: finalKey, tag: tagLeft || tagRight });
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '`':
			return assignInterpolationString(table, finalKey, lineRest);
		case '{':
			iterator.stacks_push(lineRest => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			iterator.stacks_push(lineRest => equalInlineArray(table, finalKey, lineRest));
			return lineRest;
	}
	let literal :string;
	( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || iterator.throws(SyntaxError(iterator.where()) ));
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
			literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
				literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
					literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
						literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
							options.enableNull && literal==='null' ? null :
								options.IntegerDepends(literal);
	return lineRest;
}

function push (lastInlineTable_array :object | any[], lineRest :string) :string {
	if ( lineRest.startsWith('(') ) {
		let tag :string;
		( { 1: tag, 2: lineRest } = RE._VALUE_PAIR.exec(lineRest) || iterator.throws(SyntaxError(iterator.where()) ));
		options.collect({ array: lastInlineTable_array, index: lastInlineTable_array.length, tag });
	}
	const lastIndex :string = ''+lastInlineTable_array.length;
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
		case '"':
			return assignBasicString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
		case '`':
			return assignInterpolationString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
		case '{':
			iterator.stacks_push(lineRest => equalInlineTable(options.asTables(lastInlineTable_array), lastIndex, lineRest));
			return lineRest;
		case '[':
			iterator.stacks_push(lineRest => equalInlineArray(options.asArrays(lastInlineTable_array), lastIndex, lineRest));
			return lineRest;
	}
	let literal :string;
	( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || iterator.throws(SyntaxError(iterator.where()) ));
	if ( literal==='true' ) { options.asBooleans(lastInlineTable_array).push(true); }
	else if ( literal==='false' ) { options.asBooleans(lastInlineTable_array).push(false); }
	else if ( literal==='inf' || literal==='+inf' ) { options.asFloats(lastInlineTable_array).push(Infinity); }
	else if ( literal==='-inf' ) { options.asFloats(lastInlineTable_array).push(-Infinity); }
	else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { options.asFloats(lastInlineTable_array).push(NaN); }
	else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		options.asDatetimes(lastInlineTable_array).push(new Datetime(literal));
	}
	else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
		options.asFloats(lastInlineTable_array).push(Float(literal));
	}
	else if ( options.enableNull && literal==='null' ) { options.asNulls(lastInlineTable_array).push(null); }
	else { options.asIntegers(lastInlineTable_array).push(options.IntegerDepends(literal)); }
	return lineRest;
}

function equalInlineTable (table :object, finalKey :string, lineRest :string) :string {
	const inlineTable :object = table[finalKey] = new options.TableDepends;
	sealedInline.add(inlineTable);
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	if ( options.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start :number = iterator.mark();
		const length = iterator.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
				lineRest = assign(inlineTable, lineRest);
				if ( iterator.stacks_length>length ) {
					iterator.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }
			}
		}(lineRest);
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && iterator.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where()));
		const length = iterator.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = assign(inlineTable, lineRest);
				if ( iterator.stacks_length>length ) {
					iterator.stacks_insertBeforeLast(function inserted (lineRest) {
						//
						if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
						if ( lineRest.startsWith(',') ) {//
							lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');//
							lineRest.startsWith('}') && iterator.throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator.where()));//
						}//
						( lineRest==='' || lineRest.startsWith('#') ) && iterator.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where()));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
				if ( lineRest.startsWith(',') ) {
					lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
					lineRest.startsWith('}') && iterator.throws(SyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator.where()));
				}
				( lineRest==='' || lineRest.startsWith('#') ) && iterator.throws(SyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where()));
			}
		}(lineRest);
	}
}

function equalInlineArray (table :object, finalKey :string, lineRest :string) :string {
	const inlineArray :any[] = table[finalKey] = [];
	sealedInline.add(inlineArray);
	const start :number = iterator.mark();
	lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
	while ( lineRest==='' || lineRest.startsWith('#') ) {
		lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
	const length = iterator.stacks_length;
	return function callee (lineRest) {
		for ( ; ; ) {
			lineRest = push(inlineArray, lineRest);
			if ( iterator.stacks_length>length ) {
				iterator.stacks_insertBeforeLast(function inserted (lineRest) {
					//
					while ( lineRest==='' || lineRest.startsWith('#') ) {//
						lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');//
					}//
					if ( lineRest.startsWith(',') ) {//
						lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
					}//
					else {//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
						iterator.throws(SyntaxError(iterator.where()));//
					}//
					//
					return callee(lineRest);
				});
				return lineRest;
			}
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
				iterator.throws(SyntaxError(iterator.where()));
			}
		}
	}(lineRest);
}
