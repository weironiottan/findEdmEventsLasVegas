const searchPropsState = $state({
	searchQuery: ''
});

export const getSearchPropsState = () => searchPropsState;
export const getSearchQuery = () => searchPropsState.searchQuery;

export const setSearchQuery = (query: string) => (searchPropsState.searchQuery = query);
