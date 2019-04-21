import SyntaxError from '.SyntaxError';
import Error from '.Error';
//import * as options\$0 from './options\$0';


const NONE :string[] = [];
let sourceLines :string[] = NONE;
let lastLineIndex :number = -1;
let lineIndex :number = -1;

type noop = {
	(lineRest :string) :string
	previous? :noop
};
function noop (lineRest :string) :string { return ''; }
noop.previous = noop;

export let stacks_length = 0;
let last :noop = noop;


export function could () :void {
	if ( sourceLines!==NONE ) { throw Error('Inner error: parsing in parsing.'); }
}

const EOL = /\r?\n/;
export function todo (source :string) :void {
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length-1;
	lineIndex = -1;
	stacks_length = 0;
	last = noop;
}

export const next = () :string => sourceLines[++lineIndex];

export const rest = () :boolean => lineIndex!==lastLineIndex;

export const mark = () :number => lineIndex;

export function must (message :string, startIndex :number) :string {
	lineIndex===lastLineIndex
	&& throws(SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]));
	return sourceLines[++lineIndex];
}

export const where = () :string => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

export function done () :void {
	sourceLines = NONE;
	last = noop;
}


export function stacks_pop () :noop {
	const item :noop = last;
	last = <noop>last.previous;
	--stacks_length;
	return item;
}

export function stacks_push (item :noop) :void {
	item.previous = last;
	last = item;
	++stacks_length;
}

export function stacks_insertBeforeLast (item :noop) {
	item.previous = last.previous;
	last.previous = item;
	++stacks_length;
}


export function throws (error :FriendlyError) :never {
	if ( sourceLines!==NONE ) {
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
		//done();
		//options\$0.clear();
	}
	throw error;
}

declare class FriendlyError extends Error {
	lineIndex? :number;
	lineNumber? :number;
}
