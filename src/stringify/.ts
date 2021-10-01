import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import freeze from '.Object.freeze';
import isArray from '.Array.isArray';

import { x } from '../j-lexer';///

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

export { literal } from './literal';
export { inline, Section } from '../types/non-atom';

import { Lines, multilineString, multilineBasicString } from './string';
import { multilineTable } from '../types/non-atom';
export const multiline = /*#__PURE__*/( () => {
	const multiline = (value :READONLY.InlineTable | string | readonly [ ...string[], string ] & { readonly raw? :readonly [ string, ...string[] ] }) =>
		typeof value==='string' ? multilineString(( '\n' + value ).split('\n') as Lines) :
			isArray(value) ? multilineString(Lines(value)) :
				multilineTable(value);
	multiline.basic = (lines :string | readonly [ ...string[], string ] & { readonly raw? :readonly [ string, ...string[] ] }) =>
		multilineBasicString(
			typeof lines==='string'
				? ( '\n' + lines ).split('\n') as Lines
				: Lines(lines)
		);
	freeze(multiline);
	return multiline;
} )();

import type * as READONLY from './readonly';