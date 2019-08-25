'use strict';

const version = '0.5.106';

const undefined$1 = void 0;

const isBuffer = typeof Buffer!=='undefined' && Buffer.isBuffer!==undefined$1 ? Buffer.isBuffer : /*#__PURE__*/ ()=>false;

const hasOwnProperty = Object.prototype.hasOwnProperty;

const from = (
	/*! j-globals: Buffer.from (fallback) */
	typeof Buffer==='function' && /*#__PURE__*/ hasOwnProperty.call(Buffer, 'from') ? Buffer.from : undefined$1
	/*¡ j-globals: Buffer.from (fallback) */
);

//import * as options\$0 from './options\$0';


const NONE           = [];
let sourceLines           = NONE;
let lastLineIndex         = -1;
let lineIndex         = -1;

             
	                          
	               
  
function noop (lineRest        )         { return ''; }
noop.previous = noop;

let stacks_length = 0;
let last       = noop;


function could ()       {
	if ( sourceLines!==NONE ) { throw Error('Internal error: parsing during parsing.'); }
}

const EOL = /\r?\n/;
function todo (source        )       {
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
	stacks_length = 0;
	last = noop;
}

const next = ()         => sourceLines[++lineIndex];

const rest = ()          => lineIndex!==lastLineIndex;

const mark = ()         => lineIndex;

function must (message        , startIndex        )         {
	lineIndex===lastLineIndex
	&& throws(SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]));
	return sourceLines[++lineIndex];
}

const where = ()         => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

function done ()       {
	sourceLines = NONE;
	last = noop;
}


function stacks_pop ()       {
	const item       = last;
	last =       last.previous;
	--stacks_length;
	return item;
}

function stacks_push (item      )       {
	item.previous = last;
	last = item;
	++stacks_length;
}

function stacks_insertBeforeLast (item      ) {
	item.previous = last.previous;
	last.previous = item;
	++stacks_length;
}


function throws (error                                                     )        {
	if ( sourceLines!==NONE ) {
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
		//done();
		//options\$0.clear();
	}
	throw error;
}

const isSafeInteger = Number.isSafeInteger;

const ownKeys = Reflect.ownKeys;

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

const getPrototypeOf = Object.getPrototypeOf;

const create = Object.create;

const assign = Object.assign;

const defineProperty = Object.defineProperty;

const Object_freeze = Object.freeze;

const Reflect_apply = Reflect.apply;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

const Reflect_set = Reflect.set;

const isArray = Array.isArray;

const toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

const seal = Object.seal;

const NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.create
		? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

const Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else { for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
			exports['default'] = exports;
			typeof exports==='function' && exports.prototype && seal(exports.prototype);
			if ( toStringTag ) {
				var descriptor = create(NULL);
				descriptor.value = 'Module';
				defineProperty(exports, toStringTag, descriptor);
			}
			return Object_freeze(exports);
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

/*!
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：5.3.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const Keeper = Set;
const target2keeper                          = new WeakMap;
const proxy2target                         = new WeakMap;
const target2proxy                         = new WeakMap;

const setDescriptor = /*#__PURE__*/assign(create(null), {
	value: undefined$1,
	writable: true,
	enumerable: true,
	configurable: true,
});
const handlers = /*#__PURE__*/assign(create(null), {
	apply (Function                           , thisArg     , args       ) {
		return orderify(Reflect_apply(Function, thisArg, args));
	},
	construct (Class                               , args       , newTarget     ) {
		return orderify(Reflect_construct(Class, args, newTarget));
	},
	defineProperty (target    , key     , descriptor                    )          {
		if ( Reflect_defineProperty(target, key, PartialDescriptor(descriptor)) ) {
			target2keeper.get(target) .add(key);
			return true;
		}
		return false;
	},
	deleteProperty (target    , key     )          {
		if ( Reflect_deleteProperty(target, key) ) {
			target2keeper.get(target) .delete(key);
			return true;
		}
		return false;
	},
	ownKeys (target    )        {
		return [ ...target2keeper.get(target)  ];
	},
	set (target    , key     , value     , receiver    )          {
		if ( key in target ) { return Reflect_set(target, key, value, receiver); }
		setDescriptor.value = value;
		if ( Reflect_defineProperty(target, key, setDescriptor) ) {
			target2keeper.get(target) .add(key);
			setDescriptor.value = undefined$1;
			return true;
		}
		else {
			setDescriptor.value = undefined$1;
			return false;
		}
	},
});

function newProxy                   (target   , keeper        )    {
	target2keeper.set(target, keeper);
	const proxy    = new Proxy(target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
}

const { orderify } = {
	orderify                   (object   )    {
		if ( proxy2target.has(object) ) { return object; }
		let proxy                = target2proxy.get(object)                 ;
		if ( proxy ) { return proxy; }
		proxy = newProxy(object, new Keeper(ownKeys(object)));
		target2proxy.set(object, proxy);
		return proxy;
	}
};

function PartialDescriptor                               (source   )    {
	const target    = create(null);
	if ( source.hasOwnProperty('value') ) {
		target.value = source.value;
		if ( source.hasOwnProperty('writable') ) { target.writable = source.writable; }
	}
	else if ( source.hasOwnProperty('writable') ) { target.writable = source.writable; }
	else if ( source.hasOwnProperty('get') ) {
		target.get = source.get;
		if ( source.hasOwnProperty('set') ) { target.set = source.set; }
	}
	else if ( source.hasOwnProperty('set') ) { target.set = source.set; }
	if ( source.hasOwnProperty('enumerable') ) { target.enumerable = source.enumerable; }
	if ( source.hasOwnProperty('configurable') ) { target.configurable = source.configurable; }
	return target;
}
function ExternalDescriptor                               (source   )    {
	const target    = create(null);
	if ( source.hasOwnProperty('value') ) { target.value = source.value; }
	if ( source.hasOwnProperty('writable') ) { target.writable = source.writable; }
	if ( source.hasOwnProperty('get') ) { target.get = source.get; }
	if ( source.hasOwnProperty('set') ) { target.set = source.set; }
	if ( source.hasOwnProperty('enumerable') ) { target.enumerable = source.enumerable; }
	if ( source.hasOwnProperty('configurable') ) { target.configurable = source.configurable; }
	return target;
}

                                                                                       
const { create: create$1 } = {
	create                                                          (proto          , descriptorMap     )                                                                  {
		if ( descriptorMap===undefined$1 ) { return newProxy(create(proto), new Keeper); }
		const target = create(proto);
		const keeper         = new Keeper;
		for ( let lastIndex         = arguments.length-1, index         = 1; ; descriptorMap = arguments[++index] ) {
			const keys = ownKeys(descriptorMap );
			for ( let length         = keys.length, index         = 0; index<length; ++index ) {
				const key = keys[index];
				defineProperty(target, key, ExternalDescriptor(descriptorMap [key]));
				keeper.add(key);
			}
			if ( index===lastIndex ) { return newProxy(target, keeper); }
		}
	}
};

/*¡ j-orderify */

function PlainTable ()        {
	return create(null);
}

function OrderedTable ()        {
	return create$1(null);
}

function isTable (value     )                 {
	return value!=null && getPrototypeOf(value)===null;
}

const slice = Array.prototype.slice;

/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：6.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var NT = /[\n\t]/g;

function Source (raw                       , substitutions                       )         {
	var source         = raw[0];
	for ( var length         = substitutions.length, index         = 0; index<length; ) {
		var substitution                  = substitutions[index];
		source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
	}
	return source.replace(NT, '');
}

                                                                                                     
function newRegExp (flags_template                               )                     {
	return typeof flags_template==='string'
		? function newRegExp (template                      )         {
			return new RegExp(
				/*#__PURE__*/Source(
					template.raw,
					/*#__PURE__*/slice.call(arguments, 1)
				),
				flags_template
			);
		}
		: new RegExp(
			/*#__PURE__*/Source(
				flags_template.raw,
				/*#__PURE__*/slice.call(arguments, 1)
			)
		);
}

var clearRegExp = '$_' in RegExp
	? function () {
		var REGEXP = /^/;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

/*¡ j-regexp */

/* nested (readable) */

const Whitespace = /[ \t]/;

const PRE_WHITESPACE = newRegExp`
	^${Whitespace}+`;

const VALUE_REST = newRegExp`
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	([^]*)
	$`;

const LITERAL_STRING = newRegExp`
	^
	'([^']*)'
	${Whitespace}*
	([^]*)`;

const MULTI_LINE_LITERAL_STRING = newRegExp`
	^
	([^]*?)
	'''
	${Whitespace}*
	([^]*)`;

const SYM_WHITESPACE = newRegExp`
	^
	[^]
	${Whitespace}*`;


const Tag = /[^<>\\"'`\r\n\u2028\u2029]+/;

const KEY_VALUE_PAIR = newRegExp`
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(
		[^ \t#]
		[^]*
	)
	$`;

const _VALUE_PAIR = newRegExp`
	^
	<(${Tag})>
	${Whitespace}*
	([^ \t#][^]*)
	$`;

const TAG_REST = newRegExp`
	^
	<(${Tag})>
	${Whitespace}*
	([^]*)
	$`;

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
function MULTI_LINE_BASIC_STRING_exec_0 (_        )         {
	for ( let _0         = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ = MULTI_LINE_BASIC_STRING.exec(_);
		if ( !$ ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[ \t]*\n[ \t\n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER        ;
function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_        )          {
	return _.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '')==='';
}

const BASIC_STRING_TAB______ = /^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING__________ = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_DEL______ = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_DEL_SLASH = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
let __BASIC_STRING        ;
function BASIC_STRING_exec (_2        )                           {
	_2 = _2.slice(1);
	for ( let _1         = ''; ; ) {
		const $ = __BASIC_STRING.exec(_2);
		if ( !$ ) {
			_2.startsWith('"') || throws(SyntaxError(where()));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const DOT_KEY = /^[ \t]*\.[ \t]*/;
const BARE_KEY_STRICT = /^[\w-]+/;
const BARE_KEY_FREE = /^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/;
let __BARE_KEY        ;
const LITERAL_KEY____ = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const LITERAL_KEY_DEL = /^'[^'\x00-\x08\x0B-\x1F]*'/;
let __LITERAL_KEY        ;
let supportArrayOfTables         ;

function TABLE_DEFINITION_exec_groups (_        )                                                                                    {
	const $_asArrayItem$$          = _.charAt(1)==='[';
	if ( $_asArrayItem$$ ) {
		supportArrayOfTables || throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2, which at ${where()}`));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys         = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_.startsWith(']') || throws(SyntaxError(where()));
	const $$asArrayItem$_          = _.charAt(1)===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( _.startsWith('<') ) { ( { 1: tag, 2: _ } = TAG_REST.exec(_) || throws(SyntaxError(where())) ); }
	else { tag = ''; }
	_==='' || _.startsWith('#') || throws(SyntaxError(where()));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
}

function KEY_VALUE_PAIR_exec_groups (_        )                                               {
	const _1         = getKeys(_);
	const $                  = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || throws(SyntaxError(where()));
	return { left: _1, tag: $[1] || '', right: $[2] };
}

function getKeys (_        )         {
	for ( let keys         = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key         = '"'; ; ) {
				const $ = __BASIC_STRING.exec(_);
				if ( !$ ) {
					_.startsWith('"') || throws(SyntaxError(where()));
					_ = _.slice(1);
					keys += key+'"';
					break;
				}
				_ = _.slice($[0].length);
				key += $[0];
			}
		}
		else {
			const key         = ( ( _.startsWith('\'') ? __LITERAL_KEY : __BARE_KEY ).exec(_) || throws(SyntaxError(where())) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ = DOT_KEY.exec(_);
		if ( !$ ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /[\x00-\x08\x0B-\x1F\x7F]/;
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /[\x00-\x08\x0B-\x1F]/;
let __CONTROL_CHARACTER_EXCLUDE        ;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\[^])*"|'[^']*'/g;
let __KEYS        ;

function switchRegExp (specificationVersion        )       {
	switch ( specificationVersion ) {
		case 1.0:
			__LITERAL_KEY = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING = BASIC_STRING_TAB______;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__LITERAL_KEY = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING = BASIC_STRING__________;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__LITERAL_KEY = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING = BASIC_STRING_DEL______;
			__BARE_KEY = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__LITERAL_KEY = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING = BASIC_STRING_DEL_SLASH;
			__BARE_KEY = BARE_KEY_FREE;
			__KEYS = KEYS_FREE;
			supportArrayOfTables = false;
	}
}

/* options */

let useWhatToJoinMultiLineString        ;
let usingBigInt                ;
let IntegerMin        ;
let IntegerMax        ;
                                                           
	                
	                 
	                
	               
	                
	                
      
	         
	          
     
	           
	              
   
let zeroDatetime         ;
let inlineTable         ;
let moreDatetime         ;
let disallowEmptyKey         ;
//export const xob :boolean = true;
let sError         ;
let sFloat         ;
let unreopenable         ;
                               
let Table             ;
let allowLonger         ;
let enableNull         ;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma         ;
                                  
let
	asNulls    ,
	asStrings    ,
	asTables    ,
	asArrays    ,
	asBooleans    ,
	asFloats    ,
	asIntegers    ,
	asOffsetDateTimes    ,
	asLocalDateTimes    ,
	asLocalDates    ,
	asLocalTimes    ;
const arrayTypes                     = new WeakMap;
let As                    = () => function as (array       )        {
	if ( arrayTypes.has(array) ) {
		arrayTypes.get(array)===as
		|| throws(TypeError(`Types in Array must be same. Check ${where()}`));
	}
	else { arrayTypes.set(array, as); }
	return array;
};
const
	asInlineArrayOfNulls     = As(),
	asInlineArrayOfStrings     = As(),
	asInlineArrayOfTables     = As(),
	asInlineArrayOfArrays     = As(),
	asInlineArrayOfBooleans     = As(),
	asInlineArrayOfFloats     = As(),
	asInlineArrayOfIntegers     = As(),
	asInlineArrayOfOffsetDateTimes     = As(),
	asInlineArrayOfLocalDateTimes     = As(),
	asInlineArrayOfLocalDates     = As(),
	asInlineArrayOfLocalTimes     = As();
As = null;

/* xOptions.mix */

const unType     = (array       )        => array;

/* xOptions.tag */

let processor             = null;

                                            
           
	                                                                                       
	                                                                                       
	                                                                                      
let collection         = [];
function collect_on (each      )       { collection.push(each); }
function collect_off (each      )        { throw throws(SyntaxError(where())); }
let collect                                         = collect_off;
function process () {
	let index = collection.length;
	if ( index ) {
		done();
		const process = processor ;
		const queue = collection;
		processor = null;
		collection = [];
		while ( index-- ) { process(queue.pop() ); }
	}
}

/* use & clear */

function clear ()       {
	processor = null;
	collection.length = 0;
}

function use (specificationVersion         , multiLineJoiner         , useBigInt         , xOptions          )       {
	
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
	switchRegExp(specificationVersion);
	
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
	
	let typify         ;
	
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

const Infinity = 1/0;

const NaN = 0/0;

const getTime = Date.prototype.getTime;

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = newRegExp`
	\d\d\d\d-
	(?:
		(?:0[13578]|1[02])-${_31_}
		|
		(?:0[469]|11)-${_30_}
		|
		02-${_29_}
	)`;

const HMS = newRegExp`
	${_23_}:${_59_}:${_59_}
	`;

const HMS_DOT = newRegExp`
	${HMS}
	(?:\.\d+)?
	`;

const OFFSET = /(?:Z|[+-]\d\d:\d\d)$/;

const OFFSET_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	${OFFSET}`;

const OFFSET_DATETIME_ZERO = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	Z$`;

const LOCAL_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	$`;

const LOCAL_DATE = newRegExp`
	^
	${YMD}
	$`;

const LOCAL_TIME = newRegExp`
	^
	${HMS_DOT}
	$`;

const DOT_ZERO = /\.?0+$/;

const literal_cache                            = new WeakMap;
const gotValue_cache                            = new WeakMap;
const dotValue_cache                            = new WeakMap;

const dotDescriptor = /*#__PURE__*/ assign(create(null), { value: '', writable: true, enumerable: false, configurable: true });
class Datetime extends Date {
	
	'.'        ;
	
	constructor (expression        , literal        , dotValue        ) {
		super(expression);
		literal_cache.set(this, literal);
		gotValue_cache.set(this, getTime.call(this));
		dotValue_cache.set(this, dotValue);
		defineProperty(this, '.', dotDescriptor);
		if ( dotValue ) { this['.'] = dotValue; }
	}
	
	toISOString (              )         {
		if ( getTime.call(this)===gotValue_cache.get(this) && this['.']===dotValue_cache.get(this) ) { return literal_cache.get(this) ; }
		throw Error('Datetime value has been modified.');
	}
	
	// toJSON() = toISOString()
	// getTime(){}
	// valueOf(){}
	// [Symbol.toPrimitive]('number') = valueOf()
	
}

class OffsetDateTime extends Datetime {
	constructor (literal        ) {
		( zeroDatetime ? OFFSET_DATETIME_ZERO : OFFSET_DATETIME ).test(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal} at ${where()}`));
		const index         = literal.lastIndexOf('.');
		super(literal.replace(' ', 'T'), literal, index<0 ? '' : literal.slice(index).replace(OFFSET, '').replace(DOT_ZERO, ''));
	}
}

class LocalDateTime extends Datetime {
	constructor (literal        ) {
		LOCAL_DATETIME.test(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal} at ${where()}`));
		const index         = literal.lastIndexOf('.');
		super(literal.replace(' ', 'T')+'Z', literal, index<0 ? '' : literal.slice(index).replace(DOT_ZERO, ''));
	}
}

class LocalDate extends Datetime {
	constructor (literal        ) {
		LOCAL_DATE.test(literal) || throws(SyntaxError(`Invalid Local Date ${literal} at ${where()}`));
		super(literal+'T00:00:00.000Z', literal, '');
	}
}

class LocalTime extends Datetime {
	constructor (literal        ) {
		LOCAL_TIME.test(literal) || throws(SyntaxError(`Invalid Local Time ${literal} at ${where()}`));
		const index         = literal.lastIndexOf('.');
		super('1970-01-01T'+literal+'Z', literal, index<0 ? '' : literal.slice(index).replace(DOT_ZERO, ''));
	}
}

const INTEGER_D = /[-+]?(?:0|[1-9]\d*(?:_\d+)*)/;
const D_INTEGER = newRegExp`^${INTEGER_D}$`;
const XOB_INTEGER = /^0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/;
const UNDERSCORES_SIGN = /_|^[-+]/g;

const Integer = (literal        ) => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	const bigInt         = BigIntInteger(literal);
	return IntegerMin<=bigInt && bigInt<=IntegerMax ? +( bigInt+'' ) : bigInt;
};

function BigIntInteger (literal        )         {
	D_INTEGER.test(literal)
	|| /*options\$0.xob && */XOB_INTEGER.test(literal)
	|| throws(SyntaxError(`Invalid Integer ${literal} at ${where()}`));
	let bigInt         = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal.startsWith('-') ) { bigInt = -bigInt; }
	allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal} meet at ${where()}`));
	return bigInt;
}

function NumberInteger (literal        )         {
	D_INTEGER.test(literal)
	|| /*options\$0.xob && */XOB_INTEGER.test(literal)
	|| throws(SyntaxError(`Invalid Integer ${literal} at ${where()}`));
	const number = literal.startsWith('-')
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	isSafeInteger(number)
	|| throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal} meet at ${where()}`));
	return number;
}

const FLOAT = newRegExp`
	^
	${INTEGER_D}
	(?=[.eE])
	(?:\.\d+(?:_\d+)*)?
	(?:[eE]${INTEGER_D})?
	$`;
const UNDERSCORES = /_/g;
const ZERO = /^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0)?$/;

const Float = (literal        )         => {
	if ( FLOAT.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		if ( sError ) {
			isFinite(number) || throws(RangeError(`Float has been as big as inf, like ${literal} at ${where()}`));
			number || ZERO.test(literal) || throws(RangeError(`Float has been as little as ${literal.startsWith('-') ? '-' : ''}0, like ${literal} at ${where()}`));
		}
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throw throws(SyntaxError(`Invalid Float ${literal} at ${where()}`));
};

const fromCodePoint = String.fromCodePoint;

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r', '"': '"', '/': '/', '\\': '\\' };

const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"btnfr/])|u(.{4})|U(.{8}))/g;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?: *(\n)[ \n]*|([\\"btnfr/])|u([^]{4})|U([^]{8}))/g;

