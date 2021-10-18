import TypeError from '.TypeError';
import Symbol from '.Symbol';
import Null from '.null';

const KEYS = /*#__PURE__*/Null(null) as { [key :string] :symbol, [sym :symbol] :string };
const Sym = (key :string) => {
	const sym = Symbol(key);
	KEYS[sym] = key;
	return KEYS[key] = sym;
};
export const commentFor = (key :string) :symbol => KEYS[key] ?? Sym(key);

const NEWLINE = /\r?\n/g;
export const getComment = <T extends string> (table :{ [Key in T] :unknown } & { [keyComment :symbol] :unknown }, key :T) :` #${string}` | `` => {
	if ( key in KEYS && KEYS[key]! in table ) {
		const comment = table[KEYS[key]!]!;
		if ( typeof comment==='string' ) { return ' #' + comment.replace(NEWLINE, '') as ` #${string}`; }///
		throw TypeError(`the value of commentKey must be "string" type, while "${comment===null ? 'null' : typeof comment}" is found`);
	}
	return '';
};
