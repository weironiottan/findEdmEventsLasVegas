import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { getVenueDetail } from '#lib/browse.js';
import { getVenueBySlug } from '#lib/venues.js';
import { testEvent } from '../../../test/testEvents';

const page = vi.hoisted(() => ({ url: new URL('http://localhost/'), data: {} }));
vi.mock('$app/state', () => ({ page }));

const venueDetail = getVenueDetail(
	[
		testEvent('omnia nightclub', 'steve aoki', '2026-10-16T00:00:00Z'),
		testEvent('omnia nightclub', 'zedd', '2026-10-17T00:00:00Z'),
		testEvent('omnia nightclub', "steve aoki - new year's eve", '2026-12-31T00:00:00Z'),
		testEvent('omnia nightclub', 'omnia nightclub thursday', '2026-10-15T00:00:00Z')
	],
	getVenueBySlug('omnia-nightclub')!
);

const renderPage = () =>
	render(Page, {
		props: {
			data: { venueDetail, lastUpdated: null },
			form: undefined,
			params: { slug: 'omnia-nightclub' }
		}
	});

describe('/venues/[slug]/+page.svelte', () => {
	test('summarizes the headliner nights', () => {
		renderPage();

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Omnia Nightclub');
		expect(screen.getByText('Nightclub')).toBeInTheDocument();
		expect(screen.getByText('Caesars Palace')).toBeInTheDocument();
		expect(
			screen.getByText(/3 headliner nights through Dec 31 · Next: Fri, Oct 16/)
		).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'All venues' })).toHaveAttribute(
			'href',
			'/?tab=venues&kind=night'
		);
	});

	test('hides unnamed nights and links artists to their page', () => {
		renderPage();

		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(3);
		expect(screen.getByRole('link', { name: 'zedd' })).toHaveAttribute('href', '/artists/zedd');
	});

	test('only offers chips for artists with two or more nights', async () => {
		renderPage();

		expect(screen.queryByRole('button', { name: /zedd/ })).not.toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: 'steve aoki ×2' }));

		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(2);
	});
});
