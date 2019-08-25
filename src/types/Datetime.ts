import { newRegExp } from '@ltd/j-regexp';

import SyntaxError from '.SyntaxError';
import Error from '.Error';
import WeakMap from '.WeakMap';
import Date from '.Date';
import getTime from '.Date.prototype.getTime';
import defineProperty from '.Object.defineProperty';
import Null from '.null';

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

const HMS_DOT = newRegExp`
	${HMS}
	(?:\.\d+)?
	`;

export const OFFSET = /(?:Z|[+-]\d\d:\d\d)$/;

const OFFSET_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	${OFFSET}`;

const OFFSET_DATETIME_ZERO = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	Z$`;

const LOCAL_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS_DOT}
	$`;

const LOCAL_DATE = newRegExp`
	^
	${YMD}
	$`;

const LOCAL_TIME = newRegExp`
	^
	${HMS_DOT}
	$`;

const DOT_ZERO = /\.?0+$/;

const literal_cache :WeakMap<Datetime, string> = new WeakMap;
const gotValue_cache :WeakMap<Datetime, number> = new WeakMap;
const dotValue_cache :WeakMap<Datetime, string> = new WeakMap;

const dotDescriptor = Null({ value: '', writable: true, enumerable: false, configurable: true });
class Datetime extends Date {
	
	'.' :string;
	
	constructor (expression :string, literal :string, dotValue :string) {
		super(expression);
		literal_cache.set(this, literal);
		gotValue_cache.set(this, getTime.call(this));
		dotValue_cache.set(this, dotValue);
		defineProperty(this, '.', dotDescriptor);
		if ( dotValue ) { this['.'] = dotValue; }
	}
	
	toISOString (this :Datetime) :string {
		if ( getTime.call(this)===gotValue_cache.get(this) && this['.']===dotValue_cache.get(this) ) { return literal_cache.get(this)!; }
		throw Error('Datetime value has been modified.');
	}
	
	// toJSON() = toISOString()
	// getTime(){}
	// valueOf(){}
	// [Symbol.toPrimitive]('number') = valueOf()
	
}

export class OffsetDateTime extends Datetime {
	constructor (literal :string) {
		( options$0.zeroDatetime ? OFFSET_DATETIME_ZERO : OFFSET_DATETIME ).test(literal) || iterator$0.throws(SyntaxError(`Invalid Offset Date-Time ${literal} at ${iterator$0.where()}`));
		const index :number = literal.lastIndexOf('.');
		super(literal.replace(' ', 'T'), literal, index<0 ? '' : literal.slice(index).replace(OFFSET, '').replace(DOT_ZERO, ''));
	}
}

export class LocalDateTime extends Datetime {
	constructor (literal :string) {
		LOCAL_DATETIME.test(literal) || iterator$0.throws(SyntaxError(`Invalid Local Date-Time ${literal} at ${iterator$0.where()}`));
		const index :number = literal.lastIndexOf('.');
		super(literal.replace(' ', 'T')+'Z', literal, index<0 ? '' : literal.slice(index).replace(DOT_ZERO, ''));
	}
}

export class LocalDate extends Datetime {
	constructor (literal :string) {
		LOCAL_DATE.test(literal) || iterator$0.throws(SyntaxError(`Invalid Local Date ${literal} at ${iterator$0.where()}`));
		super(literal+'T00:00:00.000Z', literal, '');
	}
}

export class LocalTime extends Datetime {
	constructor (literal :string) {
		LOCAL_TIME.test(literal) || iterator$0.throws(SyntaxError(`Invalid Local Time ${literal} at ${iterator$0.where()}`));
		const index :number = literal.lastIndexOf('.');
		super('1970-01-01T'+literal+'Z', literal, index<0 ? '' : literal.slice(index).replace(DOT_ZERO, ''));
	}
}
