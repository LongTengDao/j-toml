import { newRegExp } from '@ltd/j-regexp';

/* types */

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = newRegExp`
	\d\d\d\d-
	(?:
		(?:0[13578]|1[02])-${_31_}
	|
		(?:0[469]|11)-${_30_}
	|
		02-${_29_}
	)`;

const T = /[T ]/;

const HMS = newRegExp`
	${_23_}:${_59_}:${_59_}(?:\.\d+)?`;

const Z = newRegExp`
		Z
	|
		[+-]${_23_}:${_59_}`;

export const DATETIME = newRegExp`
	^
	(?:
		${HMS}
	|
		(${YMD})
		(?:
			(${T})
			(${HMS})
			(${Z})?
		)?
	)
	$`;

/* parse */

const Whitespace = /[ \t]/;

export const PRE_WHITESPACE = newRegExp`
	^${Whitespace}+`;

export const KEYS = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;

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
	'([^'\x00-\x08\x0B-\x1F\x7F]*)'
	${Whitespace}*
	([^]*)`;

export const MULTI_LINE_LITERAL_STRING = newRegExp`
	^
	([^]*?)
	'''
	${Whitespace}*
	([^]*)`;

export const CONTROL_CHARACTER_EXCLUDE_TAB = /[\x00-\x08\x0B-\x1F\x7F]/;

export const ESCAPED_IN_MULTI_LINE = /\n|\\(?:([ \n]+)|([\\"])|([btnfr])|u([^]{4})|U([^]{8}))/g;

export const SYM_WHITESPACE = newRegExp`
	^
	[^]
	${Whitespace}*`;


const Tag = /[^()\\"'`\r\n\u2028\u2029]+/;

export const KEY_VALUE_PAIR = newRegExp`
	^
	${Whitespace}*
	(?:
		\((${Tag})\)
		${Whitespace}*
	)?
	=
	${Whitespace}*
	(?:
		\((${Tag})\)
		${Whitespace}*
	)?
	(
		[^ \t#]
		[^]*
	)
	$`;

export const _VALUE_PAIR = newRegExp`
	^
	\((${Tag})\)
	${Whitespace}*
	([^ \t#][^]*)
	$`;

export const TAG_REST = newRegExp`
	^
	\((${Tag})\)
	${Whitespace}*
	([^]*)
	$`;
