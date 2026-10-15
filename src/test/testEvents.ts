import { normalizeEvent } from '#lib/normalize.js';

let nextId = 0;

// Builds a normalized event from the raw API fields for tests
export const testEvent = (ClubName: string, ArtistName: string, EventDate: string) =>
	normalizeEvent({
		Id: String(++nextId),
		ClubName,
		ArtistName,
		EventDate,
		TicketUrl: `https://example.com/${nextId}`
	});
