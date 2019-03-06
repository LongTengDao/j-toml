declare module '@ltd/j-toml' {
	type Table = object;
	export function parse (
		sourceContent   :string | Buffer,
		version         :0.5,
		multiLineJoiner :string,
		useBigInt?      :true | false | number,
		xOptions?       :object
	) :Table;
}