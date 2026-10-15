import type { Venue, VenueKind } from '#lib/Types.js';

export function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

const venue = (
	clubName: string,
	name: string,
	shortName: string,
	resort: string,
	kind: VenueKind
): Venue => ({ slug: slugify(clubName), name, shortName, resort, kind });

// Clubs listed on the Venues tab, keyed by the API's ClubName. Clubs missing from this map
// (e.g. "wynn nightlife events", which lists concerts) still show up on the Dates tab.
export const VENUES: Record<string, Venue> = {
	'omnia nightclub': venue(
		'omnia nightclub',
		'Omnia Nightclub',
		'Omnia',
		'Caesars Palace',
		'night'
	),
	'marquee nightclub': venue(
		'marquee nightclub',
		'Marquee Nightclub',
		'Marquee',
		'The Cosmopolitan',
		'night'
	),
	'hakkasan nightclub': venue(
		'hakkasan nightclub',
		'Hakkasan Nightclub',
		'Hakkasan',
		'MGM Grand',
		'night'
	),
	'tao nightclub': venue('tao nightclub', 'TAO Nightclub', 'TAO', 'The Venetian', 'night'),
	'liv las vegas': venue('liv las vegas', 'LIV Las Vegas', 'LIV', 'Fontainebleau', 'night'),
	'xs nightclub': venue('xs nightclub', 'XS Nightclub', 'XS', 'Wynn', 'night'),
	'encore beach club at night': venue(
		'encore beach club at night',
		'Encore Beach Club at Night',
		'EBC at Night',
		'Encore',
		'night'
	),
	'jewel nightclub': venue('jewel nightclub', 'Jewel Nightclub', 'Jewel', 'Aria', 'night'),
	'zouk nightclub': venue('zouk nightclub', 'Zouk Nightclub', 'Zouk', 'Resorts World', 'night'),
	'marquee dayclub': venue(
		'marquee dayclub',
		'Marquee Dayclub',
		'Marquee Dayclub',
		'The Cosmopolitan',
		'day'
	),
	'omnia dayclub': venue(
		'omnia dayclub',
		'Omnia Dayclub',
		'Omnia Dayclub',
		'Caesars Palace',
		'day'
	),
	'encore beach club': venue(
		'encore beach club',
		'Encore Beach Club',
		'Encore Beach Club',
		'Encore',
		'day'
	),
	'palm tree beach club': venue(
		'palm tree beach club',
		'Palm Tree Beach Club',
		'Palm Tree',
		'MGM Grand',
		'day'
	),
	'ayu dayclub': venue('ayu dayclub', 'Ayu Dayclub', 'Ayu', 'Resorts World', 'day')
};

export const getVenueByClubName = (clubName: string): Venue | undefined => VENUES[clubName];

export const getVenueBySlug = (slug: string): Venue | undefined =>
	Object.values(VENUES).find((venue) => venue.slug === slug);
