import { newRegExp } from '@ltd/j-regexp';

import SyntaxError from '.SyntaxError';

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

const KEY_VALUE_PAIR = newRegExp`
	^
	${Whitespace}*
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

const TAG_REST = newRegExp`
	^
	<(${Tag})>
	${Whitespace}*
	([^]*)
	$`;

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
export function MULTI_LINE_BASIC_STRING_exec_0 (_ :string) :string {
	for ( let _0 :string = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ = MULTI_LINE_BASIC_STRING.exec(_);
		if ( !$ ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[ \t]*\n[ \t\n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp;
export function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_ :string) :boolean {
	return _.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '')==='';
}

const BASIC_STRING_TAB______ = /^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING__________ = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_DEL______ = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_DEL_SLASH = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
let __BASIC_STRING :RegExp;
export function BASIC_STRING_exec (_2 :string) :{ 1 :string, 2 :string } {
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ = __BASIC_STRING.exec(_2);
		if ( !$ ) {
			_2.startsWith('"') || iterator$0.throws(SyntaxError(iterator$0.where()));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const DOT_KEY = /^[ \t]*\.[ \t]*/;
const BARE_KEY_STRICT = /^[\w-]+/;
const BARE_KEY_FREE = /^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/;
let __BARE_KEY :RegExp;
const LITERAL_KEY____ = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const LITERAL_KEY_DEL = /^'[^'\x00-\x08\x0B-\x1F]*'/;
let __LITERAL_KEY :RegExp;
let supportArrayOfTables :boolean;

export function TABLE_DEFINITION_exec_groups (_ :string) :{ $_asArrayItem$$ :boolean, keys :string, $$asArrayItem$_ :boolean, tag :string } {
	const $_asArrayItem$$ :boolean = _.charAt(1)==='[';
	if ( $_asArrayItem$$ ) {
		supportArrayOfTables || iterator$0.throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2, which at ${iterator$0.where()}`));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys :string = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_.startsWith(']') || iterator$0.throws(SyntaxError(iterator$0.where()));
	const $$asArrayItem$_ :boolean = _.charAt(1)===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag :string;
	if ( _.startsWith('<') ) { ( { 1: tag, 2: _ } = TAG_REST.exec(_) || iterator$0.throws(SyntaxError(iterator$0.where())) ); }
	else { tag = ''; }
	_==='' || _.startsWith('#') || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
}

export function KEY_VALUE_PAIR_exec_groups (_ :string) :{ left :string, tag :string, right :string } {
	const _1 :string = getKeys(_);
	const $ :RegExpExecArray = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { left: _1, tag: $[1] || '', right: $[2] };
}

function getKeys (_ :string) :string {
	for ( let keys :string = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key :string = '"'; ; ) {
				const $ = __BASIC_STRING.exec(_);
				if ( !$ ) {
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
			const key :string = ( ( _.startsWith('\'') ? __LITERAL_KEY : __BARE_KEY ).exec(_) || iterator$0.throws(SyntaxError(iterator$0.where())) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ = DOT_KEY.exec(_);
		if ( !$ ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /[\x00-\x08\x0B-\x1F]/;
export
let __CONTROL_CHARACTER_EXCLUDE :RegExp;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
export
let __KEYS :RegExp;

export function switchRegExp (specificationVersion :number) :void {
	switch ( specificationVersion ) {
		case 1.0:
			__LITERAL_KEY = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING = BASIC_STRING_TAB______;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__LITERAL_KEY = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING = BASIC_STRING__________;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__LITERAL_KEY = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING = BASIC_STRING_DEL______;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__LITERAL_KEY = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING = BASIC_STRING_DEL_SLASH;
			__BARE_KEY = BARE_KEY_FREE;
			__KEYS = KEYS_FREE;
			supportArrayOfTables = false;
	}
}
