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

import Error from '.Error';
import TypeError from '.TypeError';
import Object_assign from '.Object.assign';
import isBuffer from '.Buffer.isBuffer?=';
import from from '.Buffer.from?';
import globalThis from '.globalThis';
import undefined$1 from '.undefined';
import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import RegExp_prototype from '.RegExp.prototype';
import WeakMap from '.WeakMap';
import get from '.WeakMap.prototype.get';
import set from '.WeakMap.prototype.set';
import RangeError from '.RangeError';
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
import Object_freeze from '.Object.freeze';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import Infinity from '.Infinity';
import NaN from '.NaN';
import NativeDate from '.Date';
import parse$2 from '.Date.parse';
import Object_is from '.Object.is';
import preventExtensions from '.Object.preventExtensions';
import BigInt from '.BigInt';
import isFinite from '.isFinite';
import parseInt from '.parseInt';
import fromCodePoint from '.String.fromCodePoint';
import Default from '.default';

const version = '1.15.0';

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

                                     
	                  
	                   
 
const throws                                = (error             )        => {
	//if ( sourceLines!==NONE ) { done(); options\$0.clear(); }
	throw error;
};

const previous = new WeakMap            ();
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
	if ( sourceLines!==NONE ) { throw Error('Internal error: parsing during parsing.'); }
};

