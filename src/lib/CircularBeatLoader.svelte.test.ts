import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import CircularBeatLoader from './CircularBeatLoader.svelte';

describe('CircularBeatLoader.svelte', () => {
	test('shows the loading text by default', () => {
		render(CircularBeatLoader);

		expect(screen.getByText('Fetching Edm Events...')).toBeInTheDocument();
	});

	test('hides the loading text when showText is false', () => {
		render(CircularBeatLoader, { props: { showText: false } });

		expect(screen.queryByText('Fetching Edm Events...')).not.toBeInTheDocument();
	});

	test('applies the requested size', () => {
		const { container } = render(CircularBeatLoader, { props: { size: 'large' } });

		expect(container.querySelector('.w-32.h-32')).toBeInTheDocument();
	});

	test('falls back to medium for an unknown size', () => {
		const { container } = render(CircularBeatLoader, { props: { size: 'huge' } });

		expect(container.querySelector('.w-24.h-24')).toBeInTheDocument();
	});
});
