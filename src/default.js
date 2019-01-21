import version from './version?text';
import { Datetime, Table } from './types.js';
import parse from './parser.js';

const TOML = {
	parse,
	Datetime,
	Table,
	version
};

export default TOML;
