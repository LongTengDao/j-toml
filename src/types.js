import {
	RangeError,
	TypeError,
	BigInt,
	Date,
	Array,
	Infinity,
	NaN,
	isFinite,
	isSafeInteger,
	create,
	toString
} from './global.js';
import { throwSyntaxError, throwRangeError, none, where } from './iterator.js';

export const String = {
	isString: value => typeof value==='string',
};

const UNDERSCORES = /_/g;

const XOB_INTEGER = /^0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*$/;
const INTEGER = /^[-+]?[1-9]\d*(?:_\d+)*$/;
const MAX64 = BigInt(2**63-1);
const MIN64 = ~MAX64;
const ZERO = BigInt(0);
export const Integer = (literal, useBigInt = true) => {
	if ( useBigInt ) {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return ZERO; }
		( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const bitInt = BigInt(literal.replace(UNDERSCORES, ''));
		bitInt<=MAX64 && bitInt>=MIN64 || throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return bitInt;
	}
	else {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0; }
		( literal.charAt(0)==='0' ? XOB_INTEGER : INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const number = +literal.replace(UNDERSCORES, '');
		isSafeInteger(number) || throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return number;
	}
};
Integer.isInteger = value => typeof value==='bigint';

const FLOAT = /^[-+]?(?:0|[1-9]\d*(?:_\d+)*)(?:\.\d+(?:_\d+)*)?(?:[eE][-+]?\d+(?:_\d+)*)?$/;
const FLOAT_NOT_INTEGER = /[.eE]/;
export const Float = literal => {
	if ( FLOAT.test(literal) && FLOAT_NOT_INTEGER.test(literal) ) {
		const number = +literal.replace(UNDERSCORES, '');
		isFinite(number) || throwRangeError('Float can not be as big as Infinity, like '+literal+( none() ? '' : ' at '+where() ));
		return number;
	}
	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	if ( literal==='-inf' ) { return -Infinity; }
	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	throwSyntaxError('Invalid Float '+literal+( none() ? '' : ' at '+where() ));
};
Float.isFloat = value => typeof value==='number';

export const Boolean = {
	isBoolean: value => value===true || value===false,
};

const OFFSET_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
const LOCAL_DATE_TIME = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])([T ])(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const LOCAL_DATE = /^(?:0[1-9]|[1-9]\d)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])$/;
const LOCAL_TIME = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
const TIMEZONE_OFFSET = /^([+-])([01]\d|2[0-3]):([0-5]\d)$/;
const DATE = new Date;
const year = (date, utc) => {
	const year = utc ? date.getUTCFullYear() : date.getFullYear();
	if ( year>=1000 && year<=9999 ) { return ''+year; }
	if ( year>=100 && year<=999 ) { return '0'+year; }
	throw new RangeError('Datetime which year was set out of range 100 to 9999 can not be serialized toTOML.');
};
const month = (datetime, utc) => ( ( utc ? datetime.getUTCMonth() : datetime.getMonth() )+1+'' ).padStart(2, '0');
const date = (datetime, utc) => ( ( utc ? datetime.getUTCDate() : datetime.getDate() )+'' ).padStart(2, '0');
const hours = (datetime, utc) => ( ( utc ? datetime.getUTCHours() : datetime.getHours() )+'' ).padStart(2, '0');
const minutes = (datetime, utc) => ( ( utc ? datetime.getUTCMinutes() : datetime.getMinutes() )+'' ).padStart(2, '0');
const seconds = datetime => ( datetime.getSeconds()+'' ).padStart(2, '0');
const milliseconds = datetime => {
	const milliseconds = datetime.getMilliseconds();
	return milliseconds===0 ? '' : '.'+( milliseconds+'' ).padStart(3, '0');
};

export class Datetime extends Date {
	
	constructor (literal) {
		if ( literal.includes('-') ) {
			if ( literal.includes('T') || literal.includes(' ') ) {
				if ( literal.includes('Z') || literal.includes('+') || literal.split('-').length===4 ) {
					const $ = OFFSET_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Offset Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Offset Date-Time';
					this.T = $[1];
					this.Z = $[2];
				}
				else {
					const $ = LOCAL_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Local Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Local Date-Time';
					this.T = $[1];
				}
			}
			else {
				LOCAL_DATE.test(literal) || throwSyntaxError('Invalid Local Date '+literal+( none() ? '' : ' at '+where() ));
				super(literal);
				this.type = 'Local Date';
			}
		}
		else {
			LOCAL_TIME.test(literal) || throwSyntaxError('Invalid Local Time '+literal+( none() ? '' : ' at '+where() ));
			super('1970-01-01 '+literal);
			this.type = 'Local Time';
		}
	}
	
	static isDatetime (value) {
		return value instanceof Datetime;
	}
	
	toTOML () {
		if ( !isSafeInteger(this.getTime()) ) { throw new RangeError('Datetime which time was set unsafe integer can not be serialized toTOML.'); }
		switch ( this.type ) {
			case 'Offset Date-Time':
				let datetime;
				const { Z } = this;
				if ( Z==='Z' || Z==='+00:00' || Z==='-00:00' ) { datetime = this; }
				else {
					const $ = TIMEZONE_OFFSET.exec(Z);
					datetime = DATE;
					datetime.setTime(this.getTime()+( $[1]+'60000' )*( +$[3]+60*$[2] ));
				}
				return year(datetime, true)+'-'+month(datetime, true)+'-'+date(datetime, true)+this.T+hours(datetime, true)+':'+minutes(datetime, true)+':'+seconds(datetime)+milliseconds(this)+Z;
			case 'Local Date-Time':
				return year(this)+'-'+month(this)+'-'+date(this)+this.T+hours(this)+':'+minutes(this)+':'+seconds(this)+milliseconds(this);
			case 'Local Date':
				return year(this)+'-'+month(this)+'-'+date(this);
			case 'Local Time':
				return hours(this)+':'+minutes(this)+':'+seconds(this)+milliseconds(this);
		}
		throw new TypeError('Unknown type Datetime.');
	}
	
}

export { Array };

const Null = function () { };
Null.prototype = create(null);

export class Table extends Null {
	
	static isTable (value) {
		return value instanceof Table || toString.call(value)==='[object Object]';
	}
	
}
