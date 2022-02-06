'use strict';

const BOM = '\uFEFF';
const EOL = '\r\n';
const i18n = [ 'English', '简体中文' ];
const Markdown = (Path, npm = `\
![](https://img.shields.io/npm/dw/@ltd/j-toml "Downloads")
![](https://img.shields.io/npm/l/@ltd/j-toml "License")
![](https://img.shields.io/npm/v/@ltd/j-toml "Version")
![](https://img.shields.io/github/last-commit/LongTengDao/j-toml "Activity: GitHub last commit")`.replace(/\n/g, ' ')) => {
	return (_English_) => {
		if ( _English_.includes('\t') ) { throw Error(`.md 中存在 Tab`); }
		return BOM +
			i18n.map(lang => `[${lang}](https://GitHub.com/LongTengDao/j-toml/tree/master/${Path(encodeURIComponent(lang))})`).join(' | ') + EOL +
			'___' + EOL +
			( npm ? _English_.replace(/(?=\r?\n=)/, () => ` ${npm}`) : _English_ ).replace(/^\uFEFF/, '')//( npm ? EOL + npm + EOL : npm )
			//.replace(/(?<=^(?: {4})?```+)[^`\r\n]+/gm, '')
			//.replace(/(?<=^(?: {4})?(?:\d\.|- ) {2})#+ +(.*)/gm, (_, $1) => `**${$1}**`)
			;
	};
};

require('../test/test.js')(async ({ build, 龙腾道, get, map, ful, put }) => {
	
	await put('docs/README.md', BOM + i18n.map(lang => `[${lang}](./${encodeURIComponent(lang)}/)`).join(' | '));
	await map('docs/English/README.md', Markdown(lang => `docs/${lang}/`), 'dist/NPM/README.md');
	await map('CHANGELOG/English.md', Markdown(lang => `CHANGELOG/${lang}.md`, ''), 'dist/NPM/CHANGELOG.md');
	await map('.editorconfig', 'dist/NPM/.editorconfig');
	
	const zhs = '龙腾道为汤小明语写的实现。从属于“简计划”。';
	const en = 'An implementation of TOML written by LongTengDao. Belong to "Plan J".';
	
	const files = [
		"package.json",
		"index.d.ts",
		"index.js",
		"index.js.map",
		"index.d.mts",
		"index.mjs",
		"index.mjs.map",
		"test.js",
		".editorconfig",
		"LICENSE",
		"README.md",
		"CHANGELOG.md",
	];
	
	await build({
		name: 'j-toml',
		Desc: [ zhs, en ],
		user: 'LongTengDao@ltd',
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver: await get('src/version'),
		ES: 6,
		NPM: {
			description: `${en}／${zhs}`,
			keywords: [ 'TOML', 'stringify', 'parse', '1.0.0', '0.5.0', '0.4.0', '0.3.0', '0.2.0', '0.1.0' ],
			homepage: 'https://www.npmjs.com/package/@ltd/j-toml',
			files,
			scripts: {
				'test': 'node ./test.js',
			},
		},
		UMD: { main_global: 'TOML' },
		ESM: true,
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/.j-orderify.js'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
		},
		LICENSE_: true,
	});
	
	if ( files.sort().join('/')!==( await require('fs').promises.readdir(`${__dirname}/../dist/NPM`) ).sort().join('/') ) {
		throw Error(`dist/NPM/package.json#files`);
	}
	
});
