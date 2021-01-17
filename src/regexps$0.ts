import SyntaxError from '.SyntaxError';

import { newRegExp } from '@ltd/j-regexp';

import * as iterator$0 from './iterator$0';

export type Exec<T extends [ string, ...( string | undefined )[] ] = [ string ]> = (this :void, string :string) => T | null;
export const Exec = <T extends [ string, ...( string | undefined )[] ] = [ string ]> (regExp :RegExp) => regExp.exec.bind(regExp) as Exec<T>;

/* nested (readable) */

const Whitespace = /[ \t]/;

export const PRE_WHITESPACE = newRegExp`
	^${Whitespace}+`;

export const VALUE_REST_exec = newRegExp.s!`
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	(.*)
	$`.exec as Exec<[ string, string, string ]>;

export const LITERAL_STRING_exec = newRegExp.s!`
	^
	'([^']*)'
	${Whitespace}*
	(.*)`.exec as Exec<[ string, string, string ]>;

const MULTI_LINE_LITERAL_STRING_0_1_2 = newRegExp.s!`
	^
	(.*?)
	'''('{0,2})
	${Whitespace}*
	(.*)`.exec as Exec<[ string, string, string, string ]>;
const MULTI_LINE_LITERAL_STRING_0 = newRegExp.s!`
	^
	(.*?)
	'''()
	${Whitespace}*
	(.*)`.exec as Exec<[ string, string, string, string ]>;
export let MULTI_LINE_LITERAL_STRING_exec :Exec<[ string, string, string, string ]>;

export const SYM_WHITESPACE = newRegExp.s!`
	^
	.
	${Whitespace}*`;


const Tag = /[^<>\\"'`\r\n\u2028\u2029]+/;

const KEY_VALUE_PAIR_exec = newRegExp.s!`
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(.*)
	$`.exec as Exec<[ string, string | undefined, string ]>;

export const _VALUE_PAIR_exec = newRegExp.s!`
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec as Exec<[ string, string, string ]>;

const TAG_REST_exec = newRegExp.s!`
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec as Exec<[ string, string, string ]>;

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING_exec = Exec(/^(?:[^\\"]+|\\.|""?(?!"))/s);
export const MULTI_LINE_BASIC_STRING_exec_0 = (_ :string) :string => {
	for ( let _0 :string = ''; ; ) {
		if ( !_ ) { return _0; }
		const $ = MULTI_LINE_BASIC_STRING_exec(_);
		if ( !$ ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[ \t]*\n[ \t\n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp;
export const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_ :string) :boolean => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');

const BASIC_STRING_TAB______ = Exec(/^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/);
const BASIC_STRING__________ = Exec(/^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/);
const BASIC_STRING_DEL______ = Exec(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/);
const BASIC_STRING_DEL_SLASH = Exec(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/);
let __BASIC_STRING_exec :Exec;
export const BASIC_STRING_exec = (_2 :string) :{ 1 :string, 2 :string } => {
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ = __BASIC_STRING_exec(_2);
		if ( !$ ) {
			_2[0]==='"' || iterator$0.throws(SyntaxError(iterator$0.where()));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
};

const DOT_KEY_exec = Exec(/^[ \t]*\.[ \t]*/);
const BARE_KEY_STRICT = Exec(/^[\w-]+/);
const BARE_KEY_FREE = Exec(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/);
let __BARE_KEY_exec :Exec;
const LITERAL_KEY____ = Exec(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/);
const LITERAL_KEY_DEL = Exec(/^'[^'\x00-\x08\x0B-\x1F]*'/);
let __LITERAL_KEY_exec :Exec;
let supportArrayOfTables :boolean;

const getKeys = (_ :string) :string => {
	let keys :string = '';
	for ( ; ; ) {
		if ( _[0]==='"' ) {
			_ = _.slice(1);
			let key :string = '"';
			let $ :[ string ] | null;
			while ( ( $ = __BASIC_STRING_exec(_) ) ) {
				_ = _.slice($[0].length);
				key += $[0];
			}
			_[0]==='"' || iterator$0.throws(SyntaxError(iterator$0.where()));
			_ = _.slice(1);
			keys += key + '"';
		}
		else {
			const key :string = ( ( _.startsWith('\'') ? __LITERAL_KEY_exec : __BARE_KEY_exec )(_) ?? iterator$0.throws(SyntaxError(iterator$0.where())) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ = DOT_KEY_exec(_);
		if ( !$ ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
};

export const TABLE_DEFINITION_exec_groups = (_ :string) :{ $_asArrayItem$$ :boolean, keys :string, $$asArrayItem$_ :boolean, tag :string } => {
	const $_asArrayItem$$ :boolean = _[1]==='[';
	if ( $_asArrayItem$$ ) {
		supportArrayOfTables || iterator$0.throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2, which at ${iterator$0.where()}`));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys :string = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_[0]===']' || iterator$0.throws(SyntaxError(iterator$0.where()));
	const $$asArrayItem$_ :boolean = _[1]===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag :string;
	if ( _[0]==='<' ) { ( { 1: tag, 2: _ } = TAG_REST_exec(_) ?? iterator$0.throws(SyntaxError(iterator$0.where())) ); }
	else { tag = ''; }
	!_ || _[0]==='#' || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
};

export const KEY_VALUE_PAIR_exec_groups = (_ :string) :{ left :string, tag :string, right :string } => {
	const left :string = getKeys(_);
	const { 1: tag = '', 2: right } = KEY_VALUE_PAIR_exec(_.slice(left.length)) ?? iterator$0.throws(SyntaxError(iterator$0.where()));
	tag || right && right[0]!=='#' || iterator$0.throws(SyntaxError(iterator$0.where()));
	return { left, tag, right };
};

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /[\x00-\x08\x0B-\x1F]/;
export let __CONTROL_CHARACTER_EXCLUDE :RegExp;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
export let __KEYS :RegExp;

export const switchRegExp = (specificationVersion :number) :void => {
	switch ( specificationVersion ) {
		case 1.0:
			MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING_exec = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING_exec = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING_exec = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING_exec = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			__KEYS = KEYS_FREE;
			supportArrayOfTables = false;
	}
};
