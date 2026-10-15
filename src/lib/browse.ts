import type { EdmEvent, Venue, VenueKind } from '#lib/Types.js';
import { VENUES, getVenueByClubName } from '#lib/venues.js';

const SHORT_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];
const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Event dates are calendar dates stored as UTC midnight, so always format in UTC

// "Oct 16"
export function formatMonthDay(isoDate: string): string {
	const date = new Date(isoDate);
	return `${SHORT_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

// "Fri Oct 16"
export function formatWeekdayMonthDay(isoDate: string): string {
	return `${SHORT_WEEKDAYS[new Date(isoDate).getUTCDay()]} ${formatMonthDay(isoDate)}`;
}

// "Fri, Oct 16"
export function formatLongDate(isoDate: string): string {
	return `${SHORT_WEEKDAYS[new Date(isoDate).getUTCDay()]}, ${formatMonthDay(isoDate)}`;
}

export const normalizeSearchText = (text: string) =>
	text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function matchesSearchQuery(text: string, searchQuery: string): boolean {
	return normalizeSearchText(text).includes(normalizeSearchText(searchQuery));
}

const MONTH_NAMES = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december'
];

export interface DateQuery {
	month: number; // 0-11
	day?: number;
	year?: number;
}

// "oct" / "sept" / "October" → 9; needs at least three letters so "ma" isn't a month
function parseMonthName(word: string): number | undefined {
	if (word.length < 3) return undefined;
	const index = MONTH_NAMES.findIndex((name) => name.startsWith(word));
	return index === -1 ? undefined : index;
}

const toYear = (year: string | undefined) =>
	year === undefined ? undefined : year.length === 2 ? 2000 + Number(year) : Number(year);

function validDateQuery(month: number, day?: number, year?: number): DateQuery | null {
	if (month < 0 || month > 11) return null;
	if (day !== undefined && (day < 1 || day > 31)) return null;
	return { month, day, year };
}

// Recognizes "oct 31", "October 31st", "sat, oct 31", "oct 31 2026", "10/31", "10/31/26",
// "2026-10-31" and a bare month ("october"). Anything else is not a date query.
export function parseDateQuery(query: string): DateQuery | null {
	const q = query.trim().toLowerCase().replace(/\s+/g, ' ');

	let match = q.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
	if (match) {
		return validDateQuery(
			Number(match[2]) - 1,
			match[3] ? Number(match[3]) : undefined,
			Number(match[1])
		);
	}

	match = q.match(/^(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2}|\d{4}))?$/);
	if (match) {
		return validDateQuery(Number(match[1]) - 1, Number(match[2]), toYear(match[3]));
	}

	// Optional leading weekday, then month name, optional day and year
	match = q.match(
		/^(?:(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*,? )?([a-z]+)\.?(?: (\d{1,2})(?:st|nd|rd|th)?)?(?:,? (\d{4}))?$/
	);
	if (match) {
		const month = parseMonthName(match[1]);
		if (month === undefined) return null;
		return validDateQuery(month, match[2] ? Number(match[2]) : undefined, toYear(match[3]));
	}

	return null;
}

export function matchesDateQuery(isoDate: string, query: DateQuery): boolean {
	const date = new Date(isoDate);
	return (
		date.getUTCMonth() === query.month &&
		(query.day === undefined || date.getUTCDate() === query.day) &&
		(query.year === undefined || date.getUTCFullYear() === query.year)
	);
}

export const monthName = (isoDate: string) => MONTH_NAMES[new Date(isoDate).getUTCMonth()];

const byDate = (a: EdmEvent, b: EdmEvent) => a.eventDate.localeCompare(b.eventDate);

// Named headliner nights only; unnamed nights are left out of artist and venue views
const headlinerEvents = (events: EdmEvent[]) =>
	events.filter((event) => event.artist && event.artistSlug).sort(byDate);

export interface Count {
	slug: string;
	name: string;
	count: number;
}

function countBy(events: EdmEvent[], key: (event: EdmEvent) => { slug: string; name: string }) {
	const counts = new Map<string, Count>();
	for (const event of events) {
		const { slug, name } = key(event);
		const existing = counts.get(slug);
		if (existing) existing.count++;
		else counts.set(slug, { slug, name, count: 1 });
	}
	// Ties keep first-seen order, which is date order for date-sorted input
	return [...counts.values()].sort((a, b) => b.count - a.count);
}

const artistKey = (event: EdmEvent) => ({ slug: event.artistSlug!, name: event.artist! });

export interface ArtistSummary {
	slug: string;
	name: string;
	count: number;
	next: EdmEvent;
	nextVenueName: string;
}

export function groupArtists(events: EdmEvent[]): ArtistSummary[] {
	const named = headlinerEvents(events);
	return countBy(named, artistKey).map(({ slug, name, count }) => {
		const next = named.find((event) => event.artistSlug === slug)!;
		return {
			slug,
			name,
			count,
			next,
			nextVenueName: getVenueByClubName(next.clubName)?.shortName ?? next.clubName
		};
	});
}

export interface ArtistDetail {
	slug: string;
	name: string;
	events: EdmEvent[];
	venues: Count[];
}

export function getArtistDetail(events: EdmEvent[], slug: string): ArtistDetail | undefined {
	const artistEvents = headlinerEvents(events).filter((event) => event.artistSlug === slug);
	if (artistEvents.length === 0) return undefined;
	return {
		slug,
		name: artistEvents[0].artist!,
		events: artistEvents,
		venues: countBy(artistEvents, (event) => ({
			slug: event.clubSlug,
			name: getVenueByClubName(event.clubName)?.name ?? event.clubName
		}))
	};
}

export interface VenueSummary {
	venue: Venue;
	comingUp: EdmEvent[];
	regulars: Count[];
}

export function groupVenues(events: EdmEvent[], kind: VenueKind): VenueSummary[] {
	const named = headlinerEvents(events);
	return Object.entries(VENUES)
		.filter(([, venue]) => venue.kind === kind)
		.map(([clubName, venue]) => {
			const venueEvents = named.filter((event) => event.clubName === clubName);
			return {
				venue,
				comingUp: venueEvents.slice(0, 3),
				regulars: countBy(venueEvents, artistKey)
					.filter(({ count }) => count >= 2)
					.slice(0, 3)
			};
		});
}

export const countVenues = (kind: VenueKind) =>
	Object.values(VENUES).filter((venue) => venue.kind === kind).length;

export interface VenueDetail {
	venue: Venue;
	events: EdmEvent[];
	artists: Count[];
}

export function getVenueDetail(events: EdmEvent[], venue: Venue): VenueDetail {
	const venueEvents = headlinerEvents(events).filter((event) => event.clubSlug === venue.slug);
	return {
		venue,
		events: venueEvents,
		// Only artists playing more than once get a filter chip
		artists: countBy(venueEvents, artistKey).filter(({ count }) => count >= 2)
	};
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
	['day', 86_400_000],
	['hour', 3_600_000],
	['minute', 60_000]
];

// "3 hours ago", "yesterday", "just now"
export function formatRelativeTime(isoDate: string, now: Date = new Date()): string {
	const elapsed = now.getTime() - new Date(isoDate).getTime();
	const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	for (const [unit, ms] of RELATIVE_UNITS) {
		if (elapsed >= ms) return formatter.format(-Math.floor(elapsed / ms), unit);
	}
	return 'just now';
}

export const STALE_AFTER_MS = 3 * 86_400_000;

export const isStale = (isoDate: string, now: Date = new Date()) =>
	now.getTime() - new Date(isoDate).getTime() > STALE_AFTER_MS;
