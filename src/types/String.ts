import RangeError from '.RangeError';
import parseInt from '.parseInt';
import fromCharCode from '.String.fromCharCode';
import fromCodePoint from '.String.fromCodePoint';

import * as iterator$0 from '../iterator$0';

const ESCAPED_IN_SINGLE_LINE = /[^\\]+|\\(?:[\\"btnfr/]|u.{4}|U.{8})/gs;
const ESCAPED_IN_MULTI_LINE = /[^\n\\]+|\n|\\(?:[\t ]*\n[\t\n ]*|[\\"btnfr/]|u.{4}|U.{8})/gs;

export const BasicString = (literal :string) :string => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_SINGLE_LINE)!;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index]!;
		if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode :number = parseInt(part.slice(2), 16);
					0xD7FF<charCode && charCode<0xE000
					&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${part}` + iterator$0.where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint :number = parseInt(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${part}` + iterator$0.where(' at ')));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};

export const MultilineBasicString = (literal :string, useWhatToJoinMultilineString :string, n :number) :string => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_MULTI_LINE)!;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index]!;
		if ( part==='\n' ) {
			++n;
			parts[index] = useWhatToJoinMultilineString;
		}
		else if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\n':
				case ' ':
				case '\t':
					for ( let i = 0; i = part.indexOf('\n', i) + 1; ) { ++n; }
					parts[index] = '';
					break;
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode :number = parseInt(part.slice(2), 16);
					0xD7FF<charCode && charCode<0xE000
					&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${part}` + iterator$0.where(' at ', iterator$0.lineIndex + n)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint :number = parseInt(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& iterator$0.throws(RangeError(`Invalid Unicode Scalar ${part}` + iterator$0.where(' at ', iterator$0.lineIndex + n)));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};
