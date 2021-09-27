import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';

//import * as options\$0 from './options\$0';

const NONE :ArrayLike<string> = [];
let sourcePath :string = '';
let sourceLines :ArrayLike<string> = NONE;
let lastLineIndex :number = -1;
export let lineIndex :number = -1;

export const throws = (error :Error) :never => {
	//if ( sourceLines!==NONE ) { done(); options\$0.clear(); }
	throw error;
};

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
};
