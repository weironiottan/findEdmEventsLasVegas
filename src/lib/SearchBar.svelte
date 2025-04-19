<script>

	let props = $props()
	let selectedCategory = $state('artistName')
	let searchQuery = $state('');
</script>

<div class="relative w-7/12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl overflow-hidden z-10 flex ">
	<input class="flex-1 font-bold  bg-transparent border-r border-white/20 text-white placeholder-white/60 " type="text" id="search-input" placeholder="Search for artists, venues..." bind:value={searchQuery} />
</div>

