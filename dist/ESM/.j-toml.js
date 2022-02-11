/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.29.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

import Error from '.Error';
import TypeError from '.TypeError';
import Object_assign from '.Object.assign';
import hasOwn from '.Object.hasOwn?=';
import undefined$1 from '.undefined';
import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import RangeError from '.RangeError';
import BigInt from '.BigInt';
import WeakMap from '.WeakMap';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import Object_create from '.Object.create';
import isSafeInteger from '.Number.isSafeInteger';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import NULL from '.null.prototype';
import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import set_del from '.WeakSet.prototype.delete';
import Null$1 from '.null';
import Proxy$1 from '.Proxy';
import Object_defineProperty from '.Object.defineProperty';
import freeze$1 from '.Object.freeze';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import Reflect_ownKeys from '.Reflect.ownKeys';
import map_has from '.WeakMap.prototype.has';
import map_del from '.WeakMap.prototype.delete';
import isArray$1 from '.Array.isArray';
import Symbol from '.Symbol';
import Object$1 from '.Object';
import NativeDate from '.Date';
import parse$2 from '.Date.parse';
import preventExtensions from '.Object.preventExtensions';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import defineProperties from '.null.defineProperties';
import parseInt from '.parseInt';
import fromCharCode from '.String.fromCharCode';
import fromCodePoint from '.String.fromCodePoint';
import Number from '.Number';
import isFinite from '.isFinite';
import Infinity from '.Infinity';
import NaN$1 from '.NaN';
import species from '.Symbol.species';
import Uint8Array from '.Uint8Array';
import Buffer from '.Buffer?';
import Array from '.Array';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import DATE$1 from '.Date.prototype';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import is from '.Object.is';
import isString from '.class.isString';
import isNumber from '.class.isNumber';
import isBigInt from '.class.isBigInt';
import isBoolean from '.class.isBoolean';
import Object_fromEntries from '.Object.fromEntries';
import Default from '.default';

