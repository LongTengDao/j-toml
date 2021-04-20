export = exports;

declare namespace exports {
	
	export const version :'1.12.2';
	
	export const parse :{
		
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.1,
			multiLineJoiner :string,
			useBigInt? :UseBigInt,// = true
			xOptions? :null | false,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutArrayOfTables_WithoutMoreDatetime : BasicValue_WithoutArrayOfTables_WithoutMoreDatetime>;
		
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.2 | 0.3,
			multiLineJoiner :string,
			useBigInt? :UseBigInt,// = true
			xOptions? :null | false,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable_WithoutMoreDatetime : BasicValue_WithoutInlineTable_WithoutMoreDatetime>;
		
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.4,
			multiLineJoiner :string,
			useBigInt? :UseBigInt,// = true
			xOptions? :null | false | {// = null
				readonly tag? :null,
				readonly null? :false,
			} & TypeAgnosticOptions,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutMoreDatetime : BasicValue_WithoutMoreDatetime>;
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.4,
			multiLineJoiner :string,
			useBigInt :UseBigInt,
			xOptions :true | {
				readonly tag? :null,
				readonly null :true,
			} & TypeAgnosticOptions,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull_WithoutMoreDatetime : BasicValueWithNull_WithoutMoreDatetime>;
		
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.5,
			multiLineJoiner :string,
			useBigInt? :UseBigInt,// = true
			xOptions? :null | false | {// = null
				readonly tag? :null,
				readonly null? :false,
			} & TypeAgnosticOptions,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>;
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :0.5,
			multiLineJoiner :string,
			useBigInt :UseBigInt,
			xOptions :true | {
				readonly tag? :null,
				readonly null :true,
			} & TypeAgnosticOptions,
		) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>;
		
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :1.0,
			multiLineJoiner :string,
			useBigInt? :UseBigInt,// = true
			xOptions? :null | false | {// = null
				readonly tag? :null,
				readonly null? :false,
			} & TypeAgnosticOptions,
		) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
		<CustomValue extends never, UseBigInt extends boolean | number> (
			source :Buffer | string | Source,
			specificationVersion :1.0,
			multiLineJoiner :string,
			useBigInt :UseBigInt,
			xOptions :true | {
				readonly tag? :null,
				readonly null :true,
			} & TypeAgnosticOptions,
		) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
		<CustomValue> (
			source :Buffer | string | Source,
			specificationVersion :1.0,
			multiLineJoiner :string,
			useBigInt :boolean | number,
			xOptions :TagProcessor<CustomValue> | {
				readonly tag :TagProcessor<CustomValue>,
				readonly null? :boolean,// = false
			} & TypeAgnosticOptions,
		) :Table<CustomValue>;
		
	};
	
	export { exports as default };
	
	export type { OffsetDateTime, LocalDateTime, LocalDate, LocalTime };
	
}

type Source = { readonly path :string, readonly data? :Buffer | string };

type TagProcessor<CustomValue> = (this :void, each :TagOnTable<CustomValue> | TagOnArray<CustomValue> | TagOnTables<CustomValue>) => void;
type TagOnTable <CV> = { table :Table<CV>, key :string,                                    tag :string };
type TagOnArray <CV> = {                                array :ArrayOf<CV>, index :number, tag :string };
type TagOnTables<CV> = { table :Table<CV>, key :string, array :ArrayOf<CV>, index :number, tag :string };

type TypeAgnosticOptions = {
	readonly order? :boolean,// = false
	readonly exact? :boolean,// = false
	readonly multi? :boolean,// = false
	readonly longer? :boolean,// = false
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
interface EmptyArray extends Array<undefined> {
	length :0
}

type Datetime = OffsetDateTime | LocalDateTime | LocalDate | LocalTime;
type OffsetDateTime = LocalDateTime & Readonly<{
	getUTCFullYear () :_1_10000
	getUTCMonth () :_0_11
	getUTCDate () :_1_31
	getUTCHours () :_0_23
	getUTCMinutes () :_0_59
	getUTCSeconds () :_0_59
	getUTCMilliseconds () :_0_999
	getUTCDay () :_0_6
	getDay () :_0_6
	getTimezoneOffset () :_1439_1439
	setTimezoneOffset (_ :_1439_1439) :number
	getTime () :number
	setTime (time :number) :number
}>;
type LocalDateTime = LocalDate & LocalTime;
type LocalDate = DateTime & Readonly<{
	getFullYear () :_0_9999
	setFullYear (year :_0_9999) :number
	getMonth () :_0_11
	setMonth (month :_0_11) :number
	getDate () :_1_31
	setDate (date :_1_31) :number
}>;
type LocalTime = DateTime & Readonly<{
	getHours () :_0_23
	setHours (hours :_0_23) :number
	getMinutes () :_0_59
	setMinutes (min :_0_59) :number
	getSeconds () :_0_59
	setSeconds (sec :_0_59) :number
	getMilliseconds () :_0_999
	setMilliseconds (ms :_0_999) :number
}>;
type DateTime = Readonly<{
	valueOf () :string
	toISOString () :string
	constructor :DateConstructor
	toJSON :Date['toJSON']
}>;

type _1439_1439 = -1439 | number | 1439;
type _1_10000   = -1 | number | 10000;
type _0_9999    = 0 | number | 9999;
type _0_999     = 0 | number | 999;
type _0_6  = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type _0_11 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type _0_23 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
type _1_31 =   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
type _0_59 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
