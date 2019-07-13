import getPrototypeOf from '.Object.getPrototypeOf';
import create from '.Object.create';

import { NULL, create as Ordered_create } from '@ltd/j-orderify';

export type Table = NULL<any>;

export function PlainTable () :Table {
	return create(null);
}

export function OrderedTable () :Table {
	return Ordered_create(null);
}

export function isTable (value :any) :value is Table {
	return value!=null && getPrototypeOf(value)===null;
}
