<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<main class="rounded-xl border border-white/30 bg-white/15 p-4 backdrop-blur-xl sm:p-5 {className}">
	{@render children()}
</main>
