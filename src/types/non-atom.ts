import TypeError from '.TypeError';
import WeakSet from '.WeakSet';
import WeakMap from '.WeakMap';
import set_has from '.WeakSet.prototype.has';
import set_add from '.WeakSet.prototype.add';
import map_has from '.WeakMap.prototype.has';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import isArray from '.Array.isArray';

const INLINES = new WeakMap;
export const isInline = /*#__PURE__*/map_has.bind(INLINES) as (value :READONLY.Table) => boolean;
export const ofInline = /*#__PURE__*/map_get.bind(INLINES) as unknown as (this :void, value :object) => boolean | undefined;
export const beInline = /*#__PURE__*/map_set.bind(INLINES) as (this :void, value :READONLY.InlineTable | ArrayLike<READONLY.Value>, inlineMode :boolean) => object;
export const inline = <T extends READONLY.InlineTable | READONLY.StaticArray> (value :T) :T => {
	beInline(value, true);
	return value;
};
export const multilineTable = <T extends READONLY.InlineTable> (value :T) :T => {
	beInline(value, false);
	return value;
};

const SECTIONS = new WeakSet;
export const isSection = /*#__PURE__*/set_has.bind(SECTIONS) as (this :void, value :READONLY.Layer) => value is READONLY.Table;
export const beSection = /*#__PURE__*/set_add.bind(SECTIONS) as (this :void, table :READONLY.Table) => object;
export const Section = <T extends READONLY.Table> (table :T) :T => {
	if ( isArray(table) ) { throw TypeError(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	return table;
};

import type * as READONLY from '../stringify/readonly';