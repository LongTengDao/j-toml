import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import NativeDate from '.Date';
import parse from '.Date.parse';
import ownKeys from '.Reflect.ownKeys';
///import is from '.Object.is';
import create from '.Object.create';
import preventExtensions from '.Object.preventExtensions';
import freeze from '.Object.freeze';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import defineProperties from '.null.defineProperties';
import Null from '.null';

import { newRegExp, theRegExp } from '@ltd/j-regexp';

import * as options from '../options';
import * as iterator from '../iterator';

const fpc = <T extends Function> (c :T) :T => {
	freeze(freeze(c).prototype);
	return c;
};

const _29_ = /(?:0[1-9]|1\d|2\d)/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = /*#__PURE__*/( () => newRegExp`
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
	)
` )();

const HMS = /*#__PURE__*/( () => newRegExp`
	${_23_}:${_59_}:${_59_}
` )();

export const OFFSET$ = /(?:Z|[+-]\d\d:\d\d)$/;

const Z_exec = /*#__PURE__*/( () => theRegExp<1 | 2 | 3>(/(([+-])\d\d):(\d\d)$/).exec )();

const OFFSET_DATETIME_exec = /*#__PURE__*/( () => newRegExp<1>`
	^
	${YMD}
	[T ]
	${HMS}
	(?:\.\d{1,3}(\d*?)0*)?
	(?:Z|[+-]${_23_}:${_59_})
	$`.exec )();

const OFFSET_DATETIME_ZERO_exec = /*#__PURE__*/( () => newRegExp<1>`
	^
	${YMD}
	[T ]
	${HMS}
	()
	Z
	$`.exec )();

const IS_LOCAL_DATETIME = /*#__PURE__*/( () => newRegExp`
	^
	${YMD}
	[T ]
	${HMS}
	(?:\.\d+)?
	$`.test )();

const IS_LOCAL_DATE = /*#__PURE__*/( () => newRegExp`
	^
	${YMD}
	$`.test )();

const IS_LOCAL_TIME = /*#__PURE__*/( () => newRegExp`
	^
	${HMS}
	(?:\.\d+)?
	$`.test )();

const DOT_ZERO = /\.?0+$/;
const DELIMITER_DOT = /[-T:.]/g;
const ZERO = /\.(\d*?)0+$/;
const zeroReplacer = (match :string, p1 :string) => p1;

