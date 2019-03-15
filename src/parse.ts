import TypeError from '.TypeError';
import Infinity from '.Infinity';
import NaN from '.NaN';
import Symbol_for from '.Symbol.for';
import isBuffer from '.Buffer.isBuffer';
import Symbol from '.Symbol';
import * as iterator from './share/iterator';
import { Datetime } from './types/Datetime';
import { Float } from './types/Float';
import * as options from './share/options';
import * as RE from './share/RE';
import { assignInterpolationString, ensureConstructor, construct } from './parse+';
import { sealedInline, appendTable, parseKeys, prepareInlineTable, assignLiteralString, assignBasicString } from './parse-share';

export default function parse (
	sourceContent :string | Buffer,
	specificationVersion :0.5,
	useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines :string,
	useBigInt_forInteger? :boolean | number = true,
	extensionOptions?                       = null
) :object {
	if ( typeof sourceContent!=='string' ) {
		if ( !isBuffer(sourceContent) ) { throw new TypeError('TOML.parse(sourceContent)'); }
		sourceContent = sourceContent.toString();
	}
	options.use(specificationVersion, useWhatToJoinMultiLineString_notUsingForSplitTheSourceLines, useBigInt_forInteger, extensionOptions);
	const rootTable :object = new options.TableDepends;
	iterator.from(sourceContent.replace(RE.BOM, '').split(RE.EOL));
	let lastSectionTable :object = rootTable;
	while ( iterator.rest() ) {
		const line :string = iterator.next().replace(RE.PRE_WHITESPACE, '');
		if ( line==='' ) { }
		else if ( line.startsWith('#') ) {
			if ( options.keepComment ) { lastSectionTable[Symbol('#')] = line.slice(1); }
		}
		else if ( line.startsWith('[') ) {
			const { 1: $_asArrayItem$$, 2: keys, 3: $$asArrayItem$_, 4: hash } = RE.TABLE_DEFINITION_exec(line);
			$_asArrayItem$$===$$asArrayItem$_ || iterator.throwSyntaxError('Square brackets of table define statement not match at '+iterator.where());
			lastSectionTable = appendTable(rootTable, keys, $_asArrayItem$$, hash);
		}
		else {
			const $_assignInline_pushInline = true;
			let rest :string = setInline($_assignInline_pushInline, lastSectionTable, line);
			while ( iterator.stacks_length ) { rest = iterator.stacks_pop()(rest); }
			if ( rest==='' ) { }
			else if ( rest.startsWith('#') ) {
				if ( options.keepComment ) { lastSectionTable[Symbol('#')] = rest.slice(1); }
			}
			else { iterator.throwSyntaxError(iterator.where()); }
		}
	}
	iterator.done();
	options.clear();
	return rootTable;
};

