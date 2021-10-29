'use strict';

module.exports = require('j-dev')(__dirname + '/..')(async ({ import_default, get }) => {
	
	const { not } = require('@ltd/j-validator');
	
	{
		if ( !Buffer.hasOwnProperty(Symbol.species) || ( Buffer[Symbol.species] ?? Buffer )===Buffer ) { throw Error(`node engine changed`); }
		const utf8 = Buffer.alloc(7);
		///@ts-ignore
		utf8.utf8Write('𠮷利', 0, 7);
		if ( !utf8.equals(Buffer.from('𠮷利')) ) { throw Error(`node engine changed`); }
	}
	
	const TOML = await import_default('src/default', {
		require: {
			'@ltd/j-orderify': require(`${__dirname}/../../../LongTengDao/j-orderify/dist/NPM/index.js`),
			'@ltd/j-regexp': require(`${__dirname}/../../../LongTengDao/j-regexp/dist/NPM/index.js`),
			'fs': { readFileSync: require('fs').readFileSync },
			'path': { isAbsolute: require('path').isAbsolute },
		}
	});
	
	await require('./stringify/.js')({ TOML, get });
	
	await require('./parse/.js')({ TOML, get, not });
	
});
