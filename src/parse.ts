import Error from '.Error';
import TypeError from '.TypeError';
import isBuffer from '.Buffer.isBuffer';
import from from '.Buffer.from';
import * as iterator from './share/iterator';
import * as options from './share/options';
import Root from './parse/level-loop';

const BOM = /^\uFEFF/;
const NON_SCALAR = /[\uD800-\uDFFF]/u;// \u{10FFFF}- > \uFFFD

export default function parse (
	sourceContent :Buffer | string,
	specificationVersion :0.5 | 0.4,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions                    = null
) :object {
	iterator.could();
	if ( isBuffer(sourceContent) ) {
		const buffer :Buffer = sourceContent;
		sourceContent = buffer.toString();
		if ( !from(buffer).equals(buffer) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
		sourceContent = sourceContent.replace(BOM, '');
	}
	if ( typeof sourceContent!=='string' ) { throw TypeError('TOML.parse(sourceContent)'); }
	if ( NON_SCALAR.test(sourceContent) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
	try {
		options.use(specificationVersion, multiLineJoiner, useBigInt, xOptions);
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
