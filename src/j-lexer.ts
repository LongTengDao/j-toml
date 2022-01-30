import Symbol from '.Symbol';

const previous :unique symbol = Symbol('previous') as any;

type Stack = {
	readonly next :(_yield? :any) =>
		| { readonly done? :false, readonly value :Stack }
		| { readonly done  :true , readonly value :any   }
	[previous]? :Stack
};

export const x = <T> (rootStack :S<T>) :T => {
	let stack :Stack = rootStack;
	let result = stack.next();
	if ( !result.done ) {
		result.value[previous] = stack;
		result = ( stack = result.value ).next();
		for ( ; ; ) {
			if ( result.done ) {
				if ( stack===rootStack ) { break; }
				stack = stack[previous]!;
				result = stack.next(result.value);
			}
			else {
				result.value[previous] = stack;
				result = ( stack = result.value ).next();
			}
		}
	}
	return result.value;
};

export type { S as default };
type S<T> = T extends void
	? {
		readonly next :() =>
			| { readonly done? :false, readonly value :S<void> }
			| { readonly done  :true , readonly value :  void  }
	}
	: {
		readonly next :(_yield :T) =>
			| { readonly done? :false, readonly value :S<T> }
			| { readonly done  :true , readonly value :  T  }
	};
