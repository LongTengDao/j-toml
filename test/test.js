'use strict';

const { not } = require('@ltd/j-validator');

module.exports = require('@ltd/j-dev')(__dirname + '/..')(async ({ import_default, get }) => {
	
	const TOML = await import_default('src/default', {
		require (moduleName) {
			if ( [ '@ltd/j-orderify', '@ltd/j-regexp', '@ltd/j-utf' ].includes(moduleName) ) {
				return require(`${__dirname}/../../../LongTengDao/${moduleName.replace('@ltd/', '')}/dist/NPM/index.js`);
			}
			if ( moduleName==='fs' ) {
				return { readFileSync: require('fs').readFileSync };
			}
			throw Error(moduleName);
		}
	});
	
	TOML.parse('', 1.0, '\n');
	
	TOML.parse([
		`["${'bt\\b\\t'.repeat(10000)}${'\\b\\t'.repeat(10000)}"]`,
		'k=[{'.repeat(10000) + '}]'.repeat(10000),
	].join('\n'), 1.0, '\r\n');
	
	const toml = TOML.parse(await get('./test/sample.toml'), 1.0, '\n', true);
	const expect = require('./expect');
	if ( not(expect)(toml) ) {
		for ( const [ key, value ] of Object.entries(expect) ) {
			if ( not(value)(toml[key]) ) {
				throw Error(JSON.stringify(toml[key], (key, value) => typeof value==='bigint' ? '' + value : value, '\t'));
			}
		}
	}
	
	for ( const [ name, source ] of new Map().set('redefine', `[a]\n[a]`).set('pair->[]', `a.b=1\n[a]`).set('[]->pair', `[a.b]\n[a]\nb.c=1`).set('+base', `bad = +0b0`).set('BS', `bad = "\\ "`).set('MLBS', `bad = """\\ """`).set('') ) {
		try { TOML.parse(source, 1.0, '\n'); }
		catch (error) { continue; }
		throw Error(name);
	}
	
});
