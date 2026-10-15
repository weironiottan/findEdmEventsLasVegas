<script lang="ts">
	import { resolve } from '$app/paths';
	import Arrow from '#lib/Arrow.svelte';
	import { formatMonthDay, type ArtistSummary } from '#lib/browse.js';

	let { artist }: { artist: ArtistSummary } = $props();
</script>

<article
	class="flex flex-col gap-2.5 rounded-xl border border-white/20 bg-white/10 p-[18px] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/15"
>
	<div class="flex items-center gap-3">
		<div class="hero-avatar h-12 w-12" aria-hidden="true"></div>
		<h3 class="text-[22px] font-extrabold tracking-wide capitalize">{artist.name}</h3>
	</div>
	<div class="text-[15px]">
		Next: <strong>{formatMonthDay(artist.next.eventDate)}</strong> · {artist.nextVenueName}
	</div>
	<a
		class="pill-frosted self-start"
		href={resolve('/artists/[slug]', { slug: artist.slug })}
		aria-label="All {artist.count} {artist.count === 1 ? 'date' : 'dates'} for {artist.name}"
	>
		{artist.count}
		{artist.count === 1 ? 'date' : 'dates'}
		<Arrow />
	</a>
</article>