function setInline ($_assignInline_pushInline :boolean, lastInlineTable_array :object | any[], lineRest :string) :string {
	let $_assignInlineTable_assignInlineArray = false;
	if ( $_assignInline_pushInline ) {
		const { 1: left, 2: custom, 3: type, 4: right } = RE.KEY_VALUE_PAIR_exec(lineRest);
		custom && ensureConstructor(<string>type);
		const leadingKeys :string[] = parseKeys(left);
		const finalKey :string = leadingKeys.pop();
		const table :object = prepareInlineTable(lastInlineTable_array, leadingKeys);
		finalKey in table && iterator.throwError('Duplicate property definition at '+iterator.where());
		switch ( right[0] ) {
			case '\'':
				lineRest = assignLiteralString(table, finalKey, right);
				break;
			case '"':
				lineRest = assignBasicString(table, finalKey, right);
				break;
			case '`':
				lineRest = assignInterpolationString(table, finalKey, right);
				break;
			default:
				let literal :string;
				( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(right) || iterator.throwSyntaxError(iterator.where()) );
				table[finalKey] =
					literal==='true' ? true : literal==='false' ? false :
						literal==='inf' || literal==='+inf' ? Infinity : literal==='-inf' ? -Infinity :
							literal==='nan' || literal==='+nan' || literal==='-nan' ? NaN :
								literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ? new Datetime(literal) :
									literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ? Float(literal) :
										options.enableNull && literal==='null' || options.enableNil && literal==='nil' ? null :
											options.IntegerDepends(literal);
				break;
			case '{':
				$_assignInlineTable_assignInlineArray = true;
			case '[':
				iterator.stacks_push((lineRest) => {
					lineRest = assignInlineLevel($_assignInlineTable_assignInlineArray, table, finalKey, lineRest);
					//
					if ( custom ) { table[finalKey] = construct(type, table[finalKey]); }//
					if ( options.keepComment && lineRest.startsWith('#') ) {//
						table[Symbol_for(finalKey)] = lineRest.slice(1);//
						return '';//
					}//
					return lineRest;//
					//
				});
				return right;
		}
		if ( custom ) { table[finalKey] = construct(type, table[finalKey]); }
		if ( options.keepComment && lineRest.startsWith('#') ) {
			table[Symbol_for(finalKey)] = lineRest.slice(1);
			return '';
		}
		return lineRest;
	}
	else {
		const custom = lineRest.startsWith('!!');
		let type :string;
		if ( custom ) {
			//options.typify && iterator.throwSyntaxError('Only mixable arrays could contain custom type. Check '+iterator.where());
			( { 1: type, 2: lineRest } = RE._VALUE_PAIR.exec(lineRest) || iterator.throwSyntaxError(iterator.where()) );
			ensureConstructor(type);
		}
		const lastIndex :string = ''+lastInlineTable_array.length;
		switch ( lineRest[0] ) {
			case '\'':
				lineRest = assignLiteralString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
				break;
			case '"':
				lineRest = assignBasicString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
				break;
			case '`':
				lineRest = assignInterpolationString(options.asStrings(lastInlineTable_array), lastIndex, lineRest);
				break;
			default:
				let literal :string;
				( { 1: literal, 2: lineRest } = RE.VALUE_REST.exec(lineRest) || iterator.throwSyntaxError(iterator.where()) );
				if ( literal==='true' ) { options.asBooleans(lastInlineTable_array).push(true); }
				else if ( literal==='false' ) { options.asBooleans(lastInlineTable_array).push(false); }
				else if ( literal==='inf' || literal==='+inf' ) { options.asFloats(lastInlineTable_array).push(Infinity); }
				else if ( literal==='-inf' ) { options.asFloats(lastInlineTable_array).push(-Infinity); }
				else if ( literal==='nan' || literal==='+nan' || literal==='-nan' ) { options.asFloats(lastInlineTable_array).push(NaN); }
				else if ( literal.includes(':') || literal.indexOf('-')!==literal.lastIndexOf('-') && !literal.startsWith('-') ) {
					options.asDatetimes(lastInlineTable_array).push(new Datetime(literal));
				}
				else if ( literal.includes('.') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x') ) {
					options.asFloats(lastInlineTable_array).push(Float(literal));
				}
				else if ( options.enableNull && literal==='null' || options.enableNil && literal==='nil' ) {
					options.asNulls(lastInlineTable_array).push(null);
				}
				else { options.asIntegers(lastInlineTable_array).push(options.IntegerDepends(literal)); }
				break;
			case '{':
				$_assignInlineTable_assignInlineArray = true;
			case '[':
				iterator.stacks_push((lineRest) => {
					lineRest = assignInlineLevel($_assignInlineTable_assignInlineArray, options.asArrays(lastInlineTable_array), lastIndex, lineRest);
					//
					if ( custom ) { lastInlineTable_array[lastIndex] = construct(type, lastInlineTable_array[lastIndex]); }//
					if ( options.keepComment && lineRest.startsWith('#') ) {//
						lastInlineTable_array[Symbol_for(lastIndex)] = lineRest.slice(1);//
						return '';//
					}//
					return lineRest;//
					//
				});
				return lineRest;
		}
		if ( custom ) { lastInlineTable_array[lastIndex] = construct(type, lastInlineTable_array[lastIndex]); }
		if ( options.keepComment && lineRest.startsWith('#') ) {
			lastInlineTable_array[Symbol_for(lastIndex)] = lineRest.slice(1);
			return '';
		}
		return lineRest;
	}
}

