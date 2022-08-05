import Error from '.Error';
import TypeError from '.TypeError';
import TextDecoder from '.TextDecoder';
import isView from '.ArrayBuffer.isView';
import isArrayBuffer from '.class.isArrayBuffer';

export const isArrayBufferLike = (value :object) :value is ArrayBuffer => 'byteLength' in value;///

const textDecoder = /*#__PURE__*/new TextDecoder('utf-8', { fatal: true, ignoreBOM: false });
export const arrayBufferLike2string :(this :void, value :ArrayBuffer) => string = (arrayBufferLike :Uint8Array | ArrayBuffer) :string => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error('A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.'); }
};
