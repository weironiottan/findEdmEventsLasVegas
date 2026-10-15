import { describe, test, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import SiteHeader from './SiteHeader.svelte';

const page = vi.hoisted(() => ({ data: {} as { lastUpdated?: string | null } }));
vi.mock('$app/state', () => ({ page }));

describe('SiteHeader.svelte', () => {
	afterEach(() => {
		vi.useRealTimers();
		page.data = {};
	});

	test('links to the home, about and contact pages', () => {
		render(SiteHeader);

		expect(screen.getAllByRole('link', { name: 'home' })[0]).toHaveAttribute('href', '/');
		expect(screen.getAllByRole('link', { name: 'about' })[0]).toHaveAttribute('href', '/about');
		expect(screen.getAllByRole('link', { name: 'contact' })[0]).toHaveAttribute('href', '/contact');
		expect(screen.queryByRole('link', { name: 'find EDM shows' })).not.toBeInTheDocument();
	});

	test('says shows update daily until the API reports a scrape time', () => {
		page.data = { lastUpdated: null };
		render(SiteHeader);

		expect(screen.getByText('Shows updated daily')).toBeInTheDocument();
	});

	test('shows how long ago the shows were updated', () => {
		vi.useFakeTimers({ now: new Date('2026-10-14T12:00:00Z') });
		page.data = { lastUpdated: '2026-10-14T09:00:00Z' };
		render(SiteHeader);

		const indicator = screen.getByText('Shows updated 3 hours ago');
		expect(indicator).toHaveAttribute('title');
		expect(indicator.querySelector('.bg-green-400')).toBeInTheDocument();
	});

	test('turns the dot amber when the scrape is stale', () => {
		vi.useFakeTimers({ now: new Date('2026-10-14T12:00:00Z') });
		page.data = { lastUpdated: '2026-10-10T12:00:00Z' };
		render(SiteHeader);

		expect(
			screen.getByText('Shows updated 4 days ago').querySelector('.bg-amber-400')
		).toBeInTheDocument();
	});
});
