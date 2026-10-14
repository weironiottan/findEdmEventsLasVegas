import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import edmEvents from '#lib/edmEvents.json';

describe('/+page.svelte', () => {
	test('should render a row per event', () => {
		const sampleEvents = edmEvents.slice(0, 3);
		render(Page, { props: { data: { edmEvents: sampleEvents } } });

		for (const edmEvent of sampleEvents) {
			expect(screen.getAllByText(edmEvent.ArtistName).length).toBeGreaterThan(0);
		}
		expect(screen.getAllByRole('link', { name: 'View Event' })).toHaveLength(
			sampleEvents.length * 2
		);
	});
});
