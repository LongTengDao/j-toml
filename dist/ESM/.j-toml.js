﻿/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.37.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';
import BigInt from '.BigInt?';
import RegExp from '.RegExp';
import WeakMap from '.WeakMap';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import Object_create from '.Object.create';
import isSafeInteger from '.Number.isSafeInteger';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import freeze$1 from '.Object.freeze';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import undefined$1 from '.undefined';
import NULL from '.null.prototype';
import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import create from '.Object.create?=';
import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import set_del from '.WeakSet.prototype.delete';
import Null$1 from '.null';
import Proxy$1 from '.Proxy';
import Object_assign from '.Object.assign';
import Object_defineProperty from '.Object.defineProperty';
import hasOwn from '.Object.hasOwn?=';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import Reflect_ownKeys from '.Reflect.ownKeys';
import map_has from '.WeakMap.prototype.has';
import map_del from '.WeakMap.prototype.delete';
import isArray$1 from '.Array.isArray';
import isView from '.ArrayBuffer.isView';
import isArrayBuffer from '.class.isArrayBuffer';
import TextDecoder from '.TextDecoder';
import Symbol$1 from '.Symbol';
import Object$1 from '.Object';
import NativeDate from '.Date';
import parse$2 from '.Date.parse';
import floor from '.Math.floor';
import preventExtensions from '.Object.preventExtensions';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import defineProperties from '.null.defineProperties';
import parseInt from '.parseInt';
import fromCharCode from '.String.fromCharCode';
import fromCodePoint from '.String.fromCodePoint';
import isFinite from '.isFinite';
import Infinity from '.Infinity';
import NaN$1 from '.NaN';
import Array from '.Array';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import DATE$1 from '.Date.prototype';
import is from '.Object.is';
import isString from '.class.isString';
import isNumber from '.class.isNumber';
import isBigInt from '.class.isBigInt';
import isBoolean from '.class.isBoolean';
import Object_fromEntries from '.Object.fromEntries';
import Float64Array from '.Float64Array';
import Uint8Array from '.Uint8Array';
import Default from '.default';

