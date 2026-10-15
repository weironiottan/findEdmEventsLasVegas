import type { LayoutServerLoad } from './$types';
import { fetchLastUpdated } from '#lib/server/events.js';

export const load: LayoutServerLoad = async ({ fetch }) => {
	return { lastUpdated: await fetchLastUpdated(fetch) };
};
