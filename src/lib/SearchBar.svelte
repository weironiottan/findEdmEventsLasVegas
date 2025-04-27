<script>
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	let props = $props()
	let selectedCategory = $state("Artist Name")
	let placeholderText = $state("Search for artists...")
	let searchQuery = $state('');
	let dropdownOpen = $state(false)
	const handleClick = (e) => {
		e.preventDefault();
		alert('Clicked on: ' + e.target);
	};
	function getSelectedCategory(e) {
		const value = e.target.id
		dropdownOpen = false
		switch (value) {
			case "artistname":
				selectedCategory = "Artist Name";
				placeholderText = "Search for artists..."
				break;
			case "clubname":
				selectedCategory = "Club name";
				placeholderText = "Search for venue..."
				break;
			case "date":
				selectedCategory = "Date";
				placeholderText = "Search for dates..."
				break;
		}
	}

</script>

<div class="relative w-7/12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl z-10 flex ">
	<div class="font-bold"><Button>{selectedCategory}<ChevronDownOutline class="w-6 h-6 ms-2 text-white " /></Button>
		<Dropdown class="text-slate-600 " classContainer=" bg-white/80 w-48 p-3 space-y-1 " bind:open={dropdownOpen}>
			<DropdownItem id="artistname" class="font-extrabold" onclick={(e) => getSelectedCategory(e)} >Artist Name</DropdownItem>
			<DropdownItem id="clubname" class="font-extrabold" onclick={(e) => getSelectedCategory(e)} >Club Name</DropdownItem>
			<DropdownItem id="date" class="font-extrabold" onclick={(e) => getSelectedCategory(e)} >Date</DropdownItem>
		</Dropdown></div>
	<input class="flex-1 font-bold  bg-transparent border-r border-white/20 text-white placeholder-white/60 " type="text" id="search-input" placeholder="{placeholderText}" bind:value={searchQuery} />
</div>

