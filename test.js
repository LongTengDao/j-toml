'use strict';

module.exports = require('@ltd/j-dev').
	
	import_default(__dirname+'/src/default.js').
	
	then(TOML => {
		
		for ( const literal of [
			'1970-01-01 00:00:00Z',
			'1970-01-01 00:00:00+00:00',
			'1970-01-01 00:00:00+02:00',
			'1970-01-01 00:00:00+08:00',
			'1970-01-01 00:00:00',
			'1970-01-01',
			'00:00:00',
		] ) {
			const toml = new TOML.Datetime(literal).toTOML();
			if ( toml!==literal ) {
				console.log('literal: '+literal);
				console.log('to_toml: '+toml);
				throw new Error('to_toml !== literal')
			}
		}
		
		let table = TOML.parse(`
			inf = inf
			-inf = -inf
			nan = nan
			0 = 0
		`, 0.5, '\r?\n');
		
		if ( table.inf!==Infinity ) { throw table.inf; }
		if ( table['-inf']!== -Infinity ) { throw table['-inf']; }
		if ( table.nan===table.nan ) { throw table.nan; }
		if ( table[0]!==0n ) { throw table[0]; }
		
		table = TOML.parse(`
			a = 'a'
			b = "b"
			[c]
			d = """d"""
			e = '''e'''
			[[f]]
			g = 0.0
			[[f]]
			h = true
			i = false
			j = [
				[],
				[],
			]
			k = { l.m = 'l.m' }
		`, 0.5, '\r?\n');
		
		if ( JSON.stringify(table)!==JSON.stringify({
			a: 'a',
			b: 'b',
			c: {
				d: 'd',
				e: 'e',
			},
			f: [
				{
					g: 0,
				},
				{
					h: true,
					i: false,
					j: [
						[],
						[],
					],
					k: { l: { m: 'l.m' } },
				},
			],
		}) ) {
			throw JSON.stringify(table, null, '\t');
		}
		
	});

module.exports.catch(console.error);
