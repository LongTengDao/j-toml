import create from '.Object.create';

import { bind, NULL } from '@ltd/j-orderify';

type Table = NULL<any>;
const Table :{ new () :Table } =
	/*#__PURE__*/ bind(create(null));

function isTable (value :any) :value is Table {
	return value instanceof Table;
}

export { Table, isTable };
