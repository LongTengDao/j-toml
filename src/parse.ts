import TypeError from '.TypeError';
import isBuffer from '.Buffer.isBuffer';
import * as iterator from './share/iterator';
import * as options from './share/options';
import Root from './parse/level-loop';

export default function parse (
	sourceContent :string | Buffer,
	specificationVersion :0.5,
	useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string,
	useBigInt_forInteger :boolean | number = true,
	extensionOptions                       = null
) :object {
	if ( typeof sourceContent!=='string' ) {
		if ( !isBuffer(sourceContent) ) { throw new TypeError('TOML.parse(sourceContent)'); }
		sourceContent = sourceContent.toString();
	}
	options.use(specificationVersion, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
	try {
		iterator.from(sourceContent);
		try {
			const rootTable = Root();
			options.Wc();
			return rootTable;
		}
		finally { iterator.done(); }
	}
	finally { options.clear(); }
};
