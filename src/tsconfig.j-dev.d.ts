declare module '*?text' {
	const text :string;
	export default text;
}
declare module '*?components' {
	const components :{ [Name in string]? :object };
	export default components;
}