const unEscapeSingleLine = (
	match        ,
	p1                                       ,
	p2                    ,
	p3                    
)         => {
	if ( p1 ) { return ESCAPE_ALIAS[p1]; }
	const codePoint         = parseInt(p2 ||         p3, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError('Invalid Unicode Scalar '+( p2 ? '\\u'+p2 : '\\U'+p3 )+' at '+where()));
	return fromCodePoint(codePoint);
};

const unEscapeMultiLine = (
	match        ,
	p1                  ,
	p2                                       ,
	p3                    ,
	p4                    
)         => {
	if ( match==='\n' ) { return useWhatToJoinMultiLineString; }
	if ( p1 ) { return ''; }
	if ( p2 ) { return ESCAPE_ALIAS[p2]; }
	const codePoint         = parseInt(p3 ||         p4, 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError('Invalid Unicode Scalar '+( p3 ? '\\u'+p3 : '\\U'+p4 )+' at '+where()));
	return fromCodePoint(codePoint);
};

const BasicString = (literal        )         => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

const MultiLineBasicString = (literal        )         => literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);

const sealedInline                 = new WeakSet;
const openTables                 = new WeakSet;
const reopenedTables                 = new WeakSet;

function appendTable (table       , key_key        , asArrayItem         , tag        )        {
	const leadingKeys                        = parseKeys(key_key);
	const finalKey         =         leadingKeys.pop();
	table = prepareTable(table, leadingKeys);
	let lastTable       ;
	if ( asArrayItem ) {
		let arrayOfTables         ;
		if ( finalKey in table ) { sealedInline.has(arrayOfTables = table[finalKey]) && throws(Error(`Trying to push Table to non-ArrayOfTables value at ${where()}`)); }
		else { arrayOfTables = table[finalKey] = []; }
		tag && collect({ table, key: finalKey, array: arrayOfTables, index: arrayOfTables.length, tag });
		arrayOfTables.push(lastTable = Table());
	}
	else {
		if ( finalKey in table ) {
			if ( unreopenable || !openTables.has(lastTable = table[finalKey]) || reopenedTables.has(lastTable) ) { throw throws(Error(`Duplicate Table definition at ${where()}`)); }
			openTables.delete(lastTable);
		}
		else {
			table[finalKey] = lastTable = Table();
			unreopenable || reopenedTables.add(lastTable);
		}
		tag && collect({ table, key: finalKey, array: undefined$1, index: undefined$1, tag });
	}
	return lastTable;
}

