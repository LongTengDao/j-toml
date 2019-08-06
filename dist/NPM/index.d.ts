export = exports;

declare namespace exports {
	
	export const version :'0.5.102';
	
	export function parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4 | 0.3 | 0.2 | 0.1,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :Table;
	
	export { exports as default };
	
}

type xOptions = {
	order? :false | true,
	longer? :false | true,
	exact? :false | true,
	null? :false | true,
	multi? :false | true,
	close? :false | true,
} & ( {
	mix? :false | true,
	tag? :null,
} | {
	mix :true,
	tag :(each :
		{ table :Table, key :string, array :null,                   tag :string } |
		{ table :null,               array :any[],   index :number, tag :string } |
		{ table :Table, key :string, array :Table[], index :number, tag :string }
	) => any,
} );

type Table = { [key :string] :any };
