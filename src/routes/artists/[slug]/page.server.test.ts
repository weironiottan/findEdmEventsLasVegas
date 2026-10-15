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

const loadArtist = (slug: string) =>
	load({
		fetch: vi.fn().mockResolvedValue(Response.json(edmEvents)),
		params: { slug }
	} as unknown as LoadEvent);

describe('/artists/[slug] load', () => {
	test('returns the artist matching the slug', async () => {
		const result = await loadArtist('tiesto');

		expect(result).toMatchObject({ artist: { name: 'tiësto', slug: 'tiesto' } });
	});

	test('404s for an unknown artist', async () => {
		await expect(loadArtist('nobody')).rejects.toMatchObject({ status: 404 });
	});
});
