
declare module '.Array.isArray' { export default isArray;
	function isArray (value :any) :value is any[] | readonly any[];
}
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.BigInt' { export default BigInt;
	export { default as asIntN } from '.BigInt.asIntN';
	export { default as asUintN } from '.BigInt.asUintN';
}
declare module '.BigInt.asIntN' { export default BigInt.asIntN; }
declare module '.BigInt.asUintN' { export default BigInt.asUintN; }

declare module '.Buffer.from' { export default Buffer.from; }
declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer' { export default Buffer.isBuffer; }

declare module '.Date' { export default Date;
	export { default as UTC } from '.Date.UTC';
	export { default as now } from '.Date.now';
	export { default as parse } from '.Date.parse';
}
declare module '.Date.UTC' { export default Date.UTC; }
declare module '.Date.now' { export default Date.now; }
declare module '.Date.parse' { export default Date.parse; }
declare module '.Date.prototype.getTime' { export default Date.prototype.getTime; }

declare module '.Error' { export default Error; }

declare module '.Infinity' { export default Infinity; }

declare module '.Map' { export default Map; }

declare module '.NaN' { export default NaN; }

declare module '.Number.MAX_SAFE_INTEGER' { export default Number.MAX_SAFE_INTEGER; }
declare module '.Number.MIN_SAFE_INTEGER' { export default Number.MIN_SAFE_INTEGER; }
declare module '.Number.isSafeInteger' { export default Number.isSafeInteger; }

declare module '.Object' { export default Object;
	export { default as assign } from '.Object.assign';
	export { default as create } from '.Object.create';
	export { default as defineProperties } from '.Object.defineProperties';
	export { default as defineProperty } from '.Object.defineProperty';
	export { default as entries } from '.Object.entries';
	export { default as freeze } from '.Object.freeze';
	export { default as fromEntries } from '.Object.fromEntries';
	export { default as getOwnPropertyDescriptor } from '.Object.getOwnPropertyDescriptor';
	export { default as getOwnPropertyDescriptors } from '.Object.getOwnPropertyDescriptors';
	export { default as getOwnPropertyNames } from '.Object.getOwnPropertyNames';
	export { default as getOwnPropertySymbols } from '.Object.getOwnPropertySymbols';
	export { default as getPrototypeOf } from '.Object.getPrototypeOf';
	export { default as is } from '.Object.is';
	export { default as isExtensible } from '.Object.isExtensible';
	export { default as isFrozen } from '.Object.isFrozen';
	export { default as isSealed } from '.Object.isSealed';
	export { default as keys } from '.Object.keys';
	export { default as preventExtensions } from '.Object.preventExtensions';
	export { default as seal } from '.Object.seal';
	export { default as setPrototypeOf } from '.Object.setPrototypeOf';
	export { default as values } from '.Object.values';
}
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default Object.create; }
declare module '.Object.create?=' { export default Object.create; }
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.entries' { export default entries;
	function entries<T extends object> (object :T) :[Extract<string, keyof T>, T[Extract<string, keyof T>]][];
}
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<{ readonly 0: K, readonly 1: V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default Object.getOwnPropertyDescriptor; }
declare module '.Object.getOwnPropertyDescriptors' { export default Object.getOwnPropertyDescriptors; }
declare module '.Object.getOwnPropertyNames' { export default Object.getOwnPropertyNames; }
declare module '.Object.getOwnPropertySymbols' { export default Object.getOwnPropertySymbols; }
declare module '.Object.getPrototypeOf' { export default Object.getPrototypeOf; }
declare module '.Object.is' { export default Object.is; }
declare module '.Object.isExtensible' { export default Object.isExtensible; }
declare module '.Object.isFrozen' { export default Object.isFrozen; }
declare module '.Object.isSealed' { export default Object.isSealed; }
declare module '.Object.keys' { export default keys;
	function keys<T extends object> (object :T) :Extract<string, keyof T>[];
}
declare module '.Object.preventExtensions' { export default Object.preventExtensions; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.seal' { export default Object.seal; }
declare module '.Object.setPrototypeOf' { export default Object.setPrototypeOf; }
declare module '.Object.values' { export default values;
	function values<T extends object> (object :T) :T[Extract<string, keyof T>][];
}

declare module '.Proxy' { export default Proxy;
	export { default as revocable } from '.Proxy.revocable';
}
declare module '.Proxy.revocable' { export default Proxy.revocable; }

declare module '.RangeError' { export default RangeError; }

declare module '.Reflect' { export default Reflect;
	export { default as apply } from '.Reflect.apply';
	export { default as construct } from '.Reflect.construct';
	export { default as defineProperty } from '.Reflect.defineProperty';
	export { default as deleteProperty } from '.Reflect.deleteProperty';
	export { default as get } from '.Reflect.get';
	export { default as getOwnPropertyDescriptor } from '.Reflect.getOwnPropertyDescriptor';
	export { default as getPrototypeOf } from '.Reflect.getPrototypeOf';
	export { default as has } from '.Reflect.has';
	export { default as isExtensible } from '.Reflect.isExtensible';
	export { default as ownKeys } from '.Reflect.ownKeys';
	export { default as preventExtensions } from '.Reflect.preventExtensions';
	export { default as set } from '.Reflect.set';
	export { default as setPrototypeOf } from '.Reflect.setPrototypeOf';
}
declare module '.Reflect.apply' { export default Reflect.apply; }
declare module '.Reflect.construct' { export default Reflect.construct; }
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.get' { export default Reflect.get; }
declare module '.Reflect.getOwnPropertyDescriptor' { export default Reflect.getOwnPropertyDescriptor; }
declare module '.Reflect.getPrototypeOf' { export default Reflect.getPrototypeOf; }
declare module '.Reflect.has' { export default Reflect.has; }
declare module '.Reflect.isExtensible' { export default Reflect.isExtensible; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}
declare module '.Reflect.preventExtensions' { export default Reflect.preventExtensions; }
declare module '.Reflect.set' { export default Reflect.set; }
declare module '.Reflect.setPrototypeOf' { export default Reflect.setPrototypeOf; }

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype;
	export { default as compile } from '.RegExp.prototype.compile';
	export { default as exec } from '.RegExp.prototype.exec';
	export { default as source } from '.RegExp.prototype.source';
	export { default as test } from '.RegExp.prototype.test';
	export { default as toString } from '.RegExp.prototype.toString';
}
declare module '.RegExp.prototype.compile' { export default RegExp.prototype.compile; }
declare module '.RegExp.prototype.exec' { export default RegExp.prototype.exec; }
declare module '.RegExp.prototype.source' { export default RegExp.prototype.source; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }
declare module '.RegExp.prototype.toString' { export default RegExp.prototype.toString; }

declare module '.Set' { export default Set; }

declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap' { export default WeakMap; }

declare module '.WeakSet' { export default WeakSet; }

declare module '.default' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> } & Main>;
	type Callable = (...args :any[]) => any;
	type Newable = { new (...args :any[]) :any };
}

declare module '.isFinite' { export default isFinite; }

declare module '.parseInt' { export default parseInt; }

declare module '.undefined' { export default undefined; }
