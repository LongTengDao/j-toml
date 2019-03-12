import Proxy from '.Proxy';
import create from '.Object.create';

const NT = /[\n\t]/g;

function Source (raw :string[], substitutions :( string | RegExp )[]) :string {
	let source :string = raw[0];
	for ( let length :number = substitutions.length, index :number = 0; index<length; ) {
		const substitution :string | RegExp = substitutions[index];
		source += ( typeof substitution==='string' ? substitution : substitution.source )+raw[++index];
	}
	return source.replace(NT, '');
}

export default new Proxy(
	({ raw } :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp => RegExp(Source(<string[]>raw, substitutions)),
	create(null, {
		get: {
			value (newRegExp, flags :string) {
				return ({ raw } :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp => RegExp(Source(<string[]>raw, substitutions), flags);
			}
		}
	})
) as {
	(template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp
	[flags :string] :(template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) => RegExp
};