
declare module '.Array' { export default Array; }
declare module '.Array.isArray' { export default isArray;
	function isArray (this :void, value :unknown) :value is readonly any[];
}
declare module '.Array.isArray?=' { export default isArray;
	function isArray (this :void, value :unknown) :value is readonly any[];
}
declare module '.Array.prototype' { export default Array.prototype; }

declare module '.ArrayBuffer.isView' { export default isView;
	function isView (this :void, arg :unknown) :arg is Readonly<ArrayBufferView & { length? :number }>;
}

declare module '.BigInt' { export default BigInt; }
declare module '.BigInt.prototype.valueOf' { export default BigInt.prototype.valueOf; }

declare module '.Date' { export default Date; }
declare module '.Date.parse' { export default Date.parse; }
declare module '.Date.prototype' { export default Date.prototype; }

declare module '.Error' { export default Error_;
	interface Error_ extends Error { readonly cause? :Error }
	const Error_ :{
		   <                 C extends Error> (this :void, message  :string, _cause_ :{ readonly cause :C }) :Error & { readonly cause :C };
		                                      (this :void, message? :string                                ) :Error;
		new<                 C extends Error> (            message  :string, _cause_ :{ readonly cause :C }) :Error & { readonly cause :C };
		new                                   (            message? :string                                ) :Error;
		readonly captureStackTrace?/* ! if v8 */ :(targetObject :object, constructorOpt? :Function) => void;
		prepareStackTrace?/* ? even if v8 */ :(error :Error, stackTraces :readonly NodeJS.CallSite[]) => unknown;
		stackTraceLimit?/* ! if v8 */ :number;
	};
}

declare module '.Float64Array' { export default Float64Array; }

declare module '.Function.prototype.apply' { export default Function.prototype.apply; }
declare module '.Function.prototype.bind?' { export default Function.prototype.bind; }

