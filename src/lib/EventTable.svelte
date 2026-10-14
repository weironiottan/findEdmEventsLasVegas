<script lang="ts">
	import EventRow from '#lib/EventRow.svelte';
	import { getSearchQuery, getSelectedCategory } from './sharedState.svelte';
	import { EdmEventInputId, type EdmEventInterface } from '#lib/Types.js';
	import CircularBeatLoader from '#lib/CircularBeatLoader.svelte';

	let { data } = $props();
	const normalizeSearchText = (text: string) =>
		text
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();

	function matchesSearchQuery(text: string, searchQuery: string): boolean {
		return normalizeSearchText(text).includes(normalizeSearchText(searchQuery));
	}

	function filterEvents(edmEvents: EdmEventInterface[], searchQuery: string) {
		let filteredEdmEventsData: EdmEventInterface[] = [];

		switch (getSelectedCategory()) {
			case EdmEventInputId.artistName:
				filteredEdmEventsData = edmEvents.filter((edmEvent: EdmEventInterface) =>
					matchesSearchQuery(edmEvent.ArtistName, searchQuery)
				);
				break;

			case EdmEventInputId.venue:
				filteredEdmEventsData = edmEvents.filter((edmEvent: EdmEventInterface) =>
					matchesSearchQuery(edmEvent.ClubName, searchQuery)
				);
				break;

			case EdmEventInputId.inputDate:
				filteredEdmEventsData = edmEvents.filter((edmEvent: EdmEventInterface) =>
					edmEvent.EventDate.includes(searchQuery)
				);
				break;
		}
		return filteredEdmEventsData;
	}
</script>

{#if data.edmEvents}
	{#if getSearchQuery()}
		{#each filterEvents(data.edmEvents, getSearchQuery()) as edmEvent (edmEvent.Id)}
			<EventRow {edmEvent} />
		{/each}
	{:else}
		{#each data.edmEvents as edmEvent (edmEvent.Id)}
			<EventRow {edmEvent} />
		{/each}
	{/if}
{:else}
	<CircularBeatLoader size={'large'} />
{/if}
