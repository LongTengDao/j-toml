import SyntaxError from '.SyntaxError';
import Error from '.Error';
import WeakMap from '.WeakMap';
import Date from '.Date';
import * as RE from '../share/RE';
import * as iterator from '../share/iterator';

const literal_cache = new WeakMap;
const value_cache = new WeakMap;

class Datetime extends Date {
	constructor (expression :string, literal :string) {
		super(expression);
		literal_cache.set(this, literal);
		value_cache.set(this, this.getTime());
	}
	// Date.prototype.toJSON => toISOString
	toISOString (this :Datetime) :string {
		if ( this.getTime()===value_cache.get(this) ) { return literal_cache.get(this); }
		throw new Error('Datetime value has been modified.');
	}
}

export class OffsetDateTime extends Datetime {
	constructor (literal :string) {
		RE.OFFSET_DATETIME.test(literal)
		|| iterator.throws(SyntaxError('Invalid Offset Date-Time '+literal+' at '+iterator.where()));
		super(literal.replace(' ', 'T'), literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index).replace(RE.OFFSET, '') : '';
	}
}

export class LocalDateTime extends Datetime {
	constructor (literal :string) {
		RE.LOCAL_DATETIME.test(literal)
		|| iterator.throws(SyntaxError('Invalid Local Date-Time '+literal+' at '+iterator.where()));
		super(literal.replace(' ', 'T'), literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index) : '';
	}
}

export class LocalDate extends Datetime {
	constructor (literal :string) {
		RE.LOCAL_DATE.test(literal)
		|| iterator.throws(SyntaxError('Invalid Local Date '+literal+' at '+iterator.where()));
		super(literal+'T00:00:00.000', literal);
	}
	get '.' () { return ''; }
}

export class LocalTime extends Datetime {
	constructor (literal :string) {
		RE.LOCAL_TIME.test(literal)
		|| iterator.throws(SyntaxError('Invalid Local Time '+literal+' at '+iterator.where()));
		super('1970-01-01T'+literal, literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index) : '';
	}
}