declare module '.Infinity' { export default Infinity; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.NaN' { export default NaN; }

declare module '.Number.MAX_SAFE_INTEGER' { export default Number.MAX_SAFE_INTEGER; }
declare module '.Number.isSafeInteger' { export default Number.isSafeInteger; }
declare module '.Number.prototype.valueOf' { export default Number.prototype.valueOf; }

declare module '.Object' { export default O;
	type O = Object;
	const O :{ readonly [Method in keyof typeof Object] :typeof Object[Method] } & {
		<T> (value :T) :Objectify<T>;
		() :object;
		new<T> (value :T) :Objectify<T>;
		new () :object;
	};
	type Objectify<T> =
		T extends object ? T :
		T extends undefined | null ? object :
		T extends boolean ? object & Boolean :
		T extends number ? object & Number :
		T extends string ? object & String :
		T extends symbol ? object & Symbol :
		T extends bigint ? object & BigInt :
		never;
}
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.assign?' { export default Object.assign; }
declare module '.Object.create' { export default create;
	function create<P extends object | null, D extends TypedPropertyDescriptorMap<object> | void> (this :void, proto :P, descriptorMap? :D) :object & ( D extends TypedPropertyDescriptorMap<infer O> ? O : object ) & ( P extends object ? { [K in keyof P] :P[K] } : object );
	type TypedPropertyDescriptorMap<O> = { [K in keyof O] :TypedPropertyDescriptor<O[K]> };
}
declare module '.Object.create?=' { export default create;
	function create<P extends object | null> (this :void, proto :P) :P extends object ? object & { [K in keyof P] :P[K] } : object;
}
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.defineProperty?' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.freeze?' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V> (this :void, entries :Iterable<{ readonly 0 :K, readonly 1 :V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default getOwnPropertyDescriptor;
	function getOwnPropertyDescriptor<O extends {}, P extends string | symbol> (this :void, o :O, p :P) :P extends keyof O ? { value :O[P], writable :boolean, enumerable :boolean, configurable :boolean } | { get :undefined | ( () => O[P] ), set :undefined | ( (v :O[P]) => void ), enumerable :boolean, configurable :boolean } : undefined;
}
declare module '.Object.getOwnPropertyDescriptors' { export default Object.getOwnPropertyDescriptors; }
declare module '.Object.getOwnPropertyNames' { export default getOwnPropertyNames;
	function getOwnPropertyNames<T extends {}> (this :void, nonNullable :T) :NonNullable<{ [Key in keyof T]-? :Key extends symbol ? undefined : Key extends number ? `${Key}` : Key }[keyof T]>[];
}
declare module '.Object.getOwnPropertySymbols?' { export default getOwnPropertySymbols;
	function getOwnPropertySymbols<T extends {}> (this :void, nonNullable :T) :Extract<keyof T, symbol>[];
}
declare module '.Object.hasOwn?=' { export default hasOwn;
	function hasOwn<Key extends string | symbol> (this :void, nonNullable :{}, key :Key) :nonNullable is { readonly [K in Key] :unknown };
}
declare module '.Object.is' { export default Object.is; }
declare module '.Object.keys' { export default keys;
	function keys<T extends {}> (this :void, nonNullable :T) :NonNullable<{ [Key in keyof T]-? :Key extends symbol ? undefined : Key extends number ? `${Key}` : Key }[keyof T]>[];
}
declare module '.Object.preventExtensions' { export default Object.preventExtensions; }
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.isPrototypeOf' { export default Object.prototype.isPrototypeOf; }
declare module '.Object.prototype.propertyIsEnumerable' { export default Object.prototype.propertyIsEnumerable; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }

declare module '.Proxy' { export default Proxy; }
declare module '.Proxy?' { export default Proxy; }

declare module '.RangeError' { export default RangeError_;
	interface RangeError_ extends RangeError { readonly cause? :Error }
	const RangeError_ :{
		   <                 C extends Error> (this :void, message  :string, _cause_ :{ readonly cause :C }) :RangeError & { readonly cause :C };
		                                      (this :void, message? :string                                ) :RangeError;
		new<                 C extends Error> (            message  :string, _cause_ :{ readonly cause :C }) :RangeError & { readonly cause :C };
		new                                   (            message? :string                                ) :RangeError;
	};
}

declare module '.Reflect.apply' { export default apply;
	function apply<This, Args extends readonly any[], Target extends (this :This, ...args :Args) => any> (this :void, target :Target, thisArg :This, args :{ readonly [Key in Extract<keyof Args, number | 'length'>] :Args[Key] }) :Target extends (this :This, ...args :Args) => infer R ? R : never;
}
declare module '.Reflect.apply?' { export default apply;
	function apply<This, Args extends readonly any[], Target extends (this :This, ...args :Args) => any> (this :void, target :Target, thisArg :This, args :{ readonly [Key in Extract<keyof Args, number | 'length'>] :Args[Key] }) :Target extends (this :This, ...args :Args) => infer R ? R : never;
}
declare module '.Reflect.construct' { export default construct;
	function construct<Args extends readonly any[],    Target extends            new (...args :Args) => object                                   > (this :void, target :Target                       , args :Args                                      ) :Target extends new (...args :Args) => infer R ? R : never;
	function construct<Args extends readonly any[], NewTarget extends ( abstract new (...args :any ) => object ) & { readonly prototype :object }> (this :void, target :new (...args :Args) => object, args :Args, newTarget :new (...args :any) => any) :NewTarget['prototype']                                   ;
}
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (this :void, object :T) :{ [Key in keyof T]-? :Key extends number ? `${Key}` : Key }[keyof T][];
}

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype.exec' { export default RegExp.prototype.exec; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }
declare module '.String.fromCodePoint' { export default String.fromCodePoint; }
declare module '.String.prototype.valueOf' { export default String.prototype.valueOf; }

declare module '.Symbol' { export default Symbol; }
declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError_;
	interface SyntaxError_ extends SyntaxError { readonly cause? :Error }
	const SyntaxError_ :{
		   <                 C extends Error> (this :void, message  :string, _cause_ :{ readonly cause :C }) :SyntaxError & { readonly cause :C };
		                                      (this :void, message? :string                                ) :SyntaxError;
		new<                 C extends Error> (            message  :string, _cause_ :{ readonly cause :C }) :SyntaxError & { readonly cause :C };
		new                                   (            message? :string                                ) :SyntaxError;
	};
}

