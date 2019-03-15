import create from '.Object.create';
import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import getPrototypeOf from '.Reflect.getPrototypeOf';
import stringify from '.JSON.stringify';
import isSafeInteger from '.Number.isSafeInteger';
import Proxy from '.Proxy';
import WeakMap from '.WeakMap';
import { Table, OrderedTable } from '../types/Table';
import { BigIntInteger, NumberInteger, DependInteger } from '../types/Integer';
import * as iterator from './iterator';

/* options */

export let useWhatToJoinMultiLineString :string;
export let IntegerDepends :Function, IntegerMin :number, IntegerMax :number;

/* xOptions */

export let TableDepends :Table;
export let open :boolean;
export let allowLonger :boolean;
export let enableNull :boolean;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma :boolean;
export let enableInterpolationString :boolean;
export let asNulls :Function, asStrings :Function, asTables :Function, asArrays :Function, asBooleans :Function, asFloats :Function, asDatetimes :Function, asIntegers :Function;
export let customConstructors :Function | object | null;

/* xOptions.mix */

export const unType = (array :any[]) :any[] => array;
export const {
	asInlineArrayOfNulls,
	asInlineArrayOfStrings,
	asInlineArrayOfTables,
	asInlineArrayOfArrays,
	asInlineArrayOfBooleans,
	asInlineArrayOfFloats,
	asInlineArrayOfDatetimes,
	asInlineArrayOfIntegers,
} = <{ [each :string] :(array :any[]) => any[] }><object>new Proxy(new WeakMap, {
	get: (arrayTypes) => function typify (array :any[]) :any[] {
		if ( arrayTypes.has(array) ) {
			arrayTypes.get(array)===typify
			|| iterator.throws(TypeError('Types in array must be same. Check '+iterator.where()));
		}
		else { arrayTypes.set(array, typify); }
		return array;
	}
});

/* xOptions.new */

type each = { parent :object | any[], key :string | number, type :string };
let WC :each[] = [];
function wc_on (each :each) :void { WC.push(each); }
function wc_off (each :each) :never { throw iterator.throws(SyntaxError(iterator.where())); }
export let wc :typeof wc_off | typeof wc_on = wc_off;
export function Wc () {
	let index = WC.length;
	if ( index ) {
		iterator.done();
		const c = customConstructors;
		const s = WC;
		customConstructors = null;
		WC = [];
		if ( typeof c==='function' ) {
			while ( index-- ) {
				const { parent, key, type } = <each>s.pop();
				parent[key] = c(type, parent[key]);
			}
		}
		else {
			while ( index-- ) {
				const { parent, key, type } = <each>s.pop();
				parent[key] = ( <object>c )[type](parent[key]);
			}
		}
	}
}

/* use & clear */

export function clear () :void {
	customConstructors = null;
	WC.length = 0;
}

export function use (specificationVersion :0.5, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string, useBigInt_forInteger :boolean | number, extensionOptions) :void {
	if ( specificationVersion!==0.5 ) { throw new Error('TOML.parse(,specificationVersion)'); }
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
		open = allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
		customConstructors = null;
		typify = true;
	}
	else {
		TableDepends = extensionOptions.order ? OrderedTable : Table;
		open = !!extensionOptions.open;
		allowLonger = !!extensionOptions.longer;
		enableNull = !!extensionOptions.null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
		enableInterpolationString = !!extensionOptions.ins;
		typify = !extensionOptions.mix;
		customConstructors = extensionOptions.new || null;
		if ( customConstructors===null ) { wc = wc_off; }
		else {
			if ( typeof customConstructors==='function' ) {
				if ( typify ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,,{ mix:false, new(){} })');
				}
				if ( customConstructors.length!==2 ) {
					customConstructors = null;
					throw new Error('TOML.parse(,,,,xOptions.new.length)');
				}
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
			wc = wc_on;
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
