import { String, Integer, Float, Boolean, Datetime, Array, Table } from './types.js';
import parse from './parser.js';
import semver from './semver.json.js?';

const TOML = {
	parse,
	semver,
	String,
	Integer,
	Float,
	Boolean,
	Datetime,
	Array,
	Table,
};

export default TOML;
