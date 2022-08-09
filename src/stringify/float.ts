import is from '.Object.is';
import Infinity from '.Infinity';
import DataView from '.DataView';
import Uint8Array from '.Uint8Array';

import { theRegExp } from '@ltd/j-regexp';

const _Infinity = -Infinity;
const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal :string) => INTEGER_LIKE(literal) ? literal + '.0' : literal;
const uint8Array = new Uint8Array(8);
const dataView = new DataView(uint8Array.buffer);
const is_NaN = (value :number) :boolean => {
	dataView.setFloat64(0, value);
	return uint8Array[0]===0xFF;
};

export const float = (value :number) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : is_NaN(value) ? '-nan' : 'nan';
