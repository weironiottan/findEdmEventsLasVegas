<script lang="ts">
    import EventRow from "$lib/EventRow.svelte";
    import {getSearchQuery, getSelectedCategory} from "./sharedState.svelte";
    import {EdmEventInputId, type EdmEventInterface} from "$lib/Types";

    let { data } = $props();
    const filterTextAccents = (searchQuery: string) => searchQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    function filterArtistNames(artistName: string, searchQuery: string): Boolean {
        artistName = filterTextAccents(artistName)
        return artistName.includes(searchQuery)
    }

    function filterEvents(edmEvents: [EdmEventInterface], searchQuery: string) {
        let filteredEdmEventsData: EdmEventInterface[] = [];

        switch(getSelectedCategory()) {
            case EdmEventInputId.artistName:
                filteredEdmEventsData = edmEvents.filter((edmEvent: EdmEventInterface) => filterArtistNames(edmEvent.ArtistName,searchQuery))
            break;

            case EdmEventInputId.venue:
                filteredEdmEventsData = edmEvents.filter((edmEvent: EdmEventInterface) => edmEvent.ClubName.includes(searchQuery))
            break;

            case EdmEventInputId.inputDate:
                filteredEdmEventsData = edmEvents.filter((edmEvent:EdmEventInterface) => edmEvent.EventDate.includes(searchQuery))
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
    {:else }
        {#each data.edmEvents as edmEvent (edmEvent.Id)}
            <EventRow {edmEvent} />
        {/each}
    {/if}
{/if}