declare module '.TextDecoder' { export default TextDecoder; }

declare module '.TypeError' { export default TypeError_;
	interface TypeError_ extends TypeError { readonly cause? :Error }
	const TypeError_ :{
		   <                 C extends Error> (this :void, message  :string, _cause_ :{ readonly cause :C }) :TypeError & { readonly cause :C };
		                                      (this :void, message? :string                                ) :TypeError;
		new<                 C extends Error> (            message  :string, _cause_ :{ readonly cause :C }) :TypeError & { readonly cause :C };
		new                                   (            message? :string                                ) :TypeError;
	};
}

declare module '.Uint8Array' { export default Uint8Array; }

declare module '.WeakMap' { export default constructor;
	class constructor<K extends object, V> extends WeakMap<K, V> { constructor (entries? :Iterable<{ readonly 0 :K, readonly 1 :V }>) }
}
declare module '.WeakMap.prototype.delete' { export default WeakMap.prototype.delete; }
declare module '.WeakMap.prototype.get' { export default WeakMap.prototype.get; }
declare module '.WeakMap.prototype.has' { export default WeakMap.prototype.has; }
declare module '.WeakMap.prototype.set' { export default WeakMap.prototype.set; }

declare module '.WeakSet' { export default constructor;
	class constructor<V extends object> extends WeakSet<V> { constructor (values? :Iterable<V>) }
}
declare module '.WeakSet.prototype.add' { export default WeakSet.prototype.add; }
declare module '.WeakSet.prototype.delete' { export default WeakSet.prototype.delete; }
declare module '.WeakSet.prototype.has' { export default WeakSet.prototype.has; }

declare module '.class.isArrayBuffer' { export default isArrayBuffer;
	function isArrayBuffer (this :void, value :unknown) :value is ArrayBuffer & { readonly length? :undefined };
}
declare module '.class.isBigInt' { export default isBigInt;
	function isBigInt (this :void, value :unknown) :value is BigInt;
}
declare module '.class.isBoolean' { export default isBoolean;
	function isBoolean (this :void, value :unknown) :value is Boolean;
}
declare module '.class.isNumber' { export default isNumber;
	function isNumber (this :void, value :unknown) :value is Number;
}
declare module '.class.isString' { export default isString;
	function isString (this :void, value :unknown) :value is String;
}

declare module '.default' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (this :void, exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (this :void, main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = new (...args :any) => any;
}
declare module '.default?=' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (this :void, exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (this :void, main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = new (...args :any) => any;
}

declare module '.isFinite' { export default isFinite; }

declare module '.native' { }

declare module '.null' { export default Null;
	function Null (this :void, origin :null) :object;
	function Null<_ extends never, Object extends object> (this :void, origin :Object) :Object;
	function Null<Value, _ extends never = never> (this :void, origin :null | object & { readonly [name :string] :Value }) :Null<Value>;
	abstract class Null<ValueType = unknown> {
		protected constructor (arg? :undefined);
		static readonly prototype :null;
		[name :string] :undefined | ValueType
		toString? :ValueType
		toLocaleString? :ValueType
		valueOf? :ValueType
		hasOwnProperty? :ValueType
		isPrototypeOf? :ValueType
		propertyIsEnumerable? :ValueType
		__defineGetter__? :ValueType
		__defineSetter__? :ValueType
		__lookupGetter__? :ValueType
		__lookupSetter__? :ValueType
		__proto__? :ValueType
		['constructor']? :ValueType
	}
}
declare module '.null.defineProperties' { export default defineProperties;
	function defineProperties<O extends object, OO extends PropertyDescriptorMap> (this :void, object :O, descriptorMap :OO) :( OO extends TypedPropertyDescriptorMap<infer O> ? O : never ) & O;
	type TypedPropertyDescriptorMap<O> = { [k in keyof O] :TypedPropertyDescriptor<O[k]> };
}
declare module '.null.prototype' { export default NULL;
	const NULL :object | null;
}

declare module '.parseInt' { export default parseInt; }

declare module '.undefined' { export default undefined; }
