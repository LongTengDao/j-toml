import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import BigInt from '.BigInt';
import WeakMap from '.WeakMap';
import get from '.WeakMap.prototype.get';
import set from '.WeakMap.prototype.set';
import create from '.Object.create';
import isSafeInteger from '.Number.isSafeInteger';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import undefined from '.undefined';
import NULL from '.null.prototype';

import { PlainTable, OrderedTable } from './types/Table';
import * as iterator from './iterator';
import * as regexps from './regexps';

export let mustScalar :boolean = true;

/* options */

export let useWhatToJoinMultilineString :string | null = null;
export let usingBigInt :boolean | null = true;
export let IntegerMinNumber :number = 0;
export let IntegerMaxNumber :number = 0;

/* xOptions */

export type XOptions = undefined | null | {
	tag? :null | Tag,
	order? :boolean,
	longer? :boolean,
	exact? :boolean,
	null? :boolean,
	multi? :boolean,
	comment? :boolean,
	string? :boolean,
	literal? :boolean,
};
export let preserveLiteral :boolean;
export let zeroDatetime :boolean;
export let inlineTable :boolean;
export let moreDatetime :boolean;
export let disallowEmptyKey :boolean;
//export const xob :boolean = true;
export let sError :boolean;
export let sFloat :boolean;
export type Table = typesTable;
export let Table :TableConstructor;
export let allowLonger :boolean;
export let enableNull :boolean;
export let allowInlineTableMultilineAndTrailingCommaEvenNoComma :boolean;
export let preserveComment :boolean;
export let disableDigit :boolean;
const arrayTypes = new WeakMap<Array, As>();
const arrayTypes_get = /*#__PURE__*/get.bind(arrayTypes) as (key :Array) => As | undefined;
const arrayTypes_set = /*#__PURE__*/set.bind(arrayTypes) as (key :Array, value :As) => object;
type As = (array :Array) => Array;
const As = () :As => {
	const as = (array :Array) :Array => {
		const got = arrayTypes_get(array);
		got
			? got===as || iterator.throws(TypeError(`Types in Array must be same` + iterator.where('. Check ')))
			: arrayTypes_set(array, as);
		return array;
	};
	return as;
};
const AS_TYPED = {
	asNulls: As(),
	asStrings: As(),
	asTables: As(),
	asArrays: As(),
	asBooleans: As(),
	asFloats: As(),
	asIntegers: As(),
	asOffsetDateTimes: As(),
	asLocalDateTimes: As(),
	asLocalDates: As(),
	asLocalTimes: As(),
};
const asMixed :As = (array :Array) :Array => array;
export let
	asNulls :As,
	asStrings :As,
	asTables :As,
	asArrays :As,
	asBooleans :As,
	asFloats :As,
	asIntegers :As,
	asOffsetDateTimes :As,
	asLocalDateTimes :As,
	asLocalDates :As,
	asLocalTimes :As;

/* xOptions.tag */

let processor :Tag | null = null;
type Tag = (this :void, each :Each) => void;
type Each =
	{ table :Table, key :string,                                     tag :string } |
	{                            array :Array,        index :number, tag :string } |
	{ table :Table, key :string, array :Array<Table>, index :number, tag :string };
let collection :Array<Each> = [];
let collection_length :number = 0;
const collect_on = (tag :string, array :null | Array, table :null | Table, key? :string) :void => {
	const each = create(NULL) as { table :Table, key :string, array :Array, index :number, tag :string };
	each.tag = tag;
	if ( table ) {
		each.table = table;
		each.key = key!;
	}
	if ( array ) {
		each.array = array;
		each.index = array.length;
	}
	collection[collection_length++] = each;
};
const collect_off = () :never => { throw iterator.throws(SyntaxError(`xOptions.tag is not enabled, but found tag syntax` + iterator.where(' at '))); };
export let collect :(this :void, tag :string, ...rest :[ null, Table, string ] | [ Array, null ] | [ Array<Table>, Table, string ]) => void = collect_off;
export type Process = ( (this :void) => void ) | null;
export const Process = () :Process => {
	if ( collection_length ) {
		let index = collection_length;
		const process = processor!;
		const queue = collection;
		collection = [];
		return () :void => {
			do {
				process(queue[--index]!);
				queue.length = index;
			}
			while ( index );
		};
	}
	return null;
};

/* use & clear */

export const clear = () :void => {
	processor = null;
	collection.length = collection_length = 0;
	zeroDatetime = false;
	useWhatToJoinMultilineString = null;
};

export const use = (specificationVersion :unknown, multilineStringJoiner :unknown, useBigInt :unknown, xOptions :XOptions) :void => {
	
	let mixed :boolean;
	switch ( specificationVersion ) {
		case 1.0:
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = true;
			zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.5:
			mustScalar = moreDatetime = sFloat = inlineTable = true;
			mixed = zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.4:
			mustScalar = disallowEmptyKey = inlineTable = true;
			mixed = zeroDatetime = moreDatetime = sFloat = false;
			break;
		case 0.3:
			mustScalar = disallowEmptyKey = true;
			mixed = zeroDatetime = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.2:
			zeroDatetime = disallowEmptyKey = true;
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.1:
			zeroDatetime = disallowEmptyKey = true;
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
			break;
		default:
			throw RangeError(`TOML.parse(,specificationVersion)`);
	}
	regexps.switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError(`TOML.parse(,,multilineStringJoiner)`); }
	
	if ( useBigInt===undefined || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError(`TOML.parse(,,,useBigInt)`); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError(`TOML.parse(,,,useBigInt)`); }
		usingBigInt = null;
		useBigInt>=0
			? IntegerMinNumber = -( IntegerMaxNumber = useBigInt )
			: IntegerMaxNumber = -( IntegerMinNumber = useBigInt ) - 1;
	}
	
	if ( xOptions==null ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( typeof xOptions!=='object' ) {
		throw TypeError(`TOML.parse(,,,${typeof xOptions}`);
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, string, literal, tag, ...unknown } = xOptions;
		const unknownNames = getOwnPropertyNames(unknown);
		if ( unknownNames.length ) { throw TypeError(`TOML.parse(,,,,{ ${unknownNames.join(', ')} })`); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
		disableDigit = !!string;
		preserveLiteral = !!literal;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError(`TOML.parse(,,,,xOptions.tag)`); }
			if ( !mixed ) { throw TypeError(`TOML.parse(,,,,xOptions) xOptions.tag needs at least TOML 1.0 to support mixed type array`); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

import type { Array } from './types/Array';
import type { Table as typesTable, TableConstructor } from './types/Table';
