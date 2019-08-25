/*!
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：0.5.107
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

	const version = '0.5.107';

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

	const create = Object.create;

	const Object_freeze = Object.freeze;

	const NULL = (
		/*! j-globals: null.prototype (internal) */
		Object.create
			? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
			: null
		/*¡ j-globals: null.prototype (internal) */
	);

	const Null = (
		/*! j-globals: null.constructor (internal) */
		/*#__PURE__*/ function () {
			var assign = Object.assign || function assign (target, source) {
				for ( var key in source ) {
					if ( hasOwnProperty.call(source, key) ) { target[key] = source[key]; }
				}
				return target;
			};
			var NULL$1 = function (object) {
				if ( object ) {
					return /*#__PURE__*/ assign(/*#__PURE__*/ create(NULL), object);
				}
			};
			delete NULL$1.name;
			//try { delete NULL.length; } catch (error) {}
			NULL$1.prototype = null;
			Object_freeze(NULL$1);
			return NULL$1;
		}()
		/*¡ j-globals: null.constructor (internal) */
	);

	const preventExtensions = Object.preventExtensions;

	const Object_assign = Object.assign;

	const defineProperty = Object.defineProperty;

	const Reflect_apply = Reflect.apply;

	const Reflect_construct = Reflect.construct;

	const Reflect_defineProperty = Reflect.defineProperty;

	const Reflect_deleteProperty = Reflect.deleteProperty;

	const Reflect_set = Reflect.set;

	const toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

	const seal = Object.seal;

	const Default = (
		/*! j-globals: default (internal) */
		function Default (exports, addOnOrigin) {
			return /*#__PURE__*/ function Module (exports, addOnOrigin) {
				if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
				if ( Object_assign ) { Object_assign(exports, addOnOrigin); }
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
	 * 模块版本：6.0.0
	 * 许可条款：LGPL-3.0
	 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
	 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
	 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
	 */

	const Keeper = Set;
	const target2keeper                          = new WeakMap;
	const proxy2target                         = new WeakMap;
	const target2proxy                         = new WeakMap;

	const setDescriptor = /*#__PURE__*/ Object_assign(create(NULL), {
		value: undefined$1,
		writable: true,
		enumerable: true,
		configurable: true,
	});
	const handlers = /*#__PURE__*/ Object_assign(create(NULL), {
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
		const proxy = new Proxy   (target, handlers);
		proxy2target.set(proxy, target);
		return proxy;
	}

	const { orderify } = {
		orderify                   (object   )    {
			if ( proxy2target.has(object) ) { return object; }
			let proxy = target2proxy.get(object)                 ;
			if ( proxy ) { return proxy; }
			proxy = newProxy(object, new Keeper(ownKeys(object)));
			target2proxy.set(object, proxy);
			return proxy;
		}
	};

	function PartialDescriptor                               (source   )    {
		const target = create(NULL)     ;
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

	const NULL$1 = /*#__PURE__*/ function (         ) {
		function throwConstructing ()        { throw TypeError(`Super constructor NULL cannot be invoked with 'new'`); }
		function throwApplying ()        { throw TypeError(`Super constructor NULL cannot be invoked without 'new'`); }
		function NULL$1 (            ) {
			return new.target
				? new.target===NULL$1
					? /*#__PURE__*/ throwConstructing()
					: /*#__PURE__*/ newProxy(this, new Keeper)
				: /*#__PURE__*/ throwApplying();
		}
		( NULL$1 ).prototype = null;
		defineProperty(NULL$1, 'name', Object_assign(create(NULL), { value: '' }));
		//delete NULL.length;
		Object_freeze(NULL$1);
		return NULL$1;
	}()                                           ;

	/*¡ j-orderify */

	const tables = new WeakSet;

	const PlainTable = /*#__PURE__*/ function () {
		class Table extends Null      {
			constructor () {
				super();
				tables.add(this);
			}
		}
		delete Table.prototype.constructor;
		preventExtensions(Table.prototype);
		return Table;
	}();

	const OrderedTable = /*#__PURE__*/ function () {
		class Table extends NULL$1      {
			constructor () {
				super();
				tables.add(this);
			}
		}
		delete Table.prototype.constructor;
		preventExtensions(Table.prototype);
		return Table;
	}();

	function isTable (value     )                 {
		return tables.has(value);
	}

	const slice = Array.prototype.slice;

	/*!
	 * 模块名称：j-regexp
	 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
	   　　　　　More readable way for creating RegExp. Belong to "Plan J".
	 * 模块版本：6.2.0
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
	                               
	let Table                 ;
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

	const dotDescriptor = Null({ value: '', writable: true, enumerable: false, configurable: true });
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

	const isArray = Array.isArray;

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
			arrayOfTables.push(lastTable = new Table);
		}
		else {
			if ( finalKey in table ) {
				if ( unreopenable || !openTables.has(lastTable = table[finalKey]) || reopenedTables.has(lastTable) ) { throw throws(Error(`Duplicate Table definition at ${where()}`)); }
				openTables.delete(lastTable);
			}
			else {
				table[finalKey] = lastTable = new Table;
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
				openTables.add(table = table[key] = new Table);
				while ( index<length ) { openTables.add(table = table[keys[index++]] = new Table); }
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
				openTables.add(table = table[key] = new Table);
				while ( index<length ) { openTables.add(table = table[keys[index++]] = new Table); }
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
		const rootTable        = new Table;
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
				let rest         = assign(lastSectionTable, line);
				while ( stacks_length ) { rest = stacks_pop()(rest); }
				rest==='' || rest.startsWith('#') || throws(SyntaxError(where()));
			}
		}
		return rootTable;
	}
	function assign (lastInlineTable       , lineRest        )         {
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
		const inlineTable        = table[finalKey] = new Table;
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
					lineRest = assign(inlineTable, lineRest);
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
					lineRest = assign(inlineTable, lineRest);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi5CdWZmZXIuaXNCdWZmZXI/PSgpPT5mYWxzZSIsIml0ZXJhdG9yJDAudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9UYWJsZS50cyIsIi4uLy4uL2otcmVnZXhwL3NyYy9uZXdSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvY2xlYXJSZWdFeHAudHMiLCJyZWdleHBzJDAudHMiLCJvcHRpb25zJDAudHMiLCJ0eXBlcy9EYXRldGltZS50cyIsInR5cGVzL0ludGVnZXIudHMiLCJ0eXBlcy9GbG9hdC50cyIsInR5cGVzL1N0cmluZy50cyIsInBhcnNlL29uLXRoZS1zcG90LnRzIiwicGFyc2UvbGV2ZWwtbG9vcC50cyIsIi4uLy4uL2otdXRmL3NyYy9OT05fU0NBTEFSLnRzIiwicGFyc2UvLnRzIiwiZGVmYXVsdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMC41LjEwNyc7IiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCdWZmZXIhPT0ndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIhPT11bmRlZmluZWQgPyBCdWZmZXIuaXNCdWZmZXIgOiAvKiNfX1BVUkVfXyovICgpPT5mYWxzZTsiLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuLy9pbXBvcnQgKiBhcyBvcHRpb25zXFwkMCBmcm9tICcuL29wdGlvbnNcXCQwJztcblxuXG5jb25zdCBOT05FICAgICAgICAgICA9IFtdO1xubGV0IHNvdXJjZUxpbmVzICAgICAgICAgICA9IE5PTkU7XG5sZXQgbGFzdExpbmVJbmRleCAgICAgICAgID0gLTE7XG5sZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcbiAgXG5mdW5jdGlvbiBub29wIChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuICcnOyB9XG5ub29wLnByZXZpb3VzID0gbm9vcDtcblxuZXhwb3J0IGxldCBzdGFja3NfbGVuZ3RoID0gMDtcbmxldCBsYXN0ICAgICAgID0gbm9vcDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY291bGQgKCkgICAgICAge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgdGhyb3cgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLicpOyB9XG59XG5cbmNvbnN0IEVPTCA9IC9cXHI/XFxuLztcbmV4cG9ydCBmdW5jdGlvbiB0b2RvIChzb3VyY2UgICAgICAgICkgICAgICAge1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoLTE7XG5cdGxpbmVJbmRleCA9IC0xO1xuXHRzdGFja3NfbGVuZ3RoID0gMDtcblx0bGFzdCA9IG5vb3A7XG59XG5cbmV4cG9ydCBjb25zdCBuZXh0ID0gKCkgICAgICAgICA9PiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF07XG5cbmV4cG9ydCBjb25zdCByZXN0ID0gKCkgICAgICAgICAgPT4gbGluZUluZGV4IT09bGFzdExpbmVJbmRleDtcblxuZXhwb3J0IGNvbnN0IG1hcmsgPSAoKSAgICAgICAgID0+IGxpbmVJbmRleDtcblxuZXhwb3J0IGZ1bmN0aW9uIG11c3QgKG1lc3NhZ2UgICAgICAgICwgc3RhcnRJbmRleCAgICAgICAgKSAgICAgICAgIHtcblx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleFxuXHQmJiB0aHJvd3MoU3ludGF4RXJyb3IobWVzc2FnZSsnIGlzIG5vdCBjbG9zZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBmaWxlLCB3aGljaCBzdGFydGVkIGZyb20gbGluZSAnKyggc3RhcnRJbmRleCsxICkrJzogJytzb3VyY2VMaW5lc1tzdGFydEluZGV4XSkpO1xuXHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdO1xufVxuXG5leHBvcnQgY29uc3Qgd2hlcmUgPSAoKSAgICAgICAgID0+ICdsaW5lICcrKCBsaW5lSW5kZXgrMSApKyc6ICcrc291cmNlTGluZXNbbGluZUluZGV4XTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRvbmUgKCkgICAgICAge1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG5cdGxhc3QgPSBub29wO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja3NfcG9wICgpICAgICAgIHtcblx0Y29uc3QgaXRlbSAgICAgICA9IGxhc3Q7XG5cdGxhc3QgPSAgICAgICBsYXN0LnByZXZpb3VzO1xuXHQtLXN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBpdGVtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tzX3B1c2ggKGl0ZW0gICAgICApICAgICAgIHtcblx0aXRlbS5wcmV2aW91cyA9IGxhc3Q7XG5cdGxhc3QgPSBpdGVtO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja3NfaW5zZXJ0QmVmb3JlTGFzdCAoaXRlbSAgICAgICkge1xuXHRpdGVtLnByZXZpb3VzID0gbGFzdC5wcmV2aW91cztcblx0bGFzdC5wcmV2aW91cyA9IGl0ZW07XG5cdCsrc3RhY2tzX2xlbmd0aDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dzIChlcnJvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHtcblx0XHRlcnJvci5saW5lSW5kZXggPSBsaW5lSW5kZXg7XG5cdFx0ZXJyb3IubGluZU51bWJlciA9IGxpbmVJbmRleCsxO1xuXHRcdC8vZG9uZSgpO1xuXHRcdC8vb3B0aW9uc1xcJDAuY2xlYXIoKTtcblx0fVxuXHR0aHJvdyBlcnJvcjtcbn1cbiIsImltcG9ydCBNYXAgZnJvbSAnLk1hcCc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgT2JqZWN0X2ZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5JztcbmltcG9ydCBSZWZsZWN0X2FwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5JztcbmltcG9ydCBSZWZsZWN0X2NvbnN0cnVjdCBmcm9tICcuUmVmbGVjdC5jb25zdHJ1Y3QnO1xuaW1wb3J0IFJlZmxlY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLlJlZmxlY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfZGVsZXRlUHJvcGVydHkgZnJvbSAnLlJlZmxlY3QuZGVsZXRlUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3Rfc2V0IGZyb20gJy5SZWZsZWN0LnNldCc7XG5pbXBvcnQgUmVmbGVjdF9vd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IFNldCBmcm9tICcuU2V0JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE51bGxfcHJvdG90eXBlIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBLZWVwZXIgPSBTZXQ7XG5jb25zdCB0YXJnZXQya2VlcGVyICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBXZWFrTWFwO1xuY29uc3QgcHJveHkydGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtNYXA7XG5jb25zdCB0YXJnZXQycHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcblxuY29uc3Qgc2V0RGVzY3JpcHRvciA9IC8qI19fUFVSRV9fKi8gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE51bGxfcHJvdG90eXBlKSwge1xuXHR2YWx1ZTogdW5kZWZpbmVkLFxuXHR3cml0YWJsZTogdHJ1ZSxcblx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxufSk7XG5jb25zdCBoYW5kbGVycyA9IC8qI19fUFVSRV9fKi8gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE51bGxfcHJvdG90eXBlKSwge1xuXHRhcHBseSAoRnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXNBcmcgICAgICwgYXJncyAgICAgICApIHtcblx0XHRyZXR1cm4gb3JkZXJpZnkoUmVmbGVjdF9hcHBseShGdW5jdGlvbiwgdGhpc0FyZywgYXJncykpO1xuXHR9LFxuXHRjb25zdHJ1Y3QgKENsYXNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICAgICAsIG5ld1RhcmdldCAgICAgKSB7XG5cdFx0cmV0dXJuIG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KENsYXNzLCBhcmdzLCBuZXdUYXJnZXQpKTtcblx0fSxcblx0ZGVmaW5lUHJvcGVydHkgKHRhcmdldCAgICAsIGtleSAgICAgLCBkZXNjcmlwdG9yICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0XHRpZiAoIFJlZmxlY3RfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIFBhcnRpYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgLmFkZChrZXkpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHkgKHRhcmdldCAgICAsIGtleSAgICAgKSAgICAgICAgICB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgLmRlbGV0ZShrZXkpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0b3duS2V5cyAodGFyZ2V0ICAgICkgICAgICAgIHtcblx0XHRyZXR1cm4gWyAuLi50YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICBdO1xuXHR9LFxuXHRzZXQgKHRhcmdldCAgICAsIGtleSAgICAgLCB2YWx1ZSAgICAgLCByZWNlaXZlciAgICApICAgICAgICAgIHtcblx0XHRpZiAoIGtleSBpbiB0YXJnZXQgKSB7IHJldHVybiBSZWZsZWN0X3NldCh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKTsgfVxuXHRcdHNldERlc2NyaXB0b3IudmFsdWUgPSB2YWx1ZTtcblx0XHRpZiAoIFJlZmxlY3RfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNldERlc2NyaXB0b3IpICkge1xuXHRcdFx0dGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAuYWRkKGtleSk7XG5cdFx0XHRzZXREZXNjcmlwdG9yLnZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0c2V0RGVzY3JpcHRvci52YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0sXG59KTtcblxuZnVuY3Rpb24gbmV3UHJveHkgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICApICAgIHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufVxuXG5leHBvcnQgY29uc3QgeyBpc09yZGVyZWQgfSA9IHtcblx0aXNPcmRlcmVkIChvYmplY3QgICAgICAgICkgICAgICAgICAge1xuXHRcdHJldHVybiBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBpcyB9ID0ge1xuXHRpcyAob2JqZWN0MSAgICAgICAgLCBvYmplY3QyICAgICAgICApICAgICAgICAgIHtcblx0XHRyZXR1cm4gT2JqZWN0X2lzKFxuXHRcdFx0cHJveHkydGFyZ2V0LmdldChvYmplY3QxKSB8fCBvYmplY3QxLFxuXHRcdFx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuXHRcdCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB7IG9yZGVyaWZ5IH0gPSB7XG5cdG9yZGVyaWZ5ICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgIHtcblx0XHRpZiAoIHByb3h5MnRhcmdldC5oYXMob2JqZWN0KSApIHsgcmV0dXJuIG9iamVjdDsgfVxuXHRcdGxldCBwcm94eSA9IHRhcmdldDJwcm94eS5nZXQob2JqZWN0KSAgICAgICAgICAgICAgICAgO1xuXHRcdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRcdHByb3h5ID0gbmV3UHJveHkob2JqZWN0LCBuZXcgS2VlcGVyKFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdFx0dGFyZ2V0MnByb3h5LnNldChvYmplY3QsIHByb3h5KTtcblx0XHRyZXR1cm4gcHJveHk7XG5cdH1cbn07XG5mdW5jdGlvbiBnZXRJbnRlcm5hbCAob2JqZWN0ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0Y29uc3QgdGFyZ2V0ID0gcHJveHkydGFyZ2V0LmdldChvYmplY3QpO1xuXHRpZiAoIHRhcmdldCApIHsgcmV0dXJuIHsgdGFyZ2V0LCBrZWVwZXI6IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgLCBwcm94eTogb2JqZWN0IH07IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpO1xuXHRpZiAoIHByb3h5ICkgeyByZXR1cm4geyB0YXJnZXQ6IG9iamVjdCwga2VlcGVyOiB0YXJnZXQya2VlcGVyLmdldChvYmplY3QpICwgcHJveHkgfTsgfVxuXHRjb25zdCBrZWVwZXIgICAgICAgICA9IG5ldyBLZWVwZXIoUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpO1xuXHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkgPSBuZXdQcm94eShvYmplY3QsIGtlZXBlcikpO1xuXHRyZXR1cm4geyB0YXJnZXQ6IG9iamVjdCwga2VlcGVyLCBwcm94eSB9O1xufVxuXG5mdW5jdGlvbiBQYXJ0aWFsRGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc291cmNlICAgKSAgICB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9jcmVhdGUoTnVsbF9wcm90b3R5cGUpICAgICA7XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTtcblx0XHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdH1cblx0ZWxzZSBpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGVsc2UgaWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ2dldCcpICkge1xuXHRcdHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0O1xuXHRcdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdzZXQnKSApIHsgdGFyZ2V0LnNldCA9IHNvdXJjZS5zZXQ7IH1cblx0fVxuXHRlbHNlIGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdzZXQnKSApIHsgdGFyZ2V0LnNldCA9IHNvdXJjZS5zZXQ7IH1cblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ2VudW1lcmFibGUnKSApIHsgdGFyZ2V0LmVudW1lcmFibGUgPSBzb3VyY2UuZW51bWVyYWJsZTsgfVxuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBJbnRlcm5hbERlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNvdXJjZSAgICkgICAge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfY3JlYXRlKE51bGxfcHJvdG90eXBlKSAgICAgO1xuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHR0YXJnZXQudmFsdWUgPSBzb3VyY2UudmFsdWU7XG5cdFx0dGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0O1xuXHRcdHRhcmdldC5zZXQgPSBzb3VyY2Uuc2V0O1xuXHR9XG5cdHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7XG5cdHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlO1xuXHRyZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gRXh0ZXJuYWxEZXNjcmlwdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgIHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOdWxsX3Byb3RvdHlwZSkgICAgIDtcblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBzb3VyY2UuaGFzT3duUHJvcGVydHkoJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRpZiAoIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSgnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggc291cmNlLmhhc093blByb3BlcnR5KCdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgeyBjcmVhdGUgfSA9IHtcblx0Y3JlYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm90byAgICAgICAgICAsIGRlc2NyaXB0b3JNYXAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aDwyICkgeyByZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBuZXcgS2VlcGVyKTsgfVxuXHRcdGNvbnN0IGtlZXBlciAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBLZWVwZXI7XG5cdFx0ZGVzY3JpcHRvck1hcCA9IGFyZ3VtZW50c1swXSA9IG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTnVsbF9wcm90b3R5cGUpLCBrZWVwZXIpICAgICAgO1xuXHRcdFJlZmxlY3RfYXBwbHkoT2JqZWN0X2Fzc2lnbiwgbnVsbCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdGNvbnN0IHRhcmdldCA9IE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXAgKSAgICAgICA7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtlZXBlciApIHtcblx0XHRcdGRlc2NyaXB0b3JNYXAgW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcCBba2V5XSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdQcm94eSh0YXJnZXQsIGtlZXBlcik7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBkZWZpbmVQcm9wZXJ0aWVzIH0gPSB7XG5cdGRlZmluZVByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3QgICAsIGRlc2NyaXB0b3JNYXAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB7IHRhcmdldCwga2VlcGVyLCBwcm94eSB9ID0gZ2V0SW50ZXJuYWwob2JqZWN0KTtcblx0XHRmb3IgKCBsZXQgbGFzdEluZGV4ICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoLTEsIGluZGV4ICAgICAgICAgPSAxOyA7IGRlc2NyaXB0b3JNYXAgPSBhcmd1bWVudHNbKytpbmRleF0gKSB7XG5cdFx0XHRjb25zdCBrZXlzID0gUmVmbGVjdF9vd25LZXlzKGRlc2NyaXB0b3JNYXApO1xuXHRcdFx0Zm9yICggbGV0IGxlbmd0aCAgICAgICAgID0ga2V5cy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaW5kZXhdO1xuXHRcdFx0XHRPYmplY3RfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIEV4dGVybmFsRGVzY3JpcHRvcihkZXNjcmlwdG9yTWFwW2tleV0pKTtcblx0XHRcdFx0a2VlcGVyLmFkZChrZXkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBpbmRleD09PWxhc3RJbmRleCApIHsgcmV0dXJuIHByb3h5OyB9XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgeyBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIH0gPSB7XG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0X2NyZWF0ZShOdWxsX3Byb3RvdHlwZSkgICAgICAgO1xuXHRcdGNvbnN0IGtlZXBlciAgICAgICAgID0gbmV3IEtlZXBlcjtcblx0XHRjb25zdCBrZXlzID0gUmVmbGVjdF9vd25LZXlzKG9iamVjdCk7XG5cdFx0Zm9yICggbGV0IGxlbmd0aCAgICAgICAgID0ga2V5cy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZXlzW2luZGV4XTtcblx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBJbnRlcm5hbERlc2NyaXB0b3IoT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSkgKTtcblx0XHRcdGtlZXBlci5hZGQoa2V5KTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JzLCBrZWVwZXIpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgTlVMTCA9IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCAgICAgICAgICkge1xuXHRmdW5jdGlvbiB0aHJvd0NvbnN0cnVjdGluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE5VTEwgY2Fubm90IGJlIGludm9rZWQgd2l0aCAnbmV3J2ApOyB9XG5cdGZ1bmN0aW9uIHRocm93QXBwbHlpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOVUxMIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydgKTsgfVxuXHRmdW5jdGlvbiBOVUxMICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0PyBuZXcudGFyZ2V0PT09TlVMTFxuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi8gdGhyb3dDb25zdHJ1Y3RpbmcoKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi8gbmV3UHJveHkodGhpcywgbmV3IEtlZXBlcilcblx0XHRcdDogLyojX19QVVJFX18qLyB0aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0KCBOVUxMICkucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE5VTEwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE51bGxfcHJvdG90eXBlKSwgeyB2YWx1ZTogJycgfSkpO1xuXHQvL2RlbGV0ZSBOVUxMLmxlbmd0aDtcblx0T2JqZWN0X2ZyZWV6ZShOVUxMKTtcblx0cmV0dXJuIE5VTEw7XG59KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBQcm9wZXJ0eUtleSAgICAgID0gLyojX19QVVJFX18qLyBuZXcgUHJveHkoe30sIHsgZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAsIGtleSAgICAgKSAgICAgIHsgcmV0dXJuIGtleTsgfSB9KTtcbmV4cG9ydCBjb25zdCB7IGZyb21FbnRyaWVzIH0gPSB7XG5cdGZyb21FbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHByb3RvICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgICAgICAgICA9IG5ldyBLZWVwZXI7XG5cdFx0Y29uc3QgbWFwICAgICAgICAgICAgPSBuZXcgTWFwO1xuXHRcdGZvciAoIGxldCB7IDA6IGtleSwgMTogdmFsdWUgfSBvZiBlbnRyaWVzICkge1xuXHRcdFx0a2V5ID0gUHJvcGVydHlLZXlba2V5XTtcblx0XHRcdGtlZXBlci5hZGQoa2V5KTtcblx0XHRcdG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG5cdFx0fVxuXHRcdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhtYXApO1xuXHRcdHJldHVybiBuZXdQcm94eShcblx0XHRcdHByb3RvPT09dW5kZWZpbmVkID8gdGFyZ2V0IDpcblx0XHRcdFx0cHJvdG89PT1udWxsID8gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKHByb3RvKSAgICAgICAsIHRhcmdldCkgOlxuXHRcdFx0XHRcdE9iamVjdF9jcmVhdGUodGFyZ2V0LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHByb3RvKSksXG5cdFx0XHRrZWVwZXJcblx0XHQpO1xuXHR9XG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TlVMTCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcblxuaW1wb3J0IHsgTlVMTCB9IGZyb20gJ0BsdGQvai1vcmRlcmlmeSc7XG5cbmV4cG9ydCB2YXIgVGFibGUgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0O1xuXG5leHBvcnQgY29uc3QgUGxhaW5UYWJsZSA9IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCkge1xuXHRjbGFzcyBUYWJsZSBleHRlbmRzIE51bGwgICAgICB7XG5cdFx0Y29uc3RydWN0b3IgKCkge1xuXHRcdFx0c3VwZXIoKTtcblx0XHRcdHRhYmxlcy5hZGQodGhpcyk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZSBUYWJsZS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdHByZXZlbnRFeHRlbnNpb25zKFRhYmxlLnByb3RvdHlwZSk7XG5cdHJldHVybiBUYWJsZTtcbn0oKTtcblxuZXhwb3J0IGNvbnN0IE9yZGVyZWRUYWJsZSA9IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCkge1xuXHRjbGFzcyBUYWJsZSBleHRlbmRzIE5VTEwgICAgICB7XG5cdFx0Y29uc3RydWN0b3IgKCkge1xuXHRcdFx0c3VwZXIoKTtcblx0XHRcdHRhYmxlcy5hZGQodGhpcyk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZSBUYWJsZS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdHByZXZlbnRFeHRlbnNpb25zKFRhYmxlLnByb3RvdHlwZSk7XG5cdHJldHVybiBUYWJsZTtcbn0oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGFibGUgKHZhbHVlICAgICApICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiB0YWJsZXMuaGFzKHZhbHVlKTtcbn1cbiIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLkFycmF5LnByb3RvdHlwZS5zbGljZSc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XS9nO1xuXG5mdW5jdGlvbiBTb3VyY2UgKHJhdyAgICAgICAgICAgICAgICAgICAgICAgLCBzdWJzdGl0dXRpb25zICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgc291cmNlICAgICAgICAgPSByYXdbMF07XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHN1YnN0aXR1dGlvbnMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyApIHtcblx0XHR2YXIgc3Vic3RpdHV0aW9uICAgICAgICAgICAgICAgICAgPSBzdWJzdGl0dXRpb25zW2luZGV4XTtcblx0XHRzb3VyY2UgKz0gKCBzdWJzdGl0dXRpb24gaW5zdGFuY2VvZiBSZWdFeHAgPyBzdWJzdGl0dXRpb24uc291cmNlIDogc3Vic3RpdHV0aW9uICkrcmF3WysraW5kZXhdO1xuXHR9XG5cdHJldHVybiBzb3VyY2UucmVwbGFjZShOVCwgJycpO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmV3UmVnRXhwIChmbGFnc190ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIGZsYWdzX3RlbXBsYXRlPT09J3N0cmluZydcblx0XHQ/IGZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKFxuXHRcdFx0XHQvKiNfX1BVUkVfXyovU291cmNlKFxuXHRcdFx0XHRcdHRlbXBsYXRlLnJhdyxcblx0XHRcdFx0XHQvKiNfX1BVUkVfXyovc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGZsYWdzX3RlbXBsYXRlXG5cdFx0XHQpO1xuXHRcdH1cblx0XHQ6IG5ldyBSZWdFeHAoXG5cdFx0XHQvKiNfX1BVUkVfXyovU291cmNlKFxuXHRcdFx0XHRmbGFnc190ZW1wbGF0ZS5yYXcsXG5cdFx0XHRcdC8qI19fUFVSRV9fKi9zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRcdClcblx0XHQpO1xufTtcbiIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgeyBuZXdSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi9pdGVyYXRvciQwJztcblxuLyogbmVzdGVkIChyZWFkYWJsZSkgKi9cblxuY29uc3QgV2hpdGVzcGFjZSA9IC9bIFxcdF0vO1xuXG5leHBvcnQgY29uc3QgUFJFX1dISVRFU1BBQ0UgPSBuZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2A7XG5cbmV4cG9ydCBjb25zdCBWQUxVRV9SRVNUID0gbmV3UmVnRXhwYFxuXHReXG5cdChcblx0XHQoPzpcXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCBcXGQpP1xuXHRcdFtcXHdcXC0rLjpdK1xuXHQpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdChbXl0qKVxuXHQkYDtcblxuZXhwb3J0IGNvbnN0IExJVEVSQUxfU1RSSU5HID0gbmV3UmVnRXhwYFxuXHReXG5cdCcoW14nXSopJ1xuXHQke1doaXRlc3BhY2V9KlxuXHQoW15dKilgO1xuXG5leHBvcnQgY29uc3QgTVVMVElfTElORV9MSVRFUkFMX1NUUklORyA9IG5ld1JlZ0V4cGBcblx0XlxuXHQoW15dKj8pXG5cdCcnJ1xuXHQke1doaXRlc3BhY2V9KlxuXHQoW15dKilgO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSBuZXdSZWdFeHBgXG5cdF5cblx0W15dXG5cdCR7V2hpdGVzcGFjZX0qYDtcblxuXG5jb25zdCBUYWcgPSAvW148PlxcXFxcIidgXFxyXFxuXFx1MjAyOFxcdTIwMjldKy87XG5cbmNvbnN0IEtFWV9WQUxVRV9QQUlSID0gbmV3UmVnRXhwYFxuXHReXG5cdCR7V2hpdGVzcGFjZX0qXG5cdD1cblx0JHtXaGl0ZXNwYWNlfSpcblx0KD86XG5cdFx0PCgke1RhZ30pPlxuXHRcdCR7V2hpdGVzcGFjZX0qXG5cdCk/XG5cdChcblx0XHRbXiBcXHQjXVxuXHRcdFteXSpcblx0KVxuXHQkYDtcblxuZXhwb3J0IGNvbnN0IF9WQUxVRV9QQUlSID0gbmV3UmVnRXhwYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KFteIFxcdCNdW15dKilcblx0JGA7XG5cbmNvbnN0IFRBR19SRVNUID0gbmV3UmVnRXhwYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KFteXSopXG5cdCRgO1xuXG4vKiBvcHRpbWl6ZWQgKGF2b2lkIG92ZXJmbG93IG9yIGxvc3QpICovXG5cbmNvbnN0IE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HID0gL14oPzpbXlxcXFxcIl0rfFxcXFxbXl18XCJcIj8oPyFcIikpLztcbmV4cG9ydCBmdW5jdGlvbiBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAgKF8gICAgICAgICkgICAgICAgICB7XG5cdGZvciAoIGxldCBfMCAgICAgICAgID0gJyc7IDsgKSB7XG5cdFx0aWYgKCBfPT09JycgKSB7IHJldHVybiBfMDsgfVxuXHRcdGNvbnN0ICQgPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IHJldHVybiBfMDsgfVxuXHRcdF8wICs9ICRbMF07XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG59XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18WyBcXHRdKlxcblsgXFx0XFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiAgICAgICAgO1xuZXhwb3J0IGZ1bmN0aW9uIEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0IChfICAgICAgICApICAgICAgICAgIHtcblx0cmV0dXJuIF8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpPT09Jyc7XG59XG5cbmNvbnN0IEJBU0lDX1NUUklOR19UQUJfX19fX18gPSAvXig/OlteXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkpLztcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkpLztcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfX19fX18gPSAvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS87XG5jb25zdCBCQVNJQ19TVFJJTkdfREVMX1NMQVNIID0gL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcL118dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkpLztcbmxldCBfX0JBU0lDX1NUUklORyAgICAgICAgO1xuZXhwb3J0IGZ1bmN0aW9uIEJBU0lDX1NUUklOR19leGVjIChfMiAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XzIgPSBfMi5zbGljZSgxKTtcblx0Zm9yICggbGV0IF8xICAgICAgICAgPSAnJzsgOyApIHtcblx0XHRjb25zdCAkID0gX19CQVNJQ19TVFJJTkcuZXhlYyhfMik7XG5cdFx0aWYgKCAhJCApIHtcblx0XHRcdF8yLnN0YXJ0c1dpdGgoJ1wiJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0XHRyZXR1cm4geyAxOiBfMSwgMjogXzIucmVwbGFjZShTWU1fV0hJVEVTUEFDRSwgJycpIH07XG5cdFx0fVxuXHRcdF8xICs9ICRbMF07XG5cdFx0XzIgPSBfMi5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdH1cbn1cblxuY29uc3QgRE9UX0tFWSA9IC9eWyBcXHRdKlxcLlsgXFx0XSovO1xuY29uc3QgQkFSRV9LRVlfU1RSSUNUID0gL15bXFx3LV0rLztcbmNvbnN0IEJBUkVfS0VZX0ZSRUUgPSAvXlteIFxcdCM9W1xcXSdcIi5dKyg/OlsgXFx0XStbXiBcXHQjPVtcXF0nXCIuXSspKi87XG5sZXQgX19CQVJFX0tFWSAgICAgICAgO1xuY29uc3QgTElURVJBTF9LRVlfX19fID0gL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSonLztcbmNvbnN0IExJVEVSQUxfS0VZX0RFTCA9IC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZdKicvO1xubGV0IF9fTElURVJBTF9LRVkgICAgICAgIDtcbmxldCBzdXBwb3J0QXJyYXlPZlRhYmxlcyAgICAgICAgIDtcblxuZXhwb3J0IGZ1bmN0aW9uIFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgKF8gICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdGNvbnN0ICRfYXNBcnJheUl0ZW0kJCAgICAgICAgICA9IF8uY2hhckF0KDEpPT09J1snO1xuXHRpZiAoICRfYXNBcnJheUl0ZW0kJCApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQXJyYXkgb2YgVGFibGVzIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjIsIHdoaWNoIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRfID0gXy5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgXyA9IF8uc2xpY2UoMSk7IH1cblx0XyA9IF8ucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRjb25zdCBrZXlzICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRfID0gXy5zbGljZShrZXlzLmxlbmd0aCkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRfLnN0YXJ0c1dpdGgoJ10nKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0Y29uc3QgJCRhc0FycmF5SXRlbSRfICAgICAgICAgID0gXy5jaGFyQXQoMSk9PT0nXSc7XG5cdF8gPSBfLnNsaWNlKCQkYXNBcnJheUl0ZW0kXyA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBfLnN0YXJ0c1dpdGgoJzwnKSApIHsgKCB7IDE6IHRhZywgMjogXyB9ID0gVEFHX1JFU1QuZXhlYyhfKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKSApOyB9XG5cdGVsc2UgeyB0YWcgPSAnJzsgfVxuXHRfPT09JycgfHwgXy5zdGFydHNXaXRoKCcjJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdHJldHVybiB7ICRfYXNBcnJheUl0ZW0kJCwga2V5cywgJCRhc0FycmF5SXRlbSRfLCB0YWcgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIChfICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdGNvbnN0IF8xICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRjb25zdCAkICAgICAgICAgICAgICAgICAgPSBLRVlfVkFMVUVfUEFJUi5leGVjKF8uc2xpY2UoXzEubGVuZ3RoKSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdHJldHVybiB7IGxlZnQ6IF8xLCB0YWc6ICRbMV0gfHwgJycsIHJpZ2h0OiAkWzJdIH07XG59XG5cbmZ1bmN0aW9uIGdldEtleXMgKF8gICAgICAgICkgICAgICAgICB7XG5cdGZvciAoIGxldCBrZXlzICAgICAgICAgPSAnJzsgOyApIHtcblx0XHRpZiAoIF8uc3RhcnRzV2l0aCgnXCInKSApIHtcblx0XHRcdF8gPSBfLnNsaWNlKDEpO1xuXHRcdFx0Zm9yICggbGV0IGtleSAgICAgICAgID0gJ1wiJzsgOyApIHtcblx0XHRcdFx0Y29uc3QgJCA9IF9fQkFTSUNfU1RSSU5HLmV4ZWMoXyk7XG5cdFx0XHRcdGlmICggISQgKSB7XG5cdFx0XHRcdFx0Xy5zdGFydHNXaXRoKCdcIicpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0XHRcdF8gPSBfLnNsaWNlKDEpO1xuXHRcdFx0XHRcdGtleXMgKz0ga2V5KydcIic7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHRcdFx0XHRrZXkgKz0gJFswXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBrZXkgICAgICAgICA9ICggKCBfLnN0YXJ0c1dpdGgoJ1xcJycpID8gX19MSVRFUkFMX0tFWSA6IF9fQkFSRV9LRVkgKS5leGVjKF8pIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpIClbMF07XG5cdFx0XHRfID0gXy5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGtleXMgKz0ga2V5O1xuXHRcdH1cblx0XHRjb25zdCAkID0gRE9UX0tFWS5leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHRcdGtleXMgKz0gJFswXTtcblx0fVxufVxuXG5jb25zdCBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX18gPSAvW1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0vO1xuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMID0gL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXS87XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUgICAgICAgIDtcbmNvbnN0IEtFWVNfU1RSSUNUID0gL1tcXHctXSt8XCIoPzpbXlxcXFxcIl0rfFxcXFxbXl0pKlwifCdbXiddKicvZztcbmNvbnN0IEtFWVNfRlJFRSA9IC9bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSp8XCIoPzpbXlxcXFxcIl0rfFxcXFxbXl0pKlwifCdbXiddKicvZztcbmV4cG9ydFxubGV0IF9fS0VZUyAgICAgICAgO1xuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoUmVnRXhwIChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19MSVRFUkFMX0tFWSA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERSA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX1RBQl9fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX1RBQl9fX19fXztcblx0XHRcdF9fQkFSRV9LRVkgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0X19MSVRFUkFMX0tFWSA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERSA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX19fX19fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX19fX19fX19fXztcblx0XHRcdF9fQkFSRV9LRVkgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0X19MSVRFUkFMX0tFWSA9IExJVEVSQUxfS0VZX0RFTDtcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERSA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9fX19fXztcblx0XHRcdF9fQkFSRV9LRVkgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRfX0xJVEVSQUxfS0VZID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX1NMQVNIO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfREVMX1NMQVNIO1xuXHRcdFx0X19CQVJFX0tFWSA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTUlOX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IHsgVGFibGUgYXMgdHlwZXNUYWJsZSwgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi9yZWdleHBzJDAnO1xuXG4vKiBvcHRpb25zICovXG5cbmV4cG9ydCBsZXQgdXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyAgICAgICAgO1xuZXhwb3J0IGxldCB1c2luZ0JpZ0ludCAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IEludGVnZXJNaW4gICAgICAgIDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heCAgICAgICAgO1xuXG4vKiB4T3B0aW9ucyAqL1xuXG5leHBvcnQgdmFyIHhPcHRpb25zICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG4gICAgICBcblx0ICAgICAgICAgXG5cdCAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gICBcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG5leHBvcnQgbGV0IHVucmVvcGVuYWJsZSAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBsZXQgVGFibGUgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5jb25zdCBhcnJheVR5cGVzICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcbmxldCBBcyAgICAgICAgICAgICAgICAgICAgPSAoKSA9PiBmdW5jdGlvbiBhcyAoYXJyYXkgICAgICAgKSAgICAgICAge1xuXHRpZiAoIGFycmF5VHlwZXMuaGFzKGFycmF5KSApIHtcblx0XHRhcnJheVR5cGVzLmdldChhcnJheSk9PT1hc1xuXHRcdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFR5cGVFcnJvcihgVHlwZXMgaW4gQXJyYXkgbXVzdCBiZSBzYW1lLiBDaGVjayAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdH1cblx0ZWxzZSB7IGFycmF5VHlwZXMuc2V0KGFycmF5LCBhcyk7IH1cblx0cmV0dXJuIGFycmF5O1xufTtcbmV4cG9ydCBjb25zdFxuXHRhc0lubGluZUFycmF5T2ZOdWxscyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZTdHJpbmdzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZlRhYmxlcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZBcnJheXMgICAgID0gQXMoKSxcblx0YXNJbmxpbmVBcnJheU9mQm9vbGVhbnMgICAgID0gQXMoKSxcblx0YXNJbmxpbmVBcnJheU9mRmxvYXRzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZkludGVnZXJzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZk9mZnNldERhdGVUaW1lcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZMb2NhbERhdGVUaW1lcyAgICAgPSBBcygpLFxuXHRhc0lubGluZUFycmF5T2ZMb2NhbERhdGVzICAgICA9IEFzKCksXG5cdGFzSW5saW5lQXJyYXlPZkxvY2FsVGltZXMgICAgID0gQXMoKTtcbkFzID0gbnVsbDtcblxuLyogeE9wdGlvbnMubWl4ICovXG5cbmV4cG9ydCBjb25zdCB1blR5cGUgICAgID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IGFycmF5O1xuXG4vKiB4T3B0aW9ucy50YWcgKi9cblxubGV0IHByb2Nlc3NvciAgICAgICAgICAgICA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgID0gW107XG5mdW5jdGlvbiBjb2xsZWN0X29uIChlYWNoICAgICAgKSAgICAgICB7IGNvbGxlY3Rpb24ucHVzaChlYWNoKTsgfVxuZnVuY3Rpb24gY29sbGVjdF9vZmYgKGVhY2ggICAgICApICAgICAgICB7IHRocm93IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpOyB9XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyAoKSB7XG5cdGxldCBpbmRleCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXHRpZiAoIGluZGV4ICkge1xuXHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBwcm9jZXNzb3IgO1xuXHRcdGNvbnN0IHF1ZXVlID0gY29sbGVjdGlvbjtcblx0XHRwcm9jZXNzb3IgPSBudWxsO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHR3aGlsZSAoIGluZGV4LS0gKSB7IHByb2Nlc3MocXVldWUucG9wKCkgKTsgfVxuXHR9XG59XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhciAoKSAgICAgICB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpTGluZUpvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgIHtcblx0XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdGNhc2UgMC41OlxuXHRcdFx0bW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlMaW5lSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgPSBtdWx0aUxpbmVKb2luZXI7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLG11bHRpTGluZUpvaW5lciknKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT10cnVlICkgeyB1c2luZ0JpZ0ludCA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIHVzZUJpZ0ludD09PWZhbHNlICkgeyB1c2luZ0JpZ0ludCA9IGZhbHNlOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIHVzZUJpZ0ludCE9PSdudW1iZXInICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHRpZiAoIHVzZUJpZ0ludD49MCApIHsgSW50ZWdlck1pbiA9IC0oIEludGVnZXJNYXggPSB1c2VCaWdJbnQgKTsgfVxuXHRcdGVsc2UgeyBJbnRlZ2VyTWF4ID0gLSggSW50ZWdlck1pbiA9IHVzZUJpZ0ludCApLTE7IH1cblx0XHRpZiAoIEludGVnZXJNaW4gPCBNSU5fU0FGRV9JTlRFR0VSIHx8IE1BWF9TQUZFX0lOVEVHRVIgPCBJbnRlZ2VyTWF4ICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHR9XG5cdFxuXHRsZXQgdHlwaWZ5ICAgICAgICAgO1xuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCB8fCB4T3B0aW9ucz09PWZhbHNlICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdW5yZW9wZW5hYmxlID0gZmFsc2U7XG5cdFx0dHlwaWZ5ID0gdHJ1ZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHhPcHRpb25zPT09dHJ1ZSApIHtcblx0XHRUYWJsZSA9IE9yZGVyZWRUYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9IHNFcnJvciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdW5yZW9wZW5hYmxlID0gdHJ1ZTtcblx0XHR0eXBpZnkgPSBmYWxzZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiB4T3B0aW9ucz09PSdmdW5jdGlvbicgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHVucmVvcGVuYWJsZSA9IHRydWU7XG5cdFx0dHlwaWZ5ID0gZmFsc2U7XG5cdFx0cHJvY2Vzc29yID0geE9wdGlvbnM7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdH1cblx0ZWxzZSB7XG5cdFx0Y29uc3QgeyBvcmRlciwgbG9uZ2VyLCBleGFjdCwgbnVsbDogX251bGwsIG11bHRpLCBjbG9zZSwgbWl4LCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGlmICggb3duS2V5cyh1bmtub3duKS5sZW5ndGggKSB7IHRocm93IEVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICEhbG9uZ2VyO1xuXHRcdHNFcnJvciA9ICEhZXhhY3Q7XG5cdFx0ZW5hYmxlTnVsbCA9ICEhX251bGw7XG5cdFx0YWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9ICEhbXVsdGk7XG5cdFx0dW5yZW9wZW5hYmxlID0gISFjbG9zZTtcblx0XHR0eXBpZnkgPSAhbWl4O1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRcdGlmICggdHlwaWZ5ICkgeyB0aHJvdyBFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpIHhPcHRpb25zLnRhZyBuZWVkcyB4T3B0aW9ucy5taXggdG8gYmUgdHJ1ZScpOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRpZiAoIHR5cGlmeSApIHtcblx0XHRhc051bGxzID0gYXNJbmxpbmVBcnJheU9mTnVsbHM7XG5cdFx0YXNTdHJpbmdzID0gYXNJbmxpbmVBcnJheU9mU3RyaW5ncztcblx0XHRhc1RhYmxlcyA9IGFzSW5saW5lQXJyYXlPZlRhYmxlcztcblx0XHRhc0FycmF5cyA9IGFzSW5saW5lQXJyYXlPZkFycmF5cztcblx0XHRhc0Jvb2xlYW5zID0gYXNJbmxpbmVBcnJheU9mQm9vbGVhbnM7XG5cdFx0YXNGbG9hdHMgPSBhc0lubGluZUFycmF5T2ZGbG9hdHM7XG5cdFx0YXNJbnRlZ2VycyA9IGFzSW5saW5lQXJyYXlPZkludGVnZXJzO1xuXHRcdGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNJbmxpbmVBcnJheU9mT2Zmc2V0RGF0ZVRpbWVzO1xuXHRcdGFzTG9jYWxEYXRlVGltZXMgPSBhc0lubGluZUFycmF5T2ZMb2NhbERhdGVUaW1lcztcblx0XHRhc0xvY2FsRGF0ZXMgPSBhc0lubGluZUFycmF5T2ZMb2NhbERhdGVzO1xuXHRcdGFzTG9jYWxUaW1lcyA9IGFzSW5saW5lQXJyYXlPZkxvY2FsVGltZXM7XG5cdH1cblx0ZWxzZSB7XG5cdFx0YXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gdW5UeXBlO1xuXHR9XG5cdFxufVxuIiwiaW1wb3J0IHsgbmV3UmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgZ2V0VGltZSBmcm9tICcuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcblxuY29uc3QgXzI5XyA9IC8oPzowWzEtOV18MVxcZHwyWzAtOV0pLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSBuZXdSZWdFeHBgXG5cdFxcZFxcZFxcZFxcZC1cblx0KD86XG5cdFx0KD86MFsxMzU3OF18MVswMl0pLSR7XzMxX31cblx0XHR8XG5cdFx0KD86MFs0NjldfDExKS0ke18zMF99XG5cdFx0fFxuXHRcdDAyLSR7XzI5X31cblx0KWA7XG5cbmNvbnN0IEhNUyA9IG5ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cblx0YDtcblxuY29uc3QgSE1TX0RPVCA9IG5ld1JlZ0V4cGBcblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHRgO1xuXG5leHBvcnQgY29uc3QgT0ZGU0VUID0gLyg/Olp8WystXVxcZFxcZDpcXGRcXGQpJC87XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRSA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU19ET1R9XG5cdCR7T0ZGU0VUfWA7XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRV9aRVJPID0gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TX0RPVH1cblx0WiRgO1xuXG5jb25zdCBMT0NBTF9EQVRFVElNRSA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU19ET1R9XG5cdCRgO1xuXG5jb25zdCBMT0NBTF9EQVRFID0gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYDtcblxuY29uc3QgTE9DQUxfVElNRSA9IG5ld1JlZ0V4cGBcblx0XlxuXHQke0hNU19ET1R9XG5cdCRgO1xuXG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcblxuY29uc3QgbGl0ZXJhbF9jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBXZWFrTWFwO1xuY29uc3QgZ290VmFsdWVfY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha01hcDtcbmNvbnN0IGRvdFZhbHVlX2NhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtNYXA7XG5cbmNvbnN0IGRvdERlc2NyaXB0b3IgPSBOdWxsKHsgdmFsdWU6ICcnLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbmNsYXNzIERhdGV0aW1lIGV4dGVuZHMgRGF0ZSB7XG5cdFxuXHQnLicgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChleHByZXNzaW9uICAgICAgICAsIGxpdGVyYWwgICAgICAgICwgZG90VmFsdWUgICAgICAgICkge1xuXHRcdHN1cGVyKGV4cHJlc3Npb24pO1xuXHRcdGxpdGVyYWxfY2FjaGUuc2V0KHRoaXMsIGxpdGVyYWwpO1xuXHRcdGdvdFZhbHVlX2NhY2hlLnNldCh0aGlzLCBnZXRUaW1lLmNhbGwodGhpcykpO1xuXHRcdGRvdFZhbHVlX2NhY2hlLnNldCh0aGlzLCBkb3RWYWx1ZSk7XG5cdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgJy4nLCBkb3REZXNjcmlwdG9yKTtcblx0XHRpZiAoIGRvdFZhbHVlICkgeyB0aGlzWycuJ10gPSBkb3RWYWx1ZTsgfVxuXHR9XG5cdFxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICApICAgICAgICAge1xuXHRcdGlmICggZ2V0VGltZS5jYWxsKHRoaXMpPT09Z290VmFsdWVfY2FjaGUuZ2V0KHRoaXMpICYmIHRoaXNbJy4nXT09PWRvdFZhbHVlX2NhY2hlLmdldCh0aGlzKSApIHsgcmV0dXJuIGxpdGVyYWxfY2FjaGUuZ2V0KHRoaXMpIDsgfVxuXHRcdHRocm93IEVycm9yKCdEYXRldGltZSB2YWx1ZSBoYXMgYmVlbiBtb2RpZmllZC4nKTtcblx0fVxuXHRcblx0Ly8gdG9KU09OKCkgPSB0b0lTT1N0cmluZygpXG5cdC8vIGdldFRpbWUoKXt9XG5cdC8vIHZhbHVlT2YoKXt9XG5cdC8vIFtTeW1ib2wudG9QcmltaXRpdmVdKCdudW1iZXInKSA9IHZhbHVlT2YoKVxuXHRcbn1cblxuZXhwb3J0IGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0KCBvcHRpb25zJDAuemVyb0RhdGV0aW1lID8gT0ZGU0VUX0RBVEVUSU1FX1pFUk8gOiBPRkZTRVRfREFURVRJTUUgKS50ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0Y29uc3QgaW5kZXggICAgICAgICA9IGxpdGVyYWwubGFzdEluZGV4T2YoJy4nKTtcblx0XHRzdXBlcihsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpLCBsaXRlcmFsLCBpbmRleDwwID8gJycgOiBsaXRlcmFsLnNsaWNlKGluZGV4KS5yZXBsYWNlKE9GRlNFVCwgJycpLnJlcGxhY2UoRE9UX1pFUk8sICcnKSk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIExvY2FsRGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRMT0NBTF9EQVRFVElNRS50ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUtVGltZSAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRjb25zdCBpbmRleCAgICAgICAgID0gbGl0ZXJhbC5sYXN0SW5kZXhPZignLicpO1xuXHRcdHN1cGVyKGxpdGVyYWwucmVwbGFjZSgnICcsICdUJykrJ1onLCBsaXRlcmFsLCBpbmRleDwwID8gJycgOiBsaXRlcmFsLnNsaWNlKGluZGV4KS5yZXBsYWNlKERPVF9aRVJPLCAnJykpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbERhdGUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRMT0NBTF9EQVRFLnRlc3QobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRzdXBlcihsaXRlcmFsKydUMDA6MDA6MDAuMDAwWicsIGxpdGVyYWwsICcnKTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTG9jYWxUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0TE9DQUxfVElNRS50ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIFRpbWUgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0Y29uc3QgaW5kZXggICAgICAgICA9IGxpdGVyYWwubGFzdEluZGV4T2YoJy4nKTtcblx0XHRzdXBlcignMTk3MC0wMS0wMVQnK2xpdGVyYWwrJ1onLCBsaXRlcmFsLCBpbmRleDwwID8gJycgOiBsaXRlcmFsLnNsaWNlKGluZGV4KS5yZXBsYWNlKERPVF9aRVJPLCAnJykpO1xuXHR9XG59XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5leHBvcnQgY29uc3QgSU5URUdFUl9EID0gL1stK10/KD86MHxbMS05XVxcZCooPzpfXFxkKykqKS87XG5jb25zdCBEX0lOVEVHRVIgPSBuZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgO1xuY29uc3QgWE9CX0lOVEVHRVIgPSAvXjAoPzp4WzAtOUEtRmEtZl0rKD86X1swLTlBLUZhLWZdKykqfG9bMC03XSsoPzpfWzAtN10rKSp8YlswMV0rKD86X1swMV0rKSopJC87XG5jb25zdCBVTkRFUlNDT1JFU19TSUdOID0gL198XlstK10vZztcblxuZXhwb3J0IGNvbnN0IEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSA9PiB7XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gb3B0aW9ucyQwLkludGVnZXJNaW48PWJpZ0ludCAmJiBiaWdJbnQ8PW9wdGlvbnMkMC5JbnRlZ2VyTWF4ID8gKyggYmlnSW50KycnICkgOiBiaWdJbnQ7XG59O1xuXG5mdW5jdGlvbiBCaWdJbnRJbnRlZ2VyIChsaXRlcmFsICAgICAgICApICAgICAgICAge1xuXHREX0lOVEVHRVIudGVzdChsaXRlcmFsKVxuXHR8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL1hPQl9JTlRFR0VSLnRlc3QobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0bGV0IGJpZ0ludCAgICAgICAgID0gQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRpZiAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnLScpICkgeyBiaWdJbnQgPSAtYmlnSW50OyB9XG5cdG9wdGlvbnMkMC5hbGxvd0xvbmdlclxuXHR8fCAtOTIyMzM3MjAzNjg1NDc3NTgwOG48PWJpZ0ludCAmJiBiaWdJbnQ8PTkyMjMzNzIwMzY4NTQ3NzU4MDduLy8gKCBtaW4gPSAtKDJuKiooNjRuLTFuKSkgfHwgfm1heCApIDw9IGxvbmcgPD0gKCBtYXggPSAybioqKDY0bi0xbiktMW4gfHwgfm1pbiApXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9IG1lZXQgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRyZXR1cm4gYmlnSW50O1xufVxuXG5mdW5jdGlvbiBOdW1iZXJJbnRlZ2VyIChsaXRlcmFsICAgICAgICApICAgICAgICAge1xuXHREX0lOVEVHRVIudGVzdChsaXRlcmFsKVxuXHR8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL1hPQl9JTlRFR0VSLnRlc3QobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0Y29uc3QgbnVtYmVyID0gbGl0ZXJhbC5zdGFydHNXaXRoKCctJylcblx0XHQ/IC1saXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpXG5cdFx0OiArbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZGlkIG5vdCB1c2UgQml0SW50IG11c3QgZml0IE51bWJlci5pc1NhZmVJbnRlZ2VyLCBub3QgaW5jbHVkZXMgJHtsaXRlcmFsfSBtZWV0IGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0cmV0dXJuIG51bWJlcjtcbn1cbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG4vL2ltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuLy9pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IElOVEVHRVJfRCB9IGZyb20gJy4vSW50ZWdlcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuY29uc3QgRkxPQVQgPSBuZXdSZWdFeHBgXG5cdF5cblx0JHtJTlRFR0VSX0R9XG5cdCg/PVsuZUVdKVxuXHQoPzpcXC5cXGQrKD86X1xcZCspKik/XG5cdCg/OltlRV0ke0lOVEVHRVJfRH0pP1xuXHQkYDtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFpFUk8gPSAvXlstK10/MCg/OlxcLlswX10rKT8oPzpbZUVdWy0rXT8wKT8kLztcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggRkxPQVQudGVzdChsaXRlcmFsKSApIHtcblx0XHRjb25zdCBudW1iZXIgPSArbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJyk7XG5cdFx0aWYgKCBvcHRpb25zJDAuc0Vycm9yICkge1xuXHRcdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mLCBsaWtlICR7bGl0ZXJhbH0gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0bnVtYmVyIHx8IFpFUk8udGVzdChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBsaXR0bGUgYXMgJHtsaXRlcmFsLnN0YXJ0c1dpdGgoJy0nKSA/ICctJyA6ICcnfTAsIGxpa2UgJHtsaXRlcmFsfSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0fVxuXHRcdHJldHVybiBudW1iZXI7XG5cdH1cblx0Ly9pZiAoIG9wdGlvbnNcXCQwLnNGbG9hdCApIHtcblx0Ly9cdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7IHJldHVybiBJbmZpbml0eTsgfVxuXHQvL1x0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkgeyByZXR1cm4gLUluZmluaXR5OyB9XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBOYU47IH1cblx0Ly99XG5cdHRocm93IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEZsb2F0ICR7bGl0ZXJhbH0gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xufTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21Db2RlUG9pbnQgZnJvbSAnLlN0cmluZy5mcm9tQ29kZVBvaW50JztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBFU0NBUEVfQUxJQVMgPSB7IGI6ICdcXGInLCB0OiAnXFx0JywgbjogJ1xcbicsIGY6ICdcXGYnLCByOiAnXFxyJywgJ1wiJzogJ1wiJywgJy8nOiAnLycsICdcXFxcJzogJ1xcXFwnIH07XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvXFxcXCg/OihbXFxcXFwiYnRuZnIvXSl8dSguezR9KXxVKC57OH0pKS9nO1xuY29uc3QgRVNDQVBFRF9JTl9NVUxUSV9MSU5FID0gL1xcbnxcXFxcKD86ICooXFxuKVsgXFxuXSp8KFtcXFxcXCJidG5mci9dKXx1KFteXXs0fSl8VShbXl17OH0pKS9nO1xuXG5jb25zdCB1bkVzY2FwZVNpbmdsZUxpbmUgPSAoXG5cdG1hdGNoICAgICAgICAsXG5cdHAxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXHRwMiAgICAgICAgICAgICAgICAgICAgLFxuXHRwMyAgICAgICAgICAgICAgICAgICAgXG4pICAgICAgICAgPT4ge1xuXHRpZiAoIHAxICkgeyByZXR1cm4gRVNDQVBFX0FMSUFTW3AxXTsgfVxuXHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHAyIHx8ICAgICAgICAgcDMsIDE2KTtcblx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcignSW52YWxpZCBVbmljb2RlIFNjYWxhciAnKyggcDIgPyAnXFxcXHUnK3AyIDogJ1xcXFxVJytwMyApKycgYXQgJytpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmNvbnN0IHVuRXNjYXBlTXVsdGlMaW5lID0gKFxuXHRtYXRjaCAgICAgICAgLFxuXHRwMSAgICAgICAgICAgICAgICAgICxcblx0cDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdHAzICAgICAgICAgICAgICAgICAgICAsXG5cdHA0ICAgICAgICAgICAgICAgICAgICBcbikgICAgICAgICA9PiB7XG5cdGlmICggbWF0Y2g9PT0nXFxuJyApIHsgcmV0dXJuIG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nOyB9XG5cdGlmICggcDEgKSB7IHJldHVybiAnJzsgfVxuXHRpZiAoIHAyICkgeyByZXR1cm4gRVNDQVBFX0FMSUFTW3AyXTsgfVxuXHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHAzIHx8ICAgICAgICAgcDQsIDE2KTtcblx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcignSW52YWxpZCBVbmljb2RlIFNjYWxhciAnKyggcDMgPyAnXFxcXHUnK3AzIDogJ1xcXFxVJytwNCApKycgYXQgJytpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmV4cG9ydCBjb25zdCBCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUsIHVuRXNjYXBlU2luZ2xlTGluZSk7XG5cbmV4cG9ydCBjb25zdCBNdWx0aUxpbmVCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fTVVMVElfTElORSwgdW5Fc2NhcGVNdWx0aUxpbmUpO1xuIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgVGFibGUsIGlzVGFibGUgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZywgTXVsdGlMaW5lQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcblxuZXhwb3J0IGNvbnN0IHNlYWxlZElubGluZSAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha1NldDtcbmNvbnN0IG9wZW5UYWJsZXMgICAgICAgICAgICAgICAgID0gbmV3IFdlYWtTZXQ7XG5jb25zdCByZW9wZW5lZFRhYmxlcyAgICAgICAgICAgICAgICAgPSBuZXcgV2Vha1NldDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZFRhYmxlICh0YWJsZSAgICAgICAsIGtleV9rZXkgICAgICAgICwgYXNBcnJheUl0ZW0gICAgICAgICAsIHRhZyAgICAgICAgKSAgICAgICAge1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgICAgICAgICAgICAgID0gcGFyc2VLZXlzKGtleV9rZXkpO1xuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gICAgICAgICBsZWFkaW5nS2V5cy5wb3AoKTtcblx0dGFibGUgPSBwcmVwYXJlVGFibGUodGFibGUsIGxlYWRpbmdLZXlzKTtcblx0bGV0IGxhc3RUYWJsZSAgICAgICA7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0bGV0IGFycmF5T2ZUYWJsZXMgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgc2VhbGVkSW5saW5lLmhhcyhhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIHB1c2ggVGFibGUgdG8gbm9uLUFycmF5T2ZUYWJsZXMgdmFsdWUgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBbXTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh7IHRhYmxlLCBrZXk6IGZpbmFsS2V5LCBhcnJheTogYXJyYXlPZlRhYmxlcywgaW5kZXg6IGFycmF5T2ZUYWJsZXMubGVuZ3RoLCB0YWcgfSk7XG5cdFx0YXJyYXlPZlRhYmxlcy5wdXNoKGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRpZiAoIG9wdGlvbnMkMC51bnJlb3BlbmFibGUgfHwgIW9wZW5UYWJsZXMuaGFzKGxhc3RUYWJsZSA9IHRhYmxlW2ZpbmFsS2V5XSkgfHwgcmVvcGVuZWRUYWJsZXMuaGFzKGxhc3RUYWJsZSkgKSB7IHRocm93IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbiBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7IH1cblx0XHRcdG9wZW5UYWJsZXMuZGVsZXRlKGxhc3RUYWJsZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMkMC5UYWJsZTtcblx0XHRcdG9wdGlvbnMkMC51bnJlb3BlbmFibGUgfHwgcmVvcGVuZWRUYWJsZXMuYWRkKGxhc3RUYWJsZSk7XG5cdFx0fVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh7IHRhYmxlLCBrZXk6IGZpbmFsS2V5LCBhcnJheTogdW5kZWZpbmVkLCBpbmRleDogdW5kZWZpbmVkLCB0YWcgfSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlS2V5cyAoa2V5X2tleSAgICAgICAgKSB7XG5cdGNvbnN0IGtleXMgPSAgICAgICAgICAgICAgICAgICAgICAgIGtleV9rZXkubWF0Y2gocmVnZXhwcyQwLl9fS0VZUyk7XG5cdGZvciAoIGxldCBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleF07XG5cdFx0aWYgKCBrZXkuc3RhcnRzV2l0aCgnXFwnJykgKSB7IGtleXNbaW5kZXhdID0ga2V5LnNsaWNlKDEsIC0xKTsgfVxuXHRcdGVsc2UgaWYgKCBrZXkuc3RhcnRzV2l0aCgnXCInKSApIHsga2V5c1tpbmRleF0gPSBCYXNpY1N0cmluZyhrZXkuc2xpY2UoMSwgLTEpKTsgfVxuXHR9XG5cdGlmICggb3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0Zm9yICggbGV0IGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRrZXlzW2luZGV4XSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjUsIHdoaWNoIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVUYWJsZSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgIHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0c2VhbGVkSW5saW5lLmhhcyh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgc3RhdGljIElubGluZSBUYWJsZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdHNlYWxlZElubGluZS5oYXModGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIHN0YXRpYyBJbmxpbmUgQXJyYXkgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgICAgICkubGVuZ3RoLTFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIG5vbi1UYWJsZSB2YWx1ZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcGVuVGFibGVzLmFkZCh0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyBvcGVuVGFibGVzLmFkZCh0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK11dID0gbmV3IG9wdGlvbnMkMC5UYWJsZSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZUlubGluZVRhYmxlICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgKSAgICAgICAge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK107XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpc1RhYmxlKHRhYmxlKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZSBhdCAke2l0ZXJhdG9yJDAud2hlcmUoKX1gKSk7XG5cdFx0XHRzZWFsZWRJbmxpbmUuaGFzKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIHN0YXRpYyBJbmxpbmUgVGFibGUgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wZW5UYWJsZXMuYWRkKHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IG9wZW5UYWJsZXMuYWRkKHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25MaXRlcmFsU3RyaW5nICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICB7XG5cdGxldCAkO1xuXHRpZiAoIGxpdGVyYWwuY2hhckF0KDEpIT09J1xcJycgfHwgbGl0ZXJhbC5jaGFyQXQoMikhPT0nXFwnJyApIHtcblx0XHQkID0gcmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HLmV4ZWMobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHQkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkcuZXhlYyhsaXRlcmFsKTtcblx0aWYgKCAkICkge1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRpZiAoIGxpdGVyYWwgKSB7XG5cdFx0Y2hlY2tMaXRlcmFsU3RyaW5nKGxpdGVyYWwpO1xuXHRcdGxpdGVyYWwgKz0gb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cblx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5tdXN0KCdMaXRlcmFsIFN0cmluZycsIHN0YXJ0KTtcblx0XHQkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkcuZXhlYyhsaW5lKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsK2NoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHRcdHJldHVybiAkWzJdO1xuXHRcdH1cblx0XHRsaXRlcmFsICs9IGxpbmUrb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tMaXRlcmFsU3RyaW5nIChsaXRlcmFsICAgICAgICApICAgICAgICAge1xuXHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFLnRlc3QobGl0ZXJhbCkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBhIExpdGVyYWwgU3RyaW5nLCB3aGljaCB3YXMgZm91bmQgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRyZXR1cm4gbGl0ZXJhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbkJhc2ljU3RyaW5nICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICB7XG5cdGlmICggbGl0ZXJhbC5jaGFyQXQoMSkhPT0nXCInIHx8IGxpdGVyYWwuY2hhckF0KDIpIT09J1wiJyApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLkJBU0lDX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEJhc2ljU3RyaW5nKCRbMV0pO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaXRlcmFsKTtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicsICQubGVuZ3RoKSApIHtcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gTXVsdGlMaW5lQmFzaWNTdHJpbmcoJCk7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UoJC5sZW5ndGgrMykucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRpZiAoIGxpdGVyYWwgKSB7XG5cdFx0bGl0ZXJhbCArPSAnXFxuJztcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdH1cblx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGV0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdCgnQmFzaWMgU3RyaW5nJywgc3RhcnQpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wKGxpbmUpO1xuXHRcdGlmICggbGluZS5zdGFydHNXaXRoKCdcIlwiXCInLCAkLmxlbmd0aCkgKSB7XG5cdFx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBNdWx0aUxpbmVCYXNpY1N0cmluZyhsaXRlcmFsKyQpO1xuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UoJC5sZW5ndGgrMykucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0bGluZSArPSAnXFxuJztcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0bGl0ZXJhbCArPSBsaW5lO1xuXHR9XG59XG4iLCJpbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUIH0gZnJvbSAnLi4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gJy4uL3R5cGVzL0ludGVnZXInO1xuaW1wb3J0IHsgRmxvYXQgfSBmcm9tICcuLi90eXBlcy9GbG9hdCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMkMCBmcm9tICcuLi9yZWdleHBzJDAnO1xuaW1wb3J0IHsgc2VhbGVkSW5saW5lLCBhcHBlbmRUYWJsZSwgcGFyc2VLZXlzLCBwcmVwYXJlSW5saW5lVGFibGUsIGFzc2lnbkxpdGVyYWxTdHJpbmcsIGFzc2lnbkJhc2ljU3RyaW5nIH0gZnJvbSAnLi9vbi10aGUtc3BvdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJvb3QgKCkge1xuXHRjb25zdCByb290VGFibGUgICAgICAgID0gbmV3IG9wdGlvbnMkMC5UYWJsZTtcblx0bGV0IGxhc3RTZWN0aW9uVGFibGUgICAgICAgID0gcm9vdFRhYmxlO1xuXHR3aGlsZSAoIGl0ZXJhdG9yJDAucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubmV4dCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0aWYgKCBsaW5lPT09JycgKSB7IH1cblx0XHRlbHNlIGlmICggbGluZS5zdGFydHNXaXRoKCcjJykgKSB7IH1cblx0XHRlbHNlIGlmICggbGluZS5zdGFydHNXaXRoKCdbJykgKSB7XG5cdFx0XHRjb25zdCB7ICRfYXNBcnJheUl0ZW0kJCwga2V5cywgJCRhc0FycmF5SXRlbSRfLCB0YWcgfSA9IHJlZ2V4cHMkMC5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUpO1xuXHRcdFx0JF9hc0FycmF5SXRlbSQkPT09JCRhc0FycmF5SXRlbSRfIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRcdGxhc3RTZWN0aW9uVGFibGUgPSBhcHBlbmRUYWJsZShyb290VGFibGUsIGtleXMsICRfYXNBcnJheUl0ZW0kJCwgdGFnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRsZXQgcmVzdCAgICAgICAgID0gYXNzaWduKGxhc3RTZWN0aW9uVGFibGUsIGxpbmUpO1xuXHRcdFx0d2hpbGUgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGggKSB7IHJlc3QgPSBpdGVyYXRvciQwLnN0YWNrc19wb3AoKShyZXN0KTsgfVxuXHRcdFx0cmVzdD09PScnIHx8IHJlc3Quc3RhcnRzV2l0aCgnIycpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuZnVuY3Rpb24gYXNzaWduIChsYXN0SW5saW5lVGFibGUgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgIHtcblx0Y29uc3QgeyBsZWZ0LCB0YWcgfSA9IHsgcmlnaHQ6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMobGluZVJlc3QpO1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgICAgICAgICAgICAgID0gcGFyc2VLZXlzKGxlZnQpO1xuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gICAgICAgICBsZWFkaW5nS2V5cy5wb3AoKTtcblx0Y29uc3QgdGFibGUgICAgICAgID0gcHJlcGFyZUlubGluZVRhYmxlKGxhc3RJbmxpbmVUYWJsZSwgbGVhZGluZ0tleXMpO1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgRHVwbGljYXRlIHByb3BlcnR5IGRlZmluaXRpb24gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHR0YWcgJiYgb3B0aW9ucyQwLmNvbGxlY3QoeyB0YWJsZSwga2V5OiBmaW5hbEtleSwgYXJyYXk6IHVuZGVmaW5lZCwgaW5kZXg6IHVuZGVmaW5lZCwgdGFnIH0pO1xuXHRzd2l0Y2ggKCBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucyQwLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNCwgd2hpY2ggYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaCgobGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiBlcXVhbElubGluZVRhYmxlKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRjYXNlICdbJzpcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2goKGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4gZXF1YWxJbmxpbmVBcnJheSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVkFMVUVfUkVTVC5leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0aWYgKCBvcHRpb25zJDAuc0Zsb2F0ICkge1xuXHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBJbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gLUluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBOYU47XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBPRkZTRVQudGVzdChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCctJykgKSB7XG5cdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHR0YWJsZVtmaW5hbEtleV0gPVxuXHRcdGxpdGVyYWw9PT0ndHJ1ZScgPyB0cnVlIDogbGl0ZXJhbD09PSdmYWxzZScgPyBmYWxzZSA6XG5cdFx0XHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpID8gRmxvYXQobGl0ZXJhbCkgOlxuXHRcdFx0XHRcdG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgPyBudWxsIDpcblx0XHRcdFx0XHRcdEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBsaW5lUmVzdDtcbn1cblxuZnVuY3Rpb24gcHVzaCAobGFzdEFycmF5ICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICB7XG5cdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnPCcpICkge1xuXHRcdGNvbnN0IHsgMTogdGFnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuX1ZBTFVFX1BBSVIuZXhlYyhsaW5lUmVzdCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QoeyB0YWJsZTogdW5kZWZpbmVkLCBrZXk6IHVuZGVmaW5lZCwgYXJyYXk6IGxhc3RBcnJheSwgaW5kZXg6IGxhc3RBcnJheS5sZW5ndGgsIHRhZyB9KTtcblx0fVxuXHRjb25zdCBsYXN0SW5kZXggICAgICAgICA9ICcnK2xhc3RBcnJheS5sZW5ndGg7XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RJbmRleCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RJbmRleCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucyQwLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNCwgd2hpY2ggYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaChsaW5lUmVzdCA9PiBlcXVhbElubGluZVRhYmxlKG9wdGlvbnMkMC5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0SW5kZXgsIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKGxpbmVSZXN0ID0+IGVxdWFsSW5saW5lQXJyYXkob3B0aW9ucyQwLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RJbmRleCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNULmV4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpLnB1c2goSW5maW5pdHkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KS5wdXNoKC1JbmZpbml0eSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpLnB1c2goTmFOKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIE9GRlNFVC50ZXN0KGxpdGVyYWwpICkge1xuXHRcdFx0XHRvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KS5wdXNoKG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihpdGVyYXRvciQwLndoZXJlKCkpKTtcblx0XHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMobGFzdEFycmF5KS5wdXNoKG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxUaW1lcyhsYXN0QXJyYXkpLnB1c2gobmV3IExvY2FsVGltZShsaXRlcmFsKSk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJy0nKSApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdG9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMobGFzdEFycmF5KS5wdXNoKG5ldyBMb2NhbERhdGUobGl0ZXJhbCkpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSkucHVzaCh0cnVlKTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbD09PSdmYWxzZScgKSB7IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSkucHVzaChmYWxzZSk7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpICkge1xuXHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpLnB1c2goRmxvYXQobGl0ZXJhbCkpO1xuXHR9XG5cdGVsc2UgaWYgKCBvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnICkgeyBvcHRpb25zJDAuYXNOdWxscyhsYXN0QXJyYXkpLnB1c2gobnVsbCk7IH1cblx0ZWxzZSB7IG9wdGlvbnMkMC5hc0ludGVnZXJzKGxhc3RBcnJheSkucHVzaChJbnRlZ2VyKGxpdGVyYWwpKTsgfVxuXHRyZXR1cm4gbGluZVJlc3Q7XG59XG5cbmZ1bmN0aW9uIGVxdWFsSW5saW5lVGFibGUgKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGU7XG5cdHNlYWxlZElubGluZS5hZGQoaW5saW5lVGFibGUpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KCdJbmxpbmUgVGFibGUnLCBzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIFRhYmxlJywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdoaWxlICggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBUYWJsZScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnLCcpICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdH1cblx0XHR9KGxpbmVSZXN0KTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHQoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZSwgd2hpY2ggYnJva2VuIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCd9JykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnLCcpICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdC5zdGFydHNXaXRoKCd9JykgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYSwgd2hpY2ggd2FzIGZvdW5kIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHQoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZSwgd2hpY2ggYnJva2VuIGF0ICR7aXRlcmF0b3IkMC53aGVyZSgpfWApKTsvL1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHRcdGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ30nKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hLCB3aGljaCB3YXMgZm91bmQgYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lLCB3aGljaCBicm9rZW4gYXQgJHtpdGVyYXRvciQwLndoZXJlKCl9YCkpO1xuXHRcdFx0fVxuXHRcdH0obGluZVJlc3QpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVxdWFsSW5saW5lQXJyYXkgKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICB7XG5cdGNvbnN0IGlubGluZUFycmF5ICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IFtdO1xuXHRzZWFsZWRJbmxpbmUuYWRkKGlubGluZUFycmF5KTtcblx0Y29uc3Qgc3RhcnQgICAgICAgICA9IGl0ZXJhdG9yJDAubWFyaygpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggbGluZVJlc3Q9PT0nJyB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCcjJykgKSB7XG5cdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBBcnJheScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3Quc3RhcnRzV2l0aCgnXScpICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBmdW5jdGlvbiBjYWxsZWUgKGxpbmVSZXN0KSB7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0bGluZVJlc3QgPSBwdXNoKGlubGluZUFycmF5LCBsaW5lUmVzdCk7XG5cdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgey8vXG5cdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIEFycmF5Jywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJywnKSApIHsvL1xuXHRcdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGxpbmVSZXN0PT09JycgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnIycpICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KCdJbmxpbmUgQXJyYXknLCBzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ10nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGVsc2Ugey8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ10nKSApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoaXRlcmF0b3IkMC53aGVyZSgpKSk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3QoJ0lubGluZSBBcnJheScsIHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCcsJykgKSB7XG5cdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0d2hpbGUgKCBsaW5lUmVzdD09PScnIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJyMnKSApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdCgnSW5saW5lIEFycmF5Jywgc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCddJykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdC5zdGFydHNXaXRoKCddJykgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGl0ZXJhdG9yJDAud2hlcmUoKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fShsaW5lUmVzdCk7XG59XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdCd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlXG5cdFx0PyBSZWdFeHAoJ1tcXFxcdUQ4MDAtXFxcXHVERkZGXScsICd1Jylcblx0XHQ6IC9bXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS9cbik7XG5cbi8vIFxcdXsxMTAwMDB9LVxcdXtGRkZGRkZGRn0gLT4gXFx1RkZGRFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy5CdWZmZXIuaXNCdWZmZXI/PSgpPT5mYWxzZSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCBSb290IGZyb20gJy4uL3BhcnNlL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5cbmltcG9ydCB7IGNsZWFyUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBOT05fU0NBTEFSIH0gZnJvbSAnQGx0ZC9qLXV0Zic7XG5cbmNvbnN0IEJPTSA9ICdcXHVGRUZGJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UgKFxuXHRzb3VyY2VDb250ZW50ICAgICAgICAgICAgICAgICAsXG5cdHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdG11bHRpTGluZUpvaW5lciAgICAgICAgLFxuXHR1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgPSB0cnVlLFxuXHR4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgXG4pICAgICAgICB7XG5cdGl0ZXJhdG9yJDAuY291bGQoKTtcblx0aWYgKCBpc0J1ZmZlcihzb3VyY2VDb250ZW50KSApIHtcblx0XHRjb25zdCBidWZmZXIgICAgICAgICA9IHNvdXJjZUNvbnRlbnQ7XG5cdFx0c291cmNlQ29udGVudCA9IGJ1ZmZlci50b1N0cmluZygpO1xuXHRcdGlmICggIWZyb20oYnVmZmVyKS5lcXVhbHMoYnVmZmVyKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJyk7IH1cblx0XHRpZiAoIHNvdXJjZUNvbnRlbnQuc3RhcnRzV2l0aChCT00pICkgeyBzb3VyY2VDb250ZW50ID0gc291cmNlQ29udGVudC5zbGljZSgxKTsgfVxuXHR9XG5cdGlmICggdHlwZW9mIHNvdXJjZUNvbnRlbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZUNvbnRlbnQpJyk7IH1cblx0dHJ5IHtcblx0XHRpZiAoIE5PTl9TQ0FMQVIudGVzdChzb3VyY2VDb250ZW50KSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuJyk7IH1cblx0XHR0cnkge1xuXHRcdFx0b3B0aW9ucyQwLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlMaW5lSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdGl0ZXJhdG9yJDAudG9kbyhzb3VyY2VDb250ZW50KTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRcdFx0b3B0aW9ucyQwLnByb2Nlc3MoKTtcblx0XHRcdFx0cmV0dXJuIHJvb3RUYWJsZTtcblx0XHRcdH1cblx0XHRcdGZpbmFsbHkgeyBpdGVyYXRvciQwLmRvbmUoKTsgfVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgb3B0aW9ucyQwLmNsZWFyKCk7IH1cblx0fVxuXHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxufTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcbn0pO1xuIl0sIm5hbWVzIjpbInVuZGVmaW5lZCIsIk9iamVjdF9jcmVhdGUiLCJOdWxsX3Byb3RvdHlwZSIsIlJlZmxlY3Rfb3duS2V5cyIsIk5VTEwiLCJPYmplY3RfZGVmaW5lUHJvcGVydHkiLCJpdGVyYXRvciQwLnRocm93cyIsIml0ZXJhdG9yJDAud2hlcmUiLCJpdGVyYXRvciQwLmRvbmUiLCJyZWdleHBzJDAuc3dpdGNoUmVnRXhwIiwib3B0aW9ucyQwLnplcm9EYXRldGltZSIsIm9wdGlvbnMkMC51c2luZ0JpZ0ludCIsIm9wdGlvbnMkMC5JbnRlZ2VyTWluIiwib3B0aW9ucyQwLkludGVnZXJNYXgiLCJvcHRpb25zJDAuYWxsb3dMb25nZXIiLCJvcHRpb25zJDAuc0Vycm9yIiwib3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmciLCJvcHRpb25zJDAuY29sbGVjdCIsIm9wdGlvbnMkMC5UYWJsZSIsIm9wdGlvbnMkMC51bnJlb3BlbmFibGUiLCJyZWdleHBzJDAuX19LRVlTIiwib3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkiLCJyZWdleHBzJDAuTElURVJBTF9TVFJJTkciLCJyZWdleHBzJDAuTVVMVElfTElORV9MSVRFUkFMX1NUUklORyIsIml0ZXJhdG9yJDAubWFyayIsIml0ZXJhdG9yJDAubXVzdCIsInJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREUiLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wIiwicmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0IiwicmVnZXhwcyQwLlBSRV9XSElURVNQQUNFIiwiaXRlcmF0b3IkMC5yZXN0IiwiaXRlcmF0b3IkMC5uZXh0IiwicmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnN0YWNrc19sZW5ndGgiLCJpdGVyYXRvciQwLnN0YWNrc19wb3AiLCJyZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJvcHRpb25zJDAuaW5saW5lVGFibGUiLCJpdGVyYXRvciQwLnN0YWNrc19wdXNoIiwicmVnZXhwcyQwLlZBTFVFX1JFU1QiLCJvcHRpb25zJDAuc0Zsb2F0Iiwib3B0aW9ucyQwLm1vcmVEYXRldGltZSIsIm9wdGlvbnMkMC5lbmFibGVOdWxsIiwicmVnZXhwcyQwLl9WQUxVRV9QQUlSIiwib3B0aW9ucyQwLmFzU3RyaW5ncyIsIm9wdGlvbnMkMC5hc1RhYmxlcyIsIm9wdGlvbnMkMC5hc0FycmF5cyIsIm9wdGlvbnMkMC5hc0Zsb2F0cyIsIm9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZVRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zJDAuYXNCb29sZWFucyIsIm9wdGlvbnMkMC5hc051bGxzIiwib3B0aW9ucyQwLmFzSW50ZWdlcnMiLCJyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UiLCJvcHRpb25zJDAuYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIml0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QiLCJpdGVyYXRvciQwLmNvdWxkIiwib3B0aW9ucyQwLnVzZSIsIml0ZXJhdG9yJDAudG9kbyIsIm9wdGlvbnMkMC5wcm9jZXNzIiwib3B0aW9ucyQwLmNsZWFyIl0sIm1hcHBpbmdzIjoi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U0FBUyxLQUFLO0NBQzdCLENBQUMsYUFBYTtDQUNkLENBQUMsb0JBQW9CO0NBQ3JCLENBQUMsZUFBZTtDQUNoQixDQUFDLFNBQVMscUJBQXFCLElBQUk7Q0FDbkMsQ0FBQyxRQUFRO0NBQ1QsU0FBUztDQUNULENBQUNtRCxLQUFnQixFQUFFLENBQUM7Q0FDcEIsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRztDQUNoQyxFQUFFLE1BQU0sTUFBTSxXQUFXLGFBQWEsQ0FBQztDQUN2QyxFQUFFLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Q0FDcEMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxDQUFDLHFGQUFxRixDQUFDLENBQUMsRUFBRTtDQUM3SSxFQUFFLEtBQUssYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDbEYsRUFBRTtDQUNGLENBQUMsS0FBSyxPQUFPLGFBQWEsR0FBRyxRQUFRLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUU7Q0FDekYsQ0FBQyxJQUFJO0NBQ0wsRUFBRSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssQ0FBQyxpR0FBaUcsQ0FBQyxDQUFDLEVBQUU7Q0FDM0osRUFBRSxJQUFJO0NBQ04sR0FBR0MsR0FBYSxDQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDN0UsR0FBR0MsSUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2xDLEdBQUcsSUFBSTtDQUNQLElBQUksTUFBTSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7Q0FDN0IsSUFBSUMsT0FBaUIsRUFBRSxDQUFDO0NBQ3hCLElBQUksT0FBTyxTQUFTLENBQUM7Q0FDckIsSUFBSTtDQUNKLFdBQVcsRUFBRXJELElBQWUsRUFBRSxDQUFDLEVBQUU7Q0FDakMsR0FBRztDQUNILFVBQVUsRUFBRXNELEtBQWUsRUFBRSxDQUFDLEVBQUU7Q0FDaEMsRUFBRTtDQUNGLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0NBQzNCLENBQUM7O0FDeENELGtCQUFlLE9BQU8sQ0FBQztDQUN2QixDQUFDLE9BQU87Q0FDUixDQUFDLEtBQUs7Q0FDTixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==