<script>
import {SearchBar, EventTable} from "$lib";
let { data } = $props();

</script>

<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
<a href="/contact">Contact</a>

<SearchBar/>
<h3>Here starts the event table</h3>
<EventTable {data}/>