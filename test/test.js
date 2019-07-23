'use strict';

const Validator = require('@ltd/j-validator');

module.exports = require('@ltd/j-dev')(__dirname+'/..')(async ({ import_default, get }) => {
	
	const TOML = await import_default('src/default', {
		require: moduleName => {
			if ( [ '@ltd/j-orderify', '@ltd/j-regexp', '@ltd/j-utf' ].includes(moduleName) ) {
				return require(`${__dirname}/../../../LongTengDao/${moduleName.replace('@ltd/', '')}/dist/NPM/index.js`);
			}
			if ( moduleName==='fs' ) {
				return { readFileSync: require('fs').readFileSync };
			}
			throw Error(moduleName);
		},
		__filename: 'test/built.js',
	});
	
	TOML.parse('', 0.5, '\n');
	
	TOML.parse([
		`["${'bt\\b\\t'.repeat(10000)}${'\\b\\t'.repeat(10000)}"]`,
		'k=[{'.repeat(10000)+'}]'.repeat(10000),
	].join('\n'), 0.5, '\r\n');
	
	const toml = TOML.parse(await get('./test/sample.toml'), 0.5, '\n', true);
	const expect = require('./expect');
	if ( !Validator(expect)(toml) )
	for ( const [ key, value ] of Object.entries(expect) ) {
		if ( !Validator(value)(toml[key]) ) {
			throw Error(JSON.stringify(toml[key], function replacer (key, value) { return typeof value==='bigint' ? ''+value : value; }, '\t'));
		}
	}
	
	for ( const [name, source] of new Map().set('-base', `bad = -0b0`).set('BS', `bad = "\\ "`).set('MLBS', `bad = """\\ """`) ) {
		let lackError = true;
		try { TOML.parse(source, 0.5, '\n'); }
		catch (error) { lackError = false; }
		if ( lackError ) { throw Error(name); }
	}
	
	for ( const [name, source] of new Map().set('!0.4', `[a.b]\n[a]\n[a]`) ) {
		let lackError = true;
		try { TOML.parse(source, 0.4, '\n'); }
		catch (error) { lackError = false; }
		if ( lackError ) { throw Error(name); }
	}
	
});
