'use strict';

const fs = require('fs');

require('./test').then(async() => {
	
	await require('@ltd/j-dev').
		build({
			dir: __dirname,
			ES: 6,
			name: 'TOML',
			description: `
				LongTengDao's obvious, minimal implementation of Tom's Obvious, Minimal Language.`,
			semver:
				fs.readFileSync(__dirname+'/src/semver.js', 'utf8').match(/\d+/g).join('.'),
			NPM: {
				name: '@ltd/toml',
			},
		});
	
	const README = fs.readFileSync(__dirname+'/README.md');
	const NPM_README = __dirname+'/dist/NPM/README.md';
	try { if ( fs.readFileSync(NPM_README).equals(README) ) { return; } }
	catch (error) { if ( error.code!=='ENOENT' ) { throw error; } }
	fs.writeFileSync(NPM_README, README);
	
}, () => {}).catch(console.error);
