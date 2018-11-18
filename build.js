'use strict';

require('./test').then(() => {
	
	require('@ltd/j-dev').
		
		build({
			dir: __dirname,
			ES: 6,
			name: 'TOML',
			description: `
				LongTengDao's obvious, minimal implementation of Tom's Obvious, Minimal Language.`,
			semver: JSON.parse(
				require('fs').readFileSync(__dirname+'/src/semver.json', 'utf8')
			).join('.'),
			NPM: {
				name: '@ltd/toml',
			},
		}).
		
		catch(console.error)
	
}, () => {});
