'use strict';

const BOM = '\uFEFF';
const EOL = '\r\n';
const i18n = [ 'English', '简体中文' ];

module.exports = require('../test/test.js')(async ({ build, 龙腾道, get, map, ful, put }) => {
	
	await build({
		name: 'j-toml',
		user: 'LongTengDao@ltd',
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver: await get('src/version'),
		ES: 6,
		NPM: {
			description: 'An implementation of TOML written by LongTengDao. Belong to "Plan J".／龙腾道为汤小明语写的实现。从属于“简计划”。',
			keywords: [ 'TOML' ],
		},
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/.j-orderify.js'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
			'@ltd/j-utf': ful('../../LongTengDao/j-utf/dist/ESM/.j-utf.js'),
		},
		LICENSE_: true,
	});
	
	await put('docs/README.md', BOM+i18n.map(lang => `[${lang}](./${lang}/)`).join(' | '));
	await map('docs/English/README.md', ReadMe, 'dist/NPM/README.md');
	
});

function ReadMe (_English_) {
	return BOM+EOL+
		i18n.map(lang => `[${lang}](https://GitHub.com/LongTengDao/j-toml/tree/master/docs/${lang}/)`).join(' | ')+EOL+
		'___'+_English_.replace(/(\n```+)[^`\r\n]+/g, '$1').replace(/(\n\d\. {2})#+ +([^\r\n]*)/g, '$1**$2**');
}
