import * as RE from '../share/RE';
//import { Infinity, NaN } from '../global';
import * as iterator from '../share/iterator';

export const Float = (literal :string) :number => {
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
