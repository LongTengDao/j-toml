import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import * as options$0 from '../options$0';
import * as iterator$0 from '../iterator$0';

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
const UNDERSCORES = /_/g;

export const Float = (literal :string) :number => {
	if ( FLOAT.test(literal) && FLOAT_NOT_INTEGER.test(literal) ) {
		if ( options$0.sFloat ) { return +literal.replace(UNDERSCORES, ''); }
		else {
			const number = +literal.replace(UNDERSCORES, '');
			isFinite(number) || iterator$0.throws(RangeError('Float can not be as big as Infinity before TOML v0.5, like '+literal+' at '+iterator$0.where()));
			return number;
		}
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throw iterator$0.throws(SyntaxError('Invalid Float '+literal+' at '+iterator$0.where()));
};
