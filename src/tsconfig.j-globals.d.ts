
declare module '.Array.isArray' { export default Array.isArray; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.BigInt' { export default BigInt; }

declare module '.Buffer.from' { export default Buffer.from; }
declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer' { export default Buffer.isBuffer; }

declare module '.Date' { export default Date; }
declare module '.Date.prototype.getTime' { export default Date.prototype.getTime; }

declare module '.Error' { export default Error; }

declare module '.Infinity' { export default Infinity; }

declare module '.Map' { export default Map; }

declare module '.NaN' { export default NaN; }

declare module '.Number.MAX_SAFE_INTEGER' { export default Number.MAX_SAFE_INTEGER; }
declare module '.Number.MIN_SAFE_INTEGER' { export default Number.MIN_SAFE_INTEGER; }
declare module '.Number.isSafeInteger' { export default Number.isSafeInteger; }

declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default Object.create; }
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<{ readonly 0: K, readonly 1: V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default Object.getOwnPropertyDescriptor; }
declare module '.Object.getOwnPropertyDescriptors' { export default Object.getOwnPropertyDescriptors; }
declare module '.Object.is' { export default Object.is; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.setPrototypeOf' { export default Object.setPrototypeOf; }

declare module '.Proxy' { export default Proxy; }

declare module '.RangeError' { export default RangeError; }

declare module '.Reflect.apply' { export default Reflect.apply; }
declare module '.Reflect.construct' { export default Reflect.construct; }
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.getPrototypeOf' { export default Reflect.getPrototypeOf; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype; }

declare module '.Set' { export default Set; }

declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap' { export default WeakMap; }

declare module '.WeakSet' { export default WeakSet; }

declare module '.isFinite' { export default isFinite; }

declare module '.parseInt' { export default parseInt; }

declare module '.undefined' { export default undefined; }
