/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.12.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

import Error from '.Error';
import TypeError from '.TypeError';
import isBuffer from '.Buffer.isBuffer?=()=>false';
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
import create$1 from '.Object.create?=';
import NULL from '.null.prototype';
import Default from '.default?=';
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
import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import del from '.WeakSet.prototype.delete';
import Null$1 from '.null';
import Proxy$1 from '.Proxy';
import Object_assign from '.Object.assign';
import Object_is from '.Object.is';
import defineProperty from '.Object.defineProperty';
import Object_getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import Object_defineProperties from '.Object.defineProperties';
import Object_fromEntries from '.Object.fromEntries';
import Object_freeze from '.Object.freeze';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import Default$1 from '.default';
import Infinity from '.Infinity';
import NaN from '.NaN';
import NativeDate from '.Date';
import parse$1 from '.Date.parse';
import preventExtensions from '.Object.preventExtensions';
import BigInt from '.BigInt';
import isFinite from '.isFinite';
import parseInt from '.parseInt';
import fromCodePoint from '.String.fromCodePoint';

const version$3 = '1.12.0';

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

var version$2 = '8.0.0';

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

Default({
	version: version$2,
	newRegExp: newRegExp,
	theRegExp: theRegExp,
	clearRegExp: clearRegExp,
	groupify: groupify
});

/*¡ j-regexp */

/*!
 * 模块名称：j-utf
 * 模块功能：UTF 相关共享实用程序。从属于“简计划”。
   　　　　　UTF util. Belong to "Plan J".
 * 模块版本：3.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-utf/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-utf/
 */

var version$1 = '3.2.0';

