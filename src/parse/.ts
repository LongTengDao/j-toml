import Error from '.Error';
import TypeError from '.TypeError';
import assign from '.Object.assign';
import isBuffer from '.Buffer.isBuffer?=';
import from from '.Buffer.from?';
import globalThis from '.globalThis';
import undefined from '.undefined';

import { clearRegExp, theRegExp } from '@ltd/j-regexp';
import { NON_SCALAR } from '@ltd/j-utf';

import * as iterator$0 from '../iterator$0';
import * as options$0 from '../options$0';
import Root from '../parse/level-loop';

const IS_NON_SCALAR = /*#__PURE__*/( () => theRegExp(NON_SCALAR).test )();
const BOM = '\uFEFF';
const buf2str = (buf :Buffer) => {
	const str = buf.toString();
	if ( !from(str).equals(buf) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
	return str[0]===BOM ? str.slice(1) : str;
};

const parse = (source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) :Table => {
	iterator$0.could();
	let sourcePath :string;
	if ( isBuffer(source) ) {
		source = buf2str(source);
		sourcePath = '';
	}
	else if ( typeof source==='object' && source ) {
		sourcePath = source.path;
		if ( typeof sourcePath!=='string' ) { throw TypeError('TOML.parse(source.path)'); }
		const { data } = source;
		if ( data===undefined ) { source = buf2str(( globalThis.require('fs') as typeof import('fs') ).readFileSync(sourcePath)); }
		else if ( isBuffer(data) ) { source = buf2str(data); }
		else if ( typeof data==='string' ) { source = data; }
		else { throw TypeError('TOML.parse(source.data)'); }
	}
	else if ( typeof source==='string' ) { sourcePath = ''; }
	else { throw TypeError('TOML.parse(source)'); }
	try {
		if ( IS_NON_SCALAR(source) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
		try {
			options$0.use(specificationVersion, multiLineStringJoiner, useBigInt, xOptions);
			iterator$0.todo(source, sourcePath);
			try {
				const rootTable = Root();
				options$0.process();
				return rootTable;
			}
			finally {
				//clearWeakSets();
				iterator$0.done();
			}
		}
		finally { options$0.clear(); }
	}
	finally { clearRegExp(); }
};

export default /*#__PURE__*/assign(
	(source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => typeof specificationVersion==='number'
		? parse(source, specificationVersion, multiLineStringJoiner, useBigInt, xOptions)
		: parse(source, 1.0, specificationVersion as string, multiLineStringJoiner as any as undefined | boolean | number, useBigInt as options$0.XOptions),
	{
		'1.0': (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.1, multiLineStringJoiner, useBigInt, xOptions),
		1.0: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 1.0, multiLineStringJoiner, useBigInt, xOptions),
		0.5: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.5, multiLineStringJoiner, useBigInt, xOptions),
		0.4: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.4, multiLineStringJoiner, useBigInt, xOptions),
		0.3: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.3, multiLineStringJoiner, useBigInt, xOptions),
		0.2: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.2, multiLineStringJoiner, useBigInt, xOptions),
		0.1: (source :Source, multiLineStringJoiner :string, useBigInt? :boolean | number, xOptions? :options$0.XOptions) => parse(source, 0.1, multiLineStringJoiner, useBigInt, xOptions),
	}
);

type Source = string | Buffer | { readonly path :string, readonly data? :string | Buffer };

import type { Table } from '../types/Table';
