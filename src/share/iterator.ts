import SyntaxError from '.SyntaxError';
import Error from '.Error';
//import * as options from './options';
import * as RE from './RE';


const NONE :string[] = [];
let sourceLines :string[] = NONE;
let lastLineIndex :number = -1;
let lineIndex :number = -1;

function noop (lineRest :string) :string { return ''; }
noop.previous = noop;

export let stacks_length = 0;
let last :typeof noop = noop;


export function from (source :string) :void {
	if ( sourceLines!==NONE ) { throw Error('Inner error: parsing in parsing.'); }
	if ( RE.NON_SCALAR.test(source) ) { throw Error('toml doc must be a (ful-scalar) valid utf8 file.'); }
	sourceLines = source.replace(RE.BOM, '').split(RE.EOL);
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
	&& throws(new SyntaxError(message+' is not close until the end of the file, which started from line '+( startIndex+1 )+': '+sourceLines[startIndex]));
	return sourceLines[++lineIndex];
}

export const where = () :string => 'line '+( lineIndex+1 )+': '+sourceLines[lineIndex];

export function done () :void {
	sourceLines = NONE;
	last = noop;
}


export function stacks_pop () :typeof noop {
	const item :typeof noop = last;
	last = last.previous;
	--stacks_length;
	return item;
}

export function stacks_push (item :typeof noop) :void {
	item.previous = last;
	last = item;
	++stacks_length;
}

export function stacks_insertBeforeLast (item :typeof noop) {
	item.previous = last.previous;
	last.previous = item;
	++stacks_length;
}


export function throws (error :FriendlyError) :never {
	if ( sourceLines!==NONE ) {
		error.lineIndex = lineIndex;
		error.lineNumber = lineIndex+1;
		//done();
		//options.clear();
	}
	throw error;
}

declare class FriendlyError extends Error {
	lineIndex? :number;
	lineNumber? :number;
}
