import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: '',
    status: '',
    categories: [],
    sort: ''
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCategory: (state, action) => {
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
            state.status = '';
            state.searchTerm = '';
            state.categories = [];
            state.sort = '';
        }
    }
})

export const { setStatus, setSearchTerm, setCategory, setSort, removeCategories, clearFilters} = filterSlice.actions
export default filterSlice.reducer;