function parseKeys (key_key        ) {
	const keys =                        key_key.match(__KEYS);
	for ( let index         = keys.length; index--; ) {
		const key         = keys[index];
		if ( key.startsWith('\'') ) { keys[index] = key.slice(1, -1); }
		else if ( key.startsWith('"') ) { keys[index] = BasicString(key.slice(1, -1)); }
	}
	if ( disallowEmptyKey ) {
		for ( let index         = keys.length; index--; ) {
			keys[index] || throws(SyntaxError(`Empty key is not allowed before TOML v0.5, which at ${where()}`));
		}
	}
	return keys;
}

function prepareTable (table       , keys          )        {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++];
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				sealedInline.has(table) && throws(Error(`Trying to define Table under static Inline Table at ${where()}`));
			}
			else if ( isArray(table) ) {
				sealedInline.has(table) && throws(Error(`Trying to append value to static Inline Array at ${where()}`));
				table = table[( table              ).length-1];
			}
			else { throws(Error(`Trying to define Table under non-Table value at ${where()}`)); }
		}
		else {
			openTables.add(table = table[key] = Table());
			while ( index<length ) { openTables.add(table = table[keys[index++]] = Table()); }
			return table;
		}
	}
	return table;
}

function prepareInlineTable (table       , keys          )        {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++];
		if ( key in table ) {
			table = table[key];
			isTable(table) || throws(Error(`Trying to assign property through non-Table value at ${where()}`));
			sealedInline.has(table) && throws(Error(`Trying to assign property through static Inline Table at ${where()}`));
		}
		else {
			openTables.add(table = table[key] = Table());
			while ( index<length ) { openTables.add(table = table[keys[index++]] = Table()); }
			return table;
		}
	}
	return table;
}

