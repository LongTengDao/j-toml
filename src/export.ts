import version from './version?text';

import parse from './parse/';

export {
	version,
	parse,
};

import Default from '.default';
export default Default({
	version,
	parse,
});
