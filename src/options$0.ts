import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';
import isSafeInteger from '.Number.isSafeInteger';
import WeakMap from '.WeakMap';
import ownKeys from '.Reflect.ownKeys';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import MIN_SAFE_INTEGER from '.Number.MIN_SAFE_INTEGER';
import { Table as typesTable, PlainTable, OrderedTable } from './types/Table';
import * as iterator$0 from './iterator$0';
import * as regexps$0 from './regexps$0';

/* options */

export let useWhatToJoinMultiLineString :string;
export let usingBigInt :boolean | null;
export let IntegerMin :number;
export let IntegerMax :number;

/* xOptions */

export var xOptions :never;
export type xOptions = undefined | null | boolean | Tag | {
	order? :boolean,
	longer? :boolean,
	exact? :boolean,
	null? :boolean,
	multi? :boolean,
	close? :boolean,
} & ({
	tag :Tag,
	mix :true,
} | {
	tag? :null,
	mix? :boolean,
});
export let zeroDatetime :boolean;
export let inlineTable :boolean;
export let moreDatetime :boolean;
export let disallowEmptyKey :boolean;
//export const xob :boolean = true;
export let sError :boolean;
export let sFloat :boolean;
export let unreopenable :boolean;
export type Table = typesTable;
export let Table :() => Table;
export let allowLonger :boolean;
export let enableNull :boolean;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma :boolean;
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
let As :{ () :as } | null = () => function as (array :any[]) :any[] {
	if ( arrayTypes.has(array) ) {
		arrayTypes.get(array)===as
		|| iterator$0.throws(TypeError(`Types in Array must be same. Check ${iterator$0.where()}`));
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

let processor :Tag | null = null;

type Tag = (this :void, each :Each) => void;
type Each =
	{ table :Table,     key :string,    array :undefined, index :undefined, tag :string } |
	{ table :undefined, key :undefined, array :any[],     index :number,    tag :string } |
	{ table :Table,     key :string,    array :Table[],   index :number,    tag :string };
let collection :Each[] = [];
function collect_on (each :Each) :void { collection.push(each); }
function collect_off (each :Each) :never { throw iterator$0.throws(SyntaxError(iterator$0.where())); }
export let collect :typeof collect_off | typeof collect_on = collect_off;
export function process () {
	let index = collection.length;
	if ( index ) {
		iterator$0.done();
		const process = processor!;
		const queue = collection;
		processor = null;
		collection = [];
		while ( index-- ) { process(queue.pop()!); }
	}
}

/* use & clear */

export function clear () :void {
	processor = null;
	collection.length = 0;
}

export function use (specificationVersion :unknown, multiLineJoiner :unknown, useBigInt :unknown, xOptions :xOptions) :void {
	
	switch ( specificationVersion ) {
		case 1.0:
		case 0.5:
			moreDatetime = sFloat = inlineTable = true;
			zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.4:
			disallowEmptyKey = inlineTable = true;
			zeroDatetime = moreDatetime = sFloat = false;
			break;
		case 0.3:
			disallowEmptyKey = true;
			zeroDatetime = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.2:
			zeroDatetime = disallowEmptyKey = true;
			moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.1:
			zeroDatetime = disallowEmptyKey = true;
			moreDatetime = sFloat = inlineTable = false;
			break;
		default:
			throw Error('TOML.parse(,specificationVersion)');
	}
	regexps$0.switchRegExp(specificationVersion);
	
	if ( typeof multiLineJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineJoiner; }
	else { throw TypeError('TOML.parse(,,multiLineJoiner)'); }
	
	if ( useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
		usingBigInt = null;
		if ( useBigInt>=0 ) { IntegerMin = -( IntegerMax = useBigInt ); }
		else { IntegerMax = -( IntegerMin = useBigInt )-1; }
		if ( IntegerMin < MIN_SAFE_INTEGER || MAX_SAFE_INTEGER < IntegerMax ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
	}
	
	let typify :boolean;
	
	if ( xOptions==null || xOptions===false ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = unreopenable = false;
		typify = true;
		collect = collect_off;
	}
	else if ( xOptions===true ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = unreopenable = true;
		typify = false;
		collect = collect_off;
	}
	else if ( typeof xOptions==='function' ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = unreopenable = true;
		typify = false;
		processor = xOptions;
		collect = collect_on;
	}
	else {
		const { order, longer, exact, null: _null, multi, close, mix, tag, ...unknown } = xOptions;
		if ( ownKeys(unknown).length ) { throw Error('TOML.parse(,,,,xOptions.tag)'); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !!longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!multi;
		unreopenable = !!close;
		typify = !mix;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError('TOML.parse(,,,,xOptions.tag)'); }
			if ( typify ) { throw Error('TOML.parse(,,,,xOptions) xOptions.tag needs xOptions.mix to be true'); }
			processor = tag;
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
