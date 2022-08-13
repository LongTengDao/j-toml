import Float64Array from '.Float64Array';
import Uint8Array from '.Uint8Array';
import Infinity from '.Infinity';
import NaN from '.NaN';
import is from '.Object.is';

import { theRegExp } from '@ltd/j-regexp';

const _Infinity = -Infinity;

const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal :string) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float64Array = new Float64Array([ -NaN ]);
const uint8Array = new Uint8Array(float64Array.buffer);
const is_NaN = uint8Array[7]===0xFF
	? (value :number) :boolean => {
		float64Array[0] = value;
		return uint8Array[7]===0b1_1111111;
	}
	: () => false;

export const float = (value :number) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : is_NaN(value) ? '-nan' : 'nan';