function assignLiteralString (table       , finalKey        , literal        )         {
	let $;
	if ( literal.charAt(1)!=='\'' || literal.charAt(2)!=='\'' ) {
		$ = LITERAL_STRING.exec(literal) || throws(SyntaxError(where()));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	$ = MULTI_LINE_LITERAL_STRING.exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	if ( literal ) {
		checkLiteralString(literal);
		literal += useWhatToJoinMultiLineString;
	}
	const start         = mark();
	for ( ; ; ) {
		const line         = must('Literal String', start);
		$ = MULTI_LINE_LITERAL_STRING.exec(line);
		if ( $ ) {
			table[finalKey] = literal+checkLiteralString($[1]);
			return $[2];
		}
		literal += line+useWhatToJoinMultiLineString;
	}
}

function checkLiteralString (literal        )         {
	__CONTROL_CHARACTER_EXCLUDE.test(literal) && throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String, which was found at ${where()}`));
	return literal;
}

function assignBasicString (table       , finalKey        , literal        )         {
	if ( literal.charAt(1)!=='"' || literal.charAt(2)!=='"' ) {
		const $ = BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = MULTI_LINE_BASIC_STRING_exec_0(literal);
	if ( literal.startsWith('"""', $.length) ) {
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(where()));
		table[finalKey] = MultiLineBasicString($);
		return literal.slice($.length+3).replace(PRE_WHITESPACE, '');
	}
	if ( literal ) {
		literal += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throws(SyntaxError(where()));
	}
	const start         = mark();
	for ( ; ; ) {
		let line         = must('Basic String', start);
		const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
		if ( line.startsWith('"""', $.length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(where()));
			table[finalKey] = MultiLineBasicString(literal+$);
			return line.slice($.length+3).replace(PRE_WHITESPACE, '');
		}
		line += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throws(SyntaxError(where()));
		literal += line;
	}
}

function Root () {
	const rootTable        = Table();
	let lastSectionTable        = rootTable;
	while ( rest() ) {
		const line         = next().replace(PRE_WHITESPACE, '');
		if ( line==='' ) ;
		else if ( line.startsWith('#') ) ;
		else if ( line.startsWith('[') ) {
			const { $_asArrayItem$$, keys, $$asArrayItem$_, tag } = TABLE_DEFINITION_exec_groups(line);
			$_asArrayItem$$===$$asArrayItem$_ || throws(SyntaxError(`Square brackets of Table definition statement not match at ${where()}`));
			lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tag);
		}
		else {
			let rest         = assign$1(lastSectionTable, line);
			while ( stacks_length ) { rest = stacks_pop()(rest); }
			rest==='' || rest.startsWith('#') || throws(SyntaxError(where()));
		}
	}
	return rootTable;
}
function assign$1 (lastInlineTable       , lineRest        )         {
	const { left, tag } = { right: lineRest } = KEY_VALUE_PAIR_exec_groups(lineRest);
	const leadingKeys                        = parseKeys(left);
	const finalKey         =         leadingKeys.pop();
	const table        = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && throws(Error(`Duplicate property definition at ${where()}`));
	tag && collect({ table, key: finalKey, array: undefined$1, index: undefined$1, tag });
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '{':
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4, which at ${where()}`));
			stacks_push((lineRest        )         => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			stacks_push((lineRest        )         => equalInlineArray(table, finalKey, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where()));
	if ( sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			table[finalKey] = Infinity;
			return lineRest;
		}
		if ( literal==='-inf' ) {
			table[finalKey] = -Infinity;
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			table[finalKey] = NaN;
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( OFFSET.test(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError(where()));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(where()));
			table[finalKey] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		moreDatetime || throws(SyntaxError(where()));
		table[finalKey] = new LocalDate(literal);
		return lineRest;
	}
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
				literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
					enableNull && literal==='null' ? null :
						Integer(literal);
	return lineRest;
}

