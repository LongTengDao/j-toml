import Error from '.Error';
import TypeError from '.TypeError';
import isView from '.ArrayBuffer.isView';
import isArray from '.Array.isArray';
import assign from '.Object.assign';
import apply from '.Reflect.apply';
import undefined from '.undefined';
import Null from '.null';
import isArrayBuffer from '.class.isArrayBuffer';
import TextDecoder from '.TextDecoder';

import { clearRegExp, theRegExp } from '@ltd/j-regexp';

import * as iterator from '../iterator';
import * as options from '../options';
import Root from './level-loop';
import { isLinesFromStringify } from '../stringify/';

const textDecoder = /*#__PURE__*/new TextDecoder('utf-8', Null({ fatal: true, ignoreBOM: false }));
const binary2string = (arrayBufferLike :Uint8Array | ArrayBuffer) :string => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.`); }
};
const isBinaryLike = (value :object) :value is Uint8Array | ArrayBuffer => 'byteLength' in value;///

const { test: includesNonScalar } = theRegExp(/[\uD800-\uDFFF]/u);
const assertFulScalar = (string :string) :void => {
	if ( clearRegExp(includesNonScalar(string)) ) { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.`); }
};

let holding :boolean = false;

const parse = (source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multilineStringJoiner :undefined | string | { joiner? :string, bigint? :boolean | number, keys? :null | options.Keys, x? :options.XOptions }, bigint :undefined | boolean | number | bigint, x :undefined | options.XOptions, argsMode :',,' | ',' | '') :Table => {
	let sourcePath :string = '';
	if ( typeof source==='object' && source ) {
		if ( isArray(source) ) { throw TypeError(isLinesFromStringify(source) ? `TOML.parse(array from TOML.stringify(,{newline?}))` : `TOML.parse(array)`); }
		else if ( isBinaryLike(source) ) { source = binary2string(source); }
		else {
			sourcePath = source.path;
			if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.path)`); }
			const { data, require: req = typeof require==='function' ? require : undefined } = source;
			if ( req ) {
				const { resolve } = req;
				if ( resolve!=null ) {
					const { paths } = resolve;
					if ( paths!=null ) {
						const ret = apply(paths, resolve, [ '' ]);
						if ( ret!=null ) {
							const val = ret[0];
							if ( val!=null ) {
								const dirname_ = val.replace(/node_modules$/, '');
								if ( dirname_ ) {
									sourcePath = ( req as (id :'path') => typeof import('path') )('path').resolve(dirname_, sourcePath);
									if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.require('path').resolve)`); }
								}
							}
						}
					}
				}
				if ( data===undefined ) {
					const data = ( req as (id :'fs') => typeof import('fs') )('fs').readFileSync(sourcePath);
					if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
					else { throw TypeError(`TOML.parse(source.require('fs').readFileSync)`); }
				}
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
			else {
				if ( data===undefined ) { throw TypeError(`TOML.parse(source.data|source.require)`); }
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
		}
	}
	else if ( typeof source==='string' ) { assertFulScalar(source); }
	else { throw TypeError(`TOML.parse(source)`); }
	let joiner :string | undefined;
	let keys :options.Keys | null | undefined;
	if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
		if ( bigint!==undefined || x!==undefined ) { throw TypeError(`options mode ? args mode`); }
		joiner = multilineStringJoiner.joiner;
		bigint = multilineStringJoiner.bigint;
		keys = multilineStringJoiner.keys;
		x = multilineStringJoiner.x;
		argsMode = '';
	}
	else { joiner = multilineStringJoiner; }
	let rootTable :Table;
	let process :options.Process;
	if ( holding ) { throw Error(`parsing during parsing.`); }
	holding = true;
	try {
		options.use(specificationVersion, joiner, bigint, keys, x, argsMode);
		iterator.todo(source, sourcePath);
		source && source[0]==='\uFEFF' && iterator.throws(TypeError(`TOML content (string) should not start with BOM (U+FEFF)` + iterator.where(' at ')));
		rootTable = Root();
		process = options.Process();
	}
	finally {
		iterator.done();//clearWeakSets();
		options.clear();
		holding = false;
		clearRegExp();
	}
	process && process();
	return rootTable;
};

export default /*#__PURE__*/assign(
	(source :Source, specificationVersion :1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions, ',,')
			: parse(source, 1.0, specificationVersion as string, multilineStringJoiner as any as undefined | boolean | number, useBigInt as options.XOptions, ',')
	,
	{
		'1.0': (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
		1.0: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions, ','),
		0.5: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions, ','),
		0.4: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions, ','),
		0.3: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions, ','),
		0.2: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions, ','),
		0.1: (source :Source, multilineStringJoiner? :string, useBigInt? :boolean | number, xOptions? :options.XOptions) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
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
