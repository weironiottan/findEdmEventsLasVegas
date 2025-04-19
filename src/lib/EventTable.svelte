<script lang="ts">
    import EventRow from "$lib/EventRow.svelte";

    let { data } = $props();

</script>

{#if data.edmEvents}
    {#each data.edmEvents as edmEvent (edmEvent.Id)}
        <EventRow {edmEvent} />
    {/each}
{/if}