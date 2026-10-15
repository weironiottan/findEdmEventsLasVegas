<script lang="ts">
	import { setSearchQuery } from '#lib/sharedState.svelte.js';

	let { placeholder = 'Search for artists...' }: { placeholder?: string } = $props();

	let searchQuery = $state('');
	let debounceTimer: number;

	// Debounced search query effect
	$effect(() => {
		const query = searchQuery;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			setSearchQuery(query);
		}, 400);

		return () => clearTimeout(debounceTimer);
	});
</script>

<div
	class="flex w-full max-w-3xl overflow-hidden rounded-xl border border-white/25 bg-[rgba(15,10,35,0.7)]"
>
	<label for="search-input" class="sr-only">Search</label>
	<input
		class="min-h-12 flex-1 border-0 bg-transparent px-4 text-base font-bold text-white placeholder-white/60 focus:ring-2 focus:ring-cyan-400/60"
		type="text"
		id="search-input"
		autocomplete="off"
		autocapitalize="off"
		spellcheck="false"
		{placeholder}
		bind:value={searchQuery}
	/>
</div>
