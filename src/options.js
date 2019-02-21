import { WeakMap, WeakSet, create, Error, getOwnPropertyNames, getPrototypeOf, stringify, TypeError, isSafeInteger, RangeError } from './global.js';
import { throwTypeError, where } from './iterator.js';
import { TableDefault, TableKeepOrder } from './types.js';

const TypedArrays = new WeakMap;
const reallyTypify = (array, type) => {
	if ( TypedArrays.has(array) ) {
		if ( TypedArrays.get(array)===type ) { return array; }
		throwTypeError('Types in array must be same. Check '+where());
	}
	TypedArrays.set(array, type);
	return array;
};
export const unlimitedType = array => array;
export const FUNCTION = new WeakSet;

export let useWhatToJoinMultiLineString = '';
export let useBigInt = true;

export let TableDepends = TableDefault;
export let allowLonger = false;
export let keepComment = false;
export let enableNull = false;
export let enableNil = false;
export let allowInlineTableMultiLineAndTrailingCommaEvenNoComma = false;
export let enableInterpolationString = false;
export let typify = reallyTypify;
export let customConstructors = null;

export function use (useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions) {
	if ( typeof useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines!=='string' ) { throw new TypeError('TOML.parse(,,multiLineJoiner)'); }
	if ( typeof useBigInt_forInteger!=='boolean' ) {
		if ( typeof useBigInt_forInteger!=='number' ) { throw new TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt_forInteger) ) { throw new RangeError('TOML.parse(...useBigInt)'); }
	}
	useWhatToJoinMultiLineString = useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines;
	useBigInt = useBigInt_forInteger;
	if ( extensionOptions===null ) {
		TableDepends = TableDefault;
		allowLonger = keepComment = enableNull = enableNil = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = enableInterpolationString = false;
		typify = reallyTypify;
		customConstructors = null;
	}
	else {
		TableDepends = extensionOptions.order ? TableKeepOrder : TableDefault;
		allowLonger = !!extensionOptions.longer;
		keepComment = !!extensionOptions.hash;
		enableNull = !!extensionOptions.null;
		enableNil = !!extensionOptions.nil;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!extensionOptions.multi;
		enableInterpolationString = !!extensionOptions.ins;
		typify = extensionOptions.mix ? unlimitedType : reallyTypify;
		customConstructors = extensionOptions.new || null;
		if ( customConstructors!==null ) {
			if ( typeof customConstructors==='function' ) {
				if ( customConstructors.length!==2 ) { throw new Error('TOML.parse(,,,xOptions.new.length)'); }
				FUNCTION.add(customConstructors);
			}
			else if ( typeof customConstructors==='object' ) {
				if ( getPrototypeOf(customConstructors)===null ) {
					for ( const type of getOwnPropertyNames(customConstructors) ) {
						if ( typeof customConstructors[type]!=='function' ) {
							customConstructors = null;
							throw new TypeError('TOML.parse(,,,xOptions.new['+stringify(type)+'])');
						}
						if ( customConstructors[type].length ) {
							customConstructors = null;
							throw new Error('TOML.parse(,,,xOptions.new['+stringify(type)+'].length)');
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
							throw new TypeError('TOML.parse(,,,xOptions.new['+stringify(type)+'])');
						}
						if ( customConstructors[type].length ) {
							customConstructors = null;
							throw new Error('TOML.parse(,,,xOptions.new['+stringify(type)+'].length)');
						}
						customConstructors[type] = customConstructor;
					}
				}
			}
			else { throw new TypeError('TOML.parse(,,,xOptions.new)'); }
		}
	}
}

export function clear () {
	customConstructors = null;
}
