'use strict';module.exports=async({ TOML, get, not })=>{
	
	TOML.parse(``, 1.0, '\n');
	
	const toml = TOML.parse(await get('./test/parse/sample.toml'), 1.0, '\n', true);
	const expect = require('./expect');
	if ( not(expect)(toml) ) {
		for ( const [ key, value ] of Object.entries(expect) ) {
			if ( not(value)(toml[key]) ) {
				throw Error(JSON.stringify(toml[key], (key, value) => typeof value==='bigint' ? '' + value : value, '\t'));
			}
		}
	}
	
	for ( const [ name, source ] of Object.entries([
		[ 'redefine', `[a]\n[a]` ],
		[ 'pair->[]', `a.b=1\n[a]` ],
		[ '[]->pair', `[a.b]\n[a]\nb.c=1` ],
		[ '+base', `bad = +0b0` ],
		[ 'BS', `bad = "\\ "` ],
		[ 'MLBS', `bad = """\\ """` ],
		[ '' ],
	]) ) {
		try { TOML.parse(source, 1.0, '\n'); }
		catch (error) { continue; }
		throw Error(name);
	}
	
	TOML.parse(``);
	label: {
		try { TOML.parse(`a='''a\nb'''`); }
		catch (error) { break label; }
		throw Error('!multilineStringJoiner');
	}
	
	console.log('overflow&time&memory:');
	console.time('overflow&time&memory');
	TOML.parse(`["${'bt\\b\\t'.repeat(10000_0.00)}${'\\b\\t'.repeat(10000_0.00)}"]`, 1.0, '\n');
	console.timeEnd('overflow&time&memory');
	
	console.log('overflow&time:');
	console.time('overflow&time');
	TOML.parse('k=[{'.repeat(20000.0) + '}]'.repeat(20000.0), 1.0, '\n');// loop (67ms) ≈ JSON (114ms) ≪ generator+Symbol (46s) ≈ closure+WeakMap (48s)
	console.timeEnd('overflow&time');
	
};