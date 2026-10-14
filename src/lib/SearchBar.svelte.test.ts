import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import SearchBar from './SearchBar.svelte';
import {
	getSearchQuery,
	getSelectedCategory,
	setSearchQuery,
	setSelectedCategory
} from './sharedState.svelte';
import { EdmEventInputId } from './Types';

describe('SearchBar.svelte', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		setSearchQuery('');
		setSelectedCategory('');
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('defaults to searching by artist name', () => {
		render(SearchBar);

		expect(screen.getByPlaceholderText('Search for artists...')).toBeInTheDocument();
		expect(getSelectedCategory()).toBe(EdmEventInputId.artistName);
	});

	test('debounces the search query by 400ms', async () => {
		render(SearchBar);

		await fireEvent.input(screen.getByPlaceholderText('Search for artists...'), {
			target: { value: 'fisher' }
		});

		vi.advanceTimersByTime(399);
		expect(getSearchQuery()).toBe('');

		vi.advanceTimersByTime(1);
		expect(getSearchQuery()).toBe('fisher');
	});

	test('only applies the last query when typing quickly', async () => {
		render(SearchBar);
		const input = screen.getByPlaceholderText('Search for artists...');

		await fireEvent.input(input, { target: { value: 'fis' } });
		vi.advanceTimersByTime(200);
		await fireEvent.input(input, { target: { value: 'fisher' } });
		vi.advanceTimersByTime(200);
		expect(getSearchQuery()).toBe('');

		vi.advanceTimersByTime(200);
		expect(getSearchQuery()).toBe('fisher');
	});

	test.each([
		{ label: 'Venue', placeholder: 'Search for venue...', category: EdmEventInputId.venue },
		{ label: 'Date', placeholder: 'Search for dates...', category: EdmEventInputId.inputDate }
	])('switches to the $label category', async ({ label, placeholder, category }) => {
		vi.useRealTimers();
		render(SearchBar);

		await fireEvent.mouseDown(screen.getByRole('button', { name: 'Artist Name' }));
		await fireEvent.click(await screen.findByText(label));

		expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
		expect(getSelectedCategory()).toBe(category);
		// Selecting a category closes the menu
		await waitFor(() =>
			expect(document.getElementById(EdmEventInputId.artistName)).not.toBeInTheDocument()
		);
	});
});
