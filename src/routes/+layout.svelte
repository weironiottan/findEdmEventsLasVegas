<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { SearchBar } from '$lib';
	import type { LayoutProps } from './$types';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronLeftOutline } from 'flowbite-svelte-icons';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Find EDM Shows Las Vegas!</title>
	<meta name="description" content="EDM Shows Las Vegas" />
</svelte:head>

<section
	class="flex h-[35%] w-full flex-col justify-between bg-cover bg-center bg-no-repeat"
	style:background-image="url('/edm-hero-background-compressed.avif')"
>
	<div
		class="flex justify-end rounded-t-xl border border-white/20 bg-white/10
    text-xl text-slate-200 uppercase backdrop-blur-md md:justify-center md:p-4"
	>
		<div class="hidden cursor-pointer px-4 md:flex"><a href="/about">about</a></div>
		<div class="hidden cursor-pointer px-6 md:flex"><a href="/">find EDM shows</a></div>
		<div class="hidden cursor-pointer px-4 md:flex"><a href="/contact">contact</a></div>

		<div class="flex text-2xl font-extrabold md:hidden">
			<Button class="text-xl">
				<ChevronLeftOutline class="ms-2 h-6 w-6 font-bold text-slate-200" />
				Menu
			</Button>
			<Dropdown placement="left" class="text-slate-600" classContainer="bg-white/80 mt-2 w-48 ">
				<DropdownItem class="font-extrabold uppercase"><a href="/about">about</a></DropdownItem>
				<DropdownItem class="font-extrabold uppercase"><a href="/">find EDM shows</a></DropdownItem>
				<DropdownItem class="font-extrabold uppercase"><a href="/contact">contact</a></DropdownItem>
			</Dropdown>
		</div>
	</div>

	{#if page.route.id === '/'}
		<div class="relative mt-6">
			<div
				class="absolute inset-0 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md"
			></div>
			<!-- Background layer -->
			<div class="relative z-10 flex justify-center p-6">
				<SearchBar />
			</div>
		</div>
	{/if}
</section>

{@render children()}
