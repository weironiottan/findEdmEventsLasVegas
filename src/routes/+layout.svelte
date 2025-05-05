<script lang="ts">
    import "../app.css";
    import { page } from '$app/state';
    import {SearchBar} from "$lib";
    import type { LayoutProps } from './$types';
    import { Button, Dropdown, DropdownItem} from 'flowbite-svelte';
    import {ChevronLeftOutline} from 'flowbite-svelte-icons';

    let { children }: LayoutProps = $props();

</script>

<svelte:head>
    <title>Find EDM Shows Las Vegas!</title>
    <meta name="description" content="EDM Shows Las Vegas" />
</svelte:head>

<section class="bg-cover bg-center bg-no-repeat h-[35%] w-full flex flex-col justify-between " style:background-image="url('/edm-hero-background-1.avif')">
    <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-t-xl md:p-4
    flex justify-end md:justify-center text-xl uppercase text-slate-200">
            <div class="px-4 cursor-pointer hidden md:flex "><a href="/about">about</a></div>
            <div class="px-6 cursor-pointer hidden md:flex "><a href="/">find EDM shows</a></div>
            <div class="px-4 cursor-pointer hidden md:flex "><a href="/contact">contact</a></div>

        <div class="md:hidden flex font-extrabold text-2xl">
            <Button class="text-xl">
                <ChevronLeftOutline class="w-6 h-6 ms-2 text-slate-200 font-bold" />
                Menu
            </Button>
            <Dropdown placement='left' class="text-slate-600" classContainer="bg-white/80 mt-2 w-48 ">
                <DropdownItem class="font-extrabold uppercase"><a href="/about">about</a></DropdownItem>
                <DropdownItem class="font-extrabold uppercase"><a href="/">find EDM shows</a></DropdownItem>
                <DropdownItem class="font-extrabold uppercase"><a href="/contact">contact</a></DropdownItem>
            </Dropdown>
        </div>

    </div>
    {#if page.route.id === "/"}
    <section class=" z-10  mt-6  backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 flex justify-center ">
            <SearchBar />
    </section>
    {/if}

</section>

{@render children()}