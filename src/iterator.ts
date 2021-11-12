import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';

//import * as options from './options';

const NONE :ArrayLike<string> = [];
let sourcePath :string = '';
let sourceLines :ArrayLike<string> = NONE;
let lastLineIndex :number = -1;
export let lineIndex :number = -1;

export const throws = (error :Error) :never => {
	//if ( sourceLines!==NONE ) { done(); options.clear(); }
	throw error;
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

export class mark {
	private readonly lineIndex = lineIndex;
	private readonly type :'Static Array' | 'Inline Table' | 'Multi-line Literal String' | 'Multi-line Basic String';
	private readonly restColumn :number;
	constructor (type :'Static Array' | 'Inline Table' | 'Multi-line Literal String' | 'Multi-line Basic String', restColumn :number) {
		this.type = type;
		this.restColumn = restColumn;
		return this;
	}
	must (this :mark) :string {
		lineIndex===lastLineIndex && throws(SyntaxError(`${this.type} is not close until the end of the file` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex]!.length - this.restColumn + 1)));
		return sourceLines[++lineIndex]!;
	}
	nowrap (this :mark) :never {
		throw throws(Error(`TOML.parse(,,multilineStringJoiner) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex]!.length - this.restColumn + 1)));
	}
};

export const where = (pre :string, rowIndex :number = lineIndex, columnNumber :number = 0) :string => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${rowIndex + 1}:${columnNumber})`
		: `${pre}line ${rowIndex + 1}: ${sourceLines[rowIndex]}`;

export const done = () :void => {
	sourcePath = '';
	sourceLines = NONE;
};
