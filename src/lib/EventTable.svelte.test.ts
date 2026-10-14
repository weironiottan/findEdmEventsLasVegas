import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import EventTable from './EventTable.svelte';
import { setSearchQuery, setSelectedCategory } from './sharedState.svelte';
import { EdmEventInputId, type EdmEventInterface } from './Types';

const edmEvents: EdmEventInterface[] = [
	{
		Id: '1',
		ClubName: 'hakkasan nightclub',
		ArtistName: 'tiësto',
		EventDate: '2025-04-10T00:00:00Z',
		TicketUrl: 'https://example.com/1'
	},
	{
		Id: '2',
		ClubName: 'xs nightclub',
		ArtistName: 'john summit',
		EventDate: '2025-05-02T00:00:00Z',
		TicketUrl: 'https://example.com/2'
	},
	{
		Id: '3',
		ClubName: 'omnia',
		ArtistName: 'fisher',
		EventDate: '2025-05-03T00:00:00Z',
		TicketUrl: 'https://example.com/3'
	}
];

function search(category: EdmEventInputId, query: string) {
	setSelectedCategory(category);
	setSearchQuery(query);
	flushSync();
}

function renderedArtists() {
	return edmEvents
		.map((edmEvent) => edmEvent.ArtistName)
		.filter((artistName) => screen.queryByText(artistName));
}

describe('EventTable.svelte', () => {
	beforeEach(() => {
		setSearchQuery('');
		setSelectedCategory(EdmEventInputId.artistName);
	});

	test('shows the loader while there are no events', () => {
		render(EventTable, { props: { data: {} } });

		expect(screen.getByText('Fetching Edm Events...')).toBeInTheDocument();
	});

	test('renders every event when there is no search query', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		expect(renderedArtists()).toEqual(['tiësto', 'john summit', 'fisher']);
		expect(screen.queryByText('Fetching Edm Events...')).not.toBeInTheDocument();
	});

	test('filters by artist name', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.artistName, 'summit');

		expect(renderedArtists()).toEqual(['john summit']);
	});

	test('ignores accents in artist names', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.artistName, 'tiesto');

		expect(renderedArtists()).toEqual(['tiësto']);
	});

	test('filters by venue', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.venue, 'nightclub');

		expect(renderedArtists()).toEqual(['tiësto', 'john summit']);
	});

	test('filters by date', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.inputDate, '2025-05');

		expect(renderedArtists()).toEqual(['john summit', 'fisher']);
	});

	test('renders nothing when no events match', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.artistName, 'nobody');

		expect(renderedArtists()).toEqual([]);
	});

	test('shows every event again when the query is cleared', () => {
		render(EventTable, { props: { data: { edmEvents } } });

		search(EdmEventInputId.artistName, 'fisher');
		search(EdmEventInputId.artistName, '');

		expect(renderedArtists()).toEqual(['tiësto', 'john summit', 'fisher']);
	});
});
