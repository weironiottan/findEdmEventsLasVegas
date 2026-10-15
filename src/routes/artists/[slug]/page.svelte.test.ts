import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, within } from '@testing-library/svelte';
import Page from './+page.svelte';
import { getArtistDetail } from '#lib/browse.js';
import { testEvent } from '../../../test/testEvents';

const page = vi.hoisted(() => ({ data: {} }));
vi.mock('$app/state', () => ({ page }));

const artist = getArtistDetail(
	[
		testEvent('omnia nightclub', 'steve aoki', '2026-10-16T00:00:00Z'),
		testEvent('omnia nightclub', 'steve aoki - race weekend', '2026-11-20T00:00:00Z'),
		testEvent(
			'marquee nightclub',
			'dawn 2 dusk - steve aoki - halloween weekend',
			'2026-10-31T00:00:00Z'
		)
	],
	'steve-aoki'
)!;

const renderPage = () =>
	render(Page, {
		props: { data: { artist, lastUpdated: null }, form: undefined, params: { slug: 'steve-aoki' } }
	});

describe('/artists/[slug]/+page.svelte', () => {
	test('summarizes the upcoming dates', () => {
		renderPage();

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('steve aoki');
		expect(
			screen.getByText('3 upcoming Las Vegas dates · Next: Fri, Oct 16 at Omnia Nightclub')
		).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'All artists' })).toHaveAttribute(
			'href',
			'/?tab=artists'
		);
	});

	test('lists every date with the venue as the main line and its tag', () => {
		renderPage();

		expect(within(screen.getByRole('main')).getAllByText('Omnia Nightclub')).toHaveLength(2);
		expect(screen.getByText('dawn 2 dusk · halloween weekend')).toBeInTheDocument();
		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(3);
	});

	test('filters by venue', async () => {
		renderPage();

		await fireEvent.click(screen.getByRole('button', { name: 'Marquee Nightclub ×1' }));

		expect(screen.getByRole('button', { name: 'Marquee Nightclub ×1' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(1);

		await fireEvent.click(screen.getByRole('button', { name: 'All venues ×3' }));

		expect(screen.getAllByRole('link', { name: 'View event' })).toHaveLength(3);
	});
});
