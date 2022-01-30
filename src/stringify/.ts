import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import freeze from '.Object.freeze';
import isArray from '.Array.isArray';
import Null from '.null';

import { x } from '../j-lexer';/// external

import TOMLDocument from './document';
export default (rootTable :READONLY.Table, options :READONLY.Options) :string | string[] => {
	const document = new TOMLDocument(options);
	const section = document[0];
	section[0] = '';
	x<void>(section.assignBlock(``, ``, rootTable, getOwnPropertyNames(rootTable)));
	document.newlineUnderSectionButPair && section.length!==1 && section.appendNewline();
	document.newlineUnderSection || document[document.length - 1]!.appendNewline();
	return document.newline ? document.join(document.newline) : document.flat();
};

export { inline, Section } from '../types/non-atom';
export { _literal } from '../types/atom';
import { LiteralObject } from '../types/atom';
import { multilineTable } from '../types/non-atom';
import { singlelineBasicString, Lines, multilineString, multilineBasicString, multilineLiteralString, multilineNeedBasic } from './string';
export const multiline = /*#__PURE__*/( () => {
	const multiline = (value :READONLY.InlineTable | string | readonly [ ...string[], string ] & { readonly raw? :readonly [ string, ...string[] ] }, string? :string) =>
		typeof value==='string' ? LiteralObject(( multilineNeedBasic(value) ? multilineBasicString : multilineLiteralString )(( '\n' + value ).split('\n') as Lines), value) :
			isArray(value) ? LiteralObject(multilineString(Lines(value)), typeof string==='string' ? string : Null(null)) :
				multilineTable(value);
	multiline.basic = (lines :string | readonly [ ...string[], string ] & { readonly raw? :readonly [ string, ...string[] ] }, string? :string) =>
		typeof lines==='string'
			? LiteralObject(multilineBasicString(( '\n' + lines ).split('\n') as Lines), lines)
			: LiteralObject(multilineBasicString(Lines(lines)), typeof string==='string' ? string : Null(null))
	;
	freeze(multiline);
	return multiline;
} )();
export const basic = (value :string) => LiteralObject(singlelineBasicString(value), value);
export const literal = (literal :string | TemplateStringsArray, ...chars :string[]) => {
	if ( typeof literal==='string' ) {
		if ( chars.length===1 ) {
			return LiteralObject(literal.includes('\n') ? literal.split('\n') as [ string, ...string[] ] : literal, chars[0] as string | bigint | number);
		}
	}
	else {
		let index = chars.length;
		if ( index ) {
			const { raw } = literal;
			literal = raw[index]!;
			while ( index ) { chars[--index] += raw[index]!; }
			literal = chars.join('') + literal;
		}
		else { literal = literal.raw[0]!; }
	}
	return LiteralObject(literal.includes('\n') ? literal.split('\n') as [ string, ...string[] ] : literal, Null(null));
};

import type * as READONLY from './readonly';