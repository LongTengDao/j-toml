import SyntaxError from '.SyntaxError';
import * as iterator from '../share/iterator';
import * as options from '../share/options';
import * as RE from '../share/RE';

const DELIMITER_CHECK = /[^`]/;

export function assignInterpolationString (table :object, finalKey :string, delimiter :string) :string {
	options.enableInterpolationString || iterator.throws(SyntaxError(iterator.where()));
	DELIMITER_CHECK.test(delimiter) && iterator.throws(SyntaxError('Interpolation String opening tag incorrect at '+iterator.where()));
	let string :string;
	let lineRest :string;
	{
		const literals :string[] = [];
		for ( const start :number = iterator.mark(); ; ) {
			const literal :string = iterator.must('Interpolation String', start);
			if ( literal.startsWith(delimiter) ) {
				lineRest = literal.slice(delimiter.length).replace(RE.PRE_WHITESPACE, '');
				break;
			}
			literals.push(literal);
		}
		string = literals.join('\n');
	}
	table[finalKey] = string;
	return lineRest;
}
