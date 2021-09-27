'use strict';module.exports=({ stringify, Section, inline, multiline, literal, commentFor }, newline)=>
	stringify({
		[commentFor('c')]: ' comment',
		c: true,
		e: literal`0b0000_0000`,
		s: '',
		b: '\b',
		d: {
			d: 0n,
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
		sub: Section({
			k: 'v',
			section: Section({
				
			}),
		}),
		arrayOfTables: [
			Section({
				'': 1,
			}),
			Section({
				
			}),
			Section({
				sub: Section({
					
				}),
			}),
		],
	}, {
		newline,
		xBeforeNewlineInMultilineTable: '',
	});