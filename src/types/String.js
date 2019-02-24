import { parseInt, fromCodePoint } from '../global.js';
import * as iterator from '../share/iterator.js';
import * as options from '../share/options.js';
import * as RE from '../share/RE.js';

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };

const unEscapeSingleLine = ($0, $1, $2, $3, $4) => {
	if ( $1 ) { return $1; }
	if ( $2 ) { return ESCAPE_ALIAS[$2]; }
	const codePoint = parseInt($3 || $4, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throwRangeError('Invalid Unicode Scalar '+( $3 ? '\\u'+$3 : '\\U'+$4 )+' at '+iterator.where());
	return fromCodePoint(codePoint);
};

const unEscapeMultiLine = ($0, $1, $2, $3, $4, $5) => {
	if ( $0==='\n' ) { return options.useWhatToJoinMultiLineString; }
	if ( $1 ) {
		$1.includes('\n')
		|| iterator.throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see '+iterator.where());
		return '';
	}
	if ( $2 ) { return $2; }
	if ( $3 ) { return ESCAPE_ALIAS[$3]; }
	const codePoint = parseInt($4 || $5, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& iterator.throwRangeError('Invalid Unicode Scalar '+( $4 ? '\\u'+$4 : '\\U'+$5 )+' at '+iterator.where());
	return fromCodePoint(codePoint);
};

export const BasicString = literal => literal.replace(RE.ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

export const MultiLineBasicString = literal => literal.replace(RE.ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
