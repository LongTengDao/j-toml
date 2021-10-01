export = exports;

declare namespace exports {
	
	export const version :'1.19.0';
	
	export const parse :
		& {
			   <CustomValue                                                  > (this :void, source :Source, specificationVersion :1.0, multilineStringJoiner  :string, useBigInt  :boolean | number     , xOptions  :TagProcessor<CustomValue> | { readonly tag  :TagProcessor<CustomValue>, readonly null? :boolean/* = false */ } & TypeAgnosticOptions             ) :Table<CustomValue>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :1.0, multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true                      | { readonly tag? :null                     , readonly null  :true                 } & TypeAgnosticOptions             ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :1.0, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false              | { readonly tag? :null                     , readonly null? :false                } & TypeAgnosticOptions/* = null */ ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
			
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.5, multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions :true          | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions            ) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.5, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */) :Table<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>;
			
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.4, multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true         | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions            ) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull_WithoutMoreDatetime : BasicValueWithNull_WithoutMoreDatetime>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.4, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutMoreDatetime : BasicValue_WithoutMoreDatetime>;
			
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.3, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.2, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source, specificationVersion :0.1, multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime : BasicValue_WithoutArrayOfTables_WithoutMoreDatetime>;
			
			   <CustomValue                                                  > (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :boolean | number     , x         :TagProcessor<CustomValue> | { readonly tag :TagProcessor<CustomValue>, readonly null? :boolean/* = false */ } & TypeAgnosticOptions             }) :Table<CustomValue>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :UseBigInt/* = true */, x         :true                      | { readonly tag? :null                    , readonly null  :true                 } & TypeAgnosticOptions             }) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false              | { readonly tag? :null                    , readonly null? :false                } & TypeAgnosticOptions/* = null */ }) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
			   <CustomValue                                                  > (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :boolean | number     , xOptions  :TagProcessor<CustomValue> | { readonly tag :TagProcessor<CustomValue>, readonly null? :boolean/* = false */ } & TypeAgnosticOptions              ) :Table<CustomValue>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true                      | { readonly tag? :null                    , readonly null  :true                 } & TypeAgnosticOptions              ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
			   <CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false              | { readonly tag? :null                    , readonly null? :false                } & TypeAgnosticOptions/* = null */  ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
		}
		& Readonly<{
			1.0<CustomValue                                                  > (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :boolean | number     , x         :TagProcessor<CustomValue> | { readonly tag :TagProcessor<CustomValue>, readonly null? :boolean/* = false */ } & TypeAgnosticOptions             }) :Table<CustomValue>;
			1.0<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :UseBigInt/* = true */, x         :true                      | { readonly tag? :null                    , readonly null  :true                 } & TypeAgnosticOptions             }) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
			1.0<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false              | { readonly tag? :null                    , readonly null? :false                } & TypeAgnosticOptions/* = null */ }) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
			1.0<CustomValue                                                  > (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :boolean | number     , xOptions  :TagProcessor<CustomValue> | { readonly tag :TagProcessor<CustomValue>, readonly null? :boolean/* = false */ } & TypeAgnosticOptions              ) :Table<CustomValue>;
			1.0<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true                      | { readonly tag? :null                    , readonly null  :true                 } & TypeAgnosticOptions              ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
			1.0<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false              | { readonly tag? :null                    , readonly null? :false                } & TypeAgnosticOptions/* = null */  ) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
			
			0.5<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :UseBigInt/* = true */, x         :true         | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions             }) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>;
			0.5<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */ }) :Table<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>;
			0.5<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true         | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions              ) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>;
			0.5<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */  ) :Table<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>;
			
			0.4<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options  :{    joiner? :string,    bigint? :UseBigInt/* = true */, x         :true         | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions             }) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull_WithoutMoreDatetime : BasicValueWithNull_WithoutMoreDatetime>;
			0.4<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */ }) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutMoreDatetime : BasicValue_WithoutMoreDatetime>;
			0.4<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner  :string, useBigInt  :UseBigInt            , xOptions  :true         | { readonly tag? :null, readonly null  :true  } & TypeAgnosticOptions              ) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull_WithoutMoreDatetime : BasicValueWithNull_WithoutMoreDatetime>;
			0.4<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false | { readonly tag? :null, readonly null? :false } & TypeAgnosticOptions/* = null */  ) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutMoreDatetime : BasicValue_WithoutMoreDatetime>;
			
			0.3<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false }) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			0.3<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false  ) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			
			0.2<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false }) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			0.2<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false  ) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
			
			0.1<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            options? :{    joiner? :string,    bigint? :UseBigInt/* = true */, x       ? :null | false }) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime : BasicValue_WithoutArrayOfTables_WithoutMoreDatetime>;
			0.1<CustomValue extends never, UseBigInt extends boolean | number> (this :void, source :Source,                            multilineStringJoiner? :string, useBigInt? :UseBigInt/* = true */, xOptions? :null | false  ) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime : BasicValue_WithoutArrayOfTables_WithoutMoreDatetime>;
		}>;
	
	export function stringify (this :void, rootTable :ReadonlyTable, options? :{
		readonly newline? :'\n' | '\r\n'
		readonly newlineAround? :'document' | 'section' | 'header' | 'pairs' | 'pair'
		readonly indent? :string | number
		readonly T? :'T' | ' '
		readonly xNull? :boolean
		readonly xBeforeNewlineInMultilineTable? :',' | ''
	}) :string;
	
	export function isSection (this :void, table :ReadonlyTable) :boolean;
	export function isInline (this :void, table :ReadonlyTable) :boolean;
	
	export function Section<T extends ReadonlyTable> (this :void, table :T) :T;
	export function inline<T extends ReadonlyTable | readonly ReadonlyValue[]> (this :void, value :T) :T;
	export const multiline :{
			<T extends ReadonlyTable>
			(this :void, value :T) :T
			(this :void, lines :string | readonly [ string, ...string[] ]) :Literal & readonly [ `"""`, ...string[], `${string}"""` ] | readonly [ `'''`, ...string[], `${string}'''` ] & Literal
		readonly basic :{
			(this :void, lines :string | readonly [ string, ...string[] ]) :Literal & readonly [ `"""`, ...string[], `${string}"""` ]
		}
	};
	export function literal (this :void, literal :TemplateStringsArray, ...chars :string[]) :Literal & readonly [ string, ...string[] ];
	export function literal (this :void, literal :string                                  ) :Literal & readonly [ string, ...string[] ];
	export function commentFor (this :void, key :string) :symbol;
	
	export { OffsetDateTime, LocalDateTime, LocalDate, LocalTime };
	
	export { exports as default };
	
}

