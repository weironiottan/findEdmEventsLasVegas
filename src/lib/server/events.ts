import { error } from '@sveltejs/kit';
import type { EdmEvent, EdmEventInterface } from '#lib/Types.js';
import { normalizeEvent } from '#lib/normalize.js';

const API_BASE_URL = 'https://edm-events-las-vegas-api-223895091580.us-central1.run.app/find-edm';

export const ALL_EVENTS_URL = `${API_BASE_URL}/all-events`;
export const LAST_UPDATED_URL = `${API_BASE_URL}/last-updated`;

export async function fetchEvents(fetch: typeof globalThis.fetch): Promise<EdmEvent[]> {
	const response: Response = await fetch(ALL_EVENTS_URL);
	if (!response.ok) {
		error(response.status, response.statusText);
	}

	const edmEvents: EdmEventInterface[] = await response.json();
	return edmEvents.map(normalizeEvent);
}

// When the scrape job last refreshed the events. The header falls back to
// "Shows updated daily" on null, so any failure here must not break the page.
export async function fetchLastUpdated(fetch: typeof globalThis.fetch): Promise<string | null> {
	try {
		const response = await fetch(LAST_UPDATED_URL);
		if (!response.ok) return null;

		const { lastUpdated } = await response.json();
		return typeof lastUpdated === 'string' && !Number.isNaN(Date.parse(lastUpdated))
			? lastUpdated
			: null;
	} catch {
		return null;
	}
}