const Datetime = /*#__PURE__*/( () => {
	const Datetime = function (this :object) {
		return this;
	} as unknown as { new () :object };//expression? :undefined, literal? :undefined, dotValue? :undefined
	//                                > .setTime()
	//                                > .getTime() : Date.parse('T')
	// [Symbol.toPrimitive]('number') > .valueOf()
	//                                > .toISOString()
	const descriptors = Null(null) as { [Key in keyof NativeDate] :object };
	{
		const descriptor = Null(null);
		for ( const key of ownKeys(NativeDate.prototype as NativeDate & { constructor :unknown }) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(create(NativeDate.prototype, descriptors));
	return freeze(Datetime);
} )();

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

const Value = (ISOString :string) :Value => ISOString.replace(ZERO, zeroReplacer).replace(DELIMITER_DOT, '');

const leap = (literal :string) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE :NativeDate = /*#__PURE__*/defineProperties(new NativeDate(0), /*#__PURE__*/getOwnPropertyDescriptors(NativeDate.prototype));

const OffsetDateTime_ISOString = Symbol('OffsetDateTime_ISOString');
const OffsetDateTime_value = Symbol('OffsetDateTime_value');
const OffsetDateTime_use = (that :InstanceType<typeof OffsetDateTime>, $ :number = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
};
/*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number) => {
	if ( end ) {
		const string = '' + value;
		const size = end - start;
		if ( string.length>size ) { throw RangeError(); }///
		that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[OffsetDateTime_ISOString].slice(end);
	}
	const time = parse(that[OffsetDateTime_ISOString]);
	return that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);///time
};*///
export const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString] :string;
	[OffsetDateTime_value] :Value;
	
	override valueOf (this :OffsetDateTime) :Value { return this[OffsetDateTime_value]; }
	toISOString (this :OffsetDateTime) :string { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal :string) {
		const { 1: more } = leap(literal) && ( options.zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || iterator.throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + iterator.where(' at ')));
		super();
		this[OffsetDateTime_ISOString] = literal.replace(' ', 'T');
		this[OffsetDateTime_value] = ( '' + parse(this[OffsetDateTime_ISOString]) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	getUTCFullYear (this :OffsetDateTime) :FullYear { return OffsetDateTime_use(this).getUTCFullYear(); }
	///get year () :FullYear { return OffsetDateTime_get(this, 0, 4); }
	///set year (value :FullYear) { OffsetDateTime_set(this, 0, 4, value); }
	getUTCMonth (this :OffsetDateTime) :Month { return OffsetDateTime_use(this).getUTCMonth(); }
	///get month () { return OffsetDateTime_get(this, 5, 7); }
	///set month (value) { OffsetDateTime_set(this, 5, 7, value); }
	getUTCDate (this :OffsetDateTime) :Date { return OffsetDateTime_use(this).getUTCDate(); }
	///get day () :Date { return OffsetDateTime_get(this, 8, 10); }
	///set day (value :Date) { OffsetDateTime_set(this, 8, 10, value); }
	
	getUTCHours (this :OffsetDateTime) :Hours { return OffsetDateTime_use(this).getUTCHours(); }
	///get hour () :Hours { return OffsetDateTime_get(this, 11, 13); }
	///set hour (value :Hours) { OffsetDateTime_set(this, 11, 13, value); }
	getUTCMinutes (this :OffsetDateTime) :Minutes { return OffsetDateTime_use(this).getUTCMinutes(); }
	///get minute () :Minutes { return OffsetDateTime_get(this, 14, 16); }
	///set minute (value :Minutes) { OffsetDateTime_set(this, 14, 16, value); }
	getUTCSeconds (this :OffsetDateTime) :Seconds { return OffsetDateTime_use(this).getUTCSeconds(); }
	///get second () :Seconds { return OffsetDateTime_get(this, 17, 19); }
	///set second (value :Seconds) { OffsetDateTime_set(this, 17, 19, value); }
	getUTCMilliseconds (this :OffsetDateTime) :Milliseconds { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	///get millisecond () :Milliseconds { return +this[OffsetDateTime_value].slice(12, 15); }///
	/*set millisecond (value :Milliseconds) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		OffsetDateTime_set(this, 0, 0, 0);
	}*///
	///get microsecond () :Milliseconds
	///set microsecond (value :Milliseconds)
	///get nanosecond () :Milliseconds
	///set nanosecond (value :Milliseconds)
	
	getUTCDay (this :OffsetDateTime) :Day { return OffsetDateTime_use(this).getUTCDay(); }
	///get dayOfWeek () { return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay() || 7; }
	getTimezoneOffset (this :OffsetDateTime) :TimezoneOffset {
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	///get offset () { return this[OffsetDateTime_ISOString].endsWith('Z') ? 'Z' : this[OffsetDateTime_ISOString].slice(-6); }
	/*set offset (value) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, this[OffsetDateTime_ISOString].endsWith('Z') ? -1 : -6) + value;
		OffsetDateTime_set(this, 0, 0, 0);
	}*///
	getTime (this :OffsetDateTime) :Time { return +this[OffsetDateTime_value].slice(0, 15); }///
	/*setTime (this :OffsetDateTime, value :Time) :void {
		value = DATE.setTime(value);
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this[OffsetDateTime_value] = ( '' + value ).padStart(15, '0');
		///return value;
	}*/
	
});

const LocalDateTime_ISOString = Symbol('LocalDateTime_ISOString');
const LocalDateTime_value = Symbol('LocalDateTime_value');
const LocalDateTime_get = (that :InstanceType<typeof LocalDateTime>, start :number, end :number) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that :InstanceType<typeof LocalDateTime>, start :number, end :number, value :number) :void => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
export const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString] :string;
	[LocalDateTime_value] :Value;
	
	override valueOf (this :LocalDateTime) :Value { return this[LocalDateTime_value]; }
	toISOString (this :LocalDateTime) :string { return this[LocalDateTime_ISOString]; }
	
	constructor (literal :string) {
		IS_LOCAL_DATETIME(literal) && leap(literal) || iterator.throws(SyntaxError(`Invalid Local Date-Time ${literal}` + iterator.where(' at ')));
		super();
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = literal.replace(' ', 'T')
		);
		return this;
	}
	
	getFullYear (this :LocalDateTime) :FullYear { return LocalDateTime_get(this, 0, 4); }
	setFullYear (this :LocalDateTime, value :FullYear) :void { LocalDateTime_set(this, 0, 4, value); }
	getMonth (this :LocalDateTime) :Month { return LocalDateTime_get(this, 5, 7) - 1; }
	setMonth (this :LocalDateTime, value :Month) :void { LocalDateTime_set(this, 5, 7, value + 1); }
	getDate (this :LocalDateTime) :Date { return LocalDateTime_get(this, 8, 10); }
	setDate (this :LocalDateTime, value :Date) :void { LocalDateTime_set(this, 8, 10, value); }
	
	getHours (this :LocalDateTime) :Hours { return LocalDateTime_get(this, 11, 13); }
	setHours (this :LocalDateTime, value :Hours) :void { LocalDateTime_set(this, 11, 13, value); }
	getMinutes (this :LocalDateTime) :Minutes { return LocalDateTime_get(this, 14, 16); }
	setMinutes (this :LocalDateTime, value :Minutes) :void { LocalDateTime_set(this, 14, 16, value); }
	getSeconds (this :LocalDateTime) :Seconds { return LocalDateTime_get(this, 17, 19); }
	setSeconds (this :LocalDateTime, value :Seconds) :void { LocalDateTime_set(this, 17, 19, value); }
	getMilliseconds (this :LocalDateTime) :Milliseconds { return +this[LocalDateTime_value].slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (this :LocalDateTime, value :Milliseconds) :void {
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = this[LocalDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const LocalDate_ISOString = Symbol('LocalDate_ISOString');
const LocalDate_value = Symbol('LocalDate_value');
const LocalDate_get = (that :InstanceType<typeof LocalDate>, start :number, end :number) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that :InstanceType<typeof LocalDate>, start :number, end :number, value :number) :void => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDate_ISOString].slice(end)
	);
};
export const LocalDate = /*#__PURE__*/fpc(class LocalDate extends Datetime {
	
	[LocalDate_ISOString] :string;
	[LocalDate_value] :Value;
	
	override valueOf (this :LocalDate) :Value { return this[LocalDate_value]; }
	toISOString (this :LocalDate) :string { return this[LocalDate_ISOString]; }
	
	constructor (literal :string) {
		IS_LOCAL_DATE(literal) && leap(literal) || iterator.throws(SyntaxError(`Invalid Local Date ${literal}` + iterator.where(' at ')));
		super();
		this[LocalDate_value] = Value(
			this[LocalDate_ISOString] = literal
		);
		return this;
	}
	
	getFullYear (this :LocalDate) :FullYear { return LocalDate_get(this, 0, 4); }
	setFullYear (this :LocalDate, value :FullYear) :void { LocalDate_set(this, 0, 4, value); }
	getMonth (this :LocalDate) :Month { return LocalDate_get(this, 5, 7) - 1; }
	setMonth (this :LocalDate, value :Month) :void { LocalDate_set(this, 5, 7, value + 1); }
	getDate (this :LocalDate) :Date { return LocalDate_get(this, 8, 10); }
	setDate (this :LocalDate, value :Date) :void { LocalDate_set(this, 8, 10, value); }
	
});

