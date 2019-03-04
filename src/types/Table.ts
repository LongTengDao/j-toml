import { orderify } from '@ltd/j-orderify';
import { create, WeakSet } from '../global';

export function Table () :void { }
export const OrderedTable = function Table (this :object) :object { return orderify(this); };
export type Table = typeof Table | typeof OrderedTable;

OrderedTable.prototype = Table.prototype = create(null);

export const isTable = (value :any) :boolean => value instanceof Table;

export const closeTables = new WeakSet;
export const openTables = new WeakSet;
