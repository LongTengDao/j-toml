'use strict';

module.exports = require('@ltd/j-dev')(__dirname+'/..')(async ({ import_default, get }) => {
	
	const TOML = await import_default('src/default', {
		require: moduleName => {
			if ( moduleName==='@ltd/j-orderify' ) { return require(__dirname+'/../../j-orderify/dist/NPM/index.js'); }
			throw moduleName;
		},
		__filename: 'test/built.js',
	});
	
	const toml = TOML.parse(await get('./test/sample.toml'), 0.5, '\n', true);
	
	compare('integer', {
		'1': 1n,
		'0': 0n,
		'-1': -1n,
		'+1': 1n,
		'+0': 0n,
		'1_2': 12n,
		'0xdead_beef': 0xdeadbeefn,
		'0o755': 0o755n,
		'0b11010110': 0b11010110n,
	});
	
	compare('float', {
		'+1.0': 1,
		'3.14': 3.14,
		'-0.01': -0.01,
		'5e+22': 5e+22,
		'1e6': 1e6,
		'-2E-2': -2E-2,
		'6.626e-34': 6.626e-34,
		'224_617.445_991_228': 224617.445991228,
		'inf': Infinity,
		'+inf': Infinity,
		'-inf': -Infinity,
		'nan': NaN,
		'+nan': NaN,
		'-nan': NaN,
	});
	
	compare('date-time', {
		'offset_date-time_Z': '1970-01-01 00:00:00.9999Z',
		'offset_date-time_0': '1970-01-01 00:00:00.9999+00:00',
		'offset_date-time_2': '1970-01-01 00:00:00.9999-02:00',
		'offset_date-time_8': '1970-01-01 00:00:00.9999+08:00',
		'local_date-time': '1970-01-01 00:00:00.9999',
		'local_date': '1970-01-01',
		'local_time': '00:00:00.9999',
	});
	
	if ( JSON.stringify(toml)!==JSON.stringify(JSON.parse(await get('./test/expect.json'))) ) {
		throw new Error(JSON.stringify(toml, null, '\t'));
	}
	
	function compare (which, expect) {
		const sample = toml[which];
		const expect_keys = Object.getOwnPropertyNames(expect).sort();
		const sample_keys = Object.getOwnPropertyNames(sample).sort();
		if ( JSON.stringify(sample_keys)!==JSON.stringify(expect_keys) ) {
			throw new Error(which+' has '+JSON.stringify(sample_keys)+', but expect '+JSON.stringify(expect_keys)+'.');
		}
		for ( const key of expect_keys ) {
			if ( typeof sample[key]==='object' ) { sample[key] = sample[key].toISOString(); }
			if ( expect[key]!==expect[key] ? sample[key]===sample[key] : sample[key]!==expect[key] ) {
				throw new Error(which+'['+key+'] is '+sample[key]+', but expect '+expect[key]+'.');
			}
		}
		toml[which] = null;
	}
	
});
