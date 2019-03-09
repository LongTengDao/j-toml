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
		['docs/English/README.md', ReadMe, 'dist/NPM/README.md'],
		['src/d.ts', 'dist/TSD/j-toml.d.ts'],
	);
	
});

function ReadMe (English) {
	const i18n = ['English', '简体中文'];
	const eol = /\r?\n/.exec(English)[0];
	return eol+
		i18n.map(lang => `[${lang}](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/${lang}/)`).join(' | ')+eol+
		English.replace(/(\n```+)[^`\r\n]+/g, '$1').replace(/(\n\d\. {2})#+ +([^\r\n]*)/g, '$1**$2**');
}
