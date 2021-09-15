/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.15.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

const version = '1.15.0';

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

const THROW_WHILE_MEETING_MULTI = {
	[Symbol.toPrimitive] ()        {
		throws(Error$1(`TOML.parse(,,multiLineStringJoiner) must be passed, while the source including multi-line string` + where(', which is found at ')));
	}
};
let useWhatToJoinMultiLineString = '';
let usingBigInt                 = true;
let IntegerMin = 0;
let IntegerMax = 0;

              

                                                           
	                 
	                
	                 
	                
	               
	                
  
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

const use = (specificationVersion         , multiLineStringJoiner         , useBigInt         , xOptions          )       => {
	
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
	
	if ( typeof multiLineStringJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineStringJoiner; }
	else if ( multiLineStringJoiner===undefined$1 ) { useWhatToJoinMultiLineString = THROW_WHILE_MEETING_MULTI         ; }
	else { throw TypeError$1('TOML.parse(,,multiLineStringJoiner)'); }
	
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

const parse = (source        , specificationVersion                                   , multiLineStringJoiner        , useBigInt                   , xOptions                     )        => {
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
			use(specificationVersion, multiLineStringJoiner, useBigInt, xOptions);
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
	(source        , specificationVersion                                   , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => typeof specificationVersion==='number'
		? parse(source, specificationVersion, multiLineStringJoiner, useBigInt, xOptions)
		: parse(source, 1.0, specificationVersion          , multiLineStringJoiner                                       , useBigInt                      ),
	{
		'1.0': (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multiLineStringJoiner, useBigInt, xOptions),
		1.0: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 1.0, multiLineStringJoiner, useBigInt, xOptions),
		0.5: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.5, multiLineStringJoiner, useBigInt, xOptions),
		0.4: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.4, multiLineStringJoiner, useBigInt, xOptions),
		0.3: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.3, multiLineStringJoiner, useBigInt, xOptions),
		0.2: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.2, multiLineStringJoiner, useBigInt, xOptions),
		0.1: (source        , multiLineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multiLineStringJoiner, useBigInt, xOptions),
	}
);

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
});

