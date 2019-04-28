import { newRegExp } from '@ltd/j-regexp';

import SyntaxError from '.SyntaxError';

import * as options$0 from './options$0';
import * as iterator$0 from './iterator$0';

/* nested (readable) */

const Whitespace = /[ \t]/;

export const PRE_WHITESPACE = newRegExp`
	^${Whitespace}+`;

export const VALUE_REST = newRegExp`
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	([^]*)
	$`;

export const LITERAL_STRING = newRegExp`
	^
	'([^']*)'
	${Whitespace}*
	([^]*)`;

export const MULTI_LINE_LITERAL_STRING = newRegExp`
	^
	([^]*?)
	'''
	${Whitespace}*
	([^]*)`;

export const SYM_WHITESPACE = newRegExp`
	^
	[^]
	${Whitespace}*`;


const Tag = /[^<>\\"'`\r\n\u2028\u2029]+/;

export const KEY_VALUE_PAIR = newRegExp`
	^
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(
		[^ \t#]
		[^]*
	)
	$`;

export const _VALUE_PAIR = newRegExp`
	^
	<(${Tag})>
	${Whitespace}*
	([^ \t#][^]*)
	$`;

export const TAG_REST = newRegExp`
	^
	<(${Tag})>
	${Whitespace}*
	([^]*)
	$`;

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING :RegExp = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
export function MULTI_LINE_BASIC_STRING_exec_0 (_ :string) :string {
	for ( let _0 :string = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ :RegExpExecArray | null = MULTI_LINE_BASIC_STRING.exec(_);
		if ( $===null ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER :RegExp = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
export function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_ :string) :boolean {
	return _.replace(options$0.ctrl7F ? ESCAPED_EXCLUDE_CONTROL_CHARACTER : ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER, '')==='';
}

const BASIC_STRING :RegExp = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_LESSER :RegExp = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
export function BASIC_STRING_exec (_2 :string) :{ 1 :string, 2 :string } {
	const basic_string = options$0.ctrl7F ? BASIC_STRING : BASIC_STRING_LESSER;
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ :RegExpExecArray | null = basic_string.exec(_2);
		if ( $===null ) {
			_2.startsWith('"') || iterator$0.throws(SyntaxError(iterator$0.where()));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const BARE_KEY :RegExp = /^[\w-]+/;
const LITERAL_KEY :RegExp = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const LITERAL_KEY_LESSER :RegExp = /^'[^'\x00-\x08\x0B-\x1F]*'/;
const DOT_KEY :RegExp = /^[ \t]*\.[ \t]*/;

export function TABLE_DEFINITION_exec_groups (_ :string) :{ $_asArrayItem$$ :boolean, keys :string, tagInner :string, $$asArrayItem$_ :boolean, tagOuter :string } {
	const $_asArrayItem$$ :boolean = _.charAt(1)==='[';
	_ = _.slice($_asArrayItem$$ ? 2 : 1).replace(PRE_WHITESPACE, '');
	const keys :string = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	let tagInner :string = '';
	if ( _.startsWith('<') ) { ( { 1: tagInner, 2: _ } = TAG_REST.exec(_) || iterator$0.throws(SyntaxError(iterator$0.where())) ); }
	_.startsWith(']') || iterator$0.throws(SyntaxError(iterator$0.where()));
	const $$asArrayItem$_ :boolean = _.charAt(1)===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tagOuter :string = '';
	if ( _.startsWith('<') ) { ( { 1: tagOuter, 2: _ } = TAG_REST.exec(_) || iterator$0.throws(SyntaxError(iterator$0.where())) ); }
	_==='' || _.startsWith('#') || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter };
}

export function KEY_VALUE_PAIR_exec_groups (_ :string) :{ left :string, tagLeft :string, tagRight :string, right :string } {
	const _1 :string = getKeys(_);
	const $ :RegExpExecArray = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { left: _1, tagLeft: $[1] || '', tagRight: $[2] || '', right: $[3] };
}

function getKeys (_ :string) :string {
	const literal_key = options$0.ctrl7F ? LITERAL_KEY : LITERAL_KEY_LESSER;
	for ( let keys :string = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key :string = '"'; ; ) {
				const $ :RegExpExecArray | null = BASIC_STRING.exec(_);
				if ( $===null ) {
					_.startsWith('"') || iterator$0.throws(SyntaxError(iterator$0.where()));
					_ = _.slice(1);
					keys += key+'"';
					break;
				}
				_ = _.slice($[0].length);
				key += $[0];
			}
		}
		else {
			const key :string = ( ( _.startsWith('\'') ? literal_key : BARE_KEY ).exec(_) || iterator$0.throws(SyntaxError(iterator$0.where())) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ :RegExpExecArray | null = DOT_KEY.exec(_);
		if ( $===null ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}