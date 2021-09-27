'use strict';

const { not } = require('@ltd/j-validator');

module.exports = require('j-dev')(__dirname + '/..')(async ({ import_default, get }) => {
	
	const TOML = await import_default('src/default', {
		require: {
			'@ltd/j-orderify': require(`${__dirname}/../../../LongTengDao/j-orderify/dist/NPM/index.js`),
			'@ltd/j-regexp': require(`${__dirname}/../../../LongTengDao/j-regexp/dist/NPM/index.js`),
			'@ltd/j-utf': require(`${__dirname}/../../../LongTengDao/j-utf/dist/NPM/index.js`),
			'fs': { readFileSync: require('fs').readFileSync },
			'path': { isAbsolute: require('path').isAbsolute },
		}
	});
	
	await require('./stringify/.js')({ TOML, get });
	
	await require('./parse/.js')({ TOML, get, not });
	
});
