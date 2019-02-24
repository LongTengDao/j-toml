import { Symbol, Date } from '../global.js';
import * as RE from '../share/RE.js';
import * as iterator from '../share/iterator.js';

const literal_cache = Symbol('literal_cache');
const value_cache = Symbol('value_cache');

export class Datetime extends Date {
	
	constructor (literal) {
		const [hms_ms = '', YMD = '', T = '', HMS_MS = hms_ms, Z = ''] = RE.DATETIME.exec(literal) || iterator.throwSyntaxError('Invalid Datetime '+literal+' at '+iterator.where());
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
	
	//static isDatetime (value) { return value instanceof Datetime; }
	
	//toJSON () { return this.toISOString(); }
	toISOString () {
		if ( this.getTime()===this[value_cache] ) { return this[literal_cache]; }
		throw new Error('Datetime value has been modified.');
	}
	
}
