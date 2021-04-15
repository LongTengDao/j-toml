import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import del from '.WeakSet.prototype.delete';
import freeze from '.Object.freeze';
import Null from '.null';

import { Null as orderify_Null } from '@ltd/j-orderify';

const tables = new WeakSet<Table>();
const tables_add = add.bind(tables);
export const isTable = has.bind(tables) as (value :any) => value is Table;

export const DIRECTLY = true;
export const IMPLICITLY = false;
const implicitTables = new WeakSet<Table>();
const implicitTables_add = add.bind(implicitTables);
const implicitTables_has = has.bind(implicitTables);
export const wasDirectly = (table :Table) :boolean => !implicitTables_has(table);
export const directly = del.bind(implicitTables) as (table :Table) => boolean;

export const INLINE = true;
const inlineTables = new WeakSet<Table>();
const inlineTables_add = add.bind(inlineTables);
export const isInline = has.bind(inlineTables) as (value :Table) => boolean;

export const PAIR = true;
const pairs = new WeakSet<Table>();
const pairs_add = add.bind(pairs);
export const fromPair = has.bind(pairs) as (value :Table) => boolean;

export const PlainTable = class Table extends Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
};
delete PlainTable.prototype.constructor;
freeze(PlainTable.prototype);
freeze(PlainTable);

export const OrderedTable = class Table extends orderify_Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
};
delete OrderedTable.prototype.constructor;
freeze(OrderedTable.prototype);
freeze(OrderedTable);

export type Table = orderify_Null<any>;
export type TableConstructor = {
	new (isDirect? :false, fromPair? :true) :Table;
	new (isDirect :true, isInline? :true) :Table;
};
