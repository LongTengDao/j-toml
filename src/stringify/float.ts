import test from '.RegExp.prototype.test';
import is from '.Object.is';
import Infinity from '.Infinity';

const _Infinity = -Infinity;
const INTEGER_LIKE = /*#__PURE__*/test.bind(/^-?\d+$/);
const ensureFloat = (literal :string) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

export const float = (value :number) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan';
