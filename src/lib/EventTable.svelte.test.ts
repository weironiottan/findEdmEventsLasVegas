import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import EventTable from './EventTable.svelte';
import { setSearchQuery } from './sharedState.svelte';
import { testEvent } from '../test/testEvents';

const edmEvents = [
	testEvent('hakkasan nightclub', 'tiësto', '2025-04-10T00:00:00Z'),
	testEvent('xs nightclub', 'john summit', '2025-05-02T00:00:00Z'),
	testEvent('omnia', 'fisher', '2025-05-03T00:00:00Z'),
	testEvent('marquee nightclub', 'kaskade', '2025-05-30T00:00:00Z'),
	testEvent('jewel nightclub', 'mark knight', '2025-09-05T00:00:00Z')
];

const allTitles = ['tiësto', 'john summit', 'fisher', 'kaskade', 'mark knight'];

function search(query: string) {
	setSearchQuery(query);
	flushSync();
}

function renderedTitles() {
	return edmEvents.map((edmEvent) => edmEvent.title).filter((title) => screen.queryByText(title));
}

describe('EventTable.svelte', () => {
	beforeEach(() => {
		setSearchQuery('');
	});

	test('shows the loader while there are no events', () => {
		render(EventTable, { props: {} });

		expect(screen.getByText('Fetching Edm Events...')).toBeInTheDocument();
	});

	test('renders every event when there is no search query', () => {
		render(EventTable, { props: { edmEvents } });

		expect(renderedTitles()).toEqual(allTitles);
		expect(screen.queryByText('Fetching Edm Events...')).not.toBeInTheDocument();
	});

	test.each([
		['summit', ['john summit']],
		['John Summit', ['john summit']],
		['tiesto', ['tiësto']],
		['tiësto', ['tiësto']],
		['XS', ['john summit']],
		['nightclub', ['tiësto', 'john summit', 'kaskade', 'mark knight']],
		['2025-05', ['john summit', 'fisher', 'kaskade']],
		['2025-05-03', ['fisher']],
		['may 3', ['fisher']],
		['May 3rd', ['fisher']],
		['may 30', ['kaskade']],
		['5/3', ['fisher']],
		['05/03/2025', ['fisher']],
		['5/3/24', []],
		['sat, may 3', ['fisher']],
		['september 5', ['mark knight']],
		['sept', ['mark knight']],
		['saturday', ['fisher']],
		// A lone month abbreviation also matches names starting with it
		['mar', ['kaskade', 'mark knight']]
	])('filters by "%s"', (query, expected) => {
		render(EventTable, { props: { edmEvents } });

		search(query);

		expect(renderedTitles()).toEqual(expected);
	});

	test('says so when no events match', () => {
		render(EventTable, { props: { edmEvents } });

		search('nobody');

		expect(renderedTitles()).toEqual([]);
		expect(screen.getByText('No shows match “nobody”.')).toBeInTheDocument();
	});

	test('shows every event again when the query is cleared', () => {
		render(EventTable, { props: { edmEvents } });

		search('fisher');
		search('');

		expect(renderedTitles()).toEqual(allTitles);
	});
});
