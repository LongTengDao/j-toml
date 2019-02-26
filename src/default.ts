// @ts-ignore
import version from './version?text';
import parse from './parser';

const TOML = {
	parse,
	version,
	get default () { return this; }
};

export default TOML;
