<script lang="ts">
	import { resolve } from '$app/paths';
	import Arrow from '#lib/Arrow.svelte';
	import { formatWeekdayMonthDay, type VenueSummary } from '#lib/browse.js';

	let { summary }: { summary: VenueSummary } = $props();
	const { venue, comingUp, regulars } = $derived(summary);
</script>

<article
	class="flex flex-col gap-3.5 rounded-xl border border-white/20 bg-white/10 p-[18px] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/15"
>
	<div>
		<h3 class="text-[22px] font-extrabold tracking-wide">{venue.name}</h3>
		<div class="mt-0.5 text-sm opacity-85">{venue.resort}</div>
	</div>
	<div>
		<div class="mb-1.5 text-xs font-bold tracking-widest uppercase opacity-85">Coming up</div>
		{#if comingUp.length}
			<ul class="flex flex-col gap-1">
				{#each comingUp as edmEvent (edmEvent.id)}
					<li class="flex gap-3 text-[15px]">
						<span class="w-[92px] shrink-0 font-bold"
							>{formatWeekdayMonthDay(edmEvent.eventDate)}</span
						>
						<span class="capitalize">{edmEvent.artist}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-[15px] opacity-85">No headliners announced yet</p>
		{/if}
	</div>
	{#if regulars.length}
		<div>
			<div class="mb-1.5 text-xs font-bold tracking-widest uppercase opacity-85">Regulars</div>
			<div class="flex flex-wrap gap-1.5">
				{#each regulars as regular (regular.slug)}
					<span class="tag-pill capitalize">{regular.name} ×{regular.count}</span>
				{/each}
			</div>
		</div>
	{/if}
	<a
		class="pill-frosted mt-auto self-start"
		href={resolve('/venues/[slug]', { slug: venue.slug })}
		aria-label="Full schedule for {venue.name}"
	>
		Full schedule
		<Arrow />
	</a>
</article>
