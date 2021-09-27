/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.16.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

import Error from '.Error';
import TypeError from '.TypeError';
import Object_assign from '.Object.assign';
import isBuffer from '.Buffer.isBuffer?=';
import from from '.Buffer.from?';
import undefined$1 from '.undefined';
import { readFileSync } from 'fs';
import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import RegExp_prototype from '.RegExp.prototype';
import RangeError from '.RangeError';
import WeakMap from '.WeakMap';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import Object_create from '.Object.create';
import isSafeInteger from '.Number.isSafeInteger';
import Reflect_ownKeys from '.Reflect.ownKeys';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import MIN_SAFE_INTEGER from '.Number.MIN_SAFE_INTEGER';
import NULL from '.null.prototype';
import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import del from '.WeakSet.prototype.delete';
import Null$1 from '.null';
import Proxy$1 from '.Proxy';
import Object_defineProperty from '.Object.defineProperty';
import freeze$1 from '.Object.freeze';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import map_has from '.WeakMap.prototype.has';
import isArray$1 from '.Array.isArray';
import Infinity from '.Infinity';
import NaN from '.NaN';
import NativeDate from '.Date';
import parse$2 from '.Date.parse';
import is from '.Object.is';
import preventExtensions from '.Object.preventExtensions';
import parseInt from '.parseInt';
import fromCharCode from '.String.fromCharCode';
import fromCodePoint from '.String.fromCodePoint';
import BigInt from '.BigInt';
import isFinite from '.isFinite';
import Symbol$1 from '.Symbol';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import Array from '.Array';
import Boolean from '.Boolean';
import String from '.String';
import Number from '.Number';
import Object_fromEntries from '.Object.fromEntries';
import Default from '.default';

const version = '1.16.0';

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

/*¡ j-regexp */

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
		? RegExp('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

'dotAll' in RegExp_prototype && 'unicode' in RegExp_prototype ? RegExp('.', 'gsu') :
		'bind' in RegExp ? RegExp('[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^]/', 'g') :
			/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g;

'dotAll' in RegExp_prototype && 'unicode' in RegExp_prototype ? RegExp('\\r\\n|.', 'gsu') :
		'bind' in RegExp ? RegExp('\\r\\n|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^]/', 'g') :
			/\r\n|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g;

/*¡ j-utf */

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

const could = ()       => {
	if ( sourceLines!==NONE ) { throw Error('Internal error: parsing during parsing.'); }
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

const mark = (type        ) => ( { type, lineIndex } );

const must = (marker                                     )         => {
	lineIndex===lastLineIndex && throws(SyntaxError(`${marker.type} is not close until the end of the file` + where(', which started from ', marker.lineIndex)));
	return sourceLines[++lineIndex] ;
};

const where = (pre        , index         = lineIndex)         => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${index + 1}:1)`
		: `${pre}line ${index + 1}: ${sourceLines[index]}`;

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

const hasOwnProperty_call = /*#__PURE__*/hasOwnProperty.call.bind(hasOwnProperty);

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
		if ( hasOwnProperty_call(target, key) ) {
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

const INLINES = new WeakMap;
const isInline = /*#__PURE__*/map_has.bind(INLINES)                                      ;
const ofInline = /*#__PURE__*/map_get.bind(INLINES)                                                                 ;
const beInline = /*#__PURE__*/map_set.bind(INLINES)                                                                                                        ;
const inline =                                                         (value   )    => {
	beInline(value, true);
	return value;
};
const multilineTable =                                  (value   )    => {
	beInline(value, false);
	return value;
};

const SECTIONS = new WeakSet;
const isSection = /*#__PURE__*/has.bind(SECTIONS)                                                                  ;
const beSection = /*#__PURE__*/add.bind(SECTIONS)                                                 ;
const Section =                            (table   )    => {
	if ( isArray$1(table) ) { throw TypeError(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	return table;
};

const INLINE = true;

const tables = new WeakSet       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                              ;

const implicitTables = new WeakSet       ();
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

const pairs = new WeakSet       ();
const pairs_add = /*#__PURE__*/add.bind(pairs);
const fromPair = /*#__PURE__*/has.bind(pairs)                                         ;
const PAIR = true;

const PlainTable = Null$1(class Table extends Null$1      {
	                                
	constructor (isDirect          , isInline$fromPair          ) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

const OrderedTable = Null$1(class Table extends Null      {
	                                
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

const MULTI_LINE_BASIC_STRING = /(?<=^(?:[^\\"]+|\\.|""?(?!")))/s;/// .?
const MULTI_LINE_BASIC_STRING_exec_0 = (_        )         => {
	let count         = 0;
	for ( let offset         = _.search(MULTI_LINE_BASIC_STRING); offset>0; ) {
		offset = _.slice(count += offset).search(MULTI_LINE_BASIC_STRING);
	}
	return _.slice(0, count);
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|\n[\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER        ;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_        )          => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');///

const BASIC_STRING_TAB______ = /(?<=^(?:[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})))/;
const BASIC_STRING__________ = /(?<=^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})))/;
const BASIC_STRING_DEL______ = /(?<=^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})))/;
const BASIC_STRING_DEL_SLASH = /(?<=^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})))/;
let __BASIC_STRING                               ;
const BASIC_STRING_exec_1 = (line        )         => {
	let count         = 1;
	for ( let offset         = line.slice(1).search(__BASIC_STRING); offset>0; ) {
		offset = line.slice(count += offset).search(__BASIC_STRING);
	}
	count!==line.length && line[count]==='"' || throws(SyntaxError(`Bad basic string` + where(' at ')));
	return line.slice(1, count);
};

const IS_DOT_KEY = /*#__PURE__*/( () => theRegExp(/^[ \t]*\./).test )();
const DOT_KEY = /^[ \t]*\.[ \t]*/;
const BARE_KEY_STRICT = /*#__PURE__*/( () => theRegExp(/^[\w-]+/).exec )();
const BARE_KEY_FREE = /*#__PURE__*/( () => theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/).exec )();
let __BARE_KEY_exec                      ;
const LITERAL_KEY____ = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/).exec )();
const LITERAL_KEY_DEL = /*#__PURE__*/( () => theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/).exec )();
let __LITERAL_KEY_exec                        ;
let supportArrayOfTables         ;

const TABLE_DEFINITION_exec_groups = (lineRest        , parseKeys                                                                                     )                                                                                                   => {
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

const CONTROL_CHARACTER_EXCLUDE_TAB____ = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/).test )();
const CONTROL_CHARACTER_EXCLUDE_TAB_DEL = /*#__PURE__*/( () => theRegExp(/[\x00-\x08\x0B-\x1F]/).test )();
let __CONTROL_CHARACTER_EXCLUDE_test                                         ;

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

/* options */

const THROW_WHILE_MEETING_MULTI = {
	[Symbol.toPrimitive] ()        {
		throws(Error(`TOML.parse(,,multilineStringJoiner) must be passed, while the source including multi-line string` + where(', which is found at ')));
	}
};
let useWhatToJoinMultilineString = '';
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
let allowInlineTableMultilineAndTrailingCommaEvenNoComma         ;
let preserveComment         ;
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
const collect_off = ()        => { throws(SyntaxError(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
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
			throw RangeError('TOML.parse(,specificationVersion)');
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = THROW_WHILE_MEETING_MULTI         ; }
	else { throw TypeError('TOML.parse(,,multilineStringJoiner)'); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError('TOML.parse(,,,useBigInt)'); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
		usingBigInt = null;
		if ( useBigInt>=0 ) { IntegerMin = -( IntegerMax = useBigInt ); }
		else { IntegerMax = -( IntegerMin = useBigInt )-1; }
		if ( IntegerMin < MIN_SAFE_INTEGER || MAX_SAFE_INTEGER < IntegerMax ) { throw RangeError('TOML.parse(,,,useBigInt)'); }
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
		if ( !mixed ) { throw TypeError('TOML.parse(,,,,tag) needs at least TOML 1.0 to support mixed type array'); }
		processor = xOptions;
		collect = collect_on;
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, tag, ...unknown } = xOptions;
		if ( Reflect_ownKeys(unknown).length ) { throw TypeError('TOML.parse(,,,,xOptions)'); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !!longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
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
		for ( const key of Reflect_ownKeys(NativeDate.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(Object_create(NativeDate.prototype, descriptors));
	return freeze$1(Datetime);
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
const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString]        ;
	[OffsetDateTime_value]       ;
	
	         valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		const { 1: more } = leap(literal) && ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
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
const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString]        ;
	[LocalDateTime_value]       ;
	
	         valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal}` + where(' at ')));
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
					0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
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

const MultilineBasicString = (literal        , skipped       )         => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_MULTI_LINE) ;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index] ;
		if ( part==='\n' ) { parts[index] = useWhatToJoinMultilineString; }
		else if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\n':
				case ' ':
				case '\t': parts[index] = ''; break;
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode         = parseInt(part.slice(2), 16);
					0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + index + skipped)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + index + skipped)));
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

const BigIntInteger = (literal        )         => {
	( IS_D_INTEGER(literal) || /*options\$0.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal)
	|| throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	let bigInt         = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal[0]==='-' ) { bigInt = -bigInt; }
	allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	( IS_D_INTEGER(literal) || /*options\$0.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal)
	|| throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const number = literal[0]==='-'
		? -literal.replace(UNDERSCORES_SIGN, '')
		: +literal.replace(UNDERSCORES_SIGN, '');
	isSafeInteger(number)
	|| throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	const bigInt         = BigIntInteger(literal);
	return IntegerMin<=bigInt && bigInt<=IntegerMax ? +( bigInt+'' ) : bigInt;
};

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
		throws(SyntaxError(`Invalid Float ${literal}` + where(' at ')));
	}
	const number = +literal.replace(UNDERSCORES, '');
	if ( sError ) {
		isFinite(number) || throws(RangeError(`Float has been as big as inf, like ${literal}` + where(' at ')));
		number || IS_ZERO(literal) || throws(RangeError(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + where(' at ')));
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
				isInline(table) && throws(Error(`Trying to define Table under static Inline Table` + where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && throws(Error(`Trying to append value to static Inline Array` + where(' at ')));
				table = table[( table          ).length - 1];
			}
			else { throws(Error(`Trying to define Table under non-Table value` + where(' at '))); }
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
			directlyIfNot(lastTable) || throws(Error(`Duplicate Table definition` + where(' at ')));
			fromPair(lastTable) && throws(Error(`A table defined implicitly via key/value pair can not be accessed to via []` + where(', which at ')));
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
	if ( literal[1]!=='\'' || literal[2]!=='\'' ) {
		const $ = LITERAL_STRING_exec(literal) ?? throws(SyntaxError(`Bad literal string` + where(' at ')));
		table[finalKey] = checkLiteralString($[1]);
		return $[2];
	}
	literal = literal.slice(3);
	const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
	if ( $ ) {
		table[finalKey] = checkLiteralString($[1]) + $[2];
		return $[3];
	}
	const lines           = literal ? [ checkLiteralString(literal) ] : [];
	for ( const start = mark('Literal String'); ; ) {
		const line         = must(start);
		const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			table[finalKey] = lines.join(useWhatToJoinMultilineString);
			return $[3];
		}
		lines[lines.length] = line;
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
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		length += 3;
		table[finalKey] = BasicString($) + ( endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
		return literal.slice(length).replace(PRE_WHITESPACE, '');
	}
	const skipped        = literal ? 1 : 0;
	if ( skipped ) { ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal += '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at '))); }
	const lines           = skipped ? [ literal ] : [];
	for ( const start = mark('Basic String'); ; ) {
		let line         = must(start);
		const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
		let { length } = $;
		if ( line.startsWith('"""', length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			length += 3;
			table[finalKey] = MultilineBasicString(lines.join('') + $, skipped) + ( endsWithQuote ? line[length]==='"' ? line[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line += '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		lines[lines.length] = line;
	}
} )     
	                                                                       
	                                                                      
 ;

const KEYS = Null$1(null)                                                    ;
const Sym = (key        ) => {
	const sym = Symbol$1(key);
	KEYS[sym] = key;
	return KEYS[key] = sym;
};
const commentFor = (key        )         => KEYS[key] ?? Sym(key);

const NEWLINE = /\r?\n/g;
const getComment =                    (table                                                             , key   )                     => {
	if ( key in KEYS && KEYS[key]  in table ) {
		const comment = table[KEYS[key] ] ;
		if ( typeof comment==='string' ) { return ' #' + comment.replace(NEWLINE, '')                 ; }///
		throw TypeError(`the value of commentKey must be "string" type, while "${comment===null ? 'null' : typeof comment}" is found`);
	}
	return '';
};

const IS_OFFSET$ = /*#__PURE__*/( () => theRegExp(OFFSET$).test )();

const parseKeys = (lineRest        )                                                                => {
	const leadingKeys           = [];
	let lastIndex         = -1;
	for ( ; ; ) {
		lineRest || throws(SyntaxError(`Empty bare key` + where(' at ')));
		if ( lineRest[0]==='"' ) {
			const key         = BASIC_STRING_exec_1(lineRest);
			lineRest = lineRest.slice(2 + key.length);
			leadingKeys[++lastIndex] = BasicString(key);
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
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
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
	const start = mark('Inline Array');
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	let inline = true;
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = false;
		lineRest = must(start).replace(PRE_WHITESPACE, '');
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
			lineRest = must(start).replace(PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = must(start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			throws(SyntaxError(`Unexpect character in static array item value` + where(', which is found at ')));
		}
	}
	inline && beInline(staticArray, true);
	return lineRest.replace(SYM_WHITESPACE, '');
}     
	                                                                   
	                                                                  
 ;

const equalInlineTable = function * (            table       , finalKey        , lineRest        )    {
	const inlineTable        = table[finalKey] = new Table(DIRECTLY, INLINE);
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	if ( allowInlineTableMultilineAndTrailingCommaEvenNoComma ) {
		const start = mark('Inline Table');
		let inline = true;
		for ( ; ; ) {
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = must(start).replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]==='}' ) { break; }
			const forComment             = ForComment(inlineTable, lineRest);
			const rest             = assign(forComment);
			lineRest = typeof rest==='string' ? rest : yield rest;
			if ( lineRest ) {
				if ( lineRest[0]==='#' ) {
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1); }
					inline = false;
					do { lineRest = must(start).replace(PRE_WHITESPACE, ''); }
					while ( !lineRest || lineRest[0]==='#' );
				}
			}
			else {
				inline = false;
				do { lineRest = must(start).replace(PRE_WHITESPACE, ''); }
				while ( !lineRest || lineRest[0]==='#' );
			}
			if ( lineRest[0]===',' ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
		}
		inline || beInline(inlineTable, false);
	}
	else {
		lineRest || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
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
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
		return lineRest;
	}
	if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
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
					else { throws(SyntaxError(`Unexpect charachtor after table header` + where(' at '))); }
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				const forComment             = ForComment(lastSectionTable, line);
				let rest             = assign(forComment);
				typeof rest==='string' || ( rest = x        (rest) );
				if ( rest ) {
					if ( rest[0]==='#' ) { if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); } }
					else { throws(SyntaxError(`Unexpect charachtor after key/value pair` + where(' at '))); }
				}
			}
		}
	}
	return rootTable;
};

