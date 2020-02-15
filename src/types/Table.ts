import WeakSet from '.WeakSet';
import Null from '.null';
import preventExtensions from '.Object.preventExtensions';

import { Null as orderify_Null } from '@ltd/j-orderify';

export var Table :never;
export type Table = orderify_Null<any>;

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
	class Table extends orderify_Null<any> {
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
