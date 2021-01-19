export = exports;

declare namespace exports {
	
	export const version :string;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :0.1,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false,
		sourcePath? :string,
	) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutArrayOfTables : BasicValue_WithoutArrayOfTables>;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :0.3 | 0.2,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false,
		sourcePath? :string,
	) :Table<UseBigInt extends false ? BasicValueWithoutBigint_WithoutInlineTable : BasicValue_WithoutInlineTable>;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false | {// = null
			readonly tag? :null,
			readonly null? :false,
		} & TypeAgnosticOptions,
		sourcePath? :string,
	) :Table<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt :UseBigInt,
		xOptions :true | {
			readonly tag? :null,
			readonly null :true,
		} & TypeAgnosticOptions,
		sourcePath? :string,
	) :Table<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :1.0,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false | {// = null
			readonly tag? :null,
			readonly null? :false,
		} & TypeAgnosticOptions,
		sourcePath? :string,
	) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigint : BasicValue>>;
	
	export function parse<CustomValue extends never, UseBigInt extends boolean | number> (
		sourceContent :Buffer | string,
		specificationVersion :1.0,
		multiLineJoiner :string,
		useBigInt :UseBigInt,
		xOptions :true | {
			readonly tag? :null,
			readonly null :true,
		} & TypeAgnosticOptions,
		sourcePath? :string,
	) :Table<Mixed<UseBigInt extends false ? BasicValueWithoutBigintWithNull : BasicValueWithNull>>;
	
	export function parse<CustomValue> (
		sourceContent :Buffer | string,
		specificationVersion :1.0,
		multiLineJoiner :string,
		useBigInt :boolean | number,
		xOptions :TagProcessor<CustomValue> | {
			readonly tag :TagProcessor<CustomValue>,
			readonly null? :boolean,// = false
		} & TypeAgnosticOptions,
		sourcePath? :string,
	) :Table<CustomValue>;
	
	export { exports as default };
	
}

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

type BasicValue = { [key :string] :BasicValue } | boolean | bigint | number | string | Date | TypedArray;
type TypedArray = ArrayOf<Table<BasicValue>> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays | EmptyArray;
interface ArrayOfArrays extends ArrayOf<TypedArray> {}

type BasicValueWithoutBigint = { [key :string] :BasicValueWithoutBigint } | boolean | number | string | Date | TypedArrayWithoutBigint;
type TypedArrayWithoutBigint = ArrayOf<Table<BasicValueWithoutBigint>> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint | EmptyArray;
interface ArrayOfArraysWithoutBigint extends ArrayOf<TypedArrayWithoutBigint> {}

type BasicValueWithNull = { [key :string] :BasicValueWithNull } | null | boolean | bigint | number | string | Date | TypedArrayWithNull;
type TypedArrayWithNull = ArrayOf<Table<BasicValueWithNull>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithNull | EmptyArray;
interface ArrayOfArraysWithNull extends ArrayOf<TypedArrayWithNull> {}

type BasicValueWithoutBigintWithNull = { [key :string] :BasicValueWithoutBigintWithNull } | null | boolean | number | string | Date | TypedArrayWithoutBigintWithNull;
type TypedArrayWithoutBigintWithNull = ArrayOf<Table<BasicValueWithoutBigintWithNull>> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigintWithNull | EmptyArray;
interface ArrayOfArraysWithoutBigintWithNull extends ArrayOf<TypedArrayWithoutBigintWithNull> {}

type BasicValue_WithoutArrayOfTables = { [key :string] :BasicValue_WithoutArrayOfTables } | boolean | bigint | number | string | Date | TypedArray_WithoutArrayOfTables;
type TypedArray_WithoutArrayOfTables = /*ArrayOf<Table<BasicValue_WithoutArrayOfTables>> | */ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutArrayOfTables | EmptyArray;
interface ArrayOfArrays_WithoutArrayOfTables extends ArrayOf<TypedArray_WithoutArrayOfTables> {}

type BasicValueWithoutBigint_WithoutArrayOfTables = { [key :string] :BasicValueWithoutBigint_WithoutArrayOfTables } | boolean | number | string | Date | TypedArrayWithoutBigint_WithoutArrayOfTables;
type TypedArrayWithoutBigint_WithoutArrayOfTables = /*ArrayOf<Table<BasicValueWithoutBigint_WithoutArrayOfTables>> | */ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutArrayOfTables | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutArrayOfTables extends ArrayOf<TypedArrayWithoutBigint_WithoutArrayOfTables> {}

type BasicValue_WithoutInlineTable = { [key :string] :BasicValue_WithoutInlineTable } | boolean | bigint | number | string | Date | TypedArray_WithoutInlineTable;
type TypedArray_WithoutInlineTable = ArrayOf<Table<BasicValue_WithoutInlineTable>> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutInlineTable | EmptyArray;
interface ArrayOfArrays_WithoutInlineTable extends ArrayOf<TypedArray_WithoutInlineTable_> {}
type TypedArray_WithoutInlineTable_ = /*ArrayOf<Table<BasicValue_WithoutInlineTable>> | */ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutInlineTable | EmptyArray;

type BasicValueWithoutBigint_WithoutInlineTable = { [key :string] :BasicValueWithoutBigint_WithoutInlineTable } | boolean | number | string | Date | TypedArrayWithoutBigint_WithoutInlineTable;
type TypedArrayWithoutBigint_WithoutInlineTable = ArrayOf<Table<BasicValueWithoutBigint_WithoutInlineTable>> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutInlineTable | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutInlineTable extends ArrayOf<TypedArrayWithoutBigint_WithoutInlineTable_> {}
type TypedArrayWithoutBigint_WithoutInlineTable_ = /*ArrayOf<Table<BasicValueWithoutBigint_WithoutInlineTable>> | */ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutInlineTable | EmptyArray;

interface ArrayOf<T> extends Array<T> {
	length :Exclude<number, 0>
}
interface EmptyArray extends Array<undefined> {
	length :0
}
