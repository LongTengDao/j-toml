import { WeakSet, create, Error, getOwnPropertyNames, getPrototypeOf, stringify, TypeError, isSafeInteger, RangeError, Proxy, WeakMap } from '../global.js';
import { Table, OrderedTable } from '../types/Table.js';
import { BigIntInteger, NumberInteger, DependInteger } from '../types/Integer.js';
import * as iterator from './iterator.js';

export const FUNCTION = new WeakSet;
export const unType = array => array;
export const { asInlineArrayOfNulls, asInlineArrayOfStrings, asInlineArrayOfTables, asInlineArrayOfArrays, asInlineArrayOfBooleans, asInlineArrayOfFloats, asInlineArrayOfDatetimes, asInlineArrayOfIntegers } = new Proxy(new WeakMap, {
	get: arrayTypes => function typify (array) {
		if ( arrayTypes.has(array) ) {
			arrayTypes.get(array)===typify
			|| iterator.throwTypeError('Types in array must be same. Check '+iterator.where());
		}
		else { arrayTypes.set(array, typify); }
		return array;
	}
});

export let useWhatToJoinMultiLineString;
export let IntegerDepends, IntegerMin, IntegerMax;
export let TableDepends;
export let open;
export let allowLonger;
export let keepComment;
export let enableNull;
export let enableNil;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma;
export let enableInterpolationString;
export let asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asDatetimes, asIntegers;
export let customConstructors;

export function use (useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions) {
	if ( typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
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
	let typify;
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
					customConstructors = create(null);
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

export function clear () {
	customConstructors = null;
}
