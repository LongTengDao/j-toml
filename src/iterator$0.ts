import Error from '.Error';
import SyntaxError from '.SyntaxError';

//import * as options\$0 from './options\$0';

const NONE :Array<string> = [];
let sourceLines :Array<string> = NONE;
let lastLineIndex :number = -1;
let lineIndex :number = -1;

interface ErrorThrown extends Error {
	lineIndex? :number
	lineNumber? :number
}
export const throws :(error :ErrorThrown) => never = (error :ErrorThrown) :never => {
	if ( sourceLines!==NONE ) {
		//done();
		//options\$0.clear();
		//error.stack = error.stack!.replace('\n', `\n    at (*.toml:${lineIndex+1}:0)\n@*.toml:${lineIndex+1}\n`);
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
	}
	throw error;
};

const previous = Symbol('previous');
type Noop = {
	(lineRest :string) :string
	[previous]? :Noop
};
const noop :Noop = () :string => '';
noop[previous] = noop;

export let stacks_length = 0;
let last :Noop = noop;

export const could = () :void => {
	if ( sourceLines!==NONE ) { throw Error('Internal error: parsing during parsing.'); }
};

const EOL = /\r?\n/;
export const todo = (source :string) :void => {
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
	stacks_length = 0;
	last = noop;
};

export const next = () :string => sourceLines[++lineIndex]!;

export const rest = () :boolean => lineIndex!==lastLineIndex;

export const mark = () :number => lineIndex;

export const must = (message :string, startIndex :number) :string => {
	lineIndex===lastLineIndex && throws(SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]));
	return sourceLines[++lineIndex]!;
};

export const where = () :string => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

export const done = () :void => {
	sourceLines = NONE;
	last = noop;
};

export const stacks_pop = () :Noop => {
	const item :Noop = last;
	last = last[previous]!;
	--stacks_length;
	return item;
};

export const stacks_push = (item :Noop) :void => {
	item[previous] = last;
	last = item;
	++stacks_length;
};

export const stacks_insertBeforeLast = (item :Noop) :void => {
	item[previous] = last[previous];
	last[previous] = item;
	++stacks_length;
};
