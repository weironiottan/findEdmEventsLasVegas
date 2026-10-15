<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronLeftOutline } from 'flowbite-svelte-icons';
	import { formatRelativeTime, isStale } from '#lib/browse.js';

	const lastUpdated: string | null = $derived(page.data.lastUpdated ?? null);
	const stale = $derived(lastUpdated !== null && isStale(lastUpdated));

	const navPill =
		'pill-dark h-10 px-4 transition-all duration-300 hover:border-white/40 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]';
</script>

<header
	class="text-shadow-hero flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 text-[13px] font-semibold tracking-widest uppercase sm:px-7"
>
	<p
		class="pill-dark h-8 px-3.5 text-slate-200/90 [text-shadow:none]"
		title={lastUpdated ? new Date(lastUpdated).toLocaleString() : undefined}
	>
		<span
			aria-hidden="true"
			class="h-2 w-2 rounded-full {stale
				? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
				: 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'}"
		></span>
		Shows updated {lastUpdated ? formatRelativeTime(lastUpdated) : 'daily'}
	</p>

	<nav aria-label="Primary" class="hidden gap-2.5 [text-shadow:none] md:flex">
		<a class={navPill} href={resolve('/')}>home</a>
		<a class={navPill} href={resolve('/about')}>about</a>
		<a class={navPill} href={resolve('/contact')}>contact</a>
	</nav>

	<div class="flex md:hidden">
		<Button class="{navPill} bg-[rgba(15,10,35,0.6)] text-[13px] tracking-widest uppercase">
			<ChevronLeftOutline class="me-1 h-5 w-5 text-slate-200" />
			Menu
		</Button>
		<Dropdown placement="left" class="mt-2 w-48 bg-white/80 text-slate-600">
			<DropdownItem class="font-extrabold uppercase"><a href={resolve('/')}>home</a></DropdownItem>
			<DropdownItem class="font-extrabold uppercase"
				><a href={resolve('/about')}>about</a></DropdownItem
			>
			<DropdownItem class="font-extrabold uppercase"
				><a href={resolve('/contact')}>contact</a></DropdownItem
			>
		</Dropdown>
	</div>
</header>
