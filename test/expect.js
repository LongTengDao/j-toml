'use strict';

module.exports = {
	array: [
		[ ],
		[ { } ],
		[
			{
				k: { },
				l: { },
				n: { },
				o: [ ],
			},
			{ },
		],
	],
	inline_table: {
		1: {
			1: 1.1,
			2: 1.2,
		},
		2: {
			1: 2.1,
		},
	},
	string: {
		basic: `\b\t\n\f\r"\\\0\0`,
		literal: String.raw`\b\t\n\f\r\"\\\u0000\U00000000`,
		'multi-lines_basic': {
			0: `那只 敏捷的 棕 狐狸 跳 过了 那只 懒 狗。`,
			1: `"`,
			2: `\\`,
		},
		'multi-lines_literal': `原始字符串中的\n第一个换行被剔除了。\n   所有其它空白\n   都保留了。\n`,
	},
	integer: {
		1: 1n,
		0: 0n,
		'-1': -1n,
		'+1': 1n,
		'+0': 0n,
		'1_2': 12n,
		'0xdead_beef': 0xdeadbeefn,
		'0o755': 0o755n,
		'0b11010110': 0b11010110n,
	},
	float: {
		'+2.0': 2,
		'3.14': 3.14,
		'-0.01': -0.01,
		'5e+22': 5e+22,
		'1e6': 1e6,
		'-2E-2': -2E-2,
		'6.626e-34': 6.626e-34,
		'224_617.445_991_228': 224617.445991228,
		inf: Infinity,
		'+inf': Infinity,
		'-inf': -Infinity,
		nan: NaN,
		'+nan': NaN,
		'-nan': NaN,
	},
	boolean: {
		true: true,
		false: false,
	},
	'date-time': {
		'offset_date-time_Z': Datetime('1970-01-01 00:00:00.9999Z'),
		'offset_date-time_0': Datetime('1970-01-01 00:00:00.9999+00:00'),
		'offset_date-time_2': Datetime('1970-01-01 00:00:00.9999-02:00'),
		'offset_date-time_8': Datetime('1970-01-01 00:00:00.9999+08:00'),
		'local_date-time': Datetime('1970-01-01 00:00:00.9999'),
		local_date: Datetime('1970-01-01'),
		local_time: Datetime('00:00:00.9999'),
	},
	array_of_table: [
		{ },
		{ },
	],
	table: {
		x: { },
		sub: {
			y: { },
			z: { },
		},
	},
};

function Datetime (literal) {
	return function datetime (datetime) {
		return datetime.toISOString()===literal.replace(' ', 'T');
	};
}
