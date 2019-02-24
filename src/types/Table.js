import { create, WeakSet } from '../global.js';

export function Table () { }
export const OrderedTable = function Table () { return orderify(this); };

OrderedTable.prototype = Table.prototype = create(null);

export const isTable = value => value instanceof Table;

export const closeTables = new WeakSet;
export const openTables = new WeakSet;
