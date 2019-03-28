import Error from '.Error';
import TypeError from '.TypeError';
import isBuffer from '.Buffer.isBuffer';
import from from '.Buffer.from';
import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';
import Root from '../parse/level-loop';

const BOM = /^\uFEFF/;
const NON_SCALAR = /[\uD800-\uDFFF]/u;// \u{10FFFF}- > \uFFFD
const REGEXP = /^/;

export default function parse (
	sourceContent :Buffer | string,
	specificationVersion :0.5 | 0.4,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions                    = null
) :object {
	iterator$0.could();
	if ( isBuffer(sourceContent) ) {
		const buffer :Buffer = sourceContent;
		sourceContent = buffer.toString();
		if ( !from(buffer).equals(buffer) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
		sourceContent = sourceContent.replace(BOM, '');
	}
	if ( typeof sourceContent!=='string' ) { throw TypeError('TOML.parse(sourceContent)'); }
	try {
		if ( NON_SCALAR.test(sourceContent) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
		try {
			options$0.use(specificationVersion, multiLineJoiner, useBigInt, xOptions);
			iterator$0.todo(sourceContent);
			try {
				const rootTable = Root();
				options$0.process();
				return rootTable;
			}
			finally { iterator$0.done(); }
		}
		finally { options$0.clear(); }
	}
	finally { REGEXP.test(''); }
};
