import TypeError from '.TypeError';
import Promise from '.Promise';
import parse from './parse';

export default function install (
	readFile :(path) => Buffer | Promise<Buffer>,
	specificationVersion :0.5 | 0.4,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions                    = null
) {
	if ( typeof readFile!=='function' ) { throw TypeError('TOML.install(readFile)'); }
	parse('', specificationVersion, multiLineJoiner, useBigInt, xOptions);
	require.extensions['.toml'] = function require_toml (module, filename :string) :void {
		const data = readFile(filename);
		module.exports = data instanceof Promise
			? data.then(onFulfilled)
			: parse(data, specificationVersion, multiLineJoiner, useBigInt, xOptions);
	};
	function onFulfilled (data :Buffer) :object {
		return parse(data, specificationVersion, multiLineJoiner, useBigInt, xOptions);
	}
};
