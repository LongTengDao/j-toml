import is from '.Object.is';
import Infinity from '.Infinity';

import { theRegExp } from '@ltd/j-regexp';

const _Infinity = -Infinity;
const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal :string) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

export const float = (value :number) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan';
