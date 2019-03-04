import { parseInt, fromCodePoint } from '../global';
import * as iterator from '../share/iterator';
import * as options from '../share/options';
import * as RE from '../share/RE';

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };

type p = string | undefined;
type btnfr = 'b' | 'b' | 'n' | 'f' | 'r' | undefined;

const unEscapeSingleLine = (match :string, p1 :'"' | undefined, p2 :btnfr, p3 :p, p4 :p) :string => {
	if ( p1 ) { return p1; }
	if ( p2 ) { return ESCAPE_ALIAS[p2]; }
	const codePoint :number = parseInt(p3 || <string>p4, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throwRangeError('Invalid Unicode Scalar '+( p3 ? '\\u'+p3 : '\\U'+p4 )+' at '+iterator.where());
	return fromCodePoint(codePoint);
};

const unEscapeMultiLine = (match :string, p1 :'\n' | undefined, p2 :'"', p3 :btnfr, p4 :p, p5 :p) :string => {
	if ( match==='\n' ) { return options.useWhatToJoinMultiLineString; }
	if ( p1 ) {
		p1.includes('\n')
		|| iterator.throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see '+iterator.where());
		return '';
	}
	if ( p2 ) { return p2; }
	if ( p3 ) { return ESCAPE_ALIAS[p3]; }
	const codePoint :number = parseInt(p4 || <string>p5, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throwRangeError('Invalid Unicode Scalar '+( p4 ? '\\u'+p4 : '\\U'+p5 )+' at '+iterator.where());
	return fromCodePoint(codePoint);
};

export const BasicString = (literal :string) :string => literal.replace(RE.ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

export const MultiLineBasicString = (literal :string) :string => literal.replace(RE.ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
