import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Layout from './+layout.svelte';

const props = {
	children: createRawSnippet(() => ({ render: () => '<p>page content</p>' })),
	params: {},
	data: { lastUpdated: null }
};

describe('/+layout.svelte', () => {
	test('renders the page content', () => {
		render(Layout, { props });

		expect(screen.getByText('page content')).toBeInTheDocument();
	});
});
