import type {LayoutServerLoad} from './$types.js';
import edmEventsJSON from "../lib/edmEvents.json"
import type {EdmEventInterface} from "$lib/Types";

export const load: LayoutServerLoad = async ({
 		fetch
}:{
	fetch: typeof globalThis.fetch
}) => {
	// const response = await fetch(`https://edm-events-las-vegas-api-223895091580.us-central1.run.app/find-edm/all-events`);
	// const edmEvents: [EdmEventInterface] = await response.json();
	// Used for debugging code so we don't needlessly make a fetch request
	const edmEvents = edmEventsJSON;
	return { edmEvents };
};

