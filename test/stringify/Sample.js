'use strict';module.exports=({ stringify, Section, inline, multiline, literal, commentFor, commentForThis }, newline)=>
	stringify({
		0: {
			0: inline({ '-1': { '1e1': 2n } }),
		},
		3: {
			3: {
				3: -0,
			},
		},
		'1-1': 1n,
		'-inf': -NaN,
		true: false,
		c: true, [commentFor('c')]: ' comment',
		e: literal`0b0000_0000`,
		s: '',
		b: '\b',
		d: {
			d: 0n, [commentFor('d')]: ' comment',
			o: 0n,
			t: {
				e: 1n,
				d: 1n,
			},
		},
		i: inline({}),
		as: inline([]),
		am: [
		],
		m1: multiline(`\
1`),
		m0: multiline(`\
`),
		m: multiline(``),
		_sub: {
			k: 'v',
			section: Section({
				
			}),
		},
		sub: Section({ [commentForThis]: ' comment',
			k: 'v',
			section: Section({ [commentForThis]: ' comment',
				
			}),
		}),
		arrayOfTables: [
			Section({
				'': 1,
			}),
			Section({ [commentForThis]: ' comment',
				
			}),
			Section({
				sub: Section({ [commentForThis]: ' comment',
					
				}),
			}),
		],
	}, {
		newline,
		xBeforeNewlineInMultilineTable: '',
	});