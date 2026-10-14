import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import ErrorPage from './+error.svelte';

vi.mock('$app/state', () => ({ page: { error: { message: 'Internal Error' } } }));

describe('/+error.svelte', () => {
	test('shows the error heading', () => {
		render(ErrorPage);

		expect(screen.getByText('Well This is Embarrassing....')).toBeInTheDocument();
	});

	test('shows a randomly chosen funny message', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0);
		render(ErrorPage);

		expect(
			screen.getByText(
				"Looks like our server decided to take an unscheduled coffee break. We're sending it back to work!"
			)
		).toBeInTheDocument();
	});
});
