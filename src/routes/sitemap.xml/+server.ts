import type { RequestHandler } from './$types';
import { fetchEvents } from '#lib/server/events.js';
import { groupArtists } from '#lib/browse.js';
import { VENUES } from '#lib/venues.js';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const artists = groupArtists(await fetchEvents(fetch));
	const paths = [
		'/',
		'/about',
		...Object.values(VENUES).map((venue) => `/venues/${venue.slug}`),
		...artists.map((artist) => `/artists/${artist.slug}`)
	];
	const urls = paths.map((path) => `\t<url><loc>${url.origin}${path}</loc></url>`).join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
		{ headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } }
	);
};
