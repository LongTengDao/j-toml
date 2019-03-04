import { WeakSet, create, Error, getOwnPropertyNames, getPrototypeOf, stringify, TypeError, isSafeInteger, RangeError, Proxy, WeakMap } from '../global';
import { Table, OrderedTable } from '../types/Table';
import { BigIntInteger, NumberInteger, DependInteger } from '../types/Integer';
import * as iterator from './iterator';

export const FUNCTION = new WeakSet;
export const unType = (array :any[]) :any[] => array;
export const { asInlineArrayOfNulls, asInlineArrayOfStrings, asInlineArrayOfTables, asInlineArrayOfArrays, asInlineArrayOfBooleans, asInlineArrayOfFloats, asInlineArrayOfDatetimes, asInlineArrayOfIntegers } = new Proxy(new WeakMap, {
	get: (arrayTypes) :Function => function typify (array :any[]) :any[] {
		if ( arrayTypes.has(array) ) {
			arrayTypes.get(array)===typify
			|| iterator.throwTypeError('Types in array must be same. Check '+iterator.where());
		}
		else { arrayTypes.set(array, typify); }
		return array;
	}
});

export let useWhatToJoinMultiLineString :string;
export let IntegerDepends :Function, IntegerMin :number, IntegerMax :number;
export let TableDepends :Table;
export let open :boolean;
export let allowLonger :boolean;
export let keepComment :boolean;
export let enableNull :boolean;
export let enableNil :boolean;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma :boolean;
export let enableInterpolationString :boolean;
export let asNulls :Function, asStrings :Function, asTables :Function, asArrays :Function, asBooleans :Function, asFloats :Function, asDatetimes :Function, asIntegers :Function;
export let customConstructors :Function | object | null;

export function use (useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string, useBigInt_forInteger :boolean | number, extensionOptions) :void {
	if ( typeof <unknown>useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( useBigInt_forInteger===true ) { IntegerDepends = BigIntInteger; }
	else if ( useBigInt_forInteger===false ) { IntegerDepends = NumberInteger; }
	else {
		if ( typeof useBigInt_forInteger!=='number' ) { throw new TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt_forInteger) ) { throw new RangeError('TOML.parse(...useBigInt)'); }
		IntegerDepends = DependInteger;
		if ( useBigInt_forInteger>=0 ) {
			IntegerMax = useBigInt_forInteger;
			IntegerMin = -useBigInt_forInteger;
		}
		else {
			IntegerMin = useBigInt_forInteger;
			IntegerMax = -useBigInt_forInteger-1;
		}
	}
	useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
	let typify :boolean;
	if ( extensionOptions===null ) {
		TableDepends = Table;
		open = allowLonger = keepComment = enableNull = enableNil = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
		customConstructors = null;
		typify = true;
	}
	else {
		TableDepends = extensionOptions.order ? OrderedTable : Table;
		open = !!extensionOptions.open;
		allowLonger = !!extensionOptions.longer;
		keepComment = !!extensionOptions.hash;
		enableNull = !!extensionOptions.null;
		enableNil = !!extensionOptions.nil;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
		enableInterpolationString = !!extensionOptions.ins;
		typify = !extensionOptions.mix;
		customConstructors = extensionOptions.new || null;
		if ( customConstructors!==null ) {
			if ( typeof customConstructors==='function' ) {
				if ( typify ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,,{ mix:false, new(){} })');
				}
				if ( customConstructors.length!==2 ) { throw new Error('TOML.parse(,,,,xOptions.new.length)'); }
				FUNCTION.add(customConstructors);
			}
			else if ( typeof customConstructors==='object' ) {
				if ( typify ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,,{ mix:false, new:{} })');
				}
				if ( getPrototypeOf(customConstructors)===null ) {
					for ( const type of getOwnPropertyNames(customConstructors) ) {
						if ( typeof customConstructors[type]!=='function' ) {
							customConstructors = null;
							throw new TypeError('TOML.parse(,,,,xOptions.new['+stringify(type)+'])');
						}
						if ( customConstructors[type].length ) {
							customConstructors = null;
							throw new Error('TOML.parse(,,,,xOptions.new['+stringify(type)+'].length)');
						}
					}
				}
				else {
					const origin = customConstructors;
					customConstructors = <object>create(null);
					for ( const type of getOwnPropertyNames(origin) ) {
						const customConstructor = origin[type];
						if ( typeof customConstructor!=='function' ) {
							customConstructors = null;
							throw new TypeError('TOML.parse(,,,,xOptions.new['+stringify(type)+'])');
						}
						if ( customConstructors[type].length ) {
							customConstructors = null;
							throw new Error('TOML.parse(,,,,xOptions.new['+stringify(type)+'].length)');
						}
						customConstructors[type] = customConstructor;
					}
				}
			}
			else { throw new TypeError('TOML.parse(,,,,xOptions.new)'); }
		}
	}
	if ( typify ) {
		asNulls = asInlineArrayOfNulls;
		asStrings = asInlineArrayOfStrings;
		asTables = asInlineArrayOfTables;
		asArrays = asInlineArrayOfArrays;
		asBooleans = asInlineArrayOfBooleans;
		asFloats = asInlineArrayOfFloats;
		asDatetimes = asInlineArrayOfDatetimes;
		asIntegers = asInlineArrayOfIntegers;
	}
	else { asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asDatetimes = asIntegers = unType; }
}

export function clear () :void {
	customConstructors = null;
}
