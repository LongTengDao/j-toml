import RangeError from '.RangeError';
import parseInt from '.parseInt';
import fromCodePoint from '.String.fromCodePoint';
import * as iterator from '../share/iterator';
import * as options from '../share/options';

const ESCAPE_ALIAS = { '\\': '\\', '"': '"', b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };

const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"btnfr])|u(.{4})|U(.{8}))/g;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?: *(\n)[ \n]*|([\\"btnfr])|u([^]{4})|U([^]{8}))/g;

type __btnfr = '\\' | '"' | 'b' | 'b' | 'n' | 'f' | 'r' | undefined;

const unEscapeSingleLine = (match :string, p1 :__btnfr, p2 :string | undefined, p3 :string | undefined) :string => {
	if ( p1 ) { return ESCAPE_ALIAS[p1]; }
	const codePoint :number = parseInt(p2 || <string>p3, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throws(RangeError('Invalid Unicode Scalar '+( p2 ? '\\u'+p2 : '\\U'+p3 )+' at '+iterator.where()));
	return fromCodePoint(codePoint);
};

const unEscapeMultiLine = (match :string, p1 :'\n' | undefined, p2 :__btnfr, p3 :string | undefined, p4 :string | undefined) :string => {
	if ( match==='\n' ) { return options.useWhatToJoinMultiLineString; }
	if ( p1 ) { return ''; }
	if ( p2 ) { return ESCAPE_ALIAS[p2]; }
	const codePoint :number = parseInt(p3 || <string>p4, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throws(RangeError('Invalid Unicode Scalar '+( p3 ? '\\u'+p3 : '\\U'+p4 )+' at '+iterator.where()));
	return fromCodePoint(codePoint);
};

export const BasicString = (literal :string) :string => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

export const MultiLineBasicString = (literal :string) :string => literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
