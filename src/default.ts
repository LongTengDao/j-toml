import version from './version?text';
import parse from './parse/';
import install from './install/';

const TOML = {
	parse,
	install,
	version,
	get default () { return this; }
};

export default TOML;
