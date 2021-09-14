/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.14.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

const version = '1.14.0';

const Error$1 = Error;

const TypeError$1 = TypeError;

const assign$1 = Object.assign;

const isBuffer = (
	/*! j-globals: Buffer.isBuffer (polyfill) */
	typeof Buffer==='function' ? Buffer.isBuffer : function isBuffer () { return false; }
	/*¡ j-globals: Buffer.isBuffer (polyfill) */
);

const undefined$1 = void null;

const from = (
	/*! j-globals: Buffer.from (fallback) */
	typeof Buffer==='function' && /*#__PURE__*/Buffer.hasOwnProperty('from') ? Buffer.from : undefined$1
	/*¡ j-globals: Buffer.from (fallback) */
);

const globalThis$1 = globalThis;

const bind = Function.prototype.bind;

const test = RegExp.prototype.test;

const exec = RegExp.prototype.exec;

const SyntaxError$1 = SyntaxError;

const RegExp$1 = RegExp;

const freeze = Object.freeze;

const Reflect_apply = Reflect.apply;

const Proxy$1 = Proxy;

const create$1 = Object.create;

const NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

const toStringTag = typeof Symbol==='undefined' ? undefined$1 : Symbol.toStringTag;

const Object_defineProperty = Object.defineProperty;

const Infinity = 1/0;

const hasOwnProperty = Object.prototype.hasOwnProperty;

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var isEnum = /*#__PURE__*/propertyIsEnumerable.call.bind(propertyIsEnumerable);
var hasOwn = /*#__PURE__*/function () {
	return hasOwnProperty.bind
		? hasOwnProperty.call.bind(hasOwnProperty)
		: function (object, key) { return hasOwnProperty.call(object, key); };
}();// && object!=null

var create = Object.create;

const Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		if ( !addOnOrigin ) { addOnOrigin = exports; exports = create$1(NULL); }
		if ( assign$1 ) { assign$1(exports, addOnOrigin); }
		else { for ( var key in addOnOrigin ) { if ( hasOwn(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
		exports.default = exports;
		if ( toStringTag ) {
			var descriptor = create$1(NULL);
			descriptor.value = 'Module';
			Object_defineProperty(exports, toStringTag, descriptor);
		}
		typeof exports==='function' && exports.prototype && freeze(exports.prototype);
		return freeze(exports);
	}
	/*¡ j-globals: default (internal) */
);

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var Test                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

function theRegExp (re        )         {
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}

var NT = /[\n\t]+/g;
var ESCAPE = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError$1('source'); }
			if ( value.unicode===U ) { throw SyntaxError$1('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError$1('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError$1('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError$1('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT, '');
	}
	var re         = RegExp$1(U ? source = source.replace(ESCAPE, graveAccentReplacer) : source, this.flags);
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? S : null;
	return re;
}

var RE_bind = bind && /*#__PURE__*/bind.bind(RE       );

function Context (flags        )          {
	return {
		U: !includes(flags, 'u'),
		I: !includes(flags, 'i'),
		M: !includes(flags, 'm'),
		S: !includes(flags, 's'),
		flags: flags
	};
}

var CONTEXT          = /*#__PURE__*/Context('');

var newRegExp = Proxy$1
	? /*#__PURE__*/new Proxy$1(RE, {
		apply: function (RE, thisArg, args                                   ) { return Reflect_apply(RE, CONTEXT, args); }
		,
		get: function (RE, flags        ) { return RE_bind(Context(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE.apply = RE.apply;
		var newRegExp = function () { return RE.apply(CONTEXT, arguments       ); }       ;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments       ); };
			} )(Context(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

var clearRegExp = '$_' in RegExp$1
	? /*#__PURE__*/function () {
		var REGEXP = /^/;
		REGEXP.test = REGEXP.test;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

/*¡ j-regexp */

const RegExp_prototype = RegExp.prototype;

/*!@preserve@license
 * 模块名称：j-utf
 * 模块功能：UTF 相关共享实用程序。从属于“简计划”。
   　　　　　UTF util. Belong to "Plan J".
 * 模块版本：4.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-utf/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-utf/
 */

var NON_SCALAR = (
	'unicode' in RegExp_prototype
		? RegExp$1('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

/*¡ j-utf */

const WeakMap$1 = WeakMap;

const get = WeakMap.prototype.get;

const set = WeakMap.prototype.set;

//import * as options\$0 from './options\$0';

const NONE                    = [];
let sourcePath         = '';
let sourceLines                    = NONE;
let lastLineIndex         = -1;
let lineIndex         = -1;

                                     
	                  
	                   
 
const throws                                = (error             )        => {
	//if ( sourceLines!==NONE ) { done(); options\$0.clear(); }
	throw error;
};

const previous = new WeakMap$1            ();
const previous_get = /*#__PURE__*/get.bind(previous)                       ;
const previous_set = /*#__PURE__*/set.bind(previous);
                                         
const noop       = /*#__PURE__*/( () => {
	const noop       = ()         => '';
	previous_set(noop, noop);
	return noop;
} )();

let stacks_length = 0;
let last       = noop;

const could = ()       => {
	if ( sourceLines!==NONE ) { throw Error$1('Internal error: parsing during parsing.'); }
};

const EOL = /\r?\n/;
const todo = (source        , path        )       => {
	if ( typeof path!=='string' ) { throw TypeError$1('TOML.parse(,,,,sourcePath)'); }
	sourcePath = path;
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length - 1;
	lineIndex = -1;
	stacks_length = 0;
	last = noop;
};

const next = ()         => sourceLines[++lineIndex] ;

const rest = ()          => lineIndex!==lastLineIndex;

const mark = (type        ) => ( { type, lineIndex } );

const must = (marker                                     )         => {
	lineIndex===lastLineIndex && throws(SyntaxError$1(`${marker.type} is not close until the end of the file` + where(', which started from ', marker.lineIndex)));
	return sourceLines[++lineIndex] ;
};

const where = (pre        , index         = lineIndex)         => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${index + 1}:1)`
		: `${pre}line ${index + 1}: ${sourceLines[index]}`;

const done = ()       => {
	sourcePath = '';
	sourceLines = NONE;
	last = noop;
};

const stacks_pop = ()       => {
	const item       = last;
	last = previous_get(last);
	--stacks_length;
	return item;
};

const stacks_push = (item      )       => {
	previous_set(item, last);
	last = item;
	++stacks_length;
};

const stacks_insertBeforeLast = (item      )       => {
	previous_set(item, previous_get(last));
	previous_set(last, item);
	++stacks_length;
};

const RangeError$1 = RangeError;

const isSafeInteger = Number.isSafeInteger;

const ownKeys = Reflect.ownKeys;

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

const WeakSet$1 = WeakSet;

const has = WeakSet.prototype.has;

const add = WeakSet.prototype.add;

const del = WeakSet.prototype['delete'];

const Object_keys = Object.keys;

const getOwnPropertySymbols = Object.getOwnPropertySymbols;

const Null$1 = (
	/*! j-globals: null (internal) */
	/*#__PURE__*/function () {
		var assign = Object.assign || function assign (target, source) {
			var keys, index, key;
			for ( keys = Object_keys(source), index = 0; index<keys.length;++index ) {
				key = keys[index];
				target[key] = source[key];
			}
			if ( getOwnPropertySymbols ) {
				for ( keys = getOwnPropertySymbols(source), index = 0; index<keys.length;++index ) {
					key = keys[index];
					if ( isEnum(source, key) ) { [key] = source[key]; }
				}
			}
			return target;
		};
		function Nullify (constructor) {
			delete constructor.prototype.constructor;
			freeze(constructor.prototype);
			return constructor;
		}
		var Null = function (origin) {
			return origin===undefined$1
				? this
				: typeof origin==='function'
					? /*#__PURE__*/Nullify(origin)
					: /*#__PURE__*/assign(/*#__PURE__*/create(NULL), origin);
		};
		delete Null.name;
		//try { delete Null.length; } catch (error) {}
		Null.prototype = null;
		freeze(Null);
		return Null;
	}()
	/*¡ j-globals: null (internal) */
);

const is = Object.is;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

/*!@preserve@license
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：7.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const Keeper =     ()      => [];

const hasOwnProperty_call = /*#__PURE__*/hasOwnProperty.call.bind(hasOwnProperty);

const newWeakMap = () => {
	const weakMap = new WeakMap$1;
	weakMap.has = weakMap.has;
	weakMap.get = weakMap.get;
	weakMap.set = weakMap.set;
	return weakMap;
};
const target2keeper = /*#__PURE__*/newWeakMap()     
	                                                                      
	                                                                         
 ;
const proxy2target = /*#__PURE__*/newWeakMap()     
	                             
	                                                 
	                                                   
 ;
const target2proxy = /*#__PURE__*/newWeakMap()     
	                                                  
	                                                   
 ;

const handlers                       = /*#__PURE__*/assign$1(create$1(NULL), {
	defineProperty:                 (target                   , key   , descriptor                    )          => {
		if ( hasOwnProperty_call(target, key) ) {
			return Reflect_defineProperty(target, key, assign$1(create$1(NULL), descriptor));
		}
		if ( Reflect_defineProperty(target, key, assign$1(create$1(NULL), descriptor)) ) {
			const keeper = target2keeper.get(target) ;
			keeper[keeper.length] = key;
			return true;
		}
		return false;
	},
	deleteProperty:                 (target                   , key   )          => {
		if ( Reflect_deleteProperty(target, key) ) {
			const keeper = target2keeper.get(target) ;
			const index = keeper.indexOf(key);
			index<0 || --keeper.copyWithin(index, index + 1).length;
			return true;
		}
		return false;
	},
	ownKeys:                    (target   ) => target2keeper.get(target)                         ,
	construct:                                     (target                         , args   , newTarget     )    => orderify(Reflect_construct(target, args, newTarget)),
	apply:                                        (target                              , thisArg   , args   )    => orderify(Reflect_apply(target, thisArg, args)),
});

const newProxy =                                              (target   , keeper           )    => {
	target2keeper.set(target, keeper);
	const proxy = new Proxy$1   (target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
};

const orderify =                    (object   )    => {
	if ( proxy2target.has(object) ) { return object; }
	let proxy = target2proxy.get(object)                 ;
	if ( proxy ) { return proxy; }
	proxy = newProxy(object, assign$1(Keeper          (), ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

const Null = /*#__PURE__*/function () {
	function throwConstructing ()        { throw TypeError$1(`Super constructor Null cannot be invoked with 'new'`); }
	function throwApplying ()        { throw TypeError$1(`Super constructor Null cannot be invoked without 'new'`); }
	const Nullify = (constructor                             ) => {
		delete constructor.prototype.constructor;
		freeze(constructor.prototype);
		return constructor;
	};
	function Null (           constructor                              ) {
		return new.target
			? new.target===Null
				? /*#__PURE__*/throwConstructing()
				: /*#__PURE__*/newProxy(this, Keeper     ())
			: typeof constructor==='function'
				? /*#__PURE__*/Nullify(constructor)
				: /*#__PURE__*/throwApplying();
	}
	//@ts-ignore
	Null.prototype = null;
	Object_defineProperty(Null, 'name', assign$1(create$1(NULL), { value: '', configurable: false }));
	//delete Null.length;
	freeze(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const tables = new WeakSet$1       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                  ;

const DIRECTLY = true;
const IMPLICITLY = false;
const implicitTables = new WeakSet$1       ();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_has = /*#__PURE__*/has.bind(implicitTables);
const wasDirectly = (table       )          => !implicitTables_has(table);
const directly = /*#__PURE__*/del.bind(implicitTables)                             ;

const INLINE = true;
const inlineTables = new WeakSet$1       ();
const inlineTables_add = /*#__PURE__*/add.bind(inlineTables);
const isInline = /*#__PURE__*/has.bind(inlineTables)                             ;

const PAIR = true;
const pairs = new WeakSet$1       ();
const pairs_add = /*#__PURE__*/add.bind(pairs);
const fromPair = /*#__PURE__*/has.bind(pairs)                             ;

const PlainTable = Null$1(class Table extends Null$1      {
	constructor (isDirect          , isInline          ) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

const OrderedTable = Null$1(class Table extends Null      {
	constructor (isDirect          , isInline          ) {
		super();
		tables_add(this);
		isDirect
			? isInline && inlineTables_add(this)
			: ( isInline ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

/* nested (readable) */

const Whitespace = /[ \t]/;

const PRE_WHITESPACE = /*#__PURE__*/( () => newRegExp`
	^${Whitespace}+` )();

const VALUE_REST_exec = /*#__PURE__*/( () => newRegExp.s       `
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	(.*)
	$`.exec )();

const LITERAL_STRING_exec = /*#__PURE__*/( () => newRegExp.s       `
	^
	'([^']*)'
	${Whitespace}*
	(.*)`.exec )();

const MULTI_LINE_LITERAL_STRING_0_1_2 = /*#__PURE__*/( () => newRegExp.s           `
	^
	(.*?)
	'''('{0,2})
	${Whitespace}*
	(.*)`.exec )();
const MULTI_LINE_LITERAL_STRING_0 = /*#__PURE__*/( () => newRegExp.s           `
	^
	(.*?)
	'''()
	${Whitespace}*
	(.*)`.exec )();
let __MULTI_LINE_LITERAL_STRING_exec                                    ;

const SYM_WHITESPACE = /*#__PURE__*/( () => newRegExp.s`
	^
	.
	${Whitespace}*` )();


const Tag = /[^\x00-\x1F"#'()<>[\\\]`{}\x7F]+/;

const KEY_VALUE_PAIR_exec = /*#__PURE__*/( () => newRegExp.s   `
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(.*)
	$`.exec )();

const _VALUE_PAIR_exec = /*#__PURE__*/( () => newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec )();

const TAG_REST_exec = /*#__PURE__*/( () => newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.exec )();

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING_exec = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"]+|\\.|""?(?!"))/s).exec )();
const MULTI_LINE_BASIC_STRING_exec_0 = (_        )         => {
	let _0         = '';
	while ( _ ) {
		const $ = MULTI_LINE_BASIC_STRING_exec(_);
		if ( !$ ) { break; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
	return _0;
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[ \t]*\n[ \t\n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER        ;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_        )          => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');

const BASIC_STRING_TAB______ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING__________ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING_DEL______ = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
const BASIC_STRING_DEL_SLASH = /*#__PURE__*/( () => theRegExp(/^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/).exec )();
let __BASIC_STRING_exec                               ;
const BASIC_STRING_exec = (_2        )                           => {
	_2 = _2.slice(1);
	for ( let _1         = ''; ; ) {
		const $ = __BASIC_STRING_exec(_2);
		if ( !$ ) {
			_2[0]==='"' || throws(SyntaxError$1(`Bad basic string` + where(' at ')));
			return { 1: _1, 2: _2.replace(SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
};

const DOT_KEY_exec = /*#__PURE__*/( () => theRegExp(/^[ \t]*\.[ \t]*/).exec )();
const BARE_KEY_STRICT = /*#__PURE__*/( () => theRegExp(/^[\w-]+/).exec )();
const BARE_KEY_FREE = /*#__PURE__*/( () => theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/).exec )();
let __BARE_KEY_exec                      ;
const LITERAL_KEY____ = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/).exec )();
const LITERAL_KEY_DEL = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/).exec )();
let __LITERAL_KEY_exec                        ;
let supportArrayOfTables         ;

const getKeys = (_        )         => {
	let keys         = '';
	for ( ; ; ) {
		if ( _[0]==='"' ) {
			_ = _.slice(1);
			let key         = '"';
			let $                      ;
			while ( ( $ = __BASIC_STRING_exec(_) ) ) {
				_ = _.slice($[0].length);
				key += $[0];
			}
			_[0]==='"' || throws(SyntaxError$1(`Bad basic string key` + where(' at ')));
			_ = _.slice(1);
			keys += key + '"';
		}
		else {
			const key         = ( ( _.startsWith('\'') ? __LITERAL_KEY_exec : __BARE_KEY_exec )(_) ?? throws(SyntaxError$1(`Bad ${_.startsWith('\'') ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ = DOT_KEY_exec(_);
		if ( !$ ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
};

const TABLE_DEFINITION_exec_groups = (_        )                                                                                    => {
	const $_asArrayItem$$          = _[1]==='[';
	if ( $_asArrayItem$$ ) {
		supportArrayOfTables || throws(SyntaxError$1(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys         = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_[0]===']' || throws(SyntaxError$1(`Table header is not closed` + where(', which is found at ')));
	const $$asArrayItem$_          = _[1]===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( _[0]==='<' ) { ( { 1: tag, 2: _ } = TAG_REST_exec(_) ?? throws(SyntaxError$1(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	!_ || _[0]==='#' || throws(SyntaxError$1(`Unexpect charachtor after table header` + where(' at ')));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
};

const KEY_VALUE_PAIR_exec_groups = (_        )                                               => {
	const left         = getKeys(_);
	const { 1: tag = '', 2: right } = KEY_VALUE_PAIR_exec(_.slice(left.length)) ?? throws(SyntaxError$1(`Keys must equal something` + where(', but missing at ')));
	tag || right && right[0]!=='#' || throws(SyntaxError$1(`Value can not be missing after euqal sign` + where(', which is found at ')));
	return { left, tag, right };
};

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/).test )();
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F]/).test )();
let __CONTROL_CHARACTER_EXCLUDE_test                                         ;
const KEYS_STRICT = /[\w-]+|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
const KEYS_FREE = /[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*|"(?:[^\\"]+|\\.)*"|'[^']*'/gs;
let __KEYS        ;

const switchRegExp = (specificationVersion        )       => {
	switch ( specificationVersion ) {
		case 1.0:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING_exec = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING_exec = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING_exec = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			__KEYS = KEYS_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING_exec = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			__KEYS = KEYS_FREE;
			supportArrayOfTables = false;
	}
};

/* options */

let useWhatToJoinMultiLineString        ;
let usingBigInt                ;
let IntegerMin        ;
let IntegerMax        ;

              

                                                           
	                 
	                
	                 
	                
	               
	                
  
let endsWithQuote         ;
let zeroDatetime         ;
let inlineTable         ;
let moreDatetime         ;
let disallowEmptyKey         ;
//export const xob :boolean = true;
let sError         ;
let sFloat         ;
                               
let Table                  ;
let allowLonger         ;
let enableNull         ;
let allowInlineTableMultiLineAndTrailingCommaEvenNoComma         ;
const arrayTypes = new WeakMap$1           ();
const arrayTypes_get = /*#__PURE__*/get.bind(arrayTypes)                                  ;
const arrayTypes_set = /*#__PURE__*/set.bind(arrayTypes)                                     ;
                                  
const As = ()     => {
	const as = (array       )        => {
		const got = arrayTypes_get(array);
		got
			? got===as || throws(TypeError$1(`Types in Array must be same` + where('. Check ')))
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
const asMixed     = (array       )        => array;
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

/* xOptions.tag */

let processor             = null;
                                            
           
	                                                                                
	                                                                                
	                                                                               
let collection              = [];
let collection_length         = 0;
const collect_on = (tag        , array              , table              , key         )       => {
	const each = create$1(NULL)                                                                           ;
	each.tag = tag;
	if ( table ) {
		each.table = table;
		each.key = key ;
	}
	if ( array ) {
		each.array = array;
		each.index = array.length;
	}
	collection[collection_length++] = each;
};
const collect_off = ()        => { throws(SyntaxError$1(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
let collect                                                                                                              = collect_off;
const process = ()       => {
	if ( collection_length ) {
		done();
		const process = processor ;
		const queue = collection;
		processor = null;
		collection = [];
		while ( collection_length-- ) {
			process(queue[collection_length] );
			queue.length = collection_length;
		}
	}
};

/* use & clear */

const clear = ()       => {
	processor = null;
	collection.length = collection_length = 0;
	zeroDatetime = false;
};

const use = (specificationVersion         , multiLineJoiner         , useBigInt         , xOptions          )       => {
	
	let mixed         ;
	switch ( specificationVersion ) {
		case 1.0:
			mixed = endsWithQuote = moreDatetime = sFloat = inlineTable = true;
			zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.5:
			moreDatetime = sFloat = inlineTable = true;
			mixed = endsWithQuote = zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.4:
			disallowEmptyKey = inlineTable = true;
			mixed = endsWithQuote = zeroDatetime = moreDatetime = sFloat = false;
			break;
		case 0.3:
			disallowEmptyKey = true;
			mixed = endsWithQuote = zeroDatetime = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.2:
			zeroDatetime = disallowEmptyKey = true;
			mixed = endsWithQuote = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.1:
			zeroDatetime = disallowEmptyKey = true;
			mixed = endsWithQuote = moreDatetime = sFloat = inlineTable = false;
			break;
		default:
			throw RangeError$1('TOML.parse(,specificationVersion)');
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multiLineJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineJoiner; }
	else { throw TypeError$1('TOML.parse(,,multiLineJoiner)'); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError$1('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError$1('TOML.parse(,,,useBigInt)'); }
		usingBigInt = null;
		if ( useBigInt>=0 ) { IntegerMin = -( IntegerMax = useBigInt ); }
		else { IntegerMax = -( IntegerMin = useBigInt )-1; }
		if ( IntegerMin < MIN_SAFE_INTEGER || MAX_SAFE_INTEGER < IntegerMax ) { throw RangeError$1('TOML.parse(,,,useBigInt)'); }
	}
	
	if ( xOptions==null || xOptions===false ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( xOptions===true ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = true;
		collect = collect_off;
	}
	else if ( typeof xOptions==='function' ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultiLineAndTrailingCommaEvenNoComma = true;
		if ( !mixed ) { throw TypeError$1('TOML.parse(,,,,tag) needs at least TOML 1.0 to support mixed type array'); }
		processor = xOptions;
		collect = collect_on;
	}
	else {
		const { order, longer, exact, null: _null, multi, tag, ...unknown } = xOptions;
		if ( ownKeys(unknown).length ) { throw TypeError$1('TOML.parse(,,,,xOptions)'); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !!longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!multi;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError$1('TOML.parse(,,,,xOptions.tag)'); }
			if ( !mixed ) { throw TypeError$1('TOML.parse(,,,,xOptions) xOptions.tag needs at least TOML 1.0 to support mixed type array'); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

const NaN = 0/0;

const arrays = new WeakSet$1       ();
const arrays_add = /*#__PURE__*/add.bind(arrays);
const isArray = /*#__PURE__*/has.bind(arrays)                                  ;

const OF_TABLES = false;
const STATICALLY = true;
const staticalArrays = new WeakSet$1       ();
const staticalArrays_add = /*#__PURE__*/add.bind(staticalArrays);
const isStatic = /*#__PURE__*/has.bind(staticalArrays)                             ;

const newArray = (isStatic         )        => {
	const array        = [];
	arrays_add(array);
	isStatic && staticalArrays_add(array);
	return array;
};

const NativeDate = Date;

const parse$2 = Date.parse;

const preventExtensions = Object.preventExtensions;

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = /*#__PURE__*/( () => newRegExp`
	\d\d\d\d-
	(?:
		0
		(?:
			[13578]-${_31_}
			|
			[469]-${_30_}
			|
			2-${_29_}
		)
		|
		1
		(?:
			[02]-${_31_}
			|
			1-${_30_}
		)
	)` )();

const HMS = /*#__PURE__*/( () => newRegExp`
	${_23_}:${_59_}:${_59_}
	` )();

const OFFSET$ = /(?:Z|[+-]\d\d:\d\d)$/;

const Z_exec = /*#__PURE__*/( () => theRegExp           (/(([+-])\d\d):(\d\d)$/).exec )();

const OFFSET_DATETIME_exec = /*#__PURE__*/( () => newRegExp   `
	^
	${YMD}
	[T ]
	${HMS}(?:\.\d{1,3})?
	(\d*?)0*
	(?:Z|[+-]${_23_}:${_59_})
	$`.exec )();

const OFFSET_DATETIME_ZERO_exec = /*#__PURE__*/( () => newRegExp   `
	^
	${YMD}
	[T ]
	${HMS}
	()
	Z
	$`.exec )();

const IS_LOCAL_DATETIME = /*#__PURE__*/( () => newRegExp`
	^
	${YMD}
	[T ]
	${HMS}
	(?:\.\d+)?
	$`.test )();

const IS_LOCAL_DATE = /*#__PURE__*/( () => newRegExp`
	^
	${YMD}
	$`.test )();

const IS_LOCAL_TIME = /*#__PURE__*/( () => newRegExp`
	^
	${HMS}
	(?:\.\d+)?
	$`.test )();

const DOT_ZERO = /\.?0+$/;
const DELIMITER_DOT = /[-T:.]/g;
const ZERO = /(?<=\.\d*)0+$/;

const Datetime = /*#__PURE__*/( () => {
	const Datetime = function (            ) {
		return this;
	}                                 ;//expression? :undefined, literal? :undefined, dotValue? :undefined
	//                                > .setTime()
	//                                > .getTime() : Date.parse('T')
	// [Symbol.toPrimitive]('number') > .valueOf()
	//                                > .toISOString()
	const descriptors = Null$1(null)                                         ;
	{
		const descriptor = Null$1(null);
		for ( const key of ownKeys(NativeDate.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(create$1(NativeDate.prototype, descriptors));
	return freeze(Datetime);
} )();

                                        
                                      
                                      
                                      
                                      
                                      
                                       
                                     
                                            
                             
                             

const Value = (ISOString        )        => ISOString.replace(ZERO, '').replace(DELIMITER_DOT, '');

const leap = (literal        ) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE = new NativeDate(0);

const OffsetDateTime_ISOString = Symbol('OffsetDateTime_ISOString');
const OffsetDateTime_value = Symbol('OffsetDateTime_value');
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
};
const OffsetDateTime_get = (that                                     , start        , end        ) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that                                     , start        , end        , value        )         => {
	if ( end ) { that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[OffsetDateTime_ISOString].slice(end); }
	const time = parse$2(that[OffsetDateTime_ISOString]);
	that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);
	return time;
};
const OffsetDateTime = Null$1(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString]        ;
	[OffsetDateTime_value]       ;
	
	valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		const { 1: more } = leap(literal) && ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		super();
		this[OffsetDateTime_ISOString] = literal.replace(' ', 'T');
		this[OffsetDateTime_value] = ( '' + parse$2(this[OffsetDateTime_ISOString]) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	getUTCFullYear (                    )           { return OffsetDateTime_use(this).getUTCFullYear(); }
	getFullYear (                    )           { return OffsetDateTime_get(this, 0, 4); }
	setFullYear (                      value          ) { return OffsetDateTime_set(this, 0, 4, value); }
	getUTCMonth (                    )        { return OffsetDateTime_use(this).getUTCMonth(); }
	getMonth (                    )        { return OffsetDateTime_get(this, 5, 7) - 1; }
	setMonth (                      value       ) { return OffsetDateTime_set(this, 5, 7, value + 1); }
	getUTCDate (                    )       { return OffsetDateTime_use(this).getUTCDate(); }
	getDate (                    )       { return OffsetDateTime_get(this, 8, 10); }
	setDate (                      value      ) { return OffsetDateTime_set(this, 8, 10, value); }
	
	getUTCHours (                    )        { return OffsetDateTime_use(this).getUTCHours(); }
	getHours (                    )        { return OffsetDateTime_get(this, 11, 13); }
	setHours (                      value       ) { return OffsetDateTime_set(this, 11, 13, value); }
	getUTCMinutes (                    )          { return OffsetDateTime_use(this).getUTCMinutes(); }
	getMinutes (                    )          { return OffsetDateTime_get(this, 14, 16); }
	setMinutes (                      value         ) { return OffsetDateTime_set(this, 14, 16, value); }
	getUTCSeconds (                    )          { return OffsetDateTime_use(this).getUTCSeconds(); }
	getSeconds (                    )          { return OffsetDateTime_get(this, 17, 19); }
	setSeconds (                      value         ) { return OffsetDateTime_set(this, 17, 19, value); }
	getUTCMilliseconds (                    )               { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	getMilliseconds (                    )               { return +this[OffsetDateTime_value].slice(12, 15); }///
	setMilliseconds (                      value              ) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		return OffsetDateTime_set(this, 0, 0, 0);
	}
	
	getUTCDay (                    )      { return OffsetDateTime_use(this).getUTCDay(); }
	getDay (                    )      {
		return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay();
	}
	getTimezoneOffset (                    )                 {
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	setTimezoneOffset (                      value                ) {
		value = +value;
		let string = OffsetDateTime_use(this, value*60000).toISOString().slice(0, -1);
		if ( value ) {
			if ( value>0 ) { string += '+'; }
			else {
				string += '-';
				value = -value;
			}
			const m = value%60;
			const h = ( value - m )/60;
			this[OffsetDateTime_ISOString] = string + ( h>9 ? h : '0' + h ) + ( m>9 ? ':' + m : ':0' + m );
		}
		else { this[OffsetDateTime_ISOString] = string + ( is(value, 0) ? 'Z' : '-00:00' ); }
	}
	getTime (                    )       { return +this[OffsetDateTime_value].slice(0, 15); }///
	setTime (                      value      ) {
		value = DATE.setTime(value);
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this[OffsetDateTime_value] = ( '' + value ).padStart(15, '0');
		return value;
	}
	
});

const LocalDateTime_ISOString = Symbol('LocalDateTime_ISOString');
const LocalDateTime_value = Symbol('LocalDateTime_value');
const LocalDateTime_get = (that                                    , start        , end        ) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that                                    , start        , end        , value        ) => {
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
const LocalDateTime = Null$1(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString]        ;
	[LocalDateTime_value]       ;
	
	valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && leap(literal) || throws(SyntaxError$1(`Invalid Local Date-Time ${literal}` + where(' at ')));
		super();
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = literal.replace(' ', 'T')
		);
		return this;
	}
	
	getFullYear (                   )           { return LocalDateTime_get(this, 0, 4); }
	setFullYear (                     value          ) { return LocalDateTime_set(this, 0, 4, value); }
	getMonth (                   )        { return LocalDateTime_get(this, 5, 7) - 1; }
	setMonth (                     value       ) { return LocalDateTime_set(this, 5, 7, value + 1); }
	getDate (                   )       { return LocalDateTime_get(this, 8, 10); }
	setDate (                     value      ) { return LocalDateTime_set(this, 8, 10, value); }
	
	getHours (                   )        { return LocalDateTime_get(this, 11, 13); }
	setHours (                     value       ) { return LocalDateTime_set(this, 11, 13, value); }
	getMinutes (                   )          { return LocalDateTime_get(this, 14, 16); }
	setMinutes (                     value         ) { return LocalDateTime_set(this, 14, 16, value); }
	getSeconds (                   )          { return LocalDateTime_get(this, 17, 19); }
	setSeconds (                     value         ) { return LocalDateTime_set(this, 17, 19, value); }
	getMilliseconds (                   )               { return +this[LocalDateTime_value].slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (                     value              ) {
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = this[LocalDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const LocalDate_ISOString = Symbol('LocalDate_ISOString');
const LocalDate_value = Symbol('LocalDate_value');
const LocalDate_get = (that                                , start        , end        ) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that                                , start        , end        , value        ) => {
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[LocalDate_ISOString].slice(end)
	);
};
const LocalDate = Null$1(class LocalDate extends Datetime {
	
	[LocalDate_ISOString]        ;
	[LocalDate_value]       ;
	
	valueOf (               )        { return this[LocalDate_value]; }
	toISOString (               )         { return this[LocalDate_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATE(literal) && leap(literal) || throws(SyntaxError$1(`Invalid Local Date ${literal}` + where(' at ')));
		super();
		this[LocalDate_value] = Value(
			this[LocalDate_ISOString] = literal
		);
		return this;
	}
	
	getFullYear (               )           { return LocalDate_get(this, 0, 4); }
	setFullYear (                 value          ) { return LocalDate_set(this, 0, 4, value); }
	getMonth (               )        { return LocalDate_get(this, 5, 7) - 1; }
	setMonth (                 value       ) { return LocalDate_set(this, 5, 7, value + 1); }
	getDate (               )       { return LocalDate_get(this, 8, 10); }
	setDate (                 value      ) { return LocalDate_set(this, 8, 10, value); }
	
});

const LocalTime_ISOString = Symbol('LocalTime_ISOString');
const LocalTime_value = Symbol('LocalTime_value');
const LocalTime_get = (that                                , start        , end        ) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that                                , start        , end        , value        ) => {
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + ( '' + value ).padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
};
const LocalTime = Null$1(class LocalTime extends Datetime {
	
	[LocalTime_ISOString]        ;
	[LocalTime_value]       ;
	
	valueOf (               )        { return this[LocalTime_value]; }
	toISOString (               )         { return this[LocalTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_TIME(literal) || throws(SyntaxError$1(`Invalid Local Time ${literal}` + where(' at ')));
		super();
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = literal
		);
		return this;
	}
	
	getHours (               )        { return LocalTime_get(this, 0, 2); }
	setHours (                 value       ) { return LocalTime_set(this, 0, 2, value); }
	getMinutes (               )          { return LocalTime_get(this, 3, 5); }
	setMinutes (                 value         ) { return LocalTime_set(this, 3, 5, value); }
	getSeconds (               )          { return LocalTime_get(this, 6, 8); }
	setSeconds (                 value         ) { return LocalTime_set(this, 6, 8, value); }
	getMilliseconds (               )               { return +this[LocalTime_value].slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (                 value              ) {
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = this[LocalTime_ISOString].slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const BigInt$1 = BigInt;

const INTEGER_D = /[-+]?(?:0|[1-9]\d*(?:_\d+)*)/;
const IS_D_INTEGER = /*#__PURE__*/( () => newRegExp`^${INTEGER_D}$`.test )();
const IS_XOB_INTEGER = /*#__PURE__*/( () => theRegExp(/^0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/).test )();
const UNDERSCORES_SIGN = /_|^[-+]/g;

const BigIntInteger = (literal        )         => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
	|| throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	let bigInt         = BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal[0]==='-' ) { bigInt = -bigInt; }
	allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| throws(RangeError$1(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
	|| throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	const number = literal[0]==='-'
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	isSafeInteger(number)
	|| throws(RangeError$1(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	const bigInt         = BigIntInteger(literal);
	return IntegerMin<=bigInt && bigInt<=IntegerMax ? +( bigInt+'' ) : bigInt;
};

const isFinite$1 = isFinite;

const IS_FLOAT = /*#__PURE__*/( () => newRegExp`
	^
	${INTEGER_D}
	(?=[.eE])
	(?:\.\d+(?:_\d+)*)?
	(?:[eE][-+]?\d+(?:_\d+)*)?
	$`.test )();
const UNDERSCORES = /_/g;
const IS_ZERO = /*#__PURE__*/( () => theRegExp(/^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0+)?$/).test )();

const Float = (literal        )         => {
	if ( IS_FLOAT(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		if ( sError ) {
			isFinite$1(number) || throws(RangeError$1(`Float has been as big as inf, like ${literal}` + where(' at ')));
			number || IS_ZERO(literal) || throws(RangeError$1(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + where(' at ')));
		}
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throws(SyntaxError$1(`Invalid Float ${literal}` + where(' at ')));
};

const parseInt$1 = parseInt;

const fromCodePoint = String.fromCodePoint;

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r', '"': '"', '/': '/', '\\': '\\' };

const ESCAPED_IN_SINGLE_LINE = /\\(?:([\\"btnfr/])|u(.{4})|U(.{8}))/gs;
const ESCAPED_IN_MULTI_LINE = /\n|\\(?: *(\n)[ \n]*|([\\"btnfr/])|u(.{4})|U(.{8}))/gs;

const unEscapeSingleLine = (
	match        ,
	p1                            ,
	p2         ,
	p3         
)         => {
	if ( p1 ) { return ESCAPE_ALIAS[p1]; }
	const codePoint         = parseInt$1(p2 ?? p3 , 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError$1(`Invalid Unicode Scalar ${p2 ? '\\u' + p2 : '\\U' + p3}` + where(' at ')));
	return fromCodePoint(codePoint);
};

let n = 0;

const unEscapeMultiLine = (
	match        ,
	p1                  ,
	p2                                       ,
	p3                    ,
	p4                    
)         => {
	if ( match==='\n' ) {
		++n;
		return useWhatToJoinMultiLineString;
	}
	if ( p1 ) { return ''; }
	if ( p2 ) { return ESCAPE_ALIAS[p2]; }
	const codePoint         = parseInt$1(p3 ?? p4 , 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError$1(`Invalid Unicode Scalar ${p3 ? '\\u' + p3 : '\\U' + p4}` + where(' at ', lineIndex + n)));
	return fromCodePoint(codePoint);
};

const BasicString = (literal        )         => literal.replace(ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);

const MultiLineBasicString = (literal        , skipped         )         => {
	n = skipped ? 1 : 0;
	return literal.replace(ESCAPED_IN_MULTI_LINE, unEscapeMultiLine);
};

const parseKeys = (key_key        )                          => {
	const keys = key_key.match(__KEYS)                           ;
	let index         = keys.length;
	do {
		const key         = keys[--index] ;
		if ( key.startsWith('\'') ) { keys[index] = key.slice(1, -1); }
		else if ( key[0]==='"' ) { keys[index] = BasicString(key.slice(1, -1)); }
	}
	while ( index );
	if ( disallowEmptyKey ) {
		let index         = keys.length;
		do { keys[--index] || throws(SyntaxError$1(`Empty key is not allowed before TOML v0.5` + where(', which at '))); }
		while ( index );
	}
	return keys;
};

const prepareTable = (table       , keys               )        => {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++] ;
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				isInline(table) && throws(Error$1(`Trying to define Table under static Inline Table` + where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && throws(Error$1(`Trying to append value to static Inline Array` + where(' at ')));
				table = table[( table          ).length - 1];
			}
			else { throws(Error$1(`Trying to define Table under non-Table value` + where(' at '))); }
		}
		else {
			table = table[key] = new Table(IMPLICITLY);
			while ( index<length ) { table = table[keys[index++] ] = new Table(IMPLICITLY); }
			return table;
		}
	}
	return table;
};

const appendTable = (table       , key_key        , asArrayItem         , tag        )        => {
	const leadingKeys           = parseKeys(key_key);
	const finalKey         = leadingKeys[leadingKeys.length - 1] ;
	--leadingKeys.length;
	table = prepareTable(table, leadingKeys);
	let lastTable       ;
	if ( asArrayItem ) {
		let arrayOfTables              ;
		if ( finalKey in table ) { isArray(arrayOfTables = table[finalKey]) && !isStatic(arrayOfTables) || throws(Error$1(`Trying to push Table to non-ArrayOfTables value` + where(' at '))); }
		else { arrayOfTables = table[finalKey] = newArray(OF_TABLES); }
		tag && collect(tag, arrayOfTables, table, finalKey);
		arrayOfTables[arrayOfTables.length] = lastTable = new Table(DIRECTLY);
	}
	else {
		if ( finalKey in table ) {
			lastTable = table[finalKey];
			wasDirectly(lastTable) && throws(Error$1(`Duplicate Table definition` + where(' at ')));
			directly(lastTable);
			fromPair(lastTable) && throws(Error$1(`A table defined implicitly via key/value pair can not be accessed to via []` + where(', which at ')));
		}
		else { table[finalKey] = lastTable = new Table(DIRECTLY); }
		tag && collect(tag, null, table, finalKey);
	}
	return lastTable;
};

const prepareInlineTable = (table       , keys          )        => {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++] ;
		if ( key in table ) {
			table = table[key];
			isTable(table) || throws(Error$1(`Trying to assign property through non-Table value` + where(' at ')));
			isInline(table) && throws(Error$1(`Trying to assign property through static Inline Table` + where(' at ')));
			fromPair(table) || throws(Error$1(`A table defined implicitly via [] can not be accessed to via key/value pair` + where(', which at ')));
		}
		else {
			table = table[key] = new Table(IMPLICITLY, PAIR);
			while ( index<length ) { table = table[keys[index++] ] = new Table(IMPLICITLY, PAIR); }
			return table;
		}
	}
	return table;
};

const checkLiteralString = (literal        )         => {
	__CONTROL_CHARACTER_EXCLUDE_test(literal) && throws(SyntaxError$1(`Control characters other than Tab are not permitted in a Literal String` + where(', which was found at ')));
	return literal;
};

const assignLiteralString = ( (table       , finalKey        , literal        )         => {
	if ( literal[1]!=='\'' || literal[2]!=='\'' ) {
		const $ = LITERAL_STRING_exec(literal) ?? throws(SyntaxError$1(`Bad literal string` + where(' at ')));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]) + $[2];
		return $[3];
	}
	if ( literal ) {
		checkLiteralString(literal);
		literal += useWhatToJoinMultiLineString;
	}
	const start = mark('Literal String');
	for ( ; ; ) {
		const line         = must(start);
		const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			table[finalKey] = literal + checkLiteralString($[1]) + $[2];
			return $[3];
		}
		literal += line + useWhatToJoinMultiLineString;
	}
} )     
	                                                           
	                                                          
 ;

const assignBasicString = ( (table       , finalKey        , literal        )         => {
	if ( literal[1]!=='"' || literal[2]!=='"' ) {
		const $ = BASIC_STRING_exec(literal);
		table[finalKey] = BasicString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = MULTI_LINE_BASIC_STRING_exec_0(literal);
	let { length } = $;
	if ( literal.startsWith('"""', length) ) {
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		length += 3;
		table[finalKey] = BasicString($) + ( endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
		return literal.slice(length).replace(PRE_WHITESPACE, '');
	}
	let skipped = true;
	if ( literal ) {
		literal += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		skipped = false;
	}
	const start = mark('Basic String');
	for ( ; ; ) {
		let line         = must(start);
		const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
		let { length } = $;
		if ( line.startsWith('"""', length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
			length += 3;
			table[finalKey] = MultiLineBasicString(literal + $, skipped) + ( endsWithQuote ? line[length]==='"' ? line[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		line += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		literal += line;
	}
} )     
	                                                           
	                                                          
 ;

const IS_OFFSET$ = /*#__PURE__*/( () => theRegExp(OFFSET$).test )();

const push = (lastArray       , lineRest        )         => {
	if ( lineRest[0]==='<' ) {
		const { 1: tag } = { 2: lineRest } = _VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError$1(`Bad tag ` + where(' at ')));
		collect(tag, lastArray, null);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case ']':
			case '':
			case '#':
				lastArray[lastArray.length] = undefined$1;
				return lineRest;
		}
	}
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(asStrings(lastArray), lastArray.length, lineRest);
		case '"':
			return assignBasicString(asStrings(lastArray), lastArray.length, lineRest);
		case '{':
			inlineTable || throws(SyntaxError$1(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			stacks_push(lineRest => equalInlineTable(asTables(lastArray), lastArray.length, lineRest));
			return lineRest;
		case '[':
			stacks_push(lineRest => equalStaticArray(asArrays(lastArray), lastArray.length, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError$1(`Bad atom value` + where(' at ')));
	if ( sFloat ) {
		if ( literal==='inf' || literal==='+inf' ) {
			asFloats(lastArray)[lastArray.length] = Infinity;
			return lineRest;
		}
		if ( literal==='-inf' ) {
			asFloats(lastArray)[lastArray.length] = -Infinity;
			return lineRest;
		}
		if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) {
			asFloats(lastArray)[lastArray.length] = NaN;
			return lineRest;
		}
	}
	if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError$1(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError$1(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
		return lineRest;
	}
	literal==='true' ? asBooleans(lastArray)[lastArray.length] = true : literal==='false' ? asBooleans(lastArray)[lastArray.length] = false :
		literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? asFloats(lastArray)[lastArray.length] = Float(literal) :
			enableNull && literal==='null' ? asNulls(lastArray)[lastArray.length] = null :
				asIntegers(lastArray)[lastArray.length] = Integer(literal);
	return lineRest;
};

const equalStaticArray = ( (table       , finalKey        , lineRest        )         => {
	const staticArray        = table[finalKey] = newArray(STATICALLY);
	const start = mark('Inline Array');
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	while ( !lineRest || lineRest[0]==='#' ) {
		lineRest = must(start).replace(PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
	const length = stacks_length;
	return function callee (lineRest) {
		for ( ; ; ) {
			lineRest = push(staticArray, lineRest);
			if ( stacks_length>length ) {
				stacks_insertBeforeLast(function inserted (lineRest) {
					//
					while ( !lineRest || lineRest[0]==='#' ) {//
						lineRest = must(start).replace(PRE_WHITESPACE, '');//
					}//
					if ( lineRest[0]===',' ) {//
						lineRest = lineRest.replace(SYM_WHITESPACE, '');//
						while ( !lineRest || lineRest[0]==='#' ) {//
							lineRest = must(start).replace(PRE_WHITESPACE, '');//
						}//
						if ( lineRest[0]===']' ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
					}//
					else {//
						if ( lineRest[0]===']' ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
						throws(SyntaxError$1(`Unexpect character after static array item value` + where(', which is found at ')));//
					}//
					//
					return callee(lineRest);
				});
				return lineRest;
			}
			while ( !lineRest || lineRest[0]==='#' ) {
				lineRest = must(start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===',' ) {
				lineRest = lineRest.replace(SYM_WHITESPACE, '');
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = must(start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest[0]===']' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
			}
			else {
				if ( lineRest[0]===']' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				throws(SyntaxError$1(`Unexpect character in static array item value` + where(', which is found at ')));
			}
		}
	}(lineRest);
} )     
	                                                            
	                                                           
 ;

const equalInlineTable = ( (table       , finalKey        , lineRest        )         => {
	const inlineTable        = table[finalKey] = new Table(DIRECTLY, INLINE);
	if ( allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
		const start = mark('Inline Table');
		lineRest = lineRest.replace(SYM_WHITESPACE, '');
		const length = stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = must(start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest[0]==='}' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				lineRest = assign(inlineTable, lineRest);
				if ( stacks_length>length ) {
					stacks_insertBeforeLast(function inserted (lineRest) {
						//
						while ( !lineRest || lineRest[0]==='#' ) {//
							lineRest = must(start).replace(PRE_WHITESPACE, '');//
						}//
						if ( lineRest[0]===',' ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				while ( !lineRest || lineRest[0]==='#' ) {
					lineRest = must(start).replace(PRE_WHITESPACE, '');
				}
				if ( lineRest[0]===',' ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
			}
		}(lineRest);
	}
	else {
		lineRest = lineRest.replace(SYM_WHITESPACE, '');
		if ( lineRest[0]==='}' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
		lineRest && lineRest[0]!=='#' || throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
		const length = stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = assign(inlineTable, lineRest);
				if ( stacks_length>length ) {
					stacks_insertBeforeLast(function inserted (lineRest) {
						//
						if ( lineRest[0]==='}' ) { return lineRest.replace(SYM_WHITESPACE, ''); }//
						if ( lineRest[0]===',' ) {//
							lineRest = lineRest.replace(SYM_WHITESPACE, '');//
							lineRest[0]==='}' && throws(SyntaxError$1(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));//
						}//
						( !lineRest || lineRest[0]==='#' ) && throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest[0]==='}' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '');
					lineRest[0]==='}' && throws(SyntaxError$1(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));
				}
				( !lineRest || lineRest[0]==='#' ) && throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
			}
		}(lineRest);
	}
} )     
	                                                            
	                                                           
 ;

const assign = (lastInlineTable       , lineRest        )         => {
	const { left, tag } = { right: lineRest } = KEY_VALUE_PAIR_exec_groups(lineRest);
	const leadingKeys           = parseKeys(left);
	const finalKey         = leadingKeys[leadingKeys.length - 1] ;
	--leadingKeys.length;
	const table        = prepareInlineTable(lastInlineTable, leadingKeys);
	finalKey in table && throws(Error$1(`Duplicate property definition` + where(' at ')));
	if ( tag ) {
		collect(tag, null, table, finalKey);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case '}':
			case '':
			case '#':
				table[finalKey] = undefined$1;
				return lineRest;
		}
	}
	switch ( lineRest && lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '{':
			inlineTable || throws(SyntaxError$1(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			stacks_push((lineRest        )         => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			stacks_push((lineRest        )         => equalStaticArray(table, finalKey, lineRest));
			return lineRest;
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError$1(`Bad atom value` + where(' at ')));
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
			if ( IS_OFFSET$(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError$1(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError$1(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		table[finalKey] = new LocalDate(literal);
		return lineRest;
	}
	table[finalKey] =
		literal==='true' ? true : literal==='false' ? false :
			literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
				enableNull && literal==='null' ? null :
					Integer(literal);
	return lineRest;
};
const Root = ()        => {
	const rootTable        = new Table;
	let lastSectionTable        = rootTable;
	while ( rest() ) {
		const line         = next().replace(PRE_WHITESPACE, '');
		if ( line ) {
			if ( line[0]==='[' ) {
				const { $_asArrayItem$$, keys, $$asArrayItem$_, tag } = TABLE_DEFINITION_exec_groups(line);
				$_asArrayItem$$===$$asArrayItem$_ || throws(SyntaxError$1(`Square brackets of Table definition statement not match` + where(' at ')));
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tag);
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError$1(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				let rest         = assign(lastSectionTable, line);
				while ( stacks_length ) { rest = stacks_pop()(rest); }
				rest && rest[0]!=='#' && throws(SyntaxError$1(`Unexpect charachtor after key/value pair` + where(' at ')));
			}
		}
	}
	return rootTable;
};

const IS_NON_SCALAR = /*#__PURE__*/( () => theRegExp(NON_SCALAR).test )();
const BOM = '\uFEFF';
const buf2str = (buf        ) => {
	const str = buf.toString();
	if ( !from(str).equals(buf) ) { throw Error$1('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
	return str[0]===BOM ? str.slice(1) : str;
};

const parse = (source        , specificationVersion                                   , multiLineJoiner        , useBigInt                   , xOptions                     )        => {
	could();
	let sourcePath        ;
	if ( isBuffer(source) ) {
		source = buf2str(source);
		sourcePath = '';
	}
	else if ( typeof source==='object' && source ) {
		sourcePath = source.path;
		if ( typeof sourcePath!=='string' ) { throw TypeError$1('TOML.parse(source.path)'); }
		const { data } = source;
		if ( data===undefined$1 ) { source = buf2str(( globalThis$1.require('fs')                        ).readFileSync(sourcePath)); }
		else if ( isBuffer(data) ) { source = buf2str(data); }
		else if ( typeof data==='string' ) { source = data; }
		else { throw TypeError$1('TOML.parse(source.data)'); }
	}
	else if ( typeof source==='string' ) { sourcePath = ''; }
	else { throw TypeError$1('TOML.parse(source)'); }
	try {
		if ( IS_NON_SCALAR(source) ) { throw Error$1('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
		try {
			use(specificationVersion, multiLineJoiner, useBigInt, xOptions);
			todo(source, sourcePath);
			try {
				const rootTable = Root();
				process();
				return rootTable;
			}
			finally {
				//clearWeakSets();
				done();
			}
		}
		finally { clear(); }
	}
	finally { clearRegExp(); }
};

const parse$1 = /*#__PURE__*/assign$1(
	(source        , specificationVersion                                   , multiLineJoiner        , useBigInt                   , xOptions                     ) => typeof specificationVersion==='number'
		? parse(source, specificationVersion, multiLineJoiner, useBigInt, xOptions)
		: parse(source, 1.0, specificationVersion          , multiLineJoiner                                       , useBigInt                      ),
	{
		'1.0': (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multiLineJoiner, useBigInt, xOptions),
		1.0: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 1.0, multiLineJoiner, useBigInt, xOptions),
		0.5: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.5, multiLineJoiner, useBigInt, xOptions),
		0.4: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.4, multiLineJoiner, useBigInt, xOptions),
		0.3: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.3, multiLineJoiner, useBigInt, xOptions),
		0.2: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.2, multiLineJoiner, useBigInt, xOptions),
		0.1: (source        , multiLineJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multiLineJoiner, useBigInt, xOptions),
	}
);

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
});

export default _export;
export { parse$1 as parse, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai11dGYvc3JjL05PTl9TQ0FMQVIudHMiLCJpdGVyYXRvciQwLnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvVGFibGUudHMiLCJyZWdleHBzJDAudHMiLCJvcHRpb25zJDAudHMiLCJ0eXBlcy9BcnJheS50cyIsInR5cGVzL0RhdGV0aW1lLnRzIiwidHlwZXMvSW50ZWdlci50cyIsInR5cGVzL0Zsb2F0LnRzIiwidHlwZXMvU3RyaW5nLnRzIiwicGFyc2Uvb24tdGhlLXNwb3QudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwicGFyc2UvLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzEuMTQuMCc7IiwiaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBleGVjIGZyb20gJy5SZWdFeHAucHJvdG90eXBlLmV4ZWMnO1xuXG5leHBvcnQgdmFyIFRlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZCh0ZXN0ICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiB0ZXN0LmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZXhwb3J0IHZhciBFeGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoZXhlYyAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gZXhlYy5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn07XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZT8nO1xuaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHk/JztcblxuaW1wb3J0IHsgVGVzdCwgRXhlYyB9IGZyb20gJy4vdGhlUmVnRXhwJztcblxudmFyIE5UID0gL1tcXG5cXHRdKy9nO1xudmFyIEVTQ0FQRSA9IC9cXFxcLi9nO1xuZnVuY3Rpb24gZ3JhdmVBY2NlbnRSZXBsYWNlciAoJCQgICAgICAgICkgeyByZXR1cm4gJCQ9PT0nXFxcXGAnID8gJ2AnIDogJCQ7IH1cblxudmFyIGluY2x1ZGVzID0gJycuaW5jbHVkZXMgICAgICAgXG5cdD8gZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKTsgfVxuXHQ6IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKT4tMTsgfTtcblxuZnVuY3Rpb24gUkUgKCAgICAgICAgICAgICAgIHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgVSA9IHRoaXMuVTtcblx0dmFyIEkgPSB0aGlzLkk7XG5cdHZhciBNID0gdGhpcy5NO1xuXHR2YXIgUyA9IHRoaXMuUztcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXSAucmVwbGFjZShOVCwgJycpO1xuXHR2YXIgaW5kZXggPSAxO1xuXHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHR2YXIgdmFsdWUgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICkgeyBzb3VyY2UgKz0gdmFsdWU7IH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciB2YWx1ZV9zb3VyY2UgPSB2YWx1ZS5zb3VyY2U7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZV9zb3VyY2UhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdzb3VyY2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS51bmljb2RlPT09VSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3VuaWNvZGUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5pZ25vcmVDYXNlPT09SSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2lnbm9yZUNhc2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5tdWx0aWxpbmU9PT1NICYmICggaW5jbHVkZXModmFsdWVfc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJyQnKSApICkgeyB0aHJvdyBTeW50YXhFcnJvcignbXVsdGlsaW5lJyk7IH1cblx0XHRcdGlmICggdmFsdWUuZG90QWxsPT09UyAmJiBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICcuJykgKSB7IHRocm93IFN5bnRheEVycm9yKCdkb3RBbGwnKTsgfVxuXHRcdFx0c291cmNlICs9IHZhbHVlX3NvdXJjZTtcblx0XHR9XG5cdFx0c291cmNlICs9IHJhd1tpbmRleCsrXSAucmVwbGFjZShOVCwgJycpO1xuXHR9XG5cdHZhciByZSAgICAgICAgID0gUmVnRXhwKFUgPyBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShFU0NBUEUsIGdyYXZlQWNjZW50UmVwbGFjZXIpIDogc291cmNlLCB0aGlzLmZsYWdzKTtcblx0dmFyIHRlc3QgPSByZS50ZXN0ID0gVGVzdChyZSk7XG5cdHZhciBleGVjID0gcmUuZXhlYyA9IEV4ZWMocmUpO1xuXHR0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSBVO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSBJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/IE0gOiBudWxsO1xuXHR0ZXN0LmRvdEFsbCA9IGV4ZWMuZG90QWxsID0gaW5jbHVkZXMoc291cmNlLCAnLicpID8gUyA6IG51bGw7XG5cdHJldHVybiByZTtcbn1cblxudmFyIFJFX2JpbmQgPSBiaW5kICYmIC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoUkUgICAgICAgKTtcblxuZnVuY3Rpb24gQ29udGV4dCAoZmxhZ3MgICAgICAgICkgICAgICAgICAge1xuXHRyZXR1cm4ge1xuXHRcdFU6ICFpbmNsdWRlcyhmbGFncywgJ3UnKSxcblx0XHRJOiAhaW5jbHVkZXMoZmxhZ3MsICdpJyksXG5cdFx0TTogIWluY2x1ZGVzKGZsYWdzLCAnbScpLFxuXHRcdFM6ICFpbmNsdWRlcyhmbGFncywgJ3MnKSxcblx0XHRmbGFnczogZmxhZ3Ncblx0fTtcbn1cblxudmFyIENPTlRFWFQgICAgICAgICAgPSAvKiNfX1BVUkVfXyovQ29udGV4dCgnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb3h5XG5cdD8gLyojX19QVVJFX18qL25ldyBQcm94eShSRSwge1xuXHRcdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdFx0LFxuXHRcdGdldDogZnVuY3Rpb24gKFJFLCBmbGFncyAgICAgICAgKSB7IHJldHVybiBSRV9iaW5kKENvbnRleHQoZmxhZ3MpKTsgfVxuXHRcdCxcblx0XHRkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHQsXG5cdFx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH0pXG5cdDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHRSRS5hcHBseSA9IFJFLmFwcGx5O1xuXHRcdHZhciBuZXdSZWdFeHAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShDT05URVhULCBhcmd1bWVudHMgICAgICAgKTsgfSAgICAgICA7XG5cdFx0Zm9yICggdmFyIGZsYWdzID0gNjM7IGZsYWdzLS07ICkge1xuXHRcdFx0KCBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0XHRuZXdSZWdFeHBbY29udGV4dC5mbGFnc10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMgICAgICAgKTsgfTtcblx0XHRcdH0gKShDb250ZXh0KFxuXHRcdFx0XHQoIGZsYWdzICYgMzIgPyAnJyA6ICdnJyApICtcblx0XHRcdFx0KCBmbGFncyAmIDE2ID8gJycgOiAnaScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgOCA/ICcnIDogJ20nICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDQgPyAnJyA6ICdzJyApICtcblx0XHRcdFx0KCBmbGFncyAmICAyID8gJycgOiAndScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMSA/ICcnIDogJ3knIClcblx0XHRcdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gZnJlZXplID8gZnJlZXplKG5ld1JlZ0V4cCkgOiBuZXdSZWdFeHA7XG5cdH0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdCd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlXG5cdFx0PyBSZWdFeHAoJ1tcXFxcdUQ4MDAtXFxcXHVERkZGXScsICd1Jylcblx0XHQ6IC9bXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS9cbik7XG5cbi8vIFxcdXsxMTAwMDB9LVxcdXtGRkZGRkZGRn0gLT4gXFx1RkZGRFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcblxuLy9pbXBvcnQgKiBhcyBvcHRpb25zXFwkMCBmcm9tICcuL29wdGlvbnNcXCQwJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gXG5leHBvcnQgY29uc3QgdGhyb3dzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IChlcnJvciAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdC8vaWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IGRvbmUoKTsgb3B0aW9uc1xcJDAuY2xlYXIoKTsgfVxuXHR0aHJvdyBlcnJvcjtcbn07XG5cbmNvbnN0IHByZXZpb3VzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICAoKTtcbmNvbnN0IHByZXZpb3VzX2dldCA9IC8qI19fUFVSRV9fKi9nZXQuYmluZChwcmV2aW91cykgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IHByZXZpb3VzX3NldCA9IC8qI19fUFVSRV9fKi9zZXQuYmluZChwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3Qgbm9vcCAgICAgICA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3Qgbm9vcCAgICAgICA9ICgpICAgICAgICAgPT4gJyc7XG5cdHByZXZpb3VzX3NldChub29wLCBub29wKTtcblx0cmV0dXJuIG5vb3A7XG59ICkoKTtcblxuZXhwb3J0IGxldCBzdGFja3NfbGVuZ3RoID0gMDtcbmxldCBsYXN0ICAgICAgID0gbm9vcDtcblxuZXhwb3J0IGNvbnN0IGNvdWxkID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgdGhyb3cgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLicpOyB9XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCxzb3VyY2VQYXRoKScpOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG5cdHN0YWNrc19sZW5ndGggPSAwO1xuXHRsYXN0ID0gbm9vcDtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXh0ID0gKCkgICAgICAgICA9PiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xuXG5leHBvcnQgY29uc3QgcmVzdCA9ICgpICAgICAgICAgID0+IGxpbmVJbmRleCE9PWxhc3RMaW5lSW5kZXg7XG5cbmV4cG9ydCBjb25zdCBtYXJrID0gKHR5cGUgICAgICAgICkgPT4gKCB7IHR5cGUsIGxpbmVJbmRleCB9ICk7XG5cbmV4cG9ydCBjb25zdCBtdXN0ID0gKG1hcmtlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgPT4ge1xuXHRsaW5lSW5kZXg9PT1sYXN0TGluZUluZGV4ICYmIHRocm93cyhTeW50YXhFcnJvcihgJHttYXJrZXIudHlwZX0gaXMgbm90IGNsb3NlIHVudGlsIHRoZSBlbmQgb2YgdGhlIGZpbGVgICsgd2hlcmUoJywgd2hpY2ggc3RhcnRlZCBmcm9tICcsIG1hcmtlci5saW5lSW5kZXgpKSk7XG5cdHJldHVybiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCBpbmRleCAgICAgICAgID0gbGluZUluZGV4KSAgICAgICAgID0+IHNvdXJjZUxpbmVzPT09Tk9ORSA/ICcnIDpcblx0c291cmNlUGF0aFxuXHRcdD8gYFxcbiAgICBhdCAoJHtzb3VyY2VQYXRofToke2luZGV4ICsgMX06MSlgXG5cdFx0OiBgJHtwcmV9bGluZSAke2luZGV4ICsgMX06ICR7c291cmNlTGluZXNbaW5kZXhdfWA7XG5cbmV4cG9ydCBjb25zdCBkb25lID0gKCkgICAgICAgPT4ge1xuXHRzb3VyY2VQYXRoID0gJyc7XG5cdHNvdXJjZUxpbmVzID0gTk9ORTtcblx0bGFzdCA9IG5vb3A7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX3BvcCA9ICgpICAgICAgID0+IHtcblx0Y29uc3QgaXRlbSAgICAgICA9IGxhc3Q7XG5cdGxhc3QgPSBwcmV2aW91c19nZXQobGFzdCk7XG5cdC0tc3RhY2tzX2xlbmd0aDtcblx0cmV0dXJuIGl0ZW07XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX3B1c2ggPSAoaXRlbSAgICAgICkgICAgICAgPT4ge1xuXHRwcmV2aW91c19zZXQoaXRlbSwgbGFzdCk7XG5cdGxhc3QgPSBpdGVtO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX2luc2VydEJlZm9yZUxhc3QgPSAoaXRlbSAgICAgICkgICAgICAgPT4ge1xuXHRwcmV2aW91c19zZXQoaXRlbSwgcHJldmlvdXNfZ2V0KGxhc3QpKTtcblx0cHJldmlvdXNfc2V0KGxhc3QsIGl0ZW0pO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59O1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHknO1xuaW1wb3J0IE9iamVjdF9hc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IE9iamVjdF9jcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IE9iamVjdF9pcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgT2JqZWN0X2RlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBPYmplY3RfZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgT2JqZWN0X2ZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IFJlZmxlY3RfY29uc3RydWN0IGZyb20gJy5SZWZsZWN0LmNvbnN0cnVjdCc7XG5pbXBvcnQgUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9vd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBLZWVwZXIgPSAgICAgKCkgICAgICA9PiBbXTtcblxuY29uc3QgaGFzT3duUHJvcGVydHlfY2FsbCA9IC8qI19fUFVSRV9fKi9oYXNPd25Qcm9wZXJ0eS5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duUHJvcGVydHlfY2FsbCh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSk7XG5cdFx0fVxuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGtlZXBlcltrZWVwZXIubGVuZ3RoXSA9IGtleTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGRlbGV0ZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGNvbnN0IGluZGV4ID0ga2VlcGVyLmluZGV4T2Yoa2V5KTtcblx0XHRcdGluZGV4PDAgfHwgLS1rZWVwZXIuY29weVdpdGhpbihpbmRleCwgaW5kZXggKyAxKS5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzOiAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICkgPT4gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdGNvbnN0cnVjdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAsIGFyZ3MgICAsIG5ld1RhcmdldCAgICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2NvbnN0cnVjdCh0YXJnZXQsIGFyZ3MsIG5ld1RhcmdldCkpLFxuXHRhcHBseTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpc0FyZyAgICwgYXJncyAgICkgICAgPT4gb3JkZXJpZnkoUmVmbGVjdF9hcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpKSxcbn0pO1xuXG5jb25zdCBuZXdQcm94eSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAsIGtlZXBlciAgICAgICAgICAgKSAgICA9PiB7XG5cdHRhcmdldDJrZWVwZXIuc2V0KHRhcmdldCwga2VlcGVyKTtcblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkgICAodGFyZ2V0LCBoYW5kbGVycyk7XG5cdHByb3h5MnRhcmdldC5zZXQocHJveHksIHRhcmdldCk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc09yZGVyZWQgPSAob2JqZWN0ICAgICAgICApICAgICAgICAgID0+IHByb3h5MnRhcmdldC5oYXMob2JqZWN0KTtcbmV4cG9ydCBjb25zdCBpcyA9IChvYmplY3QxICAgICAgICAsIG9iamVjdDIgICAgICAgICkgICAgICAgICAgPT4gT2JqZWN0X2lzKFxuXHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDEpIHx8IG9iamVjdDEsXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MikgfHwgb2JqZWN0Mixcbik7XG5cbmV4cG9ydCBjb25zdCBvcmRlcmlmeSA9ICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICA9PiB7XG5cdGlmICggcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpICkgeyByZXR1cm4gb2JqZWN0OyB9XG5cdGxldCBwcm94eSA9IHRhcmdldDJwcm94eS5nZXQob2JqZWN0KSAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHByb3h5ICkgeyByZXR1cm4gcHJveHk7IH1cblx0cHJveHkgPSBuZXdQcm94eShvYmplY3QsIE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSkpO1xuXHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkpO1xuXHRyZXR1cm4gcHJveHk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgeyBjcmVhdGUgfSA9IHtcblx0Y3JlYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm90byAgICAgICAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGlmICggZGVzY3JpcHRvck1hcHMubGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvck1hcCAgICAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8pICAgICAgICwga2VlcGVyICAgICAgICk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBkZWZpbmVQcm9wZXJ0aWVzIH0gPSB7XG5cdGRlZmluZVByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3QgICAsIGRlc2NyaXB0b3JNYXAgICAgLCAuLi5kZXNjcmlwdG9yTWFwcyAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3Qga2VlcGVyID0gS2VlcGVyICAgICAgICAgICAoKTtcblx0XHRkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2Fzc2lnbihuZXdQcm94eShPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgLCBrZWVwZXIpLCBkZXNjcmlwdG9yTWFwLCAuLi5kZXNjcmlwdG9yTWFwcyk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3RfZGVmaW5lUHJvcGVydGllcyhvcmRlcmlmeShvYmplY3QpLCBkZXNjcmlwdG9yTWFwKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCBrZWVwZXIgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICAgICAgICAoKSwgUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KSApO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShkZXNjcmlwdG9yTWFwLCBrZWVwZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IE51bGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiB0aHJvd0NvbnN0cnVjdGluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aCAnbmV3J2ApOyB9XG5cdGZ1bmN0aW9uIHRocm93QXBwbHlpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydgKTsgfVxuXHRjb25zdCBOdWxsaWZ5ID0gKGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0XHRkZWxldGUgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXHRcdE9iamVjdF9mcmVlemUoY29uc3RydWN0b3IucHJvdG90eXBlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdH07XG5cdGZ1bmN0aW9uIE51bGwgKCAgICAgICAgICAgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0PyBuZXcudGFyZ2V0PT09TnVsbFxuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi90aHJvd0NvbnN0cnVjdGluZygpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL25ld1Byb3h5KHRoaXMsIEtlZXBlciAgICAgKCkpXG5cdFx0XHQ6IHR5cGVvZiBjb25zdHJ1Y3Rvcj09PSdmdW5jdGlvbidcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovTnVsbGlmeShjb25zdHJ1Y3Rvcilcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovdGhyb3dBcHBseWluZygpO1xuXHR9XG5cdC8vQHRzLWlnbm9yZVxuXHROdWxsLnByb3RvdHlwZSA9IG51bGw7XG5cdE9iamVjdF9kZWZpbmVQcm9wZXJ0eShOdWxsLCAnbmFtZScsIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgeyB2YWx1ZTogJycsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSkpO1xuXHQvL2RlbGV0ZSBOdWxsLmxlbmd0aDtcblx0T2JqZWN0X2ZyZWV6ZShOdWxsKTtcblx0cmV0dXJuIE51bGw7XG59KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBERUZBVUxUID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oY2xhc3MgZXh0ZW5kcyBudWxsIHsgd3JpdGFibGUgKCkge30gZW51bWVyYWJsZSAoKSB7fSBjb25maWd1cmFibGUgKCkge30gfS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwge1xuXHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHR3cml0YWJsZTogdHJ1ZSxcblx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxufSk7XG5leHBvcnQgY29uc3QgZnJvbUVudHJpZXMgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVudHJpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfZnJvbUVudHJpZXMoZW50cmllcyk7XG5cdGNvbnN0IGtlZXBlciAgICAgICAgICAgID0gT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAoKSwgUmVmbGVjdF9vd25LZXlzKHRhcmdldCkpO1xuXHRpZiAoIHByb3RvPT09dW5kZWZpbmVkICkgeyByZXR1cm4gbmV3UHJveHkodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0aWYgKCBwcm90bz09PW51bGwgKSB7IHJldHVybiBuZXdQcm94eShPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUocHJvdG8pLCB0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0bGV0IGluZGV4ID0gMDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdCggZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2NyZWF0ZShERUZBVUxUKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlID0gdGFyZ2V0W2tleV07XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXApICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7XG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE51bGwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBkZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IE51bGwgYXMgb3JkZXJpZnlfTnVsbCB9IGZyb20gJ0BsdGQvai1vcmRlcmlmeSc7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBESVJFQ1RMWSA9IHRydWU7XG5leHBvcnQgY29uc3QgSU1QTElDSVRMWSA9IGZhbHNlO1xuY29uc3QgaW1wbGljaXRUYWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChpbXBsaWNpdFRhYmxlcyk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19oYXMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuZXhwb3J0IGNvbnN0IHdhc0RpcmVjdGx5ID0gKHRhYmxlICAgICAgICkgICAgICAgICAgPT4gIWltcGxpY2l0VGFibGVzX2hhcyh0YWJsZSk7XG5leHBvcnQgY29uc3QgZGlyZWN0bHkgPSAvKiNfX1BVUkVfXyovZGVsLmJpbmQoaW1wbGljaXRUYWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBJTkxJTkUgPSB0cnVlO1xuY29uc3QgaW5saW5lVGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbmxpbmVUYWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGlubGluZVRhYmxlcyk7XG5leHBvcnQgY29uc3QgaXNJbmxpbmUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW5saW5lVGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5jb25zdCBwYWlycyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgcGFpcnNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHBhaXJzKTtcbmV4cG9ydCBjb25zdCBmcm9tUGFpciA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChwYWlycykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IFBsYWluVGFibGUgPSBOdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgTnVsbCAgICAgIHtcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lICYmIGlubGluZVRhYmxlc19hZGQodGhpcylcblx0XHRcdDogKCBpc0lubGluZSA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IE9yZGVyZWRUYWJsZSA9IE51bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUgJiYgaW5saW5lVGFibGVzX2FkZCh0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5cbi8qIG5lc3RlZCAocmVhZGFibGUpICovXG5cbmNvbnN0IFdoaXRlc3BhY2UgPSAvWyBcXHRdLztcblxuZXhwb3J0IGNvbnN0IFBSRV9XSElURVNQQUNFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgICkoKTtcblxuZXhwb3J0IGNvbnN0IFZBTFVFX1JFU1RfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQoXG5cdFx0KD86XFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQgXFxkKT9cblx0XHRbXFx3XFwtKy46XStcblx0KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5leHBvcnQgY29uc3QgTElURVJBTF9TVFJJTkdfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQnKFteJ10qKSdcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5cbmNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMF8xXzIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygnezAsMn0pXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuY29uc3QgTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoKVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcbmV4cG9ydFxubGV0IF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYCApKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICBgXG5cdF5cblx0JHtXaGl0ZXNwYWNlfSpcblx0PVxuXHQke1doaXRlc3BhY2V9KlxuXHQoPzpcblx0XHQ8KCR7VGFnfSk+XG5cdFx0JHtXaGl0ZXNwYWNlfSpcblx0KT9cblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuZXhwb3J0IGNvbnN0IF9WQUxVRV9QQUlSX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBUQUdfUkVTVF9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJdK3xcXFxcLnxcIlwiPyg/IVwiKSkvcykuZXhlYyApKCk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wID0gKF8gICAgICAgICkgICAgICAgICA9PiB7XG5cdGxldCBfMCAgICAgICAgID0gJyc7XG5cdHdoaWxlICggXyApIHtcblx0XHRjb25zdCAkID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlYyhfKTtcblx0XHRpZiAoICEkICkgeyBicmVhazsgfVxuXHRcdF8wICs9ICRbMF07XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG5cdHJldHVybiBfMDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18WyBcXHRdKlxcblsgXFx0XFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiAgICAgICAgO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpO1xuXG5jb25zdCBCQVNJQ19TVFJJTkdfVEFCX19fX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmxldCBfX0JBU0lDX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBCQVNJQ19TVFJJTkdfZXhlYyA9IChfMiAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0XzIgPSBfMi5zbGljZSgxKTtcblx0Zm9yICggbGV0IF8xICAgICAgICAgPSAnJzsgOyApIHtcblx0XHRjb25zdCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfMik7XG5cdFx0aWYgKCAhJCApIHtcblx0XHRcdF8yWzBdPT09J1wiJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdHJldHVybiB7IDE6IF8xLCAyOiBfMi5yZXBsYWNlKFNZTV9XSElURVNQQUNFLCAnJykgfTtcblx0XHR9XG5cdFx0XzEgKz0gJFswXTtcblx0XHRfMiA9IF8yLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0fVxufTtcblxuY29uc3QgRE9UX0tFWV9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLlsgXFx0XSovKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX1NUUklDVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXltcXHctXSsvKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX0ZSRUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKS5leGVjICkoKTtcbmxldCBfX0JBUkVfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgTElURVJBTF9LRVlfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pLmV4ZWMgKSgpO1xuY29uc3QgTElURVJBTF9LRVlfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZdKicvKS5leGVjICkoKTtcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgICA7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgICAgICAgICA7XG5cbmNvbnN0IGdldEtleXMgPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGtleXMgICAgICAgICA9ICcnO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0aWYgKCBfWzBdPT09J1wiJyApIHtcblx0XHRcdF8gPSBfLnNsaWNlKDEpO1xuXHRcdFx0bGV0IGtleSAgICAgICAgID0gJ1wiJztcblx0XHRcdGxldCAkICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHRcdHdoaWxlICggKCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfKSApICkge1xuXHRcdFx0XHRfID0gXy5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdFx0XHRcdGtleSArPSAkWzBdO1xuXHRcdFx0fVxuXHRcdFx0X1swXT09PSdcIicgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXNpYyBzdHJpbmcga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XyA9IF8uc2xpY2UoMSk7XG5cdFx0XHRrZXlzICs9IGtleSArICdcIic7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggXy5zdGFydHNXaXRoKCdcXCcnKSA/IF9fTElURVJBTF9LRVlfZXhlYyA6IF9fQkFSRV9LRVlfZXhlYyApKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgJHtfLnN0YXJ0c1dpdGgoJ1xcJycpID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRfID0gXy5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGtleXMgKz0ga2V5O1xuXHRcdH1cblx0XHRjb25zdCAkID0gRE9UX0tFWV9leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHRcdGtleXMgKz0gJFswXTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgJF9hc0FycmF5SXRlbSQkICAgICAgICAgID0gX1sxXT09PSdbJztcblx0aWYgKCAkX2FzQXJyYXlJdGVtJCQgKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRfID0gXy5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgXyA9IF8uc2xpY2UoMSk7IH1cblx0XyA9IF8ucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRjb25zdCBrZXlzICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRfID0gXy5zbGljZShrZXlzLmxlbmd0aCkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRfWzBdPT09J10nIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBUYWJsZSBoZWFkZXIgaXMgbm90IGNsb3NlZGAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdGNvbnN0ICQkYXNBcnJheUl0ZW0kXyAgICAgICAgICA9IF9bMV09PT0nXSc7XG5cdF8gPSBfLnNsaWNlKCQkYXNBcnJheUl0ZW0kXyA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBfWzBdPT09JzwnICkgeyAoIHsgMTogdGFnLCAyOiBfIH0gPSBUQUdfUkVTVF9leGVjKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdCFfIHx8IF9bMF09PT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4geyAkX2FzQXJyYXlJdGVtJCQsIGtleXMsICQkYXNBcnJheUl0ZW0kXywgdGFnIH07XG59O1xuXG5leHBvcnQgY29uc3QgS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsZWZ0ICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnLCAyOiByaWdodCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhfLnNsaWNlKGxlZnQubGVuZ3RoKSkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCBidXQgbWlzc2luZyBhdCAnKSkpO1xuXHR0YWcgfHwgcmlnaHQgJiYgcmlnaHRbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVmdCwgdGFnLCByaWdodCB9O1xufTtcblxuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pLnRlc3QgKSgpO1xuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0vKS50ZXN0ICkoKTtcbmV4cG9ydFxubGV0IF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBLRVlTX1NUUklDVCA9IC9bXFx3LV0rfFwiKD86W15cXFxcXCJdK3xcXFxcLikqXCJ8J1teJ10qJy9ncztcbmNvbnN0IEtFWVNfRlJFRSA9IC9bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSp8XCIoPzpbXlxcXFxcIl0rfFxcXFwuKSpcInwnW14nXSonL2dzO1xuZXhwb3J0XG5sZXQgX19LRVlTICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hSZWdFeHAgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAgPT4ge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMjtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkdfZXhlYyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9fX187XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX19fX19fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HX2V4ZWMgPSBCQVNJQ19TVFJJTkdfX19fX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9fX19fXztcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX1NUUklDVDtcblx0XHRcdF9fS0VZUyA9IEtFWVNfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0g7XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTUlOX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IFBsYWluVGFibGUsIE9yZGVyZWRUYWJsZSB9IGZyb20gJy4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4vcmVnZXhwcyQwJztcblxuLyogb3B0aW9ucyAqL1xuXG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgICAgICAgIDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWluICAgICAgICA7XG5leHBvcnQgbGV0IEludGVnZXJNYXggICAgICAgIDtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG4gIFxuZXhwb3J0IGxldCBlbmRzV2l0aFF1b3RlICAgICAgICAgO1xuZXhwb3J0IGxldCB6ZXJvRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGlubGluZVRhYmxlICAgICAgICAgO1xuZXhwb3J0IGxldCBtb3JlRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FsbG93RW1wdHlLZXkgICAgICAgICA7XG4vL2V4cG9ydCBjb25zdCB4b2IgOmJvb2xlYW4gPSB0cnVlO1xuZXhwb3J0IGxldCBzRXJyb3IgICAgICAgICA7XG5leHBvcnQgbGV0IHNGbG9hdCAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBsZXQgVGFibGUgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93TG9uZ2VyICAgICAgICAgO1xuZXhwb3J0IGxldCBlbmFibGVOdWxsICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlcyA9IG5ldyBXZWFrTWFwICAgICAgICAgICAoKTtcbmNvbnN0IGFycmF5VHlwZXNfZ2V0ID0gLyojX19QVVJFX18qL2dldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXNfc2V0ID0gLyojX19QVVJFX18qL3NldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEFzID0gKCkgICAgID0+IHtcblx0Y29uc3QgYXMgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4ge1xuXHRcdGNvbnN0IGdvdCA9IGFycmF5VHlwZXNfZ2V0KGFycmF5KTtcblx0XHRnb3Rcblx0XHRcdD8gZ290PT09YXMgfHwgaXRlcmF0b3IkMC50aHJvd3MoVHlwZUVycm9yKGBUeXBlcyBpbiBBcnJheSBtdXN0IGJlIHNhbWVgICsgaXRlcmF0b3IkMC53aGVyZSgnLiBDaGVjayAnKSkpXG5cdFx0XHQ6IGFycmF5VHlwZXNfc2V0KGFycmF5LCBhcyk7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9O1xuXHRyZXR1cm4gYXM7XG59O1xuY29uc3QgQVNfVFlQRUQgPSB7XG5cdGFzTnVsbHM6IEFzKCksXG5cdGFzU3RyaW5nczogQXMoKSxcblx0YXNUYWJsZXM6IEFzKCksXG5cdGFzQXJyYXlzOiBBcygpLFxuXHRhc0Jvb2xlYW5zOiBBcygpLFxuXHRhc0Zsb2F0czogQXMoKSxcblx0YXNJbnRlZ2VyczogQXMoKSxcblx0YXNPZmZzZXREYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlczogQXMoKSxcblx0YXNMb2NhbFRpbWVzOiBBcygpLFxufTtcbmNvbnN0IGFzTWl4ZWQgICAgID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IGFycmF5O1xuZXhwb3J0IGxldFxuXHRhc051bGxzICAgICxcblx0YXNTdHJpbmdzICAgICxcblx0YXNUYWJsZXMgICAgLFxuXHRhc0FycmF5cyAgICAsXG5cdGFzQm9vbGVhbnMgICAgLFxuXHRhc0Zsb2F0cyAgICAsXG5cdGFzSW50ZWdlcnMgICAgLFxuXHRhc09mZnNldERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZXMgICAgLFxuXHRhc0xvY2FsVGltZXMgICAgO1xuXG4vKiB4T3B0aW9ucy50YWcgKi9cblxubGV0IHByb2Nlc3NvciAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxubGV0IGNvbGxlY3Rpb24gICAgICAgICAgICAgID0gW107XG5sZXQgY29sbGVjdGlvbl9sZW5ndGggICAgICAgICA9IDA7XG5jb25zdCBjb2xsZWN0X29uID0gKHRhZyAgICAgICAgLCBhcnJheSAgICAgICAgICAgICAgLCB0YWJsZSAgICAgICAgICAgICAgLCBrZXkgICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3QgZWFjaCA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0ZWFjaC50YWcgPSB0YWc7XG5cdGlmICggdGFibGUgKSB7XG5cdFx0ZWFjaC50YWJsZSA9IHRhYmxlO1xuXHRcdGVhY2gua2V5ID0ga2V5IDtcblx0fVxuXHRpZiAoIGFycmF5ICkge1xuXHRcdGVhY2guYXJyYXkgPSBhcnJheTtcblx0XHRlYWNoLmluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXHR9XG5cdGNvbGxlY3Rpb25bY29sbGVjdGlvbl9sZW5ndGgrK10gPSBlYWNoO1xufTtcbmNvbnN0IGNvbGxlY3Rfb2ZmID0gKCkgICAgICAgID0+IHsgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYHhPcHRpb25zLnRhZyBpcyBub3QgZW5hYmxlZCwgYnV0IGZvdW5kIHRhZyBzeW50YXhgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH07XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG5leHBvcnQgY29uc3QgcHJvY2VzcyA9ICgpICAgICAgID0+IHtcblx0aWYgKCBjb2xsZWN0aW9uX2xlbmd0aCApIHtcblx0XHRpdGVyYXRvciQwLmRvbmUoKTtcblx0XHRjb25zdCBwcm9jZXNzID0gcHJvY2Vzc29yIDtcblx0XHRjb25zdCBxdWV1ZSA9IGNvbGxlY3Rpb247XG5cdFx0cHJvY2Vzc29yID0gbnVsbDtcblx0XHRjb2xsZWN0aW9uID0gW107XG5cdFx0d2hpbGUgKCBjb2xsZWN0aW9uX2xlbmd0aC0tICkge1xuXHRcdFx0cHJvY2VzcyhxdWV1ZVtjb2xsZWN0aW9uX2xlbmd0aF0gKTtcblx0XHRcdHF1ZXVlLmxlbmd0aCA9IGNvbGxlY3Rpb25fbGVuZ3RoO1xuXHRcdH1cblx0fVxufTtcblxuLyogdXNlICYgY2xlYXIgKi9cblxuZXhwb3J0IGNvbnN0IGNsZWFyID0gKCkgICAgICAgPT4ge1xuXHRwcm9jZXNzb3IgPSBudWxsO1xuXHRjb2xsZWN0aW9uLmxlbmd0aCA9IGNvbGxlY3Rpb25fbGVuZ3RoID0gMDtcblx0emVyb0RhdGV0aW1lID0gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlID0gKHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgKSAgICAgICA9PiB7XG5cdFxuXHRsZXQgbWl4ZWQgICAgICAgICA7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdGRpc2FsbG93RW1wdHlLZXkgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4zOlxuXHRcdFx0ZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjI6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMTpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCxzcGVjaWZpY2F0aW9uVmVyc2lvbiknKTtcblx0fVxuXHRyZWdleHBzJDAuc3dpdGNoUmVnRXhwKHNwZWNpZmljYXRpb25WZXJzaW9uKTtcblx0XG5cdGlmICggdHlwZW9mIG11bHRpTGluZUpvaW5lcj09PSdzdHJpbmcnICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nID0gbXVsdGlMaW5lSm9pbmVyOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCxtdWx0aUxpbmVKb2luZXIpJyk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKHVzZUJpZ0ludCkgKSB7IHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0dXNpbmdCaWdJbnQgPSBudWxsO1xuXHRcdGlmICggdXNlQmlnSW50Pj0wICkgeyBJbnRlZ2VyTWluID0gLSggSW50ZWdlck1heCA9IHVzZUJpZ0ludCApOyB9XG5cdFx0ZWxzZSB7IEludGVnZXJNYXggPSAtKCBJbnRlZ2VyTWluID0gdXNlQmlnSW50ICktMTsgfVxuXHRcdGlmICggSW50ZWdlck1pbiA8IE1JTl9TQUZFX0lOVEVHRVIgfHwgTUFYX1NBRkVfSU5URUdFUiA8IEludGVnZXJNYXggKSB7IHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdH1cblx0XG5cdGlmICggeE9wdGlvbnM9PW51bGwgfHwgeE9wdGlvbnM9PT1mYWxzZSApIHtcblx0XHRUYWJsZSA9IFBsYWluVGFibGU7XG5cdFx0c0Vycm9yID0gYWxsb3dMb25nZXIgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IGZhbHNlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggeE9wdGlvbnM9PT10cnVlICkge1xuXHRcdFRhYmxlID0gT3JkZXJlZFRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gc0Vycm9yID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSB0cnVlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHhPcHRpb25zPT09J2Z1bmN0aW9uJyApIHtcblx0XHRUYWJsZSA9IE9yZGVyZWRUYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9IHNFcnJvciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdHJ1ZTtcblx0XHRpZiAoICFtaXhlZCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx0YWcpIG5lZWRzIGF0IGxlYXN0IFRPTUwgMS4wIHRvIHN1cHBvcnQgbWl4ZWQgdHlwZSBhcnJheScpOyB9XG5cdFx0cHJvY2Vzc29yID0geE9wdGlvbnM7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdH1cblx0ZWxzZSB7XG5cdFx0Y29uc3QgeyBvcmRlciwgbG9uZ2VyLCBleGFjdCwgbnVsbDogX251bGwsIG11bHRpLCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGlmICggb3duS2V5cyh1bmtub3duKS5sZW5ndGggKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpJyk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICEhbG9uZ2VyO1xuXHRcdHNFcnJvciA9ICEhZXhhY3Q7XG5cdFx0ZW5hYmxlTnVsbCA9ICEhX251bGw7XG5cdFx0YWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9ICEhbXVsdGk7XG5cdFx0aWYgKCB0YWcgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiB0YWchPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zLnRhZyknKTsgfVxuXHRcdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXknKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuXG5jb25zdCBhcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoYXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gLyojX19QVVJFX18qL2hhcy5iaW5kKGFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgT0ZfVEFCTEVTID0gZmFsc2U7XG5leHBvcnQgY29uc3QgU1RBVElDQUxMWSA9IHRydWU7XG5jb25zdCBzdGF0aWNhbEFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3Qgc3RhdGljYWxBcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHN0YXRpY2FsQXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc1N0YXRpYyA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChzdGF0aWNhbEFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG5ld0FycmF5ID0gKGlzU3RhdGljICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCBhcnJheSAgICAgICAgPSBbXTtcblx0YXJyYXlzX2FkZChhcnJheSk7XG5cdGlzU3RhdGljICYmIHN0YXRpY2FsQXJyYXlzX2FkZChhcnJheSk7XG5cdHJldHVybiBhcnJheTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcbiBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IE5hdGl2ZURhdGUgZnJvbSAnLkRhdGUnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy5EYXRlLnBhcnNlJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuXG5jb25zdCBfMjlfID0gLyg/OjBbMS05XXwxXFxkfDJbMC05XSkvO1xuY29uc3QgXzMwXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzMCkvO1xuY29uc3QgXzMxXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzWzAxXSkvO1xuY29uc3QgXzIzXyA9IC8oPzpbMDFdXFxkfDJbMC0zXSkvO1xuY29uc3QgXzU5XyA9IC9bMC01XVxcZC87XG5cbmNvbnN0IFlNRCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XFxkXFxkXFxkXFxkLVxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRbMTM1NzhdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdFs0NjldLSR7XzMwX31cblx0XHRcdHxcblx0XHRcdDItJHtfMjlffVxuXHRcdClcblx0XHR8XG5cdFx0MVxuXHRcdCg/OlxuXHRcdFx0WzAyXS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHQxLSR7XzMwX31cblx0XHQpXG5cdClgICkoKTtcblxuY29uc3QgSE1TID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHQke18yM199OiR7XzU5X306JHtfNTlffVxuXHRgICkoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86WnxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgWl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwICAgICAgICAgICAoLygoWystXSlcXGRcXGQpOihcXGRcXGQpJC8pLmV4ZWMgKSgpO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUVfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU30oPzpcXC5cXGR7MSwzfSk/XG5cdChcXGQqPykwKlxuXHQoPzpafFsrLV0ke18yM199OiR7XzU5X30pXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUVfWkVST19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfVxuXHQoKVxuXHRaXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9EQVRFVElNRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9EQVRFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgSVNfTE9DQUxfVElNRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBaRVJPID0gLyg/PD1cXC5cXGQqKTArJC87XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgJycpLnJlcGxhY2UoREVMSU1JVEVSX0RPVCwgJycpO1xuXG5jb25zdCBsZWFwID0gKGxpdGVyYWwgICAgICAgICkgPT4gbGl0ZXJhbC5zbGljZSg1LCAxMCkhPT0nMDItMjknIHx8ICtsaXRlcmFsLnNsaWNlKDAsIDQpJTQ9PT0wICYmIGxpdGVyYWwuc2xpY2UoMiwgNCkhPT0nMDAnO1xuXG5jb25zdCBEQVRFID0gbmV3IE5hdGl2ZURhdGUoMCk7XG5cbmNvbnN0IE9mZnNldERhdGVUaW1lX0lTT1N0cmluZyA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3VzZSA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJCAgICAgICAgID0gMCkgPT4ge1xuXHREQVRFLnNldFRpbWUoK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICsgJCk7XG5cdHJldHVybiBEQVRFO1xufTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBlbmQgKSB7IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpOyB9XG5cdGNvbnN0IHRpbWUgPSBwYXJzZSh0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHR0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB0aW1lICkucGFkU3RhcnQoMTUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNSk7XG5cdHJldHVybiB0aW1lO1xufTtcbmV4cG9ydCBjb25zdCBPZmZzZXREYXRlVGltZSA9IE51bGwoY2xhc3MgT2Zmc2V0RGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdGNvbnN0IHsgMTogbW9yZSB9ID0gbGVhcChsaXRlcmFsKSAmJiAoIG9wdGlvbnMkMC56ZXJvRGF0ZXRpbWUgPyBPRkZTRVRfREFURVRJTUVfWkVST19leGVjIDogT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgKShsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHBhcnNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSkgKS5wYWRTdGFydCgxNSwgJzAnKSArICggbW9yZSA/ICcuJyArIG1vcmUgOiAnJyApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRVVENGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRnVsbFllYXIoKTsgfVxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0VVRDRGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXRlKCk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRVVENNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbnV0ZXMoKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0VVRDU2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENTZWNvbmRzKCk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDEyLCAxNSk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDApO1xuXHR9XG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHRnZXREYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSo2MDAwMCkuZ2V0VVRDRGF5KCk7XG5cdH1cblx0Z2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHRyZXR1cm4geiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDA7XG5cdH1cblx0c2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgICApIHtcblx0XHR2YWx1ZSA9ICt2YWx1ZTtcblx0XHRsZXQgc3RyaW5nID0gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHZhbHVlKjYwMDAwKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0aWYgKCB2YWx1ZT4wICkgeyBzdHJpbmcgKz0gJysnOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3RyaW5nICs9ICctJztcblx0XHRcdFx0dmFsdWUgPSAtdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtID0gdmFsdWUlNjA7XG5cdFx0XHRjb25zdCBoID0gKCB2YWx1ZSAtIG0gKS82MDtcblx0XHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHN0cmluZyArICggaD45ID8gaCA6ICcwJyArIGggKSArICggbT45ID8gJzonICsgbSA6ICc6MCcgKyBtICk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBzdHJpbmcgKyAoIGlzKHZhbHVlLCAwKSA/ICdaJyA6ICctMDA6MDAnICk7IH1cblx0fVxuXHRnZXRUaW1lICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDAsIDE1KTsgfS8vL1xuXHRzZXRUaW1lICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMTUsICcwJyk7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxEYXRlVGltZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PiB7XG5cdHRoYXRbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGVUaW1lID0gTnVsbChjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFVElNRShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbERhdGVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsRGF0ZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSBOdWxsKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHR2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbFRpbWVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsVGltZV92YWx1ZScpO1xuY29uc3QgTG9jYWxUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgyLCAnMCcpICsgdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsVGltZSA9IE51bGwoY2xhc3MgTG9jYWxUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbFRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIFRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAwLCAyKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsVGltZV9zZXQodGhpcywgMCwgMiwgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAzLCA1KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gTG9jYWxUaW1lX3NldCh0aGlzLCA2LCA4LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxUaW1lX3ZhbHVlXS5zbGljZSg2LCA5KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgOCkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBCaWdJbnQgZnJvbSAnLkJpZ0ludCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1cXGQqKD86X1xcZCspKikvO1xuY29uc3QgSVNfRF9JTlRFR0VSID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYF4ke0lOVEVHRVJfRH0kYC50ZXN0ICkoKTtcbmNvbnN0IElTX1hPQl9JTlRFR0VSID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eMCg/OnhbMC05QS1GYS1mXSsoPzpfWzAtOUEtRmEtZl0rKSp8b1swLTddKyg/Ol9bMC03XSspKnxiWzAxXSsoPzpfWzAxXSspKikkLykudGVzdCApKCk7XG5jb25zdCBVTkRFUlNDT1JFU19TSUdOID0gL198XlstK10vZztcblxuY29uc3QgQmlnSW50SW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19EX0lOVEVHRVIobGl0ZXJhbClcblx0fHwgLypvcHRpb25zXFwkMC54b2IgJiYgKi9JU19YT0JfSU5URUdFUihsaXRlcmFsKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGxldCBiaWdJbnQgICAgICAgICA9IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0aWYgKCBsaXRlcmFsWzBdPT09Jy0nICkgeyBiaWdJbnQgPSAtYmlnSW50OyB9XG5cdG9wdGlvbnMkMC5hbGxvd0xvbmdlclxuXHR8fCAtOTIyMzM3MjAzNjg1NDc3NTgwOG48PWJpZ0ludCAmJiBiaWdJbnQ8PTkyMjMzNzIwMzY4NTQ3NzU4MDduLy8gKCBtaW4gPSAtKDJuKiooNjRuLTFuKSkgfHwgfm1heCApIDw9IGxvbmcgPD0gKCBtYXggPSAybioqKDY0bi0xbiktMW4gfHwgfm1pbiApXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0RfSU5URUdFUihsaXRlcmFsKVxuXHR8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyID0gbGl0ZXJhbFswXT09PSctJ1xuXHRcdD8gLWxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJylcblx0XHQ6ICtsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpO1xuXHRpc1NhZmVJbnRlZ2VyKG51bWJlcilcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBkaWQgbm90IHVzZSBCaXRJbnQgbXVzdCBmaXQgTnVtYmVyLmlzU2FmZUludGVnZXIsIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMkMC51c2luZ0JpZ0ludD09PXRydWUgKSB7IHJldHVybiBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09ZmFsc2UgKSB7IHJldHVybiBOdW1iZXJJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gQmlnSW50SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIG9wdGlvbnMkMC5JbnRlZ2VyTWluPD1iaWdJbnQgJiYgYmlnSW50PD1vcHRpb25zJDAuSW50ZWdlck1heCA/ICsoIGJpZ0ludCsnJyApIDogYmlnSW50O1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG4vL2ltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuLy9pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuaW1wb3J0IHsgSU5URUdFUl9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBJU19GTE9BVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke0lOVEVHRVJfRH1cblx0KD89Wy5lRV0pXG5cdCg/OlxcLlxcZCsoPzpfXFxkKykqKT9cblx0KD86W2VFXVstK10/XFxkKyg/Ol9cXGQrKSopP1xuXHQkYC50ZXN0ICkoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IElTX1pFUk8gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC5bMF9dKyk/KD86W2VFXVstK10/MCspPyQvKS50ZXN0ICkoKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggSVNfRkxPQVQobGl0ZXJhbCkgKSB7XG5cdFx0Y29uc3QgbnVtYmVyID0gK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpO1xuXHRcdGlmICggb3B0aW9ucyQwLnNFcnJvciApIHtcblx0XHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgYmlnIGFzIGluZiwgbGlrZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0bnVtYmVyIHx8IElTX1pFUk8obGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgbGl0dGxlIGFzICR7bGl0ZXJhbFswXT09PSctJyA/ICctJyA6ICcnfTAsIGxpa2UgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bWJlcjtcblx0fVxuXHQvL2lmICggb3B0aW9uc1xcJDAuc0Zsb2F0ICkge1xuXHQvL1x0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHsgcmV0dXJuIEluZmluaXR5OyB9XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7IHJldHVybiAtSW5maW5pdHk7IH1cblx0Ly9cdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHsgcmV0dXJuIE5hTjsgfVxuXHQvL31cblx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgRmxvYXQgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcbn07XG4iLCJpbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgcGFyc2VJbnQgZnJvbSAnLnBhcnNlSW50JztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuY29uc3QgRVNDQVBFX0FMSUFTID0geyBiOiAnXFxiJywgdDogJ1xcdCcsIG46ICdcXG4nLCBmOiAnXFxmJywgcjogJ1xccicsICdcIic6ICdcIicsICcvJzogJy8nLCAnXFxcXCc6ICdcXFxcJyB9O1xuXG5jb25zdCBFU0NBUEVEX0lOX1NJTkdMRV9MSU5FID0gL1xcXFwoPzooW1xcXFxcImJ0bmZyL10pfHUoLns0fSl8VSguezh9KSkvZ3M7XG5jb25zdCBFU0NBUEVEX0lOX01VTFRJX0xJTkUgPSAvXFxufFxcXFwoPzogKihcXG4pWyBcXG5dKnwoW1xcXFxcImJ0bmZyL10pfHUoLns0fSl8VSguezh9KSkvZ3M7XG5cbmNvbnN0IHVuRXNjYXBlU2luZ2xlTGluZSA9IChcblx0bWF0Y2ggICAgICAgICxcblx0cDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXHRwMiAgICAgICAgICxcblx0cDMgICAgICAgICBcbikgICAgICAgICA9PiB7XG5cdGlmICggcDEgKSB7IHJldHVybiBFU0NBUEVfQUxJQVNbcDFdOyB9XG5cdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocDIgPz8gcDMgLCAxNik7XG5cdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwMiA/ICdcXFxcdScgKyBwMiA6ICdcXFxcVScgKyBwM31gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG59O1xuXG5sZXQgbiA9IDA7XG5cbmNvbnN0IHVuRXNjYXBlTXVsdGlMaW5lID0gKFxuXHRtYXRjaCAgICAgICAgLFxuXHRwMSAgICAgICAgICAgICAgICAgICxcblx0cDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdHAzICAgICAgICAgICAgICAgICAgICAsXG5cdHA0ICAgICAgICAgICAgICAgICAgICBcbikgICAgICAgICA9PiB7XG5cdGlmICggbWF0Y2g9PT0nXFxuJyApIHtcblx0XHQrK247XG5cdFx0cmV0dXJuIG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG5cdGlmICggcDEgKSB7IHJldHVybiAnJzsgfVxuXHRpZiAoIHAyICkgeyByZXR1cm4gRVNDQVBFX0FMSUFTW3AyXTsgfVxuXHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHAzID8/IHA0ICwgMTYpO1xuXHQoIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHQmJiBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cDMgPyAnXFxcXHUnICsgcDMgOiAnXFxcXFUnICsgcDR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnLCBpdGVyYXRvciQwLmxpbmVJbmRleCArIG4pKSk7XG5cdHJldHVybiBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG59O1xuXG5leHBvcnQgY29uc3QgQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IGxpdGVyYWwucmVwbGFjZShFU0NBUEVEX0lOX1NJTkdMRV9MSU5FLCB1bkVzY2FwZVNpbmdsZUxpbmUpO1xuXG5leHBvcnQgY29uc3QgTXVsdGlMaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCBza2lwcGVkICAgICAgICAgKSAgICAgICAgID0+IHtcblx0biA9IHNraXBwZWQgPyAxIDogMDtcblx0cmV0dXJuIGxpdGVyYWwucmVwbGFjZShFU0NBUEVEX0lOX01VTFRJX0xJTkUsIHVuRXNjYXBlTXVsdGlMaW5lKTtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIHdhc0RpcmVjdGx5LCBkaXJlY3RseSwgZnJvbVBhaXIgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZywgTXVsdGlMaW5lQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcblxuZXhwb3J0IGNvbnN0IHBhcnNlS2V5cyA9IChrZXlfa2V5ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGtleXMgPSBrZXlfa2V5Lm1hdGNoKHJlZ2V4cHMkMC5fX0tFWVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRsZXQgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoO1xuXHRkbyB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzWy0taW5kZXhdIDtcblx0XHRpZiAoIGtleS5zdGFydHNXaXRoKCdcXCcnKSApIHsga2V5c1tpbmRleF0gPSBrZXkuc2xpY2UoMSwgLTEpOyB9XG5cdFx0ZWxzZSBpZiAoIGtleVswXT09PSdcIicgKSB7IGtleXNbaW5kZXhdID0gQmFzaWNTdHJpbmcoa2V5LnNsaWNlKDEsIC0xKSk7IH1cblx0fVxuXHR3aGlsZSAoIGluZGV4ICk7XG5cdGlmICggb3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDtcblx0XHRkbyB7IGtleXNbLS1pbmRleF0gfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGtleSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXggKTtcblx0fVxuXHRyZXR1cm4ga2V5cztcbn07XG5cbmNvbnN0IHByZXBhcmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpZiAoIGlzVGFibGUodGFibGUpICkge1xuXHRcdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KHRhYmxlKSApIHtcblx0XHRcdFx0aXNTdGF0aWModGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIHN0YXRpYyBJbmxpbmUgQXJyYXlgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlID0gdGFibGVbKCB0YWJsZSAgICAgICAgICApLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSk7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFkpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBlbmRUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleV9rZXkgICAgICAgICwgYXNBcnJheUl0ZW0gICAgICAgICAsIHRhZyAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBwYXJzZUtleXMoa2V5X2tleSk7XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsZWFkaW5nS2V5cy5sZW5ndGggLSAxXSA7XG5cdC0tbGVhZGluZ0tleXMubGVuZ3RoO1xuXHR0YWJsZSA9IHByZXBhcmVUYWJsZSh0YWJsZSwgbGVhZGluZ0tleXMpO1xuXHRsZXQgbGFzdFRhYmxlICAgICAgIDtcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRsZXQgYXJyYXlPZlRhYmxlcyAgICAgICAgICAgICAgO1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7IGlzQXJyYXkoYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSkgJiYgIWlzU3RhdGljKGFycmF5T2ZUYWJsZXMpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gcHVzaCBUYWJsZSB0byBub24tQXJyYXlPZlRhYmxlcyB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdGVsc2UgeyBhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoT0ZfVEFCTEVTKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh0YWcsIGFycmF5T2ZUYWJsZXMsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0YXJyYXlPZlRhYmxlc1thcnJheU9mVGFibGVzLmxlbmd0aF0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkge1xuXHRcdFx0bGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldO1xuXHRcdFx0d2FzRGlyZWN0bHkobGFzdFRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgRHVwbGljYXRlIFRhYmxlIGRlZmluaXRpb25gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRkaXJlY3RseShsYXN0VGFibGUpO1xuXHRcdFx0ZnJvbVBhaXIobGFzdFRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIGtleS92YWx1ZSBwYWlyIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIFtdYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFkpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0fVxuXHRyZXR1cm4gbGFzdFRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbmxpbmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aXNUYWJsZSh0YWJsZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZnJvbVBhaXIodGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEgW10gY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNoZWNrTGl0ZXJhbFN0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGl0ZXJhbCkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBhIExpdGVyYWwgU3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiBsaXRlcmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkxpdGVyYWxTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbFsxXSE9PSdcXCcnIHx8IGxpdGVyYWxbMl0hPT0nXFwnJyApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBsaXRlcmFsIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0bGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMyk7XG5cdGNvbnN0ICQgPSByZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCk7XG5cdGlmICggJCApIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdHJldHVybiAkWzNdO1xuXHR9XG5cdGlmICggbGl0ZXJhbCApIHtcblx0XHRjaGVja0xpdGVyYWxTdHJpbmcobGl0ZXJhbCk7XG5cdFx0bGl0ZXJhbCArPSBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZztcblx0fVxuXHRjb25zdCBzdGFydCA9IGl0ZXJhdG9yJDAubWFyaygnTGl0ZXJhbCBTdHJpbmcnKTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaW5lKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsICsgY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0XHRsaXRlcmFsICs9IGxpbmUgKyBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZztcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJhc2ljU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGxpdGVyYWxbMV0hPT0nXCInIHx8IGxpdGVyYWxbMl0hPT0nXCInICkge1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWMobGl0ZXJhbCk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gQmFzaWNTdHJpbmcoJFsxXSk7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0bGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMyk7XG5cdGNvbnN0ICQgPSByZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wKGxpdGVyYWwpO1xuXHRsZXQgeyBsZW5ndGggfSA9ICQ7XG5cdGlmICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIlwiXCInLCBsZW5ndGgpICkge1xuXHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxlbmd0aCArPSAzO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEJhc2ljU3RyaW5nKCQpICsgKCBvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSA/IGxpdGVyYWxbbGVuZ3RoXT09PSdcIicgPyBsaXRlcmFsWysrbGVuZ3RoXT09PSdcIicgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyA6ICcnICk7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGxldCBza2lwcGVkID0gdHJ1ZTtcblx0aWYgKCBsaXRlcmFsICkge1xuXHRcdGxpdGVyYWwgKz0gJ1xcbic7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c2tpcHBlZCA9IGZhbHNlO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdCYXNpYyBTdHJpbmcnKTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGxldCBsaW5lICAgICAgICAgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wKGxpbmUpO1xuXHRcdGxldCB7IGxlbmd0aCB9ID0gJDtcblx0XHRpZiAoIGxpbmUuc3RhcnRzV2l0aCgnXCJcIlwiJywgbGVuZ3RoKSApIHtcblx0XHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0bGVuZ3RoICs9IDM7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBNdWx0aUxpbmVCYXNpY1N0cmluZyhsaXRlcmFsICsgJCwgc2tpcHBlZCkgKyAoIG9wdGlvbnMkMC5lbmRzV2l0aFF1b3RlID8gbGluZVtsZW5ndGhdPT09J1wiJyA/IGxpbmVbKytsZW5ndGhdPT09J1wiJyA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnIDogJycgKTtcblx0XHRcdHJldHVybiBsaW5lLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0bGluZSArPSAnXFxuJztcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRsaXRlcmFsICs9IGxpbmU7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgSU5MSU5FLCBESVJFQ1RMWSB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IG5ld0FycmF5LCBTVEFUSUNBTExZIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgT2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLCBPRkZTRVQkIH0gZnJvbSAnLi4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gJy4uL3R5cGVzL0ludGVnZXInO1xuaW1wb3J0IHsgRmxvYXQgfSBmcm9tICcuLi90eXBlcy9GbG9hdCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMkMCBmcm9tICcuLi9yZWdleHBzJDAnO1xuaW1wb3J0IHsgYXBwZW5kVGFibGUsIHBhcnNlS2V5cywgcHJlcGFyZUlubGluZVRhYmxlLCBhc3NpZ25MaXRlcmFsU3RyaW5nLCBhc3NpZ25CYXNpY1N0cmluZyB9IGZyb20gJy4vb24tdGhlLXNwb3QnO1xuXG5jb25zdCBJU19PRkZTRVQkID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKE9GRlNFVCQpLnRlc3QgKSgpO1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGxpbmVSZXN0WzBdPT09JzwnICkge1xuXHRcdGNvbnN0IHsgMTogdGFnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuX1ZBTFVFX1BBSVJfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWcgYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgbGFzdEFycmF5LCBudWxsKTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnXSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdGxhc3RBcnJheVtsYXN0QXJyYXkubGVuZ3RoXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcob3B0aW9ucyQwLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMkMC5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucyQwLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKGxpbmVSZXN0ID0+IGVxdWFsSW5saW5lVGFibGUob3B0aW9ucyQwLmFzVGFibGVzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKGxpbmVSZXN0ID0+IGVxdWFsU3RhdGljQXJyYXkob3B0aW9ucyQwLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggb3B0aW9ucyQwLnNGbG9hdCApIHtcblx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBJbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSAtSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gTmFOO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0b3B0aW9ucyQwLmFzT2Zmc2V0RGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHRvcHRpb25zJDAuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMkMC5hc0xvY2FsVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRvcHRpb25zJDAuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRsaXRlcmFsPT09J3RydWUnID8gb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWUgOiBsaXRlcmFsPT09J2ZhbHNlJyA/IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBmYWxzZSA6XG5cdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgPyBvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEZsb2F0KGxpdGVyYWwpIDpcblx0XHRcdG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgPyBvcHRpb25zJDAuYXNOdWxscyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbnVsbCA6XG5cdFx0XHRcdG9wdGlvbnMkMC5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5jb25zdCBlcXVhbFN0YXRpY0FycmF5ID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IHtcblx0Y29uc3Qgc3RhdGljQXJyYXkgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoU1RBVElDQUxMWSk7XG5cdGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdJbmxpbmUgQXJyYXknKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBmdW5jdGlvbiBjYWxsZWUgKGxpbmVSZXN0KSB7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0bGluZVJlc3QgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHsvL1xuXHRcdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgey8vXG5cdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRlbHNlIHsvL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBhZnRlciBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7Ly9cblx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fShsaW5lUmVzdCk7XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmNvbnN0IGVxdWFsSW5saW5lVGFibGUgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4ge1xuXHRjb25zdCBpbmxpbmVUYWJsZSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRpZiAoIG9wdGlvbnMkMC5hbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdJbmxpbmUgVGFibGUnKTtcblx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0Y29uc3QgbGVuZ3RoID0gaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjYWxsZWUgKGxpbmVSZXN0KSB7XG5cdFx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdGxpbmVSZXN0ID0gYXNzaWduKGlubGluZVRhYmxlLCBsaW5lUmVzdCk7XG5cdFx0XHRcdGlmICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoPmxlbmd0aCApIHtcblx0XHRcdFx0XHRpdGVyYXRvciQwLnN0YWNrc19pbnNlcnRCZWZvcmVMYXN0KGZ1bmN0aW9uIGluc2VydGVkIChsaW5lUmVzdCkge1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0fVxuXHRcdH0obGluZVJlc3QpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpOy8vXG5cdFx0XHRcdFx0XHR9Ly9cblx0XHRcdFx0XHRcdCggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpOy8vXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHRcdGxpbmVSZXN0WzBdPT09J30nICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdH1cblx0XHR9KGxpbmVSZXN0KTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBhc3NpZ24gPSAobGFzdElubGluZVRhYmxlICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVmdCwgdGFnIH0gPSB7IHJpZ2h0OiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzKGxpbmVSZXN0KTtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgID0gcGFyc2VLZXlzKGxlZnQpO1xuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gbGVhZGluZ0tleXNbbGVhZGluZ0tleXMubGVuZ3RoIC0gMV0gO1xuXHQtLWxlYWRpbmdLZXlzLmxlbmd0aDtcblx0Y29uc3QgdGFibGUgICAgICAgID0gcHJlcGFyZUlubGluZVRhYmxlKGxhc3RJbmxpbmVUYWJsZSwgbGVhZGluZ0tleXMpO1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgRHVwbGljYXRlIHByb3BlcnR5IGRlZmluaXRpb25gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggdGFnICkge1xuXHRcdG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnfSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucyQwLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IGVxdWFsSW5saW5lVGFibGUodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaCgobGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiBlcXVhbFN0YXRpY0FycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBvcHRpb25zJDAuc0Zsb2F0ICkge1xuXHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBJbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gLUluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBOYU47XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdHRhYmxlW2ZpbmFsS2V5XSA9XG5cdFx0bGl0ZXJhbD09PSd0cnVlJyA/IHRydWUgOiBsaXRlcmFsPT09J2ZhbHNlJyA/IGZhbHNlIDpcblx0XHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpID8gRmxvYXQobGl0ZXJhbCkgOlxuXHRcdFx0XHRvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnID8gbnVsbCA6XG5cdFx0XHRcdFx0SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IHsgUm9vdCBhcyBkZWZhdWx0IH07XG5jb25zdCBSb290ID0gKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zJDAuVGFibGU7XG5cdGxldCBsYXN0U2VjdGlvblRhYmxlICAgICAgICA9IHJvb3RUYWJsZTtcblx0d2hpbGUgKCBpdGVyYXRvciQwLnJlc3QoKSApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBpdGVyYXRvciQwLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZSApIHtcblx0XHRcdGlmICggbGluZVswXT09PSdbJyApIHtcblx0XHRcdFx0Y29uc3QgeyAkX2FzQXJyYXlJdGVtJCQsIGtleXMsICQkYXNBcnJheUl0ZW0kXywgdGFnIH0gPSByZWdleHBzJDAuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyhsaW5lKTtcblx0XHRcdFx0JF9hc0FycmF5SXRlbSQkPT09JCRhc0FycmF5SXRlbSRfIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUocm9vdFRhYmxlLCBrZXlzLCAkX2FzQXJyYXlJdGVtJCQsIHRhZyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggbGluZVswXT09PScjJyApIHtcblx0XHRcdFx0cmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpbmUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsZXQgcmVzdCAgICAgICAgID0gYXNzaWduKGxhc3RTZWN0aW9uVGFibGUsIGxpbmUpO1xuXHRcdFx0XHR3aGlsZSAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aCApIHsgcmVzdCA9IGl0ZXJhdG9yJDAuc3RhY2tzX3BvcCgpKHJlc3QpOyB9XG5cdFx0XHRcdHJlc3QgJiYgcmVzdFswXSE9PScjJyAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLkJ1ZmZlci5pc0J1ZmZlcj89JztcbmltcG9ydCBmcm9tIGZyb20gJy5CdWZmZXIuZnJvbT8nO1xuaW1wb3J0IGdsb2JhbFRoaXMgZnJvbSAnLmdsb2JhbFRoaXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuaW1wb3J0IHsgTk9OX1NDQUxBUiB9IGZyb20gJ0BsdGQvai11dGYnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgUm9vdCBmcm9tICcuLi9wYXJzZS9sZXZlbC1sb29wJztcblxuY29uc3QgSVNfTk9OX1NDQUxBUiA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cChOT05fU0NBTEFSKS50ZXN0ICkoKTtcbmNvbnN0IEJPTSA9ICdcXHVGRUZGJztcbmNvbnN0IGJ1ZjJzdHIgPSAoYnVmICAgICAgICApID0+IHtcblx0Y29uc3Qgc3RyID0gYnVmLnRvU3RyaW5nKCk7XG5cdGlmICggIWZyb20oc3RyKS5lcXVhbHMoYnVmKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJyk7IH1cblx0cmV0dXJuIHN0clswXT09PUJPTSA/IHN0ci5zbGljZSgxKSA6IHN0cjtcbn07XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGl0ZXJhdG9yJDAuY291bGQoKTtcblx0bGV0IHNvdXJjZVBhdGggICAgICAgIDtcblx0aWYgKCBpc0J1ZmZlcihzb3VyY2UpICkge1xuXHRcdHNvdXJjZSA9IGJ1ZjJzdHIoc291cmNlKTtcblx0XHRzb3VyY2VQYXRoID0gJyc7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBzb3VyY2U9PT0nb2JqZWN0JyAmJiBzb3VyY2UgKSB7XG5cdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5wYXRoKScpOyB9XG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBzb3VyY2U7XG5cdFx0aWYgKCBkYXRhPT09dW5kZWZpbmVkICkgeyBzb3VyY2UgPSBidWYyc3RyKCggZ2xvYmFsVGhpcy5yZXF1aXJlKCdmcycpICAgICAgICAgICAgICAgICAgICAgICAgKS5yZWFkRmlsZVN5bmMoc291cmNlUGF0aCkpOyB9XG5cdFx0ZWxzZSBpZiAoIGlzQnVmZmVyKGRhdGEpICkgeyBzb3VyY2UgPSBidWYyc3RyKGRhdGEpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J3N0cmluZycgKSB7IHNvdXJjZSA9IGRhdGE7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5kYXRhKScpOyB9XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBzb3VyY2U9PT0nc3RyaW5nJyApIHsgc291cmNlUGF0aCA9ICcnOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlKScpOyB9XG5cdHRyeSB7XG5cdFx0aWYgKCBJU19OT05fU0NBTEFSKHNvdXJjZSkgKSB7IHRocm93IEVycm9yKCdBIFRPTUwgZG9jIG11c3QgYmUgYSAoZnVsLXNjYWxhcikgdmFsaWQgVVRGLTggZmlsZSwgd2l0aG91dCBhbnkgdW5jb3VwbGVkIFVDUy00IGNoYXJhY3RlciBjb2RlLicpOyB9XG5cdFx0dHJ5IHtcblx0XHRcdG9wdGlvbnMkMC51c2Uoc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpTGluZUpvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyk7XG5cdFx0XHRpdGVyYXRvciQwLnRvZG8oc291cmNlLCBzb3VyY2VQYXRoKTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRcdFx0b3B0aW9ucyQwLnByb2Nlc3MoKTtcblx0XHRcdFx0cmV0dXJuIHJvb3RUYWJsZTtcblx0XHRcdH1cblx0XHRcdGZpbmFsbHkge1xuXHRcdFx0XHQvL2NsZWFyV2Vha1NldHMoKTtcblx0XHRcdFx0aXRlcmF0b3IkMC5kb25lKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZpbmFsbHkgeyBvcHRpb25zJDAuY2xlYXIoKTsgfVxuXHR9XG5cdGZpbmFsbHkgeyBjbGVhclJlZ0V4cCgpOyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovYXNzaWduKFxuXHQoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpTGluZUpvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gdHlwZW9mIHNwZWNpZmljYXRpb25WZXJzaW9uPT09J251bWJlcidcblx0XHQ/IHBhcnNlKHNvdXJjZSwgc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpTGluZUpvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucylcblx0XHQ6IHBhcnNlKHNvdXJjZSwgMS4wLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAsIG11bHRpTGluZUpvaW5lciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICAgICksXG5cdHtcblx0XHQnMS4wJzogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDEuMDogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMS4wLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuNTogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC41LCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuNDogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC40LCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMzogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4zLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMjogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4yLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMTogKHNvdXJjZSAgICAgICAgLCBtdWx0aUxpbmVKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHR9XG4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5cbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcbn0pO1xuIl0sIm5hbWVzIjpbIlR5cGVFcnJvciIsIlN5bnRheEVycm9yIiwiUmVnRXhwIiwiUHJveHkiLCJhcHBseSIsIldlYWtNYXAiLCJFcnJvciIsIk9iamVjdF9hc3NpZ24iLCJPYmplY3RfY3JlYXRlIiwiUmVmbGVjdF9vd25LZXlzIiwiT2JqZWN0X2ZyZWV6ZSIsIldlYWtTZXQiLCJOdWxsIiwib3JkZXJpZnlfTnVsbCIsIml0ZXJhdG9yJDAudGhyb3dzIiwiaXRlcmF0b3IkMC53aGVyZSIsImNyZWF0ZSIsIml0ZXJhdG9yJDAuZG9uZSIsIlJhbmdlRXJyb3IiLCJyZWdleHBzJDAuc3dpdGNoUmVnRXhwIiwidW5kZWZpbmVkIiwicGFyc2UiLCJvcHRpb25zJDAuemVyb0RhdGV0aW1lIiwiQmlnSW50Iiwib3B0aW9ucyQwLmFsbG93TG9uZ2VyIiwib3B0aW9ucyQwLnVzaW5nQmlnSW50Iiwib3B0aW9ucyQwLkludGVnZXJNaW4iLCJvcHRpb25zJDAuSW50ZWdlck1heCIsIm9wdGlvbnMkMC5zRXJyb3IiLCJpc0Zpbml0ZSIsInBhcnNlSW50Iiwib3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmciLCJpdGVyYXRvciQwLmxpbmVJbmRleCIsInJlZ2V4cHMkMC5fX0tFWVMiLCJvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSIsIm9wdGlvbnMkMC5UYWJsZSIsIm9wdGlvbnMkMC5jb2xsZWN0IiwicmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0IiwicmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMiLCJpdGVyYXRvciQwLm1hcmsiLCJpdGVyYXRvciQwLm11c3QiLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wIiwicmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0Iiwib3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUiLCJyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UiLCJyZWdleHBzJDAuX1ZBTFVFX1BBSVJfZXhlYyIsIm9wdGlvbnMkMC5hc1N0cmluZ3MiLCJvcHRpb25zJDAuaW5saW5lVGFibGUiLCJpdGVyYXRvciQwLnN0YWNrc19wdXNoIiwib3B0aW9ucyQwLmFzVGFibGVzIiwib3B0aW9ucyQwLmFzQXJyYXlzIiwicmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMkMC5zRmxvYXQiLCJvcHRpb25zJDAuYXNGbG9hdHMiLCJvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zJDAubW9yZURhdGV0aW1lIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMiLCJvcHRpb25zJDAuYXNMb2NhbFRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlcyIsIm9wdGlvbnMkMC5hc0Jvb2xlYW5zIiwib3B0aW9ucyQwLmVuYWJsZU51bGwiLCJvcHRpb25zJDAuYXNOdWxscyIsIm9wdGlvbnMkMC5hc0ludGVnZXJzIiwicmVnZXhwcyQwLlNZTV9XSElURVNQQUNFIiwiaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoIiwiaXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdCIsIm9wdGlvbnMkMC5hbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hIiwicmVnZXhwcyQwLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIiwiaXRlcmF0b3IkMC5yZXN0IiwiaXRlcmF0b3IkMC5uZXh0IiwicmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnN0YWNrc19wb3AiLCJpdGVyYXRvciQwLmNvdWxkIiwiZ2xvYmFsVGhpcyIsIm9wdGlvbnMkMC51c2UiLCJpdGVyYXRvciQwLnRvZG8iLCJvcHRpb25zJDAucHJvY2VzcyIsIm9wdGlvbnMkMC5jbGVhciIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxnQkFBYyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0lmLElBQUksSUFBSSw2Q0FBNkMsSUFBSTtBQUNoRSxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVE7QUFDdEMsR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUNqQixFQUFFLE9BQU8sVUFBVSxNQUFNLEVBQUU7QUFDM0IsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQztBQUNKLEVBQUUsQ0FBQztBQUNIO0FBQ08sSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEMsR0FBRyxD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