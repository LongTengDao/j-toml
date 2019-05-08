export = exports;

declare const exports :{
	
	version :string
	
	parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4 | 0.3 | 0.2 | 0.1,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :Table
	
	install (
		readFileSync :(path :string) => Buffer,
		specificationVersion :0.5 | 0.4 | 0.3 | 0.2 | 0.1,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :void
	
	default :typeof exports
	
};

type xOptions = {
	order? :boolean,
	longer? :boolean,
	null? :boolean,
	multi? :boolean,
	close? :boolean,
} & ( {
	mix? :boolean,
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
