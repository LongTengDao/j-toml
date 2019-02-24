import * as RE from '../share/RE.js';
//import { Infinity, NaN } from '../global.js';
import * as iterator from '../share/iterator.js';

export const Float = literal => {
	if ( RE.FLOAT.test(literal) && RE.FLOAT_NOT_INTEGER.test(literal) ) {
		return +literal.replace(RE.UNDERSCORES, '');
		//const number = +literal.replace(RE.UNDERSCORES, '');
		//isFinite(number) || iterator.throwRangeError('Float can not be as big as Infinity, like '+literal+' at '+where());
		//return number;
	}
	//if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//if ( literal==='-inf' ) { return -Infinity; }
	//if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	iterator.throwSyntaxError('Invalid Float '+literal+' at '+iterator.where());
};
