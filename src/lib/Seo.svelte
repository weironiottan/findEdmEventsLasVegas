<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME, jsonLdScript } from '#lib/seo.js';

	// Per-page <head> tags. The canonical URL drops the query string, so homepage tabs
	// (?tab=artists) all point at the homepage.
	let { title, description, jsonLd }: { title: string; description: string; jsonLd?: unknown } =
		$props();

	const canonical = $derived(page.url.origin + page.url.pathname);
	const image = $derived(`${page.url.origin}/djicon.png`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary" />
	{#if jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript escapes "<" -->
		{@html jsonLdScript(jsonLd)}
	{/if}
</svelte:head>
