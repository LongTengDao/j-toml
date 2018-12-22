import version from './version?text';
import { Array } from './global.js';
import { String, Integer, Float, Boolean, Datetime, Table } from './types.js';
import parse from './parser.js';

const TOML = {
	parse,
	String,
	Integer,
	Float,
	Boolean,
	Datetime,
	Array,
	Table,
	version
};

export default TOML;
