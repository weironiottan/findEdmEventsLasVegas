<script>

	let props = $props()
	let selectedCategory = $state('artistName')
	let searchQuery = $state('Enter Artist Name');
</script>


<div class="component-wrapper">
	<div class="search-container">
		<select name="eventSelection" id="event-selection" bind:value={selectedCategory}>
			<option value="artistname">Artist Name</option>
			<option value="clubname">Club Name</option>
			<option value="date">Date</option>
		</select>
		<input type="text" id="search-input" placeholder="Search..." bind:value={searchQuery} />
		<p>Search Results {searchQuery}</p>
		<p>Search Category {selectedCategory}</p>
	</div>
</div>