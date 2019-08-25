import WeakSet from '.WeakSet';
import Null from '.null';
import preventExtensions from '.Object.preventExtensions';

import { NULL } from '@ltd/j-orderify';

export var Table :never;
export type Table = NULL<any>;

const tables = new WeakSet;

export const PlainTable = /*#__PURE__*/ function () {
	class Table extends Null<any> {
		constructor () {
			super();
			tables.add(this);
		}
	}
	delete Table.prototype.constructor;
	preventExtensions(Table.prototype);
	return Table;
}();

export const OrderedTable = /*#__PURE__*/ function () {
	class Table extends NULL<any> {
		constructor () {
			super();
			tables.add(this);
		}
	}
	delete Table.prototype.constructor;
	preventExtensions(Table.prototype);
	return Table;
}();

export function isTable (value :any) :value is Table {
	return tables.has(value);
}
