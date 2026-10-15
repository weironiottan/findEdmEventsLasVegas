export const Months = [
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'jun',
	'jul',
	'aug',
	'sept',
	'oct',
	'nov',
	'dec'
];

export const Weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

// Raw event as returned by the API
export interface EdmEventInterface {
	Id: string;
	ClubName: string;
	ArtistName: string;
	EventDate: string;
	TicketUrl: string;
}

// Event after title normalization (see normalize.ts)
export interface EdmEvent {
	id: string;
	clubName: string;
	clubSlug: string;
	title: string;
	artist: string | null;
	artistSlug: string | null;
	tag: string | null;
	eventDate: string;
	ticketUrl: string;
}

export type VenueKind = 'night' | 'day';

export interface Venue {
	slug: string;
	name: string;
	shortName: string;
	resort: string;
	kind: VenueKind;
}
