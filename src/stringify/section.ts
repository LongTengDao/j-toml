import TypeError from '.TypeError';
import Symbol from '.Symbol';
import Array from '.Array';
import DATE from '.Date.prototype';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import is from '.Object.is';
import isArray from '.Array.isArray';
import undefined from '.undefined';
import isString from '.class.isString';
import isNumber from '.class.isNumber';
import isBigInt from '.class.isBigInt';
import isBoolean from '.class.isBoolean';

import { theRegExp } from '@ltd/j-regexp';

import * as regexps from '../regexps';

import { commentForThis, getCOMMENT, getComment } from '../types/comment';
import { singlelineString } from './string';
import { float } from './float';
import { isSection, ofInline } from '../types/non-atom';
import { _literal } from '../types/atom';

const isDate = /*#__PURE__*/isPrototypeOf.bind(DATE) as (this :void, value :object) => value is Date;

const { test: BARE } = theRegExp(/^[\w-]+$/);
const $Key$ = (key :string) :string => BARE(key) ? key : singlelineString(key);

const FIRST = /[^.]+/;
const literalString = (value :string) :`'${string}'` => `'${value}'`;
const $Keys = (keys :string) :string => regexps.isAmazing(keys) ? keys.replace(FIRST, literalString) : keys==='null' ? `'null'` : keys;

export default class TOMLSection extends Array<string> {
	
	private readonly document :TOMLDocument;
	
	constructor (document :TOMLDocument) {
		super();
		this.document = document;
		return this;
	}
	
	[Symbol.toPrimitive] () { return this.join(this.document.newline); }
	
	appendNewline () { this[this.length] = ''; }
	private set appendLine (source :string) { this[this.length] = source; }
	private set appendInline (source :string) { this[this.length - 1] += source; }///
	private set appendInlineIf (source :string) { source && ( this[this.length - 1] += source ); }///
	
	* assignBlock<T extends READONLY.Table> (documentKeys_ :`` | `${string}.`, sectionKeys_ :`` | `${string}`, table :T, tableKeys :Extract<keyof T, string>[]) :X {
		const { document } = this;
		const { newlineUnderHeader, newlineUnderSectionButPair } = document;
		const newlineAfterDotted = sectionKeys_ ? document.newlineUnderPairButDotted : false;
		const newlineAfterPair = sectionKeys_ ? document.newlineUnderDotted : document.newlineUnderPair;
		for ( const tableKey of tableKeys ) {
			const value :READONLY.Layer = table[tableKey]!;
			const $key$ = $Key$(tableKey);
			const documentKeys = documentKeys_ + $key$;
			if ( isArray(value) ) {
				const { length } = value;
				if ( length ) {
					let firstItem = value[0];
					if ( isSection(firstItem) ) {
						const tableHeader = `[[${documentKeys}]]` as const;
						const documentKeys_ = documentKeys + '.' as `${string}.`;
						let index = 0;
						let table :READONLY.Table = firstItem;
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
							table = ( value as READONLY.ArrayOfTables )[index]!;
							if ( !isSection(table) ) { throw TypeError(`the first table item marked by Section() means the parent array is an array of tables, which can not include other types or table not marked by Section() any more in the rest items`); }
						}
						continue;
					}
					else { let index = 1; while ( index!==length ) { if ( isSection(value[index++]!) ) { throw TypeError(`if an array is not array of tables, it can not include any table that marked by Section()`); } } }
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
						yield section.assignBlock(documentKeys + '.' as `${string}.`, ``, value, getOwnPropertyNames(value));
						newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
					}
					else {
						yield section.assignBlock(documentKeys + '.' as `${string}.`, ``, value, getOwnPropertyNames(value));
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
				yield this.assignBlock(documentKeys + '.' as `${string}.`, sectionKeys + '.' as `${string}.`, value as unknown as READONLY.InlineTable, valueKeysIfValueIsDottedTable);
				newlineAfterDotted && this.appendNewline();
			}
			else {
				this.appendInlineIf = getComment(table, tableKey);
				newlineAfterPair && this.appendNewline();
			}
		}
	}
	
