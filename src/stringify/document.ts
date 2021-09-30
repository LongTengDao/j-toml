import TypeError from '.TypeError';
import RangeError from '.RangeError';
import SyntaxError from '.SyntaxError';
import Array from '.Array';
import isSafeInteger from '.Number.isSafeInteger';
import Null from '.null';

import { theRegExp } from '@ltd/j-regexp';

import TOMLSection from './section';

const name2code = Null({
	document: 0,
	section: 1,
	header: 2,
	pairs: 3,
	pair: 4,
} as const);

const IS_INDENT = /*#__PURE__*/( () => theRegExp(/^[\t ]*$/).test )();

export default class TOMLDocument extends Array<TOMLSection> {
	
	override get ['constructor'] () { return Array; }
	
	0 = new TOMLSection(this);
	
	readonly newline :'' | '\n' | '\r\n';
	readonly newlineUnderSection :boolean;
	readonly newlineUnderSectionButPair :boolean;
	readonly newlineUnderHeader :boolean;
	readonly newlineUnderPair :boolean;
	readonly newlineUnderPairButDotted :boolean;
	readonly newlineUnderDotted :boolean;
	readonly indent :string;
	readonly _ :boolean;
	readonly nullDisabled :boolean;
	readonly multilineTableDisabled :boolean;
	readonly multilineTableComma :boolean;
	
	constructor (options :READONLY.Options) {
		super();
		const newline = options?.newline;
		if ( newline===undefined || newline==='\n' || newline==='\r\n' ) { this.newline = newline ?? ''; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		const around = name2code[options?.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		const indent = options?.indent;
		if ( indent===undefined ) { this.indent = '\t'; }
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		this._ = options?.T===' ';
		this.nullDisabled = !options?.xNull;
		const xBeforeNewlineInMultilineTable = options?.xBeforeNewlineInMultilineTable;
		if ( xBeforeNewlineInMultilineTable==='' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = false;
		}
		else if ( xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = true;
		}
		else {
			this.multilineTableDisabled = true;
			this.multilineTableComma = true;
		}
		return this;
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

import type * as READONLY from './readonly';