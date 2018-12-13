'use strict';

const fs = require('fs');

require('../test/test.js').then(async() => {
	
	await require('@ltd/j-dev').
		build({
			dir: __dirname+'/..',
			ES: 6,
			name: 'TOML',
			semver:
				fs.readFileSync(__dirname+'/../src/semver.js', 'utf8').match(/\d+/g).join('.'),
			NPM: {
				name: '@ltd/toml',
				'...': {
					description: 'An implementation of TOML v0.5 written by LongTengDao.／龙腾道为汤小明语 v0.5 写的实现。',
					keywords: ['TOML'],
				},
			},
		});
	
	const README = Buffer.from(fs.readFileSync(__dirname+'/../README.md', 'utf8').replace(/(\n```+)[^`\r\n]+/g, '$1'), 'utf8');
	const NPM_README = __dirname+'/../dist/NPM/README.md';
	try { if ( fs.readFileSync(NPM_README).equals(README) ) { return; } }
	catch (error) { if ( error.code!=='ENOENT' ) { throw error; } }
	fs.writeFileSync(NPM_README, README);
	
}, () => {}).catch(console.error);
