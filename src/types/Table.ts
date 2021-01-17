import WeakSet from '.WeakSet';
import freeze from '.Object.freeze';
import Null from '.null';

import { Null as orderify_Null } from '@ltd/j-orderify';

const tables :WeakSet<Table> = new WeakSet;
export const isTable = (value :any) :value is Table => tables.has(value);

export const DIRECTLY = true;
export const IMPLICITLY = false;
const implicitTables :WeakSet<Table> = new WeakSet;
export const wasDirectly = (table :Table) :boolean => !implicitTables.has(table);
export const directly = (table :Table) :void => { implicitTables.delete(table); };

export const INLINE = true;
const inlineTables :WeakSet<Table> = new WeakSet;
export const isInline = (value :Table) :boolean => inlineTables.has(value);

export const PAIR = true;
const pairs :WeakSet<Table> = new WeakSet;
export const fromPair = (value :Table) :boolean => pairs.has(value);

export const PlainTable = class Table extends Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables.add(this);
		isDirect
			? isInline && inlineTables.add(this)
			: ( isInline ? pairs : implicitTables ).add(this);
		return this;
	}
};
delete PlainTable.prototype.constructor;
freeze(PlainTable.prototype);
freeze(PlainTable);

export const OrderedTable = class Table extends orderify_Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables.add(this);
		isDirect
			? isInline && inlineTables.add(this)
			: ( isInline ? pairs : implicitTables ).add(this);
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