const IS_NON_SCALAR = /*#__PURE__*/( () => theRegExp(NON_SCALAR).test )();
const BOM = '\uFEFF';
const buf2str = (buf        ) => {
	const str = buf.toString();
	if ( !from(str).equals(buf) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
	return str && str[0]===BOM ? str.slice(1) : str;
};

const parse = (source        , specificationVersion                                   , multilineStringJoiner        , useBigInt                   , xOptions                     )        => {
	could();
	let sourcePath        ;
	if ( isBuffer(source) ) {
		source = buf2str(source);
		sourcePath = '';
	}
	else if ( typeof source==='object' && source ) {
		sourcePath = source.path;
		if ( typeof sourcePath!=='string' ) { throw TypeError('TOML.parse(source.path)'); }
		const { data } = source;
		if ( data===undefined$1 ) { source = buf2str(readFileSync(sourcePath)); }
		else if ( isBuffer(data) ) { source = buf2str(data); }
		else if ( typeof data==='string' ) { source = data; }
		else { throw TypeError('TOML.parse(source.data)'); }
	}
	else if ( typeof source==='string' ) { sourcePath = ''; }
	else { throw TypeError('TOML.parse(source)'); }
	try {
		if ( IS_NON_SCALAR(source) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
		try {
			use(specificationVersion, multilineStringJoiner, useBigInt, xOptions);
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

const parse$1 = /*#__PURE__*/Object_assign(
	(source        , specificationVersion                                   , multilineStringJoiner        , useBigInt                   , xOptions                     ) => typeof specificationVersion==='number'
		? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions)
		: parse(source, 1.0, specificationVersion          , multilineStringJoiner                                       , useBigInt                      ),
	{
		'1.0': (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
		1.0: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions),
		0.5: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions),
		0.4: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions),
		0.3: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions),
		0.2: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions),
		0.1: (source        , multilineStringJoiner        , useBigInt                   , xOptions                     ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
	}
);

const LITERAL = new WeakSet;

const isLiteral = /*#__PURE__*/has.bind(LITERAL)                                                                    ;

const beLiteral = /*#__PURE__*/add.bind(LITERAL)                                                   ;

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

const ESCAPED = Null$1        ({
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

const NEED_BASIC = /*#__PURE__*/test.bind(/[\x00-\x08\x0A-\x1F'\x7F]/);
const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
const NEED_ESCAPE = /*#__PURE__*/test.bind(/^[\x00-\x08\x0A-\x1F"\\\x7F]/);
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

const NEED_MULTILINE_BASIC = /*#__PURE__*/test.bind(/[\x00-\x08\x0A-\x1F\x7F]|'''/);
const REAL_MULTILINE_ESCAPE = /*#__PURE__*/test.bind(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/);
const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
const NEED_MULTILINE_ESCAPE = /*#__PURE__*/test.bind(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/);
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
const INTEGER_LIKE = /*#__PURE__*/test.bind(/^-?\d+$/);
const ensureFloat = (literal        ) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float = (value        ) => value
	? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
	: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan';

const BARE = /*#__PURE__*/test.bind(/^[\w-]+$/);
const $Key$ = (key        )         => BARE(key) ? key : singlelineString(key);

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
			this.appendLine = sectionKeys + ' = ';
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
					if ( this.document.nullDisabled ) { throw TypeError(`toml can not stringify "null" type value without truthy options.xNull`); }
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
				if ( value instanceof NativeDate ) {
					this.appendInline = this.document._ ? value.toISOString().replace('T', ' ') : value.toISOString();
					break;
				}
				if ( value instanceof String ) { throw TypeError(`TOML.stringify refuse to handle [object String]`); }
				if ( getOwnPropertyNames ) {
					const keys = getOwnPropertyNames(value                        );
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
					break;
				}
				else {
					if ( value instanceof BigInt ) { throw TypeError(`TOML.stringify refuse to handle [object BigInt]`); }
					if ( value instanceof Number ) { throw TypeError(`TOML.stringify refuse to handle [object Number]`); }
					if ( value instanceof Boolean ) { throw TypeError(`TOML.stringify refuse to handle [object Boolean]`); }
					if ( value instanceof Symbol$1 ) { throw TypeError(`TOML.stringify refuse to handle [object Symbol]`); }
					this.inlineTable(indent, value                        );
					break;
				}
			case 'bigint':
				this.appendInline = '' + value;
				break;
			case 'number':
				this.appendInline = float(value);
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
			const before_value = this.appendInline = keys + ' = ';
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
			this.appendLine = indent_ + keys + ' = ';
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

const name2code = Null$1({
	document: 0,
	section: 1,
	header: 2,
	pairs: 3,
	pair: 4,
}         );

const IS_INDENT = /*#__PURE__*/test.bind(/^[\t ]*$/);

class TOMLDocument extends Array              {
	
	         get ['constructor'] () { return Array; }
	
	0 = new TOMLSection(this);
	
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
		const newline = options?.newline;
		if ( newline===undefined || newline==='\n' || newline==='\r\n' ) { this.newline = newline ?? ''; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
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
	freeze$1(multiline);
	return multiline;
} )();

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
});

export default _export;
export { LocalDate, LocalDateTime, LocalTime, OffsetDateTime, Section, commentFor, inline, literal, multiline, parse$1 as parse, stringify, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai11dGYvc3JjL05PTl9TQ0FMQVIudHMiLCIuLi8uLi9qLXV0Zi9zcmMvc3RyaW5nMmFycmF5LnRzIiwiaXRlcmF0b3IkMC50cyIsIi4uLy4uL2otb3JkZXJpZnkvc3JjL2V4cG9ydC50cyIsInN0cmluZ2lmeS9ub24tYXRvbS50cyIsInR5cGVzL1RhYmxlLnRzIiwicmVnZXhwcyQwLnRzIiwib3B0aW9ucyQwLnRzIiwiai1sZXhlci50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInN0cmluZ2lmeS9jb21tZW50LnRzIiwicGFyc2UvbGV2ZWwtbG9vcC50cyIsInBhcnNlLy50cyIsInN0cmluZ2lmeS9saXRlcmFsLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjE2LjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IGluY2x1ZGVzKHNvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyhzb3VyY2UsICckJykgPyBNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/IFMgOiBudWxsO1xuXHRyZXR1cm4gcmU7XG59XG5cbnZhciBSRV9iaW5kID0gYmluZCAmJiAvKiNfX1BVUkVfXyovYmluZC5iaW5kKFJFICAgICAgICk7XG5cbmZ1bmN0aW9uIENvbnRleHQgKGZsYWdzICAgICAgICApICAgICAgICAgIHtcblx0cmV0dXJuIHtcblx0XHRVOiAhaW5jbHVkZXMoZmxhZ3MsICd1JyksXG5cdFx0STogIWluY2x1ZGVzKGZsYWdzLCAnaScpLFxuXHRcdE06ICFpbmNsdWRlcyhmbGFncywgJ20nKSxcblx0XHRTOiAhaW5jbHVkZXMoZmxhZ3MsICdzJyksXG5cdFx0ZmxhZ3M6IGZsYWdzXG5cdH07XG59XG5cbnZhciBDT05URVhUICAgICAgICAgID0gLyojX19QVVJFX18qL0NvbnRleHQoJycpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm94eVxuXHQ/IC8qI19fUFVSRV9fKi9uZXcgUHJveHkoUkUsIHtcblx0XHRhcHBseTogZnVuY3Rpb24gKFJFLCB0aGlzQXJnLCBhcmdzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KFJFLCBDT05URVhULCBhcmdzKTsgfVxuXHRcdCxcblx0XHRnZXQ6IGZ1bmN0aW9uIChSRSwgZmxhZ3MgICAgICAgICkgeyByZXR1cm4gUkVfYmluZChDb250ZXh0KGZsYWdzKSk7IH1cblx0XHQsXG5cdFx0ZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0LFxuXHRcdHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9KVxuXHQ6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0UkUuYXBwbHkgPSBSRS5hcHBseTtcblx0XHR2YXIgbmV3UmVnRXhwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoQ09OVEVYVCwgYXJndW1lbnRzICAgICAgICk7IH0gICAgICAgO1xuXHRcdGZvciAoIHZhciBmbGFncyA9IDYzOyBmbGFncy0tOyApIHtcblx0XHRcdCggZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdFx0bmV3UmVnRXhwW2NvbnRleHQuZmxhZ3NdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzICAgICAgICk7IH07XG5cdFx0XHR9ICkoQ29udGV4dChcblx0XHRcdFx0KCBmbGFncyAmIDMyID8gJycgOiAnZycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAxNiA/ICcnIDogJ2knICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDggPyAnJyA6ICdtJyApICtcblx0XHRcdFx0KCBmbGFncyAmICA0ID8gJycgOiAncycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMiA/ICcnIDogJ3UnICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDEgPyAnJyA6ICd5JyApXG5cdFx0XHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZyZWV6ZSA/IGZyZWV6ZShuZXdSZWdFeHApIDogbmV3UmVnRXhwO1xuXHR9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRSRUdFWFAudGVzdCA9IFJFR0VYUC50ZXN0O1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBSZWdFeHBfcHJvdG90eXBlIGZyb20gJy5SZWdFeHAucHJvdG90eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgKFxuXHQndW5pY29kZScgaW4gUmVnRXhwX3Byb3RvdHlwZVxuXHRcdD8gUmVnRXhwKCdbXFxcXHVEODAwLVxcXFx1REZGRl0nLCAndScpXG5cdFx0OiAvW1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vXG4pO1xuXG4vLyBcXHV7MTEwMDAwfS1cXHV7RkZGRkZGRkZ9IC0+IFxcdUZGRkRcbiIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgUmVnRXhwX3Byb3RvdHlwZSBmcm9tICcuUmVnRXhwLnByb3RvdHlwZSc7XG5cbnZhciBQT0lOVFMgPVxuXHQnZG90QWxsJyBpbiBSZWdFeHBfcHJvdG90eXBlICYmICd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlID8gUmVnRXhwKCcuJywgJ2dzdScpIDpcblx0XHQnYmluZCcgaW4gUmVnRXhwID8gUmVnRXhwKCdbXFxcXHVEODAwLVxcXFx1REJGRl1bXFxcXHVEQzAwLVxcXFx1REZGRl18W15dLycsICdnJykgOlxuXHRcdFx0L1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcc1xcU10vZztcblxudmFyIFBPSU5UU19DUkxGID1cblx0J2RvdEFsbCcgaW4gUmVnRXhwX3Byb3RvdHlwZSAmJiAndW5pY29kZScgaW4gUmVnRXhwX3Byb3RvdHlwZSA/IFJlZ0V4cCgnXFxcXHJcXFxcbnwuJywgJ2dzdScpIDpcblx0XHQnYmluZCcgaW4gUmVnRXhwID8gUmVnRXhwKCdcXFxcclxcXFxufFtcXFxcdUQ4MDAtXFxcXHVEQkZGXVtcXFxcdURDMDAtXFxcXHVERkZGXXxbXl0vJywgJ2cnKSA6XG5cdFx0XHQvXFxyXFxufFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcc1xcU10vZztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5nMmFycmF5IChzdHJpbmcgICAgICAgICwgY3JsZiAgICAgICAgICApICAgICAgICAgICB7XG5cdHJldHVybiBzdHJpbmcgPyBzdHJpbmcubWF0Y2goY3JsZiA/IFBPSU5UU19DUkxGIDogUE9JTlRTKSAgOiBbXTtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuLy9pbXBvcnQgKiBhcyBvcHRpb25zXFwkMCBmcm9tICcuL29wdGlvbnNcXCQwJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zXFwkMC5jbGVhcigpOyB9XG5cdHRocm93IGVycm9yO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvdWxkID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgdGhyb3cgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBwYXJzaW5nIGR1cmluZyBwYXJzaW5nLicpOyB9XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCxzb3VyY2VQYXRoKScpOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY29uc3QgbWFyayA9ICh0eXBlICAgICAgICApID0+ICggeyB0eXBlLCBsaW5lSW5kZXggfSApO1xuXG5leHBvcnQgY29uc3QgbXVzdCA9IChtYXJrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7bWFya2VyLnR5cGV9IGlzIG5vdCBjbG9zZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBmaWxlYCArIHdoZXJlKCcsIHdoaWNoIHN0YXJ0ZWQgZnJvbSAnLCBtYXJrZXIubGluZUluZGV4KSkpO1xuXHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcbn07XG5cbmV4cG9ydCBjb25zdCB3aGVyZSA9IChwcmUgICAgICAgICwgaW5kZXggICAgICAgICA9IGxpbmVJbmRleCkgICAgICAgICA9PiBzb3VyY2VMaW5lcz09PU5PTkUgPyAnJyA6XG5cdHNvdXJjZVBhdGhcblx0XHQ/IGBcXG4gICAgYXQgKCR7c291cmNlUGF0aH06JHtpbmRleCArIDF9OjEpYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtpbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW2luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHknO1xuaW1wb3J0IE9iamVjdF9hc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IE9iamVjdF9jcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IE9iamVjdF9pcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgT2JqZWN0X2RlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBPYmplY3RfZnJvbUVudHJpZXMgZnJvbSAnLk9iamVjdC5mcm9tRW50cmllcyc7XG5pbXBvcnQgT2JqZWN0X2ZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHknO1xuaW1wb3J0IFJlZmxlY3RfY29uc3RydWN0IGZyb20gJy5SZWZsZWN0LmNvbnN0cnVjdCc7XG5pbXBvcnQgUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSBmcm9tICcuUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9vd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBLZWVwZXIgPSAgICAgKCkgICAgICA9PiBbXTtcblxuY29uc3QgaGFzT3duUHJvcGVydHlfY2FsbCA9IC8qI19fUFVSRV9fKi9oYXNPd25Qcm9wZXJ0eS5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnZW51bWVyYWJsZScpICkgeyB0YXJnZXQuZW51bWVyYWJsZSA9IHNvdXJjZS5lbnVtZXJhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnd3JpdGFibGUnKSApIHsgdGFyZ2V0LndyaXRhYmxlID0gc291cmNlLndyaXRhYmxlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duUHJvcGVydHlfY2FsbCh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSk7XG5cdFx0fVxuXHRcdGlmICggUmVmbGVjdF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBkZXNjcmlwdG9yKSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGtlZXBlcltrZWVwZXIubGVuZ3RoXSA9IGtleTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGRlbGV0ZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggUmVmbGVjdF9kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkgKSB7XG5cdFx0XHRjb25zdCBrZWVwZXIgPSB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpIDtcblx0XHRcdGNvbnN0IGluZGV4ID0ga2VlcGVyLmluZGV4T2Yoa2V5KTtcblx0XHRcdGluZGV4PDAgfHwgLS1rZWVwZXIuY29weVdpdGhpbihpbmRleCwgaW5kZXggKyAxKS5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzOiAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICkgPT4gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdGNvbnN0cnVjdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAsIGFyZ3MgICAsIG5ld1RhcmdldCAgICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2NvbnN0cnVjdCh0YXJnZXQsIGFyZ3MsIG5ld1RhcmdldCkpLFxuXHRhcHBseTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGhpc0FyZyAgICwgYXJncyAgICkgICAgPT4gb3JkZXJpZnkoUmVmbGVjdF9hcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpKSxcbn0pO1xuXG5jb25zdCBuZXdQcm94eSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAsIGtlZXBlciAgICAgICAgICAgKSAgICA9PiB7XG5cdHRhcmdldDJrZWVwZXIuc2V0KHRhcmdldCwga2VlcGVyKTtcblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkgICAodGFyZ2V0LCBoYW5kbGVycyk7XG5cdHByb3h5MnRhcmdldC5zZXQocHJveHksIHRhcmdldCk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc09yZGVyZWQgPSAob2JqZWN0ICAgICAgICApICAgICAgICAgID0+IHByb3h5MnRhcmdldC5oYXMob2JqZWN0KTtcbmV4cG9ydCBjb25zdCBpcyA9IChvYmplY3QxICAgICAgICAsIG9iamVjdDIgICAgICAgICkgICAgICAgICAgPT4gT2JqZWN0X2lzKFxuXHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDEpIHx8IG9iamVjdDEsXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MikgfHwgb2JqZWN0Mixcbik7XG5cbmV4cG9ydCBjb25zdCBvcmRlcmlmeSA9ICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICA9PiB7XG5cdGlmICggcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpICkgeyByZXR1cm4gb2JqZWN0OyB9XG5cdGxldCBwcm94eSA9IHRhcmdldDJwcm94eS5nZXQob2JqZWN0KSAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHByb3h5ICkgeyByZXR1cm4gcHJveHk7IH1cblx0cHJveHkgPSBuZXdQcm94eShvYmplY3QsIE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSkpO1xuXHR0YXJnZXQycHJveHkuc2V0KG9iamVjdCwgcHJveHkpO1xuXHRyZXR1cm4gcHJveHk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgeyBjcmVhdGUgfSA9IHtcblx0Y3JlYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm90byAgICAgICAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGlmICggZGVzY3JpcHRvck1hcHMubGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvck1hcCAgICAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8pICAgICAgICwga2VlcGVyICAgICAgICk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgeyBkZWZpbmVQcm9wZXJ0aWVzIH0gPSB7XG5cdGRlZmluZVByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3QgICAsIGRlc2NyaXB0b3JNYXAgICAgLCAuLi5kZXNjcmlwdG9yTWFwcyAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3Qga2VlcGVyID0gS2VlcGVyICAgICAgICAgICAoKTtcblx0XHRkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2Fzc2lnbihuZXdQcm94eShPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgLCBrZWVwZXIpLCBkZXNjcmlwdG9yTWFwLCAuLi5kZXNjcmlwdG9yTWFwcyk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gRXh0ZXJuYWxEZXNjcmlwdG9yKGRlc2NyaXB0b3JNYXBba2V5XSk7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3RfZGVmaW5lUHJvcGVydGllcyhvcmRlcmlmeShvYmplY3QpLCBkZXNjcmlwdG9yTWFwKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCBrZWVwZXIgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICAgICAgICAoKSwgUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0ZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KSApO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShkZXNjcmlwdG9yTWFwLCBrZWVwZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IE51bGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiB0aHJvd0NvbnN0cnVjdGluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aCAnbmV3J2ApOyB9XG5cdGZ1bmN0aW9uIHRocm93QXBwbHlpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGhvdXQgJ25ldydgKTsgfVxuXHRjb25zdCBOdWxsaWZ5ID0gKGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0XHRkZWxldGUgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXHRcdE9iamVjdF9mcmVlemUoY29uc3RydWN0b3IucHJvdG90eXBlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdH07XG5cdGZ1bmN0aW9uIE51bGwgKCAgICAgICAgICAgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gbmV3LnRhcmdldFxuXHRcdFx0PyBuZXcudGFyZ2V0PT09TnVsbFxuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi90aHJvd0NvbnN0cnVjdGluZygpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL25ld1Byb3h5KHRoaXMsIEtlZXBlciAgICAgKCkpXG5cdFx0XHQ6IHR5cGVvZiBjb25zdHJ1Y3Rvcj09PSdmdW5jdGlvbidcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovTnVsbGlmeShjb25zdHJ1Y3Rvcilcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovdGhyb3dBcHBseWluZygpO1xuXHR9XG5cdC8vQHRzLWlnbm9yZVxuXHROdWxsLnByb3RvdHlwZSA9IG51bGw7XG5cdE9iamVjdF9kZWZpbmVQcm9wZXJ0eShOdWxsLCAnbmFtZScsIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgeyB2YWx1ZTogJycsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSkpO1xuXHQvL2RlbGV0ZSBOdWxsLmxlbmd0aDtcblx0T2JqZWN0X2ZyZWV6ZShOdWxsKTtcblx0cmV0dXJuIE51bGw7XG59KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBERUZBVUxUID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oY2xhc3MgZXh0ZW5kcyBudWxsIHsgd3JpdGFibGUgKCkge30gZW51bWVyYWJsZSAoKSB7fSBjb25maWd1cmFibGUgKCkge30gfS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwge1xuXHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHR3cml0YWJsZTogdHJ1ZSxcblx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxufSk7XG5leHBvcnQgY29uc3QgZnJvbUVudHJpZXMgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVudHJpZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfZnJvbUVudHJpZXMoZW50cmllcyk7XG5cdGNvbnN0IGtlZXBlciAgICAgICAgICAgID0gT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAoKSwgUmVmbGVjdF9vd25LZXlzKHRhcmdldCkpO1xuXHRpZiAoIHByb3RvPT09dW5kZWZpbmVkICkgeyByZXR1cm4gbmV3UHJveHkodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0aWYgKCBwcm90bz09PW51bGwgKSB7IHJldHVybiBuZXdQcm94eShPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUocHJvdG8pLCB0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7IH1cblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0bGV0IGluZGV4ID0gMDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdCggZGVzY3JpcHRvck1hcFtrZXldID0gT2JqZWN0X2NyZWF0ZShERUZBVUxUKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlID0gdGFyZ2V0W2tleV07XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXApICAgICAgICAgICAgICAgICAgICAgICAsIGtlZXBlcik7XG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE51bGwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IHNldF9oYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgc2V0X2FkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBtYXBfaGFzIGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IG1hcF9nZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmdldCc7XG5pbXBvcnQgbWFwX3NldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuY29uc3QgSU5MSU5FUyA9IG5ldyBXZWFrTWFwO1xuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlSW5saW5lID0gLyojX19QVVJFX18qL21hcF9zZXQuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGlubGluZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVUYWJsZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICkgICAgPT4ge1xuXHRiZUlubGluZSh2YWx1ZSwgZmFsc2UpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5jb25zdCBTRUNUSU9OUyA9IG5ldyBXZWFrU2V0O1xuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5pbXBvcnQgZGVsIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5kZWxldGUnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyBOdWxsIGFzIG9yZGVyaWZ5X051bGwgfSBmcm9tICdAbHRkL2otb3JkZXJpZnknO1xuXG5pbXBvcnQgeyBiZUlubGluZSwgYmVTZWN0aW9uIH0gZnJvbSAnLi4vc3RyaW5naWZ5L25vbi1hdG9tJztcblxuZXhwb3J0IHsgaXNJbmxpbmUgfSBmcm9tICcuLi9zdHJpbmdpZnkvbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gTnVsbChjbGFzcyBUYWJsZSBleHRlbmRzIE51bGwgICAgICB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdGNvbnN0cnVjdG9yIChpc0RpcmVjdCAgICAgICAgICAsIGlzSW5saW5lJGZyb21QYWlyICAgICAgICAgICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGFibGVzX2FkZCh0aGlzKTtcblx0XHRpc0RpcmVjdFxuXHRcdFx0PyBpc0lubGluZSRmcm9tUGFpciA/IGJlSW5saW5lKHRoaXMsIHRydWUpIDogYmVTZWN0aW9uKHRoaXMpXG5cdFx0XHQ6ICggaXNJbmxpbmUkZnJvbVBhaXIgPyBwYWlyc19hZGQgOiBpbXBsaWNpdFRhYmxlc19hZGQgKSh0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBPcmRlcmVkVGFibGUgPSBOdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgb3JkZXJpZnlfTnVsbCAgICAgIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUkZnJvbVBhaXIgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lJGZyb21QYWlyID8gYmVJbmxpbmUodGhpcywgdHJ1ZSkgOiBiZVNlY3Rpb24odGhpcylcblx0XHRcdDogKCBpc0lubGluZSRmcm9tUGFpciA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuL2l0ZXJhdG9yJDAnO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XiR7V2hpdGVzcGFjZX0rYCApKCk7XG5cbmV4cG9ydCBjb25zdCBWQUxVRV9SRVNUX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuZXhwb3J0IGNvbnN0IExJVEVSQUxfU1RSSU5HX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuXG5jb25zdCBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcbmNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5leHBvcnRcbmxldCBfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IFNZTV9XSElURVNQQUNFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnNgXG5cdF5cblx0LlxuXHQke1doaXRlc3BhY2V9KmAgKSgpO1xuXG5cbmV4cG9ydCBjb25zdCBUYWcgPSAvW15cXHgwMC1cXHgxRlwiIycoKTw+W1xcXFxcXF1ge31cXHg3Rl0rLztcblxuY29uc3QgS0VZX1ZBTFVFX1BBSVJfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgYFxuXHReXG5cdCR7V2hpdGVzcGFjZX0qXG5cdD1cblx0JHtXaGl0ZXNwYWNlfSpcblx0KD86XG5cdFx0PCgke1RhZ30pPlxuXHRcdCR7V2hpdGVzcGFjZX0qXG5cdCk/XG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbmV4cG9ydCBjb25zdCBfVkFMVUVfUEFJUl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgVEFHX1JFU1RfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbi8qIG9wdGltaXplZCAoYXZvaWQgb3ZlcmZsb3cgb3IgbG9zdCkgKi9cblxuY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkcgPSAvKD88PV4oPzpbXlxcXFxcIl0rfFxcXFwufFwiXCI/KD8hXCIpKSkvczsvLy8gLj9cbmV4cG9ydCBjb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAgPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGNvdW50ICAgICAgICAgPSAwO1xuXHRmb3IgKCBsZXQgb2Zmc2V0ICAgICAgICAgPSBfLnNlYXJjaChNVUxUSV9MSU5FX0JBU0lDX1NUUklORyk7IG9mZnNldD4wOyApIHtcblx0XHRvZmZzZXQgPSBfLnNsaWNlKGNvdW50ICs9IG9mZnNldCkuc2VhcmNoKE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HKTtcblx0fVxuXHRyZXR1cm4gXy5zbGljZSgwLCBjb3VudCk7XG59O1xuXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fID0gL1teXFxcXFxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfCAqXFxuW1xcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18XFxuW1xcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFxcbltcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiAgICAgICAgO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vL1xuXG5jb25zdCBCQVNJQ19TVFJJTkdfVEFCX19fX19fID0gLyg/PD1eKD86W15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KSkpLztcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvKD88PV4oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pKSkvO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IC8oPzw9Xig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pKSkvO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IC8oPzw9Xig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KSkpLztcbmxldCBfX0JBU0lDX1NUUklORyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMSA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgY291bnQgICAgICAgICA9IDE7XG5cdGZvciAoIGxldCBvZmZzZXQgICAgICAgICA9IGxpbmUuc2xpY2UoMSkuc2VhcmNoKF9fQkFTSUNfU1RSSU5HKTsgb2Zmc2V0PjA7ICkge1xuXHRcdG9mZnNldCA9IGxpbmUuc2xpY2UoY291bnQgKz0gb2Zmc2V0KS5zZWFyY2goX19CQVNJQ19TVFJJTkcpO1xuXHR9XG5cdGNvdW50IT09bGluZS5sZW5ndGggJiYgbGluZVtjb3VudF09PT0nXCInIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4gbGluZS5zbGljZSgxLCBjb3VudCk7XG59O1xuXG5leHBvcnRcbmNvbnN0IElTX0RPVF9LRVkgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bIFxcdF0qXFwuLykudGVzdCApKCk7XG5leHBvcnRcbmNvbnN0IERPVF9LRVkgPSAvXlsgXFx0XSpcXC5bIFxcdF0qLztcbmNvbnN0IEJBUkVfS0VZX1NUUklDVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXltcXHctXSsvKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX0ZSRUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKS5leGVjICkoKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBMSVRFUkFMX0tFWV9fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSonLykuZXhlYyApKCk7XG5jb25zdCBMSVRFUkFMX0tFWV9ERUwgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0qJy8pLmV4ZWMgKSgpO1xuZXhwb3J0XG5sZXQgX19MSVRFUkFMX0tFWV9leGVjICAgICAgICAgICAgICAgICAgICAgICAgO1xubGV0IHN1cHBvcnRBcnJheU9mVGFibGVzICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQXJyYXkgb2YgVGFibGVzIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjJgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMik7XG5cdH1cblx0ZWxzZSB7IGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5IH0gPSB7IGxpbmVSZXN0IH0gPSBwYXJzZUtleXMobGluZVJlc3QpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0bGluZVJlc3QgJiYgbGluZVJlc3RbMF09PT0nXScgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0KCBsaW5lUmVzdC5sZW5ndGg+MSA/IGxpbmVSZXN0WzFdPT09J10nPT09YXNBcnJheUl0ZW0gOiAhYXNBcnJheUl0ZW0gKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgU3F1YXJlIGJyYWNrZXRzIG9mIFRhYmxlIGRlZmluaXRpb24gc3RhdGVtZW50IG5vdCBtYXRjaGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdHJldHVybiB7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZywgbGluZVJlc3QgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyA9ICh7IGxlYWRpbmdLZXlzLCBmaW5hbEtleSwgbGluZVJlc3QgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyAxOiB0YWcgPSAnJyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCBidXQgbWlzc2luZyBhdCAnKSkpO1xuXHR0YWcgfHwgbGluZVJlc3QgJiYgbGluZVJlc3RbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdLykudGVzdCApKCk7XG5jb25zdCBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXS8pLnRlc3QgKSgpO1xuZXhwb3J0XG5sZXQgX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuaW1wb3J0IE1BWF9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NQVhfU0FGRV9JTlRFR0VSJztcbmltcG9ydCBNSU5fU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUlOX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi9yZWdleHBzJDAnO1xuXG4vKiBvcHRpb25zICovXG5cbmNvbnN0IFRIUk9XX1dISUxFX01FRVRJTkdfTVVMVEkgPSB7XG5cdFtTeW1ib2wudG9QcmltaXRpdmVdICgpICAgICAgICB7XG5cdFx0aXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRPTUwucGFyc2UoLCxtdWx0aWxpbmVTdHJpbmdKb2luZXIpIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdH1cbn07XG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSAnJztcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbiA9IDA7XG5leHBvcnQgbGV0IEludGVnZXJNYXggPSAwO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuZXhwb3J0IGxldCBlbmRzV2l0aFF1b3RlICAgICAgICAgO1xuZXhwb3J0IGxldCB6ZXJvRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGlubGluZVRhYmxlICAgICAgICAgO1xuZXhwb3J0IGxldCBtb3JlRGF0ZXRpbWUgICAgICAgICA7XG5leHBvcnQgbGV0IGRpc2FsbG93RW1wdHlLZXkgICAgICAgICA7XG4vL2V4cG9ydCBjb25zdCB4b2IgOmJvb2xlYW4gPSB0cnVlO1xuZXhwb3J0IGxldCBzRXJyb3IgICAgICAgICA7XG5leHBvcnQgbGV0IHNGbG9hdCAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBsZXQgVGFibGUgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93TG9uZ2VyICAgICAgICAgO1xuZXhwb3J0IGxldCBlbmFibGVOdWxsICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hICAgICAgICAgO1xuZXhwb3J0IGxldCBwcmVzZXJ2ZUNvbW1lbnQgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvciQwLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvciQwLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbmV4cG9ydCBjb25zdCBwcm9jZXNzID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIGNvbGxlY3Rpb25fbGVuZ3RoICkge1xuXHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBwcm9jZXNzb3IgO1xuXHRcdGNvbnN0IHF1ZXVlID0gY29sbGVjdGlvbjtcblx0XHRwcm9jZXNzb3IgPSBudWxsO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHR3aGlsZSAoIGNvbGxlY3Rpb25fbGVuZ3RoLS0gKSB7XG5cdFx0XHRwcm9jZXNzKHF1ZXVlW2NvbGxlY3Rpb25fbGVuZ3RoXSApO1xuXHRcdFx0cXVldWUubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGg7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiB1c2UgJiBjbGVhciAqL1xuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSAgICAgICA9PiB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGggPSAwO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdGxldCBtaXhlZCAgICAgICAgIDtcblx0c3dpdGNoICggc3BlY2lmaWNhdGlvblZlcnNpb24gKSB7XG5cdFx0Y2FzZSAxLjA6XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0ZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjM6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMjpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4xOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0ZWxzZSBpZiAoIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PXVuZGVmaW5lZCApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IFRIUk9XX1dISUxFX01FRVRJTkdfTVVMVEkgICAgICAgICA7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLG11bHRpbGluZVN0cmluZ0pvaW5lciknKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT11bmRlZmluZWQgfHwgdXNlQmlnSW50PT09dHJ1ZSApIHsgdXNpbmdCaWdJbnQgPSB0cnVlOyB9XG5cdGVsc2UgaWYgKCB1c2VCaWdJbnQ9PT1mYWxzZSApIHsgdXNpbmdCaWdJbnQgPSBmYWxzZTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIHR5cGVvZiB1c2VCaWdJbnQhPT0nbnVtYmVyJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdGlmICggIWlzU2FmZUludGVnZXIodXNlQmlnSW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0XHR1c2luZ0JpZ0ludCA9IG51bGw7XG5cdFx0aWYgKCB1c2VCaWdJbnQ+PTAgKSB7IEludGVnZXJNaW4gPSAtKCBJbnRlZ2VyTWF4ID0gdXNlQmlnSW50ICk7IH1cblx0XHRlbHNlIHsgSW50ZWdlck1heCA9IC0oIEludGVnZXJNaW4gPSB1c2VCaWdJbnQgKS0xOyB9XG5cdFx0aWYgKCBJbnRlZ2VyTWluIDwgTUlOX1NBRkVfSU5URUdFUiB8fCBNQVhfU0FGRV9JTlRFR0VSIDwgSW50ZWdlck1heCApIHsgdGhyb3cgUmFuZ2VFcnJvcignVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpJyk7IH1cblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCB8fCB4T3B0aW9ucz09PWZhbHNlICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gZmFsc2U7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB4T3B0aW9ucz09PXRydWUgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHRydWU7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgeE9wdGlvbnM9PT0nZnVuY3Rpb24nICkge1xuXHRcdFRhYmxlID0gT3JkZXJlZFRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gc0Vycm9yID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSB0cnVlO1xuXHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHRhZykgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRwcm9jZXNzb3IgPSB4T3B0aW9ucztcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0fVxuXHRlbHNlIHtcblx0XHRjb25zdCB7IG9yZGVyLCBsb25nZXIsIGV4YWN0LCBudWxsOiBfbnVsbCwgbXVsdGksIGNvbW1lbnQsIHRhZywgLi4udW5rbm93biB9ID0geE9wdGlvbnM7XG5cdFx0aWYgKCBvd25LZXlzKHVua25vd24pLmxlbmd0aCApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucyknKTsgfVxuXHRcdFRhYmxlID0gb3JkZXIgPyBPcmRlcmVkVGFibGUgOiBQbGFpblRhYmxlO1xuXHRcdGFsbG93TG9uZ2VyID0gISFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRwcmVzZXJ2ZUNvbW1lbnQgPSAhIWNvbW1lbnQ7XG5cdFx0aWYgKCB0YWcgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiB0YWchPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zLnRhZyknKTsgfVxuXHRcdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMpIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXknKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImNvbnN0IHByZXZpb3VzID0gU3ltYm9sKCdwcmV2aW91cycpO1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuXG5leHBvcnQgY29uc3QgeCA9ICAgICAocm9vdFN0YWNrICAgICAgKSAgICA9PiB7XG5cdGxldCBzdGFjayAgICAgICAgPSByb290U3RhY2s7XG5cdGxldCByZXN1bHQgPSBzdGFjay5uZXh0KCk7XG5cdGlmICggIXJlc3VsdC5kb25lICkge1xuXHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRyZXN1bHQgPSAoIHN0YWNrID0gcmVzdWx0LnZhbHVlICkubmV4dCgpO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdGlmICggcmVzdWx0LmRvbmUgKSB7XG5cdFx0XHRcdGlmICggc3RhY2s9PT1yb290U3RhY2sgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdHN0YWNrID0gc3RhY2tbcHJldmlvdXNdIDtcblx0XHRcdFx0cmVzdWx0ID0gc3RhY2submV4dChyZXN1bHQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRcdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdC52YWx1ZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgXG5cdCAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgXG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcblxuY29uc3QgYXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBhcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNBcnJheSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChhcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IE9GX1RBQkxFUyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNUQVRJQ0FMTFkgPSB0cnVlO1xuY29uc3Qgc3RhdGljYWxBcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChzdGF0aWNhbEFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNTdGF0aWMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoc3RhdGljYWxBcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBuZXdBcnJheSA9IChpc1N0YXRpYyAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgYXJyYXkgICAgICAgID0gW107XG5cdGFycmF5c19hZGQoYXJyYXkpO1xuXHRpc1N0YXRpYyAmJiBzdGF0aWNhbEFycmF5c19hZGQoYXJyYXkpO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBOYXRpdmVEYXRlIGZyb20gJy5EYXRlJztcbmltcG9ydCBwYXJzZSBmcm9tICcuRGF0ZS5wYXJzZSc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcblxuY29uc3QgZnBjID0gICAgICAgICAgICAgICAgICAgICAgKGMgICApICAgID0+IHtcblx0ZnJlZXplKGZyZWV6ZShjKS5wcm90b3R5cGUpO1xuXHRyZXR1cm4gYztcbn07XG5cbmNvbnN0IF8yOV8gPSAvKD86MFsxLTldfDFcXGR8MlxcZCkvO1xuY29uc3QgXzMwXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzMCkvO1xuY29uc3QgXzMxXyA9IC8oPzowWzEtOV18WzEyXVxcZHwzWzAxXSkvO1xuY29uc3QgXzIzXyA9IC8oPzpbMDFdXFxkfDJbMC0zXSkvO1xuY29uc3QgXzU5XyA9IC9bMC01XVxcZC87XG5cbmNvbnN0IFlNRCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XFxkXFxkXFxkXFxkLVxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRbMTM1NzhdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdFs0NjldLSR7XzMwX31cblx0XHRcdHxcblx0XHRcdDItJHtfMjlffVxuXHRcdClcblx0XHR8XG5cdFx0MVxuXHRcdCg/OlxuXHRcdFx0WzAyXS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHQxLSR7XzMwX31cblx0XHQpXG5cdClcbmAgKSgpO1xuXG5jb25zdCBITVMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5gICkoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86WnxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgWl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwICAgICAgICAgICAoLygoWystXSlcXGRcXGQpOihcXGRcXGQpJC8pLmV4ZWMgKSgpO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUVfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU31cblx0KD86XFwuXFxkezEsM30oXFxkKj8pMCopP1xuXHQoPzpafFsrLV0ke18yM199OiR7XzU5X30pXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBPRkZTRVRfREFURVRJTUVfWkVST19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwICAgYFxuXHReXG5cdCR7WU1EfVxuXHRbVCBdXG5cdCR7SE1TfVxuXHQoKVxuXHRaXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9EQVRFVElNRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBJU19MT0NBTF9EQVRFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgSVNfTE9DQUxfVElNRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnRlc3QgKSgpO1xuXG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBaRVJPID0gLyg/PD1cXC5cXGQqKTArJC87XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgJycpLnJlcGxhY2UoREVMSU1JVEVSX0RPVCwgJycpO1xuXG5jb25zdCBsZWFwID0gKGxpdGVyYWwgICAgICAgICkgPT4gbGl0ZXJhbC5zbGljZSg1LCAxMCkhPT0nMDItMjknIHx8ICtsaXRlcmFsLnNsaWNlKDAsIDQpJTQ9PT0wICYmIGxpdGVyYWwuc2xpY2UoMiwgNCkhPT0nMDAnO1xuXG5jb25zdCBEQVRFID0gbmV3IE5hdGl2ZURhdGUoMCk7XG5cbmNvbnN0IE9mZnNldERhdGVUaW1lX0lTT1N0cmluZyA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX3VzZSA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJCAgICAgICAgID0gMCkgPT4ge1xuXHREQVRFLnNldFRpbWUoK3RoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICsgJCk7XG5cdHJldHVybiBEQVRFO1xufTtcbmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBlbmQgKSB7IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpOyB9XG5cdGNvbnN0IHRpbWUgPSBwYXJzZSh0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHR0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB0aW1lICkucGFkU3RhcnQoMTUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxNSk7XG5cdHJldHVybiB0aW1lO1xufTtcbmV4cG9ydCBjb25zdCBPZmZzZXREYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgT2Zmc2V0RGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdGNvbnN0IHsgMTogbW9yZSB9ID0gbGVhcChsaXRlcmFsKSAmJiAoIG9wdGlvbnMkMC56ZXJvRGF0ZXRpbWUgPyBPRkZTRVRfREFURVRJTUVfWkVST19leGVjIDogT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgKShsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHBhcnNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSkgKS5wYWRTdGFydCgxNSwgJzAnKSArICggbW9yZSA/ICcuJyArIG1vcmUgOiAnJyApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRVVENGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRnVsbFllYXIoKTsgfVxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0VVRDRGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXRlKCk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRVVENNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbnV0ZXMoKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0VVRDU2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENTZWNvbmRzKCk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDEyLCAxNSk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDApO1xuXHR9XG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHRnZXREYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSo2MDAwMCkuZ2V0VVRDRGF5KCk7XG5cdH1cblx0Z2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHRyZXR1cm4geiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDA7XG5cdH1cblx0c2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgICApIHtcblx0XHR2YWx1ZSA9ICt2YWx1ZTtcblx0XHRsZXQgc3RyaW5nID0gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHZhbHVlKjYwMDAwKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0aWYgKCB2YWx1ZT4wICkgeyBzdHJpbmcgKz0gJysnOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3RyaW5nICs9ICctJztcblx0XHRcdFx0dmFsdWUgPSAtdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtID0gdmFsdWUlNjA7XG5cdFx0XHRjb25zdCBoID0gKCB2YWx1ZSAtIG0gKS82MDtcblx0XHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHN0cmluZyArICggaD45ID8gaCA6ICcwJyArIGggKSArICggbT45ID8gJzonICsgbSA6ICc6MCcgKyBtICk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBzdHJpbmcgKyAoIGlzKHZhbHVlLCAwKSA/ICdaJyA6ICctMDA6MDAnICk7IH1cblx0fVxuXHRnZXRUaW1lICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDAsIDE1KTsgfS8vL1xuXHRzZXRUaW1lICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMTUsICcwJyk7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxEYXRlVGltZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PiB7XG5cdHRoYXRbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGVUaW1lID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlVGltZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFVElNRShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbERhdGVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsRGF0ZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURShsaXRlcmFsKSAmJiBsZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIERhdGUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbFRpbWVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsVGltZV92YWx1ZScpO1xuY29uc3QgTG9jYWxUaW1lX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsVGltZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgyLCAnMCcpICsgdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZShlbmQpXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IExvY2FsVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W0xvY2FsVGltZV9JU09TdHJpbmddICAgICAgICA7XG5cdFtMb2NhbFRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIExvY2FsIFRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAwLCAyKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsVGltZV9zZXQodGhpcywgMCwgMiwgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAzLCA1KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gTG9jYWxUaW1lX3NldCh0aGlzLCA2LCA4LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxUaW1lX3ZhbHVlXS5zbGljZSg2LCA5KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgOCkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21DaGFyQ29kZSBmcm9tICcuU3RyaW5nLmZyb21DaGFyQ29kZSc7XG5pbXBvcnQgZnJvbUNvZGVQb2ludCBmcm9tICcuU3RyaW5nLmZyb21Db2RlUG9pbnQnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQweEQ3RkY8Y2hhckNvZGUgJiYgY2hhckNvZGU8MHhFMDAwXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdFx0XHRcdFx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCBza2lwcGVkICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkgeyBwYXJ0c1tpbmRleF0gPSBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZzsgfVxuXHRcdGVsc2UgaWYgKCBwYXJ0WzBdPT09J1xcXFwnICkge1xuXHRcdFx0c3dpdGNoICggcGFydFsxXSApIHtcblx0XHRcdFx0Y2FzZSAnXFxuJzpcblx0XHRcdFx0Y2FzZSAnICc6XG5cdFx0XHRcdGNhc2UgJ1xcdCc6IHBhcnRzW2luZGV4XSA9ICcnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXFxcXCc6IHBhcnRzW2luZGV4XSA9ICdcXFxcJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1wiJzogcGFydHNbaW5kZXhdID0gJ1wiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2InOiBwYXJ0c1tpbmRleF0gPSAnXFxiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3QnOiBwYXJ0c1tpbmRleF0gPSAnXFx0JzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ24nOiBwYXJ0c1tpbmRleF0gPSAnXFxuJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2YnOiBwYXJ0c1tpbmRleF0gPSAnXFxmJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3InOiBwYXJ0c1tpbmRleF0gPSAnXFxyJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3UnOlxuXHRcdFx0XHRcdGNvbnN0IGNoYXJDb2RlICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0MHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwYXJ0fWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJywgaXRlcmF0b3IkMC5saW5lSW5kZXggKyBpbmRleCArIHNraXBwZWQpKSk7XG5cdFx0XHRcdFx0cGFydHNbaW5kZXhdID0gZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnVSc6XG5cdFx0XHRcdFx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yJDAubGluZUluZGV4ICsgaW5kZXggKyBza2lwcGVkKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5leHBvcnQgY29uc3QgSU5URUdFUl9EID0gL1stK10/KD86MHxbMS05XVtfXFxkXSopLztcbmV4cG9ydCBjb25zdCBCQURfRCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBfKD8hXFxkKWAudGVzdCApKCk7XG5jb25zdCBJU19EX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnRlc3QgKSgpO1xuY29uc3QgSVNfWE9CX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14wKD86eFtcXGRBLUZhLWZdW19cXGRBLUZhLWZdKnxvWzAtN11bXzAtN10qfGJbMDFdW18wMV0qKSQvKS50ZXN0ICkoKTtcbmNvbnN0IEJBRF9YT0IgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXyg/IVtcXGRBLUZhLWZdKWAudGVzdCApKCk7XG5jb25zdCBVTkRFUlNDT1JFU19TSUdOID0gL198XlstK10vZztcblxuY29uc3QgQmlnSW50SW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHQoIElTX0RfSU5URUdFUihsaXRlcmFsKSB8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRsZXQgYmlnSW50ICAgICAgICAgPSBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdGlmICggbGl0ZXJhbFswXT09PSctJyApIHsgYmlnSW50ID0gLWJpZ0ludDsgfVxuXHRvcHRpb25zJDAuYWxsb3dMb25nZXJcblx0fHwgLTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IH5tYXggKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IH5taW4gKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGV4cGVjdCA2NCBiaXQgcmFuZ2UgKC05LDIyMywzNzIsMDM2LDg1NCw3NzUsODA4IHRvIDksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDcpLCBub3QgaW5jbHVkZXMgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcblxuY29uc3QgTnVtYmVySW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHQoIElTX0RfSU5URUdFUihsaXRlcmFsKSB8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gb3B0aW9ucyQwLkludGVnZXJNaW48PWJpZ0ludCAmJiBiaWdJbnQ8PW9wdGlvbnMkMC5JbnRlZ2VyTWF4ID8gKyggYmlnSW50KycnICkgOiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbi8vaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG4vL2ltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBJU19GTE9BVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke0lOVEVHRVJfRH1cblx0KD86XG5cdFx0XFwuXFxkW19cXGRdKlxuXHRcdCg/OltlRV1bLStdP1xcZFtfXFxkXSopP1xuXHR8XG5cdFx0W2VFXVstK10/XFxkW19cXGRdKlxuXHQpXG5cdCRgLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgSVNfWkVSTyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLlswX10rKT8oPzpbZUVdWy0rXT8wKyk/JC8pLnRlc3QgKSgpO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhSVNfRkxPQVQobGl0ZXJhbCkgfHwgQkFEX0QobGl0ZXJhbCkgKSB7XG5cdFx0Ly9pZiAoIG9wdGlvbnNcXCQwLnNGbG9hdCApIHtcblx0XHQvL1x0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHsgcmV0dXJuIEluZmluaXR5OyB9XG5cdFx0Ly9cdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIC1JbmZpbml0eTsgfVxuXHRcdC8vXHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBOYU47IH1cblx0XHQvL31cblx0XHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdGNvbnN0IG51bWJlciA9ICtsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKTtcblx0aWYgKCBvcHRpb25zJDAuc0Vycm9yICkge1xuXHRcdGlzRmluaXRlKG51bWJlcikgfHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgaGFzIGJlZW4gYXMgYmlnIGFzIGluZiwgbGlrZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG51bWJlciB8fCBJU19aRVJPKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wLCBsaWtlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIGRpcmVjdGx5SWZOb3QsIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpbGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzU3RhdGljKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFwcGVuZCB2YWx1ZSB0byBzdGF0aWMgSW5saW5lIEFycmF5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgKS5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFkpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kVGFibGUgPSAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShPRl9UQUJMRVMpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRsYXN0VGFibGUgPSB0YWJsZVtmaW5hbEtleV07XG5cdFx0XHRkaXJlY3RseUlmTm90KGxhc3RUYWJsZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBUYWJsZSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZnJvbVBhaXIobGFzdFRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIGtleS92YWx1ZSBwYWlyIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIFtdYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFkpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0fVxuXHRyZXR1cm4gbGFzdFRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbmxpbmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aXNUYWJsZSh0YWJsZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZnJvbVBhaXIodGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEgW10gY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNoZWNrTGl0ZXJhbFN0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGl0ZXJhbCkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBhIExpdGVyYWwgU3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiBsaXRlcmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkxpdGVyYWxTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbFsxXSE9PSdcXCcnIHx8IGxpdGVyYWxbMl0hPT0nXFwnJyApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBsaXRlcmFsIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0bGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMyk7XG5cdGNvbnN0ICQgPSByZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbCk7XG5cdGlmICggJCApIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdHJldHVybiAkWzNdO1xuXHR9XG5cdGNvbnN0IGxpbmVzICAgICAgICAgICA9IGxpdGVyYWwgPyBbIGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKSBdIDogW107XG5cdGZvciAoIGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdMaXRlcmFsIFN0cmluZycpOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaW5lKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGxpbmVzLmpvaW4ob3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcpO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBsaW5lO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbFsxXSE9PSdcIicgfHwgbGl0ZXJhbFsyXSE9PSdcIicgKSB7XG5cdFx0Y29uc3Qgc3RyaW5nID0gcmVnZXhwcyQwLkJBU0lDX1NUUklOR19leGVjXzEobGl0ZXJhbCk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gQmFzaWNTdHJpbmcoc3RyaW5nKTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZSgyICsgc3RyaW5nLmxlbmd0aCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGl0ZXJhbCk7XG5cdGxldCB7IGxlbmd0aCB9ID0gJDtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGVuZ3RoICs9IDM7XG5cdFx0dGFibGVbZmluYWxLZXldID0gQmFzaWNTdHJpbmcoJCkgKyAoIG9wdGlvbnMkMC5lbmRzV2l0aFF1b3RlID8gbGl0ZXJhbFtsZW5ndGhdPT09J1wiJyA/IGxpdGVyYWxbKytsZW5ndGhdPT09J1wiJyA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnIDogJycgKTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Y29uc3Qgc2tpcHBlZCAgICAgICAgPSBsaXRlcmFsID8gMSA6IDA7XG5cdGlmICggc2tpcHBlZCApIHsgcmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpdGVyYWwgKz0gJ1xcbicpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH1cblx0Y29uc3QgbGluZXMgICAgICAgICAgID0gc2tpcHBlZCA/IFsgbGl0ZXJhbCBdIDogW107XG5cdGZvciAoIGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdCYXNpYyBTdHJpbmcnKTsgOyApIHtcblx0XHRsZXQgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaW5lKTtcblx0XHRsZXQgeyBsZW5ndGggfSA9ICQ7XG5cdFx0aWYgKCBsaW5lLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGxlbmd0aCArPSAzO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcobGluZXMuam9pbignJykgKyAkLCBza2lwcGVkKSArICggb3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUgPyBsaW5lW2xlbmd0aF09PT0nXCInID8gbGluZVsrK2xlbmd0aF09PT0nXCInID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgOiAnJyApO1xuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGluZSArPSAnXFxuJykgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gbGluZTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuY29uc3QgS0VZUyA9IE51bGwobnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgU3ltID0gKGtleSAgICAgICAgKSA9PiB7XG5cdGNvbnN0IHN5bSA9IFN5bWJvbChrZXkpO1xuXHRLRVlTW3N5bV0gPSBrZXk7XG5cdHJldHVybiBLRVlTW2tleV0gPSBzeW07XG59O1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3IgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gS0VZU1trZXldID8/IFN5bShrZXkpO1xuXG5jb25zdCBORVdMSU5FID0gL1xccj9cXG4vZztcbmV4cG9ydCBjb25zdCBnZXRDb21tZW50ID0gICAgICAgICAgICAgICAgICAgICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICgga2V5IGluIEtFWVMgJiYgS0VZU1trZXldICBpbiB0YWJsZSApIHtcblx0XHRjb25zdCBjb21tZW50ID0gdGFibGVbS0VZU1trZXldIF0gO1xuXHRcdGlmICggdHlwZW9mIGNvbW1lbnQ9PT0nc3RyaW5nJyApIHsgcmV0dXJuICcgIycgKyBjb21tZW50LnJlcGxhY2UoTkVXTElORSwgJycpICAgICAgICAgICAgICAgICA7IH0vLy9cblx0XHR0aHJvdyBUeXBlRXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50S2V5IG11c3QgYmUgXCJzdHJpbmdcIiB0eXBlLCB3aGlsZSBcIiR7Y29tbWVudD09PW51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29tbWVudH1cIiBpcyBmb3VuZGApO1xuXHR9XG5cdHJldHVybiAnJztcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy9cblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCB7IElOTElORSwgRElSRUNUTFkgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgU1RBVElDQUxMWSB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUJCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcbmltcG9ydCB7IGFwcGVuZFRhYmxlLCBwcmVwYXJlVGFibGUsIHByZXBhcmVJbmxpbmVUYWJsZSwgYXNzaWduTGl0ZXJhbFN0cmluZywgYXNzaWduQmFzaWNTdHJpbmcgfSBmcm9tICcuL29uLXRoZS1zcG90JztcblxuaW1wb3J0IHsgY29tbWVudEZvciB9IGZyb20gJy4uL3N0cmluZ2lmeS9jb21tZW50JztcbmltcG9ydCB7IGJlSW5saW5lIH0gZnJvbSAnLi4vc3RyaW5naWZ5L25vbi1hdG9tJztcblxuY29uc3QgSVNfT0ZGU0VUJCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cChPRkZTRVQkKS50ZXN0ICkoKTtcblxuY29uc3QgcGFyc2VLZXlzID0gKGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgID0gW107XG5cdGxldCBsYXN0SW5kZXggICAgICAgICA9IC0xO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGluZVJlc3QgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGJhcmUga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nXCInICkge1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSByZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWNfMShsaW5lUmVzdCk7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKDIgKyBrZXkubGVuZ3RoKTtcblx0XHRcdGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IEJhc2ljU3RyaW5nKGtleSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNRdW90ZWQgPSBsaW5lUmVzdFswXT09PSdcXCcnO1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggaXNRdW90ZWQgPyByZWdleHBzJDAuX19MSVRFUkFMX0tFWV9leGVjIDogcmVnZXhwcyQwLl9fQkFSRV9LRVlfZXhlYyApKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkICR7aXNRdW90ZWQgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSkgKVswXTtcblx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3Quc2xpY2Uoa2V5Lmxlbmd0aCk7XG5cdFx0XHRsZWFkaW5nS2V5c1srK2xhc3RJbmRleF0gPSBpc1F1b3RlZCA/IGtleS5zbGljZSgxLCAtMSkgOiBrZXk7XG5cdFx0fVxuXHRcdGlmICggcmVnZXhwcyQwLklTX0RPVF9LRVkobGluZVJlc3QpICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLkRPVF9LRVksICcnKTsgfVxuXHRcdGVsc2UgeyBicmVhazsgfVxuXHR9XG5cdGlmICggb3B0aW9ucyQwLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7XG5cdFx0ZG8geyBsZWFkaW5nS2V5c1tpbmRleF0gIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBrZXkgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7IH1cblx0XHR3aGlsZSAoIGluZGV4LS0gKTtcblx0fVxuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gbGVhZGluZ0tleXNbbGFzdEluZGV4XSA7XG5cdGxlYWRpbmdLZXlzLmxlbmd0aCA9IGxhc3RJbmRleDtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9O1xufTtcblxuY29uc3QgcHVzaCA9IChsYXN0QXJyYXkgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGlmICggbGluZVJlc3RbMF09PT0nPCcgKSB7XG5cdFx0Y29uc3QgeyAxOiB0YWcgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZyBgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcob3B0aW9ucyQwLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHJldHVybiBlcXVhbElubGluZVRhYmxlKG9wdGlvbnMkMC5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zJDAuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gLUluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IE5hTjtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRvcHRpb25zJDAuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0bGl0ZXJhbD09PSd0cnVlJyA/IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSB0cnVlIDogbGl0ZXJhbD09PSdmYWxzZScgPyBvcHRpb25zJDAuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gZmFsc2UgOlxuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpID8gb3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBGbG9hdChsaXRlcmFsKSA6XG5cdFx0XHRvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnID8gb3B0aW9ucyQwLmFzTnVsbHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG51bGwgOlxuXHRcdFx0XHRvcHRpb25zJDAuYXNJbnRlZ2VycyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gSW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuY29uc3QgZXF1YWxTdGF0aWNBcnJheSA9IGZ1bmN0aW9uICogKCAgICAgICAgICAgIHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAge1xuXHRjb25zdCBzdGF0aWNBcnJheSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShTVEFUSUNBTExZKTtcblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBBcnJheScpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCBpbmxpbmUgPSB0cnVlO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkge1xuXHRcdGlubGluZSAmJiBiZUlubGluZShzdGF0aWNBcnJheSwgdHJ1ZSk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IGJyZWFrOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHRcdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRcdH1cblx0fVxuXHRpbmxpbmUgJiYgYmVJbmxpbmUoc3RhdGljQXJyYXksIHRydWUpO1xuXHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcbn0gICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgZXF1YWxJbmxpbmVUYWJsZSA9IGZ1bmN0aW9uICogKCAgICAgICAgICAgIHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAge1xuXHRjb25zdCBpbmxpbmVUYWJsZSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBUYWJsZScpO1xuXHRcdGxldCBpbmxpbmUgPSB0cnVlO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQoaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRsaW5lUmVzdCA9IHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdDtcblx0XHRcdGlmICggbGluZVJlc3QgKSB7XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0aWYgKCBvcHRpb25zJDAucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHR9XG5cdFx0aW5saW5lIHx8IGJlSW5saW5lKGlubGluZVRhYmxlLCBmYWxzZSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGluZVJlc3QgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdGlmICggbGluZVJlc3RbMF0hPT0nfScgKSB7XG5cdFx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRcdGxpbmVSZXN0WzBdPT09JyMnICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTtcblx0XHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihGb3JDb21tZW50KGlubGluZVRhYmxlLCBsaW5lUmVzdCkpO1xuXHRcdFx0XHRsaW5lUmVzdCA9ICggdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0ICkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBGb3JDb21tZW50ID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZyB9ID0geyBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzKHBhcnNlS2V5cyhsaW5lUmVzdCkpO1xuXHRyZXR1cm4geyB0YWJsZTogcHJlcGFyZUlubGluZVRhYmxlKGxhc3RJbmxpbmVUYWJsZSwgbGVhZGluZ0tleXMpLCBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcbmNvbnN0IGFzc2lnbiA9ICh7IGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0LCB0YWJsZSB9ICAgICAgICAgICAgKSAgICAgICAgICAgICA9PiB7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgcHJvcGVydHkgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICd9Jzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHJldHVybiBlcXVhbElubGluZVRhYmxlKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0cmV0dXJuIGVxdWFsU3RhdGljQXJyYXkodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggb3B0aW9ucyQwLnNGbG9hdCApIHtcblx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IC1JbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTmFOO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHR0YWJsZVtmaW5hbEtleV0gPVxuXHRcdGxpdGVyYWw9PT0ndHJ1ZScgPyB0cnVlIDogbGl0ZXJhbD09PSdmYWxzZScgPyBmYWxzZSA6XG5cdFx0XHRsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKSA/IEZsb2F0KGxpdGVyYWwpIDpcblx0XHRcdFx0b3B0aW9ucyQwLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyA/IG51bGwgOlxuXHRcdFx0XHRcdEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICgpICAgICAgICA9PiB7XG5cdGNvbnN0IHJvb3RUYWJsZSAgICAgICAgPSBuZXcgb3B0aW9ucyQwLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IkMC5yZXN0KCkgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5uZXh0KCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMobGluZSwgcGFyc2VLZXlzKTtcblx0XHRcdFx0Y29uc3QgdGFibGUgICAgICAgID0gcHJlcGFyZVRhYmxlKHJvb3RUYWJsZSwgbGVhZGluZ0tleXMpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0ICkge1xuXHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nIycgKSB7IGlmICggb3B0aW9ucyQwLnByZXNlcnZlQ29tbWVudCAmJiAhYXNBcnJheUl0ZW0gKSB7IHRhYmxlW2NvbW1lbnRGb3IoZmluYWxLZXkpXSA9IGxpbmVSZXN0LnNsaWNlKDEpOyB9IH1cblx0XHRcdFx0XHRlbHNlIHsgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0bGFzdFNlY3Rpb25UYWJsZSA9IGFwcGVuZFRhYmxlKHRhYmxlLCBmaW5hbEtleSwgYXNBcnJheUl0ZW0sIHRhZyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggbGluZVswXT09PScjJyApIHtcblx0XHRcdFx0cmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpbmUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChsYXN0U2VjdGlvblRhYmxlLCBsaW5lKTtcblx0XHRcdFx0bGV0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oZm9yQ29tbWVudCk7XG5cdFx0XHRcdHR5cGVvZiByZXN0PT09J3N0cmluZycgfHwgKCByZXN0ID0geCAgICAgICAgKHJlc3QpICk7XG5cdFx0XHRcdGlmICggcmVzdCApIHtcblx0XHRcdFx0XHRpZiAoIHJlc3RbMF09PT0nIycgKSB7IGlmICggb3B0aW9ucyQwLnByZXNlcnZlQ29tbWVudCApIHsgZm9yQ29tbWVudC50YWJsZVtjb21tZW50Rm9yKGZvckNvbW1lbnQuZmluYWxLZXkpXSA9IHJlc3Quc2xpY2UoMSk7IH0gfVxuXHRcdFx0XHRcdGVsc2UgeyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy5CdWZmZXIuaXNCdWZmZXI/PSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuaW1wb3J0IHsgTk9OX1NDQUxBUiB9IGZyb20gJ0BsdGQvai11dGYnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgUm9vdCBmcm9tICcuL2xldmVsLWxvb3AnO1xuXG5jb25zdCBJU19OT05fU0NBTEFSID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKE5PTl9TQ0FMQVIpLnRlc3QgKSgpO1xuY29uc3QgQk9NID0gJ1xcdUZFRkYnO1xuY29uc3QgYnVmMnN0ciA9IChidWYgICAgICAgICkgPT4ge1xuXHRjb25zdCBzdHIgPSBidWYudG9TdHJpbmcoKTtcblx0aWYgKCAhZnJvbShzdHIpLmVxdWFscyhidWYpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVua25vd24gY29kZSBwb2ludC4nKTsgfVxuXHRyZXR1cm4gc3RyICYmIHN0clswXT09PUJPTSA/IHN0ci5zbGljZSgxKSA6IHN0cjtcbn07XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGl0ZXJhdG9yJDAuY291bGQoKTtcblx0bGV0IHNvdXJjZVBhdGggICAgICAgIDtcblx0aWYgKCBpc0J1ZmZlcihzb3VyY2UpICkge1xuXHRcdHNvdXJjZSA9IGJ1ZjJzdHIoc291cmNlKTtcblx0XHRzb3VyY2VQYXRoID0gJyc7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBzb3VyY2U9PT0nb2JqZWN0JyAmJiBzb3VyY2UgKSB7XG5cdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZS5wYXRoKScpOyB9XG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBzb3VyY2U7XG5cdFx0aWYgKCBkYXRhPT09dW5kZWZpbmVkICkgeyBzb3VyY2UgPSBidWYyc3RyKHJlYWRGaWxlU3luYyhzb3VyY2VQYXRoKSk7IH1cblx0XHRlbHNlIGlmICggaXNCdWZmZXIoZGF0YSkgKSB7IHNvdXJjZSA9IGJ1ZjJzdHIoZGF0YSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgc291cmNlID0gZGF0YTsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2Uoc291cmNlLmRhdGEpJyk7IH1cblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZT09PSdzdHJpbmcnICkgeyBzb3VyY2VQYXRoID0gJyc7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UpJyk7IH1cblx0dHJ5IHtcblx0XHRpZiAoIElTX05PTl9TQ0FMQVIoc291cmNlKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuJyk7IH1cblx0XHR0cnkge1xuXHRcdFx0b3B0aW9ucyQwLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRcdGl0ZXJhdG9yJDAudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgcm9vdFRhYmxlID0gUm9vdCgpO1xuXHRcdFx0XHRvcHRpb25zJDAucHJvY2VzcygpO1xuXHRcdFx0XHRyZXR1cm4gcm9vdFRhYmxlO1xuXHRcdFx0fVxuXHRcdFx0ZmluYWxseSB7XG5cdFx0XHRcdC8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdFx0XHRpdGVyYXRvciQwLmRvbmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZmluYWxseSB7IG9wdGlvbnMkMC5jbGVhcigpOyB9XG5cdH1cblx0ZmluYWxseSB7IGNsZWFyUmVnRXhwKCk7IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9hc3NpZ24oXG5cdChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiB0eXBlb2Ygc3BlY2lmaWNhdGlvblZlcnNpb249PT0nbnVtYmVyJ1xuXHRcdD8gcGFyc2Uoc291cmNlLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKVxuXHRcdDogcGFyc2Uoc291cmNlLCAxLjAsIHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgICAgKSxcblx0e1xuXHRcdCcxLjAnOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MS4wOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC41OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjUsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC40OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjQsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4zOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4yOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjIsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4xOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjEsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdH1cbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBzZXRfaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IHNldF9hZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IExJVEVSQUwgPSBuZXcgV2Vha1NldDtcblxuZXhwb3J0IGNvbnN0IGlzTGl0ZXJhbCA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoTElURVJBTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGJlTGl0ZXJhbCA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoTElURVJBTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAuLi5jaGFycyAgICAgICAgICApICAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCB0eXBlb2YgbGl0ZXJhbCE9PSdzdHJpbmcnICkge1xuXHRcdGxldCBpbmRleCA9IGNoYXJzLmxlbmd0aDtcblx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0Y29uc3QgeyByYXcgfSA9IGxpdGVyYWw7XG5cdFx0XHRsaXRlcmFsID0gcmF3W2luZGV4XSA7XG5cdFx0XHR3aGlsZSAoIGluZGV4ICkgeyBjaGFyc1stLWluZGV4XSArPSByYXdbaW5kZXhdIDsgfVxuXHRcdFx0bGl0ZXJhbCA9IGNoYXJzLmpvaW4oJycpICsgbGl0ZXJhbDtcblx0XHR9XG5cdFx0ZWxzZSB7IGxpdGVyYWwgPSBsaXRlcmFsLnJhd1swXSA7IH1cblx0fVxuXHRjb25zdCBsaW5lcyA9IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRiZUxpdGVyYWwobGluZXMpO1xuXHRyZXR1cm4gbGluZXM7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgYmVMaXRlcmFsIH0gZnJvbSAnLi9saXRlcmFsJztcblxuY29uc3QgRVNDQVBFRCA9IE51bGwgICAgICAgICh7XG5cdC4uLi8qI19fUFVSRV9fKi9mcm9tRW50cmllcygvKiNfX1BVUkVfXyovWyAuLi5BcnJheSgweDIwKSBdLm1hcCgoXywgY2hhckNvZGUpID0+IFsgZnJvbUNoYXJDb2RlKGNoYXJDb2RlKSwgJ1xcXFx1JyArIGNoYXJDb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnBhZFN0YXJ0KDQsICcwJykgXSkpLFxuXHQnXFxiJzogJ1xcXFxiJyxcblx0J1xcdCc6ICdcXFxcdCcsXG5cdCdcXG4nOiAnXFxcXG4nLFxuXHQnXFxmJzogJ1xcXFxmJyxcblx0J1xccic6ICdcXFxccicsXG5cdCdcIic6ICdcXFxcXCInLFxuXHQnXCJcIlwiJzogJ1wiXCJcXFxcXCInLFxuXHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdCdcXHg3Ric6ICdcXFxcdTAwN0YnLFxufSk7XG5cbmNvbnN0IE5FRURfQkFTSUMgPSAvKiNfX1BVUkVfXyovdGVzdC5iaW5kKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRidcXHg3Rl0vKTtcbmNvbnN0IEJZX0VTQ0FQRSA9IC9bXlxceDAwLVxceDA4XFx4MEEtXFx4MUZcIlxcXFxcXHg3Rl0rfC4vZ3M7XG5jb25zdCBORUVEX0VTQ0FQRSA9IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQoL15bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXS8pO1xuZXhwb3J0IGNvbnN0IHNpbmdsZWxpbmVTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBORUVEX0JBU0lDKHZhbHVlKSApIHtcblx0XHRjb25zdCBwYXJ0cyA9IHZhbHVlLm1hdGNoKEJZX0VTQ0FQRSkgO1xuXHRcdGxldCBpbmRleCA9IHBhcnRzLmxlbmd0aDtcblx0XHRkbyB7IGlmICggTkVFRF9FU0NBUEUocGFydHNbLS1pbmRleF0gKSApIHsgcGFydHNbaW5kZXhdID0gRVNDQVBFRFtwYXJ0c1tpbmRleF0gXSA7IH0gfVxuXHRcdHdoaWxlICggaW5kZXggKTtcblx0XHRyZXR1cm4gYFwiJHtwYXJ0cy5qb2luKCcnKX1cImA7XG5cdH1cblx0cmV0dXJuIGAnJHt2YWx1ZX0nYDtcbn07XG5cbmNvbnN0IE5FRURfTVVMVElMSU5FX0JBU0lDID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvW1xceDAwLVxceDA4XFx4MEEtXFx4MUZcXHg3Rl18JycnLyk7XG5jb25zdCBSRUFMX01VTFRJTElORV9FU0NBUEUgPSAvKiNfX1BVUkVfXyovdGVzdC5iaW5kKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiLyk7XG5jb25zdCBCWV9NVUxUSUxJTkVfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8XCJcIlwifC4vZ3M7XG5jb25zdCBORUVEX01VTFRJTElORV9FU0NBUEUgPSAvKiNfX1BVUkVfXyovdGVzdC5iaW5kKC9eKD86W1xceDAwLVxceDA4XFx4MEEtXFx4MUZcXFxcXFx4N0ZdfFwiXCJcIikvKTtcbmNvbnN0IGVzY2FwZV9tdWx0aWxpbmUgPSAobGluZXMgICAgICAgICAgLCBsaW5lSW5kZXggICAgICAgICkgPT4ge1xuXHRjb25zdCBsaW5lID0gbGluZXNbbGluZUluZGV4XSA7XG5cdGlmICggUkVBTF9NVUxUSUxJTkVfRVNDQVBFKGxpbmUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gbGluZS5tYXRjaChCWV9NVUxUSUxJTkVfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX01VTFRJTElORV9FU0NBUEUocGFydHNbLS1pbmRleF0gKSApIHsgcGFydHNbaW5kZXhdID0gRVNDQVBFRFtwYXJ0c1tpbmRleF0gXSA7IH0gfVxuXHRcdHdoaWxlICggaW5kZXggKTtcblx0XHRsaW5lc1tsaW5lSW5kZXhdID0gcGFydHMuam9pbignJyk7XG5cdH1cbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCBMaW5lcyA9IChsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGxpbmVzID0gWyAnJywgLi4ubGluZXMgXSAgICAgICAgIDtcblx0aWYgKCBsaW5lcy5sZW5ndGg9PT0xICkgeyAoIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVsxXSA9ICcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgIDtcbn07XG5cbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGxhc3RJbmRleCA9IGxpbmVzLmxlbmd0aCAtIDE7XG5cdGxldCBpbmRleCA9IGxhc3RJbmRleDtcblx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0JBU0lDKGxpbmVzW2luZGV4XSApICkgeyBicmVhazsgfSB9XG5cdHdoaWxlICggLS1pbmRleCApO1xuXHRpZiAoIGluZGV4ICkge1xuXHRcdGluZGV4ID0gbGFzdEluZGV4O1xuXHRcdGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTtcblx0XHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0XHR3aGlsZSAoIC0taW5kZXggKSB7IGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTsgfVxuXHR9XG5cdGVsc2V7IGxpbmVzW2xhc3RJbmRleF0gKz0gbGluZXNbMF0gPSAnXFwnXFwnXFwnJzsgfVxuXHRiZUxpdGVyYWwobGluZXMpO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn07XG5cbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVCYXNpY1N0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGxldCBpbmRleCA9IGxpbmVzLmxlbmd0aCAtIDE7XG5cdGVzY2FwZV9tdWx0aWxpbmUobGluZXMsIGluZGV4KTtcblx0bGluZXNbaW5kZXhdICs9IGxpbmVzWzBdID0gJ1wiXCJcIic7XG5cdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdGJlTGl0ZXJhbChsaW5lcyk7XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn07XG4iLCJpbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuXG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCBJTlRFR0VSX0xJS0UgPSAvKiNfX1BVUkVfXyovdGVzdC5iaW5kKC9eLT9cXGQrJC8pO1xuY29uc3QgZW5zdXJlRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBJTlRFR0VSX0xJS0UobGl0ZXJhbCkgPyBsaXRlcmFsICsgJy4wJyA6IGxpdGVyYWw7XG5cbmV4cG9ydCBjb25zdCBmbG9hdCA9ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHQ/IHZhbHVlPT09SW5maW5pdHkgPyAnaW5mJyA6IHZhbHVlPT09X0luZmluaXR5ID8gJy1pbmYnIDogZW5zdXJlRmxvYXQoJycgKyB2YWx1ZSlcblx0OiB2YWx1ZT09PXZhbHVlID8gaXModmFsdWUsIDApID8gJzAuMCcgOiAnLTAuMCcgOiAnbmFuJztcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgQm9vbGVhbiBmcm9tICcuQm9vbGVhbic7XG5pbXBvcnQgU3RyaW5nIGZyb20gJy5TdHJpbmcnO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcbmltcG9ydCBOdW1iZXIgZnJvbSAnLk51bWJlcic7XG5pbXBvcnQgU3ltYm9sXyBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IFRPTUxEYXRldGltZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBnZXRDb21tZW50IH0gZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCB7IGlzTGl0ZXJhbCB9IGZyb20gJy4vbGl0ZXJhbCc7XG5pbXBvcnQgeyBzaW5nbGVsaW5lU3RyaW5nIH0gZnJvbSAnLi9zdHJpbmcnO1xuaW1wb3J0IHsgZmxvYXQgfSBmcm9tICcuL2Zsb2F0JztcbmltcG9ydCB7IGlzU2VjdGlvbiwgb2ZJbmxpbmUgfSBmcm9tICcuL25vbi1hdG9tJztcblxuY29uc3QgQkFSRSA9IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQoL15bXFx3LV0rJC8pO1xuY29uc3QgJEtleSQgPSAoa2V5ICAgICAgICApICAgICAgICAgPT4gQkFSRShrZXkpID8ga2V5IDogc2luZ2xlbGluZVN0cmluZyhrZXkpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MU2VjdGlvbiBleHRlbmRzIEFycmF5ICAgICAgICAge1xuXHRcblx0ICAgICAgICAgICAgICAgICBkb2N1bWVudCAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKGRvY3VtZW50ICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgeyByZXR1cm4gdGhpcy5qb2luKHRoaXMuZG9jdW1lbnQubmV3bGluZSk7IH1cblx0XG5cdGFwcGVuZE5ld2xpbmUgKCkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9ICcnOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZExpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGhdID0gc291cmNlOyB9XG5cdCAgICAgICAgc2V0IGFwcGVuZElubGluZSAoc291cmNlICAgICAgICApIHsgdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZTsgfSAgIFxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmVJZiAoc291cmNlICAgICAgICApIHsgc291cmNlICYmICggdGhpc1t0aGlzLmxlbmd0aCAtIDFdICs9IHNvdXJjZSApOyB9Ly8vXG5cdFxuXHQqIGFzc2lnbkJsb2NrICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50S2V5c18gICAgICAgICAgICAgICAgICAgLCBzZWN0aW9uS2V5c18gICAgICAgICAgICAgICAgICAsIHRhYmxlICAgLCB0YWJsZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICB7XG5cdFx0Y29uc3QgeyBkb2N1bWVudCB9ID0gdGhpcztcblx0XHRjb25zdCB7IG5ld2xpbmVVbmRlckhlYWRlciwgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgfSA9IGRvY3VtZW50O1xuXHRcdGNvbnN0IG5ld2xpbmVBZnRlckRvdHRlZCA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgOiBmYWxzZTtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJQYWlyID0gc2VjdGlvbktleXNfID8gZG9jdW1lbnQubmV3bGluZVVuZGVyRG90dGVkIDogZG9jdW1lbnQubmV3bGluZVVuZGVyUGFpcjtcblx0XHRmb3IgKCBjb25zdCB0YWJsZUtleSBvZiB0YWJsZUtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSB0YWJsZVt0YWJsZUtleV0gO1xuXHRcdFx0Y29uc3QgJGtleSQgPSAkS2V5JCh0YWJsZUtleSk7XG5cdFx0XHRjb25zdCBkb2N1bWVudEtleXMgPSBkb2N1bWVudEtleXNfICsgJGtleSQ7XG5cdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCAmJiBpc1NlY3Rpb24odmFsdWVbMF0pICkge1xuXHRcdFx0XHRcdGNvbnN0IHRhYmxlSGVhZGVyID0gYFtbJHtkb2N1bWVudEtleXN9XV1gICAgICAgICAgO1xuXHRcdFx0XHRcdGNvbnN0IGRvY3VtZW50S2V5c18gPSBkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgO1xuXHRcdFx0XHRcdGZvciAoIGNvbnN0IHRhYmxlIG9mIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdFx0c2VjdGlvblswXSA9IHRhYmxlSGVhZGVyO1xuXHRcdFx0XHRcdFx0aWYgKCBuZXdsaW5lVW5kZXJIZWFkZXIgKSB7XG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0yICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzXywgYGAsIHRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHRhYmxlKSk7XG5cdFx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggaXNTZWN0aW9uKHZhbHVlKSApIHtcblx0XHRcdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuYXBwZW5kU2VjdGlvbigpO1xuXHRcdFx0XHRcdHNlY3Rpb25bMF0gPSBgWyR7ZG9jdW1lbnRLZXlzfV0ke2dldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KX1gO1xuXHRcdFx0XHRcdGlmICggbmV3bGluZVVuZGVySGVhZGVyICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvblsxXSA9ICcnO1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MiAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR5aWVsZCBzZWN0aW9uLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGBgLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0bmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZWN0aW9uS2V5cyA9IHNlY3Rpb25LZXlzXyArICRrZXkkO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gc2VjdGlvbktleXMgKyAnID0gJztcblx0XHRcdGNvbnN0IGtleXNJZkRvdHRlZCA9IHRoaXMudmFsdWUoJycsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKTtcblx0XHRcdGlmICgga2V5c0lmRG90dGVkICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR5aWVsZCB0aGlzLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHNlY3Rpb25LZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5c0lmRG90dGVkKTtcblx0XHRcdFx0bmV3bGluZUFmdGVyRG90dGVkICYmIHRoaXMuYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KHRhYmxlLCB0YWJsZUtleSk7XG5cdFx0XHRcdG5ld2xpbmVBZnRlclBhaXIgJiYgdGhpcy5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHQgICAgICAgIHZhbHVlIChpbmRlbnQgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgLCBnZXRPd25Qcm9wZXJ0eU5hbWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0aWYgKCB2YWx1ZT09PW51bGwgKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmRvY3VtZW50Lm51bGxEaXNhYmxlZCApIHsgdGhyb3cgVHlwZUVycm9yKGB0b21sIGNhbiBub3Qgc3RyaW5naWZ5IFwibnVsbFwiIHR5cGUgdmFsdWUgd2l0aG91dCB0cnV0aHkgb3B0aW9ucy54TnVsbGApOyB9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnbnVsbCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc0xpdGVyYWwodmFsdWUpICkge1xuXHRcdFx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHZhbHVlWzBdO1xuXHRcdFx0XHRcdGxldCBpbmRleCA9IDE7XG5cdFx0XHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHsgdGhpcy5hcHBlbmRMaW5lID0gdmFsdWVbaW5kZXgrK10gOyB9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW5saW5lTW9kZSA9IG9mSW5saW5lKHZhbHVlKTtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRpbmxpbmVNb2RlXG5cdFx0XHRcdFx0XHQ/IHRoaXMuc2luZ2xlbGluZUFycmF5KGluZGVudCwgdmFsdWUpXG5cdFx0XHRcdFx0XHQ6IHRoaXMuc3RhdGljQXJyYXkoaW5kZW50LCB2YWx1ZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpbmxpbmVNb2RlIT09dW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGlubGluZU1vZGUgfHwgdGhpcy5kb2N1bWVudC5tdWx0aWxpbmVUYWJsZURpc2FibGVkXG5cdFx0XHRcdFx0XHQ/IHRoaXMuaW5saW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgIClcblx0XHRcdFx0XHRcdDogdGhpcy5tdWx0aWxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlQ29tbWEpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBUT01MRGF0ZXRpbWUgKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSB0aGlzLmRvY3VtZW50Ll8gPyB2YWx1ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoJ1QnLCAnICcpIDogdmFsdWUudG9JU09TdHJpbmcoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBTdHJpbmddYCk7IH1cblx0XHRcdFx0aWYgKCBnZXRPd25Qcm9wZXJ0eU5hbWVzICkge1xuXHRcdFx0XHRcdGNvbnN0IGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XHRpZiAoIGtleXMubGVuZ3RoICkgeyByZXR1cm4ga2V5czsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSBpbnN0YW5jZW9mIEJpZ0ludCApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgQmlnSW50XWApOyB9XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlciApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgTnVtYmVyXWApOyB9XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSBpbnN0YW5jZW9mIEJvb2xlYW4gKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IEJvb2xlYW5dYCk7IH1cblx0XHRcdFx0XHRpZiAoIHZhbHVlIGluc3RhbmNlb2YgU3ltYm9sXyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgU3ltYm9sXWApOyB9XG5cdFx0XHRcdFx0dGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnYmlnaW50Jzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gZmxvYXQodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gc2luZ2xlbGluZVN0cmluZyh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIiR7dHlwZW9mIHZhbHVlfVwiIHR5cGUgdmFsdWVgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdCAgICAgICAgc2luZ2xlbGluZUFycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnWyAnO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5WzBdICk7XG5cdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnO1xuXHRcdFx0XHR0aGlzLnZhbHVlKGluZGVudCwgc3RhdGljQXJyYXlbaW5kZXgrK10gKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJyBdJztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJ1sgXSc7IH1cblx0fVxuXHQgICAgICAgIHN0YXRpY0FycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnWyc7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGZvciAoIGNvbnN0IGl0ZW0gb2Ygc3RhdGljQXJyYXkgKSB7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnRfLCBpdGVtKTtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywnO1xuXHRcdH1cblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnXSc7XG5cdH1cblx0XG5cdCAgICAgICAgaW5saW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSk7XG5cdFx0aWYgKCBrZXlzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgJztcblx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBrZXlzKTtcblx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLTIpICsgJyB9Jztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7IH1cblx0fVxuXHQgICAgICAgIG11bHRpbGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3snO1xuXHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKSwgY29tbWEpO1xuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICd9Jztcblx0fVxuXHQgICAgICAgIGFzc2lnbklubGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdGNvbnN0IGJlZm9yZV92YWx1ZSA9IHRoaXMuYXBwZW5kSW5saW5lID0ga2V5cyArICcgPSAnO1xuXHRcdFx0Y29uc3Qga2V5c0lmRG90dGVkID0gdGhpcy52YWx1ZShpbmRlbnQsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKTtcblx0XHRcdGlmICgga2V5c0lmRG90dGVkICkge1xuXHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC1iZWZvcmVfdmFsdWUubGVuZ3RoKTtcblx0XHRcdFx0dGhpcy5hc3NpZ25JbmxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGtleXNJZkRvdHRlZCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSAnLCAnOyB9XG5cdFx0fVxuXHR9XG5cdCAgICAgICAgYXNzaWduTXVsdGlsaW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICwga2V5c18gICAgICAgICAgICAgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICApIHtcblx0XHRjb25zdCBpbmRlbnRfID0gaW5kZW50ICsgdGhpcy5kb2N1bWVudC5pbmRlbnQ7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfICsga2V5cyArICcgPSAnO1xuXHRcdFx0Y29uc3Qga2V5c0lmRG90dGVkID0gdGhpcy52YWx1ZShpbmRlbnRfLCB2YWx1ZSwgZ2V0T3duUHJvcGVydHlOYW1lcyk7XG5cdFx0XHRpZiAoIGtleXNJZkRvdHRlZCApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIGtleXNJZkRvdHRlZCwgY29tbWEpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbW1hXG5cdFx0XHRcdFx0PyB0aGlzLmFwcGVuZElubGluZSA9ICcsJyArIGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSlcblx0XHRcdFx0XHQ6IHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IFRPTUxTZWN0aW9uIGZyb20gJy4vc2VjdGlvbic7XG5cbmNvbnN0IG5hbWUyY29kZSA9IE51bGwoe1xuXHRkb2N1bWVudDogMCxcblx0c2VjdGlvbjogMSxcblx0aGVhZGVyOiAyLFxuXHRwYWlyczogMyxcblx0cGFpcjogNCxcbn0gICAgICAgICApO1xuXG5jb25zdCBJU19JTkRFTlQgPSAvKiNfX1BVUkVfXyovdGVzdC5iaW5kKC9eW1xcdCBdKiQvKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTERvY3VtZW50IGV4dGVuZHMgQXJyYXkgICAgICAgICAgICAgIHtcblx0XG5cdCAgICAgICAgIGdldCBbJ2NvbnN0cnVjdG9yJ10gKCkgeyByZXR1cm4gQXJyYXk7IH1cblx0XG5cdDAgPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7XG5cdFxuXHQgICAgICAgICBuZXdsaW5lICAgICAgICAgICAgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclNlY3Rpb24gICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICAgICAgICAgO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJIZWFkZXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckRvdHRlZCAgICAgICAgIDtcblx0ICAgICAgICAgaW5kZW50ICAgICAgICA7XG5cdCAgICAgICAgIF8gICAgICAgICA7XG5cdCAgICAgICAgIG51bGxEaXNhYmxlZCAgICAgICAgIDtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVEaXNhYmxlZCAgICAgICAgIDtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVDb21tYSAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBuZXdsaW5lID0gb3B0aW9ucz8ubmV3bGluZTtcblx0XHRpZiAoIG5ld2xpbmU9PT11bmRlZmluZWQgfHwgbmV3bGluZT09PSdcXG4nIHx8IG5ld2xpbmU9PT0nXFxyXFxuJyApIHsgdGhpcy5uZXdsaW5lID0gbmV3bGluZSA/PyAnJzsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgdHlwZW9mIG5ld2xpbmU9PT0nc3RyaW5nJ1xuXHRcdFx0XHQ/IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSB2YWxpZCBUT01MIG5ld2xpbmVgKVxuXHRcdFx0XHQ6IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgc3RyaW5nYCk7XG5cdFx0fVxuXHRcdGNvbnN0IGFyb3VuZCA9IG5hbWUyY29kZVtvcHRpb25zPy5uZXdsaW5lQXJvdW5kID8/ICdoZWFkZXInXSA/PyBuYW1lMmNvZGUuaGVhZGVyO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0Y29uc3QgaW5kZW50ID0gb3B0aW9ucz8uaW5kZW50O1xuXHRcdGlmICggaW5kZW50PT09dW5kZWZpbmVkICkgeyB0aGlzLmluZGVudCA9ICdcXHQnOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nc3RyaW5nJyApIHtcblx0XHRcdGlmICggIUlTX0lOREVOVChpbmRlbnQpICkgeyB0aHJvdyBTeW50YXhFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gb25seSBpbmNsdWRlIFRhYiBvciBTcGFjZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9IGluZGVudDtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbmRlbnQ9PT0nbnVtYmVyJyApIHtcblx0XHRcdGlmICggIWlzU2FmZUludGVnZXIoaW5kZW50KSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnQ6JHtpbmRlbnR9fSkgaXMgb3V0IG9mIHJhbmdlYCk7IH1cblx0XHRcdHRoaXMuaW5kZW50ID0gJyAnLnJlcGVhdChpbmRlbnQpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2luZGVudH0pIGNhbiBub3QgYmUgXCIke3R5cGVvZiBpbmRlbnR9XCIgdHlwZWApOyB9XG5cdFx0dGhpcy5fID0gb3B0aW9ucz8uVD09PScgJztcblx0XHR0aGlzLm51bGxEaXNhYmxlZCA9ICFvcHRpb25zPy54TnVsbDtcblx0XHRjb25zdCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGUgPSBvcHRpb25zPy54QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU7XG5cdFx0aWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nJyApIHtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZUNvbW1hID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGU9PT0nLCcgKSB7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlRGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMubXVsdGlsaW5lVGFibGVDb21tYSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRhcHBlbmRTZWN0aW9uICgpIHsgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGhdID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpOyB9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IHsgeCB9IGZyb20gJy4uL2otbGV4ZXInOy8vL1xuXG5pbXBvcnQgVE9NTERvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCAocm9vdFRhYmxlICAgICAgICAgICAgICAgICwgb3B0aW9ucyAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZG9jdW1lbnQgPSBuZXcgVE9NTERvY3VtZW50KG9wdGlvbnMpO1xuXHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnRbMF07XG5cdHNlY3Rpb25bMF0gPSAnJztcblx0eCAgICAgIChzZWN0aW9uLmFzc2lnbkJsb2NrKGBgLCBgYCwgcm9vdFRhYmxlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHJvb3RUYWJsZSkpKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgJiYgc2VjdGlvbi5sZW5ndGghPT0xICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uIHx8IGRvY3VtZW50W2RvY3VtZW50Lmxlbmd0aCAtIDFdIC5hcHBlbmROZXdsaW5lKCk7XG5cdHJldHVybiBkb2N1bWVudC5uZXdsaW5lID8gZG9jdW1lbnQuam9pbihkb2N1bWVudC5uZXdsaW5lKSA6IGRvY3VtZW50LmZsYXQoKTtcbn07XG5cbmV4cG9ydCB7IGNvbW1lbnRGb3IgfSBmcm9tICcuL2NvbW1lbnQnO1xuZXhwb3J0IHsgbGl0ZXJhbCB9IGZyb20gJy4vbGl0ZXJhbCc7XG5leHBvcnQgeyBpbmxpbmUsIFNlY3Rpb24gfSBmcm9tICcuL25vbi1hdG9tJztcblxuaW1wb3J0IHsgTGluZXMsIG11bHRpbGluZVN0cmluZywgbXVsdGlsaW5lQmFzaWNTdHJpbmcgfSBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgeyBtdWx0aWxpbmVUYWJsZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgbXVsdGlsaW5lID0gKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PlxuXHRcdHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gbXVsdGlsaW5lU3RyaW5nKCggJ1xcbicgKyB2YWx1ZSApLnNwbGl0KCdcXG4nKSAgICAgICAgICkgOlxuXHRcdFx0aXNBcnJheSh2YWx1ZSkgPyBtdWx0aWxpbmVTdHJpbmcoTGluZXModmFsdWUpKSA6XG5cdFx0XHRcdG11bHRpbGluZVRhYmxlKHZhbHVlKTtcblx0bXVsdGlsaW5lLmJhc2ljID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT5cblx0XHRtdWx0aWxpbmVCYXNpY1N0cmluZyhcblx0XHRcdHR5cGVvZiBsaW5lcz09PSdzdHJpbmcnXG5cdFx0XHRcdD8gKCAnXFxuJyArIGxpbmVzICkuc3BsaXQoJ1xcbicpICAgICAgICAgXG5cdFx0XHRcdDogTGluZXMobGluZXMpXG5cdFx0KTtcblx0ZnJlZXplKG11bHRpbGluZSk7XG5cdHJldHVybiBtdWx0aWxpbmU7XG59ICkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5cbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5pbXBvcnQgc3RyaW5naWZ5LCB7IFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBsaXRlcmFsLCBjb21tZW50Rm9yIH0gZnJvbSAnLi9zdHJpbmdpZnkvJztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSB9IGZyb20gJy4vdHlwZXMvRGF0ZXRpbWUnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgbGl0ZXJhbCwgY29tbWVudEZvcixcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgbGl0ZXJhbCwgY29tbWVudEZvcixcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxufSk7XG4iXSwibmFtZXMiOlsiUHJveHkiLCJPYmplY3RfZnJlZXplIiwic2V0X2hhcyIsInNldF9hZGQiLCJpc0FycmF5IiwiTnVsbCIsIm9yZGVyaWZ5X051bGwiLCJpdGVyYXRvciQwLnRocm93cyIsIml0ZXJhdG9yJDAud2hlcmUiLCJnZXQiLCJzZXQiLCJjcmVhdGUiLCJpdGVyYXRvciQwLmRvbmUiLCJyZWdleHBzJDAuc3dpdGNoUmVnRXhwIiwidW5kZWZpbmVkIiwib3duS2V5cyIsImZyZWV6ZSIsInBhcnNlIiwib3B0aW9ucyQwLnplcm9EYXRldGltZSIsIm9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nIiwiaXRlcmF0b3IkMC5saW5lSW5kZXgiLCJvcHRpb25zJDAuYWxsb3dMb25nZXIiLCJvcHRpb25zJDAudXNpbmdCaWdJbnQiLCJvcHRpb25zJDAuSW50ZWdlck1pbiIsIm9wdGlvbnMkMC5JbnRlZ2VyTWF4Iiwib3B0aW9ucyQwLnNFcnJvciIsIm9wdGlvbnMkMC5UYWJsZSIsIm9wdGlvbnMkMC5jb2xsZWN0IiwicmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0IiwicmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMiLCJpdGVyYXRvciQwLm1hcmsiLCJpdGVyYXRvciQwLm11c3QiLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWNfMSIsInJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAiLCJyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSIsIlN5bWJvbCIsInJlZ2V4cHMkMC5fX0xJVEVSQUxfS0VZX2V4ZWMiLCJyZWdleHBzJDAuX19CQVJFX0tFWV9leGVjIiwicmVnZXhwcyQwLklTX0RPVF9LRVkiLCJyZWdleHBzJDAuRE9UX0tFWSIsIm9wdGlvbnMkMC5kaXNhbGxvd0VtcHR5S2V5IiwicmVnZXhwcyQwLl9WQUxVRV9QQUlSX2V4ZWMiLCJvcHRpb25zJDAuYXNTdHJpbmdzIiwib3B0aW9ucyQwLmlubGluZVRhYmxlIiwib3B0aW9ucyQwLmFzVGFibGVzIiwib3B0aW9ucyQwLmFzQXJyYXlzIiwicmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMkMC5zRmxvYXQiLCJvcHRpb25zJDAuYXNGbG9hdHMiLCJvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zJDAubW9yZURhdGV0aW1lIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMiLCJvcHRpb25zJDAuYXNMb2NhbFRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlcyIsIm9wdGlvbnMkMC5hc0Jvb2xlYW5zIiwib3B0aW9ucyQwLmVuYWJsZU51bGwiLCJvcHRpb25zJDAuYXNOdWxscyIsIm9wdGlvbnMkMC5hc0ludGVnZXJzIiwicmVnZXhwcyQwLlNZTV9XSElURVNQQUNFIiwib3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEiLCJvcHRpb25zJDAucHJlc2VydmVDb21tZW50IiwicmVnZXhwcyQwLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIiwiaXRlcmF0b3IkMC5yZXN0IiwiaXRlcmF0b3IkMC5uZXh0IiwicmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLmNvdWxkIiwib3B0aW9ucyQwLnVzZSIsIml0ZXJhdG9yJDAudG9kbyIsIm9wdGlvbnMkMC5wcm9jZXNzIiwib3B0aW9ucyQwLmNsZWFyIiwiYXNzaWduIiwiZnJvbUVudHJpZXMiLCJUT01MRGF0ZXRpbWUiLCJTeW1ib2xfIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQkFBYyxRQUFROzs7Ozs7Ozs7Ozs7O0FDSWYsSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDO0FBQ0osRUFBRSxDQUFDO0FBQ0g7QUFDTyxJQUFJLElBQUksNkNBQTZDLElBQUk7QUFDaEUsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRO0FBQ3RDLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDakIsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFO0FBQzNCLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUM7QUFDSixFQUFFLENBQUM7QUFDSDtBQUNlLFNBQVMsU0FBUyxFQUFFLEVBQUUsa0JBQWtCO0FBQ3ZELENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFD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LE1BQU0sVUFBVSxxQkFBcUIsVUFBVSxTQUFTLHFCQUFxQixRQUFRLDBCQUEwQixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3ZMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixVQUFVLFNBQVMscUJBQXFCLFFBQVEsMEJBQTBCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDckwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFVBQVUsU0FBUyxxQkFBcUIsUUFBUSwwQkFBMEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNyTCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsVUFBVSxTQUFTLHFCQUFxQixRQUFRLDBCQUEwQixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3JMLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxVQUFVLHFCQUFxQixVQUFVLFNBQVMscUJBQXFCLFFBQVEsMEJBQTBCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDckwsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLFVBQVUscUJBQXFCLFVBQVUsU0FBUyxxQkFBcUIsUUFBUSwwQkFBMEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUNyTCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sVUFBVSxxQkFBcUIsVUFBVSxTQUFTLHFCQUFxQixRQUFRLDBCQUEwQixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVB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