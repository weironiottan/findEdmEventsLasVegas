<script lang="ts">
	// ↗ = leaves the site, → = internal link, ← = back
	let {
		direction = 'right',
		size = 16
	}: { direction?: 'up-right' | 'right' | 'left'; size?: number } = $props();

	const paths = {
		'up-right': ['M7 17L17 7', 'M8 7h9v9'],
		right: ['M5 12h14', 'M13 6l6 6-6 6'],
		left: ['M19 12H5', 'M11 18l-6-6 6-6']
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2.2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#each paths[direction] as d (d)}
		<path {d}></path>
	{/each}
</svg>
