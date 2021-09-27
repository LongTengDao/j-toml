import TypeError from '.TypeError';
import Boolean from '.Boolean';
import String from '.String';
import BigInt from '.BigInt';
import Number from '.Number';
import Symbol_ from '.Symbol';
import Array from '.Array';
import TOMLDatetime from '.Date';
import test from '.RegExp.prototype.test';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import isArray from '.Array.isArray';
import undefined from '.undefined';

import { getComment } from './comment';
import { isLiteral } from './literal';
import { singlelineString } from './string';
import { float } from './float';
import { isSection, ofInline } from './non-atom';

const BARE = /*#__PURE__*/test.bind(/^[\w-]+$/);
const $Key$ = (key :string) :string => BARE(key) ? key : singlelineString(key);

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
				if ( value.length && isSection(value[0]) ) {
					const tableHeader = `[[${documentKeys}]]` as const;
					const documentKeys_ = documentKeys + '.' as `${string}.`;
					for ( const table of value as READONLY.ArrayOfTables ) {
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
			this.appendLine = sectionKeys + ' = ';
			const keysIfDotted = this.value('', value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				--this.length;
				yield this.assignBlock(documentKeys + '.' as `${string}.`, sectionKeys + '.' as `${string}.`, value as unknown as READONLY.InlineTable, keysIfDotted);
				newlineAfterDotted && this.appendNewline();
			}
			else {
				this.appendInlineIf = getComment(table, tableKey);
				newlineAfterPair && this.appendNewline();
			}
		}
	}
	
	private value (indent :string, value :READONLY.Value, getOwnPropertyNames? :(this :void, object :READONLY.InlineTable) => string[]) {
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
					while ( index!==length ) { this.appendLine = value[index++]!; }
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
				if ( value instanceof TOMLDatetime ) {
					this.appendInline = this.document._ ? value.toISOString().replace('T', ' ') : value.toISOString();
					break;
				}
				if ( value instanceof String ) { throw TypeError(`TOML.stringify refuse to handle [object String]`); }
				if ( getOwnPropertyNames ) {
					const keys = getOwnPropertyNames(value as READONLY.InlineTable);
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
					break;
				}
				else {
					if ( value instanceof BigInt ) { throw TypeError(`TOML.stringify refuse to handle [object BigInt]`); }
					if ( value instanceof Number ) { throw TypeError(`TOML.stringify refuse to handle [object Number]`); }
					if ( value instanceof Boolean ) { throw TypeError(`TOML.stringify refuse to handle [object Boolean]`); }
					if ( value instanceof Symbol_ ) { throw TypeError(`TOML.stringify refuse to handle [object Symbol]`); }
					this.inlineTable(indent, value as READONLY.InlineTable);
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
	
	private singlelineArray (indent :string, staticArray :READONLY.StaticArray) {
		const { length } = staticArray;
		if ( length ) {
			this.appendInline = '[ ';
			this.value(indent, staticArray[0]!);
			let index = 1;
			while ( index!==length ) {
				this.appendInline = ', ';
				this.value(indent, staticArray[index++]!);
			}
			this.appendInline = ' ]';
		}
		else { this.appendInline = '[ ]'; }
	}
	private staticArray (indent :string, staticArray :READONLY.StaticArray) {
		this.appendInline = '[';
		const indent_ = indent + this.document.indent;
		for ( const item of staticArray ) {
			this.appendLine = indent_;
			this.value(indent_, item);
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
			const before_value = this.appendInline = keys + ' = ';
			const keysIfDotted = this.value(indent, value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				this[this.length - 1] = this[this.length - 1]!.slice(0, -before_value.length);
				this.assignInline(indent, value as READONLY.InlineTable, keys + '.' as `${string}.`, keysIfDotted);
			}
			else { this.appendInline = ', '; }
		}
	}
	private assignMultiline<T extends READONLY.InlineTable> (indent :string, inlineTable :T, keys_ :`` | `${string}.`, keys :Extract<keyof T, string>[], comma :boolean) {
		const indent_ = indent + this.document.indent;
		for ( const key of keys ) {
			const value :READONLY.Value = inlineTable[key]!;
			const keys = keys_ + $Key$(key);
			this.appendLine = indent_ + keys + ' = ';
			const keysIfDotted = this.value(indent_, value, getOwnPropertyNames);
			if ( keysIfDotted ) {
				--this.length;
				this.assignMultiline(indent, value as READONLY.InlineTable, keys + '.' as `${string}.`, keysIfDotted, comma);
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