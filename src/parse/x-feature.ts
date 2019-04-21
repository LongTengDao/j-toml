import SyntaxError from '.SyntaxError';
import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';
import * as regexps$0 from '../regexps$0';
import { Table } from '../types/Table';

const DELIMITER_CHECK = /[^`]/;

export function assignInterpolationString (table :Table, finalKey :string, delimiter :string) :string {
	options$0.enableInterpolationString || iterator$0.throws(SyntaxError(iterator$0.where()));
	DELIMITER_CHECK.test(delimiter) && iterator$0.throws(SyntaxError('Interpolation String opening tag incorrect at '+iterator$0.where()));
	let string :string;
	let lineRest :string;
	{
		const literals :string[] = [];
		for ( const start :number = iterator$0.mark(); ; ) {
			const literal :string = iterator$0.must('Interpolation String', start);
			if ( literal.startsWith(delimiter) ) {
				lineRest = literal.slice(delimiter.length).replace(regexps$0.PRE_WHITESPACE, '');
				break;
			}
			literals.push(literal);
		}
		string = literals.join('\n');
	}
	table[finalKey] = string;
	return lineRest;
}
