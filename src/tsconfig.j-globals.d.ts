
declare module '.Array' { export default Array; }
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.prototype' { export default Array.prototype; }

declare module '.BigInt' { export default BigInt; }

declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer?=()=>false' { export default Buffer.isBuffer; }

declare module '.Date' { export default Date; }
declare module '.Date.parse' { export default Date.parse; }

declare module '.Error' { export default Error; }

declare module '.Function.prototype.apply' { export default Function.prototype.apply; }

declare module '.Infinity' { export default Infinity; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.NaN' { export default NaN; }

declare module '.Number.MAX_SAFE_INTEGER' { export default Number.MAX_SAFE_INTEGER; }
declare module '.Number.MIN_SAFE_INTEGER' { export default Number.MIN_SAFE_INTEGER; }
declare module '.Number.isSafeInteger' { export default Number.isSafeInteger; }

declare module '.Object' { export default O;
	type O = Object;
	const O :{ [Method in keyof typeof Object] :typeof Object[Method] } & {
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
	function create<P extends object | null, D extends TypedPropertyDescriptorMap<object> | void> (proto :P,    descriptorMap? :D) :object & ( D extends TypedPropertyDescriptorMap<infer O> ? O : object ) & ( P extends object ? { [K in keyof P] :P[K] } : object );
	type TypedPropertyDescriptorMap<O> = { [K in keyof O] :TypedPropertyDescriptor<O[K]> };
}
declare module '.Object.create?=' { export default create;
	function create<P extends object | null> (proto :P) :P extends object ? object & { [K in keyof P] :P[K] } : object;
}
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.defineProperty?' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.freeze?' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V> (entries :Iterable<{ readonly 0 :K, readonly 1 :V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default getOwnPropertyDescriptor;
	function getOwnPropertyDescriptor<O extends {}, P extends string | symbol> (o :O, p :P) :P extends keyof O ? { value :O[P], writable :boolean, enumerable :boolean, configurable :boolean } | { get? () :O[P], set? (v :O[P]) :void, enumerable :boolean, configurable :boolean } : undefined;
}
declare module '.Object.getOwnPropertySymbols?' { export default getOwnPropertySymbols;
	function getOwnPropertySymbols<T extends {}> (nonNullable :T) :Extract<keyof T, symbol>[];
}
declare module '.Object.getPrototypeOf' { export default getPrototypeOf;
	function getPrototypeOf<T extends {}> (nonNullable :T) :T & { [K in keyof T]? :T[K] };
}
declare module '.Object.is' { export default Object.is; }
declare module '.Object.keys' { export default keys;
	function keys<T extends {}> (nonNullable :T) :Extract<keyof T, string>[];
}
declare module '.Object.preventExtensions' { export default Object.preventExtensions; }
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.propertyIsEnumerable' { export default Object.prototype.propertyIsEnumerable; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.setPrototypeOf' { export default Object.setPrototypeOf; }

declare module '.Proxy' { export default Proxy; }
declare module '.Proxy?' { export default Proxy; }

declare module '.RangeError' { export default RangeError; }

declare module '.Reflect.apply' { export default apply;
	function apply<This, Args extends readonly any[], Target extends (this :This, ...args :Args) => any> (target :Target, thisArg :This, args :Args) :Target extends (this :This, ...args :Args) => infer R ? R : never;
}
declare module '.Reflect.apply?' { export default apply;
	function apply<This, Args extends readonly any[], Target extends (this :This, ...args :Args) => any> (target :Target, thisArg :This, args :Args) :Target extends (this :This, ...args :Args) => infer R ? R : never;
}
declare module '.Reflect.construct' { export default construct;
	function construct<Args extends readonly any[], Target extends new (...args :Args) => any> (target :Target, args :Args, newTarget? :new (...args :any) => any) :Target extends new (...args :Args) => infer R ? R : never;
}
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<keyof T, string | symbol>[];
}

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype; }
declare module '.RegExp.prototype.exec' { export default RegExp.prototype.exec; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }
declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap' { export default constructor;
	class constructor<K extends object, V> extends WeakMap<K, V> { constructor (entries? :Iterable<{ readonly 0 :K, readonly 1 :V }>) }
}

declare module '.WeakSet' { export default constructor;
	class constructor<V extends object> extends WeakSet<V> { constructor (values? :Iterable<V>) }
}

declare module '.class.isPrimitive' { export default isPrimitive;
	function isPrimitive<T> (value :T) :T extends object ? false : true;
}

declare module '.default' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}
declare module '.default?=' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}

declare module '.isFinite' { export default isFinite; }

declare module '.native' { export default _; const _ :never; }

