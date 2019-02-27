import * as iterator from './iterator';
import * as RE from './RE-higher.RegExp';

/* parser */

const MULTI_LINE_BASIC_STRING :RegExp = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
export function MULTI_LINE_BASIC_STRING_exec_0 (_ :string) :string {
	for ( let _0 :string = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ :RegExpExecArray = MULTI_LINE_BASIC_STRING.exec(_);
		if ( $===null ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\ \n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
export function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_ :string) :boolean {
	return _.replace(ESCAPED_EXCLUDE_CONTROL_CHARACTER, '')==='';
}

const BASIC_STRING :RegExp = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
export function BASIC_STRING_exec (_2 :string) :{ 1 :string, 2 :string } {
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ :RegExpExecArray = BASIC_STRING.exec(_2);
		if ( $===null ) {
			_2.startsWith('"')
			|| iterator.throwSyntaxError(iterator.where());
			return { 1: _1, 2: _2.replace(RE.SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const BARE_KEY :RegExp = /^[\w-]+/;
const LITERAL_KEY :RegExp = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const DOT_KEY :RegExp = /^[ \t]*\.[ \t]*/;

export function TABLE_DEFINITION_exec (_ :string) :{ 1 :boolean, 2 :string, 3 :boolean, 4 :string } {
	const _1 :boolean = _.charAt(1)==='[';
	_ = _.slice(_1 ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	const _2 :string = getKeys(_);
	_ = _.slice(_2.length).replace(RE.PRE_WHITESPACE, '');
	_.startsWith(']')
	|| iterator.throwSyntaxError(iterator.where());
	const _3 :boolean = _.charAt(1)===']';
	_ = _.slice(_3 ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	_===''
	|| _.startsWith('#')
	|| iterator.throwSyntaxError(iterator.where());
	return { 1: _1, 2: _2, 3: _3, 4: _ };
}

const KEY_VALUE_PAIR :RegExp = /^[ \t]*=[ \t]*(!!([\w-]*)[ \t]+)?([^ \t#][^]*)$/;
export function KEY_VALUE_PAIR_exec (_ :string) :{ 1 :string, 2 :string, 3 :string, 4 :string } {
	const _1 :string = getKeys(_);
	const $ :RegExpExecArray = KEY_VALUE_PAIR.exec(_.slice(_1.length));
	$
	|| iterator.throwSyntaxError(iterator.where());
	return { 1: _1, 2: $[1], 3: $[2], 4: $[3] };
}

function getKeys (_ :string) :string {
	for ( let keys :string = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key :string = '"'; ; ) {
				const $ :RegExpExecArray = BASIC_STRING.exec(_);
				if ( $===null ) {
					_.startsWith('"')
					|| iterator.throwSyntaxError(iterator.where());
					_ = _.slice(1);
					keys += key+'"';
					break;
				}
				_ = _.slice($[0].length);
				key += $[0];
			}
		}
		else {
			const key :string = ( ( _.startsWith('\'') ? LITERAL_KEY : BARE_KEY ).exec(_) || iterator.throwSyntaxError(iterator.where()) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ :RegExpExecArray = DOT_KEY.exec(_);
		if ( $===null ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}
