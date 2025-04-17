<script lang="ts">

	let { data } = $props();

</script>

<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>


{#if data.edmEvents}
	{#each data.edmEvents as edmEvent (edmEvent.Id)}
		<h1> Edm Event</h1>
		<ul>
			<li>{edmEvent.Id}</li>
			<li>{edmEvent.ClubName}</li>
			<li>{edmEvent.ArtistName}</li>
			<li>{edmEvent.EventDate}</li>
			<li>{edmEvent.TicketUrl}</li>
		</ul>
		{/each}
{/if}