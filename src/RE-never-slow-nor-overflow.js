import { throwSyntaxError, where } from './iterator.js';
import * as RE from './RE.js?<RegExp>';

const MULTI_LINE_BASIC_STRING = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
export function MULTI_LINE_BASIC_STRING_exec_0 (_) {
	for ( let _0 = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ = MULTI_LINE_BASIC_STRING.exec(_);
		if ( $===null ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\ \n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
export function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_) {
	return _.replace(ESCAPED_EXCLUDE_CONTROL_CHARACTER, '')==='';
}

const BASIC_STRING = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
export function BASIC_STRING_exec (_2) {
	_2 = _2.slice(1);
	for ( let _1 = ''; ; ) {
		const $ = BASIC_STRING.exec(_2);
		if ( $===null ) {
			_2.startsWith('"') || throwSyntaxError(where());
			return { 1: _1, 2: _2.replace(RE.SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const BARE_KEY = /^[\w-]+/;
const LITERAL_KEY = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const DOT_KEY = /^[ \t]*\.[ \t]*/;

export function TABLE_DEFINITION_exec (_) {
	const _1 = _.charAt(1)==='[';
	_ = _.slice(_1 ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	const _2 = getKeys(_);
	_ = _.slice(_2.length).replace(RE.PRE_WHITESPACE, '');
	_.startsWith(']') || throwSyntaxError(where());
	const _3 = _.charAt(1)===']';
	_ = _.slice(_3 ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	_==='' || _.startsWith('#') || throwSyntaxError(where());
	return { 1: _1, 2: _2, 3: _3, 4: _ };
}

const KEY_VALUE_PAIR = /^[ \t]*=[ \t]*(!!([\w-]*)[ \t]+)?([^ \t#][^]*)$/;
export function KEY_VALUE_PAIR_exec (_) {
	const _1 = getKeys(_);
	const $ = KEY_VALUE_PAIR.exec(_.slice(_1.length)) || throwSyntaxError(where());
	return { 1: _1, 2: $[1], 3: $[2], 4: $[3] };
}

function getKeys (_) {
	for ( let keys = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key = '"'; ; ) {
				const $ = BASIC_STRING.exec(_);
				if ( $===null ) {
					_.startsWith('"') || throwSyntaxError(where());
					_ = _.slice(1);
					keys += key+'"';
					break;
				}
				_ = _.slice($[0].length);
				key += $[0];
			}
		}
		else {
			const key = ( ( _.startsWith("'") ? LITERAL_KEY : BARE_KEY ).exec(_) || throwSyntaxError(where()) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ = DOT_KEY.exec(_);
		if ( $===null ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}
