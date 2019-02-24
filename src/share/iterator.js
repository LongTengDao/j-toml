import { SyntaxError, RangeError, TypeError, Error } from '../global.js';

const NONE = [];
let sourceLines = NONE;
let lastLineIndex = -1;
let lineIndex = -1;

export const from = array => {
	sourceLines = array;
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
};

export const done = () => { sourceLines = NONE; };

export const next = () => sourceLines[++lineIndex];

export const rest = () => lineIndex!==lastLineIndex;

export const mark = () => lineIndex;

export const must = (message, startIndex) => {
	if ( lineIndex===lastLineIndex ) {
		const error = new SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]);
		error.lineIndex = lineIndex;
		//done();
		throw error;
	}
	return sourceLines[++lineIndex];
};

export const where = () => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

export const throwSyntaxError = message => throws(new SyntaxError(message));

export const throwRangeError = message => throws(new RangeError(message));

export const throwTypeError = message => throws(new TypeError(message));

export const throwError = message => throws(new Error(message));

function throws (error) {
	if ( sourceLines!==NONE ) {
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
		//done();
	}
	throw error;
}
