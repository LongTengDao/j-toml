declare module '@ltd/j-toml' {
	
	export const version :string;
	
	type Table = object;
	
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
	
	export function parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :Table;
	
	export function install (
		readFileSync :(path) => Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :xOptions,
	) :void;
	
}