import WeakSet from '.WeakSet';

const arrays :WeakSet<Array> = new WeakSet;
export const isArray = (value :any) :value is Array => arrays.has(value);

export const OF_TABLES = false;
export const STATICALLY = true;
const staticalArrays :WeakSet<Array> = new WeakSet;
export const isStatic = (value :Array) :boolean => staticalArrays.has(value);

export const newArray = (isStatic :boolean) :Array => {
	const array :Array = [];
	arrays.add(array);
	isStatic && staticalArrays.add(array);
	return array;
};

export interface Array<T = any> {
	[index :number] :T
	length :number
}
