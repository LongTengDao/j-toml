import SyntaxError from '.SyntaxError';
import * as options from '../options';
import * as iterator from '../iterator';
import * as RE from './nested (readable)';

/* parser */

const MULTI_LINE_BASIC_STRING :RegExp = /^(?:[^\\"]+|\\[^]|""?(?!"))/;
export function MULTI_LINE_BASIC_STRING_exec_0 (_ :string) :string {
	for ( let _0 :string = ''; ; ) {
		if ( _==='' ) { return _0; }
		const $ :RegExpExecArray | null = MULTI_LINE_BASIC_STRING.exec(_);
		if ( $===null ) { return _0; }
		_0 += $[0];
		_ = _.slice($[0].length);
	}
}

const ESCAPED_EXCLUDE_CONTROL_CHARACTER :RegExp = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER :RegExp = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]| *\n[ \n]*|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/g;
export function ESCAPED_EXCLUDE_CONTROL_CHARACTER_test (_ :string) :boolean {
	return _.replace(options.ctrl7F ? ESCAPED_EXCLUDE_CONTROL_CHARACTER : ESCAPED_EXCLUDE_CONTROL_CHARACTER_LESSER, '')==='';
}

const BASIC_STRING :RegExp = /^(?:[^\\"\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
const BASIC_STRING_LESSER :RegExp = /^(?:[^\\"\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}))/;
export function BASIC_STRING_exec (_2 :string) :{ 1 :string, 2 :string } {
	const basic_string = options.ctrl7F ? BASIC_STRING : BASIC_STRING_LESSER;
	_2 = _2.slice(1);
	for ( let _1 :string = ''; ; ) {
		const $ :RegExpExecArray | null = basic_string.exec(_2);
		if ( $===null ) {
			_2.startsWith('"') || iterator.throws(SyntaxError(iterator.where()));
			return { 1: _1, 2: _2.replace(RE.SYM_WHITESPACE, '') };
		}
		_1 += $[0];
		_2 = _2.slice($[0].length);
	}
}

const BARE_KEY :RegExp = /^[\w-]+/;
const LITERAL_KEY :RegExp = /^'[^'\x00-\x08\x0B-\x1F\x7F]*'/;
const LITERAL_KEY_LESSER :RegExp = /^'[^'\x00-\x08\x0B-\x1F]*'/;
const DOT_KEY :RegExp = /^[ \t]*\.[ \t]*/;

export function TABLE_DEFINITION_exec_groups (_ :string) :{ $_asArrayItem$$ :boolean, keys :string, tagInner :string, $$asArrayItem$_ :boolean, tagOuter :string } {
	const $_asArrayItem$$ :boolean = _.charAt(1)==='[';
	_ = _.slice($_asArrayItem$$ ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	const keys :string = getKeys(_);
	_ = _.slice(keys.length).replace(RE.PRE_WHITESPACE, '');
	let tagInner :string = '';
	if ( _.startsWith('(') ) { ( { 1: tagInner, 2: _ } = RE.TAG_REST.exec(_) || iterator.throws(SyntaxError(iterator.where())) ); }
	_.startsWith(']') || iterator.throws(SyntaxError(iterator.where()));
	const $$asArrayItem$_ :boolean = _.charAt(1)===']';
	_ = _.slice($$asArrayItem$_ ? 2 : 1).replace(RE.PRE_WHITESPACE, '');
	let tagOuter :string = '';
	if ( _.startsWith('(') ) { ( { 1: tagOuter, 2: _ } = RE.TAG_REST.exec(_) || iterator.throws(SyntaxError(iterator.where())) ); }
	_==='' || _.startsWith('#') || iterator.throws(SyntaxError(iterator.where()));
	return { $_asArrayItem$$, keys, tagInner, $$asArrayItem$_, tagOuter };
}

export function KEY_VALUE_PAIR_exec_groups (_ :string) :{ left :string, tagLeft :string, tagRight :string, right :string } {
	const _1 :string = getKeys(_);
	const $ :RegExpExecArray = RE.KEY_VALUE_PAIR.exec(_.slice(_1.length)) || iterator.throws(SyntaxError(iterator.where()));
	return { left: _1, tagLeft: $[1] || '', tagRight: $[2] || '', right: $[3] };
}

function getKeys (_ :string) :string {
	const literal_key = options.ctrl7F ? LITERAL_KEY : LITERAL_KEY_LESSER;
	for ( let keys :string = ''; ; ) {
		if ( _.startsWith('"') ) {
			_ = _.slice(1);
			for ( let key :string = '"'; ; ) {
				const $ :RegExpExecArray | null = BASIC_STRING.exec(_);
				if ( $===null ) {
					_.startsWith('"') || iterator.throws(SyntaxError(iterator.where()));
					_ = _.slice(1);
					keys += key+'"';
					break;
				}
				_ = _.slice($[0].length);
				key += $[0];
			}
		}
		else {
			const key :string = ( ( _.startsWith('\'') ? literal_key : BARE_KEY ).exec(_) || iterator.throws(SyntaxError(iterator.where())) )[0];
			_ = _.slice(key.length);
			keys += key;
		}
		const $ :RegExpExecArray | null = DOT_KEY.exec(_);
		if ( $===null ) { return keys; }
		_ = _.slice($[0].length);
		keys += $[0];
	}
}
