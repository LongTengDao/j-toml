import semver from './semver.js';
import { Array } from './global.js';
import { String, Integer, Float, Boolean, Datetime, Table } from './types.js';
import parse from './parser.js';

const TOML = {
	semver,
	parse,
	String,
	Integer,
	Float,
	Boolean,
	Datetime,
	Array,
	Table,
};

export default TOML;
