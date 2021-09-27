
export type ArrayOfTables = readonly [ Table, ...Table[] ];

export interface Table extends Null<Layer> {
	readonly [key :string] :Layer
	readonly [keyComment :symbol] :unknown
}

export type Layer = Value | ArrayOfTables | Table;

export type Value = null | boolean | bigint | number | string | Literal | Datetime | StaticArray | InlineTable;

export type StaticArray = readonly Value[];

export interface InlineTable extends Null<Value> {
	readonly [key :string] :Value
	readonly [keyComment :symbol] :unknown
}

export interface Datetime { toISOString () :string }

export type Literal = readonly [ string, ...string[] ];

export type Options = undefined | {
	readonly newline? :'\n' | '\r\n'
	readonly newlineAround? :'document' | 'section' | 'header' | 'pairs' | 'pair'
	readonly indent? :string | number
	readonly T? :'T' | ' '
	readonly xNull? :boolean
	readonly xBeforeNewlineInMultilineTable? :'' | ','
};

import type Null from '.null';