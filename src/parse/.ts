import Error from '.Error';
import TypeError from '.TypeError';
import assign from '.Object.assign';
import hasOwn from '.Object.hasOwn?=';
import undefined from '.undefined';

import { clearRegExp, theRegExp } from '@ltd/j-regexp';

import * as iterator from '../iterator';
import * as options from '../options';
import Root from './level-loop';
import { isArrayBufferLike, arrayBufferLike2string } from '../UTF8';

const { test: IS_NON_SCALAR } = theRegExp(/[\uD800-\uDFFF]/u);

let holding :boolean = false;

const parse = (source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multilineStringJoiner? :string | { joiner? :string, bigint? :boolean | number, x? :options.XOptions }, useBigInt? :boolean | number | bigint, xOptions? :options.XOptions) :Table => {
	if ( holding ) { throw Error('parse during parsing.'); }
	holding = true;
	let rootTable :Table;
	let process :options.Process;
	try {
		let sourcePath :string = '';
		if ( typeof source==='object' && source ) {
			if ( isArrayBufferLike(source) ) { source = arrayBufferLike2string(source); }
			else {
				sourcePath = source.path;
				if ( typeof sourcePath!=='string' ) { throw TypeError('TOML.parse(source.path)'); }
				const { data, require: req = typeof require==='function' ? require : undefined } = source;
				if ( req ) {
					const dirname_ = req.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '');
					if ( dirname_ ) {
						sourcePath = ( req as (id :'path') => typeof import('path') )('path').resolve(dirname_, sourcePath);
						if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.require('path').resolve)`); }
					}
					if ( data===undefined ) {
						const data = ( req as (id :'fs') => typeof import('fs') )('fs').readFileSync(sourcePath);
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError(`TOML.parse(source.require('fs').readFileSync)`); }
					}
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError('TOML.parse(source.data)'); }
					}
				}
				else {
					if ( data===undefined ) { throw TypeError('TOML.parse(source.data|source.require)'); }
					else if ( typeof data==='string' ) { source = data; }
					else {
						if ( typeof data==='object' && data && isArrayBufferLike(data) ) { source = arrayBufferLike2string(data); }
						else { throw TypeError('TOML.parse(source.data)'); }
					}
				}
			}
		}
		else if ( typeof source!=='string' ) { throw TypeError('TOML.parse(source)'); }
		try {
			if ( IS_NON_SCALAR(source) ) { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.'); }
			if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
				if ( useBigInt!==undefined || xOptions!==undefined ) { throw TypeError('options mode ? args mode'); }
				let joiner :string | undefined;
				if ( hasOwn(multilineStringJoiner, 'joiner') ) { joiner = multilineStringJoiner.joiner; }
				if ( hasOwn(multilineStringJoiner, 'bigint') ) { useBigInt = multilineStringJoiner.bigint; }
				if ( hasOwn(multilineStringJoiner, 'x') ) { xOptions = multilineStringJoiner.x; }
				multilineStringJoiner = joiner;
			}
			try {
				options.use(specificationVersion, multilineStringJoiner, useBigInt, xOptions);
				iterator.todo(source, sourcePath);
				try {
					source && source[0]==='\uFEFF' && iterator.throws(TypeError(`TOML content (string) should not start with BOM (U+FEFF)` + iterator.where(' at ')));
					rootTable = Root();
					process = options.Process();
				}
				finally { iterator.done(); }//clearWeakSets();
			}
			finally { options.clear(); }
		}
		finally { clearRegExp(); }
	}
	finally { holding = false; }
	process?.();
	return rootTable;
};

export default /*#__PURE__*/assign(
	(source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions)
			: parse(source, 1.0, specificationVersion as string, multilineStringJoiner as any as undefined | boolean | number, useBigInt as options.XOptions)
	,
	{
		'1.0': (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
		1.0: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions),
		0.5: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions),
		0.4: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions),
		0.3: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions),
		0.2: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions),
		0.1: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
	}
);

type Source = string | Buffer | {
	readonly path :string,
	readonly data? :string | Buffer,
	readonly require? :{
		readonly resolve :RequireResolve
		(this :void, id :'path') :{
			readonly resolve :(this :void, dirname :string, filename :string) => string
		}
		(this :void, id :'fs') :{
			readonly readFileSync :(this :void, path :string) => Buffer
		}
	},
};

import type { Table } from '../types/Table';
