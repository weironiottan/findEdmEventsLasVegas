<script lang="ts">

    let { edmEvent } = $props();

</script>
    <div class=" flex justify-around w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-cyan-500/30 transition-all duration-300 relative">
        <div class="{edmEvent.EventDate}"></div>
        <div class="">Artist Image</div>
        <div class="">{edmEvent.ArtistName}</div>
        <div class="">{edmEvent.ClubName}</div>
        <div class="{edmEvent.EventDate}"></div>
        <div class="">Ticket Button URL goes here</div>
    </div>

<!--<ul>-->
<!--    <li>{edmEvent.Id}</li>-->
<!--    <li>{edmEvent.ClubName}</li>-->
<!--    <li>{edmEvent.ArtistName}</li>-->
<!--    <li>{edmEvent.EventDate}</li>-->
<!--    <li>{edmEvent.TicketUrl}</li>-->
<!--</ul>-->