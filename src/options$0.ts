import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';
import isSafeInteger from '.Number.isSafeInteger';
import WeakMap from '.WeakMap';
import { Table, OrderedTable } from './types/Table';
import { BigIntInteger, NumberInteger, DependInteger } from './types/Integer';
import * as iterator$0 from './iterator$0';

/* options */

export let useWhatToJoinMultiLineString :string;
export let IntegerDepends :typeof BigIntInteger | typeof NumberInteger | typeof DependInteger;
export let IntegerMin :number;
export let IntegerMax :number;

/* xOptions */

export type xOptions = null | {
	order? :boolean,
	longer? :boolean,
	null? :boolean,
	multi? :boolean,
	ins? :boolean,
	close? :boolean,
	mix? :boolean,
	tag? :null,
} | {
	order? :boolean,
	longer? :boolean,
	null? :boolean,
	multi? :boolean,
	ins? :boolean,
	close? :boolean,
	mix :true,
	tag :tag,
};
export let moreDatetime :boolean;
export let ctrl7F :boolean;
export let allowEmptyKey :boolean;
//export const xob :boolean = true;
export let sFloat :boolean;
export let TableDepends :typeof Table | typeof OrderedTable;
export let unreopenable :boolean;
export let allowLonger :boolean;
export let enableNull :boolean;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma :boolean;
export let enableInterpolationString :boolean;
type as = (array :any[]) => any[];
export let
	asNulls :as,
	asStrings :as,
	asTables :as,
	asArrays :as,
	asBooleans :as,
	asFloats :as,
	asIntegers :as,
	asOffsetDateTimes :as,
	asLocalDateTimes :as,
	asLocalDates :as,
	asLocalTimes :as;
const arrayTypes :WeakMap<any[], as> = new WeakMap;
let As :( () => as ) | null = () => function as (array :any[]) :any[] {
	if ( arrayTypes.has(array) ) {
		arrayTypes.get(array)===as
		|| iterator$0.throws(TypeError('Types in array must be same. Check '+iterator$0.where()));
	}
	else { arrayTypes.set(array, as); }
	return array;
};
export const
	asInlineArrayOfNulls :as = As(),
	asInlineArrayOfStrings :as = As(),
	asInlineArrayOfTables :as = As(),
	asInlineArrayOfArrays :as = As(),
	asInlineArrayOfBooleans :as = As(),
	asInlineArrayOfFloats :as = As(),
	asInlineArrayOfIntegers :as = As(),
	asInlineArrayOfOffsetDateTimes :as = As(),
	asInlineArrayOfLocalDateTimes :as = As(),
	asInlineArrayOfLocalDates :as = As(),
	asInlineArrayOfLocalTimes :as = As();
As = null;

/* xOptions.mix */

export const unType :as = (array :any[]) :any[] => array;

/* xOptions.tag */

let processor :tag | null;

type tag = (each :each) => any;
type each =
	{ table :Table, key :string, tag :string } |
	{ array :any[], index :number, tag :string } |
	{ table :Table, key :string, array :Table[], index :number, tag :string };
let collection :each[] = [];
function collect_on (each :each) :void { collection.push(each); }
function collect_off (each :each) :never { throw iterator$0.throws(SyntaxError(iterator$0.where())); }
export let collect :typeof collect_off | typeof collect_on = collect_off;
export function process () {
	let index = collection.length;
	if ( index ) {
		iterator$0.done();
		const process = <tag>processor;
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

export function use (specificationVersion :unknown, multiLineJoiner :unknown, useBigInt :unknown, xOptions :Exclude<any, undefined>) :void {
	
	if ( specificationVersion===0.5 ) { moreDatetime = ctrl7F = sFloat = allowEmptyKey = true; }
	else if ( specificationVersion===0.4 ) { moreDatetime = ctrl7F = sFloat = allowEmptyKey = false; }
	else { throw Error('TOML.parse(,specificationVersion)'); }
	
	if ( typeof multiLineJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineJoiner; }
	else { throw TypeError('TOML.parse(,,multiLineJoiner)'); }
	
	if ( useBigInt===true ) { IntegerDepends = BigIntInteger; }
	else if ( useBigInt===false ) { IntegerDepends = NumberInteger; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
		IntegerDepends = DependInteger;
		if ( useBigInt>=0 ) { IntegerMin = -( IntegerMax = useBigInt ); }
		else { IntegerMax = -( IntegerMin = useBigInt )-1; }
	}
	
	let typify :boolean;
	
	if ( xOptions===null ) {
		TableDepends = Table;
		allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = unreopenable = false;
		processor = null;
		typify = true;
	}
	else {
		TableDepends = xOptions.order ? OrderedTable : Table;
		allowLonger = !!xOptions.longer;
		enableNull = !!xOptions.null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!xOptions.multi;
		enableInterpolationString = !!xOptions.ins;
		unreopenable = !!xOptions.close;
		typify = !xOptions.mix;
		processor = xOptions.tag || null;
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
