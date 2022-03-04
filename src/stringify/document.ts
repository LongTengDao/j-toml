import TypeError from '.TypeError';
import RangeError from '.RangeError';
import SyntaxError from '.SyntaxError';
import Array from '.Array';
import isSafeInteger from '.Number.isSafeInteger';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import Null from '.null';

import { theRegExp } from '@ltd/j-regexp';

import TOMLSection from './section';

const name2code = /*#__PURE__*/Null({
	document: 0,
	section: 1,
	header: 2,
	pairs: 3,
	pair: 4,
} as const);

const { test: IS_INDENT } = theRegExp(/^[\t ]*$/);

const return_false = () => false;

export default class TOMLDocument extends Array<TOMLSection> {
	
	override get ['constructor'] () { return Array; }
	
	0 = new TOMLSection(this);
	
	readonly asInteger :(this :void, number :number) => boolean = return_false;
	readonly newline :'' | '\n' | '\r\n' = '';
	readonly newlineUnderSection :boolean;
	readonly newlineUnderSectionButPair :boolean;
	readonly newlineUnderHeader :boolean;
	readonly newlineUnderPair :boolean;
	readonly newlineUnderPairButDotted :boolean;
	readonly newlineUnderDotted :boolean;
	readonly indent :string = '\t';
	readonly T :'T' | 't' | ' ' = 'T';
	readonly Z :'Z' | 'z' = 'Z';
	readonly nullDisabled :boolean = true;
	readonly multilineTableDisabled :boolean = true;
	readonly multilineTableComma? :boolean;
	readonly preferCommentForThis :boolean = false;
	readonly $singlelineArray? :0 | 1 | 2 | 3;
	
	constructor (options :READONLY.Options) {
		
		super();
		
		const integer = options?.integer;
		if ( integer===undefined ) {}
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number :number) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError(`TOML.stringify(,{integer}) can only be number`); }
		
		const newline = options?.newline;
		if ( newline===undefined ) {}
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		
		const preferCommentFor = options?.preferCommentFor;
		if ( preferCommentFor===undefined ) {}
		else if ( preferCommentFor==='this' || preferCommentFor==='key' ) { this.preferCommentForThis = preferCommentFor==='this'; }
		else { throw TypeError(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
		
		const around = name2code[options?.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		
		const indent = options?.indent;
		if ( indent===undefined ) {}
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		
		const T = options?.T;
		if ( T===undefined ) {}
		else if ( T===' ' || T==='t' || T==='T' ) { this.T = T; }
		else { throw TypeError(`TOML.stringify(,{T}) can only be "T" or " " or "t"`); }
		
		const Z = options?.Z;
		if ( Z===undefined ) {}
		else if ( Z==='z' || Z==='Z' ) { this.Z = Z; }
		else { throw TypeError(`TOML.stringify(,{Z}) can only be "Z" or "z"`); }
		
		if ( options?.xNull ) { this.nullDisabled = false; }
		
		const xBeforeNewlineInMultilineTable = options?.xBeforeNewlineInMultilineTable;
		if ( xBeforeNewlineInMultilineTable===undefined ) {}
		else if ( xBeforeNewlineInMultilineTable==='' || xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
		}
		else { throw TypeError(`TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`); }
		
		const $singlelineArray = options?.forceInlineArraySpacing;
		switch ( $singlelineArray ) {
			case undefined:
				break;
			case 0:
			case 1:
			case 2:
			case 3:
				this.$singlelineArray = $singlelineArray;
				break;
			default:
				throw typeof $singlelineArray==='number'
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`)
					: TypeError(`array inline mode must be "number" type, not including ${$singlelineArray===null ? '"null"' : typeof $singlelineArray}`);
		}
		
		return this;
		
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

import type * as READONLY from './readonly';