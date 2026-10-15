import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import EventDate from './EventDate.svelte';

describe('EventDate.svelte', () => {
	test('renders month, day, weekday and year', () => {
		render(EventDate, { props: { eventDate: '2025-04-10T00:00:00Z' } });

		expect(screen.getByText('apr')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
		expect(screen.getByText('Thursday')).toBeInTheDocument();
		expect(screen.getByText('2025')).toBeInTheDocument();
	});

	test('formats in UTC so late-night events keep their listed date', () => {
		render(EventDate, { props: { eventDate: '2025-01-01T03:00:00Z' } });

		expect(screen.getByText('jan')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('Wednesday')).toBeInTheDocument();
	});

	test('uses the "sept" abbreviation for September', () => {
		render(EventDate, { props: { eventDate: '2025-09-20T00:00:00Z' } });

		expect(screen.getByText('sept')).toBeInTheDocument();
	});

	test('handles the last day of the year', () => {
		render(EventDate, { props: { eventDate: '2025-12-31T00:00:00Z' } });

		expect(screen.getByText('dec')).toBeInTheDocument();
		expect(screen.getByText('31')).toBeInTheDocument();
		expect(screen.getByText('Wednesday')).toBeInTheDocument();
		expect(screen.getByText('2025')).toBeInTheDocument();
	});
});
