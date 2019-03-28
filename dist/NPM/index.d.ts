export = exports;

declare const exports :{
	
	version :'0.5.82'
	
	parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :Table
	
	install (
		readFileSync :(path :string) => Buffer | Promise<Buffer>,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :void
	
	default :typeof exports
	
};

type xOptions = {
	order? :boolean,
	longer? :boolean,
	hash? :boolean,
	null? :boolean,
	nil? :boolean,
	multi? :boolean,
	ins? :boolean,
	mix? :boolean,
} | {
	order? :boolean,
	longer? :boolean,
	hash? :boolean,
	null? :boolean,
	nil? :boolean,
	multi? :boolean,
	ins? :boolean,
	mix :true,
	tag :(each :
			  { table :Table, key :string,                                tag :string } |
			  {                            array :any[],   index :number, tag :string } |
			  { table :Table, key :string, array :Table[], index :number, tag :string }
	) => any,
};

type Table = object;
