export as namespace TOML;
export = exports;

declare namespace exports {
	
	export const version :'0.5.106';
	
	export function parse<CustomValue extends never, SpecificationVersion extends 0.3 | 0.2 | 0.1, UseBigInt extends boolean | number> (
		sourceContent :string | Buffer,
		specificationVersion :SpecificationVersion,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false,// = null
	) :Table<SpecificationVersion extends 0.1
		? UseBigInt extends false
			? BasicValueWithoutBigint_WithoutArrayOfTables
			: BasicValue_WithoutArrayOfTables
		: UseBigInt extends false
			? BasicValueWithoutBigint_WithoutInlineTable
			: BasicValue_WithoutInlineTable>;
	
	export function parse<CustomValue extends never, Mix extends boolean, UseBigInt extends boolean | number, Null extends boolean> (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :UseBigInt,// = true
		xOptions? :null | false | {// = null
			readonly tag? :null,// = null
			readonly mix? :Mix,// = false
			readonly null? :Null,// = false
			readonly order? :boolean,// = false
			readonly exact? :boolean,// = false
			readonly multi? :boolean,// = false
			readonly close? :boolean,// = false
			readonly longer? :boolean,// = false
		},
	) :Mix extends true
		? Table<Mixed<UseBigInt extends false
			? Null extends true
				? BasicValueWithoutBigintWithNull
				: BasicValueWithoutBigint
			: Null extends true
				? BasicValueWithNull
				: BasicValue>>
		: Table<UseBigInt extends false
			? Null extends true
				? BasicValueWithoutBigintWithNull
				: BasicValueWithoutBigint
			: Null extends true
				? BasicValueWithNull
				: BasicValue>;
	
	export function parse<UseBigInt extends boolean | number> (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt :UseBigInt,
		xOptions :true,
	) :Table<Mixed<UseBigInt extends false
		? BasicValueWithoutBigintWithNull
		: BasicValueWithNull>>;
	
	export function parse<CustomValue> (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt :boolean | number,
		xOptions :TagProcessor<CustomValue> | {
			readonly tag :TagProcessor<CustomValue>,
			readonly mix :true,
			readonly null? :boolean,// = false
			readonly order? :boolean,// = false
			readonly exact? :boolean,// = false
			readonly multi? :boolean,// = false
			readonly close? :boolean,// = false
			readonly longer? :boolean,// = false
		},
	) :Table<CustomValue>;
	
	export { exports as default };
	
}

type Table<T> = { [Key :string] :T };

type Mixed<T> = { [Key :string] :Mixed<T> } | T | ArrayOfMixed<T>;
interface ArrayOfMixed<T> extends ArrayOf<Mixed<T>> {}

type BasicValue = { [Key :string] :BasicValue } | boolean | bigint | number | string | Date | TypedArray;
type TypedArray = ArrayOf<{ [Key :string] :BasicValue }> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays | EmptyArray;
interface ArrayOfArrays extends ArrayOf<TypedArray> {}

type BasicValueWithoutBigint = { [Key :string] :BasicValueWithoutBigint } | boolean | number | string | Date | TypedArrayWithoutBigint;
type TypedArrayWithoutBigint = ArrayOf<{ [Key :string] :BasicValueWithoutBigint }> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint | EmptyArray;
interface ArrayOfArraysWithoutBigint extends ArrayOf<TypedArrayWithoutBigint> {}

type BasicValueWithNull = { [Key :string] :BasicValueWithNull } | null | boolean | bigint | number | string | Date | TypedArrayWithNull;
type TypedArrayWithNull = ArrayOf<{ [Key :string] :BasicValueWithNull }> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithNull | EmptyArray;
interface ArrayOfArraysWithNull extends ArrayOf<TypedArrayWithNull> {}

