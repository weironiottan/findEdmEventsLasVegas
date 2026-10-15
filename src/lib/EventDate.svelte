<script lang="ts">
	import { Months, Weekdays } from '#lib/Types.js';
	let { eventDate }: { eventDate: string } = $props();

	const date = $derived(new Date(eventDate));
</script>

<div class="flex flex-col">
	<div class="flex text-2xl font-bold sm:text-3xl sm:font-extrabold">
		<div class="mr-3">{Months[date.getUTCMonth()]}</div>
		<div class="">{date.getUTCDate()}</div>
	</div>
	<div class="flex items-baseline">
		<div class="mr-3 font-medium">{Weekdays[date.getUTCDay()]}</div>
		<div class="text-sm">{date.getUTCFullYear()}</div>
	</div>
</div>
