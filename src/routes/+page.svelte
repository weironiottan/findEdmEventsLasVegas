<script>
import {SearchBar, EventTable} from "$lib";
let { data } = $props();

</script>

<div class=" min-h-screen bg-gradient-to-br h-full w-full from-purple-900 via-indigo-900 to-black">
    <div class="relative max-w-7xl mx-auto py-5">
        <div class="absolute -inset-6">
            <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full blur-xl opacity-50"></div>
            <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400 rounded-full blur-xl opacity-50"></div>
            <div class="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-400 rounded-full blur-xl opacity-50"></div>
        </div>

        <div class="relative backdrop-blur-xl bg-white/15 border border-white/30 rounded-xl p-6 z-10">
            <EventTable {data}/>-->
        </div>
    </div>
<!--        <div class=" w-7xl relative h-64 bg-indigo-900/50 rounded-lg overflow-hidden">-->
<!--            <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-30"></div>-->
<!--            <div class="absolute bottom-1/3 right-1/4 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl opacity-30"></div>-->
<!--            <EventTable {data}/>-->
<!--        </div>-->

</div>
