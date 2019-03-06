import SyntaxError from '.SyntaxError';
import RangeError from '.RangeError';
import TypeError from '.TypeError';
import Error from '.Error';

const NONE :string[] = [];
let sourceLines :string[] = NONE;
let lastLineIndex :number = -1;
let lineIndex :number = -1;

export const from = (array :string[]) :void => {
	sourceLines = array;
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
};

export const done = () :void => { sourceLines = NONE; };

export const next = () :string => sourceLines[++lineIndex];

export const rest = () :boolean => lineIndex!==lastLineIndex;

export const mark = () :number => lineIndex;

declare class FriendlyError extends Error {
	lineIndex? :number;
	lineNumber? :number;
}

export const must = (message :string, startIndex :number) :string => {
	lineIndex===lastLineIndex
	&& throws(new SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]));
	return sourceLines[++lineIndex];
};

export const where = () :string => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

export const throwSyntaxError = (message :string) :never => throws(new SyntaxError(message));

export const throwRangeError = (message :string) :never => throws(new RangeError(message));

export const throwTypeError = (message :string) :never => throws(new TypeError(message));

export const throwError = (message :string) :never => throws(new Error(message));

function throws (error :FriendlyError) :never {
	if ( sourceLines!==NONE ) {
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
		//done();
	}
	throw error;
}