const version = '1.37.0';

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

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = /*#__PURE__*/create(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index] ); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(1));
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
	if ( typeof path!=='string' ) { throw TypeError(`TOML.parse({ path })`); }
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
	nowrap (            argsMode                 )        {
		throw throws(Error(`TOML.parse(${argsMode ? `${argsMode}multilineStringJoiner` : `,{ joiner }`}) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
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
	if ( lineRest && lineRest[0]==='<' ) { ( { 1: tag, 2: lineRest } = TAG_REST_exec(lineRest) || throws(SyntaxError(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
};

const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest }                                                               )                                                                             => {
	const { 1: tag = '' } = { 2: lineRest } = KEY_VALUE_PAIR_exec(lineRest) || throws(SyntaxError(`Keys must equal something` + where(', but missing at ')));
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

let ARGS_MODE                  = '';

/* options */

let useWhatToJoinMultilineString                = null;
let usingBigInt                 = true;
let IntegerMinNumber         = 0;
let IntegerMaxNumber         = 0;

              

                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
	                  
	                   
  
const ANY       = {
	test: () => true,
};
                       
	                                                    
 
const Keys = class KeysRegExp extends RegExp                 {
	                                   
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
const isKeys = /*#__PURE__*/isPrototypeOf.bind(/*#__PURE__*/freeze$1(Keys.prototype))                                               ;
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

                  

                                            
let processor             = null;
let each              = null;
           
	                                                                                                      
	                                                                                                      
	                                                                                                      
 
const collect_on = (tag        , array              , table              , key         )       => {
	const _each = Object_create(NULL)                                                                                                 ;
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
const collect_off = ()        => { throw throws(SyntaxError(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
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
			throw RangeError(`TOML.parse(,specificationVersion)`);
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE}multilineStringJoiner` : `,{ joiner }`})`); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`); }
		usingBigInt = null;
		useBigInt>=0
			? IntegerMinNumber = -( IntegerMaxNumber = useBigInt )
			: IntegerMaxNumber = -( IntegerMinNumber = useBigInt ) - 1;
	}
	if ( !BigInt && usingBigInt!==false ) { throw Error(`Can't work without TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`}) being set to false, because the host doesn't have BigInt support`); }
	
	if ( keys==null ) { KEYS$1 = ANY; }
	else {
		if ( !isKeys(keys) ) { throw TypeError(`TOML.parse(,{ keys })`); }
		KEYS$1 = keys;
	}
	
	if ( xOptions==null ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( typeof xOptions!=='object' ) {
		throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`})`);
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, string, literal, tag, ...unknown } = xOptions;
		const unknownNames = getOwnPropertyNames(unknown);
		if ( unknownNames.length ) { throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,{ ${unknownNames.join(', ')} }` : `,{ x: { ${unknownNames.join(', ')} } }`})`); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
		disableDigit = !!string;
		preserveLiteral = !!literal;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,{ tag }` : `,{ x: { tag } }`})`); }
			if ( !mixed ) { throw TypeError(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`}) xOptions.tag needs at least TOML 1.0 to support mixed type array`); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

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

const { exec: OFFSET_DATETIME_exec } = /*#__PURE__*/newRegExp`
	^
	${YMD}
	[Tt ]
	${HMS}
	(?:\.\d{1,3}(\d*?)0*)?
	(?:[Zz]|[+-]${_23_}:${_59_})
	$`.valueOf();

const { exec: OFFSET_DATETIME_ZERO_exec } = /*#__PURE__*/newRegExp`
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

const DATE             = /*#__PURE__*/defineProperties(new NativeDate(0), /*#__PURE__*/getOwnPropertyDescriptors(NativeDate.prototype));

const OffsetDateTime_ISOString                = Symbol$1('OffsetDateTime_ISOString')       ;
const OffsetDateTime_value                = Symbol$1('OffsetDateTime_value')       ;
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
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
	
	get [Symbol$1.toStringTag] () { return 'OffsetDateTime'         ; }
	
	         valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		validateLeap(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		const with60 = literal.startsWith('60', 17);
		let without60 = with60 ? literal.slice(0, 17) + '59' + literal.slice(19) : literal;
		const { 1: more = '' } = ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec(without60) : OFFSET_DATETIME_exec(without60) ) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		const time = parse$2(without60 = without60.replace(T, 'T').replace('z', 'Z'));
		if ( with60 ) {
			DATE.setTime(time);
			VALIDATE_LEAP(DATE.toISOString()) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
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
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString]        ;
	[LocalDateTime_value]       ;
	
	get [Symbol$1.toStringTag] () { return 'LocalDateTime'         ; }
	
	         valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && validateLeap(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal}` + where(' at ')));
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
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDate_ISOString].slice(end)
	);
};
const LocalDate = /*#__PURE__*/fpc(class LocalDate extends Datetime {
	
	[LocalDate_ISOString]        ;
	[LocalDate_value]       ;
	
	get [Symbol$1.toStringTag] () { return 'LocalDate'         ; }
	
	         valueOf (               )        { return this[LocalDate_value]; }
	toISOString (               )         { return this[LocalDate_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATE(literal) && validateLeap(literal) || throws(SyntaxError(`Invalid Local Date ${literal}` + where(' at ')));
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
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + string.padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
};
const LocalTime = /*#__PURE__*/fpc(class LocalTime extends Datetime {
	
	[LocalTime_ISOString]        ;
	[LocalTime_value]       ;
	
	get [Symbol$1.toStringTag] () { return 'LocalTime'         ; }
	
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

const MIN         = BigInt && -/*#__PURE__*/BigInt('0x8000000000000000');// -(2n**(64n-1n)) || -MAX-1n
const MAX         = BigInt && /*#__PURE__*/BigInt('0x7FFFFFFFFFFFFFFF');// 2n**(64n-1n)-1n || -MIN-1n

const BigIntInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const bigInt         = literal[0]==='-'
		? -BigInt(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger || MIN<=bigInt && bigInt<=MAX || throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
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
	allowLonger || MIN<=bigInt && bigInt<=MAX || throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
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
		const $ = LITERAL_STRING_exec(literal) || throws(SyntaxError(`Bad literal string` + where(' at ')));
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
	useWhatToJoinMultilineString===null && start.nowrap(ARGS_MODE);
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
	useWhatToJoinMultilineString===null && start.nowrap(ARGS_MODE);
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
const commentFor = (key        )         => KEYS[key] || ( KEYS[key] = Symbol$1(key) );
const commentForThis                = Symbol$1('this')       ;

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
			KEYS$1.test(leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index))) || throws(Error(`Key not allowed` + where(' at ')));
			lineRest = lineRest.slice(index + 1);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key         = ( ( isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec )(lineRest) || throws(SyntaxError(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			KEYS$1.test(leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key) || throws(Error(`Key not allowed` + where(' at ')));
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
		const { 1: tag } = { 2: lineRest } = _VALUE_PAIR_exec(lineRest) || throws(SyntaxError(`Bad tag ` + where(' at ')));
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
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) || throws(SyntaxError(`Bad atom value` + where(' at ')));
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
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) || throws(SyntaxError(`Bad atom value` + where(' at ')));
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

const float64Array = new Float64Array([ NaN$1 ]);
const uint8Array = new Uint8Array(float64Array.buffer);
const NaN_7 = uint8Array[7] ;

const float = NaN_7===new Uint8Array(new Float64Array([ -NaN$1 ]).buffer)[7] 
	? (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan'
	: (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : ( float64Array[0] = value, uint8Array[7] )===NaN_7 ? 'nan' : '-nan';

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
					if ( inlineMode===undefined$1 ) { this.staticArray(indent, value); }
					else {
						const { $singlelineArray = inlineMode } = this.document;
						this.singlelineArray(indent, value, $singlelineArray);
					}
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
	        multilineTable (indent        , inlineTable                      , comma                     ) {
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
	        assignMultiline                                 (indent        , inlineTable   , keys_                   , keys                            , comma                     ) {
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
			if ( !isSafeInteger(integer) ) { throw RangeError(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError(`TOML.stringify(,{integer}) can only be number`); }
		
		const { newline } = options;
		if ( newline===undefined ) ;
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		
		const { preferCommentFor } = options;
		if ( preferCommentFor===undefined ) ;
		else if ( preferCommentFor==='this' || preferCommentFor==='key' ) { this.preferCommentForThis = preferCommentFor==='this'; }
		else { throw TypeError(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
		
		const { [options.newlineAround || 'header']: around = name2code.header } = name2code;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		
		const { indent } = options;
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
		
		const { T } = options;
		if ( T===undefined ) ;
		else if ( T===' ' || T==='t' || T==='T' ) { this.T = T; }
		else { throw TypeError(`TOML.stringify(,{T}) can only be "T" or " " or "t"`); }
		
		const { Z } = options;
		if ( Z===undefined ) ;
		else if ( Z==='z' || Z==='Z' ) { this.Z = Z; }
		else { throw TypeError(`TOML.stringify(,{Z}) can only be "Z" or "z"`); }
		
		if ( options.xNull ) { this.nullDisabled = false; }
		
		const { xBeforeNewlineInMultilineTable } = options;
		if ( xBeforeNewlineInMultilineTable===undefined ) ;
		else if ( xBeforeNewlineInMultilineTable==='' || xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
		}
		else { throw TypeError(`TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`); }
		
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
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`)
					: TypeError(`array inline mode must be "number" type, not including ${$singlelineArray===null ? '"null"' : typeof $singlelineArray}`);
		}
		
		return this;
		
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

const linesFromStringify = new WeakSet                   ();
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

const textDecoder = /*#__PURE__*/new TextDecoder('utf-8', Null$1({ fatal: true, ignoreBOM: false }));
const binary2string = (arrayBufferLike                          )         => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.`); }
};
const isBinaryLike = (value        )                                    => 'byteLength' in value;///

const { test: includesNonScalar } = theRegExp(/[\uD800-\uDFFF]/u);
const assertFulScalar = (string        )       => {
	if ( clearRegExp$1(includesNonScalar(string)) ) { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.`); }
};

let holding          = false;

const parse = (source        , specificationVersion                                   , multilineStringJoiner                                                                                                                       , bigint                                       , x                              , argsMode                 )        => {
	let sourcePath         = '';
	if ( typeof source==='object' && source ) {
		if ( isArray$1(source) ) { throw TypeError(isLinesFromStringify(source) ? `TOML.parse(array from TOML.stringify(,{newline?}))` : `TOML.parse(array)`); }
		else if ( isBinaryLike(source) ) { source = binary2string(source); }
		else {
			sourcePath = source.path;
			if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.path)`); }
			const { data, require: req = typeof require==='function' ? require : undefined$1 } = source;
			if ( req ) {
				const { resolve } = req;
				if ( resolve!=null ) {
					const { paths } = resolve;
					if ( paths!=null ) {
						const ret = Reflect_apply(paths, resolve, [ '' ]);
						if ( ret!=null ) {
							const val = ret[0];
							if ( val!=null ) {
								const dirname_ = val.replace(/node_modules$/, '');
								if ( dirname_ ) {
									sourcePath = ( req                                          )('path').resolve(dirname_, sourcePath);
									if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.require('path').resolve)`); }
								}
							}
						}
					}
				}
				if ( data===undefined$1 ) {
					const data = ( req                                      )('fs').readFileSync(sourcePath);
					if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
					else { throw TypeError(`TOML.parse(source.require('fs').readFileSync)`); }
				}
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
			else {
				if ( data===undefined$1 ) { throw TypeError(`TOML.parse(source.data|source.require)`); }
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
		}
	}
	else if ( typeof source==='string' ) { assertFulScalar(source); }
	else { throw TypeError(`TOML.parse(source)`); }
	let joiner                    ;
	let keys                                 ;
	if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
		if ( bigint!==undefined$1 || x!==undefined$1 ) { throw TypeError(`options mode ? args mode`); }
		joiner = multilineStringJoiner.joiner;
		bigint = multilineStringJoiner.bigint;
		keys = multilineStringJoiner.keys;
		x = multilineStringJoiner.x;
		argsMode = '';
	}
	else { joiner = multilineStringJoiner; }
	let rootTable       ;
	let process                 ;
	if ( holding ) { throw Error(`parsing during parsing.`); }
	holding = true;
	try {
		use(specificationVersion, joiner, bigint, keys, x, argsMode);
		todo(source, sourcePath);
		source && source[0]==='\uFEFF' && throws(TypeError(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')));
		rootTable = Root();
		process = Process();
	}
	finally {
		done();//clearWeakSets();
		clear();
		holding = false;
		clearRegExp$1();
	}
	process && process();
	return rootTable;
};

const parse$1 = /*#__PURE__*/Object_assign(
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

export { Keys, LocalDate, LocalDateTime, LocalTime, OffsetDateTime, Section, basic, commentFor, commentForThis, _export as default, inline, isInline, isSection, literal, multiline, parse$1 as parse, stringify, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2dyb3VwaWZ5LnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvbm9uLWF0b20udHMiLCJ0eXBlcy9UYWJsZS50cyIsIml0ZXJhdG9yLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjM3LjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovX19QVVJFX18ocmUpOyB9O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gIVU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9ICFJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/ICFNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/ICFTIDogbnVsbDtcblx0cmV0dXJuIHJlO1xufVxuXG52YXIgUkVfYmluZCA9IGJpbmQgJiYgLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWluY2x1ZGVzKGZsYWdzLCAndScpLFxuXHRcdEk6ICFpbmNsdWRlcyhmbGFncywgJ2knKSxcblx0XHRNOiAhaW5jbHVkZXMoZmxhZ3MsICdtJyksXG5cdFx0UzogIWluY2x1ZGVzKGZsYWdzLCAncycpLFxuXHRcdGZsYWdzOiBmbGFnc1xuXHR9O1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IC8qI19fUFVSRV9fKi9Db250ZXh0KCcnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlcblx0PyAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChSRSwgdGhpc0FyZywgYXJncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhcHBseShSRSwgQ09OVEVYVCwgYXJncyk7IH1cblx0XHQsXG5cdFx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdFx0LFxuXHRcdGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdCxcblx0XHRwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0fSlcblx0OiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdFJFLmFwcGx5ID0gUkUuYXBwbHk7XG5cdFx0dmFyIG5ld1JlZ0V4cCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KENPTlRFWFQsIGFyZ3VtZW50cyAgICAgICApOyB9ICAgICAgIDtcblx0XHR2YXIgZCA9IDE7XG5cdFx0dmFyIGcgPSBkKjI7XG5cdFx0dmFyIGkgPSBnKjI7XG5cdFx0dmFyIG0gPSBpKjI7XG5cdFx0dmFyIHMgPSBpKjI7XG5cdFx0dmFyIHUgPSBzKjI7XG5cdFx0dmFyIHkgPSB1KjI7XG5cdFx0dmFyIGZsYWdzID0geSoyIC0gMTtcblx0XHR3aGlsZSAoIGZsYWdzLS0gKSB7XG5cdFx0XHQoIGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHRcdG5ld1JlZ0V4cFtjb250ZXh0LmZsYWdzXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICApOyB9O1xuXHRcdFx0fSApKENvbnRleHQoXG5cdFx0XHRcdCggZmxhZ3MgJiBkID8gJycgOiAnZCcgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBnID8gJycgOiAnZycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBpID8gJycgOiAnaScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBtID8gJycgOiAnbScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBzID8gJycgOiAncycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB1ID8gJycgOiAndScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB5ID8gJycgOiAneScgKVxuXHRcdFx0KSk7XG5cdFx0fVxuXHRcdHJldHVybiBmcmVlemUgPyBmcmVlemUobmV3UmVnRXhwKSA6IG5ld1JlZ0V4cDtcblx0fSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gLyojX19QVVJFX18qL2NyZWF0ZShOVUxMKSAgICAgICAgIDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSApOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0gLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcgKyBjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyICsgc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyYWN0ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdICA6ICdbJyArIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykgKyAnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyArIGJyYW5jaGVzLmpvaW4oJ3wnKSArICcpJ1xuXHRcdClcblx0XHQrICggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHsgcGF0aCB9KWApOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY2xhc3MgbWFyayB7XG5cdCAgICAgICAgICAgICAgICAgbGluZUluZGV4ID0gbGluZUluZGV4O1xuXHQgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICAgICAgICAgIHJlc3RDb2x1bW4gICAgICAgIDtcblx0Y29uc3RydWN0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCByZXN0Q29sdW1uICAgICAgICApIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMucmVzdENvbHVtbiA9IHJlc3RDb2x1bW47XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0bXVzdCAoICAgICAgICAgICkgICAgICAgICB7XG5cdFx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7dGhpcy50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0XHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblx0fVxuXHRub3dyYXAgKCAgICAgICAgICAgIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdFx0dGhyb3cgdGhyb3dzKEVycm9yKGBUT01MLnBhcnNlKCR7YXJnc01vZGUgPyBgJHthcmdzTW9kZX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCByb3dJbmRleCAgICAgICAgID0gbGluZUluZGV4LCBjb2x1bW5OdW1iZXIgICAgICAgICA9IDApICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7cm93SW5kZXggKyAxfToke2NvbHVtbk51bWJlcn0pYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtyb3dJbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW3Jvd0luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBWQUxVRV9SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IExJVEVSQUxfU1RSSU5HX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5jb25zdCB7IGV4ZWM6IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYC52YWx1ZU9mKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCB7IGV4ZWM6IEtFWV9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogX1ZBTFVFX1BBSVJfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IFRBR19SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJdK3xcXFxcLj98XCIoPyFcIlwiKVwiPy9zeSk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAvKk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9ICovMDtcblx0d2hpbGUgKCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy50ZXN0KF8pICkgeyBsYXN0SW5kZXggPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0cmV0dXJuIGxhc3RJbmRleDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBUYWIgXFw8d3M+bmV3bGluZVxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIG5vdCBcXDx3cz5uZXdsaW5lXG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vLyBvcD9cblxuY29uc3QgQkFTSUNfU1RSSU5HX1RBQl9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5leHBvcnRcbmNvbnN0IHsgdGVzdDogSVNfRE9UX0tFWSB9ID0gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCB7IGV4ZWM6IEJBUkVfS0VZX1NUUklDVCB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKy8pO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9GUkVFIH0gPSB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5jb25zdCB7IGV4ZWM6IExJVEVSQUxfS0VZX19fXyB9ID0gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9ERUwgfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLyk7XG5leHBvcnRcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdCggbGluZVJlc3QubGVuZ3RoPjEgPyBsaW5lUmVzdFsxXT09PSddJz09PWFzQXJyYXlJdGVtIDogIWFzQXJyYXlJdGVtICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgYnV0IG1pc3NpbmcgYXQgJykpKTtcblx0dGFnIHx8IGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCB7IHRlc3Q6IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pO1xuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLyk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRiWzAxXVtfMDFdKlxuXHRcdHxcblx0XHRcdG9bMC03XVtfMC03XSpcblx0XHR8XG5cdFx0XHR4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qXG5cdFx0fFxuXHRcdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdFx0KVxuXHR8XG5cdFx0WzEtOV1bX1xcZF0qXG5cdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdHxcblx0XHRpbmZcblx0fFxuXHRcdG5hblxuXHQpXG5gLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfQU1BWklORyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IEJBRF9EWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmV4cG9ydCBjb25zdCBpc0FtYXppbmcgPSAoa2V5cyAgICAgICAgKSAgICAgICAgICA9PiBJU19BTUFaSU5HKGtleXMpICYmICFCQURfRFhPQihrZXlzKTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50Pyc7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyBQbGFpblRhYmxlLCBPcmRlcmVkVGFibGUgfSBmcm9tICcuL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuL3JlZ2V4cHMnO1xuXG5leHBvcnQgbGV0IG11c3RTY2FsYXIgICAgICAgICAgPSB0cnVlO1xuXG5leHBvcnQgbGV0IEFSR1NfTU9ERSAgICAgICAgICAgICAgICAgID0gJyc7XG5cbi8qIG9wdGlvbnMgKi9cblxuZXhwb3J0IGxldCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbk51bWJlciAgICAgICAgID0gMDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heE51bWJlciAgICAgICAgID0gMDtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gIFxuY29uc3QgQU5ZICAgICAgID0ge1xuXHR0ZXN0OiAoKSA9PiB0cnVlLFxufTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbmV4cG9ydCBjb25zdCBLZXlzID0gY2xhc3MgS2V5c1JlZ0V4cCBleHRlbmRzIFJlZ0V4cCAgICAgICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoa2V5cyAgICAgICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcihgXiR7Z3JvdXBpZnkoa2V5cyl9JGApO1xuXHRcdGxldCBtYXhMZW5ndGggPSAtMTtcblx0XHRmb3IgKCBsZXQgaW5kZXggPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXNbLS1pbmRleF0gO1xuXHRcdFx0aWYgKCBsZW5ndGg+bWF4TGVuZ3RoICkgeyBtYXhMZW5ndGggPSBsZW5ndGg7IH1cblx0XHR9XG5cdFx0dGhpcy5sYXN0SW5kZXggPSBtYXhMZW5ndGgrMTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQgICAgICAgICB0ZXN0ICggICAgICAgICAgICAgICAgICBrZXkgICAgICAgICkgICAgICAgICAge1xuXHRcdHJldHVybiBrZXkubGVuZ3RoPHRoaXMubGFzdEluZGV4ICYmIHN1cGVyLnRlc3Qoa2V5KTtcblx0fVxufTtcbmNvbnN0IGlzS2V5cyA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoLyojX19QVVJFX18qL2ZyZWV6ZShLZXlzLnByb3RvdHlwZSkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IEtFWVMgICAgICAgPSBBTlk7XG5leHBvcnQgbGV0IHByZXNlcnZlTGl0ZXJhbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0xvbmdlciAgICAgICAgIDtcbmV4cG9ydCBsZXQgZW5hYmxlTnVsbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSAgICAgICAgIDtcbmV4cG9ydCBsZXQgcHJlc2VydmVDb21tZW50ICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhYmxlRGlnaXQgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvci50aHJvd3MoVHlwZUVycm9yKGBUeXBlcyBpbiBBcnJheSBtdXN0IGJlIHNhbWVgICsgaXRlcmF0b3Iud2hlcmUoJy4gQ2hlY2sgJykpKVxuXHRcdFx0OiBhcnJheVR5cGVzX3NldChhcnJheSwgYXMpO1xuXHRcdHJldHVybiBhcnJheTtcblx0fTtcblx0cmV0dXJuIGFzO1xufTtcbmNvbnN0IEFTX1RZUEVEID0ge1xuXHRhc051bGxzOiBBcygpLFxuXHRhc1N0cmluZ3M6IEFzKCksXG5cdGFzVGFibGVzOiBBcygpLFxuXHRhc0FycmF5czogQXMoKSxcblx0YXNCb29sZWFuczogQXMoKSxcblx0YXNGbG9hdHM6IEFzKCksXG5cdGFzSW50ZWdlcnM6IEFzKCksXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZXM6IEFzKCksXG5cdGFzTG9jYWxUaW1lczogQXMoKSxcbn07XG5jb25zdCBhc01peGVkICAgICA9IChhcnJheSAgICAgICApICAgICAgICA9PiBhcnJheTtcbmV4cG9ydCBsZXRcblx0YXNOdWxscyAgICAsXG5cdGFzU3RyaW5ncyAgICAsXG5cdGFzVGFibGVzICAgICxcblx0YXNBcnJheXMgICAgLFxuXHRhc0Jvb2xlYW5zICAgICxcblx0YXNGbG9hdHMgICAgLFxuXHRhc0ludGVnZXJzICAgICxcblx0YXNPZmZzZXREYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVzICAgICxcblx0YXNMb2NhbFRpbWVzICAgIDtcblxuICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbmxldCBlYWNoICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuY29uc3QgY29sbGVjdF9vbiA9ICh0YWcgICAgICAgICwgYXJyYXkgICAgICAgICAgICAgICwgdGFibGUgICAgICAgICAgICAgICwga2V5ICAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IF9lYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2VhY2guX2xpbmtlZCA9IGVhY2g7XG5cdF9lYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRfZWFjaC50YWJsZSA9IHRhYmxlO1xuXHRcdF9lYWNoLmtleSA9IGtleSA7XG5cdH1cblx0aWYgKCBhcnJheSApIHtcblx0XHRfZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdF9lYWNoLmluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXHR9XG5cdGVhY2ggPSBfZWFjaDtcbn07XG5jb25zdCBjb2xsZWN0X29mZiA9ICgpICAgICAgICA9PiB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH07XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCBQcm9jZXNzID0gKCkgICAgICAgICAgPT4ge1xuXHRpZiAoIGVhY2ggKSB7XG5cdFx0Y29uc3QgX3Byb2Nlc3NvciA9IHByb2Nlc3NvciA7XG5cdFx0bGV0IF9lYWNoICAgICAgICAgICAgICA9IGVhY2g7XG5cdFx0ZWFjaCA9IG51bGw7XG5cdFx0cmV0dXJuICgpICAgICAgID0+IHtcblx0XHRcdGNvbnN0IHByb2Nlc3NvciA9IF9wcm9jZXNzb3I7XG5cdFx0XHRsZXQgZWFjaCAgICAgICAgICAgICAgPSBfZWFjaCA7XG5cdFx0XHRfZWFjaCA9IG51bGw7XG5cdFx0XHRkbyB7IHByb2Nlc3NvcihlYWNoKTsgfVxuXHRcdFx0d2hpbGUgKCBlYWNoID0gZWFjaC5fbGlua2VkICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0S0VZUyA9IEFOWTtcblx0dXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IHByb2Nlc3NvciA9IGVhY2ggPSBudWxsO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCBrZXlzICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAsIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdEFSR1NfTU9ERSA9IGFyZ3NNb2RlO1xuXHRcblx0bGV0IG1peGVkICAgICAgICAgO1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0bXVzdFNjYWxhciA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRtdXN0U2NhbGFyID0gZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdG11c3RTY2FsYXIgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5wYXJzZSgsc3BlY2lmaWNhdGlvblZlcnNpb24pYCk7XG5cdH1cblx0cmVnZXhwcy5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0ZWxzZSBpZiAoIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PXVuZGVmaW5lZCApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG51bGw7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pYCk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KWApOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSx1c2VCaWdJbnRgIDogYCx7IGJpZ2ludCB9YH0pYCk7IH1cblx0XHR1c2luZ0JpZ0ludCA9IG51bGw7XG5cdFx0dXNlQmlnSW50Pj0wXG5cdFx0XHQ/IEludGVnZXJNaW5OdW1iZXIgPSAtKCBJbnRlZ2VyTWF4TnVtYmVyID0gdXNlQmlnSW50IClcblx0XHRcdDogSW50ZWdlck1heE51bWJlciA9IC0oIEludGVnZXJNaW5OdW1iZXIgPSB1c2VCaWdJbnQgKSAtIDE7XG5cdH1cblx0aWYgKCAhQmlnSW50ICYmIHVzaW5nQmlnSW50IT09ZmFsc2UgKSB7IHRocm93IEVycm9yKGBDYW4ndCB3b3JrIHdpdGhvdXQgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KSBiZWluZyBzZXQgdG8gZmFsc2UsIGJlY2F1c2UgdGhlIGhvc3QgZG9lc24ndCBoYXZlIEJpZ0ludCBzdXBwb3J0YCk7IH1cblx0XG5cdGlmICgga2V5cz09bnVsbCApIHsgS0VZUyA9IEFOWTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoICFpc0tleXMoa2V5cykgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgseyBrZXlzIH0pYCk7IH1cblx0XHRLRVlTID0ga2V5cztcblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCApIHtcblx0XHRUYWJsZSA9IFBsYWluVGFibGU7XG5cdFx0c0Vycm9yID0gYWxsb3dMb25nZXIgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IGZhbHNlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHhPcHRpb25zIT09J29iamVjdCcgKSB7XG5cdFx0dGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseE9wdGlvbnNgIDogYCx7IHggfWB9KWApO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgY29tbWVudCwgc3RyaW5nLCBsaXRlcmFsLCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGNvbnN0IHVua25vd25OYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXModW5rbm93bik7XG5cdFx0aWYgKCB1bmtub3duTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx7ICR7dW5rbm93bk5hbWVzLmpvaW4oJywgJyl9IH1gIDogYCx7IHg6IHsgJHt1bmtub3duTmFtZXMuam9pbignLCAnKX0gfSB9YH0pYCk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRwcmVzZXJ2ZUNvbW1lbnQgPSAhIWNvbW1lbnQ7XG5cdFx0ZGlzYWJsZURpZ2l0ID0gISFzdHJpbmc7XG5cdFx0cHJlc2VydmVMaXRlcmFsID0gISFsaXRlcmFsO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseyB0YWcgfWAgOiBgLHsgeDogeyB0YWcgfSB9YH0pYCk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx4T3B0aW9uc2AgOiBgLHsgeCB9YH0pIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXlgKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5cbmNvbnN0IHByZXZpb3VzICAgICAgICAgICAgICAgID0gU3ltYm9sKCdwcmV2aW91cycpICAgICAgIDtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuICBcblxuZXhwb3J0IGNvbnN0IHggPSAgICAgKHJvb3RTdGFjayAgICAgICkgICAgPT4ge1xuXHRsZXQgc3RhY2sgICAgICAgID0gcm9vdFN0YWNrO1xuXHRsZXQgcmVzdWx0ID0gc3RhY2submV4dCgpO1xuXHRpZiAoICFyZXN1bHQuZG9uZSApIHtcblx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRpZiAoIHJlc3VsdC5kb25lICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrPT09cm9vdFN0YWNrICkgeyBicmVhazsgfVxuXHRcdFx0XHRzdGFjayA9IHN0YWNrW3ByZXZpb3VzXSA7XG5cdFx0XHRcdHJlc3VsdCA9IHN0YWNrLm5leHQocmVzdWx0LnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0XHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQudmFsdWU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0IFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCBjb25zdCBfbGl0ZXJhbCAgICAgICAgICAgICAgICA9IFN5bWJvbCgnX2xpdGVyYWwnKSAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBMaXRlcmFsT2JqZWN0ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxpdGVyYWwgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0Y29uc3Qgb2JqZWN0ID0gT2JqZWN0KHZhbHVlKSAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0b2JqZWN0W19saXRlcmFsXSA9IGxpdGVyYWw7XG5cdHJldHVybiBvYmplY3Q7XG59O1xuIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IGFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgYXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChhcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoYXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBPRl9UQUJMRVMgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBTVEFUSUNBTExZID0gdHJ1ZTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBzdGF0aWNhbEFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoc3RhdGljYWxBcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzU3RhdGljID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHN0YXRpY2FsQXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbmV3QXJyYXkgPSAoaXNTdGF0aWMgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGFycmF5ICAgICAgICA9IFtdO1xuXHRhcnJheXNfYWRkKGFycmF5KTtcblx0aXNTdGF0aWMgJiYgc3RhdGljYWxBcnJheXNfYWRkKGFycmF5KTtcblx0cmV0dXJuIGFycmF5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgTmF0aXZlRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLkRhdGUucGFyc2UnO1xuaW1wb3J0IGZsb29yIGZyb20gJy5NYXRoLmZsb29yJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuLy8vaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLm51bGwuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5cbmNvbnN0IGZwYyA9ICAgICAgICAgICAgICAgICAgICAgIChjICAgKSAgICA9PiB7XG5cdGZyZWV6ZShmcmVlemUoYykucHJvdG90eXBlKTtcblx0cmV0dXJuIGM7XG59O1xuXG5jb25zdCBfMjlfID0gLyg/OjBbMS05XXwxXFxkfDJcXGQpLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KVxuYC52YWx1ZU9mKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5gLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86W1p6XXxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgeyBleGVjOiBaX2V4ZWMgfSA9IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZHsxLDN9KFxcZCo/KTAqKT9cblx0KD86W1p6XXxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCgpXG5cdFtael1cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEVUSU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9EQVRFIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfVElNRSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgVCA9IC9bIHRdLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IFpFUk8gPSAvXFwuKFxcZCo/KTArJC87XG5jb25zdCB6ZXJvUmVwbGFjZXIgPSAobWF0Y2ggICAgICAgICwgcDEgICAgICAgICkgPT4gcDE7XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgemVyb1JlcGxhY2VyKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgZCA9IC8uL2dzO1xuY29uc3QgZDJ1ID0gKGQgICAgICAgICkgPT4gJ1xcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDknW2QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA7XG5jb25zdCBWYWx1ZU9GRlNFVCA9ICh0aW1lICAgICAgICAsIG1vcmUgICAgICAgICkgICAgICAgID0+IHRpbWU8MFxuXHQ/ICggJycgKyAoIHRpbWUgKyA2MjE2NzMwNTU0MDAwMCApICkucmVwbGFjZShkLCBkMnUpLnBhZFN0YXJ0KDE0LCAnXFx1MjAwMCcpICsgbW9yZS5yZXBsYWNlKGQsIGQydSkgKyB0aW1lXG5cdDogbW9yZVxuXHRcdD8gKCB0aW1lICsgJy4nICkucGFkU3RhcnQoMTYsICcwJykgKyBtb3JlXG5cdFx0OiAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpO1xuXG5jb25zdCB2YWxpZGF0ZUxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbC5zdGFydHNXaXRoKCcwMi0yOScsIDUpICkge1xuXHRcdGNvbnN0IHllYXIgICAgICAgICA9ICtsaXRlcmFsLnNsaWNlKDAsIDQpO1xuXHRcdHJldHVybiAoXG5cdFx0XHR5ZWFyICYgMGIxMSA/IGZhbHNlIDpcblx0XHRcdFx0eWVhciUxMDAgPyB0cnVlIDpcblx0XHRcdFx0XHR5ZWFyJTQwMCA/IGZhbHNlIDpcblx0XHRcdFx0XHRcdHllYXIlMzIwMCA/IHRydWUgOlxuXHRcdFx0XHRcdFx0XHRmYWxzZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuY29uc3QgeyB0ZXN0OiBWQUxJREFURV9MRUFQIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnNgXi4uLi4uKD86MDYuMzB8MTIuMzEpLjIzOjU5OjU5YC52YWx1ZU9mKCk7XG5cbmNvbnN0IERBVEUgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhuZXcgTmF0aXZlRGF0ZSgwKSwgLyojX19QVVJFX18qL2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMoTmF0aXZlRGF0ZS5wcm90b3R5cGUpKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG4vKmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIpID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyLCB2YWx1ZSA6bnVtYmVyLCByZXNlcnZlTW9yZSA6Ym9vbGVhbikgPT4ge1xuXHRpZiAoIGVuZCApIHtcblx0XHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRcdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0XHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdFx0dGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7XG5cdH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHJldHVybiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlT0ZGU0VUKHRpbWUsIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLmluY2x1ZGVzKCctJylcblx0XHQ/IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE0LCB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5pbmRleE9mKCctJywgMTQpKVxuXHRcdDogdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpXG5cdCk7Ly8vdGltZVxufTsqLy8vXG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ09mZnNldERhdGVUaW1lJyAgICAgICAgIDsgfVxuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0dmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHdpdGg2MCA9IGxpdGVyYWwuc3RhcnRzV2l0aCgnNjAnLCAxNyk7XG5cdFx0bGV0IHdpdGhvdXQ2MCA9IHdpdGg2MCA/IGxpdGVyYWwuc2xpY2UoMCwgMTcpICsgJzU5JyArIGxpdGVyYWwuc2xpY2UoMTkpIDogbGl0ZXJhbDtcblx0XHRjb25zdCB7IDE6IG1vcmUgPSAnJyB9ID0gKCBvcHRpb25zLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMod2l0aG91dDYwKSA6IE9GRlNFVF9EQVRFVElNRV9leGVjKHdpdGhvdXQ2MCkgKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB0aW1lID0gcGFyc2Uod2l0aG91dDYwID0gd2l0aG91dDYwLnJlcGxhY2UoVCwgJ1QnKS5yZXBsYWNlKCd6JywgJ1onKSk7XG5cdFx0aWYgKCB3aXRoNjAgKSB7XG5cdFx0XHREQVRFLnNldFRpbWUodGltZSk7XG5cdFx0XHRWQUxJREFURV9MRUFQKERBVEUudG9JU09TdHJpbmcoKSkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gd2l0aG91dDYwO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodGltZSwgbW9yZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldFVUQ0Z1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENGdWxsWWVhcigpOyB9XG5cdC8vL2dldCB5ZWFyICgpIDpGdWxsWWVhciB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0Ly8vc2V0IHllYXIgKHZhbHVlIDpGdWxsWWVhcikgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNb250aCgpOyB9XG5cdC8vL2dldCBtb250aCAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgNSwgNyk7IH1cblx0Ly8vc2V0IG1vbnRoICh2YWx1ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ0RhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF0ZSgpOyB9XG5cdC8vL2dldCBkYXkgKCkgOkRhdGUgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHQvLy9zZXQgZGF5ICh2YWx1ZSA6RGF0ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlLCB0cnVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Ly8vZ2V0IGhvdXIgKCkgOkhvdXJzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdC8vL3NldCBob3VyICh2YWx1ZSA6SG91cnMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWludXRlcygpOyB9XG5cdC8vL2dldCBtaW51dGUgKCkgOk1pbnV0ZXMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0Ly8vc2V0IG1pbnV0ZSAodmFsdWUgOk1pbnV0ZXMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ1NlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDU2Vjb25kcygpOyB9XG5cdC8vL2dldCBzZWNvbmQgKCkgOlNlY29uZHMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0Ly8vc2V0IHNlY29uZCAodmFsdWUgOlNlY29uZHMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdC8vL2dldCBtaWxsaXNlY29uZCAoKSA6TWlsbGlzZWNvbmRzIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdJTEwMDA7IH0vLy9cblx0LypzZXQgbWlsbGlzZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnICkgKyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNlYXJjaChPRkZTRVQkKSk7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDAsIGZhbHNlKTtcblx0fSovLy9cblx0Ly8vZ2V0IG1pY3Jvc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG1pY3Jvc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHQvLy9nZXQgbmFub3NlY29uZCAoKSA6TWlsbGlzZWNvbmRzXG5cdC8vL3NldCBuYW5vc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHRcblx0Z2V0VVRDRGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF5KCk7IH1cblx0Ly8vZ2V0IGRheU9mV2VlayAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKS5nZXRVVENEYXkoKSB8fCA3OyB9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdC8vL2dldCBvZmZzZXQgKCkgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAnWicgOiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoLTYpOyB9XG5cdC8qc2V0IG9mZnNldCAodmFsdWUpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAtMSA6IC02KSArIHZhbHVlO1xuXHRcdE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwLCB0cnVlKTtcblx0fSovLy9cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIGZsb29yKCt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSk7IH0vLy9cblx0LypzZXRUaW1lICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOlRpbWUpIDp2b2lkIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodmFsdWUsICcnKTtcblx0XHQvLy9yZXR1cm4gdmFsdWU7XG5cdH0qL1xuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSAoKSB7IHJldHVybiAnTG9jYWxEYXRlVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgdmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZShULCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApICAgICAgIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsRGF0ZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIHZhbGlkYXRlTGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAsIG4gICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkge1xuXHRcdFx0KytuO1xuXHRcdFx0cGFydHNbaW5kZXhdID0gdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXG4nOlxuXHRcdFx0XHRjYXNlICcgJzpcblx0XHRcdFx0Y2FzZSAnXFx0Jzpcblx0XHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPSBwYXJ0LmluZGV4T2YoJ1xcbicsIGkpICsgMTsgKSB7ICsrbjsgfVxuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9ICcnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQ/JztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgeyB0ZXN0OiBCQURfRCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hXFxkKWAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBJU19EX0lOVEVHRVIgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfWE9CX0lOVEVHRVIgfSA9IHRoZVJlZ0V4cCgvXjAoPzp4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qfG9bMC03XVtfMC03XSp8YlswMV1bXzAxXSopJC8pO1xuY29uc3QgeyB0ZXN0OiBCQURfWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBJU19JTlRFR0VSID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgPT4gKCBJU19EX0lOVEVHRVIobGl0ZXJhbCkgfHwgLypvcHRpb25zLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IE1JTiAgICAgICAgID0gQmlnSW50ICYmIC0vKiNfX1BVUkVfXyovQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKTsvLyAtKDJuKiooNjRuLTFuKSkgfHwgLU1BWC0xblxuY29uc3QgTUFYICAgICAgICAgPSBCaWdJbnQgJiYgLyojX19QVVJFX18qL0JpZ0ludCgnMHg3RkZGRkZGRkZGRkZGRkZGJyk7Ly8gMm4qKig2NG4tMW4pLTFuIHx8IC1NSU4tMW5cblxuY29uc3QgQmlnSW50SW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19JTlRFR0VSKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBiaWdJbnQgICAgICAgICA9IGxpdGVyYWxbMF09PT0nLSdcblx0XHQ/IC1CaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSlcblx0XHQ6IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0b3B0aW9ucy5hbGxvd0xvbmdlciB8fCBNSU48PWJpZ0ludCAmJiBiaWdJbnQ8PU1BWCB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IHBhcnNlSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlmICggb3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyPD1udW1iZXIgJiYgbnVtYmVyPD1vcHRpb25zLkludGVnZXJNYXhOdW1iZXIgKSB7IHJldHVybiBudW1iZXI7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXIgfHwgTUlOPD1iaWdJbnQgJiYgYmlnSW50PD1NQVggfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuY29uc3QgX05hTiA9IC1OYU47XG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElTX0ZMT0FUIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPzpcblx0XHRcXC5cXGRbX1xcZF0qXG5cdFx0KD86W2VFXVstK10/XFxkW19cXGRdKik/XG5cdHxcblx0XHRbZUVdWy0rXT9cXGRbX1xcZF0qXG5cdClcblx0JGAudmFsdWVPZigpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgeyB0ZXN0OiBJU19aRVJPIH0gPSB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC4wKyk/KD86W2VFXVstK10/MCspPyQvKTtcbmNvbnN0IHsgZXhlYzogTk9STUFMSVpFRCB9ID0gdGhlUmVnRXhwICAgKC9eWy0wXT8oXFxkKikoPzpcXC4oXFxkKykpPyg/OmVcXCs/KC0/XFxkKykpPyQvKTtcbmNvbnN0IHsgZXhlYzogT1JJR0lOQUwgfSA9IHRoZVJlZ0V4cCAgICgvXlstK10/MD8oXFxkKikoPzpcXC4oXFxkKj8pMCopPyg/OltlRV1cXCs/KC0/XFxkKykpPyQvKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIUlTX0ZMT0FUKGxpdGVyYWwpIHx8IEJBRF9EKGxpdGVyYWwpICkge1xuXHRcdGlmICggb3B0aW9ucy5zRmxvYXQgKSB7XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0XHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIF9JbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyApIHsgcmV0dXJuIE5hTjsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gX05hTjsgfVxuXHRcdH1cblx0XHR0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgRmxvYXQgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0Y29uc3Qgd2l0aG91dFVuZGVyc2NvcmVzICAgICAgICAgPSBsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSArd2l0aG91dFVuZGVyc2NvcmVzO1xuXHRpZiAoIG9wdGlvbnMuc0Vycm9yICkge1xuXHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGJlZW4gYXMgYmlnIGFzIGluZmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bnVtYmVyIHx8IElTX1pFUk8od2l0aG91dFVuZGVyc2NvcmVzKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgYmVlbiBhcyBsaXR0bGUgYXMgJHtsaXRlcmFsWzBdPT09Jy0nID8gJy0nIDogJyd9MGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgeyAxOiBub3JtYWxpemVkX2ludGVnZXIsIDI6IG5vcm1hbGl6ZWRfZnJhY3Rpb25hbCA9ICcnLCAzOiBub3JtYWxpemVkX2V4cG9uZW50ID0gJycgfSA9IE5PUk1BTElaRUQobnVtYmVyICAgICAgICkgO1xuXHRcdGNvbnN0IHsgMTogb3JpZ2luYWxfaW50ZWdlciwgMjogb3JpZ2luYWxfZnJhY3Rpb25hbCA9ICcnLCAzOiBvcmlnaW5hbF9leHBvbmVudCA9ICcnIH0gPSBPUklHSU5BTCh3aXRob3V0VW5kZXJzY29yZXMpIDtcblx0XHRvcmlnaW5hbF9pbnRlZ2VyICsgb3JpZ2luYWxfZnJhY3Rpb25hbD09PW5vcm1hbGl6ZWRfaW50ZWdlciArIG5vcm1hbGl6ZWRfZnJhY3Rpb25hbFxuXHRcdCYmXG5cdFx0b3JpZ2luYWxfZXhwb25lbnQgICAgICAgIC0gb3JpZ2luYWxfZnJhY3Rpb25hbC5sZW5ndGg9PT1ub3JtYWxpemVkX2V4cG9uZW50ICAgICAgICAtIG5vcm1hbGl6ZWRfZnJhY3Rpb25hbC5sZW5ndGhcblx0XHR8fFxuXHRcdGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBsb3N0IGl0cyBleGFjdCBhbmQgYmVlbiAke251bWJlcn1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdHJldHVybiBudW1iZXI7XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IG5ld0FycmF5LCBPRl9UQUJMRVMsIGlzQXJyYXksIGlzU3RhdGljIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgRElSRUNUTFksIElNUExJQ0lUTFksIFBBSVIsIGlzVGFibGUsIGlzSW5saW5lLCBkaXJlY3RseUlmTm90LCBmcm9tUGFpciB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZywgTXVsdGlsaW5lQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlmICggaXNUYWJsZSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KHRhYmxlKSApIHtcblx0XHRcdFx0aXNTdGF0aWModGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFwcGVuZCB2YWx1ZSB0byBTdGF0aWMgQXJyYXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgKS5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aHJvdyBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFkpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFRhYmxlID0gKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgYXNBcnJheUl0ZW0gICAgICAgICAsIHRhZyAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgbGFzdFRhYmxlICAgICAgIDtcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRsZXQgYXJyYXlPZlRhYmxlcyAgICAgICAgICAgICAgO1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7IGlzQXJyYXkoYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSkgJiYgIWlzU3RhdGljKGFycmF5T2ZUYWJsZXMpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIHB1c2ggVGFibGUgdG8gbm9uLUFycmF5T2ZUYWJsZXMgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShPRl9UQUJMRVMpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMuY29sbGVjdCh0YWcsIGFycmF5T2ZUYWJsZXMsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0YXJyYXlPZlRhYmxlc1thcnJheU9mVGFibGVzLmxlbmd0aF0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucy5UYWJsZShESVJFQ1RMWSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHtcblx0XHRcdGxhc3RUYWJsZSA9IHRhYmxlW2ZpbmFsS2V5XTtcblx0XHRcdGZyb21QYWlyKGxhc3RUYWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEga2V5L3ZhbHVlIHBhaXIgY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEgW11gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGRpcmVjdGx5SWZOb3QobGFzdFRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBUYWJsZSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHR9XG5cdHJldHVybiBsYXN0VGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlubGluZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpc1RhYmxlKHRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZnJvbVBhaXIodGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIFtdIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBjaGVja0xpdGVyYWxTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0cmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaXRlcmFsKSAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBhIExpdGVyYWwgU3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4gbGl0ZXJhbDtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25MaXRlcmFsU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsLnN0YXJ0c1dpdGgoYCcnJ2ApICkge1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLkxJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbGl0ZXJhbCBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDIpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsLnNsaWNlKDMpKTtcblx0aWYgKCAkICkge1xuXHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyA2KSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuICRbM107XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnTXVsdGktbGluZSBMaXRlcmFsIFN0cmluZycsIGxpdGVyYWwubGVuZ3RoKTtcblx0Y29uc3QgbGVhZGluZ05ld2xpbmUgPSAhKCBsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKSApO1xuXHRpZiAoIGxlYWRpbmdOZXdsaW5lICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KFsgYCcnJ2AsIGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgMykgXSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHRyZXR1cm4gJFszXTtcblx0XHR9XG5cdH1cblx0b3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nPT09bnVsbCAmJiBzdGFydC5ub3dyYXAob3B0aW9ucy5BUkdTX01PREUpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKSBdOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaW5lKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdGNvbnN0IHZhbHVlID0gbGluZXMuam9pbihvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgKTtcblx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgKSB7XG5cdFx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdICs9IGAnJydgO1xuXHRcdFx0XHRsZWFkaW5nTmV3bGluZSA/IGxpbmVzLnVuc2hpZnQoYCcnJ2ApIDogbGluZXNbMF0gPSBgJycnJHtsaXRlcmFsfWA7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IExpdGVyYWxPYmplY3QobGluZXMsIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSB2YWx1ZTsgfVxuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcobGluZSk7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CYXNpY1N0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbC5zdGFydHNXaXRoKCdcIlwiXCInKSApIHtcblx0XHRjb25zdCBpbmRleCA9IHJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleChsaXRlcmFsKTtcblx0XHRjb25zdCB2YWx1ZSA9IEJhc2ljU3RyaW5nKGxpdGVyYWwuc2xpY2UoMSwgaW5kZXgpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCBpbmRleCArIDEpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShpbmRleCArIDEpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGxldCBsZW5ndGggPSAzICsgcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpdGVyYWwuc2xpY2UoMykpO1xuXHRpZiAoIGxpdGVyYWwubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdGNvbnN0ICQgPSBsaXRlcmFsLnNsaWNlKDMsIGxlbmd0aCk7XG5cdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgdmFsdWUgPSBCYXNpY1N0cmluZygkKSArICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBuZXcgaXRlcmF0b3IubWFyaygnTXVsdGktbGluZSBCYXNpYyBTdHJpbmcnLCBsZW5ndGgpO1xuXHRjb25zdCBza2lwcGVkICAgICAgICA9ICggbGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMykgKSA/IDAgOiAxO1xuXHRpZiAoIHNraXBwZWQgKSB7XG5cdFx0bGl0ZXJhbCA9IHN0YXJ0Lm11c3QoKTtcblx0XHRsZXQgbGVuZ3RoID0gcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpdGVyYWwpO1xuXHRcdGlmICggbGl0ZXJhbC5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCAkID0gbGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpO1xuXHRcdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IE11bHRpbGluZUJhc2ljU3RyaW5nKCQsIG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QoWyAnXCJcIlwiJywgbGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpIF0sIHZhbHVlKSA6IHZhbHVlO1xuXHRcdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdH1cblx0b3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nPT09bnVsbCAmJiBzdGFydC5ub3dyYXAob3B0aW9ucy5BUkdTX01PREUpO1xuXHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwgKyAnXFxuJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRmb3IgKCBjb25zdCBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbIGxpdGVyYWwgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaW5lKTtcblx0XHRpZiAoIGxpbmUubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpbmUuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZyhsaW5lcy5qb2luKCdcXG4nKSArICdcXG4nICsgJCwgb3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICwgc2tpcHBlZCkgKyAoIGxpbmUuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaW5lLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgKSB7XG5cdFx0XHRcdHNraXBwZWQgPyBsaW5lcy51bnNoaWZ0KCdcIlwiXCInKSA6IGxpbmVzWzBdID0gYFwiXCJcIiR7bGl0ZXJhbH1gO1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gYCR7JH1cIlwiXCJgO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiBsaW5lLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSArICdcXG4nKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGxpbmU7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEtFWVMgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKG51bGwpO1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3IgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gS0VZU1trZXldIHx8ICggS0VZU1trZXldID0gU3ltYm9sKGtleSkgKTtcbmV4cG9ydCBjb25zdCBjb21tZW50Rm9yVGhpcyAgICAgICAgICAgICAgICA9IFN5bWJvbCgndGhpcycpICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBpbmNsdWRlc05ld2xpbmUgfSA9IHRoZVJlZ0V4cCgvXFxyP1xcbi9nKTtcbmV4cG9ydCBjb25zdCBnZXRDT01NRU5UID0gKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleUNvbW1lbnQgICAgICAgICkgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICgga2V5Q29tbWVudCBpbiB0YWJsZSApIHtcblx0XHRjb25zdCBjb21tZW50ID0gdGFibGVba2V5Q29tbWVudF07XG5cdFx0aWYgKCB0eXBlb2YgY29tbWVudCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50IG11c3QgYmUgYSBzdHJpbmcsIHdoaWxlIFwiJHtjb21tZW50PT09bnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb21tZW50fVwiIHR5cGUgaXMgZm91bmRgKTsgfVxuXHRcdGlmICggaW5jbHVkZXNOZXdsaW5lKGNvbW1lbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgdGhlIHZhbHVlIG9mIGNvbW1lbnQgbXVzdCBiZSBhIHN0cmluZyBhbmQgY2FuIG5vdCBpbmNsdWRlIG5ld2xpbmVgKTsgfVxuXHRcdHJldHVybiBgICMke2NvbW1lbnR9YDsvLy9cblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuZXhwb3J0IGNvbnN0IGdldENvbW1lbnQgPSAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICAgICAgICAgICAgID0+IGtleSBpbiBLRVlTID8gZ2V0Q09NTUVOVCh0YWJsZSwgS0VZU1trZXldICkgOiAnJztcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vLyBleHRlcm5hbFxuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBJTkxJTkUsIERJUkVDVExZIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgbmV3QXJyYXksIFNUQVRJQ0FMTFkgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCQgfSBmcm9tICcuLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSAnLi4vdHlwZXMvSW50ZWdlcic7XG5pbXBvcnQgeyBGbG9hdCB9IGZyb20gJy4uL3R5cGVzL0Zsb2F0JztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgYXBwZW5kVGFibGUsIHByZXBhcmVUYWJsZSwgcHJlcGFyZUlubGluZVRhYmxlLCBhc3NpZ25MaXRlcmFsU3RyaW5nLCBhc3NpZ25CYXNpY1N0cmluZyB9IGZyb20gJy4vb24tdGhlLXNwb3QnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgYmVJbmxpbmUgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5cbmNvbnN0IHsgdGVzdDogSVNfT0ZGU0VUJCB9ID0gdGhlUmVnRXhwKE9GRlNFVCQpO1xuY29uc3QgeyB0ZXN0OiBJU19FTVBUWSB9ID0gdGhlUmVnRXhwKC9eXFxbW1xcdCBdKl0vKTtcblxuY29uc3QgcGFyc2VLZXlzID0gKHJlc3QgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgbGluZVJlc3QgICAgICAgICA9IHJlc3Q7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IFtdO1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAtMTtcblx0Zm9yICggOyA7ICkge1xuXHRcdGxpbmVSZXN0IHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkgYmFyZSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nXCInICkge1xuXHRcdFx0Y29uc3QgaW5kZXggICAgICAgICA9IHJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleChsaW5lUmVzdCk7XG5cdFx0XHRvcHRpb25zLktFWVMudGVzdChsZWFkaW5nS2V5c1srK2xhc3RJbmRleF0gPSBCYXNpY1N0cmluZyhsaW5lUmVzdC5zbGljZSgxLCBpbmRleCkpKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEtleSBub3QgYWxsb3dlZGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGluZGV4ICsgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNRdW90ZWQgPSBsaW5lUmVzdFswXT09PSdcXCcnO1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggaXNRdW90ZWQgPyByZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyA6IHJlZ2V4cHMuX19CQVJFX0tFWV9leGVjICkobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkICR7aXNRdW90ZWQgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGtleS5sZW5ndGgpO1xuXHRcdFx0b3B0aW9ucy5LRVlTLnRlc3QobGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gaXNRdW90ZWQgPyBrZXkuc2xpY2UoMSwgLTEpIDoga2V5KSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEtleSBub3QgYWxsb3dlZGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGlmICggcmVnZXhwcy5JU19ET1RfS0VZKGxpbmVSZXN0KSApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuRE9UX0tFWSwgJycpOyB9XG5cdFx0ZWxzZSB7IGJyZWFrOyB9XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FibGVEaWdpdCApIHtcblx0XHRjb25zdCBrZXlzID0gcmVzdC5zbGljZSgwLCAtbGluZVJlc3QubGVuZ3RoKTtcblx0XHQoIHJlZ2V4cHMuaXNBbWF6aW5nKGtleXMpIHx8IG9wdGlvbnMuZW5hYmxlTnVsbCAmJiBrZXlzPT09J251bGwnICkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYmFyZSBrZXkgZGlzYWJsZWQgYnkgeE9wdGlvbnMuc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRpZiAoIG9wdGlvbnMuZGlzYWxsb3dFbXB0eUtleSApIHtcblx0XHRsZXQgaW5kZXggICAgICAgICA9IGxhc3RJbmRleDtcblx0XHRkbyB7IGxlYWRpbmdLZXlzW2luZGV4XSAgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBrZXkgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpOyB9XG5cdFx0d2hpbGUgKCBpbmRleC0tICk7XG5cdH1cblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9IGxlYWRpbmdLZXlzW2xhc3RJbmRleF0gO1xuXHRsZWFkaW5nS2V5cy5sZW5ndGggPSBsYXN0SW5kZXg7XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgbGluZVJlc3QgfTtcbn07XG5cbmNvbnN0IHB1c2ggPSAobGFzdEFycmF5ICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIGxpbmVSZXN0WzBdPT09JzwnICkge1xuXHRcdGNvbnN0IHsgMTogdGFnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzLl9WQUxVRV9QQUlSX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZyBgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuY29sbGVjdCh0YWcsIGxhc3RBcnJheSwgbnVsbCk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ10nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHRsYXN0QXJyYXlbbGFzdEFycmF5Lmxlbmd0aF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcob3B0aW9ucy5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZShvcHRpb25zLmFzVGFibGVzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KG9wdGlvbnMuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IG9wdGlvbnMuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbD09PSdmYWxzZScgKSB7IG9wdGlvbnMuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gZmFsc2U7IH1cblx0ZWxzZSBpZiAoIG9wdGlvbnMuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnICkgeyBvcHRpb25zLmFzTnVsbHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0b3B0aW9ucy5hc09mZnNldERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0b3B0aW9ucy5hc0xvY2FsRGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0b3B0aW9ucy5hc0xvY2FsVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0b3B0aW9ucy5hc0xvY2FsRGF0ZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ24nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpXG5cdFx0XHQ/IG9wdGlvbnMuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBGbG9hdChsaXRlcmFsKSkgOiBGbG9hdChsaXRlcmFsKVxuXHRcdFx0OiBvcHRpb25zLmFzSW50ZWdlcnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuY29uc3QgZXF1YWxTdGF0aWNBcnJheSA9IGZ1bmN0aW9uICogKCAgICAgICAgICAgIHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAge1xuXHRjb25zdCBzdGF0aWNBcnJheSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShTVEFUSUNBTExZKTtcblx0aWYgKCBJU19FTVBUWShsaW5lUmVzdCkgKSB7XG5cdFx0YmVJbmxpbmUoc3RhdGljQXJyYXksIGxpbmVSZXN0WzFdPT09J10nID8gMCA6IDMpO1xuXHRcdHJldHVybiBsaW5lUmVzdC5zbGljZShsaW5lUmVzdC5pbmRleE9mKCddJykpLnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ1N0YXRpYyBBcnJheScsIGxpbmVSZXN0Lmxlbmd0aCk7XG5cdGxldCBpbmxpbmUgICAgICAgICAgICAgICA9IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1sgJykgfHwgbGluZVJlc3Quc3RhcnRzV2l0aCgnW1xcdCcpID8gMyA6IDA7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdGlubGluZSA9IG51bGw7XG5cdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHtcblx0XHRpbmxpbmU9PT1udWxsIHx8IGJlSW5saW5lKHN0YXRpY0FycmF5LCBpbmxpbmUpO1xuXHRcdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IHB1c2goc3RhdGljQXJyYXksIGxpbmVSZXN0KTtcblx0XHRsaW5lUmVzdCA9IHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdDtcblx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0aW5saW5lID0gbnVsbDtcblx0XHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IGJyZWFrOyB9XG5cdFx0XHR0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBpbiBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRcdH1cblx0fVxuXHRpbmxpbmU9PT1udWxsIHx8IGJlSW5saW5lKHN0YXRpY0FycmF5LCBpbmxpbmUpO1xuXHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG59ICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmNvbnN0IGVxdWFsSW5saW5lVGFibGUgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3QgaW5saW5lVGFibGUgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFksIElOTElORSk7XG5cdGlmICggb3B0aW9ucy5hbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ0lubGluZSBUYWJsZScsIGxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRsZXQgaW5saW5lID0gdHJ1ZTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgYnJlYWs7IH1cblx0XHRcdGNvbnN0IGZvckNvbW1lbnQgICAgICAgICAgICAgPSBGb3JDb21tZW50KGlubGluZVRhYmxlLCBsaW5lUmVzdCk7XG5cdFx0XHRjb25zdCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0XHRpZiAoIGxpbmVSZXN0ICkge1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRcdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGRvIHsgbGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aW5saW5lID0gZmFsc2U7XG5cdFx0XHRcdGRvIHsgbGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHR9XG5cdFx0aW5saW5lIHx8IGJlSW5saW5lKGlubGluZVRhYmxlLCBmYWxzZSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRpZiAoIGxpbmVSZXN0WzBdIT09J30nICkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihGb3JDb21tZW50KGlubGluZVRhYmxlLCBsaW5lUmVzdCkpO1xuXHRcdFx0XHRsaW5lUmVzdCA9ICggdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0ICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG59ICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEZvckNvbW1lbnQgPSAobGFzdElubGluZVRhYmxlICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgdGFnIH0gPSB7IGxpbmVSZXN0IH0gPSByZWdleHBzLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzKHBhcnNlS2V5cyhsaW5lUmVzdCkpO1xuXHRyZXR1cm4geyB0YWJsZTogcHJlcGFyZUlubGluZVRhYmxlKGxhc3RJbmxpbmVUYWJsZSwgbGVhZGluZ0tleXMpLCBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcbmNvbnN0IGFzc2lnbiA9ICh7IGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0LCB0YWJsZSB9ICAgICAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgRHVwbGljYXRlIHByb3BlcnR5IGRlZmluaXRpb25gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIHRhZyApIHtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICd9Jzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zLmlubGluZVRhYmxlIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHJldHVybiBlcXVhbElubGluZVRhYmxlKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0cmV0dXJuIGVxdWFsU3RhdGljQXJyYXkodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggbGl0ZXJhbD09PSd0cnVlJyApIHsgdGFibGVbZmluYWxLZXldID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbD09PSdmYWxzZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgdGFibGVbZmluYWxLZXldID0gbnVsbDsgfVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgT2Zmc2V0RGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEludGVnZXIobGl0ZXJhbCkpIDogSW50ZWdlcihsaXRlcmFsKVxuXHRcdDtcblx0fVxuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoKSAgICAgICAgPT4ge1xuXHRjb25zdCByb290VGFibGUgICAgICAgID0gbmV3IG9wdGlvbnMuVGFibGU7XG5cdGxldCBsYXN0U2VjdGlvblRhYmxlICAgICAgICA9IHJvb3RUYWJsZTtcblx0d2hpbGUgKCBpdGVyYXRvci5yZXN0KCkgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IubmV4dCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZSApIHtcblx0XHRcdGlmICggbGluZVswXT09PSdbJyApIHtcblx0XHRcdFx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGFzQXJyYXlJdGVtLCB0YWcsIGxpbmVSZXN0IH0gPSByZWdleHBzLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMobGluZSwgcGFyc2VLZXlzKTtcblx0XHRcdFx0Y29uc3QgdGFibGUgICAgICAgID0gcHJlcGFyZVRhYmxlKHJvb3RUYWJsZSwgbGVhZGluZ0tleXMpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0ICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0WzBdPT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciB0YWJsZSBoZWFkZXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxhc3RTZWN0aW9uVGFibGUgPSBhcHBlbmRUYWJsZSh0YWJsZSwgZmluYWxLZXksIGFzQXJyYXlJdGVtLCB0YWcpO1xuXHRcdFx0XHRvcHRpb25zLnByZXNlcnZlQ29tbWVudCAmJiBsaW5lUmVzdCAmJiAoIGxhc3RTZWN0aW9uVGFibGVbY29tbWVudEZvclRoaXNdID0gYXNBcnJheUl0ZW0gPyBsaW5lUmVzdC5zbGljZSgxKSA6IHRhYmxlW2NvbW1lbnRGb3IoZmluYWxLZXkpXSA9IGxpbmVSZXN0LnNsaWNlKDEpICk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggbGluZVswXT09PScjJyApIHtcblx0XHRcdFx0cmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaW5lKSAmJiBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBjb21tZW50c2AgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChsYXN0U2VjdGlvblRhYmxlLCBsaW5lKTtcblx0XHRcdFx0bGV0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRcdHR5cGVvZiByZXN0PT09J3N0cmluZycgfHwgKCByZXN0ID0geCAgICAgICAgKHJlc3QpICk7XG5cdFx0XHRcdGlmICggcmVzdCApIHtcblx0XHRcdFx0XHRyZXN0WzBdPT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlQ29tbWVudCApIHsgZm9yQ29tbWVudC50YWJsZVtjb21tZW50Rm9yKGZvckNvbW1lbnQuZmluYWxLZXkpXSA9IHJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBmcm9tQ2hhckNvZGUgZnJvbSAnLlN0cmluZy5mcm9tQ2hhckNvZGUnO1xuaW1wb3J0IGZyb21FbnRyaWVzIGZyb20gJy5PYmplY3QuZnJvbUVudHJpZXMnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgRVNDQVBFRCA9IC8qI19fUFVSRV9fKi9OdWxsICAgICAgICAoe1xuXHQuLi4vKiNfX1BVUkVfXyovZnJvbUVudHJpZXMoLyojX19QVVJFX18qL1sgLi4uQXJyYXkoMHgyMCkgXS5tYXAoKF8sIGNoYXJDb2RlKSA9PiBbIGZyb21DaGFyQ29kZShjaGFyQ29kZSksICdcXFxcdScgKyBjaGFyQ29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5wYWRTdGFydCg0LCAnMCcpIF0pKSxcblx0J1xcYic6ICdcXFxcYicsXG5cdCdcXHQnOiAnXFxcXHQnLFxuXHQnXFxuJzogJ1xcXFxuJyxcblx0J1xcZic6ICdcXFxcZicsXG5cdCdcXHInOiAnXFxcXHInLFxuXHQnXCInOiAnXFxcXFwiJyxcblx0J1wiXCJcIic6ICdcIlwiXFxcXFwiJyxcblx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHQnXFx4N0YnOiAnXFxcXHUwMDdGJyxcbn0pO1xuXG5jb25zdCB7IHRlc3Q6IE5FRURfQkFTSUMgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUYnXFx4N0ZdLyk7XG5jb25zdCBCWV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3wuL2dzO1xuY29uc3QgeyB0ZXN0OiBORUVEX0VTQ0FQRSB9ID0gdGhlUmVnRXhwKC9eW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0vKTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggTkVFRF9CQVNJQyh2YWx1ZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSB2YWx1ZS5tYXRjaChCWV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0cmV0dXJuIGBcIiR7cGFydHMuam9pbignJyl9XCJgO1xuXHR9XG5cdHJldHVybiBgJyR7dmFsdWV9J2A7XG59O1xuZXhwb3J0IGNvbnN0IHNpbmdsZWxpbmVCYXNpY1N0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSB2YWx1ZS5tYXRjaChCWV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0cmV0dXJuIGBcIiR7cGFydHMuam9pbignJyl9XCJgO1xuXHR9XG5cdHJldHVybiBgXCJcImA7XG59O1xuXG5jb25zdCB7IHRlc3Q6IE5FRURfTVVMVElMSU5FX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFx4N0ZdfCcnJy8pO1xuZXhwb3J0IGNvbnN0IHsgdGVzdDogbXVsdGlsaW5lTmVlZEJhc2ljIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdfCcnJy8pO1xuY29uc3QgeyB0ZXN0OiBSRUFMX01VTFRJTElORV9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcXFxcXFx4N0ZdfFwiXCJcIi8pO1xuY29uc3QgQllfTVVMVElMSU5FX0VTQ0FQRSA9IC9bXlxceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0rfFwiXCJcInwuL2dzO1xuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXig/OltcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIpLyk7XG5jb25zdCBlc2NhcGVfbXVsdGlsaW5lID0gKGxpbmVzICAgICAgICAgICwgbGluZUluZGV4ICAgICAgICApID0+IHtcblx0Y29uc3QgbGluZSA9IGxpbmVzW2xpbmVJbmRleF0gO1xuXHRpZiAoIFJFQUxfTVVMVElMSU5FX0VTQ0FQRShsaW5lKSApIHtcblx0XHRjb25zdCBwYXJ0cyA9IGxpbmUubWF0Y2goQllfTVVMVElMSU5FX0VTQ0FQRSkgO1xuXHRcdGxldCBpbmRleCA9IHBhcnRzLmxlbmd0aDtcblx0XHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfRVNDQVBFKHBhcnRzWy0taW5kZXhdICkgKSB7IHBhcnRzW2luZGV4XSA9IEVTQ0FQRURbcGFydHNbaW5kZXhdIF0gOyB9IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0bGluZXNbbGluZUluZGV4XSA9IHBhcnRzLmpvaW4oJycpO1xuXHR9XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgTGluZXMgPSAobGluZXMgICAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4gKCBsaW5lcyA9IFsgJycsIC4uLmxpbmVzIF0gICAgICAgICAgKS5sZW5ndGg9PT0xID8gWyAnJywgJycgXSA6IGxpbmVzICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsYXN0SW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRsZXQgaW5kZXggPSBsYXN0SW5kZXg7XG5cdGRvIHsgaWYgKCBORUVEX01VTFRJTElORV9CQVNJQyhsaW5lc1tpbmRleF0gKSApIHsgYnJlYWs7IH0gfVxuXHR3aGlsZSAoIC0taW5kZXggKTtcblx0aWYgKCBpbmRleCApIHtcblx0XHRpbmRleCA9IGxhc3RJbmRleDtcblx0XHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdFx0bGluZXNbaW5kZXhdICs9IGxpbmVzWzBdID0gJ1wiXCJcIic7XG5cdFx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0fVxuXHRlbHNleyBsaW5lc1tsYXN0SW5kZXhdICs9IGxpbmVzWzBdID0gJ1xcJ1xcJ1xcJyc7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsZXQgaW5kZXggPSBsaW5lcy5sZW5ndGggLSAxO1xuXHRlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7XG5cdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHR3aGlsZSAoIC0taW5kZXggKSB7IGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTsgfVxuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlsaW5lTGl0ZXJhbFN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdICs9IGxpbmVzWzBdID0gJ1xcJ1xcJ1xcJyc7XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn07XG4iLCJpbXBvcnQgRmxvYXQ2NEFycmF5IGZyb20gJy5GbG9hdDY0QXJyYXknO1xuaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLlVpbnQ4QXJyYXknO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgX0luZmluaXR5ID0gLUluZmluaXR5O1xuXG5jb25zdCB7IHRlc3Q6IElOVEVHRVJfTElLRSB9ID0gdGhlUmVnRXhwKC9eLT9cXGQrJC8pO1xuY29uc3QgZW5zdXJlRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBJTlRFR0VSX0xJS0UobGl0ZXJhbCkgPyBsaXRlcmFsICsgJy4wJyA6IGxpdGVyYWw7XG5cbmNvbnN0IGZsb2F0NjRBcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkoWyBOYU4gXSk7XG5jb25zdCB1aW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZmxvYXQ2NEFycmF5LmJ1ZmZlcik7XG5jb25zdCBOYU5fNyA9IHVpbnQ4QXJyYXlbN10gO1xuXG5leHBvcnQgY29uc3QgZmxvYXQgPSBOYU5fNz09PW5ldyBVaW50OEFycmF5KG5ldyBGbG9hdDY0QXJyYXkoWyAtTmFOIF0pLmJ1ZmZlcilbN10gXG5cdD8gKHZhbHVlICAgICAgICApID0+IHZhbHVlXG5cdFx0PyB2YWx1ZT09PUluZmluaXR5ID8gJ2luZicgOiB2YWx1ZT09PV9JbmZpbml0eSA/ICctaW5mJyA6IGVuc3VyZUZsb2F0KCcnICsgdmFsdWUpXG5cdFx0OiB2YWx1ZT09PXZhbHVlID8gaXModmFsdWUsIDApID8gJzAuMCcgOiAnLTAuMCcgOiAnbmFuJ1xuXHQ6ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHRcdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHRcdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogKCBmbG9hdDY0QXJyYXlbMF0gPSB2YWx1ZSwgdWludDhBcnJheVs3XSApPT09TmFOXzcgPyAnbmFuJyA6ICctbmFuJztcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgREFURSBmcm9tICcuRGF0ZS5wcm90b3R5cGUnO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuY2xhc3MuaXNTdHJpbmcnO1xuaW1wb3J0IGlzTnVtYmVyIGZyb20gJy5jbGFzcy5pc051bWJlcic7XG5pbXBvcnQgaXNCaWdJbnQgZnJvbSAnLmNsYXNzLmlzQmlnSW50JztcbmltcG9ydCBpc0Jvb2xlYW4gZnJvbSAnLmNsYXNzLmlzQm9vbGVhbic7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuXG5pbXBvcnQgeyBjb21tZW50Rm9yVGhpcywgZ2V0Q09NTUVOVCwgZ2V0Q29tbWVudCB9IGZyb20gJy4uL3R5cGVzL2NvbW1lbnQnO1xuaW1wb3J0IHsgc2luZ2xlbGluZVN0cmluZyB9IGZyb20gJy4vc3RyaW5nJztcbmltcG9ydCB7IGZsb2F0IH0gZnJvbSAnLi9mbG9hdCc7XG5pbXBvcnQgeyBpc1NlY3Rpb24sIG9mSW5saW5lIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgX2xpdGVyYWwgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcblxuY29uc3QgaXNEYXRlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChEQVRFKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuY29uc3QgeyB0ZXN0OiBCQVJFIH0gPSB0aGVSZWdFeHAoL15bXFx3LV0rJC8pO1xuY29uc3QgJEtleSQgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gQkFSRShrZXkpID8ga2V5IDogc2luZ2xlbGluZVN0cmluZyhrZXkpO1xuXG5jb25zdCBGSVJTVCA9IC9bXi5dKy87XG5jb25zdCBsaXRlcmFsU3RyaW5nID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgID0+IGAnJHt2YWx1ZX0nYDtcbmNvbnN0ICRLZXlzID0gKGtleXMgICAgICAgICkgICAgICAgICA9PiByZWdleHBzLmlzQW1hemluZyhrZXlzKSA/IGtleXMucmVwbGFjZShGSVJTVCwgbGl0ZXJhbFN0cmluZykgOiBrZXlzPT09J251bGwnID8gYCdudWxsJ2AgOiBrZXlzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MU2VjdGlvbiBleHRlbmRzIEFycmF5ICAgICAgICAge1xuXHRcblx0ICAgICAgICAgICAgICAgICBkb2N1bWVudCAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKGRvY3VtZW50ICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgeyByZXR1cm4gdGhpcy5qb2luKHRoaXMuZG9jdW1lbnQubmV3bGluZSk7IH1cblx0XG5cdGFwcGVuZE5ld2xpbmUgKCkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9ICcnOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZExpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gc291cmNlOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZTsgfSAgIFxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmVJZiAoc291cmNlICAgICAgICApIHsgc291cmNlICYmICggdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZSApOyB9Ly8vXG5cdFxuXHQqIGFzc2lnbkJsb2NrICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50S2V5c18gICAgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5c18gICAgICAgICAgICAgICAgICAsIHRhYmxlICAgLCB0YWJsZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICB7XG5cdFx0Y29uc3QgeyBkb2N1bWVudCB9ID0gdGhpcztcblx0XHRjb25zdCB7IG5ld2xpbmVVbmRlckhlYWRlciwgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgfSA9IGRvY3VtZW50O1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlckRvdHRlZCA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgOiBmYWxzZTtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJQYWlyID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyRG90dGVkIDogZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpcjtcblx0XHRmb3IgKCBjb25zdCB0YWJsZUtleSBvZiB0YWJsZUtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSB0YWJsZVt0YWJsZUtleV0gO1xuXHRcdFx0Y29uc3QgJGtleSQgPSAkS2V5JCh0YWJsZUtleSk7XG5cdFx0XHRjb25zdCBkb2N1bWVudEtleXMgPSBkb2N1bWVudEtleXNfICsgJGtleSQ7XG5cdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gdmFsdWU7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGxldCBmaXJzdEl0ZW0gPSB2YWx1ZVswXTtcblx0XHRcdFx0XHRpZiAoIGlzU2VjdGlvbihmaXJzdEl0ZW0pICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGFibGVIZWFkZXIgPSBgW1ske2RvY3VtZW50S2V5c31dXWAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRjb25zdCBkb2N1bWVudEtleXNfID0gZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgIDtcblx0XHRcdFx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRsZXQgdGFibGUgICAgICAgICAgICAgICAgID0gZmlyc3RJdGVtO1xuXHRcdFx0XHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRzZWN0aW9uWzBdID0gdGFibGVIZWFkZXIgKyBnZXRDT01NRU5UKHRhYmxlLCBjb21tZW50Rm9yVGhpcyk7XG5cdFx0XHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5c18sIGBgLCB0YWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh0YWJsZSkpO1xuXHRcdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggKytpbmRleD09PWxlbmd0aCApIHsgYnJlYWs7IH1cblx0XHRcdFx0XHRcdFx0dGFibGUgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtpbmRleF0gO1xuXHRcdFx0XHRcdFx0XHRpZiAoICFpc1NlY3Rpb24odGFibGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRoZSBmaXJzdCB0YWJsZSBpdGVtIG1hcmtlZCBieSBTZWN0aW9uKCkgbWVhbnMgdGhlIHBhcmVudCBhcnJheSBpcyBhbiBhcnJheSBvZiB0YWJsZXMsIHdoaWNoIGNhbiBub3QgaW5jbHVkZSBvdGhlciB0eXBlcyBvciB0YWJsZSBub3QgbWFya2VkIGJ5IFNlY3Rpb24oKSBhbnkgbW9yZSBpbiB0aGUgcmVzdCBpdGVtc2ApOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IGxldCBpbmRleCA9IDE7IHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IGlmICggaXNTZWN0aW9uKHZhbHVlW2luZGV4KytdICkgKSB7IHRocm93IFR5cGVFcnJvcihgaWYgYW4gYXJyYXkgaXMgbm90IGFycmF5IG9mIHRhYmxlcywgaXQgY2FuIG5vdCBpbmNsdWRlIGFueSB0YWJsZSB0aGF0IG1hcmtlZCBieSBTZWN0aW9uKClgKTsgfSB9IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggaXNTZWN0aW9uKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdHNlY3Rpb25bMF0gPSBgWyR7ZG9jdW1lbnRLZXlzfV0ke1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucHJlZmVyQ29tbWVudEZvclRoaXNcblx0XHRcdFx0XHRcdFx0PyBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcykgfHwgZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpXG5cdFx0XHRcdFx0XHRcdDogZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpIHx8IGdldENPTU1FTlQodmFsdWUsIGNvbW1lbnRGb3JUaGlzKVxuXHRcdFx0XHRcdH1gO1xuXHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZWN0aW9uS2V5cyA9IHNlY3Rpb25LZXlzXyArICRrZXkkO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gJEtleXMoc2VjdGlvbktleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoJycsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdC0tdGhpcy5sZW5ndGg7XG5cdFx0XHRcdHlpZWxkIHRoaXMuYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlckRvdHRlZCAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudCh0YWJsZSwgdGFibGVLZXkpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJQYWlyICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0ICAgICAgICB2YWx1ZSAoaW5kZW50ICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICwgcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgICAgICAgICApICAgICAgICAgICAgICAgICAge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGlmICggdmFsdWU9PT1udWxsICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5kb2N1bWVudC5udWxsRGlzYWJsZWQgKSB7IHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIm51bGxcIiB0eXBlIHZhbHVlIHdpdGhvdXQgdHJ1dGh5IG9wdGlvbnMueE51bGxgKTsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ251bGwnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IGlubGluZU1vZGUgPSBvZklubGluZSh2YWx1ZSk7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBpbmxpbmVNb2RlPT09dW5kZWZpbmVkICkgeyB0aGlzLnN0YXRpY0FycmF5KGluZGVudCwgdmFsdWUpOyB9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCB7ICRzaW5nbGVsaW5lQXJyYXkgPSBpbmxpbmVNb2RlIH0gPSB0aGlzLmRvY3VtZW50O1xuXHRcdFx0XHRcdFx0dGhpcy5zaW5nbGVsaW5lQXJyYXkoaW5kZW50LCB2YWx1ZSwgJHNpbmdsZWxpbmVBcnJheSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaW5saW5lTW9kZSE9PXVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRpbmxpbmVNb2RlIHx8IHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVEaXNhYmxlZFxuXHRcdFx0XHRcdFx0PyB0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApXG5cdFx0XHRcdFx0XHQ6IHRoaXMubXVsdGlsaW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpcy5kb2N1bWVudC5tdWx0aWxpbmVUYWJsZUNvbW1hKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlzRGF0ZSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB2YWx1ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoJ1QnLCB0aGlzLmRvY3VtZW50LlQpLnJlcGxhY2UoJ1onLCB0aGlzLmRvY3VtZW50LlopO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggX2xpdGVyYWwgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGl0ZXJhbCA9ICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClbX2xpdGVyYWxdO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGxpdGVyYWw9PT0nc3RyaW5nJyApIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSBsaXRlcmFsOyB9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0gbGl0ZXJhbDtcblx0XHRcdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGxpdGVyYWxbMF07XG5cdFx0XHRcdFx0XHRcdGxldCBpbmRleCA9IDE7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7IHRoaXMuYXBwZW5kTGluZSA9IGxpdGVyYWxbaW5kZXgrK10gOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBsaXRlcmFsIHZhbHVlIGlzIGJyb2tlbmApOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYGxpdGVyYWwgdmFsdWUgaXMgYnJva2VuYCk7IH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlzU3RyaW5nKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgU3RyaW5nXWApOyB9XG5cdFx0XHRcdGlmICggaXNOdW1iZXIodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBOdW1iZXJdYCk7IH1cblx0XHRcdFx0aWYgKCBpc0JpZ0ludCh2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJpZ0ludF1gKTsgfVxuXHRcdFx0XHRpZiAoIGlzQm9vbGVhbih2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJvb2xlYW5dYCk7IH1cblx0XHRcdFx0aWYgKCByZXR1cm5WYWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFx0aWYgKCBrZXlzLmxlbmd0aCApIHsgcmV0dXJuIGtleXM7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuaW5saW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdiaWdpbnQnOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcnICsgdmFsdWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB0aGlzLmRvY3VtZW50LmFzSW50ZWdlcih2YWx1ZSkgPyBpcyh2YWx1ZSwgLTApID8gJy0wJyA6ICcnICsgdmFsdWUgOiBmbG9hdCh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBzaW5nbGVsaW5lU3RyaW5nKHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdib29sZWFuJzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKGB0b21sIGNhbiBub3Qgc3RyaW5naWZ5IFwiJHt0eXBlb2YgdmFsdWV9XCIgdHlwZSB2YWx1ZWApO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRcblx0ICAgICAgICBzaW5nbGVsaW5lQXJyYXkgKGluZGVudCAgICAgICAgLCBzdGF0aWNBcnJheSAgICAgICAgICAgICAgICAgICAgICAsIGlubGluZU1vZGUgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0gc3RhdGljQXJyYXk7XG5cdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIxMCA/ICdbICcgOiAnWyc7XG5cdFx0XHR0aGlzLnZhbHVlKGluZGVudCwgc3RhdGljQXJyYXlbMF0gLCBmYWxzZSk7XG5cdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnO1xuXHRcdFx0XHR0aGlzLnZhbHVlKGluZGVudCwgc3RhdGljQXJyYXlbaW5kZXgrK10gLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIxMCA/ICcgXScgOiAnXSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9IGlubGluZU1vZGUmMGIwMSA/ICdbIF0nIDogJ1tdJzsgfVxuXHR9XG5cdCAgICAgICAgc3RhdGljQXJyYXkgKGluZGVudCAgICAgICAgLCBzdGF0aWNBcnJheSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHR0aGlzLmFwcGVuZElubGluZSA9ICdbJztcblx0XHRjb25zdCBpbmRlbnRfID0gaW5kZW50ICsgdGhpcy5kb2N1bWVudC5pbmRlbnQ7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudF87XG5cdFx0XHR0aGlzLnZhbHVlKGluZGVudF8sIHN0YXRpY0FycmF5W2luZGV4KytdICwgZmFsc2UpO1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnLCc7XG5cdFx0fVxuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICddJztcblx0fVxuXHRcblx0ICAgICAgICBpbmxpbmVUYWJsZSAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdGNvbnN0IGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKTtcblx0XHRpZiAoIGtleXMubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyAnO1xuXHRcdFx0dGhpcy5hc3NpZ25JbmxpbmUoaW5kZW50LCBpbmxpbmVUYWJsZSwgYGAsIGtleXMpO1xuXHRcdFx0dGhpc1t0aGlzLmxlbmd0aCAtIDFdID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdIC5zbGljZSgwLCAtMikgKyAnIH0nO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSAneyB9JzsgfVxuXHR9XG5cdCAgICAgICAgbXVsdGlsaW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICAsIGNvbW1hICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyc7XG5cdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCBpbmxpbmVUYWJsZSwgYGAsIGdldE93blByb3BlcnR5TmFtZXMoaW5saW5lVGFibGUpLCBjb21tYSk7XG5cdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50ICsgJ30nO1xuXHR9XG5cdCAgICAgICAgYXNzaWduSW5saW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICwga2V5c18gICAgICAgICAgICAgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBrZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gaW5saW5lVGFibGVba2V5XSA7XG5cdFx0XHRjb25zdCBrZXlzID0ga2V5c18gKyAkS2V5JChrZXkpO1xuXHRcdFx0Y29uc3QgYmVmb3JlX3ZhbHVlID0gdGhpcy5hcHBlbmRJbmxpbmUgPSAkS2V5cyhrZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKGluZGVudCwgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aCAtIDFdID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdIC5zbGljZSgwLCAtYmVmb3JlX3ZhbHVlLmxlbmd0aCk7XG5cdFx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIGtleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnOyB9XG5cdFx0fVxuXHR9XG5cdCAgICAgICAgYXNzaWduTXVsdGlsaW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICwga2V5c18gICAgICAgICAgICAgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCBpbmRlbnRfID0gaW5kZW50ICsgdGhpcy5kb2N1bWVudC5pbmRlbnQ7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfICsgJEtleXMoa2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZShpbmRlbnRfLCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR0aGlzLmFzc2lnbk11bHRpbGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUsIGNvbW1hKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb21tYVxuXHRcdFx0XHRcdD8gdGhpcy5hcHBlbmRJbmxpbmUgPSAnLCcgKyBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpXG5cdFx0XHRcdFx0OiB0aGlzLmFwcGVuZElubGluZUlmID0gZ2V0Q29tbWVudChpbmxpbmVUYWJsZSwga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IE1BWF9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NQVhfU0FGRV9JTlRFR0VSJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBUT01MU2VjdGlvbiBmcm9tICcuL3NlY3Rpb24nO1xuXG5jb25zdCBuYW1lMmNvZGUgPSAvKiNfX1BVUkVfXyovTnVsbCh7XG5cdGRvY3VtZW50OiAwLFxuXHRzZWN0aW9uOiAxLFxuXHRoZWFkZXI6IDIsXG5cdHBhaXJzOiAzLFxuXHRwYWlyOiA0LFxufSAgICAgICAgICk7XG5cbmNvbnN0IHsgdGVzdDogSVNfSU5ERU5UIH0gPSB0aGVSZWdFeHAoL15bXFx0IF0qJC8pO1xuXG5jb25zdCByZXR1cm5fZmFsc2UgPSAoKSA9PiBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTERvY3VtZW50IGV4dGVuZHMgQXJyYXkgICAgICAgICAgICAgIHtcblx0XG5cdCAgICAgICAgIGdldCBbJ2NvbnN0cnVjdG9yJ10gKCkgeyByZXR1cm4gQXJyYXk7IH1cblx0XG5cdDAgPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7XG5cdFxuXHQgICAgICAgICBhc0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHJldHVybl9mYWxzZTtcblx0ICAgICAgICAgbmV3bGluZSAgICAgICAgICAgICAgICAgICAgID0gJyc7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclNlY3Rpb24gICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAgICAgICAgICA9IHRydWU7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckhlYWRlciAgICAgICAgICA9IHRydWU7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXIgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCAgICAgICAgICA9IGZhbHNlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJEb3R0ZWQgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgaW5kZW50ICAgICAgICAgPSAnXFx0Jztcblx0ICAgICAgICAgVCAgICAgICAgICAgICAgICAgID0gJ1QnO1xuXHQgICAgICAgICBaICAgICAgICAgICAgPSAnWic7XG5cdCAgICAgICAgIG51bGxEaXNhYmxlZCAgICAgICAgICA9IHRydWU7XG5cdCAgICAgICAgIG11bHRpbGluZVRhYmxlRGlzYWJsZWQgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZUNvbW1hICAgICAgICAgIDtcblx0ICAgICAgICAgcHJlZmVyQ29tbWVudEZvclRoaXMgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgJHNpbmdsZWxpbmVBcnJheSAgICAgICAgICAgICAgICA7XG5cdFxuXHRjb25zdHJ1Y3RvciAob3B0aW9ucyAgICAgICAgICAgICAgICAgICkge1xuXHRcdFxuXHRcdHN1cGVyKCk7XG5cdFx0XG5cdFx0aWYgKCBvcHRpb25zPT1udWxsICkgeyByZXR1cm4gdGhpczsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgaW50ZWdlciB9ID0gb3B0aW9ucztcblx0XHRpZiAoIGludGVnZXI9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBpbnRlZ2VyPT09TUFYX1NBRkVfSU5URUdFUiApIHsgdGhpcy5hc0ludGVnZXIgPSBpc1NhZmVJbnRlZ2VyOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbnRlZ2VyPT09J251bWJlcicgKSB7XG5cdFx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKGludGVnZXIpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2ludGVnZXJ9KSBjYW4gb25seSBiZSBhIHNhZmUgaW50ZWdlcmApOyB9XG5cdFx0XHRjb25zdCBtYXggPSBpbnRlZ2VyPj0wID8gaW50ZWdlciA6IC1pbnRlZ2VyIC0gMTtcblx0XHRcdGNvbnN0IG1pbiA9IGludGVnZXI+PTAgPyAtaW50ZWdlciA6IGludGVnZXI7XG5cdFx0XHR0aGlzLmFzSW50ZWdlciA9IChudW1iZXIgICAgICAgICkgPT4gaXNTYWZlSW50ZWdlcihudW1iZXIpICYmIG1pbjw9bnVtYmVyICYmIG51bWJlcjw9bWF4O1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2ludGVnZXJ9KSBjYW4gb25seSBiZSBudW1iZXJgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgbmV3bGluZSB9ID0gb3B0aW9ucztcblx0XHRpZiAoIG5ld2xpbmU9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBuZXdsaW5lPT09J1xcbicgfHwgbmV3bGluZT09PSdcXHJcXG4nICkgeyB0aGlzLm5ld2xpbmUgPSBuZXdsaW5lOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aHJvdyB0eXBlb2YgbmV3bGluZT09PSdzdHJpbmcnXG5cdFx0XHRcdD8gU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZX0pIGNhbiBvbmx5IGJlIHZhbGlkIFRPTUwgbmV3bGluZWApXG5cdFx0XHRcdDogVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSBzdHJpbmdgKTtcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3QgeyBwcmVmZXJDb21tZW50Rm9yIH0gPSBvcHRpb25zO1xuXHRcdGlmICggcHJlZmVyQ29tbWVudEZvcj09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcycgfHwgcHJlZmVyQ29tbWVudEZvcj09PSdrZXknICkgeyB0aGlzLnByZWZlckNvbW1lbnRGb3JUaGlzID0gcHJlZmVyQ29tbWVudEZvcj09PSd0aGlzJzsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7cHJlZmVyQ29tbWVudEZvcikgY2FuIG9ubHkgYmUgJ2tleScgb3IgJ3RoaXMnYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IFtvcHRpb25zLm5ld2xpbmVBcm91bmQgfHwgJ2hlYWRlciddOiBhcm91bmQgPSBuYW1lMmNvZGUuaGVhZGVyIH0gPSBuYW1lMmNvZGU7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJTZWN0aW9uID0gYXJvdW5kPjA7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciA9IGFyb3VuZD09PTEgfHwgYXJvdW5kPT09Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlckhlYWRlciA9IGFyb3VuZD4xO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyUGFpciA9IGFyb3VuZD4yO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCA9IGFyb3VuZD09PTM7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJEb3R0ZWQgPSBhcm91bmQ+Mztcblx0XHRcblx0XHRjb25zdCB7IGluZGVudCB9ID0gb3B0aW9ucztcblx0XHRpZiAoIGluZGVudD09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nc3RyaW5nJyApIHtcblx0XHRcdGlmICggIUlTX0lOREVOVChpbmRlbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gb25seSBpbmNsdWRlIFRhYiBvciBTcGFjZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9IGluZGVudDtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nbnVtYmVyJyApIHtcblx0XHRcdGlmICggIWlzU2FmZUludGVnZXIoaW5kZW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnQ6JHtpbmRlbnR9fSkgaXMgb3V0IG9mIHJhbmdlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gJyAnLnJlcGVhdChpbmRlbnQpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBub3QgYmUgXCIke3R5cGVvZiBpbmRlbnR9XCIgdHlwZWApOyB9XG5cdFx0XG5cdFx0Y29uc3QgeyBUIH0gPSBvcHRpb25zO1xuXHRcdGlmICggVD09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIFQ9PT0nICcgfHwgVD09PSd0JyB8fCBUPT09J1QnICkgeyB0aGlzLlQgPSBUOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtUfSkgY2FuIG9ubHkgYmUgXCJUXCIgb3IgXCIgXCIgb3IgXCJ0XCJgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgWiB9ID0gb3B0aW9ucztcblx0XHRpZiAoIFo9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBaPT09J3onIHx8IFo9PT0nWicgKSB7IHRoaXMuWiA9IFo7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse1p9KSBjYW4gb25seSBiZSBcIlpcIiBvciBcInpcImApOyB9XG5cdFx0XG5cdFx0aWYgKCBvcHRpb25zLnhOdWxsICkgeyB0aGlzLm51bGxEaXNhYmxlZCA9IGZhbHNlOyB9XG5cdFx0XG5cdFx0Y29uc3QgeyB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGUgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nJyB8fCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nLCcgKSB7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlRGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9ICEheEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse3hCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZX0pIGNhbiBvbmx5IGJlIFwiXCIgb3IgXCIsXCJgKTsgfVxuXHRcdFxuXHRcdGNvbnN0ICRzaW5nbGVsaW5lQXJyYXkgPSBvcHRpb25zLmZvcmNlSW5saW5lQXJyYXlTcGFjaW5nO1xuXHRcdHN3aXRjaCAoICRzaW5nbGVsaW5lQXJyYXkgKSB7XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdHRoaXMuJHNpbmdsZWxpbmVBcnJheSA9ICRzaW5nbGVsaW5lQXJyYXk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgdHlwZW9mICRzaW5nbGVsaW5lQXJyYXk9PT0nbnVtYmVyJ1xuXHRcdFx0XHRcdD8gUmFuZ2VFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSAwIHwgMSB8IDIgfCAzLCBub3QgaW5jbHVkaW5nICR7JHNpbmdsZWxpbmVBcnJheX1gKVxuXHRcdFx0XHRcdDogVHlwZUVycm9yKGBhcnJheSBpbmxpbmUgbW9kZSBtdXN0IGJlIFwibnVtYmVyXCIgdHlwZSwgbm90IGluY2x1ZGluZyAkeyRzaW5nbGVsaW5lQXJyYXk9PT1udWxsID8gJ1wibnVsbFwiJyA6IHR5cGVvZiAkc2luZ2xlbGluZUFycmF5fWApO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdGhpcztcblx0XHRcblx0fVxuXHRcblx0YXBwZW5kU2VjdGlvbiAoKSB7IHJldHVybiB0aGlzW3RoaXMubGVuZ3RoXSA9IG5ldyBUT01MU2VjdGlvbih0aGlzKTsgfVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vLyBleHRlcm5hbFxuXG5pbXBvcnQgVE9NTERvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnO1xuY29uc3QgbGluZXNGcm9tU3RyaW5naWZ5ID0gbmV3IFdlYWtTZXQgICAgICAgICAgICAgICAgICAgKCk7XG5jb25zdCBiZUxpbmVzRnJvbVN0cmluZ2lmeSA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChsaW5lc0Zyb21TdHJpbmdpZnkpO1xuZXhwb3J0IGNvbnN0IGlzTGluZXNGcm9tU3RyaW5naWZ5ID0gLyojX19QVVJFX18qL2hhcy5iaW5kKGxpbmVzRnJvbVN0cmluZ2lmeSk7XG5leHBvcnQgZGVmYXVsdCAocm9vdFRhYmxlICAgICAgICAgICAgICAgICwgb3B0aW9ucyAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZG9jdW1lbnQgPSBuZXcgVE9NTERvY3VtZW50KG9wdGlvbnMpO1xuXHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnRbMF07XG5cdHNlY3Rpb25bMF0gPSAnJztcblx0eCAgICAgIChzZWN0aW9uLmFzc2lnbkJsb2NrKGBgLCBgYCwgcm9vdFRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHJvb3RUYWJsZSkpKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0xICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uIHx8IGRvY3VtZW50W2RvY3VtZW50Lmxlbmd0aCAtIDFdIC5hcHBlbmROZXdsaW5lKCk7XG5cdGlmICggZG9jdW1lbnQubmV3bGluZSApIHsgcmV0dXJuIGRvY3VtZW50LmpvaW4oZG9jdW1lbnQubmV3bGluZSk7IH1cblx0Y29uc3QgbGluZXMgPSBkb2N1bWVudC5mbGF0KCk7XG5cdGJlTGluZXNGcm9tU3RyaW5naWZ5KGxpbmVzKTtcblx0cmV0dXJuIGxpbmVzO1xufTtcblxuZXhwb3J0IHsgaW5saW5lLCBTZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuZXhwb3J0IHsgX2xpdGVyYWwgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IG11bHRpbGluZVRhYmxlLCBtdWx0aWxpbmVBcnJheSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IHNpbmdsZWxpbmVCYXNpY1N0cmluZywgTGluZXMsIG11bHRpbGluZVN0cmluZywgbXVsdGlsaW5lQmFzaWNTdHJpbmcsIG11bHRpbGluZUxpdGVyYWxTdHJpbmcsIG11bHRpbGluZU5lZWRCYXNpYyB9IGZyb20gJy4vc3RyaW5nJztcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IG11bHRpbGluZSA9ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RyaW5nICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gTGl0ZXJhbE9iamVjdCgoIG11bHRpbGluZU5lZWRCYXNpYyh2YWx1ZSkgPyBtdWx0aWxpbmVCYXNpY1N0cmluZyA6IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgKSgoICdcXG4nICsgdmFsdWUgKS5zcGxpdCgnXFxuJykgICAgICAgICApLCB2YWx1ZSkgOlxuXHRcdFx0aXNBcnJheSh2YWx1ZSkgPyBMaXRlcmFsT2JqZWN0KG11bHRpbGluZVN0cmluZyhMaW5lcyh2YWx1ZSkpLCB0eXBlb2Ygc3RyaW5nPT09J3N0cmluZycgPyBzdHJpbmcgOiBOdWxsKG51bGwpKSA6XG5cdFx0XHRcdG11bHRpbGluZVRhYmxlKHZhbHVlKTtcblx0bXVsdGlsaW5lLmJhc2ljID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RyaW5nICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiBsaW5lcz09PSdzdHJpbmcnXG5cdFx0XHQ/IExpdGVyYWxPYmplY3QobXVsdGlsaW5lQmFzaWNTdHJpbmcoKCAnXFxuJyArIGxpbmVzICkuc3BsaXQoJ1xcbicpICAgICAgICAgKSwgbGluZXMpXG5cdFx0XHQ6IExpdGVyYWxPYmplY3QobXVsdGlsaW5lQmFzaWNTdHJpbmcoTGluZXMobGluZXMpKSwgdHlwZW9mIHN0cmluZz09PSdzdHJpbmcnID8gc3RyaW5nIDogTnVsbChudWxsKSlcblx0O1xuXHRtdWx0aWxpbmUuYXJyYXkgPSBtdWx0aWxpbmVBcnJheTtcblx0ZnJlZXplKG11bHRpbGluZSk7XG5cdHJldHVybiBtdWx0aWxpbmU7XG59ICkoKTtcbmV4cG9ydCBjb25zdCBiYXNpYyA9ICh2YWx1ZSAgICAgICAgKSA9PiBMaXRlcmFsT2JqZWN0KHNpbmdsZWxpbmVCYXNpY1N0cmluZyh2YWx1ZSksIHZhbHVlKTtcbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAuLi5jaGFycyAgICAgICAgICApID0+IHtcblx0aWYgKCB0eXBlb2YgbGl0ZXJhbD09PSdzdHJpbmcnICkge1xuXHRcdGlmICggY2hhcnMubGVuZ3RoPT09MSApIHtcblx0XHRcdHJldHVybiBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuaW5jbHVkZXMoJ1xcbicpID8gbGl0ZXJhbC5zcGxpdCgnXFxuJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsaXRlcmFsLCBjaGFyc1swXSAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsZXQgaW5kZXggPSBjaGFycy5sZW5ndGg7XG5cdFx0aWYgKCBpbmRleCApIHtcblx0XHRcdGNvbnN0IHsgcmF3IH0gPSBsaXRlcmFsO1xuXHRcdFx0bGl0ZXJhbCA9IHJhd1tpbmRleF0gO1xuXHRcdFx0d2hpbGUgKCBpbmRleCApIHsgY2hhcnNbLS1pbmRleF0gKz0gcmF3W2luZGV4XSA7IH1cblx0XHRcdGxpdGVyYWwgPSBjaGFycy5qb2luKCcnKSArIGxpdGVyYWw7XG5cdFx0fVxuXHRcdGVsc2UgeyBsaXRlcmFsID0gbGl0ZXJhbC5yYXdbMF0gOyB9XG5cdH1cblx0cmV0dXJuIExpdGVyYWxPYmplY3QobGl0ZXJhbC5pbmNsdWRlcygnXFxuJykgPyBsaXRlcmFsLnNwbGl0KCdcXG4nKSAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxpdGVyYWwsIE51bGwobnVsbCkpO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgaXNWaWV3IGZyb20gJy5BcnJheUJ1ZmZlci5pc1ZpZXcnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcbmltcG9ydCBpc0FycmF5QnVmZmVyIGZyb20gJy5jbGFzcy5pc0FycmF5QnVmZmVyJztcbmltcG9ydCBUZXh0RGVjb2RlciBmcm9tICcuVGV4dERlY29kZXInO1xuXG5pbXBvcnQgeyBjbGVhclJlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgUm9vdCBmcm9tICcuL2xldmVsLWxvb3AnO1xuaW1wb3J0IHsgaXNMaW5lc0Zyb21TdHJpbmdpZnkgfSBmcm9tICcuLi9zdHJpbmdpZnkvJztcblxuY29uc3QgdGV4dERlY29kZXIgPSAvKiNfX1BVUkVfXyovbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIE51bGwoeyBmYXRhbDogdHJ1ZSwgaWdub3JlQk9NOiBmYWxzZSB9KSk7XG5jb25zdCBiaW5hcnkyc3RyaW5nID0gKGFycmF5QnVmZmVyTGlrZSAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBpc1ZpZXcoYXJyYXlCdWZmZXJMaWtlKSA/IGFycmF5QnVmZmVyTGlrZS5sZW5ndGghPT1hcnJheUJ1ZmZlckxpa2UuYnl0ZUxlbmd0aCA6ICFpc0FycmF5QnVmZmVyKGFycmF5QnVmZmVyTGlrZSkgKSB7IHRocm93IFR5cGVFcnJvcihgb25seSBVaW50OEFycmF5IG9yIEFycmF5QnVmZmVyIGlzIGFjY2VwdGFibGVgKTsgfVxuXHR0cnkgeyByZXR1cm4gdGV4dERlY29kZXIuZGVjb2RlKGFycmF5QnVmZmVyTGlrZSk7IH1cblx0Y2F0Y2ggeyB0aHJvdyBFcnJvcihgQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVua25vd24gY29kZSBwb2ludC5gKTsgfVxufTtcbmNvbnN0IGlzQmluYXJ5TGlrZSA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+ICdieXRlTGVuZ3RoJyBpbiB2YWx1ZTsvLy9cblxuY29uc3QgeyB0ZXN0OiBpbmNsdWRlc05vblNjYWxhciB9ID0gdGhlUmVnRXhwKC9bXFx1RDgwMC1cXHVERkZGXS91KTtcbmNvbnN0IGFzc2VydEZ1bFNjYWxhciA9IChzdHJpbmcgICAgICAgICkgICAgICAgPT4ge1xuXHRpZiAoIGNsZWFyUmVnRXhwKGluY2x1ZGVzTm9uU2NhbGFyKHN0cmluZykpICkgeyB0aHJvdyBFcnJvcihgQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVuY291cGxlZCBVQ1MtNCBjaGFyYWN0ZXIgY29kZS5gKTsgfVxufTtcblxubGV0IGhvbGRpbmcgICAgICAgICAgPSBmYWxzZTtcblxuY29uc3QgcGFyc2UgPSAoc291cmNlICAgICAgICAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBiaWdpbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcblx0aWYgKCB0eXBlb2Ygc291cmNlPT09J29iamVjdCcgJiYgc291cmNlICkge1xuXHRcdGlmICggaXNBcnJheShzb3VyY2UpICkgeyB0aHJvdyBUeXBlRXJyb3IoaXNMaW5lc0Zyb21TdHJpbmdpZnkoc291cmNlKSA/IGBUT01MLnBhcnNlKGFycmF5IGZyb20gVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lP30pKWAgOiBgVE9NTC5wYXJzZShhcnJheSlgKTsgfVxuXHRcdGVsc2UgaWYgKCBpc0JpbmFyeUxpa2Uoc291cmNlKSApIHsgc291cmNlID0gYmluYXJ5MnN0cmluZyhzb3VyY2UpOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzb3VyY2VQYXRoID0gc291cmNlLnBhdGg7XG5cdFx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucGF0aClgKTsgfVxuXHRcdFx0Y29uc3QgeyBkYXRhLCByZXF1aXJlOiByZXEgPSB0eXBlb2YgcmVxdWlyZT09PSdmdW5jdGlvbicgPyByZXF1aXJlIDogdW5kZWZpbmVkIH0gPSBzb3VyY2U7XG5cdFx0XHRpZiAoIHJlcSApIHtcblx0XHRcdFx0Y29uc3QgeyByZXNvbHZlIH0gPSByZXE7XG5cdFx0XHRcdGlmICggcmVzb2x2ZSE9bnVsbCApIHtcblx0XHRcdFx0XHRjb25zdCB7IHBhdGhzIH0gPSByZXNvbHZlO1xuXHRcdFx0XHRcdGlmICggcGF0aHMhPW51bGwgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXQgPSBhcHBseShwYXRocywgcmVzb2x2ZSwgWyAnJyBdKTtcblx0XHRcdFx0XHRcdGlmICggcmV0IT1udWxsICkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB2YWwgPSByZXRbMF07XG5cdFx0XHRcdFx0XHRcdGlmICggdmFsIT1udWxsICkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGRpcm5hbWVfID0gdmFsLnJlcGxhY2UoL25vZGVfbW9kdWxlcyQvLCAnJyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBkaXJuYW1lXyApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNvdXJjZVBhdGggPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ3BhdGgnKS5yZXNvbHZlKGRpcm5hbWVfLCBzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdwYXRoJykucmVzb2x2ZSlgKTsgfVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9ICggcmVxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKCdmcycpLnJlYWRGaWxlU3luYyhzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYylgKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlID0gZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YSlgKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5kYXRhfHNvdXJjZS5yZXF1aXJlKWApOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlID0gZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YSlgKTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlKTsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZSlgKTsgfVxuXHRsZXQgam9pbmVyICAgICAgICAgICAgICAgICAgICA7XG5cdGxldCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHR5cGVvZiBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT0nb2JqZWN0JyAmJiBtdWx0aWxpbmVTdHJpbmdKb2luZXIgKSB7XG5cdFx0aWYgKCBiaWdpbnQhPT11bmRlZmluZWQgfHwgeCE9PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKGBvcHRpb25zIG1vZGUgPyBhcmdzIG1vZGVgKTsgfVxuXHRcdGpvaW5lciA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5qb2luZXI7XG5cdFx0YmlnaW50ID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyLmJpZ2ludDtcblx0XHRrZXlzID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyLmtleXM7XG5cdFx0eCA9IG11bHRpbGluZVN0cmluZ0pvaW5lci54O1xuXHRcdGFyZ3NNb2RlID0gJyc7XG5cdH1cblx0ZWxzZSB7IGpvaW5lciA9IG11bHRpbGluZVN0cmluZ0pvaW5lcjsgfVxuXHRsZXQgcm9vdFRhYmxlICAgICAgIDtcblx0bGV0IHByb2Nlc3MgICAgICAgICAgICAgICAgIDtcblx0aWYgKCBob2xkaW5nICkgeyB0aHJvdyBFcnJvcihgcGFyc2luZyBkdXJpbmcgcGFyc2luZy5gKTsgfVxuXHRob2xkaW5nID0gdHJ1ZTtcblx0dHJ5IHtcblx0XHRvcHRpb25zLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgam9pbmVyLCBiaWdpbnQsIGtleXMsIHgsIGFyZ3NNb2RlKTtcblx0XHRpdGVyYXRvci50b2RvKHNvdXJjZSwgc291cmNlUGF0aCk7XG5cdFx0c291cmNlICYmIHNvdXJjZVswXT09PSdcXHVGRUZGJyAmJiBpdGVyYXRvci50aHJvd3MoVHlwZUVycm9yKGBUT01MIGNvbnRlbnQgKHN0cmluZykgc2hvdWxkIG5vdCBzdGFydCB3aXRoIEJPTSAoVStGRUZGKWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0cm9vdFRhYmxlID0gUm9vdCgpO1xuXHRcdHByb2Nlc3MgPSBvcHRpb25zLlByb2Nlc3MoKTtcblx0fVxuXHRmaW5hbGx5IHtcblx0XHRpdGVyYXRvci5kb25lKCk7Ly9jbGVhcldlYWtTZXRzKCk7XG5cdFx0b3B0aW9ucy5jbGVhcigpO1xuXHRcdGhvbGRpbmcgPSBmYWxzZTtcblx0XHRjbGVhclJlZ0V4cCgpO1xuXHR9XG5cdHByb2Nlc3MgJiYgcHJvY2VzcygpO1xuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2Fzc2lnbihcblx0KHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT5cblx0XHR0eXBlb2Ygc3BlY2lmaWNhdGlvblZlcnNpb249PT0nbnVtYmVyJ1xuXHRcdFx0PyBwYXJzZShzb3VyY2UsIHNwZWNpZmljYXRpb25WZXJzaW9uLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsLCcpXG5cdFx0XHQ6IHBhcnNlKHNvdXJjZSwgMS4wLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICAsICcsJylcblx0LFxuXHR7XG5cdFx0JzEuMCc6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MS4wOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDEuMCwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuNTogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjUsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjQ6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC40LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC4zOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMywgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuMjogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjIsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjE6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4xLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdH1cbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCBcblx0ICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5cbmltcG9ydCB7IEtleXMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UvJztcbmltcG9ydCBzdHJpbmdpZnksIHsgU2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsIH0gZnJvbSAnLi9zdHJpbmdpZnkvJztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSB9IGZyb20gJy4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgaXNJbmxpbmUsIGlzU2VjdGlvbiB9IGZyb20gJy4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMgfSBmcm9tICcuL3R5cGVzL2NvbW1lbnQnO1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCwgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMsXG5cdE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSxcblx0aXNJbmxpbmUsIGlzU2VjdGlvbixcblx0S2V5cyxcbn0pO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwsIGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG5cdEtleXMsXG59O1xuIl0sIm5hbWVzIjpbIlByb3h5IiwiT2JqZWN0X2ZyZWV6ZSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJzZXRfaGFzIiwic2V0X2FkZCIsImRlbCIsIk51bGwiLCJvcmRlcmlmeV9OdWxsIiwiaXRlcmF0b3IudGhyb3dzIiwiaXRlcmF0b3Iud2hlcmUiLCJmcmVlemUiLCJLRVlTIiwiZ2V0Iiwic2V0IiwiY3JlYXRlIiwicmVnZXhwcy5zd2l0Y2hSZWdFeHAiLCJTeW1ib2wiLCJPYmplY3QiLCJvd25LZXlzIiwib3B0aW9ucy56ZXJvRGF0ZXRpbWUiLCJwYXJzZSIsIm9wdGlvbnMubXVzdFNjYWxhciIsIml0ZXJhdG9yLmxpbmVJbmRleCIsIlVOREVSU0NPUkVTIiwib3B0aW9ucy5hbGxvd0xvbmdlciIsIm9wdGlvbnMudXNpbmdCaWdJbnQiLCJvcHRpb25zLkludGVnZXJNaW5OdW1iZXIiLCJvcHRpb25zLkludGVnZXJNYXhOdW1iZXIiLCJOYU4iLCJfSW5maW5pdHkiLCJvcHRpb25zLnNGbG9hdCIsIm9wdGlvbnMuc0Vycm9yIiwib3B0aW9ucy5UYWJsZSIsIm9wdGlvbnMuY29sbGVjdCIsInJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QiLCJyZWdleHBzLkxJVEVSQUxfU1RSSU5HX2V4ZWMiLCJvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCIsInJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMiLCJpdGVyYXRvci5tYXJrIiwib3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nIiwib3B0aW9ucy5BUkdTX01PREUiLCJyZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgiLCJyZWdleHBzLlBSRV9XSElURVNQQUNFIiwicmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoIiwicmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCIsIm9wdGlvbnMuS0VZUyIsInJlZ2V4cHMuX19MSVRFUkFMX0tFWV9leGVjIiwicmVnZXhwcy5fX0JBUkVfS0VZX2V4ZWMiLCJyZWdleHBzLklTX0RPVF9LRVkiLCJyZWdleHBzLkRPVF9LRVkiLCJvcHRpb25zLmRpc2FibGVEaWdpdCIsInJlZ2V4cHMuaXNBbWF6aW5nIiwib3B0aW9ucy5lbmFibGVOdWxsIiwib3B0aW9ucy5kaXNhbGxvd0VtcHR5S2V5IiwicmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucy5hc1N0cmluZ3MiLCJvcHRpb25zLmlubGluZVRhYmxlIiwib3B0aW9ucy5hc1RhYmxlcyIsIm9wdGlvbnMuYXNBcnJheXMiLCJyZWdleHBzLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMuYXNCb29sZWFucyIsIm9wdGlvbnMuYXNOdWxscyIsIm9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zLm1vcmVEYXRldGltZSIsIm9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyIsIm9wdGlvbnMuYXNMb2NhbFRpbWVzIiwib3B0aW9ucy5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zLmFzRmxvYXRzIiwib3B0aW9ucy5hc0ludGVnZXJzIiwicmVnZXhwcy5TWU1fV0hJVEVTUEFDRSIsIm9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIm9wdGlvbnMucHJlc2VydmVDb21tZW50IiwicmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyIsIml0ZXJhdG9yLnJlc3QiLCJpdGVyYXRvci5uZXh0IiwicmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzIiwiZnJvbUVudHJpZXMiLCJEQVRFIiwiY2xlYXJSZWdFeHAiLCJhcHBseSIsIm9wdGlvbnMudXNlIiwiaXRlcmF0b3IudG9kbyIsIm9wdGlvbnMuUHJvY2VzcyIsIml0ZXJhdG9yLmRvbmUiLCJvcHRpb25zLmNsZWFyIiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQkFBYyxRQUFROzs7Ozs7Ozs7Ozs7O0FDSWYsSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDO0FBQ0osRUFBRSxDQUFDO0FBQ0g7QUFDTyxJQUFJLElBQUksNkNBQTZDLElBQUk7QUFDaEUsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRO0FBQ3RDLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDakIsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFO0FBQzNCLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUM7QUFDSixFQUFFLENBQUM7QUFDSDtBQUNBLFNBQVMsUUFBUSxFQUFFLEVBQUUsa0JBQWtCO0FBQ3ZDLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFD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