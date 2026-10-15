<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import {
		ArtistCard,
		ChatRail,
		EventTable,
		Hero,
		PageBody,
		Panel,
		SearchBar,
		Seo,
		VenueCard
	} from '#lib';
	import { countVenues, groupArtists, groupVenues, matchesSearchQuery } from '#lib/browse.js';
	import { SITE_NAME } from '#lib/seo.js';
	import { getSearchQuery } from '#lib/sharedState.svelte.js';
	import type { VenueKind } from '#lib/Types.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	type Tab = 'dates' | 'artists' | 'venues';
	const tab: Tab = $derived.by(() => {
		const param = page.url.searchParams.get('tab');
		return param === 'artists' || param === 'venues' ? param : 'dates';
	});
	const kind: VenueKind = $derived(page.url.searchParams.get('kind') === 'day' ? 'day' : 'night');

	const artists = $derived(groupArtists(data.edmEvents));
	const filteredArtists = $derived(
		artists.filter((artist) => matchesSearchQuery(artist.name, getSearchQuery()))
	);
	const filteredVenues = $derived(
		groupVenues(data.edmEvents, kind).filter(({ venue }) =>
			matchesSearchQuery(`${venue.name} ${venue.resort}`, getSearchQuery())
		)
	);

	const tabs: { id: Tab; label: string; count: () => number | null }[] = [
		{ id: 'dates', label: 'Dates', count: () => null },
		{ id: 'artists', label: 'Artists', count: () => artists.length },
		{ id: 'venues', label: 'Venues', count: () => countVenues('night') + countVenues('day') }
	];
	const kinds: { id: VenueKind; label: string }[] = [
		{ id: 'night', label: 'Nightclubs' },
		{ id: 'day', label: 'Dayclubs' }
	];
	const placeholders: Record<Tab, string> = {
		dates: 'Search for dates...',
		artists: 'Search for artists...',
		venues: 'Search for venue...'
	};

	const pillClass = (active: boolean) =>
		`${active ? 'pill-active' : 'pill-dark'} min-h-11 font-bold uppercase transition-all duration-300 hover:border-white/40 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]`;
</script>

<Seo
	title="{SITE_NAME} · EDM Club Calendar"
	description="Every upcoming EDM show at Las Vegas nightclubs and dayclubs — Omnia, XS, Zouk, Marquee, Encore Beach Club and more. Browse by date, artist or venue, updated daily."
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: page.url.origin
	}}
/>

<Hero>
	<div class="flex flex-col items-center gap-5 pt-14 pb-6 text-center">
		<h1
			class="edm-nights-text text-4xl font-extrabold tracking-tight sm:text-[52px] sm:leading-tight"
		>
			Find EDM Shows Las Vegas
		</h1>
		<nav aria-label="Browse by" class="flex flex-wrap justify-center gap-2.5">
			{#each tabs as { id, label, count } (id)}
				<a
					href="{resolve('/')}?tab={id}"
					data-sveltekit-reset="false"
					data-sveltekit-replacestate
					aria-current={tab === id ? 'page' : undefined}
					class="{pillClass(tab === id)} px-[22px] text-[17px] tracking-wide"
				>
					{label}
					{#if count() !== null}
						<span class="text-[13px] font-semibold opacity-75">{count()}</span>
					{/if}
				</a>
			{/each}
		</nav>
		<SearchBar placeholder={placeholders[tab]} />
	</div>
</Hero>

<PageBody>
	<div class="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
		<Panel class="min-w-0">
			{#if tab === 'dates'}
				<EventTable edmEvents={data.edmEvents} />
			{:else if tab === 'artists'}
				<div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
					{#each filteredArtists as artist (artist.slug)}
						<ArtistCard {artist} />
					{:else}
						<p class="p-4 text-lg font-semibold">No artists match “{getSearchQuery()}”.</p>
					{/each}
				</div>
			{:else}
				<nav aria-label="Club type" class="mb-4 flex flex-wrap gap-2.5">
					{#each kinds as { id, label } (id)}
						<a
							href="{resolve('/')}?tab=venues&kind={id}"
							data-sveltekit-reset="false"
							data-sveltekit-replacestate
							aria-current={kind === id ? 'page' : undefined}
							class="{pillClass(kind === id)} px-[22px] text-[15px] tracking-wide"
						>
							{label} <span class="text-[13px] opacity-80">{countVenues(id)}</span>
						</a>
					{/each}
				</nav>
				<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
					{#each filteredVenues as summary (summary.venue.slug)}
						<VenueCard {summary} />
					{:else}
						<p class="p-4 text-lg font-semibold">No venues match “{getSearchQuery()}”.</p>
					{/each}
				</div>
			{/if}
		</Panel>
		<ChatRail />
	</div>
</PageBody>
