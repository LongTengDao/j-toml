import RangeError from '.RangeError';
import parseInt from '.parseInt';
import fromCodePoint from '.String.fromCodePoint';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r', '"': '"', '/': '/', '\\': '\\' };

const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"btnfr/])|u(.{4})|U(.{8}))/gs;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?: *(\n)[ \n]*|([\\"btnfr/])|u(.{4})|U(.{8}))/gs;

const unEscapeSingleLine = (
	match :string,
	p1? :keyof typeof ESCAPE_ALIAS,
	p2? :string,
	p3? :string
) :string => {
	if ( p1 ) { return ESCAPE_ALIAS[p1]; }
	const codePoint :number = parseInt(p2 ?? p3!, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${p2 ? '\\u' + p2 : '\\U' + p3}` + iterator$0.where(' at ')));
	return fromCodePoint(codePoint);
};

let n = 0;

const unEscapeMultiLine = (
	match :string,
	p1 :'\n' | undefined,
	p2 :keyof typeof ESCAPE_ALIAS | undefined,
	p3 :string | undefined,
	p4 :string | undefined
) :string => {
	if ( match==='\n' ) {
		++n;
		return options$0.useWhatToJoinMultiLineString;
	}
	if ( p1 ) { return ''; }
	if ( p2 ) { return ESCAPE_ALIAS[p2]; }
	const codePoint :number = parseInt(p3 ?? p4!, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${p3 ? '\\u' + p3 : '\\U' + p4}` + iterator$0.where(' at ', iterator$0.lineIndex + n)));
	return fromCodePoint(codePoint);
};

export const BasicString = (literal :string) :string => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

export const MultiLineBasicString = (literal :string, skipped :boolean) :string => {
	n = skipped ? 1 : 0;
	return literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
};
