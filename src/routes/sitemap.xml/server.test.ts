import { describe, test, expect, vi } from 'vitest';
import { GET } from './+server';
import type { EdmEventInterface } from '#lib/Types.js';

type RequestEvent = Parameters<typeof GET>[0];

const edmEvents: EdmEventInterface[] = [
	{
		Id: '1',
		ClubName: 'omnia nightclub',
		ArtistName: 'tiësto',
		EventDate: '2026-10-16T00:00:00Z',
		TicketUrl: 'https://example.com/1'
	}
];

describe('/sitemap.xml', () => {
	test('lists the homepage, venues and artists with absolute URLs', async () => {
		const response = await GET({
			fetch: vi.fn().mockResolvedValue(Response.json(edmEvents)),
			url: new URL('https://example.com/sitemap.xml')
		} as unknown as RequestEvent);
		const xml = await response.text();

		expect(response.headers.get('Content-Type')).toBe('application/xml');
		expect(xml).toContain('<loc>https://example.com/</loc>');
		expect(xml).toContain('<loc>https://example.com/venues/omnia-nightclub</loc>');
		expect(xml).toContain('<loc>https://example.com/artists/tiesto</loc>');
	});
});
