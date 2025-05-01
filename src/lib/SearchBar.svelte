<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import {setSearchQuery, setSelectedCategory} from "$lib/sharedState.svelte";
	import {EdmEventInputId} from "$lib/Types";


	let searchBarState = $state({
		displayedText: "Artist Name",
		inputId: "artistName",
		placeHolderText: "Search for artists...",
		searchQuery: "",
		dropDownOpen: false,
	})

	function getSelectedCategory(e : Event) {

		const value = e.target as HTMLInputElement;
		searchBarState.dropDownOpen = false
		switch (value.id) {
			case EdmEventInputId.artistName:
				searchBarState.displayedText = "Artist Name";
				searchBarState.inputId = EdmEventInputId.artistName;
				searchBarState.placeHolderText = "Search for artists...";

				break;
			case EdmEventInputId.venue:
				searchBarState.displayedText = "Venue";
				searchBarState.inputId = EdmEventInputId.venue;
				searchBarState.placeHolderText = "Search for venue...";
				break;
			case EdmEventInputId.inputDate:
				searchBarState.displayedText = "Date";
				searchBarState.inputId =  EdmEventInputId.inputDate;
				searchBarState.placeHolderText = "Search for dates...";
				break;
		}
	}

	$effect(() => {
		setSearchQuery(searchBarState.searchQuery);
		setSelectedCategory(searchBarState.inputId);
	});

</script>

<div class="flex flex-col w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl z-10
	md:flex-row md:w-7/12">
	<div class="flex justify-center ">
		<Button class="grow">{searchBarState.displayedText}
			<ChevronDownOutline class="w-6 h-6 ms-2 text-slate-200 font-bold" />
		</Button>
		<Dropdown class="text-slate-600 " classContainer=" bg-white/80 w-48 p-3 space-y-1 " bind:open={searchBarState.dropDownOpen}>
			<DropdownItem id={EdmEventInputId.artistName} class="font-extrabold" onclick={(e: Event) => getSelectedCategory(e)} >Artist Name</DropdownItem>
			<DropdownItem id={EdmEventInputId.venue} class="font-extrabold" onclick={(e: Event) => getSelectedCategory(e)} >Venue</DropdownItem>
			<DropdownItem id={EdmEventInputId.inputDate} class="font-extrabold" onclick={(e: Event) => getSelectedCategory(e)} >Date</DropdownItem>
		</Dropdown>
	</div>
	<input class="flex-1 font-bold  bg-transparent border-r border-white/20 text-white placeholder-white/60 "
		   type="text" id="search-input" placeholder="{searchBarState.placeHolderText}" bind:value={searchBarState.searchQuery} />
</div>

