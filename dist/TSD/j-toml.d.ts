declare module '@ltd/j-toml' {
	
	export const version :string;
	
	type Table = object;
	
	export function parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :
			{
				order? :boolean,
				open? :boolean,
				longer? :boolean,
				hash? :boolean,
				null? :boolean,
				nil? :boolean,
				multi? :boolean,
				ins? :boolean,
				mix? :boolean,
			}
			|
			{
				order? :boolean,
				open? :boolean,
				longer? :boolean,
				hash? :boolean,
				null? :boolean,
				nil? :boolean,
				multi? :boolean,
				ins? :boolean,
				mix :true,
				new :
					{ [type :string] :(value :any) => any }
					|
					( (type :string, value :any) => any )
			}
	) :Table;
	
}