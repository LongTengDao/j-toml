import * as RE from '../share/RE';
import * as iterator from '../share/iterator';
import * as options from '../share/options';
import { isSafeInteger, BigInt } from '../global';

export const NumberInteger = (literal :string) :number => {
	if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0; }
	( literal.charAt(0)==='0' ? RE.XOB_INTEGER : RE.INTEGER ).test(literal)
	|| iterator.throwSyntaxError('Invalid Integer '+literal+' at '+iterator.where());
	const number = +literal.replace(RE.UNDERSCORES, '');
	options.allowLonger
	|| isSafeInteger(number)
	|| iterator.throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+' meet at '+iterator.where());
	return number;
};

export const BigIntInteger = (literal :string) :bigint => {
	if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0n; }
	( literal.charAt(0)==='0' ? RE.XOB_INTEGER : RE.INTEGER ).test(literal) || iterator.throwSyntaxError('Invalid Integer '+literal+' at '+iterator.where());
	const bigInt :bigint = BigInt(literal.replace(RE.UNDERSCORES, ''));
	options.allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| iterator.throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+' meet at '+iterator.where());
	return bigInt;
};

export const DependInteger = (literal :string) => {
	const bigInt :bigint = BigIntInteger(literal);
	return options.IntegerMin<=bigInt && bigInt<=options.IntegerMax ? +( bigInt+'' ) : bigInt;
};