declare module '.null' { export default Null;
	function Null (origin :null) :object;
	function Null<_ extends never, Object extends object> (origin :Object) :Object;
	function Null<Value> (origin :null | object & { readonly [name :string] :Value }) :Null<Value>;
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
declare module '.null.getOwnPropertyDescriptor' { export default getOwnPropertyDescriptor;
	function getOwnPropertyDescriptor<O extends {}, K extends Extract<keyof O, string | symbol>> (object :O, key :K) :TypedPropertyDescriptor<O[K]>;
}
declare module '.null.getOwnPropertyDescriptors' { export default getOwnPropertyDescriptors;
	function getOwnPropertyDescriptors<O extends {}> (object :O) :{ [k in keyof O] :TypedPropertyDescriptor<O[k]> };
}
declare module '.null.prototype' { export default NULL;
	const NULL :object | null;
}

declare module '.parseInt' { export default parseInt; }

declare module '.undefined' { export default undefined; }

declare module '.void.splice' { export default Array;
	const Array :ArrayConstructor;
	type ArrayConstructor = {
		new<T = any> () :Array<T>
		readonly isArray :(arg :any) => arg is readonly any[]
		readonly from :{
			<T            > (this :ArrayConstructor, iterable: Iterable<T> | ArrayLike<T>                                                                ) :Array<T>
			<T, U         > (this :ArrayConstructor, iterable: Iterable<T> | ArrayLike<T>, mapfn: (this :void   , v: T, k: number) => U                  ) :Array<U>
			<T, U, ThisArg> (this :ArrayConstructor, iterable: Iterable<T> | ArrayLike<T>, mapfn: (this :ThisArg, v: T, k: number) => U, thisArg: ThisArg) :Array<U>
		}
		readonly of :<T> (this :ArrayConstructor, ...items :T[]) => Array<T>
	};
	type Array<T> = {
		readonly [Key in 'copyWithin' | 'fill' | 'lastIndexOf' | 'pop' | 'push' | 'reverse' | 'shift' | 'unshift' | 'sort' | 'includes' | 'indexOf' | 'join' | 'keys' | 'entries' | 'values' | 'toLocaleString' | 'toString'] :T[][Key]// Exclude<keyof T[], 'slice' | 'concat' | 'map' | 'filter' | 'flat' | 'flatMap' | number | 'length' | 'splice' | 'forEach' | 'every' | 'some' | 'reduce' | 'reduceRight' | 'find' | 'findIndex'>
	} & {
		readonly constructor :ArrayConstructor
		[index :number] :T
		length :number
		readonly splice :{
			(this :Array<T>, start :number, deleteCount? :number               ) :unknown
			(this :Array<T>, start :number, deleteCount  :number, ...items :T[]) :unknown
		}
		readonly forEach :{
			          (this :Array<T>, callbackfn :(this :void   , value :T, index :number, array :Array<T>) => void                  ) :void
			<ThisArg> (this :Array<T>, callbackfn :(this :ThisArg, value :T, index :number, array :Array<T>) => void, thisArg :ThisArg) :void
		}
		readonly every :{
			          (this :Array<T>, callbackfn :(this :void   , value :T, index :number, array :Array<T>) => boolean                  ) :boolean
			<ThisArg> (this :Array<T>, callbackfn :(this :ThisArg, value :T, index :number, array :Array<T>) => boolean, thisArg :ThisArg) :boolean
		}
		readonly some :{
			          (this :Array<T>, callbackfn :(this :void   , value :T, index :number, array :Array<T>) => boolean                  ) :boolean
			<ThisArg> (this :Array<T>, callbackfn :(this :ThisArg, value :T, index :number, array :Array<T>) => boolean, thisArg :ThisArg) :boolean
		}
		readonly reduce :{
			          (callbackfn :(previousValue :T      , currentValue :T, currentIndex :number, array :Array<T>) => T                             ) :T
			          (callbackfn :(previousValue :T      , currentValue :T, currentIndex :number, array :Array<T>) => T      , initialValue :T      ) :T
			<ThisArg> (callbackfn :(previousValue :ThisArg, currentValue :T, currentIndex :number, array :Array<T>) => ThisArg, initialValue :ThisArg) :ThisArg
		}
		readonly reduceRight :{
			          (callbackfn :(previousValue :T      , currentValue :T, currentIndex :number, array :Array<T>) => T                             ) :T
			          (callbackfn :(previousValue :T      , currentValue :T, currentIndex :number, array :Array<T>) => T      , initialValue :T      ) :T
			<ThisArg> (callbackfn :(previousValue :ThisArg, currentValue :T, currentIndex :number, array :Array<T>) => ThisArg, initialValue :ThisArg) :ThisArg
		}
		readonly find :{
			<S extends T         > (predicate :(this :void   , value :T, index :number, array :Array<T>) => value is S                  ) :S | undefined
			<S extends T, ThisArg> (predicate :(this :ThisArg, value :T, index :number, array :Array<T>) => value is S, thisArg :ThisArg) :S | undefined
		}
		readonly findIndex :{
			          (predicate :(this :void   , value :T, index :number, array :Array<T>) => boolean                  ) :number
			<ThisArg> (predicate :(this :ThisArg, value :T, index :number, array :Array<T>) => boolean, thisArg :ThisArg) :number
		}
		readonly [Symbol.iterator] :{
			() :IterableIterator<T>
		}
	};
}
