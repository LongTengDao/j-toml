// @ts-ignore
import { orderify } from '@ltd/j-orderify';
declare function orderify (object :object) :object;
import { create, WeakSet } from '../global';

export function Table () :void { }
export const OrderedTable = function Table () { return orderify(this); };

OrderedTable.prototype = Table.prototype = create(null);

export const isTable = (value :any) :boolean => value instanceof Table;

export const closeTables = new WeakSet;
export const openTables = new WeakSet;
