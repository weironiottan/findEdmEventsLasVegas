<script lang="ts">
	let { edmEvent } = $props();
</script>

<a
	class="rounded-full border border-white/20 bg-gradient-to-r from-cyan-500/80
            to-purple-600/80 px-4 py-2 text-base font-bold backdrop-blur-xl transition-all
            duration-300 hover:border-white/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
	href={edmEvent.TicketUrl}
	target="_blank">View Event</a
>
