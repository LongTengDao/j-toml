import version from './version?text';

import { Keys } from './options';
import parse from './parse/';
import stringify, { Section, inline, multiline, basic, literal } from './stringify/';
import { OffsetDateTime, LocalDateTime, LocalDate, LocalTime } from './types/Datetime';
import { isInline, isSection } from './types/non-atom';
import { commentFor, commentForThis } from './types/comment';

import Default from '.default';
export default /*#__PURE__*/Default({
	version,
	parse,
	stringify,
	Section, inline, multiline, basic, literal, commentFor, commentForThis,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
	Keys,
});

export {
	version,
	parse,
	stringify,
	Section, inline, multiline, basic, literal, commentFor, commentForThis,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
	Keys,
};
