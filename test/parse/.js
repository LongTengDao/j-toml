'use strict';module.exports=async({ TOML, get, not })=>{
	
	TOML.parse(``, 1.0, '\n');
	
	TOML.parse(Buffer.from(`#二进制`), 1.0, '\n');
	
	const toml = TOML.parse(await get('./test/parse/sample.toml'), 1.0, '\n', true);
	const expect = require('./expect');
	if ( not(expect)(toml) ) {
		for ( const [ key, value ] of Object.entries(expect) ) {
			if ( not(value)(toml[key]) ) {
				throw Error(key);
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
		[ 'leap', `a=0001-02-29` ],
		[ 'leap100', `a=0100-02-29` ],
		[ 'leap3200', `a=3200-02-29` ],
		[ 'leap60', `a=1970-01-01 00:00:60Z` ],
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
	
	time('overflow&time&memory', (n = 2_000_000.0) => `["${'bt\\b\\t'.repeat(n)}"]`);
	time('overflow&time', (n = 20_000.0) => 'k=[{'.repeat(n) + '}]'.repeat(n));/// loop (67ms) ≈ JSON (114ms) ≪ generator+Symbol (46s) ≈ closure+WeakMap (48s) ? 46s /10= 660ms ?
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