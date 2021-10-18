'use strict';

module.exports = require('j-dev')(__dirname + '/..')(async ({ import_default, get }) => {
	
	const { not } = require('@ltd/j-validator');
	
	{
		const string = '𠮷利';
		const buffer = Buffer.from(string);
		const utf8 = Buffer.allocUnsafe(buffer.length);
		///@ts-ignore
		utf8.utf8Write(string, 0, buffer.length);
		if ( !utf8.equals(buffer) ) { throw Error(`node engine changed`); }
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
