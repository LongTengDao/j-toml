import { newRegExp } from '@ltd/j-regexp';

import SyntaxError from '.SyntaxError';
import Error from '.Error';
import WeakMap from '.WeakMap';
import Date from '.Date';

import * as options$0 from '../options$0';
import * as iterator$0 from '../iterator$0';

const _29_ = /(?:0[1-9]|1\d|2[0-9])/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = newRegExp`
	\d\d\d\d-
	(?:
		(?:0[13578]|1[02])-${_31_}
		|
		(?:0[469]|11)-${_30_}
		|
		02-${_29_}
	)`;

const HMS = newRegExp`
	${_23_}:${_59_}:${_59_}
	`;

const HMS_ = newRegExp`
	${HMS}
	(?:\.\d+)?
	`;

export const OFFSET = /(?:Z|[+-]\d\d:\d\d)$/;

const OFFSET_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_}
	${OFFSET}
	$`;

const OFFSET_DATETIME_ZERO = newRegExp`
	^
	${YMD}
	[T ]
	${HMS}
	Z
	$`;

const LOCAL_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_}
	$`;

const LOCAL_DATE = newRegExp`
	^
	${YMD}
	$`;

const LOCAL_TIME = newRegExp`
	^
	${HMS_}
	$`;

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
		throw Error('Datetime value has been modified.');
	}
}

export class OffsetDateTime extends Datetime {
	constructor (literal :string) {
		( options$0.zeroDatetime ? OFFSET_DATETIME_ZERO : OFFSET_DATETIME ).test(literal)
		|| iterator$0.throws(SyntaxError('Invalid Offset Date-Time '+literal+' at '+iterator$0.where()));
		super(literal.replace(' ', 'T'), literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index).replace(OFFSET, '') : '';
	}
}

export class LocalDateTime extends Datetime {
	constructor (literal :string) {
		LOCAL_DATETIME.test(literal)
		|| iterator$0.throws(SyntaxError('Invalid Local Date-Time '+literal+' at '+iterator$0.where()));
		super(literal.replace(' ', 'T')+'Z', literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index) : '';
	}
}

export class LocalDate extends Datetime {
	constructor (literal :string) {
		LOCAL_DATE.test(literal)
		|| iterator$0.throws(SyntaxError('Invalid Local Date '+literal+' at '+iterator$0.where()));
		super(literal+'T00:00:00.000Z', literal);
	}
	get '.' () { return ''; }
}

export class LocalTime extends Datetime {
	constructor (literal :string) {
		LOCAL_TIME.test(literal)
		|| iterator$0.throws(SyntaxError('Invalid Local Time '+literal+' at '+iterator$0.where()));
		super('1970-01-01T'+literal+'Z', literal);
	}
	get '.' () {
		const index :number = literal_cache.get(this).indexOf('.')+1;
		return index ? literal_cache.get(this).slice(index) : '';
	}
}
