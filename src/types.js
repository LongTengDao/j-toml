import { RangeError, TypeError, BigInt, Date, parseInt, Infinity, NaN, isFinite, isSafeInteger, fromCodePoint, create } from './global.js';
import { orderify } from './import.js';
import { throwSyntaxError, throwRangeError, none, where } from './iterator.js';
import * as RE from './RE.js?<RegExp>';

const ESCAPE_ALIAS = { b: '\b', t: '\t', n: '\n', f: '\f', r: '\r' };
export const unEscapeSingleLine = ($0, $1, $2, $3, $4, $5) => $1 ? $1 : $2 ? ESCAPE_ALIAS[$2] : fromCodePoint(parseInt($3 || $4+$5, 16));
export const String = literal => literal.replace(RE.ESCAPED_IN_SINGLE_LINE, unEscapeSingleLine);
String.isString = value => typeof value==='string';

export const Integer = (literal, useBigInt = true, allowLonger = false) => {
	if ( useBigInt===false ) {
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { return 0; }
		( literal.charAt(0)==='0' ? RE.XOB_INTEGER : RE.INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
		const number = +literal.replace(RE.UNDERSCORES, '');
		allowLonger || isSafeInteger(number) || throwRangeError('Integer did not use BitInt must be Number.isSafeInteger, not includes '+literal+( none() ? '' : ' meet at '+where() ));
		return number;
	}
	else {
		let bigInt;
		if ( literal==='0' || literal==='+0' || literal==='-0' ) { bigInt = 0n; }
		else {
			( literal.charAt(0)==='0' ? RE.XOB_INTEGER : RE.INTEGER ).test(literal) || throwSyntaxError('Invalid Integer '+literal+( none() ? '' : ' at '+where() ));
			bigInt = BigInt(literal.replace(RE.UNDERSCORES, ''));
			allowLonger ||
			-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n ||// ( min = -(2n**(64n-1n)) || ~max ) <= long <= ( max = 2n**(64n-1n)-1n || ~min )
			throwRangeError('Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes '+literal+( none() ? '' : ' meet at '+where() ));
		}
		if ( useBigInt===true ) { return bigInt; }
		isSafeInteger(useBigInt) || throwRangeError('TOML.Integer(,useBigInt) argument muse be safe integer.');
		if ( useBigInt<0 ? useBigInt<=bigInt && bigInt<= ~useBigInt : -useBigInt<=bigInt && bigInt<=useBigInt ) { return +( bigInt+'' ); }
		return bigInt;
	}
};
Integer.isInteger = value => typeof value==='bigint';

export const Float = literal => {
	if ( RE.FLOAT.test(literal) && RE.FLOAT_NOT_INTEGER.test(literal) ) {
		const number = +literal.replace(RE.UNDERSCORES, '');
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

const DATE = new Date;
const year = (date, utc) => {
	const year = utc ? date.getUTCFullYear() : date.getFullYear();
	if ( 1000<=year && year<=9999 ) { return ''+year; }
	if ( 100<=year && year<=999 ) { return '0'+year; }
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
					const $ = RE.OFFSET_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Offset Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Offset Date-Time';
					this.T = $[1];
					this.Z = $[2];
				}
				else {
					const $ = RE.LOCAL_DATE_TIME.exec(literal) || throwSyntaxError('Invalid Local Date-Time '+literal+( none() ? '' : ' at '+where() ));
					super(literal);
					this.type = 'Local Date-Time';
					this.T = $[1];
				}
			}
			else {
				RE.LOCAL_DATE.test(literal) || throwSyntaxError('Invalid Local Date '+literal+( none() ? '' : ' at '+where() ));
				super(literal);
				this.type = 'Local Date';
			}
		}
		else {
			RE.LOCAL_TIME.test(literal) || throwSyntaxError('Invalid Local Time '+literal+( none() ? '' : ' at '+where() ));
			super('1970-01-01 '+literal);
			this.type = 'Local Time';
		}
	}
	
	static isDatetime (value) { return value instanceof Datetime; }
	
	toTOML () {
		if ( !isSafeInteger(this.getTime()) ) { throw new RangeError('Datetime which time was set unsafe integer can not be serialized toTOML.'); }
		switch ( this.type ) {
			case 'Offset Date-Time':
				let datetime;
				const { Z } = this;
				if ( Z==='Z' || Z==='+00:00' || Z==='-00:00' ) { datetime = this; }
				else {
					const $ = RE.TIMEZONE_OFFSET.exec(Z);
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

export const Table = function (keepOrder) {
	let undefined;
	if ( new.target===undefined ) { throw new TypeError("Class constructor Table cannot be invoked without 'new'"); }
	if ( keepOrder ) { return orderify(this); }
};
Table.prototype = create(null);
Table.isTable = value => value instanceof Table;
