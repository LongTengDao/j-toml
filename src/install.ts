import TypeError from '.TypeError';
import { xOptions } from './options$0';
import parse from './parse/';

export default function install (
	readFileSync :(path :string) => Buffer,
	specificationVersion :0.5 | 0.4 | 0.3,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions :xOptions = null
) {
	if ( typeof readFileSync!=='function' ) { throw TypeError('TOML.install(readFileSync)'); }
	parse('', specificationVersion, multiLineJoiner, useBigInt, xOptions);
	require.extensions['.toml'] = function require_toml (module, filename :string) :void {
		const sourceContent = readFileSync(filename);
		module.exports = parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt, xOptions);
	};
};
