<script lang="ts">
	import type { Snippet } from 'svelte';
	import GlowBlobs from '#lib/GlowBlobs.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="relative mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6">
	<GlowBlobs />
	<div class="relative">
		{@render children()}
	</div>
</div>
