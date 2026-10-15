import { describe, test, expect, afterEach } from 'vitest';
import { getSearchPropsState, getSearchQuery, setSearchQuery } from './sharedState.svelte';

describe('sharedState', () => {
	afterEach(() => {
		setSearchQuery('');
	});

	test('starts with an empty query', () => {
		expect(getSearchQuery()).toBe('');
	});

	test('setSearchQuery updates the search query', () => {
		setSearchQuery('fisher');
		expect(getSearchQuery()).toBe('fisher');
		expect(getSearchPropsState().searchQuery).toBe('fisher');
	});
});
