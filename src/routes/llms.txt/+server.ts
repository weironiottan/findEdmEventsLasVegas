import type { RequestHandler } from './$types';
import { fetchEvents } from '#lib/server/events.js';
import { formatLongDate, groupArtists } from '#lib/browse.js';
import { SITE_NAME, titleCase } from '#lib/seo.js';
import { VENUES } from '#lib/venues.js';

// llms.txt (https://llmstxt.org): a markdown overview of the site for language models
export const GET: RequestHandler = async ({ fetch, url }) => {
	const artists = groupArtists(await fetchEvents(fetch));
	const venueLinks = Object.values(VENUES).map(
		(venue) =>
			`- [${venue.name}](${url.origin}/venues/${venue.slug}): ${venue.kind === 'night' ? 'nightclub' : 'dayclub'} at ${venue.resort}`
	);
	const artistLinks = artists.map(
		(artist) =>
			`- [${titleCase(artist.name)}](${url.origin}/artists/${artist.slug}): ${artist.count} upcoming ${artist.count === 1 ? 'date' : 'dates'}, next ${formatLongDate(artist.next.eventDate)} at ${artist.nextVenueName}`
	);

	const body = `# ${SITE_NAME}

> A daily-updated calendar of upcoming EDM (electronic dance music) DJ shows at Las Vegas
> nightclubs and dayclubs, with dates, venues and ticket links.

Events are collected each day from the official club calendars. Each venue and artist page
lists every upcoming date.

- [Full calendar](${url.origin}/): every upcoming show by date
- [About](${url.origin}/about)

## Venues

${venueLinks.join('\n')}

## Artists

${artistLinks.join('\n')}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
