<script lang="ts">
    import "../app.css";
    import { page } from '$app/state';
    import {SearchBar} from "$lib";
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();

</script>

<section class="bg-cover bg-center bg-no-repeat h-[35%] w-full flex flex-col justify-between " style:background-image="url('/edm-hero-background-1.avif')">
    <div class="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-t-xl p-4 z-10 flex justify-center text-xl uppercase text-slate-200">
            <div class="px-4 cursor-pointer"><a href="/about">about</a></div>
            <div class="px-6 cursor-pointer"><a href="/">find EDM shows</a></div>
            <div class="px-4 cursor-pointer"><a href="/contact">contact</a></div>
    </div>
    {#if page.route.id === "/"}
    <section class="relative z-10 mt-6  backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 flex justify-center">
            <SearchBar />
    </section>
    {/if}

</section>

{@render children()}