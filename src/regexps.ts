import SyntaxError from '.SyntaxError';

import { newRegExp, theRegExp } from '@ltd/j-regexp';

import * as iterator from './iterator';

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
let __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;

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

const MULTI_LINE_BASIC_STRING = /*#__PURE__*/theRegExp(/(?:[^\\"]+|\\.|""?(?!")){1,10}/sy);/// .?
export const MULTI_LINE_BASIC_STRING_exec_0 = (_ :string) :string => {
	let lastIndex :number = MULTI_LINE_BASIC_STRING.lastIndex = 0;
	while ( MULTI_LINE_BASIC_STRING.test(_) ) { lastIndex = MULTI_LINE_BASIC_STRING.lastIndex; }
	return _.slice(0, lastIndex);
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab \<ws>newline
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// not \<ws>newline
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
export const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_ :string) :boolean => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');/// op?

const BASIC_STRING_TAB______ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);
const BASIC_STRING__________ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);/// Tab
const BASIC_STRING_DEL______ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);/// Tab
const BASIC_STRING_DEL_SLASH = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);/// Tab
let __BASIC_STRING = BASIC_STRING_DEL_SLASH;
export const BASIC_STRING_exec_1 = (line :string) :string => {
	let lastIndex :number = __BASIC_STRING.lastIndex = 1;
	while ( __BASIC_STRING.test(line) ) { lastIndex = __BASIC_STRING.lastIndex; }
	lastIndex!==line.length && line[lastIndex]==='"' || iterator.throws(SyntaxError(`Bad basic string` + iterator.where(' at ')));
	return line.slice(1, lastIndex);
};

export
const IS_DOT_KEY = /*#__PURE__*/( () => theRegExp(/^[ \t]*\./).test )();
export
const DOT_KEY = /^[ \t]*\.[ \t]*/;
const BARE_KEY_STRICT = /*#__PURE__*/( () => theRegExp(/^[\w-]+/).exec )();
const BARE_KEY_FREE = /*#__PURE__*/( () => theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/).exec )();
export
let __BARE_KEY_exec = BARE_KEY_FREE;
const LITERAL_KEY____ = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/).exec )();
const LITERAL_KEY_DEL = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/).exec )();
export
let __LITERAL_KEY_exec = LITERAL_KEY_DEL;
let supportArrayOfTables = true;

export const TABLE_DEFINITION_exec_groups = (lineRest :string, parseKeys :(lineRest :string) => { leadingKeys :string[], finalKey :string, lineRest :string }) :{ leadingKeys :string[], finalKey :string, asArrayItem :boolean, tag :string, lineRest :string } => {
	const asArrayItem :boolean = lineRest[1]==='[';
	if ( asArrayItem ) {
		supportArrayOfTables || iterator.throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2` + iterator.where(', which at ')));
		lineRest = lineRest.slice(2);
	}
	else { lineRest = lineRest.slice(1); }
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	const { leadingKeys, finalKey } = { lineRest } = parseKeys(lineRest);
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	lineRest && lineRest[0]===']' || iterator.throws(SyntaxError(`Table header is not closed` + iterator.where(', which is found at ')));
	( lineRest.length>1 ? lineRest[1]===']'===asArrayItem : !asArrayItem ) || iterator.throws(SyntaxError(`Square brackets of Table definition statement not match` + iterator.where(' at ')));
	lineRest = lineRest.slice(asArrayItem ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag :string;
	if ( lineRest && lineRest[0]==='<' ) { ( { 1: tag, 2: lineRest } = TAG_REST_exec(lineRest) ?? iterator.throws(SyntaxError(`Bad tag` + iterator.where(' at '))) ); }
	else { tag = ''; }
	return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
};

export const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest } :{ leadingKeys :string[], finalKey :string, lineRest :string }) :{ leadingKeys :string[], finalKey :string, tag :string, lineRest :string } => {
	const { 1: tag = '' } = { 2: lineRest } = KEY_VALUE_PAIR_exec(lineRest) ?? iterator.throws(SyntaxError(`Keys must equal something` + iterator.where(', but missing at ')));
	tag || lineRest && lineRest[0]!=='#' || iterator.throws(SyntaxError(`Value can not be missing after euqal sign` + iterator.where(', which is found at ')));
	return { leadingKeys, finalKey, tag, lineRest };
};

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/).test )();
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F]/).test )();
export
let __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;

export const switchRegExp = (specificationVersion :number) :void => {
	switch ( specificationVersion ) {
		case 1.0:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			supportArrayOfTables = false;
	}
};

const NUM = /*#__PURE__*/( () => newRegExp`
	(?:
		0
		(?:
			b[01][_01]*
		|
			o[0-7][_0-7]*
		|
			x[\dA-Fa-f][_\dA-Fa-f]*
		|
			(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
		)
	|
		[1-9][_\d]*
		(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
	|
		inf
	|
		nan
	)
` )();
const IS_AMAZING = /*#__PURE__*/( () => newRegExp`
	^(?:
		-?${NUM}
		(?:-${NUM})*
	|
		true
	|
		false
	)$
`.test )();
const BAD_DXOB = /*#__PURE__*/( () => newRegExp`_(?![\dA-Fa-f])`.test )();
export const isAmazing = (keys :string) :boolean => IS_AMAZING(keys) && !BAD_DXOB(keys);
