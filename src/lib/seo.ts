import type { EdmEvent } from '#lib/Types.js';
import { getVenueByClubName } from '#lib/venues.js';

export const SITE_NAME = 'Find EDM Shows Las Vegas';

// Street addresses for the resorts in VENUES, used in event structured data
const RESORT_ADDRESSES: Record<string, string> = {
	'Caesars Palace': '3570 S Las Vegas Blvd',
	'The Cosmopolitan': '3708 S Las Vegas Blvd',
	'MGM Grand': '3799 S Las Vegas Blvd',
	'The Venetian': '3355 S Las Vegas Blvd',
	Fontainebleau: '2777 S Las Vegas Blvd',
	Wynn: '3131 S Las Vegas Blvd',
	Encore: '3131 S Las Vegas Blvd',
	Aria: '3730 S Las Vegas Blvd',
	'Resorts World': '3000 S Las Vegas Blvd'
};

// API names are lowercase ("tiësto", "steve aoki"); titles and structured data read better cased
export const titleCase = (text: string) =>
	text
		.replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, letter: string) => sep + letter.toUpperCase())
		.replace(/\bDj\b/g, 'DJ');

function eventPlace(clubName: string) {
	const venue = getVenueByClubName(clubName);
	const streetAddress = venue && RESORT_ADDRESSES[venue.resort];
	return {
		'@type': 'Place',
		name: venue ? `${venue.name} at ${venue.resort}` : titleCase(clubName),
		address: {
			'@type': 'PostalAddress',
			...(streetAddress && { streetAddress }),
			addressLocality: 'Las Vegas',
			addressRegion: 'NV',
			addressCountry: 'US'
		}
	};
}

// schema.org MusicEvent for Google's event results. Event dates are calendar dates stored
// as UTC midnight, so only the date part is published.
export function musicEventJsonLd(event: EdmEvent) {
	const artist = event.artist && titleCase(event.artist);
	return {
		'@context': 'https://schema.org',
		'@type': 'MusicEvent',
		name: titleCase(event.title),
		startDate: event.eventDate.slice(0, 10),
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		location: eventPlace(event.clubName),
		...(artist && { performer: { '@type': 'PerformingGroup', name: artist } }),
		offers: { '@type': 'Offer', url: event.ticketUrl }
	};
}

// Serializes JSON-LD for a <script> tag; escaping "<" keeps "</script>" in data from closing it
export const jsonLdScript = (data: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
