<script lang="ts">
	import EventRow from '#lib/EventRow.svelte';
	import { getSearchQuery } from './sharedState.svelte';
	import type { EdmEvent } from '#lib/Types.js';
	import CircularBeatLoader from '#lib/CircularBeatLoader.svelte';
	import { matchesDateQuery, matchesSearchQuery, monthName, parseDateQuery } from '#lib/browse.js';
	import { Months, Weekdays } from '#lib/Types.js';

	let { edmEvents }: { edmEvents?: EdmEvent[] } = $props();

	// Free text: title, venue, weekday and month as shown on the row ("sept", "friday")
	function searchableText(edmEvent: EdmEvent) {
		const date = new Date(edmEvent.eventDate);
		return [
			edmEvent.title,
			edmEvent.clubName,
			Weekdays[date.getUTCDay()],
			Months[date.getUTCMonth()],
			monthName(edmEvent.eventDate)
		].join(' ');
	}

	const dateQuery = $derived(parseDateQuery(getSearchQuery()));

	function matches(edmEvent: EdmEvent, searchQuery: string) {
		if (dateQuery && matchesDateQuery(edmEvent.eventDate, dateQuery)) return true;
		// A specific date ("oct 1") must match exactly, so "oct 1" doesn't also match Oct 10-19.
		// A lone month word ("mar") may still be the start of a venue or artist name.
		if (dateQuery && (dateQuery.day !== undefined || dateQuery.year !== undefined)) return false;
		return matchesSearchQuery(searchableText(edmEvent), searchQuery);
	}

	const filteredEvents = $derived(
		getSearchQuery()
			? (edmEvents ?? []).filter((edmEvent) => matches(edmEvent, getSearchQuery()))
			: (edmEvents ?? [])
	);
</script>

{#if edmEvents}
	{#each filteredEvents as edmEvent (edmEvent.id)}
		<EventRow {edmEvent} />
	{:else}
		<p class="p-4 text-lg font-semibold">No shows match “{getSearchQuery()}”.</p>
	{/each}
{:else}
	<CircularBeatLoader size="large" />
{/if}
