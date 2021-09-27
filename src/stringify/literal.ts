import WeakSet from '.WeakSet';
import set_has from '.WeakSet.prototype.has';
import set_add from '.WeakSet.prototype.add';

const LITERAL = new WeakSet;

export const isLiteral = /*#__PURE__*/set_has.bind(LITERAL) as (this :void, value :READONLY.Value) => value is READONLY.Literal;

export const beLiteral = /*#__PURE__*/set_add.bind(LITERAL) as (this :void, value :READONLY.Literal) => object;

export const literal = (literal :string | TemplateStringsArray, ...chars :string[]) :READONLY.Literal => {
	if ( typeof literal!=='string' ) {
		let index = chars.length;
		if ( index ) {
			const { raw } = literal;
			literal = raw[index]!;
			while ( index ) { chars[--index] += raw[index]!; }
			literal = chars.join('') + literal;
		}
		else { literal = literal.raw[0]!; }
	}
	const lines = literal.split('\n') as [ string, ...string[] ];
	beLiteral(lines);
	return lines;
};

import type * as READONLY from './readonly';