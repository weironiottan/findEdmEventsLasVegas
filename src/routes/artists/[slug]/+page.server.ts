import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fetchEvents } from '#lib/server/events.js';
import { getArtistDetail } from '#lib/browse.js';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const artist = getArtistDetail(await fetchEvents(fetch), params.slug);
	if (!artist) {
		error(404, 'Artist not found');
	}
	return { artist };
};
