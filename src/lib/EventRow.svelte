<script lang="ts">

    let { edmEvent } = $props();

</script>
<h3>This is the event row</h3>
<ul>
    <li>{edmEvent.Id}</li>
    <li>{edmEvent.ClubName}</li>
    <li>{edmEvent.ArtistName}</li>
    <li>{edmEvent.EventDate}</li>
    <li>{edmEvent.TicketUrl}</li>
</ul>