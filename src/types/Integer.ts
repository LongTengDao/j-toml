import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isSafeInteger from '.Number.isSafeInteger';
import BigInt from '.BigInt';

import { newRegExp, theRegExp } from '@ltd/j-regexp';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';

export const INTEGER_D = /[-+]?(?:0|[1-9]\d*(?:_\d+)*)/;
const IS_D_INTEGER = /*#__PURE__*/( () => newRegExp`^${INTEGER_D}$`.test )();
const IS_XOB_INTEGER = /*#__PURE__*/( () => theRegExp(/^0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/).test )();
const UNDERSCORES_SIGN = /_|^[-+]/g;

const BigIntInteger = (literal :string) :bigint => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
	|| iterator$0.throws(SyntaxError(`Invalid Integer ${literal}` + iterator$0.where(' at ')));
	let bigInt :bigint = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal[0]==='-' ) { bigInt = -bigInt; }
	options$0.allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| iterator$0.throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + iterator$0.where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal :string) :number => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
	|| iterator$0.throws(SyntaxError(`Invalid Integer ${literal}` + iterator$0.where(' at ')));
	const number = literal[0]==='-'
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	isSafeInteger(number)
	|| iterator$0.throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + iterator$0.where(' meet at ')));
	return number;
};

export const Integer = (literal :string) :bigint | number => {
	if ( options$0.usingBigInt===true ) { return BigIntInteger(literal); }
	if ( options$0.usingBigInt===false ) { return NumberInteger(literal); }
	const bigInt :bigint = BigIntInteger(literal);
	return options$0.IntegerMin<=bigInt && bigInt<=options$0.IntegerMax ? +( bigInt+'' ) : bigInt;
};