function push (lastArray       , lineRest        )         {
	if ( lineRest.startsWith('<') ) {
		const { 1: tag } = { 2: lineRest } = _VALUE_PAIR.exec(lineRest) || throws(SyntaxError(where()));
		collect({ table: undefined$1, key: undefined$1, array: lastArray, index: lastArray.length, tag });
	}
	const lastIndex         = ''+lastArray.length;
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(asStrings(lastArray), lastIndex, lineRest);
		case '"':
			return assignBasicString(asStrings(lastArray), lastIndex, lineRest);
		case '{':
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4, which at ${where()}`));
			stacks_push(lineRest => equalInlineTable(asTables(lastArray), lastIndex, lineRest));
			return lineRest;
		case '[':
			stacks_push(lineRest => equalInlineArray(asArrays(lastArray), lastIndex, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST.exec(lineRest) || throws(SyntaxError(where()));
	if ( sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			asFloats(lastArray).push(Infinity);
			return lineRest;
		}
		if ( literal==='-inf' ) {
			asFloats(lastArray).push(-Infinity);
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			asFloats(lastArray).push(NaN);
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( OFFSET.test(literal) ) {
				asOffsetDateTimes(lastArray).push(new OffsetDateTime(literal));
			}
			else {
				moreDatetime || throws(SyntaxError(where()));
				asLocalDateTimes(lastArray).push(new LocalDateTime(literal));
			}
		}
		else {
			moreDatetime || throws(SyntaxError(where()));
			asLocalTimes(lastArray).push(new LocalTime(literal));
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
		moreDatetime || throws(SyntaxError(where()));
		asLocalDates(lastArray).push(new LocalDate(literal));
		return lineRest;
	}
	if ( literal==='true' ) { asBooleans(lastArray).push(true); }
	else if ( literal==='false' ) { asBooleans(lastArray).push(false); }
	else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
		asFloats(lastArray).push(Float(literal));
	}
	else if ( enableNull && literal==='null' ) { asNulls(lastArray).push(null); }
	else { asIntegers(lastArray).push(Integer(literal)); }
	return lineRest;
}

function equalInlineTable (table       , finalKey        , lineRest        )         {
	const inlineTable        = table[finalKey] = Table();
	sealedInline.add(inlineTable);
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	if ( allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start         = mark();
		const length = stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				lineRest = assign$1(inlineTable, lineRest);
				if ( stacks_length>length ) {
					stacks_insertBeforeLast(function inserted (lineRest) {
						//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = must('Inline Table', start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
			}
		}(lineRest);
	}
	else {
		if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
		( lineRest==='' || lineRest.startsWith('#') ) && throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${where()}`));
		const length = stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = assign$1(inlineTable, lineRest);
				if ( stacks_length>length ) {
					stacks_insertBeforeLast(function inserted (lineRest) {
						//
						if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
						if ( lineRest.startsWith(',') ) {//
							lineRest = lineRest.replace(SYM_WHITESPACE, '');//
							lineRest.startsWith('}') && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma, which was found at ${where()}`));//
						}//
						( lineRest==='' || lineRest.startsWith('#') ) && throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${where()}`));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest.startsWith('}') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				if ( lineRest.startsWith(',') ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '');
					lineRest.startsWith('}') && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma, which was found at ${where()}`));
				}
				( lineRest==='' || lineRest.startsWith('#') ) && throws(SyntaxError(`Inline Table is intended to appear on a single line, which broken at ${where()}`));
			}
		}(lineRest);
	}
}

function equalInlineArray (table       , finalKey        , lineRest        )         {
	const inlineArray        = table[finalKey] = [];
	sealedInline.add(inlineArray);
	const start         = mark();
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	while ( lineRest==='' || lineRest.startsWith('#') ) {
		lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
	}
	if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
	const length = stacks_length;
	return function callee (lineRest) {
		for ( ; ; ) {
			lineRest = push(inlineArray, lineRest);
			if ( stacks_length>length ) {
				stacks_insertBeforeLast(function inserted (lineRest) {
					//
					while ( lineRest==='' || lineRest.startsWith('#') ) {//
						lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');//
					}//
					if ( lineRest.startsWith(',') ) {//
						lineRest = lineRest.replace(SYM_WHITESPACE, '');//
						while ( lineRest==='' || lineRest.startsWith('#') ) {//
							lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
					}//
					else {//
						if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
						throws(SyntaxError(where()));//
					}//
					//
					return callee(lineRest);
				});
				return lineRest;
			}
			while ( lineRest==='' || lineRest.startsWith('#') ) {
				lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest.startsWith(',') ) {
				lineRest = lineRest.replace(SYM_WHITESPACE, '');
				while ( lineRest==='' || lineRest.startsWith('#') ) {
					lineRest = must('Inline Array', start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest.startsWith(']') ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				throws(SyntaxError(where()));
			}
		}
	}(lineRest);
}

const RegExp_prototype = RegExp.prototype;

/*!
 * 模块名称：j-utf
 * 模块功能：UTF 相关共享实用程序。从属于“简计划”。
   　　　　　UTF util. Belong to "Plan J".
 * 模块版本：3.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-utf/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-utf/
 */

var NON_SCALAR = (
	'unicode' in RegExp_prototype
		? RegExp('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

/*¡ j-utf */

const BOM = '\uFEFF';

function parse (
	sourceContent                 ,
	specificationVersion                                   ,
	multiLineJoiner        ,
	useBigInt                   = true,
	xOptions                    
)        {
	could();
	if ( isBuffer(sourceContent) ) {
		const buffer         = sourceContent;
		sourceContent = buffer.toString();
		if ( !from(buffer).equals(buffer) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
		if ( sourceContent.startsWith(BOM) ) { sourceContent = sourceContent.slice(1); }
	}
	if ( typeof sourceContent!=='string' ) { throw TypeError('TOML.parse(sourceContent)'); }
	try {
		if ( NON_SCALAR.test(sourceContent) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
		try {
			use(specificationVersion, multiLineJoiner, useBigInt, xOptions);
			todo(sourceContent);
			try {
				const rootTable = Root();
				process();
				return rootTable;
			}
			finally { done(); }
		}
		finally { clear(); }
	}
	finally { clearRegExp(); }
}

const _default = Default({
	version,
	parse,
});

module.exports = _default;

//# sourceMappingURL=index.js.map