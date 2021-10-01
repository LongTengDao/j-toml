'use strict';

const BOM = '\uFEFF';
const EOL = '\r\n';
const i18n = [ 'English', '简体中文' ];

require('../test/test.js')(async ({ build, 龙腾道, get, map, ful, put }) => {
	
	const zhs = '龙腾道为汤小明语写的实现。从属于“简计划”。';
	const en = 'An implementation of TOML written by LongTengDao. Belong to "Plan J".';
	
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
			keywords: [ 'parse', 'stringify', 'TOML', '1.0.0', '0.5.0', '0.4.0', '0.3.0', '0.2.0', '0.1.0' ],
			homepage: 'https://www.npmjs.com/package/@ltd/j-toml',
			files: [
				'package.json',
				'index.d.ts',
				'index.js',
				'index.js.map',
				'index.mjs',
				'index.mjs.map',
				'README.md',
				'CHANGELOG.md',
				'LICENSE',
				'test.js',
			],
			scripts: {
				'test': 'node ./test.js',
			},
		},
		ESM: true,
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/.j-orderify.js'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
		},
		LICENSE_: true,
	});
	
	await put('docs/README.md', BOM + i18n.map(lang => `[${lang}](./${lang}/)`).join(' | '));
	await map('docs/English/README.md', Markdown(lang => `docs/${lang}/`), 'dist/NPM/README.md');
	await map('CHANGELOG/English.md', Markdown(lang => `CHANGELOG/${lang}.md`, null), 'dist/NPM/CHANGELOG.md');
	
	await put('dist/NPM/test.js', `'use strict';

var toml = \`
[a.b] #

c.d = { e.f = 0.0 } #
\`;

var TOML=$('TOML',()=>require('.'));
var parsed=$('TOML.parse',()=>TOML.parse(toml,'',true,{comment:true}));
var stringified=$('TOML.stringify',()=>TOML.stringify(parsed,{newline:'\\n'}));
stringified===toml||$('TOML.stringify');

function $(msg,fn){try{return fn();}catch{throw Error(\`@ltd/j-toml/package.json#scripts.test -- \${msg}\`);}}
`);
	
});

function Markdown (Path, npm = `
![Downloads](https://img.shields.io/npm/dw/@ltd/j-toml)
![License](https://img.shields.io/npm/l/@ltd/j-toml)
![Version](https://img.shields.io/npm/v/@ltd/j-toml)
![Activity: GitHub last commit](https://img.shields.io/github/last-commit/LongTengDao/j-toml)`.replace(/\n/g, ' ')) {
	return (_English_) => {
		if ( _English_.includes('\t') ) { throw Error(`.md 中存在 Tab`); }
		return BOM +
			i18n.map(lang => `[${lang}](https://GitHub.com/LongTengDao/j-toml/tree/master/${Path(lang)})`).join(' | ') + EOL +
			'___' +  EOL +
			( npm ? _English_.replace(/(?=\r?\n=)/, () => npm ) : _English_ )
			.replace(/^\uFEFF/, '')
			//.replace(/(?<=^(?: {4})?```+)[^`\r\n]+/gm, '')
			//.replace(/(?<=^(?: {4})?(?:\d\.|- ) {2})#+ +(.*)/gm, (_, $1) => `**${$1}**`)
			;
	};
}