declare class OffsetDateTime {
	readonly toJSON :Date['toJSON'];
	readonly toISOString :(this :Readonly<OffsetDateTime>) => `${number}-${number}-${number}T${number}:${number}:${number}${'' | `.${number}`}${'Z' | `${'+' | '-'}${number}:${number}`}`;
	readonly valueOf :(this :Readonly<OffsetDateTime>) => `${number}${'' | `.${number}`}`;
	private [OffsetDateTime_ISOString] :string;
	private [OffsetDateTime_value] :string;
	constructor (literal :`${number}-${number}-${number}${'T' | ' '}${number}:${number}:${number}${'' | `.${number}`}${'Z' | `${'+' | '-'}${number}:${number}`}`);
	readonly getUTCFullYear :(this :Readonly<OffsetDateTime>) => _1_10000;
	readonly getUTCMonth :(this :Readonly<OffsetDateTime>) => _0_11;
	readonly getUTCDate :(this :Readonly<OffsetDateTime>) => _1_31;
	readonly getUTCHours :(this :Readonly<OffsetDateTime>) => _0_23;
	readonly getUTCMinutes :(this :Readonly<OffsetDateTime>) => _0_59;
	readonly getUTCSeconds :(this :Readonly<OffsetDateTime>) => _0_59;
	readonly getUTCMilliseconds :(this :Readonly<OffsetDateTime>) => _0_999;
	readonly getUTCDay :(this :Readonly<OffsetDateTime>) => _0_6;
	readonly getDay :(this :Readonly<OffsetDateTime>) => _0_6;
	readonly getTimezoneOffset :(this :Readonly<OffsetDateTime>) => _1439_1439;
	readonly setTimezoneOffset :(this :OffsetDateTime, _ :_1439_1439) => number;
	readonly getTime :(this :Readonly<OffsetDateTime>) => number;
	readonly setTime :(this :OffsetDateTime, time :number) => number;
}
declare class LocalDateTime {
	readonly toJSON :Date['toJSON'];
	readonly toISOString :(this :Readonly<LocalDateTime>) => `${number}-${number}-${number}T${number}:${number}:${number}${'' | `.${number}`}`;
	readonly valueOf :(this :Readonly<LocalDateTime>) => `${number}`;
	private [LocalDateTime_ISOString] :string;
	private [LocalDateTime_value] :string;
	constructor (literal :`${number}-${number}-${number}${'T' | ' '}${number}:${number}:${number}${'' | `.${number}`}`);
	readonly getFullYear :(this :Readonly<LocalDateTime>) => _0_9999;
	readonly setFullYear :(this :LocalDateTime, year :_0_9999) => number;
	readonly getMonth :(this :Readonly<LocalDateTime>) => _0_11;
	readonly setMonth :(this :LocalDateTime, month :_0_11) => number;
	readonly getDate :(this :Readonly<LocalDateTime>) => _1_31;
	readonly setDate :(this :LocalDateTime, date :_1_31) => number;
	readonly getHours :(this :Readonly<LocalDateTime>) => _0_23;
	readonly setHours :(this :LocalDateTime, hours :_0_23) => number;
	readonly getMinutes :(this :Readonly<LocalDateTime>) => _0_59;
	readonly setMinutes :(this :LocalDateTime, min :_0_59) => number;
	readonly getSeconds :(this :Readonly<LocalDateTime>) => _0_59;
	readonly setSeconds :(this :LocalDateTime, sec :_0_59) => number;
	readonly getMilliseconds :(this :Readonly<LocalDateTime>) => _0_999;
	readonly setMilliseconds :(this :LocalDateTime, ms :_0_999) => number;
}
declare class LocalDate {
	readonly toJSON :Date['toJSON'];
	readonly toISOString :(this :Readonly<LocalDate>) => `${number}-${number}-${number}`;
	readonly valueOf :(this :Readonly<LocalDate>) => `${number}`;
	private [LocalDate_ISOString] :string;
	private [LocalDate_value] :string;
	constructor (literal :`${number}-${number}-${number}`);
	readonly getFullYear :(this :Readonly<LocalDate>) => _0_9999;
	readonly setFullYear :(this :LocalDate, year :_0_9999) => number;
	readonly getMonth :(this :Readonly<LocalDate>) => _0_11;
	readonly setMonth :(this :LocalDate, month :_0_11) => number;
	readonly getDate :(this :Readonly<LocalDate>) => _1_31;
	readonly setDate :(this :LocalDate, date :_1_31) => number;
}
declare class LocalTime {
	readonly toJSON :Date['toJSON'];
	readonly toISOString :(this :Readonly<LocalTime>) => `${number}:${number}:${number}${'' | `.${number}`}`;
	readonly valueOf :(this :Readonly<LocalTime>) => `${number}`;
	private [LocalTime_ISOString] :string;
	private [LocalTime_value] :string;
	constructor (literal :`${number}:${number}:${number}${'' | `.${number}`}`);
	readonly getHours :(this :Readonly<LocalTime>) => _0_23;
	readonly setHours :(this :LocalTime, hours :_0_23) => number;
	readonly getMinutes :(this :Readonly<LocalTime>) => _0_59;
	readonly setMinutes :(this :LocalTime, min :_0_59) => number;
	readonly getSeconds :(this :Readonly<LocalTime>) => _0_59;
	readonly setSeconds :(this :LocalTime, sec :_0_59) => number;
	readonly getMilliseconds :(this :Readonly<LocalTime>) => _0_999;
	readonly setMilliseconds :(this :LocalTime, ms :_0_999) => number;
}

