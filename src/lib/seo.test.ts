import { describe, test, expect } from 'vitest';
import { jsonLdScript, musicEventJsonLd, titleCase } from '#lib/seo.js';
import { testEvent } from '../test/testEvents';

describe('titleCase', () => {
	test('capitalizes each word, including accented and hyphenated ones', () => {
		expect(titleCase('tiësto')).toBe('Tiësto');
		expect(titleCase('steve aoki - race weekend')).toBe('Steve Aoki - Race Weekend');
		expect(titleCase('jaÿ-z')).toBe('Jaÿ-Z');
		expect(titleCase('ritual sundays - dj franzen')).toBe('Ritual Sundays - DJ Franzen');
	});
});

describe('musicEventJsonLd', () => {
	test('describes a headliner night at a known venue', () => {
		const event = testEvent('omnia nightclub', 'steve aoki', '2026-10-16T00:00:00Z');

		expect(musicEventJsonLd(event)).toMatchObject({
			'@type': 'MusicEvent',
			name: 'Steve Aoki',
			startDate: '2026-10-16',
			location: {
				name: 'Omnia Nightclub at Caesars Palace',
				address: { streetAddress: '3570 S Las Vegas Blvd', addressLocality: 'Las Vegas' }
			},
			performer: { name: 'Steve Aoki' },
			offers: { url: event.ticketUrl }
		});
	});

	test('falls back to the club name and city for unmapped clubs and leaves out a missing performer', () => {
		const ld = musicEventJsonLd(
			testEvent('wynn nightlife events', 'omnia nightclub thursday', '2026-10-15T00:00:00Z')
		);

		expect(ld.location.name).toBe('Wynn Nightlife Events');
		expect(ld.location.address).not.toHaveProperty('streetAddress');
		expect(ld).not.toHaveProperty('performer');
	});
});

describe('jsonLdScript', () => {
	test('escapes "<" so data cannot close the script tag', () => {
		const script = jsonLdScript({ name: '</script><script>alert(1)</script>' });

		expect(script).toBe(
			'<script type="application/ld+json">{"name":"\\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}</script>'
		);
	});
});
