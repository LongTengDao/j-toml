import { TypeError, BigInt, Date, Infinity, NaN, isSafeInteger, create } from './global.js';
import { orderify } from './import.js';
import { throwSyntaxError, throwRangeError, none, where } from './iterator.js';
import * as RE from './RE.js?<RegExp>';

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
		if ( useBigInt<0 ? useBigInt<=bigInt && bigInt<= -useBigInt-1 : -useBigInt<=bigInt && bigInt<=useBigInt ) { return +( bigInt+'' ); }
		return bigInt;
	}
};

export const Float = literal => {
	if ( RE.FLOAT.test(literal) && RE.FLOAT_NOT_INTEGER.test(literal) ) {
		return +literal.replace(RE.UNDERSCORES, '');
		//const number = +literal.replace(RE.UNDERSCORES, '');
		//isFinite(number) || throwRangeError('Float can not be as big as Infinity, like '+literal+( none() ? '' : ' at '+where() ));
		//return number;
	}
	if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
	if ( literal==='-inf' ) { return -Infinity; }
	if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { return NaN; }
	throwSyntaxError('Invalid Float '+literal+( none() ? '' : ' at '+where() ));
};

const literal_cache = Symbol('literal_cache');
const value_cache = Symbol('value_cache');
export class Datetime extends Date {
	
	constructor (literal) {
		const [hms_ms = '', YMD = '', T = '', HMS_MS = hms_ms, Z = ''] = RE.DATETIME.exec(literal) || throwSyntaxError('Invalid Datetime '+literal+( none() ? '' : ' at '+where() ));
		super(
			Z ? YMD+'T'+HMS_MS+Z :
				T ? YMD+'T'+HMS_MS :
					YMD ? YMD+'T00:00:00.000'
						: '1970-01-01T'+HMS_MS
		);
		this.type =
			Z ? 'Offset Date-Time' :
				T ? 'Local Date-Time' :
					YMD ? 'Local Date'
						: 'Local Time';
		this[literal_cache] = literal;
		this[value_cache] = this.getTime();
	}
	
	static isDatetime (value) { return value instanceof Datetime; }
	
	//toJSON () { return this.toISOString(); }
	toISOString () {
		if ( this.getTime()===this[value_cache] ) { return this[literal_cache]; }
		throw new Error('Datetime value has been modified.');
	}
	
}

export const Table = function Table (keepOrder) {
	let undefined;
	if ( new.target===undefined ) { throw new TypeError("Class constructor Table cannot be invoked without 'new'"); }
	if ( keepOrder ) { return orderify(this); }
};
export const TableDefault = function Table () { };
export const TableKeepOrder = function Table () { return orderify(this); };
Table.prototype = TableDefault.prototype = TableKeepOrder.prototype = create(null);
export const isTable = Table.isTable = value => value instanceof Table;