const LocalTime_ISOString = Symbol('LocalTime_ISOString');
const LocalTime_value = Symbol('LocalTime_value');
const LocalTime_get = (that :InstanceType<typeof LocalTime>, start :number, end :number) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that :InstanceType<typeof LocalTime>, start :number, end :number, value :number) :void => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + string.padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
};
export const LocalTime = /*#__PURE__*/fpc(class LocalTime extends Datetime {
	
	[LocalTime_ISOString] :string;
	[LocalTime_value] :Value;
	
	override valueOf (this :LocalTime) :Value { return this[LocalTime_value]; }
	toISOString (this :LocalTime) :string { return this[LocalTime_ISOString]; }
	
	constructor (literal :string) {
		IS_LOCAL_TIME(literal) || iterator.throws(SyntaxError(`Invalid Local Time ${literal}` + iterator.where(' at ')));
		super();
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = literal
		);
		return this;
	}
	
	getHours (this :LocalTime) :Hours { return LocalTime_get(this, 0, 2); }
	setHours (this :LocalTime, value :Hours) :void { LocalTime_set(this, 0, 2, value); }
	getMinutes (this :LocalTime) :Minutes { return LocalTime_get(this, 3, 5); }
	setMinutes (this :LocalTime, value :Minutes) :void { LocalTime_set(this, 3, 5, value); }
	getSeconds (this :LocalTime) :Seconds { return LocalTime_get(this, 6, 8); }
	setSeconds (this :LocalTime, value :Seconds) :void { LocalTime_set(this, 6, 8, value); }
	getMilliseconds (this :LocalTime) :Milliseconds { return +this[LocalTime_value].slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (this :LocalTime, value :Milliseconds) :void {
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = this[LocalTime_ISOString].slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});
