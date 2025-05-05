import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { EdmEventInterface } from '$lib/Types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response : Response = await fetch(`https://edm-events-las-vegas-api-223895091580.us-central1.run.app/find-edm/all-events`);
	if (!response.ok) {
		return error(response.status, response.statusText);
	}

	const edmEvents: [EdmEventInterface] = await response.json();
	// Used for debugging code so we don't needlessly make a fetch request
	// const edmEvents = edmEventsJSON;
	return {edmEvents: edmEvents};
};