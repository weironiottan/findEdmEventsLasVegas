<script lang="ts">
    import { Months, Weekdays} from "$lib/Types";

    let { edmEvent }  = $props();

    function getFormattedMonth(wholeDateStringUTC: Date) {
        const currentMonth = new Date(wholeDateStringUTC).getUTCMonth()
        return Months.find((month, index) => {
            return (index === currentMonth) && month
        })
    }

    function getFormattedDay(wholeDateStringUTC: Date) {
        return new Date(wholeDateStringUTC).getUTCDate();
    }

    function getFormattedWeekday(wholeDateStringUTC: Date) {
        const currentWeekday = new Date(wholeDateStringUTC).getUTCDay()
        return Weekdays.find((weekday, index) => {
            return (index === currentWeekday) && weekday
        })
    }

    function getFormattedYear(wholeDateStringUTC: Date) {
        return new Date(wholeDateStringUTC).getUTCFullYear();
    }

</script>

<!--           -->
    <div class="flex sm:flex-nowrap sm:flex-row sm:justify-between  items-center min-h-[10%] w-full
    capitalize backdrop-blur-xl bg-white/10 border border-white/20 p-4 sm:p-0 sm:pr-1 sm:my-2 my-5 pr-1 20
    rounded-xl hover:bg-white/15 hover:border-cyan-500/30 text-slate-200
    hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 antialiased"
    >
        <div class="h-full  sm:mr-0 w-1/2 sm:w-1/6 sm:pl-5 flex flex-col sm:justify-center tracking-wider">
            <div class="flex font-bold sm:font-extrabold text-2xl sm:text-3xl">
                <div class="mr-3">{getFormattedMonth(edmEvent.EventDate)}</div>
                <div class="">{getFormattedDay(edmEvent.EventDate)}</div>
            </div>
            <div class="flex items-baseline">
                <div class="font-medium mr-3">{getFormattedWeekday(edmEvent.EventDate)}</div>
                <div class="text-sm">{getFormattedYear(edmEvent.EventDate)}</div>
            </div>
        </div>
        <div class="flex items-center order-first sm:order-none h-full w-full sm:w-2/5 pb-2 sm:pb-0">
            <div class="h-14 w-14 hidden sm:flex rounded-full bg-cover bg-center bg-no-repeat p-4 m-2"
                 style:background-image="url('/edm-hero-background-1.avif')"></div>
            <div class="text-3xl sm:text-2xl font-extrabold sm:font-bold tracking-wider capitalize sm:pl-5 ">{edmEvent.ArtistName}</div>
        </div>
        <div class="hidden sm:flex clubName h-full w-1/5 items-center pl-5">
            <div class="clubName font-semibold text-xl tracking-wider capitalize">{edmEvent.ClubName}</div>
        </div>
        <div class="flex items-center justify-center">
            <a class="backdrop-blur-xl bg-gradient-to-r from-cyan-500/80 to-purple-600/80 border
            border-white/20 px-4 py-2 rounded-full  font-bold text-base transition-all
            duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:border-white/40" 
            href="{edmEvent.TicketUrl}" target="_blank">View Event</a>
        </div>
    </div>