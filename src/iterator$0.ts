import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import WeakMap from '.WeakMap';
import get from '.WeakMap.prototype.get';
import set from '.WeakMap.prototype.set';

//import * as options\$0 from './options\$0';

const NONE :ArrayLike<string> = [];
let sourcePath :string = '';
let sourceLines :ArrayLike<string> = NONE;
let lastLineIndex :number = -1;
export let lineIndex :number = -1;

interface ErrorThrown extends Error {
	lineIndex? :number
	lineNumber? :number
}
export const throws :(error :ErrorThrown) => never = (error :ErrorThrown) :never => {
	//if ( sourceLines!==NONE ) { done(); options\$0.clear(); }
	throw error;
};

const previous = new WeakMap<Noop, Noop>();
const previous_get = /*#__PURE__*/get.bind(previous) as (key :Noop) => Noop;
const previous_set = /*#__PURE__*/set.bind(previous);
type Noop = (lineRest :string) => string;
const noop :Noop = /*#__PURE__*/( () => {
	const noop :Noop = () :string => '';
	previous_set(noop, noop);
	return noop;
} )();

export let stacks_length = 0;
let last :Noop = noop;

export const could = () :void => {
	if ( sourceLines!==NONE ) { throw Error('Internal error: parsing during parsing.'); }
};

const EOL = /\r?\n/;
export const todo = (source :string, path :string) :void => {
	if ( typeof path!=='string' ) { throw TypeError('TOML.parse(,,,,sourcePath)'); }
	sourcePath = path;
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length - 1;
	lineIndex = -1;
	stacks_length = 0;
	last = noop;
};

export const next = () :string => sourceLines[++lineIndex]!;

export const rest = () :boolean => lineIndex!==lastLineIndex;

export const mark = (type :string) => ( { type, lineIndex } );

export const must = (marker :{ type :string, lineIndex :number }) :string => {
	lineIndex===lastLineIndex && throws(SyntaxError(`${marker.type} is not close until the end of the file` + where(', which started from ', marker.lineIndex)));
	return sourceLines[++lineIndex]!;
};

export const where = (pre :string, index :number = lineIndex) :string => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${index + 1}:1)`
		: `${pre}line ${index + 1}: ${sourceLines[index]}`;

export const done = () :void => {
	sourcePath = '';
	sourceLines = NONE;
	last = noop;
};

export const stacks_pop = () :Noop => {
	const item :Noop = last;
	last = previous_get(last);
	--stacks_length;
	return item;
};

export const stacks_push = (item :Noop) :void => {
	previous_set(item, last);
	last = item;
	++stacks_length;
};

export const stacks_insertBeforeLast = (item :Noop) :void => {
	previous_set(item, previous_get(last));
	previous_set(last, item);
	++stacks_length;
};
