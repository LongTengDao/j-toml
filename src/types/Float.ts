import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import isFinite from '.isFinite';
import Infinity from '.Infinity';
import NaN from '.NaN';

import { newRegExp, theRegExp } from '@ltd/j-regexp';
import { INTEGER_D, BAD_D } from './Integer';

import * as iterator from '../iterator';
import * as options from '../options';

const _Infinity = -Infinity;
const { test: IS_FLOAT } = /*#__PURE__*/newRegExp`
	^
	${INTEGER_D}
	(?:
		\.\d[_\d]*
		(?:[eE][-+]?\d[_\d]*)?
	|
		[eE][-+]?\d[_\d]*
	)
	$`.valueOf();
const UNDERSCORES = /_/g;
const { test: IS_ZERO } = theRegExp(/^[-+]?0(?:\.0+)?(?:[eE][-+]?0+)?$/);
const { exec: NORMALIZED } = theRegExp<1>(/^[-0]?(\d*)(?:\.(\d+))?(?:e\+?(-?\d+))?$/);
const { exec: ORIGINAL } = theRegExp<1>(/^[-+]?0?(\d*)(?:\.(\d*?)0*)?(?:[eE]\+?(-?\d+))?$/);

export const Float = (literal :string) :number => {
	if ( !IS_FLOAT(literal) || BAD_D(literal) ) {
		if ( options.sFloat ) {
			if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
			if ( literal==='-inf' ) { return _Infinity; }
			if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
		}
		throw iterator.throws(SyntaxError(`Invalid Float ${literal}` + iterator.where(' at ')));
	}
	const withoutUnderscores :string = literal.replace(UNDERSCORES, '');
	const number :number = +withoutUnderscores;
	if ( options.sError ) {
		isFinite(number) || iterator.throws(RangeError(`Float ${literal} has been as big as inf` + iterator.where(' at ')));
		number || IS_ZERO(withoutUnderscores) || iterator.throws(RangeError(`Float ${literal} has been as little as ${literal[0]==='-' ? '-' : ''}0` + iterator.where(' at ')));
		const { 1: normalized_integer, 2: normalized_fractional = '', 3: normalized_exponent = '' } = NORMALIZED(number as any)!;
		const { 1: original_integer, 2: original_fractional = '', 3: original_exponent = '' } = ORIGINAL(withoutUnderscores)!;
		original_integer + original_fractional===normalized_integer + normalized_fractional
		&&
		original_exponent as any - original_fractional.length===normalized_exponent as any - normalized_fractional.length
		||
		iterator.throws(RangeError(`Float ${literal} has lost its exact and been ${number}` + iterator.where(' at ')));
	}
	return number;
};
