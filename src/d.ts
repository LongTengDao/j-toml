declare module '@ltd/j-toml' {
	
	export const version :string;
	
	type Table = object;
	
	export function parse (
		sourceContent :string | Buffer,
		specificationVersion :0.5 | 0.4,
		multiLineJoiner :string,
		useBigInt? :true | false | number,
		xOptions? :
			{
				order? :boolean,
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
				longer? :boolean,
				hash? :boolean,
				null? :boolean,
				nil? :boolean,
				multi? :boolean,
				ins? :boolean,
				mix :true,
				tag :(tag :string, value :any) => any,
			}
	) :Table;
	
}