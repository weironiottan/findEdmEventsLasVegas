import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import EventRow from './EventRow.svelte';
import { testEvent } from '../test/testEvents';

const edmEvent = testEvent('hakkasan nightclub', 'lavern', '2025-04-10T00:00:00Z');

describe('EventRow.svelte', () => {
	test('renders the title, club and date', () => {
		render(EventRow, { props: { edmEvent } });

		expect(screen.getByText('lavern')).toBeInTheDocument();
		expect(screen.getByText('hakkasan nightclub')).toBeInTheDocument();
		expect(screen.getByText('Thursday')).toBeInTheDocument();
	});

	test('links to the ticket page in a new tab', () => {
		render(EventRow, { props: { edmEvent } });

		const links = screen.getAllByRole('link', { name: 'View event' });
		// One button for mobile and one for desktop layouts
		expect(links).toHaveLength(2);
		for (const link of links) {
			expect(link).toHaveAttribute('href', edmEvent.ticketUrl);
			expect(link).toHaveAttribute('target', '_blank');
		}
	});
});
