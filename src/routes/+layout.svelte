<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div
	class="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-slate-200 antialiased"
>
	{@render children()}
</div>
