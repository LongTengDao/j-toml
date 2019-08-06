import getPrototypeOf from '.Object.getPrototypeOf';
import create from '.Object.create';

import * as Ordered from '@ltd/j-orderify';

export var Table :never;
export type Table = Ordered.NULL<any>;

export function PlainTable () :Table {
	return create(null);
}

export function OrderedTable () :Table {
	return Ordered.create(null);
}

export function isTable (value :any) :value is Table {
	return value!=null && getPrototypeOf(value)===null;
}
