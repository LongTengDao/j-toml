import Error from '.Error';
import TypeError from '.TypeError';
import isBuffer from '.Buffer.isBuffer';
import from from ".Buffer.from";
import * as iterator from './share/iterator';
import * as options from './share/options';
import * as RE from './share/RE';
import Root from './parse/level-loop';

export default function parse (
	sourceContent :string | Buffer,
	specificationVersion :0.5,
	useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string,
	useBigInt_forInteger :boolean | number = true,
	extensionOptions                       = null
) :object {
	iterator.could();
	if ( typeof sourceContent!=='string' ) {
		if ( !isBuffer(sourceContent) ) { throw new TypeError('TOML.parse(sourceContent)'); }
		const buffer :Buffer = sourceContent;
		sourceContent = buffer.toString();
		if ( !from(buffer).equals(buffer) ) { throw Error('A TOML doc must be a (ful-scalar) valid utf8 file.'); }
	}
	if ( RE.NON_SCALAR.test(sourceContent) ) { throw Error('A TOML doc must be a (ful-scalar) valid utf8 file.'); }
	if ( specificationVersion!==0.5 ) { throw new Error('TOML.parse(,specificationVersion)'); }
	try {
		options.use(useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
		iterator.todo(sourceContent);
		try {
			const rootTable = Root();
			options.process();
			return rootTable;
		}
		finally { iterator.done(); }
	}
	finally { options.clear(); }
};
