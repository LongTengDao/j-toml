/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.35.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TOML = factory());
})(this, (function () { 'use strict';

const version = '1.35.1';

const SyntaxError$1 = SyntaxError;

const RangeError$1 = RangeError;

const TypeError$1 = TypeError;

const RegExp$1 = RegExp;

const WeakMap$1 = WeakMap;

const get = WeakMap.prototype.get;

const set = WeakMap.prototype.set;

const create$1 = Object.create;

const isSafeInteger = Number.isSafeInteger;

const getOwnPropertyNames = Object.getOwnPropertyNames;

const freeze = Object.freeze;

const isPrototypeOf = Object.prototype.isPrototypeOf;

const undefined$1 = void null;

const NULL = (
	/* j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/Object.preventExtensions(Object.create(null))
		: null
	/* j-globals: null.prototype (internal) */
);

const bind = Function.prototype.bind;

const test = RegExp.prototype.test;

const exec = RegExp.prototype.exec;

const Reflect_apply = Reflect.apply;

const Proxy$1 = Proxy;

const toStringTag = typeof Symbol==='undefined' ? undefined$1 : Symbol.toStringTag;

const Object_defineProperty = Object.defineProperty;

const assign$1 = Object.assign;

const Object$1 = Object;

const floor = Math.floor;

const isArray$1 = Array.isArray;

const Infinity = 1/0;

const fromCharCode = String.fromCharCode;

const Array$1 = Array;

const hasOwnProperty = Object.prototype.hasOwnProperty;

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

const apply = Function.prototype.apply;

var isEnum = /*#__PURE__*/propertyIsEnumerable.call.bind(propertyIsEnumerable);
var hasOwn = (
	/* j-globals: Object.hasOwn (polyfill) */
	Object$1.hasOwn || /*#__PURE__*/function () {
		return hasOwnProperty.bind
			? hasOwnProperty.call.bind(hasOwnProperty)
			: function hasOwn (object, key) { return hasOwnProperty.call(object, key); };
	}()
	/* j-globals: Object.hasOwn (polyfill) */
);

var create = Object$1.create;
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
	/* j-globals: default (internal) */
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
	/* j-globals: default (internal) */
);

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.2.0
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

function __PURE__ (re        )         {
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}
function theRegExp (re        )         { return /*#__PURE__*/__PURE__(re); }

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

var clearRegExp$1 = clearRegExp;

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = /*#__PURE__*/create$1(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create$1(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index] ); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches         = sourcify(group[character] , needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\' + character; }
			sub_branches ? branches.push(character + sub_branches) : singleCharactersBranch.push(character);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0]  : '[' + singleCharactersBranch.join('') + ']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:' + branches.join('|') + ')'
		)
		+ ( noEmptyBranch ? '' : '?' );
}

/*¡ j-regexp */

const WeakSet$1 = WeakSet;

const has = WeakSet.prototype.has;

const add = WeakSet.prototype.add;

const del = WeakSet.prototype['delete'];

const keys = Object.keys;

const getOwnPropertySymbols = Object.getOwnPropertySymbols;

const Null$1 = (
	/* j-globals: null (internal) */
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
					if ( isEnum(source, key) ) { target[key] = source[key]; }
				}
			}
			return target;
		};
		function Nullify (constructor) {
			delete constructor.prototype.constructor;
			freeze(constructor.prototype);
			return constructor;
		}
		function Null (origin) {
			return origin===undefined$1
				? this
				: typeof origin==='function'
					? /*#__PURE__*/Nullify(origin)
					: /*#__PURE__*/assign(/*#__PURE__*/create(NULL), origin);
		}
		delete Null.name;
		//try { delete Null.length; } catch (error) {}
		Null.prototype = null;
		freeze(Null);
		return Null;
	}()
	/* j-globals: null (internal) */
);

const is = Object.is;

const Object_defineProperties = Object.defineProperties;

const fromEntries = Object.fromEntries;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

const ownKeys = Reflect.ownKeys;

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
		if ( hasOwn(target, key) ) {
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

const INLINES = new WeakMap$1                                                                     ();
const SECTIONS = new WeakSet$1                ();

const deInline = /*#__PURE__*/map_del.bind(INLINES)                                                                              ;
const deSection = /*#__PURE__*/del.bind(SECTIONS)                                                  ;

const isInline = /*#__PURE__*/map_has.bind(INLINES)                                                  ;
const ofInline = /*#__PURE__*/get.bind(INLINES)     
	                                                                          
	                                                               
	                                       
 ;
const beInline = /*#__PURE__*/set.bind(INLINES)     
	                                                                                  
	                                                                       
 ;
const inline =                                                         (value   , mode                , looping         )    => {
	if ( isArray$1(value) ) {
		if ( looping ) { mode = 3; }
		else {
			if ( mode===undefined$1 ) { mode = 3; }
			else if ( mode!==0 && mode!==1 && mode!==2 && mode!==3 ) {
				throw typeof mode==='number'
					? RangeError$1(`array inline mode must be 0 | 1 | 2 | 3, not including ${mode}`)
					: TypeError$1(`array inline mode must be "number" type, not including ${mode===null ? '"null"' : typeof mode}`);
			}
		}
		beInline(value, mode);
	}
	else {
		beInline(value, true);
		deSection(value);
	}
	return value;
};
const multilineTable =                                  (value   )    => {
	beInline(value, false);
	deSection(value);
	return value;
};
const multilineArray =                                       (value   )    => {
	deInline(value);
	return value;
};

const isSection = /*#__PURE__*/has.bind(SECTIONS)                                                                  ;
const beSection = /*#__PURE__*/add.bind(SECTIONS)                                                 ;
const Section =                            (table   )    => {
	if ( isArray$1(table) ) { throw TypeError$1(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	deInline(table);
	return table;
};

const INLINE = true;

const tables = new WeakSet$1       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                              ;

const implicitTables = new WeakSet$1       ();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
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
const pairs_add = /*#__PURE__*/add.bind(pairs);
const fromPair = /*#__PURE__*/has.bind(pairs)                                         ;
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

const Error$1 = {if:Error}.if;

//import * as options from './options';

const NONE                    = [];
let sourcePath         = '';
let sourceLines                    = NONE;
let lastLineIndex         = -1;
let lineIndex         = -1;

const throws = (error       )        => {
	//if ( sourceLines!==NONE ) { done(); options.clear(); }
	throw error;
};

const EOL = /\r?\n/;
const todo = (source        , path        )       => {
	if ( typeof path!=='string' ) { throw TypeError$1(`TOML.parse({ path })`); }
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
	nowrap (            argsMode                 )        {
		throw throws(Error$1(`TOML.parse(${argsMode ? `${argsMode}multilineStringJoiner` : `,{ joiner }`}) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
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

/* nested (readable) */

const Whitespace = /[ \t]/;

const PRE_WHITESPACE = /*#__PURE__*/newRegExp`
	^${Whitespace}+`.valueOf();

const { exec: VALUE_REST_exec } = /*#__PURE__*/newRegExp.s       `
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	(.*)
	$`.valueOf();

const { exec: LITERAL_STRING_exec } = /*#__PURE__*/newRegExp.s       `
	^
	'([^']*)'
	${Whitespace}*
	(.*)`.valueOf();

const { exec: MULTI_LINE_LITERAL_STRING_0_1_2 } = /*#__PURE__*/newRegExp.s           `
	^
	(.*?)
	'''('{0,2})
	${Whitespace}*
	(.*)`.valueOf();
const { exec: MULTI_LINE_LITERAL_STRING_0 } = /*#__PURE__*/newRegExp.s           `
	^
	(.*?)
	'''()
	${Whitespace}*
	(.*)`.valueOf();
let __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;

const SYM_WHITESPACE = /*#__PURE__*/newRegExp.s`
	^
	.
	${Whitespace}*`.valueOf();


const Tag = /[^\x00-\x1F"#'()<>[\\\]`{}\x7F]+/;

const { exec: KEY_VALUE_PAIR_exec } = /*#__PURE__*/newRegExp.s   `
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(.*)
	$`.valueOf();

const { exec: _VALUE_PAIR_exec } = /*#__PURE__*/newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.valueOf();

const { exec: TAG_REST_exec } = /*#__PURE__*/newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.valueOf();

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING = theRegExp(/[^\\"]+|\\.?|"(?!"")"?/sy);
const MULTI_LINE_BASIC_STRING_exec_0_length = (_        )         => {
	let lastIndex         = /*MULTI_LINE_BASIC_STRING.lastIndex = */0;
	while ( MULTI_LINE_BASIC_STRING.test(_) ) { lastIndex = MULTI_LINE_BASIC_STRING.lastIndex; }
	return lastIndex;
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab \<ws>newline
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// not \<ws>newline
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_        )          => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');/// op?

const BASIC_STRING_TAB______ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);
const BASIC_STRING__________ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
const BASIC_STRING_DEL______ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
const BASIC_STRING_DEL_SLASH = theRegExp(/[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
let __BASIC_STRING = BASIC_STRING_DEL_SLASH;
const BASIC_STRING_exec_1_endIndex = (line        )         => {
	let lastIndex         = __BASIC_STRING.lastIndex = 1;
	while ( __BASIC_STRING.test(line) ) { lastIndex = __BASIC_STRING.lastIndex; }
	lastIndex!==line.length && line[lastIndex]==='"' || throws(SyntaxError$1(`Bad basic string` + where(' at ')));
	return lastIndex;
};

const { test: IS_DOT_KEY } = theRegExp(/^[ \t]*\./);
const DOT_KEY = /^[ \t]*\.[ \t]*/;
const { exec: BARE_KEY_STRICT } = theRegExp(/^[\w-]+/);
const { exec: BARE_KEY_FREE } = theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/);
let __BARE_KEY_exec = BARE_KEY_FREE;
const { exec: LITERAL_KEY____ } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/);
const { exec: LITERAL_KEY_DEL } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/);
let __LITERAL_KEY_exec = LITERAL_KEY_DEL;
let supportArrayOfTables = true;

const TABLE_DEFINITION_exec_groups = (lineRest        , parseKeys                                                                                                 )                                                                                                   => {
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

const { test: CONTROL_CHARACTER_EXCLUDE_TAB____ } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/);
const { test: CONTROL_CHARACTER_EXCLUDE_TAB_DEL } = theRegExp(/[\x00-\x08\x0B-\x1F]/);
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

const NUM = /*#__PURE__*/newRegExp`
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
`.valueOf();
const { test: IS_AMAZING } = /*#__PURE__*/newRegExp`
	^(?:
		-?${NUM}
		(?:-${NUM})*
	|
		true
	|
		false
	)$
`.valueOf();
const { test: BAD_DXOB } = /*#__PURE__*/newRegExp`_(?![\dA-Fa-f])`.valueOf();
const isAmazing = (keys        )          => IS_AMAZING(keys) && !BAD_DXOB(keys);

let mustScalar          = true;

let ARGS_MODE                  = '';

/* options */

let useWhatToJoinMultilineString                = null;
let usingBigInt                 = true;
let IntegerMinNumber         = 0;
let IntegerMaxNumber         = 0;

              

                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
	                  
	                   
  
const ANY       = {
	test: () => true,
};
                       
	                                                    
 
const Keys = class KeysRegExp extends RegExp$1                 {
	                                   
	constructor (keys                   ) {
		super(`^${groupify(keys)}$`);
		let maxLength = -1;
		for ( let index = keys.length; index; ) {
			const { length } = keys[--index] ;
			if ( length>maxLength ) { maxLength = length; }
		}
		this.lastIndex = maxLength+1;
		return this;
	}
	         test (                  key        )          {
		return key.length<this.lastIndex && super.test(key);
	}
};
const isKeys = /*#__PURE__*/isPrototypeOf.bind(/*#__PURE__*/freeze(Keys.prototype))                                               ;
let KEYS$1       = ANY;
let preserveLiteral         ;
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

                  

                                            
let processor             = null;
let each              = null;
           
	                                                                                                      
	                                                                                                      
	                                                                                                      
 
const collect_on = (tag        , array              , table              , key         )       => {
	const _each = create$1(NULL)                                                                                                 ;
	_each._linked = each;
	_each.tag = tag;
	if ( table ) {
		_each.table = table;
		_each.key = key ;
	}
	if ( array ) {
		_each.array = array;
		_each.index = array.length;
	}
	each = _each;
};
const collect_off = ()        => { throw throws(SyntaxError$1(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
let collect                                                                                                                          = collect_off;
                                                      
const Process = ()          => {
	if ( each ) {
		const _processor = processor ;
		let _each              = each;
		each = null;
		return ()       => {
			const processor = _processor;
			let each              = _each ;
			_each = null;
			do { processor(each); }
			while ( each = each._linked );
		};
	}
	return null;
};

/* use & clear */

const clear = ()       => {
	KEYS$1 = ANY;
	useWhatToJoinMultilineString = processor = each = null;
	zeroDatetime = false;
};

const use = (specificationVersion         , multilineStringJoiner         , useBigInt         , keys         , xOptions          , argsMode                 )       => {
	
	ARGS_MODE = argsMode;
	
	let mixed         ;
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
			throw RangeError$1(`TOML.parse(,specificationVersion)`);
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE}multilineStringJoiner` : `,{ joiner }`})`); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`); }
		usingBigInt = null;
		useBigInt>=0
			? IntegerMinNumber = -( IntegerMaxNumber = useBigInt )
			: IntegerMaxNumber = -( IntegerMinNumber = useBigInt ) - 1;
	}
	
	if ( keys==null ) { KEYS$1 = ANY; }
	else {
		if ( !isKeys(keys) ) { throw TypeError$1(`TOML.parse(,{ keys })`); }
		KEYS$1 = keys;
	}
	
	if ( xOptions==null ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( typeof xOptions!=='object' ) {
		throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`})`);
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, string, literal, tag, ...unknown } = xOptions;
		const unknownNames = getOwnPropertyNames(unknown);
		if ( unknownNames.length ) { throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,{ ${unknownNames.join(', ')} }` : `,{ x: { ${unknownNames.join(', ')} } }`})`); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
		disableDigit = !!string;
		preserveLiteral = !!literal;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,{ tag }` : `,{ x: { tag } }`})`); }
			if ( !mixed ) { throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`}) xOptions.tag needs at least TOML 1.0 to support mixed type array`); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

const isView = ArrayBuffer.isView;

const isArrayBuffer = (
	/* j-globals: class.isArrayBuffer (internal) */
	/*#__PURE__*/ function () {
		if ( typeof ArrayBuffer==='function' ) {
			var byteLength_apply = apply.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get);
			return function isArrayBuffer (value) {
				try { byteLength_apply(value); }
				catch (error) { return false; }
				return true;
			};
		}
		return function isArrayBuffer () { return false; };
	}()
	/* j-globals: class.isArrayBuffer (internal) */
);

const TextDecoder$1 = TextDecoder;

const Symbol$1 = Symbol;

const previous                = Symbol$1('previous')       ;

              
	                                
		                                                  
		                                                  
	                  
  

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

const _literal                = Symbol$1('_literal')       ;

const LiteralObject =                                                             (literal         , value                                   ) => {
	const object = Object$1(value)                           ;
	object[_literal] = literal;
	return object;
};

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

const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

const defineProperties = (
	/* j-globals: null.defineProperties (internal) */
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
	/* j-globals: null.defineProperties (internal) */
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

const YMD = /*#__PURE__*/newRegExp`
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
`.valueOf();

const HMS = /*#__PURE__*/newRegExp`
	${_23_}:${_59_}:${_59_}