type Source = string | ArrayBufferLike
	| {
		readonly path :string,
		readonly data? :undefined,
		readonly require :
			| {
				readonly resolve? :{ readonly paths? :undefined }
				(this :void, id :'fs') :{
					readonly readFileSync :(this :void, path :string) => ArrayBufferLike
				}
			}
			| {
				readonly resolve :{ readonly paths :(this :void, request :string) => null | string[] }
				(this :void, id :'path') :{
					readonly resolve :(this :void, dirname :string, filename :string) => string
				}
				(this :void, id :'fs') :{
					readonly readFileSync :(this :void, path :string) => ArrayBufferLike
				}
			},
	}
	| {
		readonly path :string,
		readonly data :string | ArrayBufferLike,
		readonly require? :
			| {
				readonly resolve? :{ readonly paths? :undefined }
			}
			| {
				readonly resolve :{ readonly paths :(this :void, request :string) => null | string[] }
				(this :void, id :'path') :{
					readonly resolve :(this :void, dirname :string, filename :string) => string
				}
			},
	};

type TagProcessor<CustomValue> = (this :void, each :TagOnTable<CustomValue> | TagOnArray<CustomValue> | TagOnTables<CustomValue>) => void;
type TagOnTable <CV> = { table :Table<CV>, key :string,                                    tag :string };
type TagOnArray <CV> = {                                array :ArrayOf<CV>, index :number, tag :string };
type TagOnTables<CV> = { table :Table<CV>, key :string, array :ArrayOf<CV>, index :number, tag :string };