type BasicValueWithoutBigintWithNull = { [Key :string] :BasicValueWithoutBigintWithNull } | null | boolean | number | string | Date | TypedArrayWithoutBigintWithNull;
type TypedArrayWithoutBigintWithNull = ArrayOf<{ [Key :string] :BasicValueWithoutBigintWithNull }> | ArrayOf<null> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigintWithNull | EmptyArray;
interface ArrayOfArraysWithoutBigintWithNull extends ArrayOf<TypedArrayWithoutBigintWithNull> {}

type BasicValue_WithoutArrayOfTables = { [Key :string] :BasicValue_WithoutArrayOfTables } | boolean | bigint | number | string | Date | TypedArray_WithoutArrayOfTables;
type TypedArray_WithoutArrayOfTables = /*ArrayOf<{ [Key :string] :BasicValue_WithoutArrayOfTables }> | */ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutArrayOfTables | EmptyArray;
interface ArrayOfArrays_WithoutArrayOfTables extends ArrayOf<TypedArray_WithoutArrayOfTables> {}

type BasicValueWithoutBigint_WithoutArrayOfTables = { [Key :string] :BasicValueWithoutBigint_WithoutArrayOfTables } | boolean | number | string | Date | TypedArrayWithoutBigint_WithoutArrayOfTables;
type TypedArrayWithoutBigint_WithoutArrayOfTables = /*ArrayOf<{ [Key :string] :BasicValueWithoutBigint_WithoutArrayOfTables }> | */ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutArrayOfTables | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutArrayOfTables extends ArrayOf<TypedArrayWithoutBigint_WithoutArrayOfTables> {}

type BasicValue_WithoutInlineTable = { [Key :string] :BasicValue_WithoutInlineTable } | boolean | bigint | number | string | Date | TypedArray_WithoutInlineTable;
type TypedArray_WithoutInlineTable = ArrayOf<{ [Key :string] :BasicValue_WithoutInlineTable }> | ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutInlineTable | EmptyArray;
interface ArrayOfArrays_WithoutInlineTable extends ArrayOf<TypedArray_WithoutInlineTable_> {}
type TypedArray_WithoutInlineTable_ = /*ArrayOf<{ [Key :string] :BasicValue_WithoutInlineTable }> | */ArrayOf<boolean> | ArrayOf<bigint> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArrays_WithoutInlineTable | EmptyArray;

type BasicValueWithoutBigint_WithoutInlineTable = { [Key :string] :BasicValueWithoutBigint_WithoutInlineTable } | boolean | number | string | Date | TypedArrayWithoutBigint_WithoutInlineTable;
type TypedArrayWithoutBigint_WithoutInlineTable = ArrayOf<{ [Key :string] :BasicValueWithoutBigint_WithoutInlineTable }> | ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutInlineTable | EmptyArray;
interface ArrayOfArraysWithoutBigint_WithoutInlineTable extends ArrayOf<TypedArrayWithoutBigint_WithoutInlineTable_> {}
type TypedArrayWithoutBigint_WithoutInlineTable_ = /*ArrayOf<{ [Key :string] :BasicValueWithoutBigint_WithoutInlineTable }> | */ArrayOf<boolean> | ArrayOf<number> | ArrayOf<string> | ArrayOf<Date> | ArrayOfArraysWithoutBigint_WithoutInlineTable | EmptyArray;

interface ArrayOf<T> extends Array<T> {
	length :Exclude<number, 0>
}
interface EmptyArray extends Array<undefined> {
	length :0
}

type TagProcessor<CustomValue> = (this :void, each :TagOnTable<CustomValue> | TagOnArray<CustomValue> | TagOnTables<CustomValue>) => void;
type TagOnTable <CV> = { table :Table<CV>, key :string,    array :undefined,   index :undefined, tag :string };
type TagOnArray <CV> = { table :undefined, key :undefined, array :ArrayOf<CV>, index :number,    tag :string };
type TagOnTables<CV> = { table :Table<CV>, key :string,    array :ArrayOf<CV>, index :number,    tag :string };
