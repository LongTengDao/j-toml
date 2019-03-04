import { Map, RegExp } from './global';
import * as iterator from './share/iterator';
import * as options from './share/options';
import { BasicString } from './types/String';
import * as RE from './share/RE';

export function assignInterpolationString (table :object, finalKey :string, delimiter :string) :string {
	options.enableInterpolationString || iterator.throwSyntaxError(iterator.where());
	RE.DELIMITER_CHECK.test(delimiter) && iterator.throwSyntaxError('Interpolation String opening tag incorrect at '+iterator.where());
	let string :string;
	let lineRest :string;
	{
		const literals :string[] = [];
		for ( const start :number = iterator.mark(); ; ) {
			const literal :string = iterator.must('Interpolation String', start);
			if ( literal.startsWith(delimiter) ) {
				lineRest = literal.slice(delimiter.length).replace(RE.PRE_WHITESPACE, '');
				break;
			}
			literals.push(literal);
		}
		string = literals.join('\n');
	}
	if ( lineRest.startsWith('(') ) {
		const interpolations_rest :RegExpExecArray = RE.INTERPOLATIONS.exec(lineRest) || iterator.throwSyntaxError(iterator.where());
		lineRest = interpolations_rest[2];
		for ( const interpolation of <RegExpMatchArray>interpolations_rest[1].match(RE.INTERPOLATION) ) {
			if ( RE.REGEXP_MODE.test(interpolation) ) {
				const { 1: pattern, 2: flags, 3: Replacer } :RegExpExecArray = <RegExpExecArray>RE.PATTERN_FLAGS_REPLACER.exec(interpolation);
				let search :RegExp;
				try { search = new RegExp(pattern, flags); }
				catch (error) { throw iterator.throwSyntaxError('Invalid regExp at '+iterator.where()); }
				let replacer;
				switch ( Replacer[0] ) {
					case '\'':
						replacer = <string>Replacer.slice(1, -1);
						break;
					case '"':
						replacer = <string>BasicString(Replacer.slice(1, -1));
						break;
					case '{':
						const map = newMap(Replacer, true);
						replacer = (match :string) :string => map.has(match) ? map.get(match) : match;
						break;
					case '[':
						const { 1: whole, 2: subs } :RegExpExecArray = <RegExpExecArray>RE.WHOLE_AND_SUBS.exec(Replacer);
						const maps = [null];
						for ( const sub of <RegExpMatchArray>subs.match(RE.SUB) ) { maps.push(newMap(sub, true)); }
						replacer = (...args :any[]) :string => whole.replace(RE.DOLLAR, ($n :string) :string => {
							if ( $n==='$$' ) { return '$'; }
							const n :string = $n.slice(1);
							const arg :string = args[n] || '';
							const map = maps[n];
							return map && map.has(arg) ? map.get(arg) : arg;
						});
						break;
				}
				string = string.replace(search, replacer);
			}
			else {
				const map = newMap(interpolation, false);
				let round :string = '';
				outer: for ( let length :number = string.length, index = 0; index<length; ) {
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

function newMap (interpolation :string, usedForRegExp :boolean) {
	const map = new Map;
	const tokens :RegExpMatchArray = <RegExpMatchArray>interpolation.match(RE.INTERPOLATION_TOKEN);
	for ( let length :number = tokens.length, index = 0; index<length; ) {
		let search :string = tokens[index++];
		search = search[0]==='\'' ? search.slice(1, -1) : BasicString(search.slice(1, -1));
		usedForRegExp
		|| search
		|| iterator.throwSyntaxError('Characters to replace can not be empty, which was found at '+iterator.where());
		map.has(search)
		&& iterator.throwSyntaxError('Duplicate '+( usedForRegExp ? 'replacer' : 'characters to replace' )+' at '+iterator.where());
		let replacer :string = tokens[index++];
		replacer = replacer[0]==='\'' ? replacer.slice(1, -1) : BasicString(replacer.slice(1, -1));
		map.set(search, replacer);
	}
	return map;
}

export function ensureConstructor (type :string) :void {
	options.customConstructors
	|| iterator.throwSyntaxError(iterator.where());
	options.FUNCTION.has(<Function | object>options.customConstructors)
	|| type in <object>options.customConstructors
	|| iterator.throwError(iterator.where());
}

export function construct (type :string, value :any) :any {
	return options.FUNCTION.has(options.customConstructors)
		? ( <Function>options.customConstructors )(type, value)
		: ( <object>options.customConstructors )[type](value);
}
