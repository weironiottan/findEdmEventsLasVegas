import { describe, test, expect, vi } from 'vitest';
import { load } from './+page.server';
import type { EdmEventInterface } from '#lib/Types.js';

type LoadEvent = Parameters<typeof load>[0];

const edmEvents: EdmEventInterface[] = [
	{
		Id: '1',
		ClubName: 'hakkasan nightclub',
		ArtistName: 'lavern - halloween weekend',
		EventDate: '2025-04-10T00:00:00Z',
		TicketUrl: 'https://example.com/1'
	}
];

describe('/+page.server.ts load', () => {
	test('returns the normalized events from the API', async () => {
		const fetch = vi.fn().mockResolvedValue(Response.json(edmEvents));

		const result = await load({ fetch } as unknown as LoadEvent);

		expect(fetch).toHaveBeenCalledWith(
			'https://edm-events-las-vegas-api-223895091580.us-central1.run.app/find-edm/all-events'
		);
		expect(result).toEqual({
			edmEvents: [
				{
					id: '1',
					clubName: 'hakkasan nightclub',
					clubSlug: 'hakkasan-nightclub',
					title: 'lavern - halloween weekend',
					artist: 'lavern',
					artistSlug: 'lavern',
					tag: 'halloween weekend',
					eventDate: '2025-04-10T00:00:00Z',
					ticketUrl: 'https://example.com/1'
				}
			]
		});
	});

	test('throws an HTTP error with the API status when the request fails', async () => {
		const fetch = vi
			.fn()
			.mockResolvedValue(new Response(null, { status: 503, statusText: 'Service Unavailable' }));

		await expect(load({ fetch } as unknown as LoadEvent)).rejects.toMatchObject({
			status: 503,
			body: { message: 'Service Unavailable' }
		});
	});
});
