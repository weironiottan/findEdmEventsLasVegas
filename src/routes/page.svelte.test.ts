import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/svelte';
import Page from './+page.svelte';
import { testEvent } from '../test/testEvents';

const page = vi.hoisted(() => ({ url: new URL('http://localhost/'), data: {} }));
vi.mock('$app/state', () => ({ page }));

const edmEvents = [
	testEvent('omnia nightclub', 'steve aoki', '2026-10-16T00:00:00Z'),
	testEvent('omnia nightclub', 'steve aoki - race weekend', '2026-10-23T00:00:00Z'),
	testEvent('marquee dayclub', 'bijou', '2026-10-17T00:00:00Z'),
	testEvent('omnia nightclub', 'omnia nightclub thursday', '2026-10-15T00:00:00Z')
];

const renderTab = (search: string) => {
	page.url = new URL(`http://localhost/${search}`);
	return render(Page, {
		props: { data: { edmEvents, lastUpdated: null }, form: undefined, params: {} }
	});
};

describe('/+page.svelte', () => {
	beforeEach(() => {
		page.url = new URL('http://localhost/');
	});

	test('defaults to the Dates tab with a row per event', () => {
		renderTab('');

		for (const edmEvent of edmEvents) {
			expect(screen.getByText(edmEvent.title)).toBeInTheDocument();
		}
		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(edmEvents.length * 2);
		expect(screen.getByRole('link', { name: 'Dates' })).toHaveAttribute('aria-current', 'page');
		expect(screen.getByPlaceholderText('Search for dates...')).toBeInTheDocument();
	});

	test('keeps the tabs in the URL with counts', () => {
		renderTab('');
		const tabs = within(screen.getByRole('navigation', { name: 'Browse by' }));

		expect(tabs.getByRole('link', { name: 'Artists 2' })).toHaveAttribute('href', '/?tab=artists');
		expect(tabs.getByRole('link', { name: 'Venues 14' })).toHaveAttribute('href', '/?tab=venues');
	});

	test('shows one card per headliner on the Artists tab', () => {
		renderTab('?tab=artists');

		expect(screen.getByRole('link', { name: 'Artists 2' })).toHaveAttribute('aria-current', 'page');
		expect(screen.getByRole('link', { name: 'All 2 dates for steve aoki' })).toHaveAttribute(
			'href',
			'/artists/steve-aoki'
		);
		expect(screen.getByRole('link', { name: 'All 1 date for bijou' })).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Search for artists...')).toBeInTheDocument();
	});

	test('shows nightclubs by default on the Venues tab', () => {
		renderTab('?tab=venues');

		expect(screen.getByRole('link', { name: 'Nightclubs 9' })).toHaveAttribute(
			'aria-current',
			'page'
		);
		expect(screen.getByRole('link', { name: 'Full schedule for Omnia Nightclub' })).toHaveAttribute(
			'href',
			'/venues/omnia-nightclub'
		);
		expect(screen.queryByText('Marquee Dayclub')).not.toBeInTheDocument();
	});

	test('switches to dayclubs with ?kind=day', () => {
		renderTab('?tab=venues&kind=day');

		expect(screen.getByText('Marquee Dayclub')).toBeInTheDocument();
		expect(screen.queryByText('Omnia Nightclub')).not.toBeInTheDocument();
	});

	test('shows the chat placeholder', () => {
		renderTab('');
		const chat = within(screen.getByRole('complementary', { name: 'Assistant' }));

		expect(chat.getByText('Ask the lineup')).toBeInTheDocument();
		expect(chat.getByText('Soon')).toBeInTheDocument();
		expect(chat.getByLabelText('Message')).toBeDisabled();
		expect(chat.getByRole('button', { name: 'Send' })).toBeDisabled();
	});
});
