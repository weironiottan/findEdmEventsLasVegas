import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Layout from './+layout.svelte';

const page = vi.hoisted(() => ({ route: { id: '/' } }));
vi.mock('$app/state', () => ({ page }));

const props = {
	children: createRawSnippet(() => ({ render: () => '<p>page content</p>' })),
	params: {},
	data: {}
};

describe('/+layout.svelte', () => {
	test('renders the page content', () => {
		render(Layout, { props });

		expect(screen.getByText('page content')).toBeInTheDocument();
	});

	test('links to every page in the navigation', () => {
		render(Layout, { props });

		expect(screen.getAllByRole('link', { name: 'about' })[0]).toHaveAttribute('href', '/about');
		expect(screen.getAllByRole('link', { name: 'find EDM shows' })[0]).toHaveAttribute('href', '/');
		expect(screen.getAllByRole('link', { name: 'contact' })[0]).toHaveAttribute('href', '/contact');
	});

	test('shows the search bar on the home page', () => {
		page.route.id = '/';
		render(Layout, { props });

		expect(screen.getByPlaceholderText('Search for artists...')).toBeInTheDocument();
	});

	test('hides the search bar on other pages', () => {
		page.route.id = '/about';
		render(Layout, { props });

		expect(screen.queryByPlaceholderText('Search for artists...')).not.toBeInTheDocument();
	});
});