`.valueOf();

const OFFSET$ = /(?:[Zz]|[+-]\d\d:\d\d)$/;

const { exec: Z_exec } = theRegExp           (/(([+-])\d\d):(\d\d)$/);

const { exec: OFFSET_DATETIME_exec } = /*#__PURE__*/newRegExp   `
	^
	${YMD}
	[Tt ]
	${HMS}
	(?:\.\d{1,3}(\d*?)0*)?
	(?:[Zz]|[+-]${_23_}:${_59_})
	$`.valueOf();

const { exec: OFFSET_DATETIME_ZERO_exec } = /*#__PURE__*/newRegExp   `
	^
	${YMD}
	[Tt ]
	${HMS}
	()
	[Zz]
	$`.valueOf();

const { test: IS_LOCAL_DATETIME } = /*#__PURE__*/newRegExp`
	^
	${YMD}
	[Tt ]
	${HMS}
	(?:\.\d+)?
	$`.valueOf();

const { test: IS_LOCAL_DATE } = /*#__PURE__*/newRegExp`
	^
	${YMD}
	$`.valueOf();

const { test: IS_LOCAL_TIME } = /*#__PURE__*/newRegExp`
	^
	${HMS}
	(?:\.\d+)?
	$`.valueOf();

const T = /[ t]/;
const DELIMITER_DOT = /[-T:.]/g;
const DOT_ZERO = /\.?0+$/;
const ZERO = /\.(\d*?)0+$/;
const zeroReplacer = (match        , p1        ) => p1;

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

                                        
                                      
                                      
                                      
                                      
                                      
                                       
                                     
                                            
                             
                             

const Value = (ISOString        )        => ISOString.replace(ZERO, zeroReplacer).replace(DELIMITER_DOT, '');

const d = /./gs;
const d2u = (d        ) => '\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009'[d                                                             ] ;
const ValueOFFSET = (time        , more        )        => time<0
	? ( '' + ( time + 62167305540000 ) ).replace(d, d2u).padStart(14, '\u2000') + more.replace(d, d2u) + time
	: more
		? ( time + '.' ).padStart(16, '0') + more
		: ( '' + time ).padStart(15, '0');

const validateLeap = (literal        )          => {
	if ( literal.startsWith('02-29', 5) ) {
		const year         = +literal.slice(0, 4);
		return (
			year & 0b11 ? false :
				year%100 ? true :
					year%400 ? false :
						year%3200 ? true :
							false
		);
	}
	return true;
};
const { test: VALIDATE_LEAP } = /*#__PURE__*/newRegExp.s`^.....(?:06.30|12.31).23:59:59`.valueOf();

const DATE$1             = /*#__PURE__*/defineProperties(new NativeDate(0), /*#__PURE__*/getOwnPropertyDescriptors(NativeDate.prototype));

const OffsetDateTime_ISOString                = Symbol$1('OffsetDateTime_ISOString')       ;
const OffsetDateTime_value                = Symbol$1('OffsetDateTime_value')       ;
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE$1.setTime(+that[OffsetDateTime_value] + $);
	return DATE$1;
};
/*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number, reserveMore :boolean) => {
	if ( end ) {
		const string = '' + value;
		const size = end - start;
		if ( string.length>size ) { throw RangeError(); }///
		that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[OffsetDateTime_ISOString].slice(end);
	}
	const time = parse(that[OffsetDateTime_ISOString]);
	return that[OffsetDateTime_value] = ValueOFFSET(time, that[OffsetDateTime_value].includes('-')
		? that[OffsetDateTime_value].slice(14, that[OffsetDateTime_value].indexOf('-', 14))
		: that[OffsetDateTime_value].slice(15)
	);///time
};*///
const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString]        ;
	[OffsetDateTime_value]       ;
	
	         valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		validateLeap(literal) || throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		const with60 = literal.startsWith('60', 17);
		let without60 = with60 ? literal.slice(0, 17) + '59' + literal.slice(19) : literal;
		const { 1: more } = ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec(without60) : OFFSET_DATETIME_exec(without60) ) ?? throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		const time = parse$2(without60 = without60.replace(T, 'T').replace('z', 'Z'));
		if ( with60 ) {
			DATE$1.setTime(time);
			VALIDATE_LEAP(DATE$1.toISOString()) || throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		}
		super();
		this[OffsetDateTime_ISOString] = without60;
		this[OffsetDateTime_value] = ValueOFFSET(time, more);
		return this;
	}
	
	getUTCFullYear (                    )           { return OffsetDateTime_use(this).getUTCFullYear(); }
	///get year () :FullYear { return OffsetDateTime_get(this, 0, 4); }
	///set year (value :FullYear) { OffsetDateTime_set(this, 0, 4, value, true); }
	getUTCMonth (                    )        { return OffsetDateTime_use(this).getUTCMonth(); }
	///get month () { return OffsetDateTime_get(this, 5, 7); }
	///set month (value) { OffsetDateTime_set(this, 5, 7, value, true); }
	getUTCDate (                    )       { return OffsetDateTime_use(this).getUTCDate(); }
	///get day () :Date { return OffsetDateTime_get(this, 8, 10); }
	///set day (value :Date) { OffsetDateTime_set(this, 8, 10, value, true); }
	
	getUTCHours (                    )        { return OffsetDateTime_use(this).getUTCHours(); }
	///get hour () :Hours { return OffsetDateTime_get(this, 11, 13); }
	///set hour (value :Hours) { OffsetDateTime_set(this, 11, 13, value, true); }
	getUTCMinutes (                    )          { return OffsetDateTime_use(this).getUTCMinutes(); }
	///get minute () :Minutes { return OffsetDateTime_get(this, 14, 16); }
	///set minute (value :Minutes) { OffsetDateTime_set(this, 14, 16, value, true); }
	getUTCSeconds (                    )          { return OffsetDateTime_use(this).getUTCSeconds(); }
	///get second () :Seconds { return OffsetDateTime_get(this, 17, 19); }
	///set second (value :Seconds) { OffsetDateTime_set(this, 17, 19, value, true); }
	getUTCMilliseconds (                    )               { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	///get millisecond () :Milliseconds { return this[OffsetDateTime_value]%1000; }///
	/*set millisecond (value :Milliseconds) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		OffsetDateTime_set(this, 0, 0, 0, false);
	}*///
	///get microsecond () :Milliseconds
	///set microsecond (value :Milliseconds)
	///get nanosecond () :Milliseconds
	///set nanosecond (value :Milliseconds)
	
	getUTCDay (                    )      { return OffsetDateTime_use(this).getUTCDay(); }
	///get dayOfWeek () { return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay() || 7; }
	getTimezoneOffset (                    )                 {
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	///get offset () { return this[OffsetDateTime_ISOString].endsWith('Z') ? 'Z' : this[OffsetDateTime_ISOString].slice(-6); }
	/*set offset (value) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, this[OffsetDateTime_ISOString].endsWith('Z') ? -1 : -6) + value;
		OffsetDateTime_set(this, 0, 0, 0, true);
	}*///
	getTime (                    )       { return floor(+this[OffsetDateTime_value]); }///
	/*setTime (this :OffsetDateTime, value :Time) :void {
		value = DATE.setTime(value);
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this[OffsetDateTime_value] = ValueOFFSET(value, '');
		///return value;
	}*/
	
});

const LocalDateTime_ISOString                = Symbol$1('LocalDateTime_ISOString')       ;
const LocalDateTime_value                = Symbol$1('LocalDateTime_value')       ;
const LocalDateTime_get = (that                                    , start        , end        ) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that                                    , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError$1(); }///
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString]        ;
	[LocalDateTime_value]       ;
	
	         valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && validateLeap(literal) || throws(SyntaxError$1(`Invalid Local Date-Time ${literal}` + where(' at ')));
		super();
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = literal.replace(T, 'T')
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

const LocalDate_ISOString                = Symbol$1('LocalDate_ISOString')       ;
const LocalDate_value                = Symbol$1('LocalDate_value')       ;
const LocalDate_get = (that                                , start        , end        ) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError$1(); }///
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDate_ISOString].slice(end)
	);
};
const LocalDate = /*#__PURE__*/fpc(class LocalDate extends Datetime {
	
	[LocalDate_ISOString]        ;
	[LocalDate_value]       ;
	
	         valueOf (               )        { return this[LocalDate_value]; }
	toISOString (               )         { return this[LocalDate_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATE(literal) && validateLeap(literal) || throws(SyntaxError$1(`Invalid Local Date ${literal}` + where(' at ')));
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

const LocalTime_ISOString                = Symbol$1('LocalTime_ISOString')       ;
const LocalTime_value                = Symbol$1('LocalTime_value')       ;
const LocalTime_get = (that                                , start        , end        ) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError$1(); }///
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + string.padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
};
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
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt$1(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
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
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt$1(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
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

const BigInt$1 = BigInt;

const INTEGER_D = /[-+]?(?:0|[1-9][_\d]*)/;
const { test: BAD_D } = /*#__PURE__*/newRegExp`_(?!\d)`.valueOf();
const { test: IS_D_INTEGER } = /*#__PURE__*/newRegExp`^${INTEGER_D}$`.valueOf();
const { test: IS_XOB_INTEGER } = theRegExp(/^0(?:x[\dA-Fa-f][_\dA-Fa-f]*|o[0-7][_0-7]*|b[01][_01]*)$/);
const { test: BAD_XOB } = /*#__PURE__*/newRegExp`_(?![\dA-Fa-f])`.valueOf();
const UNDERSCORES$1 = /_/g;
const UNDERSCORES_SIGN = /_|^[-+]/g;

const IS_INTEGER = (literal        )          => ( IS_D_INTEGER(literal) || /*options.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal);

const BigIntInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	const bigInt         = literal[0]==='-'
		? -BigInt$1(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger
	||
	-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || -max-1n ) <= long <= ( max = 2n**(64n-1n)-1n || -min-1n )
	||
	throws(RangeError$1(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	const number = parseInt$1(literal.replace(UNDERSCORES$1, ''));
	isSafeInteger(number) || throws(RangeError$1(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
	const number         = parseInt$1(literal.replace(UNDERSCORES$1, ''));
	if ( IntegerMinNumber<=number && number<=IntegerMaxNumber ) { return number; }
	const bigInt         = literal[0]==='-'
		? -BigInt$1(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger
	||
	-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || -max-1n ) <= long <= ( max = 2n**(64n-1n)-1n || -min-1n )
	||
	throws(RangeError$1(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const isFinite$1 = isFinite;

const NaN$1 = 0/0;

const _NaN = -NaN$1;
const _Infinity$1 = -Infinity;
const { test: IS_FLOAT } = /*#__PURE__*/newRegExp`
	^
	${INTEGER_D}
	(?:
		\.\d[_\d]*
		(?:[eE][-+]?\d[_\d]*)?
	|
		[eE][-+]?\d[_\d]*
	)
	$`.valueOf();
const UNDERSCORES = /_/g;
const { test: IS_ZERO } = theRegExp(/^[-+]?0(?:\.0+)?(?:[eE][-+]?0+)?$/);
const { exec: NORMALIZED } = theRegExp   (/^[-0]?(\d*)(?:\.(\d+))?(?:e\+?(-?\d+))?$/);
const { exec: ORIGINAL } = theRegExp   (/^[-+]?0?(\d*)(?:\.(\d*?)0*)?(?:[eE]\+?(-?\d+))?$/);

const Float = (literal        )         => {
	if ( !IS_FLOAT(literal) || BAD_D(literal) ) {
		if ( sFloat ) {
			if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
			if ( literal==='-inf' ) { return _Infinity$1; }
			if ( literal==='nan' || literal==='+nan' ) { return NaN$1; }
			if ( literal==='-nan' ) { return _NaN; }
		}
		throw throws(SyntaxError$1(`Invalid Float ${literal}` + where(' at ')));
	}
	const withoutUnderscores         = literal.replace(UNDERSCORES, '');
	const number         = +withoutUnderscores;
	if ( sError ) {
		isFinite$1(number) || throws(RangeError$1(`Float ${literal} has been as big as inf` + where(' at ')));
		number || IS_ZERO(withoutUnderscores) || throws(RangeError$1(`Float ${literal} has been as little as ${literal[0]==='-' ? '-' : ''}0` + where(' at ')));
		const { 1: normalized_integer, 2: normalized_fractional = '', 3: normalized_exponent = '' } = NORMALIZED(number       ) ;
		const { 1: original_integer, 2: original_fractional = '', 3: original_exponent = '' } = ORIGINAL(withoutUnderscores) ;
		original_integer + original_fractional===normalized_integer + normalized_fractional
		&&
		original_exponent        - original_fractional.length===normalized_exponent        - normalized_fractional.length
		||
		throws(RangeError$1(`Float ${literal} has lost its exact and been ${number}` + where(' at ')));
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
			else { throw throws(Error$1(`Trying to define Table under non-Table value` + where(' at '))); }
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
			fromPair(lastTable) && throws(Error$1(`A table defined implicitly via key/value pair can not be accessed to via []` + where(', which at ')));
			directlyIfNot(lastTable) || throws(Error$1(`Duplicate Table definition` + where(' at ')));
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
	if ( !literal.startsWith(`'''`) ) {
		const $ = LITERAL_STRING_exec(literal) ?? throws(SyntaxError$1(`Bad literal string` + where(' at ')));
		const value = checkLiteralString($[1]);
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, value.length + 2), value) : value;
		return $[2];
	}
	const $ = __MULTI_LINE_LITERAL_STRING_exec(literal.slice(3));
	if ( $ ) {
		const value = checkLiteralString($[1]) + $[2];
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, value.length + 6), value) : value;
		return $[3];
	}
	const start = new mark('Multi-line Literal String', literal.length);
	const leadingNewline = !( literal = literal.slice(3) );
	if ( leadingNewline ) {
		literal = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
		if ( $ ) {
			const value = checkLiteralString($[1]) + $[2];
			table[finalKey] = preserveLiteral ? LiteralObject([ `'''`, literal.slice(0, value.length + 3) ], value) : value;
			return $[3];
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap(ARGS_MODE);
	for ( const lines                          = [ checkLiteralString(literal) ]; ; ) {
		const line         = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			const value = lines.join(useWhatToJoinMultilineString );
			if ( preserveLiteral ) {
				lines[lines.length - 1] += `'''`;
				leadingNewline ? lines.unshift(`'''`) : lines[0] = `'''${literal}`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return $[3];
		}
		lines[lines.length] = checkLiteralString(line);
	}
} )     
	                                                                       
	                                                                      
 ;

const assignBasicString = ( (table       , finalKey        , literal        )         => {
	if ( !literal.startsWith('"""') ) {
		const index = BASIC_STRING_exec_1_endIndex(literal);
		const value = BasicString(literal.slice(1, index));
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, index + 1), value) : value;
		return literal.slice(index + 1).replace(PRE_WHITESPACE, '');
	}
	let length = 3 + MULTI_LINE_BASIC_STRING_exec_0_length(literal.slice(3));
	if ( literal.length!==length ) {
		const $ = literal.slice(3, length);
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		const value = BasicString($) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, length), value) : value;
		return literal.slice(length).replace(PRE_WHITESPACE, '');
	}
	const start = new mark('Multi-line Basic String', length);
	const skipped        = ( literal = literal.slice(3) ) ? 0 : 1;
	if ( skipped ) {
		literal = start.must();
		let length = MULTI_LINE_BASIC_STRING_exec_0_length(literal);
		if ( literal.length!==length ) {
			const $ = literal.slice(0, length);
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString($, useWhatToJoinMultilineString , skipped) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			table[finalKey] = preserveLiteral ? LiteralObject([ '"""', literal.slice(0, length) ], value) : value;
			return literal.slice(length).replace(PRE_WHITESPACE, '');
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap(ARGS_MODE);
	ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal + '\n') || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
	for ( const lines                          = [ literal ]; ; ) {
		const line         = start.must();
		let length = MULTI_LINE_BASIC_STRING_exec_0_length(line);
		if ( line.length!==length ) {
			const $ = line.slice(0, length);
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString(lines.join('\n') + '\n' + $, useWhatToJoinMultilineString , skipped) + ( line.startsWith('"', length += 3) ? line.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			if ( preserveLiteral ) {
				skipped ? lines.unshift('"""') : lines[0] = `"""${literal}`;
				lines[lines.length] = `${$}"""`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line + '\n') || throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
		lines[lines.length] = line;
	}
} )     
	                                                                       
	                                                                      
 ;

const KEYS = /*#__PURE__*/Null$1        (null);
const commentFor = (key        )         => KEYS[key] ?? ( KEYS[key] = Symbol$1(key) );
const commentForThis                = Symbol$1('this')       ;

const { test: includesNewline } = theRegExp(/\r?\n/g);
const getCOMMENT = (table                                            , keyComment        )                     => {
	if ( keyComment in table ) {
		const comment = table[keyComment];
		if ( typeof comment!=='string' ) { throw TypeError$1(`the value of comment must be a string, while "${comment===null ? 'null' : typeof comment}" type is found`); }
		if ( includesNewline(comment) ) { throw SyntaxError$1(`the value of comment must be a string and can not include newline`); }
		return ` #${comment}`;///
	}
	return '';
};
const getComment =                    (table                                                                               , key   )                     => key in KEYS ? getCOMMENT(table, KEYS[key] ) : '';

const { test: IS_OFFSET$ } = theRegExp(OFFSET$);
const { test: IS_EMPTY } = theRegExp(/^\[[\t ]*]/);

const parseKeys = (rest        )                                                                => {
	let lineRest         = rest;
	const leadingKeys           = [];
	let lastIndex         = -1;
	for ( ; ; ) {
		lineRest || throws(SyntaxError$1(`Empty bare key` + where(' at ')));
		if ( lineRest[0]==='"' ) {
			const index         = BASIC_STRING_exec_1_endIndex(lineRest);
			KEYS$1.test(leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index))) || throws(Error$1(`Key not allowed` + where(' at ')));
			lineRest = lineRest.slice(index + 1);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key         = ( ( isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec )(lineRest) ?? throws(SyntaxError$1(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			KEYS$1.test(leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key) || throws(Error$1(`Key not allowed` + where(' at ')));
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
	if ( literal==='true' ) { asBooleans(lastArray)[lastArray.length] = true; }
	else if ( literal==='false' ) { asBooleans(lastArray)[lastArray.length] = false; }
	else if ( enableNull && literal==='null' ) { asNulls(lastArray)[lastArray.length] = null; }
	else if ( literal.includes(':') ) {
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
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
	}
	else {
		literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? asFloats(lastArray)[lastArray.length] = preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: asIntegers(lastArray)[lastArray.length] = preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
	return lineRest;
};

const equalStaticArray = function * (            table       , finalKey        , lineRest        )    {
	const staticArray        = table[finalKey] = newArray(STATICALLY);
	if ( IS_EMPTY(lineRest) ) {
		beInline(staticArray, lineRest[1]===']' ? 0 : 3);
		return lineRest.slice(lineRest.indexOf(']')).replace(SYM_WHITESPACE, '');
	}
	const start = new mark('Static Array', lineRest.length);
	let inline               = lineRest.startsWith('[ ') || lineRest.startsWith('[\t') ? 3 : 0;
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = null;
		lineRest = start.must().replace(PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) {
		inline===null || beInline(staticArray, inline);
		return lineRest.replace(SYM_WHITESPACE, '');
	}
	for ( ; ; ) {
		const rest             = push(staticArray, lineRest);
		lineRest = typeof rest==='string' ? rest : yield rest;
		while ( !lineRest || lineRest[0]==='#' ) {
			inline = null;
			lineRest = start.must().replace(PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = null;
				lineRest = start.must().replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			throw throws(SyntaxError$1(`Unexpect character in static array item value` + where(', which is found at ')));
		}
	}
	inline===null || beInline(staticArray, inline);
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
	if ( literal==='true' ) { table[finalKey] = true; }
	else if ( literal==='false' ) { table[finalKey] = false; }
	else if ( enableNull && literal==='null' ) { table[finalKey] = null; }
	else if ( literal.includes(':') ) {
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
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		table[finalKey] = new LocalDate(literal);
	}
	else {
		table[finalKey] = literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
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
					lineRest[0]==='#' || throws(SyntaxError$1(`Unexpect charachtor after table header` + where(' at ')));
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
				preserveComment && lineRest && ( lastSectionTable[commentForThis] = asArrayItem ? lineRest.slice(1) : table[commentFor(finalKey)] = lineRest.slice(1) );
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError$1(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				const forComment             = ForComment(lastSectionTable, line);
				let rest             = assign(forComment);
				typeof rest==='string' || ( rest = x        (rest) );
				if ( rest ) {
					rest[0]==='#' || throws(SyntaxError$1(`Unexpect charachtor after key/value pair` + where(' at ')));
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); }
				}
			}
		}
	}
	return rootTable;
};

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

const DATE = Date.prototype;

const valueOf$2 = String.prototype.valueOf;

const isString = (
	/* j-globals: class.isString (internal) */
	/*#__PURE__*/ function () {
		if ( apply.bind ) {
			var valueOf_apply = apply.bind(valueOf$2);
			return function isString (value) {
				try { valueOf_apply(value); }
				catch (error) { return false; }
				return true;
			};
		}
		return function isString (value) {
			try { valueOf$2.apply(value); }
			catch (error) { return false; }
			return true;
		};
	}()
	/* j-globals: class.isString (internal) */
);

const valueOf$1 = Number.prototype.valueOf;

const isNumber = (
	/* j-globals: class.isNumber (internal) */
	/*#__PURE__*/ function () {
		if ( apply.bind ) {
			var valueOf_apply = apply.bind(valueOf$1);
			return function isNumber (value) {
				try { valueOf_apply(value); }
				catch (error) { return false; }
				return true;
			};
		}
		return function isNumber (value) {
			try { valueOf$1.apply(value); }
			catch (error) { return false; }
			return true;
		};
	}()
	/* j-globals: class.isNumber (internal) */
);

const isBigInt = (
	/* j-globals: class.isBigInt (internal) */
	/*#__PURE__*/ function () {
		if ( typeof BigInt==='function' ) {
			var valueOf_apply = apply.bind(BigInt.prototype.valueOf);
			return function isBigInt (value) {
				try { valueOf_apply(value); }
				catch (error) { return false; }
				return true;
			};
		}
		return function isBigInt () { return false; };
	}()
	/* j-globals: class.isBigInt (internal) */
);

const valueOf = BigInt.prototype.valueOf;

const isBoolean = (
	/* j-globals: class.isBoolean (internal) */
	/*#__PURE__*/ function () {
		if ( apply.bind ) {
			var valueOf_apply = apply.bind(valueOf);
			return function isBoolean (value) {
				try { valueOf_apply(value); }
				catch (error) { return false; }
				return true;
			};
		}
		return function isBoolean (value) {
			try { valueOf.apply(value); }
			catch (error) { return false; }
			return true;
		};
	}()
	/* j-globals: class.isBoolean (internal) */
);

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

const { test: NEED_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F'\x7F]/);
const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
const { test: NEED_ESCAPE } = theRegExp(/^[\x00-\x08\x0A-\x1F"\\\x7F]/);
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
const singlelineBasicString = (value        )                => {
	if ( value ) {
		const parts = value.match(BY_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `""`;
};

const { test: NEED_MULTILINE_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F\x7F]|'''/);
const { test: multilineNeedBasic } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]|'''/);
const { test: REAL_MULTILINE_ESCAPE } = theRegExp(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/);
const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
const { test: NEED_MULTILINE_ESCAPE } = theRegExp(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/);
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

                                                    
const Lines = (lines                   )        => ( lines = [ '', ...lines ]          ).length===1 ? [ '', '' ] : lines         ;

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
	return lines                                                                                   ;
};

const multilineBasicString = (lines       )                                         => {
	let index = lines.length - 1;
	escape_multiline(lines, index);
	lines[index] += lines[0] = '"""';
	while ( --index ) { escape_multiline(lines, index); }
	return lines                                          ;
};

const multilineLiteralString = (lines       )                                         => {
	lines[lines.length - 1] += lines[0] = '\'\'\'';
	return lines                                          ;
};

const Float64Array$1 = Float64Array;

const Uint8Array$1 = Uint8Array;

const _Infinity = -Infinity;

const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal        ) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float64Array = new Float64Array$1([ NaN$1 ]);
const uint8Array = new Uint8Array$1(float64Array.buffer);
const NaN_7 = uint8Array[7] ;

const float = NaN_7===new Uint8Array$1(new Float64Array$1([ -NaN$1 ]).buffer)[7] 
	? (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan'
	: (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : ( float64Array[0] = value, uint8Array[7] )===NaN_7 ? 'nan' : '-nan';

const isDate = /*#__PURE__*/isPrototypeOf.bind(DATE)                                                ;

const { test: BARE } = theRegExp(/^[\w-]+$/);
const $Key$ = (key        )         => BARE(key) ? key : singlelineString(key);

const FIRST = /[^.]+/;
const literalString = (value        )                => `'${value}'`;
const $Keys = (keys        )         => isAmazing(keys) ? keys.replace(FIRST, literalString) : keys==='null' ? `'null'` : keys;

class TOMLSection extends Array$1         {
	
	                 document              ;
	
	constructor (document              ) {
		super();
		this.document = document;
		return this;
	}
	
	[Symbol$1.toPrimitive] () { return this.join(this.document.newline); }
	
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
				const { length } = value;
				if ( length ) {
					let firstItem = value[0];
					if ( isSection(firstItem) ) {
						const tableHeader = `[[${documentKeys}]]`         ;
						const documentKeys_ = documentKeys + '.'                ;
						let index = 0;
						let table                 = firstItem;
						for ( ; ; ) {
							const section = document.appendSection();
							section[0] = tableHeader + getCOMMENT(table, commentForThis);
							if ( newlineUnderHeader ) {
								section[1] = '';
								yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
								newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
							}
							else {
								yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
								newlineUnderSectionButPair && section.appendNewline();
							}
							if ( ++index===length ) { break; }
							table = ( value                           )[index] ;
							if ( !isSection(table) ) { throw TypeError$1(`the first table item marked by Section() means the parent array is an array of tables, which can not include other types or table not marked by Section() any more in the rest items`); }
						}
						continue;
					}
					else { let index = 1; while ( index!==length ) { if ( isSection(value[index++] ) ) { throw TypeError$1(`if an array is not array of tables, it can not include any table that marked by Section()`); } } }
				}
			}
			else {
				if ( isSection(value) ) {
					const section = document.appendSection();
					section[0] = `[${documentKeys}]${
						document.preferCommentForThis
							? getCOMMENT(value, commentForThis) || getComment(table, tableKey)
							: getComment(table, tableKey) || getCOMMENT(value, commentForThis)
					}`;
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
			const valueKeysIfValueIsDottedTable = this.value('', value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				--this.length;
				yield this.assignBlock(documentKeys + '.'                , sectionKeys + '.'                , value                                   , valueKeysIfValueIsDottedTable);
				newlineAfterDotted && this.appendNewline();
			}
			else {
				this.appendInlineIf = getComment(table, tableKey);
				newlineAfterPair && this.appendNewline();
			}
		}
	}
	
	        value (indent        , value                , returnValueKeysIfValueIsDottedTable         )                  {
		switch ( typeof value ) {
			case 'object':
				if ( value===null ) {
					if ( this.document.nullDisabled ) { throw TypeError$1(`toml can not stringify "null" type value without truthy options.xNull`); }
					this.appendInline = 'null';
					break;
				}
				const inlineMode = ofInline(value);
				if ( isArray$1(value) ) {
					inlineMode===undefined$1
						? this.staticArray(indent, value)
						: this.singlelineArray(indent, value, this.document.$singlelineArray ?? inlineMode);
					break;
				}
				if ( inlineMode!==undefined$1 ) {
					inlineMode || this.document.multilineTableDisabled
						? this.inlineTable(indent, value                        )
						: this.multilineTable(indent, value                        , this.document.multilineTableComma);
					break;
				}
				if ( isDate(value) ) {
					this.appendInline = value.toISOString().replace('T', this.document.T).replace('Z', this.document.Z);
					break;
				}
				if ( _literal in value ) {
					const literal = ( value                                                                       )[_literal];
					if ( typeof literal==='string' ) { this.appendInline = literal; }
					else if ( isArray$1(literal) ) {
						const { length } = literal;
						if ( length ) {
							this.appendInline = literal[0];
							let index = 1;
							while ( index!==length ) { this.appendLine = literal[index++] ; }
						}
						else { throw TypeError$1(`literal value is broken`); }
					}
					else { throw TypeError$1(`literal value is broken`); }
					break;
				}
				if ( isString(value) ) { throw TypeError$1(`TOML.stringify refuse to handle [object String]`); }
				if ( isNumber(value) ) { throw TypeError$1(`TOML.stringify refuse to handle [object Number]`); }
				if ( isBigInt(value) ) { throw TypeError$1(`TOML.stringify refuse to handle [object BigInt]`); }
				if ( isBoolean(value) ) { throw TypeError$1(`TOML.stringify refuse to handle [object Boolean]`); }
				if ( returnValueKeysIfValueIsDottedTable ) {
					const keys = getOwnPropertyNames(value                        );
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
				}
				else {
					this.inlineTable(indent, value                        );
				}
				break;
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
	
	        singlelineArray (indent        , staticArray                      , inlineMode               ) {
		const { length } = staticArray;
		if ( length ) {
			this.appendInline = inlineMode&0b10 ? '[ ' : '[';
			this.value(indent, staticArray[0] , false);
			let index = 1;
			while ( index!==length ) {
				this.appendInline = ', ';
				this.value(indent, staticArray[index++] , false);
			}
			this.appendInline = inlineMode&0b10 ? ' ]' : ']';
		}
		else { this.appendInline = inlineMode&0b01 ? '[ ]' : '[]'; }
	}
	        staticArray (indent        , staticArray                      ) {
		this.appendInline = '[';
		const indent_ = indent + this.document.indent;
		const { length } = staticArray;
		let index = 0;
		while ( index!==length ) {
			this.appendLine = indent_;
			this.value(indent_, staticArray[index++] , false);
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
			const valueKeysIfValueIsDottedTable = this.value(indent, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				this[this.length - 1] = this[this.length - 1] .slice(0, -before_value.length);
				this.assignInline(indent, value                        , keys + '.'                , valueKeysIfValueIsDottedTable);
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
			const valueKeysIfValueIsDottedTable = this.value(indent_, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				--this.length;
				this.assignMultiline(indent, value                        , keys + '.'                , valueKeysIfValueIsDottedTable, comma);
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

const { test: IS_INDENT } = theRegExp(/^[\t ]*$/);

const return_false = () => false;

class TOMLDocument extends Array$1              {
	
	         get ['constructor'] () { return Array$1; }
	
	0 = new TOMLSection(this);
	
	         asInteger                                          = return_false;
	         newline                     = '';
	         newlineUnderSection          = true;
	         newlineUnderSectionButPair          = true;
	         newlineUnderHeader          = true;
	         newlineUnderPair          = false;
	         newlineUnderPairButDotted          = false;
	         newlineUnderDotted          = false;
	         indent         = '\t';
	         T                  = 'T';
	         Z            = 'Z';
	         nullDisabled          = true;
	         multilineTableDisabled          = true;
	         multilineTableComma          ;
	         preferCommentForThis          = false;
	         $singlelineArray                ;
	
	constructor (options                  ) {
		
		super();
		
		if ( options==null ) { return this; }
		
		const { integer } = options;
		if ( integer===undefined ) ;
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError$1(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError$1(`TOML.stringify(,{integer}) can only be number`); }
		
		const { newline } = options;
		if ( newline===undefined ) ;
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError$1(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError$1(`TOML.stringify(,{newline}) can only be string`);
		}
		
		const { preferCommentFor } = options;
		if ( preferCommentFor===undefined ) ;
		else if ( preferCommentFor==='this' || preferCommentFor==='key' ) { this.preferCommentForThis = preferCommentFor==='this'; }
		else { throw TypeError$1(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
		
		const around = name2code[options.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		
		const { indent } = options;
		if ( indent===undefined ) ;
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError$1(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError$1(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError$1(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		
		const { T } = options;
		if ( T===undefined ) ;
		else if ( T===' ' || T==='t' || T==='T' ) { this.T = T; }
		else { throw TypeError$1(`TOML.stringify(,{T}) can only be "T" or " " or "t"`); }
		
		const { Z } = options;
		if ( Z===undefined ) ;
		else if ( Z==='z' || Z==='Z' ) { this.Z = Z; }
		else { throw TypeError$1(`TOML.stringify(,{Z}) can only be "Z" or "z"`); }
		
		if ( options.xNull ) { this.nullDisabled = false; }
		
		const { xBeforeNewlineInMultilineTable } = options;
		if ( xBeforeNewlineInMultilineTable===undefined ) ;
		else if ( xBeforeNewlineInMultilineTable==='' || xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
		}
		else { throw TypeError$1(`TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`); }
		
		const $singlelineArray = options.forceInlineArraySpacing;
		switch ( $singlelineArray ) {
			case undefined:
				break;
			case 0:
			case 1:
			case 2:
			case 3:
				this.$singlelineArray = $singlelineArray;
				break;
			default:
				throw typeof $singlelineArray==='number'
					? RangeError$1(`array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`)
					: TypeError$1(`array inline mode must be "number" type, not including ${$singlelineArray===null ? '"null"' : typeof $singlelineArray}`);
		}
		
		return this;
		
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

const linesFromStringify = new WeakSet$1                   ();
const beLinesFromStringify = /*#__PURE__*/add.bind(linesFromStringify);
const isLinesFromStringify = /*#__PURE__*/has.bind(linesFromStringify);
const stringify = (rootTable                , options                  )                    => {
	const document = new TOMLDocument(options);
	const section = document[0];
	section[0] = '';
	x      (section.assignBlock(``, ``, rootTable, getOwnPropertyNames(rootTable)));
	document.newlineUnderSectionButPair && section.length!==1 && section.appendNewline();
	document.newlineUnderSection || document[document.length - 1] .appendNewline();
	if ( document.newline ) { return document.join(document.newline); }
	const lines = document.flat();
	beLinesFromStringify(lines);
	return lines;
};
const multiline = /*#__PURE__*/( () => {
	const multiline = (value                                                   , string         ) =>
		typeof value==='string' ? LiteralObject(( multilineNeedBasic(value) ? multilineBasicString : multilineLiteralString )(( '\n' + value ).split('\n')         ), value) :
			isArray$1(value) ? LiteralObject(multilineString(Lines(value)), typeof string==='string' ? string : Null$1(null)) :
				multilineTable(value);
	multiline.basic = (lines                            , string         ) =>
		typeof lines==='string'
			? LiteralObject(multilineBasicString(( '\n' + lines ).split('\n')         ), lines)
			: LiteralObject(multilineBasicString(Lines(lines)), typeof string==='string' ? string : Null$1(null))
	;
	multiline.array = multilineArray;
	freeze(multiline);
	return multiline;
} )();
const basic = (value        ) => LiteralObject(singlelineBasicString(value), value);
const literal = (literal                               , ...chars          ) => {
	if ( typeof literal==='string' ) {
		if ( chars.length===1 ) {
			return LiteralObject(literal.includes('\n') ? literal.split('\n')                            : literal, chars[0]                            );
		}
	}
	else {
		let index = chars.length;
		if ( index ) {
			const { raw } = literal;
			literal = raw[index] ;
			while ( index ) { chars[--index] += raw[index] ; }
			literal = chars.join('') + literal;
		}
		else { literal = literal.raw[0] ; }
	}
	return LiteralObject(literal.includes('\n') ? literal.split('\n')                            : literal, Null$1(null));
};

const textDecoder = /*#__PURE__*/new TextDecoder$1('utf-8', Null$1({ fatal: true, ignoreBOM: false }));
const binary2string = (arrayBufferLike                          )         => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError$1(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error$1(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.`); }
};
const isBinaryLike = (value        )                                    => 'byteLength' in value;///

const { test: includesNonScalar } = theRegExp(/[\uD800-\uDFFF]/u);
const assertFulScalar = (string        )       => {
	if ( clearRegExp$1(includesNonScalar(string)) ) { throw Error$1(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.`); }
};

let holding          = false;

const parse = (source        , specificationVersion                                   , multilineStringJoiner                                                                                                                       , bigint                                       , x                              , argsMode                 )        => {
	let sourcePath         = '';
	if ( typeof source==='object' && source ) {
		if ( isArray$1(source) ) { throw TypeError$1(isLinesFromStringify(source) ? `TOML.parse(array from TOML.stringify(,{newline?}))` : `TOML.parse(array)`); }
		else if ( isBinaryLike(source) ) { source = binary2string(source); }
		else {
			sourcePath = source.path;
			if ( typeof sourcePath!=='string' ) { throw TypeError$1(`TOML.parse(source.path)`); }
			const { data, require: req = typeof require==='function' ? require : undefined$1 } = source;
			if ( req ) {
				const dirname_ = req.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '');
				if ( dirname_ ) {
					sourcePath = ( req                                          )('path').resolve(dirname_, sourcePath);
					if ( typeof sourcePath!=='string' ) { throw TypeError$1(`TOML.parse(source.require('path').resolve)`); }
				}
				if ( data===undefined$1 ) {
					const data = ( req                                      )('fs').readFileSync(sourcePath);
					if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
					else { throw TypeError$1(`TOML.parse(source.require('fs').readFileSync)`); }
				}
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError$1(`TOML.parse(source.data)`); }
			}
			else {
				if ( data===undefined$1 ) { throw TypeError$1(`TOML.parse(source.data|source.require)`); }
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError$1(`TOML.parse(source.data)`); }
			}
		}
	}
	else if ( typeof source==='string' ) { assertFulScalar(source); }
	else { throw TypeError$1(`TOML.parse(source)`); }
	let joiner                    ;
	let keys                                 ;
	if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
		if ( bigint!==undefined$1 || x!==undefined$1 ) { throw TypeError$1(`options mode ? args mode`); }
		joiner = multilineStringJoiner.joiner;
		bigint = multilineStringJoiner.bigint;
		keys = multilineStringJoiner.keys;
		x = multilineStringJoiner.x;
		argsMode = '';
	}
	else { joiner = multilineStringJoiner; }
	let rootTable       ;
	let process                 ;
	if ( holding ) { throw Error$1(`parsing during parsing.`); }
	holding = true;
	try {
		use(specificationVersion, joiner, bigint, keys, x, argsMode);
		todo(source, sourcePath);
		source && source[0]==='\uFEFF' && throws(TypeError$1(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')));
		rootTable = Root();
		process = Process();
	}
	finally {
		done();//clearWeakSets();
		clear();
		holding = false;
		clearRegExp$1();
	}
	process?.();
	return rootTable;
};

const parse$1 = /*#__PURE__*/assign$1(
	(source        , specificationVersion                                   , multilineStringJoiner         , useBigInt                   , xOptions                   ) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions, ',,')
			: parse(source, 1.0, specificationVersion          , multilineStringJoiner                                       , useBigInt                    , ',')
	,
	{
		'1.0': (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
		1.0: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions, ','),
		0.5: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions, ','),
		0.4: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions, ','),
		0.3: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions, ','),
		0.2: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions, ','),
		0.1: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
	}
);

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
	stringify,
	Section, inline, multiline, basic, literal, commentFor, commentForThis,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
	Keys,
});

return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2dyb3VwaWZ5LnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvbm9uLWF0b20udHMiLCJ0eXBlcy9UYWJsZS50cyIsIml0ZXJhdG9yLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjM1LjEnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovX19QVVJFX18ocmUpOyB9O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gIVU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9ICFJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/ICFNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/ICFTIDogbnVsbDtcblx0cmV0dXJuIHJlO1xufVxuXG52YXIgUkVfYmluZCA9IGJpbmQgJiYgLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWluY2x1ZGVzKGZsYWdzLCAndScpLFxuXHRcdEk6ICFpbmNsdWRlcyhmbGFncywgJ2knKSxcblx0XHRNOiAhaW5jbHVkZXMoZmxhZ3MsICdtJyksXG5cdFx0UzogIWluY2x1ZGVzKGZsYWdzLCAncycpLFxuXHRcdGZsYWdzOiBmbGFnc1xuXHR9O1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IC8qI19fUFVSRV9fKi9Db250ZXh0KCcnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlcblx0PyAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChSRSwgdGhpc0FyZywgYXJncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhcHBseShSRSwgQ09OVEVYVCwgYXJncyk7IH1cblx0XHQsXG5cdFx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdFx0LFxuXHRcdGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdCxcblx0XHRwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0fSlcblx0OiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdFJFLmFwcGx5ID0gUkUuYXBwbHk7XG5cdFx0dmFyIG5ld1JlZ0V4cCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KENPTlRFWFQsIGFyZ3VtZW50cyAgICAgICApOyB9ICAgICAgIDtcblx0XHR2YXIgZCA9IDE7XG5cdFx0dmFyIGcgPSBkKjI7XG5cdFx0dmFyIGkgPSBnKjI7XG5cdFx0dmFyIG0gPSBpKjI7XG5cdFx0dmFyIHMgPSBpKjI7XG5cdFx0dmFyIHUgPSBzKjI7XG5cdFx0dmFyIHkgPSB1KjI7XG5cdFx0dmFyIGZsYWdzID0geSoyIC0gMTtcblx0XHR3aGlsZSAoIGZsYWdzLS0gKSB7XG5cdFx0XHQoIGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHRcdG5ld1JlZ0V4cFtjb250ZXh0LmZsYWdzXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICApOyB9O1xuXHRcdFx0fSApKENvbnRleHQoXG5cdFx0XHRcdCggZmxhZ3MgJiBkID8gJycgOiAnZCcgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBnID8gJycgOiAnZycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBpID8gJycgOiAnaScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBtID8gJycgOiAnbScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBzID8gJycgOiAncycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB1ID8gJycgOiAndScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB5ID8gJycgOiAneScgKVxuXHRcdFx0KSk7XG5cdFx0fVxuXHRcdHJldHVybiBmcmVlemUgPyBmcmVlemUobmV3UmVnRXhwKSA6IG5ld1JlZ0V4cDtcblx0fSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gLyojX19QVVJFX18qL2NyZWF0ZShOVUxMKSAgICAgICAgIDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSApOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0gLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcgKyBjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyICsgc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyYWN0ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdICA6ICdbJyArIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykgKyAnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyArIGJyYW5jaGVzLmpvaW4oJ3wnKSArICcpJ1xuXHRcdClcblx0XHQrICggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHsgcGF0aCB9KWApOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY2xhc3MgbWFyayB7XG5cdCAgICAgICAgICAgICAgICAgbGluZUluZGV4ID0gbGluZUluZGV4O1xuXHQgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICAgICAgICAgIHJlc3RDb2x1bW4gICAgICAgIDtcblx0Y29uc3RydWN0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCByZXN0Q29sdW1uICAgICAgICApIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMucmVzdENvbHVtbiA9IHJlc3RDb2x1bW47XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0bXVzdCAoICAgICAgICAgICkgICAgICAgICB7XG5cdFx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7dGhpcy50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0XHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblx0fVxuXHRub3dyYXAgKCAgICAgICAgICAgIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdFx0dGhyb3cgdGhyb3dzKEVycm9yKGBUT01MLnBhcnNlKCR7YXJnc01vZGUgPyBgJHthcmdzTW9kZX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCByb3dJbmRleCAgICAgICAgID0gbGluZUluZGV4LCBjb2x1bW5OdW1iZXIgICAgICAgICA9IDApICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7cm93SW5kZXggKyAxfToke2NvbHVtbk51bWJlcn0pYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtyb3dJbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW3Jvd0luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBWQUxVRV9SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IExJVEVSQUxfU1RSSU5HX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5jb25zdCB7IGV4ZWM6IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYC52YWx1ZU9mKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCB7IGV4ZWM6IEtFWV9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogX1ZBTFVFX1BBSVJfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IFRBR19SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJdK3xcXFxcLj98XCIoPyFcIlwiKVwiPy9zeSk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAvKk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9ICovMDtcblx0d2hpbGUgKCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy50ZXN0KF8pICkgeyBsYXN0SW5kZXggPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0cmV0dXJuIGxhc3RJbmRleDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBUYWIgXFw8d3M+bmV3bGluZVxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIG5vdCBcXDx3cz5uZXdsaW5lXG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vLyBvcD9cblxuY29uc3QgQkFTSUNfU1RSSU5HX1RBQl9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5leHBvcnRcbmNvbnN0IHsgdGVzdDogSVNfRE9UX0tFWSB9ID0gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCB7IGV4ZWM6IEJBUkVfS0VZX1NUUklDVCB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKy8pO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9GUkVFIH0gPSB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5jb25zdCB7IGV4ZWM6IExJVEVSQUxfS0VZX19fXyB9ID0gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9ERUwgfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLyk7XG5leHBvcnRcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdCggbGluZVJlc3QubGVuZ3RoPjEgPyBsaW5lUmVzdFsxXT09PSddJz09PWFzQXJyYXlJdGVtIDogIWFzQXJyYXlJdGVtICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgYnV0IG1pc3NpbmcgYXQgJykpKTtcblx0dGFnIHx8IGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCB7IHRlc3Q6IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pO1xuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLyk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRiWzAxXVtfMDFdKlxuXHRcdHxcblx0XHRcdG9bMC03XVtfMC03XSpcblx0XHR8XG5cdFx0XHR4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qXG5cdFx0fFxuXHRcdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdFx0KVxuXHR8XG5cdFx0WzEtOV1bX1xcZF0qXG5cdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdHxcblx0XHRpbmZcblx0fFxuXHRcdG5hblxuXHQpXG5gLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfQU1BWklORyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IEJBRF9EWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmV4cG9ydCBjb25zdCBpc0FtYXppbmcgPSAoa2V5cyAgICAgICAgKSAgICAgICAgICA9PiBJU19BTUFaSU5HKGtleXMpICYmICFCQURfRFhPQihrZXlzKTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCB7IFBsYWluVGFibGUsIE9yZGVyZWRUYWJsZSB9IGZyb20gJy4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4vcmVnZXhwcyc7XG5cbmV4cG9ydCBsZXQgbXVzdFNjYWxhciAgICAgICAgICA9IHRydWU7XG5cbmV4cG9ydCBsZXQgQVJHU19NT0RFICAgICAgICAgICAgICAgICAgPSAnJztcblxuLyogb3B0aW9ucyAqL1xuXG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgICAgICAgICAgICAgICAgPSBudWxsO1xuZXhwb3J0IGxldCB1c2luZ0JpZ0ludCAgICAgICAgICAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWluTnVtYmVyICAgICAgICAgPSAwO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWF4TnVtYmVyICAgICAgICAgPSAwO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiAgXG5jb25zdCBBTlkgICAgICAgPSB7XG5cdHRlc3Q6ICgpID0+IHRydWUsXG59O1xuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuZXhwb3J0IGNvbnN0IEtleXMgPSBjbGFzcyBLZXlzUmVnRXhwIGV4dGVuZHMgUmVnRXhwICAgICAgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdGNvbnN0cnVjdG9yIChrZXlzICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHN1cGVyKGBeJHtncm91cGlmeShrZXlzKX0kYCk7XG5cdFx0bGV0IG1heExlbmd0aCA9IC0xO1xuXHRcdGZvciAoIGxldCBpbmRleCA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5c1stLWluZGV4XSA7XG5cdFx0XHRpZiAoIGxlbmd0aD5tYXhMZW5ndGggKSB7IG1heExlbmd0aCA9IGxlbmd0aDsgfVxuXHRcdH1cblx0XHR0aGlzLmxhc3RJbmRleCA9IG1heExlbmd0aCsxO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdCAgICAgICAgIHRlc3QgKCAgICAgICAgICAgICAgICAgIGtleSAgICAgICAgKSAgICAgICAgICB7XG5cdFx0cmV0dXJuIGtleS5sZW5ndGg8dGhpcy5sYXN0SW5kZXggJiYgc3VwZXIudGVzdChrZXkpO1xuXHR9XG59O1xuY29uc3QgaXNLZXlzID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZCgvKiNfX1BVUkVfXyovZnJlZXplKEtleXMucHJvdG90eXBlKSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgS0VZUyAgICAgICA9IEFOWTtcbmV4cG9ydCBsZXQgcHJlc2VydmVMaXRlcmFsICAgICAgICAgO1xuZXhwb3J0IGxldCB6ZXJvRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGlubGluZVRhYmxlICAgICAgICAgO1xuZXhwb3J0IGxldCBtb3JlRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FsbG93RW1wdHlLZXkgICAgICAgICA7XG4vL2V4cG9ydCBjb25zdCB4b2IgOmJvb2xlYW4gPSB0cnVlO1xuZXhwb3J0IGxldCBzRXJyb3IgICAgICAgICA7XG5leHBvcnQgbGV0IHNGbG9hdCAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBsZXQgVGFibGUgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93TG9uZ2VyICAgICAgICAgO1xuZXhwb3J0IGxldCBlbmFibGVOdWxsICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICAgICAgICAgO1xuZXhwb3J0IGxldCBwcmVzZXJ2ZUNvbW1lbnQgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FibGVEaWdpdCAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgKCk7XG5jb25zdCBhcnJheVR5cGVzX2dldCA9IC8qI19fUFVSRV9fKi9nZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzX3NldCA9IC8qI19fUFVSRV9fKi9zZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBBcyA9ICgpICAgICA9PiB7XG5cdGNvbnN0IGFzID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IHtcblx0XHRjb25zdCBnb3QgPSBhcnJheVR5cGVzX2dldChhcnJheSk7XG5cdFx0Z290XG5cdFx0XHQ/IGdvdD09PWFzIHx8IGl0ZXJhdG9yLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvci53aGVyZSgnLiBDaGVjayAnKSkpXG5cdFx0XHQ6IGFycmF5VHlwZXNfc2V0KGFycmF5LCBhcyk7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9O1xuXHRyZXR1cm4gYXM7XG59O1xuY29uc3QgQVNfVFlQRUQgPSB7XG5cdGFzTnVsbHM6IEFzKCksXG5cdGFzU3RyaW5nczogQXMoKSxcblx0YXNUYWJsZXM6IEFzKCksXG5cdGFzQXJyYXlzOiBBcygpLFxuXHRhc0Jvb2xlYW5zOiBBcygpLFxuXHRhc0Zsb2F0czogQXMoKSxcblx0YXNJbnRlZ2VyczogQXMoKSxcblx0YXNPZmZzZXREYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlczogQXMoKSxcblx0YXNMb2NhbFRpbWVzOiBBcygpLFxufTtcbmNvbnN0IGFzTWl4ZWQgICAgID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IGFycmF5O1xuZXhwb3J0IGxldFxuXHRhc051bGxzICAgICxcblx0YXNTdHJpbmdzICAgICxcblx0YXNUYWJsZXMgICAgLFxuXHRhc0FycmF5cyAgICAsXG5cdGFzQm9vbGVhbnMgICAgLFxuXHRhc0Zsb2F0cyAgICAsXG5cdGFzSW50ZWdlcnMgICAgLFxuXHRhc09mZnNldERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZXMgICAgLFxuXHRhc0xvY2FsVGltZXMgICAgO1xuXG4gICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmxldCBwcm9jZXNzb3IgICAgICAgICAgICAgPSBudWxsO1xubGV0IGVhY2ggICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG5jb25zdCBjb2xsZWN0X29uID0gKHRhZyAgICAgICAgLCBhcnJheSAgICAgICAgICAgICAgLCB0YWJsZSAgICAgICAgICAgICAgLCBrZXkgICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3QgX2VhY2ggPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZWFjaC5fbGlua2VkID0gZWFjaDtcblx0X2VhY2gudGFnID0gdGFnO1xuXHRpZiAoIHRhYmxlICkge1xuXHRcdF9lYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0X2VhY2gua2V5ID0ga2V5IDtcblx0fVxuXHRpZiAoIGFycmF5ICkge1xuXHRcdF9lYWNoLmFycmF5ID0gYXJyYXk7XG5cdFx0X2VhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0ZWFjaCA9IF9lYWNoO1xufTtcbmNvbnN0IGNvbGxlY3Rfb2ZmID0gKCkgICAgICAgID0+IHsgdGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGB4T3B0aW9ucy50YWcgaXMgbm90IGVuYWJsZWQsIGJ1dCBmb3VuZCB0YWcgc3ludGF4YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IFByb2Nlc3MgPSAoKSAgICAgICAgICA9PiB7XG5cdGlmICggZWFjaCApIHtcblx0XHRjb25zdCBfcHJvY2Vzc29yID0gcHJvY2Vzc29yIDtcblx0XHRsZXQgX2VhY2ggICAgICAgICAgICAgID0gZWFjaDtcblx0XHRlYWNoID0gbnVsbDtcblx0XHRyZXR1cm4gKCkgICAgICAgPT4ge1xuXHRcdFx0Y29uc3QgcHJvY2Vzc29yID0gX3Byb2Nlc3Nvcjtcblx0XHRcdGxldCBlYWNoICAgICAgICAgICAgICA9IF9lYWNoIDtcblx0XHRcdF9lYWNoID0gbnVsbDtcblx0XHRcdGRvIHsgcHJvY2Vzc29yKGVhY2gpOyB9XG5cdFx0XHR3aGlsZSAoIGVhY2ggPSBlYWNoLl9saW5rZWQgKTtcblx0XHR9O1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuLyogdXNlICYgY2xlYXIgKi9cblxuZXhwb3J0IGNvbnN0IGNsZWFyID0gKCkgICAgICAgPT4ge1xuXHRLRVlTID0gQU5ZO1xuXHR1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gcHJvY2Vzc29yID0gZWFjaCA9IG51bGw7XG5cdHplcm9EYXRldGltZSA9IGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZSA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAsIGtleXMgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICwgYXJnc01vZGUgICAgICAgICAgICAgICAgICkgICAgICAgPT4ge1xuXHRcblx0QVJHU19NT0RFID0gYXJnc01vZGU7XG5cdFxuXHRsZXQgbWl4ZWQgICAgICAgICA7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRtdXN0U2NhbGFyID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdG11c3RTY2FsYXIgPSBkaXNhbGxvd0VtcHR5S2V5ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4zOlxuXHRcdFx0bXVzdFNjYWxhciA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjI6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMTpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBSYW5nZUVycm9yKGBUT01MLnBhcnNlKCxzcGVjaWZpY2F0aW9uVmVyc2lvbilgKTtcblx0fVxuXHRyZWdleHBzLnN3aXRjaFJlZ0V4cChzcGVjaWZpY2F0aW9uVmVyc2lvbik7XG5cdFxuXHRpZiAoIHR5cGVvZiBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT0nc3RyaW5nJyApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG11bHRpbGluZVN0cmluZ0pvaW5lcjsgfVxuXHRlbHNlIGlmICggbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09dW5kZWZpbmVkICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbnVsbDsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfW11bHRpbGluZVN0cmluZ0pvaW5lcmAgOiBgLHsgam9pbmVyIH1gfSlgKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT11bmRlZmluZWQgfHwgdXNlQmlnSW50PT09dHJ1ZSApIHsgdXNpbmdCaWdJbnQgPSB0cnVlOyB9XG5cdGVsc2UgaWYgKCB1c2VCaWdJbnQ9PT1mYWxzZSApIHsgdXNpbmdCaWdJbnQgPSBmYWxzZTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIHR5cGVvZiB1c2VCaWdJbnQhPT0nbnVtYmVyJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSx1c2VCaWdJbnRgIDogYCx7IGJpZ2ludCB9YH0pYCk7IH1cblx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKHVzZUJpZ0ludCkgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LHVzZUJpZ0ludGAgOiBgLHsgYmlnaW50IH1gfSlgKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHR1c2VCaWdJbnQ+PTBcblx0XHRcdD8gSW50ZWdlck1pbk51bWJlciA9IC0oIEludGVnZXJNYXhOdW1iZXIgPSB1c2VCaWdJbnQgKVxuXHRcdFx0OiBJbnRlZ2VyTWF4TnVtYmVyID0gLSggSW50ZWdlck1pbk51bWJlciA9IHVzZUJpZ0ludCApIC0gMTtcblx0fVxuXHRcblx0aWYgKCBrZXlzPT1udWxsICkgeyBLRVlTID0gQU5ZOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggIWlzS2V5cyhrZXlzKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCx7IGtleXMgfSlgKTsgfVxuXHRcdEtFWVMgPSBrZXlzO1xuXHR9XG5cdFxuXHRpZiAoIHhPcHRpb25zPT1udWxsICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gZmFsc2U7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgeE9wdGlvbnMhPT0nb2JqZWN0JyApIHtcblx0XHR0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx4T3B0aW9uc2AgOiBgLHsgeCB9YH0pYCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Y29uc3QgeyBvcmRlciwgbG9uZ2VyLCBleGFjdCwgbnVsbDogX251bGwsIG11bHRpLCBjb21tZW50LCBzdHJpbmcsIGxpdGVyYWwsIHRhZywgLi4udW5rbm93biB9ID0geE9wdGlvbnM7XG5cdFx0Y29uc3QgdW5rbm93bk5hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh1bmtub3duKTtcblx0XHRpZiAoIHVua25vd25OYW1lcy5sZW5ndGggKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sLHsgJHt1bmtub3duTmFtZXMuam9pbignLCAnKX0gfWAgOiBgLHsgeDogeyAke3Vua25vd25OYW1lcy5qb2luKCcsICcpfSB9IH1gfSlgKTsgfVxuXHRcdFRhYmxlID0gb3JkZXIgPyBPcmRlcmVkVGFibGUgOiBQbGFpblRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gIWxvbmdlcjtcblx0XHRzRXJyb3IgPSAhIWV4YWN0O1xuXHRcdGVuYWJsZU51bGwgPSAhIV9udWxsO1xuXHRcdGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSAhIW11bHRpO1xuXHRcdHByZXNlcnZlQ29tbWVudCA9ICEhY29tbWVudDtcblx0XHRkaXNhYmxlRGlnaXQgPSAhIXN0cmluZztcblx0XHRwcmVzZXJ2ZUxpdGVyYWwgPSAhIWxpdGVyYWw7XG5cdFx0aWYgKCB0YWcgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiB0YWchPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx7IHRhZyB9YCA6IGAseyB4OiB7IHRhZyB9IH1gfSlgKTsgfVxuXHRcdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sLHhPcHRpb25zYCA6IGAseyB4IH1gfSkgeE9wdGlvbnMudGFnIG5lZWRzIGF0IGxlYXN0IFRPTUwgMS4wIHRvIHN1cHBvcnQgbWl4ZWQgdHlwZSBhcnJheWApOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRtaXhlZFxuXHRcdD8gYXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gYXNNaXhlZFxuXHRcdDogKCB7IGFzTnVsbHMsIGFzU3RyaW5ncywgYXNUYWJsZXMsIGFzQXJyYXlzLCBhc0Jvb2xlYW5zLCBhc0Zsb2F0cywgYXNJbnRlZ2VycywgYXNPZmZzZXREYXRlVGltZXMsIGFzTG9jYWxEYXRlVGltZXMsIGFzTG9jYWxEYXRlcywgYXNMb2NhbFRpbWVzIH0gPSBBU19UWVBFRCApO1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcblxuY29uc3QgcHJldmlvdXMgICAgICAgICAgICAgICAgPSBTeW1ib2woJ3ByZXZpb3VzJykgICAgICAgO1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuXG5leHBvcnQgY29uc3QgeCA9ICAgICAocm9vdFN0YWNrICAgICAgKSAgICA9PiB7XG5cdGxldCBzdGFjayAgICAgICAgPSByb290U3RhY2s7XG5cdGxldCByZXN1bHQgPSBzdGFjay5uZXh0KCk7XG5cdGlmICggIXJlc3VsdC5kb25lICkge1xuXHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRyZXN1bHQgPSAoIHN0YWNrID0gcmVzdWx0LnZhbHVlICkubmV4dCgpO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdGlmICggcmVzdWx0LmRvbmUgKSB7XG5cdFx0XHRcdGlmICggc3RhY2s9PT1yb290U3RhY2sgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdHN0YWNrID0gc3RhY2tbcHJldmlvdXNdIDtcblx0XHRcdFx0cmVzdWx0ID0gc3RhY2submV4dChyZXN1bHQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRcdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdC52YWx1ZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgXG5cdCAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IF9saXRlcmFsICAgICAgICAgICAgICAgID0gU3ltYm9sKCdfbGl0ZXJhbCcpICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IExpdGVyYWxPYmplY3QgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGl0ZXJhbCAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRjb25zdCBvYmplY3QgPSBPYmplY3QodmFsdWUpICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRvYmplY3RbX2xpdGVyYWxdID0gbGl0ZXJhbDtcblx0cmV0dXJuIG9iamVjdDtcbn07XG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcblxuY29uc3QgYXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBhcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNBcnJheSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChhcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IE9GX1RBQkxFUyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNUQVRJQ0FMTFkgPSB0cnVlO1xuY29uc3Qgc3RhdGljYWxBcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChzdGF0aWNhbEFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNTdGF0aWMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoc3RhdGljYWxBcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBuZXdBcnJheSA9IChpc1N0YXRpYyAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgYXJyYXkgICAgICAgID0gW107XG5cdGFycmF5c19hZGQoYXJyYXkpO1xuXHRpc1N0YXRpYyAmJiBzdGF0aWNhbEFycmF5c19hZGQoYXJyYXkpO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBOYXRpdmVEYXRlIGZyb20gJy5EYXRlJztcbmltcG9ydCBwYXJzZSBmcm9tICcuRGF0ZS5wYXJzZSc7XG5pbXBvcnQgZmxvb3IgZnJvbSAnLk1hdGguZmxvb3InO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG4vLy9pbXBvcnQgaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcubnVsbC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcblxuY29uc3QgZnBjID0gICAgICAgICAgICAgICAgICAgICAgKGMgICApICAgID0+IHtcblx0ZnJlZXplKGZyZWV6ZShjKS5wcm90b3R5cGUpO1xuXHRyZXR1cm4gYztcbn07XG5cbmNvbnN0IF8yOV8gPSAvKD86MFsxLTldfDFcXGR8MlxcZCkvO1xuY29uc3QgXzMwXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzMCkvO1xuY29uc3QgXzMxXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzWzAxXSkvO1xuY29uc3QgXzIzXyA9IC8oPzpbMDFdXFxkfDJbMC0zXSkvO1xuY29uc3QgXzU5XyA9IC9bMC01XVxcZC87XG5cbmNvbnN0IFlNRCA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdFxcZFxcZFxcZFxcZC1cblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0WzEzNTc4XS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHRbNDY5XS0ke18zMF99XG5cdFx0XHR8XG5cdFx0XHQyLSR7XzI5X31cblx0XHQpXG5cdFx0fFxuXHRcdDFcblx0XHQoPzpcblx0XHRcdFswMl0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0MS0ke18zMF99XG5cdFx0KVxuXHQpXG5gLnZhbHVlT2YoKTtcblxuY29uc3QgSE1TID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cbmAudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgT0ZGU0VUJCA9IC8oPzpbWnpdfFsrLV1cXGRcXGQ6XFxkXFxkKSQvO1xuXG5jb25zdCB7IGV4ZWM6IFpfZXhlYyB9ID0gdGhlUmVnRXhwICAgICAgICAgICAoLygoWystXSlcXGRcXGQpOihcXGRcXGQpJC8pO1xuXG5jb25zdCB7IGV4ZWM6IE9GRlNFVF9EQVRFVElNRV9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkezEsM30oXFxkKj8pMCopP1xuXHQoPzpbWnpdfFsrLV0ke18yM199OiR7XzU5X30pXG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfWkVST19leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KClcblx0W1p6XVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfREFURVRJTUUgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUdCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEUgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9USU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCBUID0gL1sgdF0vO1xuY29uc3QgREVMSU1JVEVSX0RPVCA9IC9bLVQ6Ll0vZztcbmNvbnN0IERPVF9aRVJPID0gL1xcLj8wKyQvO1xuY29uc3QgWkVSTyA9IC9cXC4oXFxkKj8pMCskLztcbmNvbnN0IHplcm9SZXBsYWNlciA9IChtYXRjaCAgICAgICAgLCBwMSAgICAgICAgKSA9PiBwMTtcblxuY29uc3QgRGF0ZXRpbWUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IERhdGV0aW1lID0gZnVuY3Rpb24gKCAgICAgICAgICAgICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOy8vZXhwcmVzc2lvbj8gOnVuZGVmaW5lZCwgbGl0ZXJhbD8gOnVuZGVmaW5lZCwgZG90VmFsdWU/IDp1bmRlZmluZWRcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnNldFRpbWUoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuZ2V0VGltZSgpIDogRGF0ZS5wYXJzZSgnVCcpXG5cdC8vIFtTeW1ib2wudG9QcmltaXRpdmVdKCdudW1iZXInKSA+IC52YWx1ZU9mKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnRvSVNPU3RyaW5nKClcblx0Y29uc3QgZGVzY3JpcHRvcnMgPSBOdWxsKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdHtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gTnVsbChudWxsKTtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Ygb3duS2V5cyhOYXRpdmVEYXRlLnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApIHtcblx0XHRcdGtleT09PSdjb25zdHJ1Y3RvcicgfHxcblx0XHRcdGtleT09PSd0b0pTT04nIHx8XG5cdFx0XHQoIGRlc2NyaXB0b3JzW2tleV0gPSBkZXNjcmlwdG9yICk7XG5cdFx0fVxuXHR9XG5cdERhdGV0aW1lLnByb3RvdHlwZSA9IHByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShOYXRpdmVEYXRlLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpKTtcblx0cmV0dXJuIGZyZWV6ZShEYXRldGltZSk7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgVmFsdWUgPSAoSVNPU3RyaW5nICAgICAgICApICAgICAgICA9PiBJU09TdHJpbmcucmVwbGFjZShaRVJPLCB6ZXJvUmVwbGFjZXIpLnJlcGxhY2UoREVMSU1JVEVSX0RPVCwgJycpO1xuXG5jb25zdCBkID0gLy4vZ3M7XG5jb25zdCBkMnUgPSAoZCAgICAgICAgKSA9PiAnXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOSdbZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIDtcbmNvbnN0IFZhbHVlT0ZGU0VUID0gKHRpbWUgICAgICAgICwgbW9yZSAgICAgICAgKSAgICAgICAgPT4gdGltZTwwXG5cdD8gKCAnJyArICggdGltZSArIDYyMTY3MzA1NTQwMDAwICkgKS5yZXBsYWNlKGQsIGQydSkucGFkU3RhcnQoMTQsICdcXHUyMDAwJykgKyBtb3JlLnJlcGxhY2UoZCwgZDJ1KSArIHRpbWVcblx0OiBtb3JlXG5cdFx0PyAoIHRpbWUgKyAnLicgKS5wYWRTdGFydCgxNiwgJzAnKSArIG1vcmVcblx0XHQ6ICggJycgKyB0aW1lICkucGFkU3RhcnQoMTUsICcwJyk7XG5cbmNvbnN0IHZhbGlkYXRlTGVhcCA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgID0+IHtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJzAyLTI5JywgNSkgKSB7XG5cdFx0Y29uc3QgeWVhciAgICAgICAgID0gK2xpdGVyYWwuc2xpY2UoMCwgNCk7XG5cdFx0cmV0dXJuIChcblx0XHRcdHllYXIgJiAwYjExID8gZmFsc2UgOlxuXHRcdFx0XHR5ZWFyJTEwMCA/IHRydWUgOlxuXHRcdFx0XHRcdHllYXIlNDAwID8gZmFsc2UgOlxuXHRcdFx0XHRcdFx0eWVhciUzMjAwID8gdHJ1ZSA6XG5cdFx0XHRcdFx0XHRcdGZhbHNlXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCB7IHRlc3Q6IFZBTElEQVRFX0xFQVAgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2BeLi4uLi4oPzowNi4zMHwxMi4zMSkuMjM6NTk6NTlgLnZhbHVlT2YoKTtcblxuY29uc3QgREFURSAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKG5ldyBOYXRpdmVEYXRlKDApLCAvKiNfX1BVUkVfXyovZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhOYXRpdmVEYXRlLnByb3RvdHlwZSkpO1xuXG5jb25zdCBPZmZzZXREYXRlVGltZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3VzZSA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJCAgICAgICAgID0gMCkgPT4ge1xuXHREQVRFLnNldFRpbWUoK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICsgJCk7XG5cdHJldHVybiBEQVRFO1xufTtcbi8qY29uc3QgT2Zmc2V0RGF0ZVRpbWVfZ2V0ID0gKHRoYXQgOkluc3RhbmNlVHlwZTx0eXBlb2YgT2Zmc2V0RGF0ZVRpbWU+LCBzdGFydCA6bnVtYmVyLCBlbmQgOm51bWJlcikgPT4gK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3NldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIsIHZhbHVlIDpudW1iZXIsIHJlc2VydmVNb3JlIDpib29sZWFuKSA9PiB7XG5cdGlmICggZW5kICkge1xuXHRcdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdFx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRcdGlmICggc3RyaW5nLmxlbmd0aD5zaXplICkgeyB0aHJvdyBSYW5nZUVycm9yKCk7IH0vLy9cblx0XHR0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgc3RyaW5nLnBhZFN0YXJ0KHNpemUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKTtcblx0fVxuXHRjb25zdCB0aW1lID0gcGFyc2UodGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0cmV0dXJuIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodGltZSwgdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uaW5jbHVkZXMoJy0nKVxuXHRcdD8gdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLmluZGV4T2YoJy0nLCAxNCkpXG5cdFx0OiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNSlcblx0KTsvLy90aW1lXG59OyovLy9cbmV4cG9ydCBjb25zdCBPZmZzZXREYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgT2Zmc2V0RGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdHZhbGlkYXRlTGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB3aXRoNjAgPSBsaXRlcmFsLnN0YXJ0c1dpdGgoJzYwJywgMTcpO1xuXHRcdGxldCB3aXRob3V0NjAgPSB3aXRoNjAgPyBsaXRlcmFsLnNsaWNlKDAsIDE3KSArICc1OScgKyBsaXRlcmFsLnNsaWNlKDE5KSA6IGxpdGVyYWw7XG5cdFx0Y29uc3QgeyAxOiBtb3JlIH0gPSAoIG9wdGlvbnMuemVyb0RhdGV0aW1lID8gT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyh3aXRob3V0NjApIDogT0ZGU0VUX0RBVEVUSU1FX2V4ZWMod2l0aG91dDYwKSApID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHRpbWUgPSBwYXJzZSh3aXRob3V0NjAgPSB3aXRob3V0NjAucmVwbGFjZShULCAnVCcpLnJlcGxhY2UoJ3onLCAnWicpKTtcblx0XHRpZiAoIHdpdGg2MCApIHtcblx0XHRcdERBVEUuc2V0VGltZSh0aW1lKTtcblx0XHRcdFZBTElEQVRFX0xFQVAoREFURS50b0lTT1N0cmluZygpKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHR9XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB3aXRob3V0NjA7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSBWYWx1ZU9GRlNFVCh0aW1lLCBtb3JlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0VVRDRnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0Z1bGxZZWFyKCk7IH1cblx0Ly8vZ2V0IHllYXIgKCkgOkZ1bGxZZWFyIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHQvLy9zZXQgeWVhciAodmFsdWUgOkZ1bGxZZWFyKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSwgdHJ1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Ly8vZ2V0IG1vbnRoICgpIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KTsgfVxuXHQvLy9zZXQgbW9udGggKHZhbHVlKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSwgdHJ1ZSk7IH1cblx0Z2V0VVRDRGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXRlKCk7IH1cblx0Ly8vZ2V0IGRheSAoKSA6RGF0ZSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdC8vL3NldCBkYXkgKHZhbHVlIDpEYXRlKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUsIHRydWUpOyB9XG5cdFxuXHRnZXRVVENIb3VycyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDSG91cnMoKTsgfVxuXHQvLy9nZXQgaG91ciAoKSA6SG91cnMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0Ly8vc2V0IGhvdXIgKHZhbHVlIDpIb3VycykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSwgdHJ1ZSk7IH1cblx0Z2V0VVRDTWludXRlcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaW51dGVzKCk7IH1cblx0Ly8vZ2V0IG1pbnV0ZSAoKSA6TWludXRlcyB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHQvLy9zZXQgbWludXRlICh2YWx1ZSA6TWludXRlcykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSwgdHJ1ZSk7IH1cblx0Z2V0VVRDU2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENTZWNvbmRzKCk7IH1cblx0Ly8vZ2V0IHNlY29uZCAoKSA6U2Vjb25kcyB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHQvLy9zZXQgc2Vjb25kICh2YWx1ZSA6U2Vjb25kcykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTcsIDE5LCB2YWx1ZSwgdHJ1ZSk7IH1cblx0Z2V0VVRDTWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7IH0vLy9cblx0Ly8vZ2V0IG1pbGxpc2Vjb25kICgpIDpNaWxsaXNlY29uZHMgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0lMTAwMDsgfS8vL1xuXHQvKnNldCBtaWxsaXNlY29uZCAodmFsdWUgOk1pbGxpc2Vjb25kcykge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgMCwgMCwgZmFsc2UpO1xuXHR9Ki8vL1xuXHQvLy9nZXQgbWljcm9zZWNvbmQgKCkgOk1pbGxpc2Vjb25kc1xuXHQvLy9zZXQgbWljcm9zZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpXG5cdC8vL2dldCBuYW5vc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG5hbm9zZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpXG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHQvLy9nZXQgZGF5T2ZXZWVrICgpIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzLCB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkqNjAwMDApLmdldFVUQ0RheSgpIHx8IDc7IH1cblx0Z2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHRyZXR1cm4geiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDA7XG5cdH1cblx0Ly8vZ2V0IG9mZnNldCAoKSB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uZW5kc1dpdGgoJ1onKSA/ICdaJyA6IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgtNik7IH1cblx0LypzZXQgb2Zmc2V0ICh2YWx1ZSkge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uZW5kc1dpdGgoJ1onKSA/IC0xIDogLTYpICsgdmFsdWU7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDAsIHRydWUpO1xuXHR9Ki8vL1xuXHRnZXRUaW1lICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gZmxvb3IoK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdKTsgfS8vL1xuXHQvKnNldFRpbWUgKHRoaXMgOk9mZnNldERhdGVUaW1lLCB2YWx1ZSA6VGltZSkgOnZvaWQge1xuXHRcdHZhbHVlID0gREFURS5zZXRUaW1lKHZhbHVlKTtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0REFURS5zZXRUaW1lKHZhbHVlICsgKCB6ID8gK3pbMV0qNjAgKyArKCB6WzJdICsgelszXSApIDogMCApKjYwMDAwKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB6ID8gREFURS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKSArIHpbMF0gOiBEQVRFLnRvSVNPU3RyaW5nKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSBWYWx1ZU9GRlNFVCh2YWx1ZSwgJycpO1xuXHRcdC8vL3JldHVybiB2YWx1ZTtcblx0fSovXG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdHRoYXRbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGVUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFVElNRShsaXRlcmFsKSAmJiB2YWxpZGF0ZUxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKFQsICdUJylcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNCwgMTcpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbERhdGVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdHRoYXRbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIHZhbGlkYXRlTGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfVElNRShsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAwLCAyKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCAwLCAyLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDMsIDUpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCAzLCA1LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDYsIDgpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCA2LCA4LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxUaW1lX3ZhbHVlXS5zbGljZSg2LCA5KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgOCkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21DaGFyQ29kZSBmcm9tICcuU3RyaW5nLmZyb21DaGFyQ29kZSc7XG5pbXBvcnQgZnJvbUNvZGVQb2ludCBmcm9tICcuU3RyaW5nLmZyb21Db2RlUG9pbnQnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5jb25zdCBFU0NBUEVEX0lOX1NJTkdMRV9MSU5FID0gL1teXFxcXF0rfFxcXFwoPzpbXFxcXFwiYnRuZnIvXXx1Lns0fXxVLns4fSkvZ3M7XG5jb25zdCBFU0NBUEVEX0lOX01VTFRJX0xJTkUgPSAvW15cXG5cXFxcXSt8XFxufFxcXFwoPzpbXFx0IF0qXFxuW1xcdFxcbiBdKnxbXFxcXFwiYnRuZnIvXXx1Lns0fXxVLns4fSkvZ3M7XG5cbmV4cG9ydCBjb25zdCBCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsICkgeyByZXR1cm4gJyc7IH1cblx0Y29uc3QgcGFydHMgPSBsaXRlcmFsLm1hdGNoKEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUpIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IHBhcnRzO1xuXHRsZXQgaW5kZXggPSAwO1xuXHRkbyB7XG5cdFx0Y29uc3QgcGFydCA9IHBhcnRzW2luZGV4XSA7XG5cdFx0aWYgKCBwYXJ0WzBdPT09J1xcXFwnICkge1xuXHRcdFx0c3dpdGNoICggcGFydFsxXSApIHtcblx0XHRcdFx0Y2FzZSAnXFxcXCc6IHBhcnRzW2luZGV4XSA9ICdcXFxcJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1wiJzogcGFydHNbaW5kZXhdID0gJ1wiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2InOiBwYXJ0c1tpbmRleF0gPSAnXFxiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3QnOiBwYXJ0c1tpbmRleF0gPSAnXFx0JzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ24nOiBwYXJ0c1tpbmRleF0gPSAnXFxuJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2YnOiBwYXJ0c1tpbmRleF0gPSAnXFxmJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3InOiBwYXJ0c1tpbmRleF0gPSAnXFxyJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3UnOlxuXHRcdFx0XHRcdGNvbnN0IGNoYXJDb2RlICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0b3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjaGFyQ29kZSAmJiBjaGFyQ29kZTwweEUwMDBcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdVJzpcblx0XHRcdFx0XHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQoIG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJy8nOiBwYXJ0c1tpbmRleF0gPSAnLyc7IGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR3aGlsZSAoICsraW5kZXghPT1sZW5ndGggKTtcblx0cmV0dXJuIHBhcnRzLmpvaW4oJycpO1xufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICwgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAgICAgICAgLCBuICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsICkgeyByZXR1cm4gJyc7IH1cblx0Y29uc3QgcGFydHMgPSBsaXRlcmFsLm1hdGNoKEVTQ0FQRURfSU5fTVVMVElfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnQ9PT0nXFxuJyApIHtcblx0XHRcdCsrbjtcblx0XHRcdHBhcnRzW2luZGV4XSA9IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmc7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwYXJ0WzBdPT09J1xcXFwnICkge1xuXHRcdFx0c3dpdGNoICggcGFydFsxXSApIHtcblx0XHRcdFx0Y2FzZSAnXFxuJzpcblx0XHRcdFx0Y2FzZSAnICc6XG5cdFx0XHRcdGNhc2UgJ1xcdCc6XG5cdFx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpID0gcGFydC5pbmRleE9mKCdcXG4nLCBpKSArIDE7ICkgeyArK247IH1cblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSAnJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnXFxcXCc6IHBhcnRzW2luZGV4XSA9ICdcXFxcJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1wiJzogcGFydHNbaW5kZXhdID0gJ1wiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2InOiBwYXJ0c1tpbmRleF0gPSAnXFxiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3QnOiBwYXJ0c1tpbmRleF0gPSAnXFx0JzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ24nOiBwYXJ0c1tpbmRleF0gPSAnXFxuJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2YnOiBwYXJ0c1tpbmRleF0gPSAnXFxmJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3InOiBwYXJ0c1tpbmRleF0gPSAnXFxyJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3UnOlxuXHRcdFx0XHRcdGNvbnN0IGNoYXJDb2RlICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0b3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjaGFyQ29kZSAmJiBjaGFyQ29kZTwweEUwMDBcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJywgaXRlcmF0b3IubGluZUluZGV4ICsgbikpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdVJzpcblx0XHRcdFx0XHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQoIG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJywgaXRlcmF0b3IubGluZUluZGV4ICsgbikpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJy8nOiBwYXJ0c1tpbmRleF0gPSAnLyc7IGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR3aGlsZSAoICsraW5kZXghPT1sZW5ndGggKTtcblx0cmV0dXJuIHBhcnRzLmpvaW4oJycpO1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgeyB0ZXN0OiBCQURfRCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hXFxkKWAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBJU19EX0lOVEVHRVIgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfWE9CX0lOVEVHRVIgfSA9IHRoZVJlZ0V4cCgvXjAoPzp4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qfG9bMC03XVtfMC03XSp8YlswMV1bXzAxXSopJC8pO1xuY29uc3QgeyB0ZXN0OiBCQURfWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBJU19JTlRFR0VSID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgPT4gKCBJU19EX0lOVEVHRVIobGl0ZXJhbCkgfHwgLypvcHRpb25zLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IEJpZ0ludEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXJcblx0fHxcblx0LTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IC1tYXgtMW4gKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IC1taW4tMW4gKVxuXHR8fFxuXHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IHBhcnNlSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlmICggb3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyPD1udW1iZXIgJiYgbnVtYmVyPD1vcHRpb25zLkludGVnZXJNYXhOdW1iZXIgKSB7IHJldHVybiBudW1iZXI7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXJcblx0fHxcblx0LTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IC1tYXgtMW4gKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IC1taW4tMW4gKVxuXHR8fFxuXHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IElOVEVHRVJfRCwgQkFEX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5jb25zdCBfTmFOID0gLU5hTjtcbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcbmNvbnN0IHsgdGVzdDogSVNfRkxPQVQgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtJTlRFR0VSX0R9XG5cdCg/OlxuXHRcdFxcLlxcZFtfXFxkXSpcblx0XHQoPzpbZUVdWy0rXT9cXGRbX1xcZF0qKT9cblx0fFxuXHRcdFtlRV1bLStdP1xcZFtfXFxkXSpcblx0KVxuXHQkYC52YWx1ZU9mKCk7XG5jb25zdCBVTkRFUlNDT1JFUyA9IC9fL2c7XG5jb25zdCB7IHRlc3Q6IElTX1pFUk8gfSA9IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLjArKT8oPzpbZUVdWy0rXT8wKyk/JC8pO1xuY29uc3QgeyBleGVjOiBOT1JNQUxJWkVEIH0gPSB0aGVSZWdFeHAgICAoL15bLTBdPyhcXGQqKSg/OlxcLihcXGQrKSk/KD86ZVxcKz8oLT9cXGQrKSk/JC8pO1xuY29uc3QgeyBleGVjOiBPUklHSU5BTCB9ID0gdGhlUmVnRXhwICAgKC9eWy0rXT8wPyhcXGQqKSg/OlxcLihcXGQqPykwKik/KD86W2VFXVxcKz8oLT9cXGQrKSk/JC8pO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhSVNfRkxPQVQobGl0ZXJhbCkgfHwgQkFEX0QobGl0ZXJhbCkgKSB7XG5cdFx0aWYgKCBvcHRpb25zLnNGbG9hdCApIHtcblx0XHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7IHJldHVybiBJbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkgeyByZXR1cm4gX0luZmluaXR5OyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBfTmFOOyB9XG5cdFx0fVxuXHRcdHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRjb25zdCB3aXRob3V0VW5kZXJzY29yZXMgICAgICAgICA9IGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpO1xuXHRjb25zdCBudW1iZXIgICAgICAgICA9ICt3aXRob3V0VW5kZXJzY29yZXM7XG5cdGlmICggb3B0aW9ucy5zRXJyb3IgKSB7XG5cdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRudW1iZXIgfHwgSVNfWkVSTyh3aXRob3V0VW5kZXJzY29yZXMpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB7IDE6IG5vcm1hbGl6ZWRfaW50ZWdlciwgMjogbm9ybWFsaXplZF9mcmFjdGlvbmFsID0gJycsIDM6IG5vcm1hbGl6ZWRfZXhwb25lbnQgPSAnJyB9ID0gTk9STUFMSVpFRChudW1iZXIgICAgICAgKSA7XG5cdFx0Y29uc3QgeyAxOiBvcmlnaW5hbF9pbnRlZ2VyLCAyOiBvcmlnaW5hbF9mcmFjdGlvbmFsID0gJycsIDM6IG9yaWdpbmFsX2V4cG9uZW50ID0gJycgfSA9IE9SSUdJTkFMKHdpdGhvdXRVbmRlcnNjb3JlcykgO1xuXHRcdG9yaWdpbmFsX2ludGVnZXIgKyBvcmlnaW5hbF9mcmFjdGlvbmFsPT09bm9ybWFsaXplZF9pbnRlZ2VyICsgbm9ybWFsaXplZF9mcmFjdGlvbmFsXG5cdFx0JiZcblx0XHRvcmlnaW5hbF9leHBvbmVudCAgICAgICAgLSBvcmlnaW5hbF9mcmFjdGlvbmFsLmxlbmd0aD09PW5vcm1hbGl6ZWRfZXhwb25lbnQgICAgICAgIC0gbm9ybWFsaXplZF9mcmFjdGlvbmFsLmxlbmd0aFxuXHRcdHx8XG5cdFx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGxvc3QgaXRzIGV4YWN0IGFuZCBiZWVuICR7bnVtYmVyfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIGRpcmVjdGx5SWZOb3QsIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nLCBNdWx0aWxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkodGFibGUpICkge1xuXHRcdFx0XHRpc1N0YXRpYyh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIFN0YXRpYyBBcnJheWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlID0gdGFibGVbKCB0YWJsZSAgICAgICAgICApLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSk7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kVGFibGUgPSAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gcHVzaCBUYWJsZSB0byBub24tQXJyYXlPZlRhYmxlcyB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHRlbHNlIHsgYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KE9GX1RBQkxFUyk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucy5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkge1xuXHRcdFx0bGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldO1xuXHRcdFx0ZnJvbVBhaXIobGFzdFRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBrZXkvdmFsdWUgcGFpciBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBbXWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0ZGlyZWN0bHlJZk5vdChsYXN0VGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgRHVwbGljYXRlIFRhYmxlIGRlZmluaXRpb25gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFkpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5saW5lVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRmcm9tUGFpcih0YWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEgW10gY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNoZWNrTGl0ZXJhbFN0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRyZWdleHBzLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGEgTGl0ZXJhbCBTdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiBsaXRlcmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkxpdGVyYWxTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aChgJycnYCkgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBsaXRlcmFsIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgMiksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwuc2xpY2UoMykpO1xuXHRpZiAoICQgKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDYpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gJFszXTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdNdWx0aS1saW5lIExpdGVyYWwgU3RyaW5nJywgbGl0ZXJhbC5sZW5ndGgpO1xuXHRjb25zdCBsZWFkaW5nTmV3bGluZSA9ICEoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICk7XG5cdGlmICggbGVhZGluZ05ld2xpbmUgKSB7XG5cdFx0bGl0ZXJhbCA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QoWyBgJycnYCwgbGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyAzKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0fVxuXHRvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPz8gc3RhcnQubm93cmFwKG9wdGlvbnMuQVJHU19NT0RFKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBjaGVja0xpdGVyYWxTdHJpbmcobGl0ZXJhbCkgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGluZSk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGxpbmVzLmpvaW4ob3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICk7XG5cdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVMaXRlcmFsICkge1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBgJycnYDtcblx0XHRcdFx0bGVhZGluZ05ld2xpbmUgPyBsaW5lcy51bnNoaWZ0KGAnJydgKSA6IGxpbmVzWzBdID0gYCcnJyR7bGl0ZXJhbH1gO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKGxpbmUpO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJykgKSB7XG5cdFx0Y29uc3QgaW5kZXggPSByZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgobGl0ZXJhbCk7XG5cdFx0Y29uc3QgdmFsdWUgPSBCYXNpY1N0cmluZyhsaXRlcmFsLnNsaWNlKDEsIGluZGV4KSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgaW5kZXggKyAxKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UoaW5kZXggKyAxKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRsZXQgbGVuZ3RoID0gMyArIHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsLnNsaWNlKDMpKTtcblx0aWYgKCBsaXRlcmFsLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCAkID0gbGl0ZXJhbC5zbGljZSgzLCBsZW5ndGgpO1xuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHZhbHVlID0gQmFzaWNTdHJpbmcoJCkgKyAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ011bHRpLWxpbmUgQmFzaWMgU3RyaW5nJywgbGVuZ3RoKTtcblx0Y29uc3Qgc2tpcHBlZCAgICAgICAgPSAoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICkgPyAwIDogMTtcblx0aWYgKCBza2lwcGVkICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsKTtcblx0XHRpZiAoIGxpdGVyYWwubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZygkLCBvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgLCBza2lwcGVkKSArICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KFsgJ1wiXCJcIicsIGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA/PyBzdGFydC5ub3dyYXAob3B0aW9ucy5BUkdTX01PREUpO1xuXHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwgKyAnXFxuJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGxpdGVyYWwgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaW5lKTtcblx0XHRpZiAoIGxpbmUubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpbmUuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZyhsaW5lcy5qb2luKCdcXG4nKSArICdcXG4nICsgJCwgb3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICwgc2tpcHBlZCkgKyAoIGxpbmUuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaW5lLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgKSB7XG5cdFx0XHRcdHNraXBwZWQgPyBsaW5lcy51bnNoaWZ0KCdcIlwiXCInKSA6IGxpbmVzWzBdID0gYFwiXCJcIiR7bGl0ZXJhbH1gO1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gYCR7JH1cIlwiXCJgO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiBsaW5lLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSArICdcXG4nKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGxpbmU7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEtFWVMgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKG51bGwpO1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3IgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gS0VZU1trZXldID8/ICggS0VZU1trZXldID0gU3ltYm9sKGtleSkgKTtcbmV4cG9ydCBjb25zdCBjb21tZW50Rm9yVGhpcyAgICAgICAgICAgICAgICA9IFN5bWJvbCgndGhpcycpICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBpbmNsdWRlc05ld2xpbmUgfSA9IHRoZVJlZ0V4cCgvXFxyP1xcbi9nKTtcbmV4cG9ydCBjb25zdCBnZXRDT01NRU5UID0gKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleUNvbW1lbnQgICAgICAgICkgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICgga2V5Q29tbWVudCBpbiB0YWJsZSApIHtcblx0XHRjb25zdCBjb21tZW50ID0gdGFibGVba2V5Q29tbWVudF07XG5cdFx0aWYgKCB0eXBlb2YgY29tbWVudCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50IG11c3QgYmUgYSBzdHJpbmcsIHdoaWxlIFwiJHtjb21tZW50PT09bnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb21tZW50fVwiIHR5cGUgaXMgZm91bmRgKTsgfVxuXHRcdGlmICggaW5jbHVkZXNOZXdsaW5lKGNvbW1lbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgdGhlIHZhbHVlIG9mIGNvbW1lbnQgbXVzdCBiZSBhIHN0cmluZyBhbmQgY2FuIG5vdCBpbmNsdWRlIG5ld2xpbmVgKTsgfVxuXHRcdHJldHVybiBgICMke2NvbW1lbnR9YDsvLy9cblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuZXhwb3J0IGNvbnN0IGdldENvbW1lbnQgPSAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICAgICAgICAgICAgID0+IGtleSBpbiBLRVlTID8gZ2V0Q09NTUVOVCh0YWJsZSwgS0VZU1trZXldICkgOiAnJztcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vLyBleHRlcm5hbFxuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBJTkxJTkUsIERJUkVDVExZIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgbmV3QXJyYXksIFNUQVRJQ0FMTFkgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCQgfSBmcm9tICcuLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSAnLi4vdHlwZXMvSW50ZWdlcic7XG5pbXBvcnQgeyBGbG9hdCB9IGZyb20gJy4uL3R5cGVzL0Zsb2F0JztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgYXBwZW5kVGFibGUsIHByZXBhcmVUYWJsZSwgcHJlcGFyZUlubGluZVRhYmxlLCBhc3NpZ25MaXRlcmFsU3RyaW5nLCBhc3NpZ25CYXNpY1N0cmluZyB9IGZyb20gJy4vb24tdGhlLXNwb3QnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgYmVJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5cbmNvbnN0IHsgdGVzdDogSVNfT0ZGU0VUJCB9ID0gdGhlUmVnRXhwKE9GRlNFVCQpO1xuY29uc3QgeyB0ZXN0OiBJU19FTVBUWSB9ID0gdGhlUmVnRXhwKC9eXFxbW1xcdCBdKl0vKTtcblxuY29uc3QgcGFyc2VLZXlzID0gKHJlc3QgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgbGluZVJlc3QgICAgICAgICA9IHJlc3Q7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IFtdO1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAtMTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGxpbmVSZXN0IHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkgYmFyZSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nXCInICkge1xuXHRcdFx0Y29uc3QgaW5kZXggICAgICAgICA9IHJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleChsaW5lUmVzdCk7XG5cdFx0XHRvcHRpb25zLktFWVMudGVzdChsZWFkaW5nS2V5c1srK2xhc3RJbmRleF0gPSBCYXNpY1N0cmluZyhsaW5lUmVzdC5zbGljZSgxLCBpbmRleCkpKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEtleSBub3QgYWxsb3dlZGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGluZGV4ICsgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNRdW90ZWQgPSBsaW5lUmVzdFswXT09PSdcXCcnO1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggaXNRdW90ZWQgPyByZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyA6IHJlZ2V4cHMuX19CQVJFX0tFWV9leGVjICkobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkICR7aXNRdW90ZWQgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGtleS5sZW5ndGgpO1xuXHRcdFx0b3B0aW9ucy5LRVlTLnRlc3QobGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gaXNRdW90ZWQgPyBrZXkuc2xpY2UoMSwgLTEpIDoga2V5KSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEtleSBub3QgYWxsb3dlZGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGlmICggcmVnZXhwcy5JU19ET1RfS0VZKGxpbmVSZXN0KSApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuRE9UX0tFWSwgJycpOyB9XG5cdFx0ZWxzZSB7IGJyZWFrOyB9XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FibGVEaWdpdCApIHtcblx0XHRjb25zdCBrZXlzID0gcmVzdC5zbGljZSgwLCAtbGluZVJlc3QubGVuZ3RoKTtcblx0XHQoIHJlZ2V4cHMuaXNBbWF6aW5nKGtleXMpIHx8IG9wdGlvbnMuZW5hYmxlTnVsbCAmJiBrZXlzPT09J251bGwnICkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYmFyZSBrZXkgZGlzYWJsZWQgYnkgeE9wdGlvbnMuc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRpZiAoIG9wdGlvbnMuZGlzYWxsb3dFbXB0eUtleSApIHtcblx0XHRsZXQgaW5kZXggICAgICAgICA9IGxhc3RJbmRleDtcblx0XHRkbyB7IGxlYWRpbmdLZXlzW2luZGV4XSAgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBrZXkgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpOyB9XG5cdFx0d2hpbGUgKCBpbmRleC0tICk7XG5cdH1cblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9IGxlYWRpbmdLZXlzW2xhc3RJbmRleF0gO1xuXHRsZWFkaW5nS2V5cy5sZW5ndGggPSBsYXN0SW5kZXg7XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgbGluZVJlc3QgfTtcbn07XG5cbmNvbnN0IHB1c2ggPSAobGFzdEFycmF5ICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIGxpbmVSZXN0WzBdPT09JzwnICkge1xuXHRcdGNvbnN0IHsgMTogdGFnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzLl9WQUxVRV9QQUlSX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZyBgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuY29sbGVjdCh0YWcsIGxhc3RBcnJheSwgbnVsbCk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ10nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHRsYXN0QXJyYXlbbGFzdEFycmF5Lmxlbmd0aF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcob3B0aW9ucy5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZShvcHRpb25zLmFzVGFibGVzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KG9wdGlvbnMuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IG9wdGlvbnMuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbD09PSdmYWxzZScgKSB7IG9wdGlvbnMuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gZmFsc2U7IH1cblx0ZWxzZSBpZiAoIG9wdGlvbnMuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnICkgeyBvcHRpb25zLmFzTnVsbHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0b3B0aW9ucy5hc09mZnNldERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0b3B0aW9ucy5hc0xvY2FsRGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0b3B0aW9ucy5hc0xvY2FsVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0b3B0aW9ucy5hc0xvY2FsRGF0ZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ24nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpXG5cdFx0XHQ/IG9wdGlvbnMuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBGbG9hdChsaXRlcmFsKSkgOiBGbG9hdChsaXRlcmFsKVxuXHRcdFx0OiBvcHRpb25zLmFzSW50ZWdlcnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuY29uc3QgZXF1YWxTdGF0aWNBcnJheSA9IGZ1bmN0aW9uICogKCAgICAgICAgICAgIHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAge1xuXHRjb25zdCBzdGF0aWNBcnJheSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShTVEFUSUNBTExZKTtcblx0aWYgKCBJU19FTVBUWShsaW5lUmVzdCkgKSB7XG5cdFx0YmVJbmxpbmUoc3RhdGljQXJyYXksIGxpbmVSZXN0WzFdPT09J10nID8gMCA6IDMpO1xuXHRcdHJldHVybiBsaW5lUmVzdC5zbGljZShsaW5lUmVzdC5pbmRleE9mKCddJykpLnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ1N0YXRpYyBBcnJheScsIGxpbmVSZXN0Lmxlbmd0aCk7XG5cdGxldCBpbmxpbmUgICAgICAgICAgICAgICA9IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1sgJykgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnW1xcdCcpID8gMyA6IDA7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdGlubGluZSA9IG51bGw7XG5cdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHtcblx0XHRpbmxpbmU9PT1udWxsIHx8IGJlSW5saW5lKHN0YXRpY0FycmF5LCBpbmxpbmUpO1xuXHRcdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IHB1c2goc3RhdGljQXJyYXksIGxpbmVSZXN0KTtcblx0XHRsaW5lUmVzdCA9IHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdDtcblx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0aW5saW5lID0gbnVsbDtcblx0XHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IGJyZWFrOyB9XG5cdFx0XHR0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBpbiBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRcdH1cblx0fVxuXHRpbmxpbmU9PT1udWxsIHx8IGJlSW5saW5lKHN0YXRpY0FycmF5LCBpbmxpbmUpO1xuXHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG59ICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmNvbnN0IGVxdWFsSW5saW5lVGFibGUgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3QgaW5saW5lVGFibGUgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFksIElOTElORSk7XG5cdGlmICggb3B0aW9ucy5hbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ0lubGluZSBUYWJsZScsIGxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRsZXQgaW5saW5lID0gdHJ1ZTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgYnJlYWs7IH1cblx0XHRcdGNvbnN0IGZvckNvbW1lbnQgICAgICAgICAgICAgPSBGb3JDb21tZW50KGlubGluZVRhYmxlLCBsaW5lUmVzdCk7XG5cdFx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0XHRpZiAoIGxpbmVSZXN0ICkge1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRcdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGRvIHsgbGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGRvIHsgbGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHR9XG5cdFx0aW5saW5lIHx8IGJlSW5saW5lKGlubGluZVRhYmxlLCBmYWxzZSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRpZiAoIGxpbmVSZXN0WzBdIT09J30nICkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihGb3JDb21tZW50KGlubGluZVRhYmxlLCBsaW5lUmVzdCkpO1xuXHRcdFx0XHRsaW5lUmVzdCA9ICggdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0ICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG59ICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEZvckNvbW1lbnQgPSAobGFzdElubGluZVRhYmxlICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgdGFnIH0gPSB7IGxpbmVSZXN0IH0gPSByZWdleHBzLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzKHBhcnNlS2V5cyhsaW5lUmVzdCkpO1xuXHRyZXR1cm4geyB0YWJsZTogcHJlcGFyZUlubGluZVRhYmxlKGxhc3RJbmxpbmVUYWJsZSwgbGVhZGluZ0tleXMpLCBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcbmNvbnN0IGFzc2lnbiA9ICh7IGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0LCB0YWJsZSB9ICAgICAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgRHVwbGljYXRlIHByb3BlcnR5IGRlZmluaXRpb25gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIHRhZyApIHtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICd9Jzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHJldHVybiBlcXVhbElubGluZVRhYmxlKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0cmV0dXJuIGVxdWFsU3RhdGljQXJyYXkodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggbGl0ZXJhbD09PSd0cnVlJyApIHsgdGFibGVbZmluYWxLZXldID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbD09PSdmYWxzZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgdGFibGVbZmluYWxLZXldID0gbnVsbDsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEludGVnZXIobGl0ZXJhbCkpIDogSW50ZWdlcihsaXRlcmFsKVxuXHRcdDtcblx0fVxuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoKSAgICAgICAgPT4ge1xuXHRjb25zdCByb290VGFibGUgICAgICAgID0gbmV3IG9wdGlvbnMuVGFibGU7XG5cdGxldCBsYXN0U2VjdGlvblRhYmxlICAgICAgICA9IHJvb3RUYWJsZTtcblx0d2hpbGUgKCBpdGVyYXRvci5yZXN0KCkgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IubmV4dCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZSApIHtcblx0XHRcdGlmICggbGluZVswXT09PSdbJyApIHtcblx0XHRcdFx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGFzQXJyYXlJdGVtLCB0YWcsIGxpbmVSZXN0IH0gPSByZWdleHBzLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMobGluZSwgcGFyc2VLZXlzKTtcblx0XHRcdFx0Y29uc3QgdGFibGUgICAgICAgID0gcHJlcGFyZVRhYmxlKHJvb3RUYWJsZSwgbGVhZGluZ0tleXMpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0ICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0WzBdPT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciB0YWJsZSBoZWFkZXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxhc3RTZWN0aW9uVGFibGUgPSBhcHBlbmRUYWJsZSh0YWJsZSwgZmluYWxLZXksIGFzQXJyYXlJdGVtLCB0YWcpO1xuXHRcdFx0XHRvcHRpb25zLnByZXNlcnZlQ29tbWVudCAmJiBsaW5lUmVzdCAmJiAoIGxhc3RTZWN0aW9uVGFibGVbY29tbWVudEZvclRoaXNdID0gYXNBcnJheUl0ZW0gPyBsaW5lUmVzdC5zbGljZSgxKSA6IHRhYmxlW2NvbW1lbnRGb3IoZmluYWxLZXkpXSA9IGxpbmVSZXN0LnNsaWNlKDEpICk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggbGluZVswXT09PScjJyApIHtcblx0XHRcdFx0cmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaW5lKSAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBjb21tZW50c2AgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChsYXN0U2VjdGlvblRhYmxlLCBsaW5lKTtcblx0XHRcdFx0bGV0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRcdHR5cGVvZiByZXN0PT09J3N0cmluZycgfHwgKCByZXN0ID0geCAgICAgICAgKHJlc3QpICk7XG5cdFx0XHRcdGlmICggcmVzdCApIHtcblx0XHRcdFx0XHRyZXN0WzBdPT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlQ29tbWVudCApIHsgZm9yQ29tbWVudC50YWJsZVtjb21tZW50Rm9yKGZvckNvbW1lbnQuZmluYWxLZXkpXSA9IHJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBmcm9tQ2hhckNvZGUgZnJvbSAnLlN0cmluZy5mcm9tQ2hhckNvZGUnO1xuaW1wb3J0IGZyb21FbnRyaWVzIGZyb20gJy5PYmplY3QuZnJvbUVudHJpZXMnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgRVNDQVBFRCA9IC8qI19fUFVSRV9fKi9OdWxsICAgICAgICAoe1xuXHQuLi4vKiNfX1BVUkVfXyovZnJvbUVudHJpZXMoLyojX19QVVJFX18qL1sgLi4uQXJyYXkoMHgyMCkgXS5tYXAoKF8sIGNoYXJDb2RlKSA9PiBbIGZyb21DaGFyQ29kZShjaGFyQ29kZSksICdcXFxcdScgKyBjaGFyQ29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5wYWRTdGFydCg0LCAnMCcpIF0pKSxcblx0J1xcYic6ICdcXFxcYicsXG5cdCdcXHQnOiAnXFxcXHQnLFxuXHQnXFxuJzogJ1xcXFxuJyxcblx0J1xcZic6ICdcXFxcZicsXG5cdCdcXHInOiAnXFxcXHInLFxuXHQnXCInOiAnXFxcXFwiJyxcblx0J1wiXCJcIic6ICdcIlwiXFxcXFwiJyxcblx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHQnXFx4N0YnOiAnXFxcXHUwMDdGJyxcbn0pO1xuXG5jb25zdCB7IHRlc3Q6IE5FRURfQkFTSUMgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUYnXFx4N0ZdLyk7XG5jb25zdCBCWV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3wuL2dzO1xuY29uc3QgeyB0ZXN0OiBORUVEX0VTQ0FQRSB9ID0gdGhlUmVnRXhwKC9eW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0vKTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggTkVFRF9CQVNJQyh2YWx1ZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSB2YWx1ZS5tYXRjaChCWV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0cmV0dXJuIGBcIiR7cGFydHMuam9pbignJyl9XCJgO1xuXHR9XG5cdHJldHVybiBgJyR7dmFsdWV9J2A7XG59O1xuZXhwb3J0IGNvbnN0IHNpbmdsZWxpbmVCYXNpY1N0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSB2YWx1ZS5tYXRjaChCWV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0cmV0dXJuIGBcIiR7cGFydHMuam9pbignJyl9XCJgO1xuXHR9XG5cdHJldHVybiBgXCJcImA7XG59O1xuXG5jb25zdCB7IHRlc3Q6IE5FRURfTVVMVElMSU5FX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFx4N0ZdfCcnJy8pO1xuZXhwb3J0IGNvbnN0IHsgdGVzdDogbXVsdGlsaW5lTmVlZEJhc2ljIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdfCcnJy8pO1xuY29uc3QgeyB0ZXN0OiBSRUFMX01VTFRJTElORV9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcXFxcXFx4N0ZdfFwiXCJcIi8pO1xuY29uc3QgQllfTVVMVElMSU5FX0VTQ0FQRSA9IC9bXlxceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0rfFwiXCJcInwuL2dzO1xuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXig/OltcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIpLyk7XG5jb25zdCBlc2NhcGVfbXVsdGlsaW5lID0gKGxpbmVzICAgICAgICAgICwgbGluZUluZGV4ICAgICAgICApID0+IHtcblx0Y29uc3QgbGluZSA9IGxpbmVzW2xpbmVJbmRleF0gO1xuXHRpZiAoIFJFQUxfTVVMVElMSU5FX0VTQ0FQRShsaW5lKSApIHtcblx0XHRjb25zdCBwYXJ0cyA9IGxpbmUubWF0Y2goQllfTVVMVElMSU5FX0VTQ0FQRSkgO1xuXHRcdGxldCBpbmRleCA9IHBhcnRzLmxlbmd0aDtcblx0XHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0bGluZXNbbGluZUluZGV4XSA9IHBhcnRzLmpvaW4oJycpO1xuXHR9XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgTGluZXMgPSAobGluZXMgICAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4gKCBsaW5lcyA9IFsgJycsIC4uLmxpbmVzIF0gICAgICAgICAgKS5sZW5ndGg9PT0xID8gWyAnJywgJycgXSA6IGxpbmVzICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsYXN0SW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRsZXQgaW5kZXggPSBsYXN0SW5kZXg7XG5cdGRvIHsgaWYgKCBORUVEX01VTFRJTElORV9CQVNJQyhsaW5lc1tpbmRleF0gKSApIHsgYnJlYWs7IH0gfVxuXHR3aGlsZSAoIC0taW5kZXggKTtcblx0aWYgKCBpbmRleCApIHtcblx0XHRpbmRleCA9IGxhc3RJbmRleDtcblx0XHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdFx0bGluZXNbaW5kZXhdICs9IGxpbmVzWzBdID0gJ1wiXCJcIic7XG5cdFx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0fVxuXHRlbHNleyBsaW5lc1tsYXN0SW5kZXhdICs9IGxpbmVzWzBdID0gJ1xcJ1xcJ1xcJyc7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgaW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHR3aGlsZSAoIC0taW5kZXggKSB7IGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTsgfVxuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lTGl0ZXJhbFN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdICs9IGxpbmVzWzBdID0gJ1xcJ1xcJ1xcJyc7XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn07XG4iLCJpbXBvcnQgRmxvYXQ2NEFycmF5IGZyb20gJy5GbG9hdDY0QXJyYXknO1xuaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLlVpbnQ4QXJyYXknO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgX0luZmluaXR5ID0gLUluZmluaXR5O1xuXG5jb25zdCB7IHRlc3Q6IElOVEVHRVJfTElLRSB9ID0gdGhlUmVnRXhwKC9eLT9cXGQrJC8pO1xuY29uc3QgZW5zdXJlRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBJTlRFR0VSX0xJS0UobGl0ZXJhbCkgPyBsaXRlcmFsICsgJy4wJyA6IGxpdGVyYWw7XG5cbmNvbnN0IGZsb2F0NjRBcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkoWyBOYU4gXSk7XG5jb25zdCB1aW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZmxvYXQ2NEFycmF5LmJ1ZmZlcik7XG5jb25zdCBOYU5fNyA9IHVpbnQ4QXJyYXlbN10gO1xuXG5leHBvcnQgY29uc3QgZmxvYXQgPSBOYU5fNz09PW5ldyBVaW50OEFycmF5KG5ldyBGbG9hdDY0QXJyYXkoWyAtTmFOIF0pLmJ1ZmZlcilbN10gXG5cdD8gKHZhbHVlICAgICAgICApID0+IHZhbHVlXG5cdFx0PyB2YWx1ZT09PUluZmluaXR5ID8gJ2luZicgOiB2YWx1ZT09PV9JbmZpbml0eSA/ICctaW5mJyA6IGVuc3VyZUZsb2F0KCcnICsgdmFsdWUpXG5cdFx0OiB2YWx1ZT09PXZhbHVlID8gaXModmFsdWUsIDApID8gJzAuMCcgOiAnLTAuMCcgOiAnbmFuJ1xuXHQ6ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHRcdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHRcdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogKCBmbG9hdDY0QXJyYXlbMF0gPSB2YWx1ZSwgdWludDhBcnJheVs3XSApPT09TmFOXzcgPyAnbmFuJyA6ICctbmFuJztcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgREFURSBmcm9tICcuRGF0ZS5wcm90b3R5cGUnO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuY2xhc3MuaXNTdHJpbmcnO1xuaW1wb3J0IGlzTnVtYmVyIGZyb20gJy5jbGFzcy5pc051bWJlcic7XG5pbXBvcnQgaXNCaWdJbnQgZnJvbSAnLmNsYXNzLmlzQmlnSW50JztcbmltcG9ydCBpc0Jvb2xlYW4gZnJvbSAnLmNsYXNzLmlzQm9vbGVhbic7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yVGhpcywgZ2V0Q09NTUVOVCwgZ2V0Q29tbWVudCB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgc2luZ2xlbGluZVN0cmluZyB9IGZyb20gJy4vc3RyaW5nJztcbmltcG9ydCB7IGZsb2F0IH0gZnJvbSAnLi9mbG9hdCc7XG5pbXBvcnQgeyBpc1NlY3Rpb24sIG9mSW5saW5lIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgX2xpdGVyYWwgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcblxuY29uc3QgaXNEYXRlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChEQVRFKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBCQVJFIH0gPSB0aGVSZWdFeHAoL15bXFx3LV0rJC8pO1xuY29uc3QgJEtleSQgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gQkFSRShrZXkpID8ga2V5IDogc2luZ2xlbGluZVN0cmluZyhrZXkpO1xuXG5jb25zdCBGSVJTVCA9IC9bXi5dKy87XG5jb25zdCBsaXRlcmFsU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgID0+IGAnJHt2YWx1ZX0nYDtcbmNvbnN0ICRLZXlzID0gKGtleXMgICAgICAgICkgICAgICAgICA9PiByZWdleHBzLmlzQW1hemluZyhrZXlzKSA/IGtleXMucmVwbGFjZShGSVJTVCwgbGl0ZXJhbFN0cmluZykgOiBrZXlzPT09J251bGwnID8gYCdudWxsJ2AgOiBrZXlzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MU2VjdGlvbiBleHRlbmRzIEFycmF5ICAgICAgICAge1xuXHRcblx0ICAgICAgICAgICAgICAgICBkb2N1bWVudCAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKGRvY3VtZW50ICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgeyByZXR1cm4gdGhpcy5qb2luKHRoaXMuZG9jdW1lbnQubmV3bGluZSk7IH1cblx0XG5cdGFwcGVuZE5ld2xpbmUgKCkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9ICcnOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZExpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gc291cmNlOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZTsgfSAgIFxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmVJZiAoc291cmNlICAgICAgICApIHsgc291cmNlICYmICggdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZSApOyB9Ly8vXG5cdFxuXHQqIGFzc2lnbkJsb2NrICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50S2V5c18gICAgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5c18gICAgICAgICAgICAgICAgICAsIHRhYmxlICAgLCB0YWJsZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICB7XG5cdFx0Y29uc3QgeyBkb2N1bWVudCB9ID0gdGhpcztcblx0XHRjb25zdCB7IG5ld2xpbmVVbmRlckhlYWRlciwgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgfSA9IGRvY3VtZW50O1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlckRvdHRlZCA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgOiBmYWxzZTtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJQYWlyID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyRG90dGVkIDogZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpcjtcblx0XHRmb3IgKCBjb25zdCB0YWJsZUtleSBvZiB0YWJsZUtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSB0YWJsZVt0YWJsZUtleV0gO1xuXHRcdFx0Y29uc3QgJGtleSQgPSAkS2V5JCh0YWJsZUtleSk7XG5cdFx0XHRjb25zdCBkb2N1bWVudEtleXMgPSBkb2N1bWVudEtleXNfICsgJGtleSQ7XG5cdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gdmFsdWU7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGxldCBmaXJzdEl0ZW0gPSB2YWx1ZVswXTtcblx0XHRcdFx0XHRpZiAoIGlzU2VjdGlvbihmaXJzdEl0ZW0pICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGFibGVIZWFkZXIgPSBgW1ske2RvY3VtZW50S2V5c31dXWAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRjb25zdCBkb2N1bWVudEtleXNfID0gZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgIDtcblx0XHRcdFx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRsZXQgdGFibGUgICAgICAgICAgICAgICAgID0gZmlyc3RJdGVtO1xuXHRcdFx0XHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRzZWN0aW9uWzBdID0gdGFibGVIZWFkZXIgKyBnZXRDT01NRU5UKHRhYmxlLCBjb21tZW50Rm9yVGhpcyk7XG5cdFx0XHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggKytpbmRleD09PWxlbmd0aCApIHsgYnJlYWs7IH1cblx0XHRcdFx0XHRcdFx0dGFibGUgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtpbmRleF0gO1xuXHRcdFx0XHRcdFx0XHRpZiAoICFpc1NlY3Rpb24odGFibGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSBmaXJzdCB0YWJsZSBpdGVtIG1hcmtlZCBieSBTZWN0aW9uKCkgbWVhbnMgdGhlIHBhcmVudCBhcnJheSBpcyBhbiBhcnJheSBvZiB0YWJsZXMsIHdoaWNoIGNhbiBub3QgaW5jbHVkZSBvdGhlciB0eXBlcyBvciB0YWJsZSBub3QgbWFya2VkIGJ5IFNlY3Rpb24oKSBhbnkgbW9yZSBpbiB0aGUgcmVzdCBpdGVtc2ApOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IGxldCBpbmRleCA9IDE7IHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IGlmICggaXNTZWN0aW9uKHZhbHVlW2luZGV4KytdICkgKSB7IHRocm93IFR5cGVFcnJvcihgaWYgYW4gYXJyYXkgaXMgbm90IGFycmF5IG9mIHRhYmxlcywgaXQgY2FuIG5vdCBpbmNsdWRlIGFueSB0YWJsZSB0aGF0IG1hcmtlZCBieSBTZWN0aW9uKClgKTsgfSB9IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggaXNTZWN0aW9uKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdHNlY3Rpb25bMF0gPSBgWyR7ZG9jdW1lbnRLZXlzfV0ke1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucHJlZmVyQ29tbWVudEZvclRoaXNcblx0XHRcdFx0XHRcdFx0PyBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcykgfHwgZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpXG5cdFx0XHRcdFx0XHRcdDogZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpIHx8IGdldENPTU1FTlQodmFsdWUsIGNvbW1lbnRGb3JUaGlzKVxuXHRcdFx0XHRcdH1gO1xuXHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZWN0aW9uS2V5cyA9IHNlY3Rpb25LZXlzXyArICRrZXkkO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gJEtleXMoc2VjdGlvbktleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoJycsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdC0tdGhpcy5sZW5ndGg7XG5cdFx0XHRcdHlpZWxkIHRoaXMuYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlckRvdHRlZCAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJQYWlyICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0ICAgICAgICB2YWx1ZSAoaW5kZW50ICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICwgcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgICAgICAgICApICAgICAgICAgICAgICAgICAge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGlmICggdmFsdWU9PT1udWxsICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5kb2N1bWVudC5udWxsRGlzYWJsZWQgKSB7IHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIm51bGxcIiB0eXBlIHZhbHVlIHdpdGhvdXQgdHJ1dGh5IG9wdGlvbnMueE51bGxgKTsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ251bGwnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IGlubGluZU1vZGUgPSBvZklubGluZSh2YWx1ZSk7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZT09PXVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0PyB0aGlzLnN0YXRpY0FycmF5KGluZGVudCwgdmFsdWUpXG5cdFx0XHRcdFx0XHQ6IHRoaXMuc2luZ2xlbGluZUFycmF5KGluZGVudCwgdmFsdWUsIHRoaXMuZG9jdW1lbnQuJHNpbmdsZWxpbmVBcnJheSA/PyBpbmxpbmVNb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlubGluZU1vZGUhPT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZSB8fCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlRGlzYWJsZWRcblx0XHRcdFx0XHRcdD8gdGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHRcdFx0XHRcdFx0OiB0aGlzLm11bHRpbGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVDb21tYSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc0RhdGUodmFsdWUpICkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgdGhpcy5kb2N1bWVudC5UKS5yZXBsYWNlKCdaJywgdGhpcy5kb2N1bWVudC5aKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIF9saXRlcmFsIGluIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnN0IGxpdGVyYWwgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApW19saXRlcmFsXTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBsaXRlcmFsPT09J3N0cmluZycgKSB7IHRoaXMuYXBwZW5kSW5saW5lID0gbGl0ZXJhbDsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KGxpdGVyYWwpICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGxpdGVyYWw7XG5cdFx0XHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBsaXRlcmFsWzBdO1xuXHRcdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyB0aGlzLmFwcGVuZExpbmUgPSBsaXRlcmFsW2luZGV4KytdIDsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgbGl0ZXJhbCB2YWx1ZSBpcyBicm9rZW5gKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBsaXRlcmFsIHZhbHVlIGlzIGJyb2tlbmApOyB9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc1N0cmluZyh2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IFN0cmluZ11gKTsgfVxuXHRcdFx0XHRpZiAoIGlzTnVtYmVyKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgTnVtYmVyXWApOyB9XG5cdFx0XHRcdGlmICggaXNCaWdJbnQodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCaWdJbnRdYCk7IH1cblx0XHRcdFx0aWYgKCBpc0Jvb2xlYW4odmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCb29sZWFuXWApOyB9XG5cdFx0XHRcdGlmICggcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXModmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcdGlmICgga2V5cy5sZW5ndGggKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyB9Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYmlnaW50Jzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdGhpcy5kb2N1bWVudC5hc0ludGVnZXIodmFsdWUpID8gaXModmFsdWUsIC0wKSA/ICctMCcgOiAnJyArIHZhbHVlIDogZmxvYXQodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gc2luZ2xlbGluZVN0cmluZyh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIiR7dHlwZW9mIHZhbHVlfVwiIHR5cGUgdmFsdWVgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdCAgICAgICAgc2luZ2xlbGluZUFycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgLCBpbmxpbmVNb2RlICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnWyAnIDogJ1snO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5WzBdICwgZmFsc2UpO1xuXHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywgJztcblx0XHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5W2luZGV4KytdICwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnIF0nIDogJ10nO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMDEgPyAnWyBdJyA6ICdbXSc7IH1cblx0fVxuXHQgICAgICAgIHN0YXRpY0FycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnWyc7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnRfLCBzdGF0aWNBcnJheVtpbmRleCsrXSAsIGZhbHNlKTtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywnO1xuXHRcdH1cblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnXSc7XG5cdH1cblx0XG5cdCAgICAgICAgaW5saW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSk7XG5cdFx0aWYgKCBrZXlzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgJztcblx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBrZXlzKTtcblx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLTIpICsgJyB9Jztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7IH1cblx0fVxuXHQgICAgICAgIG11bHRpbGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3snO1xuXHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKSwgY29tbWEpO1xuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICd9Jztcblx0fVxuXHQgICAgICAgIGFzc2lnbklubGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdGNvbnN0IGJlZm9yZV92YWx1ZSA9IHRoaXMuYXBwZW5kSW5saW5lID0gJEtleXMoa2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZShpbmRlbnQsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLWJlZm9yZV92YWx1ZS5sZW5ndGgpO1xuXHRcdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJywgJzsgfVxuXHRcdH1cblx0fVxuXHQgICAgICAgIGFzc2lnbk11bHRpbGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbW1hICAgICAgICAgKSB7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBrZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gaW5saW5lVGFibGVba2V5XSA7XG5cdFx0XHRjb25zdCBrZXlzID0ga2V5c18gKyAkS2V5JChrZXkpO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50XyArICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoaW5kZW50XywgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlLCBjb21tYSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29tbWFcblx0XHRcdFx0XHQ/IHRoaXMuYXBwZW5kSW5saW5lID0gJywnICsgZ2V0Q29tbWVudChpbmxpbmVUYWJsZSwga2V5KVxuXHRcdFx0XHRcdDogdGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgVE9NTFNlY3Rpb24gZnJvbSAnLi9zZWN0aW9uJztcblxuY29uc3QgbmFtZTJjb2RlID0gLyojX19QVVJFX18qL051bGwoe1xuXHRkb2N1bWVudDogMCxcblx0c2VjdGlvbjogMSxcblx0aGVhZGVyOiAyLFxuXHRwYWlyczogMyxcblx0cGFpcjogNCxcbn0gICAgICAgICApO1xuXG5jb25zdCB7IHRlc3Q6IElTX0lOREVOVCB9ID0gdGhlUmVnRXhwKC9eW1xcdCBdKiQvKTtcblxuY29uc3QgcmV0dXJuX2ZhbHNlID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRPTUxEb2N1bWVudCBleHRlbmRzIEFycmF5ICAgICAgICAgICAgICB7XG5cdFxuXHQgICAgICAgICBnZXQgWydjb25zdHJ1Y3RvciddICgpIHsgcmV0dXJuIEFycmF5OyB9XG5cdFxuXHQwID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpO1xuXHRcblx0ICAgICAgICAgYXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSByZXR1cm5fZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmUgICAgICAgICAgICAgICAgICAgICA9ICcnO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJTZWN0aW9uICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJIZWFkZXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJQYWlyICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIGluZGVudCAgICAgICAgID0gJ1xcdCc7XG5cdCAgICAgICAgIFQgICAgICAgICAgICAgICAgICA9ICdUJztcblx0ICAgICAgICAgWiAgICAgICAgICAgID0gJ1onO1xuXHQgICAgICAgICBudWxsRGlzYWJsZWQgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZURpc2FibGVkICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVDb21tYSAgICAgICAgICA7XG5cdCAgICAgICAgIHByZWZlckNvbW1lbnRGb3JUaGlzICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgICRzaW5nbGVsaW5lQXJyYXkgICAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMgICAgICAgICAgICAgICAgICApIHtcblx0XHRcblx0XHRzdXBlcigpO1xuXHRcdFxuXHRcdGlmICggb3B0aW9ucz09bnVsbCApIHsgcmV0dXJuIHRoaXM7IH1cblx0XHRcblx0XHRjb25zdCB7IGludGVnZXIgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBpbnRlZ2VyPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggaW50ZWdlcj09PU1BWF9TQUZFX0lOVEVHRVIgKSB7IHRoaXMuYXNJbnRlZ2VyID0gaXNTYWZlSW50ZWdlcjsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW50ZWdlcj09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbnRlZ2VyKSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgYSBzYWZlIGludGVnZXJgKTsgfVxuXHRcdFx0Y29uc3QgbWF4ID0gaW50ZWdlcj49MCA/IGludGVnZXIgOiAtaW50ZWdlciAtIDE7XG5cdFx0XHRjb25zdCBtaW4gPSBpbnRlZ2VyPj0wID8gLWludGVnZXIgOiBpbnRlZ2VyO1xuXHRcdFx0dGhpcy5hc0ludGVnZXIgPSAobnVtYmVyICAgICAgICApID0+IGlzU2FmZUludGVnZXIobnVtYmVyKSAmJiBtaW48PW51bWJlciAmJiBudW1iZXI8PW1heDtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgbnVtYmVyYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IG5ld2xpbmUgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBuZXdsaW5lPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggbmV3bGluZT09PSdcXG4nIHx8IG5ld2xpbmU9PT0nXFxyXFxuJyApIHsgdGhpcy5uZXdsaW5lID0gbmV3bGluZTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgdHlwZW9mIG5ld2xpbmU9PT0nc3RyaW5nJ1xuXHRcdFx0XHQ/IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSB2YWxpZCBUT01MIG5ld2xpbmVgKVxuXHRcdFx0XHQ6IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgc3RyaW5nYCk7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHsgcHJlZmVyQ29tbWVudEZvciB9ID0gb3B0aW9ucztcblx0XHRpZiAoIHByZWZlckNvbW1lbnRGb3I9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBwcmVmZXJDb21tZW50Rm9yPT09J3RoaXMnIHx8IHByZWZlckNvbW1lbnRGb3I9PT0na2V5JyApIHsgdGhpcy5wcmVmZXJDb21tZW50Rm9yVGhpcyA9IHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcyc7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse3ByZWZlckNvbW1lbnRGb3IpIGNhbiBvbmx5IGJlICdrZXknIG9yICd0aGlzJ2ApOyB9XG5cdFx0XG5cdFx0Y29uc3QgYXJvdW5kID0gbmFtZTJjb2RlW29wdGlvbnMubmV3bGluZUFyb3VuZCA/PyAnaGVhZGVyJ10gPz8gbmFtZTJjb2RlLmhlYWRlcjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclNlY3Rpb24gPSBhcm91bmQ+MDtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyID0gYXJvdW5kPT09MSB8fCBhcm91bmQ9PT0yO1xuXHRcdHRoaXMubmV3bGluZVVuZGVySGVhZGVyID0gYXJvdW5kPjE7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJQYWlyID0gYXJvdW5kPjI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJQYWlyQnV0RG90dGVkID0gYXJvdW5kPT09Mztcblx0XHR0aGlzLm5ld2xpbmVVbmRlckRvdHRlZCA9IGFyb3VuZD4zO1xuXHRcdFxuXHRcdGNvbnN0IHsgaW5kZW50IH0gPSBvcHRpb25zO1xuXHRcdGlmICggaW5kZW50PT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggdHlwZW9mIGluZGVudD09PSdzdHJpbmcnICkge1xuXHRcdFx0aWYgKCAhSVNfSU5ERU5UKGluZGVudCkgKSB7IHRocm93IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBvbmx5IGluY2x1ZGUgVGFiIG9yIFNwYWNlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gaW5kZW50O1xuXHRcdH1cblx0XHRlbHNlIGlmICggdHlwZW9mIGluZGVudD09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbmRlbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudDoke2luZGVudH19KSBpcyBvdXQgb2YgcmFuZ2VgKTsgfVxuXHRcdFx0dGhpcy5pbmRlbnQgPSAnICcucmVwZWF0KGluZGVudCk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50fSkgY2FuIG5vdCBiZSBcIiR7dHlwZW9mIGluZGVudH1cIiB0eXBlYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IFQgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBUPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggVD09PScgJyB8fCBUPT09J3QnIHx8IFQ9PT0nVCcgKSB7IHRoaXMuVCA9IFQ7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse1R9KSBjYW4gb25seSBiZSBcIlRcIiBvciBcIiBcIiBvciBcInRcImApOyB9XG5cdFx0XG5cdFx0Y29uc3QgeyBaIH0gPSBvcHRpb25zO1xuXHRcdGlmICggWj09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIFo9PT0neicgfHwgWj09PSdaJyApIHsgdGhpcy5aID0gWjsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7Wn0pIGNhbiBvbmx5IGJlIFwiWlwiIG9yIFwielwiYCk7IH1cblx0XHRcblx0XHRpZiAoIG9wdGlvbnMueE51bGwgKSB7IHRoaXMubnVsbERpc2FibGVkID0gZmFsc2U7IH1cblx0XHRcblx0XHRjb25zdCB7IHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZSB9ID0gb3B0aW9ucztcblx0XHRpZiAoIHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PScnIHx8IHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PScsJyApIHtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZUNvbW1hID0gISF4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7eEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlfSkgY2FuIG9ubHkgYmUgXCJcIiBvciBcIixcImApOyB9XG5cdFx0XG5cdFx0Y29uc3QgJHNpbmdsZWxpbmVBcnJheSA9IG9wdGlvbnMuZm9yY2VJbmxpbmVBcnJheVNwYWNpbmc7XG5cdFx0c3dpdGNoICggJHNpbmdsZWxpbmVBcnJheSApIHtcblx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMDpcblx0XHRcdGNhc2UgMTpcblx0XHRcdGNhc2UgMjpcblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0dGhpcy4kc2luZ2xlbGluZUFycmF5ID0gJHNpbmdsZWxpbmVBcnJheTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyB0eXBlb2YgJHNpbmdsZWxpbmVBcnJheT09PSdudW1iZXInXG5cdFx0XHRcdFx0PyBSYW5nZUVycm9yKGBhcnJheSBpbmxpbmUgbW9kZSBtdXN0IGJlIDAgfCAxIHwgMiB8IDMsIG5vdCBpbmNsdWRpbmcgJHskc2luZ2xlbGluZUFycmF5fWApXG5cdFx0XHRcdFx0OiBUeXBlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgXCJudW1iZXJcIiB0eXBlLCBub3QgaW5jbHVkaW5nICR7JHNpbmdsZWxpbmVBcnJheT09PW51bGwgPyAnXCJudWxsXCInIDogdHlwZW9mICRzaW5nbGVsaW5lQXJyYXl9YCk7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB0aGlzO1xuXHRcdFxuXHR9XG5cdFxuXHRhcHBlbmRTZWN0aW9uICgpIHsgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGhdID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpOyB9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB4IH0gZnJvbSAnLi4vai1sZXhlcic7Ly8vIGV4dGVybmFsXG5cbmltcG9ydCBUT01MRG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCc7XG5jb25zdCBsaW5lc0Zyb21TdHJpbmdpZnkgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAgICAoKTtcbmNvbnN0IGJlTGluZXNGcm9tU3RyaW5naWZ5ID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGxpbmVzRnJvbVN0cmluZ2lmeSk7XG5leHBvcnQgY29uc3QgaXNMaW5lc0Zyb21TdHJpbmdpZnkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQobGluZXNGcm9tU3RyaW5naWZ5KTtcbmV4cG9ydCBkZWZhdWx0IChyb290VGFibGUgICAgICAgICAgICAgICAgLCBvcHRpb25zICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBkb2N1bWVudCA9IG5ldyBUT01MRG9jdW1lbnQob3B0aW9ucyk7XG5cdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudFswXTtcblx0c2VjdGlvblswXSA9ICcnO1xuXHR4ICAgICAgKHNlY3Rpb24uYXNzaWduQmxvY2soYGAsIGBgLCByb290VGFibGUsIGdldE93blByb3BlcnR5TmFtZXMocm9vdFRhYmxlKSkpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTEgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdGRvY3VtZW50Lm5ld2xpbmVVbmRlclNlY3Rpb24gfHwgZG9jdW1lbnRbZG9jdW1lbnQubGVuZ3RoIC0gMV0gLmFwcGVuZE5ld2xpbmUoKTtcblx0aWYgKCBkb2N1bWVudC5uZXdsaW5lICkgeyByZXR1cm4gZG9jdW1lbnQuam9pbihkb2N1bWVudC5uZXdsaW5lKTsgfVxuXHRjb25zdCBsaW5lcyA9IGRvY3VtZW50LmZsYXQoKTtcblx0YmVMaW5lc0Zyb21TdHJpbmdpZnkobGluZXMpO1xuXHRyZXR1cm4gbGluZXM7XG59O1xuXG5leHBvcnQgeyBpbmxpbmUsIFNlY3Rpb24gfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5leHBvcnQgeyBfbGl0ZXJhbCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgbXVsdGlsaW5lVGFibGUsIG11bHRpbGluZUFycmF5IH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgc2luZ2xlbGluZUJhc2ljU3RyaW5nLCBMaW5lcywgbXVsdGlsaW5lU3RyaW5nLCBtdWx0aWxpbmVCYXNpY1N0cmluZywgbXVsdGlsaW5lTGl0ZXJhbFN0cmluZywgbXVsdGlsaW5lTmVlZEJhc2ljIH0gZnJvbSAnLi9zdHJpbmcnO1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgbXVsdGlsaW5lID0gKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdHJpbmcgICAgICAgICApID0+XG5cdFx0dHlwZW9mIHZhbHVlPT09J3N0cmluZycgPyBMaXRlcmFsT2JqZWN0KCggbXVsdGlsaW5lTmVlZEJhc2ljKHZhbHVlKSA/IG11bHRpbGluZUJhc2ljU3RyaW5nIDogbXVsdGlsaW5lTGl0ZXJhbFN0cmluZyApKCggJ1xcbicgKyB2YWx1ZSApLnNwbGl0KCdcXG4nKSAgICAgICAgICksIHZhbHVlKSA6XG5cdFx0XHRpc0FycmF5KHZhbHVlKSA/IExpdGVyYWxPYmplY3QobXVsdGlsaW5lU3RyaW5nKExpbmVzKHZhbHVlKSksIHR5cGVvZiBzdHJpbmc9PT0nc3RyaW5nJyA/IHN0cmluZyA6IE51bGwobnVsbCkpIDpcblx0XHRcdFx0bXVsdGlsaW5lVGFibGUodmFsdWUpO1xuXHRtdWx0aWxpbmUuYmFzaWMgPSAobGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdHJpbmcgICAgICAgICApID0+XG5cdFx0dHlwZW9mIGxpbmVzPT09J3N0cmluZydcblx0XHRcdD8gTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVCYXNpY1N0cmluZygoICdcXG4nICsgbGluZXMgKS5zcGxpdCgnXFxuJykgICAgICAgICApLCBsaW5lcylcblx0XHRcdDogTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVCYXNpY1N0cmluZyhMaW5lcyhsaW5lcykpLCB0eXBlb2Ygc3RyaW5nPT09J3N0cmluZycgPyBzdHJpbmcgOiBOdWxsKG51bGwpKVxuXHQ7XG5cdG11bHRpbGluZS5hcnJheSA9IG11bHRpbGluZUFycmF5O1xuXHRmcmVlemUobXVsdGlsaW5lKTtcblx0cmV0dXJuIG11bHRpbGluZTtcbn0gKSgpO1xuZXhwb3J0IGNvbnN0IGJhc2ljID0gKHZhbHVlICAgICAgICApID0+IExpdGVyYWxPYmplY3Qoc2luZ2xlbGluZUJhc2ljU3RyaW5nKHZhbHVlKSwgdmFsdWUpO1xuZXhwb3J0IGNvbnN0IGxpdGVyYWwgPSAobGl0ZXJhbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIC4uLmNoYXJzICAgICAgICAgICkgPT4ge1xuXHRpZiAoIHR5cGVvZiBsaXRlcmFsPT09J3N0cmluZycgKSB7XG5cdFx0aWYgKCBjaGFycy5sZW5ndGg9PT0xICkge1xuXHRcdFx0cmV0dXJuIExpdGVyYWxPYmplY3QobGl0ZXJhbC5pbmNsdWRlcygnXFxuJykgPyBsaXRlcmFsLnNwbGl0KCdcXG4nKSAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxpdGVyYWwsIGNoYXJzWzBdICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxldCBpbmRleCA9IGNoYXJzLmxlbmd0aDtcblx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0Y29uc3QgeyByYXcgfSA9IGxpdGVyYWw7XG5cdFx0XHRsaXRlcmFsID0gcmF3W2luZGV4XSA7XG5cdFx0XHR3aGlsZSAoIGluZGV4ICkgeyBjaGFyc1stLWluZGV4XSArPSByYXdbaW5kZXhdIDsgfVxuXHRcdFx0bGl0ZXJhbCA9IGNoYXJzLmpvaW4oJycpICsgbGl0ZXJhbDtcblx0XHR9XG5cdFx0ZWxzZSB7IGxpdGVyYWwgPSBsaXRlcmFsLnJhd1swXSA7IH1cblx0fVxuXHRyZXR1cm4gTGl0ZXJhbE9iamVjdChsaXRlcmFsLmluY2x1ZGVzKCdcXG4nKSA/IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbGl0ZXJhbCwgTnVsbChudWxsKSk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBpc1ZpZXcgZnJvbSAnLkFycmF5QnVmZmVyLmlzVmlldyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5pbXBvcnQgaXNBcnJheUJ1ZmZlciBmcm9tICcuY2xhc3MuaXNBcnJheUJ1ZmZlcic7XG5pbXBvcnQgVGV4dERlY29kZXIgZnJvbSAnLlRleHREZWNvZGVyJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IFJvb3QgZnJvbSAnLi9sZXZlbC1sb29wJztcbmltcG9ydCB7IGlzTGluZXNGcm9tU3RyaW5naWZ5IH0gZnJvbSAnLi4vc3RyaW5naWZ5Lyc7XG5cbmNvbnN0IHRleHREZWNvZGVyID0gLyojX19QVVJFX18qL25ldyBUZXh0RGVjb2RlcigndXRmLTgnLCBOdWxsKHsgZmF0YWw6IHRydWUsIGlnbm9yZUJPTTogZmFsc2UgfSkpO1xuY29uc3QgYmluYXJ5MnN0cmluZyA9IChhcnJheUJ1ZmZlckxpa2UgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggaXNWaWV3KGFycmF5QnVmZmVyTGlrZSkgPyBhcnJheUJ1ZmZlckxpa2UubGVuZ3RoIT09YXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggOiAhaXNBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlckxpa2UpICkgeyB0aHJvdyBUeXBlRXJyb3IoYG9ubHkgVWludDhBcnJheSBvciBBcnJheUJ1ZmZlciBpcyBhY2NlcHRhYmxlYCk7IH1cblx0dHJ5IHsgcmV0dXJuIHRleHREZWNvZGVyLmRlY29kZShhcnJheUJ1ZmZlckxpa2UpOyB9XG5cdGNhdGNoIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuYCk7IH1cbn07XG5jb25zdCBpc0JpbmFyeUxpa2UgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiAnYnl0ZUxlbmd0aCcgaW4gdmFsdWU7Ly8vXG5cbmNvbnN0IHsgdGVzdDogaW5jbHVkZXNOb25TY2FsYXIgfSA9IHRoZVJlZ0V4cCgvW1xcdUQ4MDAtXFx1REZGRl0vdSk7XG5jb25zdCBhc3NlcnRGdWxTY2FsYXIgPSAoc3RyaW5nICAgICAgICApICAgICAgID0+IHtcblx0aWYgKCBjbGVhclJlZ0V4cChpbmNsdWRlc05vblNjYWxhcihzdHJpbmcpKSApIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuYCk7IH1cbn07XG5cbmxldCBob2xkaW5nICAgICAgICAgID0gZmFsc2U7XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgYmlnaW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcmdzTW9kZSAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5cdGlmICggdHlwZW9mIHNvdXJjZT09PSdvYmplY3QnICYmIHNvdXJjZSApIHtcblx0XHRpZiAoIGlzQXJyYXkoc291cmNlKSApIHsgdGhyb3cgVHlwZUVycm9yKGlzTGluZXNGcm9tU3RyaW5naWZ5KHNvdXJjZSkgPyBgVE9NTC5wYXJzZShhcnJheSBmcm9tIFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZT99KSlgIDogYFRPTUwucGFyc2UoYXJyYXkpYCk7IH1cblx0XHRlbHNlIGlmICggaXNCaW5hcnlMaWtlKHNvdXJjZSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoc291cmNlKTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnBhdGgpYCk7IH1cblx0XHRcdGNvbnN0IHsgZGF0YSwgcmVxdWlyZTogcmVxID0gdHlwZW9mIHJlcXVpcmU9PT0nZnVuY3Rpb24nID8gcmVxdWlyZSA6IHVuZGVmaW5lZCB9ID0gc291cmNlO1xuXHRcdFx0aWYgKCByZXEgKSB7XG5cdFx0XHRcdGNvbnN0IGRpcm5hbWVfID0gcmVxLnJlc29sdmU/LnBhdGhzPy4oJycpPy5bMF0/LnJlcGxhY2UoL25vZGVfbW9kdWxlcyQvLCAnJyk7XG5cdFx0XHRcdGlmICggZGlybmFtZV8gKSB7XG5cdFx0XHRcdFx0c291cmNlUGF0aCA9ICggcmVxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSgncGF0aCcpLnJlc29sdmUoZGlybmFtZV8sIHNvdXJjZVBhdGgpO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdwYXRoJykucmVzb2x2ZSlgKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gKCByZXEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ2ZzJykucmVhZEZpbGVTeW5jKHNvdXJjZVBhdGgpO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGRhdGE9PT0nb2JqZWN0JyAmJiBkYXRhICYmIGlzQmluYXJ5TGlrZShkYXRhKSApIHsgc291cmNlID0gYmluYXJ5MnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKWApOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J3N0cmluZycgKSB7IGFzc2VydEZ1bFNjYWxhcihzb3VyY2UgPSBkYXRhKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nb2JqZWN0JyAmJiBkYXRhICYmIGlzQmluYXJ5TGlrZShkYXRhKSApIHsgc291cmNlID0gYmluYXJ5MnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5kYXRhKWApOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBkYXRhPT09dW5kZWZpbmVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLmRhdGF8c291cmNlLnJlcXVpcmUpYCk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J3N0cmluZycgKSB7IGFzc2VydEZ1bFNjYWxhcihzb3VyY2UgPSBkYXRhKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nb2JqZWN0JyAmJiBkYXRhICYmIGlzQmluYXJ5TGlrZShkYXRhKSApIHsgc291cmNlID0gYmluYXJ5MnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5kYXRhKWApOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlPT09J3N0cmluZycgKSB7IGFzc2VydEZ1bFNjYWxhcihzb3VyY2UpOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlKWApOyB9XG5cdGxldCBqb2luZXIgICAgICAgICAgICAgICAgICAgIDtcblx0bGV0IGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggdHlwZW9mIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PSdvYmplY3QnICYmIG11bHRpbGluZVN0cmluZ0pvaW5lciApIHtcblx0XHRpZiAoIGJpZ2ludCE9PXVuZGVmaW5lZCB8fCB4IT09dW5kZWZpbmVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYG9wdGlvbnMgbW9kZSA/IGFyZ3MgbW9kZWApOyB9XG5cdFx0am9pbmVyID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyLmpvaW5lcjtcblx0XHRiaWdpbnQgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuYmlnaW50O1xuXHRcdGtleXMgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIua2V5cztcblx0XHR4ID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyLng7XG5cdFx0YXJnc01vZGUgPSAnJztcblx0fVxuXHRlbHNlIHsgam9pbmVyID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyOyB9XG5cdGxldCByb290VGFibGUgICAgICAgO1xuXHRsZXQgcHJvY2VzcyAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIGhvbGRpbmcgKSB7IHRocm93IEVycm9yKGBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLmApOyB9XG5cdGhvbGRpbmcgPSB0cnVlO1xuXHR0cnkge1xuXHRcdG9wdGlvbnMudXNlKHNwZWNpZmljYXRpb25WZXJzaW9uLCBqb2luZXIsIGJpZ2ludCwga2V5cywgeCwgYXJnc01vZGUpO1xuXHRcdGl0ZXJhdG9yLnRvZG8oc291cmNlLCBzb3VyY2VQYXRoKTtcblx0XHRzb3VyY2UgJiYgc291cmNlWzBdPT09J1xcdUZFRkYnICYmIGl0ZXJhdG9yLnRocm93cyhUeXBlRXJyb3IoYFRPTUwgY29udGVudCAoc3RyaW5nKSBzaG91bGQgbm90IHN0YXJ0IHdpdGggQk9NIChVK0ZFRkYpYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRyb290VGFibGUgPSBSb290KCk7XG5cdFx0cHJvY2VzcyA9IG9wdGlvbnMuUHJvY2VzcygpO1xuXHR9XG5cdGZpbmFsbHkge1xuXHRcdGl0ZXJhdG9yLmRvbmUoKTsvL2NsZWFyV2Vha1NldHMoKTtcblx0XHRvcHRpb25zLmNsZWFyKCk7XG5cdFx0aG9sZGluZyA9IGZhbHNlO1xuXHRcdGNsZWFyUmVnRXhwKCk7XG5cdH1cblx0cHJvY2Vzcz8uKCk7XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovYXNzaWduKFxuXHQoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBzcGVjaWZpY2F0aW9uVmVyc2lvbj09PSdudW1iZXInXG5cdFx0XHQ/IHBhcnNlKHNvdXJjZSwgc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywsJylcblx0XHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgICwgJywnKVxuXHQsXG5cdHtcblx0XHQnMS4wJzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQxLjA6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMS4wLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuNDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjQsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjM6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4zLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuMTogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0fVxuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHQgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcblxuaW1wb3J0IHsgS2V5cyB9IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZS8nO1xuaW1wb3J0IHN0cmluZ2lmeSwgeyBTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwgfSBmcm9tICcuL3N0cmluZ2lmeS8nO1xuaW1wb3J0IHsgT2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lIH0gZnJvbSAnLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBpc0lubGluZSwgaXNTZWN0aW9uIH0gZnJvbSAnLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyB9IGZyb20gJy4vdHlwZXMvY29tbWVudCc7XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcblx0U2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsLCBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyxcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxuXHRpc0lubGluZSwgaXNTZWN0aW9uLFxuXHRLZXlzLFxufSk7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCwgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMsXG5cdE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSxcblx0aXNJbmxpbmUsIGlzU2VjdGlvbixcblx0S2V5cyxcbn07XG4iXSwibmFtZXMiOlsiVHlwZUVycm9yIiwiU3ludGF4RXJyb3IiLCJSZWdFeHAiLCJQcm94eSIsImFwcGx5IiwiY3JlYXRlIiwiV2Vha01hcCIsIk9iamVjdF9hc3NpZ24iLCJPYmplY3RfY3JlYXRlIiwiUmVmbGVjdF9vd25LZXlzIiwiT2JqZWN0X2ZyZWV6ZSIsIldlYWtTZXQiLCJzZXRfZGVsIiwibWFwX2dldCIsIm1hcF9zZXQiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiUmFuZ2VFcnJvciIsInNldF9oYXMiLCJzZXRfYWRkIiwiTnVsbCIsIm9yZGVyaWZ5X051bGwiLCJFcnJvciIsIml0ZXJhdG9yLnRocm93cyIsIml0ZXJhdG9yLndoZXJlIiwiS0VZUyIsInJlZ2V4cHMuc3dpdGNoUmVnRXhwIiwiU3ltYm9sIiwiT2JqZWN0IiwiREFURSIsIm9wdGlvbnMuemVyb0RhdGV0aW1lIiwicGFyc2UiLCJwYXJzZUludCIsIm9wdGlvbnMubXVzdFNjYWxhciIsIml0ZXJhdG9yLmxpbmVJbmRleCIsIlVOREVSU0NPUkVTIiwiQmlnSW50Iiwib3B0aW9ucy5hbGxvd0xvbmdlciIsIm9wdGlvbnMudXNpbmdCaWdJbnQiLCJvcHRpb25zLkludGVnZXJNaW5OdW1iZXIiLCJvcHRpb25zLkludGVnZXJNYXhOdW1iZXIiLCJOYU4iLCJfSW5maW5pdHkiLCJvcHRpb25zLnNGbG9hdCIsIm9wdGlvbnMuc0Vycm9yIiwiaXNGaW5pdGUiLCJvcHRpb25zLlRhYmxlIiwib3B0aW9ucy5jb2xsZWN0IiwicmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCIsInJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyIsIm9wdGlvbnMucHJlc2VydmVMaXRlcmFsIiwicmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yLm1hcmsiLCJvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmciLCJvcHRpb25zLkFSR1NfTU9ERSIsInJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCIsInJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UiLCJyZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgiLCJyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0Iiwib3B0aW9ucy5LRVlTIiwicmVnZXhwcy5fX0xJVEVSQUxfS0VZX2V4ZWMiLCJyZWdleHBzLl9fQkFSRV9LRVlfZXhlYyIsInJlZ2V4cHMuSVNfRE9UX0tFWSIsInJlZ2V4cHMuRE9UX0tFWSIsIm9wdGlvbnMuZGlzYWJsZURpZ2l0IiwicmVnZXhwcy5pc0FtYXppbmciLCJvcHRpb25zLmVuYWJsZU51bGwiLCJvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkiLCJyZWdleHBzLl9WQUxVRV9QQUlSX2V4ZWMiLCJvcHRpb25zLmFzU3RyaW5ncyIsIm9wdGlvbnMuaW5saW5lVGFibGUiLCJvcHRpb25zLmFzVGFibGVzIiwib3B0aW9ucy5hc0FycmF5cyIsInJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjIiwib3B0aW9ucy5hc0Jvb2xlYW5zIiwib3B0aW9ucy5hc051bGxzIiwib3B0aW9ucy5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMubW9yZURhdGV0aW1lIiwib3B0aW9ucy5hc0xvY2FsRGF0ZVRpbWVzIiwib3B0aW9ucy5hc0xvY2FsVGltZXMiLCJvcHRpb25zLmFzTG9jYWxEYXRlcyIsIm9wdGlvbnMuYXNGbG9hdHMiLCJvcHRpb25zLmFzSW50ZWdlcnMiLCJyZWdleHBzLlNZTV9XSElURVNQQUNFIiwib3B0aW9ucy5hbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hIiwib3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQiLCJyZWdleHBzLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIiwiaXRlcmF0b3IucmVzdCIsIml0ZXJhdG9yLm5leHQiLCJyZWdleHBzLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJBcnJheSIsIkZsb2F0NjRBcnJheSIsIlVpbnQ4QXJyYXkiLCJUZXh0RGVjb2RlciIsImNsZWFyUmVnRXhwIiwib3B0aW9ucy51c2UiLCJpdGVyYXRvci50b2RvIiwib3B0aW9ucy5Qcm9jZXNzIiwiaXRlcmF0b3IuZG9uZSIsIm9wdGlvbnMuY2xlYXIiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJZixJQUFJLElBQUksNkNBQTZDLElBQUk7QUFDaEUsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRO0FBQ3RDLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDakIsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFO0FBQzNCLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUM7QUFDSixFQUFFLENBQUM7QUFDSDtBQUNPLElBQUksSUFBSSw2Q0FBNkMsSUFBSTtBQUNoRSxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVE7QUFDdEMsR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUNqQixFQUFFLE9BQU8sVUFBVSxNQUFNLEVBQUU7QUFDM0IsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQztBQUNKLEVBQUUs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QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQzNMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3pMLEVBQUU7QUFDRixDQUFDOztBQ3ZHRCxnQkFBZSxhQUFhLE9BQU8sQ0FBQztBQUNwQyxDQUFDLE9BQU87QUFDUixRQUFDckUsT0FBSztBQUNOLENBQUMsU0FBUztBQUNWLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYztBQUN2RSxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFNBQVM7QUFDcEQsQ0FBQyxRQUFRLEVBQUUsU0FBUztBQUNwQixDQUFDLElBQUk7QUFDTCxDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIn0=