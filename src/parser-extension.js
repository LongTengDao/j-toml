import { Map, RegExp } from './global.js';
import { mark, must, throwError, throwSyntaxError, where } from './iterator.js';
import * as options from './options.js';
import { SingleLine } from './types-options.js';
import * as RE from './RE.js?<RegExp>';

export function assignInterpolationString (table, finalKey, delimiter) {
	options.enableInterpolationString || throwSyntaxError(where());
	RE.DELIMITER_CHECK.test(delimiter) && throwSyntaxError('Interpolation String opening tag incorrect at '+where());
	let string;
	let lineRest;
	{
		const literals = [];
		for ( const start = mark(); ; ) {
			const literal = must('Interpolation String', start);
			if ( literal.startsWith(delimiter) ) {
				lineRest = literal.slice(delimiter.length).replace(RE.PRE_WHITESPACE, '');
				break;
			}
			literals.push(literal);
		}
		string = literals.join('\n');
	}
	if ( lineRest.startsWith('(') ) {
		const interpolations_rest = RE.INTERPOLATIONS.exec(lineRest) || throwSyntaxError(where());
		lineRest = interpolations_rest[2];
		for ( const interpolation of interpolations_rest[1].match(RE.INTERPOLATION) ) {
			if ( RE.REGEXP_MODE.test(interpolation) ) {
				const { 1: pattern, 2: flags, 3: Replacer } = RE.PATTERN_FLAGS_REPLACER.exec(interpolation);
				const search = newRegExp(pattern, flags) || throwSyntaxError('Invalid regExp at '+where());
				let replacer;
				switch ( Replacer[0] ) {
					case "'":
						replacer = Replacer.slice(1, -1);
						break;
					case '"':
						replacer = SingleLine(Replacer.slice(1, -1));
						break;
					case '{':
						const map = newMap(Replacer, true);
						replacer = $0 => map.has($0) ? map.get($0) : $0;
						break;
					case '[':
						const { 1: whole, 2: subs } = RE.WHOLE_AND_SUBS.exec(Replacer);
						const maps = [null];
						for ( const sub of subs.match(RE.SUB) ) { maps.push(newMap(sub, true)); }
						replacer = (...args) => whole.replace(RE.DOLLAR, $n => {
							if ( $n==='$$' ) { return '$'; }
							const n = $n.slice(1);
							const arg = args[n] || '';
							const map = maps[n];
							return map && map.has(arg) ? map.get(arg) : arg;
						});
						break;
				}
				string = string.replace(search, replacer);
			}
			else {
				const map = newMap(interpolation, false);
				let round = '';
				outer: for ( let length = string.length, index = 0; index<length; ) {
					for ( const { 0: search, 1: replacer } of map ) {
						if ( string.startsWith(search, index) ) {
							round += replacer;
							index += search.length;
							continue outer;
						}
					}
					round += string[index];
					++index;
				}
				string = round;
			}
		}
	}
	table[finalKey] = string;
	return lineRest;
}

function newMap (interpolation, usedForRegExp) {
	const map = new Map;
	const tokens = interpolation.match(RE.INTERPOLATION_TOKEN);
	for ( let length = tokens.length, index = 0; index<length; ) {
		let search = tokens[index++];
		search = search[0]==="'" ? search.slice(1, -1) : SingleLine(search.slice(1, -1));
		usedForRegExp || search || throwSyntaxError('Characters to replace can not be empty, which was found at '+where());
		map.has(search) && throwSyntaxError('Duplicate '+( usedForRegExp ? 'replacer' : 'characters to replace' )+' at '+where());
		let replacer = tokens[index++];
		replacer = replacer[0]==="'" ? replacer.slice(1, -1) : SingleLine(replacer.slice(1, -1));
		map.set(search, replacer);
	}
	return map;
}

function newRegExp (pattern, flags) {
	try { return new RegExp(pattern, flags); }
	catch (error) { return null; }
}

export function ensureConstructor (type) {
	options.customConstructors || throwSyntaxError(where());
	options.FUNCTION.has(options.customConstructors) || type in options.customConstructors || throwError(where());
}

export function construct (type, value) {
	return options.FUNCTION.has(options.customConstructors) ? options.customConstructors(type, value) : options.customConstructors[type](value);
}
