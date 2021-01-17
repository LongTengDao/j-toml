import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
//import Infinity from '.Infinity';
//import NaN from '.NaN';

import { newRegExp } from '@ltd/j-regexp';
import { INTEGER_D } from './Integer';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';

const FLOAT = newRegExp`
	^
	${INTEGER_D}
	(?=[.eE])
	(?:\.\d+(?:_\d+)*)?
	(?:[eE][-+]?\d+(?:_\d+)*)?
	$`;
const UNDERSCORES = /_/g;
const ZERO = /^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0+)?$/;

export const Float = (literal :string) :number => {
	if ( FLOAT.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		if ( options$0.sError ) {
			isFinite(number) || iterator$0.throws(RangeError(`Float has been as big as inf, like ${literal} at ${iterator$0.where()}`));
			number || ZERO.test(literal) || iterator$0.throws(RangeError(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal} at ${iterator$0.where()}`));
		}
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	iterator$0.throws(SyntaxError(`Invalid Float ${literal} at ${iterator$0.where()}`));
};
