<script lang="ts">
	import Arrow from '#lib/Arrow.svelte';

	const prompts = [
		"Who's playing Halloween weekend?",
		'When is Martin Garrix next in town?',
		"What's on at Omnia this Saturday?"
	];
</script>

<aside
	aria-label="Assistant"
	class="flex min-h-[560px] flex-col rounded-xl border border-white/30 bg-white/15 backdrop-blur-xl lg:sticky lg:top-6"
>
	<div class="flex items-center justify-between gap-3 border-b border-white/20 px-5 py-[18px]">
		<div>
			<h2 class="edm-nights-text text-2xl font-extrabold">Ask the lineup</h2>
			<div class="mt-0.5 text-sm">Answers from the same show data</div>
		</div>
		<span
			class="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-xs font-bold uppercase"
			>Soon</span
		>
	</div>
	<div class="flex flex-1 flex-col gap-2.5 p-5">
		<div class="mb-1 text-sm">Try asking</div>
		{#each prompts as prompt (prompt)}
			<button
				type="button"
				disabled
				class="min-h-11 rounded-xl border border-white/20 bg-[rgba(15,10,35,0.6)] px-3.5 py-2.5 text-left text-[15px] font-semibold text-slate-200"
				>{prompt}</button
			>
		{/each}
	</div>
	<div class="flex gap-2.5 border-t border-white/20 px-5 py-4">
		<label for="chat-input" class="sr-only">Message</label>
		<input
			id="chat-input"
			disabled
			placeholder="Who's playing Saturday?"
			class="min-h-11 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 text-[15px] text-white placeholder-white/60"
		/>
		<button
			type="button"
			disabled
			aria-label="Send"
			class="pill-frosted h-11 w-11 justify-center px-0"
		>
			<Arrow size={18} />
		</button>
	</div>
</aside>
