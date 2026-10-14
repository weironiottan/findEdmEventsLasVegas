<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { setSearchQuery, setSelectedCategory } from '#lib/sharedState.svelte.js';
	import { EdmEventInputId } from '#lib/Types.js';

	let searchBarState = $state({
		displayedText: 'Artist Name',
		inputId: 'artistName',
		placeHolderText: 'Search for artists...',
		searchQuery: '',
		dropDownOpen: false
	});

	function getSelectedCategory(e: Event) {
		const value = e.target as HTMLInputElement;
		searchBarState.dropDownOpen = false;
		switch (value.id) {
			case EdmEventInputId.artistName:
				searchBarState.displayedText = 'Artist Name';
				searchBarState.inputId = EdmEventInputId.artistName;
				searchBarState.placeHolderText = 'Search for artists...';
				break;
			case EdmEventInputId.venue:
				searchBarState.displayedText = 'Venue';
				searchBarState.inputId = EdmEventInputId.venue;
				searchBarState.placeHolderText = 'Search for venue...';
				break;
			case EdmEventInputId.inputDate:
				searchBarState.displayedText = 'Date';
				searchBarState.inputId = EdmEventInputId.inputDate;
				searchBarState.placeHolderText = 'Search for dates...';
				break;
		}
	}

	let debounceTimer: number;

	// Debounced search query effect
	$effect(() => {
		const searchQuery = searchBarState.searchQuery;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			setSearchQuery(searchQuery);
		}, 400);

		return () => clearTimeout(debounceTimer);
	});

	// Immediate category effect
	$effect(() => {
		setSelectedCategory(searchBarState.inputId);
	});
</script>

<div
	class="z-10 flex w-full flex-col rounded-xl border border-white/20 bg-white/10
	md:w-7/12 md:flex-row"
>
	<div class="flex justify-center">
		<Button class="grow"
			>{searchBarState.displayedText}
			<ChevronDownOutline class="ms-2 h-6 w-6 font-bold text-slate-200" />
		</Button>
		<Dropdown
			class="w-48 space-y-1 bg-white/80 p-3 text-slate-600"
			bind:isOpen={searchBarState.dropDownOpen}
		>
			<DropdownItem
				id={EdmEventInputId.artistName}
				class="font-extrabold"
				onclick={(e: Event) => getSelectedCategory(e)}>Artist Name</DropdownItem
			>
			<DropdownItem
				id={EdmEventInputId.venue}
				class="font-extrabold"
				onclick={(e: Event) => getSelectedCategory(e)}>Venue</DropdownItem
			>
			<DropdownItem
				id={EdmEventInputId.inputDate}
				class="font-extrabold"
				onclick={(e: Event) => getSelectedCategory(e)}>Date</DropdownItem
			>
		</Dropdown>
	</div>
	<input
		class="flex-1 border-r border-white/20 bg-transparent font-bold text-white placeholder-white/60"
		type="text"
		id="search-input"
		autocomplete="off"
		autocapitalize="off"
		spellcheck="false"
		placeholder={searchBarState.placeHolderText}
		bind:value={searchBarState.searchQuery}
	/>
</div>
