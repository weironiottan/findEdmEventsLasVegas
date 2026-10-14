<script lang="ts">
	import EventDate from '$lib/EventDate.svelte';
	import EventButton from '$lib/EventButton.svelte';

	let { edmEvent } = $props();
</script>

<!--           -->
<div
	class="20 my-5 flex min-h-[10%] w-full transform flex-col flex-nowrap
    items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 pr-1 text-slate-200 capitalize antialiased backdrop-blur-xl
    transition-all duration-500 ease-in-out hover:-translate-y-1
    hover:border-cyan-500/30 hover:bg-white/15 hover:shadow-2xl sm:my-2 sm:p-0 sm:pr-1 md:flex-row"
>
	<div class="mr-0 flex h-full w-full justify-between md:w-1/6 md:justify-center md:pl-5">
		<EventDate {edmEvent} />
		<div class="flex h-full self-end md:hidden">
			<EventButton {edmEvent} />
		</div>
	</div>
	<div class="order-first flex h-full w-full items-center pb-2 sm:order-none sm:w-2/5 sm:pb-0">
		<div
			class="m-2 hidden h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat p-4 md:flex"
			style:background-image="url('/edm-hero-background-compressed.avif')"
		></div>
		<div class="text-3xl font-extrabold tracking-wider capitalize sm:pl-5 sm:text-2xl sm:font-bold">
			{edmEvent.ArtistName}
		</div>
	</div>
	<div class="clubName hidden h-full w-1/5 items-center pl-5 md:flex">
		<div class="clubName text-xl font-semibold tracking-wider capitalize">{edmEvent.ClubName}</div>
	</div>
	<div class="hidden items-center justify-center md:flex">
		<EventButton {edmEvent} />
	</div>
</div>
