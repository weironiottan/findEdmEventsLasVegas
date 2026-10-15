<script lang="ts">
	import { resolve } from '$app/paths';
	import { Arrow, DetailEventRow, FilterChips, Hero, PageBody, Panel } from '#lib';
	import { formatLongDate, formatMonthDay } from '#lib/browse.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { venue, events, artists } = $derived(data.venueDetail);
	const next = $derived(events[0]);
	const last = $derived(events.at(-1));

	let selectedArtist: string | null = $state(null);
	const shownEvents = $derived(
		selectedArtist ? events.filter((e) => e.artistSlug === selectedArtist) : events
	);
</script>

<svelte:head>
	<title>{venue.name} schedule · Find EDM Shows Las Vegas</title>
</svelte:head>

<Hero>
	<div class="flex flex-col gap-[18px] pt-2">
		<a
			href="{resolve('/')}?tab=venues&kind={venue.kind}"
			class="text-shadow-hero inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-bold tracking-wider uppercase hover:text-white"
		>
			<Arrow direction="left" size={18} />
			All venues
		</a>
		<div class="flex flex-col gap-2.5">
			<div class="flex flex-wrap gap-2">
				{#each [venue.kind === 'night' ? 'Nightclub' : 'Dayclub', venue.resort] as label (label)}
					<span
						class="pill-dark border-white/30 px-3 py-1 text-[13px] font-bold tracking-wider uppercase"
						>{label}</span
					>
				{/each}
			</div>
			<h1 class="edm-nights-text text-5xl leading-[1.05] font-extrabold sm:text-6xl">
				{venue.name}
			</h1>
			<p class="text-shadow-hero text-lg font-semibold">
				{#if next && last}
					{events.length} headliner {events.length === 1 ? 'night' : 'nights'} through {formatMonthDay(
						last.eventDate
					)} · Next: {formatLongDate(next.eventDate)} —
					<span class="capitalize">{next.artist}</span>
				{:else}
					No headliners announced yet
				{/if}
			</p>
		</div>
	</div>
</Hero>

<PageBody>
	<div class="flex flex-col gap-[18px]">
		{#if artists.length}
			<FilterChips
				label="Filter by artist"
				allLabel="All artists"
				total={events.length}
				options={artists}
				bind:selected={selectedArtist}
			/>
		{/if}
		<Panel>
			<div class="flex flex-col gap-2.5">
				{#each shownEvents as edmEvent (edmEvent.id)}
					<DetailEventRow {edmEvent}>
						<a
							class="hover:text-cyan-200 hover:underline hover:underline-offset-4"
							href={resolve('/artists/[slug]', { slug: edmEvent.artistSlug! })}>{edmEvent.artist}</a
						>
					</DetailEventRow>
				{:else}
					<p class="p-4 text-lg font-semibold">Check back soon for this venue's lineup.</p>
				{/each}
			</div>
		</Panel>
	</div>
</PageBody>
