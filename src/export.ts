import version from './version?text';

import parse from './parse/';
import stringify, { Section, inline, multiline, literal, commentFor } from './stringify/';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime } from './types/Datetime';

export {
	version,
	parse,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
};

import Default from '.default';
export default /*#__PURE__*/Default({
	version,
	parse,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
});
