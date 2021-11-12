import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import { newRegExp, theRegExp } from '@ltd/j-regexp';
import { INTEGER_D, BAD_D } from './Integer';

import * as iterator from '../iterator';
import * as options from '../options';

const IS_FLOAT = /*#__PURE__*/( () => newRegExp`
	^
	${INTEGER_D}
	(?:
		\.\d[_\d]*
		(?:[eE][-+]?\d[_\d]*)?
	|
		[eE][-+]?\d[_\d]*
	)
	$`.test )();
const UNDERSCORES = /_/g;
const IS_ZERO = /*#__PURE__*/( () => theRegExp(/^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0+)?$/).test )();

export const Float = (literal :string) :number => {
	if ( !IS_FLOAT(literal) || BAD_D(literal) ) {
		//if ( options.sFloat ) {
		//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
		//	if ( literal==='-inf' ) { return -Infinity; }
		//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
		//}
		throw iterator.throws(SyntaxError(`Invalid Float ${literal}` + iterator.where(' at ')));
	}
	const number = +literal.replace(UNDERSCORES, '');
	if ( options.sError ) {
		isFinite(number) || iterator.throws(RangeError(`Float has been as big as inf, like ${literal}` + iterator.where(' at ')));
		number || IS_ZERO(literal) || iterator.throws(RangeError(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + iterator.where(' at ')));
	}
	return number;
};
