import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import SearchBar from './SearchBar.svelte';
import { getSearchQuery, setSearchQuery } from './sharedState.svelte';

describe('SearchBar.svelte', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		setSearchQuery('');
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('defaults to the artist placeholder', () => {
		render(SearchBar);

		expect(screen.getByPlaceholderText('Search for artists...')).toBeInTheDocument();
	});

	test('uses the placeholder it is given', () => {
		render(SearchBar, { props: { placeholder: 'Search for venue...' } });

		expect(screen.getByLabelText('Search')).toHaveAttribute('placeholder', 'Search for venue...');
	});

	test('debounces the search query by 400ms', async () => {
		render(SearchBar);

		await fireEvent.input(screen.getByLabelText('Search'), { target: { value: 'fisher' } });

		vi.advanceTimersByTime(399);
		expect(getSearchQuery()).toBe('');

		vi.advanceTimersByTime(1);
		expect(getSearchQuery()).toBe('fisher');
	});

	test('only applies the last query when typing quickly', async () => {
		render(SearchBar);
		const input = screen.getByLabelText('Search');

		await fireEvent.input(input, { target: { value: 'fis' } });
		vi.advanceTimersByTime(200);
		await fireEvent.input(input, { target: { value: 'fisher' } });
		vi.advanceTimersByTime(200);
		expect(getSearchQuery()).toBe('');

		vi.advanceTimersByTime(200);
		expect(getSearchQuery()).toBe('fisher');
	});
});
