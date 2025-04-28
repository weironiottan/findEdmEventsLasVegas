    let searchPropsState = $state({
        searchQuery: "",
        selectedCategory: ""
    })

    export const getSearchPropsState = () => searchPropsState
    export const getSelectedCategory = () => searchPropsState.selectedCategory
    export const getSearchQuery = () => searchPropsState.searchQuery

    export const setSelectedCategory = (selectedCategory: string) => searchPropsState.selectedCategory = selectedCategory
    export const setSearchQuery = (query: string) => searchPropsState.searchQuery = query

