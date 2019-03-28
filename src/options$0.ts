import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';
import isSafeInteger from '.Number.isSafeInteger';
import Proxy from '.Proxy';
import WeakMap from '.WeakMap';
import { Table, OrderedTable } from './types/Table';
import { BigIntInteger, NumberInteger, DependInteger } from './types/Integer';
import * as iterator$0 from './iterator$0';

/* options */

export let useWhatToJoinMultiLineString :string;
export let IntegerDepends :Function, IntegerMin :number, IntegerMax :number;

/* xOptions */

type as = (array :any[]) => any[];

export let moreDatetime :boolean;
export let ctrl7F :boolean;
export let nonEmptyKey :boolean;
export let xob :boolean;
export let sFloat :boolean;
export let TableDepends :Table;
export let openable :boolean;
export let allowLonger :boolean;
export let enableNull :boolean;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma :boolean;
export let enableInterpolationString :boolean;
export let asNulls :as, asStrings :as, asTables :as, asArrays :as, asBooleans :as, asFloats :as, asIntegers :as;
export let asOffsetDateTimes :as, asLocalDateTimes :as, asLocalDates :as, asLocalTimes :as;
let processor :Function | null;

/* xOptions.mix */

export const unType = (array :any[]) :any[] => array;
export const {
	asInlineArrayOfNulls,
	asInlineArrayOfStrings,
	asInlineArrayOfTables,
	asInlineArrayOfArrays,
	asInlineArrayOfBooleans,
	asInlineArrayOfFloats,
	asInlineArrayOfIntegers,
	asInlineArrayOfOffsetDateTimes,
	asInlineArrayOfLocalDateTimes,
	asInlineArrayOfLocalDates,
	asInlineArrayOfLocalTimes,
} = <{ [each :string] :as }><object>new Proxy(new WeakMap, {
	get: (arrayTypes) => function typify (array :any[]) :any[] {
		if ( arrayTypes.has(array) ) {
			arrayTypes.get(array)===typify
			|| iterator$0.throws(TypeError('Types in array must be same. Check '+iterator$0.where()));
		}
		else { arrayTypes.set(array, typify); }
		return array;
	}
});

/* xOptions.new */

type each = { table :object, key :string, tag :string } | { array :any[], index :number, tag :string } | { table :object, key :string, array :object[], index :number, tag :string };
let collection :each[] = [];
function collect_on (each :each) :void { collection.push(each); }
function collect_off (each :each) :never { throw iterator$0.throws(SyntaxError(iterator$0.where())); }
export let collect :typeof collect_off | typeof collect_on = collect_off;
export function process () {
	let index = collection.length;
	if ( index ) {
		iterator$0.done();
		const process = <Function>processor;
		const queue = collection;
		processor = null;
		collection = [];
		while ( index-- ) { process(<each>queue.pop()); }
	}
}

/* use & clear */

export function clear () :void {
	processor = null;
	collection.length = 0;
}

export function use (specificationVersion, multiLineJoiner :string, useBigInt :boolean | number, xOptions) :void {
	if ( specificationVersion!==0.5 && specificationVersion!==0.4 ) { throw Error('TOML.parse(,specificationVersion)'); }
	if ( typeof <unknown>multiLineJoiner!=='string' ) { throw TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( useBigInt===true ) { IntegerDepends = BigIntInteger; }
	else if ( useBigInt===false ) { IntegerDepends = NumberInteger; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError('TOML.parse(...useBigInt)'); }
		IntegerDepends = DependInteger;
		if ( useBigInt>=0 ) {
			IntegerMax = useBigInt;
			IntegerMin = -useBigInt;
		}
		else {
			IntegerMin = useBigInt;
			IntegerMax = -useBigInt-1;
		}
	}
	useWhatToJoinMultiLineString = multiLineJoiner;
	moreDatetime = ctrl7F = xob = sFloat = specificationVersion===0.5;
	nonEmptyKey = openable = specificationVersion===0.4;
	let typify :boolean;
	if ( xOptions===null ) {
		TableDepends = Table;
		allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
		processor = null;
		typify = true;
	}
	else {
		TableDepends = xOptions.order ? OrderedTable : Table;
		allowLonger = !!xOptions.longer;
		enableNull = !!xOptions.null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!xOptions.multi;
		enableInterpolationString = !!xOptions.ins;
		typify = !xOptions.mix;
		processor = xOptions.new || null;
		if ( processor ) {
			if ( typeof processor!=='function' ) { throw TypeError('TOML.parse(,,,,xOptions.tag)'); }
			if ( typify ) { throw Error('TOML.parse(,,,,xOptions) xOptions.tag needs xOptions.mix to be true'); }
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	if ( typify ) {
		asNulls = asInlineArrayOfNulls;
		asStrings = asInlineArrayOfStrings;
		asTables = asInlineArrayOfTables;
		asArrays = asInlineArrayOfArrays;
		asBooleans = asInlineArrayOfBooleans;
		asFloats = asInlineArrayOfFloats;
		asIntegers = asInlineArrayOfIntegers;
		asOffsetDateTimes = asInlineArrayOfOffsetDateTimes;
		asLocalDateTimes = asInlineArrayOfLocalDateTimes;
		asLocalDates = asInlineArrayOfLocalDates;
		asLocalTimes = asInlineArrayOfLocalTimes;
	}
	else {
		asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = unType;
	}
}
