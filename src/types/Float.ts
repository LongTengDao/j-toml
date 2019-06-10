import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import { newRegExp } from '@ltd/j-regexp';
import { INTEGER_D } from './Integer';

import * as iterator$0 from '../iterator$0';

const FLOAT = newRegExp`
	^
	${INTEGER_D}
	(?=[.eE])
	(?:\.\d+(?:_\d+)*)?
	(?:[eE]${INTEGER_D})?
	$
`;
const UNDERSCORES = /_/g;

export const Float = (literal :string) :number => {
	if ( FLOAT.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		/*options\$0.sFloat || */isFinite(number) || iterator$0.throws(RangeError('Float has been as big as Infinity, like '+literal+' at '+iterator$0.where()));
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throw iterator$0.throws(SyntaxError('Invalid Float '+literal+' at '+iterator$0.where()));
};
