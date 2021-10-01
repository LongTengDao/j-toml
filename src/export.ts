import version from './version?text';

import parse from './parse/';
import stringify, { Section, inline, multiline, literal } from './stringify/';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime } from './types/Datetime';
import { isInline, isSection } from './types/non-atom';
import { commentFor } from './types/comment';

export {
	version,
	parse,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
};

import Default from '.default';
export default /*#__PURE__*/Default({
	version,
	parse,
	stringify,
	Section, inline, multiline, literal, commentFor,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
});
