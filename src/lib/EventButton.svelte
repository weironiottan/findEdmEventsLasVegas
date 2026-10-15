<script lang="ts">
	import Arrow from '#lib/Arrow.svelte';
	let { ticketUrl }: { ticketUrl: string } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external club ticketing site -->
<a class="pill-frosted shrink-0" href={ticketUrl} target="_blank" rel="noreferrer">
	View event
	<Arrow direction="up-right" />
</a>
