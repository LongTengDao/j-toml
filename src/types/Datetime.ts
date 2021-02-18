import SyntaxError from '.SyntaxError';
import NativeDate from '.Date';
import parse from '.Date.parse';
import ownKeys from '.Reflect.ownKeys';
import is from '.Object.is';
import create from '.Object.create';
import preventExtensions from '.Object.preventExtensions';
import freeze from '.Object.freeze';
import Null from '.null';

import { newRegExp, theRegExp } from '@ltd/j-regexp';

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

const Z_exec = theRegExp<1 | 2 | 3>(/(([+-])\d\d):(\d\d)$/).exec;

const OFFSET_DATETIME_exec = newRegExp<1>`
	^
	${YMD}
	[T ]
	${HMS}(?:\.\d{1,3})?
	(\d*?)0*
	(?:Z|[+-]${_23_}:${_59_})
	$`.exec;

const OFFSET_DATETIME_ZERO_exec = newRegExp<1>`
	^
	${YMD}
	[T ]
	${HMS}
	()
	Z
	$`.exec;

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
const DELIMITER_DOT = /[-T:.]/g;
const ZERO = /(?<=\.\d*)0+$/;

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

const Value = (ISOString :string) :Value => ISOString.replace(ZERO, '').replace(DELIMITER_DOT, '');

const leap = (literal :string) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE = new NativeDate(0);

export class OffsetDateTime extends Datetime {
	
	#ISOString :string;
	#value :Value;
	
