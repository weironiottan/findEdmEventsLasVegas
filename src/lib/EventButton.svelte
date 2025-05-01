<script lang="ts" >
    let { edmEvent }  = $props();
</script>

<a class="backdrop-blur-xl bg-gradient-to-r from-cyan-500/80 to-purple-600/80 border
            border-white/20 px-4 py-2 rounded-full  font-bold text-base transition-all
            duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:border-white/40"
   href="{edmEvent.TicketUrl}" target="_blank">View Event</a>