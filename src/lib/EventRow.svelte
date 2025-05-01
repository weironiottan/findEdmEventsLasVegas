<script lang="ts">

    import EventDate from "$lib/EventDate.svelte";
    import EventButton from "$lib/EventButton.svelte";

    let { edmEvent }  = $props();
</script>

<!--           -->
    <div class="flex flex-col md:flex-row flex-nowrap  justify-between  items-center min-h-[10%] w-full
    capitalize backdrop-blur-xl bg-white/10 border border-white/20 p-4 sm:p-0 sm:pr-1 sm:my-2 my-5 pr-1 20
    rounded-xl hover:bg-white/15 hover:border-cyan-500/30 text-slate-200
    hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 antialiased"
    >
        <div class="flex h-full w-full mr-0 md:w-1/6 md:pl-5 md:justify-center justify-between">
            <EventDate {edmEvent} />
            <div class="md:hidden flex h-full self-end">
                <EventButton {edmEvent} />
            </div>
        </div>
        <div class="flex items-center order-first sm:order-none h-full w-full sm:w-2/5 pb-2 sm:pb-0">
            <div class="h-14 w-14 hidden md:flex rounded-full bg-cover bg-center bg-no-repeat p-4 m-2"
                 style:background-image="url('/edm-hero-background-1.avif')"></div>
            <div class="text-3xl sm:text-2xl font-extrabold sm:font-bold tracking-wider capitalize sm:pl-5 ">{edmEvent.ArtistName}</div>
        </div>
        <div class="hidden md:flex clubName h-full w-1/5 items-center pl-5">
            <div class="clubName font-semibold text-xl tracking-wider capitalize">{edmEvent.ClubName}</div>
        </div>
        <div class="hidden md:flex items-center justify-center ">
            <EventButton {edmEvent} />
        </div>
    </div>