	valueOf (this :OffsetDateTime) :Value { return this.#value; }
	toISOString (this :OffsetDateTime) :string { return this.#ISOString; }
	
	constructor (literal :string) {
		const { 1: more } = leap(literal) && ( options$0.zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || iterator$0.throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + iterator$0.where(' at ')));
		super();
		this.#ISOString = literal.replace(' ', 'T');
		this.#value = ( '' + parse(this.#ISOString) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	private static use = (that :OffsetDateTime, $ :number = 0) => {
		DATE.setTime(+that.#value + $);
		return DATE;
	};
	private static get = (that :OffsetDateTime, start :number, end :number) => +that.#ISOString.slice(start, end);
	private static set = (that :OffsetDateTime, start :number, end :number, value :number) :number => {
		if ( end ) { that.#ISOString = that.#ISOString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#ISOString.slice(end); }
		const time = parse(that.#ISOString);
		that.#value = ( '' + time ).padStart(15, '0') + that.#value.slice(15);
		return time;
	};
	
	getUTCFullYear (this :OffsetDateTime) :FullYear { return OffsetDateTime.use(this).getUTCFullYear(); }
	getFullYear (this :OffsetDateTime) :FullYear { return OffsetDateTime.get(this, 0, 4); }
	setFullYear (this :OffsetDateTime, value :FullYear) { return OffsetDateTime.set(this, 0, 4, value); }
	getUTCMonth (this :OffsetDateTime) :Month { return OffsetDateTime.use(this).getUTCMonth(); }
	getMonth (this :OffsetDateTime) :Month { return OffsetDateTime.get(this, 5, 7) - 1; }
	setMonth (this :OffsetDateTime, value :Month) { return OffsetDateTime.set(this, 5, 7, value + 1); }
	getUTCDate (this :OffsetDateTime) :Date { return OffsetDateTime.use(this).getUTCDate(); }
	getDate (this :OffsetDateTime) :Date { return OffsetDateTime.get(this, 8, 10); }
	setDate (this :OffsetDateTime, value :Date) { return OffsetDateTime.set(this, 8, 10, value); }
	
	getUTCHours (this :OffsetDateTime) :Hours { return OffsetDateTime.use(this).getUTCHours(); }
	getHours (this :OffsetDateTime) :Hours { return OffsetDateTime.get(this, 11, 13); }
	setHours (this :OffsetDateTime, value :Hours) { return OffsetDateTime.set(this, 11, 13, value); }
	getUTCMinutes (this :OffsetDateTime) :Minutes { return OffsetDateTime.use(this).getUTCMinutes(); }
	getMinutes (this :OffsetDateTime) :Minutes { return OffsetDateTime.get(this, 14, 16); }
	setMinutes (this :OffsetDateTime, value :Minutes) { return OffsetDateTime.set(this, 14, 16, value); }
	getUTCSeconds (this :OffsetDateTime) :Seconds { return OffsetDateTime.use(this).getUTCSeconds(); }
	getSeconds (this :OffsetDateTime) :Seconds { return OffsetDateTime.get(this, 17, 19); }
	setSeconds (this :OffsetDateTime, value :Seconds) { return OffsetDateTime.set(this, 17, 19, value); }
	getUTCMilliseconds (this :OffsetDateTime) :Milliseconds { return OffsetDateTime.use(this).getUTCMilliseconds(); }///
	getMilliseconds (this :OffsetDateTime) :Milliseconds { return +this.#value.slice(12, 15); }///
	setMilliseconds (this :OffsetDateTime, value :Milliseconds) {
		this.#ISOString = this.#ISOString.slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this.#ISOString.slice(this.#ISOString.search(OFFSET$));
		return OffsetDateTime.set(this, 0, 0, 0);
	}
	
	getUTCDay (this :OffsetDateTime) :Day { return OffsetDateTime.use(this).getUTCDay(); }
	getDay (this :OffsetDateTime) :Day {
		return OffsetDateTime.use(this, this.getTimezoneOffset()*60000).getUTCDay();
	}
	getTimezoneOffset (this :OffsetDateTime) :TimezoneOffset {
		const z = Z_exec(this.#ISOString);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	setTimezoneOffset (this :OffsetDateTime, value :TimezoneOffset) {
		value = +value;
		let string = OffsetDateTime.use(this, value*60000).toISOString().slice(0, -1);
		if ( value ) {
			if ( value>0 ) { string += '+'; }
			else {
				string += '-';
				value = -value;
			}
			const m = value%60;
			const h = ( value - m )/60;
			this.#ISOString = string + ( h>9 ? h : '0' + h ) + ( m>9 ? ':' + m : ':0' + m );
		}
		else { this.#ISOString = string + ( is(value, 0) ? 'Z' : '-00:00' ); }
	}
	getTime (this :OffsetDateTime) :Time { return +this.#value.slice(0, 15); }///
	setTime (this :OffsetDateTime, value :Time) {
		value = DATE.setTime(value);
		const z = Z_exec(this.#ISOString);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this.#ISOString = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this.#value = ( '' + value ).padStart(15, '0');
		return value;
	}
	
}
//@ts-ignore
delete OffsetDateTime.prototype.constructor;
freeze(OffsetDateTime.prototype);
freeze(OffsetDateTime);

export class LocalDateTime extends Datetime {
	
	#ISOString :string;
	#value :Value;
	
	valueOf (this :LocalDateTime) :Value { return this.#value; }
	toISOString (this :LocalDateTime) :string { return this.#ISOString; }
	
	constructor (literal :string) {
		LOCAL_DATETIME.test(literal) && leap(literal) || iterator$0.throws(SyntaxError(`Invalid Local Date-Time ${literal}` + iterator$0.where(' at ')));
		super();
		this.#value = Value(
			this.#ISOString = literal.replace(' ', 'T')
		);
		return this;
	}
	
	private static get = (that :LocalDateTime, start :number, end :number) => +that.#ISOString.slice(start, end);
	private static set = (that :LocalDateTime, start :number, end :number, value :number) => {
		that.#value = Value(
			that.#ISOString = that.#ISOString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#ISOString.slice(end)
		);
	};
	
	getFullYear (this :LocalDateTime) :FullYear { return LocalDateTime.get(this, 0, 4); }
	setFullYear (this :LocalDateTime, value :FullYear) { return LocalDateTime.set(this, 0, 4, value); }
	getMonth (this :LocalDateTime) :Month { return LocalDateTime.get(this, 5, 7) - 1; }
	setMonth (this :LocalDateTime, value :Month) { return LocalDateTime.set(this, 5, 7, value + 1); }
	getDate (this :LocalDateTime) :Date { return LocalDateTime.get(this, 8, 10); }
	setDate (this :LocalDateTime, value :Date) { return LocalDateTime.set(this, 8, 10, value); }
	
	getHours (this :LocalDateTime) :Hours { return LocalDateTime.get(this, 11, 13); }
	setHours (this :LocalDateTime, value :Hours) { return LocalDateTime.set(this, 11, 13, value); }
	getMinutes (this :LocalDateTime) :Minutes { return LocalDateTime.get(this, 14, 16); }
	setMinutes (this :LocalDateTime, value :Minutes) { return LocalDateTime.set(this, 14, 16, value); }
	getSeconds (this :LocalDateTime) :Seconds { return LocalDateTime.get(this, 17, 19); }
	setSeconds (this :LocalDateTime, value :Seconds) { return LocalDateTime.set(this, 17, 19, value); }
	getMilliseconds (this :LocalDateTime) :Milliseconds { return +this.#value.slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (this :LocalDateTime, value :Milliseconds) {
		this.#value = Value(
			this.#ISOString = this.#ISOString.slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
}
//@ts-ignore
delete LocalDateTime.prototype.constructor;
freeze(LocalDateTime.prototype);
freeze(LocalDateTime);

export class LocalDate extends Datetime {
	
	#ISOString :string;
	#value :Value;
	
	valueOf (this :LocalDate) :Value { return this.#value; }
	toISOString (this :LocalDate) :string { return this.#ISOString; }
	
	constructor (literal :string) {
		LOCAL_DATE.test(literal) && leap(literal) || iterator$0.throws(SyntaxError(`Invalid Local Date ${literal}` + iterator$0.where(' at ')));
		super();
		this.#value = Value(
			this.#ISOString = literal
		);
		return this;
	}
	
	private static get = (that :LocalDate, start :number, end :number) => +that.#ISOString.slice(start, end);
	private static set = (that :LocalDate, start :number, end :number, value :number) => {
		that.#value = Value(
			that.#ISOString = that.#ISOString.slice(0, start) + ( '' + value ).padStart(end - start, '0') + that.#ISOString.slice(end)
		);
	};
	
	getFullYear (this :LocalDate) :FullYear { return LocalDate.get(this, 0, 4); }
	setFullYear (this :LocalDate, value :FullYear) { return LocalDate.set(this, 0, 4, value); }
	getMonth (this :LocalDate) :Month { return LocalDate.get(this, 5, 7) - 1; }
	setMonth (this :LocalDate, value :Month) { return LocalDate.set(this, 5, 7, value + 1); }
	getDate (this :LocalDate) :Date { return LocalDate.get(this, 8, 10); }
	setDate (this :LocalDate, value :Date) { return LocalDate.set(this, 8, 10, value); }
	
}
//@ts-ignore
delete LocalDate.prototype.constructor;
freeze(LocalDate.prototype);
freeze(LocalDate);

export class LocalTime extends Datetime {
	
	#ISOString :string;
	#value :Value;
	
	valueOf (this :LocalTime) :Value { return this.#value; }
	toISOString (this :LocalTime) :string { return this.#ISOString; }
	
	constructor (literal :string) {
		LOCAL_TIME.test(literal) || iterator$0.throws(SyntaxError(`Invalid Local Time ${literal}` + iterator$0.where(' at ')));
		super();
		this.#value = Value(
			this.#ISOString = literal
		);
		return this;
	}
	
	private static get = (that :LocalTime, start :number, end :number) => +that.#ISOString.slice(start, end);
	private static set = (that :LocalTime, start :number, end :number, value :number) => {
		that.#value = Value(
			that.#ISOString = that.#ISOString.slice(0, start) + ( '' + value ).padStart(2, '0') + that.#ISOString.slice(end)
		);
	};
	
	getHours (this :LocalTime) :Hours { return LocalTime.get(this, 0, 2); }
	setHours (this :LocalTime, value :Hours) { return LocalTime.set(this, 0, 2, value); }
	getMinutes (this :LocalTime) :Minutes { return LocalTime.get(this, 3, 5); }
	setMinutes (this :LocalTime, value :Minutes) { return LocalTime.set(this, 3, 5, value); }
	getSeconds (this :LocalTime) :Seconds { return LocalTime.get(this, 6, 8); }
	setSeconds (this :LocalTime, value :Seconds) { return LocalTime.set(this, 6, 8, value); }
	getMilliseconds (this :LocalTime) :Milliseconds { return +this.#value.slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (this :LocalTime, value :Milliseconds) {
		this.#value = Value(
			this.#ISOString = this.#ISOString.slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
}
//@ts-ignore
delete LocalTime.prototype.constructor;
freeze(LocalTime.prototype);
freeze(LocalTime);
