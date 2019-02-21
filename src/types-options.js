import { fromCodePoint, parseInt } from './global.js';
import { throwRangeError, throwSyntaxError, where } from './iterator.js';
import * as options from './options.js';
import * as RE from './RE.js';

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };

const unEscapeSingleLine = ($0, $1, $2, $3, $4) => {
	if ( $1 ) { return $1; }
	if ( $2 ) { return ESCAPE_ALIAS[$2]; }
	const codePoint = parseInt($3 || $4, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint ) && throwRangeError('Invalid Unicode Scalar '+( $3 ? '\\u'+$3 : '\\U'+$4 )+' at '+where());
	return fromCodePoint(codePoint);
};

const unEscapeMultiLine = ($0, $1, $2, $3, $4, $5) => {
	if ( $0==='\n' ) { return options.useWhatToJoinMultiLineString; }
	if ( $1 ) {
		$1.includes('\n') || throwSyntaxError('Back slash leading whitespaces can only appear at the end of a line, but see '+where());
		return '';
	}
	return unEscapeSingleLine('', $2, $3, $4, $5);
};

export const SingleLine = literal => literal.replace(RE.ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

export const MultiLine = literal => literal.replace(RE.ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
