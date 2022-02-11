
export type ArrayOfTables = readonly [ Table, ...Table[] ];

export interface Table extends Null<Layer> {
	readonly [key :string] :Layer
	readonly [keyComment :symbol] :unknown
}

export type Layer = Value | ArrayOfTables | Table;

export type Value = null | boolean | bigint | number | string | { readonly [_literal] :string | readonly [ string, ...string[] ] } | Datetime | StaticArray | InlineTable;

export type StaticArray = readonly Value[];

export interface InlineTable extends Null<Value> {
	readonly [key :string] :Value
	readonly [keyComment :symbol] :unknown
}

export interface Datetime { toISOString () :string }

export type Options = undefined | {
	readonly integer? :number
	readonly newline? :'\n' | '\r\n'
	readonly newlineAround? :'document' | 'section' | 'header' | 'pairs' | 'pair'
	readonly indent? :string | number
	readonly T? :'T' | ' '
	readonly preferCommentFor? :'key' | 'this'
	readonly xNull? :boolean
	readonly xBeforeNewlineInMultilineTable? :'' | ','
	readonly forceInlineArraySpacing? :0 | 1 | 2 | 3
};

import type { _literal } from '../types/atom';
import type Null from '.null';