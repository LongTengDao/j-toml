'use strict';

module.exports = require('@ltd/j-dev').
	
	import_default(__dirname+'/../src/default.js', (moduleName) => {
		if( moduleName==='@ltd/j-orderify' ) { return require(__dirname+'/../../j-orderify/dist/NPM/index.js'); }
		throw moduleName;
	}).
	
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
			
			[[fruit]]
			name = "apple"
			
			[fruit.physical]
			color = "red"
			shape = "round"
			
			[[fruit.variety]]
			name = "red delicious"
			
			[[fruit.variety]]
			name = "granny smith"
			
			[[fruit]]
			name = "banana"
			
			[[fruit.variety]]
			name = "plantain"
			
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
			fruit: [
				{
					name: 'apple',
					physical: {
						color: 'red',
						shape: 'round'
					},
					variety: [
						{ name: 'red delicious' },
						{ name: 'granny smith' },
					],
				},
				{
					name: 'banana',
					variety: [
						{ name: 'plantain' },
					],
				}
			],
		}) ) {
			throw JSON.stringify(table, null, '\t');
		}
		
	});

module.exports.catch(console.error);
