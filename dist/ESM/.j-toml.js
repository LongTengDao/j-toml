﻿/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.32.0
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
import BigInt from '.BigInt';
import isFinite from '.isFinite';
import Infinity from '.Infinity';
import NaN$1 from '.NaN';
import TextDecoder from '.TextDecoder';
import isView from '.ArrayBuffer.isView';
import isArrayBuffer from '.class.isArrayBuffer';
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
import DataView from '.DataView';
import Uint8Array from '.Uint8Array';
import Default from '.default';

const version = '1.32.0';

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
let IntegerMinNumber         = 0;
let IntegerMaxNumber         = 0;

              

                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
	                  
  
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
const UNDERSCORES$1 = /_/g;
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
	const number = parseInt(literal.replace(UNDERSCORES$1, ''));
	isSafeInteger(number) || throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const number         = parseInt(literal.replace(UNDERSCORES$1, ''));
	if ( IntegerMinNumber<=number && number<=IntegerMaxNumber ) { return number; }
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

const textDecoder = /*#__PURE__*/new TextDecoder('utf-8', { fatal: true, ignoreBOM: false });
const arrayBufferLike2string                                             = (arrayBufferLike                          )         => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
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
const uint8Array = new Uint8Array(8);
const dataView = new DataView(uint8Array.buffer);
const is_NaN = (value        )          => {
	dataView.setFloat64(0, value);
	return uint8Array[0]===0xFF;
};

