import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';

const arrays = new WeakSet<Array>();
const arrays_add = /*#__PURE__*/add.bind(arrays);
export const isArray = /*#__PURE__*/has.bind(arrays) as (value :any) => value is Array;

export const OF_TABLES = false;
export const STATICALLY = true;
const staticalArrays = new WeakSet<Array>();
const staticalArrays_add = /*#__PURE__*/add.bind(staticalArrays);
export const isStatic = /*#__PURE__*/has.bind(staticalArrays) as (value :Array) => boolean;

export const newArray = (isStatic :boolean) :Array => {
	const array :Array = [];
	arrays_add(array);
	isStatic && staticalArrays_add(array);
	return array;
};

export interface Array<T = any> {
	[index :number] :T
	length :number
}
