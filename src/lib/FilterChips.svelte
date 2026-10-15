<script lang="ts">
	import type { Count } from '#lib/browse.js';

	let {
		label,
		allLabel,
		total,
		options,
		selected = $bindable(null)
	}: {
		label: string;
		allLabel: string;
		total: number;
		options: Count[];
		selected?: string | null;
	} = $props();

	const chipClass = (active: boolean) =>
		`${active ? 'pill-active' : 'pill-dark'} min-h-11 px-[18px] text-[15px] font-bold capitalize transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]`;
</script>

<div role="group" aria-label={label} class="flex flex-wrap gap-2.5">
	<button
		type="button"
		class={chipClass(selected === null)}
		aria-pressed={selected === null}
		onclick={() => (selected = null)}
		>{allLabel} <span class="text-[13px] opacity-80">×{total}</span></button
	>
	{#each options as option (option.slug)}
		<button
			type="button"
			class={chipClass(selected === option.slug)}
			aria-pressed={selected === option.slug}
			onclick={() => (selected = option.slug)}
			>{option.name} <span class="text-[13px] opacity-80">×{option.count}</span></button
		>
	{/each}
</div>
