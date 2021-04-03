import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import { newRegExp, theRegExp } from '@ltd/j-regexp';
import { INTEGER_D } from './Integer';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';

const IS_FLOAT = newRegExp`
	^
	${INTEGER_D}
	(?=[.eE])
	(?:\.\d+(?:_\d+)*)?
	(?:[eE][-+]?\d+(?:_\d+)*)?
	$`.test;
const UNDERSCORES = /_/g;
const IS_ZERO = theRegExp(/^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0+)?$/).test;

export const Float = (literal :string) :number => {
	if ( IS_FLOAT(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		if ( options$0.sError ) {
			isFinite(number) || iterator$0.throws(RangeError(`Float has been as big as inf, like ${literal}` + iterator$0.where(' at ')));
			number || IS_ZERO(literal) || iterator$0.throws(RangeError(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + iterator$0.where(' at ')));
		}
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	iterator$0.throws(SyntaxError(`Invalid Float ${literal}` + iterator$0.where(' at ')));
};