export default _export;
export { parse$1 as parse, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai11dGYvc3JjL05PTl9TQ0FMQVIudHMiLCJpdGVyYXRvciQwLnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvVGFibGUudHMiLCJyZWdleHBzJDAudHMiLCJvcHRpb25zJDAudHMiLCJ0eXBlcy9BcnJheS50cyIsInR5cGVzL0RhdGV0aW1lLnRzIiwidHlwZXMvSW50ZWdlci50cyIsInR5cGVzL0Zsb2F0LnRzIiwidHlwZXMvU3RyaW5nLnRzIiwicGFyc2Uvb24tdGhlLXNwb3QudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwicGFyc2UvLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzEuMTUuMCc7IiwiaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBleGVjIGZyb20gJy5SZWdFeHAucHJvdG90eXBlLmV4ZWMnO1xuXG5leHBvcnQgdmFyIFRlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZCh0ZXN0ICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiB0ZXN0LmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZXhwb3J0IHZhciBFeGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoZXhlYyAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gZXhlYy5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn07XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZT8nO1xuaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHk/JztcblxuaW1wb3J0IHsgVGVzdCwgRXhlYyB9IGZyb20gJy4vdGhlUmVnRXhwJztcblxudmFyIE5UID0gL1tcXG5cXHRdKy9nO1xudmFyIEVTQ0FQRSA9IC9cXFxcLi9nO1xuZnVuY3Rpb24gZ3JhdmVBY2NlbnRSZXBsYWNlciAoJCQgICAgICAgICkgeyByZXR1cm4gJCQ9PT0nXFxcXGAnID8gJ2AnIDogJCQ7IH1cblxudmFyIGluY2x1ZGVzID0gJycuaW5jbHVkZXMgICAgICAgXG5cdD8gZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKTsgfVxuXHQ6IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKT4tMTsgfTtcblxuZnVuY3Rpb24gUkUgKCAgICAgICAgICAgICAgIHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgVSA9IHRoaXMuVTtcblx0dmFyIEkgPSB0aGlzLkk7XG5cdHZhciBNID0gdGhpcy5NO1xuXHR2YXIgUyA9IHRoaXMuUztcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXSAucmVwbGFjZShOVCwgJycpO1xuXHR2YXIgaW5kZXggPSAxO1xuXHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHR2YXIgdmFsdWUgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICkgeyBzb3VyY2UgKz0gdmFsdWU7IH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciB2YWx1ZV9zb3VyY2UgPSB2YWx1ZS5zb3VyY2U7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZV9zb3VyY2UhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdzb3VyY2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS51bmljb2RlPT09VSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3VuaWNvZGUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5pZ25vcmVDYXNlPT09SSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2lnbm9yZUNhc2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5tdWx0aWxpbmU9PT1NICYmICggaW5jbHVkZXModmFsdWVfc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJyQnKSApICkgeyB0aHJvdyBTeW50YXhFcnJvcignbXVsdGlsaW5lJyk7IH1cblx0XHRcdGlmICggdmFsdWUuZG90QWxsPT09UyAmJiBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICcuJykgKSB7IHRocm93IFN5bnRheEVycm9yKCdkb3RBbGwnKTsgfVxuXHRcdFx0c291cmNlICs9IHZhbHVlX3NvdXJjZTtcblx0XHR9XG5cdFx0c291cmNlICs9IHJhd1tpbmRleCsrXSAucmVwbGFjZShOVCwgJycpO1xuXHR9XG5cdHZhciByZSAgICAgICAgID0gUmVnRXhwKFUgPyBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShFU0NBUEUsIGdyYXZlQWNjZW50UmVwbGFjZXIpIDogc291cmNlLCB0aGlzLmZsYWdzKTtcblx0dmFyIHRlc3QgPSByZS50ZXN0ID0gVGVzdChyZSk7XG5cdHZhciBleGVjID0gcmUuZXhlYyA9IEV4ZWMocmUpO1xuXHR0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSBVO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSBJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/IE0gOiBudWxsO1xuXHR0ZXN0LmRvdEFsbCA9IGV4ZWMuZG90QWxsID0gaW5jbHVkZXMoc291cmNlLCAnLicpID8gUyA6IG51bGw7XG5cdHJldHVybiByZTtcbn1cblxudmFyIFJFX2JpbmQgPSBiaW5kICYmIC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoUkUgICAgICAgKTtcblxuZnVuY3Rpb24gQ29udGV4dCAoZmxhZ3MgICAgICAgICkgICAgICAgICAge1xuXHRyZXR1cm4ge1xuXHRcdFU6ICFpbmNsdWRlcyhmbGFncywgJ3UnKSxcblx0XHRJOiAhaW5jbHVkZXMoZmxhZ3MsICdpJyksXG5cdFx0TTogIWluY2x1ZGVzKGZsYWdzLCAnbScpLFxuXHRcdFM6ICFpbmNsdWRlcyhmbGFncywgJ3MnKSxcblx0XHRmbGFnczogZmxhZ3Ncblx0fTtcbn1cblxudmFyIENPTlRFWFQgICAgICAgICAgPSAvKiNfX1BVUkVfXyovQ29udGV4dCgnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb3h5XG5cdD8gLyojX19QVVJFX18qL25ldyBQcm94eShSRSwge1xuXHRcdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdFx0LFxuXHRcdGdldDogZnVuY3Rpb24gKFJFLCBmbGFncyAgICAgICAgKSB7IHJldHVybiBSRV9iaW5kKENvbnRleHQoZmxhZ3MpKTsgfVxuXHRcdCxcblx0XHRkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHQsXG5cdFx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH0pXG5cdDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHRSRS5hcHBseSA9IFJFLmFwcGx5O1xuXHRcdHZhciBuZXdSZWdFeHAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShDT05URVhULCBhcmd1bWVudHMgICAgICAgKTsgfSAgICAgICA7XG5cdFx0Zm9yICggdmFyIGZsYWdzID0gNjM7IGZsYWdzLS07ICkge1xuXHRcdFx0KCBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0XHRuZXdSZWdFeHBbY29udGV4dC5mbGFnc10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMgICAgICAgKTsgfTtcblx0XHRcdH0gKShDb250ZXh0KFxuXHRcdFx0XHQoIGZsYWdzICYgMzIgPyAnJyA6ICdnJyApICtcblx0XHRcdFx0KCBmbGFncyAmIDE2ID8gJycgOiAnaScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgOCA/ICcnIDogJ20nICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDQgPyAnJyA6ICdzJyApICtcblx0XHRcdFx0KCBmbGFncyAmICAyID8gJycgOiAndScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMSA/ICcnIDogJ3knIClcblx0XHRcdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gZnJlZXplID8gZnJlZXplKG5ld1JlZ0V4cCkgOiBuZXdSZWdFeHA7XG5cdH0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdCd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlXG5cdFx0PyBSZWdFeHAoJ1tcXFxcdUQ4MDAtXFxcXHVERkZGXScsICd1Jylcblx0XHQ6IC9bXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS9cbik7XG5cbi8vIFxcdXsxMTAwMDB9LVxcdXtGRkZGRkZGRn0gLT4gXFx1RkZGRFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcblxuLy9pbXBvcnQgKiBhcyBvcHRpb25zXFwkMCBmcm9tICcuL29wdGlvbnNcXCQwJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gXG5leHBvcnQgY29uc3QgdGhyb3dzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IChlcnJvciAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdC8vaWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IGRvbmUoKTsgb3B0aW9uc1xcJDAuY2xlYXIoKTsgfVxuXHR0aHJvdyBlcnJvcjtcbn07XG5cbmNvbnN0IHByZXZpb3VzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICAoKTtcbmNvbnN0IHByZXZpb3VzX2dldCA9IC8qI19fUFVSRV9fKi9nZXQuYmluZChwcmV2aW91cykgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IHByZXZpb3VzX3NldCA9IC8qI19fUFVSRV9fKi9zZXQuYmluZChwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3Qgbm9vcCAgICAgICA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3Qgbm9vcCAgICAgICA9ICgpICAgICAgICAgPT4gJyc7XG5cdHByZXZpb3VzX3NldChub29wLCBub29wKTtcblx0cmV0dXJuIG5vb3A7XG59ICkoKTtcblxuZXhwb3J0IGxldCBzdGFja3NfbGVuZ3RoID0gMDtcbmxldCBsYXN0ICAgICAgID0gbm9vcDtcblxuZXhwb3J0IGNvbnN0IGNvdWxkID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgdGhyb3cgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLicpOyB9XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCxzb3VyY2VQYXRoKScpOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG5cdHN0YWNrc19sZW5ndGggPSAwO1xuXHRsYXN0ID0gbm9vcDtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXh0ID0gKCkgICAgICAgICA9PiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xuXG5leHBvcnQgY29uc3QgcmVzdCA9ICgpICAgICAgICAgID0+IGxpbmVJbmRleCE9PWxhc3RMaW5lSW5kZXg7XG5cbmV4cG9ydCBjb25zdCBtYXJrID0gKHR5cGUgICAgICAgICkgPT4gKCB7IHR5cGUsIGxpbmVJbmRleCB9ICk7XG5cbmV4cG9ydCBjb25zdCBtdXN0ID0gKG1hcmtlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgPT4ge1xuXHRsaW5lSW5kZXg9PT1sYXN0TGluZUluZGV4ICYmIHRocm93cyhTeW50YXhFcnJvcihgJHttYXJrZXIudHlwZX0gaXMgbm90IGNsb3NlIHVudGlsIHRoZSBlbmQgb2YgdGhlIGZpbGVgICsgd2hlcmUoJywgd2hpY2ggc3RhcnRlZCBmcm9tICcsIG1hcmtlci5saW5lSW5kZXgpKSk7XG5cdHJldHVybiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCBpbmRleCAgICAgICAgID0gbGluZUluZGV4KSAgICAgICAgID0+IHNvdXJjZUxpbmVzPT09Tk9ORSA/ICcnIDpcblx0c291cmNlUGF0aFxuXHRcdD8gYFxcbiAgICBhdCAoJHtzb3VyY2VQYXRofToke2luZGV4ICsgMX06MSlgXG5cdFx0OiBgJHtwcmV9bGluZSAke2luZGV4ICsgMX06ICR7c291cmNlTGluZXNbaW5kZXhdfWA7XG5cbmV4cG9ydCBjb25zdCBkb25lID0gKCkgICAgICAgPT4ge1xuXHRzb3VyY2VQYXRoID0gJyc7XG5cdHNvdXJjZUxpbmVzID0gTk9ORTtcblx0bGFzdCA9IG5vb3A7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX3BvcCA9ICgpICAgICAgID0+IHtcblx0Y29uc3QgaXRlbSAgICAgICA9IGxhc3Q7XG5cdGxhc3QgPSBwcmV2aW91c19nZXQobGFzdCk7XG5cdC0tc3RhY2tzX2xlbmd0aDtcblx0cmV0dXJuIGl0ZW07XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX3B1c2ggPSAoaXRlbSAgICAgICkgICAgICAgPT4ge1xuXHRwcmV2aW91c19zZXQoaXRlbSwgbGFzdCk7XG5cdGxhc3QgPSBpdGVtO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RhY2tzX2luc2VydEJlZm9yZUxhc3QgPSAoaXRlbSAgICAgICkgICAgICAgPT4ge1xuXHRwcmV2aW91c19zZXQoaXRlbSwgcHJldmlvdXNfZ2V0KGxhc3QpKTtcblx0cHJldmlvdXNfc2V0KGxhc3QsIGl0ZW0pO1xuXHQrK3N0YWNrc19sZW5ndGg7XG59O1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHknO1xuaW1wb3J0IE9iamVjdF9hc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IE9iamVjdF9jcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IE9iamVjdF9pcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgT2JqZWN0X2RlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBPYmplY3RfZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgT2JqZWN0X2ZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IFJlZmxlY3RfY29uc3RydWN0IGZyb20gJy5SZWZsZWN0LmNvbnN0cnVjdCc7XG5pbXBvcnQgUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9vd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBLZWVwZXIgPSAgICAgKCkgICAgICA9PiBbXTtcblxuY29uc3QgaGFzT3duUHJvcGVydHlfY2FsbCA9IC8qI19fUFVSRV9fKi9oYXNPd25Qcm9wZXJ0eS5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duUHJvcGVydHlfY2FsbCh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSk7XG5cdFx0fVxuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGtlZXBlcltrZWVwZXIubGVuZ3RoXSA9IGtleTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGRlbGV0ZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGNvbnN0IGluZGV4ID0ga2VlcGVyLmluZGV4T2Yoa2V5KTtcblx0XHRcdGluZGV4PDAgfHwgLS1rZWVwZXIuY29weVdpdGhpbihpbmRleCwgaW5kZXggKyAxKS5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzOiAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICkgPT4gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdGNvbnN0cnVjdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAsIGFyZ3MgICAsIG5ld1RhcmdldCAgICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2NvbnN0cnVjdCh0YXJnZXQsIGFyZ3MsIG5ld1RhcmdldCkpLFxuXHRhcHBseTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpc0FyZyAgICwgYXJncyAgICkgICAgPT4gb3JkZXJpZnkoUmVmbGVjdF9hcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpKSxcbn0pO1xuXG5jb25zdCBuZXdQcm94eSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAsIGtlZXBlciAgICAgICAgICAgKSAgICA9PiB7XG5cdHRhcmdldDJrZWVwZXIuc2V0KHRhcmdldCwga2VlcGVyKTtcblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkgICAodGFyZ2V0LCBoYW5kbGVycyk7XG5cdHByb3h5MnRhcmdldC5zZXQocHJveHksIHRhcmdldCk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc09yZGVyZWQgPSAob2JqZWN0ICAgICAgICApICAgICAgICAgID0+IHByb3h5MnRhcmdldC5oYXMob2JqZWN0KTtcbmV4cG9ydCBjb25zdCBpcyA9IChvYmplY3QxICAgICAgICAsIG9iamVjdDIgICAgICAgICkgICAgICAgICAgPT4gT2JqZWN0X2lzKFxuXHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDEpIHx8IG9iamVjdDEsXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MikgfHwgb2JqZWN0Mixcbik7XG5cbmV4cG9ydCBjb25zdCBvcmRlcmlmeSA9ICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICA9PiB7XG5cdGlmICggcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpICkgeyByZXR1cm4gb2JqZWN0OyB9XG5cdGxldCBwcm94eSA9IHRhcmdldDJwcm94eS5nZXQob2JqZWN0KSAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHByb3h5ICkgeyByZXR1cm4gcHJveHk7IH1cblx0cHJveHkgPSBuZXdQcm94eShvYmplY3QsIE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSkpO1xuXHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkpO1xuXHRyZXR1cm4gcHJveHk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgeyBjcmVhdGUgfSA9IHtcblx0Y3JlYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm90byAgICAgICAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGlmICggZGVzY3JpcHRvck1hcHMubGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvck1hcCAgICAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8pICAgICAgICwga2VlcGVyICAgICAgICk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBkZWZpbmVQcm9wZXJ0aWVzIH0gPSB7XG5cdGRlZmluZVByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3QgICAsIGRlc2NyaXB0b3JNYXAgICAgLCAuLi5kZXNjcmlwdG9yTWFwcyAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3Qga2VlcGVyID0gS2VlcGVyICAgICAgICAgICAoKTtcblx0XHRkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2Fzc2lnbihuZXdQcm94eShPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgLCBrZWVwZXIpLCBkZXNjcmlwdG9yTWFwLCAuLi5kZXNjcmlwdG9yTWFwcyk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3RfZGVmaW5lUHJvcGVydGllcyhvcmRlcmlmeShvYmplY3QpLCBkZXNjcmlwdG9yTWFwKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCBrZWVwZXIgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICAgICAgICAoKSwgUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KSApO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShkZXNjcmlwdG9yTWFwLCBrZWVwZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IE51bGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiB0aHJvd0NvbnN0cnVjdGluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aCAnbmV3J2ApOyB9XG5cdGZ1bmN0aW9uIHRocm93QXBwbHlpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydgKTsgfVxuXHRjb25zdCBOdWxsaWZ5ID0gKGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0XHRkZWxldGUgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXHRcdE9iamVjdF9mcmVlemUoY29uc3RydWN0b3IucHJvdG90eXBlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdH07XG5cdGZ1bmN0aW9uIE51bGwgKCAgICAgICAgICAgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0PyBuZXcudGFyZ2V0PT09TnVsbFxuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi90aHJvd0NvbnN0cnVjdGluZygpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL25ld1Byb3h5KHRoaXMsIEtlZXBlciAgICAgKCkpXG5cdFx0XHQ6IHR5cGVvZiBjb25zdHJ1Y3Rvcj09PSdmdW5jdGlvbidcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovTnVsbGlmeShjb25zdHJ1Y3Rvcilcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovdGhyb3dBcHBseWluZygpO1xuXHR9XG5cdC8vQHRzLWlnbm9yZVxuXHROdWxsLnByb3RvdHlwZSA9IG51bGw7XG5cdE9iamVjdF9kZWZpbmVQcm9wZXJ0eShOdWxsLCAnbmFtZScsIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgeyB2YWx1ZTogJycsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSkpO1xuXHQvL2RlbGV0ZSBOdWxsLmxlbmd0aDtcblx0T2JqZWN0X2ZyZWV6ZShOdWxsKTtcblx0cmV0dXJuIE51bGw7XG59KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBERUZBVUxUID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oY2xhc3MgZXh0ZW5kcyBudWxsIHsgd3JpdGFibGUgKCkge30gZW51bWVyYWJsZSAoKSB7fSBjb25maWd1cmFibGUgKCkge30gfS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwge1xuXHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHR3cml0YWJsZTogdHJ1ZSxcblx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxufSk7XG5leHBvcnQgY29uc3QgZnJvbUVudHJpZXMgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVudHJpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfZnJvbUVudHJpZXMoZW50cmllcyk7XG5cdGNvbnN0IGtlZXBlciAgICAgICAgICAgID0gT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAoKSwgUmVmbGVjdF9vd25LZXlzKHRhcmdldCkpO1xuXHRpZiAoIHByb3RvPT09dW5kZWZpbmVkICkgeyByZXR1cm4gbmV3UHJveHkodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0aWYgKCBwcm90bz09PW51bGwgKSB7IHJldHVybiBuZXdQcm94eShPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUocHJvdG8pLCB0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0bGV0IGluZGV4ID0gMDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdCggZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2NyZWF0ZShERUZBVUxUKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlID0gdGFyZ2V0W2tleV07XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXApICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7XG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE51bGwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBkZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IE51bGwgYXMgb3JkZXJpZnlfTnVsbCB9IGZyb20gJ0BsdGQvai1vcmRlcmlmeSc7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBESVJFQ1RMWSA9IHRydWU7XG5leHBvcnQgY29uc3QgSU1QTElDSVRMWSA9IGZhbHNlO1xuY29uc3QgaW1wbGljaXRUYWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChpbXBsaWNpdFRhYmxlcyk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19oYXMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuZXhwb3J0IGNvbnN0IHdhc0RpcmVjdGx5ID0gKHRhYmxlICAgICAgICkgICAgICAgICAgPT4gIWltcGxpY2l0VGFibGVzX2hhcyh0YWJsZSk7XG5leHBvcnQgY29uc3QgZGlyZWN0bHkgPSAvKiNfX1BVUkVfXyovZGVsLmJpbmQoaW1wbGljaXRUYWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBJTkxJTkUgPSB0cnVlO1xuY29uc3QgaW5saW5lVGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbmxpbmVUYWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGlubGluZVRhYmxlcyk7XG5leHBvcnQgY29uc3QgaXNJbmxpbmUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW5saW5lVGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5jb25zdCBwYWlycyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgcGFpcnNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHBhaXJzKTtcbmV4cG9ydCBjb25zdCBmcm9tUGFpciA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChwYWlycykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IFBsYWluVGFibGUgPSBOdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgTnVsbCAgICAgIHtcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lICYmIGlubGluZVRhYmxlc19hZGQodGhpcylcblx0XHRcdDogKCBpc0lubGluZSA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IE9yZGVyZWRUYWJsZSA9IE51bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUgJiYgaW5saW5lVGFibGVzX2FkZCh0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5cbi8qIG5lc3RlZCAocmVhZGFibGUpICovXG5cbmNvbnN0IFdoaXRlc3BhY2UgPSAvWyBcXHRdLztcblxuZXhwb3J0IGNvbnN0IFBSRV9XSElURVNQQUNFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgICkoKTtcblxuZXhwb3J0IGNvbnN0IFZBTFVFX1JFU1RfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQoXG5cdFx0KD86XFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQgXFxkKT9cblx0XHRbXFx3XFwtKy46XStcblx0KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5leHBvcnQgY29uc3QgTElURVJBTF9TVFJJTkdfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQnKFteJ10qKSdcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5cbmNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMF8xXzIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygnezAsMn0pXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuY29uc3QgTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoKVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcbmV4cG9ydFxubGV0IF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYCApKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICBgXG5cdF5cblx0JHtXaGl0ZXNwYWNlfSpcblx0PVxuXHQke1doaXRlc3BhY2V9KlxuXHQoPzpcblx0XHQ8KCR7VGFnfSk+XG5cdFx0JHtXaGl0ZXNwYWNlfSpcblx0KT9cblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuZXhwb3J0IGNvbnN0IF9WQUxVRV9QQUlSX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBUQUdfUkVTVF9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJdK3xcXFxcLnxcIlwiPyg/IVwiKSkvcykuZXhlYyApKCk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wID0gKF8gICAgICAgICkgICAgICAgICA9PiB7XG5cdGxldCBfMCAgICAgICAgID0gJyc7XG5cdHdoaWxlICggXyApIHtcblx0XHRjb25zdCAkID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlYyhfKTtcblx0XHRpZiAoICEkICkgeyBicmVhazsgfVxuXHRcdF8wICs9ICRbMF07XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG5cdHJldHVybiBfMDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18WyBcXHRdKlxcblsgXFx0XFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiAgICAgICAgO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpO1xuXG5jb25zdCBCQVNJQ19TVFJJTkdfVEFCX19fX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmxldCBfX0JBU0lDX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBCQVNJQ19TVFJJTkdfZXhlYyA9IChfMiAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0XzIgPSBfMi5zbGljZSgxKTtcblx0Zm9yICggbGV0IF8xICAgICAgICAgPSAnJzsgOyApIHtcblx0XHRjb25zdCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfMik7XG5cdFx0aWYgKCAhJCApIHtcblx0XHRcdF8yWzBdPT09J1wiJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdHJldHVybiB7IDE6IF8xLCAyOiBfMi5yZXBsYWNlKFNZTV9XSElURVNQQUNFLCAnJykgfTtcblx0XHR9XG5cdFx0XzEgKz0gJFswXTtcblx0XHRfMiA9IF8yLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0fVxufTtcblxuY29uc3QgRE9UX0tFWV9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLlsgXFx0XSovKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX1NUUklDVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXltcXHctXSsvKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX0ZSRUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKS5leGVjICkoKTtcbmxldCBfX0JBUkVfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgTElURVJBTF9LRVlfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pLmV4ZWMgKSgpO1xuY29uc3QgTElURVJBTF9LRVlfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZdKicvKS5leGVjICkoKTtcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgICA7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgICAgICAgICA7XG5cbmNvbnN0IGdldEtleXMgPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGtleXMgICAgICAgICA9ICcnO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0aWYgKCBfWzBdPT09J1wiJyApIHtcblx0XHRcdF8gPSBfLnNsaWNlKDEpO1xuXHRcdFx0bGV0IGtleSAgICAgICAgID0gJ1wiJztcblx0XHRcdGxldCAkICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHRcdHdoaWxlICggKCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfKSApICkge1xuXHRcdFx0XHRfID0gXy5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdFx0XHRcdGtleSArPSAkWzBdO1xuXHRcdFx0fVxuXHRcdFx0X1swXT09PSdcIicgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXNpYyBzdHJpbmcga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XyA9IF8uc2xpY2UoMSk7XG5cdFx0XHRrZXlzICs9IGtleSArICdcIic7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggXy5zdGFydHNXaXRoKCdcXCcnKSA/IF9fTElURVJBTF9LRVlfZXhlYyA6IF9fQkFSRV9LRVlfZXhlYyApKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgJHtfLnN0YXJ0c1dpdGgoJ1xcJycpID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRfID0gXy5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGtleXMgKz0ga2V5O1xuXHRcdH1cblx0XHRjb25zdCAkID0gRE9UX0tFWV9leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHRcdGtleXMgKz0gJFswXTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgJF9hc0FycmF5SXRlbSQkICAgICAgICAgID0gX1sxXT09PSdbJztcblx0aWYgKCAkX2FzQXJyYXlJdGVtJCQgKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRfID0gXy5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgXyA9IF8uc2xpY2UoMSk7IH1cblx0XyA9IF8ucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRjb25zdCBrZXlzICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRfID0gXy5zbGljZShrZXlzLmxlbmd0aCkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRfWzBdPT09J10nIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBUYWJsZSBoZWFkZXIgaXMgbm90IGNsb3NlZGAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdGNvbnN0ICQkYXNBcnJheUl0ZW0kXyAgICAgICAgICA9IF9bMV09PT0nXSc7XG5cdF8gPSBfLnNsaWNlKCQkYXNBcnJheUl0ZW0kXyA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBfWzBdPT09JzwnICkgeyAoIHsgMTogdGFnLCAyOiBfIH0gPSBUQUdfUkVTVF9leGVjKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdCFfIHx8IF9bMF09PT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4geyAkX2FzQXJyYXlJdGVtJCQsIGtleXMsICQkYXNBcnJheUl0ZW0kXywgdGFnIH07XG59O1xuXG5leHBvcnQgY29uc3QgS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsZWZ0ICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnLCAyOiByaWdodCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhfLnNsaWNlKGxlZnQubGVuZ3RoKSkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCBidXQgbWlzc2luZyBhdCAnKSkpO1xuXHR0YWcgfHwgcmlnaHQgJiYgcmlnaHRbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVmdCwgdGFnLCByaWdodCB9O1xufTtcblxuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pLnRlc3QgKSgpO1xuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0vKS50ZXN0ICkoKTtcbmV4cG9ydFxubGV0IF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBLRVlTX1NUUklDVCA9IC9bXFx3LV0rfFwiKD86W15cXFxcXCJdK3xcXFxcLikqXCJ8J1teJ10qJy9ncztcbmNvbnN0IEtFWVNfRlJFRSA9IC9bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSp8XCIoPzpbXlxcXFxcIl0rfFxcXFwuKSpcInwnW14nXSonL2dzO1xuZXhwb3J0XG5sZXQgX19LRVlTICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hSZWdFeHAgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAgPT4ge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMjtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkdfZXhlYyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9fX187XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX19fX19fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HX2V4ZWMgPSBCQVNJQ19TVFJJTkdfX19fX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9fX19fXztcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX1NUUklDVDtcblx0XHRcdF9fS0VZUyA9IEtFWVNfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0g7XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IE1BWF9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NQVhfU0FGRV9JTlRFR0VSJztcbmltcG9ydCBNSU5fU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUlOX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi9yZWdleHBzJDAnO1xuXG4vKiBvcHRpb25zICovXG5cbmNvbnN0IFRIUk9XX1dISUxFX01FRVRJTkdfTVVMVEkgPSB7XG5cdFtTeW1ib2wudG9QcmltaXRpdmVdICgpICAgICAgICB7XG5cdFx0aXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRPTUwucGFyc2UoLCxtdWx0aUxpbmVTdHJpbmdKb2luZXIpIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdH1cbn07XG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgPSAnJztcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbiA9IDA7XG5leHBvcnQgbGV0IEludGVnZXJNYXggPSAwO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcbiAgXG5leHBvcnQgbGV0IGVuZHNXaXRoUXVvdGUgICAgICAgICA7XG5leHBvcnQgbGV0IHplcm9EYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgaW5saW5lVGFibGUgICAgICAgICA7XG5leHBvcnQgbGV0IG1vcmVEYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWxsb3dFbXB0eUtleSAgICAgICAgIDtcbi8vZXhwb3J0IGNvbnN0IHhvYiA6Ym9vbGVhbiA9IHRydWU7XG5leHBvcnQgbGV0IHNFcnJvciAgICAgICAgIDtcbmV4cG9ydCBsZXQgc0Zsb2F0ICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGxldCBUYWJsZSAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvciQwLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvciQwLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbmV4cG9ydCBjb25zdCBwcm9jZXNzID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIGNvbGxlY3Rpb25fbGVuZ3RoICkge1xuXHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBwcm9jZXNzb3IgO1xuXHRcdGNvbnN0IHF1ZXVlID0gY29sbGVjdGlvbjtcblx0XHRwcm9jZXNzb3IgPSBudWxsO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHR3aGlsZSAoIGNvbGxlY3Rpb25fbGVuZ3RoLS0gKSB7XG5cdFx0XHRwcm9jZXNzKHF1ZXVlW2NvbGxlY3Rpb25fbGVuZ3RoXSApO1xuXHRcdFx0cXVldWUubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGg7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiB1c2UgJiBjbGVhciAqL1xuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSAgICAgICA9PiB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGggPSAwO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdGxldCBtaXhlZCAgICAgICAgIDtcblx0c3dpdGNoICggc3BlY2lmaWNhdGlvblZlcnNpb24gKSB7XG5cdFx0Y2FzZSAxLjA6XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0ZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjM6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMjpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4xOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlMaW5lU3RyaW5nSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgPSBtdWx0aUxpbmVTdHJpbmdKb2luZXI7IH1cblx0ZWxzZSBpZiAoIG11bHRpTGluZVN0cmluZ0pvaW5lcj09PXVuZGVmaW5lZCApIHsgdXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyA9IFRIUk9XX1dISUxFX01FRVRJTkdfTVVMVEkgICAgICAgICA7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLG11bHRpTGluZVN0cmluZ0pvaW5lciknKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT11bmRlZmluZWQgfHwgdXNlQmlnSW50PT09dHJ1ZSApIHsgdXNpbmdCaWdJbnQgPSB0cnVlOyB9XG5cdGVsc2UgaWYgKCB1c2VCaWdJbnQ9PT1mYWxzZSApIHsgdXNpbmdCaWdJbnQgPSBmYWxzZTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIHR5cGVvZiB1c2VCaWdJbnQhPT0nbnVtYmVyJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdGlmICggIWlzU2FmZUludGVnZXIodXNlQmlnSW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0XHR1c2luZ0JpZ0ludCA9IG51bGw7XG5cdFx0aWYgKCB1c2VCaWdJbnQ+PTAgKSB7IEludGVnZXJNaW4gPSAtKCBJbnRlZ2VyTWF4ID0gdXNlQmlnSW50ICk7IH1cblx0XHRlbHNlIHsgSW50ZWdlck1heCA9IC0oIEludGVnZXJNaW4gPSB1c2VCaWdJbnQgKS0xOyB9XG5cdFx0aWYgKCBJbnRlZ2VyTWluIDwgTUlOX1NBRkVfSU5URUdFUiB8fCBNQVhfU0FGRV9JTlRFR0VSIDwgSW50ZWdlck1heCApIHsgdGhyb3cgUmFuZ2VFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCB8fCB4T3B0aW9ucz09PWZhbHNlICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gZmFsc2U7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB4T3B0aW9ucz09PXRydWUgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHRydWU7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgeE9wdGlvbnM9PT0nZnVuY3Rpb24nICkge1xuXHRcdFRhYmxlID0gT3JkZXJlZFRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gc0Vycm9yID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSB0cnVlO1xuXHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHRhZykgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRwcm9jZXNzb3IgPSB4T3B0aW9ucztcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0fVxuXHRlbHNlIHtcblx0XHRjb25zdCB7IG9yZGVyLCBsb25nZXIsIGV4YWN0LCBudWxsOiBfbnVsbCwgbXVsdGksIHRhZywgLi4udW5rbm93biB9ID0geE9wdGlvbnM7XG5cdFx0aWYgKCBvd25LZXlzKHVua25vd24pLmxlbmd0aCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucyknKTsgfVxuXHRcdFRhYmxlID0gb3JkZXIgPyBPcmRlcmVkVGFibGUgOiBQbGFpblRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gISFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRpZiAoIHRhZyApIHtcblx0XHRcdGlmICggdHlwZW9mIHRhZyE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMudGFnKScpOyB9XG5cdFx0XHRpZiAoICFtaXhlZCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucykgeE9wdGlvbnMudGFnIG5lZWRzIGF0IGxlYXN0IFRPTUwgMS4wIHRvIHN1cHBvcnQgbWl4ZWQgdHlwZSBhcnJheScpOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRtaXhlZFxuXHRcdD8gYXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gYXNNaXhlZFxuXHRcdDogKCB7IGFzTnVsbHMsIGFzU3RyaW5ncywgYXNUYWJsZXMsIGFzQXJyYXlzLCBhc0Jvb2xlYW5zLCBhc0Zsb2F0cywgYXNJbnRlZ2VycywgYXNPZmZzZXREYXRlVGltZXMsIGFzTG9jYWxEYXRlVGltZXMsIGFzTG9jYWxEYXRlcywgYXNMb2NhbFRpbWVzIH0gPSBBU19UWVBFRCApO1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IGFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgYXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChhcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoYXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBPRl9UQUJMRVMgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBTVEFUSUNBTExZID0gdHJ1ZTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBzdGF0aWNhbEFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoc3RhdGljYWxBcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzU3RhdGljID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHN0YXRpY2FsQXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbmV3QXJyYXkgPSAoaXNTdGF0aWMgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGFycmF5ICAgICAgICA9IFtdO1xuXHRhcnJheXNfYWRkKGFycmF5KTtcblx0aXNTdGF0aWMgJiYgc3RhdGljYWxBcnJheXNfYWRkKGFycmF5KTtcblx0cmV0dXJuIGFycmF5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgTmF0aXZlRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLkRhdGUucGFyc2UnO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5cbmNvbnN0IF8yOV8gPSAvKD86MFsxLTldfDFcXGR8MlswLTldKS87XG5jb25zdCBfMzBfID0gLyg/OjBbMS05XXxbMTJdXFxkfDMwKS87XG5jb25zdCBfMzFfID0gLyg/OjBbMS05XXxbMTJdXFxkfDNbMDFdKS87XG5jb25zdCBfMjNfID0gLyg/OlswMV1cXGR8MlswLTNdKS87XG5jb25zdCBfNTlfID0gL1swLTVdXFxkLztcblxuY29uc3QgWU1EID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KWAgKSgpO1xuXG5jb25zdCBITVMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5cdGAgKSgpO1xuXG5leHBvcnQgY29uc3QgT0ZGU0VUJCA9IC8oPzpafFsrLV1cXGRcXGQ6XFxkXFxkKSQvO1xuXG5jb25zdCBaX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAgICAgICAgICAgICgvKChbKy1dKVxcZFxcZCk6KFxcZFxcZCkkLykuZXhlYyApKCk7XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRV9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfSg/OlxcLlxcZHsxLDN9KT9cblx0KFxcZCo/KTAqXG5cdCg/Olp8WystXSR7XzIzX306JHtfNTlffSlcblx0JGAuZXhlYyApKCk7XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9XG5cdCgpXG5cdFpcblx0JGAuZXhlYyApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX0RBVEVUSU1FID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX0RBVEUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9USU1FID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IERPVF9aRVJPID0gL1xcLj8wKyQvO1xuY29uc3QgREVMSU1JVEVSX0RPVCA9IC9bLVQ6Ll0vZztcbmNvbnN0IFpFUk8gPSAvKD88PVxcLlxcZCopMCskLztcblxuY29uc3QgRGF0ZXRpbWUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IERhdGV0aW1lID0gZnVuY3Rpb24gKCAgICAgICAgICAgICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOy8vZXhwcmVzc2lvbj8gOnVuZGVmaW5lZCwgbGl0ZXJhbD8gOnVuZGVmaW5lZCwgZG90VmFsdWU/IDp1bmRlZmluZWRcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnNldFRpbWUoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuZ2V0VGltZSgpIDogRGF0ZS5wYXJzZSgnVCcpXG5cdC8vIFtTeW1ib2wudG9QcmltaXRpdmVdKCdudW1iZXInKSA+IC52YWx1ZU9mKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnRvSVNPU3RyaW5nKClcblx0Y29uc3QgZGVzY3JpcHRvcnMgPSBOdWxsKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdHtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gTnVsbChudWxsKTtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Ygb3duS2V5cyhOYXRpdmVEYXRlLnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApIHtcblx0XHRcdGtleT09PSdjb25zdHJ1Y3RvcicgfHxcblx0XHRcdGtleT09PSd0b0pTT04nIHx8XG5cdFx0XHQoIGRlc2NyaXB0b3JzW2tleV0gPSBkZXNjcmlwdG9yICk7XG5cdFx0fVxuXHR9XG5cdERhdGV0aW1lLnByb3RvdHlwZSA9IHByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShOYXRpdmVEYXRlLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpKTtcblx0cmV0dXJuIGZyZWV6ZShEYXRldGltZSk7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgVmFsdWUgPSAoSVNPU3RyaW5nICAgICAgICApICAgICAgICA9PiBJU09TdHJpbmcucmVwbGFjZShaRVJPLCAnJykucmVwbGFjZShERUxJTUlURVJfRE9ULCAnJyk7XG5cbmNvbnN0IGxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBsaXRlcmFsLnNsaWNlKDUsIDEwKSE9PScwMi0yOScgfHwgK2xpdGVyYWwuc2xpY2UoMCwgNCklND09PTAgJiYgbGl0ZXJhbC5zbGljZSgyLCA0KSE9PScwMCc7XG5cbmNvbnN0IERBVEUgPSBuZXcgTmF0aXZlRGF0ZSgwKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3ZhbHVlID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV92YWx1ZScpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdXNlID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAkICAgICAgICAgPSAwKSA9PiB7XG5cdERBVEUuc2V0VGltZSgrdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gKyAkKTtcblx0cmV0dXJuIERBVEU7XG59O1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGVuZCApIHsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7IH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHRpbWUgKS5wYWRTdGFydCgxNSwgJzAnKSArIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE1KTtcblx0cmV0dXJuIHRpbWU7XG59O1xuZXhwb3J0IGNvbnN0IE9mZnNldERhdGVUaW1lID0gTnVsbChjbGFzcyBPZmZzZXREYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyAxOiBtb3JlIH0gPSBsZWFwKGxpdGVyYWwpICYmICggb3B0aW9ucyQwLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgOiBPRkZTRVRfREFURVRJTUVfZXhlYyApKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZSgnICcsICdUJyk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgcGFyc2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKSApLnBhZFN0YXJ0KDE1LCAnMCcpICsgKCBtb3JlID8gJy4nICsgbW9yZSA6ICcnICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldFVUQ0Z1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENGdWxsWWVhcigpOyB9XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRVVENNb250aCAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTW9udGgoKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXRVVENEYXRlICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0RhdGUoKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxuXHRnZXRVVENIb3VycyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDSG91cnMoKTsgfVxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldFVUQ01pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWludXRlcygpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRVVENTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ1NlY29uZHMoKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTcsIDE5LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7IH0vLy9cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTIsIDE1KTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApICsgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zZWFyY2goT0ZGU0VUJCkpO1xuXHRcdHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgMCwgMCk7XG5cdH1cblx0XG5cdGdldFVUQ0RheSAoICAgICAgICAgICAgICAgICAgICApICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0RheSgpOyB9XG5cdGdldERheSAoICAgICAgICAgICAgICAgICAgICApICAgICAge1xuXHRcdHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKS5nZXRVVENEYXkoKTtcblx0fVxuXHRnZXRUaW1lem9uZU9mZnNldCAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdHJldHVybiB6ID8gK3pbMV0qNjAgKyArKCB6WzJdICsgelszXSApIDogMDtcblx0fVxuXHRzZXRUaW1lem9uZU9mZnNldCAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICAgICkge1xuXHRcdHZhbHVlID0gK3ZhbHVlO1xuXHRcdGxldCBzdHJpbmcgPSBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdmFsdWUqNjAwMDApLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgLTEpO1xuXHRcdGlmICggdmFsdWUgKSB7XG5cdFx0XHRpZiAoIHZhbHVlPjAgKSB7IHN0cmluZyArPSAnKyc7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzdHJpbmcgKz0gJy0nO1xuXHRcdFx0XHR2YWx1ZSA9IC12YWx1ZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG0gPSB2YWx1ZSU2MDtcblx0XHRcdGNvbnN0IGggPSAoIHZhbHVlIC0gbSApLzYwO1xuXHRcdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gc3RyaW5nICsgKCBoPjkgPyBoIDogJzAnICsgaCApICsgKCBtPjkgPyAnOicgKyBtIDogJzowJyArIG0gKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHN0cmluZyArICggaXModmFsdWUsIDApID8gJ1onIDogJy0wMDowMCcgKTsgfVxuXHR9XG5cdGdldFRpbWUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiArdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMCwgMTUpOyB9Ly8vXG5cdHNldFRpbWUgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkge1xuXHRcdHZhbHVlID0gREFURS5zZXRUaW1lKHZhbHVlKTtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0REFURS5zZXRUaW1lKHZhbHVlICsgKCB6ID8gK3pbMV0qNjAgKyArKCB6WzJdICsgelszXSApIDogMCApKjYwMDAwKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB6ID8gREFURS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKSArIHpbMF0gOiBEQVRFLnRvSVNPU3RyaW5nKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgxNSwgJzAnKTtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxEYXRlVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJyk7XG5jb25zdCBMb2NhbERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApID0+IHtcblx0dGhhdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoZW5kIC0gc3RhcnQsICcwJykgKyB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZVRpbWUgPSBOdWxsKGNsYXNzIExvY2FsRGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHR2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEVUSU1FKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZSgnICcsICdUJylcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSArIDEpOyB9XG5cdGdldERhdGUgKCAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNCwgMTcpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsRGF0ZV9JU09TdHJpbmcnKTtcbmNvbnN0IExvY2FsRGF0ZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxEYXRlX3ZhbHVlJyk7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PiB7XG5cdHRoYXRbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZSA9IE51bGwoY2xhc3MgTG9jYWxEYXRlIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVfdmFsdWVdICAgICAgIDtcblx0XG5cdHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSArIDEpOyB9XG5cdGdldERhdGUgKCAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsVGltZV9JU09TdHJpbmcnKTtcbmNvbnN0IExvY2FsVGltZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxUaW1lX3ZhbHVlJyk7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PiB7XG5cdHRoYXRbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDIsICcwJykgKyB0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxUaW1lID0gTnVsbChjbGFzcyBMb2NhbFRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX1RJTUUobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxUaW1lX3NldCh0aGlzLCAwLCAyLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDMsIDUpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIExvY2FsVGltZV9zZXQodGhpcywgMywgNSwgdmFsdWUpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCA2LCA4KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5leHBvcnQgY29uc3QgSU5URUdFUl9EID0gL1stK10/KD86MHxbMS05XVxcZCooPzpfXFxkKykqKS87XG5jb25zdCBJU19EX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnRlc3QgKSgpO1xuY29uc3QgSVNfWE9CX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14wKD86eFswLTlBLUZhLWZdKyg/Ol9bMC05QS1GYS1mXSspKnxvWzAtN10rKD86X1swLTddKykqfGJbMDFdKyg/Ol9bMDFdKykqKSQvKS50ZXN0ICkoKTtcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBCaWdJbnRJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0RfSU5URUdFUihsaXRlcmFsKVxuXHR8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0bGV0IGJpZ0ludCAgICAgICAgID0gQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRpZiAoIGxpdGVyYWxbMF09PT0nLScgKSB7IGJpZ0ludCA9IC1iaWdJbnQ7IH1cblx0b3B0aW9ucyQwLmFsbG93TG9uZ2VyXG5cdHx8IC05MjIzMzcyMDM2ODU0Nzc1ODA4bjw9YmlnSW50ICYmIGJpZ0ludDw9OTIyMzM3MjAzNjg1NDc3NTgwN24vLyAoIG1pbiA9IC0oMm4qKig2NG4tMW4pKSB8fCB+bWF4ICkgPD0gbG9uZyA8PSAoIG1heCA9IDJuKiooNjRuLTFuKS0xbiB8fCB+bWluIClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIGJpZ0ludDtcbn07XG5cbmNvbnN0IE51bWJlckludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfRF9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IC8qb3B0aW9uc1xcJDAueG9iICYmICovSVNfWE9CX0lOVEVHRVIobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gb3B0aW9ucyQwLkludGVnZXJNaW48PWJpZ0ludCAmJiBiaWdJbnQ8PW9wdGlvbnMkMC5JbnRlZ2VyTWF4ID8gKyggYmlnSW50KycnICkgOiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbi8vaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG4vL2ltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmNvbnN0IElTX0ZMT0FUID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPz1bLmVFXSlcblx0KD86XFwuXFxkKyg/Ol9cXGQrKSopP1xuXHQoPzpbZUVdWy0rXT9cXGQrKD86X1xcZCspKik/XG5cdCRgLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgSVNfWkVSTyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLlswX10rKT8oPzpbZUVdWy0rXT8wKyk/JC8pLnRlc3QgKSgpO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBJU19GTE9BVChsaXRlcmFsKSApIHtcblx0XHRjb25zdCBudW1iZXIgPSArbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJyk7XG5cdFx0aWYgKCBvcHRpb25zJDAuc0Vycm9yICkge1xuXHRcdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mLCBsaWtlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRudW1iZXIgfHwgSVNfWkVSTyhsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBsaXR0bGUgYXMgJHtsaXRlcmFsWzBdPT09Jy0nID8gJy0nIDogJyd9MCwgbGlrZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVtYmVyO1xuXHR9XG5cdC8vaWYgKCBvcHRpb25zXFwkMC5zRmxvYXQgKSB7XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0Ly9cdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIC1JbmZpbml0eTsgfVxuXHQvL1x0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdC8vfVxuXHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xufTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21Db2RlUG9pbnQgZnJvbSAnLlN0cmluZy5mcm9tQ29kZVBvaW50JztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBFU0NBUEVfQUxJQVMgPSB7IGI6ICdcXGInLCB0OiAnXFx0JywgbjogJ1xcbicsIGY6ICdcXGYnLCByOiAnXFxyJywgJ1wiJzogJ1wiJywgJy8nOiAnLycsICdcXFxcJzogJ1xcXFwnIH07XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvXFxcXCg/OihbXFxcXFwiYnRuZnIvXSl8dSguezR9KXxVKC57OH0pKS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9cXG58XFxcXCg/OiAqKFxcbilbIFxcbl0qfChbXFxcXFwiYnRuZnIvXSl8dSguezR9KXxVKC57OH0pKS9ncztcblxuY29uc3QgdW5Fc2NhcGVTaW5nbGVMaW5lID0gKFxuXHRtYXRjaCAgICAgICAgLFxuXHRwMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdHAyICAgICAgICAgLFxuXHRwMyAgICAgICAgIFxuKSAgICAgICAgID0+IHtcblx0aWYgKCBwMSApIHsgcmV0dXJuIEVTQ0FQRV9BTElBU1twMV07IH1cblx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwMiA/PyBwMyAsIDE2KTtcblx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3AyID8gJ1xcXFx1JyArIHAyIDogJ1xcXFxVJyArIHAzfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmxldCBuID0gMDtcblxuY29uc3QgdW5Fc2NhcGVNdWx0aUxpbmUgPSAoXG5cdG1hdGNoICAgICAgICAsXG5cdHAxICAgICAgICAgICAgICAgICAgLFxuXHRwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0cDMgICAgICAgICAgICAgICAgICAgICxcblx0cDQgICAgICAgICAgICAgICAgICAgIFxuKSAgICAgICAgID0+IHtcblx0aWYgKCBtYXRjaD09PSdcXG4nICkge1xuXHRcdCsrbjtcblx0XHRyZXR1cm4gb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cblx0aWYgKCBwMSApIHsgcmV0dXJuICcnOyB9XG5cdGlmICggcDIgKSB7IHJldHVybiBFU0NBUEVfQUxJQVNbcDJdOyB9XG5cdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocDMgPz8gcDQgLCAxNik7XG5cdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwMyA/ICdcXFxcdScgKyBwMyA6ICdcXFxcVScgKyBwNH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yJDAubGluZUluZGV4ICsgbikpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmV4cG9ydCBjb25zdCBCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUsIHVuRXNjYXBlU2luZ2xlTGluZSk7XG5cbmV4cG9ydCBjb25zdCBNdWx0aUxpbmVCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICAsIHNraXBwZWQgICAgICAgICApICAgICAgICAgPT4ge1xuXHRuID0gc2tpcHBlZCA/IDEgOiAwO1xuXHRyZXR1cm4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fTVVMVElfTElORSwgdW5Fc2NhcGVNdWx0aUxpbmUpO1xufTtcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgeyBuZXdBcnJheSwgT0ZfVEFCTEVTLCBpc0FycmF5LCBpc1N0YXRpYyB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IERJUkVDVExZLCBJTVBMSUNJVExZLCBQQUlSLCBpc1RhYmxlLCBpc0lubGluZSwgd2FzRGlyZWN0bHksIGRpcmVjdGx5LCBmcm9tUGFpciB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nLCBNdWx0aUxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMkMCBmcm9tICcuLi9yZWdleHBzJDAnO1xuXG5leHBvcnQgY29uc3QgcGFyc2VLZXlzID0gKGtleV9rZXkgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3Qga2V5cyA9IGtleV9rZXkubWF0Y2gocmVnZXhwcyQwLl9fS0VZUykgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGxldCBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7XG5cdGRvIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbLS1pbmRleF0gO1xuXHRcdGlmICgga2V5LnN0YXJ0c1dpdGgoJ1xcJycpICkgeyBrZXlzW2luZGV4XSA9IGtleS5zbGljZSgxLCAtMSk7IH1cblx0XHRlbHNlIGlmICgga2V5WzBdPT09J1wiJyApIHsga2V5c1tpbmRleF0gPSBCYXNpY1N0cmluZyhrZXkuc2xpY2UoMSwgLTEpKTsgfVxuXHR9XG5cdHdoaWxlICggaW5kZXggKTtcblx0aWYgKCBvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSApIHtcblx0XHRsZXQgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoO1xuXHRcdGRvIHsga2V5c1stLWluZGV4XSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpOyB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHJldHVybiBrZXlzO1xufTtcblxuY29uc3QgcHJlcGFyZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlmICggaXNUYWJsZSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkodGFibGUpICkge1xuXHRcdFx0XHRpc1N0YXRpYyh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhcHBlbmQgdmFsdWUgdG8gc3RhdGljIElubGluZSBBcnJheWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0dGFibGUgPSB0YWJsZVsoIHRhYmxlICAgICAgICAgICkubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFRhYmxlID0gKHRhYmxlICAgICAgICwga2V5X2tleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IHBhcnNlS2V5cyhrZXlfa2V5KTtcblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9IGxlYWRpbmdLZXlzW2xlYWRpbmdLZXlzLmxlbmd0aCAtIDFdIDtcblx0LS1sZWFkaW5nS2V5cy5sZW5ndGg7XG5cdHRhYmxlID0gcHJlcGFyZVRhYmxlKHRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShPRl9UQUJMRVMpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRsYXN0VGFibGUgPSB0YWJsZVtmaW5hbEtleV07XG5cdFx0XHR3YXNEaXJlY3RseShsYXN0VGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGRpcmVjdGx5KGxhc3RUYWJsZSk7XG5cdFx0XHRmcm9tUGFpcihsYXN0VGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEga2V5L3ZhbHVlIHBhaXIgY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEgW11gICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMkMC5UYWJsZShESVJFQ1RMWSk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucyQwLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHR9XG5cdHJldHVybiBsYXN0VGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlubGluZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpc1RhYmxlKHRhYmxlKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRmcm9tUGFpcih0YWJsZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBbXSBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuY29uc3QgY2hlY2tMaXRlcmFsU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdHJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaXRlcmFsKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGEgTGl0ZXJhbCBTdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIGxpdGVyYWw7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduTGl0ZXJhbFN0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBsaXRlcmFsWzFdIT09J1xcJycgfHwgbGl0ZXJhbFsyXSE9PSdcXCcnICkge1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGxpdGVyYWwgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0aWYgKCAkICkge1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0cmV0dXJuICRbM107XG5cdH1cblx0aWYgKCBsaXRlcmFsICkge1xuXHRcdGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKTtcblx0XHRsaXRlcmFsICs9IG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdMaXRlcmFsIFN0cmluZycpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpbmUpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGxpdGVyYWwgKyBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpdGVyYWwgKz0gbGluZSArIG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbFsxXSE9PSdcIicgfHwgbGl0ZXJhbFsyXSE9PSdcIicgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGl0ZXJhbCk7XG5cdGxldCB7IGxlbmd0aCB9ID0gJDtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGVuZ3RoICs9IDM7XG5cdFx0dGFibGVbZmluYWxLZXldID0gQmFzaWNTdHJpbmcoJCkgKyAoIG9wdGlvbnMkMC5lbmRzV2l0aFF1b3RlID8gbGl0ZXJhbFtsZW5ndGhdPT09J1wiJyA/IGxpdGVyYWxbKytsZW5ndGhdPT09J1wiJyA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnIDogJycgKTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0bGV0IHNraXBwZWQgPSB0cnVlO1xuXHRpZiAoIGxpdGVyYWwgKSB7XG5cdFx0bGl0ZXJhbCArPSAnXFxuJztcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRza2lwcGVkID0gZmFsc2U7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0Jhc2ljIFN0cmluZycpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGV0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGluZSk7XG5cdFx0bGV0IHsgbGVuZ3RoIH0gPSAkO1xuXHRcdGlmICggbGluZS5zdGFydHNXaXRoKCdcIlwiXCInLCBsZW5ndGgpICkge1xuXHRcdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRsZW5ndGggKz0gMztcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE11bHRpTGluZUJhc2ljU3RyaW5nKGxpdGVyYWwgKyAkLCBza2lwcGVkKSArICggb3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUgPyBsaW5lW2xlbmd0aF09PT0nXCInID8gbGluZVsrK2xlbmd0aF09PT0nXCInID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgOiAnJyApO1xuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRsaW5lICs9ICdcXG4nO1xuXHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaW5lKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxpdGVyYWwgKz0gbGluZTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgeyBJTkxJTkUsIERJUkVDVExZIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgbmV3QXJyYXksIFNUQVRJQ0FMTFkgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCQgfSBmcm9tICcuLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSAnLi4vdHlwZXMvSW50ZWdlcic7XG5pbXBvcnQgeyBGbG9hdCB9IGZyb20gJy4uL3R5cGVzL0Zsb2F0JztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5pbXBvcnQgeyBhcHBlbmRUYWJsZSwgcGFyc2VLZXlzLCBwcmVwYXJlSW5saW5lVGFibGUsIGFzc2lnbkxpdGVyYWxTdHJpbmcsIGFzc2lnbkJhc2ljU3RyaW5nIH0gZnJvbSAnLi9vbi10aGUtc3BvdCc7XG5cbmNvbnN0IElTX09GRlNFVCQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoT0ZGU0VUJCkudGVzdCApKCk7XG5cbmNvbnN0IHB1c2ggPSAobGFzdEFycmF5ICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGluZVJlc3RbMF09PT0nPCcgKSB7XG5cdFx0Y29uc3QgeyAxOiB0YWcgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZyBgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcob3B0aW9ucyQwLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2gobGluZVJlc3QgPT4gZXF1YWxJbmxpbmVUYWJsZShvcHRpb25zJDAuYXNUYWJsZXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRjYXNlICdbJzpcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2gobGluZVJlc3QgPT4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zJDAuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBvcHRpb25zJDAuc0Zsb2F0ICkge1xuXHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IC1JbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBOYU47XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHRvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMkMC5hc0xvY2FsRGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGxpdGVyYWw9PT0ndHJ1ZScgPyBvcHRpb25zJDAuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gdHJ1ZSA6IGxpdGVyYWw9PT0nZmFsc2UnID8gb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlIDpcblx0XHRsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKSA/IG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gRmxvYXQobGl0ZXJhbCkgOlxuXHRcdFx0b3B0aW9ucyQwLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyA/IG9wdGlvbnMkMC5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsIDpcblx0XHRcdFx0b3B0aW9ucyQwLmFzSW50ZWdlcnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4ge1xuXHRjb25zdCBzdGF0aWNBcnJheSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShTVEFUSUNBTExZKTtcblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBBcnJheScpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IHB1c2goc3RhdGljQXJyYXksIGxpbmVSZXN0KTtcblx0XHRcdGlmICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoPmxlbmd0aCApIHtcblx0XHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdChmdW5jdGlvbiBpbnNlcnRlZCAobGluZVJlc3QpIHtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgey8vXG5cdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7Ly9cblx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGVsc2Ugey8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjdGVyIGFmdGVyIHN0YXRpYyBhcnJheSBpdGVtIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTsvL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBpbiBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KGxpbmVSZXN0KTtcbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgZXF1YWxJbmxpbmVUYWJsZSA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFksIElOTElORSk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBUYWJsZScpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGVlKGxpbmVSZXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0fShsaW5lUmVzdCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0bGluZVJlc3QgJiYgbGluZVJlc3RbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRsaW5lUmVzdCA9IGFzc2lnbihpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdChmdW5jdGlvbiBpbnNlcnRlZCAobGluZVJlc3QpIHtcblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0KCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7Ly9cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGVlKGxpbmVSZXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdH0obGluZVJlc3QpO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmNvbnN0IGFzc2lnbiA9IChsYXN0SW5saW5lVGFibGUgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWZ0LCB0YWcgfSA9IHsgcmlnaHQ6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMobGluZVJlc3QpO1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBwYXJzZUtleXMobGVmdCk7XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsZWFkaW5nS2V5cy5sZW5ndGggLSAxXSA7XG5cdC0tbGVhZGluZ0tleXMubGVuZ3RoO1xuXHRjb25zdCB0YWJsZSAgICAgICAgPSBwcmVwYXJlSW5saW5lVGFibGUobGFzdElubGluZVRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgcHJvcGVydHkgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICd9Jzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2goKGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IGVxdWFsU3RhdGljQXJyYXkodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSAtSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE5hTjtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0dGFibGVbZmluYWxLZXldID1cblx0XHRsaXRlcmFsPT09J3RydWUnID8gdHJ1ZSA6IGxpdGVyYWw9PT0nZmFsc2UnID8gZmFsc2UgOlxuXHRcdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgPyBGbG9hdChsaXRlcmFsKSA6XG5cdFx0XHRcdG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgPyBudWxsIDpcblx0XHRcdFx0XHRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5leHBvcnQgeyBSb290IGFzIGRlZmF1bHQgfTtcbmNvbnN0IFJvb3QgPSAoKSAgICAgICAgPT4ge1xuXHRjb25zdCByb290VGFibGUgICAgICAgID0gbmV3IG9wdGlvbnMkMC5UYWJsZTtcblx0bGV0IGxhc3RTZWN0aW9uVGFibGUgICAgICAgID0gcm9vdFRhYmxlO1xuXHR3aGlsZSAoIGl0ZXJhdG9yJDAucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubmV4dCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0aWYgKCBsaW5lICkge1xuXHRcdFx0aWYgKCBsaW5lWzBdPT09J1snICkge1xuXHRcdFx0XHRjb25zdCB7ICRfYXNBcnJheUl0ZW0kJCwga2V5cywgJCRhc0FycmF5SXRlbSRfLCB0YWcgfSA9IHJlZ2V4cHMkMC5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUpO1xuXHRcdFx0XHQkX2FzQXJyYXlJdGVtJCQ9PT0kJGFzQXJyYXlJdGVtJF8gfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFNxdWFyZSBicmFja2V0cyBvZiBUYWJsZSBkZWZpbml0aW9uIHN0YXRlbWVudCBub3QgbWF0Y2hgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdGxhc3RTZWN0aW9uVGFibGUgPSBhcHBlbmRUYWJsZShyb290VGFibGUsIGtleXMsICRfYXNBcnJheUl0ZW0kJCwgdGFnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBsaW5lWzBdPT09JyMnICkge1xuXHRcdFx0XHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBjb21tZW50c2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgPSBhc3NpZ24obGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdHdoaWxlICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoICkgeyByZXN0ID0gaXRlcmF0b3IkMC5zdGFja3NfcG9wKCkocmVzdCk7IH1cblx0XHRcdFx0cmVzdCAmJiByZXN0WzBdIT09JyMnICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWNodG9yIGFmdGVyIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuQnVmZmVyLmlzQnVmZmVyPz0nO1xuaW1wb3J0IGZyb20gZnJvbSAnLkJ1ZmZlci5mcm9tPyc7XG5pbXBvcnQgZ2xvYmFsVGhpcyBmcm9tICcuZ2xvYmFsVGhpcyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBjbGVhclJlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBOT05fU0NBTEFSIH0gZnJvbSAnQGx0ZC9qLXV0Zic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCBSb290IGZyb20gJy4uL3BhcnNlL2xldmVsLWxvb3AnO1xuXG5jb25zdCBJU19OT05fU0NBTEFSID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKE5PTl9TQ0FMQVIpLnRlc3QgKSgpO1xuY29uc3QgQk9NID0gJ1xcdUZFRkYnO1xuY29uc3QgYnVmMnN0ciA9IChidWYgICAgICAgICkgPT4ge1xuXHRjb25zdCBzdHIgPSBidWYudG9TdHJpbmcoKTtcblx0aWYgKCAhZnJvbShzdHIpLmVxdWFscyhidWYpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVua25vd24gY29kZSBwb2ludC4nKTsgfVxuXHRyZXR1cm4gc3RyWzBdPT09Qk9NID8gc3RyLnNsaWNlKDEpIDogc3RyO1xufTtcblxuY29uc3QgcGFyc2UgPSAoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0aXRlcmF0b3IkMC5jb3VsZCgpO1xuXHRsZXQgc291cmNlUGF0aCAgICAgICAgO1xuXHRpZiAoIGlzQnVmZmVyKHNvdXJjZSkgKSB7XG5cdFx0c291cmNlID0gYnVmMnN0cihzb3VyY2UpO1xuXHRcdHNvdXJjZVBhdGggPSAnJztcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZT09PSdvYmplY3QnICYmIHNvdXJjZSApIHtcblx0XHRzb3VyY2VQYXRoID0gc291cmNlLnBhdGg7XG5cdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlLnBhdGgpJyk7IH1cblx0XHRjb25zdCB7IGRhdGEgfSA9IHNvdXJjZTtcblx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7IHNvdXJjZSA9IGJ1ZjJzdHIoKCBnbG9iYWxUaGlzLnJlcXVpcmUoJ2ZzJykgICAgICAgICAgICAgICAgICAgICAgICApLnJlYWRGaWxlU3luYyhzb3VyY2VQYXRoKSk7IH1cblx0XHRlbHNlIGlmICggaXNCdWZmZXIoZGF0YSkgKSB7IHNvdXJjZSA9IGJ1ZjJzdHIoZGF0YSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgc291cmNlID0gZGF0YTsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlLmRhdGEpJyk7IH1cblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZT09PSdzdHJpbmcnICkgeyBzb3VyY2VQYXRoID0gJyc7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UpJyk7IH1cblx0dHJ5IHtcblx0XHRpZiAoIElTX05PTl9TQ0FMQVIoc291cmNlKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuJyk7IH1cblx0XHR0cnkge1xuXHRcdFx0b3B0aW9ucyQwLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdGl0ZXJhdG9yJDAudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgcm9vdFRhYmxlID0gUm9vdCgpO1xuXHRcdFx0XHRvcHRpb25zJDAucHJvY2VzcygpO1xuXHRcdFx0XHRyZXR1cm4gcm9vdFRhYmxlO1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxseSB7XG5cdFx0XHRcdC8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdFx0XHRpdGVyYXRvciQwLmRvbmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZmluYWxseSB7IG9wdGlvbnMkMC5jbGVhcigpOyB9XG5cdH1cblx0ZmluYWxseSB7IGNsZWFyUmVnRXhwKCk7IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9hc3NpZ24oXG5cdChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiB0eXBlb2Ygc3BlY2lmaWNhdGlvblZlcnNpb249PT0nbnVtYmVyJ1xuXHRcdD8gcGFyc2Uoc291cmNlLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKVxuXHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgICAgKSxcblx0e1xuXHRcdCcxLjAnOiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MS4wOiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjUsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC40OiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjQsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4zOiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjIsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4xOiAoc291cmNlICAgICAgICAsIG11bHRpTGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpTGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdH1cbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcblxuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UvJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxufSk7XG4iXSwibmFtZXMiOlsiVHlwZUVycm9yIiwiU3ludGF4RXJyb3IiLCJSZWdFeHAiLCJQcm94eSIsImFwcGx5IiwiV2Vha01hcCIsIkVycm9yIiwiT2JqZWN0X2Fzc2lnbiIsIk9iamVjdF9jcmVhdGUiLCJSZWZsZWN0X293bktleXMiLCJPYmplY3RfZnJlZXplIiwiV2Vha1NldCIsIk51bGwiLCJvcmRlcmlmeV9OdWxsIiwiaXRlcmF0b3IkMC50aHJvd3MiLCJpdGVyYXRvciQwLndoZXJlIiwiY3JlYXRlIiwiaXRlcmF0b3IkMC5kb25lIiwiUmFuZ2VFcnJvciIsInJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAiLCJ1bmRlZmluZWQiLCJwYXJzZSIsIm9wdGlvbnMkMC56ZXJvRGF0ZXRpbWUiLCJCaWdJbnQiLCJvcHRpb25zJDAuYWxsb3dMb25nZXIiLCJvcHRpb25zJDAudXNpbmdCaWdJbnQiLCJvcHRpb25zJDAuSW50ZWdlck1pbiIsIm9wdGlvbnMkMC5JbnRlZ2VyTWF4Iiwib3B0aW9ucyQwLnNFcnJvciIsImlzRmluaXRlIiwicGFyc2VJbnQiLCJvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyIsIml0ZXJhdG9yJDAubGluZUluZGV4IiwicmVnZXhwcyQwLl9fS0VZUyIsIm9wdGlvbnMkMC5kaXNhbGxvd0VtcHR5S2V5Iiwib3B0aW9ucyQwLlRhYmxlIiwib3B0aW9ucyQwLmNvbGxlY3QiLCJyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QiLCJyZWdleHBzJDAuTElURVJBTF9TVFJJTkdfZXhlYyIsInJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yJDAubWFyayIsIml0ZXJhdG9yJDAubXVzdCIsInJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlYyIsInJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAiLCJyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSIsInJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucyQwLmFzU3RyaW5ncyIsIm9wdGlvbnMkMC5pbmxpbmVUYWJsZSIsIml0ZXJhdG9yJDAuc3RhY2tzX3B1c2giLCJvcHRpb25zJDAuYXNUYWJsZXMiLCJvcHRpb25zJDAuYXNBcnJheXMiLCJyZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjIiwib3B0aW9ucyQwLnNGbG9hdCIsIm9wdGlvbnMkMC5hc0Zsb2F0cyIsIm9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUiLCJvcHRpb25zJDAuYXNMb2NhbERhdGVUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsVGltZXMiLCJvcHRpb25zJDAuYXNMb2NhbERhdGVzIiwib3B0aW9ucyQwLmFzQm9vbGVhbnMiLCJvcHRpb25zJDAuZW5hYmxlTnVsbCIsIm9wdGlvbnMkMC5hc051bGxzIiwib3B0aW9ucyQwLmFzSW50ZWdlcnMiLCJyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UiLCJpdGVyYXRvciQwLnN0YWNrc19sZW5ndGgiLCJpdGVyYXRvciQwLnN0YWNrc19pbnNlcnRCZWZvcmVMYXN0Iiwib3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEiLCJyZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnJlc3QiLCJpdGVyYXRvciQwLm5leHQiLCJyZWdleHBzJDAuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyIsIml0ZXJhdG9yJDAuc3RhY2tzX3BvcCIsIml0ZXJhdG9yJDAuY291bGQiLCJnbG9iYWxUaGlzIiwib3B0aW9ucyQwLnVzZSIsIml0ZXJhdG9yJDAudG9kbyIsIm9wdGlvbnMkMC5wcm9jZXNzIiwib3B0aW9ucyQwLmNsZWFyIiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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