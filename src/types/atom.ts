import Symbol from '.Symbol';
import Object from '.Object';

export const _literal :unique symbol = Symbol('_literal') as any;

export const LiteralObject = <Literal extends string | readonly [ string, ...string[] ]> (literal :Literal, value :number | bigint | string | object) => {
	const object = Object(value) as { [_literal] :Literal };
	object[_literal] = literal;
	return object;
};
