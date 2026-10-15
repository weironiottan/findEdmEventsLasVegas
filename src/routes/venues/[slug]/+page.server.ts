import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchEvents } from '#lib/server/events.js';
import { getVenueDetail } from '#lib/browse.js';
import { getVenueBySlug } from '#lib/venues.js';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const venue = getVenueBySlug(params.slug);
	if (!venue) {
		error(404, 'Venue not found');
	}
	return { venueDetail: getVenueDetail(await fetchEvents(fetch), venue) };
};
