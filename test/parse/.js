'use strict';module.exports=async({ TOML, get, not })=>{
	
	TOML.parse(``, 1.0, '\n');
	
	TOML.parse(Buffer.from(`#二进制`), 1.0, '\n');
	
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
	
	time('overflow&time&memory:', () => `["${'bt\\b\\t'.repeat(10000_0.00)}${'\\b\\t'.repeat(10000_0.00)}"]`);
	time('overflow&time', () => 'k=[{'.repeat(20000.0) + '}]'.repeat(20000.0));/// loop (67ms) ≈ JSON (114ms) ≪ generator+Symbol (46s) ≈ closure+WeakMap (48s)
	function time (label, Toml) {
		console.log(label + ':');
		const toml = Toml();
		Number(toml);
		console.time(label);
		TOML.parse(toml, '\n');
		console.timeEnd(label);
		return toml;
	}
	
};