const version = '1.29.0';

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
			if ( typeof value_source!=='string' ) { throw TypeError('source'); }
			if ( value.unicode===U ) { throw SyntaxError('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT, '');
	}
	var re         = RegExp(U ? source = source.replace(ESCAPE, graveAccentReplacer) : source, this.flags);
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

var newRegExp = Proxy
	? /*#__PURE__*/new Proxy(RE, {
		apply: function (RE, thisArg, args                                   ) { return apply(RE, CONTEXT, args); }
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

var clearRegExp = '$_' in RegExp
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

/*¡ j-regexp */

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
	if ( typeof path!=='string' ) { throw TypeError('TOML.parse(,,,,sourcePath)'); }
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
		lineIndex===lastLineIndex && throws(SyntaxError(`${this.type} is not close until the end of the file` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
		return sourceLines[++lineIndex] ;
	}
	nowrap (          )        {
		throw throws(Error(`TOML.parse(,,multilineStringJoiner) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
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
	const weakMap = new WeakMap;
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

const handlers                       = /*#__PURE__*/Object_assign(Object_create(NULL), {
	defineProperty:                 (target                   , key   , descriptor                    )          => {
		if ( hasOwn(target, key) ) {
			return Reflect_defineProperty(target, key, Object_assign(Object_create(NULL), descriptor));
		}
		if ( Reflect_defineProperty(target, key, Object_assign(Object_create(NULL), descriptor)) ) {
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
	proxy = newProxy(object, Object_assign(Keeper          (), Reflect_ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

const Null = /*#__PURE__*/function () {
	function throwConstructing ()        { throw TypeError(`Super constructor Null cannot be invoked with 'new'`); }
	function throwApplying ()        { throw TypeError(`Super constructor Null cannot be invoked without 'new'`); }
	const Nullify = (constructor                             ) => {
		delete constructor.prototype.constructor;
		freeze$1(constructor.prototype);
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
	Object_defineProperty(Null, 'name', Object_assign(Object_create(NULL), { value: '', configurable: false }));
	//delete Null.length;
	freeze$1(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const INLINES = new WeakMap                                                                     ();
const SECTIONS = new WeakSet                ();

const deInline = /*#__PURE__*/map_del.bind(INLINES)                                                                              ;
const deSection = /*#__PURE__*/set_del.bind(SECTIONS)                                                  ;

const isInline = /*#__PURE__*/map_has.bind(INLINES)                                                  ;
const ofInline = /*#__PURE__*/map_get.bind(INLINES)     
	                                                                          
	                                                               
	                                       
 ;
const beInline = /*#__PURE__*/map_set.bind(INLINES)     
	                                                                                  
	                                                                       
 ;
const inline =                                                         (value   , mode                , looping         )    => {
	if ( isArray$1(value) ) {
		if ( looping ) { mode = 3; }
		else {
			if ( mode===undefined$1 ) { mode = 3; }
			else if ( mode!==0 && mode!==1 && mode!==2 && mode!==3 ) {
				throw typeof mode==='number'
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${mode}`)
					: TypeError(`array inline mode must be "number" type, not including ${mode===null ? '"null"' : typeof mode}`);
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
	if ( isArray$1(table) ) { throw TypeError(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	deInline(table);
	return table;
};

const INLINE = true;

const tables = new WeakSet       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                              ;

const implicitTables = new WeakSet       ();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_del = /*#__PURE__*/set_del.bind(implicitTables)                                         ;
const directlyIfNot = (table       )          => {
	if ( implicitTables_del(table) ) {
		beSection(table);
		return true;
	}
	return false;
};
const DIRECTLY = true;
const IMPLICITLY = false;

const pairs = new WeakSet       ();
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
	lastIndex!==line.length && line[lastIndex]==='"' || throws(SyntaxError(`Bad basic string` + where(' at ')));
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
		supportArrayOfTables || throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')));
		lineRest = lineRest.slice(2);
	}
	else { lineRest = lineRest.slice(1); }
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	const { leadingKeys, finalKey } = { lineRest } = parseKeys(lineRest);
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	lineRest && lineRest[0]===']' || throws(SyntaxError(`Table header is not closed` + where(', which is found at ')));
	( lineRest.length>1 ? lineRest[1]===']'===asArrayItem : !asArrayItem ) || throws(SyntaxError(`Square brackets of Table definition statement not match` + where(' at ')));
	lineRest = lineRest.slice(asArrayItem ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( lineRest && lineRest[0]==='<' ) { ( { 1: tag, 2: lineRest } = TAG_REST_exec(lineRest) ?? throws(SyntaxError(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
};

const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest }                                                               )                                                                             => {
	const { 1: tag = '' } = { 2: lineRest } = KEY_VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError(`Keys must equal something` + where(', but missing at ')));
	tag || lineRest && lineRest[0]!=='#' || throws(SyntaxError(`Value can not be missing after euqal sign` + where(', which is found at ')));
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

/* options */

let useWhatToJoinMultilineString                = null;
let usingBigInt                 = true;
let IntegerMinNumber         = 0n;
let IntegerMaxNumber         = 0n;

              

                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
	                  
  
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
const arrayTypes = new WeakMap           ();
const arrayTypes_get = /*#__PURE__*/map_get.bind(arrayTypes)                                  ;
const arrayTypes_set = /*#__PURE__*/map_set.bind(arrayTypes)                                     ;
                                  
const As = ()     => {
	const as = (array       )        => {
		const got = arrayTypes_get(array);
		got
			? got===as || throws(TypeError(`Types in Array must be same` + where('. Check ')))
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
	const each = Object_create(NULL)                                                                           ;
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
const collect_off = ()        => { throw throws(SyntaxError(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
let collect                                                                                                                          = collect_off;
                                                      
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
			throw RangeError('TOML.parse(,specificationVersion)');
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError('TOML.parse(,,multilineStringJoiner)'); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
		usingBigInt = null;
		useBigInt>=0
			? IntegerMinNumber = -( IntegerMaxNumber = BigInt(useBigInt) )
			: IntegerMaxNumber = -( IntegerMinNumber = BigInt(useBigInt) ) - 1n;
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
			if ( typeof tag!=='function' ) { throw TypeError('TOML.parse(,,,,xOptions.tag)'); }
			if ( !mixed ) { throw TypeError('TOML.parse(,,,,xOptions) xOptions.tag needs at least TOML 1.0 to support mixed type array'); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

const previous                = Symbol('previous')       ;

              
	                                
		                                                  
		                                                  
	                  
  

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

const _literal                = Symbol('_literal')       ;

const LiteralObject =                                                             (literal         , value                                   ) => {
	const object = Object$1(value)                           ;
	object[_literal] = literal;
	return object;
};

const arrays = new WeakSet       ();
const arrays_add = /*#__PURE__*/add.bind(arrays);
const isArray = /*#__PURE__*/has.bind(arrays)                                  ;

const OF_TABLES = false;
const STATICALLY = true;
const staticalArrays = new WeakSet       ();
const staticalArrays_add = /*#__PURE__*/add.bind(staticalArrays);
const isStatic = /*#__PURE__*/has.bind(staticalArrays)                             ;

const newArray = (isStatic         )        => {
	const array        = [];
	arrays_add(array);
	isStatic && staticalArrays_add(array);
	return array;
};

const fpc =                      (c   )    => {
	freeze$1(freeze$1(c).prototype);
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
		for ( const key of Reflect_ownKeys(NativeDate.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(Object_create(NativeDate.prototype, descriptors));
	return freeze$1(Datetime);
} )();

                                        
                                      
                                      
                                      
                                      
                                      
                                       
                                     
                                            
                             
                             

const Value = (ISOString        )        => ISOString.replace(ZERO, zeroReplacer).replace(DELIMITER_DOT, '');

const leap = (literal        ) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE             = /*#__PURE__*/defineProperties(new NativeDate(0), /*#__PURE__*/getOwnPropertyDescriptors(NativeDate.prototype));

const OffsetDateTime_ISOString                = Symbol('OffsetDateTime_ISOString')       ;
const OffsetDateTime_value                = Symbol('OffsetDateTime_value')       ;
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
};
/*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number) => {
	if ( end ) {
		const string = '' + value;
		const size = end - start;
		if ( string.length>size ) { throw RangeError(); }///
		that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[OffsetDateTime_ISOString].slice(end);
	}
	const time = parse(that[OffsetDateTime_ISOString]);
	return that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);///time
};*///
const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString]        ;
	[OffsetDateTime_value]       ;
	
	         valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		const { 1: more } = leap(literal) && ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		super();
		this[OffsetDateTime_ISOString] = literal.replace(T, 'T').replace('z', 'Z');
		this[OffsetDateTime_value] = ( '' + parse$2(this[OffsetDateTime_ISOString]) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	getUTCFullYear (                    )           { return OffsetDateTime_use(this).getUTCFullYear(); }
	///get year () :FullYear { return OffsetDateTime_get(this, 0, 4); }
	///set year (value :FullYear) { OffsetDateTime_set(this, 0, 4, value); }
	getUTCMonth (                    )        { return OffsetDateTime_use(this).getUTCMonth(); }
	///get month () { return OffsetDateTime_get(this, 5, 7); }
	///set month (value) { OffsetDateTime_set(this, 5, 7, value); }
	getUTCDate (                    )       { return OffsetDateTime_use(this).getUTCDate(); }
	///get day () :Date { return OffsetDateTime_get(this, 8, 10); }
	///set day (value :Date) { OffsetDateTime_set(this, 8, 10, value); }
	
	getUTCHours (                    )        { return OffsetDateTime_use(this).getUTCHours(); }
	///get hour () :Hours { return OffsetDateTime_get(this, 11, 13); }
	///set hour (value :Hours) { OffsetDateTime_set(this, 11, 13, value); }
	getUTCMinutes (                    )          { return OffsetDateTime_use(this).getUTCMinutes(); }
	///get minute () :Minutes { return OffsetDateTime_get(this, 14, 16); }
	///set minute (value :Minutes) { OffsetDateTime_set(this, 14, 16, value); }
	getUTCSeconds (                    )          { return OffsetDateTime_use(this).getUTCSeconds(); }
	///get second () :Seconds { return OffsetDateTime_get(this, 17, 19); }
	///set second (value :Seconds) { OffsetDateTime_set(this, 17, 19, value); }
	getUTCMilliseconds (                    )               { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	///get millisecond () :Milliseconds { return +this[OffsetDateTime_value].slice(12, 15); }///
	/*set millisecond (value :Milliseconds) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		OffsetDateTime_set(this, 0, 0, 0);
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
		OffsetDateTime_set(this, 0, 0, 0);
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

const LocalDateTime_ISOString                = Symbol('LocalDateTime_ISOString')       ;
const LocalDateTime_value                = Symbol('LocalDateTime_value')       ;
const LocalDateTime_get = (that                                    , start        , end        ) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that                                    , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
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
		IS_LOCAL_DATETIME(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal}` + where(' at ')));
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

const LocalDate_ISOString                = Symbol('LocalDate_ISOString')       ;
const LocalDate_value                = Symbol('LocalDate_value')       ;
const LocalDate_get = (that                                , start        , end        ) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
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
		IS_LOCAL_DATE(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date ${literal}` + where(' at ')));
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

const LocalTime_ISOString                = Symbol('LocalTime_ISOString')       ;
const LocalTime_value                = Symbol('LocalTime_value')       ;
const LocalTime_get = (that                                , start        , end        ) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
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
		IS_LOCAL_TIME(literal) || throws(SyntaxError(`Invalid Local Time ${literal}` + where(' at ')));
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
					const charCode         = parseInt(part.slice(2), 16);
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ')));
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
					const charCode         = parseInt(part.slice(2), 16);
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
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
const { test: BAD_D } = /*#__PURE__*/newRegExp`_(?!\d)`.valueOf();
const { test: IS_D_INTEGER } = /*#__PURE__*/newRegExp`^${INTEGER_D}$`.valueOf();
const { test: IS_XOB_INTEGER } = theRegExp(/^0(?:x[\dA-Fa-f][_\dA-Fa-f]*|o[0-7][_0-7]*|b[01][_01]*)$/);
const { test: BAD_XOB } = /*#__PURE__*/newRegExp`_(?![\dA-Fa-f])`.valueOf();
const UNDERSCORES_SIGN = /_|^[-+]/g;

const IS_INTEGER = (literal        )          => ( IS_D_INTEGER(literal) || /*options.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal);

const BigIntInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const bigInt         = literal[0]==='-'
		? -BigInt(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger
	||
	-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || -max-1n ) <= long <= ( max = 2n**(64n-1n)-1n || -min-1n )
	||
	throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const number = literal[0]==='-'
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	isSafeInteger(number) || throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	const bigInt         = BigIntInteger(literal);
	return IntegerMinNumber<=bigInt && bigInt<=IntegerMaxNumber ? Number(bigInt) : bigInt;
};

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
			if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN$1; }
		}
		throw throws(SyntaxError(`Invalid Float ${literal}` + where(' at ')));
	}
	const withoutUnderscores         = literal.replace(UNDERSCORES, '');
	const number         = +withoutUnderscores;
	if ( sError ) {
		isFinite(number) || throws(RangeError(`Float ${literal} has been as big as inf` + where(' at ')));
		number || IS_ZERO(withoutUnderscores) || throws(RangeError(`Float ${literal} has been as little as ${literal[0]==='-' ? '-' : ''}0` + where(' at ')));
		const { 1: normalized_integer, 2: normalized_fractional = '', 3: normalized_exponent = '' } = NORMALIZED(number       ) ;
		const { 1: original_integer, 2: original_fractional = '', 3: original_exponent = '' } = ORIGINAL(withoutUnderscores) ;
		original_integer + original_fractional===normalized_integer + normalized_fractional
		&&
		original_exponent        - original_fractional.length===normalized_exponent        - normalized_fractional.length
		||
		throws(RangeError(`Float ${literal} has lost its exact and been ${number}` + where(' at ')));
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
				isInline(table) && throws(Error(`Trying to define Table under Inline Table` + where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && throws(Error(`Trying to append value to Static Array` + where(' at ')));
				table = table[( table          ).length - 1];
			}
			else { throw throws(Error(`Trying to define Table under non-Table value` + where(' at '))); }
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
		if ( finalKey in table ) { isArray(arrayOfTables = table[finalKey]) && !isStatic(arrayOfTables) || throws(Error(`Trying to push Table to non-ArrayOfTables value` + where(' at '))); }
		else { arrayOfTables = table[finalKey] = newArray(OF_TABLES); }
		tag && collect(tag, arrayOfTables, table, finalKey);
		arrayOfTables[arrayOfTables.length] = lastTable = new Table(DIRECTLY);
	}
	else {
		if ( finalKey in table ) {
			lastTable = table[finalKey];
			fromPair(lastTable) && throws(Error(`A table defined implicitly via key/value pair can not be accessed to via []` + where(', which at ')));
			directlyIfNot(lastTable) || throws(Error(`Duplicate Table definition` + where(' at ')));
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
			isTable(table) || throws(Error(`Trying to assign property through non-Table value` + where(' at ')));
			isInline(table) && throws(Error(`Trying to assign property through static Inline Table` + where(' at ')));
			fromPair(table) || throws(Error(`A table defined implicitly via [] can not be accessed to via key/value pair` + where(', which at ')));
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
	__CONTROL_CHARACTER_EXCLUDE_test(literal) && throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String` + where(', which was found at ')));
	return literal;
};

const assignLiteralString = ( (table       , finalKey        , literal        )         => {
	if ( !literal.startsWith(`'''`) ) {
		const $ = LITERAL_STRING_exec(literal) ?? throws(SyntaxError(`Bad literal string` + where(' at ')));
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
	useWhatToJoinMultilineString ?? start.nowrap();
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
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
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
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString($, useWhatToJoinMultilineString , skipped) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			table[finalKey] = preserveLiteral ? LiteralObject([ '"""', literal.slice(0, length) ], value) : value;
			return literal.slice(length).replace(PRE_WHITESPACE, '');
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap();
	ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal + '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
	for ( const lines                          = [ literal ]; ; ) {
		const line         = start.must();
		let length = MULTI_LINE_BASIC_STRING_exec_0_length(line);
		if ( line.length!==length ) {
			const $ = line.slice(0, length);
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString(lines.join('\n') + '\n' + $, useWhatToJoinMultilineString , skipped) + ( line.startsWith('"', length += 3) ? line.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			if ( preserveLiteral ) {
				skipped ? lines.unshift('"""') : lines[0] = `"""${literal}`;
				lines[lines.length] = `${$}"""`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line + '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		lines[lines.length] = line;
	}
} )     
	                                                                       
	                                                                      
 ;

const KEYS = /*#__PURE__*/Null$1        (null);
const commentFor = (key        )         => KEYS[key] ?? ( KEYS[key] = Symbol(key) );
const commentForThis                = Symbol('this')       ;

const { test: includesNewline } = theRegExp(/\r?\n/g);
const getCOMMENT = (table                                            , keyComment        )                     => {
	if ( keyComment in table ) {
		const comment = table[keyComment];
		if ( typeof comment!=='string' ) { throw TypeError(`the value of comment must be a string, while "${comment===null ? 'null' : typeof comment}" type is found`); }
		if ( includesNewline(comment) ) { throw SyntaxError(`the value of comment must be a string and can not include newline`); }
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
		lineRest || throws(SyntaxError(`Empty bare key` + where(' at ')));
		if ( lineRest[0]==='"' ) {
			const index         = BASIC_STRING_exec_1_endIndex(lineRest);
			leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index));
			lineRest = lineRest.slice(index + 1);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key         = ( ( isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec )(lineRest) ?? throws(SyntaxError(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key;
		}
		if ( IS_DOT_KEY(lineRest) ) { lineRest = lineRest.replace(DOT_KEY, ''); }
		else { break; }
	}
	if ( disableDigit ) {
		const keys = rest.slice(0, -lineRest.length);
		( isAmazing(keys) || enableNull && keys==='null' ) && throws(SyntaxError(`Bad bare key disabled by xOptions.string` + where(' at ')));
	}
	if ( disallowEmptyKey ) {
		let index         = lastIndex;
		do { leadingKeys[index]  || throws(SyntaxError(`Empty key is not allowed before TOML v0.5` + where(', which at '))); }
		while ( index-- );
	}
	const finalKey         = leadingKeys[lastIndex] ;
	leadingKeys.length = lastIndex;
	return { leadingKeys, finalKey, lineRest };
};

const push = (lastArray       , lineRest        )             => {
	if ( lineRest[0]==='<' ) {
		const { 1: tag } = { 2: lineRest } = _VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError(`Bad tag ` + where(' at ')));
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
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			return equalInlineTable(asTables(lastArray), lastArray.length, lineRest);
		case '[':
			return equalStaticArray(asArrays(lastArray), lastArray.length, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError(`Bad atom value` + where(' at ')));
	if ( literal==='true' ) { asBooleans(lastArray)[lastArray.length] = true; }
	else if ( literal==='false' ) { asBooleans(lastArray)[lastArray.length] = false; }
	else if ( enableNull && literal==='null' ) { asNulls(lastArray)[lastArray.length] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
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
			throw throws(SyntaxError(`Unexpect character in static array item value` + where(', which is found at ')));
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
		lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
		if ( lineRest[0]!=='}' ) {
			for ( ; ; ) {
				lineRest[0]==='#' && throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				const rest             = assign(ForComment(inlineTable, lineRest));
				lineRest = ( typeof rest==='string' ? rest : yield rest ) || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				if ( lineRest[0]==='}' ) { break; }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
					lineRest[0]==='}' && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));
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
	finalKey in table && throws(Error(`Duplicate property definition` + where(' at ')));
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
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			return equalInlineTable(table, finalKey, lineRest);
		case '[':
			return equalStaticArray(table, finalKey, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError(`Bad atom value` + where(' at ')));
	if ( literal==='true' ) { table[finalKey] = true; }
	else if ( literal==='false' ) { table[finalKey] = false; }
	else if ( enableNull && literal==='null' ) { table[finalKey] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
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
					lineRest[0]==='#' || throws(SyntaxError(`Unexpect charachtor after table header` + where(' at ')));
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
				preserveComment && lineRest && ( lastSectionTable[commentForThis] = asArrayItem ? lineRest.slice(1) : table[commentFor(finalKey)] = lineRest.slice(1) );
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				const forComment             = ForComment(lastSectionTable, line);
				let rest             = assign(forComment);
				typeof rest==='string' || ( rest = x        (rest) );
				if ( rest ) {
					rest[0]==='#' || throws(SyntaxError(`Unexpect charachtor after key/value pair` + where(' at ')));
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); }
				}
			}
		}
	}
	return rootTable;
};

const isArrayBufferLike = (value        )                       => 'byteLength' in value;///

const message = 'A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.';

const arrayBufferLike2string                                             = Buffer
	
	? /*#__PURE__*/( ({ isBuffer, [species]: Buf, byteLength, allocUnsafe, from }) => {
		// @ts-ignore
		if ( typeof Buffer.prototype.utf8Write==='function' ) {
			const utf8 = Buffer.alloc(7);
			// @ts-ignore
			utf8.utf8Write('𠮷利', 0, 7);
			if ( utf8.equals(from('𠮷利')) ) {
				return (arrayBufferLike                                   )         => {
					if ( !arrayBufferLike.byteLength ) { return ''; }
					const buffer         = isBuffer(arrayBufferLike)/// isView, length===byteLength!, instanceof Buffer
						? arrayBufferLike
						: 'length' in arrayBufferLike/// isView, length===byteLength!
							? new Buf(arrayBufferLike.buffer, arrayBufferLike.byteOffset, arrayBufferLike.byteLength)
							: new Buf(arrayBufferLike);/// class.isArrayBuffer!
					const string         = buffer.toString();
					if ( string.includes('\uFFFD') ) {
						const length         = byteLength(string);
						if ( length!==buffer.length ) { throw Error(message); }
						const utf8 = allocUnsafe(length);
						// @ts-ignore
						utf8.utf8Write(string, 0, length);
						if ( !utf8.equals(buffer) ) { throw Error(message); }
					}
					return string[0]==='\uFEFF' ? string.slice(1) : string;
				};
			}
		}
		return (arrayBufferLike                                   )         => {
			if ( !arrayBufferLike.byteLength ) { return ''; }
			const buffer         =
				isBuffer(arrayBufferLike)/// isView, length===byteLength!, instanceof Buffer
					? arrayBufferLike
					: 'length' in arrayBufferLike/// isView, length===byteLength!
						? new Buf(arrayBufferLike.buffer, arrayBufferLike.byteOffset, arrayBufferLike.byteLength)
						: new Buf(arrayBufferLike);/// class.isArrayBuffer!
			const string         = buffer.toString();
			if ( string.includes('\uFFFD') && !from(string).equals(buffer) ) { throw Error(message); }
			return string[0]==='\uFEFF' ? string.slice(1) : string;
		};
	})(Buffer                                                                                                                             )
	
	: (arrayBufferLike                          )         => {
		if ( !arrayBufferLike.byteLength ) { return ''; }
		const uint8Array             =
			'length' in arrayBufferLike/// isView, length===byteLength!
				? arrayBufferLike
				: new Uint8Array(arrayBufferLike);/// class.isArrayBuffer!
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
			throw Error(message);
		}
		while ( index!==length );
		const string = stringArray.join('');
		return string[0]==='\uFEFF' ? string.slice(1) : string;
	};

const { test: IS_NON_SCALAR } = theRegExp(/[\uD800-\uDFFF]/u);

let holding          = false;

const parse = (source        , specificationVersion                                   , multilineStringJoiner                                                                                , useBigInt                            , xOptions                   )        => {
	if ( holding ) { throw Error('parse during parsing.'); }
	holding = true;
	let rootTable       ;
	let process                 ;
	try {
		let sourcePath         = '';
		if ( typeof source==='object' && source ) {
			if ( isArrayBufferLike(source) ) { source = arrayBufferLike2string(source); }
			else {
				sourcePath = source.path;
				if ( typeof sourcePath!=='string' ) { throw TypeError('TOML.parse(source.path)'); }
				const { data, require: req = typeof require==='function' ? require : undefined$1 } = source;
				if ( req ) {
					const dirname_ = req.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '');
					if ( dirname_ ) {
						sourcePath = ( req                                          )('path').resolve(dirname_, sourcePath);
						if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.require('path').resolve)`); }
					}
					if ( data===undefined$1 ) {
						const data = ( req                                      )('fs').readFileSync(sourcePath);
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError(`TOML.parse(source.require('fs').readFileSync)`); }
					}
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError('TOML.parse(source.data)'); }
					}
				}
				else {
					if ( data===undefined$1 ) { throw TypeError('TOML.parse(source.data|source.require)'); }
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError('TOML.parse(source.data)'); }
					}
				}
			}
		}
		else if ( typeof source!=='string' ) { throw TypeError('TOML.parse(source)'); }
		try {
			if ( IS_NON_SCALAR(source) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
			if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
				if ( useBigInt!==undefined$1 || xOptions!==undefined$1 ) { throw TypeError('options mode ? args mode'); }
				let joiner                    ;
				if ( hasOwn(multilineStringJoiner, 'joiner') ) { joiner = multilineStringJoiner.joiner; }
				if ( hasOwn(multilineStringJoiner, 'bigint') ) { useBigInt = multilineStringJoiner.bigint; }
				if ( hasOwn(multilineStringJoiner, 'x') ) { xOptions = multilineStringJoiner.x; }
				multilineStringJoiner = joiner;
			}
			try {
				use(specificationVersion, multilineStringJoiner, useBigInt, xOptions);
				todo(source, sourcePath);
				try {
					source && source[0]==='\uFEFF' && throws(TypeError(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')));
					rootTable = Root();
					process = Process();
				}
				finally { done(); }//clearWeakSets();
			}
			finally { clear(); }
		}
		finally { clearRegExp$1(); }
	}
	finally { holding = false; }
	process?.();
	return rootTable;
};

const parse$1 = /*#__PURE__*/Object_assign(
	(source        , specificationVersion                                   , multilineStringJoiner         , useBigInt                   , xOptions                   ) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions)
			: parse(source, 1.0, specificationVersion          , multilineStringJoiner                                       , useBigInt                    )
	,
	{
		'1.0': (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
		1.0: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions),
		0.5: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions),
		0.4: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions),
		0.3: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions),
		0.2: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions),
		0.1: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
	}
);

const ESCAPED = /*#__PURE__*/Null$1        ({
	.../*#__PURE__*/Object_fromEntries(/*#__PURE__*/[ ...Array(0x20) ].map((_, charCode) => [ fromCharCode(charCode), '\\u' + charCode.toString(16).toUpperCase().padStart(4, '0') ])),
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

const _Infinity = -Infinity;
const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal        ) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float = (value        ) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan';

const isDate = /*#__PURE__*/isPrototypeOf.bind(DATE$1)                                                ;

const { test: BARE } = theRegExp(/^[\w-]+$/);
const $Key$ = (key        )         => BARE(key) ? key : singlelineString(key);

const FIRST = /[^.]+/;
const literalString = (value        )                => `'${value}'`;
const $Keys = (keys        )         => isAmazing(keys) ? keys.replace(FIRST, literalString) : keys==='null' ? `'null'` : keys;

class TOMLSection extends Array         {
	
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
							if ( !isSection(table) ) { throw TypeError(`the first table item marked by Section() means the parent array is an array of tables, which can not include other types or table not marked by Section() any more in the rest items`); }
						}
						continue;
					}
					else { let index = 1; while ( index!==length ) { if ( isSection(value[index++] ) ) { throw TypeError(`if an array is not array of tables, it can not include any table that marked by Section()`); } } }
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
					if ( this.document.nullDisabled ) { throw TypeError(`toml can not stringify "null" type value without truthy options.xNull`); }
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
					this.appendInline = this.document._ ? value.toISOString().replace('T', ' ') : value.toISOString();
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
						else { throw TypeError(`literal value is broken`); }
					}
					else { throw TypeError(`literal value is broken`); }
					break;
				}
				if ( isString(value) ) { throw TypeError(`TOML.stringify refuse to handle [object String]`); }
				if ( isNumber(value) ) { throw TypeError(`TOML.stringify refuse to handle [object Number]`); }
				if ( isBigInt(value) ) { throw TypeError(`TOML.stringify refuse to handle [object BigInt]`); }
				if ( isBoolean(value) ) { throw TypeError(`TOML.stringify refuse to handle [object Boolean]`); }
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
				throw TypeError(`toml can not stringify "${typeof value}" type value`);
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

class TOMLDocument extends Array              {
	
	         get ['constructor'] () { return Array; }
	
	0 = new TOMLSection(this);
	
	         asInteger                                         ;
	         newline                     = '';
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
	         preferCommentForThis          = false;
	         $singlelineArray                ;
	
	constructor (options                  ) {
		super();
		const integer = options?.integer;
		if ( integer===undefined ) { this.asInteger = return_false; }
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError(`TOML.stringify(,{integer}) can only be number`); }
		const newline = options?.newline;
		if ( newline===undefined ) { this.newline = ''; }
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		const preferCommentFor = options?.preferCommentFor;
		if ( preferCommentFor===undefined || preferCommentFor==='key' ) ;
		else if ( preferCommentFor==='this' ) { this.preferCommentForThis = true; }
		else { throw TypeError(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
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
			if ( !IS_INDENT(indent) ) { throw SyntaxError(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
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
		const $singlelineArray = options?.forceInlineArraySpacing;
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
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`)
					: TypeError(`array inline mode must be "number" type, not including ${$singlelineArray===null ? '"null"' : typeof $singlelineArray}`);
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
	freeze$1(multiline);
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

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
	stringify,
	Section, inline, multiline, basic, literal, commentFor, commentForThis,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
});

export { LocalDate, LocalDateTime, LocalTime, OffsetDateTime, Section, basic, commentFor, commentForThis, _export as default, inline, isInline, isSection, literal, multiline, parse$1 as parse, stringify, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiaXRlcmF0b3IudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9ub24tYXRvbS50cyIsInR5cGVzL1RhYmxlLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwiVVRGOC50cyIsInBhcnNlLy50cyIsInN0cmluZ2lmeS9zdHJpbmcudHMiLCJzdHJpbmdpZnkvZmxvYXQudHMiLCJzdHJpbmdpZnkvc2VjdGlvbi50cyIsInN0cmluZ2lmeS9kb2N1bWVudC50cyIsInN0cmluZ2lmeS8udHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQnMS4yOS4wJzsiLCJpbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGV4ZWMgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUuZXhlYyc7XG5cbmV4cG9ydCB2YXIgVGVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKHRlc3QgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHRlc3QuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgdmFyIEV4ZWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZChleGVjICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiBleGVjLmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZnVuY3Rpb24gX19QVVJFX18gKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAgeyByZXR1cm4gLyojX19QVVJFX18qL19fUFVSRV9fKHJlKTsgfTtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplPyc7XG5pbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT8nO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eT8nO1xuXG5pbXBvcnQgeyBUZXN0LCBFeGVjIH0gZnJvbSAnLi90aGVSZWdFeHAnO1xuXG52YXIgTlQgPSAvW1xcblxcdF0rL2c7XG52YXIgRVNDQVBFID0gL1xcXFwuL2c7XG5mdW5jdGlvbiBncmF2ZUFjY2VudFJlcGxhY2VyICgkJCAgICAgICAgKSB7IHJldHVybiAkJD09PSdcXFxcYCcgPyAnYCcgOiAkJDsgfVxuXG52YXIgaW5jbHVkZXMgPSAnJy5pbmNsdWRlcyAgICAgICBcblx0PyBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpOyB9XG5cdDogZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5kZXhPZihzZWFyY2hTdHJpbmcpPi0xOyB9O1xuXG5mdW5jdGlvbiBSRSAoICAgICAgICAgICAgICAgdGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBVID0gdGhpcy5VO1xuXHR2YXIgSSA9IHRoaXMuSTtcblx0dmFyIE0gPSB0aGlzLk07XG5cdHZhciBTID0gdGhpcy5TO1xuXHR2YXIgcmF3ID0gdGVtcGxhdGUucmF3O1xuXHR2YXIgc291cmNlID0gcmF3WzBdIC5yZXBsYWNlKE5ULCAnJyk7XG5cdHZhciBpbmRleCA9IDE7XG5cdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdHZhciB2YWx1ZSAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHZhbHVlPT09J3N0cmluZycgKSB7IHNvdXJjZSArPSB2YWx1ZTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIHZhbHVlX3NvdXJjZSA9IHZhbHVlLnNvdXJjZTtcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlX3NvdXJjZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ3NvdXJjZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLnVuaWNvZGU9PT1VICkgeyB0aHJvdyBTeW50YXhFcnJvcigndW5pY29kZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmlnbm9yZUNhc2U9PT1JICkgeyB0aHJvdyBTeW50YXhFcnJvcignaWdub3JlQ2FzZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLm11bHRpbGluZT09PU0gJiYgKCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICdeJykgfHwgaW5jbHVkZXModmFsdWVfc291cmNlLCAnJCcpICkgKSB7IHRocm93IFN5bnRheEVycm9yKCdtdWx0aWxpbmUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5kb3RBbGw9PT1TICYmIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJy4nKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2RvdEFsbCcpOyB9XG5cdFx0XHRzb3VyY2UgKz0gdmFsdWVfc291cmNlO1xuXHRcdH1cblx0XHRzb3VyY2UgKz0gcmF3W2luZGV4KytdIC5yZXBsYWNlKE5ULCAnJyk7XG5cdH1cblx0dmFyIHJlICAgICAgICAgPSBSZWdFeHAoVSA/IHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKEVTQ0FQRSwgZ3JhdmVBY2NlbnRSZXBsYWNlcikgOiBzb3VyY2UsIHRoaXMuZmxhZ3MpO1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSBzb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9ICFVO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSAhSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IGluY2x1ZGVzKHNvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyhzb3VyY2UsICckJykgPyAhTSA6IG51bGw7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBpbmNsdWRlcyhzb3VyY2UsICcuJykgPyAhUyA6IG51bGw7XG5cdHJldHVybiByZTtcbn1cblxudmFyIFJFX2JpbmQgPSBiaW5kICYmIC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoUkUgICAgICAgKTtcblxuZnVuY3Rpb24gQ29udGV4dCAoZmxhZ3MgICAgICAgICkgICAgICAgICAge1xuXHRyZXR1cm4ge1xuXHRcdFU6ICFpbmNsdWRlcyhmbGFncywgJ3UnKSxcblx0XHRJOiAhaW5jbHVkZXMoZmxhZ3MsICdpJyksXG5cdFx0TTogIWluY2x1ZGVzKGZsYWdzLCAnbScpLFxuXHRcdFM6ICFpbmNsdWRlcyhmbGFncywgJ3MnKSxcblx0XHRmbGFnczogZmxhZ3Ncblx0fTtcbn1cblxudmFyIENPTlRFWFQgICAgICAgICAgPSAvKiNfX1BVUkVfXyovQ29udGV4dCgnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb3h5XG5cdD8gLyojX19QVVJFX18qL25ldyBQcm94eShSRSwge1xuXHRcdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdFx0LFxuXHRcdGdldDogZnVuY3Rpb24gKFJFLCBmbGFncyAgICAgICAgKSB7IHJldHVybiBSRV9iaW5kKENvbnRleHQoZmxhZ3MpKTsgfVxuXHRcdCxcblx0XHRkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHQsXG5cdFx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH0pXG5cdDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHRSRS5hcHBseSA9IFJFLmFwcGx5O1xuXHRcdHZhciBuZXdSZWdFeHAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShDT05URVhULCBhcmd1bWVudHMgICAgICAgKTsgfSAgICAgICA7XG5cdFx0dmFyIGQgPSAxO1xuXHRcdHZhciBnID0gZCoyO1xuXHRcdHZhciBpID0gZyoyO1xuXHRcdHZhciBtID0gaSoyO1xuXHRcdHZhciBzID0gaSoyO1xuXHRcdHZhciB1ID0gcyoyO1xuXHRcdHZhciB5ID0gdSoyO1xuXHRcdHZhciBmbGFncyA9IHkqMiAtIDE7XG5cdFx0d2hpbGUgKCBmbGFncy0tICkge1xuXHRcdFx0KCBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0XHRuZXdSZWdFeHBbY29udGV4dC5mbGFnc10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMgICAgICAgKTsgfTtcblx0XHRcdH0gKShDb250ZXh0KFxuXHRcdFx0XHQoIGZsYWdzICYgZCA/ICcnIDogJ2QnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgZyA/ICcnIDogJ2cnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgaSA/ICcnIDogJ2knIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgbSA/ICcnIDogJ20nIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgcyA/ICcnIDogJ3MnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgdSA/ICcnIDogJ3UnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgeSA/ICcnIDogJ3knIClcblx0XHRcdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gZnJlZXplID8gZnJlZXplKG5ld1JlZ0V4cCkgOiBuZXdSZWdFeHA7XG5cdH0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuLy9pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbmNvbnN0IE5PTkUgICAgICAgICAgICAgICAgICAgID0gW107XG5sZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5sZXQgc291cmNlTGluZXMgICAgICAgICAgICAgICAgICAgID0gTk9ORTtcbmxldCBsYXN0TGluZUluZGV4ICAgICAgICAgPSAtMTtcbmV4cG9ydCBsZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuZXhwb3J0IGNvbnN0IHRocm93cyA9IChlcnJvciAgICAgICApICAgICAgICA9PiB7XG5cdC8vaWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IGRvbmUoKTsgb3B0aW9ucy5jbGVhcigpOyB9XG5cdHRocm93IGVycm9yO1xufTtcblxuY29uc3QgRU9MID0gL1xccj9cXG4vO1xuZXhwb3J0IGNvbnN0IHRvZG8gPSAoc291cmNlICAgICAgICAsIHBhdGggICAgICAgICkgICAgICAgPT4ge1xuXHRpZiAoIHR5cGVvZiBwYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwsc291cmNlUGF0aCknKTsgfVxuXHRzb3VyY2VQYXRoID0gcGF0aDtcblx0c291cmNlTGluZXMgPSBzb3VyY2Uuc3BsaXQoRU9MKTtcblx0bGFzdExpbmVJbmRleCA9IHNvdXJjZUxpbmVzLmxlbmd0aCAtIDE7XG5cdGxpbmVJbmRleCA9IC0xO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHQgPSAoKSAgICAgICAgID0+IHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG5cbmV4cG9ydCBjb25zdCByZXN0ID0gKCkgICAgICAgICAgPT4gbGluZUluZGV4IT09bGFzdExpbmVJbmRleDtcblxuZXhwb3J0IGNsYXNzIG1hcmsge1xuXHQgICAgICAgICAgICAgICAgIGxpbmVJbmRleCA9IGxpbmVJbmRleDtcblx0ICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0ICAgICAgICAgICAgICAgICByZXN0Q29sdW1uICAgICAgICA7XG5cdGNvbnN0cnVjdG9yICh0eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcmVzdENvbHVtbiAgICAgICAgKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHR0aGlzLnJlc3RDb2x1bW4gPSByZXN0Q29sdW1uO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdG11c3QgKCAgICAgICAgICApICAgICAgICAge1xuXHRcdGxpbmVJbmRleD09PWxhc3RMaW5lSW5kZXggJiYgdGhyb3dzKFN5bnRheEVycm9yKGAke3RoaXMudHlwZX0gaXMgbm90IGNsb3NlIHVudGlsIHRoZSBlbmQgb2YgdGhlIGZpbGVgICsgd2hlcmUoJywgd2hpY2ggc3RhcnRlZCBmcm9tICcsIHRoaXMubGluZUluZGV4LCBzb3VyY2VMaW5lc1t0aGlzLmxpbmVJbmRleF0gLmxlbmd0aCAtIHRoaXMucmVzdENvbHVtbiArIDEpKSk7XG5cdFx0cmV0dXJuIHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG5cdH1cblx0bm93cmFwICggICAgICAgICAgKSAgICAgICAge1xuXHRcdHRocm93IHRocm93cyhFcnJvcihgVE9NTC5wYXJzZSgsLG11bHRpbGluZVN0cmluZ0pvaW5lcikgbXVzdCBiZSBwYXNzZWQsIHdoaWxlIHRoZSBzb3VyY2UgaW5jbHVkaW5nIG11bHRpLWxpbmUgc3RyaW5nYCArIHdoZXJlKCcsIHdoaWNoIHN0YXJ0ZWQgZnJvbSAnLCB0aGlzLmxpbmVJbmRleCwgc291cmNlTGluZXNbdGhpcy5saW5lSW5kZXhdIC5sZW5ndGggLSB0aGlzLnJlc3RDb2x1bW4gKyAxKSkpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3Qgd2hlcmUgPSAocHJlICAgICAgICAsIHJvd0luZGV4ICAgICAgICAgPSBsaW5lSW5kZXgsIGNvbHVtbk51bWJlciAgICAgICAgID0gMCkgICAgICAgICA9PiBzb3VyY2VMaW5lcz09PU5PTkUgPyAnJyA6XG5cdHNvdXJjZVBhdGhcblx0XHQ/IGBcXG4gICAgYXQgKCR7c291cmNlUGF0aH06JHtyb3dJbmRleCArIDF9OiR7Y29sdW1uTnVtYmVyfSlgXG5cdFx0OiBgJHtwcmV9bGluZSAke3Jvd0luZGV4ICsgMX06ICR7c291cmNlTGluZXNbcm93SW5kZXhdfWA7XG5cbmV4cG9ydCBjb25zdCBkb25lID0gKCkgICAgICAgPT4ge1xuXHRzb3VyY2VQYXRoID0gJyc7XG5cdHNvdXJjZUxpbmVzID0gTk9ORTtcbn07XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuL2l0ZXJhdG9yJztcblxuLyogbmVzdGVkIChyZWFkYWJsZSkgKi9cblxuY29uc3QgV2hpdGVzcGFjZSA9IC9bIFxcdF0vO1xuXG5leHBvcnQgY29uc3QgUFJFX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogVkFMVUVfUkVTVF9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdChcblx0XHQoPzpcXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCBcXGQpP1xuXHRcdFtcXHdcXC0rLjpdK1xuXHQpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBMSVRFUkFMX1NUUklOR19leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdCcoW14nXSopJ1xuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKCd7MCwyfSlcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzAgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcbmV4cG9ydFxubGV0IF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnNgXG5cdF5cblx0LlxuXHQke1doaXRlc3BhY2V9KmAudmFsdWVPZigpO1xuXG5cbmV4cG9ydCBjb25zdCBUYWcgPSAvW15cXHgwMC1cXHgxRlwiIycoKTw+W1xcXFxcXF1ge31cXHg3Rl0rLztcblxuY29uc3QgeyBleGVjOiBLRVlfVkFMVUVfUEFJUl9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICBgXG5cdF5cblx0JHtXaGl0ZXNwYWNlfSpcblx0PVxuXHQke1doaXRlc3BhY2V9KlxuXHQoPzpcblx0XHQ8KCR7VGFnfSk+XG5cdFx0JHtXaGl0ZXNwYWNlfSpcblx0KT9cblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IF9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBUQUdfUkVTVF9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbi8qIG9wdGltaXplZCAoYXZvaWQgb3ZlcmZsb3cgb3IgbG9zdCkgKi9cblxuY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkcgPSB0aGVSZWdFeHAoL1teXFxcXFwiXSt8XFxcXC4/fFwiKD8hXCJcIilcIj8vc3kpO1xuZXhwb3J0IGNvbnN0IE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGggPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gLypNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAqLzA7XG5cdHdoaWxlICggTVVMVElfTElORV9CQVNJQ19TVFJJTkcudGVzdChfKSApIHsgbGFzdEluZGV4ID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkcubGFzdEluZGV4OyB9XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fID0gL1teXFxcXFxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIFRhYlxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiIFxcPHdzPm5ld2xpbmVcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBub3QgXFw8d3M+bmV3bGluZVxubGV0IF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX1RBQl9fX19fXztcbmV4cG9ydCBjb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCA9IChfICAgICAgICApICAgICAgICAgID0+ICFfLnJlcGxhY2UoX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIsICcnKTsvLy8gb3A/XG5cbmNvbnN0IEJBU0lDX1NUUklOR19UQUJfX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7XG5jb25zdCBCQVNJQ19TVFJJTkdfX19fX19fX19fID0gdGhlUmVnRXhwKC9bXlxcXFxcIlxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfU0xBU0ggPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTsvLy8gVGFiXG5sZXQgX19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfREVMX1NMQVNIO1xuZXhwb3J0IGNvbnN0IEJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXggPSAobGluZSAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gX19CQVNJQ19TVFJJTkcubGFzdEluZGV4ID0gMTtcblx0d2hpbGUgKCBfX0JBU0lDX1NUUklORy50ZXN0KGxpbmUpICkgeyBsYXN0SW5kZXggPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0bGFzdEluZGV4IT09bGluZS5sZW5ndGggJiYgbGluZVtsYXN0SW5kZXhdPT09J1wiJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4gbGFzdEluZGV4O1xufTtcblxuZXhwb3J0XG5jb25zdCB7IHRlc3Q6IElTX0RPVF9LRVkgfSA9IHRoZVJlZ0V4cCgvXlsgXFx0XSpcXC4vKTtcbmV4cG9ydFxuY29uc3QgRE9UX0tFWSA9IC9eWyBcXHRdKlxcLlsgXFx0XSovO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9TVFJJQ1QgfSA9IHRoZVJlZ0V4cCgvXltcXHctXSsvKTtcbmNvbnN0IHsgZXhlYzogQkFSRV9LRVlfRlJFRSB9ID0gdGhlUmVnRXhwKC9eW14gXFx0Iz1bXFxdJ1wiLl0rKD86WyBcXHRdK1teIFxcdCM9W1xcXSdcIi5dKykqLyk7XG5leHBvcnRcbmxldCBfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9GUkVFO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9fX18gfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdKicvKTtcbmNvbnN0IHsgZXhlYzogTElURVJBTF9LRVlfREVMIH0gPSB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0qJy8pO1xuZXhwb3J0XG5sZXQgX19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xubGV0IHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgPSAobGluZVJlc3QgICAgICAgICwgcGFyc2VLZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGFzQXJyYXlJdGVtICAgICAgICAgID0gbGluZVJlc3RbMV09PT0nWyc7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBBcnJheSBvZiBUYWJsZXMgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuMmAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMik7XG5cdH1cblx0ZWxzZSB7IGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5IH0gPSB7IGxpbmVSZXN0IH0gPSBwYXJzZUtleXMobGluZVJlc3QpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0bGluZVJlc3QgJiYgbGluZVJlc3RbMF09PT0nXScgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUYWJsZSBoZWFkZXIgaXMgbm90IGNsb3NlZGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHQoIGxpbmVSZXN0Lmxlbmd0aD4xID8gbGluZVJlc3RbMV09PT0nXSc9PT1hc0FycmF5SXRlbSA6ICFhc0FycmF5SXRlbSApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgU3F1YXJlIGJyYWNrZXRzIG9mIFRhYmxlIGRlZmluaXRpb24gc3RhdGVtZW50IG5vdCBtYXRjaGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoYXNBcnJheUl0ZW0gPyAyIDogMSkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsZXQgdGFnICAgICAgICA7XG5cdGlmICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF09PT0nPCcgKSB7ICggeyAxOiB0YWcsIDI6IGxpbmVSZXN0IH0gPSBUQUdfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZywgbGluZVJlc3QgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyA9ICh7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgbGluZVJlc3QgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyAxOiB0YWcgPSAnJyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBLZXlzIG11c3QgZXF1YWwgc29tZXRoaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcsIGJ1dCBtaXNzaW5nIGF0ICcpKSk7XG5cdHRhZyB8fCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSE9PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX18gfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0vKTtcbmNvbnN0IHsgdGVzdDogQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXS8pO1xuZXhwb3J0XG5sZXQgX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hSZWdFeHAgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAgPT4ge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMjtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfVEFCX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfX19fX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX0RFTDtcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfREVMX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0g7XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9GUkVFO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgTlVNID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0YlswMV1bXzAxXSpcblx0XHR8XG5cdFx0XHRvWzAtN11bXzAtN10qXG5cdFx0fFxuXHRcdFx0eFtcXGRBLUZhLWZdW19cXGRBLUZhLWZdKlxuXHRcdHxcblx0XHRcdCg/OlxcLlxcZFtfXFxkXSopPyg/OltFZV0tP1xcZFtfXFxkXSopP1xuXHRcdClcblx0fFxuXHRcdFsxLTldW19cXGRdKlxuXHRcdCg/OlxcLlxcZFtfXFxkXSopPyg/OltFZV0tP1xcZFtfXFxkXSopP1xuXHR8XG5cdFx0aW5mXG5cdHxcblx0XHRuYW5cblx0KVxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IElTX0FNQVpJTkcgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4oPzpcblx0XHQtPyR7TlVNfVxuXHRcdCg/Oi0ke05VTX0pKlxuXHR8XG5cdFx0dHJ1ZVxuXHR8XG5cdFx0ZmFsc2Vcblx0KSRcbmAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBCQURfRFhPQiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hW1xcZEEtRmEtZl0pYC52YWx1ZU9mKCk7XG5leHBvcnQgY29uc3QgaXNBbWF6aW5nID0gKGtleXMgICAgICAgICkgICAgICAgICAgPT4gSVNfQU1BWklORyhrZXlzKSAmJiAhQkFEX0RYT0Ioa2V5cyk7XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IFBsYWluVGFibGUsIE9yZGVyZWRUYWJsZSB9IGZyb20gJy4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4vcmVnZXhwcyc7XG5cbmV4cG9ydCBsZXQgbXVzdFNjYWxhciAgICAgICAgICA9IHRydWU7XG5cbi8qIG9wdGlvbnMgKi9cblxuZXhwb3J0IGxldCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbk51bWJlciAgICAgICAgID0gMG47XG5leHBvcnQgbGV0IEludGVnZXJNYXhOdW1iZXIgICAgICAgICA9IDBuO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuZXhwb3J0IGxldCBwcmVzZXJ2ZUxpdGVyYWwgICAgICAgICA7XG5leHBvcnQgbGV0IHplcm9EYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgaW5saW5lVGFibGUgICAgICAgICA7XG5leHBvcnQgbGV0IG1vcmVEYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWxsb3dFbXB0eUtleSAgICAgICAgIDtcbi8vZXhwb3J0IGNvbnN0IHhvYiA6Ym9vbGVhbiA9IHRydWU7XG5leHBvcnQgbGV0IHNFcnJvciAgICAgICAgIDtcbmV4cG9ydCBsZXQgc0Zsb2F0ICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGxldCBUYWJsZSAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG5leHBvcnQgbGV0IHByZXNlcnZlQ29tbWVudCAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWJsZURpZ2l0ICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlcyA9IG5ldyBXZWFrTWFwICAgICAgICAgICAoKTtcbmNvbnN0IGFycmF5VHlwZXNfZ2V0ID0gLyojX19QVVJFX18qL2dldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXNfc2V0ID0gLyojX19QVVJFX18qL3NldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEFzID0gKCkgICAgID0+IHtcblx0Y29uc3QgYXMgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4ge1xuXHRcdGNvbnN0IGdvdCA9IGFycmF5VHlwZXNfZ2V0KGFycmF5KTtcblx0XHRnb3Rcblx0XHRcdD8gZ290PT09YXMgfHwgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVHlwZXMgaW4gQXJyYXkgbXVzdCBiZSBzYW1lYCArIGl0ZXJhdG9yLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyB0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYHhPcHRpb25zLnRhZyBpcyBub3QgZW5hYmxlZCwgYnV0IGZvdW5kIHRhZyBzeW50YXhgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9O1xuZXhwb3J0IGxldCBjb2xsZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbGxlY3Rfb2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgUHJvY2VzcyA9ICgpICAgICAgICAgID0+IHtcblx0aWYgKCBjb2xsZWN0aW9uX2xlbmd0aCApIHtcblx0XHRsZXQgaW5kZXggPSBjb2xsZWN0aW9uX2xlbmd0aDtcblx0XHRjb25zdCBwcm9jZXNzID0gcHJvY2Vzc29yIDtcblx0XHRjb25zdCBxdWV1ZSA9IGNvbGxlY3Rpb247XG5cdFx0Y29sbGVjdGlvbiA9IFtdO1xuXHRcdHJldHVybiAoKSAgICAgICA9PiB7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdHByb2Nlc3MocXVldWVbLS1pbmRleF0gKTtcblx0XHRcdFx0cXVldWUubGVuZ3RoID0gaW5kZXg7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0cHJvY2Vzc29yID0gbnVsbDtcblx0Y29sbGVjdGlvbi5sZW5ndGggPSBjb2xsZWN0aW9uX2xlbmd0aCA9IDA7XG5cdHplcm9EYXRldGltZSA9IGZhbHNlO1xuXHR1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdGxldCBtaXhlZCAgICAgICAgIDtcblx0c3dpdGNoICggc3BlY2lmaWNhdGlvblZlcnNpb24gKSB7XG5cdFx0Y2FzZSAxLjA6XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdG11c3RTY2FsYXIgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0bXVzdFNjYWxhciA9IGRpc2FsbG93RW1wdHlLZXkgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjM6XG5cdFx0XHRtdXN0U2NhbGFyID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMjpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4xOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMuc3dpdGNoUmVnRXhwKHNwZWNpZmljYXRpb25WZXJzaW9uKTtcblx0XG5cdGlmICggdHlwZW9mIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PSdzdHJpbmcnICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyOyB9XG5cdGVsc2UgaWYgKCBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT11bmRlZmluZWQgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBudWxsOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCxtdWx0aWxpbmVTdHJpbmdKb2luZXIpJyk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKHVzZUJpZ0ludCkgKSB7IHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0dXNpbmdCaWdJbnQgPSBudWxsO1xuXHRcdHVzZUJpZ0ludD49MFxuXHRcdFx0PyBJbnRlZ2VyTWluTnVtYmVyID0gLSggSW50ZWdlck1heE51bWJlciA9IEJpZ0ludCh1c2VCaWdJbnQpIClcblx0XHRcdDogSW50ZWdlck1heE51bWJlciA9IC0oIEludGVnZXJNaW5OdW1iZXIgPSBCaWdJbnQodXNlQmlnSW50KSApIC0gMW47XG5cdH1cblx0XG5cdGlmICggeE9wdGlvbnM9PW51bGwgKSB7XG5cdFx0VGFibGUgPSBQbGFpblRhYmxlO1xuXHRcdHNFcnJvciA9IGFsbG93TG9uZ2VyID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSBmYWxzZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiB4T3B0aW9ucyE9PSdvYmplY3QnICkge1xuXHRcdHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgsLCwke3R5cGVvZiB4T3B0aW9uc31gKTtcblx0fVxuXHRlbHNlIHtcblx0XHRjb25zdCB7IG9yZGVyLCBsb25nZXIsIGV4YWN0LCBudWxsOiBfbnVsbCwgbXVsdGksIGNvbW1lbnQsIHN0cmluZywgbGl0ZXJhbCwgdGFnLCAuLi51bmtub3duIH0gPSB4T3B0aW9ucztcblx0XHRjb25zdCB1bmtub3duTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHVua25vd24pO1xuXHRcdGlmICggdW5rbm93bk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCwsLCx7ICR7dW5rbm93bk5hbWVzLmpvaW4oJywgJyl9IH0pYCk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRwcmVzZXJ2ZUNvbW1lbnQgPSAhIWNvbW1lbnQ7XG5cdFx0ZGlzYWJsZURpZ2l0ID0gISFzdHJpbmc7XG5cdFx0cHJlc2VydmVMaXRlcmFsID0gISFsaXRlcmFsO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKSB4T3B0aW9ucy50YWcgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRcdHByb2Nlc3NvciA9IHRhZztcblx0XHRcdGNvbGxlY3QgPSBjb2xsZWN0X29uO1xuXHRcdH1cblx0XHRlbHNlIHsgY29sbGVjdCA9IGNvbGxlY3Rfb2ZmOyB9XG5cdH1cblx0XG5cdG1peGVkXG5cdFx0PyBhc051bGxzID0gYXNTdHJpbmdzID0gYXNUYWJsZXMgPSBhc0FycmF5cyA9IGFzQm9vbGVhbnMgPSBhc0Zsb2F0cyA9IGFzSW50ZWdlcnMgPSBhc09mZnNldERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlVGltZXMgPSBhc0xvY2FsRGF0ZXMgPSBhc0xvY2FsVGltZXMgPSBhc01peGVkXG5cdFx0OiAoIHsgYXNOdWxscywgYXNTdHJpbmdzLCBhc1RhYmxlcywgYXNBcnJheXMsIGFzQm9vbGVhbnMsIGFzRmxvYXRzLCBhc0ludGVnZXJzLCBhc09mZnNldERhdGVUaW1lcywgYXNMb2NhbERhdGVUaW1lcywgYXNMb2NhbERhdGVzLCBhc0xvY2FsVGltZXMgfSA9IEFTX1RZUEVEICk7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuXG5jb25zdCBwcmV2aW91cyAgICAgICAgICAgICAgICA9IFN5bWJvbCgncHJldmlvdXMnKSAgICAgICA7XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcbiAgXG5cbmV4cG9ydCBjb25zdCB4ID0gICAgIChyb290U3RhY2sgICAgICApICAgID0+IHtcblx0bGV0IHN0YWNrICAgICAgICA9IHJvb3RTdGFjaztcblx0bGV0IHJlc3VsdCA9IHN0YWNrLm5leHQoKTtcblx0aWYgKCAhcmVzdWx0LmRvbmUgKSB7XG5cdFx0cmVzdWx0LnZhbHVlW3ByZXZpb3VzXSA9IHN0YWNrO1xuXHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0aWYgKCByZXN1bHQuZG9uZSApIHtcblx0XHRcdFx0aWYgKCBzdGFjaz09PXJvb3RTdGFjayApIHsgYnJlYWs7IH1cblx0XHRcdFx0c3RhY2sgPSBzdGFja1twcmV2aW91c10gO1xuXHRcdFx0XHRyZXN1bHQgPSBzdGFjay5uZXh0KHJlc3VsdC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnZhbHVlW3ByZXZpb3VzXSA9IHN0YWNrO1xuXHRcdFx0XHRyZXN1bHQgPSAoIHN0YWNrID0gcmVzdWx0LnZhbHVlICkubmV4dCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0LnZhbHVlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuXG5leHBvcnQgY29uc3QgX2xpdGVyYWwgICAgICAgICAgICAgICAgPSBTeW1ib2woJ19saXRlcmFsJykgICAgICAgO1xuXG5leHBvcnQgY29uc3QgTGl0ZXJhbE9iamVjdCA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsaXRlcmFsICAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PiB7XG5cdGNvbnN0IG9iamVjdCA9IE9iamVjdCh2YWx1ZSkgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdG9iamVjdFtfbGl0ZXJhbF0gPSBsaXRlcmFsO1xuXHRyZXR1cm4gb2JqZWN0O1xufTtcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuXG5jb25zdCBhcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoYXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gLyojX19QVVJFX18qL2hhcy5iaW5kKGFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgT0ZfVEFCTEVTID0gZmFsc2U7XG5leHBvcnQgY29uc3QgU1RBVElDQUxMWSA9IHRydWU7XG5jb25zdCBzdGF0aWNhbEFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3Qgc3RhdGljYWxBcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHN0YXRpY2FsQXJyYXlzKTtcbmV4cG9ydCBjb25zdCBpc1N0YXRpYyA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChzdGF0aWNhbEFycmF5cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG5ld0FycmF5ID0gKGlzU3RhdGljICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCBhcnJheSAgICAgICAgPSBbXTtcblx0YXJyYXlzX2FkZChhcnJheSk7XG5cdGlzU3RhdGljICYmIHN0YXRpY2FsQXJyYXlzX2FkZChhcnJheSk7XG5cdHJldHVybiBhcnJheTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcbiBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IE5hdGl2ZURhdGUgZnJvbSAnLkRhdGUnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy5EYXRlLnBhcnNlJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuLy8vaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLm51bGwuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5cbmNvbnN0IGZwYyA9ICAgICAgICAgICAgICAgICAgICAgIChjICAgKSAgICA9PiB7XG5cdGZyZWV6ZShmcmVlemUoYykucHJvdG90eXBlKTtcblx0cmV0dXJuIGM7XG59O1xuXG5jb25zdCBfMjlfID0gLyg/OjBbMS05XXwxXFxkfDJcXGQpLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KVxuYC52YWx1ZU9mKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5gLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86W1p6XXxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgeyBleGVjOiBaX2V4ZWMgfSA9IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZHsxLDN9KFxcZCo/KTAqKT9cblx0KD86W1p6XXxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCgpXG5cdFtael1cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEVUSU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9EQVRFIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfVElNRSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgVCA9IC9bIHRdLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IFpFUk8gPSAvXFwuKFxcZCo/KTArJC87XG5jb25zdCB6ZXJvUmVwbGFjZXIgPSAobWF0Y2ggICAgICAgICwgcDEgICAgICAgICkgPT4gcDE7XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgemVyb1JlcGxhY2VyKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgbGVhcCA9IChsaXRlcmFsICAgICAgICApID0+IGxpdGVyYWwuc2xpY2UoNSwgMTApIT09JzAyLTI5JyB8fCArbGl0ZXJhbC5zbGljZSgwLCA0KSU0PT09MCAmJiBsaXRlcmFsLnNsaWNlKDIsIDQpIT09JzAwJztcblxuY29uc3QgREFURSAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKG5ldyBOYXRpdmVEYXRlKDApLCAvKiNfX1BVUkVfXyovZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhOYXRpdmVEYXRlLnByb3RvdHlwZSkpO1xuXG5jb25zdCBPZmZzZXREYXRlVGltZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3VzZSA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJCAgICAgICAgID0gMCkgPT4ge1xuXHREQVRFLnNldFRpbWUoK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICsgJCk7XG5cdHJldHVybiBEQVRFO1xufTtcbi8qY29uc3QgT2Zmc2V0RGF0ZVRpbWVfZ2V0ID0gKHRoYXQgOkluc3RhbmNlVHlwZTx0eXBlb2YgT2Zmc2V0RGF0ZVRpbWU+LCBzdGFydCA6bnVtYmVyLCBlbmQgOm51bWJlcikgPT4gK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3NldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIsIHZhbHVlIDpudW1iZXIpID0+IHtcblx0aWYgKCBlbmQgKSB7XG5cdFx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0XHRjb25zdCBzaXplID0gZW5kIC0gc3RhcnQ7XG5cdFx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHRcdHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpO1xuXHR9XG5cdGNvbnN0IHRpbWUgPSBwYXJzZSh0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRyZXR1cm4gdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpOy8vL3RpbWVcbn07Ki8vL1xuZXhwb3J0IGNvbnN0IE9mZnNldERhdGVUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBPZmZzZXREYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyAxOiBtb3JlIH0gPSBsZWFwKGxpdGVyYWwpICYmICggb3B0aW9ucy56ZXJvRGF0ZXRpbWUgPyBPRkZTRVRfREFURVRJTUVfWkVST19leGVjIDogT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgKShsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZShULCAnVCcpLnJlcGxhY2UoJ3onLCAnWicpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHBhcnNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSkgKS5wYWRTdGFydCgxNSwgJzAnKSArICggbW9yZSA/ICcuJyArIG1vcmUgOiAnJyApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRVVENGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRnVsbFllYXIoKTsgfVxuXHQvLy9nZXQgeWVhciAoKSA6RnVsbFllYXIgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdC8vL3NldCB5ZWFyICh2YWx1ZSA6RnVsbFllYXIpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRVVENNb250aCAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTW9udGgoKTsgfVxuXHQvLy9nZXQgbW9udGggKCkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpOyB9XG5cdC8vL3NldCBtb250aCAodmFsdWUpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlKTsgfVxuXHRnZXRVVENEYXRlICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0RhdGUoKTsgfVxuXHQvLy9nZXQgZGF5ICgpIDpEYXRlIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0Ly8vc2V0IGRheSAodmFsdWUgOkRhdGUpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldFVUQ0hvdXJzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENIb3VycygpOyB9XG5cdC8vL2dldCBob3VyICgpIDpIb3VycyB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHQvLy9zZXQgaG91ciAodmFsdWUgOkhvdXJzKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRVVENNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbnV0ZXMoKTsgfVxuXHQvLy9nZXQgbWludXRlICgpIDpNaW51dGVzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdC8vL3NldCBtaW51dGUgKHZhbHVlIDpNaW51dGVzKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRVVENTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ1NlY29uZHMoKTsgfVxuXHQvLy9nZXQgc2Vjb25kICgpIDpTZWNvbmRzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdC8vL3NldCBzZWNvbmQgKHZhbHVlIDpTZWNvbmRzKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRVVENNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaWxsaXNlY29uZHMoKTsgfS8vL1xuXHQvLy9nZXQgbWlsbGlzZWNvbmQgKCkgOk1pbGxpc2Vjb25kcyB7IHJldHVybiArdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTIsIDE1KTsgfS8vL1xuXHQvKnNldCBtaWxsaXNlY29uZCAodmFsdWUgOk1pbGxpc2Vjb25kcykge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgMCwgMCk7XG5cdH0qLy8vXG5cdC8vL2dldCBtaWNyb3NlY29uZCAoKSA6TWlsbGlzZWNvbmRzXG5cdC8vL3NldCBtaWNyb3NlY29uZCAodmFsdWUgOk1pbGxpc2Vjb25kcylcblx0Ly8vZ2V0IG5hbm9zZWNvbmQgKCkgOk1pbGxpc2Vjb25kc1xuXHQvLy9zZXQgbmFub3NlY29uZCAodmFsdWUgOk1pbGxpc2Vjb25kcylcblx0XG5cdGdldFVUQ0RheSAoICAgICAgICAgICAgICAgICAgICApICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0RheSgpOyB9XG5cdC8vL2dldCBkYXlPZldlZWsgKCkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSo2MDAwMCkuZ2V0VVRDRGF5KCkgfHwgNzsgfVxuXHRnZXRUaW1lem9uZU9mZnNldCAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdHJldHVybiB6ID8gK3pbMV0qNjAgKyArKCB6WzJdICsgelszXSApIDogMDtcblx0fVxuXHQvLy9nZXQgb2Zmc2V0ICgpIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5lbmRzV2l0aCgnWicpID8gJ1onIDogdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKC02KTsgfVxuXHQvKnNldCBvZmZzZXQgKHZhbHVlKSB7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5lbmRzV2l0aCgnWicpID8gLTEgOiAtNikgKyB2YWx1ZTtcblx0XHRPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgMCwgMCk7XG5cdH0qLy8vXG5cdGdldFRpbWUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiArdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMCwgMTUpOyB9Ly8vXG5cdC8qc2V0VGltZSAodGhpcyA6T2Zmc2V0RGF0ZVRpbWUsIHZhbHVlIDpUaW1lKSA6dm9pZCB7XG5cdFx0dmFsdWUgPSBEQVRFLnNldFRpbWUodmFsdWUpO1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHREQVRFLnNldFRpbWUodmFsdWUgKyAoIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwICkqNjAwMDApO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHogPyBEQVRFLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgLTEpICsgelswXSA6IERBVEUudG9JU09TdHJpbmcoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDE1LCAnMCcpO1xuXHRcdC8vL3JldHVybiB2YWx1ZTtcblx0fSovXG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdHRoYXRbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGVUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFVElNRShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZShULCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApICAgICAgIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsVGltZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsVGltZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IExvY2FsVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbFRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdHRoYXRbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydCgyLCAnMCcpICsgdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbFRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAsIG4gICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkge1xuXHRcdFx0KytuO1xuXHRcdFx0cGFydHNbaW5kZXhdID0gdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXG4nOlxuXHRcdFx0XHRjYXNlICcgJzpcblx0XHRcdFx0Y2FzZSAnXFx0Jzpcblx0XHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPSBwYXJ0LmluZGV4T2YoJ1xcbicsIGkpICsgMTsgKSB7ICsrbjsgfVxuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9ICcnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuaW1wb3J0IE51bWJlciBmcm9tICcuTnVtYmVyJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBJTlRFR0VSX0QgPSAvWy0rXT8oPzowfFsxLTldW19cXGRdKikvO1xuZXhwb3J0IGNvbnN0IHsgdGVzdDogQkFEX0QgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXyg/IVxcZClgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfRF9JTlRFR0VSIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF4ke0lOVEVHRVJfRH0kYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IElTX1hPQl9JTlRFR0VSIH0gPSB0aGVSZWdFeHAoL14wKD86eFtcXGRBLUZhLWZdW19cXGRBLUZhLWZdKnxvWzAtN11bXzAtN10qfGJbMDFdW18wMV0qKSQvKTtcbmNvbnN0IHsgdGVzdDogQkFEX1hPQiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hW1xcZEEtRmEtZl0pYC52YWx1ZU9mKCk7XG5jb25zdCBVTkRFUlNDT1JFU19TSUdOID0gL198XlstK10vZztcblxuY29uc3QgSVNfSU5URUdFUiA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgID0+ICggSVNfRF9JTlRFR0VSKGxpdGVyYWwpIHx8IC8qb3B0aW9ucy54b2IgJiYgKi9JU19YT0JfSU5URUdFUihsaXRlcmFsKSApICYmICFCQURfWE9CKGxpdGVyYWwpO1xuXG5jb25zdCBCaWdJbnRJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gbGl0ZXJhbFswXT09PSctJ1xuXHRcdD8gLUJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKVxuXHRcdDogQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRvcHRpb25zLmFsbG93TG9uZ2VyXG5cdHx8XG5cdC05MjIzMzcyMDM2ODU0Nzc1ODA4bjw9YmlnSW50ICYmIGJpZ0ludDw9OTIyMzM3MjAzNjg1NDc3NTgwN24vLyAoIG1pbiA9IC0oMm4qKig2NG4tMW4pKSB8fCAtbWF4LTFuICkgPD0gbG9uZyA8PSAoIG1heCA9IDJuKiooNjRuLTFuKS0xbiB8fCAtbWluLTFuIClcblx0fHxcblx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcblxuY29uc3QgTnVtYmVySW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19JTlRFR0VSKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBkaWQgbm90IHVzZSBCaXRJbnQgbXVzdCBmaXQgTnVtYmVyLmlzU2FmZUludGVnZXIsIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBvcHRpb25zLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zLnVzaW5nQmlnSW50PT09ZmFsc2UgKSB7IHJldHVybiBOdW1iZXJJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gQmlnSW50SW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIG9wdGlvbnMuSW50ZWdlck1pbk51bWJlcjw9YmlnSW50ICYmIGJpZ0ludDw9b3B0aW9ucy5JbnRlZ2VyTWF4TnVtYmVyID8gTnVtYmVyKGJpZ0ludCkgOiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IElOVEVHRVJfRCwgQkFEX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElTX0ZMT0FUIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPzpcblx0XHRcXC5cXGRbX1xcZF0qXG5cdFx0KD86W2VFXVstK10/XFxkW19cXGRdKik/XG5cdHxcblx0XHRbZUVdWy0rXT9cXGRbX1xcZF0qXG5cdClcblx0JGAudmFsdWVPZigpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgeyB0ZXN0OiBJU19aRVJPIH0gPSB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC4wKyk/KD86W2VFXVstK10/MCspPyQvKTtcbmNvbnN0IHsgZXhlYzogTk9STUFMSVpFRCB9ID0gdGhlUmVnRXhwICAgKC9eWy0wXT8oXFxkKikoPzpcXC4oXFxkKykpPyg/OmVcXCs/KC0/XFxkKykpPyQvKTtcbmNvbnN0IHsgZXhlYzogT1JJR0lOQUwgfSA9IHRoZVJlZ0V4cCAgICgvXlstK10/MD8oXFxkKikoPzpcXC4oXFxkKj8pMCopPyg/OltlRV1cXCs/KC0/XFxkKykpPyQvKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIUlTX0ZMT0FUKGxpdGVyYWwpIHx8IEJBRF9EKGxpdGVyYWwpICkge1xuXHRcdGlmICggb3B0aW9ucy5zRmxvYXQgKSB7XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0XHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIF9JbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdFx0fVxuXHRcdHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRjb25zdCB3aXRob3V0VW5kZXJzY29yZXMgICAgICAgICA9IGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpO1xuXHRjb25zdCBudW1iZXIgICAgICAgICA9ICt3aXRob3V0VW5kZXJzY29yZXM7XG5cdGlmICggb3B0aW9ucy5zRXJyb3IgKSB7XG5cdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRudW1iZXIgfHwgSVNfWkVSTyh3aXRob3V0VW5kZXJzY29yZXMpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB7IDE6IG5vcm1hbGl6ZWRfaW50ZWdlciwgMjogbm9ybWFsaXplZF9mcmFjdGlvbmFsID0gJycsIDM6IG5vcm1hbGl6ZWRfZXhwb25lbnQgPSAnJyB9ID0gTk9STUFMSVpFRChudW1iZXIgICAgICAgKSA7XG5cdFx0Y29uc3QgeyAxOiBvcmlnaW5hbF9pbnRlZ2VyLCAyOiBvcmlnaW5hbF9mcmFjdGlvbmFsID0gJycsIDM6IG9yaWdpbmFsX2V4cG9uZW50ID0gJycgfSA9IE9SSUdJTkFMKHdpdGhvdXRVbmRlcnNjb3JlcykgO1xuXHRcdG9yaWdpbmFsX2ludGVnZXIgKyBvcmlnaW5hbF9mcmFjdGlvbmFsPT09bm9ybWFsaXplZF9pbnRlZ2VyICsgbm9ybWFsaXplZF9mcmFjdGlvbmFsXG5cdFx0JiZcblx0XHRvcmlnaW5hbF9leHBvbmVudCAgICAgICAgLSBvcmlnaW5hbF9mcmFjdGlvbmFsLmxlbmd0aD09PW5vcm1hbGl6ZWRfZXhwb25lbnQgICAgICAgIC0gbm9ybWFsaXplZF9mcmFjdGlvbmFsLmxlbmd0aFxuXHRcdHx8XG5cdFx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGxvc3QgaXRzIGV4YWN0IGFuZCBiZWVuICR7bnVtYmVyfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIGRpcmVjdGx5SWZOb3QsIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nLCBNdWx0aWxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkodGFibGUpICkge1xuXHRcdFx0XHRpc1N0YXRpYyh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIFN0YXRpYyBBcnJheWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlID0gdGFibGVbKCB0YWJsZSAgICAgICAgICApLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSk7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kVGFibGUgPSAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gcHVzaCBUYWJsZSB0byBub24tQXJyYXlPZlRhYmxlcyB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHRlbHNlIHsgYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KE9GX1RBQkxFUyk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucy5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkge1xuXHRcdFx0bGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldO1xuXHRcdFx0ZnJvbVBhaXIobGFzdFRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBrZXkvdmFsdWUgcGFpciBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBbXWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0ZGlyZWN0bHlJZk5vdChsYXN0VGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgRHVwbGljYXRlIFRhYmxlIGRlZmluaXRpb25gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFkpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5saW5lVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRmcm9tUGFpcih0YWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEgW10gY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNoZWNrTGl0ZXJhbFN0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRyZWdleHBzLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGEgTGl0ZXJhbCBTdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiBsaXRlcmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkxpdGVyYWxTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aChgJycnYCkgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBsaXRlcmFsIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgMiksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwuc2xpY2UoMykpO1xuXHRpZiAoICQgKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDYpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gJFszXTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdNdWx0aS1saW5lIExpdGVyYWwgU3RyaW5nJywgbGl0ZXJhbC5sZW5ndGgpO1xuXHRjb25zdCBsZWFkaW5nTmV3bGluZSA9ICEoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICk7XG5cdGlmICggbGVhZGluZ05ld2xpbmUgKSB7XG5cdFx0bGl0ZXJhbCA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QoWyBgJycnYCwgbGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyAzKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0fVxuXHRvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPz8gc3RhcnQubm93cmFwKCk7XG5cdGZvciAoIGNvbnN0IGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgY2hlY2tMaXRlcmFsU3RyaW5nKGxpdGVyYWwpIF07IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gc3RhcnQubXVzdCgpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpbmUpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBsaW5lcy5qb2luKG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyApO1xuXHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCApIHtcblx0XHRcdFx0bGluZXNbbGluZXMubGVuZ3RoIC0gMV0gKz0gYCcnJ2A7XG5cdFx0XHRcdGxlYWRpbmdOZXdsaW5lID8gbGluZXMudW5zaGlmdChgJycnYCkgOiBsaW5lc1swXSA9IGAnJycke2xpdGVyYWx9YDtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gTGl0ZXJhbE9iamVjdChsaW5lcywgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHZhbHVlOyB9XG5cdFx0XHRyZXR1cm4gJFszXTtcblx0XHR9XG5cdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGNoZWNrTGl0ZXJhbFN0cmluZyhsaW5lKTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJhc2ljU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicpICkge1xuXHRcdGNvbnN0IGluZGV4ID0gcmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4KGxpdGVyYWwpO1xuXHRcdGNvbnN0IHZhbHVlID0gQmFzaWNTdHJpbmcobGl0ZXJhbC5zbGljZSgxLCBpbmRleCkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIGluZGV4ICsgMSksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGluZGV4ICsgMSkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0bGV0IGxlbmd0aCA9IDMgKyByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGl0ZXJhbC5zbGljZSgzKSk7XG5cdGlmICggbGl0ZXJhbC5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3QgJCA9IGxpdGVyYWwuc2xpY2UoMywgbGVuZ3RoKTtcblx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB2YWx1ZSA9IEJhc2ljU3RyaW5nKCQpICsgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdNdWx0aS1saW5lIEJhc2ljIFN0cmluZycsIGxlbmd0aCk7XG5cdGNvbnN0IHNraXBwZWQgICAgICAgID0gKCBsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKSApID8gMCA6IDE7XG5cdGlmICggc2tpcHBlZCApIHtcblx0XHRsaXRlcmFsID0gc3RhcnQubXVzdCgpO1xuXHRcdGxldCBsZW5ndGggPSByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGl0ZXJhbCk7XG5cdFx0aWYgKCBsaXRlcmFsLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0ICQgPSBsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCk7XG5cdFx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcoJCwgb3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICwgc2tpcHBlZCkgKyAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChbICdcIlwiXCInLCBsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCkgXSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0fVxuXHRvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPz8gc3RhcnQubm93cmFwKCk7XG5cdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCArICdcXG4nKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGZvciAoIGNvbnN0IGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgbGl0ZXJhbCBdOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRsZXQgbGVuZ3RoID0gcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpbmUpO1xuXHRcdGlmICggbGluZS5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCAkID0gbGluZS5zbGljZSgwLCBsZW5ndGgpO1xuXHRcdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IE11bHRpbGluZUJhc2ljU3RyaW5nKGxpbmVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyAkLCBvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgLCBza2lwcGVkKSArICggbGluZS5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpbmUuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCApIHtcblx0XHRcdFx0c2tpcHBlZCA/IGxpbmVzLnVuc2hpZnQoJ1wiXCJcIicpIDogbGluZXNbMF0gPSBgXCJcIlwiJHtsaXRlcmFsfWA7XG5cdFx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBgJHskfVwiXCJcImA7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IExpdGVyYWxPYmplY3QobGluZXMsIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSB2YWx1ZTsgfVxuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaW5lICsgJ1xcbicpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gbGluZTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgS0VZUyA9IC8qI19fUFVSRV9fKi9OdWxsICAgICAgICAobnVsbCk7XG5leHBvcnQgY29uc3QgY29tbWVudEZvciA9IChrZXkgICAgICAgICkgICAgICAgICA9PiBLRVlTW2tleV0gPz8gKCBLRVlTW2tleV0gPSBTeW1ib2woa2V5KSApO1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3JUaGlzICAgICAgICAgICAgICAgID0gU3ltYm9sKCd0aGlzJykgICAgICAgO1xuXG5jb25zdCB7IHRlc3Q6IGluY2x1ZGVzTmV3bGluZSB9ID0gdGhlUmVnRXhwKC9cXHI/XFxuL2cpO1xuZXhwb3J0IGNvbnN0IGdldENPTU1FTlQgPSAodGFibGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5Q29tbWVudCAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBrZXlDb21tZW50IGluIHRhYmxlICkge1xuXHRcdGNvbnN0IGNvbW1lbnQgPSB0YWJsZVtrZXlDb21tZW50XTtcblx0XHRpZiAoIHR5cGVvZiBjb21tZW50IT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgdGhlIHZhbHVlIG9mIGNvbW1lbnQgbXVzdCBiZSBhIHN0cmluZywgd2hpbGUgXCIke2NvbW1lbnQ9PT1udWxsID8gJ251bGwnIDogdHlwZW9mIGNvbW1lbnR9XCIgdHlwZSBpcyBmb3VuZGApOyB9XG5cdFx0aWYgKCBpbmNsdWRlc05ld2xpbmUoY29tbWVudCkgKSB7IHRocm93IFN5bnRheEVycm9yKGB0aGUgdmFsdWUgb2YgY29tbWVudCBtdXN0IGJlIGEgc3RyaW5nIGFuZCBjYW4gbm90IGluY2x1ZGUgbmV3bGluZWApOyB9XG5cdFx0cmV0dXJuIGAgIyR7Y29tbWVudH1gOy8vL1xuXHR9XG5cdHJldHVybiAnJztcbn07XG5leHBvcnQgY29uc3QgZ2V0Q29tbWVudCA9ICAgICAgICAgICAgICAgICAgICAodGFibGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXkgICApICAgICAgICAgICAgICAgICAgICAgPT4ga2V5IGluIEtFWVMgPyBnZXRDT01NRU5UKHRhYmxlLCBLRVlTW2tleV0gKSA6ICcnO1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyB4IH0gZnJvbSAnLi4vai1sZXhlcic7Ly8vIGV4dGVybmFsXG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IElOTElORSwgRElSRUNUTFkgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgU1RBVElDQUxMWSB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUJCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi4vcmVnZXhwcyc7XG5pbXBvcnQgeyBhcHBlbmRUYWJsZSwgcHJlcGFyZVRhYmxlLCBwcmVwYXJlSW5saW5lVGFibGUsIGFzc2lnbkxpdGVyYWxTdHJpbmcsIGFzc2lnbkJhc2ljU3RyaW5nIH0gZnJvbSAnLi9vbi10aGUtc3BvdCc7XG5cbmltcG9ydCB7IGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzIH0gZnJvbSAnLi4vdHlwZXMvY29tbWVudCc7XG5pbXBvcnQgeyBiZUlubGluZSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcblxuY29uc3QgeyB0ZXN0OiBJU19PRkZTRVQkIH0gPSB0aGVSZWdFeHAoT0ZGU0VUJCk7XG5jb25zdCB7IHRlc3Q6IElTX0VNUFRZIH0gPSB0aGVSZWdFeHAoL15cXFtbXFx0IF0qXS8pO1xuXG5jb25zdCBwYXJzZUtleXMgPSAocmVzdCAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGxldCBsaW5lUmVzdCAgICAgICAgID0gcmVzdDtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgID0gW107XG5cdGxldCBsYXN0SW5kZXggICAgICAgICA9IC0xO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGluZVJlc3QgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBiYXJlIGtleWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PSdcIicgKSB7XG5cdFx0XHRjb25zdCBpbmRleCAgICAgICAgID0gcmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4KGxpbmVSZXN0KTtcblx0XHRcdGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IEJhc2ljU3RyaW5nKGxpbmVSZXN0LnNsaWNlKDEsIGluZGV4KSk7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGluZGV4ICsgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNRdW90ZWQgPSBsaW5lUmVzdFswXT09PSdcXCcnO1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggaXNRdW90ZWQgPyByZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyA6IHJlZ2V4cHMuX19CQVJFX0tFWV9leGVjICkobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkICR7aXNRdW90ZWQgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGtleS5sZW5ndGgpO1xuXHRcdFx0bGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gaXNRdW90ZWQgPyBrZXkuc2xpY2UoMSwgLTEpIDoga2V5O1xuXHRcdH1cblx0XHRpZiAoIHJlZ2V4cHMuSVNfRE9UX0tFWShsaW5lUmVzdCkgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLkRPVF9LRVksICcnKTsgfVxuXHRcdGVsc2UgeyBicmVhazsgfVxuXHR9XG5cdGlmICggb3B0aW9ucy5kaXNhYmxlRGlnaXQgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IHJlc3Quc2xpY2UoMCwgLWxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0KCByZWdleHBzLmlzQW1hemluZyhrZXlzKSB8fCBvcHRpb25zLmVuYWJsZU51bGwgJiYga2V5cz09PSdudWxsJyApICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhcmUga2V5IGRpc2FibGVkIGJ5IHhPcHRpb25zLnN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7XG5cdFx0ZG8geyBsZWFkaW5nS2V5c1tpbmRleF0gIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXgtLSApO1xuXHR9XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsYXN0SW5kZXhdIDtcblx0bGVhZGluZ0tleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWcgYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUob3B0aW9ucy5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBsaXRlcmFsPT09J3RydWUnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgb3B0aW9ucy5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgSW50ZWdlcihsaXRlcmFsKSkgOiBJbnRlZ2VyKGxpdGVyYWwpXG5cdFx0O1xuXHR9XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3Qgc3RhdGljQXJyYXkgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoU1RBVElDQUxMWSk7XG5cdGlmICggSVNfRU1QVFkobGluZVJlc3QpICkge1xuXHRcdGJlSW5saW5lKHN0YXRpY0FycmF5LCBsaW5lUmVzdFsxXT09PSddJyA/IDAgOiAzKTtcblx0XHRyZXR1cm4gbGluZVJlc3Quc2xpY2UobGluZVJlc3QuaW5kZXhPZignXScpKS5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdTdGF0aWMgQXJyYXknLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRsZXQgaW5saW5lICAgICAgICAgICAgICAgPSBsaW5lUmVzdC5zdGFydHNXaXRoKCdbICcpIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1tcXHQnKSA/IDMgOiAwO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7XG5cdFx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0XHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0XHR9XG5cdH1cblx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRpZiAoIG9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSApIHtcblx0XHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdJbmxpbmUgVGFibGUnLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0bGV0IGlubGluZSA9IHRydWU7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0fVxuXHRcdGlubGluZSB8fCBiZUlubGluZShpbmxpbmVUYWJsZSwgZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXSE9PSd9JyApIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpKTtcblx0XHRcdFx0bGluZVJlc3QgPSAoIHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdCApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBGb3JDb21tZW50ID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZyB9ID0geyBsaW5lUmVzdCB9ID0gcmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhwYXJzZUtleXMobGluZVJlc3QpKTtcblx0cmV0dXJuIHsgdGFibGU6IHByZXBhcmVJbmxpbmVUYWJsZShsYXN0SW5saW5lVGFibGUsIGxlYWRpbmdLZXlzKSwgZmluYWxLZXksIHRhZywgbGluZVJlc3QgfTtcbn07XG5jb25zdCBhc3NpZ24gPSAoeyBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCwgdGFibGUgfSAgICAgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnfSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyB0YWJsZVtmaW5hbEtleV0gPSBmYWxzZTsgfVxuXHRlbHNlIGlmICggb3B0aW9ucy5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnbicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4Jylcblx0XHRcdD8gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEZsb2F0KGxpdGVyYWwpKSA6IEZsb2F0KGxpdGVyYWwpXG5cdFx0XHQ6IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9ID0gcmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUsIHBhcnNlS2V5cyk7XG5cdFx0XHRcdGNvbnN0IHRhYmxlICAgICAgICA9IHByZXBhcmVUYWJsZShyb290VGFibGUsIGxlYWRpbmdLZXlzKTtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUodGFibGUsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnKTtcblx0XHRcdFx0b3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgJiYgbGluZVJlc3QgJiYgKCBsYXN0U2VjdGlvblRhYmxlW2NvbW1lbnRGb3JUaGlzXSA9IGFzQXJyYXlJdGVtID8gbGluZVJlc3Quc2xpY2UoMSkgOiB0YWJsZVtjb21tZW50Rm9yKGZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGxpbmVbMF09PT0nIycgKSB7XG5cdFx0XHRcdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQobGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0XHR0eXBlb2YgcmVzdD09PSdzdHJpbmcnIHx8ICggcmVzdCA9IHggICAgICAgIChyZXN0KSApO1xuXHRcdFx0XHRpZiAoIHJlc3QgKSB7XG5cdFx0XHRcdFx0cmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSByZXN0LnNsaWNlKDEpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgc3BlY2llcyBmcm9tICcuU3ltYm9sLnNwZWNpZXMnO1xuaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLlVpbnQ4QXJyYXknO1xuaW1wb3J0IEJ1ZmZlciBmcm9tICcuQnVmZmVyPyc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmV4cG9ydCBjb25zdCBpc0FycmF5QnVmZmVyTGlrZSA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgPT4gJ2J5dGVMZW5ndGgnIGluIHZhbHVlOy8vL1xuXG5jb25zdCBtZXNzYWdlID0gJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJztcblxuZXhwb3J0IGNvbnN0IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IEJ1ZmZlclxuXHRcblx0PyAvKiNfX1BVUkVfXyovKCAoeyBpc0J1ZmZlciwgW3NwZWNpZXNdOiBCdWYsIGJ5dGVMZW5ndGgsIGFsbG9jVW5zYWZlLCBmcm9tIH0pID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKCB0eXBlb2YgQnVmZmVyLnByb3RvdHlwZS51dGY4V3JpdGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdFx0Y29uc3QgdXRmOCA9IEJ1ZmZlci5hbGxvYyg3KTtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHV0ZjgudXRmOFdyaXRlKCfwoK635YipJywgMCwgNyk7XG5cdFx0XHRpZiAoIHV0ZjguZXF1YWxzKGZyb20oJ/CgrrfliKknKSkgKSB7XG5cdFx0XHRcdHJldHVybiAoYXJyYXlCdWZmZXJMaWtlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgPT4ge1xuXHRcdFx0XHRcdGlmICggIWFycmF5QnVmZmVyTGlrZS5ieXRlTGVuZ3RoICkgeyByZXR1cm4gJyc7IH1cblx0XHRcdFx0XHRjb25zdCBidWZmZXIgICAgICAgICA9IGlzQnVmZmVyKGFycmF5QnVmZmVyTGlrZSkvLy8gaXNWaWV3LCBsZW5ndGg9PT1ieXRlTGVuZ3RoISwgaW5zdGFuY2VvZiBCdWZmZXJcblx0XHRcdFx0XHRcdD8gYXJyYXlCdWZmZXJMaWtlXG5cdFx0XHRcdFx0XHQ6ICdsZW5ndGgnIGluIGFycmF5QnVmZmVyTGlrZS8vLyBpc1ZpZXcsIGxlbmd0aD09PWJ5dGVMZW5ndGghXG5cdFx0XHRcdFx0XHRcdD8gbmV3IEJ1ZihhcnJheUJ1ZmZlckxpa2UuYnVmZmVyLCBhcnJheUJ1ZmZlckxpa2UuYnl0ZU9mZnNldCwgYXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGgpXG5cdFx0XHRcdFx0XHRcdDogbmV3IEJ1ZihhcnJheUJ1ZmZlckxpa2UpOy8vLyBjbGFzcy5pc0FycmF5QnVmZmVyIVxuXHRcdFx0XHRcdGNvbnN0IHN0cmluZyAgICAgICAgID0gYnVmZmVyLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0aWYgKCBzdHJpbmcuaW5jbHVkZXMoJ1xcdUZGRkQnKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxlbmd0aCAgICAgICAgID0gYnl0ZUxlbmd0aChzdHJpbmcpO1xuXHRcdFx0XHRcdFx0aWYgKCBsZW5ndGghPT1idWZmZXIubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihtZXNzYWdlKTsgfVxuXHRcdFx0XHRcdFx0Y29uc3QgdXRmOCA9IGFsbG9jVW5zYWZlKGxlbmd0aCk7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR1dGY4LnV0ZjhXcml0ZShzdHJpbmcsIDAsIGxlbmd0aCk7XG5cdFx0XHRcdFx0XHRpZiAoICF1dGY4LmVxdWFscyhidWZmZXIpICkgeyB0aHJvdyBFcnJvcihtZXNzYWdlKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gc3RyaW5nWzBdPT09J1xcdUZFRkYnID8gc3RyaW5nLnNsaWNlKDEpIDogc3RyaW5nO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gKGFycmF5QnVmZmVyTGlrZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgID0+IHtcblx0XHRcdGlmICggIWFycmF5QnVmZmVyTGlrZS5ieXRlTGVuZ3RoICkgeyByZXR1cm4gJyc7IH1cblx0XHRcdGNvbnN0IGJ1ZmZlciAgICAgICAgID1cblx0XHRcdFx0aXNCdWZmZXIoYXJyYXlCdWZmZXJMaWtlKS8vLyBpc1ZpZXcsIGxlbmd0aD09PWJ5dGVMZW5ndGghLCBpbnN0YW5jZW9mIEJ1ZmZlclxuXHRcdFx0XHRcdD8gYXJyYXlCdWZmZXJMaWtlXG5cdFx0XHRcdFx0OiAnbGVuZ3RoJyBpbiBhcnJheUJ1ZmZlckxpa2UvLy8gaXNWaWV3LCBsZW5ndGg9PT1ieXRlTGVuZ3RoIVxuXHRcdFx0XHRcdFx0PyBuZXcgQnVmKGFycmF5QnVmZmVyTGlrZS5idWZmZXIsIGFycmF5QnVmZmVyTGlrZS5ieXRlT2Zmc2V0LCBhcnJheUJ1ZmZlckxpa2UuYnl0ZUxlbmd0aClcblx0XHRcdFx0XHRcdDogbmV3IEJ1ZihhcnJheUJ1ZmZlckxpa2UpOy8vLyBjbGFzcy5pc0FycmF5QnVmZmVyIVxuXHRcdFx0Y29uc3Qgc3RyaW5nICAgICAgICAgPSBidWZmZXIudG9TdHJpbmcoKTtcblx0XHRcdGlmICggc3RyaW5nLmluY2x1ZGVzKCdcXHVGRkZEJykgJiYgIWZyb20oc3RyaW5nKS5lcXVhbHMoYnVmZmVyKSApIHsgdGhyb3cgRXJyb3IobWVzc2FnZSk7IH1cblx0XHRcdHJldHVybiBzdHJpbmdbMF09PT0nXFx1RkVGRicgPyBzdHJpbmcuc2xpY2UoMSkgOiBzdHJpbmc7XG5cdFx0fTtcblx0fSkoQnVmZmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG5cdFxuXHQ6IChhcnJheUJ1ZmZlckxpa2UgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdFx0aWYgKCAhYXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggKSB7IHJldHVybiAnJzsgfVxuXHRcdGNvbnN0IHVpbnQ4QXJyYXkgICAgICAgICAgICAgPVxuXHRcdFx0J2xlbmd0aCcgaW4gYXJyYXlCdWZmZXJMaWtlLy8vIGlzVmlldywgbGVuZ3RoPT09Ynl0ZUxlbmd0aCFcblx0XHRcdFx0PyBhcnJheUJ1ZmZlckxpa2Vcblx0XHRcdFx0OiBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlckxpa2UpOy8vLyBjbGFzcy5pc0FycmF5QnVmZmVyIVxuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSB1aW50OEFycmF5O1xuXHRcdGNvbnN0IGxlbmd0aF8xID0gbGVuZ3RoIC0gMTtcblx0XHRjb25zdCBsZW5ndGhfMiA9IGxlbmd0aF8xIC0gMTtcblx0XHRjb25zdCBsZW5ndGhfMyA9IGxlbmd0aF8yIC0gMTtcblx0XHRjb25zdCBzdHJpbmdBcnJheSAgICAgICAgICAgPSBbXTtcblx0XHRsZXQgc3RyaW5nQXJyYXlfbGVuZ3RoICAgICAgICAgPSAwO1xuXHRcdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0XHRkbyB7XG5cdFx0XHRsZXQgY29kZVBvaW50ICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4XSA7XG5cdFx0XHRpZiAoIGNvZGVQb2ludDwwYjExMDBfMDAwMCApIHtcblx0XHRcdFx0aWYgKCBjb2RlUG9pbnQ8MGIxMDAwXzAwMDAgKSB7XG5cdFx0XHRcdFx0c3RyaW5nQXJyYXlbc3RyaW5nQXJyYXlfbGVuZ3RoKytdID0gZnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0aW5kZXggKz0gMTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGNvZGVQb2ludDwwYjExMTBfMDAwMCApIHtcblx0XHRcdFx0aWYgKCBpbmRleDxsZW5ndGhfMSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWNvbmRCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgMV0gO1xuXHRcdFx0XHRcdGlmICggKCBzZWNvbmRCeXRlJjBiMTEwMF8wMDAwICk9PT0wYjEwMDBfMDAwMCApIHtcblx0XHRcdFx0XHRcdGNvZGVQb2ludCA9ICggY29kZVBvaW50JjBiMDAwMV8xMTExICk8PDZ8KCBzZWNvbmRCeXRlJjBiMDAxMV8xMTExICk7XG5cdFx0XHRcdFx0XHRpZiAoIDBiMDExMV8xMTExPGNvZGVQb2ludCApIHtcblx0XHRcdFx0XHRcdFx0c3RyaW5nQXJyYXlbc3RyaW5nQXJyYXlfbGVuZ3RoKytdID0gZnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0XHRcdGluZGV4ICs9IDI7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGNvZGVQb2ludDwwYjExMTFfMDAwMCApIHtcblx0XHRcdFx0aWYgKCBpbmRleDxsZW5ndGhfMiApIHtcblx0XHRcdFx0XHRjb25zdCBzZWNvbmRCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgMV0gO1xuXHRcdFx0XHRcdGNvbnN0IHRoaXJkQnl0ZSAgICAgICAgID0gdWludDhBcnJheVtpbmRleCArIDJdIDtcblx0XHRcdFx0XHRpZiAoICggc2Vjb25kQnl0ZSYwYjExMDBfMDAwMCApPT09MGIxMDAwXzAwMDAgJiYgKCB0aGlyZEJ5dGUmMGIxMTAwXzAwMDAgKT09PTBiMTAwMF8wMDAwICkge1xuXHRcdFx0XHRcdFx0Y29kZVBvaW50ID0gKCBjb2RlUG9pbnQmMGIwMDAwXzExMTEgKTw8MTJ8KCBzZWNvbmRCeXRlJjBiMDAxMV8xMTExICk8PDZ8KCB0aGlyZEJ5dGUmMGIwMDExXzExMTEgKTtcblx0XHRcdFx0XHRcdGlmICggKCBjb2RlUG9pbnQ8MHhEODAwID8gMHgwN0ZGIDogMHhERkZGICk8Y29kZVBvaW50ICkge1xuXHRcdFx0XHRcdFx0XHRzdHJpbmdBcnJheVtzdHJpbmdBcnJheV9sZW5ndGgrK10gPSBmcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0XHRcdFx0XHRcdFx0aW5kZXggKz0gMztcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBpbmRleDxsZW5ndGhfMyApIHtcblx0XHRcdFx0XHRjb25zdCBzZWNvbmRCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgMV0gO1xuXHRcdFx0XHRcdGNvbnN0IHRoaXJkQnl0ZSAgICAgICAgID0gdWludDhBcnJheVtpbmRleCArIDJdIDtcblx0XHRcdFx0XHRjb25zdCBmb3VydGhCeXRlICAgICAgICAgPSB1aW50OEFycmF5W2luZGV4ICsgM10gO1xuXHRcdFx0XHRcdGlmICggKCBzZWNvbmRCeXRlJjBiMTEwMF8wMDAwICk9PT0wYjEwMDBfMDAwMCAmJiAoIHRoaXJkQnl0ZSYwYjExMDBfMDAwMCApPT09MGIxMDAwXzAwMDAgJiYgKCBmb3VydGhCeXRlJjBiMTEwMF8wMDAwICk9PT0wYjEwMDBfMDAwMCApIHtcblx0XHRcdFx0XHRcdGNvZGVQb2ludCA9ICggY29kZVBvaW50JjBiMDAwMF8xMTExICk8PDE4fCggc2Vjb25kQnl0ZSYwYjAwMTFfMTExMSApPDwxMnwoIHRoaXJkQnl0ZSYwYjAwMTFfMTExMSApPDw2fCggZm91cnRoQnl0ZSYwYjAwMTFfMTExMSApO1xuXHRcdFx0XHRcdFx0aWYgKCAweEZGRkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweDExXzAwMDAgKSB7XG5cdFx0XHRcdFx0XHRcdHN0cmluZ0FycmF5W3N0cmluZ0FycmF5X2xlbmd0aCsrXSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRcdFx0aW5kZXggKz0gNDtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBFcnJvcihtZXNzYWdlKTtcblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApO1xuXHRcdGNvbnN0IHN0cmluZyA9IHN0cmluZ0FycmF5LmpvaW4oJycpO1xuXHRcdHJldHVybiBzdHJpbmdbMF09PT0nXFx1RkVGRicgPyBzdHJpbmcuc2xpY2UoMSkgOiBzdHJpbmc7XG5cdH07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBjbGVhclJlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgUm9vdCBmcm9tICcuL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgaXNBcnJheUJ1ZmZlckxpa2UsIGFycmF5QnVmZmVyTGlrZTJzdHJpbmcgfSBmcm9tICcuLi9VVEY4JztcblxuY29uc3QgeyB0ZXN0OiBJU19OT05fU0NBTEFSIH0gPSB0aGVSZWdFeHAoL1tcXHVEODAwLVxcdURGRkZdL3UpO1xuXG5sZXQgaG9sZGluZyAgICAgICAgICA9IGZhbHNlO1xuXG5jb25zdCBwYXJzZSA9IChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0aWYgKCBob2xkaW5nICkgeyB0aHJvdyBFcnJvcigncGFyc2UgZHVyaW5nIHBhcnNpbmcuJyk7IH1cblx0aG9sZGluZyA9IHRydWU7XG5cdGxldCByb290VGFibGUgICAgICAgO1xuXHRsZXQgcHJvY2VzcyAgICAgICAgICAgICAgICAgO1xuXHR0cnkge1xuXHRcdGxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcblx0XHRpZiAoIHR5cGVvZiBzb3VyY2U9PT0nb2JqZWN0JyAmJiBzb3VyY2UgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlCdWZmZXJMaWtlKHNvdXJjZSkgKSB7IHNvdXJjZSA9IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcoc291cmNlKTsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHNvdXJjZVBhdGggPSBzb3VyY2UucGF0aDtcblx0XHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlLnBhdGgpJyk7IH1cblx0XHRcdFx0Y29uc3QgeyBkYXRhLCByZXF1aXJlOiByZXEgPSB0eXBlb2YgcmVxdWlyZT09PSdmdW5jdGlvbicgPyByZXF1aXJlIDogdW5kZWZpbmVkIH0gPSBzb3VyY2U7XG5cdFx0XHRcdGlmICggcmVxICkge1xuXHRcdFx0XHRcdGNvbnN0IGRpcm5hbWVfID0gcmVxLnJlc29sdmU/LnBhdGhzPy4oJycpPy5bMF0/LnJlcGxhY2UoL25vZGVfbW9kdWxlcyQvLCAnJyk7XG5cdFx0XHRcdFx0aWYgKCBkaXJuYW1lXyApIHtcblx0XHRcdFx0XHRcdHNvdXJjZVBhdGggPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ3BhdGgnKS5yZXNvbHZlKGRpcm5hbWVfLCBzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdwYXRoJykucmVzb2x2ZSlgKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gKCByZXEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ2ZzJykucmVhZEZpbGVTeW5jKHNvdXJjZVBhdGgpO1xuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNBcnJheUJ1ZmZlckxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKWApOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0FycmF5QnVmZmVyTGlrZShkYXRhKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YXxzb3VyY2UucmVxdWlyZSknKTsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0FycmF5QnVmZmVyTGlrZShkYXRhKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlKScpOyB9XG5cdFx0dHJ5IHtcblx0XHRcdGlmICggSVNfTk9OX1NDQUxBUihzb3VyY2UpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVuY291cGxlZCBVQ1MtNCBjaGFyYWN0ZXIgY29kZS4nKTsgfVxuXHRcdFx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J29iamVjdCcgJiYgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICkge1xuXHRcdFx0XHRpZiAoIHVzZUJpZ0ludCE9PXVuZGVmaW5lZCB8fCB4T3B0aW9ucyE9PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKCdvcHRpb25zIG1vZGUgPyBhcmdzIG1vZGUnKTsgfVxuXHRcdFx0XHRsZXQgam9pbmVyICAgICAgICAgICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ2pvaW5lcicpICkgeyBqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuam9pbmVyOyB9XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ2JpZ2ludCcpICkgeyB1c2VCaWdJbnQgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuYmlnaW50OyB9XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ3gnKSApIHsgeE9wdGlvbnMgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIueDsgfVxuXHRcdFx0XHRtdWx0aWxpbmVTdHJpbmdKb2luZXIgPSBqb2luZXI7XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdFx0aXRlcmF0b3IudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNvdXJjZSAmJiBzb3VyY2VbMF09PT0nXFx1RkVGRicgJiYgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVE9NTCBjb250ZW50IChzdHJpbmcpIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBCT00gKFUrRkVGRilgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRcdFx0XHRwcm9jZXNzID0gb3B0aW9ucy5Qcm9jZXNzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZmluYWxseSB7IGl0ZXJhdG9yLmRvbmUoKTsgfS8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxseSB7IG9wdGlvbnMuY2xlYXIoKTsgfVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxuXHR9XG5cdGZpbmFsbHkgeyBob2xkaW5nID0gZmFsc2U7IH1cblx0cHJvY2Vzcz8uKCk7XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovYXNzaWduKFxuXHQoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBzcGVjaWZpY2F0aW9uVmVyc2lvbj09PSdudW1iZXInXG5cdFx0XHQ/IHBhcnNlKHNvdXJjZSwgc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucylcblx0XHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgIClcblx0LFxuXHR7XG5cdFx0JzEuMCc6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDEuMDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjQ6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC40LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjE6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHR9XG4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdCAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEVTQ0FQRUQgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKHtcblx0Li4uLyojX19QVVJFX18qL2Zyb21FbnRyaWVzKC8qI19fUFVSRV9fKi9bIC4uLkFycmF5KDB4MjApIF0ubWFwKChfLCBjaGFyQ29kZSkgPT4gWyBmcm9tQ2hhckNvZGUoY2hhckNvZGUpLCAnXFxcXHUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKSBdKSksXG5cdCdcXGInOiAnXFxcXGInLFxuXHQnXFx0JzogJ1xcXFx0Jyxcblx0J1xcbic6ICdcXFxcbicsXG5cdCdcXGYnOiAnXFxcXGYnLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1wiJzogJ1xcXFxcIicsXG5cdCdcIlwiXCInOiAnXCJcIlxcXFxcIicsXG5cdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0J1xceDdGJzogJ1xcXFx1MDA3RicsXG59KTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXltcXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdLyk7XG5leHBvcnQgY29uc3Qgc2luZ2xlbGluZVN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIE5FRURfQkFTSUModmFsdWUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xufTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lQmFzaWNTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYFwiXCJgO1xufTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9CQVNJQyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxceDdGXXwnJycvKTtcbmV4cG9ydCBjb25zdCB7IHRlc3Q6IG11bHRpbGluZU5lZWRCYXNpYyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXXwnJycvKTtcbmNvbnN0IHsgdGVzdDogUkVBTF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL14oPzpbXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiKS8pO1xuY29uc3QgZXNjYXBlX211bHRpbGluZSA9IChsaW5lcyAgICAgICAgICAsIGxpbmVJbmRleCAgICAgICAgKSA9PiB7XG5cdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdIDtcblx0aWYgKCBSRUFMX01VTFRJTElORV9FU0NBUEUobGluZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSBsaW5lLm1hdGNoKEJZX01VTFRJTElORV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdGxpbmVzW2xpbmVJbmRleF0gPSBwYXJ0cy5qb2luKCcnKTtcblx0fVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IExpbmVzID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+ICggbGluZXMgPSBbICcnLCAuLi5saW5lcyBdICAgICAgICAgICkubGVuZ3RoPT09MSA/IFsgJycsICcnIF0gOiBsaW5lcyAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZVN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGFzdEluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0bGV0IGluZGV4ID0gbGFzdEluZGV4O1xuXHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfQkFTSUMobGluZXNbaW5kZXhdICkgKSB7IGJyZWFrOyB9IH1cblx0d2hpbGUgKCAtLWluZGV4ICk7XG5cdGlmICggaW5kZXggKSB7XG5cdFx0aW5kZXggPSBsYXN0SW5kZXg7XG5cdFx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRcdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHRcdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdH1cblx0ZWxzZXsgbGluZXNbbGFzdEluZGV4XSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElOVEVHRVJfTElLRSB9ID0gdGhlUmVnRXhwKC9eLT9cXGQrJC8pO1xuY29uc3QgZW5zdXJlRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBJTlRFR0VSX0xJS0UobGl0ZXJhbCkgPyBsaXRlcmFsICsgJy4wJyA6IGxpdGVyYWw7XG5cbmV4cG9ydCBjb25zdCBmbG9hdCA9ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHQ/IHZhbHVlPT09SW5maW5pdHkgPyAnaW5mJyA6IHZhbHVlPT09X0luZmluaXR5ID8gJy1pbmYnIDogZW5zdXJlRmxvYXQoJycgKyB2YWx1ZSlcblx0OiB2YWx1ZT09PXZhbHVlID8gaXModmFsdWUsIDApID8gJzAuMCcgOiAnLTAuMCcgOiAnbmFuJztcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgREFURSBmcm9tICcuRGF0ZS5wcm90b3R5cGUnO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuY2xhc3MuaXNTdHJpbmcnO1xuaW1wb3J0IGlzTnVtYmVyIGZyb20gJy5jbGFzcy5pc051bWJlcic7XG5pbXBvcnQgaXNCaWdJbnQgZnJvbSAnLmNsYXNzLmlzQmlnSW50JztcbmltcG9ydCBpc0Jvb2xlYW4gZnJvbSAnLmNsYXNzLmlzQm9vbGVhbic7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yVGhpcywgZ2V0Q09NTUVOVCwgZ2V0Q29tbWVudCB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgc2luZ2xlbGluZVN0cmluZyB9IGZyb20gJy4vc3RyaW5nJztcbmltcG9ydCB7IGZsb2F0IH0gZnJvbSAnLi9mbG9hdCc7XG5pbXBvcnQgeyBpc1NlY3Rpb24sIG9mSW5saW5lIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgX2xpdGVyYWwgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcblxuY29uc3QgaXNEYXRlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChEQVRFKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBCQVJFIH0gPSB0aGVSZWdFeHAoL15bXFx3LV0rJC8pO1xuY29uc3QgJEtleSQgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gQkFSRShrZXkpID8ga2V5IDogc2luZ2xlbGluZVN0cmluZyhrZXkpO1xuXG5jb25zdCBGSVJTVCA9IC9bXi5dKy87XG5jb25zdCBsaXRlcmFsU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgID0+IGAnJHt2YWx1ZX0nYDtcbmNvbnN0ICRLZXlzID0gKGtleXMgICAgICAgICkgICAgICAgICA9PiByZWdleHBzLmlzQW1hemluZyhrZXlzKSA/IGtleXMucmVwbGFjZShGSVJTVCwgbGl0ZXJhbFN0cmluZykgOiBrZXlzPT09J251bGwnID8gYCdudWxsJ2AgOiBrZXlzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MU2VjdGlvbiBleHRlbmRzIEFycmF5ICAgICAgICAge1xuXHRcblx0ICAgICAgICAgICAgICAgICBkb2N1bWVudCAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKGRvY3VtZW50ICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgeyByZXR1cm4gdGhpcy5qb2luKHRoaXMuZG9jdW1lbnQubmV3bGluZSk7IH1cblx0XG5cdGFwcGVuZE5ld2xpbmUgKCkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9ICcnOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZExpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gc291cmNlOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZTsgfSAgIFxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmVJZiAoc291cmNlICAgICAgICApIHsgc291cmNlICYmICggdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZSApOyB9Ly8vXG5cdFxuXHQqIGFzc2lnbkJsb2NrICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50S2V5c18gICAgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5c18gICAgICAgICAgICAgICAgICAsIHRhYmxlICAgLCB0YWJsZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICB7XG5cdFx0Y29uc3QgeyBkb2N1bWVudCB9ID0gdGhpcztcblx0XHRjb25zdCB7IG5ld2xpbmVVbmRlckhlYWRlciwgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgfSA9IGRvY3VtZW50O1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlckRvdHRlZCA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgOiBmYWxzZTtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJQYWlyID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyRG90dGVkIDogZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpcjtcblx0XHRmb3IgKCBjb25zdCB0YWJsZUtleSBvZiB0YWJsZUtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSB0YWJsZVt0YWJsZUtleV0gO1xuXHRcdFx0Y29uc3QgJGtleSQgPSAkS2V5JCh0YWJsZUtleSk7XG5cdFx0XHRjb25zdCBkb2N1bWVudEtleXMgPSBkb2N1bWVudEtleXNfICsgJGtleSQ7XG5cdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gdmFsdWU7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGxldCBmaXJzdEl0ZW0gPSB2YWx1ZVswXTtcblx0XHRcdFx0XHRpZiAoIGlzU2VjdGlvbihmaXJzdEl0ZW0pICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGFibGVIZWFkZXIgPSBgW1ske2RvY3VtZW50S2V5c31dXWAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRjb25zdCBkb2N1bWVudEtleXNfID0gZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgIDtcblx0XHRcdFx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRsZXQgdGFibGUgICAgICAgICAgICAgICAgID0gZmlyc3RJdGVtO1xuXHRcdFx0XHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRzZWN0aW9uWzBdID0gdGFibGVIZWFkZXIgKyBnZXRDT01NRU5UKHRhYmxlLCBjb21tZW50Rm9yVGhpcyk7XG5cdFx0XHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggKytpbmRleD09PWxlbmd0aCApIHsgYnJlYWs7IH1cblx0XHRcdFx0XHRcdFx0dGFibGUgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtpbmRleF0gO1xuXHRcdFx0XHRcdFx0XHRpZiAoICFpc1NlY3Rpb24odGFibGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSBmaXJzdCB0YWJsZSBpdGVtIG1hcmtlZCBieSBTZWN0aW9uKCkgbWVhbnMgdGhlIHBhcmVudCBhcnJheSBpcyBhbiBhcnJheSBvZiB0YWJsZXMsIHdoaWNoIGNhbiBub3QgaW5jbHVkZSBvdGhlciB0eXBlcyBvciB0YWJsZSBub3QgbWFya2VkIGJ5IFNlY3Rpb24oKSBhbnkgbW9yZSBpbiB0aGUgcmVzdCBpdGVtc2ApOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IGxldCBpbmRleCA9IDE7IHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IGlmICggaXNTZWN0aW9uKHZhbHVlW2luZGV4KytdICkgKSB7IHRocm93IFR5cGVFcnJvcihgaWYgYW4gYXJyYXkgaXMgbm90IGFycmF5IG9mIHRhYmxlcywgaXQgY2FuIG5vdCBpbmNsdWRlIGFueSB0YWJsZSB0aGF0IG1hcmtlZCBieSBTZWN0aW9uKClgKTsgfSB9IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggaXNTZWN0aW9uKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdHNlY3Rpb25bMF0gPSBgWyR7ZG9jdW1lbnRLZXlzfV0ke1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucHJlZmVyQ29tbWVudEZvclRoaXNcblx0XHRcdFx0XHRcdFx0PyBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcykgfHwgZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpXG5cdFx0XHRcdFx0XHRcdDogZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpIHx8IGdldENPTU1FTlQodmFsdWUsIGNvbW1lbnRGb3JUaGlzKVxuXHRcdFx0XHRcdH1gO1xuXHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZWN0aW9uS2V5cyA9IHNlY3Rpb25LZXlzXyArICRrZXkkO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gJEtleXMoc2VjdGlvbktleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoJycsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdC0tdGhpcy5sZW5ndGg7XG5cdFx0XHRcdHlpZWxkIHRoaXMuYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlckRvdHRlZCAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJQYWlyICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0ICAgICAgICB2YWx1ZSAoaW5kZW50ICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICwgcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgICAgICAgICApICAgICAgICAgICAgICAgICAge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGlmICggdmFsdWU9PT1udWxsICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5kb2N1bWVudC5udWxsRGlzYWJsZWQgKSB7IHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIm51bGxcIiB0eXBlIHZhbHVlIHdpdGhvdXQgdHJ1dGh5IG9wdGlvbnMueE51bGxgKTsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ251bGwnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IGlubGluZU1vZGUgPSBvZklubGluZSh2YWx1ZSk7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZT09PXVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0PyB0aGlzLnN0YXRpY0FycmF5KGluZGVudCwgdmFsdWUpXG5cdFx0XHRcdFx0XHQ6IHRoaXMuc2luZ2xlbGluZUFycmF5KGluZGVudCwgdmFsdWUsIHRoaXMuZG9jdW1lbnQuJHNpbmdsZWxpbmVBcnJheSA/PyBpbmxpbmVNb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlubGluZU1vZGUhPT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZSB8fCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlRGlzYWJsZWRcblx0XHRcdFx0XHRcdD8gdGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHRcdFx0XHRcdFx0OiB0aGlzLm11bHRpbGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVDb21tYSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc0RhdGUodmFsdWUpICkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdGhpcy5kb2N1bWVudC5fID8gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgJyAnKSA6IHZhbHVlLnRvSVNPU3RyaW5nKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBfbGl0ZXJhbCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRjb25zdCBsaXRlcmFsID0gKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtfbGl0ZXJhbF07XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgbGl0ZXJhbD09PSdzdHJpbmcnICkgeyB0aGlzLmFwcGVuZElubGluZSA9IGxpdGVyYWw7IH1cblx0XHRcdFx0XHRlbHNlIGlmICggaXNBcnJheShsaXRlcmFsKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBsaXRlcmFsO1xuXHRcdFx0XHRcdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gbGl0ZXJhbFswXTtcblx0XHRcdFx0XHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHsgdGhpcy5hcHBlbmRMaW5lID0gbGl0ZXJhbFtpbmRleCsrXSA7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYGxpdGVyYWwgdmFsdWUgaXMgYnJva2VuYCk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgbGl0ZXJhbCB2YWx1ZSBpcyBicm9rZW5gKTsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaXNTdHJpbmcodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBTdHJpbmddYCk7IH1cblx0XHRcdFx0aWYgKCBpc051bWJlcih2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IE51bWJlcl1gKTsgfVxuXHRcdFx0XHRpZiAoIGlzQmlnSW50KHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgQmlnSW50XWApOyB9XG5cdFx0XHRcdGlmICggaXNCb29sZWFuKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgQm9vbGVhbl1gKTsgfVxuXHRcdFx0XHRpZiAoIHJldHVyblZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHRcdGNvbnN0IGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XHRpZiAoIGtleXMubGVuZ3RoICkgeyByZXR1cm4ga2V5czsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2JpZ2ludCc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJycgKyB2YWx1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHRoaXMuZG9jdW1lbnQuYXNJbnRlZ2VyKHZhbHVlKSA/IGlzKHZhbHVlLCAtMCkgPyAnLTAnIDogJycgKyB2YWx1ZSA6IGZsb2F0KHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHNpbmdsZWxpbmVTdHJpbmcodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCIke3R5cGVvZiB2YWx1ZX1cIiB0eXBlIHZhbHVlYCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdFxuXHQgICAgICAgIHNpbmdsZWxpbmVBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICwgaW5saW5lTW9kZSAgICAgICAgICAgICAgICkge1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjEwID8gJ1sgJyA6ICdbJztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50LCBzdGF0aWNBcnJheVswXSAsIGZhbHNlKTtcblx0XHRcdGxldCBpbmRleCA9IDE7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcsICc7XG5cdFx0XHRcdHRoaXMudmFsdWUoaW5kZW50LCBzdGF0aWNBcnJheVtpbmRleCsrXSAsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjEwID8gJyBdJyA6ICddJztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjAxID8gJ1sgXScgOiAnW10nOyB9XG5cdH1cblx0ICAgICAgICBzdGF0aWNBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ1snO1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0gc3RhdGljQXJyYXk7XG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50Xztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50Xywgc3RhdGljQXJyYXlbaW5kZXgrK10gLCBmYWxzZSk7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcsJztcblx0XHR9XG5cdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50ICsgJ10nO1xuXHR9XG5cdFxuXHQgICAgICAgIGlubGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoaW5saW5lVGFibGUpO1xuXHRcdGlmICgga2V5cy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7ICc7XG5cdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwga2V5cyk7XG5cdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC0yKSArICcgfSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nOyB9XG5cdH1cblx0ICAgICAgICBtdWx0aWxpbmVUYWJsZSAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICApIHtcblx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7Jztcblx0XHR0aGlzLmFzc2lnbk11bHRpbGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwgZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSksIGNvbW1hKTtcblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnfSc7XG5cdH1cblx0ICAgICAgICBhc3NpZ25JbmxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHRjb25zdCBiZWZvcmVfdmFsdWUgPSB0aGlzLmFwcGVuZElubGluZSA9ICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoaW5kZW50LCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC1iZWZvcmVfdmFsdWUubGVuZ3RoKTtcblx0XHRcdFx0dGhpcy5hc3NpZ25JbmxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICcsICc7IH1cblx0XHR9XG5cdH1cblx0ICAgICAgICBhc3NpZ25NdWx0aWxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICkge1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudF8gKyAkS2V5cyhrZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKGluZGVudF8sIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdC0tdGhpcy5sZW5ndGg7XG5cdFx0XHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIGtleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSwgY29tbWEpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbW1hXG5cdFx0XHRcdFx0PyB0aGlzLmFwcGVuZElubGluZSA9ICcsJyArIGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSlcblx0XHRcdFx0XHQ6IHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgTUFYX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IFRPTUxTZWN0aW9uIGZyb20gJy4vc2VjdGlvbic7XG5cbmNvbnN0IG5hbWUyY29kZSA9IC8qI19fUFVSRV9fKi9OdWxsKHtcblx0ZG9jdW1lbnQ6IDAsXG5cdHNlY3Rpb246IDEsXG5cdGhlYWRlcjogMixcblx0cGFpcnM6IDMsXG5cdHBhaXI6IDQsXG59ICAgICAgICAgKTtcblxuY29uc3QgeyB0ZXN0OiBJU19JTkRFTlQgfSA9IHRoZVJlZ0V4cCgvXltcXHQgXSokLyk7XG5cbmNvbnN0IHJldHVybl9mYWxzZSA9ICgpID0+IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MRG9jdW1lbnQgZXh0ZW5kcyBBcnJheSAgICAgICAgICAgICAge1xuXHRcblx0ICAgICAgICAgZ2V0IFsnY29uc3RydWN0b3InXSAoKSB7IHJldHVybiBBcnJheTsgfVxuXHRcblx0MCA9IG5ldyBUT01MU2VjdGlvbih0aGlzKTtcblx0XG5cdCAgICAgICAgIGFzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICBuZXdsaW5lICAgICAgICAgICAgICAgICAgICAgPSAnJztcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbiAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckhlYWRlciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgO1xuXHQgICAgICAgICBpbmRlbnQgICAgICAgIDtcblx0ICAgICAgICAgXyAgICAgICAgIDtcblx0ICAgICAgICAgbnVsbERpc2FibGVkICAgICAgICAgO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZURpc2FibGVkICAgICAgICAgO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZUNvbW1hICAgICAgICAgO1xuXHQgICAgICAgICBwcmVmZXJDb21tZW50Rm9yVGhpcyAgICAgICAgICA9IGZhbHNlO1xuXHQgICAgICAgICAkc2luZ2xlbGluZUFycmF5ICAgICAgICAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBpbnRlZ2VyID0gb3B0aW9ucz8uaW50ZWdlcjtcblx0XHRpZiAoIGludGVnZXI9PT11bmRlZmluZWQgKSB7IHRoaXMuYXNJbnRlZ2VyID0gcmV0dXJuX2ZhbHNlOyB9XG5cdFx0ZWxzZSBpZiAoIGludGVnZXI9PT1NQVhfU0FGRV9JTlRFR0VSICkgeyB0aGlzLmFzSW50ZWdlciA9IGlzU2FmZUludGVnZXI7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIGludGVnZXI9PT0nbnVtYmVyJyApIHtcblx0XHRcdGlmICggIWlzU2FmZUludGVnZXIoaW50ZWdlcikgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW50ZWdlcn0pIGNhbiBvbmx5IGJlIGEgc2FmZSBpbnRlZ2VyYCk7IH1cblx0XHRcdGNvbnN0IG1heCA9IGludGVnZXI+PTAgPyBpbnRlZ2VyIDogLWludGVnZXIgLSAxO1xuXHRcdFx0Y29uc3QgbWluID0gaW50ZWdlcj49MCA/IC1pbnRlZ2VyIDogaW50ZWdlcjtcblx0XHRcdHRoaXMuYXNJbnRlZ2VyID0gKG51bWJlciAgICAgICAgKSA9PiBpc1NhZmVJbnRlZ2VyKG51bWJlcikgJiYgbWluPD1udW1iZXIgJiYgbnVtYmVyPD1tYXg7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW50ZWdlcn0pIGNhbiBvbmx5IGJlIG51bWJlcmApOyB9XG5cdFx0Y29uc3QgbmV3bGluZSA9IG9wdGlvbnM/Lm5ld2xpbmU7XG5cdFx0aWYgKCBuZXdsaW5lPT09dW5kZWZpbmVkICkgeyB0aGlzLm5ld2xpbmUgPSAnJzsgfVxuXHRcdGVsc2UgaWYgKCBuZXdsaW5lPT09J1xcbicgfHwgbmV3bGluZT09PSdcXHJcXG4nICkgeyB0aGlzLm5ld2xpbmUgPSBuZXdsaW5lOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyB0eXBlb2YgbmV3bGluZT09PSdzdHJpbmcnXG5cdFx0XHRcdD8gU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZX0pIGNhbiBvbmx5IGJlIHZhbGlkIFRPTUwgbmV3bGluZWApXG5cdFx0XHRcdDogVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSBzdHJpbmdgKTtcblx0XHR9XG5cdFx0Y29uc3QgcHJlZmVyQ29tbWVudEZvciA9IG9wdGlvbnM/LnByZWZlckNvbW1lbnRGb3I7XG5cdFx0aWYgKCBwcmVmZXJDb21tZW50Rm9yPT09dW5kZWZpbmVkIHx8IHByZWZlckNvbW1lbnRGb3I9PT0na2V5JyApIHt9XG5cdFx0ZWxzZSBpZiAoIHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcycgKSB7IHRoaXMucHJlZmVyQ29tbWVudEZvclRoaXMgPSB0cnVlOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtwcmVmZXJDb21tZW50Rm9yKSBjYW4gb25seSBiZSAna2V5JyBvciAndGhpcydgKTsgfVxuXHRcdGNvbnN0IGFyb3VuZCA9IG5hbWUyY29kZVtvcHRpb25zPy5uZXdsaW5lQXJvdW5kID8/ICdoZWFkZXInXSA/PyBuYW1lMmNvZGUuaGVhZGVyO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0Y29uc3QgaW5kZW50ID0gb3B0aW9ucz8uaW5kZW50O1xuXHRcdGlmICggaW5kZW50PT09dW5kZWZpbmVkICkgeyB0aGlzLmluZGVudCA9ICdcXHQnOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nc3RyaW5nJyApIHtcblx0XHRcdGlmICggIUlTX0lOREVOVChpbmRlbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gb25seSBpbmNsdWRlIFRhYiBvciBTcGFjZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9IGluZGVudDtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nbnVtYmVyJyApIHtcblx0XHRcdGlmICggIWlzU2FmZUludGVnZXIoaW5kZW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnQ6JHtpbmRlbnR9fSkgaXMgb3V0IG9mIHJhbmdlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gJyAnLnJlcGVhdChpbmRlbnQpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBub3QgYmUgXCIke3R5cGVvZiBpbmRlbnR9XCIgdHlwZWApOyB9XG5cdFx0dGhpcy5fID0gb3B0aW9ucz8uVD09PScgJztcblx0XHR0aGlzLm51bGxEaXNhYmxlZCA9ICFvcHRpb25zPy54TnVsbDtcblx0XHRjb25zdCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGUgPSBvcHRpb25zPy54QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU7XG5cdFx0aWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nJyApIHtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZUNvbW1hID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nLCcgKSB7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlRGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdGNvbnN0ICRzaW5nbGVsaW5lQXJyYXkgPSBvcHRpb25zPy5mb3JjZUlubGluZUFycmF5U3BhY2luZztcblx0XHRzd2l0Y2ggKCAkc2luZ2xlbGluZUFycmF5ICkge1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHR0aGlzLiRzaW5nbGVsaW5lQXJyYXkgPSAkc2luZ2xlbGluZUFycmF5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IHR5cGVvZiAkc2luZ2xlbGluZUFycmF5PT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAkeyRzaW5nbGVsaW5lQXJyYXl9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHskc2luZ2xlbGluZUFycmF5PT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgJHNpbmdsZWxpbmVBcnJheX1gKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGFwcGVuZFNlY3Rpb24gKCkgeyByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aF0gPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7IH1cblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB4IH0gZnJvbSAnLi4vai1sZXhlcic7Ly8vIGV4dGVybmFsXG5cbmltcG9ydCBUT01MRG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCc7XG5leHBvcnQgZGVmYXVsdCAocm9vdFRhYmxlICAgICAgICAgICAgICAgICwgb3B0aW9ucyAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZG9jdW1lbnQgPSBuZXcgVE9NTERvY3VtZW50KG9wdGlvbnMpO1xuXHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnRbMF07XG5cdHNlY3Rpb25bMF0gPSAnJztcblx0eCAgICAgIChzZWN0aW9uLmFzc2lnbkJsb2NrKGBgLCBgYCwgcm9vdFRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHJvb3RUYWJsZSkpKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0xICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uIHx8IGRvY3VtZW50W2RvY3VtZW50Lmxlbmd0aCAtIDFdIC5hcHBlbmROZXdsaW5lKCk7XG5cdHJldHVybiBkb2N1bWVudC5uZXdsaW5lID8gZG9jdW1lbnQuam9pbihkb2N1bWVudC5uZXdsaW5lKSA6IGRvY3VtZW50LmZsYXQoKTtcbn07XG5cbmV4cG9ydCB7IGlubGluZSwgU2VjdGlvbiB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmV4cG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBtdWx0aWxpbmVUYWJsZSwgbXVsdGlsaW5lQXJyYXkgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBzaW5nbGVsaW5lQmFzaWNTdHJpbmcsIExpbmVzLCBtdWx0aWxpbmVTdHJpbmcsIG11bHRpbGluZUJhc2ljU3RyaW5nLCBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nLCBtdWx0aWxpbmVOZWVkQmFzaWMgfSBmcm9tICcuL3N0cmluZyc7XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBtdWx0aWxpbmUgPSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyA/IExpdGVyYWxPYmplY3QoKCBtdWx0aWxpbmVOZWVkQmFzaWModmFsdWUpID8gbXVsdGlsaW5lQmFzaWNTdHJpbmcgOiBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nICkoKCAnXFxuJyArIHZhbHVlICkuc3BsaXQoJ1xcbicpICAgICAgICAgKSwgdmFsdWUpIDpcblx0XHRcdGlzQXJyYXkodmFsdWUpID8gTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVTdHJpbmcoTGluZXModmFsdWUpKSwgdHlwZW9mIHN0cmluZz09PSdzdHJpbmcnID8gc3RyaW5nIDogTnVsbChudWxsKSkgOlxuXHRcdFx0XHRtdWx0aWxpbmVUYWJsZSh2YWx1ZSk7XG5cdG11bHRpbGluZS5iYXNpYyA9IChsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgbGluZXM9PT0nc3RyaW5nJ1xuXHRcdFx0PyBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKCggJ1xcbicgKyBsaW5lcyApLnNwbGl0KCdcXG4nKSAgICAgICAgICksIGxpbmVzKVxuXHRcdFx0OiBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKExpbmVzKGxpbmVzKSksIHR5cGVvZiBzdHJpbmc9PT0nc3RyaW5nJyA/IHN0cmluZyA6IE51bGwobnVsbCkpXG5cdDtcblx0bXVsdGlsaW5lLmFycmF5ID0gbXVsdGlsaW5lQXJyYXk7XG5cdGZyZWV6ZShtdWx0aWxpbmUpO1xuXHRyZXR1cm4gbXVsdGlsaW5lO1xufSApKCk7XG5leHBvcnQgY29uc3QgYmFzaWMgPSAodmFsdWUgICAgICAgICkgPT4gTGl0ZXJhbE9iamVjdChzaW5nbGVsaW5lQmFzaWNTdHJpbmcodmFsdWUpLCB2YWx1ZSk7XG5leHBvcnQgY29uc3QgbGl0ZXJhbCA9IChsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLi4uY2hhcnMgICAgICAgICAgKSA9PiB7XG5cdGlmICggdHlwZW9mIGxpdGVyYWw9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGNoYXJzLmxlbmd0aD09PTEgKSB7XG5cdFx0XHRyZXR1cm4gTGl0ZXJhbE9iamVjdChsaXRlcmFsLmluY2x1ZGVzKCdcXG4nKSA/IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbGl0ZXJhbCwgY2hhcnNbMF0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGV0IGluZGV4ID0gY2hhcnMubGVuZ3RoO1xuXHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRjb25zdCB7IHJhdyB9ID0gbGl0ZXJhbDtcblx0XHRcdGxpdGVyYWwgPSByYXdbaW5kZXhdIDtcblx0XHRcdHdoaWxlICggaW5kZXggKSB7IGNoYXJzWy0taW5kZXhdICs9IHJhd1tpbmRleF0gOyB9XG5cdFx0XHRsaXRlcmFsID0gY2hhcnMuam9pbignJykgKyBsaXRlcmFsO1xuXHRcdH1cblx0XHRlbHNlIHsgbGl0ZXJhbCA9IGxpdGVyYWwucmF3WzBdIDsgfVxuXHR9XG5cdHJldHVybiBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuaW5jbHVkZXMoJ1xcbicpID8gbGl0ZXJhbC5zcGxpdCgnXFxuJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsaXRlcmFsLCBOdWxsKG51bGwpKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZS8nO1xuaW1wb3J0IHN0cmluZ2lmeSwgeyBTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwgfSBmcm9tICcuL3N0cmluZ2lmeS8nO1xuaW1wb3J0IHsgT2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lIH0gZnJvbSAnLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBpc0lubGluZSwgaXNTZWN0aW9uIH0gZnJvbSAnLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyB9IGZyb20gJy4vdHlwZXMvY29tbWVudCc7XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcblx0U2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsLCBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyxcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxuXHRpc0lubGluZSwgaXNTZWN0aW9uLFxufSk7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCwgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMsXG5cdE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSxcblx0aXNJbmxpbmUsIGlzU2VjdGlvbixcbn07XG4iXSwibmFtZXMiOlsiUHJveHkiLCJPYmplY3RfZnJlZXplIiwiaXNBcnJheSIsInVuZGVmaW5lZCIsInNldF9oYXMiLCJzZXRfYWRkIiwiZGVsIiwiTnVsbCIsIm9yZGVyaWZ5X051bGwiLCJpdGVyYXRvci50aHJvd3MiLCJpdGVyYXRvci53aGVyZSIsImdldCIsInNldCIsImNyZWF0ZSIsInJlZ2V4cHMuc3dpdGNoUmVnRXhwIiwiT2JqZWN0IiwiZnJlZXplIiwib3duS2V5cyIsIm9wdGlvbnMuemVyb0RhdGV0aW1lIiwicGFyc2UiLCJvcHRpb25zLm11c3RTY2FsYXIiLCJpdGVyYXRvci5saW5lSW5kZXgiLCJvcHRpb25zLmFsbG93TG9uZ2VyIiwib3B0aW9ucy51c2luZ0JpZ0ludCIsIm9wdGlvbnMuSW50ZWdlck1pbk51bWJlciIsIm9wdGlvbnMuSW50ZWdlck1heE51bWJlciIsIl9JbmZpbml0eSIsIm9wdGlvbnMuc0Zsb2F0IiwiTmFOIiwib3B0aW9ucy5zRXJyb3IiLCJvcHRpb25zLlRhYmxlIiwib3B0aW9ucy5jb2xsZWN0IiwicmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCIsInJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyIsIm9wdGlvbnMucHJlc2VydmVMaXRlcmFsIiwicmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yLm1hcmsiLCJvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmciLCJyZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgiLCJyZWdleHBzLlBSRV9XSElURVNQQUNFIiwicmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoIiwicmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCIsInJlZ2V4cHMuX19MSVRFUkFMX0tFWV9leGVjIiwicmVnZXhwcy5fX0JBUkVfS0VZX2V4ZWMiLCJyZWdleHBzLklTX0RPVF9LRVkiLCJyZWdleHBzLkRPVF9LRVkiLCJvcHRpb25zLmRpc2FibGVEaWdpdCIsInJlZ2V4cHMuaXNBbWF6aW5nIiwib3B0aW9ucy5lbmFibGVOdWxsIiwib3B0aW9ucy5kaXNhbGxvd0VtcHR5S2V5IiwicmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucy5hc1N0cmluZ3MiLCJvcHRpb25zLmlubGluZVRhYmxlIiwib3B0aW9ucy5hc1RhYmxlcyIsIm9wdGlvbnMuYXNBcnJheXMiLCJyZWdleHBzLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMuYXNCb29sZWFucyIsIm9wdGlvbnMuYXNOdWxscyIsIm9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zLm1vcmVEYXRldGltZSIsIm9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyIsIm9wdGlvbnMuYXNMb2NhbFRpbWVzIiwib3B0aW9ucy5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zLmFzRmxvYXRzIiwib3B0aW9ucy5hc0ludGVnZXJzIiwicmVnZXhwcy5TWU1fV0hJVEVTUEFDRSIsIm9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIm9wdGlvbnMucHJlc2VydmVDb21tZW50IiwicmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyIsIml0ZXJhdG9yLnJlc3QiLCJpdGVyYXRvci5uZXh0IiwicmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzIiwib3B0aW9ucy51c2UiLCJpdGVyYXRvci50b2RvIiwib3B0aW9ucy5Qcm9jZXNzIiwiaXRlcmF0b3IuZG9uZSIsIm9wdGlvbnMuY2xlYXIiLCJjbGVhclJlZ0V4cCIsImFzc2lnbiIsImZyb21FbnRyaWVzIiwiREFURSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7Ozs7Ozs7Ozs7OztBQ0lmLElBQUksSUFBSSw2Q0FBNkMsSUFBSTtBQUNoRSxnQkFBZ0IsSUFBSSxD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LFFBQVEsQ0FBQztBQUN0TCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsV0FBVyxTQUFTLHFCQUFxQixRQUFRLHdCQUF3QixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3BMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDcEwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFdBQVcsU0FBUyxxQkFBcUIsUUFBUSx3QkFBd0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNwTCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsV0FBVyxTQUFTLHFCQUFxQixRQUFRLHdCQUF3QixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3BMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDcEwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFdBQVcsU0FBUyxxQkFBcUIsUUFBUSx3QkFBd0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNwTCxFQUFFO0FBQ0YsQ0FBQzs7QUMvRkQsTUFBTSxPQUFPLGdCQUFnQnZFLE1BQUksU0FBUztBQUMxQyxDQUFDLGdCQUFnQndFLGtCQUFXLGNB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