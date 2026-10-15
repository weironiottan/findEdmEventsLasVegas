import type { EdmEvent, EdmEventInterface } from '#lib/Types.js';
import { slugify } from '#lib/venues.js';

export interface ParsedTitle {
	artist: string | null;
	tag: string | null;
}

// Recurring parties that are not a DJ. On their own they are an unnamed night; with a DJ
// ("ritual sundays - dj franzen", "r&bae wednesdays w/ dj franzen") they become the tag.
const PARTIES = [
	'dawn 2 dusk',
	'house every weekend',
	'r&bae wednesdays',
	'ritual sundays',
	'worship thursdays',
	'good life fridays',
	'drift wednesdays',
	'marquee mondays',
	'daycation thursdays',
	'lowkey in the library',
	'thursdays on the terrace',
	'deseo: latin sundays',
	'the count of hakkasan',
	'sala de despecho',
	'roads of fury',
	'perreoland',
	'reggaetonlandia',
	'simp city',
	'emo nite'
];

// "<club> <weekday>" placeholders, e.g. "omnia nightclub thursday", "marquee dome saturday"
const CLUB_NIGHT =
	/^(omnia|marquee|hakkasan|tao|liv|xs|jewel|zouk|ayu)( nightclub| dayclub| dome| skybar)*( (mon|tues|wednes|thurs|fri|satur|sun)day)?$/;

const OCCASION = /(weekend|race week|new year.s eve|edition|celebration|dia de los muertos)$/;

const CONNECTOR = / (w\/|with special guests?|with support by|with|b2b) /;

// Long-tail titles the rules above can't untangle
const OVERRIDES: Record<string, ParsedTitle> = {
	'20th anniversary of ace of spades presented by armand de brignac and jaÿ-z': {
		artist: 'jaÿ-z',
		tag: 'ace of spades 20th anniversary'
	},
	'lvp party 2026 feat mashbit': { artist: 'mashbit', tag: 'lvp party 2026' }
};

// Splits a segment that names an artist into the artist and any extra tag text
function parseArtistSegment(segment: string): { artist: string | null; tag: string | null } {
	let match = segment.match(/^(?:the )?official (.+?) (?:with|w\/) (.+)$/);
	if (match) return { artist: match[2], tag: match[1] };

	match = segment.match(/^(?:the )?official (.+)$/);
	if (match) return { artist: null, tag: match[1] };

	match = segment.match(/^sounds by (.+)$/);
	if (match) return { artist: match[1], tag: null };

	match = segment.match(/^(.+?): (?:an )?(?:official )?(.+)$/);
	if (match) return { artist: match[1], tag: match[2] };

	match = segment.match(/^(.+?) \[(.+)\]$/);
	if (match) return { artist: match[1], tag: match[2] };

	match = segment.match(/^(.+?) at (omnia|marquee|hakkasan|tao|liv|xs|jewel|zouk|ayu|encore)\b.*$/);
	if (match) return { artist: match[1], tag: null };

	const connector = segment.match(CONNECTOR);
	if (connector && connector.index !== undefined) {
		return {
			artist: segment.slice(0, connector.index),
			tag: segment.slice(connector.index + 1)
		};
	}

	return { artist: segment, tag: null };
}

export function parseTitle(rawTitle: string): ParsedTitle {
	const title = rawTitle.trim().toLowerCase();
	if (OVERRIDES[title]) return OVERRIDES[title];
	if (/^closed\b/.test(title)) return { artist: null, tag: null };

	let artist: string | null = null;
	const tags: string[] = [];

	for (const segment of title.split(/\s+-\s+/)) {
		if (CLUB_NIGHT.test(segment)) continue;

		const party = PARTIES.find((name) => segment === name || segment.startsWith(name + ' '));
		if (party) {
			tags.push(party);
			const rest = segment.slice(party.length).trim();
			const guest = rest.match(/^(?:w\/|with|feat\.?) (.+)$/);
			if (guest && !artist) artist = guest[1];
			else if (rest) tags.push(rest);
			continue;
		}

		if (artist || OCCASION.test(segment)) {
			tags.push(segment);
			continue;
		}

		const parsed = parseArtistSegment(segment);
		artist = parsed.artist;
		if (parsed.tag) tags.push(parsed.tag);
	}

	return { artist, tag: tags.length ? tags.join(' · ') : null };
}

export function normalizeEvent(event: EdmEventInterface): EdmEvent {
	const { artist, tag } = parseTitle(event.ArtistName);
	return {
		id: event.Id,
		clubName: event.ClubName,
		clubSlug: slugify(event.ClubName),
		title: event.ArtistName,
		artist,
		artistSlug: artist ? slugify(artist) : null,
		tag,
		eventDate: event.EventDate,
		ticketUrl: event.TicketUrl
	};
}
