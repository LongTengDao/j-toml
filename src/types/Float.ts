import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import * as iterator$0 from '../iterator$0';

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?=[.eE])(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const UNDERSCORES = /_/g;

export const Float = (literal :string) :number => {
	if ( FLOAT.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		isFinite(number) || iterator$0.throws(RangeError('Float has been as big as Infinity, like '+literal+' at '+iterator$0.where()));
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throw iterator$0.throws(SyntaxError('Invalid Float '+literal+' at '+iterator$0.where()));
};
