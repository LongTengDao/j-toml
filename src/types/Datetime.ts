import SyntaxError from '.SyntaxError';
import NativeDate from '.Date';
import parse from '.Date.parse';
import ownKeys from '.Reflect.ownKeys';
import is from '.Object.is';
import create from '.Object.create';
import preventExtensions from '.Object.preventExtensions';
import freeze from '.Object.freeze';
import Null from '.null';

import { newRegExp } from '@ltd/j-regexp';

import { Exec } from '../regexps$0';
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
		0
		(?:
			[13578]-${_31_}
			|
			[469]-${_30_}
			|
			2-${_29_}
		)
		|
		1
		(?:
			[02]-${_31_}
			|
			1-${_30_}
		)
	)`;

const HMS = newRegExp`
	${_23_}:${_59_}:${_59_}
	`;

export const OFFSET$ = /(?:Z|[+-]\d\d:\d\d)$/;

const Z_exec = Exec<[ string, string, '+' | '-', string ]>(/(([+-])\d\d):(\d\d)$/);

const OFFSET_DATETIME_exec = newRegExp`
	^
	${YMD}
	[T ]
	${HMS}(?:\.\d{1,3})?
	(\d*?)0*
	(?:Z|[+-]${_23_}:${_59_})
	$`.exec as Exec<[ string, string ]>;

const OFFSET_DATETIME_ZERO_exec = newRegExp`
	^
	${YMD}
	[T ]
	${HMS}
	()
	Z
	$`.exec as Exec<[ string, '' ]>;

const LOCAL_DATETIME = newRegExp`
	^
	${YMD}
	[T ]
	${HMS}
	(?:\.\d+)?
	$`;

const LOCAL_DATE = newRegExp`
	^
	${YMD}
	$`;

const LOCAL_TIME = newRegExp`
	^
	${HMS}
	(?:\.\d+)?
	$`;

const DOT_ZERO = /\.?0+$/;
const DELIMITER_DOT_ZERO = /[-T:.]|0+$/;

const Datetime = function (this :object) { return this; } as unknown as { new () :object };//expression? :undefined, literal? :undefined, dotValue? :undefined
//                                > .setTime()
//                                > .getTime() : Date.parse('T')
// [Symbol.toPrimitive]('number') > .valueOf()
//                                > .toISOString()
{
	const descriptors = Null<object>(null);
	const descriptor = Null(null);
	for ( const key of ownKeys(NativeDate.prototype) ) {
		//@ts-ignore
		key==='constructor' ||
		key==='toJSON' ||
		( descriptors[key] = descriptor );
	}
	Datetime.prototype = preventExtensions(create(NativeDate.prototype, descriptors));
	freeze(Datetime);
}

type FullYear       = 0 | number | 9999;
type Month          = 0 | number | 11;
type Date           = 1 | number | 31;
type Hours          = 0 | number | 23;
type Minutes        = 0 | number | 59;
type Seconds        = 0 | number | 59;
type Milliseconds   = 0 | number | 999;
type Day            = 0 | number | 6;
type TimezoneOffset = -1439 | number | 1439;
type Time           = number;
type Value          = string;

const DATE = new NativeDate(0);

export class OffsetDateTime extends Datetime {
	
	#dateString :string;
	#value :Value;
	
	valueOf (this :OffsetDateTime) :Value { return this.#value; }
	toISOString (this :OffsetDateTime) :string { return this.#dateString; }
	
	constructor (dateString :string) {
		const { 1: more } = ( options$0.zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(dateString) ?? iterator$0.throws(SyntaxError(`Invalid Offset Date-Time ${dateString}` + iterator$0.where(' at ')));
		super();
		this.#value = ( '' + parse(this.#dateString = dateString.replace(' ', 'T')) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	private static set = (that :OffsetDateTime, start :number, end :number, value :number) :number => {
		if ( end ) { that.#dateString = that.#dateString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#dateString.slice(end); }
		const time = parse(that.#dateString);
		that.#value = ( '' + time ).padStart(15, '0') + that.#value.slice(15);
		return time;
	};
	
	getUTCFullYear (this :OffsetDateTime) :FullYear { DATE.setTime(+this.#value); return DATE.getUTCFullYear(); }
	getFullYear (this :OffsetDateTime) :FullYear { return +this.#dateString.slice(0, 4); }
	setFullYear (this :OffsetDateTime, value :FullYear) { return OffsetDateTime.set(this, 0, 4, value); }
	getUTCMonth (this :OffsetDateTime) :Month { DATE.setTime(+this.#value); return DATE.getUTCMonth(); }
	getMonth (this :OffsetDateTime) :Month { return +this.#dateString.slice(5, 7) - 1; }
	setMonth (this :OffsetDateTime, value :Month) { return OffsetDateTime.set(this, 5, 7, value + 1); }
	getUTCDate (this :OffsetDateTime) :Date { DATE.setTime(+this.#value); return DATE.getUTCDate(); }
	getDate (this :OffsetDateTime) :Date { return +this.#dateString.slice(8, 10); }
	setDate (this :OffsetDateTime, value :Date) { return OffsetDateTime.set(this, 8, 10, value); }
	
	getUTCHours (this :OffsetDateTime) :Hours { DATE.setTime(+this.#value); return DATE.getUTCHours(); }
	getHours (this :OffsetDateTime) :Hours { return +this.#dateString.slice(11, 13); }
	setHours (this :OffsetDateTime, value :Hours) { return OffsetDateTime.set(this, 11, 13, value); }
	getUTCMinutes (this :OffsetDateTime) :Minutes { DATE.setTime(+this.#value); return DATE.getUTCMinutes(); }
	getMinutes (this :OffsetDateTime) :Minutes { return +this.#dateString.slice(14, 16); }
	setMinutes (this :OffsetDateTime, value :Minutes) { return OffsetDateTime.set(this, 14, 16, value); }
	getUTCSeconds (this :OffsetDateTime) :Seconds { DATE.setTime(+this.#value); return DATE.getUTCSeconds(); }
	getSeconds (this :OffsetDateTime) :Seconds { return +this.#dateString.slice(17, 19); }
	setSeconds (this :OffsetDateTime, value :Seconds) { return OffsetDateTime.set(this, 17, 19, value); }
	getUTCMilliseconds (this :OffsetDateTime) :Milliseconds { DATE.setTime(+this.#value); return DATE.getUTCMilliseconds(); }///
	getMilliseconds (this :OffsetDateTime) :Milliseconds { return +this.#value.slice(12, 15); }///
	setMilliseconds (this :OffsetDateTime, value :Milliseconds) {
		this.#dateString = this.#dateString.slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this.#dateString.slice(this.#dateString.search(OFFSET$));
		return OffsetDateTime.set(this, 0, 0, 0);
	}
	
	getUTCDay (this :OffsetDateTime) :Day { DATE.setTime(+this.#value); return DATE.getUTCDay(); }
	getDay (this :OffsetDateTime) :Day {
		const z = Z_exec(this.#dateString);
		DATE.setTime(+this.#value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		return DATE.getUTCDay();
	}
	getTimezoneOffset (this :OffsetDateTime) :TimezoneOffset {
		const z = Z_exec(this.#dateString);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	setTimezoneOffset (this :OffsetDateTime, value :TimezoneOffset) {
		value = +value;
		DATE.setTime(+this.#value + value*60000);
		let string = DATE.toISOString().slice(0, -1);
		if ( value ) {
			if ( value>0 ) { string += '+'; }
			else {
				string += '-';
				value = -value;
			}
			const m = value%60;
			const h = ( value - m )/60;
			this.#dateString = string + ( h>9 ? h : '0' + h ) + ( m>9 ? ':' + m : ':0' + m );
		}
		else { this.#dateString = string + ( is(value, 0) ? 'Z' : '-00:00' ); }
	}
	getTime (this :OffsetDateTime) :Time { return +this.#value.slice(0, 15); }///
	setTime (this :OffsetDateTime, value :Time) {
		value = DATE.setTime(value);
		const z = Z_exec(this.#dateString);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this.#dateString = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this.#value = ( '' + value ).padStart(15, '0');
		return value;
	}
	
}
//@ts-ignore
delete OffsetDateTime.prototype.constructor;
freeze(OffsetDateTime.prototype);
freeze(OffsetDateTime);

export class LocalDateTime extends Datetime {
	
	#dateString :string;
	#value :Value;
	
	valueOf (this :LocalDateTime) :Value { return this.#value; }
	toISOString (this :LocalDateTime) :string { return this.#dateString; }
	
	constructor (dateString :string) {
		LOCAL_DATETIME.test(dateString) || iterator$0.throws(SyntaxError(`Invalid Local Date-Time ${dateString}` + iterator$0.where(' at ')));
		super();
		this.#value = ( this.#dateString = dateString.replace(' ', 'T') ).replace(DELIMITER_DOT_ZERO, '');
		return this;
	}
	
	private static set = (that :LocalDateTime, start :number, end :number, value :number) => {
		that.#dateString = that.#dateString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#dateString.slice(end);
		that.#value = that.#dateString.replace(DELIMITER_DOT_ZERO, '');
	};
	
	getFullYear (this :LocalDateTime) :FullYear { return +this.#dateString.slice(0, 4); }
	setFullYear (this :LocalDateTime, value :FullYear) { LocalDateTime.set(this, 0, 4, value); }
	getMonth (this :LocalDateTime) :Month { return +this.#dateString.slice(5, 7) - 1; }
	setMonth (this :LocalDateTime, value :Month) { LocalDateTime.set(this, 5, 7, value + 1); }
	getDate (this :LocalDateTime) :Date { return +this.#dateString.slice(8, 10); }
	setDate (this :LocalDateTime, value :Date) { LocalDateTime.set(this, 8, 10, value); }
	
	getHours (this :LocalDateTime) :Hours { return +this.#dateString.slice(11, 13); }
	setHours (this :LocalDateTime, value :Hours) { LocalDateTime.set(this, 11, 13, value); }
	getMinutes (this :LocalDateTime) :Minutes { return +this.#dateString.slice(14, 16); }
	setMinutes (this :LocalDateTime, value :Minutes) { LocalDateTime.set(this, 14, 16, value); }
	getSeconds (this :LocalDateTime) :Seconds { return +this.#dateString.slice(17, 19); }
	setSeconds (this :LocalDateTime, value :Seconds) { LocalDateTime.set(this, 17, 19, value); }
	getMilliseconds (this :LocalDateTime) :Milliseconds { return +this.#value.slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (this :LocalDateTime, value :Milliseconds) {
		this.#dateString = this.#dateString.slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' );
		this.#value = this.#dateString.replace(DELIMITER_DOT_ZERO, '');
	}
	
}
//@ts-ignore
delete LocalDateTime.prototype.constructor;
freeze(LocalDateTime.prototype);
freeze(LocalDateTime);

export class LocalDate extends Datetime {
	
	#dateString :string;
	#value :Value;
	
	valueOf (this :LocalDate) :Value { return this.#value; }
	toISOString (this :LocalDate) :string { return this.#dateString; }
	
	constructor (dateString :string) {
		LOCAL_DATE.test(dateString) || iterator$0.throws(SyntaxError(`Invalid Local Date ${dateString}` + iterator$0.where(' at ')));
		super();
		this.#value = ( this.#dateString = dateString ).replace('-', '').replace('-', '');
		return this;
	}
	
	private static set = (that :LocalDate, start :number, end :number, value :number) => {
		that.#dateString = that.#dateString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#dateString.slice(end);
		that.#value = that.#dateString.replace('-', '').replace('-', '');
	};
	
	getFullYear (this :LocalDate) :FullYear { return +this.#dateString.slice(0, 4); }
	setFullYear (this :LocalDate, value :FullYear) { LocalDate.set(this, 0, 4, value); }
	getMonth (this :LocalDate) :Month { return +this.#dateString.slice(5, 7) - 1; }
	setMonth (this :LocalDate, value :Month) { LocalDate.set(this, 5, 7, value + 1); }
	getDate (this :LocalDate) :Date { return +this.#dateString.slice(8, 10); }
	setDate (this :LocalDate, value :Date) { LocalDate.set(this, 8, 10, value); }
	
}
//@ts-ignore
delete LocalDate.prototype.constructor;
freeze(LocalDate.prototype);
freeze(LocalDate);

export class LocalTime extends Datetime {
	
	#dateString :string;
	#value :Value;
	
	valueOf (this :LocalTime) :Value { return this.#value; }
	toISOString (this :LocalTime) :string { return this.#dateString; }
	
	constructor (dateString :string) {
		LOCAL_TIME.test(dateString) || iterator$0.throws(SyntaxError(`Invalid Local Time ${dateString}` + iterator$0.where(' at ')));
		super();
		this.#value = ( this.#dateString = dateString ).replace(DELIMITER_DOT_ZERO, '');
		return this;
	}
	
	private static set = (that :LocalTime, start :number, end :number, value :number) => {
		that.#dateString = that.#dateString.slice(0, start) + ( '' + value ).padStart(2, '0') + that.#dateString.slice(end);
		that.#value = that.#dateString.replace(DELIMITER_DOT_ZERO, '');
	};
	
	getHours (this :LocalTime) :Hours { return +this.#dateString.slice(0, 2); }
	setHours (this :LocalTime, value :Hours) { LocalTime.set(this, 0, 2, value); }
	getMinutes (this :LocalTime) :Minutes { return +this.#dateString.slice(3, 5); }
	setMinutes (this :LocalTime, value :Minutes) { LocalTime.set(this, 3, 5, value); }
	getSeconds (this :LocalTime) :Seconds { return +this.#dateString.slice(6, 8); }
	setSeconds (this :LocalTime, value :Seconds) { LocalTime.set(this, 6, 8, value); }
	getMilliseconds (this :LocalTime) :Milliseconds { return +this.#value.slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (this :LocalTime, value :Milliseconds) {
		this.#dateString = this.#dateString.slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' );
		this.#value = this.#dateString.replace(DELIMITER_DOT_ZERO, '');
	}
	
}
//@ts-ignore
delete LocalTime.prototype.constructor;
freeze(LocalTime.prototype);
freeze(LocalTime);
