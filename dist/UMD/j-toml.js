/*!
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：0.5.106
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.TOML = factory());
}(this, function () { 'use strict';

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

	return _default;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi5CdWZmZXIuaXNCdWZmZXI/PSgpPT5mYWxzZSIsIml0ZXJhdG9yJDAudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9UYWJsZS50cyIsIi4uLy4uL2otcmVnZXhwL3NyYy9uZXdSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvY2xlYXJSZWdFeHAudHMiLCJyZWdleHBzJDAudHMiLCJvcHRpb25zJDAudHMiLCJ0eXBlcy9EYXRldGltZS50cyIsInR5cGVzL0ludGVnZXIudHMiLCJ0eXBlcy9GbG9hdC50cyIsInR5cGVzL1N0cmluZy50cyIsInBhcnNlL29uLXRoZS1zcG90LnRzIiwicGFyc2UvbGV2ZWwtbG9vcC50cyIsIi4uLy4uL2otdXRmL3NyYy9OT05fU0NBTEFSLnRzIiwicGFyc2UvLnRzIiwiZGVmYXVsdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMC41LjEwNic7IiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCdWZmZXIhPT0ndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIhPT11bmRlZmluZWQgPyBCdWZmZXIuaXNCdWZmZXIgOiAvKiNfX1BVUkVfXyovICgpPT5mYWxzZTsiLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuLy9pbXBvcnQgKiBhcyBvcHRpb25zXFwkMCBmcm9tICcuL29wdGlvbnNcXCQwJztcblxuXG5jb25zdCBOT05FICAgICAgICAgICA9IFtdO1xubGV0IHNvdXJjZUxpbmVzICAgICAgICAgICA9IE5PTkU7XG5sZXQgbGFzdExpbmVJbmRleCAgICAgICAgID0gLTE7XG5sZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcbiAgXG5mdW5jdGlvbiBub29wIChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuICcnOyB9XG5ub29wLnByZXZpb3VzID0gbm9vcDtcblxuZXhwb3J0IGxldCBzdGFja3NfbGVuZ3RoID0gMDtcbmxldCBsYXN0ICAgICAgID0gbm9vcDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY291bGQgKCkgICAgICAge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgdGhyb3cgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLicpOyB9XG59XG5cbmNvbnN0IEVPTCA9IC9cXHI/XFxuLztcbmV4cG9ydCBmdW5jdGlvbiB0b2RvIChzb3VyY2UgICAgICAgICkgICAgICAge1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoLTE7XG5cdGxpbmVJbmRleCA9IC0xO1xuXHRzdGFja3NfbGVuZ3RoID0gMDtcblx0bGFzdCA9IG5vb3A7XG59XG5cbmV4cG9ydCBjb25zdCBuZXh0ID0gKCkgICAgICAgICA9PiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF07XG5cbmV4cG9ydCBjb25zdCByZXN0ID0gKCkgICAgICAgICAgPT4gbGluZUluZGV4IT09bGFzdExpbmVJbmRleDtcblxuZXhwb3J0IGNvbnN0IG1hcmsgPSAoKSAgICAgICAgID0+IGxpbmVJbmRleDtcblxuZXhwb3J0IGZ1bmN0aW9uIG11c3QgKG1lc3NhZ2UgICAgICAgICwgc3RhcnRJbmRleCAgICAgICAgKSAgICAgICAgIHtcblx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleFxuXHQmJiB0aHJvd3MoU3ludGF4RXJyb3IobWVzc2FnZSsnIGlzIG5vdCBjbG9zZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBmaWxlLCB3aGljaCBzdGFydGVkIGZyb20gbGluZSAnKyggc3RhcnRJbmRleCsxICkrJzogJytzb3VyY2VMaW5lc1tzdGFydEluZGV4XSkpO1xuXHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdO1xufVxuXG5leHBvcnQgY29uc3Qgd2hlcmUgPSAoKSAgICAgICAgID0+ICdsaW5lICcrKCBsaW5lSW5kZXgrMSApKyc6ICcrc291cmNlTGluZXNbbGluZUluZGV4XTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRvbmUgKCkgICAgICAge1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG5cdGxhc3QgPSBub29wO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja3NfcG9wICgpICAgICAgIHtcblx0Y29uc3QgaXRlbSAgICAgICA9IGxhc3Q7XG5cdGxhc3QgPSAgICAgICBsYXN0LnByZXZpb3VzO1xuXHQtLXN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBpdGVtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tzX3B1c2ggKGl0ZW0gICAgICApICAgICAgIHtcblx0aXRlbS5wcmV2aW91cyA9IGxhc3Q7XG5cdGxhc3QgPSBpdGVtO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja3NfaW5zZXJ0QmVmb3JlTGFzdCAoaXRlbSAgICAgICkge1xuXHRpdGVtLnByZXZpb3VzID0gbGFzdC5wcmV2aW91cztcblx0bGFzdC5wcmV2aW91cyA9IGl0ZW07XG5cdCsrc3RhY2tzX2xlbmd0aDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dzIChlcnJvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHtcblx0XHRlcnJvci5saW5lSW5kZXggPSBsaW5lSW5kZXg7XG5cdFx0ZXJyb3IubGluZU51bWJlciA9IGxpbmVJbmRleCsxO1xuXHRcdC8vZG9uZSgpO1xuXHRcdC8vb3B0aW9uc1xcJDAuY2xlYXIoKTtcblx0fVxuXHR0aHJvdyBlcnJvcjtcbn1cbiIsImltcG9ydCBNYXAgZnJvbSAnLk1hcCc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHknO1xuaW1wb3J0IFJlZmxlY3RfYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IFJlZmxlY3RfY29uc3RydWN0IGZyb20gJy5SZWZsZWN0LmNvbnN0cnVjdCc7XG5pbXBvcnQgUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9zZXQgZnJvbSAnLlJlZmxlY3Quc2V0JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgU2V0IGZyb20gJy5TZXQnO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBLZWVwZXIgPSBTZXQ7XG5jb25zdCB0YXJnZXQya2VlcGVyICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBXZWFrTWFwO1xuY29uc3QgcHJveHkydGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtNYXA7XG5jb25zdCB0YXJnZXQycHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcblxuY29uc3Qgc2V0RGVzY3JpcHRvciA9IC8qI19fUFVSRV9fKi9PYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUobnVsbCksIHtcblx0dmFsdWU6IHVuZGVmaW5lZCxcblx0d3JpdGFibGU6IHRydWUsXG5cdGVudW1lcmFibGU6IHRydWUsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbn0pO1xuY29uc3QgaGFuZGxlcnMgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKG51bGwpLCB7XG5cdGFwcGx5IChGdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpc0FyZyAgICAgLCBhcmdzICAgICAgICkge1xuXHRcdHJldHVybiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KEZ1bmN0aW9uLCB0aGlzQXJnLCBhcmdzKSk7XG5cdH0sXG5cdGNvbnN0cnVjdCAoQ2xhc3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcmdzICAgICAgICwgbmV3VGFyZ2V0ICAgICApIHtcblx0XHRyZXR1cm4gb3JkZXJpZnkoUmVmbGVjdF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3MsIG5ld1RhcmdldCkpO1xuXHR9LFxuXHRkZWZpbmVQcm9wZXJ0eSAodGFyZ2V0ICAgICwga2V5ICAgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAge1xuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgUGFydGlhbERlc2NyaXB0b3IoZGVzY3JpcHRvcikpICkge1xuXHRcdFx0dGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAuYWRkKGtleSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRkZWxldGVQcm9wZXJ0eSAodGFyZ2V0ICAgICwga2V5ICAgICApICAgICAgICAgIHtcblx0XHRpZiAoIFJlZmxlY3RfZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpICkge1xuXHRcdFx0dGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAuZGVsZXRlKGtleSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzICh0YXJnZXQgICAgKSAgICAgICAge1xuXHRcdHJldHVybiBbIC4uLnRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgIF07XG5cdH0sXG5cdHNldCAodGFyZ2V0ICAgICwga2V5ICAgICAsIHZhbHVlICAgICAsIHJlY2VpdmVyICAgICkgICAgICAgICAge1xuXHRcdGlmICgga2V5IGluIHRhcmdldCApIHsgcmV0dXJuIFJlZmxlY3Rfc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpOyB9XG5cdFx0c2V0RGVzY3JpcHRvci52YWx1ZSA9IHZhbHVlO1xuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2V0RGVzY3JpcHRvcikgKSB7XG5cdFx0XHR0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIC5hZGQoa2V5KTtcblx0XHRcdHNldERlc2NyaXB0b3IudmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzZXREZXNjcmlwdG9yLnZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSxcbn0pO1xuXG5mdW5jdGlvbiBuZXdQcm94eSAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgLCBrZWVwZXIgICAgICAgICkgICAge1xuXHR0YXJnZXQya2VlcGVyLnNldCh0YXJnZXQsIGtlZXBlcik7XG5cdGNvbnN0IHByb3h5ICAgID0gbmV3IFByb3h5KHRhcmdldCwgaGFuZGxlcnMpO1xuXHRwcm94eTJ0YXJnZXQuc2V0KHByb3h5LCB0YXJnZXQpO1xuXHRyZXR1cm4gcHJveHk7XG59XG5cbmV4cG9ydCBjb25zdCB7IGlzT3JkZXJlZCB9ID0ge1xuXHRpc09yZGVyZWQgKG9iamVjdCAgICAgICAgKSAgICAgICAgICB7XG5cdFx0cmV0dXJuIHByb3h5MnRhcmdldC5oYXMob2JqZWN0KTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGlzIH0gPSB7XG5cdGlzIChvYmplY3QxICAgICAgICAsIG9iamVjdDIgICAgICAgICkgICAgICAgICAge1xuXHRcdHJldHVybiBPYmplY3RfaXMoXG5cdFx0XHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDEpIHx8IG9iamVjdDEsXG5cdFx0XHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDIpIHx8IG9iamVjdDIsXG5cdFx0KTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHsgb3JkZXJpZnkgfSA9IHtcblx0b3JkZXJpZnkgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAge1xuXHRcdGlmICggcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpICkgeyByZXR1cm4gb2JqZWN0OyB9XG5cdFx0bGV0IHByb3h5ICAgICAgICAgICAgICAgID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBwcm94eSApIHsgcmV0dXJuIHByb3h5OyB9XG5cdFx0cHJveHkgPSBuZXdQcm94eShvYmplY3QsIG5ldyBLZWVwZXIoUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpKTtcblx0XHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkpO1xuXHRcdHJldHVybiBwcm94eTtcblx0fVxufTtcbmZ1bmN0aW9uIGdldEludGVybmFsIChvYmplY3QgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRjb25zdCB0YXJnZXQgPSBwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdCk7XG5cdGlmICggdGFyZ2V0ICkgeyByZXR1cm4geyB0YXJnZXQsIGtlZXBlcjogdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAsIHByb3h5OiBvYmplY3QgfTsgfVxuXHRsZXQgcHJveHkgPSB0YXJnZXQycHJveHkuZ2V0KG9iamVjdCk7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiB7IHRhcmdldDogb2JqZWN0LCBrZWVwZXI6IHRhcmdldDJrZWVwZXIuZ2V0KG9iamVjdCkgLCBwcm94eSB9OyB9XG5cdGNvbnN0IGtlZXBlciAgICAgICAgID0gbmV3IEtlZXBlcihSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwga2VlcGVyKSk7XG5cdHJldHVybiB7IHRhcmdldDogb2JqZWN0LCBrZWVwZXIsIHByb3h5IH07XG59XG5cbmZ1bmN0aW9uIFBhcnRpYWxEZXNjcmlwdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgIHtcblx0Y29uc3QgdGFyZ2V0ICAgID0gT2JqZWN0X2NyZWF0ZShudWxsKTtcblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0dGFyZ2V0LnZhbHVlID0gc291cmNlLnZhbHVlO1xuXHRcdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0fVxuXHRlbHNlIGlmICggc291cmNlLmhhc093blByb3BlcnR5KCd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0ZWxzZSBpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnZ2V0JykgKSB7XG5cdFx0dGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7XG5cdFx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHR9XG5cdGVsc2UgaWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0cmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIEludGVybmFsRGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc291cmNlICAgKSAgICB7XG5cdGNvbnN0IHRhcmdldCAgICA9IE9iamVjdF9jcmVhdGUobnVsbCk7XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTtcblx0XHR0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7XG5cdFx0dGFyZ2V0LnNldCA9IHNvdXJjZS5zZXQ7XG5cdH1cblx0dGFyZ2V0LmVudW1lcmFibGUgPSBzb3VyY2UuZW51bWVyYWJsZTtcblx0dGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7XG5cdHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBFeHRlcm5hbERlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNvdXJjZSAgICkgICAge1xuXHRjb25zdCB0YXJnZXQgICAgPSBPYmplY3RfY3JlYXRlKG51bGwpO1xuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHsgdGFyZ2V0LnZhbHVlID0gc291cmNlLnZhbHVlOyB9XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ2dldCcpICkgeyB0YXJnZXQuZ2V0ID0gc291cmNlLmdldDsgfVxuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnc2V0JykgKSB7IHRhcmdldC5zZXQgPSBzb3VyY2Uuc2V0OyB9XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ2NvbmZpZ3VyYWJsZScpICkgeyB0YXJnZXQuY29uZmlndXJhYmxlID0gc291cmNlLmNvbmZpZ3VyYWJsZTsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgZGVzY3JpcHRvck1hcCAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRpZiAoIGRlc2NyaXB0b3JNYXA9PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvKSwgbmV3IEtlZXBlcik7IH1cblx0XHRjb25zdCB0YXJnZXQgPSBPYmplY3RfY3JlYXRlKHByb3RvKTtcblx0XHRjb25zdCBrZWVwZXIgICAgICAgICA9IG5ldyBLZWVwZXI7XG5cdFx0Zm9yICggbGV0IGxhc3RJbmRleCAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aC0xLCBpbmRleCAgICAgICAgID0gMTsgOyBkZXNjcmlwdG9yTWFwID0gYXJndW1lbnRzWysraW5kZXhdICkge1xuXHRcdFx0Y29uc3Qga2V5cyA9IFJlZmxlY3Rfb3duS2V5cyhkZXNjcmlwdG9yTWFwICk7XG5cdFx0XHRmb3IgKCBsZXQgbGVuZ3RoICAgICAgICAgPSBrZXlzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpbmRleF07XG5cdFx0XHRcdE9iamVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXAgW2tleV0pKTtcblx0XHRcdFx0a2VlcGVyLmFkZChrZXkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBpbmRleD09PWxhc3RJbmRleCApIHsgcmV0dXJuIG5ld1Byb3h5KHRhcmdldCwga2VlcGVyKTsgfVxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHsgdGFyZ2V0LCBrZWVwZXIsIHByb3h5IH0gPSBnZXRJbnRlcm5hbChvYmplY3QpO1xuXHRcdGZvciAoIGxldCBsYXN0SW5kZXggICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGgtMSwgaW5kZXggICAgICAgICA9IDE7IDsgZGVzY3JpcHRvck1hcCA9IGFyZ3VtZW50c1srK2luZGV4XSApIHtcblx0XHRcdGNvbnN0IGtleXMgPSBSZWZsZWN0X293bktleXMoZGVzY3JpcHRvck1hcCk7XG5cdFx0XHRmb3IgKCBsZXQgbGVuZ3RoICAgICAgICAgPSBrZXlzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpbmRleF07XG5cdFx0XHRcdE9iamVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSkpO1xuXHRcdFx0XHRrZWVwZXIuYWRkKGtleSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGluZGV4PT09bGFzdEluZGV4ICkgeyByZXR1cm4gcHJveHk7IH1cblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB7IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfSA9IHtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3RfY3JlYXRlKG51bGwpO1xuXHRcdGNvbnN0IGtlZXBlciAgICAgICAgID0gbmV3IEtlZXBlcjtcblx0XHRjb25zdCBrZXlzID0gUmVmbGVjdF9vd25LZXlzKG9iamVjdCk7XG5cdFx0Zm9yICggbGV0IGxlbmd0aCAgICAgICAgID0ga2V5cy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZXlzW2luZGV4XTtcblx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBJbnRlcm5hbERlc2NyaXB0b3IoT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSkgKTtcblx0XHRcdGtlZXBlci5hZGQoa2V5KTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JzLCBrZWVwZXIpO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBrZWVwZXJBZGRLZXlzIChrZWVwZXIgICAgICAgICwgb2JqZWN0ICAgICkgICAgICAge1xuXHRjb25zdCBrZXlzICAgICAgICA9IFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpO1xuXHRmb3IgKCBsZXQgbGVuZ3RoICAgICAgICAgPSBrZXlzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRrZWVwZXIuYWRkKGtleXNbaW5kZXhdKTtcblx0fVxufVxuZnVuY3Rpb24gTlVMTF9mcm9tIChzb3VyY2UgICAgICAgICAgICwgZGVmaW5lICAgICAgICAgKSAgICAgIHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShudWxsKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgPSBuZXcgS2VlcGVyO1xuXHRpZiAoIGRlZmluZSApIHtcblx0XHRpZiAoIGlzQXJyYXkoc291cmNlKSApIHtcblx0XHRcdGZvciAoIGxldCBsZW5ndGggICAgICAgICA9IHNvdXJjZS5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZVtpbmRleF0pO1xuXHRcdFx0XHRPYmplY3RfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIGRlc2NyaXB0b3JNYXApO1xuXHRcdFx0XHRrZWVwZXJBZGRLZXlzKGtlZXBlciwgZGVzY3JpcHRvck1hcCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKTtcblx0XHRcdE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgZGVzY3JpcHRvck1hcCk7XG5cdFx0XHRrZWVwZXJBZGRLZXlzKGtlZXBlciwgZGVzY3JpcHRvck1hcCk7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheShzb3VyY2UpICkge1xuXHRcdFx0T2JqZWN0X2Fzc2lnbih0YXJnZXQsIC4uLnNvdXJjZSk7XG5cdFx0XHRmb3IgKCBsZXQgbGVuZ3RoICAgICAgICAgPSBzb3VyY2UubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0XHRrZWVwZXJBZGRLZXlzKGtlZXBlciwgc291cmNlW2luZGV4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0T2JqZWN0X2Fzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG5cdFx0XHRrZWVwZXJBZGRLZXlzKGtlZXBlciwgc291cmNlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KHRhcmdldCwga2VlcGVyKTtcbn1cbmZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgTlVMTCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cbmV4cG9ydCBjb25zdCBOVUxMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9XG5cdC8qI19fUFVSRV9fKi9cblx0ZnVuY3Rpb24gKCAgICAgICAgICkge1xuXHRcdCd1c2Ugc3RyaWN0Jztcblx0XHRjb25zdCBOVUxMICAgICAgPSBmdW5jdGlvbiAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICBzb3VyY2UgICAgICAgICAgLCBkZWZpbmUgICAgICAgICAgKSAgICB7XG5cdFx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0XHQ/IG5ldy50YXJnZXQ9PT1OVUxMXG5cdFx0XHRcdFx0PyAvKiNfX1BVUkVfXyovIHRocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0XHQ6IC8qI19fUFVSRV9fKi8gbmV3UHJveHkodGhpcywgbmV3IEtlZXBlcilcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovIE5VTExfZnJvbShzb3VyY2UgLCBkZWZpbmUgKTtcblx0XHR9O1xuXHRcdE5VTEwucHJvdG90eXBlID0gbnVsbDtcblx0XHQvL2RlbGV0ZSBOVUxMLm5hbWU7XG5cdFx0Ly9kZWxldGUgTlVMTC5sZW5ndGg7XG5cdFx0T2JqZWN0X2ZyZWV6ZShOVUxMKTtcblx0XHRyZXR1cm4gTlVMTDtcblx0fSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBQcm9wZXJ0eUtleSAgICAgID1cblx0LyojX19QVVJFX18qLyBuZXcgUHJveHkoe30sIHsgZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAsIGtleSAgICAgKSAgICAgIHsgcmV0dXJuIGtleTsgfSB9KTtcbmV4cG9ydCBjb25zdCB7IGZyb21FbnRyaWVzIH0gPSB7XG5cdGZyb21FbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHByb3RvICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgICAgICAgICA9IG5ldyBLZWVwZXI7XG5cdFx0Y29uc3QgbWFwICAgICAgICAgICAgPSBuZXcgTWFwO1xuXHRcdGZvciAoIGxldCB7IDA6IGtleSwgMTogdmFsdWUgfSBvZiBlbnRyaWVzICkge1xuXHRcdFx0a2V5ID0gUHJvcGVydHlLZXlba2V5XTtcblx0XHRcdGtlZXBlci5hZGQoa2V5KTtcblx0XHRcdG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG5cdFx0fVxuXHRcdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhtYXApO1xuXHRcdHJldHVybiBuZXdQcm94eShcblx0XHRcdHByb3RvPT09dW5kZWZpbmVkID8gdGFyZ2V0IDpcblx0XHRcdFx0cHJvdG89PT1udWxsID8gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKG51bGwpLCB0YXJnZXQpIDpcblx0XHRcdFx0XHRPYmplY3RfY3JlYXRlKHRhcmdldCwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm90bykpLFxuXHRcdFx0a2VlcGVyXG5cdFx0KTtcblx0fVxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE5VTEwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcblxuaW1wb3J0ICogYXMgT3JkZXJlZCBmcm9tICdAbHRkL2otb3JkZXJpZnknO1xuXG5leHBvcnQgdmFyIFRhYmxlICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmV4cG9ydCBmdW5jdGlvbiBQbGFpblRhYmxlICgpICAgICAgICB7XG5cdHJldHVybiBjcmVhdGUobnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcmRlcmVkVGFibGUgKCkgICAgICAgIHtcblx0cmV0dXJuIE9yZGVyZWQuY3JlYXRlKG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUYWJsZSAodmFsdWUgICAgICkgICAgICAgICAgICAgICAgIHtcblx0cmV0dXJuIHZhbHVlIT1udWxsICYmIGdldFByb3RvdHlwZU9mKHZhbHVlKT09PW51bGw7XG59XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG52YXIgTlQgPSAvW1xcblxcdF0vZztcblxuZnVuY3Rpb24gU291cmNlIChyYXcgICAgICAgICAgICAgICAgICAgICAgICwgc3Vic3RpdHV0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIHNvdXJjZSAgICAgICAgID0gcmF3WzBdO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBzdWJzdGl0dXRpb25zLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0dmFyIHN1YnN0aXR1dGlvbiAgICAgICAgICAgICAgICAgID0gc3Vic3RpdHV0aW9uc1tpbmRleF07XG5cdFx0c291cmNlICs9ICggc3Vic3RpdHV0aW9uIGluc3RhbmNlb2YgUmVnRXhwID8gc3Vic3RpdHV0aW9uLnNvdXJjZSA6IHN1YnN0aXR1dGlvbiApK3Jhd1srK2luZGV4XTtcblx0fVxuXHRyZXR1cm4gc291cmNlLnJlcGxhY2UoTlQsICcnKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5ld1JlZ0V4cCAoZmxhZ3NfdGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgIHtcblx0cmV0dXJuIHR5cGVvZiBmbGFnc190ZW1wbGF0ZT09PSdzdHJpbmcnXG5cdFx0PyBmdW5jdGlvbiBuZXdSZWdFeHAgKHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChcblx0XHRcdFx0LyojX19QVVJFX18qL1NvdXJjZShcblx0XHRcdFx0XHR0ZW1wbGF0ZS5yYXcsXG5cdFx0XHRcdFx0LyojX19QVVJFX18qL3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRmbGFnc190ZW1wbGF0ZVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0OiBuZXcgUmVnRXhwKFxuXHRcdFx0LyojX19QVVJFX18qL1NvdXJjZShcblx0XHRcdFx0ZmxhZ3NfdGVtcGxhdGUucmF3LFxuXHRcdFx0XHQvKiNfX1BVUkVfXyovc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0XHQpXG5cdFx0KTtcbn07XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IHsgbmV3UmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5cbi8qIG5lc3RlZCAocmVhZGFibGUpICovXG5cbmNvbnN0IFdoaXRlc3BhY2UgPSAvWyBcXHRdLztcblxuZXhwb3J0IGNvbnN0IFBSRV9XSElURVNQQUNFID0gbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgO1xuXG5leHBvcnQgY29uc3QgVkFMVUVfUkVTVCA9IG5ld1JlZ0V4cGBcblx0XlxuXHQoXG5cdFx0KD86XFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQgXFxkKT9cblx0XHRbXFx3XFwtKy46XStcblx0KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoW15dKilcblx0JGA7XG5cbmV4cG9ydCBjb25zdCBMSVRFUkFMX1NUUklORyA9IG5ld1JlZ0V4cGBcblx0XlxuXHQnKFteJ10qKSdcblx0JHtXaGl0ZXNwYWNlfSpcblx0KFteXSopYDtcblxuZXhwb3J0IGNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkcgPSBuZXdSZWdFeHBgXG5cdF5cblx0KFteXSo/KVxuXHQnJydcblx0JHtXaGl0ZXNwYWNlfSpcblx0KFteXSopYDtcblxuZXhwb3J0IGNvbnN0IFNZTV9XSElURVNQQUNFID0gbmV3UmVnRXhwYFxuXHReXG5cdFteXVxuXHQke1doaXRlc3BhY2V9KmA7XG5cblxuY29uc3QgVGFnID0gL1tePD5cXFxcXCInYFxcclxcblxcdTIwMjhcXHUyMDI5XSsvO1xuXG5jb25zdCBLRVlfVkFMVUVfUEFJUiA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoXG5cdFx0W14gXFx0I11cblx0XHRbXl0qXG5cdClcblx0JGA7XG5cbmV4cG9ydCBjb25zdCBfVkFMVUVfUEFJUiA9IG5ld1JlZ0V4cGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdChbXiBcXHQjXVteXSopXG5cdCRgO1xuXG5jb25zdCBUQUdfUkVTVCA9IG5ld1JlZ0V4cGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdChbXl0qKVxuXHQkYDtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IC9eKD86W15cXFxcXCJdK3xcXFxcW15dfFwiXCI/KD8hXCIpKS87XG5leHBvcnQgZnVuY3Rpb24gTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wIChfICAgICAgICApICAgICAgICAge1xuXHRmb3IgKCBsZXQgXzAgICAgICAgICA9ICcnOyA7ICkge1xuXHRcdGlmICggXz09PScnICkgeyByZXR1cm4gXzA7IH1cblx0XHRjb25zdCAkID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkcuZXhlYyhfKTtcblx0XHRpZiAoICEkICkgeyByZXR1cm4gXzA7IH1cblx0XHRfMCArPSAkWzBdO1xuXHRcdF8gPSBfLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0fVxufVxuXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fID0gL1teXFxcXFxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFsgXFx0XSpcXG5bIFxcdFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfCAqXFxuWyBcXG5dKnx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX1NMQVNIID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcL118ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgICAgICAgIDtcbmV4cG9ydCBmdW5jdGlvbiBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCAoXyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiBfLnJlcGxhY2UoX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIsICcnKT09PScnO1xufVxuXG5jb25zdCBCQVNJQ19TVFJJTkdfVEFCX19fX19fID0gL14oPzpbXlxcXFxcIlxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS87XG5jb25zdCBCQVNJQ19TVFJJTkdfX19fX19fX19fID0gL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS87XG5jb25zdCBCQVNJQ19TVFJJTkdfREVMX19fX19fID0gL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS87XG5sZXQgX19CQVNJQ19TVFJJTkcgICAgICAgIDtcbmV4cG9ydCBmdW5jdGlvbiBCQVNJQ19TVFJJTkdfZXhlYyAoXzIgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdF8yID0gXzIuc2xpY2UoMSk7XG5cdGZvciAoIGxldCBfMSAgICAgICAgID0gJyc7IDsgKSB7XG5cdFx0Y29uc3QgJCA9IF9fQkFTSUNfU1RSSU5HLmV4ZWMoXzIpO1xuXHRcdGlmICggISQgKSB7XG5cdFx0XHRfMi5zdGFydHNXaXRoKCdcIicpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0cmV0dXJuIHsgMTogXzEsIDI6IF8yLnJlcGxhY2UoU1lNX1dISVRFU1BBQ0UsICcnKSB9O1xuXHRcdH1cblx0XHRfMSArPSAkWzBdO1xuXHRcdF8yID0gXzIuc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG59XG5cbmNvbnN0IERPVF9LRVkgPSAvXlsgXFx0XSpcXC5bIFxcdF0qLztcbmNvbnN0IEJBUkVfS0VZX1NUUklDVCA9IC9eW1xcdy1dKy87XG5jb25zdCBCQVJFX0tFWV9GUkVFID0gL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovO1xubGV0IF9fQkFSRV9LRVkgICAgICAgIDtcbmNvbnN0IExJVEVSQUxfS0VZX19fXyA9IC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy87XG5jb25zdCBMSVRFUkFMX0tFWV9ERUwgPSAvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLztcbmxldCBfX0xJVEVSQUxfS0VZICAgICAgICA7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgICAgICAgICA7XG5cbmV4cG9ydCBmdW5jdGlvbiBUQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzIChfICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRjb25zdCAkX2FzQXJyYXlJdGVtJCQgICAgICAgICAgPSBfLmNoYXJBdCgxKT09PSdbJztcblx0aWYgKCAkX2FzQXJyYXlJdGVtJCQgKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yLCB3aGljaCBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XyA9IF8uc2xpY2UoMik7XG5cdH1cblx0ZWxzZSB7IF8gPSBfLnNsaWNlKDEpOyB9XG5cdF8gPSBfLnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3Qga2V5cyAgICAgICAgID0gZ2V0S2V5cyhfKTtcblx0XyA9IF8uc2xpY2Uoa2V5cy5sZW5ndGgpLnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Xy5zdGFydHNXaXRoKCddJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdGNvbnN0ICQkYXNBcnJheUl0ZW0kXyAgICAgICAgICA9IF8uY2hhckF0KDEpPT09J10nO1xuXHRfID0gXy5zbGljZSgkJGFzQXJyYXlJdGVtJF8gPyAyIDogMSkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsZXQgdGFnICAgICAgICA7XG5cdGlmICggXy5zdGFydHNXaXRoKCc8JykgKSB7ICggeyAxOiB0YWcsIDI6IF8gfSA9IFRBR19SRVNULmV4ZWMoXykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0Xz09PScnIHx8IF8uc3RhcnRzV2l0aCgnIycpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRyZXR1cm4geyAkX2FzQXJyYXlJdGVtJCQsIGtleXMsICQkYXNBcnJheUl0ZW0kXywgdGFnIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRjb25zdCBfMSAgICAgICAgID0gZ2V0S2V5cyhfKTtcblx0Y29uc3QgJCAgICAgICAgICAgICAgICAgID0gS0VZX1ZBTFVFX1BBSVIuZXhlYyhfLnNsaWNlKF8xLmxlbmd0aCkpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRyZXR1cm4geyBsZWZ0OiBfMSwgdGFnOiAkWzFdIHx8ICcnLCByaWdodDogJFsyXSB9O1xufVxuXG5mdW5jdGlvbiBnZXRLZXlzIChfICAgICAgICApICAgICAgICAge1xuXHRmb3IgKCBsZXQga2V5cyAgICAgICAgID0gJyc7IDsgKSB7XG5cdFx0aWYgKCBfLnN0YXJ0c1dpdGgoJ1wiJykgKSB7XG5cdFx0XHRfID0gXy5zbGljZSgxKTtcblx0XHRcdGZvciAoIGxldCBrZXkgICAgICAgICA9ICdcIic7IDsgKSB7XG5cdFx0XHRcdGNvbnN0ICQgPSBfX0JBU0lDX1NUUklORy5leGVjKF8pO1xuXHRcdFx0XHRpZiAoICEkICkge1xuXHRcdFx0XHRcdF8uc3RhcnRzV2l0aCgnXCInKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHRcdFx0XHRfID0gXy5zbGljZSgxKTtcblx0XHRcdFx0XHRrZXlzICs9IGtleSsnXCInO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF8gPSBfLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0XHRcdFx0a2V5ICs9ICRbMF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggXy5zdGFydHNXaXRoKCdcXCcnKSA/IF9fTElURVJBTF9LRVkgOiBfX0JBUkVfS0VZICkuZXhlYyhfKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKSApWzBdO1xuXHRcdFx0XyA9IF8uc2xpY2Uoa2V5Lmxlbmd0aCk7XG5cdFx0XHRrZXlzICs9IGtleTtcblx0XHR9XG5cdFx0Y29uc3QgJCA9IERPVF9LRVkuZXhlYyhfKTtcblx0XHRpZiAoICEkICkgeyByZXR1cm4ga2V5czsgfVxuXHRcdF8gPSBfLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0XHRrZXlzICs9ICRbMF07XG5cdH1cbn1cblxuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fID0gL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdLztcbmNvbnN0IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTCA9IC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0vO1xuZXhwb3J0XG5sZXQgX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFICAgICAgICA7XG5jb25zdCBLRVlTX1NUUklDVCA9IC9bXFx3LV0rfFwiKD86W15cXFxcXCJdK3xcXFxcW15dKSpcInwnW14nXSonL2c7XG5jb25zdCBLRVlTX0ZSRUUgPSAvW14gXFx0Iz1bXFxdJ1wiLl0rKD86WyBcXHRdK1teIFxcdCM9W1xcXSdcIi5dKykqfFwiKD86W15cXFxcXCJdK3xcXFxcW15dKSpcInwnW14nXSonL2c7XG5leHBvcnRcbmxldCBfX0tFWVMgICAgICAgIDtcblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFJlZ0V4cCAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTElURVJBTF9LRVkgPSBMSVRFUkFMX0tFWV9fX187XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTElURVJBTF9LRVkgPSBMSVRFUkFMX0tFWV9fX187XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTElURVJBTF9LRVkgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19MSVRFUkFMX0tFWSA9IExJVEVSQUxfS0VZX0RFTDtcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERSA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVkgPSBCQVJFX0tFWV9GUkVFO1xuXHRcdFx0X19LRVlTID0gS0VZU19GUkVFO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSBmYWxzZTtcblx0fVxufVxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgTUFYX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE1JTl9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NSU5fU0FGRV9JTlRFR0VSJztcbmltcG9ydCB7IFRhYmxlIGFzIHR5cGVzVGFibGUsIFBsYWluVGFibGUsIE9yZGVyZWRUYWJsZSB9IGZyb20gJy4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4vcmVnZXhwcyQwJztcblxuLyogb3B0aW9ucyAqL1xuXG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgICAgICAgIDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWluICAgICAgICA7XG5leHBvcnQgbGV0IEludGVnZXJNYXggICAgICAgIDtcblxuLyogeE9wdGlvbnMgKi9cblxuZXhwb3J0IHZhciB4T3B0aW9ucyAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuICAgICAgXG5cdCAgICAgICAgIFxuXHQgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuICAgXG5leHBvcnQgbGV0IHplcm9EYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgaW5saW5lVGFibGUgICAgICAgICA7XG5leHBvcnQgbGV0IG1vcmVEYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWxsb3dFbXB0eUtleSAgICAgICAgIDtcbi8vZXhwb3J0IGNvbnN0IHhvYiA6Ym9vbGVhbiA9IHRydWU7XG5leHBvcnQgbGV0IHNFcnJvciAgICAgICAgIDtcbmV4cG9ydCBsZXQgc0Zsb2F0ICAgICAgICAgO1xuZXhwb3J0IGxldCB1bnJlb3BlbmFibGUgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5jb25zdCBhcnJheVR5cGVzICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcbmxldCBBcyAgICAgICAgICAgICAgICAgICAgPSAoKSA9PiBmdW5jdGlvbiBhcyAoYXJyYXkgICAgICAgKSAgICAgICAge1xuXHRpZiAoIGFycmF5VHlwZXMuaGFzKGFycmF5KSApIHtcblx0XHRhcnJheVR5cGVzLmdldChhcnJheSk9PT1hc1xuXHRcdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFR5cGVFcnJvcihgVHlwZXMgaW4gQXJyYXkgbXVzdCBiZSBzYW1lLiBDaGVjayAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdH1cblx0ZWxzZSB7IGFycmF5VHlwZXMuc2V0KGFycmF5LCBhcyk7IH1cblx0cmV0dXJuIGFycmF5O1xufTtcbmV4cG9ydCBjb25zdFxuXHRhc0lubGluZUFycmF5T2ZOdWxscyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZTdHJpbmdzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZlRhYmxlcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZBcnJheXMgICAgID0gQXMoKSxcblx0YXNJbmxpbmVBcnJheU9mQm9vbGVhbnMgICAgID0gQXMoKSxcblx0YXNJbmxpbmVBcnJheU9mRmxvYXRzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZkludGVnZXJzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZk9mZnNldERhdGVUaW1lcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZMb2NhbERhdGVUaW1lcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZMb2NhbERhdGVzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZkxvY2FsVGltZXMgICAgID0gQXMoKTtcbkFzID0gbnVsbDtcblxuLyogeE9wdGlvbnMubWl4ICovXG5cbmV4cG9ydCBjb25zdCB1blR5cGUgICAgID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IGFycmF5O1xuXG4vKiB4T3B0aW9ucy50YWcgKi9cblxubGV0IHByb2Nlc3NvciAgICAgICAgICAgICA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgID0gW107XG5mdW5jdGlvbiBjb2xsZWN0X29uIChlYWNoICAgICAgKSAgICAgICB7IGNvbGxlY3Rpb24ucHVzaChlYWNoKTsgfVxuZnVuY3Rpb24gY29sbGVjdF9vZmYgKGVhY2ggICAgICApICAgICAgICB7IHRocm93IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpOyB9XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyAoKSB7XG5cdGxldCBpbmRleCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXHRpZiAoIGluZGV4ICkge1xuXHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBwcm9jZXNzb3IgO1xuXHRcdGNvbnN0IHF1ZXVlID0gY29sbGVjdGlvbjtcblx0XHRwcm9jZXNzb3IgPSBudWxsO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHR3aGlsZSAoIGluZGV4LS0gKSB7IHByb2Nlc3MocXVldWUucG9wKCkgKTsgfVxuXHR9XG59XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhciAoKSAgICAgICB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpTGluZUpvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgIHtcblx0XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdGNhc2UgMC41OlxuXHRcdFx0bW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlMaW5lSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgPSBtdWx0aUxpbmVKb2luZXI7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLG11bHRpTGluZUpvaW5lciknKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT10cnVlICkgeyB1c2luZ0JpZ0ludCA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIHVzZUJpZ0ludD09PWZhbHNlICkgeyB1c2luZ0JpZ0ludCA9IGZhbHNlOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIHVzZUJpZ0ludCE9PSdudW1iZXInICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHRpZiAoIHVzZUJpZ0ludD49MCApIHsgSW50ZWdlck1pbiA9IC0oIEludGVnZXJNYXggPSB1c2VCaWdJbnQgKTsgfVxuXHRcdGVsc2UgeyBJbnRlZ2VyTWF4ID0gLSggSW50ZWdlck1pbiA9IHVzZUJpZ0ludCApLTE7IH1cblx0XHRpZiAoIEludGVnZXJNaW4gPCBNSU5fU0FGRV9JTlRFR0VSIHx8IE1BWF9TQUZFX0lOVEVHRVIgPCBJbnRlZ2VyTWF4ICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHR9XG5cdFxuXHRsZXQgdHlwaWZ5ICAgICAgICAgO1xuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCB8fCB4T3B0aW9ucz09PWZhbHNlICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdW5yZW9wZW5hYmxlID0gZmFsc2U7XG5cdFx0dHlwaWZ5ID0gdHJ1ZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHhPcHRpb25zPT09dHJ1ZSApIHtcblx0XHRUYWJsZSA9IE9yZGVyZWRUYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9IHNFcnJvciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdW5yZW9wZW5hYmxlID0gdHJ1ZTtcblx0XHR0eXBpZnkgPSBmYWxzZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiB4T3B0aW9ucz09PSdmdW5jdGlvbicgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHVucmVvcGVuYWJsZSA9IHRydWU7XG5cdFx0dHlwaWZ5ID0gZmFsc2U7XG5cdFx0cHJvY2Vzc29yID0geE9wdGlvbnM7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdH1cblx0ZWxzZSB7XG5cdFx0Y29uc3QgeyBvcmRlciwgbG9uZ2VyLCBleGFjdCwgbnVsbDogX251bGwsIG11bHRpLCBjbG9zZSwgbWl4LCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGlmICggb3duS2V5cyh1bmtub3duKS5sZW5ndGggKSB7IHRocm93IEVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICEhbG9uZ2VyO1xuXHRcdHNFcnJvciA9ICEhZXhhY3Q7XG5cdFx0ZW5hYmxlTnVsbCA9ICEhX251bGw7XG5cdFx0YWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9ICEhbXVsdGk7XG5cdFx0dW5yZW9wZW5hYmxlID0gISFjbG9zZTtcblx0XHR0eXBpZnkgPSAhbWl4O1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRcdGlmICggdHlwaWZ5ICkgeyB0aHJvdyBFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpIHhPcHRpb25zLnRhZyBuZWVkcyB4T3B0aW9ucy5taXggdG8gYmUgdHJ1ZScpOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRpZiAoIHR5cGlmeSApIHtcblx0XHRhc051bGxzID0gYXNJbmxpbmVBcnJheU9mTnVsbHM7XG5cdFx0YXNTdHJpbmdzID0gYXNJbmxpbmVBcnJheU9mU3RyaW5ncztcblx0XHRhc1RhYmxlcyA9IGFzSW5saW5lQXJyYXlPZlRhYmxlcztcblx0XHRhc0FycmF5cyA9IGFzSW5saW5lQXJyYXlPZkFycmF5cztcblx0XHRhc0Jvb2xlYW5zID0gYXNJbmxpbmVBcnJheU9mQm9vbGVhbnM7XG5cdFx0YXNGbG9hdHMgPSBhc0lubGluZUFycmF5T2ZGbG9hdHM7XG5cdFx0YXNJbnRlZ2VycyA9IGFzSW5saW5lQXJyYXlPZkludGVnZXJzO1xuXHRcdGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNJbmxpbmVBcnJheU9mT2Zmc2V0RGF0ZVRpbWVzO1xuXHRcdGFzTG9jYWxEYXRlVGltZXMgPSBhc0lubGluZUFycmF5T2ZMb2NhbERhdGVUaW1lcztcblx0XHRhc0xvY2FsRGF0ZXMgPSBhc0lubGluZUFycmF5T2ZMb2NhbERhdGVzO1xuXHRcdGFzTG9jYWxUaW1lcyA9IGFzSW5saW5lQXJyYXlPZkxvY2FsVGltZXM7XG5cdH1cblx0ZWxzZSB7XG5cdFx0YXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gdW5UeXBlO1xuXHR9XG5cdFxufVxuIiwiaW1wb3J0IHsgbmV3UmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgZ2V0VGltZSBmcm9tICcuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuXG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5cbmNvbnN0IF8yOV8gPSAvKD86MFsxLTldfDFcXGR8MlswLTldKS87XG5jb25zdCBfMzBfID0gLyg/OjBbMS05XXxbMTJdXFxkfDMwKS87XG5jb25zdCBfMzFfID0gLyg/OjBbMS05XXxbMTJdXFxkfDNbMDFdKS87XG5jb25zdCBfMjNfID0gLyg/OlswMV1cXGR8MlswLTNdKS87XG5jb25zdCBfNTlfID0gL1swLTVdXFxkLztcblxuY29uc3QgWU1EID0gbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdCg/OjBbMTM1NzhdfDFbMDJdKS0ke18zMV99XG5cdFx0fFxuXHRcdCg/OjBbNDY5XXwxMSktJHtfMzBffVxuXHRcdHxcblx0XHQwMi0ke18yOV99XG5cdClgO1xuXG5jb25zdCBITVMgPSBuZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5cdGA7XG5cbmNvbnN0IEhNU19ET1QgPSBuZXdSZWdFeHBgXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0YDtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCA9IC8oPzpafFsrLV1cXGRcXGQ6XFxkXFxkKSQvO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUUgPSBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVNfRE9UfVxuXHQke09GRlNFVH1gO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUVfWkVSTyA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU19ET1R9XG5cdFokYDtcblxuY29uc3QgTE9DQUxfREFURVRJTUUgPSBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVNfRE9UfVxuXHQkYDtcblxuY29uc3QgTE9DQUxfREFURSA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0JGA7XG5cbmNvbnN0IExPQ0FMX1RJTUUgPSBuZXdSZWdFeHBgXG5cdF5cblx0JHtITVNfRE9UfVxuXHQkYDtcblxuY29uc3QgRE9UX1pFUk8gPSAvXFwuPzArJC87XG5cbmNvbnN0IGxpdGVyYWxfY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcbmNvbnN0IGdvdFZhbHVlX2NhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtNYXA7XG5jb25zdCBkb3RWYWx1ZV9jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBXZWFrTWFwO1xuXG5jb25zdCBkb3REZXNjcmlwdG9yID0gLyojX19QVVJFX18qLyBhc3NpZ24oY3JlYXRlKG51bGwpLCB7IHZhbHVlOiAnJywgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG5jbGFzcyBEYXRldGltZSBleHRlbmRzIERhdGUge1xuXHRcblx0Jy4nICAgICAgICA7XG5cdFxuXHRjb25zdHJ1Y3RvciAoZXhwcmVzc2lvbiAgICAgICAgLCBsaXRlcmFsICAgICAgICAsIGRvdFZhbHVlICAgICAgICApIHtcblx0XHRzdXBlcihleHByZXNzaW9uKTtcblx0XHRsaXRlcmFsX2NhY2hlLnNldCh0aGlzLCBsaXRlcmFsKTtcblx0XHRnb3RWYWx1ZV9jYWNoZS5zZXQodGhpcywgZ2V0VGltZS5jYWxsKHRoaXMpKTtcblx0XHRkb3RWYWx1ZV9jYWNoZS5zZXQodGhpcywgZG90VmFsdWUpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICcuJywgZG90RGVzY3JpcHRvcik7XG5cdFx0aWYgKCBkb3RWYWx1ZSApIHsgdGhpc1snLiddID0gZG90VmFsdWU7IH1cblx0fVxuXHRcblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHRpZiAoIGdldFRpbWUuY2FsbCh0aGlzKT09PWdvdFZhbHVlX2NhY2hlLmdldCh0aGlzKSAmJiB0aGlzWycuJ109PT1kb3RWYWx1ZV9jYWNoZS5nZXQodGhpcykgKSB7IHJldHVybiBsaXRlcmFsX2NhY2hlLmdldCh0aGlzKSA7IH1cblx0XHR0aHJvdyBFcnJvcignRGF0ZXRpbWUgdmFsdWUgaGFzIGJlZW4gbW9kaWZpZWQuJyk7XG5cdH1cblx0XG5cdC8vIHRvSlNPTigpID0gdG9JU09TdHJpbmcoKVxuXHQvLyBnZXRUaW1lKCl7fVxuXHQvLyB2YWx1ZU9mKCl7fVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPSB2YWx1ZU9mKClcblx0XG59XG5cbmV4cG9ydCBjbGFzcyBPZmZzZXREYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdCggb3B0aW9ucyQwLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPIDogT0ZGU0VUX0RBVEVUSU1FICkudGVzdChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH0gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdGNvbnN0IGluZGV4ICAgICAgICAgPSBsaXRlcmFsLmxhc3RJbmRleE9mKCcuJyk7XG5cdFx0c3VwZXIobGl0ZXJhbC5yZXBsYWNlKCcgJywgJ1QnKSwgbGl0ZXJhbCwgaW5kZXg8MCA/ICcnIDogbGl0ZXJhbC5zbGljZShpbmRleCkucmVwbGFjZShPRkZTRVQsICcnKS5yZXBsYWNlKERPVF9aRVJPLCAnJykpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0TE9DQUxfREFURVRJTUUudGVzdChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0Y29uc3QgaW5kZXggICAgICAgICA9IGxpdGVyYWwubGFzdEluZGV4T2YoJy4nKTtcblx0XHRzdXBlcihsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpKydaJywgbGl0ZXJhbCwgaW5kZXg8MCA/ICcnIDogbGl0ZXJhbC5zbGljZShpbmRleCkucmVwbGFjZShET1RfWkVSTywgJycpKTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxEYXRlIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0TE9DQUxfREFURS50ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0c3VwZXIobGl0ZXJhbCsnVDAwOjAwOjAwLjAwMFonLCBsaXRlcmFsLCAnJyk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdExPQ0FMX1RJTUUudGVzdChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH0gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdGNvbnN0IGluZGV4ICAgICAgICAgPSBsaXRlcmFsLmxhc3RJbmRleE9mKCcuJyk7XG5cdFx0c3VwZXIoJzE5NzAtMDEtMDFUJytsaXRlcmFsKydaJywgbGl0ZXJhbCwgaW5kZXg8MCA/ICcnIDogbGl0ZXJhbC5zbGljZShpbmRleCkucmVwbGFjZShET1RfWkVSTywgJycpKTtcblx0fVxufVxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcblxuaW1wb3J0IHsgbmV3UmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1cXGQqKD86X1xcZCspKikvO1xuY29uc3QgRF9JTlRFR0VSID0gbmV3UmVnRXhwYF4ke0lOVEVHRVJfRH0kYDtcbmNvbnN0IFhPQl9JTlRFR0VSID0gL14wKD86eFswLTlBLUZhLWZdKyg/Ol9bMC05QS1GYS1mXSspKnxvWzAtN10rKD86X1swLTddKykqfGJbMDFdKyg/Ol9bMDFdKykqKSQvO1xuY29uc3QgVU5ERVJTQ09SRVNfU0lHTiA9IC9ffF5bLStdL2c7XG5cbmV4cG9ydCBjb25zdCBJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgPT4ge1xuXHRpZiAoIG9wdGlvbnMkMC51c2luZ0JpZ0ludD09PXRydWUgKSB7IHJldHVybiBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09ZmFsc2UgKSB7IHJldHVybiBOdW1iZXJJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gQmlnSW50SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIG9wdGlvbnMkMC5JbnRlZ2VyTWluPD1iaWdJbnQgJiYgYmlnSW50PD1vcHRpb25zJDAuSW50ZWdlck1heCA/ICsoIGJpZ0ludCsnJyApIDogYmlnSW50O1xufTtcblxuZnVuY3Rpb24gQmlnSW50SW50ZWdlciAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgIHtcblx0RF9JTlRFR0VSLnRlc3QobGl0ZXJhbClcblx0fHwgLypvcHRpb25zXFwkMC54b2IgJiYgKi9YT0JfSU5URUdFUi50ZXN0KGxpdGVyYWwpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdGxldCBiaWdJbnQgICAgICAgICA9IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJy0nKSApIHsgYmlnSW50ID0gLWJpZ0ludDsgfVxuXHRvcHRpb25zJDAuYWxsb3dMb25nZXJcblx0fHwgLTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IH5tYXggKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IH5taW4gKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGV4cGVjdCA2NCBiaXQgcmFuZ2UgKC05LDIyMywzNzIsMDM2LDg1NCw3NzUsODA4IHRvIDksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDcpLCBub3QgaW5jbHVkZXMgJHtsaXRlcmFsfSBtZWV0IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0cmV0dXJuIGJpZ0ludDtcbn1cblxuZnVuY3Rpb24gTnVtYmVySW50ZWdlciAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgIHtcblx0RF9JTlRFR0VSLnRlc3QobGl0ZXJhbClcblx0fHwgLypvcHRpb25zXFwkMC54b2IgJiYgKi9YT0JfSU5URUdFUi50ZXN0KGxpdGVyYWwpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdGNvbnN0IG51bWJlciA9IGxpdGVyYWwuc3RhcnRzV2l0aCgnLScpXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH0gbWVldCBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdHJldHVybiBudW1iZXI7XG59XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBpc0Zpbml0ZSBmcm9tICcuaXNGaW5pdGUnO1xuLy9pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5Jztcbi8vaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmNvbnN0IEZMT0FUID0gbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPz1bLmVFXSlcblx0KD86XFwuXFxkKyg/Ol9cXGQrKSopP1xuXHQoPzpbZUVdJHtJTlRFR0VSX0R9KT9cblx0JGA7XG5jb25zdCBVTkRFUlNDT1JFUyA9IC9fL2c7XG5jb25zdCBaRVJPID0gL15bLStdPzAoPzpcXC5bMF9dKyk/KD86W2VFXVstK10/MCk/JC87XG5cbmV4cG9ydCBjb25zdCBGbG9hdCA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIEZMT0FULnRlc3QobGl0ZXJhbCkgKSB7XG5cdFx0Y29uc3QgbnVtYmVyID0gK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpO1xuXHRcdGlmICggb3B0aW9ucyQwLnNFcnJvciApIHtcblx0XHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgYmlnIGFzIGluZiwgbGlrZSAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRcdG51bWJlciB8fCBaRVJPLnRlc3QobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgbGl0dGxlIGFzICR7bGl0ZXJhbC5zdGFydHNXaXRoKCctJykgPyAnLScgOiAnJ30wLCBsaWtlICR7bGl0ZXJhbH0gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVtYmVyO1xuXHR9XG5cdC8vaWYgKCBvcHRpb25zXFwkMC5zRmxvYXQgKSB7XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0Ly9cdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIC1JbmZpbml0eTsgfVxuXHQvL1x0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdC8vfVxuXHR0aHJvdyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcbn07XG4iLCJpbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgcGFyc2VJbnQgZnJvbSAnLnBhcnNlSW50JztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuY29uc3QgRVNDQVBFX0FMSUFTID0geyBiOiAnXFxiJywgdDogJ1xcdCcsIG46ICdcXG4nLCBmOiAnXFxmJywgcjogJ1xccicsICdcIic6ICdcIicsICcvJzogJy8nLCAnXFxcXCc6ICdcXFxcJyB9O1xuXG5jb25zdCBFU0NBUEVEX0lOX1NJTkdMRV9MSU5FID0gL1xcXFwoPzooW1xcXFxcImJ0bmZyL10pfHUoLns0fSl8VSguezh9KSkvZztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9cXG58XFxcXCg/OiAqKFxcbilbIFxcbl0qfChbXFxcXFwiYnRuZnIvXSl8dShbXl17NH0pfFUoW15dezh9KSkvZztcblxuY29uc3QgdW5Fc2NhcGVTaW5nbGVMaW5lID0gKFxuXHRtYXRjaCAgICAgICAgLFxuXHRwMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0cDIgICAgICAgICAgICAgICAgICAgICxcblx0cDMgICAgICAgICAgICAgICAgICAgIFxuKSAgICAgICAgID0+IHtcblx0aWYgKCBwMSApIHsgcmV0dXJuIEVTQ0FQRV9BTElBU1twMV07IH1cblx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwMiB8fCAgICAgICAgIHAzLCAxNik7XG5cdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoJ0ludmFsaWQgVW5pY29kZSBTY2FsYXIgJysoIHAyID8gJ1xcXFx1JytwMiA6ICdcXFxcVScrcDMgKSsnIGF0ICcraXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdHJldHVybiBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG59O1xuXG5jb25zdCB1bkVzY2FwZU11bHRpTGluZSA9IChcblx0bWF0Y2ggICAgICAgICxcblx0cDEgICAgICAgICAgICAgICAgICAsXG5cdHAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXHRwMyAgICAgICAgICAgICAgICAgICAgLFxuXHRwNCAgICAgICAgICAgICAgICAgICAgXG4pICAgICAgICAgPT4ge1xuXHRpZiAoIG1hdGNoPT09J1xcbicgKSB7IHJldHVybiBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZzsgfVxuXHRpZiAoIHAxICkgeyByZXR1cm4gJyc7IH1cblx0aWYgKCBwMiApIHsgcmV0dXJuIEVTQ0FQRV9BTElBU1twMl07IH1cblx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwMyB8fCAgICAgICAgIHA0LCAxNik7XG5cdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoJ0ludmFsaWQgVW5pY29kZSBTY2FsYXIgJysoIHAzID8gJ1xcXFx1JytwMyA6ICdcXFxcVScrcDQgKSsnIGF0ICcraXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdHJldHVybiBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG59O1xuXG5leHBvcnQgY29uc3QgQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IGxpdGVyYWwucmVwbGFjZShFU0NBUEVEX0lOX1NJTkdMRV9MSU5FLCB1bkVzY2FwZVNpbmdsZUxpbmUpO1xuXG5leHBvcnQgY29uc3QgTXVsdGlMaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IGxpdGVyYWwucmVwbGFjZShFU0NBUEVEX0lOX01VTFRJX0xJTkUsIHVuRXNjYXBlTXVsdGlMaW5lKTtcbiIsImltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCB7IFRhYmxlLCBpc1RhYmxlIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpTGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5cbmV4cG9ydCBjb25zdCBzZWFsZWRJbmxpbmUgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtTZXQ7XG5jb25zdCBvcGVuVGFibGVzICAgICAgICAgICAgICAgICA9IG5ldyBXZWFrU2V0O1xuY29uc3QgcmVvcGVuZWRUYWJsZXMgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtTZXQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRUYWJsZSAodGFibGUgICAgICAgLCBrZXlfa2V5ICAgICAgICAsIGFzQXJyYXlJdGVtICAgICAgICAgLCB0YWcgICAgICAgICkgICAgICAgIHtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgICAgICAgICAgICAgICA9IHBhcnNlS2V5cyhrZXlfa2V5KTtcblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9ICAgICAgICAgbGVhZGluZ0tleXMucG9wKCk7XG5cdHRhYmxlID0gcHJlcGFyZVRhYmxlKHRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgO1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7IHNlYWxlZElubGluZS5oYXMoYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsgfVxuXHRcdGVsc2UgeyBhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldID0gW107IH1cblx0XHR0YWcgJiYgb3B0aW9ucyQwLmNvbGxlY3QoeyB0YWJsZSwga2V5OiBmaW5hbEtleSwgYXJyYXk6IGFycmF5T2ZUYWJsZXMsIGluZGV4OiBhcnJheU9mVGFibGVzLmxlbmd0aCwgdGFnIH0pO1xuXHRcdGFycmF5T2ZUYWJsZXMucHVzaChsYXN0VGFibGUgPSBvcHRpb25zJDAuVGFibGUoKSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHtcblx0XHRcdGlmICggb3B0aW9ucyQwLnVucmVvcGVuYWJsZSB8fCAhb3BlblRhYmxlcy5oYXMobGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldKSB8fCByZW9wZW5lZFRhYmxlcy5oYXMobGFzdFRhYmxlKSApIHsgdGhyb3cgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBUYWJsZSBkZWZpbml0aW9uIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsgfVxuXHRcdFx0b3BlblRhYmxlcy5kZWxldGUobGFzdFRhYmxlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBsYXN0VGFibGUgPSBvcHRpb25zJDAuVGFibGUoKTtcblx0XHRcdG9wdGlvbnMkMC51bnJlb3BlbmFibGUgfHwgcmVvcGVuZWRUYWJsZXMuYWRkKGxhc3RUYWJsZSk7XG5cdFx0fVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh7IHRhYmxlLCBrZXk6IGZpbmFsS2V5LCBhcnJheTogdW5kZWZpbmVkLCBpbmRleDogdW5kZWZpbmVkLCB0YWcgfSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlS2V5cyAoa2V5X2tleSAgICAgICAgKSB7XG5cdGNvbnN0IGtleXMgPSAgICAgICAgICAgICAgICAgICAgICAgIGtleV9rZXkubWF0Y2gocmVnZXhwcyQwLl9fS0VZUyk7XG5cdGZvciAoIGxldCBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleF07XG5cdFx0aWYgKCBrZXkuc3RhcnRzV2l0aCgnXFwnJykgKSB7IGtleXNbaW5kZXhdID0ga2V5LnNsaWNlKDEsIC0xKTsgfVxuXHRcdGVsc2UgaWYgKCBrZXkuc3RhcnRzV2l0aCgnXCInKSApIHsga2V5c1tpbmRleF0gPSBCYXNpY1N0cmluZyhrZXkuc2xpY2UoMSwgLTEpKTsgfVxuXHR9XG5cdGlmICggb3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0Zm9yICggbGV0IGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRrZXlzW2luZGV4XSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjUsIHdoaWNoIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVUYWJsZSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgIHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0c2VhbGVkSW5saW5lLmhhcyh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgc3RhdGljIElubGluZSBUYWJsZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdHNlYWxlZElubGluZS5oYXModGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIHN0YXRpYyBJbmxpbmUgQXJyYXkgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgICAgICkubGVuZ3RoLTFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIG5vbi1UYWJsZSB2YWx1ZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcGVuVGFibGVzLmFkZCh0YWJsZSA9IHRhYmxlW2tleV0gPSBvcHRpb25zJDAuVGFibGUoKSk7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgb3BlblRhYmxlcy5hZGQodGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdXSA9IG9wdGlvbnMkMC5UYWJsZSgpKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlSW5saW5lVGFibGUgKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICApICAgICAgICB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXTtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggbm9uLVRhYmxlIHZhbHVlIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRcdHNlYWxlZElubGluZS5oYXModGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3BlblRhYmxlcy5hZGQodGFibGUgPSB0YWJsZVtrZXldID0gb3B0aW9ucyQwLlRhYmxlKCkpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IG9wZW5UYWJsZXMuYWRkKHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXV0gPSBvcHRpb25zJDAuVGFibGUoKSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduTGl0ZXJhbFN0cmluZyAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAge1xuXHRsZXQgJDtcblx0aWYgKCBsaXRlcmFsLmNoYXJBdCgxKSE9PSdcXCcnIHx8IGxpdGVyYWwuY2hhckF0KDIpIT09J1xcJycgKSB7XG5cdFx0JCA9IHJlZ2V4cHMkMC5MSVRFUkFMX1NUUklORy5leGVjKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0JCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HLmV4ZWMobGl0ZXJhbCk7XG5cdGlmICggJCApIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0aWYgKCBsaXRlcmFsICkge1xuXHRcdGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKTtcblx0XHRsaXRlcmFsICs9IG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ICAgICAgICAgPSBpdGVyYXRvciQwLm1hcmsoKTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdCgnTGl0ZXJhbCBTdHJpbmcnLCBzdGFydCk7XG5cdFx0JCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HLmV4ZWMobGluZSk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbGl0ZXJhbCtjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0XHRyZXR1cm4gJFsyXTtcblx0XHR9XG5cdFx0bGl0ZXJhbCArPSBsaW5lK29wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNoZWNrTGl0ZXJhbFN0cmluZyAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgIHtcblx0cmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERS50ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gYSBMaXRlcmFsIFN0cmluZywgd2hpY2ggd2FzIGZvdW5kIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0cmV0dXJuIGxpdGVyYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25CYXNpY1N0cmluZyAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAge1xuXHRpZiAoIGxpdGVyYWwuY2hhckF0KDEpIT09J1wiJyB8fCBsaXRlcmFsLmNoYXJBdCgyKSE9PSdcIicgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGl0ZXJhbCk7XG5cdGlmICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIlwiXCInLCAkLmxlbmd0aCkgKSB7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE11bHRpTGluZUJhc2ljU3RyaW5nKCQpO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKCQubGVuZ3RoKzMpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0aWYgKCBsaXRlcmFsICkge1xuXHRcdGxpdGVyYWwgKz0gJ1xcbic7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ICAgICAgICAgPSBpdGVyYXRvciQwLm1hcmsoKTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGxldCBsaW5lICAgICAgICAgPSBpdGVyYXRvciQwLm11c3QoJ0Jhc2ljIFN0cmluZycsIHN0YXJ0KTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaW5lKTtcblx0XHRpZiAoIGxpbmUuc3RhcnRzV2l0aCgnXCJcIlwiJywgJC5sZW5ndGgpICkge1xuXHRcdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTXVsdGlMaW5lQmFzaWNTdHJpbmcobGl0ZXJhbCskKTtcblx0XHRcdHJldHVybiBsaW5lLnNsaWNlKCQubGVuZ3RoKzMpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGxpbmUgKz0gJ1xcbic7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpbmUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdGxpdGVyYWwgKz0gbGluZTtcblx0fVxufVxuIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcbmltcG9ydCB7IHNlYWxlZElubGluZSwgYXBwZW5kVGFibGUsIHBhcnNlS2V5cywgcHJlcGFyZUlubGluZVRhYmxlLCBhc3NpZ25MaXRlcmFsU3RyaW5nLCBhc3NpZ25CYXNpY1N0cmluZyB9IGZyb20gJy4vb24tdGhlLXNwb3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb290ICgpIHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG9wdGlvbnMkMC5UYWJsZSgpO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IkMC5yZXN0KCkgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5uZXh0KCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmU9PT0nJyApIHsgfVxuXHRcdGVsc2UgaWYgKCBsaW5lLnN0YXJ0c1dpdGgoJyMnKSApIHsgfVxuXHRcdGVsc2UgaWYgKCBsaW5lLnN0YXJ0c1dpdGgoJ1snKSApIHtcblx0XHRcdGNvbnN0IHsgJF9hc0FycmF5SXRlbSQkLCBrZXlzLCAkJGFzQXJyYXlJdGVtJF8sIHRhZyB9ID0gcmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMobGluZSk7XG5cdFx0XHQkX2FzQXJyYXlJdGVtJCQ9PT0kJGFzQXJyYXlJdGVtJF8gfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFNxdWFyZSBicmFja2V0cyBvZiBUYWJsZSBkZWZpbml0aW9uIHN0YXRlbWVudCBub3QgbWF0Y2ggYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0bGFzdFNlY3Rpb25UYWJsZSA9IGFwcGVuZFRhYmxlKHJvb3RUYWJsZSwga2V5cywgJF9hc0FycmF5SXRlbSQkLCB0YWcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGxldCByZXN0ICAgICAgICAgPSBhc3NpZ24obGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHR3aGlsZSAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aCApIHsgcmVzdCA9IGl0ZXJhdG9yJDAuc3RhY2tzX3BvcCgpKHJlc3QpOyB9XG5cdFx0XHRyZXN0PT09JycgfHwgcmVzdC5zdGFydHNXaXRoKCcjJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG5mdW5jdGlvbiBhc3NpZ24gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAge1xuXHRjb25zdCB7IGxlZnQsIHRhZyB9ID0geyByaWdodDogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhsaW5lUmVzdCk7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICAgICAgICAgICAgICAgPSBwYXJzZUtleXMobGVmdCk7XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSAgICAgICAgIGxlYWRpbmdLZXlzLnBvcCgpO1xuXHRjb25zdCB0YWJsZSAgICAgICAgPSBwcmVwYXJlSW5saW5lVGFibGUobGFzdElubGluZVRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgcHJvcGVydHkgZGVmaW5pdGlvbiBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh7IHRhYmxlLCBrZXk6IGZpbmFsS2V5LCBhcnJheTogdW5kZWZpbmVkLCBpbmRleDogdW5kZWZpbmVkLCB0YWcgfSk7XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40LCB3aGljaCBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IGVxdWFsSW5saW5lVGFibGUodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaCgobGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiBlcXVhbElubGluZUFycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNULmV4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSAtSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE5hTjtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIE9GRlNFVC50ZXN0KGxpdGVyYWwpICkge1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJy0nKSApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdHRhYmxlW2ZpbmFsS2V5XSA9XG5cdFx0bGl0ZXJhbD09PSd0cnVlJyA/IHRydWUgOiBsaXRlcmFsPT09J2ZhbHNlJyA/IGZhbHNlIDpcblx0XHRcdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgPyBGbG9hdChsaXRlcmFsKSA6XG5cdFx0XHRcdFx0b3B0aW9ucyQwLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyA/IG51bGwgOlxuXHRcdFx0XHRcdFx0SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIGxpbmVSZXN0O1xufVxuXG5mdW5jdGlvbiBwdXNoIChsYXN0QXJyYXkgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgIHtcblx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCc8JykgKSB7XG5cdFx0Y29uc3QgeyAxOiB0YWcgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5fVkFMVUVfUEFJUi5leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHRvcHRpb25zJDAuY29sbGVjdCh7IHRhYmxlOiB1bmRlZmluZWQsIGtleTogdW5kZWZpbmVkLCBhcnJheTogbGFzdEFycmF5LCBpbmRleDogbGFzdEFycmF5Lmxlbmd0aCwgdGFnIH0pO1xuXHR9XG5cdGNvbnN0IGxhc3RJbmRleCAgICAgICAgID0gJycrbGFzdEFycmF5Lmxlbmd0aDtcblx0c3dpdGNoICggbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKG9wdGlvbnMkMC5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEluZGV4LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMkMC5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEluZGV4LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40LCB3aGljaCBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKGxpbmVSZXN0ID0+IGVxdWFsSW5saW5lVGFibGUob3B0aW9ucyQwLmFzVGFibGVzKGxhc3RBcnJheSksIGxhc3RJbmRleCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRjYXNlICdbJzpcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2gobGluZVJlc3QgPT4gZXF1YWxJbmxpbmVBcnJheShvcHRpb25zJDAuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEluZGV4LCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlZBTFVFX1JFU1QuZXhlYyhsaW5lUmVzdCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdGlmICggb3B0aW9ucyQwLnNGbG9hdCApIHtcblx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSkucHVzaChJbmZpbml0eSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpLnB1c2goLUluZmluaXR5KTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSkucHVzaChOYU4pO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggT0ZGU0VULnRlc3QobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyhsYXN0QXJyYXkpLnB1c2gobmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0XHRvcHRpb25zJDAuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpLnB1c2gobmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0XHRvcHRpb25zJDAuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSkucHVzaChuZXcgTG9jYWxUaW1lKGxpdGVyYWwpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnLScpICkge1xuXHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlcyhsYXN0QXJyYXkpLnB1c2gobmV3IExvY2FsRGF0ZShsaXRlcmFsKSk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbD09PSd0cnVlJyApIHsgb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KS5wdXNoKHRydWUpOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsPT09J2ZhbHNlJyApIHsgb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KS5wdXNoKGZhbHNlKTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgKSB7XG5cdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSkucHVzaChGbG9hdChsaXRlcmFsKSk7XG5cdH1cblx0ZWxzZSBpZiAoIG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IG9wdGlvbnMkMC5hc051bGxzKGxhc3RBcnJheSkucHVzaChudWxsKTsgfVxuXHRlbHNlIHsgb3B0aW9ucyQwLmFzSW50ZWdlcnMobGFzdEFycmF5KS5wdXNoKEludGVnZXIobGl0ZXJhbCkpOyB9XG5cdHJldHVybiBsaW5lUmVzdDtcbn1cblxuZnVuY3Rpb24gZXF1YWxJbmxpbmVUYWJsZSAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgIHtcblx0Y29uc3QgaW5saW5lVGFibGUgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gb3B0aW9ucyQwLlRhYmxlKCk7XG5cdHNlYWxlZElubGluZS5hZGQoaW5saW5lVGFibGUpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KCdJbmxpbmUgVGFibGUnLCBzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIFRhYmxlJywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdoaWxlICggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBUYWJsZScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnLCcpICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdH1cblx0XHR9KGxpbmVSZXN0KTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHQoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZSwgd2hpY2ggYnJva2VuIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCd9JykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnLCcpICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdC5zdGFydHNXaXRoKCd9JykgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYSwgd2hpY2ggd2FzIGZvdW5kIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHQoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZSwgd2hpY2ggYnJva2VuIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsvL1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHRcdGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hLCB3aGljaCB3YXMgZm91bmQgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lLCB3aGljaCBicm9rZW4gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0fVxuXHRcdH0obGluZVJlc3QpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVxdWFsSW5saW5lQXJyYXkgKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICB7XG5cdGNvbnN0IGlubGluZUFycmF5ICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IFtdO1xuXHRzZWFsZWRJbmxpbmUuYWRkKGlubGluZUFycmF5KTtcblx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSB7XG5cdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBBcnJheScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnXScpICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBmdW5jdGlvbiBjYWxsZWUgKGxpbmVSZXN0KSB7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0bGluZVJlc3QgPSBwdXNoKGlubGluZUFycmF5LCBsaW5lUmVzdCk7XG5cdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgey8vXG5cdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIEFycmF5Jywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJywnKSApIHsvL1xuXHRcdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KCdJbmxpbmUgQXJyYXknLCBzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ10nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGVsc2Ugey8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ10nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBBcnJheScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7XG5cdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIEFycmF5Jywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCddJykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCddJykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fShsaW5lUmVzdCk7XG59XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdCd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlXG5cdFx0PyBSZWdFeHAoJ1tcXFxcdUQ4MDAtXFxcXHVERkZGXScsICd1Jylcblx0XHQ6IC9bXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS9cbik7XG5cbi8vIFxcdXsxMTAwMDB9LVxcdXtGRkZGRkZGRn0gLT4gXFx1RkZGRFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy5CdWZmZXIuaXNCdWZmZXI/PSgpPT5mYWxzZSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCBSb290IGZyb20gJy4uL3BhcnNlL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5cbmltcG9ydCB7IGNsZWFyUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBOT05fU0NBTEFSIH0gZnJvbSAnQGx0ZC9qLXV0Zic7XG5cbmNvbnN0IEJPTSA9ICdcXHVGRUZGJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UgKFxuXHRzb3VyY2VDb250ZW50ICAgICAgICAgICAgICAgICAsXG5cdHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdG11bHRpTGluZUpvaW5lciAgICAgICAgLFxuXHR1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgPSB0cnVlLFxuXHR4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgXG4pICAgICAgICB7XG5cdGl0ZXJhdG9yJDAuY291bGQoKTtcblx0aWYgKCBpc0J1ZmZlcihzb3VyY2VDb250ZW50KSApIHtcblx0XHRjb25zdCBidWZmZXIgICAgICAgICA9IHNvdXJjZUNvbnRlbnQ7XG5cdFx0c291cmNlQ29udGVudCA9IGJ1ZmZlci50b1N0cmluZygpO1xuXHRcdGlmICggIWZyb20oYnVmZmVyKS5lcXVhbHMoYnVmZmVyKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJyk7IH1cblx0XHRpZiAoIHNvdXJjZUNvbnRlbnQuc3RhcnRzV2l0aChCT00pICkgeyBzb3VyY2VDb250ZW50ID0gc291cmNlQ29udGVudC5zbGljZSgxKTsgfVxuXHR9XG5cdGlmICggdHlwZW9mIHNvdXJjZUNvbnRlbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZUNvbnRlbnQpJyk7IH1cblx0dHJ5IHtcblx0XHRpZiAoIE5PTl9TQ0FMQVIudGVzdChzb3VyY2VDb250ZW50KSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuJyk7IH1cblx0XHR0cnkge1xuXHRcdFx0b3B0aW9ucyQwLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlMaW5lSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdGl0ZXJhdG9yJDAudG9kbyhzb3VyY2VDb250ZW50KTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRcdFx0b3B0aW9ucyQwLnByb2Nlc3MoKTtcblx0XHRcdFx0cmV0dXJuIHJvb3RUYWJsZTtcblx0XHRcdH1cblx0XHRcdGZpbmFsbHkgeyBpdGVyYXRvciQwLmRvbmUoKTsgfVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgb3B0aW9ucyQwLmNsZWFyKCk7IH1cblx0fVxuXHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxufTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcbn0pO1xuIl0sIm5hbWVzIjpbInVuZGVmaW5lZCIsIk9iamVjdF9hc3NpZ24iLCJPYmplY3RfY3JlYXRlIiwiUmVmbGVjdF9vd25LZXlzIiwiY3JlYXRlIiwiT2JqZWN0X2RlZmluZVByb3BlcnR5IiwiT3JkZXJlZC5jcmVhdGUiLCJpdGVyYXRvciQwLnRocm93cyIsIml0ZXJhdG9yJDAud2hlcmUiLCJpdGVyYXRvciQwLmRvbmUiLCJyZWdleHBzJDAuc3dpdGNoUmVnRXhwIiwib3B0aW9ucyQwLnplcm9EYXRldGltZSIsIm9wdGlvbnMkMC51c2luZ0JpZ0ludCIsIm9wdGlvbnMkMC5JbnRlZ2VyTWluIiwib3B0aW9ucyQwLkludGVnZXJNYXgiLCJvcHRpb25zJDAuYWxsb3dMb25nZXIiLCJvcHRpb25zJDAuc0Vycm9yIiwib3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmciLCJvcHRpb25zJDAuY29sbGVjdCIsIm9wdGlvbnMkMC5UYWJsZSIsIm9wdGlvbnMkMC51bnJlb3BlbmFibGUiLCJyZWdleHBzJDAuX19LRVlTIiwib3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkiLCJyZWdleHBzJDAuTElURVJBTF9TVFJJTkciLCJyZWdleHBzJDAuTVVMVElfTElORV9MSVRFUkFMX1NUUklORyIsIml0ZXJhdG9yJDAubWFyayIsIml0ZXJhdG9yJDAubXVzdCIsInJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUiLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wIiwicmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0IiwicmVnZXhwcyQwLlBSRV9XSElURVNQQUNFIiwiaXRlcmF0b3IkMC5yZXN0IiwiaXRlcmF0b3IkMC5uZXh0IiwicmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJhc3NpZ24iLCJpdGVyYXRvciQwLnN0YWNrc19sZW5ndGgiLCJpdGVyYXRvciQwLnN0YWNrc19wb3AiLCJyZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJvcHRpb25zJDAuaW5saW5lVGFibGUiLCJpdGVyYXRvciQwLnN0YWNrc19wdXNoIiwicmVnZXhwcyQwLlZBTFVFX1JFU1QiLCJvcHRpb25zJDAuc0Zsb2F0Iiwib3B0aW9ucyQwLm1vcmVEYXRldGltZSIsIm9wdGlvbnMkMC5lbmFibGVOdWxsIiwicmVnZXhwcyQwLl9WQUxVRV9QQUlSIiwib3B0aW9ucyQwLmFzU3RyaW5ncyIsIm9wdGlvbnMkMC5hc1RhYmxlcyIsIm9wdGlvbnMkMC5hc0FycmF5cyIsIm9wdGlvbnMkMC5hc0Zsb2F0cyIsIm9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZVRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zJDAuYXNCb29sZWFucyIsIm9wdGlvbnMkMC5hc051bGxzIiwib3B0aW9ucyQwLmFzSW50ZWdlcnMiLCJyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UiLCJvcHRpb25zJDAuYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIml0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QiLCJpdGVyYXRvciQwLmNvdWxkIiwib3B0aW9ucyQwLnVzZSIsIml0ZXJh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