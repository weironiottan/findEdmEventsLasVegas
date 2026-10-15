import type { PageServerLoad } from './$types';
import { fetchEvents } from '#lib/server/events.js';

export const load: PageServerLoad = async ({ fetch }) => {
	return { edmEvents: await fetchEvents(fetch) };
};
