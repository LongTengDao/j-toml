import TypeError from '.TypeError';
import RangeError from '.RangeError';
import WeakSet from '.WeakSet';
import WeakMap from '.WeakMap';
import set_has from '.WeakSet.prototype.has';
import set_add from '.WeakSet.prototype.add';
import set_del from '.WeakSet.prototype.delete';
import map_has from '.WeakMap.prototype.has';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import map_del from '.WeakMap.prototype.delete';
import isArray from '.Array.isArray';
import undefined from '.undefined';

const INLINES = new WeakMap<READONLY.Table | ArrayLike<READONLY.Value>, boolean | 0 | 1 | 2 | 3>();
const SECTIONS = new WeakSet<READONLY.Table>();

const deInline = /*#__PURE__*/map_del.bind(INLINES) as (this :void, value :READONLY.Table | readonly READONLY.Value[]) => boolean;
const deSection = /*#__PURE__*/set_del.bind(SECTIONS) as (this :void, table :READONLY.Table) => boolean;

export const isInline = /*#__PURE__*/map_has.bind(INLINES) as (this :void, value :READONLY.Table) => boolean;
export const ofInline = /*#__PURE__*/map_get.bind(INLINES) as {
	(this :void, value :ArrayLike<READONLY.Value>) :undefined | 0 | 1 | 2 | 3;
	(this :void, value :READONLY.InlineTable) :undefined | boolean;
	(this :void, value :object) :undefined;
};
export const beInline = /*#__PURE__*/map_set.bind(INLINES) as {
	(this :void, value :ArrayLike<READONLY.Value>, inlineMode :0 | 1 | 2 | 3) :object;
	(this :void, value :READONLY.InlineTable, inlineMode :boolean) :object;
};
export const inline = <T extends READONLY.InlineTable | READONLY.StaticArray> (value :T, mode? :0 | 1 | 2 | 3, looping? :object) :T => {
	if ( isArray(value) ) {
		if ( looping ) { mode = 3; }
		else {
			if ( mode===undefined ) { mode = 3; }
			else if ( mode!==0 && mode!==1 && mode!==2 && mode!==3 ) {
				throw typeof mode==='number'
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${mode}`)
					: TypeError(`array inline mode must be "number" type, not including ${mode===null ? '"null"' : typeof mode}`);
			}
		}
		beInline(value, mode);
	}
	else {
		beInline(value, true);
		deSection(value);
	}
	return value;
};
export const multilineTable = <T extends READONLY.InlineTable> (value :T) :T => {
	beInline(value, false);
	deSection(value);
	return value;
};
export const multilineArray = <T extends readonly READONLY.Value[]> (value :T) :T => {
	deInline(value);
	return value;
};

export const isSection = /*#__PURE__*/set_has.bind(SECTIONS) as (this :void, value :READONLY.Layer) => value is READONLY.Table;
export const beSection = /*#__PURE__*/set_add.bind(SECTIONS) as (this :void, table :READONLY.Table) => object;
export const Section = <T extends READONLY.Table> (table :T) :T => {
	if ( isArray(table) ) { throw TypeError(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	deInline(table);
	return table;
};

import type * as READONLY from '../stringify/readonly';