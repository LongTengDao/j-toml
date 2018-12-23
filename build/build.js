'use strict';

require('../test/test.js')(async ({ build, read, copy }) => {
	
	await build({
		name: 'j-toml',
		semver: await read('src/version'),
		ES: 6,
		NPM: {
			meta_: {
				description: 'An implementation of TOML v0.5 written by LongTengDao.／龙腾道为汤小明语 v0.5 写的实现。',
				keywords: ['TOML'],
			},
		},
		locate: {
			'@ltd/j-orderify': __dirname+'/../../j-orderify/dist/ESM/j-orderify.js',
		},
	});
	
	await copy(
		'docs/README.md',
		string => string.replace(/(\n```+)[^`\r\n]+/g, '$1'),
		'dist/NPM/README.md',
	);
	
});