function assignInlineLevel ($_assignInlineTable_assignInlineArray :boolean, table :object, finalKey :string, lineRest :string) :string {
	const $_assignInline_pushInline = $_assignInlineTable_assignInlineArray;
	if ( $_assignInlineTable_assignInlineArray ) {
		const inlineTable :object = table[finalKey] = new options.TableDepends;
		sealedInline.add(inlineTable);
		lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
		if ( options.allowInlineTableMultiLineAndTrailingCommaEvenNoComma ) {
			const start :number = iterator.mark();
			const length = iterator.stacks_length;
			return function callee (lineRest) {
				for ( ; ; ) {
					for ( ; ; ) {
						if ( lineRest==='' ) { }
						else if ( lineRest.startsWith('#') ) {
							if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
						}
						else { break; }
						lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
					}
					if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
					lineRest = setInline($_assignInline_pushInline, inlineTable, lineRest);
					if ( iterator.stacks_length>length ) {
						iterator.stacks_pushBeforeLast((lineRest) => {
							//
							for ( ; ; ) {//
								if ( lineRest==='' ) { }//
								else if ( lineRest.startsWith('#') ) {//
									if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }//
								}//
								else { break; }//
								lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');//
							}//
							if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }//
							//
							return callee(lineRest);
						});
						return lineRest;
					}
					for ( ; ; ) {
						if ( lineRest==='' ) { }
						else if ( lineRest.startsWith('#') ) {
							if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
						}
						else { break; }
						lineRest = iterator.must('Inline Table', start).replace(RE.PRE_WHITESPACE, '');
					}
					if ( lineRest.startsWith(',') ) { lineRest = lineRest.replace(RE.SYM_WHITESPACE, ''); }
				}
			}(lineRest);
		}
		else {
			if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
			( lineRest==='' || lineRest.startsWith('#') ) && iterator.throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where());
			const length = iterator.stacks_length;
			return function callee (lineRest) {
				for ( ; ; ) {
					lineRest = setInline($_assignInline_pushInline, inlineTable, lineRest);
					if ( iterator.stacks_length>length ) {
						iterator.stacks_pushBeforeLast((lineRest) => {
							//
							if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
							if ( lineRest.startsWith(',') ) {//
								lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');//
								lineRest.startsWith('}') && iterator.throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator.where());//
							}//
							( lineRest==='' || lineRest.startsWith('#') ) && iterator.throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where());//
							//
							return callee(lineRest);
						});
						return lineRest;
					}
					if ( lineRest.startsWith('}') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
					if ( lineRest.startsWith(',') ) {
						lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
						lineRest.startsWith('}') && iterator.throwSyntaxError('The last property of an Inline Table can not have a trailing comma, which was found at '+iterator.where());
					}
					( lineRest==='' || lineRest.startsWith('#') ) && iterator.throwSyntaxError('Inline Table is intended to appear on a single line, which broken at '+iterator.where());
				}
			}(lineRest);
		}
	}
	else {
		const inlineArray :any[] = table[finalKey] = [];
		sealedInline.add(inlineArray);
		const start :number = iterator.mark();
		lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
		for ( ; ; ) {
			if ( lineRest==='' ) { }
			else if ( lineRest.startsWith('#') ) {
				if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
			}
			else { break; }
			lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
		}
		if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
		const length = iterator.stacks_length;
		return function callee (lineRest) {
			for ( ; ; ) {
				lineRest = setInline($_assignInline_pushInline, inlineArray, lineRest);
				if ( iterator.stacks_length>length ) {
					iterator.stacks_pushBeforeLast((lineRest) => {
						//
						for ( ; ; ) {//
							if ( lineRest==='' ) { }//
							else if ( lineRest.startsWith('#') ) {//
								if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }//
							}//
							else { break; }//
							lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');//
						}//
						if ( lineRest.startsWith(',') ) {//
							lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');//
							if ( options.keepComment && lineRest.startsWith('#') ) {//
								inlineArray[Symbol_for(inlineArray.length-1+'')] = lineRest.slice(1);//
								lineRest = '';//
							}//
							for ( ; ; ) {//
								if ( lineRest==='' ) { }//
								else if ( lineRest.startsWith('#') ) {//
									if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }//
								}//
								else { break; }//
								lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');//
							}//
							if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
						}//
						else {//
							if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }//
							iterator.throwSyntaxError(iterator.where());//
						}//
						//
						return callee(lineRest);
					});
					return lineRest;
				}
				for ( ; ; ) {
					if ( lineRest==='' ) { }
					else if ( lineRest.startsWith('#') ) {
						if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
					}
					else { break; }
					lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
				}
				if ( lineRest.startsWith(',') ) {
					lineRest = lineRest.replace(RE.SYM_WHITESPACE, '');
					if ( options.keepComment && lineRest.startsWith('#') ) {
						inlineArray[Symbol_for(inlineArray.length-1+'')] = lineRest.slice(1);
						lineRest = '';
					}
					for ( ; ; ) {
						if ( lineRest==='' ) { }
						else if ( lineRest.startsWith('#') ) {
							if ( options.keepComment ) { table[Symbol('#')] = lineRest.slice(1); }
						}
						else { break; }
						lineRest = iterator.must('Inline Array', start).replace(RE.PRE_WHITESPACE, '');
					}
					if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
				}
				else {
					if ( lineRest.startsWith(']') ) { return lineRest.replace(RE.SYM_WHITESPACE, ''); }
					iterator.throwSyntaxError(iterator.where());
				}
			}
		}(lineRest);
	}
}
