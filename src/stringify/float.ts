import Float64Array from '.Float64Array';
import Uint8Array from '.Uint8Array';
import Infinity from '.Infinity';
import NaN from '.NaN';
import is from '.Object.is';

import { theRegExp } from '@ltd/j-regexp';

const _Infinity = -Infinity;

const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal :string) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float64Array = new Float64Array([ NaN ]);
const uint8Array = new Uint8Array(float64Array.buffer);
const NaN_7 = uint8Array[7]!;

export const float = NaN_7===new Uint8Array(new Float64Array([ -NaN ]).buffer)[7]!
	? (value :number) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan'
	: (value :number) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : ( float64Array[0] = value, uint8Array[7] )===NaN_7 ? 'nan' : '-nan';
