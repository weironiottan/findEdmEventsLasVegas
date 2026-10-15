import { describe, test, expect, vi } from 'vitest';
import { load } from './+page.server';
import type { EdmEventInterface } from '#lib/Types.js';

type LoadEvent = Parameters<typeof load>[0];

const edmEvents: EdmEventInterface[] = [
	{
		Id: '1',
		ClubName: 'omnia nightclub',
		ArtistName: 'tiësto',
		EventDate: '2026-10-16T00:00:00Z',
		TicketUrl: 'https://example.com/1'
	}
];

const loadVenue = (slug: string) =>
	load({
		fetch: vi.fn().mockResolvedValue(Response.json(edmEvents)),
		params: { slug }
	} as unknown as LoadEvent);

describe('/venues/[slug] load', () => {
	test('returns the venue matching the slug', async () => {
		const result = await loadVenue('omnia-nightclub');

		expect(result).toMatchObject({
			venueDetail: { venue: { name: 'Omnia Nightclub' }, events: [{ artist: 'tiësto' }] }
		});
	});

	test('404s for venues missing from the venue map', async () => {
		await expect(loadVenue('wynn-nightlife-events')).rejects.toMatchObject({ status: 404 });
	});
});
