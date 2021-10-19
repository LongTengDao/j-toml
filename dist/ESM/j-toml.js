/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.22.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

const version = '1.22.0';

const Error$1 = Error;

const TypeError$1 = TypeError;

const assign$1 = Object.assign;

const undefined$1 = void null;

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

const isArray$1 = Array.isArray;

const Infinity = 1/0;

const fromCharCode = String.fromCharCode;

const Array$1 = Array;

const hasOwnProperty = Object.prototype.hasOwnProperty;

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var isEnum = /*#__PURE__*/propertyIsEnumerable.call.bind(propertyIsEnumerable);
var hasOwn = /*#__PURE__*/function () {
	return hasOwnProperty.bind
		? hasOwnProperty.call.bind(hasOwnProperty)
		: function (object, key) { return hasOwnProperty.call(object, key); };
}();// && object!=null

var create = Object.create;
function Descriptor (source) {
	var target = create(NULL);
	if ( hasOwn(source, 'value') ) { target.value = source.value; }
	if ( hasOwn(source, 'writable') ) { target.writable = source.writable; }
	if ( hasOwn(source, 'get') ) { target.get = source.get; }
	if ( hasOwn(source, 'set') ) { target.set = source.set; }
	if ( hasOwn(source, 'enumerable') ) { target.enumerable = source.enumerable; }
	if ( hasOwn(source, 'configurable') ) { target.configurable = source.configurable; }
	return target;
}

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
 * 模块版本：8.1.0
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
	test.unicode = exec.unicode = !U;
	test.ignoreCase = exec.ignoreCase = !I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? !M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? !S : null;
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
		var d = 1;
		var g = d*2;
		var i = g*2;
		var m = i*2;
		var s = i*2;
		var u = s*2;
		var y = u*2;
		var flags = y*2 - 1;
		while ( flags-- ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments       ); };
			} )(Context(
				( flags & d ? '' : 'd' )
				+
				( flags & g ? '' : 'g' )
				+
				( flags & i ? '' : 'i' )
				+
				( flags & m ? '' : 'm' )
				+
				( flags & s ? '' : 's' )
				+
				( flags & u ? '' : 'u' )
				+
				( flags & y ? '' : 'y' )
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

//import * as options\$0 from './options\$0';

const NONE                    = [];
let sourcePath         = '';
let sourceLines                    = NONE;
let lastLineIndex         = -1;
let lineIndex         = -1;

const throws = (error       )        => {
	//if ( sourceLines!==NONE ) { done(); options\$0.clear(); }
	throw error;
};

const EOL = /\r?\n/;
const todo = (source        , path        )       => {
	if ( typeof path!=='string' ) { throw TypeError$1('TOML.parse(,,,,sourcePath)'); }
	sourcePath = path;
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length - 1;
	lineIndex = -1;
};

const next = ()         => sourceLines[++lineIndex] ;

const rest = ()          => lineIndex!==lastLineIndex;

class mark {
	                 lineIndex = lineIndex;
	                 type                                                                                           ;
	                 restColumn        ;
	constructor (type                                                                                           , restColumn        ) {
		this.type = type;
		this.restColumn = restColumn;
		return this;
	}
	must (          )         {
		lineIndex===lastLineIndex && throws(SyntaxError$1(`${this.type} is not close until the end of the file` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
		return sourceLines[++lineIndex] ;
	}
	nowrap (          )        {
		throws(Error$1(`TOML.parse(,,multilineStringJoiner) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
	}
}
const where = (pre        , rowIndex         = lineIndex, columnNumber         = 0)         => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${rowIndex + 1}:${columnNumber})`
		: `${pre}line ${rowIndex + 1}: ${sourceLines[rowIndex]}`;

const done = ()       => {
	sourcePath = '';
	sourceLines = NONE;
};

const RangeError$1 = RangeError;

const BigInt$1 = BigInt;

const WeakMap$1 = WeakMap;

const get = WeakMap.prototype.get;

const set = WeakMap.prototype.set;

const isSafeInteger = Number.isSafeInteger;

const ownKeys = Reflect.ownKeys;

const WeakSet$1 = WeakSet;

const set_has = WeakSet.prototype.has;

const set_add = WeakSet.prototype.add;

const del = WeakSet.prototype['delete'];

const keys = Object.keys;

const getOwnPropertySymbols = Object.getOwnPropertySymbols;

const Null$1 = (
	/*! j-globals: null (internal) */
	/*#__PURE__*/function () {
		var assign = Object.assign || function assign (target, source) {
			var keys$1, index, key;
			for ( keys$1 = keys(source), index = 0; index<keys$1.length;++index ) {
				key = keys$1[index];
				target[key] = source[key];
			}
			if ( getOwnPropertySymbols ) {
				for ( keys$1 = getOwnPropertySymbols(source), index = 0; index<keys$1.length;++index ) {
					key = keys$1[index];
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

const Object_defineProperties = Object.defineProperties;

const fromEntries = Object.fromEntries;

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

const map_has = WeakMap.prototype.has;

const map_del = WeakMap.prototype['delete'];

const INLINES = new WeakMap$1                                                     ();
const SECTIONS = new WeakSet$1                ();

const deInline = /*#__PURE__*/map_del.bind(INLINES)                                                  ;
const deSection = /*#__PURE__*/del.bind(SECTIONS)                                                  ;

const isInline = /*#__PURE__*/map_has.bind(INLINES)                                                  ;
const ofInline = /*#__PURE__*/get.bind(INLINES)                                                      ;
const beInline = /*#__PURE__*/set.bind(INLINES)                                                                                                        ;
const inline =                                                         (value   )    => {
	beInline(value, true);
	isArray$1(value) || deSection(value);
	return value;
};
const multilineTable =                                  (value   )    => {
	beInline(value, false);
	deSection(value);
	return value;
};

const isSection = /*#__PURE__*/set_has.bind(SECTIONS)                                                                  ;
const beSection = /*#__PURE__*/set_add.bind(SECTIONS)                                                 ;
const Section =                            (table   )    => {
	if ( isArray$1(table) ) { throw TypeError$1(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	deInline(table);
	return table;
};

const INLINE = true;

const tables = new WeakSet$1       ();
const tables_add = /*#__PURE__*/set_add.bind(tables);
const isTable = /*#__PURE__*/set_has.bind(tables)                                              ;

const implicitTables = new WeakSet$1       ();
const implicitTables_add = /*#__PURE__*/set_add.bind(implicitTables);
const implicitTables_del = /*#__PURE__*/del.bind(implicitTables)                                         ;
const directlyIfNot = (table       )          => {
	if ( implicitTables_del(table) ) {
		beSection(table);
		return true;
	}
	return false;
};
const DIRECTLY = true;
const IMPLICITLY = false;

const pairs = new WeakSet$1       ();
const pairs_add = /*#__PURE__*/set_add.bind(pairs);
const fromPair = /*#__PURE__*/set_has.bind(pairs)                                         ;
const PAIR = true;

const PlainTable = /*#__PURE__*/Null$1(class Table extends Null$1      {
	                                
	constructor (isDirect          , isInline$fromPair          ) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

const OrderedTable = /*#__PURE__*/Null$1(class Table extends Null      {
	                                
	constructor (isDirect          , isInline$fromPair          ) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
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
let __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;

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

const MULTI_LINE_BASIC_STRING = /*#__PURE__*/theRegExp(/(?:[^\\"]+|\\.|""?(?!")){1,10}/sy);/// .?
const MULTI_LINE_BASIC_STRING_exec_0 = (_        )         => {
	let lastIndex         = MULTI_LINE_BASIC_STRING.lastIndex = 0;
	while ( MULTI_LINE_BASIC_STRING.test(_) ) { lastIndex = MULTI_LINE_BASIC_STRING.lastIndex; }
	return _.slice(0, lastIndex);
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_        )          => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');///

const BASIC_STRING_TAB______ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);
const BASIC_STRING__________ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);
const BASIC_STRING_DEL______ = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);
const BASIC_STRING_DEL_SLASH = /*#__PURE__*/theRegExp(/(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})){1,10}/y);
let __BASIC_STRING = BASIC_STRING_DEL_SLASH;
const BASIC_STRING_exec_1 = (line        )         => {
	let lastIndex         = __BASIC_STRING.lastIndex = 1;
	while ( __BASIC_STRING.test(line) ) { lastIndex = __BASIC_STRING.lastIndex; }
	lastIndex!==line.length && line[lastIndex]==='"' || throws(SyntaxError$1(`Bad basic string` + where(' at ')));
	return line.slice(1, lastIndex);
};

const IS_DOT_KEY = /*#__PURE__*/( () => theRegExp(/^[ \t]*\./).test )();
const DOT_KEY = /^[ \t]*\.[ \t]*/;
const BARE_KEY_STRICT = /*#__PURE__*/( () => theRegExp(/^[\w-]+/).exec )();
const BARE_KEY_FREE = /*#__PURE__*/( () => theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/).exec )();
let __BARE_KEY_exec = BARE_KEY_FREE;
const LITERAL_KEY____ = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/).exec )();
const LITERAL_KEY_DEL = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/).exec )();
let __LITERAL_KEY_exec = LITERAL_KEY_DEL;
let supportArrayOfTables = true;

const TABLE_DEFINITION_exec_groups = (lineRest        , parseKeys                                                                                     )                                                                                                   => {
	const asArrayItem          = lineRest[1]==='[';
	if ( asArrayItem ) {
		supportArrayOfTables || throws(SyntaxError$1(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')));
		lineRest = lineRest.slice(2);
	}
	else { lineRest = lineRest.slice(1); }
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	const { leadingKeys, finalKey } = { lineRest } = parseKeys(lineRest);
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	lineRest && lineRest[0]===']' || throws(SyntaxError$1(`Table header is not closed` + where(', which is found at ')));
	( lineRest.length>1 ? lineRest[1]===']'===asArrayItem : !asArrayItem ) || throws(SyntaxError$1(`Square brackets of Table definition statement not match` + where(' at ')));
	lineRest = lineRest.slice(asArrayItem ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( lineRest && lineRest[0]==='<' ) { ( { 1: tag, 2: lineRest } = TAG_REST_exec(lineRest) ?? throws(SyntaxError$1(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
};

const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest }                                                               )                                                                             => {
	const { 1: tag = '' } = { 2: lineRest } = KEY_VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError$1(`Keys must equal something` + where(', but missing at ')));
	tag || lineRest && lineRest[0]!=='#' || throws(SyntaxError$1(`Value can not be missing after euqal sign` + where(', which is found at ')));
	return { leadingKeys, finalKey, tag, lineRest };
};

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/).test )();
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F]/).test )();
let __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;

const switchRegExp = (specificationVersion        )       => {
	switch ( specificationVersion ) {
		case 1.0:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			supportArrayOfTables = false;
	}
};

const NUM = /*#__PURE__*/( () => newRegExp`
	(?:
		0
		(?:
			b[01][_01]*
		|
			o[0-7][_0-7]*
		|
			x[\dA-Fa-f][_\dA-Fa-f]*
		|
			(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
		)
	|
		[1-9][_\d]*
		(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
	|
		inf
	|
		nan
	)
` )();
const IS_AMAZING = /*#__PURE__*/( () => newRegExp`
	^(?:
		-?${NUM}
		(?:-${NUM})*
	|
		true
	|
		false
	)$
`.test )();
const BAD_DXOB = /*#__PURE__*/( () => newRegExp`_(?![\dA-Fa-f])`.test )();
const isAmazing = (keys        )          => IS_AMAZING(keys) && !BAD_DXOB(keys);

/* options */

let useWhatToJoinMultilineString                = null;
let usingBigInt                 = true;
let IntegerMin         = 0n;
let IntegerMax         = 0n;

              

                                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
  
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
let allowInlineTableMultilineAndTrailingCommaEvenNoComma         ;
let preserveComment         ;
let disableDigit         ;
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
const collect_off = ()        => { throw throws(SyntaxError$1(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
let collect                                                                                                              = collect_off;
                                                      
const Process = ()          => {
	if ( collection_length ) {
		let index = collection_length;
		const process = processor ;
		const queue = collection;
		collection = [];
		return ()       => {
			do {
				process(queue[--index] );
				queue.length = index;
			}
			while ( index );
		};
	}
	return null;
};

/* use & clear */

const clear = ()       => {
	processor = null;
	collection.length = collection_length = 0;
	zeroDatetime = false;
	useWhatToJoinMultilineString = null;
};

const use = (specificationVersion         , multilineStringJoiner         , useBigInt         , xOptions          )       => {
	
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
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError$1('TOML.parse(,,multilineStringJoiner)'); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError$1('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError$1('TOML.parse(,,,useBigInt)'); }
		usingBigInt = null;
		if ( useBigInt>=0 ) { IntegerMin = -( IntegerMax = BigInt$1(useBigInt) ); }
		else { IntegerMax = -( IntegerMin = BigInt$1(useBigInt) ) - 1n; }
	}
	
	if ( xOptions==null || xOptions===false ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( xOptions===true ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = true;
		collect = collect_off;
	}
	else if ( typeof xOptions==='function' ) {
		Table = OrderedTable;
		allowLonger = sError = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = true;
		if ( !mixed ) { throw TypeError$1('TOML.parse(,,,,tag) needs at least TOML 1.0 to support mixed type array'); }
		processor = xOptions;
		collect = collect_on;
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, string, tag, ...unknown } = xOptions;
		if ( ownKeys(unknown).length ) { throw TypeError$1('TOML.parse(,,,,xOptions)'); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !!longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
		disableDigit = !!string;
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

const previous = Symbol('previous');

              
	                                
		                                                  
		                                                  
	                  
  

const x =     (rootStack      )    => {
	let stack        = rootStack;
	let result = stack.next();
	if ( !result.done ) {
		result.value[previous] = stack;
		result = ( stack = result.value ).next();
		for ( ; ; ) {
			if ( result.done ) {
				if ( stack===rootStack ) { break; }
				stack = stack[previous] ;
				result = stack.next(result.value);
			}
			else {
				result.value[previous] = stack;
				result = ( stack = result.value ).next();
			}
		}
	}
	return result.value;
};

const arrays = new WeakSet$1       ();
const arrays_add = /*#__PURE__*/set_add.bind(arrays);
const isArray = /*#__PURE__*/set_has.bind(arrays)                                  ;

const OF_TABLES = false;
const STATICALLY = true;
const staticalArrays = new WeakSet$1       ();
const staticalArrays_add = /*#__PURE__*/set_add.bind(staticalArrays);
const isStatic = /*#__PURE__*/set_has.bind(staticalArrays)                             ;

const newArray = (isStatic         )        => {
	const array        = [];
	arrays_add(array);
	isStatic && staticalArrays_add(array);
	return array;
};

const TOMLDatetime = Date;

const parse$2 = Date.parse;

const preventExtensions = Object.preventExtensions;

const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

const defineProperties = (
	/*! j-globals: null.defineProperties (internal) */
	function defineProperties (object, descriptorMap) {
		var created = create$1(NULL);
		var names = keys(descriptorMap);
		for ( var length = names.length, index = 0; index<length; ++index ) {
			var name = names[index];
			created[name] = Descriptor(descriptorMap[name]);
		}
		if ( getOwnPropertySymbols ) {
			var symbols = getOwnPropertySymbols(descriptorMap);
			for ( length = symbols.length, index = 0; index<length; ++index ) {
				var symbol = symbols[index];
				if ( isEnum(descriptorMap, symbol) ) { created[symbol] = Descriptor(descriptorMap[symbol]); }
			}
		}
		return Object_defineProperties(object, created);
	}
	/*¡ j-globals: null.defineProperties (internal) */
);

const fpc =                      (c   )    => {
	freeze(freeze(c).prototype);
	return c;
};

const _29_ = /(?:0[1-9]|1\d|2\d)/;
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
	)
` )();

const HMS = /*#__PURE__*/( () => newRegExp`
	${_23_}:${_59_}:${_59_}
` )();

const OFFSET$ = /(?:Z|[+-]\d\d:\d\d)$/;

const Z_exec = /*#__PURE__*/( () => theRegExp           (/(([+-])\d\d):(\d\d)$/).exec )();

const OFFSET_DATETIME_exec = /*#__PURE__*/( () => newRegExp   `
	^
	${YMD}
	[T ]
	${HMS}
	(?:\.\d{1,3}(\d*?)0*)?
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
		for ( const key of ownKeys(TOMLDatetime.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(create$1(TOMLDatetime.prototype, descriptors));
	return freeze(Datetime);
} )();

                                        
                                      
                                      
                                      
                                      
                                      
                                       
                                     
                                            
                             
                             

const Value = (ISOString        )        => ISOString.replace(ZERO, '').replace(DELIMITER_DOT, '');

const leap = (literal        ) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE             = /*#__PURE__*/defineProperties(new TOMLDatetime(0), /*#__PURE__*/getOwnPropertyDescriptors(TOMLDatetime.prototype));

const OffsetDateTime_ISOString = Symbol('OffsetDateTime_ISOString');
const OffsetDateTime_value = Symbol('OffsetDateTime_value');
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
};
/*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number) => {
	if ( end ) { that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[OffsetDateTime_ISOString].slice(end); }
	const time = parse(that[OffsetDateTime_ISOString]);
	return that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);///time
};*///
const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
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
	///getFullYear (this :OffsetDateTime) :FullYear { return OffsetDateTime_get(this, 0, 4); }
	///setFullYear (this :OffsetDateTime, value :FullYear) :void { OffsetDateTime_set(this, 0, 4, value); }
	getUTCMonth (                    )        { return OffsetDateTime_use(this).getUTCMonth(); }
	///getMonth (this :OffsetDateTime) :Month { return OffsetDateTime_get(this, 5, 7) - 1; }
	///setMonth (this :OffsetDateTime, value :Month) :void { OffsetDateTime_set(this, 5, 7, value + 1); }
	getUTCDate (                    )       { return OffsetDateTime_use(this).getUTCDate(); }
	///getDate (this :OffsetDateTime) :Date { return OffsetDateTime_get(this, 8, 10); }
	///setDate (this :OffsetDateTime, value :Date) :void { OffsetDateTime_set(this, 8, 10, value); }
	
	getUTCHours (                    )        { return OffsetDateTime_use(this).getUTCHours(); }
	///getHours (this :OffsetDateTime) :Hours { return OffsetDateTime_get(this, 11, 13); }
	///setHours (this :OffsetDateTime, value :Hours) :void { OffsetDateTime_set(this, 11, 13, value); }
	getUTCMinutes (                    )          { return OffsetDateTime_use(this).getUTCMinutes(); }
	///getMinutes (this :OffsetDateTime) :Minutes { return OffsetDateTime_get(this, 14, 16); }
	///setMinutes (this :OffsetDateTime, value :Minutes) :void { OffsetDateTime_set(this, 14, 16, value); }
	getUTCSeconds (                    )          { return OffsetDateTime_use(this).getUTCSeconds(); }
	///getSeconds (this :OffsetDateTime) :Seconds { return OffsetDateTime_get(this, 17, 19); }
	///setSeconds (this :OffsetDateTime, value :Seconds) :void { OffsetDateTime_set(this, 17, 19, value); }
	getUTCMilliseconds (                    )               { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	///getMilliseconds (this :OffsetDateTime) :Milliseconds { return +this[OffsetDateTime_value].slice(12, 15); }///
	/*setMilliseconds (this :OffsetDateTime, value :Milliseconds) :void {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		OffsetDateTime_set(this, 0, 0, 0);
	}*///
	
	getUTCDay (                    )      { return OffsetDateTime_use(this).getUTCDay(); }
	///getDay (this :OffsetDateTime) :Day { return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay(); }
	getTimezoneOffset (                    )                 {
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	/*setTimezoneOffset (this :OffsetDateTime, value :TimezoneOffset) {
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
	}*///
	getTime (                    )       { return +this[OffsetDateTime_value].slice(0, 15); }///
	/*setTime (this :OffsetDateTime, value :Time) :void {
		value = DATE.setTime(value);
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this[OffsetDateTime_value] = ( '' + value ).padStart(15, '0');
		///return value;
	}*/
	
});

const LocalDateTime_ISOString = Symbol('LocalDateTime_ISOString');
const LocalDateTime_value = Symbol('LocalDateTime_value');
const LocalDateTime_get = (that                                    , start        , end        ) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that                                    , start        , end        , value        )       => {
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
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
	setFullYear (                     value          )       { LocalDateTime_set(this, 0, 4, value); }
	getMonth (                   )        { return LocalDateTime_get(this, 5, 7) - 1; }
	setMonth (                     value       )       { LocalDateTime_set(this, 5, 7, value + 1); }
	getDate (                   )       { return LocalDateTime_get(this, 8, 10); }
	setDate (                     value      )       { LocalDateTime_set(this, 8, 10, value); }
	
	getHours (                   )        { return LocalDateTime_get(this, 11, 13); }
	setHours (                     value       )       { LocalDateTime_set(this, 11, 13, value); }
	getMinutes (                   )          { return LocalDateTime_get(this, 14, 16); }
	setMinutes (                     value         )       { LocalDateTime_set(this, 14, 16, value); }
	getSeconds (                   )          { return LocalDateTime_get(this, 17, 19); }
	setSeconds (                     value         )       { LocalDateTime_set(this, 17, 19, value); }
	getMilliseconds (                   )               { return +this[LocalDateTime_value].slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (                     value              )       {
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = this[LocalDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const LocalDate_ISOString = Symbol('LocalDate_ISOString');
const LocalDate_value = Symbol('LocalDate_value');
const LocalDate_get = (that                                , start        , end        ) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that                                , start        , end        , value        ) =>
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + ( '' + value ).padStart(end - start, '0') + that[LocalDate_ISOString].slice(end)
	);
const LocalDate = /*#__PURE__*/fpc(class LocalDate extends Datetime {
	
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
	setFullYear (                 value          )       { LocalDate_set(this, 0, 4, value); }
	getMonth (               )        { return LocalDate_get(this, 5, 7) - 1; }
	setMonth (                 value       )       { LocalDate_set(this, 5, 7, value + 1); }
	getDate (               )       { return LocalDate_get(this, 8, 10); }
	setDate (                 value      )       { LocalDate_set(this, 8, 10, value); }
	
});

const LocalTime_ISOString = Symbol('LocalTime_ISOString');
const LocalTime_value = Symbol('LocalTime_value');
const LocalTime_get = (that                                , start        , end        ) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that                                , start        , end        , value        ) =>
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + ( '' + value ).padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
const LocalTime = /*#__PURE__*/fpc(class LocalTime extends Datetime {
	
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
	setHours (                 value       )       { LocalTime_set(this, 0, 2, value); }
	getMinutes (               )          { return LocalTime_get(this, 3, 5); }
	setMinutes (                 value         )       { LocalTime_set(this, 3, 5, value); }
	getSeconds (               )          { return LocalTime_get(this, 6, 8); }
	setSeconds (                 value         )       { LocalTime_set(this, 6, 8, value); }
	getMilliseconds (               )               { return +this[LocalTime_value].slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (                 value              )       {
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = this[LocalTime_ISOString].slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const parseInt$1 = parseInt;

const fromCodePoint = String.fromCodePoint;

const ESCAPED_IN_SINGLE_LINE = /[^\\]+|\\(?:[\\"btnfr/]|u.{4}|U.{8})/gs;
const ESCAPED_IN_MULTI_LINE = /[^\n\\]+|\n|\\(?:[\t ]*\n[\t\n ]*|[\\"btnfr/]|u.{4}|U.{8})/gs;

const BasicString = (literal        )         => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_SINGLE_LINE) ;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index] ;
		if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode         = parseInt$1(part.slice(2), 16);
					0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt$1(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};

const MultilineBasicString = (literal        , useWhatToJoinMultilineString        , n        )         => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_MULTI_LINE) ;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index] ;
		if ( part==='\n' ) {
			++n;
			parts[index] = useWhatToJoinMultilineString;
		}
		else if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\n':
				case ' ':
				case '\t':
					for ( let i = 0; i = part.indexOf('\n', i) + 1; ) { ++n; }
					parts[index] = '';
					break;
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode         = parseInt$1(part.slice(2), 16);
					0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt$1(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};

const INTEGER_D = /[-+]?(?:0|[1-9][_\d]*)/;
const BAD_D = /*#__PURE__*/( () => newRegExp`_(?!\d)`.test )();
const IS_D_INTEGER = /*#__PURE__*/( () => newRegExp`^${INTEGER_D}$`.test )();
const IS_XOB_INTEGER = /*#__PURE__*/( () => theRegExp(/^0(?:x[\dA-Fa-f][_\dA-Fa-f]*|o[0-7][_0-7]*|b[01][_01]*)$/).test )();
const BAD_XOB = /*#__PURE__*/( () => newRegExp`_(?![\dA-Fa-f])`.test )();
const UNDERSCORES_SIGN = /_|^[-+]/g;

const IS_INTEGER = (literal        )          => ( IS_D_INTEGER(literal) || /*options\$0.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal);

const BigIntInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	let bigInt         = BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal[0]==='-' ) { bigInt = -bigInt; }
	allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| throws(RangeError$1(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
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
	(?:
		\.\d[_\d]*
		(?:[eE][-+]?\d[_\d]*)?
	|
		[eE][-+]?\d[_\d]*
	)
	$`.test )();
const UNDERSCORES = /_/g;
const IS_ZERO = /*#__PURE__*/( () => theRegExp(/^[-+]?0(?:\.[0_]+)?(?:[eE][-+]?0+)?$/).test )();

const Float = (literal        )         => {
	if ( !IS_FLOAT(literal) || BAD_D(literal) ) {
		//if ( options\$0.sFloat ) {
		//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
		//	if ( literal==='-inf' ) { return -Infinity; }
		//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
		//}
		throws(SyntaxError$1(`Invalid Float ${literal}` + where(' at ')));
	}
	const number = +literal.replace(UNDERSCORES, '');
	if ( sError ) {
		isFinite$1(number) || throws(RangeError$1(`Float has been as big as inf, like ${literal}` + where(' at ')));
		number || IS_ZERO(literal) || throws(RangeError$1(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + where(' at ')));
	}
	return number;
};

const prepareTable = (table       , keys               )        => {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++] ;
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				isInline(table) && throws(Error$1(`Trying to define Table under Inline Table` + where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && throws(Error$1(`Trying to append value to Static Array` + where(' at ')));
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

const appendTable = (table       , finalKey        , asArrayItem         , tag        )        => {
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
			directlyIfNot(lastTable) || throws(Error$1(`Duplicate Table definition` + where(' at ')));
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
	const start = new mark('Multi-line Literal String', literal.length + 3);
	if ( !literal ) {
		literal = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
		if ( $ ) {
			table[finalKey] = checkLiteralString($[1]) + $[2];
			return $[3];
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap();
	for ( const lines                          = [ checkLiteralString(literal) ]; ; ) {
		const line         = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			table[finalKey] = lines.join(useWhatToJoinMultilineString );
			return $[3];
		}
		lines[lines.length] = checkLiteralString(line);
	}
} )     
	                                                                       
	                                                                      
 ;

const assignBasicString = ( (table       , finalKey        , literal        )         => {
	if ( literal[1]!=='"' || literal[2]!=='"' ) {
		const string = BASIC_STRING_exec_1(literal);
		table[finalKey] = BasicString(string);
		return literal.slice(2 + string.length).replace(PRE_WHITESPACE, '');
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
	const start = new mark('Multi-line Basic String', literal.length + 3);
	const skipped        = literal ? 0 : 1;
	if ( skipped ) {
		literal = start.must();
		const $ = MULTI_LINE_BASIC_STRING_exec_0(literal);
		let { length } = $;
		if ( literal.startsWith('"""', length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
			length += 3;
			table[finalKey] = MultilineBasicString($, useWhatToJoinMultilineString , skipped) + ( endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return literal.slice(length).replace(PRE_WHITESPACE, '');
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap();
	ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal += '\n') || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
	for ( const lines                          = [ literal ]; ; ) {
		let line         = start.must();
		const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
		let { length } = $;
		if ( line.startsWith('"""', length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
			length += 3;
			table[finalKey] = MultilineBasicString(lines.join('') + $, useWhatToJoinMultilineString , skipped) + ( endsWithQuote ? line[length]==='"' ? line[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line += '\n') || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		lines[lines.length] = line;
	}
} )     
	                                                                       
	                                                                      
 ;

const Symbol_ = Symbol;

const KEYS = /*#__PURE__*/Null$1(null)                                                    ;
const Sym = (key        ) => {
	const sym = Symbol_(key);
	KEYS[sym] = key;
	return KEYS[key] = sym;
};
const commentFor = (key        )         => KEYS[key] ?? Sym(key);

const NEWLINE = /\r?\n/g;
const getComment =                    (table                                                             , key   )                     => {
	if ( key in KEYS && KEYS[key]  in table ) {
		const comment = table[KEYS[key] ] ;
		if ( typeof comment==='string' ) { return ' #' + comment.replace(NEWLINE, '')                 ; }///
		throw TypeError$1(`the value of commentKey must be "string" type, while "${comment===null ? 'null' : typeof comment}" is found`);
	}
	return '';
};

const IS_OFFSET$ = /*#__PURE__*/( () => theRegExp(OFFSET$).test )();

const parseKeys = (rest        )                                                                => {
	let lineRest         = rest;
	const leadingKeys           = [];
	let lastIndex         = -1;
	for ( ; ; ) {
		lineRest || throws(SyntaxError$1(`Empty bare key` + where(' at ')));
		if ( lineRest[0]==='"' ) {
			const key         = BASIC_STRING_exec_1(lineRest);
			lineRest = lineRest.slice(2 + key.length);
			leadingKeys[++lastIndex] = BasicString(key);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key         = ( ( isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec )(lineRest) ?? throws(SyntaxError$1(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key;
		}
		if ( IS_DOT_KEY(lineRest) ) { lineRest = lineRest.replace(DOT_KEY, ''); }
		else { break; }
	}
	if ( disableDigit ) {
		const keys = rest.slice(0, -lineRest.length);
		( isAmazing(keys) || enableNull && keys==='null' ) && throws(SyntaxError$1(`Bad bare key disabled by xOptions.string` + where(' at ')));
	}
	if ( disallowEmptyKey ) {
		let index         = lastIndex;
		do { leadingKeys[index]  || throws(SyntaxError$1(`Empty key is not allowed before TOML v0.5` + where(', which at '))); }
		while ( index-- );
	}
	const finalKey         = leadingKeys[lastIndex] ;
	leadingKeys.length = lastIndex;
	return { leadingKeys, finalKey, lineRest };
};

const push = (lastArray       , lineRest        )             => {
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
			return equalInlineTable(asTables(lastArray), lastArray.length, lineRest);
		case '[':
			return equalStaticArray(asArrays(lastArray), lastArray.length, lineRest);
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

const equalStaticArray = function * (            table       , finalKey        , lineRest        )    {
	const staticArray        = table[finalKey] = newArray(STATICALLY);
	const start = new mark('Static Array', lineRest.length);
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	let inline = true;
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = false;
		lineRest = start.must().replace(PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) {
		inline && beInline(staticArray, true);
		return lineRest.replace(SYM_WHITESPACE, '');
	}
	for ( ; ; ) {
		const rest             = push(staticArray, lineRest);
		lineRest = typeof rest==='string' ? rest : yield rest;
		while ( !lineRest || lineRest[0]==='#' ) {
			inline = false;
			lineRest = start.must().replace(PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = start.must().replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			throws(SyntaxError$1(`Unexpect character in static array item value` + where(', which is found at ')));
		}
	}
	inline && beInline(staticArray, true);
	return lineRest.replace(SYM_WHITESPACE, '');
}     
	                                                                   
	                                                                  
 ;

const equalInlineTable = function * (            table       , finalKey        , lineRest        )    {
	const inlineTable        = table[finalKey] = new Table(DIRECTLY, INLINE);
	if ( allowInlineTableMultilineAndTrailingCommaEvenNoComma ) {
		const start = new mark('Inline Table', lineRest.length);
		lineRest = lineRest.replace(SYM_WHITESPACE, '');
		let inline = true;
		for ( ; ; ) {
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = start.must().replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]==='}' ) { break; }
			const forComment             = ForComment(inlineTable, lineRest);
			const rest             = assign(forComment);
			lineRest = typeof rest==='string' ? rest : yield rest;
			if ( lineRest ) {
				if ( lineRest[0]==='#' ) {
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1); }
					inline = false;
					do { lineRest = start.must().replace(PRE_WHITESPACE, ''); }
					while ( !lineRest || lineRest[0]==='#' );
				}
			}
			else {
				inline = false;
				do { lineRest = start.must().replace(PRE_WHITESPACE, ''); }
				while ( !lineRest || lineRest[0]==='#' );
			}
			if ( lineRest[0]===',' ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
		}
		inline || beInline(inlineTable, false);
	}
	else {
		lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
		if ( lineRest[0]!=='}' ) {
			for ( ; ; ) {
				lineRest[0]==='#' && throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				const rest             = assign(ForComment(inlineTable, lineRest));
				lineRest = ( typeof rest==='string' ? rest : yield rest ) || throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				if ( lineRest[0]==='}' ) { break; }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError$1(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
					lineRest[0]==='}' && throws(SyntaxError$1(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));
				}
			}
		}
	}
	return lineRest.replace(SYM_WHITESPACE, '');
}     
	                                                                   
	                                                                  
 ;

                                                                                              
const ForComment = (lastInlineTable       , lineRest        )             => {
	const { leadingKeys, finalKey, tag } = { lineRest } = KEY_VALUE_PAIR_exec_groups(parseKeys(lineRest));
	return { table: prepareInlineTable(lastInlineTable, leadingKeys), finalKey, tag, lineRest };
};
const assign = ({ finalKey, tag, lineRest, table }            )             => {
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
			return equalInlineTable(table, finalKey, lineRest);
		case '[':
			return equalStaticArray(table, finalKey, lineRest);
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
				const { leadingKeys, finalKey, asArrayItem, tag, lineRest } = TABLE_DEFINITION_exec_groups(line, parseKeys);
				const table        = prepareTable(rootTable, leadingKeys);
				if ( lineRest ) {
					if ( lineRest[0]==='#' ) { if ( preserveComment && !asArrayItem ) { table[commentFor(finalKey)] = lineRest.slice(1); } }
					else { throws(SyntaxError$1(`Unexpect charachtor after table header` + where(' at '))); }
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError$1(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				const forComment             = ForComment(lastSectionTable, line);
				let rest             = assign(forComment);
				typeof rest==='string' || ( rest = x        (rest) );
				if ( rest ) {
					if ( rest[0]==='#' ) { if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); } }
					else { throws(SyntaxError$1(`Unexpect charachtor after key/value pair` + where(' at '))); }
				}
			}
		}
	}
	return rootTable;
};

const Uint8Array$1 = Uint8Array;

const Buffer$1 = typeof Buffer==='undefined' ? undefined$1 : Buffer;

const isArrayBufferLike = (value        )                       => 'byteLength' in value;

const message = 'A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.';

const arrayBufferLike2string                                             = Buffer$1
	
	? ( ({ isBuffer, [Symbol.species]: Buf, byteLength, allocUnsafe }) =>
		(arrayBufferLike                                   )         => {
			if ( !arrayBufferLike.byteLength ) { return ''; }
			const buffer         = isBuffer(arrayBufferLike) ? arrayBufferLike : 'length' in arrayBufferLike ? new Buf(arrayBufferLike.buffer, arrayBufferLike.byteOffset, arrayBufferLike.length) : new Buf(arrayBufferLike);
			const string         = buffer.toString();
			if ( string.includes('\uFFFD') ) {
				const length         = byteLength(string);
				if ( length!==buffer.length ) { throw Error$1(message); }
				const utf8 = allocUnsafe(length);
				///@ts-ignore
				utf8.utf8Write(string, 0, length);
				if ( !utf8.equals(buffer) ) { throw Error$1(message); }
			}
			return string[0]==='\uFEFF' ? string.slice(1) : string;
		}
	)(Buffer$1                                                                                                                         )///
	
	: (arrayBufferLike                          )         => {
		if ( !arrayBufferLike.byteLength ) { return ''; }
		const uint8Array             = 'length' in arrayBufferLike ? arrayBufferLike : new Uint8Array$1(arrayBufferLike);
		const { length } = uint8Array;
		const length_1 = length - 1;
		const length_2 = length_1 - 1;
		const length_3 = length_2 - 1;
		const stringArray           = [];
		let stringArray_length         = 0;
		let index         = 0;
		do {
			let codePoint         = uint8Array[index] ;
			if ( codePoint<0b1100_0000 ) {
				if ( codePoint<0b1000_0000 ) {
					stringArray[stringArray_length++] = fromCharCode(codePoint);
					index += 1;
					continue;
				}
			}
			else if ( codePoint<0b1110_0000 ) {
				if ( index<length_1 ) {
					const secondByte         = uint8Array[index + 1] ;
					if ( ( secondByte&0b1100_0000 )===0b1000_0000 ) {
						codePoint = ( codePoint&0b0001_1111 )<<6|( secondByte&0b0011_1111 );
						if ( 0b0111_1111<codePoint ) {
							stringArray[stringArray_length++] = fromCharCode(codePoint);
							index += 2;
							continue;
						}
					}
				}
			}
			else if ( codePoint<0b1111_0000 ) {
				if ( index<length_2 ) {
					const secondByte         = uint8Array[index + 1] ;
					const thirdByte         = uint8Array[index + 2] ;
					if ( ( secondByte&0b1100_0000 )===0b1000_0000 && ( thirdByte&0b1100_0000 )===0b1000_0000 ) {
						codePoint = ( codePoint&0b0000_1111 )<<12|( secondByte&0b0011_1111 )<<6|( thirdByte&0b0011_1111 );
						if ( ( codePoint<0xD800 ? 0x07FF : 0xDFFF )<codePoint ) {
							stringArray[stringArray_length++] = fromCharCode(codePoint);
							index += 3;
							continue;
						}
					}
				}
			}
			else {
				if ( index<length_3 ) {
					const secondByte         = uint8Array[index + 1] ;
					const thirdByte         = uint8Array[index + 2] ;
					const fourthByte         = uint8Array[index + 3] ;
					if ( ( secondByte&0b1100_0000 )===0b1000_0000 && ( thirdByte&0b1100_0000 )===0b1000_0000 && ( fourthByte&0b1100_0000 )===0b1000_0000 ) {
						codePoint = ( codePoint&0b0000_1111 )<<18|( secondByte&0b0011_1111 )<<12|( thirdByte&0b0011_1111 )<<6|( fourthByte&0b0011_1111 );
						if ( 0xFFFF<codePoint && codePoint<0x11_0000 ) {
							stringArray[stringArray_length++] = fromCodePoint(codePoint);
							index += 4;
							continue;
						}
					}
				}
			}
			throw Error$1(message);
		}
		while ( index!==length );
		const string = stringArray.join('');
		return string[0]==='\uFEFF' ? string.slice(1) : string;
	};

const IS_NON_SCALAR = /*#__PURE__*/( () => theRegExp(/[\uD800-\uDFFF]/u).test )();

let holding          = false;

const parse = (source        , specificationVersion                                   , multilineStringJoiner                                                                                  , useBigInt                   , xOptions                     )        => {
	if ( holding ) { throw Error$1('parse during parsing.'); }
	holding = true;
	let rootTable       ;
	let process                   ;
	try {
		let sourcePath         = '';
		if ( typeof source==='object' && source ) {
			if ( isArrayBufferLike(source) ) { source = arrayBufferLike2string(source); }
			else {
				sourcePath = source.path;
				if ( typeof sourcePath!=='string' ) { throw TypeError$1('TOML.parse(source.path)'); }
				const { data, require: req = typeof require==='function' ? require : undefined$1 } = source;
				if ( req ) {
					const dirname_ = req.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '');
					if ( dirname_ ) {
						sourcePath = ( req                                          )('path').resolve(dirname_, sourcePath);
						if ( typeof sourcePath!=='string' ) { throw TypeError$1(`TOML.parse(source.require('path').resolve)`); }
					}
					if ( data===undefined$1 ) {
						const data = ( req                                      )('fs').readFileSync(sourcePath);
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError$1(`TOML.parse(source.require('fs').readFileSync)`); }
					}
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError$1('TOML.parse(source.data)'); }
					}
				}
				else {
					if ( data===undefined$1 ) { throw TypeError$1('TOML.parse(source.data|source.require)'); }
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError$1('TOML.parse(source.data)'); }
					}
				}
			}
		}
		else if ( typeof source!=='string' ) { throw TypeError$1('TOML.parse(source)'); }
		try {
			if ( IS_NON_SCALAR(source) ) { throw Error$1('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
			if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
				if ( useBigInt!==undefined$1 || xOptions!==undefined$1 ) { throw TypeError$1('options mode ? args mode'); }
				( { joiner: multilineStringJoiner, bigint: useBigInt, x: xOptions } = multilineStringJoiner );
			}
			try {
				use(specificationVersion, multilineStringJoiner, useBigInt, xOptions);
				todo(source, sourcePath);
				try {
					source && source[0]==='\uFEFF' && throws(TypeError$1(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')));
					rootTable = Root();
					process = Process();
				}
				finally { done(); }//clearWeakSets();
			}
			finally { clear(); }
		}
		finally { clearRegExp(); }
	}
	finally { holding = false; }
	process?.();
	return rootTable;
};

const parse$1 = /*#__PURE__*/assign$1(
	(source        , specificationVersion                                   , multilineStringJoiner         , useBigInt                   , xOptions                     ) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions)
			: parse(source, 1.0, specificationVersion          , multilineStringJoiner                                       , useBigInt                      )
	,
	{
		'1.0': (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
		1.0: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions),
		0.5: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions),
		0.4: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions),
		0.3: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions),
		0.2: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions),
		0.1: (source        , multilineStringJoiner         , useBigInt                   , xOptions                     ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
	}
);

const getOwnPropertyNames = Object.getOwnPropertyNames;

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

const Boolean$1 = Boolean;

const String$1 = String;

const Number$1 = Number;

const LITERAL = new WeakSet$1;

const isLiteral = /*#__PURE__*/set_has.bind(LITERAL)                                                                    ;

const beLiteral = /*#__PURE__*/set_add.bind(LITERAL)                                                   ;

const literal = (literal                               , ...chars          )                   => {
	if ( typeof literal!=='string' ) {
		let index = chars.length;
		if ( index ) {
			const { raw } = literal;
			literal = raw[index] ;
			while ( index ) { chars[--index] += raw[index] ; }
			literal = chars.join('') + literal;
		}
		else { literal = literal.raw[0] ; }
	}
	const lines = literal.split('\n')                           ;
	beLiteral(lines);
	return lines;
};

const ESCAPED = /*#__PURE__*/Null$1        ({
	.../*#__PURE__*/fromEntries(/*#__PURE__*/[ ...Array$1(0x20) ].map((_, charCode) => [ fromCharCode(charCode), '\\u' + charCode.toString(16).toUpperCase().padStart(4, '0') ])),
	'\b': '\\b',
	'\t': '\\t',
	'\n': '\\n',
	'\f': '\\f',
	'\r': '\\r',
	'"': '\\"',
	'"""': '""\\"',
	'\\': '\\\\',
	'\x7F': '\\u007F',
});

const NEED_BASIC = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0A-\x1F'\x7F]/).test )();
const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
const NEED_ESCAPE = /*#__PURE__*/( () => theRegExp(/^[\x00-\x08\x0A-\x1F"\\\x7F]/).test )();
const literalString = (value        )                => `'${value}'`;
const singlelineString = (value        )                                => {
	if ( NEED_BASIC(value) ) {
		const parts = value.match(BY_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `'${value}'`;
};

const NEED_MULTILINE_BASIC = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0A-\x1F\x7F]|'''/).test )();
const REAL_MULTILINE_ESCAPE = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/).test )();
const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
const NEED_MULTILINE_ESCAPE = /*#__PURE__*/( () => theRegExp(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/).test )();
const escape_multiline = (lines          , lineIndex        ) => {
	const line = lines[lineIndex] ;
	if ( REAL_MULTILINE_ESCAPE(line) ) {
		const parts = line.match(BY_MULTILINE_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_MULTILINE_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		lines[lineIndex] = parts.join('');
	}
};

                                                    
const Lines = (lines                                  )        => {
	lines = [ '', ...lines ]         ;
	if ( lines.length===1 ) { ( lines                                    )[1] = ''; }
	return lines         ;
};

const multilineString = (lines       )                                                                                  => {
	const lastIndex = lines.length - 1;
	let index = lastIndex;
	do { if ( NEED_MULTILINE_BASIC(lines[index] ) ) { break; } }
	while ( --index );
	if ( index ) {
		index = lastIndex;
		escape_multiline(lines, index);
		lines[index] += lines[0] = '"""';
		while ( --index ) { escape_multiline(lines, index); }
	}
	else { lines[lastIndex] += lines[0] = '\'\'\''; }
	beLiteral(lines);
	return lines                                                                                   ;
};

const multilineBasicString = (lines       )                                         => {
	let index = lines.length - 1;
	escape_multiline(lines, index);
	lines[index] += lines[0] = '"""';
	while ( --index ) { escape_multiline(lines, index); }
	beLiteral(lines);
	return lines                                          ;
};

const _Infinity = -Infinity;
const INTEGER_LIKE = /*#__PURE__*/( () => theRegExp(/^-?\d+$/).test )();
const ensureFloat = (literal        ) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float = (value        ) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan';

const BARE = /*#__PURE__*/( () => theRegExp(/^[\w-]+$/).test )();
const $Key$ = (key        )         => BARE(key) ? key : singlelineString(key);

const FIRST = /[^.]+/;
const $Keys = (keys        )         => isAmazing(keys) ? keys.replace(FIRST, literalString) : keys==='null' ? `'null'` : keys;

class TOMLSection extends Array$1         {
	
	                 document              ;
	
	constructor (document              ) {
		super();
		this.document = document;
		return this;
	}
	
	[Symbol.toPrimitive] () { return this.join(this.document.newline); }
	
	appendNewline () { this[this.length] = ''; }
	        set appendLine (source        ) { this[this.length] = source; }
	        set appendInline (source        ) { this[this.length - 1] += source; }   
	        set appendInlineIf (source        ) { source && ( this[this.length - 1] += source ); }///
	
	* assignBlock                           (documentKeys_                   , sectionKeys_                  , table   , tableKeys                            )    {
		const { document } = this;
		const { newlineUnderHeader, newlineUnderSectionButPair } = document;
		const newlineAfterDotted = sectionKeys_ ? document.newlineUnderPairButDotted : false;
		const newlineAfterPair = sectionKeys_ ? document.newlineUnderDotted : document.newlineUnderPair;
		for ( const tableKey of tableKeys ) {
			const value                 = table[tableKey] ;
			const $key$ = $Key$(tableKey);
			const documentKeys = documentKeys_ + $key$;
			if ( isArray$1(value) ) {
				if ( value.length && isSection(value[0]) ) {
					const tableHeader = `[[${documentKeys}]]`         ;
					const documentKeys_ = documentKeys + '.'                ;
					for ( const table of value                           ) {
						const section = document.appendSection();
						section[0] = tableHeader;
						if ( newlineUnderHeader ) {
							section[1] = '';
							yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
							newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
						}
						else {
							yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
							newlineUnderSectionButPair && section.appendNewline();
						}
					}
					continue;
				}
			}
			else {
				if ( isSection(value) ) {
					const section = document.appendSection();
					section[0] = `[${documentKeys}]${getComment(table, tableKey)}`;
					if ( newlineUnderHeader ) {
						section[1] = '';
						yield section.assignBlock(documentKeys + '.'                , ``, value, getOwnPropertyNames(value));
						newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
					}
					else {
						yield section.assignBlock(documentKeys + '.'                , ``, value, getOwnPropertyNames(value));
						newlineUnderSectionButPair && section.appendNewline();
					}
					continue;
				}
			}
			const sectionKeys = sectionKeys_ + $key$;
			this.appendLine = $Keys(sectionKeys) + ' = ';
			const keysIfDotted = this.value('', value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				--this.length;
				yield this.assignBlock(documentKeys + '.'                , sectionKeys + '.'                , value                                   , keysIfDotted);
				newlineAfterDotted && this.appendNewline();
			}
			else {
				this.appendInlineIf = getComment(table, tableKey);
				newlineAfterPair && this.appendNewline();
			}
		}
	}
	
	        value (indent        , value                , getOwnPropertyNames                                                         ) {
		switch ( typeof value ) {
			case 'object':
				if ( value===null ) {
					if ( this.document.nullDisabled ) { throw TypeError$1(`toml can not stringify "null" type value without truthy options.xNull`); }
					this.appendInline = 'null';
					break;
				}
				if ( isLiteral(value) ) {
					const { length } = value;
					this.appendInline = value[0];
					let index = 1;
					while ( index!==length ) { this.appendLine = value[index++] ; }
					break;
				}
				const inlineMode = ofInline(value);
				if ( isArray$1(value) ) {
					inlineMode
						? this.singlelineArray(indent, value)
						: this.staticArray(indent, value);
					break;
				}
				if ( inlineMode!==undefined$1 ) {
					inlineMode || this.document.multilineTableDisabled
						? this.inlineTable(indent, value                        )
						: this.multilineTable(indent, value                        , this.document.multilineTableComma);
					break;
				}
				if ( value instanceof TOMLDatetime ) {
					this.appendInline = this.document._ ? value.toISOString().replace('T', ' ') : value.toISOString();
					break;
				}
				if ( value instanceof String$1 ) { throw TypeError$1(`TOML.stringify refuse to handle [object String]`); }
				if ( getOwnPropertyNames ) {
					const keys = getOwnPropertyNames(value                        );
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
					break;
				}
				else {
					if ( value instanceof BigInt$1 ) { throw TypeError$1(`TOML.stringify refuse to handle [object BigInt]`); }
					if ( value instanceof Number$1 ) { throw TypeError$1(`TOML.stringify refuse to handle [object Number]`); }
					if ( value instanceof Boolean$1 ) { throw TypeError$1(`TOML.stringify refuse to handle [object Boolean]`); }
					if ( value instanceof Symbol_ ) { throw TypeError$1(`TOML.stringify refuse to handle [object Symbol]`); }
					this.inlineTable(indent, value                        );
					break;
				}
			case 'bigint':
				this.appendInline = '' + value;
				break;
			case 'number':
				this.appendInline = this.document.asInteger(value) ? is(value, -0) ? '-0' : '' + value : float(value);
				break;
			case 'string':
				this.appendInline = singlelineString(value);
				break;
			case 'boolean':
				this.appendInline = value ? 'true' : 'false';
				break;
			default:
				throw TypeError$1(`toml can not stringify "${typeof value}" type value`);
		}
		return null;
	}
	
	        singlelineArray (indent        , staticArray                      ) {
		const { length } = staticArray;
		if ( length ) {
			this.appendInline = '[ ';
			this.value(indent, staticArray[0] );
			let index = 1;
			while ( index!==length ) {
				this.appendInline = ', ';
				this.value(indent, staticArray[index++] );
			}
			this.appendInline = ' ]';
		}
		else { this.appendInline = '[ ]'; }
	}
	        staticArray (indent        , staticArray                      ) {
		this.appendInline = '[';
		const indent_ = indent + this.document.indent;
		for ( const item of staticArray ) {
			this.appendLine = indent_;
			this.value(indent_, item);
			this.appendInline = ',';
		}
		this.appendLine = indent + ']';
	}
	
	        inlineTable (indent        , inlineTable                      ) {
		const keys = getOwnPropertyNames(inlineTable);
		if ( keys.length ) {
			this.appendInline = '{ ';
			this.assignInline(indent, inlineTable, ``, keys);
			this[this.length - 1] = this[this.length - 1] .slice(0, -2) + ' }';
		}
		else { this.appendInline = '{ }'; }
	}
	        multilineTable (indent        , inlineTable                      , comma         ) {
		this.appendInline = '{';
		this.assignMultiline(indent, inlineTable, ``, getOwnPropertyNames(inlineTable), comma);
		this.appendLine = indent + '}';
	}
	        assignInline                                 (indent        , inlineTable   , keys_                   , keys                            ) {
		for ( const key of keys ) {
			const value                 = inlineTable[key] ;
			const keys = keys_ + $Key$(key);
			const before_value = this.appendInline = $Keys(keys) + ' = ';
			const keysIfDotted = this.value(indent, value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				this[this.length - 1] = this[this.length - 1] .slice(0, -before_value.length);
				this.assignInline(indent, value                        , keys + '.'                , keysIfDotted);
			}
			else { this.appendInline = ', '; }
		}
	}
	        assignMultiline                                 (indent        , inlineTable   , keys_                   , keys                            , comma         ) {
		const indent_ = indent + this.document.indent;
		for ( const key of keys ) {
			const value                 = inlineTable[key] ;
			const keys = keys_ + $Key$(key);
			this.appendLine = indent_ + $Keys(keys) + ' = ';
			const keysIfDotted = this.value(indent_, value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				--this.length;
				this.assignMultiline(indent, value                        , keys + '.'                , keysIfDotted, comma);
			}
			else {
				comma
					? this.appendInline = ',' + getComment(inlineTable, key)
					: this.appendInlineIf = getComment(inlineTable, key);
			}
		}
	}
	
}

const name2code = /*#__PURE__*/Null$1({
	document: 0,
	section: 1,
	header: 2,
	pairs: 3,
	pair: 4,
}         );

const IS_INDENT = /*#__PURE__*/( () => theRegExp(/^[\t ]*$/).test )();

const return_false = () => false;

class TOMLDocument extends Array$1              {
	
	         get ['constructor'] () { return Array$1; }
	
	0 = new TOMLSection(this);
	
	         asInteger                                         ;
	         newline                    ;
	         newlineUnderSection         ;
	         newlineUnderSectionButPair         ;
	         newlineUnderHeader         ;
	         newlineUnderPair         ;
	         newlineUnderPairButDotted         ;
	         newlineUnderDotted         ;
	         indent        ;
	         _         ;
	         nullDisabled         ;
	         multilineTableDisabled         ;
	         multilineTableComma         ;
	
	constructor (options                  ) {
		super();
		const integer = options?.integer;
		if ( integer===undefined ) { this.asInteger = return_false; }
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError$1(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError$1(`TOML.stringify(,{integer}) can only be number`); }
		const newline = options?.newline;
		if ( newline===undefined || newline==='\n' || newline==='\r\n' ) { this.newline = newline ?? ''; }
		else {
			throw typeof newline==='string'
				? SyntaxError$1(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError$1(`TOML.stringify(,{newline}) can only be string`);
		}
		const around = name2code[options?.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		const indent = options?.indent;
		if ( indent===undefined ) { this.indent = '\t'; }
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError$1(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError$1(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError$1(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		this._ = options?.T===' ';
		this.nullDisabled = !options?.xNull;
		const xBeforeNewlineInMultilineTable = options?.xBeforeNewlineInMultilineTable;
		if ( xBeforeNewlineInMultilineTable==='' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = false;
		}
		else if ( xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = true;
		}
		else {
			this.multilineTableDisabled = true;
			this.multilineTableComma = true;
		}
		return this;
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

const stringify = (rootTable                , options                  )                    => {
	const document = new TOMLDocument(options);
	const section = document[0];
	section[0] = '';
	x      (section.assignBlock(``, ``, rootTable, getOwnPropertyNames(rootTable)));
	document.newlineUnderSectionButPair && section.length!==1 && section.appendNewline();
	document.newlineUnderSection || document[document.length - 1] .appendNewline();
	return document.newline ? document.join(document.newline) : document.flat();
};
const multiline = /*#__PURE__*/( () => {
	const multiline = (value                                                                                                                        ) =>
		typeof value==='string' ? multilineString(( '\n' + value ).split('\n')         ) :
			isArray$1(value) ? multilineString(Lines(value)) :
				multilineTable(value);
	multiline.basic = (lines                                                                                                 ) =>
		multilineBasicString(
			typeof lines==='string'
				? ( '\n' + lines ).split('\n')         
				: Lines(lines)
		);
	freeze(multiline);
	return multiline;
} )();

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
});

export { LocalDate, LocalDateTime, LocalTime, OffsetDateTime, Section, commentFor, _export as default, inline, isInline, isSection, literal, multiline, parse$1 as parse, stringify, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiaXRlcmF0b3IkMC50cyIsIi4uLy4uL2otb3JkZXJpZnkvc3JjL2V4cG9ydC50cyIsInR5cGVzL25vbi1hdG9tLnRzIiwidHlwZXMvVGFibGUudHMiLCJyZWdleHBzJDAudHMiLCJvcHRpb25zJDAudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvQXJyYXkudHMiLCJ0eXBlcy9EYXRldGltZS50cyIsInR5cGVzL1N0cmluZy50cyIsInR5cGVzL0ludGVnZXIudHMiLCJ0eXBlcy9GbG9hdC50cyIsInBhcnNlL29uLXRoZS1zcG90LnRzIiwidHlwZXMvY29tbWVudC50cyIsInBhcnNlL2xldmVsLWxvb3AudHMiLCJVVEY4LnRzIiwicGFyc2UvLnRzIiwic3RyaW5naWZ5L2xpdGVyYWwudHMiLCJzdHJpbmdpZnkvc3RyaW5nLnRzIiwic3RyaW5naWZ5L2Zsb2F0LnRzIiwic3RyaW5naWZ5L3NlY3Rpb24udHMiLCJzdHJpbmdpZnkvZG9jdW1lbnQudHMiLCJzdHJpbmdpZnkvLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzEuMjIuMCc7IiwiaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBleGVjIGZyb20gJy5SZWdFeHAucHJvdG90eXBlLmV4ZWMnO1xuXG5leHBvcnQgdmFyIFRlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZCh0ZXN0ICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiB0ZXN0LmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZXhwb3J0IHZhciBFeGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoZXhlYyAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gZXhlYy5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn07XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZT8nO1xuaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHk/JztcblxuaW1wb3J0IHsgVGVzdCwgRXhlYyB9IGZyb20gJy4vdGhlUmVnRXhwJztcblxudmFyIE5UID0gL1tcXG5cXHRdKy9nO1xudmFyIEVTQ0FQRSA9IC9cXFxcLi9nO1xuZnVuY3Rpb24gZ3JhdmVBY2NlbnRSZXBsYWNlciAoJCQgICAgICAgICkgeyByZXR1cm4gJCQ9PT0nXFxcXGAnID8gJ2AnIDogJCQ7IH1cblxudmFyIGluY2x1ZGVzID0gJycuaW5jbHVkZXMgICAgICAgXG5cdD8gZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKTsgfVxuXHQ6IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKT4tMTsgfTtcblxuZnVuY3Rpb24gUkUgKCAgICAgICAgICAgICAgIHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgVSA9IHRoaXMuVTtcblx0dmFyIEkgPSB0aGlzLkk7XG5cdHZhciBNID0gdGhpcy5NO1xuXHR2YXIgUyA9IHRoaXMuUztcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXSAucmVwbGFjZShOVCwgJycpO1xuXHR2YXIgaW5kZXggPSAxO1xuXHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHR2YXIgdmFsdWUgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICkgeyBzb3VyY2UgKz0gdmFsdWU7IH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciB2YWx1ZV9zb3VyY2UgPSB2YWx1ZS5zb3VyY2U7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZV9zb3VyY2UhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdzb3VyY2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS51bmljb2RlPT09VSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3VuaWNvZGUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5pZ25vcmVDYXNlPT09SSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2lnbm9yZUNhc2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5tdWx0aWxpbmU9PT1NICYmICggaW5jbHVkZXModmFsdWVfc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJyQnKSApICkgeyB0aHJvdyBTeW50YXhFcnJvcignbXVsdGlsaW5lJyk7IH1cblx0XHRcdGlmICggdmFsdWUuZG90QWxsPT09UyAmJiBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICcuJykgKSB7IHRocm93IFN5bnRheEVycm9yKCdkb3RBbGwnKTsgfVxuXHRcdFx0c291cmNlICs9IHZhbHVlX3NvdXJjZTtcblx0XHR9XG5cdFx0c291cmNlICs9IHJhd1tpbmRleCsrXSAucmVwbGFjZShOVCwgJycpO1xuXHR9XG5cdHZhciByZSAgICAgICAgID0gUmVnRXhwKFUgPyBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShFU0NBUEUsIGdyYXZlQWNjZW50UmVwbGFjZXIpIDogc291cmNlLCB0aGlzLmZsYWdzKTtcblx0dmFyIHRlc3QgPSByZS50ZXN0ID0gVGVzdChyZSk7XG5cdHZhciBleGVjID0gcmUuZXhlYyA9IEV4ZWMocmUpO1xuXHR0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSAhVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gIUk7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBpbmNsdWRlcyhzb3VyY2UsICdeJykgfHwgaW5jbHVkZXMoc291cmNlLCAnJCcpID8gIU0gOiBudWxsO1xuXHR0ZXN0LmRvdEFsbCA9IGV4ZWMuZG90QWxsID0gaW5jbHVkZXMoc291cmNlLCAnLicpID8gIVMgOiBudWxsO1xuXHRyZXR1cm4gcmU7XG59XG5cbnZhciBSRV9iaW5kID0gYmluZCAmJiAvKiNfX1BVUkVfXyovYmluZC5iaW5kKFJFICAgICAgICk7XG5cbmZ1bmN0aW9uIENvbnRleHQgKGZsYWdzICAgICAgICApICAgICAgICAgIHtcblx0cmV0dXJuIHtcblx0XHRVOiAhaW5jbHVkZXMoZmxhZ3MsICd1JyksXG5cdFx0STogIWluY2x1ZGVzKGZsYWdzLCAnaScpLFxuXHRcdE06ICFpbmNsdWRlcyhmbGFncywgJ20nKSxcblx0XHRTOiAhaW5jbHVkZXMoZmxhZ3MsICdzJyksXG5cdFx0ZmxhZ3M6IGZsYWdzXG5cdH07XG59XG5cbnZhciBDT05URVhUICAgICAgICAgID0gLyojX19QVVJFX18qL0NvbnRleHQoJycpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm94eVxuXHQ/IC8qI19fUFVSRV9fKi9uZXcgUHJveHkoUkUsIHtcblx0XHRhcHBseTogZnVuY3Rpb24gKFJFLCB0aGlzQXJnLCBhcmdzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KFJFLCBDT05URVhULCBhcmdzKTsgfVxuXHRcdCxcblx0XHRnZXQ6IGZ1bmN0aW9uIChSRSwgZmxhZ3MgICAgICAgICkgeyByZXR1cm4gUkVfYmluZChDb250ZXh0KGZsYWdzKSk7IH1cblx0XHQsXG5cdFx0ZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0LFxuXHRcdHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9KVxuXHQ6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0UkUuYXBwbHkgPSBSRS5hcHBseTtcblx0XHR2YXIgbmV3UmVnRXhwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoQ09OVEVYVCwgYXJndW1lbnRzICAgICAgICk7IH0gICAgICAgO1xuXHRcdHZhciBkID0gMTtcblx0XHR2YXIgZyA9IGQqMjtcblx0XHR2YXIgaSA9IGcqMjtcblx0XHR2YXIgbSA9IGkqMjtcblx0XHR2YXIgcyA9IGkqMjtcblx0XHR2YXIgdSA9IHMqMjtcblx0XHR2YXIgeSA9IHUqMjtcblx0XHR2YXIgZmxhZ3MgPSB5KjIgLSAxO1xuXHRcdHdoaWxlICggZmxhZ3MtLSApIHtcblx0XHRcdCggZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdFx0bmV3UmVnRXhwW2NvbnRleHQuZmxhZ3NdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzICAgICAgICk7IH07XG5cdFx0XHR9ICkoQ29udGV4dChcblx0XHRcdFx0KCBmbGFncyAmIGQgPyAnJyA6ICdkJyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIGcgPyAnJyA6ICdnJyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIGkgPyAnJyA6ICdpJyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIG0gPyAnJyA6ICdtJyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIHMgPyAnJyA6ICdzJyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIHUgPyAnJyA6ICd1JyApXG5cdFx0XHRcdCtcblx0XHRcdFx0KCBmbGFncyAmIHkgPyAnJyA6ICd5JyApXG5cdFx0XHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZyZWV6ZSA/IGZyZWV6ZShuZXdSZWdFeHApIDogbmV3UmVnRXhwO1xuXHR9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRSRUdFWFAudGVzdCA9IFJFR0VYUC50ZXN0O1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbi8vaW1wb3J0ICogYXMgb3B0aW9uc1xcJDAgZnJvbSAnLi9vcHRpb25zXFwkMCc7XG5cbmNvbnN0IE5PTkUgICAgICAgICAgICAgICAgICAgID0gW107XG5sZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5sZXQgc291cmNlTGluZXMgICAgICAgICAgICAgICAgICAgID0gTk9ORTtcbmxldCBsYXN0TGluZUluZGV4ICAgICAgICAgPSAtMTtcbmV4cG9ydCBsZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuZXhwb3J0IGNvbnN0IHRocm93cyA9IChlcnJvciAgICAgICApICAgICAgICA9PiB7XG5cdC8vaWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IGRvbmUoKTsgb3B0aW9uc1xcJDAuY2xlYXIoKTsgfVxuXHR0aHJvdyBlcnJvcjtcbn07XG5cbmNvbnN0IEVPTCA9IC9cXHI/XFxuLztcbmV4cG9ydCBjb25zdCB0b2RvID0gKHNvdXJjZSAgICAgICAgLCBwYXRoICAgICAgICApICAgICAgID0+IHtcblx0aWYgKCB0eXBlb2YgcGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHNvdXJjZVBhdGgpJyk7IH1cblx0c291cmNlUGF0aCA9IHBhdGg7XG5cdHNvdXJjZUxpbmVzID0gc291cmNlLnNwbGl0KEVPTCk7XG5cdGxhc3RMaW5lSW5kZXggPSBzb3VyY2VMaW5lcy5sZW5ndGggLSAxO1xuXHRsaW5lSW5kZXggPSAtMTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXh0ID0gKCkgICAgICAgICA9PiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xuXG5leHBvcnQgY29uc3QgcmVzdCA9ICgpICAgICAgICAgID0+IGxpbmVJbmRleCE9PWxhc3RMaW5lSW5kZXg7XG5cbmV4cG9ydCBjbGFzcyBtYXJrIHtcblx0ICAgICAgICAgICAgICAgICBsaW5lSW5kZXggPSBsaW5lSW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdCAgICAgICAgICAgICAgICAgcmVzdENvbHVtbiAgICAgICAgO1xuXHRjb25zdHJ1Y3RvciAodHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHJlc3RDb2x1bW4gICAgICAgICkge1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0dGhpcy5yZXN0Q29sdW1uID0gcmVzdENvbHVtbjtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRtdXN0ICggICAgICAgICAgKSAgICAgICAgIHtcblx0XHRsaW5lSW5kZXg9PT1sYXN0TGluZUluZGV4ICYmIHRocm93cyhTeW50YXhFcnJvcihgJHt0aGlzLnR5cGV9IGlzIG5vdCBjbG9zZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBmaWxlYCArIHdoZXJlKCcsIHdoaWNoIHN0YXJ0ZWQgZnJvbSAnLCB0aGlzLmxpbmVJbmRleCwgc291cmNlTGluZXNbdGhpcy5saW5lSW5kZXhdIC5sZW5ndGggLSB0aGlzLnJlc3RDb2x1bW4gKyAxKSkpO1xuXHRcdHJldHVybiBzb3VyY2VMaW5lc1srK2xpbmVJbmRleF0gO1xuXHR9XG5cdG5vd3JhcCAoICAgICAgICAgICkgICAgICAgIHtcblx0XHR0aHJvd3MoRXJyb3IoYFRPTUwucGFyc2UoLCxtdWx0aWxpbmVTdHJpbmdKb2luZXIpIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCByb3dJbmRleCAgICAgICAgID0gbGluZUluZGV4LCBjb2x1bW5OdW1iZXIgICAgICAgICA9IDApICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7cm93SW5kZXggKyAxfToke2NvbHVtbk51bWJlcn0pYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtyb3dJbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW3Jvd0luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHknO1xuaW1wb3J0IE9iamVjdF9hc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IE9iamVjdF9jcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IE9iamVjdF9pcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgT2JqZWN0X2RlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBPYmplY3RfZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgT2JqZWN0X2ZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IFJlZmxlY3RfY29uc3RydWN0IGZyb20gJy5SZWZsZWN0LmNvbnN0cnVjdCc7XG5pbXBvcnQgUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9vd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBLZWVwZXIgPSAgICAgKCkgICAgICA9PiBbXTtcblxuY29uc3QgaGFzT3duUHJvcGVydHlfY2FsbCA9IC8qI19fUFVSRV9fKi9oYXNPd25Qcm9wZXJ0eS5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duUHJvcGVydHlfY2FsbCh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSk7XG5cdFx0fVxuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGtlZXBlcltrZWVwZXIubGVuZ3RoXSA9IGtleTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGRlbGV0ZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGNvbnN0IGluZGV4ID0ga2VlcGVyLmluZGV4T2Yoa2V5KTtcblx0XHRcdGluZGV4PDAgfHwgLS1rZWVwZXIuY29weVdpdGhpbihpbmRleCwgaW5kZXggKyAxKS5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzOiAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICkgPT4gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdGNvbnN0cnVjdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAsIGFyZ3MgICAsIG5ld1RhcmdldCAgICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2NvbnN0cnVjdCh0YXJnZXQsIGFyZ3MsIG5ld1RhcmdldCkpLFxuXHRhcHBseTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpc0FyZyAgICwgYXJncyAgICkgICAgPT4gb3JkZXJpZnkoUmVmbGVjdF9hcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpKSxcbn0pO1xuXG5jb25zdCBuZXdQcm94eSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAsIGtlZXBlciAgICAgICAgICAgKSAgICA9PiB7XG5cdHRhcmdldDJrZWVwZXIuc2V0KHRhcmdldCwga2VlcGVyKTtcblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkgICAodGFyZ2V0LCBoYW5kbGVycyk7XG5cdHByb3h5MnRhcmdldC5zZXQocHJveHksIHRhcmdldCk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc09yZGVyZWQgPSAob2JqZWN0ICAgICAgICApICAgICAgICAgID0+IHByb3h5MnRhcmdldC5oYXMob2JqZWN0KTtcbmV4cG9ydCBjb25zdCBpcyA9IChvYmplY3QxICAgICAgICAsIG9iamVjdDIgICAgICAgICkgICAgICAgICAgPT4gT2JqZWN0X2lzKFxuXHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDEpIHx8IG9iamVjdDEsXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MikgfHwgb2JqZWN0Mixcbik7XG5cbmV4cG9ydCBjb25zdCBvcmRlcmlmeSA9ICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICA9PiB7XG5cdGlmICggcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpICkgeyByZXR1cm4gb2JqZWN0OyB9XG5cdGxldCBwcm94eSA9IHRhcmdldDJwcm94eS5nZXQob2JqZWN0KSAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHByb3h5ICkgeyByZXR1cm4gcHJveHk7IH1cblx0cHJveHkgPSBuZXdQcm94eShvYmplY3QsIE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSkpO1xuXHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkpO1xuXHRyZXR1cm4gcHJveHk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgeyBjcmVhdGUgfSA9IHtcblx0Y3JlYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm90byAgICAgICAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGlmICggZGVzY3JpcHRvck1hcHMubGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvck1hcCAgICAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8pICAgICAgICwga2VlcGVyICAgICAgICk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBkZWZpbmVQcm9wZXJ0aWVzIH0gPSB7XG5cdGRlZmluZVByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3QgICAsIGRlc2NyaXB0b3JNYXAgICAgLCAuLi5kZXNjcmlwdG9yTWFwcyAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3Qga2VlcGVyID0gS2VlcGVyICAgICAgICAgICAoKTtcblx0XHRkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2Fzc2lnbihuZXdQcm94eShPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgLCBrZWVwZXIpLCBkZXNjcmlwdG9yTWFwLCAuLi5kZXNjcmlwdG9yTWFwcyk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3RfZGVmaW5lUHJvcGVydGllcyhvcmRlcmlmeShvYmplY3QpLCBkZXNjcmlwdG9yTWFwKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCBrZWVwZXIgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICAgICAgICAoKSwgUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KSApO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShkZXNjcmlwdG9yTWFwLCBrZWVwZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IE51bGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiB0aHJvd0NvbnN0cnVjdGluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aCAnbmV3J2ApOyB9XG5cdGZ1bmN0aW9uIHRocm93QXBwbHlpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydgKTsgfVxuXHRjb25zdCBOdWxsaWZ5ID0gKGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0XHRkZWxldGUgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXHRcdE9iamVjdF9mcmVlemUoY29uc3RydWN0b3IucHJvdG90eXBlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdH07XG5cdGZ1bmN0aW9uIE51bGwgKCAgICAgICAgICAgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0PyBuZXcudGFyZ2V0PT09TnVsbFxuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi90aHJvd0NvbnN0cnVjdGluZygpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL25ld1Byb3h5KHRoaXMsIEtlZXBlciAgICAgKCkpXG5cdFx0XHQ6IHR5cGVvZiBjb25zdHJ1Y3Rvcj09PSdmdW5jdGlvbidcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovTnVsbGlmeShjb25zdHJ1Y3Rvcilcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovdGhyb3dBcHBseWluZygpO1xuXHR9XG5cdC8vQHRzLWlnbm9yZVxuXHROdWxsLnByb3RvdHlwZSA9IG51bGw7XG5cdE9iamVjdF9kZWZpbmVQcm9wZXJ0eShOdWxsLCAnbmFtZScsIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgeyB2YWx1ZTogJycsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSkpO1xuXHQvL2RlbGV0ZSBOdWxsLmxlbmd0aDtcblx0T2JqZWN0X2ZyZWV6ZShOdWxsKTtcblx0cmV0dXJuIE51bGw7XG59KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBERUZBVUxUID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oY2xhc3MgZXh0ZW5kcyBudWxsIHsgd3JpdGFibGUgKCkge30gZW51bWVyYWJsZSAoKSB7fSBjb25maWd1cmFibGUgKCkge30gfS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwge1xuXHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHR3cml0YWJsZTogdHJ1ZSxcblx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxufSk7XG5leHBvcnQgY29uc3QgZnJvbUVudHJpZXMgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVudHJpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfZnJvbUVudHJpZXMoZW50cmllcyk7XG5cdGNvbnN0IGtlZXBlciAgICAgICAgICAgID0gT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAoKSwgUmVmbGVjdF9vd25LZXlzKHRhcmdldCkpO1xuXHRpZiAoIHByb3RvPT09dW5kZWZpbmVkICkgeyByZXR1cm4gbmV3UHJveHkodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0aWYgKCBwcm90bz09PW51bGwgKSB7IHJldHVybiBuZXdQcm94eShPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUocHJvdG8pLCB0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0bGV0IGluZGV4ID0gMDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdCggZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2NyZWF0ZShERUZBVUxUKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlID0gdGFyZ2V0W2tleV07XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXApICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7XG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE51bGwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IHNldF9oYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgc2V0X2FkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBzZXRfZGVsIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5kZWxldGUnO1xuaW1wb3J0IG1hcF9oYXMgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgbWFwX2dldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBtYXBfc2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5zZXQnO1xuaW1wb3J0IG1hcF9kZWwgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCk7XG5jb25zdCBTRUNUSU9OUyA9IG5ldyBXZWFrU2V0ICAgICAgICAgICAgICAgICgpO1xuXG5jb25zdCBkZUlubGluZSA9IC8qI19fUFVSRV9fKi9tYXBfZGVsLmJpbmQoSU5MSU5FUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IGRlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfZGVsLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBpc0lubGluZSA9IC8qI19fUFVSRV9fKi9tYXBfaGFzLmJpbmQoSU5MSU5FUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBvZklubGluZSA9IC8qI19fUFVSRV9fKi9tYXBfZ2V0LmJpbmQoSU5MSU5FUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgaW5saW5lID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIHRydWUpO1xuXHRpc0FycmF5KHZhbHVlKSB8fCBkZVNlY3Rpb24odmFsdWUpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZVRhYmxlID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGJlSW5saW5lKHZhbHVlLCBmYWxzZSk7XG5cdGRlU2VjdGlvbih2YWx1ZSk7XG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NlY3Rpb24gPSAvKiNfX1BVUkVfXyovc2V0X2hhcy5iaW5kKFNFQ1RJT05TKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBiZVNlY3Rpb24gPSAvKiNfX1BVUkVfXyovc2V0X2FkZC5iaW5kKFNFQ1RJT05TKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgU2VjdGlvbiA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YWJsZSAgICkgICAgPT4ge1xuXHRpZiAoIGlzQXJyYXkodGFibGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYGFycmF5IGNhbiBub3QgYmUgc2VjdGlvbiwgbWF5YmUgeW91IHdhbnQgdG8gdXNlIGl0IG9uIHRoZSB0YWJsZXMgaW4gaXRgKTsgfVxuXHRiZVNlY3Rpb24odGFibGUpO1xuXHRkZUlubGluZSh0YWJsZSk7XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBkZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IE51bGwgYXMgb3JkZXJpZnlfTnVsbCB9IGZyb20gJ0BsdGQvai1vcmRlcmlmeSc7XG5cbmltcG9ydCB7IGJlSW5saW5lLCBiZVNlY3Rpb24gfSBmcm9tICcuL25vbi1hdG9tJztcblxuZXhwb3J0IHsgaXNJbmxpbmUgfSBmcm9tICcuL25vbi1hdG9tJztcbmV4cG9ydCBjb25zdCBJTkxJTkUgPSB0cnVlO1xuXG5jb25zdCB0YWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQodGFibGVzKTtcbmV4cG9ydCBjb25zdCBpc1RhYmxlID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHRhYmxlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5jb25zdCBpbXBsaWNpdFRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGltcGxpY2l0VGFibGVzKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2RlbCA9IC8qI19fUFVSRV9fKi9kZWwuYmluZChpbXBsaWNpdFRhYmxlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBkaXJlY3RseUlmTm90ID0gKHRhYmxlICAgICAgICkgICAgICAgICAgPT4ge1xuXHRpZiAoIGltcGxpY2l0VGFibGVzX2RlbCh0YWJsZSkgKSB7XG5cdFx0YmVTZWN0aW9uKHRhYmxlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuZXhwb3J0IGNvbnN0IERJUkVDVExZID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBJTVBMSUNJVExZID0gZmFsc2U7XG5cbmNvbnN0IHBhaXJzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBwYWlyc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQocGFpcnMpO1xuZXhwb3J0IGNvbnN0IGZyb21QYWlyID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHBhaXJzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IFBBSVIgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgUGxhaW5UYWJsZSA9IC8qI19fUFVSRV9fKi9OdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgTnVsbCAgICAgIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUkZnJvbVBhaXIgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lJGZyb21QYWlyID8gYmVJbmxpbmUodGhpcywgdHJ1ZSkgOiBiZVNlY3Rpb24odGhpcylcblx0XHRcdDogKCBpc0lubGluZSRmcm9tUGFpciA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IE9yZGVyZWRUYWJsZSA9IC8qI19fUFVSRV9fKi9OdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgb3JkZXJpZnlfTnVsbCAgICAgIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUkZnJvbVBhaXIgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lJGZyb21QYWlyID8gYmVJbmxpbmUodGhpcywgdHJ1ZSkgOiBiZVNlY3Rpb24odGhpcylcblx0XHRcdDogKCBpc0lubGluZSRmcm9tUGFpciA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuL2l0ZXJhdG9yJDAnO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XiR7V2hpdGVzcGFjZX0rYCApKCk7XG5cbmV4cG9ydCBjb25zdCBWQUxVRV9SRVNUX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuZXhwb3J0IGNvbnN0IExJVEVSQUxfU1RSSU5HX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuXG5jb25zdCBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcbmNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5leHBvcnRcbmxldCBfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblxuZXhwb3J0IGNvbnN0IFNZTV9XSElURVNQQUNFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnNgXG5cdF5cblx0LlxuXHQke1doaXRlc3BhY2V9KmAgKSgpO1xuXG5cbmV4cG9ydCBjb25zdCBUYWcgPSAvW15cXHgwMC1cXHgxRlwiIycoKTw+W1xcXFxcXF1ge31cXHg3Rl0rLztcblxuY29uc3QgS0VZX1ZBTFVFX1BBSVJfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgYFxuXHReXG5cdCR7V2hpdGVzcGFjZX0qXG5cdD1cblx0JHtXaGl0ZXNwYWNlfSpcblx0KD86XG5cdFx0PCgke1RhZ30pPlxuXHRcdCR7V2hpdGVzcGFjZX0qXG5cdCk/XG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbmV4cG9ydCBjb25zdCBfVkFMVUVfUEFJUl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgVEFHX1JFU1RfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbi8qIG9wdGltaXplZCAoYXZvaWQgb3ZlcmZsb3cgb3IgbG9zdCkgKi9cblxuY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkcgPSAvKiNfX1BVUkVfXyovdGhlUmVnRXhwKC8oPzpbXlxcXFxcIl0rfFxcXFwufFwiXCI/KD8hXCIpKXsxLDEwfS9zeSk7Ly8vIC4/XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wID0gKF8gICAgICAgICkgICAgICAgICA9PiB7XG5cdGxldCBsYXN0SW5kZXggICAgICAgICA9IE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9IDA7XG5cdHdoaWxlICggTVVMVElfTElORV9CQVNJQ19TVFJJTkcudGVzdChfKSApIHsgbGFzdEluZGV4ID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkcubGFzdEluZGV4OyB9XG5cdHJldHVybiBfLnNsaWNlKDAsIGxhc3RJbmRleCk7XG59O1xuXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fID0gL1teXFxcXFxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfCAqXFxuW1xcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18XFxuW1xcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFxcbltcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5leHBvcnQgY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QgPSAoXyAgICAgICAgKSAgICAgICAgICA9PiAhXy5yZXBsYWNlKF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSLCAnJyk7Ly8vXG5cbmNvbnN0IEJBU0lDX1NUUklOR19UQUJfX19fX18gPSAvKiNfX1BVUkVfXyovdGhlUmVnRXhwKC8oPzpbXlxcXFxcIlxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pKXsxLDEwfS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvKiNfX1BVUkVfXyovdGhlUmVnRXhwKC8oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pKXsxLDEwfS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfX19fX18gPSAvKiNfX1BVUkVfXyovdGhlUmVnRXhwKC8oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KSl7MSwxMH0veSk7XG5jb25zdCBCQVNJQ19TVFJJTkdfREVMX1NMQVNIID0gLyojX19QVVJFX18qL3RoZVJlZ0V4cCgvKD86W15cXFxcXCJcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pKXsxLDEwfS95KTtcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMSA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4gbGluZS5zbGljZSgxLCBsYXN0SW5kZXgpO1xufTtcblxuZXhwb3J0XG5jb25zdCBJU19ET1RfS0VZID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pLnRlc3QgKSgpO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCBCQVJFX0tFWV9TVFJJQ1QgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXFx3LV0rLykuZXhlYyApKCk7XG5jb25zdCBCQVJFX0tFWV9GUkVFID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eW14gXFx0Iz1bXFxdJ1wiLl0rKD86WyBcXHRdK1teIFxcdCM9W1xcXSdcIi5dKykqLykuZXhlYyApKCk7XG5leHBvcnRcbmxldCBfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9GUkVFO1xuY29uc3QgTElURVJBTF9LRVlfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pLmV4ZWMgKSgpO1xuY29uc3QgTElURVJBTF9LRVlfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZdKicvKS5leGVjICkoKTtcbmV4cG9ydFxubGV0IF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX0RFTDtcbmxldCBzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBUQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzID0gKGxpbmVSZXN0ICAgICAgICAsIHBhcnNlS2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBhc0FycmF5SXRlbSAgICAgICAgICA9IGxpbmVSZXN0WzFdPT09J1snO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdHN1cHBvcnRBcnJheU9mVGFibGVzIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBBcnJheSBvZiBUYWJsZXMgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuMmAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGFibGUgaGVhZGVyIGlzIG5vdCBjbG9zZWRgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHQoIGxpbmVSZXN0Lmxlbmd0aD4xID8gbGluZVJlc3RbMV09PT0nXSc9PT1hc0FycmF5SXRlbSA6ICFhc0FycmF5SXRlbSApIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGFzQXJyYXlJdGVtID8gMiA6IDEpLnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0bGV0IHRhZyAgICAgICAgO1xuXHRpZiAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdPT09JzwnICkgeyAoIHsgMTogdGFnLCAyOiBsaW5lUmVzdCB9ID0gVEFHX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgS2V5cyBtdXN0IGVxdWFsIHNvbWV0aGluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIGJ1dCBtaXNzaW5nIGF0ICcpKSk7XG5cdHRhZyB8fCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSE9PScjJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZywgbGluZVJlc3QgfTtcbn07XG5cbmNvbnN0IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0vKS50ZXN0ICkoKTtcbmNvbnN0IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLykudGVzdCApKCk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdGJbMDFdW18wMV0qXG5cdFx0fFxuXHRcdFx0b1swLTddW18wLTddKlxuXHRcdHxcblx0XHRcdHhbXFxkQS1GYS1mXVtfXFxkQS1GYS1mXSpcblx0XHR8XG5cdFx0XHQoPzpcXC5cXGRbX1xcZF0qKT8oPzpbRWVdLT9cXGRbX1xcZF0qKT9cblx0XHQpXG5cdHxcblx0XHRbMS05XVtfXFxkXSpcblx0XHQoPzpcXC5cXGRbX1xcZF0qKT8oPzpbRWVdLT9cXGRbX1xcZF0qKT9cblx0fFxuXHRcdGluZlxuXHR8XG5cdFx0bmFuXG5cdClcbmAgKSgpO1xuY29uc3QgSVNfQU1BWklORyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC50ZXN0ICkoKTtcbmNvbnN0IEJBRF9EWE9CID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnRlc3QgKSgpO1xuZXhwb3J0IGNvbnN0IGlzQW1hemluZyA9IChrZXlzICAgICAgICApICAgICAgICAgID0+IElTX0FNQVpJTkcoa2V5cykgJiYgIUJBRF9EWE9CKGtleXMpO1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBnZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmdldCc7XG5pbXBvcnQgc2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5zZXQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi9yZWdleHBzJDAnO1xuXG4vKiBvcHRpb25zICovXG5cbmV4cG9ydCBsZXQgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAgICAgICAgICAgICAgICA9IG51bGw7XG5leHBvcnQgbGV0IHVzaW5nQmlnSW50ICAgICAgICAgICAgICAgICA9IHRydWU7XG5leHBvcnQgbGV0IEludGVnZXJNaW4gICAgICAgICA9IDBuO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWF4ICAgICAgICAgPSAwbjtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuICBcbmV4cG9ydCBsZXQgZW5kc1dpdGhRdW90ZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0xvbmdlciAgICAgICAgIDtcbmV4cG9ydCBsZXQgZW5hYmxlTnVsbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSAgICAgICAgIDtcbmV4cG9ydCBsZXQgcHJlc2VydmVDb21tZW50ICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhYmxlRGlnaXQgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvciQwLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvciQwLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyB0aHJvdyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IFByb2Nlc3MgPSAoKSAgICAgICAgICA9PiB7XG5cdGlmICggY29sbGVjdGlvbl9sZW5ndGggKSB7XG5cdFx0bGV0IGluZGV4ID0gY29sbGVjdGlvbl9sZW5ndGg7XG5cdFx0Y29uc3QgcHJvY2VzcyA9IHByb2Nlc3NvciA7XG5cdFx0Y29uc3QgcXVldWUgPSBjb2xsZWN0aW9uO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHRyZXR1cm4gKCkgICAgICAgPT4ge1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRwcm9jZXNzKHF1ZXVlWy0taW5kZXhdICk7XG5cdFx0XHRcdHF1ZXVlLmxlbmd0aCA9IGluZGV4O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKiB1c2UgJiBjbGVhciAqL1xuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSAgICAgICA9PiB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGggPSAwO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcblx0dXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlID0gKHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgKSAgICAgICA9PiB7XG5cdFxuXHRsZXQgbWl4ZWQgICAgICAgICA7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdGRpc2FsbG93RW1wdHlLZXkgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4zOlxuXHRcdFx0ZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjI6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMTpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCxzcGVjaWZpY2F0aW9uVmVyc2lvbiknKTtcblx0fVxuXHRyZWdleHBzJDAuc3dpdGNoUmVnRXhwKHNwZWNpZmljYXRpb25WZXJzaW9uKTtcblx0XG5cdGlmICggdHlwZW9mIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PSdzdHJpbmcnICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyOyB9XG5cdGVsc2UgaWYgKCBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT11bmRlZmluZWQgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBudWxsOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCxtdWx0aWxpbmVTdHJpbmdKb2luZXIpJyk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKHVzZUJpZ0ludCkgKSB7IHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0dXNpbmdCaWdJbnQgPSBudWxsO1xuXHRcdGlmICggdXNlQmlnSW50Pj0wICkgeyBJbnRlZ2VyTWluID0gLSggSW50ZWdlck1heCA9IEJpZ0ludCh1c2VCaWdJbnQpICk7IH1cblx0XHRlbHNlIHsgSW50ZWdlck1heCA9IC0oIEludGVnZXJNaW4gPSBCaWdJbnQodXNlQmlnSW50KSApIC0gMW47IH1cblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCB8fCB4T3B0aW9ucz09PWZhbHNlICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gZmFsc2U7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB4T3B0aW9ucz09PXRydWUgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHRydWU7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgeE9wdGlvbnM9PT0nZnVuY3Rpb24nICkge1xuXHRcdFRhYmxlID0gT3JkZXJlZFRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gc0Vycm9yID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSB0cnVlO1xuXHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHRhZykgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRwcm9jZXNzb3IgPSB4T3B0aW9ucztcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0fVxuXHRlbHNlIHtcblx0XHRjb25zdCB7IG9yZGVyLCBsb25nZXIsIGV4YWN0LCBudWxsOiBfbnVsbCwgbXVsdGksIGNvbW1lbnQsIHN0cmluZywgdGFnLCAuLi51bmtub3duIH0gPSB4T3B0aW9ucztcblx0XHRpZiAoIG93bktleXModW5rbm93bikubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKScpOyB9XG5cdFx0VGFibGUgPSBvcmRlciA/IE9yZGVyZWRUYWJsZSA6IFBsYWluVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSAhIWxvbmdlcjtcblx0XHRzRXJyb3IgPSAhIWV4YWN0O1xuXHRcdGVuYWJsZU51bGwgPSAhIV9udWxsO1xuXHRcdGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSAhIW11bHRpO1xuXHRcdHByZXNlcnZlQ29tbWVudCA9ICEhY29tbWVudDtcblx0XHRkaXNhYmxlRGlnaXQgPSAhIXN0cmluZztcblx0XHRpZiAoIHRhZyApIHtcblx0XHRcdGlmICggdHlwZW9mIHRhZyE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMudGFnKScpOyB9XG5cdFx0XHRpZiAoICFtaXhlZCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucykgeE9wdGlvbnMudGFnIG5lZWRzIGF0IGxlYXN0IFRPTUwgMS4wIHRvIHN1cHBvcnQgbWl4ZWQgdHlwZSBhcnJheScpOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRtaXhlZFxuXHRcdD8gYXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gYXNNaXhlZFxuXHRcdDogKCB7IGFzTnVsbHMsIGFzU3RyaW5ncywgYXNUYWJsZXMsIGFzQXJyYXlzLCBhc0Jvb2xlYW5zLCBhc0Zsb2F0cywgYXNJbnRlZ2VycywgYXNPZmZzZXREYXRlVGltZXMsIGFzTG9jYWxEYXRlVGltZXMsIGFzTG9jYWxEYXRlcywgYXNMb2NhbFRpbWVzIH0gPSBBU19UWVBFRCApO1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiY29uc3QgcHJldmlvdXMgPSBTeW1ib2woJ3ByZXZpb3VzJyk7XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcbiAgXG5cbmV4cG9ydCBjb25zdCB4ID0gICAgIChyb290U3RhY2sgICAgICApICAgID0+IHtcblx0bGV0IHN0YWNrICAgICAgICA9IHJvb3RTdGFjaztcblx0bGV0IHJlc3VsdCA9IHN0YWNrLm5leHQoKTtcblx0aWYgKCAhcmVzdWx0LmRvbmUgKSB7XG5cdFx0cmVzdWx0LnZhbHVlW3ByZXZpb3VzXSA9IHN0YWNrO1xuXHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0aWYgKCByZXN1bHQuZG9uZSApIHtcblx0XHRcdFx0aWYgKCBzdGFjaz09PXJvb3RTdGFjayApIHsgYnJlYWs7IH1cblx0XHRcdFx0c3RhY2sgPSBzdGFja1twcmV2aW91c10gO1xuXHRcdFx0XHRyZXN1bHQgPSBzdGFjay5uZXh0KHJlc3VsdC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnZhbHVlW3ByZXZpb3VzXSA9IHN0YWNrO1xuXHRcdFx0XHRyZXN1bHQgPSAoIHN0YWNrID0gcmVzdWx0LnZhbHVlICkubmV4dCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0LnZhbHVlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICBcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuXG5jb25zdCBhcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoYXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gLyojX19QVVJFX18qL2hhcy5iaW5kKGFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgT0ZfVEFCTEVTID0gZmFsc2U7XG5leHBvcnQgY29uc3QgU1RBVElDQUxMWSA9IHRydWU7XG5jb25zdCBzdGF0aWNhbEFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3Qgc3RhdGljYWxBcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHN0YXRpY2FsQXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc1N0YXRpYyA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChzdGF0aWNhbEFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG5ld0FycmF5ID0gKGlzU3RhdGljICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCBhcnJheSAgICAgICAgPSBbXTtcblx0YXJyYXlzX2FkZChhcnJheSk7XG5cdGlzU3RhdGljICYmIHN0YXRpY2FsQXJyYXlzX2FkZChhcnJheSk7XG5cdHJldHVybiBhcnJheTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcbiBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IE5hdGl2ZURhdGUgZnJvbSAnLkRhdGUnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy5EYXRlLnBhcnNlJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuLy8vaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcubnVsbC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuXG5jb25zdCBmcGMgPSAgICAgICAgICAgICAgICAgICAgICAoYyAgICkgICAgPT4ge1xuXHRmcmVlemUoZnJlZXplKGMpLnByb3RvdHlwZSk7XG5cdHJldHVybiBjO1xufTtcblxuY29uc3QgXzI5XyA9IC8oPzowWzEtOV18MVxcZHwyXFxkKS87XG5jb25zdCBfMzBfID0gLyg/OjBbMS05XXxbMTJdXFxkfDMwKS87XG5jb25zdCBfMzFfID0gLyg/OjBbMS05XXxbMTJdXFxkfDNbMDFdKS87XG5jb25zdCBfMjNfID0gLyg/OlswMV1cXGR8MlswLTNdKS87XG5jb25zdCBfNTlfID0gL1swLTVdXFxkLztcblxuY29uc3QgWU1EID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KVxuYCApKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cbmAgKSgpO1xuXG5leHBvcnQgY29uc3QgT0ZGU0VUJCA9IC8oPzpafFsrLV1cXGRcXGQ6XFxkXFxkKSQvO1xuXG5jb25zdCBaX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAgICAgICAgICAgICgvKChbKy1dKVxcZFxcZCk6KFxcZFxcZCkkLykuZXhlYyApKCk7XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRV9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGR7MSwzfShcXGQqPykwKik/XG5cdCg/Olp8WystXSR7XzIzX306JHtfNTlffSlcblx0JGAuZXhlYyApKCk7XG5cbmNvbnN0IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9XG5cdCgpXG5cdFpcblx0JGAuZXhlYyApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX0RBVEVUSU1FID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX0RBVEUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9USU1FID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IERPVF9aRVJPID0gL1xcLj8wKyQvO1xuY29uc3QgREVMSU1JVEVSX0RPVCA9IC9bLVQ6Ll0vZztcbmNvbnN0IFpFUk8gPSAvKD88PVxcLlxcZCopMCskLztcblxuY29uc3QgRGF0ZXRpbWUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IERhdGV0aW1lID0gZnVuY3Rpb24gKCAgICAgICAgICAgICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOy8vZXhwcmVzc2lvbj8gOnVuZGVmaW5lZCwgbGl0ZXJhbD8gOnVuZGVmaW5lZCwgZG90VmFsdWU/IDp1bmRlZmluZWRcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnNldFRpbWUoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuZ2V0VGltZSgpIDogRGF0ZS5wYXJzZSgnVCcpXG5cdC8vIFtTeW1ib2wudG9QcmltaXRpdmVdKCdudW1iZXInKSA+IC52YWx1ZU9mKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnRvSVNPU3RyaW5nKClcblx0Y29uc3QgZGVzY3JpcHRvcnMgPSBOdWxsKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdHtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gTnVsbChudWxsKTtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Ygb3duS2V5cyhOYXRpdmVEYXRlLnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApIHtcblx0XHRcdGtleT09PSdjb25zdHJ1Y3RvcicgfHxcblx0XHRcdGtleT09PSd0b0pTT04nIHx8XG5cdFx0XHQoIGRlc2NyaXB0b3JzW2tleV0gPSBkZXNjcmlwdG9yICk7XG5cdFx0fVxuXHR9XG5cdERhdGV0aW1lLnByb3RvdHlwZSA9IHByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShOYXRpdmVEYXRlLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpKTtcblx0cmV0dXJuIGZyZWV6ZShEYXRldGltZSk7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgVmFsdWUgPSAoSVNPU3RyaW5nICAgICAgICApICAgICAgICA9PiBJU09TdHJpbmcucmVwbGFjZShaRVJPLCAnJykucmVwbGFjZShERUxJTUlURVJfRE9ULCAnJyk7XG5cbmNvbnN0IGxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBsaXRlcmFsLnNsaWNlKDUsIDEwKSE9PScwMi0yOScgfHwgK2xpdGVyYWwuc2xpY2UoMCwgNCklND09PTAgJiYgbGl0ZXJhbC5zbGljZSgyLCA0KSE9PScwMCc7XG5cbmNvbnN0IERBVEUgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhuZXcgTmF0aXZlRGF0ZSgwKSwgLyojX19QVVJFX18qL2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMoTmF0aXZlRGF0ZS5wcm90b3R5cGUpKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3ZhbHVlID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV92YWx1ZScpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdXNlID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAkICAgICAgICAgPSAwKSA9PiB7XG5cdERBVEUuc2V0VGltZSgrdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gKyAkKTtcblx0cmV0dXJuIERBVEU7XG59O1xuLypjb25zdCBPZmZzZXREYXRlVGltZV9nZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyKSA9PiArdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfc2V0ID0gKHRoYXQgOkluc3RhbmNlVHlwZTx0eXBlb2YgT2Zmc2V0RGF0ZVRpbWU+LCBzdGFydCA6bnVtYmVyLCBlbmQgOm51bWJlciwgdmFsdWUgOm51bWJlcikgPT4ge1xuXHRpZiAoIGVuZCApIHsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7IH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHJldHVybiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB0aW1lICkucGFkU3RhcnQoMTUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNSk7Ly8vdGltZVxufTsqLy8vXG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRjb25zdCB7IDE6IG1vcmUgfSA9IGxlYXAobGl0ZXJhbCkgJiYgKCBvcHRpb25zJDAuemVyb0RhdGV0aW1lID8gT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyA6IE9GRlNFVF9EQVRFVElNRV9leGVjICkobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKCcgJywgJ1QnKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyBwYXJzZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pICkucGFkU3RhcnQoMTUsICcwJykgKyAoIG1vcmUgPyAnLicgKyBtb3JlIDogJycgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0VVRDRnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0Z1bGxZZWFyKCk7IH1cblx0Ly8vZ2V0RnVsbFllYXIgKHRoaXMgOk9mZnNldERhdGVUaW1lKSA6RnVsbFllYXIgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdC8vL3NldEZ1bGxZZWFyICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOkZ1bGxZZWFyKSA6dm9pZCB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Ly8vZ2V0TW9udGggKHRoaXMgOk9mZnNldERhdGVUaW1lKSA6TW9udGggeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHQvLy9zZXRNb250aCAodGhpcyA6T2Zmc2V0RGF0ZVRpbWUsIHZhbHVlIDpNb250aCkgOnZvaWQgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXRVVENEYXRlICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0RhdGUoKTsgfVxuXHQvLy9nZXREYXRlICh0aGlzIDpPZmZzZXREYXRlVGltZSkgOkRhdGUgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHQvLy9zZXREYXRlICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOkRhdGUpIDp2b2lkIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldFVUQ0hvdXJzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENIb3VycygpOyB9XG5cdC8vL2dldEhvdXJzICh0aGlzIDpPZmZzZXREYXRlVGltZSkgOkhvdXJzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdC8vL3NldEhvdXJzICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOkhvdXJzKSA6dm9pZCB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRVVENNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbnV0ZXMoKTsgfVxuXHQvLy9nZXRNaW51dGVzICh0aGlzIDpPZmZzZXREYXRlVGltZSkgOk1pbnV0ZXMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0Ly8vc2V0TWludXRlcyAodGhpcyA6T2Zmc2V0RGF0ZVRpbWUsIHZhbHVlIDpNaW51dGVzKSA6dm9pZCB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRVVENTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ1NlY29uZHMoKTsgfVxuXHQvLy9nZXRTZWNvbmRzICh0aGlzIDpPZmZzZXREYXRlVGltZSkgOlNlY29uZHMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0Ly8vc2V0U2Vjb25kcyAodGhpcyA6T2Zmc2V0RGF0ZVRpbWUsIHZhbHVlIDpTZWNvbmRzKSA6dm9pZCB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRVVENNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaWxsaXNlY29uZHMoKTsgfS8vL1xuXHQvLy9nZXRNaWxsaXNlY29uZHMgKHRoaXMgOk9mZnNldERhdGVUaW1lKSA6TWlsbGlzZWNvbmRzIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxMiwgMTUpOyB9Ly8vXG5cdC8qc2V0TWlsbGlzZWNvbmRzICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOk1pbGxpc2Vjb25kcykgOnZvaWQge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgMCwgMCk7XG5cdH0qLy8vXG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHQvLy9nZXREYXkgKHRoaXMgOk9mZnNldERhdGVUaW1lKSA6RGF5IHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzLCB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkqNjAwMDApLmdldFVUQ0RheSgpOyB9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdC8qc2V0VGltZXpvbmVPZmZzZXQgKHRoaXMgOk9mZnNldERhdGVUaW1lLCB2YWx1ZSA6VGltZXpvbmVPZmZzZXQpIHtcblx0XHR2YWx1ZSA9ICt2YWx1ZTtcblx0XHRsZXQgc3RyaW5nID0gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHZhbHVlKjYwMDAwKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0aWYgKCB2YWx1ZT4wICkgeyBzdHJpbmcgKz0gJysnOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3RyaW5nICs9ICctJztcblx0XHRcdFx0dmFsdWUgPSAtdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtID0gdmFsdWUlNjA7XG5cdFx0XHRjb25zdCBoID0gKCB2YWx1ZSAtIG0gKS82MDtcblx0XHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHN0cmluZyArICggaD45ID8gaCA6ICcwJyArIGggKSArICggbT45ID8gJzonICsgbSA6ICc6MCcgKyBtICk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBzdHJpbmcgKyAoIGlzKHZhbHVlLCAwKSA/ICdaJyA6ICctMDA6MDAnICk7IH1cblx0fSovLy9cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgwLCAxNSk7IH0vLy9cblx0LypzZXRUaW1lICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOlRpbWUpIDp2b2lkIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMTUsICcwJyk7XG5cdFx0Ly8vcmV0dXJuIHZhbHVlO1xuXHR9Ki9cblx0XG59KTtcblxuY29uc3QgTG9jYWxEYXRlVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJyk7XG5jb25zdCBMb2NhbERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0dGhhdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoZW5kIC0gc3RhcnQsICcwJykgKyB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEVUSU1FKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZSgnICcsICdUJylcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNCwgMTcpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsRGF0ZV9JU09TdHJpbmcnKTtcbmNvbnN0IExvY2FsRGF0ZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxEYXRlX3ZhbHVlJyk7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PlxuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ0xvY2FsVGltZV9JU09TdHJpbmcnKTtcbmNvbnN0IExvY2FsVGltZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxUaW1lX3ZhbHVlJyk7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PlxuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgyLCAnMCcpICsgdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG5leHBvcnQgY29uc3QgTG9jYWxUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbFRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX1RJTUUobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQweEQ3RkY8Y2hhckNvZGUgJiYgY2hhckNvZGU8MHhFMDAwXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAsIG4gICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkge1xuXHRcdFx0KytuO1xuXHRcdFx0cGFydHNbaW5kZXhdID0gdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXG4nOlxuXHRcdFx0XHRjYXNlICcgJzpcblx0XHRcdFx0Y2FzZSAnXFx0Jzpcblx0XHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPSBwYXJ0LmluZGV4T2YoJ1xcbicsIGkpICsgMTsgKSB7ICsrbjsgfVxuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9ICcnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQweEQ3RkY8Y2hhckNvZGUgJiYgY2hhckNvZGU8MHhFMDAwXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnLCBpdGVyYXRvciQwLmxpbmVJbmRleCArIG4pKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnVSc6XG5cdFx0XHRcdFx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yJDAubGluZUluZGV4ICsgbikpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJy8nOiBwYXJ0c1tpbmRleF0gPSAnLyc7IGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR3aGlsZSAoICsraW5kZXghPT1sZW5ndGggKTtcblx0cmV0dXJuIHBhcnRzLmpvaW4oJycpO1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBCaWdJbnQgZnJvbSAnLkJpZ0ludCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgQkFEX0QgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXyg/IVxcZClgLnRlc3QgKSgpO1xuY29uc3QgSVNfRF9JTlRFR0VSID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYF4ke0lOVEVHRVJfRH0kYC50ZXN0ICkoKTtcbmNvbnN0IElTX1hPQl9JTlRFR0VSID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eMCg/OnhbXFxkQS1GYS1mXVtfXFxkQS1GYS1mXSp8b1swLTddW18wLTddKnxiWzAxXVtfMDFdKikkLykudGVzdCApKCk7XG5jb25zdCBCQURfWE9CID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVNfU0lHTiA9IC9ffF5bLStdL2c7XG5cbmNvbnN0IElTX0lOVEVHRVIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICA9PiAoIElTX0RfSU5URUdFUihsaXRlcmFsKSB8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IEJpZ0ludEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGxldCBiaWdJbnQgICAgICAgICA9IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0aWYgKCBsaXRlcmFsWzBdPT09Jy0nICkgeyBiaWdJbnQgPSAtYmlnSW50OyB9XG5cdG9wdGlvbnMkMC5hbGxvd0xvbmdlclxuXHR8fCAtOTIyMzM3MjAzNjg1NDc3NTgwOG48PWJpZ0ludCAmJiBiaWdJbnQ8PTkyMjMzNzIwMzY4NTQ3NzU4MDduLy8gKCBtaW4gPSAtKDJuKiooNjRuLTFuKSkgfHwgfm1heCApIDw9IGxvbmcgPD0gKCBtYXggPSAybioqKDY0bi0xbiktMW4gfHwgfm1pbiApXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gb3B0aW9ucyQwLkludGVnZXJNaW48PWJpZ0ludCAmJiBiaWdJbnQ8PW9wdGlvbnMkMC5JbnRlZ2VyTWF4ID8gKyggYmlnSW50KycnICkgOiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbi8vaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG4vL2ltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBJU19GTE9BVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke0lOVEVHRVJfRH1cblx0KD86XG5cdFx0XFwuXFxkW19cXGRdKlxuXHRcdCg/OltlRV1bLStdP1xcZFtfXFxkXSopP1xuXHR8XG5cdFx0W2VFXVstK10/XFxkW19cXGRdKlxuXHQpXG5cdCRgLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgSVNfWkVSTyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLlswX10rKT8oPzpbZUVdWy0rXT8wKyk/JC8pLnRlc3QgKSgpO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhSVNfRkxPQVQobGl0ZXJhbCkgfHwgQkFEX0QobGl0ZXJhbCkgKSB7XG5cdFx0Ly9pZiAoIG9wdGlvbnNcXCQwLnNGbG9hdCApIHtcblx0XHQvL1x0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHsgcmV0dXJuIEluZmluaXR5OyB9XG5cdFx0Ly9cdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIC1JbmZpbml0eTsgfVxuXHRcdC8vXHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBOYU47IH1cblx0XHQvL31cblx0XHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdGNvbnN0IG51bWJlciA9ICtsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKTtcblx0aWYgKCBvcHRpb25zJDAuc0Vycm9yICkge1xuXHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgYmlnIGFzIGluZiwgbGlrZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG51bWJlciB8fCBJU19aRVJPKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wLCBsaWtlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIGRpcmVjdGx5SWZOb3QsIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpbGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIElubGluZSBUYWJsZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KHRhYmxlKSApIHtcblx0XHRcdFx0aXNTdGF0aWModGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIFN0YXRpYyBBcnJheWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0dGFibGUgPSB0YWJsZVsoIHRhYmxlICAgICAgICAgICkubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFRhYmxlID0gKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgYXNBcnJheUl0ZW0gICAgICAgICAsIHRhZyAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgbGFzdFRhYmxlICAgICAgIDtcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRsZXQgYXJyYXlPZlRhYmxlcyAgICAgICAgICAgICAgO1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7IGlzQXJyYXkoYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSkgJiYgIWlzU3RhdGljKGFycmF5T2ZUYWJsZXMpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gcHVzaCBUYWJsZSB0byBub24tQXJyYXlPZlRhYmxlcyB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdGVsc2UgeyBhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoT0ZfVEFCTEVTKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh0YWcsIGFycmF5T2ZUYWJsZXMsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0YXJyYXlPZlRhYmxlc1thcnJheU9mVGFibGVzLmxlbmd0aF0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkge1xuXHRcdFx0bGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldO1xuXHRcdFx0ZGlyZWN0bHlJZk5vdChsYXN0VGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGZyb21QYWlyKGxhc3RUYWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBrZXkvdmFsdWUgcGFpciBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBbXWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5saW5lVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGZyb21QYWlyKHRhYmxlKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIFtdIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBjaGVja0xpdGVyYWxTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0cmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gYSBMaXRlcmFsIFN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4gbGl0ZXJhbDtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25MaXRlcmFsU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGxpdGVyYWxbMV0hPT0nXFwnJyB8fCBsaXRlcmFsWzJdIT09J1xcJycgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbGl0ZXJhbCBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHRjb25zdCAkID0gcmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRpZiAoICQgKSB7XG5cdFx0dGFibGVbZmluYWxLZXldID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRyZXR1cm4gJFszXTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvciQwLm1hcmsoJ011bHRpLWxpbmUgTGl0ZXJhbCBTdHJpbmcnLCBsaXRlcmFsLmxlbmd0aCArIDMpO1xuXHRpZiAoICFsaXRlcmFsICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID8/IHN0YXJ0Lm5vd3JhcCgpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKSBdOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpbmUpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbGluZXMuam9pbihvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyApO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcobGluZSk7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CYXNpY1N0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBsaXRlcmFsWzFdIT09J1wiJyB8fCBsaXRlcmFsWzJdIT09J1wiJyApIHtcblx0XHRjb25zdCBzdHJpbmcgPSByZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWNfMShsaXRlcmFsKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZyhzdHJpbmcpO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKDIgKyBzdHJpbmcubGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaXRlcmFsKTtcblx0bGV0IHsgbGVuZ3RoIH0gPSAkO1xuXHRpZiAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJywgbGVuZ3RoKSApIHtcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRsZW5ndGggKz0gMztcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZygkKSArICggb3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUgPyBsaXRlcmFsW2xlbmd0aF09PT0nXCInID8gbGl0ZXJhbFsrK2xlbmd0aF09PT0nXCInID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgOiAnJyApO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvciQwLm1hcmsoJ011bHRpLWxpbmUgQmFzaWMgU3RyaW5nJywgbGl0ZXJhbC5sZW5ndGggKyAzKTtcblx0Y29uc3Qgc2tpcHBlZCAgICAgICAgPSBsaXRlcmFsID8gMCA6IDE7XG5cdGlmICggc2tpcHBlZCApIHtcblx0XHRsaXRlcmFsID0gc3RhcnQubXVzdCgpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wKGxpdGVyYWwpO1xuXHRcdGxldCB7IGxlbmd0aCB9ID0gJDtcblx0XHRpZiAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJywgbGVuZ3RoKSApIHtcblx0XHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0bGVuZ3RoICs9IDM7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBNdWx0aWxpbmVCYXNpY1N0cmluZygkLCBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSA/IGxpdGVyYWxbbGVuZ3RoXT09PSdcIicgPyBsaXRlcmFsWysrbGVuZ3RoXT09PSdcIicgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyA6ICcnICk7XG5cdFx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID8/IHN0YXJ0Lm5vd3JhcCgpO1xuXHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCArPSAnXFxuJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBsaXRlcmFsIF07IDsgKSB7XG5cdFx0bGV0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaW5lKTtcblx0XHRsZXQgeyBsZW5ndGggfSA9ICQ7XG5cdFx0aWYgKCBsaW5lLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGxlbmd0aCArPSAzO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcobGluZXMuam9pbignJykgKyAkLCBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSA/IGxpbmVbbGVuZ3RoXT09PSdcIicgPyBsaW5lWysrbGVuZ3RoXT09PSdcIicgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyA6ICcnICk7XG5cdFx0XHRyZXR1cm4gbGluZS5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaW5lICs9ICdcXG4nKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBsaW5lO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5jb25zdCBLRVlTID0gLyojX19QVVJFX18qL051bGwobnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgU3ltID0gKGtleSAgICAgICAgKSA9PiB7XG5cdGNvbnN0IHN5bSA9IFN5bWJvbChrZXkpO1xuXHRLRVlTW3N5bV0gPSBrZXk7XG5cdHJldHVybiBLRVlTW2tleV0gPSBzeW07XG59O1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3IgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gS0VZU1trZXldID8/IFN5bShrZXkpO1xuXG5jb25zdCBORVdMSU5FID0gL1xccj9cXG4vZztcbmV4cG9ydCBjb25zdCBnZXRDb21tZW50ID0gICAgICAgICAgICAgICAgICAgICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICgga2V5IGluIEtFWVMgJiYgS0VZU1trZXldICBpbiB0YWJsZSApIHtcblx0XHRjb25zdCBjb21tZW50ID0gdGFibGVbS0VZU1trZXldIF0gO1xuXHRcdGlmICggdHlwZW9mIGNvbW1lbnQ9PT0nc3RyaW5nJyApIHsgcmV0dXJuICcgIycgKyBjb21tZW50LnJlcGxhY2UoTkVXTElORSwgJycpICAgICAgICAgICAgICAgICA7IH0vLy9cblx0XHR0aHJvdyBUeXBlRXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50S2V5IG11c3QgYmUgXCJzdHJpbmdcIiB0eXBlLCB3aGlsZSBcIiR7Y29tbWVudD09PW51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29tbWVudH1cIiBpcyBmb3VuZGApO1xuXHR9XG5cdHJldHVybiAnJztcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy9cblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCB7IElOTElORSwgRElSRUNUTFkgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgU1RBVElDQUxMWSB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUJCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcbmltcG9ydCB7IGFwcGVuZFRhYmxlLCBwcmVwYXJlVGFibGUsIHByZXBhcmVJbmxpbmVUYWJsZSwgYXNzaWduTGl0ZXJhbFN0cmluZywgYXNzaWduQmFzaWNTdHJpbmcgfSBmcm9tICcuL29uLXRoZS1zcG90JztcblxuaW1wb3J0IHsgY29tbWVudEZvciB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgYmVJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5cbmNvbnN0IElTX09GRlNFVCQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoT0ZGU0VUJCkudGVzdCApKCk7XG5cbmNvbnN0IHBhcnNlS2V5cyA9IChyZXN0ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGxpbmVSZXN0ICAgICAgICAgPSByZXN0O1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBbXTtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gLTE7XG5cdGZvciAoIDsgOyApIHtcblx0XHRsaW5lUmVzdCB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkgYmFyZSBrZXlgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PSdcIicgKSB7XG5cdFx0XHRjb25zdCBrZXkgICAgICAgICA9IHJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlY18xKGxpbmVSZXN0KTtcblx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMiArIGtleS5sZW5ndGgpO1xuXHRcdFx0bGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gQmFzaWNTdHJpbmcoa2V5KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBpc1F1b3RlZCA9IGxpbmVSZXN0WzBdPT09J1xcJyc7XG5cdFx0XHRjb25zdCBrZXkgICAgICAgICA9ICggKCBpc1F1b3RlZCA/IHJlZ2V4cHMkMC5fX0xJVEVSQUxfS0VZX2V4ZWMgOiByZWdleHBzJDAuX19CQVJFX0tFWV9leGVjICkobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgJHtpc1F1b3RlZCA/ICdsaXRlcmFsIHN0cmluZycgOiAnYmFyZSd9IGtleWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKSApWzBdO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IGlzUXVvdGVkID8ga2V5LnNsaWNlKDEsIC0xKSA6IGtleTtcblx0XHR9XG5cdFx0aWYgKCByZWdleHBzJDAuSVNfRE9UX0tFWShsaW5lUmVzdCkgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuRE9UX0tFWSwgJycpOyB9XG5cdFx0ZWxzZSB7IGJyZWFrOyB9XG5cdH1cblx0aWYgKCBvcHRpb25zJDAuZGlzYWJsZURpZ2l0ICkge1xuXHRcdGNvbnN0IGtleXMgPSByZXN0LnNsaWNlKDAsIC1saW5lUmVzdC5sZW5ndGgpO1xuXHRcdCggcmVnZXhwcyQwLmlzQW1hemluZyhrZXlzKSB8fCBvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBrZXlzPT09J251bGwnICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXJlIGtleSBkaXNhYmxlZCBieSB4T3B0aW9ucy5zdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0aWYgKCBvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSApIHtcblx0XHRsZXQgaW5kZXggICAgICAgICA9IGxhc3RJbmRleDtcblx0XHRkbyB7IGxlYWRpbmdLZXlzW2luZGV4XSAgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGtleSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXgtLSApO1xuXHR9XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsYXN0SW5kZXhdIDtcblx0bGVhZGluZ0tleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLl9WQUxVRV9QQUlSX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnIGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zJDAuY29sbGVjdCh0YWcsIGxhc3RBcnJheSwgbnVsbCk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ10nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHRsYXN0QXJyYXlbbGFzdEFycmF5Lmxlbmd0aF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKG9wdGlvbnMkMC5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMkMC5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUob3B0aW9ucyQwLmFzVGFibGVzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KG9wdGlvbnMkMC5hc0FycmF5cyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggb3B0aW9ucyQwLnNGbG9hdCApIHtcblx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBJbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSAtSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gTmFOO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0b3B0aW9ucyQwLmFzT2Zmc2V0RGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHRvcHRpb25zJDAuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMkMC5hc0xvY2FsVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRvcHRpb25zJDAuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRsaXRlcmFsPT09J3RydWUnID8gb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWUgOiBsaXRlcmFsPT09J2ZhbHNlJyA/IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBmYWxzZSA6XG5cdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgPyBvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEZsb2F0KGxpdGVyYWwpIDpcblx0XHRcdG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgPyBvcHRpb25zJDAuYXNOdWxscyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbnVsbCA6XG5cdFx0XHRcdG9wdGlvbnMkMC5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5jb25zdCBlcXVhbFN0YXRpY0FycmF5ID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IHN0YXRpY0FycmF5ICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KFNUQVRJQ0FMTFkpO1xuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvciQwLm1hcmsoJ1N0YXRpYyBBcnJheScsIGxpbmVSZXN0Lmxlbmd0aCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0bGV0IGlubGluZSA9IHRydWU7XG5cdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHtcblx0XHRpbmxpbmUgJiYgYmVJbmxpbmUoc3RhdGljQXJyYXksIHRydWUpO1xuXHRcdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGZvciAoIDsgOyApIHtcblx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gcHVzaChzdGF0aWNBcnJheSwgbGluZVJlc3QpO1xuXHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBpbiBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdFx0fVxuXHR9XG5cdGlubGluZSAmJiBiZUlubGluZShzdGF0aWNBcnJheSwgdHJ1ZSk7XG5cdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFksIElOTElORSk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IkMC5tYXJrKCdJbmxpbmUgVGFibGUnLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRsZXQgaW5saW5lID0gdHJ1ZTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQoaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRsaW5lUmVzdCA9IHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdDtcblx0XHRcdGlmICggbGluZVJlc3QgKSB7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0aWYgKCBvcHRpb25zJDAucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGRvIHsgbGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0fVxuXHRcdGlubGluZSB8fCBiZUlubGluZShpbmxpbmVUYWJsZSwgZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXSE9PSd9JyApIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKEZvckNvbW1lbnQoaW5saW5lVGFibGUsIGxpbmVSZXN0KSk7XG5cdFx0XHRcdGxpbmVSZXN0ID0gKCB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3QgKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG59ICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEZvckNvbW1lbnQgPSAobGFzdElubGluZVRhYmxlICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgdGFnIH0gPSB7IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMocGFyc2VLZXlzKGxpbmVSZXN0KSk7XG5cdHJldHVybiB7IHRhYmxlOiBwcmVwYXJlSW5saW5lVGFibGUobGFzdElubGluZVRhYmxlLCBsZWFkaW5nS2V5cyksIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuY29uc3QgYXNzaWduID0gKHsgZmluYWxLZXksIHRhZywgbGluZVJlc3QsIHRhYmxlIH0gICAgICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0ZmluYWxLZXkgaW4gdGFibGUgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIHRhZyApIHtcblx0XHRvcHRpb25zJDAuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ30nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMkMC5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBvcHRpb25zJDAuc0Zsb2F0ICkge1xuXHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBJbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gLUluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBOYU47XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdHRhYmxlW2ZpbmFsS2V5XSA9XG5cdFx0bGl0ZXJhbD09PSd0cnVlJyA/IHRydWUgOiBsaXRlcmFsPT09J2ZhbHNlJyA/IGZhbHNlIDpcblx0XHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpID8gRmxvYXQobGl0ZXJhbCkgOlxuXHRcdFx0XHRvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnID8gbnVsbCA6XG5cdFx0XHRcdFx0SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zJDAuVGFibGU7XG5cdGxldCBsYXN0U2VjdGlvblRhYmxlICAgICAgICA9IHJvb3RUYWJsZTtcblx0d2hpbGUgKCBpdGVyYXRvciQwLnJlc3QoKSApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBpdGVyYXRvciQwLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZSApIHtcblx0XHRcdGlmICggbGluZVswXT09PSdbJyApIHtcblx0XHRcdFx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGFzQXJyYXlJdGVtLCB0YWcsIGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyhsaW5lLCBwYXJzZUtleXMpO1xuXHRcdFx0XHRjb25zdCB0YWJsZSAgICAgICAgPSBwcmVwYXJlVGFibGUocm9vdFRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdFx0XHRcdGlmICggbGluZVJlc3QgKSB7XG5cdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScjJyApIHsgaWYgKCBvcHRpb25zJDAucHJlc2VydmVDb21tZW50ICYmICFhc0FycmF5SXRlbSApIHsgdGFibGVbY29tbWVudEZvcihmaW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH0gfVxuXHRcdFx0XHRcdGVsc2UgeyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciB0YWJsZSBoZWFkZXJgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUodGFibGUsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBsaW5lWzBdPT09JyMnICkge1xuXHRcdFx0XHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBjb21tZW50c2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGZvckNvbW1lbnQgICAgICAgICAgICAgPSBGb3JDb21tZW50KGxhc3RTZWN0aW9uVGFibGUsIGxpbmUpO1xuXHRcdFx0XHRsZXQgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdFx0dHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyB8fCAoIHJlc3QgPSB4ICAgICAgICAocmVzdCkgKTtcblx0XHRcdFx0aWYgKCByZXN0ICkge1xuXHRcdFx0XHRcdGlmICggcmVzdFswXT09PScjJyApIHsgaWYgKCBvcHRpb25zJDAucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gcmVzdC5zbGljZSgxKTsgfSB9XG5cdFx0XHRcdFx0ZWxzZSB7IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWNodG9yIGFmdGVyIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVWludDhBcnJheSBmcm9tICcuVWludDhBcnJheSc7XG5pbXBvcnQgQnVmZmVyIGZyb20gJy5CdWZmZXI/JztcbmltcG9ydCBmcm9tQ2hhckNvZGUgZnJvbSAnLlN0cmluZy5mcm9tQ2hhckNvZGUnO1xuaW1wb3J0IGZyb21Db2RlUG9pbnQgZnJvbSAnLlN0cmluZy5mcm9tQ29kZVBvaW50JztcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXlCdWZmZXJMaWtlID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICA9PiAnYnl0ZUxlbmd0aCcgaW4gdmFsdWU7XG5cbmNvbnN0IG1lc3NhZ2UgPSAnQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVua25vd24gY29kZSBwb2ludC4nO1xuXG5leHBvcnQgY29uc3QgYXJyYXlCdWZmZXJMaWtlMnN0cmluZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gQnVmZmVyXG5cdFxuXHQ/ICggKHsgaXNCdWZmZXIsIFtTeW1ib2wuc3BlY2llc106IEJ1ZiwgYnl0ZUxlbmd0aCwgYWxsb2NVbnNhZmUgfSkgPT5cblx0XHQoYXJyYXlCdWZmZXJMaWtlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgPT4ge1xuXHRcdFx0aWYgKCAhYXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggKSB7IHJldHVybiAnJzsgfVxuXHRcdFx0Y29uc3QgYnVmZmVyICAgICAgICAgPSBpc0J1ZmZlcihhcnJheUJ1ZmZlckxpa2UpID8gYXJyYXlCdWZmZXJMaWtlIDogJ2xlbmd0aCcgaW4gYXJyYXlCdWZmZXJMaWtlID8gbmV3IEJ1ZihhcnJheUJ1ZmZlckxpa2UuYnVmZmVyLCBhcnJheUJ1ZmZlckxpa2UuYnl0ZU9mZnNldCwgYXJyYXlCdWZmZXJMaWtlLmxlbmd0aCkgOiBuZXcgQnVmKGFycmF5QnVmZmVyTGlrZSk7XG5cdFx0XHRjb25zdCBzdHJpbmcgICAgICAgICA9IGJ1ZmZlci50b1N0cmluZygpO1xuXHRcdFx0aWYgKCBzdHJpbmcuaW5jbHVkZXMoJ1xcdUZGRkQnKSApIHtcblx0XHRcdFx0Y29uc3QgbGVuZ3RoICAgICAgICAgPSBieXRlTGVuZ3RoKHN0cmluZyk7XG5cdFx0XHRcdGlmICggbGVuZ3RoIT09YnVmZmVyLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IobWVzc2FnZSk7IH1cblx0XHRcdFx0Y29uc3QgdXRmOCA9IGFsbG9jVW5zYWZlKGxlbmd0aCk7XG5cdFx0XHRcdC8vL0B0cy1pZ25vcmVcblx0XHRcdFx0dXRmOC51dGY4V3JpdGUoc3RyaW5nLCAwLCBsZW5ndGgpO1xuXHRcdFx0XHRpZiAoICF1dGY4LmVxdWFscyhidWZmZXIpICkgeyB0aHJvdyBFcnJvcihtZXNzYWdlKTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmluZ1swXT09PSdcXHVGRUZGJyA/IHN0cmluZy5zbGljZSgxKSA6IHN0cmluZztcblx0XHR9XG5cdCkoQnVmZmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkvLy9cblx0XG5cdDogKGFycmF5QnVmZmVyTGlrZSAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgID0+IHtcblx0XHRpZiAoICFhcnJheUJ1ZmZlckxpa2UuYnl0ZUxlbmd0aCApIHsgcmV0dXJuICcnOyB9XG5cdFx0Y29uc3QgdWludDhBcnJheSAgICAgICAgICAgICA9ICdsZW5ndGgnIGluIGFycmF5QnVmZmVyTGlrZSA/IGFycmF5QnVmZmVyTGlrZSA6IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyTGlrZSk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHVpbnQ4QXJyYXk7XG5cdFx0Y29uc3QgbGVuZ3RoXzEgPSBsZW5ndGggLSAxO1xuXHRcdGNvbnN0IGxlbmd0aF8yID0gbGVuZ3RoXzEgLSAxO1xuXHRcdGNvbnN0IGxlbmd0aF8zID0gbGVuZ3RoXzIgLSAxO1xuXHRcdGNvbnN0IHN0cmluZ0FycmF5ICAgICAgICAgICA9IFtdO1xuXHRcdGxldCBzdHJpbmdBcnJheV9sZW5ndGggICAgICAgICA9IDA7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHRcdGRvIHtcblx0XHRcdGxldCBjb2RlUG9pbnQgICAgICAgICA9IHVpbnQ4QXJyYXlbaW5kZXhdIDtcblx0XHRcdGlmICggY29kZVBvaW50PDBiMTEwMF8wMDAwICkge1xuXHRcdFx0XHRpZiAoIGNvZGVQb2ludDwwYjEwMDBfMDAwMCApIHtcblx0XHRcdFx0XHRzdHJpbmdBcnJheVtzdHJpbmdBcnJheV9sZW5ndGgrK10gPSBmcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0XHRcdFx0XHRpbmRleCArPSAxO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggY29kZVBvaW50PDBiMTExMF8wMDAwICkge1xuXHRcdFx0XHRpZiAoIGluZGV4PGxlbmd0aF8xICkge1xuXHRcdFx0XHRcdGNvbnN0IHNlY29uZEJ5dGUgICAgICAgICA9IHVpbnQ4QXJyYXlbaW5kZXggKyAxXSA7XG5cdFx0XHRcdFx0aWYgKCAoIHNlY29uZEJ5dGUmMGIxMTAwXzAwMDAgKT09PTBiMTAwMF8wMDAwICkge1xuXHRcdFx0XHRcdFx0Y29kZVBvaW50ID0gKCBjb2RlUG9pbnQmMGIwMDAxXzExMTEgKTw8NnwoIHNlY29uZEJ5dGUmMGIwMDExXzExMTEgKTtcblx0XHRcdFx0XHRcdGlmICggMGIwMTExXzExMTE8Y29kZVBvaW50ICkge1xuXHRcdFx0XHRcdFx0XHRzdHJpbmdBcnJheVtzdHJpbmdBcnJheV9sZW5ndGgrK10gPSBmcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0XHRcdFx0XHRcdFx0aW5kZXggKz0gMjtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggY29kZVBvaW50PDBiMTExMV8wMDAwICkge1xuXHRcdFx0XHRpZiAoIGluZGV4PGxlbmd0aF8yICkge1xuXHRcdFx0XHRcdGNvbnN0IHNlY29uZEJ5dGUgICAgICAgICA9IHVpbnQ4QXJyYXlbaW5kZXggKyAxXSA7XG5cdFx0XHRcdFx0Y29uc3QgdGhpcmRCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgMl0gO1xuXHRcdFx0XHRcdGlmICggKCBzZWNvbmRCeXRlJjBiMTEwMF8wMDAwICk9PT0wYjEwMDBfMDAwMCAmJiAoIHRoaXJkQnl0ZSYwYjExMDBfMDAwMCApPT09MGIxMDAwXzAwMDAgKSB7XG5cdFx0XHRcdFx0XHRjb2RlUG9pbnQgPSAoIGNvZGVQb2ludCYwYjAwMDBfMTExMSApPDwxMnwoIHNlY29uZEJ5dGUmMGIwMDExXzExMTEgKTw8NnwoIHRoaXJkQnl0ZSYwYjAwMTFfMTExMSApO1xuXHRcdFx0XHRcdFx0aWYgKCAoIGNvZGVQb2ludDwweEQ4MDAgPyAweDA3RkYgOiAweERGRkYgKTxjb2RlUG9pbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHN0cmluZ0FycmF5W3N0cmluZ0FycmF5X2xlbmd0aCsrXSA9IGZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRcdFx0XHRcdFx0XHRpbmRleCArPSAzO1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGluZGV4PGxlbmd0aF8zICkge1xuXHRcdFx0XHRcdGNvbnN0IHNlY29uZEJ5dGUgICAgICAgICA9IHVpbnQ4QXJyYXlbaW5kZXggKyAxXSA7XG5cdFx0XHRcdFx0Y29uc3QgdGhpcmRCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgMl0gO1xuXHRcdFx0XHRcdGNvbnN0IGZvdXJ0aEJ5dGUgICAgICAgICA9IHVpbnQ4QXJyYXlbaW5kZXggKyAzXSA7XG5cdFx0XHRcdFx0aWYgKCAoIHNlY29uZEJ5dGUmMGIxMTAwXzAwMDAgKT09PTBiMTAwMF8wMDAwICYmICggdGhpcmRCeXRlJjBiMTEwMF8wMDAwICk9PT0wYjEwMDBfMDAwMCAmJiAoIGZvdXJ0aEJ5dGUmMGIxMTAwXzAwMDAgKT09PTBiMTAwMF8wMDAwICkge1xuXHRcdFx0XHRcdFx0Y29kZVBvaW50ID0gKCBjb2RlUG9pbnQmMGIwMDAwXzExMTEgKTw8MTh8KCBzZWNvbmRCeXRlJjBiMDAxMV8xMTExICk8PDEyfCggdGhpcmRCeXRlJjBiMDAxMV8xMTExICk8PDZ8KCBmb3VydGhCeXRlJjBiMDAxMV8xMTExICk7XG5cdFx0XHRcdFx0XHRpZiAoIDB4RkZGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4MTFfMDAwMCApIHtcblx0XHRcdFx0XHRcdFx0c3RyaW5nQXJyYXlbc3RyaW5nQXJyYXlfbGVuZ3RoKytdID0gZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xuXHRcdFx0XHRcdFx0XHRpbmRleCArPSA0O1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRocm93IEVycm9yKG1lc3NhZ2UpO1xuXHRcdH1cblx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICk7XG5cdFx0Y29uc3Qgc3RyaW5nID0gc3RyaW5nQXJyYXkuam9pbignJyk7XG5cdFx0cmV0dXJuIHN0cmluZ1swXT09PSdcXHVGRUZGJyA/IHN0cmluZy5zbGljZSgxKSA6IHN0cmluZztcblx0fTtcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgUm9vdCBmcm9tICcuL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgaXNBcnJheUJ1ZmZlckxpa2UsIGFycmF5QnVmZmVyTGlrZTJzdHJpbmcgfSBmcm9tICcuLi9VVEY4JztcblxuY29uc3QgSVNfTk9OX1NDQUxBUiA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvW1xcdUQ4MDAtXFx1REZGRl0vdSkudGVzdCApKCk7XG5cbmxldCBob2xkaW5nICAgICAgICAgID0gZmFsc2U7XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0aWYgKCBob2xkaW5nICkgeyB0aHJvdyBFcnJvcigncGFyc2UgZHVyaW5nIHBhcnNpbmcuJyk7IH1cblx0aG9sZGluZyA9IHRydWU7XG5cdGxldCByb290VGFibGUgICAgICAgO1xuXHRsZXQgcHJvY2VzcyAgICAgICAgICAgICAgICAgICA7XG5cdHRyeSB7XG5cdFx0bGV0IHNvdXJjZVBhdGggICAgICAgICA9ICcnO1xuXHRcdGlmICggdHlwZW9mIHNvdXJjZT09PSdvYmplY3QnICYmIHNvdXJjZSApIHtcblx0XHRcdGlmICggaXNBcnJheUJ1ZmZlckxpa2Uoc291cmNlKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhzb3VyY2UpOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdFx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UucGF0aCknKTsgfVxuXHRcdFx0XHRjb25zdCB7IGRhdGEsIHJlcXVpcmU6IHJlcSA9IHR5cGVvZiByZXF1aXJlPT09J2Z1bmN0aW9uJyA/IHJlcXVpcmUgOiB1bmRlZmluZWQgfSA9IHNvdXJjZTtcblx0XHRcdFx0aWYgKCByZXEgKSB7XG5cdFx0XHRcdFx0Y29uc3QgZGlybmFtZV8gPSByZXEucmVzb2x2ZT8ucGF0aHM/LignJyk/LlswXT8ucmVwbGFjZSgvbm9kZV9tb2R1bGVzJC8sICcnKTtcblx0XHRcdFx0XHRpZiAoIGRpcm5hbWVfICkge1xuXHRcdFx0XHRcdFx0c291cmNlUGF0aCA9ICggcmVxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSgncGF0aCcpLnJlc29sdmUoZGlybmFtZV8sIHNvdXJjZVBhdGgpO1xuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnJlcXVpcmUoJ3BhdGgnKS5yZXNvbHZlKWApOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSgnZnMnKS5yZWFkRmlsZVN5bmMoc291cmNlUGF0aCk7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0FycmF5QnVmZmVyTGlrZShkYXRhKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMpYCk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J3N0cmluZycgKSB7IHNvdXJjZSA9IGRhdGE7IH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIGRhdGE9PT0nb2JqZWN0JyAmJiBkYXRhICYmIGlzQXJyYXlCdWZmZXJMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBhcnJheUJ1ZmZlckxpa2Uyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5kYXRhKScpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5kYXRhfHNvdXJjZS5yZXF1aXJlKScpOyB9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J3N0cmluZycgKSB7IHNvdXJjZSA9IGRhdGE7IH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIGRhdGE9PT0nb2JqZWN0JyAmJiBkYXRhICYmIGlzQXJyYXlCdWZmZXJMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBhcnJheUJ1ZmZlckxpa2Uyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5kYXRhKScpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UpJyk7IH1cblx0XHR0cnkge1xuXHRcdFx0aWYgKCBJU19OT05fU0NBTEFSKHNvdXJjZSkgKSB7IHRocm93IEVycm9yKCdBIFRPTUwgZG9jIG11c3QgYmUgYSAoZnVsLXNjYWxhcikgdmFsaWQgVVRGLTggZmlsZSwgd2l0aG91dCBhbnkgdW5jb3VwbGVkIFVDUy00IGNoYXJhY3RlciBjb2RlLicpOyB9XG5cdFx0XHRpZiAoIHR5cGVvZiBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT0nb2JqZWN0JyAmJiBtdWx0aWxpbmVTdHJpbmdKb2luZXIgKSB7XG5cdFx0XHRcdGlmICggdXNlQmlnSW50IT09dW5kZWZpbmVkIHx8IHhPcHRpb25zIT09dW5kZWZpbmVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ29wdGlvbnMgbW9kZSA/IGFyZ3MgbW9kZScpOyB9XG5cdFx0XHRcdCggeyBqb2luZXI6IG11bHRpbGluZVN0cmluZ0pvaW5lciwgYmlnaW50OiB1c2VCaWdJbnQsIHg6IHhPcHRpb25zIH0gPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIgKTtcblx0XHRcdH1cblx0XHRcdHRyeSB7XG5cdFx0XHRcdG9wdGlvbnMkMC51c2Uoc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyk7XG5cdFx0XHRcdGl0ZXJhdG9yJDAudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNvdXJjZSAmJiBzb3VyY2VbMF09PT0nXFx1RkVGRicgJiYgaXRlcmF0b3IkMC50aHJvd3MoVHlwZUVycm9yKGBUT01MIGNvbnRlbnQgKHN0cmluZykgc2hvdWxkIG5vdCBzdGFydCB3aXRoIEJPTSAoVStGRUZGKWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRyb290VGFibGUgPSBSb290KCk7XG5cdFx0XHRcdFx0cHJvY2VzcyA9IG9wdGlvbnMkMC5Qcm9jZXNzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZmluYWxseSB7IGl0ZXJhdG9yJDAuZG9uZSgpOyB9Ly9jbGVhcldlYWtTZXRzKCk7XG5cdFx0XHR9XG5cdFx0XHRmaW5hbGx5IHsgb3B0aW9ucyQwLmNsZWFyKCk7IH1cblx0XHR9XG5cdFx0ZmluYWxseSB7IGNsZWFyUmVnRXhwKCk7IH1cblx0fVxuXHRmaW5hbGx5IHsgaG9sZGluZyA9IGZhbHNlOyB9XG5cdHByb2Nlc3M/LigpO1xuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2Fzc2lnbihcblx0KHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBzcGVjaWZpY2F0aW9uVmVyc2lvbj09PSdudW1iZXInXG5cdFx0XHQ/IHBhcnNlKHNvdXJjZSwgc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucylcblx0XHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgICAgKVxuXHQsXG5cdHtcblx0XHQnMS4wJzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQxLjA6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC41LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuNDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNCwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjM6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4yLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMTogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0fVxuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHQgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBzZXRfaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IHNldF9hZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IExJVEVSQUwgPSBuZXcgV2Vha1NldDtcblxuZXhwb3J0IGNvbnN0IGlzTGl0ZXJhbCA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoTElURVJBTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGJlTGl0ZXJhbCA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoTElURVJBTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAuLi5jaGFycyAgICAgICAgICApICAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCB0eXBlb2YgbGl0ZXJhbCE9PSdzdHJpbmcnICkge1xuXHRcdGxldCBpbmRleCA9IGNoYXJzLmxlbmd0aDtcblx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0Y29uc3QgeyByYXcgfSA9IGxpdGVyYWw7XG5cdFx0XHRsaXRlcmFsID0gcmF3W2luZGV4XSA7XG5cdFx0XHR3aGlsZSAoIGluZGV4ICkgeyBjaGFyc1stLWluZGV4XSArPSByYXdbaW5kZXhdIDsgfVxuXHRcdFx0bGl0ZXJhbCA9IGNoYXJzLmpvaW4oJycpICsgbGl0ZXJhbDtcblx0XHR9XG5cdFx0ZWxzZSB7IGxpdGVyYWwgPSBsaXRlcmFsLnJhd1swXSA7IH1cblx0fVxuXHRjb25zdCBsaW5lcyA9IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRiZUxpdGVyYWwobGluZXMpO1xuXHRyZXR1cm4gbGluZXM7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IGZyb21DaGFyQ29kZSBmcm9tICcuU3RyaW5nLmZyb21DaGFyQ29kZSc7XG5pbXBvcnQgZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyBiZUxpdGVyYWwgfSBmcm9tICcuL2xpdGVyYWwnO1xuXG5jb25zdCBFU0NBUEVEID0gLyojX19QVVJFX18qL051bGwgICAgICAgICh7XG5cdC4uLi8qI19fUFVSRV9fKi9mcm9tRW50cmllcygvKiNfX1BVUkVfXyovWyAuLi5BcnJheSgweDIwKSBdLm1hcCgoXywgY2hhckNvZGUpID0+IFsgZnJvbUNoYXJDb2RlKGNoYXJDb2RlKSwgJ1xcXFx1JyArIGNoYXJDb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnBhZFN0YXJ0KDQsICcwJykgXSkpLFxuXHQnXFxiJzogJ1xcXFxiJyxcblx0J1xcdCc6ICdcXFxcdCcsXG5cdCdcXG4nOiAnXFxcXG4nLFxuXHQnXFxmJzogJ1xcXFxmJyxcblx0J1xccic6ICdcXFxccicsXG5cdCdcIic6ICdcXFxcXCInLFxuXHQnXCJcIlwiJzogJ1wiXCJcXFxcXCInLFxuXHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdCdcXHg3Ric6ICdcXFxcdTAwN0YnLFxufSk7XG5cbmNvbnN0IE5FRURfQkFTSUMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pLnRlc3QgKSgpO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IE5FRURfRVNDQVBFID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0vKS50ZXN0ICkoKTtcbmV4cG9ydCBjb25zdCBsaXRlcmFsU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgID0+IGAnJHt2YWx1ZX0nYDtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggTkVFRF9CQVNJQyh2YWx1ZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSB2YWx1ZS5tYXRjaChCWV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0cmV0dXJuIGBcIiR7cGFydHMuam9pbignJyl9XCJgO1xuXHR9XG5cdHJldHVybiBgJyR7dmFsdWV9J2A7XG59O1xuXG5jb25zdCBORUVEX01VTFRJTElORV9CQVNJQyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcXHg3Rl18JycnLykudGVzdCApKCk7XG5jb25zdCBSRUFMX01VTFRJTElORV9FU0NBUEUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKS50ZXN0ICkoKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IE5FRURfTVVMVElMSU5FX0VTQ0FQRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OltcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIpLykudGVzdCApKCk7XG5jb25zdCBlc2NhcGVfbXVsdGlsaW5lID0gKGxpbmVzICAgICAgICAgICwgbGluZUluZGV4ICAgICAgICApID0+IHtcblx0Y29uc3QgbGluZSA9IGxpbmVzW2xpbmVJbmRleF0gO1xuXHRpZiAoIFJFQUxfTVVMVElMSU5FX0VTQ0FQRShsaW5lKSApIHtcblx0XHRjb25zdCBwYXJ0cyA9IGxpbmUubWF0Y2goQllfTVVMVElMSU5FX0VTQ0FQRSkgO1xuXHRcdGxldCBpbmRleCA9IHBhcnRzLmxlbmd0aDtcblx0XHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0bGluZXNbbGluZUluZGV4XSA9IHBhcnRzLmpvaW4oJycpO1xuXHR9XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgTGluZXMgPSAobGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsaW5lcyA9IFsgJycsIC4uLmxpbmVzIF0gICAgICAgICA7XG5cdGlmICggbGluZXMubGVuZ3RoPT09MSApIHsgKCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClbMV0gPSAnJzsgfVxuXHRyZXR1cm4gbGluZXMgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsYXN0SW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRsZXQgaW5kZXggPSBsYXN0SW5kZXg7XG5cdGRvIHsgaWYgKCBORUVEX01VTFRJTElORV9CQVNJQyhsaW5lc1tpbmRleF0gKSApIHsgYnJlYWs7IH0gfVxuXHR3aGlsZSAoIC0taW5kZXggKTtcblx0aWYgKCBpbmRleCApIHtcblx0XHRpbmRleCA9IGxhc3RJbmRleDtcblx0XHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdFx0bGluZXNbaW5kZXhdICs9IGxpbmVzWzBdID0gJ1wiXCJcIic7XG5cdFx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0fVxuXHRlbHNleyBsaW5lc1tsYXN0SW5kZXhdICs9IGxpbmVzWzBdID0gJ1xcJ1xcJ1xcJyc7IH1cblx0YmVMaXRlcmFsKGxpbmVzKTtcblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgaW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHR3aGlsZSAoIC0taW5kZXggKSB7IGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTsgfVxuXHRiZUxpdGVyYWwobGluZXMpO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCBJTlRFR0VSX0xJS0UgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14tP1xcZCskLykudGVzdCApKCk7XG5jb25zdCBlbnN1cmVGbG9hdCA9IChsaXRlcmFsICAgICAgICApID0+IElOVEVHRVJfTElLRShsaXRlcmFsKSA/IGxpdGVyYWwgKyAnLjAnIDogbGl0ZXJhbDtcblxuZXhwb3J0IGNvbnN0IGZsb2F0ID0gKHZhbHVlICAgICAgICApID0+IHZhbHVlXG5cdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHQ6IHZhbHVlPT09dmFsdWUgPyBpcyh2YWx1ZSwgMCkgPyAnMC4wJyA6ICctMC4wJyA6ICduYW4nO1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBCb29sZWFuIGZyb20gJy5Cb29sZWFuJztcbmltcG9ydCBTdHJpbmcgZnJvbSAnLlN0cmluZyc7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuaW1wb3J0IE51bWJlciBmcm9tICcuTnVtYmVyJztcbmltcG9ydCBTeW1ib2xfIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgVE9NTERhdGV0aW1lIGZyb20gJy5EYXRlJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5cbmltcG9ydCB7IGdldENvbW1lbnQgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IGlzTGl0ZXJhbCB9IGZyb20gJy4vbGl0ZXJhbCc7XG5pbXBvcnQgeyBsaXRlcmFsU3RyaW5nLCBzaW5nbGVsaW5lU3RyaW5nIH0gZnJvbSAnLi9zdHJpbmcnO1xuaW1wb3J0IHsgZmxvYXQgfSBmcm9tICcuL2Zsb2F0JztcbmltcG9ydCB7IGlzU2VjdGlvbiwgb2ZJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5cbmNvbnN0IEJBUkUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXFx3LV0rJC8pLnRlc3QgKSgpO1xuY29uc3QgJEtleSQgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gQkFSRShrZXkpID8ga2V5IDogc2luZ2xlbGluZVN0cmluZyhrZXkpO1xuXG5jb25zdCBGSVJTVCA9IC9bXi5dKy87XG5jb25zdCAkS2V5cyA9IChrZXlzICAgICAgICApICAgICAgICAgPT4gcmVnZXhwcyQwLmlzQW1hemluZyhrZXlzKSA/IGtleXMucmVwbGFjZShGSVJTVCwgbGl0ZXJhbFN0cmluZykgOiBrZXlzPT09J251bGwnID8gYCdudWxsJ2AgOiBrZXlzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MU2VjdGlvbiBleHRlbmRzIEFycmF5ICAgICAgICAge1xuXHRcblx0ICAgICAgICAgICAgICAgICBkb2N1bWVudCAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKGRvY3VtZW50ICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgeyByZXR1cm4gdGhpcy5qb2luKHRoaXMuZG9jdW1lbnQubmV3bGluZSk7IH1cblx0XG5cdGFwcGVuZE5ld2xpbmUgKCkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9ICcnOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZExpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gc291cmNlOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZTsgfSAgIFxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmVJZiAoc291cmNlICAgICAgICApIHsgc291cmNlICYmICggdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZSApOyB9Ly8vXG5cdFxuXHQqIGFzc2lnbkJsb2NrICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50S2V5c18gICAgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5c18gICAgICAgICAgICAgICAgICAsIHRhYmxlICAgLCB0YWJsZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICB7XG5cdFx0Y29uc3QgeyBkb2N1bWVudCB9ID0gdGhpcztcblx0XHRjb25zdCB7IG5ld2xpbmVVbmRlckhlYWRlciwgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgfSA9IGRvY3VtZW50O1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlckRvdHRlZCA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgOiBmYWxzZTtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJQYWlyID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyRG90dGVkIDogZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpcjtcblx0XHRmb3IgKCBjb25zdCB0YWJsZUtleSBvZiB0YWJsZUtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSB0YWJsZVt0YWJsZUtleV0gO1xuXHRcdFx0Y29uc3QgJGtleSQgPSAkS2V5JCh0YWJsZUtleSk7XG5cdFx0XHRjb25zdCBkb2N1bWVudEtleXMgPSBkb2N1bWVudEtleXNfICsgJGtleSQ7XG5cdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCAmJiBpc1NlY3Rpb24odmFsdWVbMF0pICkge1xuXHRcdFx0XHRcdGNvbnN0IHRhYmxlSGVhZGVyID0gYFtbJHtkb2N1bWVudEtleXN9XV1gICAgICAgICAgO1xuXHRcdFx0XHRcdGNvbnN0IGRvY3VtZW50S2V5c18gPSBkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgO1xuXHRcdFx0XHRcdGZvciAoIGNvbnN0IHRhYmxlIG9mIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdFx0c2VjdGlvblswXSA9IHRhYmxlSGVhZGVyO1xuXHRcdFx0XHRcdFx0aWYgKCBuZXdsaW5lVW5kZXJIZWFkZXIgKSB7XG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0yICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzXywgYGAsIHRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHRhYmxlKSk7XG5cdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggaXNTZWN0aW9uKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdHNlY3Rpb25bMF0gPSBgWyR7ZG9jdW1lbnRLZXlzfV0ke2dldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KX1gO1xuXHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZWN0aW9uS2V5cyA9IHNlY3Rpb25LZXlzXyArICRrZXkkO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gJEtleXMoc2VjdGlvbktleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCBrZXlzSWZEb3R0ZWQgPSB0aGlzLnZhbHVlKCcnLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyk7XG5cdFx0XHRpZiAoIGtleXNJZkRvdHRlZCApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0eWllbGQgdGhpcy5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleXNJZkRvdHRlZCk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlckRvdHRlZCAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJQYWlyICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0ICAgICAgICB2YWx1ZSAoaW5kZW50ICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICwgZ2V0T3duUHJvcGVydHlOYW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGlmICggdmFsdWU9PT1udWxsICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5kb2N1bWVudC5udWxsRGlzYWJsZWQgKSB7IHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIm51bGxcIiB0eXBlIHZhbHVlIHdpdGhvdXQgdHJ1dGh5IG9wdGlvbnMueE51bGxgKTsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ251bGwnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaXNMaXRlcmFsKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB2YWx1ZVswXTtcblx0XHRcdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IHRoaXMuYXBwZW5kTGluZSA9IHZhbHVlW2luZGV4KytdIDsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IGlubGluZU1vZGUgPSBvZklubGluZSh2YWx1ZSk7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZVxuXHRcdFx0XHRcdFx0PyB0aGlzLnNpbmdsZWxpbmVBcnJheShpbmRlbnQsIHZhbHVlKVxuXHRcdFx0XHRcdFx0OiB0aGlzLnN0YXRpY0FycmF5KGluZGVudCwgdmFsdWUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaW5saW5lTW9kZSE9PXVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRpbmxpbmVNb2RlIHx8IHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVEaXNhYmxlZFxuXHRcdFx0XHRcdFx0PyB0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApXG5cdFx0XHRcdFx0XHQ6IHRoaXMubXVsdGlsaW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpcy5kb2N1bWVudC5tdWx0aWxpbmVUYWJsZUNvbW1hKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHZhbHVlIGluc3RhbmNlb2YgVE9NTERhdGV0aW1lICkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdGhpcy5kb2N1bWVudC5fID8gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgJyAnKSA6IHZhbHVlLnRvSVNPU3RyaW5nKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgU3RyaW5nXWApOyB9XG5cdFx0XHRcdGlmICggZ2V0T3duUHJvcGVydHlOYW1lcyApIHtcblx0XHRcdFx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFx0aWYgKCBrZXlzLmxlbmd0aCApIHsgcmV0dXJuIGtleXM7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBCaWdJbnQgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJpZ0ludF1gKTsgfVxuXHRcdFx0XHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBOdW1iZXIgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IE51bWJlcl1gKTsgfVxuXHRcdFx0XHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBCb29sZWFuICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCb29sZWFuXWApOyB9XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSBpbnN0YW5jZW9mIFN5bWJvbF8gKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IFN5bWJvbF1gKTsgfVxuXHRcdFx0XHRcdHRoaXMuaW5saW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ2JpZ2ludCc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJycgKyB2YWx1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHRoaXMuZG9jdW1lbnQuYXNJbnRlZ2VyKHZhbHVlKSA/IGlzKHZhbHVlLCAtMCkgPyAnLTAnIDogJycgKyB2YWx1ZSA6IGZsb2F0KHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHNpbmdsZWxpbmVTdHJpbmcodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCIke3R5cGVvZiB2YWx1ZX1cIiB0eXBlIHZhbHVlYCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdFxuXHQgICAgICAgIHNpbmdsZWxpbmVBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ1sgJztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50LCBzdGF0aWNBcnJheVswXSApO1xuXHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywgJztcblx0XHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5W2luZGV4KytdICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcgXSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICdbIF0nOyB9XG5cdH1cblx0ICAgICAgICBzdGF0aWNBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ1snO1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRmb3IgKCBjb25zdCBpdGVtIG9mIHN0YXRpY0FycmF5ICkge1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50Xztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50XywgaXRlbSk7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcsJztcblx0XHR9XG5cdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50ICsgJ10nO1xuXHR9XG5cdFxuXHQgICAgICAgIGlubGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoaW5saW5lVGFibGUpO1xuXHRcdGlmICgga2V5cy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7ICc7XG5cdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwga2V5cyk7XG5cdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC0yKSArICcgfSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nOyB9XG5cdH1cblx0ICAgICAgICBtdWx0aWxpbmVUYWJsZSAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICApIHtcblx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7Jztcblx0XHR0aGlzLmFzc2lnbk11bHRpbGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwgZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSksIGNvbW1hKTtcblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnfSc7XG5cdH1cblx0ICAgICAgICBhc3NpZ25JbmxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHRjb25zdCBiZWZvcmVfdmFsdWUgPSB0aGlzLmFwcGVuZElubGluZSA9ICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCBrZXlzSWZEb3R0ZWQgPSB0aGlzLnZhbHVlKGluZGVudCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXMpO1xuXHRcdFx0aWYgKCBrZXlzSWZEb3R0ZWQgKSB7XG5cdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLWJlZm9yZV92YWx1ZS5sZW5ndGgpO1xuXHRcdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwga2V5c0lmRG90dGVkKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICcsICc7IH1cblx0XHR9XG5cdH1cblx0ICAgICAgICBhc3NpZ25NdWx0aWxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICkge1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudF8gKyAkS2V5cyhrZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3Qga2V5c0lmRG90dGVkID0gdGhpcy52YWx1ZShpbmRlbnRfLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyk7XG5cdFx0XHRpZiAoIGtleXNJZkRvdHRlZCApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGtleXNJZkRvdHRlZCwgY29tbWEpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbW1hXG5cdFx0XHRcdFx0PyB0aGlzLmFwcGVuZElubGluZSA9ICcsJyArIGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSlcblx0XHRcdFx0XHQ6IHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgTUFYX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IFRPTUxTZWN0aW9uIGZyb20gJy4vc2VjdGlvbic7XG5cbmNvbnN0IG5hbWUyY29kZSA9IC8qI19fUFVSRV9fKi9OdWxsKHtcblx0ZG9jdW1lbnQ6IDAsXG5cdHNlY3Rpb246IDEsXG5cdGhlYWRlcjogMixcblx0cGFpcnM6IDMsXG5cdHBhaXI6IDQsXG59ICAgICAgICAgKTtcblxuY29uc3QgSVNfSU5ERU5UID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eW1xcdCBdKiQvKS50ZXN0ICkoKTtcblxuY29uc3QgcmV0dXJuX2ZhbHNlID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRPTUxEb2N1bWVudCBleHRlbmRzIEFycmF5ICAgICAgICAgICAgICB7XG5cdFxuXHQgICAgICAgICBnZXQgWydjb25zdHJ1Y3RvciddICgpIHsgcmV0dXJuIEFycmF5OyB9XG5cdFxuXHQwID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpO1xuXHRcblx0ICAgICAgICAgYXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmUgICAgICAgICAgICAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbiAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckhlYWRlciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgO1xuXHQgICAgICAgICBpbmRlbnQgICAgICAgIDtcblx0ICAgICAgICAgXyAgICAgICAgIDtcblx0ICAgICAgICAgbnVsbERpc2FibGVkICAgICAgICAgO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZURpc2FibGVkICAgICAgICAgO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZUNvbW1hICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMgICAgICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdGNvbnN0IGludGVnZXIgPSBvcHRpb25zPy5pbnRlZ2VyO1xuXHRcdGlmICggaW50ZWdlcj09PXVuZGVmaW5lZCApIHsgdGhpcy5hc0ludGVnZXIgPSByZXR1cm5fZmFsc2U7IH1cblx0XHRlbHNlIGlmICggaW50ZWdlcj09PU1BWF9TQUZFX0lOVEVHRVIgKSB7IHRoaXMuYXNJbnRlZ2VyID0gaXNTYWZlSW50ZWdlcjsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW50ZWdlcj09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbnRlZ2VyKSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgYSBzYWZlIGludGVnZXJgKTsgfVxuXHRcdFx0Y29uc3QgbWF4ID0gaW50ZWdlcj49MCA/IGludGVnZXIgOiAtaW50ZWdlciAtIDE7XG5cdFx0XHRjb25zdCBtaW4gPSBpbnRlZ2VyPj0wID8gLWludGVnZXIgOiBpbnRlZ2VyO1xuXHRcdFx0dGhpcy5hc0ludGVnZXIgPSAobnVtYmVyICAgICAgICApID0+IGlzU2FmZUludGVnZXIobnVtYmVyKSAmJiBtaW48PW51bWJlciAmJiBudW1iZXI8PW1heDtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgbnVtYmVyYCk7IH1cblx0XHRjb25zdCBuZXdsaW5lID0gb3B0aW9ucz8ubmV3bGluZTtcblx0XHRpZiAoIG5ld2xpbmU9PT11bmRlZmluZWQgfHwgbmV3bGluZT09PSdcXG4nIHx8IG5ld2xpbmU9PT0nXFxyXFxuJyApIHsgdGhpcy5uZXdsaW5lID0gbmV3bGluZSA/PyAnJzsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgdHlwZW9mIG5ld2xpbmU9PT0nc3RyaW5nJ1xuXHRcdFx0XHQ/IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSB2YWxpZCBUT01MIG5ld2xpbmVgKVxuXHRcdFx0XHQ6IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgc3RyaW5nYCk7XG5cdFx0fVxuXHRcdGNvbnN0IGFyb3VuZCA9IG5hbWUyY29kZVtvcHRpb25zPy5uZXdsaW5lQXJvdW5kID8/ICdoZWFkZXInXSA/PyBuYW1lMmNvZGUuaGVhZGVyO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0Y29uc3QgaW5kZW50ID0gb3B0aW9ucz8uaW5kZW50O1xuXHRcdGlmICggaW5kZW50PT09dW5kZWZpbmVkICkgeyB0aGlzLmluZGVudCA9ICdcXHQnOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nc3RyaW5nJyApIHtcblx0XHRcdGlmICggIUlTX0lOREVOVChpbmRlbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gb25seSBpbmNsdWRlIFRhYiBvciBTcGFjZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9IGluZGVudDtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nbnVtYmVyJyApIHtcblx0XHRcdGlmICggIWlzU2FmZUludGVnZXIoaW5kZW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnQ6JHtpbmRlbnR9fSkgaXMgb3V0IG9mIHJhbmdlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gJyAnLnJlcGVhdChpbmRlbnQpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBub3QgYmUgXCIke3R5cGVvZiBpbmRlbnR9XCIgdHlwZWApOyB9XG5cdFx0dGhpcy5fID0gb3B0aW9ucz8uVD09PScgJztcblx0XHR0aGlzLm51bGxEaXNhYmxlZCA9ICFvcHRpb25zPy54TnVsbDtcblx0XHRjb25zdCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGUgPSBvcHRpb25zPy54QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU7XG5cdFx0aWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nJyApIHtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZUNvbW1hID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nLCcgKSB7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlRGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRhcHBlbmRTZWN0aW9uICgpIHsgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGhdID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpOyB9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vL1xuXG5pbXBvcnQgVE9NTERvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCAocm9vdFRhYmxlICAgICAgICAgICAgICAgICwgb3B0aW9ucyAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZG9jdW1lbnQgPSBuZXcgVE9NTERvY3VtZW50KG9wdGlvbnMpO1xuXHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnRbMF07XG5cdHNlY3Rpb25bMF0gPSAnJztcblx0eCAgICAgIChzZWN0aW9uLmFzc2lnbkJsb2NrKGBgLCBgYCwgcm9vdFRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHJvb3RUYWJsZSkpKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0xICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uIHx8IGRvY3VtZW50W2RvY3VtZW50Lmxlbmd0aCAtIDFdIC5hcHBlbmROZXdsaW5lKCk7XG5cdHJldHVybiBkb2N1bWVudC5uZXdsaW5lID8gZG9jdW1lbnQuam9pbihkb2N1bWVudC5uZXdsaW5lKSA6IGRvY3VtZW50LmZsYXQoKTtcbn07XG5cbmV4cG9ydCB7IGxpdGVyYWwgfSBmcm9tICcuL2xpdGVyYWwnO1xuZXhwb3J0IHsgaW5saW5lLCBTZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuXG5pbXBvcnQgeyBMaW5lcywgbXVsdGlsaW5lU3RyaW5nLCBtdWx0aWxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4vc3RyaW5nJztcbmltcG9ydCB7IG11bHRpbGluZVRhYmxlIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgbXVsdGlsaW5lID0gKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gbXVsdGlsaW5lU3RyaW5nKCggJ1xcbicgKyB2YWx1ZSApLnNwbGl0KCdcXG4nKSAgICAgICAgICkgOlxuXHRcdFx0aXNBcnJheSh2YWx1ZSkgPyBtdWx0aWxpbmVTdHJpbmcoTGluZXModmFsdWUpKSA6XG5cdFx0XHRcdG11bHRpbGluZVRhYmxlKHZhbHVlKTtcblx0bXVsdGlsaW5lLmJhc2ljID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT5cblx0XHRtdWx0aWxpbmVCYXNpY1N0cmluZyhcblx0XHRcdHR5cGVvZiBsaW5lcz09PSdzdHJpbmcnXG5cdFx0XHRcdD8gKCAnXFxuJyArIGxpbmVzICkuc3BsaXQoJ1xcbicpICAgICAgICAgXG5cdFx0XHRcdDogTGluZXMobGluZXMpXG5cdFx0KTtcblx0ZnJlZXplKG11bHRpbGluZSk7XG5cdHJldHVybiBtdWx0aWxpbmU7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5cbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5pbXBvcnQgc3RyaW5naWZ5LCB7IFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBsaXRlcmFsIH0gZnJvbSAnLi9zdHJpbmdpZnkvJztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSB9IGZyb20gJy4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgaXNJbmxpbmUsIGlzU2VjdGlvbiB9IGZyb20gJy4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgY29tbWVudEZvciB9IGZyb20gJy4vdHlwZXMvY29tbWVudCc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBsaXRlcmFsLCBjb21tZW50Rm9yLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBsaXRlcmFsLCBjb21tZW50Rm9yLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG59KTtcbiJdLCJuYW1lcyI6WyJUeXBlRXJyb3IiLCJTeW50YXhFcnJvciIsIlJlZ0V4cCIsIlByb3h5IiwiYXBwbHkiLCJFcnJvciIsIldlYWtNYXAiLCJPYmplY3RfYXNzaWduIiwiT2JqZWN0X2NyZWF0ZSIsIlJlZmxlY3Rfb3duS2V5cyIsIk9iamVjdF9mcmVlemUiLCJXZWFrU2V0Iiwic2V0X2RlbCIsIm1hcF9nZXQiLCJtYXBfc2V0IiwiaXNBcnJheSIsImFkZCIsImhhcyIsIk51bGwiLCJvcmRlcmlmeV9OdWxsIiwiaXRlcmF0b3IkMC50aHJvd3MiLCJpdGVyYXRvciQwLndoZXJlIiwiY3JlYXRlIiwiUmFuZ2VFcnJvciIsInJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAiLCJ1bmRlZmluZWQiLCJCaWdJbnQiLCJOYXRpdmVEYXRlIiwib3B0aW9ucyQwLnplcm9EYXRldGltZSIsInBhcnNlIiwicGFyc2VJbnQiLCJpdGVyYXRvciQwLmxpbmVJbmRleCIsIm9wdGlvbnMkMC5hbGxvd0xvbmdlciIsIm9wdGlvbnMkMC51c2luZ0JpZ0ludCIsIm9wdGlvbnMkMC5JbnRlZ2VyTWluIiwib3B0aW9ucyQwLkludGVnZXJNYXgiLCJvcHRpb25zJDAuc0Vycm9yIiwiaXNGaW5pdGUiLCJvcHRpb25zJDAuVGFibGUiLCJvcHRpb25zJDAuY29sbGVjdCIsInJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCIsInJlZ2V4cHMkMC5MSVRFUkFMX1NUUklOR19leGVjIiwicmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjIiwiaXRlcmF0b3IkMC5tYXJrIiwib3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmciLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWNfMSIsInJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAiLCJyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSIsIlN5bWJvbCIsInJlZ2V4cHMkMC5fX0xJVEVSQUxfS0VZX2V4ZWMiLCJyZWdleHBzJDAuX19CQVJFX0tFWV9leGVjIiwicmVnZXhwcyQwLklTX0RPVF9LRVkiLCJyZWdleHBzJDAuRE9UX0tFWSIsIm9wdGlvbnMkMC5kaXNhYmxlRGlnaXQiLCJyZWdleHBzJDAuaXNBbWF6aW5nIiwib3B0aW9ucyQwLmVuYWJsZU51bGwiLCJvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSIsInJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucyQwLmFzU3RyaW5ncyIsIm9wdGlvbnMkMC5pbmxpbmVUYWJsZSIsIm9wdGlvbnMkMC5hc1RhYmxlcyIsIm9wdGlvbnMkMC5hc0FycmF5cyIsInJlZ2V4cHMkMC5WQUxVRV9SRVNUX2V4ZWMiLCJvcHRpb25zJDAuc0Zsb2F0Iiwib3B0aW9ucyQwLmFzRmxvYXRzIiwib3B0aW9ucyQwLmFzT2Zmc2V0RGF0ZVRpbWVzIiwib3B0aW9ucyQwLm1vcmVEYXRldGltZSIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZVRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zJDAuYXNCb29sZWFucyIsIm9wdGlvbnMkMC5hc051bGxzIiwib3B0aW9ucyQwLmFzSW50ZWdlcnMiLCJyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UiLCJvcHRpb25zJDAuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIm9wdGlvbnMkMC5wcmVzZXJ2ZUNvbW1lbnQiLCJyZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnJlc3QiLCJpdGVyYXRvciQwLm5leHQiLCJyZWdleHBzJDAuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyIsIkJ1ZmZlciIsIlVpbnQ4QXJyYXkiLCJvcHRpb25zJDAudXNlIiwiaXRlcmF0b3IkMC50b2RvIiwib3B0aW9ucyQwLlByb2Nlc3MiLCJpdGVyYXRvciQwLmRvbmUiLCJvcHRpb25zJDAuY2xlYXIiLCJhc3NpZ24iLCJBcnJheSIsIlN0cmluZyIsIk51bWJlciIsIkJvb2xlYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3RGLENBQUMsUUFBUSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDO0FBQ2hGLENBQUMsT0FBTyxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM3RSxDQUFDLENBQUM7QUFPVSxNQUFDLFNBQVMsZ0JBQWdCLEVBQUUsTUFBTTtBQUM5QyxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSztBQUN6QixFQUFFLE9BQU8sS0FBSyxHQUFHLFFBQVEsR0FBRyxlQUFlLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUNsRixHQUFHZSxTQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLO0FBQ3pCLEVBQUUsb0JBQW9CO0FBQ3RCLEdBQUcsT0FBTyxLQUFLLEdBQUcsUUFBUTtBQUMxQixNQUFNLEVBQUUsSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ2xDLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztBQUNsQixHQUFHLENBQUM7QUFDSixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQixDQUFDLE9BQU8sU0FBUyxDQUFDO0FBQ2xCLENBQUM7O0FDbEJELGdCQUFlLGFBQWEsT0FBTyxDQUFDO0FBQ3BDLENBQUMsT0FBTztBQUNSLFFBQUNjLE9BQUs7QUFDTixDQUFDLFNBQVM7QUFDVixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVO0FBQ2hELENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsU0FBUztBQUNwRCxDQUFDLFFBQVEsRUFBRSxTQUFTO0FBQ3BCLENBQUMsQ0FBQzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==