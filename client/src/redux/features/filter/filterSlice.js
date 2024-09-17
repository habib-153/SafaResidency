import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: '',
    categories: [],
    sort: ''
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCategories: (state, action) => {
            if(!state.categories.includes(action.payload)){
                state.categories.push(action.payload);
            }
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        removeCategories: (state, action) => {
            state.categories = state.categories.filter(category => category !== action.payload)
        },
        clearFilters: (state) => {
            state.searchTerm = '';
            state.categories = [];
            state.sort = '';
        }
    }
})

export const { setSearchTerm, setCategories, setSort, removeCategories, clearFilters} = filterSlice.actions
export default filterSlice.reducer;