var NON_SCALAR = (
	'unicode' in RegExp_prototype
		? RegExp('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

// \u{110000}-\u{FFFFFFFF} -> \uFFFD

function buffer2number (buffer        , startsWithASCII          )         {
	var ucs               ;
	var swapped                    ;
	var length         = buffer.length;
	if ( !length ) { return -1; }
	var firstByte         = buffer[0];
	if ( firstByte===0xEF ) {
		if ( length===1 || buffer[1]!==0xBB ) { return 1; }
		if ( length===2 || buffer[2]!==0xBF ) { return 2; }
	}
	else if ( firstByte===0xFF ) {
		if ( length===1 || buffer[1]!==0xFE ) { return 1; }
		if ( length%2 ) { return length; }
		ucs = 2;
	}
	else if ( firstByte===0xFE ) {
		if ( length===1 || buffer[1]!==0xFF ) { return 1; }
		if ( length%2 ) { return length; }
		ucs = 2;
		swapped = buffer.swap16();
	}
	else if ( startsWithASCII ) {
		if ( firstByte===0x00 ) {
			if ( length>2 && buffer[2]===0x00 ) { return 2; }
			if ( length%2 ) { return length; }
			ucs = 2;
			swapped = buffer.swap16();
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( length>3 && buffer[3]===0x00 ) { return 3; }
			if ( length%2 ) { return length; }
			ucs = 2;
		}
	}
	var string        ;
	var coded        ;
	if ( ucs ) {
		coded = from(string = buffer.toString('ucs2'), 'ucs2');
		if ( swapped ) {
			coded.swap16();
			buffer.swap16();
		}
	}
	else { coded = from(string = buffer.toString()); }
	var codedLength         = coded.length;
	var index = 0;
	if ( codedLength===length ) {
		for ( ; index<length; ++index ) {
			if ( coded[index]!==buffer[index] ) { return index; }
		}
		return string.search(NON_SCALAR);
	}
	if ( length>codedLength ) { length = codedLength; }
	for ( ; index<length; ++index ) {
		if ( coded[index]!==buffer[index] ) { return index; }
	}
	return index;
}

function buffer2string (buffer        , options          )         {
	
	var length         = buffer.length;
	if ( !length ) { return ''; }
	
	var encoding                    ;
	var swapped                    ;
	
	
	
	var throwError          = !options || options.throwError!==false;
	
	var firstByte         = buffer[0];
	if ( firstByte===0xEF ) {
		if ( length>2 && buffer[1]===0xBB && buffer[2]===0xBF ) {
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(3); }
			
			
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-8 BOM 头'); }
			
			
		}
	}
	else if ( firstByte===0xFF ) {
		if ( length>1 && buffer[1]===0xFE ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(2); }
			encoding = 'ucs2';
			
			
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16LE BOM 头'); }
			
			
		}
	}
	else if ( firstByte===0xFE ) {
		if ( length>1 && buffer[1]===0xFF ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			buffer.swap16();
			if ( options ) {
				if ( !options.swappable ) { swapped = buffer; }
				if ( options.stripBOM!==false ) { buffer = buffer.slice(2); }
			}
			else {
				swapped = buffer;
				buffer = buffer.slice(2);
			}
			encoding = 'ucs2';
			
			
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16BE BOM 头'); }
			
			
		}
	}
	else if ( options && options.startsWithASCII ) {
		if ( firstByte===0x00 ) {
			if ( throwError ) {
				if ( length>2 && buffer[2]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			buffer.swap16();
			if ( !options.swappable ) { swapped = buffer; }
			encoding = 'ucs2';
			
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( throwError ) {
				if ( length>3 && buffer[3]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			encoding = 'ucs2';
			
		}
		
		
		
		
	}
	
	
	
	
	
	var string         = encoding ? buffer.toString(encoding) : buffer.toString();
	if ( throwError ) {
		if ( from(string, encoding).equals(buffer) ) {
			swapped && swapped.swap16();
			if ( NON_SCALAR.test(string) ) { throw Error('代理对码点不能单独出现'); }
		}
		else {
			swapped && swapped.swap16();
			throw Error('文件中存在超出 Unicode 表示范围的内容');
		}
	}
	else { swapped && swapped.swap16(); }
	return string;
	
}

function buffer2object (buffer        , options          )                                                                          {
	
	var length         = buffer.length;
	if ( !length ) { return { BOM: '', UTF: '', string: '' }; }
	
	var encoding                    ;
	var swapped                    ;
	var BOM               ;
	var UTF                            ;
	
	var throwError          = !options || options.throwError!==false;
	
	var firstByte         = buffer[0];
	if ( firstByte===0xEF ) {
		if ( length>2 && buffer[1]===0xBB && buffer[2]===0xBF ) {
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(3); }
			BOM = '\uFEFF';
			UTF = '8';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-8 BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFF ) {
		if ( length>1 && buffer[1]===0xFE ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(2); }
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16LE';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16LE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFE ) {
		if ( length>1 && buffer[1]===0xFF ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			buffer.swap16();
			if ( options ) {
				if ( !options.swappable ) { swapped = buffer; }
				if ( options.stripBOM!==false ) { buffer = buffer.slice(2); }
			}
			else {
				swapped = buffer;
				buffer = buffer.slice(2);
			}
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16BE';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16BE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( options && options.startsWithASCII ) {
		if ( firstByte===0x00 ) {
			if ( throwError ) {
				if ( length>2 && buffer[2]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			buffer.swap16();
			if ( !options.swappable ) { swapped = buffer; }
			encoding = 'ucs2';
			UTF = '16BE';
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( throwError ) {
				if ( length>3 && buffer[3]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			encoding = 'ucs2';
			UTF = '16LE';
		}
		else {
			UTF = '8';
		}
		BOM = '';
	}
	else {
		BOM = '';
		UTF = '';
	}
	
	var string         = encoding ? buffer.toString(encoding) : buffer.toString();
	if ( throwError ) {
		if ( from(string, encoding).equals(buffer) ) {
			swapped && swapped.swap16();
			if ( NON_SCALAR.test(string) ) { throw Error('代理对码点不能单独出现'); }
		}
		else {
			swapped && swapped.swap16();
			throw Error('文件中存在超出 Unicode 表示范围的内容');
		}
	}
	else { swapped && swapped.swap16(); }
	return { BOM, UTF, string };
	
}

var POINTS =
	'dotAll' in RegExp_prototype && 'unicode' in RegExp_prototype ? RegExp('.', 'gsu') :
		'bind' in RegExp ? RegExp('[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^]/', 'g') :
			/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g;

var POINTS_CRLF =
	'dotAll' in RegExp_prototype && 'unicode' in RegExp_prototype ? RegExp('\\r\\n|.', 'gsu') :
		'bind' in RegExp ? RegExp('\\r\\n|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^]/', 'g') :
			/\r\n|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g;

function string2array (string        , crlf          )           {
	return string ? string.match(crlf ? POINTS_CRLF : POINTS)  : [];
}

Default({
	version: version$1,
	buffer2number: buffer2number,
	buffer2object: buffer2object,
	buffer2string: buffer2string,
	string2array: string2array,
	NON_SCALAR: NON_SCALAR
});

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

const version = '7.0.1';

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

const ExternalDescriptor =                                (source   )    => {
	const target = Object_create(NULL)     ;
	if ( hasOwnProperty_call(source, 'enumerable') ) { target.enumerable = source.enumerable; }
	if ( hasOwnProperty_call(source, 'configurable') ) { target.configurable = source.configurable; }
	if ( hasOwnProperty_call(source, 'value') ) { target.value = source.value; }
	if ( hasOwnProperty_call(source, 'writable') ) { target.writable = source.writable; }
	if ( hasOwnProperty_call(source, 'get') ) { target.get = source.get; }
	if ( hasOwnProperty_call(source, 'set') ) { target.set = source.set; }
	return target;
};

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

const isOrdered = (object        )          => proxy2target.has(object);
const is = (object1        , object2        )          => Object_is(
	proxy2target.get(object1) || object1,
	proxy2target.get(object2) || object2,
);

const orderify =                    (object   )    => {
	if ( proxy2target.has(object) ) { return object; }
	let proxy = target2proxy.get(object)                 ;
	if ( proxy ) { return proxy; }
	proxy = newProxy(object, Object_assign(Keeper          (), Reflect_ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

                                                                                                       
const { create } = {
	create                                                          (proto          , ...descriptorMaps      )                                                                  {
		const keeper = Keeper           ();
		if ( descriptorMaps.length ) {
			const descriptorMap     = Object_assign(newProxy(Object_create(NULL)      , keeper), ...descriptorMaps);
			const { length } = keeper;
			let index = 0;
			while ( index!==length ) {
				const key = keeper[index++] ;
				descriptorMap[key] = ExternalDescriptor(descriptorMap[key]);
			}
			return newProxy(Object_create(proto, descriptorMap)       , keeper       );
		}
		return newProxy(Object_create(proto)       , keeper       );
	}
};
const { defineProperties } = {
	defineProperties                                                     (object   , descriptorMap    , ...descriptorMaps      )                                                                     {
		const keeper = Keeper           ();
		descriptorMap = Object_assign(newProxy(Object_create(NULL)      , keeper), descriptorMap, ...descriptorMaps);
		const { length } = keeper;
		let index = 0;
		while ( index!==length ) {
			const key = keeper[index++] ;
			descriptorMap[key] = ExternalDescriptor(descriptorMap[key]);
		}
		return Object_defineProperties(orderify(object), descriptorMap);
	}
};
const getOwnPropertyDescriptors =                    (object   )                                => {
	const descriptorMap = Object_create(NULL)                                 ;
	const keeper = Object_assign(Keeper          (), Reflect_ownKeys(object));
	const { length } = keeper;
	let index = 0;
	while ( index!==length ) {
		const key = keeper[index++];
		descriptorMap[key] = Object_assign(Object_create(NULL), Object_getOwnPropertyDescriptor(object, key) );
	}
	return newProxy(descriptorMap, keeper);
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
	defineProperty(Null, 'name', Object_assign(Object_create(NULL), { value: '', configurable: false }));
	//delete Null.length;
	Object_freeze(Null);
	return Null;
}()                                           ;
                                                                   

const DEFAULT = /*#__PURE__*/Object_assign(class extends null { writable () {} enumerable () {} configurable () {} }.prototype                             , {
	constructor: undefined$1,
	writable: true,
	enumerable: true,
	configurable: true,
});
const fromEntries =                                                  (entries                                            , proto           )                      => {
	const target = Object_fromEntries(entries);
	const keeper            = Object_assign(Keeper   (), Reflect_ownKeys(target));
	if ( proto===undefined$1 ) { return newProxy(target                       , keeper); }
	if ( proto===null ) { return newProxy(Object_assign(Object_create(proto), target)                       , keeper); }
	const descriptorMap = Object_create(NULL)                                            ;
	const { length } = keeper;
	let index = 0;
	while ( index!==length ) {
		const key    = keeper[index++] ;
		( descriptorMap[key] = Object_create(DEFAULT)                               ).value = target[key];
	}
	return newProxy(Object_create(proto, descriptorMap)                       , keeper);
};
Default$1({
	version,
	isOrdered,
	is,
	orderify,
	create,
	defineProperties,
	Null,
	fromEntries,
	getOwnPropertyDescriptors,
});

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
			throw RangeError('TOML.parse(,specificationVersion)');
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multiLineJoiner==='string' ) { useWhatToJoinMultiLineString = multiLineJoiner; }
	else { throw TypeError('TOML.parse(,,multiLineJoiner)'); }
	
	if ( useBigInt===true ) { usingBigInt = true; }
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
	const descriptor = Null$1({ value: '', writable: true, enumerable: true, configurable: true });
	const Datetime = function (              _ISOString        , _value        ) {
		return defineProperty(defineProperty(this, _ISOString, descriptor), _value, descriptor);
	}                                                                   ;//expression? :undefined, literal? :undefined, dotValue? :undefined
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
	const time = parse$1(that[OffsetDateTime_ISOString]);
	that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);
	return time;
};
const OffsetDateTime = Null$1(class OffsetDateTime extends Datetime {
	
	                                           
	                                      
	
	valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		const { 1: more } = leap(literal) && ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		super(OffsetDateTime_ISOString, OffsetDateTime_value);
		this[OffsetDateTime_ISOString] = literal.replace(' ', 'T');
		this[OffsetDateTime_value] = ( '' + parse$1(this[OffsetDateTime_ISOString]) ).padStart(15, '0') + ( more ? '.' + more : '' );
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
	
	                                          
	                                     
	
	valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal}` + where(' at ')));
		super(LocalDateTime_ISOString, LocalDateTime_value);
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
	
	                                      
	                                 
	
	valueOf (               )        { return this[LocalDate_value]; }
	toISOString (               )         { return this[LocalDate_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATE(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date ${literal}` + where(' at ')));
		super(LocalDate_ISOString, LocalDate_value);
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
	
	                                      
	                                 
	
	valueOf (               )        { return this[LocalTime_value]; }
	toISOString (               )         { return this[LocalTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_TIME(literal) || throws(SyntaxError(`Invalid Local Time ${literal}` + where(' at ')));
		super(LocalTime_ISOString, LocalTime_value);
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
const parse = (
	source                                                                              ,
	specificationVersion                                   ,
	multiLineJoiner        ,
	useBigInt                   = true,
	xOptions                    ,
)        => {
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

const _export = Default$1({
	version: version$3,
	parse,
});

export default _export;
export { parse, version$3 as version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy92ZXJzaW9uP3RleHQiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvdGhlUmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL25ld1JlZ0V4cC50cyIsIi4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uL2otcmVnZXhwL3NyYy9ncm91cGlmeS50cyIsIi4uLy4uL2otcmVnZXhwL3NyYy9leHBvcnQudHMiLCIuLi8uLi9qLXV0Zi9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vai11dGYvc3JjL05PTl9TQ0FMQVIudHMiLCIuLi8uLi9qLXV0Zi9zcmMvYnVmZmVyMm51bWJlci50cyIsIi4uLy4uL2otdXRmL3NyYy9idWZmZXIyc3RyaW5nLnRzIiwiLi4vLi4vai11dGYvc3JjL2J1ZmZlcjJvYmplY3QudHMiLCIuLi8uLi9qLXV0Zi9zcmMvc3RyaW5nMmFycmF5LnRzIiwiLi4vLi4vai11dGYvc3JjL2V4cG9ydC50cyIsIml0ZXJhdG9yJDAudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy92ZXJzaW9uP3RleHQiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9UYWJsZS50cyIsInJlZ2V4cHMkMC50cyIsIm9wdGlvbnMkMC50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInBhcnNlL2xldmVsLWxvb3AudHMiLCJwYXJzZS8udHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQnMS4xMi4wJzsiLCJleHBvcnQgZGVmYXVsdCc4LjAuMCc7IiwiaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcbmltcG9ydCBleGVjIGZyb20gJy5SZWdFeHAucHJvdG90eXBlLmV4ZWMnO1xuXG5leHBvcnQgdmFyIFRlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qL2JpbmQuYmluZCh0ZXN0ICAgICAgICkgICAgICAgXG5cdDogZnVuY3Rpb24gKHJlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRcdHJldHVybiB0ZXN0LmNhbGwocmUsIHN0cmluZyk7XG5cdFx0fTtcblx0fTtcblxuZXhwb3J0IHZhciBFeGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoZXhlYyAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gZXhlYy5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn07XG5cbiAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZT8nO1xuaW1wb3J0IGJpbmQgZnJvbSAnLkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBQcm94eSBmcm9tICcuUHJveHk/JztcblxuaW1wb3J0IHsgVGVzdCwgRXhlYyB9IGZyb20gJy4vdGhlUmVnRXhwJztcblxudmFyIE5UID0gL1tcXG5cXHRdKy9nO1xudmFyIEVTQ0FQRSA9IC9cXFxcLi9nO1xuZnVuY3Rpb24gZ3JhdmVBY2NlbnRSZXBsYWNlciAoJCQgICAgICAgICkgeyByZXR1cm4gJCQ9PT0nXFxcXGAnID8gJ2AnIDogJCQ7IH1cblxudmFyIGluY2x1ZGVzID0gJycuaW5jbHVkZXMgICAgICAgXG5cdD8gZnVuY3Rpb24gKHRoYXQgICAgICAgICwgc2VhcmNoU3RyaW5nICAgICAgICApIHsgcmV0dXJuIHRoYXQuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKTsgfVxuXHQ6IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKT4tMTsgfTtcblxuZnVuY3Rpb24gUkUgKCAgICAgICAgICAgICAgIHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgVSA9IHRoaXMuVTtcblx0dmFyIEkgPSB0aGlzLkk7XG5cdHZhciBNID0gdGhpcy5NO1xuXHR2YXIgUyA9IHRoaXMuUztcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXSAucmVwbGFjZShOVCwgJycpO1xuXHR2YXIgaW5kZXggPSAxO1xuXHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHR2YXIgdmFsdWUgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICkgeyBzb3VyY2UgKz0gdmFsdWU7IH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciB2YWx1ZV9zb3VyY2UgPSB2YWx1ZS5zb3VyY2U7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZV9zb3VyY2UhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKCdzb3VyY2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS51bmljb2RlPT09VSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3VuaWNvZGUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5pZ25vcmVDYXNlPT09SSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2lnbm9yZUNhc2UnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5tdWx0aWxpbmU9PT1NICYmICggaW5jbHVkZXModmFsdWVfc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJyQnKSApICkgeyB0aHJvdyBTeW50YXhFcnJvcignbXVsdGlsaW5lJyk7IH1cblx0XHRcdGlmICggdmFsdWUuZG90QWxsPT09UyAmJiBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICcuJykgKSB7IHRocm93IFN5bnRheEVycm9yKCdkb3RBbGwnKTsgfVxuXHRcdFx0c291cmNlICs9IHZhbHVlX3NvdXJjZTtcblx0XHR9XG5cdFx0c291cmNlICs9IHJhd1tpbmRleCsrXSAucmVwbGFjZShOVCwgJycpO1xuXHR9XG5cdHZhciByZSAgICAgICAgID0gUmVnRXhwKFUgPyBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShFU0NBUEUsIGdyYXZlQWNjZW50UmVwbGFjZXIpIDogc291cmNlLCB0aGlzLmZsYWdzKTtcblx0dmFyIHRlc3QgPSByZS50ZXN0ID0gVGVzdChyZSk7XG5cdHZhciBleGVjID0gcmUuZXhlYyA9IEV4ZWMocmUpO1xuXHR0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSBVO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSBJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/IE0gOiBudWxsO1xuXHR0ZXN0LmRvdEFsbCA9IGV4ZWMuZG90QWxsID0gaW5jbHVkZXMoc291cmNlLCAnLicpID8gUyA6IG51bGw7XG5cdHJldHVybiByZTtcbn1cblxudmFyIFJFX2JpbmQgPSBiaW5kICYmIC8qI19fUFVSRV9fKi9iaW5kLmJpbmQoUkUgICAgICAgKTtcblxuZnVuY3Rpb24gQ29udGV4dCAoZmxhZ3MgICAgICAgICkgICAgICAgICAge1xuXHRyZXR1cm4ge1xuXHRcdFU6ICFpbmNsdWRlcyhmbGFncywgJ3UnKSxcblx0XHRJOiAhaW5jbHVkZXMoZmxhZ3MsICdpJyksXG5cdFx0TTogIWluY2x1ZGVzKGZsYWdzLCAnbScpLFxuXHRcdFM6ICFpbmNsdWRlcyhmbGFncywgJ3MnKSxcblx0XHRmbGFnczogZmxhZ3Ncblx0fTtcbn1cblxudmFyIENPTlRFWFQgICAgICAgICAgPSAvKiNfX1BVUkVfXyovQ29udGV4dCgnJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb3h5XG5cdD8gLyojX19QVVJFX18qL25ldyBQcm94eShSRSwge1xuXHRcdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdFx0LFxuXHRcdGdldDogZnVuY3Rpb24gKFJFLCBmbGFncyAgICAgICAgKSB7IHJldHVybiBSRV9iaW5kKENvbnRleHQoZmxhZ3MpKTsgfVxuXHRcdCxcblx0XHRkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHQsXG5cdFx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH0pXG5cdDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHRSRS5hcHBseSA9IFJFLmFwcGx5O1xuXHRcdHZhciBuZXdSZWdFeHAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShDT05URVhULCBhcmd1bWVudHMgICAgICAgKTsgfSAgICAgICA7XG5cdFx0Zm9yICggdmFyIGZsYWdzID0gNjM7IGZsYWdzLS07ICkge1xuXHRcdFx0KCBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0XHRuZXdSZWdFeHBbY29udGV4dC5mbGFnc10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBSRS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMgICAgICAgKTsgfTtcblx0XHRcdH0gKShDb250ZXh0KFxuXHRcdFx0XHQoIGZsYWdzICYgMzIgPyAnJyA6ICdnJyApICtcblx0XHRcdFx0KCBmbGFncyAmIDE2ID8gJycgOiAnaScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgOCA/ICcnIDogJ20nICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDQgPyAnJyA6ICdzJyApICtcblx0XHRcdFx0KCBmbGFncyAmICAyID8gJycgOiAndScgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMSA/ICcnIDogJ3knIClcblx0XHRcdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gZnJlZXplID8gZnJlZXplKG5ld1JlZ0V4cCkgOiBuZXdSZWdFeHA7XG5cdH0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA9IC8qI19fUFVSRV9fKi9jcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0gKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZShjaGFyYWN0ZXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyYWN0ZXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyYWN0ZXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyYWN0ZXJdICwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcmFjdGVyKSApIHsgY2hhcmFjdGVyID0gJ1xcXFwnICsgY2hhcmFjdGVyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXJhY3RlciArIHN1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSAgOiAnWycgKyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpICsgJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicgKyBicmFuY2hlcy5qb2luKCd8JykgKyAnKSdcblx0XHQpXG5cdFx0KyAoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IHRoZVJlZ0V4cCBmcm9tICcuL3RoZVJlZ0V4cCc7XG5pbXBvcnQgbmV3UmVnRXhwIGZyb20gJy4vbmV3UmVnRXhwJztcbmltcG9ydCBjbGVhclJlZ0V4cCBmcm9tICcuL2NsZWFyUmVnRXhwJztcbmltcG9ydCBncm91cGlmeSBmcm9tICcuL2dyb3VwaWZ5JztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0bmV3UmVnRXhwLFxuXHR0aGVSZWdFeHAsXG5cdGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeSxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdG5ld1JlZ0V4cDogbmV3UmVnRXhwLFxuXHR0aGVSZWdFeHA6IHRoZVJlZ0V4cCxcblx0Y2xlYXJSZWdFeHA6IGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgJzMuMi4wJzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdCd1bmljb2RlJyBpbiBSZWdFeHBfcHJvdG90eXBlXG5cdFx0PyBSZWdFeHAoJ1tcXFxcdUQ4MDAtXFxcXHVERkZGXScsICd1Jylcblx0XHQ6IC9bXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS9cbik7XG5cbi8vIFxcdXsxMTAwMDB9LVxcdXtGRkZGRkZGRn0gLT4gXFx1RkZGRFxuIiwiaW1wb3J0IGZyb20gZnJvbSAnLkJ1ZmZlci5mcm9tPyc7XG5cbmltcG9ydCBOT05fU0NBTEFSIGZyb20gJy4vTk9OX1NDQUxBUic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1ZmZlcjJudW1iZXIgKGJ1ZmZlciAgICAgICAgLCBzdGFydHNXaXRoQVNDSUkgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIHVjcyAgICAgICAgICAgICAgIDtcblx0dmFyIHN3YXBwZWQgICAgICAgICAgICAgICAgICAgIDtcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYnVmZmVyLmxlbmd0aDtcblx0aWYgKCAhbGVuZ3RoICkgeyByZXR1cm4gLTE7IH1cblx0dmFyIGZpcnN0Qnl0ZSAgICAgICAgID0gYnVmZmVyWzBdO1xuXHRpZiAoIGZpcnN0Qnl0ZT09PTB4RUYgKSB7XG5cdFx0aWYgKCBsZW5ndGg9PT0xIHx8IGJ1ZmZlclsxXSE9PTB4QkIgKSB7IHJldHVybiAxOyB9XG5cdFx0aWYgKCBsZW5ndGg9PT0yIHx8IGJ1ZmZlclsyXSE9PTB4QkYgKSB7IHJldHVybiAyOyB9XG5cdH1cblx0ZWxzZSBpZiAoIGZpcnN0Qnl0ZT09PTB4RkYgKSB7XG5cdFx0aWYgKCBsZW5ndGg9PT0xIHx8IGJ1ZmZlclsxXSE9PTB4RkUgKSB7IHJldHVybiAxOyB9XG5cdFx0aWYgKCBsZW5ndGglMiApIHsgcmV0dXJuIGxlbmd0aDsgfVxuXHRcdHVjcyA9IDI7XG5cdH1cblx0ZWxzZSBpZiAoIGZpcnN0Qnl0ZT09PTB4RkUgKSB7XG5cdFx0aWYgKCBsZW5ndGg9PT0xIHx8IGJ1ZmZlclsxXSE9PTB4RkYgKSB7IHJldHVybiAxOyB9XG5cdFx0aWYgKCBsZW5ndGglMiApIHsgcmV0dXJuIGxlbmd0aDsgfVxuXHRcdHVjcyA9IDI7XG5cdFx0c3dhcHBlZCA9IGJ1ZmZlci5zd2FwMTYoKTtcblx0fVxuXHRlbHNlIGlmICggc3RhcnRzV2l0aEFTQ0lJICkge1xuXHRcdGlmICggZmlyc3RCeXRlPT09MHgwMCApIHtcblx0XHRcdGlmICggbGVuZ3RoPjIgJiYgYnVmZmVyWzJdPT09MHgwMCApIHsgcmV0dXJuIDI7IH1cblx0XHRcdGlmICggbGVuZ3RoJTIgKSB7IHJldHVybiBsZW5ndGg7IH1cblx0XHRcdHVjcyA9IDI7XG5cdFx0XHRzd2FwcGVkID0gYnVmZmVyLnN3YXAxNigpO1xuXHRcdH1cblx0XHRlbHNlIGlmICggbGVuZ3RoPjEgJiYgYnVmZmVyWzFdPT09MHgwMCApIHtcblx0XHRcdGlmICggbGVuZ3RoPjMgJiYgYnVmZmVyWzNdPT09MHgwMCApIHsgcmV0dXJuIDM7IH1cblx0XHRcdGlmICggbGVuZ3RoJTIgKSB7IHJldHVybiBsZW5ndGg7IH1cblx0XHRcdHVjcyA9IDI7XG5cdFx0fVxuXHR9XG5cdHZhciBzdHJpbmcgICAgICAgIDtcblx0dmFyIGNvZGVkICAgICAgICA7XG5cdGlmICggdWNzICkge1xuXHRcdGNvZGVkID0gZnJvbShzdHJpbmcgPSBidWZmZXIudG9TdHJpbmcoJ3VjczInKSwgJ3VjczInKTtcblx0XHRpZiAoIHN3YXBwZWQgKSB7XG5cdFx0XHRjb2RlZC5zd2FwMTYoKTtcblx0XHRcdGJ1ZmZlci5zd2FwMTYoKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7IGNvZGVkID0gZnJvbShzdHJpbmcgPSBidWZmZXIudG9TdHJpbmcoKSk7IH1cblx0dmFyIGNvZGVkTGVuZ3RoICAgICAgICAgPSBjb2RlZC5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDA7XG5cdGlmICggY29kZWRMZW5ndGg9PT1sZW5ndGggKSB7XG5cdFx0Zm9yICggOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIGNvZGVkW2luZGV4XSE9PWJ1ZmZlcltpbmRleF0gKSB7IHJldHVybiBpbmRleDsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc3RyaW5nLnNlYXJjaChOT05fU0NBTEFSKTtcblx0fVxuXHRpZiAoIGxlbmd0aD5jb2RlZExlbmd0aCApIHsgbGVuZ3RoID0gY29kZWRMZW5ndGg7IH1cblx0Zm9yICggOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCBjb2RlZFtpbmRleF0hPT1idWZmZXJbaW5kZXhdICkgeyByZXR1cm4gaW5kZXg7IH1cblx0fVxuXHRyZXR1cm4gaW5kZXg7XG59O1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcblxuaW1wb3J0IE5PTl9TQ0FMQVIgZnJvbSAnLi9OT05fU0NBTEFSJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVmZmVyMnN0cmluZyAoYnVmZmVyICAgICAgICAsIG9wdGlvbnMgICAgICAgICAgKSAgICAgICAgIHtcblx0XG5cdHZhciBsZW5ndGggICAgICAgICA9IGJ1ZmZlci5sZW5ndGg7XG5cdGlmICggIWxlbmd0aCApIHsgcmV0dXJuICcnOyB9XG5cdFxuXHR2YXIgZW5jb2RpbmcgICAgICAgICAgICAgICAgICAgIDtcblx0dmFyIHN3YXBwZWQgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdFxuXHRcblx0dmFyIHRocm93RXJyb3IgICAgICAgICAgPSAhb3B0aW9ucyB8fCBvcHRpb25zLnRocm93RXJyb3IhPT1mYWxzZTtcblx0XG5cdHZhciBmaXJzdEJ5dGUgICAgICAgICA9IGJ1ZmZlclswXTtcblx0aWYgKCBmaXJzdEJ5dGU9PT0weEVGICkge1xuXHRcdGlmICggbGVuZ3RoPjIgJiYgYnVmZmVyWzFdPT09MHhCQiAmJiBidWZmZXJbMl09PT0weEJGICkge1xuXHRcdFx0aWYgKCAhb3B0aW9ucyB8fCBvcHRpb25zLnN0cmlwQk9NIT09ZmFsc2UgKSB7IGJ1ZmZlciA9IGJ1ZmZlci5zbGljZSgzKTsgfVxuXHRcdFx0XG5cdFx0XHRcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7IHRocm93IEVycm9yKCfmrovnoLTnmoQgVVRGLTggQk9NIOWktCcpOyB9XG5cdFx0XHRcblx0XHRcdFxuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggZmlyc3RCeXRlPT09MHhGRiApIHtcblx0XHRpZiAoIGxlbmd0aD4xICYmIGJ1ZmZlclsxXT09PTB4RkUgKSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgJiYgbGVuZ3RoJTIgKSB7IHRocm93IEVycm9yKCdVVEYtMTYg55qE5a2X6IqC5pWw5b+F6aG75Li6IDIg55qE5YCN5pWwJyk7IH1cblx0XHRcdGlmICggIW9wdGlvbnMgfHwgb3B0aW9ucy5zdHJpcEJPTSE9PWZhbHNlICkgeyBidWZmZXIgPSBidWZmZXIuc2xpY2UoMik7IH1cblx0XHRcdGVuY29kaW5nID0gJ3VjczInO1xuXHRcdFx0XG5cdFx0XHRcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7IHRocm93IEVycm9yKCfmrovnoLTnmoQgVVRGLTE2TEUgQk9NIOWktCcpOyB9XG5cdFx0XHRcblx0XHRcdFxuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggZmlyc3RCeXRlPT09MHhGRSApIHtcblx0XHRpZiAoIGxlbmd0aD4xICYmIGJ1ZmZlclsxXT09PTB4RkYgKSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgJiYgbGVuZ3RoJTIgKSB7IHRocm93IEVycm9yKCdVVEYtMTYg55qE5a2X6IqC5pWw5b+F6aG75Li6IDIg55qE5YCN5pWwJyk7IH1cblx0XHRcdGJ1ZmZlci5zd2FwMTYoKTtcblx0XHRcdGlmICggb3B0aW9ucyApIHtcblx0XHRcdFx0aWYgKCAhb3B0aW9ucy5zd2FwcGFibGUgKSB7IHN3YXBwZWQgPSBidWZmZXI7IH1cblx0XHRcdFx0aWYgKCBvcHRpb25zLnN0cmlwQk9NIT09ZmFsc2UgKSB7IGJ1ZmZlciA9IGJ1ZmZlci5zbGljZSgyKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHN3YXBwZWQgPSBidWZmZXI7XG5cdFx0XHRcdGJ1ZmZlciA9IGJ1ZmZlci5zbGljZSgyKTtcblx0XHRcdH1cblx0XHRcdGVuY29kaW5nID0gJ3VjczInO1xuXHRcdFx0XG5cdFx0XHRcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7IHRocm93IEVycm9yKCfmrovnoLTnmoQgVVRGLTE2QkUgQk9NIOWktCcpOyB9XG5cdFx0XHRcblx0XHRcdFxuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0c1dpdGhBU0NJSSApIHtcblx0XHRpZiAoIGZpcnN0Qnl0ZT09PTB4MDAgKSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7XG5cdFx0XHRcdGlmICggbGVuZ3RoPjIgJiYgYnVmZmVyWzJdPT09MHgwMCApIHsgdGhyb3cgRXJyb3IoJ+aaguS4jeaUr+aMgSBVVEYtMzIg57yW56CBJyk7IH1cblx0XHRcdFx0aWYgKCBsZW5ndGglMiApIHsgdGhyb3cgRXJyb3IoJ1VURi0xNiDnmoTlrZfoioLmlbDlv4XpobvkuLogMiDnmoTlgI3mlbAnKTsgfVxuXHRcdFx0fVxuXHRcdFx0YnVmZmVyLnN3YXAxNigpO1xuXHRcdFx0aWYgKCAhb3B0aW9ucy5zd2FwcGFibGUgKSB7IHN3YXBwZWQgPSBidWZmZXI7IH1cblx0XHRcdGVuY29kaW5nID0gJ3VjczInO1xuXHRcdFx0XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBsZW5ndGg+MSAmJiBidWZmZXJbMV09PT0weDAwICkge1xuXHRcdFx0aWYgKCB0aHJvd0Vycm9yICkge1xuXHRcdFx0XHRpZiAoIGxlbmd0aD4zICYmIGJ1ZmZlclszXT09PTB4MDAgKSB7IHRocm93IEVycm9yKCfmmoLkuI3mlK/mjIEgVVRGLTMyIOe8lueggScpOyB9XG5cdFx0XHRcdGlmICggbGVuZ3RoJTIgKSB7IHRocm93IEVycm9yKCdVVEYtMTYg55qE5a2X6IqC5pWw5b+F6aG75Li6IDIg55qE5YCN5pWwJyk7IH1cblx0XHRcdH1cblx0XHRcdGVuY29kaW5nID0gJ3VjczInO1xuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdFxuXHR9XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0dmFyIHN0cmluZyAgICAgICAgID0gZW5jb2RpbmcgPyBidWZmZXIudG9TdHJpbmcoZW5jb2RpbmcpIDogYnVmZmVyLnRvU3RyaW5nKCk7XG5cdGlmICggdGhyb3dFcnJvciApIHtcblx0XHRpZiAoIGZyb20oc3RyaW5nLCBlbmNvZGluZykuZXF1YWxzKGJ1ZmZlcikgKSB7XG5cdFx0XHRzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7XG5cdFx0XHRpZiAoIE5PTl9TQ0FMQVIudGVzdChzdHJpbmcpICkgeyB0aHJvdyBFcnJvcign5Luj55CG5a+556CB54K55LiN6IO95Y2V54us5Ye6546wJyk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7XG5cdFx0XHR0aHJvdyBFcnJvcign5paH5Lu25Lit5a2Y5Zyo6LaF5Ye6IFVuaWNvZGUg6KGo56S66IyD5Zu055qE5YaF5a65Jyk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgeyBzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7IH1cblx0cmV0dXJuIHN0cmluZztcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgZnJvbSBmcm9tICcuQnVmZmVyLmZyb20/JztcblxuaW1wb3J0IE5PTl9TQ0FMQVIgZnJvbSAnLi9OT05fU0NBTEFSJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVmZmVyMm9iamVjdCAoYnVmZmVyICAgICAgICAsIG9wdGlvbnMgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYnVmZmVyLmxlbmd0aDtcblx0aWYgKCAhbGVuZ3RoICkgeyByZXR1cm4geyBCT006ICcnLCBVVEY6ICcnLCBzdHJpbmc6ICcnIH07IH1cblx0XG5cdHZhciBlbmNvZGluZyAgICAgICAgICAgICAgICAgICAgO1xuXHR2YXIgc3dhcHBlZCAgICAgICAgICAgICAgICAgICAgO1xuXHR2YXIgQk9NICAgICAgICAgICAgICAgO1xuXHR2YXIgVVRGICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdHZhciB0aHJvd0Vycm9yICAgICAgICAgID0gIW9wdGlvbnMgfHwgb3B0aW9ucy50aHJvd0Vycm9yIT09ZmFsc2U7XG5cdFxuXHR2YXIgZmlyc3RCeXRlICAgICAgICAgPSBidWZmZXJbMF07XG5cdGlmICggZmlyc3RCeXRlPT09MHhFRiApIHtcblx0XHRpZiAoIGxlbmd0aD4yICYmIGJ1ZmZlclsxXT09PTB4QkIgJiYgYnVmZmVyWzJdPT09MHhCRiApIHtcblx0XHRcdGlmICggIW9wdGlvbnMgfHwgb3B0aW9ucy5zdHJpcEJPTSE9PWZhbHNlICkgeyBidWZmZXIgPSBidWZmZXIuc2xpY2UoMyk7IH1cblx0XHRcdEJPTSA9ICdcXHVGRUZGJztcblx0XHRcdFVURiA9ICc4Jztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7IHRocm93IEVycm9yKCfmrovnoLTnmoQgVVRGLTggQk9NIOWktCcpOyB9XG5cdFx0XHRCT00gPSAnJztcblx0XHRcdFVURiA9ICcnO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggZmlyc3RCeXRlPT09MHhGRiApIHtcblx0XHRpZiAoIGxlbmd0aD4xICYmIGJ1ZmZlclsxXT09PTB4RkUgKSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgJiYgbGVuZ3RoJTIgKSB7IHRocm93IEVycm9yKCdVVEYtMTYg55qE5a2X6IqC5pWw5b+F6aG75Li6IDIg55qE5YCN5pWwJyk7IH1cblx0XHRcdGlmICggIW9wdGlvbnMgfHwgb3B0aW9ucy5zdHJpcEJPTSE9PWZhbHNlICkgeyBidWZmZXIgPSBidWZmZXIuc2xpY2UoMik7IH1cblx0XHRcdGVuY29kaW5nID0gJ3VjczInO1xuXHRcdFx0Qk9NID0gJ1xcdUZFRkYnO1xuXHRcdFx0VVRGID0gJzE2TEUnO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggdGhyb3dFcnJvciApIHsgdGhyb3cgRXJyb3IoJ+aui+egtOeahCBVVEYtMTZMRSBCT00g5aS0Jyk7IH1cblx0XHRcdEJPTSA9ICcnO1xuXHRcdFx0VVRGID0gJyc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBmaXJzdEJ5dGU9PT0weEZFICkge1xuXHRcdGlmICggbGVuZ3RoPjEgJiYgYnVmZmVyWzFdPT09MHhGRiApIHtcblx0XHRcdGlmICggdGhyb3dFcnJvciAmJiBsZW5ndGglMiApIHsgdGhyb3cgRXJyb3IoJ1VURi0xNiDnmoTlrZfoioLmlbDlv4XpobvkuLogMiDnmoTlgI3mlbAnKTsgfVxuXHRcdFx0YnVmZmVyLnN3YXAxNigpO1xuXHRcdFx0aWYgKCBvcHRpb25zICkge1xuXHRcdFx0XHRpZiAoICFvcHRpb25zLnN3YXBwYWJsZSApIHsgc3dhcHBlZCA9IGJ1ZmZlcjsgfVxuXHRcdFx0XHRpZiAoIG9wdGlvbnMuc3RyaXBCT00hPT1mYWxzZSApIHsgYnVmZmVyID0gYnVmZmVyLnNsaWNlKDIpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3dhcHBlZCA9IGJ1ZmZlcjtcblx0XHRcdFx0YnVmZmVyID0gYnVmZmVyLnNsaWNlKDIpO1xuXHRcdFx0fVxuXHRcdFx0ZW5jb2RpbmcgPSAndWNzMic7XG5cdFx0XHRCT00gPSAnXFx1RkVGRic7XG5cdFx0XHRVVEYgPSAnMTZCRSc7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCB0aHJvd0Vycm9yICkgeyB0aHJvdyBFcnJvcign5q6L56C055qEIFVURi0xNkJFIEJPTSDlpLQnKTsgfVxuXHRcdFx0Qk9NID0gJyc7XG5cdFx0XHRVVEYgPSAnJztcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydHNXaXRoQVNDSUkgKSB7XG5cdFx0aWYgKCBmaXJzdEJ5dGU9PT0weDAwICkge1xuXHRcdFx0aWYgKCB0aHJvd0Vycm9yICkge1xuXHRcdFx0XHRpZiAoIGxlbmd0aD4yICYmIGJ1ZmZlclsyXT09PTB4MDAgKSB7IHRocm93IEVycm9yKCfmmoLkuI3mlK/mjIEgVVRGLTMyIOe8lueggScpOyB9XG5cdFx0XHRcdGlmICggbGVuZ3RoJTIgKSB7IHRocm93IEVycm9yKCdVVEYtMTYg55qE5a2X6IqC5pWw5b+F6aG75Li6IDIg55qE5YCN5pWwJyk7IH1cblx0XHRcdH1cblx0XHRcdGJ1ZmZlci5zd2FwMTYoKTtcblx0XHRcdGlmICggIW9wdGlvbnMuc3dhcHBhYmxlICkgeyBzd2FwcGVkID0gYnVmZmVyOyB9XG5cdFx0XHRlbmNvZGluZyA9ICd1Y3MyJztcblx0XHRcdFVURiA9ICcxNkJFJztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGxlbmd0aD4xICYmIGJ1ZmZlclsxXT09PTB4MDAgKSB7XG5cdFx0XHRpZiAoIHRocm93RXJyb3IgKSB7XG5cdFx0XHRcdGlmICggbGVuZ3RoPjMgJiYgYnVmZmVyWzNdPT09MHgwMCApIHsgdGhyb3cgRXJyb3IoJ+aaguS4jeaUr+aMgSBVVEYtMzIg57yW56CBJyk7IH1cblx0XHRcdFx0aWYgKCBsZW5ndGglMiApIHsgdGhyb3cgRXJyb3IoJ1VURi0xNiDnmoTlrZfoioLmlbDlv4XpobvkuLogMiDnmoTlgI3mlbAnKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZW5jb2RpbmcgPSAndWNzMic7XG5cdFx0XHRVVEYgPSAnMTZMRSc7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0VVRGID0gJzgnO1xuXHRcdH1cblx0XHRCT00gPSAnJztcblx0fVxuXHRlbHNlIHtcblx0XHRCT00gPSAnJztcblx0XHRVVEYgPSAnJztcblx0fVxuXHRcblx0dmFyIHN0cmluZyAgICAgICAgID0gZW5jb2RpbmcgPyBidWZmZXIudG9TdHJpbmcoZW5jb2RpbmcpIDogYnVmZmVyLnRvU3RyaW5nKCk7XG5cdGlmICggdGhyb3dFcnJvciApIHtcblx0XHRpZiAoIGZyb20oc3RyaW5nLCBlbmNvZGluZykuZXF1YWxzKGJ1ZmZlcikgKSB7XG5cdFx0XHRzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7XG5cdFx0XHRpZiAoIE5PTl9TQ0FMQVIudGVzdChzdHJpbmcpICkgeyB0aHJvdyBFcnJvcign5Luj55CG5a+556CB54K55LiN6IO95Y2V54us5Ye6546wJyk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7XG5cdFx0XHR0aHJvdyBFcnJvcign5paH5Lu25Lit5a2Y5Zyo6LaF5Ye6IFVuaWNvZGUg6KGo56S66IyD5Zu055qE5YaF5a65Jyk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgeyBzd2FwcGVkICYmIHN3YXBwZWQuc3dhcDE2KCk7IH1cblx0cmV0dXJuIHsgQk9NLCBVVEYsIHN0cmluZyB9O1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFJlZ0V4cF9wcm90b3R5cGUgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuXG52YXIgUE9JTlRTID1cblx0J2RvdEFsbCcgaW4gUmVnRXhwX3Byb3RvdHlwZSAmJiAndW5pY29kZScgaW4gUmVnRXhwX3Byb3RvdHlwZSA/IFJlZ0V4cCgnLicsICdnc3UnKSA6XG5cdFx0J2JpbmQnIGluIFJlZ0V4cCA/IFJlZ0V4cCgnW1xcXFx1RDgwMC1cXFxcdURCRkZdW1xcXFx1REMwMC1cXFxcdURGRkZdfFteXS8nLCAnZycpIDpcblx0XHRcdC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHNcXFNdL2c7XG5cbnZhciBQT0lOVFNfQ1JMRiA9XG5cdCdkb3RBbGwnIGluIFJlZ0V4cF9wcm90b3R5cGUgJiYgJ3VuaWNvZGUnIGluIFJlZ0V4cF9wcm90b3R5cGUgPyBSZWdFeHAoJ1xcXFxyXFxcXG58LicsICdnc3UnKSA6XG5cdFx0J2JpbmQnIGluIFJlZ0V4cCA/IFJlZ0V4cCgnXFxcXHJcXFxcbnxbXFxcXHVEODAwLVxcXFx1REJGRl1bXFxcXHVEQzAwLVxcXFx1REZGRl18W15dLycsICdnJykgOlxuXHRcdFx0L1xcclxcbnxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHNcXFNdL2c7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmluZzJhcnJheSAoc3RyaW5nICAgICAgICAsIGNybGYgICAgICAgICAgKSAgICAgICAgICAge1xuXHRyZXR1cm4gc3RyaW5nID8gc3RyaW5nLm1hdGNoKGNybGYgPyBQT0lOVFNfQ1JMRiA6IFBPSU5UUykgIDogW107XG59O1xuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xyXG5pbXBvcnQgYnVmZmVyMm51bWJlciBmcm9tICcuL2J1ZmZlcjJudW1iZXInO1xyXG5pbXBvcnQgYnVmZmVyMnN0cmluZyBmcm9tICcuL2J1ZmZlcjJzdHJpbmcnO1xyXG5pbXBvcnQgYnVmZmVyMm9iamVjdCBmcm9tICcuL2J1ZmZlcjJvYmplY3QnO1xyXG5pbXBvcnQgc3RyaW5nMmFycmF5IGZyb20gJy4vc3RyaW5nMmFycmF5JztcclxuaW1wb3J0IE5PTl9TQ0FMQVIgZnJvbSAnLi9OT05fU0NBTEFSJztcclxuXHJcbmV4cG9ydCB7XHJcblx0dmVyc2lvbixcclxuXHRidWZmZXIybnVtYmVyLFxyXG5cdGJ1ZmZlcjJvYmplY3QsXHJcblx0YnVmZmVyMnN0cmluZyxcclxuXHRzdHJpbmcyYXJyYXksXHJcblx0Tk9OX1NDQUxBUixcclxufTtcclxuXHJcbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xyXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcclxuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxyXG5cdGJ1ZmZlcjJudW1iZXI6IGJ1ZmZlcjJudW1iZXIsXHJcblx0YnVmZmVyMm9iamVjdDogYnVmZmVyMm9iamVjdCxcclxuXHRidWZmZXIyc3RyaW5nOiBidWZmZXIyc3RyaW5nLFxyXG5cdHN0cmluZzJhcnJheTogc3RyaW5nMmFycmF5LFxyXG5cdE5PTl9TQ0FMQVI6IE5PTl9TQ0FMQVJcclxufSk7XHJcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5cbi8vaW1wb3J0ICogYXMgb3B0aW9uc1xcJDAgZnJvbSAnLi9vcHRpb25zXFwkMCc7XG5cbmNvbnN0IE5PTkUgICAgICAgICAgICAgICAgICAgID0gW107XG5sZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5sZXQgc291cmNlTGluZXMgICAgICAgICAgICAgICAgICAgID0gTk9ORTtcbmxldCBsYXN0TGluZUluZGV4ICAgICAgICAgPSAtMTtcbmV4cG9ydCBsZXQgbGluZUluZGV4ICAgICAgICAgPSAtMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgIFxuIFxuZXhwb3J0IGNvbnN0IHRocm93cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSAoZXJyb3IgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHQvL2lmICggc291cmNlTGluZXMhPT1OT05FICkgeyBkb25lKCk7IG9wdGlvbnNcXCQwLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBwcmV2aW91cyA9IG5ldyBXZWFrTWFwICAgICAgICAgICAgKCk7XG5jb25zdCBwcmV2aW91c19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQocHJldmlvdXMpICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBwcmV2aW91c19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQocHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IG5vb3AgICAgICAgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB7XG5cdGNvbnN0IG5vb3AgICAgICAgPSAoKSAgICAgICAgID0+ICcnO1xuXHRwcmV2aW91c19zZXQobm9vcCwgbm9vcCk7XG5cdHJldHVybiBub29wO1xufSApKCk7XG5cbmV4cG9ydCBsZXQgc3RhY2tzX2xlbmd0aCA9IDA7XG5sZXQgbGFzdCAgICAgICA9IG5vb3A7XG5cbmV4cG9ydCBjb25zdCBjb3VsZCA9ICgpICAgICAgID0+IHtcblx0aWYgKCBzb3VyY2VMaW5lcyE9PU5PTkUgKSB7IHRocm93IEVycm9yKCdJbnRlcm5hbCBlcnJvcjogcGFyc2luZyBkdXJpbmcgcGFyc2luZy4nKTsgfVxufTtcblxuY29uc3QgRU9MID0gL1xccj9cXG4vO1xuZXhwb3J0IGNvbnN0IHRvZG8gPSAoc291cmNlICAgICAgICAsIHBhdGggICAgICAgICkgICAgICAgPT4ge1xuXHRpZiAoIHR5cGVvZiBwYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwsc291cmNlUGF0aCknKTsgfVxuXHRzb3VyY2VQYXRoID0gcGF0aDtcblx0c291cmNlTGluZXMgPSBzb3VyY2Uuc3BsaXQoRU9MKTtcblx0bGFzdExpbmVJbmRleCA9IHNvdXJjZUxpbmVzLmxlbmd0aCAtIDE7XG5cdGxpbmVJbmRleCA9IC0xO1xuXHRzdGFja3NfbGVuZ3RoID0gMDtcblx0bGFzdCA9IG5vb3A7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY29uc3QgbWFyayA9ICh0eXBlICAgICAgICApID0+ICggeyB0eXBlLCBsaW5lSW5kZXggfSApO1xuXG5leHBvcnQgY29uc3QgbXVzdCA9IChtYXJrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7bWFya2VyLnR5cGV9IGlzIG5vdCBjbG9zZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBmaWxlYCArIHdoZXJlKCcsIHdoaWNoIHN0YXJ0ZWQgZnJvbSAnLCBtYXJrZXIubGluZUluZGV4KSkpO1xuXHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcbn07XG5cbmV4cG9ydCBjb25zdCB3aGVyZSA9IChwcmUgICAgICAgICwgaW5kZXggICAgICAgICA9IGxpbmVJbmRleCkgICAgICAgICA9PiBzb3VyY2VMaW5lcz09PU5PTkUgPyAnJyA6XG5cdHNvdXJjZVBhdGhcblx0XHQ/IGBcXG4gICAgYXQgKCR7c291cmNlUGF0aH06JHtpbmRleCArIDF9OjEpYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtpbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW2luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG5cdGxhc3QgPSBub29wO1xufTtcblxuZXhwb3J0IGNvbnN0IHN0YWNrc19wb3AgPSAoKSAgICAgICA9PiB7XG5cdGNvbnN0IGl0ZW0gICAgICAgPSBsYXN0O1xuXHRsYXN0ID0gcHJldmlvdXNfZ2V0KGxhc3QpO1xuXHQtLXN0YWNrc19sZW5ndGg7XG5cdHJldHVybiBpdGVtO1xufTtcblxuZXhwb3J0IGNvbnN0IHN0YWNrc19wdXNoID0gKGl0ZW0gICAgICApICAgICAgID0+IHtcblx0cHJldmlvdXNfc2V0KGl0ZW0sIGxhc3QpO1xuXHRsYXN0ID0gaXRlbTtcblx0KytzdGFja3NfbGVuZ3RoO1xufTtcblxuZXhwb3J0IGNvbnN0IHN0YWNrc19pbnNlcnRCZWZvcmVMYXN0ID0gKGl0ZW0gICAgICApICAgICAgID0+IHtcblx0cHJldmlvdXNfc2V0KGl0ZW0sIHByZXZpb3VzX2dldChsYXN0KSk7XG5cdHByZXZpb3VzX3NldChsYXN0LCBpdGVtKTtcblx0KytzdGFja3NfbGVuZ3RoO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0JzcuMC4xJzsiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd25Qcm9wZXJ0eSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBoYXNPd25Qcm9wZXJ0eV9jYWxsID0gLyojX19QVVJFX18qL2hhc093blByb3BlcnR5LmNhbGwuYmluZChoYXNPd25Qcm9wZXJ0eSk7XG5cbmNvbnN0IG5ld1dlYWtNYXAgPSAoKSA9PiB7XG5cdGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcDtcblx0d2Vha01hcC5oYXMgPSB3ZWFrTWFwLmhhcztcblx0d2Vha01hcC5nZXQgPSB3ZWFrTWFwLmdldDtcblx0d2Vha01hcC5zZXQgPSB3ZWFrTWFwLnNldDtcblx0cmV0dXJuIHdlYWtNYXA7XG59O1xuY29uc3QgdGFyZ2V0MmtlZXBlciA9IC8qI19fUFVSRV9fKi9uZXdXZWFrTWFwKCkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCBwcm94eTJ0YXJnZXQgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCB0YXJnZXQycHJveHkgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBFeHRlcm5hbERlc2NyaXB0b3IgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNvdXJjZSAgICkgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICA7XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ2NvbmZpZ3VyYWJsZScpICkgeyB0YXJnZXQuY29uZmlndXJhYmxlID0gc291cmNlLmNvbmZpZ3VyYWJsZTsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAndmFsdWUnKSApIHsgdGFyZ2V0LnZhbHVlID0gc291cmNlLnZhbHVlOyB9XG5cdGlmICggaGFzT3duUHJvcGVydHlfY2FsbChzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHNvdXJjZSwgJ2dldCcpICkgeyB0YXJnZXQuZ2V0ID0gc291cmNlLmdldDsgfVxuXHRpZiAoIGhhc093blByb3BlcnR5X2NhbGwoc291cmNlLCAnc2V0JykgKSB7IHRhcmdldC5zZXQgPSBzb3VyY2Uuc2V0OyB9XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBoYW5kbGVycyAgICAgICAgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7XG5cdGRlZmluZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICwgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBoYXNPd25Qcm9wZXJ0eV9jYWxsKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdO1xuXHRcdGRlc2NyaXB0b3JNYXBba2V5XSA9IE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSkgKTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoZGVzY3JpcHRvck1hcCwga2VlcGVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOdWxsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gdGhyb3dDb25zdHJ1Y3RpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGggJ25ldydgKTsgfVxuXHRmdW5jdGlvbiB0aHJvd0FwcGx5aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRob3V0ICduZXcnYCk7IH1cblx0Y29uc3QgTnVsbGlmeSA9IChjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PiB7XG5cdFx0ZGVsZXRlIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcjtcblx0XHRPYmplY3RfZnJlZXplKGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHR9O1xuXHRmdW5jdGlvbiBOdWxsICggICAgICAgICAgIGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0cmV0dXJuIG5ldy50YXJnZXRcblx0XHRcdD8gbmV3LnRhcmdldD09PU51bGxcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovdGhyb3dDb25zdHJ1Y3RpbmcoKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi9uZXdQcm94eSh0aGlzLCBLZWVwZXIgICAgICgpKVxuXHRcdFx0OiB0eXBlb2YgY29uc3RydWN0b3I9PT0nZnVuY3Rpb24nXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL051bGxpZnkoY29uc3RydWN0b3IpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL3Rocm93QXBwbHlpbmcoKTtcblx0fVxuXHQvL0B0cy1pZ25vcmVcblx0TnVsbC5wcm90b3R5cGUgPSBudWxsO1xuXHRPYmplY3RfZGVmaW5lUHJvcGVydHkoTnVsbCwgJ25hbWUnLCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIHsgdmFsdWU6ICcnLCBjb25maWd1cmFibGU6IGZhbHNlIH0pKTtcblx0Ly9kZWxldGUgTnVsbC5sZW5ndGg7XG5cdE9iamVjdF9mcmVlemUoTnVsbCk7XG5cdHJldHVybiBOdWxsO1xufSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgREVGQVVMVCA9IC8qI19fUFVSRV9fKi9PYmplY3RfYXNzaWduKGNsYXNzIGV4dGVuZHMgbnVsbCB7IHdyaXRhYmxlICgpIHt9IGVudW1lcmFibGUgKCkge30gY29uZmlndXJhYmxlICgpIHt9IH0ucHJvdG90eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHtcblx0Y29uc3RydWN0b3I6IHVuZGVmaW5lZCxcblx0d3JpdGFibGU6IHRydWUsXG5cdGVudW1lcmFibGU6IHRydWUsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbn0pO1xuZXhwb3J0IGNvbnN0IGZyb21FbnRyaWVzID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHByb3RvICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2Zyb21FbnRyaWVzKGVudHJpZXMpO1xuXHRjb25zdCBrZWVwZXIgICAgICAgICAgICA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgKCksIFJlZmxlY3Rfb3duS2V5cyh0YXJnZXQpKTtcblx0aWYgKCBwcm90bz09PXVuZGVmaW5lZCApIHsgcmV0dXJuIG5ld1Byb3h5KHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpOyB9XG5cdGlmICggcHJvdG89PT1udWxsICkgeyByZXR1cm4gbmV3UHJveHkoT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKHByb3RvKSwgdGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpOyB9XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHQoIGRlc2NyaXB0b3JNYXBba2V5XSA9IE9iamVjdF9jcmVhdGUoREVGQVVMVCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS52YWx1ZSA9IHRhcmdldFtrZXldO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpO1xufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdGlzT3JkZXJlZCxcblx0aXMsXG5cdG9yZGVyaWZ5LFxuXHRjcmVhdGUsXG5cdGRlZmluZVByb3BlcnRpZXMsXG5cdE51bGwsXG5cdGZyb21FbnRyaWVzLFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzLFxufSk7XG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcbmltcG9ydCBkZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IE51bGwgYXMgb3JkZXJpZnlfTnVsbCB9IGZyb20gJ0BsdGQvai1vcmRlcmlmeSc7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBESVJFQ1RMWSA9IHRydWU7XG5leHBvcnQgY29uc3QgSU1QTElDSVRMWSA9IGZhbHNlO1xuY29uc3QgaW1wbGljaXRUYWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChpbXBsaWNpdFRhYmxlcyk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19oYXMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuZXhwb3J0IGNvbnN0IHdhc0RpcmVjdGx5ID0gKHRhYmxlICAgICAgICkgICAgICAgICAgPT4gIWltcGxpY2l0VGFibGVzX2hhcyh0YWJsZSk7XG5leHBvcnQgY29uc3QgZGlyZWN0bHkgPSAvKiNfX1BVUkVfXyovZGVsLmJpbmQoaW1wbGljaXRUYWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBJTkxJTkUgPSB0cnVlO1xuY29uc3QgaW5saW5lVGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbmxpbmVUYWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGlubGluZVRhYmxlcyk7XG5leHBvcnQgY29uc3QgaXNJbmxpbmUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoaW5saW5lVGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5jb25zdCBwYWlycyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgcGFpcnNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHBhaXJzKTtcbmV4cG9ydCBjb25zdCBmcm9tUGFpciA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChwYWlycykgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IFBsYWluVGFibGUgPSBOdWxsKGNsYXNzIFRhYmxlIGV4dGVuZHMgTnVsbCAgICAgIHtcblx0Y29uc3RydWN0b3IgKGlzRGlyZWN0ICAgICAgICAgICwgaXNJbmxpbmUgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0YWJsZXNfYWRkKHRoaXMpO1xuXHRcdGlzRGlyZWN0XG5cdFx0XHQ/IGlzSW5saW5lICYmIGlubGluZVRhYmxlc19hZGQodGhpcylcblx0XHRcdDogKCBpc0lubGluZSA/IHBhaXJzX2FkZCA6IGltcGxpY2l0VGFibGVzX2FkZCApKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IE9yZGVyZWRUYWJsZSA9IE51bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUgJiYgaW5saW5lVGFibGVzX2FkZCh0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5cbi8qIG5lc3RlZCAocmVhZGFibGUpICovXG5cbmNvbnN0IFdoaXRlc3BhY2UgPSAvWyBcXHRdLztcblxuZXhwb3J0IGNvbnN0IFBSRV9XSElURVNQQUNFID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReJHtXaGl0ZXNwYWNlfStgICkoKTtcblxuZXhwb3J0IGNvbnN0IFZBTFVFX1JFU1RfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQoXG5cdFx0KD86XFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQgXFxkKT9cblx0XHRbXFx3XFwtKy46XStcblx0KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5leHBvcnQgY29uc3QgTElURVJBTF9TVFJJTkdfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQnKFteJ10qKSdcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAuZXhlYyApKCk7XG5cbmNvbnN0IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMF8xXzIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICAgICAgYFxuXHReXG5cdCguKj8pXG5cdCcnJygnezAsMn0pXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLmV4ZWMgKSgpO1xuY29uc3QgTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoKVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC5leGVjICkoKTtcbmV4cG9ydFxubGV0IF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgU1lNX1dISVRFU1BBQ0UgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYCApKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCBLRVlfVkFMVUVfUEFJUl9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICBgXG5cdF5cblx0JHtXaGl0ZXNwYWNlfSpcblx0PVxuXHQke1doaXRlc3BhY2V9KlxuXHQoPzpcblx0XHQ8KCR7VGFnfSk+XG5cdFx0JHtXaGl0ZXNwYWNlfSpcblx0KT9cblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuZXhwb3J0IGNvbnN0IF9WQUxVRV9QQUlSX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLmV4ZWMgKSgpO1xuXG5jb25zdCBUQUdfUkVTVF9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwLnMgICAgICAgYFxuXHReXG5cdDwoJHtUYWd9KT5cblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC5leGVjICkoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJdK3xcXFxcLnxcIlwiPyg/IVwiKSkvcykuZXhlYyApKCk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wID0gKF8gICAgICAgICkgICAgICAgICA9PiB7XG5cdGxldCBfMCAgICAgICAgID0gJyc7XG5cdHdoaWxlICggXyApIHtcblx0XHRjb25zdCAkID0gTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlYyhfKTtcblx0XHRpZiAoICEkICkgeyBicmVhazsgfVxuXHRcdF8wICs9ICRbMF07XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHR9XG5cdHJldHVybiBfMDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18WyBcXHRdKlxcblsgXFx0XFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18ICpcXG5bIFxcbl0qfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pL2c7XG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0ggPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXwgKlxcblsgXFxuXSp8dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvZztcbmxldCBfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiAgICAgICAgO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpO1xuXG5jb25zdCBCQVNJQ19TVFJJTkdfVEFCX19fX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eKD86W15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14oPzpbXlxcXFxcIlxceDAwLVxceDA5XFx4MEItXFx4MUZcXHg3Rl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFxdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pKS8pLmV4ZWMgKSgpO1xuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXig/OlteXFxcXFwiXFx4MDAtXFx4MDlcXHgwQi1cXHgxRl0rfFxcXFwoPzpbYnRuZnJcIlxcXFwvXXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KSkvKS5leGVjICkoKTtcbmxldCBfX0JBU0lDX1NUUklOR19leGVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBCQVNJQ19TVFJJTkdfZXhlYyA9IChfMiAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0XzIgPSBfMi5zbGljZSgxKTtcblx0Zm9yICggbGV0IF8xICAgICAgICAgPSAnJzsgOyApIHtcblx0XHRjb25zdCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfMik7XG5cdFx0aWYgKCAhJCApIHtcblx0XHRcdF8yWzBdPT09J1wiJyB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdHJldHVybiB7IDE6IF8xLCAyOiBfMi5yZXBsYWNlKFNZTV9XSElURVNQQUNFLCAnJykgfTtcblx0XHR9XG5cdFx0XzEgKz0gJFswXTtcblx0XHRfMiA9IF8yLnNsaWNlKCRbMF0ubGVuZ3RoKTtcblx0fVxufTtcblxuY29uc3QgRE9UX0tFWV9leGVjID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLlsgXFx0XSovKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX1NUUklDVCA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXltcXHctXSsvKS5leGVjICkoKTtcbmNvbnN0IEJBUkVfS0VZX0ZSRUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKS5leGVjICkoKTtcbmxldCBfX0JBUkVfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgTElURVJBTF9LRVlfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pLmV4ZWMgKSgpO1xuY29uc3QgTElURVJBTF9LRVlfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZdKicvKS5leGVjICkoKTtcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgICAgICAgICAgICAgICAgICAgICAgICA7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgICAgICAgICA7XG5cbmNvbnN0IGdldEtleXMgPSAoXyAgICAgICAgKSAgICAgICAgID0+IHtcblx0bGV0IGtleXMgICAgICAgICA9ICcnO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0aWYgKCBfWzBdPT09J1wiJyApIHtcblx0XHRcdF8gPSBfLnNsaWNlKDEpO1xuXHRcdFx0bGV0IGtleSAgICAgICAgID0gJ1wiJztcblx0XHRcdGxldCAkICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHRcdHdoaWxlICggKCAkID0gX19CQVNJQ19TVFJJTkdfZXhlYyhfKSApICkge1xuXHRcdFx0XHRfID0gXy5zbGljZSgkWzBdLmxlbmd0aCk7XG5cdFx0XHRcdGtleSArPSAkWzBdO1xuXHRcdFx0fVxuXHRcdFx0X1swXT09PSdcIicgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBiYXNpYyBzdHJpbmcga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XyA9IF8uc2xpY2UoMSk7XG5cdFx0XHRrZXlzICs9IGtleSArICdcIic7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggXy5zdGFydHNXaXRoKCdcXCcnKSA/IF9fTElURVJBTF9LRVlfZXhlYyA6IF9fQkFSRV9LRVlfZXhlYyApKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgJHtfLnN0YXJ0c1dpdGgoJ1xcJycpID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRfID0gXy5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdGtleXMgKz0ga2V5O1xuXHRcdH1cblx0XHRjb25zdCAkID0gRE9UX0tFWV9leGVjKF8pO1xuXHRcdGlmICggISQgKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XyA9IF8uc2xpY2UoJFswXS5sZW5ndGgpO1xuXHRcdGtleXMgKz0gJFswXTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgJF9hc0FycmF5SXRlbSQkICAgICAgICAgID0gX1sxXT09PSdbJztcblx0aWYgKCAkX2FzQXJyYXlJdGVtJCQgKSB7XG5cdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRfID0gXy5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgXyA9IF8uc2xpY2UoMSk7IH1cblx0XyA9IF8ucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRjb25zdCBrZXlzICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRfID0gXy5zbGljZShrZXlzLmxlbmd0aCkucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRfWzBdPT09J10nIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBUYWJsZSBoZWFkZXIgaXMgbm90IGNsb3NlZGAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdGNvbnN0ICQkYXNBcnJheUl0ZW0kXyAgICAgICAgICA9IF9bMV09PT0nXSc7XG5cdF8gPSBfLnNsaWNlKCQkYXNBcnJheUl0ZW0kXyA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBfWzBdPT09JzwnICkgeyAoIHsgMTogdGFnLCAyOiBfIH0gPSBUQUdfUkVTVF9leGVjKF8pID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgdGFnYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpICk7IH1cblx0ZWxzZSB7IHRhZyA9ICcnOyB9XG5cdCFfIHx8IF9bMF09PT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRyZXR1cm4geyAkX2FzQXJyYXlJdGVtJCQsIGtleXMsICQkYXNBcnJheUl0ZW0kXywgdGFnIH07XG59O1xuXG5leHBvcnQgY29uc3QgS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMgPSAoXyAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBsZWZ0ICAgICAgICAgPSBnZXRLZXlzKF8pO1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnLCAyOiByaWdodCB9ID0gS0VZX1ZBTFVFX1BBSVJfZXhlYyhfLnNsaWNlKGxlZnQubGVuZ3RoKSkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCBidXQgbWlzc2luZyBhdCAnKSkpO1xuXHR0YWcgfHwgcmlnaHQgJiYgcmlnaHRbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFZhbHVlIGNhbiBub3QgYmUgbWlzc2luZyBhZnRlciBldXFhbCBzaWduYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVmdCwgdGFnLCByaWdodCB9O1xufTtcblxuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pLnRlc3QgKSgpO1xuY29uc3QgQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfREVMID0gLyojX19QVVJFX18qLyggKCkgPT4gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRl0vKS50ZXN0ICkoKTtcbmV4cG9ydFxubGV0IF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBLRVlTX1NUUklDVCA9IC9bXFx3LV0rfFwiKD86W15cXFxcXCJdK3xcXFxcLikqXCJ8J1teJ10qJy9ncztcbmNvbnN0IEtFWVNfRlJFRSA9IC9bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSp8XCIoPzpbXlxcXFxcIl0rfFxcXFwuKSpcInwnW14nXSonL2dzO1xuZXhwb3J0XG5sZXQgX19LRVlTICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hSZWdFeHAgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICkgICAgICAgPT4ge1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wXzFfMjtcblx0XHRcdF9fTElURVJBTF9LRVlfZXhlYyA9IExJVEVSQUxfS0VZX19fXztcblx0XHRcdF9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0ID0gQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV9UQUJfX19fO1xuXHRcdFx0X19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuXHRcdFx0X19CQVNJQ19TVFJJTkdfZXhlYyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX1NUUklDVDtcblx0XHRcdHN1cHBvcnRBcnJheU9mVGFibGVzID0gdHJ1ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9fX187XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX19fX19fX19fXztcblx0XHRcdF9fQkFTSUNfU1RSSU5HX2V4ZWMgPSBCQVNJQ19TVFJJTkdfX19fX19fX19fO1xuXHRcdFx0X19CQVJFX0tFWV9leGVjID0gQkFSRV9LRVlfU1RSSUNUO1xuXHRcdFx0X19LRVlTID0gS0VZU19TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9fX19fXztcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX1NUUklDVDtcblx0XHRcdF9fS0VZUyA9IEtFWVNfU1RSSUNUO1xuXHRcdFx0c3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfU0xBU0g7XG5cdFx0XHRfX0JBU0lDX1NUUklOR19leGVjID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRfX0tFWVMgPSBLRVlTX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTUlOX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgKiBhcyByZWdleHBzJDAgZnJvbSAnLi9yZWdleHBzJDAnO1xuXG4vKiBvcHRpb25zICovXG5cbmV4cG9ydCBsZXQgdXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyAgICAgICAgO1xuZXhwb3J0IGxldCB1c2luZ0JpZ0ludCAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IEludGVnZXJNaW4gICAgICAgIDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heCAgICAgICAgO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcbiAgXG5leHBvcnQgbGV0IGVuZHNXaXRoUXVvdGUgICAgICAgICA7XG5leHBvcnQgbGV0IHplcm9EYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgaW5saW5lVGFibGUgICAgICAgICA7XG5leHBvcnQgbGV0IG1vcmVEYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWxsb3dFbXB0eUtleSAgICAgICAgIDtcbi8vZXhwb3J0IGNvbnN0IHhvYiA6Ym9vbGVhbiA9IHRydWU7XG5leHBvcnQgbGV0IHNFcnJvciAgICAgICAgIDtcbmV4cG9ydCBsZXQgc0Zsb2F0ICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGxldCBUYWJsZSAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvciQwLnRocm93cyhUeXBlRXJyb3IoYFR5cGVzIGluIEFycmF5IG11c3QgYmUgc2FtZWAgKyBpdGVyYXRvciQwLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTsgfTtcbmV4cG9ydCBsZXQgY29sbGVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb2xsZWN0X29mZjtcbmV4cG9ydCBjb25zdCBwcm9jZXNzID0gKCkgICAgICAgPT4ge1xuXHRpZiAoIGNvbGxlY3Rpb25fbGVuZ3RoICkge1xuXHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBwcm9jZXNzb3IgO1xuXHRcdGNvbnN0IHF1ZXVlID0gY29sbGVjdGlvbjtcblx0XHRwcm9jZXNzb3IgPSBudWxsO1xuXHRcdGNvbGxlY3Rpb24gPSBbXTtcblx0XHR3aGlsZSAoIGNvbGxlY3Rpb25fbGVuZ3RoLS0gKSB7XG5cdFx0XHRwcm9jZXNzKHF1ZXVlW2NvbGxlY3Rpb25fbGVuZ3RoXSApO1xuXHRcdFx0cXVldWUubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGg7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiB1c2UgJiBjbGVhciAqL1xuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSAgICAgICA9PiB7XG5cdHByb2Nlc3NvciA9IG51bGw7XG5cdGNvbGxlY3Rpb24ubGVuZ3RoID0gY29sbGVjdGlvbl9sZW5ndGggPSAwO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpTGluZUpvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdGxldCBtaXhlZCAgICAgICAgIDtcblx0c3dpdGNoICggc3BlY2lmaWNhdGlvblZlcnNpb24gKSB7XG5cdFx0Y2FzZSAxLjA6XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0ZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjM6XG5cdFx0XHRkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gZW5kc1dpdGhRdW90ZSA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMjpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bWl4ZWQgPSBlbmRzV2l0aFF1b3RlID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4xOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IGVuZHNXaXRoUXVvdGUgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ1RPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKScpO1xuXHR9XG5cdHJlZ2V4cHMkMC5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlMaW5lSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmcgPSBtdWx0aUxpbmVKb2luZXI7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLG11bHRpTGluZUpvaW5lciknKTsgfVxuXHRcblx0aWYgKCB1c2VCaWdJbnQ9PT10cnVlICkgeyB1c2luZ0JpZ0ludCA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIHVzZUJpZ0ludD09PWZhbHNlICkgeyB1c2luZ0JpZ0ludCA9IGZhbHNlOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIHVzZUJpZ0ludCE9PSdudW1iZXInICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsdXNlQmlnSW50KScpOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHRcdHVzaW5nQmlnSW50ID0gbnVsbDtcblx0XHRpZiAoIHVzZUJpZ0ludD49MCApIHsgSW50ZWdlck1pbiA9IC0oIEludGVnZXJNYXggPSB1c2VCaWdJbnQgKTsgfVxuXHRcdGVsc2UgeyBJbnRlZ2VyTWF4ID0gLSggSW50ZWdlck1pbiA9IHVzZUJpZ0ludCApLTE7IH1cblx0XHRpZiAoIEludGVnZXJNaW4gPCBNSU5fU0FGRV9JTlRFR0VSIHx8IE1BWF9TQUZFX0lOVEVHRVIgPCBJbnRlZ2VyTWF4ICkgeyB0aHJvdyBSYW5nZUVycm9yKCdUT01MLnBhcnNlKCwsLHVzZUJpZ0ludCknKTsgfVxuXHR9XG5cdFxuXHRpZiAoIHhPcHRpb25zPT1udWxsIHx8IHhPcHRpb25zPT09ZmFsc2UgKSB7XG5cdFx0VGFibGUgPSBQbGFpblRhYmxlO1xuXHRcdHNFcnJvciA9IGFsbG93TG9uZ2VyID0gZW5hYmxlTnVsbCA9IGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSBmYWxzZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHhPcHRpb25zPT09dHJ1ZSApIHtcblx0XHRUYWJsZSA9IE9yZGVyZWRUYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9IHNFcnJvciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlMaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gdHJ1ZTtcblx0XHRjb2xsZWN0ID0gY29sbGVjdF9vZmY7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiB4T3B0aW9ucz09PSdmdW5jdGlvbicgKSB7XG5cdFx0VGFibGUgPSBPcmRlcmVkVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSBzRXJyb3IgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpTGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IHRydWU7XG5cdFx0aWYgKCAhbWl4ZWQgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZSgsLCwsdGFnKSBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXknKTsgfVxuXHRcdHByb2Nlc3NvciA9IHhPcHRpb25zO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29uO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgdGFnLCAuLi51bmtub3duIH0gPSB4T3B0aW9ucztcblx0XHRpZiAoIG93bktleXModW5rbm93bikubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKScpOyB9XG5cdFx0VGFibGUgPSBvcmRlciA/IE9yZGVyZWRUYWJsZSA6IFBsYWluVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSAhIWxvbmdlcjtcblx0XHRzRXJyb3IgPSAhIWV4YWN0O1xuXHRcdGVuYWJsZU51bGwgPSAhIV9udWxsO1xuXHRcdGFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgPSAhIW11bHRpO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKCwsLCx4T3B0aW9ucy50YWcpJyk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1RPTUwucGFyc2UoLCwsLHhPcHRpb25zKSB4T3B0aW9ucy50YWcgbmVlZHMgYXQgbGVhc3QgVE9NTCAxLjAgdG8gc3VwcG9ydCBtaXhlZCB0eXBlIGFycmF5Jyk7IH1cblx0XHRcdHByb2Nlc3NvciA9IHRhZztcblx0XHRcdGNvbGxlY3QgPSBjb2xsZWN0X29uO1xuXHRcdH1cblx0XHRlbHNlIHsgY29sbGVjdCA9IGNvbGxlY3Rfb2ZmOyB9XG5cdH1cblx0XG5cdG1peGVkXG5cdFx0PyBhc051bGxzID0gYXNTdHJpbmdzID0gYXNUYWJsZXMgPSBhc0FycmF5cyA9IGFzQm9vbGVhbnMgPSBhc0Zsb2F0cyA9IGFzSW50ZWdlcnMgPSBhc09mZnNldERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlVGltZXMgPSBhc0xvY2FsRGF0ZXMgPSBhc0xvY2FsVGltZXMgPSBhc01peGVkXG5cdFx0OiAoIHsgYXNOdWxscywgYXNTdHJpbmdzLCBhc1RhYmxlcywgYXNBcnJheXMsIGFzQm9vbGVhbnMsIGFzRmxvYXRzLCBhc0ludGVnZXJzLCBhc09mZnNldERhdGVUaW1lcywgYXNMb2NhbERhdGVUaW1lcywgYXNMb2NhbERhdGVzLCBhc0xvY2FsVGltZXMgfSA9IEFTX1RZUEVEICk7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcblxuY29uc3QgYXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBhcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNBcnJheSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChhcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IE9GX1RBQkxFUyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNUQVRJQ0FMTFkgPSB0cnVlO1xuY29uc3Qgc3RhdGljYWxBcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChzdGF0aWNhbEFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNTdGF0aWMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoc3RhdGljYWxBcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBuZXdBcnJheSA9IChpc1N0YXRpYyAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgYXJyYXkgICAgICAgID0gW107XG5cdGFycmF5c19hZGQoYXJyYXkpO1xuXHRpc1N0YXRpYyAmJiBzdGF0aWNhbEFycmF5c19hZGQoYXJyYXkpO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBOYXRpdmVEYXRlIGZyb20gJy5EYXRlJztcbmltcG9ydCBwYXJzZSBmcm9tICcuRGF0ZS5wYXJzZSc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcblxuY29uc3QgXzI5XyA9IC8oPzowWzEtOV18MVxcZHwyWzAtOV0pLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdFxcZFxcZFxcZFxcZC1cblx0KD86XG5cdFx0MFxuXHRcdCg/OlxuXHRcdFx0WzEzNTc4XS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHRbNDY5XS0ke18zMF99XG5cdFx0XHR8XG5cdFx0XHQyLSR7XzI5X31cblx0XHQpXG5cdFx0fFxuXHRcdDFcblx0XHQoPzpcblx0XHRcdFswMl0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0MS0ke18zMF99XG5cdFx0KVxuXHQpYCApKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0JHtfMjNffToke181OV99OiR7XzU5X31cblx0YCApKCk7XG5cbmV4cG9ydCBjb25zdCBPRkZTRVQkID0gLyg/Olp8WystXVxcZFxcZDpcXGRcXGQpJC87XG5cbmNvbnN0IFpfZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKS5leGVjICkoKTtcblxuY29uc3QgT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9KD86XFwuXFxkezEsM30pP1xuXHQoXFxkKj8pMCpcblx0KD86WnxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cCAgIGBcblx0XlxuXHQke1lNRH1cblx0W1QgXVxuXHQke0hNU31cblx0KClcblx0WlxuXHQkYC5leGVjICkoKTtcblxuY29uc3QgSVNfTE9DQUxfREFURVRJTUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtZTUR9XG5cdFtUIF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgSVNfTE9DQUxfREFURSA9IC8qI19fUFVSRV9fKi8oICgpID0+IG5ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0JGAudGVzdCApKCk7XG5cbmNvbnN0IElTX0xPQ0FMX1RJTUUgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXG5cdF5cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC50ZXN0ICkoKTtcblxuY29uc3QgRE9UX1pFUk8gPSAvXFwuPzArJC87XG5jb25zdCBERUxJTUlURVJfRE9UID0gL1stVDouXS9nO1xuY29uc3QgWkVSTyA9IC8oPzw9XFwuXFxkKikwKyQvO1xuXG5jb25zdCBEYXRldGltZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwoeyB2YWx1ZTogJycsIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG5cdGNvbnN0IERhdGV0aW1lID0gZnVuY3Rpb24gKCAgICAgICAgICAgICAgX0lTT1N0cmluZyAgICAgICAgLCBfdmFsdWUgICAgICAgICkge1xuXHRcdHJldHVybiBkZWZpbmVQcm9wZXJ0eShkZWZpbmVQcm9wZXJ0eSh0aGlzLCBfSVNPU3RyaW5nLCBkZXNjcmlwdG9yKSwgX3ZhbHVlLCBkZXNjcmlwdG9yKTtcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Ly9leHByZXNzaW9uPyA6dW5kZWZpbmVkLCBsaXRlcmFsPyA6dW5kZWZpbmVkLCBkb3RWYWx1ZT8gOnVuZGVmaW5lZFxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuc2V0VGltZSgpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5nZXRUaW1lKCkgOiBEYXRlLnBhcnNlKCdUJylcblx0Ly8gW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ251bWJlcicpID4gLnZhbHVlT2YoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAudG9JU09TdHJpbmcoKVxuXHRjb25zdCBkZXNjcmlwdG9ycyA9IE51bGwobnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0e1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBOdWxsKG51bGwpO1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBvd25LZXlzKE5hdGl2ZURhdGUucHJvdG90eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICkge1xuXHRcdFx0a2V5PT09J2NvbnN0cnVjdG9yJyB8fFxuXHRcdFx0a2V5PT09J3RvSlNPTicgfHxcblx0XHRcdCggZGVzY3JpcHRvcnNba2V5XSA9IGRlc2NyaXB0b3IgKTtcblx0XHR9XG5cdH1cblx0RGF0ZXRpbWUucHJvdG90eXBlID0gcHJldmVudEV4dGVuc2lvbnMoY3JlYXRlKE5hdGl2ZURhdGUucHJvdG90eXBlLCBkZXNjcmlwdG9ycykpO1xuXHRyZXR1cm4gZnJlZXplKERhdGV0aW1lKTtcbn0gKSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBWYWx1ZSA9IChJU09TdHJpbmcgICAgICAgICkgICAgICAgID0+IElTT1N0cmluZy5yZXBsYWNlKFpFUk8sICcnKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgbGVhcCA9IChsaXRlcmFsICAgICAgICApID0+IGxpdGVyYWwuc2xpY2UoNSwgMTApIT09JzAyLTI5JyB8fCArbGl0ZXJhbC5zbGljZSgwLCA0KSU0PT09MCAmJiBsaXRlcmFsLnNsaWNlKDIsIDQpIT09JzAwJztcblxuY29uc3QgREFURSA9IG5ldyBOYXRpdmVEYXRlKDApO1xuXG5jb25zdCBPZmZzZXREYXRlVGltZV9JU09TdHJpbmcgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfdmFsdWUgPSBTeW1ib2woJ09mZnNldERhdGVUaW1lX3ZhbHVlJyk7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG5jb25zdCBPZmZzZXREYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggZW5kICkgeyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoZW5kIC0gc3RhcnQsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKTsgfVxuXHRjb25zdCB0aW1lID0gcGFyc2UodGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0dGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpO1xuXHRyZXR1cm4gdGltZTtcbn07XG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSBOdWxsKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyAxOiBtb3JlIH0gPSBsZWFwKGxpdGVyYWwpICYmICggb3B0aW9ucyQwLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgOiBPRkZTRVRfREFURVRJTUVfZXhlYyApKGxpdGVyYWwpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcihPZmZzZXREYXRlVGltZV9JU09TdHJpbmcsIE9mZnNldERhdGVUaW1lX3ZhbHVlKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHBhcnNlKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSkgKS5wYWRTdGFydCgxNSwgJzAnKSArICggbW9yZSA/ICcuJyArIG1vcmUgOiAnJyApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRVVENGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRnVsbFllYXIoKTsgfVxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0VVRDRGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXRlKCk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Z2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRVVENNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbnV0ZXMoKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0VVRDU2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENTZWNvbmRzKCk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdGdldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDEyLCAxNSk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKSArIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2VhcmNoKE9GRlNFVCQpKTtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDApO1xuXHR9XG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHRnZXREYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHtcblx0XHRyZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSo2MDAwMCkuZ2V0VVRDRGF5KCk7XG5cdH1cblx0Z2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHRyZXR1cm4geiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDA7XG5cdH1cblx0c2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgICApIHtcblx0XHR2YWx1ZSA9ICt2YWx1ZTtcblx0XHRsZXQgc3RyaW5nID0gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMsIHZhbHVlKjYwMDAwKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0aWYgKCB2YWx1ZT4wICkgeyBzdHJpbmcgKz0gJysnOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3RyaW5nICs9ICctJztcblx0XHRcdFx0dmFsdWUgPSAtdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtID0gdmFsdWUlNjA7XG5cdFx0XHRjb25zdCBoID0gKCB2YWx1ZSAtIG0gKS82MDtcblx0XHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHN0cmluZyArICggaD45ID8gaCA6ICcwJyArIGggKSArICggbT45ID8gJzonICsgbSA6ICc6MCcgKyBtICk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBzdHJpbmcgKyAoIGlzKHZhbHVlLCAwKSA/ICdaJyA6ICctMDA6MDAnICk7IH1cblx0fVxuXHRnZXRUaW1lICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDAsIDE1KTsgfS8vL1xuXHRzZXRUaW1lICggICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMTUsICcwJyk7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdFxufSk7XG5cbmNvbnN0IExvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxEYXRlVGltZV92YWx1ZSA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSA9PiB7XG5cdHRoYXRbTG9jYWxEYXRlVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KGVuZCAtIHN0YXJ0LCAnMCcpICsgdGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGVUaW1lID0gTnVsbChjbGFzcyBMb2NhbERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XG5cdHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcihMb2NhbERhdGVUaW1lX0lTT1N0cmluZywgTG9jYWxEYXRlVGltZV92YWx1ZSk7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoJyAnLCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUgKyAxKTsgfVxuXHRnZXREYXRlICggICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA4LCAxMCk7IH1cblx0c2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICApIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNCwgMTYsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNywgMTkpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJyk7XG5jb25zdCBMb2NhbERhdGVfdmFsdWUgPSBTeW1ib2woJ0xvY2FsRGF0ZV92YWx1ZScpO1xuY29uc3QgTG9jYWxEYXRlX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgPT4ge1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydChlbmQgLSBzdGFydCwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSBOdWxsKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoTG9jYWxEYXRlX0lTT1N0cmluZywgTG9jYWxEYXRlX3ZhbHVlKTtcblx0XHR0aGlzW0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHRcdHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ10gPSBsaXRlcmFsXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSB7IHJldHVybiBMb2NhbERhdGVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxUaW1lX0lTT1N0cmluZyA9IFN5bWJvbCgnTG9jYWxUaW1lX0lTT1N0cmluZycpO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKTtcbmNvbnN0IExvY2FsVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICkgPT4gK3RoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBMb2NhbFRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICAsIHZhbHVlICAgICAgICApID0+IHtcblx0dGhhdFtMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSBOdWxsKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcblx0dmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX1RJTUUobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKExvY2FsVGltZV9JU09TdHJpbmcsIExvY2FsVGltZV92YWx1ZSk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgeyByZXR1cm4gTG9jYWxUaW1lX3NldCh0aGlzLCAwLCAyLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDMsIDUpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApIHsgcmV0dXJuIExvY2FsVGltZV9zZXQodGhpcywgMywgNSwgdmFsdWUpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCA2LCA4KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSB7IHJldHVybiBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNTYWZlSW50ZWdlciBmcm9tICcuTnVtYmVyLmlzU2FmZUludGVnZXInO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5leHBvcnQgY29uc3QgSU5URUdFUl9EID0gL1stK10/KD86MHxbMS05XVxcZCooPzpfXFxkKykqKS87XG5jb25zdCBJU19EX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiBuZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnRlc3QgKSgpO1xuY29uc3QgSVNfWE9CX0lOVEVHRVIgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoL14wKD86eFswLTlBLUZhLWZdKyg/Ol9bMC05QS1GYS1mXSspKnxvWzAtN10rKD86X1swLTddKykqfGJbMDFdKyg/Ol9bMDFdKykqKSQvKS50ZXN0ICkoKTtcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBCaWdJbnRJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0RfSU5URUdFUihsaXRlcmFsKVxuXHR8fCAvKm9wdGlvbnNcXCQwLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0bGV0IGJpZ0ludCAgICAgICAgID0gQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpO1xuXHRpZiAoIGxpdGVyYWxbMF09PT0nLScgKSB7IGJpZ0ludCA9IC1iaWdJbnQ7IH1cblx0b3B0aW9ucyQwLmFsbG93TG9uZ2VyXG5cdHx8IC05MjIzMzcyMDM2ODU0Nzc1ODA4bjw9YmlnSW50ICYmIGJpZ0ludDw9OTIyMzM3MjAzNjg1NDc3NTgwN24vLyAoIG1pbiA9IC0oMm4qKig2NG4tMW4pKSB8fCB+bWF4ICkgPD0gbG9uZyA8PSAoIG1heCA9IDJuKiooNjRuLTFuKS0xbiB8fCB+bWluIClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIGJpZ0ludDtcbn07XG5cbmNvbnN0IE51bWJlckludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfRF9JTlRFR0VSKGxpdGVyYWwpXG5cdHx8IC8qb3B0aW9uc1xcJDAueG9iICYmICovSVNfWE9CX0lOVEVHRVIobGl0ZXJhbClcblx0fHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBudW1iZXIgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKVxuXHRcdDogK2xpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJyk7XG5cdGlzU2FmZUludGVnZXIobnVtYmVyKVxuXHR8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIG1lZXQgYXQgJykpKTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgICAgICAgICA9PiB7XG5cdGlmICggb3B0aW9ucyQwLnVzaW5nQmlnSW50PT09dHJ1ZSApIHsgcmV0dXJuIEJpZ0ludEludGVnZXIobGl0ZXJhbCk7IH1cblx0aWYgKCBvcHRpb25zJDAudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBCaWdJbnRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gb3B0aW9ucyQwLkludGVnZXJNaW48PWJpZ0ludCAmJiBiaWdJbnQ8PW9wdGlvbnMkMC5JbnRlZ2VyTWF4ID8gKyggYmlnSW50KycnICkgOiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbi8vaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG4vL2ltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5cbmNvbnN0IElTX0ZMT0FUID0gLyojX19QVVJFX18qLyggKCkgPT4gbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPz1bLmVFXSlcblx0KD86XFwuXFxkKyg/Ol9cXGQrKSopP1xuXHQoPzpbZUVdWy0rXT9cXGQrKD86X1xcZCspKik/XG5cdCRgLnRlc3QgKSgpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgSVNfWkVSTyA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLlswX10rKT8oPzpbZUVdWy0rXT8wKyk/JC8pLnRlc3QgKSgpO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBJU19GTE9BVChsaXRlcmFsKSApIHtcblx0XHRjb25zdCBudW1iZXIgPSArbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJyk7XG5cdFx0aWYgKCBvcHRpb25zJDAuc0Vycm9yICkge1xuXHRcdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mLCBsaWtlICR7bGl0ZXJhbH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRudW1iZXIgfHwgSVNfWkVSTyhsaXRlcmFsKSB8fCBpdGVyYXRvciQwLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCBoYXMgYmVlbiBhcyBsaXR0bGUgYXMgJHtsaXRlcmFsWzBdPT09Jy0nID8gJy0nIDogJyd9MCwgbGlrZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVtYmVyO1xuXHR9XG5cdC8vaWYgKCBvcHRpb25zXFwkMC5zRmxvYXQgKSB7XG5cdC8vXHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0Ly9cdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIC1JbmZpbml0eTsgfVxuXHQvL1x0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdC8vfVxuXHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xufTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21Db2RlUG9pbnQgZnJvbSAnLlN0cmluZy5mcm9tQ29kZVBvaW50JztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IkMCBmcm9tICcuLi9pdGVyYXRvciQwJztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuXG5jb25zdCBFU0NBUEVfQUxJQVMgPSB7IGI6ICdcXGInLCB0OiAnXFx0JywgbjogJ1xcbicsIGY6ICdcXGYnLCByOiAnXFxyJywgJ1wiJzogJ1wiJywgJy8nOiAnLycsICdcXFxcJzogJ1xcXFwnIH07XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvXFxcXCg/OihbXFxcXFwiYnRuZnIvXSl8dSguezR9KXxVKC57OH0pKS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9cXG58XFxcXCg/OiAqKFxcbilbIFxcbl0qfChbXFxcXFwiYnRuZnIvXSl8dSguezR9KXxVKC57OH0pKS9ncztcblxuY29uc3QgdW5Fc2NhcGVTaW5nbGVMaW5lID0gKFxuXHRtYXRjaCAgICAgICAgLFxuXHRwMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdHAyICAgICAgICAgLFxuXHRwMyAgICAgICAgIFxuKSAgICAgICAgID0+IHtcblx0aWYgKCBwMSApIHsgcmV0dXJuIEVTQ0FQRV9BTElBU1twMV07IH1cblx0Y29uc3QgY29kZVBvaW50ICAgICAgICAgPSBwYXJzZUludChwMiA/PyBwMyAsIDE2KTtcblx0KCAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0JiYgaXRlcmF0b3IkMC50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3AyID8gJ1xcXFx1JyArIHAyIDogJ1xcXFxVJyArIHAzfWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmxldCBuID0gMDtcblxuY29uc3QgdW5Fc2NhcGVNdWx0aUxpbmUgPSAoXG5cdG1hdGNoICAgICAgICAsXG5cdHAxICAgICAgICAgICAgICAgICAgLFxuXHRwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0cDMgICAgICAgICAgICAgICAgICAgICxcblx0cDQgICAgICAgICAgICAgICAgICAgIFxuKSAgICAgICAgID0+IHtcblx0aWYgKCBtYXRjaD09PSdcXG4nICkge1xuXHRcdCsrbjtcblx0XHRyZXR1cm4gb3B0aW9ucyQwLnVzZVdoYXRUb0pvaW5NdWx0aUxpbmVTdHJpbmc7XG5cdH1cblx0aWYgKCBwMSApIHsgcmV0dXJuICcnOyB9XG5cdGlmICggcDIgKSB7IHJldHVybiBFU0NBUEVfQUxJQVNbcDJdOyB9XG5cdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocDMgPz8gcDQgLCAxNik7XG5cdCggMHhEN0ZGPGNvZGVQb2ludCAmJiBjb2RlUG9pbnQ8MHhFMDAwIHx8IDB4MTBGRkZGPGNvZGVQb2ludCApXG5cdCYmIGl0ZXJhdG9yJDAudGhyb3dzKFJhbmdlRXJyb3IoYEludmFsaWQgVW5pY29kZSBTY2FsYXIgJHtwMyA/ICdcXFxcdScgKyBwMyA6ICdcXFxcVScgKyBwNH1gICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcsIGl0ZXJhdG9yJDAubGluZUluZGV4ICsgbikpKTtcblx0cmV0dXJuIGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbn07XG5cbmV4cG9ydCBjb25zdCBCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUsIHVuRXNjYXBlU2luZ2xlTGluZSk7XG5cbmV4cG9ydCBjb25zdCBNdWx0aUxpbmVCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICAsIHNraXBwZWQgICAgICAgICApICAgICAgICAgPT4ge1xuXHRuID0gc2tpcHBlZCA/IDEgOiAwO1xuXHRyZXR1cm4gbGl0ZXJhbC5yZXBsYWNlKEVTQ0FQRURfSU5fTVVMVElfTElORSwgdW5Fc2NhcGVNdWx0aUxpbmUpO1xufTtcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgeyBuZXdBcnJheSwgT0ZfVEFCTEVTLCBpc0FycmF5LCBpc1N0YXRpYyB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IERJUkVDVExZLCBJTVBMSUNJVExZLCBQQUlSLCBpc1RhYmxlLCBpc0lubGluZSwgd2FzRGlyZWN0bHksIGRpcmVjdGx5LCBmcm9tUGFpciB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nLCBNdWx0aUxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5pbXBvcnQgKiBhcyBvcHRpb25zJDAgZnJvbSAnLi4vb3B0aW9ucyQwJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMkMCBmcm9tICcuLi9yZWdleHBzJDAnO1xuXG5leHBvcnQgY29uc3QgcGFyc2VLZXlzID0gKGtleV9rZXkgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3Qga2V5cyA9IGtleV9rZXkubWF0Y2gocmVnZXhwcyQwLl9fS0VZUykgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGxldCBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7XG5cdGRvIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbLS1pbmRleF0gO1xuXHRcdGlmICgga2V5LnN0YXJ0c1dpdGgoJ1xcJycpICkgeyBrZXlzW2luZGV4XSA9IGtleS5zbGljZSgxLCAtMSk7IH1cblx0XHRlbHNlIGlmICgga2V5WzBdPT09J1wiJyApIHsga2V5c1tpbmRleF0gPSBCYXNpY1N0cmluZyhrZXkuc2xpY2UoMSwgLTEpKTsgfVxuXHR9XG5cdHdoaWxlICggaW5kZXggKTtcblx0aWYgKCBvcHRpb25zJDAuZGlzYWxsb3dFbXB0eUtleSApIHtcblx0XHRsZXQgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoO1xuXHRcdGRvIHsga2V5c1stLWluZGV4XSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpOyB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHJldHVybiBrZXlzO1xufTtcblxuY29uc3QgcHJlcGFyZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlmICggaXNUYWJsZSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkodGFibGUpICkge1xuXHRcdFx0XHRpc1N0YXRpYyh0YWJsZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhcHBlbmQgdmFsdWUgdG8gc3RhdGljIElubGluZSBBcnJheWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0dGFibGUgPSB0YWJsZVsoIHRhYmxlICAgICAgICAgICkubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBkZWZpbmUgVGFibGUgdW5kZXIgbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSk7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFRhYmxlID0gKHRhYmxlICAgICAgICwga2V5X2tleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGxlYWRpbmdLZXlzICAgICAgICAgICA9IHBhcnNlS2V5cyhrZXlfa2V5KTtcblx0Y29uc3QgZmluYWxLZXkgICAgICAgICA9IGxlYWRpbmdLZXlzW2xlYWRpbmdLZXlzLmxlbmd0aCAtIDFdIDtcblx0LS1sZWFkaW5nS2V5cy5sZW5ndGg7XG5cdHRhYmxlID0gcHJlcGFyZVRhYmxlKHRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0ZWxzZSB7IGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShPRl9UQUJMRVMpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMkMC5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRsYXN0VGFibGUgPSB0YWJsZVtmaW5hbEtleV07XG5cdFx0XHR3YXNEaXJlY3RseShsYXN0VGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGRpcmVjdGx5KGxhc3RUYWJsZSk7XG5cdFx0XHRmcm9tUGFpcihsYXN0VGFibGUpICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEga2V5L3ZhbHVlIHBhaXIgY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEgW11gICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMkMC5UYWJsZShESVJFQ1RMWSk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucyQwLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHR9XG5cdHJldHVybiBsYXN0VGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlubGluZVRhYmxlID0gKHRhYmxlICAgICAgICwga2V5cyAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpc1RhYmxlKHRhYmxlKSB8fCBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvciQwLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIHN0YXRpYyBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRmcm9tUGFpcih0YWJsZSkgfHwgaXRlcmF0b3IkMC50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBbXSBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMkMC5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zJDAuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuY29uc3QgY2hlY2tMaXRlcmFsU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdHJlZ2V4cHMkMC5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdChsaXRlcmFsKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGEgTGl0ZXJhbCBTdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIGxpdGVyYWw7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduTGl0ZXJhbFN0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCBsaXRlcmFsWzFdIT09J1xcJycgfHwgbGl0ZXJhbFsyXSE9PSdcXCcnICkge1xuXHRcdGNvbnN0ICQgPSByZWdleHBzJDAuTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGxpdGVyYWwgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0aWYgKCAkICkge1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0cmV0dXJuICRbM107XG5cdH1cblx0aWYgKCBsaXRlcmFsICkge1xuXHRcdGNoZWNrTGl0ZXJhbFN0cmluZyhsaXRlcmFsKTtcblx0XHRsaXRlcmFsICs9IG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gaXRlcmF0b3IkMC5tYXJrKCdMaXRlcmFsIFN0cmluZycpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KTtcblx0XHRjb25zdCAkID0gcmVnZXhwcyQwLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpbmUpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IGxpdGVyYWwgKyBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHRcdGxpdGVyYWwgKz0gbGluZSArIG9wdGlvbnMkMC51c2VXaGF0VG9Kb2luTXVsdGlMaW5lU3RyaW5nO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbFsxXSE9PSdcIicgfHwgbGl0ZXJhbFsyXSE9PSdcIicgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBCYXNpY1N0cmluZygkWzFdKTtcblx0XHRyZXR1cm4gJFsyXTtcblx0fVxuXHRsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKTtcblx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGl0ZXJhbCk7XG5cdGxldCB7IGxlbmd0aCB9ID0gJDtcblx0aWYgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicsIGxlbmd0aCkgKSB7XG5cdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0bGVuZ3RoICs9IDM7XG5cdFx0dGFibGVbZmluYWxLZXldID0gQmFzaWNTdHJpbmcoJCkgKyAoIG9wdGlvbnMkMC5lbmRzV2l0aFF1b3RlID8gbGl0ZXJhbFtsZW5ndGhdPT09J1wiJyA/IGxpdGVyYWxbKytsZW5ndGhdPT09J1wiJyA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnIDogJycgKTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0bGV0IHNraXBwZWQgPSB0cnVlO1xuXHRpZiAoIGxpdGVyYWwgKSB7XG5cdFx0bGl0ZXJhbCArPSAnXFxuJztcblx0XHRyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCkgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0XHRza2lwcGVkID0gZmFsc2U7XG5cdH1cblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0Jhc2ljIFN0cmluZycpO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGV0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAobGluZSk7XG5cdFx0bGV0IHsgbGVuZ3RoIH0gPSAkO1xuXHRcdGlmICggbGluZS5zdGFydHNXaXRoKCdcIlwiXCInLCBsZW5ndGgpICkge1xuXHRcdFx0cmVnZXhwcyQwLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRsZW5ndGggKz0gMztcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE11bHRpTGluZUJhc2ljU3RyaW5nKGxpdGVyYWwgKyAkLCBza2lwcGVkKSArICggb3B0aW9ucyQwLmVuZHNXaXRoUXVvdGUgPyBsaW5lW2xlbmd0aF09PT0nXCInID8gbGluZVsrK2xlbmd0aF09PT0nXCInID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgOiAnJyApO1xuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRsaW5lICs9ICdcXG4nO1xuXHRcdHJlZ2V4cHMkMC5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaW5lKSB8fCBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxpdGVyYWwgKz0gbGluZTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IEluZmluaXR5IGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgTmFOIGZyb20gJy5OYU4nO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yJDAgZnJvbSAnLi4vaXRlcmF0b3IkMCc7XG5pbXBvcnQgeyBJTkxJTkUsIERJUkVDVExZIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0IHsgbmV3QXJyYXksIFNUQVRJQ0FMTFkgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsIE9GRlNFVCQgfSBmcm9tICcuLi90eXBlcy9EYXRldGltZSc7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSAnLi4vdHlwZXMvSW50ZWdlcic7XG5pbXBvcnQgeyBGbG9hdCB9IGZyb20gJy4uL3R5cGVzL0Zsb2F0JztcbmltcG9ydCAqIGFzIG9wdGlvbnMkMCBmcm9tICcuLi9vcHRpb25zJDAnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyQwIGZyb20gJy4uL3JlZ2V4cHMkMCc7XG5pbXBvcnQgeyBhcHBlbmRUYWJsZSwgcGFyc2VLZXlzLCBwcmVwYXJlSW5saW5lVGFibGUsIGFzc2lnbkxpdGVyYWxTdHJpbmcsIGFzc2lnbkJhc2ljU3RyaW5nIH0gZnJvbSAnLi9vbi10aGUtc3BvdCc7XG5cbmNvbnN0IElTX09GRlNFVCQgPSAvKiNfX1BVUkVfXyovKCAoKSA9PiB0aGVSZWdFeHAoT0ZGU0VUJCkudGVzdCApKCk7XG5cbmNvbnN0IHB1c2ggPSAobGFzdEFycmF5ICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggbGluZVJlc3RbMF09PT0nPCcgKSB7XG5cdFx0Y29uc3QgeyAxOiB0YWcgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZyBgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zJDAuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcob3B0aW9ucyQwLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2gobGluZVJlc3QgPT4gZXF1YWxJbmxpbmVUYWJsZShvcHRpb25zJDAuYXNUYWJsZXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHRjYXNlICdbJzpcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2gobGluZVJlc3QgPT4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zJDAuYXNBcnJheXMobGFzdEFycmF5KSwgbGFzdEFycmF5Lmxlbmd0aCwgbGluZVJlc3QpKTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMkMC5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgYXRvbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBvcHRpb25zJDAuc0Zsb2F0ICkge1xuXHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHRvcHRpb25zJDAuYXNGbG9hdHMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IC1JbmZpbml0eTtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyB8fCBsaXRlcmFsPT09Jy1uYW4nICkge1xuXHRcdFx0b3B0aW9ucyQwLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBOYU47XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnOicpICkge1xuXHRcdGlmICggbGl0ZXJhbC5pbmNsdWRlcygnLScpICkge1xuXHRcdFx0aWYgKCBJU19PRkZTRVQkKGxpdGVyYWwpICkge1xuXHRcdFx0XHRvcHRpb25zJDAuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMkMC5hc0xvY2FsRGF0ZVRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0b3B0aW9ucyQwLmFzTG9jYWxUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsVGltZShsaXRlcmFsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3IkMC53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMkMC5hc0xvY2FsRGF0ZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBMb2NhbERhdGUobGl0ZXJhbCk7XG5cdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGxpdGVyYWw9PT0ndHJ1ZScgPyBvcHRpb25zJDAuYXNCb29sZWFucyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gdHJ1ZSA6IGxpdGVyYWw9PT0nZmFsc2UnID8gb3B0aW9ucyQwLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlIDpcblx0XHRsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKSA/IG9wdGlvbnMkMC5hc0Zsb2F0cyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gRmxvYXQobGl0ZXJhbCkgOlxuXHRcdFx0b3B0aW9ucyQwLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyA/IG9wdGlvbnMkMC5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsIDpcblx0XHRcdFx0b3B0aW9ucyQwLmFzSW50ZWdlcnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IEludGVnZXIobGl0ZXJhbCk7XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4ge1xuXHRjb25zdCBzdGF0aWNBcnJheSAgICAgICAgPSB0YWJsZVtmaW5hbEtleV0gPSBuZXdBcnJheShTVEFUSUNBTExZKTtcblx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBBcnJheScpO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IHB1c2goc3RhdGljQXJyYXksIGxpbmVSZXN0KTtcblx0XHRcdGlmICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoPmxlbmd0aCApIHtcblx0XHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdChmdW5jdGlvbiBpbnNlcnRlZCAobGluZVJlc3QpIHtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgey8vXG5cdFx0XHRcdFx0XHRsaW5lUmVzdCA9IGl0ZXJhdG9yJDAubXVzdChzdGFydCkucmVwbGFjZShyZWdleHBzJDAuUFJFX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7Ly9cblx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH0vL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdGVsc2Ugey8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHRpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVW5leHBlY3QgY2hhcmFjdGVyIGFmdGVyIHN0YXRpYyBhcnJheSBpdGVtIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTsvL1xuXHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxlZShsaW5lUmVzdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gaXRlcmF0b3IkMC5tdXN0KHN0YXJ0KS5yZXBsYWNlKHJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY3RlciBpbiBzdGF0aWMgYXJyYXkgaXRlbSB2YWx1ZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KGxpbmVSZXN0KTtcbn0gKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgZXF1YWxJbmxpbmVUYWJsZSA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGluZVJlc3QgICAgICAgICkgICAgICAgICA9PiB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zJDAuVGFibGUoRElSRUNUTFksIElOTElORSk7XG5cdGlmICggb3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBpdGVyYXRvciQwLm1hcmsoJ0lubGluZSBUYWJsZScpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNhbGxlZSAobGluZVJlc3QpIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0bGluZVJlc3QgPSBhc3NpZ24oaW5saW5lVGFibGUsIGxpbmVSZXN0KTtcblx0XHRcdFx0aWYgKCBpdGVyYXRvciQwLnN0YWNrc19sZW5ndGg+bGVuZ3RoICkge1xuXHRcdFx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX2luc2VydEJlZm9yZUxhc3QoZnVuY3Rpb24gaW5zZXJ0ZWQgKGxpbmVSZXN0KSB7XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7Ly9cblx0XHRcdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9Ly9cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGVlKGxpbmVSZXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdFx0bGluZVJlc3QgPSBpdGVyYXRvciQwLm11c3Qoc3RhcnQpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHR9XG5cdFx0fShsaW5lUmVzdCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IHJldHVybiBsaW5lUmVzdC5yZXBsYWNlKHJlZ2V4cHMkMC5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0bGluZVJlc3QgJiYgbGluZVJlc3RbMF0hPT0nIycgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2FsbGVlIChsaW5lUmVzdCkge1xuXHRcdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0XHRsaW5lUmVzdCA9IGFzc2lnbihpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0XHRpZiAoIGl0ZXJhdG9yJDAuc3RhY2tzX2xlbmd0aD5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aXRlcmF0b3IkMC5zdGFja3NfaW5zZXJ0QmVmb3JlTGFzdChmdW5jdGlvbiBpbnNlcnRlZCAobGluZVJlc3QpIHtcblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyByZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsgfS8vXG5cdFx0XHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgey8vXG5cdFx0XHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UsICcnKTsvL1xuXHRcdFx0XHRcdFx0XHRsaW5lUmVzdFswXT09PSd9JyAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgVGhlIGxhc3QgcHJvcGVydHkgb2YgYW4gSW5saW5lIFRhYmxlIGNhbiBub3QgaGF2ZSBhIHRyYWlsaW5nIGNvbW1hYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7Ly9cblx0XHRcdFx0XHRcdH0vL1xuXHRcdFx0XHRcdFx0KCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSAmJiBpdGVyYXRvciQwLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7Ly9cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGVlKGxpbmVSZXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSd9JyApIHsgcmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7IH1cblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScsJyApIHtcblx0XHRcdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcyQwLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFRoZSBsYXN0IHByb3BlcnR5IG9mIGFuIElubGluZSBUYWJsZSBjYW4gbm90IGhhdmUgYSB0cmFpbGluZyBjb21tYWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBpbnRlbmRlZCB0byBhcHBlYXIgb24gYSBzaW5nbGUgbGluZWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdH0obGluZVJlc3QpO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmNvbnN0IGFzc2lnbiA9IChsYXN0SW5saW5lVGFibGUgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWZ0LCB0YWcgfSA9IHsgcmlnaHQ6IGxpbmVSZXN0IH0gPSByZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMobGluZVJlc3QpO1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBwYXJzZUtleXMobGVmdCk7XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsZWFkaW5nS2V5cy5sZW5ndGggLSAxXSA7XG5cdC0tbGVhZGluZ0tleXMubGVuZ3RoO1xuXHRjb25zdCB0YWJsZSAgICAgICAgPSBwcmVwYXJlSW5saW5lVGFibGUobGFzdElubGluZVRhYmxlLCBsZWFkaW5nS2V5cyk7XG5cdGZpbmFsS2V5IGluIHRhYmxlICYmIGl0ZXJhdG9yJDAudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgcHJvcGVydHkgZGVmaW5pdGlvbmAgKyBpdGVyYXRvciQwLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucyQwLmNvbGxlY3QodGFnLCBudWxsLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICd9Jzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdcIic6XG5cdFx0XHRyZXR1cm4gYXNzaWduQmFzaWNTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAneyc6XG5cdFx0XHRvcHRpb25zJDAuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yJDAud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdGl0ZXJhdG9yJDAuc3RhY2tzX3B1c2goKGxpbmVSZXN0ICAgICAgICApICAgICAgICAgPT4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KSk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRpdGVyYXRvciQwLnN0YWNrc19wdXNoKChsaW5lUmVzdCAgICAgICAgKSAgICAgICAgID0+IGVxdWFsU3RhdGljQXJyYXkodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCkpO1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcyQwLlZBTFVFX1JFU1RfZXhlYyhsaW5lUmVzdCkgPz8gaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIG9wdGlvbnMkMC5zRmxvYXQgKSB7XG5cdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IEluZmluaXR5O1xuXHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSAtSW5maW5pdHk7XG5cdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHRcdGlmICggbGl0ZXJhbD09PSduYW4nIHx8IGxpdGVyYWw9PT0nK25hbicgfHwgbGl0ZXJhbD09PSctbmFuJyApIHtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IE5hTjtcblx0XHRcdHJldHVybiBsaW5lUmVzdDtcblx0XHR9XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zJDAubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBEYXRlLVRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIFRpbWUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0aWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdH1cblx0dGFibGVbZmluYWxLZXldID1cblx0XHRsaXRlcmFsPT09J3RydWUnID8gdHJ1ZSA6IGxpdGVyYWw9PT0nZmFsc2UnID8gZmFsc2UgOlxuXHRcdFx0bGl0ZXJhbC5pbmNsdWRlcygnLicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4JykgPyBGbG9hdChsaXRlcmFsKSA6XG5cdFx0XHRcdG9wdGlvbnMkMC5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgPyBudWxsIDpcblx0XHRcdFx0XHRJbnRlZ2VyKGxpdGVyYWwpO1xuXHRyZXR1cm4gbGluZVJlc3Q7XG59O1xuXG5leHBvcnQgeyBSb290IGFzIGRlZmF1bHQgfTtcbmNvbnN0IFJvb3QgPSAoKSAgICAgICAgPT4ge1xuXHRjb25zdCByb290VGFibGUgICAgICAgID0gbmV3IG9wdGlvbnMkMC5UYWJsZTtcblx0bGV0IGxhc3RTZWN0aW9uVGFibGUgICAgICAgID0gcm9vdFRhYmxlO1xuXHR3aGlsZSAoIGl0ZXJhdG9yJDAucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yJDAubmV4dCgpLnJlcGxhY2UocmVnZXhwcyQwLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0aWYgKCBsaW5lICkge1xuXHRcdFx0aWYgKCBsaW5lWzBdPT09J1snICkge1xuXHRcdFx0XHRjb25zdCB7ICRfYXNBcnJheUl0ZW0kJCwga2V5cywgJCRhc0FycmF5SXRlbSRfLCB0YWcgfSA9IHJlZ2V4cHMkMC5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUpO1xuXHRcdFx0XHQkX2FzQXJyYXlJdGVtJCQ9PT0kJGFzQXJyYXlJdGVtJF8gfHwgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYFNxdWFyZSBicmFja2V0cyBvZiBUYWJsZSBkZWZpbml0aW9uIHN0YXRlbWVudCBub3QgbWF0Y2hgICsgaXRlcmF0b3IkMC53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdGxhc3RTZWN0aW9uVGFibGUgPSBhcHBlbmRUYWJsZShyb290VGFibGUsIGtleXMsICRfYXNBcnJheUl0ZW0kJCwgdGFnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBsaW5lWzBdPT09JyMnICkge1xuXHRcdFx0XHRyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IkMC50aHJvd3MoU3ludGF4RXJyb3IoYENvbnRyb2wgY2hhcmFjdGVycyBvdGhlciB0aGFuIFRhYiBhcmUgbm90IHBlcm1pdHRlZCBpbiBjb21tZW50c2AgKyBpdGVyYXRvciQwLndoZXJlKCcsIHdoaWNoIHdhcyBmb3VuZCBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgPSBhc3NpZ24obGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdHdoaWxlICggaXRlcmF0b3IkMC5zdGFja3NfbGVuZ3RoICkgeyByZXN0ID0gaXRlcmF0b3IkMC5zdGFja3NfcG9wKCkocmVzdCk7IH1cblx0XHRcdFx0cmVzdCAmJiByZXN0WzBdIT09JyMnICYmIGl0ZXJhdG9yJDAudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWNodG9yIGFmdGVyIGtleS92YWx1ZSBwYWlyYCArIGl0ZXJhdG9yJDAud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLkJ1ZmZlci5pc0J1ZmZlcj89KCk9PmZhbHNlJztcbmltcG9ydCBmcm9tIGZyb20gJy5CdWZmZXIuZnJvbT8nO1xuaW1wb3J0IGdsb2JhbFRoaXMgZnJvbSAnLmdsb2JhbFRoaXMnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuaW1wb3J0IHsgTk9OX1NDQUxBUiB9IGZyb20gJ0BsdGQvai11dGYnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciQwIGZyb20gJy4uL2l0ZXJhdG9yJDAnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyQwIGZyb20gJy4uL29wdGlvbnMkMCc7XG5pbXBvcnQgUm9vdCBmcm9tICcuLi9wYXJzZS9sZXZlbC1sb29wJztcblxuY29uc3QgSVNfTk9OX1NDQUxBUiA9IC8qI19fUFVSRV9fKi8oICgpID0+IHRoZVJlZ0V4cChOT05fU0NBTEFSKS50ZXN0ICkoKTtcbmNvbnN0IEJPTSA9ICdcXHVGRUZGJztcbmNvbnN0IGJ1ZjJzdHIgPSAoYnVmICAgICAgICApID0+IHtcblx0Y29uc3Qgc3RyID0gYnVmLnRvU3RyaW5nKCk7XG5cdGlmICggIWZyb20oc3RyKS5lcXVhbHMoYnVmKSApIHsgdGhyb3cgRXJyb3IoJ0EgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuJyk7IH1cblx0cmV0dXJuIHN0clswXT09PUJPTSA/IHN0ci5zbGljZSgxKSA6IHN0cjtcbn07XG5cbmV4cG9ydCB7IHBhcnNlIGFzIGRlZmF1bHQgfTtcbmNvbnN0IHBhcnNlID0gKFxuXHRzb3VyY2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdHNwZWNpZmljYXRpb25WZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cdG11bHRpTGluZUpvaW5lciAgICAgICAgLFxuXHR1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgPSB0cnVlLFxuXHR4T3B0aW9ucyAgICAgICAgICAgICAgICAgICAgLFxuKSAgICAgICAgPT4ge1xuXHRpdGVyYXRvciQwLmNvdWxkKCk7XG5cdGxldCBzb3VyY2VQYXRoICAgICAgICA7XG5cdGlmICggaXNCdWZmZXIoc291cmNlKSApIHtcblx0XHRzb3VyY2UgPSBidWYyc3RyKHNvdXJjZSk7XG5cdFx0c291cmNlUGF0aCA9ICcnO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlPT09J29iamVjdCcgJiYgc291cmNlICkge1xuXHRcdHNvdXJjZVBhdGggPSBzb3VyY2UucGF0aDtcblx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UucGF0aCknKTsgfVxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gc291cmNlO1xuXHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHsgc291cmNlID0gYnVmMnN0cigoIGdsb2JhbFRoaXMucmVxdWlyZSgnZnMnKSAgICAgICAgICAgICAgICAgICAgICAgICkucmVhZEZpbGVTeW5jKHNvdXJjZVBhdGgpKTsgfVxuXHRcdGVsc2UgaWYgKCBpc0J1ZmZlcihkYXRhKSApIHsgc291cmNlID0gYnVmMnN0cihkYXRhKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBzb3VyY2UgPSBkYXRhOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcignVE9NTC5wYXJzZShzb3VyY2UuZGF0YSknKTsgfVxuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2Ygc291cmNlPT09J3N0cmluZycgKSB7IHNvdXJjZVBhdGggPSAnJzsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKCdUT01MLnBhcnNlKHNvdXJjZSknKTsgfVxuXHR0cnkge1xuXHRcdGlmICggSVNfTk9OX1NDQUxBUihzb3VyY2UpICkgeyB0aHJvdyBFcnJvcignQSBUT01MIGRvYyBtdXN0IGJlIGEgKGZ1bC1zY2FsYXIpIHZhbGlkIFVURi04IGZpbGUsIHdpdGhvdXQgYW55IHVuY291cGxlZCBVQ1MtNCBjaGFyYWN0ZXIgY29kZS4nKTsgfVxuXHRcdHRyeSB7XG5cdFx0XHRvcHRpb25zJDAudXNlKHNwZWNpZmljYXRpb25WZXJzaW9uLCBtdWx0aUxpbmVKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpO1xuXHRcdFx0aXRlcmF0b3IkMC50b2RvKHNvdXJjZSwgc291cmNlUGF0aCk7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCByb290VGFibGUgPSBSb290KCk7XG5cdFx0XHRcdG9wdGlvbnMkMC5wcm9jZXNzKCk7XG5cdFx0XHRcdHJldHVybiByb290VGFibGU7XG5cdFx0XHR9XG5cdFx0XHRmaW5hbGx5IHtcblx0XHRcdFx0Ly9jbGVhcldlYWtTZXRzKCk7XG5cdFx0XHRcdGl0ZXJhdG9yJDAuZG9uZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmaW5hbGx5IHsgb3B0aW9ucyQwLmNsZWFyKCk7IH1cblx0fVxuXHRmaW5hbGx5IHsgY2xlYXJSZWdFeHAoKTsgfVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcblxuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UvJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGUiLCJ2ZXJzaW9uIiwiUHJveHkiLCJPYmplY3RfZGVmaW5lUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJEZWZhdWx0IiwiTnVsbCIsIm9yZGVyaWZ5X051bGwiLCJpdGVyYXRvciQwLnRocm93cyIsIml0ZXJhdG9yJDAud2hlcmUiLCJpdGVyYXRvciQwLmRvbmUiLCJyZWdleHBzJDAuc3dpdGNoUmVnRXhwIiwib3duS2V5cyIsImZyZWV6ZSIsInBhcnNlIiwib3B0aW9ucyQwLnplcm9EYXRldGltZSIsImlzIiwib3B0aW9ucyQwLmFsbG93TG9uZ2VyIiwib3B0aW9ucyQwLnVzaW5nQmlnSW50Iiwib3B0aW9ucyQwLkludGVnZXJNaW4iLCJvcHRpb25zJDAuSW50ZWdlck1heCIsIm9wdGlvbnMkMC5zRXJyb3IiLCJvcHRpb25zJDAudXNlV2hhdFRvSm9pbk11bHRpTGluZVN0cmluZyIsIml0ZXJhdG9yJDAubGluZUluZGV4IiwicmVnZXhwcyQwLl9fS0VZUyIsIm9wdGlvbnMkMC5kaXNhbGxvd0VtcHR5S2V5Iiwib3B0aW9ucyQwLlRhYmxlIiwib3B0aW9ucyQwLmNvbGxlY3QiLCJyZWdleHBzJDAuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QiLCJyZWdleHBzJDAuTElURVJBTF9TVFJJTkdfZXhlYyIsInJlZ2V4cHMkMC5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yJDAubWFyayIsIml0ZXJhdG9yJDAubXVzdCIsInJlZ2V4cHMkMC5CQVNJQ19TVFJJTkdfZXhlYyIsInJlZ2V4cHMkMC5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzAiLCJyZWdleHBzJDAuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QiLCJvcHRpb25zJDAuZW5kc1dpdGhRdW90ZSIsInJlZ2V4cHMkMC5QUkVfV0hJVEVTUEFDRSIsInJlZ2V4cHMkMC5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucyQwLmFzU3RyaW5ncyIsIm9wdGlvbnMkMC5pbmxpbmVUYWJsZSIsIml0ZXJhdG9yJDAuc3RhY2tzX3B1c2giLCJvcHRpb25zJDAuYXNUYWJsZXMiLCJvcHRpb25zJDAuYXNBcnJheXMiLCJyZWdleHBzJDAuVkFMVUVfUkVTVF9leGVjIiwib3B0aW9ucyQwLnNGbG9hdCIsIm9wdGlvbnMkMC5hc0Zsb2F0cyIsIm9wdGlvbnMkMC5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMkMC5tb3JlRGF0ZXRpbWUiLCJvcHRpb25zJDAuYXNMb2NhbERhdGVUaW1lcyIsIm9wdGlvbnMkMC5hc0xvY2FsVGltZXMiLCJvcHRpb25zJDAuYXNMb2NhbERhdGVzIiwib3B0aW9ucyQwLmFzQm9vbGVhbnMiLCJvcHRpb25zJDAuZW5hYmxlTnVsbCIsIm9wdGlvbnMkMC5hc051bGxzIiwib3B0aW9ucyQwLmFzSW50ZWdlcnMiLCJyZWdleHBzJDAuU1lNX1dISVRFU1BBQ0UiLCJpdGVyYXRvciQwLnN0YWNrc19sZW5ndGgiLCJpdGVyYXRvciQwLnN0YWNrc19pbnNlcnRCZWZvcmVMYXN0Iiwib3B0aW9ucyQwLmFsbG93SW5saW5lVGFibGVNdWx0aUxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEiLCJyZWdleHBzJDAuS0VZX1ZBTFVFX1BBSVJfZXhlY19ncm91cHMiLCJpdGVyYXRvciQwLnJlc3QiLCJpdGVyYXRvciQwLm5leHQiLCJyZWdleHBzJDAuVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyIsIml0ZXJhdG9yJDAuc3RhY2tzX3BvcCIsIml0ZXJhdG9yJDAuY291bGQiLCJvcHRpb25zJDAudXNlIiwiaXRlcmF0b3IkMC50b2RvIiwib3B0aW9ucyQwLnByb2Nlc3MiLCJvcHRpb25zJDAuY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBYyxRQUFROzs7Ozs7Ozs7Ozs7O0FDQXRCLGdCQUFjLE9BQU87O0FDSWQsSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDO0FBQ0osRUFBRSxDQUFDO0FB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