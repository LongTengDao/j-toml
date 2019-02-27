'use strict';

require('../test/test.js')(async ({ build, get, map, ful }) => {
	
	await build({
		name: 'j-toml',
		semver: await get('src/version'),
		ES: 6,
		NPM: {
			meta_: {
				description: 'An implementation of TOML v0.5 written by LongTengDao.／龙腾道为汤小明语 v0.5 写的实现。',
				keywords: ['TOML'],
			},
		},
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/j-orderify.js'),
		},
	});
	
	await map(
		'docs/README.md',
		string => string.replace(/(\n```+)[^`\r\n]+/g, '$1').replace(/(\n\d\. {2})#+ +([^\r\n]*)/g, '$1**$2**'),
		'dist/NPM/README.md',
	);
	
});
