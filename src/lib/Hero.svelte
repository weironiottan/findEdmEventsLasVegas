<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteHeader from '#lib/SiteHeader.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<section class="hero">
	<SiteHeader />
	{#if children}
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
			{@render children()}
		</div>
	{/if}
</section>