type TypeAgnosticOptions = {
	readonly order? :boolean,// = false
	readonly exact? :boolean,// = false
	readonly multi? :boolean,// = false
	readonly longer? :boolean,// = false
	readonly string? :boolean,// = false
	readonly comment? :boolean,// = false
};

type Table<T> = object & { [key :string] :T };

type Mixed<T> = { [key :string] :Mixed<T> } | T | ArrayOfMixed<T>;
interface ArrayOfMixed<T> extends ArrayOf<Mixed<T>> {}

type BasicValue = { [key :string] :BasicValue } | boolean | bigint | number | string | Datetime | TypedArray;
type TypedArray = ArrayOf<Table<BasicValue>> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Datetime> | ArrayOfArrays | EmptyArray;
interface ArrayOfArrays extends ArrayOf<TypedArray> {}

type BasicValue_WithoutMoreDatetime = { [key :string] :BasicValue_WithoutMoreDatetime } | boolean | bigint | number | string | OffsetDateTime | TypedArray_WithoutMoreDatetime;
type TypedArray_WithoutMoreDatetime = ArrayOf<Table<BasicValue_WithoutMoreDatetime>> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArrays_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArrays_WithoutMoreDatetime extends ArrayOf<TypedArray_WithoutMoreDatetime> {}

type BasicValueWithoutBigint = { [key :string] :BasicValueWithoutBigint } | boolean | number | string | Datetime | TypedArrayWithoutBigint;
type TypedArrayWithoutBigint = ArrayOf<Table<BasicValueWithoutBigint>> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Datetime> | ArrayOfArraysWithoutBigint | EmptyArray;
interface ArrayOfArraysWithoutBigint extends ArrayOf<TypedArrayWithoutBigint> {}

type BasicValueWithoutBigint_WithoutMoreDatetime = { [key :string] :BasicValueWithoutBigint_WithoutMoreDatetime } | boolean | number | string | OffsetDateTime | TypedArrayWithoutBigint_WithoutMoreDatetime;
type TypedArrayWithoutBigint_WithoutMoreDatetime = ArrayOf<Table<BasicValueWithoutBigint_WithoutMoreDatetime>> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArraysWithoutBigint_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutMoreDatetime extends ArrayOf<TypedArrayWithoutBigint_WithoutMoreDatetime> {}

type BasicValueWithNull = { [key :string] :BasicValueWithNull } | null | boolean | bigint | number | string | Datetime | TypedArrayWithNull;
type TypedArrayWithNull = ArrayOf<Table<BasicValueWithNull>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Datetime> | ArrayOfArraysWithNull | EmptyArray;
interface ArrayOfArraysWithNull extends ArrayOf<TypedArrayWithNull> {}

type BasicValueWithNull_WithoutMoreDatetime = { [key :string] :BasicValueWithNull_WithoutMoreDatetime } | null | boolean | bigint | number | string | OffsetDateTime | TypedArrayWithNull_WithoutMoreDatetime;
type TypedArrayWithNull_WithoutMoreDatetime = ArrayOf<Table<BasicValueWithNull_WithoutMoreDatetime>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArraysWithNull_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArraysWithNull_WithoutMoreDatetime extends ArrayOf<TypedArrayWithNull_WithoutMoreDatetime> {}

type BasicValueWithoutBigintWithNull = { [key :string] :BasicValueWithoutBigintWithNull } | null | boolean | number | string | Datetime | TypedArrayWithoutBigintWithNull;
type TypedArrayWithoutBigintWithNull = ArrayOf<Table<BasicValueWithoutBigintWithNull>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Datetime> | ArrayOfArraysWithoutBigintWithNull | EmptyArray;
interface ArrayOfArraysWithoutBigintWithNull extends ArrayOf<TypedArrayWithoutBigintWithNull> {}

