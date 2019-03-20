import TypeError from '.TypeError';
import parse from './parse';

export default function install (
	readFileSync :(path) => Buffer,
	specificationVersion :0.5 | 0.4,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions                    = null
) {
	if ( typeof readFileSync!=='function' ) { throw TypeError('TOML.install(readFileSync)'); }
	parse('', specificationVersion, multiLineJoiner, useBigInt, xOptions);
	require.extensions['.toml'] = function require_toml (module, filename) {
		module.exports = parse(readFileSync(filename), specificationVersion, multiLineJoiner, useBigInt, xOptions);
	};
};
