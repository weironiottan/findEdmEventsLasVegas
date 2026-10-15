<script lang="ts">
	import { resolve } from '$app/paths';
	import { Arrow, DetailEventRow, FilterChips, Hero, PageBody, Panel } from '#lib';
	import { formatLongDate } from '#lib/browse.js';
	import { getVenueByClubName } from '#lib/venues.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const artist = $derived(data.artist);
	const next = $derived(artist.events[0]);
	const venueName = (clubName: string) => getVenueByClubName(clubName)?.name ?? clubName;

	let selectedVenue: string | null = $state(null);
	const shownEvents = $derived(
		selectedVenue ? artist.events.filter((e) => e.clubSlug === selectedVenue) : artist.events
	);
</script>

<svelte:head>
	<title>{artist.name} in Las Vegas · Find EDM Shows Las Vegas</title>
</svelte:head>

<Hero>
	<div class="flex flex-col gap-[18px] pt-2">
		<a
			href="{resolve('/')}?tab=artists"
			class="text-shadow-hero inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-bold tracking-wider uppercase hover:text-white"
		>
			<Arrow direction="left" size={18} />
			All artists
		</a>
		<div class="flex flex-wrap items-center gap-6">
			<div
				class="hero-avatar h-[104px] w-[104px] border-2 border-white/35"
				aria-hidden="true"
			></div>
			<div class="flex flex-col gap-2">
				<h1 class="edm-nights-text text-5xl leading-[1.05] font-extrabold capitalize sm:text-6xl">
					{artist.name}
				</h1>
				<p class="text-shadow-hero text-lg font-semibold">
					{artist.events.length} upcoming Las Vegas {artist.events.length === 1 ? 'date' : 'dates'}
					· Next: {formatLongDate(next.eventDate)} at {venueName(next.clubName)}
				</p>
			</div>
		</div>
	</div>
</Hero>

<PageBody>
	<div class="flex flex-col gap-[18px]">
		<FilterChips
			label="Filter by venue"
			allLabel="All venues"
			total={artist.events.length}
			options={artist.venues}
			bind:selected={selectedVenue}
		/>
		<Panel>
			<div class="flex flex-col gap-2.5">
				{#each shownEvents as edmEvent (edmEvent.id)}
					<DetailEventRow {edmEvent}>{venueName(edmEvent.clubName)}</DetailEventRow>
				{/each}
			</div>
		</Panel>
	</div>
</PageBody>
