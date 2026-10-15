import { describe, test, expect } from 'vitest';
import { normalizeEvent, parseTitle } from './normalize';

describe('parseTitle', () => {
	test.each([
		['steve aoki', 'steve aoki', null],
		['steve aoki - race weekend', 'steve aoki', 'race weekend'],
		[
			'dawn 2 dusk - steve aoki - halloween weekend',
			'steve aoki',
			'dawn 2 dusk · halloween weekend'
		],
		[
			'martin garrix w/ justin mylo - halloween weekend',
			'martin garrix',
			'w/ justin mylo · halloween weekend'
		],
		[
			'official designercon kick off party with steve aoki',
			'steve aoki',
			'designercon kick off party'
		],
		['house every weekend - kuta', 'kuta', 'house every weekend'],
		['r&bae wednesdays w/ dj franzen', 'dj franzen', 'r&bae wednesdays'],
		['ritual sundays - dj franzen', 'dj franzen', 'ritual sundays'],
		['hakkasan friday - mike attack', 'mike attack', null],
		[
			'dj e-rock - worship thursdays - race weekend',
			'dj e-rock',
			'worship thursdays · race weekend'
		],
		['diplo b2b hugel', 'diplo', 'b2b hugel'],
		['hugel with support by grossomoddo', 'hugel', 'with support by grossomoddo'],
		['rüfüs du sol [dj set]', 'rüfüs du sol', 'dj set'],
		['illenium at omnia dayclub - nighttime edition', 'illenium', 'nighttime edition'],
		[
			'fisher: an official formula 1 heineken las vegas grand prix afterparty',
			'fisher',
			'formula 1 heineken las vegas grand prix afterparty'
		],
		[
			'the official hot import nights kick off party - sounds by dj vice',
			'dj vice',
			'hot import nights kick off party'
		],
		['roads of fury w/ alesso', 'alesso', 'roads of fury'],
		['lvp party 2026 feat mashbit', 'mashbit', 'lvp party 2026']
	])('%s → %s', (title, artist, tag) => {
		expect(parseTitle(title)).toEqual({ artist, tag });
	});

	test.each([
		'closed',
		'closed for dome installation',
		'omnia nightclub thursday',
		'marquee dome saturday',
		'marquee dome thursday - race weekend',
		'tao nightclub - worship thursdays',
		'omnia skybar - new year’s eve',
		'deseo: latin sundays',
		'deseo: latin sundays - race weekend',
		'deseo: latin sundays - dia de los muertos',
		'thursdays on the terrace',
		'lowkey in the library',
		'marquee mondays'
	])('%s is an unnamed night', (title) => {
		expect(parseTitle(title).artist).toBeNull();
	});

	test('ignores surrounding whitespace and case', () => {
		expect(parseTitle('  Steve Aoki - Race Weekend ')).toEqual({
			artist: 'steve aoki',
			tag: 'race weekend'
		});
	});
});

describe('normalizeEvent', () => {
	test('maps the API shape and adds slugs', () => {
		expect(
			normalizeEvent({
				Id: '1',
				ClubName: 'omnia nightclub',
				ArtistName: 'tiësto - halloween weekend',
				EventDate: '2026-10-30T00:00:00Z',
				TicketUrl: 'https://example.com/1'
			})
		).toEqual({
			id: '1',
			clubName: 'omnia nightclub',
			clubSlug: 'omnia-nightclub',
			title: 'tiësto - halloween weekend',
			artist: 'tiësto',
			artistSlug: 'tiesto',
			tag: 'halloween weekend',
			eventDate: '2026-10-30T00:00:00Z',
			ticketUrl: 'https://example.com/1'
		});
	});

	test('leaves the artist slug empty for unnamed nights', () => {
		const event = normalizeEvent({
			Id: '2',
			ClubName: 'marquee nightclub',
			ArtistName: 'closed',
			EventDate: '2026-10-30T00:00:00Z',
			TicketUrl: 'https://example.com/2'
		});

		expect(event.artist).toBeNull();
		expect(event.artistSlug).toBeNull();
	});
});
