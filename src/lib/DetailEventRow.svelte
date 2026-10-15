<script lang="ts">
	import type { Snippet } from 'svelte';
	import EventButton from '#lib/EventButton.svelte';
	import type { EdmEvent } from '#lib/Types.js';
	import { Months, Weekdays } from '#lib/Types.js';

	// Row for the artist and venue pages: date | main line (+ tag) | View event
	let { edmEvent, children }: { edmEvent: EdmEvent; children: Snippet } = $props();

	const date = $derived(new Date(edmEvent.eventDate));
</script>

<div
	class="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 capitalize backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/15"
>
	<div class="w-[120px] shrink-0">
		<div class="flex gap-2.5 text-[28px] font-extrabold">
			<span>{Months[date.getUTCMonth()]}</span><span>{date.getUTCDate()}</span>
		</div>
		<div class="flex items-baseline gap-2.5">
			<span class="font-medium">{Weekdays[date.getUTCDay()]}</span>
			<span class="text-sm">{date.getUTCFullYear()}</span>
		</div>
	</div>
	<div class="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
		<div class="text-[22px] font-bold tracking-wider">{@render children()}</div>
		{#if edmEvent.tag}
			<span class="tag-pill">{edmEvent.tag}</span>
		{/if}
	</div>
	<EventButton ticketUrl={edmEvent.ticketUrl} />
</div>
