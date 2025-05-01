<script lang="ts">
    import {Months, Weekdays} from "$lib/Types";
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

<div class="flex flex-col ">
    <div class="flex font-bold sm:font-extrabold text-2xl sm:text-3xl">
        <div class="mr-3">{getFormattedMonth(edmEvent.EventDate)}</div>
        <div class="">{getFormattedDay(edmEvent.EventDate)}</div>
    </div>
    <div class="flex items-baseline">
        <div class="font-medium mr-3">{getFormattedWeekday(edmEvent.EventDate)}</div>
        <div class="text-sm">{getFormattedYear(edmEvent.EventDate)}</div>
    </div>
</div>