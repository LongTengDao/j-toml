'use strict';

module.exports = require('../test/test.js')(async ({ build, get, map, ful }) => {
	
	await build({
		name: 'j-toml',
		semver: await get('src/version'),
		ES: 6,
		NPM: {
			meta_: {
				description: 'An implementation of TOML written by LongTengDao. Belong to "Plan J".／龙腾道为汤小明语写的实现。从属于“简计划”。',
				keywords: ['TOML'],
			},
		},
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/j-orderify!'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/j-regexp!'),
		},
	});
	
	await map('docs/English/README.md', ReadMe(['English', '简体中文']), 'dist/NPM/README.md');
	
});

function ReadMe (i18n) {
	return function ReadMe (_English_) {
		const eol = /\r?\n/.exec(_English_)[0];
		return eol+
			i18n.map(lang => `[${lang}](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/${lang}/)`).join(' | ')+eol+
			'___'+_English_.replace(/(\n```+)[^`\r\n]+/g, '$1').replace(/(\n\d\. {2})#+ +([^\r\n]*)/g, '$1**$2**');
	};
}