const float = (value        ) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : is_NaN(value) ? '-nan' : 'nan';

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
	
	         asInteger                                          = return_false;
	         newline                     = '';
	         newlineUnderSection         ;
	         newlineUnderSectionButPair         ;
	         newlineUnderHeader         ;
	         newlineUnderPair         ;
	         newlineUnderPairButDotted         ;
	         newlineUnderDotted         ;
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
		
		const integer = options?.integer;
		if ( integer===undefined ) ;
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError(`TOML.stringify(,{integer}) can only be number`); }
		
		const newline = options?.newline;
		if ( newline===undefined ) ;
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		
		const preferCommentFor = options?.preferCommentFor;
		if ( preferCommentFor===undefined ) ;
		else if ( preferCommentFor==='this' || preferCommentFor==='key' ) { this.preferCommentForThis = preferCommentFor==='this'; }
		else { throw TypeError(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
		
		const around = name2code[options?.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		
		const indent = options?.indent;
		if ( indent===undefined ) ;
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		
		const T = options?.T;
		if ( T===undefined ) ;
		else if ( T===' ' || T==='t' || T==='T' ) { this.T = T; }
		else { throw TypeError(`TOML.stringify(,{T}) can only be "T" or " " or "t"`); }
		
		const Z = options?.Z;
		if ( Z===undefined ) ;
		else if ( Z==='z' || Z==='Z' ) { this.Z = Z; }
		else { throw TypeError(`TOML.stringify(,{Z}) can only be "Z" or "z"`); }
		
		if ( options?.xNull ) { this.nullDisabled = false; }
		
		const xBeforeNewlineInMultilineTable = options?.xBeforeNewlineInMultilineTable;
		if ( xBeforeNewlineInMultilineTable===undefined ) ;
		else if ( xBeforeNewlineInMultilineTable==='' || xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
		}
		else { throw TypeError(`TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`); }
		
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiaXRlcmF0b3IudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9ub24tYXRvbS50cyIsInR5cGVzL1RhYmxlLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwiVVRGOC50cyIsInBhcnNlLy50cyIsInN0cmluZ2lmeS9zdHJpbmcudHMiLCJzdHJpbmdpZnkvZmxvYXQudHMiLCJzdHJpbmdpZnkvc2VjdGlvbi50cyIsInN0cmluZ2lmeS9kb2N1bWVudC50cyIsInN0cmluZ2lmeS8udHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQnMS4zMi4wJzsiLCJpbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGV4ZWMgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUuZXhlYyc7XG5cbmV4cG9ydCB2YXIgVGVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKHRlc3QgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHRlc3QuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgdmFyIEV4ZWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZChleGVjICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiBleGVjLmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZnVuY3Rpb24gX19QVVJFX18gKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAgeyByZXR1cm4gLyojX19QVVJFX18qL19fUFVSRV9fKHJlKTsgfTtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplPyc7XG5pbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT8nO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eT8nO1xuXG5pbXBvcnQgeyBUZXN0LCBFeGVjIH0gZnJvbSAnLi90aGVSZWdFeHAnO1xuXG52YXIgTlQgPSAvW1xcblxcdF0rL2c7XG52YXIgRVNDQVBFID0gL1xcXFwuL2c7XG5mdW5jdGlvbiBncmF2ZUFjY2VudFJlcGxhY2VyICgkJCAgICAgICAgKSB7IHJldHVybiAkJD09PSdcXFxcYCcgPyAnYCcgOiAkJDsgfVxuXG52YXIgaW5jbHVkZXMgPSAnJy5pbmNsdWRlcyAgICAgICBcblx0PyBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpOyB9XG5cdDogZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5kZXhPZihzZWFyY2hTdHJpbmcpPi0xOyB9O1xuXG5mdW5jdGlvbiBSRSAoICAgICAgICAgICAgICAgdGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBVID0gdGhpcy5VO1xuXHR2YXIgSSA9IHRoaXMuSTtcblx0dmFyIE0gPSB0aGlzLk07XG5cdHZhciBTID0gdGhpcy5TO1xuXHR2YXIgcmF3ID0gdGVtcGxhdGUucmF3O1xuXHR2YXIgc291cmNlID0gcmF3WzBdIC5yZXBsYWNlKE5ULCAnJyk7XG5cdHZhciBpbmRleCA9IDE7XG5cdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdHZhciB2YWx1ZSAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHZhbHVlPT09J3N0cmluZycgKSB7IHNvdXJjZSArPSB2YWx1ZTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIHZhbHVlX3NvdXJjZSA9IHZhbHVlLnNvdXJjZTtcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlX3NvdXJjZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ3NvdXJjZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLnVuaWNvZGU9PT1VICkgeyB0aHJvdyBTeW50YXhFcnJvcigndW5pY29kZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmlnbm9yZUNhc2U9PT1JICkgeyB0aHJvdyBTeW50YXhFcnJvcignaWdub3JlQ2FzZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLm11bHRpbGluZT09PU0gJiYgKCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICdeJykgfHwgaW5jbHVkZXModmFsdWVfc291cmNlLCAnJCcpICkgKSB7IHRocm93IFN5bnRheEVycm9yKCdtdWx0aWxpbmUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5kb3RBbGw9PT1TICYmIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJy4nKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2RvdEFsbCcpOyB9XG5cdFx0XHRzb3VyY2UgKz0gdmFsdWVfc291cmNlO1xuXHRcdH1cblx0XHRzb3VyY2UgKz0gcmF3W2luZGV4KytdIC5yZXBsYWNlKE5ULCAnJyk7XG5cdH1cblx0dmFyIHJlICAgICAgICAgPSBSZWdFeHAoVSA/IHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKEVTQ0FQRSwgZ3JhdmVBY2NlbnRSZXBsYWNlcikgOiBzb3VyY2UsIHRoaXMuZmxhZ3MpO1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSBzb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9ICFVO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSAhSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IGluY2x1ZGVzKHNvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyhzb3VyY2UsICckJykgPyAhTSA6IG51bGw7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBpbmNsdWRlcyhzb3VyY2UsICcuJykgPyAhUyA6IG51bGw7XG5cdHJldHVybiByZTtcbn1cblxudmFyIFJFX2JpbmQgPSBiaW5kICYmIC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoUkUgICAgICAgKTtcblxuZnVuY3Rpb24gQ29udGV4dCAoZmxhZ3MgICAgICAgICkgICAgICAgICAge1xuXHRyZXR1cm4ge1xuXHRcdFU6ICFpbmNsdWRlcyhmbGFncywgJ3UnKSxcblx0XHRJOiAhaW5jbHVkZXMoZmxhZ3MsICdpJyksXG5cdFx0TTogIWluY2x1ZGVzKGZsYWdzLCAnbScpLFxuXHRcdFM6ICFpbmNsdWRlcyhmbGFncywgJ3MnKSxcblx0XHRmbGFnczogZmxhZ3Ncblx0fTtcbn1cblxudmFyIENPTlRFWFQgICAgICAgICAgPSAvKiNfX1BVUkVfXyovQ29udGV4dCgnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb3h5XG5cdD8gLyojX19QVVJFX18qL25ldyBQcm94eShSRSwge1xuXHRcdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdFx0LFxuXHRcdGdldDogZnVuY3Rpb24gKFJFLCBmbGFncyAgICAgICAgKSB7IHJldHVybiBSRV9iaW5kKENvbnRleHQoZmxhZ3MpKTsgfVxuXHRcdCxcblx0XHRkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHQsXG5cdFx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH0pXG5cdDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHRSRS5hcHBseSA9IFJFLmFwcGx5O1xuXHRcdHZhciBuZXdSZWdFeHAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShDT05URVhULCBhcmd1bWVudHMgICAgICAgKTsgfSAgICAgICA7XG5cdFx0dmFyIGQgPSAxO1xuXHRcdHZhciBnID0gZCoyO1xuXHRcdHZhciBpID0gZyoyO1xuXHRcdHZhciBtID0gaSoyO1xuXHRcdHZhciBzID0gaSoyO1xuXHRcdHZhciB1ID0gcyoyO1xuXHRcdHZhciB5ID0gdSoyO1xuXHRcdHZhciBmbGFncyA9IHkqMiAtIDE7XG5cdFx0d2hpbGUgKCBmbGFncy0tICkge1xuXHRcdFx0KCBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0XHRuZXdSZWdFeHBbY29udGV4dC5mbGFnc10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMgICAgICAgKTsgfTtcblx0XHRcdH0gKShDb250ZXh0KFxuXHRcdFx0XHQoIGZsYWdzICYgZCA/ICcnIDogJ2QnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgZyA/ICcnIDogJ2cnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgaSA/ICcnIDogJ2knIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgbSA/ICcnIDogJ20nIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgcyA/ICcnIDogJ3MnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgdSA/ICcnIDogJ3UnIClcblx0XHRcdFx0K1xuXHRcdFx0XHQoIGZsYWdzICYgeSA/ICcnIDogJ3knIClcblx0XHRcdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gZnJlZXplID8gZnJlZXplKG5ld1JlZ0V4cCkgOiBuZXdSZWdFeHA7XG5cdH0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuLy9pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbmNvbnN0IE5PTkUgICAgICAgICAgICAgICAgICAgID0gW107XG5sZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5sZXQgc291cmNlTGluZXMgICAgICAgICAgICAgICAgICAgID0gTk9ORTtcbmxldCBsYXN0TGluZUluZGV4ICAgICAgICAgPSAtMTtcbmV4cG9ydCBsZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuZXhwb3J0IGNvbnN0IHRocm93cyA9IChlcnJvciAgICAgICApICAgICAgICA9PiB7XG5cdC8vaWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IGRvbmUoKTsgb3B0aW9ucy5jbGVhcigpOyB9XG5cdHRocm93IGVycm9yO1xufTtcblxuY29uc3QgRU9MID0gL1xccj9cXG4vO1xuZXhwb3J0IGNvbnN0IHRvZG8gPSAoc291cmNlICAgICAgICAsIHBhdGggICAgICAgICkgICAgICAgPT4ge1xuXHRpZiAoIHR5cGVvZiBwYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwsc291cmNlUGF0aCknKTsgfVxuXHRzb3VyY2VQYXRoID0gcGF0aDtcblx0c291cmNlTGluZXMgPSBzb3VyY2Uuc3BsaXQoRU9MKTtcblx0bGFzdExpbmVJbmRleCA9IHNvdXJjZUxpbmVzLmxlbmd0aCAtIDE7XG5cdGxpbmVJbmRleCA9IC0xO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHQgPSAoKSAgICAgICAgID0+IHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG5cbmV4cG9ydCBjb25zdCByZXN0ID0gKCkgICAgICAgICAgPT4gbGluZUluZGV4IT09bGFzdExpbmVJbmRleDtcblxuZXhwb3J0IGNsYXNzIG1hcmsge1xuXHQgICAgICAgICAgICAgICAgIGxpbmVJbmRleCA9IGxpbmVJbmRleDtcblx0ICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0ICAgICAgICAgICAgICAgICByZXN0Q29sdW1uICAgICAgICA7XG5cdGNvbnN0cnVjdG9yICh0eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcmVzdENvbHVtbiAgICAgICAgKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHR0aGlzLnJlc3RDb2x1bW4gPSByZXN0Q29sdW1uO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdG11c3QgKCAgICAgICAgICApICAgICAgICAge1xuXHRcdGxpbmVJbmRleD09PWxhc3RMaW5lSW5kZXggJiYgdGhyb3dzKFN5bnRheEVycm9yKGAke3RoaXMudHlwZX0gaXMgbm90IGNsb3NlIHVudGlsIHRoZSBlbmQgb2YgdGhlIGZpbGVgICsgd2hlcmUoJywgd2hpY2ggc3RhcnRlZCBmcm9tICcsIHRoaXMubGluZUluZGV4LCBzb3VyY2VMaW5lc1t0aGlzLmxpbmVJbmRleF0gLmxlbmd0aCAtIHRoaXMucmVzdENvbHVtbiArIDEpKSk7XG5cdFx0cmV0dXJuIHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG5cdH1cblx0bm93cmFwICggICAgICAgICAgKSAgICAgICAge1xuXHRcdHRocm93IHRocm93cyhFcnJvcihgVE9NTC5wYXJzZSgsLG11bHRpbGluZVN0cmluZ0pvaW5lcikgbXVzdCBiZSBwYXNzZWQsIHdoaWxlIHRoZSBzb3VyY2UgaW5jbHVkaW5nIG11bHRpLWxpbmUgc3RyaW5nYCArIHdoZXJlKCcsIHdoaWNoIHN0YXJ0ZWQgZnJvbSAnLCB0aGlzLmxpbmVJbmRleCwgc291cmNlTGluZXNbdGhpcy5saW5lSW5kZXhdIC5sZW5ndGggLSB0aGlzLnJlc3RDb2x1bW4gKyAxKSkpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3Qgd2hlcmUgPSAocHJlICAgICAgICAsIHJvd0luZGV4ICAgICAgICAgPSBsaW5lSW5kZXgsIGNvbHVtbk51bWJlciAgICAgICAgID0gMCkgICAgICAgICA9PiBzb3VyY2VMaW5lcz09PU5PTkUgPyAnJyA6XG5cdHNvdXJjZVBhdGhcblx0XHQ/IGBcXG4gICAgYXQgKCR7c291cmNlUGF0aH06JHtyb3dJbmRleCArIDF9OiR7Y29sdW1uTnVtYmVyfSlgXG5cdFx0OiBgJHtwcmV9bGluZSAke3Jvd0luZGV4ICsgMX06ICR7c291cmNlTGluZXNbcm93SW5kZXhdfWA7XG5cbmV4cG9ydCBjb25zdCBkb25lID0gKCkgICAgICAgPT4ge1xuXHRzb3VyY2VQYXRoID0gJyc7XG5cdHNvdXJjZUxpbmVzID0gTk9ORTtcbn07XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuL2l0ZXJhdG9yJztcblxuLyogbmVzdGVkIChyZWFkYWJsZSkgKi9cblxuY29uc3QgV2hpdGVzcGFjZSA9IC9bIFxcdF0vO1xuXG5leHBvcnQgY29uc3QgUFJFX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogVkFMVUVfUkVTVF9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdChcblx0XHQoPzpcXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCBcXGQpP1xuXHRcdFtcXHdcXC0rLjpdK1xuXHQpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBMSVRFUkFMX1NUUklOR19leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdCcoW14nXSopJ1xuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKCd7MCwyfSlcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzAgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcbmV4cG9ydFxubGV0IF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnNgXG5cdF5cblx0LlxuXHQke1doaXRlc3BhY2V9KmAudmFsdWVPZigpO1xuXG5cbmV4cG9ydCBjb25zdCBUYWcgPSAvW15cXHgwMC1cXHgxRlwiIycoKTw+W1xcXFxcXF1ge31cXHg3Rl0rLztcblxuY29uc3QgeyBleGVjOiBLRVlfVkFMVUVfUEFJUl9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICBgXG5cdF5cblx0JHtXaGl0ZXNwYWNlfSpcblx0PVxuXHQke1doaXRlc3BhY2V9KlxuXHQoPzpcblx0XHQ8KCR7VGFnfSk+XG5cdFx0JHtXaGl0ZXNwYWNlfSpcblx0KT9cblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IF9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBUQUdfUkVTVF9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbi8qIG9wdGltaXplZCAoYXZvaWQgb3ZlcmZsb3cgb3IgbG9zdCkgKi9cblxuY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkcgPSB0aGVSZWdFeHAoL1teXFxcXFwiXSt8XFxcXC4/fFwiKD8hXCJcIilcIj8vc3kpO1xuZXhwb3J0IGNvbnN0IE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGggPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gLypNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAqLzA7XG5cdHdoaWxlICggTVVMVElfTElORV9CQVNJQ19TVFJJTkcudGVzdChfKSApIHsgbGFzdEluZGV4ID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkcubGFzdEluZGV4OyB9XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fID0gL1teXFxcXFxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIFRhYlxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiIFxcPHdzPm5ld2xpbmVcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBub3QgXFw8d3M+bmV3bGluZVxubGV0IF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX1RBQl9fX19fXztcbmV4cG9ydCBjb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCA9IChfICAgICAgICApICAgICAgICAgID0+ICFfLnJlcGxhY2UoX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIsICcnKTsvLy8gb3A/XG5cbmNvbnN0IEJBU0lDX1NUUklOR19UQUJfX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7XG5jb25zdCBCQVNJQ19TVFJJTkdfX19fX19fX19fID0gdGhlUmVnRXhwKC9bXlxcXFxcIlxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmNvbnN0IEJBU0lDX1NUUklOR19ERUxfU0xBU0ggPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTsvLy8gVGFiXG5sZXQgX19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfREVMX1NMQVNIO1xuZXhwb3J0IGNvbnN0IEJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXggPSAobGluZSAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gX19CQVNJQ19TVFJJTkcubGFzdEluZGV4ID0gMTtcblx0d2hpbGUgKCBfX0JBU0lDX1NUUklORy50ZXN0KGxpbmUpICkgeyBsYXN0SW5kZXggPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0bGFzdEluZGV4IT09bGluZS5sZW5ndGggJiYgbGluZVtsYXN0SW5kZXhdPT09J1wiJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4gbGFzdEluZGV4O1xufTtcblxuZXhwb3J0XG5jb25zdCB7IHRlc3Q6IElTX0RPVF9LRVkgfSA9IHRoZVJlZ0V4cCgvXlsgXFx0XSpcXC4vKTtcbmV4cG9ydFxuY29uc3QgRE9UX0tFWSA9IC9eWyBcXHRdKlxcLlsgXFx0XSovO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9TVFJJQ1QgfSA9IHRoZVJlZ0V4cCgvXltcXHctXSsvKTtcbmNvbnN0IHsgZXhlYzogQkFSRV9LRVlfRlJFRSB9ID0gdGhlUmVnRXhwKC9eW14gXFx0Iz1bXFxdJ1wiLl0rKD86WyBcXHRdK1teIFxcdCM9W1xcXSdcIi5dKykqLyk7XG5leHBvcnRcbmxldCBfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9GUkVFO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9fX18gfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdKicvKTtcbmNvbnN0IHsgZXhlYzogTElURVJBTF9LRVlfREVMIH0gPSB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0qJy8pO1xuZXhwb3J0XG5sZXQgX19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xubGV0IHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgPSAobGluZVJlc3QgICAgICAgICwgcGFyc2VLZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGFzQXJyYXlJdGVtICAgICAgICAgID0gbGluZVJlc3RbMV09PT0nWyc7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBBcnJheSBvZiBUYWJsZXMgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuMmAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMik7XG5cdH1cblx0ZWxzZSB7IGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5IH0gPSB7IGxpbmVSZXN0IH0gPSBwYXJzZUtleXMobGluZVJlc3QpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0bGluZVJlc3QgJiYgbGluZVJlc3RbMF09PT0nXScgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUYWJsZSBoZWFkZXIgaXMgbm90IGNsb3NlZGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHQoIGxpbmVSZXN0Lmxlbmd0aD4xID8gbGluZVJlc3RbMV09PT0nXSc9PT1hc0FycmF5SXRlbSA6ICFhc0FycmF5SXRlbSApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgU3F1YXJlIGJyYWNrZXRzIG9mIFRhYmxlIGRlZmluaXRpb24gc3RhdGVtZW50IG5vdCBtYXRjaGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoYXNBcnJheUl0ZW0gPyAyIDogMSkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsZXQgdGFnICAgICAgICA7XG5cdGlmICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF09PT0nPCcgKSB7ICggeyAxOiB0YWcsIDI6IGxpbmVSZXN0IH0gPSBUQUdfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZywgbGluZVJlc3QgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyA9ICh7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgbGluZVJlc3QgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyAxOiB0YWcgPSAnJyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBLZXlzIG11c3QgZXF1YWwgc29tZXRoaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcsIGJ1dCBtaXNzaW5nIGF0ICcpKSk7XG5cdHRhZyB8fCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSE9PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX18gfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0vKTtcbmNvbnN0IHsgdGVzdDogQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXS8pO1xuZXhwb3J0XG5sZXQgX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hSZWdFeHAgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAgPT4ge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMjtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfVEFCX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfX19fX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX0RFTDtcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkcgPSBCQVNJQ19TVFJJTkdfREVMX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0g7XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9GUkVFO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgTlVNID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0YlswMV1bXzAxXSpcblx0XHR8XG5cdFx0XHRvWzAtN11bXzAtN10qXG5cdFx0fFxuXHRcdFx0eFtcXGRBLUZhLWZdW19cXGRBLUZhLWZdKlxuXHRcdHxcblx0XHRcdCg/OlxcLlxcZFtfXFxkXSopPyg/OltFZV0tP1xcZFtfXFxkXSopP1xuXHRcdClcblx0fFxuXHRcdFsxLTldW19cXGRdKlxuXHRcdCg/OlxcLlxcZFtfXFxkXSopPyg/OltFZV0tP1xcZFtfXFxkXSopP1xuXHR8XG5cdFx0aW5mXG5cdHxcblx0XHRuYW5cblx0KVxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IElTX0FNQVpJTkcgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4oPzpcblx0XHQtPyR7TlVNfVxuXHRcdCg/Oi0ke05VTX0pKlxuXHR8XG5cdFx0dHJ1ZVxuXHR8XG5cdFx0ZmFsc2Vcblx0KSRcbmAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBCQURfRFhPQiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hW1xcZEEtRmEtZl0pYC52YWx1ZU9mKCk7XG5leHBvcnQgY29uc3QgaXNBbWF6aW5nID0gKGtleXMgICAgICAgICkgICAgICAgICAgPT4gSVNfQU1BWklORyhrZXlzKSAmJiAhQkFEX0RYT0Ioa2V5cyk7XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IFBsYWluVGFibGUsIE9yZGVyZWRUYWJsZSB9IGZyb20gJy4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4vcmVnZXhwcyc7XG5cbmV4cG9ydCBsZXQgbXVzdFNjYWxhciAgICAgICAgICA9IHRydWU7XG5cbi8qIG9wdGlvbnMgKi9cblxuZXhwb3J0IGxldCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbk51bWJlciAgICAgICAgID0gMDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heE51bWJlciAgICAgICAgID0gMDtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuICBcbmV4cG9ydCBsZXQgcHJlc2VydmVMaXRlcmFsICAgICAgICAgO1xuZXhwb3J0IGxldCB6ZXJvRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGlubGluZVRhYmxlICAgICAgICAgO1xuZXhwb3J0IGxldCBtb3JlRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FsbG93RW1wdHlLZXkgICAgICAgICA7XG4vL2V4cG9ydCBjb25zdCB4b2IgOmJvb2xlYW4gPSB0cnVlO1xuZXhwb3J0IGxldCBzRXJyb3IgICAgICAgICA7XG5leHBvcnQgbGV0IHNGbG9hdCAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBsZXQgVGFibGUgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93TG9uZ2VyICAgICAgICAgO1xuZXhwb3J0IGxldCBlbmFibGVOdWxsICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICAgICAgICAgO1xuZXhwb3J0IGxldCBwcmVzZXJ2ZUNvbW1lbnQgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FibGVEaWdpdCAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgKCk7XG5jb25zdCBhcnJheVR5cGVzX2dldCA9IC8qI19fUFVSRV9fKi9nZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzX3NldCA9IC8qI19fUFVSRV9fKi9zZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBBcyA9ICgpICAgICA9PiB7XG5cdGNvbnN0IGFzID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IHtcblx0XHRjb25zdCBnb3QgPSBhcnJheVR5cGVzX2dldChhcnJheSk7XG5cdFx0Z290XG5cdFx0XHQ/IGdvdD09PWFzIHx8IGl0ZXJhdG9yLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvci53aGVyZSgnLiBDaGVjayAnKSkpXG5cdFx0XHQ6IGFycmF5VHlwZXNfc2V0KGFycmF5LCBhcyk7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9O1xuXHRyZXR1cm4gYXM7XG59O1xuY29uc3QgQVNfVFlQRUQgPSB7XG5cdGFzTnVsbHM6IEFzKCksXG5cdGFzU3RyaW5nczogQXMoKSxcblx0YXNUYWJsZXM6IEFzKCksXG5cdGFzQXJyYXlzOiBBcygpLFxuXHRhc0Jvb2xlYW5zOiBBcygpLFxuXHRhc0Zsb2F0czogQXMoKSxcblx0YXNJbnRlZ2VyczogQXMoKSxcblx0YXNPZmZzZXREYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlVGltZXM6IEFzKCksXG5cdGFzTG9jYWxEYXRlczogQXMoKSxcblx0YXNMb2NhbFRpbWVzOiBBcygpLFxufTtcbmNvbnN0IGFzTWl4ZWQgICAgID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IGFycmF5O1xuZXhwb3J0IGxldFxuXHRhc051bGxzICAgICxcblx0YXNTdHJpbmdzICAgICxcblx0YXNUYWJsZXMgICAgLFxuXHRhc0FycmF5cyAgICAsXG5cdGFzQm9vbGVhbnMgICAgLFxuXHRhc0Zsb2F0cyAgICAsXG5cdGFzSW50ZWdlcnMgICAgLFxuXHRhc09mZnNldERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZXMgICAgLFxuXHRhc0xvY2FsVGltZXMgICAgO1xuXG4vKiB4T3B0aW9ucy50YWcgKi9cblxubGV0IHByb2Nlc3NvciAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxubGV0IGNvbGxlY3Rpb24gICAgICAgICAgICAgID0gW107XG5sZXQgY29sbGVjdGlvbl9sZW5ndGggICAgICAgICA9IDA7XG5jb25zdCBjb2xsZWN0X29uID0gKHRhZyAgICAgICAgLCBhcnJheSAgICAgICAgICAgICAgLCB0YWJsZSAgICAgICAgICAgICAgLCBrZXkgICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3QgZWFjaCA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0ZWFjaC50YWcgPSB0YWc7XG5cdGlmICggdGFibGUgKSB7XG5cdFx0ZWFjaC50YWJsZSA9IHRhYmxlO1xuXHRcdGVhY2gua2V5ID0ga2V5IDtcblx0fVxuXHRpZiAoIGFycmF5ICkge1xuXHRcdGVhY2guYXJyYXkgPSBhcnJheTtcblx0XHRlYWNoLmluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXHR9XG5cdGNvbGxlY3Rpb25bY29sbGVjdGlvbl9sZW5ndGgrK10gPSBlYWNoO1xufTtcbmNvbnN0IGNvbGxlY3Rfb2ZmID0gKCkgICAgICAgID0+IHsgdGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGB4T3B0aW9ucy50YWcgaXMgbm90IGVuYWJsZWQsIGJ1dCBmb3VuZCB0YWcgc3ludGF4YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IFByb2Nlc3MgPSAoKSAgICAgICAgICA9PiB7XG5cdGlmICggY29sbGVjdGlvbl9sZW5ndGggKSB7XG5cdFx0bGV0IGluZGV4ID0gY29sbGVjdGlvbl9sZW5ndGg7XG5cdFx0Y29uc3QgcHJvY2VzcyA9IHByb2Nlc3NvciA7XG5cdFx0Y29uc3QgcXVldWUgPSBjb2xsZWN0aW9uO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHRyZXR1cm4gKCkgICAgICAgPT4ge1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRwcm9jZXNzKHF1ZXVlWy0taW5kZXhdICk7XG5cdFx0XHRcdHF1ZXVlLmxlbmd0aCA9IGluZGV4O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKiB1c2UgJiBjbGVhciAqL1xuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSAgICAgICA9PiB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGggPSAwO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcblx0dXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlID0gKHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgKSAgICAgICA9PiB7XG5cdFxuXHRsZXQgbWl4ZWQgICAgICAgICA7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRtdXN0U2NhbGFyID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdG11c3RTY2FsYXIgPSBkaXNhbGxvd0VtcHR5S2V5ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4zOlxuXHRcdFx0bXVzdFNjYWxhciA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSB6ZXJvRGF0ZXRpbWUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjI6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMTpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCxzcGVjaWZpY2F0aW9uVmVyc2lvbiknKTtcblx0fVxuXHRyZWdleHBzLnN3aXRjaFJlZ0V4cChzcGVjaWZpY2F0aW9uVmVyc2lvbik7XG5cdFxuXHRpZiAoIHR5cGVvZiBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT0nc3RyaW5nJyApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG11bHRpbGluZVN0cmluZ0pvaW5lcjsgfVxuXHRlbHNlIGlmICggbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09dW5kZWZpbmVkICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbnVsbDsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsbXVsdGlsaW5lU3RyaW5nSm9pbmVyKScpOyB9XG5cdFxuXHRpZiAoIHVzZUJpZ0ludD09PXVuZGVmaW5lZCB8fCB1c2VCaWdJbnQ9PT10cnVlICkgeyB1c2luZ0JpZ0ludCA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIHVzZUJpZ0ludD09PWZhbHNlICkgeyB1c2luZ0JpZ0ludCA9IGZhbHNlOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIHVzZUJpZ0ludCE9PSdudW1iZXInICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHR1c2VCaWdJbnQ+PTBcblx0XHRcdD8gSW50ZWdlck1pbk51bWJlciA9IC0oIEludGVnZXJNYXhOdW1iZXIgPSB1c2VCaWdJbnQgKVxuXHRcdFx0OiBJbnRlZ2VyTWF4TnVtYmVyID0gLSggSW50ZWdlck1pbk51bWJlciA9IHVzZUJpZ0ludCApIC0gMTtcblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCApIHtcblx0XHRUYWJsZSA9IFBsYWluVGFibGU7XG5cdFx0c0Vycm9yID0gYWxsb3dMb25nZXIgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IGZhbHNlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHhPcHRpb25zIT09J29iamVjdCcgKSB7XG5cdFx0dGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCwsLCR7dHlwZW9mIHhPcHRpb25zfWApO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgY29tbWVudCwgc3RyaW5nLCBsaXRlcmFsLCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGNvbnN0IHVua25vd25OYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXModW5rbm93bik7XG5cdFx0aWYgKCB1bmtub3duTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoLCwsLHsgJHt1bmtub3duTmFtZXMuam9pbignLCAnKX0gfSlgKTsgfVxuXHRcdFRhYmxlID0gb3JkZXIgPyBPcmRlcmVkVGFibGUgOiBQbGFpblRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gIWxvbmdlcjtcblx0XHRzRXJyb3IgPSAhIWV4YWN0O1xuXHRcdGVuYWJsZU51bGwgPSAhIV9udWxsO1xuXHRcdGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSAhIW11bHRpO1xuXHRcdHByZXNlcnZlQ29tbWVudCA9ICEhY29tbWVudDtcblx0XHRkaXNhYmxlRGlnaXQgPSAhIXN0cmluZztcblx0XHRwcmVzZXJ2ZUxpdGVyYWwgPSAhIWxpdGVyYWw7XG5cdFx0aWYgKCB0YWcgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiB0YWchPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zLnRhZyknKTsgfVxuXHRcdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXknKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5cbmNvbnN0IHByZXZpb3VzICAgICAgICAgICAgICAgID0gU3ltYm9sKCdwcmV2aW91cycpICAgICAgIDtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuICBcblxuZXhwb3J0IGNvbnN0IHggPSAgICAgKHJvb3RTdGFjayAgICAgICkgICAgPT4ge1xuXHRsZXQgc3RhY2sgICAgICAgID0gcm9vdFN0YWNrO1xuXHRsZXQgcmVzdWx0ID0gc3RhY2submV4dCgpO1xuXHRpZiAoICFyZXN1bHQuZG9uZSApIHtcblx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRpZiAoIHJlc3VsdC5kb25lICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrPT09cm9vdFN0YWNrICkgeyBicmVhazsgfVxuXHRcdFx0XHRzdGFjayA9IHN0YWNrW3ByZXZpb3VzXSA7XG5cdFx0XHRcdHJlc3VsdCA9IHN0YWNrLm5leHQocmVzdWx0LnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0XHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQudmFsdWU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0IFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCBjb25zdCBfbGl0ZXJhbCAgICAgICAgICAgICAgICA9IFN5bWJvbCgnX2xpdGVyYWwnKSAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBMaXRlcmFsT2JqZWN0ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxpdGVyYWwgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0Y29uc3Qgb2JqZWN0ID0gT2JqZWN0KHZhbHVlKSAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0b2JqZWN0W19saXRlcmFsXSA9IGxpdGVyYWw7XG5cdHJldHVybiBvYmplY3Q7XG59O1xuIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IGFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgYXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChhcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoYXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBPRl9UQUJMRVMgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBTVEFUSUNBTExZID0gdHJ1ZTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBzdGF0aWNhbEFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoc3RhdGljYWxBcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzU3RhdGljID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHN0YXRpY2FsQXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbmV3QXJyYXkgPSAoaXNTdGF0aWMgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGFycmF5ICAgICAgICA9IFtdO1xuXHRhcnJheXNfYWRkKGFycmF5KTtcblx0aXNTdGF0aWMgJiYgc3RhdGljYWxBcnJheXNfYWRkKGFycmF5KTtcblx0cmV0dXJuIGFycmF5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgTmF0aXZlRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLkRhdGUucGFyc2UnO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG4vLy9pbXBvcnQgaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcubnVsbC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcblxuY29uc3QgZnBjID0gICAgICAgICAgICAgICAgICAgICAgKGMgICApICAgID0+IHtcblx0ZnJlZXplKGZyZWV6ZShjKS5wcm90b3R5cGUpO1xuXHRyZXR1cm4gYztcbn07XG5cbmNvbnN0IF8yOV8gPSAvKD86MFsxLTldfDFcXGR8MlxcZCkvO1xuY29uc3QgXzMwXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzMCkvO1xuY29uc3QgXzMxXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzWzAxXSkvO1xuY29uc3QgXzIzXyA9IC8oPzpbMDFdXFxkfDJbMC0zXSkvO1xuY29uc3QgXzU5XyA9IC9bMC01XVxcZC87XG5cbmNvbnN0IFlNRCA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdFxcZFxcZFxcZFxcZC1cblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0WzEzNTc4XS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHRbNDY5XS0ke18zMF99XG5cdFx0XHR8XG5cdFx0XHQyLSR7XzI5X31cblx0XHQpXG5cdFx0fFxuXHRcdDFcblx0XHQoPzpcblx0XHRcdFswMl0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0MS0ke18zMF99XG5cdFx0KVxuXHQpXG5gLnZhbHVlT2YoKTtcblxuY29uc3QgSE1TID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cbmAudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgT0ZGU0VUJCA9IC8oPzpbWnpdfFsrLV1cXGRcXGQ6XFxkXFxkKSQvO1xuXG5jb25zdCB7IGV4ZWM6IFpfZXhlYyB9ID0gdGhlUmVnRXhwICAgICAgICAgICAoLygoWystXSlcXGRcXGQpOihcXGRcXGQpJC8pO1xuXG5jb25zdCB7IGV4ZWM6IE9GRlNFVF9EQVRFVElNRV9leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkezEsM30oXFxkKj8pMCopP1xuXHQoPzpbWnpdfFsrLV0ke18yM199OiR7XzU5X30pXG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfWkVST19leGVjIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KClcblx0W1p6XVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfREFURVRJTUUgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUdCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEUgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9USU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGQrKT9cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCBUID0gL1sgdF0vO1xuY29uc3QgREVMSU1JVEVSX0RPVCA9IC9bLVQ6Ll0vZztcbmNvbnN0IERPVF9aRVJPID0gL1xcLj8wKyQvO1xuY29uc3QgWkVSTyA9IC9cXC4oXFxkKj8pMCskLztcbmNvbnN0IHplcm9SZXBsYWNlciA9IChtYXRjaCAgICAgICAgLCBwMSAgICAgICAgKSA9PiBwMTtcblxuY29uc3QgRGF0ZXRpbWUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IERhdGV0aW1lID0gZnVuY3Rpb24gKCAgICAgICAgICAgICkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOy8vZXhwcmVzc2lvbj8gOnVuZGVmaW5lZCwgbGl0ZXJhbD8gOnVuZGVmaW5lZCwgZG90VmFsdWU/IDp1bmRlZmluZWRcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnNldFRpbWUoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuZ2V0VGltZSgpIDogRGF0ZS5wYXJzZSgnVCcpXG5cdC8vIFtTeW1ib2wudG9QcmltaXRpdmVdKCdudW1iZXInKSA+IC52YWx1ZU9mKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLnRvSVNPU3RyaW5nKClcblx0Y29uc3QgZGVzY3JpcHRvcnMgPSBOdWxsKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdHtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gTnVsbChudWxsKTtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Ygb3duS2V5cyhOYXRpdmVEYXRlLnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApIHtcblx0XHRcdGtleT09PSdjb25zdHJ1Y3RvcicgfHxcblx0XHRcdGtleT09PSd0b0pTT04nIHx8XG5cdFx0XHQoIGRlc2NyaXB0b3JzW2tleV0gPSBkZXNjcmlwdG9yICk7XG5cdFx0fVxuXHR9XG5cdERhdGV0aW1lLnByb3RvdHlwZSA9IHByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShOYXRpdmVEYXRlLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpKTtcblx0cmV0dXJuIGZyZWV6ZShEYXRldGltZSk7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgVmFsdWUgPSAoSVNPU3RyaW5nICAgICAgICApICAgICAgICA9PiBJU09TdHJpbmcucmVwbGFjZShaRVJPLCB6ZXJvUmVwbGFjZXIpLnJlcGxhY2UoREVMSU1JVEVSX0RPVCwgJycpO1xuXG5jb25zdCBsZWFwID0gKGxpdGVyYWwgICAgICAgICkgPT4gbGl0ZXJhbC5zbGljZSg1LCAxMCkhPT0nMDItMjknIHx8ICtsaXRlcmFsLnNsaWNlKDAsIDQpJTQ9PT0wICYmIGxpdGVyYWwuc2xpY2UoMiwgNCkhPT0nMDAnO1xuXG5jb25zdCBEQVRFICAgICAgICAgICAgID0gLyojX19QVVJFX18qL2RlZmluZVByb3BlcnRpZXMobmV3IE5hdGl2ZURhdGUoMCksIC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKE5hdGl2ZURhdGUucHJvdG90eXBlKSk7XG5cbmNvbnN0IE9mZnNldERhdGVUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdXNlID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAkICAgICAgICAgPSAwKSA9PiB7XG5cdERBVEUuc2V0VGltZSgrdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gKyAkKTtcblx0cmV0dXJuIERBVEU7XG59O1xuLypjb25zdCBPZmZzZXREYXRlVGltZV9nZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyKSA9PiArdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfc2V0ID0gKHRoYXQgOkluc3RhbmNlVHlwZTx0eXBlb2YgT2Zmc2V0RGF0ZVRpbWU+LCBzdGFydCA6bnVtYmVyLCBlbmQgOm51bWJlciwgdmFsdWUgOm51bWJlcikgPT4ge1xuXHRpZiAoIGVuZCApIHtcblx0XHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRcdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0XHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdFx0dGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7XG5cdH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHJldHVybiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB0aW1lICkucGFkU3RhcnQoMTUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNSk7Ly8vdGltZVxufTsqLy8vXG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRjb25zdCB7IDE6IG1vcmUgfSA9IGxlYXAobGl0ZXJhbCkgJiYgKCBvcHRpb25zLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgOiBPRkZTRVRfREFURVRJTUVfZXhlYyApKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKFQsICdUJykucmVwbGFjZSgneicsICdaJyk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgcGFyc2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKSApLnBhZFN0YXJ0KDE1LCAnMCcpICsgKCBtb3JlID8gJy4nICsgbW9yZSA6ICcnICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldFVUQ0Z1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENGdWxsWWVhcigpOyB9XG5cdC8vL2dldCB5ZWFyICgpIDpGdWxsWWVhciB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0Ly8vc2V0IHllYXIgKHZhbHVlIDpGdWxsWWVhcikgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldFVUQ01vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNb250aCgpOyB9XG5cdC8vL2dldCBtb250aCAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgNSwgNyk7IH1cblx0Ly8vc2V0IG1vbnRoICh2YWx1ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUpOyB9XG5cdGdldFVUQ0RhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF0ZSgpOyB9XG5cdC8vL2dldCBkYXkgKCkgOkRhdGUgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHQvLy9zZXQgZGF5ICh2YWx1ZSA6RGF0ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Ly8vZ2V0IGhvdXIgKCkgOkhvdXJzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdC8vL3NldCBob3VyICh2YWx1ZSA6SG91cnMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldFVUQ01pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWludXRlcygpOyB9XG5cdC8vL2dldCBtaW51dGUgKCkgOk1pbnV0ZXMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0Ly8vc2V0IG1pbnV0ZSAodmFsdWUgOk1pbnV0ZXMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUpOyB9XG5cdGdldFVUQ1NlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDU2Vjb25kcygpOyB9XG5cdC8vL2dldCBzZWNvbmQgKCkgOlNlY29uZHMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0Ly8vc2V0IHNlY29uZCAodmFsdWUgOlNlY29uZHMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdC8vL2dldCBtaWxsaXNlY29uZCAoKSA6TWlsbGlzZWNvbmRzIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxMiwgMTUpOyB9Ly8vXG5cdC8qc2V0IG1pbGxpc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKSB7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApICsgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zZWFyY2goT0ZGU0VUJCkpO1xuXHRcdE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwKTtcblx0fSovLy9cblx0Ly8vZ2V0IG1pY3Jvc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG1pY3Jvc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHQvLy9nZXQgbmFub3NlY29uZCAoKSA6TWlsbGlzZWNvbmRzXG5cdC8vL3NldCBuYW5vc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHRcblx0Z2V0VVRDRGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF5KCk7IH1cblx0Ly8vZ2V0IGRheU9mV2VlayAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKS5nZXRVVENEYXkoKSB8fCA3OyB9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdC8vL2dldCBvZmZzZXQgKCkgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAnWicgOiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoLTYpOyB9XG5cdC8qc2V0IG9mZnNldCAodmFsdWUpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAtMSA6IC02KSArIHZhbHVlO1xuXHRcdE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwKTtcblx0fSovLy9cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgwLCAxNSk7IH0vLy9cblx0LypzZXRUaW1lICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOlRpbWUpIDp2b2lkIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMTUsICcwJyk7XG5cdFx0Ly8vcmV0dXJuIHZhbHVlO1xuXHR9Ki9cblx0XG59KTtcblxuY29uc3QgTG9jYWxEYXRlVGltZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbERhdGVUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRjb25zdCBzaXplID0gZW5kIC0gc3RhcnQ7XG5cdGlmICggc3RyaW5nLmxlbmd0aD5zaXplICkgeyB0aHJvdyBSYW5nZUVycm9yKCk7IH0vLy9cblx0dGhhdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgc3RyaW5nLnBhZFN0YXJ0KHNpemUsICcwJykgKyB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEVUSU1FKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKFQsICdUJylcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNCwgMTcpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZV9JU09TdHJpbmcgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfdmFsdWUgICAgICAgICAgICAgICAgPSBTeW1ib2woJ0xvY2FsRGF0ZV92YWx1ZScpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbERhdGVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApICAgICAgID0+IHtcblx0Y29uc3Qgc3RyaW5nID0gJycgKyB2YWx1ZTtcblx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdHRoYXRbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsRGF0ZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbERhdGVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIGxlYXAobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSBsaXRlcmFsXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSArIDEpOyB9XG5cdGdldERhdGUgKCAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxUaW1lX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IExvY2FsVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRjb25zdCBzaXplID0gZW5kIC0gc3RhcnQ7XG5cdGlmICggc3RyaW5nLmxlbmd0aD5zaXplICkgeyB0aHJvdyBSYW5nZUVycm9yKCk7IH0vLy9cblx0dGhhdFtMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgc3RyaW5nLnBhZFN0YXJ0KDIsICcwJykgKyB0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbFRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX1RJTUUobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIFRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMCwgMik7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsVGltZV9zZXQodGhpcywgMCwgMiwgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAzLCA1KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsVGltZV9zZXQodGhpcywgMywgNSwgdmFsdWUpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCA2LCA4KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsVGltZV9zZXQodGhpcywgNiwgOCwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuICt0aGlzW0xvY2FsVGltZV92YWx1ZV0uc2xpY2UoNiwgOSkucGFkRW5kKDMsICcwJyk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApICAgICAgIHtcblx0XHR0aGlzW0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSB0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDgpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG4iLCJpbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgcGFyc2VJbnQgZnJvbSAnLnBhcnNlSW50JztcbmltcG9ydCBmcm9tQ2hhckNvZGUgZnJvbSAnLlN0cmluZy5mcm9tQ2hhckNvZGUnO1xuaW1wb3J0IGZyb21Db2RlUG9pbnQgZnJvbSAnLlN0cmluZy5mcm9tQ29kZVBvaW50JztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuY29uc3QgRVNDQVBFRF9JTl9TSU5HTEVfTElORSA9IC9bXlxcXFxdK3xcXFxcKD86W1xcXFxcImJ0bmZyL118dS57NH18VS57OH0pL2dzO1xuY29uc3QgRVNDQVBFRF9JTl9NVUxUSV9MSU5FID0gL1teXFxuXFxcXF0rfFxcbnxcXFxcKD86W1xcdCBdKlxcbltcXHRcXG4gXSp8W1xcXFxcImJ0bmZyL118dS57NH18VS57OH0pL2dzO1xuXG5leHBvcnQgY29uc3QgQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbCApIHsgcmV0dXJuICcnOyB9XG5cdGNvbnN0IHBhcnRzID0gbGl0ZXJhbC5tYXRjaChFU0NBUEVEX0lOX1NJTkdMRV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydFswXT09PSdcXFxcJyApIHtcblx0XHRcdHN3aXRjaCAoIHBhcnRbMV0gKSB7XG5cdFx0XHRcdGNhc2UgJ1xcXFwnOiBwYXJ0c1tpbmRleF0gPSAnXFxcXCc7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcIic6IHBhcnRzW2luZGV4XSA9ICdcIic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdiJzogcGFydHNbaW5kZXhdID0gJ1xcYic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICd0JzogcGFydHNbaW5kZXhdID0gJ1xcdCc7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICduJzogcGFydHNbaW5kZXhdID0gJ1xcbic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdmJzogcGFydHNbaW5kZXhdID0gJ1xcZic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyJzogcGFydHNbaW5kZXhdID0gJ1xccic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICd1Jzpcblx0XHRcdFx0XHRjb25zdCBjaGFyQ29kZSAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y2hhckNvZGUgJiYgY2hhckNvZGU8MHhFMDAwXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwYXJ0fWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnVSc6XG5cdFx0XHRcdFx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0KCBvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwYXJ0fWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICcvJzogcGFydHNbaW5kZXhdID0gJy8nOyBicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0d2hpbGUgKCArK2luZGV4IT09bGVuZ3RoICk7XG5cdHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aWxpbmVCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICAsIHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgICAgICAgICwgbiAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbCApIHsgcmV0dXJuICcnOyB9XG5cdGNvbnN0IHBhcnRzID0gbGl0ZXJhbC5tYXRjaChFU0NBUEVEX0lOX01VTFRJX0xJTkUpIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IHBhcnRzO1xuXHRsZXQgaW5kZXggPSAwO1xuXHRkbyB7XG5cdFx0Y29uc3QgcGFydCA9IHBhcnRzW2luZGV4XSA7XG5cdFx0aWYgKCBwYXJ0PT09J1xcbicgKSB7XG5cdFx0XHQrK247XG5cdFx0XHRwYXJ0c1tpbmRleF0gPSB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nO1xuXHRcdH1cblx0XHRlbHNlIGlmICggcGFydFswXT09PSdcXFxcJyApIHtcblx0XHRcdHN3aXRjaCAoIHBhcnRbMV0gKSB7XG5cdFx0XHRcdGNhc2UgJ1xcbic6XG5cdFx0XHRcdGNhc2UgJyAnOlxuXHRcdFx0XHRjYXNlICdcXHQnOlxuXHRcdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA9IHBhcnQuaW5kZXhPZignXFxuJywgaSkgKyAxOyApIHsgKytuOyB9XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gJyc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1xcXFwnOiBwYXJ0c1tpbmRleF0gPSAnXFxcXCc7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcIic6IHBhcnRzW2luZGV4XSA9ICdcIic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdiJzogcGFydHNbaW5kZXhdID0gJ1xcYic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICd0JzogcGFydHNbaW5kZXhdID0gJ1xcdCc7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICduJzogcGFydHNbaW5kZXhdID0gJ1xcbic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdmJzogcGFydHNbaW5kZXhdID0gJ1xcZic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyJzogcGFydHNbaW5kZXhdID0gJ1xccic7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICd1Jzpcblx0XHRcdFx0XHRjb25zdCBjaGFyQ29kZSAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y2hhckNvZGUgJiYgY2hhckNvZGU8MHhFMDAwXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwYXJ0fWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yLmxpbmVJbmRleCArIG4pKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnVSc6XG5cdFx0XHRcdFx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0KCBvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwYXJ0fWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yLmxpbmVJbmRleCArIG4pKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICcvJzogcGFydHNbaW5kZXhdID0gJy8nOyBicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0d2hpbGUgKCArK2luZGV4IT09bGVuZ3RoICk7XG5cdHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbn07XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBCaWdJbnQgZnJvbSAnLkJpZ0ludCc7XG5pbXBvcnQgcGFyc2VJbnQgZnJvbSAnLnBhcnNlSW50JztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBJTlRFR0VSX0QgPSAvWy0rXT8oPzowfFsxLTldW19cXGRdKikvO1xuZXhwb3J0IGNvbnN0IHsgdGVzdDogQkFEX0QgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXyg/IVxcZClgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfRF9JTlRFR0VSIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF4ke0lOVEVHRVJfRH0kYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IElTX1hPQl9JTlRFR0VSIH0gPSB0aGVSZWdFeHAoL14wKD86eFtcXGRBLUZhLWZdW19cXGRBLUZhLWZdKnxvWzAtN11bXzAtN10qfGJbMDFdW18wMV0qKSQvKTtcbmNvbnN0IHsgdGVzdDogQkFEX1hPQiB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hW1xcZEEtRmEtZl0pYC52YWx1ZU9mKCk7XG5jb25zdCBVTkRFUlNDT1JFUyA9IC9fL2c7XG5jb25zdCBVTkRFUlNDT1JFU19TSUdOID0gL198XlstK10vZztcblxuY29uc3QgSVNfSU5URUdFUiA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgID0+ICggSVNfRF9JTlRFR0VSKGxpdGVyYWwpIHx8IC8qb3B0aW9ucy54b2IgJiYgKi9JU19YT0JfSU5URUdFUihsaXRlcmFsKSApICYmICFCQURfWE9CKGxpdGVyYWwpO1xuXG5jb25zdCBCaWdJbnRJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gbGl0ZXJhbFswXT09PSctJ1xuXHRcdD8gLUJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKVxuXHRcdDogQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRvcHRpb25zLmFsbG93TG9uZ2VyXG5cdHx8XG5cdC05MjIzMzcyMDM2ODU0Nzc1ODA4bjw9YmlnSW50ICYmIGJpZ0ludDw9OTIyMzM3MjAzNjg1NDc3NTgwN24vLyAoIG1pbiA9IC0oMm4qKig2NG4tMW4pKSB8fCAtbWF4LTFuICkgPD0gbG9uZyA8PSAoIG1heCA9IDJuKiooNjRuLTFuKS0xbiB8fCAtbWluLTFuIClcblx0fHxcblx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcblxuY29uc3QgTnVtYmVySW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19JTlRFR0VSKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBkaWQgbm90IHVzZSBCaXRJbnQgbXVzdCBmaXQgTnVtYmVyLmlzU2FmZUludGVnZXIsIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBvcHRpb25zLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zLnVzaW5nQmlnSW50PT09ZmFsc2UgKSB7IHJldHVybiBOdW1iZXJJbnRlZ2VyKGxpdGVyYWwpOyB9XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciAgICAgICAgID0gcGFyc2VJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJykpO1xuXHRpZiAoIG9wdGlvbnMuSW50ZWdlck1pbk51bWJlcjw9bnVtYmVyICYmIG51bWJlcjw9b3B0aW9ucy5JbnRlZ2VyTWF4TnVtYmVyICkgeyByZXR1cm4gbnVtYmVyOyB9XG5cdGNvbnN0IGJpZ0ludCAgICAgICAgID0gbGl0ZXJhbFswXT09PSctJ1xuXHRcdD8gLUJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKVxuXHRcdDogQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRvcHRpb25zLmFsbG93TG9uZ2VyXG5cdHx8XG5cdC05MjIzMzcyMDM2ODU0Nzc1ODA4bjw9YmlnSW50ICYmIGJpZ0ludDw9OTIyMzM3MjAzNjg1NDc3NTgwN24vLyAoIG1pbiA9IC0oMm4qKig2NG4tMW4pKSB8fCAtbWF4LTFuICkgPD0gbG9uZyA8PSAoIG1heCA9IDJuKiooNjRuLTFuKS0xbiB8fCAtbWluLTFuIClcblx0fHxcblx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuY29uc3QgX05hTiA9IC1OYU47XG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElTX0ZMT0FUIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPzpcblx0XHRcXC5cXGRbX1xcZF0qXG5cdFx0KD86W2VFXVstK10/XFxkW19cXGRdKik/XG5cdHxcblx0XHRbZUVdWy0rXT9cXGRbX1xcZF0qXG5cdClcblx0JGAudmFsdWVPZigpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgeyB0ZXN0OiBJU19aRVJPIH0gPSB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC4wKyk/KD86W2VFXVstK10/MCspPyQvKTtcbmNvbnN0IHsgZXhlYzogTk9STUFMSVpFRCB9ID0gdGhlUmVnRXhwICAgKC9eWy0wXT8oXFxkKikoPzpcXC4oXFxkKykpPyg/OmVcXCs/KC0/XFxkKykpPyQvKTtcbmNvbnN0IHsgZXhlYzogT1JJR0lOQUwgfSA9IHRoZVJlZ0V4cCAgICgvXlstK10/MD8oXFxkKikoPzpcXC4oXFxkKj8pMCopPyg/OltlRV1cXCs/KC0/XFxkKykpPyQvKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIUlTX0ZMT0FUKGxpdGVyYWwpIHx8IEJBRF9EKGxpdGVyYWwpICkge1xuXHRcdGlmICggb3B0aW9ucy5zRmxvYXQgKSB7XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0XHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIF9JbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyApIHsgcmV0dXJuIE5hTjsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gX05hTjsgfVxuXHRcdH1cblx0XHR0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgRmxvYXQgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0Y29uc3Qgd2l0aG91dFVuZGVyc2NvcmVzICAgICAgICAgPSBsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSArd2l0aG91dFVuZGVyc2NvcmVzO1xuXHRpZiAoIG9wdGlvbnMuc0Vycm9yICkge1xuXHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGJlZW4gYXMgYmlnIGFzIGluZmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bnVtYmVyIHx8IElTX1pFUk8od2l0aG91dFVuZGVyc2NvcmVzKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgYmVlbiBhcyBsaXR0bGUgYXMgJHtsaXRlcmFsWzBdPT09Jy0nID8gJy0nIDogJyd9MGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgeyAxOiBub3JtYWxpemVkX2ludGVnZXIsIDI6IG5vcm1hbGl6ZWRfZnJhY3Rpb25hbCA9ICcnLCAzOiBub3JtYWxpemVkX2V4cG9uZW50ID0gJycgfSA9IE5PUk1BTElaRUQobnVtYmVyICAgICAgICkgO1xuXHRcdGNvbnN0IHsgMTogb3JpZ2luYWxfaW50ZWdlciwgMjogb3JpZ2luYWxfZnJhY3Rpb25hbCA9ICcnLCAzOiBvcmlnaW5hbF9leHBvbmVudCA9ICcnIH0gPSBPUklHSU5BTCh3aXRob3V0VW5kZXJzY29yZXMpIDtcblx0XHRvcmlnaW5hbF9pbnRlZ2VyICsgb3JpZ2luYWxfZnJhY3Rpb25hbD09PW5vcm1hbGl6ZWRfaW50ZWdlciArIG5vcm1hbGl6ZWRfZnJhY3Rpb25hbFxuXHRcdCYmXG5cdFx0b3JpZ2luYWxfZXhwb25lbnQgICAgICAgIC0gb3JpZ2luYWxfZnJhY3Rpb25hbC5sZW5ndGg9PT1ub3JtYWxpemVkX2V4cG9uZW50ICAgICAgICAtIG5vcm1hbGl6ZWRfZnJhY3Rpb25hbC5sZW5ndGhcblx0XHR8fFxuXHRcdGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBsb3N0IGl0cyBleGFjdCBhbmQgYmVlbiAke251bWJlcn1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdHJldHVybiBudW1iZXI7XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IG5ld0FycmF5LCBPRl9UQUJMRVMsIGlzQXJyYXksIGlzU3RhdGljIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgRElSRUNUTFksIElNUExJQ0lUTFksIFBBSVIsIGlzVGFibGUsIGlzSW5saW5lLCBkaXJlY3RseUlmTm90LCBmcm9tUGFpciB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZywgTXVsdGlsaW5lQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlmICggaXNUYWJsZSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KHRhYmxlKSApIHtcblx0XHRcdFx0aXNTdGF0aWModGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFwcGVuZCB2YWx1ZSB0byBTdGF0aWMgQXJyYXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgKS5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aHJvdyBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFkpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFRhYmxlID0gKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgYXNBcnJheUl0ZW0gICAgICAgICAsIHRhZyAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgbGFzdFRhYmxlICAgICAgIDtcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRsZXQgYXJyYXlPZlRhYmxlcyAgICAgICAgICAgICAgO1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7IGlzQXJyYXkoYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSkgJiYgIWlzU3RhdGljKGFycmF5T2ZUYWJsZXMpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIHB1c2ggVGFibGUgdG8gbm9uLUFycmF5T2ZUYWJsZXMgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShPRl9UQUJMRVMpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMuY29sbGVjdCh0YWcsIGFycmF5T2ZUYWJsZXMsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0YXJyYXlPZlRhYmxlc1thcnJheU9mVGFibGVzLmxlbmd0aF0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucy5UYWJsZShESVJFQ1RMWSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHtcblx0XHRcdGxhc3RUYWJsZSA9IHRhYmxlW2ZpbmFsS2V5XTtcblx0XHRcdGZyb21QYWlyKGxhc3RUYWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEga2V5L3ZhbHVlIHBhaXIgY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEgW11gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGRpcmVjdGx5SWZOb3QobGFzdFRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBUYWJsZSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHR9XG5cdHJldHVybiBsYXN0VGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlubGluZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpc1RhYmxlKHRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZnJvbVBhaXIodGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIFtdIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBjaGVja0xpdGVyYWxTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0cmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaXRlcmFsKSAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBhIExpdGVyYWwgU3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4gbGl0ZXJhbDtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25MaXRlcmFsU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsLnN0YXJ0c1dpdGgoYCcnJ2ApICkge1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLkxJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbGl0ZXJhbCBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDIpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsLnNsaWNlKDMpKTtcblx0aWYgKCAkICkge1xuXHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyA2KSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuICRbM107XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnTXVsdGktbGluZSBMaXRlcmFsIFN0cmluZycsIGxpdGVyYWwubGVuZ3RoKTtcblx0Y29uc3QgbGVhZGluZ05ld2xpbmUgPSAhKCBsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKSApO1xuXHRpZiAoIGxlYWRpbmdOZXdsaW5lICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KFsgYCcnJ2AsIGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgMykgXSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHRyZXR1cm4gJFszXTtcblx0XHR9XG5cdH1cblx0b3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID8/IHN0YXJ0Lm5vd3JhcCgpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKSBdOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaW5lKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdGNvbnN0IHZhbHVlID0gbGluZXMuam9pbihvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgKTtcblx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgKSB7XG5cdFx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdICs9IGAnJydgO1xuXHRcdFx0XHRsZWFkaW5nTmV3bGluZSA/IGxpbmVzLnVuc2hpZnQoYCcnJ2ApIDogbGluZXNbMF0gPSBgJycnJHtsaXRlcmFsfWA7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IExpdGVyYWxPYmplY3QobGluZXMsIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSB2YWx1ZTsgfVxuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcobGluZSk7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CYXNpY1N0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbC5zdGFydHNXaXRoKCdcIlwiXCInKSApIHtcblx0XHRjb25zdCBpbmRleCA9IHJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleChsaXRlcmFsKTtcblx0XHRjb25zdCB2YWx1ZSA9IEJhc2ljU3RyaW5nKGxpdGVyYWwuc2xpY2UoMSwgaW5kZXgpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCBpbmRleCArIDEpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShpbmRleCArIDEpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGxldCBsZW5ndGggPSAzICsgcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpdGVyYWwuc2xpY2UoMykpO1xuXHRpZiAoIGxpdGVyYWwubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdGNvbnN0ICQgPSBsaXRlcmFsLnNsaWNlKDMsIGxlbmd0aCk7XG5cdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgdmFsdWUgPSBCYXNpY1N0cmluZygkKSArICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnTXVsdGktbGluZSBCYXNpYyBTdHJpbmcnLCBsZW5ndGgpO1xuXHRjb25zdCBza2lwcGVkICAgICAgICA9ICggbGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMykgKSA/IDAgOiAxO1xuXHRpZiAoIHNraXBwZWQgKSB7XG5cdFx0bGl0ZXJhbCA9IHN0YXJ0Lm11c3QoKTtcblx0XHRsZXQgbGVuZ3RoID0gcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpdGVyYWwpO1xuXHRcdGlmICggbGl0ZXJhbC5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCAkID0gbGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpO1xuXHRcdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IE11bHRpbGluZUJhc2ljU3RyaW5nKCQsIG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QoWyAnXCJcIlwiJywgbGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpIF0sIHZhbHVlKSA6IHZhbHVlO1xuXHRcdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdH1cblx0b3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID8/IHN0YXJ0Lm5vd3JhcCgpO1xuXHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwgKyAnXFxuJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGxpdGVyYWwgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaW5lKTtcblx0XHRpZiAoIGxpbmUubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpbmUuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZyhsaW5lcy5qb2luKCdcXG4nKSArICdcXG4nICsgJCwgb3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICwgc2tpcHBlZCkgKyAoIGxpbmUuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaW5lLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgKSB7XG5cdFx0XHRcdHNraXBwZWQgPyBsaW5lcy51bnNoaWZ0KCdcIlwiXCInKSA6IGxpbmVzWzBdID0gYFwiXCJcIiR7bGl0ZXJhbH1gO1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gYCR7JH1cIlwiXCJgO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiBsaW5lLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSArICdcXG4nKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGxpbmU7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEtFWVMgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKG51bGwpO1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3IgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gS0VZU1trZXldID8/ICggS0VZU1trZXldID0gU3ltYm9sKGtleSkgKTtcbmV4cG9ydCBjb25zdCBjb21tZW50Rm9yVGhpcyAgICAgICAgICAgICAgICA9IFN5bWJvbCgndGhpcycpICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBpbmNsdWRlc05ld2xpbmUgfSA9IHRoZVJlZ0V4cCgvXFxyP1xcbi9nKTtcbmV4cG9ydCBjb25zdCBnZXRDT01NRU5UID0gKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleUNvbW1lbnQgICAgICAgICkgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICgga2V5Q29tbWVudCBpbiB0YWJsZSApIHtcblx0XHRjb25zdCBjb21tZW50ID0gdGFibGVba2V5Q29tbWVudF07XG5cdFx0aWYgKCB0eXBlb2YgY29tbWVudCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50IG11c3QgYmUgYSBzdHJpbmcsIHdoaWxlIFwiJHtjb21tZW50PT09bnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb21tZW50fVwiIHR5cGUgaXMgZm91bmRgKTsgfVxuXHRcdGlmICggaW5jbHVkZXNOZXdsaW5lKGNvbW1lbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgdGhlIHZhbHVlIG9mIGNvbW1lbnQgbXVzdCBiZSBhIHN0cmluZyBhbmQgY2FuIG5vdCBpbmNsdWRlIG5ld2xpbmVgKTsgfVxuXHRcdHJldHVybiBgICMke2NvbW1lbnR9YDsvLy9cblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuZXhwb3J0IGNvbnN0IGdldENvbW1lbnQgPSAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICAgICAgICAgICAgID0+IGtleSBpbiBLRVlTID8gZ2V0Q09NTUVOVCh0YWJsZSwgS0VZU1trZXldICkgOiAnJztcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vLyBleHRlcm5hbFxuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBJTkxJTkUsIERJUkVDVExZIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgbmV3QXJyYXksIFNUQVRJQ0FMTFkgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCQgfSBmcm9tICcuLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSAnLi4vdHlwZXMvSW50ZWdlcic7XG5pbXBvcnQgeyBGbG9hdCB9IGZyb20gJy4uL3R5cGVzL0Zsb2F0JztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgYXBwZW5kVGFibGUsIHByZXBhcmVUYWJsZSwgcHJlcGFyZUlubGluZVRhYmxlLCBhc3NpZ25MaXRlcmFsU3RyaW5nLCBhc3NpZ25CYXNpY1N0cmluZyB9IGZyb20gJy4vb24tdGhlLXNwb3QnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgYmVJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5cbmNvbnN0IHsgdGVzdDogSVNfT0ZGU0VUJCB9ID0gdGhlUmVnRXhwKE9GRlNFVCQpO1xuY29uc3QgeyB0ZXN0OiBJU19FTVBUWSB9ID0gdGhlUmVnRXhwKC9eXFxbW1xcdCBdKl0vKTtcblxuY29uc3QgcGFyc2VLZXlzID0gKHJlc3QgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgbGluZVJlc3QgICAgICAgICA9IHJlc3Q7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IFtdO1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAtMTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGxpbmVSZXN0IHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkgYmFyZSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nXCInICkge1xuXHRcdFx0Y29uc3QgaW5kZXggICAgICAgICA9IHJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleChsaW5lUmVzdCk7XG5cdFx0XHRsZWFkaW5nS2V5c1srK2xhc3RJbmRleF0gPSBCYXNpY1N0cmluZyhsaW5lUmVzdC5zbGljZSgxLCBpbmRleCkpO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShpbmRleCArIDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGlzUXVvdGVkID0gbGluZVJlc3RbMF09PT0nXFwnJztcblx0XHRcdGNvbnN0IGtleSAgICAgICAgID0gKCAoIGlzUXVvdGVkID8gcmVnZXhwcy5fX0xJVEVSQUxfS0VZX2V4ZWMgOiByZWdleHBzLl9fQkFSRV9LRVlfZXhlYyApKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCAke2lzUXVvdGVkID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKSApWzBdO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IGlzUXVvdGVkID8ga2V5LnNsaWNlKDEsIC0xKSA6IGtleTtcblx0XHR9XG5cdFx0aWYgKCByZWdleHBzLklTX0RPVF9LRVkobGluZVJlc3QpICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5ET1RfS0VZLCAnJyk7IH1cblx0XHRlbHNlIHsgYnJlYWs7IH1cblx0fVxuXHRpZiAoIG9wdGlvbnMuZGlzYWJsZURpZ2l0ICkge1xuXHRcdGNvbnN0IGtleXMgPSByZXN0LnNsaWNlKDAsIC1saW5lUmVzdC5sZW5ndGgpO1xuXHRcdCggcmVnZXhwcy5pc0FtYXppbmcoa2V5cykgfHwgb3B0aW9ucy5lbmFibGVOdWxsICYmIGtleXM9PT0nbnVsbCcgKSAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXJlIGtleSBkaXNhYmxlZCBieSB4T3B0aW9ucy5zdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdGlmICggb3B0aW9ucy5kaXNhbGxvd0VtcHR5S2V5ICkge1xuXHRcdGxldCBpbmRleCAgICAgICAgID0gbGFzdEluZGV4O1xuXHRcdGRvIHsgbGVhZGluZ0tleXNbaW5kZXhdICB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGtleSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7IH1cblx0XHR3aGlsZSAoIGluZGV4LS0gKTtcblx0fVxuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gbGVhZGluZ0tleXNbbGFzdEluZGV4XSA7XG5cdGxlYWRpbmdLZXlzLmxlbmd0aCA9IGxhc3RJbmRleDtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9O1xufTtcblxuY29uc3QgcHVzaCA9IChsYXN0QXJyYXkgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGlmICggbGluZVJlc3RbMF09PT0nPCcgKSB7XG5cdFx0Y29uc3QgeyAxOiB0YWcgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuX1ZBTFVFX1BBSVJfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnIGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0b3B0aW9ucy5jb2xsZWN0KHRhZywgbGFzdEFycmF5LCBudWxsKTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnXSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdGxhc3RBcnJheVtsYXN0QXJyYXkubGVuZ3RoXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcob3B0aW9ucy5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyhvcHRpb25zLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHJldHVybiBlcXVhbElubGluZVRhYmxlKG9wdGlvbnMuYXNUYWJsZXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0cmV0dXJuIGVxdWFsU3RhdGljQXJyYXkob3B0aW9ucy5hc0FycmF5cyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggbGl0ZXJhbD09PSd0cnVlJyApIHsgb3B0aW9ucy5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSB0cnVlOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsPT09J2ZhbHNlJyApIHsgb3B0aW9ucy5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBmYWxzZTsgfVxuXHRlbHNlIGlmICggb3B0aW9ucy5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IG9wdGlvbnMuYXNOdWxscyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbnVsbDsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHRvcHRpb25zLmFzT2Zmc2V0RGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHRvcHRpb25zLmFzTG9jYWxEYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRvcHRpb25zLmFzTG9jYWxUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRvcHRpb25zLmFzTG9jYWxEYXRlcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0fVxuXHRlbHNlIHtcblx0XHRsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnbicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4Jylcblx0XHRcdD8gb3B0aW9ucy5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEZsb2F0KGxpdGVyYWwpKSA6IEZsb2F0KGxpdGVyYWwpXG5cdFx0XHQ6IG9wdGlvbnMuYXNJbnRlZ2VycyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEludGVnZXIobGl0ZXJhbCkpIDogSW50ZWdlcihsaXRlcmFsKVxuXHRcdDtcblx0fVxuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5jb25zdCBlcXVhbFN0YXRpY0FycmF5ID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IHN0YXRpY0FycmF5ICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KFNUQVRJQ0FMTFkpO1xuXHRpZiAoIElTX0VNUFRZKGxpbmVSZXN0KSApIHtcblx0XHRiZUlubGluZShzdGF0aWNBcnJheSwgbGluZVJlc3RbMV09PT0nXScgPyAwIDogMyk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0LnNsaWNlKGxpbmVSZXN0LmluZGV4T2YoJ10nKSkucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnU3RhdGljIEFycmF5JywgbGluZVJlc3QubGVuZ3RoKTtcblx0bGV0IGlubGluZSAgICAgICAgICAgICAgID0gbGluZVJlc3Quc3RhcnRzV2l0aCgnWyAnKSB8fCBsaW5lUmVzdC5zdGFydHNXaXRoKCdbXFx0JykgPyAzIDogMDtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0aW5saW5lID0gbnVsbDtcblx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkge1xuXHRcdGlubGluZT09PW51bGwgfHwgYmVJbmxpbmUoc3RhdGljQXJyYXksIGlubGluZSk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGZvciAoIDsgOyApIHtcblx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gcHVzaChzdGF0aWNBcnJheSwgbGluZVJlc3QpO1xuXHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0aW5saW5lID0gbnVsbDtcblx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IGJyZWFrOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHRcdHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjdGVyIGluIHN0YXRpYyBhcnJheSBpdGVtIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdFx0fVxuXHR9XG5cdGlubGluZT09PW51bGwgfHwgYmVJbmxpbmUoc3RhdGljQXJyYXksIGlubGluZSk7XG5cdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcbn0gICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgZXF1YWxJbmxpbmVUYWJsZSA9IGZ1bmN0aW9uICogKCAgICAgICAgICAgIHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAge1xuXHRjb25zdCBpbmxpbmVUYWJsZSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShESVJFQ1RMWSwgSU5MSU5FKTtcblx0aWYgKCBvcHRpb25zLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnSW5saW5lIFRhYmxlJywgbGluZVJlc3QubGVuZ3RoKTtcblx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdGxldCBpbmxpbmUgPSB0cnVlO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQoaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRsaW5lUmVzdCA9IHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdDtcblx0XHRcdGlmICggbGluZVJlc3QgKSB7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlQ29tbWVudCApIHsgZm9yQ29tbWVudC50YWJsZVtjb21tZW50Rm9yKGZvckNvbW1lbnQuZmluYWxLZXkpXSA9IGxpbmVSZXN0LnNsaWNlKDEpOyB9XG5cdFx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdFx0ZG8geyBsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0ZG8geyBsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdH1cblx0XHRpbmxpbmUgfHwgYmVJbmxpbmUoaW5saW5lVGFibGUsIGZhbHNlKTtcblx0fVxuXHRlbHNlIHtcblx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF0hPT0nfScgKSB7XG5cdFx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRcdGxpbmVSZXN0WzBdPT09JyMnICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKEZvckNvbW1lbnQoaW5saW5lVGFibGUsIGxpbmVSZXN0KSk7XG5cdFx0XHRcdGxpbmVSZXN0ID0gKCB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3QgKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgYnJlYWs7IH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRcdGxpbmVSZXN0WzBdPT09J30nICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcbn0gICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgRm9yQ29tbWVudCA9IChsYXN0SW5saW5lVGFibGUgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcgfSA9IHsgbGluZVJlc3QgfSA9IHJlZ2V4cHMuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMocGFyc2VLZXlzKGxpbmVSZXN0KSk7XG5cdHJldHVybiB7IHRhYmxlOiBwcmVwYXJlSW5saW5lVGFibGUobGFzdElubGluZVRhYmxlLCBsZWFkaW5nS2V5cyksIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuY29uc3QgYXNzaWduID0gKHsgZmluYWxLZXksIHRhZywgbGluZVJlc3QsIHRhYmxlIH0gICAgICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0ZmluYWxLZXkgaW4gdGFibGUgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgcHJvcGVydHkgZGVmaW5pdGlvbmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggdGFnICkge1xuXHRcdG9wdGlvbnMuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ30nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBsaXRlcmFsPT09J3RydWUnICkgeyB0YWJsZVtmaW5hbEtleV0gPSB0cnVlOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsPT09J2ZhbHNlJyApIHsgdGFibGVbZmluYWxLZXldID0gZmFsc2U7IH1cblx0ZWxzZSBpZiAoIG9wdGlvbnMuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnICkgeyB0YWJsZVtmaW5hbEtleV0gPSBudWxsOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ24nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpXG5cdFx0XHQ/IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBGbG9hdChsaXRlcmFsKSkgOiBGbG9hdChsaXRlcmFsKVxuXHRcdFx0OiBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgSW50ZWdlcihsaXRlcmFsKSkgOiBJbnRlZ2VyKGxpdGVyYWwpXG5cdFx0O1xuXHR9XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICgpICAgICAgICA9PiB7XG5cdGNvbnN0IHJvb3RUYWJsZSAgICAgICAgPSBuZXcgb3B0aW9ucy5UYWJsZTtcblx0bGV0IGxhc3RTZWN0aW9uVGFibGUgICAgICAgID0gcm9vdFRhYmxlO1xuXHR3aGlsZSAoIGl0ZXJhdG9yLnJlc3QoKSApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBpdGVyYXRvci5uZXh0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0aWYgKCBsaW5lICkge1xuXHRcdFx0aWYgKCBsaW5lWzBdPT09J1snICkge1xuXHRcdFx0XHRjb25zdCB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZywgbGluZVJlc3QgfSA9IHJlZ2V4cHMuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyhsaW5lLCBwYXJzZUtleXMpO1xuXHRcdFx0XHRjb25zdCB0YWJsZSAgICAgICAgPSBwcmVwYXJlVGFibGUocm9vdFRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdFx0XHRcdGlmICggbGluZVJlc3QgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWNodG9yIGFmdGVyIHRhYmxlIGhlYWRlcmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGFzdFNlY3Rpb25UYWJsZSA9IGFwcGVuZFRhYmxlKHRhYmxlLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZyk7XG5cdFx0XHRcdG9wdGlvbnMucHJlc2VydmVDb21tZW50ICYmIGxpbmVSZXN0ICYmICggbGFzdFNlY3Rpb25UYWJsZVtjb21tZW50Rm9yVGhpc10gPSBhc0FycmF5SXRlbSA/IGxpbmVSZXN0LnNsaWNlKDEpIDogdGFibGVbY29tbWVudEZvcihmaW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSkgKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBsaW5lWzBdPT09JyMnICkge1xuXHRcdFx0XHRyZWdleHBzLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpbmUpICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGNvbW1lbnRzYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGZvckNvbW1lbnQgICAgICAgICAgICAgPSBGb3JDb21tZW50KGxhc3RTZWN0aW9uVGFibGUsIGxpbmUpO1xuXHRcdFx0XHRsZXQgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdFx0dHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyB8fCAoIHJlc3QgPSB4ICAgICAgICAocmVzdCkgKTtcblx0XHRcdFx0aWYgKCByZXN0ICkge1xuXHRcdFx0XHRcdHJlc3RbMF09PT0nIycgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWNodG9yIGFmdGVyIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gcmVzdC5zbGljZSgxKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBUZXh0RGVjb2RlciBmcm9tICcuVGV4dERlY29kZXInO1xuaW1wb3J0IGlzVmlldyBmcm9tICcuQXJyYXlCdWZmZXIuaXNWaWV3JztcbmltcG9ydCBpc0FycmF5QnVmZmVyIGZyb20gJy5jbGFzcy5pc0FycmF5QnVmZmVyJztcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXlCdWZmZXJMaWtlID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICA9PiAnYnl0ZUxlbmd0aCcgaW4gdmFsdWU7Ly8vXG5cbmNvbnN0IHRleHREZWNvZGVyID0gLyojX19QVVJFX18qL25ldyBUZXh0RGVjb2RlcigndXRmLTgnLCB7IGZhdGFsOiB0cnVlLCBpZ25vcmVCT006IGZhbHNlIH0pO1xuZXhwb3J0IGNvbnN0IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IChhcnJheUJ1ZmZlckxpa2UgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggaXNWaWV3KGFycmF5QnVmZmVyTGlrZSkgPyBhcnJheUJ1ZmZlckxpa2UubGVuZ3RoIT09YXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggOiAhaXNBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlckxpa2UpICkgeyB0aHJvdyBUeXBlRXJyb3IoYG9ubHkgVWludDhBcnJheSBvciBBcnJheUJ1ZmZlciBpcyBhY2NlcHRhYmxlYCk7IH1cblx0dHJ5IHsgcmV0dXJuIHRleHREZWNvZGVyLmRlY29kZShhcnJheUJ1ZmZlckxpa2UpOyB9XG5cdGNhdGNoIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJyk7IH1cbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBjbGVhclJlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgUm9vdCBmcm9tICcuL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgaXNBcnJheUJ1ZmZlckxpa2UsIGFycmF5QnVmZmVyTGlrZTJzdHJpbmcgfSBmcm9tICcuLi9VVEY4JztcblxuY29uc3QgeyB0ZXN0OiBJU19OT05fU0NBTEFSIH0gPSB0aGVSZWdFeHAoL1tcXHVEODAwLVxcdURGRkZdL3UpO1xuXG5sZXQgaG9sZGluZyAgICAgICAgICA9IGZhbHNlO1xuXG5jb25zdCBwYXJzZSA9IChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0aWYgKCBob2xkaW5nICkgeyB0aHJvdyBFcnJvcigncGFyc2UgZHVyaW5nIHBhcnNpbmcuJyk7IH1cblx0aG9sZGluZyA9IHRydWU7XG5cdGxldCByb290VGFibGUgICAgICAgO1xuXHRsZXQgcHJvY2VzcyAgICAgICAgICAgICAgICAgO1xuXHR0cnkge1xuXHRcdGxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcblx0XHRpZiAoIHR5cGVvZiBzb3VyY2U9PT0nb2JqZWN0JyAmJiBzb3VyY2UgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlCdWZmZXJMaWtlKHNvdXJjZSkgKSB7IHNvdXJjZSA9IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcoc291cmNlKTsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHNvdXJjZVBhdGggPSBzb3VyY2UucGF0aDtcblx0XHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlLnBhdGgpJyk7IH1cblx0XHRcdFx0Y29uc3QgeyBkYXRhLCByZXF1aXJlOiByZXEgPSB0eXBlb2YgcmVxdWlyZT09PSdmdW5jdGlvbicgPyByZXF1aXJlIDogdW5kZWZpbmVkIH0gPSBzb3VyY2U7XG5cdFx0XHRcdGlmICggcmVxICkge1xuXHRcdFx0XHRcdGNvbnN0IGRpcm5hbWVfID0gcmVxLnJlc29sdmU/LnBhdGhzPy4oJycpPy5bMF0/LnJlcGxhY2UoL25vZGVfbW9kdWxlcyQvLCAnJyk7XG5cdFx0XHRcdFx0aWYgKCBkaXJuYW1lXyApIHtcblx0XHRcdFx0XHRcdHNvdXJjZVBhdGggPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ3BhdGgnKS5yZXNvbHZlKGRpcm5hbWVfLCBzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdwYXRoJykucmVzb2x2ZSlgKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gKCByZXEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ2ZzJykucmVhZEZpbGVTeW5jKHNvdXJjZVBhdGgpO1xuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNBcnJheUJ1ZmZlckxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGFycmF5QnVmZmVyTGlrZTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKWApOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0FycmF5QnVmZmVyTGlrZShkYXRhKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YXxzb3VyY2UucmVxdWlyZSknKTsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0FycmF5QnVmZmVyTGlrZShkYXRhKSApIHsgc291cmNlID0gYXJyYXlCdWZmZXJMaWtlMnN0cmluZyhkYXRhKTsgfVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlKScpOyB9XG5cdFx0dHJ5IHtcblx0XHRcdGlmICggSVNfTk9OX1NDQUxBUihzb3VyY2UpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVuY291cGxlZCBVQ1MtNCBjaGFyYWN0ZXIgY29kZS4nKTsgfVxuXHRcdFx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J29iamVjdCcgJiYgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICkge1xuXHRcdFx0XHRpZiAoIHVzZUJpZ0ludCE9PXVuZGVmaW5lZCB8fCB4T3B0aW9ucyE9PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKCdvcHRpb25zIG1vZGUgPyBhcmdzIG1vZGUnKTsgfVxuXHRcdFx0XHRsZXQgam9pbmVyICAgICAgICAgICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ2pvaW5lcicpICkgeyBqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuam9pbmVyOyB9XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ2JpZ2ludCcpICkgeyB1c2VCaWdJbnQgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuYmlnaW50OyB9XG5cdFx0XHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ3gnKSApIHsgeE9wdGlvbnMgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIueDsgfVxuXHRcdFx0XHRtdWx0aWxpbmVTdHJpbmdKb2luZXIgPSBqb2luZXI7XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdFx0aXRlcmF0b3IudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNvdXJjZSAmJiBzb3VyY2VbMF09PT0nXFx1RkVGRicgJiYgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVE9NTCBjb250ZW50IChzdHJpbmcpIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBCT00gKFUrRkVGRilgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRcdFx0XHRwcm9jZXNzID0gb3B0aW9ucy5Qcm9jZXNzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZmluYWxseSB7IGl0ZXJhdG9yLmRvbmUoKTsgfS8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxseSB7IG9wdGlvbnMuY2xlYXIoKTsgfVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxuXHR9XG5cdGZpbmFsbHkgeyBob2xkaW5nID0gZmFsc2U7IH1cblx0cHJvY2Vzcz8uKCk7XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovYXNzaWduKFxuXHQoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBzcGVjaWZpY2F0aW9uVmVyc2lvbj09PSdudW1iZXInXG5cdFx0XHQ/IHBhcnNlKHNvdXJjZSwgc3BlY2lmaWNhdGlvblZlcnNpb24sIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucylcblx0XHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgIClcblx0LFxuXHR7XG5cdFx0JzEuMCc6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDEuMDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjQ6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC40LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjE6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHR9XG4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdCAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEVTQ0FQRUQgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKHtcblx0Li4uLyojX19QVVJFX18qL2Zyb21FbnRyaWVzKC8qI19fUFVSRV9fKi9bIC4uLkFycmF5KDB4MjApIF0ubWFwKChfLCBjaGFyQ29kZSkgPT4gWyBmcm9tQ2hhckNvZGUoY2hhckNvZGUpLCAnXFxcXHUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKSBdKSksXG5cdCdcXGInOiAnXFxcXGInLFxuXHQnXFx0JzogJ1xcXFx0Jyxcblx0J1xcbic6ICdcXFxcbicsXG5cdCdcXGYnOiAnXFxcXGYnLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1wiJzogJ1xcXFxcIicsXG5cdCdcIlwiXCInOiAnXCJcIlxcXFxcIicsXG5cdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0J1xceDdGJzogJ1xcXFx1MDA3RicsXG59KTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXltcXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdLyk7XG5leHBvcnQgY29uc3Qgc2luZ2xlbGluZVN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIE5FRURfQkFTSUModmFsdWUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xufTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lQmFzaWNTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYFwiXCJgO1xufTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9CQVNJQyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxceDdGXXwnJycvKTtcbmV4cG9ydCBjb25zdCB7IHRlc3Q6IG11bHRpbGluZU5lZWRCYXNpYyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXXwnJycvKTtcbmNvbnN0IHsgdGVzdDogUkVBTF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL14oPzpbXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiKS8pO1xuY29uc3QgZXNjYXBlX211bHRpbGluZSA9IChsaW5lcyAgICAgICAgICAsIGxpbmVJbmRleCAgICAgICAgKSA9PiB7XG5cdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdIDtcblx0aWYgKCBSRUFMX01VTFRJTElORV9FU0NBUEUobGluZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSBsaW5lLm1hdGNoKEJZX01VTFRJTElORV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdGxpbmVzW2xpbmVJbmRleF0gPSBwYXJ0cy5qb2luKCcnKTtcblx0fVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IExpbmVzID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+ICggbGluZXMgPSBbICcnLCAuLi5saW5lcyBdICAgICAgICAgICkubGVuZ3RoPT09MSA/IFsgJycsICcnIF0gOiBsaW5lcyAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZVN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGFzdEluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0bGV0IGluZGV4ID0gbGFzdEluZGV4O1xuXHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfQkFTSUMobGluZXNbaW5kZXhdICkgKSB7IGJyZWFrOyB9IH1cblx0d2hpbGUgKCAtLWluZGV4ICk7XG5cdGlmICggaW5kZXggKSB7XG5cdFx0aW5kZXggPSBsYXN0SW5kZXg7XG5cdFx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRcdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHRcdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdH1cblx0ZWxzZXsgbGluZXNbbGFzdEluZGV4XSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgRGF0YVZpZXcgZnJvbSAnLkRhdGFWaWV3JztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy5VaW50OEFycmF5JztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcbmNvbnN0IHsgdGVzdDogSU5URUdFUl9MSUtFIH0gPSB0aGVSZWdFeHAoL14tP1xcZCskLyk7XG5jb25zdCBlbnN1cmVGbG9hdCA9IChsaXRlcmFsICAgICAgICApID0+IElOVEVHRVJfTElLRShsaXRlcmFsKSA/IGxpdGVyYWwgKyAnLjAnIDogbGl0ZXJhbDtcbmNvbnN0IHVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSg4KTtcbmNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KHVpbnQ4QXJyYXkuYnVmZmVyKTtcbmNvbnN0IGlzX05hTiA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGRhdGFWaWV3LnNldEZsb2F0NjQoMCwgdmFsdWUpO1xuXHRyZXR1cm4gdWludDhBcnJheVswXT09PTB4RkY7XG59O1xuXG5leHBvcnQgY29uc3QgZmxvYXQgPSAodmFsdWUgICAgICAgICkgPT4gdmFsdWVcblx0PyB2YWx1ZT09PUluZmluaXR5ID8gJ2luZicgOiB2YWx1ZT09PV9JbmZpbml0eSA/ICctaW5mJyA6IGVuc3VyZUZsb2F0KCcnICsgdmFsdWUpXG5cdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogaXNfTmFOKHZhbHVlKSA/ICctbmFuJyA6ICduYW4nO1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBEQVRFIGZyb20gJy5EYXRlLnByb3RvdHlwZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy5jbGFzcy5pc1N0cmluZyc7XG5pbXBvcnQgaXNOdW1iZXIgZnJvbSAnLmNsYXNzLmlzTnVtYmVyJztcbmltcG9ydCBpc0JpZ0ludCBmcm9tICcuY2xhc3MuaXNCaWdJbnQnO1xuaW1wb3J0IGlzQm9vbGVhbiBmcm9tICcuY2xhc3MuaXNCb29sZWFuJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi4vcmVnZXhwcyc7XG5cbmltcG9ydCB7IGNvbW1lbnRGb3JUaGlzLCBnZXRDT01NRU5ULCBnZXRDb21tZW50IH0gZnJvbSAnLi4vdHlwZXMvY29tbWVudCc7XG5pbXBvcnQgeyBzaW5nbGVsaW5lU3RyaW5nIH0gZnJvbSAnLi9zdHJpbmcnO1xuaW1wb3J0IHsgZmxvYXQgfSBmcm9tICcuL2Zsb2F0JztcbmltcG9ydCB7IGlzU2VjdGlvbiwgb2ZJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBfbGl0ZXJhbCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuXG5jb25zdCBpc0RhdGUgPSAvKiNfX1BVUkVfXyovaXNQcm90b3R5cGVPZi5iaW5kKERBVEUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5jb25zdCB7IHRlc3Q6IEJBUkUgfSA9IHRoZVJlZ0V4cCgvXltcXHctXSskLyk7XG5jb25zdCAkS2V5JCA9IChrZXkgICAgICAgICkgICAgICAgICA9PiBCQVJFKGtleSkgPyBrZXkgOiBzaW5nbGVsaW5lU3RyaW5nKGtleSk7XG5cbmNvbnN0IEZJUlNUID0gL1teLl0rLztcbmNvbnN0IGxpdGVyYWxTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4gYCcke3ZhbHVlfSdgO1xuY29uc3QgJEtleXMgPSAoa2V5cyAgICAgICAgKSAgICAgICAgID0+IHJlZ2V4cHMuaXNBbWF6aW5nKGtleXMpID8ga2V5cy5yZXBsYWNlKEZJUlNULCBsaXRlcmFsU3RyaW5nKSA6IGtleXM9PT0nbnVsbCcgPyBgJ251bGwnYCA6IGtleXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRPTUxTZWN0aW9uIGV4dGVuZHMgQXJyYXkgICAgICAgICB7XG5cdFxuXHQgICAgICAgICAgICAgICAgIGRvY3VtZW50ICAgICAgICAgICAgICA7XG5cdFxuXHRjb25zdHJ1Y3RvciAoZG9jdW1lbnQgICAgICAgICAgICAgICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRbU3ltYm9sLnRvUHJpbWl0aXZlXSAoKSB7IHJldHVybiB0aGlzLmpvaW4odGhpcy5kb2N1bWVudC5uZXdsaW5lKTsgfVxuXHRcblx0YXBwZW5kTmV3bGluZSAoKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gJyc7IH1cblx0ICAgICAgICBzZXQgYXBwZW5kTGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aF0gPSBzb3VyY2U7IH1cblx0ICAgICAgICBzZXQgYXBwZW5kSW5saW5lIChzb3VyY2UgICAgICAgICkgeyB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gKz0gc291cmNlOyB9ICAgXG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZUlmIChzb3VyY2UgICAgICAgICkgeyBzb3VyY2UgJiYgKCB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gKz0gc291cmNlICk7IH0vLy9cblx0XG5cdCogYXNzaWduQmxvY2sgICAgICAgICAgICAgICAgICAgICAgICAgICAoZG9jdW1lbnRLZXlzXyAgICAgICAgICAgICAgICAgICAsIHNlY3Rpb25LZXlzXyAgICAgICAgICAgICAgICAgICwgdGFibGUgICAsIHRhYmxlS2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgIHtcblx0XHRjb25zdCB7IGRvY3VtZW50IH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgbmV3bGluZVVuZGVySGVhZGVyLCBuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciB9ID0gZG9jdW1lbnQ7XG5cdFx0Y29uc3QgbmV3bGluZUFmdGVyRG90dGVkID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCA6IGZhbHNlO1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlclBhaXIgPSBzZWN0aW9uS2V5c18gPyBkb2N1bWVudC5uZXdsaW5lVW5kZXJEb3R0ZWQgOiBkb2N1bWVudC5uZXdsaW5lVW5kZXJQYWlyO1xuXHRcdGZvciAoIGNvbnN0IHRhYmxlS2V5IG9mIHRhYmxlS2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IHRhYmxlW3RhYmxlS2V5XSA7XG5cdFx0XHRjb25zdCAka2V5JCA9ICRLZXkkKHRhYmxlS2V5KTtcblx0XHRcdGNvbnN0IGRvY3VtZW50S2V5cyA9IGRvY3VtZW50S2V5c18gKyAka2V5JDtcblx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSB2YWx1ZTtcblx0XHRcdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHRcdFx0bGV0IGZpcnN0SXRlbSA9IHZhbHVlWzBdO1xuXHRcdFx0XHRcdGlmICggaXNTZWN0aW9uKGZpcnN0SXRlbSkgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB0YWJsZUhlYWRlciA9IGBbWyR7ZG9jdW1lbnRLZXlzfV1dYCAgICAgICAgIDtcblx0XHRcdFx0XHRcdGNvbnN0IGRvY3VtZW50S2V5c18gPSBkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgO1xuXHRcdFx0XHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdFx0XHRcdGxldCB0YWJsZSAgICAgICAgICAgICAgICAgPSBmaXJzdEl0ZW07XG5cdFx0XHRcdFx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5hcHBlbmRTZWN0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25bMF0gPSB0YWJsZUhlYWRlciArIGdldENPTU1FTlQodGFibGUsIGNvbW1lbnRGb3JUaGlzKTtcblx0XHRcdFx0XHRcdFx0aWYgKCBuZXdsaW5lVW5kZXJIZWFkZXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzXywgYGAsIHRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHRhYmxlKSk7XG5cdFx0XHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0yICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzXywgYGAsIHRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHRhYmxlKSk7XG5cdFx0XHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCArK2luZGV4PT09bGVuZ3RoICkgeyBicmVhazsgfVxuXHRcdFx0XHRcdFx0XHR0YWJsZSA9ICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2luZGV4XSA7XG5cdFx0XHRcdFx0XHRcdGlmICggIWlzU2VjdGlvbih0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgdGhlIGZpcnN0IHRhYmxlIGl0ZW0gbWFya2VkIGJ5IFNlY3Rpb24oKSBtZWFucyB0aGUgcGFyZW50IGFycmF5IGlzIGFuIGFycmF5IG9mIHRhYmxlcywgd2hpY2ggY2FuIG5vdCBpbmNsdWRlIG90aGVyIHR5cGVzIG9yIHRhYmxlIG5vdCBtYXJrZWQgYnkgU2VjdGlvbigpIGFueSBtb3JlIGluIHRoZSByZXN0IGl0ZW1zYCk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHsgbGV0IGluZGV4ID0gMTsgd2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHsgaWYgKCBpc1NlY3Rpb24odmFsdWVbaW5kZXgrK10gKSApIHsgdGhyb3cgVHlwZUVycm9yKGBpZiBhbiBhcnJheSBpcyBub3QgYXJyYXkgb2YgdGFibGVzLCBpdCBjYW4gbm90IGluY2x1ZGUgYW55IHRhYmxlIHRoYXQgbWFya2VkIGJ5IFNlY3Rpb24oKWApOyB9IH0gfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBpc1NlY3Rpb24odmFsdWUpICkge1xuXHRcdFx0XHRcdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5hcHBlbmRTZWN0aW9uKCk7XG5cdFx0XHRcdFx0c2VjdGlvblswXSA9IGBbJHtkb2N1bWVudEtleXN9XSR7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5wcmVmZXJDb21tZW50Rm9yVGhpc1xuXHRcdFx0XHRcdFx0XHQ/IGdldENPTU1FTlQodmFsdWUsIGNvbW1lbnRGb3JUaGlzKSB8fCBnZXRDb21tZW50KHRhYmxlLCB0YWJsZUtleSlcblx0XHRcdFx0XHRcdFx0OiBnZXRDb21tZW50KHRhYmxlLCB0YWJsZUtleSkgfHwgZ2V0Q09NTUVOVCh2YWx1ZSwgY29tbWVudEZvclRoaXMpXG5cdFx0XHRcdFx0fWA7XG5cdFx0XHRcdFx0aWYgKCBuZXdsaW5lVW5kZXJIZWFkZXIgKSB7XG5cdFx0XHRcdFx0XHRzZWN0aW9uWzFdID0gJyc7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0yICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgYGAsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKSk7XG5cdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IHNlY3Rpb25LZXlzID0gc2VjdGlvbktleXNfICsgJGtleSQ7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSAkS2V5cyhzZWN0aW9uS2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZSgnJywgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0eWllbGQgdGhpcy5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlKTtcblx0XHRcdFx0bmV3bGluZUFmdGVyRG90dGVkICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KHRhYmxlLCB0YWJsZUtleSk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlclBhaXIgJiYgdGhpcy5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHQgICAgICAgIHZhbHVlIChpbmRlbnQgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgLCByZXR1cm5WYWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSAgICAgICAgICkgICAgICAgICAgICAgICAgICB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0aWYgKCB2YWx1ZT09PW51bGwgKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmRvY3VtZW50Lm51bGxEaXNhYmxlZCApIHsgdGhyb3cgVHlwZUVycm9yKGB0b21sIGNhbiBub3Qgc3RyaW5naWZ5IFwibnVsbFwiIHR5cGUgdmFsdWUgd2l0aG91dCB0cnV0aHkgb3B0aW9ucy54TnVsbGApOyB9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnbnVsbCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW5saW5lTW9kZSA9IG9mSW5saW5lKHZhbHVlKTtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRpbmxpbmVNb2RlPT09dW5kZWZpbmVkXG5cdFx0XHRcdFx0XHQ/IHRoaXMuc3RhdGljQXJyYXkoaW5kZW50LCB2YWx1ZSlcblx0XHRcdFx0XHRcdDogdGhpcy5zaW5nbGVsaW5lQXJyYXkoaW5kZW50LCB2YWx1ZSwgdGhpcy5kb2N1bWVudC4kc2luZ2xlbGluZUFycmF5ID8/IGlubGluZU1vZGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaW5saW5lTW9kZSE9PXVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRpbmxpbmVNb2RlIHx8IHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVEaXNhYmxlZFxuXHRcdFx0XHRcdFx0PyB0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApXG5cdFx0XHRcdFx0XHQ6IHRoaXMubXVsdGlsaW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpcy5kb2N1bWVudC5tdWx0aWxpbmVUYWJsZUNvbW1hKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlzRGF0ZSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB2YWx1ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoJ1QnLCB0aGlzLmRvY3VtZW50LlQpLnJlcGxhY2UoJ1onLCB0aGlzLmRvY3VtZW50LlopO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggX2xpdGVyYWwgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGl0ZXJhbCA9ICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClbX2xpdGVyYWxdO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGxpdGVyYWw9PT0nc3RyaW5nJyApIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSBsaXRlcmFsOyB9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gbGl0ZXJhbDtcblx0XHRcdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGxpdGVyYWxbMF07XG5cdFx0XHRcdFx0XHRcdGxldCBpbmRleCA9IDE7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IHRoaXMuYXBwZW5kTGluZSA9IGxpdGVyYWxbaW5kZXgrK10gOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBsaXRlcmFsIHZhbHVlIGlzIGJyb2tlbmApOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYGxpdGVyYWwgdmFsdWUgaXMgYnJva2VuYCk7IH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlzU3RyaW5nKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgU3RyaW5nXWApOyB9XG5cdFx0XHRcdGlmICggaXNOdW1iZXIodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBOdW1iZXJdYCk7IH1cblx0XHRcdFx0aWYgKCBpc0JpZ0ludCh2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJpZ0ludF1gKTsgfVxuXHRcdFx0XHRpZiAoIGlzQm9vbGVhbih2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJvb2xlYW5dYCk7IH1cblx0XHRcdFx0aWYgKCByZXR1cm5WYWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFx0aWYgKCBrZXlzLmxlbmd0aCApIHsgcmV0dXJuIGtleXM7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuaW5saW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdiaWdpbnQnOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcnICsgdmFsdWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB0aGlzLmRvY3VtZW50LmFzSW50ZWdlcih2YWx1ZSkgPyBpcyh2YWx1ZSwgLTApID8gJy0wJyA6ICcnICsgdmFsdWUgOiBmbG9hdCh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBzaW5nbGVsaW5lU3RyaW5nKHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdib29sZWFuJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKGB0b21sIGNhbiBub3Qgc3RyaW5naWZ5IFwiJHt0eXBlb2YgdmFsdWV9XCIgdHlwZSB2YWx1ZWApO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRcblx0ICAgICAgICBzaW5nbGVsaW5lQXJyYXkgKGluZGVudCAgICAgICAgLCBzdGF0aWNBcnJheSAgICAgICAgICAgICAgICAgICAgICAsIGlubGluZU1vZGUgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0gc3RhdGljQXJyYXk7XG5cdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIxMCA/ICdbICcgOiAnWyc7XG5cdFx0XHR0aGlzLnZhbHVlKGluZGVudCwgc3RhdGljQXJyYXlbMF0gLCBmYWxzZSk7XG5cdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnO1xuXHRcdFx0XHR0aGlzLnZhbHVlKGluZGVudCwgc3RhdGljQXJyYXlbaW5kZXgrK10gLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIxMCA/ICcgXScgOiAnXSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIwMSA/ICdbIF0nIDogJ1tdJzsgfVxuXHR9XG5cdCAgICAgICAgc3RhdGljQXJyYXkgKGluZGVudCAgICAgICAgLCBzdGF0aWNBcnJheSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHR0aGlzLmFwcGVuZElubGluZSA9ICdbJztcblx0XHRjb25zdCBpbmRlbnRfID0gaW5kZW50ICsgdGhpcy5kb2N1bWVudC5pbmRlbnQ7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudF87XG5cdFx0XHR0aGlzLnZhbHVlKGluZGVudF8sIHN0YXRpY0FycmF5W2luZGV4KytdICwgZmFsc2UpO1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnLCc7XG5cdFx0fVxuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICddJztcblx0fVxuXHRcblx0ICAgICAgICBpbmxpbmVUYWJsZSAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdGNvbnN0IGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKTtcblx0XHRpZiAoIGtleXMubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyAnO1xuXHRcdFx0dGhpcy5hc3NpZ25JbmxpbmUoaW5kZW50LCBpbmxpbmVUYWJsZSwgYGAsIGtleXMpO1xuXHRcdFx0dGhpc1t0aGlzLmxlbmd0aCAtIDFdID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdIC5zbGljZSgwLCAtMikgKyAnIH0nO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSAneyB9JzsgfVxuXHR9XG5cdCAgICAgICAgbXVsdGlsaW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICAsIGNvbW1hICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyc7XG5cdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCBpbmxpbmVUYWJsZSwgYGAsIGdldE93blByb3BlcnR5TmFtZXMoaW5saW5lVGFibGUpLCBjb21tYSk7XG5cdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50ICsgJ30nO1xuXHR9XG5cdCAgICAgICAgYXNzaWduSW5saW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICwga2V5c18gICAgICAgICAgICAgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBrZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gaW5saW5lVGFibGVba2V5XSA7XG5cdFx0XHRjb25zdCBrZXlzID0ga2V5c18gKyAkS2V5JChrZXkpO1xuXHRcdFx0Y29uc3QgYmVmb3JlX3ZhbHVlID0gdGhpcy5hcHBlbmRJbmxpbmUgPSAkS2V5cyhrZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKGluZGVudCwgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aCAtIDFdID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdIC5zbGljZSgwLCAtYmVmb3JlX3ZhbHVlLmxlbmd0aCk7XG5cdFx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIGtleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnOyB9XG5cdFx0fVxuXHR9XG5cdCAgICAgICAgYXNzaWduTXVsdGlsaW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICwga2V5c18gICAgICAgICAgICAgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICApIHtcblx0XHRjb25zdCBpbmRlbnRfID0gaW5kZW50ICsgdGhpcy5kb2N1bWVudC5pbmRlbnQ7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfICsgJEtleXMoa2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZShpbmRlbnRfLCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR0aGlzLmFzc2lnbk11bHRpbGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUsIGNvbW1hKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb21tYVxuXHRcdFx0XHRcdD8gdGhpcy5hcHBlbmRJbmxpbmUgPSAnLCcgKyBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpXG5cdFx0XHRcdFx0OiB0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudChpbmxpbmVUYWJsZSwga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IE1BWF9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NQVhfU0FGRV9JTlRFR0VSJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBUT01MU2VjdGlvbiBmcm9tICcuL3NlY3Rpb24nO1xuXG5jb25zdCBuYW1lMmNvZGUgPSAvKiNfX1BVUkVfXyovTnVsbCh7XG5cdGRvY3VtZW50OiAwLFxuXHRzZWN0aW9uOiAxLFxuXHRoZWFkZXI6IDIsXG5cdHBhaXJzOiAzLFxuXHRwYWlyOiA0LFxufSAgICAgICAgICk7XG5cbmNvbnN0IHsgdGVzdDogSVNfSU5ERU5UIH0gPSB0aGVSZWdFeHAoL15bXFx0IF0qJC8pO1xuXG5jb25zdCByZXR1cm5fZmFsc2UgPSAoKSA9PiBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTERvY3VtZW50IGV4dGVuZHMgQXJyYXkgICAgICAgICAgICAgIHtcblx0XG5cdCAgICAgICAgIGdldCBbJ2NvbnN0cnVjdG9yJ10gKCkgeyByZXR1cm4gQXJyYXk7IH1cblx0XG5cdDAgPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7XG5cdFxuXHQgICAgICAgICBhc0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHJldHVybl9mYWxzZTtcblx0ICAgICAgICAgbmV3bGluZSAgICAgICAgICAgICAgICAgICAgID0gJyc7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclNlY3Rpb24gICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICAgICAgICAgO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJIZWFkZXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckRvdHRlZCAgICAgICAgIDtcblx0ICAgICAgICAgaW5kZW50ICAgICAgICAgPSAnXFx0Jztcblx0ICAgICAgICAgVCAgICAgICAgICAgICAgICAgID0gJ1QnO1xuXHQgICAgICAgICBaICAgICAgICAgICAgPSAnWic7XG5cdCAgICAgICAgIG51bGxEaXNhYmxlZCAgICAgICAgICA9IHRydWU7XG5cdCAgICAgICAgIG11bHRpbGluZVRhYmxlRGlzYWJsZWQgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZUNvbW1hICAgICAgICAgIDtcblx0ICAgICAgICAgcHJlZmVyQ29tbWVudEZvclRoaXMgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgJHNpbmdsZWxpbmVBcnJheSAgICAgICAgICAgICAgICA7XG5cdFxuXHRjb25zdHJ1Y3RvciAob3B0aW9ucyAgICAgICAgICAgICAgICAgICkge1xuXHRcdFxuXHRcdHN1cGVyKCk7XG5cdFx0XG5cdFx0Y29uc3QgaW50ZWdlciA9IG9wdGlvbnM/LmludGVnZXI7XG5cdFx0aWYgKCBpbnRlZ2VyPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggaW50ZWdlcj09PU1BWF9TQUZFX0lOVEVHRVIgKSB7IHRoaXMuYXNJbnRlZ2VyID0gaXNTYWZlSW50ZWdlcjsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW50ZWdlcj09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbnRlZ2VyKSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgYSBzYWZlIGludGVnZXJgKTsgfVxuXHRcdFx0Y29uc3QgbWF4ID0gaW50ZWdlcj49MCA/IGludGVnZXIgOiAtaW50ZWdlciAtIDE7XG5cdFx0XHRjb25zdCBtaW4gPSBpbnRlZ2VyPj0wID8gLWludGVnZXIgOiBpbnRlZ2VyO1xuXHRcdFx0dGhpcy5hc0ludGVnZXIgPSAobnVtYmVyICAgICAgICApID0+IGlzU2FmZUludGVnZXIobnVtYmVyKSAmJiBtaW48PW51bWJlciAmJiBudW1iZXI8PW1heDtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgbnVtYmVyYCk7IH1cblx0XHRcblx0XHRjb25zdCBuZXdsaW5lID0gb3B0aW9ucz8ubmV3bGluZTtcblx0XHRpZiAoIG5ld2xpbmU9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBuZXdsaW5lPT09J1xcbicgfHwgbmV3bGluZT09PSdcXHJcXG4nICkgeyB0aGlzLm5ld2xpbmUgPSBuZXdsaW5lOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyB0eXBlb2YgbmV3bGluZT09PSdzdHJpbmcnXG5cdFx0XHRcdD8gU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZX0pIGNhbiBvbmx5IGJlIHZhbGlkIFRPTUwgbmV3bGluZWApXG5cdFx0XHRcdDogVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSBzdHJpbmdgKTtcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3QgcHJlZmVyQ29tbWVudEZvciA9IG9wdGlvbnM/LnByZWZlckNvbW1lbnRGb3I7XG5cdFx0aWYgKCBwcmVmZXJDb21tZW50Rm9yPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggcHJlZmVyQ29tbWVudEZvcj09PSd0aGlzJyB8fCBwcmVmZXJDb21tZW50Rm9yPT09J2tleScgKSB7IHRoaXMucHJlZmVyQ29tbWVudEZvclRoaXMgPSBwcmVmZXJDb21tZW50Rm9yPT09J3RoaXMnOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtwcmVmZXJDb21tZW50Rm9yKSBjYW4gb25seSBiZSAna2V5JyBvciAndGhpcydgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IGFyb3VuZCA9IG5hbWUyY29kZVtvcHRpb25zPy5uZXdsaW5lQXJvdW5kID8/ICdoZWFkZXInXSA/PyBuYW1lMmNvZGUuaGVhZGVyO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0XG5cdFx0Y29uc3QgaW5kZW50ID0gb3B0aW9ucz8uaW5kZW50O1xuXHRcdGlmICggaW5kZW50PT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggdHlwZW9mIGluZGVudD09PSdzdHJpbmcnICkge1xuXHRcdFx0aWYgKCAhSVNfSU5ERU5UKGluZGVudCkgKSB7IHRocm93IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBvbmx5IGluY2x1ZGUgVGFiIG9yIFNwYWNlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gaW5kZW50O1xuXHRcdH1cblx0XHRlbHNlIGlmICggdHlwZW9mIGluZGVudD09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbmRlbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudDoke2luZGVudH19KSBpcyBvdXQgb2YgcmFuZ2VgKTsgfVxuXHRcdFx0dGhpcy5pbmRlbnQgPSAnICcucmVwZWF0KGluZGVudCk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50fSkgY2FuIG5vdCBiZSBcIiR7dHlwZW9mIGluZGVudH1cIiB0eXBlYCk7IH1cblx0XHRcblx0XHRjb25zdCBUID0gb3B0aW9ucz8uVDtcblx0XHRpZiAoIFQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBUPT09JyAnIHx8IFQ9PT0ndCcgfHwgVD09PSdUJyApIHsgdGhpcy5UID0gVDsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7VH0pIGNhbiBvbmx5IGJlIFwiVFwiIG9yIFwiIFwiIG9yIFwidFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCBaID0gb3B0aW9ucz8uWjtcblx0XHRpZiAoIFo9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBaPT09J3onIHx8IFo9PT0nWicgKSB7IHRoaXMuWiA9IFo7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse1p9KSBjYW4gb25seSBiZSBcIlpcIiBvciBcInpcImApOyB9XG5cdFx0XG5cdFx0aWYgKCBvcHRpb25zPy54TnVsbCApIHsgdGhpcy5udWxsRGlzYWJsZWQgPSBmYWxzZTsgfVxuXHRcdFxuXHRcdGNvbnN0IHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZSA9IG9wdGlvbnM/LnhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZTtcblx0XHRpZiAoIHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PScnIHx8IHhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZT09PScsJyApIHtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZUNvbW1hID0gISF4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7eEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlfSkgY2FuIG9ubHkgYmUgXCJcIiBvciBcIixcImApOyB9XG5cdFx0XG5cdFx0Y29uc3QgJHNpbmdsZWxpbmVBcnJheSA9IG9wdGlvbnM/LmZvcmNlSW5saW5lQXJyYXlTcGFjaW5nO1xuXHRcdHN3aXRjaCAoICRzaW5nbGVsaW5lQXJyYXkgKSB7XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdHRoaXMuJHNpbmdsZWxpbmVBcnJheSA9ICRzaW5nbGVsaW5lQXJyYXk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgdHlwZW9mICRzaW5nbGVsaW5lQXJyYXk9PT0nbnVtYmVyJ1xuXHRcdFx0XHRcdD8gUmFuZ2VFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSAwIHwgMSB8IDIgfCAzLCBub3QgaW5jbHVkaW5nICR7JHNpbmdsZWxpbmVBcnJheX1gKVxuXHRcdFx0XHRcdDogVHlwZUVycm9yKGBhcnJheSBpbmxpbmUgbW9kZSBtdXN0IGJlIFwibnVtYmVyXCIgdHlwZSwgbm90IGluY2x1ZGluZyAkeyRzaW5nbGVsaW5lQXJyYXk9PT1udWxsID8gJ1wibnVsbFwiJyA6IHR5cGVvZiAkc2luZ2xlbGluZUFycmF5fWApO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdGhpcztcblx0XHRcblx0fVxuXHRcblx0YXBwZW5kU2VjdGlvbiAoKSB7IHJldHVybiB0aGlzW3RoaXMubGVuZ3RoXSA9IG5ldyBUT01MU2VjdGlvbih0aGlzKTsgfVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy8gZXh0ZXJuYWxcblxuaW1wb3J0IFRPTUxEb2N1bWVudCBmcm9tICcuL2RvY3VtZW50JztcbmV4cG9ydCBkZWZhdWx0IChyb290VGFibGUgICAgICAgICAgICAgICAgLCBvcHRpb25zICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBkb2N1bWVudCA9IG5ldyBUT01MRG9jdW1lbnQob3B0aW9ucyk7XG5cdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudFswXTtcblx0c2VjdGlvblswXSA9ICcnO1xuXHR4ICAgICAgKHNlY3Rpb24uYXNzaWduQmxvY2soYGAsIGBgLCByb290VGFibGUsIGdldE93blByb3BlcnR5TmFtZXMocm9vdFRhYmxlKSkpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTEgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdGRvY3VtZW50Lm5ld2xpbmVVbmRlclNlY3Rpb24gfHwgZG9jdW1lbnRbZG9jdW1lbnQubGVuZ3RoIC0gMV0gLmFwcGVuZE5ld2xpbmUoKTtcblx0cmV0dXJuIGRvY3VtZW50Lm5ld2xpbmUgPyBkb2N1bWVudC5qb2luKGRvY3VtZW50Lm5ld2xpbmUpIDogZG9jdW1lbnQuZmxhdCgpO1xufTtcblxuZXhwb3J0IHsgaW5saW5lLCBTZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuZXhwb3J0IHsgX2xpdGVyYWwgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IG11bHRpbGluZVRhYmxlLCBtdWx0aWxpbmVBcnJheSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IHNpbmdsZWxpbmVCYXNpY1N0cmluZywgTGluZXMsIG11bHRpbGluZVN0cmluZywgbXVsdGlsaW5lQmFzaWNTdHJpbmcsIG11bHRpbGluZUxpdGVyYWxTdHJpbmcsIG11bHRpbGluZU5lZWRCYXNpYyB9IGZyb20gJy4vc3RyaW5nJztcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IG11bHRpbGluZSA9ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RyaW5nICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gTGl0ZXJhbE9iamVjdCgoIG11bHRpbGluZU5lZWRCYXNpYyh2YWx1ZSkgPyBtdWx0aWxpbmVCYXNpY1N0cmluZyA6IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgKSgoICdcXG4nICsgdmFsdWUgKS5zcGxpdCgnXFxuJykgICAgICAgICApLCB2YWx1ZSkgOlxuXHRcdFx0aXNBcnJheSh2YWx1ZSkgPyBMaXRlcmFsT2JqZWN0KG11bHRpbGluZVN0cmluZyhMaW5lcyh2YWx1ZSkpLCB0eXBlb2Ygc3RyaW5nPT09J3N0cmluZycgPyBzdHJpbmcgOiBOdWxsKG51bGwpKSA6XG5cdFx0XHRcdG11bHRpbGluZVRhYmxlKHZhbHVlKTtcblx0bXVsdGlsaW5lLmJhc2ljID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RyaW5nICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBsaW5lcz09PSdzdHJpbmcnXG5cdFx0XHQ/IExpdGVyYWxPYmplY3QobXVsdGlsaW5lQmFzaWNTdHJpbmcoKCAnXFxuJyArIGxpbmVzICkuc3BsaXQoJ1xcbicpICAgICAgICAgKSwgbGluZXMpXG5cdFx0XHQ6IExpdGVyYWxPYmplY3QobXVsdGlsaW5lQmFzaWNTdHJpbmcoTGluZXMobGluZXMpKSwgdHlwZW9mIHN0cmluZz09PSdzdHJpbmcnID8gc3RyaW5nIDogTnVsbChudWxsKSlcblx0O1xuXHRtdWx0aWxpbmUuYXJyYXkgPSBtdWx0aWxpbmVBcnJheTtcblx0ZnJlZXplKG11bHRpbGluZSk7XG5cdHJldHVybiBtdWx0aWxpbmU7XG59ICkoKTtcbmV4cG9ydCBjb25zdCBiYXNpYyA9ICh2YWx1ZSAgICAgICAgKSA9PiBMaXRlcmFsT2JqZWN0KHNpbmdsZWxpbmVCYXNpY1N0cmluZyh2YWx1ZSksIHZhbHVlKTtcbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAuLi5jaGFycyAgICAgICAgICApID0+IHtcblx0aWYgKCB0eXBlb2YgbGl0ZXJhbD09PSdzdHJpbmcnICkge1xuXHRcdGlmICggY2hhcnMubGVuZ3RoPT09MSApIHtcblx0XHRcdHJldHVybiBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuaW5jbHVkZXMoJ1xcbicpID8gbGl0ZXJhbC5zcGxpdCgnXFxuJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsaXRlcmFsLCBjaGFyc1swXSAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsZXQgaW5kZXggPSBjaGFycy5sZW5ndGg7XG5cdFx0aWYgKCBpbmRleCApIHtcblx0XHRcdGNvbnN0IHsgcmF3IH0gPSBsaXRlcmFsO1xuXHRcdFx0bGl0ZXJhbCA9IHJhd1tpbmRleF0gO1xuXHRcdFx0d2hpbGUgKCBpbmRleCApIHsgY2hhcnNbLS1pbmRleF0gKz0gcmF3W2luZGV4XSA7IH1cblx0XHRcdGxpdGVyYWwgPSBjaGFycy5qb2luKCcnKSArIGxpdGVyYWw7XG5cdFx0fVxuXHRcdGVsc2UgeyBsaXRlcmFsID0gbGl0ZXJhbC5yYXdbMF0gOyB9XG5cdH1cblx0cmV0dXJuIExpdGVyYWxPYmplY3QobGl0ZXJhbC5pbmNsdWRlcygnXFxuJykgPyBsaXRlcmFsLnNwbGl0KCdcXG4nKSAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxpdGVyYWwsIE51bGwobnVsbCkpO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5cbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5pbXBvcnQgc3RyaW5naWZ5LCB7IFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCB9IGZyb20gJy4vc3RyaW5naWZ5Lyc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUgfSBmcm9tICcuL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IGlzSW5saW5lLCBpc1NlY3Rpb24gfSBmcm9tICcuL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzIH0gZnJvbSAnLi90eXBlcy9jb21tZW50JztcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwsIGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG59KTtcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcblx0U2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsLCBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyxcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxuXHRpc0lubGluZSwgaXNTZWN0aW9uLFxufTtcbiJdLCJuYW1lcyI6WyJQcm94eSIsIk9iamVjdF9mcmVlemUiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwic2V0X2hhcyIsInNldF9hZGQiLCJkZWwiLCJOdWxsIiwib3JkZXJpZnlfTnVsbCIsIml0ZXJhdG9yLnRocm93cyIsIml0ZXJhdG9yLndoZXJlIiwiZ2V0Iiwic2V0IiwiY3JlYXRlIiwicmVnZXhwcy5zd2l0Y2hSZWdFeHAiLCJPYmplY3QiLCJmcmVlemUiLCJvd25LZXlzIiwib3B0aW9ucy56ZXJvRGF0ZXRpbWUiLCJwYXJzZSIsIm9wdGlvbnMubXVzdFNjYWxhciIsIml0ZXJhdG9yLmxpbmVJbmRleCIsIlVOREVSU0NPUkVTIiwib3B0aW9ucy5hbGxvd0xvbmdlciIsIm9wdGlvbnMudXNpbmdCaWdJbnQiLCJvcHRpb25zLkludGVnZXJNaW5OdW1iZXIiLCJvcHRpb25zLkludGVnZXJNYXhOdW1iZXIiLCJOYU4iLCJfSW5maW5pdHkiLCJvcHRpb25zLnNGbG9hdCIsIm9wdGlvbnMuc0Vycm9yIiwib3B0aW9ucy5UYWJsZSIsIm9wdGlvbnMuY29sbGVjdCIsInJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QiLCJyZWdleHBzLkxJVEVSQUxfU1RSSU5HX2V4ZWMiLCJvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCIsInJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMiLCJpdGVyYXRvci5tYXJrIiwib3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nIiwicmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4IiwicmVnZXhwcy5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCIsInJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJyZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyIsInJlZ2V4cHMuX19CQVJFX0tFWV9leGVjIiwicmVnZXhwcy5JU19ET1RfS0VZIiwicmVnZXhwcy5ET1RfS0VZIiwib3B0aW9ucy5kaXNhYmxlRGlnaXQiLCJyZWdleHBzLmlzQW1hemluZyIsIm9wdGlvbnMuZW5hYmxlTnVsbCIsIm9wdGlvbnMuZGlzYWxsb3dFbXB0eUtleSIsInJlZ2V4cHMuX1ZBTFVFX1BBSVJfZXhlYyIsIm9wdGlvbnMuYXNTdHJpbmdzIiwib3B0aW9ucy5pbmxpbmVUYWJsZSIsIm9wdGlvbnMuYXNUYWJsZXMiLCJvcHRpb25zLmFzQXJyYXlzIiwicmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMiLCJvcHRpb25zLmFzQm9vbGVhbnMiLCJvcHRpb25zLmFzTnVsbHMiLCJvcHRpb25zLmFzT2Zmc2V0RGF0ZVRpbWVzIiwib3B0aW9ucy5tb3JlRGF0ZXRpbWUiLCJvcHRpb25zLmFzTG9jYWxEYXRlVGltZXMiLCJvcHRpb25zLmFzTG9jYWxUaW1lcyIsIm9wdGlvbnMuYXNMb2NhbERhdGVzIiwib3B0aW9ucy5hc0Zsb2F0cyIsIm9wdGlvbnMuYXNJbnRlZ2VycyIsInJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UiLCJvcHRpb25zLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEiLCJvcHRpb25zLnByZXNlcnZlQ29tbWVudCIsInJlZ2V4cHMuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJpdGVyYXRvci5yZXN0IiwiaXRlcmF0b3IubmV4dCIsInJlZ2V4cHMuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyIsIm9wdGlvbnMudXNlIiwiaXRlcmF0b3IudG9kbyIsIm9wdGlvbnMuUHJvY2VzcyIsIml0ZXJhdG9yLmRvbmUiLCJvcHRp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RUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3RMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDcEwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFdBQVcsU0FBUyxxQkFBcUIsUUFBUSx3QkFBd0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNwTCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsV0FBVyxTQUFTLHFCQUFxQixRQUFRLHdCQUF3QixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3BMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixXQUFXLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDcEwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFdBQVcsU0FBUyxxQkFBcUIsUUFBUSx3QkFBd0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNwTCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsV0FBVyxTQUFTLHFCQUFxQixRQUFRLHdCQUF3QixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3BMLEVBQUU7QUFDRixDQUFDOztBQy9GRCxNQUFNLE9BQU8sZ0JBQWdCeEUsTUFBSSxTQUFTO0FBQzFDLENBQUMsZ0JB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