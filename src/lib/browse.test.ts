import { describe, test, expect } from 'vitest';
import {
	formatLongDate,
	formatMonthDay,
	formatRelativeTime,
	formatWeekdayMonthDay,
	getArtistDetail,
	getVenueDetail,
	groupArtists,
	groupVenues,
	isStale,
	matchesDateQuery,
	matchesSearchQuery,
	parseDateQuery
} from './browse';
import { normalizeEvent } from './normalize';
import { getVenueBySlug } from './venues';

let nextId = 0;
const event = (ClubName: string, ArtistName: string, day: number) =>
	normalizeEvent({
		Id: String(nextId++),
		ClubName,
		ArtistName,
		EventDate: `2026-10-${String(day).padStart(2, '0')}T00:00:00Z`,
		TicketUrl: `https://example.com/${nextId}`
	});

const events = [
	event('omnia nightclub', 'steve aoki - race weekend', 23),
	event('omnia nightclub', 'steve aoki', 16),
	event('marquee nightclub', 'dawn 2 dusk - steve aoki - halloween weekend', 30),
	event('omnia nightclub', 'zedd', 17),
	event('omnia nightclub', 'zedd', 24),
	event('omnia nightclub', 'omnia nightclub thursday', 15),
	event('omnia nightclub', 'closed', 14),
	event('marquee dayclub', 'bijou', 17),
	event('wynn nightlife events', 'npu live mexico city', 18)
];

describe('date formatting', () => {
	test('formats in UTC', () => {
		expect(formatMonthDay('2026-10-16T00:00:00Z')).toBe('Oct 16');
		expect(formatWeekdayMonthDay('2026-10-16T00:00:00Z')).toBe('Fri Oct 16');
		expect(formatLongDate('2026-10-16T00:00:00Z')).toBe('Fri, Oct 16');
	});
});

describe('matchesSearchQuery', () => {
	test('ignores accents and case', () => {
		expect(matchesSearchQuery('tiësto', 'TIESTO')).toBe(true);
		expect(matchesSearchQuery('tiesto', 'tiësto')).toBe(true);
		expect(matchesSearchQuery('zedd', 'aoki')).toBe(false);
	});
});

describe('groupArtists', () => {
	test('counts named nights per artist, busiest first, skipping unnamed nights', () => {
		const artists = groupArtists(events);

		expect(artists.map(({ name, count }) => [name, count])).toEqual([
			['steve aoki', 3],
			['zedd', 2],
			['bijou', 1],
			['npu live mexico city', 1]
		]);
	});

	test('picks the next date and the short venue name', () => {
		const [aoki] = groupArtists(events);

		expect(aoki.next.eventDate).toBe('2026-10-16T00:00:00Z');
		expect(aoki.nextVenueName).toBe('Omnia');
	});
});

describe('getArtistDetail', () => {
	test('lists the artist dates in order with per-venue counts', () => {
		const detail = getArtistDetail(events, 'steve-aoki')!;

		expect(detail.name).toBe('steve aoki');
		expect(detail.events.map((e) => formatMonthDay(e.eventDate))).toEqual([
			'Oct 16',
			'Oct 23',
			'Oct 30'
		]);
		expect(detail.venues).toEqual([
			{ slug: 'omnia-nightclub', name: 'Omnia Nightclub', count: 2 },
			{ slug: 'marquee-nightclub', name: 'Marquee Nightclub', count: 1 }
		]);
	});

	test('returns undefined for an unknown artist', () => {
		expect(getArtistDetail(events, 'nobody')).toBeUndefined();
	});
});