const EOL = /\r?\n/;
const todo = (source        , path        )       => {
	if ( typeof path!=='string' ) { throw TypeError('TOML.parse(,,,,sourcePath)'); }
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
		Object_freeze(constructor.prototype);
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
	Object_freeze(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const tables = new WeakSet       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                  ;

const DIRECTLY = true;
const IMPLICITLY = false;
const implicitTables = new WeakSet       ();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_has = /*#__PURE__*/has.bind(implicitTables);
const wasDirectly = (table       )          => !implicitTables_has(table);
const directly = /*#__PURE__*/del.bind(implicitTables)                             ;

const INLINE = true;
const inlineTables = new WeakSet       ();
const inlineTables_add = /*#__PURE__*/add.bind(inlineTables);
const isInline = /*#__PURE__*/has.bind(inlineTables)                             ;

const PAIR = true;
const pairs = new WeakSet       ();
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
			_2[0]==='"' || throws(SyntaxError(`Bad basic string` + where(' at ')));
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
			_[0]==='"' || throws(SyntaxError(`Bad basic string key` + where(' at ')));
			_ = _.slice(1);
			keys += key + '"';
		}
		else {
			const key         = ( ( _.startsWith('\'') ? __LITERAL_KEY_exec : __BARE_KEY_exec )(_) ?? throws(SyntaxError(`Bad ${_.startsWith('\'') ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
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
		supportArrayOfTables || throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')));
		_ = _.slice(2);
	}
	else { _ = _.slice(1); }
	_ = _.replace(PRE_WHITESPACE, '');
	const keys         = getKeys(_);
	_ = _.slice(keys.length).replace(PRE_WHITESPACE, '');
	_[0]===']' || throws(SyntaxError(`Table header is not closed` + where(', which is found at ')));
	const $$asArrayItem$_          = _[1]===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( _[0]==='<' ) { ( { 1: tag, 2: _ } = TAG_REST_exec(_) ?? throws(SyntaxError(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	!_ || _[0]==='#' || throws(SyntaxError(`Unexpect charachtor after table header` + where(' at ')));
	return { $_asArrayItem$$, keys, $$asArrayItem$_, tag };
};

const KEY_VALUE_PAIR_exec_groups = (_        )                                               => {
	const left         = getKeys(_);
	const { 1: tag = '', 2: right } = KEY_VALUE_PAIR_exec(_.slice(left.length)) ?? throws(SyntaxError(`Keys must equal something` + where(', but missing at ')));
	tag || right && right[0]!=='#' || throws(SyntaxError(`Value can not be missing after euqal sign` + where(', which is found at ')));
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
		throws(Error(`TOML.parse(,,multiLineStringJoiner) must be passed, while the source including multi-line string` + where(', which is found at ')));
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
const arrayTypes = new WeakMap           ();
const arrayTypes_get = /*#__PURE__*/get.bind(arrayTypes)                                  ;
const arrayTypes_set = /*#__PURE__*/set.bind(arrayTypes)                                     ;
                                  
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
			throw RangeError('TOML.parse(,specificationVersion)');
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multiLineStringJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineStringJoiner; }
	else if ( multiLineStringJoiner===undefined$1 ) { useWhatToJoinMultiLineString = THROW_WHILE_MEETING_MULTI         ; }
	else { throw TypeError('TOML.parse(,,multiLineStringJoiner)'); }
	
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
		if ( !mixed ) { throw TypeError('TOML.parse(,,,,tag) needs at least TOML 1.0 to support mixed type array'); }
		processor = xOptions;
		collect = collect_on;
	}
	else {
		const { order, longer, exact, null: _null, multi, tag, ...unknown } = xOptions;
		if ( Reflect_ownKeys(unknown).length ) { throw TypeError('TOML.parse(,,,,xOptions)'); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !!longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultiLineAndTrailingCommaEvenNoComma = !!multi;
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
		for ( const key of Reflect_ownKeys(NativeDate.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(Object_create(NativeDate.prototype, descriptors));
	return Object_freeze(Datetime);
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
		else { this[OffsetDateTime_ISOString] = string + ( Object_is(value, 0) ? 'Z' : '-00:00' ); }
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
const LocalDate = Null$1(class LocalDate extends Datetime {
	
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
const LocalTime = Null$1(class LocalTime extends Datetime {
	
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

const INTEGER_D = /[-+]?(?:0|[1-9]\d*(?:_\d+)*)/;
const IS_D_INTEGER = /*#__PURE__*/( () => newRegExp`^${INTEGER_D}$`.test )();
const IS_XOB_INTEGER = /*#__PURE__*/( () => theRegExp(/^0(?:x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)$/).test )();
const UNDERSCORES_SIGN = /_|^[-+]/g;

const BigIntInteger = (literal        )         => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
	|| throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	let bigInt         = BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	if ( literal[0]==='-' ) { bigInt = -bigInt; }
	allowLonger
	|| -9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
	|| throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_D_INTEGER(literal)
	|| /*options\$0.xob && */IS_XOB_INTEGER(literal)
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
			isFinite(number) || throws(RangeError(`Float has been as big as inf, like ${literal}` + where(' at ')));
			number || IS_ZERO(literal) || throws(RangeError(`Float has been as little as ${literal[0]==='-' ? '-' : ''}0, like ${literal}` + where(' at ')));
		}
		return number;
	}
	//if ( options\$0.sFloat ) {
	//	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	//	if ( literal==='-inf' ) { return -Infinity; }
	//	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	//}
	throws(SyntaxError(`Invalid Float ${literal}` + where(' at ')));
};

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
	const codePoint         = parseInt(p2 ?? p3 , 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError(`Invalid Unicode Scalar ${p2 ? '\\u' + p2 : '\\U' + p3}` + where(' at ')));
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
	const codePoint         = parseInt(p3 ?? p4 , 16);
	( 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
	&& throws(RangeError(`Invalid Unicode Scalar ${p3 ? '\\u' + p3 : '\\U' + p4}` + where(' at ', lineIndex + n)));
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
		do { keys[--index] || throws(SyntaxError(`Empty key is not allowed before TOML v0.5` + where(', which at '))); }
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

const appendTable = (table       , key_key        , asArrayItem         , tag        )        => {
	const leadingKeys           = parseKeys(key_key);
	const finalKey         = leadingKeys[leadingKeys.length - 1] ;
	--leadingKeys.length;
	table = prepareTable(table, leadingKeys);
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
			wasDirectly(lastTable) && throws(Error(`Duplicate Table definition` + where(' at ')));
			directly(lastTable);
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
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		length += 3;
		table[finalKey] = BasicString($) + ( endsWithQuote ? literal[length]==='"' ? literal[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
		return literal.slice(length).replace(PRE_WHITESPACE, '');
	}
	let skipped = true;
	if ( literal ) {
		literal += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		skipped = false;
	}
	const start = mark('Basic String');
	for ( ; ; ) {
		let line         = must(start);
		const $ = MULTI_LINE_BASIC_STRING_exec_0(line);
		let { length } = $;
		if ( line.startsWith('"""', length) ) {
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			length += 3;
			table[finalKey] = MultiLineBasicString(literal + $, skipped) + ( endsWithQuote ? line[length]==='"' ? line[++length]==='"' ? ( ++length, '""' ) : '"' : '' : '' );
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		line += '\n';
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		literal += line;
	}
} )     
	                                                           
	                                                          
 ;

const IS_OFFSET$ = /*#__PURE__*/( () => theRegExp(OFFSET$).test )();

const push = (lastArray       , lineRest        )         => {
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
			stacks_push(lineRest => equalInlineTable(asTables(lastArray), lastArray.length, lineRest));
			return lineRest;
		case '[':
			stacks_push(lineRest => equalStaticArray(asArrays(lastArray), lastArray.length, lineRest));
			return lineRest;
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
						throws(SyntaxError(`Unexpect character after static array item value` + where(', which is found at ')));//
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
				throws(SyntaxError(`Unexpect character in static array item value` + where(', which is found at ')));
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
		lineRest && lineRest[0]!=='#' || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
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
							lineRest[0]==='}' && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));//
						}//
						( !lineRest || lineRest[0]==='#' ) && throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				if ( lineRest[0]==='}' ) { return lineRest.replace(SYM_WHITESPACE, ''); }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '');
					lineRest[0]==='}' && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));
				}
				( !lineRest || lineRest[0]==='#' ) && throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
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
			stacks_push((lineRest        )         => equalInlineTable(table, finalKey, lineRest));
			return lineRest;
		case '[':
			stacks_push((lineRest        )         => equalStaticArray(table, finalKey, lineRest));
			return lineRest;
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
				const { $_asArrayItem$$, keys, $$asArrayItem$_, tag } = TABLE_DEFINITION_exec_groups(line);
				$_asArrayItem$$===$$asArrayItem$_ || throws(SyntaxError(`Square brackets of Table definition statement not match` + where(' at ')));
				lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, tag);
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				let rest         = assign(lastSectionTable, line);
				while ( stacks_length ) { rest = stacks_pop()(rest); }
				rest && rest[0]!=='#' && throws(SyntaxError(`Unexpect charachtor after key/value pair` + where(' at ')));
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
		if ( typeof sourcePath!=='string' ) { throw TypeError('TOML.parse(source.path)'); }
		const { data } = source;
		if ( data===undefined$1 ) { source = buf2str(( globalThis.require('fs')                        ).readFileSync(sourcePath)); }
		else if ( isBuffer(data) ) { source = buf2str(data); }
		else if ( typeof data==='string' ) { source = data; }
		else { throw TypeError('TOML.parse(source.data)'); }
	}
	else if ( typeof source==='string' ) { sourcePath = ''; }
	else { throw TypeError('TOML.parse(source)'); }
	try {
		if ( IS_NON_SCALAR(source) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
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

const parse$1 = /*#__PURE__*/Object_assign(
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai11dGYvc3JjL05PTl9TQ0FMQVIudHMiLCIuLi8uLi9qLXV0Zi9zcmMvc3RyaW5nMmFycmF5LnRzIiwiaXRlcmF0b3IkMC50cyIsIi4uLy4uL2otb3JkZXJpZnkvc3JjL2V4cG9ydC50cyIsInR5cGVzL1RhYmxlLnRzIiwicmVnZXhwcyQwLnRzIiwib3B0aW9ucyQwLnRzIiwidHlwZXMvQXJyYXkudHMiLCJ0eXBlcy9EYXRldGltZS50cyIsInR5cGVzL0ludGVnZXIudHMiLCJ0eXBlcy9GbG9hdC50cyIsInR5cGVzL1N0cmluZy50cyIsInBhcnNlL29uLXRoZS1zcG90LnRzIiwicGFyc2UvbGV2ZWwtbG9vcC50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjE1LjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IGluY2x1ZGVzKHNvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyhzb3VyY2UsICckJykgPyBNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/IFMgOiBudWxsO1xuXHRyZXR1cm4gcmU7XG59XG5cbnZhciBSRV9iaW5kID0gYmluZCAmJiAvKiNfX1BVUkVfXyovYmluZC5iaW5kKFJFICAgICAgICk7XG5cbmZ1bmN0aW9uIENvbnRleHQgKGZsYWdzICAgICAgICApICAgICAgICAgIHtcblx0cmV0dXJuIHtcblx0XHRVOiAhaW5jbHVkZXMoZmxhZ3MsICd1JyksXG5cdFx0STogIWluY2x1ZGVzKGZsYWdzLCAnaScpLFxuXHRcdE06ICFpbmNsdWRlcyhmbGFncywgJ20nKSxcblx0XHRTOiAhaW5jbHVkZXMoZmxhZ3MsICdzJyksXG5cdFx0ZmxhZ3M6IGZsYWdzXG5cdH07XG59XG5cbnZhciBDT05URVhUICAgICAgICAgID0gLyojX19QVVJFX18qL0NvbnRleHQoJycpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm94eVxuXHQ/IC8qI19fUFVSRV9fKi9uZXcgUHJveHkoUkUsIHtcblx0XHRhcHBseTogZnVuY3Rpb24gKFJFLCB0aGlzQXJnLCBhcmdzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KFJFLCBDT05URVhULCBhcmdzKTsgfVxuXHRcdCxcblx0XHRnZXQ6IGZ1bmN0aW9uIChSRSwgZmxhZ3MgICAgICAgICkgeyByZXR1cm4gUkVfYmluZChDb250ZXh0KGZsYWdzKSk7IH1cblx0XHQsXG5cdFx0ZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0LFxuXHRcdHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9KVxuXHQ6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0UkUuYXBwbHkgPSBSRS5hcHBseTtcblx0XHR2YXIgbmV3UmVnRXhwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoQ09OVEVYVCwgYXJndW1lbnRzICAgICAgICk7IH0gICAgICAgO1xuXHRcdGZvciAoIHZhciBmbGFncyA9IDYzOyBmbGFncy0tOyApIHtcblx0XHRcdCggZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdFx0bmV3UmVnRXhwW2NvbnRleHQuZmxhZ3NdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzICAgICAgICk7IH07XG5cdFx0XHR9ICkoQ29udGV4dChcblx0XHRcdFx0KCBmbGFncyAmIDMyID8gJycgOiAnZycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAxNiA/ICcnIDogJ2knICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDggPyAnJyA6ICdtJyApICtcblx0XHRcdFx0KCBmbGFncyAmICA0ID8gJycgOiAncycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMiA/ICcnIDogJ3UnICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDEgPyAnJyA6ICd5JyApXG5cdFx0XHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZyZWV6ZSA/IGZyZWV6ZShuZXdSZWdFeHApIDogbmV3UmVnRXhwO1xuXHR9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRSRUdFWFAudGVzdCA9IFJFR0VYUC50ZXN0O1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBSZWdFeHBfcHJvdG90eXBlIGZyb20gJy5SZWdFeHAucHJvdG90eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgKFxuXHQndW5pY29kZScgaW4gUmVnRXhwX3Byb3RvdHlwZVxuXHRcdD8gUmVnRXhwKCdbXFxcXHVEODAwLVxcXFx1REZGRl0nLCAndScpXG5cdFx0OiAvW1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vXG4pO1xuXG4vLyBcXHV7MTEwMDAwfS1cXHV7RkZGRkZGRkZ9IC0+IFxcdUZGRkRcbiIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgUmVnRXhwX3Byb3RvdHlwZSBmcm9tICcuUmVnRXhwLnByb3RvdHlwZSc7XG5cbnZhciBQT0lOVFMgPVxuXHQnZG90QWxsJyBpbiBSZWdFeHBfcHJvdG90eXBlICYmICd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlID8gUmVnRXhwKCcuJywgJ2dzdScpIDpcblx0XHQnYmluZCcgaW4gUmVnRXhwID8gUmVnRXhwKCdbXFxcXHVEODAwLVxcXFx1REJGRl1bXFxcXHVEQzAwLVxcXFx1REZGRl18W15dLycsICdnJykgOlxuXHRcdFx0L1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcc1xcU10vZztcblxudmFyIFBPSU5UU19DUkxGID1cblx0J2RvdEFsbCcgaW4gUmVnRXhwX3Byb3RvdHlwZSAmJiAndW5pY29kZScgaW4gUmVnRXhwX3Byb3RvdHlwZSA/IFJlZ0V4cCgnXFxcXHJcXFxcbnwuJywgJ2dzdScpIDpcblx0XHQnYmluZCcgaW4gUmVnRXhwID8gUmVnRXhwKCdcXFxcclxcXFxufFtcXFxcdUQ4MDAtXFxcXHVEQkZGXVtcXFxcdURDMDAtXFxcXHVERkZGXXxbXl0vJywgJ2cnKSA6XG5cdFx0XHQvXFxyXFxufFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcc1xcU10vZztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5nMmFycmF5IChzdHJpbmcgICAgICAgICwgY3JsZiAgICAgICAgICApICAgICAgICAgICB7XG5cdHJldHVybiBzdHJpbmcgPyBzdHJpbmcubWF0Y2goY3JsZiA/IFBPSU5UU19DUkxGIDogUE9JTlRTKSAgOiBbXTtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBnZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmdldCc7XG5pbXBvcnQgc2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5zZXQnO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnNcXCQwIGZyb20gJy4vb3B0aW9uc1xcJDAnO1xuXG5jb25zdCBOT05FICAgICAgICAgICAgICAgICAgICA9IFtdO1xubGV0IHNvdXJjZVBhdGggICAgICAgICA9ICcnO1xubGV0IHNvdXJjZUxpbmVzICAgICAgICAgICAgICAgICAgICA9IE5PTkU7XG5sZXQgbGFzdExpbmVJbmRleCAgICAgICAgID0gLTE7XG5leHBvcnQgbGV0IGxpbmVJbmRleCAgICAgICAgID0gLTE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcbmV4cG9ydCBjb25zdCB0aHJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gKGVycm9yICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zXFwkMC5jbGVhcigpOyB9XG5cdHRocm93IGVycm9yO1xufTtcblxuY29uc3QgcHJldmlvdXMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICgpO1xuY29uc3QgcHJldmlvdXNfZ2V0ID0gLyojX19QVVJFX18qL2dldC5iaW5kKHByZXZpb3VzKSAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgcHJldmlvdXNfc2V0ID0gLyojX19QVVJFX18qL3NldC5iaW5kKHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBub29wICAgICAgID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBub29wICAgICAgID0gKCkgICAgICAgICA9PiAnJztcblx0cHJldmlvdXNfc2V0KG5vb3AsIG5vb3ApO1xuXHRyZXR1cm4gbm9vcDtcbn0gKSgpO1xuXG5leHBvcnQgbGV0IHN0YWNrc19sZW5ndGggPSAwO1xubGV0IGxhc3QgICAgICAgPSBub29wO1xuXG5leHBvcnQgY29uc3QgY291bGQgPSAoKSAgICAgICA9PiB7XG5cdGlmICggc291cmNlTGluZXMhPT1OT05FICkgeyB0aHJvdyBFcnJvcignSW50ZXJuYWwgZXJyb3I6IHBhcnNpbmcgZHVyaW5nIHBhcnNpbmcuJyk7IH1cbn07XG5cbmNvbnN0IEVPTCA9IC9cXHI/XFxuLztcbmV4cG9ydCBjb25zdCB0b2RvID0gKHNvdXJjZSAgICAgICAgLCBwYXRoICAgICAgICApICAgICAgID0+IHtcblx0aWYgKCB0eXBlb2YgcGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHNvdXJjZVBhdGgpJyk7IH1cblx0c291cmNlUGF0aCA9IHBhdGg7XG5cdHNvdXJjZUxpbmVzID0gc291cmNlLnNwbGl0KEVPTCk7XG5cdGxhc3RMaW5lSW5kZXggPSBzb3VyY2VMaW5lcy5sZW5ndGggLSAxO1xuXHRsaW5lSW5kZXggPSAtMTtcblx0c3RhY2tzX2xlbmd0aCA9IDA7XG5cdGxhc3QgPSBub29wO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHQgPSAoKSAgICAgICAgID0+IHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG5cbmV4cG9ydCBjb25zdCByZXN0ID0gKCkgICAgICAgICAgPT4gbGluZUluZGV4IT09bGFzdExpbmVJbmRleDtcblxuZXhwb3J0IGNvbnN0IG1hcmsgPSAodHlwZSAgICAgICAgKSA9PiAoIHsgdHlwZSwgbGluZUluZGV4IH0gKTtcblxuZXhwb3J0IGNvbnN0IG11c3QgPSAobWFya2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdGxpbmVJbmRleD09PWxhc3RMaW5lSW5kZXggJiYgdGhyb3dzKFN5bnRheEVycm9yKGAke21hcmtlci50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgbWFya2VyLmxpbmVJbmRleCkpKTtcblx0cmV0dXJuIHNvdXJjZUxpbmVzWysrbGluZUluZGV4XSA7XG59O1xuXG5leHBvcnQgY29uc3Qgd2hlcmUgPSAocHJlICAgICAgICAsIGluZGV4ICAgICAgICAgPSBsaW5lSW5kZXgpICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7aW5kZXggKyAxfToxKWBcblx0XHQ6IGAke3ByZX1saW5lICR7aW5kZXggKyAxfTogJHtzb3VyY2VMaW5lc1tpbmRleF19YDtcblxuZXhwb3J0IGNvbnN0IGRvbmUgPSAoKSAgICAgICA9PiB7XG5cdHNvdXJjZVBhdGggPSAnJztcblx0c291cmNlTGluZXMgPSBOT05FO1xuXHRsYXN0ID0gbm9vcDtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFja3NfcG9wID0gKCkgICAgICAgPT4ge1xuXHRjb25zdCBpdGVtICAgICAgID0gbGFzdDtcblx0bGFzdCA9IHByZXZpb3VzX2dldChsYXN0KTtcblx0LS1zdGFja3NfbGVuZ3RoO1xuXHRyZXR1cm4gaXRlbTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFja3NfcHVzaCA9IChpdGVtICAgICAgKSAgICAgICA9PiB7XG5cdHByZXZpb3VzX3NldChpdGVtLCBsYXN0KTtcblx0bGFzdCA9IGl0ZW07XG5cdCsrc3RhY2tzX2xlbmd0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFja3NfaW5zZXJ0QmVmb3JlTGFzdCA9IChpdGVtICAgICAgKSAgICAgICA9PiB7XG5cdHByZXZpb3VzX3NldChpdGVtLCBwcmV2aW91c19nZXQobGFzdCkpO1xuXHRwcmV2aW91c19zZXQobGFzdCwgaXRlbSk7XG5cdCsrc3RhY2tzX2xlbmd0aDtcbn07XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd25Qcm9wZXJ0eSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBoYXNPd25Qcm9wZXJ0eV9jYWxsID0gLyojX19QVVJFX18qL2hhc093blByb3BlcnR5LmNhbGwuYmluZChoYXNPd25Qcm9wZXJ0eSk7XG5cbmNvbnN0IG5ld1dlYWtNYXAgPSAoKSA9PiB7XG5cdGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcDtcblx0d2Vha01hcC5oYXMgPSB3ZWFrTWFwLmhhcztcblx0d2Vha01hcC5nZXQgPSB3ZWFrTWFwLmdldDtcblx0d2Vha01hcC5zZXQgPSB3ZWFrTWFwLnNldDtcblx0cmV0dXJuIHdlYWtNYXA7XG59O1xuY29uc3QgdGFyZ2V0MmtlZXBlciA9IC8qI19fUFVSRV9fKi9uZXdXZWFrTWFwKCkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCBwcm94eTJ0YXJnZXQgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCB0YXJnZXQycHJveHkgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBFeHRlcm5hbERlc2NyaXB0b3IgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNvdXJjZSAgICkgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICA7XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ2NvbmZpZ3VyYWJsZScpICkgeyB0YXJnZXQuY29uZmlndXJhYmxlID0gc291cmNlLmNvbmZpZ3VyYWJsZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAndmFsdWUnKSApIHsgdGFyZ2V0LnZhbHVlID0gc291cmNlLnZhbHVlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ2dldCcpICkgeyB0YXJnZXQuZ2V0ID0gc291cmNlLmdldDsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnc2V0JykgKSB7IHRhcmdldC5zZXQgPSBzb3VyY2Uuc2V0OyB9XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBoYW5kbGVycyAgICAgICAgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7XG5cdGRlZmluZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICwgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuY29uc3QgdGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCB0YWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHRhYmxlcyk7XG5leHBvcnQgY29uc3QgaXNUYWJsZSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZCh0YWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IERJUkVDVExZID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBJTVBMSUNJVExZID0gZmFsc2U7XG5jb25zdCBpbXBsaWNpdFRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGltcGxpY2l0VGFibGVzKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2hhcyA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChpbXBsaWNpdFRhYmxlcyk7XG5leHBvcnQgY29uc3Qgd2FzRGlyZWN0bHkgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiAhaW1wbGljaXRUYWJsZXNfaGFzKHRhYmxlKTtcbmV4cG9ydCBjb25zdCBkaXJlY3RseSA9IC8qI19fUFVSRV9fKi9kZWwuYmluZChpbXBsaWNpdFRhYmxlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5jb25zdCBpbmxpbmVUYWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGlubGluZVRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW5saW5lVGFibGVzKTtcbmV4cG9ydCBjb25zdCBpc0lubGluZSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChpbmxpbmVUYWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBQQUlSID0gdHJ1ZTtcbmNvbnN0IHBhaXJzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBwYWlyc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQocGFpcnMpO1xuZXhwb3J0IGNvbnN0IGZyb21QYWlyID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHBhaXJzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgUGxhaW5UYWJsZSA9IE51bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUgJiYgaW5saW5lVGFibGVzX2FkZCh0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gTnVsbChjbGFzcyBUYWJsZSBleHRlbmRzIG9yZGVyaWZ5X051bGwgICAgICB7XG5cdGNvbnN0cnVjdG9yIChpc0RpcmVjdCAgICAgICAgICAsIGlzSW5saW5lICAgICAgICAgICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGFibGVzX2FkZCh0aGlzKTtcblx0XHRpc0RpcmVjdFxuXHRcdFx0PyBpc0lubGluZSAmJiBpbmxpbmVUYWJsZXNfYWRkKHRoaXMpXG5cdFx0XHQ6ICggaXNJbmxpbmUgPyBwYWlyc19hZGQgOiBpbXBsaWNpdFRhYmxlc19hZGQgKSh0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi9pdGVyYXRvciQwJztcblxuLyogbmVzdGVkIChyZWFkYWJsZSkgKi9cblxuY29uc3QgV2hpdGVzcGFjZSA9IC9bIFxcdF0vO1xuXG5leHBvcnQgY29uc3QgUFJFX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AgKSgpO1xuXG5leHBvcnQgY29uc3QgVkFMVUVfUkVTVF9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdChcblx0XHQoPzpcXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCBcXGQpP1xuXHRcdFtcXHdcXC0rLjpdK1xuXHQpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbmV4cG9ydCBjb25zdCBMSVRFUkFMX1NUUklOR19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdCcoW14nXSopJ1xuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcblxuY29uc3QgTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMiA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKCd7MCwyfSlcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5jb25zdCBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzAgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygpXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zYFxuXHReXG5cdC5cblx0JHtXaGl0ZXNwYWNlfSpgICkoKTtcblxuXG5leHBvcnQgY29uc3QgVGFnID0gL1teXFx4MDAtXFx4MUZcIiMnKCk8PltcXFxcXFxdYHt9XFx4N0ZdKy87XG5cbmNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5leHBvcnQgY29uc3QgX1ZBTFVFX1BBSVJfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAuZXhlYyApKCk7XG5cbmNvbnN0IFRBR19SRVNUX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG4vKiBvcHRpbWl6ZWQgKGF2b2lkIG92ZXJmbG93IG9yIGxvc3QpICovXG5cbmNvbnN0IE1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14oPzpbXlxcXFxcIl0rfFxcXFwufFwiXCI/KD8hXCIpKS9zKS5leGVjICkoKTtcbmV4cG9ydCBjb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAgPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IF8wICAgICAgICAgPSAnJztcblx0d2hpbGUgKCBfICkge1xuXHRcdGNvbnN0ICQgPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IGJyZWFrOyB9XG5cdFx0XzAgKz0gJFswXTtcblx0XHRfID0gXy5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdH1cblx0cmV0dXJuIF8wO1xufTtcblxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX1RBQl9fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbIFxcdF0qXFxuWyBcXHRcXG5dKnx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX19fX19fX19fXyA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfCAqXFxuWyBcXG5dKnx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS9nO1xuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfCAqXFxuWyBcXG5dKnx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS9nO1xubGV0IF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSICAgICAgICA7XG5leHBvcnQgY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QgPSAoXyAgICAgICAgKSAgICAgICAgICA9PiAhXy5yZXBsYWNlKF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSLCAnJyk7XG5cbmNvbnN0IEJBU0lDX1NUUklOR19UQUJfX19fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14oPzpbXlxcXFxcIlxceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX19fX19fX19fXyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkpLykuZXhlYyApKCk7XG5jb25zdCBCQVNJQ19TVFJJTkdfREVMX19fX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkpLykuZXhlYyApKCk7XG5jb25zdCBCQVNJQ19TVFJJTkdfREVMX1NMQVNIID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xubGV0IF9fQkFTSUNfU1RSSU5HX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IEJBU0lDX1NUUklOR19leGVjID0gKF8yICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRfMiA9IF8yLnNsaWNlKDEpO1xuXHRmb3IgKCBsZXQgXzEgICAgICAgICA9ICcnOyA7ICkge1xuXHRcdGNvbnN0ICQgPSBfX0JBU0lDX1NUUklOR19leGVjKF8yKTtcblx0XHRpZiAoICEkICkge1xuXHRcdFx0XzJbMF09PT0nXCInIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIHsgMTogXzEsIDI6IF8yLnJlcGxhY2UoU1lNX1dISVRFU1BBQ0UsICcnKSB9O1xuXHRcdH1cblx0XHRfMSArPSAkWzBdO1xuXHRcdF8yID0gXzIuc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG59O1xuXG5jb25zdCBET1RfS0VZX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bIFxcdF0qXFwuWyBcXHRdKi8pLmV4ZWMgKSgpO1xuY29uc3QgQkFSRV9LRVlfU1RSSUNUID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eW1xcdy1dKy8pLmV4ZWMgKSgpO1xuY29uc3QgQkFSRV9LRVlfRlJFRSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXlteIFxcdCM9W1xcXSdcIi5dKyg/OlsgXFx0XStbXiBcXHQjPVtcXF0nXCIuXSspKi8pLmV4ZWMgKSgpO1xubGV0IF9fQkFSRV9LRVlfZXhlYyAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBMSVRFUkFMX0tFWV9fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSonLykuZXhlYyApKCk7XG5jb25zdCBMSVRFUkFMX0tFWV9ERUwgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14nW14nXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0qJy8pLmV4ZWMgKSgpO1xubGV0IF9fTElURVJBTF9LRVlfZXhlYyAgICAgICAgICAgICAgICAgICAgICAgIDtcbmxldCBzdXBwb3J0QXJyYXlPZlRhYmxlcyAgICAgICAgIDtcblxuY29uc3QgZ2V0S2V5cyA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQga2V5cyAgICAgICAgID0gJyc7XG5cdGZvciAoIDsgOyApIHtcblx0XHRpZiAoIF9bMF09PT0nXCInICkge1xuXHRcdFx0XyA9IF8uc2xpY2UoMSk7XG5cdFx0XHRsZXQga2V5ICAgICAgICAgPSAnXCInO1xuXHRcdFx0bGV0ICQgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcdFx0d2hpbGUgKCAoICQgPSBfX0JBU0lDX1NUUklOR19leGVjKF8pICkgKSB7XG5cdFx0XHRcdF8gPSBfLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0XHRcdFx0a2V5ICs9ICRbMF07XG5cdFx0XHR9XG5cdFx0XHRfWzBdPT09J1wiJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZyBrZXlgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRfID0gXy5zbGljZSgxKTtcblx0XHRcdGtleXMgKz0ga2V5ICsgJ1wiJztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBrZXkgICAgICAgICA9ICggKCBfLnN0YXJ0c1dpdGgoJ1xcJycpID8gX19MSVRFUkFMX0tFWV9leGVjIDogX19CQVJFX0tFWV9leGVjICkoXykgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCAke18uc3RhcnRzV2l0aCgnXFwnJykgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSkgKVswXTtcblx0XHRcdF8gPSBfLnNsaWNlKGtleS5sZW5ndGgpO1xuXHRcdFx0a2V5cyArPSBrZXk7XG5cdFx0fVxuXHRcdGNvbnN0ICQgPSBET1RfS0VZX2V4ZWMoXyk7XG5cdFx0aWYgKCAhJCApIHsgcmV0dXJuIGtleXM7IH1cblx0XHRfID0gXy5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdFx0a2V5cyArPSAkWzBdO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChfICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCAkX2FzQXJyYXlJdGVtJCQgICAgICAgICAgPSBfWzFdPT09J1snO1xuXHRpZiAoICRfYXNBcnJheUl0ZW0kJCApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQXJyYXkgb2YgVGFibGVzIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjJgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdF8gPSBfLnNsaWNlKDIpO1xuXHR9XG5cdGVsc2UgeyBfID0gXy5zbGljZSgxKTsgfVxuXHRfID0gXy5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGNvbnN0IGtleXMgICAgICAgICA9IGdldEtleXMoXyk7XG5cdF8gPSBfLnNsaWNlKGtleXMubGVuZ3RoKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdF9bMF09PT0nXScgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0Y29uc3QgJCRhc0FycmF5SXRlbSRfICAgICAgICAgID0gX1sxXT09PSddJztcblx0XyA9IF8uc2xpY2UoJCRhc0FycmF5SXRlbSRfID8gMiA6IDEpLnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0bGV0IHRhZyAgICAgICAgO1xuXHRpZiAoIF9bMF09PT0nPCcgKSB7ICggeyAxOiB0YWcsIDI6IF8gfSA9IFRBR19SRVNUX2V4ZWMoXykgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0IV8gfHwgX1swXT09PScjJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjaHRvciBhZnRlciB0YWJsZSBoZWFkZXJgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiB7ICRfYXNBcnJheUl0ZW0kJCwga2V5cywgJCRhc0FycmF5SXRlbSRfLCB0YWcgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyA9IChfICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGxlZnQgICAgICAgICA9IGdldEtleXMoXyk7XG5cdGNvbnN0IHsgMTogdGFnID0gJycsIDI6IHJpZ2h0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKF8uc2xpY2UobGVmdC5sZW5ndGgpKSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgS2V5cyBtdXN0IGVxdWFsIHNvbWV0aGluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIGJ1dCBtaXNzaW5nIGF0ICcpKSk7XG5cdHRhZyB8fCByaWdodCAmJiByaWdodFswXSE9PScjJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4geyBsZWZ0LCB0YWcsIHJpZ2h0IH07XG59O1xuXG5jb25zdCBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdLykudGVzdCApKCk7XG5jb25zdCBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBCLVxceDFGXS8pLnRlc3QgKSgpO1xuZXhwb3J0XG5sZXQgX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IEtFWVNfU1RSSUNUID0gL1tcXHctXSt8XCIoPzpbXlxcXFxcIl0rfFxcXFwuKSpcInwnW14nXSonL2dzO1xuY29uc3QgS0VZU19GUkVFID0gL1teIFxcdCM9W1xcXSdcIi5dKyg/OlsgXFx0XStbXiBcXHQjPVtcXF0nXCIuXSspKnxcIig/OlteXFxcXFwiXSt8XFxcXC4pKlwifCdbXiddKicvZ3M7XG5leHBvcnRcbmxldCBfX0tFWVMgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX1RBQl9fX19fXztcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX1NUUklDVDtcblx0XHRcdF9fS0VZUyA9IEtFWVNfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjU6XG5cdFx0XHRfX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyA9IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMDtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfX19fX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkdfZXhlYyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HX2V4ZWMgPSBCQVNJQ19TVFJJTkdfREVMX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HX2V4ZWMgPSBCQVNJQ19TVFJJTkdfREVMX1NMQVNIO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfRlJFRTtcblx0XHRcdF9fS0VZUyA9IEtFWVNfRlJFRTtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gZmFsc2U7XG5cdH1cbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBnZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmdldCc7XG5pbXBvcnQgc2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5zZXQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgTUFYX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE1JTl9TQUZFX0lOVEVHRVIgZnJvbSAnLk51bWJlci5NSU5fU0FGRV9JTlRFR0VSJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBQbGFpblRhYmxlLCBPcmRlcmVkVGFibGUgfSBmcm9tICcuL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMkMCBmcm9tICcuL3JlZ2V4cHMkMCc7XG5cbi8qIG9wdGlvbnMgKi9cblxuY29uc3QgVEhST1dfV0hJTEVfTUVFVElOR19NVUxUSSA9IHtcblx0W1N5bWJvbC50b1ByaW1pdGl2ZV0gKCkgICAgICAgIHtcblx0XHRpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVE9NTC5wYXJzZSgsLG11bHRpTGluZVN0cmluZ0pvaW5lcikgbXVzdCBiZSBwYXNzZWQsIHdoaWxlIHRoZSBzb3VyY2UgaW5jbHVkaW5nIG11bHRpLWxpbmUgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0fVxufTtcbmV4cG9ydCBsZXQgdXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyA9ICcnO1xuZXhwb3J0IGxldCB1c2luZ0JpZ0ludCAgICAgICAgICAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWluID0gMDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heCA9IDA7XG5cbiAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuICBcbmV4cG9ydCBsZXQgZW5kc1dpdGhRdW90ZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0xvbmdlciAgICAgICAgIDtcbmV4cG9ydCBsZXQgZW5hYmxlTnVsbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgKCk7XG5jb25zdCBhcnJheVR5cGVzX2dldCA9IC8qI19fUFVSRV9fKi9nZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzX3NldCA9IC8qI19fUFVSRV9fKi9zZXQuYmluZChhcnJheVR5cGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBBcyA9ICgpICAgICA9PiB7XG5cdGNvbnN0IGFzID0gKGFycmF5ICAgICAgICkgICAgICAgID0+IHtcblx0XHRjb25zdCBnb3QgPSBhcnJheVR5cGVzX2dldChhcnJheSk7XG5cdFx0Z290XG5cdFx0XHQ/IGdvdD09PWFzIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFR5cGVFcnJvcihgVHlwZXMgaW4gQXJyYXkgbXVzdCBiZSBzYW1lYCArIGl0ZXJhdG9yJDAud2hlcmUoJy4gQ2hlY2sgJykpKVxuXHRcdFx0OiBhcnJheVR5cGVzX3NldChhcnJheSwgYXMpO1xuXHRcdHJldHVybiBhcnJheTtcblx0fTtcblx0cmV0dXJuIGFzO1xufTtcbmNvbnN0IEFTX1RZUEVEID0ge1xuXHRhc051bGxzOiBBcygpLFxuXHRhc1N0cmluZ3M6IEFzKCksXG5cdGFzVGFibGVzOiBBcygpLFxuXHRhc0FycmF5czogQXMoKSxcblx0YXNCb29sZWFuczogQXMoKSxcblx0YXNGbG9hdHM6IEFzKCksXG5cdGFzSW50ZWdlcnM6IEFzKCksXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZXM6IEFzKCksXG5cdGFzTG9jYWxUaW1lczogQXMoKSxcbn07XG5jb25zdCBhc01peGVkICAgICA9IChhcnJheSAgICAgICApICAgICAgICA9PiBhcnJheTtcbmV4cG9ydCBsZXRcblx0YXNOdWxscyAgICAsXG5cdGFzU3RyaW5ncyAgICAsXG5cdGFzVGFibGVzICAgICxcblx0YXNBcnJheXMgICAgLFxuXHRhc0Jvb2xlYW5zICAgICxcblx0YXNGbG9hdHMgICAgLFxuXHRhc0ludGVnZXJzICAgICxcblx0YXNPZmZzZXREYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVzICAgICxcblx0YXNMb2NhbFRpbWVzICAgIDtcblxuLyogeE9wdGlvbnMudGFnICovXG5cbmxldCBwcm9jZXNzb3IgICAgICAgICAgICAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmxldCBjb2xsZWN0aW9uICAgICAgICAgICAgICA9IFtdO1xubGV0IGNvbGxlY3Rpb25fbGVuZ3RoICAgICAgICAgPSAwO1xuY29uc3QgY29sbGVjdF9vbiA9ICh0YWcgICAgICAgICwgYXJyYXkgICAgICAgICAgICAgICwgdGFibGUgICAgICAgICAgICAgICwga2V5ICAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IGVhY2ggPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGVhY2gudGFnID0gdGFnO1xuXHRpZiAoIHRhYmxlICkge1xuXHRcdGVhY2gudGFibGUgPSB0YWJsZTtcblx0XHRlYWNoLmtleSA9IGtleSA7XG5cdH1cblx0aWYgKCBhcnJheSApIHtcblx0XHRlYWNoLmFycmF5ID0gYXJyYXk7XG5cdFx0ZWFjaC5pbmRleCA9IGFycmF5Lmxlbmd0aDtcblx0fVxuXHRjb2xsZWN0aW9uW2NvbGxlY3Rpb25fbGVuZ3RoKytdID0gZWFjaDtcbn07XG5jb25zdCBjb2xsZWN0X29mZiA9ICgpICAgICAgICA9PiB7IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGB4T3B0aW9ucy50YWcgaXMgbm90IGVuYWJsZWQsIGJ1dCBmb3VuZCB0YWcgc3ludGF4YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9O1xuZXhwb3J0IGxldCBjb2xsZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbGxlY3Rfb2ZmO1xuZXhwb3J0IGNvbnN0IHByb2Nlc3MgPSAoKSAgICAgICA9PiB7XG5cdGlmICggY29sbGVjdGlvbl9sZW5ndGggKSB7XG5cdFx0aXRlcmF0b3IkMC5kb25lKCk7XG5cdFx0Y29uc3QgcHJvY2VzcyA9IHByb2Nlc3NvciA7XG5cdFx0Y29uc3QgcXVldWUgPSBjb2xsZWN0aW9uO1xuXHRcdHByb2Nlc3NvciA9IG51bGw7XG5cdFx0Y29sbGVjdGlvbiA9IFtdO1xuXHRcdHdoaWxlICggY29sbGVjdGlvbl9sZW5ndGgtLSApIHtcblx0XHRcdHByb2Nlc3MocXVldWVbY29sbGVjdGlvbl9sZW5ndGhdICk7XG5cdFx0XHRxdWV1ZS5sZW5ndGggPSBjb2xsZWN0aW9uX2xlbmd0aDtcblx0XHR9XG5cdH1cbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0cHJvY2Vzc29yID0gbnVsbDtcblx0Y29sbGVjdGlvbi5sZW5ndGggPSBjb2xsZWN0aW9uX2xlbmd0aCA9IDA7XG5cdHplcm9EYXRldGltZSA9IGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZSA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICkgICAgICAgPT4ge1xuXHRcblx0bGV0IG1peGVkICAgICAgICAgO1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0bW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gemVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gaW5saW5lVGFibGUgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgUmFuZ2VFcnJvcignVE9NTC5wYXJzZSgsc3BlY2lmaWNhdGlvblZlcnNpb24pJyk7XG5cdH1cblx0cmVnZXhwcyQwLnN3aXRjaFJlZ0V4cChzcGVjaWZpY2F0aW9uVmVyc2lvbik7XG5cdFxuXHRpZiAoIHR5cGVvZiBtdWx0aUxpbmVTdHJpbmdKb2luZXI9PT0nc3RyaW5nJyApIHsgdXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyA9IG11bHRpTGluZVN0cmluZ0pvaW5lcjsgfVxuXHRlbHNlIGlmICggbXVsdGlMaW5lU3RyaW5nSm9pbmVyPT09dW5kZWZpbmVkICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nID0gVEhST1dfV0hJTEVfTUVFVElOR19NVUxUSSAgICAgICAgIDsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsbXVsdGlMaW5lU3RyaW5nSm9pbmVyKScpOyB9XG5cdFxuXHRpZiAoIHVzZUJpZ0ludD09PXVuZGVmaW5lZCB8fCB1c2VCaWdJbnQ9PT10cnVlICkgeyB1c2luZ0JpZ0ludCA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIHVzZUJpZ0ludD09PWZhbHNlICkgeyB1c2luZ0JpZ0ludCA9IGZhbHNlOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIHVzZUJpZ0ludCE9PSdudW1iZXInICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHRpZiAoIHVzZUJpZ0ludD49MCApIHsgSW50ZWdlck1pbiA9IC0oIEludGVnZXJNYXggPSB1c2VCaWdJbnQgKTsgfVxuXHRcdGVsc2UgeyBJbnRlZ2VyTWF4ID0gLSggSW50ZWdlck1pbiA9IHVzZUJpZ0ludCApLTE7IH1cblx0XHRpZiAoIEludGVnZXJNaW4gPCBNSU5fU0FGRV9JTlRFR0VSIHx8IE1BWF9TQUZFX0lOVEVHRVIgPCBJbnRlZ2VyTWF4ICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHR9XG5cdFxuXHRpZiAoIHhPcHRpb25zPT1udWxsIHx8IHhPcHRpb25zPT09ZmFsc2UgKSB7XG5cdFx0VGFibGUgPSBQbGFpblRhYmxlO1xuXHRcdHNFcnJvciA9IGFsbG93TG9uZ2VyID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSBmYWxzZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHhPcHRpb25zPT09dHJ1ZSApIHtcblx0XHRUYWJsZSA9IE9yZGVyZWRUYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9IHNFcnJvciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdHJ1ZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiB4T3B0aW9ucz09PSdmdW5jdGlvbicgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHRydWU7XG5cdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwsdGFnKSBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXknKTsgfVxuXHRcdHByb2Nlc3NvciA9IHhPcHRpb25zO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29uO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgdGFnLCAuLi51bmtub3duIH0gPSB4T3B0aW9ucztcblx0XHRpZiAoIG93bktleXModW5rbm93bikubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKScpOyB9XG5cdFx0VGFibGUgPSBvcmRlciA/IE9yZGVyZWRUYWJsZSA6IFBsYWluVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSAhIWxvbmdlcjtcblx0XHRzRXJyb3IgPSAhIWV4YWN0O1xuXHRcdGVuYWJsZU51bGwgPSAhIV9udWxsO1xuXHRcdGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSAhIW11bHRpO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKSB4T3B0aW9ucy50YWcgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRcdHByb2Nlc3NvciA9IHRhZztcblx0XHRcdGNvbGxlY3QgPSBjb2xsZWN0X29uO1xuXHRcdH1cblx0XHRlbHNlIHsgY29sbGVjdCA9IGNvbGxlY3Rfb2ZmOyB9XG5cdH1cblx0XG5cdG1peGVkXG5cdFx0PyBhc051bGxzID0gYXNTdHJpbmdzID0gYXNUYWJsZXMgPSBhc0FycmF5cyA9IGFzQm9vbGVhbnMgPSBhc0Zsb2F0cyA9IGFzSW50ZWdlcnMgPSBhc09mZnNldERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlVGltZXMgPSBhc0xvY2FsRGF0ZXMgPSBhc0xvY2FsVGltZXMgPSBhc01peGVkXG5cdFx0OiAoIHsgYXNOdWxscywgYXNTdHJpbmdzLCBhc1RhYmxlcywgYXNBcnJheXMsIGFzQm9vbGVhbnMsIGFzRmxvYXRzLCBhc0ludGVnZXJzLCBhc09mZnNldERhdGVUaW1lcywgYXNMb2NhbERhdGVUaW1lcywgYXNMb2NhbERhdGVzLCBhc0xvY2FsVGltZXMgfSA9IEFTX1RZUEVEICk7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcblxuY29uc3QgYXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBhcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNBcnJheSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChhcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IE9GX1RBQkxFUyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNUQVRJQ0FMTFkgPSB0cnVlO1xuY29uc3Qgc3RhdGljYWxBcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChzdGF0aWNhbEFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNTdGF0aWMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoc3RhdGljYWxBcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBuZXdBcnJheSA9IChpc1N0YXRpYyAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgYXJyYXkgICAgICAgID0gW107XG5cdGFycmF5c19hZGQoYXJyYXkpO1xuXHRpc1N0YXRpYyAmJiBzdGF0aWNhbEFycmF5c19hZGQoYXJyYXkpO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBOYXRpdmVEYXRlIGZyb20gJy5EYXRlJztcbmltcG9ydCBwYXJzZSBmcm9tICcuRGF0ZS5wYXJzZSc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcblxuY29uc3QgXzI5XyA9IC8oPzowWzEtOV18MVxcZHwyWzAtOV0pLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdFxcZFxcZFxcZFxcZC1cblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0WzEzNTc4XS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHRbNDY5XS0ke18zMF99XG5cdFx0XHR8XG5cdFx0XHQyLSR7XzI5X31cblx0XHQpXG5cdFx0fFxuXHRcdDFcblx0XHQoPzpcblx0XHRcdFswMl0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0MS0ke18zMF99XG5cdFx0KVxuXHQpYCApKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cblx0YCApKCk7XG5cbmV4cG9ydCBjb25zdCBPRkZTRVQkID0gLyg/Olp8WystXVxcZFxcZDpcXGRcXGQpJC87XG5cbmNvbnN0IFpfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKS5leGVjICkoKTtcblxuY29uc3QgT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9KD86XFwuXFxkezEsM30pP1xuXHQoXFxkKj8pMCpcblx0KD86WnxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU31cblx0KClcblx0WlxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgSVNfTE9DQUxfREFURVRJTUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgSVNfTE9DQUxfREFURSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX1RJTUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgRE9UX1pFUk8gPSAvXFwuPzArJC87XG5jb25zdCBERUxJTUlURVJfRE9UID0gL1stVDouXS9nO1xuY29uc3QgWkVSTyA9IC8oPzw9XFwuXFxkKikwKyQvO1xuXG5jb25zdCBEYXRldGltZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgRGF0ZXRpbWUgPSBmdW5jdGlvbiAoICAgICAgICAgICAgKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Ly9leHByZXNzaW9uPyA6dW5kZWZpbmVkLCBsaXRlcmFsPyA6dW5kZWZpbmVkLCBkb3RWYWx1ZT8gOnVuZGVmaW5lZFxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuc2V0VGltZSgpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5nZXRUaW1lKCkgOiBEYXRlLnBhcnNlKCdUJylcblx0Ly8gW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ251bWJlcicpID4gLnZhbHVlT2YoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAudG9JU09TdHJpbmcoKVxuXHRjb25zdCBkZXNjcmlwdG9ycyA9IE51bGwobnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0e1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBOdWxsKG51bGwpO1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBvd25LZXlzKE5hdGl2ZURhdGUucHJvdG90eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICkge1xuXHRcdFx0a2V5PT09J2NvbnN0cnVjdG9yJyB8fFxuXHRcdFx0a2V5PT09J3RvSlNPTicgfHxcblx0XHRcdCggZGVzY3JpcHRvcnNba2V5XSA9IGRlc2NyaXB0b3IgKTtcblx0XHR9XG5cdH1cblx0RGF0ZXRpbWUucHJvdG90eXBlID0gcHJldmVudEV4dGVuc2lvbnMoY3JlYXRlKE5hdGl2ZURhdGUucHJvdG90eXBlLCBkZXNjcmlwdG9ycykpO1xuXHRyZXR1cm4gZnJlZXplKERhdGV0aW1lKTtcbn0gKSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBWYWx1ZSA9IChJU09TdHJpbmcgICAgICAgICkgICAgICAgID0+IElTT1N0cmluZy5yZXBsYWNlKFpFUk8sICcnKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgbGVhcCA9IChsaXRlcmFsICAgICAgICApID0+IGxpdGVyYWwuc2xpY2UoNSwgMTApIT09JzAyLTI5JyB8fCArbGl0ZXJhbC5zbGljZSgwLCA0KSU0PT09MCAmJiBsaXRlcmFsLnNsaWNlKDIsIDQpIT09JzAwJztcblxuY29uc3QgREFURSA9IG5ldyBOYXRpdmVEYXRlKDApO1xuXG5jb25zdCBPZmZzZXREYXRlVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdmFsdWUgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX3ZhbHVlJyk7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG5jb25zdCBPZmZzZXREYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggZW5kICkgeyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoZW5kIC0gc3RhcnQsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKTsgfVxuXHRjb25zdCB0aW1lID0gcGFyc2UodGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0dGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpO1xuXHRyZXR1cm4gdGltZTtcbn07XG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSBOdWxsKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHR2YWx1ZU9mICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRjb25zdCB7IDE6IG1vcmUgfSA9IGxlYXAobGl0ZXJhbCkgJiYgKCBvcHRpb25zJDAuemVyb0RhdGV0aW1lID8gT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyA6IE9GRlNFVF9EQVRFVElNRV9leGVjICkobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKCcgJywgJ1QnKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyBwYXJzZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pICkucGFkU3RhcnQoMTUsICcwJykgKyAoIG1vcmUgPyAnLicgKyBtb3JlIDogJycgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0VVRDRnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0Z1bGxZZWFyKCk7IH1cblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDAsIDQpOyB9XG5cdHNldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldFVUQ01vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNb250aCgpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSArIDEpOyB9XG5cdGdldFVUQ0RhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF0ZSgpOyB9XG5cdGdldERhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldFVUQ0hvdXJzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENIb3VycygpOyB9XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0VVRDTWludXRlcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaW51dGVzKCk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUpOyB9XG5cdGdldFVUQ1NlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDU2Vjb25kcygpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRVVENNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaWxsaXNlY29uZHMoKTsgfS8vL1xuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgxMiwgMTUpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnICkgKyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNlYXJjaChPRkZTRVQkKSk7XG5cdFx0cmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwKTtcblx0fVxuXHRcblx0Z2V0VVRDRGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF5KCk7IH1cblx0Z2V0RGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7XG5cdFx0cmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzLCB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkqNjAwMDApLmdldFVUQ0RheSgpO1xuXHR9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdHNldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgKSB7XG5cdFx0dmFsdWUgPSArdmFsdWU7XG5cdFx0bGV0IHN0cmluZyA9IE9mZnNldERhdGVUaW1lX3VzZSh0aGlzLCB2YWx1ZSo2MDAwMCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSk7XG5cdFx0aWYgKCB2YWx1ZSApIHtcblx0XHRcdGlmICggdmFsdWU+MCApIHsgc3RyaW5nICs9ICcrJzsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHN0cmluZyArPSAnLSc7XG5cdFx0XHRcdHZhbHVlID0gLXZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbSA9IHZhbHVlJTYwO1xuXHRcdFx0Y29uc3QgaCA9ICggdmFsdWUgLSBtICkvNjA7XG5cdFx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBzdHJpbmcgKyAoIGg+OSA/IGggOiAnMCcgKyBoICkgKyAoIG0+OSA/ICc6JyArIG0gOiAnOjAnICsgbSApO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gc3RyaW5nICsgKCBpcyh2YWx1ZSwgMCkgPyAnWicgOiAnLTAwOjAwJyApOyB9XG5cdH1cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuICt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXS5zbGljZSgwLCAxNSk7IH0vLy9cblx0c2V0VGltZSAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7XG5cdFx0dmFsdWUgPSBEQVRFLnNldFRpbWUodmFsdWUpO1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHREQVRFLnNldFRpbWUodmFsdWUgKyAoIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwICkqNjAwMDApO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHogPyBEQVRFLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgLTEpICsgelswXSA6IERBVEUudG9JU09TdHJpbmcoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDE1LCAnMCcpO1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVUaW1lX0lTT1N0cmluZyA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV9JU09TdHJpbmcnKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsRGF0ZVRpbWVfdmFsdWUnKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbERhdGVUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlVGltZSA9IE51bGwoY2xhc3MgTG9jYWxEYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbC5yZXBsYWNlKCcgJywgJ1QnKVxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUpOyB9XG5cdGdldE1vbnRoICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHRzZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTcsIDE5LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuICt0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE0LCAxNykucGFkRW5kKDMsICcwJyk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxEYXRlX0lTT1N0cmluZyA9IFN5bWJvbCgnTG9jYWxEYXRlX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxEYXRlX3ZhbHVlID0gU3ltYm9sKCdMb2NhbERhdGVfdmFsdWUnKTtcbmNvbnN0IExvY2FsRGF0ZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbERhdGVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApID0+IHtcblx0dGhhdFtMb2NhbERhdGVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoZW5kIC0gc3RhcnQsICcwJykgKyB0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlID0gTnVsbChjbGFzcyBMb2NhbERhdGUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxEYXRlX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZV92YWx1ZV0gICAgICAgO1xuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSBsaXRlcmFsXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxUaW1lX0lTT1N0cmluZyA9IFN5bWJvbCgnTG9jYWxUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKTtcbmNvbnN0IExvY2FsVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbFRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApID0+IHtcblx0dGhhdFtMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSBOdWxsKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHR2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfVElNRShsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMCwgMik7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gTG9jYWxUaW1lX3NldCh0aGlzLCAzLCA1LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDYsIDgpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIExvY2FsVGltZV9zZXQodGhpcywgNiwgOCwgdmFsdWUpOyB9XG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuICt0aGlzW0xvY2FsVGltZV92YWx1ZV0uc2xpY2UoNiwgOSkucGFkRW5kKDMsICcwJyk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApIHtcblx0XHR0aGlzW0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10gPSB0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDgpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnIClcblx0XHQpO1xuXHR9XG5cdFxufSk7XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQnO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmV4cG9ydCBjb25zdCBJTlRFR0VSX0QgPSAvWy0rXT8oPzowfFsxLTldXFxkKig/Ol9cXGQrKSopLztcbmNvbnN0IElTX0RfSU5URUdFUiA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBeJHtJTlRFR0VSX0R9JGAudGVzdCApKCk7XG5jb25zdCBJU19YT0JfSU5URUdFUiA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXjAoPzp4WzAtOUEtRmEtZl0rKD86X1swLTlBLUZhLWZdKykqfG9bMC03XSsoPzpfWzAtN10rKSp8YlswMV0rKD86X1swMV0rKSopJC8pLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVNfU0lHTiA9IC9ffF5bLStdL2c7XG5cbmNvbnN0IEJpZ0ludEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfRF9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IC8qb3B0aW9uc1xcJDAueG9iICYmICovSVNfWE9CX0lOVEVHRVIobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRsZXQgYmlnSW50ICAgICAgICAgPSBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdGlmICggbGl0ZXJhbFswXT09PSctJyApIHsgYmlnSW50ID0gLWJpZ0ludDsgfVxuXHRvcHRpb25zJDAuYWxsb3dMb25nZXJcblx0fHwgLTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IH5tYXggKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IH5taW4gKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGV4cGVjdCA2NCBiaXQgcmFuZ2UgKC05LDIyMywzNzIsMDM2LDg1NCw3NzUsODA4IHRvIDksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDcpLCBub3QgaW5jbHVkZXMgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcblxuY29uc3QgTnVtYmVySW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19EX0lOVEVHRVIobGl0ZXJhbClcblx0fHwgLypvcHRpb25zXFwkMC54b2IgJiYgKi9JU19YT0JfSU5URUdFUihsaXRlcmFsKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IGxpdGVyYWxbMF09PT0nLSdcblx0XHQ/IC1saXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpXG5cdFx0OiArbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZGlkIG5vdCB1c2UgQml0SW50IG11c3QgZml0IE51bWJlci5pc1NhZmVJbnRlZ2VyLCBub3QgaW5jbHVkZXMgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMkMC51c2luZ0JpZ0ludD09PWZhbHNlICkgeyByZXR1cm4gTnVtYmVySW50ZWdlcihsaXRlcmFsKTsgfVxuXHRjb25zdCBiaWdJbnQgICAgICAgICA9IEJpZ0ludEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBvcHRpb25zJDAuSW50ZWdlck1pbjw9YmlnSW50ICYmIGJpZ0ludDw9b3B0aW9ucyQwLkludGVnZXJNYXggPyArKCBiaWdJbnQrJycgKSA6IGJpZ0ludDtcbn07XG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBpc0Zpbml0ZSBmcm9tICcuaXNGaW5pdGUnO1xuLy9pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5Jztcbi8vaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IElOVEVHRVJfRCB9IGZyb20gJy4vSW50ZWdlcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcblxuY29uc3QgSVNfRkxPQVQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtJTlRFR0VSX0R9XG5cdCg/PVsuZUVdKVxuXHQoPzpcXC5cXGQrKD86X1xcZCspKik/XG5cdCg/OltlRV1bLStdP1xcZCsoPzpfXFxkKykqKT9cblx0JGAudGVzdCApKCk7XG5jb25zdCBVTkRFUlNDT1JFUyA9IC9fL2c7XG5jb25zdCBJU19aRVJPID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eWy0rXT8wKD86XFwuWzBfXSspPyg/OltlRV1bLStdPzArKT8kLykudGVzdCApKCk7XG5cbmV4cG9ydCBjb25zdCBGbG9hdCA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIElTX0ZMT0FUKGxpdGVyYWwpICkge1xuXHRcdGNvbnN0IG51bWJlciA9ICtsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKTtcblx0XHRpZiAoIG9wdGlvbnMkMC5zRXJyb3IgKSB7XG5cdFx0XHRpc0Zpbml0ZShudW1iZXIpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0IGhhcyBiZWVuIGFzIGJpZyBhcyBpbmYsIGxpa2UgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdG51bWJlciB8fCBJU19aRVJPKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wLCBsaWtlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdHJldHVybiBudW1iZXI7XG5cdH1cblx0Ly9pZiAoIG9wdGlvbnNcXCQwLnNGbG9hdCApIHtcblx0Ly9cdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7IHJldHVybiBJbmZpbml0eTsgfVxuXHQvL1x0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkgeyByZXR1cm4gLUluZmluaXR5OyB9XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBOYU47IH1cblx0Ly99XG5cdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEZsb2F0ICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG59O1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNvZGVQb2ludCBmcm9tICcuU3RyaW5nLmZyb21Db2RlUG9pbnQnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmNvbnN0IEVTQ0FQRV9BTElBUyA9IHsgYjogJ1xcYicsIHQ6ICdcXHQnLCBuOiAnXFxuJywgZjogJ1xcZicsIHI6ICdcXHInLCAnXCInOiAnXCInLCAnLyc6ICcvJywgJ1xcXFwnOiAnXFxcXCcgfTtcblxuY29uc3QgRVNDQVBFRF9JTl9TSU5HTEVfTElORSA9IC9cXFxcKD86KFtcXFxcXCJidG5mci9dKXx1KC57NH0pfFUoLns4fSkpL2dzO1xuY29uc3QgRVNDQVBFRF9JTl9NVUxUSV9MSU5FID0gL1xcbnxcXFxcKD86ICooXFxuKVsgXFxuXSp8KFtcXFxcXCJidG5mci9dKXx1KC57NH0pfFUoLns4fSkpL2dzO1xuXG5jb25zdCB1bkVzY2FwZVNpbmdsZUxpbmUgPSAoXG5cdG1hdGNoICAgICAgICAsXG5cdHAxICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0cDIgICAgICAgICAsXG5cdHAzICAgICAgICAgXG4pICAgICAgICAgPT4ge1xuXHRpZiAoIHAxICkgeyByZXR1cm4gRVNDQVBFX0FMSUFTW3AxXTsgfVxuXHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHAyID8/IHAzICwgMTYpO1xuXHQoIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHQmJiBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cDIgPyAnXFxcXHUnICsgcDIgOiAnXFxcXFUnICsgcDN9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4gZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xufTtcblxubGV0IG4gPSAwO1xuXG5jb25zdCB1bkVzY2FwZU11bHRpTGluZSA9IChcblx0bWF0Y2ggICAgICAgICxcblx0cDEgICAgICAgICAgICAgICAgICAsXG5cdHAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXHRwMyAgICAgICAgICAgICAgICAgICAgLFxuXHRwNCAgICAgICAgICAgICAgICAgICAgXG4pICAgICAgICAgPT4ge1xuXHRpZiAoIG1hdGNoPT09J1xcbicgKSB7XG5cdFx0KytuO1xuXHRcdHJldHVybiBvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZztcblx0fVxuXHRpZiAoIHAxICkgeyByZXR1cm4gJyc7IH1cblx0aWYgKCBwMiApIHsgcmV0dXJuIEVTQ0FQRV9BTElBU1twMl07IH1cblx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwMyA/PyBwNCAsIDE2KTtcblx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3AzID8gJ1xcXFx1JyArIHAzIDogJ1xcXFxVJyArIHA0fWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJywgaXRlcmF0b3IkMC5saW5lSW5kZXggKyBuKSkpO1xuXHRyZXR1cm4gZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xufTtcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiBsaXRlcmFsLnJlcGxhY2UoRVNDQVBFRF9JTl9TSU5HTEVfTElORSwgdW5Fc2NhcGVTaW5nbGVMaW5lKTtcblxuZXhwb3J0IGNvbnN0IE11bHRpTGluZUJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICwgc2tpcHBlZCAgICAgICAgICkgICAgICAgICA9PiB7XG5cdG4gPSBza2lwcGVkID8gMSA6IDA7XG5cdHJldHVybiBsaXRlcmFsLnJlcGxhY2UoRVNDQVBFRF9JTl9NVUxUSV9MSU5FLCB1bkVzY2FwZU11bHRpTGluZSk7XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCB7IG5ld0FycmF5LCBPRl9UQUJMRVMsIGlzQXJyYXksIGlzU3RhdGljIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgRElSRUNUTFksIElNUExJQ0lUTFksIFBBSVIsIGlzVGFibGUsIGlzSW5saW5lLCB3YXNEaXJlY3RseSwgZGlyZWN0bHksIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpTGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5cbmV4cG9ydCBjb25zdCBwYXJzZUtleXMgPSAoa2V5X2tleSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBrZXlzID0ga2V5X2tleS5tYXRjaChyZWdleHBzJDAuX19LRVlTKSAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0bGV0IGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1stLWluZGV4XSA7XG5cdFx0aWYgKCBrZXkuc3RhcnRzV2l0aCgnXFwnJykgKSB7IGtleXNbaW5kZXhdID0ga2V5LnNsaWNlKDEsIC0xKTsgfVxuXHRcdGVsc2UgaWYgKCBrZXlbMF09PT0nXCInICkgeyBrZXlzW2luZGV4XSA9IEJhc2ljU3RyaW5nKGtleS5zbGljZSgxLCAtMSkpOyB9XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xuXHRpZiAoIG9wdGlvbnMkMC5kaXNhbGxvd0VtcHR5S2V5ICkge1xuXHRcdGxldCBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7XG5cdFx0ZG8geyBrZXlzWy0taW5kZXhdIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBrZXkgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7IH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdH1cblx0cmV0dXJuIGtleXM7XG59O1xuXG5jb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzU3RhdGljKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFwcGVuZCB2YWx1ZSB0byBzdGF0aWMgSW5saW5lIEFycmF5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlWyggdGFibGUgICAgICAgICAgKS5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFkpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlfa2V5ICAgICAgICAsIGFzQXJyYXlJdGVtICAgICAgICAgLCB0YWcgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgID0gcGFyc2VLZXlzKGtleV9rZXkpO1xuXHRjb25zdCBmaW5hbEtleSAgICAgICAgID0gbGVhZGluZ0tleXNbbGVhZGluZ0tleXMubGVuZ3RoIC0gMV0gO1xuXHQtLWxlYWRpbmdLZXlzLmxlbmd0aDtcblx0dGFibGUgPSBwcmVwYXJlVGFibGUodGFibGUsIGxlYWRpbmdLZXlzKTtcblx0bGV0IGxhc3RUYWJsZSAgICAgICA7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0bGV0IGFycmF5T2ZUYWJsZXMgICAgICAgICAgICAgIDtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkgeyBpc0FycmF5KGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0pICYmICFpc1N0YXRpYyhhcnJheU9mVGFibGVzKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIHB1c2ggVGFibGUgdG8gbm9uLUFycmF5T2ZUYWJsZXMgdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHRlbHNlIHsgYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KE9GX1RBQkxFUyk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucyQwLmNvbGxlY3QodGFnLCBhcnJheU9mVGFibGVzLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdGFycmF5T2ZUYWJsZXNbYXJyYXlPZlRhYmxlcy5sZW5ndGhdID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMkMC5UYWJsZShESVJFQ1RMWSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHtcblx0XHRcdGxhc3RUYWJsZSA9IHRhYmxlW2ZpbmFsS2V5XTtcblx0XHRcdHdhc0RpcmVjdGx5KGxhc3RUYWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBUYWJsZSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0ZGlyZWN0bHkobGFzdFRhYmxlKTtcblx0XHRcdGZyb21QYWlyKGxhc3RUYWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBrZXkvdmFsdWUgcGFpciBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBbXWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucyQwLlRhYmxlKERJUkVDVExZKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zJDAuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5saW5lVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGZyb21QYWlyKHRhYmxlKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIFtdIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucyQwLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBjaGVja0xpdGVyYWxTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0cmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gYSBMaXRlcmFsIFN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRyZXR1cm4gbGl0ZXJhbDtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25MaXRlcmFsU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGxpdGVyYWxbMV0hPT0nXFwnJyB8fCBsaXRlcmFsWzJdIT09J1xcJycgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbGl0ZXJhbCBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHRjb25zdCAkID0gcmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRpZiAoICQgKSB7XG5cdFx0dGFibGVbZmluYWxLZXldID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRyZXR1cm4gJFszXTtcblx0fVxuXHRpZiAoIGxpdGVyYWwgKSB7XG5cdFx0Y2hlY2tMaXRlcmFsU3RyaW5nKGxpdGVyYWwpO1xuXHRcdGxpdGVyYWwgKz0gb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0xpdGVyYWwgU3RyaW5nJyk7XG5cdGZvciAoIDsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGluZSk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gbGl0ZXJhbCArIGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHRyZXR1cm4gJFszXTtcblx0XHR9XG5cdFx0bGl0ZXJhbCArPSBsaW5lICsgb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CYXNpY1N0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBsaXRlcmFsWzFdIT09J1wiJyB8fCBsaXRlcmFsWzJdIT09J1wiJyApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLkJBU0lDX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEJhc2ljU3RyaW5nKCRbMV0pO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpO1xuXHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaXRlcmFsKTtcblx0bGV0IHsgbGVuZ3RoIH0gPSAkO1xuXHRpZiAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJywgbGVuZ3RoKSApIHtcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRsZW5ndGggKz0gMztcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZygkKSArICggb3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUgPyBsaXRlcmFsW2xlbmd0aF09PT0nXCInID8gbGl0ZXJhbFsrK2xlbmd0aF09PT0nXCInID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgOiAnJyApO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRsZXQgc2tpcHBlZCA9IHRydWU7XG5cdGlmICggbGl0ZXJhbCApIHtcblx0XHRsaXRlcmFsICs9ICdcXG4nO1xuXHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHNraXBwZWQgPSBmYWxzZTtcblx0fVxuXHRjb25zdCBzdGFydCA9IGl0ZXJhdG9yJDAubWFyaygnQmFzaWMgU3RyaW5nJyk7XG5cdGZvciAoIDsgOyApIHtcblx0XHRsZXQgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMChsaW5lKTtcblx0XHRsZXQgeyBsZW5ndGggfSA9ICQ7XG5cdFx0aWYgKCBsaW5lLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGxlbmd0aCArPSAzO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTXVsdGlMaW5lQmFzaWNTdHJpbmcobGl0ZXJhbCArICQsIHNraXBwZWQpICsgKCBvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSA/IGxpbmVbbGVuZ3RoXT09PSdcIicgPyBsaW5lWysrbGVuZ3RoXT09PSdcIicgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyA6ICcnICk7XG5cdFx0XHRyZXR1cm4gbGluZS5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGxpbmUgKz0gJ1xcbic7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpbmUpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGl0ZXJhbCArPSBsaW5lO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCB7IElOTElORSwgRElSRUNUTFkgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgU1RBVElDQUxMWSB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUJCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi4vcmVnZXhwcyQwJztcbmltcG9ydCB7IGFwcGVuZFRhYmxlLCBwYXJzZUtleXMsIHByZXBhcmVJbmxpbmVUYWJsZSwgYXNzaWduTGl0ZXJhbFN0cmluZywgYXNzaWduQmFzaWNTdHJpbmcgfSBmcm9tICcuL29uLXRoZS1zcG90JztcblxuY29uc3QgSVNfT0ZGU0VUJCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cChPRkZTRVQkKS50ZXN0ICkoKTtcblxuY29uc3QgcHVzaCA9IChsYXN0QXJyYXkgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLl9WQUxVRV9QQUlSX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnIGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zJDAuY29sbGVjdCh0YWcsIGxhc3RBcnJheSwgbnVsbCk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ10nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHRsYXN0QXJyYXlbbGFzdEFycmF5Lmxlbmd0aF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKG9wdGlvbnMkMC5hc1N0cmluZ3MobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMkMC5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaChsaW5lUmVzdCA9PiBlcXVhbElubGluZVRhYmxlKG9wdGlvbnMkMC5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdGNhc2UgJ1snOlxuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaChsaW5lUmVzdCA9PiBlcXVhbFN0YXRpY0FycmF5KG9wdGlvbnMkMC5hc0FycmF5cyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHtcblx0XHRcdG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gLUluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nIHx8IGxpdGVyYWw9PT0nLW5hbicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IE5hTjtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRvcHRpb25zJDAuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0b3B0aW9ucyQwLmFzTG9jYWxEYXRlcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0bGl0ZXJhbD09PSd0cnVlJyA/IG9wdGlvbnMkMC5hc0Jvb2xlYW5zKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSB0cnVlIDogbGl0ZXJhbD09PSdmYWxzZScgPyBvcHRpb25zJDAuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gZmFsc2UgOlxuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCAoIGxpdGVyYWwuaW5jbHVkZXMoJ2UnKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCdFJykgKSAmJiAhbGl0ZXJhbC5zdGFydHNXaXRoKCcweCcpID8gb3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBGbG9hdChsaXRlcmFsKSA6XG5cdFx0XHRvcHRpb25zJDAuZW5hYmxlTnVsbCAmJiBsaXRlcmFsPT09J251bGwnID8gb3B0aW9ucyQwLmFzTnVsbHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG51bGwgOlxuXHRcdFx0XHRvcHRpb25zJDAuYXNJbnRlZ2VycyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gSW50ZWdlcihsaXRlcmFsKTtcblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuY29uc3QgZXF1YWxTdGF0aWNBcnJheSA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGNvbnN0IHN0YXRpY0FycmF5ICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KFNUQVRJQ0FMTFkpO1xuXHRjb25zdCBzdGFydCA9IGl0ZXJhdG9yJDAubWFyaygnSW5saW5lIEFycmF5Jyk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0Y29uc3QgbGVuZ3RoID0gaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoO1xuXHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdGxpbmVSZXN0ID0gcHVzaChzdGF0aWNBcnJheSwgbGluZVJlc3QpO1xuXHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRpdGVyYXRvciQwLnN0YWNrc19pbnNlcnRCZWZvcmVMYXN0KGZ1bmN0aW9uIGluc2VydGVkIChsaW5lUmVzdCkge1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7Ly9cblx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsvL1xuXHRcdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0ZWxzZSB7Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgYWZ0ZXIgc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBpcyBmb3VuZCBhdCAnKSkpOy8vXG5cdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRyZXR1cm4gY2FsbGVlKGxpbmVSZXN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRcdH1cblx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjdGVyIGluIHN0YXRpYyBhcnJheSBpdGVtIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0obGluZVJlc3QpO1xufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IHtcblx0Y29uc3QgaW5saW5lVGFibGUgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShESVJFQ1RMWSwgSU5MSU5FKTtcblx0aWYgKCBvcHRpb25zJDAuYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSApIHtcblx0XHRjb25zdCBzdGFydCA9IGl0ZXJhdG9yJDAubWFyaygnSW5saW5lIFRhYmxlJyk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHRsaW5lUmVzdCA9IGFzc2lnbihpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdChmdW5jdGlvbiBpbnNlcnRlZCAobGluZVJlc3QpIHtcblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRcdFx0fVxuXHRcdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdH1cblx0XHR9KGxpbmVSZXN0KTtcblx0fVxuXHRlbHNlIHtcblx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSE9PScjJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0Y29uc3QgbGVuZ3RoID0gaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjYWxsZWUgKGxpbmVSZXN0KSB7XG5cdFx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRcdGxpbmVSZXN0ID0gYXNzaWduKGlubGluZVRhYmxlLCBsaW5lUmVzdCk7XG5cdFx0XHRcdGlmICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoPmxlbmd0aCApIHtcblx0XHRcdFx0XHRpdGVyYXRvciQwLnN0YWNrc19pbnNlcnRCZWZvcmVMYXN0KGZ1bmN0aW9uIGluc2VydGVkIChsaW5lUmVzdCkge1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOy8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0WzBdPT09J30nICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTsvL1xuXHRcdFx0XHRcdFx0fS8vXG5cdFx0XHRcdFx0XHQoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBicm9rZW4gYXQgJykpKTsvL1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdHJldHVybiBjYWxsZWUobGluZVJlc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0KCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0fShsaW5lUmVzdCk7XG5cdH1cbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgYXNzaWduID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlZnQsIHRhZyB9ID0geyByaWdodDogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhsaW5lUmVzdCk7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IHBhcnNlS2V5cyhsZWZ0KTtcblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9IGxlYWRpbmdLZXlzW2xlYWRpbmdLZXlzLmxlbmd0aCAtIDFdIDtcblx0LS1sZWFkaW5nS2V5cy5sZW5ndGg7XG5cdGNvbnN0IHRhYmxlICAgICAgICA9IHByZXBhcmVJbmxpbmVUYWJsZShsYXN0SW5saW5lVGFibGUsIGxlYWRpbmdLZXlzKTtcblx0ZmluYWxLZXkgaW4gdGFibGUgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIHRhZyApIHtcblx0XHRvcHRpb25zJDAuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdFx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0XHRjYXNlICcsJzpcblx0XHRcdGNhc2UgJ30nOlxuXHRcdFx0Y2FzZSAnJzpcblx0XHRcdGNhc2UgJyMnOlxuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0c3dpdGNoICggbGluZVJlc3QgJiYgbGluZVJlc3RbMF0gKSB7XG5cdFx0Y2FzZSAnXFwnJzpcblx0XHRcdHJldHVybiBhc3NpZ25MaXRlcmFsU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ1wiJzpcblx0XHRcdHJldHVybiBhc3NpZ25CYXNpY1N0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMkMC5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjRgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfcHVzaCgobGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiBlcXVhbElubGluZVRhYmxlKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRjYXNlICdbJzpcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2goKGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4gZXF1YWxTdGF0aWNBcnJheSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0Y29uc3QgeyAxOiBsaXRlcmFsIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdGlmICggb3B0aW9ucyQwLnNGbG9hdCApIHtcblx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IC1JbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkge1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gTmFOO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRpZiAoIGxpdGVyYWwuaW5kZXhPZignLScpIT09bGl0ZXJhbC5sYXN0SW5kZXhPZignLScpICYmIGxpdGVyYWxbMF0hPT0nLScgKSB7XG5cdFx0b3B0aW9ucyQwLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHR0YWJsZVtmaW5hbEtleV0gPVxuXHRcdGxpdGVyYWw9PT0ndHJ1ZScgPyB0cnVlIDogbGl0ZXJhbD09PSdmYWxzZScgPyBmYWxzZSA6XG5cdFx0XHRsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKSA/IEZsb2F0KGxpdGVyYWwpIDpcblx0XHRcdFx0b3B0aW9ucyQwLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyA/IG51bGwgOlxuXHRcdFx0XHRcdEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmV4cG9ydCB7IFJvb3QgYXMgZGVmYXVsdCB9O1xuY29uc3QgUm9vdCA9ICgpICAgICAgICA9PiB7XG5cdGNvbnN0IHJvb3RUYWJsZSAgICAgICAgPSBuZXcgb3B0aW9ucyQwLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IkMC5yZXN0KCkgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5uZXh0KCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgJF9hc0FycmF5SXRlbSQkLCBrZXlzLCAkJGFzQXJyYXlJdGVtJF8sIHRhZyB9ID0gcmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMobGluZSk7XG5cdFx0XHRcdCRfYXNBcnJheUl0ZW0kJD09PSQkYXNBcnJheUl0ZW0kXyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgU3F1YXJlIGJyYWNrZXRzIG9mIFRhYmxlIGRlZmluaXRpb24gc3RhdGVtZW50IG5vdCBtYXRjaGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0bGFzdFNlY3Rpb25UYWJsZSA9IGFwcGVuZFRhYmxlKHJvb3RUYWJsZSwga2V5cywgJF9hc0FycmF5SXRlbSQkLCB0YWcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGxpbmVbMF09PT0nIycgKSB7XG5cdFx0XHRcdHJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaW5lKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGNvbW1lbnRzYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGV0IHJlc3QgICAgICAgICA9IGFzc2lnbihsYXN0U2VjdGlvblRhYmxlLCBsaW5lKTtcblx0XHRcdFx0d2hpbGUgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGggKSB7IHJlc3QgPSBpdGVyYXRvciQwLnN0YWNrc19wb3AoKShyZXN0KTsgfVxuXHRcdFx0XHRyZXN0ICYmIHJlc3RbMF0hPT0nIycgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290VGFibGU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy5CdWZmZXIuaXNCdWZmZXI/PSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcbmltcG9ydCBnbG9iYWxUaGlzIGZyb20gJy5nbG9iYWxUaGlzJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IGNsZWFyUmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IE5PTl9TQ0FMQVIgfSBmcm9tICdAbHRkL2otdXRmJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0IFJvb3QgZnJvbSAnLi4vcGFyc2UvbGV2ZWwtbG9vcCc7XG5cbmNvbnN0IElTX05PTl9TQ0FMQVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoTk9OX1NDQUxBUikudGVzdCApKCk7XG5jb25zdCBCT00gPSAnXFx1RkVGRic7XG5jb25zdCBidWYyc3RyID0gKGJ1ZiAgICAgICAgKSA9PiB7XG5cdGNvbnN0IHN0ciA9IGJ1Zi50b1N0cmluZygpO1xuXHRpZiAoICFmcm9tKHN0cikuZXF1YWxzKGJ1ZikgKSB7IHRocm93IEVycm9yKCdBIFRPTUwgZG9jIG11c3QgYmUgYSAoZnVsLXNjYWxhcikgdmFsaWQgVVRGLTggZmlsZSwgd2l0aG91dCBhbnkgdW5rbm93biBjb2RlIHBvaW50LicpOyB9XG5cdHJldHVybiBzdHJbMF09PT1CT00gPyBzdHIuc2xpY2UoMSkgOiBzdHI7XG59O1xuXG5jb25zdCBwYXJzZSA9IChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRpdGVyYXRvciQwLmNvdWxkKCk7XG5cdGxldCBzb3VyY2VQYXRoICAgICAgICA7XG5cdGlmICggaXNCdWZmZXIoc291cmNlKSApIHtcblx0XHRzb3VyY2UgPSBidWYyc3RyKHNvdXJjZSk7XG5cdFx0c291cmNlUGF0aCA9ICcnO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlPT09J29iamVjdCcgJiYgc291cmNlICkge1xuXHRcdHNvdXJjZVBhdGggPSBzb3VyY2UucGF0aDtcblx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UucGF0aCknKTsgfVxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gc291cmNlO1xuXHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHsgc291cmNlID0gYnVmMnN0cigoIGdsb2JhbFRoaXMucmVxdWlyZSgnZnMnKSAgICAgICAgICAgICAgICAgICAgICAgICkucmVhZEZpbGVTeW5jKHNvdXJjZVBhdGgpKTsgfVxuXHRcdGVsc2UgaWYgKCBpc0J1ZmZlcihkYXRhKSApIHsgc291cmNlID0gYnVmMnN0cihkYXRhKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlPT09J3N0cmluZycgKSB7IHNvdXJjZVBhdGggPSAnJzsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZSknKTsgfVxuXHR0cnkge1xuXHRcdGlmICggSVNfTk9OX1NDQUxBUihzb3VyY2UpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVuY291cGxlZCBVQ1MtNCBjaGFyYWN0ZXIgY29kZS4nKTsgfVxuXHRcdHRyeSB7XG5cdFx0XHRvcHRpb25zJDAudXNlKHNwZWNpZmljYXRpb25WZXJzaW9uLCBtdWx0aUxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpO1xuXHRcdFx0aXRlcmF0b3IkMC50b2RvKHNvdXJjZSwgc291cmNlUGF0aCk7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCByb290VGFibGUgPSBSb290KCk7XG5cdFx0XHRcdG9wdGlvbnMkMC5wcm9jZXNzKCk7XG5cdFx0XHRcdHJldHVybiByb290VGFibGU7XG5cdFx0XHR9XG5cdFx0XHRmaW5hbGx5IHtcblx0XHRcdFx0Ly9jbGVhcldlYWtTZXRzKCk7XG5cdFx0XHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgb3B0aW9ucyQwLmNsZWFyKCk7IH1cblx0fVxuXHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2Fzc2lnbihcblx0KHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aUxpbmVTdHJpbmdKb2luZXIgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgICApID0+IHR5cGVvZiBzcGVjaWZpY2F0aW9uVmVyc2lvbj09PSdudW1iZXInXG5cdFx0PyBwYXJzZShzb3VyY2UsIHNwZWNpZmljYXRpb25WZXJzaW9uLCBtdWx0aUxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpXG5cdFx0OiBwYXJzZShzb3VyY2UsIDEuMCwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgLCBtdWx0aUxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgICApLFxuXHR7XG5cdFx0JzEuMCc6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQxLjA6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDEuMCwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjU6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNSwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjQ6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNCwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjM6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMywgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjI6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMiwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjE6IChzb3VyY2UgICAgICAgICwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlMaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0fVxuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZS8nO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG59KTtcbiJdLCJuYW1lcyI6WyJQcm94eSIsIk51bGwiLCJvcmRlcmlmeV9OdWxsIiwiaXRlcmF0b3IkMC50aHJvd3MiLCJpdGVyYXRvciQwLndoZXJlIiwiY3JlYXRlIiwiaXRlcmF0b3IkMC5kb25lIiwicmVnZXhwcyQwLnN3aXRjaFJlZ0V4cCIsInVuZGVmaW5lZCIsIm93bktleXMiLCJmcmVlemUiLCJwYXJzZSIsIm9wdGlvbnMkMC56ZXJvRGF0ZXRpbWUiLCJpcyIsIm9wdGlvbnMkMC5hbGxvd0xvbmdlciIsIm9wdGlvbnMkMC51c2luZ0JpZ0ludCIsIm9wdGlvbnMkMC5JbnRlZ2VyTWluIiwib3B0aW9ucyQwLkludGVnZXJNYXgiLCJvcHRpb25zJDAuc0Vycm9yIiwib3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmciLCJpdGVyYXRvciQwLmxpbmVJbmRleCIsInJlZ2V4cHMkMC5fX0tFWVMiLCJvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSIsIm9wdGlvbnMkMC5UYWJsZSIsIm9wdGlvbnMkMC5jb2xsZWN0IiwicmVnZXhwcyQwLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0IiwicmVnZXhwcyQwLkxJVEVSQUxfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMiLCJpdGVyYXRvciQwLm1hcmsiLCJpdGVyYXRvciQwLm11c3QiLCJyZWdleHBzJDAuQkFTSUNfU1RSSU5HX2V4ZWMiLCJyZWdleHBzJDAuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wIiwicmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0Iiwib3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUiLCJyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UiLCJyZWdleHBzJDAuX1ZBTFVFX1BBSVJfZXhlYyIsIm9wdGlvbnMkMC5hc1N0cmluZ3MiLCJvcHRpb25zJDAuaW5saW5lVGFibGUiLCJpdGVyYXRvciQwLnN0YWNrc19wdXNoIiwib3B0aW9ucyQwLmFzVGFibGVzIiwib3B0aW9ucyQwLmFzQXJyYXlzIiwicmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMkMC5zRmxvYXQiLCJvcHRpb25zJDAuYXNGbG9hdHMiLCJvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zJDAubW9yZURhdGV0aW1lIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlVGltZXMiLCJvcHRpb25zJDAuYXNMb2NhbFRpbWVzIiwib3B0aW9ucyQwLmFzTG9jYWxEYXRlcyIsIm9wdGlvbnMkMC5hc0Jvb2xlYW5zIiwib3B0aW9ucyQwLmVuYWJsZU51bGwiLCJvcHRpb25zJDAuYXNOdWxscyIsIm9wdGlvbnMkMC5hc0ludGVnZXJzIiwicmVnZXhwcyQwLlNZTV9XSElURVNQQUNFIiwiaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoIiwiaXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdCIsIm9wdGlvbnMkMC5hbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hIiwicmVnZXhwcyQwLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIiwiaXRlcmF0b3IkMC5yZXN0IiwiaXRlcmF0b3IkMC5uZXh0IiwicmVnZXhwcyQwLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnN0YWNrc19wb3AiLCJpdGVyYXRvciQwLmNvdWxkIiwib3B0aW9ucyQwLnVzZSIsIml0ZXJhdG9yJDAudG9kbyIsIm9wdGlvbnMkMC5wcm9jZXNzIiwib3B0aW9ucyQwLmNsZWFyIiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFjLFFBQVE7Ozs7Ozs7Ozs7Ozs7QUNJZixJQUFJLElBQUksNkNBQTZDLElBQUk7QUFDaEUsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRO0FBQ3RDLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDakIsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFO0FBQzNCLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMs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