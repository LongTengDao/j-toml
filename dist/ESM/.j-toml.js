/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.38.0
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

const version = '1.38.0';

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
		else if ( !sError ) {
			if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
			if ( literal==='-inf' ) { return _Infinity$1; }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2dyb3VwaWZ5LnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvbm9uLWF0b20udHMiLCJ0eXBlcy9UYWJsZS50cyIsIml0ZXJhdG9yLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjM4LjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovX19QVVJFX18ocmUpOyB9O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gIVU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9ICFJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/ICFNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/ICFTIDogbnVsbDtcblx0cmV0dXJuIHJlO1xufVxuXG52YXIgUkVfYmluZCA9IGJpbmQgJiYgLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWluY2x1ZGVzKGZsYWdzLCAndScpLFxuXHRcdEk6ICFpbmNsdWRlcyhmbGFncywgJ2knKSxcblx0XHRNOiAhaW5jbHVkZXMoZmxhZ3MsICdtJyksXG5cdFx0UzogIWluY2x1ZGVzKGZsYWdzLCAncycpLFxuXHRcdGZsYWdzOiBmbGFnc1xuXHR9O1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IC8qI19fUFVSRV9fKi9Db250ZXh0KCcnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlcblx0PyAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChSRSwgdGhpc0FyZywgYXJncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhcHBseShSRSwgQ09OVEVYVCwgYXJncyk7IH1cblx0XHQsXG5cdFx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdFx0LFxuXHRcdGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdCxcblx0XHRwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0fSlcblx0OiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdFJFLmFwcGx5ID0gUkUuYXBwbHk7XG5cdFx0dmFyIG5ld1JlZ0V4cCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KENPTlRFWFQsIGFyZ3VtZW50cyAgICAgICApOyB9ICAgICAgIDtcblx0XHR2YXIgZCA9IDE7XG5cdFx0dmFyIGcgPSBkKjI7XG5cdFx0dmFyIGkgPSBnKjI7XG5cdFx0dmFyIG0gPSBpKjI7XG5cdFx0dmFyIHMgPSBpKjI7XG5cdFx0dmFyIHUgPSBzKjI7XG5cdFx0dmFyIHkgPSB1KjI7XG5cdFx0dmFyIGZsYWdzID0geSoyIC0gMTtcblx0XHR3aGlsZSAoIGZsYWdzLS0gKSB7XG5cdFx0XHQoIGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHRcdG5ld1JlZ0V4cFtjb250ZXh0LmZsYWdzXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICApOyB9O1xuXHRcdFx0fSApKENvbnRleHQoXG5cdFx0XHRcdCggZmxhZ3MgJiBkID8gJycgOiAnZCcgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBnID8gJycgOiAnZycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBpID8gJycgOiAnaScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBtID8gJycgOiAnbScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBzID8gJycgOiAncycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB1ID8gJycgOiAndScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB5ID8gJycgOiAneScgKVxuXHRcdFx0KSk7XG5cdFx0fVxuXHRcdHJldHVybiBmcmVlemUgPyBmcmVlemUobmV3UmVnRXhwKSA6IG5ld1JlZ0V4cDtcblx0fSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gLyojX19QVVJFX18qL2NyZWF0ZShOVUxMKSAgICAgICAgIDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSApOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0gLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcgKyBjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyICsgc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyYWN0ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdICA6ICdbJyArIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykgKyAnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyArIGJyYW5jaGVzLmpvaW4oJ3wnKSArICcpJ1xuXHRcdClcblx0XHQrICggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHsgcGF0aCB9KWApOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY2xhc3MgbWFyayB7XG5cdCAgICAgICAgICAgICAgICAgbGluZUluZGV4ID0gbGluZUluZGV4O1xuXHQgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICAgICAgICAgIHJlc3RDb2x1bW4gICAgICAgIDtcblx0Y29uc3RydWN0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCByZXN0Q29sdW1uICAgICAgICApIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMucmVzdENvbHVtbiA9IHJlc3RDb2x1bW47XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0bXVzdCAoICAgICAgICAgICkgICAgICAgICB7XG5cdFx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7dGhpcy50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0XHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblx0fVxuXHRub3dyYXAgKCAgICAgICAgICAgIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdFx0dGhyb3cgdGhyb3dzKEVycm9yKGBUT01MLnBhcnNlKCR7YXJnc01vZGUgPyBgJHthcmdzTW9kZX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCByb3dJbmRleCAgICAgICAgID0gbGluZUluZGV4LCBjb2x1bW5OdW1iZXIgICAgICAgICA9IDApICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7cm93SW5kZXggKyAxfToke2NvbHVtbk51bWJlcn0pYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtyb3dJbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW3Jvd0luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBWQUxVRV9SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IExJVEVSQUxfU1RSSU5HX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5jb25zdCB7IGV4ZWM6IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYC52YWx1ZU9mKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCB7IGV4ZWM6IEtFWV9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogX1ZBTFVFX1BBSVJfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IFRBR19SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJdK3xcXFxcLj98XCIoPyFcIlwiKVwiPy9zeSk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAvKk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9ICovMDtcblx0d2hpbGUgKCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy50ZXN0KF8pICkgeyBsYXN0SW5kZXggPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0cmV0dXJuIGxhc3RJbmRleDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBUYWIgXFw8d3M+bmV3bGluZVxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIG5vdCBcXDx3cz5uZXdsaW5lXG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vLyBvcD9cblxuY29uc3QgQkFTSUNfU1RSSU5HX1RBQl9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5leHBvcnRcbmNvbnN0IHsgdGVzdDogSVNfRE9UX0tFWSB9ID0gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCB7IGV4ZWM6IEJBUkVfS0VZX1NUUklDVCB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKy8pO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9GUkVFIH0gPSB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5jb25zdCB7IGV4ZWM6IExJVEVSQUxfS0VZX19fXyB9ID0gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9ERUwgfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLyk7XG5leHBvcnRcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdCggbGluZVJlc3QubGVuZ3RoPjEgPyBsaW5lUmVzdFsxXT09PSddJz09PWFzQXJyYXlJdGVtIDogIWFzQXJyYXlJdGVtICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgYnV0IG1pc3NpbmcgYXQgJykpKTtcblx0dGFnIHx8IGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCB7IHRlc3Q6IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pO1xuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLyk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRiWzAxXVtfMDFdKlxuXHRcdHxcblx0XHRcdG9bMC03XVtfMC03XSpcblx0XHR8XG5cdFx0XHR4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qXG5cdFx0fFxuXHRcdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdFx0KVxuXHR8XG5cdFx0WzEtOV1bX1xcZF0qXG5cdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdHxcblx0XHRpbmZcblx0fFxuXHRcdG5hblxuXHQpXG5gLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfQU1BWklORyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IEJBRF9EWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmV4cG9ydCBjb25zdCBpc0FtYXppbmcgPSAoa2V5cyAgICAgICAgKSAgICAgICAgICA9PiBJU19BTUFaSU5HKGtleXMpICYmICFCQURfRFhPQihrZXlzKTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50Pyc7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyBQbGFpblRhYmxlLCBPcmRlcmVkVGFibGUgfSBmcm9tICcuL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuL3JlZ2V4cHMnO1xuXG5leHBvcnQgbGV0IG11c3RTY2FsYXIgICAgICAgICAgPSB0cnVlO1xuXG5leHBvcnQgbGV0IEFSR1NfTU9ERSAgICAgICAgICAgICAgICAgID0gJyc7XG5cbi8qIG9wdGlvbnMgKi9cblxuZXhwb3J0IGxldCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbk51bWJlciAgICAgICAgID0gMDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heE51bWJlciAgICAgICAgID0gMDtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gIFxuY29uc3QgQU5ZICAgICAgID0ge1xuXHR0ZXN0OiAoKSA9PiB0cnVlLFxufTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbmV4cG9ydCBjb25zdCBLZXlzID0gY2xhc3MgS2V5c1JlZ0V4cCBleHRlbmRzIFJlZ0V4cCAgICAgICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoa2V5cyAgICAgICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcihgXiR7Z3JvdXBpZnkoa2V5cyl9JGApO1xuXHRcdGxldCBtYXhMZW5ndGggPSAtMTtcblx0XHRmb3IgKCBsZXQgaW5kZXggPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXNbLS1pbmRleF0gO1xuXHRcdFx0aWYgKCBsZW5ndGg+bWF4TGVuZ3RoICkgeyBtYXhMZW5ndGggPSBsZW5ndGg7IH1cblx0XHR9XG5cdFx0dGhpcy5sYXN0SW5kZXggPSBtYXhMZW5ndGgrMTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQgICAgICAgICB0ZXN0ICggICAgICAgICAgICAgICAgICBrZXkgICAgICAgICkgICAgICAgICAge1xuXHRcdHJldHVybiBrZXkubGVuZ3RoPHRoaXMubGFzdEluZGV4ICYmIHN1cGVyLnRlc3Qoa2V5KTtcblx0fVxufTtcbmNvbnN0IGlzS2V5cyA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoLyojX19QVVJFX18qL2ZyZWV6ZShLZXlzLnByb3RvdHlwZSkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IEtFWVMgICAgICAgPSBBTlk7XG5leHBvcnQgbGV0IHByZXNlcnZlTGl0ZXJhbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0xvbmdlciAgICAgICAgIDtcbmV4cG9ydCBsZXQgZW5hYmxlTnVsbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSAgICAgICAgIDtcbmV4cG9ydCBsZXQgcHJlc2VydmVDb21tZW50ICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhYmxlRGlnaXQgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvci50aHJvd3MoVHlwZUVycm9yKGBUeXBlcyBpbiBBcnJheSBtdXN0IGJlIHNhbWVgICsgaXRlcmF0b3Iud2hlcmUoJy4gQ2hlY2sgJykpKVxuXHRcdFx0OiBhcnJheVR5cGVzX3NldChhcnJheSwgYXMpO1xuXHRcdHJldHVybiBhcnJheTtcblx0fTtcblx0cmV0dXJuIGFzO1xufTtcbmNvbnN0IEFTX1RZUEVEID0ge1xuXHRhc051bGxzOiBBcygpLFxuXHRhc1N0cmluZ3M6IEFzKCksXG5cdGFzVGFibGVzOiBBcygpLFxuXHRhc0FycmF5czogQXMoKSxcblx0YXNCb29sZWFuczogQXMoKSxcblx0YXNGbG9hdHM6IEFzKCksXG5cdGFzSW50ZWdlcnM6IEFzKCksXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZXM6IEFzKCksXG5cdGFzTG9jYWxUaW1lczogQXMoKSxcbn07XG5jb25zdCBhc01peGVkICAgICA9IChhcnJheSAgICAgICApICAgICAgICA9PiBhcnJheTtcbmV4cG9ydCBsZXRcblx0YXNOdWxscyAgICAsXG5cdGFzU3RyaW5ncyAgICAsXG5cdGFzVGFibGVzICAgICxcblx0YXNBcnJheXMgICAgLFxuXHRhc0Jvb2xlYW5zICAgICxcblx0YXNGbG9hdHMgICAgLFxuXHRhc0ludGVnZXJzICAgICxcblx0YXNPZmZzZXREYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVzICAgICxcblx0YXNMb2NhbFRpbWVzICAgIDtcblxuICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbmxldCBlYWNoICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuY29uc3QgY29sbGVjdF9vbiA9ICh0YWcgICAgICAgICwgYXJyYXkgICAgICAgICAgICAgICwgdGFibGUgICAgICAgICAgICAgICwga2V5ICAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IF9lYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2VhY2guX2xpbmtlZCA9IGVhY2g7XG5cdF9lYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRfZWFjaC50YWJsZSA9IHRhYmxlO1xuXHRcdF9lYWNoLmtleSA9IGtleSA7XG5cdH1cblx0aWYgKCBhcnJheSApIHtcblx0XHRfZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdF9lYWNoLmluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXHR9XG5cdGVhY2ggPSBfZWFjaDtcbn07XG5jb25zdCBjb2xsZWN0X29mZiA9ICgpICAgICAgICA9PiB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH07XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCBQcm9jZXNzID0gKCkgICAgICAgICAgPT4ge1xuXHRpZiAoIGVhY2ggKSB7XG5cdFx0Y29uc3QgX3Byb2Nlc3NvciA9IHByb2Nlc3NvciA7XG5cdFx0bGV0IF9lYWNoICAgICAgICAgICAgICA9IGVhY2g7XG5cdFx0ZWFjaCA9IG51bGw7XG5cdFx0cmV0dXJuICgpICAgICAgID0+IHtcblx0XHRcdGNvbnN0IHByb2Nlc3NvciA9IF9wcm9jZXNzb3I7XG5cdFx0XHRsZXQgZWFjaCAgICAgICAgICAgICAgPSBfZWFjaCA7XG5cdFx0XHRfZWFjaCA9IG51bGw7XG5cdFx0XHRkbyB7IHByb2Nlc3NvcihlYWNoKTsgfVxuXHRcdFx0d2hpbGUgKCBlYWNoID0gZWFjaC5fbGlua2VkICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0S0VZUyA9IEFOWTtcblx0dXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IHByb2Nlc3NvciA9IGVhY2ggPSBudWxsO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCBrZXlzICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAsIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdEFSR1NfTU9ERSA9IGFyZ3NNb2RlO1xuXHRcblx0bGV0IG1peGVkICAgICAgICAgO1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0bXVzdFNjYWxhciA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRtdXN0U2NhbGFyID0gZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdG11c3RTY2FsYXIgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5wYXJzZSgsc3BlY2lmaWNhdGlvblZlcnNpb24pYCk7XG5cdH1cblx0cmVnZXhwcy5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0ZWxzZSBpZiAoIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PXVuZGVmaW5lZCApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG51bGw7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pYCk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KWApOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSx1c2VCaWdJbnRgIDogYCx7IGJpZ2ludCB9YH0pYCk7IH1cblx0XHR1c2luZ0JpZ0ludCA9IG51bGw7XG5cdFx0dXNlQmlnSW50Pj0wXG5cdFx0XHQ/IEludGVnZXJNaW5OdW1iZXIgPSAtKCBJbnRlZ2VyTWF4TnVtYmVyID0gdXNlQmlnSW50IClcblx0XHRcdDogSW50ZWdlck1heE51bWJlciA9IC0oIEludGVnZXJNaW5OdW1iZXIgPSB1c2VCaWdJbnQgKSAtIDE7XG5cdH1cblx0aWYgKCAhQmlnSW50ICYmIHVzaW5nQmlnSW50IT09ZmFsc2UgKSB7IHRocm93IEVycm9yKGBDYW4ndCB3b3JrIHdpdGhvdXQgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KSBiZWluZyBzZXQgdG8gZmFsc2UsIGJlY2F1c2UgdGhlIGhvc3QgZG9lc24ndCBoYXZlIEJpZ0ludCBzdXBwb3J0YCk7IH1cblx0XG5cdGlmICgga2V5cz09bnVsbCApIHsgS0VZUyA9IEFOWTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoICFpc0tleXMoa2V5cykgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgseyBrZXlzIH0pYCk7IH1cblx0XHRLRVlTID0ga2V5cztcblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCApIHtcblx0XHRUYWJsZSA9IFBsYWluVGFibGU7XG5cdFx0c0Vycm9yID0gYWxsb3dMb25nZXIgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IGZhbHNlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHhPcHRpb25zIT09J29iamVjdCcgKSB7XG5cdFx0dGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseE9wdGlvbnNgIDogYCx7IHggfWB9KWApO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgY29tbWVudCwgc3RyaW5nLCBsaXRlcmFsLCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGNvbnN0IHVua25vd25OYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXModW5rbm93bik7XG5cdFx0aWYgKCB1bmtub3duTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx7ICR7dW5rbm93bk5hbWVzLmpvaW4oJywgJyl9IH1gIDogYCx7IHg6IHsgJHt1bmtub3duTmFtZXMuam9pbignLCAnKX0gfSB9YH0pYCk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRwcmVzZXJ2ZUNvbW1lbnQgPSAhIWNvbW1lbnQ7XG5cdFx0ZGlzYWJsZURpZ2l0ID0gISFzdHJpbmc7XG5cdFx0cHJlc2VydmVMaXRlcmFsID0gISFsaXRlcmFsO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseyB0YWcgfWAgOiBgLHsgeDogeyB0YWcgfSB9YH0pYCk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx4T3B0aW9uc2AgOiBgLHsgeCB9YH0pIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXlgKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5cbmNvbnN0IHByZXZpb3VzICAgICAgICAgICAgICAgID0gU3ltYm9sKCdwcmV2aW91cycpICAgICAgIDtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuICBcblxuZXhwb3J0IGNvbnN0IHggPSAgICAgKHJvb3RTdGFjayAgICAgICkgICAgPT4ge1xuXHRsZXQgc3RhY2sgICAgICAgID0gcm9vdFN0YWNrO1xuXHRsZXQgcmVzdWx0ID0gc3RhY2submV4dCgpO1xuXHRpZiAoICFyZXN1bHQuZG9uZSApIHtcblx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRpZiAoIHJlc3VsdC5kb25lICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrPT09cm9vdFN0YWNrICkgeyBicmVhazsgfVxuXHRcdFx0XHRzdGFjayA9IHN0YWNrW3ByZXZpb3VzXSA7XG5cdFx0XHRcdHJlc3VsdCA9IHN0YWNrLm5leHQocmVzdWx0LnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0XHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQudmFsdWU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0IFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCBjb25zdCBfbGl0ZXJhbCAgICAgICAgICAgICAgICA9IFN5bWJvbCgnX2xpdGVyYWwnKSAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBMaXRlcmFsT2JqZWN0ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxpdGVyYWwgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0Y29uc3Qgb2JqZWN0ID0gT2JqZWN0KHZhbHVlKSAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0b2JqZWN0W19saXRlcmFsXSA9IGxpdGVyYWw7XG5cdHJldHVybiBvYmplY3Q7XG59O1xuIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IGFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgYXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChhcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoYXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBPRl9UQUJMRVMgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBTVEFUSUNBTExZID0gdHJ1ZTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBzdGF0aWNhbEFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoc3RhdGljYWxBcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzU3RhdGljID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHN0YXRpY2FsQXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbmV3QXJyYXkgPSAoaXNTdGF0aWMgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGFycmF5ICAgICAgICA9IFtdO1xuXHRhcnJheXNfYWRkKGFycmF5KTtcblx0aXNTdGF0aWMgJiYgc3RhdGljYWxBcnJheXNfYWRkKGFycmF5KTtcblx0cmV0dXJuIGFycmF5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgTmF0aXZlRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLkRhdGUucGFyc2UnO1xuaW1wb3J0IGZsb29yIGZyb20gJy5NYXRoLmZsb29yJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuLy8vaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLm51bGwuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5cbmNvbnN0IGZwYyA9ICAgICAgICAgICAgICAgICAgICAgIChjICAgKSAgICA9PiB7XG5cdGZyZWV6ZShmcmVlemUoYykucHJvdG90eXBlKTtcblx0cmV0dXJuIGM7XG59O1xuXG5jb25zdCBfMjlfID0gLyg/OjBbMS05XXwxXFxkfDJcXGQpLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KVxuYC52YWx1ZU9mKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5gLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86W1p6XXxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgeyBleGVjOiBaX2V4ZWMgfSA9IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZHsxLDN9KFxcZCo/KTAqKT9cblx0KD86W1p6XXxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCgpXG5cdFtael1cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEVUSU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9EQVRFIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfVElNRSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgVCA9IC9bIHRdLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IFpFUk8gPSAvXFwuKFxcZCo/KTArJC87XG5jb25zdCB6ZXJvUmVwbGFjZXIgPSAobWF0Y2ggICAgICAgICwgcDEgICAgICAgICkgPT4gcDE7XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgemVyb1JlcGxhY2VyKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgZCA9IC8uL2dzO1xuY29uc3QgZDJ1ID0gKGQgICAgICAgICkgPT4gJ1xcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDknW2QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA7XG5jb25zdCBWYWx1ZU9GRlNFVCA9ICh0aW1lICAgICAgICAsIG1vcmUgICAgICAgICkgICAgICAgID0+IHRpbWU8MFxuXHQ/ICggJycgKyAoIHRpbWUgKyA2MjE2NzMwNTU0MDAwMCApICkucmVwbGFjZShkLCBkMnUpLnBhZFN0YXJ0KDE0LCAnXFx1MjAwMCcpICsgbW9yZS5yZXBsYWNlKGQsIGQydSkgKyB0aW1lXG5cdDogbW9yZVxuXHRcdD8gKCB0aW1lICsgJy4nICkucGFkU3RhcnQoMTYsICcwJykgKyBtb3JlXG5cdFx0OiAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpO1xuXG5jb25zdCB2YWxpZGF0ZUxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbC5zdGFydHNXaXRoKCcwMi0yOScsIDUpICkge1xuXHRcdGNvbnN0IHllYXIgICAgICAgICA9ICtsaXRlcmFsLnNsaWNlKDAsIDQpO1xuXHRcdHJldHVybiAoXG5cdFx0XHR5ZWFyICYgMGIxMSA/IGZhbHNlIDpcblx0XHRcdFx0eWVhciUxMDAgPyB0cnVlIDpcblx0XHRcdFx0XHR5ZWFyJTQwMCA/IGZhbHNlIDpcblx0XHRcdFx0XHRcdHllYXIlMzIwMCA/IHRydWUgOlxuXHRcdFx0XHRcdFx0XHRmYWxzZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuY29uc3QgeyB0ZXN0OiBWQUxJREFURV9MRUFQIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnNgXi4uLi4uKD86MDYuMzB8MTIuMzEpLjIzOjU5OjU5YC52YWx1ZU9mKCk7XG5cbmNvbnN0IERBVEUgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhuZXcgTmF0aXZlRGF0ZSgwKSwgLyojX19QVVJFX18qL2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMoTmF0aXZlRGF0ZS5wcm90b3R5cGUpKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG4vKmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIpID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyLCB2YWx1ZSA6bnVtYmVyLCByZXNlcnZlTW9yZSA6Ym9vbGVhbikgPT4ge1xuXHRpZiAoIGVuZCApIHtcblx0XHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRcdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0XHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdFx0dGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7XG5cdH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHJldHVybiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlT0ZGU0VUKHRpbWUsIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLmluY2x1ZGVzKCctJylcblx0XHQ/IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE0LCB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5pbmRleE9mKCctJywgMTQpKVxuXHRcdDogdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpXG5cdCk7Ly8vdGltZVxufTsqLy8vXG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ09mZnNldERhdGVUaW1lJyAgICAgICAgIDsgfVxuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0dmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHdpdGg2MCA9IGxpdGVyYWwuc3RhcnRzV2l0aCgnNjAnLCAxNyk7XG5cdFx0bGV0IHdpdGhvdXQ2MCA9IHdpdGg2MCA/IGxpdGVyYWwuc2xpY2UoMCwgMTcpICsgJzU5JyArIGxpdGVyYWwuc2xpY2UoMTkpIDogbGl0ZXJhbDtcblx0XHRjb25zdCB7IDE6IG1vcmUgPSAnJyB9ID0gKCBvcHRpb25zLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMod2l0aG91dDYwKSA6IE9GRlNFVF9EQVRFVElNRV9leGVjKHdpdGhvdXQ2MCkgKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB0aW1lID0gcGFyc2Uod2l0aG91dDYwID0gd2l0aG91dDYwLnJlcGxhY2UoVCwgJ1QnKS5yZXBsYWNlKCd6JywgJ1onKSk7XG5cdFx0aWYgKCB3aXRoNjAgKSB7XG5cdFx0XHREQVRFLnNldFRpbWUodGltZSk7XG5cdFx0XHRWQUxJREFURV9MRUFQKERBVEUudG9JU09TdHJpbmcoKSkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gd2l0aG91dDYwO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodGltZSwgbW9yZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldFVUQ0Z1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENGdWxsWWVhcigpOyB9XG5cdC8vL2dldCB5ZWFyICgpIDpGdWxsWWVhciB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0Ly8vc2V0IHllYXIgKHZhbHVlIDpGdWxsWWVhcikgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNb250aCgpOyB9XG5cdC8vL2dldCBtb250aCAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgNSwgNyk7IH1cblx0Ly8vc2V0IG1vbnRoICh2YWx1ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ0RhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF0ZSgpOyB9XG5cdC8vL2dldCBkYXkgKCkgOkRhdGUgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHQvLy9zZXQgZGF5ICh2YWx1ZSA6RGF0ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlLCB0cnVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Ly8vZ2V0IGhvdXIgKCkgOkhvdXJzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdC8vL3NldCBob3VyICh2YWx1ZSA6SG91cnMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWludXRlcygpOyB9XG5cdC8vL2dldCBtaW51dGUgKCkgOk1pbnV0ZXMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0Ly8vc2V0IG1pbnV0ZSAodmFsdWUgOk1pbnV0ZXMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ1NlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDU2Vjb25kcygpOyB9XG5cdC8vL2dldCBzZWNvbmQgKCkgOlNlY29uZHMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0Ly8vc2V0IHNlY29uZCAodmFsdWUgOlNlY29uZHMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdC8vL2dldCBtaWxsaXNlY29uZCAoKSA6TWlsbGlzZWNvbmRzIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdJTEwMDA7IH0vLy9cblx0LypzZXQgbWlsbGlzZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnICkgKyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNlYXJjaChPRkZTRVQkKSk7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDAsIGZhbHNlKTtcblx0fSovLy9cblx0Ly8vZ2V0IG1pY3Jvc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG1pY3Jvc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHQvLy9nZXQgbmFub3NlY29uZCAoKSA6TWlsbGlzZWNvbmRzXG5cdC8vL3NldCBuYW5vc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHRcblx0Z2V0VVRDRGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF5KCk7IH1cblx0Ly8vZ2V0IGRheU9mV2VlayAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKS5nZXRVVENEYXkoKSB8fCA3OyB9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdC8vL2dldCBvZmZzZXQgKCkgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAnWicgOiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoLTYpOyB9XG5cdC8qc2V0IG9mZnNldCAodmFsdWUpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAtMSA6IC02KSArIHZhbHVlO1xuXHRcdE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwLCB0cnVlKTtcblx0fSovLy9cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIGZsb29yKCt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSk7IH0vLy9cblx0LypzZXRUaW1lICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOlRpbWUpIDp2b2lkIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodmFsdWUsICcnKTtcblx0XHQvLy9yZXR1cm4gdmFsdWU7XG5cdH0qL1xuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSAoKSB7IHJldHVybiAnTG9jYWxEYXRlVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgdmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZShULCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApICAgICAgIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsRGF0ZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIHZhbGlkYXRlTGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAsIG4gICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkge1xuXHRcdFx0KytuO1xuXHRcdFx0cGFydHNbaW5kZXhdID0gdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXG4nOlxuXHRcdFx0XHRjYXNlICcgJzpcblx0XHRcdFx0Y2FzZSAnXFx0Jzpcblx0XHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPSBwYXJ0LmluZGV4T2YoJ1xcbicsIGkpICsgMTsgKSB7ICsrbjsgfVxuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9ICcnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQ/JztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgeyB0ZXN0OiBCQURfRCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hXFxkKWAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBJU19EX0lOVEVHRVIgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfWE9CX0lOVEVHRVIgfSA9IHRoZVJlZ0V4cCgvXjAoPzp4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qfG9bMC03XVtfMC03XSp8YlswMV1bXzAxXSopJC8pO1xuY29uc3QgeyB0ZXN0OiBCQURfWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBJU19JTlRFR0VSID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgPT4gKCBJU19EX0lOVEVHRVIobGl0ZXJhbCkgfHwgLypvcHRpb25zLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IE1JTiAgICAgICAgID0gQmlnSW50ICYmIC0vKiNfX1BVUkVfXyovQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKTsvLyAtKDJuKiooNjRuLTFuKSkgfHwgLU1BWC0xblxuY29uc3QgTUFYICAgICAgICAgPSBCaWdJbnQgJiYgLyojX19QVVJFX18qL0JpZ0ludCgnMHg3RkZGRkZGRkZGRkZGRkZGJyk7Ly8gMm4qKig2NG4tMW4pLTFuIHx8IC1NSU4tMW5cblxuY29uc3QgQmlnSW50SW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19JTlRFR0VSKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBiaWdJbnQgICAgICAgICA9IGxpdGVyYWxbMF09PT0nLSdcblx0XHQ/IC1CaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSlcblx0XHQ6IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0b3B0aW9ucy5hbGxvd0xvbmdlciB8fCBNSU48PWJpZ0ludCAmJiBiaWdJbnQ8PU1BWCB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IHBhcnNlSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlmICggb3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyPD1udW1iZXIgJiYgbnVtYmVyPD1vcHRpb25zLkludGVnZXJNYXhOdW1iZXIgKSB7IHJldHVybiBudW1iZXI7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXIgfHwgTUlOPD1iaWdJbnQgJiYgYmlnSW50PD1NQVggfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuY29uc3QgX05hTiA9IC1OYU47XG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElTX0ZMT0FUIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPzpcblx0XHRcXC5cXGRbX1xcZF0qXG5cdFx0KD86W2VFXVstK10/XFxkW19cXGRdKik/XG5cdHxcblx0XHRbZUVdWy0rXT9cXGRbX1xcZF0qXG5cdClcblx0JGAudmFsdWVPZigpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgeyB0ZXN0OiBJU19aRVJPIH0gPSB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC4wKyk/KD86W2VFXVstK10/MCspPyQvKTtcbmNvbnN0IHsgZXhlYzogTk9STUFMSVpFRCB9ID0gdGhlUmVnRXhwICAgKC9eWy0wXT8oXFxkKikoPzpcXC4oXFxkKykpPyg/OmVcXCs/KC0/XFxkKykpPyQvKTtcbmNvbnN0IHsgZXhlYzogT1JJR0lOQUwgfSA9IHRoZVJlZ0V4cCAgICgvXlstK10/MD8oXFxkKikoPzpcXC4oXFxkKj8pMCopPyg/OltlRV1cXCs/KC0/XFxkKykpPyQvKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIUlTX0ZMT0FUKGxpdGVyYWwpIHx8IEJBRF9EKGxpdGVyYWwpICkge1xuXHRcdGlmICggb3B0aW9ucy5zRmxvYXQgKSB7XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0XHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIF9JbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyApIHsgcmV0dXJuIE5hTjsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gX05hTjsgfVxuXHRcdH1cblx0XHRlbHNlIGlmICggIW9wdGlvbnMuc0Vycm9yICkge1xuXHRcdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHsgcmV0dXJuIEluZmluaXR5OyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7IHJldHVybiBfSW5maW5pdHk7IH1cblx0XHR9XG5cdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEZsb2F0ICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdGNvbnN0IHdpdGhvdXRVbmRlcnNjb3JlcyAgICAgICAgID0gbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJyk7XG5cdGNvbnN0IG51bWJlciAgICAgICAgID0gK3dpdGhvdXRVbmRlcnNjb3Jlcztcblx0aWYgKCBvcHRpb25zLnNFcnJvciApIHtcblx0XHRpc0Zpbml0ZShudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBiZWVuIGFzIGJpZyBhcyBpbmZgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG51bWJlciB8fCBJU19aRVJPKHdpdGhvdXRVbmRlcnNjb3JlcykgfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGJlZW4gYXMgbGl0dGxlIGFzICR7bGl0ZXJhbFswXT09PSctJyA/ICctJyA6ICcnfTBgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHsgMTogbm9ybWFsaXplZF9pbnRlZ2VyLCAyOiBub3JtYWxpemVkX2ZyYWN0aW9uYWwgPSAnJywgMzogbm9ybWFsaXplZF9leHBvbmVudCA9ICcnIH0gPSBOT1JNQUxJWkVEKG51bWJlciAgICAgICApIDtcblx0XHRjb25zdCB7IDE6IG9yaWdpbmFsX2ludGVnZXIsIDI6IG9yaWdpbmFsX2ZyYWN0aW9uYWwgPSAnJywgMzogb3JpZ2luYWxfZXhwb25lbnQgPSAnJyB9ID0gT1JJR0lOQUwod2l0aG91dFVuZGVyc2NvcmVzKSA7XG5cdFx0b3JpZ2luYWxfaW50ZWdlciArIG9yaWdpbmFsX2ZyYWN0aW9uYWw9PT1ub3JtYWxpemVkX2ludGVnZXIgKyBub3JtYWxpemVkX2ZyYWN0aW9uYWxcblx0XHQmJlxuXHRcdG9yaWdpbmFsX2V4cG9uZW50ICAgICAgICAtIG9yaWdpbmFsX2ZyYWN0aW9uYWwubGVuZ3RoPT09bm9ybWFsaXplZF9leHBvbmVudCAgICAgICAgLSBub3JtYWxpemVkX2ZyYWN0aW9uYWwubGVuZ3RoXG5cdFx0fHxcblx0XHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgbG9zdCBpdHMgZXhhY3QgYW5kIGJlZW4gJHtudW1iZXJ9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRyZXR1cm4gbnVtYmVyO1xufTtcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi4vcmVnZXhwcyc7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgT0ZfVEFCTEVTLCBpc0FycmF5LCBpc1N0YXRpYyB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IERJUkVDVExZLCBJTVBMSUNJVExZLCBQQUlSLCBpc1RhYmxlLCBpc0lubGluZSwgZGlyZWN0bHlJZk5vdCwgZnJvbVBhaXIgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpbGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpZiAoIGlzVGFibGUodGFibGUpICkge1xuXHRcdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIElubGluZSBUYWJsZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzU3RhdGljKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhcHBlbmQgdmFsdWUgdG8gU3RhdGljIEFycmF5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0dGFibGUgPSB0YWJsZVsoIHRhYmxlICAgICAgICAgICkubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGhyb3cgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFkpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBlbmRUYWJsZSA9ICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGFzQXJyYXlJdGVtICAgICAgICAgLCB0YWcgICAgICAgICkgICAgICAgID0+IHtcblx0bGV0IGxhc3RUYWJsZSAgICAgICA7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0bGV0IGFycmF5T2ZUYWJsZXMgICAgICAgICAgICAgIDtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkgeyBpc0FycmF5KGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0pICYmICFpc1N0YXRpYyhhcnJheU9mVGFibGVzKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdGVsc2UgeyBhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoT0ZfVEFCTEVTKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zLmNvbGxlY3QodGFnLCBhcnJheU9mVGFibGVzLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdGFycmF5T2ZUYWJsZXNbYXJyYXlPZlRhYmxlcy5sZW5ndGhdID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRsYXN0VGFibGUgPSB0YWJsZVtmaW5hbEtleV07XG5cdFx0XHRmcm9tUGFpcihsYXN0VGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIGtleS92YWx1ZSBwYWlyIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIFtdYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRkaXJlY3RseUlmTm90KGxhc3RUYWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucy5UYWJsZShESVJFQ1RMWSk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0fVxuXHRyZXR1cm4gbGFzdFRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbmxpbmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aXNUYWJsZSh0YWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGZyb21QYWlyKHRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBbXSBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuY29uc3QgY2hlY2tMaXRlcmFsU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGl0ZXJhbCkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gYSBMaXRlcmFsIFN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIGxpdGVyYWw7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduTGl0ZXJhbFN0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbC5zdGFydHNXaXRoKGAnJydgKSApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGxpdGVyYWwgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyAyKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbC5zbGljZSgzKSk7XG5cdGlmICggJCApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgNiksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiAkWzNdO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ011bHRpLWxpbmUgTGl0ZXJhbCBTdHJpbmcnLCBsaXRlcmFsLmxlbmd0aCk7XG5cdGNvbnN0IGxlYWRpbmdOZXdsaW5lID0gISggbGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMykgKTtcblx0aWYgKCBsZWFkaW5nTmV3bGluZSApIHtcblx0XHRsaXRlcmFsID0gc3RhcnQubXVzdCgpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChbIGAnJydgLCBsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDMpIF0sIHZhbHVlKSA6IHZhbHVlO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZz09PW51bGwgJiYgc3RhcnQubm93cmFwKG9wdGlvbnMuQVJHU19NT0RFKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBjaGVja0xpdGVyYWxTdHJpbmcobGl0ZXJhbCkgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGluZSk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGxpbmVzLmpvaW4ob3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICk7XG5cdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVMaXRlcmFsICkge1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBgJycnYDtcblx0XHRcdFx0bGVhZGluZ05ld2xpbmUgPyBsaW5lcy51bnNoaWZ0KGAnJydgKSA6IGxpbmVzWzBdID0gYCcnJyR7bGl0ZXJhbH1gO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKGxpbmUpO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJykgKSB7XG5cdFx0Y29uc3QgaW5kZXggPSByZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgobGl0ZXJhbCk7XG5cdFx0Y29uc3QgdmFsdWUgPSBCYXNpY1N0cmluZyhsaXRlcmFsLnNsaWNlKDEsIGluZGV4KSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgaW5kZXggKyAxKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UoaW5kZXggKyAxKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRsZXQgbGVuZ3RoID0gMyArIHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsLnNsaWNlKDMpKTtcblx0aWYgKCBsaXRlcmFsLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCAkID0gbGl0ZXJhbC5zbGljZSgzLCBsZW5ndGgpO1xuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHZhbHVlID0gQmFzaWNTdHJpbmcoJCkgKyAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ011bHRpLWxpbmUgQmFzaWMgU3RyaW5nJywgbGVuZ3RoKTtcblx0Y29uc3Qgc2tpcHBlZCAgICAgICAgPSAoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICkgPyAwIDogMTtcblx0aWYgKCBza2lwcGVkICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsKTtcblx0XHRpZiAoIGxpdGVyYWwubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZygkLCBvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgLCBza2lwcGVkKSArICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KFsgJ1wiXCJcIicsIGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZz09PW51bGwgJiYgc3RhcnQubm93cmFwKG9wdGlvbnMuQVJHU19NT0RFKTtcblx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaXRlcmFsICsgJ1xcbicpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBsaXRlcmFsIF07IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gc3RhcnQubXVzdCgpO1xuXHRcdGxldCBsZW5ndGggPSByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGluZSk7XG5cdFx0aWYgKCBsaW5lLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0ICQgPSBsaW5lLnNsaWNlKDAsIGxlbmd0aCk7XG5cdFx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcobGluZXMuam9pbignXFxuJykgKyAnXFxuJyArICQsIG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBsaW5lLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGluZS5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVMaXRlcmFsICkge1xuXHRcdFx0XHRza2lwcGVkID8gbGluZXMudW5zaGlmdCgnXCJcIlwiJykgOiBsaW5lc1swXSA9IGBcIlwiXCIke2xpdGVyYWx9YDtcblx0XHRcdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGAkeyR9XCJcIlwiYDtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gTGl0ZXJhbE9iamVjdChsaW5lcywgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHZhbHVlOyB9XG5cdFx0XHRyZXR1cm4gbGluZS5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpbmUgKyAnXFxuJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBsaW5lO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5jb25zdCBLRVlTID0gLyojX19QVVJFX18qL051bGwgICAgICAgIChudWxsKTtcbmV4cG9ydCBjb25zdCBjb21tZW50Rm9yID0gKGtleSAgICAgICAgKSAgICAgICAgID0+IEtFWVNba2V5XSB8fCAoIEtFWVNba2V5XSA9IFN5bWJvbChrZXkpICk7XG5leHBvcnQgY29uc3QgY29tbWVudEZvclRoaXMgICAgICAgICAgICAgICAgPSBTeW1ib2woJ3RoaXMnKSAgICAgICA7XG5cbmNvbnN0IHsgdGVzdDogaW5jbHVkZXNOZXdsaW5lIH0gPSB0aGVSZWdFeHAoL1xccj9cXG4vZyk7XG5leHBvcnQgY29uc3QgZ2V0Q09NTUVOVCA9ICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlDb21tZW50ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIGtleUNvbW1lbnQgaW4gdGFibGUgKSB7XG5cdFx0Y29uc3QgY29tbWVudCA9IHRhYmxlW2tleUNvbW1lbnRdO1xuXHRcdGlmICggdHlwZW9mIGNvbW1lbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGB0aGUgdmFsdWUgb2YgY29tbWVudCBtdXN0IGJlIGEgc3RyaW5nLCB3aGlsZSBcIiR7Y29tbWVudD09PW51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29tbWVudH1cIiB0eXBlIGlzIGZvdW5kYCk7IH1cblx0XHRpZiAoIGluY2x1ZGVzTmV3bGluZShjb21tZW50KSApIHsgdGhyb3cgU3ludGF4RXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50IG11c3QgYmUgYSBzdHJpbmcgYW5kIGNhbiBub3QgaW5jbHVkZSBuZXdsaW5lYCk7IH1cblx0XHRyZXR1cm4gYCAjJHtjb21tZW50fWA7Ly8vXG5cdH1cblx0cmV0dXJuICcnO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb21tZW50ID0gICAgICAgICAgICAgICAgICAgICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgICAgICAgICAgICA9PiBrZXkgaW4gS0VZUyA/IGdldENPTU1FTlQodGFibGUsIEtFWVNba2V5XSApIDogJyc7XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy8gZXh0ZXJuYWxcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgSU5MSU5FLCBESVJFQ1RMWSB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IG5ld0FycmF5LCBTVEFUSUNBTExZIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgT2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLCBPRkZTRVQkIH0gZnJvbSAnLi4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gJy4uL3R5cGVzL0ludGVnZXInO1xuaW1wb3J0IHsgRmxvYXQgfSBmcm9tICcuLi90eXBlcy9GbG9hdCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcbmltcG9ydCB7IGFwcGVuZFRhYmxlLCBwcmVwYXJlVGFibGUsIHByZXBhcmVJbmxpbmVUYWJsZSwgYXNzaWduTGl0ZXJhbFN0cmluZywgYXNzaWduQmFzaWNTdHJpbmcgfSBmcm9tICcuL29uLXRoZS1zcG90JztcblxuaW1wb3J0IHsgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IGJlSW5saW5lIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuXG5jb25zdCB7IHRlc3Q6IElTX09GRlNFVCQgfSA9IHRoZVJlZ0V4cChPRkZTRVQkKTtcbmNvbnN0IHsgdGVzdDogSVNfRU1QVFkgfSA9IHRoZVJlZ0V4cCgvXlxcW1tcXHQgXSpdLyk7XG5cbmNvbnN0IHBhcnNlS2V5cyA9IChyZXN0ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGxpbmVSZXN0ICAgICAgICAgPSByZXN0O1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBbXTtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gLTE7XG5cdGZvciAoIDsgOyApIHtcblx0XHRsaW5lUmVzdCB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGJhcmUga2V5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J1wiJyApIHtcblx0XHRcdGNvbnN0IGluZGV4ICAgICAgICAgPSByZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgobGluZVJlc3QpO1xuXHRcdFx0b3B0aW9ucy5LRVlTLnRlc3QobGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gQmFzaWNTdHJpbmcobGluZVJlc3Quc2xpY2UoMSwgaW5kZXgpKSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBLZXkgbm90IGFsbG93ZWRgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShpbmRleCArIDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGlzUXVvdGVkID0gbGluZVJlc3RbMF09PT0nXFwnJztcblx0XHRcdGNvbnN0IGtleSAgICAgICAgID0gKCAoIGlzUXVvdGVkID8gcmVnZXhwcy5fX0xJVEVSQUxfS0VZX2V4ZWMgOiByZWdleHBzLl9fQkFSRV9LRVlfZXhlYyApKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCAke2lzUXVvdGVkID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKSApWzBdO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdG9wdGlvbnMuS0VZUy50ZXN0KGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IGlzUXVvdGVkID8ga2V5LnNsaWNlKDEsIC0xKSA6IGtleSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBLZXkgbm90IGFsbG93ZWRgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRpZiAoIHJlZ2V4cHMuSVNfRE9UX0tFWShsaW5lUmVzdCkgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLkRPVF9LRVksICcnKTsgfVxuXHRcdGVsc2UgeyBicmVhazsgfVxuXHR9XG5cdGlmICggb3B0aW9ucy5kaXNhYmxlRGlnaXQgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IHJlc3Quc2xpY2UoMCwgLWxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0KCByZWdleHBzLmlzQW1hemluZyhrZXlzKSB8fCBvcHRpb25zLmVuYWJsZU51bGwgJiYga2V5cz09PSdudWxsJyApICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhcmUga2V5IGRpc2FibGVkIGJ5IHhPcHRpb25zLnN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7XG5cdFx0ZG8geyBsZWFkaW5nS2V5c1tpbmRleF0gIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXgtLSApO1xuXHR9XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsYXN0SW5kZXhdIDtcblx0bGVhZGluZ0tleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWcgYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUob3B0aW9ucy5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBsaXRlcmFsPT09J3RydWUnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgb3B0aW9ucy5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgSW50ZWdlcihsaXRlcmFsKSkgOiBJbnRlZ2VyKGxpdGVyYWwpXG5cdFx0O1xuXHR9XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3Qgc3RhdGljQXJyYXkgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoU1RBVElDQUxMWSk7XG5cdGlmICggSVNfRU1QVFkobGluZVJlc3QpICkge1xuXHRcdGJlSW5saW5lKHN0YXRpY0FycmF5LCBsaW5lUmVzdFsxXT09PSddJyA/IDAgOiAzKTtcblx0XHRyZXR1cm4gbGluZVJlc3Quc2xpY2UobGluZVJlc3QuaW5kZXhPZignXScpKS5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdTdGF0aWMgQXJyYXknLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRsZXQgaW5saW5lICAgICAgICAgICAgICAgPSBsaW5lUmVzdC5zdGFydHNXaXRoKCdbICcpIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1tcXHQnKSA/IDMgOiAwO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7XG5cdFx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0XHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0XHR9XG5cdH1cblx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRpZiAoIG9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSApIHtcblx0XHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdJbmxpbmUgVGFibGUnLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0bGV0IGlubGluZSA9IHRydWU7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0fVxuXHRcdGlubGluZSB8fCBiZUlubGluZShpbmxpbmVUYWJsZSwgZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXSE9PSd9JyApIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpKTtcblx0XHRcdFx0bGluZVJlc3QgPSAoIHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdCApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBGb3JDb21tZW50ID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZyB9ID0geyBsaW5lUmVzdCB9ID0gcmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhwYXJzZUtleXMobGluZVJlc3QpKTtcblx0cmV0dXJuIHsgdGFibGU6IHByZXBhcmVJbmxpbmVUYWJsZShsYXN0SW5saW5lVGFibGUsIGxlYWRpbmdLZXlzKSwgZmluYWxLZXksIHRhZywgbGluZVJlc3QgfTtcbn07XG5jb25zdCBhc3NpZ24gPSAoeyBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCwgdGFibGUgfSAgICAgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnfSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyB0YWJsZVtmaW5hbEtleV0gPSBmYWxzZTsgfVxuXHRlbHNlIGlmICggb3B0aW9ucy5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnbicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4Jylcblx0XHRcdD8gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEZsb2F0KGxpdGVyYWwpKSA6IEZsb2F0KGxpdGVyYWwpXG5cdFx0XHQ6IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9ID0gcmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUsIHBhcnNlS2V5cyk7XG5cdFx0XHRcdGNvbnN0IHRhYmxlICAgICAgICA9IHByZXBhcmVUYWJsZShyb290VGFibGUsIGxlYWRpbmdLZXlzKTtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUodGFibGUsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnKTtcblx0XHRcdFx0b3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgJiYgbGluZVJlc3QgJiYgKCBsYXN0U2VjdGlvblRhYmxlW2NvbW1lbnRGb3JUaGlzXSA9IGFzQXJyYXlJdGVtID8gbGluZVJlc3Quc2xpY2UoMSkgOiB0YWJsZVtjb21tZW50Rm9yKGZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGxpbmVbMF09PT0nIycgKSB7XG5cdFx0XHRcdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQobGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0XHR0eXBlb2YgcmVzdD09PSdzdHJpbmcnIHx8ICggcmVzdCA9IHggICAgICAgIChyZXN0KSApO1xuXHRcdFx0XHRpZiAoIHJlc3QgKSB7XG5cdFx0XHRcdFx0cmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSByZXN0LnNsaWNlKDEpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEVTQ0FQRUQgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKHtcblx0Li4uLyojX19QVVJFX18qL2Zyb21FbnRyaWVzKC8qI19fUFVSRV9fKi9bIC4uLkFycmF5KDB4MjApIF0ubWFwKChfLCBjaGFyQ29kZSkgPT4gWyBmcm9tQ2hhckNvZGUoY2hhckNvZGUpLCAnXFxcXHUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKSBdKSksXG5cdCdcXGInOiAnXFxcXGInLFxuXHQnXFx0JzogJ1xcXFx0Jyxcblx0J1xcbic6ICdcXFxcbicsXG5cdCdcXGYnOiAnXFxcXGYnLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1wiJzogJ1xcXFxcIicsXG5cdCdcIlwiXCInOiAnXCJcIlxcXFxcIicsXG5cdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0J1xceDdGJzogJ1xcXFx1MDA3RicsXG59KTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXltcXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdLyk7XG5leHBvcnQgY29uc3Qgc2luZ2xlbGluZVN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIE5FRURfQkFTSUModmFsdWUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xufTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lQmFzaWNTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYFwiXCJgO1xufTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9CQVNJQyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxceDdGXXwnJycvKTtcbmV4cG9ydCBjb25zdCB7IHRlc3Q6IG11bHRpbGluZU5lZWRCYXNpYyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXXwnJycvKTtcbmNvbnN0IHsgdGVzdDogUkVBTF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL14oPzpbXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiKS8pO1xuY29uc3QgZXNjYXBlX211bHRpbGluZSA9IChsaW5lcyAgICAgICAgICAsIGxpbmVJbmRleCAgICAgICAgKSA9PiB7XG5cdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdIDtcblx0aWYgKCBSRUFMX01VTFRJTElORV9FU0NBUEUobGluZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSBsaW5lLm1hdGNoKEJZX01VTFRJTElORV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdGxpbmVzW2xpbmVJbmRleF0gPSBwYXJ0cy5qb2luKCcnKTtcblx0fVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IExpbmVzID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+ICggbGluZXMgPSBbICcnLCAuLi5saW5lcyBdICAgICAgICAgICkubGVuZ3RoPT09MSA/IFsgJycsICcnIF0gOiBsaW5lcyAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZVN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGFzdEluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0bGV0IGluZGV4ID0gbGFzdEluZGV4O1xuXHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfQkFTSUMobGluZXNbaW5kZXhdICkgKSB7IGJyZWFrOyB9IH1cblx0d2hpbGUgKCAtLWluZGV4ICk7XG5cdGlmICggaW5kZXggKSB7XG5cdFx0aW5kZXggPSBsYXN0SW5kZXg7XG5cdFx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRcdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHRcdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdH1cblx0ZWxzZXsgbGluZXNbbGFzdEluZGV4XSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IEZsb2F0NjRBcnJheSBmcm9tICcuRmxvYXQ2NEFycmF5JztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy5VaW50OEFycmF5JztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcblxuY29uc3QgeyB0ZXN0OiBJTlRFR0VSX0xJS0UgfSA9IHRoZVJlZ0V4cCgvXi0/XFxkKyQvKTtcbmNvbnN0IGVuc3VyZUZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgPT4gSU5URUdFUl9MSUtFKGxpdGVyYWwpID8gbGl0ZXJhbCArICcuMCcgOiBsaXRlcmFsO1xuXG5jb25zdCBmbG9hdDY0QXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KFsgTmFOIF0pO1xuY29uc3QgdWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGZsb2F0NjRBcnJheS5idWZmZXIpO1xuY29uc3QgTmFOXzcgPSB1aW50OEFycmF5WzddIDtcblxuZXhwb3J0IGNvbnN0IGZsb2F0ID0gTmFOXzc9PT1uZXcgVWludDhBcnJheShuZXcgRmxvYXQ2NEFycmF5KFsgLU5hTiBdKS5idWZmZXIpWzddIFxuXHQ/ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHRcdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHRcdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogJ25hbidcblx0OiAodmFsdWUgICAgICAgICkgPT4gdmFsdWVcblx0XHQ/IHZhbHVlPT09SW5maW5pdHkgPyAnaW5mJyA6IHZhbHVlPT09X0luZmluaXR5ID8gJy1pbmYnIDogZW5zdXJlRmxvYXQoJycgKyB2YWx1ZSlcblx0XHQ6IHZhbHVlPT09dmFsdWUgPyBpcyh2YWx1ZSwgMCkgPyAnMC4wJyA6ICctMC4wJyA6ICggZmxvYXQ2NEFycmF5WzBdID0gdmFsdWUsIHVpbnQ4QXJyYXlbN10gKT09PU5hTl83ID8gJ25hbicgOiAnLW5hbic7XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IERBVEUgZnJvbSAnLkRhdGUucHJvdG90eXBlJztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLmNsYXNzLmlzU3RyaW5nJztcbmltcG9ydCBpc051bWJlciBmcm9tICcuY2xhc3MuaXNOdW1iZXInO1xuaW1wb3J0IGlzQmlnSW50IGZyb20gJy5jbGFzcy5pc0JpZ0ludCc7XG5pbXBvcnQgaXNCb29sZWFuIGZyb20gJy5jbGFzcy5pc0Jvb2xlYW4nO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcblxuaW1wb3J0IHsgY29tbWVudEZvclRoaXMsIGdldENPTU1FTlQsIGdldENvbW1lbnQgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IHNpbmdsZWxpbmVTdHJpbmcgfSBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgeyBmbG9hdCB9IGZyb20gJy4vZmxvYXQnO1xuaW1wb3J0IHsgaXNTZWN0aW9uLCBvZklubGluZSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5cbmNvbnN0IGlzRGF0ZSA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoREFURSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IHsgdGVzdDogQkFSRSB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKyQvKTtcbmNvbnN0ICRLZXkkID0gKGtleSAgICAgICAgKSAgICAgICAgID0+IEJBUkUoa2V5KSA/IGtleSA6IHNpbmdsZWxpbmVTdHJpbmcoa2V5KTtcblxuY29uc3QgRklSU1QgPSAvW14uXSsvO1xuY29uc3QgbGl0ZXJhbFN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICA9PiBgJyR7dmFsdWV9J2A7XG5jb25zdCAkS2V5cyA9IChrZXlzICAgICAgICApICAgICAgICAgPT4gcmVnZXhwcy5pc0FtYXppbmcoa2V5cykgPyBrZXlzLnJlcGxhY2UoRklSU1QsIGxpdGVyYWxTdHJpbmcpIDoga2V5cz09PSdudWxsJyA/IGAnbnVsbCdgIDoga2V5cztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTFNlY3Rpb24gZXh0ZW5kcyBBcnJheSAgICAgICAgIHtcblx0XG5cdCAgICAgICAgICAgICAgICAgZG9jdW1lbnQgICAgICAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChkb2N1bWVudCAgICAgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdFtTeW1ib2wudG9QcmltaXRpdmVdICgpIHsgcmV0dXJuIHRoaXMuam9pbih0aGlzLmRvY3VtZW50Lm5ld2xpbmUpOyB9XG5cdFxuXHRhcHBlbmROZXdsaW5lICgpIHsgdGhpc1t0aGlzLmxlbmd0aF0gPSAnJzsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRMaW5lIChzb3VyY2UgICAgICAgICkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9IHNvdXJjZTsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2U7IH0gICBcblx0ICAgICAgICBzZXQgYXBwZW5kSW5saW5lSWYgKHNvdXJjZSAgICAgICAgKSB7IHNvdXJjZSAmJiAoIHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2UgKTsgfS8vL1xuXHRcblx0KiBhc3NpZ25CbG9jayAgICAgICAgICAgICAgICAgICAgICAgICAgIChkb2N1bWVudEtleXNfICAgICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXNfICAgICAgICAgICAgICAgICAgLCB0YWJsZSAgICwgdGFibGVLZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAge1xuXHRcdGNvbnN0IHsgZG9jdW1lbnQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBuZXdsaW5lVW5kZXJIZWFkZXIsIG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyIH0gPSBkb2N1bWVudDtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJEb3R0ZWQgPSBzZWN0aW9uS2V5c18gPyBkb2N1bWVudC5uZXdsaW5lVW5kZXJQYWlyQnV0RG90dGVkIDogZmFsc2U7XG5cdFx0Y29uc3QgbmV3bGluZUFmdGVyUGFpciA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlckRvdHRlZCA6IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXI7XG5cdFx0Zm9yICggY29uc3QgdGFibGVLZXkgb2YgdGFibGVLZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gdGFibGVbdGFibGVLZXldIDtcblx0XHRcdGNvbnN0ICRrZXkkID0gJEtleSQodGFibGVLZXkpO1xuXHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzID0gZG9jdW1lbnRLZXlzXyArICRrZXkkO1xuXHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IHZhbHVlO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRsZXQgZmlyc3RJdGVtID0gdmFsdWVbMF07XG5cdFx0XHRcdFx0aWYgKCBpc1NlY3Rpb24oZmlyc3RJdGVtKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlSGVhZGVyID0gYFtbJHtkb2N1bWVudEtleXN9XV1gICAgICAgICAgO1xuXHRcdFx0XHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzXyA9IGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0bGV0IHRhYmxlICAgICAgICAgICAgICAgICA9IGZpcnN0SXRlbTtcblx0XHRcdFx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRcdFx0c2VjdGlvblswXSA9IHRhYmxlSGVhZGVyICsgZ2V0Q09NTUVOVCh0YWJsZSwgY29tbWVudEZvclRoaXMpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9uWzFdID0gJyc7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoICsraW5kZXg9PT1sZW5ndGggKSB7IGJyZWFrOyB9XG5cdFx0XHRcdFx0XHRcdHRhYmxlID0gKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClbaW5kZXhdIDtcblx0XHRcdFx0XHRcdFx0aWYgKCAhaXNTZWN0aW9uKHRhYmxlKSApIHsgdGhyb3cgVHlwZUVycm9yKGB0aGUgZmlyc3QgdGFibGUgaXRlbSBtYXJrZWQgYnkgU2VjdGlvbigpIG1lYW5zIHRoZSBwYXJlbnQgYXJyYXkgaXMgYW4gYXJyYXkgb2YgdGFibGVzLCB3aGljaCBjYW4gbm90IGluY2x1ZGUgb3RoZXIgdHlwZXMgb3IgdGFibGUgbm90IG1hcmtlZCBieSBTZWN0aW9uKCkgYW55IG1vcmUgaW4gdGhlIHJlc3QgaXRlbXNgKTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgeyBsZXQgaW5kZXggPSAxOyB3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyBpZiAoIGlzU2VjdGlvbih2YWx1ZVtpbmRleCsrXSApICkgeyB0aHJvdyBUeXBlRXJyb3IoYGlmIGFuIGFycmF5IGlzIG5vdCBhcnJheSBvZiB0YWJsZXMsIGl0IGNhbiBub3QgaW5jbHVkZSBhbnkgdGFibGUgdGhhdCBtYXJrZWQgYnkgU2VjdGlvbigpYCk7IH0gfSB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGlzU2VjdGlvbih2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRzZWN0aW9uWzBdID0gYFske2RvY3VtZW50S2V5c31dJHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnByZWZlckNvbW1lbnRGb3JUaGlzXG5cdFx0XHRcdFx0XHRcdD8gZ2V0Q09NTUVOVCh2YWx1ZSwgY29tbWVudEZvclRoaXMpIHx8IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KVxuXHRcdFx0XHRcdFx0XHQ6IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KSB8fCBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcylcblx0XHRcdFx0XHR9YDtcblx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgYGAsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKSk7XG5cdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgc2VjdGlvbktleXMgPSBzZWN0aW9uS2V5c18gKyAka2V5JDtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9ICRLZXlzKHNlY3Rpb25LZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKCcnLCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR5aWVsZCB0aGlzLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHNlY3Rpb25LZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJEb3R0ZWQgJiYgdGhpcy5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KTtcblx0XHRcdFx0bmV3bGluZUFmdGVyUGFpciAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdCAgICAgICAgdmFsdWUgKGluZGVudCAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAsIHJldHVyblZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICAgICAgICAgKSAgICAgICAgICAgICAgICAgIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRpZiAoIHZhbHVlPT09bnVsbCApIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMuZG9jdW1lbnQubnVsbERpc2FibGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCJudWxsXCIgdHlwZSB2YWx1ZSB3aXRob3V0IHRydXRoeSBvcHRpb25zLnhOdWxsYCk7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICdudWxsJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBpbmxpbmVNb2RlID0gb2ZJbmxpbmUodmFsdWUpO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGlmICggaW5saW5lTW9kZT09PXVuZGVmaW5lZCApIHsgdGhpcy5zdGF0aWNBcnJheShpbmRlbnQsIHZhbHVlKTsgfVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyAkc2luZ2xlbGluZUFycmF5ID0gaW5saW5lTW9kZSB9ID0gdGhpcy5kb2N1bWVudDtcblx0XHRcdFx0XHRcdHRoaXMuc2luZ2xlbGluZUFycmF5KGluZGVudCwgdmFsdWUsICRzaW5nbGVsaW5lQXJyYXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlubGluZU1vZGUhPT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZSB8fCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlRGlzYWJsZWRcblx0XHRcdFx0XHRcdD8gdGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHRcdFx0XHRcdFx0OiB0aGlzLm11bHRpbGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVDb21tYSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc0RhdGUodmFsdWUpICkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgdGhpcy5kb2N1bWVudC5UKS5yZXBsYWNlKCdaJywgdGhpcy5kb2N1bWVudC5aKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIF9saXRlcmFsIGluIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnN0IGxpdGVyYWwgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApW19saXRlcmFsXTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBsaXRlcmFsPT09J3N0cmluZycgKSB7IHRoaXMuYXBwZW5kSW5saW5lID0gbGl0ZXJhbDsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KGxpdGVyYWwpICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGxpdGVyYWw7XG5cdFx0XHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBsaXRlcmFsWzBdO1xuXHRcdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyB0aGlzLmFwcGVuZExpbmUgPSBsaXRlcmFsW2luZGV4KytdIDsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgbGl0ZXJhbCB2YWx1ZSBpcyBicm9rZW5gKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBsaXRlcmFsIHZhbHVlIGlzIGJyb2tlbmApOyB9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc1N0cmluZyh2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IFN0cmluZ11gKTsgfVxuXHRcdFx0XHRpZiAoIGlzTnVtYmVyKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgTnVtYmVyXWApOyB9XG5cdFx0XHRcdGlmICggaXNCaWdJbnQodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCaWdJbnRdYCk7IH1cblx0XHRcdFx0aWYgKCBpc0Jvb2xlYW4odmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCb29sZWFuXWApOyB9XG5cdFx0XHRcdGlmICggcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXModmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcdGlmICgga2V5cy5sZW5ndGggKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyB9Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYmlnaW50Jzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdGhpcy5kb2N1bWVudC5hc0ludGVnZXIodmFsdWUpID8gaXModmFsdWUsIC0wKSA/ICctMCcgOiAnJyArIHZhbHVlIDogZmxvYXQodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gc2luZ2xlbGluZVN0cmluZyh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIiR7dHlwZW9mIHZhbHVlfVwiIHR5cGUgdmFsdWVgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdCAgICAgICAgc2luZ2xlbGluZUFycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgLCBpbmxpbmVNb2RlICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnWyAnIDogJ1snO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5WzBdICwgZmFsc2UpO1xuXHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywgJztcblx0XHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5W2luZGV4KytdICwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnIF0nIDogJ10nO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMDEgPyAnWyBdJyA6ICdbXSc7IH1cblx0fVxuXHQgICAgICAgIHN0YXRpY0FycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnWyc7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnRfLCBzdGF0aWNBcnJheVtpbmRleCsrXSAsIGZhbHNlKTtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywnO1xuXHRcdH1cblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnXSc7XG5cdH1cblx0XG5cdCAgICAgICAgaW5saW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSk7XG5cdFx0aWYgKCBrZXlzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgJztcblx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBrZXlzKTtcblx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLTIpICsgJyB9Jztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7IH1cblx0fVxuXHQgICAgICAgIG11bHRpbGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3snO1xuXHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKSwgY29tbWEpO1xuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICd9Jztcblx0fVxuXHQgICAgICAgIGFzc2lnbklubGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdGNvbnN0IGJlZm9yZV92YWx1ZSA9IHRoaXMuYXBwZW5kSW5saW5lID0gJEtleXMoa2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZShpbmRlbnQsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLWJlZm9yZV92YWx1ZS5sZW5ndGgpO1xuXHRcdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJywgJzsgfVxuXHRcdH1cblx0fVxuXHQgICAgICAgIGFzc2lnbk11bHRpbGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbW1hICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBrZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gaW5saW5lVGFibGVba2V5XSA7XG5cdFx0XHRjb25zdCBrZXlzID0ga2V5c18gKyAkS2V5JChrZXkpO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50XyArICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoaW5kZW50XywgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlLCBjb21tYSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29tbWFcblx0XHRcdFx0XHQ/IHRoaXMuYXBwZW5kSW5saW5lID0gJywnICsgZ2V0Q29tbWVudChpbmxpbmVUYWJsZSwga2V5KVxuXHRcdFx0XHRcdDogdGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgVE9NTFNlY3Rpb24gZnJvbSAnLi9zZWN0aW9uJztcblxuY29uc3QgbmFtZTJjb2RlID0gLyojX19QVVJFX18qL051bGwoe1xuXHRkb2N1bWVudDogMCxcblx0c2VjdGlvbjogMSxcblx0aGVhZGVyOiAyLFxuXHRwYWlyczogMyxcblx0cGFpcjogNCxcbn0gICAgICAgICApO1xuXG5jb25zdCB7IHRlc3Q6IElTX0lOREVOVCB9ID0gdGhlUmVnRXhwKC9eW1xcdCBdKiQvKTtcblxuY29uc3QgcmV0dXJuX2ZhbHNlID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRPTUxEb2N1bWVudCBleHRlbmRzIEFycmF5ICAgICAgICAgICAgICB7XG5cdFxuXHQgICAgICAgICBnZXQgWydjb25zdHJ1Y3RvciddICgpIHsgcmV0dXJuIEFycmF5OyB9XG5cdFxuXHQwID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpO1xuXHRcblx0ICAgICAgICAgYXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSByZXR1cm5fZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmUgICAgICAgICAgICAgICAgICAgICA9ICcnO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJTZWN0aW9uICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJIZWFkZXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJQYWlyICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIGluZGVudCAgICAgICAgID0gJ1xcdCc7XG5cdCAgICAgICAgIFQgICAgICAgICAgICAgICAgICA9ICdUJztcblx0ICAgICAgICAgWiAgICAgICAgICAgID0gJ1onO1xuXHQgICAgICAgICBudWxsRGlzYWJsZWQgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZURpc2FibGVkICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVDb21tYSAgICAgICAgICA7XG5cdCAgICAgICAgIHByZWZlckNvbW1lbnRGb3JUaGlzICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgICRzaW5nbGVsaW5lQXJyYXkgICAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMgICAgICAgICAgICAgICAgICApIHtcblx0XHRcblx0XHRzdXBlcigpO1xuXHRcdFxuXHRcdGlmICggb3B0aW9ucz09bnVsbCApIHsgcmV0dXJuIHRoaXM7IH1cblx0XHRcblx0XHRjb25zdCB7IGludGVnZXIgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBpbnRlZ2VyPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggaW50ZWdlcj09PU1BWF9TQUZFX0lOVEVHRVIgKSB7IHRoaXMuYXNJbnRlZ2VyID0gaXNTYWZlSW50ZWdlcjsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW50ZWdlcj09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbnRlZ2VyKSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgYSBzYWZlIGludGVnZXJgKTsgfVxuXHRcdFx0Y29uc3QgbWF4ID0gaW50ZWdlcj49MCA/IGludGVnZXIgOiAtaW50ZWdlciAtIDE7XG5cdFx0XHRjb25zdCBtaW4gPSBpbnRlZ2VyPj0wID8gLWludGVnZXIgOiBpbnRlZ2VyO1xuXHRcdFx0dGhpcy5hc0ludGVnZXIgPSAobnVtYmVyICAgICAgICApID0+IGlzU2FmZUludGVnZXIobnVtYmVyKSAmJiBtaW48PW51bWJlciAmJiBudW1iZXI8PW1heDtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgbnVtYmVyYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IG5ld2xpbmUgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBuZXdsaW5lPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggbmV3bGluZT09PSdcXG4nIHx8IG5ld2xpbmU9PT0nXFxyXFxuJyApIHsgdGhpcy5uZXdsaW5lID0gbmV3bGluZTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgdHlwZW9mIG5ld2xpbmU9PT0nc3RyaW5nJ1xuXHRcdFx0XHQ/IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSB2YWxpZCBUT01MIG5ld2xpbmVgKVxuXHRcdFx0XHQ6IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgc3RyaW5nYCk7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHsgcHJlZmVyQ29tbWVudEZvciB9ID0gb3B0aW9ucztcblx0XHRpZiAoIHByZWZlckNvbW1lbnRGb3I9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBwcmVmZXJDb21tZW50Rm9yPT09J3RoaXMnIHx8IHByZWZlckNvbW1lbnRGb3I9PT0na2V5JyApIHsgdGhpcy5wcmVmZXJDb21tZW50Rm9yVGhpcyA9IHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcyc7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse3ByZWZlckNvbW1lbnRGb3IpIGNhbiBvbmx5IGJlICdrZXknIG9yICd0aGlzJ2ApOyB9XG5cdFx0XG5cdFx0Y29uc3QgeyBbb3B0aW9ucy5uZXdsaW5lQXJvdW5kIHx8ICdoZWFkZXInXTogYXJvdW5kID0gbmFtZTJjb2RlLmhlYWRlciB9ID0gbmFtZTJjb2RlO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0XG5cdFx0Y29uc3QgeyBpbmRlbnQgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBpbmRlbnQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J3N0cmluZycgKSB7XG5cdFx0XHRpZiAoICFJU19JTkRFTlQoaW5kZW50KSApIHsgdGhyb3cgU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50fSkgY2FuIG9ubHkgaW5jbHVkZSBUYWIgb3IgU3BhY2VgKTsgfVxuXHRcdFx0dGhpcy5pbmRlbnQgPSBpbmRlbnQ7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J251bWJlcicgKSB7XG5cdFx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKGluZGVudCkgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50OiR7aW5kZW50fX0pIGlzIG91dCBvZiByYW5nZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9ICcgJy5yZXBlYXQoaW5kZW50KTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gbm90IGJlIFwiJHt0eXBlb2YgaW5kZW50fVwiIHR5cGVgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgVCB9ID0gb3B0aW9ucztcblx0XHRpZiAoIFQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBUPT09JyAnIHx8IFQ9PT0ndCcgfHwgVD09PSdUJyApIHsgdGhpcy5UID0gVDsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7VH0pIGNhbiBvbmx5IGJlIFwiVFwiIG9yIFwiIFwiIG9yIFwidFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IFogfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBaPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggWj09PSd6JyB8fCBaPT09J1onICkgeyB0aGlzLlogPSBaOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtafSkgY2FuIG9ubHkgYmUgXCJaXCIgb3IgXCJ6XCJgKTsgfVxuXHRcdFxuXHRcdGlmICggb3B0aW9ucy54TnVsbCApIHsgdGhpcy5udWxsRGlzYWJsZWQgPSBmYWxzZTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlIH0gPSBvcHRpb25zO1xuXHRcdGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JycgfHwgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JywnICkge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlQ29tbWEgPSAhIXhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHt4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGV9KSBjYW4gb25seSBiZSBcIlwiIG9yIFwiLFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCAkc2luZ2xlbGluZUFycmF5ID0gb3B0aW9ucy5mb3JjZUlubGluZUFycmF5U3BhY2luZztcblx0XHRzd2l0Y2ggKCAkc2luZ2xlbGluZUFycmF5ICkge1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHR0aGlzLiRzaW5nbGVsaW5lQXJyYXkgPSAkc2luZ2xlbGluZUFycmF5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IHR5cGVvZiAkc2luZ2xlbGluZUFycmF5PT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAkeyRzaW5nbGVsaW5lQXJyYXl9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHskc2luZ2xlbGluZUFycmF5PT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgJHNpbmdsZWxpbmVBcnJheX1gKTtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHRoaXM7XG5cdFx0XG5cdH1cblx0XG5cdGFwcGVuZFNlY3Rpb24gKCkgeyByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aF0gPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7IH1cblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy8gZXh0ZXJuYWxcblxuaW1wb3J0IFRPTUxEb2N1bWVudCBmcm9tICcuL2RvY3VtZW50JztcbmNvbnN0IGxpbmVzRnJvbVN0cmluZ2lmeSA9IG5ldyBXZWFrU2V0ICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgYmVMaW5lc0Zyb21TdHJpbmdpZnkgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQobGluZXNGcm9tU3RyaW5naWZ5KTtcbmV4cG9ydCBjb25zdCBpc0xpbmVzRnJvbVN0cmluZ2lmeSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChsaW5lc0Zyb21TdHJpbmdpZnkpO1xuZXhwb3J0IGRlZmF1bHQgKHJvb3RUYWJsZSAgICAgICAgICAgICAgICAsIG9wdGlvbnMgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRvY3VtZW50ID0gbmV3IFRPTUxEb2N1bWVudChvcHRpb25zKTtcblx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50WzBdO1xuXHRzZWN0aW9uWzBdID0gJyc7XG5cdHggICAgICAoc2VjdGlvbi5hc3NpZ25CbG9jayhgYCwgYGAsIHJvb3RUYWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyhyb290VGFibGUpKSk7XG5cdGRvY3VtZW50Lm5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MSAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbiB8fCBkb2N1bWVudFtkb2N1bWVudC5sZW5ndGggLSAxXSAuYXBwZW5kTmV3bGluZSgpO1xuXHRpZiAoIGRvY3VtZW50Lm5ld2xpbmUgKSB7IHJldHVybiBkb2N1bWVudC5qb2luKGRvY3VtZW50Lm5ld2xpbmUpOyB9XG5cdGNvbnN0IGxpbmVzID0gZG9jdW1lbnQuZmxhdCgpO1xuXHRiZUxpbmVzRnJvbVN0cmluZ2lmeShsaW5lcyk7XG5cdHJldHVybiBsaW5lcztcbn07XG5cbmV4cG9ydCB7IGlubGluZSwgU2VjdGlvbiB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmV4cG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBtdWx0aWxpbmVUYWJsZSwgbXVsdGlsaW5lQXJyYXkgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBzaW5nbGVsaW5lQmFzaWNTdHJpbmcsIExpbmVzLCBtdWx0aWxpbmVTdHJpbmcsIG11bHRpbGluZUJhc2ljU3RyaW5nLCBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nLCBtdWx0aWxpbmVOZWVkQmFzaWMgfSBmcm9tICcuL3N0cmluZyc7XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBtdWx0aWxpbmUgPSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyA/IExpdGVyYWxPYmplY3QoKCBtdWx0aWxpbmVOZWVkQmFzaWModmFsdWUpID8gbXVsdGlsaW5lQmFzaWNTdHJpbmcgOiBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nICkoKCAnXFxuJyArIHZhbHVlICkuc3BsaXQoJ1xcbicpICAgICAgICAgKSwgdmFsdWUpIDpcblx0XHRcdGlzQXJyYXkodmFsdWUpID8gTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVTdHJpbmcoTGluZXModmFsdWUpKSwgdHlwZW9mIHN0cmluZz09PSdzdHJpbmcnID8gc3RyaW5nIDogTnVsbChudWxsKSkgOlxuXHRcdFx0XHRtdWx0aWxpbmVUYWJsZSh2YWx1ZSk7XG5cdG11bHRpbGluZS5iYXNpYyA9IChsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgbGluZXM9PT0nc3RyaW5nJ1xuXHRcdFx0PyBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKCggJ1xcbicgKyBsaW5lcyApLnNwbGl0KCdcXG4nKSAgICAgICAgICksIGxpbmVzKVxuXHRcdFx0OiBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKExpbmVzKGxpbmVzKSksIHR5cGVvZiBzdHJpbmc9PT0nc3RyaW5nJyA/IHN0cmluZyA6IE51bGwobnVsbCkpXG5cdDtcblx0bXVsdGlsaW5lLmFycmF5ID0gbXVsdGlsaW5lQXJyYXk7XG5cdGZyZWV6ZShtdWx0aWxpbmUpO1xuXHRyZXR1cm4gbXVsdGlsaW5lO1xufSApKCk7XG5leHBvcnQgY29uc3QgYmFzaWMgPSAodmFsdWUgICAgICAgICkgPT4gTGl0ZXJhbE9iamVjdChzaW5nbGVsaW5lQmFzaWNTdHJpbmcodmFsdWUpLCB2YWx1ZSk7XG5leHBvcnQgY29uc3QgbGl0ZXJhbCA9IChsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLi4uY2hhcnMgICAgICAgICAgKSA9PiB7XG5cdGlmICggdHlwZW9mIGxpdGVyYWw9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGNoYXJzLmxlbmd0aD09PTEgKSB7XG5cdFx0XHRyZXR1cm4gTGl0ZXJhbE9iamVjdChsaXRlcmFsLmluY2x1ZGVzKCdcXG4nKSA/IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbGl0ZXJhbCwgY2hhcnNbMF0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGV0IGluZGV4ID0gY2hhcnMubGVuZ3RoO1xuXHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRjb25zdCB7IHJhdyB9ID0gbGl0ZXJhbDtcblx0XHRcdGxpdGVyYWwgPSByYXdbaW5kZXhdIDtcblx0XHRcdHdoaWxlICggaW5kZXggKSB7IGNoYXJzWy0taW5kZXhdICs9IHJhd1tpbmRleF0gOyB9XG5cdFx0XHRsaXRlcmFsID0gY2hhcnMuam9pbignJykgKyBsaXRlcmFsO1xuXHRcdH1cblx0XHRlbHNlIHsgbGl0ZXJhbCA9IGxpdGVyYWwucmF3WzBdIDsgfVxuXHR9XG5cdHJldHVybiBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuaW5jbHVkZXMoJ1xcbicpID8gbGl0ZXJhbC5zcGxpdCgnXFxuJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsaXRlcmFsLCBOdWxsKG51bGwpKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IGlzVmlldyBmcm9tICcuQXJyYXlCdWZmZXIuaXNWaWV3JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5pbXBvcnQgaXNBcnJheUJ1ZmZlciBmcm9tICcuY2xhc3MuaXNBcnJheUJ1ZmZlcic7XG5pbXBvcnQgVGV4dERlY29kZXIgZnJvbSAnLlRleHREZWNvZGVyJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IFJvb3QgZnJvbSAnLi9sZXZlbC1sb29wJztcbmltcG9ydCB7IGlzTGluZXNGcm9tU3RyaW5naWZ5IH0gZnJvbSAnLi4vc3RyaW5naWZ5Lyc7XG5cbmNvbnN0IHRleHREZWNvZGVyID0gLyojX19QVVJFX18qL25ldyBUZXh0RGVjb2RlcigndXRmLTgnLCBOdWxsKHsgZmF0YWw6IHRydWUsIGlnbm9yZUJPTTogZmFsc2UgfSkpO1xuY29uc3QgYmluYXJ5MnN0cmluZyA9IChhcnJheUJ1ZmZlckxpa2UgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggaXNWaWV3KGFycmF5QnVmZmVyTGlrZSkgPyBhcnJheUJ1ZmZlckxpa2UubGVuZ3RoIT09YXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggOiAhaXNBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlckxpa2UpICkgeyB0aHJvdyBUeXBlRXJyb3IoYG9ubHkgVWludDhBcnJheSBvciBBcnJheUJ1ZmZlciBpcyBhY2NlcHRhYmxlYCk7IH1cblx0dHJ5IHsgcmV0dXJuIHRleHREZWNvZGVyLmRlY29kZShhcnJheUJ1ZmZlckxpa2UpOyB9XG5cdGNhdGNoIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuYCk7IH1cbn07XG5jb25zdCBpc0JpbmFyeUxpa2UgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiAnYnl0ZUxlbmd0aCcgaW4gdmFsdWU7Ly8vXG5cbmNvbnN0IHsgdGVzdDogaW5jbHVkZXNOb25TY2FsYXIgfSA9IHRoZVJlZ0V4cCgvW1xcdUQ4MDAtXFx1REZGRl0vdSk7XG5jb25zdCBhc3NlcnRGdWxTY2FsYXIgPSAoc3RyaW5nICAgICAgICApICAgICAgID0+IHtcblx0aWYgKCBjbGVhclJlZ0V4cChpbmNsdWRlc05vblNjYWxhcihzdHJpbmcpKSApIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuYCk7IH1cbn07XG5cbmxldCBob2xkaW5nICAgICAgICAgID0gZmFsc2U7XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgYmlnaW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcmdzTW9kZSAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5cdGlmICggdHlwZW9mIHNvdXJjZT09PSdvYmplY3QnICYmIHNvdXJjZSApIHtcblx0XHRpZiAoIGlzQXJyYXkoc291cmNlKSApIHsgdGhyb3cgVHlwZUVycm9yKGlzTGluZXNGcm9tU3RyaW5naWZ5KHNvdXJjZSkgPyBgVE9NTC5wYXJzZShhcnJheSBmcm9tIFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZT99KSlgIDogYFRPTUwucGFyc2UoYXJyYXkpYCk7IH1cblx0XHRlbHNlIGlmICggaXNCaW5hcnlMaWtlKHNvdXJjZSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoc291cmNlKTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnBhdGgpYCk7IH1cblx0XHRcdGNvbnN0IHsgZGF0YSwgcmVxdWlyZTogcmVxID0gdHlwZW9mIHJlcXVpcmU9PT0nZnVuY3Rpb24nID8gcmVxdWlyZSA6IHVuZGVmaW5lZCB9ID0gc291cmNlO1xuXHRcdFx0aWYgKCByZXEgKSB7XG5cdFx0XHRcdGNvbnN0IHsgcmVzb2x2ZSB9ID0gcmVxO1xuXHRcdFx0XHRpZiAoIHJlc29sdmUhPW51bGwgKSB7XG5cdFx0XHRcdFx0Y29uc3QgeyBwYXRocyB9ID0gcmVzb2x2ZTtcblx0XHRcdFx0XHRpZiAoIHBhdGhzIT1udWxsICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmV0ID0gYXBwbHkocGF0aHMsIHJlc29sdmUsIFsgJycgXSk7XG5cdFx0XHRcdFx0XHRpZiAoIHJldCE9bnVsbCApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsID0gcmV0WzBdO1xuXHRcdFx0XHRcdFx0XHRpZiAoIHZhbCE9bnVsbCApIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXJuYW1lXyA9IHZhbC5yZXBsYWNlKC9ub2RlX21vZHVsZXMkLywgJycpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggZGlybmFtZV8gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzb3VyY2VQYXRoID0gKCByZXEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKCdwYXRoJykucmVzb2x2ZShkaXJuYW1lXywgc291cmNlUGF0aCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgncGF0aCcpLnJlc29sdmUpYCk7IH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBkYXRhPT09dW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSgnZnMnKS5yZWFkRmlsZVN5bmMoc291cmNlUGF0aCk7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMpYCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSA9IGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLmRhdGEpYCk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YXxzb3VyY2UucmVxdWlyZSlgKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSA9IGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLmRhdGEpYCk7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBzb3VyY2U9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSk7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UpYCk7IH1cblx0bGV0IGpvaW5lciAgICAgICAgICAgICAgICAgICAgO1xuXHRsZXQga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J29iamVjdCcgJiYgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICkge1xuXHRcdGlmICggYmlnaW50IT09dW5kZWZpbmVkIHx8IHghPT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcihgb3B0aW9ucyBtb2RlID8gYXJncyBtb2RlYCk7IH1cblx0XHRqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuam9pbmVyO1xuXHRcdGJpZ2ludCA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5iaWdpbnQ7XG5cdFx0a2V5cyA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5rZXlzO1xuXHRcdHggPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIueDtcblx0XHRhcmdzTW9kZSA9ICcnO1xuXHR9XG5cdGVsc2UgeyBqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0bGV0IHJvb3RUYWJsZSAgICAgICA7XG5cdGxldCBwcm9jZXNzICAgICAgICAgICAgICAgICA7XG5cdGlmICggaG9sZGluZyApIHsgdGhyb3cgRXJyb3IoYHBhcnNpbmcgZHVyaW5nIHBhcnNpbmcuYCk7IH1cblx0aG9sZGluZyA9IHRydWU7XG5cdHRyeSB7XG5cdFx0b3B0aW9ucy51c2Uoc3BlY2lmaWNhdGlvblZlcnNpb24sIGpvaW5lciwgYmlnaW50LCBrZXlzLCB4LCBhcmdzTW9kZSk7XG5cdFx0aXRlcmF0b3IudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdHNvdXJjZSAmJiBzb3VyY2VbMF09PT0nXFx1RkVGRicgJiYgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVE9NTCBjb250ZW50IChzdHJpbmcpIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBCT00gKFUrRkVGRilgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRwcm9jZXNzID0gb3B0aW9ucy5Qcm9jZXNzKCk7XG5cdH1cblx0ZmluYWxseSB7XG5cdFx0aXRlcmF0b3IuZG9uZSgpOy8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdG9wdGlvbnMuY2xlYXIoKTtcblx0XHRob2xkaW5nID0gZmFsc2U7XG5cdFx0Y2xlYXJSZWdFeHAoKTtcblx0fVxuXHRwcm9jZXNzICYmIHByb2Nlc3MoKTtcblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9hc3NpZ24oXG5cdChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+XG5cdFx0dHlwZW9mIHNwZWNpZmljYXRpb25WZXJzaW9uPT09J251bWJlcidcblx0XHRcdD8gcGFyc2Uoc291cmNlLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCwnKVxuXHRcdFx0OiBwYXJzZShzb3VyY2UsIDEuMCwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgLCAnLCcpXG5cdCxcblx0e1xuXHRcdCcxLjAnOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDEuMDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjU6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC41LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC40OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNCwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuMzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjI6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4yLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC4xOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHR9XG4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdCAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuXG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5pbXBvcnQgc3RyaW5naWZ5LCB7IFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCB9IGZyb20gJy4vc3RyaW5naWZ5Lyc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUgfSBmcm9tICcuL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IGlzSW5saW5lLCBpc1NlY3Rpb24gfSBmcm9tICcuL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzIH0gZnJvbSAnLi90eXBlcy9jb21tZW50JztcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwsIGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG5cdEtleXMsXG59KTtcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcblx0U2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsLCBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyxcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxuXHRpc0lubGluZSwgaXNTZWN0aW9uLFxuXHRLZXlzLFxufTtcbiJdLCJuYW1lcyI6WyJQcm94eSIsIk9iamVjdF9mcmVlemUiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwic2V0X2hhcyIsInNldF9hZGQiLCJkZWwiLCJOdWxsIiwib3JkZXJpZnlfTnVsbCIsIml0ZXJhdG9yLnRocm93cyIsIml0ZXJhdG9yLndoZXJlIiwiZnJlZXplIiwiS0VZUyIsImdldCIsInNldCIsImNyZWF0ZSIsInJlZ2V4cHMuc3dpdGNoUmVnRXhwIiwiU3ltYm9sIiwiT2JqZWN0Iiwib3duS2V5cyIsIm9wdGlvbnMuemVyb0RhdGV0aW1lIiwicGFyc2UiLCJvcHRpb25zLm11c3RTY2FsYXIiLCJpdGVyYXRvci5saW5lSW5kZXgiLCJVTkRFUlNDT1JFUyIsIm9wdGlvbnMuYWxsb3dMb25nZXIiLCJvcHRpb25zLnVzaW5nQmlnSW50Iiwib3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyIiwib3B0aW9ucy5JbnRlZ2VyTWF4TnVtYmVyIiwiTmFOIiwiX0luZmluaXR5Iiwib3B0aW9ucy5zRmxvYXQiLCJvcHRpb25zLnNFcnJvciIsIm9wdGlvbnMuVGFibGUiLCJvcHRpb25zLmNvbGxlY3QiLCJyZWdleHBzLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0IiwicmVnZXhwcy5MSVRFUkFMX1NUUklOR19leGVjIiwib3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwiLCJyZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjIiwiaXRlcmF0b3IubWFyayIsIm9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyIsIm9wdGlvbnMuQVJHU19NT0RFIiwicmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4IiwicmVnZXhwcy5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCIsInJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJvcHRpb25zLktFWVMiLCJyZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyIsInJlZ2V4cHMuX19CQVJFX0tFWV9leGVjIiwicmVnZXhwcy5JU19ET1RfS0VZIiwicmVnZXhwcy5ET1RfS0VZIiwib3B0aW9ucy5kaXNhYmxlRGlnaXQiLCJyZWdleHBzLmlzQW1hemluZyIsIm9wdGlvbnMuZW5hYmxlTnVsbCIsIm9wdGlvbnMuZGlzYWxsb3dFbXB0eUtleSIsInJlZ2V4cHMuX1ZBTFVFX1BBSVJfZXhlYyIsIm9wdGlvbnMuYXNTdHJpbmdzIiwib3B0aW9ucy5pbmxpbmVUYWJsZSIsIm9wdGlvbnMuYXNUYWJsZXMiLCJvcHRpb25zLmFzQXJyYXlzIiwicmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMiLCJvcHRpb25zLmFzQm9vbGVhbnMiLCJvcHRpb25zLmFzTnVsbHMiLCJvcHRpb25zLmFzT2Zmc2V0RGF0ZVRpbWVzIiwib3B0aW9ucy5tb3JlRGF0ZXRpbWUiLCJvcHRpb25zLmFzTG9jYWxEYXRlVGltZXMiLCJvcHRpb25zLmFzTG9jYWxUaW1lcyIsIm9wdGlvbnMuYXNMb2NhbERhdGVzIiwib3B0aW9ucy5hc0Zsb2F0cyIsIm9wdGlvbnMuYXNJbnRlZ2VycyIsInJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UiLCJvcHRpb25zLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEiLCJvcHRpb25zLnByZXNlcnZlQ29tbWVudCIsInJlZ2V4cHMuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJpdGVyYXRvci5yZXN0IiwiaXRlcmF0b3IubmV4dCIsInJlZ2V4cHMuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyIsImZyb21FbnRyaWVzIiwiREFURSIsImNsZWFyUmVnRXhwIiwiYXBwbHkiLCJvcHRpb25zLnVzZSIsIml0ZXJhdG9yLnRvZG8iLCJvcHRpb25zLlByb2Nlc3MiLCJpdGVyYXRvci5kb25lIiwib3B0aW9ucy5jbGVhciIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7Ozs7Ozs7Ozs7OztBQ0lmLElBQUksSUFBSSw2Q0FBNkMsSUFBSTtBQUNoRSxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVE7QUFDdEMsR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUNqQixFQUFFLE9BQU8sVUFBVSxNQUFNLEVBQUU7QUFDM0IsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQztBQUNKLEVBQUUsQ0FBQztBQUNIO0FBQ08sSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxF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