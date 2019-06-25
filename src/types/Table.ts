import preventExtensions from '.Object.preventExtensions';

import { NULL } from '@ltd/j-orderify';

export type Table = NULL<any>;
export const Table :{ new () :Table } =
	/*#__PURE__*/
	function () {
		class Table extends NULL<any> {}
		delete Table.prototype.constructor;
		preventExtensions(Table.prototype);
		return Table;
	}();

export function isTable (value :any) :value is Table {
	return value instanceof Table;
}
