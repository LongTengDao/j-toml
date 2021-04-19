import SyntaxError from '.SyntaxError';

import { newRegExp, theRegExp } from '@ltd/j-regexp';

import * as iterator$0 from './iterator$0';

/* nested (readable) */

const Whitespace = /[ \t]/;

export const PRE_WHITESPACE = /*#__PURE__*/( () => newRegExp`
	^${Whitespace}+` )();

export const VALUE_REST_exec = /*#__PURE__*/( () => newRegExp.s<1 | 2>`
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	(.*)
	$`.exec )();

export const LITERAL_STRING_exec = /*#__PURE__*/( () => newRegExp.s<1 | 2>`
	^
	'([^']*)'
	${Whitespace}*
	(.*)`.exec )();

const MULTI_LINE_LITERAL_STRING_0_1_2 = /*#__PURE__*/( () => newRegExp.s<1 | 2 | 3>`
	^
	(.*?)
	'''('{0,2})
	${Whitespace}*
	(.*)`.exec )();
const MULTI_LINE_LITERAL_STRING_0 = /*#__PURE__*/( () => newRegExp.s<1 | 2 | 3>`
	^
	(.*?)
	'''()
	${Whitespace}*
	(.*)`.exec )();
export
let __MULTI_LINE_LITERAL_STRING_exec :typeof MULTI_LINE_LITERAL_STRING_0;

export const SYM_WHITESPACE = /*#__PURE__*/( () => newRegExp.s`
	^
	.
	${Whitespace}*` )();


export const Tag = /[^\x00-\x1F"#'()<>[\\\]`{}\x7F]+/;

const KEY_VALUE_PAIR_exec = /*#__PURE__*/( () => newRegExp.s<2>`
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(.*)
	$`.exec )();

export const _VALUE_PAIR_exec = /*#__PURE__*/( () => newRegExp.s<1 | 2>`
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec )();

const TAG_REST_exec = /*#__PURE__*/( () => newRegExp.s<1 | 2>`
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec )();

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING_exec = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"]+|\\.|""?(?!"))/s).exec )();
export const MULTI_LINE_BASIC_STRING_exec_0 = (_ :string) :string => {
	let _0 :string = '';
	while ( _ ) {
		const $ = MULTI_LINE_BASIC_STRING_exec(_);
		if ( !$ ) { break; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
	return _0;
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[ \t]*\n[ \t\n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp;
export const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_ :string) :boolean => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');

const BASIC_STRING_TAB______ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING__________ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING_DEL______ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING_DEL_SLASH = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
let __BASIC_STRING_exec :typeof BASIC_STRING_DEL_SLASH;
export const BASIC_STRING_exec = (_2 :string) :{ 1 :string, 2 :string } => {
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ = __BASIC_STRING_exec(_2);
		if ( !$ ) {
			_2[0]==='"' || iterator$0.throws(SyntaxError(`Bad basic string` + iterator$0.where(' at ')));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
};

const DOT_KEY_exec = /*#__PURE__*/( () => theRegExp(/^[ \t]*\.[ \t]*/).exec )();
const BARE_KEY_STRICT = /*#__PURE__*/( () => theRegExp(/^[\w-]+/).exec )();
const BARE_KEY_FREE = /*#__PURE__*/( () => theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/).exec )();
let __BARE_KEY_exec :typeof BARE_KEY_FREE;
const LITERAL_KEY____ = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/).exec )();
const LITERAL_KEY_DEL = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/).exec )();
let __LITERAL_KEY_exec :typeof LITERAL_KEY_DEL;
let supportArrayOfTables :boolean;

const getKeys = (_ :string) :string => {
	let keys :string = '';
	for ( ; ; ) {
		if ( _[0]==='"' ) {
			_ = _.slice(1);
			let key :string = '"';
			let $ :{ 0 :string } | null;
			while ( ( $ = __BASIC_STRING_exec(_) ) ) {
				_ = _.slice($[0].length);
				key += $[0];
			}
			_[0]==='"' || iterator$0.throws(SyntaxError(`Bad basic string key` + iterator$0.where(' at ')));
			_ = _.slice(1);
			keys += key + '"';
		}
		else {
			const key :string = ( ( _.startsWith('\'') ? __LITERAL_KEY_exec : __BARE_KEY_exec )(_) ?? iterator$0.throws(SyntaxError(`Bad ${_.startsWith('\'') ? 'literal string' : 'bare'} key` + iterator$0.where(' at '))) )[0];
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
		supportArrayOfTables || iterator$0.throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2` + iterator$0.where(', which at ')));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys :string = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_[0]===']' || iterator$0.throws(SyntaxError(`Table header is not closed` + iterator$0.where(', which is found at ')));
	const $$asArrayItem$_ :boolean = _[1]===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag :string;
	if ( _[0]==='<' ) { ( { 1: tag, 2: _ } = TAG_REST_exec(_) ?? iterator$0.throws(SyntaxError(`Bad tag` + iterator$0.where(' at '))) ); }
	else { tag = ''; }
	!_ || _[0]==='#' || iterator$0.throws(SyntaxError(`Unexpect charachtor after table header` + iterator$0.where(' at ')));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
};

export const KEY_VALUE_PAIR_exec_groups = (_ :string) :{ left :string, tag :string, right :string } => {
	const left :string = getKeys(_);
	const { 1: tag = '', 2: right } = KEY_VALUE_PAIR_exec(_.slice(left.length)) ?? iterator$0.throws(SyntaxError(`Keys must equal something` + iterator$0.where(', but missing at ')));
	tag || right && right[0]!=='#' || iterator$0.throws(SyntaxError(`Value can not be missing after euqal sign` + iterator$0.where(', which is found at ')));
	return { left, tag, right };
};

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/).test )();
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F]/).test )();
export
let __CONTROL_CHARACTER_EXCLUDE_test :(this :void, string :string) => boolean;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
export
let __KEYS :RegExp;

export const switchRegExp = (specificationVersion :number) :void => {
	switch ( specificationVersion ) {
		case 1.0:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING_exec = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING_exec = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING_exec = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING_exec = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			__KEYS = KEYS_FREE;
			supportArrayOfTables = false;
	}
};