describe('groupVenues', () => {
	test('lists every venue of the kind with its next headliners and regulars', () => {
		const venues = groupVenues(events, 'night');
		const omnia = venues.find(({ venue }) => venue.slug === 'omnia-nightclub')!;

		expect(venues).toHaveLength(9);
		expect(omnia.comingUp.map((e) => e.artist)).toEqual(['steve aoki', 'zedd', 'steve aoki']);
		expect(omnia.regulars).toEqual([
			{ slug: 'steve-aoki', name: 'steve aoki', count: 2 },
			{ slug: 'zedd', name: 'zedd', count: 2 }
		]);
	});

	test('excludes clubs missing from the venue map', () => {
		const slugs = [...groupVenues(events, 'night'), ...groupVenues(events, 'day')].map(
			({ venue }) => venue.slug
		);

		expect(slugs).not.toContain('wynn-nightlife-events');
		expect(slugs).toContain('marquee-dayclub');
	});
});

describe('getVenueDetail', () => {
	test('hides unnamed nights and only offers chips for repeat artists', () => {
		const detail = getVenueDetail(events, getVenueBySlug('omnia-nightclub')!);

		expect(detail.events).toHaveLength(4);
		expect(detail.artists.map(({ name }) => name)).toEqual(['steve aoki', 'zedd']);
	});
});

describe('formatRelativeTime', () => {
	const now = new Date('2026-10-14T12:00:00Z');

	test.each([
		['2026-10-14T11:59:30Z', 'just now'],
		['2026-10-14T11:45:00Z', '15 minutes ago'],
		['2026-10-14T09:00:00Z', '3 hours ago'],
		['2026-10-13T10:00:00Z', 'yesterday'],
		['2026-10-10T12:00:00Z', '4 days ago']
	])('%s → %s', (isoDate, expected) => {
		expect(formatRelativeTime(isoDate, now)).toBe(expected);
	});

	test('marks scrapes older than three days as stale', () => {
		expect(isStale('2026-10-12T12:00:00Z', now)).toBe(false);
		expect(isStale('2026-10-10T12:00:00Z', now)).toBe(true);
	});
});

describe('parseDateQuery', () => {
	test.each([
		['oct 31', { month: 9, day: 31 }],
		['Oct 31', { month: 9, day: 31 }],
		['October 31', { month: 9, day: 31 }],
		['october 31st', { month: 9, day: 31 }],
		['sat, oct 31', { month: 9, day: 31 }],
		['Saturday October 31', { month: 9, day: 31 }],
		['oct 31, 2026', { month: 9, day: 31, year: 2026 }],
		['sept 5', { month: 8, day: 5 }],
		['sep 5', { month: 8, day: 5 }],
		['10/31', { month: 9, day: 31 }],
		['10/31/2026', { month: 9, day: 31, year: 2026 }],
		['10/31/26', { month: 9, day: 31, year: 2026 }],
		['10-31', { month: 9, day: 31 }],
		['2026-10-31', { month: 9, day: 31, year: 2026 }],
		['2026-10', { month: 9, year: 2026 }],
		['october', { month: 9 }],
		['oct', { month: 9 }]
	])('%s is a date', (query, expected) => {
		expect(parseDateQuery(query)).toEqual({ day: undefined, year: undefined, ...expected });
	});

	test.each(['steve aoki', 'omnia', 'the chainsmokers', 'ma', '13/01', '10/32', 'friday', '31'])(
		'%s is not a date',
		(query) => {
			expect(parseDateQuery(query)).toBeNull();
		}
	);
});

describe('matchesDateQuery', () => {
	test('matches the exact day, not every day starting with the same digit', () => {
		const oct1 = parseDateQuery('oct 1')!;

		expect(matchesDateQuery('2026-10-01T00:00:00Z', oct1)).toBe(true);
		expect(matchesDateQuery('2026-10-16T00:00:00Z', oct1)).toBe(false);
	});

	test('checks the year only when one is given', () => {
		expect(matchesDateQuery('2027-01-01T00:00:00Z', parseDateQuery('1/1')!)).toBe(true);
		expect(matchesDateQuery('2027-01-01T00:00:00Z', parseDateQuery('1/1/2026')!)).toBe(false);
	});
});
