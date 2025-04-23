<script lang="ts">
    import {SearchBar} from "$lib";

    let { children } = $props();
    import "../app.css";
</script>

<section class="bg-cover bg-center bg-no-repeat h-[35%] w-full flex flex-col justify-between " style:background-image="url('/edm-hero-background-1.avif')">
    <div class="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-t-xl p-4 z-10 flex justify-center text-xl uppercase">
            <div class="px-4 text-cyan-400 cursor-pointer"><a href="/about">about</a></div>
            <div class="px-6 text-cyan-400 cursor-pointer"><a href="/">find EDM shows</a></div>
            <div class="px-4 text-cyan-400 cursor-pointer"><a href="/contact">contact</a></div>
    </div>
    <section class="relative z-10 mt-6  backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 flex justify-center">
            <SearchBar />
    </section>
</section>

{@render children()}