type BasicValueWithoutBigintWithNull_WithoutMoreDatetime = { [key :string] :BasicValueWithoutBigintWithNull_WithoutMoreDatetime } | null | boolean | number | string | OffsetDateTime | TypedArrayWithoutBigintWithNull_WithoutMoreDatetime;
type TypedArrayWithoutBigintWithNull_WithoutMoreDatetime = ArrayOf<Table<BasicValueWithoutBigintWithNull_WithoutMoreDatetime>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArraysWithoutBigintWithNull_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArraysWithoutBigintWithNull_WithoutMoreDatetime extends ArrayOf<TypedArrayWithoutBigintWithNull_WithoutMoreDatetime> {}

type BasicValue_WithoutArrayOfTables_WithoutMoreDatetime = { [key :string] :BasicValue_WithoutArrayOfTables_WithoutMoreDatetime } | boolean | bigint | number | string | OffsetDateTime | TypedArray_WithoutArrayOfTables_WithoutMoreDatetime;
type TypedArray_WithoutArrayOfTables_WithoutMoreDatetime = /*ArrayOf<Table<BasicValue_WithoutArrayOfTables_WithoutMoreDatetime>> | */ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArrays_WithoutArrayOfTables_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArrays_WithoutArrayOfTables_WithoutMoreDatetime extends ArrayOf<TypedArray_WithoutArrayOfTables_WithoutMoreDatetime> {}

type BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime = { [key :string] :BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime } | boolean | number | string | OffsetDateTime | TypedArrayWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime;
type TypedArrayWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime = /*ArrayOf<Table<BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime>> | */ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArraysWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime extends ArrayOf<TypedArrayWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime> {}

type BasicValue_WithoutInlineTable_WithoutMoreDatetime = { [key :string] :BasicValue_WithoutInlineTable_WithoutMoreDatetime } | boolean | bigint | number | string | OffsetDateTime | TypedArray_WithoutInlineTable_WithoutMoreDatetime;
type TypedArray_WithoutInlineTable_WithoutMoreDatetime = ArrayOf<Table<BasicValue_WithoutInlineTable_WithoutMoreDatetime>> | TypedArray_WithoutInlineTable_WithoutMoreDatetime_;
type TypedArray_WithoutInlineTable_WithoutMoreDatetime_ = ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArrays_WithoutInlineTable_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArrays_WithoutInlineTable_WithoutMoreDatetime extends ArrayOf<TypedArray_WithoutInlineTable_WithoutMoreDatetime_> {}

type BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime = { [key :string] :BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime } | boolean | number | string | OffsetDateTime | TypedArrayWithoutBigint_WithoutInlineTable_WithoutMoreDatetime;
type TypedArrayWithoutBigint_WithoutInlineTable_WithoutMoreDatetime = ArrayOf<Table<BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime>> | TypedArrayWithoutBigint_WithoutInlineTable_WithoutMoreDatetime_;
type TypedArrayWithoutBigint_WithoutInlineTable_WithoutMoreDatetime_ = ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<OffsetDateTime> | ArrayOfArraysWithoutBigint_WithoutInlineTable_WithoutMoreDatetime | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutInlineTable_WithoutMoreDatetime extends ArrayOf<TypedArrayWithoutBigint_WithoutInlineTable_WithoutMoreDatetime_> {}

interface ArrayOf<T> extends Array<T> {
	0 :T
}
type EmptyArray = [];

interface ReadonlyTable { readonly [key :string] :ReadonlyValue | readonly ReadonlyTable[] | ReadonlyTable }
type ReadonlyValue = null | boolean | bigint | number | string | Literal | Datetime | readonly ReadonlyValue[] | ReadonlyTable;
declare class Literal { private [LITERAL] :void }
declare const LITERAL :unique symbol;

type Datetime = OffsetDateTime | LocalDateTime | LocalDate | LocalTime;
declare const OffsetDateTime_ISOString :unique symbol;
declare const OffsetDateTime_value :unique symbol;
declare const LocalDateTime_ISOString :unique symbol;
declare const LocalDateTime_value :unique symbol;
declare const LocalDate_ISOString :unique symbol;
declare const LocalDate_value :unique symbol;
declare const LocalTime_ISOString :unique symbol;
declare const LocalTime_value :unique symbol;

type _1439_1439 = -1439 | number | 1439;
type _1_10000   = -1 | number | 10000;
type _0_9999    = 0 | number | 9999;
type _0_999     = 0 | number | 999;
type _0_6  = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type _0_11 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type _0_23 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
type _1_31 =   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
type _0_59 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
