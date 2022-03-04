'use strict';module.exports=async({ TOML, get, not })=>{
	
	{
		if ( !Buffer.hasOwnProperty(Symbol.species) || ( Buffer[Symbol.species] ?? Buffer )===Buffer ) { throw Error(`node engine changed`); }
		const utf8 = Buffer.alloc(7);
		utf8.utf8Write('𠮷利', 0, 7);
		if ( !utf8.equals(Buffer.from('𠮷利')) ) { throw Error(`node engine changed`); }
	}
	
	TOML.parse(``, 1.0, '\n');
	
	TOML.parse(Buffer.from(`#二进制`), 1.0, '\n');
	
	const toml = TOML.parse(await get('./test/parse/sample.toml'), 1.0, '\n', true);
	const expect = require('./expect');
	if ( not(expect)(toml) ) {
		for ( const [ key, value ] of Object.entries(expect) ) {
			if ( not(value)(toml[key]) ) {
				console.log(toml[key]);
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