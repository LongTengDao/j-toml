import Array from '.Array';
import fromCharCode from '.String.fromCharCode';
import fromEntries from '.Object.fromEntries';
import Null from '.null';

import { theRegExp } from '@ltd/j-regexp';

const ESCAPED = /*#__PURE__*/Null<string>({
	.../*#__PURE__*/fromEntries(/*#__PURE__*/[ ...Array(0x20) ].map((_, charCode) => [ fromCharCode(charCode), '\\u' + charCode.toString(16).toUpperCase().padStart(4, '0') ])),
	'\b': '\\b',
	'\t': '\\t',
	'\n': '\\n',
	'\f': '\\f',
	'\r': '\\r',
	'"': '\\"',
	'"""': '""\\"',
	'\\': '\\\\',
	'\x7F': '\\u007F',
});

const { test: NEED_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F'\x7F]/);
const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
const { test: NEED_ESCAPE } = theRegExp(/^[\x00-\x08\x0A-\x1F"\\\x7F]/);
export const singlelineString = (value :string) :`"${string}"` | `'${string}'` => {
	if ( NEED_BASIC(value) ) {
		const parts = value.match(BY_ESCAPE)!;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index]!) ) { parts[index] = ESCAPED[parts[index]!]!; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `'${value}'`;
};
export const singlelineBasicString = (value :string) :`"${string}"` => {
	if ( value ) {
		const parts = value.match(BY_ESCAPE)!;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index]!) ) { parts[index] = ESCAPED[parts[index]!]!; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `""`;
};

const { test: NEED_MULTILINE_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F\x7F]|'''/);
export const { test: multilineNeedBasic } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]|'''/);
const { test: REAL_MULTILINE_ESCAPE } = theRegExp(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/);
const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
const { test: NEED_MULTILINE_ESCAPE } = theRegExp(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/);
const escape_multiline = (lines :string[], lineIndex :number) => {
	const line = lines[lineIndex]!;
	if ( REAL_MULTILINE_ESCAPE(line) ) {
		const parts = line.match(BY_MULTILINE_ESCAPE)!;
		let index = parts.length;
		do { if ( NEED_MULTILINE_ESCAPE(parts[--index]!) ) { parts[index] = ESCAPED[parts[index]!]!; } }
		while ( index );
		lines[lineIndex] = parts.join('');
	}
};

export type Lines = [ string, ...string[], string ];
export const Lines = (lines :readonly string[]) :Lines => ( lines = [ '', ...lines ] as Lines ).length===1 ? [ '', '' ] : lines as Lines;

export const multilineString = (lines :Lines) :[ `"""`, ...string[], `${string}"""` ] | [ `'''`, ...string[], `${string}'''` ] => {
	const lastIndex = lines.length - 1;
	let index = lastIndex;
	do { if ( NEED_MULTILINE_BASIC(lines[index]!) ) { break; } }
	while ( --index );
	if ( index ) {
		index = lastIndex;
		escape_multiline(lines, index);
		lines[index] += lines[0] = '"""';
		while ( --index ) { escape_multiline(lines, index); }
	}
	else{ lines[lastIndex] += lines[0] = '\'\'\''; }
	return lines as [ `"""`, ...string[], `${string}"""` ] | [ `'''`, ...string[], `${string}'''` ];
};

export const multilineBasicString = (lines :Lines) :[ `"""`, ...string[], `${string}"""` ] => {
	let index = lines.length - 1;
	escape_multiline(lines, index);
	lines[index] += lines[0] = '"""';
	while ( --index ) { escape_multiline(lines, index); }
	return lines as [ `"""`, ...string[], `${string}"""` ];
};

export const multilineLiteralString = (lines :Lines) :[ `'''`, ...string[], `${string}'''` ] => {
	lines[lines.length - 1] += lines[0] = '\'\'\'';
	return lines as [ `'''`, ...string[], `${string}'''` ];
};
