import version from './version?text';
import parse from './parse';

const TOML = {
	parse,
	version,
	get default () { return this; }
};

export default TOML;
