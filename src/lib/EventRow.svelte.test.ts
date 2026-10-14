import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import EventRow from './EventRow.svelte';

const edmEvent = {
	Id: '1',
	ClubName: 'hakkasan nightclub',
	ArtistName: 'lavern',
	EventDate: '2025-04-10T00:00:00Z',
	TicketUrl: 'https://example.com/tickets/1'
};

describe('EventRow.svelte', () => {
	test('renders the artist, club and date', () => {
		render(EventRow, { props: { edmEvent } });

		expect(screen.getByText('lavern')).toBeInTheDocument();
		expect(screen.getByText('hakkasan nightclub')).toBeInTheDocument();
		expect(screen.getByText('Thursday')).toBeInTheDocument();
	});

	test('links to the ticket page in a new tab', () => {
		render(EventRow, { props: { edmEvent } });

		const links = screen.getAllByRole('link', { name: 'View Event' });
		// One button for mobile and one for desktop layouts
		expect(links).toHaveLength(2);
		for (const link of links) {
			expect(link).toHaveAttribute('href', edmEvent.TicketUrl);
			expect(link).toHaveAttribute('target', '_blank');
		}
	});
});
