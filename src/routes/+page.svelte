<script>
import { EventTable } from "$lib";
let { data } = $props();

</script>

<div class="bg-gradient-to-br h-[65%] w-full from-purple-900 via-indigo-900 to-black py-10 ">
    <div class="relative  h-[100%] w-7xl mx-auto rounded-xl">
        <div class="absolute -inset-6">
            <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full blur-xl opacity-50"></div>
            <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400 rounded-full blur-xl opacity-50"></div>
            <div class="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-400 rounded-full blur-xl opacity-50"></div>
        </div>

        <div class=" overflow-y-auto overscroll-contain backdrop-blur-xl h-[100%] bg-white/15 border border-white/30 rounded-xl z-10 p-5 mt-2 ">
            <EventTable {data}/>-->
        </div>
    </div>
</div>
