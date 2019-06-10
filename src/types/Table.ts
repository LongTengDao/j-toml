import create from '.Object.create';

import { of } from '@ltd/j-orderify';

export const Table = function Table () :void { } as unknown as { new () :Table };
export const OrderedTable = function Table (this :Table) :Table { return of(this); } as unknown as { new () :Table };
export type Table = { [key :string] :any };

OrderedTable.prototype = Table.prototype = create(null);

export function isTable (value :Table) :true;
export function isTable (value :Exclude<any, Table>) :false;
export function isTable (value :any) :boolean { return value instanceof Table; }
