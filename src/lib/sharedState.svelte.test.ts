import { describe, test, expect, afterEach } from 'vitest';
import {
	getSearchPropsState,
	getSearchQuery,
	getSelectedCategory,
	setSearchQuery,
	setSelectedCategory
} from './sharedState.svelte';
import { EdmEventInputId } from './Types';

describe('sharedState', () => {
	afterEach(() => {
		setSearchQuery('');
		setSelectedCategory('');
	});

	test('starts with an empty query and category', () => {
		expect(getSearchQuery()).toBe('');
		expect(getSelectedCategory()).toBe('');
	});

	test('setSearchQuery updates the search query', () => {
		setSearchQuery('fisher');
		expect(getSearchQuery()).toBe('fisher');
		expect(getSearchPropsState().searchQuery).toBe('fisher');
	});

	test('setSelectedCategory updates the selected category', () => {
		setSelectedCategory(EdmEventInputId.venue);
		expect(getSelectedCategory()).toBe(EdmEventInputId.venue);
		expect(getSearchPropsState().selectedCategory).toBe(EdmEventInputId.venue);
	});
});
