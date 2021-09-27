'use strict';module.exports=async({ TOML, get })=>{
	
	for ( const [ Sample, Expect ] of [
		
		[ 'Sample', 'expect' ],
		
	] ) {
		
		const sample = require(`./${Sample}.js`)(TOML, '\n').split('\n');
		const expect = ( await get(`test/stringify/${Expect}.toml`, null) ).split(/\r?\n/);
		const length = Math.min(sample.length, expect.length);
		for ( let index = 0; index!==length; ++index ) {
			if ( sample[index]!==expect[index] ) {
				throw Error(`sample:${index + 1}\`\n${sample[index]}\n\`!==expect:\`\n${expect[index]}\n\``);
			}
		}
		if ( sample.length!==expect.length ) {
			throw Error(sample.length>expect.length
				? `sample has more lines:\`\n${sample.slice(expect.length).join('\n')}\n\``
				: `sample missing lines:${sample.length + 1}\`\n${expect.slice(sample.length).join('\n')}\n\``
			);
		}
		
	}
	
};