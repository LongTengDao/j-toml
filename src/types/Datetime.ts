import SyntaxError from '.SyntaxError';
import Error from '.Error';
import Symbol from '.Symbol';
import Date from '.Date';
import * as RE from '../share/RE';
import * as iterator from '../share/iterator';

const literal_cache = Symbol('literal_cache');
const value_cache = Symbol('value_cache');

export class Datetime extends Date {
	
	type :string;
	
	constructor (literal :string) {
		// @ts-ignore
		const { 0: hms_ms = '', 1: YMD = '', 2: T = '', 3: HMS_MS = hms_ms, 4: Z = '' } :RegExpExecArray = RE.DATETIME.exec(literal) || iterator.throws(SyntaxError('Invalid Datetime '+literal+' at '+iterator.where()));
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
	
	//static isDatetime (value :any) :boolean { return value instanceof Datetime; }
	
	//toJSON (this :Datetime) :string { return this.toISOString(); }
	toISOString (this :Datetime) :string {
		if ( this.getTime()===this[value_cache] ) { return this[literal_cache]; }
		throw new Error('Datetime value has been modified.');
	}
	
}
