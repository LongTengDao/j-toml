import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import Symbol from '.Symbol';
import Null from '.null';

import { theRegExp } from '@ltd/j-regexp';

const KEYS = /*#__PURE__*/Null<symbol>(null);
export const commentFor = (key :string) :symbol => KEYS[key] || ( KEYS[key] = Symbol(key) );
export const commentForThis :unique symbol = Symbol('this') as any;

const { test: includesNewline } = theRegExp(/\r?\n/g);
export const getCOMMENT = (table :{ readonly [keyComment :symbol] :unknown }, keyComment :symbol) :` #${string}` | `` => {
	if ( keyComment in table ) {
		const comment = table[keyComment];
		if ( typeof comment!=='string' ) { throw TypeError(`the value of comment must be a string, while "${comment===null ? 'null' : typeof comment}" type is found`); }
		if ( includesNewline(comment) ) { throw SyntaxError(`the value of comment must be a string and can not include newline`); }
		return ` #${comment}`;///
	}
	return '';
};
export const getComment = <T extends string> (table :{ readonly [Key in T] :unknown } & { readonly [keyComment :symbol] :unknown }, key :T) :` #${string}` | `` => key in KEYS ? getCOMMENT(table, KEYS[key]!) : '';
