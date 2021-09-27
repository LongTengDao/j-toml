import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import del from '.WeakSet.prototype.delete';
import Null from '.null';

import { Null as orderify_Null } from '@ltd/j-orderify';

import { beInline, beSection } from '../stringify/non-atom';

export { isInline } from '../stringify/non-atom';
export const INLINE = true;

const tables = new WeakSet<Table>();
const tables_add = /*#__PURE__*/add.bind(tables);
export const isTable = /*#__PURE__*/has.bind(tables) as (this :void, value :any) => value is Table;

const implicitTables = new WeakSet<Table>();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_del = /*#__PURE__*/del.bind(implicitTables) as (this :void, table :Table) => boolean;
export const directlyIfNot = (table :Table) :boolean => {
	if ( implicitTables_del(table) ) {
		beSection(table);
		return true;
	}
	return false;
};
export const DIRECTLY = true;
export const IMPLICITLY = false;

const pairs = new WeakSet<Table>();
const pairs_add = /*#__PURE__*/add.bind(pairs);
export const fromPair = /*#__PURE__*/has.bind(pairs) as (this :void, value :Table) => boolean;
export const PAIR = true;

export const PlainTable = Null(class Table extends Null<any> {
	[commentForKey :symbol] :string;
	constructor (isDirect? :boolean, isInline$fromPair? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

export const OrderedTable = Null(class Table extends orderify_Null<any> {
	[commentForKey :symbol] :string;
	constructor (isDirect? :boolean, isInline$fromPair? :boolean) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

export interface Table extends orderify_Null<any> {
	[keyComment :symbol] :string;
}
export type TableConstructor = {
	new (isDirect? :false, fromPair? :true) :Table;
	new (isDirect :true, isInline? :true) :Table;
};
