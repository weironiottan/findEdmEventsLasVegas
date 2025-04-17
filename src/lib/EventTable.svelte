<script lang="ts">
    import EventRow from "$lib/EventRow.svelte";

    let { data } = $props();

</script>

<p>Here goes the eventpage, This will contain the Event Data or atleast the box that contains it</p>

{#if data.edmEvents}
    {#each data.edmEvents as edmEvent (edmEvent.Id)}
        <EventRow {edmEvent} />
    {/each}
{/if}