	private value (indent :string, value :READONLY.Value, returnValueKeysIfValueIsDottedTable :boolean) :string[] | null {
		switch ( typeof value ) {
			case 'object':
				if ( value===null ) {
					if ( this.document.nullDisabled ) { throw TypeError(`toml can not stringify "null" type value without truthy options.xNull`); }
					this.appendInline = 'null';
					break;
				}
				const inlineMode = ofInline(value);
				if ( isArray(value) ) {
					inlineMode
						? this.singlelineArray(indent, value)
						: this.staticArray(indent, value);
					break;
				}
				if ( inlineMode!==undefined ) {
					inlineMode || this.document.multilineTableDisabled
						? this.inlineTable(indent, value as READONLY.InlineTable)
						: this.multilineTable(indent, value as READONLY.InlineTable, this.document.multilineTableComma);
					break;
				}
				if ( isDate(value) ) {
					this.appendInline = this.document._ ? value.toISOString().replace('T', ' ') : value.toISOString();
					break;
				}
				if ( _literal in value ) {
					const literal = ( value as { readonly [_literal] :string | readonly [ string, ...string[] ] } )[_literal];
					if ( typeof literal==='string' ) { this.appendInline = literal; }
					else if ( isArray(literal) ) {
						const { length } = literal;
						if ( length ) {
							this.appendInline = literal[0];
							let index = 1;
							while ( index!==length ) { this.appendLine = literal[index++]!; }
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
					const keys = getOwnPropertyNames(value as READONLY.InlineTable);
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
				}
				else {
					this.inlineTable(indent, value as READONLY.InlineTable);
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
	
	private singlelineArray (indent :string, staticArray :READONLY.StaticArray) {
		const { length } = staticArray;
		if ( length ) {
			this.appendInline = '[ ';
			this.value(indent, staticArray[0]!, false);
			let index = 1;
			while ( index!==length ) {
				this.appendInline = ', ';
				this.value(indent, staticArray[index++]!, false);
			}
			this.appendInline = ' ]';
		}
		else { this.appendInline = '[ ]'; }
	}
	private staticArray (indent :string, staticArray :READONLY.StaticArray) {
		this.appendInline = '[';
		const indent_ = indent + this.document.indent;
		const { length } = staticArray;
		let index = 0;
		while ( index!==length ) {
			this.appendLine = indent_;
			this.value(indent_, staticArray[index++]!, false);
			this.appendInline = ',';
		}
		this.appendLine = indent + ']';
	}
	
	private inlineTable (indent :string, inlineTable :READONLY.InlineTable) {
		const keys = getOwnPropertyNames(inlineTable);
		if ( keys.length ) {
			this.appendInline = '{ ';
			this.assignInline(indent, inlineTable, ``, keys);
			this[this.length - 1] = this[this.length - 1]!.slice(0, -2) + ' }';
		}
		else { this.appendInline = '{ }'; }
	}
	private multilineTable (indent :string, inlineTable :READONLY.InlineTable, comma :boolean) {
		this.appendInline = '{';
		this.assignMultiline(indent, inlineTable, ``, getOwnPropertyNames(inlineTable), comma);
		this.appendLine = indent + '}';
	}
	private assignInline<T extends READONLY.InlineTable> (indent :string, inlineTable :T, keys_ :`` | `${string}.`, keys :Extract<keyof T, string>[]) {
		for ( const key of keys ) {
			const value :READONLY.Value = inlineTable[key]!;
			const keys = keys_ + $Key$(key);
			const before_value = this.appendInline = $Keys(keys) + ' = ';
			const valueKeysIfValueIsDottedTable = this.value(indent, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				this[this.length - 1] = this[this.length - 1]!.slice(0, -before_value.length);
				this.assignInline(indent, value as READONLY.InlineTable, keys + '.' as `${string}.`, valueKeysIfValueIsDottedTable);
			}
			else { this.appendInline = ', '; }
		}
	}
	private assignMultiline<T extends READONLY.InlineTable> (indent :string, inlineTable :T, keys_ :`` | `${string}.`, keys :Extract<keyof T, string>[], comma :boolean) {
		const indent_ = indent + this.document.indent;
		for ( const key of keys ) {
			const value :READONLY.Value = inlineTable[key]!;
			const keys = keys_ + $Key$(key);
			this.appendLine = indent_ + $Keys(keys) + ' = ';
			const valueKeysIfValueIsDottedTable = this.value(indent_, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				--this.length;
				this.assignMultiline(indent, value as READONLY.InlineTable, keys + '.' as `${string}.`, valueKeysIfValueIsDottedTable, comma);
			}
			else {
				comma
					? this.appendInline = ',' + getComment(inlineTable, key)
					: this.appendInlineIf = getComment(inlineTable, key);
			}
		}
	}
	
}

type X = import('../j-lexer').default<void>;

import type TOMLDocument from './document';
import type * as READONLY from './readonly';