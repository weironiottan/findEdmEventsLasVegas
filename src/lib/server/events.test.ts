import { describe, test, expect, vi } from 'vitest';
import { fetchLastUpdated, LAST_UPDATED_URL } from './events';

describe('fetchLastUpdated', () => {
	test('returns the scrape time from the API', async () => {
		const fetch = vi.fn().mockResolvedValue(Response.json({ lastUpdated: '2026-10-14T09:00:00Z' }));

		expect(await fetchLastUpdated(fetch)).toBe('2026-10-14T09:00:00Z');
		expect(fetch).toHaveBeenCalledWith(LAST_UPDATED_URL);
	});

	test.each([
		[
			'the API has no scrape recorded',
			() => Response.json({ Description: 'none' }, { status: 404 })
		],
		['the API errors', () => new Response('oops', { status: 500 })],
		['the response is not JSON', () => new Response('<html>')],
		['the timestamp is not a date', () => Response.json({ lastUpdated: 'yesterday' })]
	])('returns null when %s', async (_, response) => {
		expect(await fetchLastUpdated(vi.fn().mockResolvedValue(response()))).toBeNull();
	});

	test('returns null when the request fails', async () => {
		expect(
			await fetchLastUpdated(vi.fn().mockRejectedValue(new TypeError('fetch failed')))
		).toBeNull();
	});
});
