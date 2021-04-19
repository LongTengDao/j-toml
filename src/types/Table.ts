import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import del from '.WeakSet.prototype.delete';
import Null from '.null';

import { Null as orderify_Null } from '@ltd/j-orderify';

const tables = new WeakSet<Table>();
const tables_add = /*#__PURE__*/add.bind(tables);
export const isTable = /*#__PURE__*/has.bind(tables) as (value :any) => value is Table;

export const DIRECTLY = true;
export const IMPLICITLY = false;
const implicitTables = new WeakSet<Table>();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_has = /*#__PURE__*/has.bind(implicitTables);
export const wasDirectly = (table :Table) :boolean => !implicitTables_has(table);
export const directly = /*#__PURE__*/del.bind(implicitTables) as (table :Table) => boolean;

export const INLINE = true;
const inlineTables = new WeakSet<Table>();
const inlineTables_add = /*#__PURE__*/add.bind(inlineTables);
export const isInline = /*#__PURE__*/has.bind(inlineTables) as (value :Table) => boolean;

export const PAIR = true;
const pairs = new WeakSet<Table>();
const pairs_add = /*#__PURE__*/add.bind(pairs);
export const fromPair = /*#__PURE__*/has.bind(pairs) as (value :Table) => boolean;

export const PlainTable = Null(class Table extends Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

export const OrderedTable = Null(class Table extends orderify_Null<any> {
	constructor (isDirect? :boolean, isInline? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

export type Table = orderify_Null<any>;
export type TableConstructor = {
	new (isDirect? :false, fromPair? :true) :Table;
	new (isDirect :true, isInline? :true) :Table;
};
