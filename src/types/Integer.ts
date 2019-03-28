import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isSafeInteger from '.Number.isSafeInteger';
import BigInt from '.BigInt';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';

const INTEGER = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)$/;
const XOB_INTEGER = /^\+?0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/;
const UNDERSCORES_SIGN = /_|^[-+]/g;

export const NumberInteger = (literal :string) :number => {
	INTEGER.test(literal)
	|| options$0.xob && XOB_INTEGER.test(literal)
	|| iterator$0.throws(SyntaxError('Invalid Integer '+literal+' at '+iterator$0.where()));
	const number = literal.startsWith('-')
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	options$0.allowLonger
	|| isSafeInteger(number)
	|| iterator$0.throws(RangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+' meet at '+iterator$0.where()));
	return number;
};

export const BigIntInteger = (literal :string) :bigint => {
	INTEGER.test(literal)
	|| options$0.xob && XOB_INTEGER.test(literal)
	|| iterator$0.throws(SyntaxError('Invalid Integer '+literal+' at '+iterator$0.where()));
	let bigInt :bigint = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal.startsWith('-') ) { bigInt = -bigInt; }
	options$0.allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| iterator$0.throws(RangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+' meet at '+iterator$0.where()));
	return bigInt;
};

export const DependInteger = (literal :string) => {
	const bigInt :bigint = BigIntInteger(literal);
	return options$0.IntegerMin<=bigInt && bigInt<=options$0.IntegerMax ? +( bigInt+'' ) : bigInt;
};
